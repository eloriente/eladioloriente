import type { Lang } from './languages';

/**
 * Crea el `useTranslations` de un diccionario. Cada feature define el suyo:
 *
 * ```ts
 * const es = { title: 'Hola' };
 * const en: Record<keyof typeof es, string> = { title: 'Hello' };
 * export const useXTranslations = createTranslations({ es, en });
 * ```
 *
 * Tipar `en` a partir de `es` hace que una traducción que falte sea un error de tipos.
 */
export function createTranslations<K extends string>(dictionary: Record<Lang, Record<K, string>>) {
  return (lang: Lang) =>
    (key: K): string =>
      dictionary[lang][key];
}
