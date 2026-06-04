import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PoliticaConfidentialitate from "./pages/PoliticaConfidentialitate.tsx";
import TermeniSiConditii from "./pages/TermeniSiConditii.tsx";
import CookieConsent from "./components/CookieConsent.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import ScrollToHomeSection from "./components/ScrollToHomeSection.tsx";
import DespreNoi from "./pages/DespreNoi.tsx";
import SeapSicap from "./pages/SeapSicap.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHomeSection />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/politica-confidentialitate" element={<PoliticaConfidentialitate />} />
            <Route path="/termeni-si-conditii" element={<TermeniSiConditii />} />
            <Route path="/despre-noi" element={<DespreNoi />} />
            <Route path="/seap-sicap" element={<SeapSicap />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
