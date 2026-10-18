// Utilidades comunes para colecciones con un Markdown por idioma (`<lang>/<slug>.md`).
import { isLang, langs, type Lang } from '../i18n/languages';

/** Separa el id "es/mi-entrada" en idioma y slug. */
export function splitId(id: string): { lang: Lang | undefined; slug: string } {
  const [first = '', ...rest] = id.split('/');
  return { lang: isLang(first) ? first : undefined, slug: rest.join('/') };
}

/**
 * Ruta de una entrada en cada idioma: la propia entrada si está traducida
 * o, si no, el listado de la sección.
 */
export function entryTranslations(ids: string[], section: string, slug: string): Record<Lang, string> {
  return Object.fromEntries(
    langs.map((l) => [l, ids.includes(`${l}/${slug}`) ? `/${section}/${slug}/` : `/${section}/`]),
  ) as Record<Lang, string>;
}
