import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { getMockupForProduct } from "@/data/mockupImages";

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

export async function renderProductMockupCanvas(
  productName: string,
  productCategory: string,
  customType: "text" | "image",
  customText: string,
  imagePreview: string | null,
): Promise<string> {
  const mockup = getMockupForProduct(productName, productCategory);
  const productImg = await loadImage(mockup.image);

  const canvas = document.createElement("canvas");
  const width = productImg.naturalWidth || 800;
  const height = productImg.naturalHeight || 800;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponibil");

  ctx.drawImage(productImg, 0, 0, width, height);

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
