import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/outfit";
import "./index.css";
import "./i18n/config";
import { normalizePath } from "./lib/seo";

const root = document.getElementById("root")!;

// Pages are prerendered at build time (scripts/prerender.mjs). Hydrate only
// when the HTML is for this URL: S3 serves the home page's file for unknown
// paths, and hydrating that as the 404 page would mismatch.
if (root.dataset.prerendered === normalizePath(window.location.pathname)) {
  hydrateRoot(root, <App />);
} else {
  root.replaceChildren();
  createRoot(root).render(<App />);
}
