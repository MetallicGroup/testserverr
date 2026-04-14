import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie, Shield } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Politica de cookie-uri & GDPR
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Acest website utilizează cookie-uri pentru a îmbunătăți experiența de navigare. 
                  Datele tale personale sunt protejate conform Regulamentului General privind Protecția Datelor (GDPR). 
                  Prin continuarea navigării, ești de acord cu{" "}
                  <a href="/politica-confidentialitate" className="text-primary hover:underline font-medium">
                    Politica de confidențialitate
                  </a>{" "}
                  și{" "}
                  <a href="/termeni-si-conditii" className="text-primary hover:underline font-medium">
                    Termenii și condițiile
                  </a>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={accept} className="gap-2">
                    Accept toate cookie-urile
                  </Button>
                  <Button onClick={decline} variant="outline">
                    Doar cookie-uri esențiale
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
