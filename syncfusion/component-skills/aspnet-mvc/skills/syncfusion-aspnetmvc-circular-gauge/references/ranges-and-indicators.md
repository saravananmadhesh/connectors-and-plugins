# Ranges and Indicators

## Table of Contents
- [Creating Ranges](#creating-ranges)
- [Range Styling](#range-styling)
- [Positioning and Sizing](#positioning-and-sizing)
- [Multiple Ranges](#multiple-ranges)
- [Interactive Ranges](#interactive-ranges)

## Creating Ranges

Ranges are color zones that help users quickly assess status at a glance.

### Basic Range

```csharp
@Html.EJS().CircularGauge("gauge")
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
                    End = 33,
                    Color = "#00AA00"  // Green zone
                }
            }
        });
    })
    .Render();
```

### Range Properties

| Property | Type | Purpose |
|----------|------|---------|
| `Start` | number | Range minimum value |
| `End` | number | Range maximum value |
| `Color` | string | Fill color (#RGB or color name) |
| `StartWidth` | number | Thickness at start (pixels or %) |
| `EndWidth` | number | Thickness at end (pixels or %) |
| `Radius` | string | Position (pixels or %) |
| `Offset` | number | Distance offset (pixels) |

## Range Styling

### Simple Colored Range

```csharp
new CircularGaugeRange
{
    Start = 0,
    End = 50,
    Color = "#FF5733",
    StartWidth = 10,
    EndWidth = 10
}
```

### Gradient Range (Tapered)

Create visual depth with varying widths:

```csharp
new CircularGaugeRange
{
    Start = 40,
    End = 70,
    Color = "#FFD700",
    StartWidth = 20,   // Thick at start
    EndWidth = 5       // Thin at end (taper)
}
```

### Bordered Range

Add borders to ranges:

```csharp
new CircularGaugeRange
{
    Start = 70,
    End = 100,
    Color = "#00AA00",
    StartWidth = 10,
    EndWidth = 10,
    Border = new RangeBorder
    {
        Color = "#333333",
        Width = 2
    }
}
```

### Range with Shadow

Add depth effect (CSS-based):

```csharp
new CircularGaugeRange
{
    Start = 60,
    End = 100,
    Color = "#FF0000",
    StartWidth = 12,
    EndWidth = 12
}
```

## Positioning and Sizing

### Position by Percentage

Position ranges as percentage of axis radius:

```csharp
new CircularGaugeRange
{
    Start = 30,
    End = 70,
    Color = "#0066CC",
    Radius = "80%"  // 80% of axis radius
}
```

### Position by Pixels

Exact pixel positioning:

```csharp
new CircularGaugeRange
{
    Start = 20,
    End = 60,
    Color = "#FF6B35",
    Radius = "250px"  // Exact distance
}
```

### Offset from Axis

Fine-tune range distance from center:

```csharp
new CircularGaugeRange
{
    Start = 40,
    End = 80,
    Color = "#00AA00",
    Offset = -10   // Move 10px inward
}
```

**Positive offset** = Move outward
**Negative offset** = Move inward

### Thickness Control

Create 3D effect with variable width:

```csharp
new CircularGaugeRange
{
    Start = 0,
    End = 100,
    Color = "#CCCCCC",
    StartWidth = 25,   // Start thick
    EndWidth = 5       // End thin
}
```

## Multiple Ranges

### Performance Zones

Create colored zones for status indication:

```csharp
@Html.EJS().CircularGauge("statusGauge")
    .Title("Performance Level")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Ranges = new List<CircularGaugeRange>
            {
                // Poor zone (0-30)
                new CircularGaugeRange
                {
                    Start = 0,
                    End = 30,
                    Color = "#FF0000"  // Red
                },
                
                // Warning zone (30-60)
                new CircularGaugeRange
                {
                    Start = 30,
                    End = 60,
                    Color = "#FFAA00"  // Orange
                },
                
                // Good zone (60-100)
                new CircularGaugeRange
                {
                    Start = 60,
                    End = 100,
                    Color = "#00AA00"  // Green
                }
            }
        });
    })
    .Render();
```

### Temperature Ranges

```csharp
new CircularGaugeAxis
{
    Minimum = -20,
    Maximum = 50,
    Ranges = new List<CircularGaugeRange>
    {
        // Freezing (-20 to 0°C)
        new CircularGaugeRange
        {
            Start = -20,
            End = 0,
            Color = "#6495ED"  // Blue
        },
        
        // Comfortable (0 to 25°C)
        new CircularGaugeRange
        {
            Start = 0,
            End = 25,
            Color = "#00AA00"  // Green
        },
        
        // Hot (25 to 50°C)
        new CircularGaugeRange
        {
            Start = 25,
            End = 50,
            Color = "#FF4500"  // Orange-red
        }
    }
}
```

### CPU Usage Zones

```csharp
new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    Ranges = new List<CircularGaugeRange>
    {
        // Idle (0-25%)
        new CircularGaugeRange
        {
            Start = 0,
            End = 25,
            Color = "#90EE90",  // Light green
            StartWidth = 15,
            EndWidth = 15
        },
        
        // Normal (25-50%)
        new CircularGaugeRange
        {
            Start = 25,
            End = 50,
            Color = "#00AA00",  // Green
            StartWidth = 15,
            EndWidth = 15
        },
        
        // High (50-75%)
        new CircularGaugeRange
        {
            Start = 50,
            End = 75,
            Color = "#FFAA00",  // Orange
            StartWidth = 15,
            EndWidth = 15
        },
        
        // Critical (75-100%)
        new CircularGaugeRange
        {
            Start = 75,
            End = 100,
            Color = "#FF0000",  // Red
            StartWidth = 15,
            EndWidth = 15
        }
    }
}
```

### Financial Status Ranges

```csharp
new CircularGaugeAxis
{
    Minimum = -50,
    Maximum = 200,
    Ranges = new List<CircularGaugeRange>
    {
        // Loss (-50 to 0)
        new CircularGaugeRange
        {
            Start = -50,
            End = 0,
            Color = "#D32F2F"  // Red
        },
        
        // Break-even (0 to 50)
        new CircularGaugeRange
        {
            Start = 0,
            End = 50,
            Color = "#FBC02D"  // Yellow
        },
        
        // Profit (50 to 150)
        new CircularGaugeRange
        {
            Start = 50,
            End = 150,
            Color = "#388E3C"  // Green
        },
        
        // Excellent (150 to 200)
        new CircularGaugeRange
        {
            Start = 150,
            End = 200,
            Color = "#1565C0"  // Blue
        }
    }
}
```

## Interactive Ranges

### Draggable Ranges

Allow users to drag range boundaries:

```csharp
@Html.EJS().CircularGauge("interactiveGauge")
    .EnableRangeDrag = true
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
                    Start = 20,
                    End = 80,
                    Color = "#FF6B35"
                }
            }
        });
    })
    .RangeDrag("onRangeDrag")
    .Render();
```

### Handle Range Drag Events

```javascript
<script>
    function onRangeDrag(args) {
        console.log("Start: " + args.start);
        console.log("End: " + args.end);
        
        // Update UI or data
        updateDashboard(args.start, args.end);
    }
</script>
```

### Range Drag Properties

- `start` - New start value after drag
- `end` - New end value after drag
- `rangeIndex` - Which range (if multiple)

## Complete Example: Dashboard with Status Zones

```csharp
@Html.EJS().CircularGauge("dashboardGauge")
    .Title("System Health")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            StartAngle = 200,
            EndAngle = 160,
            Direction = GaugeDirection.ClockWise,
            Ranges = new List<CircularGaugeRange>
            {
                // Critical zone (0-30)
                new CircularGaugeRange
                {
                    Start = 0,
                    End = 30,
                    Color = "#FF0000",
                    StartWidth = 18,
                    EndWidth = 18,
                    Radius = "90%"
                },
                
                // Warning zone (30-70)
                new CircularGaugeRange
                {
                    Start = 30,
                    End = 70,
                    Color = "#FFAA00",
                    StartWidth = 18,
                    EndWidth = 18,
                    Radius = "90%"
                },
                
                // Healthy zone (70-100)
                new CircularGaugeRange
                {
                    Start = 70,
                    End = 100,
                    Color = "#00AA00",
                    StartWidth = 18,
                    EndWidth = 18,
                    Radius = "90%"
                }
            },
            MajorTicks = new CircularGaugeTick
            {
                Interval = 20,
                Height = 12
            },
            LabelStyle = new CircularGaugeLabel
            {
                Format = "{value}%"
            }
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 65,
            Type = GaugePointerType.Needle,
            Color = "#333333",
            PointerWidth = 8
        });
    })
    .Render();
```

This creates a professional health status gauge with color-coded zones helping users immediately understand system state.
