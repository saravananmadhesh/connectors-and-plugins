# Getting Started with PivotView

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Imports](#css-imports)
  - [Available Themes](#available-themes)
  - [Recommended: Use a Single Theme Package (Tailwind 3)](#recommended-use-a-single-theme-package-tailwind-3)
  - [Alternative: Import Each Dependency Individually](#alternative-import-each-dependency-individually)
  - [Theme Application Methods Summary](#theme-application-methods-summary)
- [Basic Setup](#basic-setup)
- [Module Injection](#module-injection)
- [Adding Fields](#adding-fields)
- [Formatting Values](#formatting-values)
- [Enable Field List](#enable-field-list)
- [Enable Grouping Bar](#enable-grouping-bar)
- [Field List Component](#field-list-component)
- [Grouping Bar Component](#grouping-bar-component)
- [Accessibility Basics](#accessibility-basics)
- [Vue 3 Integration](#vue-3-integration)
  - [Composition API](#composition-api-with-script-setup)
  - [Nuxt.js Integration](#nuxtjs-integration)
  - [Module Import Optimization](#module-import-optimization)

## Prerequisites

### System Requirements
- Node.js and npm
- Vue 2 or Vue 3
- Vue-CLI installed globally

### Dependencies
The PivotView component has a structured dependency tree. Core packages include:

```
@syncfusion/ej2-vue-pivotview
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-excel-export
├── @syncfusion/ej2-pdf-export
├── @syncfusion/ej2-charts
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-buttons
├── @syncfusion/ej2-dropdowns
├── @syncfusion/ej2-grids
└── @syncfusion/ej2-navigations
```

## Installation

### Step 1: Create Vue Project
```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```

When prompted, select `Default ([Vue 2] babel, eslint)`.

### Step 2: Install PivotView Package
```bash
npm install @syncfusion/ej2-vue-pivotview --save
```

or

```bash
yarn add @syncfusion/ej2-vue-pivotview
```

### Step 3: Install a Theme Package (Tailwind 3)
The Pivot Table component looks unstyled without a theme. Install a theme package (Tailwind 3 is recommended for new projects) so the styles are picked up by the single `@import` in the **CSS Imports** section below:

```bash
npm install @syncfusion/ej2-tailwind3-theme --save
```

or

```bash
yarn add @syncfusion/ej2-tailwind3-theme
```

## CSS Imports

Themes for the Syncfusion Vue Pivot Table can be applied using CSS or SASS files from the [npm theme packages](https://ej2.syncfusion.com/vue/documentation/appearance/theme#theme-packages), CDN, CRG, or [Theme Studio](https://ej2.syncfusion.com/vue/documentation/appearance/theme-studio). For more information, refer to the [themes documentation](https://ej2.syncfusion.com/vue/documentation/appearance/theme).

### Available Themes
- Material (default)
- Fabric
- Bootstrap
- Material3
- Tailwind 3 (recommended for new projects)
- High Contrast

### Recommended: Use a Single Theme Package (Tailwind 3)

The simplest way to theme the Pivot Table is to install a single theme package. Each component in the theme package ships an `index.css` file that automatically pulls in **all required dependency styles** (base, inputs, buttons, dropdowns, lists, popups, navigations, grids, pivotview, etc.), so you only need to write **one** `@import` line.

This is the same approach shown in the official `docs/getting-started.md` and is what you should default to for new projects.

**1. Install the Tailwind 3 theme package:**

```bash
npm install @syncfusion/ej2-tailwind3-theme --save
```

or

```bash
yarn add @syncfusion/ej2-tailwind3-theme
```

**2. Import the Pivot Table theme in the `<style>` section of `src/App.vue`:**

```vue
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

> **Why a single import?** The `pivotview/index.css` entry of the theme package automatically loads the styles for every dependency the Pivot Table needs (base, inputs, buttons, dropdowns, lists, popups, navigations, grids, etc.). You do not need to import each dependency's CSS file manually.

### Alternative: Import Each Dependency Individually

If you are **not** using a theme package (for example, you are pinned to Material 3 or another pre-Tailwind 3 theme), you must import each dependency's CSS file yourself. Below is the equivalent list for the **Material 3** theme:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-grids/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-pivotview/styles/material3.css";
</style>
```

> **When to use this approach:** Only when the team-wide theme is one of the pre-Tailwind 3 themes (Material, Material 3, Fabric, Bootstrap, High Contrast). For Tailwind 3 and any new project, prefer the single-import approach above.

### Theme Application Methods Summary

| Method | Best For | Notes |
|--------|----------|-------|
| **npm theme package** (e.g. `@syncfusion/ej2-tailwind3-theme`) | New projects, local builds | One `@import` line covers all dependencies |
| **CDN** | Demos, prototypes, no build step | Add a `<link>` to the CDN-hosted CSS |
| **CRG** (Common Resource Generator) | Custom-built subset of CSS | Generates a CSS bundle from the Syncfusion CRG tool |
| **Theme Studio** | Visually customized themes | Generates a downloadable theme CSS you host yourself |

## Basic Setup

### Import Component
```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

// ✓ SECURE: Use local data by default
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  filters: []
};
const height = 350;
</script>

<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height"></ejs-pivotview>
  </div>
</template>
```

**⚠️ Security Note**: The example above uses local, in-memory data. This is the most secure approach. If you need to bind remote data, see [Data Binding](data-binding.md#remote-data-loading) and [Database Connectivity](connecting-to-data-source.md) for secure implementation patterns. Always validate and sanitize data from external sources.

### Sample Data Structure
```vue
<script setup>
// pivotData.js
export const pivotData = [
  {
    "balance": 2430.87,
    "quantity": 11,
    "name": "Skinner Ward",
    "gender": "male",
    "company": "GROK",
    "state": "New Jersey"
  },
  // ... more records
];
</script>
```

## Module Injection

### Available Modules
- `GroupingBar` - Drag-drop field management
- `FieldList` - Interactive field selection
- `CalculatedField` - Custom formulas
- `ExcelExport` - Excel export
- `PDFExport` - PDF export
- `PivotChart` - Chart visualization

### Inject Modules
```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar, FieldList } from "@syncfusion/ej2-vue-pivotview";

provide('pivotview', [GroupingBar, FieldList]);
</script>
```

> Only inject modules you use to maintain bundle size.

## Adding Fields

### Field Axes
| Axis | Purpose | Example |
|------|---------|---------|
| `rows` | Row headers | [{ name: 'Country' }, { name: 'Product' }] |
| `columns` | Column headers | [{ name: 'Year' }, { name: 'Quarter' }] |
| `values` | Aggregated data | [{ name: 'Sold' }, { name: 'Amount' }] |
| `filters` | Master filters | [{ name: 'Region' }] |

### Field Properties
```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height"></ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    {
      name: 'CountryField',          // Must match data source exactly
      caption: 'Country',             // Display name
      type: 'Sum',                    // Aggregation type (Sum, Count, Average, Min, Max)
      expandAll: false,               // Expand/collapse state
      dataType: 'string'              // Data type
    }
  ],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
const height = 350;
</script>

<style>
/* Tailwind 3 theme package — single import covers all Pivot Table dependencies */
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Example Configuration
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    { name: 'Country', caption: 'Country', expandAll: false },
    { name: 'Products', caption: 'Product Category' }
  ],
  columns: [
    { name: 'Year', caption: 'Year' },
    { name: 'Quarter', caption: 'Quarter' }
  ],
  values: [
    { name: 'Sold', caption: 'Units Sold', type: 'Sum' },
    { name: 'Amount', caption: 'Sold Amount', type: 'Sum' }
  ],
  filters: []
};
</script>
```

## Formatting Values

### Format Codes
| Code | Display | Example |
|------|---------|---------|
| C0 | Currency (no decimals) | $1,234 |
| C2 | Currency (2 decimals) | $1,234.56 |
| N2 | Number (2 decimals) | 1,234.56 |
| P0 | Percentage | 50% |
| P2 | Percentage (2 decimals) | 50.25% |

### Apply Formatting
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  // ... other settings
  formatSettings: [
    { name: 'Amount', format: 'C0' },      // Currency
    { name: 'Quantity', format: 'N2' }     // Number
  ]
};
</script>
```

## Enable Field List

The field list allows users to dynamically add/remove/rearrange fields at runtime.

### Setup
```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";

const showFieldList = true;

provide('pivotview', [FieldList]);
</script>

<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :height="height"
    :showFieldList="showFieldList">
  </ejs-pivotview>
</template>
```

## Enable Grouping Bar

The grouping bar allows drag-drop field management directly in the component.

### Setup
```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar } from "@syncfusion/ej2-vue-pivotview";

const showGroupingBar = true;

provide('pivotview', [GroupingBar]);
</script>

<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :height="height"
    :showGroupingBar="showGroupingBar">
  </ejs-pivotview>
</template>
```

### Grouping Bar Features
- Drag fields between axes
- Sort/filter at runtime
- Remove fields easily
- Reorder fields with drag-drop

## Field List Component

The Field List provides a UI for users to dynamically configure rows, columns, values, and filters by dragging fields.

### Enable Field List
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :showFieldList="true"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
const showFieldList = true;  // Shows field organization dialog
</script>
```

### Field List Configuration
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: [],
  
  // Field list settings
  fieldMapping: [
    { name: 'Country', caption: 'Country Name', type: 'string' },
    { name: 'Year', caption: 'Production Year', type: 'number' },
    { name: 'Sales', caption: 'Total Sales', type: 'number' }
  ]
};

// Show field list when component is empty for better UX
const showFieldListOnEmpty = true;
</script>
```

### User Workflow
1. User clicks Field List button (in toolbar or explicitly via method)
2. Draggable field categories appear (Rows, Columns, Values, Filters)
3. Drag field from list to desired category
4. Release to add to pivot configuration
5. Click "Apply" to refresh pivot

### Programmatic Field List
```vue
<template>
  <button @click="openFieldList">Configure Fields</button>
</template>

<script setup>
import { ref } from 'vue';

const pivot = ref(null);

const openFieldList = () => {
  // Opens the field list dialog programmatically
  pivot.value?.invokeFieldListDialog?.();
  // Alternative: pivot.value?.fieldListRefresh?.();
};
</script>
```

---

## Grouping Bar Component

The Grouping Bar provides inline field control, allowing users to add, remove, and rearrange fields directly in the interface.

### Grouping Bar Configuration
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :showGroupingBar="true"
    :groupingBarSettings="groupingBarSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
const groupingBarSettings = {
  showFieldsPanel: true,        // Show/hide field panel
  showValueTypeIcon: true,      // Show aggregation type icons
  allowDragAndDrop: true        // Enable drag-drop reordering
};
</script>
```

### Grouping Bar Features
- **Drag & Drop:** Reorder fields between rows, columns, values, filters
- **Type Indicators:** Show aggregation types (Sum, Count, etc.)
- **Remove Buttons:** Quick field removal
- **Filter Chips:** Show active filters visually
- **Sort Indicators:** Display field sorting direction

### Comparison: Field List vs Grouping Bar

| Feature | Field List | Grouping Bar |
|---------|-----------|-------------|
| **Location** | Dialog/Popup | Inline at top |
| **Drag-Drop** | Yes | Yes |
| **Always Visible** | No (modal) | Yes |
| **Best Use** | Power users | Quick edits |
| **Space Occupied** | Temporary | Permanent |

---

## Loading States & Indicators

Handle loading states and show progress indicators during data processing.

### Default Loading Indicator
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :dataBound="onDataBound">
  </ejs-pivotview>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);

const onDataBound = () => {
  isLoading.value = false;
};
</script>
```



---

## Accessibility Basics

PivotView supports WCAG 2.1 standards for accessible data visualization.

### Enable Accessibility Features
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    role="grid"
    tabindex="0">
  </ejs-pivotview>
</template>
```

### Keyboard Navigation
| Key | Action |
|-----|--------|
| Tab | Navigate between cells |
| Enter | Expand/collapse groups |
| Arrow Keys | Move between cells |
| Escape | Close dialogs |
| Space | Select cell |

### Screen Reader Support
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country', caption: 'Country Name' }],
  columns: [{ name: 'Year', caption: 'Production Year' }],
  values: [{ name: 'Sales', caption: 'Total Sales Amount' }]
};
</script>
```

**Best Practice:** Use `caption` property on all fields for clear screen reader descriptions.

### Color Contrast & Visibility
```vue
<style>
/* High contrast theme for better visibility */
:root {
  --primary-text: #000000;
  --secondary-text: #333333;
  --background: #FFFFFF;
  --border: #000000;
}

.e-pivotview {
  color: var(--primary-text);
  background: var(--background);
  border: 1px solid var(--border);
}
</style>
```

## Vue 3 Integration

### Composition API with `<script setup>`
The modern approach using Vue 3's `<script setup>` syntax:

```vue
<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview, FieldList, GroupingBar } from "@syncfusion/ej2-vue-pivotview";
import { provide } from 'vue';
import { pivotData } from './pivotData.js';

const dataSourceSettings = ref({
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  filters: []
});
const height = ref(350);

provide('pivotview', [FieldList, GroupingBar]);
</script>

<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings" 
      :height="height"
      :showFieldList="true"
      :showGroupingBar="true">
    </ejs-pivotview>
  </div>
</template>

<style scoped>
/* Component styles */
</style>
```

### Nuxt.js Integration

For Nuxt.js projects, use dynamic imports to avoid SSR hydration issues:

```vue
<!-- app.vue -->
<template>
  <div id="app">
    <ClientOnly fallback="Loading PivotView...">
      <PivotViewComponent 
        :dataSourceSettings="dataSourceSettings" 
        :height="height"
        :showFieldList="true">
      </PivotViewComponent>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { pivotData } from '@/data/pivotData';

const dataSourceSettings = ref({
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
});
const height = ref(350);
</script>
```

### Module Import Optimization

When using multiple Syncfusion modules, group imports efficiently:

```vue
<script setup>
// Better: Import together
import { 
  PivotViewComponent, 
  FieldList, 
  GroupingBar, 
  ExcelExport, 
  PDFExport 
} from "@syncfusion/ej2-vue-pivotview";

// Then provide modules
provide('pivotview', [FieldList, GroupingBar, ExcelExport, PDFExport]);
</script>
```

> Only import modules you actually use to keep bundle size minimal.

## Complete Example with Toolbar, FieldList & GroupingBar

Here's a comprehensive example combining all key features:

```vue
<template>
  <div id="app" class="pivot-container">
    <h1>Pivot Table with All Features</h1>
    
    <ejs-pivotview
      ref="pivotview"
      id="pivotview"
      :dataSourceSettings="dataSourceSettings"
      :gridSettings="gridSettings"
      :height="'600px'"
      :width="'100%'"
      :showFieldList="showFieldList"
      :showGroupingBar="showGroupingBar"
      :showToolbar="showToolbar"
      :toolbar="toolbarItems"
      :groupingBarSettings="groupingBarSettings"
      :dataBound="onDataBound"
      :created="onCreated"
      :toolbarRender="onToolbarRender">
    </ejs-pivotview>

    <!-- Control Buttons -->
    <div class="controls">
      <button @click="toggleFieldList">Toggle FieldList</button>
      <button @click="toggleToolbar">Toggle Toolbar</button>
      <button @click="toggleGroupingBar">Toggle GroupingBar</button>
      <button @click="resetFields">Reset Fields</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, provide } from 'vue';
import {
  PivotViewComponent as EjsPivotview,
  FieldList,
  GroupingBar,
  Toolbar,
  PDFExport,
  ExcelExport,
  ConditionalFormatting
} from '@syncfusion/ej2-vue-pivotview';
import { pivotData } from './pivotData.js';

const pivotview = ref(null);

// UI State
const showFieldList = ref(true);
const showToolbar = ref(true);
const showGroupingBar = ref(true);

// Toolbar Configuration
const toolbarItems = [
  'New', 'Save', 'SaveAs', 'Rename', 'Delete', 'Load',
  'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal',
  'ConditionalFormatting', 'FieldList'
];

// GroupingBar Settings
const groupingBarSettings = reactive({
  showFieldsPanel: true,
  showFilterIcon: true,
  showSortIcon: true,
  showRemoveIcon: true
});

// Data Source Configuration
const dataSourceSettings = reactive({
  dataSource: pivotData,
  expandAll: false,
  allowDeferLayoutUpdate: false,
  rows: [
    { name: 'Country', caption: 'Country', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true },
    { name: 'Region', caption: 'Region', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ],
  columns: [
    { name: 'Year', caption: 'Year', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true },
    { name: 'Quarter', caption: 'Quarter', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ],
  values: [
    { name: 'Sales', caption: 'Total Sales', type: 'Sum', format: 'C2' },
    { name: 'Profit', caption: 'Total Profit', type: 'Sum', format: 'C2' }
  ],
  filters: [
    { name: 'Product', caption: 'Product', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ],
  formatSettings: [
    { name: 'Sales', format: 'C0' },
    { name: 'Profit', format: 'C0' }
  ]
});

// Grid Settings
const gridSettings = reactive({
  columnWidth: 140,
  rowHeight: 36,
  layout: 'Compact',
  allowResizing: true,
  allowTextWrap: true,
  clipMode: 'Clip'
});

// Provide required modules
provide('pivotview', [
  FieldList,
  GroupingBar,
  Toolbar,
  PDFExport,
  ExcelExport,
  ConditionalFormatting
]);

// Event Handlers
const onCreated = () => {
  console.log('✓ Pivot table created');
};

const onDataBound = () => {
  console.log('✓ Data bound');
};

const onToolbarRender = (args) => {
  console.log('✓ Toolbar rendered');
};

const toggleFieldList = () => {
  showFieldList.value = !showFieldList.value;
};

const toggleToolbar = () => {
  showToolbar.value = !showToolbar.value;
};

const toggleGroupingBar = () => {
  showGroupingBar.value = !showGroupingBar.value;
};

const resetFields = () => {
  dataSourceSettings.rows = [
    { name: 'Country', caption: 'Country', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ];
  dataSourceSettings.columns = [
    { name: 'Year', caption: 'Year', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ];
  dataSourceSettings.values = [
    { name: 'Sales', caption: 'Total Sales', type: 'Sum', format: 'C2' }
  ];
  dataSourceSettings.filters = [];
  
  console.log('✓ Fields reset');
};
</script>

<style scoped>
.pivot-container {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.controls button {
  padding: 10px 15px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.controls button:hover {
  background: #764ba2;
  transform: translateY(-2px);
}
</style>
```

This complete example includes:
- **Toolbar**: All standard operations (New, Save, Load, Export, etc.)
- **FieldList**: Interactive field configuration dialog
- **GroupingBar**: Drag-drop field management with icons
- **GridSettings**: Optimized column/row dimensions
- **Control Buttons**: Toggle features dynamically
- **Event Handlers**: Monitor pivot table lifecycle

