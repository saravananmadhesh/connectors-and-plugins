# Annotations

Annotations allow you to add custom UI elements such as text, images, or complex controls at specific positions on the radial gauge. They're useful for displaying values, labels, icons, or any WinUI UIElement.

## Table of Contents
- [Basic Annotations](#basic-annotations)
- [Positioning Annotations](#positioning-annotations)
- [Image Annotations](#image-annotations)
- [Alignment](#alignment)
- [Complex Annotations](#complex-annotations)
- [Common Annotation Patterns](#common-annotation-patterns)

## Basic Annotations

### Text Annotation

Add simple text at a specific position:

```xaml
<gauge:RadialAxis.Annotations>
    <gauge:GaugeAnnotation DirectionUnit="AxisValue"
                           DirectionValue="50">
        <gauge:GaugeAnnotation.Content>
            <TextBlock Text="50.0"
                       FontWeight="SemiBold"
                       FontSize="20" />
        </gauge:GaugeAnnotation.Content>
    </gauge:GaugeAnnotation>
</gauge:RadialAxis.Annotations>
```

```csharp
GaugeAnnotation gaugeAnnotation = new GaugeAnnotation();
gaugeAnnotation.DirectionUnit = AnnotationDirection.AxisValue;
gaugeAnnotation.DirectionValue = 50;
gaugeAnnotation.Content = new TextBlock 
{ 
    Text = "50.0", 
    FontWeight = FontWeights.SemiBold, 
    FontSize = 20 
};
radialAxis.Annotations.Add(gaugeAnnotation);
```

### Styled Text Annotation

```xaml
<gauge:GaugeAnnotation>
    <gauge:GaugeAnnotation.Content>
        <TextBlock Foreground="Red"
                   FontSize="30"
                   FontFamily="Arial"
                   FontWeight="Bold"
                   TextAlignment="Center">
            <Run Text="85" FontSize="40" />
            <Run Text=" km/h" FontSize="20" />
        </TextBlock>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

## Positioning Annotations

Annotations can be positioned using either **angle** or **axis value**, and their distance from center is controlled by `PositionFactor`.

### Key Properties

- **DirectionUnit** - `Angle` or `AxisValue`
- **DirectionValue** - The angle (0-360°) or axis value
- **PositionFactor** - Distance from center (0 = center, 1 = edge)

### Positioning Using Angle

Position annotation at a specific angle (0° = right, 90° = bottom, 180° = left, 270° = top):

```xaml
<gauge:GaugeAnnotation DirectionUnit="Angle"
                       DirectionValue="90"
                       PositionFactor="0.5">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Bottom"
                   FontSize="20" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

```csharp
gaugeAnnotation.DirectionUnit = AnnotationDirection.Angle;
gaugeAnnotation.DirectionValue = 90; // Bottom position
gaugeAnnotation.PositionFactor = 0.5; // Midway from center
```

**Common angles:**
- `0°` - Right (3 o'clock)
- `90°` - Bottom (6 o'clock)
- `180°` - Left (9 o'clock)
- `270°` - Top (12 o'clock)

### Positioning Using Axis Value

Position annotation at a specific axis value:

```xaml
<gauge:RadialAxis Maximum="100">
    <gauge:RadialAxis.Pointers>
        <gauge:NeedlePointer Value="60" />
    </gauge:RadialAxis.Pointers>
    
    <gauge:RadialAxis.Annotations>
        <!-- Annotation at pointer position -->
        <gauge:GaugeAnnotation DirectionUnit="AxisValue"
                               DirectionValue="60"
                               PositionFactor="0.4">
            <gauge:GaugeAnnotation.Content>
                <TextBlock Text="60"
                           FontSize="25"
                           FontWeight="Bold" />
            </gauge:GaugeAnnotation.Content>
        </gauge:GaugeAnnotation>
    </gauge:RadialAxis.Annotations>
</gauge:RadialAxis>
```

```csharp
gaugeAnnotation.DirectionUnit = AnnotationDirection.AxisValue;
gaugeAnnotation.DirectionValue = 60; // At axis value 60
gaugeAnnotation.PositionFactor = 0.4; // 40% from center
```

**Use case:** Display value at pointer position

### PositionFactor Explained

The `PositionFactor` controls distance from the gauge center:

- `0.0` - At the center
- `0.5` - Halfway to the edge
- `1.0` - At the gauge edge
- `>1.0` - Beyond the gauge edge (outside)

```xaml
<!-- Center annotation -->
<gauge:GaugeAnnotation PositionFactor="0">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Center" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>

<!-- Edge annotation -->
<gauge:GaugeAnnotation PositionFactor="1.2">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Outside" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

## Image Annotations

Add images to enhance the gauge visual design.

### Basic Image

```xaml
<gauge:GaugeAnnotation PositionFactor="0">
    <gauge:GaugeAnnotation.Content>
        <Image Source="Assets/speedometer-icon.png"
               Width="60"
               Height="60" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

```csharp
BitmapImage bm = new BitmapImage();
bm.UriSource = new Uri("ms-appx:/Assets/speedometer-icon.png", UriKind.Absolute);
Image image = new Image { Source = bm, Width = 60, Height = 60 };

gaugeAnnotation.Content = image;
gaugeAnnotation.PositionFactor = 0;
```

### Image with Text

Combine images and text in a layout:

```xaml
<gauge:GaugeAnnotation>
    <gauge:GaugeAnnotation.Content>
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="*" />
                <RowDefinition Height="Auto" />
            </Grid.RowDefinitions>
            
            <Image Source="Assets/cloud.png"
                   Grid.Row="0"
                   Height="50"
                   Width="60" />
            
            <TextBlock Text="73°F"
                       Grid.Row="1"
                       FontSize="25"
                       FontWeight="SemiBold"
                       HorizontalAlignment="Center" />
        </Grid>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

### Weather Gauge Example

```xaml
<gauge:RadialAxis Interval="10"
                  StartAngle="0"
                  EndAngle="360"
                  ShowTicks="False"
                  ShowLabels="False"
                  AxisLineWidth="30">
    
    <gauge:RadialAxis.Pointers>
        <gauge:RangePointer Value="73"
                            PointerWidth="30"
                            EnableAnimation="True"
                            Background="#FFFCE38A"
                            CornerStyle="BothCurve" />
    </gauge:RadialAxis.Pointers>
    
    <gauge:RadialAxis.Annotations>
        <gauge:GaugeAnnotation>
            <gauge:GaugeAnnotation.Content>
                <Grid>
                    <Grid.RowDefinitions>
                        <RowDefinition Height="*" />
                        <RowDefinition Height="Auto" />
                    </Grid.RowDefinitions>
                    
                    <Image Source="Assets/weather-icon.png"
                           Height="50"
                           Width="60" />
                    
                    <TextBlock Text="73°F"
                               Grid.Row="1"
                               FontSize="25"
                               FontWeight="SemiBold"
                               HorizontalAlignment="Left" />
                </Grid>
            </gauge:GaugeAnnotation.Content>
        </gauge:GaugeAnnotation>
    </gauge:RadialAxis.Annotations>
</gauge:RadialAxis>
```

## Alignment

Control annotation alignment using `HorizontalAlignment` and `VerticalAlignment` properties.

### Horizontal Alignment

```xaml
<!-- Left aligned -->
<gauge:GaugeAnnotation DirectionUnit="AxisValue"
                       DirectionValue="50"
                       PositionFactor="0.4"
                       HorizontalAlignment="Left">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="50.0" FontSize="20" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>

<!-- Center aligned (default) -->
<gauge:GaugeAnnotation HorizontalAlignment="Center">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Center" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>

<!-- Right aligned -->
<gauge:GaugeAnnotation HorizontalAlignment="Right">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Right" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

**Options:** `Left`, `Center`, `Right`, `Stretch`

### Vertical Alignment

```xaml
<!-- Top aligned -->
<gauge:GaugeAnnotation VerticalAlignment="Top">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Top" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>

<!-- Center aligned (default) -->
<gauge:GaugeAnnotation VerticalAlignment="Center">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Center" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>

<!-- Bottom aligned -->
<gauge:GaugeAnnotation VerticalAlignment="Bottom">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="Bottom" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

**Options:** `Top`, `Center`, `Bottom`, `Stretch`

### Combined Alignment Example

```xaml
<gauge:GaugeAnnotation DirectionUnit="AxisValue"
                       DirectionValue="75"
                       PositionFactor="0.5"
                       HorizontalAlignment="Right"
                       VerticalAlignment="Bottom">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="75"
                   FontSize="18"
                   Foreground="Red" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

## Complex Annotations

### Bordered Text

```xaml
<gauge:GaugeAnnotation>
    <gauge:GaugeAnnotation.Content>
        <Border Background="White"
                BorderBrush="Black"
                BorderThickness="2"
                CornerRadius="10"
                Padding="10">
            <TextBlock Text="SPEED"
                       FontSize="18"
                       FontWeight="Bold"
                       Foreground="Black" />
        </Border>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

### Icon with Value

```xaml
<gauge:GaugeAnnotation>
    <gauge:GaugeAnnotation.Content>
        <StackPanel Orientation="Horizontal"
                    Spacing="8">
            <SymbolIcon Symbol="Home"
                        Foreground="#FF2196F3" />
            <TextBlock Text="72°"
                       FontSize="24"
                       FontWeight="SemiBold"
                       VerticalAlignment="Center" />
        </StackPanel>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

### Multi-Line Text

```xaml
<gauge:GaugeAnnotation>
    <gauge:GaugeAnnotation.Content>
        <StackPanel>
            <TextBlock Text="Current"
                       FontSize="14"
                       Foreground="Gray"
                       HorizontalAlignment="Center" />
            <TextBlock Text="85"
                       FontSize="40"
                       FontWeight="Bold"
                       HorizontalAlignment="Center" />
            <TextBlock Text="km/h"
                       FontSize="16"
                       Foreground="Gray"
                       HorizontalAlignment="Center" />
        </StackPanel>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

### Custom Progress Display

```xaml
<gauge:GaugeAnnotation>
    <gauge:GaugeAnnotation.Content>
        <Grid Width="120"
              Height="80">
            <Border Background="#F5F5F5"
                    CornerRadius="8"
                    Padding="10">
                <StackPanel Spacing="5">
                    <TextBlock Text="Progress"
                               FontSize="12"
                               Foreground="Gray"
                               HorizontalAlignment="Center" />
                    <TextBlock FontSize="32"
                               FontWeight="Bold"
                               HorizontalAlignment="Center">
                        <Run Text="73" />
                        <Run Text="%" FontSize="20" />
                    </TextBlock>
                    <ProgressBar Value="73"
                                 Maximum="100"
                                 Height="6" />
                </StackPanel>
            </Border>
        </Grid>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

## Common Annotation Patterns

### Center Value Display

```xaml
<gauge:GaugeAnnotation PositionFactor="0">
    <gauge:GaugeAnnotation.Content>
        <StackPanel>
            <TextBlock Text="85"
                       FontSize="48"
                       FontWeight="Bold"
                       HorizontalAlignment="Center" />
            <TextBlock Text="km/h"
                       FontSize="16"
                       Foreground="Gray"
                       HorizontalAlignment="Center" />
        </StackPanel>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

### Label at Top

```xaml
<gauge:GaugeAnnotation DirectionUnit="Angle"
                       DirectionValue="270"
                       PositionFactor="0.7">
    <gauge:GaugeAnnotation.Content>
        <TextBlock Text="SPEED"
                   FontSize="14"
                   FontWeight="SemiBold"
                   Foreground="Gray" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

### Warning Icon

```xaml
<gauge:GaugeAnnotation DirectionUnit="AxisValue"
                       DirectionValue="90"
                       PositionFactor="0.85">
    <gauge:GaugeAnnotation.Content>
        <Border Background="#FFFFC107"
                CornerRadius="15"
                Padding="5">
            <SymbolIcon Symbol="Important"
                        Foreground="White" />
        </Border>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

### Unit Labels Around Gauge

```xaml
<gauge:RadialAxis.Annotations>
    <!-- Top label -->
    <gauge:GaugeAnnotation DirectionUnit="Angle"
                           DirectionValue="270"
                           PositionFactor="1.15">
        <gauge:GaugeAnnotation.Content>
            <TextBlock Text="MAX" />
        </gauge:GaugeAnnotation.Content>
    </gauge:GaugeAnnotation>
    
    <!-- Bottom label -->
    <gauge:GaugeAnnotation DirectionUnit="Angle"
                           DirectionValue="90"
                           PositionFactor="1.15">
        <gauge:GaugeAnnotation.Content>
            <TextBlock Text="MIN" />
        </gauge:GaugeAnnotation.Content>
    </gauge:GaugeAnnotation>
</gauge:RadialAxis.Annotations>
```

### Dynamic Value Binding

```xaml
<gauge:GaugeAnnotation x:Name="valueAnnotation">
    <gauge:GaugeAnnotation.Content>
        <TextBlock x:Name="valueTextBlock"
                   FontSize="36"
                   FontWeight="Bold" />
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

```csharp
// Update annotation text when pointer value changes
private void Pointer_ValueChanged(object sender, ValueChangedEventArgs e)
{
    valueTextBlock.Text = $"{e.Value:F1}";
    
    // Update annotation position to follow pointer
    valueAnnotation.DirectionUnit = AnnotationDirection.AxisValue;
    valueAnnotation.DirectionValue = e.Value;
}
```

## Best Practices

1. **Center critical information** - Use PositionFactor = 0 for main value displays
2. **Use AxisValue positioning** - For annotations that follow pointer positions
3. **Apply proper alignment** - Prevent annotations from appearing cut off
4. **Keep text readable** - Use appropriate font sizes and contrasting colors
5. **Leverage layouts** - Use Grid, StackPanel for complex annotation designs
6. **Position labels outside** - Use PositionFactor > 1 for labels around gauge perimeter
7. **Combine elements** - Mix text, icons, and images for rich displays
8. **Update dynamically** - Bind annotation content to pointer values
9. **Use borders for emphasis** - Add backgrounds to make annotations stand out
10. **Consider gauge size** - Scale annotation sizes appropriately

## Troubleshooting

**Issue: Annotation not visible**
- Check PositionFactor is within reasonable range (0-1.5)
- Verify Content is not null
- Ensure colors contrast with background
- Check DirectionValue is within axis range (for AxisValue mode)

**Issue: Annotation cut off**
- Adjust HorizontalAlignment/VerticalAlignment
- Reduce PositionFactor if too close to edge
- Decrease font size or element size
- Increase gauge size

**Issue: Annotation not positioned correctly**
- Verify DirectionUnit matches intended positioning method
- Check DirectionValue is valid (0-360 for Angle, within axis range for AxisValue)
- Adjust PositionFactor for desired distance
- Ensure axis StartAngle/EndAngle are set correctly

**Issue: Multiple annotations overlapping**
- Adjust PositionFactor to different distances
- Use different DirectionValues to separate positions
- Reduce annotation sizes
- Consider using fewer annotations
