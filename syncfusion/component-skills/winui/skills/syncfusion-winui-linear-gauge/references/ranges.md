# Ranges in WinUI Linear Gauge

Ranges are visual elements that help quickly visualize where values fall on the axis by providing color-coded segments. This guide covers range configuration, styling, positioning, and advanced features.

## Table of Contents
- [Basic Range Configuration](#basic-range-configuration)
- [Range Width Customization](#range-width-customization)
- [Range Color Customization](#range-color-customization)
- [Range Positioning](#range-positioning)
- [Using Range Colors for Axis](#using-range-colors-for-axis)
- [Range Child Content](#range-child-content)

## Basic Range Configuration

### Setting Start and End Values

Ranges are defined by `StartValue` and `EndValue` properties that specify the range on the axis.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="30"
                                        EndValue="65" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();

LinearGaugeRange gaugeRange = new LinearGaugeRange();
gaugeRange.StartValue = 30;
gaugeRange.EndValue = 65;
sfLinearGauge.Axis.Ranges.Add(gaugeRange);

this.Content = sfLinearGauge;
```

**Result:** A range spanning from value 30 to 65 on the axis.

### Multiple Ranges

Add multiple ranges to create color-coded value categories.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Maximum="140" Interval="10">
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="0"
                                        EndValue="50"
                                        Background="Red" />
                <gauge:LinearGaugeRange StartValue="50"
                                        EndValue="100"
                                        Background="Orange" />
                <gauge:LinearGaugeRange StartValue="100"
                                        EndValue="140"
                                        Background="Green" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.Maximum = 140;
sfLinearGauge.Axis.Interval = 10;

// Red range (0-50)
LinearGaugeRange range1 = new LinearGaugeRange
{
    StartValue = 0,
    EndValue = 50,
    Background = new SolidColorBrush(Colors.Red)
};
sfLinearGauge.Axis.Ranges.Add(range1);

// Orange range (50-100)
LinearGaugeRange range2 = new LinearGaugeRange
{
    StartValue = 50,
    EndValue = 100,
    Background = new SolidColorBrush(Colors.Orange)
};
sfLinearGauge.Axis.Ranges.Add(range2);

// Green range (100-140)
LinearGaugeRange range3 = new LinearGaugeRange
{
    StartValue = 100,
    EndValue = 140,
    Background = new SolidColorBrush(Colors.Green)
};
sfLinearGauge.Axis.Ranges.Add(range3);

this.Content = sfLinearGauge;
```

**Use Case:** Temperature zones (cold/moderate/hot), performance levels (poor/good/excellent), battery levels (critical/low/good).

## Range Width Customization

### Equal Range Width

Create uniform-width ranges using `StartWidth` and `EndWidth` properties.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="30"
                                        EndValue="65"
                                        StartWidth="10"
                                        EndWidth="10" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();

LinearGaugeRange gaugeRange = new LinearGaugeRange
{
    StartValue = 30,
    EndValue = 65,
    StartWidth = 10,
    EndWidth = 10
};
sfLinearGauge.Axis.Ranges.Add(gaugeRange);

this.Content = sfLinearGauge;
```

**Result:** A range with consistent 10-pixel width throughout.

### Variable Range Width

Create tapered or expanding ranges using different `StartWidth`, `MidWidth`, and `EndWidth` values.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="10"
                                        EndValue="90"
                                        StartWidth="0"
                                        MidWidth="40"
                                        EndWidth="10" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();

LinearGaugeRange gaugeRange = new LinearGaugeRange
{
    StartValue = 10,
    EndValue = 90,
    StartWidth = 0,      // Tapers from 0
    MidWidth = 40,       // Expands to 40 at middle
    EndWidth = 10        // Narrows to 10 at end
};
sfLinearGauge.Axis.Ranges.Add(gaugeRange);

this.Content = sfLinearGauge;
```

**Result:** A range that starts narrow, expands in the middle, and narrows again at the end.

**Note:** `MidWidth` only takes effect when explicitly set (not at default value).

### Width Guidelines

- **Default Width:** If not specified, range width matches axis line thickness
- **StartWidth:** Width at the starting value
- **MidWidth:** Width at the midpoint (optional, creates smooth transitions)
- **EndWidth:** Width at the ending value
- **Units:** All width values are in pixels

**Common Patterns:**
```csharp
// Thin line range
StartWidth = 2, EndWidth = 2

// Expanding range
StartWidth = 5, EndWidth = 30

// Tapered range
StartWidth = 30, EndWidth = 5

// Diamond shape
StartWidth = 5, MidWidth = 40, EndWidth = 5
```

## Range Color Customization

### Solid Color Background

Set a solid color using the `Background` property.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="30"
                                        EndValue="65"
                                        Background="Indigo" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearGaugeRange gaugeRange = new LinearGaugeRange
{
    StartValue = 30,
    EndValue = 65,
    Background = new SolidColorBrush(Colors.Indigo)
};
```

### Gradient Color Background

Create smooth color transitions using `GradientStops` collection.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="30"
                                        EndValue="65">
                    <gauge:LinearGaugeRange.GradientStops>
                        <gauge:GaugeGradientStop Value="39"
                                                 Color="#FFBC4E9C" />
                        <gauge:GaugeGradientStop Value="56"
                                                 Color="#FFF80759" />
                    </gauge:LinearGaugeRange.GradientStops>
                </gauge:LinearGaugeRange>
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();

LinearGaugeRange gaugeRange = new LinearGaugeRange
{
    StartValue = 30,
    EndValue = 65
};

GaugeGradientStop stop1 = new GaugeGradientStop
{
    Value = 39,
    Color = Color.FromArgb(255, 188, 78, 156)
};
gaugeRange.GradientStops.Add(stop1);

GaugeGradientStop stop2 = new GaugeGradientStop
{
    Value = 56,
    Color = Color.FromArgb(255, 248, 7, 89)
};
gaugeRange.GradientStops.Add(stop2);

sfLinearGauge.Axis.Ranges.Add(gaugeRange);
this.Content = sfLinearGauge;
```

**GradientStop Properties:**
- `Value` - Axis value where this color appears
- `Color` - Color at this value point

**Multi-Color Gradient Example:**
```xml
<gauge:LinearGaugeRange StartValue="0" EndValue="100">
    <gauge:LinearGaugeRange.GradientStops>
        <gauge:GaugeGradientStop Value="0" Color="Blue" />
        <gauge:GaugeGradientStop Value="33" Color="Cyan" />
        <gauge:GaugeGradientStop Value="66" Color="Yellow" />
        <gauge:GaugeGradientStop Value="100" Color="Red" />
    </gauge:LinearGaugeRange.GradientStops>
</gauge:LinearGaugeRange>
```

**Use Cases:**
- Temperature gradients (blue → yellow → red)
- Performance indicators (red → yellow → green)
- Data heatmaps with smooth transitions

## Range Positioning

The `RangePosition` property controls where the range appears relative to the axis line.

### Inside Position (Default)

Range appears inside the axis line boundary.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="30"
                                        EndValue="65"
                                        RangePosition="Inside" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Outside Position

Range appears outside the axis line boundary (default behavior if not specified).

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="30"
                                        EndValue="65"
                                        RangePosition="Outside" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Cross Position

Range is centered on the axis line, overlapping both inside and outside.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="30"
                                        EndValue="65"
                                        RangePosition="Cross" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearGaugeRange gaugeRange = new LinearGaugeRange
{
    StartValue = 30,
    EndValue = 65,
    RangePosition = GaugeElementPosition.Cross
};
```

**Positioning Guidelines:**
- **Inside:** Best for background highlights behind pointers
- **Outside:** Good for additional information or labels
- **Cross:** Creates bold visual separation

## Using Range Colors for Axis

The `UseRangeColorForAxis` property applies range colors to axis labels and ticks.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowAxisLine="False"
                          Interval="10"
                          MinorTicksPerInterval="4"
                          LabelPosition="Outside"
                          TickPosition="Outside"
                          UseRangeColorForAxis="True">
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange EndValue="33"
                                        Background="#FFBC5A34"
                                        RangePosition="Inside" />
                <gauge:LinearGaugeRange StartValue="33"
                                        EndValue="66"
                                        Background="#FF3F7BAB"
                                        RangePosition="Inside" />
                <gauge:LinearGaugeRange StartValue="66"
                                        EndValue="100"
                                        Background="#FFB75772"
                                        RangePosition="Inside" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.ShowAxisLine = false;
sfLinearGauge.Axis.Interval = 10;
sfLinearGauge.Axis.MinorTicksPerInterval = 4;
sfLinearGauge.Axis.LabelPosition = GaugeLabelsPosition.Outside;
sfLinearGauge.Axis.TickPosition = GaugeElementPosition.Outside;
sfLinearGauge.Axis.UseRangeColorForAxis = true;

LinearGaugeRange range1 = new LinearGaugeRange
{
    EndValue = 33,
    RangePosition = GaugeElementPosition.Inside,
    Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xBC, 0x5A, 0x34))
};
sfLinearGauge.Axis.Ranges.Add(range1);

LinearGaugeRange range2 = new LinearGaugeRange
{
    StartValue = 33,
    EndValue = 66,
    RangePosition = GaugeElementPosition.Inside,
    Background = new SolidColorBrush(Color.FromArgb(0xFF, 0x3F, 0x7B, 0xAB))
};
sfLinearGauge.Axis.Ranges.Add(range2);

LinearGaugeRange range3 = new LinearGaugeRange
{
    StartValue = 66,
    EndValue = 100,
    RangePosition = GaugeElementPosition.Inside,
    Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xB7, 0x57, 0x72))
};
sfLinearGauge.Axis.Ranges.Add(range3);

this.Content = sfLinearGauge;
```

**Result:** Labels and ticks are colored to match their corresponding range colors.

**Use Case:** Create cohesive color-coded gauges where all elements share the same color scheme.

## Range Child Content

The `Child` property allows adding custom content inside the range.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowAxisLine="False"
                          Interval="10"
                          MinorTicksPerInterval="4"
                          LabelPosition="Outside"
                          TickPosition="Outside"
                          UseRangeColorForAxis="True">
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange EndValue="33"
                                        StartWidth="30"
                                        EndWidth="30"
                                        Background="#FFFE2A25"
                                        RangePosition="Inside">
                    <gauge:LinearGaugeRange.Child>
                        <TextBlock Text="Slow"
                                   Foreground="White"
                                   HorizontalAlignment="Center"
                                   VerticalAlignment="Center" />
                    </gauge:LinearGaugeRange.Child>
                </gauge:LinearGaugeRange>
                
                <gauge:LinearGaugeRange StartValue="33"
                                        EndValue="66"
                                        StartWidth="30"
                                        EndWidth="30"
                                        Background="#FFFFBA00"
                                        RangePosition="Inside">
                    <gauge:LinearGaugeRange.Child>
                        <TextBlock Text="Moderate"
                                   HorizontalAlignment="Center"
                                   VerticalAlignment="Center" />
                    </gauge:LinearGaugeRange.Child>
                </gauge:LinearGaugeRange>
                
                <gauge:LinearGaugeRange StartValue="66"
                                        EndValue="100"
                                        StartWidth="30"
                                        EndWidth="30"
                                        Background="#FF00AB47"
                                        RangePosition="Inside">
                    <gauge:LinearGaugeRange.Child>
                        <TextBlock Text="Fast"
                                   Foreground="White"
                                   HorizontalAlignment="Center"
                                   VerticalAlignment="Center" />
                    </gauge:LinearGaugeRange.Child>
                </gauge:LinearGaugeRange>
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.ShowAxisLine = false;
sfLinearGauge.Axis.Interval = 10;
sfLinearGauge.Axis.MinorTicksPerInterval = 4;
sfLinearGauge.Axis.LabelPosition = GaugeLabelsPosition.Outside;
sfLinearGauge.Axis.TickPosition = GaugeElementPosition.Outside;
sfLinearGauge.Axis.UseRangeColorForAxis = true;

// Range 1 with "Slow" label
LinearGaugeRange range1 = new LinearGaugeRange
{
    EndValue = 33,
    StartWidth = 30,
    EndWidth = 30,
    RangePosition = GaugeElementPosition.Inside,
    Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xFE, 0x2A, 0x27))
};

TextBlock range1Child = new TextBlock
{
    Text = "Slow",
    Foreground = new SolidColorBrush(Colors.White),
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Center
};
range1.Child = range1Child;
sfLinearGauge.Axis.Ranges.Add(range1);

// Range 2 with "Moderate" label
LinearGaugeRange range2 = new LinearGaugeRange
{
    StartValue = 33,
    EndValue = 66,
    StartWidth = 30,
    EndWidth = 30,
    RangePosition = GaugeElementPosition.Inside,
    Background = new SolidColorBrush(Color.FromArgb(0xFF, 0xFF, 0xBA, 0x00))
};

TextBlock range2Child = new TextBlock
{
    Text = "Moderate",
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Center
};
range2.Child = range2Child;
sfLinearGauge.Axis.Ranges.Add(range2);

// Range 3 with "Fast" label
LinearGaugeRange range3 = new LinearGaugeRange
{
    StartValue = 66,
    EndValue = 100,
    StartWidth = 30,
    EndWidth = 30,
    RangePosition = GaugeElementPosition.Inside,
    Background = new SolidColorBrush(Color.FromArgb(0xFF, 0x00, 0xAB, 0x47))
};

TextBlock range3Child = new TextBlock
{
    Text = "Fast",
    Foreground = new SolidColorBrush(Colors.White),
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Center
};
range3.Child = range3Child;
sfLinearGauge.Axis.Ranges.Add(range3);

this.Content = sfLinearGauge;
```

**Child Content Options:**
- TextBlock - Labels, descriptions
- Image - Icons, symbols
- Custom controls - Any UIElement

**Best Practices:**
- Set sufficient range width (StartWidth/EndWidth) to accommodate content
- Use HorizontalAlignment and VerticalAlignment for positioning
- Consider foreground color for readability against range background

## Best Practices

1. **Continuous Ranges** - Avoid gaps between ranges for seamless color transitions
2. **Meaningful Colors** - Use intuitive colors (red=bad, green=good, yellow=warning)
3. **Consistent Widths** - Keep range widths consistent unless tapered effect is desired
4. **Range Count** - Use 3-5 ranges for optimal readability
5. **Position Consistently** - Keep all ranges in same position (Inside/Outside/Cross)
6. **Gradient Use** - Use gradients for continuous data, solid colors for discrete categories
7. **Child Content** - Only add child content to wide ranges (30+ pixels recommended)

## Common Scenarios

### Temperature Gauge with 3 Zones
```xml
<gauge:LinearAxis Minimum="-20" Maximum="50" Interval="10">
    <gauge:LinearAxis.Ranges>
        <gauge:LinearGaugeRange StartValue="-20" EndValue="10" Background="LightBlue" />
        <gauge:LinearGaugeRange StartValue="10" EndValue="25" Background="LightGreen" />
        <gauge:LinearGaugeRange StartValue="25" EndValue="50" Background="OrangeRed" />
    </gauge:LinearAxis.Ranges>
</gauge:LinearAxis>
```

### Battery Level with Gradient
```xml
<gauge:LinearAxis>
    <gauge:LinearAxis.Ranges>
        <gauge:LinearGaugeRange StartValue="0" EndValue="100">
            <gauge:LinearGaugeRange.GradientStops>
                <gauge:GaugeGradientStop Value="0" Color="Red" />
                <gauge:GaugeGradientStop Value="20" Color="Orange" />
                <gauge:GaugeGradientStop Value="50" Color="Yellow" />
                <gauge:GaugeGradientStop Value="100" Color="Green" />
            </gauge:LinearGaugeRange.GradientStops>
        </gauge:LinearGaugeRange>
    </gauge:LinearAxis.Ranges>
</gauge:LinearAxis>
```

### Speed Zones with Labels
```xml
<gauge:LinearAxis Maximum="200">
    <gauge:LinearAxis.Ranges>
        <gauge:LinearGaugeRange EndValue="60"
                                StartWidth="40"
                                EndWidth="40"
                                Background="Green"
                                RangePosition="Inside">
            <gauge:LinearGaugeRange.Child>
                <TextBlock Text="SAFE" Foreground="White" HorizontalAlignment="Center" VerticalAlignment="Center" />
            </gauge:LinearGaugeRange.Child>
        </gauge:LinearGaugeRange>
        
        <gauge:LinearGaugeRange StartValue="60"
                                EndValue="120"
                                StartWidth="40"
                                EndWidth="40"
                                Background="Yellow"
                                RangePosition="Inside">
            <gauge:LinearGaugeRange.Child>
                <TextBlock Text="CAUTION" HorizontalAlignment="Center" VerticalAlignment="Center" />
            </gauge:LinearGaugeRange.Child>
        </gauge:LinearGaugeRange>
        
        <gauge:LinearGaugeRange StartValue="120"
                                EndValue="200"
                                StartWidth="40"
                                EndWidth="40"
                                Background="Red"
                                RangePosition="Inside">
            <gauge:LinearGaugeRange.Child>
                <TextBlock Text="DANGER" Foreground="White" HorizontalAlignment="Center" VerticalAlignment="Center" />
            </gauge:LinearGaugeRange.Child>
        </gauge:LinearGaugeRange>
    </gauge:LinearAxis.Ranges>
</gauge:LinearAxis>
```
