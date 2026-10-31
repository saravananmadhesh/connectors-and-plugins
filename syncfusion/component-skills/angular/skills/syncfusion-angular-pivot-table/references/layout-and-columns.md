# Layout & Column Configuration

## Table of Contents
- [Classic Layout](#classic-layout)
- [Dimensions](#dimensions)
- [Row & Column Sizing](#row--column-sizing)
- [Column Features](#column-features)
- [Display Options](#display-options)
- [Selection](#selection)
- [Cell Customization](#cell-customization)

## Classic Layout

### Classic (Tabular) Layout

The classic layout, also known as tabular layout, provides a structured presentation of data with improved readability. In this layout, fields in the row axis display side by side in separate columns. Grand totals appear at the end of rows, while subtotals appear in separate rows beneath each group.

**Compatibility**: Classic layout works only with relational data sources in both client-side and server-side engines.

Enable classic layout by setting the `layout` property to `'Tabular'` in `gridSettings`:

```typescript
@Component({
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [gridSettings]="gridSettings">
  </ejs-pivotview>`
})
export class AppComponent {
  gridSettings: any = {
    layout: 'Tabular'  // Enable classic layout
  };

  dataSourceSettings: IDataOptions = {
    dataSource: data,
    rows: [{ name: 'Country' }, { name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

**Limitation**: Subtotals at the "Top" position are not supported for row subtotals in classic layout.

---

## Dimensions

### Set Component Height and Width

Configure the Pivot Table dimensions using `height` and `width` properties. Supported formats include pixels, percentages, and auto.

```typescript
// Pixel format
height: 350                // or "350px"
width: 800                 // or "800px"

// Percentage format
height: "100%"
width: "90%"

// Auto (height only)
height: "auto"  // Expands beyond parent, parent container shows scrollbar
```

**Note**: Minimum width is 400px to ensure proper display.

---

## Row & Column Sizing

### Row Height

Adjust row height using the `rowHeight` property in `gridSettings`:

```typescript
gridSettings: any = {
  rowHeight: 60  // Set to 60 pixels (default: 36 desktop, 48 mobile)
};
```

**Note**: With grouping bar enabled, only column header height changes; other rows maintain the specified height.

### Column Width

Control column width using the `columnWidth` property in `gridSettings`:

```typescript
gridSettings: any = {
  columnWidth: 200  // Set all columns to 200 pixels
  // Default: 110px (except first column: 250px with grouping bar, 200px without)
};
```

### Auto-Resize Based on Total Width

By default, columns stretch to fill available space. Disable this with `allowAutoResizing`:

```typescript
gridSettings: any = {
  allowAutoResizing: false  // Columns maintain original widths
};
```

---

## Column Features

### Column Reordering

Allow users to drag and drop column headers to reorder:

```typescript
gridSettings: any = {
  allowReordering: true  // Enable drag-drop reordering
};
```

### Column Resizing

Users can resize columns by dragging the column edge (enabled by default):

```typescript
gridSettings: any = {
  allowResizing: true  // Allow manual column resizing
};
```

**RTL Mode**: Users drag the left edge to resize in RTL mode.

### AutoFit Columns

Automatically adjust columns to fit content width:

```typescript
// Fit all columns
@ViewChild(PivotViewComponent) pivotGridObj!: PivotViewComponent;

fitAllColumns() {
  this.pivotGridObj.autoFitColumns();
}

// Fit specific columns
fitSpecificColumns() {
  this.pivotGridObj.autoFitColumns(['Year', 'Sales']);
}

// Fit during column render (for initial rendering)
gridSettings: any = {
  columnRender: (args: ColumnRenderEventArgs) => {
    if (args.columns[0].field === 'Year') {
      args.columns[0].autoFit = true;  // Auto-fit Year column
    }
  }
};
```

---

## Display Options

### Text Wrapping

Enable text wrapping to wrap cell content across multiple lines:

```typescript
gridSettings: any = {
  allowTextWrap: true
};
```

### Text Alignment

Control text alignment for cells and headers using the `columnRender` event:

```typescript
gridSettings: any = {
  columnRender: (args: ColumnRenderEventArgs) => {
    args.columns.forEach(column => {
      column.textAlign = 'Center';        // Left, Right, Center, Justify
      column.headerTextAlign = 'Left';
    });
  }
};
```

### Grid Lines

Control grid line visibility using the `gridLines` property:

```typescript
gridSettings: any = {
  gridLines: 'Both'  // Both, None, Horizontal, Vertical, Default
};
```

### Clip Mode

Determine how to display overflowing content:

```typescript
gridSettings: any = {
  clipMode: 'EllipsisWithTooltip'  // Clip, Ellipsis, EllipsisWithTooltip
};
```

---

## Selection

### Enable Selection

Allow users to select rows, columns, or cells:

```typescript
gridSettings: any = {
  allowSelection: true
};

selectionSettings: any = {
  type: 'Multiple',       // Single or Multiple
  mode: 'Cell'            // Row, Column, Cell, Both
  cellSelectionMode: 'Box' // Flow or Box
};
```

### Selection Events

Handle selection changes with events:

```typescript
@Component({
  template: `<ejs-pivotview 
    (cellSelected)="onCellSelected($event)"
    (cellSelecting)="onCellSelecting($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onCellSelected(args: PivotCellSelectedEventArgs) {
    const cellInfo = args.selectedCellsInfo;
    const current = args.currentCell;
  }

  onCellSelecting(args: PivotCellSelectedEventArgs) {
    // Access currentCell, data, cancel selection
    args.cancel = false;  // Set to true to cancel selection
  }
}
```

---

## Cell Customization

### Cell Template

Customize cell content with HTML templates:

```typescript
@Component({
  template: `<ejs-pivotview 
    [cellTemplate]="'cellTemplate'">
  </ejs-pivotview>`
})
export class AppComponent {
  ngOnInit(): void {
        this.cellTemplate = '<span class="tempwrap sb-icon-neutral pv-icons"></span>';
  }
}
```

### Cell Styling Events

Modify cell appearance during rendering:

```typescript
gridSettings: any = {
  queryCellInfo: (args: QueryCellInfoEventArgs) => {
    if (args.data.Sales > 10000) {
      args.cell.classList.add('high-value');  // Apply CSS class
    }
  },

  headerCellInfo: (args: HeaderCellInfoEventArgs) => {
    args.cell.classList.add('header-custom');  // Style header
  },

  columnRender: (args: ColumnRenderEventArgs) => {
    // Configure columns during render
    args.columns[0].width = 150;
    args.columns[0].allowReordering = true;
  }
};
```

### Cell Click Event

Handle cell click interactions:

```typescript
@Component({
  template: `<ejs-pivotview 
    (cellClick)="onCellClick($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onCellClick(args: CellClickEventArgs) {
    const cell = args.currentCell;
    const cellData = args.data;  // axis, value, rowHeader, columnHeader
  }
}
```
