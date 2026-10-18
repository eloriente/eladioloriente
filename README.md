# Web Portfolio

Portfolio personal y bilingüe (español e inglés) de **Eladio Loriente**, desarrollador de software senior y arquitecto front-end. Reúne la experiencia profesional, un blog con artículos y eventos, y los proyectos personales, pensado para presentarse ante posibles clientes.

Es un sitio estático: no necesita servidor ni base de datos.

## Stack

- [Astro 7](https://astro.build) (sitio estático) con TypeScript estricto.
- [Tailwind CSS v4](https://tailwindcss.com) vía `@tailwindcss/vite`.
- Colecciones de contenido de Astro (Markdown y YAML).
- i18n propio, sin dependencias.
- Vitest para tests y `astro check` para tipos.

## Requisitos

- Node.js ≥ 22.22 (recomendado Node 24: `nvm use 24`).

## Comandos

| Comando           | Qué hace                                           |
| :---------------- | :------------------------------------------------- |
| `npm install`     | Instala las dependencias.                          |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`. |
| `npm run build`   | Compila el sitio en `./dist/`.                     |
| `npm run preview` | Sirve la compilación localmente.                   |
| `npm run check`   | Comprueba tipos con `astro check`.                 |
| `npm test`        | Ejecuta los tests con Vitest.                      |

## Rutas

| Ruta                       | Contenido                                                                         |
| :------------------------- | :-------------------------------------------------------------------------------- |
| `/`                        | Redirige a `/es/` o `/en/` según el idioma del navegador.                         |
| `/[lang]/`                 | Inicio: presentación, sobre mí, experiencia reciente, proyectos, blog y contacto. |
| `/[lang]/experience/`      | Trayectoria completa, habilidades, formación e idiomas.                           |
| `/[lang]/blog/`            | Artículos y eventos.                                                              |
| `/[lang]/blog/[slug]/`     | Entrada o evento.                                                                 |
| `/[lang]/projects/`        | Proyectos personales.                                                             |
| `/[lang]/projects/[slug]/` | Detalle de un proyecto.                                                           |

## Estructura

El código se organiza por features (una carpeta por vista); lo común va en `shared/`.

```text
src/
├── content.config.ts      # registra las colecciones de cada feature
├── pages/                 # rutas finas: solo getStaticPaths + la vista
├── shared/
│   ├── components/        # componentes comunes (botones, etiquetas, secciones...)
│   ├── layout/            # BaseLayout, cabecera, pie y selector de idioma
│   ├── i18n/              # idiomas, rutas localizadas y textos comunes
│   ├── data/profile.ts    # nombre, rol, email, ubicación y enlaces
│   ├── content/           # utilidades para contenido por idioma
│   ├── lib/               # funciones puras (formato de fechas...)
│   └── styles/global.css  # Tailwind, tokens de marca y estilos del Markdown
└── features/
    ├── home/
    ├── experience/
    ├── blog/
    ├── projects/
    └── not-found/
```

Cada feature tiene, según lo que necesite:

- `<Nombre>View.astro`: la vista completa.
- `components/`: sus componentes.
- `i18n.ts`: sus textos en español e inglés.
- `data.ts`: datos estáticos.
- `collection.ts` y `content/`: su colección de contenido.
- `queries.ts`: consultas al contenido.
- `index.ts`: su API pública; el resto del proyecto importa solo desde aquí.

## Editar el contenido

### Datos personales

- Nombre, rol, email, ubicación y enlaces (LinkedIn, GitHub...): `src/shared/data/profile.ts`.
- Presentación, "Sobre mí" y cifras de la portada: `src/features/home/data.ts`.
- Habilidades, formación e idiomas: `src/features/experience/data.ts`.

### Experiencia

Añade una entrada en `src/features/experience/content/experience.yaml`. Las fechas van en formato `AAAA-MM`; sin `end`, el puesto se muestra como actual.

```yaml
- id: empresa-cliente
  company: Empresa
  client: Cliente
  role:
    es: Desarrollador front-end
    en: Front-end Developer
  start: "2026-01"
  summary:
    es: Qué hiciste y para quién.
    en: What you did and for whom.
  highlights:
    es: [Logro 1, Logro 2]
    en: [Achievement 1, Achievement 2]
  stack: [TypeScript, Angular]
```

### Entradas del blog y eventos

Crea un Markdown por idioma con **el mismo nombre de archivo**, así el selector de idioma enlaza las dos versiones:

- `src/features/blog/content/es/mi-entrada.md`
- `src/features/blog/content/en/mi-entrada.md`

```md
---
title: Título
description: Resumen corto.
date: 2026-10-18
tags: [astro]
# Para un evento:
# type: event
# event:
#   date: 2026-11-20
#   location: Valencia
#   url: https://...
# draft: true   # oculta la entrada
---

Contenido en Markdown.
```

Hay una plantilla de evento en `src/features/blog/content/es/example-event.md`.

### Proyectos

Igual que el blog, en `src/features/projects/content/<idioma>/<slug>.md`:

```md
---
title: Nombre del proyecto
description: Resumen corto.
status: active # active | finished | paused
start: 2026-10-18
stack: [Astro, TypeScript]
repo: https://github.com/...
url: https://...
featured: true # aparece en la portada
---
```

### Textos de la interfaz

Cada feature tiene sus textos en su `i18n.ts`; los comunes (menú, pie, contacto) están en `src/shared/i18n/ui.ts`. Las traducciones al inglés se tipan a partir del español, así que si falta una, `npm run check` da error.

## Despliegue

`npm run build` genera un sitio estático en `dist/` que se puede publicar en cualquier hosting estático (Netlify, Vercel, GitHub Pages, Nginx...). Si defines `site` en `astro.config.mjs`, se generan además las etiquetas `canonical` y `hreflang`.
