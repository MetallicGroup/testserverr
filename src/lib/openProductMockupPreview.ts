import { renderProductMockupCanvas } from "@/lib/renderProductMockupCanvas";
import { FINISH_LABELS, type Finish } from "@/lib/finishOptions";

function writeLoadingShell(
  previewWindow: Window,
  productName: string,
  finishLabel: string,
): void {
  const doc = previewWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${productName} — ${finishLabel}</title>
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
    #mockup-img {
      max-width: min(900px, 100%);
      max-height: 70vh;
      object-fit: contain;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
      padding: 16px;
    }
    .loading { color: #94a3b8; font-size: 0.875rem; }
  </style>
</head>
<body>
  <h1>${productName}</h1>
  <p>Finisaj: ${finishLabel} · Previzualizare mockup Avozenevo</p>
  <p class="loading" id="status">Se generează previzualizarea...</p>
  <img id="mockup-img" alt="${productName}" style="display:none" />
</body>
</html>`);
  doc.close();
}

function showPreviewImage(previewWindow: Window, imageSrc: string): void {
  const doc = previewWindow.document;
  const img = doc.getElementById("mockup-img") as HTMLImageElement | null;
  const status = doc.getElementById("status");
  if (!img) return;

  img.onload = () => {
    img.style.display = "block";
    if (status) status.remove();
  };
  img.onerror = () => {
    if (status) {
      status.textContent = "Imaginea mockup nu a putut fi afișată.";
      status.classList.remove("loading");
    }
  };
  img.src = imageSrc;
}

function showPreviewError(previewWindow: Window, message: string): void {
  const status = previewWindow.document.getElementById("status");
  if (status) {
    status.textContent = message;
    status.classList.remove("loading");
  }
}

export async function openProductMockupPreview(
  productName: string,
  productCategory: string,
  customType: "text" | "image",
  customText: string,
  imagePreview: string | null,
  finish: Finish,
  customBaseImage?: string | null,
  brandingInImage = false,
): Promise<void> {
  const finishLabel = FINISH_LABELS[finish].label;

  // Deschide fereastra sincron (înainte de await), altfel popup-ul e gol sau e blocat.
  const previewWindow = window.open("about:blank", "_blank");
  if (!previewWindow) {
    throw new Error("Popup blocat. Permite ferestrele popup pentru previzualizare.");
  }

  writeLoadingShell(previewWindow, productName, finishLabel);

  try {
    const imageDataUrl = await renderProductMockupCanvas(
      productName,
      productCategory,
      customType,
      customText,
      imagePreview,
      finish,
      customBaseImage,
      brandingInImage,
    );
    showPreviewImage(previewWindow, imageDataUrl);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Previzualizarea nu a putut fi generată.";
    showPreviewError(previewWindow, message);
    throw error;
  }
}
