import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import avozenevoLogo from "@/assets/avozenevo-logo.png";
import { siteConfig } from "@/config/siteConfig";
import { renderProductMockupCanvas } from "@/lib/renderProductMockupCanvas";
import type { Finish } from "@/lib/finishOptions";

export interface OfferLineItem {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  finishLabel: string;
  finish: Finish;
}

export interface OfferPdfInput {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientMessage?: string;
  finishLabel?: string;
  customType: "text" | "image";
  customText: string;
  imagePreview: string | null;
  lineItems: OfferLineItem[];
  grandTotal: number;
}

const PAGE_WIDTH_PX = 794;
const PAGE_MIN_HEIGHT_PX = 1123;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMoney(value: number): string {
  return `${value.toFixed(2)} RON`;
}

function formatDateRo(date: Date): string {
  return date.toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function pageShell(content: string): HTMLElement {
  const el = document.createElement("div");
  el.style.cssText = [
    `width:${PAGE_WIDTH_PX}px`,
    `min-height:${PAGE_MIN_HEIGHT_PX}px`,
    "padding:44px 48px",
    "background:#ffffff",
    "font-family:Arial,Helvetica,sans-serif",
    "color:#0f172a",
    "box-sizing:border-box",
    "position:relative",
  ].join(";");
  el.innerHTML = content;
  return el;
}

function headerBlock(): string {
  return `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #2563eb;padding-bottom:20px;margin-bottom:28px;">
      <img src="${avozenevoLogo}" alt="Avozenevo" style="height:52px;width:auto;object-fit:contain" crossorigin="anonymous" />
      <div style="text-align:right;font-size:11px;color:#64748b;line-height:1.6;">
        <div style="font-weight:700;color:#0f172a;font-size:14px;margin-bottom:4px;">${escapeHtml(siteConfig.companyName)}</div>
        <div>${escapeHtml(siteConfig.company.addressLine)}</div>
        <div>${escapeHtml(siteConfig.company.city)}, ${escapeHtml(siteConfig.company.county)}</div>
        <div>${escapeHtml(siteConfig.email)} · ${escapeHtml(siteConfig.phoneDisplay)}</div>
        <div>${escapeHtml(siteConfig.websiteUrl)}</div>
      </div>
    </div>
  `;
}

function footerBlock(): string {
  return `
    <div style="margin-top:36px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:9px;color:#94a3b8;line-height:1.5;text-align:center;">
      Ofertă estimativă generată online · Prețurile pot varia în funcție de specificații finale · ${escapeHtml(siteConfig.brandName)} — produse personalizate B2B
    </div>
  `;
}

function buildSummaryPage(input: OfferPdfInput, generatedAt: Date): HTMLElement {
  const rows = input.lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(item.name)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;">${escapeHtml(item.category)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">${escapeHtml(item.finishLabel)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">${formatMoney(item.unitPrice)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;">${formatMoney(item.totalPrice)}</td>
      </tr>
    `,
    )
    .join("");

  const messageBlock = input.clientMessage?.trim()
    ? `<p style="margin:12px 0 0;font-size:12px;color:#475569;"><strong>Mesaj:</strong> ${escapeHtml(input.clientMessage.trim())}</p>`
    : "";

  return pageShell(`
    ${headerBlock()}
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;">
      <div>
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2563eb;">Ofertă personalizată</p>
        <h1 style="margin:6px 0 0;font-size:28px;font-weight:800;color:#0f172a;">Previzualizare comandă</h1>
      </div>
      <div style="text-align:right;font-size:12px;color:#64748b;">
        <div><strong>Data:</strong> ${escapeHtml(formatDateRo(generatedAt))}</div>
        <div><strong>Finisaj:</strong> ${escapeHtml(input.finishLabel || "Per produs")}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;">
        <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#2563eb;">Date client</p>
        <p style="margin:0 0 6px;font-size:13px;"><strong>Nume:</strong> ${escapeHtml(input.clientName)}</p>
        <p style="margin:0 0 6px;font-size:13px;"><strong>Email:</strong> ${escapeHtml(input.clientEmail)}</p>
        <p style="margin:0;font-size:13px;"><strong>Telefon:</strong> ${escapeHtml(input.clientPhone)}</p>
        ${messageBlock}
      </div>
      <div style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);border-radius:12px;padding:18px;color:#fff;">
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;opacity:0.85;">Total estimat</p>
        <p style="margin:0;font-size:32px;font-weight:800;">${formatMoney(input.grandTotal)}</p>
        <p style="margin:10px 0 0;font-size:11px;opacity:0.9;">${input.lineItems.length} produs(e) · cantități și finisaje individualizate</p>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:12px;">
      <thead>
        <tr style="background:#eff6ff;">
          <th style="padding:10px 12px;text-align:left;color:#1e40af;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">Produs</th>
          <th style="padding:10px 12px;text-align:left;color:#1e40af;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">Categorie</th>
          <th style="padding:10px 12px;text-align:center;color:#1e40af;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">Finisaj</th>
          <th style="padding:10px 12px;text-align:center;color:#1e40af;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">Cant.</th>
          <th style="padding:10px 12px;text-align:right;color:#1e40af;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">Preț/buc</th>
          <th style="padding:10px 12px;text-align:right;color:#1e40af;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="5" style="padding:14px 12px;text-align:right;font-weight:700;font-size:13px;">Total general</td>
          <td style="padding:14px 12px;text-align:right;font-weight:800;font-size:15px;color:#2563eb;">${formatMoney(input.grandTotal)}</td>
        </tr>
      </tfoot>
    </table>
    ${footerBlock()}
  `);
}

function buildProductPage(
  input: OfferPdfInput,
  item: OfferLineItem,
  mockupDataUrl: string,
  pageIndex: number,
  totalPages: number,
): HTMLElement {
  const personalization =
    input.customType === "text"
      ? `Text: ${input.customText.trim() || "Avozenevo"}`
      : "Logo / imagine încărcată";

  return pageShell(`
    ${headerBlock()}
    <div style="margin-bottom:20px;">
      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2563eb;">
        Previzualizare produs · ${pageIndex} / ${totalPages}
      </p>
      <h2 style="margin:6px 0 4px;font-size:24px;font-weight:800;">${escapeHtml(item.name)}</h2>
      <p style="margin:0;font-size:13px;color:#64748b;">${escapeHtml(item.category)} · Finisaj: ${escapeHtml(item.finishLabel)}</p>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">
        Cum va arăta produsul personalizat
      </p>
      <img
        src="${mockupDataUrl}"
        alt="${escapeHtml(item.name)}"
        style="max-width:100%;max-height:420px;object-fit:contain;margin:0 auto;display:block;"
        crossorigin="anonymous"
      />
      <p style="margin:14px 0 0;font-size:11px;color:#64748b;">Personalizare: ${escapeHtml(personalization)}</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;text-align:center;">
        <p style="margin:0 0 4px;font-size:10px;color:#94a3b8;text-transform:uppercase;">Cantitate</p>
        <p style="margin:0;font-size:20px;font-weight:800;">${item.quantity} buc.</p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;text-align:center;">
        <p style="margin:0 0 4px;font-size:10px;color:#94a3b8;text-transform:uppercase;">Preț unitar</p>
        <p style="margin:0;font-size:20px;font-weight:800;">${formatMoney(item.unitPrice)}</p>
      </div>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px;text-align:center;">
        <p style="margin:0 0 4px;font-size:10px;color:#2563eb;text-transform:uppercase;">Total linie</p>
        <p style="margin:0;font-size:20px;font-weight:800;color:#2563eb;">${formatMoney(item.totalPrice)}</p>
      </div>
    </div>

    <div style="margin-top:20px;padding:14px 16px;background:#f8fafc;border-radius:10px;font-size:12px;color:#475569;">
      <strong>Client:</strong> ${escapeHtml(input.clientName)} · ${escapeHtml(input.clientPhone)} · ${escapeHtml(input.clientEmail)}
    </div>
    ${footerBlock()}
  `);
}

async function capturePage(pdf: jsPDF, pageEl: HTMLElement, isFirst: boolean) {
  const canvas = await html2canvas(pageEl, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
    width: PAGE_WIDTH_PX,
    windowWidth: PAGE_WIDTH_PX,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height);
  const w = canvas.width * ratio;
  const h = canvas.height * ratio;

  if (!isFirst) pdf.addPage();
  pdf.addImage(imgData, "PNG", (pdfW - w) / 2, 0, w, h);
}

export async function generateOfferPdf(input: OfferPdfInput): Promise<void> {
  if (input.lineItems.length === 0) {
    throw new Error("Nu există produse pentru generarea ofertei PDF.");
  }

  const generatedAt = new Date();
  const mockups = await Promise.all(
    input.lineItems.map((item) =>
      renderProductMockupCanvas(
        item.name,
        item.category,
        input.customType,
        input.customText,
        input.imagePreview,
        item.finish,
      ),
    ),
  );

  const container = document.createElement("div");
  container.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
  document.body.appendChild(container);

  const pages: HTMLElement[] = [buildSummaryPage(input, generatedAt)];
  input.lineItems.forEach((item, index) => {
    pages.push(buildProductPage(input, item, mockups[index], index + 1, input.lineItems.length));
  });

  pages.forEach((page) => container.appendChild(page));

  try {
    await Promise.all(
      Array.from(container.querySelectorAll("img")).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
              return;
            }
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
      ),
    );

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    for (let i = 0; i < pages.length; i += 1) {
      await capturePage(pdf, pages[i], i === 0);
    }

    const slug = input.clientName.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "");
    pdf.save(`oferta-avozenevo-${slug || "client"}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
