# Show/Hide Totals

## Table of Contents
- [Overview](#overview)
- [Grand Total Configuration](#grand-total-configuration)
- [Subtotal Configuration](#subtotal-configuration)
- [Summary Row Settings](#summary-row-settings)
- [Multiple Value Fields](#multiple-value-fields-with-totals)
- [Dynamic Control with Toolbar](#dynamic-control-with-toolbar)
- [Total Display Patterns](#total-display-patterns)

## Overview

Control visibility and positioning of grand totals and subtotals in the pivot table. These settings enhance data analysis by showing or hiding summary rows/columns. Properties: [`showGrandTotals`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iDataOptions#showgrandtotals), [`showSubTotals`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iDataOptions#showsubtotals)

## Grand Total Configuration

### Show Grand Totals (Default)
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  showGrandTotals: true,  // Show grand total row and column (DEFAULT)
  
  rows: [{ name: 'Country' }, { name: 'Product' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }, { name: 'Profit' }],
  filters: []
};
</script>
```

### Result with Grand Totals
```
           Q1      Q2      Q3      Q4   Grand Total
USA      1000    1200    1100    1300      5000
France    800     900    950     1050      3700
Grand Total 1800  2100   2050    2350      8700
                                       ^Grand Total Row
```

### Hide Grand Totals
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  showGrandTotals: false,  // Hide grand total row and column
  
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Result without Grand Totals
```
       2015    2016   (No Grand Total Column)
USA    5000    5500
France 3700    4200
(No Grand Total Row)
```

## Subtotal Configuration

### Show Subtotals (Default)
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  showSubTotals: true,  // Show subtotal rows/columns for each group (DEFAULT)
  
  rows: [
    { name: 'Country' },
    { name: 'Region' },
    { name: 'City' }
  ],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Result with Subtotals
```
Country    Region      City       Q1      Q2    Subtotal
USA        New York    NYC        1000    1200   2200
           Los Angeles LA         800     900    1700
           Subtotal               1800    2100   3900
           (Region subtotal)
           (Country subtotal follows)
```

### Hide Subtotals
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  showSubTotals: false,  // Hide subtotal rows/columns
  
  rows: [
    { name: 'Country' },
    { name: 'City' }
  ],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Result without Subtotals
```
Country    City       2015    2016   Grand Total
USA        NYC        5000    5500   10500
           LA         3700    4200   7900
France     Paris      2100    2500   4600
           Lyon       1800    2100   3900
Total                12600   14300   26900
```

### Hide Subtotals for Specific Axis Only

Use `showRowSubTotals` and `showColumnSubTotals` to control subtotals separately:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  showRowSubTotals: false,     // Hide row subtotals only
  showColumnSubTotals: true,   // Show column subtotals
  
  rows: [{ name: 'Country' }, { name: 'City' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

Or control per-field:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  
  rows: [
    { name: 'Country', showSubTotals: false },  // No subtotal for Country
    { name: 'City', showSubTotals: true }       // Show subtotal for City
  ],
  columns: [
    { name: 'Year', showSubTotals: true },      // Show subtotal for Year
    { name: 'Quarter' }
  ],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

## Summary Row Settings

### Subtotal Position - Default Behavior (Auto)

By default, `subTotalsPosition` is set to **Auto**, which applies position intelligently:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }, { name: 'Region' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }],
  // subTotalsPosition defaults to 'Auto'
  // Result: Row subtotals at TOP, Column subtotals at BOTTOM
};
</script>
```

**Result with Auto Position:**
```
      Q1       Q2    Subtotal    Q3       Q4    Subtotal
USA   1000    1200    2200       1100    1300    2400
      Subtotal: 4400 (Row subtotal at top of USA group)

France 800     900    1700       950    1050    2000
       Subtotal: 3700 (Row subtotal at top of France group)
```

### Subtotal Position - Top

Set `subTotalsPosition` to **Top** to show all subtotals at the top of each group:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }, { name: 'Region' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }],
  showSubTotals: true,
  subTotalsPosition: 'Top'  // All subtotals appear at top
};
</script>
```

**Result with Top Position:**
```
Subtotal: USA              2200     2200
  Q1                1000    1200
  Q2                1100    1300

Subtotal: France           1700     2000
  Q1                 800     900
  Q2                 950    1050
```

### Subtotal Position - Bottom

Set `subTotalsPosition` to **Bottom** to show all subtotals at the bottom of each group:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }, { name: 'Region' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }],
  showSubTotals: true,
  subTotalsPosition: 'Bottom'  // All subtotals appear at bottom
};
</script>
```

**Result with Bottom Position:**
```
USA
  Q1                1000    1200
  Q2                1100    1300
  Subtotal: USA    2200     2200

France
  Q1                 800     900
  Q2                 950    1050
  Subtotal: France 1700     2000
```

### Multiple Value Fields with Totals
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  showGrandTotals: true,
  showSubTotals: true,
  
  rows: [{ name: 'Country' }, { name: 'Product' }],
  columns: [{ name: 'Year' }],
  
  values: [
    { name: 'Sales', caption: 'Total Sales' },
    { name: 'Profit', caption: 'Profit' },
    { name: 'Units', caption: 'Units Sold' }
  ],
  
  formatSettings: [
    { name: 'Sales', format: 'C0' },
    { name: 'Profit', format: 'C0' },
    { name: 'Units', format: 'N0' }
  ]
};
</script>
```

Result:
```
Country   Product      Sales   Profit   Units
USA       Bikes        50000   12500    250
          Accessories  20000    5000    100
          Subtotal     70000   17500    350
France    Bikes        40000   10000    200
          Accessories  15000    3750     75
          Subtotal     55000   13750    275
Grand Total           125000   31250    625
```

## Dynamic Control with Toolbar

Enable users to toggle grand totals, subtotals, and their positions dynamically using the built-in toolbar buttons. This provides an interactive interface without requiring code changes.

### Basic Toolbar Configuration

```vue
<template>
  <div id="app">
    <ejs-pivotview
      :dataSourceSettings="dataSourceSettings"
      :toolbar="toolbar"
      :showToolbar="showToolbar"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview, Toolbar } from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }, { name: 'Product' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }, { name: 'Profit' }],
  filters: []
};

const showToolbar = true;
const toolbar = ['GrandTotal', 'SubTotal'];
const height = 350;

provide('pivotview', [Toolbar]);
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

**Result:** Toolbar shows two buttons:
- **GrandTotal button**: Toggle grand totals visibility on/off
- **SubTotal button**: Toggle subtotals visibility on/off
- **Dropdown menus**: Click button to show position options (Top/Bottom/Auto)

### Toolbar with Grand Totals Position Control

```vue
<script setup>
const toolbar = [
  'GrandTotal',  // Toggle grand totals + position dropdown
  'SubTotal'     // Toggle subtotals + position dropdown
];

// Users can click:
// 1. "GrandTotal" button to toggle visibility
// 2. Dropdown arrow to select position: Top, Bottom, Auto
</script>
```

**Toolbar Options Displayed to Users:**
```
┌─────────────────────────────────────┐
│ GrandTotal ▼  │  SubTotal ▼       │
├─────────────────────────────────────┤
│ ✓ Show Grand Totals                 │
│   Grand Totals Position:            │
│     • Top                           │
│     • Bottom                        │
│     • Auto                          │
├─────────────────────────────────────┤
│ ✓ Show Sub Totals                   │
│   Subtotals Position:               │
│     • Top                           │
│     • Bottom                        │
│     • Auto                          │
└─────────────────────────────────────┘
```

### Complete Example with Toolbar

```vue
<template>
  <div id="app">
    <div class="info-panel">
      <h3>Total Configuration Toolbar</h3>
      <p>Use the toolbar buttons to dynamically control totals visibility and positioning</p>
    </div>
    
    <ejs-pivotview
      :dataSourceSettings="dataSourceSettings"
      :toolbar="toolbar"
      :gridSettings="gridSettings"
      :showToolbar="showToolbar"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview, Toolbar } from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  rows: [
    { name: 'Country', caption: 'Country' },
    { name: 'Product', caption: 'Product' }
  ],
  columns: [
    { name: 'Year', caption: 'Year' },
    { name: 'Quarter', caption: 'Quarter' }
  ],
  values: [
    { name: 'Sold', caption: 'Units Sold', type: 'Sum' },
    { name: 'Amount', caption: 'Sales Amount', type: 'Sum' }
  ],
  formatSettings: [
    { name: 'Amount', format: 'C0' }
  ],
  filters: []
};

const showToolbar = true;
const toolbar = [
  'GrandTotal',
  'SubTotal'
];
const gridSettings = { columnWidth: 140 };
const height = 450;

provide('pivotview', [Toolbar]);
</script>

<style scoped>
.info-panel {
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #0078d4;
  border-radius: 4px;
}

.info-panel h3 {
  margin: 0 0 8px 0;
  color: #0078d4;
  font-weight: 600;
}

.info-panel p {
  margin: 0;
  color: #555;
  font-size: 14px;
}
</style>
```

### User Benefits

**What Users Can Do:**
1. Click "GrandTotal" button to toggle grand totals on/off
2. Click dropdown arrow to select grand totals position (Top/Bottom/Auto)
3. Click "SubTotal" button to toggle subtotals on/off
4. Click dropdown arrow to select subtotals position (Top/Bottom/Auto)
5. Changes apply immediately without page refresh

### When to Use Toolbar Control

**Use Toolbar Configuration When:**
- End-users need to explore data with different total views
- Real-time adjustments are needed during analysis
- Different user roles want different total configurations
- Mobile/responsive pivot table where space is limited
- Training scenarios where interaction is educational

**Alternative: Programmatic Control**
For fixed configurations, use data properties directly instead of toolbar:
```vue
const dataSourceSettings = {
  showGrandTotals: false,
  showSubTotals: true,
  subTotalsPosition: 'Top'
};
```

## Total Display Patterns

### Pattern 1: Minimal (No Totals)
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
  showGrandTotals: false,
  showSubTotals: false,
  // Only detail data visible, smallest table size
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Pattern 2: Totals Only (No Details)
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
  // Show only aggregated summary
  showGrandTotals: true,
  showSubTotals: false,
  // Only totals and grand total visible
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Pattern 3: Hierarchical Totals (Default)
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
  showGrandTotals: true,
  showSubTotals: true,
  // All levels of summaries visible
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Pattern 4: Row Totals Only
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
  showGrandTotals: true,
  showSubTotals: true,
  // Grand totals show, subtotals show at each level
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Use Cases

**When to Show All Totals:**
- Executive reports needing all summary levels
- Detailed analysis requiring drill-down
- Multi-level hierarchies requiring navigation

**When to Hide Subtotals:**
- Simple reports with few groups
- Focus on grand totals only
- Mobile/compact displays

**When to Hide All Totals:**
- Raw detail analysis
- Specific member comparison
- Minimalist dashboards

