import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  blogPostingSchema,
  breadcrumbSchema,
  buildRobotsTxt,
  buildSitemapXml,
  personSchema,
  serializeJsonLd,
} from './seo';

describe('absoluteUrl', () => {
  it('combina la ruta con el dominio', () => {
    expect(absoluteUrl('/es/blog/', 'https://example.com')).toBe('https://example.com/es/blog/');
  });
});

describe('buildSitemapXml', () => {
  it('incluye loc, lastmod y alternates escapados', () => {
    const xml = buildSitemapXml([
      {
        loc: 'https://example.com/es/?a=1&b=2',
        lastmod: new Date('2026-05-03T10:00:00Z'),
        alternates: [
          { hreflang: 'es', href: 'https://example.com/es/' },
          { hreflang: 'x-default', href: 'https://example.com/es/' },
        ],
      },
    ]);
    expect(xml).toContain('<loc>https://example.com/es/?a=1&amp;b=2</loc>');
    expect(xml).toContain('<lastmod>2026-05-03</lastmod>');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/es/"/>');
    expect(xml.startsWith('<?xml')).toBe(true);
  });
});

describe('buildRobotsTxt', () => {
  it('enlaza el sitemap', () => {
    expect(buildRobotsTxt('https://example.com/sitemap.xml')).toContain('Sitemap: https://example.com/sitemap.xml');
  });
});

describe('serializeJsonLd', () => {
  it('evita que el texto cierre la etiqueta script', () => {
    expect(serializeJsonLd({ a: '</script>' })).not.toContain('</script>');
  });
});

describe('schemas', () => {
  it('Person omite los campos vacíos', () => {
    const person = personSchema({ name: 'Ana', jobTitle: 'Dev', url: 'https://example.com/' });
    expect(person).not.toHaveProperty('sameAs');
    expect(person['@id']).toBe('https://example.com/#person');
  });

  it('BlogPosting usa fecha ISO y une las palabras clave', () => {
    const post = blogPostingSchema({
      headline: 'Hola',
      description: 'Desc',
      url: 'https://example.com/es/blog/hola/',
      datePublished: new Date('2026-01-01T00:00:00Z'),
      inLanguage: 'es-ES',
      authorName: 'Ana',
      authorUrl: 'https://example.com/',
      keywords: ['react', 'a11y'],
    });
    expect(post.datePublished).toBe('2026-01-01T00:00:00.000Z');
    expect(post.keywords).toBe('react, a11y');
  });

  it('BreadcrumbList numera desde 1', () => {
    const crumbs = breadcrumbSchema([
      { name: 'Inicio', url: 'https://example.com/es/' },
      { name: 'Blog', url: 'https://example.com/es/blog/' },
    ]);
    expect(crumbs.itemListElement.map((i) => i.position)).toEqual([1, 2]);
  });
});
