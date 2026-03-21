import { useState, useMemo, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Upload, X, CheckCircle2, Package, Paintbrush, User, Send, Search } from "lucide-react";
import products, { productCategories } from "@/data/products";

type Finish = "low" | "medium" | "high";

const FINISH_MULTIPLIERS: Record<Finish, number> = {
  low: 1,
  medium: 1.6,
  high: 2.5,
};

const FINISH_LABELS: Record<Finish, { label: string; description: string }> = {
  low: { label: "Low Cost", description: "Imprimare simplă, materiale standard" },
  medium: { label: "Medium", description: "Calitate medie, finisaje îmbunătățite" },
  high: { label: "High-Ticket", description: "Premium, materiale de top" },
};

interface OrderFormProps {
  preselectedProductId?: string;
}

export default function OrderForm({ preselectedProductId }: OrderFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [customType, setCustomType] = useState<"text" | "image">("text");
  const [customText, setCustomText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [finish, setFinish] = useState<Finish>("low");
  const [quantity, setQuantity] = useState<number>(100);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (preselectedProductId) {
      setSelectedProduct(preselectedProductId);
      const p = products.find((pr) => pr.id === preselectedProductId);
      if (p) setSelectedCategory(p.category);
    }
  }, [preselectedProductId]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    if (searchTerm) list = list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return list;
  }, [selectedCategory, searchTerm]);

  const product = useMemo(() => products.find((p) => p.id === selectedProduct), [selectedProduct]);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    return +(product.basePrice * FINISH_MULTIPLIERS[finish]).toFixed(2);
  }, [product, finish]);

  const totalPrice = useMemo(() => +(unitPrice * quantity).toFixed(2), [unitPrice, quantity]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const removeImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
  }, []);

  const isValid =
    selectedProduct &&
    (customType === "text" ? customText.trim() : imageFile) &&
    quantity > 0 &&
    name.trim() &&
    email.trim() &&
    phone.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Completează toate câmpurile obligatorii.");
      return;
    }
    setSubmitted(true);
    toast.success("Comanda a fost trimisă cu succes!");
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-energy-green/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-energy-green" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Comandă trimisă!</h2>
        <div className="text-left space-y-3 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Produs:</span> {product?.name}</p>
          <p><span className="font-semibold text-foreground">Personalizare:</span> {customType === "text" ? customText : imageFile?.name}</p>
          <p><span className="font-semibold text-foreground">Finisaj:</span> {FINISH_LABELS[finish].label}</p>
          <p><span className="font-semibold text-foreground">Cantitate:</span> {quantity} buc.</p>
          <p><span className="font-semibold text-foreground">Preț unitar:</span> {unitPrice} RON</p>
          <Separator />
          <p className="text-lg font-bold text-foreground">Total: {totalPrice} RON</p>
          <Separator />
          <p><span className="font-semibold text-foreground">Nume:</span> {name}</p>
          <p><span className="font-semibold text-foreground">Email:</span> {email}</p>
          <p><span className="font-semibold text-foreground">Telefon:</span> {phone}</p>
        </div>
        <Button onClick={() => setSubmitted(false)} className="w-full">Plasează o nouă comandă</Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Product Selection */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <Package className="w-5 h-5 text-primary" />
          <span>1. Alege produsul</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !selectedCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Toate
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setSelectedCategory(cat); setSelectedProduct(""); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Caută produs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto rounded-lg border border-border p-2">
          {filteredProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedProduct(p.id)}
              className={`text-left px-3 py-2 rounded-md text-sm transition-all ${
                selectedProduct === p.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-card-foreground hover:bg-secondary"
              }`}
            >
              {p.name}
            </button>
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground text-sm py-4">Niciun produs găsit.</p>
          )}
        </div>
      </section>

      <Separator />

      {/* 2. Customization */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <Paintbrush className="w-5 h-5 text-primary" />
          <span>2. Personalizare</span>
        </div>

        <RadioGroup value={customType} onValueChange={(v) => setCustomType(v as "text" | "image")} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="text" id="ct-text" />
            <Label htmlFor="ct-text">Text</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="image" id="ct-image" />
            <Label htmlFor="ct-image">Imagine</Label>
          </div>
        </RadioGroup>

        {customType === "text" ? (
          <Input
            placeholder="Introdu textul dorit pe produs..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            maxLength={200}
          />
        ) : (
          <div>
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-border" />
                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer bg-card">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click pentru a încărca imaginea</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
        )}
      </section>

      <Separator />

      {/* 3. Finish & Quantity */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <Package className="w-5 h-5 text-primary" />
          <span>3. Finisaj și cantitate</span>
        </div>

        <RadioGroup value={finish} onValueChange={(v) => setFinish(v as Finish)} className="grid gap-3">
          {(Object.keys(FINISH_LABELS) as Finish[]).map((key) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                finish === key ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <RadioGroupItem value={key} id={`finish-${key}`} />
              <div className="flex-1">
                <p className="font-medium text-foreground">{FINISH_LABELS[key].label}</p>
                <p className="text-xs text-muted-foreground">{FINISH_LABELS[key].description}</p>
              </div>
              {product && (
                <span className="text-sm font-semibold text-foreground">
                  {(product.basePrice * FINISH_MULTIPLIERS[key]).toFixed(2)} RON/buc
                </span>
              )}
            </label>
          ))}
        </RadioGroup>

        <div>
          <Label htmlFor="quantity">Cantitate</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1 max-w-[180px]"
          />
        </div>

        {product && (
          <Card className="p-4 bg-secondary/50 border-border">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{quantity} × {unitPrice} RON</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-semibold text-foreground text-lg">Total</span>
              <span className="font-bold text-primary text-lg">{totalPrice} RON</span>
            </div>
          </Card>
        )}
      </section>

      <Separator />

      {/* 4. Contact */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <User className="w-5 h-5 text-primary" />
          <span>4. Date de contact</span>
        </div>

        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Nume complet</Label>
            <Input id="name" placeholder="Ion Popescu" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="ion@firma.ro" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" type="tel" placeholder="+40 712 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
          </div>
        </div>
      </section>

      <Button type="submit" size="lg" disabled={!isValid} className="w-full gap-2">
        <Send className="w-4 h-4" />
        Trimite comanda
      </Button>
    </form>
  );
}
