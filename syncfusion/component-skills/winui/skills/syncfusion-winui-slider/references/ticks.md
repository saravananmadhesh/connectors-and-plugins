# Ticks

## Table of Contents
- [Overview](#overview)
- [Show Major Ticks](#show-major-ticks)
- [Show Minor Ticks](#show-minor-ticks)
- [Tick Length](#tick-length)
- [Tick Placement](#tick-placement)
- [Tick Offset](#tick-offset)
- [Tick Styling](#tick-styling)
- [Common Use Cases](#common-use-cases)

Ticks are visual markers that indicate interval points along the slider track, helping users identify specific values.

## Overview

Ticks provide visual reference points on the slider track:
- **Major Ticks:** Larger markers at main intervals (matches label positions)
- **Minor Ticks:** Smaller markers between major ticks for finer granularity

**Key Features:**
- Customizable length and thickness
- Placement control (before/after track)
- Separate styling for major and minor ticks
- Adjustable spacing from track
- Template-based customization

## Show Major Ticks

Enable major ticks at specified intervals using the `ShowTicks` property.

### Property

- **ShowTicks** (bool): Display major ticks at intervals (default: false)

### Basic Example

```xml
<slider:SfSlider Minimum="0"
                 Maximum="10"
                 Interval="2"
                 Value="4"
                 ShowTicks="True"
                 ShowLabels="True"
                 Width="400" />
```

```csharp
SfSlider slider = new SfSlider();
slider.Minimum = 0;
slider.Maximum = 10;
slider.Interval = 2;
slider.Value = 4;
slider.ShowTicks = true;
slider.ShowLabels = true;
```

With these settings, major ticks appear at: 0, 2, 4, 6, 8, 10

### With Custom Interval

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="25"
                 ShowTicks="True"
                 ShowLabels="True"
                 Width="400" />
```

Ticks appear at: 0, 25, 50, 75, 100

## Show Minor Ticks

Minor ticks appear between major ticks for additional visual reference.

### Property

- **MinorTicksPerInterval** (int): Number of minor ticks between major ticks (default: 1)

### Basic Example

```xml
<slider:SfSlider Minimum="0"
                 Maximum="10"
                 Interval="2"
                 Value="4"
                 MinorTicksPerInterval="2"
                 ShowTicks="True"
                 ShowLabels="True"
                 Width="400" />
```

```csharp
slider.MinorTicksPerInterval = 2;
slider.ShowTicks = true;
```

With `Interval="2"` and `MinorTicksPerInterval="2"`:
- Major ticks at: 0, 2, 4, 6, 8, 10
- Minor ticks at: 0.67, 1.33, 2.67, 3.33, etc. (2 ticks between each major interval)

### No Minor Ticks

```xml
<slider:SfSlider ShowTicks="True"
                 MinorTicksPerInterval="0"
                 Width="400" />
```

### Multiple Minor Ticks

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="20"
                 MinorTicksPerInterval="4"
                 ShowTicks="True"
                 Width="400" />
```

This creates 4 minor ticks between each major tick at 20-unit intervals.

## Tick Length

Customize the size of major and minor ticks.

### Properties

- **MajorTickLength** (double): Length of major ticks (default: 10)
- **MinorTickLength** (double): Length of minor ticks (default: 5)

### Basic Example

```xml
<slider:SfSlider Minimum="0"
                 Maximum="10"
                 Interval="2"
                 Value="4"
                 MinorTicksPerInterval="2"
                 MajorTickLength="15"
                 MinorTickLength="10"
                 ShowTicks="True"
                 ShowLabels="True"
                 Width="400" />
```

```csharp
slider.MajorTickLength = 15;
slider.MinorTickLength = 10;
slider.ShowTicks = true;
```

### Prominent Major Ticks

```xml
<slider:SfSlider MajorTickLength="20"
                 MinorTickLength="8"
                 ShowTicks="True"
                 Width="400" />
```

### Subtle Ticks

```xml
<slider:SfSlider MajorTickLength="6"
                 MinorTickLength="3"
                 ShowTicks="True"
                 Width="400" />
```

## Tick Placement

Control where ticks appear relative to the track.

### Property

- **TickPlacement** (Placement): Position of ticks (default: After)
  - **After**: Below track (horizontal) or right of track (vertical)
  - **Before**: Above track (horizontal) or left of track (vertical)

### Placement After (Default)

```xml
<slider:SfSlider ShowTicks="True"
                 TickPlacement="After"
                 Value="50"
                 Width="400" />
```

### Placement Before

```xml
<slider:SfSlider ShowTicks="True"
                 TickPlacement="Before"
                 Value="50"
                 Width="400" />
```

```csharp
slider.ShowTicks = true;
slider.TickPlacement = Placement.Before;
```

### Vertical Slider Tick Placement

```xml
<!-- Ticks on the right -->
<slider:SfSlider Orientation="Vertical"
                 ShowTicks="True"
                 TickPlacement="After"
                 Height="300" />

<!-- Ticks on the left -->
<slider:SfSlider Orientation="Vertical"
                 ShowTicks="True"
                 TickPlacement="Before"
                 Height="300" />
```

## Tick Offset

Adjust the spacing between ticks and the track.

### Property

- **TickOffset** (double): Distance from track to ticks (default: 0)

### Basic Example

```xml
<slider:SfSlider Minimum="0"
                 Maximum="10"
                 Interval="2"
                 Value="4"
                 ShowTicks="True"
                 TickOffset="5"
                 Width="400" />
```

```csharp
slider.ShowTicks = true;
slider.TickOffset = 5;
```

### Use Cases

**More Space Between Track and Ticks:**
```xml
<slider:SfSlider ShowTicks="True"
                 TickOffset="8"
                 Width="400" />
```

**Ticks Closer to Track:**
```xml
<slider:SfSlider ShowTicks="True"
                 TickOffset="2"
                 Width="400" />
```

**With Labels:**
```xml
<slider:SfSlider ShowTicks="True"
                 ShowLabels="True"
                 TickOffset="5"
                 LabelOffset="25"  <!-- Labels further away -->
                 Width="400" />
```

## Tick Styling

Customize tick appearance using styles and templates.

### Major Tick Style

```xml
<Style x:Key="CustomMajorTickStyle" TargetType="Rectangle">
    <Setter Property="Fill" Value="#2196F3" />
    <Setter Property="Width" Value="2" />
</Style>

<slider:SfSlider ShowTicks="True"
                 MajorTickLength="15"
                 MajorTickStyle="{StaticResource CustomMajorTickStyle}"
                 Width="400" />
```

### Minor Tick Style

```xml
<Style x:Key="CustomMinorTickStyle" TargetType="Rectangle">
    <Setter Property="Fill" Value="#90CAF9" />
    <Setter Property="Width" Value="1" />
</Style>

<slider:SfSlider ShowTicks="True"
                 MinorTicksPerInterval="4"
                 MinorTickLength="8"
                 MinorTickStyle="{StaticResource CustomMinorTickStyle}"
                 Width="400" />
```

### Complete Styled Example

```xml
<Style x:Key="MajorStyle" TargetType="Rectangle">
    <Setter Property="Fill" Value="{ThemeResource SystemAccentColor}" />
    <Setter Property="Width" Value="3" />
    <Setter Property="RadiusX" Value="1.5" />
    <Setter Property="RadiusY" Value="1.5" />
</Style>

<Style x:Key="MinorStyle" TargetType="Rectangle">
    <Setter Property="Fill" Value="Gray" />
    <Setter Property="Width" Value="1.5" />
</Style>

<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="20"
                 MinorTicksPerInterval="4"
                 ShowTicks="True"
                 ShowLabels="True"
                 MajorTickLength="16"
                 MinorTickLength="10"
                 MajorTickStyle="{StaticResource MajorStyle}"
                 MinorTickStyle="{StaticResource MinorStyle}"
                 Width="400" />
```

### Active Tick Styling

```xml
<Style x:Key="ActiveTickStyle" TargetType="Rectangle">
    <Setter Property="Fill" Value="{ThemeResource SystemAccentColor}" />
</Style>

<slider:SfSlider ShowTicks="True"
                 ActiveMajorTickStyle="{StaticResource ActiveTickStyle}"
                 Width="400" />
```

## Common Use Cases

### Precision Measurement Tool

```xml
<slider:SfSlider Minimum="0"
                 Maximum="10"
                 Interval="1"
                 MinorTicksPerInterval="10"
                 ShowTicks="True"
                 ShowLabels="True"
                 MajorTickLength="15"
                 MinorTickLength="8"
                 Width="500" />
```

### Volume Control with Visual Steps

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="10"
                 MinorTicksPerInterval="1"
                 ShowTicks="True"
                 ShowLabels="True"
                 MajorTickLength="12"
                 MinorTickLength="6"
                 Width="400" />
```

### Simple Ticks (No Labels)

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="25"
                 ShowTicks="True"
                 MajorTickLength="10"
                 Width="400" />
```

### Fine-Grained Temperature Control

```xml
<slider:SfSlider Minimum="-20"
                 Maximum="40"
                 Interval="10"
                 MinorTicksPerInterval="5"
                 ShowTicks="True"
                 ShowLabels="True"
                 MajorTickLength="18"
                 MinorTickLength="10"
                 Width="500" />
```

### Minimalist Design

```xml
<Style x:Key="MinimalTickStyle" TargetType="Rectangle">
    <Setter Property="Fill" Value="#E0E0E0" />
    <Setter Property="Width" Value="1" />
</Style>

<slider:SfSlider ShowTicks="True"
                 Interval="20"
                 MajorTickLength="8"
                 MajorTickStyle="{StaticResource MinimalTickStyle}"
                 MinorTicksPerInterval="0"
                 Width="400" />
```

## Best Practices

1. **Use Ticks for Precision:** Enable ticks when users need to select precise values
2. **Match Ticks to Intervals:** Align tick intervals with label intervals
3. **Limit Minor Ticks:** Too many minor ticks create visual clutter
4. **Size Appropriately:** Make major ticks larger than minor ticks
5. **Consider Context:** Use ticks for technical/measurement tools, omit for simple controls
6. **Style Consistently:** Match tick colors to your app theme
7. **Test Visibility:** Ensure ticks are visible at different DPI settings

## Troubleshooting

**Ticks Not Showing:**
- Verify `ShowTicks="True"`
- Check that `Interval` is set (explicitly or auto-calculated)
- Ensure `MajorTickLength` > 0
- Verify container doesn't clip ticks

**Minor Ticks Not Appearing:**
- Check `MinorTicksPerInterval` > 0
- Verify `MinorTickLength` > 0
- Ensure interval is large enough for minor ticks

**Ticks Overlap with Labels:**
- Increase `LabelOffset` to move labels further away
- Adjust `TickOffset` to move ticks closer to track
- Use `TickPlacement` to position ticks on opposite side

**Tick Styling Not Applied:**
- Verify style `TargetType="Rectangle"`
- Check style resource key matches property
- Ensure style is in accessible resource dictionary

## Next Steps

- [labels.md](labels.md) - Add value labels to complement ticks
- [dividers.md](dividers.md) - Use dividers for alternative visual markers
- [track-customization.md](track-customization.md) - Style the slider track