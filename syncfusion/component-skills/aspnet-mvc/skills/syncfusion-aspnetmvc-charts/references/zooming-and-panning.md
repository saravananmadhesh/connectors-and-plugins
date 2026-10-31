# Zooming and Panning

## Table of Contents
- [Overview](#overview)
- [Zoom Modes](#zoom-modes)
  - [X-Axis Only Zoom](#x-axis-only-zoom)
  - [Y-Axis Only Zoom](#y-axis-only-zoom)
- [Zoom Types](#zoom-types)
  - [Selection Zooming](#selection-zooming)
  - [Pinch Zooming](#pinch-zooming)
  - [MouseWheel Zooming](#mousewheel-zooming)
  - [All Zoom Types Combined](#all-zoom-types-combined)
- [Zoom Toolbar](#zoom-toolbar)
  - [Custom Toolbar Position](#custom-toolbar-position)
  - [Scrollbar for Zoomed Charts](#scrollbar-for-zoomed-charts)
- [Panning](#panning)
- [Programmatic Zoom](#programmatic-zoom)
  - [Zoom to Specific Range](#zoom-to-specific-range)
  - [Zoom by Factor](#zoom-by-factor)
  - [Zoom to Specific Axis Range](#zoom-to-specific-axis-range)
- [Zoom Events](#zoom-events)
  - [On Zoom Complete](#on-zoom-complete)
  - [Before Zoom](#before-zoom)
- [Advanced Features](#advanced-features)
  - [Auto Interval on Zoom](#auto-interval-on-zoom)
  - [Zoom Factor and Position](#zoom-factor-and-position)
  - [Axis-Specific Zoom Control](#axis-specific-zoom-control)
- [Common Patterns](#common-patterns)
  - [Time Series with Zoom and Scrollbar](#time-series-with-zoom-and-scrollbar)
  - [Financial Chart with Zoom](#financial-chart-with-zoom)
  - [Large Dataset with Initial Zoom](#large-dataset-with-initial-zoom)
  - [Custom Zoom Controls](#custom-zoom-controls)
- [Troubleshooting](#troubleshooting)
  - [Zoom not working](#zoom-not-working)
  - [Scrollbar not appearing](#scrollbar-not-appearing)
  - [Pan not working](#pan-not-working)
  - [Toolbar not visible](#toolbar-not-visible)
- [Performance Tips](#performance-tips)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Overview

Zooming and panning enable users to explore data in detail by magnifying specific regions and navigating through zoomed areas.

## Zoom Modes

Control which axes are zoomable.

```cshtml
@Html.EJS().Chart("zoomChart")
    .ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .Mode(Syncfusion.EJ2.Charts.ZoomMode.XY))
    .Series(series => series.DataSource(ViewBag.Data).Add())
    .Render()
```

**Zoom modes:**
- `X` - Zoom X-axis only (horizontal)
- `Y` - Zoom Y-axis only (vertical)
- `XY` - Zoom both axes (default)

### X-Axis Only Zoom

```cshtml
.ZoomSettings(zoom => zoom
    .EnableSelectionZooming(true)
    .Mode(Syncfusion.EJ2.Charts.ZoomMode.X))
```

**Use when:** Time series data, horizontal trends.

### Y-Axis Only Zoom

```cshtml
.ZoomSettings(zoom => zoom
    .EnableSelectionZooming(true)
    .Mode(Syncfusion.EJ2.Charts.ZoomMode.Y))
```

**Use when:** Comparing magnitudes, vertical analysis.

## Zoom Types

Different methods to trigger zoom.

### Selection Zooming

Drag to select area to zoom (most common).

```cshtml
.ZoomSettings(zoom => zoom
    .EnableSelectionZooming(true))
```

### Pinch Zooming

Touch pinch gesture for mobile/tablet.

```cshtml
.ZoomSettings(zoom => zoom
    .EnablePinchZooming(true))
```

### MouseWheel Zooming

Scroll to zoom.

```cshtml
.ZoomSettings(zoom => zoom
    .EnableMouseWheelZooming(true))
```

### All Zoom Types Combined

```cshtml
@Html.EJS().Chart("allZoomTypes")
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
    ).ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .EnablePinchZooming(true)
        .EnableMouseWheelZooming(true)
        .Mode(Syncfusion.EJ2.Charts.ZoomMode.XY)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .DataSource(ViewBag.TimeSeriesData)
              .XName("Date")
              .YName("Value")
              .Add();
    }).Render()
```

## Zoom Toolbar

Built-in toolbar with zoom controls.

```cshtml
@Html.EJS().Chart("toolbarChart").ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .EnableScrollbar(true)
        .ToolbarItems(new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" })
    ).Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

**Toolbar items:**
- `Zoom` - Enable zoom mode
- `ZoomIn` - Zoom in button
- `ZoomOut` - Zoom out button
- `Pan` - Enable pan mode
- `Reset` - Reset zoom to original

### Custom Toolbar Position

```cshtml
.ZoomSettings(zoom => zoom
    .ToolbarItems(new string[] { "Zoom", "Pan", "Reset" })
    .EnableSelectionZooming(true))
```

### Scrollbar for Zoomed Charts

```cshtml
.ZoomSettings(zoom => zoom
    .EnableSelectionZooming(true)
    .EnableScrollbar(true))
```

## Panning

Navigate through zoomed chart areas.

```cshtml
@Html.EJS().Chart("panChart")
    .ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .EnablePan(true)
    ).Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

**Panning controls:**
- **Mouse**: Drag while zoomed
- **Toolbar**: Click Pan button, then drag
- **Touch**: Drag with finger (mobile)

## Programmatic Zoom

Control zoom via code.

## Zoom Events

Handle zoom events for custom behavior.

### On Zoom Complete

```cshtml
<script>
    function onZoomComplete(args) {
        console.log("Zoom complete");
        console.log("Axis:", args.axis);
        console.log("Zoom Factor:", args.currentZoomFactor);
        console.log("Zoom Position:", args.currentZoomPosition);
        
        // Custom action after zoom
        updateDataLabel(args.currentZoomFactor);
    }
</script>

@Html.EJS().Chart("zoomEventChart").ZoomComplete("onZoomComplete")
    .ZoomSettings(zoom => zoom.EnableSelectionZooming(true))
    .Series(series => series.Add()).Render()
```

### Before Zoom

```cshtml
<script>
    function beforeZoom(args) {
        console.log("About to zoom");
        
        // Prevent zoom if condition not met
        if (args.axis.zoomFactor < 0.1) {
            args.cancel = true;
            alert("Maximum zoom level reached!");
        }
    }
</script>

@Html.EJS().Chart("beforeZoomChart").ZoomSettings(zoom => zoom.EnableSelectionZooming(true))
    .OnZooming("beforeZoom")
    .Series(series => series.Add()).Render()
```

## Advanced Features

### Auto Interval on Zoom

Automatically adjust axis intervals when zooming:

```cshtml
.PrimaryXAxis(px => px
    .EnableAutoIntervalOnZooming(true))
```

### Zoom Factor and Position

Set initial zoom state:

```cshtml
.PrimaryXAxis(px => px
    .ZoomFactor(0.5)      // 50% zoomed
    .ZoomPosition(0.25))  // Start at 25% position
```

### Axis-Specific Zoom Control

```cshtml
@Html.EJS().Chart("axisZoomChart").PrimaryXAxis(px => px
        .EnableScrollbarOnZooming(true)
        .ZoomFactor(0.5)
        .ZoomPosition(0)
    ).PrimaryYAxis(py => py
        .ZoomFactor(1)  // Y-axis not zoomed
        .ZoomPosition(0)
    ).ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .Mode(Syncfusion.EJ2.Charts.ZoomMode.X)
    ).Series(series => series.Add()).Render()
```

## Common Patterns

### Time Series with Zoom and Scrollbar

```cshtml
@Html.EJS().Chart("timeSeriesZoom").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
        .LabelFormat("MMM dd")
        .EdgeLabelPlacement(Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift)
        .EnableAutoIntervalOnZooming(true)
    ).ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .EnableMouseWheelZooming(true)
        .EnablePinchZooming(true)
        .EnableScrollbar(true)
        .Mode(Syncfusion.EJ2.Charts.ZoomMode.X)
        .ToolbarItems(new string[] { "Zoom", "Pan", "Reset" })
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(ViewBag.StockData)
              .XName("Date")
              .YName("Price")
              .Add();
    }).Render()
```

### Financial Chart with Zoom

```cshtml
@Html.EJS().Chart("financialZoom").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
        .ZoomFactor(0.3)
        .ZoomPosition(0.7)
    ).ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .EnablePan(true)
        .Mode(Syncfusion.EJ2.Charts.ZoomMode.X)
        .ToolbarItems(new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" })
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(ViewBag.CandleData)
              .XName("Date")
              .High("High")
              .Low("Low")
              .Open("Open")
              .Close("Close")
              .Add();
    }).Render()
```

### Large Dataset with Initial Zoom

```cshtml
@Html.EJS().Chart("largeDataZoom").PrimaryXAxis(px => px
        .ZoomFactor(0.1)  // Show 10% of data initially
        .ZoomPosition(0.9)  // Start at 90% (show latest data)
        .EnableScrollbarOnZooming(true)
    ).ZoomSettings(zoom => zoom
        .EnableMouseWheelZooming(true)
        .EnablePan(true)
        .Mode(Syncfusion.EJ2.Charts.ZoomMode.X)
    ).Series(series =>
    {
        series.DataSource(ViewBag.LargeDataset)  // 10000+ points
              .XName("X")
              .YName("Y")
              .Add();
    }).Render()
```

### Custom Zoom Controls

```cshtml
<div style="margin-bottom:10px;">
    <button onclick="zoomToLast7Days()">Last 7 Days</button>
    <button onclick="zoomToLast30Days()">Last 30 Days</button>
    <button onclick="zoomToAll()">Show All</button>
</div>

@Html.EJS().Chart("customZoomControls").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
    ).ZoomSettings(zoom => zoom.EnableSelectionZooming(true)
    ).Loaded("onChartLoad").Series(series => series.Add()).Render()

<script>
    var chart;
var totalDays = 365;

function onChartLoad(args) {
    // Correctly capturing the instance
    chart = args.chart;
}

function zoomToLast7Days() {
    var factor = 7 / totalDays;
    chart.primaryXAxis.zoomFactor = factor;
    chart.primaryXAxis.zoomPosition = 1 - factor;
    // No need to set isZoomed manually; refresh() handles it
    chart.refresh();
}

function zoomToAll() {
    // Proper way to reset zoom programmatically
    chart.primaryXAxis.zoomFactor = 1;
    chart.primaryXAxis.zoomPosition = 0;
    chart.refresh();
}
</script>
```

## Troubleshooting

### Zoom not working
- Check `EnableSelectionZooming(true)` is set
- Verify ZoomSettings is configured
- Ensure chart has sufficient data points
- Check if other interactions are conflicting

### Scrollbar not appearing
- Set `EnableScrollbar(true)`
- Ensure chart is actually zoomed
- Check chart dimensions are adequate
- Verify no CSS is hiding scrollbar

### Pan not working
- Enable pan: `EnablePan(true)`
- Chart must be zoomed first
- Check if Mode allows panning direction
- Verify no JavaScript errors

### Toolbar not visible
- Check `ToolbarItems` array is not empty
- Ensure zoom is enabled
- Verify chart height accommodates toolbar
- Check CSS isn't hiding toolbar elements

## Performance Tips

1. **Large Datasets**: Enable zoom by default to show subset
2. **Initial Zoom**: Use `ZoomFactor` to limit initial view
3. **Scrollbar**: Use for better navigation experience
4. **MouseWheel**: Enable for quick zoom in/out
5. **Auto Interval**: Enable `EnableAutoIntervalOnZooming` for dynamic labels

## Best Practices

1. **Always provide Reset**: Include Reset button in toolbar
2. **Mobile Support**: Enable pinch zooming for touch devices
3. **Initial State**: Consider starting with zoomed view for large datasets
4. **Feedback**: Provide visual feedback during zoom operations
5. **Axis Labels**: Use `EnableAutoIntervalOnZooming` for clean labels
6. **Documentation**: Inform users about zoom capabilities

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartZoomSettings.html
