export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number; // base price per unit for "low cost"
}

const products: Product[] = [
  // Articole de birou
  { id: "p1", name: "Pixuri personalizate", category: "Birou", basePrice: 1.5 },
  { id: "p2", name: "Creioane personalizate", category: "Birou", basePrice: 1.0 },
  { id: "p3", name: "Agende personalizate", category: "Birou", basePrice: 8.0 },
  { id: "p4", name: "Carnete de notițe", category: "Birou", basePrice: 5.0 },
  { id: "p5", name: "Calendare de birou", category: "Birou", basePrice: 6.0 },
  { id: "p6", name: "Calendare de perete", category: "Birou", basePrice: 7.0 },
  { id: "p7", name: "Mousepad-uri", category: "Birou", basePrice: 4.0 },
  { id: "p8", name: "Suporturi de pixuri", category: "Birou", basePrice: 5.5 },
  { id: "p9", name: "Clipboard-uri", category: "Birou", basePrice: 6.0 },
  { id: "p10", name: "Markere personalizate", category: "Birou", basePrice: 2.0 },
  { id: "p11", name: "Rigle personalizate", category: "Birou", basePrice: 1.5 },
  { id: "p12", name: "Dosare cu logo", category: "Birou", basePrice: 3.0 },
  { id: "p13", name: "Plicuri personalizate", category: "Birou", basePrice: 0.8 },
  { id: "p14", name: "Hârtie cu antet", category: "Birou", basePrice: 0.5 },
  { id: "p15", name: "Post-it-uri personalizate", category: "Birou", basePrice: 2.5 },

  // Textile
  { id: "p16", name: "Tricouri personalizate", category: "Textile", basePrice: 10.0 },
  { id: "p17", name: "Tricouri polo", category: "Textile", basePrice: 15.0 },
  { id: "p18", name: "Hanorace personalizate", category: "Textile", basePrice: 25.0 },
  { id: "p19", name: "Jachete personalizate", category: "Textile", basePrice: 35.0 },
  { id: "p20", name: "Șepci personalizate", category: "Textile", basePrice: 7.0 },
  { id: "p21", name: "Pălării personalizate", category: "Textile", basePrice: 9.0 },
  { id: "p22", name: "Bandane personalizate", category: "Textile", basePrice: 4.0 },
  { id: "p23", name: "Eșarfe personalizate", category: "Textile", basePrice: 12.0 },
  { id: "p24", name: "Șosete personalizate", category: "Textile", basePrice: 5.0 },
  { id: "p25", name: "Prosoape personalizate", category: "Textile", basePrice: 10.0 },
  { id: "p26", name: "Șorțuri personalizate", category: "Textile", basePrice: 12.0 },
  { id: "p27", name: "Veste personalizate", category: "Textile", basePrice: 20.0 },
  { id: "p28", name: "Salopete personalizate", category: "Textile", basePrice: 30.0 },

  // Genți & Accesorii
  { id: "p29", name: "Sacoșe de pânză", category: "Genți", basePrice: 4.0 },
  { id: "p30", name: "Rucsacuri personalizate", category: "Genți", basePrice: 18.0 },
  { id: "p31", name: "Genți laptop", category: "Genți", basePrice: 22.0 },
  { id: "p32", name: "Genți de voiaj", category: "Genți", basePrice: 28.0 },
  { id: "p33", name: "Portofele personalizate", category: "Genți", basePrice: 10.0 },
  { id: "p34", name: "Borsete personalizate", category: "Genți", basePrice: 12.0 },
  { id: "p35", name: "Genți cosmetice", category: "Genți", basePrice: 8.0 },
  { id: "p36", name: "Pungi cadou personalizate", category: "Genți", basePrice: 2.0 },

  // Băuturi & Alimentare
  { id: "p37", name: "Căni ceramice", category: "Băuturi", basePrice: 5.0 },
  { id: "p38", name: "Căni termice", category: "Băuturi", basePrice: 12.0 },
  { id: "p39", name: "Termosuri personalizate", category: "Băuturi", basePrice: 14.0 },
  { id: "p40", name: "Sticle de apă", category: "Băuturi", basePrice: 8.0 },
  { id: "p41", name: "Pahare personalizate", category: "Băuturi", basePrice: 6.0 },
  { id: "p42", name: "Borcane personalizate", category: "Băuturi", basePrice: 5.0 },
  { id: "p43", name: "Tirbuşoane personalizate", category: "Băuturi", basePrice: 7.0 },
  { id: "p44", name: "Desfăcătoare de sticle", category: "Băuturi", basePrice: 3.0 },
  { id: "p45", name: "Seturi de vin personalizate", category: "Băuturi", basePrice: 25.0 },
  { id: "p46", name: "Cutii de ciocolată cu logo", category: "Băuturi", basePrice: 15.0 },

  // Tehnologie
  { id: "p47", name: "USB-uri personalizate", category: "Tehnologie", basePrice: 6.0 },
  { id: "p48", name: "Powerbank-uri personalizate", category: "Tehnologie", basePrice: 15.0 },
  { id: "p49", name: "Carcase telefon", category: "Tehnologie", basePrice: 8.0 },
  { id: "p50", name: "Căști personalizate", category: "Tehnologie", basePrice: 12.0 },
  { id: "p51", name: "Suporturi de telefon", category: "Tehnologie", basePrice: 4.0 },
  { id: "p52", name: "Cabluri de încărcare cu logo", category: "Tehnologie", basePrice: 3.5 },
  { id: "p53", name: "Boxe bluetooth personalizate", category: "Tehnologie", basePrice: 18.0 },
  { id: "p54", name: "Webcam cover personalizat", category: "Tehnologie", basePrice: 1.5 },
  { id: "p55", name: "Mouse wireless personalizat", category: "Tehnologie", basePrice: 10.0 },
  { id: "p56", name: "Tastaturi personalizate", category: "Tehnologie", basePrice: 20.0 },

  // Accesorii personale
  { id: "p57", name: "Brelocuri personalizate", category: "Accesorii", basePrice: 2.5 },
  { id: "p58", name: "Insigne / Ecusoane", category: "Accesorii", basePrice: 2.0 },
  { id: "p59", name: "Lanyard-uri personalizate", category: "Accesorii", basePrice: 2.0 },
  { id: "p60", name: "Cordoane pentru ecuson", category: "Accesorii", basePrice: 1.5 },
  { id: "p61", name: "Portcard-uri personalizate", category: "Accesorii", basePrice: 5.0 },
  { id: "p62", name: "Brățări personalizate", category: "Accesorii", basePrice: 3.0 },
  { id: "p63", name: "Oglinzi de buzunar", category: "Accesorii", basePrice: 3.0 },
  { id: "p64", name: "Brichete personalizate", category: "Accesorii", basePrice: 2.5 },
  { id: "p65", name: "Ochelari de soare cu logo", category: "Accesorii", basePrice: 6.0 },

  // Outdoor & Sport
  { id: "p66", name: "Umbrele personalizate", category: "Outdoor", basePrice: 10.0 },
  { id: "p67", name: "Pelerine de ploaie", category: "Outdoor", basePrice: 5.0 },
  { id: "p68", name: "Pături personalizate", category: "Outdoor", basePrice: 15.0 },
  { id: "p69", name: "Saltele gonflabile cu logo", category: "Outdoor", basePrice: 18.0 },
  { id: "p70", name: "Mingi personalizate", category: "Outdoor", basePrice: 8.0 },
  { id: "p71", name: "Frisbee-uri personalizate", category: "Outdoor", basePrice: 4.0 },
  { id: "p72", name: "Genți sport personalizate", category: "Outdoor", basePrice: 14.0 },
  { id: "p73", name: "Sticle sport", category: "Outdoor", basePrice: 7.0 },

  // Auto & Transport
  { id: "p74", name: "Odorizante auto personalizate", category: "Auto", basePrice: 1.5 },
  { id: "p75", name: "Suporturi auto pentru telefon", category: "Auto", basePrice: 5.0 },
  { id: "p76", name: "Parasolare auto cu logo", category: "Auto", basePrice: 8.0 },
  { id: "p77", name: "Scrumiere personalizate", category: "Auto", basePrice: 4.0 },
  { id: "p78", name: "Încărcătoare auto cu logo", category: "Auto", basePrice: 6.0 },

  // Sănătate & Igienă
  { id: "p79", name: "Dezinfectanți personalizați", category: "Sănătate", basePrice: 2.0 },
  { id: "p80", name: "Măști personalizate", category: "Sănătate", basePrice: 2.5 },
  { id: "p81", name: "Truse de prim ajutor cu logo", category: "Sănătate", basePrice: 10.0 },
  { id: "p82", name: "Balsam de buze personalizat", category: "Sănătate", basePrice: 3.0 },
  { id: "p83", name: "Kit-uri de igienă personalizate", category: "Sănătate", basePrice: 8.0 },

  // Bucătărie & Casă
  { id: "p84", name: "Farfurii personalizate", category: "Casă", basePrice: 7.0 },
  { id: "p85", name: "Tocătoare personalizate", category: "Casă", basePrice: 8.0 },
  { id: "p86", name: "Magneti de frigider", category: "Casă", basePrice: 2.0 },
  { id: "p87", name: "Lumânări personalizate", category: "Casă", basePrice: 6.0 },
  { id: "p88", name: "Ceasuri de perete cu logo", category: "Casă", basePrice: 14.0 },
  { id: "p89", name: "Perne personalizate", category: "Casă", basePrice: 12.0 },

  // Tipărituri & Marketing
  { id: "p90", name: "Stickere personalizate", category: "Marketing", basePrice: 0.5 },
  { id: "p91", name: "Flyere personalizate", category: "Marketing", basePrice: 0.3 },
  { id: "p92", name: "Broșuri personalizate", category: "Marketing", basePrice: 1.0 },
  { id: "p93", name: "Bannere roll-up", category: "Marketing", basePrice: 35.0 },
  { id: "p94", name: "Afișe personalizate", category: "Marketing", basePrice: 3.0 },
  { id: "p95", name: "Cărți de vizită", category: "Marketing", basePrice: 0.2 },
  { id: "p96", name: "Etichete personalizate", category: "Marketing", basePrice: 0.3 },
  { id: "p97", name: "Panouri publicitare", category: "Marketing", basePrice: 40.0 },
  { id: "p98", name: "Steaguri personalizate", category: "Marketing", basePrice: 20.0 },
  { id: "p99", name: "Puzzle-uri personalizate", category: "Diverse", basePrice: 8.0 },
  { id: "p100", name: "Jocuri de cărți personalizate", category: "Diverse", basePrice: 6.0 },
];

export const productCategories = Array.from(new Set(products.map((p) => p.category)));

export default products;
