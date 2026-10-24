// Datos personales comunes a toda la web.
import type { Localized } from "../i18n/languages";
import photo from "../assets/profile.png";

export interface Link {
  label: string;
  url: string;
}

export const profile = {
  name: "Eladio Loriente",
  initials: "EL",
  /** Foto de perfil; se optimiza con `astro:assets`. */
  photo,
  photoAlt: {
    es: "Foto de Eladio Loriente",
    en: "Photo of Eladio Loriente",
  } satisfies Localized,
  email: "eladioloriente@gmail.com",
  location: {
    es: "Valencia, España",
    en: "Valencia, Spain",
  } satisfies Localized,
  role: {
    es: "Desarrollador de software senior · Arquitecto front-end",
    en: "Senior Software Engineer · Front-end Architect",
  } satisfies Localized,
  /** Enlaces profesionales (LinkedIn, GitHub...). Añade aquí los tuyos. */
  links: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/eladioloriente/",
    },
    {
      label: "GitHub",
      url: "https://github.com/eloriente",
    },
  ] as Link[],
};
