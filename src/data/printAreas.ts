/** Percent-based print zone on mockup image (top/left/width/height). */
export interface PrintArea {
  top: string;
  left: string;
  width: string;
  height: string;
}

/** Per-product overrides — when mockup-key defaults are too generic for the composition. */
export const PRODUCT_PRINT_AREAS: Record<string, PrintArea> = {
  "Seturi de vin personalizate": { top: "35%", left: "26%", width: "17%", height: "24%" },
  "Cutii de ciocolată cu logo": { top: "26%", left: "30%", width: "40%", height: "22%" },
  "Borcane personalizate": { top: "34%", left: "28%", width: "22%", height: "28%" },
  "Seturi cadou personalizate": { top: "28%", left: "28%", width: "44%", height: "26%" },
  "Truse de prim ajutor cu logo": { top: "32%", left: "28%", width: "38%", height: "28%" },
  "Kit-uri de igienă personalizate": { top: "32%", left: "28%", width: "38%", height: "28%" },
  "Puzzle-uri personalizate": { top: "30%", left: "26%", width: "48%", height: "28%" },
  "Jocuri de cărți personalizate": { top: "30%", left: "28%", width: "44%", height: "30%" },
  "Genți cosmetice": { top: "30%", left: "26%", width: "48%", height: "32%" },
  "Pungi cadou personalizate": { top: "28%", left: "30%", width: "40%", height: "38%" },
  "Boxe bluetooth personalizate": { top: "30%", left: "28%", width: "44%", height: "32%" },
  "Căști personalizate": { top: "28%", left: "22%", width: "56%", height: "30%" },
  "Suporturi auto pentru telefon": { top: "9%", left: "36%", width: "28%", height: "15%" },
  "Suporturi de telefon": { top: "14%", left: "30%", width: "40%", height: "22%" },
  "Parasolare auto cu logo": { top: "18%", left: "22%", width: "56%", height: "38%" },
  "Odorizante auto personalizate": { top: "22%", left: "32%", width: "36%", height: "42%" },
  "Încărcătoare auto cu logo": { top: "30%", left: "32%", width: "36%", height: "32%" },
  "Sticle de apă": { top: "32%", left: "30%", width: "40%", height: "30%" },
  "Termosuri personalizate": { top: "30%", left: "28%", width: "44%", height: "32%" },
  "Căni ceramice": { top: "30%", left: "18%", width: "38%", height: "32%" },
  "Căni termice": { top: "30%", left: "18%", width: "38%", height: "32%" },
  "Powerbank-uri personalizate": { top: "28%", left: "26%", width: "48%", height: "30%" },
  "USB-uri personalizate": { top: "24%", left: "32%", width: "36%", height: "28%" },
  "Mouse wireless personalizat": { top: "30%", left: "24%", width: "52%", height: "36%" },
  "Mousepad-uri": { top: "22%", left: "15%", width: "70%", height: "48%" },
};

/** Default print zones per mockup family (tuned for typical AI composition). */
export const MOCKUP_KEY_PRINT_AREAS: Record<string, PrintArea> = {
  winegift: { top: "35%", left: "26%", width: "17%", height: "24%" },
  chocolatebox: { top: "26%", left: "30%", width: "40%", height: "22%" },
  carmount: { top: "9%", left: "36%", width: "28%", height: "15%" },
  phonestand: { top: "14%", left: "30%", width: "40%", height: "22%" },
  bottle: { top: "32%", left: "30%", width: "40%", height: "30%" },
  mug: { top: "30%", left: "18%", width: "38%", height: "32%" },
  jar: { top: "34%", left: "28%", width: "22%", height: "28%" },
  giftbag: { top: "28%", left: "30%", width: "40%", height: "38%" },
  box: { top: "28%", left: "28%", width: "44%", height: "26%" },
  tshirt: { top: "32%", left: "30%", width: "40%", height: "28%" },
  polo: { top: "35%", left: "32%", width: "36%", height: "25%" },
  hoodie: { top: "30%", left: "32%", width: "36%", height: "22%" },
  cap: { top: "22%", left: "28%", width: "44%", height: "28%" },
  pen: { top: "38%", left: "35%", width: "30%", height: "22%" },
  notebook: { top: "30%", left: "28%", width: "44%", height: "30%" },
  usb: { top: "24%", left: "32%", width: "36%", height: "28%" },
  powerbank: { top: "28%", left: "26%", width: "48%", height: "30%" },
  speaker: { top: "30%", left: "28%", width: "44%", height: "32%" },
  headphones: { top: "28%", left: "22%", width: "56%", height: "30%" },
  mouse: { top: "30%", left: "24%", width: "52%", height: "36%" },
  mousepad: { top: "22%", left: "15%", width: "70%", height: "48%" },
  penholder: { top: "18%", left: "28%", width: "44%", height: "35%" },
  firstaid: { top: "32%", left: "28%", width: "38%", height: "28%" },
  puzzle: { top: "30%", left: "26%", width: "48%", height: "28%" },
  playingcards: { top: "30%", left: "28%", width: "44%", height: "30%" },
  airfreshener: { top: "22%", left: "32%", width: "36%", height: "42%" },
  sunshade: { top: "18%", left: "22%", width: "56%", height: "38%" },
  carcharger: { top: "30%", left: "32%", width: "36%", height: "32%" },
};

export function resolvePrintArea(
  productName: string,
  mockupKey: string,
  fallback: PrintArea,
): PrintArea {
  return PRODUCT_PRINT_AREAS[productName] ?? MOCKUP_KEY_PRINT_AREAS[mockupKey] ?? fallback;
}
