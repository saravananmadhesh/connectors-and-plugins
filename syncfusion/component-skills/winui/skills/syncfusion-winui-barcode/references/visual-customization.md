# Visual Customization

The Syncfusion WinUI Barcode control provides extensive visual customization options to match your application's design requirements. Customize colors, bar widths, sizing behavior, and rotation angles to create professional-looking barcodes.

## Table of Contents
- [Background Color](#background-color)
- [Foreground Color](#foreground-color)
- [Scanner Readability Considerations](#scanner-readability-considerations)
- [Module Property (Bar Width)](#module-property-bar-width)
- [AutoModule Property (2D Barcode Sizing)](#automodule-property-2d-barcode-sizing)
- [Rotation Angle](#rotation-angle)
- [Complete Customization Examples](#complete-customization-examples)

## Background Color

The `Background` property controls the background color of the barcode control. This is the color behind the bars/spaces or the light areas in 2D barcodes.

### Default Background (Transparent/White)

```xml
<syncfusion:SfBarcode Value="1010111011" Height="150" Width="250">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Custom Background Color

```xml
<syncfusion:SfBarcode Value="1010111011" 
                       Height="150" 
                       Width="250"
                       Background="Orange">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Using Brush Objects

**XAML:**
```xml
<syncfusion:SfBarcode Value="1010111011" Height="150" Width="250">
    <syncfusion:SfBarcode.Background>
        <SolidColorBrush Color="LightYellow"/>
    </syncfusion:SfBarcode.Background>
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**C#:**
```csharp
using Microsoft.UI;
using Microsoft.UI.Xaml.Media;

barcode.Background = new SolidColorBrush(Colors.LightYellow);
```

### Gradient Background

```xml
<syncfusion:SfBarcode Value="GRADIENT" Height="150" Width="250">
    <syncfusion:SfBarcode.Background>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="White" Offset="0"/>
            <GradientStop Color="LightGray" Offset="1"/>
        </LinearGradientBrush>
    </syncfusion:SfBarcode.Background>
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Note:** While gradient backgrounds are supported, solid light colors are recommended for optimal scanner readability.

## Foreground Color

The `Foreground` property controls the color of the barcode bars (1D) or dots/modules (2D). Default is black.

### Default Foreground (Black)

```xml
<syncfusion:SfBarcode Value="1010111011" Height="150" Width="250">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Custom Foreground Color

```xml
<syncfusion:SfBarcode Value="1010111011" 
                       Height="150" 
                       Width="250"
                       Foreground="DarkBlue">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Programmatic Color Setting

```csharp
using Microsoft.UI;
using Microsoft.UI.Xaml.Media;

barcode.Foreground = new SolidColorBrush(Colors.Navy);
barcode.Background = new SolidColorBrush(Colors.White);
```

### Combined Color Customization

```xml
<syncfusion:SfBarcode Value="COLORED" 
                       Height="150" 
                       Width="300"
                       Background="LightYellow"
                       Foreground="DarkBlue">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code128BBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

## Scanner Readability Considerations

⚠️ **Critical for Production Use**

### Contrast Requirements

To be recognized by barcode scanners, a barcode must have **adequate contrast** between dark bars/modules and light spaces/background.

**Recommended Color Combinations:**

| Background | Foreground | Readability |
|------------|------------|-------------|
| White | Black | ✅ Excellent (Standard) |
| Light Gray | Black | ✅ Excellent |
| Yellow | Black | ✅ Good |
| White | Dark Blue | ✅ Good |
| Orange | Black | ⚠️ Fair (test required) |
| Light Blue | Dark Blue | ⚠️ Fair (test required) |
| Gray | Dark Gray | ❌ Poor (insufficient contrast) |
| Black | White | ✅ Good (inverted) |

### Color Limitations

**Not all barcode scanners support colored barcodes.** Many industrial scanners are optimized for:
- Black bars on white background
- High contrast monochrome codes
- Specific wavelengths (often red laser)

### Best Practices for Production

1. **Use standard black on white** for maximum compatibility
2. **Test with actual scanners** if using colors
3. **Maintain high contrast ratio** (minimum 70% difference)
4. **Avoid similar colors** (e.g., dark blue on dark green)
5. **Consider scanner type**:
   - Laser scanners: May not read colors well
   - Imager scanners: Better color tolerance
   - Camera-based: Good color support

### Color Validation Example

```csharp
public bool ValidateBarcodeContrast(Color background, Color foreground)
{
    // Calculate luminance for contrast ratio
    double bgLuminance = (0.299 * background.R + 0.587 * background.G + 0.114 * background.B) / 255;
    double fgLuminance = (0.299 * foreground.R + 0.587 * foreground.G + 0.114 * foreground.B) / 255;
    
    double contrastRatio = Math.Abs(bgLuminance - fgLuminance);
    
    // Minimum 70% contrast recommended
    return contrastRatio >= 0.7;
}
```

## Module Property (Bar Width)

The `Module` property controls the width ratio of bars in one-dimensional barcodes. Higher values create wider bars and spaces.

### Default Module

```xml
<syncfusion:SfBarcode Value="48625310" 
                       ShowValue="False" 
                       Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Narrow Bars (Module = 1)

```xml
<syncfusion:SfBarcode Value="48625310" 
                       Module="1"
                       ShowValue="False" 
                       Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Compact barcode with thin bars, fits more data in less space.

### Standard Bars (Module = 2)

```xml
<syncfusion:SfBarcode Value="48625310" 
                       Module="2"
                       ShowValue="False" 
                       Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Standard width bars, good balance of size and readability.

### Wide Bars (Module = 3)

```xml
<syncfusion:SfBarcode Value="48625310" 
                       Module="3"
                       ShowValue="False" 
                       Height="150"
                       Width="350">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Thick bars, easier to scan from distance but requires more space.

### Programmatic Module Setting

```csharp
barcode.Module = 2.5;  // Can use decimal values
```

### Module Selection Guide

| Use Case | Recommended Module |
|----------|-------------------|
| **Small labels** | 1-1.5 |
| **Standard labels** | 2-2.5 |
| **Large format printing** | 3-4 |
| **Distance scanning** | 3-5 |
| **High-density data** | 1-2 |

**Note:** Module property affects 1D barcodes. For 2D barcodes (QR, DataMatrix), use the `AutoModule` property instead.

## AutoModule Property (2D Barcode Sizing)

The `AutoModule` property enables automatic sizing for 2D barcodes (QRBarcode and DataMatrixBarcode) based on the available control size.

### Default Sizing (AutoModule = False)

```xml
<syncfusion:SfBarcode Value="QRBarcode" 
                       Width="200" 
                       Height="200"
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** QR code size determined by data content and version.

### Auto-Sizing Enabled (AutoModule = True)

```xml
<syncfusion:SfBarcode Value="QRBarcode" 
                       Width="400" 
                       Height="400"
                       AutoModule="True"
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** QR code scales to fill the 400x400 control size.

### DataMatrix with AutoModule

```xml
<syncfusion:SfBarcode Value="DataMatrix123" 
                       Width="300" 
                       Height="300"
                       AutoModule="True"
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Programmatic AutoModule

```csharp
// Enable auto-sizing for 2D barcode
barcode.AutoModule = true;
barcode.Width = 300;
barcode.Height = 300;
barcode.Symbology = new QRBarcode();
```

### AutoModule Benefits

- **Responsive layouts:** Barcode scales with container size
- **Consistent appearance:** Fills designated space uniformly
- **Simplified sizing:** No manual calculation of module sizes
- **Adaptive display:** Works across different screen resolutions

### When to Use AutoModule

| Scenario | Use AutoModule |
|----------|----------------|
| **Fixed container size** | ✅ Yes |
| **Responsive UI** | ✅ Yes |
| **Print at specific size** | ✅ Yes |
| **Dynamic content length** | ⚠️ Maybe (test with longest data) |
| **Precise module control** | ❌ No (set explicitly instead) |

## Rotation Angle

The `RotationAngle` property rotates the entire barcode (bars + text) in 90-degree increments. Uses the `BarcodeRotation` enumeration.

### No Rotation (Angle0 - Default)

```xml
<syncfusion:SfBarcode Value="1010111011" 
                       RotationAngle="Angle0"
                       Height="150" 
                       Width="250">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Standard horizontal barcode.

### 90-Degree Rotation (Angle90)

```xml
<syncfusion:SfBarcode Value="1010111011" 
                       RotationAngle="Angle90"
                       Height="250" 
                       Width="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Barcode rotated 90° clockwise (vertical, bars point right).

### 180-Degree Rotation (Angle180)

```xml
<syncfusion:SfBarcode Value="1010111011" 
                       RotationAngle="Angle180"
                       Height="150" 
                       Width="250">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Barcode upside-down (text at top).

### 270-Degree Rotation (Angle270)

```xml
<syncfusion:SfBarcode Value="1010111011" 
                       RotationAngle="Angle270"
                       Height="250" 
                       Width="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Barcode rotated 270° clockwise (vertical, bars point left).

### BarcodeRotation Enumeration

| Enum Value | Rotation | Description |
|------------|----------|-------------|
| `Angle0` | 0° | Standard horizontal orientation |
| `Angle90` | 90° clockwise | Vertical, text on right |
| `Angle180` | 180° | Upside-down |
| `Angle270` | 270° clockwise | Vertical, text on left |

### Programmatic Rotation

```csharp
using Syncfusion.UI.Xaml.Barcode;

barcode.RotationAngle = BarcodeRotation.Angle90;
```

### Rotation Use Cases

| Use Case | Recommended Angle |
|----------|-------------------|
| **Horizontal labels** | Angle0 |
| **Vertical shelf labels** | Angle90 or Angle270 |
| **Upside-down mounting** | Angle180 |
| **Side panel labels** | Angle90 or Angle270 |
| **Rotating carousel** | Dynamic (change as needed) |

### Important: Width and Height with Rotation

When rotating, consider swapping Width and Height:

```xml
<!-- Horizontal barcode: Width > Height -->
<syncfusion:SfBarcode RotationAngle="Angle0" Height="150" Width="300" ... />

<!-- Vertical barcode: Height > Width (swapped) -->
<syncfusion:SfBarcode RotationAngle="Angle90" Height="300" Width="150" ... />
```

## Complete Customization Examples

### Example 1: High-Contrast Product Label

```xml
<syncfusion:SfBarcode Value="PROD-12345" 
                       Height="150" 
                       Width="300"
                       Background="White"
                       Foreground="Black"
                       Module="2"
                       ShowValue="True"
                       HorizontalTextAlignment="Center">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Example 2: Colored QR Code with Auto-Sizing

```xml
<syncfusion:SfBarcode Value="https://example.com/product/12345" 
                       Width="250" 
                       Height="250"
                       Background="LightBlue"
                       Foreground="DarkBlue"
                       AutoModule="True"
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Example 3: Vertical Shipping Label

```xml
<syncfusion:SfBarcode Value="SHIP-2024-A456" 
                       Height="400" 
                       Width="150"
                       RotationAngle="Angle90"
                       Module="2.5"
                       Background="White"
                       Foreground="Black"
                       ShowValue="True">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code128CBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Example 4: Compact DataMatrix

```xml
<syncfusion:SfBarcode Value="DM123456" 
                       Width="100" 
                       Height="100"
                       AutoModule="True"
                       ShowValue="False"
                       Background="White"
                       Foreground="Black">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Example 5: Themed Barcode (Dynamic)

```csharp
public void ApplyTheme(SfBarcode barcode, bool isDarkMode)
{
    if (isDarkMode)
    {
        barcode.Background = new SolidColorBrush(Colors.Black);
        barcode.Foreground = new SolidColorBrush(Colors.White);
    }
    else
    {
        barcode.Background = new SolidColorBrush(Colors.White);
        barcode.Foreground = new SolidColorBrush(Colors.Black);
    }
}
```

## Best Practices

1. **Prioritize readability over aesthetics** - Use standard black on white for production
2. **Test with target scanners** - Verify colored barcodes work with your equipment
3. **Maintain high contrast** - Minimum 70% luminance difference
4. **Use AutoModule for 2D barcodes** - Simplifies responsive sizing
5. **Adjust Module based on label size** - Larger labels can use wider bars
6. **Consider rotation early** - Account for rotated dimensions in layout design
7. **Match theme consistently** - If using colors, apply across all barcodes in app
8. **Document scanner compatibility** - Note any color or rotation limitations

## Troubleshooting

### Issue: Scanner cannot read colored barcode
**Solution:** 
- Switch to black foreground on white background
- Test with different scanners (laser vs imager)
- Increase contrast ratio between colors

### Issue: Barcode appears too small after rotation
**Solution:**
```xml
<!-- Swap Width and Height when rotating 90° or 270° -->
<syncfusion:SfBarcode RotationAngle="Angle90" Height="300" Width="150" ... />
```

### Issue: AutoModule doesn't seem to work
**Solution:**
- Verify you're using QRBarcode or DataMatrixBarcode (AutoModule only works with 2D)
- Set explicit Width and Height on the control
- Ensure AutoModule="True" is set

### Issue: Bars are too thin to scan reliably
**Solution:**
```xml
<syncfusion:SfBarcode Module="3" ... />  <!-- Increase from default -->
```
