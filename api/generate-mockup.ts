import type { VercelRequest, VercelResponse } from "@vercel/node";

type Finish = "low" | "medium" | "high";

interface GenerateMockupBody {
  productName?: string;
  productCategory?: string;
  mockupKey?: string;
  finish?: Finish;
  productColor?: string;
  recaptchaToken?: string;
  aiDescription?: string;
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

/** Where the AI must leave a blank branding surface (consistent with client overlay zones). */
const BRANDING_SURFACE_PROMPT: Record<string, string> = {
  winegift:
    "The wine bottle on the LEFT has a large blank white rectangular front label — this is the only main branding zone, clearly visible and facing the camera.",
  chocolatebox:
    "A blank white rectangular print area centered on the TOP LID of the box, facing the camera.",
  carmount:
    "A blank smooth rectangular area on the flat FRONT face of the phone mount plate only (not on the arms or suction cup).",
  phonestand:
    "A blank rectangular branding area on the front face of the phone stand holder.",
  bottle:
    "A blank smooth wrap-around label zone on the center body of the bottle, front-facing.",
  mug:
    "A blank rectangular print area on the front face of the mug, between handle and center.",
  tshirt:
    "A blank rectangular chest print area centered on the front of the shirt.",
  polo: "A blank rectangular chest print area centered on the front of the polo shirt.",
  hoodie: "A blank rectangular chest print area centered on the front of the hoodie.",
  cap: "A blank rectangular front panel on the cap, above the brim.",
  pen: "A blank smooth barrel print area on the side of the pen body.",
  notebook: "A blank smooth front cover area for branding.",
  usb: "A blank smooth print area on the flat side of the USB drive.",
  powerbank: "A blank rectangular front panel on the powerbank body.",
  mousepad: "A blank rectangular print area covering the top surface of the mouse pad.",
  mouse: "A blank branding area on the top shell of the mouse.",
  speaker: "A blank rectangular front grille or panel area for branding.",
  headphones: "A blank area on the outer side of one ear cup.",
  giftbag: "A blank rectangular front face of the gift bag.",
  box: "A blank rectangular area on the front or top lid of the box.",
  jar: "A blank white label on the front of the jar.",
  totebag: "A blank rectangular print area on the front of the tote bag.",
  backpack: "A blank rectangular patch area on the front pocket of the backpack.",
  badge: "A blank flat circular face on the badge.",
  keychain: "A blank flat face on the keychain tag.",
  banner: "A large blank white vinyl panel on the roll-up banner.",
  paper: "Blank printable surface on the top sheet.",
  firstaid: "A blank rectangular front panel on the kit pouch.",
  puzzle: "A blank rectangular area on the front of the puzzle box.",
  playingcards: "A blank rectangular front panel on the card box.",
  airfreshener: "A blank flat branding face on the air freshener card.",
  sunshade: "A large blank panel on the folded sun shade.",
  carcharger: "A blank flat side panel on the car charger body.",
  generic:
    "One clear blank smooth print area on the primary front branding surface, facing the camera.",
};

const DEFAULT_IMAGE_MODEL = "gpt-image-1-mini";

const COLOR_AI_NAMES: Record<string, string> = {
  white: "white",
  black: "black",
  navy: "navy blue",
  blue: "royal blue",
  red: "red",
  green: "green",
  yellow: "yellow",
  orange: "orange",
  purple: "purple",
  gray: "gray",
  pink: "pink",
  natural: "natural beige",
};

function colorizeDescription(description: string, colorKey: string): string {
  const aiName = COLOR_AI_NAMES[colorKey];
  if (!aiName || colorKey === "white") return description;
  return description
    .replace(/\bwhite\b/gi, aiName)
    .replace(/\bnatural cotton\b/gi, `${aiName} cotton`)
    .replace(/\bnatural\b/gi, aiName)
    .replace(/\bclear glass\b/gi, `clear glass with ${aiName} lid`);
}

function getImageModel(): string {
  return process.env.OPENAI_IMAGE_MODEL?.trim() || DEFAULT_IMAGE_MODEL;
}

function finishToImageQuality(finish: Finish): "low" | "medium" | "high" {
  if (finish === "low") return "low";
  if (finish === "high") return "high";
  return "medium";
}

async function generateOpenAiImage(
  apiKey: string,
  prompt: string,
  finish: Finish,
): Promise<Buffer> {
  const openAiRes = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: getImageModel(),
      prompt,
      n: 1,
      size: "1024x1024",
      quality: finishToImageQuality(finish),
    }),
  });

  const payload = (await openAiRes.json()) as {
    error?: { message?: string };
    data?: Array<{ url?: string; b64_json?: string }>;
  };

  if (!openAiRes.ok) {
    throw new Error(payload.error?.message || "OpenAI a returnat o eroare.");
  }

  const b64 = payload.data?.[0]?.b64_json;
  if (b64) return Buffer.from(b64, "base64");

  const url = payload.data?.[0]?.url;
  if (!url) throw new Error("Imaginea generată lipsește din răspuns.");

  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error("Nu s-a putut descărca imaginea generată.");
  return Buffer.from(await imgRes.arrayBuffer());
}

function buildAiMockupPrompt(
  productName: string,
  mockupKey: string,
  finish: Finish,
  aiDescription?: string,
  productColor?: string,
): string {
  const rawProduct =
    aiDescription?.trim() ||
    MOCKUP_PRODUCT_DESC[mockupKey] ||
    `a promotional ${productName}`;
  const product = colorizeDescription(rawProduct, productColor?.trim() || "white");
  const tier = FINISH_PROMPT[finish];
  const brandingSurface =
    BRANDING_SURFACE_PROMPT[mockupKey] ?? BRANDING_SURFACE_PROMPT.generic;

  return [
    `Professional studio product photograph of ${product}, ${tier}.`,
    brandingSurface,
    "No text, no logo, no watermark, no people, no hands in the image.",
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

    const prompt = buildAiMockupPrompt(
      productName,
      mockupKey,
      finish,
      body.aiDescription,
      body.productColor,
    );

    const imageBuffer = await generateOpenAiImage(apiKey, prompt, finish);
    const imageDataUrl = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    return res.status(200).json({
      imageDataUrl,
      prompt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută";
    return res.status(500).json({ error: message });
  }
}
