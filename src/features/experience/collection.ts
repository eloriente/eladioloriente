// Colección `experience`: un único YAML con textos `{ es, en }`.
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ es: z.string(), en: z.string() });
const month = z.string().regex(/^\d{4}-\d{2}$/, 'Formato AAAA-MM');

export const experience = defineCollection({
  loader: file('src/features/experience/content/experience.yaml'),
  schema: z.object({
    company: z.string(),
    client: z.string().optional(),
    role: localized,
    start: month,
    /** Sin `end`, el puesto es el actual. */
    end: month.optional(),
    summary: localized,
    highlights: z.object({ es: z.array(z.string()), en: z.array(z.string()) }).optional(),
    stack: z.array(z.string()).default([]),
    /** Enlaces externos con más detalle (notas de prensa, casos publicados...). */
    links: z.array(z.object({ label: localized, url: z.url() })).default([]),
  }),
});
