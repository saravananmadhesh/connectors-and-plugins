# Animation

Pointer animations provide smooth, visually appealing transitions when pointer values change. This enhances user experience and makes value changes more noticeable.

## Enabling Pointer Animation

### Basic Animation

Enable animation using the `EnableAnimation` property:

```xaml
<gauge:NeedlePointer Value="60"
                     EnableAnimation="True" />
```

```csharp
needlePointer.EnableAnimation = true;
```

**Default:** false (no animation)

### Complete Example

```xaml
<gauge:RadialAxis AxisLineWidth="30"
                  ShowTicks="False">
    <gauge:RadialAxis.Pointers>
        <gauge:NeedlePointer Value="60"
                             EnableAnimation="True"
                             NeedleStartWidth="0"
                             NeedleEndWidth="15"
                             NeedleFill="#FFDADADA"
                             KnobFill="White"
                             KnobStroke="#FFDADADA"
                             KnobRadius="0.06"
                             KnobStrokeThickness="0.04"
                             TailFill="#FFDADADA"
                             TailLength="0.15"
                             TailWidth="15" />
        
        <gauge:RangePointer Value="60"
                            PointerWidth="30"
                            EnableAnimation="True"
                            Background="Orange" />
    </gauge:RadialAxis.Pointers>
</gauge:RadialAxis>
```

**Result:** Both needle and range pointers animate smoothly from 0 to 60 on load, and animate on subsequent value changes.

## Animation Duration

Control how long the animation takes using `AnimationDuration` (in milliseconds).

### Setting Duration

```xaml
<gauge:NeedlePointer Value="75"
                     EnableAnimation="True"
                     AnimationDuration="3000" />
```

```csharp
needlePointer.EnableAnimation = true;
needlePointer.AnimationDuration = 3000; // 3 seconds
```

**Default:** 1500ms (1.5 seconds)

### Duration Recommendations

- **Quick updates** (100-500ms): Real-time data, frequent updates
- **Standard** (1000-2000ms): General purpose, balanced feel
- **Slow/dramatic** (2000-4000ms): Initial load, emphasis on change
- **Very slow** (>4000ms): Tutorial/demo purposes

### Example with Different Durations

```xaml
<gauge:RadialAxis>
    <gauge:RadialAxis.Pointers>
        <!-- Fast animation (500ms) -->
        <gauge:ShapePointer Value="30"
                            EnableAnimation="True"
                            AnimationDuration="500"
                            ShapeType="Circle"
                            Fill="Blue" />
        
        <!-- Standard animation (1500ms) -->
        <gauge:NeedlePointer Value="60"
                             EnableAnimation="True"
                             AnimationDuration="1500" />
        
        <!-- Slow animation (3000ms) -->
        <gauge:RangePointer Value="80"
                            PointerWidth="20"
                            EnableAnimation="True"
                            AnimationDuration="3000"
                            Background="Green" />
    </gauge:RadialAxis.Pointers>
</gauge:RadialAxis>
```

**Result:** Three pointers animate at different speeds.

## Animation Easing Functions

Easing functions control the acceleration and deceleration of animations, creating different motion effects.

### Available Easing Functions

WinUI provides built-in easing functions:

- **LinearEase** - Constant speed (no acceleration)
- **QuadraticEase** - Gradual acceleration/deceleration
- **CubicEase** - More pronounced acceleration/deceleration
- **QuarticEase** - Even more pronounced
- **QuinticEase** - Very pronounced
- **SineEase** - Smooth, wave-like motion
- **ExponentialEase** - Exponential acceleration
- **CircleEase** - Circular acceleration curve
- **ElasticEase** - Spring/bouncy effect
- **BounceEase** - Bouncing effect
- **BackEase** - Slight overshoot and return

### Basic Easing Example

```xaml
<gauge:NeedlePointer Value="75"
                     EnableAnimation="True"
                     AnimationDuration="2000">
    <gauge:NeedlePointer.AnimationEasingFunction>
        <QuadraticEase EasingMode="EaseInOut" />
    </gauge:NeedlePointer.AnimationEasingFunction>
</gauge:NeedlePointer>
```

```csharp
needlePointer.AnimationEasingFunction = new QuadraticEase 
{ 
    EasingMode = EasingMode.EaseInOut 
};
```

### Easing Modes

All easing functions support three modes:

- **EaseIn** - Accelerate at start, constant at end
- **EaseOut** - Constant at start, decelerate at end
- **EaseInOut** - Accelerate at start, decelerate at end (default)

```xaml
<!-- Accelerate at start only -->
<QuadraticEase EasingMode="EaseIn" />

<!-- Decelerate at end only -->
<QuadraticEase EasingMode="EaseOut" />

<!-- Smooth start and end -->
<QuadraticEase EasingMode="EaseInOut" />
```

## Common Easing Functions

### ElasticEase (Spring/Bounce Effect)

Creates a spring-like wobble:

```xaml
<gauge:RangePointer Value="80"
                    PointerWidth="20"
                    EnableAnimation="True"
                    AnimationDuration="2000"
                    Background="Orange">
    <gauge:RangePointer.AnimationEasingFunction>
        <ElasticEase Oscillations="2"
                     Springiness="5"
                     EasingMode="EaseOut" />
    </gauge:RangePointer.AnimationEasingFunction>
</gauge:RangePointer>
```

**Properties:**
- `Oscillations` - Number of bounces (default: 3)
- `Springiness` - Stiffness of spring (default: 3)

**Use cases:** Playful interfaces, attention-grabbing animations

### BounceEase

Creates a bouncing effect at the end:

```xaml
<gauge:NeedlePointer Value="90"
                     EnableAnimation="True"
                     AnimationDuration="1500">
    <gauge:NeedlePointer.AnimationEasingFunction>
        <BounceEase Bounces="3"
                    Bounciness="2"
                    EasingMode="EaseOut" />
    </gauge:NeedlePointer.AnimationEasingFunction>
</gauge:NeedlePointer>
```

**Properties:**
- `Bounces` - Number of bounces (default: 3)
- `Bounciness` - Height of bounces (default: 2)

### BackEase (Overshoot)

Slightly overshoots then returns:

```xaml
<gauge:ShapePointer Value="70"
                    EnableAnimation="True"
                    AnimationDuration="1200"
                    ShapeType="Circle"
                    Fill="Red">
    <gauge:ShapePointer.AnimationEasingFunction>
        <BackEase Amplitude="0.5"
                  EasingMode="EaseInOut" />
    </gauge:ShapePointer.AnimationEasingFunction>
</gauge:ShapePointer>
```

**Properties:**
- `Amplitude` - Amount of overshoot (default: 1)

### ExponentialEase (Fast Acceleration)

```xaml
<gauge:RangePointer Value="85"
                    PointerWidth="25"
                    EnableAnimation="True"
                    AnimationDuration="1000">
    <gauge:RangePointer.AnimationEasingFunction>
        <ExponentialEase Exponent="7"
                         EasingMode="EaseIn" />
    </gauge:RangePointer.AnimationEasingFunction>
</gauge:RangePointer>
```

**Properties:**
- `Exponent` - Curve intensity (default: 2)

### CircleEase (Circular Motion)

```xaml
<gauge:NeedlePointer Value="60"
                     EnableAnimation="True"
                     AnimationDuration="1800">
    <gauge:NeedlePointer.AnimationEasingFunction>
        <CircleEase EasingMode="EaseInOut" />
    </gauge:NeedlePointer.AnimationEasingFunction>
</gauge:NeedlePointer>
```

**Use cases:** Smooth, natural-feeling animations

## Complete Animation Examples

### Speedometer with Elastic Animation

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis Maximum="200"
                          StartAngle="180"
                          EndAngle="90"
                          AxisLineWidth="30"
                          ShowTicks="False">
            
            <gauge:RadialAxis.Pointers>
                <gauge:NeedlePointer Value="120"
                                     EnableAnimation="True"
                                     AnimationDuration="2000"
                                     NeedleLength="0.75"
                                     NeedleStartWidth="3"
                                     NeedleEndWidth="12"
                                     NeedleFill="Red"
                                     KnobRadius="15"
                                     KnobFill="White"
                                     KnobStroke="Red">
                    <gauge:NeedlePointer.AnimationEasingFunction>
                        <ElasticEase Oscillations="2"
                                     Springiness="4" />
                    </gauge:NeedlePointer.AnimationEasingFunction>
                </gauge:NeedlePointer>
            </gauge:RadialAxis.Pointers>
        </gauge:RadialAxis>
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

### Progress Circle with Bounce

```xaml
<gauge:SfRadialGauge>
    <gauge:SfRadialGauge.Axes>
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
                                    EnableAnimation="True"
                                    AnimationDuration="1500">
                    <gauge:RangePointer.AnimationEasingFunction>
                        <BounceEase Bounces="2"
                                    Bounciness="1.5"
                                    EasingMode="EaseOut" />
                    </gauge:RangePointer.AnimationEasingFunction>
                </gauge:RangePointer>
            </gauge:RadialAxis.Pointers>
        </gauge:RadialAxis>
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

### Multiple Pointers with Different Easing

```xaml
<gauge:RadialAxis AxisLineWidth="30"
                  ShowTicks="False">
    <gauge:RadialAxis.Pointers>
        <!-- Needle with elastic -->
        <gauge:NeedlePointer Value="60"
                             EnableAnimation="True"
                             AnimationDuration="2000">
            <gauge:NeedlePointer.AnimationEasingFunction>
                <ElasticEase Oscillations="1" />
            </gauge:NeedlePointer.AnimationEasingFunction>
        </gauge:NeedlePointer>
        
        <!-- Range with exponential -->
        <gauge:RangePointer Value="60"
                            PointerWidth="30"
                            EnableAnimation="True"
                            AnimationDuration="1500"
                            Background="Orange">
            <gauge:RangePointer.AnimationEasingFunction>
                <ExponentialEase EasingMode="EaseOut" />
            </gauge:RangePointer.AnimationEasingFunction>
        </gauge:RangePointer>
    </gauge:RadialAxis.Pointers>
</gauge:RadialAxis>
```

## Animation on Value Changes

Animations work automatically when pointer values change:

```csharp
public sealed partial class MainWindow : Window
{
    private NeedlePointer needlePointer;
    
    public MainWindow()
    {
        this.InitializeComponent();
        SetupGauge();
    }
    
    private void SetupGauge()
    {
        needlePointer = new NeedlePointer();
        needlePointer.Value = 0;
        needlePointer.EnableAnimation = true;
        needlePointer.AnimationDuration = 1500;
        needlePointer.AnimationEasingFunction = new QuadraticEase 
        { 
            EasingMode = EasingMode.EaseInOut 
        };
        
        radialAxis.Pointers.Add(needlePointer);
    }
    
    private void UpdateValue_Click(object sender, RoutedEventArgs e)
    {
        // Animate to new value
        needlePointer.Value = Random.Shared.Next(0, 101);
    }
}
```

**Result:** Pointer smoothly animates to the new value on each update.

## Performance Considerations

### Optimizing Animations

1. **Avoid very long durations** - Keep under 3000ms for responsiveness
2. **Limit concurrent animations** - Too many pointers animating simultaneously may impact performance
3. **Use simpler easing** - Linear or Quadratic are faster than Elastic or Bounce
4. **Disable on low-end devices** - Check device capabilities before enabling

### Conditional Animation

```csharp
// Enable animation only for significant changes
private void UpdatePointerValue(double newValue)
{
    double difference = Math.Abs(newValue - needlePointer.Value);
    
    // Only animate if change is significant
    if (difference > 5)
    {
        needlePointer.EnableAnimation = true;
        needlePointer.AnimationDuration = 1000;
    }
    else
    {
        // Skip animation for small changes
        needlePointer.EnableAnimation = false;
    }
    
    needlePointer.Value = newValue;
}
```

## Best Practices

1. **Enable animations by default** - They enhance user experience
2. **Use 1000-2000ms duration** - Balances smoothness with responsiveness
3. **Match easing to context** - Playful apps use Elastic/Bounce, professional apps use Quadratic/Cubic
4. **Apply EaseInOut mode** - Provides smoothest visual experience
5. **Test on target devices** - Ensure animations perform well
6. **Combine with pointer dragging** - Disable animation during interactive dragging
7. **Use consistent durations** - Keep animation speeds consistent across app
8. **Consider accessibility** - Provide option to reduce or disable animations
9. **Animate initial values** - Creates engaging first impression
10. **Match animation to data update frequency** - Shorter durations for real-time data

## Easing Function Reference

| Function | Effect | Best For |
|----------|--------|----------|
| LinearEase | Constant speed | Data updates, simple transitions |
| QuadraticEase | Gentle acceleration | General purpose, professional apps |
| CubicEase | Moderate acceleration | Emphasis, smooth feel |
| ElasticEase | Spring/wobble | Playful interfaces, attention |
| BounceEase | Bouncing | Fun interfaces, completion indicators |
| BackEase | Slight overshoot | Natural feel, small movements |
| ExponentialEase | Fast acceleration | Dramatic reveals, quick updates |
| CircleEase | Circular motion | Natural, physics-based feel |
| SineEase | Wave-like | Smooth, continuous motion |

## Troubleshooting

**Issue: Animation not playing**
- Ensure `EnableAnimation = true`
- Check that value is actually changing
- Verify animation duration is reasonable (not 0)
- Confirm pointer is visible and properly configured

**Issue: Animation too fast/slow**
- Adjust `AnimationDuration` property
- Test with different durations (try 1500ms as baseline)

**Issue: Animation looks choppy**
- Try simpler easing function (Linear or Quadratic)
- Check device performance capabilities
- Reduce concurrent animations
- Ensure UI thread is not blocked

**Issue: Pointer jumps instead of animating**
- EnableAnimation might be false
- Value change might be too small to notice
- Check animation hasn't completed before next update

## Additional Resources

- [WinUI Animation Documentation](https://docs.microsoft.com/en-us/windows/apps/design/motion/xaml-animation)
- [Easing Functions Reference](https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.media.animation.easingfunctionbase)
