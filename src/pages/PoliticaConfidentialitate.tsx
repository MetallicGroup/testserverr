import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PoliticaConfidentialitate() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm sm:prose dark:prose-invert">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground">Politica de Confidențialitate</h1>
          <p className="text-muted-foreground text-sm">Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

          <h2>1. Introducere</h2>
          <p>
            SC Avozenevo SRL („noi", „compania") respectă confidențialitatea datelor dumneavoastră personale, 
            în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația română în vigoare.
          </p>

          <h2>2. Date colectate</h2>
          <p>Colectăm următoarele date personale prin formularul de comandă:</p>
          <ul>
            <li>Nume complet</li>
            <li>Adresa de email</li>
            <li>Număr de telefon</li>
            <li>Detalii despre comanda dorită</li>
          </ul>

          <h2>3. Scopul prelucrării</h2>
          <p>Datele sunt utilizate exclusiv pentru:</p>
          <ul>
            <li>Procesarea și gestionarea comenzilor</li>
            <li>Comunicarea cu dumneavoastră privind comanda</li>
            <li>Îmbunătățirea serviciilor noastre</li>
          </ul>

          <h2>4. Temeiul legal</h2>
          <p>
            Prelucrarea datelor se bazează pe consimțământul dumneavoastră explicit, acordat prin bifarea 
            căsuței de acceptare din formularul de comandă, precum și pe interesul nostru legitim de a 
            furniza serviciile solicitate.
          </p>

          <h2>5. Durata stocării</h2>
          <p>
            Datele personale sunt stocate pe durata necesară îndeplinirii scopurilor pentru care au fost 
            colectate, dar nu mai mult de 3 ani de la ultima interacțiune.
          </p>

          <h2>6. Drepturile dumneavoastră</h2>
          <p>Aveți dreptul de:</p>
          <ul>
            <li>Acces la datele personale</li>
            <li>Rectificarea datelor inexacte</li>
            <li>Ștergerea datelor („dreptul de a fi uitat")</li>
            <li>Restricționarea prelucrării</li>
            <li>Portabilitatea datelor</li>
            <li>Opoziția la prelucrare</li>
          </ul>

          <h2>7. Cookie-uri</h2>
          <p>
            Website-ul utilizează cookie-uri esențiale pentru funcționarea corectă. Cookie-urile analitice 
            sunt activate doar cu acordul dumneavoastră explicit.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pentru exercitarea drepturilor sau întrebări privind datele personale, contactați-ne la:{" "}
            <a href="mailto:contact@avozenevo.ro" className="text-primary">contact@avozenevo.ro</a>
          </p>
          <p>
            Dacă considerați că drepturile dumneavoastră nu au fost respectate, puteți depune o plângere 
            la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
