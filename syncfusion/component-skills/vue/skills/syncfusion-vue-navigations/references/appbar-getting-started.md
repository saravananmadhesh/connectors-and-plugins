# Getting Started with Vue AppBar

## Table of Contents
- [Installation](#installation)
- [Setup Development Environment](#setup-development-environment)
- [Adding Packages](#adding-packages)
- [CSS Imports](#css-imports)
- [Basic AppBar](#basic-appbar)
- [First Example](#first-example)
- [Vue 3 Composition API](#vue-3-composition-api)
- [Global Registration](#global-registration)

## Table of Contents
- [Installation](#installation)
- [Setup Development Environment](#setup-development-environment)
- [Adding Packages](#adding-packages)
- [CSS Imports](#css-imports)
- [Basic AppBar](#basic-appbar)
- [First Example](#first-example)

## Installation

To use AppBar in your Vue 3 application, install the required Syncfusion packages from npm.

### Dependencies Required

The AppBar component requires the following packages:

```
@syncfusion/ej2-vue-navigations      // Main navigation components
  ├── @syncfusion/ej2-vue-base       // Base utilities
  ├── @syncfusion/ej2-navigations    // Navigation core
  │   └── @syncfusion/ej2-base       // Core utilities
  └── @syncfusion/ej2-vue-buttons    // Button component (optional, for AppBar content)
```

## Setup Development Environment

### Using Vite (Recommended)

Vite provides faster development builds and smaller bundle sizes:

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm run dev
```

For TypeScript:
```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm run dev
```

### Using Vue CLI

If you prefer Vue CLI:

```bash
npm init vue@latest
cd my-app
npm install
npm run dev
```

## Adding Packages

Install the required Syncfusion packages:

```bash
npm install @syncfusion/ej2-vue-navigations --save
npm install @syncfusion/ej2-vue-buttons --save
```

These commands install:
- `ej2-vue-navigations`: AppBar, Menu, Sidebar components
- `ej2-vue-buttons`: Button component for AppBar content
- All dependencies automatically (ej2-vue-base, ej2-base, etc.)

## CSS Imports

Add Syncfusion styles to your main CSS file or in `main.ts`:

### Option 1: In main.ts (Recommended)

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import '@syncfusion/ej2-base/styles/tailwind3.css'
import '@syncfusion/ej2-navigations/styles/tailwind3.css'

createApp(App).mount('#app')
```

### Option 2: In App.css or Global CSS

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/appbar/index.css";
```

**Available Theme Options:**
- `tailwind3.css` - Tailwind CSS theme (modern, minimal)
- `bootstrap5.css` - Bootstrap 5 theme (familiar Bootstrap look)
- `material.css` - Material Design theme (Google Material Design)
- `fluent2.css` - Microsoft Fluent 2 theme (Office 365 style)
- `fabric.css` - Fabric (Office 365) theme

Choose one theme that matches your project. Replace `tailwind3` with your preferred theme.

## Basic AppBar

### Minimal Example

The most basic AppBar requires:
1. Import `AppBarComponent` from `@syncfusion/ej2-vue-navigations`
2. Use the `<ejs-appbar>` component
3. Add content inside (native HTML buttons or text)

```vue
<template>
  <div class="control-container">
    <ejs-appbar colorMode="Primary">
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span>My Application</span>
    </ejs-appbar>
  </div>
</template>

<script>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-appbar': AppBarComponent
  }
}
</script>

<style scoped>
.control-container {
  width: 100%;
}
</style>
```

### With Icons

Add icons to buttons using the `e-icons` CSS class:

```vue
<template>
  <ejs-appbar colorMode="Primary">
    <button class="e-btn e-inherit e-icon-btn" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span class="app-title">Vue AppBar</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit e-icon-btn" title="Settings">
      <span class="e-btn-icon e-icons e-setting"></span>
    </button>
  </ejs-appbar>
</template>

<script>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-appbar': AppBarComponent
  }
}
</script>

<style scoped>
.app-title {
  margin-left: 12px;
  font-weight: 500;
}
</style>
```

**Common Icons:**
- `e-menu` - Hamburger menu
- `e-home` - Home icon
- `e-setting` - Settings gear
- `e-cut`, `e-copy`, `e-paste` - Edit operations
- `e-bold`, `e-italic`, `e-underline` - Text formatting
- `e-align-left`, `e-align-center`, `e-align-right` - Text alignment

## First Example

Here's a complete working example for a new Vue app:

**App.vue:**
```vue
<template>
  <div class="app-root">
    <ejs-appbar colorMode="Primary">
      <button class="e-btn e-inherit e-icon-btn" title="Menu">
        <span class="e-btn-icon e-icons e-menu"></span>
      </button>
      <span class="app-brand">Vue AppBar</span>
      <div class="e-appbar-spacer"></div>
      <button class="e-btn e-inherit">FREE TRIAL</button>
    </ejs-appbar>
    
    <div class="appbar-content">
      <h2>Welcome to AppBar Demo</h2>
      <p>This is your main content area below the AppBar.</p>
      <p>Vue 3 Composition API integration with Syncfusion components</p>
    </div>
  </div>
</template>

<script>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-appbar': AppBarComponent
  }
}
</script>

<style scoped>
.app-root {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-brand {
  margin-left: 12px;
  font-weight: 600;
  font-size: 1.1rem;
}

.appbar-content {
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  color: #333;
  flex: 1;
}

.appbar-content h2 {
  margin-top: 0;
  color: #0066cc;
}
</style>
```

**main.ts:**
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import '@syncfusion/ej2-base/styles/tailwind3.css'
import '@syncfusion/ej2-navigations/styles/tailwind3.css'

createApp(App).mount('#app')
```

### Running the App

Start the development server:

```bash
npm run dev     # If using Vite
# or
npm run serve   # If using Vue CLI
```

The app will open in your browser (usually at `http://localhost:5173` for Vite or `http://localhost:8080` for Vue CLI).

### What You Should See

- A blue/primary colored bar at the top
- Menu icon (hamburger) on the left
- "Vue AppBar" text next to the menu
- Flexible space in the middle
- "FREE TRIAL" button on the right
- Content area below the AppBar

## Vue 3 Composition API Setup

In Vue 3 with `<script setup>`, you don't need to explicitly register components—just import them:

```vue
<template>
  <ejs-appbar colorMode="Primary">
    <span class="regular">AppBar</span>
  </ejs-appbar>
</template>

<script setup>
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
</script>
```

### Using Reactive State and Event Handlers

```vue
<template>
  <ejs-appbar :colorMode="colorMode">
    <button class="e-btn e-inherit e-icon-btn" @click="toggleMenu" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span>{{ appTitle }}</span>
    <div class="e-appbar-spacer"></div>
    <button class="e-btn e-inherit" @click="handleLogout">
      Logout
    </button>
  </ejs-appbar>
</template>

<script setup>
import { ref } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

// Reactive state using ref
const colorMode = ref('Primary')
const appTitle = ref('My Vue App')

// Event handlers
const toggleMenu = () => {
  console.log('Menu clicked')
}

const handleLogout = () => {
  console.log('Logout clicked')
}
</script>
```

## Options API Alternative

If you prefer Options API:

```vue
<template>
  <ejs-appbar :colorMode="colorMode">
    <button class="e-btn e-inherit e-icon-btn" @click="toggleMenu" title="Menu">
      <span class="e-btn-icon e-icons e-menu"></span>
    </button>
    <span>{{ appTitle }}</span>
  </ejs-appbar>
</template>

<script>
import { defineComponent } from 'vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";

export default defineComponent({
  name: 'App',
  components: {
    'ejs-appbar': AppBarComponent
  },
  data() {
    return {
      colorMode: 'Primary',
      appTitle: 'My Vue App'
    }
  },
  methods: {
    toggleMenu() {
      console.log('Menu clicked')
    }
  }
})
</script>
```

## Global Registration (Optional)

For use in every component without importing:

**main.ts:**
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations"
import '@syncfusion/ej2-base/styles/tailwind3.css'
import '@syncfusion/ej2-navigations/styles/tailwind3.css'

const app = createApp(App)

// Register globally
app.component('ejs-appbar', AppBarComponent)

app.mount('#app')
```

Now `<ejs-appbar>` is available in all templates without importing.

## Next Steps

- **Positioning:** Learn about top, bottom, and sticky positioning in positioning-and-layout.md
- **Styling:** Explore color modes and size modes in size-and-color-modes.md
- **Advanced:** Build complex layouts with menus and sidebars in design-patterns.md

