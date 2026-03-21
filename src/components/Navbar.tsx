import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Servicii", href: "#servicii" },
  { label: "Produse", href: "#produse" },
  { label: "Cum funcționează", href: "#cum-functioneaza" },
  { label: "Comandă", href: "#comanda" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-2xl font-black tracking-tight text-primary">
            avozenevo
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#comanda" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Creează comanda
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#comanda" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground text-center">
              Creează comanda
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
