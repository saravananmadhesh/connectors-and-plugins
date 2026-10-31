# Zooming and Panning

## Table of Contents
- [Overview](#overview)
- [Enable Zooming](#enable-zooming)
- [Zoom Types](#zoom-types)
- [Zoom Mode](#zoom-mode)
- [Programmatic Zooming](#programmatic-zooming)
- [Enable Panning](#enable-panning)
- [Use Cases](#use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Zooming and panning allow users to explore large datasets interactively by magnifying specific regions and navigating across the chart. These features are particularly useful when dealing with charts that have a large number of data points.

**Key Features:**
- Pinch zooming (touch devices)
- Mouse wheel zooming
- Panning to navigate zoomed charts
- Programmatic zoom control via ZoomFactor and ZoomPosition
- Control zoom direction (X, Y, or both axes)

## Enable Zooming

To enable zooming and panning, create an instance of `ChartZoomPanBehavior` and set it to the `ZoomPanBehavior` property of `SfCartesianChart`.

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.ZoomPanBehavior>
        <chart:ChartZoomPanBehavior/>
    </chart:SfCartesianChart.ZoomPanBehavior>
    
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries ItemsSource="{Binding Data}"
                     XBindingPath="Date"
                     YBindingPath="Value"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

ChartZoomPanBehavior zooming = new ChartZoomPanBehavior();
chart.ZoomPanBehavior = zooming;

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

LineSeries series = new LineSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Date",
    YBindingPath = "Value"
};
chart.Series.Add(series);
```

## Zoom Types

### Pinch Zooming

Pinch zooming is enabled by setting the `EnablePinchZooming` property to `true`. This allows users on touch devices to zoom in and out using pinch gestures.

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.ZoomPanBehavior>
        <chart:ChartZoomPanBehavior EnablePinchZooming="True"/>
    </chart:SfCartesianChart.ZoomPanBehavior>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartZoomPanBehavior zooming = new ChartZoomPanBehavior()
{
    EnablePinchZooming = true
};
chart.ZoomPanBehavior = zooming;
```

**Gesture:**
- Pinch outward = Zoom in
- Pinch inward = Zoom out

### Mouse Wheel Zooming

Zooming can be performed by mouse wheel action by setting the `EnableMouseWheelZooming` property to `true`.

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.ZoomPanBehavior>
        <chart:ChartZoomPanBehavior EnableMouseWheelZooming="True"/>
    </chart:SfCartesianChart.ZoomPanBehavior>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartZoomPanBehavior zooming = new ChartZoomPanBehavior()
{
    EnableMouseWheelZooming = true
};
chart.ZoomPanBehavior = zooming;
```

**Behavior:**
- Scroll up = Zoom in
- Scroll down = Zoom out
- Zoom centers on cursor position

### Combining Zoom Types

You can enable multiple zoom types simultaneously:

```xaml
<chart:ChartZoomPanBehavior EnablePinchZooming="True"
                           EnableMouseWheelZooming="True"/>
```

## Zoom Mode

The `ZoomMode` property determines which axes can be zoomed. The zooming can be done both horizontally and vertically.

**ZoomMode Options:**
- `X` - Zoom only along X-axis (horizontal)
- `Y` - Zoom only along Y-axis (vertical)
- `XY` - Zoom both axes (default)

### Zoom X-Axis Only

Restrict zooming to the horizontal X-axis:

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.ZoomPanBehavior>
        <chart:ChartZoomPanBehavior ZoomMode="X"/>
    </chart:SfCartesianChart.ZoomPanBehavior>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartZoomPanBehavior zooming = new ChartZoomPanBehavior()
{
    ZoomMode = ZoomMode.X
};
chart.ZoomPanBehavior = zooming;
```

**When to use:**
- Time-series data where Y-range should remain constant
- Comparing values across different time periods
- Horizontal data exploration

### Zoom Y-Axis Only

Restrict zooming to the vertical Y-axis:

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.ZoomPanBehavior>
        <chart:ChartZoomPanBehavior ZoomMode="Y"/>
    </chart:SfCartesianChart.ZoomPanBehavior>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartZoomPanBehavior zooming = new ChartZoomPanBehavior()
{
    ZoomMode = ZoomMode.Y
};
chart.ZoomPanBehavior = zooming;
```

**When to use:**
- Fixed categories on X-axis
- Comparing magnitudes across categories
- Vertical scale adjustment

### Zoom Both Axes

Enable zooming on both axes (default behavior):

```xaml
<chart:ChartZoomPanBehavior ZoomMode="XY"/>
```

## Programmatic Zooming

You can programmatically zoom the chart by setting the `ZoomFactor` and `ZoomPosition` properties on the axes.

### ZoomFactor

The `ZoomFactor` defines the percentage of visible range from the total range of axis values.

**C#:**
```csharp
// Show 50% of the data (2x zoom)
chart.XAxes[0].ZoomFactor = 0.5;
chart.YAxes[0].ZoomFactor = 0.5;
```

**Understanding ZoomFactor:**
- Range: 0 to 1
- 1 = No zoom (100% of data visible)
- 0.5 = 50% of data visible (2x magnification)
- 0.25 = 25% of data visible (4x magnification)
- 0.1 = 10% of data visible (10x magnification)

### ZoomPosition

The `ZoomPosition` defines the position for the range of values that need to be displayed as a result of ZoomFactor.

**C#:**
```csharp
// Show data from 25% to 75% of the range
chart.XAxes[0].ZoomPosition = 0.25;
chart.XAxes[0].ZoomFactor = 0.5;
```

**Understanding ZoomPosition:**
- Range: 0 to 1
- 0 = Start of data range
- 0.25 = 25% into data range
- 0.5 = Middle of data range
- 1 = End of data range

### Complete Example

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis ShowMajorGridLines="False"
                           ZoomFactor="0.3"
                           ZoomPosition="0.5"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
CategoryAxis xAxis = new CategoryAxis()
{
    ShowMajorGridLines = false,
    ZoomFactor = 0.3,
    ZoomPosition = 0.5
};
chart.XAxes.Add(xAxis);
```

This displays 30% of the data (ZoomFactor=0.3) starting from the middle (ZoomPosition=0.5).

### Zoom In Programmatically

```csharp
private void ZoomIn()
{
    // Zoom in by 20%
    double currentFactor = chart.XAxes[0].ZoomFactor;
    chart.XAxes[0].ZoomFactor = currentFactor * 0.8;
    
    // Adjust position to keep centered
    double offset = (1 - chart.XAxes[0].ZoomFactor) / 2;
    chart.XAxes[0].ZoomPosition = offset;
}
```

### Zoom Out Programmatically

```csharp
private void ZoomOut()
{
    // Zoom out by 20%
    double currentFactor = chart.XAxes[0].ZoomFactor;
    chart.XAxes[0].ZoomFactor = Math.Min(1, currentFactor / 0.8);
    
    // Adjust position to keep centered
    double offset = (1 - chart.XAxes[0].ZoomFactor) / 2;
    chart.XAxes[0].ZoomPosition = offset;
}
```

### Reset Zoom

```csharp
private void ResetZoom()
{
    chart.XAxes[0].ZoomFactor = 1;
    chart.XAxes[0].ZoomPosition = 0;
    chart.YAxes[0].ZoomFactor = 1;
    chart.YAxes[0].ZoomPosition = 0;
}
```

## Enable Panning

Panning allows moving the visible area of the chart when it is zoomed in. To enable panning, set the `EnablePanning` property to `true`.

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.ZoomPanBehavior>
        <chart:ChartZoomPanBehavior EnableMouseWheelZooming="True"
                                   EnablePanning="True"/>
    </chart:SfCartesianChart.ZoomPanBehavior>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartZoomPanBehavior zooming = new ChartZoomPanBehavior()
{
    EnableMouseWheelZooming = true,
    EnablePanning = true
};
chart.ZoomPanBehavior = zooming;
```

**Behavior:**
- Click and drag to pan when zoomed in
- Panning only works when chart is zoomed
- Respects ZoomMode (pans only on enabled axes)
- Left-click drag to pan
- Mouse wheel to zoom (when EnableMouseWheelZooming is true)

## Complete Example

**Zoom with Custom Controls:**

```xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    
    <!-- Zoom Controls -->
    <StackPanel Grid.Row="0" Orientation="Horizontal" Margin="10">
        <Button Content="Zoom In" Click="ZoomIn_Click" Margin="5"/>
        <Button Content="Zoom Out" Click="ZoomOut_Click" Margin="5"/>
        <Button Content="Reset" Click="Reset_Click" Margin="5"/>
        <TextBlock x:Name="ZoomLevelText" 
                  VerticalAlignment="Center" 
                  Margin="20,0,0,0"
                  Text="Zoom: 1.0x"/>
    </StackPanel>
    
    <!-- Chart -->
    <chart:SfCartesianChart x:Name="chart" Grid.Row="1">
        
        <chart:SfCartesianChart.ZoomPanBehavior>
            <chart:ChartZoomPanBehavior EnableMouseWheelZooming="True"
                                       EnablePinchZooming="True"
                                       EnablePanning="True"
                                       ZoomMode="XY"/>
        </chart:SfCartesianChart.ZoomPanBehavior>
        
        <chart:SfCartesianChart.XAxes>
            <chart:DateTimeAxis>
                <chart:DateTimeAxis.LabelStyle>
                    <chart:LabelStyle LabelFormat="MMM-dd"/>
                </chart:DateTimeAxis.LabelStyle>
            </chart:DateTimeAxis>
        </chart:SfCartesianChart.XAxes>
        
        <chart:SfCartesianChart.YAxes>
            <chart:NumericalAxis>
                <chart:NumericalAxis.LabelStyle>
                    <chart:LabelStyle LabelFormat="$0"/>
                </chart:NumericalAxis.LabelStyle>
            </chart:NumericalAxis>
        </chart:SfCartesianChart.YAxes>
        
        <chart:LineSeries ItemsSource="{Binding Data}"
                         XBindingPath="Date"
                         YBindingPath="Value"
                         StrokeWidth="2"/>
        
    </chart:SfCartesianChart>
</Grid>
```

```csharp
public partial class ZoomingPage : Page
{
    public ZoomingPage()
    {
        InitializeComponent();
        UpdateZoomLevel();
    }
    
    private void ZoomIn_Click(object sender, RoutedEventArgs e)
    {
        // Zoom in by 20%
        double currentFactor = chart.XAxes[0].ZoomFactor;
        chart.XAxes[0].ZoomFactor = currentFactor * 0.8;
        chart.YAxes[0].ZoomFactor = currentFactor * 0.8;
        
        // Keep centered
        double xOffset = (1 - chart.XAxes[0].ZoomFactor) / 2;
        double yOffset = (1 - chart.YAxes[0].ZoomFactor) / 2;
        chart.XAxes[0].ZoomPosition = xOffset;
        chart.YAxes[0].ZoomPosition = yOffset;
        
        UpdateZoomLevel();
    }
    
    private void ZoomOut_Click(object sender, RoutedEventArgs e)
    {
        // Zoom out by 20%
        double currentFactor = chart.XAxes[0].ZoomFactor;
        chart.XAxes[0].ZoomFactor = Math.Min(1, currentFactor / 0.8);
        chart.YAxes[0].ZoomFactor = Math.Min(1, currentFactor / 0.8);
        
        // Keep centered
        double xOffset = (1 - chart.XAxes[0].ZoomFactor) / 2;
        double yOffset = (1 - chart.YAxes[0].ZoomFactor) / 2;
        chart.XAxes[0].ZoomPosition = xOffset;
        chart.YAxes[0].ZoomPosition = yOffset;
        
        UpdateZoomLevel();
    }
    
    private void Reset_Click(object sender, RoutedEventArgs e)
    {
        chart.XAxes[0].ZoomFactor = 1;
        chart.XAxes[0].ZoomPosition = 0;
        chart.YAxes[0].ZoomFactor = 1;
        chart.YAxes[0].ZoomPosition = 0;
        
        UpdateZoomLevel();
    }
    
    private void UpdateZoomLevel()
    {
        double zoomLevel = 1 / chart.XAxes[0].ZoomFactor;
        ZoomLevelText.Text = $"Zoom: {zoomLevel:F1}x";
    }
}
```

## Use Cases

### Time-Series Analysis
- **Zoom In:** Examine specific time periods in detail
- **Zoom Out:** View overall trends
- **Pan:** Navigate through historical data
- **Example:** Stock price analysis, weather data, sensor readings

### Large Datasets
- **Challenge:** Millions of data points
- **Solution:** Zoom to specific regions of interest
- **Benefit:** Maintain chart performance while providing detail
- **Example:** Scientific measurements, IoT sensor data

### Multi-Scale Analysis
- **Zoom Levels:** View data at different scales
- **Pattern Detection:** Identify patterns at macro and micro levels
- **Example:** Signal processing, frequency analysis

### Comparative Analysis
- **ZoomMode="X":** Compare values over time
- **ZoomMode="Y":** Compare magnitudes across categories
- **Example:** Sales comparison, performance metrics

## Best Practices

### General Guidelines
- **Enable Multiple Zoom Types:** Allow both mouse wheel and pinch zooming for better user experience
- **Always Combine with Panning:** Set EnablePanning="True" when enabling zooming
- **Provide Reset Functionality:** Give users an easy way to return to the original view
- **Set Appropriate ZoomMode:** Choose X, Y, or XY based on your data characteristics

### Performance Optimization
- Use programmatic zooming (ZoomFactor/ZoomPosition) for initial view setup
- Consider data virtualization for very large datasets
- Test zoom behavior with maximum expected data volume

### User Experience
- Display current zoom level in the UI
- Provide visual feedback during zoom operations
- Enable pinch zooming for touch-enabled devices
- Consider adding zoom buttons for accessibility

### ZoomMode Selection
- **Time-Series Data:** Use ZoomMode="X" to maintain Y-axis scale
- **Categorical Data:** Use ZoomMode="Y" for magnitude comparison
- **Scatter Plots:** Use ZoomMode="XY" for full exploration
- **Heat Maps:** Use ZoomMode="XY" for detailed examination

## Troubleshooting

### Zooming Not Working

**Problem:** No zoom occurs when using mouse wheel or pinch.

**Solutions:**
1. Verify ChartZoomPanBehavior is added to chart:
```xaml
<chart:SfCartesianChart.ZoomPanBehavior>
    <chart:ChartZoomPanBehavior EnableMouseWheelZooming="True"/>
</chart:SfCartesianChart.ZoomPanBehavior>
```

2. Enable the appropriate zoom type:
   - Set `EnableMouseWheelZooming="True"` for mouse wheel
   - Set `EnablePinchZooming="True"` for touch devices

3. Ensure chart has data to display

4. Check that ZoomMode allows zooming on the desired axis

### Panning Not Working

**Problem:** Cannot pan the chart.

**Solutions:**
1. Set `EnablePanning="True"`:
```xaml
<chart:ChartZoomPanBehavior EnablePanning="True"/>
```

2. **Chart must be zoomed in first** - Panning only works when zoomed

3. Verify ZoomMode allows panning on the desired axis

4. Check that ZoomFactor is less than 1 (indicating zoom is active)

### Cannot Zoom on Specific Axis

**Problem:** Zoom works on one axis but not the other.

**Solution:** Check ZoomMode setting:
```xaml
<!-- Zoom only X-axis -->
<chart:ChartZoomPanBehavior ZoomMode="X"/>

<!-- Zoom only Y-axis -->
<chart:ChartZoomPanBehavior ZoomMode="Y"/>

<!-- Zoom both axes -->
<chart:ChartZoomPanBehavior ZoomMode="XY"/>
```

### Programmatic Zoom Not Visible

**Problem:** Setting ZoomFactor doesn't show zoom effect.

**Solutions:**
1. Verify ZoomFactor is between 0 and 1:
```csharp
chart.XAxes[0].ZoomFactor = 0.5; // Correct: 50% visible
```

2. Set ZoomPosition to control which portion is visible:
```csharp
chart.XAxes[0].ZoomPosition = 0.25; // Start from 25% into data
```

3. Remember: ZoomFactor is visible percentage, not magnification
   - ZoomFactor = 0.5 means 2x zoom (50% visible)
   - ZoomFactor = 0.25 means 4x zoom (25% visible)

### Zoom Calculation Confusion

**Problem:** Understanding relationship between ZoomFactor and magnification.

**Formula:**
- **Magnification = 1 / ZoomFactor**
- ZoomFactor of 0.5 = 2x magnification
- ZoomFactor of 0.25 = 4x magnification
- ZoomFactor of 0.1 = 10x magnification

```csharp
// To achieve 5x zoom:
chart.XAxes[0].ZoomFactor = 1.0 / 5.0; // = 0.2

// To display zoom level:
double zoomLevel = 1 / chart.XAxes[0].ZoomFactor;
ZoomText.Text = $"{zoomLevel:F1}x";
```

### Touch Gestures Not Responding

**Problem:** Pinch zoom doesn't work on touch device.

**Solutions:**
1. Enable pinch zooming explicitly:
```xaml
<chart:ChartZoomPanBehavior EnablePinchZooming="True"/>
```

2. Test on actual touch-enabled device (not mouse simulation)

3. Ensure no UI elements are blocking touch input

### Chart Appears Zoomed In Initially

**Problem:** Chart shows zoomed view on load.

**Solution:** Reset zoom properties on axes:
```csharp
// In constructor or Loaded event:
chart.XAxes[0].ZoomFactor = 1;
chart.XAxes[0].ZoomPosition = 0;
chart.YAxes[0].ZoomFactor = 1;
chart.YAxes[0].ZoomPosition = 0;
```

Or check XAML for ZoomFactor/ZoomPosition values.
