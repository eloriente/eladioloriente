// `sitemap.xml`: todas las páginas indexables con sus traducciones (`hreflang`).
import type { APIRoute } from 'astro';
import { translatedLangs } from '@shared/content/entries';
import { profile } from '@shared/data/profile';
import { defaultLang, langs, localizePath, type Lang } from '@shared/i18n/languages';
import { absoluteUrl, buildSitemapXml, type SitemapEntry } from '@shared/lib/seo';
import { getPostStaticPaths } from '@features/blog';
import { getProjectStaticPaths } from '@features/projects';

/** Secciones fijas, presentes en todos los idiomas. */
const staticPaths = ['/', '/experience/', '/blog/', '/projects/'];

interface Page {
  lang: Lang;
  /** Ruta sin idioma en cada idioma. */
  translations: Record<Lang, string>;
  /** Idiomas con traducción real. */
  available: Lang[];
  lastmod?: Date;
}

function toEntry(page: Page, site: URL): SitemapEntry {
  const href = (l: Lang) => absoluteUrl(localizePath(l, page.translations[l]), site);
  const alternates =
    page.available.length > 1
      ? [
          ...page.available.map((l) => ({ hreflang: l, href: href(l) })),
          ...(page.available.includes(defaultLang) ? [{ hreflang: 'x-default', href: href(defaultLang) }] : []),
        ]
      : [];
  return { loc: href(page.lang), lastmod: page.lastmod, alternates };
}

export const GET: APIRoute = async ({ site: configSite }) => {
  const site = configSite ?? new URL(profile.url);
  const pages: Page[] = staticPaths.flatMap((path) =>
    langs.map((lang) => ({
      lang,
      translations: Object.fromEntries(langs.map((l) => [l, path])) as Record<Lang, string>,
      available: langs,
    })),
  );

  for (const { props } of await getPostStaticPaths()) {
    pages.push({
      lang: props.lang,
      translations: props.translations,
      available: translatedLangs(props.translations, 'blog'),
      lastmod: props.post.data.date,
    });
  }
  for (const { props } of await getProjectStaticPaths()) {
    pages.push({
      lang: props.lang,
      translations: props.translations,
      available: translatedLangs(props.translations, 'projects'),
    });
  }

  return new Response(buildSitemapXml(pages.map((p) => toEntry(p, site))), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
