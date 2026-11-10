import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { usePageMeta } from "./hooks/use-page-meta";
import { restoreSavedLanguage } from "./i18n/config";

// Only the home page ships in the main bundle; the other routes (and
// mermaid, which ArticleDetail pulls in) load on demand.
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Projects = lazy(() => import("./pages/Projects"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageMeta = () => {
  usePageMeta();
  return null;
};

// Router-agnostic so the build-time prerender (src/entry-server.tsx) can wrap
// it in a StaticRouter.
export const AppRoutes = () => (
  <>
    <PageMeta />
    <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
);

// Effects run only in the browser, after hydration, so switching away from
// the prerendered English can't cause a hydration mismatch.
const useSavedLanguage = () => {
  useEffect(() => restoreSavedLanguage(), []);
};

const App = () => {
  useSavedLanguage();
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
