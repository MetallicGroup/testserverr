import { renderProductMockupCanvas } from "@/lib/renderProductMockupCanvas";
import { FINISH_LABELS, type Finish } from "@/lib/finishOptions";

export async function openProductMockupPreview(
  productName: string,
  productCategory: string,
  customType: "text" | "image",
  customText: string,
  imagePreview: string | null,
  finish: Finish,
): Promise<void> {
  const imageDataUrl = await renderProductMockupCanvas(
    productName,
    productCategory,
    customType,
    customText,
    imagePreview,
    finish,
  );

  const previewWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!previewWindow) {
    throw new Error("Popup blocat. Permite ferestrele popup pentru previzualizare.");
  }

  const finishLabel = FINISH_LABELS[finish].label;
  const title = `${productName} — ${finishLabel}`;

  previewWindow.document.write(`<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      font-family: Arial, Helvetica, sans-serif;
      padding: 24px;
    }
    h1 { font-size: 1.25rem; color: #0f172a; margin: 0 0 8px; text-align: center; }
    p { color: #64748b; font-size: 0.875rem; margin: 0 0 20px; text-align: center; }
    img {
      max-width: min(900px, 100%);
      max-height: 70vh;
      object-fit: contain;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
      padding: 16px;
    }
  </style>
</head>
<body>
  <h1>${productName}</h1>
  <p>Finisaj: ${finishLabel} · Previzualizare mockup Avozenevo</p>
  <img src="${imageDataUrl}" alt="${productName}" />
</body>
</html>`);
  previewWindow.document.close();
}
