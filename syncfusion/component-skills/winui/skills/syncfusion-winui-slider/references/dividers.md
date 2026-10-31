# Dividers

## Table of Contents
- [Overview](#overview)
- [Show Dividers](#show-dividers)
- [Divider Size](#divider-size)
- [Divider Styling](#divider-styling)
- [Active and Inactive Dividers](#active-and-inactive-dividers)
- [Common Use Cases](#common-use-cases)

Dividers are visual markers placed on the track at interval points, providing clear separation between value ranges.

## Overview

Dividers appear as circular or custom-shaped markers on the slider track at specified intervals, helping users visualize discrete value ranges.

**Key Features:**
- Display at regular intervals matching labels and ticks
- Customizable size (height and width)
- Separate styling for active and inactive dividers
- Stroke and fill customization
- Template-based appearance control

## Show Dividers

Enable dividers using the `ShowDividers` property.

### Property

- **ShowDividers** (bool): Display dividers at intervals (default: false)

### Basic Example

```xml
<slider:SfSlider Value="50"
                 Interval="10"
                 ShowDividers="True"
                 Width="400" />
```

```csharp
SfSlider slider = new SfSlider();
slider.Value = 50;
slider.Interval = 10;
slider.ShowDividers = true;
```

With `Interval="10"`, dividers appear at: 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100

### With Track Height Adjustment

For best visual appearance, adjust track height to match divider size:

```xml
<slider:SfSlider Value="50"
                 Interval="10"
                 ShowDividers="True"
                 DividerHeight="4"
                 DividerWidth="4"
                 ActiveTrackHeight="4"
                 InactiveTrackHeight="4"
                 Width="400" />
```

## Divider Size

Customize divider dimensions with `DividerHeight` and `DividerWidth` properties.

### Properties

- **DividerHeight** (double): Height of divider markers (default: 12)
- **DividerWidth** (double): Width of divider markers (default: 12)

### Basic Size Example

```xml
<slider:SfSlider Value="50"
                 Interval="10"
                 ShowDividers="True"
                 DividerHeight="4"
                 DividerWidth="4"
                 Width="400" />
```

```csharp
slider.ShowDividers = true;
slider.DividerHeight = 4;
slider.DividerWidth = 4;
```

### Larger Dividers

```xml
<slider:SfSlider Interval="20"
                 ShowDividers="True"
                 DividerHeight="8"
                 DividerWidth="8"
                 ActiveTrackHeight="8"
                 InactiveTrackHeight="8"
                 Width="400" />
```

### Rectangular Dividers

```xml
<slider:SfSlider Interval="10"
                 ShowDividers="True"
                 DividerHeight="10"
                 DividerWidth="4"
                 Width="400" />
```

## Divider Styling

Customize divider appearance with stroke and fill properties.

### Divider Stroke

```xml
<slider:SfSlider Value="50"
                 Interval="10"
                 ShowDividers="True"
                 DividerHeight="10"
                 DividerWidth="10"
                 DividerStrokeThickness="2"
                 DividerStroke="Red"
                 Width="400" />
```

```csharp
slider.ShowDividers = true;
slider.DividerHeight = 10;
slider.DividerWidth = 10;
slider.DividerStrokeThickness = 2;
slider.DividerStroke = new SolidColorBrush(Colors.Red);
```

### Divider Fill

```xml
<slider:SfSlider Value="50"
                 Interval="10"
                 ShowDividers="True"
                 DividerHeight="6"
                 DividerWidth="6"
                 DividerFill="#2196F3"
                 Width="400" />
```

### Styled Dividers Example

```xml
<slider:SfSlider Interval="20"
                 ShowDividers="True"
                 DividerHeight="12"
                 DividerWidth="12"
                 DividerFill="White"
                 DividerStroke="{ThemeResource SystemAccentColor}"
                 DividerStrokeThickness="2"
                 ActiveTrackHeight="6"
                 InactiveTrackHeight="6"
                 Width="400" />
```

## Active and Inactive Dividers

Style dividers differently based on whether they're in the active or inactive range.

## Common Use Cases

### Volume Control with Dividers

```xml
<StackPanel>
    <TextBlock Text="Volume" Margin="0,0,0,10" />
    <slider:SfSlider Minimum="0"
                     Maximum="100"
                     Interval="10"
                     Value="70"
                     ShowDividers="True"
                     ShowLabels="True"
                     DividerHeight="5"
                     DividerWidth="5"
                     ActiveTrackHeight="5"
                     InactiveTrackHeight="5"
                     Width="300" />
</StackPanel>
```

### Temperature Scale

```xml
<slider:SfSlider Minimum="-20"
                 Maximum="40"
                 Interval="10"
                 Value="22"
                 ShowDividers="True"
                 ShowLabels="True"
                 DividerHeight="6"
                 DividerWidth="6"
                 Width="400" />
```

### Minimalist Design

```xml
<slider:SfSlider Interval="20"
                 ShowDividers="True"
                 DividerHeight="3"
                 DividerWidth="3"
                 DividerFill="#E0E0E0"
                 ActiveTrackHeight="3"
                 InactiveTrackHeight="3"
                 Width="400" />
```

## Best Practices

1. **Match Track Height:** Set track height to match or slightly exceed divider height
2. **Use with Labels:** Combine dividers with labels for maximum clarity
3. **Choose Appropriate Intervals:** More dividers = more clutter, use sparingly
4. **Style for Visibility:** Ensure dividers contrast with track colors
5. **Consider Alternatives:** Use ticks for technical precision, dividers for visual separation

## Troubleshooting

**Dividers Not Showing:**
- Verify `ShowDividers="True"`
- Check that `Interval` is set
- Ensure `DividerHeight` and `DividerWidth` > 0
- Verify sufficient track size

**Dividers Look Odd:**
- Match `DividerHeight` to track height
- Adjust `DividerWidth` for better proportion
- Use stroke for better definition

## Next Steps

- [ticks.md](ticks.md) - Use ticks for more precise markers
- [labels.md](labels.md) - Add value labels
- [track-customization.md](track-customization.md) - Customize track appearance