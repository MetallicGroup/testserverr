import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/avozenevo-logo.png";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-3 gap-10 mb-12"
        >
          <div>
            <img src={logo} alt="Avozenevo" className="h-10 w-auto mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Produse personalizate pentru business-ul tău. Calitate, rapiditate și flexibilitate.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Navigare</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#servicii" className="hover:text-foreground transition-colors">Servicii</a></li>
              <li><a href="#galerie" className="hover:text-foreground transition-colors">Galerie</a></li>
              <li><a href="#cum-functioneaza" className="hover:text-foreground transition-colors">Cum funcționează</a></li>
              <li><a href="#comanda" className="hover:text-foreground transition-colors">Comandă</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> contact@avozenevo.ro</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +40 764 652 773</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> București, România</li>
            </ul>
          </div>
        </motion.div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} avozenevo. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
