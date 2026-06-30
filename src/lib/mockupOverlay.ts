import type { CSSProperties } from "react";

export interface OverlayPerspective {
  cssTransform: string;
  /** Radians on canvas */
  rotate: number;
  scaleY: number;
  skewX: number;
}

const DEFAULT_PERSPECTIVE: OverlayPerspective = {
  cssTransform: "",
  rotate: 0,
  scaleY: 1,
  skewX: 0,
};

/** Approximate product surface angle per mockup type (AI photos are mostly 3/4 view). */
const PERSPECTIVE_BY_KEY: Record<string, Partial<OverlayPerspective>> = {
  notebook: { cssTransform: "perspective(520px) rotateX(10deg) rotateY(-11deg)", rotate: -0.1, scaleY: 0.86, skewX: -0.1 },
  mug: { cssTransform: "perspective(420px) rotateY(-15deg) rotateX(4deg)", rotate: -0.07, scaleY: 0.94, skewX: -0.11 },
  pen: { cssTransform: "perspective(380px) rotateY(-20deg) rotateX(5deg)", rotate: -0.12, scaleY: 0.9, skewX: -0.14 },
  bottle: { cssTransform: "perspective(400px) rotateY(-11deg)", rotate: -0.05, scaleY: 0.95, skewX: -0.08 },
  thermos: { cssTransform: "perspective(400px) rotateY(-10deg)", rotate: -0.05, scaleY: 0.95, skewX: -0.07 },
  box: { cssTransform: "perspective(540px) rotateX(7deg) rotateY(-9deg)", rotate: -0.08, scaleY: 0.88, skewX: -0.09 },
  paper: { cssTransform: "perspective(580px) rotateX(16deg) rotateY(-7deg)", rotate: -0.06, scaleY: 0.84, skewX: -0.06 },
  cap: { cssTransform: "perspective(450px) rotateY(-9deg) rotateX(4deg)", rotate: -0.06, scaleY: 0.92, skewX: -0.09 },
  backpack: { cssTransform: "perspective(500px) rotateY(-6deg)", rotate: -0.04, scaleY: 0.96, skewX: -0.05 },
  wallet: { cssTransform: "perspective(480px) rotateX(6deg) rotateY(-8deg)", rotate: -0.07, scaleY: 0.9, skewX: -0.08 },
  phonecase: { cssTransform: "perspective(400px) rotateY(-8deg)", rotate: -0.05, scaleY: 0.95, skewX: -0.06 },
  usb: { cssTransform: "perspective(360px) rotateY(-18deg) rotateX(4deg)", rotate: -0.1, scaleY: 0.91, skewX: -0.12 },
  powerbank: { cssTransform: "perspective(380px) rotateY(-12deg)", rotate: -0.07, scaleY: 0.93, skewX: -0.1 },
  umbrella: { cssTransform: "perspective(450px) rotateY(-8deg) rotateX(5deg)", rotate: -0.05, scaleY: 0.94, skewX: -0.06 },
  banner: { cssTransform: "perspective(700px) rotateY(-2deg)", rotate: -0.02, scaleY: 0.98, skewX: -0.02 },
  mousepad: { cssTransform: "perspective(900px) rotateX(18deg)", rotate: 0, scaleY: 0.78, skewX: 0 },
  penholder: { cssTransform: "perspective(500px) rotateX(8deg)", rotate: 0.04, scaleY: 0.92, skewX: 0 },
  clipboard: { cssTransform: "perspective(580px) rotateX(12deg)", rotate: 0.05, scaleY: 0.88, skewX: 0 },
  cuttingboard: { cssTransform: "perspective(800px) rotateX(16deg)", rotate: 0, scaleY: 0.8, skewX: 0 },
  plate: { cssTransform: "perspective(700px) rotateX(18deg)", rotate: 0, scaleY: 0.78, skewX: 0 },
  keyboard: { cssTransform: "perspective(800px) rotateX(14deg)", rotate: 0, scaleY: 0.82, skewX: 0 },
  badge: { cssTransform: "perspective(400px) rotateX(4deg)", rotate: 0, scaleY: 0.96, skewX: 0 },
  keychain: { cssTransform: "perspective(500px) rotateX(8deg)", rotate: 0.03, scaleY: 0.92, skewX: 0.04 },
  lanyard: { cssTransform: "perspective(600px) rotateX(6deg)", rotate: 0.04, scaleY: 0.94, skewX: 0.03 },
  tshirt: { cssTransform: "perspective(900px) rotateX(2deg)", rotate: 0, scaleY: 1, skewX: 0 },
  polo: { cssTransform: "perspective(900px) rotateX(2deg)", rotate: 0, scaleY: 1, skewX: 0 },
  hoodie: { cssTransform: "perspective(900px) rotateX(2deg)", rotate: 0, scaleY: 1, skewX: 0 },
  totebag: { cssTransform: "perspective(750px) rotateX(3deg)", rotate: 0, scaleY: 0.98, skewX: 0 },
};

export function getOverlayPerspective(mockupKey: string): OverlayPerspective {
  return { ...DEFAULT_PERSPECTIVE, ...PERSPECTIVE_BY_KEY[mockupKey] };
}

export const OVERLAY_TEXT_STYLE: CSSProperties = {
  color: "#2b2b35",
  fontWeight: 700,
  textAlign: "center",
  wordBreak: "break-word",
  lineHeight: 1.15,
  maxWidth: "100%",
  padding: "2px",
  mixBlendMode: "multiply",
  opacity: 0.88,
  textShadow: "0 1px 2px rgba(0,0,0,0.18), 0 0 1px rgba(255,255,255,0.35)",
};

export const OVERLAY_IMAGE_STYLE: CSSProperties = {
  maxWidth: "88%",
  maxHeight: "88%",
  objectFit: "contain",
  mixBlendMode: "multiply",
  opacity: 0.9,
  filter: "contrast(1.05) saturate(0.95)",
};

/** Flatter overlay for dedicated finish photos (already studio-shot). */
export const OVERLAY_TEXT_DEDICATED_STYLE: CSSProperties = {
  color: "#1f1f28",
  fontWeight: 700,
  textAlign: "center",
  wordBreak: "break-word",
  lineHeight: 1.1,
  maxWidth: "92%",
  padding: "1px 2px",
  mixBlendMode: "multiply",
  opacity: 0.92,
  textShadow: "0 1px 1px rgba(255,255,255,0.35)",
};

export const OVERLAY_IMAGE_DEDICATED_STYLE: CSSProperties = {
  maxWidth: "90%",
  maxHeight: "90%",
  objectFit: "contain",
  mixBlendMode: "multiply",
  opacity: 0.88,
  filter: "contrast(1.08)",
};

function applyCanvasPerspective(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  perspective: OverlayPerspective,
) {
  ctx.translate(cx, cy);
  if (perspective.skewX) {
    ctx.transform(1, 0, perspective.skewX, perspective.scaleY, 0, 0);
  } else if (perspective.scaleY !== 1) {
    ctx.scale(1, perspective.scaleY);
  }
  if (perspective.rotate) {
    ctx.rotate(perspective.rotate);
  }
  ctx.translate(-cx, -cy);
}

export function drawMockupText(
  ctx: CanvasRenderingContext2D,
  text: string,
  left: number,
  top: number,
  areaW: number,
  areaH: number,
  mockupKey: string,
  flatOverlay = false,
): void {
  const perspective = flatOverlay
    ? { cssTransform: "", rotate: 0, scaleY: 1, skewX: 0 }
    : getOverlayPerspective(mockupKey);
  const cx = left + areaW / 2;
  const cy = top + areaH / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(left, top, areaW, areaH);
  ctx.clip();

  applyCanvasPerspective(ctx, cx, cy, perspective);

  let fontSize = Math.min(areaH * 0.5, widthScaledFont(areaW, text.length));
  ctx.font = `700 ${fontSize}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  while (ctx.measureText(text).width > areaW * 0.9 && fontSize > 7) {
    fontSize -= 1;
    ctx.font = `700 ${fontSize}px Arial, Helvetica, sans-serif`;
  }

  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgba(35, 35, 48, 0.82)";
  ctx.shadowColor = "rgba(0, 0, 0, 0.22)";
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.fillText(text, cx, cy, areaW * 0.9);

  ctx.shadowColor = "transparent";
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(35, 35, 48, 0.35)";
  ctx.fillText(text, cx, cy + 0.5, areaW * 0.9);

  ctx.restore();
}

function widthScaledFont(areaW: number, textLen: number): number {
  const base = Math.min(areaW * 0.22, 64);
  if (textLen > 24) return base * 0.55;
  if (textLen > 14) return base * 0.7;
  if (textLen > 8) return base * 0.85;
  return base;
}

export function drawMockupImage(
  ctx: CanvasRenderingContext2D,
  overlay: HTMLImageElement,
  left: number,
  top: number,
  areaW: number,
  areaH: number,
  mockupKey: string,
  flatOverlay = false,
): void {
  const perspective = flatOverlay
    ? { cssTransform: "", rotate: 0, scaleY: 1, skewX: 0 }
    : getOverlayPerspective(mockupKey);
  const cx = left + areaW / 2;
  const cy = top + areaH / 2;
  const scale = Math.min((areaW * 0.88) / overlay.width, (areaH * 0.88) / overlay.height);
  const w = overlay.width * scale;
  const h = overlay.height * scale;
  const dx = left + (areaW - w) / 2;
  const dy = top + (areaH - h) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(left, top, areaW, areaH);
  ctx.clip();

  applyCanvasPerspective(ctx, cx, cy, perspective);

  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.9;
  ctx.drawImage(overlay, dx, dy, w, h);

  ctx.restore();
}
