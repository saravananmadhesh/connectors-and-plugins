# Classic Layout Customization in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Enabling Tabular Layout](#enabling-tabular-layout)
3. [Layout Characteristics](#layout-characteristics)
4. [Configuration Options](#configuration-options)
5. [Common Patterns](#common-patterns)
6. [Limitations](#limitations)
7. [Troubleshooting](#troubleshooting)

## Overview

The classic layout (Tabular) in Pivot View provides a structured, tabular presentation of data that enhances readability and usability. This layout displays all row axis fields in separate columns, making data interpretation and analysis easier compared to the compact hierarchical layout.

**Key Features:**
- Row fields displayed side by side in separate columns
- Grand totals appear at the end of all rows
- Subtotals placed in separate rows beneath each group
- Compatible only with relational data sources
- Works with both client-side and server-side engines
- All pivot features (filtering, sorting, drag-drop, expand/collapse) remain functional

**Important:** Classic layout is compatible only with relational data sources. OLAP data sources are not supported.

## Enabling Tabular Layout

To enable the classic (tabular) layout, set the `layout` property in `gridSettings` to **'Tabular'**:

```typescript
import { PivotView, IDataSet, GroupingBar, FieldList } from '@syncfusion/ej2-pivotview';
import { Browser, enableRipple } from '@syncfusion/ej2-base';
import { pivotData } from './datasource';

enableRipple(false);
PivotView.Inject(GroupingBar, FieldList);

let pivotObj: PivotView = new PivotView({
    dataSourceSettings: {
        enableSorting: true,
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        rows: [
            { name: 'Product_Categories', caption: 'Product Categories' },
            { name: 'Products' },
            { name: 'Order_Source', caption: 'Order Source' }
        ],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        drilledMembers: [
            { name: 'Product_Categories', items: ['Accessories', 'Bikes'] },
            { name: 'Products', delimiter: '##', items: ['Accessories##Helmets'] }
        ],
        filterSettings: [
            {
                name: 'Products',
                type: 'Exclude',
                items: ['Cleaners', 'Fenders']
            }
        ],
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        filters: []
    },
    width: '100%',
    height: 450,
    showFieldList: true,
    gridSettings: {
        columnWidth: Browser.isDevice ? 100 : 120,
        layout: 'Tabular'
    }
});
pivotObj.appendTo('#PivotTable');
```

## Layout Characteristics

### Classic (Tabular) Layout Features

| Feature | Description |
|---------|-------------|
| **Row Field Display** | All row hierarchy fields shown in separate columns |
| **Grand Totals** | Appear at the end of all rows |
| **Subtotals** | Positioned in separate row beneath each group |
| **Data Source** | Relational data only (not OLAP) |
| **Engine Support** | Both client-side and server-side engines |
| **Hierarchy Representation** | Flat columnar structure instead of nested |
| **Space Efficiency** | Can be more horizontal but less nested depth |

### Layout Switch Example

The default layout is Compact (Hierarchical). To switch to Tabular:

```typescript
let pivotObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Region' }, { name: 'City' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sales' }]
    },
    gridSettings: {
        layout: 'Tabular'  // Use 'Tabular' for classic layout
    },
    height: 400
});
pivotObj.appendTo('#PivotTable');
```

## Configuration Options

### Basic Configuration with Multiple Row Fields

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        // Multiple row fields - used effectively with Tabular layout
        rows: [
            { name: 'Country', caption: 'Country' },
            { name: 'Region', caption: 'Region' },
            { name: 'City', caption: 'City' }
        ],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sales', caption: 'Total Sales' }],
        filters: []
    },
    gridSettings: {
        layout: 'Tabular',
        columnWidth: 120,
        rowHeight: 40
    },
    height: 450,
    width: '100%'
});
pivotTableObj.appendTo('#PivotTable');
```

### Configuration with Filtering and Sorting

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Product_Categories' }, { name: 'Products' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        enableSorting: true,
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filterSettings: [
            { name: 'Products', type: 'Exclude', items: ['Cleaner', 'Fender'] }
        ]
    },
    gridSettings: {
        layout: 'Tabular'
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

## Common Patterns

### Pattern 1: Tabular Layout with Field List

Combine Tabular layout with field list for runtime field manipulation:

```typescript
import { PivotView, FieldList } from '@syncfusion/ej2-pivotview';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales' }]
    },
    showFieldList: true,
    gridSettings: {
        layout: 'Tabular'
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 2: Tabular Layout with Grouping Bar

Enable drag-and-drop grouping bar with Tabular layout:

```typescript
import { PivotView, GroupingBar } from '@syncfusion/ej2-pivotview';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Region' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sales' }, { name: 'Profit' }]
    },
    showGroupingBar: true,
    gridSettings: {
        layout: 'Tabular',
        columnWidth: 140
    },
    height: 450
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 3: Compact Row Display with Tabular Layout

Use Tabular layout with adjusted dimensions for compact display:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales' }],
        formatSettings: [{ name: 'Sales', format: 'C0' }]
    },
    gridSettings: {
        layout: 'Tabular',
        columnWidth: 110,
        rowHeight: 30,
        gridLines: 'Horizontal'
    },
    height: 350,
    width: 800
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 4: Tabular Layout with Export

Combine Tabular layout with export functionality:

```typescript
import { PivotView, Toolbar, ExcelExport, PDFExport } from '@syncfusion/ej2-pivotview';

PivotView.Inject(Toolbar, ExcelExport, PDFExport);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Region' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales' }]
    },
    toolbar: ['Grid', 'Export'],
    allowExcelExport: true,
    allowPdfExport: true,
    gridSettings: {
        layout: 'Tabular'
    },
    showToolbar: true,
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

## Limitations

The following features are NOT supported in Tabular (classic) layout:

**Subtotal Positioning:**
- Subtotals at the "Top" position are not supported for row subtotals
- Use "Bottom" or "Auto" position with Tabular layout
- Workaround: Customize subtotal positions via `showSubTotals` property

**Data Source Compatibility:**
- OLAP data sources cannot use Tabular layout
- Only relational data sources support classic layout
- Server-side engine fully supports Tabular layout

**Other Limitations:**
- All standard pivot table features work normally
- Only subtotal top positioning is limited
- No functionality loss except for top subtotals

## Troubleshooting

### Layout Doesn't Change to Tabular

**Issue:** Setting `layout: 'Tabular'` has no effect.

**Solutions:**
1. Verify property name and value spelling (case-sensitive):
   ```typescript
   gridSettings: {
       layout: 'Tabular'  // Correct
   }
   ```

2. Ensure using relational (not OLAP) data source:
   ```typescript
   // This works
   dataSourceSettings: {
       dataSource: pivotData as IDataSet[]
   }
   
   // This won't work with Tabular layout
   // dataSourceSettings: { cube: 'Sales', url: 'http://...' }
   ```

3. Configure multiple row fields for visible difference:
   - Single row field types may not show obvious differences
   - Use at least 2 row hierarchy fields

4. Refresh UI after configuration change:
   ```typescript
   pivotTableObj.refresh();
   ```

### Row Fields Don't Display in Separate Columns

**Issue:** Row hierarchy not shown as separate columns in Tabular layout.

**Solutions:**
1. Add multiple row hierarchy fields:
   ```typescript
   rows: [
       { name: 'Country' },
       { name: 'Region' },
       { name: 'City' }
   ]
   ```

2. Adjust column widths for visibility:
   ```typescript
   gridSettings: {
       layout: 'Tabular',
       columnWidth: 150  // Wider columns for headers
   }
   ```

3. Disable auto-resizing if needed:
   ```typescript
   gridSettings: {
       layout: 'Tabular',
       allowAutoResizing: false,
       columnWidth: 120
   }
   ```

### Subtotals Not Appearing in Correct Position

**Issue:** Subtotals appear at unexpected positions.

**Solutions:**
1. Check subtotal position setting:
   ```typescript
   dataSourceSettings: {
       showSubTotals: {
           row: true,
           column: true  // or set specific positions
       }
   }
   ```

2. Use `summaryType` if customizing summary behavior:
   - Verify compatible with Tabular layout
   - "Top" position not supported; use "Bottom"

3. Verify grand totals are visible:
   ```typescript
   dataSourceSettings: {
       showGrandTotals: true,  // Row and column grand totals
   }
   ```

### Performance Issues with Tabular Layout

**Issue:** Tabular layout with many row fields performs slowly.

**Solutions:**
1. Limit the number of row hierarchy levels:
   - Too many levels increase complexity
   - Consider grouping or filtering data

2. Enable virtual scrolling:
   ```typescript
   // Use virtual scrolling for large datasets
   enableVirtualization: true
   ```

3. Adjust row height for faster rendering:
   ```typescript
   gridSettings: {
       rowHeight: 30,  // Smaller height renders faster
       layout: 'Tabular'
   }
   ```

4. Use paging for very large datasets:
   - Limitations with Tabular layout may apply
   - Consider server-side engine for optimal performance

