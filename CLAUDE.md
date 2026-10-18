# CLAUDE.md

@AGENTS.md

## Qué es

"Web Portfolio": portfolio web personal y bilingüe (ES/EN) de Eladio Loriente para presentarse ante posibles clientes. Muestra su experiencia profesional, un blog con entradas y eventos, y sus proyectos personales. Prioridades: transmitir profesionalidad y confianza, mensaje claro, carga rápida, buen SEO y cero dependencias de servidor.

## Público y tono

- Público: posibles clientes (empresas y particulares) y contactos profesionales, a menudo sin perfil técnico.
- Tono profesional, cercano y directo. Frases cortas, orientadas al valor para el cliente, no a la jerga técnica.
- Cada sección debe dejar claro el siguiente paso: llamada a la acción de contacto visible.

## Rutas

- `/`: redirige a `/es/` o `/en/` según el idioma del navegador (español por defecto).
- `/[lang]/`: inicio (hero con cifras, sobre mí, experiencia reciente, proyectos destacados, últimas entradas, contacto).
- `/[lang]/experience/`: línea temporal completa, habilidades, formación e idiomas.
- `/[lang]/blog/` y `/[lang]/blog/[slug]/`: artículos y eventos.
- `/[lang]/projects/` y `/[lang]/projects/[slug]/`: proyectos personales.
- `/404`: página no encontrada.

## Stack

- Astro 7 (sitio estático, sin SSR ni adaptadores), TypeScript estricto (`astro/tsconfigs/strict`), Tailwind CSS v4 vía `@tailwindcss/vite`.
- Sin frameworks de UI (ni React ni Vue): componentes `.astro` + `<script>` en TypeScript solo cuando haga falta interactividad.
- Node ≥ 22.22 (ver `engines` en `package.json`). El Node por defecto del sistema es 22.19 y Astro no arranca con él: usar `nvm use 24` o `PATH="$HOME/.nvm/versions/node/v24.18.0/bin:$PATH"`.
- Pendiente (lo instala el usuario): Vitest para tests de `src/lib/`.

## Arquitectura

- `src/i18n/`: i18n propio, sin la config `i18n` de Astro.
  - `ui.ts`: idiomas (`es`, `en`), `defaultLang`, tipo `Localized<T>` y textos de la interfaz. `en` se tipa como `Record<UiKey, string>`, así que falta de traducción = error de tipos.
  - `utils.ts`: `useTranslations(lang)` → `t(key)`, `localizePath(lang, path)`, `intlLocale` y `langStaticPaths()` para las páginas `[lang]`.
- `src/data/profile.ts`: datos personales del CV (nombre, rol, "sobre mí", habilidades, formación, idiomas, email, enlaces).
- `src/content.config.ts` + `src/content/`: colecciones de contenido.
  - `experience.yaml`: experiencia profesional, con textos `{ es, en }` y fechas `AAAA-MM` (sin `end` = puesto actual).
  - `blog/<lang>/<slug>.md`: entradas; `type: post | event` y, si es evento, `event: { date, location, url? }`. `draft: true` las oculta.
  - `projects/<lang>/<slug>.md`: proyectos; `status: active | finished | paused`, `stack`, `repo?`, `url?`, `featured`.
  - Usa el mismo nombre de archivo en cada idioma: así el selector de idioma enlaza la traducción (si falta, enlaza al listado).
- `src/utils/collections.ts`: consultas por idioma (`getPosts`, `getProjects`, `getExperience`), `splitId` y `entryTranslations`.
- `src/lib/format.ts`: formato puro de fechas y duraciones (sin DOM ni Astro).
- `src/layouts/BaseLayout.astro`: `<head>` (title, description, Open Graph, canonical y hreflang si hay `site`), cabecera y pie. Recibe `lang`, `path` (ruta sin idioma) y `translations` opcionales.
- `src/components/`: `Header`, `LanguagePicker`, `Footer`, `Hero`, `Section`, `PageHeader`, `Timeline`, `ExperienceItem`, `PostCard`, `ProjectCard`, `ContactSection`, `ButtonLink`, `Tag`, `TagList`.
- `src/styles/global.css`: Tailwind, tokens `@theme` (`--color-brand-*`, violeta como el CV), estilos base y `.prose-content` para el Markdown. Modo oscuro con `dark:` (según `prefers-color-scheme`).

## Calidad

- Accesibilidad WCAG AA, HTML semántico, imágenes con `alt` y optimizadas con `astro:assets`.
- SEO: `title` y `description` únicos, Open Graph, sitemap cuando haya varias páginas.
- Responsive mobile-first.

## Comandos

- `npm run build`: compila el sitio.
- `npx astro check`: tipos.
- `npx astro dev --background`: servidor de desarrollo en http://localhost:4321; se para con `npx astro dev stop`.

## Reglas de trabajo (obligatorias)

- Lectura: se puede leer cualquier archivo del proyecto para tener contexto.
- Edición: solo dentro de `src/` y este `CLAUDE.md`. Lo impone el hook `.claude/hooks/restrict-edits.mjs` junto con los `deny` de `.claude/settings.json`. Los agentes de `.claude/agents/` solo editan `src/`.
- Prohibido tocar `package.json`, `package-lock.json`, `node_modules/` y `public/`.
- Comandos denegados: `git commit`, `git push`, `npm install`/`i`/`uninstall`/`update`/`pkg`, `npx astro add` y `rm -rf`. Los commits y los cambios de dependencias los hace el usuario.
- Si algo requiere cambios fuera de lo permitido, explica al usuario qué cambio haría falta en lugar de intentar esquivar la restricción (por ejemplo, con Bash).
- Los comentarios del código van en español. Todo texto visible se traduce a ES y EN (`src/i18n/ui.ts`, campos `{ es, en }` o un Markdown por idioma); nunca texto fijo en un solo idioma.

## Agentes y MCP

- `.claude/agents/`:
  - `astro-components`: componentes.
  - `astro-views`: páginas y layouts.
  - `tailwind-styles`: estilos y tokens.
- `.mcp.json`: `astro-docs` (documentación oficial de Astro). Consúltalo antes de suponer cómo funciona una API de Astro.
