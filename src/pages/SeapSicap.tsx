import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/siteConfig";
import { Building2, FileSearch, Mail, Phone, ShoppingCart, ArrowRight } from "lucide-react";

const identificationFields = [
  { label: "Denumire participant", value: siteConfig.company.legalName },
  { label: "Oraș / Județ", value: `${siteConfig.company.city} / ${siteConfig.company.county}` },
  { label: "Cod Unic de Înregistrare", value: siteConfig.company.cui },
  { label: "Nr. Registrul Comerțului", value: siteConfig.company.tradeRegister },
  { label: "Cod EORI", value: siteConfig.company.eori },
  { label: "Tip", value: siteConfig.company.eLicitationRole },
  {
    label: "Sediu social",
    value: `${siteConfig.company.addressLine}, ${siteConfig.company.city}, județ ${siteConfig.company.county}, cod poștal ${siteConfig.company.postalCode}`,
  },
];

const procedureSteps = [
  {
    step: 1,
    title: "Identificați produsele dorite",
    description: `Căutați în magazinul nostru online ${siteConfig.websiteUrl} produsele promoționale pe care doriți să le achiziționați: tricouri, bluze, hanorace, cești, pixuri, agende, bannere, corturi și alte materiale personalizate.`,
  },
  {
    step: 2,
    title: "Trimiteți intenția de achiziție prin e-mail",
    description: `După ce ați stabilit produsele și cantitățile, trimiteți un e-mail la ${siteConfig.company.tendersEmail} în care să specificați că doriți achiziționarea prin platforma SEAP / SICAP, cu lista produselor și detaliile de personalizare.`,
  },
  {
    step: 3,
    title: "Achiziția prin SEAP / SICAP",
    description:
      "Un reprezentant Avozenevo vă va contacta telefonic sau prin e-mail. Comanda va fi publicată sub formă de pachet pe www.e-licitatie.ro, iar dumneavoastră veți primi codul CPV și numărul de referință pentru achiziția directă. Factura se emite după finalizarea procedurii pe platformă.",
  },
];

export default function SeapSicap() {
  const { company } = siteConfig;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Achiziții publice
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Suntem prezenți în SEAP / SICAP
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.brandName} — {company.description}
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <Building2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Cum ne puteți găsi în SEAP / SICAP?
                </h2>
                <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                  Suntem prezenți cu produsele din portofoliul nostru pe site-ul de achiziții publice{" "}
                  <a
                    href={company.eLicitationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    www.e-licitatie.ro
                  </a>{" "}
                  (SEAP / SICAP). Ne găsiți la secțiunea operatori economici cu următoarele date de identificare:
                </p>
              </div>
            </div>

            <dl className="grid sm:grid-cols-2 gap-4">
              {identificationFields.map((field) => (
                <div
                  key={field.label}
                  className="rounded-xl bg-secondary/40 border border-border/60 px-4 py-3 sm:col-span-2 last:sm:col-span-2"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {field.label}
                  </dt>
                  <dd className="mt-1 text-sm sm:text-base font-medium text-foreground">{field.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm text-muted-foreground border-t border-border pt-6">
              Autoritățile contractante pot iniția cumpărări directe prin sistemul de achiziții publice. Dacă, în urma
              consultării site-ului nostru, doriți să achiziționați și alte produse care nu figurează pe platformă, vă
              rugăm să ne contactați — vă putem ajuta cu oferte personalizate pentru instituții publice.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
            Date de contact pentru licitații
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={`mailto:${company.tendersEmail}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">E-mail licitații</p>
                <p className="font-semibold text-foreground">{company.tendersEmail}</p>
              </div>
            </a>
            <a
              href={`tel:+${siteConfig.phoneDigits}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Telefon</p>
                <p className="font-semibold text-foreground">{siteConfig.phoneDisplay}</p>
              </div>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors sm:col-span-2"
            >
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">E-mail general</p>
                <p className="font-semibold text-foreground">{siteConfig.email}</p>
              </div>
            </a>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-8">
            <FileSearch className="w-6 h-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Procedura de achiziție prin SEAP / SICAP
            </h2>
          </div>

          <ol className="space-y-6">
            {procedureSteps.map((item) => (
              <li
                key={item.step}
                className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 pl-14 sm:pl-16"
              >
                <span className="absolute left-5 sm:left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  {item.step === 1 && <ShoppingCart className="w-5 h-5 text-primary" />}
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm sm:text-base leading-relaxed">{item.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <a
              href={siteConfig.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Vizitează magazinul {siteConfig.brandName}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
