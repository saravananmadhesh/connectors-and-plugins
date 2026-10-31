# Labels

## Table of Contents
- [Overview](#overview)
- [Show Labels](#show-labels)
- [Label Placement](#label-placement)
- [Label Offset](#label-offset)
- [Maximum Labels Count](#maximum-labels-count)
- [Label Templates](#label-templates)
- [Label Formatting](#label-formatting)
- [Active Label Styling](#active-label-styling)
- [Common Use Cases](#common-use-cases)

Labels display numeric values at intervals along the slider track, helping users understand the value range and current selection.

## Overview

Labels are text representations of values rendered at specified intervals on the slider. They provide visual feedback about the numeric range and help users make informed selections.

**Key Features:**
- Display values at regular intervals
- Customizable placement (before/after track)
- Adjustable spacing from track
- Template-based customization
- Active/inactive label styling
- Format control (currency, percentage, custom)

## Show Labels

Enable labels using the `ShowLabels` property.

### Property

- **ShowLabels** (bool): Display labels at intervals (default: false)

### Basic Example

```xml
<slider:SfSlider ShowLabels="True"
                 Value="50"
                 Width="400" />
```

```csharp
SfSlider slider = new SfSlider();
slider.ShowLabels = true;
slider.Value = 50;
```

### With Interval

Labels appear at the specified interval:

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="20"
                 ShowLabels="True"
                 Value="60"
                 Width="400" />
```

This displays labels at: 0, 20, 40, 60, 80, 100

## Label Placement

Control where labels appear relative to the track using `LabelPlacement`.

### Property

- **LabelPlacement** (Placement): Position of labels (default: After)
  - **After**: Below the track (horizontal) or right of track (vertical)
  - **Before**: Above the track (horizontal) or left of track (vertical)

### Placement After (Default)

```xml
<slider:SfSlider ShowLabels="True"
                 Value="50"
                 LabelPlacement="After"
                 Width="400" />
```

### Placement Before

```xml
<slider:SfSlider ShowLabels="True"
                 Value="50"
                 LabelPlacement="Before"
                 Width="400" />
```

```csharp
slider.ShowLabels = true;
slider.LabelPlacement = Placement.Before;
```

### Vertical Slider Label Placement

```xml
<!-- Labels on the right -->
<slider:SfSlider Orientation="Vertical"
                 ShowLabels="True"
                 LabelPlacement="After"
                 Height="300" />

<!-- Labels on the left -->
<slider:SfSlider Orientation="Vertical"
                 ShowLabels="True"
                 LabelPlacement="Before"
                 Height="300" />
```

## Label Offset

Adjust the spacing between labels and the slider track.

### Property

- **LabelOffset** (double): Distance from track to labels (default: 5)

### Basic Example

```xml
<slider:SfSlider ShowTicks="True"
                 ShowLabels="True"
                 Value="50"
                 LabelOffset="10"
                 Width="400" />
```

```csharp
slider.ShowTicks = true;
slider.ShowLabels = true;
slider.LabelOffset = 10;
```

### Use Cases

**More Space for Larger Labels:**
```xml
<slider:SfSlider ShowLabels="True"
                 LabelOffset="15"
                 Width="400" />
```

**Compact Layout:**
```xml
<slider:SfSlider ShowLabels="True"
                 LabelOffset="2"
                 Width="400" />
```

**With Ticks:**
```xml
<slider:SfSlider ShowTicks="True"
                 ShowLabels="True"
                 LabelOffset="12"  <!-- Extra space for ticks -->
                 Width="400" />
```

## Maximum Labels Count

Control the density of labels with automatic interval calculation.

### Property

- **MaximumLabelsCount** (int): Maximum labels per 100 logical pixels (default: 3)

**Note:** Only works with auto-calculated intervals. Has no effect if `Interval` is explicitly set.

### Basic Example

```xml
<slider:SfSlider Value="50"
                 MaximumLabelsCount="1"
                 ShowLabels="True"
                 Width="400" />
```

```csharp
slider.MaximumLabelsCount = 1;
slider.ShowLabels = true;
```

### Use Cases

**Fewer Labels (Less Cluttered):**
```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 MaximumLabelsCount="2"
                 ShowLabels="True"
                 Width="400" />
```

**More Labels (More Detail):**
```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 MaximumLabelsCount="5"
                 ShowLabels="True"
                 Width="600" />
```

## Label Templates

Customize label appearance using data templates.

### LabelTemplate Property

Define a custom template for all labels.

```xml
<DataTemplate x:Key="TrackLabelTemplate">
    <Grid CornerRadius="5"
          Background="{ThemeResource SystemBaseLowColor}">
        <TextBlock Text="{Binding Text}"
                   Margin="6" />
    </Grid>
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 LabelOffset="15"
                 LabelTemplate="{StaticResource TrackLabelTemplate}"
                 Value="50"
                 Width="400" />
```

```csharp
slider.ShowLabels = true;
slider.LabelOffset = 15;
slider.LabelTemplate = this.Resources["TrackLabelTemplate"] as DataTemplate;
```

**DataContext:** `SliderLabelInfo` with properties:
- **Value** (double): The numeric value
- **Text** (string): Formatted text representation

### Styled Label Example

```xml
<DataTemplate x:Key="StyledLabelTemplate">
    <Border Background="#E3F2FD"
            BorderBrush="#2196F3"
            BorderThickness="1"
            CornerRadius="3"
            Padding="8,4">
        <TextBlock Text="{Binding Text}"
                   FontSize="12"
                   FontWeight="SemiBold"
                   Foreground="#1976D2" />
    </Border>
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 LabelOffset="18"
                 LabelTemplate="{StaticResource StyledLabelTemplate}"
                 Width="400" />
```

### Icon + Text Label Example

```xml
<DataTemplate x:Key="IconLabelTemplate">
    <StackPanel Orientation="Horizontal" Spacing="4">
        <FontIcon Glyph="&#xE7C3;" FontSize="12" />
        <TextBlock Text="{Binding Text}" />
    </StackPanel>
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 LabelTemplate="{StaticResource IconLabelTemplate}"
                 Width="400" />
```

## Label Formatting

Format label values using converters in templates.

### Format String Converter

```xml
<!-- Converter class -->
public class FormatStringConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        if (value is double doubleValue && parameter is string format)
        {
            return doubleValue.ToString(format);
        }
        return value?.ToString();
    }

    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
        throw new NotImplementedException();
    }
}
```

```xml
<!-- Resource declaration -->
<local:FormatStringConverter x:Key="FormatStringConverter" />

<!-- Label template with formatting -->
<DataTemplate x:Key="FormattedLabelTemplate">
    <TextBlock Text="{Binding Value,
                              Converter={StaticResource FormatStringConverter},
                              ConverterParameter='N2'}" />
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 Interval="20"
                 LabelTemplate="{StaticResource FormattedLabelTemplate}"
                 Width="400" />
```

### Common Format Patterns

**Currency:**
```xml
<DataTemplate x:Key="CurrencyLabelTemplate">
    <TextBlock Text="{Binding Value,
                              Converter={StaticResource FormatStringConverter},
                              ConverterParameter='C0'}" />
</DataTemplate>

<slider:SfSlider Minimum="0"
                 Maximum="1000"
                 Interval="100"
                 ShowLabels="True"
                 LabelTemplate="{StaticResource CurrencyLabelTemplate}"
                 Width="400" />
```

**Percentage:**
```xml
<DataTemplate x:Key="PercentLabelTemplate">
    <TextBlock>
        <Run Text="{Binding Value}" />
        <Run Text="%" />
    </TextBlock>
</DataTemplate>

<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="25"
                 ShowLabels="True"
                 LabelTemplate="{StaticResource PercentLabelTemplate}"
                 Width="400" />
```

**Decimal Places:**
```xml
<DataTemplate x:Key="DecimalLabelTemplate">
    <TextBlock Text="{Binding Value,
                              Converter={StaticResource FormatStringConverter},
                              ConverterParameter='F2'}" />
</DataTemplate>
```

**Custom Units:**
```xml
<DataTemplate x:Key="TemperatureLabelTemplate">
    <TextBlock>
        <Run Text="{Binding Value}" />
        <Run Text="°C" />
    </TextBlock>
</DataTemplate>

<slider:SfSlider Minimum="-20"
                 Maximum="40"
                 Interval="10"
                 ShowLabels="True"
                 LabelTemplate="{StaticResource TemperatureLabelTemplate}"
                 Width="400" />
```

## Active Label Styling

Highlight labels in the active range with different styling.

### ActiveLabelTemplate Property

Define a template for labels that fall within the active (filled) range.

```xml
<DataTemplate x:Key="ActiveTrackLabelTemplate">
    <TextBlock Text="{Binding Text}"
               Foreground="{ThemeResource SystemAccentColor}"
               FontWeight="Bold" />
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 LabelOffset="10"
                 ActiveLabelTemplate="{StaticResource ActiveTrackLabelTemplate}"
                 Value="50"
                 Width="400" />
```

```csharp
slider.ShowLabels = true;
slider.LabelOffset = 10;
slider.ActiveLabelTemplate = this.Resources["ActiveTrackLabelTemplate"] as DataTemplate;
```

### Combined Active and Inactive Templates

```xml
<!-- Inactive labels (gray) -->
<DataTemplate x:Key="InactiveLabelTemplate">
    <TextBlock Text="{Binding Text}"
               Foreground="Gray"
               FontSize="12" />
</DataTemplate>

<!-- Active labels (accent color, bold) -->
<DataTemplate x:Key="ActiveLabelTemplate">
    <TextBlock Text="{Binding Text}"
               Foreground="{ThemeResource SystemAccentColor}"
               FontSize="14"
               FontWeight="Bold" />
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 LabelTemplate="{StaticResource InactiveLabelTemplate}"
                 ActiveLabelTemplate="{StaticResource ActiveLabelTemplate}"
                 Value="60"
                 Width="400" />
```

### Background Highlight for Active Labels

```xml
<DataTemplate x:Key="HighlightedActiveLabelTemplate">
    <Border Background="{ThemeResource SystemAccentColor}"
            CornerRadius="4"
            Padding="6,2">
        <TextBlock Text="{Binding Text}"
                   Foreground="White"
                   FontWeight="SemiBold" />
    </Border>
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 LabelOffset="15"
                 ActiveLabelTemplate="{StaticResource HighlightedActiveLabelTemplate}"
                 Width="400" />
```

## Common Use Cases

### Volume Control with Percentage Labels

```xml
<DataTemplate x:Key="VolumeLabelTemplate">
    <TextBlock>
        <Run Text="{Binding Value}" />
        <Run Text="%" FontSize="10" />
    </TextBlock>
</DataTemplate>

<StackPanel>
    <TextBlock Text="Volume" Margin="0,0,0,10" />
    <slider:SfSlider Minimum="0"
                     Maximum="100"
                     Interval="25"
                     Value="75"
                     ShowLabels="True"
                     LabelTemplate="{StaticResource VolumeLabelTemplate}"
                     Width="300" />
</StackPanel>
```

### Price Range with Currency Formatting

```xml
<DataTemplate x:Key="PriceLabelTemplate">
    <TextBlock Text="{Binding Value,
                              Converter={StaticResource FormatStringConverter},
                              ConverterParameter='C0'}"
               FontSize="12" />
</DataTemplate>

<slider:SfSlider Minimum="0"
                 Maximum="1000"
                 Interval="100"
                 Value="500"
                 ShowLabels="True"
                 LabelTemplate="{StaticResource PriceLabelTemplate}"
                 Width="400" />
```

### Temperature Slider

```xml
<DataTemplate x:Key="TempLabelTemplate">
    <StackPanel>
        <TextBlock Text="{Binding Value}" HorizontalAlignment="Center" />
        <TextBlock Text="°C" FontSize="10" Foreground="Gray" HorizontalAlignment="Center" />
    </StackPanel>
</DataTemplate>

<slider:SfSlider Minimum="-20"
                 Maximum="40"
                 Interval="10"
                 Value="22"
                 ShowLabels="True"
                 LabelTemplate="{StaticResource TempLabelTemplate}"
                 Width="400" />
```

### Rating Scale

```xml
<DataTemplate x:Key="RatingLabelTemplate">
    <StackPanel>
        <FontIcon Glyph="&#xE735;" FontSize="16" Foreground="Gold" />
        <TextBlock Text="{Binding Value}" FontSize="12" HorizontalAlignment="Center" />
    </StackPanel>
</DataTemplate>

<slider:SfSlider Minimum="1"
                 Maximum="5"
                 Interval="1"
                 StepFrequency="1"
                 Value="3"
                 ShowLabels="True"
                 LabelTemplate="{StaticResource RatingLabelTemplate}"
                 Width="300" />
```

### Compact Label Design

```xml
<DataTemplate x:Key="CompactLabelTemplate">
    <TextBlock Text="{Binding Text}"
               FontSize="10"
               Foreground="Gray" />
</DataTemplate>

<slider:SfSlider ShowLabels="True"
                 LabelOffset="8"
                 LabelTemplate="{StaticResource CompactLabelTemplate}"
                 Width="400" />
```

## Best Practices

1. **Use ShowLabels Judiciously:** Only show labels when they add value
2. **Set Appropriate Intervals:** Choose intervals that create readable labels
3. **Match Label Format to Use Case:** Currency for prices, percentage for ratios, etc.
4. **Consider Label Overlap:** Use fewer labels or smaller font if they overlap
5. **Provide Adequate Offset:** Ensure labels don't overlap with ticks or track
6. **Use Active Labels for Feedback:** Highlight active range for better UX
7. **Test Responsive Layouts:** Verify labels display well at different widths

## Troubleshooting

**Labels Not Showing:**
- Verify `ShowLabels="True"`
- Check that `Interval` is set or auto-calculated
- Ensure sufficient Width/Height for layout
- Verify labels aren't hidden by container clipping

**Labels Overlapping:**
- Increase `Interval` to show fewer labels
- Reduce `MaximumLabelsCount`
- Decrease font size in label template
- Increase slider Width

**Custom Template Not Applying:**
- Check DataTemplate resource key matches
- Verify template is in accessible resource dictionary
- Ensure binding paths are correct (Value, Text)
- Check DataContext is SliderLabelInfo

**LabelOffset Not Working:**
- Ensure `ShowLabels="True"`
- Check that value is positive number
- Verify sufficient space in parent container

## Next Steps

- [ticks.md](ticks.md) - Add tick marks for visual alignment
- [thumb-tooltip.md](thumb-tooltip.md) - Show value in tooltip
- [track-customization.md](track-customization.md) - Customize track appearance