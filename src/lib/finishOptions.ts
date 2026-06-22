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
