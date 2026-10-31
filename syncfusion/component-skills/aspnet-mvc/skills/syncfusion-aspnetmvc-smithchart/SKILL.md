---
name: syncfusion-aspnetmvc-smithchart
description: Implement Syncfusion Smith Chart component for ASP.NET MVC applications. ALWAYS use this skill when users need to visualize transmission line parameters, impedance/admittance data, RF circuit analysis, or high-frequency circuit applications. Trigger immediately for Smith Charts, smith chart visualization, transmission line data, impedance matching, RF visualization, antenna impedance, circuit parameter plots, or any mention of resistance-reactance plotting. Use when building data visualization for electrical engineering, RF design, or telecommunications applications.
metadata:
  author: "Syncfusion"
  category: "Data Visualization"
version: "34.1.29"
---

# Implementing Syncfusion Smith Chart for ASP.NET MVC

The Smith Chart is a specialized data visualization component for high-frequency circuit applications, displaying impedance and admittance data using circular coordinate systems. It's essential for transmission line analysis, impedance matching, and RF circuit design.

## When to Use This Skill

Use this skill when you need to:
- **Visualize transmission line parameters** - Display impedance, admittance, reflection coefficients, or S-parameters
- **Plot RF/microwave circuit data** - Analyze antenna impedance, filter responses, or amplifier matching networks
- **Display resistance-reactance relationships** - Show normalized impedance or admittance values on circular grids
- **Create interactive circuit analysis tools** - Enable engineers to explore circuit parameters with tooltips, legends, and markers
- **Build electrical engineering dashboards** - Integrate Smith Charts with other data visualizations for comprehensive analysis
- **Export circuit analysis results** - Print or export Smith Charts to PDF, PNG, SVG, or JPEG formats

## Component Overview

The Smith Chart uses two sets of circles (horizontal and radial axes) to plot transmission line parameters:
- **Impedance series** - Resistance and reactance on horizontal/radial grid
- **Admittance series** - Conductance and susceptance on circular paths
- **Multiple series support** - Plot and compare multiple data sets simultaneously
- **Interactive features** - Markers, data labels, tooltips, and legend for data exploration
- **Customization** - Full control over appearance, colors, sizes, and styling

## Documentation and Navigation Guide

### Getting Started & Installation
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites and system requirements
- NuGet package installation (Syncfusion.EJ2.MVC5)
- Project configuration (namespaces, scripts, CDN)
- ScriptManager setup
- First Smith Chart implementation
- Basic rendering example
- Verification steps

### Data Binding & Series Management
📄 **Read:** [references/data-binding-series.md](references/data-binding-series.md)
- Data structure requirements (resistance and reactance fields)
- Points vs datasource binding approaches
- Adding and configuring multiple series
- Series customization (fill color, opacity, width, visibility)
- Smart labels for preventing overlap
- Complete working examples with sample data
- Best practices for organizing transmission line data

### API Reference
📄 **Read:** [references/chart-types.md](references/api-reference.md)
- Smithchart Class API
- Related Settings Classes
- Enumerations
- Common Usage Patterns
- Notes
- AI Skill Definition & Code Generation Guidelines

### Axis Configuration
📄 **Read:** [references/axis-configuration.md](references/axis-configuration.md)
- Horizontal vs radial axis overview
- Label customization (position, intersection behavior, font styles)
- Major and minor gridlines configuration
- Gridline styling (width, dash patterns, opacity, count)
- Axis line customization and visibility
- Complete examples for both axis types
- Visual appearance optimization

### Legend Configuration
📄 **Read:** [references/legend.md](references/legend.md)
- Enabling and positioning legend
- Position options (top, bottom, left, right, custom coordinates)
- Alignment configuration (near, center, far)
- Shape customization (circle, rectangle, triangle)
- Size and padding settings
- Toggle visibility interaction
- Complete legend customization examples

### Markers & Data Labels
📄 **Read:** [references/markers-datalabels.md](references/markers-datalabels.md)
- Enabling markers on data points
- Marker customization (size, shape, colors, borders)
- Data label visibility and configuration
- Data label styling (fill, opacity, borders, text properties)
- Per-series customization
- Complete examples for visual enhancement

### Tooltip Configuration
📄 **Read:** [references/tooltip.md](references/tooltip.md)
- Tooltip module requirements
- Enabling tooltips for data points
- Customization options for tooltip appearance
- Per-series tooltip configuration
- Mouse interaction behavior
- Complete working examples

### Dimensions, Title & Export
📄 **Read:** [references/dimensions-title-print.md](references/dimensions-title-print.md)
- Container-based responsive sizing
- Fixed dimensions (pixel values)
- Percentage-based responsive sizing
- Title and subtitle configuration
- Title trimming and text overflow handling
- Print functionality
- Export to multiple formats (JPEG, PNG, SVG, PDF)
- Complete examples for all features

### Accessibility Features
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- WCAG 2.2 and Section 508 compliance
- WAI-ARIA attributes and roles
- Screen reader support
- Keyboard navigation (Tab, Shift+Tab, Ctrl+P)
- Color contrast requirements
- Mobile device accessibility
- Best practices for accessible implementation

## Quick Start Example

Here's a minimal Smith Chart implementation with sample transmission line data:

```cshtml
@using Syncfusion.EJ2

@Html.EJS().Smithchart("smithchart").Series(series =>
{
    series.Points(ViewBag.Points).Name("Transmission Line 1").Add();
}).Render()
```

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.Points = new[]
    {
        new { resistance = 0.15, reactance = 0.0 },
        new { resistance = 0.15, reactance = 0.15 },
        new { resistance = 0.18, reactance = 0.30 },
        new { resistance = 0.20, reactance = 0.40 },
        new { resistance = 0.25, reactance = 0.50 },
        new { resistance = 0.38, reactance = 0.65 },
        new { resistance = 0.60, reactance = 0.80 }
    };
    return View();
}
```

**Required Setup:**
1. Add `Syncfusion.EJ2` namespace in Web.config (Views folder)
2. Include EJ2 script reference in _Layout.cshtml
3. Add ScriptManager at end of body in _Layout.cshtml

## Common Patterns

### Pattern 1: Multiple Series Comparison
Compare multiple transmission lines or circuit configurations:

```cshtml
@Html.EJS().Smithchart("smithchart").Series(series =>
{
    series.Points(ViewBag.TransmissionLine1)
          .Name("50Ω Line")
          .Fill("#FF6347")
          .Marker(m => m.Visible(true).Shape(Syncfusion.EJ2.Charts.Shape.Circle))
          .Add();
    
    series.Points(ViewBag.TransmissionLine2)
          .Name("75Ω Line")
          .Fill("#4169E1")
          .Marker(m => m.Visible(true).Shape(Syncfusion.EJ2.Charts.Shape.Diamond))
          .Add();
}).LegendSettings(legend => legend.Visible(true).Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom))
  .Render()
```

### Pattern 2: Interactive Smith Chart with Tooltips
Enable tooltips for detailed data exploration:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series => series.Points(ViewBag.ImpedanceData)
                            .Name("Antenna Impedance")
                            .Marker(m => m.Visible(true))
                            .Tooltip(t => t.Visible(true))
                            .Add())
    .Render()
```

### Pattern 3: Customized Gridlines and Labels
Fine-tune the visual appearance of the chart:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h
        .MajorGridLines(g => g.Visible(true).Width(1).DashArray("5,5"))
        .MinorGridLines(g => g.Visible(true).DashArray("3,3"))
        .LabelStyle(l => l.FontSize("12px").FontWeight("bold")))
    .RadialAxis(r => r
        .MajorGridLines(g => g.Visible(true).Width(1))
        .MinorGridLines(g => g.Visible(true)))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Pattern 4: Responsive Smith Chart
Create a responsive chart that adapts to container size:

```html
<div style="width: 100%; height: 500px;">
    @Html.EJS().Smithchart("smithchart")
        .Width("100%")
        .Height("100%")
        .Series(series => series.Points(ViewBag.Data).Add())
        .Render()
</div>
```

### Pattern 5: Export for Reports
Enable print and export functionality for documentation:

```cshtml
<button onclick="printChart()">Print Chart</button>
<button onclick="exportChart()">Export as PNG</button>

@Html.EJS().Smithchart("smithchart")
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()

<script>
    function printChart() {
        var chart = document.getElementById('smithchart').ej2_instances[0];
        chart.print();
    }
    
    function exportChart() {
        var chart = document.getElementById('smithchart').ej2_instances[0];
        chart.export('PNG', 'SmithChart');
    }
</script>
```

## Key Configuration Options

### Series Configuration
- **Points/Datasource** - Array of objects with `resistance` and `reactance` properties
- **Fill** - Series line color (e.g., `"#FF6347"`)
- **Width** - Line thickness (default: 1)
- **Opacity** - Series transparency (0 to 1)
- **Visibility** - Show/hide series (`true`/`false`)
- **EnableSmartLabels** - Prevent data label overlapping

### Marker Settings
- **Visible** - Enable markers on data points
- **Shape** - Circle, Rectangle, Triangle, Diamond, Pentagon, etc.
- **Width/Height** - Marker dimensions
- **Fill** - Marker color
- **Border** - Border width and color

### Legend Settings
- **Visible** - Enable legend display
- **Position** - Top, Bottom, Left, Right, Custom
- **Alignment** - Near, Center, Far
- **Shape** - Circle, Rectangle, Triangle
- **ToggleVisibility** - Click to show/hide series

### Axis Properties
- **LabelPosition** - Inside or Outside axis line
- **LabelIntersectAction** - Hide overlapping labels
- **MajorGridLines** - Width, dash pattern, visibility, opacity
- **MinorGridLines** - Count, width, dash pattern, visibility
- **AxisLine** - Width, dash pattern, visibility

## Common Use Cases

### RF Circuit Analysis
Visualize impedance matching networks for amplifiers, filters, and antennas. Display S-parameter data from network analyzers to evaluate circuit performance across frequency ranges.

### Transmission Line Design
Plot characteristic impedance, reflection coefficients, and VSWR data for transmission line analysis. Compare different cable types and lengths to optimize signal integrity.

### Antenna Engineering
Display antenna input impedance across frequency bands. Visualize matching network effectiveness and resonance characteristics for antenna design optimization.

### Filter Design
Show filter response in impedance/admittance domain. Analyze pole-zero locations and evaluate filter matching at input/output ports.

### Educational Tools
Create interactive learning tools for electrical engineering students studying transmission line theory, impedance matching, and RF circuit analysis.

### Quality Assurance
Display measurement data from automated test equipment. Compare production units against specification limits for impedance matching and circuit performance.

## Troubleshooting Quick Reference

**Chart not rendering:**
- Verify `Syncfusion.EJ2` namespace added to Web.config
- Check EJ2 script reference in _Layout.cshtml
- Ensure ScriptManager is at end of body

**Tooltip not working:**
- Import TooltipRender module
- Set `Visible(true)` in tooltip settings

**Data not displaying:**
- Verify data structure has `resistance` and `reactance` properties
- Check that values are numeric, not strings
- Ensure series has `.Add()` method called

**Legend not showing:**
- Set `Visible(true)` in LegendSettings
- Verify series have `.Name()` property set

For detailed troubleshooting and advanced configurations, refer to the specific reference files listed in the navigation guide above.
