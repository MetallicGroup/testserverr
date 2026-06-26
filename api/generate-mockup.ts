import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildAiMockupPrompt } from "./_mockupPrompts";
import { verifyRecaptchaV3 } from "./_verifyRecaptcha";

const RECAPTCHA_ACTION = "generate_mockup";

type Finish = "low" | "medium" | "high";

interface GenerateMockupBody {
  productName?: string;
  productCategory?: string;
  mockupKey?: string;
  finish?: Finish;
  recaptchaToken?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metoda nu este permisă." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Serviciul AI nu este configurat. Adaugă OPENAI_API_KEY în Vercel.",
    });
  }

  const body = (req.body || {}) as GenerateMockupBody;
  const productName = body.productName?.trim();
  const mockupKey = body.mockupKey?.trim() || "generic";
  const finish: Finish =
    body.finish === "low" || body.finish === "high" ? body.finish : "medium";

  if (!productName) {
    return res.status(400).json({ error: "Numele produsului este obligatoriu." });
  }

  const recaptcha = await verifyRecaptchaV3(
    body.recaptchaToken?.trim() || "",
    RECAPTCHA_ACTION,
    typeof req.headers["x-forwarded-for"] === "string"
      ? req.headers["x-forwarded-for"].split(",")[0]?.trim()
      : req.socket.remoteAddress,
  );
  if (!recaptcha.ok) {
    return res.status(403).json({ error: recaptcha.error });
  }

  const prompt = buildAiMockupPrompt(productName, mockupKey, finish);

  try {
    const openAiRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "b64_json",
      }),
    });

    const payload = (await openAiRes.json()) as {
      error?: { message?: string };
      data?: Array<{ b64_json?: string }>;
    };

    if (!openAiRes.ok) {
      return res.status(openAiRes.status).json({
        error: payload.error?.message || "OpenAI a returnat o eroare.",
      });
    }

    const b64 = payload.data?.[0]?.b64_json;
    if (!b64) {
      return res.status(502).json({ error: "Imaginea generată lipsește din răspuns." });
    }

    return res.status(200).json({
      imageDataUrl: `data:image/png;base64,${b64}`,
      prompt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută";
    return res.status(500).json({ error: message });
  }
}
