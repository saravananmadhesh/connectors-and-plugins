# Hierarchy Grid in ASP.NET MVC Grid

Display parent-child relationships in a grid with expandable/collapsible rows.

## When to Use This

Use this reference when you need to:
- Create parent-child relationships between data
- Display nested grids with hierarchy
- Pass a related key from parent to child
- Dynamically bind child data based on parent
- Expand/collapse rows programmatically

## Table of Contents
- [Basic Hierarchy Grid](#basic-hierarchy-grid)
- [Controller: Pass Both DataSources](#controller-pass-both-datasources)
- [Expand Child Grid Initially](#expand-child-grid-initially)
- [Different Field Names for Parent-Child Mapping](#different-field-names-for-parent-child-mapping)
- [Dynamically Bind Child Data Using DetailDataBound](#dynamically-bind-child-data-using-detaildetailatabound)
- [Add Record to Child Grid](#add-record-to-child-grid)
- [Programmatic Expand/Collapse](#programmatic-expandcollapse)
- [Events](#events)
- [Limitations](#limitations)

## Basic Hierarchy Grid

Use `ChildGrid()` and `QueryString` to define the parent-child relationship:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.Employees)
    .ChildGrid(child => {
        child.DataSource((IEnumerable<object>)ViewBag.Orders)
             .QueryString("EmployeeID")  // field name used to filter child records
             .Columns(col => {
                 col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
                 col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
                 col.Field("Freight").HeaderText("Freight").Format("C2").Width("100").Add();
             });
    })
    .Columns(col => {
        col.Field("EmployeeID").HeaderText("Employee ID").Width("100").Add();
        col.Field("FirstName").HeaderText("First Name").Width("150").Add();
        col.Field("City").HeaderText("City").Width("150").Add();
    })
    .Render()
```

- The child grid automatically filters records where `EmployeeID` equals the parent row's `EmployeeID`
- Grid supports n levels of nesting

## Controller: Pass Both DataSources

```csharp
public ActionResult Index()
{
    ViewBag.Employees = GetEmployees();
    ViewBag.Orders = GetOrders();
    return View();
}
```

## Expand Child Grid Initially

Use the `expand()` method in the `DataBound` event to expand a specific row:

```cshtml
@Html.EJS().Grid("Grid").DataBound("dataBound")
    .ChildGrid(child => { /* ... */ })
    .Columns(col => { /* ... */ })
    .Render()

<script>
function dataBound() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    // Expand the first row (index 0)
    grid.detailRowModule.expand(0);
}
</script>
```

> Index values begin with **0**.

## Different Field Names for Parent-Child Mapping

When parent and child use different field names, customize the mapping in the child grid's `Load` event:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.Employees)
    .ChildGrid(child => {
        child.DataSource((IEnumerable<object>)ViewBag.Orders)
             .QueryString("EmployeeID")
             .Load("childLoad")
             .Columns(col => {
                 col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
             });
    })
    .Columns(col => {
        col.Field("EmpID").HeaderText("Emp ID").Width("100").Add();
    })
    .Render()

<script>
function childLoad() {
    // 'this' refers to the child grid
    var parentRow = this.parentDetails.parentRowData;
    this.parentDetails.parentKeyFieldValue = parentRow['EmpID'];
}
</script>
```

## Dynamically Bind Child Data Using DetailDataBound

Filter child data based on parent row data in the `DetailDataBound` event:

```javascript
function detailDataBound(args) {
    var childGrid = args.detailElement.querySelector('.e-grid');
    if (childGrid) {
        var grid = childGrid.ej2_instances[0];
        // Filter orders by parent EmployeeID
        var data = new ej.data.DataManager(window.allOrders)
            .executeLocal(new ej.data.Query()
                .where('EmployeeID', 'equal', args.data['EmployeeID']));
        grid.dataSource = data;
    }
}
```

## Add Record to Child Grid

Set the `QueryString` value in the child grid's `ActionBegin` event when adding new records:

```javascript
function childActionBegin(args) {
    if (args.requestType === 'add') {
        // Get EmployeeID from parent row
        var parentRow = this.parentDetails.parentRowData;
        args.data['EmployeeID'] = parentRow['EmployeeID'];
    }
}
```

## Programmatic Expand/Collapse

```javascript
var grid = document.getElementById("Grid").ej2_instances[0];
grid.detailRowModule.expand(rowIndex);    // expand row at index
grid.detailRowModule.collapse(rowIndex);  // collapse row at index
grid.detailRowModule.expandAll();         // expand all rows
grid.detailRowModule.collapseAll();       // collapse all rows
```

## Events

| Event | Description |
|-------|-------------|
| `DetailDataBound` | Fires when child grid is expanded |
| `Load` (child grid) | Fires before child grid loads — customize query |

## Limitations

- Hierarchy grid is not supported with **Detail Template**
- Searching operates independently for parent and child grids (no cross-grid search)
