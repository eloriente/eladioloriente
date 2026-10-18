// Textos comunes de la interfaz (cabecera, pie, contacto, metadatos).
import { createTranslations } from './translations';

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
  'contact.title': '¿Trabajamos juntos?',
  'contact.text':
    'Si buscas a alguien para diseñar, construir o mejorar tu producto web, escríbeme y lo hablamos.',
  'contact.email': 'Escríbeme',
  'footer.built': 'Hecho con Astro y Tailwind CSS.',
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
  'contact.title': 'Shall we work together?',
  'contact.text':
    "If you need someone to design, build or improve your web product, drop me a line and let's talk.",
  'contact.email': 'Email me',
  'footer.built': 'Built with Astro and Tailwind CSS.',
};

export const useTranslations = createTranslations({ es, en });
