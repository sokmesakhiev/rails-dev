import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import "./i18n/config";

export { normalizePath, pageMetas } from "./lib/seo";

// Renders one route to HTML for scripts/prerender.mjs. Waits for every lazy
// route chunk (onAllReady) so the output holds the full page, not the
// Suspense fallback.
export const render = (url: string) =>
  new Promise<string>((resolve, reject) => {
    let html = "";
    const sink = new PassThrough();
    sink.on("data", (chunk) => (html += chunk));
    sink.on("end", () => resolve(html));

    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
      { onAllReady: () => pipe(sink), onShellError: reject, onError: reject },
    );
  });
