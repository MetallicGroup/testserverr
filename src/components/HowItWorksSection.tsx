import { MousePointerClick, Paintbrush, Hash, Zap, ArrowRight } from "lucide-react";

const steps = [
  { icon: MousePointerClick, title: "Alegi produsul", desc: "Selectează din peste 100 de produse disponibile.", color: "bg-primary text-primary-foreground" },
  { icon: Paintbrush, title: "Adaugi personalizarea", desc: "Text, logo sau imagine — tu decizi.", color: "bg-energy-purple text-white" },
  { icon: Hash, title: "Selectezi cantitatea", desc: "De la 1 bucată la mii, la prețuri avantajoase.", color: "bg-accent text-accent-foreground" },
  { icon: Zap, title: "Primești oferta instant", desc: "Prețul se calculează automat, fără așteptare.", color: "bg-energy-green text-white" },
];

export default function HowItWorksSection() {
  return (
    <section id="cum-functioneaza" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-energy-purple/5 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-energy-green/10 text-energy-green text-xs font-bold uppercase tracking-wider mb-4">
            Proces simplu
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Cum funcționează</h2>
          <p className="mt-3 text-muted-foreground">4 pași simpli până la comanda ta personalizată.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-8 left-[calc(100%+4px)] right-0 items-center -z-0 w-6">
                  <ArrowRight className="w-5 h-5 text-border" />
                </div>
              )}

              <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow relative">
                <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <s.icon className="w-7 h-7" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary text-foreground text-sm font-black flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#comanda" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
            Începe acum
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
