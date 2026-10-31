# Getting Started with Image Editor

## Table of Contents
- [Installation](#installation)
- [CSS Setup](#css-setup)
- [Basic Component](#basic-component)
- [Initialization](#initialization)

## Installation

The Syncfusion Vue Image Editor is available as an npm package. Install it using your preferred package manager.

### Using npm

```bash
npm install @syncfusion/ej2-vue-image-editor --save
```

### Vite Setup

Create a new Vue 3 application with Vite for faster development:

```bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
```

Then install the Image Editor package:

```bash
npm install @syncfusion/ej2-vue-image-editor --save
```

## CSS Setup

Add the required CSS files to your `src/style.css` for styling the Image Editor and its dependencies:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/image-editor/index.css";
```

Import this CSS file in your `src/main.ts`:

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).mount('#app');
```

## Basic Component

Here's a minimal setup for the Image Editor:

```vue
<template>
  <div id="container">
    <ImageEditorComponent width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
</script>
```

## Initialization

To initialize the Image Editor with an image on component creation, use the `@created` event:

```vue
<template>
  <div id="container">
    <ImageEditorComponent
      ref="imgObj"
      width="550px"
      height="350px"
      :created="imageEditorCreated"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
import { Browser } from '@syncfusion/ej2-base';

const imgObj = ref(null);

const imageEditorCreated = () => {
  // Detect device and load appropriate image
  if (Browser.isDevice) {
    imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg');
  } else {
    imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
  }
};
</script>
```

## Running the Application

Start your development server:

```bash
npm run dev
```

The application will compile and serve at `http://localhost:5173` (for Vite).

## Key Properties in Setup

| Property | Purpose |
|----------|---------|
| `width` | Sets the canvas width (e.g., "550px", "100%") |
| `height` | Sets the canvas height (e.g., "350px", "100%") |
| `toolbar` | Customize toolbar items (default: all built-in items) |
| `created` | Event fired when component is ready |
| `ref` | Access component instance for method calls |

## Next Steps

- Open images using the [opening-saving-images.md](./opening-saving-images.md) reference
- Apply transformations with [transform-rotate-flip.md](./transform-rotate-flip.md)
- Add annotations with [text-annotations.md](./text-annotations.md), [shape-annotations.md](./shape-annotations.md), or [freehand-drawing.md](./freehand-drawing.md)
