import { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import heroCinematic from "@/assets/hero-cinematic.jpg";

const slides = [heroCinematic, heroSlide1, heroSlide2, heroSlide3, heroSlide4];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative isolate min-h-screen flex items-center overflow-hidden">
      {/* Slideshow background with crossfade */}
      <div className="absolute inset-0 z-0">
        {slides.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt="Produse promoționale personalizate"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              opacity: i === current ? 1 : 0,
              scale: i === current ? 1 : 1.08,
            }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" },
            }}
            width={1920}
            height={1080}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-background/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Soluții B2B de personalizare
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05]"
          >
            Produse
            <br />
            personalizate
            <br />
            <span className="bg-gradient-to-r from-primary via-energy-purple to-accent bg-clip-text text-transparent">
              pentru business
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
          >
            De la 1 bucată la mii — rapid, simplu și eficient.
            Personalizăm orice, de la pixuri la corturi pentru evenimente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#comanda"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Creează comanda
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#galerie"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-border text-foreground font-semibold hover:bg-secondary transition-all duration-300"
            >
              Descoperă produsele
            </a>
          </motion.div>

          {/* Slide indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex gap-2"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? "w-10 bg-primary" : "w-4 bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex gap-12"
          >
            {[
              { value: "100+", label: "Tipuri de produse" },
              { value: "24h", label: "Livrare express" },
              { value: "50K+", label: "Produse livrate" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-black text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
