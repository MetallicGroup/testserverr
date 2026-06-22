import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SiteLink from "@/components/SiteLink";
import bigProducts from "@/assets/big-products.jpg";
import collageSmall from "@/assets/collage-small.jpg";
import textilesShowcase from "@/assets/textiles-showcase.jpg";
import outdoorAdvertising from "@/assets/outdoor-advertising.jpg";
import premiumGifts from "@/assets/premium-gifts.jpg";

const galleryItems = [
  {
    image: bigProducts,
    title: "Evenimente & Expo",
    subtitle: "Corturi, standuri, roll-up-uri și bannere pentru prezența ta la târguri și evenimente.",
    span: "lg:col-span-2 lg:row-span-2",
    height: "h-[500px]",
  },
  {
    image: collageSmall,
    title: "Obiecte promoționale",
    subtitle: "Pixuri, brelocuri, badge-uri, USB-uri — mii de variante.",
    span: "lg:col-span-1",
    height: "h-[240px]",
  },
  {
    image: premiumGifts,
    title: "Seturi cadou premium",
    subtitle: "Cadouri corporate de top pentru clienții tăi VIP.",
    span: "lg:col-span-1",
    height: "h-[240px]",
  },
  {
    image: textilesShowcase,
    title: "Textile personalizate",
    subtitle: "Tricouri, hanorace, șepci, sacoșe — echipează-ți echipa.",
    span: "lg:col-span-1",
    height: "h-[400px]",
  },
  {
    image: outdoorAdvertising,
    title: "Publicitate outdoor",
    subtitle: "Panouri publicitare, mesh-uri, colantări auto, bannere de mari dimensiuni.",
    span: "lg:col-span-2",
    height: "h-[400px]",
  },
];

export default function ShowcaseGallery() {
  return (
    <section id="galerie" className="py-24 sm:py-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
            Portofoliu
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground">
            De la mic la <span className="text-primary">monumental</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Personalizăm orice — de la pixuri și brelocuri până la corturi de evenimente și panouri publicitare de mari dimensiuni.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${item.span}`}
            >
              <div className={`relative ${item.height} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <motion.div
                    className="transform transition-transform duration-500 group-hover:-translate-y-2"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/80 max-w-md leading-relaxed">{item.subtitle}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <SiteLink
            section="comanda"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
          >
            Solicită ofertă personalizată
            <ArrowRight className="w-5 h-5" />
          </SiteLink>
        </motion.div>
      </div>
    </section>
  );
}
