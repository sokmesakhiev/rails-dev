# RailsDev

Source for [www.rails-dev.com](https://www.rails-dev.com), the website of RailsDev, a software consultancy for Ruby on Rails, React and the cloud. It has a home page (services, tech stack, about), a portfolio/CV, projects and articles, in English, Spanish, French and Khmer.

It's a static site: a React single-page app that is **prerendered to HTML at build time**, served from S3 behind CloudFront. There is no backend; all content lives in this repo.

> Despite the name, there is no Rails code here. The site is about Rails consulting.

## Tech stack

- **React 19** + **TypeScript**, built with **Vite 8**
- **Tailwind CSS v4** (configured in `src/index.css`, no `tailwind.config`) and **shadcn/ui** components
- **React Router 7**; every route is prerendered to its own `index.html` for search engines and fast first paint
- **i18next** for translations (`en`, `es`, `fr`, `km`)
- **react-markdown** for articles, with Mermaid diagrams loaded on demand
- **Cal.com** embed for booking calls

## Getting started

Requires **Node.js 24** (what CI and deploy use) and **npm**.

```bash
npm ci          # install exactly what's in package-lock.json
npm run dev     # http://localhost:8080
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload on port 8080 |
| `npm run build` | Production build: client bundle, server bundle, then prerender every page into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript for the app and the prerender entry (the build doesn't type-check) |

There's no test suite. Before opening a PR, run `npm run lint`, `npm run typecheck` and `npm run build`, then check the pages you changed in the browser. CI runs the same three commands.

## Editing content

Everything is in the source; there is no CMS.

| To change… | Edit |
| --- | --- |
| Articles | `src/data/mockArticles.ts`. `content` is Markdown; `category` is one of `rails`, `react`, `fullstack`, `devops`. Use a ```` ```mermaid ```` block for a diagram. |
| Projects | The array in `src/pages/Projects.tsx`. Titles are literal; descriptions are translation keys under `projects`. |
| Portfolio / CV | The array in `src/pages/Portfolio.tsx` (English only). |
| Tech Stack section | `src/data/techStack.ts`, grouped by capability. Each group's `projects` must match titles on the Projects page. Logos come from [`simple-icons`](https://simpleicons.org). |
| Any other text | `src/i18n/locales/{en,es,fr,km}.json`. **Add every new key to all four files.** |
| "Book a call" | Set `CAL_LINK` in `src/lib/booking.ts` to your Cal.com event (`"username/event-slug"`). While it's empty, the button opens an email instead. Booking questions and spam protection are set on the Cal.com event. |
| Link-preview image | Edit `scripts/og-image.html`, then regenerate `public/og-image.png` (the command is in that file). |

**Adding a page:** add the route in `src/App.tsx` (above the `*` catch-all) and an entry in `src/lib/seo.ts`, so it gets its own prerendered HTML, title, description and sitemap entry.

## How the build works

`npm run build` runs three steps:

1. `vite build` builds the browser bundle and writes one HTML file per page in `src/lib/seo.ts`, each with its own title, meta tags and structured data, plus `sitemap.xml`.
2. `vite build --ssr src/entry-server.tsx` builds a Node version of the app.
3. `scripts/prerender.mjs` renders each page into its HTML file.

In the browser, React then *hydrates* the prerendered HTML instead of rebuilding it. So components must render the same on the server and in the browser: don't read `window`, `document` or `localStorage` while rendering (use effects or event handlers), and import browser-only libraries lazily.

## Branches, CI and deployment

- **`develop`** is the default branch. Open PRs against it.
- **`main`** is production. Every push to `main` deploys.
- **CI** (`.github/workflows/ci.yml`) runs `npm ci`, lint, type-check and build on every PR.
- **Deploy** (`.github/workflows/deploy.yml`) builds, syncs `dist/` to S3, invalidates CloudFront and posts the result to Telegram. It needs these repository secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DIST_ID`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- The CloudFront distribution needs custom error responses that map 403/404 to `/index.html`, so links to unknown paths still load the app.

## Dependencies

- **npm only.** `package-lock.json` is the single lockfile, and CI and deploy install with `npm ci`, so a lockfile out of sync with `package.json` fails the build. Don't commit `yarn.lock` or `bun.lock`. To resolve a dependency conflict, fix `package.json`, run `npm install`, and confirm with `npm ci`; don't hand-merge the lockfile.
- **Dependabot** opens weekly PRs. Patch and minor updates are set to auto-merge, so GitHub merges them on its own (it waits for CI only if branch protection requires CI to pass). Major updates need a person: check them locally with lint, type-check and build first. A major bump often breaks an unused shadcn component in `src/components/ui/`; if nothing imports it, delete the component and its package instead of porting it.

## More detail

[`CLAUDE.md`](CLAUDE.md) has the full technical notes: routing and scrolling, prerender and hydration rules, translations, booking, styling conventions, and known leftovers from the original Lovable template.
