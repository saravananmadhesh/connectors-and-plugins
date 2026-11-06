# Configuring Chart Axes

## Table of Contents
- [Axis Overview](#axis-overview)
- [Category Axis](#category-axis)
- [Numeric Axis](#numeric-axis)
- [DateTime Axis](#datetime-axis)
- [Logarithmic Axis](#logarithmic-axis)
- [Axis Customization](#axis-customization)
- [Multiple Axes](#multiple-axes)

## Axis Overview

Axes define how data is plotted on the chart. The 3D Chart uses two primary axes:

- **Primary X-Axis (PrimaryXAxis)** - Horizontal axis for categories or time
- **Primary Y-Axis (PrimaryYAxis)** - Vertical axis for values or measurements

Each axis type handles data differently and provides specific configuration options.

## Category Axis

Use the Category axis to display distinct categorical labels (like months, regions, products).

### Basic Category Axis

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .PrimaryXAxis(axis =>
    {
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
    })
    .Render()
```

### Category Axis Properties

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
    axis.Title("Months");
    axis.LabelPlacement(Syncfusion.EJ2.Charts.LabelPlacement.BetweenTicks);
    axis.MajorGridLines(grid => grid.Width(0));  // Hide grid lines
    axis.LabelRotationAngle(45);                  // Rotate labels
})
```

### Common Category Axis Configurations

**Example 1: Monthly Data**

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
    axis.Title("Month");
    axis.IntervalPadding(0.1);
})
```

**Example 2: Product Names**

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
    axis.Title("Products");
    axis.LabelRotationAngle(90);
    axis.EdgeLabelPlacement(Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift);
})
```

## Numeric Axis

Use Numeric axis for continuous numerical data on both X and Y axes.

### Basic Numeric Axis

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Double);
    axis.Title("Hours Studied");
})
.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Double);
    axis.Title("Test Score");
})
```

### Numeric Axis Properties

```csharp
.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Double);
    axis.Title("Revenue ($)");
    axis.LabelFormat("${value}K");
    axis.Minimum(0);
    axis.Maximum(100000);
    axis.Interval(10000);
    axis.RangePadding(Syncfusion.EJ2.Charts.ChartRangePadding.Additional);
})
```

### Numeric Axis Configuration Examples

**Example 1: Currency Format**

```csharp
.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Double);
    axis.Title("Sales Revenue");
    axis.LabelFormat("${value}");
    axis.Minimum(0);
    axis.Maximum(50000);
    axis.Interval(5000);
})
```

**Example 2: Percentage Format**

```csharp
.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Double);
    axis.Title("Growth Rate");
    axis.LabelFormat("{value}%");
    axis.Minimum(0);
    axis.Maximum(100);
    axis.Interval(10);
})
```

## DateTime Axis

Use DateTime axis for time-series data, perfect for tracking trends over time.

### Basic DateTime Axis

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime);
    axis.Title("Date");
    axis.LabelFormat("MMM dd");
    axis.IntervalType(Syncfusion.EJ2.Charts.ChartIntervalType.Days);
    axis.Interval(1);
})
```

### DateTime Axis Properties

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime);
    axis.Title("Timeline");
    axis.LabelFormat("yyyy-MM-dd");
    axis.IntervalType(Syncfusion.EJ2.Charts.ChartIntervalType.Months);
    axis.Interval(1);
    axis.MinorTicksPerInterval(4);
})
```

### DateTime Axis Configuration Examples

**Example 1: Daily Stock Price**

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime);
    axis.Title("Date");
    axis.LabelFormat("MMM dd");
    axis.IntervalType(Syncfusion.EJ2.Charts.ChartIntervalType.Days);
    axis.Interval(1);
})
```

**Example 2: Monthly Trend**

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime);
    axis.Title("Month");
    axis.LabelFormat("MMM yyyy");
    axis.IntervalType(Syncfusion.EJ2.Charts.ChartIntervalType.Months);
    axis.Interval(1);
})
```

**Example 3: Yearly Analysis**

```csharp
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime);
    axis.Title("Year");
    axis.LabelFormat("yyyy");
    axis.IntervalType(Syncfusion.EJ2.Charts.ChartIntervalType.Years);
    axis.Interval(1);
})
```

### DateTime Data Format

Your model must store dates as `DateTime` objects:

```csharp
public class TimeSeriesData
{
    public DateTime Date { get; set; }
    public double Value { get; set; }
}

// Controller
var data = new List<TimeSeriesData>
{
    new TimeSeriesData { Date = new DateTime(2024, 1, 1), Value = 100 },
    new TimeSeriesData { Date = new DateTime(2024, 1, 2), Value = 105 },
    new TimeSeriesData { Date = new DateTime(2024, 1, 3), Value = 110 }
};
return View(data);
```

## Logarithmic Axis

Use Logarithmic axis for data that spans multiple orders of magnitude.

### Basic Logarithmic Axis

```csharp
.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic);
    axis.Title("Values (Log Scale)");
    axis.LogBase(10);
})
```

### Logarithmic Axis Properties

```csharp
.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic);
    axis.Title("Population (Log Scale)");
    axis.LogBase(10);
    axis.Interval(1);
    axis.LabelFormat("10<sup>{value}</sup>");
})
```

### Logarithmic Axis Use Cases

**Example 1: Exponential Growth Data**

```csharp
// Data ranges from 10 to 1,000,000
var data = new List<GrowthData>
{
    new GrowthData { Year = 2000, Users = 10 },
    new GrowthData { Year = 2005, Users = 100 },
    new GrowthData { Year = 2010, Users = 1000 },
    new GrowthData { Year = 2015, Users = 100000 },
    new GrowthData { Year = 2020, Users = 1000000 }
};

.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic);
    axis.Title("Users (Log Scale)");
})
```

**Example 2: Scientific Data**

```csharp
.PrimaryYAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic);
    axis.Title("Concentration (Log)");
    axis.LogBase(10);
    axis.LabelFormat("10<sup>{value}</sup>");
})
```

## Axis Customization

### Label Formatting

Format axis labels for readability:

```csharp
.PrimaryYAxis(axis =>
{
    axis.LabelFormat("${value}K");        // Currency
    axis.LabelFormat("{value}%");         // Percentage
    axis.LabelFormat("#,##0.00");         // Number with decimals
})
```

### Grid Lines and Ticks

Control grid lines and tick marks:

```csharp
.PrimaryXAxis(axis =>
{
    axis.MajorGridLines(grid => 
        grid.Width(1).Color("#e0e0e0")
    );
    axis.MinorGridLines(grid => 
        grid.Width(0.5).Color("#f0f0f0")
    );
    axis.MajorTickLines(tick => 
        tick.Width(1).Color("#333333")
    );
})
```

### Axis Labels Rotation

Rotate labels for better readability:

```csharp
.PrimaryXAxis(axis =>
{
    axis.LabelRotationAngle(45);
    axis.LabelIntersectAction(Syncfusion.EJ2.Charts.LabelIntersectAction.Rotate90);
})
```

### Title and Range

```csharp
.PrimaryXAxis(axis =>
{
    axis.Title("Categories");
    axis.TitleStyle(style => 
        style.FontFamily("Arial").FontSize(14)
    );
})
.PrimaryYAxis(axis =>
{
    axis.Title("Values");
    axis.Minimum(0);
    axis.Maximum(100);
    axis.Interval(10);
})
```

## Multiple Axes

Create additional axes for comparing data with different scales:

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        // Series on primary Y-axis
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Revenue")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
        
        // Series on secondary Y-axis
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Profit")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
            .YAxisName("SecondaryYAxis")
            .Add();
    })
    .PrimaryXAxis(axis =>
    {
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
    })
    .PrimaryYAxis(axis =>
    {
        axis.Title("Revenue ($)");
        axis.LabelFormat("${value}K");
    })
    .Axes(axis =>
    {
        axis.Name("SecondaryYAxis")
            .OpposedPosition(true)
            .Title("Profit (%)")
            .LabelFormat("{value}%")
            .Add();
    })
    .Render()
```

## Axis Selection Guide

| Axis Type | Best For | Example |
|-----------|----------|---------|
| **Category** | Discrete labels | Months, Regions, Product Names |
| **Numeric** | Continuous values | Quantities, Prices, Percentages |
| **DateTime** | Time-based data | Dates, Times, Trends Over Time |
| **Logarithmic** | Exponential ranges | Population Growth, Scientific Data |

Choose the appropriate axis type based on your data characteristics to ensure accurate visualization and readability.
