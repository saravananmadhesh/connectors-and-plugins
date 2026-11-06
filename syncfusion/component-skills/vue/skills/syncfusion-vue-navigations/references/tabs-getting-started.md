# Getting Started with Tabs in Vue 3

## Table of Contents
- [Dependencies](#dependencies)
- [Project Setup](#project-setup)
- [CSS Imports](#css-imports)
- [Basic Tab Initialization](#basic-tab-initialization)
- [Running the Application](#running-the-application)

## Dependencies

The Tab component requires the `@syncfusion/ej2-vue-navigations` package and its dependencies. The complete dependency tree is:

```
@syncfusion/ej2-vue-navigations
├── @syncfusion/ej2-base
├── @syncfusion/ej2-vue-base
└── @syncfusion/ej2-navigations
    ├── @syncfusion/ej2-buttons
    └── @syncfusion/ej2-popups
```

Install the required package:

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

This single command installs all required dependencies automatically.

## Project Setup

### Option 1: Setup with Vite (Recommended)

Vite provides faster development builds and smaller bundle sizes compared to Create Vue app.

**Create a new Vue 3 application:**

```bash
npm create vite@latest my-tab-app -- --template vue
cd my-tab-app
npm install
npm run dev
```

**For TypeScript support:**

```bash
npm create vite@latest my-tab-app -- --template vue-ts
cd my-tab-app
npm install
npm run dev
```

**Install Syncfusion Tab package:**

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

### Option 2: Setup with Create Vue

If you prefer Create Vue, follow the official setup:

```bash
npm create vue@latest my-tab-app
cd my-tab-app
npm install
npm install @syncfusion/ej2-vue-navigations --save
npm run dev
```

## CSS Imports

The Tab component requires CSS files for styling. Add these imports to your `src/App.vue` file or main CSS file:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tab/index.css";
```

Then import in your `App.vue`:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tab/index.css";
</style>
```

**Why these imports?**

- **ej2-base**: Core Syncfusion styles and utilities
- **ej2-buttons**: Required for button styling in Tab icons
- **ej2-popups**: Required for dropdown/popup overflow functionality
- **ej2-vue-navigations**: Tab-specific component styles

## Basic Tab Initialization

### Step 1: Import Tab Components

In your `src/App.vue` file, import the necessary components:

```vue
<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Step 2: Create Tab Items

Define your tab data structure with headers and content:

```vue
<script setup>
import { ref } from 'vue';

const tabs = [
  { header: 'Home', content: 'Welcome to the home tab' },
  { header: 'Profile', content: 'User profile information' },
  { header: 'Settings', content: 'Application settings' }
];
</script>
```

### Step 3: Render the Tab Component

Create your Vue component:

```vue
<template>
  <div class="app">
    <h1>Tab Component Example</h1>
    <ejs-tab>
      <e-tab-items>
        <e-tab-item v-for="(tab, index) in tabs" :key="index" :header="{ text: tab.header }">
          <template #content>
            {{ tab.content }}
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
import "@syncfusion/ej2-material3-theme/styles/tab/index.css";

const tabs = [
  { header: 'HTML', content: 'HTML is the standard markup language for creating web pages.' },
  { header: 'CSS', content: 'CSS is used for styling and layout of web pages.' },
  { header: 'JavaScript', content: 'JavaScript is a programming language for interactive web pages.' }
];
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>
```

### Complete App.vue Example

```vue
<template>
  <div class="app-container">
    <h1>My First Tab Component</h1>
    <ejs-tab>
      <e-tab-items>
        <e-tab-item :header="{ text: 'HTML' }">
          <template #content>
            HTML is the standard markup language for creating web pages.
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'CSS' }">
          <template #content>
            CSS is used for styling and layout of web pages.
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'JavaScript' }">
          <template #content>
            JavaScript is a programming language for interactive web pages.
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
import "@syncfusion/ej2-material3-theme/styles/tab/index.css";
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
```

## Running the Application

### With Vite:

```bash
npm run dev
```

Output:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open your browser to `http://localhost:5173/` to see your Tab component.

### With Create Vue:

```bash
npm run dev
```

The app will automatically open in your default browser at `http://localhost:5173/`.

## Minimal Working Example (MWE)

If you want the absolute minimum code to get started:

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Content 1</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>Content 2</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
import "@syncfusion/ej2-material3-theme/styles/tab/index.css";
</script>
```

This renders a basic Tab component with two tabs and default styling.

## Next Steps

- **For styling**: Read the header-styling.md guide to customize tab appearance
- **For responsive layouts**: Read orientation-overflow.md to control header position and overflow handling
- **For data-driven content**: Read populating-items.md to bind tabs to data sources
