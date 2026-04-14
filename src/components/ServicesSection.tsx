import { Type, Image, Package } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Type,
    title: "Personalizare cu text",
    description: "Adaugă numele companiei, sloganul sau orice mesaj pe produsele tale.",
    gradient: "from-primary to-energy-blue",
  },
  {
    icon: Image,
    title: "Personalizare cu logo",
    description: "Încarcă logo-ul sau imaginea dorită pentru un branding impecabil.",
    gradient: "from-accent to-energy-orange",
  },
  {
    icon: Package,
    title: "Comenzi B2B în volum",
    description: "De la 1 bucată la mii — prețuri avantajoase pentru comenzi mari.",
    gradient: "from-energy-purple to-primary",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicii" className="py-24 sm:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl -z-0" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Servicii
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground">Ce oferim</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Soluții complete de personalizare pentru orice tip de business.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient hover accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
