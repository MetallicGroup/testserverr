// Mockup image configuration
import type { Finish } from "@/lib/finishOptions";
import { getProductVisual, type MockupKey } from "@/data/productVisuals";

// Legacy base imports (kept for bundler; new keys use finish-medium fallback)
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

type PrintArea = { top: string; left: string; width: string; height: string };

const LEGACY_BASE: Partial<Record<MockupKey, string>> = {
  pen: penImg,
  mug: mugImg,
  tshirt: tshirtImg,
  hoodie: hoodieImg,
  cap: capImg,
  totebag: totebagImg,
  bottle: bottleImg,
  notebook: notebookImg,
  usb: usbImg,
  phonecase: phonecaseImg,
  umbrella: umbrellaImg,
  keychain: keychainImg,
  banner: bannerImg,
  backpack: backpackImg,
  powerbank: powerbankImg,
  mousepad: mousepadImg,
  wallet: walletImg,
  lanyard: lanyardImg,
  badge: badgeImg,
  polo: poloImg,
  paper: paperImg,
  box: boxImg,
  generic: genericImg,
  thermos: thermosImg,
};

function finishImageUrl(key: string, finish: Finish): string {
  return new URL(`../assets/mockups/finish/${key}-${finish}.png`, import.meta.url).href;
}

function finishImages(key: string): Partial<Record<Finish, string>> {
  return {
    low: finishImageUrl(key, "low"),
    medium: finishImageUrl(key, "medium"),
    high: finishImageUrl(key, "high"),
  };
}

function baseImageFor(key: string): string {
  return LEGACY_BASE[key as MockupKey] ?? finishImageUrl(key, "medium");
}

const DEFAULT_PRINT: PrintArea = { top: "25%", left: "18%", width: "64%", height: "45%" };

const PRINT_AREAS: Record<string, PrintArea> = {
  pen: { top: "38%", left: "35%", width: "30%", height: "22%" },
  pencil: { top: "35%", left: "30%", width: "40%", height: "20%" },
  mug: { top: "30%", left: "15%", width: "45%", height: "35%" },
  tshirt: { top: "32%", left: "30%", width: "40%", height: "28%" },
  hoodie: { top: "30%", left: "32%", width: "36%", height: "22%" },
  jacket: { top: "30%", left: "32%", width: "36%", height: "24%" },
  vest: { top: "32%", left: "30%", width: "40%", height: "26%" },
  cap: { top: "22%", left: "28%", width: "44%", height: "28%" },
  polo: { top: "35%", left: "32%", width: "36%", height: "25%" },
  totebag: { top: "35%", left: "22%", width: "56%", height: "35%" },
  bottle: { top: "35%", left: "25%", width: "50%", height: "25%" },
  thermos: { top: "32%", left: "25%", width: "50%", height: "28%" },
  jar: { top: "30%", left: "22%", width: "56%", height: "35%" },
  notebook: { top: "30%", left: "28%", width: "44%", height: "30%" },
  folder: { top: "28%", left: "26%", width: "48%", height: "32%" },
  clipboard: { top: "22%", left: "18%", width: "64%", height: "50%" },
  usb: { top: "22%", left: "30%", width: "40%", height: "25%" },
  cable: { top: "30%", left: "15%", width: "70%", height: "35%" },
  phonecase: { top: "25%", left: "20%", width: "60%", height: "40%" },
  phonestand: { top: "14%", left: "30%", width: "40%", height: "22%" },
  carmount: { top: "9%", left: "36%", width: "28%", height: "15%" },
  umbrella: { top: "12%", left: "25%", width: "50%", height: "30%" },
  rainponcho: { top: "20%", left: "20%", width: "60%", height: "40%" },
  keychain: { top: "38%", left: "22%", width: "56%", height: "32%" },
  banner: { top: "15%", left: "28%", width: "44%", height: "55%" },
  flag: { top: "18%", left: "30%", width: "40%", height: "50%" },
  backpack: { top: "18%", left: "28%", width: "44%", height: "25%" },
  powerbank: { top: "28%", left: "22%", width: "56%", height: "30%" },
  speaker: { top: "22%", left: "20%", width: "60%", height: "35%" },
  keyboard: { top: "18%", left: "12%", width: "76%", height: "55%" },
  mouse: { top: "28%", left: "18%", width: "64%", height: "40%" },
  mousepad: {
    top: "22%",
    left: "15%",
    width: "70%",
    height: "48%",
  },
  wallet: { top: "25%", left: "18%", width: "64%", height: "45%" },
  cosmeticbag: { top: "28%", left: "20%", width: "60%", height: "38%" },
  giftbag: { top: "25%", left: "22%", width: "56%", height: "40%" },
  lanyard: { top: "15%", left: "32%", width: "36%", height: "25%" },
  scarf: { top: "20%", left: "15%", width: "70%", height: "45%" },
  socks: { top: "30%", left: "20%", width: "60%", height: "35%" },
  towel: { top: "25%", left: "15%", width: "70%", height: "45%" },
  apron: { top: "28%", left: "25%", width: "50%", height: "35%" },
  badge: { top: "20%", left: "20%", width: "60%", height: "60%" },
  paper: { top: "55%", left: "10%", width: "35%", height: "20%" },
  sticky: { top: "30%", left: "20%", width: "60%", height: "40%" },
  box: { top: "35%", left: "18%", width: "50%", height: "30%" },
  chocolatebox: { top: "32%", left: "20%", width: "60%", height: "30%" },
  winegift: { top: "30%", left: "18%", width: "64%", height: "38%" },
  penholder: { top: "18%", left: "28%", width: "44%", height: "35%" },
  ruler: { top: "40%", left: "10%", width: "80%", height: "18%" },
  headphones: { top: "22%", left: "18%", width: "64%", height: "40%" },
  wristband: { top: "35%", left: "15%", width: "70%", height: "25%" },
  mirror: { top: "25%", left: "25%", width: "50%", height: "50%" },
  lighter: { top: "30%", left: "28%", width: "44%", height: "35%" },
  sunglasses: { top: "28%", left: "15%", width: "70%", height: "35%" },
  blanket: { top: "22%", left: "12%", width: "76%", height: "50%" },
  ball: { top: "25%", left: "20%", width: "60%", height: "45%" },
  frisbee: { top: "28%", left: "12%", width: "76%", height: "50%" },
  airfreshener: { top: "20%", left: "25%", width: "50%", height: "55%" },
  sunshade: { top: "15%", left: "10%", width: "80%", height: "55%" },
  ashtray: { top: "30%", left: "22%", width: "56%", height: "35%" },
  carcharger: { top: "28%", left: "25%", width: "50%", height: "38%" },
  facemask: { top: "28%", left: "20%", width: "60%", height: "38%" },
  firstaid: { top: "28%", left: "20%", width: "60%", height: "38%" },
  lipbalm: { top: "32%", left: "35%", width: "30%", height: "30%" },
  plate: { top: "30%", left: "18%", width: "64%", height: "45%" },
  cuttingboard: { top: "22%", left: "12%", width: "76%", height: "50%" },
  candle: { top: "25%", left: "25%", width: "50%", height: "40%" },
  clock: { top: "28%", left: "28%", width: "44%", height: "44%" },
  pillow: { top: "25%", left: "18%", width: "64%", height: "45%" },
  puzzle: { top: "30%", left: "20%", width: "60%", height: "38%" },
  playingcards: { top: "32%", left: "22%", width: "56%", height: "32%" },
  generic: DEFAULT_PRINT,
};

const MOUSEPAD_PRINT_BY_FINISH: Partial<Record<Finish, PrintArea>> = {
  low: { top: "24%", left: "14%", width: "72%", height: "44%" },
  medium: { top: "20%", left: "14%", width: "72%", height: "46%" },
  high: { top: "7%", left: "16%", width: "68%", height: "30%" },
};

export interface MockupConfig {
  image: string;
  imagesByFinish?: Partial<Record<Finish, string>>;
  printArea: PrintArea;
  printAreaByFinish?: Partial<Record<Finish, PrintArea>>;
}

function buildMockupConfig(key: string): MockupConfig {
  const printArea = PRINT_AREAS[key] ?? DEFAULT_PRINT;
  return {
    image: baseImageFor(key),
    imagesByFinish: finishImages(key),
    printArea,
    printAreaByFinish: key === "mousepad" ? MOUSEPAD_PRINT_BY_FINISH : undefined,
  };
}

export const MOCKUP_IMAGES: Record<string, MockupConfig> = Object.fromEntries(
  [
    "pen", "pencil", "notebook", "banner", "mousepad", "penholder", "clipboard", "folder", "paper", "sticky", "ruler",
    "tshirt", "polo", "hoodie", "jacket", "cap", "scarf", "socks", "towel", "apron", "vest",
    "totebag", "backpack", "wallet", "cosmeticbag", "giftbag",
    "mug", "thermos", "bottle", "jar", "corkscrew", "winegift", "chocolatebox",
    "usb", "powerbank", "phonecase", "headphones", "phonestand", "cable", "speaker", "keyboard", "mouse",
    "keychain", "badge", "lanyard", "wristband", "mirror", "lighter", "sunglasses",
    "umbrella", "rainponcho", "blanket", "ball", "frisbee", "generic",
    "airfreshener", "carmount", "sunshade", "ashtray", "carcharger",
    "facemask", "firstaid", "lipbalm",
    "plate", "cuttingboard", "candle", "clock", "pillow", "flag", "puzzle", "playingcards", "box",
  ].map((key) => [key, buildMockupConfig(key)]),
);

export type ResolvedMockupConfig = MockupConfig & {
  mockupKey: string;
  usesDedicatedFinishImage?: boolean;
  aiDescription?: string;
};

export function getMockupForProduct(name: string, category: string, finish?: Finish): ResolvedMockupConfig {
  const visual = getProductVisual(name, category);
  const baseKey = visual.mockupKey;
  const config = MOCKUP_IMAGES[baseKey] ?? MOCKUP_IMAGES.generic;
  const resolvedPrintArea =
    finish && config.printAreaByFinish?.[finish] ? config.printAreaByFinish[finish]! : config.printArea;

  if (finish && config.imagesByFinish?.[finish]) {
    return {
      ...config,
      mockupKey: baseKey,
      image: config.imagesByFinish[finish]!,
      printArea: resolvedPrintArea,
      usesDedicatedFinishImage: true,
      aiDescription: visual.aiDescription,
    };
  }
  return {
    ...config,
    mockupKey: baseKey,
    printArea: resolvedPrintArea,
    usesDedicatedFinishImage: false,
    aiDescription: visual.aiDescription,
  };
}
