import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalUrl, findPageMeta, serializeJsonLd } from "@/lib/seo";

// Find a <head> element by selector, creating it from `attrs` if missing.
const upsert = (tag: string, selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    element = document.createElement(tag);
    document.head.appendChild(element);
  }
  for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
  return element;
};

const setMeta = (key: "name" | "property", value: string, content: string) =>
  upsert("meta", `meta[${key}="${value}"]`, { [key]: value, content });

// Keeps the tags written at build time (see src/lib/seo.ts) in sync while the
// SPA navigates; unknown routes (served by the index.html fallback with a 200)
// are marked noindex so they aren't indexed as soft 404s.
export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = findPageMeta(pathname);

    if (!meta) {
      setMeta("name", "robots", "noindex");
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector("script#seo-jsonld")?.remove();
      return;
    }
    document.head.querySelector('meta[name="robots"]')?.remove();

    const url = canonicalUrl(meta.path);
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    upsert("link", 'link[rel="canonical"]', { rel: "canonical", href: url });
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", meta.type);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    upsert("script", "script#seo-jsonld", { type: "application/ld+json", id: "seo-jsonld" })
      .textContent = serializeJsonLd(meta.jsonLd);
  }, [pathname]);
}
