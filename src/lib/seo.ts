// Per-route SEO metadata. Shared by the build-time plugin in vite.config.ts
// (which writes one HTML file per route plus sitemap.xml) and the runtime
// usePageMeta hook, so this module must only use relative imports.
import { mockArticles } from '../data/mockArticles';

export const SITE_URL = 'https://www.rails-dev.com';
export const SITE_NAME = 'RailsDev';

const AUTHOR_NAME = 'Khiev Sokmesa';
const AUTHOR_SAME_AS = [
  'https://www.linkedin.com/in/sokmesa-khiev-38a4b030/',
  'https://github.com/sokmesakhiev',
];

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  type: 'website' | 'article' | 'profile';
  lastModified?: string;
  jsonLd: Record<string, unknown>;
}

// Each route is generated as <path>/index.html, which S3 serves at the
// trailing-slash URL, so that is the canonical form.
export const normalizePath = (pathname: string) =>
  pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}/`;

export const canonicalUrl = (path: string) => `${SITE_URL}${normalizePath(path)}`;

const personId = `${SITE_URL}/#person`;
const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

const person = {
  '@type': 'Person',
  '@id': personId,
  name: AUTHOR_NAME,
  url: canonicalUrl('/portfolio'),
  sameAs: AUTHOR_SAME_AS,
  knowsAbout: ['Ruby on Rails', 'ReactJS', 'Web Application Development'],
};

const organization = {
  '@type': 'ProfessionalService',
  '@id': organizationId,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description:
    'Ruby on Rails and ReactJS consulting: scalable, high-performance web applications from MVP to enterprise.',
  founder: { '@id': personId },
  sameAs: AUTHOR_SAME_AS,
};

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { '@id': organizationId },
};

const graph = (...nodes: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});

const webPage = (type: string, path: string, name: string, description: string) => ({
  '@type': type,
  '@id': canonicalUrl(path),
  url: canonicalUrl(path),
  name,
  description,
  isPartOf: { '@id': websiteId },
});

export const pageMetas: PageMeta[] = [
  {
    path: '/',
    title: 'RailsDev - Ruby on Rails & ReactJS Development Experts',
    description:
      'Expert consulting in Ruby on Rails and ReactJS development. Building scalable, high-performance web applications for startups and enterprises.',
    type: 'website',
    jsonLd: graph(website, organization, person),
  },
  {
    path: '/portfolio',
    title: `Portfolio - ${AUTHOR_NAME} | ${SITE_NAME}`,
    description:
      'Professional experience and background of Khiev Sokmesa, Ruby on Rails and ReactJS engineer and technology leader.',
    type: 'profile',
    jsonLd: graph(
      { ...webPage('ProfilePage', '/portfolio', 'Portfolio', 'Professional experience and background'), mainEntity: { '@id': personId } },
      person,
    ),
  },
  {
    path: '/projects',
    title: `Projects | ${SITE_NAME}`,
    description:
      'Featured Ruby on Rails and ReactJS projects, including Rally, certificate verification, and dashboard & reporting systems.',
    type: 'website',
    jsonLd: graph(webPage('CollectionPage', '/projects', 'Projects', 'Featured work & accomplishments')),
  },
  {
    path: '/articles',
    title: `Articles - Ruby on Rails & ReactJS Best Practices | ${SITE_NAME}`,
    description:
      'Articles and insights on Ruby on Rails, ReactJS, full-stack development and DevOps best practices.',
    type: 'website',
    jsonLd: graph({
      ...webPage('Blog', '/articles', 'Articles', 'Best practices & insights'),
      publisher: { '@id': organizationId },
    }),
  },
  ...mockArticles.map((article): PageMeta => {
    const path = `/articles/${article.id}`;
    return {
      path,
      title: `${article.title} | ${SITE_NAME}`,
      description: article.excerpt,
      type: 'article',
      lastModified: article.publishedAt,
      jsonLd: graph({
        '@type': 'BlogPosting',
        '@id': canonicalUrl(path),
        mainEntityOfPage: canonicalUrl(path),
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        author: { '@type': 'Person', name: article.author, url: canonicalUrl('/portfolio') },
        publisher: { '@id': organizationId },
        keywords: article.tags.join(', '),
        ...(article.imageUrl ? { image: article.imageUrl } : {}),
      }),
    };
  }),
];

export const findPageMeta = (pathname: string) =>
  pageMetas.find((meta) => normalizePath(meta.path) === normalizePath(pathname));

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// `<` is escaped so article text can never close the script tag early.
export const serializeJsonLd = (jsonLd: Record<string, unknown>) =>
  JSON.stringify(jsonLd).replace(/</g, '\\u003c');

export const SEO_START = '<!--seo:start-->';
export const SEO_END = '<!--seo:end-->';

// Markup for the per-page <head> tags. The data-seo / id attributes are what
// usePageMeta looks up to update the same tags on client-side navigation.
export const renderHeadTags = (meta: PageMeta) => {
  const url = canonicalUrl(meta.path);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  return [
    SEO_START,
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json" id="seo-jsonld">${serializeJsonLd(meta.jsonLd)}</script>`,
    SEO_END,
  ].join('\n    ');
};

export const renderSitemap = () => {
  const urls = pageMetas
    .map((meta) => {
      const lastmod = meta.lastModified ? `\n    <lastmod>${meta.lastModified}</lastmod>` : '';
      return `  <url>\n    <loc>${canonicalUrl(meta.path)}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
