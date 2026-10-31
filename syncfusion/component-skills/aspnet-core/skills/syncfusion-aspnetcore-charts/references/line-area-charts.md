# Line and Area Charts

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Line Chart](#line-chart)
  - [Basic Line Chart](#basic-line-chart)
  - [Multiple Line Series](#multiple-line-series)
  - [Line with Markers](#line-with-markers)
- [Step Line Chart](#step-line-chart)
- [Spline Chart](#spline-chart)
- [Area Chart](#area-chart)
  - [Multiple Area Series](#multiple-area-series)
- [Step Area Chart](#step-area-chart)
- [Spline Area Chart](#spline-area-chart)
- [Stacked Area Charts](#stacked-area-charts)
  - [Standard Stacked Area](#standard-stacked-area)
  - [100% Stacked Area](#100-stacked-area)
- [Range Area Charts](#range-area-charts)
  - [Range Area](#range-area)
  - [Spline Range Area](#spline-range-area)
  - [Range Step Area](#range-step-area)
- [Multicolored Line](#multicolored-line)
- [Customization Options](#customization-options)
  - [Line Width and Style](#line-width-and-style)
  - [Fill and Opacity](#fill-and-opacity)
  - [Border Customization](#border-customization)
  - [Empty Points](#empty-points)
  - [Tooltips](#tooltips)
- [When to Use](#when-to-use)
  - [Line Chart Usage](#line-chart-usage)
  - [Step Line Chart Usage](#step-line-chart-usage)
  - [Spline Chart Usage](#spline-chart-usage)
  - [Area Chart Usage](#area-chart-usage)
  - [Stacked Area Usage](#stacked-area-usage)
  - [Range Area Usage](#range-area-usage)
- [Performance Tips](#performance-tips)

## Overview

Line and Area charts are ideal for visualizing trends, patterns, and continuous data over time or categories. They show the relationship between data points using connecting lines or filled areas.

**Common Use Cases:**
- Time series data (stock prices, temperature, sales over time)
- Trend analysis and forecasting
- Comparison of multiple data series
- Showing cumulative values or distributions

## Line Chart

A line chart connects data points with straight lines, ideal for showing trends over time.

### Basic Line Chart

```cshtml
<ejs-chart id="lineChart" title="Sales Trend Analysis">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
public IActionResult Index()
{
    ViewBag.ChartData = new object[]
    {
        new { Month = "Jan", Sales = 35 },
        new { Month = "Feb", Sales = 28 },
        new { Month = "Mar", Sales = 34 },
        new { Month = "Apr", Sales = 32 },
        new { Month = "May", Sales = 40 },
        new { Month = "Jun", Sales = 32 },
        new { Month = "Jul", Sales = 35 },
        new { Month = "Aug", Sales = 55 }
    };
    return View();
}
```

### Multiple Line Series

Compare multiple data series:

```cshtml
<ejs-chart id="multiLineChart" title="Product Comparison">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Product1" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
        <e-series dataSource="@ViewBag.Product2" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

### Line with Markers

Add markers to highlight data points:

```cshtml
<e-series dataSource="@ViewBag.ChartData" 
          xName="Month" 
          yName="Sales" 
          type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
    <e-series-marker visible="true" 
                     height="10" 
                     width="10"
                     shape="@Syncfusion.EJ2.Charts.ChartShape.Circle">
    </e-series-marker>
</e-series>
```

## Step Line Chart

Step line charts connect data points with vertical and horizontal lines, creating a staircase effect. Useful for data that changes at distinct intervals.

```cshtml
<ejs-chart id="stepLineChart" title="Power Consumption">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Time" 
                  yName="Power" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StepLine"
                  width="2">
            <e-series-marker visible="true" width="10" height="10">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Time = 0, Power = 100 },
    new { Time = 1, Power = 100 },
    new { Time = 2, Power = 150 },
    new { Time = 3, Power = 150 },
    new { Time = 4, Power = 200 },
    new { Time = 5, Power = 200 }
};
```

**Use When:** Data changes at specific intervals (e.g., power states, signal levels, step functions)

## Spline Chart

Spline charts use smooth curves instead of straight lines, providing a visually appealing representation of data trends.

```cshtml
<ejs-chart id="splineChart" title="Temperature Variation">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Temperature (°C)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Temperature" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline"
                  width="3">
            <e-series-marker visible="true" 
                           height="8" 
                           width="8"
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Diamond">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Month = "Jan", Temperature = 12 },
    new { Month = "Feb", Temperature = 14 },
    new { Month = "Mar", Temperature = 18 },
    new { Month = "Apr", Temperature = 22 },
    new { Month = "May", Temperature = 26 },
    new { Month = "Jun", Temperature = 30 }
};
```

**Spline Types:**
- **Natural:** Default smooth curve
- **Cardinal:** Tension-based curve (controlled via `cardinalSplineTension`)
- **Monotonic:** Prevents overshooting between data points

```cshtml
<e-series splineType="Cardinal" cardinalSplineTension="0.5">
```

## Area Chart

Area charts fill the space between the line and the axis, emphasizing the magnitude of change over time.

```cshtml
<ejs-chart id="areaChart" title="Revenue Growth">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Revenue ($)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Year" 
                  yName="Revenue" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area"
                  fill="#69D2E7"
                  opacity="0.6">
            <e-series-border width="2" color="#69D2E7"></e-series-border>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Year = "2018", Revenue = 30 },
    new { Year = "2019", Revenue = 45 },
    new { Year = "2020", Revenue = 38 },
    new { Year = "2021", Revenue = 52 },
    new { Year = "2022", Revenue = 68 },
    new { Year = "2023", Revenue = 75 }
};
```

### Multiple Area Series

```cshtml
<e-series-collection>
    <e-series dataSource="@ViewBag.Revenue" 
              xName="Year" yName="Value" name="Revenue"
              type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area"
              fill="rgba(0, 123, 255, 0.5)">
    </e-series>
    <e-series dataSource="@ViewBag.Profit" 
              xName="Year" yName="Value" name="Profit"
              type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area"
              fill="rgba(40, 167, 69, 0.5)">
    </e-series>
</e-series-collection>
```

## Step Area Chart

Combines step line with filled area, showing abrupt changes with filled regions.

```cshtml
<ejs-chart id="stepAreaChart" title="Electricity Usage">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Hour" 
                  yName="Usage" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StepArea"
                  opacity="0.7">
            <e-series-border width="2"></e-series-border>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Hour = "00:00", Usage = 20 },
    new { Hour = "03:00", Usage = 15 },
    new { Hour = "06:00", Usage = 30 },
    new { Hour = "09:00", Usage = 60 },
    new { Hour = "12:00", Usage = 75 },
    new { Hour = "15:00", Usage = 65 },
    new { Hour = "18:00", Usage = 80 },
    new { Hour = "21:00", Usage = 50 }
};
```

## Spline Area Chart

Spline area combines smooth curves with filled area for elegant trend visualization.

```cshtml
<ejs-chart id="splineAreaChart" title="Product Sales Trend">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.SplineArea"
                  fill="rgba(255, 99, 132, 0.5)"
                  opacity="0.7">
            <e-series-border width="2" color="rgba(255, 99, 132, 1)">
            </e-series-border>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Stacked Area Charts

Stacked area charts show cumulative totals, with each series stacked on top of the previous one.

### Standard Stacked Area

```cshtml
<ejs-chart id="stackedAreaChart" title="Market Share Analysis">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Product1" 
                  xName="Year" yName="Share" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingArea">
        </e-series>
        <e-series dataSource="@ViewBag.Product2" 
                  xName="Year" yName="Share" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingArea">
        </e-series>
        <e-series dataSource="@ViewBag.Product3" 
                  xName="Year" yName="Share" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingArea">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

### 100% Stacked Area

Shows relative percentage contribution of each series:

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingArea100">
```

```csharp
ViewBag.Product1 = new object[]
{
    new { Year = "2019", Share = 30 },
    new { Year = "2020", Share = 35 },
    new { Year = "2021", Share = 40 },
    new { Year = "2022", Share = 45 }
};
ViewBag.Product2 = new object[]
{
    new { Year = "2019", Share = 40 },
    new { Year = "2020", Share = 35 },
    new { Year = "2021", Share = 30 },
    new { Year = "2022", Share = 25 }
};
ViewBag.Product3 = new object[]
{
    new { Year = "2019", Share = 30 },
    new { Year = "2020", Share = 30 },
    new { Year = "2021", Share = 30 },
    new { Year = "2022", Share = 30 }
};
```

## Range Area Charts

Range area charts display data with upper and lower bounds, showing the range of variation.

### Range Area

```cshtml
<ejs-chart id="rangeAreaChart" title="Temperature Range">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Temperature (°C)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  high="HighTemp" 
                  low="LowTemp" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.RangeArea"
                  opacity="0.4">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Month = "Jan", LowTemp = 5, HighTemp = 15 },
    new { Month = "Feb", LowTemp = 7, HighTemp = 18 },
    new { Month = "Mar", LowTemp = 10, HighTemp = 22 },
    new { Month = "Apr", LowTemp = 14, HighTemp = 26 },
    new { Month = "May", LowTemp = 18, HighTemp = 30 }
};
```

### Spline Range Area

Smooth curves for range data:

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.SplineRangeArea"
          dataSource="@ViewBag.ChartData"
          xName="Month"
          high="HighTemp"
          low="LowTemp">
    <e-series-border width="2"></e-series-border>
</e-series>
```

### Range Step Area

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.RangeStepArea"
          dataSource="@ViewBag.ChartData"
          xName="Month"
          high="HighTemp"
          low="LowTemp">
</e-series>
```

## Multicolored Line

Apply different colors to line segments based on data values or conditions.

```cshtml
<ejs-chart id="multicolorLine" title="Stock Price">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Date" 
                  yName="Price" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.MultiColoredLine"
                  width="2">
            <e-series-segments>
                <e-series-segment value="50" color="red"></e-series-segment>
                <e-series-segment value="75" color="orange"></e-series-segment>
                <e-series-segment color="green"></e-series-segment>
            </e-series-segments>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

Each segment is colored based on Y-axis value thresholds.

## Customization Options

### Line Width and Style

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
          width="3"
          dashArray="5,5">
</e-series>
```

**dashArray patterns:**
- `"5,5"` - Dashed line
- `"10,5"` - Long dashes
- `"2,2"` - Dotted line
- `"10,5,5,5"` - Dash-dot pattern

### Fill and Opacity

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area"
          fill="#FF6384"
          opacity="0.6">
</e-series>
```

### Border Customization

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
    <e-series-border width="3" color="#36A2EB"></e-series-border>
</e-series>
```

### Empty Points

Handle missing or null data points:

```cshtml
<e-series dataSource="@ViewBag.ChartData" xName="X" yName="Y">
    <e-series-emptypoint mode="Average" fill="gray">
    </e-series-emptypoint>
</e-series>
```

**Empty point modes:**
- `Gap` - Leave gap in the line
- `Zero` - Treat as zero
- `Average` - Use average of adjacent points
- `Drop` - Drop the point entirely

### Tooltips

```cshtml
<ejs-chart id="chart">
    <e-chart-tooltipsettings enable="true" 
                             format="${point.x} : ${point.y}">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <!-- series -->
    </e-series-collection>
</ejs-chart>
```

## When to Use

### Line Chart Usage
- **Use for:** Time series data, trends over intervals, continuous data
- **Best when:** Showing change over time, comparing multiple trends
- **Examples:** Stock prices, temperature changes, website traffic

### Step Line Chart Usage
- **Use for:** Data that changes at discrete intervals
- **Best when:** Values remain constant between changes
- **Examples:** Signal levels, state changes, step functions

### Spline Chart Usage
- **Use for:** Smooth trend visualization
- **Best when:** Emphasizing overall pattern over exact values
- **Examples:** Growth trends, projections, natural phenomena

### Area Chart Usage
- **Use for:** Cumulative data, volume over time
- **Best when:** Emphasizing magnitude of change
- **Examples:** Revenue accumulation, resource usage, population growth

### Stacked Area Usage
- **Use for:** Part-to-whole relationships over time
- **Best when:** Showing composition changes and total trend
- **Examples:** Market share, resource allocation, budget breakdown

### Range Area Usage
- **Use for:** Data with upper and lower bounds
- **Best when:** Showing variation or uncertainty ranges
- **Examples:** Temperature ranges, price fluctuations, confidence intervals

## Performance Tips

1. **Large Datasets:** Use data sampling or aggregation
2. **Multiple Series:** Limit to 5-7 series for readability
3. **Animations:** Disable for better performance with large data
4. **Markers:** Use sparingly on dense data
5. **Update Frequency:** Throttle real-time updates to avoid performance degradation
