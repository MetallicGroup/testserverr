import type { VercelRequest, VercelResponse } from "@vercel/node";

type Finish = "low" | "medium" | "high";

interface GenerateMockupBody {
  productName?: string;
  productCategory?: string;
  mockupKey?: string;
  finish?: Finish;
  recaptchaToken?: string;
}

const RECAPTCHA_ACTION = "generate_mockup";
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const DEFAULT_MIN_SCORE = 0.5;

const FINISH_PROMPT: Record<Finish, string> = {
  low: "economy basic budget materials, simple matte finish",
  medium: "standard professional quality, clean commercial finish",
  high: "premium luxury materials, refined high-end finish",
};

const MOCKUP_PRODUCT_DESC: Record<string, string> = {
  pen: "a white promotional ballpoint pen",
  mug: "a white ceramic coffee mug with handle",
  tshirt: "a white cotton t-shirt laid flat",
  hoodie: "a white hoodie sweatshirt laid flat",
  cap: "a white baseball cap",
  totebag: "a natural cotton tote bag",
  bottle: "a white reusable water bottle",
  thermos: "a white insulated thermos flask",
  notebook: "a textured hardcover notebook with elastic band",
  usb: "a white USB flash drive",
  phonecase: "a white smartphone case",
  umbrella: "a white folding umbrella",
  keychain: "a white acrylic keychain",
  banner: "a roll-up banner display with blank white vinyl",
  backpack: "a white polyester backpack",
  powerbank: "a white portable powerbank",
  mousepad: "a white rectangular mouse pad",
  wallet: "a white bifold wallet",
  lanyard: "a white woven lanyard strap",
  badge: "a round white pin badge",
  polo: "a white polo shirt laid flat",
  paper: "a stack of blank white business cards",
  box: "a white rigid gift box",
  generic: "a white promotional gift product",
};

function buildAiMockupPrompt(productName: string, mockupKey: string, finish: Finish): string {
  const product = MOCKUP_PRODUCT_DESC[mockupKey] || `a promotional ${productName}`;
  const tier = FINISH_PROMPT[finish];

  return [
    `Professional studio product photograph of ${product}, ${tier}.`,
    "Large completely blank smooth print area on the product for later branding.",
    "No text, no logo, no watermark, no people, no hands.",
    "Isolated on pure white background, soft commercial lighting, photorealistic e-commerce mockup.",
    "Single product centered, subtle natural shadow, high detail.",
  ].join(" ");
}

function parseRequestBody(req: VercelRequest): GenerateMockupBody {
  const raw = req.body;
  if (!raw) return {};
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as GenerateMockupBody;
    } catch {
      return {};
    }
  }
  if (typeof raw === "object") return raw as GenerateMockupBody;
  return {};
}

async function verifyRecaptchaV3(
  token: string,
  expectedAction: string,
  remoteIp?: string,
): Promise<{ ok: true; score: number } | { ok: false; error: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true, score: 1 };
  }

  if (!token) {
    return { ok: false, error: "Verificarea reCAPTCHA lipsește." };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? DEFAULT_MIN_SCORE);
  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp) params.set("remoteip", remoteIp);

  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const payload = (await res.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
    };

    if (!payload.success) {
      return { ok: false, error: "reCAPTCHA nu a putut fi verificat." };
    }

    if (payload.action && payload.action !== expectedAction) {
      return { ok: false, error: "Acțiune reCAPTCHA invalidă." };
    }

    const score = payload.score ?? 0;
    if (score < minScore) {
      return { ok: false, error: "Activitate suspectă detectată. Încearcă din nou." };
    }

    return { ok: true, score };
  } catch {
    return { ok: false, error: "Serviciul reCAPTCHA nu este disponibil." };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Metoda nu este permisă." });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "Serviciul AI nu este configurat. Adaugă OPENAI_API_KEY în Vercel.",
      });
    }

    const body = parseRequestBody(req);
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
        : req.socket?.remoteAddress,
    );
    if (!recaptcha.ok) {
      return res.status(403).json({ error: recaptcha.error });
    }

    const prompt = buildAiMockupPrompt(productName, mockupKey, finish);

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
