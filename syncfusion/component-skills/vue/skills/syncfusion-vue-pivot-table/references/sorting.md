# Sorting

## Table of Contents
- [Overview](#overview)
- [Member Sorting](#member-sorting)
- [Value Sorting](#value-sorting)
- [Custom Sorting](#custom-sorting)
- [Alphanumeric Sorting](#alphanumeric-sorting)

## Overview

Sorting organizes field members in rows and columns in ascending or descending order. By default, all fields are sorted in ascending order. Property: [`enableSorting`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iDataOptions#enablesorting)

## Member Sorting

### Enable Member Sorting (Default)

Member sorting arranges field members in rows/columns in ascending (A→Z) or descending (Z→A) order. By default, `enableSorting` is **true**.

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
  rows: [{ name: 'Country' }],  // Will sort A→Z by default
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount' }],
  filters: [],
  enableSorting: true  // Enable sorting (default: true)
};

const height = 350;
</script>
```

### Runtime Sorting - UI Control

Users can click sort icons in:
- **Field List** - Sort icon appears next to each field
- **Grouping Bar** - Sort icon on field buttons

**Sort Options:**
- **Ascending** (↑): A→Z or low→high
- **Descending** (↓): Z→A or high→low
- **None**: Original data order (removes sort icons)

### Programmatic Member Sorting

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount' }],
  
  // Define sort order for fields
  sortSettings: [
    {
      name: 'Country',
      order: 'Ascending'  // A→Z
    },
    {
      name: 'Year',
      order: 'Descending'  // 2023, 2022, 2021...
    },
    {
      name: 'Quarter',
      order: 'None'  // Original data order
    }
  ]
};
</script>
```

**Sort Properties:**
- **`name`**: Field name to sort
- **`order`**: `Ascending`, `Descending`, or `None`

## Value Sorting

### Enable Value Sorting

Value sorting arranges rows/columns based on aggregated values (not member names). Property: [`enableValueSorting`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#enablevaluesorting)

```vue
<template>
  <ejs-pivotview :dataSourceSettings="dataSourceSettings" :enableValueSorting="enableValueSorting"></ejs-pivotview>
</template>

<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Products' }],
  values: [{ name: 'Amount' }]
};

const enableValueSorting = true;  // Sort by Amount value, not product name
</script>
```

### Runtime Value Sorting

**How to sort by values:**
1. Click on a value field header
2. Choose ascending/descending
3. Table reorganizes by that value

**Example:**
- Click "Amount" column header
- Descending: Highest sales first
- Columns rearrange: Product_A ($50k), Product_C ($30k), Product_B ($20k)

## Custom Sorting

### Define Custom Member Order

Sort members in a specific sequence you define (not alphabetical or numerical). Use [`membersOrder`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iSort#membersorder) property:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Quarter' }],
  values: [{ name: 'Amount' }],
  
  sortSettings: [
    {
      name: 'Quarter',
      // Custom order: Q1, Q4, Q2, Q3
      membersOrder: ['Q1', 'Q4', 'Q2', 'Q3'],
      order: 'Ascending'  // Apply in this sequence
    },
    {
      name: 'Country',
      // Months in custom sequence
      membersOrder: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      order: 'Ascending'
    }
  ]
};
</script>
```

**Use Cases:**
- Fiscal quarters in non-standard order (Q4 before Q1)
- Months by region (Jan in North, Feb in South)
- Priority-based sorting (High, Medium, Low)
- Custom reporting periods

## Alphanumeric Sorting

### Sort Numbers Numerically (Not Alphabetically)

By default, items starting with numbers sort alphabetically. Use [`dataType: 'number'`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFieldOptions#datatype) to sort numerically:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    {
      name: 'ProductID',
      dataType: 'number'  // Sort as numbers, not text
    }
  ],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Quantity' }]
};
</script>
```

### Alphanumeric Sorting Example

**Without `dataType: 'number'` (alphabetical):**
```
209-FB
36-SW
71-AJ
```

**With `dataType: 'number'` (numeric):**
```
36-SW
71-AJ
209-FB
```

### Data Type Options

| DataType | Behavior |
|----------|----------|
| **string** | Alphabetical sorting (default for names) |
| **number** | Numeric sorting (1 < 10 < 100) |
| **date** | Date order (earliest→latest) |
| **datetime** | DateTime order with time consideration |
| **boolean** | False, True |

## Sorting in Complex Scenarios

### Multi-Level Row Sorting

```vue
<script setup>
const dataSourceSettings = {
  rows: [
    { name: 'Region' },    // First level sort
    { name: 'Country' }    // Second level sort
  ],
  sortSettings: [
    {
      name: 'Region',
      order: 'Ascending'   // Sort regions A→Z
    },
    {
      name: 'Country',
      order: 'Descending'  // Within each region, countries Z→A
    }
  ]
};
</script>
```

### Disable Sorting on Specific Field

```vue
<script setup>
// Only disable sorting for one field
const dataSourceSettings = {
  rows: [{ name: 'Category' }],
  sortSettings: [
    {
      name: 'Category',
      order: 'None'  // No sorting, original data order
    }
  ]
};
</script>
```

### Sorting Performance

- **Small datasets (<10k rows):** No optimization needed
- **Large datasets:** Sorting on indexed fields is faster
- **Best practice:** Pre-sort data at source if possible
- **Disable unused sorting:** `enableSorting: false` if not needed

### Sorting Precedence

When both member and value sorting apply:
1. **Value sorting** takes priority if `enableValueSorting: true`
2. **Member sorting** applies if value sorting disabled
3. **Custom member order** overrides alphabetical sorting

### Sorting Best Practices

- [ ] Set `dataType: 'number'` for numeric fields (IDs, quantities)
- [ ] Use custom sorting (`membersOrder`) for fiscal quarters/periods
- [ ] Disable sorting for performance on very large datasets
- [ ] Test sort order with actual data values
- [ ] Document custom sort sequences for team clarity
