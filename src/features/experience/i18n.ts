import { createTranslations } from '@shared/i18n/translations';

const es = {
  title: 'Experiencia profesional',
  intro: 'Mi trayectoria en desarrollo de software: banca, automoción, aeronáutica, fiscalidad y turismo.',
  present: 'Actualidad',
  skills: 'Tecnologías y habilidades',
  education: 'Formación',
  languages: 'Idiomas',
  recent: 'Experiencia reciente',
  all: 'Ver toda la experiencia',
  links: 'Más información',
  external: '(se abre en una pestaña nueva)',
};

const en: Record<keyof typeof es, string> = {
  title: 'Professional experience',
  intro: 'My software development career: banking, automotive, aerospace, tax and travel.',
  present: 'Present',
  skills: 'Technologies and skills',
  education: 'Education',
  languages: 'Languages',
  recent: 'Recent experience',
  all: 'See all experience',
  links: 'Further reading',
  external: '(opens in a new tab)',
};

export const useExperienceTranslations = createTranslations({ es, en });
