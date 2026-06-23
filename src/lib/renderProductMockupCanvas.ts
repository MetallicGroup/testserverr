import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getMockupForProduct } from "@/data/mockupImages";
import { FINISH_CANVAS_EFFECTS, type Finish } from "@/lib/finishOptions";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Nu s-a putut încărca imaginea: ${src}`));
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
): Promise<string> {
  const mockup = getMockupForProduct(productName, productCategory, finish);
  const productImg = await loadImage(mockup.image);

  const canvas = document.createElement("canvas");
  const width = productImg.naturalWidth || 800;
  const height = productImg.naturalHeight || 800;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponibil");

  ctx.drawImage(productImg, 0, 0, width, height);
  if (!mockup.usesDedicatedFinishImage) {
    applyFinishToCanvas(ctx, width, height, finish);
  }

  const top = parsePercent(mockup.printArea.top) * height;
  const left = parsePercent(mockup.printArea.left) * width;
  const areaW = parsePercent(mockup.printArea.width) * width;
  const areaH = parsePercent(mockup.printArea.height) * height;

  if (customType === "text") {
    const text = customText.trim() || "Avozenevo";
    ctx.fillStyle = "#1a1a2e";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let fontSize = Math.min(areaH * 0.55, 72);
    ctx.font = `bold ${fontSize}px Arial, Helvetica, sans-serif`;
    while (ctx.measureText(text).width > areaW * 0.92 && fontSize > 8) {
      fontSize -= 1;
      ctx.font = `bold ${fontSize}px Arial, Helvetica, sans-serif`;
    }
    ctx.shadowColor = "rgba(255,255,255,0.85)";
    ctx.shadowBlur = 3;
    ctx.fillText(text, left + areaW / 2, top + areaH / 2, areaW * 0.92);
    ctx.shadowBlur = 0;
  } else {
    const overlaySrc = imagePreview || avozenevoLogo;
    const overlay = await loadImage(overlaySrc);
    const scale = Math.min((areaW * 0.9) / overlay.width, (areaH * 0.9) / overlay.height);
    const w = overlay.width * scale;
    const h = overlay.height * scale;
    ctx.globalAlpha = 0.95;
    ctx.drawImage(overlay, left + (areaW - w) / 2, top + (areaH - h) / 2, w, h);
    ctx.globalAlpha = 1;
  }

  return canvas.toDataURL("image/png");
}
