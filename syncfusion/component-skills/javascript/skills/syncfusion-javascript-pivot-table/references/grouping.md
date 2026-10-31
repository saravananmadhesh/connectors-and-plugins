# Grouping in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Enabling Grouping](#enabling-grouping)
3. [Number Grouping](#number-grouping)
4. [Date Grouping](#date-grouping)
5. [Custom Grouping](#custom-grouping)
6. [Grouping Bar](#grouping-bar)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

## Overview

Grouping in the Pivot View component automatically organizes data into meaningful categories. It supports grouping for date, time, number, and string data types. Grouped fields function as individual fields and can be dragged between different axes to create dynamic pivot tables at runtime.

**Key Features:**
- Number grouping into ranges (1-5, 6-10, etc.)
- Date grouping by year, quarter, month, days, hours
- Custom grouping for selected members
- Interactive UI for grouping configuration
- Programmatic grouping through code

**Important:** Grouping feature is applicable only for relational data sources.

## Enabling Grouping

To enable grouping in the Pivot View, set the `allowGrouping` property to `true` and inject the `Grouping` module.

```typescript
import { PivotView, IDataSet, GroupingBar, Grouping } from '@syncfusion/ej2-pivotview';
import { Group_Data } from './datasource';

PivotView.Inject(GroupingBar, Grouping);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: Group_Data as IDataSet[],
        expandAll: false,
        enableSorting: true,
        formatSettings: [
            { name: 'Amount', format: 'C' },
            { name: 'Date', type: 'date', format: 'dd/MM/yyyy-hh:mm a' },
            { name: 'Product_ID', format: 'N0' }
        ],
        rows: [{ name: 'Date', caption: 'Date' }],
        columns: [{ name: 'Product_ID', caption: 'Product ID' }],
        values: [
            { name: 'Sold', caption: 'Unit Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        filters: []
    },
    showGroupingBar: true,
    allowGrouping: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**UI Interaction:**
- Right-click on row or column header
- Select **Group** from context menu
- Configure grouping options in dialog
- Click **OK** to apply grouping

## Number Grouping

Number grouping organizes numerical data into different ranges. This is useful for analyzing data in buckets like price ranges, quantity ranges, or ID ranges.

### Range Configuration

**Starting At / Ending At:** Define the number range for grouping. Numbers outside this range are grouped as "Out of Range".

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: Group_Data as IDataSet[],
        rows: [{ name: 'Product_ID', caption: 'Product ID' }],
        columns: [{ name: 'Products' }],
        values: [
            { name: 'Sold', caption: 'Unit Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        formatSettings: [
            { name: 'Amount', format: 'C' },
            { name: 'Product_ID', format: 'N0' }
        ],
        groupSettings: [
            {
                name: 'Product_ID',
                type: 'Number',
                rangeInterval: 2,
                startingAt: 1004,
                endingAt: 1008
            }
        ]
    },
    showGroupingBar: true,
    allowGrouping: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Number Grouping Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Field name to group |
| `type` | string | Set to 'Number' for number grouping |
| `rangeInterval` | number | Interval between ranges (e.g., 2 creates 1004-1005, 1006-1007) |
| `startingAt` | number | Starting value of the range |
| `endingAt` | number | Ending value of the range |

### Ungrouping Numbers

To remove number grouping:
1. Right-click the grouped header
2. Select **Ungroup** from context menu
3. The field returns to ungrouped state

## Date Grouping

Date grouping allows organizing date fields by time periods such as years, quarters, months, days, hours, minutes, and seconds.

### Date Grouping Options

**Available Date Groups:**
- Years
- Quarters
- Months
- Days
- Hours
- Minutes
- Seconds

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: Group_Data as IDataSet[],
        rows: [{ name: 'Date', caption: 'Date' }],
        columns: [{ name: 'Products' }],
        values: [
            { name: 'Sold', caption: 'Unit Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        formatSettings: [
            { name: 'Date', type: 'date', format: 'dd/MM/yyyy-hh:mm a' }
        ],
        groupSettings: [
            {
                name: 'Date',
                type: 'Date',
                groupInterval: ['Years', 'Quarters', 'Months']
            }
        ]
    },
    allowGrouping: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Date Grouping Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Field name to group |
| `type` | string | Set to 'Date' for date grouping |
| `groupInterval` | array | Array of intervals: ['Years', 'Quarters', 'Months', 'Days', etc.] |
| `startingAt` | Date | Optional starting date |
| `endingAt` | Date | Optional ending date |

### Date Range Filtering

You can limit date grouping to a specific date range:

```typescript
groupSettings: [
    {
        name: 'Date',
        type: 'Date',
        groupInterval: ['Years', 'Months'],
        startingAt: new Date('2015-01-01'),
        endingAt: new Date('2016-12-31')
    }
]
```

## Custom Grouping

Custom grouping allows you to manually group selected members of a field into custom categories. This is useful for creating business-specific groupings like regions, product categories, or custom segments.

### Creating Custom Groups

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        groupSettings: [
            {
                name: 'Country',
                type: 'Custom',
                caption: 'Regions',
                customGroups: [
                    {
                        groupName: 'North America',
                        items: ['United States', 'Canada']
                    },
                    {
                        groupName: 'Europe',
                        items: ['France', 'Germany', 'United Kingdom']
                    }
                ]
            }
        ]
    },
    allowGrouping: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Custom Group Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Field name to group |
| `type` | string | Set to 'Custom' for custom grouping |
| `caption` | string | Display name for the grouped field |
| `customGroups` | array | Array of custom group definitions |
| `groupName` | string | Name of the custom group |
| `items` | array | Array of member names to include in the group |

## Grouping Bar

The grouping bar provides a visual interface for managing fields and their grouping. Enable it to allow users to perform drag-and-drop operations and configure grouping interactively.

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: Group_Data as IDataSet[],
        rows: [{ name: 'Date' }],
        columns: [{ name: 'Product_ID' }],
        values: [{ name: 'Sold' }]
    },
    showGroupingBar: true,
    allowGrouping: true,
    groupingBarSettings: {
        showFieldsPanel: true,
        showFilterIcon: true,
        showSortIcon: true,
        showRemoveIcon: true
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Common Patterns

### Pattern 1: Product Price Range Grouping

```typescript
// Group products by price ranges
groupSettings: [
    {
        name: 'Price',
        type: 'Number',
        rangeInterval: 100,
        startingAt: 0,
        endingAt: 1000
    }
]
```

### Pattern 2: Sales Analysis by Date Hierarchy

```typescript
// Group sales data by year, quarter, and month
groupSettings: [
    {
        name: 'OrderDate',
        type: 'Date',
        groupInterval: ['Years', 'Quarters', 'Months']
    }
]
```

### Pattern 3: Regional Product Grouping

```typescript
// Create custom regional groups
groupSettings: [
    {
        name: 'Product',
        type: 'Custom',
        caption: 'Product Categories',
        customGroups: [
            {
                groupName: 'Electronics',
                items: ['Laptop', 'Phone', 'Tablet']
            },
            {
                groupName: 'Accessories',
                items: ['Mouse', 'Keyboard', 'Monitor']
            }
        ]
    }
]
```

### Pattern 4: Multiple Field Grouping

```typescript
// Apply grouping to multiple fields
groupSettings: [
    {
        name: 'OrderDate',
        type: 'Date',
        groupInterval: ['Years', 'Quarters']
    },
    {
        name: 'ProductID',
        type: 'Number',
        rangeInterval: 10
    }
]
```

## Troubleshooting

### Grouping Options Not Appearing

**Issue:** Right-click context menu doesn't show Group option.

**Solution:**
- Verify `allowGrouping: true` is set
- Ensure `Grouping` module is injected: `PivotView.Inject(Grouping)`
- Check that the data source is relational (not OLAP)

### Out of Range Values

**Issue:** Some values appear as "Out of Range" after number grouping.

**Solution:**
- Check `startingAt` and `endingAt` values cover your data range
- Remove range limits to group all values: omit `startingAt` and `endingAt`
- Adjust range to include all desired values

### Date Grouping Not Working

**Issue:** Date fields don't group properly.

**Solution:**
- Ensure date field is properly formatted in data source
- Add format setting: `{ name: 'DateField', type: 'date', format: 'dd/MM/yyyy' }`
- Verify date values are valid Date objects, not strings

### Custom Groups Not Displaying

**Issue:** Custom groups don't appear in the pivot table.

**Solution:**
- Verify `type: 'Custom'` is specified in groupSettings
- Check that `groupName` and `items` array are properly defined
- Ensure member names in `items` match exactly with data source values

### Performance Issues with Large Datasets

**Issue:** Grouping operations are slow with large data.

**Solution:**
- Limit date grouping intervals (use fewer intervals like Years, Quarters only)
- Reduce `rangeInterval` for number grouping
- Enable virtual scrolling: `enableVirtualization: true`
- Consider server-side grouping for very large datasets

### Multiple Grouping Types Conflict

**Issue:** Cannot apply multiple grouping types to the same field.

**Solution:**
- Only one grouping type can be applied per field at a time
- Remove existing grouping before applying new type
- Use separate fields for different grouping requirements
