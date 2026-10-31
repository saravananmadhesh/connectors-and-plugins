# Pointers

Pointers indicate values on the radial gauge axis. The radial gauge provides four pointer types, each with extensive customization options.

## Table of Contents
- [Pointer Types Overview](#pointer-types-overview)
- [Needle Pointer](#needle-pointer)
- [Shape Pointer](#shape-pointer)
- [Content Pointer](#content-pointer)
- [Range Pointer](#range-pointer)
- [Multiple Pointers](#multiple-pointers)
- [Pointer Dragging](#pointer-dragging)
- [Pointer Animation](#pointer-animation)
- [Events](#events)

## Pointer Types Overview

**Four pointer types available:**

1. **NeedlePointer** - Traditional gauge needle with knob and optional tail
2. **ShapePointer** - Marker shapes (circle, diamond, triangle, rectangle, etc.)
3. **ContentPointer** - Custom UI elements as pointers
4. **RangePointer** - Arc segment from axis start to pointer value

**Common to all pointers:**
- `Value` - The value to indicate on the axis
- `EnableAnimation` - Animate pointer movement
- `AnimationDuration` - Animation length in milliseconds
- `AnimationEasingFunction` - Easing function for animation
- `IsInteractive` - Enable drag-to-change value

## Needle Pointer

The traditional gauge needle with a knob at the center and optional tail.

### Basic Needle Pointer

```xaml
<gauge:RadialAxis.Pointers>
    <gauge:NeedlePointer Value="60" />
</gauge:RadialAxis.Pointers>
```

```csharp
NeedlePointer needlePointer = new NeedlePointer();
needlePointer.Value = 60;
radialAxis.Pointers.Add(needlePointer);
```

### Needle Customization

**Available properties:**
- `NeedleLength` - Length of needle (factor 0-1 or pixel)
- `NeedleLengthUnit` - Factor or Pixel
- `NeedleStartWidth` - Width at base
- `NeedleEndWidth` - Width at tip
- `NeedleFill` - Needle color

```xaml
<gauge:NeedlePointer Value="60"
                     NeedleLength="0.7"
                     NeedleLengthUnit="Factor"
                     NeedleStartWidth="5"
                     NeedleEndWidth="15"
                     NeedleFill="Red" />
```

```csharp
needlePointer.NeedleLength = 0.7;
needlePointer.NeedleLengthUnit = SizeUnit.Factor;
needlePointer.NeedleStartWidth = 5;
needlePointer.NeedleEndWidth = 15;
needlePointer.NeedleFill = new SolidColorBrush(Colors.Red);
```

**Length units:**
- **Factor (0-1):** Multiplied by axis radius (0.7 = 70% of radius)
- **Pixel:** Absolute pixel value

### Knob Customization

The knob is the circular element at the needle's pivot point.

```xaml
<gauge:NeedlePointer Value="60"
                     KnobRadius="0.08"
                     KnobSizeUnit="Factor"
                     KnobFill="White"
                     KnobStroke="Black"
                     KnobStrokeThickness="2" />
```

```csharp
needlePointer.KnobRadius = 0.08;
needlePointer.KnobSizeUnit = SizeUnit.Factor;
needlePointer.KnobFill = new SolidColorBrush(Colors.White);
needlePointer.KnobStroke = new SolidColorBrush(Colors.Black);
needlePointer.KnobStrokeThickness = 2;
```

### Tail Customization

The tail extends from the knob in the opposite direction of the needle.

```xaml
<gauge:NeedlePointer Value="60"
                     TailLength="0.15"
                     TailLengthUnit="Factor"
                     TailWidth="10"
                     TailFill="Gray" />
```

```csharp
needlePointer.TailLength = 0.15;
needlePointer.TailLengthUnit = SizeUnit.Factor;
needlePointer.TailWidth = 10;
needlePointer.TailFill = new SolidColorBrush(Colors.Gray);
```

### Complete Needle Example

```xaml
<gauge:NeedlePointer Value="75"
                     NeedleLength="0.8"
                     NeedleLengthUnit="Factor"
                     NeedleStartWidth="2"
                     NeedleEndWidth="12"
                     NeedleFill="#FF007ACC"
                     KnobRadius="15"
                     KnobSizeUnit="Pixel"
                     KnobFill="White"
                     KnobStroke="#FF007ACC"
                     KnobStrokeThickness="3"
                     TailLength="0.2"
                     TailLengthUnit="Factor"
                     TailWidth="8"
                     TailFill="#FF007ACC"
                     EnableAnimation="True" />
```

## Shape Pointer

Marker shapes positioned at specific values on the axis.

### Available Shapes

Set with `ShapeType` property:
- `Circle`
- `Diamond`
- `Rectangle`
- `Triangle`
- `InvertedTriangle`
- `Image`
- `Text`

### Basic Shape Pointer

```xaml
<gauge:ShapePointer Value="70"
                    ShapeType="Circle"
                    Fill="Red" />
```

```csharp
ShapePointer shapePointer = new ShapePointer();
shapePointer.Value = 70;
shapePointer.ShapeType = GaugeShapeType.Circle;
shapePointer.Fill = new SolidColorBrush(Colors.Red);
```

### Shape Customization

```xaml
<gauge:ShapePointer Value="70"
                    ShapeType="Diamond"
                    ShapeHeight="20"
                    ShapeWidth="20"
                    Fill="Orange"
                    Stroke="Black"
                    StrokeThickness="2"
                    MarkerOffset="10"
                    OffsetUnit="Pixel" />
```

**Properties:**
- `ShapeHeight` / `ShapeWidth` - Size of the shape
- `Fill` - Shape fill color
- `Stroke` - Border color
- `StrokeThickness` - Border width
- `MarkerOffset` - Distance from axis (positive = outward, negative = inward)
- `OffsetUnit` - Pixel or Factor

### Overlay and Shadow

```xaml
<gauge:ShapePointer Value="70"
                    ShapeType="Circle"
                    Fill="Red"
                    HasShadow="True"
                    OverlayFill="White"
                    OverlayRadius="0.6" />
```

**Properties:**
- `HasShadow` - Enable shadow effect
- `OverlayFill` - Inner overlay color
- `OverlayRadius` - Overlay size (0-1 of shape radius)

### Shape Pointer Examples

**Triangle marker outside axis:**
```xaml
<gauge:ShapePointer Value="80"
                    ShapeType="Triangle"
                    ShapeHeight="15"
                    ShapeWidth="15"
                    Fill="Green"
                    MarkerOffset="-20"
                    OffsetUnit="Pixel" />
```

**Circle with overlay:**
```xaml
<gauge:ShapePointer Value="60"
                    ShapeType="Circle"
                    ShapeHeight="25"
                    ShapeWidth="25"
                    Fill="#FF2196F3"
                    OverlayFill="White"
                    OverlayRadius="0.5"
                    HasShadow="True" />
```

## Content Pointer

Display custom UI elements as pointers.

### Basic Content Pointer

```xaml
<gauge:ContentPointer Value="50">
    <gauge:ContentPointer.Content>
        <TextBlock Text="50"
                   FontSize="20"
                   FontWeight="Bold"
                   Foreground="Red" />
    </gauge:ContentPointer.Content>
</gauge:ContentPointer>
```

```csharp
ContentPointer contentPointer = new ContentPointer();
contentPointer.Value = 50;
contentPointer.Content = new TextBlock 
{ 
    Text = "50", 
    FontSize = 20, 
    FontWeight = FontWeights.Bold,
    Foreground = new SolidColorBrush(Colors.Red)
};
```

### Icon Content Pointer

```xaml
<gauge:ContentPointer Value="75">
    <gauge:ContentPointer.Content>
        <SymbolIcon Symbol="Target" 
                    Foreground="Orange" />
    </gauge:ContentPointer.Content>
</gauge:ContentPointer>
```

### Image Content Pointer

```xaml
<gauge:ContentPointer Value="90">
    <gauge:ContentPointer.Content>
        <Image Source="Assets/arrow.png"
               Width="30"
               Height="30" />
    </gauge:ContentPointer.Content>
</gauge:ContentPointer>
```

### Complex Content Pointer

```xaml
<gauge:ContentPointer Value="85">
    <gauge:ContentPointer.Content>
        <Border Background="White"
                BorderBrush="Black"
                BorderThickness="2"
                CornerRadius="10"
                Padding="5">
            <StackPanel Orientation="Horizontal"
                        Spacing="5">
                <SymbolIcon Symbol="Important"
                            Foreground="Red" />
                <TextBlock Text="85"
                           FontWeight="Bold" />
            </StackPanel>
        </Border>
    </gauge:ContentPointer.Content>
</gauge:ContentPointer>
```

**Use cases:**
- Custom icons or symbols
- Formatted value displays
- Warning indicators
- Image-based pointers

## Range Pointer

Arc segment from the axis start to the pointer value, creating a filled circular progress effect.

### Basic Range Pointer

```xaml
<gauge:RangePointer Value="60"
                    PointerWidth="15"
                    Background="Blue" />
```

```csharp
RangePointer rangePointer = new RangePointer();
rangePointer.Value = 60;
rangePointer.PointerWidth = 15;
rangePointer.Background = new SolidColorBrush(Colors.Blue);
```

### Range Pointer Width

**Width in pixels:**
```xaml
<gauge:RangePointer Value="75"
                    PointerWidth="20"
                    WidthUnit="Pixel" />
```

**Width in factor (0-1):**
```xaml
<gauge:RangePointer Value="75"
                    PointerWidth="0.2"
                    WidthUnit="Factor" />
```

### Corner Style

Control the shape of the range pointer ends:

```xaml
<gauge:RangePointer Value="80"
                    PointerWidth="20"
                    CornerStyle="BothCurve"
                    Background="Green" />
```

**Options:**
- `BothFlat` - Flat ends (default)
- `BothCurve` - Rounded ends
- `StartCurve` - Rounded start, flat end
- `EndCurve` - Flat start, rounded end

### Range Pointer Offset

Position the range pointer away from the axis:

**Offset in pixels:**
```xaml
<gauge:RangePointer Value="70"
                    PointerWidth="15"
                    PointerOffset="30"
                    OffsetUnit="Pixel" />
```

**Offset in factor:**
```xaml
<gauge:RangePointer Value="70"
                    PointerWidth="0.15"
                    PointerOffset="0.2"
                    OffsetUnit="Factor"
                    WidthUnit="Factor" />
```

### Gradient Range Pointer

```xaml
<gauge:RangePointer Value="85"
                    PointerWidth="20">
    <gauge:RangePointer.GradientStops>
        <gauge:GaugeGradientStop Value="0"
                                 Color="#FF00FF00" />
        <gauge:GaugeGradientStop Value="50"
                                 Color="#FFFFFF00" />
        <gauge:GaugeGradientStop Value="85"
                                 Color="#FFFF0000" />
    </gauge:RangePointer.GradientStops>
</gauge:RangePointer>
```

```csharp
rangePointer.GradientStops.Add(new GaugeGradientStop 
{ 
    Value = 0, 
    Color = Color.FromArgb(255, 0, 255, 0) 
});
rangePointer.GradientStops.Add(new GaugeGradientStop 
{ 
    Value = 50, 
    Color = Color.FromArgb(255, 255, 255, 0) 
});
rangePointer.GradientStops.Add(new GaugeGradientStop 
{ 
    Value = 85, 
    Color = Color.FromArgb(255, 255, 0, 0) 
});
```

**Result:** Green → Yellow → Red gradient from 0 to pointer value.

### Range Pointer Examples

**Progress circle:**
```xaml
<gauge:RadialAxis ShowLabels="False"
                  ShowTicks="False"
                  StartAngle="270"
                  EndAngle="270"
                  AxisLineWidth="20"
                  AxisLineFill="LightGray">
    <gauge:RadialAxis.Pointers>
        <gauge:RangePointer Value="73"
                            PointerWidth="20"
                            Background="#4CAF50"
                            CornerStyle="BothCurve"
                            EnableAnimation="True" />
    </gauge:RadialAxis.Pointers>
</gauge:RadialAxis>
```

**Battery level indicator:**
```xaml
<gauge:RangePointer Value="45"
                    PointerWidth="30"
                    CornerStyle="EndCurve">
    <gauge:RangePointer.GradientStops>
        <gauge:GaugeGradientStop Value="20"
                                 Color="#FFFF0000" />
        <gauge:GaugeGradientStop Value="45"
                                 Color="#FF4CAF50" />
    </gauge:RangePointer.GradientStops>
</gauge:RangePointer>
```

## Multiple Pointers

Add multiple pointers to display different values on the same axis:

```xaml
<gauge:RadialAxis.Pointers>
    <!-- Range pointer for background -->
    <gauge:RangePointer Value="30"
                        PointerWidth="20"
                        Background="LightBlue" />
    
    <!-- Needle pointer for main value -->
    <gauge:NeedlePointer Value="60"
                         NeedleFill="Black" />
    
    <!-- Shape pointer for target -->
    <gauge:ShapePointer Value="70"
                        ShapeType="Triangle"
                        Fill="Red"
                        MarkerOffset="-25" />
</gauge:RadialAxis.Pointers>
```

```csharp
// Add range pointer
RangePointer rangePointer = new RangePointer { Value = 30, PointerWidth = 20 };
radialAxis.Pointers.Add(rangePointer);

// Add needle pointer
NeedlePointer needlePointer = new NeedlePointer { Value = 60 };
radialAxis.Pointers.Add(needlePointer);

// Add shape pointer
ShapePointer shapePointer = new ShapePointer 
{ 
    Value = 70, 
    ShapeType = GaugeShapeType.Triangle 
};
radialAxis.Pointers.Add(shapePointer);
```

**Use cases:**
- Current value + target value
- Multiple related metrics
- Min/max indicators with current value
- Comparison displays

## Pointer Dragging

Enable interactive dragging to change pointer values at runtime.

### Enable Dragging

```xaml
<gauge:ShapePointer Value="60"
                    IsInteractive="True"
                    ShapeType="Circle"
                    Fill="Blue" />
```

```csharp
shapePointer.IsInteractive = true;
```

**Result:** User can click and drag the pointer to change its value.

### Draggable Range Pointer Example

```xaml
<gauge:RadialAxis ShowTicks="False"
                  AxisLineFill="CornflowerBlue"
                  AxisLineWidth="30">
    <gauge:RadialAxis.Pointers>
        <gauge:ShapePointer Value="60"
                            IsInteractive="True"
                            MarkerOffset="-30"
                            ShapeType="Circle"
                            ShapeHeight="25"
                            ShapeWidth="25"
                            Fill="Indigo"
                            ValueChanged="Pointer_ValueChanged" />
    </gauge:RadialAxis.Pointers>
</gauge:RadialAxis>
```

**Use cases:**
- Volume controls
- Temperature adjustments
- Value selectors
- Configuration tools

## Pointer Animation

Animate pointer movement when value changes.

### Enable Animation

```xaml
<gauge:NeedlePointer Value="75"
                     EnableAnimation="True"
                     AnimationDuration="1500" />
```

```csharp
needlePointer.EnableAnimation = true;
needlePointer.AnimationDuration = 1500; // milliseconds
```

**Default duration:** 1500ms

### Animation with Easing

```xaml
<gauge:RangePointer Value="80"
                    PointerWidth="20"
                    EnableAnimation="True"
                    AnimationDuration="2000">
    <gauge:RangePointer.AnimationEasingFunction>
        <ElasticEase Oscillations="2"
                     Springiness="5" />
    </gauge:RangePointer.AnimationEasingFunction>
</gauge:RangePointer>
```

**Common easing functions:**
- `LinearEase` - Constant speed
- `QuadraticEase` - Accelerate/decelerate
- `ElasticEase` - Bouncy spring effect
- `BounceEase` - Bouncing effect
- `CircleEase` - Circular acceleration

See [animation.md](animation.md) for detailed animation documentation.

## Events

### ValueChangeStarted

Fires when pointer drag begins:

```xaml
<gauge:ShapePointer IsInteractive="True"
                    ValueChangeStarted="Pointer_ValueChangeStarted" />
```

```csharp
private void Pointer_ValueChangeStarted(object sender, ValueChangedEventArgs e)
{
    Debug.WriteLine($"Drag started at: {e.Value}");
}
```

### ValueChanging

Fires continuously during drag, before value updates:

```xaml
<gauge:ShapePointer IsInteractive="True"
                    ValueChanging="Pointer_ValueChanging" />
```

```csharp
private void Pointer_ValueChanging(object sender, ValueChangingEventArgs e)
{
    // Cancel if new value exceeds limit
    if (e.NewValue > 80)
    {
        e.Cancel = true;
    }
    
    Debug.WriteLine($"Changing from {e.Value} to {e.NewValue}");
}
```

**Note:** Set `e.Cancel = true` to prevent value update.

### ValueChanged

Fires when pointer value changes during drag:

```xaml
<gauge:ShapePointer IsInteractive="True"
                    ValueChanged="Pointer_ValueChanged" />
```

```csharp
private void Pointer_ValueChanged(object sender, ValueChangedEventArgs e)
{
    // Update UI with new value
    ValueTextBlock.Text = $"{e.Value:F1}";
    
    Debug.WriteLine($"Value changed to: {e.Value}");
}
```

### ValueChangeCompleted

Fires when drag ends:

```xaml
<gauge:ShapePointer IsInteractive="True"
                    ValueChangeCompleted="Pointer_ValueChangeCompleted" />
```

```csharp
private void Pointer_ValueChangeCompleted(object sender, ValueChangedEventArgs e)
{
    // Save final value
    SaveSetting("GaugeValue", e.Value);
    
    Debug.WriteLine($"Drag completed at: {e.Value}");
}
```

## Common Pointer Patterns

### Speedometer Needle
```xaml
<gauge:NeedlePointer Value="120"
                     NeedleLength="0.75"
                     NeedleStartWidth="3"
                     NeedleEndWidth="10"
                     NeedleFill="Red"
                     KnobRadius="12"
                     KnobFill="White"
                     KnobStroke="Red"
                     KnobStrokeThickness="2"
                     EnableAnimation="True" />
```

### Temperature Indicator
```xaml
<gauge:RangePointer Value="25"
                    PointerWidth="15"
                    CornerStyle="BothCurve">
    <gauge:RangePointer.GradientStops>
        <gauge:GaugeGradientStop Value="0" Color="Blue" />
        <gauge:GaugeGradientStop Value="15" Color="Green" />
        <gauge:GaugeGradientStop Value="25" Color="Red" />
    </gauge:RangePointer.GradientStops>
</gauge:RangePointer>
```

### Progress Ring
```xaml
<gauge:RangePointer Value="73"
                    PointerWidth="20"
                    Background="#4CAF50"
                    CornerStyle="BothCurve"
                    EnableAnimation="True"
                    AnimationDuration="1200" />
```

### Adjustable Dial
```xaml
<gauge:ShapePointer Value="50"
                    IsInteractive="True"
                    ShapeType="Circle"
                    ShapeHeight="30"
                    ShapeWidth="30"
                    Fill="White"
                    Stroke="Black"
                    StrokeThickness="3"
                    HasShadow="True"
                    ValueChanged="UpdateVolume" />
```

## Best Practices

1. **Use appropriate pointer types** - Needle for traditional gauges, Range for progress indicators
2. **Enable animations** for smooth transitions (1000-2000ms duration)
3. **Set IsInteractive** only when user input is needed
4. **Use Factor units** for responsive sizing
5. **Apply gradients** to range pointers for visual value indication
6. **Combine pointer types** for richer displays (range + needle)
7. **Handle ValueChanging** to validate and constrain user input
8. **Position shape pointers** with MarkerOffset for better visibility
9. **Use content pointers** for custom icons or complex indicators
10. **Animate on value changes** for better user experience
