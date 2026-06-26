import { useState, useMemo, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SiteLink from "@/components/SiteLink";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload, X, CheckCircle2, Package, Paintbrush, User, Send, Search, Download,
  Heart, HardHat, UtensilsCrossed, Monitor, GraduationCap, Car,
  ShoppingBag, CalendarDays, Dumbbell, Sparkles, Scale, Wheat, Building2, Loader2,
} from "lucide-react";
import businessDomains from "@/data/businessDomains";
import ProductMockup from "@/components/ProductMockup";
import ProductFinishPicker from "@/components/ProductFinishPicker";
import TurnstileWidget from "@/components/TurnstileWidget";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import { siteConfig, storageKeys } from "@/config/siteConfig";
import { getProductsFromStore } from "@/lib/productStore";
import { generateOfferPdf } from "@/lib/generateOfferPdf";
import { generateAiMockup } from "@/lib/generateAiMockup";
import { getMockupForProduct } from "@/data/mockupImages";
import { FINISH_LABELS, FINISH_MULTIPLIERS, DEFAULT_PRODUCT_QUANTITY, DEFAULT_FINISH, type Finish } from "@/lib/finishOptions";

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  medical: <Heart className="w-5 h-5" />,
  constructii: <HardHat className="w-5 h-5" />,
  horeca: <UtensilsCrossed className="w-5 h-5" />,
  it: <Monitor className="w-5 h-5" />,
  educatie: <GraduationCap className="w-5 h-5" />,
  auto: <Car className="w-5 h-5" />,
  retail: <ShoppingBag className="w-5 h-5" />,
  evenimente: <CalendarDays className="w-5 h-5" />,
  fitness: <Dumbbell className="w-5 h-5" />,
  beauty: <Sparkles className="w-5 h-5" />,
  juridic: <Scale className="w-5 h-5" />,
  agricultura: <Wheat className="w-5 h-5" />,
};

interface OrderFormProps {
  preselectedProductId?: string;
}

async function sendOrderEmail(subject: string, body: string, name: string, email: string, phone: string) {
  await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.email)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      message: body,
      _subject: subject,
      _template: "table",
      _captcha: "false",
    }),
  });
}

export default function OrderForm({ preselectedProductId }: OrderFormProps) {
  const [products, setProducts] = useState(() => getProductsFromStore().filter((p) => p.active));
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [previewProductId, setPreviewProductId] = useState<string>("");
  const [customType, setCustomType] = useState<"text" | "image">("text");
  const [customText, setCustomText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productFinishes, setProductFinishes] = useState<Record<string, Finish>>({});
  const [bulkFinish, setBulkFinish] = useState<Finish>(DEFAULT_FINISH);
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [bulkQuantity, setBulkQuantity] = useState<string>(String(DEFAULT_PRODUCT_QUANTITY));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [aiMockupImages, setAiMockupImages] = useState<Record<string, string>>({});
  const [generatingAllAi, setGeneratingAllAi] = useState(false);

  const aiMockupKey = useCallback((productId: string, finish: Finish) => `${productId}:${finish}`, []);

  const getAiMockupImage = useCallback(
    (productId: string) => {
      const finish = productFinishes[productId] ?? DEFAULT_FINISH;
      return aiMockupImages[aiMockupKey(productId, finish)] ?? null;
    },
    [aiMockupImages, aiMockupKey, productFinishes],
  );

  const setAiMockupImage = useCallback(
    (productId: string, finish: Finish, image: string | null) => {
      const key = aiMockupKey(productId, finish);
      setAiMockupImages((prev) => {
        if (!image) {
          const { [key]: _removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: image };
      });
    },
    [aiMockupKey],
  );

  const generateAiForProduct = useCallback(
    async (productId: string, productName: string, productCategory: string, finish: Finish) => {
      const mockupKey = getMockupForProduct(productName, productCategory, finish).mockupKey;
      const result = await generateAiMockup({
        productName,
        productCategory,
        mockupKey,
        finish,
      });
      setAiMockupImage(productId, finish, result.imageDataUrl);
      return result;
    },
    [setAiMockupImage],
  );

  const generateAllAiMockups = useCallback(async () => {
    if (selectedProducts.length === 0) return;
    setGeneratingAllAi(true);
    let success = 0;
    try {
      for (const item of selectedProducts) {
        const finish = getProductFinish(item.id);
        try {
          await generateAiForProduct(item.id, item.name, item.category, finish);
          success += 1;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Eroare AI";
          toast.error(`${item.name}: ${message}`);
        }
      }
      if (success > 0) {
        toast.success(
          `Mockup AI generat pentru ${success} produs(e). Textul/logo-ul se aplică automat pe poză.`,
        );
      }
    } finally {
      setGeneratingAllAi(false);
    }
  }, [selectedProducts, getProductFinish, generateAiForProduct]);

  useEffect(() => {
    setProducts(getProductsFromStore().filter((p) => p.active));
  }, []);

  useEffect(() => {
    if (preselectedProductId) {
      setPreviewProductId(preselectedProductId);
      setSelectedProductIds([preselectedProductId]);
      setProductQuantities({ [preselectedProductId]: DEFAULT_PRODUCT_QUANTITY });
      setProductFinishes({ [preselectedProductId]: DEFAULT_FINISH });
      const p = products.find((pr) => pr.id === preselectedProductId);
      if (p) setSelectedCategory(p.category);
    }
  }, [preselectedProductId, products]);

  const getProductQuantity = useCallback(
    (productId: string) => productQuantities[productId] ?? DEFAULT_PRODUCT_QUANTITY,
    [productQuantities],
  );

  const setProductQuantity = useCallback((productId: string, quantity: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, quantity),
    }));
  }, []);

  const getProductFinish = useCallback(
    (productId: string) => productFinishes[productId] ?? DEFAULT_FINISH,
    [productFinishes],
  );

  const setProductFinish = useCallback((productId: string, finish: Finish) => {
    setProductFinishes((prev) => ({ ...prev, [productId]: finish }));
  }, []);

  const applyBulkFinish = useCallback(() => {
    setProductFinishes((prev) => {
      const next = { ...prev };
      selectedProductIds.forEach((id) => {
        next[id] = bulkFinish;
      });
      return next;
    });
    toast.success(`Finisajul ${FINISH_LABELS[bulkFinish].label} a fost aplicat la toate produsele.`);
  }, [bulkFinish, selectedProductIds]);

  const applyBulkQuantity = useCallback(() => {
    const parsed = Math.max(1, parseInt(bulkQuantity, 10) || DEFAULT_PRODUCT_QUANTITY);
    setProductQuantities((prev) => {
      const next = { ...prev };
      selectedProductIds.forEach((id) => {
        next[id] = parsed;
      });
      return next;
    });
    setBulkQuantity(String(parsed));
    toast.success(`Cantitatea ${parsed} buc. a fost aplicată la toate produsele.`);
  }, [bulkQuantity, selectedProductIds]);

  const toggleProductSelection = useCallback((productId: string) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(productId)) {
        const next = prev.filter((id) => id !== productId);
        setPreviewProductId((current) =>
          current === productId ? (next[next.length - 1] ?? "") : current,
        );
        setProductQuantities((quantities) => {
          const { [productId]: _q, ...rest } = quantities;
          return rest;
        });
        setProductFinishes((finishes) => {
          const { [productId]: _f, ...rest } = finishes;
          return rest;
        });
        setAiMockupImages((images) =>
          Object.fromEntries(Object.entries(images).filter(([key]) => !key.startsWith(`${productId}:`))),
        );
        return next;
      }
      setPreviewProductId(productId);
      setProductQuantities((quantities) => ({
        ...quantities,
        [productId]: quantities[productId] ?? DEFAULT_PRODUCT_QUANTITY,
      }));
      setProductFinishes((finishes) => ({
        ...finishes,
        [productId]: finishes[productId] ?? DEFAULT_FINISH,
      }));
      return [...prev, productId];
    });
  }, []);

  const removeSelectedProduct = useCallback((productId: string) => {
    setSelectedProductIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      setPreviewProductId((current) =>
        current === productId ? (next[next.length - 1] ?? "") : current,
      );
      setProductQuantities((quantities) => {
        const { [productId]: _q, ...rest } = quantities;
        return rest;
      });
      setProductFinishes((finishes) => {
        const { [productId]: _f, ...rest } = finishes;
        return rest;
      });
      setAiMockupImages((images) =>
        Object.fromEntries(Object.entries(images).filter(([key]) => !key.startsWith(`${productId}:`))),
      );
      return next;
    });
  }, []);

  const clearSelectedProducts = useCallback(() => {
    setSelectedProductIds([]);
    setPreviewProductId("");
    setProductQuantities({});
    setProductFinishes({});
    setAiMockupImages({});
  }, []);

  // Get products filtered by domain first, then by category
  const domainProductIds = useMemo(() => {
    if (!selectedDomain) return null;
    const domain = businessDomains.find((d) => d.id === selectedDomain);
    return domain ? new Set(domain.productIds) : null;
  }, [selectedDomain]);

  // Available categories for the selected domain
  const availableCategories = useMemo(() => {
    if (!domainProductIds) return Array.from(new Set(products.map((p) => p.category)));
    const domainProducts = products.filter((p) => domainProductIds.has(p.id));
    return Array.from(new Set(domainProducts.map((p) => p.category)));
  }, [domainProductIds, products]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (domainProductIds) list = list.filter((p) => domainProductIds.has(p.id));
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    if (searchTerm) list = list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return list;
  }, [domainProductIds, selectedCategory, searchTerm, products]);

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedProductIds.includes(p.id)),
    [products, selectedProductIds],
  );

  const offerLineItems = useMemo(
    () =>
      selectedProducts.map((item) => {
        const qty = getProductQuantity(item.id);
        const itemFinish = getProductFinish(item.id);
        const unit = +(item.basePrice * FINISH_MULTIPLIERS[itemFinish]).toFixed(2);
        return {
          name: item.name,
          category: item.category,
          quantity: qty,
          unitPrice: unit,
          totalPrice: +(unit * qty).toFixed(2),
          finishLabel: FINISH_LABELS[itemFinish].label,
          finish: itemFinish,
          aiBaseImage: aiMockupImages[aiMockupKey(item.id, itemFinish)] ?? null,
        };
      }),
    [selectedProducts, getProductQuantity, getProductFinish, aiMockupImages, aiMockupKey],
  );

  const offerFinishSummary = useMemo(() => {
    const labels = new Set(offerLineItems.map((item) => item.finishLabel));
    if (labels.size === 1) return offerLineItems[0]?.finishLabel ?? "Basic";
    return "Mixt (per produs)";
  }, [offerLineItems]);

  const offerGrandTotal = useMemo(
    () => +offerLineItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2),
    [offerLineItems],
  );

  const buildOfferPdfInput = useCallback(
    (images: Record<string, string> = aiMockupImages) => ({
      clientName: name.trim(),
      clientEmail: email.trim(),
      clientPhone: phone.trim(),
      clientMessage: message.trim() || undefined,
      finishLabel: offerFinishSummary,
      customType,
      customText,
      imagePreview,
      lineItems: selectedProducts.map((item) => {
        const qty = getProductQuantity(item.id);
        const itemFinish = getProductFinish(item.id);
        const unit = +(item.basePrice * FINISH_MULTIPLIERS[itemFinish]).toFixed(2);
        return {
          name: item.name,
          category: item.category,
          quantity: qty,
          unitPrice: unit,
          totalPrice: +(unit * qty).toFixed(2),
          finishLabel: FINISH_LABELS[itemFinish].label,
          finish: itemFinish,
          aiBaseImage: images[aiMockupKey(item.id, itemFinish)] ?? null,
        };
      }),
      grandTotal: offerGrandTotal,
    }),
    [
      name,
      email,
      phone,
      message,
      offerFinishSummary,
      customType,
      customText,
      imagePreview,
      selectedProducts,
      getProductQuantity,
      getProductFinish,
      aiMockupImages,
      aiMockupKey,
      offerGrandTotal,
    ],
  );

  const ensureAiMockupsForPdf = useCallback(async () => {
    const merged = { ...aiMockupImages };
    for (const item of selectedProducts) {
      const finish = getProductFinish(item.id);
      const key = aiMockupKey(item.id, finish);
      if (merged[key]) continue;
      try {
        const result = await generateAiForProduct(item.id, item.name, item.category, finish);
        merged[key] = result.imageDataUrl;
      } catch {
        // PDF-ul folosește mockup static dacă AI eșuează
      }
    }
    setAiMockupImages(merged);
    return merged;
  }, [aiMockupImages, selectedProducts, getProductFinish, aiMockupKey, generateAiForProduct]);

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

  const hasProductDetails = selectedProductIds.length > 0;

  const handleDownloadOfferPdf = useCallback(async () => {
    if (!hasProductDetails) {
      toast.error("Selectează cel puțin un produs pentru oferta PDF.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Completează datele de contact înainte de a descărca oferta PDF.");
      return;
    }
    try {
      setGeneratingAllAi(true);
      const images = await ensureAiMockupsForPdf();
      await generateOfferPdf(buildOfferPdfInput(images));
      toast.success("Oferta PDF a fost descărcată.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Oferta PDF nu a putut fi generată.";
      toast.error(message);
    } finally {
      setGeneratingAllAi(false);
    }
  }, [hasProductDetails, name, email, phone, buildOfferPdfInput, ensureAiMockupsForPdf]);

  const isValid =
    name.trim() &&
    email.trim() &&
    phone.trim() &&
    acceptedTerms &&
    honeypot.trim() === "" &&
    (siteConfig.turnstileSiteKey ? turnstileToken : true);

  const buildNotificationMessage = () => {
    const lines = [
      "Solicitare nouă de pe avozenevo.ro",
      "",
      `Nume: ${name}`,
      `Email: ${email}`,
      `Telefon: ${phone}`,
    ];

    if (hasProductDetails) {
      selectedProducts.forEach((item) => {
        const itemFinish = getProductFinish(item.id);
        lines.push(
          `- ${item.name}: ${getProductQuantity(item.id)} buc., ${FINISH_LABELS[itemFinish].label}`,
        );
      });
      lines.push(`Total estimat: ${offerGrandTotal} RON`);
      if (customType === "text" && customText.trim()) {
        lines.push(`Personalizare text: ${customText}`);
      } else if (customType === "image" && imageFile) {
        lines.push(`Personalizare imagine: ${imageFile.name}`);
      }
    }

    if (message.trim()) {
      lines.push(`Mesaj client: ${message}`);
    }

    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) {
      toast.error("Completează datele de contact obligatorii.");
      return;
    }
    const orderPayload = {
      createdAt: new Date().toISOString(),
      name,
      email,
      phone,
      products: selectedProducts.map((item) => {
        const itemFinish = getProductFinish(item.id);
        return {
          id: item.id,
          name: item.name,
          quantity: getProductQuantity(item.id),
          finish: itemFinish,
          unitPrice: +(item.basePrice * FINISH_MULTIPLIERS[itemFinish]).toFixed(2),
        };
      }),
      customType,
      customText,
      imageFileName: imageFile?.name || "",
      imagePreview,
      message,
    };

    const previousOrders = JSON.parse(localStorage.getItem(storageKeys.orders) || "[]");
    localStorage.setItem(storageKeys.orders, JSON.stringify([orderPayload, ...previousOrders].slice(0, 200)));

    const notificationMessage = buildNotificationMessage();
    const waUrl = `https://wa.me/${siteConfig.whatsappDigits}?text=${encodeURIComponent(notificationMessage)}`;

    setSubmitting(true);
    try {
      await sendOrderEmail(
        `Solicitare ofertă — ${name}`,
        notificationMessage,
        name,
        email,
        phone,
      );
    } catch {
      toast.error("Emailul nu a putut fi trimis, dar WhatsApp-ul se deschide.");
    }

    if (hasProductDetails) {
      try {
        const images = await ensureAiMockupsForPdf();
        await generateOfferPdf(buildOfferPdfInput(images));
      } catch {
        toast.error("Oferta PDF nu a putut fi generată automat.");
      }
    }

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setSubmitting(false);
    toast.success("Solicitarea a fost trimisă!");
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-energy-green/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-energy-green" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Mulțumim!</h2>
        <p className="text-muted-foreground">
          Te vom contacta în cel mai scurt timp la numărul sau adresa de email furnizate.
          {hasProductDetails && " Oferta PDF a fost descărcată pe dispozitivul tău."}
        </p>
        <div className="text-left space-y-3 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Nume:</span> {name}</p>
          <p><span className="font-semibold text-foreground">Email:</span> {email}</p>
          <p><span className="font-semibold text-foreground">Telefon:</span> {phone}</p>
          {hasProductDetails && (
            <>
              <Separator />
              <p><span className="font-semibold text-foreground">Produse:</span> {selectedProducts.map((item) => item.name).join(", ")}</p>
              {(customType === "text" ? customText : imageFile?.name) && (
                <p><span className="font-semibold text-foreground">Personalizare:</span> {customType === "text" ? customText : imageFile?.name}</p>
              )}
              <ul className="list-disc pl-5 space-y-1">
                {selectedProducts.map((item) => {
                  const itemFinish = getProductFinish(item.id);
                  return (
                    <li key={item.id}>
                      {item.name}: {getProductQuantity(item.id)} buc., {FINISH_LABELS[itemFinish].label}
                    </li>
                  );
                })}
              </ul>
              <p className="text-lg font-bold text-foreground">Total estimat: {offerGrandTotal} RON</p>
            </>
          )}
          {message.trim() && (
            <p><span className="font-semibold text-foreground">Mesaj:</span> {message}</p>
          )}
        </div>
        <Button onClick={() => setSubmitted(false)} className="w-full">Plasează o nouă solicitare</Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 min-w-0 overflow-hidden">
      <Card className="p-4 bg-primary/5 border-primary/20">
        <p className="text-sm text-muted-foreground">
          Pașii 1–4 sunt <span className="font-semibold text-foreground">opționali</span> — poți configura produsele și prețul estimat,
          sau poți sări direct la datele de contact dacă vrei să fii sunat.
        </p>
      </Card>

      {/* STEP 0: Business Domain */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-start gap-2 text-foreground font-semibold text-lg">
          <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="min-w-0 break-words">1. Alege domeniul de activitate <span className="text-sm font-normal text-muted-foreground">(opțional)</span></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {businessDomains.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => {
                setSelectedDomain(domain.id === selectedDomain ? "" : domain.id);
                setSelectedCategory("");
              }}
              className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left text-sm font-medium transition-all border ${
                selectedDomain === domain.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-card-foreground border-border hover:border-primary/40 hover:bg-secondary"
              }`}
            >
              <span className="flex-shrink-0">{DOMAIN_ICONS[domain.id]}</span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-xs">{domain.name}</p>
                <p className={`truncate text-[10px] ${
                  selectedDomain === domain.id ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>{domain.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Separator />

      {/* STEP 1: Product Selection */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-start gap-2 text-foreground font-semibold text-lg">
          <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="min-w-0 break-words">2. Alege unul sau mai multe produse <span className="text-sm font-normal text-muted-foreground">(opțional)</span></span>
        </div>

        {selectedCategory && (
          <p className="text-xs text-muted-foreground">
            Categorie activă: <span className="font-semibold text-foreground">{selectedCategory}</span>
            {" · "}
            Poți schimba categoria fără să pierzi produsele deja selectate.
          </p>
        )}

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
          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
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
              onClick={() => toggleProductSelection(p.id)}
              className={`text-left px-3 py-2 rounded-md text-sm transition-all ${
                selectedProductIds.includes(p.id)
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

      {selectedProducts.length > 0 && (
        <Card className="p-4 bg-secondary/40 border-border space-y-3 overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">
                Produse selectate ({selectedProducts.length})
              </p>
              <button
                type="button"
                onClick={clearSelectedProducts}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                Șterge toate
              </button>
            </div>

            <div className="space-y-2 rounded-lg border border-border/70 bg-card/60 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Aplică la toate produsele
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Label htmlFor="bulk-quantity" className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                  Cantitate:
                </Label>
                <Input
                  id="bulk-quantity"
                  type="number"
                  min={1}
                  value={bulkQuantity}
                  onChange={(e) => setBulkQuantity(e.target.value)}
                  className="h-8 w-20"
                />
                <Button type="button" variant="secondary" size="sm" onClick={applyBulkQuantity} className="shrink-0">
                  Aplică
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">Finisaj:</span>
                <ProductFinishPicker value={bulkFinish} onChange={setBulkFinish} compact />
                <Button type="button" variant="secondary" size="sm" onClick={applyBulkFinish} className="shrink-0">
                  Aplică
                </Button>
              </div>
            </div>
          </div>
          <ul className="space-y-2">
            {selectedProducts.map((item) => {
              const qty = getProductQuantity(item.id);
              const itemFinish = getProductFinish(item.id);
              const lineUnit = +(item.basePrice * FINISH_MULTIPLIERS[itemFinish]).toFixed(2);
              const isPreview = previewProductId === item.id;
              return (
                <li
                  key={item.id}
                  className={`rounded-lg border p-3 overflow-hidden transition-colors ${
                    isPreview
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => setPreviewProductId(item.id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="text-sm font-medium text-foreground break-words">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.category} · {lineUnit} RON/buc
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSelectedProduct(item.id)}
                      className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      aria-label={`Elimină ${item.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/60 grid gap-3 sm:grid-cols-2">
                    <div className="min-w-0 space-y-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Finisaj
                      </p>
                      <ProductFinishPicker
                        value={itemFinish}
                        onChange={(f) => setProductFinish(item.id, f)}
                        compact
                      />
                    </div>
                    <div className="min-w-0 space-y-1.5">
                      <Label
                        htmlFor={`qty-${item.id}`}
                        className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        Cantitate
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`qty-${item.id}`}
                          type="number"
                          min={1}
                          value={qty}
                          onChange={(e) =>
                            setProductQuantity(item.id, Math.max(1, parseInt(e.target.value, 10) || 1))
                          }
                          className="h-8 w-full max-w-[7rem] text-center"
                        />
                        <span className="text-xs text-muted-foreground shrink-0">buc.</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-muted-foreground">
            Setează cantitatea și finisajul separat pentru fiecare produs (ex: pix Basic, cană Standard, carte Premium).
          </p>
        </Card>
      )}

      <Separator />

      {/* STEP 2: Customization */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-start gap-2 text-foreground font-semibold text-lg">
          <Paintbrush className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="min-w-0 break-words">3. Personalizare <span className="text-sm font-normal text-muted-foreground">(opțional)</span></span>
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
                <img src={imagePreview} alt="Previzualizare" className="w-32 h-32 object-cover rounded-lg border border-border" />
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

      {/* STEP 4: Pricing & mockup */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-start gap-2 text-foreground font-semibold text-lg">
          <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="min-w-0 break-words">4. Estimare & preview <span className="text-sm font-normal text-muted-foreground">(opțional)</span></span>
        </div>

        <p className="text-sm text-muted-foreground">
          Finisajul se alege per produs în lista de mai sus. Poți folosi „Finisaj la toate” pentru a aplica același nivel la toate produsele.
        </p>

        {selectedProducts.length > 0 && (
          <Card className="p-4 bg-secondary/50 border-border space-y-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Estimare per produs</p>
            {selectedProducts.map((item) => {
              const itemFinish = getProductFinish(item.id);
              const lineUnit = +(item.basePrice * FINISH_MULTIPLIERS[itemFinish]).toFixed(2);
              const qty = getProductQuantity(item.id);
              const lineTotal = +(lineUnit * qty).toFixed(2);
              return (
                <div key={item.id} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-3 text-sm min-w-0">
                  <span className="text-muted-foreground break-words min-w-0">
                    {item.name}
                    <span className="text-xs"> ({item.category}) · {FINISH_LABELS[itemFinish].label}</span>
                  </span>
                  <span className="shrink-0 font-medium text-foreground">
                    {qty} × {lineUnit} = {lineTotal} RON
                  </span>
                </div>
              );
            })}
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold text-foreground text-lg">Total general</span>
              <span className="font-bold text-primary text-lg">{offerGrandTotal} RON</span>
            </div>
          </Card>
        )}

        {selectedProducts.length > 0 && (
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={generateAllAiMockups}
              disabled={generatingAllAi}
              className="w-full gap-2"
            >
              {generatingAllAi ? (
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              ) : (
                <Sparkles className="w-4 h-4 shrink-0" />
              )}
              {generatingAllAi
                ? "Se generează poze AI pentru produse..."
                : "Generează poze AI pentru toate produsele"}
            </Button>
            <p className="text-xs text-muted-foreground">
              OpenAI creează produsul de la zero; textul sau logo-ul tău se aplică apoi pe suprafață (PDF, filă nouă, descărcare mockup).
            </p>
            {siteConfig.recaptchaSiteKey ? <RecaptchaNotice /> : null}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Preview mockup — toate produsele selectate</p>
            {selectedProducts.map((item) => (
              <ProductMockup
                key={item.id}
                productName={item.name}
                productCategory={item.category}
                customType={customType}
                customText={customText}
                imagePreview={imagePreview}
                finish={getProductFinish(item.id)}
                basePrice={item.basePrice}
                onFinishChange={(f) => setProductFinish(item.id, f)}
                aiBaseImage={getAiMockupImage(item.id)}
                onAiBaseImageChange={(image) =>
                  setAiMockupImage(item.id, getProductFinish(item.id), image)
                }
                triggerLabel={`Preview mockup: ${item.name}`}
              />
            ))}
          </div>
          </div>
        )}
      </section>

      <Separator />

      {/* STEP 4: Contact */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-start gap-2 text-foreground font-semibold text-lg">
          <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="min-w-0 break-words">5. Date de contact <span className="text-sm font-normal text-muted-foreground">(obligatoriu)</span></span>
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
            <Input id="phone" type="tel" placeholder="0784 998 866" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="message">Mesaj suplimentar (optional)</Label>
            <Input id="message" placeholder="Deadline, observatii, culori preferate..." value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1" />
          </div>
          <div className="hidden">
            <Label htmlFor="website-field">Nu completa acest camp</Label>
            <Input
              id="website-field"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>
          {siteConfig.turnstileSiteKey ? (
            <div>
              <Label>Protectie anti-spam</Label>
              <TurnstileWidget siteKey={siteConfig.turnstileSiteKey} onTokenChange={setTurnstileToken} />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Protectia Turnstile este pregatita. Seteaza variabila `VITE_TURNSTILE_SITE_KEY` pentru activare.
            </p>
          )}
        </div>
      </section>

      {/* STEP 5: Terms acceptance */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
          className="mt-0.5"
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          Am citit și sunt de acord cu{" "}
          <SiteLink to="/termeni-si-conditii" className="text-primary hover:underline font-medium">
            Termenii și condițiile
          </SiteLink>{" "}
          și{" "}
          <SiteLink to="/politica-confidentialitate" className="text-primary hover:underline font-medium">
            Politica de confidențialitate
          </SiteLink>. 
          Sunt de acord cu prelucrarea datelor personale conform GDPR.
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {hasProductDetails && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleDownloadOfferPdf}
            className="w-full gap-2"
          >
            <Download className="w-4 h-4" />
            Descarcă ofertă PDF
          </Button>
        )}
        <Button type="submit" size="lg" disabled={!isValid || submitting} className="w-full gap-2">
          <Send className="w-4 h-4" />
          {submitting ? "Se trimite..." : "Trimite solicitarea"}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Solicitarea ajunge pe WhatsApp ({siteConfig.whatsappDisplay}) și pe email ({siteConfig.email}).
      </p>
    </form>
  );
}
