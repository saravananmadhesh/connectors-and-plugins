# Track in WinUI RangeSlider

## Table of Contents
- [Overview](#overview)
- [Track Color Configuration](#track-color-configuration)
- [Track Dimensions](#track-dimensions)
- [Track Styling](#track-styling)
- [Code Examples](#code-examples)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

The track in the WinUI RangeSlider is the horizontal or vertical bar along which the thumbs move. It consists of two parts: the active track (between the thumbs) and the inactive track (outside the thumb range). This reference guide covers track customization, styling, and best practices.

**Key Features:**
- Active and inactive track sections
- Customizable colors for normal, hover, and pressed states
- Adjustable track height
- Style-based customization
- Theme-aware color support

## Track Color Configuration

### Basic Track Colors

Customize active and inactive track colors using `ActiveTrackFill` and `InactiveTrackFill`.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ActiveTrackFill="#009688"
                      InactiveTrackFill="#C2E6E3" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ActiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 0, 150, 136));
sfRangeSlider.InactiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 194, 230, 227));
this.Content = sfRangeSlider;
```

**Track Sections:**
- **Active Track**: The section between `RangeStart` and `RangeEnd` thumbs
- **Inactive Track**: Sections from `Minimum` to `RangeStart` and from `RangeEnd` to `Maximum`

**Properties:**
- `ActiveTrackFill` (Brush): Color of the selected range
- `InactiveTrackFill` (Brush): Color of unselected portions

## Track Interactive States

### Hover State Colors

Define track colors when the cursor hovers over the control using resource keys.

**XAML Implementation:**
```xml
<Page.Resources>
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPointerOver">#009688</SolidColorBrush>
    <SolidColorBrush x:Key="SyncfusionSliderInactiveTrackFillPointerOver">#C2E6E3</SolidColorBrush>
</Page.Resources>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ActiveTrackFill="#006688"
                      InactiveTrackFill="#A2E6E3" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ActiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 0, 102, 136));
sfRangeSlider.InactiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 162, 230, 227));
this.Content = sfRangeSlider;
```

**Resource Keys:**
- `SyncfusionSliderActiveTrackFillPointerOver`: Active track hover color
- `SyncfusionSliderInactiveTrackFillPointerOver`: Inactive track hover color

### Pressed State Colors

Define track colors when the user presses or drags the slider.

**XAML Implementation:**
```xml
<Page.Resources>
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPointerOver">#009688</SolidColorBrush>
    <SolidColorBrush x:Key="SyncfusionSliderInactiveTrackFillPointerOver">#C2E6E3</SolidColorBrush>
    
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPressed">#018A7D</SolidColorBrush>
    <SolidColorBrush x:Key="SyncfusionSliderInactiveTrackFillPressed">#98B8B5</SolidColorBrush>
</Page.Resources>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ActiveTrackFill="#006688"
                      InactiveTrackFill="#A2E6E3" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ActiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 0, 102, 136));
sfRangeSlider.InactiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 162, 230, 227));
this.Content = sfRangeSlider;
```

**Resource Keys:**
- `SyncfusionSliderActiveTrackFillPressed`: Active track pressed color
- `SyncfusionSliderInactiveTrackFillPressed`: Inactive track pressed color

## Track Dimensions

### Track Height

Adjust the height of active and inactive tracks independently.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ActiveTrackHeight="8"
                      InactiveTrackHeight="8" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ActiveTrackHeight = 8;
sfRangeSlider.InactiveTrackHeight = 8;
this.Content = sfRangeSlider;
```

**Properties:**
- `ActiveTrackHeight` (double): Default is `2`
- `InactiveTrackHeight` (double): Default is `2`
- Measured in device-independent pixels

**Design Tips:**
- Use equal heights for consistent appearance
- Increase height for better touch targets on mobile
- Larger heights work well with prominent designs

## Track Styling

### Custom Track Styles

Apply custom styles to tracks using `ActiveTrackStyle` and `InactiveTrackStyle`.

**XAML Implementation:**
```xml
<Page.Resources>
    <Style x:Key="ActiveTrackStyle"
           TargetType="Rectangle">
        <Setter Property="RadiusX" Value="4" />
        <Setter Property="RadiusY" Value="4" />
    </Style>

    <Style x:Key="InactiveTrackStyle"
           TargetType="Rectangle">
        <Setter Property="RadiusX" Value="3" />
        <Setter Property="RadiusY" Value="3" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ActiveTrackHeight="8"
                      InactiveTrackHeight="6"
                      ActiveTrackStyle="{StaticResource ActiveTrackStyle}"
                      InactiveTrackStyle="{StaticResource InactiveTrackStyle}" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ActiveTrackHeight = 8;
sfRangeSlider.InactiveTrackHeight = 6;
sfRangeSlider.ActiveTrackStyle = this.Resources["ActiveTrackStyle"] as Style;
sfRangeSlider.InactiveTrackStyle = this.Resources["InactiveTrackStyle"] as Style;
this.Content = sfRangeSlider;
```

**TargetType:** `Rectangle`
**Customizable Properties:**
- `RadiusX` / `RadiusY`: Corner radius
- `Fill`: Background color
- `Stroke`: Border color
- `StrokeThickness`: Border width
- `Opacity`: Transparency

## Code Examples

### Example 1: Rounded Track with Custom Colors

```xml
<Page.Resources>
    <Style x:Key="RoundedActiveTrack" TargetType="Rectangle">
        <Setter Property="RadiusX" Value="6" />
        <Setter Property="RadiusY" Value="6" />
    </Style>
    
    <Style x:Key="RoundedInactiveTrack" TargetType="Rectangle">
        <Setter Property="RadiusX" Value="6" />
        <Setter Property="RadiusY" Value="6" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider RangeStart="25"
                      RangeEnd="75"
                      ActiveTrackHeight="12"
                      InactiveTrackHeight="12"
                      ActiveTrackFill="#4CAF50"
                      InactiveTrackFill="#E0E0E0"
                      ActiveTrackStyle="{StaticResource RoundedActiveTrack}"
                      InactiveTrackStyle="{StaticResource RoundedInactiveTrack}" />
```

### Example 2: Gradient Track Fill

```xml
<Page.Resources>
    <LinearGradientBrush x:Key="GradientActiveFill" StartPoint="0,0" EndPoint="1,0">
        <GradientStop Color="#2196F3" Offset="0" />
        <GradientStop Color="#21CBF3" Offset="1" />
    </LinearGradientBrush>
</Page.Resources>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ActiveTrackHeight="8"
                      InactiveTrackHeight="8"
                      ActiveTrackFill="{StaticResource GradientActiveFill}"
                      InactiveTrackFill="#E0E0E0" />
```

### Example 3: Track with Border

```xml
<Page.Resources>
    <Style x:Key="BorderedTrackStyle" TargetType="Rectangle">
        <Setter Property="Stroke" Value="{ThemeResource SystemAccentColor}" />
        <Setter Property="StrokeThickness" Value="1" />
        <Setter Property="RadiusX" Value="4" />
        <Setter Property="RadiusY" Value="4" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider ActiveTrackHeight="10"
                      InactiveTrackHeight="10"
                      ActiveTrackStyle="{StaticResource BorderedTrackStyle}"
                      InactiveTrackStyle="{StaticResource BorderedTrackStyle}" />
```

### Example 4: Complete Interactive Track

```xml
<Page.Resources>
    <!-- Normal State -->
    <SolidColorBrush x:Key="ActiveFill">#2196F3</SolidColorBrush>
    <SolidColorBrush x:Key="InactiveFill">#E0E0E0</SolidColorBrush>
    
    <!-- Hover State -->
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPointerOver">#1976D2</SolidColorBrush>
    <SolidColorBrush x:Key="SyncfusionSliderInactiveTrackFillPointerOver">#BDBDBD</SolidColorBrush>
    
    <!-- Pressed State -->
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPressed">#1565C0</SolidColorBrush>
    <SolidColorBrush x:Key="SyncfusionSliderInactiveTrackFillPressed">#9E9E9E</SolidColorBrush>
    
    <Style x:Key="TrackStyle" TargetType="Rectangle">
        <Setter Property="RadiusX" Value="5" />
        <Setter Property="RadiusY" Value="5" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ActiveTrackHeight="10"
                      InactiveTrackHeight="10"
                      ActiveTrackFill="{StaticResource ActiveFill}"
                      InactiveTrackFill="{StaticResource InactiveFill}"
                      ActiveTrackStyle="{StaticResource TrackStyle}"
                      InactiveTrackStyle="{StaticResource TrackStyle}" />
```

## Common Use Cases

### Use Case 1: Volume Control
Standard track with clear visual feedback.

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="100"
                      RangeStart="20"
                      RangeEnd="80"
                      ActiveTrackHeight="4"
                      InactiveTrackHeight="4"
                      ActiveTrackFill="{ThemeResource SystemAccentColor}"
                      InactiveTrackFill="{ThemeResource SystemBaseLowColor}" />
```

### Use Case 2: Price Range Selector
Prominent track for e-commerce filtering.

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="1000"
                      RangeStart="100"
                      RangeEnd="800"
                      ActiveTrackHeight="6"
                      InactiveTrackHeight="6"
                      ActiveTrackFill="#4CAF50"
                      InactiveTrackFill="#CCCCCC" />
```

### Use Case 3: Date Range Picker
Subtle track for timeline selection.

```xml
<slider:SfRangeSlider ActiveTrackHeight="3"
                      InactiveTrackHeight="3"
                      ActiveTrackFill="{ThemeResource SystemAccentColorDark1}"
                      InactiveTrackFill="{ThemeResource SystemBaseMediumLowColor}" />
```

### Use Case 4: Media Player Timeline
Thick track for easy scrubbing.

```xml
<Page.Resources>
    <Style x:Key="MediaTrackStyle" TargetType="Rectangle">
        <Setter Property="RadiusX" Value="8" />
        <Setter Property="RadiusY" Value="8" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider ActiveTrackHeight="16"
                      InactiveTrackHeight="16"
                      ActiveTrackFill="#FF5722"
                      InactiveTrackFill="#424242"
                      ActiveTrackStyle="{StaticResource MediaTrackStyle}"
                      InactiveTrackStyle="{StaticResource MediaTrackStyle}" />
```

## Troubleshooting

### Issue: Track Not Visible

**Problem:** Track doesn't appear or is barely visible.

**Solutions:**
1. Verify `ActiveTrackFill` and `InactiveTrackFill` are set
2. Ensure colors contrast with background
3. Check if `ActiveTrackHeight` and `InactiveTrackHeight` are greater than 0
4. Verify the control has adequate width

```xml
<!-- Highly visible track -->
<slider:SfRangeSlider ActiveTrackHeight="6"
                      InactiveTrackHeight="6"
                      ActiveTrackFill="Red"
                      InactiveTrackFill="Gray"
                      Width="300" />
```

### Issue: Hover/Pressed Colors Not Working

**Problem:** Interactive state colors don't change.

**Solutions:**
1. Verify resource keys are spelled correctly
2. Ensure resources are in correct scope (Page.Resources or App.Resources)
3. Check if custom styles override state colors
4. Test without custom styles first

```xml
<!-- Correct resource key usage -->
<Page.Resources>
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPointerOver">
        #FF5722
    </SolidColorBrush>
</Page.Resources>
```

### Issue: Unequal Track Heights

**Problem:** Active and inactive tracks have different heights unintentionally.

**Solutions:**
1. Set both `ActiveTrackHeight` and `InactiveTrackHeight` to same value
2. Create consistent style setters
3. Verify no conflicting style definitions

```xml
<!-- Equal heights -->
<slider:SfRangeSlider ActiveTrackHeight="8"
                      InactiveTrackHeight="8" />
```

### Issue: Track Style Not Applied

**Problem:** Custom `ActiveTrackStyle` or `InactiveTrackStyle` has no effect.

**Solutions:**
1. Verify `TargetType="Rectangle"` is set
2. Check if style is in accessible resource dictionary
3. Ensure style key names match references
4. Test with simple style first

```xml
<!-- Debug style -->
<Style x:Key="TestTrackStyle" TargetType="Rectangle">
    <Setter Property="Fill" Value="Red" />
</Style>

<slider:SfRangeSlider ActiveTrackStyle="{StaticResource TestTrackStyle}" />
```

### Issue: Gradient Not Displaying

**Problem:** Gradient brush on track doesn't render correctly.

**Solutions:**
1. Verify gradient has at least two gradient stops
2. Check StartPoint and EndPoint coordinates
3. Ensure gradient colors are valid
4. Test with solid brush first

```xml
<!-- Working gradient -->
<LinearGradientBrush x:Key="TestGradient" StartPoint="0,0.5" EndPoint="1,0.5">
    <GradientStop Color="Blue" Offset="0" />
    <GradientStop Color="Green" Offset="1" />
</LinearGradientBrush>

<slider:SfRangeSlider ActiveTrackFill="{StaticResource TestGradient}" />
```

### Issue: Track Corners Not Rounded

**Problem:** `RadiusX` and `RadiusY` have no visible effect.

**Solutions:**
1. Ensure track height is sufficient for visible rounding
2. Check if radius values are appropriate for track height
3. Verify style is applied to correct track
4. Use radius values less than or equal to half the track height

```xml
<!-- Properly rounded track -->
<Page.Resources>
    <Style x:Key="RoundedTrack" TargetType="Rectangle">
        <Setter Property="RadiusX" Value="5" />
        <Setter Property="RadiusY" Value="5" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider ActiveTrackHeight="10"
                      InactiveTrackHeight="10"
                      ActiveTrackStyle="{StaticResource RoundedTrack}"
                      InactiveTrackStyle="{StaticResource RoundedTrack}" />
```

### Performance Considerations

**Best Practices:**
- Use solid colors instead of gradients when possible
- Avoid complex visual effects on track
- Keep track height reasonable (2-16 pixels)
- Test performance on target devices
- Consider disabling animations for low-end hardware

**Example - Optimized Configuration:**
```xml
<slider:SfRangeSlider ActiveTrackHeight="6"
                      InactiveTrackHeight="6"
                      ActiveTrackFill="{ThemeResource SystemAccentColor}"
                      InactiveTrackFill="{ThemeResource SystemBaseLowColor}" />
```

### Accessibility Considerations

**Guidelines:**
- Ensure adequate color contrast (WCAG AA: 3:1 minimum)
- Use different track heights for active/inactive if relying on size alone
- Test with high contrast themes
- Provide alternative visual cues beyond color

**Example - Accessible Track:**
```xml
<slider:SfRangeSlider ActiveTrackHeight="8"
                      InactiveTrackHeight="4"
                      ActiveTrackFill="#2196F3"
                      InactiveTrackFill="#757575" />
```

## Summary

The track is a fundamental visual element of the RangeSlider. Key points to remember:

- Customize colors with `ActiveTrackFill` and `InactiveTrackFill`
- Define interactive states using resource keys for hover and pressed states
- Adjust dimensions with `ActiveTrackHeight` and `InactiveTrackHeight`
- Apply advanced styling using `ActiveTrackStyle` and `InactiveTrackStyle`
- Create rounded tracks with `RadiusX` and `RadiusY`
- Ensure adequate contrast for accessibility
- Optimize for performance on target platforms
- Test across light and dark themes