# Axis Configuration

The radial axis is a circular arc in which a set of values are displayed along a linear or custom scale. Axis elements such as labels, ticks, and axis line can be easily customized with built-in properties.

## Table of Contents
- [Axis Range Customization](#axis-range-customization)
- [Angle Customization](#angle-customization)
- [Radius Customization](#radius-customization)
- [Axis Positioning](#axis-positioning)
- [Axis Direction](#axis-direction)
- [Label Customization](#label-customization)
- [Tick Customization](#tick-customization)
- [Axis Line Customization](#axis-line-customization)
- [Background Content](#background-content)
- [Multiple Axes](#multiple-axes)
- [Custom Scale Range](#custom-scale-range)
- [Events](#events)

## Axis Range Customization

### Setting Minimum and Maximum Values

The `Minimum` and `Maximum` properties define the value range of the axis.

**Default values:**
- Minimum: 0
- Maximum: 100

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis Minimum="-60"
                          Maximum="60" />
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

```csharp
RadialAxis radialAxis = new RadialAxis();
radialAxis.Minimum = -60;
radialAxis.Maximum = 60;
```

**Use cases:**
- Temperature gauge: -60 to 60
- Speedometer: 0 to 200
- Pressure gauge: 0 to 100

### Setting Interval

The `Interval` property controls the spacing between axis labels.

```xaml
<gauge:RadialAxis Interval="20" />
```

```csharp
radialAxis.Interval = 20;
```

**Result:** For a 0-100 axis, labels appear at 0, 20, 40, 60, 80, 100.

### Maximum Labels Count

The `MaximumLabelsCount` property limits labels per 100 logical pixels. Default is 3.

```xaml
<gauge:RadialAxis MaximumLabelsCount="5" />
```

```csharp
radialAxis.MaximumLabelsCount = 5;
```

**Note:** Only applies when Interval is not explicitly set (automatic range calculation).

## Angle Customization

Control the start and end angles to create different gauge shapes (semi-circle, three-quarter circle, full circle).

### StartAngle and EndAngle

**Angle reference:**
- 0° = Right (3 o'clock)
- 90° = Bottom (6 o'clock)
- 180° = Left (9 o'clock)
- 270° = Top (12 o'clock)

```xaml
<!-- Semi-circle gauge (top half) -->
<gauge:RadialAxis StartAngle="180"
                  EndAngle="0" />
```

```csharp
radialAxis.StartAngle = 180;
radialAxis.EndAngle = 0;
```

**Common angle configurations:**

**Full circle clock:**
```xaml
<gauge:RadialAxis StartAngle="270"
                  EndAngle="270" />
```

**Speedometer (three-quarter):**
```xaml
<gauge:RadialAxis StartAngle="180"
                  EndAngle="90" />
```

**Semi-circle bottom:**
```xaml
<gauge:RadialAxis StartAngle="0"
                  EndAngle="180" />
```

## Radius Customization

The `RadiusFactor` property controls the size of the axis relative to available space.

**Range:** 0.0 to 1.0
**Default:** 0.9

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <!-- Outer axis at 90% -->
        <gauge:RadialAxis RadiusFactor="0.9" />
        
        <!-- Inner axis at 50% -->
        <gauge:RadialAxis RadiusFactor="0.5" />
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

**Values explained:**
- `1.0` = Uses full available radius
- `0.5` = Uses half of available radius
- `0.25` = Uses quarter of available radius

**Use cases:**
- Multiple axes at different sizes
- Creating concentric gauges
- Clock with hour/minute/second hands

## Axis Positioning

### CanScaleToFit

The `CanScaleToFit` property positions the axis based on its start and end angles to maximize space usage.

**Default:** true

```xaml
<gauge:SfRadialGauge CanScaleToFit="True">
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis StartAngle="180"
                          EndAngle="0" />
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

**When true:** Axis is positioned to fill available space based on angles
**When false:** Axis centered regardless of angles

## Axis Direction

### IsInversed

The `IsInversed` property reverses the axis direction.

**Default:** false (clockwise)

```xaml
<gauge:RadialAxis IsInversed="True" />
```

```csharp
radialAxis.IsInversed = true;
```

**Result:**
- false: Clockwise (0 → 100 goes clockwise)
- true: Counter-clockwise (0 → 100 goes counter-clockwise)

**Use case:** Counter-clockwise compasses, reversed timers

## Label Customization

### Label Styling

Style labels using standard text properties:

```xaml
<gauge:RadialAxis FontSize="15"
                  Foreground="Red"
                  FontFamily="Comic Sans MS"
                  FontWeight="Bold"
                  FontStyle="Italic" />
```

```csharp
radialAxis.FontSize = 15;
radialAxis.Foreground = new SolidColorBrush(Colors.Red);
radialAxis.FontFamily = new FontFamily("Comic Sans MS");
radialAxis.FontWeight = FontWeights.Bold;
radialAxis.FontStyle = Windows.UI.Text.FontStyle.Italic;
```

### Label Format

The `LabelFormat` property applies number formatting:

```xaml
<!-- Currency -->
<gauge:RadialAxis LabelFormat="c" />

<!-- Percentage -->
<gauge:RadialAxis LabelFormat="p" />

<!-- Decimal places -->
<gauge:RadialAxis LabelFormat="n2" />
```

**Common formats:**
- `c` = Currency ($0.00)
- `p` = Percent (0.00%)
- `n2` = Number with 2 decimals
- `f1` = Fixed-point with 1 decimal

### Label Template

Create custom label appearances with `LabelTemplate`:

```xaml
<Page.Resources>
    <DataTemplate x:Key="labelTemplate">
        <Border Background="Gray"
                CornerRadius="5">
            <TextBlock Text="{Binding Text}"
                       Foreground="White"
                       FontWeight="Bold"
                       Margin="3" />
        </Border>
    </DataTemplate>
</Page.Resources>

<gauge:RadialAxis LabelTemplate="{StaticResource labelTemplate}" />
```

```csharp
radialAxis.LabelTemplate = this.Resources["labelTemplate"] as DataTemplate;
```

### Label Visibility

```xaml
<gauge:RadialAxis ShowLabels="False" />
```

**Default:** true

### Label Position

The `LabelPosition` property places labels inside or outside the axis line.

```xaml
<gauge:RadialAxis LabelPosition="Outside" />
```

**Options:**
- `Inside` (default): Labels inside axis line
- `Outside`: Labels outside axis line

### Label Offset

The `LabelOffset` property adjusts label distance from the axis line.

**Offset in pixels:**
```xaml
<gauge:RadialAxis LabelOffset="70"
                  OffsetUnit="Pixel" />
```

**Offset in factor (0-1):**
```xaml
<gauge:RadialAxis LabelOffset="0.3"
                  OffsetUnit="Factor" />
```

**Note:** `OffsetUnit` applies to both `LabelOffset` and `TickOffset`.

### Label Rotation

The `CanRotateLabels` property rotates labels to align with the axis curve.

```xaml
<gauge:RadialAxis CanRotateLabels="True" />
```

**Default:** false

### Edge Label Visibility

Control first and last label visibility:

```xaml
<gauge:RadialAxis ShowFirstLabel="False"
                  ShowLastLabel="True" />
```

**Use case:** Clock faces (hide 0/12 overlap)

## Tick Customization

### Tick Length

Set major and minor tick lengths:

**Length in pixels:**
```xaml
<gauge:RadialAxis MajorTickLength="15"
                  MinorTickLength="10"
                  TickLengthUnit="Pixel" />
```

**Length in factor (0-1):**
```xaml
<gauge:RadialAxis MajorTickLength="0.1"
                  MinorTickLength="0.05"
                  TickLengthUnit="Factor" />
```

### Tick Styling

Define tick appearance with styles:

```xaml
<Page.Resources>
    <Style x:Key="MajorTickLineStyle"
           TargetType="Line">
        <Setter Property="Stroke"
                Value="Black" />
        <Setter Property="StrokeThickness"
                Value="1.5" />
    </Style>
    
    <Style x:Key="MinorTickLineStyle"
           TargetType="Line">
        <Setter Property="Stroke"
                Value="Gray" />
        <Setter Property="StrokeThickness"
                Value="1" />
    </Style>
</Page.Resources>

<gauge:RadialAxis MajorTickStyle="{StaticResource MajorTickLineStyle}"
                  MinorTickStyle="{StaticResource MinorTickLineStyle}" />
```

### Dashed Tick Lines

Use `StrokeDashArray` for dashed ticks:

```xaml
<Style x:Key="DashedTickStyle"
       TargetType="Line">
    <Setter Property="Stroke"
            Value="Black" />
    <Setter Property="StrokeDashArray"
            Value="5,2.5" />
</Style>
```

### Minor Ticks Count

The `MinorTicksPerInterval` property sets minor ticks between major ticks.

```xaml
<gauge:RadialAxis MinorTicksPerInterval="4" />
```

**Default:** 1

**Example:** For interval 10 with 4 minor ticks, marks appear at: 0, 2.5, 5, 7.5, 10

### Tick Visibility

```xaml
<gauge:RadialAxis ShowTicks="False" />
```

**Default:** true

### Tick Position

The `TickPosition` property places ticks inside, outside, or across the axis line.

```xaml
<gauge:RadialAxis TickPosition="Outside" />
```

**Options:**
- `Inside` (default): Ticks point inward
- `Outside`: Ticks point outward
- `Cross`: Ticks cross the axis line

### Tick Offset

Adjust tick distance from axis line:

**Offset in pixels:**
```xaml
<gauge:RadialAxis TickOffset="50"
                  OffsetUnit="Pixel" />
```

**Offset in factor:**
```xaml
<gauge:RadialAxis TickOffset="0.5"
                  OffsetUnit="Factor" />
```

## Axis Line Customization

### Axis Line Width

**Width in pixels:**
```xaml
<gauge:RadialAxis AxisLineWidth="30"
                  AxisLineWidthUnit="Pixel" />
```

**Width in factor (0-1):**
```xaml
<gauge:RadialAxis AxisLineWidth="0.1"
                  AxisLineWidthUnit="Factor" />
```

### Axis Line Fill

```xaml
<gauge:RadialAxis AxisLineFill="BlueViolet" />
```

```csharp
radialAxis.AxisLineFill = new SolidColorBrush(Colors.BlueViolet);
```

### Gradient Axis Line

Apply gradient colors using `GradientStops`:

```xaml
<gauge:RadialAxis AxisLineWidth="0.1"
                  AxisLineWidthUnit="Factor">
    <gauge:RadialAxis.GradientStops>
        <gauge:GaugeGradientStop Value="25"
                                 Color="#FFFF7676" />
        <gauge:GaugeGradientStop Value="75"
                                 Color="#FFF54EA2" />
    </gauge:RadialAxis.GradientStops>
</gauge:RadialAxis>
```

```csharp
radialAxis.AxisLineWidth = 0.1;
radialAxis.AxisLineWidthUnit = SizeUnit.Factor;

GaugeGradientStop stop1 = new GaugeGradientStop();
stop1.Value = 25;
stop1.Color = Color.FromArgb(255, 255, 118, 118);
radialAxis.GradientStops.Add(stop1);

GaugeGradientStop stop2 = new GaugeGradientStop();
stop2.Value = 75;
stop2.Color = Color.FromArgb(255, 245, 78, 162);
radialAxis.GradientStops.Add(stop2);
```

**Result:** Smooth color transition from value 25 (pink) to 75 (magenta).

### Axis Line Visibility

```xaml
<gauge:RadialAxis ShowAxisLine="False" />
```

**Default:** true

**Use case:** Clean gauges with only labels and pointers

## Background Content

The `BackgroundContent` property allows any UIElement as the axis background.

### Image Background Example

```xaml
<gauge:RadialAxis ShowAxisLine="False"
                  RadiusFactor="1">
    <gauge:RadialAxis.BackgroundContent>
        <Image Source="Assets/compass-background.png" />
    </gauge:RadialAxis.BackgroundContent>
</gauge:RadialAxis>
```

```csharp
BitmapImage bm = new BitmapImage();
bm.UriSource = new Uri("ms-appx:/Assets/compass-background.png", UriKind.Absolute);
Image image = new Image { Source = bm };
radialAxis.BackgroundContent = image;
```

### Custom Background Example

```xaml
<gauge:RadialAxis.BackgroundContent>
    <Grid>
        <Ellipse Fill="#E0E0E0" />
        <TextBlock Text="SPEED"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   FontSize="20"
                   Foreground="Gray" />
    </Grid>
</gauge:RadialAxis.BackgroundContent>
```

## Multiple Axes

Add multiple axes to show related metrics with different scales:

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <!-- Inner axis (minutes) -->
        <gauge:RadialAxis Maximum="60"
                          Interval="10"
                          RadiusFactor="0.63"
                          AxisLineWidth="3"
                          AxisLineFill="Black"
                          Foreground="Black" />
        
        <!-- Outer axis (hours) -->
        <gauge:RadialAxis Maximum="12"
                          Interval="1"
                          RadiusFactor="0.95"
                          LabelPosition="Outside"
                          TickPosition="Outside"
                          AxisLineWidth="3"
                          AxisLineFill="Red"
                          Foreground="Red" />
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

**Use cases:**
- Clock faces (hour/minute scales)
- Dual-unit measurements (km/h and mph)
- Multi-metric dashboards

## Custom Scale Range

Create non-linear scales by extending the `RadialAxis` class:

```csharp
public class RadialAxisExt : RadialAxis
{
    public override List<AxisLabelData> GenerateVisibleLabels()
    {
        List<AxisLabelData> customLabels = new List<AxisLabelData>();
        
        // Custom label values: 0, 2, 5, 10, 20, 30, 50, 100, 150
        double[] values = { 0, 2, 5, 10, 20, 30, 50, 100, 150 };
        
        foreach (double value in values)
        {
            AxisLabelData label = new AxisLabelData
            {
                Value = value,
                Text = value.ToString()
            };
            customLabels.Add(label);
        }
        
        return customLabels;
    }
    
    public override double ValueToCoefficient(double value)
    {
        // Map values to axis positions (0-1 range)
        if (value >= 0 && value <= 2)
            return (value * 0.125) / 2;
        else if (value > 2 && value <= 5)
            return (((value - 2) * 0.125) / 3) + 0.125;
        else if (value > 5 && value <= 10)
            return (((value - 5) * 0.125) / 5) + 0.25;
        // ... continue for other ranges
        else
            return 1;
    }
}
```

**Usage:**
```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <local:RadialAxisExt Maximum="150" />
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

**Use case:** Logarithmic scales, exponential scales, custom mappings

## Events

### LabelPrepared Event

Customize label text before display:

```xaml
<gauge:RadialAxis LabelPrepared="RadialAxis_LabelPrepared" />
```

```csharp
private void RadialAxis_LabelPrepared(object sender, LabelPreparedEventArgs e)
{
    // Add units
    e.LabelText += " km/h";
    
    // Or replace completely for compass
    if (e.LabelText == "0")
        e.LabelText = "N";
    else if (e.LabelText == "90")
        e.LabelText = "E";
    else if (e.LabelText == "180")
        e.LabelText = "S";
    else if (e.LabelText == "270")
        e.LabelText = "W";
}
```

### AxisTapped Event

Handle axis tap interactions:

```xaml
<gauge:RadialAxis AxisTapped="RadialAxis_AxisTapped" />
```

```csharp
private void RadialAxis_AxisTapped(object sender, AxisTappedEventArgs e)
{
    // Get value at tapped position
    double tappedValue = e.Value;
    Debug.WriteLine($"Tapped at value: {tappedValue}");
}
```

## Common Axis Configurations

### Speedometer (0-200 km/h)
```xaml
<gauge:RadialAxis Minimum="0"
                  Maximum="200"
                  Interval="20"
                  StartAngle="180"
                  EndAngle="90" />
```

### Temperature (-40 to 60°C)
```xaml
<gauge:RadialAxis Minimum="-40"
                  Maximum="60"
                  Interval="10"
                  LabelFormat="n0"
                  StartAngle="180"
                  EndAngle="0" />
```

### Percentage Circle (0-100%)
```xaml
<gauge:RadialAxis Minimum="0"
                  Maximum="100"
                  Interval="10"
                  StartAngle="270"
                  EndAngle="270"
                  LabelFormat="p0" />
```

### Clock Face (1-12)
```xaml
<gauge:RadialAxis Minimum="1"
                  Maximum="12"
                  Interval="1"
                  StartAngle="270"
                  EndAngle="270"
                  ShowFirstLabel="False" />
```

## Best Practices

1. **Use Factor units** for responsive layouts that scale with gauge size
2. **Set appropriate intervals** to avoid overcrowded labels
3. **Apply gradients** for visual appeal and value indication
4. **Hide axis line** when using thick range pointers
5. **Rotate labels** for better readability on curved axes
6. **Use custom scales** for specialized measurement ranges
7. **Position multiple axes** at different radius factors for clarity
