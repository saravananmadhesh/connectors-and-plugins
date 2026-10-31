# More Colors Dialog

> **Important:** Update the `Syncfusion.Editors.WinUI` NuGet package to the latest version to ensure the More Colors dialog and recent colors feature work correctly.

## Choosing a Color from More Colors Dialog

The More Colors dialog provides access to the full color spectrum, allowing users to select any RGB color rather than being limited to predefined palette colors.

### How It Works

1. User clicks **"More Colors..."** button in the dropdown palette
2. Extended color picker dialog opens
3. User selects desired color from spectrum
4. User clicks **OK** to confirm selection
5. Selected color becomes the new SelectedBrush
6. Color is automatically added to Recently Used Colors section
7. Dialog closes

### User Workflow

```
Default Palette Visible
    ↓
User clicks "More Colors..."
    ↓
Dialog Opens (Color Spectrum)
    ↓
User Picks Color (e.g., #FF5500)
    ↓
User Clicks OK
    ↓
Color Applied + Added to Recent
    ↓
Dialog Closes
```

### Enabling/Disabling

By default, the More Colors button is shown. You can hide it when custom spectrum selection isn't needed:

```xaml
<!-- Hide More Colors button -->
<editors:SfColorPalette ShowMoreColorsButton="False" />
```

Use `ShowMoreColorsButton="False"` when:
- Limiting selections to predefined colors only
- Working in restricted-access scenarios
- Simplifying the interface

### Example

```xaml
<editors:SfDropDownColorPalette x:Name="colorPalette">
    <!-- User can click "More Colors..." to open spectrum -->
</editors:SfDropDownColorPalette>
```

## Dialog Components

The More Colors dialog typically includes:

### Color Spectrum Picker

A large color gradient area where users click to select colors.

**Features:**
- Horizontal gradient bar: Selects hue
- Large area: Selects saturation and brightness
- Visual crosshair showing current selection

**Interaction:**
```
User clicks gradient → Color changes
User drags on area → Continuous color selection
```

### RGB Input Fields

Manual color entry using Red, Green, Blue values (0-255).

**Example:**
```
Red: 255
Green: 85
Blue: 0
Result: Orange (#FF5500)
```

### Hexadecimal Input

Direct hex color code entry.

**Format:** `#RRGGBB`

**Example:**
```
Input: #FF5500
Result: Orange color selected
```

### OK / Cancel Buttons

- **OK** - Confirm selection, close dialog, apply color
- **Cancel** - Discard selection, close dialog, keep previous color

## Recently Used Colors

The DropDown Color Palette tracks colors selected from the More Colors dialog in the "Recently Used Colors" section.

### Behavior

**Added to Recent:**
- Colors selected from More Colors spectrum picker

**NOT Added to Recent:**
- Colors clicked from Theme Colors section
- Colors clicked from Standard Colors section
- Only custom spectrum selections tracked

### Example Workflow

```
Session 1:
  1. User opens More Colors
  2. Selects orange (#FF5500)
  3. OK clicked → Recently Used now shows orange

Session 2:
  1. User opens palette again
  2. Recently Used section shows orange
  3. User can quickly reselect orange from recent section
```

### Capacity

Recently Used typically stores up to 10 colors. When the limit is reached, oldest colors are removed as new ones are added.

**Example:**
```
Recent Colors (newest first):
1. #FF5500 (orange)      ← Most recent
2. #00AA99 (teal)
3. #CC00FF (purple)
4. ... (up to 10 total)
10. #FF0000 (red)         ← Oldest shown
```

### Accessing Recent Colors Programmatically

You can get the recently selected color list by using the RecentColors collection property.

```csharp
SfColorPalette colorPalette = new SfColorPalette();

//Recently selected color list 
var recentColors = colorPalette.RecentColors;
```

## Practical Examples

### Example 1: Color Picker for Custom Themes

```xaml
<StackPanel Spacing="10">
    <TextBlock Text="Choose a Theme Color:" />
    
    <editors:SfDropDownColorPalette x:Name="themeColorPicker" />
    
    <!-- Preview box shows selected color -->
    <Border Background="{Binding ElementName=themeColorPicker, Path=SelectedBrush}"
            Height="50"
            CornerRadius="4" />
</StackPanel>
```

**User Experience:**
1. See predefined colors first
2. Click "More Colors" for custom theme color
3. See live preview of selection

### Example 2: Text Color and Background Color Pickers

```xaml
<Grid ColumnSpacing="20" Padding="20">
    <Grid.ColumnDefinitions>
        <ColumnDefinition />
        <ColumnDefinition />
    </Grid.ColumnDefinitions>
    
    <!-- Text Color Picker -->
    <StackPanel>
        <TextBlock Text="Text Color:" FontWeight="Bold" />
        <editors:SfDropDownColorPalette 
            x:Name="textColorPicker"
            SelectedBrushChanged="TextColorPicker_SelectedBrushChanged" />
    </StackPanel>
    
    <!-- Background Color Picker -->
    <StackPanel Grid.Column="1">
        <TextBlock Text="Background Color:" FontWeight="Bold" />
        <editors:SfDropDownColorPalette 
            x:Name="bgColorPicker"
            SelectedBrushChanged="BgColorPicker_SelectedBrushChanged" />
    </StackPanel>
    
    <!-- Live preview -->
    <TextBlock Grid.Row="1" 
               Grid.ColumnSpan="2"
               Text="Preview Text"
               Margin="20"
               Foreground="{Binding ElementName=textColorPicker, Path=SelectedBrush}"
               Background="{Binding ElementName=bgColorPicker, Path=SelectedBrush}"
               Padding="20"
               FontSize="18" />
</Grid>
```

**User Experience:**
1. Select text color with palette or spectrum
2. Select background color with palette or spectrum
3. See live preview updating
4. Recently used colors appear for quick re-selection

### Example 3: Data Visualization Color Picker

```xaml
<editors:SfDropDownColorPalette 
    x:Name="dataSeriesColorPicker"
    DropDownPlacement="BottomEdgeAlignedRight"
    Command="{x:Bind UpdateChartSeriesColor}"
    DropDownMode="Split"
    SelectedBrushChanged="ColorPicker_SelectedBrushChanged" />
```

```csharp
private void UpdateChartSeriesColor(object param)
{
    // Apply selected color to chart series
    var selectedColor = dataSeriesColorPicker.SelectedBrush as SolidColorBrush;
    
    if (selectedColor != null && selectedChartSeries != null)
    {
        selectedChartSeries.Fill = selectedColor;
    }
}

private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    // Log color change for analytics
    var newColor = (e.NewBrush as SolidColorBrush)?.Color;
    Analytics.LogColorSelection("chart_series", newColor?.ToString());
}
```

**Use Case:** Choose data series colors in chart builder

## Accessibility Considerations

### Color Contrast

When allowing users to pick any color with More Colors, consider:

- Validate contrast ratios for text
- Warn if selected color has low contrast with background
- Provide contrast checker

### Example: Contrast Validation

```csharp
private void ColorPalette_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    var newColor = (e.NewBrush as SolidColorBrush)?.Color;
    
    if (newColor.HasValue)
    {
        // Calculate contrast ratio
        double contrast = CalculateContrastRatio(newColor.Value, Colors.White);
        
        if (contrast < 4.5)  // WCAG AA standard
        {
            warningText.Text = "Warning: Low contrast - may not meet accessibility standards";
            warningText.Visibility = Visibility.Visible;
        }
        else
        {
            warningText.Visibility = Visibility.Collapsed;
        }
    }
}

private double CalculateContrastRatio(Color foreground, Color background)
{
    // WCAG contrast calculation
    double fgLum = GetRelativeLuminance(foreground);
    double bgLum = GetRelativeLuminance(background);
    
    double lighter = Math.Max(fgLum, bgLum);
    double darker = Math.Min(fgLum, bgLum);
    
    return (lighter + 0.05) / (darker + 0.05);
}

private double GetRelativeLuminance(Color color)
{
    double r = color.R / 255.0;
    double g = color.G / 255.0;
    double b = color.B / 255.0;
    
    r = r <= 0.03928 ? r / 12.92 : Math.Pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.Pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.Pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

### Keyboard Navigation

The spectrum picker in More Colors dialog should support:
- Tab navigation
- Arrow keys for fine-tuning selection
- Enter to confirm
- Escape to cancel

This is handled automatically by the control.

## Tips and Troubleshooting

### Tip 1: Remember Recently Used

Users appreciate quick access to recently used colors. The control handles this automatically.

**Best Practice:** Don't hide More Colors if users might want custom selections.

### Tip 2: Provide Context

Help users understand why they might need the spectrum:

```xaml
<!-- Helpful guidance -->
<TextBlock Text="Don't see the color you want? Click 'More Colors...' to choose from millions of colors" 
           Foreground="Gray" />
```

### Tip 3: Validate Color Changes

If color selections affect other parts of UI, respond to SelectedBrushChanged:

```csharp
private void ColorPalette_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    // Update dependent UI elements
    UpdatePreview();
    ValidateContrast();
    LogAnalytics();
}
```

### Issue: Recently Used Colors Not Appearing

**Cause:** Only colors from More Colors spectrum are tracked, not palette colors.

**Solution:** 
- Click "More Colors..." and select spectrum
- Then that color appears in Recently Used

---

**Complete skill exploration:** Return to component overview to review all features, or check dropdown-customization.md for UI customization.
