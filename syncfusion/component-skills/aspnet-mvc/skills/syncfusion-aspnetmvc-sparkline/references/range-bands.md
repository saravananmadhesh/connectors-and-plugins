# Range Bands Configuration

Range bands highlight specific value ranges on the Y-axis, helping visualize performance zones, thresholds, or target ranges within sparklines.

## Table of Contents
- [Overview](#overview)
  - [Common Applications](#common-applications)
- [Single Range Band](#single-range-band)
  - [Basic Implementation](#basic-implementation)
  - [What It Does](#what-it-does)
  - [Complete Example with Data](#complete-example-with-data)
- [Multiple Range Bands](#multiple-range-bands)
  - [Implementation](#implementation)
  - [Creating Performance Zones](#creating-performance-zones)
- [Range Band Customization](#range-band-customization)
  - [Color Selection](#color-selection)
  - [Opacity Settings](#opacity-settings)
  - [Tips for Range Band Colors](#tips-for-range-band-colors)
- [Common Scenarios](#common-scenarios)
  - [Scenario 1: Budget Monitoring](#scenario-1-budget-monitoring)
  - [Scenario 2: Response Time SLAs](#scenario-2-response-time-slas)
  - [Scenario 3: Inventory Levels](#scenario-3-inventory-levels)
  - [Scenario 4: Temperature Control](#scenario-4-temperature-control)
- [Advanced Patterns](#advanced-patterns)
  - [Dynamic Range Calculation](#dynamic-range-calculation)
  - [Conditional Range Bands](#conditional-range-bands)
- [Best Practices](#best-practices)

## Overview

A range band is a semi-transparent overlay that spans from a start value to an end value on the Y-axis. It provides visual context for data by highlighting acceptable ranges, warning zones, or critical thresholds.

### Common Applications

- **Performance Zones**: Green (good), yellow (warning), red (critical)
- **SLA Targets**: Highlight acceptable response time ranges
- **Budget Ranges**: Show acceptable spending boundaries
- **Health Metrics**: Display normal vs abnormal value ranges
- **Quality Control**: Mark acceptable manufacturing parameter ranges

## Single Range Band

### Basic Implementation

Add a single range band to highlight a specific data range:

```cshtml
@Html.EJS().Sparkline("singleRangeChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .RangeBandSettings(rbs => rbs
        .StartRange(30)              // Start at Y-value 30
        .EndRange(60)                // End at Y-value 60
        .Color("rgba(0, 255, 0, 0.3)")  // Semi-transparent green
        .Opacity(0.3)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### What It Does

The range band creates a colored overlay between the specified Y-values:
- **StartRange**: The lower boundary of the highlight zone
- **EndRange**: The upper boundary of the highlight zone
- **Color**: Background color of the overlay
- **Opacity**: Transparency level (0 = transparent, 1 = solid)

### Complete Example with Data

```csharp
// Controller
public class PerformanceData
{
    public int Hour { get; set; }
    public double ResponseTime { get; set; }  // in milliseconds
}

public static List<PerformanceData> GetPerformanceData()
{
    return new List<PerformanceData>
    {
        new PerformanceData { Hour = 1, ResponseTime = 45 },
        new PerformanceData { Hour = 2, ResponseTime = 52 },
        new PerformanceData { Hour = 3, ResponseTime = 38 },
        new PerformanceData { Hour = 4, ResponseTime = 70 },  // Exceeds SLA
        new PerformanceData { Hour = 5, ResponseTime = 48 },
        new PerformanceData { Hour = 6, ResponseTime = 55 }
    };
}
```

```cshtml
<!-- Highlight acceptable SLA range (40-60ms) -->
@Html.EJS().Sparkline("slaChart")
    .XName("Hour")
    .YName("ResponseTime")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .RangeBandSettings(rbs => rbs
        .StartRange(40)                        // SLA minimum
        .EndRange(60)                          // SLA maximum
        .Color("rgba(76, 175, 80, 0.2)")      // Light green, 20% opacity
        .Opacity(0.2)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Multiple Range Bands

### Implementation

Add multiple range bands to create layered performance zones:

```cshtml
@Html.EJS().Sparkline("multiRangeChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .RangeBandSettings(new List<Syncfusion.EJ2.Charts.SparklineRangeBandSetting>
    {
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting
        {
            StartRange = 0,
            EndRange = 30,
            Color = "rgba(255, 0, 0, 0.2)",
            Opacity = 0.2
        },
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting
        {
            StartRange = 30,
            EndRange = 70,
            Color = "rgba(255, 255, 0, 0.2)",
            Opacity = 0.2
        },
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting
        {
            StartRange = 70,
            EndRange = 100,
            Color = "rgba(0, 255, 0, 0.2)",
            Opacity = 0.2
        }
    })
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Creating Performance Zones

Use multiple range bands to create a tiered performance visualization:

```csharp
// Controller - CPU Usage Monitoring
public class CPUData
{
    public string Time { get; set; }
    public double Usage { get; set; }  // Percentage
}
```

```cshtml
<!-- Multiple zones for CPU monitoring -->
@Html.EJS().Sparkline("cpuMonitor")
    .XName("Time")
    .YName("Usage")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .RangeBandSettings(new List<Syncfusion.EJ2.Charts.SparklineRangeBandSetting>
    {
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting
        {
            StartRange = 0,
            EndRange = 50,
            Color = "rgba(76, 175, 80, 0.15)",    // Green: Healthy
            Opacity = 0.15
        },
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting
        {
            StartRange = 50,
            EndRange = 80,
            Color = "rgba(255, 193, 7, 0.15)",    // Yellow: Caution
            Opacity = 0.15
        },
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting
        {
            StartRange = 80,
            EndRange = 100,
            Color = "rgba(244, 67, 54, 0.15)",    // Red: Critical
            Opacity = 0.15
        }
    })
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Range Band Customization

### Color Selection

Use standardized colors for consistent UX:

| Zone | Color Hex | RGBA with Opacity | Meaning |
|------|-----------|-------------------|---------|
| Good/Safe | #4CAF50 | rgba(76, 175, 80, 0.2) | Operating normally |
| Warning | #FFC107 | rgba(255, 193, 7, 0.2) | Attention needed |
| Critical | #F44336 | rgba(244, 67, 54, 0.2) | Action required |

### Opacity Settings

Opacity controls visibility of data behind the band:

```cshtml
<!-- High opacity - clearly visible -->
@Html.EJS().Sparkline("opaqueChart")
    .RangeBandSettings(rbs => rbs
        .StartRange(30)
        .EndRange(60)
        .Color("rgba(0, 255, 0, 1)")   // 100% opacity - solid
        .Opacity(0.8)
    )
    .Render()

<!-- Low opacity - data remains visible -->
@Html.EJS().Sparkline("transparentChart")
    .RangeBandSettings(rbs => rbs
        .StartRange(30)
        .EndRange(60)
        .Color("rgba(0, 255, 0, 0.1)") // 10% opacity - very transparent
        .Opacity(0.1)
    )
    .Render()
```

### Tips for Range Band Colors

1. **Keep Opacity Low**: Use 0.15-0.3 so data remains visible
2. **Use Semantic Colors**: Green for good, red for bad, yellow for warning
3. **Test Contrast**: Ensure bands don't obscure important data points
4. **Consider Colorblindness**: Combine colors with patterns or text labels
5. **Match Theme**: Use colors consistent with your application theme

## Common Scenarios

### Scenario 1: Budget Monitoring

Highlight acceptable spending range:

```csharp
public class SpendingData
{
    public string Month { get; set; }
    public decimal Amount { get; set; }
}
```

```cshtml
<!-- Budget range: $40,000 to $60,000 -->
@Html.EJS().Sparkline("budgetChart")
    .XName("Month")
    .YName("Amount")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .RangeBandSettings(rbs => rbs
        .StartRange(40000)
        .EndRange(60000)
        .Color("rgba(76, 175, 80, 0.25)")  // Green for acceptable range
        .Opacity(0.25)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

**Result**: Green overlay shows where spending should be. Exceeding the upper band or falling below the lower band is immediately visible.

### Scenario 2: Response Time SLAs

Monitor API response times against SLA:

```cshtml
<!-- SLA: 100-300ms is acceptable -->
@Html.EJS().Sparkline("slaChart")
    .XName("Timestamp")
    .YName("ResponseMs")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .RangeBandSettings(rbs => rbs
        .StartRange(100)
        .EndRange(300)
        .Color("rgba(76, 175, 80, 0.2)")   // Green = SLA met
        .Opacity(0.2)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Scenario 3: Inventory Levels

Show ideal stock range:

```cshtml
<!-- Ideal stock: 500-1000 units -->
@Html.EJS().Sparkline("inventoryChart")
    .XName("Date")
    .YName("StockLevel")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .RangeBandSettings(rbs => rbs
        .StartRange(500)
        .EndRange(1000)
        .Color("rgba(0, 128, 255, 0.15)")  // Blue for ideal range
        .Opacity(0.15)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Scenario 4: Temperature Control

Multiple bands for temperature zones:

```cshtml
<!-- Temperature control with warning zones -->
@Html.EJS().Sparkline("tempChart")
    .XName("Hour")
    .YName("Temperature")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .RangeBandSettings(new List<Syncfusion.EJ2.Charts.SparklineRangeBandSetting>
    {
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting 
        {
            StartRange = -10,
            EndRange = 0,
            Color = "rgba(100, 149, 237, 0.2)",    // Blue: Too cold
            Opacity = 0.2
        },
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting 
        {
            StartRange = 0,
            EndRange = 25,
            Color = "rgba(76, 175, 80, 0.2)",     // Green: Ideal
            Opacity = 0.2
        },
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting 
        {
            StartRange = 25,
            EndRange = 40,
            Color = "rgba(255, 193, 7, 0.2)",     // Yellow: Hot
            Opacity = 0.2
        },
        new Syncfusion.EJ2.Charts.SparklineRangeBandSetting 
        {
            StartRange = 40,
            EndRange = 60,
            Color = "rgba(244, 67, 54, 0.2)",     // Red: Too hot
            Opacity = 0.2
        }
    })
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Advanced Patterns

### Dynamic Range Calculation

Calculate ranges based on data:

```csharp
// Calculate range band based on average
var average = dataList.Average(x => x.Value);
var standardDeviation = CalculateStdDev(dataList);

var startRange = average - standardDeviation;
var endRange = average + standardDeviation;
```

### Conditional Range Bands

Show different bands based on conditions:

```csharp
// Show different ranges for different data sources
if (dataSource == "Production")
{
    startRange = 100;
    endRange = 200;
}
else if (dataSource == "Testing")
{
    startRange = 150;
    endRange = 250;
}
```

## Best Practices

1. **Use Semantic Colors**: Colors should intuitively represent status
2. **Keep Opacity Low**: Let data shine through the band (0.15-0.3)
3. **Label the Ranges**: Include documentation about what each band represents
4. **Consider Colorblindness**: Don't rely solely on color differentiation
5. **Test Readability**: Ensure bands don't obscure important data patterns
6. **Limit Band Count**: 2-3 bands maximum for clarity
7. **Use Consistent Styling**: Same colors for same meanings across application
8. **Align with SLAs**: Make range bands match real business thresholds
