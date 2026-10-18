// Idiomas disponibles y utilidades de rutas localizadas.
export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

/** Valor traducido a todos los idiomas. */
export type Localized<T = string> = Record<Lang, T>;

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (langs as string[]).includes(value);
}

/**
 * Añade el prefijo de idioma a una ruta sin idioma.
 * `localizePath('en', '/blog/')` → `/en/blog/`.
 */
export function localizePath(lang: Lang, path = '/'): string {
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Locale de `Intl` para cada idioma. */
export const intlLocale: Localized = {
  es: 'es-ES',
  en: 'en-GB',
};

/** Rutas estáticas `[lang]` para `getStaticPaths()`. */
export function langStaticPaths() {
  return langs.map((lang) => ({ params: { lang }, props: { lang } }));
}
