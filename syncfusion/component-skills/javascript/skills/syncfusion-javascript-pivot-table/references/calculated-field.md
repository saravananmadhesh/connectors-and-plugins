# Calculated Fields in Pivot View

## Overview

Calculated fields allow users to create custom value fields using mathematical formulas based on existing fields from the data source. This feature enables complex calculations with basic arithmetic operators, providing enhanced data visualization and reporting capabilities.

**Key Features:**
- Create custom fields with mathematical formulas
- Use existing fields in formulas with arithmetic operators (+, -, *, /)
- Interactive dialog for formula creation
- Programmatic field definition
- Edit and update existing calculated fields at runtime
- Apply number formatting to calculated results

## Enabling Calculated Fields

To use calculated fields, enable the feature by setting `allowCalculatedField` to `true` and inject the `CalculatedField` module:

```typescript
import { PivotView, IDataSet, CalculatedField, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(FieldList, CalculatedField);

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
        rows: [{ name: 'Country' }, { name: 'Products' }]
    },
    showFieldList: true,
    allowCalculatedField: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

Once enabled, a "CALCULATED FIELD" button appears in the Field List UI.

## Defining Calculated Fields Programmatically

Create calculated fields using the `calculatedFieldSettings` property with these key properties:
- `name`: Unique name for the calculated field
- `formula`: Mathematical expression using field names and operators

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' },
            { name: 'Total', caption: 'Total Amount', type: 'CalculatedField' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [
            { name: 'Amount', format: 'C0' },
            { name: 'Total', format: 'C2' }
        ],
        calculatedFieldSettings: [
            { name: 'Total', formula: '"Sum(Amount)"+"Sum(Sold)"' }
        ]
    },
    allowCalculatedField: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Important:** To display a calculated field in the pivot table, add it to the `values` array with `type: 'CalculatedField'`.

## Formula Syntax

### Basic Operators

| Operator | Description | Example |
|----------|-------------|---------|
| + | Addition | `"Sum(Field1)"+"Sum(Field2)"` |
| - | Subtraction | `"Sum(Revenue)"-"Sum(Cost)"` |
| * | Multiplication | `"Sum(Quantity)"*"Sum(Price)"` |
| / | Division | `"Sum(Total)"/"Count(Orders)"` |

### Aggregation Functions

Use aggregation functions with field names enclosed in quotes:
- `"Sum(FieldName)"` - Sum of values
- `"Count(FieldName)"` - Count of records
- `"Avg(FieldName)"` - Average value
- `"Min(FieldName)"` - Minimum value
- `"Max(FieldName)"` - Maximum value

### Formula Examples

```typescript
// Profit calculation
{ name: 'Profit', formula: '"Sum(Revenue)"-"Sum(Cost)"' }

// Profit margin percentage
{ name: 'ProfitMargin', formula: '("Sum(Revenue)"-"Sum(Cost)")/"Sum(Revenue)"*100' }

// Average unit price
{ name: 'AvgPrice', formula: '"Sum(Amount)"/"Sum(Quantity)"' }

// Growth rate
{ name: 'Growth', formula: '("Sum(CurrentYear)"-"Sum(PreviousYear)")/"Sum(PreviousYear)"*100' }
```

## Opening Calculated Field Dialog Programmatically

Display the calculated field dialog by calling the `createCalculatedFieldDialog` method:

```typescript
import { PivotView, IDataSet, CalculatedField } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { pivotData } from './datasource';

PivotView.Inject(CalculatedField);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }],
        calculatedFieldSettings: [
            { name: 'Total', formula: '"Sum(Amount)"+"Sum(Sold)"' }
        ]
    },
    allowCalculatedField: true,
    height: 320
});
pivotTableObj.appendTo('#PivotTable');

let btn: Button = new Button({ isPrimary: true });
btn.appendTo('#CalculatedField');

document.getElementById('CalculatedField').addEventListener('click', () => {
    pivotTableObj.calculatedFieldModule.createCalculatedFieldDialog();
});
```

## Editing Calculated Fields

### Through Field List

1. Locate the calculated field in the field list or grouping bar
2. Click the **Edit** icon next to the field name
3. Modify the field name, formula, or format
4. Click **OK** to save changes

### Renaming Calculated Fields

1. Click the **Edit** icon on the calculated field
2. Change the name in the text box at the top of the dialog
3. Click **OK** to save the new name

### Updating Formulas

1. Open the calculated field dialog
2. Select the field to edit from the list
3. Click the **Edit** icon
4. Modify the formula in the multiline text box
5. Click **OK** to apply changes

## Number Formatting

Apply number formatting to calculated fields using the `formatSettings` property:

```typescript
formatSettings: [
    { name: 'Total', format: 'C2' },        // Currency with 2 decimals
    { name: 'Percentage', format: 'P1' },   // Percentage with 1 decimal
    { name: 'Decimal', format: 'N3' }       // Number with 3 decimals
]
```

## Common Patterns

### Pattern 1: Profit Analysis

```typescript
calculatedFieldSettings: [
    {
        name: 'Profit',
        formula: '"Sum(Revenue)"-"Sum(Cost)"'
    },
    {
        name: 'ProfitMargin',
        formula: '("Sum(Revenue)"-"Sum(Cost)")/"Sum(Revenue)"*100'
    }
],
formatSettings: [
    { name: 'Profit', format: 'C0' },
    { name: 'ProfitMargin', format: 'N2' }
]
```

### Pattern 2: Performance Metrics

```typescript
calculatedFieldSettings: [
    {
        name: 'AvgOrderValue',
        formula: '"Sum(TotalSales)"/"Count(OrderID)"'
    },
    {
        name: 'ConversionRate',
        formula: '"Count(Orders)"/"Count(Visitors)"*100'
    }
],
formatSettings: [
    { name: 'AvgOrderValue', format: 'C2' },
    { name: 'ConversionRate', format: 'N2' }
]
```

### Pattern 3: Inventory Turnover

```typescript
calculatedFieldSettings: [
    {
        name: 'TurnoverRatio',
        formula: '"Sum(SoldUnits)"/"Avg(InventoryLevel)"'
    },
    {
        name: 'DaysInInventory',
        formula: '365/("Sum(SoldUnits)"/"Avg(InventoryLevel)")'
    }
]
```

## Troubleshooting

### Formula Not Calculating

**Issue:** Calculated field shows zero or incorrect values.

**Solution:**
- Verify field names are enclosed in quotes: `"Sum(FieldName)"`
- Check field names match data source exactly (case-sensitive)
- Ensure aggregation function is specified: `"Sum()"`, `"Count()"`, etc.
- Validate formula syntax (balanced parentheses, correct operators)

### Calculated Field Button Not Visible

**Issue:** "CALCULATED FIELD" button doesn't appear.

**Solution:**
- Set `allowCalculatedField: true`
- Inject CalculatedField module: `PivotView.Inject(CalculatedField)`
- Enable field list: `showFieldList: true`
- Inject FieldList module: `PivotView.Inject(FieldList)`

### Division by Zero Error

**Issue:** Formula with division produces errors or NaN.

**Solution:**
- Add conditional logic to handle zero divisors
- Check data source for zero values in denominator field
- Use Count aggregation to ensure non-zero divisor
- Apply filters to exclude zero values

### Calculated Field Not Displaying in Pivot Table

**Issue:** Field appears in field list but not in pivot table.

**Solution:**
- Add calculated field to `values` array:
  ```typescript
  values: [
      { name: 'Total', caption: 'Total Amount', type: 'CalculatedField' }
  ]
  ```
- Ensure `type: 'CalculatedField'` is specified
- Verify field name matches calculatedFieldSettings name

### Format Not Applied

**Issue:** Number format doesn't apply to calculated field.

**Solution:**
- Add format setting with exact field name:
  ```typescript
  formatSettings: [{ name: 'CalculatedFieldName', format: 'C2' }]
  ```
- Check field name spelling (case-sensitive)
- Use appropriate format codes (C for currency, N for number, P for percentage)
