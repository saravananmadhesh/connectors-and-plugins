---
name: syncfusion-aspnetmvc-accumulation-charts
description: Complete API reference and implementation guide for Syncfusion Accumulation Charts (Pie, Doughnut, Pyramid, Funnel) for ASP.NET MVC 5 applications. ALWAYS use this skill when user mentions accumulation charts, pie charts, doughnut charts, pyramid charts, funnel charts, circular charts, data visualization with percentages, proportional data display survey results display, budget breakdown, or any scenario requiring visual representation of parts-to-whole relationships in ASP.NET MVC.
metadata:
  author: "Syncfusion"
  category: "Data Visualization"
  version: "34.1.29"
---

# Implementing Syncfusion Accumulation Charts for ASP.NET MVC

Syncfusion Accumulation Charts are circular graphics that visualize numerical proportions and parts-to-whole relationships. The component supports Pie, Doughnut, Pyramid, and Funnel chart types, all rendered using Scalable Vector Graphics (SVG) for crisp, resolution-independent display.

## When to Use This Skill

Use this skill when you need to:

- **Visualize proportional data** - Display percentages, market share, budget allocation, survey results
- **Implement pie or doughnut charts** - Show data distribution in circular format
- **Create pyramid or funnel charts** - Represent hierarchical data, sales pipelines, conversion funnels
- **Add data labels** - Display values, percentages, or custom text on chart segments
- **Configure legends** - Provide interactive legends with positioning, styling, and templates
- **Enable tooltips** - Show detailed information on hover
- **Group small values** - Combine minor data points into "Others" category
- **Handle empty data** - Manage missing or null data points gracefully
- **Add annotations** - Overlay custom text, images, or HTML content
- **Support accessibility** - Implement WCAG 2.2 compliant charts with keyboard navigation
- **Enable interactions** - Point selection, explosion effects, click events
- **Print and export** - Generate PDF, PNG, JPEG, or SVG outputs
- **Customize appearance** - Apply themes, gradients, patterns, colors

## Component Overview

**Control:** AccumulationChart  
**Package:** Syncfusion.EJ2.MVC5  
**Helper:** `Html.EJS().AccumulationChart()`  
**Namespace:** Syncfusion.EJ2.Charts

**Chart Types:**
- **Pie** - Standard circular chart divided into slices
- **Doughnut** - Pie chart with center hole (using InnerRadius)
- **Pyramid** - Hierarchical triangle showing decreasing values
- **Funnel** - Similar to pyramid with customizable neck

**Key Capabilities:**
- 📊 Multiple chart types in one component
- 🎨 Smart labels to prevent overlapping
- 📌 Flexible legend with multiple positions
- 💬 Rich tooltip customization
- 🎯 Point selection and explosion
- ♿ Full accessibility support (WCAG 2.2, Section 508)
- 🖨️ Print and export functionality
- 🔄 Dynamic data updates
- 📱 Responsive and mobile-friendly
- 🌐 RTL (Right-to-Left) support

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)

Start here for initial setup and your first chart:
- Prerequisites and system requirements
- NuGet package installation (Syncfusion.EJ2.MVC5)
- Web.config namespace configuration
- Script and stylesheet references (CDN setup)
- ScriptManager registration
- First accumulation chart implementation
- Basic data binding (DataSource, XName, YName)
- Running and testing the application

### Pie and Doughnut Charts
📄 **Read:** [references/pie-and-doughnut-charts.md](references/pie-and-doughnut-charts.md)

Complete guide to pie and doughnut chart implementations:
- Rendering pie charts with Type property
- Customizing radius (default 80% to custom values)
- Positioning chart center (Center property)
- Creating various radius pie charts
- Implementing doughnut charts with InnerRadius
- Setting start and end angles for semi-pie
- Mapping colors and text from data (PointColorMapping)
- Applying border radius for modern appearance
- Customizing individual points (PointRender event)
- Adding patterns to slices
- Controlling border visibility on mouse hover
- Using color palettes
- Creating multi-level drill-down charts

### Pyramid and Funnel Charts
📄 **Read:** [references/pyramid-and-funnel-charts.md](references/pyramid-and-funnel-charts.md)

Complete guide to pyramid and funnel chart implementations:
- Understanding pyramid vs funnel chart usage
- Pyramid mode configuration (Linear vs Surface)
- Funnel neck dimensions and customization
- Width and height settings
- Gap between segments
- Exploding individual segments
- Point-level customization
- Use cases and best practices

### Data Labels
📄 **Read:** [references/data-labels.md](references/data-labels.md)

Comprehensive data label configuration:
- Enabling and positioning data labels
- Inside vs Outside label placement
- Smart label arrangement (prevents overlapping)
- Creating custom label templates
- Text mapping from data source
- Format options (percentages, values, custom)
- Connector line configuration (length, type, color)
- Font styling (family, size, color, weight)
- Border and background customization
- Accessibility considerations

### Legend
📄 **Read:** [references/legend.md](references/legend.md)

Complete legend configuration and customization:
- Enabling legends and default behavior
- Position options (Left, Right, Top, Bottom)
- Alignment settings (Near, Center, Far)
- Reversing legend order
- Custom legend shapes
- Size configuration (Width, Height)
- Item size customization (ShapeHeight, ShapeWidth)
- Legend paging for many items
- Text wrapping and maximum label width
- Click animation effects
- Legend title with styling
- Arrow page navigation
- Item padding control
- Layout options (Horizontal, Vertical, Auto)
- Maximum columns and fixed width
- Custom legend templates

### Tooltip and Interactions
📄 **Read:** [references/tooltip-and-interactions.md](references/tooltip-and-interactions.md)

Interactive features and user interactions:
- Enabling and configuring tooltips
- Tooltip format and content customization
- Template-based tooltips for rich content
- Tooltip styling (border, fill, opacity)
- Point selection (single and multiple modes)
- Selection mode configuration
- Point explosion effects on click
- Mouse events (MouseClick, MouseMove, PointClick)
- Animation configuration
- Print functionality (keyboard and programmatic)
- Export capabilities (PDF, PNG, JPEG, SVG)
- Event handling patterns

### Accessibility
📄 **Read:** [references/accessibility.md](references/accessibility.md)

Accessibility compliance and implementation:
- WCAG 2.2, Section 508, and ADA compliance
- WAI-ARIA attributes (roles and labels)
- Complete keyboard navigation support
- Tab navigation through chart elements
- Arrow key navigation between data points
- Legend navigation with keyboard
- Series toggle with Enter/Space
- Print shortcut (Ctrl+P)
- Screen reader optimization
- Color contrast requirements
- RTL (Right-to-Left) support details
- Mobile device accessibility
- Focus indicator implementation
- Testing with accessibility-checker tools

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)

Advanced configuration and features:
- Data grouping (by value or point count)
- Customizing grouped slices
- Empty point handling (Zero, Gap, Average, Drop modes)
- Empty point customization
- Annotations (text, images, custom HTML)
- Annotation positioning and styling
- Center labels for doughnut charts
- Gradient fills for visual appeal
- Dynamic data updates and real-time binding
- Chart title and subtitle configuration
- Margin and border settings
- Background customization
- RTL mode implementation
- Responsive design patterns

### AccumulationChart API Reference

📄 **Read:** [references/accumulationchart-api-reference.md](references/accumulationchart-api-reference.md)
- Complete AccumulationChart class API with 60+ properties
- Properties organized by category (Container, Positioning, Styling, Data, etc.)
- AccumulationSeries configuration and properties
- Legend, Tooltip, and center label property details
- Selection and interaction property reference
- All AccumulationChart events with descriptions
- Enumerations (AccumulationTheme, AccumulationChartType, SelectionMode, HighlightMode, etc.)
- Related classes and API links
- Common usage patterns and examples
- Namespace and assembly information
- Links to official Syncfusion API documentation

## Quick Start Example

Here's a minimal example to render a pie chart with data labels and legend:

```csharp
// Controller (HomeController.cs)
using System.Collections.Generic;
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        List<ChartData> pieData = new List<ChartData>
        {
            new ChartData { X = "Chrome", Y = 37, Text = "37%" },
            new ChartData { X = "UC Browser", Y = 17, Text = "17%" },
            new ChartData { X = "iPhone", Y = 19, Text = "19%" },
            new ChartData { X = "Others", Y = 4, Text = "4%" },
            new ChartData { X = "Opera", Y = 11, Text = "11%" },
            new ChartData { X = "Android", Y = 12, Text = "12%" }
        };
        return View(pieData);
    }
}

public class ChartData
{
    public string X { get; set; }
    public double Y { get; set; }
    public string Text { get; set; }
}
```

```cshtml
@* View (Index.cshtml) *@
@model List<ChartData>

@(Html.EJS().AccumulationChart("container")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .DataLabel(dl => dl.Visible(true).Name("Text").Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside))
              .Add();
    })
    .LegendSettings(ls => ls.Visible(true))
    .Title("Browser Market Share")
    .Render()
)
```

## Common Patterns

### Pattern 1: Doughnut Chart with Center Label

```cshtml
@(Html.EJS().AccumulationChart("doughnut")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .InnerRadius("40%")  // Creates doughnut
              .DataLabel(dl => dl.Visible(true))
              .Add();
    })
    .Annotations(new List<AccumulationChartAnnotation>
    {
        new AccumulationChartAnnotation
        {
            Content = "<div style='font-weight:bold;font-size:14px'>Total<br/>100%</div>",
            Region = Syncfusion.EJ2.Charts.Regions.Series,
            X = "50%",
            Y = "50%"
        }
    })
    .Title("Sales by Category")
    .Render()
)
```

### Pattern 2: Grouping Small Values

```cshtml
@(Html.EJS().AccumulationChart("grouped")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .GroupTo("10")  // Group values below 10
              .GroupMode(Syncfusion.EJ2.Charts.GroupModes.Value)
              .DataLabel(dl => dl.Visible(true))
              .Add();
    })
    .LegendSettings(ls => ls.Visible(true))
    .Render()
)
```

### Pattern 3: Interactive Chart with Selection

```cshtml
@(Html.EJS().AccumulationChart("interactive")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Region")
              .YName("Revenue")
              .Explode(true)
              .ExplodeOffset("10%")
              .ExplodeIndex(0)
              .Add();
    })
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .Tooltip(t => t.Enable(true).Format("${point.x}: <b>${point.y}M</b>"))
    .EnableSmartLabels(true)
    .Render()
)
```

### Pattern 4: Funnel Chart for Conversion

```cshtml
@(Html.EJS().AccumulationChart("funnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("Stage")
              .YName("Count")
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Width("60%")
              .Height("80%")
              .DataLabel(dl => dl.Visible(true).Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside))
              .Add();
    })
    .Title("Sales Conversion Funnel")
    .Render()
)
```

## Key Properties

### AccumulationChart Properties

| Property | Type | Description |
|----------|------|-------------|
| `Series` | AccumulationSeries[] | Collection of data series |
| `LegendSettings` | LegendSettings | Legend configuration |
| `Tooltip` | TooltipSettings | Tooltip configuration |
| `Title` | string | Chart title text |
| `EnableSmartLabels` | bool | Prevent label overlapping |
| `SelectionMode` | SelectionMode | Point/Cluster selection |
| `Annotations` | Annotation[] | Custom overlays |
| `Center` | string | Chart center position (x, y) |
| `EnableAnimation` | bool | Enable/disable animation |
| `Theme` | ChartTheme | Visual theme |
| `Background` | string | Background color |

### AccumulationSeries Properties

| Property | Type | Description |
|----------|------|-------------|
| `Type` | AccumulationType | Pie/Doughnut/Pyramid/Funnel |
| `DataSource` | object | Data collection |
| `XName` | string | Field for category names |
| `YName` | string | Field for values |
| `Radius` | string | Chart radius (%, px) |
| `InnerRadius` | string | Inner radius for doughnut |
| `StartAngle` | double | Starting angle (degrees) |
| `EndAngle` | double | Ending angle (degrees) |
| `Explode` | bool | Enable point explosion |
| `ExplodeOffset` | string | Explosion distance |
| `ExplodeIndex` | int | Auto-explode point index |
| `GroupTo` | string | Grouping threshold |
| `GroupMode` | GroupMode | Group by Point/Value |
| `DataLabel` | DataLabel | Label configuration |
| `PointColorMapping` | string | Field for point colors |

### DataLabel Properties

| Property | Type | Description |
|----------|------|-------------|
| `Visible` | bool | Show/hide labels |
| `Position` | LabelPosition | Inside/Outside placement |
| `Name` | string | Template field name |
| `Format` | string | Value format string |
| `Font` | FontStyle | Font configuration |
| `ConnectorStyle` | ConnectorStyle | Line style for outside labels |
| `Template` | string | Custom HTML template |

## Common Use Cases

### Business Intelligence Dashboards
- Market share analysis
- Revenue distribution by product/region
- Budget allocation visualization
- Expense category breakdown

### Analytics and Reports
- Survey results display
- Demographic data visualization
- Performance metrics (pass/fail ratios)
- Resource utilization

### E-commerce and Sales
- Sales by category
- Product popularity charts
- Conversion funnel visualization
- Customer segment distribution

### Education and Training
- Grade distribution
- Course completion rates
- Test score analysis
- Student enrollment by major

### Healthcare
- Patient demographics
- Disease prevalence
- Treatment success rates
- Resource allocation

### Manufacturing and Operations
- Production by product line
- Quality control metrics
- Defect type distribution
- Equipment utilization

## Next Steps

1. **Start with basics:** Read [getting-started.md](references/getting-started.md) to set up your first chart
2. **Choose chart type:** Review [pie-and-doughnut-charts.md](references/pie-and-doughnut-charts.md) or [pyramid-and-funnel-charts.md](references/pyramid-and-funnel-charts.md)
3. **Enhance visualization:** Add features from [data-labels.md](references/data-labels.md) and [legend.md](references/legend.md)
4. **Add interactivity:** Implement features from [tooltip-and-interactions.md](references/tooltip-and-interactions.md)
5. **Ensure accessibility:** Follow guidelines in [accessibility.md](references/accessibility.md)
6. **Advanced features:** Explore [advanced-features.md](references/advanced-features.md) for grouping, annotations, etc.
