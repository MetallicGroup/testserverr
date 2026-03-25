/* ─── SVG product silhouettes with realistic print-area coordinates ─── */

export interface MockupShape {
  viewBox: string;
  svgPath: string;
  /** Print area as percentage of the container for overlay positioning */
  printArea: { top: string; left: string; width: string; height: string };
  svgWidth: number;
  svgHeight: number;
  /** If true, the print area text/image should rotate to follow the product form */
  printRotation?: number;
}

export const PRODUCT_SHAPES: Record<string, MockupShape> = {
  /* ── PEN (cylindrical barrel – print wraps around middle) ── */
  pen: {
    viewBox: "0 0 300 80",
    svgPath: `
      M20,28 L230,20 Q240,20 242,24 L280,36 Q284,38 284,40 Q284,42 280,44 L242,56 Q240,60 230,60 L20,52 Q10,50 10,40 Q10,30 20,28 Z
      M20,32 L20,48
      M230,22 L230,58
    `,
    printArea: { top: "22%", left: "15%", width: "55%", height: "56%" },
    svgWidth: 300,
    svgHeight: 80,
  },

  /* ── RULER (flat, elongated) ── */
  ruler: {
    viewBox: "0 0 320 60",
    svgPath: `
      M10,12 L310,12 Q316,12 316,18 L316,42 Q316,48 310,48 L10,48 Q4,48 4,42 L4,18 Q4,12 10,12 Z
      M30,12 L30,20 M50,12 L50,16 M70,12 L70,16 M90,12 L90,20 M110,12 L110,16 M130,12 L130,16
      M150,12 L150,20 M170,12 L170,16 M190,12 L190,16 M210,12 L210,20 M230,12 L230,16
      M250,12 L250,16 M270,12 L270,20 M290,12 L290,16
    `,
    printArea: { top: "30%", left: "10%", width: "80%", height: "50%" },
    svgWidth: 320,
    svgHeight: 60,
  },

  /* ── NOTEBOOK / AGENDA (spiral-bound book, front cover) ── */
  notebook: {
    viewBox: "0 0 220 280",
    svgPath: `
      M35,15 L195,15 Q205,15 205,25 L205,255 Q205,265 195,265 L35,265 Q25,265 25,255 L25,25 Q25,15 35,15 Z
      M25,45 L12,45 Q8,45 8,50 L8,58 Q8,63 12,63 L25,63
      M25,78 L12,78 Q8,78 8,83 L8,91 Q8,96 12,96 L25,96
      M25,111 L12,111 Q8,111 8,116 L8,124 Q8,129 12,129 L25,129
      M25,144 L12,144 Q8,144 8,149 L8,157 Q8,162 12,162 L25,162
      M25,177 L12,177 Q8,177 8,182 L8,190 Q8,195 12,195 L25,195
      M25,210 L12,210 Q8,210 8,215 L8,223 Q8,228 12,228 L25,228
    `,
    printArea: { top: "15%", left: "18%", width: "62%", height: "50%" },
    svgWidth: 220,
    svgHeight: 280,
  },

  /* ── PAPER / FLYER / BUSINESS CARD (flat sheet) ── */
  paper: {
    viewBox: "0 0 210 280",
    svgPath: `
      M15,10 L165,10 L195,40 L195,270 Q195,274 191,274 L19,274 Q15,274 15,270 Z
      M165,10 L165,40 L195,40
    `,
    printArea: { top: "20%", left: "15%", width: "70%", height: "45%" },
    svgWidth: 210,
    svgHeight: 280,
  },

  /* ── POST-IT (square with corner peel) ── */
  postit: {
    viewBox: "0 0 160 160",
    svgPath: `
      M15,10 L145,10 Q150,10 150,15 L150,115 Q150,120 145,120 L120,120
      Q110,120 110,130 L110,145 Q110,150 105,150 L15,150 Q10,150 10,145 L10,15 Q10,10 15,10 Z
      M120,120 Q130,130 150,115
    `,
    printArea: { top: "15%", left: "12%", width: "72%", height: "55%" },
    svgWidth: 160,
    svgHeight: 160,
  },

  /* ── CALENDAR DESK (tent-style) ── */
  calendar: {
    viewBox: "0 0 260 200",
    svgPath: `
      M20,180 L130,20 L240,180 Z
      M25,180 L235,180 Q240,180 240,185 L240,190 Q240,195 235,195 L25,195 Q20,195 20,190 L20,185 Q20,180 25,180 Z
      M80,55 L80,42 M110,55 L110,42 M140,55 L140,42 M170,55 L170,42
    `,
    printArea: { top: "25%", left: "28%", width: "44%", height: "40%" },
    svgWidth: 260,
    svgHeight: 200,
  },

  /* ── MOUSEPAD (rounded rectangle, flat, perspective hint) ── */
  mousepad: {
    viewBox: "0 0 300 220",
    svgPath: `
      M20,30 L280,20 Q295,20 295,35 L290,185 Q290,200 275,200 L25,195 Q10,195 10,180 L15,35 Q15,30 20,30 Z
    `,
    printArea: { top: "15%", left: "12%", width: "76%", height: "65%" },
    svgWidth: 300,
    svgHeight: 220,
  },

  /* ── PEN HOLDER (cup/cylinder from front) ── */
  penHolder: {
    viewBox: "0 0 180 200",
    svgPath: `
      M30,50 Q30,40 90,35 Q150,40 150,50 L155,175 Q155,190 90,195 Q25,190 25,175 Z
      M30,50 Q30,60 90,65 Q150,60 150,50
      M55,35 L50,10 M75,33 L78,5 M105,33 L102,5 M125,35 L130,10
    `,
    printArea: { top: "35%", left: "18%", width: "64%", height: "38%" },
    svgWidth: 180,
    svgHeight: 200,
  },

  /* ── CLIPBOARD ── */
  clipboard: {
    viewBox: "0 0 200 280",
    svgPath: `
      M25,30 L175,30 Q185,30 185,40 L185,260 Q185,270 175,270 L25,270 Q15,270 15,260 L15,40 Q15,30 25,30 Z
      M70,30 L70,15 Q70,8 80,8 L120,8 Q130,8 130,15 L130,30
      M80,12 L120,12 Q125,12 125,17 L125,25 L75,25 L75,17 Q75,12 80,12 Z
    `,
    printArea: { top: "20%", left: "15%", width: "70%", height: "50%" },
    svgWidth: 200,
    svgHeight: 280,
  },

  /* ── ENVELOPE ── */
  envelope: {
    viewBox: "0 0 280 180",
    svgPath: `
      M15,30 L265,30 Q275,30 275,40 L275,150 Q275,160 265,160 L15,160 Q5,160 5,150 L5,40 Q5,30 15,30 Z
      M5,30 L140,100 L275,30
      M5,160 L100,95 M275,160 L180,95
    `,
    printArea: { top: "40%", left: "25%", width: "50%", height: "30%" },
    svgWidth: 280,
    svgHeight: 180,
  },

  /* ── T-SHIRT (realistic silhouette) ── */
  tshirt: {
    viewBox: "0 0 300 320",
    svgPath: `
      M105,8 Q105,8 100,10 L68,12 Q52,14 46,30 L18,95 Q12,110 28,115 L65,100
      L68,105 L68,305 Q68,312 76,312 L224,312 Q232,312 232,305 L232,105 L235,100
      L272,115 Q288,110 282,95 L254,30 Q248,14 232,12 L200,10 Q195,8 195,8
      Q188,14 176,24 Q164,34 150,34 Q136,34 124,24 Q112,14 105,8 Z
    `,
    printArea: { top: "30%", left: "30%", width: "40%", height: "32%" },
    svgWidth: 300,
    svgHeight: 320,
  },

  /* ── POLO SHIRT (with collar) ── */
  polo: {
    viewBox: "0 0 300 320",
    svgPath: `
      M105,15 L100,12 L68,14 Q52,16 46,32 L18,97 Q12,112 28,117 L65,102
      L68,107 L68,305 Q68,312 76,312 L224,312 Q232,312 232,305 L232,107 L235,102
      L272,117 Q288,112 282,97 L254,32 Q248,16 232,14 L200,12 L195,15
      Q190,8 180,5 L170,4 L155,20 L150,30 L145,20 L130,4 L120,5 Q110,8 105,15 Z
      M120,5 L130,18 L150,12 L170,18 L180,5
    `,
    printArea: { top: "30%", left: "30%", width: "40%", height: "32%" },
    svgWidth: 300,
    svgHeight: 320,
  },

  /* ── HOODIE (with hood and kangaroo pocket) ── */
  hoodie: {
    viewBox: "0 0 320 340",
    svgPath: `
      M115,12 L82,14 Q58,16 52,38 L22,115 Q16,130 32,135 L78,118
      L78,315 Q78,328 92,328 L228,328 Q242,328 242,315 L242,118
      L288,135 Q304,130 298,115 L268,38 Q262,16 238,14 L205,12
      Q198,18 186,30 Q174,42 160,48 Q146,42 134,30 Q122,18 115,12 Z
      M115,12 Q120,0 135,0 Q145,4 155,14 L160,18 L165,14 Q175,4 185,0 Q200,0 205,12
      M160,48 L160,90
      M110,225 L210,225 Q218,225 218,233 L218,280 Q218,288 210,288 L110,288 Q102,288 102,280 L102,233 Q102,225 110,225 Z
    `,
    printArea: { top: "30%", left: "28%", width: "44%", height: "25%" },
    svgWidth: 320,
    svgHeight: 340,
  },

  /* ── CAP / ȘAPCĂ (baseball cap, side view) ── */
  cap: {
    viewBox: "0 0 300 180",
    svgPath: `
      M60,130 Q60,55 155,35 Q250,55 250,130
      L250,138 Q250,145 243,145 L67,145 Q60,145 60,138 Z
      M60,138 L10,150 Q2,152 5,160 L15,162 L60,155 L60,145
      M80,130 Q80,70 155,52 Q230,70 230,130
      M155,35 L155,22 Q155,18 160,18 L168,18 Q172,18 172,22 L172,35
    `,
    printArea: { top: "28%", left: "30%", width: "40%", height: "35%" },
    svgWidth: 300,
    svgHeight: 180,
  },

  /* ── SCARF / TOWEL (draped fabric) ── */
  towel: {
    viewBox: "0 0 200 300",
    svgPath: `
      M30,15 L170,15 Q178,15 178,23 L178,260 Q178,268 170,268
      L164,268 L164,280 L160,285 L156,280 L156,268
      L148,268 L148,280 L144,285 L140,280 L140,268
      L60,268 L60,280 L56,285 L52,280 L52,268
      L44,268 L44,280 L40,285 L36,280 L36,268
      L30,268 Q22,268 22,260 L22,23 Q22,15 30,15 Z
      M22,40 L178,40
    `,
    printArea: { top: "18%", left: "18%", width: "64%", height: "40%" },
    svgWidth: 200,
    svgHeight: 300,
  },

  /* ── APRON (Șorț) ── */
  apron: {
    viewBox: "0 0 220 300",
    svgPath: `
      M60,30 L160,30 Q168,30 170,38 L180,90 L190,95 Q200,98 195,108 L180,105
      L185,200 Q185,260 150,280 L140,285 Q110,295 80,285 L70,280 Q35,260 35,200
      L40,105 L25,108 Q20,98 30,95 L40,90 L50,38 Q52,30 60,30 Z
      M110,30 L110,15 Q110,8 115,5 L125,5 Q130,8 130,15 L130,25
      M80,30 L80,15 Q80,8 85,5 L90,8 L90,25
    `,
    printArea: { top: "35%", left: "22%", width: "56%", height: "30%" },
    svgWidth: 220,
    svgHeight: 300,
  },

  /* ── SOCK ── */
  sock: {
    viewBox: "0 0 120 260",
    svgPath: `
      M35,10 L85,10 Q92,10 92,17 L92,170 Q92,200 95,210 L110,230 Q118,242 108,250
      L60,250 Q30,250 28,230 L28,200 L28,170 L28,17 Q28,10 35,10 Z
      M28,30 L92,30
      M28,170 Q28,195 35,210 Q42,225 60,240
    `,
    printArea: { top: "15%", left: "20%", width: "58%", height: "40%" },
    svgWidth: 120,
    svgHeight: 260,
  },

  /* ── MUG (ceramic, with handle) ── */
  mug: {
    viewBox: "0 0 260 220",
    svgPath: `
      M40,25 Q40,15 55,15 L170,15 Q185,15 185,25 L185,30
      L190,180 Q190,200 170,200 L55,200 Q35,200 35,180 L40,30 Z
      M40,30 Q40,40 112,42 Q185,40 185,30
      M185,55 L210,55 Q240,55 240,85 L240,130 Q240,160 210,160 L185,160
    `,
    printArea: { top: "25%", left: "14%", width: "48%", height: "42%" },
    svgWidth: 260,
    svgHeight: 220,
  },

  /* ── GLASS / PAHAR ── */
  glass: {
    viewBox: "0 0 180 260",
    svgPath: `
      M40,15 L140,15 Q148,15 146,25 L128,185 Q126,195 115,195 L65,195 Q54,195 52,185 L34,25 Q32,15 40,15 Z
      M65,195 L65,225 L55,230 Q48,232 48,238 L48,245 Q48,250 53,250 L127,250 Q132,250 132,245 L132,238 Q132,232 125,230 L115,225 L115,195
    `,
    printArea: { top: "20%", left: "22%", width: "56%", height: "40%" },
    svgWidth: 180,
    svgHeight: 260,
  },

  /* ── BOTTLE (water/sport bottle) ── */
  bottle: {
    viewBox: "0 0 120 300",
    svgPath: `
      M42,40 L42,20 Q42,8 48,8 L72,8 Q78,8 78,20 L78,40
      Q95,55 95,80 L95,265 Q95,285 75,285 L45,285 Q25,285 25,265 L25,80 Q25,55 42,40 Z
      M42,20 L78,20
      M25,80 L95,80
      M38,50 Q60,62 82,50
    `,
    printArea: { top: "32%", left: "16%", width: "68%", height: "35%" },
    svgWidth: 120,
    svgHeight: 300,
  },

  /* ── THERMOS (taller, with cap) ── */
  thermos: {
    viewBox: "0 0 110 320",
    svgPath: `
      M38,50 L38,20 Q38,5 55,5 Q72,5 72,20 L72,50
      Q88,60 88,80 L88,285 Q88,305 65,305 L45,305 Q22,305 22,285 L22,80 Q22,60 38,50 Z
      M32,50 L78,50 Q82,50 82,54 L82,62 Q82,66 78,66 L32,66 Q28,66 28,62 L28,54 Q28,50 32,50 Z
      M22,80 L88,80
    `,
    printArea: { top: "30%", left: "16%", width: "68%", height: "35%" },
    svgWidth: 110,
    svgHeight: 320,
  },

  /* ── TOTE BAG (sacoșă pânză) ── */
  totebag: {
    viewBox: "0 0 240 280",
    svgPath: `
      M35,75 L35,245 Q35,262 52,262 L188,262 Q205,262 205,245 L205,75 Z
      M35,75 L65,75 L65,25 Q65,12 80,12 L85,12 L85,75
      M205,75 L175,75 L175,25 Q175,12 160,12 L155,12 L155,75
    `,
    printArea: { top: "32%", left: "18%", width: "64%", height: "40%" },
    svgWidth: 240,
    svgHeight: 280,
  },

  /* ── BACKPACK (rucsac, front view) ── */
  backpack: {
    viewBox: "0 0 240 300",
    svgPath: `
      M55,40 Q55,20 120,15 Q185,20 185,40
      L190,240 Q190,270 160,275 L80,275 Q50,270 50,240 Z
      M50,60 L30,65 L30,200 L50,205
      M190,60 L210,65 L210,200 L190,205
      M75,275 L75,290 L85,295 L85,275
      M155,275 L155,290 L165,295 L165,275
      M70,100 L170,100 Q178,100 178,108 L178,170 Q178,178 170,178 L70,178 Q62,178 62,170 L62,108 Q62,100 70,100 Z
      M120,178 L120,195 Q120,200 125,200 L135,200 Q140,200 140,195 L140,178
    `,
    printArea: { top: "15%", left: "24%", width: "52%", height: "25%" },
    svgWidth: 240,
    svgHeight: 300,
  },

  /* ── WALLET / PORTOFEL ── */
  wallet: {
    viewBox: "0 0 220 140",
    svgPath: `
      M15,15 L205,15 Q212,15 212,22 L212,118 Q212,125 205,125 L15,125 Q8,125 8,118 L8,22 Q8,15 15,15 Z
      M8,50 L212,50
      M160,50 L160,15
      M170,26 L195,26 Q200,26 200,31 L200,40 Q200,45 195,45 L170,45 Q165,45 165,40 L165,31 Q165,26 170,26 Z
    `,
    printArea: { top: "42%", left: "10%", width: "80%", height: "42%" },
    svgWidth: 220,
    svgHeight: 140,
  },

  /* ── USB STICK ── */
  usb: {
    viewBox: "0 0 220 70",
    svgPath: `
      M60,12 L185,12 Q195,12 195,22 L195,48 Q195,58 185,58 L60,58 Q50,58 50,48 L50,22 Q50,12 60,12 Z
      M50,22 L20,22 Q12,22 12,28 L12,42 Q12,48 20,48 L50,48
      M22,30 L22,40 L28,40 L28,30 Z
      M35,30 L35,40 L41,40 L41,30 Z
    `,
    printArea: { top: "15%", left: "30%", width: "55%", height: "70%" },
    svgWidth: 220,
    svgHeight: 70,
  },

  /* ── POWERBANK ── */
  powerbank: {
    viewBox: "0 0 200 100",
    svgPath: `
      M20,10 L180,10 Q192,10 192,22 L192,78 Q192,90 180,90 L20,90 Q8,90 8,78 L8,22 Q8,10 20,10 Z
      M165,38 L165,62 Q165,66 169,66 L176,66 Q180,66 180,62 L180,38 Q180,34 176,34 L169,34 Q165,34 165,38 Z
      M22,42 Q22,36 28,36 L38,36 Q44,36 44,42 L44,58 Q44,64 38,64 L28,64 Q22,64 22,58 Z
    `,
    printArea: { top: "15%", left: "25%", width: "50%", height: "70%" },
    svgWidth: 200,
    svgHeight: 100,
  },

  /* ── PHONE CASE ── */
  phonecase: {
    viewBox: "0 0 150 280",
    svgPath: `
      M28,18 Q28,8 42,8 L108,8 Q122,8 122,18 L122,262 Q122,272 108,272 L42,272 Q28,272 28,262 Z
      M36,22 L114,22 L114,252 L36,252 Z
      M60,12 L90,12 Q95,12 95,15 Q95,18 90,18 L60,18 Q55,18 55,15 Q55,12 60,12 Z
      M68,258 Q68,254 75,254 Q82,254 82,258 Q82,262 75,262 Q68,262 68,258 Z
    `,
    printArea: { top: "12%", left: "18%", width: "64%", height: "55%" },
    svgWidth: 150,
    svgHeight: 280,
  },

  /* ── UMBRELLA (top view, segments) ── */
  umbrella: {
    viewBox: "0 0 280 260",
    svgPath: `
      M140,25 L140,230 Q140,248 130,248 Q120,248 120,240
      M20,115 Q20,40 140,20 Q260,40 260,115
      Q230,85 200,115 Q170,85 140,115 Q110,85 80,115 Q50,85 20,115 Z
      M140,20 L140,10
      M80,115 L140,20 L200,115
    `,
    printArea: { top: "18%", left: "32%", width: "36%", height: "28%" },
    svgWidth: 280,
    svgHeight: 260,
  },

  /* ── KEYCHAIN / BRELOC ── */
  keychain: {
    viewBox: "0 0 140 200",
    svgPath: `
      M70,38 Q105,38 105,68 Q105,88 88,95 L88,100
      L92,105 L92,175 Q92,188 80,188 L60,188 Q48,188 48,175 L48,105 L52,100
      L52,95 Q35,88 35,68 Q35,38 70,38 Z
      M70,50 Q50,50 50,68 Q50,82 70,85 Q90,82 90,68 Q90,50 70,50 Z
      M60,28 L60,12 Q60,5 70,5 Q80,5 80,12 L80,28
      M62,130 L78,130 M62,148 L78,148 M62,166 L78,166
    `,
    printArea: { top: "52%", left: "26%", width: "48%", height: "30%" },
    svgWidth: 140,
    svgHeight: 200,
  },

  /* ── BADGE / INSIGNĂ (circle) ── */
  badge: {
    viewBox: "0 0 160 160",
    svgPath: `
      M80,8 Q152,8 152,80 Q152,152 80,152 Q8,152 8,80 Q8,8 80,8 Z
      M80,16 Q144,16 144,80 Q144,144 80,144 Q16,144 16,80 Q16,16 80,16 Z
    `,
    printArea: { top: "18%", left: "18%", width: "64%", height: "64%" },
    svgWidth: 160,
    svgHeight: 160,
  },

  /* ── LANYARD ── */
  lanyard: {
    viewBox: "0 0 120 300",
    svgPath: `
      M45,10 L75,10 L75,200 L85,200 Q95,200 95,210 L95,275 Q95,290 80,290 L40,290 Q25,290 25,275 L25,210 Q25,200 35,200 L45,200 Z
      M35,210 L85,210
      M40,240 L80,240 Q84,240 84,244 L84,270 Q84,274 80,274 L40,274 Q36,274 36,270 L36,244 Q36,240 40,240 Z
      M55,10 L55,0 Q60,-4 65,0 L65,10
    `,
    printArea: { top: "6%", left: "30%", width: "28%", height: "55%" },
    svgWidth: 120,
    svgHeight: 300,
  },

  /* ── BANNER / ROLL-UP ── */
  banner: {
    viewBox: "0 0 200 320",
    svgPath: `
      M25,25 L175,25 L175,275 L25,275 Z
      M25,275 L15,285 L15,305 Q15,310 20,310 L25,305 Z
      M175,275 L185,285 L185,305 Q185,310 180,310 L175,305 Z
      M95,18 L105,18 L105,25 L95,25 Z
      M100,8 L100,18
    `,
    printArea: { top: "12%", left: "16%", width: "68%", height: "65%" },
    svgWidth: 200,
    svgHeight: 320,
  },

  /* ── FLAG / STEAG ── */
  flag: {
    viewBox: "0 0 280 220",
    svgPath: `
      M20,10 L20,210
      M20,15 L260,20 Q270,28 260,55 L258,80 Q268,110 258,130 L20,140
      M20,15 L20,140
    `,
    printArea: { top: "12%", left: "15%", width: "70%", height: "45%" },
    svgWidth: 280,
    svgHeight: 220,
  },

  /* ── BALL / MINGE ── */
  ball: {
    viewBox: "0 0 200 200",
    svgPath: `
      M100,10 Q190,10 190,100 Q190,190 100,190 Q10,190 10,100 Q10,10 100,10 Z
      M100,10 Q70,60 70,100 Q70,140 100,190
      M100,10 Q130,60 130,100 Q130,140 100,190
      M12,80 Q60,95 100,95 Q140,95 188,80
      M12,120 Q60,105 100,105 Q140,105 188,120
    `,
    printArea: { top: "25%", left: "25%", width: "50%", height: "50%" },
    svgWidth: 200,
    svgHeight: 200,
  },

  /* ── DISC / FRISBEE ── */
  disc: {
    viewBox: "0 0 240 100",
    svgPath: `
      M20,50 Q20,15 120,10 Q220,15 220,50 Q220,70 120,80 Q20,70 20,50 Z
      M30,50 Q30,25 120,20 Q210,25 210,50
      M50,50 Q50,35 120,30 Q190,35 190,50
    `,
    printArea: { top: "20%", left: "25%", width: "50%", height: "40%" },
    svgWidth: 240,
    svgHeight: 100,
  },

  /* ── PLATE / FARFURIE ── */
  plate: {
    viewBox: "0 0 220 220",
    svgPath: `
      M110,10 Q210,10 210,110 Q210,210 110,210 Q10,210 10,110 Q10,10 110,10 Z
      M110,25 Q195,25 195,110 Q195,195 110,195 Q25,195 25,110 Q25,25 110,25 Z
      M110,45 Q175,45 175,110 Q175,175 110,175 Q45,175 45,110 Q45,45 110,45 Z
    `,
    printArea: { top: "25%", left: "25%", width: "50%", height: "50%" },
    svgWidth: 220,
    svgHeight: 220,
  },

  /* ── CLOCK (wall clock) ── */
  clock: {
    viewBox: "0 0 220 230",
    svgPath: `
      M110,20 Q200,20 200,110 Q200,200 110,200 Q20,200 20,110 Q20,20 110,20 Z
      M110,28 Q192,28 192,110 Q192,192 110,192 Q28,192 28,110 Q28,28 110,28 Z
      M110,35 L110,50 M110,170 L110,185 M25,110 L40,110 M180,110 L195,110
      M110,110 L110,65 M110,110 L145,110
      M110,5 L100,20 L120,20 Z
    `,
    printArea: { top: "22%", left: "22%", width: "56%", height: "56%" },
    svgWidth: 220,
    svgHeight: 230,
  },

  /* ── BOX (gift/product box) ── */
  box: {
    viewBox: "0 0 220 200",
    svgPath: `
      M20,50 L200,50 Q210,50 210,60 L210,175 Q210,185 200,185 L20,185 Q10,185 10,175 L10,60 Q10,50 20,50 Z
      M10,50 L30,30 L220,30 L210,50
      M200,185 L220,165 L220,30
      M220,165 L210,175
      M10,50 L210,50
    `,
    printArea: { top: "30%", left: "10%", width: "75%", height: "45%" },
    svgWidth: 220,
    svgHeight: 200,
  },

  /* ── LIGHTER / BRICHETĂ ── */
  lighter: {
    viewBox: "0 0 100 200",
    svgPath: `
      M25,40 L75,40 Q82,40 82,47 L82,175 Q82,190 65,190 L35,190 Q18,190 18,175 L18,47 Q18,40 25,40 Z
      M35,40 L35,20 Q35,12 42,12 L58,12 Q65,12 65,20 L65,40
      M42,16 L58,16 Q62,16 62,20 L62,30 L38,30 L38,20 Q38,16 42,16 Z
      M45,12 L45,5 Q50,0 55,5 L55,12
    `,
    printArea: { top: "28%", left: "16%", width: "68%", height: "42%" },
    svgWidth: 100,
    svgHeight: 200,
  },

  /* ── SUNGLASSES / OCHELARI ── */
  sunglasses: {
    viewBox: "0 0 300 120",
    svgPath: `
      M30,45 Q30,25 70,25 L115,25 Q130,25 130,40 L130,65 Q130,90 95,90 L60,90 Q30,90 30,65 Z
      M170,45 Q170,25 210,25 L255,25 Q270,25 270,40 L270,65 Q270,90 235,90 L200,90 Q170,90 170,65 Z
      M130,42 Q150,35 170,42
      M30,42 L10,38 Q5,37 5,40 L8,42
      M270,42 L290,38 Q295,37 295,40 L292,42
    `,
    printArea: { top: "20%", left: "12%", width: "76%", height: "45%" },
    svgWidth: 300,
    svgHeight: 120,
  },

  /* ── MASK / MASCĂ ── */
  mask: {
    viewBox: "0 0 280 140",
    svgPath: `
      M40,30 L240,30 Q260,30 260,50 L260,90 Q260,120 200,120 L140,120 Q80,120 80,120 L80,120 Q20,120 20,90 L20,50 Q20,30 40,30 Z
      M20,45 L5,40 M260,45 L275,40
      M80,70 L200,70
      M80,85 L200,85
    `,
    printArea: { top: "22%", left: "18%", width: "64%", height: "40%" },
    svgWidth: 280,
    svgHeight: 140,
  },

  /* ── CANDLE / LUMÂNARE ── */
  candle: {
    viewBox: "0 0 120 240",
    svgPath: `
      M30,60 Q30,45 60,42 Q90,45 90,60 L90,210 Q90,225 60,228 Q30,225 30,210 Z
      M30,60 Q30,72 60,75 Q90,72 90,60
      M55,42 L55,30 Q55,22 60,15 Q58,8 60,2 Q62,8 65,15 Q60,22 60,30
    `,
    printArea: { top: "32%", left: "18%", width: "64%", height: "35%" },
    svgWidth: 120,
    svgHeight: 240,
  },

  /* ── SANITIZER / BOTTLE SMALL ── */
  sanitizer: {
    viewBox: "0 0 100 200",
    svgPath: `
      M32,55 L32,35 Q32,25 40,25 L60,25 Q68,25 68,35 L68,55
      Q85,65 85,80 L85,170 Q85,185 68,185 L32,185 Q15,185 15,170 L15,80 Q15,65 32,55 Z
      M40,25 L40,15 L60,15 L60,25
      M40,15 L42,8 L48,12 L52,5 L56,12 L58,8 L60,15
    `,
    printArea: { top: "38%", left: "14%", width: "72%", height: "32%" },
    svgWidth: 100,
    svgHeight: 200,
  },

  /* ── PILLOW / PERNĂ ── */
  pillow: {
    viewBox: "0 0 240 200",
    svgPath: `
      M30,40 Q30,15 120,12 Q210,15 210,40
      L215,100 Q218,165 120,170 Q22,165 25,100 Z
      M30,40 Q30,55 120,58 Q210,55 210,40
    `,
    printArea: { top: "30%", left: "20%", width: "60%", height: "38%" },
    svgWidth: 240,
    svgHeight: 200,
  },

  /* ── PUZZLE ── */
  puzzle: {
    viewBox: "0 0 200 200",
    svgPath: `
      M15,15 L85,15 L85,40 Q85,50 95,50 Q105,50 105,40 L105,15 L185,15 Q190,15 190,20
      L190,80 L165,80 Q155,80 155,90 Q155,100 165,100 L190,100 L190,180 Q190,185 185,185
      L105,185 L105,160 Q105,150 95,150 Q85,150 85,160 L85,185 L20,185 Q15,185 15,180
      L15,100 L40,100 Q50,100 50,90 Q50,80 40,80 L15,80 Z
    `,
    printArea: { top: "22%", left: "22%", width: "56%", height: "56%" },
    svgWidth: 200,
    svgHeight: 200,
  },

  /* ── CARD DECK / JOC DE CĂRȚI ── */
  cardDeck: {
    viewBox: "0 0 180 240",
    svgPath: `
      M25,20 L135,20 Q142,20 142,27 L142,205 Q142,212 135,212 L25,212 Q18,212 18,205 L18,27 Q18,20 25,20 Z
      M32,15 L142,15 Q149,15 149,22 L149,200 Q149,207 142,207
      M39,10 L149,10 Q156,10 156,17 L156,195 Q156,202 149,202
    `,
    printArea: { top: "18%", left: "12%", width: "60%", height: "50%" },
    svgWidth: 180,
    svgHeight: 240,
  },

  /* ── MOUSE (computer mouse) ── */
  mouse: {
    viewBox: "0 0 160 220",
    svgPath: `
      M80,15 Q130,15 135,60 L140,160 Q140,200 100,205 L60,205 Q20,200 20,160 L25,60 Q30,15 80,15 Z
      M80,15 L80,80
      M30,80 L130,80
    `,
    printArea: { top: "40%", left: "18%", width: "64%", height: "30%" },
    svgWidth: 160,
    svgHeight: 220,
  },

  /* ── HEADPHONES / CĂȘTI ── */
  headphones: {
    viewBox: "0 0 240 220",
    svgPath: `
      M40,120 Q10,120 10,90 L10,80 Q10,20 80,15 L100,14 Q120,13 120,14 L160,14 Q230,20 230,80 L230,90 Q230,120 200,120
      M40,100 L40,170 Q40,185 50,185 L65,185 Q75,185 75,170 L75,100 Q75,90 57,90 Q40,90 40,100 Z
      M200,100 L200,170 Q200,185 190,185 L175,185 Q165,185 165,170 L165,100 Q165,90 183,90 Q200,90 200,100 Z
    `,
    printArea: { top: "5%", left: "30%", width: "40%", height: "30%" },
    svgWidth: 240,
    svgHeight: 220,
  },

  /* ── SPEAKER / BOXĂ BLUETOOTH ── */
  speaker: {
    viewBox: "0 0 140 200",
    svgPath: `
      M30,15 L110,15 Q125,15 125,30 L125,170 Q125,185 110,185 L30,185 Q15,185 15,170 L15,30 Q15,15 30,15 Z
      M70,45 Q95,45 95,70 Q95,95 70,95 Q45,95 45,70 Q45,45 70,45 Z
      M70,55 Q85,55 85,70 Q85,85 70,85 Q55,85 55,70 Q55,55 70,55 Z
      M70,125 Q85,125 85,140 Q85,155 70,155 Q55,155 55,140 Q55,125 70,125 Z
    `,
    printArea: { top: "8%", left: "18%", width: "64%", height: "18%" },
    svgWidth: 140,
    svgHeight: 200,
  },

  /* ── COMPACT MIRROR / OGLINDĂ DE BUZUNAR ── */
  compactMirror: {
    viewBox: "0 0 160 160",
    svgPath: `
      M80,8 Q148,8 148,80 Q148,148 80,148 Q12,148 12,80 Q12,8 80,8 Z
      M80,18 Q138,18 138,80 Q138,138 80,138 Q22,138 22,80 Q22,18 80,18 Z
    `,
    printArea: { top: "15%", left: "15%", width: "70%", height: "70%" },
    svgWidth: 160,
    svgHeight: 160,
  },

  /* ── AIR FRESHENER / ODORIZANT AUTO (tree shape) ── */
  airFreshener: {
    viewBox: "0 0 160 200",
    svgPath: `
      M80,15 L140,110 Q145,118 138,120 L110,120 L130,155 Q135,163 128,165 L32,165 Q25,163 30,155 L50,120 L22,120 Q15,118 20,110 Z
      M75,165 L75,185 L85,185 L85,165
      M80,5 L80,15 M75,5 L85,5
    `,
    printArea: { top: "35%", left: "25%", width: "50%", height: "30%" },
    svgWidth: 160,
    svgHeight: 200,
  },

  /* ── CUTTING BOARD / TOCĂTOR ── */
  cuttingBoard: {
    viewBox: "0 0 200 280",
    svgPath: `
      M40,50 L160,50 Q175,50 175,65 L175,250 Q175,265 160,265 L40,265 Q25,265 25,250 L25,65 Q25,50 40,50 Z
      M85,50 L85,25 Q85,15 100,15 Q115,15 115,25 L115,50
      M100,15 Q92,15 92,22 Q92,30 100,30 Q108,30 108,22 Q108,15 100,15 Z
    `,
    printArea: { top: "28%", left: "16%", width: "68%", height: "40%" },
    svgWidth: 200,
    svgHeight: 280,
  },

  /* ── MAGNET ── */
  magnet: {
    viewBox: "0 0 120 120",
    svgPath: `
      M15,15 L105,15 Q112,15 112,22 L112,98 Q112,105 105,105 L15,105 Q8,105 8,98 L8,22 Q8,15 15,15 Z
    `,
    printArea: { top: "12%", left: "12%", width: "76%", height: "76%" },
    svgWidth: 120,
    svgHeight: 120,
  },

  /* ── GENERIC (fallback rectangle) ── */
  generic: {
    viewBox: "0 0 220 220",
    svgPath: `
      M25,15 L195,15 Q205,15 205,25 L205,195 Q205,205 195,205 L25,205 Q15,205 15,195 L15,25 Q15,15 25,15 Z
    `,
    printArea: { top: "15%", left: "15%", width: "70%", height: "70%" },
    svgWidth: 220,
    svgHeight: 220,
  },
};

/* ─── Map each product category to a default shape ─── */
export const CATEGORY_TO_SHAPE: Record<string, string> = {
  Birou: "notebook",
  Textile: "tshirt",
  Genți: "totebag",
  Băuturi: "mug",
  Tehnologie: "usb",
  Accesorii: "keychain",
  Outdoor: "umbrella",
  Auto: "generic",
  Sănătate: "sanitizer",
  Casă: "plate",
  Marketing: "paper",
  Diverse: "puzzle",
};

/* ─── Specific product → shape overrides ─── */
export const PRODUCT_SHAPE_OVERRIDES: Record<string, string> = {
  // Birou
  "Pixuri personalizate": "pen",
  "Creioane personalizate": "pen",
  "Markere personalizate": "pen",
  "Rigle personalizate": "ruler",
  "Agende personalizate": "notebook",
  "Carnete de notițe": "notebook",
  "Calendare de birou": "calendar",
  "Calendare de perete": "banner",
  "Mousepad-uri": "mousepad",
  "Suporturi de pixuri": "penHolder",
  "Clipboard-uri": "clipboard",
  "Dosare cu logo": "notebook",
  "Plicuri personalizate": "envelope",
  "Hârtie cu antet": "paper",
  "Post-it-uri personalizate": "postit",

  // Textile
  "Tricouri personalizate": "tshirt",
  "Tricouri polo": "polo",
  "Hanorace personalizate": "hoodie",
  "Jachete personalizate": "hoodie",
  "Șepci personalizate": "cap",
  "Pălării personalizate": "cap",
  "Bandane personalizate": "cap",
  "Eșarfe personalizate": "towel",
  "Șosete personalizate": "sock",
  "Prosoape personalizate": "towel",
  "Șorțuri personalizate": "apron",
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
  "Pahare personalizate": "glass",
  "Borcane personalizate": "mug",
  "Tirbuşoane personalizate": "generic",
  "Desfăcătoare de sticle": "generic",
  "Seturi de vin personalizate": "box",
  "Cutii de ciocolată cu logo": "box",

  // Tehnologie
  "USB-uri personalizate": "usb",
  "Powerbank-uri personalizate": "powerbank",
  "Carcase telefon": "phonecase",
  "Căști personalizate": "headphones",
  "Suporturi de telefon": "generic",
  "Cabluri de încărcare cu logo": "generic",
  "Boxe bluetooth personalizate": "speaker",
  "Webcam cover personalizat": "badge",
  "Mouse wireless personalizat": "mouse",
  "Tastaturi personalizate": "generic",

  // Accesorii
  "Brelocuri personalizate": "keychain",
  "Insigne / Ecusoane": "badge",
  "Lanyard-uri personalizate": "lanyard",
  "Cordoane pentru ecuson": "lanyard",
  "Portcard-uri personalizate": "wallet",
  "Brățări personalizate": "generic",
  "Oglinzi de buzunar": "compactMirror",
  "Brichete personalizate": "lighter",
  "Ochelari de soare cu logo": "sunglasses",

  // Outdoor
  "Umbrele personalizate": "umbrella",
  "Pelerine de ploaie": "hoodie",
  "Pături personalizate": "pillow",
  "Saltele gonflabile cu logo": "pillow",
  "Mingi personalizate": "ball",
  "Frisbee-uri personalizate": "disc",
  "Genți sport personalizate": "backpack",
  "Sticle sport": "bottle",

  // Auto
  "Odorizante auto personalizate": "airFreshener",
  "Suporturi auto pentru telefon": "generic",
  "Parasolare auto cu logo": "generic",
  "Scrumiere personalizate": "mug",
  "Încărcătoare auto cu logo": "generic",

  // Sănătate
  "Dezinfectanți personalizați": "sanitizer",
  "Măști personalizate": "mask",
  "Truse de prim ajutor cu logo": "box",
  "Balsam de buze personalizat": "sanitizer",
  "Kit-uri de igienă personalizate": "box",

  // Casă
  "Farfurii personalizate": "plate",
  "Tocătoare personalizate": "cuttingBoard",
  "Magneti de frigider": "magnet",
  "Lumânări personalizate": "candle",
  "Ceasuri de perete cu logo": "clock",
  "Perne personalizate": "pillow",

  // Marketing
  "Stickere personalizate": "badge",
  "Flyere personalizate": "paper",
  "Broșuri personalizate": "paper",
  "Bannere roll-up": "banner",
  "Afișe personalizate": "banner",
  "Cărți de vizită": "paper",
  "Etichete personalizate": "paper",
  "Panouri publicitare": "banner",
  "Steaguri personalizate": "flag",

  // Diverse
  "Puzzle-uri personalizate": "puzzle",
  "Jocuri de cărți personalizate": "cardDeck",
};

export function getShapeForProduct(name: string, category: string): MockupShape {
  const overrideKey = PRODUCT_SHAPE_OVERRIDES[name];
  if (overrideKey && PRODUCT_SHAPES[overrideKey]) return PRODUCT_SHAPES[overrideKey];
  const catKey = CATEGORY_TO_SHAPE[category] || "generic";
  return PRODUCT_SHAPES[catKey] || PRODUCT_SHAPES.generic;
}
