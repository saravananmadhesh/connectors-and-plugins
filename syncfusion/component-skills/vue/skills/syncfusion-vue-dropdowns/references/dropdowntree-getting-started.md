# Getting Started with Vue 3 Dropdown Tree

## Table of Contents

- [Dependencies](#dependencies)
- [Project Setup](#project-setup)
- [Installation](#installation)
- [Basic Implementation](#basic-implementation)
- [Styling](#styling)
- [Minimal Example](#minimal-example)

## Dependencies

The Dropdown Tree component requires the following packages:

```javascript
|-- @syncfusion/ej2-vue-dropdowns
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-data
    |-- @syncfusion/ej2-vue-base
    |-- @syncfusion/ej2-dropdowns
        |-- @syncfusion/ej2-lists
        |-- @syncfusion/ej2-inputs
        |-- @syncfusion/ej2-navigations
        |-- @syncfusion/ej2-popups
            |-- @syncfusion/ej2-buttons
```

These are automatically installed when you install the main package.

## Project Setup

### Using Vite (Recommended)

Vite provides a faster development environment and optimized builds.

**Create a new Vue 3 project:**

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm run dev
```

**Or with TypeScript:**

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm run dev
```

### Using Create Vue

The official scaffolding tool for Vue 3 projects:

```bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
```

## Installation

Install the Dropdown Tree package from npm:

```bash
npm install @syncfusion/ej2-vue-dropdowns --save
```

This single command installs all required dependencies listed above.

## Basic Implementation

### Step 1: Import Components and Styles

```vue
<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
import '@syncfusion/ej2-dropdowns/styles/material.css'; // or other themes
</script>
```

### Step 2: Prepare Data

Create your hierarchical data source:

```vue
<script setup>
const treeData = [
  { id: '1', name: 'Electronics', expanded: true },
  { id: '2', name: 'Laptops', parentId: '1' },
  { id: '3', name: 'Desktops', parentId: '1' },
  { id: '4', name: 'Appliances' },
  { id: '5', name: 'Refrigerators', parentId: '4' },
];
</script>
```

### Step 3: Create the Component

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    placeholder="Select an item"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeData = [
  { id: '1', name: 'Electronics', expanded: true },
  { id: '2', name: 'Laptops', parentId: '1' },
  { id: '3', name: 'Desktops', parentId: '1' },
  { id: '4', name: 'Appliances' },
  { id: '5', name: 'Refrigerators', parentId: '4' },
];

const fields = {
  dataSource: treeData,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
  hasChildren: 'isParent'
};
</script>
```

## Styling

### Available Themes

Import the appropriate theme CSS:

```vue
<script setup>
// Material theme (default)
import '@syncfusion/ej2-dropdowns/styles/material.css';

// Bootstrap theme
// import '@syncfusion/ej2-dropdowns/styles/bootstrap.css';

// Tailwind theme
// import '@syncfusion/ej2-dropdowns/styles/tailwind.css';

// Fluent theme
// import '@syncfusion/ej2-dropdowns/styles/fluent.css';
</script>
```

### Global Styles

Apply theme globally in your main CSS file or app entry:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/drop-down-tree/index.css";
```

### Custom CSS

Override component styles with custom CSS:

```css
.e-dropdowntree .e-list-item {
  padding: 10px 15px;
  font-size: 14px;
}

.e-dropdowntree .e-input {
  border-radius: 4px;
}
```

## Minimal Example

Complete working example with Vue 3 Composition API and TypeScript:

```vue
<template>
  <div class="container">
    <h1>Dropdown Tree Component</h1>
    <DropDownTreeComponent
      id="dropdowntree"
      :fields="fields"
      placeholder="Select a category"
      style="width: 100%; max-width: 300px;"
    />
  </div>
</template>

<script setup lang="ts">
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
import '@syncfusion/ej2-dropdowns/styles/material.css';

interface TreeNode {
  id: string;
  name: string;
  parentId?: string;
}

const hierarchicalData: TreeNode[] = [
  {
    id: '1',
    name: 'Bookstore',
    // expanded: true, // Can add if needed
  },
  {
    id: '2',
    name: 'Books',
    parentId: '1',
  },
  {
    id: '3',
    name: 'Fiction',
    parentId: '2',
  },
  {
    id: '4',
    name: 'Science Fiction',
    parentId: '3',
  },
  {
    id: '5',
    name: 'Fantasy',
    parentId: '3',
  },
  {
    id: '6',
    name: 'Non-Fiction',
    parentId: '2',
  },
  {
    id: '7',
    name: 'Technology',
    parentId: '6',
  },
  {
    id: '8',
    name: 'Self-Help',
    parentId: '6',
  },
];

const fields = {
  dataSource: hierarchicalData,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
  hasChildren: 'hasChild'
};
</script>

<style scoped>
.container {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
```

### Running the Example

1. **Replace** the default component in your `src/App.vue` with the example above
2. **Run** the development server:
   ```bash
   npm run dev
   ```
3. **Open** the browser and navigate to `http://localhost:5173` (Vite)

### Expected Output

- A text input with placeholder "Select a category"
- When clicked, displays a collapsible tree structure
- Users can expand/collapse categories
- Single selection is the default behavior
- Clicking an item closes the popup and displays the selection

## TypeScript Support

The component works seamlessly with TypeScript. Define interfaces for your data:

```typescript
interface TreeNode {
  id: string;
  name: string;
  parentId?: string;
  expanded?: boolean;
  hasChildren?: boolean;
}

interface FieldsConfig {
  dataSource: TreeNode[];
  value: string;
  text: string;
  parentValue?: string;
  child?: string;
  hasChildren?: string;
}

const fields: FieldsConfig = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
  hasChildren: 'hasChild'
};
```

## Common Setup Issues

### Issue: Component not rendering
**Solution**: Ensure CSS is imported and component is registered in template.

### Issue: Data not displaying
**Solution**: Verify field mapping matches your data structure (value, text, parentValue/child).

### Issue: Styles look wrong
**Solution**: Check that theme CSS is imported before other styles to avoid conflicts.

## Next Steps

After getting started, explore these features:
- [Data Binding](../references/data-binding.md) - Local and remote data sources
- [Templates](../references/templates.md) - Customize item and value display
- [Multi-Selection](../references/multi-selection-filtering.md) - Enable multi-select with filtering
- [Tree Settings](../references/tree-settings.md) - Configure advanced tree behavior
