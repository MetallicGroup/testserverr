export const siteConfig = {
  brandName: "Avozenevo",
  companyName: "SC Avozenevo SRL",
  websiteUrl: "https://www.avozenevo.ro",
  email: "contact@avozenevo.ro",
  phoneDisplay: "+40 764 652 773",
  whatsappDigits: "40764652773",
  whatsappDisplay: "0764652773",
  cityCountry: "Bucuresti, Romania",
  company: {
    legalName: "SC Avozenevo S.R.L.",
    cui: "RO44045020",
    tradeRegister: "J23/2129/2021",
    eori: "RO44045020",
    addressLine: "Str. Libertății, nr. 51B, Anexa 1",
    city: "Bragadiru",
    county: "Ilfov",
    postalCode: "077025",
    country: "România",
    eLicitationUrl: "https://www.e-licitatie.ro",
    eLicitationRole: "Ofertant",
    tendersEmail: "office@avozenevo.ro",
    officePhoneDisplay: "+40 793 645 564",
    officePhoneDigits: "40793645564",
    description:
      "Partener de încredere în personalizarea produselor promoționale: imprimare, gravură laser, design grafic și materiale publicitare pentru companii și instituții publice.",
  },
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
