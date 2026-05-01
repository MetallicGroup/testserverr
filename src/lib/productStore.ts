import defaultProducts, { type Product } from "@/data/products";
import { storageKeys } from "@/config/siteConfig";

export interface EditableProduct extends Product {
  active: boolean;
}

const toEditableDefaults = (): EditableProduct[] =>
  defaultProducts.map((product) => ({ ...product, active: true }));

export function getProductsFromStore(): EditableProduct[] {
  const fallback = toEditableDefaults();
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(storageKeys.productOverrides);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as EditableProduct[];
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveProductsToStore(products: EditableProduct[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKeys.productOverrides, JSON.stringify(products));
}

export const defaultEditableProducts = toEditableDefaults;
