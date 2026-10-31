# Markers and Data Labels in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Markers](#markers)
- [Enabling Markers](#enabling-markers)
  - [Basic Marker Example](#basic-marker-example)
- [Marker Customization](#marker-customization)
  - [Marker Properties](#marker-properties)
  - [Width and Height](#width-and-height)
  - [Marker Fill Color](#marker-fill-color)
  - [Marker Opacity](#marker-opacity)
  - [Shape](#shape)
  - [Marker Border](#marker-border)
  - [Complete Marker Customization](#complete-marker-customization)
  - [Per-Series Marker Differentiation](#per-series-marker-differentiation)
- [Data Labels](#data-labels)
- [Enabling Data Labels](#enabling-data-labels)
  - [Basic Data Label Example](#basic-data-label-example)
- [Data Label Customization](#data-label-customization)
  - [Data Label Properties](#data-label-properties)
  - [Fill Color](#fill-color)
  - [Opacity](#opacity)
  - [Border](#border)
  - [Text Style](#text-style)
  - [Complete Data Label Customization](#complete-data-label-customization)
- [Combined Usage](#combined-usage)
  - [Markers + Data Labels Example](#markers--data-labels-example)
  - [Multi-Series with Labels](#multi-series-with-labels)
- [Complete Examples](#complete-examples)
  - [Example 1: Technical Measurement Chart](#example-1-technical-measurement-chart)
  - [Example 2: Colorful Presentation Chart](#example-2-colorful-presentation-chart)
  - [Example 3: Publication Chart (Black and White)](#example-3-publication-chart-black-and-white)
- [Best Practices](#best-practices)
  - [Marker Usage](#marker-usage)
  - [Data Label Usage](#data-label-usage)
  - [Smart Labels](#smart-labels)
  - [Color Coordination](#color-coordination)
  - [Size Recommendations](#size-recommendations)
  - [Performance](#performance)
  - [Accessibility](#accessibility)

## Overview

Markers and data labels enhance Smith Charts by:
- **Markers** - Visual symbols at each data point for precise location identification
- **Data Labels** - Text displaying actual values next to data points

Both features are disabled by default and can be customized per series.

## Markers

Markers are shapes placed at each data point on the series line, making individual measurements easy to identify and distinguish.

## Enabling Markers

By default, markers are hidden. Enable them per series:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Name("Transmission Line")
              .Marker(m => m.Visible(true))  // Enable markers
              .Points(ViewBag.Data)
              .Add();
    })
    .Render()
```

### Basic Marker Example

**Controller:**
```csharp
public ActionResult BasicMarkers()
{
    ViewBag.ImpedanceData = new[]
    {
        new { resistance = 0.15, reactance = 0.0 },
        new { resistance = 0.25, reactance = 0.25 },
        new { resistance = 0.50, reactance = 0.50 },
        new { resistance = 0.75, reactance = 0.75 },
        new { resistance = 1.00, reactance = 1.00 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("markerChart")
    .Series(series =>
    {
        series.Name("Impedance Sweep")
              .Fill("#FF6347")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Points(ViewBag.ImpedanceData)
              .Add();
    })
    .Render()
```

## Marker Customization

Customize marker appearance individually for each series.

### Marker Properties

**Available customization options:**
- **Width** - Marker width in pixels
- **Height** - Marker height in pixels
- **Fill** - Marker fill color
- **Opacity** - Marker transparency (0 to 1)
- **Shape** - Marker shape (Circle, Rectangle, Triangle, etc.)
- **Border** - Border width and color

### Width and Height

Control marker size:

```cshtml
.Marker(m => m
    .Visible(true)
    .Width(10)    // 10px wide
    .Height(10))  // 10px tall
```

**Size Guidelines:**
- **Small:** 6-8px - Subtle, many data points
- **Medium:** 10-12px - Standard visibility
- **Large:** 14-18px - Emphasis, few data points

### Marker Fill Color

Set marker fill color:

```cshtml
.Marker(m => m
    .Visible(true)
    .Fill("#FF6347"))  // Tomato red
```

**Color Options:**
- Named colors: `"red"`, `"blue"`, `"green"`
- Hex colors: `"#FF6347"`, `"#4169E1"`
- RGB: `"rgb(255, 99, 71)"`
- Transparent: `"transparent"` (outline only with border)

### Marker Opacity

Control marker transparency:

```cshtml
.Marker(m => m
    .Visible(true)
    .Fill("#FF6347")
    .Opacity(0.8))  // 80% opaque
```

### Shape

Choose from various marker shapes:

```cshtml
.Marker(m => m
    .Visible(true)
    .Shape("Circle"))
```

**Available Shapes:**
- **Circle** - Circular marker (default)
- **Rectangle** - Square/rectangular marker
- **Triangle** - Triangular marker
- **Diamond** - Diamond-shaped marker
- **Cross** - Plus/cross symbol
- **HorizontalLine** - Horizontal line
- **VerticalLine** - Vertical line
- **Pentagon** - Pentagon shape
- **InvertedTriangle** - Upside-down triangle

**Shape Selection Guide:**
- **Circle:** Default, general use, clean appearance
- **Diamond:** Distinguish from circular series
- **Triangle/InvertedTriangle:** Direction indication
- **Cross:** Highlight specific measurements
- **Rectangle:** Technical/grid-aligned data

### Marker Border

Add or customize marker borders:

```cshtml
.Marker(m => m
    .Visible(true)
    .Fill("#FF6347")
    .Border(b => b
        .Width(2)
        .Color("#FFFFFF")))
```

**Border enhances:**
- Marker visibility against busy backgrounds
- Distinction between overlapping markers
- Professional appearance

### Complete Marker Customization

```cshtml
@Html.EJS().Smithchart("customMarkerChart")
    .Series(series =>
    {
        series.Name("Antenna Impedance")
              .Fill("#4169E1")
              .Width(2)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Diamond")
                  .Width(12)
                  .Height(12)
                  .Fill("#FFD700")        // Gold
                  .Opacity(1.0)
                  .Border(b => b
                      .Width(2)
                      .Color("#FF6347")))  // Red border
              .Points(ViewBag.Data)
              .Add();
    })
    .Render()
```

### Per-Series Marker Differentiation

Use different markers for each series to enhance distinction:

**Controller:**
```csharp
public ActionResult MultipleMarkers()
{
    ViewBag.Series1 = new[]
    {
        new { resistance = 0.2, reactance = 0.2 },
        new { resistance = 0.5, reactance = 0.5 },
        new { resistance = 0.8, reactance = 0.8 }
    };
    
    ViewBag.Series2 = new[]
    {
        new { resistance = 0.3, reactance = 0.1 },
        new { resistance = 0.6, reactance = 0.3 },
        new { resistance = 0.9, reactance = 0.6 }
    };
    
    ViewBag.Series3 = new[]
    {
        new { resistance = 0.4, reactance = 0.0 },
        new { resistance = 0.7, reactance = 0.2 },
        new { resistance = 1.0, reactance = 0.4 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("multiMarkerChart")
    .Title(t => t.Text("Multi-Series with Distinct Markers"))
    .Series(series =>
    {
        // Series 1: Circle markers
        series.Name("Configuration A")
              .Fill("#e74c3c")
              .Width(2)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Circle")
                  .Width(10)
                  .Height(10)
                  .Fill("#e74c3c"))
              .Points(ViewBag.Series1)
              .Add();
        
        // Series 2: Diamond markers
        series.Name("Configuration B")
              .Fill("#3498db")
              .Width(2)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Diamond")
                  .Width(10)
                  .Height(10)
                  .Fill("#3498db"))
              .Points(ViewBag.Series2)
              .Add();
        
        // Series 3: Triangle markers
        series.Name("Configuration C")
              .Fill("#2ecc71")
              .Width(2)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Triangle")
                  .Width(10)
                  .Height(10)
                  .Fill("#2ecc71"))
              .Points(ViewBag.Series3)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Render()
```

## Data Labels

Data labels display the actual resistance and reactance values next to each data point.

## Enabling Data Labels

Data labels are hidden by default. Enable them through marker settings:

```cshtml
.Marker(m => m
    .Visible(true)
    .DataLabel(dl => dl.Visible(true)))
```

**Note:** Data labels are configured within the Marker settings, even though they're separate visual elements.

### Basic Data Label Example

```cshtml
@Html.EJS().Smithchart("dataLabelChart")
    .Series(series =>
    {
        series.Name("Measurement Points")
              .Marker(m => m
                  .Visible(true)
                  .DataLabel(dl => dl.Visible(true)))
              .Points(ViewBag.Data)
              .Add();
    })
    .Render()
```

## Data Label Customization

Customize data label appearance per series.

### Data Label Properties

**Available options:**
- **Fill** - Background color of data label
- **Opacity** - Label transparency
- **Border** - Border width and color
- **TextStyle** - Font size, family, color, weight

### Fill Color

Set data label background color:

```cshtml
.Marker(m => m
    .Visible(true)
    .DataLabel(dl => dl
        .Visible(true)
        .Fill("#FFFFFF")))  // White background
```

### Opacity

Control label transparency:

```cshtml
.Marker(m => m
    .Visible(true)
    .DataLabel(dl => dl
        .Visible(true)
        .Fill("#FFFFFF")
        .Opacity(0.9)))  // Slightly transparent
```

### Border

Add borders to data labels:

```cshtml
.Marker(m => m
    .Visible(true)
    .DataLabel(dl => dl
        .Visible(true)
        .Fill("#FFFFFF")
        .Border(b => b
            .Width(1)
            .Color("#333333"))))
```

### Text Style

Customize label text appearance:

```cshtml
.Marker(m => m
    .Visible(true)
    .DataLabel(dl => dl
        .Visible(true)
        .TextStyle(new {
            size = "11px",
            fontFamily = "Arial",
            fontWeight = "600",
            color = "#333333"})))
```

**TextStyle Properties:**
- **Size** - Font size (e.g., "10px", "12px")
- **FontFamily** - Font name
- **FontWeight** - "normal", "bold", "600", "700"
- **Color** - Text color

### Complete Data Label Customization

```cshtml
@Html.EJS().Smithchart("customLabelChart")
    .Series(series =>
    {
        series.Name("Calibrated Measurements")
              .Fill("#4169E1")
              .Width(2)
              .EnableSmartLabels(true)  // Prevent overlap
              .Marker(m => m
                  .Visible(true)
                  .Width(8)
                  .Height(8)
                  .DataLabel(dl => dl
                      .Visible(true)
                      .Fill("#FFF8DC")        // Cornsilk background
                      .Opacity(0.95)
                      .Border(b => b
                          .Width(1)
                          .Color("#4169E1"))
                      .TextStyle(new {
                          size ="10px",
                          fontFamily = "Consolas",
                          fontWeight = "bold",
                          color = "#2c3e50" })))
              .Points(ViewBag.PrecisionData)
              .Add();
    })
    .Render()
```

## Combined Usage

Use markers and data labels together for maximum information density.

### Markers + Data Labels Example

```cshtml
@Html.EJS().Smithchart("combinedChart")
    .Width("900px")
    .Height("700px")
    .Title(t => t.Text("Filter Response with Detailed Annotations"))
    .Series(series =>
    {
        series.Name("Measured Response")
              .Fill("#e74c3c")
              .Width(3)
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Circle")
                  .Width(10)
                  .Height(10)
                  .Fill("#ffffff")
                  .Border(b => b
                      .Width(3)
                      .Color("#e74c3c"))
                  .DataLabel(dl => dl
                      .Visible(true)
                      .Fill("#ffffff")
                      .Opacity(0.9)
                      .Border(b => b
                          .Width(1)
                          .Color("#cccccc"))
                      .TextStyle(new {
                          size = "10px",
                          color = "#333"})))
              .Points(ViewBag.FilterData)
              .Add();
    })
    .Render()
```

### Multi-Series with Labels

**Controller:**
```csharp
public ActionResult ComparisonWithLabels()
{
    ViewBag.BeforeOptimization = new[]
    {
        new { resistance = 0.5, reactance = 0.8 },
        new { resistance = 0.7, reactance = 1.0 },
        new { resistance = 1.0, reactance = 1.3 }
    };
    
    ViewBag.AfterOptimization = new[]
    {
        new { resistance = 0.9, reactance = 0.1 },
        new { resistance = 1.0, reactance = 0.05 },
        new { resistance = 1.1, reactance = 0.02 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("comparisonChart")
    .Width("1000px")
    .Height("750px")
    .Title(t => t.Text("Impedance Matching: Before and After"))
    .Series(series =>
    {
        // Before: Red with triangular markers
        series.Name("Before Matching")
              .Fill("#dc3545")
              .Width(3)
              .Opacity(0.7)
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Cross")
                  .Width(12)
                  .Height(12)
                  .Fill("#dc3545")
                  .DataLabel(dl => dl
                      .Visible(true)
                      .Fill("#ffe6e6")
                      .TextStyle(new {
                          size = "11px",
                          fontWeight = "bold",
                          color = "#dc3545"})))
                 .Points(ViewBag.BeforeOptimization)
              .Add();
        
        // After: Green with circular markers
        series.Name("After Matching")
              .Fill("#28a745")
              .Width(3)
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Shape(Syncfusion.EJ2.Charts.Shape.Circle)
                  .Width(12)
                  .Height(12)
                  .Fill("#28a745")
                  .DataLabel(dl => dl
                      .Visible(true)
                      .Fill("#e6ffe6")
                      .TextStyle(new {
                          size = "11px",
                          fontWeight = "bold",
                          color = "#28a745"})))
                  .Points(ViewBag.AfterOptimization)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true).Position("Bottom"))
    .Render()
```

## Complete Examples

### Example 1: Technical Measurement Chart

Precise measurements with detailed annotations:

```cshtml
@Html.EJS().Smithchart("technicalMeasurement")
    .Width("1000px")
    .Height("800px")
    .Title(t => t.Text("VNA Measurement: Antenna S11").Visible(true))
    .Series(series =>
    {
        series.Name("S11 Measurement")
              .Fill("#2c3e50")
              .Width(2)
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Diamond")
                  .Width(10)
                  .Height(10)
                  .Fill("#3498db")
                  .Border(b => b.Width(2).Color("#2c3e50"))
                  .DataLabel(dl => dl
                      .Visible(true)
                      .Fill("#ecf0f1")
                      .Opacity(0.95)
                      .Border(b => b.Width(1).Color("#95a5a6"))
                      .TextStyle(new {
                          size = "10px",
                          fontFamily = "Consolas",
                          fontWeight = "600",
                          color = "#2c3e50"})))
              .Points(ViewBag.VNAData)
              .Add();
    })
    .Render()
```

### Example 2: Colorful Presentation Chart

Eye-catching design for presentations:

```cshtml
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px;">
    @Html.EJS().Smithchart("presentationChart")
        .Width("900px")
        .Height("700px")
        .Background("transparent")
        .Title(t => t
            .Text("RF Circuit Performance")
            .TextStyle(ts => ts.Color("#ffffff").Size("18px").FontWeight("bold")))
        .Series(series =>
        {
            series.Name("Performance Metrics")
                  .Fill("#ffffff")
                  .Width(4)
                  .Opacity(0.9)
                  .Marker(m => m
                      .Visible(true)
                      .Shape("Circle")
                      .Width(16)
                      .Height(16)
                      .Fill("#ffd700")       // Gold
                      .Border(b => b.Width(3).Color("#ffffff"))
                      .DataLabel(dl => dl
                          .Visible(true)
                          .Fill("#ffffff")
                          .Opacity(1.0)
                          .Border(b => b.Width(2).Color("#ffd700"))
                          .TextStyle(new {
                              size = "12px",
                              fontWeight = "bold",
                              color = "#667eea"})))
                  .Points(ViewBag.CircuitData)
                  .Add();
        })
        .Render()
</div>
```

### Example 3: Publication Chart (Black and White)

Optimized for academic papers and technical documents:

```cshtml
@Html.EJS().Smithchart("publicationChart")
    .Width("800px")
    .Height("800px")
    .Background("#ffffff")
    .Title(t => t
        .Text("Measured Impedance Data")
        .TextStyle(new {
            fontFamily = "Times New Roman",
            size = "14px",
            fontWeight = "bold",
            color = "#000000"}))
    .Series(series =>
    {
        series.Name("Experimental Data")
              .Fill("#000000")
              .Width(2)
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Circle")
                  .Width(8)
                  .Height(8)
                  .Fill("#000000")
                  .Border(b => b.Width(2).Color("#ffffff"))
                  .DataLabel(dl => dl
                      .Visible(true)
                      .Fill("#ffffff")
                      .Border(b => b.Width(1).Color("#000000"))
                      .TextStyle(new {
                          fontFamily = "Times New Roman",
                          size = "9px",
                          color = "#000000"})))
              .Points(ViewBag.MeasuredData)
              .Add();
    })
    .Render()
```

## Best Practices

### Marker Usage

**When to use markers:**
- Few data points (< 20 per series)
- Need to identify specific measurements
- Comparing multiple series
- Interactive exploration required

**When to avoid markers:**
- Dense data (> 50 points per series)
- Focus on trend rather than individual points
- Minimalist design preferred
- Performance considerations

### Data Label Usage

**When to use data labels:**
- Precise values needed
- Few data points (< 10 per series)
- Presentation or reports
- Educational materials

**When to avoid data labels:**
- Many data points (causes clutter)
- Values readable from gridlines
- Interactive tooltips available
- Print space limited

### Smart Labels

Always enable smart labels when using data labels:

```cshtml
.EnableSmartLabels(true)
```

**Benefits:**
- Prevents overlapping labels
- Automatically adjusts label positions
- Maintains readability
- Essential for dense data

### Color Coordination

**Match markers to series:**
```cshtml
.Fill("#FF6347")              // Series color
.Marker(m => m
    .Fill("#FF6347"))          // Same color for marker
```

**Contrasting markers:**
```cshtml
.Fill("#2c3e50")              // Dark series
.Marker(m => m
    .Fill("#ffffff")           // White marker for contrast
    .Border(b => b
        .Width(2)
        .Color("#2c3e50")))    // Dark border
```

### Size Recommendations

**Markers:**
- Small charts (< 500px): 6-8px
- Medium charts (500-800px): 8-12px
- Large charts (> 800px): 10-14px
- Presentation: 12-18px

**Data Labels:**
- Body text: 10-11px
- Emphasis: 12-13px
- Presentation: 13-15px

### Performance

**Optimize for many points:**
- Disable data labels if > 20 points
- Use smaller markers (6-8px)
- Consider selective marker display
- Test rendering performance

### Accessibility

- Sufficient marker size for visibility (minimum 8px)
- High contrast between marker and background
- Data labels with readable font size (minimum 10px)
- Test with colorblind simulation tools
