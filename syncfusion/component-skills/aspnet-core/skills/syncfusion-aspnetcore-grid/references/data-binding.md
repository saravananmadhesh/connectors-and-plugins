# Data Binding — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [DataTable Binding](#datatable-binding)
- [Remote Data Binding](#remote-data-binding)
- [OData Adaptor](#odata-adaptor)
- [WebAPI Adaptor](#webapi-adaptor)
- [URL Adaptor](#url-adaptor)
- [Loading Indicator](#loading-indicator)
- [Refresh Data Programmatically](#refresh-data-programmatically)

## When to Use This

- Bind grid to local arrays or collections
- Connect to remote APIs and Web services
- Use OData or URL adaptors
- Implement DataManager for data operations
- Display loading indicators during data fetch
- Refresh grid data programmatically

## ⚠️ Data Source Selection Rule — Choose the Right Approach

**Always default to local data (IEnumerable/List<T>) unless the requirement explicitly mentions a remote API, REST endpoint, or server-side data source.**

| Scenario | Use | How |
|----------|-----|-----|
| Data is provided inline, hardcoded, or from a local source (database query in controller) | **Local IEnumerable** | `dataSource="@ViewBag.Data"` or strongly-typed model property |
| Requirement explicitly mentions REST API, remote URL, OData endpoint, or server-side data source | **DataManager** | `<e-datamanager url="..." adaptor="..." />` |

- ✅ **Local IEnumerable/List<T>**: Used when data is queried from the database in the controller and passed to the view. No remote HTTP calls needed.
- ✅ **DataManager**: Used **only** when the requirement explicitly mentions connecting to a REST API, remote URL, OData service, or external data source.
- ❌ **Never** use `DataManager` with a remote URL when the requirement asks for local/static data — it will cause data loading errors if the URL does not exist or the endpoint is not accessible.

## Overview

The Grid binds data using the `dataSource` property, which accepts:
- An `IEnumerable` / `List<T>` for local data (recommended for most scenarios)
- A `DataManager` instance for remote data (REST APIs, OData services, only when required)

## Local Data Binding

Assign a C# collection directly to `dataSource` via `ViewBag` or strongly-typed model:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

```csharp
// Controller or PageModel
ViewBag.DataSource = OrdersDetails.GetAllRecords();
```

## DataTable Binding

Bind a `DataTable` from server-side by serializing it:

```cshtml
<ejs-grid id="grid" dataSource=((System.Data.DataTable)ViewBag.DataSource) allowPaging="true">      
  <e-grid-columns>
    <e-grid-column field="OrderID" headerText="Order ID" textAlign="Right" width="120"></e-grid-column>
    <e-grid-column field="CustomerID" headerText="Customer Name" width="150"></e-grid-column>
  </e-grid-columns>
</ejs-grid>
```

```csharp
public void OnGet()
{
    DataTable ordersTable = new DataTable("Orders");
    ordersTable.Columns.AddRange(new DataColumn[5]
    {
        new DataColumn("OrderID", typeof(long)),
        new DataColumn("CustomerID", typeof(string)),
    });
    ordersTable.Rows.Add(10001, "ALFKI");
    ordersTable.Rows.Add(10002, "ANATR");
    ViewData["DataSource"] = ordersTable
}
```

## Remote Data Binding

Use `<e-data-manager>` tag helper inside `<ejs-grid>` to connect to a remote service:

```cshtml
<ejs-grid id="Grid" allowPaging="true">
    <e-data-manager url="/Home/UrlDatasource" adaptor="UrlAdaptor"></e-data-manager>
    <e-grid-pagesettings pageSize="10"></e-grid-pagesettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

## OData Adaptor

Connect to an OData v4 endpoint:

```cshtml
<ejs-grid id="Grid" allowPaging="true">
    <e-data-manager url="url"
                    adaptor="ODataV4Adaptor" crossDomain="true"></e-data-manager>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

## WebAPI Adaptor

Connect to a Web API controller:

```cshtml
<ejs-grid id="Grid" allowPaging="true">
    <e-data-manager url="/api/Orders" adaptor="WebApiAdaptor"></e-data-manager>
    <e-grid-pagesettings pageSize="10"></e-grid-pagesettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

Server-side controller must return `DataResult` with `result` and `count`:

```csharp
public IActionResult Get([FromQuery] DataManagerRequest dm)
{
    var data = OrdersDetails.GetAllRecords();
    IEnumerable<OrdersDetails> DataSource = data;
    DataOperations operation = new DataOperations();
    if (dm.Search != null && dm.Search.Count > 0) DataSource = operation.PerformSearching(DataSource, dm.Search);
    if (dm.Sorted != null && dm.Sorted.Count > 0) DataSource = operation.PerformSorting(DataSource, dm.Sorted);
    if (dm.Where != null && dm.Where.Count > 0) DataSource = operation.PerformFiltering(DataSource, dm.Where, dm.Where[0].Operator);
    int count = DataSource.Cast<OrdersDetails>().Count();
    if (dm.Skip != 0) DataSource = operation.PerformSkip(DataSource, dm.Skip);
    if (dm.Take != 0) DataSource = operation.PerformTake(DataSource, dm.Take);
    return dm.RequiresCounts ? Json(new { result = DataSource, count }) : Json(DataSource);
}
```

## URL Adaptor

Use for custom endpoints that accept DataManager query parameters:

```cshtml
<e-data-manager url="/Home/UrlDatasource" adaptor="UrlAdaptor"></e-data-manager>
```

## Loading Indicator

Show a loading animation while data fetches. Supports `Spinner` (default) or `Shimmer`:

Set via tag helper:
```cshtml
<ejs-grid id="Grid">
    <e-grid-loadingindicator indicatorType="Shimmer"></e-grid-loadingindicator>
</ejs-grid>
```

## Refresh Data Programmatically

To update the grid's data at runtime, reassign the `dataSource` property and call `refresh()`:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.dataSource = newDataArray;
grid.refresh();
```
