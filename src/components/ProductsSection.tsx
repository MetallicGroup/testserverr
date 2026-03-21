import { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import products, { productCategories } from "@/data/products";

interface ProductsSectionProps {
  onOrderProduct: (productId: string) => void;
}

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
    <section id="produse" className="py-20 sm:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Produsele noastre</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Peste 100 de produse personalizabile. Alege și comandă instant.
          </p>
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
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                !activeCategory ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              Toate ({products.length})
            </button>
            {productCategories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {cat} ({count})
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
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 text-center"
            >
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                {p.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1">de la {p.basePrice.toFixed(2)} RON</span>
              <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
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
              className="px-6 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              Vezi toate produsele ({filtered.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
