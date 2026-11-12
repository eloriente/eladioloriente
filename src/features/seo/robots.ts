// `robots.txt`: permite rastrear todo el sitio y enlaza el sitemap.
import type { APIRoute } from 'astro';
import { profile } from '@shared/data/profile';
import { absoluteUrl, buildRobotsTxt } from '@shared/lib/seo';

export const GET: APIRoute = ({ site }) =>
  new Response(buildRobotsTxt(absoluteUrl('/sitemap.xml', site ?? new URL(profile.url))), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
