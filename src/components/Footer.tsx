import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/avozenevo-logo.png";
import SiteLink from "@/components/SiteLink";
import { footerLegalLinks, footerSectionLinks } from "@/config/navigation";
import { useSiteNavigate } from "@/hooks/useSiteNavigate";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  const { goHome } = useSiteNavigate();

  return (
    <footer className="py-16 border-t border-border bg-secondary/20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          <div>
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                goHome({ top: true });
              }}
              className="inline-block"
            >
              <img src={logo} alt="Avozenevo" className="h-10 w-auto mb-3" />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Produse personalizate pentru business-ul tău. Calitate, rapiditate și flexibilitate.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Navigare</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerSectionLinks.map((link) => (
                <li key={link.sectionId}>
                  <SiteLink section={link.sectionId} className="hover:text-foreground transition-colors">
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLegalLinks.map((link) => (
                <li key={link.path}>
                  <SiteLink to={link.path} className="hover:text-foreground transition-colors">
                    {link.label}
                  </SiteLink>
                </li>
              ))}
              <li>
                <SiteLink
                  href={siteConfig.legal.anpcUrl}
                  external
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  ANPC <ExternalLink className="w-3 h-3" />
                </SiteLink>
              </li>
              <li>
                <SiteLink
                  href={siteConfig.legal.odrUrl}
                  external
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  SOL — Soluționare online litigii <ExternalLink className="w-3 h-3" />
                </SiteLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> {siteConfig.email}</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {siteConfig.phoneDisplay}</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {siteConfig.cityCountry}</li>
            </ul>
          </div>
        </motion.div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} avozenevo. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-4">
            <SiteLink href={siteConfig.legal.anpcUrl} external className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ANPC
            </SiteLink>
            <SiteLink href={siteConfig.legal.odrUrl} external className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              SOL/ODR
            </SiteLink>
            <SiteLink to="/admin" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </SiteLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
