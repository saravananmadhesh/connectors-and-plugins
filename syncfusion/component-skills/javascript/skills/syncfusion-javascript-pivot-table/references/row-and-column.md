# Row and Column Features in Pivot View

## Overview

The Pivot View component provides comprehensive options for controlling row and column dimensions, layout, and display. These features ensure optimal data presentation and better user experience across different screen sizes and layouts.

**Key Features:**
- Width and height configuration
- Row height adjustment
- Column width control
- Classic layout mode
- Resizing capabilities
- Column rendering customization

## Width and Height Configuration

Set appropriate dimensions for the Pivot Table using the `height` and `width` properties:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

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
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    height: '340px',
    width: 550
});
pivotTableObj.appendTo('#PivotTable');
```

### Supported Dimension Formats

| Format | Example | Description |
|--------|---------|-------------|
| Pixel | `100`, `'100px'` | Exact dimensions in pixels |
| Percentage | `'100%'`, `'200%'` | Relative to parent container |
| Auto | `'auto'` | Height only - expands beyond parent |

**Important:** Pivot Table maintains a minimum width of **400px**.

## Row Height

Adjust row height for better data visibility using the `rowHeight` property within `gridSettings`:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    height: 350,
    gridSettings: {
        rowHeight: 60
    }
});
pivotTableObj.appendTo('#PivotTable');
```

**Defaults:**
- Desktop: 36 pixels
- Mobile: 48 pixels

**Note:** With grouping bar enabled, only column header height changes; other rows maintain specified height.

## Column Width

Control column width using the `columnWidth` property in `gridSettings`:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    height: 350,
    gridSettings: {
        columnWidth: 200
    }
});
pivotTableObj.appendTo('#PivotTable');
```

**Defaults:**
- Standard columns: 110 pixels
- First column with grouping bar: 250 pixels
- First column without grouping bar: 200 pixels

## Classic Layout

The classic layout mode changes how row headers are displayed, showing all headers in the first column with appropriate indentation for hierarchy.

### Enabling Classic Layout

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    gridSettings: {
        layout: 'Tabular'
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Layout Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| Tabular | Default and classic layout - all row headers in first column with indentation for hierarchy | Standard pivot table view with compact row representation |

## Column Resizing

Enable users to resize columns dynamically:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }]
    },
    gridSettings: {
        allowResizing: true,
        columnWidth: 120
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**User Interaction:** Drag column borders to resize.

## Grid Lines

Control visibility of grid lines:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        rows: [{ name: 'Country' }]
    },
    gridSettings: {
        gridLines: 'Both'    // 'None', 'Horizontal', 'Vertical', 'Both'
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Grid Line Options

| Option | Description |
|--------|-------------|
| Both | Show all grid lines (default) |
| None | Hide all grid lines |
| Horizontal | Show only horizontal lines |
| Vertical | Show only vertical lines |

## Column Reordering

Enable users to drag and drop column headers to reorganize their positions:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    gridSettings: {
        allowReordering: true
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**User Interaction:** Click and drag any column header to move it to a new position.

## Auto-Resizing Columns

Control whether columns automatically stretch to fill available space:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filterSettings: [{ name: 'Year', type: 'Exclude', items: ['FY 2015', 'FY 2017'] }],
        filters: []
    },
    gridSettings: {
        columnWidth: 120,
        allowAutoResizing: false
    },
    height: 350,
    width: 800
});
pivotTableObj.appendTo('#PivotTable');
```

**Behavior:**
- `allowAutoResizing: true` (default) - Columns stretch to fill component width
- `allowAutoResizing: false` - Component adjusts width to match column widths

## Text Wrapping

Enable cell content to wrap to multiple lines when exceeding column width:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    gridSettings: {
        allowTextWrap: true
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Effect:** Increases row height automatically to accommodate wrapped text.

## Text Alignment

Control text alignment in row headers, column headers, and value cells using the `columnRender` event:

```typescript
import { PivotView, IDataSet, ColumnRenderEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    gridSettings: {
        columnRender: (args: ColumnRenderEventArgs) => {
            if (args.stackedColumns[0]) {
                // Right-align row headers
                args.stackedColumns[0].textAlign = "Right";
            }
            if (args.stackedColumns[1]) {
                // Center-align column header "FY 2015"
                args.stackedColumns[1].textAlign = 'Center';
            }
            if (args.stackedColumns[1] && (args.stackedColumns[1].columns[0] as any)) {
                // Right-align column header "Q1"
                (args.stackedColumns[1].columns[0] as any).textAlign = 'Right';
            }
            if (args.stackedColumns[1] && args.stackedColumns[1].columns[0] && (args.stackedColumns[1].columns[0] as any).columns[0]) {
                // Right-align value headers "Units Sold"
                (args.stackedColumns[1].columns[0] as any).columns[0].headerTextAlign = 'Right';
                // Left-align value cells
                (args.stackedColumns[1].columns[0] as any).columns[0].textAlign = 'Left';
            }
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Alignment Options:**
- `Left` - Positions content on the left side
- `Right` - Positions content on the right side
- `Center` - Positions content in the center
- `Justify` - Distributes content evenly across cell width

## Auto-Fit Columns

Automatically adjust all column widths to fit their content:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    dataBound(): void {
        // Auto-fit all columns after data binding
        pivotTableObj.grid.autoFitColumns();
    },
    height: 350,
    width: 800
});
pivotTableObj.appendTo('#PivotTable');
```

**Usage with Grouping Bar:**

When grouping bar is enabled, the first column has a minimum width of 250px. Use this approach to auto-fit remaining columns:

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(GroupingBar);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    dataBound: function(args) {
        if (pivotTableObj.showGroupingBar) {
            let columns: string[] = [];
            // Collect column names except first (which is fixed at 250px)
            for (let i: number = 1; i < (pivotTableObj.grid as any).columnModel.length; i++) {
                columns.push((pivotTableObj.grid as any).columnModel[i].field);
            }
            // Auto-fit only the collected columns
            pivotTableObj.grid.autoFitColumns(columns);
        }
    },
    showGroupingBar: true,
    height: 350,
    width: 800
});
pivotTableObj.appendTo('#PivotTable');
```

**Selective Auto-Fit During Rendering:**

Use the `columnRender` event to auto-fit specific columns:

```typescript
import { PivotView, IDataSet, ColumnRenderEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    gridSettings: {
        columnRender: function (args: ColumnRenderEventArgs) {
            // Mark all columns for auto-fit during initial render
            for (let i: number = 0; i < args.columns.length; i++) {
                args.columns[i].autoFit = true;
            }
        }
    },
    height: 350,
    width: 800
});
pivotTableObj.appendTo('#PivotTable');
```

## Selection

Enable users to select rows, columns, or cells for data analysis and manipulation:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    gridSettings: {
        allowSelection: true,
        selectionSettings: { type: 'Multiple' }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Selection Modes

Configure selection behavior using the `mode` property in `selectionSettings`:

```typescript
gridSettings: {
    allowSelection: true,
    selectionSettings: { mode: 'Both' }
}
```

**Available Modes:**
- `Row` (default) - Select entire rows
- `Column` - Select entire columns
- `Cell` - Select individual cells
- `Both` - Select both rows and columns

### Cell Selection Modes

When selecting cells, control selection range type:

```typescript
gridSettings: {
    allowSelection: true,
    selectionSettings: { 
        cellSelectionMode: 'Box', 
        type: 'Multiple', 
        mode: 'Cell' 
    }
}
```

**Modes:**
- `Flow` (default) - Continuous range from start to end cell
- `Box` - Rectangular block of cells
- `BoxWithBorder` - Rectangular block with visible borders

### Selection Type

Control how many items can be selected:

```typescript
gridSettings: {
    allowSelection: true,
    selectionSettings: { type: 'Single' }
}
```

**Options:**
- `Single` - Select one row/column/cell at a time
- `Multiple` - Select multiple using CTRL+click or SHIFT+click

### Selection Event

Handle selection with the `cellSelected` event:

```typescript
import { PivotView, IDataSet, PivotCellSelectedEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    gridSettings: {
        allowSelection: true,
        selectionSettings: { cellSelectionMode: 'Box', type: 'Multiple', mode: 'Cell' }
    },
    cellSelected: (args: PivotCellSelectedEventArgs) => {
        // Access selected cells information
        console.log('Selected cells:', args.selectedCellsInfo);
        console.log('Current cell:', args.currentCell);
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Common Patterns

### Pattern 1: Responsive Layout

```typescript
// Adjust dimensions based on container
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        rows: [{ name: 'Country' }]
    },
    height: '100%',
    width: '100%',
    gridSettings: {
        columnWidth: 140,
        rowHeight: 40,
        allowResizing: true
    }
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 2: Compact Classic View

```typescript
// Use Tabular layout for space efficiency
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Region' }, { name: 'Country' }, { name: 'City' }]
    },
    gridSettings: {
        layout: 'Tabular',
        columnWidth: 120
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 3: Large Data Display

```typescript
// Optimize for large datasets
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales' }],
        rows: [{ name: 'Product' }]
    },
    height: '600px',
    width: '100%',
    gridSettings: {
        columnWidth: 100,
        rowHeight: 30,
        gridLines: 'Horizontal'
    }
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 4: Custom Column Widths

```typescript
// Set different widths for specific columns
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Product' }]
    },
    gridSettings: {
        columnWidth: 120,
        allowResizing: true
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Troubleshooting

### Width/Height Not Applying

**Issue:** Dimensions don't match specified values.

**Solution:**
- Check parent container dimensions for percentage values
- Verify minimum width constraint (400px)
- Ensure no conflicting CSS styles
- Use pixel values for absolute control

### Classic Layout Not Working

**Issue:** Layout doesn't change to Tabular mode.

**Solution:**
- Set `gridSettings.layout: 'Tabular'`
- Verify property name spelling (case-sensitive)
- Check that multiple row fields are configured
- Refresh pivot table after changing layout
- Verify compatible with relational data sources only

### Column Resizing Not Working

**Issue:** Cannot resize columns by dragging.

**Solution:**
- Set `gridSettings.allowResizing: true`
- Check for conflicting event handlers
- Verify cursor is on column border
- Ensure columnWidth is initially set

### Row Height Too Small on Mobile

**Issue:** Rows appear cramped on mobile devices.

**Solution:**
- Default mobile row height is 48px
- Increase rowHeight for touch-friendly display:
  ```typescript
  gridSettings: { rowHeight: 50 }
  ```
- Test on actual mobile devices
- Consider responsive design patterns

### Grid Lines Not Visible

**Issue:** Grid lines don't appear.

**Solution:**
- Check `gridSettings.gridLines` value
- Verify it's not set to 'None'
- Check CSS theme overrides
- Ensure border styles aren't hidden by custom CSS
