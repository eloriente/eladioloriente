// Utilidades puras de SEO: URLs absolutas, sitemap, robots.txt y datos estructurados (JSON-LD).

/** URL absoluta de una ruta del sitio. */
export function absoluteUrl(path: string, site: URL | string): string {
  return new URL(path, site).href;
}

export interface SitemapAlternate {
  /** Código de idioma (`es`, `en`) o `x-default`. */
  hreflang: string;
  href: string;
}

export interface SitemapEntry {
  loc: string;
  lastmod?: Date;
  /** Versiones de la misma página en otros idiomas, incluida la propia. */
  alternates?: SitemapAlternate[];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** XML del sitemap con enlaces `hreflang` entre traducciones. */
export function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries.map(({ loc, lastmod, alternates = [] }) => {
    const lines = [`    <loc>${escapeXml(loc)}</loc>`];
    if (lastmod) lines.push(`    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>`);
    for (const a of alternates) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${escapeXml(a.hreflang)}" href="${escapeXml(a.href)}"/>`);
    }
    return `  <url>\n${lines.join('\n')}\n  </url>`;
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

/** Contenido de `robots.txt`: permite todo y enlaza el sitemap. */
export function buildRobotsTxt(sitemapUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
}

/**
 * Serializa JSON-LD para un `<script type="application/ld+json">`.
 * Escapa `<` para que ningún texto pueda cerrar la etiqueta `<script>`.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export interface PersonSchemaInput {
  name: string;
  jobTitle: string;
  url: string;
  image?: string;
  email?: string;
  locality?: string;
  country?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

/** Datos estructurados `Person` (schema.org). */
export function personSchema(p: PersonSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    // Un único `@id` por persona en todo el sitio, sea cual sea el idioma.
    '@id': new URL('/#person', p.url).href,
    name: p.name,
    jobTitle: p.jobTitle,
    url: p.url,
    ...(p.image && { image: p.image }),
    ...(p.email && { email: `mailto:${p.email}` }),
    ...(p.locality && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: p.locality,
        ...(p.country && { addressCountry: p.country }),
      },
    }),
    ...(p.sameAs?.length && { sameAs: p.sameAs }),
    ...(p.knowsAbout?.length && { knowsAbout: p.knowsAbout }),
  };
}

export interface WebSiteSchemaInput {
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  /** `@id` de la persona autora (ver `personSchema`). */
  authorId: string;
}

/** Datos estructurados `WebSite` (schema.org). */
export function webSiteSchema(w: WebSiteSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: w.name,
    url: w.url,
    description: w.description,
    inLanguage: w.inLanguage,
    author: { '@id': w.authorId },
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  datePublished: Date;
  inLanguage: string;
  authorName: string;
  authorUrl: string;
  image?: string;
  keywords?: string[];
}

/** Datos estructurados `BlogPosting` (schema.org). */
export function blogPostingSchema(a: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.headline,
    description: a.description,
    url: a.url,
    mainEntityOfPage: a.url,
    datePublished: a.datePublished.toISOString(),
    inLanguage: a.inLanguage,
    author: { '@type': 'Person', name: a.authorName, url: a.authorUrl },
    ...(a.image && { image: a.image }),
    ...(a.keywords?.length && { keywords: a.keywords.join(', ') }),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/** Datos estructurados `BreadcrumbList` (schema.org). */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
