import { ArrowRight, Sparkles } from "lucide-react";
import heroProducts from "@/assets/hero-products.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-energy-purple/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              Soluții B2B de personalizare
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Produse personalizate
              <br />
              <span className="bg-gradient-to-r from-primary via-energy-purple to-accent bg-clip-text text-transparent">
                pentru business-ul tău
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              De la 1 bucată la mii — rapid, simplu și eficient.
              Peste 100 de produse gata de personalizat cu textul sau logo-ul tău.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <a href="#comanda" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                Creează comanda
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#produse" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-secondary transition-colors">
                Vezi produsele
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {[
                { value: "100+", label: "Produse" },
                { value: "24h", label: "Livrare rapidă" },
                { value: "B2B", label: "Comenzi în volum" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">{s.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
              <img src={heroProducts} alt="Produse promoționale personalizate" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-lg border border-border px-5 py-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <p className="text-xs text-muted-foreground">Produse livrate</p>
              <p className="text-xl font-black text-foreground">50,000+</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl shadow-lg px-5 py-3 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <p className="text-sm font-bold">⭐ 4.9/5</p>
              <p className="text-xs opacity-90">Rating clienți</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
