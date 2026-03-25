import { useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getMockupForProduct } from "@/data/mockupImages";

interface ProductMockupProps {
  productName: string;
  productCategory: string;
  customType: "text" | "image";
  customText: string;
  imagePreview: string | null;
}

export default function ProductMockup({ productName, productCategory, customType, customText, imagePreview }: ProductMockupProps) {
  const mockupRef = useRef<HTMLDivElement>(null);
  const mockup = getMockupForProduct(productName, productCategory);

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

  const getFontSize = () => {
    const len = displayText.length;
    if (len > 30) return 9;
    if (len > 20) return 11;
    if (len > 12) return 13;
    if (len > 6) return 16;
    return 20;
  };

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

        <div
          ref={mockupRef}
          className="bg-white p-6 flex flex-col items-center justify-center gap-3"
        >
          <p style={{ color: "#888", fontSize: 11, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase" }}>
            {productName}
          </p>

          {/* Product photo with print overlay */}
          <div className="relative inline-block" style={{ maxWidth: 400, maxHeight: 400 }}>
            <img
              src={mockup.image}
              alt={productName}
              className="w-full h-auto max-h-[380px] object-contain"
              crossOrigin="anonymous"
            />

            {/* Print area overlay */}
            <div
              className="absolute flex items-center justify-center overflow-hidden"
              style={{
                top: mockup.printArea.top,
                left: mockup.printArea.left,
                width: mockup.printArea.width,
                height: mockup.printArea.height,
              }}
            >
              {customType === "text" ? (
                <p style={{
                  color: "#1a1a2e",
                  fontWeight: 700,
                  fontSize: getFontSize(),
                  textAlign: "center",
                  wordBreak: "break-word",
                  lineHeight: 1.2,
                  maxWidth: "100%",
                  padding: "2px",
                  textShadow: "0 0 2px rgba(255,255,255,0.8)",
                }}>
                  {displayText}
                </p>
              ) : (
                displayImage && (
                  <img
                    src={displayImage}
                    alt="Custom design"
                    style={{
                      maxWidth: "90%",
                      maxHeight: "90%",
                      objectFit: "contain",
                      opacity: 0.9,
                      mixBlendMode: "multiply",
                    }}
                    crossOrigin="anonymous"
                  />
                )
              )}
            </div>
          </div>

          <p style={{ color: "#ccc", fontSize: 9, letterSpacing: 3, textTransform: "uppercase" }}>
            avozenevo mockup preview
          </p>
        </div>

        <Button onClick={handleDownloadPDF} className="w-full gap-2">
          <Download className="w-4 h-4" />
          Descarcă mockup PDF
        </Button>
      </DialogContent>
    </Dialog>
  );
}
