# Chart Types and Series

## Table of Contents
- [Overview](#overview)
- [Line Charts](#line-charts)
  - [Line](#line)
  - [Spline](#spline)
  - [Step Line](#step-line)
  - [Stacked Line / Stacked Line 100%](#stacked-line--stacked-line-100)
- [Bar and Column Charts](#bar-and-column-charts)
  - [Column](#column)
  - [Bar](#bar)
  - [Stacked Column / Stacked Column 100%](#stacked-column--stacked-column-100)
  - [Stacked Bar / Stacked Bar 100%](#stacked-bar--stacked-bar-100)
- [Area Charts](#area-charts)
  - [Area](#area)
  - [Spline Area](#spline-area)
  - [Step Area](#step-area)
  - [Range Area](#range-area)
  - [Stacked Area / Stacked Area 100%](#stacked-area--stacked-area-100)
- [Financial Charts](#financial-charts)
  - [Candlestick](#candlestick)
  - [OHLC (HiLoOpenClose)](#ohlc-hiloopenclose)
  - [HiLo](#hilo)
- [Statistical Charts](#statistical-charts)
  - [Box and Whisker](#box-and-whisker)
  - [Histogram](#histogram)
  - [Pareto](#pareto)
- [Specialized Charts](#specialized-charts)
  - [Scatter](#scatter)
  - [Bubble](#bubble)
  - [Waterfall](#waterfall)
  - [Polar](#polar)
  - [Radar](#radar)
- [Multiple Series](#multiple-series)
- [Combination Series](#combination-series)
- [Series Customization](#series-customization)
  - [Fill Color](#fill-color)
  - [Border](#border)
  - [Width (for line charts)](#width-for-line-charts)
  - [Point Colors](#point-colors)
  - [Empty Points](#empty-points)
- [When to Use Each Chart Type](#when-to-use-each-chart-type)
- [Examples Repository](#examples-repository)

## Overview

Syncfusion Chart supports 25+ chart types for various data visualization needs. Each chart type has specific use cases and visual characteristics optimized for different data patterns.

**All chart types are specified using:**
```cshtml
.Series(series =>
{
    series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.[TypeName])
          .DataSource(data)
          .XName("x")
          .YName("y")
          .Add();
})
```

## Line Charts

Line charts connect data points with straight or curved lines, ideal for showing trends over time.

### Line

Standard line chart connecting points with straight lines.

```cshtml
@Html.EJS().Chart("lineChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .Marker(marker => marker.Visible(true).Height(10).Width(10))
              .DataSource(ViewBag.ChartData)
              .XName("Month")
              .YName("Sales")
              .Width(2)
              .Add();
    }).Render()
```

**Use when:** Showing trends, continuous data, time series.

### Spline

Smooth curved line through data points.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Spline)
      .DataSource(ViewBag.Data)
      .XName("Month")
      .YName("Temperature")
      .Add();
```

**Use when:** Smooth trends, aesthetic curves, continuous measurements.

### Step Line

Line chart with steps between points (right angle transitions).

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StepLine)
      .DataSource(ViewBag.Data)
      .XName("Period")
      .YName("Rate")
      .Add();
```

**Use when:** Discrete values with sudden changes, state transitions.

### Stacked Line / Stacked Line 100%

Multiple lines stacked vertically.

```cshtml
@Html.EJS().Chart("stackedLine").Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingLine)
              .DataSource(productA).XName("x").YName("y").Name("Product A").Add();
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingLine)
              .DataSource(productB).XName("x").YName("y").Name("Product B").Add();
    }).Render()

// For 100% stacked
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingLine100)
```

**Use when:** Comparing contribution of multiple series to total, showing proportions.

## Bar and Column Charts

Bar and column charts use rectangular bars to represent categorical data.

### Column

Vertical bars from X-axis.

```cshtml
@Html.EJS().Chart("columnChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.Data)
              .XName("Country")
              .YName("Gold")
              .ColumnSpacing(0.1)
              .CornerRadius(cr => cr.BottomLeft(10).BottomRight(10).TopLeft(10).TopRight(10))
              .Add();
    }).Render()
```

**Use when:** Comparing categories, showing discrete values, vertical comparison.

### Bar

Horizontal bars from Y-axis.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Bar)
      .DataSource(ViewBag.Data)
      .XName("Department")
      .YName("Employees")
      .Add();
```

**Use when:** Long category names, comparing many categories, horizontal layout preferred.

**Note:** Bar series cannot be combined with other series types (different axis orientation).

### Stacked Column / Stacked Column 100%

Multiple columns stacked vertically.

```cshtml
@Html.EJS().Chart("stackedColumn")
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category))
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
              .DataSource(salesQ1).XName("x").YName("y").Name("Q1").Add();
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
              .DataSource(salesQ2).XName("x").YName("y").Name("Q2").Add();
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
              .DataSource(salesQ3).XName("x").YName("y").Name("Q3").Add();
    }).Render()

// For 100% stacked (shows percentage contribution)
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn100)
```

**Use when:** Part-to-whole relationships, showing composition over categories.

### Stacked Bar / Stacked Bar 100%

Multiple bars stacked horizontally.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar)
// or
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar100)
```

**Use when:** Horizontal stacked comparison, long category labels.

## Area Charts

Area charts show volume/quantity by filling the region between line and axis.

### Area

Filled area under line chart.

```cshtml
@Html.EJS().Chart("areaChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .Border(border => border.Width(2).Color("#007bff"))
              .DataSource(ViewBag.Data)
              .XName("Date")
              .YName("Value")
              .Fill("rgba(0, 123, 255, 0.5)")
              .Add();
    }).Render()
```

**Use when:** Emphasizing magnitude of change, showing volume trends.

### Spline Area

Smooth curved area chart.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.SplineArea)
      .DataSource(ViewBag.Data)
      .XName("x")
      .YName("y")
      .Add();
```

**Use when:** Smooth area visualization, aesthetic filled curves.

### Step Area

Area chart with steps (right angles).

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StepArea)
      .DataSource(ViewBag.Data)
      .XName("x")
      .YName("y")
      .Add();
```

**Use when:** Discrete value changes with area emphasis.

### Range Area

Area between high and low values.

```cshtml
@Html.EJS().Chart("rangeArea").Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.RangeArea)
              .DataSource(ViewBag.TempData)
              .XName("Month")
              .High("HighTemp")
              .Low("LowTemp")
              .Opacity(0.4)
              .Add();
    }).Render()
```

**Use when:** Showing range of values (min/max temperatures, price ranges).

### Stacked Area / Stacked Area 100%

Multiple areas stacked.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingArea)
// or
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingArea100)
```

**Use when:** Cumulative trends, part-to-whole over time.

## Financial Charts

Specialized charts for stock market and financial data analysis.

### Candlestick

Shows open, high, low, close (OHLC) with filled/hollow candlesticks.

```cshtml
@Html.EJS().Chart("candleChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(ViewBag.StockData)
              .XName("Date")
              .High("High")
              .Low("Low")
              .Open("Open")
              .Close("Close")
              .BearFillColor("#FF0000")
              .BullFillColor("#00FF00")
              .Add();
    }).Render()
```

**Use when:** Stock price movements, financial analysis, OHLC data.

### OHLC (HiLoOpenClose)

Shows OHLC with tick marks instead of candles.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.HiloOpenClose)
      .XName("Date")
      .High("High")
      .Low("Low")
      .Open("Open")
      .Close("Close")
      .Add();
```

**Use when:** Simplified financial data, prefer tick marks over candles.

### HiLo

Shows only high and low values (no open/close).

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Hilo)
      .XName("Date")
      .High("High")
      .Low("Low")
      .Add();
```

**Use when:** Price range without open/close, simplified price movement.

## Statistical Charts

Charts for statistical analysis and data distribution.

### Box and Whisker

Shows distribution with median, quartiles, and outliers.

```cshtml
@Html.EJS().Chart("boxPlot").Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.BoxAndWhisker)
              .DataSource(ViewBag.StatData)
              .XName("Category")
              .YName("Values")
              .BoxPlotMode(Syncfusion.EJ2.Charts.BoxPlotMode.Normal)
              .ShowMean(true)
              .Add();
    }).Render()
```

**Use when:** Statistical distribution, identifying outliers, quartile analysis.

### Histogram

Shows frequency distribution of data.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Histogram)
      .DataSource(ViewBag.RawData)
      .YName("Value")
      .BinInterval(20)
      .Add();
```

**Use when:** Frequency distribution, data distribution patterns.

### Pareto

Combination of bar and line showing cumulative percentage.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Pareto)
      .DataSource(ViewBag.DefectData)
      .XName("Defect")
      .YName("Count")
      .Add();
```

**Use when:** Identifying most significant factors (80/20 rule).

## Specialized Charts

### Scatter

Individual data points without connecting lines.

```cshtml
@Html.EJS().Chart("scatterChart").Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Scatter)
              .Marker(marker => marker.Height(10).Width(10).Shape(Syncfusion.EJ2.Charts.ChartShape.Circle))
              .DataSource(ViewBag.Data)
              .XName("Height")
              .YName("Weight")
              .Add();
    }).Render()
```

**Use when:** Correlation analysis, plotting individual measurements, XY relationships.

### Bubble

Scatter plot with third dimension (bubble size).

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Bubble)
      .DataSource(ViewBag.Data)
      .XName("Literacy")
      .YName("GDP")
      .Size("Population")
      .Add();
```

**Use when:** Three-dimensional data, showing size along with X and Y.

### Waterfall

Shows cumulative effect of sequential positive/negative values.

```cshtml
@Html.EJS().Chart("waterfallChart").Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Waterfall)
              .DataSource(ViewBag.FinancialData)
              .XName("Category")
              .YName("Amount")
              .IntermediateSumIndexes(new int[] { 4 })
              .SumIndexes(new int[] { 8 })
              .Add();
    }).Render()
```

**Use when:** Financial analysis, profit/loss breakdown, cumulative changes.

### Polar

Data plotted on circular coordinates.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Polar)
      .DataSource(ViewBag.Data)
      .XName("Direction")
      .YName("Value")
      .DrawType(Syncfusion.EJ2.Charts.ChartDrawType.Line)
      .Add();
```

**Use when:** Cyclic data, directional data, 360° visualization.

### Radar

Similar to polar but with straight lines between points.

```cshtml
series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Radar)
      .DataSource(ViewBag.Data)
      .XName("Metric")
      .YName("Score")
      .DrawType(Syncfusion.EJ2.Charts.ChartDrawType.Area)
      .Add();
```

**Use when:** Multi-dimensional comparison, skill assessment, performance metrics.

## Multiple Series

Add multiple series to compare different datasets on the same chart.

```cshtml
@Html.EJS().Chart("multiSeries").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        // First series
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.Sales2022)
              .XName("Month")
              .YName("Sales")
              .Name("2022 Sales")
              .Fill("#1E88E5")
              .Add();
        
        // Second series
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.Sales2023)
              .XName("Month")
              .YName("Sales")
              .Name("2023 Sales")
              .Fill("#43A047")
              .Add();
    }).LegendSettings(legend => legend.Visible(true)).Render()
```

**Best practices:**
- Use consistent X-axis values across series
- Give each series a unique Name for legend
- Use distinct colors for clarity
- Limit to 3-5 series for readability

## Combination Series

Mix different chart types in a single chart.

```cshtml
@Html.EJS().Chart("comboChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        // Column for actual sales
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.ActualData)
              .XName("Month")
              .YName("Actual")
              .Name("Actual Sales")
              .Add();
        
        // Line for target
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(ViewBag.TargetData)
              .XName("Month")
              .YName("Target")
              .Name("Target")
              .Width(3)
              .Marker(marker => marker.Visible(true))
              .Add();
    }).Render()
```

**Common combinations:**
- Column + Line (Actual vs Target)
- Area + Line (Volume with trend)
- Column + Spline (Comparison with smooth trend)

**Limitations:**
- Bar series cannot be combined with other types
- Polar/Radar require all series to be same type
- Some combinations may reduce clarity

## Series Customization

### Fill Color

```cshtml
series.Fill("#FF5733")
      .Opacity(0.8)
```

### Border

```cshtml
series.Border(border => border.Width(2).Color("#000000"))
```

### Width (for line charts)

```cshtml
series.Width(3)  // Line thickness
```

### Point Colors

```cshtml
series.PointColorMapping("Color")  // Use property from data
```

### Empty Points

Handle missing data:

```cshtml
series.EmptyPointSettings(empty => empty.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Gap))
// Modes: Gap, Zero, Average, Drop
```

## When to Use Each Chart Type

| Chart Type | Best For | Avoid When |
|------------|----------|------------|
| **Line** | Trends over time, continuous data | Categorical comparison |
| **Column** | Comparing categories, discrete values | Too many categories |
| **Bar** | Long labels, many categories | Few categories (use column) |
| **Area** | Volume emphasis, magnitude of change | Multiple overlapping series |
| **Pie/Donut** | Part-to-whole (use accumulation charts) | More than 7 segments |
| **Scatter** | Correlation, XY relationships | Ordered sequences |
| **Candlestick** | Financial OHLC data | Non-financial data |
| **Box & Whisker** | Statistical distribution | Small datasets |
| **Waterfall** | Cumulative changes, P&L | Simple totals |

## Examples Repository

See all chart types in action:
https://ej2.syncfusion.com/aspnetmvc/Chart/
