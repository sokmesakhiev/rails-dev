import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import {
  findPageMeta,
  normalizePath,
  pageMetas,
  renderHeadTags,
  renderSitemap,
  SEO_END,
  SEO_START,
} from "./src/lib/seo";

// Crawlers that don't run JavaScript only ever see the HTML file, so emit a
// copy of index.html per route (<route>/index.html, served by S3 at the
// trailing-slash URL) with that route's title, canonical URL and JSON-LD,
// plus sitemap.xml. The app updates the same tags on client-side navigation.
const seoPages = (): Plugin => ({
  name: "seo-pages",
  transformIndexHtml: (html) => html.replace("<!--seo-->", renderHeadTags(findPageMeta("/")!)),
  generateBundle: {
    order: "post",
    handler(_, bundle) {
      const index = bundle["index.html"];
      if (index?.type !== "asset") return;

      const html = String(index.source);
      const start = html.indexOf(SEO_START);
      const end = html.indexOf(SEO_END) + SEO_END.length;

      for (const meta of pageMetas) {
        if (meta.path === "/") continue;
        this.emitFile({
          type: "asset",
          fileName: `${normalizePath(meta.path).slice(1)}index.html`,
          source: html.slice(0, start) + renderHeadTags(meta) + html.slice(end),
        });
      }
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: renderSitemap() });
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), seoPages(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
