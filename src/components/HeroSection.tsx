import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-energy-purple/5 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          Soluții B2B de personalizare
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Produse personalizate
          <br />
          <span className="bg-gradient-to-r from-primary via-energy-purple to-accent bg-clip-text text-transparent">
            pentru business-ul tău
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          De la 1 bucată la mii — rapid, simplu și eficient.
          <br className="hidden sm:block" />
          Peste 100 de produse gata de personalizat.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <a href="#comanda" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
            Creează comanda
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#produse" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-secondary transition-colors">
            Vezi produsele
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "100+", label: "Produse" },
            { value: "24h", label: "Livrare rapidă" },
            { value: "B2B", label: "Comenzi în volum" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-foreground">{s.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
