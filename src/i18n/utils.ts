import { langs, ui, type Lang, type UiKey } from './ui';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (langs as string[]).includes(value);
}

/** Devuelve una función `t()` con los textos del idioma indicado. */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

/**
 * Añade el prefijo de idioma a una ruta sin idioma.
 * `localizePath('en', '/blog/')` → `/en/blog/`.
 */
export function localizePath(lang: Lang, path = '/'): string {
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Locale de `Intl` para cada idioma. */
export const intlLocale: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-GB',
};

/** Rutas estáticas `[lang]` para `getStaticPaths()`. */
export function langStaticPaths() {
  return langs.map((lang) => ({ params: { lang }, props: { lang } }));
}
