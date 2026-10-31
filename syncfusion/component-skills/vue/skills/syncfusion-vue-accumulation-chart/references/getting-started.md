# Getting Started with Accumulation Chart

## Table of Contents
- [Prerequisites](#prerequisites)
  - [System Requirements](#system-requirements)
- [Package Installation](#package-installation)
  - [Step 1: Install Syncfusion Vue Charts Package](#step-1-install-syncfusion-vue-charts-package)
  - [Step 2: Verify Dependencies](#step-2-verify-dependencies)
  - [yarn vs npm](#yarn-vs-npm)
- [Vue 2 Project Setup](#vue-2-project-setup)
  - [Using Vue CLI (Recommended)](#using-vue-cli-recommended)
  - [Existing Vue 2 Project](#existing-vue-2-project)
- [Component Registration](#component-registration)
  - [Global Registration (Recommended for Multiple Uses)](#global-registration-recommended-for-multiple-uses)
  - [Local Registration (Single Component)](#local-registration-single-component)
- [Basic Implementation](#basic-implementation)
  - [Minimal Example](#minimal-example)
  - [Data Binding](#data-binding)
  - [Mapping xName and yName](#mapping-xname-and-yname)
- [Module Injection](#module-injection)
  - [For Pie Charts](#for-pie-charts)
  - [For Doughnut Charts](#for-doughnut-charts)
  - [For Funnel Charts](#for-funnel-charts)
  - [For Pyramid Charts](#for-pyramid-charts)
  - [Multiple Modules (data labels, annotations, legends)](#multiple-modules-data-labels-annotations-legends)
- [Styling](#styling)
  - [Container Styling](#container-styling)
- [Running the Project](#running-the-project)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
  - [Expected Output](#expected-output)
- [Troubleshooting](#troubleshooting)
  - [Issue: Chart Not Rendering](#issue-chart-not-rendering)
  - [Issue: Data Not Displaying](#issue-data-not-displaying)
  - [Issue: Module Not Found Error](#issue-module-not-found-error)
  - [Issue: Legend or Data Labels Not Showing](#issue-legend-or-data-labels-not-showing)
- [Next Steps](#next-steps)
  - [Explore chart types](#explore-chart-types)
  - [Configure data labels](#configure-data-labels)
  - [Customize legend](#customize-legend)
  - [Add interactivity](#add-interactivity)

---

## Prerequisites

Before using Syncfusion Accumulation Chart, ensure your system meets these requirements:

- **Node.js**: v14 or higher
- **npm**: v5 or higher
- **Vue**: v2.x (this guide covers Vue 2)
- **Vue CLI**: v4.x or higher (optional, for project scaffolding)

Refer to [Syncfusion System Requirements](https://ej2.syncfusion.com/vue/documentation/system-requirements) for detailed compatibility information.

---

## Package Installation

### Step 1: Install Syncfusion Vue Charts Package

Run the following command in your project directory:

```bash
npm install @syncfusion/ej2-vue-charts
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```

### Step 2: Verify Dependencies

The Accumulation Chart requires these peer dependencies (automatically installed):

```
@syncfusion/ej2-vue-charts
@syncfusion/ej2-base
@syncfusion/ej2-data
@syncfusion/ej2-svg-base
```

These are automatically installed with the main package.

---

## Vue 2 Project Setup

### Using Vue CLI (Recommended)

If you don't have a Vue project yet, create one:

```bash
npm install -g @vue/cli
vue create my-app
cd my-app
```

When prompted, select **"Default ([Vue 2] babel, eslint)"**

### Existing Vue 2 Project

If you already have a Vue 2 project, verify your `package.json` contains:

```json
{
  "dependencies": {
    "vue": "^2.x.x"
  }
}
```

---

## Component Registration

### Global Registration (Recommended for Multiple Uses)

Register the component globally in your `main.js`:

```vue
import Vue from 'vue'
import App from './App.vue'

// Import Syncfusion components
import { AccumulationChartPlugin } from '@syncfusion/ej2-vue-charts'

// Install plugin
Vue.use(AccumulationChartPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### Local Registration (Single Component)

Register only in components where you use the chart:

```vue
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries } from "@syncfusion/ej2-vue-charts"

export default {
  components: {
    'ejs-accumulationchart': AccumulationChartComponent,
    'e-accumulation-series-collection': AccumulationSeriesCollectionDirective,
    'e-accumulation-series': AccumulationSeriesDirective
  },
  provide: {
    accumulationchart: [PieSeries]
  }
}
```

---

## Basic Implementation

### Minimal Example

Create a basic pie chart with data:

```vue
<template>
  <div id="app">
    <ejs-accumulationchart id="chart">
      <e-accumulation-series-collection>
        <e-accumulation-series :dataSource="chartData" xName="x" yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries } from "@syncfusion/ej2-vue-charts"

export default {
  name: "App",
  components: {
    'ejs-accumulationchart': AccumulationChartComponent,
    'e-accumulation-series-collection': AccumulationSeriesCollectionDirective,
    'e-accumulation-series': AccumulationSeriesDirective
  },
  data() {
    return {
      chartData: [
        { x: 'Jan', y: 18 },
        { x: 'Feb', y: 22 },
        { x: 'Mar', y: 35 },
        { x: 'Apr', y: 25 }
      ]
    }
  },
  provide: {
    accumulationchart: [PieSeries]
  }
}
</script>

<style>
#chart {
  height: 400px;
}
</style>
```

### Data Binding

The `dataSource` property binds to an array of objects:

```vue
// Data structure
chartData: [
  { x: 'Category Name', y: 30 },
  { x: 'Another Category', y: 45 }
]

// Mapping
// xName: Field for labels (category names)
// yName: Field for values (numeric)
```

---

## Module Injection

Different chart types require different series modules to be injected via the `provide` option.

### For Pie Charts

```vue
import { PieSeries } from "@syncfusion/ej2-vue-charts"

provide: {
  accumulationchart: [PieSeries]
}
```

### For Doughnut Charts

```vue
import { PieSeries } from "@syncfusion/ej2-vue-charts"

provide: {
  accumulationchart: [PieSeries]  // Same as pie
}
```

### For Funnel Charts

```vue
import { FunnelSeries } from "@syncfusion/ej2-vue-charts"

provide: {
  accumulationchart: [FunnelSeries]
}
```

### For Pyramid Charts

```vue
import { PyramidSeries } from "@syncfusion/ej2-vue-charts"

provide: {
  accumulationchart: [PyramidSeries]
}
```

### Multiple Modules

If using data labels, annotations, and legends:

```vue
import { PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip } from "@syncfusion/ej2-vue-charts"

provide: {
  accumulationchart: [PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]
}
```

---

## Styling

### Container Styling

Always set the chart container height:

```css
#chart {
  height: 400px;  /* Required */
  width: 100%;    /* Optional, defaults to 100% */
}
```

---

## Running the Project

### Development Server

```bash
npm run serve
```

This starts a development server (typically at `http://localhost:8080`)

The chart will render automatically with the provided data.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Expected Output

You should see:
- A circular pie chart displaying your data
- Each slice labeled with category names (xName)
- Slice sizes proportional to values (yName)
- Responsive to window resizing

---

## Troubleshooting

### Issue: Chart Not Rendering

**Symptoms:** Blank area where chart should appear

**Solutions:**
1. Verify container has `height` set (e.g., `height: 400px`)
2. Check console for module errors (`PieSeries` not provided)
3. Ensure `dataSource` contains valid data
4. Verify component imports are correct

```vue
// Correct import structure
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries
} from "@syncfusion/ej2-vue-charts"
```

### Issue: Data Not Displaying

**Symptoms:** Chart renders but no slices appear

**Solutions:**
1. Check `dataSource` has both x and y values
2. Verify `xName` and `yName` match your data property names
3. Ensure y values are numeric (not strings)
4. Check browser console for warnings

```vue
// Wrong: y is string
chartData: [{ x: 'Jan', y: '18' }]  // ❌

// Correct: y is number
chartData: [{ x: 'Jan', y: 18 }]    // ✅
```

### Issue: Module Not Found Error

**Error:** `Cannot find module '@syncfusion/ej2-vue-charts'`

**Solution:** Reinstall packages

```bash
npm install @syncfusion/ej2-vue-charts
```

### Issue: Legend or Data Labels Not Showing

**Symptoms:** Components render but legend/labels missing

**Solutions:**
1. Import required modules: `AccumulationLegend`, `AccumulationDataLabel`
2. Add to `provide` option
3. Enable via config (e.g., `legendSettings: { visible: true }`)

```vue
import { PieSeries, AccumulationDataLabel, AccumulationLegend } from "@syncfusion/ej2-vue-charts"

provide: {
  accumulationchart: [PieSeries, AccumulationDataLabel, AccumulationLegend]
}
```

---

## Next Steps

After basic setup:
1. Explore different chart types in [chart-types.md](./chart-types.md)
2. Configure data labels in [data-labels.md](./data-labels.md)
3. Customize legend in [legend-configuration.md](./legend-configuration.md)
4. Add interactivity in [advanced-features.md](./advanced-features.md)
