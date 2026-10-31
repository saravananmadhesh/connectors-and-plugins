# Annotations and Legends

## Table of Contents
- [Adding Annotations](#adding-annotations)
- [Annotation Positioning](#annotation-positioning)
- [Legend Configuration](#legend-configuration)
- [Legend Styling](#legend-styling)
- [Legend Interactions](#legend-interactions)

## Adding Annotations

Annotations add custom text, HTML, or images to gauges at specific positions.

### Text Annotation

Add simple text to gauge:

```csharp
.Annotations(annotations =>
{
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "65%",
        Angle = 180,        // Position angle
        Radius = "30%"      // Distance from center
    });
})
```

### Styled Text Annotation

```csharp
.Annotations(annotations =>
{
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "<div style='font-size:20px;color:#FF5733;font-weight:bold;'>Current</div>",
        Angle = 90,
        Radius = "40%"
    });
})
```

### Value-Based Annotation

```csharp
.Annotations(annotations =>
{
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "<span style='font-size:16px;'>Status: Active</span>",
        Angle = 180,
        Radius = "50%"
    });
})
```

### Image Annotation

```csharp
.Annotations(annotations =>
{
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "<img src='~/images/icon.png' style='width:40px;height:40px;' />",
        Angle = 270,
        Radius = "60%"
    });
})
```

### HTML Content Annotation

```csharp
.Annotations(annotations =>
{
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = @"<div style='text-align:center;'>
                        <h3>Performance</h3>
                        <p style='color:#1E90FF;'>65/100</p>
                    </div>",
        Angle = 0,
        Radius = "45%"
    });
})
```

## Annotation Positioning

### Angle Positioning

Position annotations around gauge using angles (0-360°):

```
    0° (Top)
    |
180° ---- 0°/360°
    |
  180° (Bottom)
```

```csharp
// Top
Angle = 0

// Right
Angle = 90

// Bottom
Angle = 180

// Left
Angle = 270

// Top-Right
Angle = 45

// Bottom-Left
Angle = 225
```

### Radius Positioning

Control distance from center (pixels or percentage):

```csharp
// Center
Radius = "0%"

// Inner ring
Radius = "20%"

// Mid ring
Radius = "50%"

// Outer edge
Radius = "90%"

// Exact pixels
Radius = "100px"
```

### Multiple Annotations

Add information at different positions:

```csharp
.Annotations(annotations =>
{
    // Center value
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "<div style='font-size:24px;font-weight:bold;'>65</div>",
        Angle = 180,
        Radius = "10%"
    });
    
    // Right label
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "<div style='font-size:14px;'>Current</div>",
        Angle = 90,
        Radius = "60%"
    });
    
    // Bottom unit
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "<div style='font-size:12px;color:#999;'>%</div>",
        Angle = 180,
        Radius = "25%"
    });
})
```

### Dynamic Annotation

```csharp
.Annotations(annotations =>
{
    annotations.Add(new CircularGaugeAnnotation
    {
        Content = "@{ Model.CurrentValue }",  // C# value
        Angle = 180,
        Radius = "35%"
    });
})
```

## Legend Configuration

Legends display information about ranges:

### Basic Legend

```csharp
@Html.EJS().CircularGauge("gauge")
    .Legend(legend => legend
        .Visible = true
    )
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange { Start = 0, End = 33, Color = "#FF0000" },
                new CircularGaugeRange { Start = 33, End = 66, Color = "#FFAA00" },
                new CircularGaugeRange { Start = 66, End = 100, Color = "#00AA00" }
            }
        });
    })
    .Render();
```

### Legend Position

Control where legend appears:

```csharp
.Legend(legend => legend
    .Visible = true
    .Position = LegendPosition.Right    // Right, Left, Top, Bottom
)
```

### Legend Alignment

```csharp
.Legend(legend => legend
    .Visible = true
    .Position = LegendPosition.Bottom
    .Alignment = Alignment.Center      // Center, Near, Far
)
```

## Legend Styling

### Font Customization

```csharp
.Legend(legend => legend
    .Visible = true
    .LabelStyle(ls => ls
        .FontSize = "14px"
        .FontFamily = "Segoe UI"
        .Color = "#333333"
    )
)
```

### Legend Background

```csharp
.Legend(legend => legend
    .Visible = true
    .Background = "#F5F5F5"
    .Border(border => border
        .Color = "#CCCCCC"
        .Width = 1
    )
)
```

### Legend Padding

```csharp
.Legend(legend => legend
    .Visible = true
    .Margin(margin => margin
        .Left = 15
        .Right = 15
        .Top = 10
        .Bottom = 10
    )
)
```

## Legend Interactions

### Toggle Legend Ranges

Allow users to hide/show ranges:

```csharp
@Html.EJS().CircularGauge("interactiveLegend")
    .Legend(legend => legend
        .Visible = true
    )
    .LegendRender("onLegendRender")
    .Render();
```

```javascript
<script>
    function onLegendRender(args) {
        // Toggle range visibility on legend click
        console.log("Legend clicked: " + args.legendText);
    }
</script>
```

### Paging Support

Navigate legends with many items:

```csharp
.Legend(legend => legend
    .Visible = true
    .EnablePages = true,           // Enable paging
    .Padding = 20,
    .Height = "150px"
)
```

### Custom Legend Text

Override default range labels:

```csharp
new CircularGaugeRange
{
    Start = 0,
    End = 30,
    Color = "#FF0000",
    LegendText = "Poor (0-30)"      // Custom label
},
new CircularGaugeRange
{
    Start = 30,
    End = 70,
    Color = "#FFAA00",
    LegendText = "Average (30-70)"
},
new CircularGaugeRange
{
    Start = 70,
    End = 100,
    Color = "#00AA00",
    LegendText = "Excellent (70-100)"
}
```

### Multiple-Line Legend

For many ranges, arrange legend in columns:

```csharp
.Legend(legend => legend
    .Visible = true
    .Position = LegendPosition.Right
    .Alignment = Alignment.Far
    .Columns = 1           // Single column
    .Height = "200px"
)
```

## Complete Example: Dashboard with Annotations and Legend

```csharp
@Html.EJS().CircularGauge("dashboardGauge")
    .Title("System Performance")
    .Legend(legend => legend
        .Visible = true
        .Position = LegendPosition.Bottom
        .Alignment = Alignment.Center
        .LabelStyle(ls => ls
            .FontSize = "12px"
            .Color = "#666666"
        )
    )
    .Annotations(annotations =>
    {
        // Center status
        annotations.Add(new CircularGaugeAnnotation
        {
            Content = @"<div style='text-align:center;'>
                            <div style='font-size:28px;font-weight:bold;color:#1E90FF;'>
                                72
                            </div>
                            <div style='font-size:12px;color:#999;'>
                                SCORE
                            </div>
                        </div>",
            Angle = 180,
            Radius = "15%"
        });
        
        // Status indicator
        annotations.Add(new CircularGaugeAnnotation
        {
            Content = "<div style='color:#00AA00;font-weight:bold;'>● OPERATIONAL</div>",
            Angle = 180,
            Radius = "35%"
        });
    })
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange
                {
                    Start = 0,
                    End = 30,
                    Color = "#FF0000",
                    LegendText = "Critical"
                },
                new CircularGaugeRange
                {
                    Start = 30,
                    End = 60,
                    Color = "#FFAA00",
                    LegendText = "Warning"
                },
                new CircularGaugeRange
                {
                    Start = 60,
                    End = 100,
                    Color = "#00AA00",
                    LegendText = "Healthy"
                }
            }
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 72,
            Type = GaugePointerType.Needle,
            Color = "#333333"
        });
    })
    .Render();
```

This creates a complete dashboard with:
- Clear status display in center via annotation
- Operational status indicator
- Color-coded legend for interpretation
- Professional appearance

## Best Practices

**Annotations:**
- Keep text concise and readable
- Use contrasting colors for legibility
- Position annotations where they don't overlap data

**Legends:**
- Always include legends for color-coded ranges
- Use clear, descriptive range names
- Position legends conveniently for your layout

**Combined Use:**
- Annotations for specific values/status
- Legends for general range interpretation
- Together they create professional dashboards
