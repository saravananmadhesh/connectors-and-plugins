# ToolTip in WinUI RangeSlider

## Table of Contents
- [Overview](#overview)
- [Basic Configuration](#basic-configuration)
- [Tooltip Options](#tooltip-options)
- [Tooltip Formatting](#tooltip-formatting)
- [Tooltip Styling](#tooltip-styling)
- [Tooltip Templates](#tooltip-templates)
- [Code Examples](#code-examples)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

Tooltips in the WinUI RangeSlider provide real-time value feedback during thumb interaction. They display the current selection values and help users understand their selections. This reference guide covers tooltip configuration, styling, and customization techniques.

**Key Features:**
- Show/hide tooltip during interaction
- Display tooltip for one or both thumbs
- Custom text formatting
- Style customization
- Template-based customization
- DataContext access for advanced scenarios

## Basic Configuration

### Show Tooltip

Enable tooltips to display thumb values during interaction using the `ShowToolTip` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ShowToolTip="True" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ShowToolTip = true;
this.Content = sfRangeSlider;
```

**Properties:**
- `ShowToolTip` (bool): Default is `true`
- Displays automatically during thumb interaction
- Hides when interaction ends

**Behavior:**
- Appears when user starts dragging a thumb
- Updates in real-time as thumb moves
- Positioned above the thumb
- Automatically dismissed after drag completes

## Tooltip Options

### Tooltip Display Option

Control which thumbs display tooltips using the `ToolTipOption` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ToolTipOption="ActiveThumb" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ToolTipOption = ToolTipOption.ActiveThumb;
this.Content = sfRangeSlider;
```

**Available Options:**
- `ToolTipOption.BothThumb` (default): Show tooltip for both start and end thumbs
- `ToolTipOption.ActiveThumb`: Show tooltip only for the currently dragged thumb

**Use Cases:**
- `BothThumb`: When users need to see both range values simultaneously
- `ActiveThumb`: For cleaner UI or to reduce visual clutter

## Tooltip Formatting

### Tooltip Text Format

Customize tooltip text formatting using the `ToolTipFormat` property with standard or custom format strings.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ShowToolTip="True"
                      ToolTipFormat="c" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ShowToolTip = true;
sfRangeSlider.ToolTipFormat = "c";
this.Content = sfRangeSlider;
```

**Properties:**
- `ToolTipFormat` (string): Default is `"N2"`
- Uses standard .NET format strings

**Common Format Strings:**
- `N0`: Whole numbers without decimals (e.g., "50")
- `N2`: Two decimal places (e.g., "50.00")
- `N4`: Four decimal places (e.g., "50.0000")
- `C` or `c`: Currency format (e.g., "$50.00")
- `P` or `p`: Percentage format (e.g., "50.00%")
- `F2`: Fixed-point with 2 decimals (e.g., "50.00")
- Custom: e.g., "0.## kg" for custom units

## Tooltip Styling

### Tooltip Style

Customize tooltip appearance using the `ToolTipStyle` property with a Style targeting `SliderToolTip`.

**XAML Implementation:**
```xml
<Style x:Name="ToolTipStyle"
       TargetType="slider:SliderToolTip">
    <Setter Property="Background"
            Value="#1257eb" />
    <Setter Property="Foreground"
            Value="White" />
</Style>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ShowToolTip="True"
                      ToolTipStyle="{StaticResource ToolTipStyle}" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ShowToolTip = true;
sfRangeSlider.ToolTipStyle = this.Resources["ToolTipStyle"] as Style;
this.Content = sfRangeSlider;
```

**TargetType:** `slider:SliderToolTip`
**Customizable Properties:**
- `Background`: Tooltip background color
- `Foreground`: Text color
- `FontSize`: Text size
- `FontWeight`: Text weight
- `Padding`: Internal spacing
- `BorderBrush`: Border color
- `BorderThickness`: Border width
- `CornerRadius`: Rounded corners

## Tooltip Templates

### Custom Tooltip Template

Create fully custom tooltip layouts using `ToolTipTemplate` with a DataTemplate.

**XAML Implementation:**
```xml
<DataTemplate x:Name="ToolTipTemplate">
    <StackPanel Orientation="Horizontal">
        <TextBlock Text="{Binding RangeStartValue}" />
        <TextBlock Text=":"
                   Margin="5,0,5,0" />
        <TextBlock Text="{Binding RangeEndValue}" />
    </StackPanel>
</DataTemplate>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ShowToolTip="True"
                      ToolTipTemplate="{StaticResource ToolTipTemplate}" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.ShowToolTip = true;
sfRangeSlider.ToolTipTemplate = this.Resources["ToolTipTemplate"] as DataTemplate;
this.Content = sfRangeSlider;
```

**DataContext:** `RangeSliderToolTipInfo`

**Available Properties:**
- `RangeStartValue` (double): Current value of start thumb
- `RangeEndValue` (double): Current value of end thumb

## Code Examples

### Example 1: Currency Format Tooltip

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="10000"
                      RangeStart="2000"
                      RangeEnd="8000"
                      ShowToolTip="True"
                      ToolTipFormat="C0"
                      Interval="1000" />
```

### Example 2: Percentage Format Tooltip

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="1"
                      RangeStart="0.3"
                      RangeEnd="0.7"
                      ShowToolTip="True"
                      ToolTipFormat="P0"
                      Interval="0.1" />
```

### Example 3: Custom Styled Tooltip

```xml
<Page.Resources>
    <Style x:Key="CustomTooltipStyle" TargetType="slider:SliderToolTip">
        <Setter Property="Background" Value="#FF5722" />
        <Setter Property="Foreground" Value="White" />
        <Setter Property="FontSize" Value="14" />
        <Setter Property="FontWeight" Value="SemiBold" />
        <Setter Property="Padding" Value="10,6" />
        <Setter Property="CornerRadius" Value="8" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ShowToolTip="True"
                      ToolTipFormat="N0"
                      ToolTipStyle="{StaticResource CustomTooltipStyle}" />
```

### Example 4: Combined Range Display Tooltip

```xml
<Page.Resources>
    <DataTemplate x:Key="RangeTooltipTemplate">
        <Border Background="{ThemeResource SystemAccentColor}"
                CornerRadius="6"
                Padding="12,6">
            <StackPanel Orientation="Vertical" Spacing="4">
                <TextBlock Text="Selected Range"
                           FontSize="11"
                           Foreground="White"
                           Opacity="0.8"
                           HorizontalAlignment="Center" />
                <StackPanel Orientation="Horizontal" Spacing="4">
                    <TextBlock Text="{Binding RangeStartValue, StringFormat='{}{0:N0}'}"
                               FontSize="16"
                               FontWeight="Bold"
                               Foreground="White" />
                    <TextBlock Text="-"
                               FontSize="16"
                               Foreground="White" />
                    <TextBlock Text="{Binding RangeEndValue, StringFormat='{}{0:N0}'}"
                               FontSize="16"
                               FontWeight="Bold"
                               Foreground="White" />
                </StackPanel>
            </StackPanel>
        </Border>
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      ShowToolTip="True"
                      ToolTipTemplate="{StaticResource RangeTooltipTemplate}" />
```

### Example 5: Icon with Value Tooltip

```xml
<Page.Resources>
    <DataTemplate x:Key="IconTooltipTemplate">
        <StackPanel Orientation="Horizontal"
                    Background="{ThemeResource SystemAltHighColor}"
                    Padding="8,4"
                    Spacing="6">
            <FontIcon Glyph="&#xE8CB;"
                      FontSize="14"
                      Foreground="{ThemeResource SystemAccentColor}" />
            <TextBlock Text="{Binding RangeStartValue, StringFormat='{}${0:N0}'}"
                       FontWeight="SemiBold"
                       VerticalAlignment="Center" />
            <TextBlock Text="to"
                       Opacity="0.6"
                       VerticalAlignment="Center" />
            <TextBlock Text="{Binding RangeEndValue, StringFormat='{}${0:N0}'}"
                       FontWeight="SemiBold"
                       VerticalAlignment="Center" />
        </StackPanel>
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider Minimum="0"
                      Maximum="10000"
                      RangeStart="2000"
                      RangeEnd="8000"
                      ShowToolTip="True"
                      ToolTipTemplate="{StaticResource IconTooltipTemplate}" />
```

### Example 6: Tooltip with Unit Labels

```xml
<Page.Resources>
    <local:TemperatureConverter x:Key="TempConverter" />
    
    <DataTemplate x:Key="TemperatureTooltipTemplate">
        <Border Background="#FF5722"
                CornerRadius="4"
                Padding="8,4">
            <StackPanel Orientation="Horizontal" Spacing="4">
                <TextBlock Text="{Binding RangeStartValue, StringFormat='{}{0:N0}°F'}"
                           Foreground="White"
                           FontWeight="SemiBold" />
                <TextBlock Text="—"
                           Foreground="White"
                           Opacity="0.7" />
                <TextBlock Text="{Binding RangeEndValue, StringFormat='{}{0:N0}°F'}"
                           Foreground="White"
                           FontWeight="SemiBold" />
            </StackPanel>
        </Border>
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider Minimum="32"
                      Maximum="212"
                      RangeStart="68"
                      RangeEnd="86"
                      ShowToolTip="True"
                      ToolTipTemplate="{StaticResource TemperatureTooltipTemplate}" />
```

## Common Use Cases

### Use Case 1: Price Range Filter

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="1000"
                      RangeStart="100"
                      RangeEnd="800"
                      ShowToolTip="True"
                      ToolTipFormat="C0"
                      ToolTipOption="ActiveThumb" />
```

### Use Case 2: Age Range Selector

```xml
<Page.Resources>
    <Style x:Key="AgeTooltipStyle" TargetType="slider:SliderToolTip">
        <Setter Property="Background" Value="{ThemeResource SystemAccentColor}" />
        <Setter Property="Foreground" Value="White" />
        <Setter Property="FontSize" Value="13" />
    </Style>
</Page.Resources>

<slider:SfRangeSlider Minimum="18"
                      Maximum="100"
                      RangeStart="25"
                      RangeEnd="65"
                      ShowToolTip="True"
                      ToolTipFormat="N0"
                      ToolTipStyle="{StaticResource AgeTooltipStyle}" />
```

### Use Case 3: Time Range Picker

```xml
<Page.Resources>
    <DataTemplate x:Key="TimeTooltipTemplate">
        <Border Background="#424242"
                CornerRadius="4"
                Padding="10,5">
            <TextBlock Foreground="White"
                       FontWeight="SemiBold">
                <Run Text="{Binding RangeStartValue, StringFormat='{}{0:N0}:00'}" />
                <Run Text=" - " />
                <Run Text="{Binding RangeEndValue, StringFormat='{}{0:N0}:00'}" />
            </TextBlock>
        </Border>
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider Minimum="0"
                      Maximum="24"
                      RangeStart="9"
                      RangeEnd="17"
                      ShowToolTip="True"
                      ToolTipTemplate="{StaticResource TimeTooltipTemplate}" />
```

### Use Case 4: Volume Control

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="100"
                      RangeStart="20"
                      RangeEnd="80"
                      ShowToolTip="True"
                      ToolTipFormat="N0"
                      ToolTipOption="ActiveThumb" />
```

## Troubleshooting

### Issue: Tooltip Not Displaying

**Problem:** Tooltip doesn't appear during thumb interaction.

**Solutions:**
1. Verify `ShowToolTip="True"` is set
2. Ensure thumb interaction is occurring (drag or tap)
3. Check if custom template has valid DataContext bindings
4. Verify tooltip isn't hidden by parent container clipping

```xml
<!-- Correct configuration -->
<slider:SfRangeSlider ShowToolTip="True"
                      RangeStart="30"
                      RangeEnd="70" />
```

### Issue: Tooltip Format Not Applied

**Problem:** `ToolTipFormat` has no visible effect.

**Solutions:**
1. Verify format string is valid .NET format string
2. Check if custom `ToolTipTemplate` overrides format
3. Ensure values are numeric types
4. Test with simple format like "N0" first

```xml
<!-- Test with basic format -->
<slider:SfRangeSlider ShowToolTip="True"
                      ToolTipFormat="N0"
                      RangeStart="30"
                      RangeEnd="70" />
```

### Issue: Custom Tooltip Style Not Applied

**Problem:** `ToolTipStyle` has no visible effect.

**Solutions:**
1. Verify `TargetType="slider:SliderToolTip"` is correct
2. Ensure style is in accessible resource dictionary
3. Check XML namespace for `slider:` prefix
4. Test with simple style first

```xml
<!-- Debug style -->
<Style x:Key="TestTooltipStyle" TargetType="slider:SliderToolTip">
    <Setter Property="Background" Value="Red" />
    <Setter Property="Foreground" Value="White" />
</Style>

<slider:SfRangeSlider ShowToolTip="True"
                      ToolTipStyle="{StaticResource TestTooltipStyle}" />
```

### Issue: Tooltip Template Not Rendering

**Problem:** Custom `ToolTipTemplate` doesn't display correctly.

**Solutions:**
1. Verify DataContext bindings (`RangeStartValue`, `RangeEndValue`)
2. Ensure template elements have proper sizing
3. Check for binding errors in output window
4. Test with simple template first

```xml
<!-- Debug template -->
<DataTemplate x:Key="TestTooltipTemplate">
    <TextBlock Text="{Binding RangeStartValue, StringFormat='{}Value: {0:N0}'}"
               Background="Yellow"
               Padding="10" />
</DataTemplate>

<slider:SfRangeSlider ShowToolTip="True"
                      ToolTipTemplate="{StaticResource TestTooltipTemplate}" />
```

### Issue: Both Thumbs Show Same Tooltip

**Problem:** When `ToolTipOption="BothThumb"`, both tooltips display identical values.

**Solutions:**
1. This is expected behavior - each thumb shows its own value
2. Use `ToolTipOption="ActiveThumb"` if you only want active thumb tooltip
3. Create custom template that displays both values in single tooltip

```xml
<!-- Single tooltip with both values -->
<DataTemplate x:Key="CombinedTooltip">
    <StackPanel Orientation="Horizontal" Spacing="8">
        <TextBlock Text="{Binding RangeStartValue, StringFormat='{}Start: {0:N0}'}" />
        <TextBlock Text="{Binding RangeEndValue, StringFormat='{}End: {0:N0}'}" />
    </StackPanel>
</DataTemplate>
```

### Issue: Tooltip Appears in Wrong Position

**Problem:** Tooltip is clipped or positioned incorrectly.

**Solutions:**
1. Ensure parent container doesn't have `ClipToBounds="True"`
2. Verify sufficient margin around slider control
3. Check Z-index of overlapping elements
4. Consider reducing tooltip size

```xml
<!-- Proper container setup -->
<Grid Margin="20">
    <slider:SfRangeSlider ShowToolTip="True" />
</Grid>
```

### Issue: Tooltip Flickers or Updates Slowly

**Problem:** Tooltip display is jerky or updates with delay.

**Solutions:**
1. Simplify tooltip template (avoid complex visual trees)
2. Reduce number of bindings in template
3. Use simple format strings instead of converters
4. Avoid heavy computations in converters

```xml
<!-- Optimized tooltip -->
<slider:SfRangeSlider ShowToolTip="True"
                      ToolTipFormat="N0" />
```

### Accessibility Considerations

**Best Practices:**
- Ensure tooltip text has sufficient contrast ratio
- Use appropriate font sizes (minimum 12-14pt)
- Don't rely solely on color to convey information
- Consider users with limited dexterity (larger hit targets)

**Example - Accessible Tooltip:**
```xml
<Style x:Key="AccessibleTooltipStyle" TargetType="slider:SliderToolTip">
    <Setter Property="Background" Value="{ThemeResource SystemAccentColor}" />
    <Setter Property="Foreground" Value="White" />
    <Setter Property="FontSize" Value="14" />
    <Setter Property="FontWeight" Value="SemiBold" />
    <Setter Property="Padding" Value="12,8" />
</Style>

<slider:SfRangeSlider ShowToolTip="True"
                      ToolTipStyle="{StaticResource AccessibleTooltipStyle}" />
```

### Performance Considerations

**Guidelines:**
- Keep tooltip templates simple
- Avoid complex converters in bindings
- Use static resources for repeated elements
- Test on target hardware for smooth interaction

**Example - Performance-Optimized:**
```xml
<slider:SfRangeSlider ShowToolTip="True"
                      ToolTipFormat="N0"
                      ToolTipOption="ActiveThumb" />
```

## Summary

Tooltips enhance the RangeSlider by providing real-time value feedback. Key points to remember:

- Enable with `ShowToolTip="True"`
- Control display with `ToolTipOption` (BothThumb or ActiveThumb)
- Format values using `ToolTipFormat` with standard .NET format strings
- Customize appearance with `ToolTipStyle` targeting `SliderToolTip`
- Create custom layouts with `ToolTipTemplate` using `RangeSliderToolTipInfo` DataContext
- Access `RangeStartValue` and `RangeEndValue` in templates
- Ensure adequate contrast and sizing for accessibility
- Optimize templates for smooth interaction
- Test tooltip visibility across different container configurations