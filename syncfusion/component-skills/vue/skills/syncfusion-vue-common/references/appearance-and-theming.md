# Appearance & Theming

Complete guide for theming, styling, and customizing Syncfusion Vue components.

## Table of Contents
- [Built-in Themes Overview](#built-in-themes-overview)
  - [Available Themes](#available-themes)
  - [Theme Variants (Light & Dark)](#theme-variants-light--dark)
- [Applying Themes](#applying-themes)
  - [CSS Import Method](#css-import-method)
  - [CDN Method](#cdn-method)
  - [Individual Component Themes](#individual-component-themes)
  - [Optimized (Lite) Themes](#optimized-lite-themes)
- [Theme Studio](#theme-studio)
- [CSS Variables Customization](#css-variables-customization)
  - [Modern Themes with CSS Variables](#modern-themes-with-css-variables)
  - [Customizing Colors](#customizing-colors)
  - [Light/Dark Mode Switching](#lightdark-mode-switching)
- [Size Modes](#size-modes)
  - [Touch Mode (e-bigger)](#touch-mode-e-bigger)
  - [Responsive Size Switching](#responsive-size-switching)
- [Custom Styling](#custom-styling)
  - [Component-Specific Styles](#component-specific-styles)
- [Icons](#icons)

---

## Built-in Themes Overview

Syncfusion Vue components provide multiple professionally designed themes out-of-the-box.

### Available Themes

| Theme Name | Style Sheet | Description |
|------------|-------------|-------------|
| **Tailwind 3.4** | `tailwind3.css` | Tailwind CSS design system v3.4 |
| **Tailwind 3.4 Dark** | `tailwind3-dark.css` | Dark variant of Tailwind 3.4 |
| **Bootstrap 5.3** | `bootstrap5.3.css` | Bootstrap v5.3 design language |
| **Bootstrap 5.3 Dark** | `bootstrap5.3-dark.css` | Dark variant of Bootstrap 5.3 |
| **Fluent 2** | `fluent2.css` | Microsoft Fluent Design System v2 |
| **Fluent 2 Dark** | `fluent2-dark.css` | Dark variant of Fluent 2 |
| **Material 3** | `material3.css` | Google Material Design v3 |
| **Material 3 Dark** | `material3-dark.css` | Dark variant of Material 3 |
| **Bootstrap 5** | `bootstrap5.css` | Bootstrap v5 (earlier version) |
| **Bootstrap 5 Dark** | `bootstrap5-dark.css` | Dark variant of Bootstrap 5 |
| **Fluent** | `fluent.css` | Microsoft Fluent Design (v1) |
| **Fluent Dark** | `fluent-dark.css` | Dark variant of Fluent |
| **Material** | `material.css` | Google Material Design (classic) |
| **Material Dark** | `material-dark.css` | Dark variant of Material |
| **Tailwind** | `tailwind.css` | Tailwind CSS (earlier version) |
| **Tailwind Dark** | `tailwind-dark.css` | Dark variant of Tailwind |
| **Fabric** | `fabric.css` | Microsoft Office Fabric |
| **Fabric Dark** | `fabric-dark.css` | Dark variant of Fabric |
| **High Contrast** | `highcontrast.css` | High contrast for accessibility |

> **Note:** The Bootstrap theme is designed based on Bootstrap v3 but is compatible with Bootstrap v4 applications.

### Theme Variants (Light & Dark)

All modern themes provide both light and dark variants:

- **Light themes:** Suitable for well-lit environments, traditional desktop use
- **Dark themes:** Reduce eye strain in low-light conditions, save battery on OLED screens

---

## Applying Themes

### CSS Import Method

The most common way to apply a theme is by importing CSS files in your component or main App.vue.

**Single Component Example:**

```vue
<template>
  <div>
    <ejs-button content="Click Me" :isPrimary="true"></ejs-button>
  </div>
</template>

<script setup>
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';
</script>

<style>
/* Import Material 3 theme */
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material3.css";
</style>
```

**Application-Wide Theme (main.js or App.vue):**

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
/* Import theme globally for all components */
@import "./node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "./node_modules/@syncfusion/ej2-buttons/styles/material3.css";
@import "./node_modules/@syncfusion/ej2-calendars/styles/material3.css";
@import "./node_modules/@syncfusion/ej2-grids/styles/material3.css";
/* Add other component themes as needed */
</style>
```

**Import order matters:** Always import `ej2-base` first, then component dependencies, then the component itself.

```css
/* CORRECT order */
@import "@syncfusion/ej2-base/styles/material3.css";        /* Base (required first) */
@import "@syncfusion/ej2-buttons/styles/material3.css";     /* Dependencies */
@import "@syncfusion/ej2-popups/styles/material3.css";      /* Dependencies */
@import "@syncfusion/ej2-calendars/styles/material3.css";   /* Component */

/* INCORRECT - will cause missing styles */
@import "@syncfusion/ej2-calendars/styles/material3.css";   /* Component first - WRONG! */
@import "@syncfusion/ej2-base/styles/material3.css";        /* Base last - WRONG! */
```

---

### CDN Method

For quick prototyping or static HTML pages, use CDN links:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Material 3 theme from CDN -->
  <link href="https://cdn.syncfusion.com/ej2/27.1.48/material3.css" rel="stylesheet" />
  
  <!-- Vue 3 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.js"></script>
  
  <!-- Syncfusion Vue Components -->
  <script src="https://cdn.syncfusion.com/ej2/27.1.48/ej2-vue-grids/dist/ej2-vue-grids.umd.min.js"></script>
</head>
<body>
  <div id="app">
    <!-- Your components here -->
  </div>
</body>
</html>
```

### Individual Component Themes

Import only the themes you need to reduce bundle size:

**Example: Grid Component Only**

```vue
<style>
/* Minimal imports for Grid */
@import "@syncfusion/ej2-base/styles/material3.css";
@import "@syncfusion/ej2-buttons/styles/material3.css";
</style>
```

### Optimized (Lite) Themes

Syncfusion provides **lite** theme files that include only normal size mode (excludes bigger/touch mode), significantly reducing file size.

**File size comparison:**

| Theme | Default Size | Optimized (Lite) Size | Savings |
|-------|--------------|----------------------|---------|
| Fluent 2 | 3.97 MB | 2.96 MB | ~25% |

**Import optimized theme:**

```css
/* All components - optimized */
@import "@syncfusion/ej2/fluent2-lite.css";

/* Individual component - optimized */
@import "@syncfusion/ej2-buttons/styles/fluent2-lite.css";
```

**Use lite themes when:**
- Application is desktop-only (no touch devices)
- Bundle size is critical
- Touch mode (`e-bigger`) is not needed

---

## Theme Studio

[Syncfusion Theme Studio](https://ej2.syncfusion.com/themestudio/) is a web-based tool for visual theme customization without writing code.

**Features:**
- Visual color picker for primary, accent, and neutral colors
- Preview changes in real-time on sample components
- Export customized theme as CSS file
- Supports Material 3, Fluent 2, Bootstrap 5.3, and Tailwind 3.4
- Generate light and dark variants

**How to use Theme Studio:**

1. **Visit:** [https://ej2.syncfusion.com/themestudio/](https://ej2.syncfusion.com/themestudio/)
2. **Select base theme:** Material 3, Fluent 2, Bootstrap 5.3, or Tailwind 3.4
3. **Customize colors:** Use color pickers to adjust primary, secondary, accent colors
4. **Preview:** See changes on Grid, Calendar, Button, and other sample components
5. **Download:** Export customized CSS file
6. **Import:** Use the downloaded CSS in your Vue project

**Example using custom theme from Theme Studio:**

```vue
<style>
/* Import your custom theme */
@import "./assets/themes/my-custom-theme.css";
</style>
```
### Customizing Colors

Override CSS variables in your application to customize colors:

**Example: Custom Primary Color (Material 3)**

```vue
<template>
  <div>
    <ejs-button cssClass="e-primary">Custom Primary</ejs-button>
    <ejs-button cssClass="e-success">Success</ejs-button>
  </div>
</template>

<script setup>
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material3.css";

/* Override primary color (Material 3 uses RGB) */
:root {
  --color-sf-primary: 104, 134, 164;  /* Custom blue-gray RGB */
}
</style>
```

### Light/Dark Mode Switching

Dynamically switch between light and dark modes using CSS classes.

**Method 1: Global Toggle (Checkbox)**

```vue
<template>
  <div>
    <ejs-checkbox 
      label="Dark Mode" 
      v-model="isDark"
      @change="toggleDarkMode"
    ></ejs-checkbox>
    
    <ejs-button cssClass="e-primary">Button</ejs-button>
    <ejs-button cssClass="e-success">Success</ejs-button>
    <ejs-button cssClass="e-warning">Warning</ejs-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent as EjsButton, CheckBoxComponent as EjsCheckbox } from '@syncfusion/ej2-vue-buttons';

const isDark = ref(false);

const toggleDarkMode = () => {
  if (isDark.value) {
    document.body.classList.add('e-dark-mode');
  } else {
    document.body.classList.remove('e-dark-mode');
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material3.css";

/* Dark mode background */
.e-dark-mode {
  background-color: #121212;
  color: #ffffff;
}
</style>
```

## Size Modes

Syncfusion components support two size modes: **normal** (default) and **touch** (bigger).

### Touch Mode (e-bigger)

Touch mode increases element sizes, padding, and touch targets for better mobile/tablet usability.

**When to use touch mode:**
- Mobile or tablet applications
- Touch-screen kiosks
- Accessibility requirements (larger touch targets)
- Users with motor impairments

**Enable touch mode globally:**

```html
<!-- In public/index.html -->
<body class="e-bigger">
  <div id="app"></div>
</body>
```

**Enable touch mode for specific component:**

```vue
<template>
  <div class="e-bigger">
    <ejs-button content="Large Touch-Friendly Button"></ejs-button>
  </div>
</template>
```

**Enable via cssClass prop:**

```vue
<template>
  <ejs-button 
    content="Button" 
    cssClass="e-bigger"
  ></ejs-button>
</template>
```

---

### Responsive Size Switching

Dynamically switch between normal and touch modes based on device or user preference.

**Example: Toggle Size Mode with Buttons**

```vue
<template>
  <div>
    <div>
      <button @click="enableTouchMode">Touch Mode</button>
      <button @click="enableMouseMode">Mouse Mode</button>
    </div>
    
    <div class="component-container">
      <ejs-calendar></ejs-calendar>
    </div>
  </div>
</template>

<script setup>
import { CalendarComponent as EjsCalendar } from '@syncfusion/ej2-vue-calendars';

const enableTouchMode = () => {
  document.body.classList.add('e-bigger');
};

const enableMouseMode = () => {
  document.body.classList.remove('e-bigger');
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material3.css";
</style>
```

**Example: Auto-Detect Touch Device**

```vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Detect touch support
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    document.body.classList.add('e-bigger');
  }
});
</script>
```

**Example: Responsive Based on Screen Width**

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';

const handleResize = () => {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    document.body.classList.add('e-bigger');
  } else {
    document.body.classList.remove('e-bigger');
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
```

---

## Custom Styling

### Component-Specific Styles

Override specific component styles using CSS classes:

```vue
<template>
  <ejs-button cssClass="custom-button">Styled Button</ejs-button>
</template>

<style>
/* Override button styles */
.custom-button.e-btn {
  background-color: #ff6347;
  color: white;
  border-radius: 20px;
  padding: 12px 24px;
  font-weight: bold;
}

.custom-button.e-btn:hover {
  background-color: #ff4500;
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>
```

## Icons

Syncfusion includes a built-in icon library (`e-icons`) with 1000+ icons.

**Using built-in icons:**

```vue
<template>
  <ejs-button iconCss="e-icons e-save" content="Save"></ejs-button>
  <ejs-button iconCss="e-icons e-delete" content="Delete"></ejs-button>
  <ejs-button iconCss="e-icons e-edit" content="Edit"></ejs-button>
</template>
```

**Common icon classes:**
- `e-save` - Save icon
- `e-delete` - Delete icon
- `e-edit` - Edit icon
- `e-add` - Add/Plus icon
- `e-search` - Search icon
- `e-close` - Close/X icon
- `e-download` - Download icon
- `e-upload` - Upload icon
- `e-settings` - Settings/Gear icon
- `e-print` - Print icon

**Custom icon libraries (Font Awesome, Material Icons):**

```vue
<template>
  <!-- Font Awesome -->
  <ejs-button iconCss="fas fa-save" content="Save"></ejs-button>
  
  <!-- Material Icons -->
  <ejs-button iconCss="material-icons">save</ejs-button>
</template>

<script setup>
// Make sure to include Font Awesome or Material Icons CSS in index.html
</script>
```

---
