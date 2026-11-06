# Aggregation in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Available Aggregation Types](#available-aggregation-types)
3. [Setting Aggregation Types](#setting-aggregation-types)
4. [Runtime Aggregation Changes](#runtime-aggregation-changes)
5. [Customizing Aggregation UI](#customizing-aggregation-ui)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

## Overview

Aggregation in the Pivot View allows end users to perform calculations on groups of values, specifically for value fields placed in the value axis. By default, values are combined by summing them, but the component supports a wide range of aggregation types for different analytical needs.

**Key Capabilities:**
- 24 built-in aggregation types
- Runtime aggregation changes via UI
- Field-specific aggregation configuration
- Support for both numeric and non-numeric fields
- Base field/item comparisons for advanced calculations

**Important:** This feature applies only to relational data sources.

## Available Aggregation Types

### Basic Aggregations (All Numeric Fields)

| Type | Description | Use Case |
|------|-------------|----------|
| Sum | Total sum of values | Default for numeric fields |
| Avg | Average (mean) of values | Finding average sales, prices |
| Count | Number of records | Counting transactions, items |
| DistinctCount | Number of unique records | Unique customers, products |
| Min | Minimum value | Lowest price, earliest date |
| Max | Maximum value | Highest revenue, latest date |
| Product | Product of values | Compound growth calculations |

### Statistical Aggregations

| Type | Description | Use Case |
|------|-------------|----------|
| Median | Middle value | Central tendency analysis |
| PopulationStDev | Population standard deviation | Variability across entire dataset |
| SampleStDev | Sample standard deviation | Variability in sample data |
| PopulationVar | Population variance | Spread of population data |
| SampleVar | Sample variance | Spread of sample data |

### Advanced Aggregations

| Type | Description | Use Case |
|------|-------------|----------|
| Index | Index value for selected data | Comparative indexing |
| RunningTotals | Cumulative totals | Year-to-date, running balances |
| PercentageOfRunningTotals | Cumulative percentage of running totals (client-side engine only) | Running total percentages |
| DifferenceFrom | Difference from base item | Variance analysis |
| PercentageOfDifferenceFrom | Percentage difference from base | Growth rates, % change |
| PercentageOfGrandTotal | Percentage of overall total | Market share analysis |
| PercentageOfColumnTotal | Percentage of column total | Column-wise distribution |
| PercentageOfRowTotal | Percentage of row total | Row-wise distribution |
| PercentageOfParentTotal | Percentage of parent total | Hierarchical contribution |
| PercentageOfParentColumnTotal | Percentage of parent column | Parent column contribution |
| PercentageOfParentRowTotal | Percentage of parent row | Parent row contribution |
| CalculatedField | Custom calculated field | Formula-based calculations |

**Data Type Support:**
- **Numeric fields:** Support all aggregation types except CalculatedField
- **Non-numeric fields (string, date, boolean, etc.):** Support only Count and DistinctCount

## Setting Aggregation Types

### Programmatic Configuration

Set aggregation types using the `type` property in the `values` array:

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
            { name: 'Sold', caption: 'Units Sold', type: 'Sum' },
            { name: 'Amount', caption: 'Sold Amount', type: 'Avg' }
        ],
        rows: [
            { name: 'Country' },
            { name: 'Products' }
        ],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Advanced Aggregations with Base Fields

For aggregation types like `DifferenceFrom` and `PercentageOfDifferenceFrom`, specify base field and base item for comparison:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [
            {
                name: 'Amount',
                caption: 'Sales Growth',
                type: 'DifferenceFrom',
                baseField: 'Year',
                baseItem: 'FY 2015'
            }
        ],
        rows: [{ name: 'Country' }]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Properties for Advanced Aggregations:**
- `type`: Aggregation type (e.g., 'DifferenceFrom', 'PercentageOfParentTotal')
- `baseField`: Specific field to compare against
- `baseItem`: Specific member within baseField for comparison

### Percentage of Parent Total Configuration

```typescript
values: [
    {
        name: 'Amount',
        caption: 'Parent Contribution',
        type: 'PercentageOfParentTotal',
        baseField: 'Country'
    }
]
```

### Percentage of Running Totals Configuration

The `PercentageOfRunningTotals` aggregation type displays cumulative percentage of running totals. This is useful for tracking the percentage progression of cumulative values over a dimension. **Note: This aggregation type is client-side engine only.**

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [
            {
                name: 'Amount',
                caption: 'Running Total %',
                type: 'PercentageOfRunningTotals'
            }
        ],
        rows: [{ name: 'Country' }]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

This aggregation is particularly useful for:
- Tracking cumulative sales percentage across regions
- Monitoring revenue accumulation percentage over quarters
- Analyzing progressive percentage contribution by categories

## Runtime Aggregation Changes

Users can dynamically change aggregation types through the UI at runtime using the grouping bar or field list.

### Enabling Runtime Changes

```typescript
import { PivotView, IDataSet, GroupingBar, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(GroupingBar, FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }]
    },
    showGroupingBar: true,
    showFieldList: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**UI Interaction:**
1. Click the dropdown icon on value field button
2. Select desired aggregation type from menu
3. Pivot table updates instantly

## Customizing Aggregation UI

### Limiting Available Aggregation Types

Restrict the dropdown menu to show only specific aggregation types using the `aggregateTypes` property:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }]
    },
    showGroupingBar: true,
    showFieldList: true,
    aggregateTypes: ['Sum', 'Avg', 'Count', 'DistinctCount', 'Min', 'Max'],
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Hiding Aggregation Type from Button Text

By default, each value field displays with its aggregation type (e.g., "Sum of Units Sold"). To show only the field name:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Sold', caption: 'Units Sold', type: 'Sum' },
            { name: 'Amount', caption: 'Sold Amount', type: 'Avg' }
        ],
        rows: [{ name: 'Country' }],
        showAggregationOnValueField: false
    },
    showGroupingBar: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Hiding Aggregation Type Icon

Hide the dropdown icon in the grouping bar (does not affect field list):

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }]
    },
    showGroupingBar: true,
    groupingBarSettings: {
        showValueTypeIcon: false
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Common Patterns

### Pattern 1: Sales Performance Dashboard

```typescript
// Multiple aggregations for comprehensive analysis
dataSourceSettings: {
    dataSource: salesData as IDataSet[],
    columns: [{ name: 'Year' }, { name: 'Quarter' }],
    values: [
        { name: 'Revenue', caption: 'Total Revenue', type: 'Sum' },
        { name: 'Revenue', caption: 'Average Revenue', type: 'Avg' },
        { name: 'TransactionID', caption: 'Transaction Count', type: 'Count' },
        { name: 'Revenue', caption: 'Max Sale', type: 'Max' }
    ],
    rows: [{ name: 'Region' }, { name: 'Salesperson' }],
    formatSettings: [
        { name: 'Revenue', format: 'C0' }
    ]
}
```

### Pattern 2: Year-over-Year Growth Analysis

```typescript
// Compare current year against previous year
dataSourceSettings: {
    dataSource: salesData as IDataSet[],
    columns: [{ name: 'Year' }],
    values: [
        { name: 'Sales', caption: 'Sales Amount', type: 'Sum' },
        {
            name: 'Sales',
            caption: 'YoY Growth %',
            type: 'PercentageOfDifferenceFrom',
            baseField: 'Year',
            baseItem: 'FY 2015'
        }
    ],
    rows: [{ name: 'Product' }],
    formatSettings: [
        { name: 'Sales', format: 'C0' }
    ]
}
```

### Pattern 3: Market Share Analysis

```typescript
// Calculate percentage contribution
dataSourceSettings: {
    dataSource: marketData as IDataSet[],
    columns: [{ name: 'Year' }],
    values: [
        { name: 'Revenue', caption: 'Revenue', type: 'Sum' },
        {
            name: 'Revenue',
            caption: 'Market Share %',
            type: 'PercentageOfGrandTotal'
        }
    ],
    rows: [{ name: 'Company' }],
    formatSettings: [
        { name: 'Revenue', format: 'C0' }
    ]
}
```

### Pattern 4: Statistical Analysis

```typescript
// Advanced statistical measures
dataSourceSettings: {
    dataSource: performanceData as IDataSet[],
    columns: [{ name: 'Department' }],
    values: [
        { name: 'Score', caption: 'Average Score', type: 'Avg' },
        { name: 'Score', caption: 'Median Score', type: 'Median' },
        { name: 'Score', caption: 'Std Deviation', type: 'SampleStDev' },
        { name: 'Score', caption: 'Min Score', type: 'Min' },
        { name: 'Score', caption: 'Max Score', type: 'Max' }
    ],
    rows: [{ name: 'Employee' }],
    formatSettings: [
        { name: 'Score', format: 'N2' }
    ]
}
```

## Troubleshooting

### Aggregation Type Not Changing

**Issue:** Clicking the dropdown doesn't change the aggregation type.

**Solution:**
- Ensure `GroupingBar` or `FieldList` module is injected
- Verify `showGroupingBar: true` or `showFieldList: true` is set
- Check that the field is in the `values` axis, not rows/columns

### DifferenceFrom Shows Incorrect Values

**Issue:** DifferenceFrom aggregation displays unexpected results.

**Solution:**
- Verify `baseField` matches an existing field name exactly
- Ensure `baseItem` matches a member in the baseField
- Check that the base item exists in the current data view
- Use exact case-sensitive names for baseField and baseItem

### Percentage Aggregations Show Zero

**Issue:** Percentage aggregations display 0% for all cells.

**Solution:**
- Ensure data contains numeric values, not strings
- Check that the base field/item is properly configured
- Verify the pivot table has aggregated data (not drill-through view)
- Add appropriate format settings: `{ name: 'FieldName', format: 'P2' }`

### DistinctCount Shows Same as Count

**Issue:** DistinctCount and Count show identical values.

**Solution:**
- Verify the field actually contains duplicate values
- Check data source for proper distinct values
- Ensure field is correctly mapped in dataSourceSettings

### Aggregation Dropdown Not Visible

**Issue:** Cannot see dropdown icon to change aggregation.

**Solution:**
- Set `showValueTypeIcon: true` in groupingBarSettings
- Verify the field is a value field (in `values` array)
- Enable grouping bar: `showGroupingBar: true`
- Inject GroupingBar module: `PivotView.Inject(GroupingBar)`

### Custom Aggregation Not Applying

**Issue:** Programmatically set aggregation type doesn't apply.

**Solution:**
- Check aggregation type spelling (case-sensitive)
- Verify field supports the aggregation type (numeric vs non-numeric)
- For advanced types, ensure baseField and baseItem are defined
- Refresh the pivot table after changing dataSourceSettings
