# Getting Started with Syncfusion Vue Breadcrumb

This guide walks you through setting up the Syncfusion breadcrumb component in a Vue 3 project using the Composition API.

## Prerequisites

- Vue 3.0 or later
- Node.js 14.0 or later
- npm or yarn package manager

## Step 1: Create a Vue 3 Project

### Using Vite (Recommended)

```bash
npm create vite@latest my-breadcrumb-app -- --template vue
cd my-breadcrumb-app
npm install
```

### Using Create Vue

```bash
npm create vue@latest
cd my-breadcrumb-app
npm install
```

## Step 2: Install Syncfusion Breadcrumb

Install the required Syncfusion packages:

```bash
npm install @syncfusion/ej2-vue-navigations @syncfusion/ej2-base @syncfusion/ej2-icons
```

### Package Contents

- **@syncfusion/ej2-vue-navigations** - Vue breadcrumb and other navigation components
- **@syncfusion/ej2-base** - Base utilities and services
- **@syncfusion/ej2-icons** - Icon font library

## Step 3: Import Required Styles

Choose a theme that matches your application design. Syncfusion provides multiple built-in themes:

### Available Themes

| Theme | CSS File |
|-------|----------|
| Bootstrap 5 | `@syncfusion/ej2-vue-navigations/styles/bootstrap5.css` |
| Tailwind | `@syncfusion/ej2-vue-navigations/styles/tailwind.css` |
| Material 3 | `@syncfusion/ej2-vue-navigations/styles/material3.css` |
| Fluent 2 | `@syncfusion/ej2-vue-navigations/styles/fluent2.css` |

### Import in main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import '@syncfusion/ej2-vue-navigations/styles/bootstrap5.css'

createApp(App).mount('#app')
```

### Or Import in Component

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/breadcrumb/index.css";
</style>
```

## Step 4: Create Your First Breadcrumb

### Basic Component

Create a file `src/components/Breadcrumb.vue`:

```vue
<template>
  <div class="breadcrumb-container">
    <h2>File Navigation</h2>
    <ejs-breadcrumb :items="breadcrumbItems"></ejs-breadcrumb>
  </div>
</template>

<script>
import { BreadcrumbComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-breadcrumb': BreadcrumbComponent
  },
  data() {
    return {
      breadcrumbItems: [
        { text: 'Home', url: '/' },
        { text: 'Documents', url: '/documents' },
        { text: 'Projects', url: '/documents/projects' },
        { text: 'My Project', url: '/documents/projects/my-project' }
      ]
    }
  }
}
</script>

<style scoped>
.breadcrumb-container {
  padding: 20px;
}
</style>
```

### Vue 3 Composition API Alternative

For Vue 3 projects using `<script setup>`, you can use the Composition API pattern:

```vue
<template>
  <div class="breadcrumb-container">
    <h2>File Navigation</h2>
    <ejs-breadcrumb :items="breadcrumbItems"></ejs-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BreadcrumbComponent } from '@syncfusion/ej2-vue-navigations'

const breadcrumbItems = ref([
  { text: 'Home', url: '/' },
  { text: 'Documents', url: '/documents' },
  { text: 'Projects', url: '/documents/projects' },
  { text: 'My Project', url: '/documents/projects/my-project' }
])
</script>

<style scoped>
.breadcrumb-container {
  padding: 20px;
}
</style>
```

### Update App.vue

```vue
<template>
  <div id="app">
    <Breadcrumb />
  </div>
</template>

<script setup>
import Breadcrumb from './components/Breadcrumb.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
```

## Step 5: Run Your Application

### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite) or as indicated in your terminal.

## Understanding the Component

### Component Structure

```
<ejs-breadcrumb 
  :items="breadcrumbItems"
  enableNavigation
  @itemClick="handleItemClick"
></ejs-breadcrumb>
```

### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | Array | Array of breadcrumb items |
| `enableNavigation` | Boolean | Allow item navigation when true |
| `disabled` | Boolean | Disable the component |
| `maxItems` | Number | Maximum items before overflow |
| `overflowMode` | String | How to handle overflow ('Menu', 'Collapsed', 'Scroll', etc.) |

## Basic Item Structure

Each breadcrumb item is an object with these properties:

```javascript
{
  text: 'Item Label',        // Display text
  url: '/navigation-url',    // URL to navigate to
  disabled: false,           // Optional: disable this item
  iconCss: 'e-icons e-home'  // Optional: icon CSS class
}
```

## Enabling Navigation

To allow users to navigate by clicking breadcrumb items:

```vue
<template>
  <ejs-breadcrumb 
    :items="items" 
    enableNavigation
    @itemClick="onItemClick"
  ></ejs-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Home', url: '/' },
  { text: 'Shop', url: '/shop' },
  { text: 'Products', url: '/shop/products' }
])

const onItemClick = (args) => {
  console.log('Clicked item:', args.item.text)
  console.log('URL:', args.item.url)
  // Navigate using Vue Router or window.location
}
</script>
```

## Disabling Navigation

To display breadcrumbs without navigation:

```vue
<ejs-breadcrumb 
  :items="items"
  :enableNavigation="false"
></ejs-breadcrumb>
```

## TypeScript Configuration

If using TypeScript, add type definitions:

```typescript
import { BreadcrumbItemModel, BreadcrumbClickEventArgs } from '@syncfusion/ej2-vue-navigations'

const items = ref<BreadcrumbItemModel[]>([
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' }
])

const handleItemClick = (args: BreadcrumbClickEventArgs) => {
  console.log(args.item.text)
}
```

## Next Steps

- [Learn about Navigation and Routing](./navigation-and-routing.md)
- [Customize Breadcrumb Appearance](./customization.md)
- [Add Icons to Breadcrumbs](./icon-integration-data-binding.md)
- [Ensure Accessibility Compliance](./accessibility.md)
- [Review Complete API Reference](./api-properties-and-events.md)

## Common Issues and Solutions

### Issue: Breadcrumb Not Rendering

**Solution:** Ensure you've imported the CSS stylesheet:

```vue
<style>
@import '@syncfusion/ej2-vue-navigations/styles/bootstrap5.css';
</style>
```

### Issue: Navigation Events Not Working

**Solution:** Verify `enableNavigation` is set to `true`:

```vue
<ejs-breadcrumb :items="items" enableNavigation></ejs-breadcrumb>
```

### Issue: Items Not Displaying

**Solution:** Check that items array has the correct structure:

```javascript
// Correct structure
const items = ref([
  { text: 'Item', url: '/url' }
])

// Make sure text and url are provided
```

## Resources

- [Syncfusion Vue Documentation](https://www.syncfusion.com/vue-components)
- [Vue 3 Official Documentation](https://vuejs.org/)
- [Syncfusion Support Portal](https://support.syncfusion.com/)

## Component Registration

For the official Syncfusion Vue UG registration pattern, use Options API with `export default`:

**Local Import:**
```typescript
import { BreadcrumbComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-breadcrumb': BreadcrumbComponent
  }
}
```

**Global Registration (main.ts):**
```typescript
import { createApp } from 'vue'
import { BreadcrumbComponent } from '@syncfusion/ej2-vue-navigations'

const app = createApp(App)
app.component('ejs-breadcrumb', BreadcrumbComponent)
app.mount('#app')
```
