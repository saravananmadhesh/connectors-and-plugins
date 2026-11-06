# Getting Started with WinUI DropDown Color Picker

## Table of Contents
- [Installation](#installation)
- [Control Structure](#control-structure)
- [Basic XAML Implementation](#basic-xaml-implementation)
- [Basic C# Implementation](#basic-c-implementation)
- [Programmatic Color Selection](#programmatic-color-selection)
- [Interactive Color Selection](#interactive-color-selection)
- [Color Channel Modes](#color-channel-modes)
- [Opacity and Alpha Values](#opacity-and-alpha-values)
- [Hexadecimal Color Editor](#hexadecimal-color-editor)
- [Listening to Color Changes](#listening-to-color-changes)

## Installation

> **Note:** Ensure you update the `Syncfusion.Editors.WinUI` NuGet package to the latest available version before building or releasing your application.

### Step 1: Create WinUI 3 Desktop Application

Create a new WinUI 3 desktop app for C# and .NET 8.0 or later (latest: .NET 10.0 recommended) in Visual Studio.

### Step 2: Add NuGet Package

Install the Syncfusion.Editors.WinUI NuGet package:

```powershell
Install-Package Syncfusion.Editors.WinUI
```

Or use the NuGet Package Manager UI:
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Editors.WinUI"
3. Select the latest available version
3. Click Install

### Step 3: Import Namespace

Add the namespace to your XAML or C# code:

```xaml
xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
```

```csharp
using Syncfusion.UI.Xaml.Editors;
```

## Control Structure

The DropDown Color Picker consists of:
- **Header Button**: Displays the selected color; clicking opens the color picker
- **Color Spectrum**: Visual gradient area for color selection
- **Hue Slider**: Vertical slider to select hue values
- **Color Channel Editor**: Input fields for RGB, HSV, HSL, CMYK, or Hex values
- **Opacity Slider**: Alpha channel adjustment with numeric input
- **OK Button**: Confirms color selection

## Basic XAML Implementation

### Minimal Example

```xaml
<Page
    x:Class="GettingStarted.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <Grid>
        <editors:SfDropDownColorPicker x:Name="colorPicker" />
    </Grid>
</Page>
```

### With Initial Color

```xaml
<editors:SfDropDownColorPicker x:Name="colorPicker" 
                               SelectedBrush="Yellow" />
```

### With Width and Height

```xaml
<editors:SfDropDownColorPicker x:Name="colorPicker"
                               Width="150"
                               Height="40"
                               SelectedBrush="Blue" />
```

## Basic C# Implementation

### Creating in Code-Behind

```csharp
using Syncfusion.UI.Xaml.Editors;

namespace GettingStarted
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            
            // Create color picker
            SfDropDownColorPicker colorPicker = new SfDropDownColorPicker();
            
            // Set initial color
            colorPicker.SelectedBrush = new SolidColorBrush(Colors.Blue);
            
            // Add to container
            grid.Children.Add(colorPicker);
        }
    }
}
```

## Programmatic Color Selection

### Set Color from Code

Set the selected color programmatically using the `SelectedBrush` property:

```csharp
// Set solid color by SolidColorBrush
colorPicker.SelectedBrush = new SolidColorBrush(Colors.Red);

// Set color from hex value
colorPicker.SelectedBrush = new SolidColorBrush(Color.FromArgb(255, 0, 255, 0));

// Set color with alpha/opacity
colorPicker.SelectedBrush = new SolidColorBrush(Color.FromArgb(128, 255, 0, 0)); // 50% opacity red
```

### Get Current Color

Retrieve the currently selected color:

```csharp
SolidColorBrush selectedBrush = colorPicker.SelectedBrush as SolidColorBrush;
if (selectedBrush != null)
{
    Color selectedColor = selectedBrush.Color;
    byte red = selectedColor.R;
    byte green = selectedColor.G;
    byte blue = selectedColor.B;
    byte alpha = selectedColor.A;
    
    Debug.WriteLine($"Selected: R={red} G={green} B={blue} A={alpha}");
}
```

## Interactive Color Selection

### User Selection Flow

1. User clicks the DropDown Color Picker header
2. Color picker flyout opens showing color spectrum and sliders
3. User drags in the spectrum area to select color and hue
4. Color preview updates in real-time
5. User clicks "OK" button to confirm selection
6. `SelectedBrushChanged` event fires with old and new color values

### XAML Example

```xaml
<editors:SfDropDownColorPicker x:Name="colorPicker" 
                               SelectedBrush="Blue" />

<Rectangle x:Name="previewRectangle" 
           Fill="{x:Bind colorPicker.SelectedBrush, Mode=OneWay}"
           Width="200"
           Height="100" />
```

### C# Event Handler

```csharp
colorPicker.SelectedBrushChanged += ColorPicker_SelectedBrushChanged;

private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    // Color changed
    SolidColorBrush oldColor = e.OldBrush as SolidColorBrush;
    SolidColorBrush newColor = e.NewBrush as SolidColorBrush;
    
    Debug.WriteLine($"Color changed from {oldColor?.Color} to {newColor?.Color}");
}
```

## Color Channel Modes

### Switching Between Color Spaces

Users can switch between different color channel modes using the dropdown in the color picker:

**Supported Modes:**
- **RGB** (Red, Green, Blue): 0-255 values
- **HSV** (Hue, Saturation, Value): Hue 0-360°, Saturation & Value 0-100%
- **HSL** (Hue, Saturation, Lightness): Hue 0-360°, Saturation & Lightness 0-100%
- **CMYK** (Cyan, Magenta, Yellow, Black): 0-100% values

### User Experience

The color picker automatically displays input fields for the selected color space:

```
RGB Mode:
[R: 255] [G: 100] [B: 50]

HSV Mode:
[H: 15°] [S: 80%] [V: 100%]

HSL Mode:
[H: 15°] [S: 100%] [L: 61%]

CMYK Mode:
[C: 0%] [M: 60%] [Y: 80%] [K: 0%]
```

Users can type values directly to set the color, or the values update when dragging the spectrum.

## Opacity and Alpha Values

### Adjusting Transparency

Below the color spectrum, there's an opacity slider and input field:

**Alpha Slider:**
- Ranges from 0 (fully transparent) to 255 (fully opaque)
- Visual gradient shows transparency levels
- Draggable handle for quick adjustment

**Alpha Input Field:**
- Type exact alpha values (0-255)
- Updates in real-time as user drags spectrum

### Programmatic Opacity Control

```csharp
// Set color with 50% opacity (alpha = 128)
colorPicker.SelectedBrush = new SolidColorBrush(Color.FromArgb(128, 255, 0, 0));

// Set full opacity (alpha = 255)
colorPicker.SelectedBrush = new SolidColorBrush(Color.FromArgb(255, 0, 255, 0));

// Set fully transparent (alpha = 0)
colorPicker.SelectedBrush = new SolidColorBrush(Color.FromArgb(0, 0, 0, 255));
```

### Get Opacity Value

```csharp
SolidColorBrush brush = colorPicker.SelectedBrush as SolidColorBrush;
if (brush != null)
{
    byte alphaValue = brush.Color.A; // 0-255
    double opacity = (alphaValue / 255.0) * 100; // Convert to percentage
    Debug.WriteLine($"Opacity: {opacity}%");
}
```

## Hexadecimal Color Editor

### Hex Input Field

The color picker includes a hexadecimal input field that displays and accepts hex color codes:

**Format:**
- 6-character hex: `#FF5733` (RGB)
- 8-character hex: `#80FF5733` (ARGB with alpha)

### Entering Hex Values

1. Locate the hex input field in the color picker
2. Type or paste hex value (with or without `#` prefix)
3. Press Enter or click away to apply
4. Color updates to match the hex value

### Example Hex Values

```
White:        #FFFFFF
Black:        #000000
Red:          #FF0000
Green:        #00FF00
Blue:         #0000FF
50% Red:      #80FF0000
Yellow:       #FFFF00
Cyan:         #00FFFF
Magenta:      #FF00FF
```

### Getting Hex Value from Color

```csharp
SolidColorBrush brush = colorPicker.SelectedBrush as SolidColorBrush;
if (brush != null)
{
    Color color = brush.Color;
    string hexValue = $"#{color.A:X2}{color.R:X2}{color.G:X2}{color.B:X2}";
    Debug.WriteLine($"Hex: {hexValue}");
}
```

### Setting Color from Hex String

```csharp
string hexColor = "#FF5733";

// Parse hex string to Color
if (TryParseHexColor(hexColor, out Color parsedColor))
{
    colorPicker.SelectedBrush = new SolidColorBrush(parsedColor);
}

// Helper method
private bool TryParseHexColor(string hex, out Color color)
{
    color = Colors.Black;
    
    if (string.IsNullOrEmpty(hex))
        return false;
    
    hex = hex.Replace("#", "").ToUpper();
    
    // Handle 6-char (RGB) or 8-char (ARGB) hex
    if (hex.Length == 6)
    {
        hex = "FF" + hex;
    }
    
    if (hex.Length != 8)
        return false;
    
    try
    {
        byte a = byte.Parse(hex.Substring(0, 2), System.Globalization.NumberStyles.HexNumber);
        byte r = byte.Parse(hex.Substring(2, 2), System.Globalization.NumberStyles.HexNumber);
        byte g = byte.Parse(hex.Substring(4, 2), System.Globalization.NumberStyles.HexNumber);
        byte b = byte.Parse(hex.Substring(6, 2), System.Globalization.NumberStyles.HexNumber);
        
        color = Color.FromArgb(a, r, g, b);
        return true;
    }
    catch
    {
        return false;
    }
}
```

## Listening to Color Changes

### SelectedBrushChanged Event

The primary event for color selection changes:

```csharp
colorPicker.SelectedBrushChanged += ColorPicker_SelectedBrushChanged;

private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    // e.OldBrush: Previously selected color
    // e.NewBrush: Newly selected color
    
    SolidColorBrush newBrush = e.NewBrush as SolidColorBrush;
    if (newBrush != null)
    {
        // Apply new color to UI elements
        myRectangle.Fill = newBrush;
        
        // Log the change
        Debug.WriteLine($"Color changed to: {newBrush.Color}");
    }
}
```

### Unsubscribing from Event

```csharp
colorPicker.SelectedBrushChanged -= ColorPicker_SelectedBrushChanged;
```

### Multiple Color Pickers

Handle multiple color pickers with the same event handler:

```csharp
SfDropDownColorPicker redPicker = new SfDropDownColorPicker { SelectedBrush = new SolidColorBrush(Colors.Red) };
SfDropDownColorPicker bluePicker = new SfDropDownColorPicker { SelectedBrush = new SolidColorBrush(Colors.Blue) };

redPicker.SelectedBrushChanged += ColorPicker_SelectedBrushChanged;
bluePicker.SelectedBrushChanged += ColorPicker_SelectedBrushChanged;

private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    var picker = sender as SfDropDownColorPicker;
    Debug.WriteLine($"Picker {picker?.Name} changed to {(e.NewBrush as SolidColorBrush)?.Color}");
}
```
