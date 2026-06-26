import { siteConfig } from "@/config/siteConfig";

export const RECAPTCHA_MOCKUP_ACTION = "generate_mockup";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let recaptchaScriptPromise: Promise<void> | null = null;

function isValidRecaptchaSiteKey(siteKey: string): boolean {
  return /^6L[\w-]{20,}$/.test(siteKey.trim());
}

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (window.grecaptcha) return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-recaptcha-v3="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA script failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptchaV3 = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA script failed"));
    document.body.appendChild(script);
  });

  return recaptchaScriptPromise;
}

export async function getRecaptchaMockupToken(): Promise<string | null> {
  const siteKey = siteConfig.recaptchaSiteKey?.trim();
  if (!siteKey || !isValidRecaptchaSiteKey(siteKey)) return null;

  try {
    await loadRecaptchaScript(siteKey);

    if (!window.grecaptcha) return null;

    return await new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(() => {
        window.grecaptcha!
          .execute(siteKey, { action: RECAPTCHA_MOCKUP_ACTION })
          .then(resolve)
          .catch(reject);
      });
    });
  } catch {
    return null;
  }
}
