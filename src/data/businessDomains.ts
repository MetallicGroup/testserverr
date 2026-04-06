export interface BusinessDomain {
  id: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  /** Product IDs that belong to this domain */
  productIds: string[];
}

const businessDomains: BusinessDomain[] = [
  {
    id: "medical",
    name: "Medical & Farmaceutic",
    icon: "Heart",
    description: "Clinici, spitale, cabinete, farmacii",
    productIds: [
      "p1", "p2", "p3", "p4", "p7", "p12", "p14", "p15",       // birou
      "p16", "p17", "p18", "p20", "p26",                         // textile
      "p29", "p30",                                                // genți
      "p37", "p38", "p39", "p40",                                  // băuturi
      "p47", "p48", "p54",                                         // tech
      "p57", "p58", "p59", "p60", "p61",                           // accesorii
      "p79", "p80", "p81", "p82", "p83",                           // sănătate
      "p90", "p91", "p92", "p93", "p94", "p95", "p96",            // marketing
    ],
  },
  {
    id: "constructii",
    name: "Construcții & Imobiliare",
    icon: "HardHat",
    description: "Firme de construcții, agenții imobiliare",
    productIds: [
      "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p9",           // birou
      "p16", "p17", "p18", "p19", "p20", "p27", "p28",           // textile
      "p29", "p30", "p31",                                         // genți
      "p37", "p38", "p39", "p40",                                  // băuturi
      "p47", "p48",                                                 // tech
      "p57", "p58", "p59", "p60",                                  // accesorii
      "p66",                                                        // outdoor
      "p74", "p75", "p76",                                         // auto
      "p86", "p88",                                                 // casă
      "p90", "p91", "p92", "p93", "p94", "p95", "p96", "p97", "p98", // marketing
    ],
  },
  {
    id: "horeca",
    name: "HoReCa & Turism",
    icon: "UtensilsCrossed",
    description: "Restaurante, hoteluri, cafenele, pensiuni",
    productIds: [
      "p1", "p3", "p5", "p7", "p15",                              // birou
      "p16", "p17", "p18", "p20", "p22", "p25", "p26",           // textile
      "p29", "p35", "p36",                                         // genți
      "p37", "p38", "p39", "p40", "p41", "p42", "p43", "p44", "p45", "p46", // băuturi
      "p57", "p59",                                                 // accesorii
      "p74",                                                        // auto
      "p84", "p85", "p86", "p87", "p88",                           // casă
      "p90", "p91", "p92", "p93", "p94", "p95", "p96",            // marketing
    ],
  },
  {
    id: "it",
    name: "IT & Software",
    icon: "Monitor",
    description: "Companii tech, startup-uri, agenții digitale",
    productIds: [
      "p1", "p2", "p3", "p4", "p5", "p7", "p8", "p15",          // birou
      "p16", "p17", "p18", "p20",                                  // textile
      "p29", "p30", "p31",                                         // genți
      "p37", "p38", "p39", "p40",                                  // băuturi
      "p47", "p48", "p49", "p50", "p51", "p52", "p53", "p54", "p55", "p56", // tech
      "p57", "p58", "p59", "p60", "p61",                           // accesorii
      "p86",                                                        // casă
      "p90", "p91", "p92", "p93", "p95",                           // marketing
    ],
  },
  {
    id: "educatie",
    name: "Educație & Training",
    icon: "GraduationCap",
    description: "Școli, universități, centre de formare",
    productIds: [
      "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p10", "p11", "p12", "p15", // birou
      "p16", "p17", "p18", "p20",                                  // textile
      "p29", "p30",                                                 // genți
      "p37", "p40",                                                 // băuturi
      "p47", "p48",                                                 // tech
      "p57", "p58", "p59", "p60",                                  // accesorii
      "p86",                                                        // casă
      "p90", "p91", "p92", "p93", "p94", "p95", "p96", "p98",     // marketing
      "p99", "p100",                                                // diverse
    ],
  },
  {
    id: "auto",
    name: "Auto & Transport",
    icon: "Car",
    description: "Dealeri auto, service-uri, firme de transport",
    productIds: [
      "p1", "p3", "p5", "p7",                                     // birou
      "p16", "p17", "p18", "p19", "p20", "p27",                  // textile
      "p29", "p30",                                                 // genți
      "p37", "p38", "p39", "p40",                                  // băuturi
      "p47", "p48",                                                 // tech
      "p57", "p58", "p59", "p64",                                  // accesorii
      "p74", "p75", "p76", "p77", "p78",                           // auto
      "p86",                                                        // casă
      "p90", "p91", "p92", "p93", "p94", "p95", "p96", "p97", "p98", // marketing
    ],
  },
  {
    id: "retail",
    name: "Retail & eCommerce",
    icon: "ShoppingBag",
    description: "Magazine, lanțuri comerciale, marketplace",
    productIds: [
      "p1", "p3", "p5", "p15",                                    // birou
      "p16", "p17", "p18", "p20", "p26",                          // textile
      "p29", "p30", "p33", "p34", "p35", "p36",                  // genți
      "p37", "p38", "p40", "p46",                                  // băuturi
      "p47", "p48", "p49",                                         // tech
      "p57", "p58", "p59", "p62", "p63", "p65",                  // accesorii
      "p86",                                                        // casă
      "p90", "p91", "p92", "p93", "p94", "p95", "p96", "p97",    // marketing
    ],
  },
  {
    id: "evenimente",
    name: "Evenimente & Conferințe",
    icon: "CalendarDays",
    description: "Organizatori de evenimente, conferințe, festivaluri",
    productIds: [
      "p1", "p3", "p4", "p15",                                    // birou
      "p16", "p17", "p18", "p20", "p22",                          // textile
      "p29", "p30",                                                 // genți
      "p37", "p38", "p39", "p40",                                  // băuturi
      "p47", "p48",                                                 // tech
      "p57", "p58", "p59", "p60", "p62",                           // accesorii
      "p66", "p69", "p70", "p71",                                  // outdoor
      "p90", "p91", "p92", "p93", "p94", "p95", "p96", "p97", "p98", // marketing
    ],
  },
  {
    id: "fitness",
    name: "Sport & Fitness",
    icon: "Dumbbell",
    description: "Săli de sport, cluburi sportive, echipe",
    productIds: [
      "p1", "p3",                                                   // birou
      "p16", "p17", "p18", "p19", "p20", "p22", "p24", "p25",   // textile
      "p29", "p30", "p72",                                         // genți
      "p37", "p38", "p39", "p40", "p73",                          // băuturi
      "p47", "p48", "p53",                                         // tech
      "p57", "p58", "p59", "p62",                                  // accesorii
      "p66", "p68", "p69", "p70", "p71",                          // outdoor
      "p90", "p91", "p92", "p93", "p94", "p95", "p98",            // marketing
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    icon: "Sparkles",
    description: "Saloane, SPA-uri, clinici estetice",
    productIds: [
      "p1", "p3", "p5", "p15",                                    // birou
      "p16", "p17", "p18", "p20", "p23", "p25",                  // textile
      "p29", "p33", "p35",                                         // genți
      "p37", "p38", "p40",                                         // băuturi
      "p47",                                                        // tech
      "p57", "p59", "p62", "p63",                                  // accesorii
      "p79", "p82", "p83",                                         // sănătate
      "p87",                                                        // casă
      "p90", "p91", "p92", "p93", "p95", "p96",                   // marketing
    ],
  },
  {
    id: "juridic",
    name: "Juridic & Financiar",
    icon: "Scale",
    description: "Avocați, notari, bănci, contabili",
    productIds: [
      "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p12", "p13", "p14", "p15", // birou
      "p16", "p17", "p18",                                         // textile
      "p29", "p31", "p33",                                         // genți
      "p37", "p38", "p45",                                         // băuturi
      "p47", "p48",                                                 // tech
      "p57", "p59", "p61",                                         // accesorii
      "p90", "p91", "p92", "p93", "p95", "p96",                   // marketing
    ],
  },
  {
    id: "agricultura",
    name: "Agricultură & Alimentar",
    icon: "Wheat",
    description: "Ferme, procesatori, distribuitori alimentari",
    productIds: [
      "p1", "p3", "p5", "p6",                                     // birou
      "p16", "p17", "p18", "p19", "p20", "p27", "p28",           // textile
      "p29",                                                        // genți
      "p37", "p38", "p39", "p40", "p42", "p46",                  // băuturi
      "p47",                                                        // tech
      "p57", "p58", "p59",                                         // accesorii
      "p66", "p68",                                                 // outdoor
      "p74",                                                        // auto
      "p84", "p85", "p86",                                         // casă
      "p90", "p91", "p92", "p93", "p94", "p95", "p96", "p97", "p98", // marketing
    ],
  },
];

export default businessDomains;
