# Getting Started with WinUI Radial Gauge

This guide covers the essential steps to add the WinUI Radial Gauge control to your application and configure its basic elements: axis, ranges, pointers, and annotations.

## Prerequisites

- WinUI 3 desktop app for C# and .NET 5 or later
- Visual Studio 2019/2022 with WinUI workload

## Installation

### Step 1: Install NuGet Package

Add the Syncfusion.Gauge.WinUI NuGet package to your project:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Gauge.WinUI
```

**NuGet Package Manager:**
1. Right-click your project → Manage NuGet Packages
2. Search for "Syncfusion.Gauge.WinUI"
3. Install the package

### Step 2: Import Namespace

Add the gauge namespace to your XAML file:

```xaml
xmlns:gauge="using:Syncfusion.UI.Xaml.Gauges"
```

For C# code files:

```csharp
using Syncfusion.UI.Xaml.Gauges;
```

## Creating Your First Radial Gauge

### Basic Gauge (XAML)

```xaml
<Window x:Class="GaugeApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:gauge="using:Syncfusion.UI.Xaml.Gauges">
    
    <gauge:SfRadialGauge />
    
</Window>
```

### Basic Gauge (C#)

```csharp
public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        SfRadialGauge sfRadialGauge = new SfRadialGauge();
        this.Content = sfRadialGauge;
    }
}
```

**Result:** A radial gauge with default axis (0-100 scale, 10 interval) is displayed.

## Adding an Axis

The axis defines the scale on which values are displayed. You can customize the minimum, maximum, and interval values.

### XAML

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis Minimum="0"
                          Maximum="150" />
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

### C#

```csharp
SfRadialGauge sfRadialGauge = new SfRadialGauge();

RadialAxis radialAxis = new RadialAxis();
radialAxis.Minimum = 0;
radialAxis.Maximum = 150;
sfRadialGauge.Axes.Add(radialAxis);

this.Content = sfRadialGauge;
```

**Result:** Gauge displays scale from 0 to 150.

## Adding Ranges

Ranges are visual elements that highlight specific value segments, typically used to indicate danger zones, warning areas, or safe ranges.

### XAML

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis Maximum="150"
                          Interval="10">
            <gauge:RadialAxis.Ranges>
                <gauge:GaugeRange StartValue="0"
                                  EndValue="50"
                                  Background="Red" />
                <gauge:GaugeRange StartValue="50"
                                  EndValue="100"
                                  Background="Orange" />
                <gauge:GaugeRange StartValue="100"
                                  EndValue="150"
                                  Background="Green" />
            </gauge:RadialAxis.Ranges>
        </gauge:RadialAxis>
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

### C#

```csharp
SfRadialGauge sfRadialGauge = new SfRadialGauge();

RadialAxis radialAxis = new RadialAxis();
radialAxis.Maximum = 150;
sfRadialGauge.Axes.Add(radialAxis);

GaugeRange gaugeRange1 = new GaugeRange();
gaugeRange1.StartValue = 0;
gaugeRange1.EndValue = 50;
gaugeRange1.Background = new SolidColorBrush(Colors.Red);
radialAxis.Ranges.Add(gaugeRange1);

GaugeRange gaugeRange2 = new GaugeRange();
gaugeRange2.StartValue = 50;
gaugeRange2.EndValue = 100;
gaugeRange2.Background = new SolidColorBrush(Colors.Orange);
radialAxis.Ranges.Add(gaugeRange2);

GaugeRange gaugeRange3 = new GaugeRange();
gaugeRange3.StartValue = 100;
gaugeRange3.EndValue = 150;
gaugeRange3.Background = new SolidColorBrush(Colors.Green);
radialAxis.Ranges.Add(gaugeRange3);

this.Content = sfRadialGauge;
```

**Result:** Three color-coded ranges appear on the gauge (red 0-50, orange 50-100, green 100-150).

## Adding Pointers

Pointers indicate values on the axis. The radial gauge supports four pointer types:
- **NeedlePointer** - Traditional gauge needle
- **ShapePointer** - Marker shapes (circle, diamond, triangle)
- **RangePointer** - Arc segment pointer
- **ContentPointer** - Custom UI element pointer

### NeedlePointer Example

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis Maximum="150"
                          Interval="10">
            <gauge:RadialAxis.Pointers>
                <gauge:NeedlePointer Value="90" />
            </gauge:RadialAxis.Pointers>
        </gauge:RadialAxis>
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

```csharp
SfRadialGauge sfRadialGauge = new SfRadialGauge();

RadialAxis radialAxis = new RadialAxis();
radialAxis.Maximum = 150;
sfRadialGauge.Axes.Add(radialAxis);

NeedlePointer needlePointer = new NeedlePointer();
needlePointer.Value = 90;
radialAxis.Pointers.Add(needlePointer);

this.Content = sfRadialGauge;
```

**Result:** A needle pointer indicates value 90 on the gauge.

### Multiple Pointers

You can add multiple pointers to display different values:

```xaml
<gauge:RadialAxis.Pointers>
    <gauge:NeedlePointer Value="90" />
    <gauge:ShapePointer Value="70"
                        ShapeType="Circle"
                        Fill="Red" />
    <gauge:RangePointer Value="60"
                        PointerWidth="10" />
</gauge:RadialAxis.Pointers>
```

## Adding Annotations

Annotations allow you to place text, images, or custom UI elements at specific positions on the gauge.

### Text Annotation

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis Maximum="150"
                          Interval="10">
            <gauge:RadialAxis.Annotations>
                <gauge:GaugeAnnotation DirectionUnit="Angle"
                                       DirectionValue="90"
                                       PositionFactor="0.5">
                    <gauge:GaugeAnnotation.Content>
                        <TextBlock Text="90"
                                   FontSize="25"
                                   FontWeight="Bold" />
                    </gauge:GaugeAnnotation.Content>
                </gauge:GaugeAnnotation>
            </gauge:RadialAxis.Annotations>
        </gauge:RadialAxis>
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

```csharp
SfRadialGauge sfRadialGauge = new SfRadialGauge();

RadialAxis radialAxis = new RadialAxis();
radialAxis.Maximum = 150;
sfRadialGauge.Axes.Add(radialAxis);

GaugeAnnotation gaugeAnnotation = new GaugeAnnotation();
gaugeAnnotation.DirectionUnit = AnnotationDirection.Angle;
gaugeAnnotation.DirectionValue = 90;
gaugeAnnotation.PositionFactor = 0.5;
gaugeAnnotation.Content = new TextBlock 
{ 
    Text = "90", 
    FontWeight = FontWeights.Bold, 
    FontSize = 25 
};
radialAxis.Annotations.Add(gaugeAnnotation);

this.Content = sfRadialGauge;
```

**Result:** Text "90" appears at the center of the gauge.

## Complete Working Example

Here's a full speedometer example combining all elements:

### XAML

```xaml
<Window x:Class="RadialGaugeApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:gauge="using:Syncfusion.UI.Xaml.Gauges">
    
    <Grid>
        <gauge:SfRadialGauge>
            <gauge:SfRadialGauge.Axes>
                <gauge:RadialAxis Maximum="150"
                                  Interval="10">
                    
                    <!-- Color-coded speed ranges -->
                    <gauge:RadialAxis.Ranges>
                        <gauge:GaugeRange StartValue="0"
                                          EndValue="50"
                                          Background="Red" />
                        <gauge:GaugeRange StartValue="50"
                                          EndValue="100"
                                          Background="Orange" />
                        <gauge:GaugeRange StartValue="100"
                                          EndValue="150"
                                          Background="Green" />
                    </gauge:RadialAxis.Ranges>
                    
                    <!-- Needle pointer showing speed -->
                    <gauge:RadialAxis.Pointers>
                        <gauge:NeedlePointer Value="90" />
                    </gauge:RadialAxis.Pointers>
                    
                    <!-- Speed value annotation -->
                    <gauge:RadialAxis.Annotations>
                        <gauge:GaugeAnnotation DirectionUnit="Angle"
                                               DirectionValue="90"
                                               PositionFactor="0.5">
                            <gauge:GaugeAnnotation.Content>
                                <TextBlock Text="90"
                                           FontSize="25"
                                           FontWeight="Bold" />
                            </gauge:GaugeAnnotation.Content>
                        </gauge:GaugeAnnotation>
                    </gauge:RadialAxis.Annotations>
                    
                </gauge:RadialAxis>
            </gauge:SfRadialGauge.Axes>
        </gauge:SfRadialGauge>
    </Grid>
    
</Window>
```

### C# (Programmatic Creation)

```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Syncfusion.UI.Xaml.Gauges;
using Windows.UI;

namespace RadialGaugeApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            CreateGauge();
        }
        
        private void CreateGauge()
        {
            // Create gauge
            SfRadialGauge sfRadialGauge = new SfRadialGauge();
            
            // Create axis
            RadialAxis radialAxis = new RadialAxis();
            radialAxis.Maximum = 150;
            sfRadialGauge.Axes.Add(radialAxis);
            
            // Add ranges
            GaugeRange gaugeRange1 = new GaugeRange();
            gaugeRange1.StartValue = 0;
            gaugeRange1.EndValue = 50;
            gaugeRange1.Background = new SolidColorBrush(Colors.Red);
            radialAxis.Ranges.Add(gaugeRange1);
            
            GaugeRange gaugeRange2 = new GaugeRange();
            gaugeRange2.StartValue = 50;
            gaugeRange2.EndValue = 100;
            gaugeRange2.Background = new SolidColorBrush(Colors.Orange);
            radialAxis.Ranges.Add(gaugeRange2);
            
            GaugeRange gaugeRange3 = new GaugeRange();
            gaugeRange3.StartValue = 100;
            gaugeRange3.EndValue = 150;
            gaugeRange3.Background = new SolidColorBrush(Colors.Green);
            radialAxis.Ranges.Add(gaugeRange3);
            
            // Add pointer
            NeedlePointer needlePointer = new NeedlePointer();
            needlePointer.Value = 90;
            radialAxis.Pointers.Add(needlePointer);
            
            // Add annotation
            GaugeAnnotation gaugeAnnotation = new GaugeAnnotation();
            gaugeAnnotation.DirectionUnit = AnnotationDirection.Angle;
            gaugeAnnotation.DirectionValue = 90;
            gaugeAnnotation.PositionFactor = 0.5;
            gaugeAnnotation.Content = new TextBlock 
            { 
                Text = "90", 
                FontWeight = FontWeights.Bold, 
                FontSize = 25 
            };
            radialAxis.Annotations.Add(gaugeAnnotation);
            
            this.Content = sfRadialGauge;
        }
    }
}
```

## Key Concepts Summary

### Axis
- Defines the scale and range (Minimum/Maximum)
- Controls interval between labels
- Can add multiple axes to one gauge

### Ranges
- Visual segments highlighting value zones
- Defined by StartValue and EndValue
- Useful for color-coding (danger/warning/safe)

### Pointers
- Indicate current values on the axis
- Four types available (Needle, Shape, Range, Content)
- Multiple pointers can show different metrics

### Annotations
- Add custom UI elements at specific positions
- Position using angle or axis value
- Can display text, images, or complex layouts

## Next Steps

- **Customize axis appearance**: See [axis-configuration.md](axis-configuration.md)
- **Configure pointer styles**: See [pointers.md](pointers.md)
- **Enhance ranges**: See [ranges.md](ranges.md)
- **Add complex annotations**: See [annotations.md](annotations.md)
- **Enable animations**: See [animation.md](animation.md)

## Troubleshooting

**Issue: Gauge not appearing**
- Ensure NuGet package is installed
- Check namespace is imported correctly
- Verify gauge has sufficient space in layout

**Issue: Pointer not showing**
- Ensure Value is within axis Minimum/Maximum range
- Check pointer is added to Pointers collection
- Verify pointer styling isn't transparent

**Issue: Build errors**
- Clean and rebuild solution
- Restore NuGet packages
- Check for namespace conflicts

## Additional Resources

- [GitHub Samples](https://github.com/syncfusion/winui-demos/tree/master/radialgauge)
- [API Documentation](https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Gauges.html)
