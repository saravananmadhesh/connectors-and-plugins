# Getting Started with Syncfusion Vue 3 Message

This guide walks through installing, configuring, and rendering your first `MessageComponent` in a Vue 3 application.

## Prerequisites

- Vue 3 (3.4+)
- Vite 5+ (recommended) or Vue CLI
- Node.js 14+

## Installation

Install the Syncfusion Vue 3 notifications package, which includes the Message component:

```bash
npm install @syncfusion/ej2-vue-notifications --save
```

## Adding CSS

Import the required stylesheets in your global stylesheet or `main.ts`. The `ej2-base` styles provide foundational theme tokens; the notifications styles provide component-specific styling:

```ts
// src/main.ts
import "@syncfusion/ej2-material3-theme/styles/message/index.css";
```

> In Vue 3, CSS imports are commonly placed in `main.ts` to ensure the styles are loaded before the application mounts.

## Basic Usage

Import `MessageComponent` from the notifications package and use it in your template:

```vue
<template>
  <MessageComponent content="Please read the comments carefully" />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

## Content: Prop vs Slot

The `content` prop and a default Vue slot are both supported for message text. Vue 3 recommends the slot for rich content and `content` for simple strings:

```vue
<template>
  <!-- Using the content prop (string) -->
  <MessageComponent content="Your message has been sent successfully" />

  <!-- Using the default slot (string) -->
  <MessageComponent>Your message has been sent successfully</MessageComponent>
</template>
```

For rich/templated content, use Vue's render function `h()` or the `#content` slot — see `customization.md` for details.

## Running the Application

Start the Vite development server:

```bash
npm run dev
```

The browser will open with your message displayed immediately. No additional initialization is needed beyond the CSS import and the component tag.

## Setup for TypeScript

To scaffold a TypeScript-enabled Vue 3 app with Vite:

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install @syncfusion/ej2-vue-notifications --save
npm run dev
```

## Setup for JavaScript

To scaffold a JavaScript Vue 3 app with Vite:

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm install @syncfusion/ej2-vue-notifications --save
npm run dev
```

## Gotchas

- **Missing styles**: If the message appears unstyled, ensure both `ej2-base` and `ej2-vue-notifications` CSS files are imported before the component renders.
- **SSR environments**: The component requires a DOM — ensure it only renders client-side in SSR frameworks (Nuxt 3, Vite SSR). Use `<ClientOnly>` wrappers or dynamic imports with `<Suspense>`.
- **Reactive content**: To make the `content` reactive, pass a `ref` or `computed` value (Vue will unwrap it automatically) instead of a static string.
