# Tooltip, Trackball, and Crosshair

## Table of Contents
- [Tooltip](#tooltip)
- [Trackball](#trackball)
- [Crosshair](#crosshair)
- [Comparison](#comparison)

## Tooltip

Tooltips display information about data points when hovering over series segments.

### Basic Usage

Enable tooltips on series:

**XAML:**
```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Month"
                   YBindingPath="Sales"
                   EnableTooltip="True"/>
```

**C#:**
```csharp
series.EnableTooltip = true;
```

### Tooltip Behavior

Configure tooltip globally for the chart:

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Duration="5000"
                                   EnableAnimation="True"
                                   InitialShowDelay="0"/>
    </chart:SfCartesianChart.TooltipBehavior>
    
    <chart:ColumnSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
</chart:SfCartesianChart>
```

**Properties:**
- **Duration** - Milliseconds tooltip stays visible (default: 1000)
- **EnableAnimation** - Animate tooltip appearance
- **InitialShowDelay** - Delay before showing (ms)
- **HorizontalAlignment** - Left, Center, Right
- **VerticalAlignment** - Top, Center, Bottom
- **HorizontalOffset** - Horizontal position offset
- **VerticalOffset** - Vertical position offset

### Tooltip Styling

Customize appearance using ChartTooltipBehavior:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Resources>
        <Style TargetType="Path" x:Key="tooltipStyle">
            <Setter Property="Fill" Value="DarkBlue"/>
            <Setter Property="Stroke" Value="White"/>
        </Style>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource tooltipStyle}">
            <chart:ChartTooltipBehavior.LabelStyle>
                <chart:LabelStyle FontSize="14"
                                 Foreground="White"/>
            </chart:ChartTooltipBehavior.LabelStyle>
        </chart:ChartTooltipBehavior>
    </chart:SfCartesianChart.TooltipBehavior>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
Style tooltipStyle = new Style(typeof(Path));
tooltipStyle.Setters.Add(new Setter(Path.FillProperty, new SolidColorBrush(Colors.DarkBlue)));
tooltipStyle.Setters.Add(new Setter(Path.StrokeProperty, new SolidColorBrush(Colors.White)));

ChartTooltipBehavior tooltipBehavior = new ChartTooltipBehavior();
tooltipBehavior.Style = tooltipStyle;
chart.TooltipBehavior = tooltipBehavior;
```

### Tooltip Template (On Series)

TooltipTemplate property is on the **series**.

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="tooltipTemplate" x:DataType="chart:ChartSegment">
            <Border Background="DarkSlateGray" 
                   BorderBrush="White" 
                   BorderThickness="2"
                   Padding="10"
                   CornerRadius="5">
                <StackPanel>
                    <TextBlock Text="{Binding Item.Product}" 
                              Foreground="White"
                              FontSize="14"/>
                    <TextBlock Text="{Binding Item.Sales, StringFormat='Sales: ${0:N0}'}" 
                              Foreground="LightGray"
                              FontSize="12"
                              Margin="0,5,0,0"/>
                </StackPanel>
            </Border>
        </DataTemplate>
        
        <Style TargetType="Path" x:Key="style">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="Fill" Value="LightGreen"/>
        </Style>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource style}"/>
    </chart:SfCartesianChart.TooltipBehavior>
    
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"
                       EnableTooltip="True"
                       TooltipTemplate="{StaticResource tooltipTemplate}"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ColumnSeries series = new ColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Product",
    YBindingPath = "Sales",
    EnableTooltip = true,
    TooltipTemplate = chart.Resources["tooltipTemplate"] as DataTemplate
};

chart.Series.Add(series);
```

**Available Bindings in TooltipTemplate:**
- `Item` - The data point object (binding context is ChartSegment)
- `Item.PropertyName` - Specific property from data model

### Tooltip Position

```xaml
<chart:ChartTooltipBehavior HorizontalAlignment="Left"
                           VerticalAlignment="Bottom"
                           HorizontalOffset="20"
                           VerticalOffset="20"/>
```

## Trackball

Trackball displays information for all series at a specific X-axis position with a vertical line indicator.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.TrackballBehavior>
        <chart:ChartTrackballBehavior/>
    </chart:SfCartesianChart.TrackballBehavior>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries ItemsSource="{Binding Data1}"
                     XBindingPath="Month"
                     YBindingPath="Sales"
                     Label="Product A"/>
    
    <chart:LineSeries ItemsSource="{Binding Data2}"
                     XBindingPath="Month"
                     YBindingPath="Sales"
                     Label="Product B"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartTrackballBehavior trackball = new ChartTrackballBehavior();
chart.TrackballBehavior = trackball;

CategoryAxis xAxis = new CategoryAxis()
{
    ShowTrackballLabel = true
};
chart.XAxes.Add(xAxis);
```

### Trackball Components

The trackball consists of four main parts:
1. **Line** - Vertical line at cursor position
2. **Symbol** - Markers on each series where line intersects
3. **Axis Label** - Label on axis showing X value
4. **Series Label** - Labels showing Y values for each series

### Trackball Line

Control line visibility and style:

```xaml
<chart:ChartTrackballBehavior ShowLine="True">
    <chart:ChartTrackballBehavior.LineStyle>
        <Style TargetType="Line">
            <Setter Property="Stroke" Value="Red"/>
            <Setter Property="StrokeDashArray" Value="5,3"/>
        </Style>
    </chart:ChartTrackballBehavior.LineStyle>
</chart:ChartTrackballBehavior>
```

**Properties:**
- **ShowLine** - Show/hide vertical line (default: True)
- **LineStyle** - Customize line appearance

### Trackball Symbol

Customize the markers at data points:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Resources>
        <Style TargetType="chart:ChartTrackballControl" x:Key="trackballStyle">
            <Setter Property="Background" Value="Red"/>
        </Style>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.TrackballBehavior>
        <chart:ChartTrackballBehavior ChartTrackballStyle="{StaticResource trackballStyle}"/>
    </chart:SfCartesianChart.TrackballBehavior>
    
</chart:SfCartesianChart>
```

### Axis Label

Enable axis labels on the trackball:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:SfCartesianChart.TrackballBehavior>
        <chart:ChartTrackballBehavior/>
    </chart:SfCartesianChart.TrackballBehavior>
    
</chart:SfCartesianChart>
```

### Axis Label Alignment

Control axis label position:

```xaml
<chart:ChartTrackballBehavior AxisLabelAlignment="Far"/>
```

**AxisLabelAlignment Options:**
- `Auto` - Align Near/Far based on trackball movement
- `Far` - Align far from trackball position
- `Near` - Align near trackball position
- `Center` - Align to center (default)

### Axis Label Template

Customize axis label appearance:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="axisLabelTemplate">
            <Border CornerRadius="4"
                   BorderThickness="1"
                   BorderBrush="Black"
                   Background="LightGreen"
                   Padding="6">
                <TextBlock Foreground="Black"
                          Text="{Binding ValueX}"
                          FontSize="15"/>
            </Border>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis ShowTrackballLabel="True"
                           TrackballLabelTemplate="{StaticResource axisLabelTemplate}"/>
    </chart:SfCartesianChart.XAxes>
    
</chart:SfCartesianChart>
```

### Series Label

Control series labels for each data point:

```xaml
<chart:LineSeries ItemsSource="{Binding Data}"
                 XBindingPath="Month"
                 YBindingPath="Sales"
                 ShowTrackballLabel="True"/>
```

**Properties:**
- **ShowTrackballLabel** - Show/hide label for this series (default: True)

### Series Label Alignment

Position series labels:

```xaml
<chart:ChartTrackballBehavior LabelHorizontalAlignment="Center"
                             LabelVerticalAlignment="Center"/>
```

**Label Alignment Options:**
- **LabelHorizontalAlignment** - Left, Center, Right (default: Left)
- **LabelVerticalAlignment** - Top, Center, Bottom (default: Top)

### Display Mode

Control how labels are shown for multiple series:

```xaml
<chart:ChartTrackballBehavior DisplayMode="FloatAllPoints"/>
```

**DisplayMode Options:**

**FloatAllPoints** - Show labels for all series (default):
```xaml
<chart:ChartTrackballBehavior DisplayMode="FloatAllPoints"/>
```

**NearestPoint** - Show only nearest point:
```xaml
<chart:ChartTrackballBehavior DisplayMode="NearestPoint"/>
```

**GroupAllPoints** - Group all labels in single container:
```xaml
<chart:ChartTrackballBehavior DisplayMode="GroupAllPoints"/>
```

### Trackball Label Template (On Series)

TrackballLabelTemplate is on the **series**.

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="labelTemplate" x:DataType="chart:ChartPointInfo">
            <Border CornerRadius="5"
                   BorderThickness="1"
                   BorderBrush="Black"
                   Background="LightGreen"
                   Padding="5">
                <StackPanel>
                    <TextBlock Text="{Binding Series.Label}"
                              Foreground="Black"/>
                    <TextBlock Text="{Binding ValueY, StringFormat='{}{0:N2}'}"
                              Foreground="Black"
                              Margin="0,3,0,0"/>
                </StackPanel>
            </Border>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.TrackballBehavior>
        <chart:ChartTrackballBehavior/>
    </chart:SfCartesianChart.TrackballBehavior>
    
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Month"
                       YBindingPath="Sales"
                       Label="Sales"
                       TrackballLabelTemplate="{StaticResource labelTemplate}"/>
    
</chart:SfCartesianChart>
```

**Available Bindings in TrackballLabelTemplate:**
- Binding context is `ChartPointInfo`
- `ValueX` - X-axis value
- `ValueY` - Y-axis value
- `Series` - Series reference

## Crosshair

Crosshair displays horizontal and vertical lines intersecting at the cursor position for precise coordinate reading.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.CrosshairBehavior>
        <chart:ChartCrosshairBehavior/>
    </chart:SfCartesianChart.CrosshairBehavior>
    
    <chart:SfCartesianChart.XAxes>
        <chart:NumericalAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ScatterSeries ItemsSource="{Binding Data}"
                        XBindingPath="XValue"
                        YBindingPath="YValue"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartCrosshairBehavior crosshair = new ChartCrosshairBehavior();
chart.CrosshairBehavior = crosshair;

// Enable axis labels
NumericalAxis xAxis = new NumericalAxis()
{
    ShowTrackballLabel = true
};
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis()
{
    ShowTrackballLabel = true
};
chart.YAxes.Add(yAxis);
```

### Crosshair Line Style

Customize horizontal and vertical lines:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Resources>
        <Style TargetType="Line" x:Key="horizontalStyle">
            <Setter Property="Stroke" Value="Green"/>
            <Setter Property="StrokeDashArray" Value="3,3"/>
        </Style>
        
        <Style TargetType="Line" x:Key="verticalStyle">
            <Setter Property="Stroke" Value="Green"/>
            <Setter Property="StrokeDashArray" Value="3,3"/>
        </Style>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.CrosshairBehavior>
        <chart:ChartCrosshairBehavior HorizontalLineStyle="{StaticResource horizontalStyle}"
                                     VerticalLineStyle="{StaticResource verticalStyle}"/>
    </chart:SfCartesianChart.CrosshairBehavior>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
Style horizontalLineStyle = new Style(typeof(Line));
horizontalLineStyle.Setters.Add(new Setter(Line.StrokeProperty, new SolidColorBrush(Colors.Green)));

ChartCrosshairBehavior crosshair = new ChartCrosshairBehavior()
{
    HorizontalLineStyle = horizontalLineStyle
};
chart.CrosshairBehavior = crosshair;
```

### Axis Label Alignment

Control where axis labels appear:

```xaml
<chart:ChartCrosshairBehavior HorizontalAxisLabelAlignment="Far"
                             VerticalAxisLabelAlignment="Far"/>
```

**Label Alignment Options:**
- `Auto` - Align Near/Far based on crosshair movement
- `Far` - Position far from crosshair line
- `Near` - Position near crosshair line
- `Center` - Position at center of line (default)

### Axis Label Template

Customize axis label appearance:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="crosshairTemplate">
            <Border Background="DarkGreen"
                   BorderBrush="White"
                   BorderThickness="1"
                   CornerRadius="3"
                   Padding="5">
                <TextBlock Text="{Binding}" 
                          Foreground="White"
                          FontSize="12"/>
            </Border>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.XAxes>
        <chart:NumericalAxis ShowTrackballLabel="True"
                            CrosshairLabelTemplate="{StaticResource crosshairTemplate}"/>
    </chart:SfCartesianChart.XAxes>
    
</chart:SfCartesianChart>
```

**IMPORTANT:** CrosshairLabelTemplate is on the **axis**, not on ChartCrosshairBehavior.

## Comparison

### When to Use Each

**Tooltip:**
- ✅ Simple hover information for individual points
- ✅ Single series or independent data points
- ✅ User needs value on demand
- ✅ Column, bar, pie charts
- ❌ Comparing multiple series simultaneously

**Trackball:**
- ✅ Multi-series comparison at same X position
- ✅ Time-series data with multiple metrics
- ✅ Line charts with several trends
- ✅ Comparing values across series
- ❌ Scattered data without aligned X values

**Crosshair:**
- ✅ Precise coordinate reading (scientific data)
- ✅ Scatter plots requiring both X and Y precision
- ✅ When both coordinates are equally important
- ✅ Heat maps, contour plots
- ❌ Categorical X-axis (use tooltip or trackball)

### Feature Comparison

| Feature | Tooltip | Trackball | Crosshair |
|---------|---------|-----------|-----------|
| **Shows single series** | ✓ | ✗ | ✗ |
| **Shows multiple series** | ✗ | ✓ | ✗ |
| **Visual guide line** | ✗ | ✓ (vertical) | ✓ (both) |
| **Follows cursor** | ✓ | ✓ | ✓ |
| **Axis value display** | ✗ | ✓ | ✓ |
| **Data point markers** | ✗ | ✓ | ✗ |
| **Best for** | Discrete points | Multi-series trends | Precise coordinates |

### Can They Be Combined?

Yes! You can use multiple behaviors together, but be aware they may overlap:

```xaml
<chart:SfCartesianChart>
    
    <!-- All three behaviors -->
    <chart:SfCartesianChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Duration="3000"/>
    </chart:SfCartesianChart.TooltipBehavior>
    
    <chart:SfCartesianChart.TrackballBehavior>
        <chart:ChartTrackballBehavior/>
    </chart:SfCartesianChart.TrackballBehavior>
    
    <chart:SfCartesianChart.CrosshairBehavior>
        <chart:ChartCrosshairBehavior/>
    </chart:SfCartesianChart.CrosshairBehavior>
    
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries EnableTooltip="True"
                     Label="Series 1"
                     ItemsSource="{Binding Data1}"
                     XBindingPath="Date"
                     YBindingPath="Value"/>
    
</chart:SfCartesianChart>
```

**Recommendation:** Use only one or two behaviors together to avoid visual clutter. Common combinations:
- Tooltip + Trackball (for different interaction modes)
- Crosshair alone (for precision)
- Trackball alone (for multi-series comparison)

## Best Practices

### Tooltip
- Enable only when user needs additional information
- Keep Duration reasonable (2000-5000ms)
- Use templates for rich, branded content
- Don't rely on tooltip for critical information
- Consider accessibility - ensure data is available elsewhere

### Trackball
- Ideal for 2-5 series comparison
- Use distinct series colors with UseSeriesPalette="True"
- Consider DisplayMode based on data density:
  - FloatAllPoints: When you have space and need to see all values
  - NearestPoint: When chart is crowded
  - GroupAllPoints: For compact display
- Enable ShowTrackballLabel on relevant axes

### Crosshair
- Best for scatter plots and scientific data
- Use subtle line colors (gray, light colors)
- Combine with grid lines for precise reading
- Enable ShowTrackballLabel on both axes for value display
- Consider line dash patterns for visibility

## Troubleshooting

### Tooltip Not Showing
**Problem:** Tooltip doesn't appear on hover.

**Solutions:**
1. Verify `EnableTooltip="True"` on series
2. Check TooltipBehavior is configured on chart
3. Ensure mouse is over data point (not empty space)
4. Verify data is bound correctly

```xaml
<!-- Correct setup -->
<chart:SfCartesianChart>
    <chart:SfCartesianChart.TooltipBehavior>
        <chart:ChartTooltipBehavior/>
    </chart:SfCartesianChart.TooltipBehavior>
    
    <chart:ColumnSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"
                       XBindingPath="X"
                       YBindingPath="Y"/>
</chart:SfCartesianChart>
```

### TooltipTemplate Not Working
**Problem:** Custom template not appearing.

**Solution:** TooltipTemplate is on the **series**, not ChartTooltipBehavior:

```xaml
<!-- Wrong -->
<chart:ChartTooltipBehavior TooltipTemplate="{StaticResource template}"/>

<!-- Correct -->
<chart:ColumnSeries TooltipTemplate="{StaticResource template}"
                   EnableTooltip="True"/>
```

### Trackball Not Visible
**Problem:** Trackball line or labels not appearing.

**Solutions:**
1. Ensure TrackballBehavior is set on chart
2. Enable ShowTrackballLabel on axes for axis labels
3. Verify ShowLine="True" for vertical line
4. Check series have common X values
5. Verify LineStyle stroke color contrasts with background

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.TrackballBehavior>
        <chart:ChartTrackballBehavior ShowLine="True"/>
    </chart:SfCartesianChart.TrackballBehavior>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.XAxes>
</chart:SfCartesianChart>
```

### TrackballLabelTemplate Not Working
**Problem:** Custom trackball label template not applying.

**Solution:** TrackballLabelTemplate is on the **series**, not ChartTrackballBehavior:

```xaml
<!-- Wrong -->
<chart:ChartTrackballBehavior LabelTemplate="{StaticResource template}"/>

<!-- Correct -->
<chart:LineSeries TrackballLabelTemplate="{StaticResource template}"
                 Label="Sales"/>
```

### Crosshair Not Appearing
**Problem:** Crosshair lines not visible.

**Solutions:**
1. Confirm CrosshairBehavior is added to chart
2. Enable ShowTrackballLabel on axes for axis labels
3. Check line colors contrast with background
4. Verify HorizontalLineStyle and VerticalLineStyle are defined

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.CrosshairBehavior>
        <chart:ChartCrosshairBehavior/>
    </chart:SfCartesianChart.CrosshairBehavior>
    
    <chart:SfCartesianChart.XAxes>
        <chart:NumericalAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis ShowTrackballLabel="True"/>
    </chart:SfCartesianChart.YAxes>
</chart:SfCartesianChart>
```

### Multiple Behaviors Conflicting
**Problem:** Tooltip, trackball, and crosshair interfering with each other.

**Solution:** Use only one or two behaviors:
- Tooltip alone for simple charts
- Trackball alone for multi-series comparison
- Crosshair alone for precision
- Tooltip + Trackball can work if trackball DisplayMode is carefully chosen

### Axis Labels Not Showing in Trackball/Crosshair
**Problem:** No labels appear on axes.

**Solution:** Enable ShowTrackballLabel on the axis:

```xaml
<chart:CategoryAxis ShowTrackballLabel="True"/>
<chart:NumericalAxis ShowTrackballLabel="True"/>
```

**Note:** Same property name (ShowTrackballLabel) is used for both trackball and crosshair axis labels.
