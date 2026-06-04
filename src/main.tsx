import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elementul #root lipsește din pagină.");
}

createRoot(rootElement).render(<App />);
