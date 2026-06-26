import type { Finish } from "@/lib/finishOptions";
import { getRecaptchaMockupToken } from "@/lib/recaptchaV3";

export interface GenerateAiMockupInput {
  productName: string;
  productCategory: string;
  mockupKey: string;
  finish: Finish;
}

export interface GenerateAiMockupResult {
  imageDataUrl: string;
  prompt: string;
}

async function parseApiResponse(response: Response): Promise<{ error?: string; imageDataUrl?: string; prompt?: string }> {
  const text = await response.text();
  if (!text) {
    throw new Error("Serverul AI nu a răspuns. Încearcă din nou.");
  }
  try {
    return JSON.parse(text) as { error?: string; imageDataUrl?: string; prompt?: string };
  } catch {
    throw new Error(
      response.ok
        ? "Răspuns invalid de la serverul AI."
        : "Serviciul AI nu este disponibil momentan. Încearcă din nou.",
    );
  }
}

export async function generateAiMockup(
  input: GenerateAiMockupInput,
): Promise<GenerateAiMockupResult> {
  let recaptchaToken: string | null = null;
  try {
    recaptchaToken = await getRecaptchaMockupToken();
  } catch {
    // Continuă fără token — serverul decide dacă e obligatoriu
  }

  const response = await fetch("/api/generate-mockup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      recaptchaToken: recaptchaToken ?? undefined,
    }),
  });

  const payload = await parseApiResponse(response);

  if (!response.ok) {
    throw new Error(payload.error || "Generarea AI a eșuat.");
  }

  if (!payload.imageDataUrl) {
    throw new Error("Răspuns invalid de la serverul AI.");
  }

  return {
    imageDataUrl: payload.imageDataUrl,
    prompt: payload.prompt ?? "",
  };
}
