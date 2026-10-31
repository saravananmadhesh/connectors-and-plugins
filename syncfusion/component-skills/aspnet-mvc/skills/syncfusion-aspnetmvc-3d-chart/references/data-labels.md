# Data Labels Configuration

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Positioning](#label-positioning)
- [Label Formatting](#label-formatting)
- [Advanced Customization](#advanced-customization)
- [Common Use Cases](#common-use-cases)

## Overview

Data labels display values directly on chart data points, making it easy to read exact values without referencing axes. They're particularly useful for:

- Column and bar charts (value visibility)
- Small datasets (clear value display)
- Presentations and reports (professional appearance)
- Comparative analysis (quick value comparison)

## Enabling Data Labels

### Basic Data Labels

Display values on all data points:

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .DataLabel(label =>
            {
                label.Visible(true);
            })
            .Add();
    })
    .Render()
```

### Disable Data Labels

Hide data labels for cleaner appearance:

```csharp
.DataLabel(label =>
{
    label.Visible(false);
})
```

## Label Positioning

Control where labels appear relative to data points.

### Positioning Options

```csharp
// Top position (above bars/columns)
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Top);
})

// Bottom position
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Bottom);
})

// Middle position (center of bars)
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Middle);
})

// Outer position (outside of bars)
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outer);
})
```

### Positioning Examples

**Column Chart - Top Position:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Top);
})
// Values appear above each column
```

**Bar Chart - Outer Position:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outer);
})
// Values appear to the right of each bar
```

**Stacked Chart - Middle Position:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Middle);
})
// Values appear in center of each stacked segment
```

## Label Formatting

Format how data is displayed in labels.

### Format Strings

Use format strings to customize label content:

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    // Display raw value
    label.Format("{point.y}");
})

.DataLabel(label =>
{
    label.Visible(true);
    // Currency format
    label.Format("${point.y}");
})

.DataLabel(label =>
{
    label.Visible(true);
    // Percentage format
    label.Format("{point.y}%");
})

.DataLabel(label =>
{
    label.Visible(true);
    // Two decimal places
    label.Format("{point.y:.##}");
})

.DataLabel(label =>
{
    label.Visible(true);
    // Thousands separator
    label.Format("{point.y:n0}");
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
// Output: 1500
```

**Currency:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("${point.y}K");
})
// Output: $150K
```

**With Category:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.x}: {point.y}");
})
// Output: January: 15000
```

**Custom Text:**

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("Sales: ${point.y}");
})
// Output: Sales: $15000
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
})
```

### Label Border

Add border to labels:

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Border(border =>
    {
        border.Color("#000000");
        border.Width(1);
    });
})
```

### Label Background

Add background color to labels:

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Fill("#ffffff");
    label.Opacity(0.8);
})
```

### Label Angle

Rotate labels:

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
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Top);
    label.Format("${point.y}K");
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
        margin.Top(5);
        margin.Bottom(5);
    });
})
```

## Common Use Cases

### Use Case 1: Sales Chart with Currency Labels

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Region")
        .YName("Revenue")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Top);
            label.Format("${point.y}M");
            label.FontWeight("bold");
            label.FontSize("12px");
        })
        .Add();
})
```

### Use Case 2: Percentage Distribution

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Percentage")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Middle);
            label.Format("{point.y}%");
            label.Color("#ffffff");
            label.FontWeight("bold");
        })
        .Add();
})
```

### Use Case 3: Stacked Chart with Inner Labels

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Quarter")
        .YName("Product1")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Middle);
            label.Format("{point.y}");
            label.Color("#ffffff");
        })
        .Add();
    
    series.DataSource((IEnumerable<object>)Model)
        .XName("Quarter")
        .YName("Product2")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Middle);
            label.Format("{point.y}");
            label.Color("#ffffff");
        })
        .Add();
})
```

### Use Case 4: Time Series with Date Labels

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Date")
        .YName("Value")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Format("{point.y}");
        })
        .Add();
})
```

## Best Practices for Data Labels

1. **Readability**: Ensure labels don't overlap
2. **Positioning**: Use appropriate positions (Top for columns, Outer for bars)
3. **Formatting**: Use clear, concise format strings
4. **Styling**: Match label style to chart theme
5. **Performance**: Consider disabling labels for large datasets
6. **Clarity**: Include units (K, M, $, %, etc.) in format

Data labels significantly improve chart usability when implemented thoughtfully and appropriately for your data type and visualization purpose.
