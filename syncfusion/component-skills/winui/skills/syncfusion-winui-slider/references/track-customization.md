# Track Customization

## Table of Contents
- [Overview](#overview)
- [Track Height](#track-height)
- [Track Colors](#track-colors)
- [Track Hover and Pressed States](#track-hover-and-pressed-states)
- [Common Use Cases](#common-use-cases)

The track is the horizontal or vertical line on which the thumb slides, representing the value range visually.

## Overview

The slider track consists of two parts:
- **Active Track:** From minimum value to thumb position (filled)
- **Inactive Track:** From thumb position to maximum value (unfilled)

**Key Features:**
- Customizable height for each track
- Separate colors for active and inactive tracks
- Hover and pressed state styling
- Gradient and custom brush support

## Track Height

Control the thickness of active and inactive tracks.

### Properties

- **ActiveTrackHeight** (double): Height of filled track (default: 4)
- **InactiveTrackHeight** (double): Height of unfilled track (default: 4)

### Basic Example

```xml
<slider:SfSlider Value="50"
                 ActiveTrackHeight="6"
                 InactiveTrackHeight="6"
                 Width="400" />
```

```csharp
slider.ActiveTrackHeight = 6;
slider.InactiveTrackHeight = 6;
```

### Asymmetric Track Heights

```xml
<slider:SfSlider Value="50"
                 ActiveTrackHeight="8"
                 InactiveTrackHeight="4"
                 Width="400" />
```

### Thin Track

```xml
<slider:SfSlider ActiveTrackHeight="2"
                 InactiveTrackHeight="2"
                 Width="400" />
```

### Thick Track

```xml
<slider:SfSlider ActiveTrackHeight="10"
                 InactiveTrackHeight="10"
                 Width="400" />
```

## Track Colors

Customize active and inactive track colors.

### Properties

- **ActiveTrackFill** (Brush): Color of filled track
- **InactiveTrackFill** (Brush): Color of unfilled track

### Basic Example

```xml
<slider:SfSlider Value="50"
                 ActiveTrackFill="#009688"
                 InactiveTrackFill="#C2E6E3"
                 Width="400" />
```

```csharp
slider.ActiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 0, 150, 136));
slider.InactiveTrackFill = new SolidColorBrush(ColorHelper.FromArgb(255, 194, 230, 227));
```

### Accent Color

```xml
<slider:SfSlider Value="50"
                 ActiveTrackFill="{ThemeResource SystemAccentColor}"
                 InactiveTrackFill="LightGray"
                 Width="400" />
```

### Gradient Track

```xml
<slider:SfSlider Value="50" Width="400">
    <slider:SfSlider.ActiveTrackFill>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
            <GradientStop Color="#FF5722" Offset="0" />
            <GradientStop Color="#FFC107" Offset="1" />
        </LinearGradientBrush>
    </slider:SfSlider.ActiveTrackFill>
</slider:SfSlider>
```

## Track Hover and Pressed States

Customize track appearance during interaction.

### Hover Colors

```xml
<Page.Resources>
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPointerOver">#009688</SolidColorBrush>
    <SolidColorBrush x:Key="SyncfusionSliderInactiveTrackFillPointerOver">#C2E6E3</SolidColorBrush>
</Page.Resources>

<slider:SfSlider Value="50"
                 ActiveTrackFill="#006688"
                 InactiveTrackFill="#A2E6E3"
                 Width="400" />
```

### Pressed Colors

```xml
<Page.Resources>
    <SolidColorBrush x:Key="SyncfusionSliderActiveTrackFillPressed">#018A7D</SolidColorBrush>
    <SolidColorBrush x:Key="SyncfusionSliderInactiveTrackFillPressed">#98B8B5</SolidColorBrush>
</Page.Resources>
```

## Common Use Cases

### Volume Control

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Value="75"
                 ActiveTrackFill="#FF5722"
                 InactiveTrackFill="#FFE0DB"
                 ActiveTrackHeight="5"
                 InactiveTrackHeight="5"
                 Width="300" />
```

### Progress Indicator

```xml
<slider:SfSlider Value="60"
                 IsEnabled="False"
                 ActiveTrackFill="#4CAF50"
                 InactiveTrackFill="#E0E0E0"
                 ActiveTrackHeight="8"
                 InactiveTrackHeight="8"
                 Width="400" />
```

### Temperature Scale

```xml
<slider:SfSlider Minimum="-20"
                 Maximum="40"
                 Value="22"
                 Width="400">
    <slider:SfSlider.ActiveTrackFill>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
            <GradientStop Color="#2196F3" Offset="0" />
            <GradientStop Color="#FF5722" Offset="1" />
        </LinearGradientBrush>
    </slider:SfSlider.ActiveTrackFill>
    <slider:SfSlider.InactiveTrackFill>
        <SolidColorBrush Color="#E0E0E0" />
    </slider:SfSlider.InactiveTrackFill>
</slider:SfSlider>
```

## Best Practices

1. **Maintain Contrast:** Ensure active and inactive tracks are distinguishable
2. **Match Track Heights:** Use same height for both tracks unless emphasizing active
3. **Use Theme Colors:** Leverage SystemAccentColor for consistency
4. **Test Accessibility:** Verify sufficient color contrast
5. **Consider Gradients Sparingly:** Use for specific effects, not default styling

## Troubleshooting

**Track Not Visible:**
- Check track height > 0
- Verify colors contrast with background
- Ensure Width/Height is set on slider

**Colors Not Changing:**
- Verify brush resources are defined correctly
- Check that properties are set after InitializeComponent
- Ensure theme resources are accessible

## Next Steps

- [thumb-tooltip.md](thumb-tooltip.md) - Customize thumb and tooltip
- [dividers.md](dividers.md) - Add visual markers on track
- [labels.md](labels.md) - Display value labels