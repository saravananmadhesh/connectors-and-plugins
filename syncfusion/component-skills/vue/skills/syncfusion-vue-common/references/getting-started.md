# Getting Started & Installation

Complete guide for installing and setting up Syncfusion Vue components in various project configurations.

## Table of Contents
- [Vue 3 Setup](#vue-3-setup)
- [Vue 2 Setup](#vue-2-setup)
- [Nuxt 3 Integration](#nuxt-3-integration)
- [Quasar Framework](#quasar-framework)
- [Vitest Testing Setup](#vitest-testing-setup)

---

## Vue 3 Setup

### Vue 3 with Composition API

The **Composition API** is the modern approach for Vue 3 applications, using `<script setup>` syntax.

#### Step 1: Create Vite Project

#### Step 2: Install Syncfusion Package

```bash
npm install @syncfusion/ej2-vue-grids@latest @syncfusion/ej2-material3-theme@latest --save
```

#### Step 3: Import and Use Component

**File: `src/App.vue`**

```vue
<template>
  <div class="app-container">
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="120" textAlign="Right"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
        <e-column field="EmployeeID" headerText="Employee ID" width="120" textAlign="Right"></e-column>
        <e-column field="Freight" headerText="Freight" width="120" format="C2" textAlign="Right"></e-column>
        <e-column field="ShipCountry" headerText="Ship Country" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, ShipCountry: 'France', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, ShipCountry: 'Germany', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, ShipCountry: 'Brazil', Freight: 65.83 }
];
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
</style>
```
---

### Vue 3 with Options API

The **Options API** is the traditional Vue approach, compatible with Vue 2 patterns.

**File: `src/App.vue`**

```vue
<template>
  <div class="app-container">
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';

export default {
  name: 'App',
  components: {
    'ejs-grid': GridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  },
  data() {
    return {
      data: [
        { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5 },
        { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6 }
      ]
    };
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
</style>
```

---

## Vue 2 Setup

### Vue 2 with Vue CLI

#### Step 1: Create Vue 2 Project using Vue CLI command

#### Step 2: Install Syncfusion Package

```bash
npm install @syncfusion/ej2-vue-grids@latest @syncfusion/ej2-material3-theme@latest --save
```

#### Step 3: Component Usage

**File: `src/App.vue`**

```vue
<template>
  <div id="app">
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import Vue from 'vue';
import { GridPlugin } from '@syncfusion/ej2-vue-grids';

Vue.use(GridPlugin);

export default {
  name: 'App',
  data() {
    return {
      data: [
        { OrderID: 10248, CustomerID: 'VINET' },
        { OrderID: 10249, CustomerID: 'TOMSP' }
      ]
    };
  }
};
</script>

<style>
@import "~@syncfusion/ej2-material3-theme/styles/grid/index.css";
</style>
```

> **Note:** Use `Vue.use()` to globally register Syncfusion plugins in Vue 2.

### Vue 2 with SCSS files

For advanced styling with SCSS preprocessor:

#### Step 1: Install SCSS Dependencies

```bash
npm install sass sass-loader --save-dev
```

#### Step 2: Use SCSS in Components

```vue
<style lang="scss">
@use "~@syncfusion/ej2-material3-theme/styles/grid/index.scss" as *;

/* Custom SCSS variables */
$primary-color: #3f51b5;

.app-container {
  background-color: $primary-color;
}
</style>
```

---

## Nuxt 3 Integration

Nuxt 3 is a powerful meta-framework for Vue 3 with server-side rendering (SSR) support.

### Step 1: Create Nuxt 3 Project

### Step 2: Install Syncfusion Package

```bash
npm install @syncfusion/ej2-vue-grids @syncfusion/ej2-material3-theme@latest --save
```

### Step 3: Configure Transpilation

Syncfusion packages use ESM syntax, while Nuxt uses CommonJS. Add transpilation config:

**File: `nuxt.config.ts`**

```typescript
export default defineNuxtConfig({
  build: {
    transpile: [/@syncfusion/]
  }
})
```

### Step 4: Use Component

**File: `app.vue`**

```vue
<template>
  <div>
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="120" textAlign="Right"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, ShipCountry: 'France', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, ShipCountry: 'Germany', Freight: 11.61 }
];
</script>

<style>
@import "./node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
</style>
```

---

## Quasar Framework

Quasar is a Vue-based framework for building responsive applications.

### Step 1: Create Quasar Project

### Step 2: Install Syncfusion Package

```bash
npm install @syncfusion/ej2-vue-grids @syncfusion/ej2-material3-theme@latest --save
```

### Step 3: Use in Quasar Component

**File: `src/pages/Index.vue`**

```vue
<template>
  <q-page class="flex flex-center">
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  </q-page>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';

const data = [
  { OrderID: 10248, CustomerID: 'VINET' },
  { OrderID: 10249, CustomerID: 'TOMSP' }
];
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
</style>
```

---


## Vitest Testing Setup

Configure Vitest for testing Syncfusion Vue components.

### Step 1: Install Vitest

### Step 2: Configure Vitest

**File: `vitest.config.js`**

```javascript
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
```

### Step 3: Write Tests

**File: `src/components/__tests__/Grid.spec.js`**

```javascript
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { GridComponent } from '@syncfusion/ej2-vue-grids';

describe('Syncfusion Grid', () => {
  it('renders grid with data', () => {
    const wrapper = mount(GridComponent, {
      props: {
        dataSource: [
          { OrderID: 10248, CustomerID: 'VINET' }
        ]
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
```

---
