import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${siteConfig.whatsappDigits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactează-ne pe WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}
