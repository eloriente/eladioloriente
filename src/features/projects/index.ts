// API pública de la feature: lo que otras features y las páginas pueden usar.
export { default as ProjectListView } from './ProjectListView.astro';
export { default as ProjectView } from './ProjectView.astro';
export { default as ProjectCard } from './components/ProjectCard.astro';
export { getProjects, getProjectStaticPaths } from './queries';
export { useProjectsTranslations } from './i18n';
