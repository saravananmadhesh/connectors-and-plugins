# Getting Started with Vue 3 Badge

The Syncfusion Vue 3 Badge is a pure CSS component. There is no Vue component class — badges are rendered as plain HTML elements styled with CSS modifier classes.

## Installation

Install the Vue 3 notifications package which bundles the Badge component:

```bash
npm install @syncfusion/ej2-vue-notifications --save
```

> The `--save` flag records the package in the `dependencies` section of `package.json`.

## Setting Up a Vue 3 Project

Create a new Vue 3 + Vite project (recommended):

```bash
# TypeScript
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm run dev

# JavaScript
npm create vite@latest my-app -- --template vue
cd my-app
npm run dev
```

## Adding CSS References

Add the following imports to `src/main.ts`:

```ts
// src/main.ts
import "@syncfusion/ej2-material3-theme/styles/badge/index.css";
```

> Vue 3 prefers global CSS imports in `main.ts` so styles are loaded before any component mounts.

## Adding Your First Badge

Badges attach to any inline element — typically a `<span>` nested inside a heading, button, or container. The only requirement is the base `e-badge` class plus a color variant class. Use Vue's `class` binding for dynamic variants or just a plain string for static ones:

```vue
<template>
  <h1>Badge Component <span class="e-badge e-badge-primary">New</span></h1>
</template>

<script setup>
// No component import required — Badge is pure CSS
</script>
```

## Running the Application

```bash
npm run dev
```

The browser opens with your badge rendered inline inside the heading.

## Key Points

- **No component import needed** — Badge is CSS-only; just add classes to a `<span>` or `<a>`.
- **Always include `e-badge`** as the base class alongside any modifier class.
- **Parent positioning** — For notification/dot/overlap badges, the parent container should have `position: relative` so the badge positions correctly.
- **Dynamic variants** — Use `:class` binding for reactive variant selection: `:class="['e-badge', 'e-badge-' + color]"`.
