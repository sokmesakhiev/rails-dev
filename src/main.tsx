import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/outfit";
import "./index.css";
import "./i18n/config";

createRoot(document.getElementById("root")!).render(<App />);
