# Getting Started with Vue Carousel

## Table of Contents

- [Installation and Dependencies](#installation-and-dependencies)
- [Development Environment Setup](#development-environment-setup)
- [CSS Imports and Theme Configuration](#css-imports-and-theme-configuration)
- [Basic Carousel Component Setup](#basic-carousel-component-setup)
- [First Working Example: Image Gallery](#first-working-example-image-gallery)
- [Common Setup Issues](#common-setup-issues)
- [Running the Application](#running-the-application)

## Installation and Dependencies

### Package Dependencies

The Carousel component requires the following packages:

```
|-- @syncfusion/ej2-vue-navigations
    |-- @syncfusion/ej2-vue-base
    |-- @syncfusion/ej2-navigations
        |-- @syncfusion/ej2-base
        |-- @syncfusion/ej2-buttons
```

### Install via npm

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

This command installs all required dependencies including base and button components.

## Development Environment Setup

### Setup with Vite (Recommended)

Vite provides faster development and smaller bundle sizes:

```bash
npm create vite@latest my-carousel-app -- --template vue
cd my-carousel-app
npm run dev
```

### Setup with Traditional Vue CLI

```bash
npm init vue@latest my-carousel-app
cd my-carousel-app
npm install
npm run dev
```

## CSS Imports and Theme Configuration

Add Carousel styles to your main.js or component file. Choose your preferred theme:

### Tailwind 3 Theme
```js
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/carousel/index.css";
```

## Basic Carousel Component Setup

### Component Import

```vue
<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

### Minimal Component Structure

```vue
<template>
  <div class='control-container'>
    <ejs-carousel>
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

## First Working Example: Image Gallery

This complete example displays a carousel with five images:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel>
      <e-carousel-items>
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="cardinal" style="height:100%;width:100%;" /><figcaption class="img-caption">Cardinal</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="kingfisher" style="height:100%;width:100%;" /><figcaption class="img-caption">Kingfisher</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="keel-billed-toucan" style="height:100%;width:100%;" /><figcaption class="img-caption">Keel-billed-toucan</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="yellow-warbler" style="height:100%;width:100%;" /><figcaption class="img-caption">Yellow-warbler</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="bee-eater" style="height:100%;width:100%;" /><figcaption class="img-caption">Bee-eater</figcaption></figure>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

## Common Setup Issues

### Issue: Styles not applying
- **Cause:** CSS import paths incorrect or missing theme file
- **Solution:** Verify CSS import statements in main.js match your theme. Run `npm list @syncfusion/ej2-base` to verify installation.

### Issue: Components not found
- **Cause:** Package not installed or import path wrong
- **Solution:** Run `npm install @syncfusion/ej2-vue-navigations` and verify import paths use exact component names.

### Issue: Carousel not displaying
- **Cause:** Missing items or container styling
- **Solution:** Ensure container has explicit height: `<div style="height:400px;">` and carousel has at least one e-carousel-item child.

### Issue: TypeScript errors
- **Cause:** Missing type definitions
- **Solution:** Install `@syncfusion/ej2-vue-navigations` which includes TypeScript definitions. For strict mode, use `@ts-ignore` if needed.

## Running the Application

After setup, start your development server:

**With Vite:**
```bash
npm run dev
```

**With Vue CLI:**
```bash
npm run dev
```

The carousel will render in your browser, typically at `http://localhost:5173` (Vite) or `http://localhost:3000` (Vue CLI).

**Next Steps:**
- Add real image URLs instead of placeholders
- Customize with indicators and navigation buttons
- Implement auto-play for automatic transitions
