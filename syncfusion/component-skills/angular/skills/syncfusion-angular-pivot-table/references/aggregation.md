# Aggregation Functions

## Table of Contents
- [Overview](#overview)
- [Available Aggregation Types](#available-aggregation-types)
- [Configuring Aggregation Types](#configuring-aggregation-types)
- [Base Field Aggregation](#base-field-aggregation)
- [Parent-Total Aggregations](#parent-total-aggregations)
- [Running-Totals Aggregations](#running-totals-aggregations)
- [Runtime Aggregation Changes](#runtime-aggregation-changes)
- [Customizing Aggregation UI](#customizing-aggregation-ui)
- [Events](#events)

---

## Overview

Aggregation enables you to perform calculations on groups of values in the pivot table. By default, values are combined by summing them, but you can use 20+ different aggregation types including Sum, Average, Count, Min, Max, and more advanced statistical functions.

**Note**: Numeric fields support all aggregation types. Fields of type string, date, datetime, boolean support only **Count** and **DistinctCount** aggregation.

---

## Available Aggregation Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Sum** | Total sum of values | Total revenue, total quantity sold |
| **Avg** | Average of values | Average price, average rating |
| **Count** | Number of records | Transaction count, item count |
| **Min** | Minimum value | Lowest price, minimum inventory |
| **Max** | Maximum value | Highest price, maximum sales |
| **Product** | Product of all values | Compound growth calculations |
| **DistinctCount** | Number of unique records | Unique customers, unique products |
| **Median** | Middle value | Median price, median age |
| **RunningTotals** | Cumulative total | Running balance, cumulative sales |
| **DifferenceFrom** | Difference from base item | Variance from target, difference from budget |
| **PercentageOfDifferenceFrom** | Percentage difference from base | % change from baseline |
| **PercentageOfGrandTotal** | Percentage of overall total | % of global sales |
| **PercentageOfColumnTotal** | Percentage of column sum | % of region total |
| **PercentageOfRowTotal** | Percentage of row sum | % of category total |
| **PercentageOfParentTotal** | Percentage of parent group | % of parent revenue |
| **PercentageOfParentColumnTotal** | Percentage of parent total in each column | % of parent column total |
| **PercentageOfParentRowTotal** | Percentage of parent total in each row | % of parent row total |
| **PercentageOfRunningTotals** | Cumulative percentage of running totals (client-side only) | Cumulative % share, Pareto analysis |
| **PopulationStDev** | Standard deviation (population) | Data variability analysis |
| **SampleStDev** | Standard deviation (sample) | Sample-based variability |
| **PopulationVar** | Variance (population) | Population variance |
| **SampleVar** | Variance (sample) | Sample-based variance |
| **Index** | Index value | Position-based calculations |
| **CalculatedField** | Custom calculated field | Custom formulas and expressions |

---

## Configuring Aggregation Types

### Setting Aggregation via API

Configure aggregation for value fields using the `type` property in the `values` array:

```typescript
dataSourceSettings: IDataOptions = {
  dataSource: data,
  rows: [{ name: 'Category' }],
  columns: [{ name: 'Region' }],
  values: [
    { name: 'Amount', type: 'Sum' },      // Sum aggregation
    { name: 'UnitsSold', type: 'Count' }, // Count aggregation
    { name: 'Price', type: 'Avg' }        // Average aggregation
  ]
};
```

### Aggregating Different Fields

Add different fields to the values array, each with its own aggregation type:

```typescript
values: [
  { name: 'Amount', type: 'Sum' },       // Sum of Amount
  { name: 'UnitsSold', type: 'Count' },  // Count of UnitsSold
  { name: 'Price', type: 'Avg' },        // Average Price
  { name: 'Rating', type: 'Max' }        // Maximum Rating
]
```

**Note**: Each field in the values array can have only one aggregation type. If you need different aggregations for the same field, modify it at runtime through the UI dropdown.

### Default Behavior

- **Numeric fields**: Default aggregation is `Sum`
- **Non-numeric fields** (string, date, boolean): Default aggregation is `Count`

---

## Base Field Aggregation

Base field aggregations compare values against a specific baseline using `baseField` and `baseItem` properties.

### DifferenceFrom

Compare each value to a specific item in a base field:

```typescript
values: [
  {
    name: 'Amount',
    type: 'DifferenceFrom',
    baseField: 'Region',  // Field to compare against
    baseItem: 'USA'       // Specific item to use as baseline
  }
]
```

**Example**: Shows sales difference from USA sales for each region.

### PercentageOfDifferenceFrom

Calculate percentage difference from a base item:

```typescript
values: [
  {
    name: 'Amount',
    type: 'PercentageOfDifferenceFrom',
    baseField: 'Year',
    baseItem: '2022'
  }
]
```

**Example**: Shows % change in sales compared to 2022 for each year.

### PercentageOfParentTotal

Calculate percentage relative to parent group total:

```typescript
values: [
  {
    name: 'Amount',
    type: 'PercentageOfParentTotal',
    baseField: 'Category'  // Parent field to calculate against
  }
]
```

**Example**: Shows each product's sales as % of its category total.

---

## Parent-Total Aggregations

These aggregations compute a cell's value as a percentage of the **parent** total in either the column or row axis. They are useful for "what share of its parent group does this row/column represent?" analyses.

### PercentageOfParentColumnTotal

Computes each value as a percentage of its parent total **within the column axis**. The result is constrained vertically; children of the same parent always sum to 100% down a column branch.

```typescript
values: [
  { name: 'Amount', type: 'PercentageOfParentColumnTotal' }
]
```

**Example**: For a `Country → State → City` row hierarchy, every cell in the City level is shown as a percentage of its parent State total for each column.

### PercentageOfParentRowTotal

Computes each value as a percentage of its parent total **within the row axis**. Children of the same parent always sum to 100% across a row branch.

```typescript
values: [
  { name: 'Amount', type: 'PercentageOfParentRowTotal' }
]
```

**Example**: With a `Year → Quarter` column hierarchy, every cell in the Quarter level is shown as a percentage of its parent Year total for each row.

> Unlike `PercentageOfParentTotal`, the column- and row-scoped variants do not require a `baseField` — the engine automatically uses the immediate parent on the chosen axis.

---

## Running-Totals Aggregations

These aggregations accumulate values across the visible axis.

### RunningTotals

Displays the **cumulative total** of the selected field across rows/columns. Each cell adds the current value to the sum of the cells that came before it on the same axis.

```typescript
values: [
  { name: 'Amount', type: 'RunningTotals' }
]
```

**Example**: For a months-based column axis, the second month shows `Jan + Feb`, the third shows `Jan + Feb + Mar`, and so on.

### PercentageOfRunningTotals

> **Client-side engine only.** Not supported with the server-side pivot engine.

Displays the **cumulative percentage of running totals** for the selected field. Instead of a running raw sum, each cell shows that cell's running total as a percentage of the **grand total** of the measure.

```typescript
values: [
  { name: 'Amount', type: 'PercentageOfRunningTotals' }
]
```

> **Default format:** `PercentageOfRunningTotals` always renders as `P2` (percentage with 2 decimal places) by default, just like the other advanced percentage aggregations (`PercentageOfGrandTotal`, `PercentageOfColumnTotal`, `PercentageOfRowTotal`, `PercentageOfParentTotal`, `PercentageOfParentColumnTotal`, `PercentageOfParentRowTotal`). The `P2` format is **not** affected by `formatSettings` — entries in `formatSettings` are ignored for this aggregation type. You do **not** need to set it explicitly in `formatSettings`.

**Example**: With quarters Q1, Q2, Q3, Q4 having values 100, 200, 300, 400 (grand total = 1000):

| Quarter | Raw | RunningTotals | PercentageOfRunningTotals (P2) |
|---|---|---|---|
| Q1 | 100 | 100 | 10.00% (0.10) |
| Q2 | 200 | 300 | 30.00% (0.30) |
| Q3 | 300 | 600 | 60.00% (0.60) |
| Q4 | 400 | 1000 | 100.00% (1.00) |

The third column is shown as a percentage with two decimal places because of the built-in `P2` format. Internally the engine stores the raw ratio (e.g. `0.10`, `0.30`, `0.60`, `1.00`); the `P2` format is what renders it on screen as `10.00%`, `30.00%`, `60.00%`, `100.00%`. Any `format` you set in `formatSettings` for this field will be ignored — `P2` is fixed.

This is essentially a **Pareto/cumulative-share** aggregation — perfect for answering "what % of the total have we covered by this point?" without computing the cumulative share manually.

---

## Runtime Aggregation Changes

### Changing Aggregation Types at Runtime

Users can change aggregation types through the UI dropdown in:
- **Grouping Bar**: Click the dropdown icon on value field buttons
- **Field List**: Select aggregation from the value field dropdown

The pivot table updates instantly when a new aggregation is selected.

### Programmatic Modification

Modify aggregation types dynamically using the `GetValueFields()` method:

```typescript
// Change aggregation type for a value field
this.pivotGridObj.dataSourceSettings.values
  .find(field => field.name === 'Amount').type = 'Avg';

// Refresh the pivot table
this.pivotGridObj.refresh();
```

---

## Customizing Aggregation UI

### Show Specific Aggregation Types

Limit the dropdown to only relevant aggregation types using `aggregateTypes` property at component level:

```typescript
import { Component, OnInit } from '@angular/core';
import { AggregateTypes } from '@syncfusion/ej2-angular-pivotview';

@Component({
  template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings
    [aggregateTypes]='aggregateTypesOption'></ejs-pivotview>`
})
export class PivotGridComponent implements OnInit {
  public aggregateTypesOption: AggregateTypes[] = ['Sum', 'Avg', 'Count', 'Max'];
  public dataSourceSettings: IDataOptions;
  
  ngOnInit(): void {
    this.dataSourceSettings = {
      dataSource: data,
      // ... other settings
    };
  }
}
```

**Result**: Only Sum, Avg, Count, and Max appear in the aggregation dropdown. All other types are hidden.

### Hide Aggregation Type in Button Text

Display only field name (e.g., "Amount") instead of "Sum of Amount" using `showAggregationOnValueField`:

```typescript
dataSourceSettings: IDataOptions = {
  rows: [{ name: 'Category' }],
  columns: [{ name: 'Region' }],
  values: [{ name: 'Amount', type: 'Sum' }],
  showAggregationOnValueField: false  // Hide aggregation type in button text
};
```

**Result**: Value field button shows "Amount" instead of "Sum of Amount".

### Hide Aggregation Type Icon

Remove the aggregation dropdown icon from the grouping bar using `groupingBarSettings`:

```typescript
@Component({
  template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings
    [groupingBarSettings]='groupingBarOptions'></ejs-pivotview>`
})
export class PivotGridComponent implements OnInit {
  public groupingBarOptions: GroupingBarSettings = {
    showValueTypeIcon: false  // Hide aggregation type dropdown icon
  };
  
  ngOnInit(): void {
    // dataSourceSettings setup...
  }
}
```

**Note**: The aggregation icon can only be hidden in the Grouping Bar, not in the Field List.

---

## Events

### aggregateCellInfo Event

Triggered when a value cell is rendered. Allows overriding cell values or skipping formatting:

```typescript
aggregateCellInfo(args: AggregateCellInfoEventArgs) {
  // args.fieldName - Current cell's field name
  // args.value - Current cell's value
  // args.aggregateType - Type of aggregation (Sum, Avg, etc.)
  
  if (args.fieldName === 'Amount' && args.value < 1000) {
    args.value = 0;  // Override small values
  }
  
  // Skip formatting if needed
  args.skipFormatting = false;
}
```

### actionBegin Event

Triggered when aggregation type is selected via dropdown:

```typescript
actionBegin(args: PivotActionBeginEventArgs) {
  if (args.actionName === 'Aggregate field') {
    console.log('Aggregation type changed:', args.fieldInfo);
    
    // Prevent aggregation change if needed
    if (args.fieldInfo.name === 'CriticalField') {
      args.cancel = true;
    }
  }
}
```

### actionComplete Event

Triggered after aggregation change completes:

```typescript
actionComplete(args: PivotActionCompleteEventArgs) {
  if (args.actionName === 'Field aggregated') {
    console.log('Aggregation successfully changed');
    // Update UI or perform additional actions
  }
}
```

---

## Common Patterns

### Financial Analysis

```typescript
values: [
  { name: 'Revenue', type: 'Sum' },      // Total revenue
  { name: 'Profit', type: 'Sum' },       // Total profit
  { name: 'Cost', type: 'Sum' }          // Total cost
]
```

**At Runtime**: Users can change aggregation type (Sum → Avg → Max) using the dropdown in the UI.

### Performance Metrics

```typescript
values: [
  { name: 'Score', type: 'Avg' },       // Average score
  { name: 'Attempts', type: 'Count' },  // Count of attempts
  { name: 'MaxScore', type: 'Max' }     // Maximum score achieved
]
```

### Percentage Analysis

Show percentage breakdowns of sales data:

```typescript
values: [
  { name: 'Amount', type: 'Sum' }  // Base amount field
]
```

**At Runtime**: User changes aggregation dropdown to `PercentageOfGrandTotal`, `PercentageOfRowTotal`, or `PercentageOfColumnTotal` to view percentages.

### Statistical Analysis

Analyze distribution and variability:

```typescript
values: [
  { name: 'Value', type: 'Avg' },              // Average value
  { name: 'Variance', type: 'PopulationVar' }  // Population variance
]
```

**Alternative Using Calculated Fields**:
```typescript
calculatedFieldSettings: [
  {
    name: 'StdDevPercent',
    formula: '("Sum(StdDev)" / "Sum(Value)") * 100'
  }
],
values: [
  { name: 'Value', type: 'Avg' },
  { name: 'StdDevPercent', type: 'CalculatedField' }
]
```

### Difference-Based Analysis

Compare values across groups:

```typescript
values: [
  { name: 'Amount', type: 'Sum' }  // Current amount
]
```

**At Runtime**: User can change aggregation to `DifferenceFrom` and select a base field and item to compare values.

**Programmatically**:
```typescript
values: [
  {
    name: 'Amount',
    type: 'DifferenceFrom',
    baseField: 'Year',
    baseItem: '2022'
  }
]
```

---

## Troubleshooting

**Issue**: Aggregation type not available for field
- **Solution**: Ensure field data type is numeric. Non-numeric fields only support Count and DistinctCount.

**Issue**: DifferenceFrom/PercentageOfDifferenceFrom showing unexpected results
- **Solution**: Verify `baseField` and `baseItem` are correctly configured to reference existing data.

**Issue**: Aggregation dropdown not showing
- **Solution**: Check if `showValueTypeIcon: false` is set in groupingBarSettings. Re-enable to see dropdown.

**Issue**: `PercentageOfRunningTotals` not working in server mode
- **Solution**: `PercentageOfRunningTotals` is **client-side engine only**. Switch the PivotView to client-side processing (`mode: 'Client'` or by removing the server `url`) or fall back to a calculated field that mirrors the cumulative share.

**Issue**: `formatSettings` for a `PercentageOfRunningTotals` field is not being applied
- **Solution**: This is expected. `PercentageOfRunningTotals` always renders with the built-in `P2` format (percentage with 2 decimal places) — the same behavior as the other advanced percentage aggregations. Any `format` you set in `formatSettings` for that field is ignored, and the value will always display as `P2`.

**Issue**: `PercentageOfParentColumnTotal` / `PercentageOfParentRowTotal` values don't sum to 100% within a parent
- **Solution**: Make sure the relevant axis (rows for `ParentRowTotal`, columns for `ParentColumnTotal`) actually has a multi-level hierarchy. With a single-level axis, every cell is its own parent and the percentage will always be 100%.
