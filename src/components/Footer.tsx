import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border bg-foreground/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="text-2xl font-black text-primary mb-3">avozenevo</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Produse personalizate pentru business-ul tău. Calitate, rapiditate și flexibilitate la cele mai bune prețuri.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Navigare</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#servicii" className="hover:text-foreground transition-colors">Servicii</a></li>
              <li><a href="#produse" className="hover:text-foreground transition-colors">Produse</a></li>
              <li><a href="#cum-functioneaza" className="hover:text-foreground transition-colors">Cum funcționează</a></li>
              <li><a href="#comanda" className="hover:text-foreground transition-colors">Comandă</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> contact@avozenevo.ro</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +40 712 345 678</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> București, România</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} avozenevo. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
