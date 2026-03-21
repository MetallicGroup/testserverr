export default function Footer() {
  return (
    <footer className="py-10 border-t border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-2xl font-black text-primary mb-2">avozenevo</p>
        <p className="text-sm text-muted-foreground">
          Produse personalizate pentru business-ul tău. © {new Date().getFullYear()} avozenevo. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
