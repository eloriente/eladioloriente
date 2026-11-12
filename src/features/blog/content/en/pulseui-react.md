---
title: Introducing PulseUI, my React component library
description: What PulseUI is, why I built it and what it can bring to your next project.
date: 2026-10-25
tags: [pulseui, react, accessibility, design-system]
---

In almost every project I've worked on, I end up building the same components: buttons, forms, modals, tables... Each time with small differences and, too often, with accessibility left for later. **PulseUI** was born to fix that: an open-source React component library you can use as-is or adapt to your own brand.

## What it offers

- **30+ ready-to-use components**: from buttons and form fields to tables with expandable rows, a date picker, modals, menus and notifications.
- **Accessible by default**: every interactive component follows its ARIA pattern (dialogs, menus, tabs...) and the build fails if an accessibility issue shows up.
- **Easy to match your brand**: colors, typography and spacing are design tokens you can override in a single line. The same tokens export to Figma, so design and code speak the same language.
- **Works alongside Tailwind CSS**: every component accepts `className` for quick tweaks.
- **Ready for AI-assisted work**: it ships an MCP server so assistants like Claude or Copilot can look up each component's real props and examples instead of making them up.

## Getting started

```bash
npm install @pulseui/react
```

```tsx
import { Button } from "@pulseui/react";
import "@pulseui/react/styles";

export default function App() {
  return <Button variant="primary" label="Hello world" />;
}
```

You can browse every component in the [interactive docs](https://eloriente.github.io/pulseui-react/) and check the code on [GitHub](https://github.com/eloriente/pulseui-react).
