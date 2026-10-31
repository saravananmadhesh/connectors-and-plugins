# Ranges

Gauge ranges are visual elements that help quickly visualize where values fall on the axis. They're typically used to indicate zones like danger areas, warning ranges, or safe zones.

## Table of Contents
- [Basic Range Configuration](#basic-range-configuration)
- [Range Width Customization](#range-width-customization)
- [Gradient Ranges](#gradient-ranges)
- [Range Positioning](#range-positioning)
- [Range Colors for Axis Elements](#range-colors-for-axis-elements)
- [Range Labels](#range-labels)
- [Common Range Patterns](#common-range-patterns)

## Basic Range Configuration

### Setting Start and End Values

Define the range boundaries using `StartValue` and `EndValue`:

```xaml
<gauge:RadialAxis.Ranges>
    <gauge:GaugeRange StartValue="30"
                      EndValue="65"
                      Background="Orange" />
</gauge:RadialAxis.Ranges>
```

```csharp
GaugeRange gaugeRange = new GaugeRange();
gaugeRange.StartValue = 30;
gaugeRange.EndValue = 65;
gaugeRange.Background = new SolidColorBrush(Colors.Orange);
radialAxis.Ranges.Add(gaugeRange);
```

**Result:** An orange arc segment from value 30 to 65 on the axis.

### Multiple Ranges

Create color-coded zones with multiple ranges:

```xaml
<gauge:RadialAxis Maximum="150">
    <gauge:RadialAxis.Ranges>
        <!-- Safe zone -->
        <gauge:GaugeRange StartValue="0"
                          EndValue="50"
                          Background="Green" />
        
        <!-- Warning zone -->
        <gauge:GaugeRange StartValue="50"
                          EndValue="100"
                          Background="Yellow" />
        
        <!-- Danger zone -->
        <gauge:GaugeRange StartValue="100"
                          EndValue="150"
                          Background="Red" />
    </gauge:RadialAxis.Ranges>
</gauge:RadialAxis>
```

**Common use cases:**
- RPM tachometer (green/yellow/red zones)
- Temperature monitors (cold/moderate/hot)
- Pressure gauges (low/normal/high)
- Battery indicators (critical/low/normal/full)

## Range Width Customization

### Equal Width Ranges

Set the same width for both ends:

```xaml
<gauge:GaugeRange StartValue="30"
                  EndValue="65"
                  StartWidth="10"
                  EndWidth="10"
                  Background="Blue" />
```

```csharp
gaugeRange.StartWidth = 10;
gaugeRange.EndWidth = 10;
```

**Result:** Uniform width range (10 pixels).

### Tapered Ranges

Create tapered ranges by setting different start and end widths:

```xaml
<gauge:GaugeRange StartValue="30"
                  EndValue="65"
                  StartWidth="5"
                  EndWidth="20"
                  Background="Purple" />
```

```csharp
gaugeRange.StartWidth = 5;
gaugeRange.EndWidth = 20;
```

**Result:** Range that widens from 5 pixels to 20 pixels.

**Use cases:**
- Visual emphasis on higher values
- Creating funnel effects
- Highlighting value progression

### Width Units

#### Pixel Width

Specify width in absolute pixels:

```xaml
<gauge:GaugeRange StartValue="0"
                  EndValue="50"
                  StartWidth="15"
                  EndWidth="15"
                  WidthUnit="Pixel"
                  Background="Green" />
```

**Use when:** You need consistent pixel-perfect sizing.

#### Factor Width (0-1)

Specify width as a factor of the axis radius:

```xaml
<gauge:GaugeRange StartValue="0"
                  EndValue="50"
                  StartWidth="0.1"
                  EndWidth="0.1"
                  WidthUnit="Factor"
                  Background="Green" />
```

```csharp
gaugeRange.StartWidth = 0.1;
gaugeRange.EndWidth = 0.1;
gaugeRange.WidthUnit = SizeUnit.Factor;
```

**Factor calculation:**
- `0.1` = 10% of axis radius
- `0.2` = 20% of axis radius
- `0.5` = 50% of axis radius

**Use when:** You need responsive sizing that scales with gauge size.

## Gradient Ranges

Apply smooth color transitions across range values using `GradientStops`.

### Basic Gradient

```xaml
<gauge:GaugeRange StartValue="30"
                  EndValue="65"
                  StartWidth="15"
                  EndWidth="15">
    <gauge:GaugeRange.GradientStops>
        <gauge:GaugeGradientStop Value="35"
                                 Color="#FF00FF00" />
        <gauge:GaugeGradientStop Value="60"
                                 Color="#FFFF0000" />
    </gauge:GaugeRange.GradientStops>
</gauge:GaugeRange>
```

```csharp
GaugeRange gaugeRange = new GaugeRange();
gaugeRange.StartValue = 30;
gaugeRange.EndValue = 65;
gaugeRange.StartWidth = 15;
gaugeRange.EndWidth = 15;

GaugeGradientStop stop1 = new GaugeGradientStop();
stop1.Value = 35;
stop1.Color = Color.FromArgb(255, 0, 255, 0); // Green
gaugeRange.GradientStops.Add(stop1);

GaugeGradientStop stop2 = new GaugeGradientStop();
stop2.Value = 60;
stop2.Color = Color.FromArgb(255, 255, 0, 0); // Red
gaugeRange.GradientStops.Add(stop2);

radialAxis.Ranges.Add(gaugeRange);
```

**Result:** Smooth transition from green (at 35) to red (at 60).

### Multi-Color Gradient

Create complex gradients with multiple color stops:

```xaml
<gauge:GaugeRange StartValue="0"
                  EndValue="100"
                  StartWidth="20"
                  EndWidth="20">
    <gauge:GaugeRange.GradientStops>
        <gauge:GaugeGradientStop Value="0" Color="#FF0000FF" />  <!-- Blue -->
        <gauge:GaugeGradientStop Value="25" Color="#FF00FFFF" /> <!-- Cyan -->
        <gauge:GaugeGradientStop Value="50" Color="#FF00FF00" /> <!-- Green -->
        <gauge:GaugeGradientStop Value="75" Color="#FFFFFF00" /> <!-- Yellow -->
        <gauge:GaugeGradientStop Value="100" Color="#FFFF0000" /> <!-- Red -->
    </gauge:GaugeRange.GradientStops>
</gauge:GaugeRange>
```

**Result:** Rainbow gradient: Blue → Cyan → Green → Yellow → Red.

**Use cases:**
- Temperature scales
- Spectrum displays
- Performance indicators
- Heat maps

## Range Positioning

### Range Offset

Move ranges away from the axis line using `RangeOffset`.

#### Offset in Pixels

```xaml
<gauge:GaugeRange StartValue="30"
                  EndValue="65"
                  RangeOffset="70"
                  OffsetUnit="Pixel"
                  Background="Blue" />
```

```csharp
gaugeRange.RangeOffset = 70;
gaugeRange.OffsetUnit = SizeUnit.Pixel;
```

**Positive values:** Move outward from center
**Negative values:** Move inward toward center

#### Offset in Factor

```xaml
<gauge:GaugeRange StartValue="30"
                  EndValue="65"
                  RangeOffset="0.4"
                  OffsetUnit="Factor"
                  Background="Blue" />
```

```csharp
gaugeRange.RangeOffset = 0.4;
gaugeRange.OffsetUnit = SizeUnit.Factor;
```

**Factor calculation:**
- Multiplied by axis radius
- `0.4` = 40% of radius outward
- `-0.2` = 20% of radius inward

### Layered Ranges

Create layered effects by positioning ranges at different offsets:

```xaml
<gauge:RadialAxis.Ranges>
    <!-- Background layer -->
    <gauge:GaugeRange StartValue="0"
                      EndValue="100"
                      StartWidth="0.3"
                      EndWidth="0.3"
                      WidthUnit="Factor"
                      OffsetUnit="Factor"
                      RangeOffset="0.35"
                      Background="#20000000" />
    
    <!-- Foreground layer -->
    <gauge:GaugeRange StartValue="0"
                      EndValue="75"
                      StartWidth="0.25"
                      EndWidth="0.25"
                      WidthUnit="Factor"
                      OffsetUnit="Factor"
                      RangeOffset="0.36"
                      Background="#FF4CAF50" />
</gauge:RadialAxis.Ranges>
```

**Result:** Two-layer range creating depth effect.

## Range Colors for Axis Elements

Apply range colors to axis labels and ticks using `UseRangeColorForAxis`.

### Basic Usage

```xaml
<gauge:RadialAxis UseRangeColorForAxis="True"
                  ShowAxisLine="False"
                  TickPosition="Outside"
                  LabelPosition="Outside">
    <gauge:RadialAxis.Ranges>
        <gauge:GaugeRange StartValue="0"
                          EndValue="35"
                          Background="#FFF8B195" />
        <gauge:GaugeRange StartValue="35"
                          EndValue="70"
                          Background="#FFC06C84" />
        <gauge:GaugeRange StartValue="70"
                          EndValue="100"
                          Background="#FF355C7D" />
    </gauge:RadialAxis.Ranges>
</gauge:RadialAxis>
```

**Result:** Labels and ticks adopt colors from their corresponding range zones.

### Complete Example with Styled Ticks

```xaml
<Page.Resources>
    <Style x:Key="AxisMajorTickStyle"
           TargetType="Line">
        <Setter Property="Stroke" Value="#999999" />
        <Setter Property="StrokeThickness" Value="1" />
    </Style>
    
    <Style x:Key="AxisMinorTickStyle"
           TargetType="Line">
        <Setter Property="Stroke" Value="#C4C4C4" />
        <Setter Property="StrokeThickness" Value="1" />
    </Style>
</Page.Resources>

<gauge:RadialAxis ShowAxisLine="False"
                  TickPosition="Outside"
                  LabelPosition="Outside"
                  StartAngle="270"
                  EndAngle="270"
                  UseRangeColorForAxis="True"
                  RadiusFactor="0.95"
                  Interval="10"
                  ShowFirstLabel="False"
                  IsInversed="True"
                  TickLengthUnit="Factor"
                  MajorTickLength="0.15"
                  MinorTickLength="0.04"
                  MinorTicksPerInterval="4"
                  MajorTickStyle="{StaticResource AxisMajorTickStyle}"
                  MinorTickStyle="{StaticResource AxisMinorTickStyle}">
    
    <gauge:RadialAxis.Ranges>
        <gauge:GaugeRange WidthUnit="Factor"
                          OffsetUnit="Factor"
                          RangeOffset="0.36"
                          StartWidth="0.05"
                          EndWidth="0.25"
                          StartValue="0"
                          EndValue="35"
                          Background="#FFF8B195" />
        <gauge:GaugeRange WidthUnit="Factor"
                          OffsetUnit="Factor"
                          RangeOffset="0.36"
                          StartWidth="0.05"
                          EndWidth="0.25"
                          StartValue="35"
                          EndValue="70"
                          Background="#FFC06C84" />
        <gauge:GaugeRange WidthUnit="Factor"
                          OffsetUnit="Factor"
                          RangeOffset="0.36"
                          StartWidth="0.05"
                          EndWidth="0.25"
                          StartValue="70"
                          EndValue="100"
                          Background="#FF355C7D" />
    </gauge:RadialAxis.Ranges>
</gauge:RadialAxis>
```

**Use cases:**
- Color-coded scale labels
- Matching ticks to zone colors
- Enhanced visual clarity
- Thematic gauge designs

## Range Labels

Add text labels to ranges for identification.

### Basic Range Label

```xaml
<gauge:GaugeRange StartValue="0"
                  EndValue="33"
                  Label="Slow"
                  FontSize="20"
                  Foreground="White"
                  Background="Red" />
```

```csharp
gaugeRange.Label = "Slow";
gaugeRange.FontSize = 20;
gaugeRange.Foreground = new SolidColorBrush(Colors.White);
```

### Label Styling

Style labels using text properties:

```xaml
<gauge:GaugeRange StartValue="33"
                  EndValue="66"
                  Label="Moderate"
                  FontSize="18"
                  FontWeight="Bold"
                  FontFamily="Arial"
                  Foreground="Black"
                  Background="Yellow" />
```

### Multiple Labeled Ranges Example

```xaml
<gauge:RadialAxis ShowLabels="False"
                  ShowAxisLine="False"
                  ShowTicks="False"
                  Minimum="0"
                  Maximum="99">
    
    <gauge:RadialAxis.Ranges>
        <gauge:GaugeRange StartValue="0"
                          EndValue="33"
                          Label="Slow"
                          WidthUnit="Factor"
                          StartWidth="0.65"
                          EndWidth="0.65"
                          FontSize="20"
                          Foreground="White"
                          Background="#FFFE2A25" />
        
        <gauge:GaugeRange StartValue="33"
                          EndValue="66"
                          Label="Moderate"
                          WidthUnit="Factor"
                          StartWidth="0.65"
                          EndWidth="0.65"
                          FontSize="20"
                          Foreground="Black"
                          Background="#FFFFBA00" />
        
        <gauge:GaugeRange StartValue="66"
                          EndValue="99"
                          Label="Fast"
                          WidthUnit="Factor"
                          StartWidth="0.65"
                          EndWidth="0.65"
                          FontSize="20"
                          Foreground="White"
                          Background="#FF00AB47" />
    </gauge:RadialAxis.Ranges>
    
    <gauge:RadialAxis.Pointers>
        <gauge:NeedlePointer Value="60"
                             NeedleLength="0.6"
                             NeedleStartWidth="2"
                             NeedleEndWidth="15"
                             KnobRadius="15" />
    </gauge:RadialAxis.Pointers>
</gauge:RadialAxis>
```

### Range Label Template

Create custom label appearances:

```xaml
<Page.Resources>
    <DataTemplate x:Key="RangeLabelTemplate">
        <Border Background="Gray"
                CornerRadius="5"
                Padding="8,4">
            <StackPanel Orientation="Horizontal"
                        Spacing="5">
                <SymbolIcon Symbol="Important"
                            Foreground="White"
                            Width="16"
                            Height="16" />
                <TextBlock Text="{Binding Label}"
                           Foreground="White"
                           FontSize="{Binding FontSize}"
                           FontWeight="Bold" />
            </StackPanel>
        </Border>
    </DataTemplate>
</Page.Resources>

<gauge:GaugeRange StartValue="0"
                  EndValue="33"
                  Label="Danger"
                  FontSize="16"
                  Background="Red"
                  LabelTemplate="{StaticResource RangeLabelTemplate}" />
```

**Template binding properties:**
- `{Binding Label}` - Range label text
- `{Binding FontSize}` - Font size
- Access to other range properties

## Common Range Patterns

### Traffic Light Zones

```xaml
<gauge:RadialAxis.Ranges>
    <!-- Red zone -->
    <gauge:GaugeRange StartValue="0"
                      EndValue="30"
                      StartWidth="15"
                      EndWidth="15"
                      Background="#F44336" />
    
    <!-- Yellow zone -->
    <gauge:GaugeRange StartValue="30"
                      EndValue="70"
                      StartWidth="15"
                      EndWidth="15"
                      Background="#FFC107" />
    
    <!-- Green zone -->
    <gauge:GaugeRange StartValue="70"
                      EndValue="100"
                      StartWidth="15"
                      EndWidth="15"
                      Background="#4CAF50" />
</gauge:RadialAxis.Ranges>
```

### Temperature Scale

```xaml
<gauge:RadialAxis Minimum="-20"
                  Maximum="50">
    <gauge:RadialAxis.Ranges>
        <!-- Freezing -->
        <gauge:GaugeRange StartValue="-20"
                          EndValue="0"
                          StartWidth="20"
                          EndWidth="20">
            <gauge:GaugeRange.GradientStops>
                <gauge:GaugeGradientStop Value="-20" Color="#1E88E5" />
                <gauge:GaugeGradientStop Value="0" Color="#00BCD4" />
            </gauge:GaugeRange.GradientStops>
        </gauge:GaugeRange>
        
        <!-- Comfortable -->
        <gauge:GaugeRange StartValue="0"
                          EndValue="25"
                          StartWidth="20"
                          EndWidth="20">
            <gauge:GaugeRange.GradientStops>
                <gauge:GaugeGradientStop Value="0" Color="#4CAF50" />
                <gauge:GaugeGradientStop Value="25" Color="#8BC34A" />
            </gauge:GaugeRange.GradientStops>
        </gauge:GaugeRange>
        
        <!-- Hot -->
        <gauge:GaugeRange StartValue="25"
                          EndValue="50"
                          StartWidth="20"
                          EndWidth="20">
            <gauge:GaugeRange.GradientStops>
                <gauge:GaugeGradientStop Value="25" Color="#FF9800" />
                <gauge:GaugeGradientStop Value="50" Color="#F44336" />
            </gauge:GaugeRange.GradientStops>
        </gauge:GaugeRange>
    </gauge:RadialAxis.Ranges>
</gauge:RadialAxis>
```

### Battery Level Indicator

```xaml
<gauge:RadialAxis Minimum="0"
                  Maximum="100"
                  ShowLabels="False"
                  ShowTicks="False"
                  StartAngle="270"
                  EndAngle="270">
    
    <gauge:RadialAxis.Ranges>
        <!-- Background track -->
        <gauge:GaugeRange StartValue="0"
                          EndValue="100"
                          StartWidth="25"
                          EndWidth="25"
                          Background="#E0E0E0" />
        
        <!-- Battery level with gradient -->
        <gauge:GaugeRange StartValue="0"
                          EndValue="75"
                          StartWidth="25"
                          EndWidth="25">
            <gauge:GaugeRange.GradientStops>
                <gauge:GaugeGradientStop Value="0" Color="#F44336" />
                <gauge:GaugeGradientStop Value="20" Color="#FF9800" />
                <gauge:GaugeGradientStop Value="50" Color="#4CAF50" />
                <gauge:GaugeGradientStop Value="75" Color="#2196F3" />
            </gauge:GaugeRange.GradientStops>
        </gauge:GaugeRange>
    </gauge:RadialAxis.Ranges>
</gauge:RadialAxis>
```

### Speedometer with Labels

```xaml
<gauge:RadialAxis Maximum="200"
                  StartAngle="180"
                  EndAngle="90">
    
    <gauge:RadialAxis.Ranges>
        <gauge:GaugeRange StartValue="0"
                          EndValue="60"
                          Label="SAFE"
                          StartWidth="0.2"
                          EndWidth="0.2"
                          WidthUnit="Factor"
                          FontSize="16"
                          Foreground="White"
                          Background="#4CAF50" />
        
        <gauge:GaugeRange StartValue="60"
                          EndValue="120"
                          Label="CAUTION"
                          StartWidth="0.2"
                          EndWidth="0.2"
                          WidthUnit="Factor"
                          FontSize="16"
                          Foreground="Black"
                          Background="#FFC107" />
        
        <gauge:GaugeRange StartValue="120"
                          EndValue="200"
                          Label="DANGER"
                          StartWidth="0.2"
                          EndWidth="0.2"
                          WidthUnit="Factor"
                          FontSize="16"
                          Foreground="White"
                          Background="#F44336" />
    </gauge:RadialAxis.Ranges>
</gauge:RadialAxis>
```

## Best Practices

1. **Use meaningful colors** - Follow conventions (red=danger, yellow=warning, green=safe)
2. **Avoid gaps** - Make ranges continuous for clear zone boundaries
3. **Use gradients** for smooth transitions rather than hard color changes
4. **Apply Factor units** for responsive sizing across different gauge sizes
5. **Label ranges** when zones need identification
6. **Layer ranges** for depth and visual interest
7. **Match range colors to pointers** for consistent theming
8. **Use UseRangeColorForAxis** for cohesive color schemes
9. **Position ranges strategically** with offsets for layered effects
10. **Keep width proportional** - avoid overly wide ranges that obscure other elements

## Troubleshooting

**Issue: Ranges not visible**
- Check StartValue and EndValue are within axis Minimum/Maximum
- Verify Background color is not transparent
- Ensure range width is sufficient
- Check if range is covered by other elements

**Issue: Gradient not showing**
- Ensure GradientStop values are within range StartValue/EndValue
- Verify colors have proper alpha channel (avoid fully transparent)
- Check that multiple gradient stops are defined

**Issue: Labels overlapping**
- Reduce FontSize for range labels
- Use shorter label text
- Apply LabelTemplate for better layout control
- Increase range width to provide more space
