# UI Customization

## Table of Contents
- [Overview](#overview)
- [Brush Type Options](#brush-type-options)
  - [Enabling All Brush Types](#enabling-all-brush-types)
  - [Solid Color Only](#solid-color-only)
  - [Gradient Only](#gradient-only)
  - [Custom Combinations](#custom-combinations)
- [Interactive Brush Mode Switching](#interactive-brush-mode-switching)
- [Color Spectrum Shape](#color-spectrum-shape)
  - [Box Shape](#box-shape)
  - [Ring Shape](#ring-shape)
  - [When to Use Each Shape](#when-to-use-each-shape)
- [Color Spectrum Components](#color-spectrum-components)
  - [Saturation-Value](#saturation-value)
  - [Hue-Saturation](#hue-saturation)
  - [Hue-Value](#hue-value)
  - [Value-Hue](#value-hue)
  - [Saturation-Hue](#saturation-hue)
  - [Component Combinations](#component-combinations)
- [Common Customization Patterns](#common-customization-patterns)
- [Edge Cases and Gotchas](#edge-cases-and-gotchas)

## Overview

This guide covers UI customization options for the SfColorPicker control, including brush type configurations, color spectrum shapes, and spectrum component selections.

## Brush Type Options

The **BrushTypeOptions** property controls which brush modes are available to users.

### Enabling All Brush Types

Allow users to choose between solid, linear gradient, and radial gradient brushes:

**XAML:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="All"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.All;
```

**Default:** `BrushTypeOptions.All` (all modes enabled)

**User Experience:** Dropdown menu shows "Solid", "Linear", and "Radial" options.

### Solid Color Only

Restrict to solid color selection only:

**XAML:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.SolidColorBrush;
```

**Use Case:** Simple color pickers where gradients aren't needed (theme colors, text colors, etc.).

**Result:** Hides the brush type dropdown entirely.

### Gradient Only

Enable only gradient brush modes (linear and radial):

**XAML:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush,RadialGradientBrush"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.LinearGradientBrush | BrushTypeOptions.RadialGradientBrush;
```

**Use Case:** Background gradient editors, visual effect designers.

**Result:** Dropdown shows only "Linear" and "Radial" options.

### Custom Combinations

Mix and match specific brush types:

**Solid + Linear Only:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush,LinearGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.SolidColorBrush | BrushTypeOptions.LinearGradientBrush;
```

**Solid + Radial Only:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush,RadialGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.SolidColorBrush | BrushTypeOptions.RadialGradientBrush;
```

**Linear Only:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.LinearGradientBrush;
```

**Radial Only:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="RadialGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.RadialGradientBrush;
```

## Interactive Brush Mode Switching

When multiple brush types are enabled, users can switch modes at runtime.

**How It Works:**
1. Dropdown appears at the top of the control
2. User selects "Solid", "Linear", or "Radial"
3. UI updates to show appropriate editors
4. Previous selection is preserved when switching back

**Example - All Modes:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="All"
    x:Name="colorPicker" />
```

**User Flow:**
- Start with solid color selection
- Switch to "Linear" → gradient axis and stops appear
- Switch to "Radial" → radial controls appear
- Switch back to "Solid" → returns to color spectrum

**Programmatic Mode Detection:**
```csharp
private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs args)
{
    if (args.NewBrush is SolidColorBrush)
    {
        // User is in solid color mode
    }
    else if (args.NewBrush is LinearGradientBrush)
    {
        // User is in linear gradient mode
    }
    else if (args.NewBrush is RadialGradientBrush)
    {
        // User is in radial gradient mode
    }
}
```

## Color Spectrum Shape

The **ColorSpectrumShape** property changes the visual appearance of the color selection area.

### Box Shape

Traditional rectangular color spectrum (default):

**XAML:**
```xml
<editors:SfColorPicker 
    ColorSpectrumShape="Box"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.ColorSpectrumShape = ColorSpectrumShape.Box;
```

**Appearance:** 
- Rectangular/square gradient area
- Hue slider on the right side
- Traditional color picker look

**Default:** `ColorSpectrumShape.Box`

### Ring Shape

Circular/ring-shaped color spectrum:

**XAML:**
```xml
<editors:SfColorPicker 
    ColorSpectrumShape="Ring"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.ColorSpectrumShape = ColorSpectrumShape.Ring;
```

**Appearance:**
- Circular/donut-shaped gradient area
- Hue around the outer ring
- Saturation/Value radially inward
- Modern, compact design

**Example with Linear Gradient:**
```xml
<editors:SfColorPicker 
    ColorSpectrumShape="Ring"
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

### When to Use Each Shape

| Shape | Best For | Pros | Cons |
|-------|----------|------|------|
| **Box** | Traditional apps, familiar UX | Standard, predictable, larger selection area | Takes more vertical space |
| **Ring** | Modern apps, compact UIs | Visually interesting, space-efficient | Less familiar to some users |

## Color Spectrum Components

The **ColorSpectrumComponents** property defines which color attributes are mapped to the X and Y axes of the spectrum.

### Saturation-Value

Default configuration (Hue on slider, Saturation/Value in spectrum):

**XAML:**
```xml
<editors:SfColorPicker 
    ColorSpectrumComponents="SaturationValue"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.ColorSpectrumComponents = ColorSpectrumComponents.SaturationValue;
```

**Behavior:**
- **Hue slider:** Select base hue (0-359°)
- **Spectrum X-axis:** Saturation (left = 0%, right = 100%)
- **Spectrum Y-axis:** Value/Brightness (top = 100%, bottom = 0%)

**Default:** `ColorSpectrumComponents.SaturationValue`

**Use Case:** Most common configuration, intuitive for general color selection.

### Hue-Saturation

Hue and Saturation in spectrum, Value on slider:

**XAML:**
```xml
<editors:SfColorPicker 
    ColorSpectrumComponents="HueSaturation"
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.ColorSpectrumComponents = ColorSpectrumComponents.HueSaturation;
colorPicker.BrushTypeOptions = BrushTypeOptions.LinearGradientBrush;
```

**Behavior:**
- **Value slider:** Brightness control (dark to bright)
- **Spectrum X-axis:** Saturation (left = 0%, right = 100%)
- **Spectrum Y-axis:** Hue (0-359°)

**Use Case:** When users need to see all hues at once while adjusting brightness separately.

### Hue-Value

Hue and Value in spectrum, Saturation on slider:

**XAML:**
```xml
<editors:SfColorPicker 
    ColorSpectrumComponents="HueValue"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.ColorSpectrumComponents = ColorSpectrumComponents.HueValue;
```

**Behavior:**
- **Saturation slider:** Color intensity
- **Spectrum X-axis:** Value/Brightness
- **Spectrum Y-axis:** Hue

**Use Case:** Selecting hues with varying brightness, keeping saturation constant.

### Value-Hue

Value and Hue in spectrum, Saturation on slider:

**XAML:**
```xml
<editors:SfColorPicker 
    ColorSpectrumComponents="ValueHue"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.ColorSpectrumComponents = ColorSpectrumComponents.ValueHue;
```

**Behavior:**
- **Saturation slider:** Color intensity
- **Spectrum X-axis:** Hue
- **Spectrum Y-axis:** Value/Brightness

**Use Case:** Alternative layout for Hue-Value.

### Saturation-Hue

Saturation and Hue in spectrum, Value on slider:

**XAML:**
```xml
<editors:SfColorPicker 
    ColorSpectrumComponents="SaturationHue"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.ColorSpectrumComponents = ColorSpectrumComponents.SaturationHue;
```

**Behavior:**
- **Value slider:** Brightness
- **Spectrum X-axis:** Hue
- **Spectrum Y-axis:** Saturation

**Use Case:** Alternative layout for Hue-Saturation.

### Component Combinations

**Ring Shape with Hue-Saturation:**
```xml
<editors:SfColorPicker 
    ColorSpectrumShape="Ring"
    ColorSpectrumComponents="HueSaturation"
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

**Box Shape with Value-Hue:**
```xml
<editors:SfColorPicker 
    ColorSpectrumShape="Box"
    ColorSpectrumComponents="ValueHue"
    x:Name="colorPicker" />
```

## Common Customization Patterns

### Pattern 1: Simple Theme Selector
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush"
    ColorSpectrumShape="Box"
    ColorSpectrumComponents="SaturationValue"
    x:Name="colorPicker" />
```

### Pattern 2: Modern Gradient Editor
```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush,RadialGradientBrush"
    ColorSpectrumShape="Ring"
    ColorSpectrumComponents="HueSaturation"
    x:Name="colorPicker" />
```

### Pattern 3: Compact Color Selector
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush"
    ColorSpectrumShape="Ring"
    ColorSpectrumComponents="SaturationValue"
    AlphaInputOptions="TextInput"
    ColorEditorsVisibilityMode="Collapsed"
    x:Name="colorPicker" />
```

### Pattern 4: Professional Design Tool
```xml
<editors:SfColorPicker 
    BrushTypeOptions="All"
    ColorSpectrumShape="Box"
    ColorSpectrumComponents="SaturationValue"
    ColorChannelOptions="RGB"
    IsHexInputVisible="True"
    ColorEditorsVisibilityMode="Inline"
    x:Name="colorPicker" />
```

### Pattern 5: Linear Gradient Background Editor
```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush"
    ColorSpectrumShape="Ring"
    ColorSpectrumComponents="HueSaturation"
    AxisInputOption="Simple"
    x:Name="colorPicker" />
```