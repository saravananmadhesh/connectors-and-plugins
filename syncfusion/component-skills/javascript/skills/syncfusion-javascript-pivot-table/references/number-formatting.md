# Number Formatting in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Format Types and Codes](#format-types-and-codes)
3. [Configuring Format Settings](#configuring-format-settings)
4. [Currency Formatting](#currency-formatting)
5. [Custom Format Patterns](#custom-format-patterns)
6. [Runtime Number Formatting](#runtime-number-formatting)
7. [Grouping and Precision](#grouping-and-precision)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

## Overview

The Pivot View component provides comprehensive number formatting capabilities to display numeric values in various formats (number, currency, percentage, custom patterns). Formatting enhances data readability and ensures values are displayed consistently according to business requirements.

**Key Features:**
- Multiple format types: Number, Currency, Percentage, Custom
- Standard format codes (N, C, P) for quick formatting
- Custom format patterns with specifiers (0, #, %, $, etc.)
- Grouping separators control
- Currency code specification (USD, EUR, GBP)
- Precision decimal places configuration
- Runtime formatting via toolbar dialog
- Format settings management in dataSourceSettings

## Format Types and Codes

### Supported Format Types

| Type | Code | Description | Output Example |
|------|------|-------------|-----------------|
| Number | N | Standard numeric with optional grouping | 1,234.56 |
| Currency | C | Currency with symbol and grouping | $1,234.56 |
| Percentage | P | Value as percentage with % symbol | 12.34% |
| Custom | Pattern | User-defined using format specifiers | 0123.45 |

### Standard Format Code Examples

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        formatSettings: [
            { name: 'Amount', format: 'C0' },    // Currency with 0 decimals: $1000
            { name: 'Sold', format: 'N2' },      // Number with 2 decimals: 1,000.00
            { name: 'Percent', format: 'P1' }    // Percentage with 1 decimal: 12.3%
        ],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    gridSettings: { columnWidth: 140 },
    height: 450
});
pivotTableObj.appendTo('#PivotTable');
```

## Configuring Format Settings

### Basic Number Formatting

Apply number format to value fields using `formatSettings` in `dataSourceSettings`:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        formatSettings: [
            { name: 'Amount', format: 'C2' }  // Currency with 2 decimals
        ],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    gridSettings: { columnWidth: 140 },
    height: 450
});
pivotTableObj.appendTo('#PivotTable');
```

### Format Settings Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `name` | string | Field name to format | 'Amount' |
| `format` | string | Format pattern/code | 'C2', 'N2', 'P1', or custom |
| `useGrouping` | boolean | Display grouping separators | true (default), false |
| `currency` | string | Currency code for C format | 'USD', 'EUR', 'GBP' |

## Currency Formatting

### Basic Currency Formatting

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        formatSettings: [
            { name: 'Amount', format: 'C2', useGrouping: true, currency: 'EUR' }
        ],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    gridSettings: { columnWidth: 140 },
    height: 450
});
pivotTableObj.appendTo('#PivotTable');
```

### Currency Codes

```typescript
formatSettings: [
    { name: 'Amount', format: 'C0', currency: 'USD' },    // $1000
    { name: 'Amount', format: 'C0', currency: 'EUR' },    // €1000
    { name: 'Amount', format: 'C0', currency: 'GBP' },    // £1000
    { name: 'Amount', format: 'C0', currency: 'JPY' }     // ¥1000
]
```

### Currency with Grouping Control

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        formatSettings: [
            // With grouping: $100,000,000
            { name: 'Amount', format: 'C0', useGrouping: true, currency: 'USD' },
            // Without grouping: $100000000
            { name: 'Revenue', format: 'C0', useGrouping: false, currency: 'USD' }
        ],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Amount' }, { name: 'Revenue' }],
        rows: [{ name: 'Country' }],
        filters: []
    },
    gridSettings: { columnWidth: 150 },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Custom Format Patterns

Custom format patterns use specifiers to control display:

| Specifier | Description | Effect |
|-----------|-------------|--------|
| `0` | Replaces with digit or 0 if absent | 0123, 0045 |
| `#` | Replaces with digit or nothing if absent | 123, 45 |
| `.` | Decimal point position | 0.00 → 123.45 |
| `%` | Percentage format | 12% |
| `$` | Currency symbol | $123 |
| `;` | Separate formats for positive, negative, zero | ###.##;(###.00);-0 |
| `'text'` | Literal text in format | ####.00 '@' → 123.45 @ |

### Custom Format Examples

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        formatSettings: [
            // Units sold with custom suffix
            { name: 'Sold', format: "####.00 'Nos'" },
            
            // Placeholder zeros
            { name: 'Count', format: '0000' },
            
            // Percentage with 2 decimals
            { name: 'Percentage', format: '0.00%' },
            
            // Currency with custom format
            { name: 'Amount', format: '$ ###.00' },
            
            // Negative amount in parentheses
            { name: 'Expense', format: '###.##;(###.00);-0' }
        ],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }, { name: 'Percentage' }],
        rows: [{ name: 'Country' }],
        filters: []
    },
    gridSettings: { columnWidth: 140 },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Format with Literal Text

```typescript
formatSettings: [
    { name: 'Sold', format: "####.00 'Units'" },     // 1234.56 Units
    { name: 'Amount', format: "'$' ###,##0.00" },    // $ 1,234.56
    { name: 'Growth', format: "0.00 '%'" }           // 12.50 %
]
```

### Format with Conditional Sections

```typescript
// Format: positive;negative;zero
formatSettings: [
    { 
        name: 'Variance', 
        format: '###.##;(###.00);-0'  // Positive: 123.45, Negative: (123.45), Zero: -0
    }
]
```

## Runtime Number Formatting

### Enable Number Formatting Toolbar

Allow users to apply number formats at runtime via toolbar dialog:

```typescript
import { PivotView, IDataSet, Toolbar, NumberFormatting } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(Toolbar, NumberFormatting);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        formatSettings: [{ name: 'Amount', format: 'C2', useGrouping: false, currency: 'EUR' }],
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 450,
    toolbar: ['Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'NumberFormatting', 'FieldList'],
    allowExcelExport: true,
    allowNumberFormatting: true,
    allowConditionalFormatting: true,
    allowPdfExport: true,
    showToolbar: true
});
pivotTableObj.appendTo('#PivotTable');
```

**Note:** To use number formatting toolbar, inject `NumberFormatting` module.

## Grouping and Precision

### Decimal Place Control

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        formatSettings: [
            { name: 'Amount', format: 'C0' },       // No decimals: $1000
            { name: 'Average', format: 'N2' },      // 2 decimals: 1,234.56
            { name: 'Ratio', format: 'N4' }         // 4 decimals: 1,234.5678
        ],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Amount' }, { name: 'Average' }, { name: 'Ratio' }],
        rows: [{ name: 'Country' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Grouping Separators

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        formatSettings: [
            // With grouping: 1,000,000.00
            { name: 'Sales', format: 'N2', useGrouping: true },
            // Without grouping: 1000000.00
            { name: 'Unformatted', format: 'N2', useGrouping: false }
        ],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales' }, { name: 'Unformatted' }],
        rows: [{ name: 'Country' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Common Patterns

### Pattern 1: Multi-Currency Display

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        formatSettings: [
            { name: 'USSales', format: 'C0', currency: 'USD' },
            { name: 'EUSales', format: 'C0', currency: 'EUR' },
            { name: 'UKSales', format: 'C0', currency: 'GBP' }
        ],
        columns: [{ name: 'Year' }],
        values: [{ name: 'USSales' }, { name: 'EUSales' }, { name: 'UKSales' }],
        rows: [{ name: 'Country' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 2: Mixed Format Types

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        formatSettings: [
            { name: 'Revenue', format: 'C0', currency: 'USD' },
            { name: 'Profit', format: 'N2' },
            { name: 'Margin', format: 'P1' },
            { name: 'Units', format: "####.00 'Units'" }
        ],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Revenue' }, { name: 'Profit' }, { name: 'Margin' }, { name: 'Units' }],
        rows: [{ name: 'Category' }],
        filters: []
    },
    gridSettings: { columnWidth: 140 },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 3: Financial Reporting Format

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        formatSettings: [
            { name: 'TotalRevenue', format: 'C0', currency: 'USD' },
            { name: 'TotalExpense', format: '###.##;(###.00);-0', currency: 'USD' },  // Negatives in parentheses
            { name: 'NetIncome', format: 'C0', currency: 'USD' }
        ],
        columns: [{ name: 'Year' }],
        values: [{ name: 'TotalRevenue' }, { name: 'TotalExpense' }, { name: 'NetIncome' }],
        rows: [{ name: 'Department' }],
        filters: []
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

## Troubleshooting

### Format Not Applying

**Issue:** Number format doesn't appear in the pivot table.

**Solutions:**
1. Verify field name spelling in `formatSettings`:
   ```typescript
   formatSettings: [
       { name: 'Amount', format: 'C2' }  // Field name must match exactly
   ]
   ```

2. Check field exists in values:
   ```typescript
   values: [{ name: 'Amount' }],  // Field must be in values
   formatSettings: [{ name: 'Amount', format: 'C2' }]
   ```

3. Ensure format code is valid:
   ```typescript
   format: 'C2'  // Valid
   format: 'c2'  // Case-sensitive check
   ```

### Currency Symbol Not Displaying

**Issue:** Currency code specified but symbol not shown.

**Solutions:**
1. Verify currency code format:
   ```typescript
   currency: 'USD'  // 3-letter currency code
   ```

2. Use standard ISO 4217 codes (USD, EUR, GBP, JPY, CHF, etc.)

3. Check `format` is currency type:
   ```typescript
   format: 'C0',
   currency: 'EUR'  // Only works with C format
   ```

### Grouping Separators Not Working

**Issue:** `useGrouping` property has no effect.

**Solutions:**
1. Verify `useGrouping` property is set correctly:
   ```typescript
   formatSettings: [
       { name: 'Amount', format: 'C2', useGrouping: true }  // Explicit true
   ]
   ```

2. Customize format pattern includes grouping:
   ```typescript
   // These include natural grouping
   format: 'C2'    // Currency format
   format: 'N2'    // Number format
   ```

3. Use explicit separator in custom patterns:
   ```typescript
   format: '#,##0.00'  // Comma as grouping separator
   ```

