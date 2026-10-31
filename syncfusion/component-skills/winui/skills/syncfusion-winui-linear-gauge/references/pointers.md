# Pointers in WinUI Linear Gauge

Pointers indicate values on the gauge axis. The Linear Gauge supports three pointer types: Bar Pointer, Shape Pointer, and Content Pointer. This guide covers all pointer types, customization, positioning, and interactivity.

## Table of Contents
- [Pointer Types Overview](#pointer-types-overview)
- [Bar Pointer](#bar-pointer)
- [Shape Pointer](#shape-pointer)
- [Content Pointer](#content-pointer)
- [Multiple Pointers](#multiple-pointers)
- [Pointer Interactivity](#pointer-interactivity)

## Pointer Types Overview

The Linear Gauge provides three pointer types:

1. **Bar Pointer** - Filled bar from axis start to value position
2. **Shape Pointer** - Marker with built-in or custom shapes
3. **Content Pointer** - Custom content (text, images, icons) at value position

All pointers share the base `Value` property that sets their position on the axis.

**Basic Example:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10">
            <!-- Bar Pointer -->
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="90" />
            </gauge:LinearAxis.BarPointers>
            
            <!-- Marker Pointers (Shape and Content) -->
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="90" />
                <gauge:LinearContentPointer Value="90">
                    <gauge:LinearContentPointer.Content>
                        <TextBlock Text="90%" />
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

## Bar Pointer

Bar Pointers are filled indicators that highlight values from the axis start to the current value position.

### Basic Bar Pointer

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="30" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();

BarPointer barPointer = new BarPointer();
barPointer.Value = 30;
sfLinearGauge.Axis.BarPointers.Add(barPointer);

this.Content = sfLinearGauge;
```

### Bar Pointer Size

The `PointerSize` property controls the thickness of the bar pointer.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis AxisLineStrokeThickness="30">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="30"
                                  PointerSize="30" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
sfLinearGauge.Axis.AxisLineStrokeThickness = 30;

BarPointer barPointer = new BarPointer
{
    Value = 30,
    PointerSize = 30
};
sfLinearGauge.Axis.BarPointers.Add(barPointer);
```

### Bar Pointer Background Color

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="30"
                                  Background="Indigo" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
BarPointer barPointer = new BarPointer
{
    Value = 30,
    Background = new SolidColorBrush(Colors.Indigo)
};
```

### Bar Pointer Gradient

Use `GradientStops` collection for smooth color transitions.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="40">
                    <gauge:BarPointer.GradientStops>
                        <gauge:GaugeGradientStop Value="30"
                                                 Color="#FFCC2B5E" />
                        <gauge:GaugeGradientStop Value="40"
                                                 Color="#FF753A88" />
                    </gauge:BarPointer.GradientStops>
                </gauge:BarPointer>
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
BarPointer barPointer = new BarPointer { Value = 40 };

barPointer.GradientStops.Add(new GaugeGradientStop 
{ 
    Value = 30, 
    Color = Color.FromArgb(255, 204, 43, 94) 
});

barPointer.GradientStops.Add(new GaugeGradientStop 
{ 
    Value = 40, 
    Color = Color.FromArgb(255, 117, 58, 136) 
});

sfLinearGauge.Axis.BarPointers.Add(barPointer);
```

### Bar Pointer Corner Style

The `CornerStyle` property defines the corner shape.

**Options:**
- `BothFlat` (default) - Flat corners on both ends
- `BothCurve` - Rounded corners on both ends
- `StartCurve` - Rounded start, flat end
- `EndCurve` - Flat start, rounded end

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis AxisLineStrokeThickness="10"
                          AxisLineStroke="Transparent"
                          ShowTicks="False">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="50"
                                  PointerSize="10"
                                  CornerStyle="BothCurve"/>
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
BarPointer barPointer = new BarPointer
{
    Value = 50,
    PointerSize = 10,
    CornerStyle = CornerStyle.BothCurve
};
```

### Bar Pointer Position Offset

The `Offset` property moves the pointer closer or farther from the axis line.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="50"
                                  Offset="-15" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
BarPointer barPointer = new BarPointer
{
    Value = 50,
    Offset = -15  // Negative = outward, Positive = inward
};
```

### Bar Pointer Child Content

Add custom content inside the bar pointer using the `Child` property.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowTicks="False"
                          ShowLabels="False"
                          CornerStyle="BothCurve"
                          AxisLineStrokeThickness="30">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="50"
                                  PointerSize="30"
                                  CornerStyle="BothCurve">
                    <gauge:BarPointer.Child>
                        <TextBlock Text="50%"
                                   Margin="0,0,10,0"
                                   Foreground="White"
                                   HorizontalAlignment="Right"
                                   VerticalAlignment="Center"/>
                    </gauge:BarPointer.Child>
                </gauge:BarPointer>
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
BarPointer barPointer = new BarPointer
{
    Value = 50,
    PointerSize = 30,
    CornerStyle = CornerStyle.BothCurve
};

barPointer.Child = new TextBlock
{
    Text = "50%",
    Foreground = new SolidColorBrush(Colors.White),
    Margin = new Thickness { Right = 10 },
    HorizontalAlignment = HorizontalAlignment.Right,
    VerticalAlignment = VerticalAlignment.Center
};

sfLinearGauge.Axis.BarPointers.Add(barPointer);
```

## Shape Pointer

Shape Pointers are markers that indicate specific values using various shapes.

### Built-in Shape Types

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="60" />
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 60
};
sfLinearGauge.Axis.MarkerPointers.Add(shapePointer);
```

**Available Shape Types:**
- `Circle` (default)
- `Diamond`
- `Triangle`
- `InvertedTriangle`
- `Rectangle`

**XAML Example with Different Shapes:**
```xml
<gauge:LinearAxis.MarkerPointers>
    <gauge:LinearShapePointer Value="20" ShapeType="Circle" />
    <gauge:LinearShapePointer Value="40" ShapeType="Diamond" />
    <gauge:LinearShapePointer Value="60" ShapeType="Triangle" />
    <gauge:LinearShapePointer Value="80" ShapeType="InvertedTriangle" />
    <gauge:LinearShapePointer Value="100" ShapeType="Rectangle" />
</gauge:LinearAxis.MarkerPointers>
```

### Custom Shape Template

Create custom shapes using `ShapeTemplate`.

**XAML:**
```xml
<Page.Resources>
    <DataTemplate x:Key="CustomShapePointer">
        <Grid>
            <Rectangle Fill="{Binding Fill}"
                       Stroke="{Binding Stroke}"
                       StrokeThickness="{Binding StrokeThickness}"
                       Width="{Binding ShapeHeight}"
                       Height="{Binding ShapeHeight}"
                       RadiusX="3"
                       RadiusY="3" />
        </Grid>
    </DataTemplate>
</Page.Resources>

<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="60" 
                                          ShapeTemplate="{StaticResource CustomShapePointer}"/>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 60,
    ShapeTemplate = this.Resources["CustomShapePointer"] as DataTemplate
};
```

### Shape Pointer Customization

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="60"
                                          ShapeHeight="30"
                                          ShapeWidth="30"
                                          Fill="LightBlue"
                                          Stroke="Black"
                                          StrokeThickness="3"
                                          ShapeType="Circle" />
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 60,
    ShapeHeight = 30,
    ShapeWidth = 30,
    Fill = new SolidColorBrush(Colors.LightBlue),
    Stroke = new SolidColorBrush(Colors.Black),
    StrokeThickness = 3,
    ShapeType = GaugeShapeType.Circle
};
```

### Shape Pointer Shadow

Enable shadow effect using `HasShadow` property.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="50"
                                          ShapeType="Circle"
                                          HasShadow="True"
                                          OffsetPoint="0,-12" />
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 50,
    ShapeType = GaugeShapeType.Circle,
    HasShadow = true,
    OffsetPoint = new Point(0, -12)
};
```

### Shape Pointer Positioning

Use `OffsetPoint` for X/Y offset and anchor properties for alignment.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="60"
                                          OffsetPoint="0,-25"/>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 60,
    OffsetPoint = new Point(0, -25)  // X, Y offset
};
```

**Offset Guidelines:**
- Positive X: Move right (horizontal gauge)
- Negative X: Move left
- Positive Y: Move down (inside for horizontal gauge)
- Negative Y: Move up (outside for horizontal gauge)

### Shape Pointer Anchoring

Control alignment using `HorizontalAnchor` and `VerticalAnchor`.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="60"
                                          VerticalAnchor="End"
                                          OffsetPoint="0,-5" />
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 60,
    VerticalAnchor = GaugeAnchor.End,
    OffsetPoint = new Point(0, -5)
};
```

**Anchor Options:**
- `Start` - Align to top (vertical anchor) or left (horizontal anchor)
- `Center` (default) - Align to center
- `End` - Align to bottom (vertical anchor) or right (horizontal anchor)

## Content Pointer

Content Pointers display custom content (text, images, icons) at value positions.

### Basic Content Pointer with Text

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearContentPointer Value="60">
                    <gauge:LinearContentPointer.Content>
                        <Grid Background="Orange"
                              BorderBrush="Black"
                              BorderThickness="1"
                              CornerRadius="4">
                            <TextBlock Text="60"
                                       Margin="2" />
                        </Grid>
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearContentPointer contentPointer = new LinearContentPointer { Value = 60 };

Grid contentRoot = new Grid
{
    Background = new SolidColorBrush(Colors.Orange),
    BorderBrush = new SolidColorBrush(Colors.Black),
    BorderThickness = new Thickness(1),
    CornerRadius = new CornerRadius(4)
};

contentRoot.Children.Add(new TextBlock
{
    Text = "60",
    Margin = new Thickness(2)
});

contentPointer.Content = contentRoot;
sfLinearGauge.Axis.MarkerPointers.Add(contentPointer);
```

### Content Pointer with Image/Icon

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearContentPointer Value="60"
                                            VerticalAnchor="End"
                                            OffsetPoint="0,-3">
                    <gauge:LinearContentPointer.Content>
                        <Image Source="Assets/Thumbs-Up.png"
                               Height="20"
                               Width="20" />
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearContentPointer contentPointer = new LinearContentPointer
{
    Value = 60,
    VerticalAnchor = GaugeAnchor.End,
    OffsetPoint = new Point(0, -3)
};

BitmapImage bitmapImage = new BitmapImage 
{ 
    UriSource = new Uri("ms-appx:///Assets/Thumbs-Up.png", UriKind.Absolute) 
};

Image image = new Image 
{ 
    Source = bitmapImage,
    Height = 20,
    Width = 20
};

contentPointer.Content = image;
sfLinearGauge.Axis.MarkerPointers.Add(contentPointer);
```

### Content Pointer with Path/Vector

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearContentPointer Value="60"
                                            OffsetPoint="0,-25">
                    <gauge:LinearContentPointer.Content>
                        <Path Data="M10,0 L20,10 L15,10 L15,30 L5,30 L5,10 L0,10 Z"
                              Height="40"
                              Width="20"
                              Stretch="Fill"
                              Fill="Gray" />
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Content Pointer Anchoring

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearContentPointer Value="60"
                                            VerticalAnchor="End"
                                            OffsetPoint="0,-3">
                    <gauge:LinearContentPointer.Content>
                        <TextBlock Text="60%" />
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearContentPointer contentPointer = new LinearContentPointer
{
    Value = 60,
    VerticalAnchor = GaugeAnchor.End,
    OffsetPoint = new Point(0, -3),
    Content = new TextBlock { Text = "60%" }
};
```

## Multiple Pointers

Add multiple pointers to show different values on the same axis.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10">
            <!-- Bar Pointer -->
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="90" />
            </gauge:LinearAxis.BarPointers>
            
            <!-- Multiple Marker Pointers -->
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="90"
                                          VerticalAnchor="End"
                                          OffsetPoint="0,-3" />
                
                <gauge:LinearContentPointer Value="90"
                                            VerticalAnchor="End"
                                            OffsetPoint="0,-23">
                    <gauge:LinearContentPointer.Content>
                        <TextBlock Text="90%" />
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**Use Cases:**
- Current value + target value
- Multiple metrics on same scale
- Value with threshold indicators

## Pointer Interactivity

### Enabling Draggable Pointers

Set `IsInteractive` to true on Shape Pointers to enable dragging.

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowTicks="False"
                          AxisLineStroke="CornflowerBlue"
                          AxisLineStrokeThickness="30">
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="30"
                                          IsInteractive="True"
                                          OffsetPoint="0,-15"
                                          VerticalAnchor="End"
                                          Fill="Indigo" />
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 30,
    IsInteractive = true,
    VerticalAnchor = GaugeAnchor.End,
    OffsetPoint = new Point(0, -15),
    Fill = new SolidColorBrush(Colors.Indigo)
};
```

**Note:** Only `LinearShapePointer` supports interactivity.

### Pointer Events

**Available Events:**
- `ValueChangeStarted` - Fires when drag begins
- `ValueChanging` - Fires during drag (can cancel)
- `ValueChanged` - Fires when value updates
- `ValueChangeCompleted` - Fires when drag ends

**XAML:**
```xml
<gauge:LinearShapePointer Value="30"
                          IsInteractive="True"
                          ValueChanging="OnPointerValueChanging"
                          ValueChanged="OnPointerValueChanged" />
```

**C# Event Handlers:**
```csharp
private void OnPointerValueChanging(object sender, ValueChangingEventArgs e)
{
    // Cancel if value exceeds limit
    if (e.NewValue > 60)
    {
        e.Cancel = true;
    }
}

private void OnPointerValueChanged(object sender, ValueChangedEventArgs e)
{
    // Handle value change
    double oldValue = e.OldValue;
    double newValue = e.NewValue;
    
    // Update UI or perform validation
    Debug.WriteLine($"Value changed from {oldValue} to {newValue}");
}
```

**Event Properties:**
- `ValueChangingEventArgs.NewValue` - Pending new value
- `ValueChangingEventArgs.Cancel` - Set to true to prevent update
- `ValueChangedEventArgs.OldValue` - Previous value
- `ValueChangedEventArgs.NewValue` - Current value

## Best Practices

1. **Combine Pointer Types** - Use bar + shape + content for comprehensive displays
2. **Position Carefully** - Use offsets and anchors to prevent overlapping
3. **Interactive Feedback** - Provide visual feedback during pointer dragging
4. **Value Validation** - Use `ValueChanging` event to enforce limits
5. **Consistent Sizing** - Keep pointer sizes proportional to gauge size
6. **Color Contrast** - Ensure pointers are visible against axis/range colors
7. **Accessibility** - Provide keyboard support for interactive pointers

## Common Scenarios

### Progress Bar with Percentage
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis ShowTicks="False" ShowLabels="False">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="75"
                                  PointerSize="30"
                                  CornerStyle="BothCurve">
                    <gauge:BarPointer.Child>
                        <TextBlock Text="75%" Foreground="White"
                                   HorizontalAlignment="Right"
                                   VerticalAlignment="Center"
                                   Margin="0,0,10,0" />
                    </gauge:BarPointer.Child>
                </gauge:BarPointer>
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

### Temperature Indicator with Icon
```xml
<gauge:LinearAxis Minimum="-20" Maximum="50" >
    <gauge:LinearAxis.BarPointers>
        <gauge:BarPointer Value="25" Background="OrangeRed" />
    </gauge:LinearAxis.BarPointers>
    
    <gauge:LinearAxis.MarkerPointers>
        <gauge:LinearContentPointer Value="25" VerticalAnchor="End" OffsetPoint="-30,0">
            <gauge:LinearContentPointer.Content>
                <TextBlock Text="🌡️ 25°C" FontSize="16" />
            </gauge:LinearContentPointer.Content>
        </gauge:LinearContentPointer>
    </gauge:LinearAxis.MarkerPointers>
</gauge:LinearAxis>
```

### Interactive Volume Control
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis AxisLineStrokeThickness="20" ShowTicks="False">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="60" Background="Green" PointerSize="20" />
            </gauge:LinearAxis.BarPointers>
            
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="60"
                                          IsInteractive="True"
                                          ShapeType="Circle"
                                          ShapeHeight="25"
                                          ShapeWidth="25"
                                          Fill="White"
                                          Stroke="Green"
                                          StrokeThickness="3"
                                          HasShadow="True"
                                          ValueChanged="OnVolumeChanged" />
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```
