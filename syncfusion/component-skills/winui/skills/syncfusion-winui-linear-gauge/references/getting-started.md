# Getting Started with WinUI Linear Gauge

This guide covers the essential steps to add the WinUI Linear Gauge (SfLinearGauge) control to your application and configure its basic elements including axis, ranges, and pointers.

## Prerequisites

Before you begin, ensure you have:
- **Visual Studio 2022 or 2026** with WinUI workload installed
- **.NET 9.0 or higher**
- **Windows 10 SDK (10.0.17763.0 or higher)**
- **Windows 10 version 1809+ or Windows 11**

## Creating a WinUI 3 Desktop Application

1. Open Visual Studio 2022 or 2026
2. Create a new project
3. Select **"Blank App, Packaged (WinUI 3 in Desktop)"** template
4. Configure your project:
   - Project name: e.g., "LinearGaugeApp"
   - Location: Choose your preferred directory
   - Solution name: e.g., "LinearGaugeApp"
5. Select target framework: **.NET 9.0 or higher**
6. Click **Create**

## Installing the NuGet Package

Install the Syncfusion.Gauge.WinUI NuGet package:

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.Gauge.WinUI
```

**Using NuGet Package Manager UI:**
1. Right-click on your project → **Manage NuGet Packages**
2. Select **Browse** tab
3. Search for "Syncfusion.Gauge.WinUI"
4. Select the package and click **Install**

## Adding Namespace

Import the Syncfusion Gauge namespace in your XAML or C# files.

**In XAML (MainWindow.xaml):**
```xml
<Window
    x:Class="LinearGaugeApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:gauge="using:Syncfusion.UI.Xaml.Gauges">
    
    <!-- Your content here -->
    
</Window>
```

**In C# (MainWindow.xaml.cs):**
```csharp
using Syncfusion.UI.Xaml.Gauges;
```

## Initializing the Linear Gauge

### Method 1: XAML Declaration

Add the SfLinearGauge control in XAML:

```xml
<Window
    x:Class="LinearGaugeApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:gauge="using:Syncfusion.UI.Xaml.Gauges">
    
    <Grid>
        <gauge:SfLinearGauge />
    </Grid>
</Window>
```

This creates a basic linear gauge with default settings:
- Horizontal orientation
- Axis range: 0 to 100
- Axis line with labels and tick marks
- No pointers or ranges (empty gauge)

### Method 2: C# Code-Behind

Create the gauge programmatically in code:

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Gauges;

namespace LinearGaugeApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            SfLinearGauge sfLinearGauge = new SfLinearGauge();
            this.Content = sfLinearGauge;
        }
    }
}
```

**Note:** A default axis is automatically added when initializing the Linear Gauge control.

## Adding Axis to the Linear Gauge

The axis is the scale where values are plotted. You can customize the axis range using `Minimum`, `Maximum`, and `Interval` properties.

### XAML:
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Minimum="0"
                          Maximum="140"
                          Interval="20" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### C#:
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
LinearAxis linearAxis = new LinearAxis();
linearAxis.Minimum = 0;
linearAxis.Maximum = 140;
linearAxis.Interval = 20;
sfLinearGauge.Axis = linearAxis;
this.Content = sfLinearGauge;
```

**Result:** A linear gauge with axis ranging from 0 to 140, with labels at every 20 units.

## Adding Ranges to the Linear Gauge

Ranges are visual elements that help quickly visualize where a value falls on the axis. You can add multiple ranges with different colors to represent value categories.

### Basic Range Example

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Maximum="140" Interval="10">
            <gauge:LinearAxis.Ranges>
                <gauge:LinearGaugeRange StartValue="0"
                                        EndValue="50"
                                        Background="Red" />
                <gauge:LinearGaugeRange StartValue="50"
                                        EndValue="100"
                                        Background="Orange" />
                <gauge:LinearGaugeRange StartValue="100"
                                        EndValue="140"
                                        Background="Green" />
            </gauge:LinearAxis.Ranges>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.Maximum = 140;
sfLinearGauge.Axis.Interval = 10;

LinearGaugeRange gaugeRange1 = new LinearGaugeRange();
gaugeRange1.StartValue = 0;
gaugeRange1.EndValue = 50;
gaugeRange1.Background = new SolidColorBrush(Colors.Red);
sfLinearGauge.Axis.Ranges.Add(gaugeRange1);

LinearGaugeRange gaugeRange2 = new LinearGaugeRange();
gaugeRange2.StartValue = 50;
gaugeRange2.EndValue = 100;
gaugeRange2.Background = new SolidColorBrush(Colors.Orange);
sfLinearGauge.Axis.Ranges.Add(gaugeRange2);

LinearGaugeRange gaugeRange3 = new LinearGaugeRange();
gaugeRange3.StartValue = 100;
gaugeRange3.EndValue = 140;
gaugeRange3.Background = new SolidColorBrush(Colors.Green);
sfLinearGauge.Axis.Ranges.Add(gaugeRange3);

this.Content = sfLinearGauge;
```

**Result:** Three color-coded ranges - Red (0-50), Orange (50-100), and Green (100-140).

## Adding Bar Pointer to the Linear Gauge

Bar pointers are filled indicators that show a value from the axis start to the current value position.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Maximum="140" Interval="10">
            <gauge:LinearAxis.Ranges>
                <!-- Ranges from previous example -->
            </gauge:LinearAxis.Ranges>
            
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="90" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.Maximum = 140;
sfLinearGauge.Axis.Interval = 10;

// Add ranges (code from previous example)
// ...

// Add bar pointer
BarPointer barPointer = new BarPointer();
barPointer.Value = 90;
sfLinearGauge.Axis.BarPointers.Add(barPointer);

this.Content = sfLinearGauge;
```

**Result:** A bar pointer showing value 90 on the gauge.

## Adding Marker Pointers to the Linear Gauge

Marker pointers are indicators placed at specific values on the axis. There are two types:
1. **Shape Pointer** - Built-in or custom shapes
2. **Content Pointer** - Custom content like text, images, or icons

### Adding Shape Pointer

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Maximum="140" Interval="10">
            <gauge:LinearAxis.Ranges>
                <!-- Ranges -->
            </gauge:LinearAxis.Ranges>
            
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="90" />
            </gauge:LinearAxis.BarPointers>
            
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="90"
                                          VerticalAnchor="End"
                                          OffsetPoint="0,-8" />
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer();
shapePointer.Value = 90;
shapePointer.VerticalAnchor = GaugeAnchor.End;
shapePointer.OffsetPoint = new Point(0, -8);
sfLinearGauge.Axis.MarkerPointers.Add(shapePointer);
```

**Explanation:**
- `Value="90"` - Position on the axis
- `VerticalAnchor="End"` - Align to bottom edge of the pointer
- `OffsetPoint="0,-8"` - Move 8 pixels upward from the axis

### Adding Content Pointer

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Maximum="140" Interval="10">
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="90"
                                          VerticalAnchor="End"
                                          OffsetPoint="0,-8" />
                
                <gauge:LinearContentPointer Value="90"
                                            VerticalAnchor="End"
                                            OffsetPoint="0,-28">
                    <gauge:LinearContentPointer.Content>
                        <TextBlock Text="90%" />
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearContentPointer contentPointer = new LinearContentPointer();
contentPointer.Value = 90;
contentPointer.VerticalAnchor = GaugeAnchor.End;
contentPointer.OffsetPoint = new Point(0, -28);
contentPointer.Content = new TextBlock { Text = "90%" };
sfLinearGauge.Axis.MarkerPointers.Add(contentPointer);
```

**Result:** A text label "90%" displayed above the shape pointer.

## Complete Example

Here's a complete working example combining all the elements:

**XAML (MainWindow.xaml):**
```xml
<Window
    x:Class="LinearGaugeApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:gauge="using:Syncfusion.UI.Xaml.Gauges">
    
    <Grid>
        <gauge:SfLinearGauge>
            <gauge:SfLinearGauge.Axis>
                <gauge:LinearAxis Maximum="140" Interval="10">
                    
                    <!-- Color-coded ranges -->
                    <gauge:LinearAxis.Ranges>
                        <gauge:LinearGaugeRange StartValue="0"
                                                EndValue="50"
                                                Background="Red" />
                        <gauge:LinearGaugeRange StartValue="50"
                                                EndValue="100"
                                                Background="Orange" />
                        <gauge:LinearGaugeRange StartValue="100"
                                                EndValue="140"
                                                Background="Green" />
                    </gauge:LinearAxis.Ranges>
                    
                    <!-- Bar pointer -->
                    <gauge:LinearAxis.BarPointers>
                        <gauge:BarPointer Value="90" />
                    </gauge:LinearAxis.BarPointers>
                    
                    <!-- Marker pointers -->
                    <gauge:LinearAxis.MarkerPointers>
                        <gauge:LinearShapePointer Value="90"
                                                  VerticalAnchor="End"
                                                  OffsetPoint="0,-8" />
                        
                        <gauge:LinearContentPointer Value="90"
                                                    VerticalAnchor="End"
                                                    OffsetPoint="0,-28">
                            <gauge:LinearContentPointer.Content>
                                <TextBlock Text="90%" />
                            </gauge:LinearContentPointer.Content>
                        </gauge:LinearContentPointer>
                    </gauge:LinearAxis.MarkerPointers>
                    
                </gauge:LinearAxis>
            </gauge:SfLinearGauge.Axis>
        </gauge:SfLinearGauge>
    </Grid>
</Window>
```

**C# (MainWindow.xaml.cs):**
```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Gauges;
using Microsoft.UI;
using Microsoft.UI.Xaml.Media;
using Windows.Foundation;

namespace LinearGaugeApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Alternatively, create entirely in code:
            // CreateGaugeProgrammatically();
        }
        
        private void CreateGaugeProgrammatically()
        {
            SfLinearGauge sfLinearGauge = new SfLinearGauge();
            sfLinearGauge.Axis.Maximum = 140;
            sfLinearGauge.Axis.Interval = 10;
            
            // Add ranges
            LinearGaugeRange range1 = new LinearGaugeRange
            {
                StartValue = 0,
                EndValue = 50,
                Background = new SolidColorBrush(Colors.Red)
            };
            sfLinearGauge.Axis.Ranges.Add(range1);
            
            LinearGaugeRange range2 = new LinearGaugeRange
            {
                StartValue = 50,
                EndValue = 100,
                Background = new SolidColorBrush(Colors.Orange)
            };
            sfLinearGauge.Axis.Ranges.Add(range2);
            
            LinearGaugeRange range3 = new LinearGaugeRange
            {
                StartValue = 100,
                EndValue = 140,
                Background = new SolidColorBrush(Colors.Green)
            };
            sfLinearGauge.Axis.Ranges.Add(range3);
            
            // Add bar pointer
            BarPointer barPointer = new BarPointer { Value = 90 };
            sfLinearGauge.Axis.BarPointers.Add(barPointer);
            
            // Add shape pointer
            LinearShapePointer shapePointer = new LinearShapePointer
            {
                Value = 90,
                VerticalAnchor = GaugeAnchor.End,
                OffsetPoint = new Point(0, -8)
            };
            sfLinearGauge.Axis.MarkerPointers.Add(shapePointer);
            
            // Add content pointer
            LinearContentPointer contentPointer = new LinearContentPointer
            {
                Value = 90,
                VerticalAnchor = GaugeAnchor.End,
                OffsetPoint = new Point(0, -28),
                Content = new TextBlock { Text = "90%" }
            };
            sfLinearGauge.Axis.MarkerPointers.Add(contentPointer);
            
            this.Content = sfLinearGauge;
        }
    }
}
```

## Running the Application

1. Press **F5** or click **Start** in Visual Studio
2. The application should display a linear gauge with:
   - Axis from 0 to 140
   - Three color-coded ranges (Red, Orange, Green)
   - Bar pointer showing value 90
   - Shape pointer at value 90
   - Text label "90%" above the shape pointer

## Next Steps

Now that you have a basic linear gauge working, explore these advanced features:

- **[Axis Customization](axis-customization.md)** - Customize labels, ticks, orientation, and more
- **[Ranges](ranges.md)** - Configure range widths, gradients, and positioning
- **[Pointers](pointers.md)** - Learn about different pointer types and customization
- **[Animation](animation.md)** - Add smooth animations to pointer movements

## Troubleshooting

### Issue: Gauge not displaying
- Verify the NuGet package is installed correctly
- Check that the namespace is imported: `xmlns:gauge="using:Syncfusion.UI.Xaml.Gauges"`
- Ensure the target framework is .NET 5.0 or higher

### Issue: Pointers not visible
- Check that the `Value` property is within the axis range (Minimum to Maximum)
- Verify pointer collections are added to the correct axis
- Ensure `OffsetPoint` values aren't pushing pointers outside the visible area

### Issue: Ranges not showing
- Confirm `StartValue` and `EndValue` are within axis range
- Check that `Background` property is set with a visible color
- Verify ranges don't have zero width (StartWidth and EndWidth both 0)

## Sample Code Repository

Download complete working examples from the [GitHub repository](https://github.com/SyncfusionExamples/WinUI-Linear-Gauge-Getting-Started).
