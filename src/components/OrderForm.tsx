import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SiteLink from "@/components/SiteLink";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, User, Send } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { siteConfig, storageKeys } from "@/config/siteConfig";
import { getProductsFromStore } from "@/lib/productStore";

interface OrderFormProps {
  preselectedProductId?: string;
}

function buildOrderMessage(
  name: string,
  email: string,
  phone: string,
  message: string,
  productNote: string,
) {
  return [
    "Solicitare nouă de pe avozenevo.ro",
    "",
    `Nume: ${name}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    productNote ? `Produs de interes: ${productNote}` : "",
    message ? `Mesaj: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendOrderEmail(
  name: string,
  email: string,
  phone: string,
  message: string,
  productNote: string,
) {
  const body = buildOrderMessage(name, email, phone, message, productNote);

  await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.email)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      message: body,
      _subject: `Solicitare ofertă — ${name}`,
      _template: "table",
      _captcha: "false",
    }),
  });
}

export default function OrderForm({ preselectedProductId }: OrderFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const productNote = preselectedProductId
    ? getProductsFromStore().find((p) => p.id === preselectedProductId)?.name || preselectedProductId
    : "";

  const isValid =
    name.trim() &&
    email.trim() &&
    phone.trim() &&
    acceptedTerms &&
    honeypot.trim() === "" &&
    (siteConfig.turnstileSiteKey ? turnstileToken : true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) {
      toast.error("Completează toate câmpurile obligatorii.");
      return;
    }

    setSubmitting(true);

    const orderPayload = {
      createdAt: new Date().toISOString(),
      name,
      email,
      phone,
      message,
      productNote,
    };

    const previousOrders = JSON.parse(localStorage.getItem(storageKeys.orders) || "[]");
    localStorage.setItem(storageKeys.orders, JSON.stringify([orderPayload, ...previousOrders].slice(0, 200)));

    const whatsappMessage = buildOrderMessage(name, email, phone, message, productNote);
    const waUrl = `https://wa.me/${siteConfig.whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      await sendOrderEmail(name, email, phone, message, productNote);
    } catch {
      toast.error("Emailul nu a putut fi trimis, dar WhatsApp-ul se deschide.");
    }

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setSubmitting(false);
    toast.success("Solicitarea a fost trimisă!");
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-energy-green/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-energy-green" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Mulțumim!</h2>
        <p className="text-muted-foreground">
          Te vom contacta în cel mai scurt timp la numărul sau adresa de email furnizate.
        </p>
        <Button onClick={() => setSubmitted(false)} className="w-full">
          Trimite o nouă solicitare
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {productNote && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground">
            Ai selectat: <span className="font-semibold text-foreground">{productNote}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Nu e obligatoriu — vom discuta detaliile când te contactăm.
          </p>
        </Card>
      )}

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <User className="w-5 h-5 text-primary" />
          <span>Date de contact</span>
        </div>

        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Nume complet *</Label>
            <Input
              id="name"
              placeholder="Ion Popescu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="ion@firma.ro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0784 998 866"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Mesaj (opțional)</Label>
            <Textarea
              id="message"
              placeholder="Spune-ne pe scurt ce ai nevoie — tip produs, cantitate, termen limită..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>
          <div className="hidden">
            <Label htmlFor="website-field">Nu completa acest câmp</Label>
            <Input
              id="website-field"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>
          {siteConfig.turnstileSiteKey ? (
            <div>
              <Label>Protecție anti-spam</Label>
              <TurnstileWidget siteKey={siteConfig.turnstileSiteKey} onTokenChange={setTurnstileToken} />
            </div>
          ) : null}
        </div>
      </section>

      <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
          className="mt-0.5"
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          Am citit și sunt de acord cu{" "}
          <SiteLink to="/termeni-si-conditii" className="text-primary hover:underline font-medium">
            Termenii și condițiile
          </SiteLink>{" "}
          și{" "}
          <SiteLink to="/politica-confidentialitate" className="text-primary hover:underline font-medium">
            Politica de confidențialitate
          </SiteLink>
          . Sunt de acord cu prelucrarea datelor personale conform GDPR.
        </label>
      </div>

      <Button type="submit" size="lg" disabled={!isValid || submitting} className="w-full gap-2">
        <Send className="w-4 h-4" />
        {submitting ? "Se trimite..." : "Trimite solicitarea"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Solicitarea ajunge pe WhatsApp ({siteConfig.whatsappDisplay}) și pe email ({siteConfig.email}).
      </p>
    </form>
  );
}
