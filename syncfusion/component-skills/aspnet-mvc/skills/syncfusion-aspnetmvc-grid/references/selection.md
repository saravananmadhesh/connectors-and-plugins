# Selection in ASP.NET MVC Grid

Select rows, cells, or columns. Configure selection mode, type, and behavior via `SelectionSettings`.

## When to Use This

Use this reference when you need to:
- Enable/configure row, cell, or column selection
- Support single or multiple selection
- Add checkbox selection
- Persist selection across pages
- Handle selection events
- Get selected data programmatically

## Table of Contents
- [Enable Selection](#enable-selection)
- [Selection Mode](#selection-mode)
- [Selection Type](#selection-type)
- [Row Selection](#row-selection)
- [Cell Selection](#cell-selection)
- [Column Selection](#column-selection)
- [Checkbox Selection](#checkbox-selection)
- [Programmatic Selection](#programmatic-selection)
- [Selection Events](#selection-events)
- [Get Selected Data](#get-selected-data)
- [Disable Selection for Specific Rows](#disable-selection-for-specific-rows)

## Enable Selection

Selection is enabled by default. Configure via `SelectionSettings`:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .SelectionSettings(sel => sel
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .Columns(col => { /* ... */ })
    .Render()
```

## Selection Mode

| Mode | Description |
|------|-------------|
| `Row` (default) | Select entire rows |
| `Cell` | Select individual cells |
| `Column` | Select entire columns |

## Selection Type

| Type | Description |
|------|-------------|
| `Single` (default) | Select one row/cell at a time |
| `Multiple` | Select multiple rows/cells (Ctrl+click, Shift+click) |

## Row Selection

```cshtml
.SelectionSettings(sel => sel.Mode(Syncfusion.EJ2.Grids.SelectionMode.Row).Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
```

Enable selection on checkbox click only:
```cshtml
.SelectionSettings(sel => sel.CheckboxOnly(true))
```

Persist selection across pages:
```cshtml
.SelectionSettings(sel => sel.PersistSelection(true))
```

> `PersistSelection` requires a primary key column (`IsPrimaryKey(true)`).

## Cell Selection

```cshtml
.SelectionSettings(sel => sel
    .Mode(Syncfusion.EJ2.Grids.SelectionMode.Cell)
    .CellSelectionMode(Syncfusion.EJ2.Grids.CellSelectionMode.BoxWithBorder))
```

Cell selection modes: `Flow` (default), `Box`, `BoxWithBorder`

## Column Selection

```cshtml
.SelectionSettings(sel => sel.Mode(Syncfusion.EJ2.Grids.SelectionMode.Column))
```

> Column selection requires `AllowSelection(true)`.

## Checkbox Selection

Add a checkbox column to enable row selection via checkboxes:

```cshtml
.Columns(col => {
    col.Type("checkbox").Width("50").Add();
    col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
    col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
})
.SelectionSettings(sel => sel.Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
```

Enable "Select All" header checkbox: included automatically with checkbox column.

Checkbox selection modes:
- `Default`: Clicking row also selects; standard keyboard/mouse behavior
- `ResetOnRowClick`: Clicking non-checkbox area resets selection

```cshtml
col.Type("checkbox").CheckboxMode("ResetOnRowClick").Width("50").Add();
```

## Programmatic Selection

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.selectRow(2);                          // select row at index 2
grid.selectRows([0, 2, 4]);                 // select multiple rows
grid.selectCell({ rowIndex: 1, cellIndex: 2 }); // select a cell
grid.selectCells([{ rowIndex: 0, cellIndex: 1 }, { rowIndex: 1, cellIndex: 2 }]);
grid.clearSelection();                       // deselect all
```

## Selection Events

```cshtml
.RowSelected("onRowSelected")
.RowDeselected("onRowDeselected")
.CellSelected("onCellSelected")
```

```javascript
function onRowSelected(args) {
    console.log('Selected row data:', args.data);
    console.log('Row index:', args.rowIndex);
}
```

## Get Selected Data

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
var selectedRecords = grid.getSelectedRecords(); // array of data objects
var selectedRows    = grid.getSelectedRows();    // array of TR elements
var selectedRowIndexes = grid.getSelectedRowIndexes(); // array of row indexes
```

## Disable Selection for Specific Rows

```javascript
function rowDataBound(args) {
    if (args.data.Status === 'Closed') {
        args.row.classList.add('e-disabled');
        // Prevent selection
    }
}
```

Or prevent via `RowSelecting` event:
```javascript
function rowSelecting(args) {
    if (args.data.Status === 'Closed') {
        args.cancel = true;
    }
}
```
