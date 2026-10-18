import { createTranslations } from '@shared/i18n/translations';

const es = {
  title: 'Blog y eventos',
  intro: 'Artículos, notas y eventos en los que participo.',
  empty: 'Todavía no hay entradas.',
  'type.post': 'Artículo',
  'type.event': 'Evento',
  back: 'Volver al blog',
  'event.when': 'Fecha',
  'event.where': 'Lugar',
  'event.link': 'Web del evento',
  latest: 'Últimas entradas',
  all: 'Ver el blog',
};

const en: Record<keyof typeof es, string> = {
  title: 'Blog and events',
  intro: 'Articles, notes and events I take part in.',
  empty: 'No posts yet.',
  'type.post': 'Article',
  'type.event': 'Event',
  back: 'Back to the blog',
  'event.when': 'Date',
  'event.where': 'Location',
  'event.link': 'Event website',
  latest: 'Latest posts',
  all: 'Go to the blog',
};

export const useBlogTranslations = createTranslations({ es, en });
