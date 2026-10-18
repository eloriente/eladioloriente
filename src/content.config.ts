// Registro de colecciones. Cada feature define la suya en `features/<feature>/collection.ts`.
import { blog } from '@features/blog/collection';
import { experience } from '@features/experience/collection';
import { projects } from '@features/projects/collection';

export const collections = { experience, blog, projects };
