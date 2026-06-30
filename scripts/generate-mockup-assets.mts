#!/usr/bin/env npx tsx
/**
 * Generates missing mockup finish images via OpenAI DALL-E 3.
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-mockup-assets.mts
 * Optional: --key=penholder  (single key)
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync, copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const FINISH_DIR = join(ROOT, "src/assets/mockups/finish");
const BASE_DIR = join(ROOT, "src/assets/mockups");

type Finish = "low" | "medium" | "high";

const FINISH_PROMPT: Record<Finish, string> = {
  low: "economy basic budget materials, simple matte finish, entry-level quality",
  medium: "standard professional quality, clean commercial finish, mid-range",
  high: "premium luxury materials, refined high-end finish, top quality",
};

const MOCKUP_DESC: Record<string, string> = {
  pen: "a white promotional ballpoint pen",
  pencil: "a white branded wooden pencil",
  notebook: "a hardcover notebook",
  banner: "a roll-up banner display",
  mousepad: "a white rectangular mouse pad",
  penholder: "a white desk pen holder cup for pens",
  clipboard: "a white A4 clipboard with metal clip",
  folder: "a white A4 ring binder folder",
  paper: "a stack of white business cards",
  sticky: "a branded sticky notes pad",
  ruler: "a white 30cm promotional ruler",
  tshirt: "a white cotton t-shirt laid flat",
  polo: "a white polo shirt laid flat",
  hoodie: "a white hoodie laid flat",
  jacket: "a white zip-up jacket laid flat",
  cap: "a white baseball cap",
  scarf: "a white woven scarf",
  socks: "white branded crew socks",
  towel: "a white folded cotton towel",
  apron: "a white kitchen apron",
  vest: "a white zip vest laid flat",
  totebag: "a natural cotton tote bag",
  backpack: "a white polyester backpack",
  wallet: "a white bifold wallet",
  cosmeticbag: "a white zippered cosmetic bag",
  giftbag: "a white paper gift bag with handles",
  mug: "a white ceramic mug",
  thermos: "a white insulated thermos",
  bottle: "a white water bottle",
  jar: "a glass jar with white lid",
  corkscrew: "a white corkscrew wine opener",
  winegift: "a white wine gift box",
  chocolatebox: "a white chocolate gift box",
  usb: "a white USB flash drive",
  powerbank: "a white powerbank",
  phonecase: "a white phone case",
  headphones: "white over-ear headphones",
  phonestand: "a white desk phone stand",
  cable: "a white USB charging cable",
  speaker: "a white bluetooth speaker",
  keyboard: "a white wireless keyboard",
  mouse: "a white wireless mouse",
  keychain: "a white acrylic keychain",
  badge: "a round white pin badge",
  lanyard: "a white lanyard strap",
  wristband: "a white silicone wristband",
  mirror: "a small white pocket mirror",
  lighter: "a white promotional lighter",
  sunglasses: "white promotional sunglasses",
  umbrella: "a white folding umbrella",
  rainponcho: "a white rain poncho in pouch",
  blanket: "a white fleece blanket folded",
  ball: "a white soccer ball",
  frisbee: "a white frisbee disc",
  generic: "a white promotional gift product",
  airfreshener: "a white car air freshener card",
  carmount: "a white car phone mount",
  sunshade: "a white car windshield sun shade",
  ashtray: "a white pocket ashtray",
  carcharger: "a white car USB charger",
  facemask: "a white fabric face mask",
  firstaid: "a white first aid kit pouch",
  lipbalm: "a white lip balm tube",
  plate: "a white ceramic plate",
  cuttingboard: "a white bamboo cutting board",
  candle: "a white candle in glass jar",
  clock: "a white round wall clock",
  pillow: "a white square throw pillow",
  flag: "a white promotional flag",
  puzzle: "a white jigsaw puzzle box",
  playingcards: "a white playing cards deck box",
  box: "a white rigid gift box",
};

const FALLBACK_SOURCE: Record<string, string> = {
  pencil: "pen", penholder: "pen", clipboard: "notebook", folder: "notebook", sticky: "paper", ruler: "pen",
  jacket: "hoodie", scarf: "lanyard", socks: "generic", towel: "generic", apron: "hoodie", vest: "hoodie",
  cosmeticbag: "wallet", giftbag: "totebag", jar: "bottle", corkscrew: "keychain", winegift: "box",
  chocolatebox: "box", headphones: "generic", phonestand: "phonecase", cable: "usb", speaker: "powerbank",
  keyboard: "generic", mouse: "mousepad", wristband: "keychain", mirror: "badge", lighter: "pen",
  sunglasses: "generic", rainponcho: "umbrella", blanket: "generic", ball: "generic", frisbee: "generic",
  airfreshener: "badge", carmount: "phonecase", sunshade: "umbrella", ashtray: "generic",
  carcharger: "usb", facemask: "generic", firstaid: "box", lipbalm: "pen", plate: "generic",
  cuttingboard: "mousepad", candle: "bottle", clock: "badge", pillow: "generic", flag: "banner",
  puzzle: "box", playingcards: "paper",
};

function loadApiKey(): string {
  if (process.env.OPENAI_API_KEY?.trim()) return process.env.OPENAI_API_KEY.trim();
  const envPath = join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    const match = readFileSync(envPath, "utf8").match(/^OPENAI_API_KEY=(.+)$/m);
    if (match?.[1]?.trim()) return match[1].trim();
  }
  throw new Error("OPENAI_API_KEY lipsește.");
}

function buildPrompt(desc: string, finish: Finish): string {
  return [
    `Professional studio product photograph of ${desc}, ${FINISH_PROMPT[finish]}.`,
    "Large completely blank smooth print area on the product for later branding.",
    "No text, no logo, no watermark, no people, no hands.",
    "Isolated on pure white background, soft commercial lighting, photorealistic e-commerce mockup.",
    "Single product centered, subtle natural shadow, high detail.",
  ].join(" ");
}

async function generateImage(apiKey: string, prompt: string, finish: Finish): Promise<Buffer> {
  const model = process.env.OPENAI_IMAGE_MODEL?.trim() || "gpt-image-1-mini";
  const quality = finish === "low" ? "low" : finish === "high" ? "high" : "medium";
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      n: 1,
      size: "1024x1024",
      quality,
    }),
  });
  const payload = (await res.json()) as {
    error?: { message?: string };
    data?: Array<{ url?: string; b64_json?: string }>;
  };
  if (!res.ok) throw new Error(payload.error?.message || `OpenAI ${res.status}`);
  const b64 = payload.data?.[0]?.b64_json;
  if (b64) return Buffer.from(b64, "base64");
  const url = payload.data?.[0]?.url;
  if (!url) throw new Error("Lipsește imaginea din răspuns");
  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`Download failed ${imgRes.status}`);
  return Buffer.from(await imgRes.arrayBuffer());
}

function copyFallback(key: string, finish: Finish) {
  const srcKey = FALLBACK_SOURCE[key] || "generic";
  const src = join(FINISH_DIR, `${srcKey}-${finish}.png`);
  const dest = join(FINISH_DIR, `${key}-${finish}.png`);
  if (existsSync(src)) copyFileSync(src, dest);
}

async function main() {
  mkdirSync(FINISH_DIR, { recursive: true });
  const apiKey = process.env.SKIP_OPENAI ? "" : loadApiKey();
  const onlyKey = process.argv.find((a) => a.startsWith("--key="))?.split("=")[1];
  const force = process.argv.includes("--force");
  const keys = onlyKey ? [onlyKey] : Object.keys(MOCKUP_DESC);
  const finishes: Finish[] = ["low", "medium", "high"];

  for (const key of keys) {
    const desc = MOCKUP_DESC[key];
    if (!desc) {
      console.warn(`Skip unknown key: ${key}`);
      continue;
    }

    for (const finish of finishes) {
      const out = join(FINISH_DIR, `${key}-${finish}.png`);
      if (existsSync(out) && !force) {
        console.log(`✓ exists ${key}-${finish}`);
        continue;
      }

      if (!apiKey) {
        copyFallback(key, finish);
        console.log(`↪ fallback copy ${key}-${finish}`);
        continue;
      }

      try {
        console.log(`… generating ${key}-${finish}`);
        const buf = await generateImage(apiKey, buildPrompt(desc, finish), finish);
        writeFileSync(out, buf);
        console.log(`✓ saved ${key}-${finish}`);
        await new Promise((r) => setTimeout(r, 1500));
      } catch (err) {
        console.error(`✗ ${key}-${finish}:`, err instanceof Error ? err.message : err);
        copyFallback(key, finish);
        console.log(`↪ fallback copy ${key}-${finish}`);
      }
    }

    const baseOut = join(BASE_DIR, `${key}.png`);
    const mediumFinish = join(FINISH_DIR, `${key}-medium.png`);
    if (!existsSync(baseOut) && existsSync(mediumFinish)) {
      copyFileSync(mediumFinish, baseOut);
      console.log(`✓ base ${key}.png`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
