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
  const siteKey = siteConfig.recaptchaSiteKey;
  if (!siteKey) return null;

  await loadRecaptchaScript(siteKey);

  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA nu este disponibil."));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha!
        .execute(siteKey, { action: RECAPTCHA_MOCKUP_ACTION })
        .then(resolve)
        .catch(() => reject(new Error("Nu s-a putut obține tokenul reCAPTCHA.")));
    });
  });
}
