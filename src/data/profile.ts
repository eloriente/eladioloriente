// Datos personales del portfolio, extraídos del CV.
import type { Localized } from '../i18n/ui';

export interface Link {
  label: string;
  url: string;
}

export interface SkillGroup {
  title: Localized;
  items: string[];
}

export const profile = {
  name: 'Eladio Loriente',
  initials: 'EL',
  email: 'eladioloriente@gmail.com',
  location: { es: 'Valencia, España', en: 'Valencia, Spain' } satisfies Localized,
  role: {
    es: 'Desarrollador de software senior · Arquitecto front-end',
    en: 'Senior Software Engineer · Front-end Architect',
  } satisfies Localized,
  tagline: {
    es: 'Diseño y construyo aplicaciones web escalables, mantenibles y fáciles de usar para banca, industria y producto digital.',
    en: 'I design and build scalable, maintainable and easy-to-use web applications for banking, industry and digital products.',
  } satisfies Localized,
  /** Año de inicio profesional; se usa para calcular los años de experiencia. */
  careerStart: 2019,
  /** Mayor equipo liderado. */
  teamLed: 13,
  /** Párrafos de "Sobre mí". `{years}` se sustituye por los años de experiencia. */
  about: {
    es: [
      'Soy desarrollador de software con más de {years} años de experiencia, especializado en front-end (Angular, React y Next.js) y con base full stack en Node.js. Trabajo desde Valencia para clientes de toda Europa.',
      'He participado en proyectos de banca (Santander, Openbank, Banco Sabadell), automoción (Mercedes-Benz), aeronáutica (Airbus), fiscalidad (DATEV) y turismo (Avantio): desde integraciones de pago con Apple y Amazon hasta plataformas internas con IA.',
      'Además de programar, me ocupo de la arquitectura (microfrontends, microservicios), del análisis técnico y de acompañar a los equipos. He liderado un equipo de 13 desarrolladores y trabajo con metodologías ágiles.',
    ],
    en: [
      "I'm a software engineer with over {years} years of experience, specialised in front-end (Angular, React and Next.js) with a full-stack background in Node.js. I work from Valencia, Spain, with clients across Europe.",
      "I've worked on banking (Santander, Openbank, Banco Sabadell), automotive (Mercedes-Benz), aerospace (Airbus), tax (DATEV) and travel (Avantio) projects: from payment integrations with Apple and Amazon to AI-powered internal platforms.",
      "Beyond writing code, I handle architecture (micro-frontends, microservices), technical analysis and team support. I've led a team of 13 developers and work with agile methodologies.",
    ],
  } satisfies Localized<string[]>,
  /** Enlaces profesionales (LinkedIn, GitHub...). Añade aquí los tuyos. */
  links: [] as Link[],
  skills: [
    {
      title: { es: 'Front-end', en: 'Front-end' },
      items: ['TypeScript', 'Angular', 'React', 'Next.js', 'Storybook', 'Angular Material', 'Styled Components', 'i18n', 'Responsive / Mobile First'],
    },
    {
      title: { es: 'Back-end', en: 'Back-end' },
      items: ['Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL', 'Java / Spring Boot', 'Python'],
    },
    {
      title: { es: 'Testing', en: 'Testing' },
      items: ['Jest', 'Cypress', 'Playwright', 'Wiremock', 'Patrón AAA'],
    },
    {
      title: { es: 'Cloud y DevOps', en: 'Cloud & DevOps' },
      items: ['Azure', 'AWS', 'Docker', 'Jenkins', 'GitHub Actions', 'Bamboo', 'SonarQube', 'CI/CD'],
    },
    {
      title: { es: 'Arquitectura y gestión', en: 'Architecture & leadership' },
      items: ['Microfrontends', 'Microservicios', 'Webpack 5', 'Análisis y diseño de software', 'Liderazgo de equipos', 'Scrum'],
    },
  ] satisfies SkillGroup[],
  education: [
    {
      center: 'IES Serpis – Grupo Studio',
      title: {
        es: 'CFGS Desarrollo de Aplicaciones Web',
        en: 'Advanced Vocational Degree in Web Application Development',
      } satisfies Localized,
      period: '2017 – 2019',
    },
  ],
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'Alto', en: 'Proficient' } },
  ] satisfies { name: Localized; level: Localized }[],
};

/** Años de experiencia desde `careerStart` hasta la fecha de compilación. */
export function yearsOfExperience(now = new Date()): number {
  return now.getFullYear() - profile.careerStart;
}
