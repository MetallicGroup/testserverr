import { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import products, { productCategories } from "@/data/products";
import productsShowcase from "@/assets/products-showcase.png";

interface ProductsSectionProps {
  onOrderProduct: (productId: string) => void;
}

const categoryEmojis: Record<string, string> = {
  "Birou": "🖊️",
  "Textile": "👕",
  "Genți": "👜",
  "Băuturi": "☕",
  "Tehnologie": "💻",
  "Accesorii": "🔑",
  "Outdoor": "🌧️",
  "Auto": "🚗",
  "Sănătate": "🏥",
  "Casă": "🏠",
  "Marketing": "📢",
  "Diverse": "🎲",
};

export default function ProductsSection({ onOrderProduct }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [activeCategory, search]);

  const displayed = showAll ? filtered : filtered.slice(0, 24);

  return (
    <section id="produse" className="py-20 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Produsele noastre</h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Peste 100 de produse personalizabile. Alege categoria, găsește produsul ideal și comandă instant cu un singur click.
            </p>
          </div>
          <div className="hidden lg:block">
            <img src={productsShowcase} alt="Colecție produse promoționale" className="w-full max-w-md ml-auto rounded-2xl shadow-lg border border-border" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Caută produs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => { setActiveCategory(""); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                !activeCategory ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
              }`}
            >
              🌟 Toate ({products.length})
            </button>
            {productCategories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {categoryEmojis[cat] || "📦"} {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayed.map((p) => (
            <button
              key={p.id}
              onClick={() => onOrderProduct(p.id)}
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 text-center hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                <span className="text-lg">{categoryEmojis[p.category] || "📦"}</span>
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                {p.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1">de la {p.basePrice.toFixed(2)} RON</span>
              <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground rounded-full p-1">
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">Niciun produs găsit.</p>
        )}

        {!showAll && filtered.length > 24 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-xl border-2 border-border text-sm font-bold text-foreground hover:bg-secondary hover:border-primary/20 transition-all"
            >
              Vezi toate produsele ({filtered.length}) →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
