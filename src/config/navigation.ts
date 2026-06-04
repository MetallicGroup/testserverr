import type { HomeSectionId } from "@/lib/homeNavigation";

export type NavSectionLink = {
  label: string;
  type: "section";
  sectionId: HomeSectionId;
};

export type NavRouteLink = {
  label: string;
  type: "route";
  path: string;
};

export type NavLinkItem = NavSectionLink | NavRouteLink;

export const mainNavLinks: NavLinkItem[] = [
  { label: "Servicii", type: "section", sectionId: "servicii" },
  { label: "Galerie", type: "section", sectionId: "galerie" },
  { label: "Cum funcționează", type: "section", sectionId: "cum-functioneaza" },
  { label: "Comandă", type: "section", sectionId: "comanda" },
  { label: "SEAP / SICAP", type: "route", path: "/seap-sicap" },
  { label: "Despre noi", type: "route", path: "/despre-noi" },
];

export const footerSectionLinks: NavSectionLink[] = [
  { label: "Servicii", type: "section", sectionId: "servicii" },
  { label: "Galerie", type: "section", sectionId: "galerie" },
  { label: "Cum funcționează", type: "section", sectionId: "cum-functioneaza" },
  { label: "Comandă", type: "section", sectionId: "comanda" },
];

export const footerLegalLinks = [
  { label: "Termeni și condiții", path: "/termeni-si-conditii" },
  { label: "Politica de confidențialitate", path: "/politica-confidentialitate" },
  { label: "Despre noi", path: "/despre-noi" },
  { label: "SEAP / SICAP", path: "/seap-sicap" },
] as const;
