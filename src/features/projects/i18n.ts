import { createTranslations } from '@shared/i18n/translations';

const es = {
  title: 'Proyectos personales',
  intro: 'Proyectos propios en los que trabajo o he trabajado.',
  empty: 'Todavía no hay proyectos.',
  'status.active': 'En curso',
  'status.finished': 'Terminado',
  'status.paused': 'En pausa',
  repo: 'Código',
  demo: 'Ver web',
  back: 'Volver a proyectos',
  featured: 'Proyectos destacados',
  all: 'Ver todos los proyectos',
};

const en: Record<keyof typeof es, string> = {
  title: 'Side projects',
  intro: "Personal projects I'm working on or have worked on.",
  empty: 'No projects yet.',
  'status.active': 'In progress',
  'status.finished': 'Finished',
  'status.paused': 'Paused',
  repo: 'Code',
  demo: 'Visit site',
  back: 'Back to projects',
  featured: 'Featured projects',
  all: 'See all projects',
};

export const useProjectsTranslations = createTranslations({ es, en });
