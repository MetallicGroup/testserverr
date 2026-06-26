const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const DEFAULT_MIN_SCORE = 0.5;

interface RecaptchaVerifyResponse {
  success?: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export async function verifyRecaptchaV3(
  token: string,
  expectedAction: string,
  remoteIp?: string,
): Promise<{ ok: true; score: number } | { ok: false; error: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true, score: 1 };
  }

  if (!token) {
    return { ok: false, error: "Verificarea reCAPTCHA lipsește." };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? DEFAULT_MIN_SCORE);
  const params = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) params.set("remoteip", remoteIp);

  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const payload = (await res.json()) as RecaptchaVerifyResponse;

    if (!payload.success) {
      return { ok: false, error: "reCAPTCHA nu a putut fi verificat." };
    }

    if (payload.action && payload.action !== expectedAction) {
      return { ok: false, error: "Acțiune reCAPTCHA invalidă." };
    }

    const score = payload.score ?? 0;
    if (score < minScore) {
      return { ok: false, error: "Activitate suspectă detectată. Încearcă din nou." };
    }

    return { ok: true, score };
  } catch {
    return { ok: false, error: "Serviciul reCAPTCHA nu este disponibil." };
  }
}
