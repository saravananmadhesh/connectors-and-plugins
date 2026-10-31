# Ticks in WinUI RangeSlider

## Table of Contents
- [Overview](#overview)
- [Major Ticks Configuration](#major-ticks-configuration)
- [Minor Ticks Configuration](#minor-ticks-configuration)
- [Tick Appearance](#tick-appearance)
- [Tick Positioning](#tick-positioning)
- [Tick Styling](#tick-styling)
- [Code Examples](#code-examples)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

Ticks in the WinUI RangeSlider control are visual markers on the track that represent interval points. They help users identify specific values and understand the scale of the slider. This reference covers both major and minor ticks, their configuration, styling, and best practices.

**Key Features:**
- Major ticks at interval points
- Minor ticks between intervals
- Customizable length and appearance
- Flexible placement options
- Style customization for active/inactive states

## Major Ticks Configuration

### Show Major Ticks

Enable major ticks to display markers at interval points along the track.

**XAML Implementation:**
```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="10"
                      Interval="2"
                      RangeStart="2"
                      RangeEnd="8"
                      MinorTicksPerInterval="0"
                      ShowTicks="True"
                      ShowLabels="True" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.Minimum = 0;
sfRangeSlider.Maximum = 10;
sfRangeSlider.Interval = 2;
sfRangeSlider.MinorTicksPerInterval = 0;
sfRangeSlider.RangeStart = 2;
sfRangeSlider.RangeEnd = 8;
sfRangeSlider.ShowTicks = true;
sfRangeSlider.ShowLabels = true;
this.Content = sfRangeSlider;
```

**Properties:**
- `ShowTicks` (bool): Default is `false`
- Renders ticks at values: 0, 2, 4, 6, 8, 10 (based on `Interval`)

### Major Tick Length

Customize the length of major ticks using the `MajorTickLength` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="10"
                      Interval="2"
                      RangeStart="2"
                      RangeEnd="8"
                      MinorTicksPerInterval="2"
                      MajorTickLength="15"
                      MinorTickLength="10"
                      ShowTicks="True"
                      ShowLabels="True" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.Minimum = 0;
sfRangeSlider.Maximum = 10;
sfRangeSlider.Interval = 2;
sfRangeSlider.RangeStart = 2;
sfRangeSlider.RangeEnd = 8;
sfRangeSlider.MinorTicksPerInterval = 2;
sfRangeSlider.MajorTickLength = 15;
sfRangeSlider.MinorTickLength = 10;
sfRangeSlider.ShowTicks = true;
sfRangeSlider.ShowLabels = true;
this.Content = sfRangeSlider;
```

**Properties:**
- `MajorTickLength` (double): Default is `10`
- Measured in device-independent pixels

## Minor Ticks Configuration

### Show Minor Ticks

Display smaller ticks between major ticks using the `MinorTicksPerInterval` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="10"
                      Interval="2"
                      RangeStart="2"
                      RangeEnd="8"
                      MinorTicksPerInterval="2"
                      ShowTicks="True"
                      ShowLabels="True" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.Minimum = 0;
sfRangeSlider.Maximum = 10;
sfRangeSlider.Interval = 2;
sfRangeSlider.MinorTicksPerInterval = 2;
sfRangeSlider.RangeStart = 2;
sfRangeSlider.RangeEnd = 8;
sfRangeSlider.ShowTicks = true;
sfRangeSlider.ShowLabels = true;
this.Content = sfRangeSlider;
```

**How it Works:**
- If `Interval="2"` and `MinorTicksPerInterval="2"`
- Major ticks appear at: 0, 2, 4, 6, 8, 10
- Minor ticks appear at: 1, 3, 5, 7, 9

### Minor Tick Length

Customize the length of minor ticks using the `MinorTickLength` property.

**Properties:**
- `MinorTickLength` (double): Default is `5`
- Typically shorter than major ticks for visual distinction

## Tick Appearance

### Tick Placement

Control whether ticks appear before or after the track using `TickPlacement`.

**XAML Implementation:**
```xml
<slider:SfRangeSlider ShowTicks="True"
                      TickPlacement="Before"
                      RangeStart="30"
                      RangeEnd="70" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowTicks = true;
sfRangeSlider.TickPlacement = Placement.Before;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**Available Options:**
- `Placement.After` (default): Ticks appear below/right of track
- `Placement.Before`: Ticks appear above/left of track

## Tick Positioning

### Tick Offset

Adjust the space between the track and ticks using the `TickOffset` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="10"
                      Interval="2"
                      RangeStart="2"
                      RangeEnd="8"
                      MinorTicksPerInterval="2"
                      TickOffset="10"
                      ShowTicks="True"
                      ShowLabels="True" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.Minimum = 0;
sfRangeSlider.Maximum = 10;
sfRangeSlider.Interval = 2;
sfRangeSlider.RangeStart = 2;
sfRangeSlider.RangeEnd = 8;
sfRangeSlider.MinorTicksPerInterval = 2;
sfRangeSlider.TickOffset = 10;
sfRangeSlider.ShowTicks = true;
sfRangeSlider.ShowLabels = true;
this.Content = sfRangeSlider;
```

**Properties:**
- `TickOffset` (double): Default is `0`
- Measured in device-independent pixels
- Creates spacing between track and tick marks

## Tick Styling

### Major and Minor Tick Styles

Customize the appearance of major and minor ticks using `MajorTickStyle` and `MinorTickStyle`.

**XAML Implementation:**
```xml
<Style x:Key="MajorTickStyle"
       TargetType="Line">
    <Setter Property="Stroke"
            Value="Red" />
    <Setter Property="StrokeThickness"
            Value="1.5" />
    <Setter Property="StrokeDashArray"
            Value="1,1" />
</Style>

<Style x:Key="MinorTickStyle"
       TargetType="Line">
    <Setter Property="Stroke"
            Value="Green" />
    <Setter Property="StrokeThickness"
            Value="1.5" />
    <Setter Property="StrokeDashArray"
            Value="1,1" />
</Style>

<slider:SfRangeSlider ShowTicks="True"
                      Interval="10"
                      RangeStart="30"
                      RangeEnd="70"
                      MajorTickStyle="{StaticResource MajorTickStyle}"
                      MinorTickStyle="{StaticResource MinorTickStyle}" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowTicks = true;
sfRangeSlider.Interval = 10;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.MajorTickStyle = this.Resources["MajorTickStyle"] as Style;
sfRangeSlider.MinorTickStyle = this.Resources["MinorTickStyle"] as Style;
this.Content = sfRangeSlider;
```

**Style Properties:**
- `Stroke`: Color of the tick line
- `StrokeThickness`: Width of the tick line
- `StrokeDashArray`: Pattern for dashed lines

### Active Tick Styles

Customize the appearance of ticks within the selected range using `ActiveMajorTickStyle` and `ActiveMinorTickStyle`.

**XAML Implementation:**
```xml
<Style x:Key="ActiveMajorTickStyle"
       TargetType="Line">
    <Setter Property="Stroke"
            Value="{ThemeResource SystemAccentColor}" />
    <Setter Property="StrokeThickness"
            Value="1.5" />
</Style>

<Style x:Key="ActiveMinorTickStyle"
       TargetType="Line">
    <Setter Property="Stroke"
            Value="{ThemeResource SystemAccentColor}" />
    <Setter Property="StrokeThickness"
            Value="1" />
</Style>

<slider:SfRangeSlider ShowTicks="True"
                      Interval="5"
                      RangeStart="30"
                      RangeEnd="70"
                      ActiveMajorTickStyle="{StaticResource ActiveMajorTickStyle}"
                      ActiveMinorTickStyle="{StaticResource ActiveMinorTickStyle}" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowTicks = true;
sfRangeSlider.Interval = 5;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ActiveMajorTickStyle = this.Resources["ActiveMajorTickStyle"] as Style;
sfRangeSlider.ActiveMinorTickStyle = this.Resources["ActiveMinorTickStyle"] as Style;
this.Content = sfRangeSlider;
```

## Code Examples

### Example 1: Complete Tick Configuration

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="100"
                      Interval="20"
                      MinorTicksPerInterval="3"
                      RangeStart="20"
                      RangeEnd="80"
                      ShowTicks="True"
                      ShowLabels="True"
                      MajorTickLength="12"
                      MinorTickLength="6"
                      TickOffset="5"
                      TickPlacement="After" />
```

### Example 2: Styled Ticks with Theme Colors

```xml
<Page.Resources>
    <Style x:Key="ThemedMajorTickStyle" TargetType="Line">
        <Setter Property="Stroke" Value="{ThemeResource SystemBaseMediumColor}" />
        <Setter Property="StrokeThickness" Value="2" />
    </Style>
    
    <Style x:Key="ThemedMinorTickStyle" TargetType="Line">
        <Setter Property="Stroke" Value="{ThemeResource SystemBaseLowColor}" />
        <Setter Property="StrokeThickness" Value="1" />
    </Style>
    
    <Style x:Key="ThemedActiveMajorTickStyle" TargetType="Line">
        <Setter Property="Stroke" Value="{ThemeResource SystemAccentColor}" />
        <Setter Property="StrokeThickness" Value="2" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider ShowTicks="True"
                      Interval="10"
                      MinorTicksPerInterval="1"
                      MajorTickStyle="{StaticResource ThemedMajorTickStyle}"
                      MinorTickStyle="{StaticResource ThemedMinorTickStyle}"
                      ActiveMajorTickStyle="{StaticResource ThemedActiveMajorTickStyle}" />
```

### Example 3: Minimal Tick Display

```csharp
// For clean, minimalist UI
SfRangeSlider minimalistSlider = new SfRangeSlider();
minimalistSlider.ShowTicks = true;
minimalistSlider.MinorTicksPerInterval = 0; // No minor ticks
minimalistSlider.Interval = 25;
minimalistSlider.MajorTickLength = 8;
minimalistSlider.TickOffset = 2;
```

## Common Use Cases

### Use Case 1: Temperature Control
Display ticks for precise temperature selection.

```xml
<slider:SfRangeSlider Minimum="60"
                      Maximum="80"
                      Interval="5"
                      MinorTicksPerInterval="4"
                      ShowTicks="True"
                      ShowLabels="True"
                      MajorTickLength="10"
                      MinorTickLength="5" />
```

### Use Case 2: Volume Control
Minimal ticks for audio volume slider.

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="100"
                      Interval="10"
                      MinorTicksPerInterval="0"
                      ShowTicks="True"
                      MajorTickLength="6"
                      TickOffset="3" />
```

### Use Case 3: Date Range Picker
Major ticks for months, minor for weeks.

```xml
<slider:SfRangeSlider Minimum="1"
                      Maximum="12"
                      Interval="1"
                      MinorTicksPerInterval="3"
                      ShowTicks="True"
                      ShowLabels="True"
                      MajorTickLength="15"
                      MinorTickLength="8" />
```

## Troubleshooting

### Issue: Ticks Not Displaying

**Problem:** Ticks don't appear on the RangeSlider.

**Solutions:**
1. Ensure `ShowTicks="True"` is set
2. Verify `Interval` is set appropriately
3. Check if `Minimum` and `Maximum` are different
4. Confirm the control has sufficient height/width

```xml
<!-- Correct configuration -->
<slider:SfRangeSlider ShowTicks="True"
                      Interval="10"
                      Minimum="0"
                      Maximum="100"
                      Height="40" />
```

### Issue: Minor Ticks Not Showing

**Problem:** Only major ticks appear, no minor ticks.

**Solutions:**
1. Set `MinorTicksPerInterval` to a value greater than 0
2. Ensure `MinorTickLength` is set (default is 5)
3. Check if minor tick style makes them invisible

```xml
<!-- Show minor ticks -->
<slider:SfRangeSlider ShowTicks="True"
                      Interval="10"
                      MinorTicksPerInterval="4"
                      MinorTickLength="5" />
```

### Issue: Ticks Obscured by Track

**Problem:** Ticks are hidden behind or too close to the track.

**Solutions:**
1. Increase `TickOffset` value
2. Adjust `TickPlacement` to `Before` or `After`
3. Increase tick length for better visibility
4. Reduce track height

```xml
<!-- Improve tick visibility -->
<slider:SfRangeSlider ShowTicks="True"
                      TickOffset="10"
                      MajorTickLength="12"
                      ActiveTrackHeight="4"
                      InactiveTrackHeight="4" />
```

### Issue: Active Tick Styles Not Applied

**Problem:** Ticks in the selected range don't use active styles.

**Solutions:**
1. Verify both regular and active styles are defined
2. Ensure `RangeStart` and `RangeEnd` are set correctly
3. Check if style TargetType is `Line`
4. Confirm resource key names are correct

```xml
<!-- Both styles required -->
<slider:SfRangeSlider ShowTicks="True"
                      MajorTickStyle="{StaticResource MajorTickStyle}"
                      ActiveMajorTickStyle="{StaticResource ActiveMajorTickStyle}"
                      RangeStart="20"
                      RangeEnd="80" />
```

### Issue: Tick Interval Calculation Problems

**Problem:** Ticks appear at unexpected intervals.

**Solutions:**
1. Explicitly set `Interval` property
2. Verify `Minimum` and `Maximum` values
3. Check calculations for custom intervals
4. Ensure `MinorTicksPerInterval` divides evenly

```csharp
// Explicit interval calculation
double range = maximum - minimum;
double desiredTicks = 5;
double interval = range / desiredTicks;

sfRangeSlider.Interval = interval;
```

### Issue: Performance with Many Ticks

**Problem:** Slider performance degrades with many ticks.

**Solutions:**
1. Reduce number of minor ticks
2. Increase interval value
3. Simplify tick styles (avoid complex brushes)
4. Consider disabling minor ticks on mobile

```xml
<!-- Optimized for performance -->
<slider:SfRangeSlider ShowTicks="True"
                      Interval="20"
                      MinorTicksPerInterval="1"
                      MajorTickLength="10"
                      MinorTickLength="5" />
```

### Styling Best Practices

**Guidelines:**
- Use contrasting colors for major and minor ticks
- Keep stroke thickness reasonable (1-2 pixels)
- Make active ticks visually distinct
- Test visibility in light and dark themes
- Ensure adequate spacing with `TickOffset`

**Example - Best Practice Configuration:**
```xml
<Page.Resources>
    <Style x:Key="OptimalMajorTick" TargetType="Line">
        <Setter Property="Stroke" Value="{ThemeResource SystemBaseMediumHighColor}" />
        <Setter Property="StrokeThickness" Value="1.5" />
    </Style>
    
    <Style x:Key="OptimalMinorTick" TargetType="Line">
        <Setter Property="Stroke" Value="{ThemeResource SystemBaseLowColor}" />
        <Setter Property="StrokeThickness" Value="1" />
    </Style>
    
    <Style x:Key="OptimalActiveMajorTick" TargetType="Line">
        <Setter Property="Stroke" Value="{ThemeResource SystemAccentColor}" />
        <Setter Property="StrokeThickness" Value="2" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider ShowTicks="True"
                      Interval="10"
                      MinorTicksPerInterval="1"
                      MajorTickLength="10"
                      MinorTickLength="6"
                      TickOffset="5"
                      MajorTickStyle="{StaticResource OptimalMajorTick}"
                      MinorTickStyle="{StaticResource OptimalMinorTick}"
                      ActiveMajorTickStyle="{StaticResource OptimalActiveMajorTick}" />
```

## Summary

Ticks enhance the RangeSlider by providing visual scale markers. Key points to remember:

- Enable with `ShowTicks="True"`
- Configure major ticks via `Interval` and `MajorTickLength`
- Add minor ticks with `MinorTicksPerInterval`
- Control positioning with `TickPlacement` and `TickOffset`
- Customize appearance using styles for major, minor, and active states
- Optimize tick count for performance
- Ensure adequate visibility with proper styling and spacing