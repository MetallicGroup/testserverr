import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/siteConfig";

export default function DespreNoi() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground">Despre noi</h1>
          <p className="text-muted-foreground">
            Suntem {siteConfig.companyName}, furnizor de produse personalizate pentru companii din Romania.
            Oferim productie, personalizare si livrare pentru comenzi B2B.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <h2 className="text-xl font-bold text-foreground">Date societate</h2>
            <p><span className="font-semibold">Denumire:</span> {siteConfig.companyName}</p>
            <p><span className="font-semibold">Website:</span> {siteConfig.websiteUrl}</p>
            <p><span className="font-semibold">Email:</span> {siteConfig.email}</p>
            <p><span className="font-semibold">Telefon:</span> {siteConfig.phoneDisplay}</p>
            <p><span className="font-semibold">Sediu:</span> {siteConfig.cityCountry}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
