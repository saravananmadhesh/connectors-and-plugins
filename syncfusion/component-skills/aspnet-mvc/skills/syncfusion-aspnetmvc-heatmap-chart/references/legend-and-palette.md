# Legend and Color Palettes in HeatMap

## Table of Contents
- [Legend Overview](#legend-overview)
- [Legend Positioning](#legend-positioning)
- [Legend Configuration](#legend-configuration)
- [Color Palettes](#color-palettes)
- [Gradient Color Schemes](#gradient-color-schemes)
- [Fixed Color Mapping](#fixed-color-mapping)
- [Custom Color Palettes](#custom-color-palettes)

## Legend Overview

The legend displays the color scale and value ranges, helping users interpret HeatMap colors. It provides:
- Value range information
- Color-to-value mapping
- Interactive legend elements
- Professional data visualization context

### Basic Legend

Enable default legend:

```csharp
@Html.EJS().HeatMap("container")
    .Legend(legend =>
    {
        legend.Visible(true);
    })
    .Render()
```

### Legend Disabled

Hide the legend:

```csharp
.Legend(legend =>
{
    legend.Visible(false);
})
```

## Legend Positioning

### Position Options

| Position | Placement |
|----------|-----------|
| `Right` | Right side (default) |
| `Bottom` | Bottom of chart |
| `Left` | Left side |
| `Top` | Top of chart |

### Right Position (Default)

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Right);
})
```

### Bottom Position

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Bottom);
})
```

### Left Position

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Left);
})
```

### Top Position

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Top);
})
```

## Legend Configuration

### Legend Styling

Customize legend appearance:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Right);
    legend.Width("20%");
    legend.Height("200px");
    legend.Border(border =>
    {
        border.Color("#cccccc");
        border.Width(1);
    });
})
```

### Legend Title

Add title to legend:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Title(title =>
    {
        title.Text("Color Scale");
        title.TextStyle(style =>
        {
            style.FontSize("14px");
            style.FontWeight("bold");
        });
    });
})
```

### Legend Label Styling

Format legend labels:

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.LabelStyle(style =>
    {
        style.FontSize("12px");
        style.Color("#333333");
    });
    legend.LabelFormat("0.0");
})
```

### Legend with Type Configuration

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Bottom);
    legend.Type(Syncfusion.EJ2.HeatMap.LegendType.Gradient);  // Gradient or Listtype
})
```

## Color Palettes

### Overview

Predefined color palettes provide consistent, professional color schemes. Syncfusion offers multiple built-in palettes.

### Viridis Palette (Default)

```csharp
.Palette(new List<string> { "#0d47a1", "#1565c0", "#1976d2", "#1e88e5", "#2196f3" })
```

### Predefined Palette Lists

| Palette | Appearance | Use Case |
|---------|-----------|----------|
| Cool | Blue/cyan tones | Data analysis |
| Warm | Red/orange tones | Heat mapping |
| Grayscale | Black to white | Printing |
| Accent | Saturated colors | Highlighting |

### Setting Palette

```csharp
var coolPalette = new List<string> 
{ 
    "#ffffff", "#e8f4f8", "#d1eaf0", "#badef8", "#a3d2ff", "#8cc6ff" 
};

@Html.EJS().HeatMap("container")
    .Palette(coolPalette)
    .Render()
```

### Multiple Palettes

Use different palettes for different data ranges:

```csharp
var lowToHighPalette = new List<string>
{
    "#00d084",  // Green (low)
    "#ffeb3b",  // Yellow (medium)
    "#ff6f00"   // Orange (high)
};

@Html.EJS().HeatMap("container")
    .Palette(lowToHighPalette)
    .Render()
```

## Gradient Color Schemes

### Linear Gradient

Create smooth color transitions:

```csharp
var gradientPalette = new List<string>
{
    "#1a9850",  // Green
    "#91cf60",  // Light green
    "#d9ef8b",  // Yellow-green
    "#fee08b",  // Yellow
    "#fc8d59",  // Orange
    "#e34a33",  // Red
    "#b30000"   // Dark red
};

@Html.EJS().HeatMap("container")
    .Palette(gradientPalette)
    .Legend(legend =>
    {
        legend.Type(Syncfusion.EJ2.HeatMap.LegendType.Gradient);
    })
    .Render()
```

### Temperature-based Gradient

```csharp
var temperaturePalette = new List<string>
{
    "#4575b4",  // Cool (cold)
    "#74add1",
    "#abd9e9",
    "#e0f3f8",
    "#ffffbf",  // Neutral
    "#fee090",
    "#fdae61",
    "#f46d43",
    "#d73027",
    "#a50026"   // Hot
};
```

### Business Intelligence Gradient

```csharp
var biPalette = new List<string>
{
    "#d73027",  // Critical/Red
    "#fc8d59",  // Warning/Orange
    "#fee090",  // Caution/Yellow
    "#1a9850"   // Good/Green
};
```

## Fixed Color Mapping

### Map Specific Values to Colors

Assign fixed colors for specific data ranges:

```csharp
var colorRanges = new List<HeatMapColorRange>
{
    new HeatMapColorRange { Min = 0, Max = 25, Color = "#00d084" },      // Green
    new HeatMapColorRange { Min = 25, Max = 50, Color = "#ffeb3b" },     // Yellow
    new HeatMapColorRange { Min = 50, Max = 75, Color = "#ff9800" },     // Orange
    new HeatMapColorRange { Min = 75, Max = 100, Color = "#f44336" }     // Red
};

@Html.EJS().HeatMap("container")
    .ColorMapping(colorRanges.Select(cr => new object 
    { 
        minRange = cr.Min, 
        maxRange = cr.Max, 
        color = cr.Color 
    }).ToList())
    .Render()
```

### Traffic Light Colors

```csharp
var trafficLightColors = new List<string>
{
    "#00aa00",  // Green
    "#ffff00",  // Yellow
    "#ff0000"   // Red
};

@Html.EJS().HeatMap("container")
    .Palette(trafficLightColors)
    .Render()
```

### Business Status Colors

```csharp
var statusColors = new List<string>
{
    "#4caf50",  // Success (Green)
    "#2196f3",  // Info (Blue)
    "#ff9800",  // Warning (Orange)
    "#f44336"   // Error (Red)
};
```

## Custom Color Palettes

### Create Custom Palette

Define your own color scheme:

```csharp
var customPalette = new List<string>
{
    "#e8f4f8",  // Lightest
    "#b3d9e8",
    "#7eb8d4",
    "#4a97c0",
    "#1976ac",  // Darkest
};

@Html.EJS().HeatMap("container")
    .Palette(customPalette)
    .Render()
```

### Brand Colors Palette

Use your company brand colors:

```csharp
var brandPalette = new List<string>
{
    "#f5f5f5",      // Light gray
    "#e3f2fd",      // Light brand blue
    "#bbdefb",      // Medium brand blue
    "#1976d2",      // Brand blue
    "#0d47a1"       // Dark brand blue
};
```

### Accessibility-Friendly Palette

```csharp
// Colorblind-friendly palette
var cbFriendlyPalette = new List<string>
{
    "#f7f7f7",  // White
    "#cccccc",  // Light gray
    "#969696",  // Medium gray
    "#636363",  // Dark gray
    "#252525"   // Black
};
```

### Complete Palette Example

```csharp
@Html.EJS().HeatMap("container")
    .DataSource((IEnumerable<object>)Model)
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "A", "B", "C", "D" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Low", "Medium", "High" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .Palette(new List<string>
    {
        "#1a9850",
        "#91cf60",
        "#d9ef8b",
        "#fee08b",
        "#fc8d59",
        "#e34a33",
        "#b30000"
    })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Bottom);
        legend.Type(Syncfusion.EJ2.HeatMap.LegendType.Gradient);
        legend.Title(title =>
        {
            title.Text("Value Range");
        });
    })
    .Render()
```

## Best Practices

1. **Accessibility**: Use colorblind-friendly palettes
2. **Clarity**: Choose palettes with distinct color differences
3. **Context**: Match palette to data meaning (green = good, red = bad)
4. **Consistency**: Keep palettes consistent across dashboards
5. **Legend**: Always include legend for professional presentations
6. **Testing**: Verify palette readability on various displays

Legends and color palettes are essential for creating professional, accessible HeatMap visualizations that communicate data effectively.
