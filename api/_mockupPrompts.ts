type Finish = "low" | "medium" | "high";

const FINISH_PROMPT: Record<Finish, string> = {
  low: "economy basic budget materials, simple matte finish",
  medium: "standard professional quality, clean commercial finish",
  high: "premium luxury materials, refined high-end finish",
};

/** Visual description per mockup type for consistent AI generation */
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

export function buildAiMockupPrompt(
  productName: string,
  mockupKey: string,
  finish: Finish,
): string {
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
