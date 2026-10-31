# Advanced Usage and Integration

## Table of Contents
- [Overview](#overview)
- [Export Functionality](#export-functionality)
  - [Exporting Range Navigator](#exporting-range-navigator)
  - [Export Options](#export-options)
  - [Export Use Cases](#export-use-cases)
- [Print Functionality](#print-functionality)
- [Integration with Chart Component](#integration-with-chart-component)
  - [Connected Chart and Range Navigator](#connected-chart-and-range-navigator)
  - [Chart Integration Pattern](#chart-integration-pattern)
- [Integration with Data Grid](#integration-with-data-grid)
  - [Filtering Grid by Range Selection](#filtering-grid-by-range-selection)
- [Event Handling and Callbacks](#event-handling-and-callbacks)
  - [Available Events](#available-events)
  - [Complex Event Handling](#complex-event-handling)
- [Performance Optimization](#performance-optimization)
  - [Large Dataset Handling](#large-dataset-handling)
  - [Performance Checklist](#performance-checklist)
  - [Caching Strategy](#caching-strategy)
- [Responsive Design Patterns](#responsive-design-patterns)
  - [Mobile-First Responsive Layout](#mobile-first-responsive-layout)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
  - [Issue 1: Data Not Displaying](#issue-1-data-not-displaying)
  - [Issue 2: Performance Issues with Large Datasets](#issue-2-performance-issues-with-large-datasets)
  - [Issue 3: DateTime Values Not Recognized](#issue-3-datetime-values-not-recognized)
  - [Issue 4: Connected Controls Not Updating](#issue-4-connected-controls-not-updating)
  - [Issue 5: Browser Compatibility](#issue-5-browser-compatibility)
  - [Issue 6: Styling Not Applied](#issue-6-styling-not-applied)
  - [Diagnostic Steps](#diagnostic-steps)
  - [Getting Support](#getting-support)

## Overview

Advanced usage patterns enable you to build sophisticated dashboards, optimize for mobile deployment, and integrate seamlessly with other Syncfusion components. This reference covers production-ready implementations and best practices for complex scenarios.

## Export Functionality

### Exporting Range Navigator

Export the Range Navigator visualization as image or PDF:

```html
<!-- Range Navigator with Export Button -->
@(Html.EJS().RangeNavigator("rangeNavigator")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .DataSource(Model)
    .Render()
)

@Html.EJS().Button("export").Content("Primary").IsPrimary(true).Render();

<script>
document.getElementById('export').onclick = function () {
    var control = document.getElementById('export').ej2_instances[0];
    // Export as PNG
    control.export("PNG", "RangeNavigator");

    // Export as PDF
    control.export('PDF', 'RangeNavigator');

    // Export as SVG
    control.export('SVG', 'RangeNavigator');

};
</script>
```

### Export Options

```csharp
// Server-side export (recommended for large datasets)
public ActionResult ExportRangeNavigator()
{
    // Prepare data
    var imageData = // Generate image from data
    
    return File(imageData, "image/png", "range-navigator.png");
}
```

### Export Use Cases

- **Report generation**: Include in PDF reports
- **Email distribution**: Share visualization via email
- **Archival**: Store historical visualizations
- **Social sharing**: Export for sharing on social media

## Print Functionality

The rendered Range Selector can be printed directly from the browser by calling the public method print.

```html
@(Html.EJS().RangeNavigator("container")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .LabelFormat("MMM-yy")
    .Series(sr =>
    {
        sr.XName("x").YName("y").DataSource(ViewBag.dataSource).Add();
    }).Render()
)
@Html.EJS().Button("print").Content("Primary").IsPrimary(true).Render();
<script>
document.getElementById('print').onclick = function () {
                var chart = document.getElementById('print-container').ej2_instances[0];
                chart.print();
            };
</script>
```

## Integration with Chart Component

### Connected Chart and Range Navigator

Display detailed chart for selected range:

```csharp
// Controller
public class DashboardController : Controller
{
    public ActionResult Index()
    {
        List<SalesData> allData = GetAllSalesData();
        return View(allData);
    }
    
    [HttpGet]
    public JsonResult GetDetailedChartData(DateTime start, DateTime end)
    {
        var filteredData = GetSalesData()
            .Where(x => x.Date >= start && x.Date <= end)
            .ToList();
        
        return Json(filteredData, JsonRequestBehavior.AllowGet);
    }
}
```

```html
<!-- View with Range Navigator and Chart -->
<div style="width: 100%; height: 300px;">
    @(Html.EJS().RangeNavigator("rangeNavigator")
        .Series(series =>
        {
            series.XName("Date").YName("Sales").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
        })
        .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
        .Changed("onRangeChanged")
        .DataSource(Model)
        .Render()
    )
</div>

<div style="width: 100%; height: 400px; margin-top: 20px;">
    @(Html.EJS().Chart("chart")
        .Series(series =>
        {
            series.XName("Date")
                  .YName("Sales")
                  .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
                  .DataSource(Model)
                  .Add();
        })
        .Render()
    )
</div>

<script>
function onRangeChanged(args) {
    // Fetch detailed data for selected range
    $.ajax({
        url: '/Dashboard/GetDetailedChartData',
        data: {
            start: new Date(args.start).toISOString().split('T')[0],
            end: new Date(args.end).toISOString().split('T')[0]
        },
        success: function(data) {
            // Update chart with filtered data
            var chart = document.getElementById('chart').ej2_instances[0];
            chart.series[0].dataSource = data;
            chart.refresh();
        }
    });
}
</script>
```

### Chart Integration Pattern

1. Range Navigator shows overview of all data
2. User selects range by dragging
3. Changed event triggered
4. Fetch detailed data for selected range
5. Update connected chart
6. User sees detailed view for selection

## Integration with Data Grid

### Filtering Grid by Range Selection

Use Range Navigator to filter grid data dynamically:

```html
<!-- Range Navigator for overview -->
<div style="height: 300px;">
    @(Html.EJS().RangeNavigator("rangeNavigator")
        .Series(series =>
        {
            series.XName("Date").YName("TransactionAmount").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
        })
        .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
        .PeriodSelectorSettings(ps =>
        {
            ps.Periods(period =>
            {
                period.Interval(7).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Text("1W").Add();
                period.Interval(30).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Text("1M").Add();
            });
        })
        .Changed("onDateRangeChanged")
        .DataSource(Model)
        .Render()
    )
</div>

<!-- Grid showing filtered details -->
<div style="margin-top: 20px;">
    @(Html.EJS().Grid("grid")
        .Columns(col =>
        {
            col.Field("Date").HeaderText("Date").Type("datetime").Format("yMd").Width("120").Add();
            col.Field("TransactionID").HeaderText("ID").Width("80").Add();
            col.Field("Description").HeaderText("Description").Width("200").Add();
            col.Field("TransactionAmount").HeaderText("Amount").Format("C2").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Width("100").Add();
        })
        .AllowPaging()
        .PageSettings(page => page.PageSize(10))
        .DataSource(Model)
        .Render()
    )
</div>

<script>
function onDateRangeChanged(args) {
    var grid = document.getElementById('grid').ej2_instances[0];
    var startDate = new Date(args.start);
    var endDate = new Date(args.end);
    
    // Filter grid data
    var filteredData = gridData.filter(function (item) {
        var itemDate = new Date(item.Date);
        return itemDate >= startDate && itemDate <= endDate;
    });

    // Update grid
    grid.dataSource = filteredData;
}
</script>
```

## Event Handling and Callbacks

### Available Events

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .Changed("onChanged")           // Range selection changed
    .Resized("onResized")           // Control resized
    .DataSource(Model)
    .Render()
)

<script>
function onChanged(args) {
    console.log("Range changed:", args.start, args.end);
    // Handle range selection
}

function onResized(args) {
    console.log("Control resized:", args.currentSize);
    // Handle resize events
}
</script>
```

### Complex Event Handling

```html
<script>
// Debounce rapid range changes
var changeTimeout;

function onChanged(args) {
    clearTimeout(changeTimeout);
    
    changeTimeout = setTimeout(function() {
        console.log("Final range selection:", args.start, args.end);
        
        // Update connected controls
        updateAllConnectedControls(args.start, args.end);
    }, 500);  // Wait 500ms after last change
}

function updateAllConnectedControls(start, end) {
    updateChart(start, end);
    updateGrid(start, end);
    updateStatistics(start, end);
}
</script>
```

## Performance Optimization

### Large Dataset Handling

```html
<!-- Optimize for large datasets -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .EnableDeferredUpdate(true)     // Defer updates until selection complete
    .IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months)
    .Height("250px")
    .DataSource(dataSource =>
        dataSource
            .Url(Url.Action("GetLargeDataset", "Data"))
            .Adaptor("UrlAdaptor")
    )
    .Render()
)
```

### Performance Checklist

- [ ] Enable `EnableDeferredUpdate(true)` for connected controls
- [ ] Use remote data source for large datasets
- [ ] Implement pagination/virtual scrolling for grids
- [ ] Use interval type appropriate for data
- [ ] Test with real dataset sizes

### Caching Strategy

```csharp
// Cache range navigator data
[OutputCache(Duration = 300, VaryByParam = "none")]
public ActionResult GetRangeData()
{
    var data = GetExpensiveRangeData();
    return Json(data, JsonRequestBehavior.AllowGet);
}
```

## Responsive Design Patterns

### Mobile-First Responsive Layout

```html
<style>
    /* Mobile first */
    .dashboard {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .range-container {
        height: 200px;
        width: 100%;
    }
    
    .chart-container {
        height: 250px;
        width: 100%;
    }
    
    .grid-container {
        height: auto;
    }
    
    /* Tablet and up */
    @media (min-width: 768px) {
        .dashboard {
            flex-direction: column;
        }
        
        .range-container {
            height: 250px;
        }
        
        .chart-container {
            height: 350px;
        }
    }
    
    /* Desktop and up */
    @media (min-width: 1200px) {
        .dashboard {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .range-container {
            grid-column: 1 / -1;
            height: 300px;
        }
        
        .chart-container {
            height: 400px;
        }
    }
</style>

<div class="dashboard">
    <div class="range-container" id="rangeNavigator"></div>
    <div class="chart-container" id="chart"></div>
    <div class="grid-container" id="grid"></div>
</div>
```

## Troubleshooting Common Issues

### Issue 1: Data Not Displaying

**Symptoms:** Range Navigator shows empty or blank

**Solutions:**
```csharp
// Verify data is not null
if (Model == null || Model.Count == 0) {
    // Handle empty data
}

// Ensure DateTime data is actually DateTime, not string
var data = Model.Where(x => x.Date is DateTime).ToList();
```

**Debugging:**
```html
<script>
window.addEventListener('load', function() {
    var nav = document.getElementById('container').ej2_instances[0];
    console.log('DataSource:', nav.dataSource);
    console.log('Series:', nav.series);
});
</script>
```

### Issue 2: Performance Issues with Large Datasets

**Symptoms:** Control is slow to load or respond

**Solutions:**
```html
<!-- Enable lightweight mode and deferred updates -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .EnableDeferredUpdate(true)
    .DataSource(Model)
    .Render()
)
```

### Issue 3: DateTime Values Not Recognized

**Symptoms:** Dates appear as numbers or incorrect format

**Solutions:**
```csharp
// Ensure DateTime, not string
public class SalesData
{
    public DateTime Date;  // DateTime type
    public double Value;
}

// Set ValueType explicitly
.ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
```

### Issue 4: Connected Controls Not Updating

**Symptoms:** Grid or chart doesn't respond to range selection

**Solutions:**
```html
<script>
function onRangeChanged(args) {
    // Ensure event is firing
    console.log("Range changed to:", args.start, args.end);
    
    // Verify control instances exist
    var grid = document.getElementById('grid').ej2_instances[0];
    if (!grid) {
        console.error("Grid not found");
        return;
    }
    
    // Update grid
    var filteredData = filterData(args.start, args.end);
    grid.dataSource = filteredData;
}
</script>
```

### Issue 5: Browser Compatibility

**Symptoms:** Control not rendering in certain browsers

**Solutions:**
```html
<!-- Include polyfills for older browsers -->
<script src="https://cdn.syncfusion.com/ej2/33.1.44/ej2.umd.min.js"></script>

<!-- Use compat CSS if needed -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/ej2-base.min.css" />
```

### Issue 6: Styling Not Applied

**Symptoms:** Colors or styling options not showing

**Solutions:**
```html
<!-- Ensure CSS is loaded before script -->
<head>
    <!-- CSS FIRST -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    
    <!-- Scripts after CSS -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>

<!-- Clear CSS cache if needed -->
<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate" />
```

### Diagnostic Steps

1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify data source in debugger
4. Check network tab for CSS/JS loading
5. Validate YAML/JSON structure
6. Test with minimal example
7. Compare with Syncfusion samples

### Getting Support

- Review Syncfusion documentation: https://ej2.syncfusion.com/aspnetmvc/
- Check GitHub issues: https://github.com/syncfusion/ej2-issues
- Contact support: support@syncfusion.com
- Community forums for peer assistance
