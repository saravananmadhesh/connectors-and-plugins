# Advanced Features

## Table of Contents
- [Overview](#overview)
- [Chart Title](#chart-title)
- [Segment Spacing](#segment-spacing)
- [Rendering Modes](#rendering-modes)
- [Performance Optimization](#performance-optimization)
- [Complete Advanced Example](#complete-advanced-example)

---

## Overview

This guide covers advanced pyramid chart features including titles, segment spacing, rendering modes, and performance optimization techniques.

**Advanced Features:**
- Chart titles and headers
- Segment spacing (GapRatio)
- Rendering modes (Surface vs Linear)
- Performance best practices
- Advanced customization scenarios

---

## Chart Title

Add descriptive titles to your pyramid chart using the `Header` property.

### Simple Text Title

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      Header="The Food Comparison Pyramid"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.Header = "The Food Comparison Pyramid";
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

this.Content = chart;
```

### Custom Title with UIElement

You can use any UIElement as the chart header for rich formatting.

**XAML:**
```xml
<chart:SfPyramidChart>
    <chart:SfPyramidChart.Header>
        <Border BorderThickness="2"
                BorderBrush="Navy"
                Background="LightBlue"
                Margin="10"
                CornerRadius="5"
                Padding="10">
            <TextBlock FontSize="18"
                       Text="Annual Sales Report"
                       Foreground="Navy"
                       HorizontalAlignment="Center"/>
        </Border>
    </chart:SfPyramidChart.Header>
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();

Border border = new Border
{
    BorderThickness = new Thickness(2),
    BorderBrush = new SolidColorBrush(Colors.Navy),
    Background = new SolidColorBrush(Colors.LightBlue),
    Margin = new Thickness(10),
    CornerRadius = new CornerRadius(5),
    Padding = new Thickness(10)
};

TextBlock textBlock = new TextBlock
{
    Text = "Annual Sales Report",
    Margin = new Thickness(5),
    FontSize = 18,
    Foreground = new SolidColorBrush(Colors.Navy),
    HorizontalAlignment = HorizontalAlignment.Center
};

border.Child = textBlock;
chart.Header = border;

this.Content = chart;
```

### Title with Multiple Elements

**XAML:**
```xml
<chart:SfPyramidChart.Header>
    <StackPanel Orientation="Vertical" Margin="10">
        <!-- Main Title -->
        <TextBlock Text="Market Analysis 2024"
                   FontSize="20"
                   HorizontalAlignment="Center"
                   Foreground="#2C3E50"/>
        
        <!-- Subtitle -->
        <TextBlock Text="Global Market Share Distribution"
                   FontSize="14"
                   HorizontalAlignment="Center"
                   Foreground="#7F8C8D"
                   Margin="0,5,0,0"/>
        
        <!-- Separator -->
        <Rectangle Height="2"
                   Fill="#3498DB"
                   Margin="0,10,0,0"
                   HorizontalAlignment="Center"
                   Width="300"/>
    </StackPanel>
</chart:SfPyramidChart.Header>
```

### Title Alignment

Control horizontal alignment of the title using `HorizontalHeaderAlignment`.

**XAML:**
```xml
<chart:SfPyramidChart Header="Sales Data"
                      HorizontalHeaderAlignment="Left"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
</chart:SfPyramidChart>
```

**C#:**
```csharp
chart.Header = "Sales Data";
chart.HorizontalHeaderAlignment = HorizontalAlignment.Left;
```

**Alignment Options:**
- **Left:** Title aligned to left edge
- **Center:** Title centered (default)
- **Right:** Title aligned to right edge

---

## Segment Spacing

Create gaps between pyramid segments using the `GapRatio` property to improve visual separation.

### Basic Segment Spacing

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value"
                      GapRatio="0.3">
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.GapRatio = 0.3;

this.Content = chart;
```

### GapRatio Values

| Value | Description | Visual Effect |
|-------|-------------|---------------|
| **0.0** | No spacing (default) | Segments touch each other |
| **0.1** | Minimal spacing | Subtle separation |
| **0.2-0.3** | Moderate spacing | Clear visual separation |
| **0.4-0.5** | Large spacing | Strong emphasis on individuality |
| **0.6+** | Extra large spacing | Segments appear very disconnected |

**Valid Range:** 0.0 to 1.0

### Spacing Examples

**No Spacing:**
```xml
<chart:SfPyramidChart GapRatio="0.0"/>
<!-- Traditional pyramid, all segments connected -->
```

**Subtle Spacing:**
```xml
<chart:SfPyramidChart GapRatio="0.1"/>
<!-- Slight gap for clarity without breaking cohesion -->
```

**Moderate Spacing:**
```xml
<chart:SfPyramidChart GapRatio="0.3"/>
<!-- Clear separation between segments -->
```

**Large Spacing:**
```xml
<chart:SfPyramidChart GapRatio="0.5"/>
<!-- Strong visual separation, segments appear independent -->
```

### When to Use Spacing

**Use spacing (GapRatio > 0) when:**
- You want to emphasize individual segments
- Segments have distinct categories
- Creating modern, clean designs
- Improving readability with many segments

**Avoid spacing (GapRatio = 0) when:**
- Emphasizing the pyramid as a whole
- Traditional pyramid visualization is desired
- Space is limited
- You have fewer segments (<5)

---

## Rendering Modes

The pyramid chart supports two rendering modes that affect how segment sizes are calculated.

### Mode Property

| Mode | Description | Calculation Method |
|------|-------------|-------------------|
| **Linear** | Height based on values (default) | Segment height proportional to data value |
| **Surface** | Area based on values | Segment surface area proportional to data value |

### Linear Mode (Default)

Segments heights are proportional to their values.

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value"
                      Mode="Linear">
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.Mode = ChartPyramidMode.Linear;

this.Content = chart;
```

**Characteristics:**
- **Height-driven:** Each segment's height represents its value
- **Visual consistency:** Easier to compare segment sizes
- **Default choice:** Most intuitive for users
- **Best for:** Most use cases, especially when comparing values

### Surface Mode

Segment surface areas are proportional to their values.

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value"
                      Mode="Surface">
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.Mode = ChartPyramidMode.Surface;

this.Content = chart;
```

**Characteristics:**
- **Area-driven:** Each segment's surface area represents its value
- **Geometric accuracy:** True proportional representation
- **Visual impact:** Larger values appear more dramatically different
- **Best for:** Scientific visualizations, geometric accuracy requirements

### Choosing the Right Mode

| Scenario | Recommended Mode | Reason |
|----------|------------------|--------|
| General business charts | Linear | More intuitive |
| Comparing similar values | Linear | Easier to see differences |
| Scientific data | Surface | Geometric accuracy |
| Large value ranges | Surface | Better visual differentiation |
| Presentations | Linear | Easier for audiences to understand |
| Educational materials | Either | Depends on teaching goal |

---

## Performance Optimization

Optimize pyramid chart performance for large datasets and complex scenarios.

### Data Management

**Limit data points:**
```csharp
// Good: 3-10 segments
public List<Model> GetData()
{
    return data.Take(10).ToList();
}

// Avoid: Too many segments
// Pyramid charts are not suitable for 20+ data points
```

**Use appropriate data types:**
```csharp
public class Model
{
    public string Category { get; set; }
    public double Value { get; set; }  // Use double for numeric values
}
```

### Rendering Optimization

**Minimize complexity:**
```xml
<!-- Simpler charts perform better -->
<chart:SfPyramidChart ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
    <!-- Avoid excessive customization in performance-critical scenarios -->
</chart:SfPyramidChart>
```

**Reduce template complexity:**
```xml
<!-- Simple data labels perform better than complex templates -->
<chart:PyramidDataLabelSettings Foreground="White"
                                FontSize="14"/>
<!-- vs. -->
<chart:PyramidDataLabelSettings ContentTemplate="{StaticResource complexTemplate}"/>
```

### Best Practices

1. **Data binding:**
   - Use `List<T>` for static data
   - Use `ObservableCollection<T>` only when data changes
   - Avoid unnecessary property change notifications

2. **Visual elements:**
   - Limit custom templates to essentials
   - Use solid colors over complex gradients when possible
   - Minimize animation duration for frequently updated charts

3. **Event handlers:**
   - Keep event handlers lightweight
   - Avoid heavy computations in selection/tooltip events
   - Use async operations for data loading

4. **Memory management:**
   - Dispose of charts when no longer needed
   - Unsubscribe from events
   - Clear large data collections

---

## Complete Advanced Example

Here's a comprehensive example combining multiple advanced features:

**XAML:**
```xml
<Window
    x:Class="AdvancedPyramidChart.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts"
    xmlns:local="using:AdvancedPyramidChart">
    
    <Grid Padding="20">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        
        <!-- Control Panel -->
        <StackPanel Grid.Row="0" Orientation="Horizontal" Spacing="10" Margin="0,0,0,20">
            <TextBlock Text="Gap Ratio:" VerticalAlignment="Center"/>
            <Slider x:Name="gapSlider"
                    Minimum="0"
                    Maximum="0.5"
                    Value="0.2"
                    Width="200"
                    ValueChanged="GapSlider_ValueChanged"/>
            
            <TextBlock Text="Mode:" VerticalAlignment="Center" Margin="20,0,0,0"/>
            <ComboBox x:Name="modeComboBox"
                      SelectionChanged="ModeComboBox_SelectionChanged"
                      Width="150">
                <ComboBoxItem Content="Linear" IsSelected="True"/>
                <ComboBoxItem Content="Surface"/>
            </ComboBox>
        </StackPanel>
        
        <!-- Chart -->
        <chart:SfPyramidChart x:Name="chart"
                              Grid.Row="1"
                              Mode="Linear"
                              GapRatio="0.2"
                              ItemsSource="{Binding Data}"
                              XBindingPath="Category"
                              YBindingPath="Value"
                              EnableTooltip="True"
                              ShowDataLabels="True"
                              ExplodeOnTap="True"
                              ExplodeOffset="30">
            
            <!-- Custom Header -->
            <chart:SfPyramidChart.Header>
                <StackPanel Orientation="Vertical" Margin="0,0,0,20">
                    <TextBlock Text="Annual Performance Analysis"
                               FontSize="24"
                               HorizontalAlignment="Center"
                               Foreground="#2C3E50"/>
                    
                    <TextBlock Text="Category Distribution by Value"
                               FontSize="14"
                               FontStyle="Italic"
                               HorizontalAlignment="Center"
                               Foreground="#7F8C8D"
                               Margin="0,5,0,0"/>
                    
                    <Rectangle Height="2"
                               Fill="#3498DB"
                               Margin="0,10,0,0"
                               HorizontalAlignment="Center"
                               Width="400"/>
                </StackPanel>
            </chart:SfPyramidChart.Header>
            
            <!-- DataContext -->
            <chart:SfPyramidChart.DataContext>
                <local:ChartViewModel/>
            </chart:SfPyramidChart.DataContext>
            
            <!-- Legend -->
            <chart:SfPyramidChart.Legend>
                <chart:ChartLegend Placement="Right"
                                   ItemMargin="10"
                                   Background="WhiteSmoke"
                                   BorderBrush="Gray"
                                   BorderThickness="1"
                                   CornerRadius="5"
                                   Padding="10">
                    <chart:ChartLegend.Header>
                        <TextBlock Text="Categories"
                                   Margin="0,0,0,10"/>
                    </chart:ChartLegend.Header>
                </chart:ChartLegend>
            </chart:SfPyramidChart.Legend>
            
            <!-- Data Labels -->
            <chart:SfPyramidChart.DataLabelSettings>
                <chart:PyramidDataLabelSettings Context="Percentage"
                                                Foreground="White"
                                                FontSize="16"
                                                Background="Transparent"/>
            </chart:SfPyramidChart.DataLabelSettings>
            
            <!-- Selection -->
            <chart:SfPyramidChart.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Gold"/>
            </chart:SfPyramidChart.SelectionBehavior>
            
        </chart:SfPyramidChart>
    </Grid>
</Window>
```

**C# Code-Behind:**
```csharp
using Syncfusion.UI.Xaml.Charts;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System.Collections.Generic;

namespace AdvancedPyramidChart
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
        }
        
        private void GapSlider_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
        {
            if (chart != null)
            {
                chart.GapRatio = e.NewValue;
            }
        }
        
        private void ModeComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (chart != null && modeComboBox.SelectedItem != null)
            {
                var selectedItem = (ComboBoxItem)modeComboBox.SelectedItem;
                string mode = selectedItem.Content.ToString();
                
                if (mode == "Linear")
                {
                    chart.Mode = ChartPyramidMode.Linear;
                }
                else if (mode == "Surface")
                {
                    chart.Mode = ChartPyramidMode.Surface;
                }
            }
        }
    }
    
    // Data Model
    public class Model
    {
        public string Category { get; set; }
        public double Value { get; set; }
    }
    
    // View Model
    public class ChartViewModel
    {
        public List<Model> Data { get; set; }
        
        public ChartViewModel()
        {
            Data = new List<Model>
            {
                new Model { Category = "Premium Services", Value = 450 },
                new Model { Category = "Enterprise Solutions", Value = 380 },
                new Model { Category = "Standard Products", Value = 290 },
                new Model { Category = "Basic Offerings", Value = 190 },
                new Model { Category = "Trial Services", Value = 120 }
            };
        }
    }
}
```

This example demonstrates:
- Custom multi-element title with styling
- Dynamic gap ratio control via slider
- Mode switching between Linear and Surface
- Interactive explosion on tap
- Selection highlighting
- Percentage-based data labels
- Styled legend with header
- Tooltip support
- Clean, modern design

---

## Summary

**Advanced Features Checklist:**

- [ ] **Chart Title:** Added descriptive header
- [ ] **Title Alignment:** Configured horizontal alignment
- [ ] **Segment Spacing:** Set appropriate GapRatio
- [ ] **Rendering Mode:** Choose Linear or Surface mode
- [ ] **Performance:** Optimized data and rendering
- [ ] **Combinations:** Integrated multiple features effectively

**Key Takeaways:**
1. Use custom UIElements for rich titles
2. GapRatio (0.0-1.0) controls segment spacing
3. Linear mode (height) is default; Surface mode (area) for geometric accuracy
4. Limit segments to 3-10 for best performance
5. Combine features thoughtfully for maximum impact

---

## Troubleshooting

**Title not showing:**
- Verify Header property is set
- Check that header content is not null
- Ensure header height doesn't exceed chart bounds

**Segment spacing not visible:**
- Verify GapRatio is > 0
- Check that GapRatio is not too large (>0.7)
- Ensure chart has enough height to display gaps

**Mode change not visible:**
- Verify data values have sufficient variation
- Check that chart is fully loaded before changing mode
- Try with different datasets to see the difference

**Performance issues:**
- Reduce number of segments
- Simplify templates and customizations
- Avoid complex gradients
- Check for memory leaks in event handlers
