# Hierarchy Grid — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Rules](#rules)
- [Overview](#overview)
- [Basic Hierarchy Grid Setup](#basic-hierarchy-grid-setup)
- [Expand and Collapse Programmatically](#expand-and-collapse-programmatically)
- [Lazy Loading Child Data](#lazy-loading-child-data)
- [Hierarchy Grid with Paging](#hierarchy-grid-with-paging)

## Rules

> ⚠️ Use either `childGrid` or `detailTemplate` — not both at the same time.

## When to Use This

- Display hierarchical data with nested grids
- Show expandable parent-child relationships
- Load child data on demand (lazy loading)
- Implement multi-level data structures
- Combine hierarchy with paging and sorting

---

## Overview

A hierarchy grid renders a child grid for each parent row. Click the expand icon on a row to reveal child records related to that parent. This is ideal for master-detail data relationships.

---

## Basic Hierarchy Grid Setup

Define the parent grid and a `childGrid` configuration using C# in the controller/page model:

```cshtml
var ChildGrid = new Syncfusion.EJ2.Grids.Grid()
{
    DataSource = ViewBag.DataSource,
    QueryString = "EmployeeID",
    Columns = new List<Syncfusion.EJ2.Grids.GridColumn> {
        new Syncfusion.EJ2.Grids.GridColumn(){ Field="OrderID", HeaderText="Order ID", Width="120" },
        new Syncfusion.EJ2.Grids.GridColumn(){ Field="CustomerID", HeaderText="Customer ID", Width="150" },
        new Syncfusion.EJ2.Grids.GridColumn(){ Field="ShipCity", HeaderText="Ship City", Width="120" },
        new Syncfusion.EJ2.Grids.GridColumn(){ Field="ShipName", HeaderText="Ship Name", Width="130" },
    },
};

<ejs-grid id="Grid" dataSource="@ViewBag.dataSource" childGrid="@ViewBag.childGrid">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Expand and Collapse Programmatically

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Expand row at index 2
grid.detailRowModule.expand(2);

// Collapse row at index 2
grid.detailRowModule.collapse(2);

// Expand all rows
grid.detailRowModule.expandAll();

// Collapse all rows
grid.detailRowModule.collapseAll();
```

---

## Lazy Loading Child Data

Load child grid data only when the row is expanded. Set `childGrid.DataSource` to a URL-based data manager:

```csharp
<ejs-grid id="Grid" dataSource="@ViewBag.EmployeeDataSource" childGrid="@ChildGrid" detailDataBound="detailDataBound" height="250">
    <e-grid-columns>
        <e-grid-column field="EmployeeID" headerText="Employee ID" textAlign="Right" width="80"></e-grid-column>
        <e-grid-column field="FirstName" headerText="Name" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

```javascript
function detailDataBound(args) {
    var ordersDataSource = @Html.Raw(JsonConvert.SerializeObject(ViewBag.DataSource));
    var employeeIdValue = args.data['EmployeeID'];
    var childGridData = new ej.data.DataManager(ordersDataSource).executeLocal(
        new ej.data.Query().where('EmployeeID', 'equal', employeeIdValue, true)
    );
    args.childGrid.query = new ej.data.Query();
    args.childGrid.dataSource = childGridData;        
}
```

The child grid automatically queries the API with the parent row's key when expanded.

---

## Hierarchy Grid with Paging

Enable paging on both parent and child grids independently:

```csharp
<ejs-grid id="Grid" dataSource="@ViewBag.EmployeeDataSource" childGrid="@ChildGrid" height="250">
    <e-grid-pagesettings pageSize=5>
    </e-grid-pagesettings>
    <e-grid-columns>
        <e-grid-column field="EmployeeID" headerText="Employee ID" textAlign="Right" width="80"></e-grid-column>
        <e-grid-column field="FirstName" headerText="Name" width="120"></e-grid-column>        
    </e-grid-columns>
</ejs-grid>
```

> Each expanded child grid has its own pager and state. Collapsing a row resets the child grid's state.
