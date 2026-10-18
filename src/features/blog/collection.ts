// Colección `blog`: `content/<idioma>/<slug>.md`, mismo nombre de archivo en cada idioma.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/features/blog/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    type: z.enum(['post', 'event']).default('post'),
    event: z
      .object({
        date: z.coerce.date(),
        location: z.string(),
        url: z.url().optional(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
