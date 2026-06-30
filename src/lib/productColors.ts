export type ProductColorId =
  | "white"
  | "black"
  | "navy"
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "orange"
  | "purple"
  | "gray"
  | "pink"
  | "natural";

export interface ProductColorMeta {
  label: string;
  hex: string;
  /** English color name for AI image prompts */
  aiName: string;
}

export const PRODUCT_COLORS: Record<ProductColorId, ProductColorMeta> = {
  white: { label: "Alb", hex: "#ffffff", aiName: "white" },
  black: { label: "Negru", hex: "#1a1a1a", aiName: "black" },
  navy: { label: "Bleumarin", hex: "#1e3a5f", aiName: "navy blue" },
  blue: { label: "Albastru", hex: "#2563eb", aiName: "royal blue" },
  red: { label: "Roșu", hex: "#dc2626", aiName: "red" },
  green: { label: "Verde", hex: "#16a34a", aiName: "green" },
  yellow: { label: "Galben", hex: "#eab308", aiName: "yellow" },
  orange: { label: "Portocaliu", hex: "#ea580c", aiName: "orange" },
  purple: { label: "Mov", hex: "#7c3aed", aiName: "purple" },
  gray: { label: "Gri", hex: "#6b7280", aiName: "gray" },
  pink: { label: "Roz", hex: "#ec4899", aiName: "pink" },
  natural: { label: "Natural", hex: "#d4c4a8", aiName: "natural beige" },
};

export const PRODUCT_COLOR_ORDER: ProductColorId[] = [
  "white",
  "black",
  "navy",
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
  "purple",
  "gray",
  "pink",
  "natural",
];

export const DEFAULT_PRODUCT_COLOR: ProductColorId = "white";

export function getProductColorLabel(colorId: ProductColorId): string {
  return PRODUCT_COLORS[colorId]?.label ?? PRODUCT_COLORS.white.label;
}

/** Replace default white/natural wording in AI product descriptions. */
export function colorizeAiDescription(description: string, colorId: ProductColorId): string {
  if (colorId === "white") return description;
  const aiName = PRODUCT_COLORS[colorId].aiName;
  return description
    .replace(/\bwhite\b/gi, aiName)
    .replace(/\bnatural cotton\b/gi, `${aiName} cotton`)
    .replace(/\bnatural\b/gi, aiName)
    .replace(/\bclear glass\b/gi, `clear glass with ${aiName} lid`);
}
