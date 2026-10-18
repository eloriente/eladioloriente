import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@shared/i18n/languages';
import { entryTranslations, splitId } from '@shared/content/entries';

export type Project = CollectionEntry<'projects'>;

/** Proyectos publicados de un idioma: destacados primero y luego por fecha. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const projects = await getCollection('projects', ({ id, data }) => splitId(id).lang === lang && !data.draft);
  return projects.sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || b.data.start.valueOf() - a.data.start.valueOf(),
  );
}

/** `getStaticPaths()` de `/[lang]/projects/[slug]/`. */
export async function getProjectStaticPaths() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const ids = projects.map((p) => p.id);
  return projects.flatMap((project) => {
    const { lang, slug } = splitId(project.id);
    if (!lang) return [];
    return [{ params: { lang, slug }, props: { project, lang, translations: entryTranslations(ids, 'projects', slug) } }];
  });
}
