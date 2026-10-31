# Drill-Down and Drill-Up

## Table of Contents
- [Overview](#overview)
- [Drill-Down Concepts](#drill-down-concepts)
- [Expand All](#expand-all)
- [Expand Specific Fields](#expand-specific-fields)
- [Drilled Members](#drilled-members)
- [Drill Position](#drill-position)
- [Drill-Through](#drill-through)
- [Events & Customization](#events--customization)

## Overview

Drill-down and drill-up features allow users to explore hierarchical data by expanding or collapsing field members. When a field contains child items, expand/collapse icons appear in headers. Property: [`drilledMembers`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iDataOptions#drilledmembers), [`expandAll`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iDataOptions#expandall)

## Drill-Down Concepts

### Hierarchical Data Structure
```
Year
├── 2015
│   ├── Q1
│   ├── Q2
│   ├── Q3
│   └── Q4
└── 2016
    ├── Q1
    ├── Q2
    ├── Q3
    └── Q4
```

### Built-in Icons
- **Expand Icon** (+): Click to show child items
- **Collapse Icon** (-): Click to hide child items
- **No Icon**: Member has no children

### Drill Mechanics
```
Initial: Year (collapsed)
  ↓ (user clicks expand)
Year expanded → Quarters visible
  ↓ (user clicks quarter)
Drill into Q1 → Details visible
```

## Expand All

Toggle expand/collapsed state for all members globally.

### Expand All Members (expandAll: true)
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: true,  // All members start expanded
  
  rows: [
    { name: 'Country' },      // Expanded by default
    { name: 'Products' }      // All expanded
  ],
  columns: [
    { name: 'Year' },         // Expanded
    { name: 'Quarter' }       // All expanded
  ],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
</script>
```

### Collapse All Members (expandAll: false)
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,  // All members start collapsed (DEFAULT)
  
  rows: [{ name: 'Country' }, { name: 'Products' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
};
</script>
```

## Expand Specific Fields

Control expand state per field using field-level `expandAll` property.

### Expand Some Fields, Collapse Others
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,  // Global default: collapsed
  
  rows: [
    { 
      name: 'Country',
      expandAll: true      // Override: expand this field
    },
    {
      name: 'Products',
      expandAll: false     // Use global default: collapsed
    }
  ],
  columns: [
    {
      name: 'Year',
      caption: 'Production Year',
      expandAll: true      // Expand Year field
    },
    {
      name: 'Quarter',
      expandAll: false     // Collapse Quarter field
    }
  ],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
</script>
```

### Result
```
✓ Country field: Expanded (showing USA, France, UK, etc.)
  ✓ Year field: Expanded (showing 2015, 2016, etc.)
  ✗ Quarter field: Collapsed (showing +Q1, +Q2, etc.)
  ✗ Products field: Collapsed (showing Accessories, Bikes, etc.)
```

## Drilled Members

Control which specific members are expanded or collapsed using `drilledMembers`.

### Expand All Except Specific Members
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: true,  // Start with all expanded
  
  // But collapse these specific members
  drilledMembers: [
    {
      name: 'Country',
      items: ['France']  // France stays collapsed
    },
    {
      name: 'Products',
      items: ['Bikes', 'Helmets']  // These stay collapsed
    }
  ],
  
  rows: [
    { name: 'Country' },
    { name: 'Products' }
  ],
  columns: [
    { name: 'Year' },
    { name: 'Quarter' }
  ],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  filters: []
};
</script>
```

### Collapse All Except Specific Members
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,  // Start with all collapsed
  
  // But expand only these specific members
  drilledMembers: [
    {
      name: 'Country',
      items: ['USA', 'France']  // Only these expand
    },
    {
      name: 'Year',
      items: ['2015']  // Only 2015 expands
    }
  ],
  
  rows: [{ name: 'Country' }, { name: 'Products' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
};
</script>
```

### Multi-Level Drilled Members
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  
  drilledMembers: [
    {
      name: 'Country',
      // Delimiter: shows hierarchical path
      delimiter: '##',
      items: [
        'USA##California',
        'USA##New York',
        'France##Paris'
      ]
    }
  ],
  
  rows: [
    { name: 'Country' },
    { name: 'City' },
    { name: 'Store' }
  ],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

## Drill Position

Position-aware drilling ensures drilling affects only specific member instances, not all occurrences.

### Example Scenario
```
Year 2015: Q1, Q2, Q3, Q4
Year 2016: Q1, Q2, Q3, Q4

If you drill Q1 in 2015, only 2015's Q1 expands
2016's Q1 remains in original state
```

### Implementation
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
  expandAll: false,
  
  // Drill position: specific instance drilling
  drilledMembers: [
    {
      name: 'Country',
      items: ['France']
    },
    {
      name: 'Products',
      items: ['Accessories##Helmets']
    }
  ],
  
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  rows: [
    { name: 'Country' },
    { name: 'Products' }
  ],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
</script>

<style>
@import "@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Drill Position Characteristics
- **Position-Specific**: Drilling affects exact member location
- **Efficient**: Compares data position, not just names
- **Multi-Year Scenarios**: Handles same field in different contexts
- **Hierarchical Drilling**: Works across levels

### Default Behavior
- Expand/collapse icons appear automatically on hierarchical fields
- Users can drill-down/drill-up manually
- Drill states persist if state persistence is enabled
- Program can set initial drill state via `drilledMembers`

## Drill-Through

### Overview

The drill-through feature allows users to view the raw, unaggregated data behind any aggregated cell in the Pivot Table. By double-clicking an aggregated cell, users can view its detailed raw data in a data grid displayed in a new window.

**Key Features:**
- View raw, underlying data for aggregated cells
- Display shows row header, column header, and measure name
- Column chooser allows including/excluding fields
- Works with Pivot Table cells and Pivot Chart data points
- Supports maximum row limit configuration

### Enabling Drill-Through

Enable drill-through by setting the `allowDrillThrough` property to **true** and injecting the `DrillThrough` module:

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings"
      :allowDrillThrough="true"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, DrillThrough } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: [],
  drilledMembers: [{ name: 'Country', items: ['France'] }]
};

const height = 350;

provide('pivotview', [DrillThrough]);
</script>
```

### Drill-Through Data Display

When drill-through is enabled, double-clicking any cell shows:
- **Row Headers**: Values from row axis
- **Column Headers**: Values from column axis
- **Measure Name**: Name of the value field
- **Raw Data Grid**: Complete underlying records

### Maximum Rows in Drill-Through

Control the maximum number of rows returned during drill-through using the `maxRowsInDrillThrough` property (default: 10,000):

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings"
    :allowDrillThrough="true"
    :maxRowsInDrillThrough="10"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview, DrillThrough } from "@syncfusion/ej2-vue-pivotview";
import { provide } from 'vue';

// Limit drill-through to 10 rows per request
const dataSourceSettings = { /* ... */ };
const height = 350;

provide('pivotview', [DrillThrough]);
</script>
```

> **Note:** The `maxRowsInDrillThrough` property is applicable primarily for OLAP data sources.

### Drill-Through with Pivot Chart

Access drill-through data through pivot chart by clicking on any data point:

```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, DrillThrough, PivotChart } from "@syncfusion/ej2-vue-pivotview";
</script>
```

## Events

### Drill

The `drill` event triggers when a user expands or collapses a field member in the pivot table. Use it to track drilling actions or modify drill behavior.

**When to use:**
- Track user drill interactions
- Prevent specific drill operations
- Log drill history

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings"
      :drill="drillHandler"
      :height="height">
    </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;

const drillHandler = (args) => {
  // args.drillInfo - contains which member was drilled
  // args.pivotview - reference to pivot component
  // args.cancel - set to true to prevent drilling
  
  console.log('Drill action:', args.drillInfo);
  
  // Example: Prevent drilling for specific field
  if (args.drillInfo.fieldName === 'Products') {
    // args.cancel = true;  // Uncomment to prevent
  }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### DrillThrough

The `drillThrough` event triggers when a user double-clicks a value cell to view underlying raw data. Use it to customize the drill-through data grid.

**When to use:**
- Filter drill-through columns
- Customize grid display
- Perform custom analysis on raw data

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings"
      :allowDrillThrough="true"
      :drillThrough="drillThroughHandler"
      :height="height">
    </ejs-pivotview>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, DrillThrough } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;

const drillThroughHandler = (args) => {
  // args.columnHeaders - column info of clicked cell
  // args.rowHeaders - row info of clicked cell
  // args.gridColumns - customize grid columns
  // args.rawData - raw data behind cell
  // args.cancel - set to true to prevent drill-through dialog
  
  console.log('Drill-through triggered for:', args.rowHeaders, args.columnHeaders);
  
  // Example: Filter grid columns (hide sensitive data)
  args.gridColumns = args.gridColumns.filter(c => {
    return c !== 'InternalID' && c !== 'SensitiveData';
  });
};

provide('pivotview', [DrillThrough]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### BeginDrillThrough

The `beginDrillThrough` event triggers immediately after the drill-through dialog opens and the grid initialization completes. Use it to customize the data grid after it's rendered.

**When to use:**
- Apply custom formatting to drill-through data
- Add dynamic calculations
- Configure grid features (sorting, selection)

```vue
<script setup>
const beginDrillThroughHandler = (args) => {
  // args.gridInstance - access to the Grid component in drill-through
  
  // Example: Enable grid features
  args.gridInstance.allowSorting = true;
  args.gridInstance.allowFiltering = true;
  
  // Example: Customize grid styling
  const gridElement = args.gridInstance.element;
  gridElement.style.backgroundColor = '#f5f5f5';
};
</script>
```

const displayOption = {
  view: 'Chart'  // Switch to chart view
};

const chartSettings = {
  chartSeries: { type: 'Column' }
};

const dataSourceSettings = {
  // ... configuration
};

provide('pivotview', [PivotChart, DrillThrough]);
</script>
```

## Events & Customization

### Drill Event

The `drill` event is triggered each time a field member is expanded or collapsed:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { ref } from 'vue';

const handleDrill = (args) => {
  // args contains drill information
  // Customize behavior based on drill
  console.log('Drill event triggered:', args);
};

const dataSourceSettings = ref({
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
});

const height = 350;
</script>

<template>
  <ejs-pivotview 
    :drill="handleDrill"
    :dataSourceSettings="dataSourceSettings"
    :height="height">
  </ejs-pivotview>
</template>
```

### Drill-Through Event

Triggered when drill-through data is requested:

```vue
<script setup>
const handleDrillThrough = (args) => {
  // args.value - cell value
  // args.rowHeaders - row context
  // args.columnHeaders - column context
  console.log('Drill-through requested:', args);
};
</script>
```

