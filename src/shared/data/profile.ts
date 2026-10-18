// Datos personales comunes a toda la web.
import type { Localized } from '../i18n/languages';

export interface Link {
  label: string;
  url: string;
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
  /** Enlaces profesionales (LinkedIn, GitHub...). Añade aquí los tuyos. */
  links: [] as Link[],
};
