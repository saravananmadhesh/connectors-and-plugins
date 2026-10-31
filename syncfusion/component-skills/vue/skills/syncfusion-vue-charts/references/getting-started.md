# Getting Started with Vue Chart

## Table of Contents

- [Installation](#installation)
  - [Step 1: Install the Chart Package](#step-1-install-the-chart-package)
  - [Step 2: Verify Dependencies](#step-2-verify-dependencies)
- [Vue 2 vs Vue 3 Setup](#vue-2-vs-vue-3-setup)
  - [Vue 3 Setup (Recommended for New Projects)](#vue-3-setup-recommended-for-new-projects)
    - [Project Setup](#project-setup)
    - [Basic Implementation (Composition API)](#basic-implementation-composition-api)
    - [Basic Implementation (Options API)](#basic-implementation-options-api)
  - [Vue 2 Setup (Legacy)](#vue-2-setup-legacy)
    - [Project Setup](#project-setup-1)
    - [Implementation](#implementation)
- [Module Registration](#module-registration)
  - [Common Module Imports](#common-module-imports)
  - [Registering Modules (Composition API)](#registering-modules-composition-api)
  - [Registering Modules (Options API)](#registering-modules-options-api)
- [Common Setup Issues](#common-setup-issues)
  - [Chart Not Rendering](#chart-not-rendering)
  - [Data Not Showing](#data-not-showing)
  - [Module Errors](#module-errors)
- [Next Steps](#next-steps)

This guide walks you through installing, setting up, and creating your first interactive chart using Syncfusion Vue Chart component.

## Installation

### Step 1: Install the Chart Package

Using npm:
```bash
npm install @syncfusion/ej2-vue-charts
```

Or yarn:
```bash
yarn add @syncfusion/ej2-vue-charts
```

### Step 2: Verify Dependencies

The Chart package automatically includes required dependencies:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-data` - Data handling
- `@syncfusion/ej2-charts` - Chart core functionality
- `@syncfusion/ej2-vue-base` - Vue base integration
- `@syncfusion/ej2-svg-base` - SVG rendering

## Vue 2 vs Vue 3 Setup

### Vue 3 Setup (Recommended for New Projects)

**Project Setup:**
```bash
npm create vite@latest my-chart-app -- --template vue
cd my-chart-app
npm install @syncfusion/ej2-vue-charts
npm run dev
```

**Basic Implementation (Composition API):**
```vue
<template>
  <div>
    <ejs-chart id="container" title="Sales Overview" :primaryXAxis='primaryXAxis'>
      <e-series-collection>
        <e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChartComponent as EjsChart, SeriesCollectionDirective as ESeriesCollection, SeriesDirective as ESeries, ColumnSeries, Category } from "@syncfusion/ej2-vue-charts";
import { provide } from "vue";

const primaryXAxis = {valueType: 'Category'};
const data = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 28 },
  { month: "Mar", sales: 34 },
  { month: "Apr", sales: 32 },
  { month: "May", sales: 40 },
  { month: "Jun", sales: 32 }
];

provide("chart", [ColumnSeries, Category]);
</script>

<style>
#container {
  height: 350px;
}
</style>
```

**Basic Implementation (Options API):**
```vue
<template>
  <div>
    <ejs-chart id="container" :title="chartTitle" :primaryXAxis="primaryXAxis">
      <e-series-collection>
        <e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script>
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, Category } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    "ejs-chart": ChartComponent,
    "e-series-collection": SeriesCollectionDirective,
    "e-series": SeriesDirective
  },
  data() {
    return {
      primaryXAxis: {
        valueType: "Category"
      },
      chartTitle: "Sales Overview",
      data: [
        { month: "Jan", sales: 35 },
        { month: "Feb", sales: 28 },
        { month: "Mar", sales: 34 },
        { month: "Apr", sales: 32 },
        { month: "May", sales: 40 },
        { month: "Jun", sales: 32 }
      ]
    };
  },
  provide: {
    chart: [ColumnSeries, Category];
  }
};
</script>

<style>
#container {
  height: 350px;
}
</style>
```

### Vue 2 Setup (Legacy)

> ⚠️ **Note:** Vue 2 reached end-of-life December 31, 2023. Use only for existing projects.

**Project Setup:**
```bash
vue create my-chart-app
cd my-chart-app
npm install @syncfusion/ej2-vue-charts
npm run serve
```

**Implementation:**
```vue
<template>
  <div id="app">
    <ejs-chart id="container" :title="chartTitle" :primaryYAxis='primaryyAxis'>
      <e-series-collection>
        <e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script>
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, Category } from "@syncfusion/ej2-vue-charts";

export default {
  name: "App",
  components: {
    "ejs-chart": ChartComponent,
    "e-series-collection": SeriesCollectionDirective,
    "e-series": SeriesDirective
  },
  data() {
    return {
      primaryyAxis: {
        labelFormat: '${value}K'
      },
      chartTitle: "Sales Overview",
      data: [
        { month: "Jan", sales: 35 },
        { month: "Feb", sales: 28 },
        { month: "Mar", sales: 34 },
        { month: "Apr", sales: 32 }
      ]
    };
  },
  provide: {
    chart: [ColumnSeries, Category];
  }
};
</script>

<style>
#container {
  height: 350px;
}
</style>
```

## Module Registration

Charts require modules to be registered via `provide()`. Each chart type needs its corresponding module.

**Common Module Imports:**
```vue
// Chart types
import { ColumnSeries, BarSeries, LineSeries, AreaSeries, PieSeries } from "@syncfusion/ej2-vue-charts";

// Axes types
import { Category, DateTime, Logarithmic } from "@syncfusion/ej2-vue-charts";

// Features
import { Legend, Tooltip, DataLabel, Crosshair } from "@syncfusion/ej2-vue-charts";
```

**Registering Modules (Composition API):**
```vue
import { provide } from "vue";
import { ColumnSeries, Category, Legend, Tooltip } from "@syncfusion/ej2-vue-charts";

provide("chart", [ColumnSeries, Category, Legend, Tooltip]);
```

**Registering Modules (Options API):**
```vue
import { ColumnSeries, Category, Legend, Tooltip } from "@syncfusion/ej2-vue-charts";

export default {
  provide: {
    chart: [ColumnSeries, Category, Legend, Tooltip];
  }
};
```

## Common Setup Issues

### Issue: Chart Not Rendering
**Cause:** Missing module registration or CSS
**Solution:** 
1. Check `provide("chart", [ChartType, AxisType])` is present
2. Check browser console for errors

### Issue: Data Not Showing
**Cause:** Incorrect data binding or missing axis configuration
**Solution:**
1. Verify `dataSource` prop matches your data array
2. Check `xName` and `yName` match your data properties
3. Add axis configuration if needed (e.g., `valueType="Category"`)

### Issue: Module Errors
**Cause:** Required chart type not provided
**Solution:** Import and register the specific chart type you need (ColumnSeries, LineSeries, etc.)

## Next Steps

- Learn about chart types: [Chart Types and Series](../chart-types-and-series.md)
- Add interactivity: [Interactions and Events](../interactions-and-events.md)
- Customize appearance: [Customization and Styling](../customization-and-styling.md)
