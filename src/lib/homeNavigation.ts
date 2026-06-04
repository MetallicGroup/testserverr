export const HOME_SECTION_IDS = {
  servicii: "servicii",
  galerie: "galerie",
  cumFunctioneaza: "cum-functioneaza",
  comanda: "comanda",
} as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[keyof typeof HOME_SECTION_IDS];

export function scrollToHomeSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const el = document.getElementById(sectionId);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function scrollToPageTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, behavior });
}

export type HomeScrollState = { scrollTo?: HomeSectionId };
