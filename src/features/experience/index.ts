// API pública de la feature: lo que otras features y las páginas pueden usar.
export { default as ExperienceView } from './ExperienceView.astro';
export { default as ExperienceItem } from './components/ExperienceItem.astro';
export { default as Timeline } from './components/Timeline.astro';
export { getExperience } from './queries';
export { skills } from './data';
export { useExperienceTranslations } from './i18n';
