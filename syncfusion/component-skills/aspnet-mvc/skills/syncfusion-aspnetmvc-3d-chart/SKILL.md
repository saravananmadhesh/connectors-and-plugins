---
name: syncfusion-aspnetmvc-3d-chart
description: Build interactive 3D charts in ASP.NET MVC using Syncfusion controls. Trigger when user needs 3D data visualization with bar charts, column charts, stacked variants, axis configuration, data labels, legends, tooltips, interactive selection, or print/export functionality. Use this skill for any 3D chart implementation in MVC applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Charts"
---

# Implementing 3D Chart Control in ASP.NET MVC

The Syncfusion ASP.NET MVC 3D Chart control provides a comprehensive solution for creating interactive 3D data visualizations. It supports multiple chart types (bar, column, and stacked variants), advanced axis configuration, interactive features like tooltips and selection, and export capabilities.

This skill guides you through implementing and configuring 3D charts for your ASP.NET MVC applications.

## Navigation Guide

Use this guide to find the right documentation for your task:

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and setup
- NuGet package integration
- Basic 3D chart creation
- Script resources and namespace configuration
- First working example

### Working with Chart Data
📄 **Read:** [references/working-with-data.md](references/working-with-data.md)
- Data binding to chart series
- Data source configuration
- Series properties and data mapping
- Rendering data in 3D format

### Choosing Chart Types
📄 **Read:** [references/series-types.md](references/series-types.md)
- Column, Bar, Stacking Column, Stacking Bar chart types
- 100% stacked variants for percentage composition
- When to use each chart type
- Decision tree and selection guide

### Configuring Chart Axes
📄 **Read:** [references/axes-configuration.md](references/axes-configuration.md)
- Category axis setup
- Numeric axis configuration
- DateTime axis for time-series data
- Logarithmic axis for exponential data
- Axis labels, ranges, and customization

### Styling and Appearance
📄 **Read:** [references/appearance.md](references/appearance.md)
- Chart dimensions and sizing
- Series appearance and colors
- Visual styling and themes
- Customization options

### Interactive Features
📄 **Read:** [references/interactive-features.md](references/interactive-features.md)
- Data labels and annotations
- Legend configuration and positioning
- Tooltips for user interaction
- Selection and highlighting
- Multiple panes for composite charts

### Exporting and Printing
📄 **Read:** [references/print-export.md](references/print-export.md)
- Export to image formats (PNG, SVG)
- Print functionality
- Export options and configuration

### Accessibility Features
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- WCAG compliance
- Keyboard navigation
- Screen reader support
- ARIA attributes

## Quick Start Example

Here's a minimal 3D column chart implementation:

```csharp
// Controller: HomeController.cs
public ActionResult Index()
{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { X = "USA", Y = 46, Y1 = 56 },
        new ChartData { X = "GBR", Y = 27, Y1 = 17 },
        new ChartData { X = "CHN", Y = 26, Y1 = 36 },
        new ChartData { X = "RUS", Y = 16, Y1 = 32 },
        new ChartData { X = "GER", Y = 12, Y1 = 7 }
    };
    return View(data);
}

public class ChartData
{
    public string X { get; set; }
    public double Y { get; set; }
    public double Y1 { get; set; }
}
```

```html
<!-- View: Index.cshtml -->
@model List<ChartData>

@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("X")
            .YName("Y")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .PrimaryXAxis(axis => axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category))
    .PrimaryYAxis(axis => axis.LabelFormat("${value}K"))
    .Title("Sales Comparison")
    .Render()
```

This creates a basic 3D column chart with two data series and axis labels.

## Common Patterns

### Pattern 1: Multiple Series Chart

Create comparison charts with multiple data series:

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("X")
            .YName("Y")
            .Name("Series 1")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
        
        series.DataSource((IEnumerable<object>)Model)
            .XName("X")
            .YName("Y1")
            .Name("Series 2")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .Render()
```

### Pattern 2: Stacked Chart Types

Visualize proportional data with stacked variants:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("X")
        .YName("Y")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
        .Add();
    
    series.DataSource((IEnumerable<object>)Model)
        .XName("X")
        .YName("Y1")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
        .Add();
})
```

### Pattern 3: Interactive Tooltip

Enable user feedback with tooltips:

```csharp
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Shared(false)
)
```

## Key Chart Types

The 3D Chart control supports the following chart types:

- **Column** - Vertical bars for categorical comparison
- **Bar** - Horizontal bars for categorical comparison
- **Stacking Column** - Stacked vertical bars showing composition
- **Stacking Column 100%** - Normalized stacked bars showing percentages
- **Stacking Bar** - Stacked horizontal bars showing composition
- **Stacking Bar 100%** - Normalized stacked horizontal bars showing percentages

Each type is optimized for different data visualization scenarios and can be configured with colors, labels, and interactive features.

## Key Properties

Understanding these core properties helps configure 3D charts effectively:

| Property | Purpose | Common Values |
|----------|---------|----------------|
| `Type` | Chart rendering type | Column, Bar, StackingColumn, StackingBar |
| `DataSource` | Data to visualize | List<T> or IEnumerable |
| `XName` | Category field name | Property name as string |
| `YName` | Value field name | Property name as string |
| `PrimaryXAxis` | X-axis configuration | Category, Numeric, DateTime |
| `PrimaryYAxis` | Y-axis configuration | Range, label format |
| `Title` | Chart heading | Display string |
| `Legend` | Legend visibility/position | Enable(true/false), Position() |
| `Tooltip` | Data point hints | Enable(true/false), Shared() |

## Next Steps

1. **Setup**: Start with [Getting Started](references/getting-started.md) to install and configure the control
2. **Data**: Follow [Working with Data](references/working-with-data.md) to bind your data
3. **Axes**: Use [Axes Configuration](references/axes-configuration.md) for advanced axis control
4. **Interactivity**: Explore [Interactive Features](references/interactive-features.md) for tooltips, legends, and selection
5. **Styling**: Customize appearance with [Styling](references/appearance.md)
6. **Export**: Add [Print/Export](references/print-export.md) functionality as needed
7. **Accessibility**: Ensure [Accessibility](references/accessibility.md) compliance for all users
