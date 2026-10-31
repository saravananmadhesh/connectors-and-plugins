# Legend Configuration in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Enabling Legend](#enabling-legend)
  - [Basic Setup Example](#basic-setup-example)
- [Legend Position](#legend-position)
  - [Available Positions](#available-positions)
  - [Position Examples](#position-examples)
  - [Complete Position Example](#complete-position-example)
- [Custom Positioning](#custom-positioning)
  - [Using Custom Position](#using-custom-position)
  - [Custom Position Examples](#custom-position-examples)
  - [Complete Custom Position Example](#complete-custom-position-example)
- [Legend Alignment](#legend-alignment)
  - [Alignment Options](#alignment-options)
  - [Horizontal Alignment (Top/Bottom Position)](#horizontal-alignment-topbottom-position)
  - [Vertical Alignment (Left/Right Position)](#vertical-alignment-leftright-position)
  - [Alignment Example](#alignment-example)
- [Legend Shape](#legend-shape)
  - [Available Shapes](#available-shapes)
  - [Shape Examples](#shape-examples)
  - [Complete Shape Example](#complete-shape-example)
- [Legend Size](#legend-size)
  - [Default Sizing](#default-sizing)
  - [Custom Size](#custom-size)
  - [Size Examples](#size-examples)
  - [Complete Size Example](#complete-size-example)
- [Padding Configuration](#padding-configuration)
  - [Padding Properties](#padding-properties)
  - [Padding Examples](#padding-examples)
  - [Complete Padding Example](#complete-padding-example)
- [Toggle Visibility](#toggle-visibility)
  - [Enabling Toggle](#enabling-toggle)
  - [Toggle Visibility Example](#toggle-visibility-example)
  - [Disabling Toggle](#disabling-toggle)
- [Complete Examples](#complete-examples)
  - [Example 1: Fully Customized Legend](#example-1-fully-customized-legend)
  - [Example 2: Minimalist Legend](#example-2-minimalist-legend)
  - [Example 3: Technical Documentation Legend](#example-3-technical-documentation-legend)
- [Best Practices](#best-practices)
  - [Positioning](#positioning)
  - [Naming](#naming)
  - [Styling](#styling)
  - [Interaction](#interaction)
  - [Accessibility](#accessibility)

## Overview

The legend is a key component that helps users identify and distinguish between multiple series in a Smith Chart. It displays series names with corresponding visual symbols (shapes and colors) and can be interactively used to show/hide series.

**Key Features:**
- Identifies series by name and symbol
- Positioned flexibly (top, bottom, left, right, or custom coordinates)
- Customizable shapes, sizes, and spacing
- Interactive toggling of series visibility
- Responsive layout support

## Enabling Legend

By default, the legend is **hidden**. You must explicitly enable it:

**Basic Legend:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .LegendSettings(legend => legend.Visible(true))
    .Series(series =>
    {
        series.Points(ViewBag.Data1).Name("Series 1").Add();
        series.Points(ViewBag.Data2).Name("Series 2").Add();
    })
    .Render()
```

**Important:** Each series must have a `.Name()` property for the legend to display it properly.

### Basic Setup Example

**Controller:**
```csharp
public ActionResult BasicLegend()
{
    ViewBag.Transmission1 = new[]
    {
        new { resistance = 0.2, reactance = 0.2 },
        new { resistance = 0.5, reactance = 0.5 },
        new { resistance = 0.8, reactance = 0.8 }
    };
    
    ViewBag.Transmission2 = new[]
    {
        new { resistance = 0.3, reactance = 0.1 },
        new { resistance = 0.6, reactance = 0.3 },
        new { resistance = 0.9, reactance = 0.6 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Name("50Ω Line")
              .Fill("#FF6347")
              .Points(ViewBag.Transmission1)
              .Add();
        
        series.Name("75Ω Line")
              .Fill("#4169E1")
              .Points(ViewBag.Transmission2)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Render()
```

## Legend Position

Position the legend at predefined locations around the chart.

### Available Positions

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Bottom"))
```

**Position Options:**
- **Bottom** - Below the chart (default, recommended)
- **Top** - Above the chart
- **Left** - Left side of the chart
- **Right** - Right side of the chart
- **Custom** - Specify exact x, y coordinates

### Position Examples

**Bottom Position (Default):**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Points(ViewBag.Data1).Name("Antenna A").Add();
        series.Points(ViewBag.Data2).Name("Antenna B").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom"))
    .Render()
```

**Top Position:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Top"))
```

**Use when:** Title is not present or space above chart is available

**Right Position:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Right"))
```

**Use when:** Vertical space is abundant, horizontal space is limited

**Left Position:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Left"))
```

**Use when:** Right side needed for other content, left sidebar available

### Complete Position Example

**Controller:**
```csharp
public ActionResult PositionedLegend()
{
    ViewBag.Filter1 = new[]
    {
        new { resistance = 0.85, reactance = 0.15 },
        new { resistance = 0.75, reactance = 0.45 },
        new { resistance = 0.60, reactance = 0.70 }
    };
    
    ViewBag.Filter2 = new[]
    {
        new { resistance = 0.70, reactance = -0.55 },
        new { resistance = 0.85, reactance = -0.30 },
        new { resistance = 0.95, reactance = -0.15 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Width("900px")
    .Height("700px")
    .Title(t => t.Text("Filter Response Comparison"))
    .Series(series =>
    {
        series.Name("Low-Pass Filter")
              .Fill("#28a745")
              .Width(2)
              .Points(ViewBag.Filter1)
              .Add();
        
        series.Name("High-Pass Filter")
              .Fill("#007bff")
              .Width(2)
              .Points(ViewBag.Filter2)
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Right"))
    .Render()
```

## Custom Positioning

Place the legend at specific coordinates using custom position mode.

### Using Custom Position

```cshtml
@Html.EJS().Smithchart("smithchart")
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Custom")
        .Location(location => location.X(100).Y(50)))
    .Series(series =>
    {
        series.Points(ViewBag.Data).Name("Series").Add();
    })
    .Render()
```

**Coordinate System:**
- **X**: Horizontal position in pixels from left edge
- **Y**: Vertical position in pixels from top edge
- Origin (0, 0) is top-left corner of the chart container

### Custom Position Examples

**Top-Right Corner:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Custom")
    .Location(location => location.X(700).Y(20)))
```

**Center-Top:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Custom")
    .Location(location => location.X(400).Y(10)))
```

**Inside Chart Area (Overlay):**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Custom")
    .Location(location => location.X(50).Y(100)))
```

**Use when:** Precise legend placement required, maximizing chart area, creating custom layouts

### Complete Custom Position Example

```cshtml
@Html.EJS().Smithchart("customLegendChart")
    .Width("1000px")
    .Height("800px")
    .Title(t => t.Text("Custom Legend Positioning"))
    .Series(series =>
    {
        series.Points(ViewBag.Series1).Name("Configuration A").Fill("#FF6347").Add();
        series.Points(ViewBag.Series2).Name("Configuration B").Fill("#4169E1").Add();
        series.Points(ViewBag.Series3).Name("Configuration C").Fill("#32CD32").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Custom")
        .Location(location => location.X(800).Y(50))
        .Border(border => border.Width(1).Color("#d3d3d3")))
    .Render()
```

## Legend Alignment

Control how the legend aligns within its position (horizontal alignment for top/bottom, vertical for left/right).

### Alignment Options

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Bottom")
    .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Center))
```

**Alignment Values:**
- **Near** - Align to start (left for horizontal, top for vertical)
- **Center** - Align to center (default)
- **Far** - Align to end (right for horizontal, bottom for vertical)

### Horizontal Alignment (Top/Bottom Position)

**Center (Default):**
```cshtml
.LegendSettings(legend => legend
    .Position("Bottom")
    .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Center))
```

**Left-Aligned:**
```cshtml
.LegendSettings(legend => legend
    .Position("Bottom")
    .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Near))
```

**Right-Aligned:**
```cshtml
.LegendSettings(legend => legend
    .Position("Bottom")
    .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Far))
```

### Vertical Alignment (Left/Right Position)

**Center (Default):**
```cshtml
.LegendSettings(legend => legend
    .Position("Right")
    .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Center))
```

**Top-Aligned:**
```cshtml
.LegendSettings(legend => legend
    .Position("Right")
    .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Near))
```

**Bottom-Aligned:**
```cshtml
.LegendSettings(legend => legend
    .Position("Right")
    .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Far))
```

### Alignment Example

```cshtml
@Html.EJS().Smithchart("alignedLegend")
    .Width("900px")
    .Height("600px")
    .Series(series =>
    {
        series.Points(ViewBag.Data1).Name("Primary").Fill("#e74c3c").Add();
        series.Points(ViewBag.Data2).Name("Secondary").Fill("#3498db").Add();
        series.Points(ViewBag.Data3).Name("Tertiary").Fill("#2ecc71").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Near))  // Left-aligned
    .Render()
```

## Legend Shape

Customize the symbol shape displayed next to each series name.

### Available Shapes

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Shape("Circle"))
```

**Shape Options:**
- **Circle** - Circular symbol (default)
- **Rectangle** - Rectangular symbol
- **Triangle** - Triangular symbol
- **Diamond** - Diamond symbol
- **Cross** - Cross/plus symbol
- **HorizontalLine** - Horizontal line
- **VerticalLine** - Vertical line
- **Pentagon** - Pentagon symbol
- **InvertedTriangle** - Upside-down triangle
- **Image** - Custom image (requires image URL)

### Shape Examples

**Rectangle Shape:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Shape("Rectangle"))
```

**Triangle Shape:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Shape("Triangle"))
```

**Diamond Shape:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Shape("Diamond"))
```

### Complete Shape Example

```cshtml
@Html.EJS().Smithchart("shapeDemo")
    .Width("800px")
    .Height("600px")
    .Series(series =>
    {
        series.Points(ViewBag.CircuitA).Name("Circuit A").Fill("#FF6347").Add();
        series.Points(ViewBag.CircuitB).Name("Circuit B").Fill("#4169E1").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .Shape("Diamond")
        .ShapeWidth(15)
        .ShapeHeight(15))
    .Render()
```

**Note:** Legend shape applies to all series. For per-series shapes, use marker shapes instead.

## Legend Size

Control the dimensions of the legend container.

### Default Sizing

By default, the legend takes:
- **20-25% of chart height** when positioned top or bottom
- **20-25% of chart width** when positioned left or right

### Custom Size

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Width("200px")
    .Height("100px"))
```

**Size Options:**
- **Pixels:** `"200px"`, `"150px"`
- **Percentage:** `"30%"`, `"25%"`

### Size Examples

**Fixed Pixel Size:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Right")
    .Width("180px")
    .Height("300px"))
```

**Percentage-Based:**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Bottom")
    .Width("80%")
    .Height("15%"))
```

**Narrow Legend (Compact):**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position("Right")
    .Width("120px"))  // Height auto-calculates
```

### Complete Size Example

```cshtml
@Html.EJS().Smithchart("sizedLegend")
    .Width("1000px")
    .Height("700px")
    .Series(series =>
    {
        series.Points(ViewBag.Data1).Name("Measurement Set 1").Add();
        series.Points(ViewBag.Data2).Name("Measurement Set 2").Add();
        series.Points(ViewBag.Data3).Name("Measurement Set 3").Add();
        series.Points(ViewBag.Data4).Name("Measurement Set 4").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Right")
        .Width("250px")    // Wide enough for long names
        .Height("400px"))
    .Render()
```

## Padding Configuration

Adjust spacing within and between legend items.

### Padding Properties

**ItemPadding** - Space between legend items:
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ItemPadding(20))  // 20px between items
```

**ShapePadding** - Space between legend shape and text:
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ShapePadding(10))  // 10px between shape and label
```

### Padding Examples

**Compact Legend (Minimal Spacing):**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ItemPadding(8)
    .ShapePadding(5))
```

**Spacious Legend (Generous Spacing):**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ItemPadding(25)
    .ShapePadding(15))
```

**Default Spacing (Balanced):**
```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ItemPadding(15)
    .ShapePadding(8))
```

### Complete Padding Example

```cshtml
@Html.EJS().Smithchart("paddedLegend")
    .Width("900px")
    .Height("600px")
    .Series(series =>
    {
        series.Points(ViewBag.Series1).Name("50Ω Transmission Line").Add();
        series.Points(ViewBag.Series2).Name("75Ω Transmission Line").Add();
        series.Points(ViewBag.Series3).Name("100Ω Transmission Line").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .ItemPadding(20)       // Comfortable spacing between items
        .ShapePadding(12)      // Good separation of shape and text
        .ShapeWidth(12)
        .ShapeHeight(12))
    .Render()
```

## Toggle Visibility

Enable interactive series toggling by clicking legend items.

### Enabling Toggle

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ToggleVisibility(true))  // Enable click-to-toggle (default: true)
```

**Behavior:**
- Click legend item → Hide/show corresponding series
- Series name appears dimmed when hidden
- Helps focus on specific series in multi-series charts

### Toggle Visibility Example

```cshtml
@Html.EJS().Smithchart("toggleChart")
    .Width("900px")
    .Height("700px")
    .Title(t => t.Text("Click Legend Items to Toggle Series"))
    .Series(series =>
    {
        series.Points(ViewBag.Config1)
              .Name("Configuration 1")
              .Fill("#e74c3c")
              .Width(2)
              .Add();
        
        series.Points(ViewBag.Config2)
              .Name("Configuration 2")
              .Fill("#3498db")
              .Width(2)
              .Add();
        
        series.Points(ViewBag.Config3)
              .Name("Configuration 3")
              .Fill("#2ecc71")
              .Width(2)
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .ToggleVisibility(true)     // Enable toggling
        .Position("Bottom"))
    .Render()

<div style="margin-top: 10px; color: #666;">
    <p><strong>Tip:</strong> Click on legend items to show/hide series for easier comparison.</p>
</div>
```

**Use Cases:**
- Comparing specific series pairs
- Focusing on single series in crowded charts
- Interactive data exploration
- Educational demonstrations

### Disabling Toggle

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ToggleVisibility(false))  // Disable click interaction
```

**When to disable:**
- Static charts for reports/documents
- All series must remain visible
- Preventing accidental hiding

## Complete Examples

### Example 1: Fully Customized Legend

```cshtml
@Html.EJS().Smithchart("fullyCustomLegend")
    .Width("1000px")
    .Height("750px")
    .Title(t => t.Text("Antenna Impedance Analysis with Custom Legend"))
    .Series(series =>
    {
        series.Name("Dipole Antenna")
              .Fill("#FF6347")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Points(ViewBag.Antenna1)
              .Add();
        
        series.Name("Patch Antenna")
              .Fill("#4169E1")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Points(ViewBag.Antenna2)
              .Add();
        
        series.Name("Helical Antenna")
              .Fill("#32CD32")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Points(ViewBag.Antenna3)
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Right")
        .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Center)
        .Shape("Diamond")
        .ShapeWidth(14)
        .ShapeHeight(14)
        .Width("200px")
        .ItemPadding(18)
        .ShapePadding(10)
        .ToggleVisibility(true)
        .Border(border => border.Width(1).Color("#cccccc"))
        .TextStyle(new {
            size = "13px",
            fontFamily = "Arial",
            fontWeight = "600",
            color = "#333"}))
    .Render()
```

### Example 2: Minimalist Legend

```cshtml
@Html.EJS().Smithchart("minimalLegend")
    .Width("700px")
    .Height("600px")
    .Series(series =>
    {
        series.Points(ViewBag.Data1).Name("Primary").Fill("#e74c3c").Add();
        series.Points(ViewBag.Data2).Name("Secondary").Fill("#3498db").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .Shape("Circle")
        .ShapeWidth(8)
        .ShapeHeight(8)
        .ItemPadding(15)
        .ShapePadding(6)
        .TextStyle(new { size = "12px", color = "#666"}))
    .Render()
```

### Example 3: Technical Documentation Legend

```cshtml
@Html.EJS().Smithchart("documentationChart")
    .Width("800px")
    .Height("800px")
    .Background("#ffffff")
    .Title(t => t
        .Text("Filter Performance Comparison")
        .TextStyle(new {
            fontFamily = "Times New Roman",
            size = "16px",
            fontWeight = "bold"}))
    .Series(series =>
    {
        series.Points(ViewBag.FilterA).Name("Butterworth").Fill("#000000").Width(2).Add();
        series.Points(ViewBag.FilterB).Name("Chebyshev").Fill("#666666").Width(2).Add();
        series.Points(ViewBag.FilterC).Name("Elliptic").Fill("#333333").Width(2).Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Center)
        .Shape("HorizontalLine")
        .ShapeWidth(25)
        .ShapeHeight(3)
        .ItemPadding(20)
        .ShapePadding(10)
        .ToggleVisibility(false)
        .Border(border => border.Width(1).Color("#000000"))
        .TextStyle(new {
            fontFamily = "Times New Roman",
            size = "12px",
            color = "#000000"}))
    .Render()
```

## Best Practices

### Positioning

1. **Bottom Position** - Best for most use cases
   - Doesn't interfere with title
   - Natural reading flow (chart then legend)
   - Works well with multiple series

2. **Right Position** - Use when:
   - Chart is wider than tall
   - Many series with long names
   - Vertical space is abundant

3. **Custom Position** - Use when:
   - Specific layout requirements
   - Overlaying on chart (with caution)
   - Maximizing chart area

### Naming

- Use descriptive series names: "50Ω Coax Cable" not "Series1"
- Keep names concise (2-4 words ideal)
- Include units or key identifiers
- Avoid abbreviations unless commonly understood

### Styling

- Match legend style to overall chart theme
- Use consistent font families throughout
- Ensure text-to-background contrast meets WCAG standards
- Consider colorblind-friendly shape/color combinations

### Interaction

- Enable toggle visibility for exploration charts
- Disable toggle for static reports and documentation
- Provide instructions when toggle is enabled
- Test toggle behavior with all series combinations

### Accessibility

- Sufficient color contrast for legend text (minimum 4.5:1)
- Large enough touch targets for mobile (minimum 44x44px)
- Clear visual distinction between enabled/disabled states
- Consider screen reader compatibility with descriptive names
