import { useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import avozenevoLogo from "@/assets/avozenevo-logo.png";

/* ─── SVG product silhouettes with print-area coordinates ─── */

interface MockupShape {
  viewBox: string;
  svgPath: string;
  // Print area as percentage of viewBox for overlay positioning
  printArea: { top: string; left: string; width: string; height: string };
  svgWidth: number;
  svgHeight: number;
}

const PRODUCT_SHAPES: Record<string, MockupShape> = {
  // T-shirt silhouette
  tshirt: {
    viewBox: "0 0 300 320",
    svgPath: `M100,10 L70,10 Q50,10 45,30 L20,90 Q15,105 30,110 L70,95 L70,300 Q70,310 80,310 L220,310 Q230,310 230,300 L230,95 L270,110 Q285,105 280,90 L255,30 Q250,10 230,10 L200,10 Q190,10 175,25 Q160,40 150,40 Q140,40 125,25 Q110,10 100,10 Z`,
    printArea: { top: "30%", left: "28%", width: "44%", height: "35%" },
    svgWidth: 300, svgHeight: 320,
  },
  // Mug silhouette
  mug: {
    viewBox: "0 0 280 240",
    svgPath: `M50,30 L50,200 Q50,220 70,220 L180,220 Q200,220 200,200 L200,30 Q200,20 190,20 L60,20 Q50,20 50,30 Z M200,60 L230,60 Q260,60 260,90 L260,140 Q260,170 230,170 L200,170 Z`,
    printArea: { top: "22%", left: "22%", width: "40%", height: "50%" },
    svgWidth: 280, svgHeight: 240,
  },
  // Pen silhouette
  pen: {
    viewBox: "0 0 60 320",
    svgPath: `M18,20 L18,260 L22,280 L25,310 Q30,320 30,320 Q30,320 35,310 L38,280 L42,260 L42,20 Q42,10 30,10 Q18,10 18,20 Z M16,20 L16,40 L44,40 L44,20 Q44,8 30,8 Q16,8 16,20 Z`,
    printArea: { top: "20%", left: "15%", width: "70%", height: "45%" },
    svgWidth: 60, svgHeight: 320,
  },
  // Notebook / agenda
  notebook: {
    viewBox: "0 0 220 300",
    svgPath: `M30,10 L190,10 Q200,10 200,20 L200,280 Q200,290 190,290 L30,290 Q20,290 20,280 L20,20 Q20,10 30,10 Z M20,50 L10,50 L10,70 L20,70 Z M20,90 L10,90 L10,110 L20,110 Z M20,130 L10,130 L10,150 L20,150 Z M20,170 L10,170 L10,190 L20,190 Z M20,210 L10,210 L10,230 L20,230 Z`,
    printArea: { top: "20%", left: "18%", width: "64%", height: "45%" },
    svgWidth: 220, svgHeight: 300,
  },
  // Cap / șapcă
  cap: {
    viewBox: "0 0 300 200",
    svgPath: `M40,140 Q40,60 150,40 Q260,60 260,140 L260,150 Q260,160 250,160 L50,160 Q40,160 40,150 Z M40,150 L10,160 Q0,162 5,170 L50,170 L50,160 Z M260,150 L290,160 Q300,162 295,170 L250,170 L250,160 Z M80,140 Q80,80 150,65 Q220,80 220,140`,
    printArea: { top: "25%", left: "28%", width: "44%", height: "35%" },
    svgWidth: 300, svgHeight: 200,
  },
  // Tote bag / sacoșă
  totebag: {
    viewBox: "0 0 240 300",
    svgPath: `M40,80 L40,270 Q40,285 55,285 L185,285 Q200,285 200,270 L200,80 Z M40,80 L70,80 L70,30 Q70,15 90,15 L90,80 M200,80 L170,80 L170,30 Q170,15 150,15 L150,80`,
    printArea: { top: "35%", left: "20%", width: "60%", height: "38%" },
    svgWidth: 240, svgHeight: 300,
  },
  // Bottle / sticlă
  bottle: {
    viewBox: "0 0 120 320",
    svgPath: `M45,30 L45,15 Q45,5 50,5 L70,5 Q75,5 75,15 L75,30 L80,50 Q90,70 90,90 L90,290 Q90,310 75,310 L45,310 Q30,310 30,290 L30,90 Q30,70 40,50 Z`,
    printArea: { top: "30%", left: "18%", width: "64%", height: "35%" },
    svgWidth: 120, svgHeight: 320,
  },
  // USB stick
  usb: {
    viewBox: "0 0 100 240",
    svgPath: `M25,60 L25,210 Q25,225 35,225 L65,225 Q75,225 75,210 L75,60 Z M30,60 L30,20 Q30,10 40,10 L60,10 Q70,10 70,20 L70,60 Z M40,25 L40,35 L45,35 L45,25 Z M55,25 L55,35 L60,35 L60,25 Z`,
    printArea: { top: "35%", left: "18%", width: "64%", height: "35%" },
    svgWidth: 100, svgHeight: 240,
  },
  // Umbrella
  umbrella: {
    viewBox: "0 0 300 280",
    svgPath: `M150,30 L150,260 Q150,275 140,275 Q130,275 130,265 M20,120 Q20,40 150,20 Q280,40 280,120 Q240,90 210,120 Q180,90 150,120 Q120,90 90,120 Q60,90 20,120 Z`,
    printArea: { top: "15%", left: "30%", width: "40%", height: "25%" },
    svgWidth: 300, svgHeight: 280,
  },
  // Keychain / breloc
  keychain: {
    viewBox: "0 0 160 220",
    svgPath: `M80,40 Q120,40 120,80 Q120,110 95,115 L95,200 Q95,210 85,210 L75,210 Q65,210 65,200 L65,115 Q40,110 40,80 Q40,40 80,40 Z M80,55 Q55,55 55,80 Q55,100 80,100 Q105,100 105,80 Q105,55 80,55 Z M75,140 L85,140 L85,155 L75,155 Z M72,170 L88,170 L88,185 L72,185 Z`,
    printArea: { top: "20%", left: "22%", width: "56%", height: "32%" },
    svgWidth: 160, svgHeight: 220,
  },
  // Banner / roll-up
  banner: {
    viewBox: "0 0 200 320",
    svgPath: `M20,30 L180,30 L180,280 L20,280 Z M20,280 L10,290 L10,310 L20,300 Z M180,280 L190,290 L190,310 L180,300 Z M95,20 L105,20 L105,30 L95,30 Z`,
    printArea: { top: "15%", left: "15%", width: "70%", height: "60%" },
    svgWidth: 200, svgHeight: 320,
  },
  // Mousepad
  mousepad: {
    viewBox: "0 0 300 200",
    svgPath: `M20,20 L280,20 Q290,20 290,30 L290,170 Q290,180 280,180 L20,180 Q10,180 10,170 L10,30 Q10,20 20,20 Z`,
    printArea: { top: "15%", left: "15%", width: "70%", height: "65%" },
    svgWidth: 300, svgHeight: 200,
  },
  // Phone case
  phonecase: {
    viewBox: "0 0 160 300",
    svgPath: `M30,20 Q30,10 45,10 L115,10 Q130,10 130,20 L130,280 Q130,290 115,290 L45,290 Q30,290 30,280 Z M40,25 L120,25 L120,275 L40,275 Z M65,12 L95,12 Q100,12 100,15 Q100,18 95,18 L65,18 Q60,18 60,15 Q60,12 65,12 Z`,
    printArea: { top: "18%", left: "18%", width: "64%", height: "50%" },
    svgWidth: 160, svgHeight: 300,
  },
  // Hoodie
  hoodie: {
    viewBox: "0 0 320 340",
    svgPath: `M110,10 L80,10 Q55,10 50,35 L20,110 Q15,125 30,130 L75,112 L75,310 Q75,325 90,325 L230,325 Q245,325 245,310 L245,112 L290,130 Q305,125 300,110 L270,35 Q265,10 240,10 L210,10 Q200,15 185,30 Q170,45 160,50 Q150,45 135,30 Q120,15 110,10 Z M130,10 Q140,30 160,50 Q180,30 190,10 M160,50 L160,120`,
    printArea: { top: "33%", left: "27%", width: "46%", height: "30%" },
    svgWidth: 320, svgHeight: 340,
  },
  // Generic rectangle product
  generic: {
    viewBox: "0 0 240 240",
    svgPath: `M30,20 L210,20 Q220,20 220,30 L220,210 Q220,220 210,220 L30,220 Q20,220 20,210 L20,30 Q20,20 30,20 Z`,
    printArea: { top: "18%", left: "18%", width: "64%", height: "64%" },
    svgWidth: 240, svgHeight: 240,
  },
};

/* ─── Map each product category to a shape ─── */
const CATEGORY_TO_SHAPE: Record<string, string> = {
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
  Marketing: "banner",
  Diverse: "generic",
};

/* ─── Some products get their own specific shape override ─── */
const PRODUCT_SHAPE_OVERRIDES: Record<string, string> = {
  // Birou
  "Pixuri personalizate": "pen",
  "Creioane personalizate": "pen",
  "Markere personalizate": "pen",
  "Rigle personalizate": "pen",
  "Mousepad-uri": "mousepad",
  // Textile
  "Hanorace personalizate": "hoodie",
  "Jachete personalizate": "hoodie",
  "Șepci personalizate": "cap",
  "Pălării personalizate": "cap",
  "Bandane personalizate": "cap",
  // Băuturi
  "Sticle de apă": "bottle",
  "Termosuri personalizate": "bottle",
  // Tehnologie
  "Carcase telefon": "phonecase",
  "USB-uri personalizate": "usb",
  // Outdoor
  "Umbrele personalizate": "umbrella",
  "Sticle sport": "bottle",
  // Genți
  "Sacoșe de pânză": "totebag",
  "Rucsacuri personalizate": "totebag",
  // Marketing
  "Bannere roll-up": "banner",
  "Afișe personalizate": "banner",
  "Panouri publicitare": "banner",
  "Steaguri personalizate": "banner",
};

function getShapeForProduct(name: string, category: string): MockupShape {
  const overrideKey = PRODUCT_SHAPE_OVERRIDES[name];
  if (overrideKey && PRODUCT_SHAPES[overrideKey]) return PRODUCT_SHAPES[overrideKey];
  const catKey = CATEGORY_TO_SHAPE[category] || "generic";
  return PRODUCT_SHAPES[catKey] || PRODUCT_SHAPES.generic;
}

/* ─── Component ─── */

interface ProductMockupProps {
  productName: string;
  productCategory: string;
  customType: "text" | "image";
  customText: string;
  imagePreview: string | null;
}

export default function ProductMockup({ productName, productCategory, customType, customText, imagePreview }: ProductMockupProps) {
  const mockupRef = useRef<HTMLDivElement>(null);
  const shape = getShapeForProduct(productName, productCategory);

  const displayText = customType === "text" ? (customText.trim() || "avozenevo") : "";
  const displayImage = customType === "image" ? (imagePreview || avozenevoLogo) : null;

  const handleDownloadPDF = useCallback(async () => {
    if (!mockupRef.current) return;
    const canvas = await html2canvas(mockupRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height) * 0.85;
    const w = canvas.width * ratio;
    const h = canvas.height * ratio;
    pdf.addImage(imgData, "PNG", (pdfW - w) / 2, (pdfH - h) / 2, w, h);
    pdf.save(`mockup-${productName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  }, [productName]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="gap-2 w-full mt-3">
          <Eye className="w-4 h-4" />
          Preview mockup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview: {productName}</DialogTitle>
        </DialogHeader>

        {/* Mockup canvas */}
        <div
          ref={mockupRef}
          className="bg-white p-8 flex flex-col items-center justify-center gap-4"
        >
          {/* Product name label */}
          <p style={{ color: "#888", fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase" }}>
            {productName}
          </p>

          {/* Product silhouette with print area */}
          <div className="relative" style={{ width: shape.svgWidth, height: shape.svgHeight }}>
            {/* SVG product shape */}
            <svg
              viewBox={shape.viewBox}
              width={shape.svgWidth}
              height={shape.svgHeight}
              className="absolute inset-0"
            >
              <defs>
                <linearGradient id="productGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8ecf1" />
                  <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <path
                d={shape.svgPath}
                fill="url(#productGrad)"
                stroke="#b0b7c3"
                strokeWidth="1.5"
              />
            </svg>

            {/* Print / customization area overlay */}
            <div
              className="absolute flex items-center justify-center overflow-hidden"
              style={{
                top: shape.printArea.top,
                left: shape.printArea.left,
                width: shape.printArea.width,
                height: shape.printArea.height,
              }}
            >
              {customType === "text" ? (
                <p style={{
                  color: "#1a1a2e",
                  fontWeight: 700,
                  fontSize: displayText.length > 15 ? 11 : displayText.length > 8 ? 14 : 18,
                  textAlign: "center",
                  wordBreak: "break-word",
                  lineHeight: 1.2,
                  maxWidth: "100%",
                }}>
                  {displayText}
                </p>
              ) : (
                displayImage && (
                  <img
                    src={displayImage}
                    alt="Custom design"
                    style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain" }}
                    crossOrigin="anonymous"
                  />
                )
              )}
            </div>
          </div>

          {/* Branding watermark */}
          <p style={{ color: "#ccc", fontSize: 9, letterSpacing: 3, textTransform: "uppercase" }}>
            avozenevo mockup preview
          </p>
        </div>

        {/* Download button */}
        <Button onClick={handleDownloadPDF} className="w-full gap-2">
          <Download className="w-4 h-4" />
          Descarcă mockup PDF
        </Button>
      </DialogContent>
    </Dialog>
  );
}
