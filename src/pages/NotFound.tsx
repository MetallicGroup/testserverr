import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteLink from "@/components/SiteLink";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <h1 className="mb-4 text-4xl font-black text-foreground">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">Pagina nu a fost găsită</p>
          <SiteLink
            to="/"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Înapoi la pagina principală
          </SiteLink>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
