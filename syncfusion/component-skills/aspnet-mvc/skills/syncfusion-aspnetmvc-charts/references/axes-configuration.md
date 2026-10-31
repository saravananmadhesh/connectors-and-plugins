# Axes Configuration

## Table of Contents
- [Overview](#overview)
- [Axis Types](#axis-types)
  - [Numeric Axis](#numeric-axis)
  - [DateTime Axis](#datetime-axis)
  - [Category Axis](#category-axis)
  - [Logarithmic Axis](#logarithmic-axis)
- [Multiple Axes](#multiple-axes)
- [Axis Titles](#axis-titles)
- [Axis Labels](#axis-labels)
  - [Label Format](#label-format)
  - [Label Style](#label-style)
  - [Label Rotation](#label-rotation)
- [Smart Axis Labels](#smart-axis-labels)
  - [Label Intersect Actions](#label-intersect-actions)
  - [Edge Label Placement](#edge-label-placement)
- [Multilevel Labels](#multilevel-labels)
- [Axis Customization](#axis-customization)
  - [Grid Lines](#grid-lines)
  - [Tick Lines](#tick-lines)
  - [Axis Line](#axis-line)
- [Axis Crossing](#axis-crossing)
  - [Axis Inversion](#axis-inversion)
  - [Opposed Position](#opposed-position)
- [Strip Lines](#strip-lines)
  - [Single Strip Line](#single-strip-line)
  - [Multiple Strip Lines](#multiple-strip-lines)
  - [Recurrence Strip Lines](#recurrence-strip-lines)
- [Axis Ranges and Intervals](#axis-ranges-and-intervals)
  - [Setting Range](#setting-range)
  - [Auto Range](#auto-range)
  - [Desired Intervals](#desired-intervals)
  - [Coefficient](#coefficient)
- [Common Axis Patterns](#common-axis-patterns)
  - [Time Series with Zoom](#time-series-with-zoom)
  - [Dual Axis Chart](#dual-axis-chart)
- [Troubleshooting](#troubleshooting)
  - [Labels overlapping](#labels-overlapping)
  - [Axis not showing all data](#axis-not-showing-all-data)
  - [DateTime axis showing numbers](#datetime-axis-showing-numbers)
  - [Strip lines not visible](#strip-lines-not-visible)
- [API Reference](#api-reference)

## Overview

Axes are the foundation of chart data representation. Syncfusion Chart supports four axis types (Numeric, DateTime, Category, Logarithmic) with extensive customization options for labels, grid lines, and positioning.

## Axis Types

### Numeric Axis

Default axis type for numerical data.

```cshtml
@Html.EJS().Chart("numericChart").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Double)
        .Minimum(0)
        .Maximum(100)
        .Interval(10)
    ).PrimaryYAxis(py => py
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Double)
        .LabelFormat("${value}")
    ).Series(series => series.DataSource(ViewBag.Data).XName("x").YName("y").Add()
    ).Render()
```

**Use when:** Plotting numerical measurements, quantities, calculations.

**Properties:**
- `Minimum` / `Maximum` - Axis range
- `Interval` - Label interval
- `RangePadding` - Padding around data range (None, Normal, Additional, Round)

### DateTime Axis

For time-based data with automatic date formatting.

```cshtml
@Html.EJS().Chart("dateChart").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
        .LabelFormat("MMM yyyy")
        .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Months)
        .EdgeLabelPlacement(Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift)
    ).Series(series => series
        .DataSource(ViewBag.TimeSeriesData)
        .XName("Date")
        .YName("Value")
        .Add()
    ).Render()
```

**Use when:** Time series data, historical data, date-based trends.

**IntervalType options:**
- `Auto` - Automatically determined
- `Years`, `Months`, `Days`, `Hours`, `Minutes`, `Seconds`

**Date format examples:**
- `"dd/MM/yyyy"` - 17/03/2026
- `"MMM dd, yyyy"` - Mar 17, 2026
- `"yyyy-MM-dd"` - 2026-03-17
- `"hh:mm:ss tt"` - 02:30:45 PM

### Category Axis

For categorical/text data.

```cshtml
@Html.EJS().Chart("categoryChart").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
        .LabelPlacement(Syncfusion.EJ2.Charts.LabelPlacement.BetweenTicks)
    ).Series(series => series
        .DataSource(ViewBag.CategoryData)
        .XName("Country")
        .YName("Sales")
        .Add()
    ).Render()
```

**Use when:** Text labels, discrete categories, non-numerical X-axis.

**Properties:**
- `IsIndexed` - Use data point index instead of unique categories
- `LabelPlacement` - OnTicks or BetweenTicks

### Logarithmic Axis

For exponential data ranges.

```cshtml
@Html.EJS().Chart("logChart").PrimaryYAxis(py => py
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic)
        .LogBase(10)
        .Minimum(1)
        .Maximum(1000000)
    ).Series(series => series.DataSource(ViewBag.ExponentialData).Add()
    ).Render()
```

**Use when:** Exponential growth, large value ranges, scientific data.

**Properties:**
- `LogBase` - Base of logarithm (default: 10)

## Multiple Axes

Add secondary axes for different scales or units.

```cshtml
@Html.EJS().Chart("multiAxisChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py
        .Minimum(0)
        .Maximum(100)
        .Interval(20)
        .Title("Sales ($)")
        .LineStyle(line => line.Width(2).Color("#1E88E5"))
    ).Axes(axes =>
    {
        // Secondary Y-axis
        axes.Name("secondaryYAxis")
            .OpposedPosition(true)
            .Minimum(0)
            .Maximum(50)
            .Interval(10)
            .Title("Profit Margin (%)")
            .LineStyle(line => line.Width(2).Color("#43A047"))
            .Add();
    }
    ).Series(series =>
    {
        // Series using primary Y-axis
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.SalesData)
              .XName("Month")
              .YName("Sales")
              .Name("Sales")
              .Add();
        
        // Series using secondary Y-axis
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .Marker(m => m.Visible(true))
              .DataSource(ViewBag.ProfitData)
              .XName("Month")
              .YName("Profit")
              .Name("Profit %")
              .YAxisName("secondaryYAxis")
              .Add();
    }).Render()
```

**Key points:**
- Add secondary axes via `.Axes()` collection
- Each axis needs unique `Name`
- Reference axis in series using `YAxisName` or `XAxisName`
- Use `OpposedPosition(true)` to place on right/top side

## Axis Titles

Add descriptive titles to axes.

```cshtml
@Html.EJS().Chart("titledChart").PrimaryXAxis(px => px
        .Title("Months")
        .TitleStyle(ts => ts.Size("16px").FontWeight("600").Color("#333"))
    ).PrimaryYAxis(py => py
        .Title("Revenue (in millions)")
        .TitleStyle(ts => ts.Size("16px").FontWeight("600").Color("#333"))
    ).Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

**TitleStyle properties:**
- `Size` - Font size
- `FontFamily` - Font family
- `FontWeight` - Font weight (normal, bold, 600, etc.)
- `Color` - Title color
- `FontStyle` - normal, italic, oblique

## Axis Labels

Customize axis label appearance and formatting.

### Label Format

```cshtml
@Html.EJS().Chart("formattedChart"
    ).PrimaryYAxis(py => py
        .LabelFormat("${value}K")  // Prefix $ and suffix K
        .LabelStyle(ls => ls.Size("12px").Color("#666"))
    ).Series(series => series.DataSource(ViewBag.Data).Add()).Render()
```

**Common formats:**
- `"${value}"` - Currency prefix
- `"{value}%"` - Percentage suffix
- `"{value}K"` - Thousands
- `"n2"` - Number with 2 decimals
- `"c2"` - Currency with 2 decimals

### Label Style

```cshtml
.LabelStyle(ls => ls
    .Size("14px")
    .Color("#000")
    .FontFamily("Arial")
    .FontWeight("400"))
```

### Label Rotation

Rotate labels to fit more text.

```cshtml
.PrimaryXAxis(px => px
    .LabelRotation(-45)  // Rotate 45 degrees counter-clockwise
    .LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Rotate45))
```

## Smart Axis Labels

Automatic handling of overlapping labels.

### Label Intersect Actions

```cshtml
.PrimaryXAxis(px => px
    .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    .LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Trim))
```

**Options:**
- `None` - No action (labels may overlap)
- `Hide` - Hide alternate labels
- `Trim` - Trim labels with ellipsis (...)
- `Wrap` - Wrap labels to multiple lines
- `MultipleRows` - Arrange labels in multiple rows
- `Rotate45` / `Rotate90` - Auto-rotate labels

**Example with trim and tooltip:**
```cshtml
.PrimaryXAxis(px => px
    .LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Trim)
    .EnableTrim(true)
    .MaximumLabelWidth(100))
```



##### Configuration Placement and Supported Actions

Set `LabelIntersectAction` directly on the primary or additional axis. Supported actions are `None`, `Hide`, `Trim`, `Wrap`, `MultipleRows`, `Rotate45`, `Rotate90`, `Rotate45WithTrim`, and `Rotate90WithTrim`.

```cshtml
.PrimaryXAxis(axis => axis
    .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    .LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Rotate45WithTrim)
    .MaximumLabelWidth(90))
```

Use `MaximumLabelWidth` with trim or wrap actions. Use `LabelRotation` only for a fixed angle independent of collision detection. Do not combine contradictory fixed-rotation and intersection-action settings.

##### Complete MVC Sample

```cshtml
@using Syncfusion.EJ2.Charts

@Html.EJS().Chart("axisLabelChart")
    .Title("Department Revenue")
    .PrimaryXAxis(axis => axis
        .ValueType(ValueType.Category)
        .LabelIntersectAction(LabelIntersectAction.Rotate45WithTrim)
        .MaximumLabelWidth(90))
    .PrimaryYAxis(axis => axis.Minimum(0).Maximum(80).Interval(20))
    .Series(series => series.DataSource(ViewBag.DepartmentData)
        .Type(ChartSeriesType.Column).XName("Department").YName("Revenue").Add())
    .Render()
```

```csharp
using System.Web.Mvc;

public class ChartController : Controller
{
    public ActionResult AxisLabels()
    {
        ViewBag.DepartmentData = new[]
        {
            new { Department = "Consumer Electronics and Accessories", Revenue = 72 },
            new { Department = "Home Furniture and Interior Products", Revenue = 58 },
            new { Department = "Sports Equipment and Outdoor Recreation", Revenue = 64 }
        };
        return View();
    }
}
```


#### Rotation with Trimming

`LabelIntersectAction` also supports:

- `Rotate45WithTrim`: Rotates intersecting labels by 45 degrees and trims text that exceeds the available bounds.
- `Rotate90WithTrim`: Rotates intersecting labels by 90 degrees and trims text that exceeds the available bounds.

```cshtml
@Html.EJS().Chart("rotate45WithTrimChart")
    .Title("Department Revenue")
    .PrimaryXAxis(x => x
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Rotate45WithTrim)
        .MaximumLabelWidth(90))
    .PrimaryYAxis(y => y.Minimum(0).Maximum(80).Interval(20))
    .Series(series => series
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .DataSource(ViewBag.DepartmentData)
        .XName("Department").YName("Revenue").Name("Revenue").Add())
    .Render()
```

```csharp
ViewBag.DepartmentData = new[]
{
    new { Department = "Consumer Electronics and Accessories", Revenue = 72 },
    new { Department = "Home Furniture and Interior Products", Revenue = 58 },
    new { Department = "Sports Equipment and Outdoor Recreation", Revenue = 64 },
    new { Department = "Personal Care and Beauty Products", Revenue = 49 }
};
```

For the 90-degree action, use:

```csharp
.LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Rotate90WithTrim)
```

### Edge Label Placement

Control how edge labels are positioned.

```cshtml
.PrimaryXAxis(px => px
    .EdgeLabelPlacement(Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift))
```

**Options:**
- `None` - Default positioning
- `Shift` - Shift edge labels inside chart area
- `Hide` - Hide edge labels if they don't fit



## Axis Scrollbar

Use `ZoomSettings(...EnableScrollbar(true))` for the standard zoom scrollbar. Use axis `ScrollbarSettings(...)` for appearance, placement, lazy-load range, and zoom behavior.

```cshtml
@using Syncfusion.EJ2.Charts

@Html.EJS().Chart("scrollbarChart")
    .PrimaryXAxis(axis => axis.ValueType(ValueType.Category).ZoomFactor(0.5).ZoomPosition(0)
        .ScrollbarSettings(settings => settings.Enable(true).Height(16).EnableZoom(true)
            .Position(ScrollbarPosition.PlaceNextToAxisLine).ScrollbarRadius(4).TrackRadius(4)
            .ScrollbarColor("#6B7280").TrackColor("#E5E7EB").GripColor("#FFFFFF")))
    .ZoomSettings(settings => settings.EnableScrollbar(true).EnableSelectionZooming(true)
        .EnableMouseWheelZooming(true).EnablePan(true).Mode(ZoomMode.X))
    .ScrollStart("scrollStart").ScrollChanged("scrollChanged").ScrollEnd("scrollEnd")
    .Series(series => series.DataSource(ViewBag.MonthlySales).Type(ChartSeriesType.Line)
        .XName("Month").YName("Sales").Add())
    .Render()

<script>
    function scrollStart(args) { console.log('Scroll started', args); }
    function scrollChanged(args) { console.log('Scroll changed', args); }
    function scrollEnd(args) { console.log('Scroll ended', args); }
</script>
```

- Use `Height` of at least `12` for the grip-circle visual.
- Set `EnableZoom(false)` for pan-only behavior.
- Use `Top` or `Bottom` for horizontal axes and `Left` or `Right` for vertical axes.
- Use `Range` for the full DateTime lazy-load range.
- Use `PointsLength` for numeric or logarithmic lazy loading.
- `ScrollStart`, `ScrollChanged`, and `ScrollEnd` report interaction start, continuous change, and final range resolution.

```csharp
using System.Web.Mvc;

public class ChartController : Controller
{
    public ActionResult Scrollbar()
    {
        ViewBag.MonthlySales = new[]
        {
            new { Month = "Jan", Sales = 35 }, new { Month = "Feb", Sales = 28 },
            new { Month = "Mar", Sales = 34 }, new { Month = "Apr", Sales = 32 },
            new { Month = "May", Sales = 40 }, new { Month = "Jun", Sales = 32 }
        };
        return View();
    }
}
```


## Multilevel Labels

Group categories into hierarchical labels.

```cshtml
@Html.EJS().Chart("multilevelChart").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
        .MultiLevelLabels(mll =>
        {
            // First level grouping
            mll.Categories(cat =>
            {
                cat.Start(0).End(2).Text("Q1").Add();
                cat.Start(3).End(5).Text("Q2").Add();
                cat.Start(6).End(8).Text("Q3").Add();
                cat.Start(9).End(11).Text("Q4").Add();
            })
            .Border(b => b.Type(Syncfusion.EJ2.Charts.BorderType.Rectangle))
            .Add();

            // Second level grouping
            mll.Categories(cat =>
            {
                cat.Start(0).End(5).Text("H1").Add();
                cat.Start(6).End(11).Text("H2").Add();
            })
            .Border(b => b.Type(Syncfusion.EJ2.Charts.BorderType.Rectangle))
            .Add();
        })
    ).Series(series => series
        .DataSource(ViewBag.MonthlyData)
        .XName("Month")
        .YName("Sales")
        .Add()).Render()
```

**Use when:** Hierarchical categories (months → quarters → halves), grouped data.

## Axis Customization

### Grid Lines

```cshtml
.PrimaryXAxis(px => px
    .MajorGridLines(mgl => mgl.Width(1).Color("#E0E0E0").DashArray("5,5"))
    .MinorGridLines(mgl => mgl.Width(0.5).Color("#F0F0F0"))
    .MinorTicksPerInterval(4))

.PrimaryYAxis(py => py
    .MajorGridLines(mgl => mgl.Width(1).Color("#E0E0E0"))
    .MinorGridLines(mgl => mgl.Width(0)))  // Hide minor grid lines
```

### Tick Lines

```cshtml
.PrimaryXAxis(px => px
    .MajorTickLines(mtl => mtl.Width(1).Height(10).Color("#000"))
    .MinorTickLines(mtl => mtl.Width(1).Height(5).Color("#666")))
```

### Axis Line

```cshtml
.PrimaryXAxis(px => px
    .LineStyle(ls => ls.Width(2).Color("#000")))
```

## Axis Crossing

Move axis origin to specific value.

```cshtml
@Html.EJS().Chart("crossingChart")
    .PrimaryXAxis(px => px
        .CrossesAt(0))  // Y-axis crosses X-axis at 0
    .PrimaryYAxis(py => py
        .CrossesAt(0))  // X-axis crosses Y-axis at 0
    .Series(series => series.DataSource(ViewBag.Data).Add())
    .Render()
```

**Use when:** Showing positive/negative quadrants, centered origin.

### Axis Inversion

Invert axis direction (vertical chart).

```cshtml
.PrimaryXAxis(px => px.IsInversed(true))
.PrimaryYAxis(py => py.IsInversed(true))
```

### Opposed Position

Place axis on opposite side.

```cshtml
.PrimaryYAxis(py => py.OpposedPosition(true))  // Right side instead of left
```

## Strip Lines

Highlight specific regions or values on the axis.

### Single Strip Line

```cshtml
@Html.EJS().Chart("striplineChart").PrimaryYAxis(py => py
        .StripLines(sl =>
        {
            sl.Start(30)
              .End(40)
              .Text("Target Range")
              .Color("rgba(255, 0, 0, 0.2)")
              .Visible(true)
              .Add();
        })
    ).Series(series => series.DataSource(ViewBag.Data).Add()).Render()
```

### Multiple Strip Lines

```cshtml
.PrimaryYAxis(py => py
    .StripLines(sl =>
    {
        // High performance zone
        sl.Start(75).End(100)
          .Text("Excellent")
          .Color("rgba(0, 255, 0, 0.2)")
          .TextStyle(ts => ts.Color("#000").Size("12px"))
          .Visible(true)
          .Add();
        
        // Average performance zone
        sl.Start(50).End(75)
          .Text("Good")
          .Color("rgba(255, 255, 0, 0.2)")
          .Visible(true)
          .Add();
        
        // Low performance zone
        sl.Start(0).End(50)
          .Text("Needs Improvement")
          .Color("rgba(255, 0, 0, 0.2)")
          .Visible(true)
          .Add();
    }))
```

### Recurrence Strip Lines

Repeating strip lines at intervals.

```cshtml
.PrimaryXAxis(px => px
    .StripLines(sl =>
    {
        sl.StartFromAxis(true)
          .Size(1)
          .IsRepeat(true)
          .RepeatEvery(2)
          .Color("rgba(0, 0, 0, 0.05)")
          .Visible(true)
          .Add();
    }))
```

**Use when:** Alternating row colors, recurring events, zone highlighting.

## Axis Ranges and Intervals

### Setting Range

```cshtml
.PrimaryYAxis(py => py
    .Minimum(0)
    .Maximum(100)
    .Interval(10))
```

### Auto Range

Let chart calculate range automatically:

```cshtml
.PrimaryYAxis(py => py
    .RangePadding(Syncfusion.EJ2.Charts.ChartRangePadding.Auto))
```

**RangePadding options:**
- `None` - No padding
- `Normal` - 5% padding
- `Additional` - 10% padding
- `Round` - Round to nearest interval
- `Auto` - Automatically determined

### Desired Intervals

Suggest preferred interval count:

```cshtml
.PrimaryYAxis(py => py
    .DesiredIntervals(5))  // Try to have ~5 intervals
```

## Common Axis Patterns

### Time Series with Zoom

```cshtml
@Html.EJS().Chart("timeSeries").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
        .LabelFormat("MMM dd")
        .EdgeLabelPlacement(Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift)
        .MajorGridLines(mgl => mgl.Width(0))
        .MinorTickLines(mtl => mtl.Width(0))
    ).PrimaryYAxis(py => py
        .LabelFormat("${value}K")
        .LineStyle(ls => ls.Width(0))
    ).ZoomSettings(zoom => zoom.EnableSelectionZooming(true)
    ).Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

### Dual Axis Chart

```cshtml
@Html.EJS().Chart("dualAxis").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py.Title("Revenue ($)").Interval(10)
    ).Axes(axes =>
    {
        axes.Name("secondary")
            .OpposedPosition(true)
            .Title("Growth (%)")
            .Interval(5)
            .Minimum(0)
            .Maximum(50)
            .Add();
    }
    ).Series(series =>
    {
        series.DataSource(revenueData).YName("Revenue").Add();
        series.DataSource(growthData).YName("Growth").YAxisName("secondary").Add();
    }
    ).Render()
```

## Troubleshooting

### Labels overlapping
- Use `LabelIntersectAction` (Trim, Wrap, MultipleRows, Rotate)
- Reduce font size in `LabelStyle`
- Increase chart width
- Rotate labels with `LabelRotation`

### Axis not showing all data
- Check `Minimum` and `Maximum` values
- Use `RangePadding` for automatic adjustment
- Verify data types match `ValueType`

### DateTime axis showing numbers
- Ensure `ValueType` is `DateTime`
- Check data contains actual DateTime objects, not strings
- Use proper date format in `LabelFormat`

### Strip lines not visible
- Set `Visible(true)`
- Check `Start` and `End` values are within axis range
- Adjust `Color` opacity (use rgba)

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html
