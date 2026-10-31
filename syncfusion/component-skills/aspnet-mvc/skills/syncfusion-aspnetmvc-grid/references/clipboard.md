# Clipboard in ASP.NET MVC Grid

Copy selected rows or cells to the clipboard using keyboard shortcuts or programmatic API.

## When to Use This

Use this reference when you need to:
- Copy selected grid data to clipboard
- Include column headers in copied data
- Enable drag-to-fill (AutoFill) for cell data
- Support paste operations in batch editing
- Trigger copy via custom buttons

## Table of Contents
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Copy via External Button](#copy-via-external-button)
- [AutoFill](#autofill)
- [Paste](#paste)
- [API Reference](#api-reference)

## Keyboard Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Ctrl + C` | Copy selected rows or cells data into clipboard |
| `Ctrl + Shift + H` | Copy selected rows or cells data **with header** into clipboard |

Basic setup to enable clipboard (requires AllowSelection):

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .SelectionSettings(sel => sel.Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .Render()
```

## Copy via External Button

Use the `copy()` method to trigger clipboard copy programmatically:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()

<button onclick="copyRows()">Copy Selected</button>
<button onclick="copyWithHeader()">Copy With Header</button>

<script>
function copyRows() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.copy();  // copies without header
}
function copyWithHeader() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.copy(true);  // true = include header
}
</script>
```

## AutoFill

The AutoFill feature lets users drag the fill handle (bottom-right corner of selection) to copy cell data to adjacent cells.

**Requirements:** Selection `Mode` = `Cell`, `CellSelectionMode` = `Box`, EditMode = `Batch`.

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .EnableAutoFill(true)
    .SelectionSettings(sel =>
        sel.Mode(Syncfusion.EJ2.Grids.SelectionMode.Cell)
           .CellSelectionMode(Syncfusion.EJ2.Grids.CellSelectionMode.Box)
    )
    .EditSettings(edit =>
        edit.AllowAdding(true).AllowEditing(true).Mode(Syncfusion.EJ2.Grids.EditMode.Batch)
    )
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("Freight").HeaderText("Freight").EditType("numericedit").Width("120").Add();
        col.Field("ShipCity").HeaderText("Ship City").EditType("stringedit").Width("150").Add();
    })
    .Render()
```

**AutoFill Limitations:**
- Does not convert string to number/date — target cells may show `NaN` or empty
- Cannot create sequential series (not like Excel autofill series)
- Works only in viewport area with virtual/infinite scrolling enabled

## Paste

Paste copied cells into another set of cells within the grid.

1. Select source cells → `Ctrl + C`
2. Select target cells
3. Press `Ctrl + V`

**Requirements:** Selection `Mode` = `Cell`, `CellSelectionMode` = `Box`, EditMode = `Batch`.

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .SelectionSettings(sel =>
        sel.Mode(Syncfusion.EJ2.Grids.SelectionMode.Cell)
           .CellSelectionMode(Syncfusion.EJ2.Grids.CellSelectionMode.Box)
    )
    .EditSettings(edit =>
        edit.AllowEditing(true).Mode(Syncfusion.EJ2.Grids.EditMode.Batch)
    )
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("Freight").HeaderText("Freight").EditType("numericedit").Width("120").Add();
    })
    .Render()
```

**Paste Limitations:**
- String-to-number type mismatch shows `NaN`
- String-to-date type mismatch shows empty cell

## API Reference

| Method | Description |
|--------|-------------|
| `grid.copy()` | Copy selected rows/cells without header |
| `grid.copy(true)` | Copy selected rows/cells with header row |
