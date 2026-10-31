# Getting Started with Cartesian Charts

This guide covers the essentials for setting up and creating your first Syncfusion WinUI Cartesian Chart (SfCartesianChart).

## Installation

### NuGet Package

Install the Syncfusion.Chart.WinUI NuGet package to your WinUI project:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Chart.WinUI
```

**NuGet Package Manager UI:**
1. Right-click on your project → Manage NuGet Packages
2. Search for "Syncfusion.Chart.WinUI"
3. Click Install

**Package Reference (.csproj):**
```xml
<PackageReference Include="Syncfusion.Chart.WinUI" Version="[latest-version]" />
```

## Namespace Import

Import the Syncfusion Charts namespace in your XAML or C# files:

**XAML:**
```xaml
<Window
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts">
    <!-- Chart controls go here -->
</Window>
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Charts;
```

## Initialize the Chart Control

### In XAML

```xaml
<Window
    x:Class="ChartApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts">
    
    <Grid x:Name="grid">
        <chart:SfCartesianChart/>
    </Grid>
</Window>
```

### In C# Code-Behind

```csharp
using Syncfusion.UI.Xaml.Charts;

namespace ChartApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            
            SfCartesianChart chart = new SfCartesianChart();
            grid.Children.Add(chart);
        }
    }
}
```

## Create a Data Model

Define a simple data model to represent your chart data:

```csharp
public class SalesData
{
    public string Product { get; set; }
    public double Sales { get; set; }
}
```

For time-series data:

```csharp
public class TimeSeriesData
{
    public DateTime Date { get; set; }
    public double Value { get; set; }
}
```

For financial data:

```csharp
public class StockData
{
    public DateTime Date { get; set; }
    public double Open { get; set; }
    public double High { get; set; }
    public double Low { get; set; }
    public double Close { get; set; }
    public double Volume { get; set; }
}
```

## Create a ViewModel

Create a ViewModel to provide data to the chart:

```csharp
public class ChartViewModel
{
    public List<SalesData> SalesData { get; set; }
    
    public ChartViewModel()
    {
        SalesData = new List<SalesData>
        {
            new SalesData { Product = "Product A", Sales = 25000 },
            new SalesData { Product = "Product B", Sales = 38000 },
            new SalesData { Product = "Product C", Sales = 17000 },
            new SalesData { Product = "Product D", Sales = 42000 },
            new SalesData { Product = "Product E", Sales = 29000 }
        };
    }
}
```

## Set DataContext

### In XAML

```xaml
<Window
    xmlns:local="using:ChartApp">
    
    <Grid>
        <Grid.DataContext>
            <local:ChartViewModel/>
        </Grid.DataContext>
        
        <chart:SfCartesianChart/>
    </Grid>
</Window>
```

### In C# Code-Behind

```csharp
public MainWindow()
{
    InitializeComponent();
    grid.DataContext = new ChartViewModel();
}
```

## Configure Axes

Cartesian charts require at least one X-axis and one Y-axis.

### XAML Configuration

```xaml
<chart:SfCartesianChart>
    
    <!-- Horizontal Axis (X) -->
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis Header="Products"/>
    </chart:SfCartesianChart.XAxes>
    
    <!-- Vertical Axis (Y) -->
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Sales ($)"/>
    </chart:SfCartesianChart.YAxes>
    
</chart:SfCartesianChart>
```

### C# Configuration

```csharp
SfCartesianChart chart = new SfCartesianChart();

// Add X-axis
CategoryAxis xAxis = new CategoryAxis();
xAxis.Header = "Products";
chart.XAxes.Add(xAxis);

// Add Y-axis
NumericalAxis yAxis = new NumericalAxis();
yAxis.Header = "Sales ($)";
chart.YAxes.Add(yAxis);
```

## Add a Series

Add a series to visualize your data. Here we'll use ColumnSeries:

### XAML

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis Header="Products"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Sales ($)"/>
    </chart:SfCartesianChart.YAxes>
    
    <!-- Column Series -->
    <chart:ColumnSeries ItemsSource="{Binding SalesData}"
                       XBindingPath="Product" 
                       YBindingPath="Sales"/>
    
</chart:SfCartesianChart>
```

### C#

```csharp
ColumnSeries series = new ColumnSeries();
series.ItemsSource = new ChartViewModel().SalesData;
series.XBindingPath = "Product";
series.YBindingPath = "Sales";

chart.Series.Add(series);
```

**Key Properties:**
- **ItemsSource** - The data collection to bind
- **XBindingPath** - Property name for X-axis values
- **YBindingPath** - Property name for Y-axis values

## Complete Working Example

### XAML

```xaml
<Window
    x:Class="ChartApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:ChartApp">
    
    <Grid>
        <Grid.DataContext>
            <local:ChartViewModel/>
        </Grid.DataContext>
        
        <chart:SfCartesianChart Header="Quarterly Sales Report">
            
            <!-- Axes -->
            <chart:SfCartesianChart.XAxes>
                <chart:CategoryAxis Header="Products"/>
            </chart:SfCartesianChart.XAxes>
            
            <chart:SfCartesianChart.YAxes>
                <chart:NumericalAxis Header="Sales ($)"/>
            </chart:SfCartesianChart.YAxes>
            
            <!-- Series -->
            <chart:ColumnSeries ItemsSource="{Binding SalesData}"
                               XBindingPath="Product" 
                               YBindingPath="Sales"
                               Label="Q1 Sales"
                               ShowDataLabels="True"/>
            
        </chart:SfCartesianChart>
    </Grid>
    
</Window>
```

### C# Complete Example

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Charts;
using System.Collections.Generic;

namespace ChartApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            CreateChart();
        }
        
        private void CreateChart()
        {
            // Create chart
            SfCartesianChart chart = new SfCartesianChart();
            chart.Header = "Quarterly Sales Report";
            
            // Configure X-axis
            CategoryAxis xAxis = new CategoryAxis();
            xAxis.Header = "Products";
            chart.XAxes.Add(xAxis);
            
            // Configure Y-axis
            NumericalAxis yAxis = new NumericalAxis();
            yAxis.Header = "Sales ($)";
            chart.YAxes.Add(yAxis);
            
            // Create and configure series
            ColumnSeries series = new ColumnSeries();
            series.ItemsSource = new ChartViewModel().SalesData;
            series.XBindingPath = "Product";
            series.YBindingPath = "Sales";
            series.Label = "Q1 Sales";
            series.ShowDataLabels = true;
            
            // Add series to chart
            chart.Series.Add(series);
            
            // Add chart to UI
            grid.Children.Add(chart);
        }
    }
    
    // Data Model
    public class SalesData
    {
        public string Product { get; set; }
        public double Sales { get; set; }
    }
    
    // ViewModel
    public class ChartViewModel
    {
        public List<SalesData> SalesData { get; set; }
        
        public ChartViewModel()
        {
            SalesData = new List<SalesData>
            {
                new SalesData { Product = "Product A", Sales = 25000 },
                new SalesData { Product = "Product B", Sales = 38000 },
                new SalesData { Product = "Product C", Sales = 17000 },
                new SalesData { Product = "Product D", Sales = 42000 },
                new SalesData { Product = "Product E", Sales = 29000 }
            };
        }
    }
}
```

## Next Steps

Now that you have a basic chart running, explore these topics:

- **Axis Types** - Learn about CategoryAxis, NumericalAxis, DateTimeAxis, and LogarithmicAxis
- **Series Types** - Explore line, area, bar, scatter, bubble, and financial series
- **Interactive Features** - Add zooming, panning, tooltips, and selection
- **Customization** - Style your chart with legends, data labels, and custom colors
- **Fast Series** - Handle large datasets with high-performance rendering

## Common Issues

**Chart not visible:**
- Ensure both XAxes and YAxes collections have at least one axis
- Check that ItemsSource has data
- Verify XBindingPath and YBindingPath match your model property names

**Data not displaying:**
- Confirm DataContext is set correctly
- Check binding paths are correct (case-sensitive)
- Ensure data types match (e.g., NumericalAxis expects numeric Y values)

**Build errors:**
- Verify Syncfusion.Chart.WinUI NuGet package is installed
- Check namespace imports are correct
- Ensure WinUI SDK version compatibility
