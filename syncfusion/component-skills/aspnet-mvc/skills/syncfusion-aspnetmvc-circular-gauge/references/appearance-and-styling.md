# Appearance and Styling

## Table of Contents
- [Gauge Dimensions](#gauge-dimensions)
- [Title Styling](#title-styling)
- [Background and Borders](#background-and-borders)
- [Margins and Positioning](#margins-and-positioning)
- [Color Customization](#color-customization)
- [Theme Selection](#theme-selection)

## Gauge Dimensions

### Container Size

Define gauge container dimensions in your view:

```html
<div id="gauge" style="width: 600px; height: 600px;"></div>

@Html.EJS().CircularGauge("gauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Render();
```

### Responsive Sizing

Make gauge responsive to container:

```html
<div id="gauge" style="width: 100%; height: 600px; max-width: 800px;"></div>

@Html.EJS().CircularGauge("gauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Render();
```

### Gauge Center Position

Control where gauge renders within container:

```csharp
@Html.EJS().CircularGauge("gauge")
    .CenterX = "50%"   // Horizontal position (default: 50%)
    .CenterY = "50%"   // Vertical position (default: 50%)
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Render();
```

### Off-Center Positioning

Position gauge off-center for layouts:

```csharp
// Top-left corner
CenterX = "25%",
CenterY = "25%"

// Bottom-right corner
CenterX = "75%",
CenterY = "75%"

// Top-center
CenterX = "50%",
CenterY = "20%"
```

### Pixel-Based Positioning

```csharp
CenterX = "300px",  // Fixed pixels
CenterY = "250px"
```

**Use:** For layouts with multiple gauges arranged precisely.

### Gauge Radius

Control gauge size (independent of container):

```csharp
.Axes(axes =>
{
    axes.Add(new CircularGaugeAxis
    {
        Minimum = 0,
        Maximum = 100,
        Radius = "85%"  // 85% of available space
    });
})
```

### Multiple Gauge Layout

```html
<div style="display: flex; gap: 20px;">
    <div id="gauge1" style="flex: 1;"></div>
    <div id="gauge2" style="flex: 1;"></div>
    <div id="gauge3" style="flex: 1;"></div>
</div>

@Html.EJS().CircularGauge("gauge1").CenterX("50%").CenterY("50%").Render()
@Html.EJS().CircularGauge("gauge2").CenterX("50%").CenterY("50%").Render()
@Html.EJS().CircularGauge("gauge3").CenterX("50%").CenterY("50%").Render()
```

## Title Styling

### Basic Title

```csharp
.Title("Performance Metrics")
```

### Title Font Styling

```csharp
.Title("CPU Usage")
.TitleStyle(ts => ts
    .Color("#333333")
    .FontFamily("Segoe UI, Arial")
    .FontSize("20px")
    .FontWeight("bold")
    .FontStyle("normal")
    .TextAlignment = TextAlignment.Center
)
```

### Title with Border

```csharp
.TitleStyle(ts => ts
    .Color("#1E90FF")
    .FontSize("22px")
    .FontWeight("600")
    .Border(new TitleBorder
    {
        Color = "#1E90FF",
        Width = 2
    })
)
```

### Title Positioning

```csharp
.Title("Speedometer")
.TitleStyle(ts => ts
    .FontSize("24px")
)
// Title appears above gauge by default
```

## Background and Borders

### Gauge Background Color

```csharp
@Html.EJS().CircularGauge("gauge")
    .Background = "#F5F5F5"  // Light gray background
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Render();
```

### Gauge Border

```csharp
.Background = "#FFFFFF"
.Border(border => border
    .Color = "#333333"
    .Width = 2
)
```

### Axis Line Styling

```csharp
.Axes(axes =>
{
    axes.Add(new CircularGaugeAxis
    {
        Minimum = 0,
        Maximum = 100,
        LineStyle = new AxisLineStyle
        {
            Width = 3,
            Color = "#000000"
        }
    });
})
```

### Axis Background

```csharp
new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    Background = "#F0F0F0"  // Light axis background
}
```

## Margins and Positioning

### Gauge Margins

Add space around gauge within container:

```csharp
.Margin(margin => margin
    .Left = 20
    .Top = 20
    .Right = 20
    .Bottom = 20
)
```

### Different Margins Per Side

```csharp
.Margin(margin => margin
    .Left = 50      // Extra left space
    .Top = 10
    .Right = 10
    .Bottom = 40    // Extra bottom for title
)
```

### Full Container Usage

```csharp
.Margin(margin => margin
    .Left = 0
    .Top = 0
    .Right = 0
    .Bottom = 0
)
```

## Color Customization

### Individual Element Colors

**Axis line:**
```csharp
LineStyle = new AxisLineStyle { Color = "#FF5733" }
```

**Ticks:**
```csharp
MajorTicks = new CircularGaugeTick { Color = "#000000" }
MinorTicks = new CircularGaugeTick { Color = "#CCCCCC" }
```

**Labels:**
```csharp
LabelStyle = new CircularGaugeLabel { Color = "#333333" }
```

**Pointer:**
```csharp
Color = "#1E90FF"  // In pointer configuration
```

**Ranges:**
```csharp
new CircularGaugeRange { Color = "#FF0000" }
```

### Color Schemes

**Professional (Blue/Gray):**
```csharp
Axis: #333333
Ticks: #666666
Labels: #666666
Pointer: #1E90FF
Background: #FFFFFF
```

**Warm (Orange/Brown):**
```csharp
Axis: #8B4513
Ticks: #A0522D
Labels: #A0522D
Pointer: #FF6B35
Background: #FFF8DC
```

**Cool (Teal/Green):**
```csharp
Axis: #006666
Ticks: #008080
Labels: #008080
Pointer: #00AA00
Background: #E0FFFF
```

**Dark Mode:**
```csharp
Background: #2B2B2B
Axis: #CCCCCC
Ticks: #999999
Labels: #FFFFFF
Pointer: #00FF00
```

## Theme Selection

### Available Themes

Themes control overall color scheme. Set in layout:

```html
<!-- Theme in CSS CDN -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
```

**Theme Options:**
- `fluent` - Modern Fluent design
- `bootstrap` - Bootstrap style
- `bootstrap4` - Bootstrap 4 style
- `bootstrap5` - Bootstrap 5 style
- `fabric` - Office Fabric design
- `highcontrast` - Accessibility focused
- `material` - Google Material Design
- `tailwind` - Tailwind CSS design

### Switch Themes Dynamically

```html
<select id="themeSelect" onchange="changeTheme(this.value)">
    <option value="fluent">Fluent</option>
    <option value="bootstrap5">Bootstrap 5</option>
    <option value="material">Material</option>
    <option value="highcontrast">High Contrast</option>
</select>

<script>
function changeTheme(theme) {
    let link = document.querySelector("link[rel='stylesheet']");
    link.href = `https://cdn.syncfusion.com/ej2/latest/${theme}.css`;
}
</script>
```

### Flue Theme Settings

Fluent theme provides subtle, modern appearance:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
```

## Complete Styling Example

```csharp
@Html.EJS().CircularGauge("styledGauge")
    .Title("Network Performance")
    .Background = "#FFFFFF"
    .Border(border => border.Color = "#E0E0E0".Width = 1)
    .CenterX = "50%"
    .CenterY = "50%"
    .Margin(margin => margin
        .Left = 30
        .Top = 30
        .Right = 30
        .Bottom = 30
    )
    .TitleStyle(ts => ts
        .Color = "#1E90FF"
        .FontSize = "24px"
        .FontWeight = "600"
        .FontFamily = "Segoe UI"
    )
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Radius = "90%",
            LineStyle = new AxisLineStyle
            {
                Width = 2,
                Color = "#E0E0E0"
            },
            Background = "#F9F9F9",
            MajorTicks = new CircularGaugeTick
            {
                Interval = 10,
                Height = 10,
                Color = "#666666"
            },
            MinorTicks = new CircularGaugeTick
            {
                Interval = 2,
                Height = 5,
                Color = "#CCCCCC"
            },
            LabelStyle = new CircularGaugeLabel
            {
                Format = "{value}%",
                Color = "#666666",
                FontSize = "12px"
            },
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange
                {
                    Start = 0,
                    End = 30,
                    Color = "#FF0000"
                },
                new CircularGaugeRange
                {
                    Start = 30,
                    End = 70,
                    Color = "#FFAA00"
                },
                new CircularGaugeRange
                {
                    Start = 70,
                    End = 100,
                    Color = "#00AA00"
                }
            }
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 65,
            Type = GaugePointerType.Needle,
            Color = "#1E90FF",
            PointerWidth = 8,
            Cap = new PointerCap
            {
                Radius = 8,
                Color = "#1E90FF"
            }
        });
    })
    .Render();
```

This creates a professionally styled gauge with proper spacing, colors, and visual hierarchy.
