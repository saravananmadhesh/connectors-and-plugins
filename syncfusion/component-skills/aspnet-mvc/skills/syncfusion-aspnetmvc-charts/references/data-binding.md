# Data Binding

Data binding connects your chart to various data sources including arrays, JSON objects, model collections, ViewBag, OData services, and remote APIs.

## Table of Contents
- [Array of JSON Objects](#array-of-json-objects)
  - [Controller Setup](#controller-setup)
  - [View Binding](#view-binding)
- [Model Binding](#model-binding)
  - [Controller](#controller)
  - [View](#view)
- [ViewData Binding](#viewdata-binding)
- [Inline Data Binding](#inline-data-binding)
- [DataManager Integration](#datamanager-integration)
  - [Basic DataManager](#basic-datamanager)
  - [Controller Action for DataManager](#controller-action-for-datamanager)
- [OData Services](#odata-services)
- [Remote Data Binding](#remote-data-binding)
  - [Using AJAX](#using-ajax)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Client-Side Update](#client-side-update)
  - [Server-Side Update](#server-side-update)
- [Real-Time Data Updates](#real-time-data-updates)
- [Data Editing](#data-editing)
- [Empty Points Handling](#empty-points-handling)
  - [Gap Mode](#gap-mode)
  - [Empty Point Modes](#empty-point-modes)
  - [Custom Empty Point Style](#custom-empty-point-style)
- [Complex Data Binding](#complex-data-binding)
  - [Nested Properties](#nested-properties)
  - [Multiple Data Sources](#multiple-data-sources)
- [Data Transformation](#data-transformation)
- [Performance Optimization](#performance-optimization)
  - [Large Datasets](#large-datasets)
  - [Lazy Loading](#lazy-loading)
- [Troubleshooting](#troubleshooting)
  - [Data not displaying](#data-not-displaying)
  - ["Cannot read property" errors](#cannot-read-property-errors)
  - [DateTime axis showing numbers](#datetime-axis-showing-numbers)
  - [Chart updates not reflecting](#chart-updates-not-reflecting)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Array of JSON Objects

The most common data binding method using in-memory collections.

### Controller Setup

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

public class ChartController : Controller
{
    public ActionResult Index()
    {
        List<SalesData> salesData = new List<SalesData>
        {
            new SalesData { Month = "Jan", Sales = 35, Target = 40 },
            new SalesData { Month = "Feb", Sales = 28, Target = 35 },
            new SalesData { Month = "Mar", Sales = 34, Target = 38 },
            new SalesData { Month = "Apr", Sales = 32, Target = 36 },
            new SalesData { Month = "May", Sales = 40, Target = 42 },
            new SalesData { Month = "Jun", Sales = 32, Target = 38 }
        };
        
        ViewBag.DataSource = salesData;
        return View();
    }
}

public class SalesData
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public double Target { get; set; }
}
```

### View Binding

```cshtml
@Html.EJS().Chart("chart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource((IEnumerable<object>)ViewBag.DataSource)
              .XName("Month")
              .YName("Sales")
              .Add();
    }
    ).Render()
```

**Key points:**
- Cast ViewBag data to `IEnumerable<object>`
- `XName` and `YName` must match property names (case-sensitive)
- Properties must be public

## Model Binding

Pass data directly through the model.

### Controller

```csharp
public ActionResult Chart()
{
    var chartData = GetChartData();
    return View(chartData);
}

private List<ChartData> GetChartData()
{
    return new List<ChartData>
    {
        new ChartData { X = "USA", Y = 46 },
        new ChartData { X = "GBR", Y = 27 },
        new ChartData { X = "CHN", Y = 26 }
    };
}
```

### View

```cshtml
@model List<ChartData>

@Html.EJS().Chart("modelChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    }
    ).Render()
```

## ViewData Binding

Alternative to ViewBag for data transfer.

```csharp
// Controller
ViewData["ChartData"] = salesData;
```

```cshtml
@* View *@
@Html.EJS().Chart("viewDataChart").Series(series =>
    {
        series.DataSource(ViewData["ChartData"])
              .XName("Month")
              .YName("Sales")
              .Add();
    }
    ).Render()
```

## Inline Data Binding

Define data directly in the view for small datasets.

```cshtml
@{
    var inlineData = new[] {
        new { Country = "USA", Gold = 46, Silver = 37, Bronze = 38 },
        new { Country = "GBR", Gold = 27, Silver = 23, Bronze = 17 },
        new { Country = "CHN", Gold = 26, Silver = 18, Bronze = 26 },
        new { Country = "RUS", Gold = 19, Silver = 17, Bronze = 19 }
    };
}

@Html.EJS().Chart("inlineChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(inlineData)
              .XName("Country")
              .YName("Gold")
              .Name("Gold Medals")
              .Add();
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(inlineData)
              .XName("Country")
              .YName("Silver")
              .Name("Silver Medals")
              .Add();
    }
    ).Render()
```

## DataManager Integration

Use DataManager for advanced data operations and remote binding.

### Basic DataManager

```cshtml
@Html.EJS().Chart("dataManagerChart").Series(series =>
    {
        series.DataSource(ds => ds.Url("/Chart/GetChartData").Adaptor("UrlAdaptor"))
              .XName("Month")
              .YName("Sales")
              .Add();
    }
    ).Render()
```

### Controller Action for DataManager

```csharp
public JsonResult GetChartData()
{
    var data = new List<SalesData>
    {
        new SalesData { Month = "Jan", Sales = 35 },
        new SalesData { Month = "Feb", Sales = 28 },
        new SalesData { Month = "Mar", Sales = 34 }
    };
    
    return Json(data, JsonRequestBehavior.AllowGet);
}
```

## OData Services

Bind to OData endpoints for remote data.

```cshtml
@Html.EJS().Chart("odataChart").Series(series =>
    {
        series.DataSource(ds => ds
                  .Url("https://services.odata.org/V4/Northwind/Northwind.svc/Orders")
                  .Adaptor("ODataV4Adaptor"))
              .XName("ShipCity")
              .YName("Freight")
              .Add();
    }
    ).Render()
```

## Remote Data Binding

Fetch data from REST APIs or web services.

### Using AJAX

```cshtml
<div id="chartContainer"></div>

<script>
    $(document).ready(function() {
        $.ajax({
            url: '/api/chartdata',
            type: 'GET',
            success: function(data) {
                var chart = new ej.charts.Chart({
                    primaryXAxis: { valueType: 'Category' },
                    series: [{
                        dataSource: data,
                        xName: 'Month',
                        yName: 'Sales',
                        type: 'Column'
                    }]
                });
                chart.appendTo('#chartContainer');
            }
        });
    });
</script>
```

## Dynamic Data Updates

Update chart data dynamically after initial render.

### Client-Side Update

```cshtml
@Html.EJS().Chart("dynamicChart").Series(series =>
    {
        series.DataSource(ViewBag.InitialData)
              .XName("Month")
              .YName("Sales")
              .Add();
    }
    ).Render()

<button onclick="updateData()">Update Data</button>

<script>
    function updateData() {
        var chart = document.getElementById("dynamicChart").ej2_instances[0];
        
        // Fetch new data
        fetch('/Chart/GetUpdatedData')
            .then(response => response.json())
            .then(data => {
                chart.series[0].dataSource = data;
                chart.refresh();
            });
    }
</script>
```

### Server-Side Update

```csharp
[HttpGet]
public JsonResult GetUpdatedData()
{
    var updatedData = new List<SalesData>
    {
        new SalesData { Month = "Jan", Sales = 42 },
        new SalesData { Month = "Feb", Sales = 35 },
        new SalesData { Month = "Mar", Sales = 38 }
    };
    
    return Json(updatedData, JsonRequestBehavior.AllowGet);
}
```

## Real-Time Data Updates

Continuously update chart with live data.

```cshtml
@Html.EJS().Chart("realtimeChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(ViewBag.InitialData)
              .XName("Time")
              .YName("Value")
              .Animation(anim => anim.Enable(false))
              .Add();
    }).Render()

<script>
    // Update every 2 seconds
    setInterval(function() {
        var chart = document.getElementById("realtimeChart").ej2_instances[0];
        
        // Add new data point
        var newPoint = {
            Time: new Date(),
            Value: Math.random() * 100
        };
        
        chart.series[0].dataSource.push(newPoint);
        
        // Keep last 20 points
        if (chart.series[0].dataSource.length > 20) {
            chart.series[0].dataSource.shift();
        }
        
        chart.refresh();
    }, 2000);
</script>
```

## Data Editing

Enable data editing directly on the chart.

```cshtml
@Html.EJS().Chart("editableChart")
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category))
    .Series(series =>
    {
        series.DataSource(ViewBag.Data)
              .XName("Month")
              .YName("Sales")
              .Marker(marker => marker.Visible(true).Height(10).Width(10))
              .Add();
    })
    .ChartArea(ca => ca.Border(b => b.Width(0)))
    .Render()

<script>
    var chart = document.getElementById("editableChart").ej2_instances[0];
    
    // Enable drag to edit
    chart.chartMouseDown = function(args) {
        if (args.target.indexOf('_Series_') > -1) {
            // Enable point dragging
        }
    };
</script>
```

## Empty Points Handling

Handle missing or null data gracefully.

### Gap Mode

Leave gaps for null values:

```cshtml
@{
    var dataWithNulls = new[] {
        new { X = "Jan", Y = 35 },
        new { X = "Feb", Y = (double?)null },
        new { X = "Mar", Y = 34 },
        new { X = "Apr", Y = (double?)null },
        new { X = "May", Y = 40 }
    };
}

@Html.EJS().Chart("gapChart").Series(series =>
    {
        series.DataSource(dataWithNulls)
              .XName("X")
              .YName("Y")
              .EmptyPointSettings(empty => empty
                  .Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Gap))
              .Add();
    }).Render()
```

### Empty Point Modes

```cshtml
// Gap - Leave empty space
.EmptyPointSettings(empty => empty.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Gap))

// Zero - Treat as zero
.EmptyPointSettings(empty => empty.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Zero))

// Average - Calculate average of neighbors
.EmptyPointSettings(empty => empty.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Average))

// Drop - Remove from series
.EmptyPointSettings(empty => empty.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Drop))
```

### Custom Empty Point Style

```cshtml
.EmptyPointSettings(empty => empty
    .Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Average)
    .Fill("#FF0000")
    .Border(b => b.Width(2).Color("#000")))
```

## Complex Data Binding

### Nested Properties

```csharp
public class Product
{
    public string Name { get; set; }
    public SalesInfo Sales { get; set; }
}

public class SalesInfo
{
    public double Amount { get; set; }
    public int Units { get; set; }
}
```

```cshtml
@Html.EJS().Chart("nestedChart").Series(series =>
    {
        series.DataSource(ViewBag.Products)
              .XName("Name")
              .YName("Sales.Amount")  // Nested property
              .Add();
    }).Render()
```

### Multiple Data Sources

```cshtml
@Html.EJS().Chart("multiSourceChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).Series(series =>
    {
        series.DataSource(ViewBag.SalesData)
              .XName("Month")
              .YName("Sales")
              .Name("Sales")
              .Add();
        
        series.DataSource(ViewBag.ExpenseData)
              .XName("Month")
              .YName("Expense")
              .Name("Expenses")
              .Add();
        
        series.DataSource(ViewBag.ProfitData)
              .XName("Month")
              .YName("Profit")
              .Name("Profit")
              .Add();
    }).Render()
```

## Data Transformation

Transform data before binding to chart.

```csharp
public ActionResult TransformedChart()
{
    var rawData = GetRawData();
    
    // Transform: Calculate percentage growth
    var transformedData = rawData
        .Select((item, index) => new {
            Month = item.Month,
            Sales = item.Sales,
            Growth = index > 0 
                ? ((item.Sales - rawData[index-1].Sales) / rawData[index-1].Sales) * 100 
                : 0
        })
        .ToList();
    
    ViewBag.Data = transformedData;
    return View();
}
```

## Performance Optimization

### Large Datasets

For charts with thousands of points:

```cshtml
@Html.EJS().Chart("largeDataChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(ViewBag.LargeDataset)
              .XName("Date")
              .YName("Value")
              .Animation(anim => anim.Enable(false))  // Disable for performance
              .Marker(m => m.Visible(false))  // Hide markers for speed
              .Add();
    })
    .EnableCanvas(true).Render()  // Use Canvas instead of SVG for large datasets
```

### Lazy Loading

Load data on demand:

```cshtml
@Html.EJS().Chart("lazyChart")
    .Load("onChartLoad")
    .Render()

<script>
    function onChartLoad(args) {
        // Load data only when chart initializes
        fetch('/Chart/GetData')
            .then(response => response.json())
            .then(data => {
                args.chart.series[0].dataSource = data;
                args.chart.refresh();
            });
    }
</script>
```

## Troubleshooting

### Data not displaying

**Check:**
- Data source is not null or empty
- Property names match XName/YName exactly (case-sensitive)
- Properties are public
- Data types are appropriate (numbers for numeric axes, dates for datetime)
- ViewBag is cast to `IEnumerable<object>`

### "Cannot read property" errors

**Solutions:**
- Verify property names with `console.log(data)` in browser
- Check for typos in XName/YName
- Ensure data is serialized correctly (check Network tab)

### DateTime axis showing numbers

**Fix:**
- Ensure DateTime properties are actual DateTime objects, not strings
- Set `ValueType.DateTime` on axis
- Format properly in controller: `DateTime.Parse()` if needed

### Chart updates not reflecting

**Solutions:**
- Call `chart.refresh()` after data change
- Check if chart instance is correctly referenced
- Verify data is actually changing (console log it)

## Best Practices

1. **Data Preparation**: Prepare and validate data in controller, not view
2. **Type Safety**: Use strongly-typed models instead of dynamic objects
3. **Performance**: Disable animations for large datasets
4. **Null Handling**: Always handle null/empty data gracefully
5. **Caching**: Cache static data to reduce server calls
6. **Async Loading**: Use async for remote data to prevent blocking UI

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_DataSource
