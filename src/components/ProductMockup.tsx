import { useRef, useCallback, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download, ExternalLink, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getMockupForProduct } from "@/data/mockupImages";
import { renderProductMockupCanvas } from "@/lib/renderProductMockupCanvas";
import { openProductMockupPreview } from "@/lib/openProductMockupPreview";
import { generateAiMockup } from "@/lib/generateAiMockup";
import { FINISH_META, type Finish } from "@/lib/finishOptions";
import { getProductColorLabel, type ProductColorId } from "@/lib/productColors";
import {
  getOverlayPerspective,
  OVERLAY_IMAGE_STYLE,
  OVERLAY_TEXT_STYLE,
  OVERLAY_IMAGE_DEDICATED_STYLE,
  OVERLAY_TEXT_DEDICATED_STYLE,
  OVERLAY_FONT_SIZE_CSS,
} from "@/lib/mockupOverlay";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import { siteConfig } from "@/config/siteConfig";
import { prepareLogoForOverlay } from "@/lib/prepareLogoOverlay";

interface ProductMockupProps {
  productName: string;
  productCategory: string;
  customType: "text" | "image";
  customText: string;
  imagePreview: string | null;
  finish: Finish;
  productColor: ProductColorId;
  triggerLabel?: string;
  aiBaseImage?: string | null;
  onAiBaseImageChange?: (image: string | null) => void;
}

function SingleMockupPreview({
  productName,
  mockupKey,
  mockupImage,
  printArea,
  customType,
  displayText,
  displayImage,
  finish,
  usesDedicatedFinishImage,
  skipOverlay,
  preparedLogo,
}: {
  productName: string;
  mockupKey: string;
  mockupImage: string;
  printArea: { top: string; left: string; width: string; height: string };
  customType: "text" | "image";
  displayText: string;
  displayImage: string | null;
  finish: Finish;
  usesDedicatedFinishImage?: boolean;
  skipOverlay?: boolean;
  preparedLogo?: string | null;
}) {
  const meta = FINISH_META[finish];
  const perspective = getOverlayPerspective(mockupKey);
  const textStyle = usesDedicatedFinishImage ? OVERLAY_TEXT_DEDICATED_STYLE : OVERLAY_TEXT_STYLE;
  const imageStyle = usesDedicatedFinishImage ? OVERLAY_IMAGE_DEDICATED_STYLE : OVERLAY_IMAGE_STYLE;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${meta.badge}`}>
          {meta.label}
        </span>
      </div>
      <div className="relative mx-auto w-full [isolation:isolate]">
        <img
          src={mockupImage}
          alt={`${productName} - ${meta.label}`}
          className="w-full h-auto object-contain"
          crossOrigin="anonymous"
        />
        {!skipOverlay ? (
        <div
          className="absolute flex items-center justify-center overflow-hidden"
          style={{
            top: printArea.top,
            left: printArea.left,
            width: printArea.width,
            height: printArea.height,
            transform: perspective.cssTransform || undefined,
            transformOrigin: "center center",
            containerType: "size",
          }}
        >
          {customType === "text" ? (
            <p
              style={{
                ...textStyle,
                fontSize: OVERLAY_FONT_SIZE_CSS,
              }}
            >
              {displayText}
            </p>
          ) : (
            (preparedLogo || displayImage) && (
              <img
                src={preparedLogo || displayImage || ""}
                alt="Personalizare"
                style={imageStyle}
                crossOrigin="anonymous"
              />
            )
          )}
        </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ProductMockup({
  productName,
  productCategory,
  customType,
  customText,
  imagePreview,
  finish,
  productColor,
  triggerLabel,
  aiBaseImage,
  onAiBaseImageChange,
}: ProductMockupProps) {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openingTab, setOpeningTab] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [brandingInImage, setBrandingInImage] = useState(false);
  const [preparedLogo, setPreparedLogo] = useState<string | null>(null);
  const mockup = getMockupForProduct(productName, productCategory, finish);

  const displayText = customType === "text" ? (customText.trim() || "avozenevo") : "";
  const displayImage = customType === "image" ? (imagePreview || avozenevoLogo) : null;
  const previewImage = aiBaseImage || mockup.image;
  const usesDedicated = !!aiBaseImage || mockup.usesDedicatedFinishImage;
  const skipOverlay = brandingInImage;

  useEffect(() => {
    if (!aiBaseImage) setBrandingInImage(false);
  }, [aiBaseImage]);

  useEffect(() => {
    if (customType !== "image" || !displayImage || skipOverlay) {
      setPreparedLogo(null);
      return;
    }
    let cancelled = false;
    void prepareLogoForOverlay(displayImage).then((src) => {
      if (!cancelled) setPreparedLogo(src);
    });
    return () => {
      cancelled = true;
    };
  }, [customType, displayImage, skipOverlay]);

  const handleGenerateAi = useCallback(async () => {
    if (generatingAi) return;
    setGeneratingAi(true);
    try {
      const result = await generateAiMockup({
        productName,
        productCategory,
        mockupKey: mockup.mockupKey,
        finish,
        productColor,
        aiDescription: mockup.aiDescription,
        customType,
        customText,
      });
      onAiBaseImageChange?.(result.imageDataUrl);
      setBrandingInImage(result.brandingInImage ?? false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generarea AI a eșuat.";
      toast.error(message);
      setDialogOpen(false);
    } finally {
      setGeneratingAi(false);
    }
  }, [
    productName,
    productCategory,
    mockup.mockupKey,
    mockup.aiDescription,
    finish,
    productColor,
    customType,
    customText,
    onAiBaseImageChange,
    generatingAi,
  ]);

  useEffect(() => {
    if (!dialogOpen) return;
    if (aiBaseImage || generatingAi) return;
    void handleGenerateAi();
  }, [dialogOpen, aiBaseImage, generatingAi, handleGenerateAi]);

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
        aiBaseImage,
        brandingInImage,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Previzualizarea nu a putut fi deschisă.";
      toast.error(message);
    } finally {
      setOpeningTab(false);
    }
  }, [productName, productCategory, customType, customText, imagePreview, finish, aiBaseImage, brandingInImage]);

  const handleDownloadPNG = useCallback(async () => {
    try {
      const imgData = await renderProductMockupCanvas(
        productName,
        productCategory,
        customType,
        customText,
        imagePreview,
        finish,
        aiBaseImage,
        brandingInImage,
      );
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `mockup-${productName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.click();
    } catch {
      toast.error("Mockup-ul PNG nu a putut fi generat.");
    }
  }, [productName, productCategory, customType, customText, imagePreview, finish, aiBaseImage, brandingInImage]);

  const handleDownloadPDF = useCallback(async () => {
    try {
      const imgData = await renderProductMockupCanvas(
        productName,
        productCategory,
        customType,
        customText,
        imagePreview,
        finish,
        aiBaseImage,
        brandingInImage,
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
  }, [productName, productCategory, customType, customText, imagePreview, finish, aiBaseImage, brandingInImage]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="gap-2 w-full h-auto py-2.5 whitespace-normal text-left justify-start"
        >
          <Eye className="w-4 h-4 shrink-0" />
          {triggerLabel ?? `Preview mockup: ${productName}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden">
        <div className="overflow-y-auto max-h-[90dvh] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg text-left">
              {productName} — {FINISH_META[finish].label} · {getProductColorLabel(productColor)}
            </DialogTitle>
          </DialogHeader>

          {generatingAi ? (
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4 text-center space-y-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="text-sm font-medium text-foreground">
                Se generează mockup-ul AI...
              </p>
              <p className="text-xs text-muted-foreground">
                Generarea durează aproximativ 5–10 secunde.
              </p>
            </div>
          ) : (
            <div ref={mockupRef} className="bg-white p-3 sm:p-4 mt-4 rounded-lg">
              <SingleMockupPreview
                productName={productName}
                mockupKey={mockup.mockupKey}
                mockupImage={previewImage}
                printArea={mockup.printArea}
                customType={customType}
                displayText={displayText}
                displayImage={displayImage}
                finish={finish}
                usesDedicatedFinishImage={usesDedicated}
                skipOverlay={skipOverlay}
                preparedLogo={preparedLogo}
              />
              <p className="text-center text-[10px] text-muted-foreground mt-3">
                {skipOverlay
                  ? "Textul tău este imprimat direct de AI pe produs."
                  : customType === "text"
                    ? "Textul tău este aplicat pe produs."
                    : "Logo-ul este centrat pe zona de branding a produsului."}
              </p>
            </div>
          )}

          {!generatingAi && aiBaseImage ? (
            <div className="flex flex-col gap-2 mt-4">
              {siteConfig.recaptchaSiteKey ? <RecaptchaNotice className="text-center" /> : null}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleOpenInNewTab}
                  disabled={openingTab}
                  className="gap-2 flex-1"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  {openingTab ? "Se deschide..." : "Deschide în filă nouă"}
                </Button>
                <Button type="button" variant="outline" onClick={handleDownloadPNG} className="gap-2 flex-1">
                  <Download className="w-4 h-4 shrink-0" />
                  PNG
                </Button>
                <Button type="button" onClick={handleDownloadPDF} className="gap-2 flex-1">
                  <Download className="w-4 h-4 shrink-0" />
                  PDF
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
