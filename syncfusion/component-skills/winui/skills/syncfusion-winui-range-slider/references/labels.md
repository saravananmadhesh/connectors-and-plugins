# Labels in WinUI RangeSlider

## Table of Contents
- [Overview](#overview)
- [Basic Configuration](#basic-configuration)
- [Label Display Options](#label-display-options)
- [Label Positioning](#label-positioning)
- [Label Customization](#label-customization)
- [Code Examples](#code-examples)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

Labels in the WinUI RangeSlider control display value indicators at specified intervals along the track. They provide visual feedback about the available value range and current selection. This reference guide covers configuration, customization, and best practices for implementing labels in your RangeSlider.

**Key Features:**
- Show/hide labels at intervals
- Control label density and placement
- Custom label templates and styling
- Active label highlighting
- Label formatting options

## Basic Configuration

### Show Labels

Enable labels on the RangeSlider track using the `ShowLabels` property. Labels render at positions defined by the `Interval` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider ShowLabels="True"
                      RangeStart="30"
                      RangeEnd="70" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowLabels = true;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**Properties:**
- `ShowLabels` (bool): Default is `false`
- Works in conjunction with `Interval` property

### Maximum Labels Count

Control label density by setting the maximum number of labels per 100 logical pixels. This property works with automatic interval calculation only.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      MaximumLabelsCount="1"
                      ShowLabels="True" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.MaximumLabelsCount = 1;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ShowLabels = true;
this.Content = sfRangeSlider;
```

**Important Notes:**
- Only applies when `Interval` is not explicitly set
- Default displays maximum of three labels per 100 logical pixels
- Use lower values for cleaner appearance on smaller controls

## Label Display Options

### Label Placement

Position labels before (above/left) or after (below/right) the track using `LabelPlacement`.

**XAML Implementation:**
```xml
<slider:SfRangeSlider ShowLabels="True"
                      RangeStart="30"
                      RangeEnd="70"
                      LabelPlacement="Before" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowLabels = true;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.LabelPlacement = Placement.Before;
this.Content = sfRangeSlider;
```

**Available Options:**
- `Placement.After` (default): Labels appear below/right of track
- `Placement.Before`: Labels appear above/left of track

### Label Offset

Adjust spacing between ticks and labels using the `LabelOffset` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider ShowTicks="True"
                      ShowLabels="True"
                      RangeStart="30"
                      RangeEnd="70"
                      LabelOffset="10" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowTicks = true;
sfRangeSlider.ShowLabels = true;
sfRangeSlider.LabelOffset = 10;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**Properties:**
- `LabelOffset` (double): Default is `5`
- Measured in device-independent pixels
- Increase for more spacing, decrease for compact layout

## Label Customization

### Label Template

Create custom label appearances using `LabelTemplate` with a DataTemplate.

**XAML Implementation:**
```xml
<DataTemplate x:Key="TrackLabelTemplate">
    <Grid CornerRadius="5"
          Background="{ThemeResource SystemBaseLowColor}">
        <TextBlock Text="{Binding Text}"
                   Margin="6" />
    </Grid>
</DataTemplate>

<slider:SfRangeSlider ShowLabels="True"
                      LabelOffset="15"
                      LabelTemplate="{StaticResource TrackLabelTemplate}"
                      RangeStart="30"
                      RangeEnd="70" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowLabels = true;
sfRangeSlider.LabelOffset = 15;
sfRangeSlider.LabelTemplate = this.Resources["TrackLabelTemplate"] as DataTemplate;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**DataContext:** `SliderLabelInfo` with properties:
- `Text` (string): The formatted label text
- `Value` (double): The numeric value

### Active Label Template

Highlight labels within the selected range using `ActiveLabelTemplate`.

**XAML Implementation:**
```xml
<DataTemplate x:Key="ActiveTrackLabelTemplate">
    <TextBlock Text="{Binding Text}"
               Foreground="{ThemeResource SystemAccentColor}" />
</DataTemplate>

<slider:SfRangeSlider ShowLabels="True"
                      LabelOffset="10"
                      ActiveLabelTemplate="{StaticResource ActiveTrackLabelTemplate}"
                      RangeStart="30"
                      RangeEnd="70" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowLabels = true;
sfRangeSlider.LabelOffset = 10;
sfRangeSlider.ActiveLabelTemplate = this.Resources["ActiveTrackLabelTemplate"] as DataTemplate;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**Use Cases:**
- Emphasizing the selected range
- Different styling for active vs. inactive labels
- Color-coded value indicators

### Formatting Track Labels

Apply custom formatting to label values using converters in the `LabelTemplate`.

**XAML Implementation:**
```xml
<DataTemplate x:Key="LabelTemplate">
    <TextBlock Text="{Binding Value,
                              Converter={StaticResource FormatStringConverter},
                              ConverterParameter='N2'}" />
</DataTemplate>

<slider:SfRangeSlider ShowLabels="True"
                      Interval="20"
                      LabelOffset="15"
                      LabelTemplate="{StaticResource LabelTemplate}"
                      RangeStart="30"
                      RangeEnd="70" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowLabels = true;
sfRangeSlider.Interval = 20;
sfRangeSlider.LabelOffset = 15;
sfRangeSlider.LabelTemplate = this.Resources["LabelTemplate"] as DataTemplate;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**Common Format Strings:**
- `N0`: Whole numbers (e.g., 1,234)
- `N2`: Two decimal places (e.g., 1,234.56)
- `C`: Currency (e.g., $1,234.56)
- `P`: Percentage (e.g., 12.34%)

## Code Examples

### Example 1: Custom Styled Labels

```xml
<Page.Resources>
    <DataTemplate x:Key="CustomLabelTemplate">
        <Border BorderBrush="{ThemeResource SystemAccentColor}"
                BorderThickness="1"
                CornerRadius="3"
                Padding="4,2">
            <TextBlock Text="{Binding Text}"
                       FontSize="12"
                       FontWeight="SemiBold" />
        </Border>
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider ShowLabels="True"
                      Interval="25"
                      LabelOffset="12"
                      LabelTemplate="{StaticResource CustomLabelTemplate}"
                      RangeStart="25"
                      RangeEnd="75" />
```

### Example 2: Label Density Control

```csharp
// For smaller controls, reduce label density
SfRangeSlider compactSlider = new SfRangeSlider();
compactSlider.ShowLabels = true;
compactSlider.MaximumLabelsCount = 2;
compactSlider.Width = 200;
compactSlider.RangeStart = 0;
compactSlider.RangeEnd = 100;
```

### Example 3: Dynamic Label Formatting

```xml
<Page.Resources>
    <local:PercentageConverter x:Key="PercentageConverter" />
    
    <DataTemplate x:Key="PercentLabelTemplate">
        <TextBlock Text="{Binding Value,
                                  Converter={StaticResource PercentageConverter}}"
                   FontSize="11" />
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider ShowLabels="True"
                      Minimum="0"
                      Maximum="1"
                      Interval="0.2"
                      LabelTemplate="{StaticResource PercentLabelTemplate}" />
```

## Common Use Cases

### Use Case 1: Time Range Selection
Show time-based labels with custom formatting.

```xml
<DataTemplate x:Key="TimeLabelTemplate">
    <TextBlock Text="{Binding Value, StringFormat='{}{0:0}h'}" />
</DataTemplate>

<slider:SfRangeSlider ShowLabels="True"
                      Minimum="0"
                      Maximum="24"
                      Interval="6"
                      LabelTemplate="{StaticResource TimeLabelTemplate}" />
```

## Troubleshooting

### Issue: Labels Not Displaying

**Problem:** Labels don't appear on the RangeSlider.

**Solutions:**
1. Verify `ShowLabels="True"` is set
2. Check if `Interval` is set appropriately
3. Ensure `Minimum` and `Maximum` values are different
4. Verify the control has sufficient width/height

```xml
<!-- Correct configuration -->
<slider:SfRangeSlider ShowLabels="True"
                      Interval="10"
                      Minimum="0"
                      Maximum="100"
                      Width="300" />
```

### Issue: Labels Overlapping

**Problem:** Labels overlap each other, making them unreadable.

**Solutions:**
1. Increase `Interval` value
2. Reduce `MaximumLabelsCount`
3. Use shorter label format
4. Increase control width

```xml
<!-- Prevent overlapping -->
<slider:SfRangeSlider ShowLabels="True"
                      Interval="20"
                      MaximumLabelsCount="2"
                      Width="400" />
```

### Issue: Label Formatting Not Applied

**Problem:** Custom formatting via template doesn't work.

**Solutions:**
1. Verify converter is registered in resources
2. Check DataContext binding path (`Value` or `Text`)
3. Ensure converter returns correct type
4. Test converter independently

```csharp
// Verify converter implementation
public class FormatStringConverter : IValueConverter
{
    public object Convert(object value, Type targetType, 
                         object parameter, string language)
    {
        if (value is double d && parameter is string format)
        {
            return d.ToString(format);
        }
        return value;
    }
    
    public object ConvertBack(object value, Type targetType, 
                             object parameter, string language)
    {
        throw new NotImplementedException();
    }
}
```

### Issue: Active Labels Not Highlighting

**Problem:** `ActiveLabelTemplate` doesn't apply to labels in selected range.

**Solutions:**
1. Ensure both `LabelTemplate` and `ActiveLabelTemplate` are set
2. Verify template uses correct binding path
3. Check if `RangeStart` and `RangeEnd` encompass label positions

```xml
<!-- Both templates required -->
<slider:SfRangeSlider ShowLabels="True"
                      LabelTemplate="{StaticResource LabelTemplate}"
                      ActiveLabelTemplate="{StaticResource ActiveLabelTemplate}" />
```

### Issue: Label Offset Not Working

**Problem:** `LabelOffset` property has no visible effect.

**Solutions:**
1. Set `ShowTicks="True"` for offset to be noticeable
2. Use larger offset values (try 15-20)
3. Check if custom template overrides spacing

```xml
<!-- Visible offset -->
<slider:SfRangeSlider ShowLabels="True"
                      ShowTicks="True"
                      LabelOffset="15" />
```

### Performance Considerations

**Best Practices:**
- Limit label count for better performance (use `MaximumLabelsCount`)
- Use simple templates instead of complex visual trees
- Avoid heavy converters in label templates
- Consider static labels for frequently updated sliders

**Example - Optimized Configuration:**
```xml
<slider:SfRangeSlider ShowLabels="True"
                      Interval="25"
                      MaximumLabelsCount="2">
    <slider:SfRangeSlider.LabelTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Text}" />
        </DataTemplate>
    </slider:SfRangeSlider.LabelTemplate>
</slider:SfRangeSlider>
```

## Summary

Labels enhance the RangeSlider by providing clear value indicators. Key points to remember:

- Enable with `ShowLabels="True"`
- Control density with `MaximumLabelsCount` and `Interval`
- Customize appearance using `LabelTemplate` and `ActiveLabelTemplate`
- Adjust spacing with `LabelOffset` and `LabelPlacement`
- Use converters for custom formatting
- Optimize for performance in production applications