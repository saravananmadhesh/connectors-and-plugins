# Hyperlink Configuration

## Table of Contents
- [Overview](#overview)
- [Enable Hyperlinks](#enable-hyperlinks)
- [Hyperlink Cells](#hyperlink-cells)
- [Conditional Hyperlinks](#conditional-hyperlinks)
- [Styling](#styling)

## Overview

Hyperlinks make cells clickable, enabling navigation to external resources or triggering custom actions. Property: [`hyperlinkSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/hyperlinkSettingsModel)

**Linked Elements:**
- Row headers
- Column headers
- Value cells
- Summary cells (totals, subtotals)

## Enable Hyperlinks

### Basic Hyperlink Setup
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :hyperlinkSettings="hyperlinkSettings"
    :height="height"
    @hyperlinkCellClick="onHyperlinkClick">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

// Enable hyperlinks globally
const hyperlinkSettings = {
  showHyperlink: true,  // Enable hyperlinks
  showRowHeaderHyperlink: true,      // Row header hyperlinks
  showColumnHeaderHyperlink: true,   // Column header hyperlinks
  showValueCellHyperlink: true,      // Value cell hyperlinks
  showSummaryCellHyperlink: true     // Summary cell hyperlinks (totals/subtotals)
};

const height = 350;

const onHyperlinkClick = (args) => {
  console.log('Hyperlink clicked:', args);
};
</script>
```

## Hyperlink Cells

### When Hyperlinks Activate

| Setting | Applies To |
|---------|-----------|
| `showRowHeaderHyperlink` | Row dimension headers (e.g., "USA", "France") |
| `showColumnHeaderHyperlink` | Column dimension headers (e.g., "2020", "2021") |
| `showValueCellHyperlink` | Data values cells (amounts, quantities) |
| `showSummaryCellHyperlink` | Total and subtotal cells |

### Selective Hyperlinks
```vue
<script setup>
const hyperlinkSettings = {
  showHyperlink: true,           // Master switch
  showRowHeaderHyperlink: true,   // ✓ Enable row headers only
  showColumnHeaderHyperlink: false,  // ✗ Disable column headers
  showValueCellHyperlink: false,     // ✗ Disable values
  showSummaryCellHyperlink: true     // ✓ Enable totals
};
</script>
```

### Hyperlink Click Handler
```vue
<script setup>
const onHyperlinkClick = (args) => {
  console.log('Cell clicked:', {
    cellType: args.cellType,        // 'header', 'value', 'summary'
    rowHeaders: args.rowHeaders,    // Row field values
    columnHeaders: args.columnHeaders,  // Column field values
    value: args.value,              // Cell value
    rowIndex: args.rowIndex,
    colIndex: args.colIndex
  });
  
  // Extract information for navigation or action
  const country = args.rowHeaders[0];  // First row value
  const year = args.columnHeaders[0];  // First column value
  
  if (args.cellType === 'value') {
    // Navigate to detailed report
    window.location.href = `/report?country=${country}&year=${year}`;
  }
};
</script>
```

## Conditional Hyperlinks

### Hyperlinks Based on Values
```vue
<template>
  <ejs-pivotview 
    ref="pivot"
    :dataSourceSettings="dataSourceSettings" 
    :hyperlinkSettings="hyperlinkSettings"
    @hyperlinkCellClick="onHyperlinkClick">
  </ejs-pivotview>
</template>

<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const pivot = ref(null);

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }, { name: 'Profit' }],
  filters: []
};

const hyperlinkSettings = {
  showHyperlink: true,
  showValueCellHyperlink: true,
  // Only specific cells will be clickable
};

// Handle click and check value
const onHyperlinkClick = (args) => {
  const cellValue = args.value;
  
  // Conditionally enable/disable based on value
  if (cellValue > 10000) {
    // High-value cells: navigate to detailed analysis
    console.log('High-value transaction:', cellValue);
    navigate(`/analysis/${args.rowHeaders[0]}`);
  } else if (cellValue < 1000) {
    // Low-value cells: show warning
    console.log('Low-value transaction:', cellValue);
  }
};

const navigate = (url) => {
  window.location.href = url;
};
</script>
```

### Hyperlinks on Headers Only
```vue
<script setup>
const hyperlinkSettings = {
  showHyperlink: true,
  showRowHeaderHyperlink: true,       // ✓ Click countries
  showColumnHeaderHyperlink: true,    // ✓ Click years
  showValueCellHyperlink: false,      // ✗ Values not clickable
  showSummaryCellHyperlink: false     // ✗ Totals not clickable
};

// Handler filters by cell type
const onHyperlinkClick = (args) => {
  if (args.cellType === 'header') {
    const fieldValue = args.rowHeaders?.[0] || args.columnHeaders?.[0];
    console.log('Field clicked:', fieldValue);
    navigateToDimension(fieldValue);
  }
};
</script>
```

## Styling

### Hyperlink Styling
```css
/* Style hyperlinked cells */
.e-pivotview .e-hyperlink {
  color: #007bff;              /* Blue color */
  text-decoration: underline;  /* Underline */
  cursor: pointer;             /* Pointer cursor */
}

.e-pivotview .e-hyperlink:hover {
  color: #0056b3;              /* Darker blue on hover */
}

.e-pivotview .e-hyperlink:visited {
  color: #663399;              /* Purple for visited */
}
```

### Custom Hyperlink Styling
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :hyperlinkSettings="hyperlinkSettings"
    :cellTemplate="cellTemplate">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

// Custom cell rendering with hyperlink styling
const cellTemplate = (props) => {
  return `<div class="custom-cell">${props.value}</div>`;
};

// Apply custom styles to hyperlinked cells
// Note: Advanced customization may require custom cell templates
</script>

<style>
.custom-cell {
  color: #0066cc;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  padding: 5px;
}

.custom-cell:hover {
  background: #e6f2ff;
  color: #003d99;
}
</style>
```

### Complete Hyperlink Example
```vue
<template>
  <div id="app">
    <h2>Sales Dashboard with Hyperlinks</h2>
    
    <div class="info-box" v-if="lastClicked">
      Last clicked: {{ lastClicked.country }} - {{ lastClicked.year }}
    </div>
    
    <ejs-pivotview 
      ref="pivot"
      :dataSourceSettings="dataSourceSettings" 
      :hyperlinkSettings="hyperlinkSettings"
      :showFieldList="true"
      :height="height"
      @hyperlinkCellClick="onHyperlinkClick">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { provide } from 'vue';
import { pivotData } from './pivotData.js';

const pivot = ref(null);
const lastClicked = ref(null);

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  rows: [{ name: 'Country' }, { name: 'Products' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Amount' }
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const hyperlinkSettings = {
  showHyperlink: true,              // Master enable
  showRowHeaderHyperlink: true,      // Click countries/products
  showColumnHeaderHyperlink: true,   // Click years/quarters
  showValueCellHyperlink: true,      // Click values
  showSummaryCellHyperlink: false    // Don't click totals
};

const height = 400;

const onHyperlinkClick = (args) => {
  const country = args.rowHeaders?.[0];
  const product = args.rowHeaders?.[1];
  const year = args.columnHeaders?.[0];
  const quarter = args.columnHeaders?.[1];
  
  // Store click information
  lastClicked.value = {
    country: country || 'N/A',
    year: year || 'N/A',
    cellType: args.cellType,
    value: args.value
  };
  
  // Handle different cell types
  switch (args.cellType) {
    case 'header':
      console.log(`Navigating to dimension: ${country} / ${year}`);
      break;
    case 'value':
      console.log(`Detailed view: ${country} - ${product} - ${year}${quarter}`);
      // Could open detail view or navigate
      break;
    case 'summary':
      console.log(`Summary total: ${args.value}`);
      break;
  }
};

provide('pivotview', [FieldList]);
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}

.info-box {
  padding: 10px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-bottom: 10px;
  color: #155724;
}

h2 {
  color: #333;
  margin-bottom: 15px;
}
</style>
```

### Best Practices
1. **Clear Visual Indication:** Style hyperlinks distinctly from regular text
2. **Consistent Behavior:** Same type of clicks should do same action
3. **Feedback:** Show what happens on click before clicking
4. **Mobile-Friendly:** Ensure clicks work on touch devices
5. **Error Handling:** Handle broken links gracefully
6. **Security:** Validate URLs before navigation

### Hyperlink Use Cases
- Click country → View regional sales dashboard
- Click year → View yearly trend analysis
- Click value → View transaction detail/drill-down
- Click dimension → Filter relat related data
- Click total → Summarize grouped items

