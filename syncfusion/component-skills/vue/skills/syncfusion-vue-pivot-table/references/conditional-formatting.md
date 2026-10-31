# Conditional Formatting

## Table of Contents
- [Overview](#overview)
- [Enable Conditional Formatting Feature](#enable-conditional-formatting-feature)
- [Define Formatting Rules](#define-formatting-rules)
- [Apply Styles to Cell Values](#apply-styles-to-cell-values)
- [Pre-define Rules in Configuration](#pre-define-rules-in-configuration)
- [Show Formatting Dialog via Toolbar](#show-formatting-dialog-via-toolbar)
- [Dynamic Rule Modification](#dynamic-rule-modification)
- [Formatting Effects on UI](#formatting-effects-on-ui)
- [Events and Customization](#events-and-customization)

## Overview

The conditional formatting feature customizes the appearance of Pivot Table value cells by modifying background color, font color, font family, and font size based on specific conditions. This visualization feature helps highlight important data and makes patterns stand out in the Pivot Table.

**Key Capabilities:**
- Apply rules at design time (code-behind) or runtime (toolbar dialog)
- Customize specific fields or apply globally to all value fields
- Use built-in or custom condition operators
- Modify styles: background color, font color, font family, font size
- Control grand total formatting behavior

**Note:** Must inject the `ConditionalFormatting` module in Pivot Table to use this feature.

---

## Enable Conditional Formatting Feature

To enable conditional formatting, set two properties to `true`:

1. **allowConditionalFormatting** - Enables the feature
2. **showToolbar** - Shows toolbar with formatting button

### Basic Setup

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      id="pivotview" 
      :height="height" 
      :dataSourceSettings="dataSourceSettings"
      :allowConditionalFormatting="allowConditionalFormatting" 
      :toolbar="toolbar" 
      :showToolbar="showToolbar"
    >
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, ConditionalFormatting, Toolbar } from "@syncfusion/ej2-vue-pivotview";
import { Pivot_Data } from './Pivot_Data.js';

const dataSourceSettings = {
  dataSource: Pivot_Data,
  expandAll: false,
  drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
  columns: [{ name: 'Year' }],
  rows: [{ name: 'Country' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }],
};

const allowConditionalFormatting = true;
const height = 350;
const showToolbar = true;
const toolbar = ['ConditionalFormatting'];

provide('pivotview', [ConditionalFormatting, Toolbar]);
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

**Result:** The "Conditional Formatting" button appears in the toolbar, allowing runtime rule creation via dialog.

---

## Define Formatting Rules

Formatting rules consist of three components:

1. **Measure** (value field) - Which field to format
2. **Condition** - Operator for the rule (e.g., GreaterThan, Between)
3. **Style** - Appearance to apply

### Condition Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `Equals` | Exact value match | value1 = 1000 |
| `NotEquals` | Value differs | value1 ≠ 1000 |
| `GreaterThan` | Value above threshold | value1 > 5000 |
| `LessThan` | Value below threshold | value1 < 2000 |
| `GreaterThanOrEqualTo` | Above or equal | value1 ≥ 5000 |
| `LessThanOrEqualTo` | Below or equal | value1 ≤ 2000 |
| `Between` | Range (value1 to value2) | 3000 ≤ value1 ≤ 40000 |
| `NotBetween` | Outside range | value1 < 3000 or value1 > 40000 |

### Creating a Rule with UI Dialog

1. Click "Conditional Formatting" in toolbar
2. Set **Measure** (field to format)
3. Choose **Condition** operator
4. Enter **Value1** (and **Value2** for Between/NotBetween)
5. Click **Format** to open style editor
6. Select colors/fonts and click **OK**
7. Click **OK** to apply

---

## Apply Styles to Cell Values

The `style` configuration defines how matching cells appear. Five styling properties available:

### Style Properties

```javascript
style: {
  backgroundColor: '#80cbc4',    // Cell background color (hex or named)
  color: 'black',                // Font color
  fontFamily: 'Tahoma',          // Font face
  fontSize: '12px'               // Font size (must include unit)
}
```

### Example: Highlight High Sales

```vue
<script setup>
const dataSourceSettings = {
  // ... data config ...
  conditionalFormatSettings: [
    {
      measure: 'Sold',
      value1: 5000,
      conditions: 'GreaterThan',
      style: {
        backgroundColor: '#90EE90',  // Light green
        color: 'darkgreen',
        fontFamily: 'Arial',
        fontSize: '13px'
      }
    }
  ]
};
</script>
```

**Result:** All "Sold" values >5000 display with light green background and dark green text.

---

## Pre-define Rules in Configuration

Conditional formatting can be applied during initialization using the `conditionalFormatSettings` property within `dataSourceSettings`. This ensures rules are active immediately when the Pivot Table loads.

### Single Field Formatting

```vue
<script setup>
const dataSourceSettings = {
  dataSource: Pivot_Data,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'In_Stock' }, { name: 'Sold' }],
  conditionalFormatSettings: [
    {
      measure: 'In_Stock',           // Format only In_Stock
      value1: 5000,
      conditions: 'LessThan',
      style: {
        backgroundColor: '#80cbc4',
        color: 'black',
        fontFamily: 'Tahoma',
        fontSize: '12px'
      }
    }
  ]
};
</script>
```

### Multiple Rules on Single Field

```javascript
conditionalFormatSettings: [
  {
    measure: 'Sales',
    value1: 10000,
    conditions: 'GreaterThan',
    style: {
      backgroundColor: '#FFD700',  // Gold for high sales
      color: 'darkblue'
    }
  },
  {
    measure: 'Sales',
    value1: 5000,
    value2: 10000,
    conditions: 'Between',
    style: {
      backgroundColor: '#FFA500',  // Orange for medium
      color: 'darkred'
    }
  }
]
```

### Applying Rules to All Value Fields

Omit the `measure` property to apply formatting to **all** value fields simultaneously:

```javascript
conditionalFormatSettings: [
  {
    // No measure specified - applies to ALL value fields
    value1: 500,
    conditions: 'GreaterThan',
    style: {
      backgroundColor: '#87CEEB',
      color: 'darkblue',
      fontSize: '14px'
    }
  }
]
```

**Result:** All value cells with values >500 receive the blue background regardless of which value field they belong to.

---

## Show Formatting Dialog via Toolbar

### Method 1: Toolbar Button (Recommended)

Include `'ConditionalFormatting'` in the toolbar array:

```vue
<template>
  <ejs-pivotview 
    :toolbar="['ConditionalFormatting']"
    :showToolbar="true"
  ></ejs-pivotview>
</template>
```

### Method 2: Programmatic Dialog Opening

Call `showConditionalFormattingDialog()` method directly:

```vue
<template>
  <div>
    <button @click="openFormattingDialog">Open Formatting</button>
    <ejs-pivotview ref="pivotRef" :allowConditionalFormatting="true"></ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pivotRef = ref(null);

const openFormattingDialog = () => {
  const pivotInstance = pivotRef.value.ej2_instances[0];
  pivotInstance.conditionalFormattingModule.showConditionalFormattingDialog();
};
</script>
```

**Use Cases:**
- Add button in custom toolbar
- Trigger from external UI element
- Conditional opening based on user role/permissions

---

## Dynamic Rule Modification

### Editing Existing Rules at Runtime

Users can modify existing rules through the conditional formatting dialog:

1. Click "Conditional Formatting" toolbar button
2. Select existing rule from list
3. Modify condition, value, or style
4. Click "OK" to update

The changes apply immediately to the Pivot Table visualization.

### Removing Rules

In the conditional formatting dialog, click the **delete icon** next to any rule to remove it. The pivot cells revert to default styling.

### Programmatic Rule Modification

Update rules through code and refresh:

```javascript
// Add a new rule dynamically
const newRule = {
  measure: 'Sold',
  value1: 1000,
  conditions: 'LessThan',
  style: { backgroundColor: '#FFB6C6', color: 'red' }
};

dataSourceSettings.conditionalFormatSettings.push(newRule);
// Refresh PivotView to apply
pivotInstance.refresh();
```

---

## Formatting Effects on UI

### Grand Totals Behavior

By default, conditional formatting rules apply to grand totals. Control this with the `applyGrandTotals` property:

```javascript
conditionalFormatSettings: [
  {
    measure: 'Sales',
    value1: 50000,
    conditions: 'GreaterThan',
    applyGrandTotals: true,   // Include grand totals (default)
    style: { backgroundColor: '#FFD700' }
  },
  {
    measure: 'Units',
    value1: 1000,
    conditions: 'LessThan',
    applyGrandTotals: false,  // Exclude grand totals
    style: { backgroundColor: '#FFB6C6' }
  }
]
```

**Setting `false`** ensures grand total cells remain unformatted even if condition matches.

### Performance Considerations

- Simple single-condition rules: Minimal performance impact
- Complex multiple rules: May slow rendering on large datasets
- **Tip:** Limit to <10 rules for optimal performance

### Cell-Level Application

Rules apply strictly to **value cells** in the pivot body:
- ✅ Applies to: Value cells matching condition
- ❌ Does NOT apply to: Row headers, column headers, filter area
- ✅ Applies to: Grand totals (unless `applyGrandTotals: false`)

---

## Events and Customization

### ConditionalFormatting Event

The `conditionalFormatting` event fires when users click "ADD CONDITION" in the dialog, allowing custom logic:

```vue
<template>
  <ejs-pivotview
    :allowConditionalFormatting="true"
    @conditionalFormatting="onConditionalFormatting"
  ></ejs-pivotview>
</template>

<script setup>
const onConditionalFormatting = (event) => {
  console.log('Condition added:', event.conditions);
  console.log('Measure:', event.measure);
  console.log('Value1:', event.value1);
  console.log('Value2:', event.value2);
};
</script>
```

**Event Parameters:**
- `applyGrandTotals` - Whether to format grand totals
- `conditions` - Chosen operator (GreaterThan, Between, etc.)
- `label` - Row/column field header (if applicable)
- `measure` - Value field name
- `style` - Current style settings (backgroundColor, color, fontFamily, fontSize)
- `value1` - Primary threshold value
- `value2` - Secondary threshold (for Between/NotBetween)

### Real-World Example: Color-Coded Sales Dashboard

```vue
<script setup>
const dataSourceSettings = {
  dataSource: Pivot_Data,
  rows: [{ name: 'Region' }],
  columns: [{ name: 'Quarter' }],
  values: [{ name: 'Sales' }, { name: 'Profit' }],
  conditionalFormatSettings: [
    // Sales thresholds
    {
      measure: 'Sales',
      value1: 100000,
      conditions: 'GreaterThanOrEqualTo',
      applyGrandTotals: false,
      style: {
        backgroundColor: '#0B5345',  // Dark green
        color: '#E8F5E9',             // Light text
        fontFamily: 'Arial',
        fontSize: '13px'
      }
    },
    {
      measure: 'Sales',
      value1: 50000,
      value2: 100000,
      conditions: 'Between',
      style: {
        backgroundColor: '#FFB74D',  // Orange
        color: '#5D4037'
      }
    },
    {
      measure: 'Sales',
      value1: 50000,
      conditions: 'LessThan',
      style: {
        backgroundColor: '#E53935',  // Red
        color: '#FFFFFF'
      }
    },
    // Profit formatting
    {
      measure: 'Profit',
      value1: 0,
      conditions: 'GreaterThan',
      style: {
        backgroundColor: '#A5D6A7',  // Light green
        color: '#1B5E20'
      }
    },
    {
      measure: 'Profit',
      value1: 0,
      conditions: 'LessThanOrEqualTo',
      style: {
        backgroundColor: '#FFAB91',  // Light red
        color: '#D84315'
      }
    }
  ]
};
</script>
```

**Result:** A professional color-coded dashboard where:
- Green = Strong performance (Sales ≥100k or Profit >0)
- Orange = Moderate performance (50k-100k sales)
- Red = Needs attention (Sales <50k or Loss)

---

## Common Patterns

### Alert on Low Stock
```javascript
{
  measure: 'In_Stock',
  value1: 100,
  conditions: 'LessThan',
  style: {
    backgroundColor: '#FFCDD2',
    color: '#B71C1C',
    fontSize: '12px'
  }
}
```

### Highlight Top Performers
```javascript
{
  measure: 'Revenue',
  value1: 75000,
  conditions: 'GreaterThan',
  style: {
    backgroundColor: '#C8E6C9',
    color: '#1B5E20',
    fontFamily: 'Arial'
  }
}
```

### Range Warning (Mid-tier)
```javascript
{
  measure: 'Quantity',
  value1: 200,
  value2: 500,
  conditions: 'Between',
  style: {
    backgroundColor: '#FFF9C4',
    color: '#F57C00'
  }
}
```

---

## Troubleshooting

**Issue:** Formatting not applied
- ✅ Verify `allowConditionalFormatting: true`
- ✅ Check `ConditionalFormatting` module is provided
- ✅ Confirm measure name matches exact value field name (case-sensitive)

**Issue:** Grand totals not formatted
- ✅ Verify `applyGrandTotals: true` (default)
- ✅ Check condition threshold includes grand total value

**Issue:** Colors not visible
- ✅ Ensure sufficient contrast between backgroundColor and color
- ✅ Test colors in browser DevTools before deploying
