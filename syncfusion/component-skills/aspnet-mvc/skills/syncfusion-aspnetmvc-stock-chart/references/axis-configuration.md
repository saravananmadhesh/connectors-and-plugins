# Axis Configuration

## Table of Contents
- [Overview](#overview)
- [Primary Axes](#primary-axes)
- [X-Axis (Time Axis)](#x-axis-time-axis)
  - [DateTime Axis](#datetime-axis)
  - [DateTimeCategory Axis](#datetimecategory-axis)
  - [Category Axis](#category-axis)
  - [Numeric Axis](#numeric-axis)
  - [X-Axis Customization](#x-axis-customization)
- [Y-Axis (Value Axis)](#y-axis-value-axis)
  - [Numeric Y-Axis (Most Common)](#numeric-y-axis-most-common)
  - [Logarithmic Y-Axis](#logarithmic-y-axis)
  - [Y-Axis Customization](#y-axis-customization)
  - [Opposed Y-Axis (Right Side)](#opposed-y-axis-right-side)
- [Axis Types](#axis-types)
- [Multiple Axes](#multiple-axes)
  - [Two Y-Axes Setup](#two-y-axes-setup)
- [Axis Customization](#axis-customization)
  - [Grid Lines and Ticks](#grid-lines-and-ticks)
  - [Axis Labels](#axis-labels)
  - [Axis Titles](#axis-titles)
  - [Range and Padding](#range-and-padding)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Standard Stock Chart (Price + Volume)](#pattern-1-standard-stock-chart-price--volume)
  - [Pattern 2: Multi-Day Chart with Hour Resolution](#pattern-2-multi-day-chart-with-hour-resolution)
  - [Pattern 3: Comparison Chart (Multiple Y-Axes)](#pattern-3-comparison-chart-multiple-y-axes)
  - [Pattern 4: Long-Term Analysis (Logarithmic Scale)](#pattern-4-long-term-analysis-logarithmic-scale)
- [Edge Cases](#edge-cases)
  - [Handling Single Data Point](#handling-single-data-point)
  - [Handling Very Large Values](#handling-very-large-values)
  - [Handling Dates Across Years](#handling-dates-across-years)

## Overview

Stock Chart uses axes to map data to visual coordinates:

- **Primary X-Axis** - Horizontal time/date axis (required)
- **Primary Y-Axis** - Vertical price/value axis (required)
- **Secondary Axes** - Optional additional axes for different scales (e.g., volume)

All financial charts need proper axis configuration to display accurate stock data.

## Primary Axes

Every Stock Chart requires at least a primary X-axis and primary Y-axis:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Days)
             .MajorGridLines(mg => mg.Width(0))
    )
    .PrimaryYAxis(yaxis =>
        yaxis.LabelFormat("${value}")
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## X-Axis (Time Axis)

The X-axis represents time and aligns stock prices chronologically.

### DateTime Axis

Best for continuous time series with irregular intervals:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Days)
             .Interval(1)
             .LabelFormat("MMM dd")
             .EdgeLabelPlacement(Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift)
             .MajorGridLines(mg => mg.Width(0))
             .MinorTicksPerInterval(0)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### DateTimeCategory Axis

For combining category labels with dates:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTimeCategory)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Days)
             .LabelFormat("MMM dd")
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("date")
          .YName("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Category Axis

For non-date X values (sequences, labels):

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
             .LabelPlacement(Syncfusion.EJ2.Charts.LabelPlacement.OnTicks)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("categoryData")
          .XName("label")
          .YName("value")
          .Add();
    })
    .Render())

<script>
    var categoryData = [
        { label: 'Day 1', value: 120 },
        { label: 'Day 2', value: 123 },
        { label: 'Day 3', value: 119 },
        { label: 'Day 4', value: 126 },
        { label: 'Day 5', value: 130 }
    ];
</script>
```

### Numeric Axis

For numeric X values (indices, sequences):

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.Double)
             .LabelFormat("{value}")
             .MajorTickLines(mt => mt.Width(1))
             .MinorTicksPerInterval(4)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("numericData")
          .XName("index")
          .YName("value")
          .Add();
    })
    .Render())

<script>
    var numericData = [
        { index: 1, value: 120 },
        { index: 2, value: 122 },
        { index: 3, value: 118 },
        { index: 4, value: 126 },
        { index: 5, value: 129 }
    ];
</script>
```

### X-Axis Customization

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Days)
             .Interval(1)
             .LabelFormat("MMM dd, yyyy")
             .LabelStyle(ls => ls.FontFamily("Arial").Size("12px").Color("#666"))
             .Title("Date")
             .TitleStyle(ts => ts.FontFamily("Arial").Size("14px").FontWeight("Bold"))
             .MajorGridLines(mg => mg.Width(1).Color("#f0f0f0").DashArray("5,5"))
             .MinorGridLines(mg => mg.Width(0.5).Color("#f5f5f5"))
             .MajorTickLines(mt => mt.Width(2).Color("#333"))
             .MinorTickLines(mt => mt.Width(1).Color("#999"))
             .IsInversed(false)
             .RangePadding(Syncfusion.EJ2.Charts.ChartRangePadding.None)
             .EdgeLabelPlacement(Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Y-Axis (Value Axis)

The Y-axis displays stock prices or other numeric values.

### Numeric Y-Axis (Most Common)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.LabelFormat("${value}")
             .Interval(5)
             .Minimum(0)
             .Maximum(200)
             .RangePadding(Syncfusion.EJ2.Charts.ChartRangePadding.Normal)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Logarithmic Y-Axis

For comparing stocks with vastly different price ranges:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic)
             .LabelFormat("${value}")
             .LogBase(10)
             .MinorGridLines(mg => mg.Width(0))
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("date")
          .YName("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Y-Axis Customization

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.Minimum(50)
             .Maximum(200)
             .Interval(10)
             .LabelFormat("${value}")
             .LabelStyle(ls => ls.FontFamily("Arial").Size("12px").Color("#666"))
             .Title("Price ($)")
             .TitleStyle(ts => ts.FontFamily("Arial").Size("14px").FontWeight("Bold"))
             .MajorGridLines(mg => mg.Width(1).Color("#f0f0f0"))
             .MajorTickLines(mt => mt.Width(1))
             .IsInversed(false)
             .OpposedPosition(false)
             .RangePadding(Syncfusion.EJ2.Charts.ChartRangePadding.Normal)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Opposed Y-Axis (Right Side)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.OpposedPosition(true)
             .LabelFormat("${value}")
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Axis Types

| Type | Use Case | Example |
|------|----------|---------|
| **DateTime** | Time series with dates | Stock prices by date |
| **DateTimeCategory** | Dates with category labels | Trading days with day names |
| **Category** | Text labels | Company names, stock symbols |
| **Numeric** | Prices, volumes, indices | Stock prices in dollars |
| **Logarithmic** | Wide price range comparison | Comparing $10 and $1000 stocks |

## Multiple Axes

Use secondary axes to display different metrics (e.g., price and volume):

### Two Y-Axes Setup

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Days)
    )
    .PrimaryYAxis(yaxis =>
        yaxis.LabelFormat("${value}")
             .Title("Price ($)")
             .Maximum(200)
    )
    .Axes(ax =>
    {
        ax.Name("VolumeAxis")
          .ValueType(Syncfusion.EJ2.Charts.ValueType.Double)
          .LabelFormat("{value}M")
          .Title("Volume (M)")
          .OpposedPosition(true)
          .Maximum(50000000)
          .Add();
    })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("priceData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();

        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
          .DataSource("volumeData")
          .XName("date")
          .YName("volume")
          .YAxisName("VolumeAxis")
          .Fill("rgba(33, 150, 243, 0.2)")
          .Add();
    })
    .Render())

<script>
    var priceData = window.priceData || [];
    var volumeData = window.volumeData || [];
</script>
```

## Axis Customization

### Grid Lines and Ticks

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.MajorGridLines(mg => mg.Width(1).Color("#e0e0e0").DashArray("3,3"))
             .MinorGridLines(mg => mg.Width(0.5).Color("#f5f5f5"))
             .MajorTickLines(mt => mt.Width(2).Color("#333"))
             .MinorTickLines(mt => mt.Width(1).Color("#999"))
             .MinorTicksPerInterval(4)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Axis Labels

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.LabelFormat("MMM dd, yyyy")
             .LabelPlacement(Syncfusion.EJ2.Charts.LabelPlacement.OnTicks)
             .LabelRotation(45)
             .LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Rotate45)
             .LabelStyle(ls => ls.FontFamily("Segoe UI").Size("12px").Color("#666").Opacity(0.8))
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Axis Titles

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.Title("Stock Price (USD)")
             .TitleStyle(ts => ts.FontFamily("Segoe UI").Size("14px").FontWeight("Bold").Color("#333"))
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Range and Padding

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.RangePadding(Syncfusion.EJ2.Charts.ChartRangePadding.Normal)
             .Minimum(90)
             .Maximum(110)
             .Interval(5)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Common Patterns

### Pattern 1: Standard Stock Chart (Price + Volume)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Days)
             .LabelFormat("MMM dd")
             .MajorGridLines(mg => mg.Width(0))
    )
    .PrimaryYAxis(yaxis =>
        yaxis.LabelFormat("${value}")
             .Title("Price")
    )
    .Axes(ax =>
    {
        ax.Name("VolAxis")
          .ValueType(Syncfusion.EJ2.Charts.ValueType.Double)
          .OpposedPosition(true)
          .Title("Volume")
          .Add();
    })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("priceData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();

        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
          .DataSource("volumeData")
          .XName("date")
          .YName("volume")
          .YAxisName("VolAxis")
          .Add();
    })
    .Render())

<script>
    var priceData = window.priceData || [];
    var volumeData = window.volumeData || [];
</script>
```

### Pattern 2: Multi-Day Chart with Hour Resolution

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Hours)
             .Interval(4)
             .LabelFormat("hh:mm")
             .MajorGridLines(mg => mg.Width(0))
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("date")
          .YName("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Pattern 3: Comparison Chart (Multiple Y-Axes)

For comparing 2-3 stocks with different price ranges:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.LabelFormat("${value}")
             .Title("Stock A")
    )
    .Axes(ax =>
    {
        ax.Name("StockBAxis")
          .LabelFormat("${value}")
          .Title("Stock B")
          .OpposedPosition(true)
          .Add();
    })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockAData")
          .XName("date")
          .YName("close")
          .Name("Stock A")
          .Add();

        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockBData")
          .XName("date")
          .YName("close")
          .YAxisName("StockBAxis")
          .Name("Stock B")
          .Add();
    })
    .Render())

<script>
    var stockAData = window.stockAData || [];
    var stockBData = window.stockBData || [];
</script>
```

### Pattern 4: Long-Term Analysis (Logarithmic Scale)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic)
             .LogBase(10)
             .LabelFormat("${value}")
             .Title("Price (Log Scale)")
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("date")
          .YName("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Edge Cases

### Handling Single Data Point

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.Interval(10)
             .RangePadding(Syncfusion.EJ2.Charts.ChartRangePadding.Normal)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("singlePointData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var singlePointData = [
        { date: new Date('2024-01-01'), open: 100, high: 110, low: 95, close: 105 }
    ];
</script>
```

### Handling Very Large Values

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryYAxis(yaxis =>
        yaxis.LabelFormat("${value}")
             .Interval(100000)
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
          .DataSource("largeValueData")
          .XName("date")
          .YName("value")
          .Add();
    })
    .Render())

<script>
    var largeValueData = window.largeValueData || [];
</script>
```

### Handling Dates Across Years

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Months)
             .Interval(3)
             .LabelFormat("MMM yyyy")
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("date")
          .YName("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

Proper axis configuration ensures accurate data visualization and professional presentation of financial information.