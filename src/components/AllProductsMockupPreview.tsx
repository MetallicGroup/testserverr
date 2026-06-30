import { useState, useCallback, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getMockupForProduct } from "@/data/mockupImages";
import { generateAiMockup } from "@/lib/generateAiMockup";
import { FINISH_META, type Finish } from "@/lib/finishOptions";
import {
  getOverlayPerspective,
  OVERLAY_IMAGE_STYLE,
  OVERLAY_TEXT_STYLE,
  OVERLAY_IMAGE_DEDICATED_STYLE,
  OVERLAY_TEXT_DEDICATED_STYLE,
} from "@/lib/mockupOverlay";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import { siteConfig } from "@/config/siteConfig";

interface ProductItem {
  id: string;
  name: string;
  category: string;
}

interface AllProductsMockupPreviewProps {
  products: ProductItem[];
  getFinish: (productId: string) => Finish;
  customType: "text" | "image";
  customText: string;
  imagePreview: string | null;
  getAiMockupImage: (productId: string) => string | null;
  setAiMockupImage: (productId: string, image: string | null) => void;
}

function ProductMockupTile({
  productName,
  productCategory,
  finish,
  customType,
  displayText,
  displayImage,
  mockupImage,
  loading,
  error,
}: {
  productName: string;
  productCategory: string;
  finish: Finish;
  customType: "text" | "image";
  displayText: string;
  displayImage: string | null;
  mockupImage: string | null;
  loading: boolean;
  error?: string;
}) {
  const mockup = getMockupForProduct(productName, productCategory, finish);
  const meta = FINISH_META[finish];
  const usesDedicated = !!mockupImage && mockupImage.startsWith("data:");
  const perspective = usesDedicated
    ? { cssTransform: "" }
    : getOverlayPerspective(mockup.mockupKey);
  const image = mockupImage || mockup.image;

  const getFontSize = () => {
    const len = displayText.length;
    if (len > 20) return 9;
    if (len > 12) return 11;
    return 13;
  };

  return (
    <div className="rounded-xl border border-border bg-white p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground break-words">{productName}</p>
        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${meta.badge}`}>
          {meta.label}
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground">5–10 sec...</p>
        </div>
      ) : error ? (
        <p className="text-xs text-destructive py-4 text-center">{error}</p>
      ) : (
        <div className="relative mx-auto w-full max-w-[200px] [isolation:isolate]">
          <img src={image} alt={productName} className="w-full h-auto object-contain" crossOrigin="anonymous" />
          <div
            className="absolute flex items-center justify-center overflow-hidden"
            style={{
              top: mockup.printArea.top,
              left: mockup.printArea.left,
              width: mockup.printArea.width,
              height: mockup.printArea.height,
              transform: perspective.cssTransform || undefined,
              transformOrigin: "center center",
            }}
          >
            {customType === "text" ? (
              <p
                style={{
                  ...(usesDedicated ? OVERLAY_TEXT_DEDICATED_STYLE : OVERLAY_TEXT_STYLE),
                  fontSize: getFontSize(),
                }}
              >
                {displayText}
              </p>
            ) : (
              displayImage && (
                <img
                  src={displayImage}
                  alt="Personalizare"
                  style={usesDedicated ? OVERLAY_IMAGE_DEDICATED_STYLE : OVERLAY_IMAGE_STYLE}
                  crossOrigin="anonymous"
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AllProductsMockupPreview({
  products,
  getFinish,
  customType,
  customText,
  imagePreview,
  getAiMockupImage,
  setAiMockupImage,
}: AllProductsMockupPreviewProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const batchStartedRef = useRef(false);

  const displayText = customType === "text" ? (customText.trim() || "avozenevo") : "";
  const displayImage = customType === "image" ? (imagePreview || avozenevoLogo) : null;

  const generateForProduct = useCallback(
    async (product: ProductItem) => {
      if (getAiMockupImage(product.id) || generatingIds.has(product.id)) return;
      const finish = getFinish(product.id);
      const mockup = getMockupForProduct(product.name, product.category, finish);

      setGeneratingIds((prev) => new Set(prev).add(product.id));
      setErrors((prev) => {
        const { [product.id]: _removed, ...rest } = prev;
        return rest;
      });

      try {
        const result = await generateAiMockup({
          productName: product.name,
          productCategory: product.category,
          mockupKey: mockup.mockupKey,
          finish,
          aiDescription: mockup.aiDescription,
        });
        setAiMockupImage(product.id, result.imageDataUrl);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Generarea a eșuat.";
        setErrors((prev) => ({ ...prev, [product.id]: message }));
      } finally {
        setGeneratingIds((prev) => {
          const next = new Set(prev);
          next.delete(product.id);
          return next;
        });
      }
    },
    [getFinish, getAiMockupImage, setAiMockupImage, generatingIds],
  );

  useEffect(() => {
    if (!dialogOpen) {
      batchStartedRef.current = false;
      return;
    }
    if (batchStartedRef.current) return;
    batchStartedRef.current = true;

    const pending = products.filter((p) => !getAiMockupImage(p.id));
    void Promise.all(pending.map((p) => generateForProduct(p)));
  }, [dialogOpen, products, getAiMockupImage, generateForProduct]);

  const isGenerating = generatingIds.size > 0;
  const count = products.length;

  if (count === 0) return null;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="gap-2 w-full h-auto py-3">
          <Eye className="w-4 h-4 shrink-0" />
          Preview mockup — toate produsele ({count})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden">
        <div className="overflow-y-auto max-h-[90dvh] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg text-left">
              Preview — {count} {count === 1 ? "produs" : "produse"}
            </DialogTitle>
          </DialogHeader>

          {isGenerating ? (
            <p className="text-sm text-muted-foreground mt-2">
              Se generează mockup-urile AI. Fiecare produs durează aproximativ 5–10 secunde.
            </p>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {products.map((product) => (
              <ProductMockupTile
                key={product.id}
                productName={product.name}
                productCategory={product.category}
                finish={getFinish(product.id)}
                customType={customType}
                displayText={displayText}
                displayImage={displayImage}
                mockupImage={getAiMockupImage(product.id)}
                loading={generatingIds.has(product.id)}
                error={errors[product.id]}
              />
            ))}
          </div>

          {siteConfig.recaptchaSiteKey ? <RecaptchaNotice className="text-center mt-4" /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
