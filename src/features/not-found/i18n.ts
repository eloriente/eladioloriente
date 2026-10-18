import { createTranslations } from '@shared/i18n/translations';

const es = {
  title: 'Página no encontrada',
  text: 'La página que buscas no existe o se ha movido.',
  back: 'Volver al inicio',
};

const en: Record<keyof typeof es, string> = {
  title: 'Page not found',
  text: "The page you're looking for doesn't exist or has moved.",
  back: 'Back to home',
};

export const useNotFoundTranslations = createTranslations({ es, en });
