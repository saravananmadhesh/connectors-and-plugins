# Configuring Data Labels

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Positioning](#label-positioning)
- [Label Formatting](#label-formatting)
- [Advanced Customization](#advanced-customization)
- [Common Use Cases](#common-use-cases)

## Overview

Data labels display values directly on pie and donut slices, showing exact values without requiring axis reference. They're essential for:

- Displaying exact percentages or values
- Improving readability without tooltip interaction
- Creating professional presentations and reports
- Quick value reference during data exploration

## Enabling Data Labels

### Basic Data Labels

Display values on all pie slices:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .DataLabel(label =>
            {
                label.Visible(true);
            })
            .Add();
    })
    .Render()
```

### Disable Data Labels

Hide labels for cleaner appearance:

```csharp
.DataLabel(label =>
{
    label.Visible(false);
})
```

## Label Positioning

Control where labels appear relative to pie slices.

### Positioning Options

```csharp
// Outside the pie (recommended)
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
})

// Inside the slice
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Inside);
})
```

### Positioning Examples

**Outside Position (Default):**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
})
// Labels appear outside pie slices with connector lines
```

**Inside Position:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Inside);
})
// Labels appear inside slices (works best for large slices)
```

### Position Selection Guide

| Position | Use Case | Best For |
|----------|----------|----------|
| **Outside** | Default positioning | Most scenarios, prevents overlap |
| **Inside** | Compact display | Large slices with adequate space |

## Label Formatting

Format how data is displayed in labels.

### Format Strings

Use format strings to customize label content:

```csharp
// Display only category name
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.x}");
})

// Display only value
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.y}");
})

// Category and value
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.x}: {point.y}");
})

// Percentage format
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.percentage}%");
})

// Combined with percentage
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.x}: {point.percentage:.##}%");
})

// Currency format
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("${point.y}K");
})
```

### Label Content Examples

**Simple Value:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.y}");
})
// Output: 25000
```

**Category with Value:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.x}: {point.y}");
})
// Output: Brand A: 25000
```

**Percentage:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.percentage}%");
})
// Output: 35%
```

**Custom Format:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("<b>{point.x}</b><br/>{point.percentage}%");
})
// Output: Brand A (bold on separate line), 35%
```

## Advanced Customization

### Label Styling

Control label appearance:

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.FontSize("12px");
    label.FontFamily("Arial");
    label.FontWeight("bold");
    label.Color("#333333");
    label.Opacity(1);
})
```

### Label Border and Background

Add visual emphasis:

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Fill("#ffffff");
    label.Border(border =>
    {
        border.Color("#0078d4");
        border.Width(1);
    });
    label.Margin(margin =>
    {
        margin.Left(5);
        margin.Right(5);
        margin.Top(5);
        margin.Bottom(5);
    });
})
```

### Label Rotation

Rotate labels for better visibility:

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Angle(45);
})
```

### Complete Customization Example

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
    label.Format("{point.x}: {point.percentage:.##}%");
    label.FontSize("11px");
    label.FontFamily("Arial");
    label.FontWeight("bold");
    label.Color("#0078d4");
    label.Fill("#f0f0f0");
    label.Border(border =>
    {
        border.Color("#0078d4");
        border.Width(1);
    });
    label.Margin(margin =>
    {
        margin.Left(5);
        margin.Right(5);
        margin.Top(3);
        margin.Bottom(3);
    });
})
```

## Common Use Cases

### Use Case 1: Percentage Distribution

Display percentages for composition analysis:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Value")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
            label.Format("{point.percentage}%");
            label.FontWeight("bold");
            label.FontSize("12px");
        })
        .Add();
})
```

### Use Case 2: Category and Values

Show both category names and values:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Region")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Format("{point.x}: ${point.y}K");
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
        })
        .Add();
})
```

### Use Case 3: Budget Breakdown

Display currency values with labels:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Department")
        .YName("Budget")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Doughnut)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Format("{point.x}<br/>${point.y}M");
            label.Color("#ffffff");
            label.FontWeight("bold");
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Inside);
        })
        .Add();
})
```

### Use Case 4: Survey Results

Show response distribution with percentages:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Response")
        .YName("Count")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Format("{point.x}: {point.percentage:.0}%");
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
            label.FontSize("11px");
        })
        .Add();
})
```

## Best Practices for Data Labels

1. **Readability**: Ensure labels don't overlap
2. **Positioning**: Use Outside for most scenarios
3. **Formatting**: Use clear, concise format strings
4. **Styling**: Match label style to chart theme
5. **Content**: Include units (%, $, K, M, etc.)
6. **Performance**: Consider disabling for very small slices
7. **Space**: Ensure adequate space around chart for labels

### Handle Small Slices

For small slices with labels that might overlap, consider styling:

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
    label.Format("{point.percentage:.##}%");
    label.TextOverflow(Syncfusion.EJ2.Charts.TextOverflow.Trim);
})
```

Data labels significantly improve chart usability when implemented thoughtfully for your specific data and visualization needs.
