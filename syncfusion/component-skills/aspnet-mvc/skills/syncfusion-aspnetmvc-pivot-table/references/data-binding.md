# Data Binding in ASP.NET MVC Pivot Table

## ⚠️ SECURITY NOTICE

**All remote data connections MUST use authenticated, configuration-based endpoints.** Never hardcode URLs or use untrusted data sources.

✅ **Required Security Controls:**
- Configuration-based URLs (Web.config, ConfigurationManager)
- Authentication and authorization (AuthorizeAttribute)
- HTTPS/SSL for all remote connections
- Parameterized queries for database access
- Input validation and sanitization

## Table of Contents
- [Local JSON Binding](#local-json-binding)
- [Remote JSON Binding](#remote-json-binding)
- [CSV Data Binding](#csv-data-binding)
- [Format Settings](#format-settings)
- [Mapping](#mapping)
- [Values in Row Axis](#values-in-row-axis)
- [Values at Different Positions](#values-at-different-positions)
- [Show 'No Data' Items](#show-no-data-items)
- [Show Value Headers Always](#show-value-headers-always)
- [Customize Empty Value Cells](#customize-empty-value-cells)
- [OData Services](#odata-services)
- [OData V4 Services](#odata-v4-services)
- [Web API](#web-api)
- [Querying in Data Manager](#querying-in-data-manager)
- [Best Practices](#best-practices)

## Local JSON Binding

Bind JSON data directly from an IEnumerable collection passed from the controller via ViewBag:

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.DataSource = GetPivotData();
    return View();
}

private IEnumerable GetPivotData()
{
    return new List<PivotData>
    {
        new PivotData { Country = "USA", Year = "2021", Amount = 100000, Sold = 50 },
        new PivotData { Country = "USA", Year = "2022", Amount = 120000, Sold = 60 },
        new PivotData { Country = "Canada", Year = "2021", Amount = 80000, Sold = 40 }
    };
}

public class PivotData
{
    public string Country { get; set; }
    public string Year { get; set; }
    public double Amount { get; set; }
    public int Sold { get; set; }
}
```

**View:**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Amount").Caption("Sales Amount").Add();
            values.Name("Sold").Caption("Units Sold").Add();
        })).Height("450").Width("100%").Render()
```

**Key Points:**
- Field names in `.Name()` are **case-sensitive** and must match data properties exactly
- Use `(IEnumerable<object>)ViewBag.DataSource` to cast the data in the view
- All row, column, and value fields must be explicitly defined

## Remote JSON Binding

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

Connect to remote JSON data sources using the URL property:

**Step 1 — Add configuration to Web.config:**
```xml
<configuration>
  <appSettings>
    <add key="DataSource:JsonUrl" value="https://your-server.com/api/sales-data.json" />
  </appSettings>
</configuration>
```

**Step 2 — Controller with ConfigurationManager:**
```csharp
public ActionResult Index()
{
    ViewBag.JsonUrl = System.Configuration.ConfigurationManager.AppSettings["DataSource:JsonUrl"];
    return View();
}
```

**Step 3 — View:**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.JsonUrl)
        .ExpandAll(false)
        .Rows(rows => {
            rows.Name("EnerType").Add();
        })
        .Columns(columns => {
            columns.Name("EneSource").Add();
        })
        .Values(values => {
            values.Name("PowUnits").Add();
            values.Name("ProCost").Add();
        })).Height("450").Width("100%").Render()
```

**Features:**
- Supports both direct downloadable JSON files (*.json) and web service URLs
- Automatic data fetching and parsing by the component
- `.ExpandAll(false)` collapses field headers on initial load
- URL must be accessible from the client browser
- CORS must be properly configured for cross-domain requests

## CSV Data Binding

### Binding CSV data via local

Convert CSV data into a 2D string array and bind it directly to the Pivot Table:

**View with JavaScript function:**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource("getCSVData()")
        .Type(Syncfusion.EJ2.PivotView.DataSourceType.CSV)
        .Rows(rows => {
            rows.Name("Region").Add();
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Item Type").Add();
            columns.Name("Sales Channel").Add();
        })
        .Values(values => {
            values.Name("Total Cost").Add();
            values.Name("Total Revenue").Add();
            values.Name("Total Profit").Add();
        })).Height("450").Width("100%").Render()

<script>
function getCSVData() {
    var dataSource = [];
    var csvData = "Region,Country,Item Type,Sales Channel,Total Cost,Total Revenue,Total Profit\r\nNorth America,Canada,Vegetables,Online,274426.74,464953.08,190526.34\r\nEurope,Armenia,Cereal,Online,1115824.08,1959909.60,844085.52\r\nSub-Saharan Africa,Eritrea,Cereal,Online,333060.84,585010.80,251949.96";
    var jsonObject = csvData.split(/\r?\n|\r/);
    for (var i = 0; i < jsonObject.length; i++) {
        if (!ej.base.isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== '') {
            dataSource.push(jsonObject[i].split(','));
        }
    }
    return dataSource;
}
</script>
```

**Key Points:**
- CSV data must be converted to a 2D string array format
- First row is treated as headers
- `.Type(Syncfusion.EJ2.PivotView.DataSourceType.CSV)` identifies the data as CSV
- DataSource receives a function reference (as string) that returns the array

### Binding CSV data via remote

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

Load CSV data from a remote URL:

**Web.config:**
```xml
<appSettings>
  <add key="DataSource:CsvUrl" value="https://your-server.com/api/sales" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.CsvUrl = ConfigurationManager.AppSettings["DataSource:CsvUrl"];
    return View();
}
```

**View:**
```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .Url((string)ViewBag.CsvUrl)
        .Type(Syncfusion.EJ2.PivotView.DataSourceType.CSV)
        .ExpandAll(false)
        .Rows(rows => {
            rows.Name("Region").Add();
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Item Type").Add();
            columns.Name("Sales Channel").Add();
        })
        .Values(values => {
            values.Name("Total Cost").Add();
            values.Name("Total Revenue").Add();
            values.Name("Total Profit").Add();
        })).Height("450").Width("100%").Render()
```

**Note:** CSV format is approximately 50% smaller than JSON, making it ideal for large datasets and reducing bandwidth usage.

## Format Settings

Apply number formatting to value fields:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Percentage").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .FormatSettings(formats => {
            formats.Name("Sales").Format("C2").Add();
            formats.Name("Percentage").Format("P2").Add();
        })).Height("450").Width("100%").Render()
```

**Available Formats:**
- `"N2"` - Number with decimals (1234.56)
- `"C2"` - Currency ($1,234.56)
- `"P2"` - Percentage (12.34%)
- `"E2"` - Exponential (1.23E+03)

## Mapping

Field mapping allows you to customize how fields appear and behave in the Pivot Table without changing the original data source. Use the `FieldMapping` property to configure field properties such as display names, data types, and aggregation methods:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .FieldMapping(fieldMappings => {
            fieldMappings.Name("Country").Caption("Sales Country").Axis("row").Add();
            fieldMappings.Name("Year").Caption("Fiscal Year").Axis("column").Add();
            fieldMappings.Name("Amount").Caption("Sales Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Axis("value").Add();
            fieldMappings.Name("Quantity").Caption("Units Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Axis("value").Add();
        })).Height("450").Width("100%").Render()
```

**Common Field Mapping Properties:**
- `Name` - Field name from data source
- `Caption` - Display name in UI
- `Axis` - Field position (row, column, value, filter)
- `Type` - Aggregation type (Sum, Avg, Product, Count, Min, Max, etc.)
- `ShowNoDataItems` - Display items even without data
- `ExpandAll` - Expand all headers on load
- `ShowFilterIcon` - Show filter button (default: true)
- `ShowSortIcon` - Show sort button (default: true)
- `AllowDragAndDrop` - Enable field dragging (default: true)



## Values in Row Axis

Display value fields in the row axis instead of columns using the `ValueAxis` property:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .ValueAxis("row")
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Add();
            values.Name("Amount").Caption("Sales Amount").Add();
        })).Height("450").Width("100%").Render()
```

**Result:**
```
Country     Product      Year    Quarter    Sold    Amount
USA         Bike         2021    Q1         100     50000
                                           250     120000
```

## Values at Different Positions

Position value fields at specific locations using the `ValueIndex` property:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .ExpandAll(true)
        .ValueIndex(1)
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Add();
            values.Name("Amount").Add();
        })).Height("450").Width("100%").Render()
```

**Notes:**
- `.ValueIndex(1)` places value fields at index 1 position
- Default value is -1 (places at the end)
- Only applicable for relational data sources
- Set `.ShowValuesButton(true)` to allow users to rearrange values

## Show 'No Data' Items

Display all field items in the Pivot Table, even when they lack data in certain row and column combinations:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").ShowNoDataItems(true).Add();
            rows.Name("Products").ShowNoDataItems(true).Add();
        })
        .Columns(columns => {
            columns.Name("Year").ShowNoDataItems(true).Add();
            columns.Name("Quarter").ShowNoDataItems(true).Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Add();
            values.Name("Amount").Caption("Sales Amount").Add();
        })).Height("450").Width("100%").Render()
```

**Effect:** Displays blank cells for items without data, providing a complete view of all possible combinations

## Show Value Headers Always

Ensure value headers remain visible even with a single value field:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .AlwaysShowValueHeader(true)
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Caption("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Add();
        })).Height("450").Width("100%").Render()
```

**Benefit:** Maintains consistent header visibility for better user experience

## Customize Empty Value Cells

Fill empty cells with custom text instead of leaving them blank:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .EmptyCellsTextContent("**")
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Caption("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Add();
            values.Name("Amount").Caption("Sales Amount").Add();
        })).Height("450").Width("100%").Render()
```

**Usage Examples:**
- `"**"` - Asterisk indicator
- `"-"` - Dash
- `"0"` - Zero value
- `"(blank)"` - Custom text
- `"N/A"` - Not available indicator

## OData Services

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

Connect to OData services using the ODataAdaptor:

**Web.config:**
```xml
<appSettings>
  <add key="DataSource:ODataUrl" value="https://your-odata-service.com/api/Orders/" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ODataUrl = ConfigurationManager.AppSettings["DataSource:ODataUrl"];
    return View();
}
```

**View:**
```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource(dataManger => {
            dataManger.Url((string)ViewBag.ODataUrl)
                .CrossDomain(true)
                .Adaptor("ODataAdaptor");
        })
        .ExpandAll(false)
        .ShowAggregationOnValueField(false)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("ShipCountry").Add();
            rows.Name("ShipCity").Add();
        })
        .Columns(columns => {
            columns.Name("CustomerID").Caption("Customer ID").Add();
        })
        .Values(values => {
            values.Name("Freight").Caption("Freight").Add();
        })).ShowFieldList(true).Height("450").Width("100%").Render()
```

## OData V4 Services

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

Use ODataV4Adaptor for OData V4 endpoints with enhanced query capabilities:

**Web.config:**
```xml
<appSettings>
  <add key="DataSource:ODataV4Url" value="https://your-odatav4-service.com/api/Orders/" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ODataV4Url = ConfigurationManager.AppSettings["DataSource:ODataV4Url"];
    return View();
}
```

**View:**
```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource(dataManger => {
            dataManger.Url((string)ViewBag.ODataV4Url)
                .CrossDomain(true)
                .Adaptor("ODataV4Adaptor");
        })
        .ExpandAll(false)
        .ShowAggregationOnValueField(false)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("ShipCountry").Add();
            rows.Name("ShipCity").Add();
        })
        .Columns(columns => {
            columns.Name("CustomerID").Caption("Customer ID").Add();
        })
        .Values(values => {
            values.Name("Freight").Caption("Freight").Add();
        })).ShowFieldList(true).Height("450").Width("100%").Render()
```

## Web API

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

Connect to RESTful Web API endpoints using WebApiAdaptor:

**Web.config:**
```xml
<appSettings>
  <add key="DataSource:WebApiUrl" value="https://your-api-service.com/api/orders" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.WebApiUrl = ConfigurationManager.AppSettings["DataSource:WebApiUrl"];
    return View();
}
```

**View:**
```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource(dataManger => {
            dataManger.Url((string)ViewBag.WebApiUrl)
                .CrossDomain(true)
                .Adaptor("WebApiAdaptor");
        })
        .ExpandAll(false)
        .ShowAggregationOnValueField(false)
        .EnableSorting(true)
        .FormatSettings(formatsettings => {
            formatsettings.Name("UnitPrice").Format("C0").UseGrouping(true).Add();
        })
        .Rows(rows => {
            rows.Name("ShipCountry").Add();
            rows.Name("ShipCity").Add();
        })
        .Columns(columns => {
            columns.Name("ProductName").Caption("Product Name").Add();
        })
        .Values(values => {
            values.Name("Quantity").Caption("Quantity").Add();
            values.Name("UnitPrice").Caption("Unit Price").Add();
        })).Height("450").Width("100%").Render()
```

## Querying in Data Manager

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

Apply custom queries to filter, sort, or limit data at the data source level using the Load event:

**Web.config:**
```xml
<appSettings>
  <add key="DataSource:ODataUrl" value="https://your-odata-service.com/api/Orders" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.ODataUrl = ConfigurationManager.AppSettings["DataSource:ODataUrl"];
    return View();
}
```

**View:**
```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource(dataManger => {
            dataManger.Url((string)ViewBag.ODataUrl)
                .CrossDomain(true)
                .Adaptor("ODataAdaptor");
        })
        .ExpandAll(false)
        .ShowAggregationOnValueField(false)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("ShipCountry").Add();
            rows.Name("ShipCity").Add();
        })
        .Columns(columns => {
            columns.Name("CustomerID").Caption("Customer ID").Add();
        })
        .Values(values => {
            values.Name("Freight").Caption("Freight").Add();
        })).Load("onLoad").ShowFieldList(true).Height("450").Width("100%").Render()

<script>
function onLoad(args) {
    var dataSource = args.dataSourceSettings.dataSource;
    // Apply filtering: only get first 2 records
    dataSource.defaultQuery = new ej.data.Query().take(2);
    
    // Example with where condition
    // dataSource.defaultQuery = new ej.data.Query()
    //     .where('ShipCountry', 'equal', 'USA')
    //     .take(10);
}
</script>
```

**Query Operations:**
- `.take(n)` - Limit number of records
- `.where(field, operator, value)` - Filter data
- `.orderBy(field)` - Sort ascending
- `.orderByDescending(field)` - Sort descending
- `.skip(n)` - Skip n records

## Best Practices

✓ **Security First** - Always use configuration-based URLs (Web.config) for remote data connections
✓ **Authentication** - Implement proper authentication and authorization for data endpoints  
✓ **HTTPS Only** - Use HTTPS/SSL for all remote connections
✓ **Field names** - Are **case-sensitive** and must match data source exactly
✓ **Local data** - Pass `IEnumerable<T>` via ViewBag from controller
✓ **Remote data** - Use ConfigurationManager for URLs; never hardcode endpoints
✓ **Test data** - Verify field names match with browser console
✓ **Large datasets** - Implement virtual scrolling or paging
✓ **CSV format** - Use for text-heavy data to reduce bandwidth
✓ **Data validation** - Ensure numbers aren't strings; validate all inputs
✓ **Format settings** - Apply consistent number formatting across value fields
✓ **Field mapping** - Ensure proper aggregation types for each field
