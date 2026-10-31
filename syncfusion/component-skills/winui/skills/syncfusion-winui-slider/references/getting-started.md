# Getting Started with WinUI Slider

This guide covers the essential steps to add and configure the Syncfusion WinUI Slider control in your application.

## Prerequisites

Before starting, ensure you have:
- **Visual Studio 2019** or later
- **.NET Desktop Development workload** installed
- **Windows App SDK / WinUI 3 templates** installed
- **Windows 10 version 1809** or later

## Step 1: Create a WinUI 3 Desktop Application

1. Open Visual Studio 2022
2. Click **File** → **New** → **Project**
3. Search for "WinUI"
4. Select **Blank App, Packaged (WinUI)**
5. Configure project name and location
6. Click **Create**

The project template includes:
- Basic WinUI structure
- Package manifest for deployment
- App.xaml and MainWindow.xaml files

## Step 2: Install Syncfusion.Sliders.WinUI NuGet Package

### Via NuGet Package Manager (GUI)

1. Right-click on the project in Solution Explorer
2. Select **Manage NuGet Packages**
3. Click the **Browse** tab
4. Search for `Syncfusion.Sliders.WinUI`
5. Select the package and click **Install**
6. Accept the license agreement

### Via Package Manager Console

```powershell
Install-Package Syncfusion.Sliders.WinUI
```

### Via .NET CLI

```bash
dotnet add package Syncfusion.Sliders.WinUI
```

## Step 3: Register Syncfusion License (If Required)

Add the license registration in `App.xaml.cs` constructor:

```csharp
using Syncfusion.Licensing;

public App()
{
    // Register Syncfusion license
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    this.InitializeComponent();
}
```

**Note:** You can get a free 30-day trial license or purchase a commercial license from Syncfusion.

## Step 4: Import the Slider Namespace

### In XAML

Add the namespace to your Window or Page:

```xml
<Window x:Class="YourApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:slider="using:Syncfusion.UI.Xaml.Sliders">
    
    <!-- Your content here -->
    
</Window>
```

### In C# Code

Add the using statement:

```csharp
using Syncfusion.UI.Xaml.Sliders;
```

## Step 5: Initialize the SfSlider Control

### XAML Implementation

The simplest slider with default settings:

```xml
<slider:SfSlider />
```

This creates a slider with:
- **Minimum:** 0 (default)
- **Maximum:** 100 (default)
- **Value:** 0 (default)
- **Orientation:** Horizontal (default)

### C# Code Implementation

```csharp
// Create slider instance
SfSlider slider = new SfSlider();

// Add to layout (assuming you have a Grid named "rootGrid")
rootGrid.Children.Add(slider);
```

## Step 6: Set the Slider Value

The `Value` property must be within the range of `Minimum` and `Maximum`.

### XAML

```xml
<slider:SfSlider Value="50" />
```

### C# Code

```csharp
SfSlider slider = new SfSlider();
slider.Value = 50;
```

### With Custom Range

```xml
<slider:SfSlider Value="25"
                 Minimum="0"
                 Maximum="50" />
```

```csharp
SfSlider slider = new SfSlider();
slider.Minimum = 0;
slider.Maximum = 50;
slider.Value = 25;
```

## Step 7: Enable Visual Elements

### Enable Ticks

Ticks are markers that show intervals along the slider track.

```xml
<slider:SfSlider Value="50"
                 ShowTicks="True" />
```

```csharp
slider.ShowTicks = true;
```

### Enable Labels

Labels display the numeric values at intervals.

```xml
<slider:SfSlider Value="50"
                 ShowLabels="True" />
```

```csharp
slider.ShowLabels = true;
```

### Enable Dividers

Dividers are visual separators between intervals on the track.

```xml
<slider:SfSlider Value="50"
                 ShowDividers="True"
                 DividerHeight="4"
                 DividerWidth="4"
                 ActiveTrackHeight="4"
                 InactiveTrackHeight="4" />
```

```csharp
slider.ShowDividers = true;
slider.DividerHeight = 4;
slider.DividerWidth = 4;
slider.ActiveTrackHeight = 4;
slider.InactiveTrackHeight = 4;
```

### Enable Tooltip

Tooltip shows the current value when hovering or dragging the thumb.

```xml
<slider:SfSlider Value="50"
                 ShowToolTip="True" />
```

```csharp
slider.ShowToolTip = true;
```

## Complete Basic Example

### Minimal Slider (XAML)

```xml
<Window x:Class="SliderExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:slider="using:Syncfusion.UI.Xaml.Sliders">
    
    <Grid Padding="20">
        <slider:SfSlider Value="50"
                        Width="400" />
    </Grid>
</Window>
```

### Fully Featured Slider (XAML)

```xml
<Window x:Class="SliderExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:slider="using:Syncfusion.UI.Xaml.Sliders">
    
    <Grid Padding="20">
        <slider:SfSlider Value="50"
                        Minimum="0"
                        Maximum="100"
                        Interval="10"
                        ShowLabels="True"
                        ShowTicks="True"
                        ShowDividers="True"
                        ShowToolTip="True"
                        Width="400"
                        Height="60" />
    </Grid>
</Window>
```

### Complete Code-Behind Example

```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Sliders;

namespace SliderExample
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create a Grid for layout
            Grid grid = new Grid();
            grid.Padding = new Thickness(20);
            
            // Create and configure slider
            SfSlider slider = new SfSlider();
            slider.Value = 50;
            slider.Minimum = 0;
            slider.Maximum = 100;
            slider.Interval = 10;
            slider.ShowLabels = true;
            slider.ShowTicks = true;
            slider.ShowDividers = true;
            slider.ShowToolTip = true;
            slider.Width = 400;
            slider.Height = 60;
            
            // Handle value change
            slider.ValueChanged += Slider_ValueChanged;
            
            // Add slider to grid
            grid.Children.Add(slider);
            
            // Set grid as window content
            this.Content = grid;
        }
        
        private void Slider_ValueChanged(object sender, SliderValueChangedEventArgs e)
        {
            double newValue = e.NewValue;
            double oldValue = e.OldValue;
            
            // Handle value change
            System.Diagnostics.Debug.WriteLine($"Value changed from {oldValue} to {newValue}");
        }
    }
}
```

## Common Patterns

### Volume Control

```xml
<StackPanel Padding="20">
    <TextBlock Text="Volume" Margin="0,0,0,10" />
    <slider:SfSlider x:Name="volumeSlider"
                     Value="75"
                     Minimum="0"
                     Maximum="100"
                     ShowLabels="True"
                     ShowTicks="True"
                     ShowToolTip="True"
                     Width="300" />
</StackPanel>
```

### Brightness Control

```xml
<StackPanel Padding="20">
    <TextBlock Text="Brightness" Margin="0,0,0,10" />
    <slider:SfSlider x:Name="brightnessSlider"
                     Value="50"
                     Minimum="0"
                     Maximum="100"
                     Interval="25"
                     ShowLabels="True"
                     ShowTicks="True"
                     Width="300" />
</StackPanel>
```

## Troubleshooting

### Slider Not Appearing

**Problem:** The slider control doesn't show up in the window.

**Solutions:**
1. Verify NuGet package is installed correctly
2. Check namespace import: `xmlns:slider="using:Syncfusion.UI.Xaml.Sliders"`
3. Ensure Width or Height is set (especially in StackPanel layouts)
4. Check that the control is added to a visible container

### License Error

**Problem:** "License key not registered" error on startup.

**Solutions:**
1. Register license in `App.xaml.cs` before `InitializeComponent()`
2. Verify license key is valid and not expired
3. Ensure `Syncfusion.Licensing` namespace is imported

### Build Errors

**Problem:** Build fails with namespace or type not found errors.

**Solutions:**
1. Clean and rebuild the solution
2. Restore NuGet packages (right-click solution → Restore NuGet Packages)
3. Check that the target framework is compatible (.NET 6 or later)
4. Ensure Windows SDK version is up to date

## Next Steps

Now that you have a basic slider working, explore:
- [basic-features.md](basic-features.md) - Value ranges, intervals, orientation
- [labels.md](labels.md) - Custom label formatting and styles
- [ticks.md](ticks.md) - Major and minor tick customization
- [dividers.md](dividers.md) - Visual divider styling
- [thumb-tooltip.md](thumb-tooltip.md) - Thumb customization and tooltips
- [track-customization.md](track-customization.md) - Track styling and appearance

## Additional Resources

- **Sample Code:** https://github.com/SyncfusionExamples/WinUI_Sliders_Getting_Started
- **API Documentation:** https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Sliders.SfSlider.html
- **WinUI 3 Documentation:** https://learn.microsoft.com/en-us/windows/apps/winui/winui3/