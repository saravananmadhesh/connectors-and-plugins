# Exploding Segments

## Overview

Exploding segments allows you to visually separate specific segments from the pyramid chart, drawing attention to particular data points. This feature is useful for emphasizing important data or creating interactive visualizations.

**Key Features:**
- Programmatic explosion of specific segments
- Interactive explosion on user click/tap
- Configurable explosion distance
- Smooth animation effects
- Single or multiple segment explosion

---

## Explosion Properties

Control segment explosion using these properties:

| Property | Type | Description |
|----------|------|-------------|
| **ExplodeIndex** | int | Index of the segment to explode (0-based) |
| **ExplodeOffset** | double | Distance the segment moves away from the pyramid |
| **ExplodeOnTap** | bool | Enable/disable explosion when user clicks segment |

---

## Programmatic Explosion

Explode a specific segment by setting the `ExplodeIndex` property.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart"
                      ExplodeIndex="3"
                      ExplodeOffset="30"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

// Explode the segment at index 3
chart.ExplodeIndex = 3;
chart.ExplodeOffset = 30;

this.Content = chart;
```

**Result:** The segment at index 3 (fourth segment, zero-based) will be separated from the pyramid by 30 pixels.

### Index Mapping

Understanding zero-based indexing:

```
Data Points:  ["Sweet treats", "Cheese", "Vegetables", "Fish", "Fruits", "Rice"]
Indexes:      [      0       ,    1    ,      2      ,   3   ,    4    ,   5   ]
                                                        ↑
                                             ExplodeIndex=3 → "Fish" explodes
```

---

## Explosion Distance (ExplodeOffset)

The `ExplodeOffset` property controls how far the segment moves from the pyramid.

### Distance Examples

**Small Offset (Subtle):**
```xml
<chart:SfPyramidChart ExplodeIndex="2" ExplodeOffset="10"/>
<!-- Segment moves 10 pixels away -->
```

**Medium Offset (Noticeable):**
```xml
<chart:SfPyramidChart ExplodeIndex="2" ExplodeOffset="30"/>
<!-- Segment moves 30 pixels away -->
```

**Large Offset (Dramatic):**
```xml
<chart:SfPyramidChart ExplodeIndex="2" ExplodeOffset="60"/>
<!-- Segment moves 60 pixels away -->
```

**Offset Guidelines:**
- **10-20 pixels:** Subtle emphasis, maintains cohesion
- **25-40 pixels:** Clear separation, good for interactive scenarios
- **50+ pixels:** Strong emphasis, use for key data points

---

## Interactive Explosion (ExplodeOnTap)

Enable user-triggered explosion by setting `ExplodeOnTap` to `true`.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart"
                      ExplodeOnTap="True"
                      ExplodeOffset="25"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

// Enable click-to-explode
chart.ExplodeOnTap = true;
chart.ExplodeOffset = 25;

this.Content = chart;
```

**Behavior:**
- Click/tap any segment to explode it
- Click/tap again to collapse it back
- Only one segment can be exploded at a time (when using ExplodeOnTap)
- Smooth animation during explosion and collapse

**When to use:**
- Interactive data exploration
- Presentations where users can highlight specific data
- Touch-friendly applications
- Detail-on-demand scenarios

---

## Complete Examples

### Example 1: Highlight Largest Value

Programmatically explode the segment with the highest value:

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      Header="Quarterly Sales"
                      ExplodeIndex="1"
                      ExplodeOffset="35"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Quarter"
                      YBindingPath="Sales"
                      EnableTooltip="True"
                      ShowDataLabels="True">
    
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend/>
    </chart:SfPyramidChart.Legend>
    
</chart:SfPyramidChart>
```

### Example 2: Interactive Exploration

Enable click-to-explode for user interaction:

```xml
<chart:SfPyramidChart Header="Market Share Analysis"
                      ExplodeOnTap="True"
                      ExplodeOffset="40"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Company"
                      YBindingPath="MarketShare"
                      EnableTooltip="True">
    
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend Placement="Right"/>
    </chart:SfPyramidChart.Legend>
    
</chart:SfPyramidChart>
```

### Example 3: Dynamic Explosion Based on User Input

**XAML:**
```xml
<StackPanel>
    <TextBlock Text="Select segment to explode:" Margin="10"/>
    
    <ComboBox x:Name="segmentComboBox"
              SelectionChanged="SegmentComboBox_SelectionChanged"
              Margin="10"
              Width="200"
              HorizontalAlignment="Left"/>
    
    <chart:SfPyramidChart x:Name="chart"
                          ExplodeOffset="30"
                          ItemsSource="{Binding Data}"
                          XBindingPath="Category"
                          YBindingPath="Value"
                          Margin="10">
    </chart:SfPyramidChart>
</StackPanel>
```

**C#:**
```csharp
public sealed partial class MainWindow : Window
{
    private ChartViewModel _viewModel;
    
    public MainWindow()
    {
        this.InitializeComponent();
        InitializeChart();
    }
    
    private void InitializeChart()
    {
        _viewModel = new ChartViewModel();
        chart.DataContext = _viewModel;
        
        // Populate combo box with segment names
        segmentComboBox.ItemsSource = _viewModel.Data.Select((d, i) => 
            new { Index = i, Name = d.Category }).ToList();
        segmentComboBox.DisplayMemberPath = "Name";
        segmentComboBox.SelectedIndex = 0;
    }
    
    private void SegmentComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (segmentComboBox.SelectedItem != null)
        {
            dynamic selected = segmentComboBox.SelectedItem;
            chart.ExplodeIndex = selected.Index;
        }
    }
}
```

### Example 4: Combine with Selection

Use both explosion and selection for maximum emphasis:

```xml
<chart:SfPyramidChart ExplodeOnTap="True"
                      ExplodeOffset="30"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Product"
                      YBindingPath="Revenue">
    
    <!-- Add selection for additional highlight -->
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Gold"/>
    </chart:SfPyramidChart.SelectionBehavior>
    
</chart:SfPyramidChart>
```

### Example 5: Complete C# Implementation

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
            CreateExplodingPyramidChart();
        }
        
        private void CreateExplodingPyramidChart()
        {
            SfPyramidChart chart = new SfPyramidChart
            {
                Header = "Product Performance",
                ExplodeOnTap = true,
                ExplodeOffset = 35,
                EnableTooltip = true,
                ShowDataLabels = true
            };
            
            // Setup data binding
            ChartViewModel viewModel = new ChartViewModel();
            chart.DataContext = viewModel;
            chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
                new Binding() { Path = new PropertyPath("Data") });
            chart.XBindingPath = "Product";
            chart.YBindingPath = "Sales";
            
            // Add legend
            chart.Legend = new ChartLegend
            {
                Placement = LegendPlacement.Bottom
            };
            
            // Optionally explode a specific segment initially
            chart.ExplodeIndex = 0;  // Explode first segment on load
            
            this.Content = chart;
        }
    }
    
    public class Model
    {
        public string Product { get; set; }
        public double Sales { get; set; }
    }
    
    public class ChartViewModel
    {
        public List<Model> Data { get; set; }
        
        public ChartViewModel()
        {
            Data = new List<Model>
            {
                new Model { Product = "Premium", Sales = 1500 },
                new Model { Product = "Standard", Sales = 2300 },
                new Model { Product = "Basic", Sales = 800 },
                new Model { Product = "Trial", Sales = 450 }
            };
        }
    }
}
```

---

## Use Cases

### 1. Highlighting Key Data

Emphasize the most important segment:

```xml
<!-- Explode the highest value segment -->
<chart:SfPyramidChart ExplodeIndex="0" ExplodeOffset="40"/>
```

**Scenarios:**
- Top performer in sales data
- Largest market share holder
- Primary focus area in presentations

### 2. Interactive Data Exploration

Let users explore data at their own pace:

```xml
<chart:SfPyramidChart ExplodeOnTap="True" ExplodeOffset="30"/>
```

**Scenarios:**
- Dashboard applications
- Data analysis tools
- Educational visualizations
- Kiosk displays

### 3. Storytelling in Presentations

Guide attention during presentations:

```csharp
// Change ExplodeIndex programmatically during presentation
private void NextSlide()
{
    chart.ExplodeIndex = currentSlideIndex;
    currentSlideIndex++;
}
```

**Scenarios:**
- Step-by-step data reveals
- Comparative analysis presentations
- Training materials

### 4. Filtering and Detail Views

Combine with other interactions:

```xml
<chart:SfPyramidChart ExplodeOnTap="True">
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Single"/>
    </chart:SfPyramidChart.SelectionBehavior>
</chart:SfPyramidChart>
```

**Scenarios:**
- Master-detail views
- Filtered data displays
- Drill-down interfaces

---

## Best Practices

### Explosion Distance Guidelines

| Chart Size | Recommended ExplodeOffset |
|------------|---------------------------|
| Small (< 300px) | 10-20 pixels |
| Medium (300-600px) | 25-40 pixels |
| Large (> 600px) | 40-60 pixels |

### When to Use Explosion

**✓ Use explosion when:**
- Highlighting key insights
- Creating interactive charts
- Drawing attention to specific data
- Presenting step-by-step analysis
- Building engaging visualizations

**✗ Avoid explosion when:**
- All segments are equally important
- Space is very limited
- Chart has many segments (>8)
- Printing static reports

### Design Tips

1. **Consistent offset:** Use the same ExplodeOffset throughout your application
2. **Combine with tooltips:** Provide additional info for exploded segments
3. **Animation consideration:** Explosion includes smooth animation by default
4. **Accessibility:** Ensure exploded segments are still accessible via keyboard
5. **Mobile-friendly:** Test tap interactions on touch devices

### Common Patterns

**Subtle Highlight:**
```xml
<chart:SfPyramidChart ExplodeIndex="0" ExplodeOffset="15"/>
```

**Interactive Exploration:**
```xml
<chart:SfPyramidChart ExplodeOnTap="True" ExplodeOffset="30"/>
```

**Dramatic Emphasis:**
```xml
<chart:SfPyramidChart ExplodeIndex="0" ExplodeOffset="60"/>
```

---

## Advanced Scenarios

### Programmatic Control with Buttons

**XAML:**
```xml
<StackPanel>
    <StackPanel Orientation="Horizontal" Margin="10">
        <Button Content="Explode First" Click="ExplodeFirst_Click" Margin="5"/>
        <Button Content="Explode Second" Click="ExplodeSecond_Click" Margin="5"/>
        <Button Content="Collapse All" Click="CollapseAll_Click" Margin="5"/>
    </StackPanel>
    
    <chart:SfPyramidChart x:Name="chart"
                          ExplodeOffset="35"
                          ItemsSource="{Binding Data}"
                          XBindingPath="Category"
                          YBindingPath="Value"/>
</StackPanel>
```

**C#:**
```csharp
private void ExplodeFirst_Click(object sender, RoutedEventArgs e)
{
    chart.ExplodeIndex = 0;
}

private void ExplodeSecond_Click(object sender, RoutedEventArgs e)
{
    chart.ExplodeIndex = 1;
}

private void CollapseAll_Click(object sender, RoutedEventArgs e)
{
    chart.ExplodeIndex = -1;  // -1 collapses all segments
}
```

### Animated Sequence

Cycle through segments automatically:

```csharp
private DispatcherTimer _timer;
private int _currentExplodeIndex = 0;

private void StartAutoExplode()
{
    _timer = new DispatcherTimer();
    _timer.Interval = TimeSpan.FromSeconds(2);
    _timer.Tick += Timer_Tick;
    _timer.Start();
}

private void Timer_Tick(object sender, object e)
{
    chart.ExplodeIndex = _currentExplodeIndex;
    _currentExplodeIndex = (_currentExplodeIndex + 1) % chart.ItemsSource.Count;
}
```

---

## Troubleshooting

**Segment not exploding:**
- Verify `ExplodeIndex` is within valid range (0 to segment count - 1)
- Check that `ExplodeOffset` is greater than 0
- Ensure data is loaded before setting ExplodeIndex

**ExplodeOnTap not working:**
- Confirm `ExplodeOnTap="True"` is set
- Check that segments are not covered by other UI elements
- Verify mouse/touch events are not being intercepted

**Explosion too subtle:**
- Increase `ExplodeOffset` value
- Check chart size (small charts need larger offsets)
- Ensure adequate spacing around chart

**Multiple segments exploding:**
- Only one segment can be exploded at a time
- Setting a new ExplodeIndex collapses the previously exploded segment
- Use ExplodeIndex = -1 to collapse all

**Animation issues:**
- Explosion animation is automatic and cannot be disabled
- Smooth animation requires adequate rendering performance
- Check for performance bottlenecks in the application
