# Basic Series Types

## Table of Contents
- [Overview](#overview)
- [ColumnSeries](#columnseries)
- [BarSeries](#barseries)
- [LineSeries](#lineseries)
- [AreaSeries](#areaseries)
- [Common Properties](#common-properties)
- [When to Use Each Type](#when-to-use-each-type)

## Overview

Basic series types are the foundation of data visualization in Cartesian charts. They represent data in straightforward, universally understood formats suitable for most business and analytical needs.

**Available Basic Series:**
- **ColumnSeries** - Vertical rectangular bars
- **BarSeries** - Horizontal rectangular bars  
- **LineSeries** - Connected points with lines
- **AreaSeries** - Filled regions below lines

All basic series share common properties like ItemsSource, XBindingPath, YBindingPath, and support data binding to collections.

## ColumnSeries

Displays data as vertical rectangles where height represents the value. Ideal for comparing discrete categories.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries ItemsSource="{Binding SalesData}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ColumnSeries series = new ColumnSeries();
series.ItemsSource = viewModel.SalesData;
series.XBindingPath = "Product";
series.YBindingPath = "Sales";
chart.Series.Add(series);
```

### Segment Spacing

Control spacing between columns:

```xaml
<chart:ColumnSeries SegmentSpacing="0.3" 
                   ItemsSource="{Binding Data}"
                   XBindingPath="Category"
                   YBindingPath="Value"/>
```

- **SegmentSpacing** ranges from 0 to 1
- 0 = no spacing (columns touch)
- 1 = maximum spacing (100% of available space)
- Default = 0

### Styling

Customize column appearance using `Fill` property:

**XAML:**
```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Product"
                   YBindingPath="Sales"
                   Fill="DodgerBlue"/>
```

**C#:**
```csharp
ColumnSeries series = new ColumnSeries();
series.ItemsSource = viewModel.Data;
series.XBindingPath = "Product";
series.YBindingPath = "Sales";
series.Fill = new SolidColorBrush(Colors.DodgerBlue);
```

**Using PaletteBrushes for Multiple Colors:**

When you want different colors for each data point:

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <BrushCollection x:Key="columnBrushes">
            <SolidColorBrush Color="DodgerBlue"/>
            <SolidColorBrush Color="MediumSeaGreen"/>
            <SolidColorBrush Color="Coral"/>
        </BrushCollection>
    </chart:SfCartesianChart.Resources>
    
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"
                       PaletteBrushes="{StaticResource columnBrushes}"/>
</chart:SfCartesianChart>
```

### When to Use ColumnSeries

✅ **Best for:** Comparing values across categories, discrete data points, time-period comparisons  
❌ **Avoid when:** Data is continuous (use LineSeries), too many categories

## BarSeries

Displays data as horizontal rectangles. Created by transposing the chart axes.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart IsTransposed="True">
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Country"
                       YBindingPath="Population"/>
    
</chart:SfCartesianChart>
```

**Key Point:** Use **ColumnSeries** with **IsTransposed="True"** on the chart to create bar charts.

### When to Use BarSeries

✅ **Best for:** Long category labels, ranking, progress indicators  
❌ **Avoid when:** Time-series data (columns are more intuitive)

## LineSeries

Connects data points with straight lines, showing trends and changes over time.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis>
            <chart:DateTimeAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="MMM"/>
            </chart:DateTimeAxis.LabelStyle>
        </chart:DateTimeAxis>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries ItemsSource="{Binding TemperatureData}"
                     XBindingPath="Date"
                     YBindingPath="Temperature"/>
    
</chart:SfCartesianChart>
```

### Line Styling

LineSeries supports dashed line patterns using `StrokeDashArray`:

**XAML:**
```xaml
<chart:LineSeries ItemsSource="{Binding Data}"
                 XBindingPath="Month"
                 YBindingPath="Sales"
                 StrokeDashArray="5,3"/>
```

**C#:**
```csharp
LineSeries series = new LineSeries();
series.ItemsSource = viewModel.Data;
series.XBindingPath = "Month";
series.YBindingPath = "Sales";

// Create dashed line pattern
DoubleCollection dashArray = new DoubleCollection();
dashArray.Add(5); // Dash length
dashArray.Add(3); // Gap length
series.StrokeDashArray = dashArray;
```

**Common Dash Patterns:**
- `"5,3"` - Dashed line
- `"1,2"` - Dotted line
- `"8,3,2,3"` - Dash-dot pattern
- `null` or `"1,0"` - Solid line (default)

**Color Customization:**

Use chart-level or series-level `PaletteBrushes` to set line colors:

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.PaletteBrushes>
        <SolidColorBrush Color="Green"/>
        <SolidColorBrush Color="Blue"/>
    </chart:SfCartesianChart.PaletteBrushes>
    
    <chart:LineSeries ItemsSource="{Binding Data}"
                     XBindingPath="Month"
                     YBindingPath="Sales"/>
</chart:SfCartesianChart>
```

### When to Use LineSeries

✅ **Best for:** Time-series data, continuous data, showing trends  
❌ **Avoid when:** Discrete categorical comparisons, emphasizing individual values

## AreaSeries

Similar to LineSeries but fills the area below the line, emphasizing magnitude.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:AreaSeries ItemsSource="{Binding Data}"
                     XBindingPath="Month"
                     YBindingPath="Revenue"
                     Fill="LightBlue"
                     Opacity="0.7"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
AreaSeries series = new AreaSeries();
series.ItemsSource = viewModel.Data;
series.XBindingPath = "Month";
series.YBindingPath = "Revenue";
series.Fill = new SolidColorBrush(Colors.LightBlue);
series.Opacity = 0.7;
chart.Series.Add(series);
```

**Using PaletteBrushes for Multiple Colors:**

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <BrushCollection x:Key="areaBrushes">
            <SolidColorBrush Color="LightBlue"/>
            <SolidColorBrush Color="LightGreen"/>
        </BrushCollection>
    </chart:SfCartesianChart.Resources>
    
    <chart:AreaSeries ItemsSource="{Binding Data}"
                     XBindingPath="Month"
                     YBindingPath="Revenue"
                     PaletteBrushes="{StaticResource areaBrushes}"
                     Opacity="0.7"/>
</chart:SfCartesianChart>
```

### When to Use AreaSeries

✅ **Best for:** Emphasizing magnitude of change, cumulative data  
❌ **Avoid when:** Multiple overlapping series, precise value reading critical

## Common Properties

All basic series share these fundamental properties:

### Data Binding

```xaml
<chart:ColumnSeries ItemsSource="{Binding DataList}"
                   XBindingPath="Category"
                   YBindingPath="Value"
                   Label="Series Name"
                   ShowDataLabels="True"
                   EnableTooltip="True"
                   EnableAnimation="True"/>
```

**Properties:**
- **ItemsSource** - The data collection
- **XBindingPath** - Property name for X values
- **YBindingPath** - Property name for Y values
- **Label** - Series name (appears in legend)
- **ShowDataLabels** - Display values on data points
- **EnableTooltip** - Show tooltip on hover
- **EnableAnimation** - Animate series on load
- **IsSeriesVisible** - Show/hide series

## When to Use Each Type

### Decision Flow

1. **Compare discrete categories** → ColumnSeries or BarSeries
2. **Show trends over time** → LineSeries or AreaSeries
3. **Emphasize change magnitude** → AreaSeries
4. **Ranking or ordered comparison** → BarSeries

### Comparison Table

| Series Type | Primary Use | Best Axis Types |
|-------------|-------------|-----------------|
| **ColumnSeries** | Category comparison | CategoryAxis (X), NumericalAxis (Y) |
| **BarSeries** | Ranking, long labels | CategoryAxis (X), NumericalAxis (Y) |
| **LineSeries** | Trends, time-series | DateTimeAxis (X), NumericalAxis (Y) |
| **AreaSeries** | Magnitude over time | DateTimeAxis/CategoryAxis (X), NumericalAxis (Y) |

## Best Practices

### ColumnSeries
- Use SegmentSpacing=0.2 to 0.3 for better visual separation
- Limit to 10-15 categories to avoid crowding

### BarSeries
- Best for 5-20 items
- Sort data by value for easier comparison

### LineSeries
- Limit to 3-5 lines per chart
- Use distinct colors and line styles

### AreaSeries
- Set opacity to 0.5-0.7 when overlapping
- Use gradient fills for professional appearance

## Troubleshooting

**Series not visible:**
- Check ItemsSource has data
- Verify XBindingPath and YBindingPath match property names (case-sensitive)

**Columns too thin:**
- Increase Width property (0.8 to 1.0)
- Decrease SegmentSpacing

**Lines not smooth:**
- LineSeries connects points with straight lines
- Use SplineSeries for curved lines
