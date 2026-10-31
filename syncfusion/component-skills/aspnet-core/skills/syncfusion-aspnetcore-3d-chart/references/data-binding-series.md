# Data Binding & Series Configuration

## Table of Contents
- [Local Data Binding](#local-data-binding)
  - [Basic Local Data Binding](#basic-local-data-binding)
  - [Multiple Series with Local Data](#multiple-series-with-local-data)
- [Remote Data Binding](#remote-data-binding)
  - [DataManager with Remote Endpoint](#datamanager-with-remote-endpoint)
  - [DataManager Configuration](#datamanager-configuration)
  - [Incremental Data Loading](#incremental-data-loading)
- [OData Adaptor](#odata-adaptor)
  - [Basic OData Configuration](#basic-odata-configuration)
  - [OData with Local Service](#odata-with-local-service)
- [Empty Points Handling](#empty-points-handling)
  - [Default Empty Point Handling](#default-empty-point-handling)
  - [Connect Empty Points](#connect-empty-points)
  - [Show Average for Empty Points](#show-average-for-empty-points)
  - [Custom Empty Point Style](#custom-empty-point-style)
- [XName and YName Mapping](#xname-and-yname-mapping)
  - [Simple Property Mapping](#simple-property-mapping)
  - [DateTime XName](#datetime-xname)
- [Query Filtering](#query-filtering)
  - [Basic Filtering](#basic-filtering)
  - [Multiple Filter Conditions](#multiple-filter-conditions)
  - [Practical Example: Filtered Remote Data](#practical-example-filtered-remote-data)

## Local Data Binding

Local data binding is the simplest approach where you provide data directly from your controller or model. A simple JSON data can be bound to the 3D chart using `DataSource` property in series. Now map the fields in JSON to `XName` and `YName` properties.

### Basic Local Data Binding

**Model:**
```csharp
public class SalesData
{
    public string Quarter { get; set; }
    public double Revenue { get; set; }
}
```

**Controller:**
```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        List<SalesData> salesData = new List<SalesData>
        {
            new SalesData { Quarter = "Q1", Revenue = 100000 },
            new SalesData { Quarter = "Q2", Revenue = 150000 },
            new SalesData { Quarter = "Q3", Revenue = 120000 },
            new SalesData { Quarter = "Q4", Revenue = 180000 }
        };
        return View(salesData);
    }
}
```

**View (Razor):**
```cshtml
<ejs-chart3d id="chart" title="Quarterly Revenue" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Quarter" 
                          yName="Revenue" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### Multiple Series with Local Data

When binding multiple series from the same data source:

```cshtml
<ejs-chart3d id="chart" title="Sales Comparison" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@ViewBag.ChartData" 
                          xName="Month" 
                          yName="Sales" 
                          name="Current Year"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        
        <e-chart3d-series dataSource="@ViewBag.ChartData" 
                          xName="Month" 
                          yName="PreviousSales" 
                          name="Previous Year"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

Both series reference the same `@ViewBag.ChartData` but map to different properties (`Sales` vs `PreviousSales`).

**Performance Note:** For datasets larger than 10,000 rows, consider remote data binding with server-side filtering.

## Remote Data Binding

Remote data binding fetches data from a server endpoint, enabling support for large datasets and dynamic updates. The remote data can be bound to the 3D chart using the `DataManager`. The `DataManager` requires minimal information like web service URL, adaptor and cross domain to interact with service endpoint properly. Assign the instance of the `DataManager` to the `DataSource` property in series and map the fields of data to `XName` and `YName` properties. You can also use the `Query` property of the series to filter the data.

### DataManager with Remote Endpoint

**Model:**
```csharp
public class OrderData
{
    public int OrderID { get; set; }
    public string CustomerName { get; set; }
    public double OrderAmount { get; set; }
    public DateTime OrderDate { get; set; }
}
```

**API Controller:**
```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpGet("get")]
    public IActionResult GetOrders()
    {
        var orders = new List<OrderData>
        {
            new OrderData { OrderID = 1, CustomerName = "Acme", OrderAmount = 5000, OrderDate = DateTime.Now.AddMonths(-3) },
            new OrderData { OrderID = 2, CustomerName = "Beta Corp", OrderAmount = 7500, OrderDate = DateTime.Now.AddMonths(-2) },
            new OrderData { OrderID = 3, CustomerName = "Gamma Ltd", OrderAmount = 6200, OrderDate = DateTime.Now.AddMonths(-1) }
        };
        return Ok(orders);
    }
}
```

**View with DataManager:**
```cshtml
<ejs-chart3d id="chart" title="Remote Order Data" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series xName="CustomerName" 
                          yName="OrderAmount" 
                          name="Order Amount"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            <e-data-manager url="https://your-api.com/api/orders/get" 
                                 adaptor="UrlAdaptor">
            </e-data-manager>
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### DataManager Configuration

```cshtml
<e-data-manager url="/api/orders/get" 
                     adaptor="UrlAdaptor"
                     crossDomain="false">
</e-data-manager>
```

**DataManager Properties:**
| Property | Purpose | Example |
|----------|---------|---------|
| `url` | API endpoint URL | `/api/data/get` |
| `adaptor` | Data format adapter | UrlAdaptor, ODataAdaptor, JsonAdaptor |
| `crossDomain` | Enable CORS requests | true/false |

### Incremental Data Loading

For very large datasets, fetch data in chunks:

```cshtml
<e-data-manager url="/api/orders/get?skip=0&take=50" 
                     adaptor="UrlAdaptor">
</e-data-manager>
```

Implement server-side pagination:

```csharp
[HttpGet("get")]
public IActionResult GetOrders(int skip = 0, int take = 50)
{
    var allOrders = GetAllOrders();
    var pagedOrders = allOrders.Skip(skip).Take(take).ToList();
    return Ok(pagedOrders);
}
```

## OData Adaptor

OData (Open Data Protocol) is a standardized protocol for CRUD operations. Use ODataAdaptor for OData-compliant services.

### Basic OData Configuration

```cshtml
<ejs-chart3d id="chart" title="OData Service Data" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series xName="ProductName" 
                          yName="UnitPrice" 
                          name="Price"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc/Products" 
                                 adaptor="ODataAdaptor"
                                 crossDomain="true">
            </e-data-manager>
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### OData with Local Service

If using a local OData service (e.g., built with Entity Framework):

```cshtml
<e-data-manager url="/odata/products" 
                     adaptor="ODataAdaptor">
</e-data-manager>
```

**Controller Setup (Entity Framework):**
```csharp
[ApiController]
[Route("odata/[controller]")]
public class ProductsController : ODataController
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [EnableQuery]
    public IActionResult Get()
    {
        return Ok(_context.Products);
    }
}
```

Register OData in `Program.cs`:

```csharp
builder.Services.AddControllers()
    .AddOData(opt => opt
        .AddRouteComponents("odata", GetEdmModel())
        .Select().Filter().OrderBy().Expand().Count().SetMaxTop(null));
```

## Empty Points Handling

Empty points occur when data contains `null` or `undefined` values. By default, empty points are ignored (gap mode).

### Default Empty Point Handling

```csharp
var data = new List<ChartData>
{
    new ChartData { Month = "Jan", Sales = 35 },
    new ChartData { Month = "Feb", Sales = null }, // Empty point
    new ChartData { Month = "Mar", Sales = 34 }
};
```

Result: Gap between January and March bars.

### Connect Empty Points

Use `EmptyPointSettings` to control how missing values are treated in the series.

```cshtml
<e-chart3d-series dataSource="@Model.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
    <e-chart3d-series-emptypointsettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Drop">
    </e-chart3d-series-emptypointsettings>
</e-chart3d-series>
```

### Show Average for Empty Points

Replace empty points with series average:

```cshtml
<e-chart3d-series-emptypointsettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Average">
</e-chart3d-series-emptypointsettings>
```

### Custom Empty Point Style

```cshtml
<e-chart3d-series-emptypointsettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Zero" 
                               fill="lightgray">
</e-chart3d-series-emptypointsettings>
```

**Empty Point Modes:**
| Mode | Behavior |
|------|----------|
| Gap | Skip point (default) |
| Drop | Drop the empty point from rendering flow |
| Average | Replace with series average |
| Zero | Replace with 0 |

## XName and YName Mapping

XName and YName determine which properties from your data are used for axis values.

### Simple Property Mapping

```csharp
public class SalesData
{
    public string ProductName { get; set; }  // Used for X-axis
    public double Revenue { get; set; }      // Used for Y-axis
}
```

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="ProductName" 
                  yName="Revenue" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
</e-chart3d-series>
```

### DateTime XName

For time-series data, use DateTime values:

```csharp
public class TimeSeries
{
    public DateTime Date { get; set; }
    public double Value { get; set; }
}
```

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
</e-chart3d-series>
```

For DateTime data, configure the appropriate axis value type and label formatting as needed.

## Query Filtering

Filter remote data before binding to reduce payload and improve performance.

### Basic Filtering

```cshtml
<e-chart3d-series xName="Category" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                  query="new ej.data.Query()">
    <e-data-manager url="/api/sales/get" 
                         adaptor="UrlAdaptor">
    </e-data-manager>
</e-chart3d-series>
```

### Multiple Filter Conditions

```cshtml
<e-chart3d-series xName="Category" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                  query="new ej.data.Query().take(5).where('Estimate', 'lessThan', 3, false)">
    <e-data-manager url="/api/sales/get" 
                         adaptor="UrlAdaptor">
    </e-data-manager>
</e-chart3d-series>
```

All conditions are combined with AND logic.

### Practical Example: Filtered Remote Data

```cshtml
<ejs-chart3d id="chart" title="High-Value Orders" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series xName="OrderDate" 
                          yName="OrderAmount" 
                          name="Orders"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          query="new ej.data.Query().where('OrderAmount', 'greaterThan', 5000, false).sortByDesc('OrderDate')">
            <e-data-manager url="/api/orders/get"
                            adaptor="UrlAdaptor"
                            crossDomain="false">
            </e-data-manager>
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

This fetches orders over $5000, sorted by date in descending order.

## Troubleshooting Data Binding

**Issue: No data appears in chart**
- Verify `dataSource` is not empty or null
- Check `xName` and `yName` match actual property names (case-sensitive)
- Open browser DevTools Network tab to confirm API returns data

**Issue: Remote data not loading**
- Check API endpoint URL is correct and accessible
- Verify CORS is configured if using cross-origin requests
- Check browser console for fetch errors

**Issue: Empty points not styled**
- Confirm `<e-chart3d-series-emptypointsettings>` is inside `<e-chart3d-series>`
- Verify mode value is correct (Gap, Drop, Average, Zero)

**Issue: DateTime not formatting correctly**
- Ensure DateTime fields are mapped correctly to `xName`
- Configure the appropriate axis value type and label formatting as needed
- For custom formatting, configure axis labels
