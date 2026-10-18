// Colección `projects`: `content/<idioma>/<slug>.md`, mismo nombre de archivo en cada idioma.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/features/projects/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'finished', 'paused']),
    start: z.coerce.date(),
    stack: z.array(z.string()).default([]),
    repo: z.url().optional(),
    url: z.url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
