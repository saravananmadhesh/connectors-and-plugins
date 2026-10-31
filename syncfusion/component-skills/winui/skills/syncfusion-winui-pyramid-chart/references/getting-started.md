# Getting Started with WinUI Pyramid Chart

## Table of Contents
- [Overview](#overview)
- [Installation and Setup](#installation-and-setup)
- [Namespace Import](#namespace-import)
- [Creating the Chart Control](#creating-the-chart-control)
- [Data Model and View Model](#data-model-and-view-model)
- [Data Binding](#data-binding)
- [Complete Working Example](#complete-working-example)
- [Running the Application](#running-the-application)
- [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

---

## Overview

The Syncfusion WinUI Pyramid Chart (SfPyramidChart) is a specialized control for visualizing proportions of a total in hierarchies. This guide covers the complete setup from installation to your first working pyramid chart.

**What you'll learn:**
- Installing the required NuGet package
- Setting up the chart in XAML and C#
- Creating data models and view models
- Binding data to the pyramid chart
- Adding basic features like legends, tooltips, and data labels

---

## Installation and Setup

### Step 1: Add NuGet Package

Add the Syncfusion WinUI Chart NuGet package to your project.

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Chart.WinUI
```

**Or using NuGet Package Manager:**
1. Right-click on your project → **Manage NuGet Packages**
2. Search for `Syncfusion.Chart.WinUI`
3. Click **Install**

**Package Details:**
- **Package Name:** `Syncfusion.Chart.WinUI`
- **Namespace:** `Syncfusion.UI.Xaml.Charts`
- **Contains:** SfPyramidChart, SfCircularChart, SfFunnelChart, and related types

---

## Namespace Import

### XAML Namespace

Add the chart namespace to your XAML window or page:

```xml
<Window
    x:Class="PyramidChartApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:PyramidChartApp">
    
    <!-- Chart content goes here -->
    
</Window>
```

**Key Points:**
- Use `using:` prefix (not `clr-namespace:` as in WPF)
- The `chart` prefix can be any name, but `chart` is conventional
- Make sure to include your local namespace for view models

### C# Using Statement

Add the namespace in your code-behind or view model files:

```csharp
using Syncfusion.UI.Xaml.Charts;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Data;
```

---

## Creating the Chart Control

### Option 1: XAML Declaration

Create the chart in XAML markup:

```xml
<Window
    x:Class="PyramidChartApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts">
    
    <chart:SfPyramidChart x:Name="chart"/>
    
</Window>
```

### Option 2: C# Code-Behind

Create the chart programmatically:

```csharp
using Syncfusion.UI.Xaml.Charts;
using Microsoft.UI.Xaml;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        SfPyramidChart chart = new SfPyramidChart();
        
        // Additional configuration here
        
        this.Content = chart;
    }
}
```

**When to use each approach:**
- **XAML:** Better for declarative UI, easier to visualize structure, supports design-time preview
- **C#:** More control, dynamic chart creation, conditional logic

---

## Data Model and View Model

### Step 1: Create a Data Model

Define a model class to represent your data points:

```csharp
public class Model
{
    public string FoodName { get; set; }
    public double Calories { get; set; }
}
```

**Model Guidelines:**
- Use properties (not fields) for data binding
- Property names should match your binding paths
- Can include additional properties for more complex scenarios

### Step 2: Create a View Model

Create a view model class with a data collection:

```csharp
using System.Collections.Generic;

public class ChartViewModel
{
    public List<Model> Data { get; set; }
    
    public ChartViewModel()
    {
        Data = new List<Model>()
        {
            new Model { FoodName = "Sweet treats", Calories = 250 },
            new Model { FoodName = "Cheese", Calories = 402 },
            new Model { FoodName = "Vegetables", Calories = 65 },
            new Model { FoodName = "Fish", Calories = 206 },
            new Model { FoodName = "Fruits", Calories = 52 },
            new Model { FoodName = "Rice", Calories = 130 }
        };
    }
}
```

**Important Notes:**
- Data is typically ordered from largest to smallest for pyramid visualization
- Use `ObservableCollection<T>` if you need dynamic data updates
- The ViewModel doesn't need to implement INotifyPropertyChanged for static data

### Step 3: Set DataContext

#### Option A: Set DataContext in XAML

```xml
<Window
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:PyramidChartApp">
    
    <chart:SfPyramidChart>
        <chart:SfPyramidChart.DataContext>
            <local:ChartViewModel/>
        </chart:SfPyramidChart.DataContext>
    </chart:SfPyramidChart>
    
</Window>
```

#### Option B: Set DataContext in C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
ChartViewModel viewModel = new ChartViewModel();
chart.DataContext = viewModel;
```

---

## Data Binding

### Required Binding Properties

Three essential properties connect your data to the chart:

| Property | Type | Description |
|----------|------|-------------|
| **ItemsSource** | object | The collection of data items |
| **XBindingPath** | string | Property name for labels (categorical data) |
| **YBindingPath** | string | Property name for values (numerical data) |

### XAML Data Binding

```xml
<chart:SfPyramidChart ItemsSource="{Binding Data}"
                      XBindingPath="FoodName"
                      YBindingPath="Calories">
</chart:SfPyramidChart>
```

### C# Data Binding

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "FoodName";
chart.YBindingPath = "Calories";
```

**Binding Path Rules:**
- Must match property names exactly (case-sensitive)
- XBindingPath: Usually a string property (categories, labels)
- YBindingPath: Must be a numeric property (values)

---

## Complete Working Example

### Full XAML Implementation

```xml
<Window
    x:Class="PyramidChartApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:PyramidChartApp">
    
    <chart:SfPyramidChart x:Name="chart"
                          Header="The Food Comparison Pyramid"
                          ItemsSource="{Binding Data}"
                          XBindingPath="FoodName"
                          YBindingPath="Calories"
                          EnableTooltip="True"
                          ShowDataLabels="True">
        
        <!-- Set DataContext -->
        <chart:SfPyramidChart.DataContext>
            <local:ChartViewModel/>
        </chart:SfPyramidChart.DataContext>
        
        <!-- Add Legend -->
        <chart:SfPyramidChart.Legend>
            <chart:ChartLegend/>
        </chart:SfPyramidChart.Legend>
        
    </chart:SfPyramidChart>
    
</Window>
```

### Full C# Implementation

```csharp
using Syncfusion.UI.Xaml.Charts;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Data;
using System.Collections.Generic;

namespace PyramidChartApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create chart
            SfPyramidChart chart = new SfPyramidChart();
            
            // Create and set view model
            ChartViewModel viewModel = new ChartViewModel();
            chart.DataContext = viewModel;
            
            // Configure data binding
            chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
                new Binding() { Path = new PropertyPath("Data") });
            chart.XBindingPath = "FoodName";
            chart.YBindingPath = "Calories";
            
            // Set header
            chart.Header = "The Food Comparison Pyramid";
            
            // Add legend
            chart.Legend = new ChartLegend();
            
            // Enable features
            chart.EnableTooltip = true;
            chart.ShowDataLabels = true;
            
            // Set as window content
            this.Content = chart;
        }
    }
    
    // Data Model
    public class Model
    {
        public string FoodName { get; set; }
        public double Calories { get; set; }
    }
    
    // View Model
    public class ChartViewModel
    {
        public List<Model> Data { get; set; }
        
        public ChartViewModel()
        {
            Data = new List<Model>()
            {
                new Model { FoodName = "Sweet treats", Calories = 250 },
                new Model { FoodName = "Cheese", Calories = 402 },
                new Model { FoodName = "Vegetables", Calories = 65 },
                new Model { FoodName = "Fish", Calories = 206 },
                new Model { FoodName = "Fruits", Calories = 52 },
                new Model { FoodName = "Rice", Calories = 130 }
            };
        }
    }
}
```

---

## Running the Application

### Expected Output

When you run the application, you should see:
- A pyramid-shaped chart with 6 segments
- Each segment representing a food category
- The largest segment (Cheese, 402) at the bottom
- The smallest segment (Fruits, 52) at the top
- A legend showing all categories
- Tooltips when hovering over segments
- Data labels displaying values on each segment

### Basic Features Included

| Feature | Property | Description |
|---------|----------|-------------|
| **Title** | Header | "The Food Comparison Pyramid" |
| **Legend** | Legend | Shows all data point labels |
| **Tooltips** | EnableTooltip | Displays values on hover |
| **Data Labels** | ShowDataLabels | Shows values on segments |

---

## Common Issues and Troubleshooting

### Issue 1: Chart Not Displaying

**Symptoms:** Empty window, no chart visible

**Solutions:**
- Verify NuGet package is installed correctly
- Check namespace imports (`using:Syncfusion.UI.Xaml.Charts`)
- Ensure DataContext is set before binding
- Verify ItemsSource has data

### Issue 2: Data Not Binding

**Symptoms:** Chart displays but segments are missing

**Solutions:**
- Check XBindingPath and YBindingPath match property names exactly
- Ensure YBindingPath property is numeric (double, int, decimal)
- Verify ItemsSource collection is not empty
- Check for typos in property names (case-sensitive)

```csharp
// ✓ Correct
chart.XBindingPath = "FoodName";  // Matches property exactly

// ✗ Wrong
chart.XBindingPath = "foodname";  // Case doesn't match
chart.XBindingPath = "Name";      // Property doesn't exist
```

### Issue 3: Legend Not Showing

**Symptoms:** Chart displays, but no legend

**Solutions:**
- Verify Legend property is set: `chart.Legend = new ChartLegend();`
- Check if legend is positioned outside visible area
- Ensure X-axis data (labels) are provided

### Issue 4: Compilation Errors

**Common errors and fixes:**

```csharp
// Error: Cannot resolve symbol 'SfPyramidChart'
// Fix: Add using statement
using Syncfusion.UI.Xaml.Charts;

// Error: The name "chart" does not exist in the namespace
// Fix: Check XAML namespace declaration
xmlns:chart="using:Syncfusion.UI.Xaml.Charts"

// Error: Cannot set DataContext
// Fix: Ensure ViewModel class is public
public class ChartViewModel { }
```

### Issue 5: Runtime Binding Errors

Check Output window for binding errors:

```
Error: BindingExpression path error: 'Data' property not found on 'PyramidChartApp.MainWindow'
```

**Solution:** DataContext is not set or incorrect. Set DataContext to ViewModel instance.

---

## Next Steps

Now that you have a basic pyramid chart working, explore these features:

1. **Appearance** - Customize colors with palettes and gradients
2. **Legend** - Configure legend placement, icons, and templates
3. **Data Labels** - Customize label format, position, and style
4. **Tooltips** - Create custom tooltip templates
5. **Selection** - Enable segment selection and highlighting
6. **Exploding** - Make segments explode on click
7. **Advanced** - Add titles, spacing, and rendering modes

**Recommended reading order:** Start with `appearance.md` to make your chart visually appealing, then add interactivity with `tooltip.md` and `selection.md`.
