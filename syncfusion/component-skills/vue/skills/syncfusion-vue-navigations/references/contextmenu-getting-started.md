# Getting Started with Context Menu

## Table of Contents
- [Setup Development Environment](#setup-development-environment)
- [Adding Syncfusion Packages](#adding-syncfusion-packages)
- [Adding Style Sheets](#adding-style-sheets)
- [Add ContextMenu Component](#add-contextmenu-component)
- [Run the Application](#run-the-application)
- [Accessing ContextMenu Methods](#accessing-contextmenu-methods)

## Setup Development Environment

### Using Vite (Recommended)

Vite provides faster development, smaller bundles, and optimized builds compared to other tools.

**Create a new Vue 3 application:**

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm install
```

**For TypeScript environment:**

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
```

**Install additional dependencies:**

```bash
npm install
npm run dev
```

For detailed setup, refer to the [Vite Vue documentation](https://vitejs.dev/guide).

### Using Create Vue

Alternatively, use the official scaffolding tool:

```bash
npm init vue@latest
```

## Adding Syncfusion Packages

Install the Syncfusion ContextMenu component and dependencies:

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

This installs:
- `@syncfusion/ej2-vue-navigations` (ContextMenu component)
- All required peer dependencies

**Verify installation:**

```bash
npm list @syncfusion/ej2-vue-navigations
```

## Adding Style Sheets

### Add CSS to main.js

Update `src/main.js` to include Syncfusion stylesheets:

```js
import { createApp } from 'vue'
import App from './App.vue'

// Import Syncfusion themes
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/context-menu/index.css";

const app = createApp(App)
app.mount('#app')
```

### Available Themes

Replace `material` with your preferred theme:
- `bootstrap5`
- `fluent2`
- `tailwind`
- `fabric`
- `high-contrast`

### Alternative: CSS Imports in Component

Import styles directly in your Vue component:

```vue
<script setup>
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'
</script>

<template>
  <div id="target">Right-click here</div>
  <ejs-contextmenu target="#target" :items="items"></ejs-contextmenu>
</template>
```

## Add ContextMenu Component

### Basic Implementation

Create your first context menu in `src/App.vue`:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
])
</script>

<template>
  <div class="container">
    <h2>Context Menu Demo</h2>
    <div id="target" class="target-area">
      Right click / Touch hold to open the ContextMenu
    </div>
    
    <ejs-contextmenu
      target="#target"
      :items="items"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.target-area {
  border: 1px dashed #ccc;
  height: 150px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: context-menu;
}
</style>
```

### Component with Icons

Add icons to menu items:

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Cut', iconCss: 'e-icons e-cut', id: 'cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy', id: 'copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste', id: 'paste' },
  { separator: true },
  { text: 'Delete', iconCss: 'e-icons e-delete', id: 'delete' }
])

const handleSelect = (args) => {
  console.log('Selected:', args.item?.text)
}
</script>

<template>
  <div class="container">
    <h2>Context Menu with Icons</h2>
    <div id="target" class="target-area">
      Right click to open menu
    </div>
    
    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.target-area {
  border: 1px dashed #ccc;
  height: 150px;
  padding: 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
}
</style>
```

## Run the Application

Start the development server:

```bash
npm run dev
```

Open your browser to `http://localhost:5173` (Vite) and test the context menu:

1. Right-click on the target area
2. A popup menu appears with your menu items
3. Click an item to select it
4. The menu closes automatically

## Accessing ContextMenu Methods

Use Vue template refs to access component methods:

```vue
<script setup>
import { ref } from 'vue'

const contextMenuRef = ref(null)

const items = ref([
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
  { text: 'Delete', id: 'delete' }
])

// Programmatically open menu
const openMenu = (event) => {
  const instance = contextMenuRef.value?.ej2_instances[0]
  instance?.open(event.clientY, event.clientX)
}

// Close menu
const closeMenu = () => {
  contextMenuRef.value?.ej2_instances[0]?.close()
}

// Enable/disable items
const disablePaste = () => {
  contextMenuRef.value?.ej2_instances[0]?.enableItems(['Paste'], false)
}

// Enable item
const enablePaste = () => {
  contextMenuRef.value?.ej2_instances[0]?.enableItems(['Paste'], true)
}

// Show/hide items
const hideDelete = () => {
  contextMenuRef.value?.ej2_instances[0]?.hideItems(['Delete'])
}

const showDelete = () => {
  contextMenuRef.value?.ej2_instances[0]?.showItems(['Delete'])
}
</script>

<template>
  <div class="container">
    <h2>Context Menu with Methods</h2>
    
    <div id="target" class="target-area" @contextmenu.prevent="openMenu">
      Right click here
    </div>
    
    <div class="controls">
      <button @click="closeMenu">Close Menu</button>
      <button @click="disablePaste">Disable Paste</button>
      <button @click="enablePaste">Enable Paste</button>
      <button @click="hideDelete">Hide Delete</button>
      <button @click="showDelete">Show Delete</button>
    </div>
    
    <ejs-contextmenu
      ref="contextMenuRef"
      target="#target"
      :items="items"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.target-area {
  border: 1px dashed #ccc;
  height: 150px;
  padding: 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
```

## Complete Getting Started Example

```vue
<script setup>
import { ref, onBeforeUnmount } from 'vue'
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'

const contextMenuRef = ref(null)

const items = ref([
  { text: 'Cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' },
  { separator: true },
  { text: 'Select All', iconCss: 'e-icons e-check' },
  { separator: true },
  { text: 'Delete', iconCss: 'e-icons e-delete' }
])

const handleSelect = (args) => {
  const itemText = args.item?.text
  console.log(`Action: ${itemText}`)
  
  switch (itemText) {
    case 'Cut':
      console.log('Cut executed')
      break
    case 'Copy':
      console.log('Copy executed')
      break
    case 'Paste':
      console.log('Paste executed')
      break
    case 'Delete':
      console.log('Delete executed')
      break
  }
}

const handleBeforeOpen = (args) => {
  console.log('Menu about to open')
}

const handleCreated = () => {
  console.log('ContextMenu component created')
}

onBeforeUnmount(() => {
  // Cleanup
  contextMenuRef.value?.ej2_instances[0]?.destroy()
})
</script>

<template>
  <div class="app-container">
    <h1>Syncfusion Vue 3 Context Menu</h1>
    
    <div id="target" class="target-area">
      <p>Right-click or touch-hold here to open the context menu</p>
      <p style="font-size: 12px; color: #999;">
        Try Cut, Copy, Paste, and Delete options
      </p>
    </div>
    
    <ejs-contextmenu
      ref="contextMenuRef"
      target="#target"
      :items="items"
      @select="handleSelect"
      @beforeOpen="handleBeforeOpen"
      @created="handleCreated"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.target-area {
  border: 2px dashed #ccc;
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: context-menu;
}

.target-area p {
  margin: 5px 0;
  color: #666;
}
</style>
```

## Essential ContextMenu Methods

| Method | Parameters | Purpose |
|--------|-----------|---------|
| `open(top, left, target?)` | top: number, left: number, target?: HTMLElement | Open menu at coordinates |
| `close()` | - | Close the menu |
| `enableItems(items[], enable?, isUniqueId?)` | items: string[], enable: boolean | Enable/disable items |
| `showItems(items[], isUniqueId?)` | items: string[] | Show hidden items |
| `hideItems(items[], isUniqueId?)` | items: string[] | Hide items from display |
| `removeItems(items[], isUniqueId?)` | items: string[] | Remove items completely |
| `insertAfter(items[], text, isUniqueId?)` | items: MenuItemModel[], text: string | Insert after target |
| `insertBefore(items[], text, isUniqueId?)` | items: MenuItemModel[], text: string | Insert before target |
| `getItemIndex(item, isUniqueId?)` | item: string \| MenuItemModel | Get item position |
| `setItem(item, id?, isUniqueId?)` | item: MenuItemModel, id: string | Update item |
| `destroy()` | - | Cleanup component |

## Component Properties Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | string | - | CSS selector for trigger element |
| `items` | MenuItemModel[] | [] | Menu items array |
| `animationSettings` | MenuAnimationSettingsModel | - | Animation config |
| `enableScrolling` | boolean | false | Enable scrolling |
| `enableRtl` | boolean | false | Right-to-left support |
| `cssClass` | string | - | Custom CSS classes |
| `filter` | string | - | Filter child elements |
| `hoverDelay` | number | 400 | Submenu hover delay (ms) |
| `showItemOnClick` | boolean | false | Click to open submenus |
| `enableHtmlSanitizer` | boolean | true | Sanitize HTML |
| `enablePersistence` | boolean | false | Persist state |
| `locale` | string | 'en-US' | Localization language |
| `itemTemplate` | string \| Function | - | Custom item template |

## Next Steps

- **Add menu items:** [menu-items-and-data-binding.md](./menu-items-and-data-binding.md) - Data binding and structures
- **Handle actions:** [events-and-interaction.md](./events-and-interaction.md) - Respond to interactions
- **Customize:** [templates-and-customization.md](./templates-and-customization.md) - Custom rendering
- **Style:** [styling-and-appearance.md](./styling-and-appearance.md) - Themes and appearance
- **Accessibility:** [accessibility-and-keyboard-navigation.md](./accessibility-and-keyboard-navigation.md) - WCAG compliance
