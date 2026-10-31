# Getting Started with Vue Grid

## Table of Contents
- [When to Use](#when-to-use)
- [Vue 3 Project Setup](#vue-3-project-setup)
- [Vue 2 Project Setup](#vue-2-project-setup)
- [Quasar Framework Setup](#quasar-framework-setup)
- [Install Syncfusion Vue Packages](#install-syncfusion-vue-packages)
- [Import CSS Styles](#import-css-styles)
- [Add Grid Component](#add-grid-component)
- [Define Row Data](#define-row-data)
- [Define Columns](#define-columns)
- [Enable Core Features](#enable-core-features)
- [Running Your Project](#running-your-project)

## When to Use

This guide provides step-by-step instructions for integrating the Syncfusion Vue Grid component into your Vue projects. Use this when:
- Setting up a new Vue project with Grid
- Installing Grid packages and dependencies
- Creating your first Grid component
- Configuring basic Grid features like paging, sorting, and filtering
- Understanding CSS theme imports and module injection

---

## Vue 3 Project Setup

### Using Vite

Create a new Vue 3 project with Vite using one of these commands:

```bash
npm create vite@latest
```

or

```bash
yarn create vite
```

**Project Configuration Steps:**

1. **Define the project name:**
   ```
   ? Project name: » my-project
   ```

2. **Select Vue as the framework:**
   ```
   ? Select a framework: » Vue
   ```

3. **Choose JavaScript as the variant:**
   ```
   ? Select a variant: » JavaScript
   ```

4. **Choose rollup-based Vite (recommended):**
   ```
   Use rolldown-vite (Experimental)? No
   ```

5. **Install dependencies and start the dev server:**
   ```
   Install with npm and start now?: Yes
   ```

If you selected "No", install manually:

```bash
cd my-project
npm install
```

or

```bash
cd my-project
yarn install
```

---

## Vue 2 Project Setup

### Using Vue CLI

Generate a Vue 2 project using Vue-CLI with these commands:

```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```

or

```bash
yarn global add @vue/cli
vue create quickstart
cd quickstart
yarn run serve
```

When creating the project, select the option: `Default ([Vue 2] babel, eslint)` from the menu.

---

## Quasar Framework Setup

### Initialize Quasar Project

Create a new Quasar project using:

```bash
npm init quasar
```

This command prompts additional configurations for your project setup. Follow the prompts and respond "yes" to dependency installation.

Navigate to the project directory:

```bash
cd quasar-project
```

---

## Install Syncfusion Vue Packages

Install the `@syncfusion/ej2-vue-grids` package using npm or yarn:

```bash
npm install @syncfusion/ej2-vue-grids --save
```

or

```bash
yarn add @syncfusion/ej2-vue-grids
```

---

## Import CSS Styles

Syncfusion components require CSS stylesheets to display correctly. Import the Material3 theme (or your preferred theme) into the `<style>` section of your main component file.

### Correct Import Order

**IMPORTANT:** Import base styles first, then component-specific styles. Missing CSS imports can result in misaligned layouts, unstyled buttons, or missing visual elements in popups and dialogs.

### Vue 3 / Quasar (App.vue or src/app.vue)

```vue
<style>
  @import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-buttons/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-calendars/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-inputs/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-navigations/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-popups/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-vue-grids/styles/material3.css";
</style>
```

### Vue 2 (App.vue)

```vue
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material3.css";
</style>
```

---

## Add Grid Component

### Vue 3 (Composition API)

Import Grid and column directives, then register them:

```vue
<script setup>
  import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';
</script>

<template>
  <div id="app">
    <ejs-grid></ejs-grid>
  </div>
</template>
```

### Vue 2 (Options API)

Import and register Grid component:

```vue
<script>
import { GridComponent } from "@syncfusion/ej2-vue-grids";

export default {
  name: "App",
  components: {
    'ejs-grid': GridComponent
  }
}
</script>

<template>
  <div id="app">
    <ejs-grid></ejs-grid>
  </div>
</template>
```

### Register Column Directives (Vue 2)

To use column directives like `e-columns` and `e-column`:

```vue
<script>
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';

export default {
  name: "App",
  components: {
    'ejs-grid': GridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  }
}
</script>
```

### Quasar (Composition API)

```vue
<script setup>
  import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';
</script>
```

---

## Define Row Data

Bind data to the Grid using the `dataSource` property. It accepts either an array of JavaScript objects or a DataManager instance.

### Vue 3 (Composition API)

```vue
<template>
  <div id="app">
    <ejs-grid :dataSource="data"></ejs-grid>
  </div>
</template>

<script setup>
  import { GridComponent as EjsGrid } from "@syncfusion/ej2-vue-grids";
  
  const data = [
    { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
    { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
    { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
    { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
    { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
    { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
    { OrderID: 10256, CustomerID: 'WELLI', Freight: 13.97 }
  ];
</script>
```

### Vue 2 (Options API)

```vue
<template>
  <div id="app">
    <ejs-grid :dataSource="data"></ejs-grid>
  </div>
</template>

<script>
import { GridComponent } from "@syncfusion/ej2-vue-grids";

export default {
  components: {
    'ejs-grid': GridComponent
  },
  data() {
    return {
      data: [
        { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
        { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
        { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
        { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
        { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
        { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
        { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
        { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
        { OrderID: 10256, CustomerID: 'WELLI', Freight: 13.97 }
      ]
    };
  }
}
</script>
```

---

## Define Columns

Add column directives to display data. Use these key properties:

- **field**: Maps to a property name in your data objects
- **headerText**: Changes the column title
- **textAlign**: Controls text alignment (defaults to Left; set to Right for numbers)
- **format**: Formats numeric and date values (e.g., 'C2' for currency)
- **width**: Sets column width

### Example

```vue
<ejs-grid :dataSource="data">
  <e-columns>
    <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
    <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
    <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
  </e-columns>
</ejs-grid>
```

---

## Enable Core Features

### Module Injection

To use advanced Grid features, inject required modules. Register them using the `provide` function (Vue 3) or `provide` object (Vue 2).

**Available Modules:**
- **Page**: Enable paging
- **Sort**: Enable sorting
- **Filter**: Enable filtering
- **Group**: Enable grouping
- **Aggregate**: Enable aggregates/summaries

### Vue 3 (Composition API)

```vue
<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, Page, Sort, Filter, Group } from "@syncfusion/ej2-vue-grids";

provide('grid', [Page, Sort, Filter, Group]);
</script>
```

### Vue 2 (Options API)

```vue
<script>
import { GridComponent, Page, Sort, Filter, Group } from '@syncfusion/ej2-vue-grids';

export default {
  components: { 'ejs-grid': GridComponent },
  provide: {
    grid: [Page, Sort, Filter, Group]
  }
}
</script>
```

### Enable Paging

Set `allowPaging` to true and configure page size:

```vue
<ejs-grid :dataSource="data" :allowPaging="true" :pageSettings='pageSettings'>
  <e-columns>
    <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
    <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
    <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
  </e-columns>
</ejs-grid>
```

**Vue 3:**
```vue
<script setup>
const pageSettings = { pageSize: 5 };
provide('grid', [Page]);
</script>
```

**Vue 2:**
```vue
<script>
export default {
  data() {
    return {
      pageSettings: { pageSize: 5 }
    };
  },
  provide: {
    grid: [Page]
  }
}
</script>
```

### Enable Sorting

Set `allowSorting` to true and inject the Sort module:

```vue
<ejs-grid :dataSource="data" :allowPaging="true" :allowSorting='true' :pageSettings='pageSettings'>
  <!-- columns -->
</ejs-grid>
```

**Important:** If the Sort module is not injected, users cannot sort by clicking headers.

### Enable Filtering

Set `allowFiltering` to true and inject the Filter module:

```vue
<ejs-grid :dataSource="data" :allowPaging="true" :allowSorting='true' :allowFiltering='true' :pageSettings='pageSettings'>
  <!-- columns -->
</ejs-grid>
```

**Important:** If the Filter module is not injected, the filter bar will not render.

### Enable Grouping

Set `allowGrouping` to true and inject the Group module:

```vue
<ejs-grid :dataSource="data" :allowPaging="true" :allowSorting='true' :allowFiltering='true' :allowGrouping='true' :pageSettings='pageSettings'>
  <!-- columns -->
</ejs-grid>
```

**Important:** If the Group module is not injected, the group drop area will not render.

---

## Running Your Project

### Vue 3 (Vite)

```bash
npm run dev
```

### Vue 2 (Vue CLI)

```bash
npm run serve
```

or

```bash
yarn run serve
```

### Quasar

```bash
npm run dev
```

Your Grid component is now ready to display and interact with data!
