# Fast Series Types in Cartesian Charts

## Table of Contents
- [Overview](#overview)
- [FastLineSeries](#fastlineseries)
- [FastLineBitmapSeries](#fastlinebitmapseries)
- [FastColumnBitmapSeries](#fastcolumnbitmapseries)
- [FastScatterBitmapSeries](#fastscatterbitmapseries)
- [FastStepLineBitmapSeries](#faststeplinebitmapseries)
- [Performance Comparison](#performance-comparison)
- [Anti-Aliasing](#anti-aliasing)
- [When to Use Fast Series](#when-to-use-fast-series)
- [Best Practices](#best-practices)
- [Troubleshooting Tips](#troubleshooting-tips)

## Overview

Fast series in Syncfusion WinUI Cartesian Charts are optimized for rendering large datasets with millions of data points. They provide high-performance visualization by using efficient rendering techniques like polyline segments and WriteableBitmap.

**Key Features:**
- Handle millions of data points efficiently
- Render in fractions of a second
- Two rendering approaches: Polyline and Bitmap
- Anti-aliasing support for bitmap series
- Minimal memory footprint
- Suitable for real-time data visualization

**Series Types:**
- **FastLineSeries** - Polyline-based line rendering
- **FastLineBitmapSeries** - Bitmap-based line rendering
- **FastColumnBitmapSeries** - Bitmap-based column rendering
- **FastScatterBitmapSeries** - Bitmap-based scatter rendering
- **FastStepLineBitmapSeries** - Bitmap-based step line rendering

## FastLineSeries

FastLineSeries renders line charts using polyline segments, providing excellent performance for large datasets while maintaining smooth lines.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>

    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis />
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:SfCartesianChart.Series>
        <chart:FastLineSeries ItemsSource="{Binding Data}" 
                             XBindingPath="Time" 
                             YBindingPath="Value"/>
    </chart:SfCartesianChart.Series>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

DateTimeAxis xAxis = new DateTimeAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

FastLineSeries series = new FastLineSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Time",
    YBindingPath = "Value"
};

chart.Series.Add(series);
this.Content = chart;
```

### Data Model for Fast Series

```csharp
public class TimeSeriesData
{
    public DateTime Time { get; set; }
    public double Value { get; set; }
}

public class ViewModel
{
    public ObservableCollection<TimeSeriesData> Data { get; set; }
    
    public ViewModel()
    {
        Data = new ObservableCollection<TimeSeriesData>();
        GenerateLargeDataset();
    }
    
    private void GenerateLargeDataset()
    {
        Random random = new Random();
        DateTime startTime = DateTime.Now;
        
        // Generate 100,000 data points
        for (int i = 0; i < 100000; i++)
        {
            Data.Add(new TimeSeriesData
            {
                Time = startTime.AddSeconds(i),
                Value = random.NextDouble() * 100
            });
        }
    }
}
```

### Styling FastLineSeries

**XAML:**
```xaml
<chart:FastLineSeries ItemsSource="{Binding Data}" 
                     XBindingPath="Time" 
                     YBindingPath="Value"
                     Fill="Blue"
                     StrokeWidth="2"/>
```

### When to Use FastLineSeries

- Real-time data monitoring (stock tickers, sensors)
- Scientific simulations with continuous data
- Signal processing visualization
- Any line chart with > 10,000 data points
- When smooth lines are more important than features like markers

## FastLineBitmapSeries

FastLineBitmapSeries renders lines using WriteableBitmap, providing the highest performance for extremely large datasets (millions of points).

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>

    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis />
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:SfCartesianChart.Series>
        <chart:FastLineBitmapSeries ItemsSource="{Binding Data}" 
                                   XBindingPath="Time" 
                                   YBindingPath="Value"/>
    </chart:SfCartesianChart.Series>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

DateTimeAxis xAxis = new DateTimeAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

FastLineBitmapSeries series = new FastLineBitmapSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Time",
    YBindingPath = "Value"
};

chart.Series.Add(series);
this.Content = chart;
```

### Styling FastLineBitmapSeries

**XAML:**
```xaml
<chart:FastLineBitmapSeries ItemsSource="{Binding Data}" 
                           XBindingPath="Time" 
                           YBindingPath="Value"
                           Fill="Red"
                           StrokeWidth="1"/>
```

### When to Use FastLineBitmapSeries

- Datasets with > 100,000 data points
- Real-time high-frequency data (millisecond intervals)
- Scientific instruments and oscilloscopes
- Financial tick data visualization
- IoT sensor data streams
- When maximum performance is critical

## FastColumnBitmapSeries

FastColumnBitmapSeries renders column charts using bitmap technology, optimized for large numbers of columns.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>

    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis />
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:SfCartesianChart.Series>
        <chart:FastColumnBitmapSeries ItemsSource="{Binding Data}" 
                                     XBindingPath="Category" 
                                     YBindingPath="Value"/>
    </chart:SfCartesianChart.Series>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

FastColumnBitmapSeries series = new FastColumnBitmapSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Category",
    YBindingPath = "Value"
};

chart.Series.Add(series);
this.Content = chart;
```

### Styling FastColumnBitmapSeries

**XAML:**
```xaml
<chart:FastColumnBitmapSeries ItemsSource="{Binding Data}" 
                             XBindingPath="Category" 
                             YBindingPath="Value"
                             Fill="Green"
                             Stroke="DarkGreen"
                             StrokeWidth="1"/>
```

### When to Use FastColumnBitmapSeries

- Histograms with thousands of bins
- Frequency distributions with large datasets
- Audio waveform visualization
- Signal strength analysis over many frequency bands
- Any column chart with > 1,000 columns

## FastScatterBitmapSeries

FastScatterBitmapSeries renders scatter plots using bitmap technology, handling millions of scatter points efficiently.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>

    <chart:SfCartesianChart.XAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:SfCartesianChart.Series>
        <chart:FastScatterBitmapSeries ItemsSource="{Binding Data}" 
                                      XBindingPath="XValue" 
                                      YBindingPath="YValue"/>
    </chart:SfCartesianChart.Series>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

NumericalAxis xAxis = new NumericalAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

FastScatterBitmapSeries series = new FastScatterBitmapSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "XValue",
    YBindingPath = "YValue"
};

chart.Series.Add(series);
this.Content = chart;
```

### Styling FastScatterBitmapSeries

**XAML:**
```xaml
<chart:FastScatterBitmapSeries ItemsSource="{Binding Data}" 
                              XBindingPath="XValue" 
                              YBindingPath="YValue"
                              Fill="Purple"
                              Stroke="DarkPurple"
                              StrokeWidth="1"/>
```

### When to Use FastScatterBitmapSeries

- Large-scale correlation analysis (> 10,000 points)
- Scientific research with massive datasets
- Particle simulation visualization
- Genomic data plotting
- Big data analytics visualization
- Heat map underlying data

## FastStepLineBitmapSeries

FastStepLineBitmapSeries renders step line charts using bitmap technology, ideal for digital signal visualization.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>

    <chart:SfCartesianChart.XAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:SfCartesianChart.Series>
        <chart:FastStepLineBitmapSeries ItemsSource="{Binding Data}" 
                                       XBindingPath="Time" 
                                       YBindingPath="Signal"/>
    </chart:SfCartesianChart.Series>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

NumericalAxis xAxis = new NumericalAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

FastStepLineBitmapSeries series = new FastStepLineBitmapSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Time",
    YBindingPath = "Signal"
};

chart.Series.Add(series);
this.Content = chart;
```

### When to Use FastStepLineBitmapSeries

- Digital signal processing
- State machine transitions over time
- Boolean signal visualization
- PWM (Pulse Width Modulation) signals
- Any step-wise changes with many transitions

## Performance Comparison

### Rendering Performance

| Series Type | Data Points | Render Time | Use Case |
|-------------|-------------|-------------|----------|
| **Regular LineSeries** | 1,000 | < 100ms | Small datasets, needs features |
| **Regular LineSeries** | 10,000 | 500ms - 1s | Medium datasets |
| **FastLineSeries** | 10,000 | < 100ms | Large continuous datasets |
| **FastLineSeries** | 100,000 | 300ms - 500ms | Very large datasets |
| **FastLineBitmapSeries** | 100,000 | < 100ms | Massive datasets |
| **FastLineBitmapSeries** | 1,000,000 | 200ms - 400ms | Extreme performance needs |

### Memory Footprint

```
Regular Series:
- Memory per point: ~50-100 bytes
- 100,000 points: ~5-10 MB

Fast Series (Polyline):
- Memory per point: ~20-40 bytes  
- 100,000 points: ~2-4 MB

Fast Bitmap Series:
- Memory per point: ~10-20 bytes
- 100,000 points: ~1-2 MB
- Additional: Bitmap buffer (~few MB)
```

### Feature Trade-offs

| Feature | Regular Series | Fast Polyline | Fast Bitmap |
|---------|---------------|---------------|-------------|
| **Data Labels** | ✓ Yes | ✗ No | ✗ No |
| **Markers** | ✓ Yes | ✗ No | ✗ No |
| **Tooltips** | ✓ Yes | ✓ Yes | ✓ Yes |
| **Selection** | ✓ Yes | ✗ No | ✗ No |
| **Animation** | ✓ Yes | ✓ Limited | ✗ No |
| **Styling** | ✓ Full | ✗ Limited | ✗ Limited |
| **Performance** | Low | High | Very High |
| **Data Points** | < 10K | < 100K | > 100K |

## Anti-Aliasing

Fast bitmap series may show jagged edges due to bitmap rendering. Enable anti-aliasing for smoother lines at slight performance cost.

### Enabling Anti-Aliasing

**XAML:**
```xaml
<chart:FastLineBitmapSeries EnableAntiAliasing="True" 
                           ItemsSource="{Binding Data}" 
                           XBindingPath="Time" 
                           YBindingPath="Value"/>
```

**C#:**
```csharp
FastLineBitmapSeries series = new FastLineBitmapSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Time",
    YBindingPath = "Value",
    EnableAntiAliasing = true
};
```

### Anti-Aliasing Comparison

**Without Anti-Aliasing:**
- Faster rendering
- Jagged edges visible
- Use for maximum performance

**With Anti-Aliasing:**
- Slightly slower rendering (~10-20% overhead)
- Smooth lines
- Better visual quality
- Recommended for presentation

### When to Enable Anti-Aliasing

- **Enable:**
  - Charts for presentations
  - Export to images
  - Dashboard displays
  - When visual quality matters

- **Disable:**
  - Real-time monitoring with frequent updates
  - When maximum FPS is critical
  - Internal analysis tools
  - When performance is the priority

## When to Use Fast Series

### Decision Guide

**Use Regular Series (LineSeries, ColumnSeries, etc.) When:**
- Data points < 5,000
- Need data labels, markers, or segment selection
- Need animations and smooth transitions
- Visual features are more important than performance

**Use FastLineSeries When:**
- Data points: 5,000 - 100,000
- Need smooth, continuous lines
- Tooltips required
- Balance between performance and quality

**Use Fast Bitmap Series When:**
- Data points > 50,000
- Maximum performance required
- Real-time data updates
- Tooltips sufficient (no need for labels/markers)
- Scientific or technical applications

### Real-World Scenarios

**Stock Market Tick Data:**
```xaml
<!-- Millions of ticks per day -->
<chart:FastLineBitmapSeries ItemsSource="{Binding TickData}"
                           XBindingPath="Timestamp"
                           YBindingPath="Price"
                           EnableAntiAliasing="True"/>
```

**Sensor Monitoring:**
```xaml
<!-- Updates every millisecond -->
<chart:FastLineBitmapSeries ItemsSource="{Binding SensorReadings}"
                           XBindingPath="Time"
                           YBindingPath="Temperature"
                           Stroke="Red"/>
```

**Scientific Simulation:**
```xaml
<!-- Millions of data points -->
<chart:FastScatterBitmapSeries ItemsSource="{Binding SimulationData}"
                              XBindingPath="X"
                              YBindingPath="Y"
                              Fill="Blue"/>
```

## Best Practices

### 1. Choose the Right Series Type

```
Data Points < 5,000:      Use Regular Series
Data Points 5K - 50K:     Use FastLineSeries
Data Points 50K - 500K:   Use FastBitmapSeries  
Data Points > 500K:       Use FastBitmapSeries + Data Sampling
```

### 2. Optimize Data Generation

```csharp
// Good: Generate data once
public class ViewModel
{
    public ObservableCollection<DataPoint> Data { get; private set; }
    
    public ViewModel()
    {
        Data = GenerateData();
    }
    
    private ObservableCollection<DataPoint> GenerateData()
    {
        // Generate large dataset once
        var data = new ObservableCollection<DataPoint>();
        for (int i = 0; i < 100000; i++)
        {
            data.Add(new DataPoint { X = i, Y = GetValue(i) });
        }
        return data;
    }
}

// Bad: Generate data in property getter
public ObservableCollection<DataPoint> Data => GenerateData(); // Called repeatedly!
```

### 3. Use Appropriate Axes

```xaml
<!-- Good: DateTimeAxis for time series -->
<chart:DateTimeAxis IntervalType="Days" Interval="1"/>

<!-- Good: NumericalAxis for numeric data -->
<chart:NumericalAxis Interval="10"/>

<!-- Avoid: CategoryAxis for huge datasets (creates category for each point) -->
```

### 4. Disable Unnecessary Features

```csharp
FastLineBitmapSeries series = new FastLineBitmapSeries()
{
    ItemsSource = data,
    XBindingPath = "X",
    YBindingPath = "Y",
    EnableTooltip = false,       // Disable if not needed
    EnableAnimation = false      // Disable for fast series
};
```

### 5. Update Data Efficiently

```csharp
// Good: Replace entire collection for major updates
Data = new ObservableCollection<DataPoint>(newData);

// Good: For incremental updates, use Add/Remove
Data.Add(newPoint);

// Bad: Clear and re-add (causes multiple refresh)
Data.Clear();
foreach (var point in newData)
{
    Data.Add(point); // Each Add triggers update
}
```

### 6. Sample Data When Necessary

```csharp
public class DataSampler
{
    public static List<DataPoint> SampleData(List<DataPoint> data, int targetPoints)
    {
        if (data.Count <= targetPoints)
            return data;
            
        int step = data.Count / targetPoints;
        var sampled = new List<DataPoint>();
        
        for (int i = 0; i < data.Count; i += step)
        {
            sampled.Add(data[i]);
        }
        
        return sampled;
    }
}

// Usage
var sampledData = DataSampler.SampleData(largeDataset, 10000);
```

## Troubleshooting Tips

### Series Not Rendering

**Problem:** Fast series not visible.

**Solutions:**
- Check data has valid numeric values (not NaN or Infinity)
- Verify axis types match data types (DateTimeAxis for DateTime, NumericalAxis for numbers)
- Ensure axes are properly configured with appropriate ranges

```csharp
// Validate data before binding
var validData = data.Where(d => !double.IsNaN(d.Y) && !double.IsInfinity(d.Y)).ToList();
```

### Jagged Lines

**Problem:** Lines appear pixelated or jagged.

**Solution:** Enable anti-aliasing for bitmap series.

```xaml
<chart:FastLineBitmapSeries EnableAntiAliasing="True" .../>
```

### Poor Performance

**Problem:** Fast series still slow.

**Solutions:**
1. Reduce data points through sampling
2. Use FastBitmapSeries instead of FastLineSeries
3. Disable tooltips and animation if not needed
4. Optimize data generation

```csharp
// Sample data for display
var displayData = allData
    .Where((x, i) => i % 10 == 0) // Take every 10th point
    .ToList();
```

### Tooltip Not Working

**Problem:** Tooltips not appearing on fast series.

**Solution:** Enable tooltip explicitly and check ChartTooltipBehavior is set.

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.TooltipBehavior>
        <chart:ChartTooltipBehavior/>
    </chart:SfCartesianChart.TooltipBehavior>
    
    <chart:FastLineSeries EnableTooltip="True" .../>
</chart:SfCartesianChart>
```

### Memory Issues

**Problem:** High memory usage with fast series.

**Solutions:**
1. Use data sampling to reduce points
2. Implement data virtualization for scrolling
3. Clear old data when adding new data

```csharp
// Limit collection size
if (Data.Count > MaxDataPoints)
{
    Data.RemoveAt(0); // Remove oldest
}
Data.Add(newDataPoint); // Add newest
```

### Lines Not Smooth

**Problem:** Fast series lines not smooth despite anti-aliasing.

**Solution:** Check data resolution and consider interpolation.

```csharp
// Interpolate data for smoother lines
public List<DataPoint> InterpolateData(List<DataPoint> data)
{
    var interpolated = new List<DataPoint>();
    for (int i = 0; i < data.Count - 1; i++)
    {
        interpolated.Add(data[i]);
        
        // Add midpoint
        var midPoint = new DataPoint
        {
            X = (data[i].X + data[i + 1].X) / 2,
            Y = (data[i].Y + data[i + 1].Y) / 2
        };
        interpolated.Add(midPoint);
    }
    interpolated.Add(data[data.Count - 1]);
    return interpolated;
}
```
