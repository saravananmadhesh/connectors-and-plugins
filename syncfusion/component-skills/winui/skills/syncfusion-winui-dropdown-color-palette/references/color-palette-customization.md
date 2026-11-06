# Color Palette Customization

> **Note:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is updated to the latest version for full customization support.

## Table of Contents
- [Overview](#overview)
- [Using AttachedFlyout](#using-attachedflyout)
- [SfColorPalette Configuration](#sfcolorpalette-configuration)
- [Custom Theme Colors](#custom-theme-colors)
- [Custom Standard Colors](#custom-standard-colors)
- [Hiding Color Sections](#hiding-color-sections)
- [Practical Examples](#practical-examples)

## Overview

Instead of using the default color sections, you can customize which colors appear in the palette. This is useful for:

- **Brand colors** - Show your company's specific color palette
- **Limited options** - Restrict choices to approved colors
- **Context-specific** - Different colors for different tools (e.g., text color picker vs background color picker)
- **Accessibility** - Ensure sufficient contrast in your color choices

## Using AttachedFlyout

The `AttachedFlyout` property allows you to replace the default palette with a custom `SfColorPalette` control that you configure completely.

### Basic Structure

```xaml
<editors:SfDropDownColorPalette x:Name="colorPalette">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <!-- Custom SfColorPalette here -->
            <editors:SfColorPalette x:Name="customPalette">
                <!-- Configuration -->
            </editors:SfColorPalette>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPalette>
```

## SfColorPalette Configuration

The `SfColorPalette` control is the underlying color picker. When using `AttachedFlyout`, you configure it directly.

### Key Properties

| Property | Type | Purpose |
|----------|------|---------|
| `ShowMoreColorsButton` | bool | Show/hide "More Colors..." button (default: true) |
| `Width` | double | Palette width (default: auto) |
| `Height` | double | Palette height (default: auto) |

### Example Configuration

```xaml
<editors:SfColorPalette 
    ShowMoreColorsButton="False" 
    Width="250">
    <!-- Color definitions -->
</editors:SfColorPalette>
```

## Custom Theme Colors

Define custom color groups with their own names and shade variants.

### Structure

Each theme color group uses `ColorPaletteModel`:

```xaml
<editors:SfColorPalette.PaletteColors>
    <editors:ColorPaletteModel 
        ShowColors="True" 
        ShowColorShades="True"
        Header="Custom Theme Colors">
        <editors:ColorPaletteModel.Colors>
            <editors:ColorCollection>
                <editors:ColorModel Color="#FF11EBF8" Tooltip="Custom Aqua" />
                <editors:ColorModel Color="#FFF80FA6" Tooltip="Custom Deep Pink" />
                <!-- More colors -->
            </editors:ColorCollection>
        </editors:ColorPaletteModel.Colors>
    </editors:ColorPaletteModel>
</editors:SfColorPalette.PaletteColors>
```

### Parts Explained

| Part | Purpose |
|------|---------|
| `Header` | Section title displayed in palette |
| `ShowColors` | Include colors in this group (true/false) |
| `ShowColorShades` | Include shade variants (true/false) |
| `ColorCollection` | List of ColorModel items |
| `ColorModel.Color` | Hex color code (#RRGGBB) |
| `ColorModel.Tooltip` | Hover text for the color |

### Example: Brand Colors

```xaml
<editors:ColorPaletteModel Header="Brand Colors">
    <editors:ColorPaletteModel.Colors>
        <editors:ColorCollection>
            <editors:ColorModel Color="#FF0066CC" Tooltip="Primary Blue" />
            <editors:ColorModel Color="#FF00CC99" Tooltip="Accent Green" />
            <editors:ColorModel Color="#FFFF6600" Tooltip="Highlight Orange" />
            <editors:ColorModel Color="#FFCCCCCC" Tooltip="Light Gray" />
        </editors:ColorCollection>
    </editors:ColorPaletteModel.Colors>
</editors:ColorPaletteModel>
```

## Custom Standard Colors

Define a custom set of standard colors using `StandardPaletteModel`.

### Structure

```xaml
<editors:SfColorPalette.StandardColors>
    <editors:StandardPaletteModel 
        ShowColors="True" 
        ShowColorShades="True"
        Header="Custom Standard Colors">
        <editors:StandardPaletteModel.Colors>
            <editors:ColorCollection>
                <editors:ColorModel Color="Blue" Tooltip="Custom Blue" />
                <editors:ColorModel Color="Red" Tooltip="Custom Red" />
                <!-- More colors -->
            </editors:ColorCollection>
        </editors:StandardPaletteModel.Colors>
    </editors:StandardPaletteModel>
</editors:SfColorPalette.StandardColors>
```

### Color Name Formats

You can use:
- **Named colors:** `Blue`, `Red`, `Green`, `Yellow`, etc.
- **Hex colors:** `#FF0000` (red), `#00FF00` (green)
- **RGB notation:** Hexadecimal only in WinUI XAML

### Example: Pastel Colors

```xaml
<editors:StandardPaletteModel Header="Pastel Colors">
    <editors:StandardPaletteModel.Colors>
        <editors:ColorCollection>
            <editors:ColorModel Color="#FFFFE5E5" Tooltip="Light Pink" />
            <editors:ColorModel Color="#FFE5F2FF" Tooltip="Light Blue" />
            <editors:ColorModel Color="#FFF5FFE5" Tooltip="Light Green" />
            <editors:ColorModel Color="#FFFFFFCC" Tooltip="Light Yellow" />
            <editors:ColorModel Color="#FFFFE5CC" Tooltip="Light Peach" />
        </editors:ColorCollection>
    </editors:StandardPaletteModel.Colors>
</editors:StandardPaletteModel>
```

## Hiding Color Sections

Control visibility of individual color sections and buttons.

### Hide More Colors Button

```xaml
<editors:SfColorPalette ShowMoreColorsButton="False" />
```

Use when:
- You want to limit choices to predefined colors only
- Custom spectrum selection not needed

### Hide Color Shades

```xaml
<editors:SfColorPalette ShowColorShades="False" />
```

Use when:
- Only base colors should be available
- Simpler palette for users

### Hide Color Items

```xaml
<editors:SfColorPalette ShowColors="False" />
```

Use when:
- Only showing structure without colors
- Rare edge case

## Practical Examples

### Example 1: Brand Color Picker

```xaml
<editors:SfDropDownColorPalette x:Name="brandColorPalette">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPalette 
                ShowMoreColorsButton="False"
                Width="200">
                <editors:SfColorPalette.PaletteColors>
                    <editors:ColorPaletteModel 
                        ShowColors="True" 
                        ShowColorShades="True"
                        Header="Company Brand Colors">
                        <editors:ColorPaletteModel.Colors>
                            <editors:ColorCollection>
                                <editors:ColorModel Color="#FF0052CC" Tooltip="Primary" />
                                <editors:ColorModel Color="#FF00D1FF" Tooltip="Secondary" />
                                <editors:ColorModel Color="#FF00E5CC" Tooltip="Success" />
                                <editors:ColorModel Color="#FFFF6B35" Tooltip="Warning" />
                                <editors:ColorModel Color="#FFFF4757" Tooltip="Error" />
                                <editors:ColorModel Color="#FF2A3042" Tooltip="Neutral" />
                            </editors:ColorCollection>
                        </editors:ColorPaletteModel.Colors>
                    </editors:ColorPaletteModel>
                </editors:SfColorPalette.PaletteColors>
            </editors:SfColorPalette>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPalette>
```

**Use Case:** Users can only select from 6 approved company colors with variants.

### Example 2: Web-Safe Colors Only

```xaml
<editors:SfDropDownColorPalette x:Name="webSafeColorPalette">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPalette 
                ShowMoreColorsButton="False"
                ShowColorShades="False"
                Width="180">
                <editors:SfColorPalette.StandardColors>
                    <editors:StandardPaletteModel Header="Web-Safe Colors">
                        <editors:StandardPaletteModel.Colors>
                            <editors:ColorCollection>
                                <editors:ColorModel Color="#FF000000" Tooltip="Black" />
                                <editors:ColorModel Color="#FF333333" Tooltip="Dark Gray" />
                                <editors:ColorModel Color="#FF666666" Tooltip="Gray" />
                                <editors:ColorModel Color="#FF999999" Tooltip="Light Gray" />
                                <editors:ColorModel Color="#FFCCCCCC" Tooltip="Light Gray 2" />
                                <editors:ColorModel Color="#FFFFFFFF" Tooltip="White" />
                                <editors:ColorModel Color="#FFFF0000" Tooltip="Red" />
                                <editors:ColorModel Color="#FF00FF00" Tooltip="Green" />
                                <editors:ColorModel Color="#FF0000FF" Tooltip="Blue" />
                            </editors:ColorCollection>
                        </editors:StandardPaletteModel.Colors>
                    </editors:StandardPaletteModel>
                </editors:SfColorPalette.StandardColors>
            </editors:SfColorPalette>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPalette>
```

**Use Case:** Only basic colors available, no spectrum picker, no variants.

### Example 3: Extended Custom Palette

```xaml
<editors:SfDropDownColorPalette x:Name="extendedColorPalette">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <editors:SfColorPalette Width="280">
                <!-- Custom theme colors -->
                <editors:SfColorPalette.PaletteColors>
                    <editors:ColorPaletteModel 
                        ShowColors="True" 
                        ShowColorShades="True"
                        Header="Material Design Colors">
                        <editors:ColorPaletteModel.Colors>
                            <editors:ColorCollection>
                                <editors:ColorModel Color="#FFF44336" Tooltip="Red" />
                                <editors:ColorModel Color="#FFE91E63" Tooltip="Pink" />
                                <editors:ColorModel Color="#FF9C27B0" Tooltip="Purple" />
                                <editors:ColorModel Color="#FF673AB7" Tooltip="Deep Purple" />
                                <editors:ColorModel Color="#FF3F51B5" Tooltip="Indigo" />
                                <editors:ColorModel Color="#FF2196F3" Tooltip="Blue" />
                                <editors:ColorModel Color="#FF03A9F4" Tooltip="Light Blue" />
                                <editors:ColorModel Color="#FF00BCD4" Tooltip="Cyan" />
                                <editors:ColorModel Color="#FF009688" Tooltip="Teal" />
                                <editors:ColorModel Color="#FF4CAF50" Tooltip="Green" />
                            </editors:ColorCollection>
                        </editors:ColorPaletteModel.Colors>
                    </editors:ColorPaletteModel>
                </editors:SfColorPalette.PaletteColors>
                
                <!-- Custom standard colors -->
                <editors:SfColorPalette.StandardColors>
                    <editors:StandardPaletteModel 
                        ShowColors="True"
                        Header="Grays">
                        <editors:StandardPaletteModel.Colors>
                            <editors:ColorCollection>
                                <editors:ColorModel Color="#FF212121" Tooltip="Almost Black" />
                                <editors:ColorModel Color="#FF424242" Tooltip="Dark Gray" />
                                <editors:ColorModel Color="#FF616161" Tooltip="Gray" />
                                <editors:ColorModel Color="#FF757575" Tooltip="Light Gray" />
                                <editors:ColorModel Color="#FFBDBDBD" Tooltip="Lighter Gray" />
                                <editors:ColorModel Color="#FFEEEEEE" Tooltip="Almost White" />
                            </editors:ColorCollection>
                        </editors:StandardPaletteModel.Colors>
                    </editors:StandardPaletteModel>
                </editors:SfColorPalette.StandardColors>
            </editors:SfColorPalette>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</editors:SfDropDownColorPalette>
```

**Use Case:** Material Design color scheme with theme colors and grayscale options.

## Tips and Best Practices

### Color Tooltips for Accessibility

Always include meaningful tooltips:

```xaml
<!-- Good: Descriptive tooltip -->
<editors:ColorModel Color="#FF0066CC" Tooltip="Primary Blue - Use for buttons" />

<!-- Avoid: Unclear tooltip -->
<editors:ColorModel Color="#FF0066CC" Tooltip="Blue" />
```

### Consistency with Your UI

Match your color palette to your application design:
- Use your brand colors
- Include accessibility-approved contrasts
- Follow Material Design or Fluent Design guidelines

### Keeping It Organized

Group related colors:

```xaml
<!-- Group by purpose -->
<editors:ColorPaletteModel Header="UI Colors">...</editors:ColorPaletteModel>
<editors:ColorPaletteModel Header="Status Colors">...</editors:ColorPaletteModel>
<editors:ColorPaletteModel Header="Chart Colors">...</editors:ColorPaletteModel>
```

---

**Next:** Learn about the More Colors dialog in `more-colors-dialog.md`, or return to core features in `getting-started.md`.
