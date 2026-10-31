---
name: syncfusion-aspnetmvc-circular-chart-3d
description: Build interactive 3D circular charts (pie and donut) in ASP.NET MVC using Syncfusion controls. Trigger when user needs circular data visualization, pie charts, donut charts, percentage distribution, composition analysis, data labels, legends, tooltips, or print/export functionality for 3D circular chart visualizations.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Charts"
---

# Implementing 3D Circular Chart Control in ASP.NET MVC

The Syncfusion ASP.NET MVC 3D Circular Chart control provides interactive pie and donut visualizations for displaying part-to-whole relationships. It supports data labels, legends, tooltips, empty point handling, and export capabilities for professional data presentations.

This skill guides you through implementing and configuring 3D circular charts for your ASP.NET MVC applications.

## Navigation Guide

Use this guide to find the right documentation for your task:

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and setup
- NuGet package integration
- Basic 3D circular chart creation
- Script resources and namespace configuration
- First working pie chart example

### Choosing Chart Types: Pie and Donut
📄 **Read:** [references/pie-and-donut-charts.md](references/pie-and-donut-charts.md)
- Pie chart implementation
- Donut chart implementation
- Radius customization
- Chart type selection guide

### Configuring Data Labels
📄 **Read:** [references/data-labels.md](references/data-labels.md)
- Data label positioning and formatting
- Label styling and customization
- Value display options
- Label visibility control

### Legend Configuration
📄 **Read:** [references/legend-configuration.md](references/legend-configuration.md)
- Legend positioning and visibility
- Legend customization
- Series identification
- Legend styling options

### Adding Tooltips and Interactivity
📄 **Read:** [references/tooltips.md](references/tooltips.md)
- Tooltip enabling and configuration
- Tooltip formatting and content
- User interaction patterns
- Tooltip styling options

### Title, Subtitle, and Customization
📄 **Read:** [references/title-and-customization.md](references/title-and-customization.md)
- Chart title and subtitle configuration
- Appearance customization
- Background and theme styling
- Responsive design options

### Handling Empty Points
📄 **Read:** [references/empty-points.md](references/empty-points.md)
- Empty point handling strategies
- Null value configuration
- Visual representation of empty points
- Data validation and edge cases

### Exporting and Printing
📄 **Read:** [references/print-export.md](references/print-export.md)
- Export to image formats (PNG, SVG)
- Print functionality
- Export options and configuration
- Batch export scenarios

## Quick Start Example

Here's a minimal 3D pie chart implementation:

```csharp
// Controller: HomeController.cs
public ActionResult Index()
{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { Category = "Chrome", Value = 37 },
        new ChartData { Category = "Firefox", Value = 23 },
        new ChartData { Category = "Safari", Value = 18 },
        new ChartData { Category = "Edge", Value = 15 },
        new ChartData { Category = "Others", Value = 7 }
    };
    return View(data);
}

public class ChartData
{
    public string Category { get; set; }
    public double Value { get; set; }
}
```

```html
<!-- View: Index.cshtml -->
@model List<ChartData>

@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Title("Browser Market Share")
    .Tooltip(tooltip => tooltip.Enable(true))
    .Legend(legend => legend.Visible(true))
    .Render()
```

This creates a basic 3D pie chart showing browser market share distribution.

## Common Patterns

### Pattern 1: Donut Chart with Center Label

Create a donut visualization with customized appearance:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Doughnut)
            .InnerRadius("60%")
            .Add();
    })
    .Title("Revenue Distribution")
    .Legend(legend => legend.Visible(true))
    .Render()
```

### Pattern 2: Enhanced Labels and Formatting

Display values with formatting on pie slices:

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
            label.Format("<b>{point.x}</b>: {point.y}%");
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
        })
        .Add();
})
```

### Pattern 3: Interactive Tooltip Display

Enable detailed information on hover:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b><br/>Value: {point.y}<br/>Percentage: {point.percentage}%");
})
```

## Key Chart Types

The 3D Circular Chart control supports:

- **Pie Chart** - Classic circular pie slice visualization for part-to-whole relationships
- **Donut Chart** - Pie variant with customizable inner radius for design flexibility

## Key Properties

Understanding these core properties helps configure 3D circular charts effectively:

| Property | Purpose | Common Values |
|----------|---------|----------------|
| `Type` | Chart rendering type | Pie, Doughnut |
| `DataSource` | Data to visualize | List<T> or IEnumerable |
| `XName` | Category field name | Property name as string |
| `YName` | Value field name | Property name as string |
| `Title` | Chart heading | Display string |
| `InnerRadius` | Donut hole size | "0%" (pie) to "90%" (thin ring) |
| `Legend` | Legend visibility/position | Enable(true/false), Position() |
| `DataLabel` | Data point labels | Visible(true/false), Format() |
| `Tooltip` | Data point hints | Enable(true/false), Format() |

## Next Steps

1. **Setup**: Start with [Getting Started](references/getting-started.md) to install and configure the control
2. **Chart Type**: Choose between [Pie and Donut](references/pie-and-donut-charts.md) based on your needs
3. **Labels**: Add [Data Labels](references/data-labels.md) for clarity
4. **Legend**: Configure [Legend](references/legend-configuration.md) for user navigation
5. **Interactivity**: Enable [Tooltips](references/tooltips.md) for detailed information
6. **Presentation**: Customize with [Title and Styling](references/title-and-customization.md)
7. **Edge Cases**: Handle [Empty Points](references/empty-points.md) gracefully
8. **Export**: Add [Print/Export](references/print-export.md) functionality for reports
