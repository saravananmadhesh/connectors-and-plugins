# Appearance and Styling Customization

## Table of Contents
- [Overview](#overview)
  - [Customizable Elements](#customizable-elements)
- [Container Area Customization](#container-area-customization)
  - [Border Styling](#border-styling)
  - [Border Properties](#border-properties)
  - [Background Customization](#background-customization)
  - [Container Area Complete Example](#container-area-complete-example)
- [Series Styling](#series-styling)
  - [Fill Color](#fill-color)
  - [Line Width](#line-width)
  - [Series Opacity](#series-opacity)
  - [Series Border](#series-border)
- [Theme Selection](#theme-selection)
  - [Available Themes](#available-themes)
  - [Applying Themes](#applying-themes)
  - [Theme Effects](#theme-effects)
  - [Custom Theme Approach](#custom-theme-approach)
- [Padding and Margins](#padding-and-margins)
  - [Padding Configuration](#padding-configuration)
  - [Padding Properties](#padding-properties)
  - [Uniform Padding](#uniform-padding)
  - [Asymmetric Padding](#asymmetric-padding)
- [Complete Customization Examples](#complete-customization-examples)
  - [Example 1: Professional Dashboard Sparkline](#example-1-professional-dashboard-sparkline)
  - [Example 2: Dark Mode Sparkline](#example-2-dark-mode-sparkline)
  - [Example 3: Minimalist Sparkline](#example-3-minimalist-sparkline)
  - [Example 4: Report-Style Sparkline](#example-4-report-style-sparkline)
- [Styling Best Practices](#styling-best-practices)
- [Responsive Sizing with Custom CSS](#responsive-sizing-with-custom-css)

## Overview

Appearance customization allows you to control the visual presentation of sparklines through colors, borders, themes, spacing, and other styling properties. Each sparkline element can be customized independently to match your application design.

### Customizable Elements

- **Container**: Border, background color, dimensions
- **Series**: Fill color, line width, opacity
- **Theme**: Overall color scheme (Material, Fabric, Bootstrap, High Contrast)
- **Padding**: Space between sparkline and container edges

## Container Area Customization

### Border Styling

Add a border around the sparkline container:

```cshtml
@Html.EJS().Sparkline("borderChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .ContainerArea(new Syncfusion.EJ2.Charts.SparklineContainerArea{
        Border = new {
            Color = "darkblue",
            Width = 2
        }
        })
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Border Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **Color** | string | Border color in hex or named color | `"#FF5733"`, `"red"` |
| **Width** | double | Border thickness in pixels | `1`, `2`, `3` |

### Background Customization

Set the background color of the sparkline container:

```cshtml
@Html.EJS().Sparkline("bgChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .ContainerArea(new Syncfusion.EJ2.Charts.SparklineContainerArea{
        Background = "rgba(240, 240, 240, 0.5)" } // Light gray with transparency
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Container Area Complete Example

```cshtml
@Html.EJS().Sparkline("containerChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .ContainerArea(new Syncfusion.EJ2.Charts.SparklineContainerArea{
        Background = "white",
        Border = new {
            color = "#999999",
            width = 1 
        }
    })
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Series Styling

### Fill Color

Change the main series color:

```cshtml
@Html.EJS().Sparkline("fillChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .Fill("rgb(255, 107, 107)")  // Custom red
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Line Width

Adjust the thickness of line sparklines:

```cshtml
@Html.EJS().Sparkline("lineChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .LineWidth(2)  // 2-pixel line
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Series Opacity

Control transparency of the series:

```cshtml
@Html.EJS().Sparkline("opacityChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .Fill("steelblue")
    .Opacity(0.6)  // 60% opaque
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Series Border

Add a border to the series (for column and area types):

```cshtml
@Html.EJS().Sparkline("borderSeriesChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .Fill("lightblue")
    .Border(new Syncfusion.EJ2.Charts.SparklineBorderSparkline
    {
        Color = "navy",
        Width = 1
    })
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Theme Selection

### Available Themes

The Sparkline component supports four predefined themes:

| Theme | Best For | Color Palette |
|-------|----------|---------------|
| **Material** (Default) | Modern applications | Vibrant colors |
| **Fabric** | Office-style applications | Muted colors |
| **Bootstrap** | Bootstrap-based applications | Bootstrap colors |
| **Highcontrast** | Accessibility, dark mode | High contrast colors |

### Applying Themes

```cshtml
<!-- Material Theme (default) -->
@Html.EJS().Sparkline("materialChart")
    .XName("xval")
    .YName("yval")
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Material)
    .DataSource(Model)
    .Render()

<!-- Fabric Theme -->
@Html.EJS().Sparkline("fabricChart")
    .XName("xval")
    .YName("yval")
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Fabric)
    .DataSource(Model)
    .Render()

<!-- Bootstrap Theme -->
@Html.EJS().Sparkline("bootstrapChart")
    .XName("xval")
    .YName("yval")
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Bootstrap)
    .DataSource(Model)
    .Render()

<!-- High Contrast Theme -->
@Html.EJS().Sparkline("highContrastChart")
    .DataSource(Model)
    .XName("xval")
    .YName("yval")
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Highcontrast)
    .DataSource(Model)
    .Render()
```

### Theme Effects

Themes automatically adjust:
- Data label colors
- Tooltip colors
- Track line colors
- Font colors

When you set a theme, all UI elements automatically adjust their colors for visual consistency.

### Custom Theme Approach

While themes are predefined, you can achieve custom colors by combining multiple properties:

```cshtml
@Html.EJS().Sparkline("customChart")
    .XName("xval")
    .YName("yval")
    .Theme("Material")
    .Fill("custom-color")
    .DataLabelSettings(dl => dl
        .TextStyle(ts => ts.Color("custom-text-color"))
    )
    .DataSource(Model)
    .Render()
```

## Padding and Margins

### Padding Configuration

Padding is the space between the sparkline content and the container edges.

```cshtml
@Html.EJS().Sparkline("paddedChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .Padding(pd => pd
        .Left(10)
        .Right(10)
        .Top(5)
        .Bottom(5)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Padding Properties

| Property | Default | Description | Example |
|----------|---------|-------------|---------|
| **Left** | 5px | Space from left edge | `10`, `15`, `20` |
| **Right** | 5px | Space from right edge | `10`, `15`, `20` |
| **Top** | 5px | Space from top edge | `5`, `10`, `15` |
| **Bottom** | 5px | Space from bottom edge | `5`, `10`, `15` |

### Uniform Padding

All sides equal:

```cshtml
@Html.EJS().Sparkline("uniformPadding")
    .Padding(pd => pd
        .Left(8)
        .Right(8)
        .Top(8)
        .Bottom(8)
    )
    .Render()
```

### Asymmetric Padding

Different values for different sides:

```cshtml
@Html.EJS().Sparkline("asymmetricPadding")
    .Padding(pd => pd
        .Left(15)    // More space on left
        .Right(5)    // Less space on right
        .Top(5)      // Equal top/bottom
        .Bottom(5)
    )
    .Render()
```

## Complete Customization Examples

### Example 1: Professional Dashboard Sparkline

```cshtml
@Html.EJS().Sparkline("dashboardChart")
    .XName("Month")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Material)
    .Fill("rgb(33, 150, 243)")              // Material blue
    .Opacity(0.8)
    .LineWidth(1)
    .ContainerArea(new Syncfusion.EJ2.Charts.SparklineContainerArea {
        Background = "white",
        Border = new {
            Color = "rgb(224, 224, 224)",
            Width = 1
        }
    })
    .Padding(pd => pd
        .Left(8)
        .Right(8)
        .Top(4)
        .Bottom(4)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Example 2: Dark Mode Sparkline

```cshtml
@Html.EJS().Sparkline("darkModeChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Highcontrast)
    .Fill("rgb(255, 193, 7)")               // Bright yellow for dark background
    .ContainerArea(new Syncfusion.EJ2.Charts.SparklineContainerArea {
        Background = "rgb(33, 33, 33)" ,     // Dark gray
        Border= new {
            Color = "rgb(66, 66, 66)",
            Width = 1
        }
    })
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Example 3: Minimalist Sparkline

```cshtml
@Html.EJS().Sparkline("minimalistChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Material)
    .Fill("rgb(100, 100, 100)")
    .LineWidth(1)
    .ContainerArea(new Syncfusion.EJ2.Charts.SparklineContainerArea{
        Background = "transparent" }
        // No border
    )
    .Padding(pd => pd
        .Left(2)
        .Right(2)
        .Top(2)
        .Bottom(2)
    )
    .Height("80")
    .Width("60")
    .DataSource(Model)
    .Render()
```

### Example 4: Report-Style Sparkline

```cshtml
@Html.EJS().Sparkline("reportChart")
    .XName("Quarter")
    .YName("Performance")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Fabric)
    .Fill("rgb(108, 117, 125)")             // Fabric gray
    .Border(br => br
        .Color("rgb(52, 58, 64)")
        .Width(1)
    )
    .ContainerArea(new Syncfusion.EJ2.Charts.SparklineContainerArea{
        Background = "rgb(248, 249, 250)",   // Very light gray
        Border = new {
            Color = "rgb(206, 212, 218)",
            Width = 1
        }
     })
    .Padding(pd => pd
        .Left(5)
        .Right(5)
        .Top(3)
        .Bottom(3)
    )
    .Height("120")
    .Width("100")    
    .DataSource(Model)
    .Render()
```

## Styling Best Practices

1. **Maintain Contrast**: Ensure sufficient contrast between sparkline and background
2. **Use Theme Consistently**: Apply the same theme across related sparklines
3. **Respect Spacing**: Use appropriate padding for readability
4. **Consider Print**: Test appearance when printed (if applicable)
5. **Test Responsiveness**: Verify styling on different screen sizes
6. **Accessibility**: Choose colors that work for colorblind users
7. **Document Colors**: Document your color scheme for consistency
8. **Performance**: Avoid excessive custom styling that impacts rendering

## Responsive Sizing with Custom CSS

Enhance sparkline styling with CSS:

```html
<style>
    .sparkline-container {
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin: 10px 0;
    }

    .sparkline-container.dashboard {
        background-color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>

<div class="sparkline-container dashboard">
    @Html.EJS().Sparkline("responsiveChart")
        .XName("xval")
        .YName("yval")
        .Theme(Syncfusion.EJ2.Charts.SparklineTheme.Material)
        .DataSource(Model)
        .Render()
</div>
```

This allows you to combine Syncfusion styling with your CSS framework for maximum customization flexibility.
