# Multiple Axes

## Table of Contents
- [Overview](#overview)
- [Adding Multiple Axes](#adding-multiple-axes)
- [Assigning Series to Axes](#assigning-series-to-axes)
- [Axis Arrangement](#axis-arrangement)
- [Common Scenarios](#common-scenarios)
- [Axis Events](#axis-events)

## Overview

Cartesian charts support multiple X and Y axes, enabling complex visualizations where different series use different scales or units. This is essential for comparing datasets with vastly different value ranges or units of measurement.

**Benefits:**
- Compare data with different scales (e.g., price vs. volume)
- Display different units on same chart (e.g., temperature °C and humidity %)
- Create dual-axis charts (primary and secondary Y-axes)
- Arrange multiple series with independent positioning

## Adding Multiple Axes

Both XAxes and YAxes properties are collections that can hold multiple axes.

### Multiple Y-Axes

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <!-- Primary Y-axis (index 0) -->
        <chart:NumericalAxis Header="Price ($)"/>
        
        <!-- Secondary Y-axis (index 1) -->
        <chart:NumericalAxis Name="VolumeAxis" 
                           Header="Volume"
                           OpposedPosition="True"/>
    </chart:SfCartesianChart.YAxes>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
// Primary Y-axis
NumericalAxis priceAxis = new NumericalAxis();
priceAxis.Header = "Price ($)";
chart.YAxes.Add(priceAxis);

// Secondary Y-axis
NumericalAxis volumeAxis = new NumericalAxis();
volumeAxis.Name = "VolumeAxis";
volumeAxis.Header = "Volume";
volumeAxis.OpposedPosition = true;
chart.YAxes.Add(volumeAxis);
```

### Multiple X-Axes

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <!-- Primary X-axis -->
        <chart:DateTimeAxis Header="Date"/>
        
        <!-- Secondary X-axis -->
        <chart:CategoryAxis Name="CategoryXAxis" 
                          Header="Categories"
                          OpposedPosition="True"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
</chart:SfCartesianChart>
```

## Assigning Series to Axes

By default, all series use the first axis in each collection (index 0). Use **XAxisName** and **YAxisName** properties to assign series to specific axes.

### Basic Assignment

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Price ($)"/>
        <chart:NumericalAxis Name="VolumeAxis" 
                           Header="Volume"
                           OpposedPosition="True"/>
    </chart:SfCartesianChart.YAxes>
    
    <!-- Price series uses default (first) Y-axis -->
    <chart:LineSeries ItemsSource="{Binding StockData}"
                     XBindingPath="Date"
                     YBindingPath="Price"
                     Label="Stock Price"/>
    
    <!-- Volume series uses named VolumeAxis -->
    <chart:ColumnSeries ItemsSource="{Binding StockData}"
                       XBindingPath="Date"
                       YBindingPath="Volume"
                       YAxisName="VolumeAxis"
                       Label="Volume"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
// Add axes
chart.XAxes.Add(new DateTimeAxis());

NumericalAxis priceAxis = new NumericalAxis { Header = "Price ($)" };
chart.YAxes.Add(priceAxis);

NumericalAxis volumeAxis = new NumericalAxis 
{ 
    Name = "VolumeAxis",
    Header = "Volume",
    OpposedPosition = true 
};
chart.YAxes.Add(volumeAxis);

// Price series - uses default first Y-axis
LineSeries priceSeries = new LineSeries
{
    ItemsSource = viewModel.StockData,
    XBindingPath = "Date",
    YBindingPath = "Price",
    Label = "Stock Price"
};
chart.Series.Add(priceSeries);

// Volume series - uses named axis
ColumnSeries volumeSeries = new ColumnSeries
{
    ItemsSource = viewModel.StockData,
    XBindingPath = "Date",
    YBindingPath = "Volume",
    YAxisName = "VolumeAxis",
    Label = "Volume"
};
chart.Series.Add(volumeSeries);
```

**Key Points:**
- Give each axis a unique **Name** property
- Reference axis name in series' **XAxisName** or **YAxisName**
- If not specified, series uses the first axis (index 0)
- Axis names are case-sensitive

## Axis Arrangement

### Side-by-Side (OpposedPosition)

Place axes on opposite sides of the chart:

```xaml
<!-- Left Y-axis -->
<chart:NumericalAxis Header="Temperature (°C)"/>

<!-- Right Y-axis -->
<chart:NumericalAxis Name="HumidityAxis"
                   Header="Humidity (%)"
                   OpposedPosition="True"/>
```

**Result:** Temperature on left, Humidity on right

### Stacked Axes

Multiple axes can share the same side:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Name="Axis1" Header="Series 1"/>
        <chart:NumericalAxis Name="Axis2" Header="Series 2"/>
        <chart:NumericalAxis Name="Axis3" Header="Series 3"/>
    </chart:SfCartesianChart.YAxes>
    
</chart:SfCartesianChart>
```

Axes stack vertically on the left side (or right if OpposedPosition=True).

## Common Scenarios

### Scenario 1: Stock Price with Volume

Display stock price (line) and trading volume (column) on separate Y-axes:

```xaml
<chart:SfCartesianChart Header="Stock Performance">
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCartesianChart.Legend>
    
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis>
            <chart:DateTimeAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="MMM-dd"/>
            </chart:DateTimeAxis.LabelStyle>
        </chart:DateTimeAxis>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <!-- Price axis (left) -->
        <chart:NumericalAxis Header="Price ($)">
            <chart:NumericalAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="C2"/>
            </chart:NumericalAxis.LabelStyle>
        </chart:NumericalAxis>
        
        <!-- Volume axis (right) -->
        <chart:NumericalAxis Name="VolumeAxis"
                           Header="Volume (millions)"
                           OpposedPosition="True">
            <chart:NumericalAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="N0"/>
            </chart:NumericalAxis.LabelStyle>
        </chart:NumericalAxis>
    </chart:SfCartesianChart.YAxes>
    
    <!-- Price line series -->
    <chart:LineSeries ItemsSource="{Binding Data}"
                     XBindingPath="Date"
                     YBindingPath="Close"
                     Label="Price"
                     Stroke="Blue"
                     StrokeThickness="2"/>
    
    <!-- Volume column series -->
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Date"
                       YBindingPath="Volume"
                       YAxisName="VolumeAxis"
                       Label="Volume"
                       Fill="Gray"
                       Opacity="0.5"/>
    
</chart:SfCartesianChart>
```

### Scenario 2: Temperature and Humidity

Compare temperature and humidity with different units:

```xaml
<chart:SfCartesianChart Header="Weather Monitoring">
    
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis>
            <chart:DateTimeAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="HH:mm"/>
            </chart:DateTimeAxis.LabelStyle>
        </chart:DateTimeAxis>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <!-- Temperature (°C) on left -->
        <chart:NumericalAxis Header="Temperature (°C)"
                           Minimum="0"
                           Maximum="40"/>
        
        <!-- Humidity (%) on right -->
        <chart:NumericalAxis Name="HumidityAxis"
                           Header="Humidity (%)"
                           Minimum="0"
                           Maximum="100"
                           OpposedPosition="True"/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries ItemsSource="{Binding WeatherData}"
                     XBindingPath="Time"
                     YBindingPath="Temperature"
                     Label="Temperature"
                     Stroke="Red"/>
    
    <chart:LineSeries ItemsSource="{Binding WeatherData}"
                     XBindingPath="Time"
                     YBindingPath="Humidity"
                     YAxisName="HumidityAxis"
                     Label="Humidity"
                     Stroke="Blue"/>
    
</chart:SfCartesianChart>
```

### Scenario 3: Multiple Series with Shared Scale

Display multiple datasets that share the same scale but need visual separation:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Name="Sales" Header="Sales ($)"/>
        <chart:NumericalAxis Name="Profit" Header="Profit ($)"/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries ItemsSource="{Binding Q1Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"
                       YAxisName="Sales"
                       Label="Q1 Sales"/>
    
    <chart:LineSeries ItemsSource="{Binding ProfitData}"
                     XBindingPath="Product"
                     YBindingPath="Profit"
                     YAxisName="Profit"
                     Label="Profit Margin"/>
    
</chart:SfCartesianChart>
```

## Axis Events

### ActualRangeChanged

Triggered when the axis range changes (e.g., during zooming):

**XAML:**
```xaml
<chart:NumericalAxis ActualRangeChanged="Axis_ActualRangeChanged"/>
```

**C#:**
```csharp
private void Axis_ActualRangeChanged(object sender, ActualRangeChangedEventArgs e)
{
    double actualMin = e.ActualMinimum;
    double actualMax = e.ActualMaximum;
    
    // Update UI or perform calculations based on new range
    Debug.WriteLine($"Axis range: {actualMin} to {actualMax}");
}
```

**Use Cases:**
- Synchronize zoom levels across multiple charts
- Update detail view based on visible range
- Display range information to user

### LabelCreated

Customize labels as they're created:

**XAML:**
```xaml
<chart:NumericalAxis LabelCreated="Axis_LabelCreated"/>
```

**C#:**
```csharp
private void Axis_LabelCreated(object sender, ChartAxisLabelEventArgs e)
{
    // Modify label text
    if (double.TryParse(e.Label, out double value))
    {
        if (value > 1000000)
        {
            e.Label = $"{value / 1000000:F1}M";
        }
        else if (value > 1000)
        {
            e.Label = $"{value / 1000:F1}K";
        }
    }
    
    // Customize label style
    e.LabelStyle = new LabelStyle
    {
        FontSize = 12,
        Foreground = value > 0 
            ? new SolidColorBrush(Colors.Green) 
            : new SolidColorBrush(Colors.Red)
    };
}
```

**Use Cases:**
- Abbreviate large numbers (1M, 1K)
- Color-code labels based on value
- Add units or symbols to labels
- Implement custom formatting logic

## Best Practices

### Axis Naming
- Use descriptive axis names: "PriceAxis", "VolumeAxis" (not "Axis1", "Axis2")
- Keep names short but meaningful
- Use consistent naming conventions across your application

### Visual Distinction
- Use OpposedPosition=True for secondary axes
- Apply different colors to related series and axis headers
- Use consistent formatting (same decimal places, units)

### Scale Considerations
- Ensure axes have appropriate ranges for their data
- Use different axis types if data types differ (e.g., DateTime vs Numerical)
- Consider logarithmic axes if scales vary by orders of magnitude

### Performance
- Limit to 2-3 axes per chart for readability
- Disable unnecessary features (grid lines, tick marks) on secondary axes
- Use shared axes when possible (assign multiple series to same axis)

## Troubleshooting

**Series not visible:**
- Verify YAxisName matches the Name property of the axis exactly (case-sensitive)
- Check that axis range includes your data values
- Ensure axis is added to YAxes collection before series is added

**Axes overlapping:**
- Use OpposedPosition=True to move axes to opposite sides
- Adjust axis header sizes if stacking multiple axes
- Consider reducing number of axes

**Wrong scale:**
- Confirm series is assigned to correct axis via YAxisName
- Check axis type matches data type (Numerical for numbers, DateTime for dates)
- Verify Minimum/Maximum properties don't exclude data

**Labels cut off:**
- Increase chart margin or padding
- Reduce label font size
- Rotate labels if necessary
