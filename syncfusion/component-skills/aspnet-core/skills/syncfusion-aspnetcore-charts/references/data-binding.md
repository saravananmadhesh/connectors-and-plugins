# Data Binding

## Table of Contents

- [Overview](#overview)
- [Local Data Sources](#local-data-sources)
  - [Simple Object Array](#simple-object-array)
  - [Strongly Typed Model](#strongly-typed-model)
  - [From Database Entity Framework](#from-database-entity-framework)
  - [Multiple Series with Different Data Sources](#multiple-series-with-different-data-sources)
- [Remote Data Sources](#remote-data-sources)
  - [Web API Integration](#web-api-integration)
  - [AJAX Data Loading](#ajax-data-loading)
- [DataManager Integration](#datamanager-integration)
  - [Basic DataManager](#basic-datamanager)
  - [With Custom Adaptor](#with-custom-adaptor)
  - [OData Service](#odata-service)
  - [DataManager with Query](#datamanager-with-query)
- [Complex Property Binding](#complex-property-binding)
  - [Nested Object Binding](#nested-object-binding)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Add New Data Points](#add-new-data-points)
  - [Replace Entire Dataset](#replace-entire-dataset)
  - [Real-Time Data Updates](#real-time-data-updates)
- [Empty Points Handling](#empty-points-handling)
  - [Empty Point Modes](#empty-point-modes)
  - [Example with Null Data](#example-with-null-data)
  - [Custom Empty Point Style](#custom-empty-point-style)
- [Best Practices](#best-practices)
  - [Performance Optimization](#performance-optimization)
  - [Data Validation](#data-validation)
  - [Error Handling](#error-handling)
  - [Memory Management](#memory-management)
  - [Secure API Endpoints](#secure-api-endpoints)

## Overview

Syncfusion ASP.NET Core Chart supports various data binding options including local arrays, remote data from web services, and DataManager for advanced scenarios.

**Supported Data Sources:**
- JSON object arrays (local data)
- List<T> collections
- ViewBag/ViewData
- DataManager (for remote data)
- OData services
- Web API endpoints
- Entity Framework queries

## Local Data Sources

### Simple Object Array

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
public IActionResult Index()
{
    ViewBag.ChartData = new object[]
    {
        new { Month = "Jan", Sales = 35 },
        new { Month = "Feb", Sales = 28 },
        new { Month = "Mar", Sales = 34 },
        new { Month = "Apr", Sales = 32 },
        new { Month = "May", Sales = 40 }
    };
    return View();
}
```

### Strongly Typed Model

```csharp
public class SalesData
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public double Profit { get; set; }
    public string Region { get; set; }
}

public IActionResult Index()
{
    var data = new List<SalesData>
    {
        new SalesData { Month = "Jan", Sales = 35, Profit = 10, Region = "North" },
        new SalesData { Month = "Feb", Sales = 28, Profit = 8, Region = "North" },
        new SalesData { Month = "Mar", Sales = 34, Profit = 12, Region = "North" }
    };
    
    return View(data);
}
```

```cshtml
@model List<SalesData>

<ejs-chart id="chart">
    <e-series-collection>
        <e-series dataSource="@Model" 
                  xName="Month" 
                  yName="Sales">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### From Database (Entity Framework)

```csharp
public class ChartController : Controller
{
    private readonly ApplicationDbContext _context;

    public ChartController(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var salesData = await _context.Sales
            .Where(s => s.Year == 2023)
            .OrderBy(s => s.Month)
            .Select(s => new
            {
                Month = s.MonthName,
                Sales = s.TotalSales,
                Target = s.TargetSales
            })
            .ToListAsync();

        ViewBag.ChartData = salesData;
        return View();
    }
}
```

### Multiple Series with Different Data Sources

```cshtml
<ejs-chart id="multiSeriesChart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ActualSales" 
                  xName="Month" 
                  yName="Value" 
                  name="Actual">
        </e-series>
        <e-series dataSource="@ViewBag.TargetSales" 
                  xName="Month" 
                  yName="Value" 
                  name="Target">
        </e-series>
        <e-series dataSource="@ViewBag.PreviousYear" 
                  xName="Month" 
                  yName="Value" 
                  name="Last Year">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ActualSales = GetActualSales();
ViewBag.TargetSales = GetTargetSales();
ViewBag.PreviousYear = GetPreviousYearSales();
```

## Remote Data Sources

### Web API Integration

```csharp
// Controller method to provide data
[HttpGet]
public async Task<IActionResult> GetChartData(string region)
{
    var data = await _context.Sales
        .Where(s => s.Region == region)
        .Select(s => new
        {
            x = s.Date,
            y = s.Amount
        })
        .ToListAsync();

    return Json(data);
}
```

```cshtml
<ejs-chart id="chart" load="onChartLoad">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series xName="x" yName="y"></e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function onChartLoad(args) {
        fetch('/Chart/GetChartData?region=North')
            .then(response => response.json())
            .then(data => {
                args.chart.series[0].dataSource = data;
                args.chart.refresh();
            });
    }
</script>
```

### AJAX Data Loading

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series xName="Month" yName="Sales"></e-series>
    </e-series-collection>
</ejs-chart>

<script>
    window.onload = function() {
        var chart = document.getElementById('chart').ej2_instances[0];
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/sales/monthly', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                chart.series[0].dataSource = data;
                chart.refresh();
            }
        };
        xhr.send();
    };
</script>
```

## DataManager Integration

DataManager provides uniform data access for local and remote data with features like sorting, filtering, and paging.

### Basic DataManager

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series xName="Month" yName="Sales">
            <e-data-manager url="https://api.example.com/sales" 
                           adaptor="WebApiAdaptor">
            </e-data-manager>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### With Custom Adaptor

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series xName="x" yName="y">
            <e-data-manager url="/api/ChartData" 
                           adaptor="WebApiAdaptor"
                           crossDomain="true">
            </e-data-manager>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### OData Service

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series xName="OrderDate" yName="Freight">
            <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc/Orders" 
                           adaptor="ODataV4Adaptor">
            </e-data-manager>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### DataManager with Query

```csharp
public IActionResult Index()
{
    ViewBag.DataManagerUrl = "https://api.example.com/products";
    return View();
}
```

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series xName="Product" yName="Sales" query="new ej.data.Query().where('Region', 'equal', 'North', false)">
            <e-data-manager url="@ViewBag.DataManagerUrl" 
                           adaptor="WebApiAdaptor">
            </e-data-manager>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Complex Property Binding

Bind to nested properties in complex objects.

### Nested Object Binding

```csharp
public class ComplexData
{
    public string Category { get; set; }
    public SalesInfo Sales { get; set; }
    public TargetInfo Target { get; set; }
}

public class SalesInfo
{
    public double Current { get; set; }
    public double Previous { get; set; }
}

public class TargetInfo
{
    public double Value { get; set; }
}

ViewBag.ChartData = new List<ComplexData>
{
    new ComplexData 
    { 
        Category = "Q1", 
        Sales = new SalesInfo { Current = 100, Previous = 90 },
        Target = new TargetInfo { Value = 110 }
    },
    new ComplexData 
    { 
        Category = "Q2", 
        Sales = new SalesInfo { Current = 120, Previous = 100 },
        Target = new TargetInfo { Value = 115 }
    }
};
```

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Category" 
                  yName="Sales.Current"
                  enableComplexProperty="true">
        </e-series>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Category" 
                  yName="Target.Value"
                  enableComplexProperty="true">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

**Key Property:** `enableComplexProperty="true"` enables nested property binding with dot notation.

## Dynamic Data Updates

### Add New Data Points

```cshtml
<div>      
  <ejs-button id="add" content="Add Point" isPrimary="true"></ejs-button>       
</div>

<ejs-chart id="chart">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="x" yName="y">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    document.getElementById('add').onclick = () => {
        var chart = document.getElementById('container').ej2_instances[0];
        chart.series[0].addPoint({ x: "Japan", y: 118.2 });
    }
</script>
```

### Replace Entire Dataset

```javascript
function replaceData() {
    var chart = document.getElementById('chart').ej2_instances[0];
    
    var newData = [
        { x: 'A', y: 10 },
        { x: 'B', y: 20 },
        { x: 'C', y: 30 }
    ];
    
    chart.series[0].dataSource = newData;
    chart.refresh();
}
```

### Real-Time Data Updates

```cshtml
<ejs-chart id="liveChart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.InitialData" xName="Time" yName="Value">
        </e-series>
    </e-series-collection>
</ejs-chart>

<div>      
  <ejs-button id="update" content="Update Data" isPrimary="true"></ejs-button>       
</div>
<script>
    function axisRangeCalculated(args) {
        if (args.axis.name === 'primaryYAxis') {
            args.maximum = args.maximum > 100 ? 100 : args.maximum;
            if (args.maximum > 80) {
                args.interval = 20;
            }
            else if (args.maximum > 40) {
                args.interval = 10;
            }
        }
    }

    document.getElementById('update').onclick = () => {
        var chart = document.getElementById('container').ej2_instances[0];
        var newData = chart.series[0].dataSource.map(function (item) {
            var value = getRandomInt(10, 90);
            return { x: item.x, y: value };
        });
        if (chart.series.length > 0) {
            chart.series[0].setData(newData, 500);
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
</script>
```

## Empty Points Handling

Handle null, undefined, or missing data points.

### Empty Point Modes

```cshtml
<e-series dataSource="@ViewBag.ChartData" xName="x" yName="y">
        <e-series-emptypointsettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Gap"></e-series-emptypointsettings>
</e-series>
```

**Modes:**
- `Gap`: Leave gap in the chart
- `Zero`: Treat as zero value
- `Average`: Use average of surrounding points
- `Drop`: Completely remove the point

### Example with Null Data

```csharp
ViewBag.ChartData = new object[]
{
    new { x = "Jan", y = 35 },
    new { x = "Feb", y = (double?)null },  // Empty point
    new { x = "Mar", y = 34 },
    new { x = "Apr", y = (double?)null },  // Empty point
    new { x = "May", y = 40 }
};
```

### Custom Empty Point Style

```cshtml
<e-series-emptypointsettings fill="#e6e6e6" mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Average"></e-series-emptypointsettings>
```

## Best Practices

### Performance Optimization

1. **Use ViewBag for small datasets** (<1000 points)
2. **Use DataManager for large/remote data**
3. **Implement server-side paging** for very large datasets
4. **Cache data** when appropriate
5. **Use async/await** for database queries
6. **Limit real-time update frequency** (not faster than 1 second)

### Data Validation

```csharp
public IActionResult Index()
{
    var data = GetChartData();
    
    // Validate data
    if (data == null || !data.Any())
    {
        data = GetDefaultData();
    }
    
    // Ensure data is sorted
    data = data.OrderBy(d => d.Date).ToList();
    
    ViewBag.ChartData = data;
    return View();
}
```

### Error Handling

```cshtml
<script>
    function loadChartData() {
        fetch('/api/ChartData')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                var chart = document.getElementById('chart').ej2_instances[0];
                chart.series[0].dataSource = data;
                chart.refresh();
            })
            .catch(error => {
                console.error('Error loading chart data:', error);
                // Show fallback data or error message
            });
    }
</script>
```

### Memory Management

```javascript
// Clear data when chart is destroyed
function destroyChart() {
    var chart = document.getElementById('chart').ej2_instances[0];
    if (chart) {
        chart.series[0].dataSource = [];
        chart.destroy();
    }
}
```

### Secure API Endpoints

```csharp
[Authorize]
[HttpGet]
public async Task<IActionResult> GetChartData()
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    
    var data = await _context.Sales
        .Where(s => s.UserId == userId)
        .ToListAsync();
    
    return Json(data);
}
```

This comprehensive guide covers all data binding scenarios for Syncfusion ASP.NET Core Charts.
