// Habilidades, formación e idiomas (extraídos del CV).
import type { Localized } from '@shared/i18n/languages';

export interface SkillGroup {
  title: Localized;
  items: string[];
}

export const skills: SkillGroup[] = [
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
];

export const education: { center: string; title: Localized; period: string }[] = [
  {
    center: 'IES Serpis – Grupo Studio',
    title: {
      es: 'CFGS Desarrollo de Aplicaciones Web',
      en: 'Advanced Vocational Degree in Web Application Development',
    },
    period: '2017 – 2019',
  },
];

export const spokenLanguages: { name: Localized; level: Localized }[] = [
  { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
  { name: { es: 'Inglés', en: 'English' }, level: { es: 'Alto', en: 'Proficient' } },
];
