// Fills each generated page (dist/<route>/index.html, written by the
// seo-pages plugin in vite.config.ts) with that route's server-rendered
// markup, so crawlers that don't run JavaScript see the content. Runs after
// `vite build` and `vite build --ssr src/entry-server.tsx`.
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ssrDir = path.join(root, "dist-ssr");
const { render, normalizePath, pageMetas } = await import(path.join(ssrDir, "entry-server.js"));

const ROOT_DIV = '<div id="root"></div>';

for (const { path: route } of pageMetas) {
  const pagePath = normalizePath(route);
  const file = path.join(root, "dist", pagePath, "index.html");
  const html = await readFile(file, "utf8");
  if (!html.includes(ROOT_DIV)) throw new Error(`${file}: no empty #root to fill`);

  const app = await render(route);
  await writeFile(
    file,
    html.replace(ROOT_DIV, `<div id="root" data-prerendered="${pagePath}">${app}</div>`),
  );
  console.log(`prerendered ${pagePath}`);
}

await rm(ssrDir, { recursive: true, force: true });
