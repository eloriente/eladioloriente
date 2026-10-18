import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@shared/i18n/languages';
import { entryTranslations, splitId } from '@shared/content/entries';

export type Post = CollectionEntry<'blog'>;

/** Entradas publicadas de un idioma, de más reciente a más antigua. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('blog', ({ id, data }) => splitId(id).lang === lang && !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** `getStaticPaths()` de `/[lang]/blog/[slug]/`. */
export async function getPostStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const ids = posts.map((p) => p.id);
  return posts.flatMap((post) => {
    const { lang, slug } = splitId(post.id);
    if (!lang) return [];
    return [{ params: { lang, slug }, props: { post, lang, translations: entryTranslations(ids, 'blog', slug) } }];
  });
}
