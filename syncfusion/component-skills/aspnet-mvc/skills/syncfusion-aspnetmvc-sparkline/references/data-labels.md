# Data Labels Configuration

Data labels display numeric values directly on or near sparkline data points, improving readability and providing precise information without hovering or additional UI.

## Table of Contents
- [Overview](#overview)
  - [When to Use Data Labels](#when-to-use-data-labels)
- [Enabling Data Labels](#enabling-data-labels)
  - [Show Labels on All Points](#show-labels-on-all-points)
  - [Show Labels on Specific Points](#show-labels-on-specific-points)
  - [Label Visibility Options](#label-visibility-options)
  - [Multiple Label Types](#multiple-label-types)
- [Customizing Data Label Appearance](#customizing-data-label-appearance)
  - [Label Fill and Border](#label-fill-and-border)
  - [Text Styling](#text-styling)
  - [Text Style Properties](#text-style-properties)
  - [Opacity Control](#opacity-control)
- [Label Formatting](#label-formatting)
  - [Default Format](#default-format)
  - [Custom Format Strings](#custom-format-strings)
  - [Format Placeholders](#format-placeholders)
  - [Currency Formatting](#currency-formatting)
  - [Percentage Formatting](#percentage-formatting)
- [Label Positioning](#label-positioning)
  - [Offset Control](#offset-control)
  - [Offset Properties](#offset-properties)
- [Complete Customization Examples](#complete-customization-examples)
  - [Example 1: Professional Report Labels](#example-1-professional-report-labels)
  - [Example 2: Highlight Extremes Only](#example-2-highlight-extremes-only)
  - [Example 3: Minimalist Labels](#example-3-minimalist-labels)
- [Common Scenarios](#common-scenarios)
  - [Scenario 1: Sales Performance Tracking](#scenario-1-sales-performance-tracking)
  - [Scenario 2: Stock Price Movement](#scenario-2-stock-price-movement)
  - [Scenario 3: Performance Metrics](#scenario-3-performance-metrics)
- [Best Practices](#best-practices)

## Overview

Data labels are text annotations that show the actual values at specific data points. While sparklines are designed to be compact, data labels add context and precision when needed.

### When to Use Data Labels

- Displaying specific values for key points
- Adding precision to visual representations
- Highlighting extremes (high, low, first, last points)
- Meeting reporting requirements that need exact numbers
- Enabling data-driven decisions without manual calculation

## Enabling Data Labels

### Show Labels on All Points

Display a label for every data point:

```cshtml
@Html.EJS().Sparkline("allLabelsChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "All" })
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Show Labels on Specific Points

Display labels only for important data points:

```cshtml
<!-- Show labels only for high and low points -->
@Html.EJS().Sparkline("extremeLabelsChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "High", "Low" })
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Label Visibility Options

| Option | Display Behavior | Use Case |
|--------|------------------|----------|
| **All** | Every data point | Detail analysis |
| **Start** | First data point | Beginning reference |
| **End** | Last data point | End reference |
| **High** | Maximum value point | Peak identification |
| **Low** | Minimum value point | Valley identification |
| **Negative** | Negative value points | Problem identification |

### Multiple Label Types

Show multiple specific points:

```cshtml
@Html.EJS().Sparkline("multiLabelChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "Start", "End", "High", "Low" })
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Customizing Data Label Appearance

### Label Fill and Border

Customize label background and outline:

```cshtml
@Html.EJS().Sparkline("styledLabelsChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "High", "Low" })
        .Fill("rgba(255, 255, 255, 0.8)")  // White background with transparency
        .Border(br => br
            .Color("gray")
            .Width(1)
        )
        .Opacity(0.9)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Text Styling

Customize the font appearance of labels:

```cshtml
@Html.EJS().Sparkline("fontStyledLabelsChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "All" })
        .TextStyle(ts => ts
            .Color("darkblue")
            .Size("10px")
            .FontFamily("Arial")
            .FontStyle("normal")
            .FontWeight("bold")
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Text Style Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **Color** | string | Text color | `"red"`, `"#FF0000"` |
| **FontSize** | string | Size in pixels or em | `"10px"`, `"0.8em"` |
| **FontFamily** | string | Font name | `"Arial"`, `"Georgia"` |
| **FontStyle** | string | Font style | `"normal"`, `"italic"` |
| **FontWeight** | string | Font weight | `"normal"`, `"bold"`, `"600"` |

### Opacity Control

Control label transparency:

```cshtml
@Html.EJS().Sparkline("opacityLabelsChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "All" })
        .Fill("yellow")
        .Opacity(0.7)  // 70% visible
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Label Formatting

### Default Format

By default, labels show the Y-value:

```cshtml
@Html.EJS().Sparkline("defaultFormat")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "All" })
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
// Output: "100", "250", "150", etc.
```

### Custom Format Strings

Display custom text using format placeholders:

```cshtml
<!-- Show both X and Y values -->
@Html.EJS().Sparkline("xyFormatChart")
    .XName("Month")
    .YName("Sales")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "All" })
        .Format("${xval}: ${yval}")  // "$Jan: $5000"
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Format Placeholders

| Placeholder | Represents | Example |
|-------------|------------|---------|
| **${xval}** | X-axis value | "Jan", "Q1", "2023" |
| **${yval}** | Y-axis value | "5000", "250.5" |

### Currency Formatting

```cshtml
@Html.EJS().Sparkline("currencyChart")
    .XName("Month")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "High", "Low" })
        .Format("$${yval}K")  // "$250K", "$180K"
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Percentage Formatting

```cshtml
@Html.EJS().Sparkline("percentageChart")
    .XName("Quarter")
    .YName("GrowthRate")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "All" })
        .Format("${yval}%")  // "25%", "30%", "22%"
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Label Positioning

### Offset Control

Position labels away from data points:

```cshtml
@Html.EJS().Sparkline("offsetChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "High", "Low" })
        .Offset(new { x = 5, y = 10 })  // 5px right, 10px down
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Offset Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **x** | int | Horizontal offset in pixels (positive = right) | `0`, `5`, `10` |
| **y** | int | Vertical offset in pixels (positive = down) | `0`, `5`, `10` |

## Complete Customization Examples

### Example 1: Professional Report Labels

```cshtml
@Html.EJS().Sparkline("reportLabelsChart")
    .XName("Quarter")
    .YName("Profit")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "All" })
        .Format("$${yval}K")
        .Fill("rgba(255, 255, 255, 0.9)")
        .Border(br => br
            .Color("gray")
            .Width(1)
        )
        .TextStyle(ts => ts
            .Color("darkblue")
            .Size("9px")
            .FontWeight("bold")
        )
        .Offset(new Syncfusion.EJ2.Charts.SparklineLabelOffset { X = 0, Y = -8 })  // Above the point
    )
    .Height("120")
    .Width("80")
    .DataSource(Model)
    .Render()
```

### Example 2: Highlight Extremes Only

```cshtml
@Html.EJS().Sparkline("extremeLabelsOnlyChart")
    .XName("Day")
    .YName("Temperature")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "High", "Low" })
        .Format("${yval}°C")
        .Fill("lightyellow")
        .Border(br => br
            .Color("orange")
            .Width(1)
        )
        .TextStyle(ts => ts
            .Color("darkorange")
            .Size("10px")
        )
        .Offset(new Syncfusion.EJ2.Charts.SparklineLabelOffset { X = 0, Y = -10 })
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Example 3: Minimalist Labels

```cshtml
@Html.EJS().Sparkline("minimalLabelsChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "Start", "End" })
        .Fill("transparent")
        .TextStyle(ts => ts
            .Color("gray")
            .Size("8px")
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Common Scenarios

### Scenario 1: Sales Performance Tracking

Show sales figures for start, end, high, and low points:

```csharp
public class SalesData
{
    public string Month { get; set; }
    public decimal Amount { get; set; }
}
```

```cshtml
@Html.EJS().Sparkline("salesChart")
    .XName("Month")
    .YName("Amount")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "Start", "End", "High", "Low" })
        .Format("$${yval}K")
        .TextStyle(ts => ts
            .Color("darkgreen")
            .Size("9px")
            .FontWeight("bold")
        )
    )
    .Height("100")
    .Width("80")
    .DataSource(Model)
    .Render()
```

### Scenario 2: Stock Price Movement

Display opening, closing, high, and low prices:

```cshtml
@Html.EJS().Sparkline("stockChart")
    .XName("Date")
    .YName("Price")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "Start", "End", "High", "Low" })
        .Format("$${yval}")
        .TextStyle(ts => ts
            .Color("navy")
            .Size("8px")
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Scenario 3: Performance Metrics

Show only high and low performance values:

```cshtml
@Html.EJS().Sparkline("performanceChart")
    .XName("Week")
    .YName("ScorePercentage")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "High", "Low" })
        .Format("${yval}%")
        .Fill("rgba(200, 200, 200, 0.3)")
        .TextStyle(ts => ts
            .Color("darkred")
            .Size("9px")
        )
    )
    .Height("80")
    .Width("60")
    .DataSource(Model)
    .Render()
```

## Best Practices

1. **Avoid Clutter**: Use "All" labels only for small datasets
2. **Highlight Extremes**: Prefer "High", "Low", "Start", "End" for clarity
3. **Use Meaningful Formats**: Include units (%, $, °C) in format strings
4. **Test Readability**: Ensure labels are legible at actual display size
5. **Maintain Contrast**: Use sufficient contrast between label text and background
6. **Position Carefully**: Use offsets to prevent overlapping labels
7. **Consider Mobile**: Labels may be harder to read on small screens
8. **Document Meaning**: Help users understand what labels represent
9. **Match Theme**: Coordinate label styling with overall design
10. **Validate Data**: Ensure data values are meaningful before labeling all points
