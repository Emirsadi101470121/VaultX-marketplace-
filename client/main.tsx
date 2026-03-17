import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;

if (!(window as any).__TRADEGO_ROOT) {
  (window as any).__TRADEGO_ROOT = createRoot(container);
}

(window as any).__TRADEGO_ROOT.render(<App />);
