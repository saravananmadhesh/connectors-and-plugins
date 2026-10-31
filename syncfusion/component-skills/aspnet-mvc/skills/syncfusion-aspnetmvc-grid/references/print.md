# Print in ASP.NET MVC Grid

Print the grid content via toolbar button or programmatically.

## When to Use This

Use this reference when you need to:
- Print grid data from a toolbar button
- Trigger print via external buttons
- Print specific pages or all pages
- Print only selected records
- Handle print events
- Print hierarchy grids

## Table of Contents
- [Enable Print via Toolbar](#enable-print-via-toolbar)
- [Print via External Button](#print-via-external-button)
- [Print Mode](#print-mode)
- [Print Only Selected Records](#print-only-selected-records)
- [Print Hierarchy Grid](#print-hierarchy-grid)
- [Print Events](#print-events)

## Enable Print via Toolbar

Add `"Print"` to the toolbar items:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Toolbar(new List<string> { "Print" })
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .Render()
```

## Print via External Button

Use the `print()` method:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()

<button onclick="printGrid()">Print Grid</button>

<script>
function printGrid() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.print();
}
</script>
```

## Print Mode

By default, all pages are printed. To print only the currently visible page:

```cshtml
@Html.EJS().Grid("Grid").AllowPaging(true)
    .PrintMode(Syncfusion.EJ2.Grids.PrintMode.CurrentPage)
    .Toolbar(new List<string> { "Print" })
    .Columns(col => { /* ... */ })
    .Render()
```

| PrintMode | Description |
|-----------|-------------|
| `AllPages` (default) | Prints all pages of data |
| `CurrentPage` | Prints only the currently visible page |

## Print Only Selected Records

Use the `BeforePrint` event to replace grid rows with only selected rows:

```javascript
function beforePrint(args) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    var rows = grid.getSelectedRows();
    if (rows.length > 0) {
        // Replace all rows in the print element with only selected rows
        var tbody = args.element.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = '';
            rows.forEach(function(row) {
                tbody.appendChild(row.cloneNode(true));
            });
        }
    }
}
```

```cshtml
@Html.EJS().Grid("Grid")
    .BeforePrint("beforePrint")
    .SelectionSettings(sel => sel.Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .Toolbar(new List<string> { "Print" })
    .Columns(col => { /* ... */ })
    .Render()
```

## Print Hierarchy Grid

Control which child grids are included in the print output:

```cshtml
@Html.EJS().Grid("Grid")
    .HierarchyPrintMode(Syncfusion.EJ2.Grids.HierarchyGridPrintMode.Expanded)
    .ChildGrid(child => {
        child.QueryString("EmployeeID").Columns(col => { /* ... */ });
    })
    .Toolbar(new List<string> { "Print" })
    .Columns(col => { /* ... */ })
    .Render()
```

| HierarchyPrintMode | Description |
|-------------------|-------------|
| `Expanded` (default) | Print parent + currently expanded child grids |
| `All` | Print parent + all child grids (expanded and collapsed) |
| `None` | Print parent grid only |

## Print Events

| Event | Description |
|-------|-------------|
| `BeforePrint` | Fires before printing begins — customize the print element |
| `PrintComplete` | Fires after printing is complete |

```javascript
function beforePrint(args) {
    // args.element: the clone of the grid element used for printing
    // Customize args.element before it is sent to the printer
    args.element.querySelector('.e-toolbar').style.display = 'none'; // hide toolbar in print
}

function printComplete(args) {
    console.log('Printing completed');
}
```
