// Colecciones de contenido: experiencia (YAML), blog y proyectos (Markdown por idioma).
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ es: z.string(), en: z.string() });
const month = z.string().regex(/^\d{4}-\d{2}$/, 'Formato AAAA-MM');

const experience = defineCollection({
  loader: file('src/content/experience.yaml'),
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
  }),
});

// Las entradas viven en `src/content/blog/<idioma>/<slug>.md`.
// Usa el mismo nombre de archivo en cada idioma para enlazar las traducciones.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
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

// Los proyectos viven en `src/content/projects/<idioma>/<slug>.md`.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
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

export const collections = { experience, blog, projects };
