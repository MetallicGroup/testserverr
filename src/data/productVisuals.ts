/** Visual mockup key + AI description per product (exact catalog name). */
export interface ProductVisual {
  mockupKey: string;
  aiDescription: string;
}

export const PRODUCT_VISUALS: Record<string, ProductVisual> = {
  // Birou
  "Pixuri personalizate": { mockupKey: "pen", aiDescription: "a white promotional ballpoint pen" },
  "Creioane personalizate": { mockupKey: "pencil", aiDescription: "a white branded wooden pencil" },
  "Agende personalizate": { mockupKey: "notebook", aiDescription: "a hardcover branded planner notebook" },
  "Carnete de notițe": { mockupKey: "notebook", aiDescription: "a small branded spiral notebook" },
  "Calendare de birou": { mockupKey: "notebook", aiDescription: "a desk calendar pad with stand" },
  "Calendare de perete": { mockupKey: "banner", aiDescription: "a wall calendar with spiral binding" },
  "Mousepad-uri": { mockupKey: "mousepad", aiDescription: "a white rectangular desk mouse pad" },
  "Suporturi de pixuri": { mockupKey: "penholder", aiDescription: "a white desk pen holder cup with multiple pen slots" },
  "Clipboard-uri": { mockupKey: "clipboard", aiDescription: "a white A4 clipboard board with metal clip" },
  "Markere personalizate": { mockupKey: "pen", aiDescription: "a white promotional marker pen" },
  "Rigle personalizate": { mockupKey: "ruler", aiDescription: "a white 30cm promotional ruler" },
  "Dosare cu logo": { mockupKey: "folder", aiDescription: "a white A4 ring binder folder" },
  "Plicuri personalizate": { mockupKey: "paper", aiDescription: "a stack of branded white envelopes" },
  "Hârtie cu antet": { mockupKey: "paper", aiDescription: "a stack of branded letterhead paper sheets" },
  "Post-it-uri personalizate": { mockupKey: "sticky", aiDescription: "a branded sticky notes pad cube" },

  // Textile
  "Tricouri personalizate": { mockupKey: "tshirt", aiDescription: "a white cotton t-shirt laid flat" },
  "Tricouri polo": { mockupKey: "polo", aiDescription: "a white polo shirt laid flat" },
  "Hanorace personalizate": { mockupKey: "hoodie", aiDescription: "a white hoodie sweatshirt laid flat" },
  "Jachete personalizate": { mockupKey: "jacket", aiDescription: "a white zip-up jacket laid flat" },
  "Șepci personalizate": { mockupKey: "cap", aiDescription: "a white baseball cap" },
  "Pălării personalizate": { mockupKey: "cap", aiDescription: "a white promotional bucket hat" },
  "Bandane personalizate": { mockupKey: "scarf", aiDescription: "a white square cotton bandana" },
  "Eșarfe personalizate": { mockupKey: "scarf", aiDescription: "a white woven scarf" },
  "Șosete personalizate": { mockupKey: "socks", aiDescription: "a pair of white branded crew socks" },
  "Prosoape personalizate": { mockupKey: "towel", aiDescription: "a white folded cotton towel" },
  "Șorțuri personalizate": { mockupKey: "apron", aiDescription: "a white kitchen apron" },
  "Veste personalizate": { mockupKey: "vest", aiDescription: "a white zip vest laid flat" },
  "Salopete personalizate": { mockupKey: "hoodie", aiDescription: "a white work jumpsuit coverall laid flat" },

  // Genți
  "Sacoșe de pânză": { mockupKey: "totebag", aiDescription: "a natural cotton tote bag" },
  "Rucsacuri personalizate": { mockupKey: "backpack", aiDescription: "a white polyester backpack" },
  "Genți laptop": { mockupKey: "backpack", aiDescription: "a white laptop messenger bag" },
  "Genți de voiaj": { mockupKey: "backpack", aiDescription: "a white travel duffel bag" },
  "Portofele personalizate": { mockupKey: "wallet", aiDescription: "a white bifold wallet" },
  "Borsete personalizate": { mockupKey: "wallet", aiDescription: "a white cosmetic pouch bag" },
  "Genți cosmetice": { mockupKey: "cosmeticbag", aiDescription: "a white zippered cosmetic bag" },
  "Pungi cadou personalizate": { mockupKey: "giftbag", aiDescription: "a white paper gift bag with handles" },

  // Băuturi
  "Căni ceramice": { mockupKey: "mug", aiDescription: "a white ceramic coffee mug with handle" },
  "Căni termice": { mockupKey: "mug", aiDescription: "a white insulated travel mug with lid" },
  "Termosuri personalizate": { mockupKey: "thermos", aiDescription: "a white insulated thermos flask" },
  "Sticle de apă": { mockupKey: "bottle", aiDescription: "a white reusable water bottle" },
  "Pahare personalizate": { mockupKey: "mug", aiDescription: "a white promotional drinking glass" },
  "Borcane personalizate": { mockupKey: "jar", aiDescription: "a clear glass jar with white lid for branding" },
  "Tirbuşoane personalizate": { mockupKey: "corkscrew", aiDescription: "a white promotional corkscrew wine opener" },
  "Desfăcătoare de sticle": { mockupKey: "corkscrew", aiDescription: "a white bottle opener tool" },
  "Seturi de vin personalizate": {
    mockupKey: "winegift",
    aiDescription:
      "a white wine gift box set with bottle on the left and accessories, bottle has blank front label",
  },
  "Cutii de ciocolată cu logo": { mockupKey: "chocolatebox", aiDescription: "a white rectangular chocolate gift box" },

  // Tehnologie
  "USB-uri personalizate": { mockupKey: "usb", aiDescription: "a white USB flash drive" },
  "Powerbank-uri personalizate": { mockupKey: "powerbank", aiDescription: "a white portable powerbank" },
  "Carcase telefon": { mockupKey: "phonecase", aiDescription: "a white smartphone case" },
  "Căști personalizate": { mockupKey: "headphones", aiDescription: "white over-ear promotional headphones" },
  "Suporturi de telefon": { mockupKey: "phonestand", aiDescription: "a white adjustable desk phone stand holder" },
  "Cabluri de încărcare cu logo": { mockupKey: "cable", aiDescription: "a white coiled USB charging cable" },
  "Boxe bluetooth personalizate": { mockupKey: "speaker", aiDescription: "a white portable bluetooth speaker" },
  "Webcam cover personalizat": { mockupKey: "badge", aiDescription: "a small white webcam privacy slider cover" },
  "Mouse wireless personalizat": { mockupKey: "mouse", aiDescription: "a white wireless computer mouse" },
  "Tastaturi personalizate": { mockupKey: "keyboard", aiDescription: "a white wireless keyboard" },

  // Accesorii
  "Brelocuri personalizate": { mockupKey: "keychain", aiDescription: "a white acrylic keychain" },
  "Insigne / Ecusoane": { mockupKey: "badge", aiDescription: "a round white pin badge" },
  "Lanyard-uri personalizate": { mockupKey: "lanyard", aiDescription: "a white woven lanyard strap with clip" },
  "Cordoane pentru ecuson": { mockupKey: "lanyard", aiDescription: "a white badge cord lanyard" },
  "Portcard-uri personalizate": { mockupKey: "wallet", aiDescription: "a white RFID card holder wallet" },
  "Brățări personalizate": { mockupKey: "wristband", aiDescription: "a white silicone wristband bracelet" },
  "Oglinzi de buzunar": { mockupKey: "mirror", aiDescription: "a small white round pocket mirror" },
  "Brichete personalizate": { mockupKey: "lighter", aiDescription: "a white promotional lighter" },
  "Ochelari de soare cu logo": { mockupKey: "sunglasses", aiDescription: "white promotional sunglasses" },

  // Outdoor
  "Umbrele personalizate": { mockupKey: "umbrella", aiDescription: "a white folding umbrella" },
  "Pelerine de ploaie": { mockupKey: "rainponcho", aiDescription: "a white folded rain poncho in pouch" },
  "Pături personalizate": { mockupKey: "blanket", aiDescription: "a white folded fleece blanket" },
  "Saltele gonflabile cu logo": { mockupKey: "generic", aiDescription: "a white inflatable air mattress" },
  "Mingi personalizate": { mockupKey: "ball", aiDescription: "a white promotional soccer ball" },
  "Frisbee-uri personalizate": { mockupKey: "frisbee", aiDescription: "a white plastic frisbee disc" },
  "Genți sport personalizate": { mockupKey: "backpack", aiDescription: "a white sports gym drawstring bag" },
  "Sticle sport": { mockupKey: "bottle", aiDescription: "a white sports squeeze water bottle" },

  // Auto
  "Odorizante auto personalizate": { mockupKey: "airfreshener", aiDescription: "a white car air freshener hanging card" },
  "Suporturi auto pentru telefon": { mockupKey: "carmount", aiDescription: "a white car dashboard phone mount holder" },
  "Parasolare auto cu logo": { mockupKey: "sunshade", aiDescription: "a white foldable car windshield sun shade" },
  "Scrumiere personalizate": { mockupKey: "ashtray", aiDescription: "a white pocket ashtray" },
  "Încărcătoare auto cu logo": { mockupKey: "carcharger", aiDescription: "a white dual USB car charger adapter" },

  // Sănătate
  "Dezinfectanți personalizați": { mockupKey: "bottle", aiDescription: "a white hand sanitizer spray bottle" },
  "Măști personalizate": { mockupKey: "facemask", aiDescription: "a white fabric face mask" },
  "Truse de prim ajutor cu logo": { mockupKey: "firstaid", aiDescription: "a white compact first aid kit pouch" },
  "Balsam de buze personalizat": { mockupKey: "lipbalm", aiDescription: "a white lip balm stick tube" },
  "Kit-uri de igienă personalizate": { mockupKey: "firstaid", aiDescription: "a white hygiene kit zip pouch" },

  // Casă
  "Farfurii personalizate": { mockupKey: "plate", aiDescription: "a white ceramic dinner plate" },
  "Tocătoare personalizate": { mockupKey: "cuttingboard", aiDescription: "a white bamboo cutting board" },
  "Magneti de frigider": { mockupKey: "badge", aiDescription: "a round white fridge magnet" },
  "Lumânări personalizate": { mockupKey: "candle", aiDescription: "a white scented candle in glass jar" },
  "Ceasuri de perete cu logo": { mockupKey: "clock", aiDescription: "a white round wall clock" },
  "Perne personalizate": { mockupKey: "pillow", aiDescription: "a white square throw pillow" },

  // Marketing
  "Stickere personalizate": { mockupKey: "badge", aiDescription: "a sheet of white promotional stickers" },
  "Flyere personalizate": { mockupKey: "paper", aiDescription: "a stack of white A5 flyers" },
  "Broșuri personalizate": { mockupKey: "paper", aiDescription: "a tri-fold white brochure" },
  "Bannere roll-up": { mockupKey: "banner", aiDescription: "a roll-up banner display with blank white vinyl" },
  "Afișe personalizate": { mockupKey: "banner", aiDescription: "a white promotional poster" },
  "Cărți de vizită": { mockupKey: "paper", aiDescription: "a stack of blank white business cards" },
  "Etichete personalizate": { mockupKey: "paper", aiDescription: "a roll of white product labels" },
  "Panouri publicitare": { mockupKey: "banner", aiDescription: "a large white outdoor advertising board" },
  "Steaguri personalizate": { mockupKey: "flag", aiDescription: "a white promotional flag on pole" },

  // Diverse
  "Puzzle-uri personalizate": { mockupKey: "puzzle", aiDescription: "a white jigsaw puzzle in box" },
  "Jocuri de cărți personalizate": { mockupKey: "playingcards", aiDescription: "a white custom playing cards deck box" },
};

export function getProductVisual(productName: string, category: string): ProductVisual {
  const mapped = PRODUCT_VISUALS[productName];
  if (mapped) return mapped;

  const categoryFallback: Record<string, ProductVisual> = {
    Birou: { mockupKey: "notebook", aiDescription: `a branded office product: ${productName}` },
    Textile: { mockupKey: "tshirt", aiDescription: `a branded textile product: ${productName}` },
    Genți: { mockupKey: "totebag", aiDescription: `a branded bag: ${productName}` },
    Băuturi: { mockupKey: "mug", aiDescription: `a branded drinkware item: ${productName}` },
    Tehnologie: { mockupKey: "usb", aiDescription: `a branded tech gadget: ${productName}` },
    Accesorii: { mockupKey: "keychain", aiDescription: `a branded accessory: ${productName}` },
    Outdoor: { mockupKey: "umbrella", aiDescription: `a branded outdoor product: ${productName}` },
    Auto: { mockupKey: "generic", aiDescription: `a branded car accessory: ${productName}` },
    Sănătate: { mockupKey: "bottle", aiDescription: `a branded health product: ${productName}` },
    Casă: { mockupKey: "generic", aiDescription: `a branded home product: ${productName}` },
    Marketing: { mockupKey: "paper", aiDescription: `a branded print marketing item: ${productName}` },
    Diverse: { mockupKey: "generic", aiDescription: `a branded promotional product: ${productName}` },
  };

  return categoryFallback[category] ?? {
    mockupKey: "generic",
    aiDescription: `a promotional ${productName}`,
  };
}

/** All mockup keys that need finish-tier image assets. */
export const ALL_MOCKUP_KEYS = [
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
] as const;

export type MockupKey = (typeof ALL_MOCKUP_KEYS)[number];
