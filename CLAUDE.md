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
- Vitest para tests de lógica pura (`src/shared/lib/`); tipos con `astro check`.

## Arquitectura (por features)

Todo se organiza por feature (una carpeta por vista) y lo común va en `shared/`.

```text
src/
├── content.config.ts      # solo registra las colecciones de cada feature
├── pages/                 # rutas finas: getStaticPaths + <XView />, sin lógica ni marcado
├── shared/                # común a varias features
│   ├── components/        # ButtonLink, Tag, TagList, Section, PageHeader, ContactSection
│   ├── layout/            # BaseLayout, Header, Footer, LanguagePicker
│   ├── i18n/              # languages.ts, translations.ts, ui.ts (textos comunes)
│   ├── data/profile.ts    # nombre, rol, email, ubicación, enlaces
│   ├── content/entries.ts # splitId, entryTranslations (colecciones por idioma)
│   ├── lib/format.ts      # formato puro de fechas y duraciones
│   └── styles/global.css
└── features/
    ├── home/              # HomeView, Hero, data.ts (tagline, sobre mí, cifras)
    ├── experience/        # ExperienceView, ExperienceItem, Timeline, data.ts (skills, formación, idiomas), content/experience.yaml
    ├── blog/              # BlogListView, BlogPostView, PostCard, content/<lang>/<slug>.md
    ├── projects/          # ProjectListView, ProjectView, ProjectCard, content/<lang>/<slug>.md
    └── not-found/         # NotFoundView
```

Cada feature sigue la misma forma (solo los archivos que necesite):

- `<Nombre>View.astro`: vista completa que usa la página.
- `components/`: componentes propios de la feature.
- `i18n.ts`: sus textos (`es` y `en`) y su `use<Feature>Translations` creado con `createTranslations`.
- `data.ts`: datos estáticos propios.
- `collection.ts` + `content/`: su colección de contenido; se registra en `src/content.config.ts`.
- `queries.ts`: consultas a su colección y, si aplica, su `getStaticPaths`.
- `index.ts`: API pública. Las páginas y otras features importan solo desde aquí.

Reglas de dependencias:

- `shared/` no importa nada de `features/`.
- Una feature importa de `shared/` y, si compone otras (como `home`), solo desde su `index.ts`, nunca de sus archivos internos.
- Algo que usan dos o más features sube a `shared/`.
- Imports: alias `@shared/...` y `@features/<feature>` (definidos en `tsconfig.json`) para importar de otro módulo; rutas relativas solo dentro del mismo módulo (misma feature o dentro de `shared/`).

i18n propio (sin la config `i18n` de Astro):

- `shared/i18n/languages.ts`: `Lang`, `langs`, `defaultLang`, `Localized<T>`, `localizePath(lang, path)`, `intlLocale`, `langStaticPaths()`.
- `en` se tipa como `Record<keyof typeof es, string>`, así que una traducción que falte es un error de tipos.

Contenido:

- `experience.yaml`: textos `{ es, en }` y fechas `AAAA-MM` (sin `end` = puesto actual).
- Blog: `type: post | event` y, si es evento, `event: { date, location, url? }`. `draft: true` oculta la entrada.
- Proyectos: `status: active | finished | paused`, `stack`, `repo?`, `url?`, `featured`.
- Usa el mismo nombre de archivo en cada idioma: así el selector de idioma enlaza la traducción (si falta, enlaza al listado).

Estilos: `shared/styles/global.css` con Tailwind, tokens `@theme` (`--color-brand-*`, violeta como el CV), estilos base y `.prose-content` para el Markdown. Modo oscuro con `dark:` (según `prefers-color-scheme`).

## Calidad

- Accesibilidad WCAG AA, HTML semántico, imágenes con `alt` y optimizadas con `astro:assets`.
- SEO: `title` y `description` únicos, Open Graph, sitemap cuando haya varias páginas.
- Responsive mobile-first.

## Comandos

- `npm test`: tests con Vitest.
- `npm run check`: tipos.
- `npm run build`: compila el sitio.
- `npx astro dev --background`: servidor de desarrollo en http://localhost:4321; se para con `npx astro dev stop`.

## Reglas de trabajo (obligatorias)

- Lectura: se puede leer cualquier archivo del proyecto para tener contexto.
- Edición: solo dentro de `src/` y este `CLAUDE.md`. Lo impone el hook `.claude/hooks/restrict-edits.mjs` junto con los `deny` de `.claude/settings.json`. Los agentes de `.claude/agents/` solo editan `src/`.
- Prohibido tocar `package.json`, `package-lock.json`, `node_modules/` y `public/`.
- Comandos denegados: `git commit`, `git push`, `npm install`/`i`/`uninstall`/`update`/`pkg`, `npx astro add` y `rm -rf`. Los commits y los cambios de dependencias los hace el usuario.
- Si algo requiere cambios fuera de lo permitido, explica al usuario qué cambio haría falta en lugar de intentar esquivar la restricción (por ejemplo, con Bash).
- Los comentarios del código van en español. Todo texto visible se traduce a ES y EN (`i18n.ts` de la feature o `shared/i18n/ui.ts`, campos `{ es, en }` o un Markdown por idioma); nunca texto fijo en un solo idioma.

## Agentes y MCP

- `.claude/agents/`:
  - `astro-components`: componentes.
  - `astro-views`: páginas y layouts.
  - `tailwind-styles`: estilos y tokens.
- `.mcp.json`: `astro-docs` (documentación oficial de Astro). Consúltalo antes de suponer cómo funciona una API de Astro.
