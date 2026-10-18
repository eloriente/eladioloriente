import { getCollection, type CollectionEntry } from 'astro:content';

export type ExperienceEntry = CollectionEntry<'experience'>;

/** Experiencia ordenada de más reciente a más antigua. */
export async function getExperience(): Promise<ExperienceEntry[]> {
  const items = await getCollection('experience');
  return items.sort((a, b) => b.data.start.localeCompare(a.data.start));
}
