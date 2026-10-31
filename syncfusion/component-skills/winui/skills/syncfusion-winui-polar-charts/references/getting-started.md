# Getting Started with WinUI Polar Chart

Complete guide to setting up and implementing your first Syncfusion WinUI Polar Chart (SfPolarChart) in a Windows App SDK application.

## Table of Contents
- [Installation](#installation)
- [Creating Your First Polar Chart](#creating-your-first-polar-chart)
- [Data Model Setup](#data-model-setup)
- [View Model Implementation](#view-model-implementation)
- [XAML Implementation](#xaml-implementation)
- [Code-Behind Implementation](#code-behind-implementation)
- [Understanding the Structure](#understanding-the-structure)
- [Running the Application](#running-the-application)
- [Next Steps](#next-steps)

## Installation

### Step 1: Install NuGet Package

Add the Syncfusion Chart package to your WinUI project:

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.Chart.WinUI
```

**Using .NET CLI:**
```bash
dotnet add package Syncfusion.Chart.WinUI
```

**Using Visual Studio:**
1. Right-click on your project in Solution Explorer
2. Select **Manage NuGet Packages**
3. Search for `Syncfusion.Chart.WinUI`
4. Click **Install**

### Step 2: Verify Installation

After installation, verify that the package is referenced in your `.csproj` file:

```xml
<ItemGroup>
  <PackageReference Include="Syncfusion.Chart.WinUI" Version="x.x.x.x" />
</ItemGroup>
```

## Creating Your First Polar Chart

Let's create a complete polar chart example showing plant distribution by direction.

## Data Model Setup

Create a simple data model to represent your chart data:

**Create a new class `PlantData.cs`:**

```csharp
namespace PolarChartDemo.Models
{
    public class PlantData
    {
        public string Direction { get; set; }
        public double Tree { get; set; }
    }
}
```

**For multiple series, you can add more properties:**

```csharp
public class PlantData
{
    public string Direction { get; set; }
    public double Tree { get; set; }
    public double Weed { get; set; }
    public double Flower { get; set; }
}
```

## View Model Implementation

Create a view model to supply data to the chart using MVVM pattern:

**Create `ChartViewModel.cs`:**

```csharp
using System.Collections.ObjectModel;

namespace PolarChartDemo.ViewModels
{
    public class ChartViewModel
    {
        public ObservableCollection<PlantData> PlantDetails { get; set; }

        public ChartViewModel()
        {
            PlantDetails = new ObservableCollection<PlantData>()
            {
                new PlantData { Direction = "North", Tree = 80 },
                new PlantData { Direction = "NorthEast", Tree = 87 },
                new PlantData { Direction = "East", Tree = 78 },
                new PlantData { Direction = "SouthEast", Tree = 85 },
                new PlantData { Direction = "South", Tree = 81 },
                new PlantData { Direction = "SouthWest", Tree = 88 },
                new PlantData { Direction = "West", Tree = 80 },
                new PlantData { Direction = "NorthWest", Tree = 85 }
            };
        }
    }
}
```

**Why ObservableCollection?**
- Automatically notifies the UI when items are added/removed
- Essential for dynamic data updates
- Recommended for all WinUI data binding scenarios

## XAML Implementation

Implement the polar chart in your XAML page:

**MainWindow.xaml:**

```xml
<Window
    x:Class="PolarChartDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:PolarChartDemo.ViewModels">

    <Grid>
        <chart:SfPolarChart Header="Plant Distribution by Direction">
            
            <!-- Set DataContext to ViewModel -->
            <chart:SfPolarChart.DataContext>
                <local:ChartViewModel/>
            </chart:SfPolarChart.DataContext>
            
            <!-- Primary Axis: Angular axis (around the circle) -->
            <chart:SfPolarChart.PrimaryAxis>
                <chart:CategoryAxis/>
            </chart:SfPolarChart.PrimaryAxis>
            
            <!-- Secondary Axis: Radial axis (from center outward) -->
            <chart:SfPolarChart.SecondaryAxis>
                <chart:NumericalAxis/>
            </chart:SfPolarChart.SecondaryAxis>
            
            <!-- Legend -->
            <chart:SfPolarChart.Legend>
                <chart:ChartLegend/>
            </chart:SfPolarChart.Legend>
            
            <!-- Series Collection -->
            <chart:SfPolarChart.Series>
                <chart:PolarAreaSeries ItemsSource="{Binding PlantDetails}"
                                       XBindingPath="Direction"
                                       YBindingPath="Tree"
                                       Label="Tree"
                                       ShowDataLabels="True"
                                       LegendIcon="Pentagon">
                    <!-- Data Label Styling -->
                    <chart:PolarAreaSeries.DataLabelSettings>
                        <chart:PolarDataLabelSettings Foreground="White"
                                                      BorderBrush="White"
                                                      BorderThickness="1"
                                                      FontFamily="Calibri"
                                                      FontSize="12"/>
                    </chart:PolarAreaSeries.DataLabelSettings>
                </chart:PolarAreaSeries>
            </chart:SfPolarChart.Series>
            
        </chart:SfPolarChart>
    </Grid>

</Window>
```

### Key XAML Elements Explained

**1. Namespace Declaration:**
```xml
xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
```
Imports the Syncfusion Charts namespace for use in XAML.

**2. DataContext Binding:**
```xml
<chart:SfPolarChart.DataContext>
    <local:ChartViewModel/>
</chart:SfPolarChart.DataContext>
```
Instantiates the view model and sets it as the data context.

**3. Axis Configuration:**
- **PrimaryAxis:** The angular axis (categories arranged around the circle)
- **SecondaryAxis:** The radial axis (numeric scale from center to edge)

**4. Data Binding:**
- `ItemsSource="{Binding PlantDetails}"` - Binds to the data collection
- `XBindingPath="Direction"` - Maps to the Direction property
- `YBindingPath="Tree"` - Maps to the Tree property for values

## Code-Behind Implementation

Alternatively, you can create the chart entirely in C# code-behind:

**MainWindow.xaml.cs:**

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Charts;
using Windows.UI;

namespace PolarChartDemo
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create the chart
            SfPolarChart chart = new SfPolarChart();
            chart.Header = "Plant Distribution by Direction";
            
            // Set up the view model
            ChartViewModel viewModel = new ChartViewModel();
            chart.DataContext = viewModel;
            
            // Configure primary axis (angular)
            CategoryAxis primaryAxis = new CategoryAxis();
            chart.PrimaryAxis = primaryAxis;
            
            // Configure secondary axis (radial)
            NumericalAxis secondaryAxis = new NumericalAxis();
            chart.SecondaryAxis = secondaryAxis;
            
            // Add legend
            chart.Legend = new ChartLegend();
            
            // Create and configure series
            PolarAreaSeries series = new PolarAreaSeries();
            series.XBindingPath = "Direction";
            series.YBindingPath = "Tree";
            series.Label = "Tree";
            series.LegendIcon = ChartLegendIcon.Pentagon;
            series.ShowDataLabels = true;
            
            // Configure data labels
            series.DataLabelSettings = new PolarDataLabelSettings()
            {
                Foreground = new SolidColorBrush(Colors.White),
                BorderBrush = new SolidColorBrush(Colors.White),
                BorderThickness = new Thickness(1),
                FontFamily = new FontFamily("Calibri"),
                FontSize = 12
            };
            
            // Bind series to data
            series.SetBinding(
                ChartSeriesBase.ItemsSourceProperty,
                new Binding() { Path = new PropertyPath("PlantDetails") }
            );
            
            // Add series to chart
            chart.Series.Add(series);
            
            // Set chart as window content
            this.Content = chart;
        }
    }
}
```

### When to Use Code-Behind vs XAML

**Use XAML when:**
- You prefer declarative UI design
- The chart configuration is mostly static
- You want better design-time preview in Visual Studio
- You're following strict MVVM patterns

**Use Code-Behind when:**
- You need dynamic chart creation based on runtime conditions
- You're generating multiple charts programmatically
- You prefer imperative programming style
- Complex logic is involved in chart setup

## Understanding the Structure

### Chart Hierarchy

```
SfPolarChart
├── Header (Chart Title)
├── PrimaryAxis (Angular - Categories around circle)
├── SecondaryAxis (Radial - Values from center)
├── Legend (Series information)
└── Series (Collection)
    └── PolarAreaSeries / PolarLineSeries
        ├── ItemsSource (Data binding)
        ├── XBindingPath (Category property)
        ├── YBindingPath (Value property)
        ├── DataLabelSettings
        └── Other properties
```

### Data Flow

1. **Data Model** → Defines the structure of each data point
2. **View Model** → Provides the data collection (ObservableCollection)
3. **DataContext** → Links the view model to the chart
4. **ItemsSource** → Binds the series to the data collection
5. **XBindingPath/YBindingPath** → Maps properties to chart coordinates
6. **Rendering** → Chart displays the data visually

## Running the Application

### Build and Run

1. **Build the project:** Press `Ctrl+Shift+B` or select Build → Build Solution
2. **Run the application:** Press `F5` or click the Start button
3. **Verify the output:** You should see a polar chart with plant distribution data

### Expected Output

You should see:
- A polar area chart with data plotted around a center point
- Eight data points representing the eight compass directions
- A legend showing "Tree" with a pentagon icon
- Data labels on each data point showing the values
- A title "Plant Distribution by Direction" at the top

### Troubleshooting First Run

**"Type 'SfPolarChart' not found"**
- Ensure the NuGet package is installed
- Rebuild the solution
- Check the namespace declaration in XAML

**"Invalid License" message or trial watermark**
- Verify the license key is registered in `App.xaml.cs`
- Check that the license key is valid and not expired

**Chart not displaying**
- Verify DataContext is set
- Check that ItemsSource binding path is correct
- Ensure data collection has items

**No data points visible**
- Verify XBindingPath and YBindingPath match property names exactly
- Check that data values are within reasonable range
- Ensure Secondary axis range accommodates your data

## Next Steps

Now that you have a basic polar chart working, explore these topics:

**1. Series Types**
- Switch between PolarLineSeries and PolarAreaSeries
- Add multiple series for comparison
- Learn about grid line types (Circle vs Polygon)
- **Read:** [series-types.md](series-types.md)

**2. Axis Configuration**
- Explore different axis types (Numerical, DateTime, Logarithmic)
- Customize axis ranges and intervals
- **Read:** [axis-configuration.md](axis-configuration.md)

**3. Customization**
- Style the chart with custom colors
- Add data label templates
- Customize legend appearance
- **Read:** [appearance.md](appearance.md) and [data-labels.md](data-labels.md)

**4. Advanced Features**
- Implement interactive features (toggle series visibility)
- Add axis titles and labels
- Change start angle for different orientations
- **Read:** [title-legend.md](title-legend.md) and [start-angle.md](start-angle.md)

## Complete Working Example

Here's the complete file structure for quick reference:

```
PolarChartDemo/
├── App.xaml
├── App.xaml.cs (License registration)
├── MainWindow.xaml (Chart UI)
├── MainWindow.xaml.cs
├── Models/
│   └── PlantData.cs (Data model)
└── ViewModels/
    └── ChartViewModel.cs (Data provider)
```

**Download Sample:**
Visit [Syncfusion GitHub Samples](https://github.com/SyncfusionExamples/GettingStartedChartWinUI) for complete working examples.

## Summary

You've successfully:
- ✓ Installed the Syncfusion.Chart.WinUI package
- ✓ Registered the Syncfusion license
- ✓ Created a data model and view model
- ✓ Implemented a polar chart in XAML or C#
- ✓ Bound data to the chart using MVVM pattern
- ✓ Rendered your first polar chart

You're now ready to explore more advanced features and customization options!
