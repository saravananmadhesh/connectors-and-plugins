# Getting Started with Vue 3 TreeView

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Basic Component Setup](#basic-component-setup)
4. [Understanding Data Structure](#understanding-data-structure)
5. [CSS Import and Theming](#css-import-and-theming)
6. [First Interactive TreeView](#first-interactive-treeview)
7. [Enable Ripple Effects](#enable-ripple-effects)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps](#next-steps)

## Overview

The TreeView component displays hierarchical data in a tree structure. Use it to show nested categories, file systems, organization charts, navigation menus, or any multi-level data.

This guide covers:
- Installation of Syncfusion packages for Vue 3
- Component initialization with `<script setup>`
- Setting up your first TreeView
- Basic configuration options
- Theme selection

## Installation

### Step 1: Install Required Packages

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

This package includes TreeViewComponent and related dependencies:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-data` - Data management
- `@syncfusion/ej2-vue-base` - Vue 3 wrapper
- `@syncfusion/ej2-lists` - List utilities

### Step 2: Install Additional Syncfusion Packages (Optional)

For advanced features:

```bash
# For context menu integration
npm install @syncfusion/ej2-vue-popups --save

# For data binding with DataManager
npm install @syncfusion/ej2-data --save

# For styling and theming
npm install @syncfusion/ej2-vue-base --save
```

## Basic Component Setup

### Minimal TreeView with `<script setup>`

```vue
<script setup>
import { ref } from 'vue';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import "@syncfusion/ej2-material3-theme/styles/treeview/index.css";

const data = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name' }"
  />
</template>
```

This renders three items with no nesting.

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `:fields` | FieldsSettings | Maps data to TreeView structure |
| `fields.dataSource` | Array | Array of data items |
| `fields.id` | string | Property name for unique ID |
| `fields.text` | string | Property name for display text |

### Template Options: `<script setup>` vs Options API

**Vue 3 Composition API with `<script setup>` (Recommended):**

```vue
<script setup>
import { ref } from 'vue';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';

const data = ref([...]);
const selectedNode = ref(null);

const onNodeSelected = (args) => {
  selectedNode.value = args.nodeData.name;
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name' }"
    @nodeSelected="onNodeSelected"
  />
</template>
```

**Options API (Traditional):**

```vue
<script>
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';

export default {
  components: {
    'ejs-treeview': TreeViewComponent
  },
  data() {
    return {
      data: [...],
      selectedNode: null
    };
  },
  methods: {
    onNodeSelected(args) {
      this.selectedNode = args.nodeData.name;
    }
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name' }"
    @nodeSelected="onNodeSelected"
  />
</template>
```

## Understanding Data Structure

### Hierarchical Data (Nested Arrays)

Most common approach - data naturally nested with `child` property:

```vue
<script setup>
import { ref } from 'vue';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';

const hierarchicalData = ref([
  {
    id: 1,
    name: 'Syncfusion',
    expanded: true,
    child: [
      { id: 2, name: 'React Components' },
      { id: 3, name: 'Angular Components' },
      { id: 4, name: 'Vue Components' }
    ]
  },
  {
    id: 5,
    name: 'Essential Studio',
    expanded: false,
    child: [
      { id: 6, name: 'Web' },
      { id: 7, name: 'Desktop' }
    ]
  }
]);
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: hierarchicalData,
      id: 'id',
      text: 'name',
      child: 'child',
      expanded: 'expanded'
    }"
  />
</template>
```

### Self-Referential Data (Flat Arrays with parentID)

Flat array with parent-child relationship via IDs:

```vue
<script setup>
import { ref } from 'vue';

const selfRefData = ref([
  { id: 1, pid: null, name: 'Syncfusion', hasChild: true },
  { id: 2, pid: 1, name: 'React Components' },
  { id: 3, pid: 1, name: 'Angular Components' },
  { id: 4, pid: 1, name: 'Vue Components' },
  { id: 5, pid: null, name: 'Essential Studio', hasChild: true },
  { id: 6, pid: 5, name: 'Web' },
  { id: 7, pid: 5, name: 'Desktop' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: selfRefData,
      id: 'id',
      parentID: 'pid',
      text: 'name',
      hasChildren: 'hasChild'
    }"
  />
</template>
```

Use self-referential when:
- Data comes from a database query
- You're using load-on-demand (fetch children on expand)
- You need flat data structure

### Multi-Level Nesting

```vue
const deepData = ref([
  {
    id: 1,
    name: 'Level 0',
    child: [
      {
        id: 2,
        name: 'Level 1.1',
        child: [
          { id: 3, name: 'Level 2.1' },
          { id: 4, name: 'Level 2.2' }
        ]
      },
      {
        id: 5,
        name: 'Level 1.2',
        child: [
          { id: 6, name: 'Level 2.3' }
        ]
      }
    ]
  }
]);
```

## CSS Import and Theming

### Import Base CSS

```vue
<script setup>
import '@syncfusion/ej2-vue-navigations/styles/tree-view.css';
</script>
```

### Choose a Theme

Syncfusion provides multiple themes:

```vue
import "@syncfusion/ej2-material3-theme/styles/treeview/index.css";
```

### Complete Import Example

```vue
<script setup>
import { ref } from 'vue';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';

// Base CSS - required
import '@syncfusion/ej2-vue-navigations/styles/tree-view.css';

// Theme CSS
import '@syncfusion/ej2-vue-navigations/styles/material.css';

// Your custom CSS (optional)
import './treeview-custom.css';

const data = ref([...]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name' }"
  />
</template>
```

## First Interactive TreeView

### Basic Hierarchical Example with Events

```vue
<script setup>
import { ref } from 'vue';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';
import "@syncfusion/ej2-material3-theme/styles/treeview/index.css";

const employeeData = ref([
  {
    id: 1,
    name: 'CEO',
    expanded: true,
    child: [
      {
        id: 2,
        name: 'Manager - HR',
        child: [
          { id: 3, name: 'HR Executive' },
          { id: 4, name: 'Recruiter' }
        ]
      },
      {
        id: 5,
        name: 'Manager - IT',
        child: [
          { id: 6, name: 'Lead Developer' },
          { id: 7, name: 'QA Engineer' }
        ]
      }
    ]
  }
]);

const selectedNode = ref(null);

const handleNodeSelected = (args) => {
  console.log('Selected Node:', args.nodeData);
  selectedNode.value = args.nodeData.name;
};

const handleNodeExpanded = (args) => {
  console.log('Expanded Node:', args.nodeData.name);
};
</script>

<template>
  <div>
    <h2>Organization Chart</h2>
    <ejs-treeview
      :fields="{
        dataSource: employeeData,
        id: 'id',
        text: 'name',
        child: 'child',
        expanded: 'expanded'
      }"
      @nodeSelected="handleNodeSelected"
      @nodeExpanded="handleNodeExpanded"
    />
    <p v-if="selectedNode">Selected: {{ selectedNode }}</p>
  </div>
</template>
```

### With Checkboxes

```vue
<script setup>
import { ref } from 'vue';

const employeeData = ref([...]);
const checkedNodes = ref([]);

const handleNodeChecked = (args) => {
  console.log('Checked:', args.nodeData.name);
  checkedNodes.value = args.checkedNodes;
};
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: employeeData,
      id: 'id',
      text: 'name',
      child: 'child'
    }"
    :showCheckBox="true"
    :autoCheck="true"
    @nodeChecked="handleNodeChecked"
  />
  <p>Checked: {{ checkedNodes }}</p>
</template>
```

### With Drag-Drop

```vue
<ejs-treeview
  :fields="{
    dataSource: employeeData,
    id: 'id',
    text: 'name',
    child: 'child'
  }"
  :allowDragAndDrop="true"
  @nodeDropped="(args) => {
    console.log('Dropped:', args.draggedNode, 'onto', args.droppedNode);
  }"
/>
```

### With Editing

```vue
<ejs-treeview
  :fields="{
    dataSource: employeeData,
    id: 'id',
    text: 'name',
    child: 'child'
  }"
  :allowEditing="true"
  @nodeEdited="(args) => {
    console.log('Edited text:', args.newText);
  }"
/>
```

## Enable Ripple Effects

Ripple effects provide visual feedback on interactions (Material Design):

```vue
<script setup>
import { enableRipple } from '@syncfusion/ej2-base';

// Enable globally (once in main.js or here)
enableRipple(true);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name' }"
    :ripple="true"
  />
</template>
```

Or in main.js:

```javascript
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
```

## Troubleshooting

### Issue: Component Not Rendering

**Solution:** Verify CSS import - both base and theme CSS are required

```vue
// ✅ Correct - Both imports needed
import "@syncfusion/ej2-material3-theme/styles/treeview/index.css";

// ❌ Wrong - Missing theme CSS
import '@syncfusion/ej2-vue-navigations/styles/tree-view.css';
```

### Issue: Data Not Displaying

**Solution:** Check fields mapping - property names must match data

```vue
// ✅ Correct - fields matches data properties
const data = ref([
  { id: 1, name: 'Item', child: [{ id: 2, name: 'Child' }] }
]);

<ejs-treeview
  :fields="{{
    dataSource: data,
    id: 'id',           // Matches data property 'id'
    text: 'name',       // Matches data property 'name'
    child: 'child'      // Matches data property 'child'
  }}"
/>

// ❌ Wrong - Field names don't match
<ejs-treeview
  :fields="{{
    dataSource: data,
    id: 'ID',           // Data has 'id' not 'ID'
    text: 'label',      // Data has 'name' not 'label'
    child: 'children'   // Data has 'child' not 'children'
  }}"
/>
```

### Issue: Events Not Firing

**Solution:** Use correct event prop names in camelCase with `@`

```vue
// ✅ Correct - Vue event naming convention (on + event name)
<ejs-treeview
  @nodeSelected="handleSelect"     // ✅ onNodeSelected
  @nodeExpanded="handleExpand"     // ✅ onNodeExpanded
  @nodeDropped="handleDrop"        // ✅ onNodeDropped
  @nodeChecked="handleCheck"       // ✅ onNodeChecked
/>

// ❌ Wrong - Trying to use EJ2 event names
<ejs-treeview
  nodeSelected="handleSelect"      // ❌ Wrong - should be @nodeSelected
  nodeExpanded="handleExpand"      // ❌ Wrong
/>
```

### Issue: Styles Not Applied

**Solution:** Import CSS in correct order

```vue
// ✅ Correct order
import "@syncfusion/ej2-material3-theme/styles/treeview/index.css";
import './custom.css';  // Custom CSS after theme

// ❌ Wrong - Custom CSS before theme
import './custom.css';
import '@syncfusion/ej2-vue-navigations/styles/material.css';
```

### Issue: TypeScript Errors with TreeView

**Solution:** Ensure Syncfusion types are installed

```bash
npm install --save-dev @syncfusion/ej2-vue-navigations
```

And add to tsconfig.json (if needed):

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### Issue: Data Not Updating When Changed

**Solution:** Make sure data is wrapped in `ref()` and modifications trigger reactivity

```vue
<script setup>
import { ref } from 'vue';

// ✅ Correct - Wrapped in ref
const data = ref([...]);

const addItem = () => {
  // Trigger reactivity with new array reference
  data.value = [...data.value, { id: 4, name: 'New Item' }];
  // OR use array method that Vue tracks
  data.value.push({ id: 4, name: 'New Item' });
};
</script>
```

## Next Steps

1. **Learn Data Binding** → [Data Binding Guide](data-binding.md) - Explore all 5 binding patterns
2. **Add Selection** → [Selection and Checking](selection-and-checking.md) - Single/multi-select, checkboxes
3. **Enable Editing** → [Inline Editing](inline-editing.md) - Let users edit node text
4. **Add Templates** → [Templates and Rendering](templates-and-rendering.md) - Custom node appearance with v-slot
5. **Master Drag-Drop** → [Drag-Drop and Reordering](drag-drop-and-reordering.md) - Node reordering

---

**Key Takeaways:**
- ✅ Install `@syncfusion/ej2-vue-navigations`
- ✅ Import both tree-view.css and theme CSS
- ✅ Set up `fields` prop to map data correctly
- ✅ Use hierarchical or self-referential data as appropriate
- ✅ Use Vue 3 event names: `@` + event name (e.g., `@nodeSelected`)
- ✅ Wrap data in `ref()` for reactivity
- ✅ Use `<script setup>` for cleaner Composition API code
