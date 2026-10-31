# Summary Customization in Pivot View

## Overview

Summary customization allows you to control how grand totals, sub-totals, and aggregate values are displayed in your pivot table. You can show or hide totals globally or for specific fields, control their positioning, and customize how summary information appears to meet your specific reporting needs.

## When to Use

Use summary customization when you need to:
- Hide unnecessary totals to reduce visual clutter
- Show totals only for specific dimensions
- Position totals at the top or bottom of sections
- Create cleaner report layouts
- Comply with specific reporting requirements
- Improve performance by reducing calculated grand totals (especially for large datasets)
- Create focused dashboards without aggregated totals

## Showing or Hiding Grand Totals

Grand totals display the aggregate of all data in rows and columns.

### Hide All Grand Totals

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(FieldList);

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
        filters: [],
        showGrandTotals: false  // Hide all grand totals
    },
    showFieldList: true,
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Hide Row or Column Grand Totals Separately

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: [],
        showRowGrandTotals: false,     // Hide row grand totals only
        showColumnGrandTotals: true,   // Keep column grand totals
        showGrandTotals: true
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Showing or Hiding Sub-Totals

Sub-totals display intermediate aggregates for each dimension level.

### Hide All Sub-Totals

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        allowLabelFilter: true,
        allowValueFilter: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: [],
        showSubTotals: false  // Hide all sub-totals
    },
    showFieldList: true,
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Hide Sub-Totals for Specific Fields

Hide sub-totals for individual row or column fields:

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [
            { name: 'Year', caption: 'Production Year', showSubTotals: false },  // No subtotal
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [
            { name: 'Country', showSubTotals: false },  // No subtotal
            { name: 'Products' }  // Shows subtotal
        ],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showFieldList: true,
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Hide Row or Column Sub-Totals Separately

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: [],
        showRowSubTotals: false,       // Hide row sub-totals
        showColumnSubTotals: true,     // Keep column sub-totals
        showSubTotals: true
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Positioning Sub-Totals

Control whether sub-totals appear at the top or bottom of each grouped section.

### Sub-Totals at Top

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [
            { name: 'Country', items: ['France'] },
            { name: 'Year', items: ['FY 2015'] }
        ],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        subTotalsPosition: 'Top'  // Position sub-totals at top
    },
    showFieldList: true,
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Sub-Totals at Bottom

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [
            { name: 'Country', items: ['France'] },
            { name: 'Year', items: ['FY 2015'] }
        ],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        subTotalsPosition: 'Bottom'  // Position sub-totals at bottom
    },
    showFieldList: true,
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Sub-Totals at Auto Position (Default)

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        // ... other settings ...,
        subTotalsPosition: 'Auto'  // Column subtotals at bottom, row subtotals at top
    }
});
```

## Controlling Totals via Toolbar

Use the built-in toolbar to allow users to dynamically show/hide and reposition totals:

```typescript
import { PivotView, Toolbar, IDataSet } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { pivotData } from './datasource.ts';

PivotView.Inject(Toolbar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData,
        expandAll: false,
        enableSorting: true,
        drilledMembers: [
            { name: 'Country', items: ['France', 'Germany'] }
        ],
        columns: [{ name: 'Year' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        values: [
            { name: 'Amount', caption: 'Sold Amount' },
            { name: 'Sold', caption: 'Units Sold' }
        ],
        filters: []
    },
    showToolbar: true,
    toolbar: ['GrandTotal', 'SubTotal'],  // Add total controls to toolbar
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

**Toolbar Options Include:**
- **Show/Hide Grand Totals** - Toggle all grand totals on/off
- **Grand Totals Position** - Move grand totals to top or bottom
- **Show/Hide Sub Totals** - Toggle all sub-totals on/off
- **Sub Totals Position** - Move sub-totals to top or bottom

## Advanced Example: Complex Summary Configuration

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        columns: [
            { name: 'Year', caption: 'Production Year', showSubTotals: true },
            { name: 'Quarter', showSubTotals: false }  // No subtotal for Quarter
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [
            { name: 'Country', showSubTotals: true },
            { name: 'Products', showSubTotals: false }  // No subtotal for Products
        ],
        filters: [],
        
        // Configure different totals
        showGrandTotals: true,           // Show both row and column grand totals
        showRowGrandTotals: true,
        showColumnGrandTotals: true,
        
        showSubTotals: true,             // Show sub-totals for configured fields
        showRowSubTotals: true,
        showColumnSubTotals: true,
        
        subTotalsPosition: 'Auto'        // Use default positioning
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Programmatic Total Management

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

// Toggle all grand totals
function toggleGrandTotals(show: boolean) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.showGrandTotals = show;
    pivotTableObj.dataSourceSettings = settings;
}

// Toggle all sub-totals
function toggleSubTotals(show: boolean) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.showSubTotals = show;
    pivotTableObj.dataSourceSettings = settings;
}

// Toggle grand totals for rows only
function toggleRowGrandTotals(show: boolean) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.showRowGrandTotals = show;
    pivotTableObj.dataSourceSettings = settings;
}

// Toggle grand totals for columns only
function toggleColumnGrandTotals(show: boolean) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.showColumnGrandTotals = show;
    pivotTableObj.dataSourceSettings = settings;
}

// Change sub-totals position
function changeSubTotalsPosition(position: 'Top' | 'Bottom' | 'Auto') {
    const settings = pivotTableObj.dataSourceSettings;
    settings.subTotalsPosition = position;
    pivotTableObj.dataSourceSettings = settings;
}

// Hide subtotal for specific field
function hideSubtotalForField(fieldName: string, axis: 'rows' | 'columns') {
    const settings = pivotTableObj.dataSourceSettings;
    const fields = axis === 'rows' ? settings.rows : settings.columns;
    
    const field = fields.find(f => f.name === fieldName);
    if (field) {
        field.showSubTotals = false;
    }
    
    pivotTableObj.dataSourceSettings = settings;
}
```

## Common Patterns

### Pattern 1: Minimal Summary (Clean Report)

Show only grand totals, no sub-totals for a clean view:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        values: [{ name: 'Sold' }],
        filters: [],
        
        showGrandTotals: true,   // Show only grand totals
        showSubTotals: false,    // Hide all sub-totals
    },
    height: 350
});
```

### Pattern 2: Detailed Summary (Full View)

Show both grand totals and sub-totals for detailed analysis:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        values: [{ name: 'Sold' }],
        filters: [],
        
        showGrandTotals: true,      // Show grand totals
        showSubTotals: true,        // Show all sub-totals
        subTotalsPosition: 'Bottom' // Subtotals at bottom
    },
    height: 350
});
```

### Pattern 3: User-Controlled Summary

Allow users to control totals through toolbar:

```typescript
import { PivotView, Toolbar } from '@syncfusion/ej2-pivotview';

PivotView.Inject(Toolbar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        rows: [{ name: 'Country' }],
        values: [{ name: 'Sold' }],
        filters: [],
        showGrandTotals: true,
        showSubTotals: true
    },
    showToolbar: true,
    toolbar: ['GrandTotal', 'SubTotal'],  // Let users control totals
    height: 350
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showGrandTotals` | boolean | true | Shows/hides all grand totals |
| `showRowGrandTotals` | boolean | true | Shows/hides row grand totals |
| `showColumnGrandTotals` | boolean | true | Shows/hides column grand totals |
| `showSubTotals` | boolean | true | Shows/hides all sub-totals |
| `showRowSubTotals` | boolean | true | Shows/hides row sub-totals |
| `showColumnSubTotals` | boolean | true | Shows/hides column sub-totals |
| `subTotalsPosition` | string | 'Auto' | Position of sub-totals: 'Top', 'Bottom', or 'Auto' |

### Field Level Property

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showSubTotals` | boolean | true | Shows/hides sub-totals for specific field |

## Troubleshooting

### Grand Totals Not Showing

**Problem:** Grand totals are hidden
- Check that `showGrandTotals` is set to `true`
- Verify `showRowGrandTotals` and `showColumnGrandTotals` are not both false
- Ensure data aggregation is working correctly

### Sub-Totals Disappearing

**Problem:** Sub-totals don't appear after changes
- Verify `showSubTotals` is set to `true`
- Check individual field `showSubTotals` settings
- Confirm field has hierarchical data to show subtotals

### Performance Issues with Large Datasets

**Problem:** Pivot table is slow when totals are enabled
- Consider hiding sub-totals for performance: `showSubTotals: false`
- Reduce number of fields with sub-totals
- Enable paging or virtual scrolling (see performance optimization guide)

## Best Practices

1. **Use toolbar for user control** - Allow users to toggle totals through toolbar
2. **Disable unnecessary totals** - Hide subtotals for flat datasets
3. **Be consistent** - Use same positioning (Top/Bottom) across all fields
4. **Test performance** - Monitor impact of totals on large datasets
5. **Consider space** - Totals add rows/columns; ensure adequate display area
6. **Provide documentation** - Explain what grand totals and sub-totals represent
7. **Mobile optimization** - Consider hiding some totals on mobile devices


