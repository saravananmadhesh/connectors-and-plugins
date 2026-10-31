# Axes and Scales Configuration

## Table of Contents
- [Setting Axis Ranges](#setting-axis-ranges)
- [Controlling Direction](#controlling-direction)
- [Positioning Axes](#positioning-axes)
- [Configuring Ticks](#configuring-ticks)
- [Custom Label Formatting](#custom-label-formatting)
- [Smart Labels](#smart-labels)
- [Multiple Axes](#multiple-axes)

## Setting Axis Ranges

### Basic Range Configuration

Define what values your gauge displays using `Minimum` and `Maximum`:

```csharp
@Html.EJS().CircularGauge("speedGauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 120  // Speed gauge 0-120 km/h
        });
    })
    .Render();
```

### Custom Range Examples

**Temperature Gauge (-20 to 50 °C):**
```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = -20,
    Maximum = 50
});
```

**Percentage Gauge (0 to 100%):**
```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100
});
```

**RPM Gauge (0 to 7000):**
```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 7000
});
```

## Controlling Direction

### Clockwise Rendering (Default)

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    Direction = GaugeDirection.ClockWise
});
```

### Counter-Clockwise Rendering

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    Direction = GaugeDirection.AntiClockWise
});
```

**Use Case:** AntiClockWise useful for RTL (Right-to-Left) layouts or specific cultural preferences.

## Positioning Axes

### Start and End Angles

Control where the gauge scale begins and ends. Angles are in degrees (0-360):

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    StartAngle = 200,    // Start position (in degrees)
    EndAngle = 160       // End position (in degrees)
});
```

**Common Configurations:**

**Full Circle:**
```csharp
StartAngle = 0,
EndAngle = 360
```

**Semi-Circle (Bottom Half):**
```csharp
StartAngle = 180,
EndAngle = 0
```

**Quarter Circle (Bottom-Right):**
```csharp
StartAngle = 270,
EndAngle = 0
```

**Top Half:**
```csharp
StartAngle = 0,
EndAngle = 180
```

### Axis Radius

Control the gauge size in pixels or percentage:

**In Pixels:**
```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    Radius = "300px"  // Exact size
});
```

**In Percentage:**
```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    Radius = "90%"    // 90% of available space
});
```

**Why percentage:** Allows responsive sizing - gauge adapts to container size.

## Configuring Ticks

Ticks mark values on the gauge axis. Configure major and minor ticks separately:

### Major Ticks (Primary Markers)

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    MajorTicks = new CircularGaugeTick
    {
        Interval = 20,      // Tick every 20 units
        Height = 15,        // Tick line height
        Width = 2,          // Tick line width
        Color = "#000000"   // Tick color
    }
});
```

### Minor Ticks (Secondary Markers)

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    MinorTicks = new CircularGaugeTick
    {
        Interval = 5,       // Tick every 5 units
        Height = 8,         // Shorter than major ticks
        Width = 1,
        Color = "#999999"
    }
});
```

### Tick Positioning

Position ticks inside or outside the axis:

```csharp
MajorTicks = new CircularGaugeTick
{
    Interval = 20,
    Position = GaugeElementPosition.Outside,  // or Inside
    Offset = 5  // Distance from axis line (pixels)
}
```

### Complete Ticks Example

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    MajorTicks = new CircularGaugeTick
    {
        Interval = 10,
        Height = 15,
        Width = 2,
        Color = "#000000",
        Position = GaugeElementPosition.Outside
    },
    MinorTicks = new CircularGaugeTick
    {
        Interval = 2,
        Height = 6,
        Width = 1,
        Color = "#cccccc",
        Position = GaugeElementPosition.Outside
    }
});
```

## Custom Label Formatting

### Basic Labels

Labels display axis values. Configure their appearance:

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    LabelStyle = new CircularGaugeLabel
    {
        Format = "n0",      // Number format (no decimals)
        Color = "#333333",
        FontFamily = "Segoe UI",
        FontSize = "14px"
    }
});
```

### Custom Label Format

Format values with units or custom patterns:

```csharp
// Temperature labels with degree symbol
LabelStyle = new CircularGaugeLabel
{
    Format = "{value}°C",
    AutoAngle = true  // Auto-rotate labels
}
```

**Format Examples:**
- `"n0"` - Whole numbers (10, 20, 30)
- `"n2"` - Two decimals (10.00, 20.50)
- `"{value}%"` - With percentage (10%, 20%)
- `"{value}°"` - With degree (10°, 20°)
- `"{value}mph"` - With unit (10mph, 20mph)

### Label Positioning

```csharp
LabelStyle = new CircularGaugeLabel
{
    Position = GaugeElementPosition.Inside,  // or Outside
    Offset = -30,                            // Distance from axis (pixels)
    AutoAngle = true                         // Follow axis curve
}
```

## Smart Labels

### Hide Overlapping Labels

When labels might overlap, enable smart label logic:

```csharp
axes.Add(new CircularGaugeAxis
{
    Minimum = 0,
    Maximum = 100,
    LabelStyle = new CircularGaugeLabel
    {
        HiddenLabel = "First"  // Skip overlapping labels
    }
});
```

### Label Auto-Angle

Labels automatically adjust angle to follow gauge curve:

```csharp
LabelStyle = new CircularGaugeLabel
{
    AutoAngle = true  // Labels curve with gauge
}
```

## Multiple Axes

Add multiple axes to show different scales on same gauge:

```csharp
@Html.EJS().CircularGauge("multiAxisGauge")
    .Axes(axes =>
    {
        // First axis (Celsius)
        axes.Add(new CircularGaugeAxis
        {
            Minimum = -20,
            Maximum = 50,
            StartAngle = 0,
            EndAngle = 180,
            LabelStyle = new CircularGaugeLabel
            {
                Format = "{value}°C"
            }
        });
        
        // Second axis (Fahrenheit)
        axes.Add(new CircularGaugeAxis
        {
            Minimum = -4,
            Maximum = 122,
            StartAngle = 180,
            EndAngle = 360,
            LabelStyle = new CircularGaugeLabel
            {
                Format = "{value}°F"
            }
        });
    })
    .Render();
```

**Use Cases for Multiple Axes:**
- Temperature in Celsius and Fahrenheit
- Speed in km/h and mph
- Revenue in dollars and euros
- Performance metrics with different scales

### Multi-Axis Pointers

Add pointers to different axes:

```csharp
.Pointers(pointers =>
{
    // Pointer on first axis (Celsius)
    pointers.Add(new CircularGaugePointer
    {
        Value = 25,
        AxisIndex = 0,  // First axis
        Type = GaugePointerType.Needle
    });
    
    // Pointer on second axis (Fahrenheit)
    pointers.Add(new CircularGaugePointer
    {
        Value = 77,
        AxisIndex = 1,  // Second axis
        Type = GaugePointerType.Needle,
        Color = "#FF5733"
    });
})
```

## Complete Multi-Configuration Example

```csharp
@Html.EJS().CircularGauge("speedometer")
    .Title("Speed")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 120,
            StartAngle = 200,
            EndAngle = 160,
            Direction = GaugeDirection.ClockWise,
            Radius = "90%",
            MajorTicks = new CircularGaugeTick
            {
                Interval = 20,
                Height = 12,
                Position = GaugeElementPosition.Outside
            },
            MinorTicks = new CircularGaugeTick
            {
                Interval = 5,
                Height = 6,
                Position = GaugeElementPosition.Outside
            },
            LabelStyle = new CircularGaugeLabel
            {
                Format = "{value}",
                Position = GaugeElementPosition.Outside,
                AutoAngle = true
            }
        });
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

This configuration creates a complete speedometer with clear value markers and readable labels.
