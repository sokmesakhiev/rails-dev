# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"RailsDev" — a static marketing/portfolio site for a Ruby on Rails & React consultant (home, portfolio/CV, projects, articles). Despite the repo name, there is **no Rails code**: it is a Vite + React 18 + TypeScript SPA built on shadcn/ui and Tailwind CSS v4, originally scaffolded by Lovable. There is no backend and no API calls; all content lives in the source.

## Commands

```bash
npm install          # npm is the source of truth (see "Lockfiles")
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # client build + SSR build + prerender into dist/ (does NOT type-check)
npm run lint         # eslint .
npx tsc -p tsconfig.app.json --noEmit   # type-check; not part of build or CI
npm run preview      # serve dist/
```

There is no test framework or test suite. Verify changes with lint, the type-check above, a build, and by checking the page in the browser (`.claude/launch.json` defines a `dev` preview on port 8080).

## Architecture

- **Entry:** `src/main.tsx` loads the font, `index.css` and i18n (`src/i18n/config.ts`), then hydrates `App.tsx` (a `BrowserRouter` around `AppRoutes`). Routes: `/`, `/portfolio`, `/projects`, `/articles`, `/articles/:id`, and `*` → `NotFound`; all but `Index` are `React.lazy`. New routes go above the catch-all, and a new page also needs an entry in `src/lib/seo.ts` to get its own HTML file.
- **Build-time prerender:** `npm run build` runs three steps. `vite build` emits `dist/<route>/index.html` per entry in `pageMetas` (the `seoPages` plugin in `vite.config.ts`: head tags + `sitemap.xml`). `vite build --ssr src/entry-server.tsx` bundles `AppRoutes` in a `StaticRouter`. `scripts/prerender.mjs` renders each route into its file's `#root` and tags it `data-prerendered="<path>"`. `main.tsx` hydrates only when that matches the URL, otherwise it client-renders (unknown paths get the home page's file). So components must render the same on server and client: no `window`/`document` during render (effects and handlers are fine), and anything browser-only (like mermaid) is imported lazily.
- **Pages** (`src/pages/`) each render `Navigation` + content + `Footer` themselves; there is no shared layout route. The home page (`Index.tsx`) is just `Hero`, `Services`, `About` sections. `Navigation` scrolls to those section ids (`home`, `services`, `about`) on `/` and navigates (via `navigate()` on buttons) for the other routes.
- **Content is hard-coded in components**, not fetched:
  - Articles: `src/data/mockArticles.ts` (`Article` interface; `content` is a Markdown string). Category must be one of `rails | react | fullstack | devops`, which matches the filter in `Articles.tsx`.
  - Portfolio experience entries: inline array in `Portfolio.tsx` (English only, not translated).
  - Projects: inline array in `Projects.tsx`; titles are literal, descriptions come from i18n keys.
- **Article rendering** (`ArticleDetail.tsx`): `react-markdown` v10 + `remark-gfm`. Fenced code blocks are rendered by the `pre` override; the `code` override only ever handles inline code (v10 has no `inline` prop). ```` ```mermaid ```` blocks render through `MermaidDiagram` (mermaid 12, `securityLevel: 'strict'`, id from `useId()`). Mermaid is large and needs the DOM, so `loadMermaid()` imports it on the first diagram.
- **i18n:** i18next with four locales in `src/i18n/locales/{en,es,fr,km}.json` (`km` = Khmer). Every key must exist in all four files; keys are nested by page/section (`nav`, `hero`, `services`, `about`, `footer`, `portfolio`, `projects`, `articles`). Some calls pass an inline English fallback (`t('articles.title', 'Articles')`). `config.ts` sets `lng: 'en'`, which overrides the browser language detector, so the site always starts in English. Date formatting is hard-coded to `en-US` and `timeZone: 'UTC'`, so prerendered dates match in every timezone.
- **UI components:** `src/components/ui/*` are shadcn/ui primitives (`components.json`, style `default`, alias `@/components/ui`). Most are unused; treat them as generated code and prefer composing them over editing them. Use `cn()` from `src/lib/utils.ts` to merge classes. The `@/` alias maps to `src/`.

## Styling (Tailwind v4, CSS-first)

There is **no `tailwind.config.ts`**. Everything is configured in `src/index.css`: `@import 'tailwindcss'`, `@plugin 'tailwindcss-animate'`, a class-based `dark` custom variant, a `@utility container` (centered, 2rem padding, 1400px max), and a `@theme` block that maps semantic colors (`background`, `primary`, `muted`, `accent`, `sidebar-*`, …) to HSL CSS variables defined under `:root` / `.dark`. Add design tokens there as HSL triplets (the file's own rule: "All colors MUST be HSL"), not as hard-coded colors in components. PostCSS uses `@tailwindcss/postcss` only.

v4 class names apply: `bg-linear-*` (not `bg-gradient-*`), `outline-hidden`, `shrink-0`/`grow`, `w-(--var)` for CSS-variable arbitrary values. `@tailwindcss/typography` is installed but **not enabled**, so the `prose` classes on article pages have no effect. A compatibility block in `index.css` keeps the v3 default border color and the pointer cursor on buttons.

When running Tailwind's upgrade/codemod tools, check for false positives: they rewrote the Button `variant="outline"` prop to `"outline-solid"` once.

## TypeScript / lint

TypeScript runs loose (`strict: false`, `strictNullChecks: false`, `noImplicitAny: false`); don't assume null-safety. ESLint (flat config) has `@typescript-eslint/no-unused-vars` turned off; the existing `react-refresh/only-export-components` warnings in `components/ui` are expected.

## Branches, CI and deploy

- `develop` is the GitHub default branch; Dependabot PRs and feature work target it. `main` is production.
- `.github/workflows/ci.yml`: lint + build on PRs to `main`/`develop` and on push to `main` (Node 24, `npm install`).
- `.github/workflows/deploy.yml`: on push to `main`, `npm ci` → build → `aws s3 sync dist/ --delete` → CloudFront invalidation, then a Telegram notification on success or failure. Because it uses `npm ci`, a `package-lock.json` that is out of sync with `package.json` breaks the deploy.
- `.github/workflows/dependabot-auto-merge.yml`: squash auto-merges Dependabot patch/minor updates via `GH_ADMIN_TOKEN` (a PAT stored as a Dependabot secret, so the merge still triggers `deploy.yml`). Major bumps, and any Dependabot PR a human has pushed to, are skipped and must be merged by hand.
- The site is a client-side-routed SPA, so the CloudFront distribution needs a 403/404 → `/index.html` fallback for deep links.

## Lockfiles

`package-lock.json` is the one CI and deploy use. `yarn.lock` (Yarn 1), `bun.lock` and `bun.lockb` are also committed but are not kept in sync by Dependabot, and they are a frequent source of merge conflicts. When resolving dependency conflicts, settle `package.json` first, then regenerate with `npm install` and confirm with `npm ci`. Don't hand-merge lockfiles.

## Leftovers to be aware of

`lovable-tagger` runs in development mode (`vite.config.ts`). `index.html` still carries Lovable-hosted OG images, and the package name is `vite_react_shadcn_ts`.
