import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import gridMugs from "@/assets/grid-mugs.jpg";
import gridTextiles from "@/assets/grid-textiles.jpg";
import gridBottles from "@/assets/grid-bottles.jpg";
import gridBags from "@/assets/grid-bags.jpg";
import gridNotebooks from "@/assets/grid-notebooks.jpg";
import gridCaps from "@/assets/grid-caps.jpg";
import gridTech from "@/assets/grid-tech.jpg";
import gridEvents from "@/assets/grid-events.jpg";

const items = [
  { src: gridMugs, label: "Căni personalizate" },
  { src: gridTextiles, label: "Textile & Polo" },
  { src: gridBottles, label: "Termosuri & Sticle" },
  { src: gridBags, label: "Sacoșe & Genți" },
  { src: gridNotebooks, label: "Agende & Notesuri" },
  { src: gridCaps, label: "Șepci & Accesorii" },
  { src: gridTech, label: "Gadgeturi Tech" },
  { src: gridEvents, label: "Corturi & Evenimente" },
];

// Duplicate for seamless infinite loop
const loopItems = [...items, ...items];

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    let pos = 0;
    const speed = 0.4; // px per frame

    const step = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      pos += speed;
      if (pos >= half) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => cancelAnimationFrame(raf);
    const resume = () => { raf = requestAnimationFrame(step); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-20 sm:py-28 overflow-hidden bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Portofoliu
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground">
            Ce personalizăm
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
            De la obiecte promoționale mici la echipamente pentru evenimente — totul la comanda ta.
          </p>
        </motion.div>
      </div>

      {/* Infinite horizontal slider */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-hidden cursor-grab select-none"
        style={{ scrollbarWidth: "none" }}
      >
        {loopItems.map((item, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-72 sm:w-80 aspect-square rounded-2xl overflow-hidden group"
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width={800}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-primary-foreground font-bold text-lg">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
