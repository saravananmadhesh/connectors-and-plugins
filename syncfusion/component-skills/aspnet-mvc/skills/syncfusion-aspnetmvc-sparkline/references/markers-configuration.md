# Markers and Special Points Configuration

## Table of Contents
- [Overview](#overview)
- [Marker Types](#marker-types)
- [Enabling All Point Markers](#enabling-all-point-markers)
  - [Basic Implementation](#basic-implementation)
  - [What Happens](#what-happens)
  - [Complete Example with Styling](#complete-example-with-styling)
- [Special Point Markers](#special-point-markers)
  - [High and Low Point Markers](#high-and-low-point-markers)
  - [Why Use High/Low Markers](#why-use-highlow-markers)
  - [Start and End Point Markers](#start-and-end-point-markers)
  - [Use Cases for Start/End Markers](#use-cases-for-startend-markers)
  - [Negative Value Markers](#negative-value-markers)
  - [When to Use Negative Markers](#when-to-use-negative-markers)
  - [Multiple Marker Types Combined](#multiple-marker-types-combined)
- [Customizing Marker Appearance](#customizing-marker-appearance)
  - [Marker Properties](#marker-properties)
  - [Complete Customization Example](#complete-customization-example)
- [Common Scenarios](#common-scenarios)
  - [Scenario 1: Sales Performance Tracking](#scenario-1-sales-performance-tracking)
  - [Scenario 2: Stock Price Movement](#scenario-2-stock-price-movement)
  - [Scenario 3: Monthly Budget vs Actual](#scenario-3-monthly-budget-vs-actual)
  - [Scenario 4: Website Performance](#scenario-4-website-performance)
- [Best Practices](#best-practices)

## Overview

Markers are visual indicators placed on sparkline data points to highlight important values or positions. They help users quickly identify trends, anomalies, and key data positions without detailed labels.

Markers are particularly useful for:
- Highlighting trend extremes (high and low points)
- Marking special conditions (negative values, start/end points)
- Drawing attention to critical data points
- Improving accessibility by providing visual anchors

## Marker Types

The sparkline component supports six marker visibility options, each serving different purposes:

| Marker Type | Display Behavior | Use Case |
|-------------|------------------|----------|
| **All** | Marks every data point | Detailed emphasis, dense data patterns |
| **Start** | Marks the first data point | Beginning reference, baseline indicator |
| **End** | Marks the last data point | End reference, final value emphasis |
| **High** | Marks the maximum value point | Peak identification, performance highlight |
| **Low** | Marks the minimum value point | Valley identification, low-point awareness |
| **Negative** | Marks points with negative values | Loss identification, downside emphasis |

## Enabling All Point Markers

### Basic Implementation

Enable markers on all data points to create a detailed, emphasized visualization:

```cshtml
@Html.EJS().Sparkline("sparkAll")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "All" })
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### What Happens

When you enable "All" markers:
- A marker appears on every single data point in your series
- Markers are positioned exactly at data point coordinates
- Useful for seeing data variations in detail
- Can become visually cluttered with large datasets

### Complete Example with Styling

```csharp
// Controller
public class DetailedData
{
    public int Day { get; set; }
    public double Value { get; set; }
}

public static List<DetailedData> GetData()
{
    return new List<DetailedData>
    {
        new DetailedData { Day = 1, Value = 10 },
        new DetailedData { Day = 2, Value = 15 },
        new DetailedData { Day = 3, Value = 8 },
        new DetailedData { Day = 4, Value = 12 },
        new DetailedData { Day = 5, Value = 20 }
    };
}
```

```cshtml
@Html.EJS().Sparkline("detailedChart")
    .XName("Day")
    .YName("Value")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "All" })
        .Fill("red")
        .Size(3)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Special Point Markers

### High and Low Point Markers

Mark only the highest and lowest values to highlight performance extremes:

```cshtml
@Html.EJS().Sparkline("extremeChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "High", "Low" })
        .Fill("purple")
        .Border(br => br.Color("black").Width(1))
        .Size(4)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Why Use High/Low Markers

- **Identifies Performance Ranges**: Quickly see best and worst performance
- **Minimal Clutter**: Only two markers regardless of data size
- **Anomaly Detection**: Spot unusual patterns
- **KPI Visualization**: Highlight metrics boundaries

### Start and End Point Markers

Mark the beginning and ending data points:

```cshtml
@Html.EJS().Sparkline("rangeChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "Start", "End" })
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Use Cases for Start/End Markers

- **Time-Series Data**: Reference points for time period boundaries
- **Before/After Analysis**: Compare starting and ending conditions
- **Trend Direction**: Visual indication of movement from start to end
- **Dashboard Snapshots**: Period-specific beginning and end values

### Negative Value Markers

Mark all data points with negative values:

```cshtml
@Html.EJS().Sparkline("profitChart")
    .XName("Month")
    .YName("ProfitLoss")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "Negative" })
        .Fill("red")
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### When to Use Negative Markers

- **Loss/Profit Analysis**: Highlight loss months or periods
- **Performance Issues**: Mark below-target periods
- **Financial Statements**: Emphasize negative cash flows
- **Temperature Deviations**: Mark freezing points or below-zero readings

### Multiple Marker Types Combined

Display multiple marker types simultaneously for comprehensive visualization:

```cshtml
@Html.EJS().Sparkline("comprehensiveChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "Start", "End", "High", "Low", "Negative" })
        .Fill("blue")
        .Border(br => br.Color("darkblue").Width(1))
        .Size(3)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Customizing Marker Appearance

### Marker Properties

Customize how markers look using these properties:

**Size**: Diameter of the marker in pixels
```csharp
.MarkerSettings(ms => ms.Size(5))  // 5-pixel diameter
```

**Fill Color**: Background color of the marker
```csharp
.MarkerSettings(ms => ms.Fill("#FF5733"))  // Custom hex color
```

**Border**: Outline styling for the marker
```csharp
.MarkerSettings(ms => ms
    .Border(br => br
        .Color("black")
        .Width(2)
        .Opacity(1)
    )
)
```

**Opacity**: Transparency level (0 = transparent, 1 = opaque)
```csharp
.MarkerSettings(ms => ms
    .Opacity(0.8)  // 80% opaque
)
```

### Complete Customization Example

```cshtml
@Html.EJS().Sparkline("customizedChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "High", "Low" })
        .Fill("#4CAF50")           // Green fill
        .Size(6)                   // 6-pixel diameter
        .Border(br => br
            .Color("#2E7D32")      // Dark green border
            .Width(2)
        )
        .Opacity(0.9)              // Nearly opaque
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Common Scenarios

### Scenario 1: Sales Performance Tracking

Show where sales were best and worst:

```csharp
public class SalesData
{
    public string Month { get; set; }
    public decimal Sales { get; set; }
}
```

```cshtml
@Html.EJS().Sparkline("salesChart")
    .XName("Month")
    .YName("Sales")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "High", "Low" })
        .Fill("orange")
        .Size(4)
    )
    .Height("80")
    .Width("60")
    .DataSource(Model)
    .Render()
```

**Result**: Users instantly see best and worst sales months without reading all values.

### Scenario 2: Stock Price Movement

Track price movements with start, end, high, and low points:

```cshtml
@Html.EJS().Sparkline("stockChart")
    .XName("Date")
    .YName("Price")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "Start", "End", "High", "Low" })
        .Fill("steelblue")
        .Size(3)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

**Result**: Clear visualization of price range, start/end positions, and trading range boundaries.

### Scenario 3: Monthly Budget vs Actual

Highlight loss months in red:

```cshtml
@Html.EJS().Sparkline("budgetChart")
    .XName("Month")
    .YName("Variance")  // Positive = over budget, Negative = under budget
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "Negative" })
        .Fill("red")
        .Size(5)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

**Result**: Quickly identify months where spending was under target (negative variance).

### Scenario 4: Website Performance

All markers showing every data point:

```cshtml
@Html.EJS().Sparkline("performanceChart")
    .XName("Hour")
    .YName("ResponseTime")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "All" })
        .Fill("lightblue")
        .Size(2)
        .Opacity(0.7)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

**Result**: Detailed hourly response time pattern with every data point marked.

## Best Practices

1. **Use High/Low for Large Datasets**: Avoids visual clutter while highlighting extremes
2. **Color Code by Meaning**: Use green for good markers, red for problems
3. **Keep Size Reasonable**: Too large markers overlap; too small become invisible
4. **Test on Target Devices**: Marker visibility varies by screen size
5. **Consider Accessibility**: Ensure sufficient contrast between marker color and background
6. **Document Marker Meaning**: Users should understand what each marker type represents
7. **Combine Types Sparingly**: Too many marker types become confusing
