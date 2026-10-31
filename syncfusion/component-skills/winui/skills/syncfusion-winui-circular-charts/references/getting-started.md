# Getting Started with WinUI Circular Charts

This guide covers the complete setup and basic implementation of Syncfusion WinUI Circular Charts (SfCircularChart).

## Installation

### Step 1: Add NuGet Package

Add reference to the Syncfusion.Chart.WinUI NuGet package:

**Package Manager Console:**
```
Install-Package Syncfusion.Chart.WinUI
```

**Or via NuGet Package Manager:**
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Chart.WinUI"
3. Install the package

### Step 2: Import Namespace

Import the chart control namespace in your XAML or C# file:

**XAML:**
```xml
<Window
    x:Class="ChartDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts">
    
    <chart:SfCircularChart/>
</Window>
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Charts;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        SfCircularChart chart = new SfCircularChart();
        this.Content = chart;
    }
}
```

## Creating Your First Circular Chart

### Step 1: Define Data Model

Create a simple data model to represent data points:

```csharp
public class Sales
{
    public string Product { get; set; }
    public double SalesRate { get; set; }
}
```

**Key Points:**
- Each data point needs a **category property** (e.g., Product) for labels
- Each data point needs a **numeric property** (e.g., SalesRate) for values
- Properties must have public getters and setters

### Step 2: Create ViewModel

Create a ViewModel class and initialize data collection:

```csharp
public class ChartViewModel
{
    public List<Sales> Data { get; set; }

    public ChartViewModel()
    {
        Data = new List<Sales>()
        {
            new Sales() { Product = "iPad", SalesRate = 25 },
            new Sales() { Product = "iPhone", SalesRate = 35 },
            new Sales() { Product = "MacBook", SalesRate = 15 },
            new Sales() { Product = "Mac", SalesRate = 5 },
            new Sales() { Product = "Others", SalesRate = 10 }
        };
    }
}
```

**Best Practices:**
- Use `ObservableCollection<T>` for dynamic data that changes
- Use `List<T>` for static display data
- Initialize data in constructor or use property initializers

### Step 3: Set DataContext

Add ViewModel namespace and set it as DataContext:

**XAML:**
```xml
<Window
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:model="using:ChartDemo.ViewModel">

    <chart:SfCircularChart>
        <chart:SfCircularChart.DataContext>
            <model:ChartViewModel/>
        </chart:SfCircularChart.DataContext>
    </chart:SfCircularChart>
</Window>
```

**C#:**
```csharp
ChartViewModel viewModel = new ChartViewModel();
chart.DataContext = viewModel;
```

### Step 4: Add Series and Bind Data

Add a PieSeries to the chart and bind data using ItemsSource:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.DataContext>
        <model:ChartViewModel/>
    </chart:SfCircularChart.DataContext>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();
ChartViewModel viewModel = new ChartViewModel();
chart.DataContext = viewModel;

PieSeries series = new PieSeries();
series.SetBinding(PieSeries.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";

chart.Series.Add(series);
```

**Critical Properties:**
- **ItemsSource** - Binds to data collection from ViewModel
- **XBindingPath** - Property name for category/label (must match property name exactly)
- **YBindingPath** - Property name for numeric values (must match property name exactly)

## Complete Working Example

Here's a complete, ready-to-run example with all features:

**XAML (MainWindow.xaml):**
```xml
<Window
    x:Class="ChartDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:model="using:ChartDemo.ViewModel">

    <chart:SfCircularChart Header="PRODUCT SALES">
        <!-- Set DataContext for data binding -->
        <chart:SfCircularChart.DataContext>
            <model:ChartViewModel/>
        </chart:SfCircularChart.DataContext>
        
        <!-- Add Legend to show segment names -->
        <chart:SfCircularChart.Legend>
            <chart:ChartLegend/>
        </chart:SfCircularChart.Legend>
        
        <!-- Define Pie Series -->
        <chart:SfCircularChart.Series>
            <chart:PieSeries ItemsSource="{Binding Data}"
                           XBindingPath="Product"
                           YBindingPath="SalesRate"
                           ShowDataLabels="True"
                           EnableTooltip="True"/>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Window>
```

**C# (MainWindow.xaml.cs):**
```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Charts;
using Windows.UI.Xaml.Data;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        // Alternative: Create chart programmatically
        // SfCircularChart chart = CreateChart();
        // this.Content = chart;
    }
    
    private SfCircularChart CreateChart()
    {
        // Create chart instance
        SfCircularChart chart = new SfCircularChart();
        chart.Header = "PRODUCT SALES";
        
        // Add legend
        chart.Legend = new ChartLegend();
        
        // Set DataContext
        ChartViewModel viewModel = new ChartViewModel();
        chart.DataContext = viewModel;
        
        // Create and configure series
        PieSeries series = new PieSeries();
        series.SetBinding(PieSeries.ItemsSourceProperty, 
            new Binding() { Path = new PropertyPath("Data") });
        series.XBindingPath = "Product";
        series.YBindingPath = "SalesRate";
        series.ShowDataLabels = true;
        series.EnableTooltip = true;
        
        // Add series to chart
        chart.Series.Add(series);
        
        return chart;
    }
}
```

**ViewModel (ChartViewModel.cs):**
```csharp
using System.Collections.Generic;

namespace ChartDemo.ViewModel
{
    public class Sales
    {
        public string Product { get; set; }
        public double SalesRate { get; set; }
    }
    
    public class ChartViewModel
    {
        public List<Sales> Data { get; set; }
        
        public ChartViewModel()
        {
            Data = new List<Sales>()
            {
                new Sales() { Product = "iPad", SalesRate = 25 },
                new Sales() { Product = "iPhone", SalesRate = 35 },
                new Sales() { Product = "MacBook", SalesRate = 15 },
                new Sales() { Product = "Mac", SalesRate = 5 },
                new Sales() { Product = "Others", SalesRate = 10 }
            };
        }
    }
}
```

## Key Concepts

### Data Binding

The chart uses WinUI data binding to connect to your data:

1. **DataContext** - Sets the data source for the chart
2. **ItemsSource** - Binds to a collection property in the DataContext
3. **XBindingPath** - Specifies which property to use for categories/labels
4. **YBindingPath** - Specifies which property to use for numeric values

**Example Flow:**
```
ViewModel.Data → ItemsSource → Chart reads XBindingPath/YBindingPath → Renders segments
```

### Series Types

The Series collection can contain:
- **PieSeries** - Traditional pie chart with segments
- **DoughnutSeries** - Pie chart with a hole in the center
- **Multiple series** - Can add multiple series to same chart

### Initial Features

Common features to add in getting started:
- **Header** - Chart title
- **Legend** - Shows segment names/categories
- **ShowDataLabels** - Displays values on segments
- **EnableTooltip** - Shows tooltip on hover

## Common Getting Started Scenarios

### Scenario 1: Chart with ObservableCollection (Dynamic Data)

For data that updates dynamically:

```csharp
using System.Collections.ObjectModel;

public class ChartViewModel
{
    public ObservableCollection<Sales> Data { get; set; }
    
    public ChartViewModel()
    {
        Data = new ObservableCollection<Sales>()
        {
            new Sales() { Product = "iPad", SalesRate = 25 },
            new Sales() { Product = "iPhone", SalesRate = 35 }
        };
        
        // Chart will automatically update when items change
        Data.Add(new Sales() { Product = "MacBook", SalesRate = 15 });
    }
}
```

### Scenario 2: Multiple Series in One Chart

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <!-- First series (outer ring) -->
        <chart:DoughnutSeries ItemsSource="{Binding Data1}"
                            XBindingPath="Category"
                            YBindingPath="Value"
                            InnerRadius="0.7"/>
        
        <!-- Second series (inner pie) -->
        <chart:PieSeries ItemsSource="{Binding Data2}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       Radius="0.5"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 3: Minimal Code Setup

Absolute minimum code to display a chart:

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Name"
                       YBindingPath="Value"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

## Troubleshooting

### Chart Doesn't Appear

**Check:**
1. NuGet package installed and namespace imported
2. DataContext is set correctly
3. ItemsSource binding path matches ViewModel property
4. XBindingPath and YBindingPath match data model properties exactly (case-sensitive)
5. YBindingPath points to numeric property (int, double, decimal)

### No Segments Visible

**Possible causes:**
- Data collection is empty or null
- YBindingPath values are all zero
- Binding path names don't match property names
- DataContext not set before series initialization

### Binding Errors

**Common mistakes:**
```csharp
// ❌ Wrong - property name mismatch
series.XBindingPath = "product";  // Should be "Product" (capital P)

// ✅ Correct - exact match
series.XBindingPath = "Product";
```

## Next Steps

After basic setup, explore:
- **Pie Charts** - Read `pie-charts.md` for radius, grouping, semi-pie
- **Doughnut Charts** - Read `doughnut-charts.md` for inner radius, multiple series
- **Legend** - Read `legend.md` for customization
- **Data Labels** - Read `data-labels.md` for label positioning and styling
- **Tooltips** - Read `tooltips.md` for hover information
- **Selection** - Read `selection.md` for interactive selection
- **Appearance** - Read `appearance.md` for colors and styling

## Sample Project

Download a complete working sample from:
[GitHub - Syncfusion WinUI Circular Chart Getting Started](https://github.com/SyncfusionExamples/GettingStartedChartWinUI/tree/main/CircularChartGettingStarted)