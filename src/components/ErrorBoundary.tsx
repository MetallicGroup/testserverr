import { Component, type ErrorInfo, type ReactNode } from "react";
import { siteConfig } from "@/config/siteConfig";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Eroare aplicație:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Ceva nu a funcționat</h1>
            <p className="text-muted-foreground">
              Reîncarcă pagina. Dacă problema persistă, contactează-ne la {siteConfig.email}.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Reîncarcă pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
