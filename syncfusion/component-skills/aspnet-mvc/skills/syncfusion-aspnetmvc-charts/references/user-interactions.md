# User Interactions

## Table of Contents
- [Overview](#overview)
- [Crosshair](#crosshair)
  - [Crosshair Customization](#crosshair-customization)
  - [Crosshair Tooltip Format](#crosshair-tooltip-format)
- [Trackball](#trackball)
- [Selection](#selection)
  - [Point Selection](#point-selection)
  - [Multi-Selection](#multi-selection)
  - [Selection Pattern](#selection-pattern)
  - [Selection Events](#selection-events)
- [Highlight](#highlight)
  - [Custom Highlight Style](#custom-highlight-style)
- [Combined Interactions](#combined-interactions)
- [Common Patterns](#common-patterns)
  - [Financial Chart Interactions](#financial-chart-interactions)
  - [Comparison Chart with Highlight](#comparison-chart-with-highlight)
- [Troubleshooting](#troubleshooting)
  - [Crosshair not showing](#crosshair-not-showing)
  - [Selection not working](#selection-not-working)
  - [Highlight flickering](#highlight-flickering)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Overview

User interactions enhance chart usability through crosshair tracking, trackball for multi-series, selection modes, and hover highlighting.

## Crosshair

Vertical and horizontal lines that follow the mouse cursor for precise data tracking.

```cshtml
@Html.EJS().Chart("crosshairChart").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
        .CrosshairTooltip(ct => ct.Enable(true))
    ).PrimaryYAxis(py => py
        .CrosshairTooltip(ct => ct.Enable(true))
    ).Crosshair(cross => cross
        .Enable(true)
        .LineType(Syncfusion.EJ2.Charts.LineType.Vertical)
    ).Series(series =>
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .XName("Month")
              .YName("Sales")
              .DataSource(ViewBag.ChartData)
              .Add()
    ).Render()
```

**LineType options:**
- `Vertical` - Vertical line only
- `Horizontal` - Horizontal line only
- `Both` - Both lines (default)

### Crosshair Customization

```cshtml
.Crosshair(cross => cross
    .Enable(true)
    .Line(line => line
        .Width(2)
        .Color("#FF0000")
        .DashArray("5,5")))
```

### Crosshair Tooltip Format

```cshtml
.PrimaryXAxis(px => px
    .CrosshairTooltip(ct => ct
        .Enable(true)
        .Fill("rgba(0,0,0,0.8)")
        .TextStyle(ts => ts.Color("#FFF").Size("12px"))))
```

## Trackball

Display values from all series at cursor position.

```cshtml
@Html.EJS().Chart("trackballChart").Tooltip(tooltip => tooltip
        .Enable(true)
        .Shared(true)
    ).Crosshair(cross => cross
        .Enable(true)
        .LineType(Syncfusion.EJ2.Charts.LineType.Vertical)
    ).Series(series =>
    {
        series.Name("Product A").DataSource(dataA).Add();
        series.Name("Product B").DataSource(dataB).Add();
        series.Name("Product C").DataSource(dataC).Add();
    }).Render()
```

**Best for:** Comparing multiple series at specific points.

## Selection

Select data points, series, or clusters.

```cshtml
@Html.EJS().Chart("selectionChart").SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point).Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

**Selection modes:**
- `None` - No selection
- `Point` - Select individual points
- `Series` - Select entire series
- `Cluster` - Select points across series at same index
- `DragXY` - Rectangular selection
- `DragX` - Horizontal selection
- `DragY` - Vertical selection

### Point Selection

```cshtml
@Html.EJS().Chart("pointSelection").SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point).Series(series =>
    {
        series.DataSource(ViewBag.Data)
              .SelectionStyle("selection-style")
              .Add();
    }).Render()

<style>
    .selection-style {
        fill: #FF5733;
        opacity: 1;
    }
</style>
```

### Multi-Selection

```cshtml
@Html.EJS().Chart("multiSelection").SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point).IsMultiSelect(true).Series(series => series.Add()
    ).Render()
```

**Usage:** Hold Ctrl/Cmd and click to select multiple points.

### Selection Pattern

```cshtml
.Series(series =>
{
    series.DataSource(ViewBag.Data)
          .SelectionStyle("custom-selection")
          .Add();
})

<style>
    .custom-selection {
        fill: url(#selection-pattern);
        stroke: #FF0000;
        stroke-width: 3;
    }
</style>
```

### Selection Events

```cshtml
<script>
    function onChartMouseClick(args) {
        if (args.target.includes('_Series_')) {
            console.log("Point selected:", args.data);
            // Custom action on selection
            updateDetailsPanel(args.data);
        }
    }
</script>

@Html.EJS().Chart("selectionEvent").SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point).ChartMouseClick("onChartMouseClick").Series(series => series.Add()
    ).Render()
```

## Highlight

Highlight series or points on hover.

```cshtml
@Html.EJS().Chart("highlightChart").HighlightMode(Syncfusion.EJ2.Charts.HighlightMode.Point).Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

**Highlight modes:**
- `None` - No highlighting
- `Point` - Highlight individual points on hover
- `Series` - Highlight entire series on hover
- `Cluster` - Highlight points across series

### Custom Highlight Style

```cshtml
.Series(series =>
{
    series.DataSource(ViewBag.Data)
          .HighlightStyle("highlight-style")
          .Add();
})

<style>
    .highlight-style {
        fill: #FFD700;
        opacity: 0.8;
        stroke: #FF8C00;
        stroke-width: 2;
    }
</style>
```

## Combined Interactions

```cshtml
@Html.EJS().Chart("interactiveChart").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
        .CrosshairTooltip(ct => ct.Enable(true))
    ).PrimaryYAxis(py => py
        .CrosshairTooltip(ct => ct.Enable(true))
    ).Tooltip(tooltip => tooltip.Enable(true).Shared(true)
    ).Crosshair(cross => cross
        .Enable(true)
        .LineType(Syncfusion.EJ2.Charts.LineType.Both)
    ).SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point)
    .HighlightMode(Syncfusion.EJ2.Charts.HighlightMode.Series)
    .ZoomSettings(zoom => zoom.EnableSelectionZooming(true)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .XName("Month")
              .YName("Sales")
              .Name("Sales")
              .Marker(m => m.Visible(true))
              .DataSource(ViewBag.Sales)
              .Add();
        
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .XName("Month")
              .YName("Profit")
              .Name("Profit")
              .Marker(m => m.Visible(true))
              .DataSource(ViewBag.Profit)
              .Add();
    }).Render()
```

## Common Patterns

### Financial Chart Interactions

```cshtml
@Html.EJS().Chart("financialInteractions").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
        .CrosshairTooltip(ct => ct.Enable(true))
    ).Crosshair(cross => cross
        .Enable(true)
        .LineType(Syncfusion.EJ2.Charts.LineType.Vertical)
    ).Tooltip(tooltip => tooltip
        .Enable(true)
        .Format("<b>${point.x}</b><br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}")
    ).ZoomSettings(zoom => zoom
        .EnableSelectionZooming(true)
        .Mode(Syncfusion.EJ2.Charts.ZoomMode.X)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(ViewBag.StockData)
              .Add();
    }).Render()
```

### Comparison Chart with Highlight

```cshtml
@Html.EJS().Chart("comparisonChart").HighlightMode(Syncfusion.EJ2.Charts.HighlightMode.Series).Tooltip(tooltip => tooltip.Enable(true).Shared(true)
    ).LegendSettings(legend => legend.ToggleVisibility(true)
    ).Series(series =>
    {
        series.Name("2022").DataSource(data2022).Add();
        series.Name("2023").DataSource(data2023).Add();
        series.Name("2024").DataSource(data2024).Add();
    }).Render()
```

## Troubleshooting

### Crosshair not showing
- Enable crosshair: `CrosshairSettings.Enable(true)`
- Enable axis tooltips: `CrosshairTooltip.Enable(true)`
- Check mouse events aren't blocked
- Verify chart has data

### Selection not working
- Set SelectionMode to appropriate value (not None)
- Check if selection style is defined
- Verify no JavaScript errors
- Test with simple chart first

### Highlight flickering
- Check for CSS conflicts
- Reduce opacity in highlight style
- Verify no overlapping elements
- Test with fewer series

## Best Practices

1. **Crosshair**: Use for precise value tracking
2. **Trackball**: Ideal for multi-series comparison
3. **Selection**: Enable for data exploration
4. **Highlight**: Improves series identification
5. **Combine**: Use multiple interactions together
6. **Mobile**: Test touch interactions thoroughly

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html
