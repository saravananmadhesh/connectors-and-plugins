# Classic Layout

## Table of Contents
- [Overview](#overview)
- [Layout Comparison](#layout-comparison)
- [Enabling Classic Layout](#enabling-classic-layout)
- [Configuration](#configuration)
- [Limitations](#limitations)
- [Use Cases](#use-cases)

## Overview

The classic (tabular) layout presents pivot data in a traditional spreadsheet format with row fields side-by-side in separate columns. This contrasts with the default compact (hierarchical) layout. Property: [`gridSettings.layout`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/gridSettings/#layout)

**Requirements:**
- Relational data source only (not OLAP)
- Client-side or server-side engines supported
- All other pivot features work the same

## Layout Comparison

### Compact Layout (Default)
```
              Q1      Q2
USA   2015    1000    1200
2016          1500    1400
France 2015    800     900
2016          1100    1200
```

**Characteristics:**
- Hierarchical rows (nested fields)
- Indentation shows levels
- Drill-down/drill-up capability
- Compact table size

### Tabular Layout (Classic)
```
Country    Year    Q1      Q2
USA        2015    1000    1200
USA        2016    1500    1400
France     2015     800     900
France     2016    1100    1200
```

**Characteristics:**
- Flat structure (all fields as separate columns)
- No indentation/nesting
- All row fields visible
- Larger table size
- Easier Excel export
- Better for traditional reports

## Enabling Classic Layout

### Basic Configuration
```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings" 
      :gridSettings="gridSettings"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  enableSorting: true,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [
    { name: 'Product_Categories', caption: 'Product Categories' },
    { name: 'Products' },
    { name: 'Order_Source', caption: 'Order Source' }
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  drilledMembers: [
    { name: 'Product_Categories', items: ['Accessories', 'Bikes'] },
    { name: 'Products', delimiter: '##', items: ['Accessories##Helmets'] }
  ],
  filterSettings: [
    {
      name: 'Products',
      type: 'Exclude',
      items: ['Cleaners', 'Fenders']
    }
  ],
  expandAll: false,
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  filters: []
};

// Enable tabular/classic layout
const gridSettings = {
  columnWidth: 120,
  layout: 'Tabular'  // Set to 'Tabular' for classic layout
};

const height = '450px';
</script>

<style>
@import "@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

## Configuration

### Compact Layout (Default)
```vue
<script setup>
const gridSettings = {
  layout: 'Compact'  // or omit this property (default)
};
</script>
```

### Tabular Layout
```vue
<script setup>
const gridSettings = {
  layout: 'Tabular'  // Classic/flat layout
};
</script>
```

### With Field List
```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    { name: 'Product_Categories' },
    { name: 'Products' }
  ],
  columns: [
    { name: 'Year' },
    { name: 'Quarter' }
  ],
  values: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const gridSettings = {
  columnWidth: 120,
  layout: 'Tabular'  // Classic layout
};

const showFieldList = true;

provide('pivotview', [FieldList]);
</script>

<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :gridSettings="gridSettings"
    :showFieldList="showFieldList">
  </ejs-pivotview>
</template>
```

### With Grouping Bar
```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar } from "@syncfusion/ej2-vue-pivotview";

const gridSettings = {
  columnWidth: 120,
  layout: 'Tabular'
};

const showGroupingBar = true;

provide('pivotview', [GroupingBar]);
</script>

<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :gridSettings="gridSettings"
    :showGroupingBar="showGroupingBar">
  </ejs-pivotview>
</template>
```

## Limitations

### Row Subtotals Position
**❌ NOT SUPPORTED:** Subtotals at the "Top" position for row subtotals

**✅ SUPPORTED:** Subtotals at the "Bottom" position (default)

```vue
<script setup>
// This works in tabular layout:
const dataSourceSettings = {
  showSubTotals: true,  // Shows subtotals at bottom
  // ...
};

// This does NOT work in tabular layout:
// Subtotals at "Top" position not supported
</script>
```

### Other Limitations
- Subtotals only appear at bottom (not configurable to top)
- Grand totals positioning follows standard behavior
- Otherwise, all pivot features work normally

## Use Cases

### Use Classic Layout When:
1. **Traditional Reports**: Legacy report format expected
2. **Excel Export**: Easier mapping to spreadsheet format
3. **Print Documents**: Better print layout
4. **Data Analysis**: Flat structure for analysis
5. **Multiple Row Fields**: Many hierarchical levels (many columns)

### Use Compact Layout When:
1. **Space Efficiency**: Better for large hierarchies
2. **Drill-Down Analysis**: Exploration focus
3. **User Interface**: Modern, nested representation
4. **Interactive Reports**: Emphasis on drill operations

### Side-by-Side Comparison

**Compact Layout:**
- ✓ Compact representation
- ✓ Hierarchical drilling
- ✓ Indentation clarity
- ✗ Many columns for multiple row fields

**Tabular Layout:**
- ✓ Flat spreadsheet-like format
- ✓ Traditional report appearance
- ✓ Easy Excel export
- ✗ Larger table for deep hierarchies

### Example Scenario: Sales Report
```
Compact: Region > Country > City → 3 nested columns
Tabular: Region, Country, City → 3 separate flat columns

Compact is compact, Tabular is explicit.
```

