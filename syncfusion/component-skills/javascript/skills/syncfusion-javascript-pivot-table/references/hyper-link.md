# Hyperlinks in Pivot View

## Overview

Hyperlinks transform pivot table cells into interactive clickable elements, enabling navigation and data exploration. The Pivot View allows selective hyperlink display in row headers, column headers, value cells, and summary cells, with support for conditional linking and custom styling.

## When to Use

Use hyperlinks when you need to:
- Make cells clickable for navigation to details or reports
- Create interactive drill-through experiences
- Link to external resources or detail pages
- Enable conditional navigation based on cell values
- Add header-based navigation to specific data items
- Create dynamic report linking

## Basic Setup - Enable All Hyperlinks

Enable hyperlinks across all cell types:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    hyperlinkSettings: {
        showHyperlink: true,  // Show hyperlinks in all cells
        cssClass: 'e-custom-hyperlink'
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

**How It Works:**
- `showHyperlink: true` - Enables hyperlinks in all cell types
- `cssClass` - Applies custom CSS styling to hyperlinks

## Hyperlink Settings Overview

| Setting | Property | Description |
|---------|----------|-------------|
| **All Cells** | `showHyperlink` | Enable hyperlinks everywhere |
| **Row Headers** | `showRowHeaderHyperlink` | Hyperlinks in row header cells |
| **Column Headers** | `showColumnHeaderHyperlink` | Hyperlinks in column header cells |
| **Value Cells** | `showValueCellHyperlink` | Hyperlinks in data value cells |
| **Summary Cells** | `showSummaryCellHyperlink` | Hyperlinks in total/subtotal cells |

## Selective Hyperlink Configuration

### Row Header Hyperlinks Only

Enable hyperlinks only for row headers:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    hyperlinkSettings: {
        showRowHeaderHyperlink: true,  // Only row headers clickable
        cssClass: 'e-row-hyperlink'
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Column Header Hyperlinks Only

Enable hyperlinks only for column headers:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        showColumnHeaderHyperlink: true,
        cssClass: 'e-column-hyperlink'
    },
    height: 350
});
```

### Value Cell Hyperlinks Only

Enable hyperlinks only for data values:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        showValueCellHyperlink: true,
        cssClass: 'e-value-hyperlink'
    },
    height: 350
});
```

### Summary Cell Hyperlinks Only

Enable hyperlinks only for totals and subtotals:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        showSummaryCellHyperlink: true,
        cssClass: 'e-summary-hyperlink'
    },
    height: 350
});
```

## Conditional Hyperlinks Based on Values

Display hyperlinks only when specific conditions are met:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: [],
        drilledMembers: [{ name: 'Year', items: ['FY 2015'] }, { name: 'Country', items: ['France'] }]
    },
    hyperlinkSettings: {
        conditionalSettings: [
            {
                measure: 'Sold',           // Apply to 'Units Sold' field
                conditions: 'Between',     // Values between range
                value1: 150,
                value2: 200
            }
        ],
        cssClass: 'e-conditional-hyperlink'
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Conditional Operators

| Operator | Example | Meaning |
|----------|---------|---------|
| `Equals` | value1: 500 | Value equals exactly |
| `GreaterThan` | value1: 1000 | Value is greater than |
| `LessThan` | value1: 100 | Value is less than |
| `Between` | value1: 100, value2: 500 | Value falls in range |
| `GreaterThanOrEqualTo` | value1: 500 | Value is >= |
| `LessThanOrEqualTo` | value1: 1000 | Value is <= |
| `NotBetween` | value1: 100, value2: 500 | Value outside range |

## Header-Based Hyperlinks

Enable hyperlinks only for specific row or column headers:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: [],
        drilledMembers: [{ name: 'Year', items: ['FY 2015'] }, { name: 'Country', items: ['France'] }]
    },
    hyperlinkSettings: {
        headerText: 'FY 2015.Q1.Units Sold',  // Header path
        cssClass: 'e-header-hyperlink'
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

**Header Path Syntax:**
- Format: `Header1.Header2.Header3.Field`
- Separator: `.` (dot) - configurable via `headerDelimiter`
- Example: `France.FY 2015.Products.Units Sold`

## Custom CSS Styling for Hyperlinks

Apply custom styles to hyperlinks:

```html
<style>
    /* Basic hyperlink styling */
    .e-custom-hyperlink {
        color: #0066cc;
        text-decoration: underline;
        cursor: pointer;
    }
    
    .e-custom-hyperlink:hover {
        color: #0052a3;
        background-color: #e8f4f8;
        font-weight: bold;
    }
    
    /* Different colors for different cell types */
    .e-row-hyperlink {
        color: #28a745;
        font-weight: bold;
    }
    
    .e-value-hyperlink {
        color: #dc3545;
    }
    
    .e-summary-hyperlink {
        color: #ffc107;
        background-color: #fff3cd;
        padding: 2px 4px;
        border-radius: 3px;
    }
</style>
```

Apply in component:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        showHyperlink: true,
        cssClass: 'e-custom-hyperlink'
    },
    height: 350
});
```

## Handling Hyperlink Click Events

Execute code when users click hyperlinks:

```typescript
import { PivotView, CellClickEventArgs } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        showValueCellHyperlink: true,
        cssClass: 'e-value-hyperlink'
    },
    
    // Handle hyperlink click
    cellClick: (args: CellClickEventArgs) => {
        if (args.value && args.rowHeaders && args.columnHeaders) {
            console.log('Clicked cell value:', args.value);
            console.log('Row headers:', args.rowHeaders);
            console.log('Column headers:', args.columnHeaders);
            
            // Navigate to detail page
            const detailUrl = `/details?row=${args.rowHeaders}&column=${args.columnHeaders}&value=${args.value}`;
            window.location.href = detailUrl;
        }
    },
    
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Advanced Example: Multi-Conditional Hyperlinks

Create different hyperlinks based on multiple conditions:

```typescript
import { PivotView, IDataSet, CellClickEventArgs } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: [],
        drilledMembers: [{ name: 'Year', items: ['FY 2015'] }, { name: 'Country', items: ['France'] }]
    },
    hyperlinkSettings: {
        conditionalSettings: [
            {
                measure: 'Sold',
                conditions: 'LessThan',
                value1: 100,
                cssClass: 'e-low-sales'
            },
            {
                measure: 'Sold',
                conditions: 'Between',
                value1: 100,
                value2: 500,
                cssClass: 'e-medium-sales'
            },
            {
                measure: 'Sold',
                conditions: 'GreaterThan',
                value1: 500,
                cssClass: 'e-high-sales'
            }
        ]
    },
    
    cellClick: (args: CellClickEventArgs) => {
        const value = parseInt(args.value);
        let action = '';
        
        if (value < 100) {
            action = 'investigate';  // Low sales need investigation
        } else if (value < 500) {
            action = 'report';       // Medium sales - generate report
        } else {
            action = 'celebrate';    // High sales - celebrate!
        }
        
        console.log(`Action for value ${value}: ${action}`);
    },
    
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Common Patterns

### Pattern 1: Simple Value Cell Hyperlinks

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        showValueCellHyperlink: true,
        cssClass: 'e-value-hyperlink'
    }
});
```

### Pattern 2: Row and Column Headers Only

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        showRowHeaderHyperlink: true,
        showColumnHeaderHyperlink: true
    }
});
```

### Pattern 3: Conditional High-Value Links

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    hyperlinkSettings: {
        conditionalSettings: [{
            measure: 'Amount',
            conditions: 'GreaterThan',
            value1: 100000
        }]
    }
});
```

## API Reference

### HyperlinkSettings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHyperlink` | boolean | false | Enable hyperlinks in all cells |
| `showRowHeaderHyperlink` | boolean | false | Enable in row headers |
| `showColumnHeaderHyperlink` | boolean | false | Enable in column headers |
| `showValueCellHyperlink` | boolean | false | Enable in value cells |
| `showSummaryCellHyperlink` | boolean | false | Enable in summary cells |
| `headerText` | string | undefined | Show links for specific header |
| `conditionalSettings` | Array | undefined | Conditional hyperlink rules |
| `cssClass` | string | undefined | Custom CSS class |

### ConditionalSettings Properties

| Property | Type | Description |
|----------|------|-------------|
| `measure` | string | Value field name |
| `conditions` | string | Comparison operator |
| `value1` | number | Starting value |
| `value2` | number | Ending value (for range) |

## Troubleshooting

### Hyperlinks Not Appearing

**Problem:** Cells don't show hyperlinks
- Verify `showHyperlink` or specific property is `true`
- Check for CSS class existence
- Ensure module is properly injected
- Look for JavaScript errors in console

### Click Handler Not Firing

**Problem:** `cellClick` event doesn't trigger
- Verify hyperlinks are enabled first
- Check event handler syntax
- Ensure handler is attached BEFORE appendTo
- Verify cell is actually a hyperlink

### Conditional Hyperlinks Not Working

**Problem:** Conditions don't apply correctly
- Verify `measure` field name matches exactly
- Check condition syntax and operators
- Verify value1 and value2 are numbers
- Test with simpler condition first

## Best Practices

1. **Use meaningful CSS classes** - Make intent clear
2. **Provide visual feedback** - Hover states, underlines
3. **Handle navigation gracefully** - Provide feedback during navigation
4. **Test click handlers** - Ensure navigation logic works
5. **Document hyperlink behavior** - Users should understand what happens
6. **Use consistent styling** - Match application theme
7. **Consider mobile users** - Touch-friendly hyperlink areas
8. **Validate conditions carefully** - Test boundary values


