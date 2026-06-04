import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/avozenevo-logo.png";
import SiteLink from "@/components/SiteLink";
import { mainNavLinks } from "@/config/navigation";
import { useSiteNavigate } from "@/hooks/useSiteNavigate";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { goHome } = useSiteNavigate();

  const closeMenu = () => setOpen(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center"
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              goHome({ top: true });
            }}
          >
            <img src={logo} alt="Avozenevo" className="h-10 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {mainNavLinks.map((link) =>
              link.type === "section" ? (
                <SiteLink
                  key={link.sectionId}
                  section={link.sectionId}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </SiteLink>
              ) : (
                <SiteLink
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </SiteLink>
              ),
            )}
            <SiteLink
              section="comanda"
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Creează comanda
            </SiteLink>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Meniu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-2 overflow-hidden"
            >
              {mainNavLinks.map((link) =>
                link.type === "section" ? (
                  <SiteLink
                    key={link.sectionId}
                    section={link.sectionId}
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </SiteLink>
                ) : (
                  <SiteLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </SiteLink>
                ),
              )}
              <SiteLink
                section="comanda"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground text-center"
              >
                Creează comanda
              </SiteLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
