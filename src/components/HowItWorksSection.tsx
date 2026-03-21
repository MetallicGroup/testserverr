import { MousePointerClick, Paintbrush, Hash, Zap } from "lucide-react";

const steps = [
  { icon: MousePointerClick, title: "Alegi produsul", desc: "Selectează din peste 100 de produse disponibile." },
  { icon: Paintbrush, title: "Adaugi personalizarea", desc: "Text, logo sau imagine — tu decizi." },
  { icon: Hash, title: "Selectezi cantitatea", desc: "De la 1 bucată la mii, la prețuri avantajoase." },
  { icon: Zap, title: "Primești oferta instant", desc: "Prețul se calculează automat, fără așteptare." },
];

export default function HowItWorksSection() {
  return (
    <section id="cum-functioneaza" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Cum funcționează</h2>
          <p className="mt-3 text-muted-foreground">4 pași simpli până la comanda ta personalizată.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="absolute -top-2 -left-1 sm:left-auto sm:-top-2 sm:-right-1 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
