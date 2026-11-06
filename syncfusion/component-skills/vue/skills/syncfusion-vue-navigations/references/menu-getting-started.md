# Getting Started with Vue 3 Menu Component

## Table of Contents
- [Dependencies](#dependencies)
- [Development Environment Setup](#development-environment-setup)
- [Installing Syncfusion Packages](#installing-syncfusion-packages)
- [Adding Stylesheets](#adding-stylesheets)
- [Creating Your First Menu](#creating-your-first-menu)
- [MenuItemModel Structure](#menuitemmodel-structure)
- [Rendering and Initialization](#rendering-and-initialization)

## Dependencies

The Menu component requires the following packages:

```
@syncfusion/ej2-vue-navigations
├── @syncfusion/ej2-vue-base
├── @syncfusion/ej2-navigations
└── @syncfusion/ej2-base
```

These dependencies handle the core navigation functionality, base UI utilities, and Vue integration.

## Development Environment Setup

### Using Vite (Recommended)

Vite provides faster development and smaller bundle sizes.

**Create a new Vue 3 application:**
```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm install
npm run dev
```

**Create a new Vue 3 + TypeScript application:**
```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
npm run dev
```

## Installing Syncfusion Packages

Install the Menu component and its dependencies:

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

This command automatically installs all required peer dependencies.

## Adding Stylesheets

Add the Menu component's CSS imports to your main `App.vue` file or `main.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/menu/index.css";
```

**Available themes:**
- `tailwind3.css` (default)
- `bootstrap5.3.css`
- `fluent2.css`
- `material3.css`

Choose the theme that matches your design requirements and replace `tailwind3` accordingly.

## Creating Your First Menu

### Basic Menu with MenuItemModel

Create a functional component with a simple menu structure:

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

// Define menu items
const menuItems = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' },
      { text: 'Close' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  },
  {
    text: 'View',
    items: [
      { text: 'Toolbar' },
      { text: 'Sidebar' }
    ]
  },
  {
    text: 'Tools',
    items: [
      { text: 'Options' },
      { text: 'Settings' }
    ]
  },
  {
    text: 'Help'
  }
]);
</script>

<template>
  <div class="App">
    <h1>Menu Component</h1>
    <ejs-menu :items="menuItems"></ejs-menu>
  </div>
</template>

<style scoped>
.App {
  padding: 20px;
}
</style>
```

## MenuItemModel Structure

MenuItemModel defines the properties for each menu item:

```typescript
interface MenuItemModel {
  // Text displayed for the menu item
  text?: string;

  // Array of sub-menu items (creates hierarchical menus)
  items?: MenuItemModel[];

  // CSS ID for the item element
  id?: string;

  // URL for navigation links
  url?: string;

  // Icon CSS class (e.g., 'e-icons e-cut')
  iconCss?: string;

  // HTML attributes (data-*, aria-*, etc.)
  htmlAttributes?: { [key: string]: string };

  // Separator line between items
  separator?: boolean;

  // Disable the menu item
  disabled?: boolean;

  // Hide the menu item
  hidden?: boolean;
}
```

### Practical Examples

**Menu with icons:**
```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const menuItems = ref([
  {
    text: 'File',
    iconCss: 'e-icons e-file',
    items: [
      { text: 'New', iconCss: 'e-icons e-new' },
      { text: 'Open', iconCss: 'e-icons e-open' },
      { separator: true },
      { text: 'Exit', iconCss: 'e-icons e-exit' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="menuItems"></ejs-menu>
</template>
```

**Menu with separators:**
```vue
<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { text: 'File' },
  { text: 'Edit' },
  { separator: true },
  { text: 'Help' }
]);
</script>

<template>
  <ejs-menu :items="menuItems"></ejs-menu>
</template>
```

**Menu with mixed items:**
```vue
<script setup>
import { ref } from 'vue';

const menuItems = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { separator: true },
      { text: 'Recent Files' },
      { separator: true },
      { text: 'Exit' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="menuItems"></ejs-menu>
</template>
```

## Rendering and Initialization

### Enable Ripple Effect (Optional)

For Material Design ripple effects on menu items:

```vue
<script setup>
import { onMounted } from 'vue';
import { enableRipple } from '@syncfusion/ej2-base';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

onMounted(() => {
  enableRipple(true);
});
</script>
```

### Complete Application Example

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { enableRipple } from '@syncfusion/ej2-base';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

onMounted(() => {
  enableRipple(true);
});

const menuItems = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' },
      { separator: true },
      { text: 'Exit' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  }
]);
</script>

<template>
  <div class="App">
    <h1>Vue 3 Menu</h1>
    <ejs-menu :items="menuItems"></ejs-menu>
  </div>
</template>

<style scoped>
.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

:deep(.e-menu) {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
}

:deep(.e-menu-item:hover) {
  background-color: #e0e0e0;
}
</style>
```

### Styling the Menu Container

Add CSS to style the menu wrapper:

```css
/* Menu container styling */
.e-menu {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0;
}

/* Menu item hover state */
.e-menu-item:hover {
  background-color: #e0e0e0;
}

/* Active menu item */
.e-menu-item.e-active {
  background-color: #1976d2;
  color: white;
}

/* Icon styling */
.e-menu-item .e-icons {
  margin-right: 8px;
}
```

## Next Steps

- Read [data-binding.md](data-binding.md) to populate menus from JSON data sources
- Read [events-and-callbacks.md](events-and-callbacks.md) to respond to menu item clicks
- Read [menu-items-customization.md](menu-items-customization.md) to dynamically add/remove items
