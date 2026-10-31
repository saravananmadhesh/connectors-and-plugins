# Columns in ASP.NET MVC Grid

Columns define the data fields rendered in the grid. Configure via the `Columns` builder. The `Field` property maps to a data source property name.

## When to Use This

Use this reference when you need to:
- Define and configure grid columns
- Set column width, alignment, and formatting
- Create column templates for custom content
- Implement foreign key columns
- Freeze, reorder, or resize columns
- Show/hide columns dynamically

## Table of Contents
- [Basic Column Definition](#basic-column-definition)
- [Key Column Properties](#key-column-properties)
- [Column Template](#column-template)
- [Header Template](#header-template)
- [Stacked Headers](#stacked-headers)
- [Auto-Generated Columns](#auto-generated-columns)
- [Complex Data Binding](#complex-data-binding)
- [Foreign Key Column](#foreign-key-column)
- [Column Chooser](#column-chooser)
- [Column Menu](#column-menu)
- [Column Reorder](#column-reorder)
- [Column Resizing](#column-resizing)
- [Column Spanning](#column-spanning)
- [Frozen Columns](#frozen-columns)
- [Show/Hide Columns Dynamically](#showhide-columns-dynamically)
- [AutoFit Columns](#autofit-columns)

## Basic Column Definition

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).TextAlign("Right").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer Name").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").TextAlign("Right").Width("120").Add();
        col.Field("OrderDate").HeaderText("Order Date").Format("yMd").Width("130").Add();
        col.Field("Verified").HeaderText("Verified").DisplayAsCheckBox(true).Width("100").Add();
    })
    .Render()
```

## Key Column Properties

| Property | Type | Description |
|----------|------|-------------|
| `Field` | string | Data source property name |
| `HeaderText` | string | Column header label |
| `Width` | string | Column width (px or %) |
| `Format` | string | Number/date format: `"C2"`, `"N2"`, `"yMd"` |
| `TextAlign` | string | `Left`, `Right`, `Center`, `Justify` |
| `IsPrimaryKey` | bool | Mark as primary key (required for editing) |
| `AllowEditing` | bool | Enable/disable editing; default true |
| `AllowFiltering` | bool | Enable/disable filtering; default true |
| `AllowSorting` | bool | Enable/disable sorting; default true |
| `AllowGrouping` | bool | Enable/disable grouping; default true |
| `Visible` | bool | Show/hide column |
| `DisplayAsCheckBox` | bool | Render boolean as checkbox |
| `DisableHtmlEncode` | bool | Render HTML markup in cells |
| `ClipMode` | enum | `Clip`, `EllipsisWithTooltip`, `Ellipsis` |
| `IsIdentity` | bool | Auto-increment; treated as read-only in edit |
| `DefaultValue` | string | Default value when adding new row |
| `MinWidth` | string | Minimum column width |
| `MaxWidth` | string | Maximum column width |
| `AllowReordering` | bool | Allow column reorder |
| `AllowResizing` | bool | Allow column resize |

## Column Template

Render custom content in a cell using `Template`. Access row data via `data` context variable:

```cshtml
col.Field("EmployeeName").HeaderText("Employee")
   .Template("<div><img src='${EmployeeImage}' /><span>${EmployeeName}</span></div>")
   .Width("200").Add();
```

## Header Template

Customize the column header:

```cshtml
col.Field("OrderID").HeaderTemplate("<span class='custom-header'>Order ID</span>").Add();
```

## Stacked Headers

Group multiple columns under a common header using `Columns` nesting:

```cshtml
col.HeaderText("Order Details").Columns(inner => {
    inner.Field("OrderID").HeaderText("ID").Width("100").Add();
    inner.Field("OrderDate").HeaderText("Date").Format("yMd").Width("130").Add();
}).Add();
```

## Auto-Generated Columns

Leave `Columns` empty to auto-generate based on data source keys:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource).Render()
```

## Complex Data Binding

Bind nested object properties using dot notation. In edit templates use `___` instead of `.`:

```cshtml
col.Field("Name.FirstName").HeaderText("First Name").Width("150").Add();
// Edit template name attribute: name="Name___FirstName"
```

## Foreign Key Column

Bind a foreign key to display a value from a related dataset:

```cshtml
col.Field("EmployeeID").HeaderText("Employee Name")
   .ForeignKeyValue("FirstName").ForeignKeyField("EmployeeID")
   .DataSource((IEnumerable<object>)ViewBag.Employees)
   .Width("150").Add();
```

## Column Chooser

Allow users to show/hide columns via a dialog. Enable with `ShowColumnChooser(true)` and add `"ColumnChooser"` to the toolbar:

```cshtml
@Html.EJS().Grid("Grid")
    .Toolbar(new List<string> { "ColumnChooser" })
    .ShowColumnChooser(true)
    .Columns(col => { /* columns */ })
    .Render()
```

Hide a column from the chooser dialog: `col.ShowInColumnChooser(false)`.

## Column Menu

Show a context menu per column header. Enable with `ShowColumnMenu(true)`:

```cshtml
@Html.EJS().Grid("Grid")
    .ShowColumnMenu(true)
    .Columns(col => { /* columns */ })
    .Render()
```

Prevent menu for a specific column: `col.ShowColumnMenu(false)`.

## Column Reorder

Allow drag-and-drop column reordering:

```cshtml
@Html.EJS().Grid("Grid").AllowReordering(true).Columns(col => { /* ... */ }).Render()
```

Prevent reorder for specific column: `col.AllowReordering(false)`.

Programmatic reorder:
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.reorderColumns('CustomerID', 'ShipCity'); // move CustomerID before ShipCity
grid.reorderColumnByIndex(0, 3);              // by index
```

## Column Resizing

Allow drag-to-resize column widths:

```cshtml
@Html.EJS().Grid("Grid").AllowResizing(true).Columns(col => { /* ... */ }).Render()
```

Set min/max width: `col.MinWidth("100").MaxWidth("300")`.

Resize modes:
- `Normal` (default): resize only the current column
- `Auto`: auto-fit all columns on resize

Prevent resize for specific column: `col.AllowResizing(false)`.

## Column Spanning

Merge cells across multiple columns using `QueryCellInfo` event:

```javascript
function queryCellInfo(args) {
    if (args.column.field === 'OrderID' && args.data.OrderID === 10248) {
        args.colSpan = 2; // span 2 columns
    }
}
```

Or use `EnableColumnSpan` property for header-level spanning.

## Frozen Columns

Pin columns to the left or right of the grid. Set `IsFrozen(true)` or use `FreezeDirection`:

```cshtml
col.Field("OrderID").HeaderText("Order ID").Width("120").IsFrozen(true).Add();
// Or using freeze direction:
col.Field("CustomerID").Width("150").Freeze("Left").Add();
col.Field("ShipCity").Width("150").Freeze("Right").Add();
```

Or freeze by count using the grid-level property:

```cshtml
@Html.EJS().Grid("Grid").FrozenColumns(2).Columns(col => { /* ... */ }).Render()
```

## Show/Hide Columns Dynamically

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.showColumns('CustomerID');   // show by header text
grid.hideColumns('CustomerID');   // hide by header text
grid.showColumns(['OrderID', 'Freight']); // multiple
```

## AutoFit Columns

```javascript
grid.autoFitColumns(['OrderID', 'CustomerID']); // fit specific columns
grid.autoFitColumns();                           // fit all columns
```
