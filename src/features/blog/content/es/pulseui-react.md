---
title: Presentando PulseUI, mi librería de componentes para React
description: Qué es PulseUI, por qué la he creado y qué puede aportar a tu próximo proyecto.
date: 2026-10-25
tags: [pulseui, react, accesibilidad, design-system]
---

En casi todos los proyectos en los que he trabajado acabo construyendo los mismos componentes: botones, formularios, modales, tablas... Cada vez con pequeñas diferencias y, a menudo, con la accesibilidad como asignatura pendiente. **PulseUI** nace para resolver eso: una librería de componentes para React, de código abierto, que puedes usar tal cual o adaptar a tu propia marca.

## Qué ofrece

- **Más de 30 componentes listos para usar**: desde botones y campos de formulario hasta tablas con filas expandibles, selector de fechas, modales, menús y notificaciones.
- **Accesible por defecto**: cada componente interactivo sigue el patrón ARIA que le corresponde (diálogos, menús, pestañas...) y la build falla si aparece un problema de accesibilidad.
- **Fácil de adaptar a tu marca**: colores, tipografía y espaciado se definen con design tokens que puedes sobrescribir en una línea. Los mismos tokens se exportan a Figma, así diseño y código hablan el mismo idioma.
- **Convive con Tailwind CSS**: todos los componentes aceptan `className` para ajustes rápidos.
- **Preparada para trabajar con IA**: incluye un servidor MCP para que asistentes como Claude o Copilot consulten las props y los ejemplos reales de cada componente en lugar de inventarlos.

## Cómo empezar

```bash
npm install @pulseui/react
```

```tsx
import { Button } from "@pulseui/react";
import "@pulseui/react/styles";

export default function App() {
  return <Button variant="primary" label="Hola mundo" />;
}
```

Puedes explorar todos los componentes en la [documentación interactiva](https://eloriente.github.io/pulseui-react/) y revisar el código en [GitHub](https://github.com/eloriente/pulseui-react).
