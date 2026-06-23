import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storageKeys, siteConfig } from "@/config/siteConfig";
import { getProductsFromStore, saveProductsToStore, type EditableProduct } from "@/lib/productStore";

interface SavedOrder {
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  products: Array<{ id: string; name: string; unitPrice: number; quantity?: number }>;
  quantity?: number;
  finish: string;
  customType: string;
  customText: string;
  imageFileName: string;
  message: string;
}

export default function AdminPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState<EditableProduct[]>(() => getProductsFromStore());

  const orders = useMemo(() => {
    const raw = localStorage.getItem(storageKeys.orders);
    return raw ? (JSON.parse(raw) as SavedOrder[]) : [];
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-md mx-auto px-4">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h1 className="text-2xl font-black text-foreground">Mini panou administrare</h1>
              <div>
                <Label htmlFor="admin-user">Utilizator</Label>
                <Input id="admin-user" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="admin-pass">Parola</Label>
                <Input id="admin-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button
                className="w-full"
                onClick={() => setAuthed(username === siteConfig.admin.username && password === siteConfig.admin.password)}
              >
                Login
              </Button>
              <p className="text-xs text-muted-foreground">
                Schimba credentialele implicite din `src/config/siteConfig.ts`.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const updateProduct = (id: string, field: keyof EditableProduct, value: string | boolean) => {
    const next = products.map((product) =>
      product.id === id
        ? {
            ...product,
            [field]: field === "basePrice" ? Number(value) : value,
          }
        : product,
    );
    setProducts(next);
    saveProductsToStore(next);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <h1 className="text-3xl font-black text-foreground">Panou administrare</h1>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Produse (editabile)</h2>
            <div className="grid gap-3">
              {products.map((product) => (
                <div key={product.id} className="grid md:grid-cols-4 gap-2 rounded-lg border border-border p-3">
                  <Input value={product.name} onChange={(e) => updateProduct(product.id, "name", e.target.value)} />
                  <Input value={product.category} onChange={(e) => updateProduct(product.id, "category", e.target.value)} />
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    value={product.basePrice}
                    onChange={(e) => updateProduct(product.id, "basePrice", e.target.value)}
                  />
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={product.active}
                      onChange={(e) => updateProduct(product.id, "active", e.target.checked)}
                    />
                    Activ
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Istoric comenzi</h2>
            <div className="space-y-3">
              {orders.length === 0 && <p className="text-sm text-muted-foreground">Nu exista comenzi salvate.</p>}
              {orders.map((order, idx) => (
                <div key={`${order.createdAt}-${idx}`} className="rounded-lg border border-border p-4 space-y-1 text-sm">
                  <p><span className="font-semibold">Data:</span> {new Date(order.createdAt).toLocaleString("ro-RO")}</p>
                  <p><span className="font-semibold">Client:</span> {order.name} ({order.phone}, {order.email})</p>
                  <p>
                    <span className="font-semibold">Produse:</span>{" "}
                    {order.products
                      .map((item) =>
                        item.quantity != null ? `${item.name} (${item.quantity} buc.)` : item.name,
                      )
                      .join(", ")}
                  </p>
                  {order.quantity != null && order.products.every((item) => item.quantity == null) && (
                    <p><span className="font-semibold">Cantitate:</span> {order.quantity}</p>
                  )}
                  <p><span className="font-semibold">Finisaj:</span> {order.finish}</p>
                  {order.imageFileName && <p><span className="font-semibold">Fisier:</span> {order.imageFileName}</p>}
                  {order.message && <p><span className="font-semibold">Mesaj:</span> {order.message}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
