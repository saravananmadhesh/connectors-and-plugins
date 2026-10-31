# Best Practices and Troubleshooting for SfColorPalette

## Table of Contents
- [When to Use SfColorPalette vs SfColorPicker](#when-to-use-sfcolorpalette-vs-sfcolorpicker)
- [Common Use Cases](#common-use-cases)
- [Design Guidelines](#design-guidelines)
- [Accessibility Best Practices](#accessibility-best-practices)
- [Integration Patterns](#integration-patterns)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Common Mistakes to Avoid](#common-mistakes-to-avoid)

## When to Use SfColorPalette vs SfColorPicker

### Use SfColorPalette When:

✅ **Predefined color sets are sufficient**
- Document text/highlight colors (like MS Word)
- Theme-based UI color selection
- Brand color pickers with limited choices
- Drawing/annotation tools with fixed swatches

✅ **Users need quick, single-click color selection**
- Simple toolbar color buttons
- Color dropdowns for font or background
- Mobile-friendly compact palette UI

✅ **Consistent color language matters**
- Apps where users must choose from approved colors
- Theme-consistent UI where random colors should be avoided

**Example:**
```xml
<editors:SfColorPalette 
    ShowMoreColorsButton="False"
    ShowNoColorButton="False"
    Name="colorPalette" />
```

### Use SfColorPicker Instead When:

✅ **Precise color selection is needed** — RGB/HSV/CMYK input
✅ **Gradient brushes are required** — Linear or radial gradients
✅ **Any color must be selectable** — Design/creative tools
✅ **Hex code input/output is primary** — Developer tools, design systems

## Common Use Cases

### Use Case 1: Document Text Color Picker

**Scenario:** Font color selector like Microsoft Word's text color button.

```xml
<StackPanel Orientation="Horizontal" Spacing="8">
    <Button Content="A" FontWeight="Bold">
        <Button.Flyout>
            <Flyout>
                <editors:SfColorPalette 
                    x:Name="fontColorPalette"
                    ShowMoreColorsButton="True"
                    SelectedBrushChanged="FontColor_Changed" />
            </Flyout>
        </Button.Flyout>
    </Button>
    <!-- Color indicator strip under button -->
    <Rectangle x:Name="colorIndicator" Width="20" Height="4" />
</StackPanel>
```

```csharp
private void FontColor_Changed(object sender, SelectedBrushChangedEventArgs e)
{
    colorIndicator.Fill = e.NewBrush;
    // Apply to selected text in editor
    richEditBox.Document.Selection.CharacterFormat.ForegroundColor = 
        ((SolidColorBrush)e.NewBrush).Color;
}
```

### Use Case 2: Theme Color Customizer

**Scenario:** Let users pick from a set of brand-approved colors.

```xml
<editors:SfColorPalette Name="themeColorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel 
            Header="Brand Colors"
            ShowColors="True"
            ShowColorShades="True">
            <editors:ColorPaletteModel.Colors>
                <editors:ColorCollection>
                    <editors:ColorModel Color="#FF1464A0" Tooltip="Brand Blue" />
                    <editors:ColorModel Color="#FF00A651" Tooltip="Brand Green" />
                    <editors:ColorModel Color="#FFFF6600" Tooltip="Brand Orange" />
                    <editors:ColorModel Color="#FFD9261C" Tooltip="Brand Red" />
                </editors:ColorCollection>
            </editors:ColorPaletteModel.Colors>
        </editors:ColorPaletteModel>
    </editors:SfColorPalette.PaletteColors>
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ShowColors="False" ShowColorShades="False"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

### Use Case 3: Drawing App Color Swatch

**Scenario:** Pen/brush color picker for an annotation or whiteboard app.

```xml
<editors:SfColorPalette 
    x:Name="drawingColorPalette"
    ShowMoreColorsButton="True"
    ShowNoColorButton="True"
    AutomaticBrush="Black"
    SelectedBrushChanged="DrawingColor_Changed">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ShowColorShades="False"/>
    </editors:SfColorPalette.PaletteColors>
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ShowColorShades="False"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

### Use Case 4: Shape Fill Color in a Form Designer

**Scenario:** Select fill and stroke colors for UI elements in a form design tool.

```xml
<StackPanel Spacing="10">
    <TextBlock Text="Fill Color:" />
    <editors:SfColorPalette 
        x:Name="fillColorPalette"
        ShowNoColorButton="True"
        SelectedBrushChanged="FillColor_Changed" />

    <TextBlock Text="Stroke Color:" />
    <editors:SfColorPalette 
        x:Name="strokeColorPalette"
        ShowNoColorButton="True"
        SelectedBrushChanged="StrokeColor_Changed" />
</StackPanel>
```

## Design Guidelines

### 1. Show Shade Variants for Rich Selection

When users need nuanced color choices (e.g., light vs dark variants of a color), enable shades:

```xml
<editors:SfColorPalette>
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ShowColorShades="True"/>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

### 2. Use ActivePalette to Match App Theme

Align the palette with your application's visual theme:

```csharp
// On theme switch
colorPalette.ActivePalette = ColorPaletteNames.Office;
```

### 3. Restrict Colors for Brand Consistency

In enterprise apps where color choices must stay on-brand, disable More Colors and hide standard colors:

```xml
<editors:SfColorPalette ShowMoreColorsButton="False">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ShowColors="False" ShowColorShades="False"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

### 4. Provide an Automatic Color Reset

Always set `AutomaticBrush` to a sensible default so users can reset easily:

```xml
<editors:SfColorPalette AutomaticBrush="Black" ShowDefaultColorButton="True" />
```

## Accessibility Best Practices

### Keyboard Navigation
- The palette supports Tab and arrow key navigation through color swatches
- Ensure the control is reachable via standard keyboard Tab order

### Screen Reader Support

Add automation properties for assistive technologies:

```xml
<editors:SfColorPalette 
    AutomationProperties.Name="Text Color Palette"
    AutomationProperties.HelpText="Select a color for the selected text" />
```

### Tooltip Reliance
- All color swatches show tooltips with color names — this helps users who are not familiar with color shades
- For custom colors, always set meaningful `Tooltip` values on `ColorModel`

```xml
<editors:ColorModel Color="#FF1464A0" Tooltip="Corporate Blue" />
```

### Avoid Color-Only Feedback
- Always pair color selection with text or icon indicators
- Display the selected color name or hex value alongside the palette when precision matters

## Integration Patterns

### Pattern 1: Flyout Color Palette (Compact Toolbar)

```xml
<Button Content="Text Color ▼">
    <Button.Flyout>
        <Flyout Placement="Bottom">
            <editors:SfColorPalette 
                Width="220"
                ShowMoreColorsButton="True"
                SelectedBrushChanged="OnTextColorChanged" />
        </Flyout>
    </Button.Flyout>
</Button>
```

### Pattern 2: ContentDialog Integration

```csharp
private async Task<Brush> ShowColorPaletteDialogAsync()
{
    var dialog = new ContentDialog
    {
        Title = "Select Color",
        PrimaryButtonText = "OK",
        SecondaryButtonText = "Cancel",
        XamlRoot = this.XamlRoot
    };

    var palette = new SfColorPalette
    {
        ShowMoreColorsButton = true,
        ShowNoColorButton = true
    };

    dialog.Content = palette;

    var result = await dialog.ShowAsync();

    return result == ContentDialogResult.Primary
        ? palette.SelectedBrush
        : null;
}
```

### Pattern 3: Property Panel in a Design Tool

```xml
<StackPanel Spacing="8" Padding="12">
    <TextBlock Text="Appearance" FontWeight="Bold" FontSize="14" />

    <TextBlock Text="Fill Color" />
    <editors:SfColorPalette 
        x:Name="fillPalette"
        ShowNoColorButton="True"
        ShowMoreColorsButton="True" />

    <TextBlock Text="Border Color" Margin="0,8,0,0" />
    <editors:SfColorPalette 
        x:Name="borderPalette"
        ShowNoColorButton="True"
        ShowMoreColorsButton="False" />
</StackPanel>
```

## Troubleshooting Guide

### Problem: Palette Not Rendering

**Symptoms:** Control is invisible or missing.

**Solutions:**
1. Confirm namespace: `xmlns:editors="using:Syncfusion.UI.Xaml.Editors"`
2. Verify NuGet package `Syncfusion.Editors.WinUI` is installed and restored
3. Check that the parent container has non-zero size

### Problem: Colors Not Appearing

**Symptoms:** Theme or standard panels are blank.

**Solutions:**
1. Check `PaletteColors.ShowColors` is `true`
2. Confirm `ActivePalette` is set to a valid `ColorPaletteNames` value
3. Ensure custom `Colors` collection is not empty if using custom colors

### Problem: SelectedBrush Not Updating

**Symptoms:** Clicking a color does not update the bound property.

**Solutions:**
1. Ensure binding `Mode=TwoWay` if using data binding
2. Wire `SelectedBrushChanged` event and update manually if needed
3. Confirm the target property accepts a `Brush` type

### Problem: Recent Colors Not Appearing

**Symptoms:** Recent Colors panel is empty.

**Solution:** Recent Colors only populate from the **More Colors dialog**. Selections from theme/standard panels are not tracked. Enable `ShowMoreColorsButton="True"` and select a color from the dialog.

### Problem: Custom Colors Not Showing Shades

**Symptoms:** Custom colors appear without shade rows.

**Solution:** Set `ShowColorShades="True"` on the `ColorPaletteModel` or `StandardPaletteModel`:

```xml
<editors:ColorPaletteModel ShowColors="True" ShowColorShades="True">
```

### Problem: License Warning at Startup

**Solution:** Register your Syncfusion license in `App.xaml.cs`:

```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
```

## Common Mistakes to Avoid

### Mistake 1: Forgetting Null Checks on SelectedBrush

```csharp
// ❌ Wrong — may throw NullReferenceException
var color = ((SolidColorBrush)colorPalette.SelectedBrush).Color;

// ✅ Correct
if (colorPalette.SelectedBrush is SolidColorBrush solidBrush)
{
    var color = solidBrush.Color;
}
```

### Mistake 2: Expecting Recent Colors from Palette Clicks

```csharp
// ❌ Wrong assumption — recent colors only come from More Colors dialog
colorPalette.ShowMoreColorsButton = false;
var recent = colorPalette.RecentColors; // Will always be empty

// ✅ Correct
colorPalette.ShowMoreColorsButton = true; // Required for RecentColors to populate
```

### Mistake 3: Not Setting Tooltip on Custom ColorModel

```xml
<!-- ❌ No tooltip — users can't identify the color on hover -->
<editors:ColorModel Color="#FF1464A0" />

<!-- ✅ With tooltip -->
<editors:ColorModel Color="#FF1464A0" Tooltip="Corporate Blue" />
```

### Mistake 4: Hiding Both ShowColors and ShowColorShades Unintentionally

```xml
<!-- ❌ This hides the entire panel — may be unintentional -->
<editors:ColorPaletteModel ShowColors="False" ShowColorShades="False"/>

<!-- ✅ If you want just base colors without shades -->
<editors:ColorPaletteModel ShowColors="True" ShowColorShades="False"/>
```

### Mistake 5: Using SfColorPalette When Gradient Brushes Are Needed

`SfColorPalette` only supports `SolidColorBrush`. For gradient brush selection, use `SfColorPicker` instead.

---

**Remember:** `SfColorPalette` is optimized for quick swatch-based selection. For full creative color control, consider `SfColorPicker`. Always provide meaningful tooltips for custom colors and ensure the More Colors button is enabled when you need `RecentColors` tracking.
