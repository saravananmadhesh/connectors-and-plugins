---
name: selection-modes
description: 'Selection modes in Syncfusion Grid: row, cell, column, checkbox, multi-select, persistence, and toggle behavior.'
---

# Selection Modes

## Table of Contents
- [Overview](#overview)
- [Selection Settings](#selection-settings)
- [Row Selection](#row-selection)
- [Cell Selection](#cell-selection)
- [Column Selection](#column-selection)
- [Checkbox Selection](#checkbox-selection)
- [Multi-Select Configurations](#multi-select-configurations)

## When to Use This Reference

- Configure row, cell, or column selection behavior
- Enable multi-select with keyboard and checkbox interactions
- Handle selection lifecycle events
- Retrieve selected rows, cells, or records programmatically
- Use persistence, toggle, and conditional selection scenarios
- Understand default selection behavior and how to override it

## Overview

Selection is enabled by default in Syncfusion Grid. Unless you explicitly disable it, `allowSelection` is effectively `true`, and the grid starts with `mode: 'Row'` and `type: 'Single'` by default.

You can select rows, cells, or columns using mouse, keyboard, or touch interactions. For multi-selection, use Ctrl+click for additional items and Shift+click for a range. In touch scenarios, tap and use the popup to switch between multi-row and multi-cell selection.

## Selection Settings

Common `selectionSettings` properties:
- `mode`: `'Row' | 'Cell' | 'Both'` — selects rows, cells, or both.
- `type`: `'Single' | 'Multiple'` — selects one item or many.
- `allowColumnSelection`: `true | false` — enables column header selection for columns.
- `checkboxOnly`: `true | false` — allows selection only when clicking the checkbox column.
- `checkboxMode`: `'Default' | 'ResetOnRowClick'` — controls checkbox selection behavior.
- `persistSelection`: `true | false` — keeps row or column selection across paging and data refreshes. Requires a primary key and only works for `Multiple` selection; it is not supported for cell selection.
- `enableSimpleMultiRowSelection`: `true | false` — enables multiple row selection with simple clicks.
- `enableToggle`: `true | false` — allows toggling selection by clicking a selected row, cell, or column again.
- `cellSelectionMode`: `'Flow' | 'Box' | 'BoxWithBorder'` — controls how cell ranges are selected. Requires `mode: 'Cell'` or `mode: 'Both'`.
- `isRowSelectable`: callback to conditionally allow selection for specific rows.

Use `selectedRowIndex` to pre-select a row during initial rendering.

### Basic Selection Mode Example

```ts
import { Grid, Selection } from '@syncfusion/ej2-grids';

Grid.Inject(Selection);

const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    mode: 'Both',
    type: 'Multiple',
    enableToggle: true
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

## Row Selection

### Enable Row Selection

```ts
import { Grid, Selection, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Selection, Page);

const grid = new Grid({
  dataSource: data,
  allowSelection: true,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row'
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Single Row Selection

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    type: 'Single',
    mode: 'Row'
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Pre-Select a Row at Initial Rendering

```ts
const grid = new Grid({
  dataSource: data,
  selectedRowIndex: 1,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Simple Multi-Row Selection by Click

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row',
    enableSimpleMultiRowSelection: true
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Programmatic Row Selection

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');

grid.selectRow(0);
grid.selectRows([1, 3]);
grid.selectionModule.selectRowsByRange(0, 2);
```

### Row Selection Events

```ts
const grid = new Grid({
  dataSource: data,
  rowSelecting: (args: any) => {
    if (args.data.CustomerName === 'VINET') {
      args.cancel = true;
    }
  },
  rowSelected: (args: any) => {
    args.row.style.backgroundColor = 'rgb(96, 158, 101)';
  },
  rowDeselecting: (args: any) => {
    args.row.style.backgroundColor = 'rgb(245, 69, 69)';
  },
  rowDeselected: (args: any) => {
    args.row.style.backgroundColor = '';
  },
  selectionSettings: { type: 'Multiple', mode: 'Row' }
});

grid.appendTo('#grid');
```

## Cell Selection

### Enable Cell Selection

```ts
import { Grid, Selection } from '@syncfusion/ej2-grids';

Grid.Inject(Selection);

const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Cell'
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Cell Selection Modes

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Cell',
    cellSelectionMode: 'BoxWithBorder'
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Programmatic Cell Selection

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: { type: 'Multiple', mode: 'Cell' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');

grid.selectCell({ rowIndex: 1, cellIndex: 1 });
grid.selectCells([{ rowIndex: 0, cellIndexes: [0, 1] }]);
grid.selectCellsByRange({ rowIndex: 1, cellIndex: 0 }, { rowIndex: 3, cellIndex: 2 });
```

### Get Selected Cell Indexes

```ts
const selectedCells = grid.getSelectedRowCellIndexes();
console.log(selectedCells);
```

## Column Selection

### Enable Column Selection

```ts
import { Grid, Selection } from '@syncfusion/ej2-grids';

Grid.Inject(Selection);

const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    type: 'Single',
    allowColumnSelection: true
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Programmatic Column Selection

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: { type: 'Multiple', allowColumnSelection: true },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');

grid.selectionModule.selectColumn(1);
grid.selectionModule.selectColumns([0, 2]);
grid.selectionModule.selectColumnsByRange(0, 2);
grid.selectionModule.selectColumnWithExisting(1);
```

## Checkbox Selection

### Enable Checkbox Column

```ts
import { Grid, Selection, Toolbar, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Selection, Toolbar, Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { type: 'checkbox', width: 50 },
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  toolbar: ['Add', 'Edit', 'Delete'],
  allowSelection: true,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row'
  }
});

grid.appendTo('#grid');
```

### Checkbox-Specific Behavior

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { type: 'checkbox', width: 50 },
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row',
    checkboxOnly: true,
    checkboxMode: 'ResetOnRowClick'
  }
});

grid.appendTo('#grid');
```

### Hide the Select-All Checkbox in the Header

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { type: 'checkbox', width: 50, headerTemplate: '#headerTemplate' },
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  selectionSettings: { type: 'Multiple', mode: 'Row' }
});

grid.appendTo('#grid');
```

### Conditional Row Selection

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row',
    persistSelection: true
  },
  isRowSelectable: (data: any) => data.Status !== 'Cancelled',
  columns: [
    { type: 'checkbox', width: 50 },
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ]
});

grid.appendTo('#grid');
```

## Multi-Select Configurations

### Get Selected Rows and Records

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { type: 'checkbox', width: 50 },
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  allowSelection: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' }
});

grid.appendTo('#grid');

const selectedRowIndexes = grid.getSelectedRowIndexes();
const selectedRecords = grid.getSelectedRecords();
console.log(selectedRowIndexes, selectedRecords);
```

### Toggle Selection

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Both',
    enableToggle: true
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Persist Selection Across Paging or Refresh

```ts
const grid = new Grid({
  dataSource: data,
  allowPaging: true,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row',
    persistSelection: true
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Clear Selection Programmatically

```ts
const grid = new Grid({
  dataSource: data,
  selectionSettings: { type: 'Multiple', mode: 'Both', allowColumnSelection: true },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');

grid.clearSelection();
grid.clearCellSelection();
grid.clearRowSelection();
grid.selectionModule.clearColumnSelection();
```

