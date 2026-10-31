# Data Binding and Series Configuration

## Table of Contents
- [Overview](#overview)
- [Local Data Source Binding](#local-data-source-binding)
  - [Binding Simple List Data](#binding-simple-list-data)
  - [Key Points](#key-points)
- [Remote Data Source Binding](#remote-data-source-binding)
  - [Fetching Data from API/Service](#fetching-data-from-apiservice)
  - [Advantages of Remote Binding](#advantages-of-remote-binding)
- [Selecting Range](#selecting-range)
- [LightWeight Range Navigator](#lightweight-range-navigator)
- [Series Configuration](#series-configuration)
  - [Basic Series Setup](#basic-series-setup)
  - [Available Series Types](#available-series-types)
  - [Line Series](#line-series)
  - [Area Series](#area-series)
  - [StepLine Series](#stepline-series)
  - [Spline Series](#spline-series)
  - [SplineArea Series](#splinearea-series)
  - [Column Series](#column-series)
- [Value Types](#value-types)
  - [DateTime Value Type](#datetime-value-type)
  - [Numeric Value Type (Default)](#numeric-value-type-default)
- [Multi-Series Visualization](#multi-series-visualization)
  - [Displaying Multiple Data Series](#displaying-multiple-data-series)
  - [Distinguishing Multiple Series](#distinguishing-multiple-series)
- [Data Mapping Best Practices](#data-mapping-best-practices)
  - [Naming Consistency](#naming-consistency)
  - [Null and Invalid Data Handling](#null-and-invalid-data-handling)
  - [Prepare Data in Ascending Order](#prepare-data-in-ascending-order)
- [Handling Data Updates](#handling-data-updates)
  - [Refresh Entire DataSource](#refresh-entire-datasource)
  - [Automatic Data Refresh on Interval](#automatic-data-refresh-on-interval)
  - [Important Notes on Data Updates](#important-notes-on-data-updates)

## Overview

The Range Navigator uses the `Series` property to define how data is visualized. Each series connects your data source fields to visual elements through property mapping. Proper data binding ensures accurate range selection and visualization.

## Local Data Source Binding

### Binding Simple List Data

Local data binding retrieves data from your ASP.NET MVC controller and binds it directly to the Range Navigator.

```csharp
// Controller: HomeController.cs
public class HomeController : Controller
{
    public ActionResult Index()
    {
        // Create sample data list
        List<SalesData> salesData = new List<SalesData>
        {
            new SalesData { Month = new DateTime(2023, 01, 01), Sales = 35000 },
            new SalesData { Month = new DateTime(2023, 02, 01), Sales = 42000 },
            new SalesData { Month = new DateTime(2023, 03, 01), Sales = 38000 },
            new SalesData { Month = new DateTime(2023, 04, 01), Sales = 51000 },
            new SalesData { Month = new DateTime(2023, 05, 01), Sales = 59000 },
            new SalesData { Month = new DateTime(2023, 06, 01), Sales = 67000 }
        };
        
        return View(salesData);
    }
}

public class SalesData
{
    public DateTime Month;
    public double Sales;
}
```

```html
<!-- View: Index.cshtml -->
@model List<RangeNavigatorSample.Controllers.SalesData>

@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Month")  // Maps DateTime property
              .YName("Sales")   // Maps numeric property
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .DataSource(Model)
    .Render()
)
```

### Key Points
- `DataSource(Model)`: Binds collection from controller to component
- `XName("Month")`: Maps data property for x-axis (usually categorical or datetime)
- `YName("Sales")`: Maps data property for y-axis (numeric values)
- Property names are case-sensitive and must match your data model exactly

## Remote Data Source Binding

### Fetching Data from API/Service

For larger datasets or dynamic data, fetch from a remote service:

```csharp
// Controller: HomeController.cs
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
    
    [HttpGet]
    public JsonResult GetSalesData()
    {
        List<SalesData> salesData = new List<SalesData>
        {
            new SalesData { Month = new DateTime(2023, 01, 01), Sales = 35000 },
            new SalesData { Month = new DateTime(2023, 02, 01), Sales = 42000 },
            // ... more data
        };
        
        return Json(salesData, JsonRequestBehavior.AllowGet);
    }
}
```

```html
<!-- View with remote data binding -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Month")
              .YName("Sales")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .DataSource(dataSource => 
        dataSource.Url(Url.Action("GetSalesData", "Home"))
    )
    .Render()
)
```

### Advantages of Remote Binding
- Loads data on-demand (reduced initial page load)
- Supports large datasets efficiently
- Enables real-time data updates
- Centralized data management on server

## Selecting Range

The Range Selector’s left and right thumbs are used to indicate the selected range in the large collection of data. A range can be selected in the following ways:

- By dragging the thumbs.
- By tapping on the labels.
- By setting the start and the end through the value property.

```html
@(Html.EJS().RangeNavigator("container")
    .Value(ViewBag.range)
    .Series(sr =>
    {
        sr.XName("x").YName("y").DataSource(ViewBag.dataSource).Add();
    }).Render()
)
```

## LightWeight Range Navigator

By default, when the dataSource for series is empty, a lightweight Range Selector will be shown without Chart.

```html
@(Html.EJS().RangeNavigator("container")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .LabelFormat("MMM-yy")
    .Value(ViewBag.range)               
    .XName("x").YName("y").DataSource(ViewBag.dataSource)
    .Render()
)
```

## Series Configuration

### Basic Series Setup

Configure the series by setting the `XName`, `YName`, and `Type` properties. When a visual series is rendered, bind the data source directly to the series.

```cshtml
@(Html.EJS().RangeNavigator("container")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Line)
              .Add();
    })
    .Render()
)
```

### Available Series Types

| Type | Use Case | Visual |
|---|---|---|
| **Line** | Time-series trends and direct comparisons | Connected line without fill |
| **Area** | Continuous trends and cumulative values | Filled area below the line |
| **StepLine** | State changes and step-function data | Horizontal and vertical line segments |
| **Spline** | Smoothly varying trends | Smooth curved line |
| **SplineArea** | Smooth trends where magnitude should be emphasized | Smooth curve with a filled area |
| **Column** | Discrete values and interval-based comparisons | Vertical columns |

### Line Series

```cshtml
@(Html.EJS().RangeNavigator("lineRangeNavigator")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Line)
              .Width(2)
              .Fill("#E74C3C")
              .Add();
    })
    .Render()
)
```

### Area Series

```cshtml
@(Html.EJS().RangeNavigator("areaRangeNavigator")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Fill("#3498DB")
              .Opacity(0.7)
              .Border(border => border
                  .Color("#2C3E50")
                  .Width(2))
              .Add();
    })
    .Render()
)
```

### StepLine Series

```cshtml
@(Html.EJS().RangeNavigator("stepLineRangeNavigator")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Month")
              .YName("Revenue")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.StepLine)
              .Width(2)
              .Fill("#F59E0B")
              .Add();
    })
    .Render()
)
```

### Spline Series

Use the `Spline` series to connect data points with smooth, curved segments.

```cshtml
@(Html.EJS().RangeNavigator("splineRangeNavigator")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Spline)
              .Width(3)
              .Fill("#7C3AED")
              .Add();
    })
    .Render()
)
```

### SplineArea Series

Use the `SplineArea` series to combine a smooth curve with a filled region that emphasizes value magnitude.

```cshtml
@(Html.EJS().RangeNavigator("splineAreaRangeNavigator")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.SplineArea)
              .Fill("#0EA5E9")
              .Opacity(0.65)
              .Border(border => border
                  .Color("#0369A1")
                  .Width(2))
              .Add();
    })
    .Render()
)
```

### Column Series

Use the `Column` series to display discrete values as vertical columns.

```cshtml
@(Html.EJS().RangeNavigator("columnRangeNavigator")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Column)
              .Fill("#F97316")
              .Opacity(0.8)
              .Border(border => border
                  .Color("#9A3412")
                  .Width(1))
              .Add();
    })
    .Render()
)
```

> **Note:** Ensure that `XName` and `YName` match the corresponding property names in the bound data source. When DateTime values are used for the X-axis, configure `ValueType` as `DateTime` and bind JavaScript-compatible date values.
## Value Types

The `ValueType` property tells the Range Navigator how to interpret x-axis values:

### DateTime Value Type

Use for time-based data (dates, timestamps):

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .DataSource(Model)
    .Render()
)
```

Automatically handles:
- Date formatting based on zoom level
- Intelligent label spacing for dates
- DateTime range selection

### Numeric Value Type (Default)

Use for numeric sequences:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Index").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.Double)
    .DataSource(Model)
    .Render()
)
```

Works with:
- Integer sequences (1, 2, 3, 4...)
- Decimal values (0.5, 1.0, 1.5...)
- Negative numbers

### Logarithmic Value Type

The Logarithmic supports the logarithmic scale, and it is used to visualize the data when the Range Selector has numerical values in both the lower (e.g.: 10-6) and the higher (e.g.: 106) orders of the magnitude.

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Index").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.Logarithmic)
    .DataSource(Model)
    .Render()
)
```

## Multi-Series Visualization

### Displaying Multiple Data Series

Visualize multiple datasets simultaneously by adding multiple series:

```csharp
// Controller data with multiple series
public class MultiSeriesData
{
    public DateTime Date;
    public double Series1Value;
    public double Series2Value;
}
```

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        // First series
        series.XName("Date")
              .YName("Series1Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Line)
              .Add();
        
        // Second series
        series.XName("Date")
              .YName("Series2Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Line)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .DataSource(Model)
    .Render()
)
```

### Distinguishing Multiple Series
- Use different `Type` values for visual distinction
- Apply different colors through `NavigatorStyleSettings`
- Use legend to identify series

## Data Mapping Best Practices

### Naming Consistency

Property names in mapping must exactly match your data model:

```csharp
// Data model
public class StockData
{
    public DateTime TradeDate;      // Use exact casing
    public double ClosingPrice;     // Use exact casing
}
```

```html
<!-- Mapping must match exactly -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("TradeDate")          // ✓ Correct casing
              .YName("ClosingPrice")       // ✓ Correct casing
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .DataSource(Model)
    .Render()
)
```

### Null and Invalid Data Handling

Range Navigator skips null values and continues rendering:

```csharp
// Data with some null values
List<StockData> data = new List<StockData>
{
    new StockData { Date = new DateTime(2023, 01, 01), Price = 100 },
    new StockData { Date = new DateTime(2023, 01, 02), Price = null },  // Skipped
    new StockData { Date = new DateTime(2023, 01, 03), Price = 105 }
};
```

### Prepare Data in Ascending Order

Sort data by x-axis values (ascending) for proper visualization:

```csharp
// Sort before binding
var sortedData = dataList.OrderBy(x => x.Date).ToList();
return View(sortedData);
```

## Handling Data Updates

### Refresh Entire DataSource

Replace datasource to refresh visualization:

```html
<div id="container"></div>

<button onclick="refreshData()">Refresh Data</button>

<script>
function refreshData() {
    // Get Range Navigator instance
    var navigator = document.getElementById('container').ej2_instances[0];
    
    // Update with new data (via AJAX)
    $.ajax({
        url: '/Home/GetUpdatedData',
        method: 'GET',
        success: function(data) {
            navigator.dataSource = data;
        }
    });
}
</script>
```

### Automatic Data Refresh on Interval

Update data periodically:

```html
<script>
setInterval(function() {
    $.ajax({
        url: '/Home/GetLatestData',
        method: 'GET',
        success: function(data) {
            var navigator = document.getElementById('container').ej2_instances[0];
            navigator.dataSource = data;
        }
    });
}, 30000);  // Refresh every 30 seconds
</script>
```

### Important Notes on Data Updates
- Updating `DataSource` re-renders entire control
- Avoid frequent updates (>1 second intervals) for performance
- Consider lightweight mode for frequent updates
- Test with large datasets for performance impact
