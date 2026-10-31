# Row in ASP.NET MVC Grid

Configure row appearance, templates, drag-and-drop, pinning, and spanning.

## When to Use This

Use this reference when you need to:
- Create custom row templates
- Add expandable detail rows
- Enable row drag-and-drop
- Apply conditional row styling
- Set row height
- Enable row spanning

## Table of Contents
- [Row Template](#row-template)
- [Detail Template](#detail-template)
- [Row Spanning](#row-spanning)
- [Row Drag and Drop](#row-drag-and-drop)
- [Row Pinning (Frozen Rows)](#row-pinning-frozen-rows)
- [Row Height](#row-height)
- [Row Styling with RowDataBound](#row-styling-with-rowdatabound)
- [Alt Row Styling](#alt-row-styling)
- [Selected Row Styling](#selected-row-styling)
- [Get Row by Primary Key](#get-row-by-primary-key)

## Row Template

Replace the entire row content with a custom template:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .RowTemplate("#rowTemplate")
    .Columns(col => {
        col.HeaderText("Employee Image").Width("150").Add();
        col.HeaderText("Employee Details").Width("300").Add();
    })
    .Render()
```

```html
<script id="rowTemplate" type="text/x-template">
    <tr>
        <td class="rowphoto">
            <img src="/images/${EmployeeID}.png" alt="${EmployeeName}" />
        </td>
        <td class="details">
            <table><tr><td>${FirstName} ${LastName}</td></tr>
            <tr><td>${Title}</td></tr></table>
        </td>
    </tr>
</script>
```

> Use `DetailTemplate` for expandable row details instead.

## Detail Template

Show expanded detail content below a row:

```cshtml
@Html.EJS().Grid("Grid")
    .DetailTemplate("#detailTemplate")
    .Columns(col => { /* ... */ })
    .Render()
```

```html
<script id="detailTemplate" type="text/x-template">
    <div>
        <p><b>Name:</b> ${FirstName} ${LastName}</p>
        <p><b>Title:</b> ${Title}</p>
        <p><b>City:</b> ${City}</p>
    </div>
</script>
```

Expand/collapse programmatically:
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.detailRowModule.expand(2);    // expand row index 2
grid.detailRowModule.collapse(2);  // collapse row index 2
grid.detailRowModule.expandAll();  // expand all
grid.detailRowModule.collapseAll();
```

## Row Spanning

Span cells across multiple rows using `QueryCellInfo` event:

```javascript
function queryCellInfo(args) {
    if (args.column.field === 'CustomerID' && args.data.OrderID === 10248) {
        args.rowSpan = 3; // span 3 rows
    }
}
```

```cshtml
@Html.EJS().Grid("Grid")
    .QueryCellInfo("queryCellInfo")
    .Columns(col => { /* ... */ })
    .Render()
```

## Row Drag and Drop

Reorder rows by dragging. Enable with `AllowRowDragAndDrop(true)`:

```cshtml
@Html.EJS().Grid("Grid")
    .AllowRowDragAndDrop(true)
    .Columns(col => { /* ... */ })
    .Render()
```

Drag rows to another grid:
```cshtml
@Html.EJS().Grid("DestGrid")
.AllowRowDragAndDrop(true)
.RowDropSettings(drop => drop.TargetID("DestGrid"))
```

Events: `RowDragStartHelper`, `RowDragStart`, `RowDrag`, `RowDrop`

```javascript
function rowDrop(args) {
    console.log('Dropped at index:', args.dropIndex);
    console.log('Dragged data:', args.data);
}
```

## Row Pinning (Frozen Rows)

Freeze rows at the top of the grid:

```cshtml
@Html.EJS().Grid("Grid")
    .FrozenRows(2)  // freeze first 2 rows
    .Columns(col => { /* ... */ })
    .Render()
```

## Row Height

Set uniform row height:

```cshtml
@Html.EJS().Grid("Grid")
    .RowHeight(60)
    .Columns(col => { /* ... */ })
    .Render()
```

## Row Styling with RowDataBound

Apply CSS classes to rows based on data:

```cshtml
.RowDataBound("rowDataBound")
```

```javascript
function rowDataBound(args) {
    if (args.data.Freight > 100) {
        args.row.classList.add('high-freight');
    }
}
```

## Alt Row Styling

Enable alternate row background coloring:

```cshtml
.EnableAltRow(true)
```

## Selected Row Styling

Access selected rows:
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
var selectedRows = grid.getSelectedRows();       // TR elements
var selectedRecords = grid.getSelectedRecords(); // data objects
```

## Get Row by Primary Key

```javascript
var rowIndex = grid.getRowIndexByPrimaryKey(10248);
var rowElement = grid.getRowByIndex(2);
```
