# Grouping

## Table of Contents
- [Overview](#overview)
- [Enable Grouping](#enable-grouping)
- [Number Grouping](#number-grouping)
- [Date Grouping](#date-grouping)
- [Custom Grouping](#custom-grouping)
- [Managing Groups](#managing-groups)

## Overview

Grouping automatically organizes data into meaningful categories: dates into years/quarters, numbers into ranges, and strings into custom groups. Grouped fields become independent fields usable in any pivot axis. Property: [`allowGrouping`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#allowgrouping)

**Three grouping types:**
- **Number Groups** - 1-5, 6-10, 11-15, etc.
- **Date Groups** - Year, Quarter, Month, Week, Day
- **Custom Groups** - User-defined categories

## Enable Grouping

### Activate Grouping Feature

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings"
    :allowGrouping="allowGrouping"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview, Grouping } from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount' }]
};

const allowGrouping = true;

provide('pivotview', [Grouping]);  // Inject Grouping module
</script>
```

### UI Grouping Interface

**Right-click on any row/column header:**
1. Select **Group** → Group Configuration Dialog
2. Select **Ungroup** → Remove grouping
3. Choose grouping type and settings

## Number Grouping

### Group Numbers into Ranges

Group numerical data into intervals (1-5, 6-10, 11-15, etc.)

```vue
<script setup>
const groupSettings = [
  {
    name: 'ProductID',           // Field name
    type: 'Number',              // Grouping type
    rangeInterval: 5,            // Group by 5: 1-5, 6-10, etc.
    startingAt: 1001,            // Start range at
    endingAt: 1010               // End range at
  }
];

// In dataSourceSettings
const dataSourceSettings = {
  groupSettings: groupSettings
};
</script>
```

### Number Grouping Configuration

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `name` | string | Field name to group | 'ProductID' |
| `type` | string | Must be 'Number' | 'Number' |
| `rangeInterval` | number | Size of each group | 5 (→ 1-5, 6-10) |
| `startingAt` | number | First range starts at | 1001 |
| `endingAt` | number | Last range ends at | 1010 |

### Number Grouping Example

```vue
<script setup>
const groupSettings = [
  {
    name: 'Quantity',
    type: 'Number',
    rangeInterval: 100,    // Groups: 0-99, 100-199, 200-299...
    startingAt: 0,
    endingAt: 500
  }
];

// Result: 0-99, 100-199, 200-299, 300-399, 400-499, Out of Range
</script>
```

**Out of Range:** Values outside startingAt-endingAt go here

## Date Grouping

### Group Dates by Time Period

Automatically organize date fields into periods: Year, Quarter, Month, Week, Day.

```vue
<script setup>
const groupSettings = [
  {
    name: 'OrderDate',
    type: 'Date',
    groupInterval: [
      'Years',      // 2022, 2023, 2024...
      'Quarters',   // Q1, Q2, Q3, Q4
      'Months'      // Jan, Feb, Mar...
    ]
  }
];
</script>
```

### Date Group Intervals

| Interval | Result | Example |
|----------|--------|---------|
| **Years** | Year only | 2023 |
| **Quarters** | Quarter within year | 2023 - Q1 |
| **Months** | Month within year | Jan 2023 |
| **Weeks** | Week of year | Week 1 (Jan 1-7) |
| **Days** | Individual days | Mon, Jan 1, 2023 |
| **Hours** | Hour of day | 09:00 |
| **Minutes** | Minute | 09:30 |
| **Seconds** | Second | 09:30:45 |

### Date Grouping Example

```vue
<script setup>
const groupSettings = [
  {
    name: 'SalesDate',
    type: 'Date',
    groupInterval: ['Years', 'Quarters', 'Months']
  }
];

// Pivot shows nested structure:
// 2023
//   Q1
//     January
//     February
//     March
//   Q2
//     April
//     May
//     June
</script>
```

### Custom Date Grouping

```vue
<script setup>
const groupSettings = [
  {
    name: 'TransactionDate',
    type: 'Date',
    groupInterval: ['Years', 'Months']  // Exclude quarters
  }
];

// Simpler hierarchy: Year → Month directly
</script>
```

## Custom Grouping

### Create Custom Categories

Group items into user-defined categories not based on value ranges or dates.

```vue
<script setup>
const groupSettings = [
  {
    name: 'Region',
    type: 'Custom',
    customGroups: [
      {
        groupName: 'North America',
        items: ['USA', 'Canada', 'Mexico']
      },
      {
        groupName: 'Europe',
        items: ['UK', 'France', 'Germany', 'Italy', 'Spain']
      },
      {
        groupName: 'Asia Pacific',
        items: ['China', 'Japan', 'India', 'Australia']
      }
    ]
  }
];
</script>
```

### Custom Grouping Example

**Before grouping:**
```
USA
Canada
UK
France
Germany
China
Japan
```

**After custom grouping:**
```
North America
├─ USA
├─ Canada
└─ Mexico
Europe
├─ UK
├─ France
└─ Germany
Asia Pacific
├─ China
└─ Japan
```

## Managing Groups

### Programmatic Grouping Setup

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Date' }],
  values: [{ name: 'Amount' }],
  
  groupSettings: [
    {
      name: 'Date',
      type: 'Date',
      groupInterval: ['Years', 'Quarters']  // Date grouping
    },
    {
      name: 'OrderID',
      type: 'Number',
      rangeInterval: 100,  // Number grouping
      startingAt: 1000,
      endingAt: 2000
    }
  ]
};
</script>
```

### Combine Multiple Grouping Types

```vue
<script setup>
// Group both numbers and dates in same pivot
const groupSettings = [
  {
    name: 'Quantity',
    type: 'Number',
    rangeInterval: 10
  },
  {
    name: 'TransactionDate',
    type: 'Date',
    groupInterval: ['Years', 'Months']
  }
];
</script>
```

### Ungroup Fields

**UI:** Right-click header → Select **Ungroup**

**Programmatically:** Remove from `groupSettings` array

```vue
<script setup>
const ungroupField = (fieldName) => {
  dataSourceSettings.groupSettings = 
    dataSourceSettings.groupSettings.filter(g => g.name !== fieldName);
};
</script>
```

## Practical Grouping Scenarios

### Sales Dashboard Example

```vue
<script setup>
const groupSettings = [
  {
    // Group sales by date
    name: 'SalesDate',
    type: 'Date',
    groupInterval: ['Years', 'Quarters', 'Months']
  },
  {
    // Group products by sales quantity
    name: 'UnitsInStock',
    type: 'Number',
    rangeInterval: 50,       // 0-49, 50-99, 100-149...
    startingAt: 0,
    endingAt: 500
  },
  {
    // Custom product categories
    name: 'ProductName',
    type: 'Custom',
    customGroups: [
      {
        groupName: 'Premium',
        items: ['Product A', 'Product B', 'Product C']
      },
      {
        groupName: 'Standard',
        items: ['Product D', 'Product E', 'Product F']
      }
    ]
  }
];
</script>
```

### Employee Analysis Example

```vue
<script setup>
const groupSettings = [
  {
    // Group by hire date
    name: 'HireDate',
    type: 'Date',
    groupInterval: ['Years']  // Employee by year hired
  },
  {
    // Group by age ranges
    name: 'Age',
    type: 'Number',
    rangeInterval: 10,  // 20-29, 30-39, 40-49...
    startingAt: 20,
    endingAt: 65
  },
  {
    // Custom department grouping
    name: 'Department',
    type: 'Custom',
    customGroups: [
      {
        groupName: 'Engineering',
        items: ['Software', 'Hardware', 'QA']
      },
      {
        groupName: 'Business',
        items: ['Sales', 'Marketing', 'HR']
      }
    ]
  }
];
</script>
```

## Grouping Constraints and Best Practices

### Important Constraints

- Only **one grouping type** per field (can't mix Date and Number)
- Grouped fields become independent fields
- Grouping generates new field names in pivot
- Performance impact with very deep hierarchies

### Grouping Best Practices

- [ ] Only group fields that benefit from categorization
- [ ] Test date intervals with data (dates outside range cause issues)
- [ ] Use custom grouping for business-specific categories
- [ ] Document custom grouping logic for team clarity
- [ ] Test with realistic data volumes
- [ ] Keep hierarchy depth reasonable (3-4 levels max)
- [ ] Use number grouping for meaningful ranges (not arbitrary)
- [ ] Combine grouping types strategically for complex analysis

### Performance Considerations

- Grouping adds calculation overhead
- Deep hierarchies (many grouping levels) reduce performance
- For large datasets, pre-aggregate at data source level
- Disable unused grouping to improve responsiveness
