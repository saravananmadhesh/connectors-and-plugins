# Polar Chart Series Types

Comprehensive guide to the two series types available in Syncfusion WinUI Polar Chart: PolarLineSeries and PolarAreaSeries, including grid line types and path configurations.

## Table of Contents
- [Overview](#overview)
- [Polar Line Series](#polar-line-series)
- [Polar Area Series](#polar-area-series)
- [Grid Line Types](#grid-line-types)
- [Closing Path Configuration](#closing-path-configuration)
- [Multiple Series](#multiple-series)
- [Series Customization](#series-customization)
- [Choosing the Right Series Type](#choosing-the-right-series-type)

## Overview

The SfPolarChart supports two main series types for visualizing data:

1. **PolarLineSeries** - Connects data points with lines in a polar coordinate system
2. **PolarAreaSeries** - Fills the area enclosed by data points in polar coordinates

Both series types share common properties and behaviors but differ in visual representation and use cases.

## Polar Line Series

The PolarLineSeries displays data as connected points around a polar axis, creating a line chart in polar coordinates.

### Basic Implementation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
    
    <chart:SfPolarChart.Series>
        <chart:PolarLineSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Tree"
                               Label="Tree Data"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code-Behind:**
```csharp
SfPolarChart chart = new SfPolarChart();

// Configure axes
chart.PrimaryAxis = new CategoryAxis();
chart.SecondaryAxis = new NumericalAxis();

// Create line series
PolarLineSeries series = new PolarLineSeries();
series.XBindingPath = "Direction";
series.YBindingPath = "Tree";
series.Label = "Tree Data";
series.ItemsSource = viewModel.PlantDetails;

chart.Series.Add(series);
```

### When to Use Polar Line Series

**Best for:**
- Showing trends and patterns in circular data
- Comparing multiple datasets without visual overlap
- Emphasizing data point connections
- Scientific or technical visualizations where precision is key

**Examples:**
- Temperature variations by compass direction
- Wind speed measurements
- Antenna radiation patterns
- Performance metrics over categories

### Line Styling

Customize the line appearance:

```xml
<chart:PolarLineSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       Stroke="Blue"
                       StrokeWidth="3"
                       StrokeDashArray="5,2"/>
```

**Properties:**
- `Stroke` - Line color (Brush)
- `StrokeWidth` - Line width (double)
- `StrokeDashArray` - Dash pattern for dashed lines

## Polar Area Series

The PolarAreaSeries displays data as a filled area in polar coordinates, emphasizing the magnitude of values.

### Basic Implementation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
    
    <chart:SfPolarChart.Series>
        <chart:PolarAreaSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Tree"
                               Label="Tree Coverage"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code-Behind:**
```csharp
SfPolarChart chart = new SfPolarChart();

// Configure axes
chart.PrimaryAxis = new CategoryAxis();
chart.SecondaryAxis = new NumericalAxis();

// Create area series
PolarAreaSeries series = new PolarAreaSeries();
series.XBindingPath = "Direction";
series.YBindingPath = "Tree";
series.Label = "Tree Coverage";
series.ItemsSource = viewModel.PlantDetails;

chart.Series.Add(series);
```

### When to Use Polar Area Series

**Best for:**
- Emphasizing magnitude and coverage
- Visualizing "footprint" or "coverage area"
- Showing dominance or strength in different directions
- Creating visually impactful charts for presentations

**Examples:**
- Market share by region
- Skill assessments (spider/radar charts)
- Coverage areas (signal strength, light distribution)
- Resource allocation across categories

### Area Styling

Customize the fill and stroke:

```xml
<chart:PolarAreaSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       Fill="#80FF6347"
                       Stroke="Red"
                       StrokeWidth="2"/>
```

**Properties:**
- `Fill` - Fill color (Brush) - use alpha channel for transparency
- `Stroke` - Border line color
- `StrokeWidth` - Border line width

## Grid Line Types

The GridLineType property controls how axis grid lines are rendered, dramatically changing the chart's appearance.

### Circle Grid Lines (Default)

Circular grid lines create a traditional polar chart appearance with concentric circles.

**XAML:**
```xml
<chart:SfPolarChart GridLineType="Circle">
    <chart:SfPolarChart.Series>
        <chart:PolarLineSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.GridLineType = PolarChartGridLineType.Circle;
```

**Use Circle for:**
- Continuous data with smooth transitions
- Scientific measurements
- Data without distinct categories
- Elegant, modern appearance

### Polygon Grid Lines (Radar/Spider Chart)

Polygon grid lines create a radar chart (spider chart/web chart) appearance with straight lines connecting axis points.

**XAML:**
```xml
<chart:SfPolarChart GridLineType="Polygon">
    <chart:SfPolarChart.Series>
        <chart:PolarLineSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.GridLineType = PolarChartGridLineType.Polygon;
```

**Use Polygon for:**
- Categorical data with distinct categories
- Classic radar/spider chart look
- Skills assessment and comparison charts
- Sports analytics
- Quality metrics

### Comparison Example

```xml
<!-- Side-by-side comparison -->
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition/>
        <ColumnDefinition/>
    </Grid.ColumnDefinitions>
    
    <!-- Circle Grid -->
    <chart:SfPolarChart Grid.Column="0" 
                        Header="Circle Grid"
                        GridLineType="Circle">
        <chart:PolarLineSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"/>
    </chart:SfPolarChart>
    
    <!-- Polygon Grid -->
    <chart:SfPolarChart Grid.Column="1" 
                        Header="Polygon Grid (Radar)"
                        GridLineType="Polygon">
        <chart:PolarLineSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"/>
    </chart:SfPolarChart>
</Grid>
```

## Closing Path Configuration

The IsClosed property determines whether the series forms a closed loop by connecting the last point back to the first.

### Closed Path (Default)

By default, IsClosed is `true`, creating a complete loop.

**XAML:**
```xml
<chart:PolarLineSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       IsClosed="True"/>
```

**Use Case:** Most polar/radar charts where you want a complete shape.

### Open Path

Set IsClosed to `false` to leave the path open between the last and first points.

**XAML:**
```xml
<chart:SfPolarChart GridLineType="Polygon">
    <chart:SfPolarChart.Series>
        <chart:PolarLineSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"
                               IsClosed="False"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
PolarLineSeries series = new PolarLineSeries();
series.IsClosed = false;
series.XBindingPath = "Category";
series.YBindingPath = "Value";
series.ItemsSource = data;
```

**Use Case:** 
- Partial data sets (e.g., data for only some directions)
- Emphasizing the gap between start and end
- Specialized visualizations

### Example: Comparing Closed vs Open

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition/>
        <RowDefinition/>
    </Grid.RowDefinitions>
    
    <!-- Closed Path -->
    <chart:SfPolarChart Grid.Row="0" 
                        Header="Closed Path (Complete Loop)"
                        GridLineType="Polygon">
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"
                               IsClosed="True"/>
    </chart:SfPolarChart>
    
    <!-- Open Path -->
    <chart:SfPolarChart Grid.Row="1" 
                        Header="Open Path (Gap)"
                        GridLineType="Polygon">
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"
                               IsClosed="False"/>
    </chart:SfPolarChart>
</Grid>
```

## Multiple Series

Display multiple data series on the same polar chart for comparison.

### Basic Multiple Series

**XAML:**
```xml
<chart:SfPolarChart Header="Plant Distribution Comparison" 
                    GridLineType="Polygon">
    
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend/>
    </chart:SfPolarChart.Legend>
    
    <chart:SfPolarChart.Series>
        <!-- First Series -->
        <chart:PolarLineSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Tree"
                               Label="Tree"/>
        
        <!-- Second Series -->
        <chart:PolarLineSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Weed"
                               Label="Weed"/>
        
        <!-- Third Series -->
        <chart:PolarLineSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Flower"
                               Label="Flower"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

### Mixing Series Types

You can combine line and area series:

```xml
<chart:SfPolarChart.Series>
    <!-- Area series as background -->
    <chart:PolarAreaSeries ItemsSource="{Binding BaselineData}"
                           XBindingPath="Category"
                           YBindingPath="Value"
                           Label="Baseline"
                           Fill="#40808080"/>
    
    <!-- Line series on top -->
    <chart:PolarLineSeries ItemsSource="{Binding CurrentData}"
                           XBindingPath="Category"
                           YBindingPath="Value"
                           Label="Current"
                           Stroke="Red"
                           StrokeWidth="3"/>
</chart:SfPolarChart.Series>
```

### C# Multiple Series

```csharp
SfPolarChart chart = new SfPolarChart();
chart.Header = "Multi-Series Comparison";
chart.GridLineType = PolarChartGridLineType.Polygon;
chart.Legend = new ChartLegend();

// Series 1
PolarLineSeries series1 = new PolarLineSeries
{
    XBindingPath = "Direction",
    YBindingPath = "Tree",
    Label = "Tree",
    ItemsSource = viewModel.PlantDetails
};

// Series 2
PolarLineSeries series2 = new PolarLineSeries
{
    XBindingPath = "Direction",
    YBindingPath = "Weed",
    Label = "Weed",
    ItemsSource = viewModel.PlantDetails
};

// Series 3
PolarLineSeries series3 = new PolarLineSeries
{
    XBindingPath = "Direction",
    YBindingPath = "Flower",
    Label = "Flower",
    ItemsSource = viewModel.PlantDetails
};

chart.Series.Add(series1);
chart.Series.Add(series2);
chart.Series.Add(series3);
```

### Best Practices for Multiple Series

1. **Limit series count:** 3-5 series maximum for readability
2. **Use distinct colors:** Ensure series are easily distinguishable
3. **Add a legend:** Always include a legend for multiple series
4. **Consider opacity:** Use semi-transparent fills for overlapping area series
5. **Choose line for many series:** Line series work better than area for 4+ series

## Series Customization

### Color Customization

**Individual Series Colors:**
```xml
<chart:PolarAreaSeries Fill="Red" Stroke="DarkRed" StrokeWidth="2"/>
<chart:PolarLineSeries Stroke="Blue" StrokeWidth="3"/>
```

**Using Chart Palette:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Resources>
        <BrushCollection x:Key="customColors">
            <SolidColorBrush Color="#FF6347"/>
            <SolidColorBrush Color="#4682B4"/>
            <SolidColorBrush Color="#32CD32"/>
        </BrushCollection>
    </chart:SfPolarChart.Resources>
    
    <chart:SfPolarChart PaletteBrushes="{StaticResource customColors}">
        <!-- Series will use colors from palette -->
    </chart:SfPolarChart>
</chart:SfPolarChart>
```

### Animation

Series support smooth entry animations:

```xml
<chart:PolarLineSeries EnableAnimation="True" 
                       AnimationDuration="00:00:01"/>
```

## Choosing the Right Series Type

### Decision Matrix

| Requirement | Line Series | Area Series |
|-------------|-------------|-------------|
| Show trends/patterns | ✓ Excellent | ○ Good |
| Emphasize magnitude | ○ Fair | ✓ Excellent |
| Multiple overlapping series | ✓ Best choice | ○ Use transparency |
| Precise value reading | ✓ Clear | ○ Less clear |
| Visual impact | ○ Moderate | ✓ High |
| Comparing 4+ series | ✓ Recommended | ✗ Not recommended |
| Scientific/technical data | ✓ Preferred | ○ Optional |
| Business presentations | ○ Good | ✓ Better |

### Common Scenarios

**Scenario 1: Skills Assessment (Radar Chart)**
```xml
<!-- Use Area with Polygon grid for classic radar chart -->
<chart:SfPolarChart GridLineType="Polygon">
    <chart:PolarAreaSeries ItemsSource="{Binding Skills}"
                           XBindingPath="SkillName"
                           YBindingPath="Rating"
                           Fill="#8000BFFF"/>
</chart:SfPolarChart>
```

**Scenario 2: Comparative Analysis**
```xml
<!-- Use Line series for multiple comparisons -->
<chart:SfPolarChart GridLineType="Polygon">
    <chart:PolarLineSeries ItemsSource="{Binding ProductA}" Label="Product A"/>
    <chart:PolarLineSeries ItemsSource="{Binding ProductB}" Label="Product B"/>
    <chart:PolarLineSeries ItemsSource="{Binding ProductC}" Label="Product C"/>
</chart:SfPolarChart>
```

**Scenario 3: Coverage Visualization**
```xml
<!-- Use Area with Circle grid for smooth coverage -->
<chart:SfPolarChart GridLineType="Circle">
    <chart:PolarAreaSeries ItemsSource="{Binding Coverage}"
                           XBindingPath="Direction"
                           YBindingPath="Strength"
                           Fill="#6032CD32"/>
</chart:SfPolarChart>
```

## Summary

**Key Takeaways:**
- **PolarLineSeries:** Best for trends, multiple series, and precise comparisons
- **PolarAreaSeries:** Best for magnitude emphasis and visual impact
- **Circle GridLineType:** Smooth, continuous data representation
- **Polygon GridLineType:** Classic radar/spider chart for categorical data
- **IsClosed:** Usually true for complete loops, false for partial data
- **Multiple Series:** Combine effectively with legends and proper color choices

Experiment with different combinations to find the best visualization for your data!
