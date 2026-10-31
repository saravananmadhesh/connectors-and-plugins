# Selection

## Table of Contents

- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Selection Settings](#selection-settings)
- [Critical Rule](#critical-rule)
- [Row Selection](#row-selection)
- [Cell Selection](#cell-selection)
- [Column Selection](#column-selection)
- [Checkbox Selection](#checkbox-selection)
- [Selection Events](#selection-events)

## When to Use This Skill

Use this skill when you need to:
- **Enable row selection** — Allow users to select single or multiple rows.
- **Enable cell selection** — Select individual cells or cell ranges.
- **Enable column selection** — Allow selecting entire columns.
- **Enable checkbox selection** — Add row checkboxes for easier multi-select.
- **Persist selection** — Keep selected rows or cells across paging.
- **Select programmatically** — Use API methods to select rows, cells, or columns.
- **Conditionally disable selection** — Prevent selection for specific rows.
- **Respond to selection events** — Hook into row, cell, and column selection callbacks.

## Overview

The Syncfusion Angular Grid supports row, cell, and column selection modes. Configure `selectionSettings` to choose single or multiple selection, along with additional behaviors such as checkbox-only selection, column selection, and persistent selection.

By default, selection is enabled (`allowSelection: true`) and the grid uses `mode: 'Row'` with `type: 'Single'` unless you override those settings.

## Selection Settings

Common `selectionSettings` properties:
- `mode`: `'Row' | 'Cell' | 'Both'` — selects rows, cells, or both.
- `type`: `'Single' | 'Multiple'` — selects one item or many.
- `allowColumnSelection`: `true | false` — enables column header selection.
- `checkboxOnly`: `true | false` — allows selection only when clicking the checkbox column.
- `checkboxMode`: `'Default' | 'ResetOnRowClick'` — controls checkbox selection behavior.
- `persistSelection`: `true | false` — keeps selection across paging operations.
- `enableSimpleMultiRowSelection`: `true | false` — allows multiple row selection with single clicks.
- `cellSelectionMode`: `'Flow' | 'Box' | 'BoxWithBorder'` — controls cell range selection shape.
- `isRowSelectable`: callback to conditionally allow selection per row.

You can also pre-select a row during initial rendering with the grid's `selectedRowIndex` property.

## Critical Rule

#### Rule 1: Selection Methods Work by Default Unless Disabled

`allowSelection` defaults to `true`, so selection APIs such as `selectRow()`, `selectRows()`, and `selectAll()` work without explicitly setting it. Only set `[allowSelection]="false"` when you want to disable selection entirely.
```typescript
// ❌ WRONG - do not disable selection if you want selection APIs
@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" [allowSelection]="false">
      <e-columns>
        <e-column field="OrderID"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  selectFirstRow() {
    this.gridComponent.selectRow(0); // ❌ WILL NOT WORK
  }
}
```
```typescript
// ✅ CORRECT - selection is enabled by default
@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" [selectionSettings]="selectionSettings">
      <e-columns>
        <e-column field="OrderID"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  selectionSettings = {
    type: 'Multiple',
    mode: 'Row'
  };
  selectFirstRow() {
    this.gridComponent.selectRow(0);  // ✅ Works
  }
  
  selectMultipleRows() {
    this.gridComponent.selectRows([0, 2, 4]);  // ✅ Works
  }
  
  selectAll() {
    this.gridComponent.selectAll();  // ✅ Works
  }
}
```
**Selection methods are enabled by default.**
Only disable selection when you explicitly want to prevent selection behavior by setting `[allowSelection]="false"`.
```typescript
this.gridComponent.selectRow(rowIndex)
this.gridComponent.selectRows([rowIndices])
this.gridComponent.selectAll()
this.gridComponent.clearSelection()
this.gridComponent.getSelectedRowIndexes()
this.gridComponent.getSelectedRecords()
```
---

## Row Selection

Row selection enables single or multiple row interactions.

### Enable row selection

```typescript
import { Component } from '@angular/core';
import { SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-row-selection-grid',
  template: `
    <ejs-grid [dataSource]="data" [selectionSettings]="selectionSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="TotalAmount" headerText="Amount" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class RowSelectionGridComponent {
  selectionSettings: SelectionSettingsModel = {
    mode: 'Row',
    type: 'Multiple'
  };
  data = [
    { OrderID: 10248, CustomerName: 'VINET', TotalAmount: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', TotalAmount: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', TotalAmount: 65.83 }
  ];
}
```

### Single row selection

Set `type: 'Single'` to allow one selected row at a time.
```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Single'
};
```

### Multiple row selection

Set `type: 'Multiple'` to select multiple rows.
```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Multiple'
};
```

### Select row at initial rendering

Pre-select a row using `selectedRowIndex`.
```html
<ejs-grid [dataSource]="data" [selectedRowIndex]="1" [selectionSettings]="selectionSettings">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
  </e-columns>
</ejs-grid>
```

### Select rows on any page by index

For paged data, navigate to the page first and then select the row index.
```typescript
selectRowByIndex(index: number): void {
  const page = Math.ceil((index + 1) / this.pageSize);
  this.grid?.pagerModule.goToPage(page);
  this.grid?.selectRow(index % this.pageSize);
}
```

### Multiple row selection by single click

Enable `enableSimpleMultiRowSelection` for one-click multiple row selection.
```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Multiple',
  enableSimpleMultiRowSelection: true
};
```

### Select rows programmatically

Use selection APIs to update row selection from code.
```typescript
this.gridComponent.selectRow(2);
this.gridComponent.selectRows([0, 3, 5]);
this.gridComponent.selectRowsByRange(1, 4);
```

### Select grid rows based on a condition

Use `isRowSelectable` or data-binding events to programmatically select rows only when conditions match.
```typescript
public rowDataBound(args: RowDataBoundEventArgs): void {
  if ((args.data as any).EmployeeID > 3) {
    this.selectedIndexes.push(parseInt((args.row as HTMLElement).getAttribute('aria-rowindex') || '0', 10));
  }
}
public dataBound(): void {
  if (this.selectedIndexes.length) {
    this.grid?.selectRows(this.selectedIndexes);
    this.selectedIndexes = [];
  }
}
```

### Get selected row indexes

```typescript
const selectedIndexes = this.gridComponent.getSelectedRowIndexes();
```

### Get selected records across pages

Enable `persistSelection: true` to keep selection across paging and then read selected records.

```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Multiple',
  persistSelection: true
};
const selectedRecords = this.gridComponent.getSelectedRecords();
```

### Get selected records

```typescript
const selectedRecords = this.gridComponent.getSelectedRecords();
```

### Clear row selection programmatically

```typescript
this.gridComponent.clearRowSelection();
```

### Row selection events

Use row selection events to intercept or respond to selection changes.

```html
<ejs-grid [dataSource]="data" [selectionSettings]="selectionSettings"
          (rowSelecting)="onRowSelecting($event)"
          (rowSelected)="onRowSelected($event)"
          (rowDeselecting)="onRowDeselecting($event)"
          (rowDeselected)="onRowDeselected($event)">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
  </e-columns>
</ejs-grid>
```

```typescript
onRowSelecting(args: any): void {
  if ((args.data as any).CustomerName === 'VINET') {
    args.cancel = true;
  }
}
onRowSelected(args: any): void {
  console.log('Row selected', args.data);
}
onRowDeselecting(args: any): void {
  console.log('Row deselecting', args.data);
}
onRowDeselected(args: any): void {
  console.log('Row deselected', args.data);
}
```
---

## Cell Selection

Cell selection enables selecting individual cells or ranges of cells.

### Enable cell selection

```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Cell',
  type: 'Multiple'
};
```

### Single cell selection

Set `type: 'Single'` to select only one cell.

### Multiple cell selection

Set `type: 'Multiple'` to allow multiple cell selection.

### Cell selection mode

Control how a cell range is selected with `cellSelectionMode`.
- `Flow` — default continuous range selection.
- `Box` — selects cells within a rectangular range.
- `BoxWithBorder` — same as `Box` but with a visible border.
```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Cell',
  type: 'Multiple',
  cellSelectionMode: 'Box'
};
```

### Select cells programmatically

```typescript
this.gridComponent.selectCell({ rowIndex: 1, cellIndex: 2 });
this.gridComponent.selectCells([{ rowIndex: 0, cellIndexes: [1, 3] }]);
this.gridComponent.selectCellsByRange(
  { rowIndex: 0, cellIndex: 1 },
  { rowIndex: 2, cellIndex: 3 }
);
```

### Get selected row cell indexes

```typescript
const selectedCellIndexes = this.gridComponent.getSelectedRowCellIndexes();
```

### Clear cell selection programmatically

```typescript
this.gridComponent.clearCellSelection();
```

### Cell selection events
```html
<ejs-grid [dataSource]="data" [selectionSettings]="selectionSettings"
          (cellSelecting)="onCellSelecting($event)"
          (cellSelected)="onCellSelected($event)"
          (cellDeselecting)="onCellDeselecting($event)"
          (cellDeselected)="onCellDeselected($event)">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
  </e-columns>
</ejs-grid>
```
```typescript
onCellSelecting(args: any): void {
  // cancel or inspect the incoming cell selection
}
onCellSelected(args: any): void {
  // a cell was selected
}
onCellDeselecting(args: any): void {
  // before cell deselection
}
onCellDeselected(args: any): void {
  // after cell deselection
}
```
---

## Column Selection

Column selection allows selecting whole columns by header.

### Enable column selection

```typescript
selectionSettings: SelectionSettingsModel = {
  allowColumnSelection: true,
  type: 'Single'
};
```

### Multiple column selection

```typescript
selectionSettings: SelectionSettingsModel = {
  allowColumnSelection: true,
  type: 'Multiple'
};
```

### Select columns programmatically

```typescript
this.gridComponent.selectColumn(1);
this.gridComponent.selectColumns([0, 2]);
this.gridComponent.selectColumnsByRange(1, 3);
this.gridComponent.selectColumnWithExisting(2);
```

### Clear column selection programmatically

```typescript
this.gridComponent.clearColumnSelection();
```

### Column selection events

```html
<ejs-grid [dataSource]="data" [selectionSettings]="selectionSettings"
          (columnSelecting)="onColumnSelecting($event)"
          (columnSelected)="onColumnSelected($event)"
          (columnDeselecting)="onColumnDeselecting($event)"
          (columnDeselected)="onColumnDeselected($event)">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
  </e-columns>
</ejs-grid>
```
```typescript
onColumnSelecting(args: any): void {
  // cancel or inspect the incoming column selection
}
onColumnSelected(args: any): void {
  // a column was selected
}
onColumnDeselecting(args: any): void {
  // before column deselection
}
onColumnDeselected(args: any): void {
  // after column deselection
}
```
---

## Checkbox Selection

Checkbox selection renders row checkboxes inside a checkbox column.

### Enable checkbox selection

```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Multiple'
};
```
Add a checkbox column to the grid:
```html
<e-column type="checkbox" width="50"></e-column>
```

### Checkbox selection mode

Control checkbox behavior with `checkboxMode`.
- `Default` — normal checkbox/mouse selection.
- `ResetOnRowClick` — clicking a row resets previous selections, while CTRL/SHIFT still supports multi-select.
```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Multiple',
  checkboxMode: 'ResetOnRowClick'
};
```

### Hide select-all checkbox in the header

Provide an empty `headerTemplate` on the checkbox column.
```html
<e-column type="checkbox" width="50">
  <ng-template #headerTemplate></ng-template>
</e-column>
```

### Allow selection only through checkbox click

```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Multiple',
  checkboxOnly: true
};
```

### Select a single row in checkbox selection mode

Use `checkboxMode: 'ResetOnRowClick'` or `type: 'Single'` to keep a single selection.
```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Single',
  checkboxMode: 'ResetOnRowClick'
};
```

### Persist checkbox selection across pages

Enable `persistSelection: true` and mark a primary key column with `isPrimaryKey`.
```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Row',
  type: 'Multiple',
  persistSelection: true
};
```

### Conditional row selection for checkboxes

Use `isRowSelectable` to prevent some rows from being selected.
```typescript
public isRowSelectable = (rowData: any) => rowData.Status !== 'Cancelled';
```
---

## Selection Events

Selection events are available for rows, cells, and columns.
- `rowSelecting`, `rowSelected`, `rowDeselecting`, `rowDeselected`
- `cellSelecting`, `cellSelected`, `cellDeselecting`, `cellDeselected`
- `columnSelecting`, `columnSelected`, `columnDeselecting`, `columnDeselected`
Use these events to validate or react to selection decisions.

```html
<ejs-grid [dataSource]="data" [selectionSettings]="selectionSettings"
          (rowSelecting)="onRowSelecting($event)"
          (cellSelected)="onCellSelected($event)"
          (columnDeselected)="onColumnDeselected($event)">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
  </e-columns>
</ejs-grid>
```
```typescript
onRowSelecting(args: any): void {
  if ((args.data as any).CustomerName === 'VINET') {
    args.cancel = true;
  }
}
onCellSelected(args: any): void {
  console.log('Cell selected', args.value);
}
onColumnDeselected(args: any): void {
  console.log('Column deselected', args.column);
}
```
