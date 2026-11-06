# Solid Color Selection

## Table of Contents
- [Overview](#overview)
- [What is a Solid Color](#what-is-a-solid-color)
- [Selecting Solid Brushes](#selecting-solid-brushes)
  - [Programmatic Selection](#programmatic-selection)
  - [Interactive Selection](#interactive-selection)
- [Color Channel Models](#color-channel-models)
  - [RGB Color Model](#rgb-color-model)
  - [HSV Color Model](#hsv-color-model)
  - [HSL Color Model](#hsl-color-model)
  - [CMYK Color Model](#cmyk-color-model)
  - [Switching Color Channels](#switching-color-channels)
- [Opacity Control](#opacity-control)
  - [Alpha Channel Editing](#alpha-channel-editing)
  - [Alpha Input Options](#alpha-input-options)
- [Hexadecimal Editor](#hexadecimal-editor)
- [Input Options](#input-options)
  - [Color Channel Input Options](#color-channel-input-options)
  - [Editor Visibility Modes](#editor-visibility-modes)
- [Event Handling](#event-handling)
- [Common Scenarios](#common-scenarios)
- [Edge Cases and Gotchas](#edge-cases-and-gotchas)

## Overview

This guide covers solid color selection in the SfColorPicker control, including working with different color models, managing opacity, and handling color change events.

## What is a Solid Color

A **solid color** comprises a single uniform color with an alpha (opacity) value. Unlike gradient brushes that blend multiple colors, solid colors maintain a consistent appearance across the entire painted area.

Solid colors are defined by color channel values that vary by color model:
- **RGB**: Red, Green, Blue (0-255)
- **HSV**: Hue (0-359°), Saturation (0-100%), Value (0-100%)
- **HSL**: Hue (0-359°), Saturation (0-100%), Lightness (0-100%)
- **CMYK**: Cyan, Magenta, Yellow, Key/Black (0-100%)

All models also include an **Alpha** channel (0-255 or 0-100%) for transparency.

## Selecting Solid Brushes

### Programmatic Selection

Use the **SelectedBrush** property to set colors programmatically:

**XAML:**
```xml
<editors:SfColorPicker 
    x:Name="colorPicker"
    SelectedBrush="Yellow" />
```

**C# - Using Named Colors:**
```csharp
colorPicker.SelectedBrush = new SolidColorBrush(Colors.Yellow);
colorPicker.SelectedBrush = new SolidColorBrush(Colors.Red);
colorPicker.SelectedBrush = new SolidColorBrush(Colors.CornflowerBlue);
```

**C# - Using RGB Values:**
```csharp
// Create color from RGB values
var color = ColorHelper.FromArgb(255, 255, 128, 0); // Orange
colorPicker.SelectedBrush = new SolidColorBrush(color);
```

**C# - Using Hex String:**
```csharp
// Convert hex string to color
byte a = 255, r = 255, g = 128, b = 0;
var color = ColorHelper.FromArgb(a, r, g, b);
colorPicker.SelectedBrush = new SolidColorBrush(color);
```

**Default Value:** The default SelectedBrush is `Blue`.

### Interactive Selection

Users can select solid colors at runtime by:

1. **Clicking in the color spectrum** - Select hue and saturation/value
2. **Dragging the hue slider** - Change the base hue
3. **Adjusting color channel sliders** - Fine-tune RGB/HSV/HSL/CMYK values
4. **Typing in text inputs** - Enter precise numeric values
5. **Using the hex editor** - Enter hexadecimal color codes

**Enable Solid Color Mode Only:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.SolidColorBrush;
```

## Color Channel Models

### RGB Color Model

**RGB (Red, Green, Blue)** is the most common color model for digital displays.

- **R (Red)**: 0-255
- **G (Green)**: 0-255
- **B (Blue)**: 0-255
- **A (Alpha)**: 0-255 (transparency)

**Example:**
```xml
<editors:SfColorPicker 
    ColorChannelOptions="RGB"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorChannelOptions = ColorChannelOptions.RGB;
```

**Use Case:** Default choice for web and application development.

### HSV Color Model

**HSV (Hue, Saturation, Value)** provides intuitive color selection based on human color perception.

- **H (Hue)**: 0-359° (color wheel position)
- **S (Saturation)**: 0-100% (color intensity)
- **V (Value)**: 0-100% (brightness)

**Example:**
```xml
<editors:SfColorPicker 
    ColorChannelOptions="HSV"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorChannelOptions = ColorChannelOptions.HSV;
```

**Use Case:** Design tools, color harmony selection, artistic applications.

### HSL Color Model

**HSL (Hue, Saturation, Lightness)** is similar to HSV but uses lightness instead of value.

- **H (Hue)**: 0-359° (color wheel position)
- **S (Saturation)**: 0-100% (color intensity)
- **L (Lightness)**: 0-100% (light to dark)

**Example:**
```xml
<editors:SfColorPicker 
    ColorChannelOptions="HSL"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorChannelOptions = ColorChannelOptions.HSL;
```

**Use Case:** CSS-style color definition, web design tools.

### CMYK Color Model

**CMYK (Cyan, Magenta, Yellow, Key)** is used for print media and subtractive color mixing.

- **C (Cyan)**: 0-100%
- **M (Magenta)**: 0-100%
- **Y (Yellow)**: 0-100%
- **K (Key/Black)**: 0-100%

**Example:**
```xml
<editors:SfColorPicker 
    ColorChannelOptions="CMYK"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorChannelOptions = ColorChannelOptions.CMYK;
```

**Use Case:** Print design, professional graphics applications.

### Switching Color Channels

Users can switch between color models at runtime using the dropdown menu in the control.

**Set Default Model:**
```xml
<editors:SfColorPicker 
    ColorChannelOptions="HSV"
    x:Name="colorPicker" />
```

**The default value** is `ColorChannelOptions.RGB`.

## Opacity Control

### Alpha Channel Editing

Control transparency using the alpha (A) channel:

**Programmatic Alpha Setting:**
```csharp
// Fully opaque (255)
var opaqueColor = Color.FromArgb(255, 255, 0, 0);
colorPicker.SelectedBrush = new SolidColorBrush(opaqueColor);

// 50% transparent (127)
var semiTransparent = Color.FromArgb(127, 255, 0, 0);
colorPicker.SelectedBrush = new SolidColorBrush(semiTransparent);

// Fully transparent (0)
var transparent = Color.FromArgb(0, 255, 0, 0);
colorPicker.SelectedBrush = new SolidColorBrush(transparent);
```

Users can adjust opacity using:
- **Alpha slider** - Horizontal slider below the color spectrum
- **Alpha text input** - Numeric input field

### Alpha Input Options

Control which alpha input methods are available using **AlphaInputOptions**:

**Show Both Slider and Text Input (Default):**
```xml
<editors:SfColorPicker 
    AlphaInputOptions="All"
    x:Name="colorPicker" />
```

**Text Input Only (Hide Slider):**
```xml
<editors:SfColorPicker 
    AlphaInputOptions="TextInput"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.AlphaInputOptions = ColorInputOptions.TextInput;
```

**Slider Only (Hide Text Input):**
```xml
<editors:SfColorPicker 
    AlphaInputOptions="SliderInput"
    x:Name="colorPicker" />
```

```csharp
colorPicker.AlphaInputOptions = ColorInputOptions.SliderInput;
```

**Use Case:** Hide the slider to save vertical space in compact UIs.

## Hexadecimal Editor

The hexadecimal editor allows users to input or view colors in hex format (e.g., #FF5733).

**Default Behavior:** Hex editor is visible by default.

**Hide Hexadecimal Editor:**
```xml
<editors:SfColorPicker 
    IsHexInputVisible="False"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.IsHexInputVisible = false;
```

**Show Hexadecimal Editor (Explicit):**
```xml
<editors:SfColorPicker 
    IsHexInputVisible="True"
    x:Name="colorPicker" />
```

**Hex Format:** `#AARRGGBB` or `#RRGGBB` (alpha optional)

**Use Case:** Web developers and designers familiar with hex color codes.

## Input Options

### Color Channel Input Options

Control how users input color channel values (RGB, HSV, etc.):

**Both Sliders and Text Inputs (Default):**
```xml
<editors:SfColorPicker 
    ColorChannelInputOptions="All"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

**Text Inputs Only:**
```xml
<editors:SfColorPicker 
    ColorChannelInputOptions="TextInput"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorChannelInputOptions = ColorInputOptions.TextInput;
```

**Sliders Only:**
```xml
<editors:SfColorPicker 
    ColorChannelInputOptions="SliderInput"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorChannelInputOptions = ColorInputOptions.SliderInput;
```

**Use Case:** Text-only mode for precision, slider-only for simplified UI.

### Editor Visibility Modes

Control the visibility state of color channel editors:

**Inline (Always Visible - Default):**
```xml
<editors:SfColorPicker 
    ColorEditorsVisibilityMode="Inline"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

**Expandable (Collapsible Section):**
```xml
<editors:SfColorPicker 
    ColorEditorsVisibilityMode="Expandable"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorEditorsVisibilityMode = ColorEditorsVisibilityMode.Expandable;
```

**Collapsed (Hidden by Default):**
```xml
<editors:SfColorPicker 
    ColorEditorsVisibilityMode="Collapsed"
    BrushTypeOptions="SolidColorBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.ColorEditorsVisibilityMode = ColorEditorsVisibilityMode.Collapsed;
```

**Use Case:** Expandable/Collapsed modes save space in compact layouts.

## Event Handling

### SelectedBrushChanged Event

Fired when the user changes the selected color:

**XAML:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush"
    SelectedBrushChanged="ColorPicker_SelectedBrushChanged"
    x:Name="colorPicker" />
```

**C#:**
```csharp
colorPicker.SelectedBrushChanged += ColorPicker_SelectedBrushChanged;

private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs args)
{
    var oldBrush = args.OldBrush;
    var newBrush = args.NewBrush;
    
    if (newBrush is SolidColorBrush solidBrush)
    {
        var color = solidBrush.Color;
        
        // Access color components
        byte alpha = color.A;
        byte red = color.R;
        byte green = color.G;
        byte blue = color.B;
        
        // Use the color
        System.Diagnostics.Debug.WriteLine($"New Color: R={red}, G={green}, B={blue}, A={alpha}");
    }
}
```

**Event Args Properties:**
- **OldBrush**: Previously selected brush
- **NewBrush**: Newly selected brush

## Common Scenarios

### Scenario 1: Theme Color Picker
```xml
<editors:SfColorPicker 
    SelectedBrush="#FF2196F3"
    BrushTypeOptions="SolidColorBrush"
    ColorChannelOptions="RGB"
    IsHexInputVisible="True"
    SelectedBrushChanged="OnThemeColorChanged" />
```

### Scenario 2: Simple Color Selector (No Alpha)
```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.SolidColorBrush;
colorPicker.AlphaInputOptions = ColorInputOptions.TextInput; // Hide alpha slider
colorPicker.IsHexInputVisible = true;
```

### Scenario 3: Advanced Color Editor
```xml
<editors:SfColorPicker 
    BrushTypeOptions="SolidColorBrush"
    ColorChannelOptions="HSV"
    ColorChannelInputOptions="All"
    AlphaInputOptions="All"
    ColorEditorsVisibilityMode="Inline" />
```