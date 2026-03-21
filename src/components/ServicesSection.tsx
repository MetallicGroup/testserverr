import { Type, Image, Package, Truck } from "lucide-react";

const services = [
  {
    icon: Type,
    title: "Personalizare cu text",
    description: "Adaugă numele companiei, sloganul sau orice mesaj pe produsele tale.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Image,
    title: "Personalizare cu logo",
    description: "Încarcă logo-ul sau imaginea dorită pentru un branding impecabil.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Package,
    title: "Comenzi B2B în volum",
    description: "De la 1 bucată la mii — prețuri avantajoase pentru comenzi mari.",
    color: "bg-energy-purple/10 text-energy-purple",
  },
  {
    icon: Truck,
    title: "Livrare rapidă",
    description: "Procesăm și livrăm comenzile în cel mai scurt timp posibil.",
    color: "bg-energy-green/10 text-energy-green",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicii" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Ce oferim</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Soluții complete de personalizare pentru orice tip de business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
