# Pivot Chart

## Table of Contents
- [Overview](#overview)
- [Display Options](#display-options)
- [Chart Types](#chart-types)
- [Chart Configuration](#chart-configuration)
- [Drill Operations](#drill-operations)

## Overview

The Pivot Chart visualizes aggregated pivot data in graphical format. It integrates seamlessly with the Pivot Table component, supporting 21+ chart types and interactive features. Module: `PivotChart`

**⚠️ Security Note**: Pivot charts display data from your data source. Ensure you follow secure data binding practices from [Data Binding](data-binding.md#security-best-practices) when using remote or external data sources.

**Requirements:**
- Inject `PivotChart` module
- Enable from dataSourceSettings or displayOption
- Works with all data sources

## Display Options

### Display Mode Configuration
Property: [`displayOption`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/displayOptionModel)

**Valid displayOption.view values:** `'Chart'` or `'Both'`

To show **Table-only** (Grid mode - default), omit `displayOption` entirely and don't inject `PivotChart` module.

#### Table Only (Default)
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings">
    <!-- No displayOption, no chartSettings -->
  </ejs-pivotview>
</template>

<script setup>
// PivotChart module NOT injected
// This shows table/grid only (default behavior)
</script>
```

#### Chart Only
```vue
<script setup>
const displayOption = {
  view: 'Chart'  // Show only chart, no table
};

const chartSettings = {
  chartSeries: { type: 'Column' }
};
</script>
```

#### Both (Table + Chart)
```vue
<script setup>
const displayOption = {
  view: 'Both',       // Show both table and chart
  primary: 'Table'    // Table appears first (or 'Chart' for chart-first)
};

const chartSettings = {
  chartSeries: { type: 'Column' }
};
</script>
```

### Chart-Only Setup
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :displayOption="displayOption"
    :chartSettings="chartSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, PivotChart } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const height = 400;

// Display only chart
const displayOption = {
  view: 'Chart'
};

// Configure chart appearance
const chartSettings = {
  chartSeries: { type: 'Column' }
};

provide('pivotview', [PivotChart]);
</script>
```

### Both Table and Chart
```vue
<script setup>
const displayOption = {
  view: 'Both',
  primary: 'Table'  // Table above, Chart below (or use 'Chart' for chart-first)
};

// Or show chart first
// primary: 'Chart'
</script>
```

## Chart Types

### Available Chart Types (21+)

| Type | Use Case | Example |
|------|----------|---------|
| Line | Trends over time | Sales trend 2015-2023 |
| Column | Category comparison | Sales by region |
| Area | Cumulative trends | Revenue growth |
| Bar | Horizontal comparison | Product ranking |
| StepArea | Step-wise trends | Inventory levels |
| StackingLine | Multiple series trends | Sales & profit trends |
| StackingColumn | Stacked categories | Revenue by channel |
| StackingArea | Stacked areas | Market segments |
| StackingBar | Horizontal stacked | Department budgets |
| StepLine | Step-line trends | Price changes |
| Pareto | Pareto analysis | 80/20 analysis |
| Bubble | 3D relationship | Risk/return analysis |
| Scatter | Data distribution | Correlation analysis |
| Spline | Smooth curves | Sales projections |
| SplineArea | Smooth area | Volume trends |
| StackingLine100 | 100% stacked lines | Market share |
| StackingColumn100 | 100% stacked columns | Sales mix |
| StackingArea100 | 100% stacked areas | Composition |
| StackingBar100 | 100% stacked bars | Structure |
| Polar | Polar coordinates | Performance metrics |
| Radar | Radar format | Skill assessment |

### Setting Chart Type
```vue
<script setup>
const chartSettings = {
  chartSeries: {
    type: 'Column'  // Default
  }
};

// Change chart type
const barChartSettings = {
  chartSeries: { type: 'Bar' }
};

const pieChartSettings = {
  chartSeries: { type: 'Pie' }
};
</script>
```

## Chart Configuration

### Complete Chart Configuration
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :displayOption="displayOption"
    :chartSettings="chartSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, PivotChart } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const height = 400;

const displayOption = {
  view: 'Both',      // Show both table and chart
  primary: 'Table'   // Table first, then chart
};

const chartSettings = {
  // Chart series configuration
  chartSeries: {
    type: 'Column',        // Column chart
    cornerRadius: 5        // Rounded corners
  },
  
  // Tooltip settings
  tooltip: {
    enable: true,
    format: '<b>${point.x}</b><br/>Value: ${point.y}'
  },
  
  // Legend settings
  legendSettings: {
    visible: true,
    position: 'Right'      // Top, Bottom, Right, Left
  },
  
  // Title settings
  title: 'Sales Analysis by Country and Product',
  
  // Axis labels
  primaryXAxis: {
    labelFormat: '{value}',
    title: 'Products'
  },
  
  primaryYAxis: {
    labelFormat: '{value}',
    title: 'Sales Amount'
  }
};

provide('pivotview', [PivotChart]);
</script>

<style>
@import "@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Configuration Options
```vue
<script setup>
const chartSettings = {
  // Chart type
  chartSeries: {
    type: 'Column',           // Bar, Line, Area, etc.
    width: '100%',           // Width relative
    dashArray: 0             // Line dash pattern
  },
  
  // Series colors
  palettes: ['#007bff', '#28a745', '#dc3545'],
  
  // Annotations
  annotations: [],
  
  // Export settings
  export: ['PDF', 'PNG', 'SVG'],
  
  // Print options
  enablePrint: true
};
</script>
```

## Drill Operations

### Drill Down in Chart
Users can drill down in charts by clicking on data points  (if drill-down members are set):

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  drilledMembers: [
    { name: 'Country', items: ['USA'] }
  ]
  // ... other settings
};

// Chart will show drilled members
// Users can click to drill further
</script>
```

### Toggling Between Table and Chart
Users can switch between table and chart views when `displayOption.view === 'Both'`:

```vue
<script setup>
const displayOption = {
  view: 'Both',      // Enables toggle buttons
  primary: 'Table'   // Initial view
};
</script>
```

### Chart Export
```vue
<script setup>
// Export chart as PDF
const pivotObj = document.getElementById('pivotview').ej2_instances[0];
pivotObj.chartSettings.export = ['PDF'];

// Or in toolbar
const toolbarClick = (args) => {
  if (args.item.id === 'grid_pdfexport') {
    pivotObj.pdfExport();
  }
};
</script>
```

### Example: Multi-Chart View
```vue
<template>
  <div class="container">
    <div class="controls">
      <select v-model="selectedChart" @change="changeChart">
        <option value="Column">Column Chart</option>
        <option value="Bar">Bar Chart</option>
        <option value="Line">Line Chart</option>
        <option value="Area">Area Chart</option>
      </select>
    </div>
    
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings" 
      :displayOption="displayOption"
      :chartSettings="currentChartSettings"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { provide } from 'vue';
import { PivotViewComponent as EjsPivotview, PivotChart } from "@syncfusion/ej2-vue-pivotview";

const selectedChart = ref('Column');

const currentChartSettings = computed(() => ({
  chartSeries: { type: selectedChart.value },
  palettes: ['#007bff', '#28a745', '#dc3545']
}));

provide('pivotview', [PivotChart]);
</script>
```

