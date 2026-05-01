export const siteConfig = {
  brandName: "Avozenevo",
  companyName: "SC Avozenevo SRL",
  websiteUrl: "https://www.avozenevo.ro",
  email: "contact@avozenevo.ro",
  phoneDisplay: "+40 764 652 773",
  whatsappDigits: "40764652773",
  whatsappDisplay: "0764652773",
  cityCountry: "Bucuresti, Romania",
  social: {
    twitterHandle: "",
  },
  seo: {
    title: "Avozenevo - Produse personalizate pentru afacerea ta",
    description:
      "Comanda produse personalizate de calitate: tricouri, cesti, pixuri, agende si materiale promotionale pentru afaceri din toata Romania.",
    ogImage: "https://www.avozenevo.ro/og-image-1200x630.svg",
  },
  legal: {
    anpcUrl: "https://anpc.ro",
    odrUrl: "https://ec.europa.eu/consumers/odr",
  },
  admin: {
    username: "admin",
    password: "admin123",
  },
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || "",
};

export const storageKeys = {
  orders: "avozenevo_orders_v1",
  productOverrides: "avozenevo_product_overrides_v1",
};
