## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Restricciones del proyecto

- Solo puedes crear o editar archivos dentro de `src/`. Fuera de `src/` todo es de solo lectura.
- Prohibido modificar `package.json`, `package-lock.json`, `node_modules/` y `public/`, también mediante comandos (`npm install`, `npm uninstall`, `npm update`, `npm pkg`, `astro add`...).
- Si una tarea requiere cambiar algo fuera de `src/` (dependencias, configuración, Docker...), detente y explica al usuario qué cambio haría falta para que lo haga él.
