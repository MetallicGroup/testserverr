// Mockup image imports
import penImg from "@/assets/mockups/pen.png";
import mugImg from "@/assets/mockups/mug.png";
import tshirtImg from "@/assets/mockups/tshirt.png";
import hoodieImg from "@/assets/mockups/hoodie.png";
import capImg from "@/assets/mockups/cap.png";
import totebagImg from "@/assets/mockups/totebag.png";
import bottleImg from "@/assets/mockups/bottle.png";
import notebookImg from "@/assets/mockups/notebook.png";
import usbImg from "@/assets/mockups/usb.png";
import phonecaseImg from "@/assets/mockups/phonecase.png";
import umbrellaImg from "@/assets/mockups/umbrella.png";
import keychainImg from "@/assets/mockups/keychain.png";
import bannerImg from "@/assets/mockups/banner.png";
import backpackImg from "@/assets/mockups/backpack.png";
import powerbankImg from "@/assets/mockups/powerbank.png";
import mousepadImg from "@/assets/mockups/mousepad.png";
import walletImg from "@/assets/mockups/wallet.png";
import lanyardImg from "@/assets/mockups/lanyard.png";
import badgeImg from "@/assets/mockups/badge.png";
import poloImg from "@/assets/mockups/polo.png";
import paperImg from "@/assets/mockups/paper.png";
import boxImg from "@/assets/mockups/box.png";
import genericImg from "@/assets/mockups/generic.png";
import thermosImg from "@/assets/mockups/thermos.png";

export interface MockupConfig {
  image: string;
  /** Print area as CSS percentages relative to the image container */
  printArea: { top: string; left: string; width: string; height: string };
}

export const MOCKUP_IMAGES: Record<string, MockupConfig> = {
  pen:       { image: penImg,       printArea: { top: "38%", left: "35%", width: "30%", height: "22%" } },
  mug:       { image: mugImg,       printArea: { top: "30%", left: "15%", width: "45%", height: "35%" } },
  tshirt:    { image: tshirtImg,    printArea: { top: "32%", left: "30%", width: "40%", height: "28%" } },
  hoodie:    { image: hoodieImg,    printArea: { top: "30%", left: "32%", width: "36%", height: "22%" } },
  cap:       { image: capImg,       printArea: { top: "22%", left: "28%", width: "44%", height: "28%" } },
  totebag:   { image: totebagImg,   printArea: { top: "35%", left: "22%", width: "56%", height: "35%" } },
  bottle:    { image: bottleImg,    printArea: { top: "35%", left: "25%", width: "50%", height: "25%" } },
  thermos:   { image: thermosImg,   printArea: { top: "32%", left: "25%", width: "50%", height: "28%" } },
  notebook:  { image: notebookImg,  printArea: { top: "20%", left: "22%", width: "58%", height: "40%" } },
  usb:       { image: usbImg,      printArea: { top: "22%", left: "30%", width: "40%", height: "25%" } },
  phonecase: { image: phonecaseImg, printArea: { top: "25%", left: "20%", width: "60%", height: "40%" } },
  umbrella:  { image: umbrellaImg,  printArea: { top: "12%", left: "25%", width: "50%", height: "30%" } },
  keychain:  { image: keychainImg,  printArea: { top: "38%", left: "22%", width: "56%", height: "32%" } },
  banner:    { image: bannerImg,    printArea: { top: "15%", left: "28%", width: "44%", height: "55%" } },
  backpack:  { image: backpackImg,  printArea: { top: "18%", left: "28%", width: "44%", height: "25%" } },
  powerbank: { image: powerbankImg, printArea: { top: "28%", left: "22%", width: "56%", height: "30%" } },
  mousepad:  { image: mousepadImg,  printArea: { top: "18%", left: "12%", width: "76%", height: "60%" } },
  wallet:    { image: walletImg,    printArea: { top: "25%", left: "18%", width: "64%", height: "45%" } },
  lanyard:   { image: lanyardImg,   printArea: { top: "15%", left: "32%", width: "36%", height: "25%" } },
  badge:     { image: badgeImg,     printArea: { top: "20%", left: "20%", width: "60%", height: "60%" } },
  polo:      { image: poloImg,      printArea: { top: "35%", left: "32%", width: "36%", height: "25%" } },
  paper:     { image: paperImg,     printArea: { top: "55%", left: "10%", width: "35%", height: "20%" } },
  box:       { image: boxImg,       printArea: { top: "35%", left: "18%", width: "50%", height: "30%" } },
  generic:   { image: genericImg,   printArea: { top: "25%", left: "18%", width: "64%", height: "45%" } },
};

/* ─── Map each product category to a default mockup ─── */
export const CATEGORY_TO_MOCKUP: Record<string, string> = {
  Birou: "notebook",
  Textile: "tshirt",
  Genți: "totebag",
  Băuturi: "mug",
  Tehnologie: "usb",
  Accesorii: "keychain",
  Outdoor: "umbrella",
  Auto: "generic",
  Sănătate: "generic",
  Casă: "mug",
  Marketing: "paper",
  Diverse: "generic",
};

/* ─── Product-specific overrides ─── */
export const PRODUCT_MOCKUP_OVERRIDES: Record<string, string> = {
  // Birou
  "Pixuri personalizate": "pen",
  "Creioane personalizate": "pen",
  "Markere personalizate": "pen",
  "Rigle personalizate": "pen",
  "Agende personalizate": "notebook",
  "Carnete de notițe": "notebook",
  "Calendare de birou": "notebook",
  "Calendare de perete": "banner",
  "Mousepad-uri": "mousepad",
  "Suporturi de pixuri": "box",
  "Clipboard-uri": "notebook",
  "Dosare cu logo": "notebook",
  "Plicuri personalizate": "paper",
  "Hârtie cu antet": "paper",
  "Post-it-uri personalizate": "paper",

  // Textile
  "Tricouri personalizate": "tshirt",
  "Tricouri polo": "polo",
  "Hanorace personalizate": "hoodie",
  "Jachete personalizate": "hoodie",
  "Șepci personalizate": "cap",
  "Pălării personalizate": "cap",
  "Bandane personalizate": "cap",
  "Eșarfe personalizate": "generic",
  "Șosete personalizate": "generic",
  "Prosoape personalizate": "generic",
  "Șorțuri personalizate": "hoodie",
  "Veste personalizate": "hoodie",
  "Salopete personalizate": "hoodie",

  // Genți
  "Sacoșe de pânză": "totebag",
  "Rucsacuri personalizate": "backpack",
  "Genți laptop": "backpack",
  "Genți de voiaj": "backpack",
  "Portofele personalizate": "wallet",
  "Borsete personalizate": "wallet",
  "Genți cosmetice": "wallet",
  "Pungi cadou personalizate": "totebag",

  // Băuturi
  "Căni ceramice": "mug",
  "Căni termice": "mug",
  "Termosuri personalizate": "thermos",
  "Sticle de apă": "bottle",
  "Pahare personalizate": "mug",
  "Borcane personalizate": "mug",
  "Tirbuşoane personalizate": "generic",
  "Desfăcătoare de sticle": "generic",
  "Seturi de vin personalizate": "box",
  "Cutii de ciocolată cu logo": "box",

  // Tehnologie
  "USB-uri personalizate": "usb",
  "Powerbank-uri personalizate": "powerbank",
  "Carcase telefon": "phonecase",
  "Căști personalizate": "generic",
  "Suporturi de telefon": "phonecase",
  "Cabluri de încărcare cu logo": "generic",
  "Boxe bluetooth personalizate": "generic",
  "Webcam cover personalizat": "badge",
  "Mouse wireless personalizat": "mousepad",
  "Tastaturi personalizate": "generic",

  // Accesorii
  "Brelocuri personalizate": "keychain",
  "Insigne / Ecusoane": "badge",
  "Lanyard-uri personalizate": "lanyard",
  "Cordoane pentru ecuson": "lanyard",
  "Portcard-uri personalizate": "wallet",
  "Brățări personalizate": "generic",
  "Oglinzi de buzunar": "generic",
  "Brichete personalizate": "generic",
  "Ochelari de soare cu logo": "generic",

  // Outdoor
  "Umbrele personalizate": "umbrella",
  "Pelerine de ploaie": "umbrella",
  "Pături personalizate": "generic",
  "Saltele gonflabile cu logo": "generic",
  "Mingi personalizate": "generic",
  "Frisbee-uri personalizate": "generic",
  "Genți sport personalizate": "backpack",
  "Sticle sport": "bottle",

  // Auto
  "Odorizante auto personalizate": "generic",
  "Suporturi auto pentru telefon": "generic",
  "Parasolare auto cu logo": "generic",
  "Scrumiere personalizate": "generic",
  "Încărcătoare auto cu logo": "generic",

  // Sănătate
  "Dezinfectanți personalizați": "bottle",
  "Măști personalizate": "generic",
  "Truse de prim ajutor cu logo": "box",
  "Balsam de buze personalizat": "generic",
  "Kit-uri de igienă personalizate": "box",

  // Casă
  "Farfurii personalizate": "generic",
  "Tocătoare personalizate": "box",
  "Magneti de frigider": "badge",
  "Lumânări personalizate": "generic",
  "Ceasuri de perete cu logo": "generic",
  "Perne personalizate": "generic",

  // Marketing
  "Stickere personalizate": "badge",
  "Flyere personalizate": "paper",
  "Broșuri personalizate": "paper",
  "Bannere roll-up": "banner",
  "Afișe personalizate": "banner",
  "Cărți de vizită": "paper",
  "Etichete personalizate": "paper",
  "Panouri publicitare": "banner",
  "Steaguri personalizate": "banner",

  // Diverse
  "Puzzle-uri personalizate": "generic",
  "Jocuri de cărți personalizate": "paper",
};

export function getMockupForProduct(name: string, category: string): MockupConfig {
  const overrideKey = PRODUCT_MOCKUP_OVERRIDES[name];
  if (overrideKey && MOCKUP_IMAGES[overrideKey]) return MOCKUP_IMAGES[overrideKey];
  const catKey = CATEGORY_TO_MOCKUP[category] || "generic";
  return MOCKUP_IMAGES[catKey] || MOCKUP_IMAGES.generic;
}
