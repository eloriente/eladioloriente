import { createTranslations } from '@shared/i18n/translations';

const es = {
  greeting: 'Hola, soy',
  'cta.contact': 'Hablemos',
  'cta.experience': 'Ver mi experiencia',
  'stats.years': 'años de experiencia',
  'stats.projects': 'proyectos para clientes',
  'stats.team': 'desarrolladores liderados',
  about: 'Sobre mí',
};

const en: Record<keyof typeof es, string> = {
  greeting: "Hi, I'm",
  'cta.contact': "Let's talk",
  'cta.experience': 'See my experience',
  'stats.years': 'years of experience',
  'stats.projects': 'client projects',
  'stats.team': 'developers led',
  about: 'About me',
};

export const useHomeTranslations = createTranslations({ es, en });
