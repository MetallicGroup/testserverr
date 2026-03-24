import { MousePointerClick, Paintbrush, Hash, Zap } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: MousePointerClick, title: "Alegi produsul", desc: "Selectează din peste 100 de produse disponibile.", color: "from-primary to-energy-blue" },
  { icon: Paintbrush, title: "Adaugi personalizarea", desc: "Text, logo sau imagine — tu decizi.", color: "from-energy-purple to-accent" },
  { icon: Hash, title: "Selectezi cantitatea", desc: "De la 1 bucată la mii, la prețuri avantajoase.", color: "from-accent to-energy-orange" },
  { icon: Zap, title: "Primești oferta instant", desc: "Prețul se calculează automat, fără așteptare.", color: "from-energy-green to-primary" },
];

export default function HowItWorksSection() {
  return (
    <section id="cum-functioneaza" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-energy-green/10 text-energy-green text-xs font-bold uppercase tracking-widest mb-4">
            Proces simplu
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground">Cum funcționează</h2>
          <p className="mt-4 text-lg text-muted-foreground">4 pași simpli până la comanda ta personalizată.</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative z-10 text-center"
              >
                <div className="bg-background p-2 inline-block rounded-full mb-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-xl`}>
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="absolute -top-2 right-1/2 translate-x-1/2 lg:right-4 lg:translate-x-0 lg:-top-2 w-8 h-8 rounded-full bg-secondary text-foreground text-sm font-black flex items-center justify-center border-2 border-background">
                  {i + 1}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#comanda"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
          >
            Începe acum →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
