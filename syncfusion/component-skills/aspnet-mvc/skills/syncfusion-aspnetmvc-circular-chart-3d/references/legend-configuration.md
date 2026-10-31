# Legend Configuration

## Table of Contents
- [Legend Overview](#legend-overview)
- [Enabling the Legend](#enabling-the-legend)
- [Legend Positioning](#legend-positioning)
- [Legend Customization](#legend-customization)
- [Interactive Legend](#interactive-legend)
- [Common Use Cases](#common-use-cases)

## Legend Overview

The legend displays series identification and helps users understand what each pie slice represents. It's essential for:

- Identifying categories and their corresponding slices
- Providing visual reference without complex labeling
- Supporting data exploration and understanding
- Professional presentation and reports

## Enabling the Legend

### Basic Legend

Enable the legend with default positioning:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Legend(legend =>
    {
        legend.Visible(true);
    })
    .Render()
```

### Disable Legend

Hide legend for minimal interface:

```csharp
.Legend(legend =>
{
    legend.Visible(false);
})
```

## Legend Positioning

Control where the legend appears relative to the chart.

### Positioning Options

```csharp
// Top position
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Top);
})

// Bottom position
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
})

// Left position
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Left);
})

// Right position (default)
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Right);
})
```

### Position Selection Guide

| Position | Layout Impact | Best For |
|----------|---------------|----------|
| **Top** | Chart below legend | Wide, narrow charts |
| **Bottom** | Chart above legend | Compact dashboards |
| **Left** | Chart on right | High charts |
| **Right** | Chart on left | Standard layout |

### Positioning Examples

**Top Position:**

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Top);
})
// Legend appears above chart in horizontal layout
```

**Bottom Position:**

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
})
// Legend appears below chart in horizontal layout
```

**Left Position:**

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Left);
})
// Legend appears to left of chart vertically
```

## Legend Customization

### Legend Properties

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Right);
    legend.Width("200px");
    legend.Height("auto");
    legend.Padding(20);
    legend.Margin(10);
})
```

### Legend Size and Layout

```csharp
// Fixed size legend
.Legend(legend =>
{
    legend.Visible(true);
    legend.Width("250px");
    legend.Height("300px");
})

// Custom padding
.Legend(legend =>
{
    legend.Visible(true);
    legend.Padding(margin =>
    {
        margin.Left(10);
        margin.Right(10);
        margin.Top(10);
        margin.Bottom(10);
    });
})
```

### Legend Background and Border

Add visual definition:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Background("#f5f5f5");
    legend.Border(border =>
    {
        border.Color("#cccccc");
        border.Width(1);
    });
})
```

### Legend Text Styling

Customize legend label appearance:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.TextStyle(style =>
    {
        style.FontFamily("Arial");
        style.FontSize("12px");
        style.Color("#333333");
    });
})
```

### Legend Item Styling

Control legend item appearance:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.ItemPadding(15);  // Space between items
    legend.MaxItemsInRow(2);  // Items per row (horizontal)
})
```

## Interactive Legend

### Legend with Selection

Allow users to select/deselect series by clicking legend items:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Value")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .Add();
})
.Legend(legend =>
{
    legend.Visible(true);
    legend.ToggleVisibility(true);  // Click to show/hide
})
```

### Legend with Hover Effect

Highlight corresponding slices on legend hover:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.EnableHighlight(true);
})
```

## Common Use Cases

### Use Case 1: Right-Aligned Legend (Default)

Standard layout with legend on the right:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Brand")
            .YName("MarketShare")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Title("Market Share Analysis")
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Right);
    })
    .Render()
```

### Use Case 2: Top-Aligned Legend (Dashboard)

Compact dashboard with top legend:

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("400px")
    .Height("300px")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Top);
    })
    .Render()
```

### Use Case 3: Custom Styled Legend

Professional appearance with custom styling:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Right);
    legend.Background("#ffffff");
    legend.Border(border =>
    {
        border.Color("#d0d0d0");
        border.Width(1);
    });
    legend.TextStyle(style =>
    {
        style.FontFamily("Segoe UI");
        style.FontSize("13px");
        style.Color("#333333");
        style.FontWeight("500");
    });
    legend.Padding(15);
})
```

### Use Case 4: Left Legend with Multiple Rows

Vertical layout with multi-row legend:

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("500px")
    .Height("400px")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Item")
            .YName("Percentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Doughnut)
            .Add();
    })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Left);
        legend.Width("180px");
        legend.ItemPadding(10);
    })
    .Render()
```

### Use Case 5: Interactive Toggle Legend

Let users control slice visibility:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
    legend.ToggleVisibility(true);
})
```

## Legend Data Binding

### Series Name Mapping

Legend uses series names for labels:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Value")
        .Name("2024 Data")  // Legend label
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .Add();
})
.Legend(legend =>
{
    legend.Visible(true);
})
// Legend displays: "2024 Data"
```

### Multiple Series Legend

For multiple circular series:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Sales")
        .Name("Sales")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .Add();
    
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Profit")
        .Name("Profit")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .Add();
})
.Legend(legend =>
{
    legend.Visible(true);
})
// Legend displays both series: "Sales" and "Profit"
```

## Best Practices for Legends

1. **Positioning**: Choose position based on layout (Top for wide, Right for tall)
2. **Visibility**: Always show for multi-slice or multi-series charts
3. **Styling**: Match legend style to overall chart theme
4. **Clarity**: Use clear, descriptive series names
5. **Space**: Ensure adequate space for legend
6. **Interactivity**: Consider enabling toggle for complex charts
7. **Performance**: Legends have minimal impact on performance

## Legend Spacing Example

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("600px")
    .Height("400px")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Region")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Title("Regional Sales Distribution")
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Right);
        legend.Padding(20);
        legend.ItemPadding(12);
        legend.TextStyle(style =>
        {
            style.FontSize("12px");
            style.Color("#333333");
        });
    })
    .Render()
```

Effective legend configuration improves chart usability by providing clear, accessible series identification and supporting user exploration.
