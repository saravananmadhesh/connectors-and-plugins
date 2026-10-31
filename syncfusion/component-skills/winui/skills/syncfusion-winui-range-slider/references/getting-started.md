# Getting Started with WinUI RangeSlider

Complete guide to installing, configuring, and creating your first Syncfusion WinUI RangeSlider (SfRangeSlider) control.

## Prerequisites

Before starting, ensure you have:
- **Visual Studio 2019 or later** with WinUI development workload
- **.NET 8.0 or later** runtime
- **Windows 10 SDK (10.0.19041.0) or later**
- **WinUI 3** project template installed

## Step 1: Create WinUI 3 Blank Application

### Option A: Using Visual Studio UI

1. Open Visual Studio
2. Click **Create a new project**
3. Search for **"Blank App, Packaged (WinUI)"**
4. Select the template and click **Next**
5. Configure your project:
   - **Project name**: e.g., "RangeSliderDemo"
   - **Location**: Choose your preferred directory
   - **Solution name**: Same as project name
6. Click **Create**
7. Select target and minimum Windows SDK versions
8. Click **OK**

### Option B: Using .NET CLI

```bash
# Install WinUI templates (if not already installed)
dotnet new install Microsoft.WindowsAppSDK.Templates

# Create new WinUI project
dotnet new winui -n RangeSliderDemo
cd RangeSliderDemo
```

## Step 2: Install Syncfusion.Sliders.WinUI NuGet Package

### Option A: Using NuGet Package Manager UI

1. Right-click on your project in Solution Explorer
2. Select **Manage NuGet Packages**
3. Click on the **Browse** tab
4. Search for `Syncfusion.Sliders.WinUI`
5. Select the package and click **Install**
6. Accept the license agreement

### Option B: Using Package Manager Console

```powershell
Install-Package Syncfusion.Sliders.WinUI
```

### Option C: Using .NET CLI

```bash
dotnet add package Syncfusion.Sliders.WinUI
```

### Option D: Manual Package Reference

Add to your `.csproj` file:

```xml
<ItemGroup>
  <PackageReference Include="Syncfusion.Sliders.WinUI" Version="24.1.41" />
</ItemGroup>
```

**Note**: Replace `24.1.41` with the latest version available.

## Step 3: Import Namespace

### In XAML (MainWindow.xaml)

Add the namespace declaration to your Page or Window root element:

```xaml
<Window
    x:Class="RangeSliderDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:slider="using:Syncfusion.UI.Xaml.Sliders">
    
    <!-- Content goes here -->
</Window>
```

### In C# Code-Behind (MainWindow.xaml.cs)

```csharp
using Syncfusion.UI.Xaml.Sliders;
```

## Step 4: Initialize SfRangeSlider

### Basic Initialization in XAML

```xaml
<Window xmlns:slider="using:Syncfusion.UI.Xaml.Sliders">
    <Grid>
        <slider:SfRangeSlider />
    </Grid>
</Window>
```

**Result**: This creates a range slider with default settings:
- Minimum: 0
- Maximum: 100
- RangeStart: 0
- RangeEnd: 100

### Basic Initialization in C#

```csharp
using Syncfusion.UI.Xaml.Sliders;
using Microsoft.UI.Xaml;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        SfRangeSlider rangeSlider = new SfRangeSlider();
        this.Content = rangeSlider;
    }
}
```

## Step 5: Set Range Values

The default range is 0-100. Set initial range values using `RangeStart` and `RangeEnd`:

### XAML Implementation

```xaml
<slider:SfRangeSlider 
    RangeStart="30"
    RangeEnd="70" />
```

### C# Implementation

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.RangeStart = 30;
rangeSlider.RangeEnd = 70;
this.Content = rangeSlider;
```

**Important**: Ensure `RangeStart` and `RangeEnd` values are within the `Minimum` and `Maximum` range, otherwise the control will throw an exception.

## Step 6: Enable Visual Elements

### Enable Labels

Labels display numeric values at interval points along the track.

```xaml
<slider:SfRangeSlider 
    RangeStart="30"
    RangeEnd="70"
    ShowLabels="True" />
```

```csharp
rangeSlider.ShowLabels = true;
```

### Enable Ticks

Ticks are visual markers showing interval points on the track.

```xaml
<slider:SfRangeSlider 
    RangeStart="30"
    RangeEnd="70"
    ShowTicks="True" />
```

```csharp
rangeSlider.ShowTicks = true;
```

### Enable Dividers

Dividers are visual separators between intervals on the track.

```xaml
<slider:SfRangeSlider 
    RangeStart="30"
    RangeEnd="70"
    ShowDividers="True"
    DividerHeight="4"
    DividerWidth="4"
    ActiveTrackHeight="4"
    InactiveTrackHeight="4" />
```

```csharp
rangeSlider.ShowDividers = true;
rangeSlider.DividerHeight = 4;
rangeSlider.DividerWidth = 4;
rangeSlider.ActiveTrackHeight = 4;
rangeSlider.InactiveTrackHeight = 4;
```

**Note**: Dividers work best when track height matches divider height for visual consistency.

## Complete Working Example

### MainWindow.xaml

```xaml
<?xml version="1.0" encoding="utf-8"?>
<Window
    x:Class="RangeSliderDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:slider="using:Syncfusion.UI.Xaml.Sliders">

    <Grid Padding="50">
        <StackPanel Spacing="40" VerticalAlignment="Center">
            
            <!-- Basic Range Slider -->
            <StackPanel Spacing="10">
                <TextBlock Text="Basic Range Slider" FontWeight="SemiBold" />
                <slider:SfRangeSlider 
                    RangeStart="30"
                    RangeEnd="70" />
            </StackPanel>

            <!-- Range Slider with Labels -->
            <StackPanel Spacing="10">
                <TextBlock Text="With Labels" FontWeight="SemiBold" />
                <slider:SfRangeSlider 
                    RangeStart="30"
                    RangeEnd="70"
                    ShowLabels="True" />
            </StackPanel>

            <!-- Range Slider with Ticks -->
            <StackPanel Spacing="10">
                <TextBlock Text="With Ticks" FontWeight="SemiBold" />
                <slider:SfRangeSlider 
                    RangeStart="30"
                    RangeEnd="70"
                    ShowTicks="True" />
            </StackPanel>

            <!-- Range Slider with All Elements -->
            <StackPanel Spacing="10">
                <TextBlock Text="Complete Configuration" FontWeight="SemiBold" />
                <slider:SfRangeSlider 
                    RangeStart="30"
                    RangeEnd="70"
                    ShowLabels="True"
                    ShowTicks="True"
                    ShowDividers="True"
                    DividerHeight="4"
                    DividerWidth="4"
                    ActiveTrackHeight="4"
                    InactiveTrackHeight="4" />
            </StackPanel>

        </StackPanel>
    </Grid>
</Window>
```

### MainWindow.xaml.cs

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Sliders;

namespace RangeSliderDemo
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
        }
    }
}
```

## Running the Application

1. **Build the solution**: Press `Ctrl+Shift+B` or go to **Build > Build Solution**
2. **Run the application**: Press `F5` or click the **Start** button
3. **Interact with the slider**: Click and drag the thumbs to adjust the range

## Common Setup Issues

### Issue: Control not rendering

**Cause**: Namespace not imported correctly

**Solution**: Verify the namespace declaration:
```xaml
xmlns:slider="using:Syncfusion.UI.Xaml.Sliders"
```

### Issue: NuGet package not installing

**Cause**: Incompatible project target framework

**Solution**: Ensure your project targets .NET 8.0 or later. Check `.csproj`:
```xml
<TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
```

### Issue: Build errors after package installation

**Cause**: Conflicting package versions

**Solution**: 
1. Clean the solution: **Build > Clean Solution**
2. Rebuild: **Build > Rebuild Solution**
3. If issues persist, delete `bin` and `obj` folders manually

### Issue: License error message

**Cause**: Using licensed version without registering key

**Solution**: Register your Syncfusion license key in `App.xaml.cs`:
```csharp
public App()
{
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    this.InitializeComponent();
}
```

## Next Steps

Now that you have a basic range slider working, explore these topics:

- **Basic Features**: Configure minimum/maximum, intervals, and orientation
- **Labels**: Customize label format, placement, and templates
- **Ticks**: Add major and minor ticks with custom styling
- **Track Customization**: Style active/inactive track segments
- **Thumb Styling**: Customize thumb appearance and icons
- **Tooltips**: Display selected values in tooltips
- **Events**: Handle value changes and validation

## Resources

- [Official Getting Started Guide](https://help.syncfusion.com/winui/rangeslider/getting-started)
- [GitHub Sample Project](https://github.com/SyncfusionExamples/WinUI_Sliders_Getting_Started/tree/main/RangeSliderGettingStartedDesktop)
- [NuGet Package](https://www.nuget.org/packages/Syncfusion.Sliders.WinUI)
- [API Documentation](https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Sliders.SfRangeSlider.html)