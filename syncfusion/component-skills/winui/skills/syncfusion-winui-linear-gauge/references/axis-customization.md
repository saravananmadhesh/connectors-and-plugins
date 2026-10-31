# Axis Customization in WinUI Linear Gauge

The Linear Gauge axis is a linear scale where values are plotted. This guide covers all axis customization options including range, labels, ticks, orientation, and styling.

## Table of Contents
- [Axis Range Configuration](#axis-range-configuration)
- [Axis Direction and Orientation](#axis-direction-and-orientation)
- [Axis Line Customization](#axis-line-customization)
- [Label Customization](#label-customization)
- [Tick Customization](#tick-customization)
- [Custom Scale Ranges](#custom-scale-ranges)

## Axis Range Configuration

### Setting Minimum and Maximum Values

The axis range is defined by `Minimum` and `Maximum` properties. Default values are 0 and 100 respectively.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Minimum="-60"
                          Maximum="60" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.Minimum = -60;
sfLinearGauge.Axis.Maximum = 60;
this.Content = sfLinearGauge;
```

**Use Case:** Temperature gauges with negative and positive values.

### Setting Interval

The `Interval` property controls the spacing between axis labels.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="20" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.Interval = 20;
this.Content = sfLinearGauge;
```

**Result:** Labels appear at 0, 20, 40, 60, 80, 100.

### Maximum Labels Count

The `MaximumLabelsCount` property specifies the maximum number of labels within 100 logical pixels. This is used for automatic range calculation and doesn't work when `Interval` is set.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis MaximumLabelsCount="1" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.MaximumLabelsCount = 1;
this.Content = sfLinearGauge;
```

**Note:** Only applicable when `Interval` is not explicitly set.

## Axis Direction and Orientation

### Axis Direction (IsInversed)

The `IsInversed` property reverses the axis direction. When true, the axis runs right-to-left (horizontal) or bottom-to-top (vertical).

**XAML:**
```xml
<gauge:SfLinearGauge IsInversed="True" />
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.IsInversed = true;
this.Content = sfLinearGauge;
```

**Result:** Axis values decrease from left to right (or top to bottom for vertical).

### Mirrored Axis (IsMirrored)

The `IsMirrored` property flips the axis to the opposite side. When true, all axis elements (labels, ticks) appear on the opposite side.

**XAML:**
```xml
<gauge:SfLinearGauge IsMirrored="True" />
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.IsMirrored = true;
this.Content = sfLinearGauge;
```

**Result:** Axis elements move to the opposite side of the axis line.

### Axis Orientation

The `Orientation` property sets the gauge layout to horizontal or vertical.

**XAML (Vertical):**
```xml
<gauge:SfLinearGauge Orientation="Vertical" />
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Orientation = Orientation.Vertical;
this.Content = sfLinearGauge;
```

**Result:** Gauge displays vertically with values increasing bottom-to-top.

**Common Use Cases:**
- Horizontal: Progress bars, speed indicators
- Vertical: Temperature gauges, fuel levels, volume controls

## Axis Line Customization

### Axis Line Stroke Thickness

The `AxisLineStrokeThickness` property controls the thickness of the axis line in pixels.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis AxisLineStrokeThickness="30" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.AxisLineStrokeThickness = 30;
this.Content = sfLinearGauge;
```

### Axis Line Stroke Color

The `AxisLineStroke` property sets the axis line color.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis AxisLineStroke="BlueViolet" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.AxisLineStroke = new SolidColorBrush(Colors.BlueViolet);
this.Content = sfLinearGauge;
```

### Axis Line Style

The `AxisLineStyle` property allows custom styling using XAML styles.

**XAML:**
```xml
<Page.Resources>
    <Style x:Key="AxisLineStyle" TargetType="Line">
        <Setter Property="Stroke" Value="DarkBlue"/>
        <Setter Property="StrokeThickness" Value="5"/>
        <Setter Property="StrokeDashArray" Value="5,3"/>
    </Style>
</Page.Resources>

<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis AxisLineStyle="{StaticResource AxisLineStyle}" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.AxisLineStyle = this.Resources["AxisLineStyle"] as Style;
this.Content = sfLinearGauge;
```

### Axis Line Visibility

The `ShowAxisLine` property controls axis line visibility. Default is true.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowAxisLine="False" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.ShowAxisLine = false;
this.Content = sfLinearGauge;
```

**Use Case:** Hide axis line when using only ranges for background.

## Label Customization

### Basic Label Styling

Customize label appearance using font properties.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis FontSize="15"
                          Foreground="Red"
                          FontFamily="Comic Sans MS"
                          FontWeight="Bold"
                          FontStyle="Italic" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.FontSize = 15;
sfLinearGauge.Axis.Foreground = new SolidColorBrush(Colors.Red);
sfLinearGauge.Axis.FontFamily = new FontFamily("Comic Sans MS");
sfLinearGauge.Axis.FontWeight = FontWeights.SemiBold;
sfLinearGauge.Axis.FontStyle = Windows.UI.Text.FontStyle.Italic;
this.Content = sfLinearGauge;
```

### Label Format

The `LabelFormat` property formats labels using standard or custom format strings.

**XAML (Currency Format):**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis LabelFormat="c" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.LabelFormat = "c"; // Currency format
this.Content = sfLinearGauge;
```

**Common Format Strings:**
- `"c"` - Currency: $0, $10, $20
- `"n2"` - Number with 2 decimals: 0.00, 10.00, 20.00
- `"p"` - Percentage: 0%, 10%, 20%
- `"0°"` - Custom with degree symbol: 0°, 10°, 20°

### Label Template

The `LabelTemplate` property allows complete customization of label appearance.

**XAML:**
```xml
<Page.Resources>
    <DataTemplate x:Key="LabelTemplate">
        <Border Background="Gray"
                CornerRadius="5">
            <TextBlock Text="{Binding Text}"
                       Foreground="White"
                       FontStyle="Normal"
                       FontWeight="Bold"
                       Margin="3" />
        </Border>
    </DataTemplate>
</Page.Resources>

<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis LabelTemplate="{StaticResource LabelTemplate}" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.LabelTemplate = this.Resources["LabelTemplate"] as DataTemplate;
this.Content = sfLinearGauge;
```

**Context:** The DataContext provides a `Text` property containing the formatted label value.

### Label Visibility

The `ShowLabels` property controls label visibility. Default is true.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowLabels="False" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.ShowLabels = false;
this.Content = sfLinearGauge;
```

### Label Placement

The `LabelPosition` property positions labels inside or outside the axis line.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis LabelPosition="Outside" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.LabelPosition = GaugeLabelsPosition.Outside;
this.Content = sfLinearGauge;
```

**Options:**
- `Inside` (default) - Labels inside the axis line
- `Outside` - Labels outside the axis line

### Label Offset

The `LabelOffset` property adjusts the distance between the axis line and labels. Default is 5.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis LabelOffset="40" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.LabelOffset = 40;
this.Content = sfLinearGauge;
```

**Use Case:** Increase spacing between labels and axis when using thick axis lines.

## Tick Customization

### Tick Length

Configure major and minor tick lengths using `MajorTickLength` and `MinorTickLength` properties.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis MajorTickLength="15"
                          MinorTickLength="10" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.MajorTickLength = 15;
sfLinearGauge.Axis.MinorTickLength = 10;
this.Content = sfLinearGauge;
```

### Major Tick Style

The `MajorTickStyle` property customizes major tick appearance.

**XAML:**
```xml
<Page.Resources>
    <Style x:Key="MajorTickLineStyle" TargetType="Line">
        <Setter Property="Stroke" Value="Black"/>
        <Setter Property="StrokeThickness" Value="1.5"/>
    </Style>
</Page.Resources>

<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis MajorTickStyle="{StaticResource MajorTickLineStyle}" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.MajorTickStyle = this.Resources["MajorTickLineStyle"] as Style;
this.Content = sfLinearGauge;
```

### Minor Tick Style

The `MinorTickStyle` property customizes minor tick appearance.

**XAML:**
```xml
<Page.Resources>
    <Style x:Key="MinorTickLineStyle" TargetType="Line">
        <Setter Property="Stroke" Value="Black"/>
        <Setter Property="StrokeThickness" Value="1.5"/>
    </Style>
</Page.Resources>

<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis MinorTickStyle="{StaticResource MinorTickLineStyle}" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.MinorTickStyle = this.Resources["MinorTickLineStyle"] as Style;
this.Content = sfLinearGauge;
```

### Dashed Tick Lines

Create dashed tick lines by setting `StrokeDashArray` in tick styles.

**XAML:**
```xml
<Page.Resources>
    <Style x:Key="MajorTickLineStyle" TargetType="Line">
        <Setter Property="Stroke" Value="Black"/>
        <Setter Property="StrokeDashArray" Value="5,2.5"/>
    </Style>
    
    <Style x:Key="MinorTickLineStyle" TargetType="Line">
        <Setter Property="Stroke" Value="Black"/>
        <Setter Property="StrokeDashArray" Value="3,2.5"/>
    </Style>
</Page.Resources>

<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis MajorTickLength="15"
                          MinorTickLength="10"
                          MajorTickStyle="{StaticResource MajorTickLineStyle}"
                          MinorTickStyle="{StaticResource MinorTickLineStyle}" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Minor Ticks Per Interval

The `MinorTicksPerInterval` property sets the number of minor ticks between major ticks. Default is 1.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis MinorTicksPerInterval="4" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.MinorTicksPerInterval = 4;
this.Content = sfLinearGauge;
```

**Result:** 4 minor ticks between each pair of major ticks.

### Tick Visibility

The `ShowTicks` property controls visibility of both major and minor ticks. Default is true.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowTicks="False" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.ShowTicks = false;
this.Content = sfLinearGauge;
```

### Tick Placement

The `TickPosition` property positions ticks inside, outside, or centered on the axis line.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis TickPosition="Outside" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.TickPosition = GaugeElementPosition.Outside;
this.Content = sfLinearGauge;
```

**Options:**
- `Inside` (default) - Ticks point inward from axis line
- `Outside` - Ticks point outward from axis line
- `Cross` - Ticks centered on axis line

### Tick Offset

The `TickOffset` property adjusts the distance between the axis line and ticks. Default is 0.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis TickOffset="50" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.TickOffset = 50;
this.Content = sfLinearGauge;
```

## Custom Scale Ranges

You can create custom axis scales (like logarithmic) by extending the `LinearAxis` class and overriding specific methods.

### Logarithmic Axis Example

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <local:LogarithmicAxis Minimum="1"
                               Maximum="10000" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C# (LogarithmicAxis.cs):**
```csharp
using Syncfusion.UI.Xaml.Gauges;
using System;
using System.Collections.Generic;

public class LogarithmicAxis : LinearAxis
{
    private int labelsCount;

    public override List<AxisLabelData> GenerateVisibleLabels()
    {
        List<AxisLabelData> labelInfos = new List<AxisLabelData>();
        int minimum = (int)LogBase(this.Minimum, 10);
        int maximum = (int)LogBase(this.Maximum, 10);
        
        for (int i = minimum; i <= maximum; i++)
        {
            double value = Math.Floor(Math.Pow(10, i));
            AxisLabelData label = new AxisLabelData()
            {
                Value = value,
                Text = value.ToString()
            };
            labelInfos.Add(label);
        }

        labelsCount = labelInfos.Count;
        return labelInfos;
    }

    private double LogBase(double value, int baseValue)
    {
        return Math.Log(value) / Math.Log(baseValue);
    }

    public override double ValueToFactor(double value)
    {
        return LogBase(value, 10) / (labelsCount - 1);
    }

    public override double FactorToValue(double factor)
    {
        return Math.Pow(Math.E, factor * (labelsCount - 1) * Math.Log(10));
    }
}
```

**Key Methods:**
- `GenerateVisibleLabels()` - Creates custom label values and text
- `ValueToFactor(double value)` - Converts axis value to position factor (0 to 1)
- `FactorToValue(double factor)` - Converts position factor back to axis value

**Use Case:** Scientific data visualization, exponential growth charts, frequency scales.

## Best Practices

1. **Choose appropriate intervals** - Balance between too many and too few labels
2. **Use label formatting** - Apply currency, percentage, or custom formats for clarity
3. **Optimize tick visibility** - Hide ticks for minimal designs, show for precision
4. **Match tick and label positions** - Keep both inside or outside for consistency
5. **Use custom scales sparingly** - Only when standard linear scale doesn't fit data
6. **Test different orientations** - Vertical works better for some data types
7. **Consider accessibility** - Ensure sufficient color contrast and font sizes

## Common Scenarios

### Minimal Gauge (No Labels/Ticks)
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowLabels="False"
                          ShowTicks="False" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Temperature Gauge (-60 to 60)
```xml
<gauge:SfLinearGauge Orientation="Vertical">
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Minimum="-60"
                          Maximum="60"
                          Interval="20"
                          LabelFormat="0°" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Percentage Progress (0% to 100%)
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Minimum="0"
                          Maximum="100"
                          Interval="25"
                          LabelFormat="0'%'" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Thick Axis with Outside Elements
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis AxisLineStrokeThickness="30"
                          LabelPosition="Outside"
                          TickPosition="Outside"
                          LabelOffset="15"
                          TickOffset="5" />
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```
