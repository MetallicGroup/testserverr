export type Finish = "low" | "medium" | "high";

export const FINISH_MULTIPLIERS: Record<Finish, number> = {
  low: 1,
  medium: 1.6,
  high: 2.5,
};

export const FINISH_LABELS: Record<Finish, { label: string; description: string }> = {
  low: { label: "Basic", description: "Imprimare simplă, materiale standard" },
  medium: { label: "Standard", description: "Calitate medie, finisaje îmbunătățite" },
  high: { label: "Premium", description: "Materiale și finisaje de top" },
};

export const FINISH_META: Record<Finish, { label: string; color: string; badge: string }> = {
  low: { label: "Basic", color: "#6b7280", badge: "bg-gray-100 text-gray-700" },
  medium: { label: "Standard", color: "#2563eb", badge: "bg-blue-100 text-blue-700" },
  high: { label: "Premium", color: "#7c3aed", badge: "bg-purple-100 text-purple-700" },
};

/** Visual styling on mockup product image per finish tier */
export const FINISH_IMAGE_STYLES: Record<Finish, { filter: string; overlay: string }> = {
  low: {
    filter: "saturate(0.7) brightness(0.92) contrast(0.95)",
    overlay: "rgba(100, 116, 139, 0.08)",
  },
  medium: {
    filter: "none",
    overlay: "transparent",
  },
  high: {
    filter: "saturate(1.12) contrast(1.06) brightness(1.03)",
    overlay: "rgba(124, 58, 237, 0.06)",
  },
};

export const DEFAULT_PRODUCT_QUANTITY = 100;
export const DEFAULT_FINISH: Finish = "low";
export const FINISH_ORDER: Finish[] = ["low", "medium", "high"];

/** Canvas overlay applied after drawing the base product image */
export const FINISH_CANVAS_EFFECTS: Record<
  Finish,
  { overlay: string; saturation: number; brightness: number; contrast: number }
> = {
  low: {
    overlay: "rgba(100, 116, 139, 0.18)",
    saturation: 0.65,
    brightness: 0.9,
    contrast: 0.92,
  },
  medium: {
    overlay: "transparent",
    saturation: 1,
    brightness: 1,
    contrast: 1,
  },
  high: {
    overlay: "rgba(124, 58, 237, 0.1)",
    saturation: 1.18,
    brightness: 1.04,
    contrast: 1.08,
  },
};
