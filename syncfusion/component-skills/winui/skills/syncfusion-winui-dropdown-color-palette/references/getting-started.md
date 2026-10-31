# Getting Started with DropDown Color Palette

## Table of Contents
- [Installation](#installation)
- [Adding Control in XAML](#adding-control-in-xaml)
- [Adding Control in C#](#adding-control-in-c)
- [Accessing Color Programmatically](#accessing-color-programmatically)
- [Selecting from Palette](#selecting-from-palette)
- [Automatic Color](#automatic-color)
- [Responding to Color Changes](#responding-to-color-changes)

## Installation

### Step 1: Install NuGet Package

The DropDown Color Palette is part of the Syncfusion Editors package. Install it via NuGet:

```
Install-Package Syncfusion.Editors.WinUI
```

Or search for "Syncfusion.Editors.WinUI" in the NuGet Package Manager.

### Step 2: Create WinUI 3 Project

Ensure you have created a WinUI 3 desktop application for C# targeting .NET 8.0 or higher. If you need to create a new project:

1. In Visual Studio, create a new "Blank App, Packaged (WinUI 3 in Desktop)" project
2. Target .NET 8.0 or later (latest version: .NET 10.0 recommended)
3. The project will automatically include WinUI 3 dependencies

### Required Framework
- **.NET 8.0 or higher (latest: .NET 10.0)** - Syncfusion.Editors.WinUI requires modern .NET
- **Windows 10 Version 1809 or higher** - WinUI 3 requires Windows 10 Build 1809+
- **Visual Studio 2019 or later** - For WinUI 3 development

## Adding Control in XAML

XAML is the recommended approach for static UI layouts. It provides a clean, declarative syntax.

### Step 1: Import Namespace

Add the namespace declaration to your Page element:

```xaml
<Page
    x:Class="GettingStarted.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <Grid>
        <!-- Add control here -->
    </Grid>
</Page>
```

### Step 2: Add Control to Grid

```xaml
<Grid x:Name="grid">
    <editors:SfDropDownColorPalette x:Name="sfDropDownColorPalette" />
</Grid>
```

### Complete XAML Example

```xaml
<Page
    x:Class="GettingStarted.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    mc:Ignorable="d"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <Grid x:Name="grid">
        <editors:SfDropDownColorPalette x:Name="sfDropDownColorPalette" />
    </Grid>
</Page>
```

## Adding Control in C#

Use C# when you need to create controls dynamically or in code-behind for programmatic scenarios.

### Step 1: Import Namespace

```csharp
using Syncfusion.UI.Xaml.Editors;
```

### Step 2: Create and Add Control

```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        
        // Create the control
        SfDropDownColorPalette sfDropDownColorPalette = new SfDropDownColorPalette();
        
        // Add to the grid
        grid.Children.Add(sfDropDownColorPalette);
    }
}
```

### Complete C# Example

```csharp
using Syncfusion.UI.Xaml.Editors;
using Windows.UI;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Media;

namespace GettingStarted
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            
            // Create color palette control
            var colorPalette = new SfDropDownColorPalette();
            
            // Optional: Set initial color
            colorPalette.SelectedBrush = new SolidColorBrush(Colors.Blue);
            
            // Add to grid
            grid.Children.Add(colorPalette);
        }
    }
}
```

## Accessing Color Programmatically

### Getting the Selected Color

The `SelectedBrush` property contains the currently selected color as a `Brush` object.

```csharp
// Get selected color
var selectedBrush = sfDropDownColorPalette.SelectedBrush as SolidColorBrush;

if (selectedBrush != null)
{
    // Access the color value
    Color selectedColor = selectedBrush.Color;
    
    byte red = selectedColor.R;
    byte green = selectedColor.G;
    byte blue = selectedColor.B;
    byte alpha = selectedColor.A;
}
```

### Setting the Color Programmatically

```xaml
<!-- In XAML -->
<editors:SfDropDownColorPalette SelectedBrush="Yellow" x:Name="sfDropDownColorPalette" />
```

```csharp
// In C# code-behind
sfDropDownColorPalette.SelectedBrush = new SolidColorBrush(Colors.Yellow);

// Or with custom colors
sfDropDownColorPalette.SelectedBrush = new SolidColorBrush(
    Color.FromArgb(255, 255, 0, 0)  // Red
);
```

### Default Value

The default selected color is **Black** (`Colors.Black`). If you need a different default, set it after creating the control.

## Selecting from Palette

### User Interaction

Users can select colors in two ways:

1. **From Standard Palettes** - Click any color in Theme Colors or Standard Colors sections
2. **From More Colors Dialog** - Click "More Colors..." to access the color spectrum

### Programmatic Selection

Select a color from code without user interaction:

```csharp
// Select red
sfDropDownColorPalette.SelectedBrush = new SolidColorBrush(Colors.Red);

// Select green
sfDropDownColorPalette.SelectedBrush = new SolidColorBrush(Colors.Green);

// Select custom color
var customColor = Color.FromArgb(255, 100, 150, 200);  // Semi-transparent blue
sfDropDownColorPalette.SelectedBrush = new SolidColorBrush(customColor);
```

### Checking Current Selection

```csharp
var currentBrush = sfDropDownColorPalette.SelectedBrush;

// Check if it's a solid color
if (currentBrush is SolidColorBrush solidBrush)
{
    Color color = solidBrush.Color;
    // Use the color
}
```

## Automatic Color

The Automatic Color represents a default color that can be quickly reapplied. By default, the automatic color is **Black**.

### Using Automatic Color

When the user clicks the Automatic Color section (usually the top option), it resets to this default:

```csharp
// Users can click "Automatic" in the palette to revert to black
// Or you can do it programmatically:
sfDropDownColorPalette.SelectedBrush = new SolidColorBrush(Colors.Black);
```

### Use Cases

- **Quick reset button** - Let users revert to default color
- **Theme color** - Set to your brand's primary color
- **Neutral option** - Use as a "no color" or transparent option

## Responding to Color Changes

### SelectedBrushChanged Event

Listen for color changes using the `SelectedBrushChanged` event. This event fires whenever the selected color changes, either by user interaction or programmatically.

### XAML Event Binding

```xaml
<editors:SfDropDownColorPalette 
    SelectedBrushChanged="sfDropDownColorPalette_SelectedBrushChanged"
    x:Name="sfDropDownColorPalette" />
```

### C# Event Handler

```csharp
sfDropDownColorPalette.SelectedBrushChanged += 
    sfDropDownColorPalette_SelectedBrushChanged;

private void sfDropDownColorPalette_SelectedBrushChanged(
    object sender, 
    SelectedBrushChangedEventArgs e)
{
    // Get old and new colors
    var oldBrush = e.OldBrush as SolidColorBrush;
    var newBrush = e.NewBrush as SolidColorBrush;
    
    if (newBrush != null)
    {
        // Apply the new color somewhere
        textBlock.Foreground = newBrush;
    }
}
```

### Common Event Scenarios

**Apply color to text:**
```csharp
private void sfDropDownColorPalette_SelectedBrushChanged(
    object sender, 
    SelectedBrushChangedEventArgs e)
{
    // Apply new color to text selection
    textEditor.Document.Selection.CharacterFormat.ForegroundColor = 
        (e.NewBrush as SolidColorBrush).Color;
}
```

**Track color history:**
```csharp
private List<Color> colorHistory = new List<Color>();

private void sfDropDownColorPalette_SelectedBrushChanged(
    object sender, 
    SelectedBrushChangedEventArgs e)
{
    var newColor = (e.NewBrush as SolidColorBrush)?.Color;
    if (newColor.HasValue)
    {
        colorHistory.Add(newColor.Value);
    }
}
```

**Validate color selection:**
```csharp
private void sfDropDownColorPalette_SelectedBrushChanged(
    object sender, 
    SelectedBrushChangedEventArgs e)
{
    var newColor = e.NewBrush as SolidColorBrush;
    
    // Check if color meets contrast requirements
    if (!MeetsContrastRequirement(newColor.Color))
    {
        // Revert to previous color
        sfDropDownColorPalette.SelectedBrush = e.OldBrush;
        ShowWarning("Color has insufficient contrast");
    }
}
```

---

**Next:** Learn about the palette structure and color sections in `palette-structure.md`, or move to `dropdown-customization.md` to customize behavior.
