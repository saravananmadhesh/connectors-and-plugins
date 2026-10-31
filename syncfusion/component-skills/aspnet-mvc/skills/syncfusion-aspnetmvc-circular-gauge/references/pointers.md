# Pointers and Animations

## Table of Contents
- [Pointer Types](#pointer-types)
- [Needle Pointers](#needle-pointers)
- [RangeBar Pointers](#rangebar-pointers)
- [Marker Pointers](#marker-pointers)
- [Image Pointers](#image-pointers)
- [Multiple Pointers](#multiple-pointers)
- [Animations](#animations)
- [Dragging Pointers](#dragging-pointers)

## Pointer Types

Pointers indicate values on the gauge axis. Choose from 4 types based on your use case:

| Type | Use Case | Example |
|------|----------|---------|
| **Needle** | Traditional speedometer-style indicator | Speed gauges, tachometers |
| **RangeBar** | Shows progress from start to current value | Progress bars, volume levels |
| **Marker** | Simple dot or icon marker | Checkpoints, status indicators |
| **Image** | Custom image as pointer | Brand logos, custom icons |

## Needle Pointers

Most common pointer type with traditional appearance:

### Basic Needle

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 65,
        Type = GaugePointerType.Needle
    });
})
```

### Styled Needle

Customize the needle appearance:

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 65,
        Type = GaugePointerType.Needle,
        Color = "#1E90FF",              // Needle color
        PointerWidth = 8,               // Needle thickness
        Radius = "80%",                 // Needle length
        NeedleStartWidth = 6,           // Start width
        NeedleEndWidth = 4              // End width (taper)
    });
})
```

### Needle with Cap

Add a knob/cap at the needle base:

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 50,
        Type = GaugePointerType.Needle,
        Color = "#000000",
        Cap = new PointerCap
        {
            Radius = 8,
            Color = "#1E90FF",
            Border = new PointerCapBorder
            {
                Color = "#000000",
                Width = 2
            }
        }
    });
})
```

### Needle with Tail

Add a trailing line behind the needle:

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 45,
        Type = GaugePointerType.Needle,
        Color = "#FF5733",
        NeedleTail = new PointerTail
        {
            Length = "30%",          // Tail length
            Color = "#FF5733"
        }
    });
})
```

### Complete Needle Example

```csharp
@Html.EJS().CircularGauge("gauge")
    .Title("Speedometer")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 120
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 75,
            Type = GaugePointerType.Needle,
            Color = "#1E90FF",
            PointerWidth = 10,
            NeedleStartWidth = 8,
            NeedleEndWidth = 4,
            Cap = new PointerCap
            {
                Radius = 10,
                Color = "#1E90FF",
                Border = new PointerCapBorder
                {
                    Color = "#333",
                    Width = 2
                }
            },
            NeedleTail = new PointerTail
            {
                Length = "25%",
                Color = "#1E90FF"
            }
        });
    })
    .Render();
```

## RangeBar Pointers

Progress bar style pointer - shows value as a filled arc:

### Basic RangeBar

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 60,
        Type = GaugePointerType.RangeBar
    });
})
```

### Styled RangeBar

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 75,
        Type = GaugePointerType.RangeBar,
        Color = "#00AA00",          // Bar color
        PointerWidth = 15,          // Bar thickness
        Border = new PointerBorder
        {
            Color = "#333333",
            Width = 2
        }
    });
})
```

### RangeBar with Rounded Corners

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 65,
        Type = GaugePointerType.RangeBar,
        Color = "#FF6B35",
        PointerWidth = 20,
        RoundedCornerRadius = 10  // Arc style ends
    });
})
```

### Multiple Color Ranges with RangeBar

```csharp
.Pointers(pointers =>
{
    // Green section (0-33%)
    pointers.Add(new CircularGaugePointer
    {
        Value = 33,
        Type = GaugePointerType.RangeBar,
        Color = "#00AA00",
        PointerWidth = 12
    });
    
    // Yellow section (33-66%)
    pointers.Add(new CircularGaugePointer
    {
        Value = 66,
        Type = GaugePointerType.RangeBar,
        Color = "#FFAA00",
        PointerWidth = 12
    });
})
```

## Marker Pointers

Simple icon/dot markers on gauge:

### Basic Marker

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 45,
        Type = GaugePointerType.Marker
    });
})
```

### Marker Styles

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 50,
        Type = GaugePointerType.Marker,
        MarkerShape = GaugeShape.Circle,    // Circle, Rectangle, Triangle, Diamond, etc.
        Color = "#FF5733",
        Border = new PointerBorder
        {
            Color = "#333",
            Width = 2
        },
        MarkerWidth = 15,
        MarkerHeight = 15
    });
})
```

### Marker Shapes

```csharp
// Circle
MarkerShape = GaugeShape.Circle

// Rectangle
MarkerShape = GaugeShape.Rectangle

// Triangle
MarkerShape = GaugeShape.Triangle

// Diamond
MarkerShape = GaugeShape.Diamond

// Star
MarkerShape = GaugeShape.Star
```

## Image Pointers

Use custom images as pointers:

### Image Pointer Setup

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 50,
        Type = GaugePointerType.Image,
        ImageUrl = "~/images/pointer.png",  // Path to image
        ImageHeight = 30,
        ImageWidth = 30
    });
})
```

**Image Requirements:**
- PNG or SVG format recommended
- 30x30 to 60x60 pixels ideal size
- Transparent background for best results

### Image Positioning

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 60,
        Type = GaugePointerType.Image,
        ImageUrl = "~/images/logo.png",
        ImageHeight = 40,
        ImageWidth = 40,
        Radius = "90%",     // Position on axis
        Offset = 0          // Fine-tune position
    });
})
```

## Multiple Pointers

Display multiple pointers on same gauge (compare values):

### Two Needles

```csharp
.Pointers(pointers =>
{
    // Current value (primary)
    pointers.Add(new CircularGaugePointer
    {
        Value = 65,
        Type = GaugePointerType.Needle,
        Color = "#1E90FF",
        PointerWidth = 8
    });
    
    // Target value (secondary)
    pointers.Add(new CircularGaugePointer
    {
        Value = 80,
        Type = GaugePointerType.Needle,
        Color = "#FF5733",
        PointerWidth = 4
    });
})
```

### Mixed Pointer Types

```csharp
.Pointers(pointers =>
{
    // Needle for actual value
    pointers.Add(new CircularGaugePointer
    {
        Value = 60,
        Type = GaugePointerType.Needle,
        Color = "#00AA00"
    });
    
    // Marker for target
    pointers.Add(new CircularGaugePointer
    {
        Value = 75,
        Type = GaugePointerType.Marker,
        MarkerShape = GaugeShape.Diamond,
        Color = "#FF6B35"
    });
    
    // RangeBar for progress
    pointers.Add(new CircularGaugePointer
    {
        Value = 45,
        Type = GaugePointerType.RangeBar,
        Color = "#CCCCCC",
        PointerWidth = 5
    });
})
```

### Pointer on Different Axis

```csharp
.Pointers(pointers =>
{
    // Pointer on first axis
    pointers.Add(new CircularGaugePointer
    {
        Value = 25,
        AxisIndex = 0,  // First axis
        Type = GaugePointerType.Needle
    });
    
    // Pointer on second axis
    pointers.Add(new CircularGaugePointer
    {
        Value = 77,
        AxisIndex = 1,  // Second axis
        Type = GaugePointerType.Needle,
        Color = "#FF5733"
    });
})
```

## Animations

### Enable Global Animation

Animate all gauge elements when loading:

```csharp
@Html.EJS().CircularGauge("gauge")
    .AnimationDuration = 1500  // Milliseconds
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 65,
            Type = GaugePointerType.Needle
        });
    })
    .Render();
```

**Animation Sequence:**
1. Axis lines animate
2. Ticks and labels animate
3. Ranges animate
4. Pointers animate

### Pointer Animation

Individual pointer animation (separate from global):

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 65,
        Type = GaugePointerType.Needle,
        Animation = new PointerAnimation
        {
            Enable = true,
            Duration = 1000  // Milliseconds
        }
    });
})
```

### Disable Animation

```csharp
@Html.EJS().CircularGauge("gauge")
    .AnimationDuration = 0  // Disabled (default)
    .Render();
```

## Dragging Pointers

Enable users to drag pointers to change values:

### Enable Pointer Drag

```csharp
@Html.EJS().CircularGauge("interactiveGauge")
    .EnablePointerDrag = true
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 50,
            Type = GaugePointerType.Needle
        });
    })
    .Render();
```

### Handle Pointer Drag Events

```csharp
@Html.EJS().CircularGauge("gauge")
    .EnablePointerDrag = true
    .PointerDrag("onPointerDrag")
    .Render();
```

In C# controller or view code-behind:

```javascript
<script>
    function onPointerDrag(args) {
        console.log("Current value: " + args.currentValue);
        console.log("Previous value: " + args.previousValue);
        
        // Update UI or perform action
        document.getElementById("currentValue").innerText = args.currentValue;
    }
</script>
```

### Drag Event Properties

- `currentValue` - Value after drag
- `previousValue` - Value before drag
- `pointerIndex` - Which pointer (if multiple)

## Complete Multi-Pointer Example with Animation

```csharp
@Html.EJS().CircularGauge("performanceGauge")
    .Title("Performance Dashboard")
    .AnimationDuration = 1200
    .EnablePointerDrag = true
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            MajorTicks = new CircularGaugeTick
            {
                Interval = 20
            }
        });
    })
    .Pointers(pointers =>
    {
        // Target (marker)
        pointers.Add(new CircularGaugePointer
        {
            Value = 85,
            Type = GaugePointerType.Marker,
            MarkerShape = GaugeShape.Diamond,
            Color = "#FF6B35",
            MarkerWidth = 12,
            MarkerHeight = 12
        });
        
        // Current (needle)
        pointers.Add(new CircularGaugePointer
        {
            Value = 72,
            Type = GaugePointerType.Needle,
            Color = "#1E90FF",
            PointerWidth = 8,
            Animation = new PointerAnimation
            {
                Enable = true,
                Duration = 1200
            }
        });
    })
    .Render();
```

This creates an interactive dashboard showing current vs target performance with smooth animations.
