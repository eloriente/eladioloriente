// Presentación de la portada (extraída del CV).
import type { Localized } from '@shared/i18n/languages';

export const tagline: Localized = {
  es: 'Diseño y construyo aplicaciones web escalables, mantenibles y fáciles de usar para banca, industria y producto digital.',
  en: 'I design and build scalable, maintainable and easy-to-use web applications for banking, industry and digital products.',
};

/** Año de inicio profesional; se usa para calcular los años de experiencia. */
export const careerStart = 2019;

/** Mayor equipo liderado. */
export const teamLed = 13;

/** Párrafos de "Sobre mí". `{years}` se sustituye por los años de experiencia. */
export const about: Localized<string[]> = {
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
};

/** Años de experiencia desde `careerStart` hasta la fecha de compilación. */
export function yearsOfExperience(now = new Date()): number {
  return now.getFullYear() - careerStart;
}
