# Standard Colors in SfColorPalette

## Table of Contents
- [Overview](#overview)
- [Select Built-in Standard Colors](#select-built-in-standard-colors)
- [Add Custom Standard Colors](#add-custom-standard-colors)
- [Show or Hide Standard Color Variants](#show-or-hide-standard-color-variants)
- [Hide Standard Colors Panel](#hide-standard-colors-panel)
- [Customize Standard Palette Header](#customize-standard-palette-header)
- [Adjust Color Shade Spacing](#adjust-color-shade-spacing)

## Overview

The **Standard Colors** panel in `SfColorPalette` displays a fixed row of common colors (Red, Orange, Yellow, Green, Blue, Purple, etc.) with optional shade variants. Unlike theme colors, standard colors do not change with `ActivePalette` — they remain consistent across all themes.

The standard color panel is configured using the `StandardColors` property, which accepts a `StandardPaletteModel`.

## Select Built-in Standard Colors

The standard colors panel is shown by default. Users can select any color from the fixed standard color row:

```xml
<editors:SfColorPalette Name="colorPalette" />
```

```csharp
SfColorPalette colorPalette = new SfColorPalette();
```

## Add Custom Standard Colors

Replace the default standard colors with your own by populating `StandardColors.Colors`. Shade variants are generated automatically from each provided color:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ShowColors="True"
                                      ShowColorShades="True"
                                      Header="Custom Standard Colors">
            <editors:StandardPaletteModel.Colors>
                <editors:ColorCollection>
                    <editors:ColorModel Color="Blue"        Tooltip="Custom Blue" />
                    <editors:ColorModel Color="Orchid"      Tooltip="Custom Orchid" />
                    <editors:ColorModel Color="Gray"        Tooltip="Custom Gray" />
                    <editors:ColorModel Color="Gold"        Tooltip="Custom Gold" />
                    <editors:ColorModel Color="SandyBrown"  Tooltip="Custom SandyBrown" />
                    <editors:ColorModel Color="Pink"        Tooltip="Custom Pink" />
                    <editors:ColorModel Color="Violet"      Tooltip="Custom Violet" />
                    <editors:ColorModel Color="Yellow"      Tooltip="Custom Yellow" />
                    <editors:ColorModel Color="Orange"      Tooltip="Custom Orange" />
                    <editors:ColorModel Color="Red"         Tooltip="Custom Red" />
                </editors:ColorCollection>
            </editors:StandardPaletteModel.Colors>
        </editors:StandardPaletteModel>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

**C# equivalent:**
```csharp
ColorCollection colors = new ColorCollection();
colors.Add(new ColorModel() { Color = Colors.Blue,       Tooltip = "Custom Blue" });
colors.Add(new ColorModel() { Color = Colors.Orchid,     Tooltip = "Custom Orchid" });
colors.Add(new ColorModel() { Color = Colors.Gray,       Tooltip = "Custom Gray" });
colors.Add(new ColorModel() { Color = Colors.Gold,       Tooltip = "Custom Gold" });
colors.Add(new ColorModel() { Color = Colors.SandyBrown, Tooltip = "Custom SandyBrown" });
colors.Add(new ColorModel() { Color = Colors.Pink,       Tooltip = "Custom Pink" });
colors.Add(new ColorModel() { Color = Colors.Violet,     Tooltip = "Custom Violet" });
colors.Add(new ColorModel() { Color = Colors.Yellow,     Tooltip = "Custom Yellow" });
colors.Add(new ColorModel() { Color = Colors.Orange,     Tooltip = "Custom Orange" });
colors.Add(new ColorModel() { Color = Colors.Red,        Tooltip = "Custom Red" });

colorPalette.StandardColors.Colors = colors;
colorPalette.StandardColors.Header = "Custom Standard Colors";
colorPalette.StandardColors.ShowColors = true;
colorPalette.StandardColors.ShowColorShades = true;
```

## Show or Hide Standard Color Variants

By default, shade variants are hidden for standard colors. Enable them using `ShowColorShades`:

```xml
<!-- Show standard colors WITH their shade variants -->
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ShowColorShades="True"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.StandardColors.ShowColorShades = true;
```

> **Default value:** `ShowColorShades` is `false` for standard colors.

## Hide Standard Colors Panel

To hide the standard colors panel entirely, set both `ShowColors` and `ShowColorShades` to `false`:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ShowColors="False"
                                      ShowColorShades="False"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.StandardColors.ShowColors = false;
colorPalette.StandardColors.ShowColorShades = false;
```

> **Default value:** `ShowColors` is `true`.

## Customize Standard Palette Header

### Change Header Text

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel Header="My Standard Colors"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.StandardColors.Header = "My Standard Colors";
```

> **Default value:** `Header` is `"Standard Colors"`.

### Hide the Header

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ShowHeader="False"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.StandardColors.ShowHeader = false;
```

> **Default value:** `ShowHeader` is `true`.

### Custom Header Template

Use `HeaderTemplate` for a fully custom header UI. The DataContext of the template is the `Header` string value:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel>
            <editors:StandardPaletteModel.HeaderTemplate>
                <DataTemplate>
                    <Grid Background="LightBlue">
                        <TextBlock HorizontalAlignment="Center"
                                   VerticalAlignment="Center"
                                   Text="{Binding}"
                                   FontWeight="Bold"
                                   Foreground="Red"/>
                    </Grid>
                </DataTemplate>
            </editors:StandardPaletteModel.HeaderTemplate>
        </editors:StandardPaletteModel>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

## Adjust Color Shade Spacing

Use `ColorShadesSpacing` to control the gap between the base standard color row and its shade variants:

```xml
<editors:SfColorPalette Name="colorPalette">
    <editors:SfColorPalette.StandardColors>
        <editors:StandardPaletteModel ColorShadesSpacing="20"
                                      ShowColorShades="True"/>
    </editors:SfColorPalette.StandardColors>
</editors:SfColorPalette>
```

```csharp
colorPalette.StandardColors.ColorShadesSpacing = 20;
colorPalette.StandardColors.ShowColorShades = true;
```

> **Default value:** `ColorShadesSpacing` is `10`.

## StandardPaletteModel Properties Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ShowColors` | bool | true | Shows/hides the base standard color row |
| `ShowColorShades` | bool | false | Shows/hides the shade variant rows |
| `Colors` | ColorCollection | — | Custom colors to display in the panel |
| `Header` | string | "Standard Colors" | Header label text |
| `ShowHeader` | bool | true | Shows/hides the header |
| `HeaderTemplate` | DataTemplate | — | Custom header UI template |
| `ColorShadesSpacing` | double | 10 | Spacing between base color and shades |

## Difference: Theme Colors vs Standard Colors

| Feature | Theme Colors (`PaletteColors`) | Standard Colors (`StandardColors`) |
|---------|-------------------------------|-------------------------------------|
| Changes with `ActivePalette` | ✅ Yes | ❌ No |
| Default shade visibility | Shown | Hidden |
| Typical use | Coordinated design themes | Fixed common colors |
| Model class | `ColorPaletteModel` | `StandardPaletteModel` |
