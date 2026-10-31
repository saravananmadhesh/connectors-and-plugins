# Thumb and Tooltip

## Table of Contents
- [Thumb Customization](#thumb-customization)
- [Tooltip Configuration](#tooltip-configuration)
- [Combined Examples](#combined-examples)

This guide covers customizing the slider thumb (the draggable element) and tooltip (value display on interaction).

## Thumb Customization

### Thumb Type

Control the thumb shape with the `ThumbType` property.

**Property:** ThumbType (Circle, Rectangle, Diamond)

```xml
<slider:SfSlider Value="50" ThumbType="Circle" />
<slider:SfSlider Value="50" ThumbType="Rectangle" />
<slider:SfSlider Value="50" ThumbType="Diamond" />
```

### Thumb Size

```xml
<slider:SfSlider Value="50"
                 ThumbHeight="30"
                 ThumbWidth="30"
                 ActiveTrackHeight="8"
                 InactiveTrackHeight="8" />
```

### Thumb Styling

```xml
<slider:SfSlider Value="50"
                 ThumbBackground="#2196F3"
                 ThumbHeight="24"
                 ThumbWidth="24" />
```

## Tooltip Configuration

### Show Tooltip

```xml
<slider:SfSlider Value="50" ShowToolTip="True" />
```

### Tooltip Format

```xml
<!-- Currency -->
<slider:SfSlider Value="500"
                 ShowToolTip="True"
                 ToolTipFormat="C0" />

<!-- Percentage -->
<slider:SfSlider Value="75"
                 ShowToolTip="True"
                 ToolTipFormat="P0" />

<!-- Decimal places -->
<slider:SfSlider Value="50.5"
                 ShowToolTip="True"
                 ToolTipFormat="F2" />
```

### Tooltip Styling

```xml
<Style x:Key="CustomToolTipStyle" TargetType="slider:SliderToolTip">
    <Setter Property="Background" Value="#1257eb" />
    <Setter Property="Foreground" Value="White" />
</Style>

<slider:SfSlider Value="50"
                 ShowToolTip="True"
                 ToolTipStyle="{StaticResource CustomToolTipStyle}" />
```

### Tooltip Template

```xml
<DataTemplate x:Key="ToolTipTemplate">
    <StackPanel Orientation="Horizontal">
        <TextBlock Text="Value: " />
        <TextBlock Text="{Binding ToolTipText}" FontWeight="Bold" />
    </StackPanel>
</DataTemplate>

<slider:SfSlider Value="50"
                 ShowToolTip="True"
                 ToolTipTemplate="{StaticResource ToolTipTemplate}" />
```

## Combined Examples

### Volume Control

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Value="75"
                 ShowToolTip="True"
                 ToolTipFormat="0'%'"
                 ThumbBackground="#FF5722"
                 ThumbHeight="26"
                 ThumbWidth="26" />
```

### Price Slider

```xml
<slider:SfSlider Minimum="0"
                 Maximum="1000"
                 Value="500"
                 ShowToolTip="True"
                 ToolTipFormat="C0"
                 ThumbType="Rectangle"
                 ThumbBackground="{ThemeResource SystemAccentColor}" />
```

## Best Practices

1. **Always Show Tooltips:** Provide immediate value feedback
2. **Format Appropriately:** Match tooltip format to data type
3. **Size Thumbs for Touch:** Use at least 24x24px for touch targets
4. **Style Consistently:** Match thumb colors to app theme

## Next Steps

- [track-customization.md](track-customization.md) - Customize track appearance
- [labels.md](labels.md) - Add persistent value labels