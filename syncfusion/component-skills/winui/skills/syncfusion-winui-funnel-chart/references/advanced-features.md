# Advanced Features

## Table of Contents
- [Segment Spacing (GapRatio)](#segment-spacing-gapratio)
- [Neck Width Customization](#neck-width-customization)
- [Rendering Modes](#rendering-modes)
- [Performance Optimization](#performance-optimization)
- [Edge Cases and Gotchas](#edge-cases-and-gotchas)

## Segment Spacing (GapRatio)

The `GapRatio` property controls the spacing between funnel segments, creating visual separation.

### Basic Usage

```xml
<chart:SfFunnelChart x:Name="chart"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value"
                     GapRatio="0.5">
</chart:SfFunnelChart>
```

### C# Implementation

```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.GapRatio = 0.5;
this.Content = chart;
```

### GapRatio Values

The property accepts values from **0.0 to 1.0**:

**No Gap (Default):**
```xml
<chart:SfFunnelChart GapRatio="0" />
```
- Segments touch each other
- Traditional funnel appearance
- Maximum use of chart space

**Small Gap:**
```xml
<chart:SfFunnelChart GapRatio="0.1" />
```
- Subtle separation (10%)
- Maintains funnel cohesion
- Slightly improved segment distinction

**Medium Gap:**
```xml
<chart:SfFunnelChart GapRatio="0.3" />
```
- Noticeable spacing (30%)
- Good balance between separation and unity
- Recommended for most use cases

**Large Gap:**
```xml
<chart:SfFunnelChart GapRatio="0.5" />
```
- Clear separation (50%)
- Emphasizes individual stages
- Better for highlighting specific segments

**Maximum Gap:**
```xml
<chart:SfFunnelChart GapRatio="1.0" />
```
- Maximum separation
- Segments appear almost disconnected
- Use sparingly for special emphasis

### Use Cases

**Connected Flow (GapRatio = 0):**
```xml
<chart:SfFunnelChart GapRatio="0"
                     Header="Continuous Process Flow">
</chart:SfFunnelChart>
```
**Scenario:** Emphasize the continuous nature of a process.

**Stage Distinction (GapRatio = 0.2-0.4):**
```xml
<chart:SfFunnelChart GapRatio="0.3"
                     Header="Sales Pipeline Stages">
</chart:SfFunnelChart>
```
**Scenario:** Clearly show distinct stages while maintaining flow relationship.

**Independent Metrics (GapRatio = 0.5-0.8):**
```xml
<chart:SfFunnelChart GapRatio="0.6"
                     Header="Department Performance">
</chart:SfFunnelChart>
```
**Scenario:** Show related but independent metrics.

### Combining with Explosion

```xml
<chart:SfFunnelChart GapRatio="0.2"
                     ExplodeIndex="2"
                     ExplodeOffset="40">
</chart:SfFunnelChart>
```

**Result:** Spacing between all segments plus additional explosion of one segment for maximum emphasis.

## Neck Width Customization

The `MinimumWidth` property controls the width of the funnel's neck (bottom section).

### Basic Configuration

```xml
<chart:SfFunnelChart MinimumWidth="20"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### C# Implementation

```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.MinimumWidth = 20;
this.Content = chart;
```

### Width Values

**Default Width (40):**
```xml
<chart:SfFunnelChart MinimumWidth="40" />
```
- Standard funnel appearance
- Balanced proportions

**Narrow Neck (10-25):**
```xml
<chart:SfFunnelChart MinimumWidth="15" />
```
- Dramatic funnel shape
- Strong emphasis on progression
- More pronounced visual hierarchy

**Wide Neck (50-80):**
```xml
<chart:SfFunnelChart MinimumWidth="60" />
```
- Subtle funnel shape
- More consistent segment widths
- Less dramatic visual hierarchy

**Inverted Pyramid (0):**
```xml
<chart:SfFunnelChart MinimumWidth="0" />
```
- Neck comes to a point
- Creates perfect triangle/pyramid shape
- Maximum visual impact
- See [Inverted Pyramid](#inverted-pyramid) section below

### Visual Impact

The neck width affects the funnel's visual storytelling:

**Narrow Neck (Small MinimumWidth):**
- Emphasizes filtering/conversion process
- Shows dramatic reduction
- Better for conversion funnels

**Wide Neck (Large MinimumWidth):**
- Less dramatic appearance
- More uniform segment display
- Better when values don't decrease dramatically

### Use Cases

**High Conversion Funnel:**
```xml
<chart:SfFunnelChart MinimumWidth="50"
                     Header="High Retention Process">
</chart:SfFunnelChart>
```
**Scenario:** When conversion rates are high, use wider neck to reflect that reality.

**Low Conversion Funnel:**
```xml
<chart:SfFunnelChart MinimumWidth="10"
                     Header="Competitive Selection Process">
</chart:SfFunnelChart>
```
**Scenario:** When few make it through, narrow neck emphasizes selectivity.

## Inverted Pyramid

Create a perfect triangle by setting `MinimumWidth` to 0:

### Configuration

```xml
<chart:SfFunnelChart MinimumWidth="0"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value"
                     Header="Inverted Pyramid">
</chart:SfFunnelChart>
```

### C# Implementation

```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.MinimumWidth = 0;
chart.Header = "Inverted Pyramid";
this.Content = chart;
```

### When to Use Inverted Pyramid

**Perfect for:**
- Competition elimination processes (tournament brackets)
- Highly selective funnels (1% final conversion)
- Dramatic visual impact presentations
- Emphasis on scarcity or exclusivity

**Not ideal for:**
- High retention processes
- When bottom segments have significant size
- Space-constrained layouts

### Enhanced Inverted Pyramid

```xml
<chart:SfFunnelChart MinimumWidth="0"
                     GapRatio="0.2"
                     ShowDataLabels="True"
                     Header="Elite Selection Process">
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Context="Percentage"
                                      Foreground="White"
                                      FontSize="14"/>
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

## Rendering Modes

The `Mode` property determines how values are mapped to the visual representation:

### Available Modes

- **ValueIsHeight** - Values determine segment height (default)
- **ValueIsWidth** - Values determine segment width

### ValueIsHeight (Default)

Segments heights are proportional to their values:

```xml
<chart:SfFunnelChart x:Name="chart"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value"
                     Mode="ValueIsHeight">
</chart:SfFunnelChart>
```

**C#:**
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.Mode = ChartFunnelMode.ValueIsHeight;
this.Content = chart;
```

**Behavior:**
- Taller segments = Larger values
- Segment width determined by funnel shape
- Standard funnel visualization
- Best for showing quantity/volume

**Use when:**
- Emphasizing volume or quantity
- Standard conversion funnel display
- Process duration visualization

### ValueIsWidth

Segment widths are proportional to their values:

```xml
<chart:SfFunnelChart x:Name="chart"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value"
                     Mode="ValueIsWidth">
</chart:SfFunnelChart>
```

**C#:**
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.Mode = ChartFunnelMode.ValueIsWidth;
this.Content = chart;
```

**Behavior:**
- Wider segments = Larger values
- All segments have equal height
- Funnel shape created by width variation
- Emphasizes relative proportions

**Use when:**
- Emphasizing proportions over quantities
- Equal time periods per stage
- Comparing stage importance

### Comparison

**ValueIsHeight:**
```
Top segment: Tall and wide
Middle segment: Medium height, medium width
Bottom segment: Short and narrow
```
- Visual emphasis on quantity
- Natural flow representation
- Intuitive for most users

**ValueIsWidth:**
```
Top segment: Full height, wide
Middle segment: Full height, medium width
Bottom segment: Full height, narrow
```
- Visual emphasis on proportion
- Uniform stage importance
- Better for equal-duration stages

### Choosing the Right Mode

**Use ValueIsHeight when:**
- Values represent volume or count
- Traditional funnel semantics apply
- Showing conversion quantities
- Data has large value differences

**Use ValueIsWidth when:**
- Values represent rates or percentages
- All stages take equal time
- Emphasizing proportion over quantity
- Limited vertical space available

## Performance Optimization

### Best Practices for Large Datasets

**1. Limit Segment Count:**
```csharp
// Aggregate data if too many segments
public List<Model> GetOptimizedData(List<Model> rawData)
{
    if (rawData.Count > 10)
    {
        // Group smaller segments
        return AggregateSmallSegments(rawData);
    }
    return rawData;
}
```

**2. Disable Unnecessary Features:**
```xml
<!-- When performance is critical -->
<chart:SfFunnelChart EnableTooltip="False"
                     ShowDataLabels="False">
</chart:SfFunnelChart>
```

**3. Use Solid Colors Over Gradients:**
```xml
<!-- Faster rendering -->
<BrushCollection x:Key="solidColors">
    <SolidColorBrush Color="#4dd0e1"/>
    <SolidColorBrush Color="#26c6da"/>
</BrushCollection>
```

**4. Optimize Data Updates:**
```csharp
// Use throttling for real-time updates
private DispatcherTimer _updateTimer;

public void InitializeTimer()
{
    _updateTimer = new DispatcherTimer();
    _updateTimer.Interval = TimeSpan.FromSeconds(2); // Update every 2 seconds
    _updateTimer.Tick += UpdateChartData;
    _updateTimer.Start();
}
```

**5. Virtualization for Dynamic Data:**
```csharp
// Only update when visible
public void UpdateChart()
{
    if (chart.Visibility == Visibility.Visible)
    {
        chart.ItemsSource = GetLatestData();
    }
}
```

### Memory Management

```csharp
// Clean up resources
public void Dispose()
{
    if (chart != null)
    {
        chart.ItemsSource = null;
        chart.SelectionBehavior = null;
        chart.TooltipBehavior = null;
    }
}
```

## Edge Cases and Gotchas

### 1. Zero or Negative Values

**Issue:** Funnel chart doesn't handle negative values well.

**Solution:**
```csharp
public List<Model> ValidateData(List<Model> data)
{
    return data.Where(d => d.Value > 0).ToList();
}
```

### 2. Single Segment

**Issue:** Funnel with only one segment doesn't look like a funnel.

**Solution:**
```csharp
if (data.Count < 3)
{
    // Use different chart type or show warning
    ShowWarning("Funnel charts work best with 3+ segments");
}
```

### 3. Very Large Value Differences

**Issue:** Small segments become invisible when one segment is much larger.

**Solution:**
```csharp
// Use logarithmic scaling or cap maximum values
public double NormalizeValue(double value, double maxValue)
{
    return Math.Min(value, maxValue * 0.8); // Cap at 80% of max
}
```

### 4. Overlapping Labels

**Issue:** Data labels overlap when segments are small.

**Solution:**
```xml
<chart:FunnelDataLabelSettings FontSize="10"
                              Rotation="45"/>
```

Or conditionally show labels:
```csharp
public void OptimizeLabels()
{
    // Only show labels for segments above certain threshold
    chart.ShowDataLabels = (segmentCount <= 7);
}
```

### 5. Color Palette Exhaustion

**Issue:** More segments than colors in palette.

**Solution:**
```csharp
// Generate dynamic palette
public List<Brush> GeneratePalette(int segmentCount)
{
    var palette = new List<Brush>();
    for (int i = 0; i < segmentCount; i++)
    {
        byte hue = (byte)((i * 360 / segmentCount) % 360);
        palette.Add(CreateBrushFromHue(hue));
    }
    return palette;
}
```

### 6. Responsive Design

**Issue:** Chart doesn't adapt to window resizing.

**Solution:**
```xml
<chart:SfFunnelChart HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch">
</chart:SfFunnelChart>
```

Or programmatic:
```csharp
this.SizeChanged += (s, e) =>
{
    chart.Width = e.NewSize.Width * 0.8;
    chart.Height = e.NewSize.Height * 0.8;
};
```

### 7. Data Binding Updates

**Issue:** Chart doesn't update when data changes.

**Solution:**
```csharp
// Use ObservableCollection
public ObservableCollection<Model> Data { get; set; }

// Or manually refresh
public void RefreshChart()
{
    var temp = chart.ItemsSource;
    chart.ItemsSource = null;
    chart.ItemsSource = temp;
}
```

## Best Practices Summary

### Visual Design
- Use `GapRatio` sparingly (0.1-0.3 for most cases)
- Choose `MinimumWidth` based on data story
- Match `Mode` to data semantics

### Performance
- Limit segments to 5-10 for optimal performance
- Use solid colors when performance matters
- Disable features you don't need

### Data Quality
- Validate data before binding
- Handle edge cases gracefully
- Provide meaningful fallbacks

### User Experience
- Test at different window sizes
- Ensure labels are readable
- Provide tooltips for details
- Consider accessibility

### Maintenance
- Document custom configurations
- Use consistent styling across charts
- Keep update logic simple
- Monitor performance metrics
