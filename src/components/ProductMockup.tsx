import { useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getShapeForProduct } from "@/data/mockupShapes";

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

  // Scale the shape to fit nicely in the dialog
  const maxW = 360;
  const maxH = 360;
  const scaleX = maxW / shape.svgWidth;
  const scaleY = maxH / shape.svgHeight;
  const scale = Math.min(scaleX, scaleY, 1.8);
  const renderW = Math.round(shape.svgWidth * scale);
  const renderH = Math.round(shape.svgHeight * scale);

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

  // Dynamic font size based on text length and print area
  const getFontSize = () => {
    const len = displayText.length;
    if (len > 30) return 8;
    if (len > 20) return 10;
    if (len > 12) return 12;
    if (len > 6) return 15;
    return 18;
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
          className="bg-white p-8 flex flex-col items-center justify-center gap-4"
        >
          <p style={{ color: "#888", fontSize: 11, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase" }}>
            {productName}
          </p>

          <div className="relative" style={{ width: renderW, height: renderH }}>
            <svg
              viewBox={shape.viewBox}
              width={renderW}
              height={renderH}
              className="absolute inset-0"
            >
              <defs>
                <linearGradient id="mockupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8ecf1" />
                  <stop offset="100%" stopColor="#cdd3dc" />
                </linearGradient>
              </defs>
              <path
                d={shape.svgPath}
                fill="url(#mockupGrad)"
                stroke="#9ca3af"
                strokeWidth="1.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

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
                  fontSize: getFontSize(),
                  textAlign: "center",
                  wordBreak: "break-word",
                  lineHeight: 1.2,
                  maxWidth: "100%",
                  padding: "2px",
                }}>
                  {displayText}
                </p>
              ) : (
                displayImage && (
                  <img
                    src={displayImage}
                    alt="Custom design"
                    style={{ maxWidth: "92%", maxHeight: "92%", objectFit: "contain" }}
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
