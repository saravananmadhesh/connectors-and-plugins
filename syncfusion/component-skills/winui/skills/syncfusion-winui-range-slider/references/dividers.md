# Dividers in WinUI RangeSlider

## Overview

Dividers in the WinUI RangeSlider control are visual separators rendered on the track at major interval points. They provide clear visual demarcation of value ranges and help users understand the slider's scale. This reference guide covers divider configuration, styling, and customization techniques.

**Key Features:**
- Show/hide dividers at interval points
- Customizable size and appearance
- Stroke and fill customization
- Template-based dividers
- Active divider styling

## Basic Configuration

### Show Dividers

Enable dividers on the track using the `ShowDividers` property. Dividers render at positions defined by the `Interval` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      Interval="10"
                      ShowDividers="True" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.Interval = 10;
sfRangeSlider.ShowDividers = true;
this.Content = sfRangeSlider;
```

**Properties:**
- `ShowDividers` (bool): Default is `false`
- Renders dividers at values: 0, 10, 20, 30... (based on `Interval`)

**How It Works:**
- If `Minimum="0"`, `Maximum="100"`, `Interval="10"`
- Dividers appear at: 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100

## Divider Size

### Divider Height and Width

Control the dimensions of dividers using `DividerHeight` and `DividerWidth` properties.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      Interval="10"
                      ShowDividers="True"
                      DividerHeight="4"
                      DividerWidth="4" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.Interval = 10;
sfRangeSlider.ShowDividers = true;
sfRangeSlider.DividerHeight = 4;
sfRangeSlider.DividerWidth = 4;
this.Content = sfRangeSlider;
```

**Properties:**
- `DividerHeight` (double): Vertical dimension
- `DividerWidth` (double): Horizontal dimension
- Both measured in device-independent pixels
- Default values create small circular dividers

## Divider Appearance

### Divider Fill

Customize the fill color of dividers using the `DividerFill` property.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      Interval="10"
                      ShowDividers="True"
                      DividerHeight="10"
                      DividerWidth="10"
                      DividerFill="#ff7979" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.Interval = 10;
sfRangeSlider.ShowDividers = true;
sfRangeSlider.DividerHeight = 10;
sfRangeSlider.DividerWidth = 10;
sfRangeSlider.DividerFill = new SolidColorBrush(ColorHelper.FromArgb(255, 255, 121, 121));
this.Content = sfRangeSlider;
```

**Use Cases:**
- Match brand colors
- Differentiate from track
- Create visual hierarchy

### Divider Stroke

Customize the stroke (border) of dividers using `DividerStroke` and `DividerStrokeThickness`.

**XAML Implementation:**
```xml
<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      Interval="10"
                      ShowDividers="True"
                      DividerHeight="10"
                      DividerWidth="10"
                      DividerStrokeThickness="2"
                      DividerStroke="Red" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
sfRangeSlider.Interval = 10;
sfRangeSlider.ShowDividers = true;
sfRangeSlider.DividerHeight = 10;
sfRangeSlider.DividerWidth = 10;
sfRangeSlider.DividerStrokeThickness = 2;
sfRangeSlider.DividerStroke = new SolidColorBrush(Colors.Red);
this.Content = sfRangeSlider;
```

**Properties:**
- `DividerStrokeThickness` (double): Default is `0`
- `DividerStroke` (Brush): Border color
- Creates outlined dividers when thickness > 0

## Divider Templates

### Custom Divider Template

Create custom divider appearances using `DividerTemplate` with a DataTemplate.

**XAML Implementation:**
```xml
<DataTemplate x:Key="DividerTemplate">
    <Rectangle Height="{Binding DividerHeight}"
               Width="{Binding DividerWidth}"
               Fill="{ThemeResource SystemAltHighColor}"
               Stroke="{ThemeResource SystemAccentColorDark1}"
               StrokeThickness="{Binding DividerStrokeThickness}" />
</DataTemplate>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      Interval="10"
                      ShowDividers="True"
                      DividerHeight="10"
                      DividerWidth="10"
                      DividerStrokeThickness="2"
                      DividerTemplate="{StaticResource DividerTemplate}" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowDividers = true;
sfRangeSlider.DividerHeight = 10;
sfRangeSlider.DividerWidth = 10;
sfRangeSlider.DividerStrokeThickness = 2;
sfRangeSlider.DividerTemplate = this.Resources["DividerTemplate"] as DataTemplate;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**DataContext:** `SliderBase` instance
**Available Bindings:**
- `DividerHeight`
- `DividerWidth`
- `DividerStrokeThickness`
- `DividerFill`
- `DividerStroke`

### Active Divider Template

Define custom appearance for dividers within the selected range using `ActiveDividerTemplate`.

**XAML Implementation:**
```xml
<DataTemplate x:Key="ActiveDividerTemplate">
    <Rectangle Height="10"
               Width="10"
               Fill="{ThemeResource SystemAltHighColor}"
               Stroke="{ThemeResource SystemAccentColorDark1}"
               StrokeThickness="2" />
</DataTemplate>

<slider:SfRangeSlider RangeStart="30"
                      RangeEnd="70"
                      Interval="10"
                      ShowDividers="True"
                      DividerHeight="5"
                      DividerWidth="5"
                      ActiveDividerTemplate="{StaticResource ActiveDividerTemplate}" />
```

**C# Implementation:**
```csharp
SfRangeSlider sfRangeSlider = new SfRangeSlider();
sfRangeSlider.ShowDividers = true;
sfRangeSlider.DividerHeight = 5;
sfRangeSlider.DividerWidth = 5;
sfRangeSlider.ActiveDividerTemplate = this.Resources["ActiveDividerTemplate"] as DataTemplate;
sfRangeSlider.RangeStart = 30;
sfRangeSlider.RangeEnd = 70;
this.Content = sfRangeSlider;
```

**Use Cases:**
- Highlight selected range
- Different sizes for active dividers
- Color-coded range indicators

## Code Examples

### Example 1: Circular Dividers with Fill

```xml
<slider:SfRangeSlider Minimum="0"
                      Maximum="100"
                      Interval="25"
                      RangeStart="25"
                      RangeEnd="75"
                      ShowDividers="True"
                      DividerHeight="8"
                      DividerWidth="8"
                      DividerFill="{ThemeResource SystemAccentColor}" />
```

### Example 2: Outlined Square Dividers

```xml
<slider:SfRangeSlider ShowDividers="True"
                      Interval="20"
                      DividerHeight="12"
                      DividerWidth="12"
                      DividerFill="Transparent"
                      DividerStroke="{ThemeResource SystemAccentColor}"
                      DividerStrokeThickness="2" />
```

### Example 3: Custom Diamond Dividers

```xml
<Page.Resources>
    <DataTemplate x:Key="DiamondDivider">
        <Grid>
            <Polygon Points="0,5 5,0 10,5 5,10"
                     Fill="{ThemeResource SystemAccentColor}"
                     Stroke="{ThemeResource SystemBaseMediumColor}"
                     StrokeThickness="1" />
        </Grid>
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider ShowDividers="True"
                      Interval="10"
                      DividerHeight="10"
                      DividerWidth="10"
                      DividerTemplate="{StaticResource DiamondDivider}" />
```

### Example 4: Active/Inactive Divider Distinction

```xml
<Page.Resources>
    <DataTemplate x:Key="InactiveDividerTemplate">
        <Ellipse Height="6" Width="6"
                 Fill="{ThemeResource SystemBaseLowColor}" />
    </DataTemplate>
    
    <DataTemplate x:Key="ActiveDividerTemplate">
        <Ellipse Height="10" Width="10"
                 Fill="{ThemeResource SystemAccentColor}"
                 Stroke="White"
                 StrokeThickness="2" />
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider ShowDividers="True"
                      Interval="10"
                      RangeStart="30"
                      RangeEnd="70"
                      DividerTemplate="{StaticResource InactiveDividerTemplate}"
                      ActiveDividerTemplate="{StaticResource ActiveDividerTemplate}" />
```

## Common Use Cases

### Use Case 1: Progress Indicator
Large dividers to show milestone points.

```xml
<slider:SfRangeSlider ShowDividers="True"
                      Interval="20"
                      DividerHeight="12"
                      DividerWidth="12"
                      DividerFill="{ThemeResource SystemAccentColor}"
                      ActiveTrackHeight="6"
                      InactiveTrackHeight="6" />
```

### Use Case 2: Price Range Filter
Subtle dividers for price breakpoints.

```xml
<slider:SfRangeSlider ShowDividers="True"
                      Minimum="0"
                      Maximum="1000"
                      Interval="100"
                      DividerHeight="4"
                      DividerWidth="4"
                      DividerFill="{ThemeResource SystemBaseMediumColor}" />
```

### Use Case 3: Media Timeline
Visual markers for chapter points.

```xml
<Page.Resources>
    <DataTemplate x:Key="ChapterDivider">
        <Rectangle Height="16" Width="3"
                   Fill="{ThemeResource SystemAccentColor}"
                   RadiusX="1.5" RadiusY="1.5" />
    </DataTemplate>
</Page.Resources>

<slider:SfRangeSlider ShowDividers="True"
                      Interval="60"
                      DividerTemplate="{StaticResource ChapterDivider}" />
```

## Troubleshooting

### Issue: Dividers Not Displaying

**Problem:** Dividers don't appear on the RangeSlider.

**Solutions:**
1. Verify `ShowDividers="True"` is set
2. Check if `Interval` is set appropriately
3. Ensure `DividerHeight` and `DividerWidth` are greater than 0
4. Verify divider colors contrast with track

```xml
<!-- Correct configuration -->
<slider:SfRangeSlider ShowDividers="True"
                      Interval="10"
                      DividerHeight="6"
                      DividerWidth="6"
                      DividerFill="Red" />
```

### Issue: Dividers Too Small or Invisible

**Problem:** Dividers are present but not visible.

**Solutions:**
1. Increase `DividerHeight` and `DividerWidth`
2. Use contrasting `DividerFill` color
3. Add stroke with `DividerStrokeThickness`
4. Check theme resource colors

```xml
<!-- More visible dividers -->
<slider:SfRangeSlider ShowDividers="True"
                      Interval="10"
                      DividerHeight="10"
                      DividerWidth="10"
                      DividerFill="{ThemeResource SystemAccentColor}"
                      DividerStroke="White"
                      DividerStrokeThickness="2" />
```

### Issue: Active Divider Template Not Applied

**Problem:** Dividers in selected range don't use active template.

**Solutions:**
1. Ensure both `DividerTemplate` and `ActiveDividerTemplate` are set
2. Verify `RangeStart` and `RangeEnd` are set correctly
3. Check DataContext bindings in template
4. Confirm template resources are defined

```xml
<!-- Both templates required -->
<slider:SfRangeSlider ShowDividers="True"
                      DividerTemplate="{StaticResource DividerTemplate}"
                      ActiveDividerTemplate="{StaticResource ActiveDividerTemplate}"
                      RangeStart="20"
                      RangeEnd="80" />
```

### Issue: Dividers Overlapping Track Elements

**Problem:** Dividers obscure track or thumbs.

**Solutions:**
1. Reduce divider size
2. Adjust divider colors for transparency
3. Increase track height
4. Use template with proper z-index

```xml
<!-- Balanced sizing -->
<slider:SfRangeSlider ShowDividers="True"
                      DividerHeight="6"
                      DividerWidth="6"
                      ActiveTrackHeight="8"
                      InactiveTrackHeight="8" />
```

### Issue: Custom Template Not Rendering

**Problem:** Custom `DividerTemplate` doesn't display correctly.

**Solutions:**
1. Verify template is in correct resource dictionary
2. Check DataContext property bindings
3. Ensure element dimensions are set
4. Test template independently in separate control

```xml
<!-- Debug template -->
<DataTemplate x:Key="TestDividerTemplate">
    <Rectangle Height="10" Width="10"
               Fill="Red" />
</DataTemplate>

<slider:SfRangeSlider ShowDividers="True"
                      Interval="10"
                      DividerTemplate="{StaticResource TestDividerTemplate}" />
```

### Issue: Performance with Many Dividers

**Problem:** Slider performance degrades with many dividers.

**Solutions:**
1. Increase `Interval` to reduce divider count
2. Simplify divider templates (avoid complex shapes)
3. Use solid fills instead of gradients

```xml
<!-- Optimized configuration -->
<slider:SfRangeSlider ShowDividers="True"
                      Interval="20"
                      DividerHeight="6"
                      DividerWidth="6"
                      DividerFill="{ThemeResource SystemAccentColor}" />
```

### Styling Best Practices

**Guidelines:**
- Keep dividers smaller than thumbs
- Use contrasting colors for visibility
- Make active dividers visually distinct
- Test in light and dark themes
- Consider touch target sizes for mobile
- Align divider size with overall design system

**Example - Best Practice Configuration:**
```xml
<slider:SfRangeSlider ShowDividers="True"
                      Interval="10"
                      DividerHeight="8"
                      DividerWidth="8"
                      DividerFill="{ThemeResource SystemBaseMediumColor}"
                      DividerStroke="{ThemeResource SystemAltHighColor}"
                      DividerStrokeThickness="1"
                      ActiveTrackHeight="6"
                      InactiveTrackHeight="6" />
```

### Design Considerations

**When to Use Dividers:**
- Long value ranges requiring visual segmentation
- When ticks alone aren't sufficient
- To emphasize specific value points
- In conjunction with labels for better readability

**When to Avoid Dividers:**
- Short sliders with limited space
- When track is already visually busy
- Minimalist UI designs
- If ticks already provide adequate guidance

## Summary

Dividers enhance the RangeSlider by providing clear visual markers at interval points. Key points to remember:

- Enable with `ShowDividers="True"`
- Control size with `DividerHeight` and `DividerWidth`
- Customize appearance using `DividerFill`, `DividerStroke`, and `DividerStrokeThickness`
- Create custom shapes with `DividerTemplate`
- Highlight selected range with `ActiveDividerTemplate`
- Balance visual appeal with performance
- Ensure adequate contrast and sizing for visibility