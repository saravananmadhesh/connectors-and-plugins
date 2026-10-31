# Getting Started with WinUI Funnel Chart

This guide covers the essential steps to set up and display your first Syncfusion WinUI Funnel Chart (`SfFunnelChart`).

## Installation

### Add NuGet Package

Add the `Syncfusion.Chart.WinUI` NuGet package to your WinUI project:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Chart.WinUI
```

**NuGet Package Manager:**
1. Right-click on your project → Manage NuGet Packages
2. Search for "Syncfusion.Chart.WinUI"
3. Install the latest version

**Package Reference (*.csproj):**
```xml
<PackageReference Include="Syncfusion.Chart.WinUI" Version="x.x.x" />
```

## Namespace Import

Import the chart namespace in your XAML or C# files:

**XAML:**
```xml
<Window
    x:Class="ChartDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts">
    
    <chart:SfFunnelChart />
</Window>
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Charts;
```

## Basic Chart Setup

### Step 1: Create Data Model

Define a simple model class to represent data points:

```csharp
public class Model
{
    public string Category { get; set; }
    public double Value { get; set; }
}
```

**Key points:**
- `Category` will be used for segment labels (X-axis)
- `Value` will determine segment sizes (Y-axis)
- Use appropriate data types for your scenario

### Step 2: Create ViewModel

Create a ViewModel class with observable data:

```csharp
using System.Collections.Generic;

public class ChartViewModel
{
    public List<Model> Data { get; set; }
    
    public ChartViewModel()
    {
        Data = new List<Model>()
        {
            new Model() { Category = "Leads", Value = 1000 },
            new Model() { Category = "Qualified", Value = 750 },
            new Model() { Category = "Proposal", Value = 500 },
            new Model() { Category = "Negotiation", Value = 300 },
            new Model() { Category = "Closed", Value = 150 }
        };
    }
}
```

**Best practices:**
- Use meaningful category names for better readability
- Values should decrease from top to bottom for typical funnel representation
- Consider using `ObservableCollection<T>` for dynamic data updates

### Step 3: Initialize Chart in XAML

Create the funnel chart with data binding:

```xml
<Window
    x:Class="ChartDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:model="using:ChartDemo.ChartViewModel">

    <chart:SfFunnelChart x:Name="chart"
                         Header="SALES FUNNEL"
                         EnableTooltip="True"
                         ShowDataLabels="True"
                         Height="400" Width="600"
                         ItemsSource="{Binding Data}"
                         XBindingPath="Category"
                         YBindingPath="Value">
        
        <!-- Set DataContext to ViewModel -->
        <chart:SfFunnelChart.DataContext>
            <model:ChartViewModel />
        </chart:SfFunnelChart.DataContext>
        
        <!-- Add Legend -->
        <chart:SfFunnelChart.Legend>
            <chart:ChartLegend />
        </chart:SfFunnelChart.Legend>
    </chart:SfFunnelChart>
</Window>
```

**Property explanations:**
- `ItemsSource="{Binding Data}"` - Binds to the Data collection in ViewModel
- `XBindingPath="Category"` - Maps Category property to segment labels
- `YBindingPath="Value"` - Maps Value property to segment sizes
- `Header` - Sets the chart title
- `EnableTooltip` - Shows tooltips on hover
- `ShowDataLabels` - Displays values on segments

### Step 4: Initialize Chart in C#

Alternatively, create the chart programmatically:

```csharp
using Syncfusion.UI.Xaml.Charts;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Data;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        // Create chart instance
        SfFunnelChart chart = new SfFunnelChart();
        
        // Create and set ViewModel
        ChartViewModel viewModel = new ChartViewModel();
        chart.DataContext = viewModel;
        
        // Bind ItemsSource to Data property
        chart.SetBinding(
            SfFunnelChart.ItemsSourceProperty,
            new Binding() { Path = new PropertyPath("Data") });
        
        // Configure data binding paths
        chart.XBindingPath = "Category";
        chart.YBindingPath = "Value";
        
        // Set chart properties
        chart.Header = "SALES FUNNEL";
        chart.Height = 400;
        chart.Width = 600;
        
        // Add legend
        chart.Legend = new ChartLegend();
        
        // Enable features
        chart.EnableTooltip = true;
        chart.ShowDataLabels = true;
        
        // Display the chart
        this.Content = chart;
    }
}
```

## Data Binding Configuration

### XBindingPath and YBindingPath

These properties are **required** to map your data model to the chart:

```csharp
chart.XBindingPath = "Category";  // Property for segment labels
chart.YBindingPath = "Value";     // Property for segment values
```

**Important notes:**
- Property names must match exactly (case-sensitive)
- The Y-value property should contain numeric data
- The chart won't display without proper binding paths

### Setting DataContext

**Option 1: XAML DataContext**
```xml
<chart:SfFunnelChart.DataContext>
    <model:ChartViewModel />
</chart:SfFunnelChart.DataContext>
```

**Option 2: Code-behind DataContext**
```csharp
ChartViewModel viewModel = new ChartViewModel();
chart.DataContext = viewModel;
```

## Complete Working Example

Here's a full working example you can copy and adapt:

### MainWindow.xaml
```xml
<Window
    x:Class="FunnelChartDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:FunnelChartDemo">
    
    <Grid>
        <chart:SfFunnelChart x:Name="chart"
                             Header="PRODUCT SALES"
                             EnableTooltip="True"
                             ShowDataLabels="True"
                             Height="388" Width="500"
                             ItemsSource="{Binding Data}"
                             XBindingPath="Category"
                             YBindingPath="Value">
            
            <chart:SfFunnelChart.DataContext>
                <local:ChartViewModel />
            </chart:SfFunnelChart.DataContext>
            
            <chart:SfFunnelChart.Legend>
                <chart:ChartLegend />
            </chart:SfFunnelChart.Legend>
        </chart:SfFunnelChart>
    </Grid>
</Window>
```

### ChartViewModel.cs
```csharp
using System.Collections.Generic;

namespace FunnelChartDemo
{
    public class Model
    {
        public string Category { get; set; }
        public double Value { get; set; }
    }
    
    public class ChartViewModel
    {
        public List<Model> Data { get; set; }
        
        public ChartViewModel()
        {
            Data = new List<Model>()
            {
                new Model() { Category = "Lava", Value = 50 },
                new Model() { Category = "HP", Value = 30 },
                new Model() { Category = "Moto", Value = 60 },
                new Model() { Category = "Sony", Value = 50 },
                new Model() { Category = "LG", Value = 45 }
            };
        }
    }
}
```

## Common Scenarios

### Dynamic Data Updates

Use `ObservableCollection` for real-time updates:

```csharp
using System.Collections.ObjectModel;
using System.ComponentModel;

public class ChartViewModel : INotifyPropertyChanged
{
    public ObservableCollection<Model> Data { get; set; }
    
    public ChartViewModel()
    {
        Data = new ObservableCollection<Model>()
        {
            new Model() { Category = "Stage 1", Value = 100 },
            new Model() { Category = "Stage 2", Value = 75 },
            new Model() { Category = "Stage 3", Value = 50 }
        };
    }
    
    // Add item at runtime
    public void AddStage(string category, double value)
    {
        Data.Add(new Model() { Category = category, Value = value });
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
}
```

### Loading Data from API

```csharp
public async Task<List<Model>> LoadDataAsync()
{
    // Fetch from API
    var response = await httpClient.GetAsync("api/funnel-data");
    var data = await response.Content.ReadAsAsync<List<Model>>();
    return data;
}

// In ViewModel constructor or initialization
public async void Initialize()
{
    Data = await LoadDataAsync();
    OnPropertyChanged(nameof(Data));
}
```

### Multiple Funnels with Different Data

```xml
<StackPanel Orientation="Horizontal">
    <chart:SfFunnelChart ItemsSource="{Binding SalesData}"
                         XBindingPath="Stage"
                         YBindingPath="Value"
                         Header="Sales" />
    
    <chart:SfFunnelChart ItemsSource="{Binding MarketingData}"
                         XBindingPath="Stage"
                         YBindingPath="Value"
                         Header="Marketing" />
</StackPanel>
```

## Troubleshooting

### Chart Not Displaying

**Check these common issues:**

1. **Missing binding paths:**
   ```csharp
   // Must specify both
   chart.XBindingPath = "Category";
   chart.YBindingPath = "Value";
   ```

2. **Incorrect property names:**
   ```csharp
   // Property names must match exactly (case-sensitive)
   chart.XBindingPath = "category";  // ❌ Wrong case
   chart.XBindingPath = "Category";  // ✓ Correct
   ```

3. **No DataContext set:**
   ```xml
   <chart:SfFunnelChart.DataContext>
       <local:ChartViewModel />
   </chart:SfFunnelChart.DataContext>
   ```

4. **Empty or null ItemsSource:**
   ```csharp
   // Ensure Data is initialized
   Data = new List<Model>() { /* items */ };
   ```

### Data Not Updating

Use `ObservableCollection<T>` and implement `INotifyPropertyChanged`:

```csharp
public class ChartViewModel : INotifyPropertyChanged
{
    private ObservableCollection<Model> _data;
    
    public ObservableCollection<Model> Data
    {
        get => _data;
        set
        {
            _data = value;
            OnPropertyChanged(nameof(Data));
        }
    }
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
}
```

## Next Steps

Once you have a basic funnel chart working:

- **Customize appearance** - Apply colors, gradients, and palettes
- **Add data labels** - Configure format, position, and style
- **Configure tooltips** - Customize tooltip content and appearance
- **Enable selection** - Allow users to interact with segments
- **Add legends** - Display segment information with icons
- **Explode segments** - Highlight specific data points

Refer to the other reference files for detailed guidance on each feature.
