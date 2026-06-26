import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getMockupForProduct } from "@/data/mockupImages";
import { FINISH_CANVAS_EFFECTS, type Finish } from "@/lib/finishOptions";
import { drawMockupImage, drawMockupText } from "@/lib/mockupOverlay";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const isExternalHttp =
      (src.startsWith("http://") || src.startsWith("https://")) &&
      !src.startsWith(window.location.origin);
    if (isExternalHttp) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Nu s-a putut încărca imaginea: ${src.slice(0, 80)}`));
    img.src = src;
  });
}

function parsePercent(value: string): number {
  return parseFloat(value.replace("%", "")) / 100;
}

function applyFinishToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  finish: Finish,
) {
  const effect = FINISH_CANVAS_EFFECTS[finish];
  if (effect.saturation !== 1 || effect.brightness !== 1 || effect.contrast !== 1) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + (r - gray) * effect.saturation;
      g = gray + (g - gray) * effect.saturation;
      b = gray + (b - gray) * effect.saturation;
      r = ((r / 255 - 0.5) * effect.contrast + 0.5) * 255 * effect.brightness;
      g = ((g / 255 - 0.5) * effect.contrast + 0.5) * 255 * effect.brightness;
      b = ((b / 255 - 0.5) * effect.contrast + 0.5) * 255 * effect.brightness;
      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }
    ctx.putImageData(imageData, 0, 0);
  }
  if (effect.overlay !== "transparent") {
    ctx.fillStyle = effect.overlay;
    ctx.fillRect(0, 0, width, height);
  }
}

export async function renderProductMockupCanvas(
  productName: string,
  productCategory: string,
  customType: "text" | "image",
  customText: string,
  imagePreview: string | null,
  finish: Finish = "medium",
  customBaseImage?: string | null,
): Promise<string> {
  const mockup = getMockupForProduct(productName, productCategory, finish);
  const productImg = await loadImage(customBaseImage || mockup.image);

  const sourceW = productImg.naturalWidth || 800;
  const sourceH = productImg.naturalHeight || 800;
  const maxExportWidth = 1200;
  const exportScale = sourceW > maxExportWidth ? maxExportWidth / sourceW : 1;
  const width = Math.round(sourceW * exportScale);
  const height = Math.round(sourceH * exportScale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponibil");

  ctx.drawImage(productImg, 0, 0, width, height);
  if (!mockup.usesDedicatedFinishImage && !customBaseImage) {
    applyFinishToCanvas(ctx, width, height, finish);
  }

  const top = parsePercent(mockup.printArea.top) * height;
  const left = parsePercent(mockup.printArea.left) * width;
  const areaW = parsePercent(mockup.printArea.width) * width;
  const areaH = parsePercent(mockup.printArea.height) * height;

  if (customType === "text") {
    const text = customText.trim() || "Avozenevo";
    drawMockupText(ctx, text, left, top, areaW, areaH, mockup.mockupKey);
  } else {
    const overlaySrc = imagePreview || avozenevoLogo;
    const overlay = await loadImage(overlaySrc);
    drawMockupImage(ctx, overlay, left, top, areaW, areaH, mockup.mockupKey);
  }

  return canvas.toDataURL("image/png");
}
