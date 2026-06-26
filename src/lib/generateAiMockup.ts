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

export async function generateAiMockup(
  input: GenerateAiMockupInput,
): Promise<GenerateAiMockupResult> {
  const recaptchaToken = await getRecaptchaMockupToken();

  const response = await fetch("/api/generate-mockup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      recaptchaToken: recaptchaToken ?? undefined,
    }),
  });

  const payload = (await response.json()) as GenerateAiMockupResult & { error?: string };

  if (!response.ok) {
    throw new Error(payload.error || "Generarea AI a eșuat.");
  }

  if (!payload.imageDataUrl) {
    throw new Error("Răspuns invalid de la serverul AI.");
  }

  return {
    imageDataUrl: payload.imageDataUrl,
    prompt: payload.prompt,
  };
}
