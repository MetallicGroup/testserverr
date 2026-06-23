import { useRef, useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download, ExternalLink } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getMockupForProduct } from "@/data/mockupImages";
import { renderProductMockupCanvas } from "@/lib/renderProductMockupCanvas";
import { openProductMockupPreview } from "@/lib/openProductMockupPreview";
import { FINISH_IMAGE_STYLES, FINISH_META, FINISH_MULTIPLIERS, type Finish } from "@/lib/finishOptions";

interface ProductMockupProps {
  productName: string;
  productCategory: string;
  customType: "text" | "image";
  customText: string;
  imagePreview: string | null;
  finish: Finish;
  basePrice: number;
  onFinishChange: (value: Finish) => void;
  triggerLabel?: string;
}

function MockupCard({
  productName,
  mockupImage,
  printArea,
  customType,
  displayText,
  displayImage,
  finishKey,
  basePrice,
  isSelected,
  onSelect,
  usesDedicatedFinishImage,
}: {
  productName: string;
  mockupImage: string;
  printArea: { top: string; left: string; width: string; height: string };
  customType: "text" | "image";
  displayText: string;
  displayImage: string | null;
  finishKey: Finish;
  basePrice: number;
  isSelected: boolean;
  onSelect: (finish: Finish) => void;
  usesDedicatedFinishImage?: boolean;
}) {
  const meta = FINISH_META[finishKey];
  const visual = FINISH_IMAGE_STYLES[finishKey];
  const price = (basePrice * FINISH_MULTIPLIERS[finishKey]).toFixed(2);

  const getFontSize = () => {
    const len = displayText.length;
    if (len > 30) return 7;
    if (len > 20) return 8;
    if (len > 12) return 10;
    if (len > 6) return 12;
    return 14;
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(finishKey)}
      className={`flex-1 rounded-xl border-2 transition-all p-3 text-left ${
        isSelected ? "border-primary shadow-lg bg-white" : "border-border/50 bg-white/80 opacity-90"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${meta.badge}`}>
          {meta.label}
        </span>
        <span className="text-sm font-bold" style={{ color: meta.color }}>
          {price} RON
        </span>
      </div>

      <div className="relative mx-auto" style={{ maxWidth: 180 }}>
        <img
          src={mockupImage}
          alt={`${productName} - ${meta.label}`}
          className="w-full h-auto object-contain transition-all duration-300"
          style={{ filter: usesDedicatedFinishImage ? "none" : visual.filter }}
          crossOrigin="anonymous"
        />
        {!usesDedicatedFinishImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: visual.overlay }}
        />
        )}
        <div
          className="absolute flex items-center justify-center overflow-hidden"
          style={{
            top: printArea.top,
            left: printArea.left,
            width: printArea.width,
            height: printArea.height,
          }}
        >
          {customType === "text" ? (
            <p
              style={{
                color: "#1a1a2e",
                fontWeight: 700,
                fontSize: getFontSize(),
                textAlign: "center",
                wordBreak: "break-word",
                lineHeight: 1.2,
                maxWidth: "100%",
                padding: "1px",
                textShadow: "0 0 2px rgba(255,255,255,0.8)",
              }}
            >
              {displayText}
            </p>
          ) : (
            displayImage && (
              <img
                src={displayImage}
                alt="Custom"
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

      {isSelected && (
        <p className="text-center text-[10px] text-primary font-semibold mt-2">✓ Selectat</p>
      )}
    </button>
  );
}

export default function ProductMockup({
  productName,
  productCategory,
  customType,
  customText,
  imagePreview,
  finish,
  basePrice,
  onFinishChange,
  triggerLabel,
}: ProductMockupProps) {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [openingTab, setOpeningTab] = useState(false);
  const mockup = getMockupForProduct(productName, productCategory, finish);

  const displayText = customType === "text" ? (customText.trim() || "avozenevo") : "";
  const displayImage = customType === "image" ? (imagePreview || avozenevoLogo) : null;

  const handleOpenInNewTab = useCallback(async () => {
    setOpeningTab(true);
    try {
      await openProductMockupPreview(
        productName,
        productCategory,
        customType,
        customText,
        imagePreview,
        finish,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Previzualizarea nu a putut fi deschisă.";
      toast.error(message);
    } finally {
      setOpeningTab(false);
    }
  }, [productName, productCategory, customType, customText, imagePreview, finish]);

  const handleDownloadPDF = useCallback(async () => {
    try {
      const imgData = await renderProductMockupCanvas(
        productName,
        productCategory,
        customType,
        customText,
        imagePreview,
        finish,
      );
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const img = new Image();
      img.src = imgData;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Imagine invalidă"));
      });
      const ratio = Math.min(pdfW / img.width, pdfH / img.height) * 0.85;
      const w = img.width * ratio;
      const h = img.height * ratio;
      pdf.addImage(imgData, "PNG", (pdfW - w) / 2, (pdfH - h) / 2, w, h);
      pdf.save(`mockup-${productName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
    } catch {
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
    }
  }, [productName, productCategory, customType, customText, imagePreview, finish]);

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="gap-2 w-full sm:flex-1">
            <Eye className="w-4 h-4" />
            {triggerLabel ?? "Compară finisaje & Preview mockup"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Comparație finisaje: {productName}</DialogTitle>
          </DialogHeader>

          <div ref={mockupRef} className="bg-white p-4 sm:p-6">
            <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">
              {productName} — Comparație calitate finisaj
            </p>

            <div className="flex gap-3 sm:gap-4">
              {(["low", "medium", "high"] as Finish[]).map((key) => {
                const tierMockup = getMockupForProduct(productName, productCategory, key);
                return (
              <MockupCard
                key={key}
                productName={productName}
                mockupImage={tierMockup.image}
                printArea={tierMockup.printArea}
                  customType={customType}
                  displayText={displayText}
                  displayImage={displayImage}
                  finishKey={key}
                  basePrice={basePrice}
                  isSelected={finish === key}
                  onSelect={onFinishChange}
                  usesDedicatedFinishImage={tierMockup.usesDedicatedFinishImage}
                />
                );
              })}
            </div>

            <p className="text-center text-[9px] text-gray-300 uppercase tracking-widest mt-4">
              avozenevo mockup previzualizare
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={handleOpenInNewTab} disabled={openingTab} className="gap-2 flex-1">
              <ExternalLink className="w-4 h-4" />
              {openingTab ? "Se deschide..." : "Deschide în filă nouă"}
            </Button>
            <Button type="button" onClick={handleDownloadPDF} className="gap-2 flex-1">
              <Download className="w-4 h-4" />
              Descarcă mockup PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        type="button"
        variant="secondary"
        onClick={handleOpenInNewTab}
        disabled={openingTab}
        className="gap-2 w-full sm:w-auto sm:shrink-0"
      >
        <ExternalLink className="w-4 h-4" />
        Filă nouă
      </Button>
    </div>
  );
}
