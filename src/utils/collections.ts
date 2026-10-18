// Consultas a las colecciones de contenido, filtradas por idioma.
import { getCollection, type CollectionEntry } from 'astro:content';
import { langs, type Lang } from '../i18n/ui';
import { isLang } from '../i18n/utils';

type LocalizedCollection = 'blog' | 'projects';

/** Separa el id "es/mi-entrada" en idioma y slug. */
export function splitId(id: string): { lang: Lang | undefined; slug: string } {
  const [first = '', ...rest] = id.split('/');
  return { lang: isLang(first) ? first : undefined, slug: rest.join('/') };
}

export async function getPosts(lang: Lang): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ id, data }) => splitId(id).lang === lang && !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects(lang: Lang): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection(
    'projects',
    ({ id, data }) => splitId(id).lang === lang && !data.draft,
  );
  return projects.sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || b.data.start.valueOf() - a.data.start.valueOf(),
  );
}

export async function getExperience(): Promise<CollectionEntry<'experience'>[]> {
  const items = await getCollection('experience');
  return items.sort((a, b) => b.data.start.localeCompare(a.data.start));
}

/**
 * Rutas de cada idioma para una entrada: la misma entrada si está traducida
 * o, si no, el listado de la sección.
 */
export function entryTranslations(
  entries: CollectionEntry<LocalizedCollection>[],
  section: string,
  slug: string,
): Record<Lang, string> {
  return Object.fromEntries(
    langs.map((l) => [
      l,
      entries.some((e) => e.id === `${l}/${slug}`) ? `/${section}/${slug}/` : `/${section}/`,
    ]),
  ) as Record<Lang, string>;
}
