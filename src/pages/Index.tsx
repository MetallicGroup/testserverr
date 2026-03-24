import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProductSlider from "@/components/ProductSlider";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import HowItWorksSection from "@/components/HowItWorksSection";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [preselectedProduct, setPreselectedProduct] = useState<string>("");
  const orderRef = useRef<HTMLDivElement>(null);

  const handleOrderProduct = (productId: string) => {
    setPreselectedProduct(productId);
    setTimeout(() => {
      orderRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProductSlider />
      <ShowcaseGallery />
      <HowItWorksSection />

      {/* Order Form Section */}
      <section id="comanda" ref={orderRef} className="py-24 sm:py-32 bg-secondary/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Calculator
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground">Calculator comandă</h2>
            <p className="mt-4 text-lg text-muted-foreground">Completează formularul și primește oferta instant.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OrderForm key={preselectedProduct} preselectedProductId={preselectedProduct} />
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
