# Legend

## Table of Contents
- [Overview](#overview)
- [Enabling Legend](#enabling-legend)
  - [Hide Legend](#hide-legend)
- [Legend Position](#legend-position)
  - [Custom Position](#custom-position)
- [Legend Alignment](#legend-alignment)
  - [Examples by Position](#examples-by-position)
- [Legend Customization](#legend-customization)
  - [Shape and Size](#shape-and-size)
  - [Text Style](#text-style)
  - [Background and Border](#background-and-border)
  - [Margin](#margin)
- [Legend Paging](#legend-paging)
- [Legend Click and Toggle](#legend-click-and-toggle)
  - [Toggle Visibility](#toggle-visibility)
  - [Disable Toggle](#disable-toggle)
  - [Legend Click Event](#legend-click-event)
- [Advanced Features](#advanced-features)
  - [Custom Legend Text](#custom-legend-text)
  - [Legend Shapes](#legend-shapes)
  - [Legend Templates](#legend-templates)
  - [Highlight Series on Legend Hover](#highlight-series-on-legend-hover)
  - [Reverse Legend Order](#reverse-legend-order)
- [Common Patterns](#common-patterns)
  - [Bottom Legend (Default)](#bottom-legend-default)
  - [Right-Side Legend](#right-side-legend)
  - [Styled Legend](#styled-legend)
  - [Multi-Series with Paging](#multi-series-with-paging)
- [Responsive Legend](#responsive-legend)
- [Troubleshooting](#troubleshooting)
  - [Legend not showing](#legend-not-showing)
  - [Legend items truncated](#legend-items-truncated)
  - [Legend overlapping chart](#legend-overlapping-chart)
  - [Toggle not working](#toggle-not-working)
- [Best Practices](#best-practices)
- [Related Topics](#related-topics)
- [API Reference](#api-reference)

## Overview

The legend provides information about series rendered in the chart, helping users identify which visual elements correspond to which data series.

## Enabling Legend

Legend is enabled by default. Control visibility explicitly:

```cshtml

@Html.EJS().Chart("legendChart").Height("400px").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
        .Title("Month")
    ).PrimaryYAxis(py => py
        .Title("Sales")
    ).LegendSettings(legend => legend.Visible(true)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.Sales2023)
              .XName("Month")
              .YName("Sales")
              .Name("2023 Sales")
              .Add();
    }).Render()

```

### Hide Legend

```cshtml
.LegendSettings(legend => legend.Visible(false))
```

## Legend Position

Position legend relative to chart area.

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom))
```

**Position options:**
- `Top` - Above chart
- `Bottom` - Below chart (default)
- `Left` - Left side
- `Right` - Right side
- `Custom` - Custom X/Y coordinates

### Custom Position

```cshtml
.LegendSettings(legend => legend
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Custom)
    .Location(location => location.X(100).Y(50)))
```

## Legend Alignment

Align legend within its position.

```cshtml
.LegendSettings(legend => legend
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
    .Alignment(Syncfusion.EJ2.Charts.Alignment.Center))
```

**Alignment options:**
- `Near` - Left/Top
- `Center` - Center (default)
- `Far` - Right/Bottom

### Examples by Position

```cshtml
// Bottom-Right
.LegendSettings(legend => legend
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
    .Alignment(Syncfusion.EJ2.Charts.Alignment.Far))

// Top-Left
.LegendSettings(legend => legend
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Top)
    .Alignment(Syncfusion.EJ2.Charts.Alignment.Near))
```

## Legend Customization

### Shape and Size

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ShapeHeight(15)
    .ShapeWidth(15)
    .ShapePadding(8))
```

**Shape properties:**
- `ShapeHeight` - Symbol height (default: 10)
- `ShapeWidth` - Symbol width (default: 10)
- `ShapePadding` - Space between symbol and text (default: 5)

### Text Style

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .TextStyle(text => text
        .Size("14px")
        .FontFamily("Arial")
        .FontWeight("600")
        .Color("#333333")))
```

### Background and Border

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Background("rgba(255, 255, 255, 0.9)")
    .Border(border => border
        .Width(1)
        .Color("#E0E0E0"))
    .Padding(10))
```

### Margin

```cshtml
.LegendSettings(legend => legend
    .Margin(margin => margin
        .Left(10)
        .Right(10)
        .Top(10)
        .Bottom(10)))
```

## Legend Paging

Enable paging for legends with many items.

```cshtml

@Html.EJS().Chart("pagedLegend").Height("400px").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py).LegendSettings(legend => legend
        .Visible(true)
        .Height("100")
        .Width("200")
        .EnablePages(true)
    ).Series(series =>
    {
        for (int i = 0; i < 15; i++)
        {
            series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
                  .XName("X")
                  .YName("Y")
                  .DataSource(ViewBag.Data[i])
                  .Name($"Series {i + 1}")
                  .Add();
        }
    }).Render()
```

**Paging features:**
- Automatic page breaks
- Navigation arrows
- Page indicators

## Legend Click and Toggle

### Toggle Visibility

Click legend items to show/hide series (enabled by default).

```cshtml
.LegendSettings(legend => legend
    .ToggleVisibility(true))  // Default: true
```

### Disable Toggle

```cshtml
.LegendSettings(legend => legend
    .ToggleVisibility(false))
```

### Legend Click Event

Handle legend clicks programmatically:

```cshtml

@Html.EJS().Chart("eventChart").Height("400px").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py).LegendSettings(lg => lg.Visible(true)
    ).LegendClick("onLegendClick").Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .XName("Month")
              .YName("Sales")
              .Name("Important Series")
              .DataSource(ViewBag.ChartData)
              .Add();
    }).Render()

<script>
    function onLegendClick(args) {
        console.log("Legend clicked:", args.legendText);
        console.log("Series visible:", !args.cancel);

        // Prevent hiding a specific series
        if (args.legendText === "Important Series") {
            alert("This series cannot be hidden!");
            args.cancel = true;
        }
    }
</script

```

## Advanced Features

### Custom Legend Text

Override series names in legend:

```cshtml
.Series(series =>
{
    series.DataSource(ViewBag.Data)
          .XName("Month")
          .YName("Sales")
          .Name("Revenue")  // Appears in legend
          .LegendShape(Syncfusion.EJ2.Charts.LegendShape.Circle)
          .Add();
})
```

### Legend Shapes

Customize legend symbol shape per series:

```cshtml
.Series(series =>
{
    series.Name("Product A")
          .LegendShape(Syncfusion.EJ2.Charts.LegendShape.Circle)
          .Add();
    
    series.Name("Product B")
          .LegendShape(Syncfusion.EJ2.Charts.LegendShape.Triangle)
          .Add();
    
    series.Name("Product C")
          .LegendShape(Syncfusion.EJ2.Charts.LegendShape.Diamond)
          .Add();
})
```

**Available shapes:**
- `Circle`, `Rectangle`, `Triangle`, `Diamond`, `Cross`
- `HorizontalLine`, `VerticalLine`, `Pentagon`, `InvertedTriangle`
- `SeriesType` - Match series chart type (default)

### Legend Templates

Create custom legend HTML:

```cshtml

.LegendSettings(legend => legend
    .Visible(true)
    .Template("#legendTemplate")
)

```

```cshtml
<script id="legendTemplate" type="text/x-template">
    <div style="display:flex; align-items:center;">
        <div style="width:15px; height:15px; background:${fill}; margin-right:5px;"></div>
        <span style="font-weight:600;">${name}</span>
    </div>
</script>
```

### Reverse Legend Order

```cshtml
.LegendSettings(legend => legend
    .Reverse(true))
```

## Common Patterns

### Bottom Legend (Default)

```cshtml
@Html.EJS().Chart("bottomLegend").LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
        .Alignment(Syncfusion.EJ2.Charts.Alignment.Center)
        .Padding(15)).Series(series =>
    {
        series.Name("Sales").Add();
        series.Name("Profit").Add();
        series.Name("Expenses").Add();
    }).Render()
```

### Right-Side Legend

```cshtml
@Html.EJS().Chart("rightLegend").LegendSettings(legend => legend
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
        .Alignment(Syncfusion.EJ2.Charts.Alignment.Near)
        .Height("100%")
        .Width("150")
        .Border(b => b.Width(1).Color("#E0E0E0"))
        .Padding(10)).Series(series => series.Add()).Render()
```

### Styled Legend

```cshtml
@Html.EJS().Chart("styledLegend")
    .LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Top)
        .Background("#F5F5F5")
        .Border(b => b.Width(2).Color("#1E88E5"))
        .TextStyle(ts => ts
            .Size("13px")
            .FontWeight("600")
            .Color("#1E88E5"))
        .ShapeHeight(12)
        .ShapeWidth(12)
        .Padding(12))
    .Series(series => series.Add())
    .Render()
```

### Multi-Series with Paging

```cshtml
@Html.EJS().Chart("multiSeriesLegend").LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
        .Height("200")
        .Width("150")
        .EnablePages(true)
        .TextStyle(ts => ts.Size("12px"))
    ).Series(series =>
    {
        for (int i = 1; i <= 20; i++)
        {
            series.DataSource(GetSeriesData(i))
                  .XName("x")
                  .YName("y")
                  .Name($"Product {i}")
                  .Add();
        }
    }).Render()
```

## Responsive Legend

Adjust legend for different screen sizes:

```cshtml
<style>
    @media (max-width: 768px) {
        #responsiveChart .e-legend {
            font-size: 10px !important;
        }
    }
</style>

@Html.EJS().Chart("responsiveChart").LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom))
    .Series(series => series.Add()).Render()
```

## Troubleshooting

### Legend not showing
- Check `Visible(true)` in LegendSettings
- Verify series have `Name` property set
- Ensure legend position doesn't overflow chart area
- Check if `Height` or `Width` is too small

### Legend items truncated
- Increase `Width` for legend
- Enable paging with `EnablePages(true)`
- Reduce font size in TextStyle
- Use shorter series names

### Legend overlapping chart
- Adjust chart dimensions to accommodate legend
- Use `Position` and `Alignment` appropriately
- Set explicit `Margin` values
- Consider using Custom position

### Toggle not working
- Check `ToggleVisibility(true)` is set
- Verify no JavaScript errors in console
- Ensure series are properly configured
- Check event handlers aren't canceling toggle

## Best Practices

1. **Names**: Give series meaningful, concise names
2. **Position**: Bottom for horizontal charts, Right for many series
3. **Paging**: Enable for 8+ series
4. **Style**: Match legend style to chart theme
5. **Visibility**: Always show legend for multi-series charts
6. **Toggle**: Keep enabled for user interactivity
7. **Responsiveness**: Adjust legend for mobile views

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartLegendSettings.html
