# Getting Started with Syncfusion Vue 3 Skeleton

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Adding CSS References](#adding-css-references)
- [Basic Skeleton Setup](#basic-skeleton-setup)
- [Running the Application](#running-the-application)
- [Minimal Examples](#minimal-examples)

---

## Prerequisites

- Vue 3 (3.4+) project created with Vite (recommended) or Vue CLI
- Node.js 14+

Create a new Vite-based Vue 3 app:

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

---

## Installation

Install the Syncfusion Vue 3 notifications package, which includes `SkeletonComponent`:

```bash
npm install @syncfusion/ej2-vue-notifications --save
```

> The `--save` flag adds the package to the `dependencies` section of `package.json`.

---

## Adding CSS References

Add the required CSS imports in your `src/main.ts` file:

```ts
// src/main.ts
import "@syncfusion/ej2-material3-theme/styles/skeleton/index.css";
```

> In Vue 3, global CSS imports are typically placed in `main.ts` so the styles load once before any component mounts.

---

## Basic Skeleton Setup

Add `SkeletonComponent` to your component. At minimum, provide a `height` for text-style skeletons:

```vue
<template>
  <SkeletonComponent height="15px" />
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

For circle or square shapes, provide `width` (used as the dimension):

```vue
<template>
  <SkeletonComponent shape="Circle" width="48px" />
</template>

<script setup>
import { SkeletonComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The app opens in the browser. Skeleton placeholders render immediately with the default Wave shimmer animation.

---

## Minimal Examples

### Text line placeholder (default)
```vue
<template>
  <SkeletonComponent height="15px" width="80%" />
</template>
```

### Avatar placeholder
```vue
<template>
  <SkeletonComponent shape="Circle" width="48px" />
</template>
```

### Image placeholder
```vue
<template>
  <SkeletonComponent shape="Rectangle" width="100%" height="200px" />
</template>
```

### Small icon placeholder
```vue
<template>
  <SkeletonComponent shape="Square" width="32px" />
</template>
```

---

## Dimension Rules

| Shape | Width | Height |
|-------|-------|--------|
| `Text` (default) | Optional | Required |
| `Rectangle` | Required | Required |
| `Circle` | Required (used as diameter) | Not needed |
| `Square` | Required (used as side length) | Not needed |

> For `Circle` and `Square`, `width` is used as the single dimension. Height is ignored.
