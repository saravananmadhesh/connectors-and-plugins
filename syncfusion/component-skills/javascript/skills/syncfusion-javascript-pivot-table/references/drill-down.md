# Drill Down in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Drill Down and Drill Up](#drill-down-and-drill-up)
3. [Expand All Configuration](#expand-all-configuration)
4. [Common Patterns](#common-patterns)
5. [Troubleshooting](#troubleshooting)

## Overview

Drill down and drill up features in the Pivot View component provide interactive data exploration capabilities, allowing users to navigate through hierarchical data levels for detailed analysis or summarized views.

## Drill Down and Drill Up

Drill down and drill up features allow users to expand or collapse hierarchical data for detailed or summarized views. When field members contain child items, expand and collapse icons automatically appear in the corresponding row or column headers.

### Basic Drill Down

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**User Interaction:**
- Click the expand icon (+) to drill down and view child members
- Click the collapse icon (-) to drill up and hide child members
- Icons only appear when child items exist for that member

### Drill Position

The drill position feature ensures that drilling down or up affects only specific instances of members without impacting the same member in other positions. For example, drilling "Quarter 1" under "FY 2015" won't affect "Quarter 1" under "FY 2016".

**Key Benefits:**
- Independent drill operations for each member position
- Faster performance and more efficient rendering
- Automatic built-in functionality (no configuration needed)

## Expand All Configuration

### Expand All Members

To display all hierarchical members in an expanded state by default, use the `expandAll` property:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: true,
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Important:** This property applies only to relational data sources.

### Expand Specific Fields

Expand all headers for specific fields while keeping others collapsed:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year', expandAll: true },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [
            { name: 'Country', expandAll: true },
            { name: 'Products' }
        ],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

In this example, all headers for the **Year** column field and **Country** row field are expanded.

### Expand All Except Specific Members

Use the `drilledMembers` property to expand all headers except specified field members:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: true,
        drilledMembers: [
            { name: 'Country', items: ['France'] }
        ],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Properties:**
- `name`: Field name whose members should remain collapsed
- `items`: Array of specific members to keep collapsed

## Common Patterns

### Pattern 1: Hierarchical Sales Analysis

```typescript
// Configure multi-level drill down for sales data
dataSourceSettings: {
    dataSource: salesData as IDataSet[],
    expandAll: false,
    columns: [
        { name: 'Year', expandAll: true },
        { name: 'Quarter' },
        { name: 'Month' }
    ],
    rows: [
        { name: 'Region', expandAll: true },
        { name: 'Country' },
        { name: 'City' }
    ],
    values: [{ name: 'Sales', type: 'Sum' }]
}
```

### Pattern 2: Selective Expansion for Performance

```typescript
// Expand only current year, keep historical data collapsed
dataSourceSettings: {
    dataSource: pivotData as IDataSet[],
    expandAll: false,
    drilledMembers: [
        { name: 'Year', items: ['FY 2016', 'FY 2015', 'FY 2014'] }
    ],
    columns: [
        { name: 'Year', expandAll: false }
    ],
    rows: [{ name: 'Product' }],
    values: [{ name: 'Sales' }]
}
```

### Pattern 3: Focused Drill Down

```typescript
// Expand only specific region for focused analysis
dataSourceSettings: {
    dataSource: pivotData as IDataSet[],
    expandAll: true,
    drilledMembers: [
        { name: 'Region', items: ['Asia', 'Europe'] }
    ],
    rows: [
        { name: 'Region' },
        { name: 'Country' },
        { name: 'State' }
    ],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales' }]
}
```

## Troubleshooting

### Expand/Collapse Icons Not Appearing

**Issue:** No drill down icons visible in pivot table headers.

**Solution:**
- Verify that the field has hierarchical data (child members)
- Check that multiple fields are configured in rows or columns
- Ensure data source contains values for child fields
- Add another field level if only one field exists

### Expand All Too Slow

**Issue:** Setting `expandAll: true` causes performance issues.

**Solution:**
- Use `expandAll` on specific fields instead of globally
- Enable virtual scrolling: `enableVirtualization: true`
- Use `drilledMembers` to keep some members collapsed
- Consider paging for very large datasets
- Limit hierarchical depth in rows/columns

### Drilled Members Not Staying Collapsed

**Issue:** Members specified in `drilledMembers` are still expanded.

**Solution:**
- Ensure `expandAll: true` is set (drilledMembers only works with expandAll)
- Verify member names match data source exactly (case-sensitive)
- Check field name in drilledMembers matches field in rows/columns
- Use exact member names as they appear in data


