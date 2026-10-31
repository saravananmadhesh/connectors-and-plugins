# Data Binding in QueryBuilder

## Table of Contents
- [Local Data](#local-data)
- [Remote Data](#remote-data)
  - [OData](#odata)
  - [ODataV4](#odatav4)
  - [WebAPI](#web-api)
  - [UrlAdaptor](#urladaptor)
- [Using getPredicate with DataManager](#using-getpredicate-with-datamanager)
- [Grid Integration](#grid-integration-with-querybuilder)

---

## Local Data

Bind a local JavaScript/C# array to the `dataSource` property. The QueryBuilder uses this to populate column dropdowns and validate values.

**Controller / PageModel:**
```csharp
public IActionResult Index()
{
    ViewBag.Employees = EmployeeView.GetAllRecords();
    return View();
}
```

**View:**
```cshtml
<ejs-querybuilder id="querybuilder" dataSource="@ViewBag.Employees" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

> **Note:** DataManager uses `JsonAdaptor` by default for local data.

You can also instantiate a `DataManager` client-side and set it to the QueryBuilder's `dataSource`:

```javascript
var dataManager = new ej.data.DataManager({
    json: employeesArray,
    adaptor: new ej.data.JsonAdaptor()
});
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
qb.dataSource = dataManager;
```

---

## Remote Data

Assign a `DataManager` instance using `<e-data-manager>` to bind remote service data.

> **Note:** DataManager uses `ODataAdaptor` by default for remote data.

### OData

```cshtml
<ejs-querybuilder id="querybuilder" width="70%">
    <e-data-manager url="url"
        adaptor="ODataAdaptor" crossDomain="true">
    </e-data-manager>
    <e-querybuilder-columns>
        <e-querybuilder-column field="OrderID" label="Order ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="CustomerID" label="Customer ID" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="ShipCity" label="Ship City" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

### ODataV4

```cshtml
<ejs-querybuilder id="querybuilder" width="70%">
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
    <e-querybuilder-columns>
        <e-querybuilder-column field="OrderID" label="Order ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="CustomerID" label="Customer" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

### Web API

Bind to a Web API endpoint using `WebApiAdaptor` (OData-compatible endpoint):

```cshtml
<ejs-querybuilder id="querybuilder" width="70%">
    <e-data-manager url="/api/employees" adaptor="WebApiAdaptor">
    </e-data-manager>
    <e-querybuilder-columns>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

### UrlAdaptor

Fetch data from a custom server-side endpoint:

```cshtml
<ejs-querybuilder id="querybuilder" width="70%">
    <e-data-manager url="/Home/GetEmployees" adaptor="UrlAdaptor">
    </e-data-manager>
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

**Controller action:**
```csharp
[HttpPost]
public IActionResult GetEmployees([FromBody] DataManagerRequest dm)
{
    IEnumerable<EmployeeView> data = EmployeeView.GetAllRecords();
    DataOperations operation = new DataOperations();
    int count = data.Count();
    if (dm.Skip != 0) data = operation.PerformSkip(data, dm.Skip);
    if (dm.Take != 0) data = operation.PerformTake(data, dm.Take);
    return dm.RequiresCounts
        ? Json(new { result = data, count = count })
        : Json(data);
}
```

---

## Using getPredicate with DataManager

After the user builds rules in QueryBuilder, use `getPredicate()` to filter a local DataManager and get matching records:

```cshtml
<ejs-querybuilder id="querybuilder" dataSource="@ViewBag.Employees" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<button onclick="filterData()">Filter Data</button>
<div id="results"></div>

<script>
    function filterData() {
        var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
        var predicate = qb.getPredicate(qb.getRules());

        if (predicate) {
            var dataManager = new ej.data.DataManager(employeesArray);
            dataManager.executeLocal(new ej.data.Query().where(predicate))
                .then(function(result) {
                    console.log('Filtered records:', result);
                });
        }
    }
</script>
```

---

## Grid Integration with QueryBuilder

QueryBuilder can drive a Grid's `query` property in real time. Use `UrlAdaptor` on the Grid so that requests go to the server with current filter conditions.

```cshtml
@* QueryBuilder — no dataSource needed, just define columns *@
<ejs-querybuilder id="querybuilder" width="70%" ruleChange="ruleChanged">
    <e-querybuilder-columns>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

@* Grid with UrlAdaptor — receives filtered query from QueryBuilder *@
<ejs-grid id="Grid" allowPaging="true">
    <e-data-manager url="/Home/UrlDataSource" adaptor="UrlAdaptor"></e-data-manager>
    <e-grid-columns>
        <e-grid-column field="EmployeeID" headerText="Employee ID"></e-grid-column>
        <e-grid-column field="FirstName" headerText="First Name"></e-grid-column>
        <e-grid-column field="Country" headerText="Country"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
    function ruleChanged(args) {
        var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
        var grid = ej.base.getInstance(document.getElementById("Grid"), ejs.grids.Grid);
        // Build a DataManager query from the current rules
        var rules = qb.getRules();
        var predicate = qb.getPredicate(rules);
        if (predicate) {
            grid.query = new ej.data.Query().where(predicate);
        } else {
            grid.query = new ej.data.Query();
        }
        grid.refresh();
    }
</script>
```

**Controller:**
```csharp
[HttpPost]
public IActionResult UrlDataSource([FromBody] DataManagerRequest dm)
{
    IEnumerable<EmployeeView> data = EmployeeView.GetAllRecords();
    DataOperations operation = new DataOperations();
    int count = data.Count();
    if (dm.Where != null && dm.Where.Count > 0)
        data = operation.PerformFiltering(data, dm.Where, dm.Where[0].Operator);
    if (dm.Skip != 0) data = operation.PerformSkip(data, dm.Skip);
    if (dm.Take != 0) data = operation.PerformTake(data, dm.Take);
    return dm.RequiresCounts
        ? Json(new { result = data, count = count })
        : Json(data);
}
```

> **UrlAdaptor behavior:** Only fetches the current page's records. Every Grid action (page, sort, filter) sends a new request to the server — QueryBuilder conditions are included automatically.

## See Also

- [Import & Export](querybuilder-import-export.md) — Convert rules to SQL/MongoDB queries
- [Filtering & Rule Management](querybuilder-filtering-and-rules.md) — Programmatic rule manipulation
