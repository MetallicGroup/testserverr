import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [preselectedProduct, setPreselectedProduct] = useState<string>("");
  const orderRef = useRef<HTMLDivElement>(null);

  const handleOrderProduct = (productId: string) => {
    setPreselectedProduct(productId);
    // Small delay to ensure state updates before scrolling
    setTimeout(() => {
      orderRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProductsSection onOrderProduct={handleOrderProduct} />
      <HowItWorksSection />

      {/* Order Form Section */}
      <section id="comanda" ref={orderRef} className="py-20 sm:py-28 bg-secondary/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Calculator comandă</h2>
            <p className="mt-3 text-muted-foreground">Completează formularul și primește oferta instant.</p>
          </div>
          <OrderForm key={preselectedProduct} preselectedProductId={preselectedProduct} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
