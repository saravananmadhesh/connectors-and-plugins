# Zooming and Panning Configuration

This guide covers comprehensive zooming and panning configuration in Syncfusion ASP.NET Core Charts, including various zoom modes, pan support, zoom toolbar, reset functionality, and programmatic control.

## Table of Contents

- [Basic Zooming](#basic-zooming)
  - [Enable Zooming](#enable-zooming)
  - [Enable All Zoom Features](#enable-all-zoom-features)
- [Zoom Modes](#zoom-modes)
  - [Selection Zooming](#selection-zooming)
  - [Pinch Zooming (Touch Devices)](#pinch-zooming-touch-devices)
  - [Mouse Wheel Zooming](#mouse-wheel-zooming)
  - [Zoom by X-Axis Only](#zoom-by-x-axis-only)
  - [Zoom by Y-Axis Only](#zoom-by-y-axis-only)
  - [Zoom Both Axes](#zoom-both-axes)
- [Panning Support](#panning-support)
  - [Enable Panning](#enable-panning)
  - [Panning with Mouse Wheel Zoom](#panning-with-mouse-wheel-zoom)
  - [Panning for Multiple Series](#panning-for-multiple-series)
- [Zoom Toolbar](#zoom-toolbar)
  - [Basic Toolbar](#basic-toolbar)
  - [Custom Toolbar Items](#custom-toolbar-items)
  - [Toolbar Positioning](#toolbar-positioning)
- [Reset Zoom](#reset-zoom)
  - [Reset Button in Toolbar](#reset-button-in-toolbar)
  - [Enable Reset on Double Click](#enable-reset-on-double-click)
- [Programmatic Zoom Control](#programmatic-zoom-control)
  - [Zoom to Specific Range](#zoom-to-specific-range)
  - [Zoom by Factor](#zoom-by-factor)
  - [Zoom Event Handling](#zoom-event-handling)
- [Zoom Customization](#zoom-customization)
  - [Selection Rectangle Style](#selection-rectangle-style)
  - [Deferred Zooming](#deferred-zooming)
  - [Zoom with Scrollbar](#zoom-with-scrollbar)
  - [Auto Zoom on Load](#auto-zoom-on-load)
- [When to Use](#when-to-use)


## Basic Zooming

### Enable Zooming

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true"></e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
public class ChartController : Controller
{
    public IActionResult Index()
    {
        var data = new List<ChartData>();
        var startDate = new DateTime(2024, 1, 1);
        var random = new Random();
        
        for (int i = 0; i < 100; i++)
        {
            data.Add(new ChartData
            {
                Date = startDate.AddDays(i),
                Sales = 20 + random.Next(50)
            });
        }
        
        ViewBag.ChartData = data;
        return View();
    }
}

public class ChartData
{
    public DateTime Date { get; set; }
    public double Sales { get; set; }
}
```

### Enable All Zoom Features

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePinchZooming="true" 
                        enableMouseWheelZooming="true"
                        enablePan="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Zoom Modes

### Selection Zooming

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        mode="@Syncfusion.EJ2.Charts.ZoomMode.X">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.LargeDataSet" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Pinch Zooming (Touch Devices)

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enablePinchZooming="true" 
                        mode="@Syncfusion.EJ2.Charts.ZoomMode.XY">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Mouse Wheel Zooming

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableMouseWheelZooming="true" 
                        mode="@Syncfusion.EJ2.Charts.ZoomMode.XY">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.TimeSeriesData" 
                  xName="Date" 
                  yName="Temperature" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.TimeSeriesData = GenerateTimeSeriesData(365); // Generate 1 year of data
```

### Zoom by X-Axis Only

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enableMouseWheelZooming="true"
                        mode="@Syncfusion.EJ2.Charts.ZoomMode.X">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Zoom by Y-Axis Only

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        mode="@Syncfusion.EJ2.Charts.ZoomMode.Y">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Zoom Both Axes

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryyaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enableMouseWheelZooming="true"
                        mode="@Syncfusion.EJ2.Charts.ZoomMode.XY">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ScatterData" 
                  xName="X" 
                  yName="Y" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Panning Support

### Enable Panning

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Panning with Mouse Wheel Zoom

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableMouseWheelZooming="true" 
                        enablePan="true"
                        mode="@Syncfusion.EJ2.Charts.ZoomMode.XY">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.LargeDataSet" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Panning for Multiple Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true"
                        enableMouseWheelZooming="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales" 
                  xName="Date" 
                  yName="Amount" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
        <e-series dataSource="ViewBag.Profit" 
                  xName="Date" 
                  yName="Amount" 
                  name="Profit"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Zoom Toolbar

### Basic Toolbar

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true"
                        showToolbar="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Custom Toolbar Items

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true"
                        enableMouseWheelZooming="true"
                        showToolbar="true"
                        toolbarItems="new string[] { 'Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset' }">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Toolbar Positioning

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        showToolbar="true"
                        toolbarPosition="Top">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Reset Zoom

### Reset Button in Toolbar

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true"
                        showToolbar="true"
                        toolbarItems="new string[] { 'Zoom', 'Pan', 'Reset' }">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Enable Reset on Double Click

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true"
                        enableMouseWheelZooming="true"
                        showToolbar="true"
                        enableDeferredZooming="false">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Programmatic Zoom Control

### Zoom to Specific Range

```cshtml
<ejs-chart id="chart" loaded="chartLoaded">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>

<button onclick="zoomToRange()">Zoom to Last Quarter</button>
<button onclick="resetZoom()">Reset Zoom</button>

<script>
    var chartObj;
    
    function chartLoaded(args) {
        chartObj = document.getElementById('chart').ej2_instances[0];
    }
    
    function zoomToRange() {
        if (chartObj) {
            chartObj.zoomByRange(
                new Date(2024, 9, 1), // Start date
                new Date(2024, 11, 31) // End date
            );
        }
    }
    
    function resetZoom() {
        if (chartObj) {
            chartObj.zoomReset();
        }
    }
</script>
```

### Zoom by Factor

```cshtml
<ejs-chart id="chart" loaded="chartLoaded">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>

<button onclick="zoomIn()">Zoom In</button>
<button onclick="zoomOut()">Zoom Out</button>

<script>
    var chartObj;
    
    function chartLoaded(args) {
        chartObj = document.getElementById('chart').ej2_instances[0];
    }
    
    function zoomIn() {
        if (chartObj) {
            chartObj.zoomByFactor(0.5);
        }
    }
    
    function zoomOut() {
        if (chartObj) {
            chartObj.zoomByFactor(1.5);
        }
    }
</script>
```

### Zoom Event Handling

```cshtml
<ejs-chart id="chart" onZooming="onZooming" onZoomComplete="onZoomComplete">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true"
                        showToolbar="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>

<div id="zoomInfo"></div>

<script>
    function onZooming(args) {
        document.getElementById('zoomInfo').innerHTML = 
            'Zooming: ' + args.axisCollection[0].zoomFactor.toFixed(2);
    }
    
    function onZoomComplete(args) {
        console.log('Zoom completed');
        console.log('Start:', args.axisCollection[0].zoomPosition);
        console.log('Factor:', args.axisCollection[0].zoomFactor);
    }
</script>
```

## Zoom Customization

### Selection Rectangle Style

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true">
        <e-selectionrectanglesettings fill="rgba(0, 120, 212, 0.3)">
            <e-border color="#0078D4" width="2"></e-border>
        </e-selectionrectanglesettings>
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Deferred Zooming

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enableDeferredZooming="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.LargeDataSet" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Zoom with Scrollbar

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" >
        <e-scrollbarsettings enable="true" 
                           pointsLength="60">
        </e-scrollbarsettings>
    </e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enableMouseWheelZooming="true"
                        enablePan="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller - Generate large dataset
public IActionResult Index()
{
    var data = new List<ChartData>();
    var startDate = new DateTime(2024, 1, 1);
    var random = new Random();
    
    for (int i = 0; i < 365; i++)
    {
        data.Add(new ChartData
        {
            Date = startDate.AddDays(i),
            Sales = 50 + random.Next(-20, 30)
        });
    }
    
    ViewBag.ChartData = data;
    return View();
}
```

### Auto Zoom on Load

```cshtml
<ejs-chart id="chart" loaded="autoZoom">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true" 
                        enablePan="true"
                        showToolbar="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function autoZoom(args) {
        var chart = document.getElementById('chart').ej2_instances[0];
        // Zoom to last 30 days automatically
        var endDate = new Date(2024, 11, 31);
        var startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 30);
        chart.zoomByRange(startDate, endDate);
    }
</script>
```

## When to Use

**Selection Zooming**: Use when users need to examine specific regions of the chart in detail by dragging to select an area.

**Pinch Zooming**: Use for touch-enabled devices and mobile applications where pinch gestures are the natural interaction method.

**Mouse Wheel Zooming**: Use for desktop applications where quick, precise zooming with scroll wheel provides efficient navigation.

**X-Axis Only Zoom**: Use for time-series data where you want to explore different time periods while maintaining Y-axis scale.

**Y-Axis Only Zoom**: Use when examining value ranges while keeping all data points visible on the X-axis.

**Panning**: Use alongside zooming to navigate through large datasets efficiently after zooming in.

**Zoom Toolbar**: Use to provide clear, accessible controls for zoom operations, especially for users unfamiliar with gesture-based zooming.

**Reset Functionality**: Use to allow users to quickly return to the full view after exploring zoomed regions.

**Programmatic Zoom**: Use to automatically focus on specific data ranges, highlight anomalies, or create guided data exploration experiences.

Choose zooming and panning features based on dataset size, interaction methods (touch vs. mouse), user expertise level, and the type of data exploration required.
