# Tooltip Configuration

## Table of Contents
- [Overview](#overview)
- [Basic Tooltip Setup](#basic-tooltip-setup)
- [Disabling Tooltips](#disabling-tooltips)
- [Tooltip Templates](#tooltip-templates)
- [Tooltip Customization Methods](#tooltip-customization-methods)
- [Accessibility Considerations](#accessibility-considerations)
- [Performance with Tooltips](#performance-with-tooltips)
- [Summary](#summary)

## Overview

Tooltips provide hover information for cells in the PivotView, enhancing user experience by showing additional context without cluttering the display. Tooltips are **enabled by default** and can be controlled via the `showTooltip` property. You can customize tooltip content using the `tooltipTemplate` property with HTML and dynamic placeholders.

## Basic Tooltip Setup

### Default Tooltip Behavior
Tooltips appear by default when hovering over cells. No additional configuration needed.

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :height="height">
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
const height = 350;
</script>
```

### Tooltip Display
```
┌─────────────────┐
│  Hover over cell│
│─────────────────│
│ Country: USA    │
│ Year: 2015      │
│ Sales: $50,000  │
└─────────────────┘
```

### Where Tooltips Appear
- **Over cells**: Shows cell information
- **Over headers**: Shows field names
- **On small tables**: Tooltips adjust position to fit in viewport

### Tooltip Display Behavior
PivotView tooltips are automatically styled and managed by the grid component. The tooltip appearance follows the grid's theme. Instead of customizing tooltip styles, ensure your field configuration is clear:

```vue
<script setup>
const dataSourceSettings = {
  rows: [
    { name: 'Country', caption: 'Country Name' }  // Better captions = clearer tooltips
  ],
  columns: [
    { name: 'Year', caption: 'Fiscal Year' }
  ],
  values: [
    { name: 'Sales', caption: 'Total Sales Amount' }
  ]
};
</script>
```

When users hover over cells, tooltips will display the captions with values and applied formatting.

## User Interactions

Users can:
- Hover over any cell to see tooltip
- Stay hovering to keep tooltip visible
- Move away to hide tooltip
- Tooltips never interfere with data editing

### Mobile Considerations

On touch devices:
- Tooltips may not show on hover
- Consider informative field names and captions for clarity
- Alternative: Use formatting to make data self-explanatory

## Disabling Tooltips

Set the `showTooltip` property to `false` to disable tooltips:

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showTooltip="false"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
const showTooltip = false;  // Disables tooltips
</script>
```

## Tooltip Templates

Customize tooltip content using the `tooltipTemplate` property with HTML and dynamic placeholders:

### Available Placeholders

Within your tooltip template string, use these placeholders to display dynamic values:
- `${rowHeaders}` – Row headers for the selected cell
- `${columnHeaders}` – Column headers for the selected cell
- `${rowFields}` – Row field names
- `${columnFields}` – Column field names
- `${valueField}` – Value field name
- `${aggregateType}` – Aggregate type (Sum, Avg, Count, etc.)
- `${value}` – The formatted value

### Basic Template Example

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :tooltipTemplate="tooltipTemplate"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }, { name: 'Products' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Revenue' }
  ],
  filters: []
};

// Simple custom tooltip
const tooltipTemplate = `<div class="pivot-tooltip"><span class="header">${columnHeaders}:</span><span class="value">${value}</span></div>`;

const height = 350;
</script>

<style scoped>
.pivot-tooltip {
  display: flex;
  gap: 10px;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.pivot-tooltip .header {
  font-weight: bold;
  color: #000;
}

.pivot-tooltip .value {
  color: #0066cc;
}
</style>
```

### Advanced Template Example

Combine multiple placeholders for richer tooltip content:

```vue
<script setup>
const tooltipTemplate = `<div class="tooltip-container">
  <div class="tooltip-row">
    <span class="label">Row:</span>
    <span class="value">${rowHeaders}</span>
  </div>
  <div class="tooltip-row">
    <span class="label">Column:</span>
    <span class="value">${columnHeaders}</span>
  </div>
  <div class="tooltip-row">
    <span class="label">Measurement:</span>
    <span class="value">${valueField}</span>
  </div>
  <div class="tooltip-row">
    <span class="label">Aggregate:</span>
    <span class="value">${aggregateType}</span>
  </div>
  <div class="tooltip-row highlight">
    <span class="label">Value:</span>
    <span class="amount">${value}</span>
  </div>
</div>`;
</script>

<style>
.tooltip-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 220px;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.tooltip-row.highlight {
  background: rgba(255,255,255,0.15);
  padding: 8px;
  margin: 8px -12px -12px -12px;
  border-radius: 0 0 6px 6px;
  border: none;
}

.tooltip-row .label {
  font-weight: bold;
  min-width: 90px;
}

.tooltip-row .amount {
  font-weight: bold;
  font-size: 14px;
  color: #ffff99;
}
</style>
```

## Custom Tooltip for Pivot Chart

If using both Pivot Table and Pivot Chart, you can set a different tooltip for the chart using `chartSettings.tooltip`:

```vue
<script setup>
const chartSettings = {
  value: 'Amount',
  chartSeries: { type: 'Column' },
  tooltip: {
    template: '<span class="chart-tooltip">${aggregateType} of ${valueField}: ${value}</span>'
  }
};
</script>

<style>
.chart-tooltip {
  background-color: #4d4d4d;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  border-left: 3px solid #27b1f0;
}
</style>
```

## Tooltip Customization Methods

### Method 1: Customize with Templates

Use the `tooltipTemplate` property for full HTML control:

```vue
<script setup>
const tooltipTemplate = `<div class="custom-tooltip">
  <strong>${columnHeaders}</strong><br/>
  <span>${aggregateType}: ${value}</span>
</div>`;
</script>
```

### Method 2: Use Captions for Better Default Tooltips

When not using custom templates, improve default tooltips with meaningful captions:

```vue
<script setup>
const dataSourceSettings = {
  rows: [
    { name: 'Country', caption: 'Geographic Region' }
  ],
  columns: [
    { name: 'Year', caption: 'Fiscal Year' }
  ],
  values: [
    { name: 'Amount', caption: 'Total Revenue (USD)', type: 'Sum' }
  ],
  formatSettings: [
    { name: 'Amount', format: 'C2' }
  ]
};
</script>
```

Default tooltips will display:
```
Geographic Region: North America
Fiscal Year: 2024
Total Revenue (USD): $125,450.75
```

### Method 3: Improve Cell Display Clarity

Use clear field names and proper formatting:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    { name: 'Country', caption: 'Customer Country' }
  ],
  columns: [
    { name: 'Year', caption: 'Sales Year' }
  ],
  values: [
    { name: 'Amount', caption: 'Revenue', type: 'Sum' }
  ],
  formatSettings: [
    { name: 'Amount', format: 'C2' }
  ]
};
</script>
```

## Accessibility Considerations

### Default Accessibility Features

The PivotView provides built-in accessibility:

- **Keyboard Navigation:** Users can navigate cells using arrow keys and Tab
- **Screen Reader Compatibility:** Cell content (including tooltips) is announced to screen readers
- **Focus Management:** Appropriate focus states are maintained through mouse hover

### Improving Tooltip Clarity

To ensure tooltips are maximally accessible:

1. **Use Descriptive Captions:** Field captions are included in tooltips
   ```vue
   rows: [{ name: 'Country', caption: 'Customer Country' }]
   ```

2. **Apply Clear Formatting:** Format codes help screen readers understand numeric content
   ```vue
   formatSettings: [
     { name: 'Amount', format: 'C2' }  // Currency format
   ]
   ```

3. **Avoid Abbreviated Field Names:** Use full names instead of "f1", "f2", etc.

### Color Contrast

Syncfusion controls maintain WCAG AA color contrast:
- Text/background ratio: 4.5:1 minimum
- Tooltip styling respects theme settings

## Performance with Tooltips

### Large Dataset Considerations

Tooltips in PivotView are pre-calculated and efficient:

- **Auto-Enabled:** Tooltips display by default with no configuration needed
- **Optimized Rendering:** Only displayed cells compute tooltips
- **Virtual Scrolling Compatible:** Tooltips work seamlessly with:
  ```vue
  <script setup>
  const props = {
    enableVirtualization: true,  // Reduces DOM elements
  };
  
  const dataSourceSettings = {
    // When virtual scrolling is enabled, only visible rows/columns
    // generate tooltips, improving performance
  };
  </script>
  ```

### Best Practices

1. **For Very Large Grids:** Enable virtual scrolling to limit tooltip calculations
2. **For Many Fields:** Use meaningful captions so tooltips are useful without cluttering
3. **Testing Tip:** Use browser dev tools to check tooltip performance in Network > Rendering

## Summary

| Feature | Status | How to Use |
|---------|--------|-----------|
| **Default Tooltips** | Built-in | Enabled by default via `showTooltip: true` |
| **Disable Tooltips** | Configuration | Set `showTooltip: false` |
| **Custom Templates** | Verified | Use `tooltipTemplate` property with placeholders |
| **Template Placeholders** | Verified | `${rowHeaders}`, `${columnHeaders}`, `${value}`, etc. |
| **Field Captions** | Configuration | Set via `caption` property for better defaults |
| **Number Formatting** | Configuration | Set via `formatSettings` |
| **Chart Tooltips** | Verified | Use `chartSettings.tooltip.template` |
| **Virtual Scrolling** | Optional | Improves performance for large data |

### Tooltip Best Practices Checklist

- ✅ Use `showTooltip` property to enable/disable tooltips
- ✅ Define `tooltipTemplate` with meaningful HTML and placeholders
- ✅ Use field **captions** for better default tooltip text
- ✅ Apply **formatSettings** for numeric types (currency, percentage, etc.)
- ✅ Style tooltips with CSS classes for consistent branding
- ✅ Test tooltips on desktop and touch devices
- ✅ Use virtual scrolling for large datasets (improves performance)
- ✅ Verify accessibility standards (content readable by screen readers)
- ✅ Keep template HTML lightweight for performance
- ✅ Document your tooltip structure for other developers

