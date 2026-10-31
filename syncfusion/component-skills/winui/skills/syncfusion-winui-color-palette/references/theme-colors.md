# Theme Colors in SfColorPalette

## Table of Contents
- [Overview](#overview)
- [Select Built-in Theme Colors](#select-built-in-theme-colors)
- [Switch Active Palette](#switch-active-palette)
- [Add Custom Theme Colors](#add-custom-theme-colors)
- [Show or Hide Base Theme Colors](#show-or-hide-base-theme-colors)
- [Show or Hide Theme Color Variants](#show-or-hide-theme-color-variants)
- [Customize Theme Palette Header](#customize-theme-palette-header)
- [Adjust Color Shade Spacing](#adjust-color-shade-spacing)
- [Hide the Theme Palette](#hide-the-theme-palette)

## Overview

The **Theme Colors** panel in `SfColorPalette` displays a set of coordinated base colors with their shade variants. The active palette theme can be switched programmatically or via the `ActivePalette` property. The palette is fully customizable — you can add custom colors, change headers, and control visibility of base colors and variants.

The theme palette is configured using the `PaletteColors` property, which accepts a `ColorPaletteModel`.

## Select Built-in Theme Colors

By default, the `SfColorPalette` shows the **Office** theme palette. Users can select any color from the displayed base colors and their shade variants:

```xml
<editors:SfColorPalette Name="colorPalette" />
```

```csharp
SfColorPalette colorPalette = new SfColorPalette();
```

## Switch Active Palette

Use the `ActivePalette` property to change the active built-in theme. The available themes are defined in `ColorPaletteNames`:

```xml
<editors:SfColorPalette ActivePalette="Yellow" Name="colorPalette" />
```

```csharp
colorPalette.ActivePalette = ColorPaletteNames.Yellow;
```

**Available ColorPaletteNames values:**
- `Office` (default)
- `Yellow`
- `Green`
- `Blue`
- `Grayscale`
- `Apex`
- `Aspect`
- `Civic`
- `Concourse`
- `Equity`
- `Flow`
- `Foundry`
- `Median`
- `Metro`
- `Module`
- `Opulent`
- `Oriel`
- `Origin`
- `Paper`
- `Solstice`
- `Technic`
- `Trek`
- `Urban`
- `Verve`

> **Default value:** `ActivePalette` is `Office`.

## Add Custom Theme Colors

Add your own colors to the theme palette using `PaletteColors.Colors`. Shade variants are generated automatically:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ShowColors="True" 
                                   ShowColorShades="True"
                                   Header="Custom Theme Colors">
            <editors:ColorPaletteModel.Colors>
                <editors:ColorCollection>
                    <editors:ColorModel Color="#FF11EBF8" Tooltip="Custom Aqua" />
                    <editors:ColorModel Color="#FFF80FA6" Tooltip="Custom Deep Pink" />
                    <editors:ColorModel Color="#FF8BA7C2" Tooltip="Custom Dark Gray" />
                    <editors:ColorModel Color="#F53CDF07" Tooltip="Custom Lime Green" />
                    <editors:ColorModel Color="#C2929545" Tooltip="Custom Olive Drab" />
                    <editors:ColorModel Color="#2E956145" Tooltip="Custom Sienna" />
                    <editors:ColorModel Color="#78458E95" Tooltip="Custom Steel Blue" />
                    <editors:ColorModel Color="#8B8220E4" Tooltip="Custom Blue Violet" />
                    <editors:ColorModel Color="#FF352722" Tooltip="Custom Dark Slate Gray" />
                    <editors:ColorModel Color="#FF318B86" Tooltip="Custom Sea Green" />
                </editors:ColorCollection>
            </editors:ColorPaletteModel.Colors>
        </editors:ColorPaletteModel>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.PaletteColors.Header = "Custom Theme Colors";
colorPalette.PaletteColors.ShowColors = true;
colorPalette.PaletteColors.ShowColorShades = true;
```

> **Note:** Each `ColorModel` requires a `Color` value and an optional `Tooltip` string displayed on hover.

## Show or Hide Base Theme Colors

Control whether the base row of theme colors is visible using `ShowColors`:

```xml
<!-- Hide base theme colors (only show shades) -->
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ShowColors="False"/>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.PaletteColors.ShowColors = false;
```

> **Default value:** `ShowColors` is `true`.

## Show or Hide Theme Color Variants

Control whether shade/variant rows for each base color are visible using `ShowColorShades`:

```xml
<!-- Show base colors WITH their shade variants -->
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ShowColorShades="True"/>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.PaletteColors.ShowColorShades = true;
```

> **Default value:** `ShowColorShades` is `true`.

## Customize Theme Palette Header

### Change Header Text

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel Header="My Theme Colors"/>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.PaletteColors.Header = "My Theme Colors";
```

> **Default value:** `Header` is `"Theme Colors"`.

### Hide the Header

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ShowHeader="False"/>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.PaletteColors.ShowHeader = false;
```

> **Default value:** `ShowHeader` is `true`.

### Custom Header Template

Use `HeaderTemplate` for a fully custom header UI. The DataContext of the template is the `Header` string value:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel>
            <editors:ColorPaletteModel.HeaderTemplate>
                <DataTemplate>
                    <Grid Background="LightBlue">
                        <TextBlock HorizontalAlignment="Center"
                                   VerticalAlignment="Center"
                                   Text="{Binding}"
                                   FontWeight="Bold"
                                   Foreground="Red"/>
                    </Grid>
                </DataTemplate>
            </editors:ColorPaletteModel.HeaderTemplate>
        </editors:ColorPaletteModel>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

## Adjust Color Shade Spacing

Use `ColorShadesSpacing` to control the gap between the base color row and its shade variants:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ColorShadesSpacing="20"/>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.PaletteColors.ColorShadesSpacing = 20;
```

> **Default value:** `ColorShadesSpacing` is `10`.

## Hide the Theme Palette

To completely hide the theme palette (both base colors and shades), set both `ShowColors` and `ShowColorShades` to `false`:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.PaletteColors>
        <editors:ColorPaletteModel ShowColors="False"
                                   ShowColorShades="False"/>
    </editors:SfColorPalette.PaletteColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.PaletteColors.ShowColors = false;
colorPalette.PaletteColors.ShowColorShades = false;
```

## ColorPaletteModel Properties Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ShowColors` | bool | true | Shows/hides the base theme color row |
| `ShowColorShades` | bool | true | Shows/hides the shade variant rows |
| `Colors` | ColorCollection | — | Custom colors to display in the palette |
| `Header` | string | "Theme Colors" | Header label text |
| `ShowHeader` | bool | true | Shows/hides the header |
| `HeaderTemplate` | DataTemplate | — | Custom header UI template |
| `ColorShadesSpacing` | double | 10 | Spacing between base color and shades |
