import { useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import avozenevoLogo from "@/assets/avozenevo-logo.png";

// Product category → shape config for the mockup
const CATEGORY_SHAPES: Record<string, { shape: string; width: string; height: string; rounded: string }> = {
  Birou: { shape: "Notebook", width: "w-48", height: "h-64", rounded: "rounded-md" },
  Textile: { shape: "T-Shirt", width: "w-56", height: "h-64", rounded: "rounded-2xl" },
  Genți: { shape: "Bag", width: "w-52", height: "h-56", rounded: "rounded-xl" },
  Băuturi: { shape: "Mug", width: "w-40", height: "h-48", rounded: "rounded-2xl" },
  Tehnologie: { shape: "Device", width: "w-44", height: "h-56", rounded: "rounded-xl" },
  Accesorii: { shape: "Badge", width: "w-40", height: "h-40", rounded: "rounded-full" },
  Outdoor: { shape: "Outdoor", width: "w-48", height: "h-56", rounded: "rounded-xl" },
  Auto: { shape: "Car Item", width: "w-44", height: "h-44", rounded: "rounded-xl" },
  Sănătate: { shape: "Kit", width: "w-44", height: "h-52", rounded: "rounded-lg" },
  Casă: { shape: "Home Item", width: "w-48", height: "h-48", rounded: "rounded-xl" },
  Marketing: { shape: "Banner", width: "w-64", height: "h-44", rounded: "rounded-md" },
  Diverse: { shape: "Item", width: "w-48", height: "h-48", rounded: "rounded-xl" },
};

interface ProductMockupProps {
  productName: string;
  productCategory: string;
  customType: "text" | "image";
  customText: string;
  imagePreview: string | null;
}

export default function ProductMockup({ productName, productCategory, customType, customText, imagePreview }: ProductMockupProps) {
  const mockupRef = useRef<HTMLDivElement>(null);
  const shape = CATEGORY_SHAPES[productCategory] || CATEGORY_SHAPES.Diverse;

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
          className="bg-white p-8 flex flex-col items-center justify-center gap-6"
        >
          {/* Product name label */}
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
            {productName}
          </p>

          {/* Product shape with customization */}
          <div
            className={`${shape.width} ${shape.height} ${shape.rounded} relative bg-gradient-to-br from-secondary to-muted border-2 border-border flex items-center justify-center overflow-hidden shadow-lg`}
          >
            {/* Subtle product texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary))_0%,transparent_60%)]" />

            {/* Customization overlay */}
            <div className="relative z-10 flex items-center justify-center p-4 w-full h-full">
              {customType === "text" ? (
                <p className="text-foreground font-bold text-lg text-center break-words leading-tight">
                  {displayText}
                </p>
              ) : (
                displayImage && (
                  <img
                    src={displayImage}
                    alt="Custom design"
                    className="max-w-[70%] max-h-[70%] object-contain"
                    crossOrigin="anonymous"
                  />
                )
              )}
            </div>
          </div>

          {/* Branding watermark */}
          <p className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">
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
