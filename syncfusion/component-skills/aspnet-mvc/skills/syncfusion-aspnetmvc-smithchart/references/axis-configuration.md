# Axis Configuration in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Axis Types](#axis-types)
  - [Horizontal Axis](#horizontal-axis)
  - [Radial Axis](#radial-axis)
- [Label Customization](#label-customization)
  - [Label Position](#label-position)
  - [Label Intersection Action](#label-intersection-action)
  - [Label Style](#label-style)
  - [Complete Label Example](#complete-label-example)
- [Gridlines Configuration](#gridlines-configuration)
  - [Gridline Properties](#gridline-properties)
- [Major Gridlines](#major-gridlines)
  - [Horizontal Axis Major Gridlines](#horizontal-axis-major-gridlines)
  - [Radial Axis Major Gridlines](#radial-axis-major-gridlines)
  - [Customizing Major Gridline Appearance](#customizing-major-gridline-appearance)
  - [DashArray Patterns](#dasharray-patterns)
- [Minor Gridlines](#minor-gridlines)
  - [Configuring Minor Gridlines](#configuring-minor-gridlines)
  - [Minor Gridline Count](#minor-gridline-count)
  - [Styling Minor Gridlines](#styling-minor-gridlines)
- [Axis Line Customization](#axis-line-customization)
  - [Horizontal Axis Line](#horizontal-axis-line)
  - [Radial Axis Line](#radial-axis-line)
  - [Axis Line Styles](#axis-line-styles)
- [Complete Configuration Examples](#complete-configuration-examples)
  - [Example 1 Standard Technical Chart](#example-1-standard-technical-chart)
  - [Example 2 High-Contrast Dark Theme](#example-2-high-contrast-dark-theme)
  - [Example 3 Minimal Clean Chart](#example-3-minimal-clean-chart)
  - [Example 4 Detailed Engineering Chart](#example-4-detailed-engineering-chart)
  - [Example 5 Publication-Ready Chart](#example-5-publication-ready-chart)
- [Best Practices](#best-practices)
  - [Visual Clarity](#visual-clarity)
  - [Performance](#performance)
  - [Accessibility](#accessibility)
  - [Responsive Design](#responsive-design)
  - [Printing and Export](#printing-and-export)

## Overview

The Smith Chart uses two types of axes to create its characteristic circular grid:

- **Horizontal Axis** - Drawn as a straight line across the horizontal diameter
- **Radial Axis** - Drawn as circular paths from the center

Both axes support extensive customization including labels, gridlines (major and minor), and axis line appearance. Proper axis configuration enhances readability and helps users interpret impedance/admittance data accurately.

## Axis Types

### Horizontal Axis

The horizontal axis represents constant resistance circles in the Smith Chart.

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h.Visible(true)
        // Horizontal axis configuration
    )
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Characteristics:**
- Straight line through the center horizontally
- Labels typically positioned outside the chart
- Major gridlines appear as vertical circles
- Represents real part of impedance (resistance)

### Radial Axis

The radial axis represents constant reactance circles in the Smith Chart.

```cshtml
@Html.EJS().Smithchart("smithchart")
    .RadialAxis(r => r.Visible(true)
        // Radial axis configuration
    )
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Characteristics:**
- Circular paths radiating from center
- Labels positioned along the circular paths
- Major gridlines appear as arcs
- Represents imaginary part of impedance (reactance)

## Label Customization

### Label Position

Control where labels appear relative to the axis line:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside))  // or Inside
    .RadialAxis(r => r
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Options:**
- `Outside` - Labels appear outside the axis line (default, recommended)
- `Inside` - Labels appear inside the axis line (use for compact layouts)

**When to use:**
- **Outside:** Standard charts, maximum readability, plenty of space
- **Inside:** Compact displays, embedded charts, space-constrained layouts

### Label Intersection Action

Handle overlapping labels automatically:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide))
    .RadialAxis(r => r
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Options:**
- `None` - Display all labels (may overlap)
- `Hide` - Hide labels that would overlap

**Recommendation:** Use `Hide` for clean appearance, especially with many gridlines.

### Label Style

Customize label font properties:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h
        .LabelStyle(ls => ls
            .Size("12px")
            .FontFamily("Arial")
            .FontWeight("600")
            .Color("#333333")
            .Opacity(1)))
    .RadialAxis(r => r
        .LabelStyle(ls => ls
            .Size("12px")
            .FontFamily("Arial")
            .FontWeight("600")
            .Color("#333333")
            .Opacity(1)))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Properties:**
- **Size** - Font size (e.g., "10px", "12px", "14px")
- **FontFamily** - Font name (e.g., "Arial", "Segoe UI", "Roboto")
- **FontWeight** - Weight (e.g., "normal", "bold", "600", "700")
- **Color** - Text color (hex, rgb, or color name)
- **Opacity** - Transparency (0 to 1)

### Complete Label Example

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Width("800px")
    .Height("600px")
    .HorizontalAxis(h => h
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("13px")
            .FontFamily("Segoe UI")
            .FontWeight("bold")
            .Color("#2c3e50")))
    .RadialAxis(r => r
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("13px")
            .FontFamily("Segoe UI")
            .FontWeight("bold")
            .Color("#2c3e50")))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

## Gridlines Configuration

Gridlines help users read values accurately from the Smith Chart. Both major and minor gridlines can be customized independently for each axis.

### Gridline Properties

**Common properties for both major and minor gridlines:**

- **Visible** - Show or hide gridlines
- **Width** - Line thickness in pixels
- **DashArray** - Dash pattern for dashed lines
- **Opacity** - Transparency (0 to 1)

**Additional for minor gridlines:**
- **Count** - Number of minor gridlines between major gridlines

## Major Gridlines

Major gridlines align with axis labels and provide primary reference points.

### Horizontal Axis Major Gridlines

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .DashArray("")
            .Opacity(1)))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Radial Axis Major Gridlines

```cshtml
@Html.EJS().Smithchart("smithchart")
    .RadialAxis(r => r
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .DashArray("")
            .Opacity(1)))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Customizing Major Gridline Appearance

**Solid Lines (Default):**
```cshtml
.MajorGridLines(mg => mg
    .Visible(true)
    .Width(1)
    .Opacity(1))
```

**Dashed Lines:**
```cshtml
.MajorGridLines(mg => mg
    .Visible(true)
    .Width(1)
    .DashArray("5,5")      // 5px dash, 5px gap
    .Opacity(0.8))
```

**Thick Solid Lines:**
```cshtml
.MajorGridLines(mg => mg
    .Visible(true)
    .Width(2)
    .Opacity(1))
```

**Subtle Transparent Lines:**
```cshtml
.MajorGridLines(mg => mg
    .Visible(true)
    .Width(1)
    .Opacity(0.3))
```

### DashArray Patterns

The `DashArray` property uses a comma-separated pattern of dash and gap lengths:

```cshtml
.DashArray("")           // Solid line (default)
.DashArray("5,5")        // Equal dash and gap
.DashArray("10,5")       // Long dash, short gap
.DashArray("5,5,1,5")    // Dash, gap, dot, gap (Morse code style)
.DashArray("10,5,5,5")   // Long dash, short dash pattern
```

**Visual Guide:**
- `"5,5"` - Short dashes: `-----  -----  -----`
- `"10,5"` - Medium dashes: `----------  ----------`
- `"10,2"` - Long dashes with small gaps: `----------  ----------`
- `"2,3"` - Dotted: `--   --   --`

## Minor Gridlines

Minor gridlines provide additional reference points between major gridlines.

### Configuring Minor Gridlines

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .DashArray("3,3")
            .Count(4)))           // 4 minor gridlines between each major gridline
    .RadialAxis(r => r
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .DashArray("3,3")
            .Count(4)))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Minor Gridline Count

The `Count` property determines how many minor gridlines appear between major gridlines:

```cshtml
// High detail: 8 minor gridlines
.MinorGridLines(mg => mg.Visible(true).Count(8))

// Medium detail: 4 minor gridlines (recommended)
.MinorGridLines(mg => mg.Visible(true).Count(4))

// Low detail: 2 minor gridlines
.MinorGridLines(mg => mg.Visible(true).Count(2))

// No minor gridlines
.MinorGridLines(mg => mg.Visible(false))
```

**Recommendations:**
- **2-3:** Minimal detail, clean appearance
- **4-5:** Balanced detail (recommended for most uses)
- **6-8:** High detail, technical analysis
- **>8:** Cluttered, avoid unless necessary

### Styling Minor Gridlines

**Subtle Dashed (Recommended):**
```cshtml
.MinorGridLines(mg => mg
    .Visible(true)
    .Width(1)
    .DashArray("3,3")
    .Count(4))
```

**Very Subtle:**
```cshtml
.MinorGridLines(mg => mg
    .Visible(true)
    .Width(1)
    .DashArray("2,4")
    .Count(3))
```

**Prominent Minor Lines:**
```cshtml
.MinorGridLines(mg => mg
    .Visible(true)
    .Width(1)
    .DashArray("5,5")
    .Count(5))
```

## Axis Line Customization

The axis line is the main line of each axis (horizontal center line and radial boundary).

### Horizontal Axis Line

```cshtml
@Html.EJS().Smithchart("smithchart")
    .HorizontalAxis(h => h
        .AxisLine(al => al
            .Visible(true)
            .Width(1)
            .DashArray("")))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Radial Axis Line

```cshtml
@Html.EJS().Smithchart("smithchart")
    .RadialAxis(r => r
        .AxisLine(al => al
            .Visible(true)
            .Width(1)
            .DashArray("")))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Axis Line Styles

**Bold Solid Line:**
```cshtml
.AxisLine(al => al
    .Visible(true)
    .Width(2))
```

**Dashed Axis:**
```cshtml
.AxisLine(al => al
    .Visible(true)
    .Width(1)
    .DashArray("8,4"))
```

**Hidden Axis Line:**
```cshtml
.AxisLine(al => al.Visible(false))
```

**Use Case:** Hide axis lines when gridlines provide sufficient reference.

## Complete Configuration Examples

### Example 1: Standard Technical Chart

Clean, professional appearance for technical documentation:

**Controller:**
```csharp
public ActionResult TechnicalChart()
{
    ViewBag.ImpedanceData = new[]
    {
        new { resistance = 0.2, reactance = 0.2 },
        new { resistance = 0.5, reactance = 0.5 },
        new { resistance = 0.8, reactance = 0.8 },
        new { resistance = 1.0, reactance = 1.0 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("technicalChart")
    .Width("900px")
    .Height("700px")
    .Title(t => t.Text("Transmission Line Impedance Analysis").Visible(true))
    .HorizontalAxis(h => h
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("12px")
            .FontFamily("Arial")
            .FontWeight("600")
            .Color("#333"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .Opacity(0.7))
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .DashArray("3,3")
            .Count(4))
        .AxisLine(al => al
            .Visible(true)
            .Width(1)))
    .RadialAxis(r => r
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("12px")
            .FontFamily("Arial")
            .FontWeight("600")
            .Color("#333"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .Opacity(0.7))
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .DashArray("3,3")
            .Count(4))
        .AxisLine(al => al
            .Visible(true)
            .Width(1)))
    .Series(series => series        
        .Name("Test Data")
        .Fill("#FF6347")
        .Width(2)
        .Marker(m => m.Visible(true))
        .Points(ViewBag.ImpedanceData)
        .Add())
    .LegendSettings(legend => legend.Visible(true))
    .Render()
```

### Example 2: High-Contrast Dark Theme

For presentations and displays:

```cshtml
<div style="background-color: #1e1e1e; padding: 20px;">
    @Html.EJS().Smithchart("darkThemeChart")
        .Width("100%")
        .Height("600px")
        .Background("#1e1e1e")
        .HorizontalAxis(h => h
            .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
            .LabelStyle(ls => ls
                .Size("14px")
                .FontFamily("Consolas")
                .FontWeight("bold")
                .Color("#00ff00")
                .Opacity(0.9))
            .MajorGridLines(mg => mg
                .Visible(true)
                .Width(2)
                .Opacity(0.6))
            .MinorGridLines(mg => mg
                .Visible(true)
                .Width(1)
                .DashArray("4,4")
                .Count(5))
            .AxisLine(al => al
                .Visible(true)
                .Width(2)))
        .RadialAxis(r => r
            .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
            .LabelStyle(ls => ls
                .Size("14px")
                .FontFamily("Consolas")
                .FontWeight("bold")
                .Color("#00ff00")
                .Opacity(0.9))
            .MajorGridLines(mg => mg
                .Visible(true)
                .Width(2)
                .Opacity(0.6))
            .MinorGridLines(mg => mg
                .Visible(true)
                .Width(1)
                .DashArray("4,4")
                .Count(5))
            .AxisLine(al => al
                .Visible(true)
                .Width(2)))
        .Series(series => series            
            .Name("Signal")
            .Fill("#00ffff")
            .Width(3)
            .Marker(m => m
                .Visible(true)
                .Fill("#ffff00")
                .Width(10)
                .Height(10))
            .Points(ViewBag.Data)
            .Add())
        .Render()
</div>
```

### Example 3: Minimal Clean Chart

Simplified appearance for embedded use:

```cshtml
@Html.EJS().Smithchart("minimalChart")
    .Width("600px")
    .Height("600px")
    .HorizontalAxis(h => h
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("11px")
            .Color("#666"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .Opacity(0.5))
        .MinorGridLines(mg => mg.Visible(false))  // No minor gridlines
        .AxisLine(al => al
            .Visible(true)
            .Width(1)))
    .RadialAxis(r => r
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("11px")
            .Color("#666"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .Opacity(0.5))
        .MinorGridLines(mg => mg.Visible(false))
        .AxisLine(al => al
            .Visible(true)
            .Width(1)))
    .Series(series => series        
        .Fill("#4169E1")
        .Width(2)
        .Points(ViewBag.Data)
        .Add())
    .Render()
```

### Example 4: Detailed Engineering Chart

Maximum detail for precise measurements:

```cshtml
@Html.EJS().Smithchart("detailedChart")
    .Width("1000px")
    .Height("800px")
    .Title(t => t.Text("High-Resolution Impedance Measurement").Visible(true))
    .HorizontalAxis(h => h
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("11px")
            .FontFamily("Arial")
            .Color("#2c3e50"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1.5)
            .Opacity(0.8))
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(0.5)
            .DashArray("2,3")
            .Count(8))               // Many minor gridlines for precision
        .AxisLine(al => al
            .Visible(true)
            .Width(2)))
    .RadialAxis(r => r
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("11px")
            .FontFamily("Arial")
            .Color("#2c3e50"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1.5)
            .Opacity(0.8))
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(0.5)
            .DashArray("2,3")
            .Count(8))
        .AxisLine(al => al
            .Visible(true)
            .Width(2)))
    .Series(series => series
        .Name("Calibrated Measurement")
        .Fill("#e74c3c")
        .Width(2)
        .Marker(m => m
            .Visible(true)
            .Shape("Circle")
            .Width(6)
            .Height(6))        
        .Points(ViewBag.PrecisionData)
        .Add())
    .LegendSettings(legend => legend.Visible(true))
    .Render()
```

### Example 5: Publication-Ready Chart

Optimized for academic papers and reports:

```cshtml
@Html.EJS().Smithchart("publicationChart")
    .Width("800px")
    .Height("800px")
    .Background("#ffffff")
    .Title(t => t
        .Text("Antenna Input Impedance")
        .Visible(true)
        .TextStyle(new {
            size = "16px",
            fontWeight = "bold",
            fontFamily = "Times New Roman",
            color = "#000000"}))
    .HorizontalAxis(h => h
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("12px")
            .FontFamily("Times New Roman")
            .Color("#000000"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .Opacity(1.0))
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(0.5)
            .DashArray("2,2")
            .Count(4))
        .AxisLine(al => al
            .Visible(true)
            .Width(1.5)))
    .RadialAxis(r => r
        .LabelPosition(Syncfusion.EJ2.Charts.AxisLabelPosition.Outside)
        .LabelIntersectAction(Syncfusion.EJ2.Charts.SmithchartLabelIntersectAction.Hide)
        .LabelStyle(ls => ls
            .Size("12px")
            .FontFamily("Times New Roman")
            .Color("#000000"))
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .Opacity(1.0))
        .MinorGridLines(mg => mg
            .Visible(true)
            .Width(0.5)
            .DashArray("2,2")
            .Count(4))
        .AxisLine(al => al
            .Visible(true)
            .Width(1.5)))
    .Series(series => series
        .Name("Measured Impedance")
        .Fill("#000000")
        .Width(2)
        .Marker(m => m
            .Visible(true)
            .Shape("Circle")
            .Fill("#000000")
            .Border(b => b
                .Width(1)
                .Color("#ffffff"))
            .Width(8)
            .Height(8))        
        .Points(ViewBag.AntennaData)
        .Add())
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .TextStyle(new {
            fontFamily = "Times New Roman",
            size = "12px"}))
    .Render()
```

## Best Practices

### Visual Clarity

1. **Use Consistent Styling**
   - Apply same label styles to both axes
   - Use matching gridline patterns
   - Maintain uniform opacity levels

2. **Balance Detail and Clarity**
   - Too many gridlines: cluttered and hard to read
   - Too few gridlines: difficult to estimate values
   - Recommended: 4-5 minor gridlines between major lines

3. **Optimize Label Visibility**
   - Always use `LabelIntersectAction.Hide` to prevent overlap
   - Position labels outside for maximum readability
   - Use contrasting colors for labels against background

### Performance

1. **Minimize Minor Gridlines**
   - Fewer minor gridlines = better performance
   - Count of 4-5 is optimal balance
   - Avoid count >10 (excessive detail, poor performance)

2. **Use Appropriate Opacity**
   - Solid lines (opacity 1.0) for major features
   - Reduced opacity (0.3-0.6) for minor features
   - Helps visual hierarchy without complexity

### Accessibility

1. **Color Contrast**
   - Ensure labels have sufficient contrast with background
   - Recommended: #333333 on white, #ffffff on dark backgrounds
   - Test contrast ratios (minimum 4.5:1 for normal text)

2. **Font Sizing**
   - Minimum 11px for body text
   - 12-14px recommended for comfortable reading
   - Larger sizes (14-16px) for presentations

3. **Line Weights**
   - Major gridlines: 1-2px width
   - Minor gridlines: 0.5-1px width
   - Axis lines: 1.5-2px width
   - Ensure sufficient weight for visibility

### Responsive Design

When chart size changes, adjust axis configuration:

```cshtml
@{
    bool isSmallScreen = Request.Browser.IsMobileDevice;
    string chartSize = isSmallScreen ? "100%" : "900px";
    string labelSize = isSmallScreen ? "10px" : "12px";
    int minorCount = isSmallScreen ? 2 : 4;
}

@Html.EJS().Smithchart("responsiveChart")
    .Width(chartSize)
    .Height(chartSize)
    .HorizontalAxis(h => h
        .LabelStyle(ls => ls.Size(labelSize))
        .MinorGridLines(mg => mg.Count(minorCount)))
    .RadialAxis(r => r
        .LabelStyle(ls => ls.Size(labelSize))
        .MinorGridLines(mg => mg.Count(minorCount)))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Printing and Export

For print-optimized charts:
- Use black (#000000) for gridlines and labels
- Increase line widths slightly (1.5x normal)
- Use solid lines instead of dashed (better print quality)
- Ensure high contrast (opacity 0.8-1.0)

```cshtml
// Print-optimized configuration
.HorizontalAxis(h => h
    .LabelStyle(ls => ls.Color("#000000").Size("12px"))
    .MajorGridLines(mg => mg.Width(1.5).Opacity(0.9))
    .MinorGridLines(mg => mg.Width(1)))
```
