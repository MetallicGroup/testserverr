import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermeniSiConditii() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm sm:prose dark:prose-invert">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground">Termeni și Condiții</h1>
          <p className="text-muted-foreground text-sm">Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

          <h2>1. Informații generale</h2>
          <p>
            Prezentele condiții generale de utilizare reglementează accesul și utilizarea website-ului 
            avozenevo.ro, operat de SC Avozenevo SRL, cu sediul în București, România.
          </p>

          <h2>2. Servicii oferite</h2>
          <p>
            Avozenevo oferă servicii de personalizare produse promoționale, inclusiv dar fără a se limita la: 
            tricouri, cești, pixuri, agende, bannere, corturi pentru evenimente și alte materiale publicitare.
          </p>

          <h2>3. Comenzi și prețuri</h2>
          <ul>
            <li>Prețurile afișate în calculatorul de pe site sunt orientative și pot varia în funcție de specificațiile finale</li>
            <li>O comandă este considerată fermă doar după confirmarea scrisă din partea Avozenevo</li>
            <li>Prețurile nu includ TVA, dacă nu se specifică altfel</li>
            <li>Termenele de livrare sunt estimate și pot varia</li>
          </ul>

          <h2>4. Personalizare și materiale grafice</h2>
          <p>
            Clientul este responsabil pentru materialele grafice furnizate (logo-uri, imagini, texte). 
            Avozenevo nu își asumă responsabilitatea pentru calitatea grafică a materialelor primite de la client.
          </p>

          <h2>5. Dreptul de retragere</h2>
          <p>
            Conform OUG 34/2014, produsele personalizate conform specificațiilor clientului nu fac obiectul 
            dreptului de retragere, fiind realizate la comandă.
          </p>

          <h2>6. Garanție și reclamații</h2>
          <p>
            Produsele beneficiază de garanție conform legislației în vigoare. Reclamațiile se pot depune 
            în termen de 14 zile de la recepția produselor la adresa de email{" "}
            <a href="mailto:contact@avozenevo.ro" className="text-primary">contact@avozenevo.ro</a>.
          </p>

          <h2>7. Protecția datelor</h2>
          <p>
            Prelucrarea datelor personale se face conform{" "}
            <a href="/politica-confidentialitate" className="text-primary">Politicii de Confidențialitate</a>.
          </p>

          <h2>8. Litigii</h2>
          <p>
            Eventualele litigii se vor soluționa pe cale amiabilă. În caz contrar, litigiile sunt de 
            competența instanțelor judecătorești din București, România.
          </p>

          <h2>9. ANPC</h2>
          <p>
            Pentru sesizări și reclamații, consumatorii se pot adresa Autorității Naționale pentru Protecția 
            Consumatorilor (ANPC):{" "}
            <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-primary">anpc.ro</a>
          </p>
          <p>
            Soluționarea alternativă a litigiilor (SAL/SOL):{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary">
              Platforma europeană ODR
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
