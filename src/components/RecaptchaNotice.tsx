export default function RecaptchaNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[10px] text-muted-foreground leading-snug ${className}`}>
      Protejat de reCAPTCHA — se aplică{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground"
      >
        Politica de confidențialitate
      </a>{" "}
      și{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground"
      >
        Termenii
      </a>{" "}
      Google.
    </p>
  );
}
