# Getting Started with SfColorPicker

This guide covers the initial setup and basic implementation of the Syncfusion WinUI Color Picker control.

## Overview

The **SfColorPicker** control provides a comprehensive interface for selecting and adjusting color values in WinUI applications. It supports solid colors, linear gradients, and radial gradients with an intuitive UI for color manipulation.

## Installation Steps

### Step 1: Create a WinUI 3 Application

1. Open **Visual Studio**
2. Create a new project
3. Select **"Blank App, Packaged (WinUI 3 in Desktop)"**
4. Name your project (e.g., "ColorPickerDemo")
5. Click **Create**

### Step 2: Add NuGet Package

Add the Syncfusion Editors NuGet package to your project:

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.Editors.WinUI
```

**Using NuGet Package Manager UI:**
1. Right-click on your project in Solution Explorer
2. Select **"Manage NuGet Packages"**
3. Search for **"Syncfusion.Editors.WinUI"**
4. Click **Install**
5. Accept the license terms

**Using .csproj file:**
```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.Editors.WinUI" Version="*" />
</ItemGroup>
```

## Basic Implementation

### Step 3: Import Namespace

Add the Syncfusion namespace to your XAML page:

```xml
xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
```

**Complete Page Declaration:**
```xml
<Page
    x:Class="ColorPickerDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    
    <Grid>
        <!-- Your Color Picker will go here -->
    </Grid>
</Page>
```

### Step 4: Add SfColorPicker Control

**Minimal XAML:**
```xml
<editors:SfColorPicker x:Name="colorPicker" />
```

**With Basic Properties:**
```xml
<editors:SfColorPicker 
    x:Name="colorPicker"
    SelectedBrush="Blue"
    Width="300"
    Height="400" />
```

### Step 5: Initialize in Code-Behind

**Import namespace in C#:**
```csharp
using Syncfusion.UI.Xaml.Editors;
using Microsoft.UI.Xaml.Media;
using Windows.UI;
```

**Create and configure programmatically:**
```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        
        // Optional: Configure color picker after initialization
        colorPicker.SelectedBrush = new SolidColorBrush(Colors.Red);
    }
}
```

## First Complete Example

Here's a complete working example with event handling:

### MainPage.xaml
```xml
<Page
    x:Class="ColorPickerDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">

    <Grid Padding="20">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="Auto" />
        </Grid.RowDefinitions>

        <!-- Title -->
        <TextBlock 
            Text="Color Picker Demo" 
            FontSize="24" 
            FontWeight="Bold"
            Margin="0,0,0,20" />

        <!-- Color Picker -->
        <editors:SfColorPicker 
            x:Name="colorPicker"
            Grid.Row="1"
            HorizontalAlignment="Center"
            VerticalAlignment="Top"
            SelectedBrush="Blue"
            SelectedBrushChanged="ColorPicker_SelectedBrushChanged" />

        <!-- Preview Rectangle -->
        <Grid Grid.Row="2" Margin="0,20,0,0">
            <StackPanel>
                <TextBlock Text="Selected Color Preview:" Margin="0,0,0,10" />
                <Rectangle 
                    x:Name="previewRectangle"
                    Width="200" 
                    Height="100"
                    Fill="Blue"
                    Stroke="Black"
                    StrokeThickness="1" />
                <TextBlock 
                    x:Name="colorInfoText"
                    Text="Color: Blue"
                    Margin="0,10,0,0"
                    HorizontalAlignment="Center" />
            </StackPanel>
        </Grid>
    </Grid>
</Page>
```

### MainPage.xaml.cs
```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Syncfusion.UI.Xaml.Editors;
using Windows.UI;

namespace ColorPickerDemo
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs args)
        {
            // Update preview rectangle with selected brush
            previewRectangle.Fill = args.NewBrush;

            // Display color information
            if (args.NewBrush is SolidColorBrush solidBrush)
            {
                var color = solidBrush.Color;
                colorInfoText.Text = $"Color: R={color.R}, G={color.G}, B={color.B}, A={color.A}";
            }
            else if (args.NewBrush is LinearGradientBrush)
            {
                colorInfoText.Text = "Color: Linear Gradient";
            }
            else if (args.NewBrush is RadialGradientBrush)
            {
                colorInfoText.Text = "Color: Radial Gradient";
            }
        }
    }
}
```

## Understanding the Control Structure

The SfColorPicker control consists of several visual elements:

1. **Brush Type Selector** - Dropdown to switch between Solid, Linear, and Radial brushes
2. **Color Spectrum** - Interactive area for color selection (box or ring shape)
3. **Hue Slider** - Vertical slider for hue selection
4. **Opacity Slider** - Horizontal slider for alpha/opacity control
5. **Color Channel Editors** - Text inputs and sliders for RGB/HSV/HSL/CMYK values
6. **Hexadecimal Editor** - Text input for hex color codes
7. **Gradient Editor** (when gradient mode is active) - Controls for gradient stops and positioning

## Running the Application

1. Press **F5** or click **Start** in Visual Studio
2. The application will launch with the Color Picker visible
3. Click and drag in the color spectrum to select colors
4. Adjust the hue slider to change the base hue
5. Modify opacity using the alpha slider
6. See the preview rectangle update in real-time

## Common Initial Configurations

### Configuration 1: Simple Color Picker
```xml
<editors:SfColorPicker 
    SelectedBrush="Red"
    BrushTypeOptions="SolidColorBrush" />
```

### Configuration 2: With All Brush Types
```xml
<editors:SfColorPicker 
    BrushTypeOptions="All"
    ColorChannelOptions="RGB" />
```

### Configuration 3: Gradient Only
```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush,RadialGradientBrush" />
```

## Troubleshooting

### Issue: Control Not Appearing
**Solution:** Ensure you've added the namespace: `xmlns:editors="using:Syncfusion.UI.Xaml.Editors"`

### Issue: Build Errors
**Solution:** Verify the NuGet package is installed and restored properly. Clean and rebuild the solution.

### Issue: License Warning
**Solution:** For production use, register your Syncfusion license key in App.xaml.cs:
```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
```

### Issue: Control Too Small
**Solution:** Set explicit Width and Height properties, or place in a properly sized container.
