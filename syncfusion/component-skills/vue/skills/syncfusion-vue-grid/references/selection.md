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
- Enable row selection for single or multiple records.
- Enable cell selection for individual cells or cell ranges.
- Enable column selection for whole-column interactions.
- Render checkbox selection for bulk actions.
- Persist selection across paging or data refresh.
- Select rows, cells, or columns programmatically.
- Conditionally block selection for specific rows.
- Handle row, cell, and column selection events.

## Overview

The Syncfusion EJ2 Vue Grid supports row, cell, and column selection. Configure `selectionSettings` to choose single or multiple selection and to control behaviors such as checkbox-only selection, column selection, and persistent selection.

Selection is enabled by default, and the grid uses `mode: 'Row'` with `type: 'Single'` unless you override those values.

## Selection Settings

Common `selectionSettings` properties:
- `mode`: `'Row' | 'Cell' | 'Both'` — selects rows, cells, or both.
- `type`: `'Single' | 'Multiple'` — selects one item or many.
- `allowColumnSelection`: `true | false` — enables column header selection.
- `checkboxOnly`: `true | false` — allows selection only on checkbox clicks.
- `checkboxMode`: `'Default' | 'ResetOnRowClick'` — controls how checkboxes behave.
- `persistSelection`: `true | false` — keeps selection across paging and refresh.
- `enableSimpleMultiRowSelection`: `true | false` — enables single-click multi-row selection.
- `enableToggle`: `true | false` — lets users click a selected item again to deselect it.
- `cellSelectionMode`: `'Flow' | 'Box' | 'BoxWithBorder'` — controls cell range selection shape.
- `isRowSelectable`: callback to conditionally allow selection per row.

You can also pre-select a row during initial rendering with the `selectedRowIndex` property.

## Critical Rule

### Rule 1: Selection APIs Work by Default Unless Disabled

Selection is enabled by default. Do not disable selection unless you explicitly want to block selection behavior.

```vue
<template>
  <ejs-grid :dataSource="data" :selectionSettings="selectionSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-grids';

const selectionSettings = {
  mode: 'Row',
  type: 'Multiple'
};
</script>
```

```javascript
// ✅ Works when selection is enabled by default
this.$refs.grid.selectRow(0);
this.$refs.grid.selectRows([0, 2, 4]);
this.$refs.grid.selectAll();
this.$refs.grid.clearSelection();
```

```vue
<!-- ❌ Avoid disabling selection if you still need selection APIs -->
<ejs-grid :dataSource="data" :allowSelection="false">
  <e-columns>
    <e-column field="OrderID"></e-column>
  </e-columns>
</ejs-grid>
```

## Row Selection

Row selection allows users to select one or more rows.

### Enable row selection

```vue
<template>
  <ejs-grid :dataSource="data" :selectionSettings="selectionSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple'
};
</script>
```

### Single row selection

```javascript
const selectionSettings = {
  mode: 'Row',
  type: 'Single'
};
```

### Multiple row selection

```javascript
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple'
};
```

### Select a row at initial render

```vue
<ejs-grid :dataSource="data" :selectedRowIndex="1" :selectionSettings="selectionSettings">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
    <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
  </e-columns>
</ejs-grid>
```

### Multiple row selection by single click

```javascript
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple',
  enableSimpleMultiRowSelection: true
};
```

### Select rows programmatically

```javascript
this.$refs.grid.selectRow(2);
this.$refs.grid.selectRows([0, 3, 5]);
this.$refs.grid.selectRowsByRange(1, 4);
```

### Select rows based on a condition

```javascript
const isRowSelectable = (data) => data.Status !== 'Cancelled';
```

### Get selected row indexes and records

```javascript
const selectedIndexes = this.$refs.grid.getSelectedRowIndexes();
const selectedRecords = this.$refs.grid.getSelectedRecords();
```

### Persist row selection across pages

```javascript
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple',
  persistSelection: true
};
```

### Clear row selection programmatically

```javascript
this.$refs.grid.clearRowSelection();
```

### Row selection events

```vue
<template>
  <ejs-grid
    :dataSource="data"
    :selectionSettings="selectionSettings"
    :rowSelecting="rowSelecting"
    :rowSelected="rowSelected"
    :rowDeselecting="rowDeselecting"
    :rowDeselected="rowDeselected">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const selectionSettings = { mode: 'Row', type: 'Multiple' };

const rowSelecting = (args) => {
  if (args.data.CustomerID === 'VINET') {
    args.cancel = true;
  }
};

const rowSelected = (args) => {
  console.log('Row selected', args.data);
};

const rowDeselecting = (args) => {
  console.log('Row deselecting', args.data);
};

const rowDeselected = (args) => {
  console.log('Row deselected', args.data);
};
</script>
```

## Cell Selection

Cell selection allows users to select individual cells or ranges of cells.

### Enable cell selection

```javascript
const selectionSettings = {
  mode: 'Cell',
  type: 'Multiple'
};
```

### Cell selection modes

```javascript
const selectionSettings = {
  mode: 'Cell',
  type: 'Multiple',
  cellSelectionMode: 'Box' // 'Flow' | 'Box' | 'BoxWithBorder'
};
```

### Select cells programmatically

```javascript
this.$refs.grid.selectCell({ rowIndex: 1, cellIndex: 2 });
this.$refs.grid.selectCells([{ rowIndex: 0, cellIndexes: [1, 3] }]);
this.$refs.grid.selectCellsByRange(
  { rowIndex: 0, cellIndex: 1 },
  { rowIndex: 2, cellIndex: 3 }
);
```

### Get selected cell indexes

```javascript
const selectedCellIndexes = this.$refs.grid.getSelectedRowCellIndexes();
```

### Clear cell selection programmatically

```javascript
this.$refs.grid.clearCellSelection();
```

### Cell selection events

```vue
<template>
  <ejs-grid
    :dataSource="data"
    :selectionSettings="selectionSettings"
    :cellSelecting="cellSelecting"
    :cellSelected="cellSelected"
    :cellDeselecting="cellDeselecting"
    :cellDeselected="cellDeselected">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const selectionSettings = { mode: 'Cell', type: 'Multiple' };

const cellSelecting = (args) => {
  if (args.data.ShipCountry === 'France') {
    args.cancel = true;
  }
};

const cellSelected = (args) => {
  console.log('Cell selected', args.data);
};

const cellDeselecting = (args) => {
  console.log('Cell deselecting', args.data);
};

const cellDeselected = (args) => {
  console.log('Cell deselected', args.data);
};
</script>
```

## Column Selection

Column selection allows users to select whole columns through the header.

### Enable column selection

```javascript
const selectionSettings = {
  allowColumnSelection: true,
  type: 'Multiple'
};
```

### Select columns programmatically

```javascript
this.$refs.grid.selectColumn(1);
this.$refs.grid.selectColumns([0, 2]);
this.$refs.grid.selectColumnsByRange(1, 3);
this.$refs.grid.selectColumnWithExisting(2);
```

### Clear column selection programmatically

```javascript
this.$refs.grid.clearColumnSelection();
```

### Column selection events

```vue
<template>
  <ejs-grid
    :dataSource="data"
    :selectionSettings="selectionSettings"
    :columnSelecting="columnSelecting"
    :columnSelected="columnSelected"
    :columnDeselecting="columnDeselecting"
    :columnDeselected="columnDeselected">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const selectionSettings = { allowColumnSelection: true, type: 'Multiple' };

const columnSelecting = (args) => {
  if (args.column.field === 'CustomerID') {
    args.cancel = true;
  }
};

const columnSelected = (args) => {
  console.log('Column selected', args.column.field);
};

const columnDeselecting = (args) => {
  console.log('Column deselecting', args.column.field);
};

const columnDeselected = (args) => {
  console.log('Column deselected', args.column.field);
};
</script>
```

## Checkbox Selection

Checkbox selection renders row checkboxes inside a checkbox column.

### Enable checkbox selection

```vue
<template>
  <ejs-grid :dataSource="data" :selectionSettings="selectionSettings">
    <e-columns>
      <e-column type="checkbox" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple'
};
</script>
```

### Checkbox selection modes

```javascript
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple',
  checkboxMode: 'ResetOnRowClick' // 'Default' | 'ResetOnRowClick'
};
```

### Restrict selection to checkbox clicks

```javascript
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple',
  checkboxOnly: true
};
```

### Hide the header select-all checkbox

```vue
<e-column type="checkbox" width="50">
  <template #headerTemplate></template>
</e-column>
```

### Prevent specific rows from being selected

```javascript
const selectionSettings = { type: 'Multiple' };

const rowDataBound = (args) => {
  args.isSelectable = args.data.Status !== 'Cancelled';
};
```

### Use `isRowSelectable` for partial selection

```javascript
const isRowSelectable = (data) => data.Status !== 'Cancelled';
```

### Persist checkbox selection across pages

```javascript
const selectionSettings = {
  mode: 'Row',
  type: 'Multiple',
  persistSelection: true
};
```

## Selection Events

Use these events to validate or respond to selection changes:
- `rowSelecting`, `rowSelected`, `rowDeselecting`, `rowDeselected`
- `cellSelecting`, `cellSelected`, `cellDeselecting`, `cellDeselected`
- `columnSelecting`, `columnSelected`, `columnDeselecting`, `columnDeselected`

```vue
<template>
  <ejs-grid
    :dataSource="data"
    :selectionSettings="selectionSettings"
    :rowSelecting="onRowSelecting"
    :cellSelected="onCellSelected"
    :columnDeselected="onColumnDeselected">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const selectionSettings = { mode: 'Row', type: 'Multiple' };

const onRowSelecting = (args) => {
  if (args.data.CustomerID === 'VINET') {
    args.cancel = true;
  }
};

const onCellSelected = (args) => {
  console.log('Cell selected', args.data);
};

const onColumnDeselected = (args) => {
  console.log('Column deselected', args.column.field);
};
</script>
```
