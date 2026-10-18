// Idiomas disponibles y textos de la interfaz.
export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

/** Valor traducido a todos los idiomas. */
export type Localized<T = string> = Record<Lang, T>;

const es = {
  'site.description':
    'Portfolio de Eladio Loriente, desarrollador de software senior y arquitecto front-end en Valencia.',
  skip: 'Saltar al contenido',
  'nav.label': 'Navegación principal',
  'nav.experience': 'Experiencia',
  'nav.projects': 'Proyectos',
  'nav.blog': 'Blog',
  'nav.contact': 'Contacto',
  'lang.label': 'Idioma',

  'hero.greeting': 'Hola, soy',
  'hero.cta.contact': 'Hablemos',
  'hero.cta.experience': 'Ver mi experiencia',
  'hero.stats.years': 'años de experiencia',
  'hero.stats.projects': 'proyectos para clientes',
  'hero.stats.team': 'desarrolladores liderados',

  'home.about.title': 'Sobre mí',
  'home.experience.title': 'Experiencia reciente',
  'home.experience.all': 'Ver toda la experiencia',
  'home.projects.title': 'Proyectos destacados',
  'home.projects.all': 'Ver todos los proyectos',
  'home.blog.title': 'Últimas entradas',
  'home.blog.all': 'Ver el blog',

  'experience.title': 'Experiencia profesional',
  'experience.intro':
    'Mi trayectoria en desarrollo de software: banca, automoción, aeronáutica, fiscalidad y turismo.',
  'experience.present': 'Actualidad',
  'experience.for': 'para',
  'experience.skills': 'Tecnologías y habilidades',
  'experience.education': 'Formación',
  'experience.languages': 'Idiomas',

  'blog.title': 'Blog y eventos',
  'blog.intro': 'Artículos, notas y eventos en los que participo.',
  'blog.empty': 'Todavía no hay entradas.',
  'blog.type.post': 'Artículo',
  'blog.type.event': 'Evento',
  'blog.back': 'Volver al blog',
  'blog.event.when': 'Fecha',
  'blog.event.where': 'Lugar',
  'blog.event.link': 'Web del evento',

  'projects.title': 'Proyectos personales',
  'projects.intro': 'Proyectos propios en los que trabajo o he trabajado.',
  'projects.empty': 'Todavía no hay proyectos.',
  'projects.status.active': 'En curso',
  'projects.status.finished': 'Terminado',
  'projects.status.paused': 'En pausa',
  'projects.repo': 'Código',
  'projects.demo': 'Ver web',
  'projects.back': 'Volver a proyectos',

  'contact.title': '¿Trabajamos juntos?',
  'contact.text':
    'Si buscas a alguien para diseñar, construir o mejorar tu producto web, escríbeme y lo hablamos.',
  'contact.email': 'Escríbeme',

  'footer.built': 'Hecho con Astro y Tailwind CSS.',

  'notFound.title': 'Página no encontrada',
  'notFound.text': 'La página que buscas no existe o se ha movido.',
  'notFound.back': 'Volver al inicio',
};

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  'site.description':
    'Portfolio of Eladio Loriente, senior software engineer and front-end architect based in Valencia, Spain.',
  skip: 'Skip to content',
  'nav.label': 'Main navigation',
  'nav.experience': 'Experience',
  'nav.projects': 'Projects',
  'nav.blog': 'Blog',
  'nav.contact': 'Contact',
  'lang.label': 'Language',

  'hero.greeting': "Hi, I'm",
  'hero.cta.contact': "Let's talk",
  'hero.cta.experience': 'See my experience',
  'hero.stats.years': 'years of experience',
  'hero.stats.projects': 'client projects',
  'hero.stats.team': 'developers led',

  'home.about.title': 'About me',
  'home.experience.title': 'Recent experience',
  'home.experience.all': 'See all experience',
  'home.projects.title': 'Featured projects',
  'home.projects.all': 'See all projects',
  'home.blog.title': 'Latest posts',
  'home.blog.all': 'Go to the blog',

  'experience.title': 'Professional experience',
  'experience.intro':
    'My software development career: banking, automotive, aerospace, tax and travel.',
  'experience.present': 'Present',
  'experience.for': 'for',
  'experience.skills': 'Technologies and skills',
  'experience.education': 'Education',
  'experience.languages': 'Languages',

  'blog.title': 'Blog and events',
  'blog.intro': 'Articles, notes and events I take part in.',
  'blog.empty': 'No posts yet.',
  'blog.type.post': 'Article',
  'blog.type.event': 'Event',
  'blog.back': 'Back to the blog',
  'blog.event.when': 'Date',
  'blog.event.where': 'Location',
  'blog.event.link': 'Event website',

  'projects.title': 'Side projects',
  'projects.intro': "Personal projects I'm working on or have worked on.",
  'projects.empty': 'No projects yet.',
  'projects.status.active': 'In progress',
  'projects.status.finished': 'Finished',
  'projects.status.paused': 'Paused',
  'projects.repo': 'Code',
  'projects.demo': 'Visit site',
  'projects.back': 'Back to projects',

  'contact.title': 'Shall we work together?',
  'contact.text':
    "If you need someone to design, build or improve your web product, drop me a line and let's talk.",
  'contact.email': 'Email me',

  'footer.built': 'Built with Astro and Tailwind CSS.',

  'notFound.title': 'Page not found',
  'notFound.text': "The page you're looking for doesn't exist or has moved.",
  'notFound.back': 'Back to home',
};

export const ui = { es, en } satisfies Record<Lang, Record<UiKey, string>>;
