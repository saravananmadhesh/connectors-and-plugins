# Data Binding in ASP.NET MVC Grid

Bind data to the grid using the `DataSource` property. Supports local `IEnumerable`, `DataTable`, and remote data via `DataManager`.

## When to Use This

Use this reference when you need to:
- Bind local data (IEnumerable, DataTable) to the grid
- Connect to remote data sources via REST APIs
- Use different data adaptors (WebApi, OData, custom)
- Show loading indicators during data fetch
- Handle dynamic datasource updates
- Configure immutable mode for large datasets

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Loading Indicator](#loading-indicator)
- [DataTable Binding](#datatable-binding)
- [Refresh DataSource Dynamically](#refresh-datasource-dynamically)
- [Immutable Mode](#immutable-mode)
- [ExpandoObject / DynamicObject Binding](#expandoobject--dynamicobject-binding)
- [Sending Custom Headers to Server](#sending-custom-headers-to-server)
- [Prevent Local Time Zone Conversion for Date Columns](#prevent-local-time-zone-conversion-for-date-columns)
- [Binding via AJAX/Fetch](#binding-via-ajaxfetch)

## Local Data Binding

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<OrdersDetails>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .AllowPaging(true)
    .Render()
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.DataSource = OrdersDetails.GetAllRecords();
    return View();
}
```

## Remote Data Binding

Use `DataManager` with an adaptor to connect to a REST API:

```cshtml
@Html.EJS().Grid("Grid")
    .DataSource(ds => ds.Url("/api/Orders").Adaptor("WebApiAdaptor"))
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .AllowPaging(true)
    .Render()
```

**Available Adaptors:**

| Adaptor | Use Case |
|---------|----------|
| `UrlAdaptor` | Custom REST endpoints returning `{ result, count }` |
| `WebApiAdaptor` | ASP.NET Web API endpoints |
| `ODataAdaptor` | OData v3 services |
| `ODataV4Adaptor` | OData v4 services |
| `JsonAdaptor` | Local JSON array |

## Loading Indicator

Show a spinner while data loads using `LoadingIndicator`:

```cshtml
@Html.EJS().Grid("Grid")
    .DataSource(ds => ds.Url("/api/Orders").Adaptor("WebApiAdaptor"))
    .LoadingIndicator(li => li.IndicatorType("Spinner"))
    .Render()
```

## DataTable Binding

```cshtml
@Html.EJS().Grid("Grid").DataSource((DataTable)ViewBag.DataTable).Render()
```

## Refresh DataSource Dynamically

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.dataSource = newData; // assign new data
```

Or refresh via property:
```javascript
grid.setProperties({ dataSource: newData });
```

## Immutable Mode

For large datasets, enable immutable mode to optimize rendering by only updating changed rows:

```cshtml
@Html.EJS().Grid("Grid").DataSource(...)
    .EnableImmutableMode(true)
    .Render()
```

## ExpandoObject / DynamicObject Binding

```csharp
// ExpandoObject
var data = new List<dynamic>();
dynamic row = new ExpandoObject();
row.OrderID = 10248;
row.CustomerID = "VINET";
data.Add(row);
ViewBag.DataSource = data;
```

## Sending Custom Headers to Server

Use a custom adaptor:
```javascript
ej.data.DataManager.prototype.onSuccess = function(data, request) {
    request.httpRequest.setRequestHeader("Authorization", "send_token");
};
```

## Prevent Local Time Zone Conversion for Date Columns

Set `columns.type` to `"date"` and handle serialization on the server side to prevent timezone offset issues.

## Binding via AJAX/Fetch

```javascript
fetch('/api/Orders')
    .then(res => res.json())
    .then(data => {
        var grid = document.getElementById('Grid').ej2_instances[0];
        grid.dataSource = data;
    });
```
