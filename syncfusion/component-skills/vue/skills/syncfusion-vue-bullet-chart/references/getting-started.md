# Getting Started with Vue Bullet Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Vue 2 Setup](#vue-2-setup)
- [Vue 3 Setup](#vue-3-setup)
- [Component Registration](#component-registration)
- [Module Injection](#module-injection)
- [Basic Implementation](#basic-implementation)
- [Verify the Chart](#verify-the-chart)
- [Troubleshooting](#troubleshooting)

## Prerequisites

**System Requirements:**
- Node.js 14.x or higher
- npm 6.x or yarn 6.x
- Vue 2.7+ (for Vue 2) or Vue 3.x (for Vue 3)

**Check installed versions:**
```bash
node --version
npm --version
```

## Installation

### Step 1: Install Syncfusion Vue Charts Package

The Bullet Chart is part of the `@syncfusion/ej2-vue-charts` package:

```bash
npm install @syncfusion/ej2-vue-charts --save
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```

**Dependency Tree:**
```
@syncfusion/ej2-vue-charts
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-pdf-export
├── @syncfusion/ej2-file-utils
├── @syncfusion/ej2-charts (core)
└── @syncfusion/ej2-vue-base (Vue integration)
```

## Vue 2 Setup

### Step 1: Create Vue 2 Project

```bash
# Install Vue CLI
npm install -g @vue/cli

# Create new project
vue create my-bullet-chart-app

# Choose: "Default ([Vue 2] babel, eslint)"
```

### Step 2: Install Syncfusion Package

```bash
cd my-bullet-chart-app
npm install @syncfusion/ej2-vue-charts --save
```

### Step 3: Register Component Globally (Optional)

Edit `src/main.js`:

```javascript
import Vue from 'vue'
import App from './App.vue'
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, BulletTooltip } from '@syncfusion/ej2-vue-charts'

Vue.component('EjsBulletchart', BulletChartComponent)
Vue.component('EBulletRangeCollection', BulletRangeCollectionDirective)
Vue.component('EBulletRange', BulletRangeDirective)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## Vue 3 Setup

### Step 1: Create Vue 3 Project

**Option A: Vite (Recommended)**
```bash
npm create vite@latest my-bullet-chart-app -- --template vue
cd my-bullet-chart-app
npm install
```

**Option B: Vue CLI**
```bash
npm install -g @vue/cli@next
vue create my-bullet-chart-app
# Choose: "TypeScript, Router, Pinia, Vite"
```

### Step 2: Install Syncfusion Package

```bash
npm install @syncfusion/ej2-vue-charts --save
```

## Component Registration

### Vue 2 - Local Registration (Per Component)

`src/App.vue`:

```vue
<template>
  <div id="app">
    <ejs-bulletchart
      id="bulletChart"
      :dataSource="chartData"
      valueField="value"
      targetField="target"
      :minimum="minimum"
      :maximum="maximum"
      :interval="interval"
    ></ejs-bulletchart>
  </div>
</template>

<script>
import { BulletChartComponent } from '@syncfusion/ej2-vue-charts'

export default {
  name: 'App',
  components: {
    'ejs-bulletchart': BulletChartComponent
  },
  data() {
    return {
      chartData: [{ value: 270, target: 250 }],
      minimum: 0,
      maximum: 300,
      interval: 50
    }
  }
}
</script>
```

### Vue 3 - Composition API (Script Setup)

`src/App.vue`:

```vue
<template>
  <div class="app">
    <ejs-bulletchart
      id="bulletChart"
      :dataSource="chartData"
      valueField="value"
      targetField="target"
      :minimum="0"
      :maximum="300"
      :interval="50"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BulletChartComponent as EjsBulletchart } from '@syncfusion/ej2-vue-charts'

const chartData = ref([{ value: 270, target: 250 }])
</script>
```

### Vue 3 - Options API

`src/App.vue`:

```vue
<template>
  <div class="app">
    <ejs-bulletchart
      id="bulletChart"
      :dataSource="chartData"
      valueField="value"
      targetField="target"
      :minimum="minimum"
      :maximum="maximum"
      :interval="interval"
    ></ejs-bulletchart>
  </div>
</template>

<script>
import { BulletChartComponent } from '@syncfusion/ej2-vue-charts'

export default {
  name: 'App',
  components: {
    'ejs-bulletchart': BulletChartComponent
  },
  data() {
    return {
      chartData: [{ value: 270, target: 250 }],
      minimum: 0,
      maximum: 300,
      interval: 50
    }
  }
}
</script>
```

## Module Injection

The Bullet Chart uses feature modules. To use tooltips, ranges, or other features, inject the required module.

### Enable Tooltips (Vue 2)

```javascript
import { BulletChartComponent, BulletTooltip } from '@syncfusion/ej2-vue-charts'

export default {
  components: {
    'ejs-bulletchart': BulletChartComponent
  },
  provide: {
    bulletChart: [BulletTooltip]  // Inject tooltip module
  }
}
```

### Enable Tooltips (Vue 3 Composition API)

```vue
<script setup>
import { provide } from 'vue'
import { BulletChartComponent as EjsBulletchart, BulletTooltip } from '@syncfusion/ej2-vue-charts'

provide('bulletChart', [BulletTooltip])  // Inject tooltip module
</script>
```

## Basic Implementation

**Complete Vue 2 Example:**

```vue
<template>
  <div id="app">
    <h1>Sales Performance</h1>
    <ejs-bulletchart
      id="bulletChart"
      :dataSource="data"
      valueField="value"
      targetField="target"
      :minimum="minimum"
      :maximum="maximum"
      :interval="interval"
      title="Revenue"
      :tooltip="tooltip"
    >
      <e-bullet-range-collection>
        <e-bullet-range end="35" color="red"></e-bullet-range>
        <e-bullet-range end="50" color="blue"></e-bullet-range>
        <e-bullet-range end="100" color="green"></e-bullet-range>
      </e-bullet-range-collection>
    </ejs-bulletchart>
  </div>
</template>

<script>
import { 
  BulletChartComponent, 
  BulletRangeCollectionDirective, 
  BulletRangeDirective,
  BulletTooltip 
} from '@syncfusion/ej2-vue-charts'

export default {
  name: 'App',
  components: {
    'ejs-bulletchart': BulletChartComponent,
    'e-bullet-range-collection': BulletRangeCollectionDirective,
    'e-bullet-range': BulletRangeDirective
  },
  provide: {
    bulletChart: [BulletTooltip]
  },
  data() {
    return {
      data: [{ value: 270, target: 250 }],
      minimum: 0,
      maximum: 300,
      interval: 50,
      tooltip: { enable: true }
    }
  }
}
</script>

```

**Complete Vue 3 Example:**

```vue
<template>
  <div class="app">
    <h1>Sales Performance</h1>
    <ejs-bulletchart
      id="bulletChart"
      :dataSource="data"
      valueField="value"
      targetField="target"
      :minimum="0"
      :maximum="300"
      :interval="50"
      title="Revenue"
      :tooltip="{ enable: true }"
    >
      <e-bullet-range-collection>
        <e-bullet-range end="35" color="red"></e-bullet-range>
        <e-bullet-range end="50" color="blue"></e-bullet-range>
        <e-bullet-range end="100" color="green"></e-bullet-range>
      </e-bullet-range-collection>
    </ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import {
  BulletChartComponent as EjsBulletchart,
  BulletRangeCollectionDirective,
  BulletRangeDirective,
  BulletTooltip
} from '@syncfusion/ej2-vue-charts'

provide('bulletChart', [BulletTooltip])

const data = ref([{ value: 270, target: 250 }])
</script>

```

## Verify the Chart

### Step 1: Start Development Server

```bash
npm run serve    # Vue 2
# or
npm run dev      # Vue 3 Vite
```

### Step 2: Open Browser

Navigate to `http://localhost:8080` (Vue 2) or `http://localhost:5173` (Vite)

### Step 3: Check Results

✅ You should see a horizontal bullet chart with:
- A gray background scale (0-300)
- A blue value bar (270)
- A black target line (250)
- A title "Revenue"

## Troubleshooting

### Chart Not Rendering

**Problem:** Chart appears blank or missing

**Solutions:**

1. **Check data source** - Confirm `dataSource` contains valid data
2. **Check console** - Look for JavaScript errors in browser DevTools

### Tooltip Not Working

**Problem:** No tooltip appears on hover

**Solutions:**
1. **Inject module** - Add `BulletTooltip` to provide:
```javascript
provide: {
  bulletChart: [BulletTooltip]
}
```
2. **Enable tooltip** - Set `tooltip: { enable: true }`
3. **Check imports** - Verify `BulletTooltip` is imported

### Module Import Error

**Problem:** `Cannot find module '@syncfusion/ej2-vue-charts'`

**Solutions:**
1. **Reinstall package**: `npm install @syncfusion/ej2-vue-charts`
2. **Check package.json** - Verify package is listed in dependencies
3. **Clear node_modules**: `rm -rf node_modules && npm install`

### Version Mismatch

**Problem:** Component behavior differs or errors appear

**Solutions:**
1. **Check Vue version**: `npm list vue`
2. **Check Syncfusion version**: `npm list @syncfusion/ej2-vue-charts`
3. **Reinstall both**: `npm install vue@latest @syncfusion/ej2-vue-charts@latest`

---

**Next:** Once basic setup is complete, proceed to [data-binding-configuration.md](data-binding-configuration.md) to learn how to map your data to the chart.
