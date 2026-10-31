# Animation in WinUI Linear Gauge

Pointer animation provides smooth visual transitions when values change, enhancing the user experience. This guide covers enabling animation, configuring duration, and customizing easing functions for all pointer types.

## Overview

All three pointer types support animation:
- **Bar Pointer** - Animates bar fill from old to new value
- **Shape Pointer** - Animates marker movement along the axis
- **Content Pointer** - Animates content position along the axis

Animation is controlled by three properties:
- `EnableAnimation` - Enable/disable animation (default: false)
- `AnimationDuration` - Duration in milliseconds (default: 1500)
- `AnimationEasingFunction` - Easing function for smooth transitions (default: null/linear)

## Enabling Pointer Animation

Set `EnableAnimation` to true to enable animations when pointer values change.

### Bar Pointer Animation

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10"
                          MinorTicksPerInterval="4">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="60" 
                                  EnableAnimation="True" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.Interval = 10;
sfLinearGauge.Axis.MinorTicksPerInterval = 4;

BarPointer barPointer = new BarPointer
{
    Value = 60,
    EnableAnimation = true
};
sfLinearGauge.Axis.BarPointers.Add(barPointer);

this.Content = sfLinearGauge;
```

**Result:** When `Value` changes, the bar smoothly grows or shrinks to the new value.

### Shape Pointer Animation

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10"
                          MinorTicksPerInterval="4">
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="60"
                                          VerticalAnchor="End"
                                          OffsetPoint="0,-3"
                                          EnableAnimation="True" />
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
    OffsetPoint = new Point(0, -3),
    EnableAnimation = true
};
sfLinearGauge.Axis.MarkerPointers.Add(shapePointer);
```

**Result:** The shape pointer smoothly moves along the axis to the new value position.

### Content Pointer Animation

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10"
                          MinorTicksPerInterval="4">
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearContentPointer Value="60"
                                            VerticalAnchor="End"
                                            OffsetPoint="0,-23"
                                            EnableAnimation="True">
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
    OffsetPoint = new Point(0, -23),
    Content = new TextBlock { Text = "60%" },
    EnableAnimation = true
};
sfLinearGauge.Axis.MarkerPointers.Add(contentPointer);
```

**Result:** The content smoothly moves along the axis to the new value position.

## Animation Duration

The `AnimationDuration` property controls how long the animation takes in milliseconds. Default is 1500ms (1.5 seconds).

### Faster Animation (1 second)

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10"
                          MinorTicksPerInterval="4">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="60" 
                                  EnableAnimation="True"
                                  AnimationDuration="1000" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
BarPointer barPointer = new BarPointer
{
    Value = 60,
    EnableAnimation = true,
    AnimationDuration = 1000  // 1 second
};
```

### Slower Animation (3 seconds)

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10"
                          MinorTicksPerInterval="4">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="60" 
                                  EnableAnimation="True"
                                  AnimationDuration="3000" />
            </gauge:LinearAxis.BarPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
BarPointer barPointer = new BarPointer
{
    Value = 60,
    EnableAnimation = true,
    AnimationDuration = 3000  // 3 seconds
};
```

**Duration Guidelines:**
- **Fast (500-1000ms):** Quick updates, real-time data
- **Medium (1500-2000ms):** Default, balanced feel
- **Slow (3000-5000ms):** Dramatic effect, attention-grabbing

## Animation Easing Functions

The `AnimationEasingFunction` property controls the animation acceleration/deceleration curve. By default, animations use linear motion (null easing function).

### Available Easing Functions

WinUI provides several built-in easing functions:

1. **BackEase** - Retracts motion slightly before animating
2. **BounceEase** - Creates bouncing effect
3. **CircleEase** - Accelerates/decelerates using circular function
4. **CubicEase** - Accelerates/decelerates using cubic formula
5. **ElasticEase** - Creates spring-like oscillation
6. **ExponentialEase** - Accelerates/decelerates using exponential formula
7. **PowerEase** - Accelerates/decelerates using power formula
8. **QuadraticEase** - Accelerates/decelerates using quadratic formula
9. **QuarticEase** - Accelerates/decelerates using quartic formula
10. **QuinticEase** - Accelerates/decelerates using quintic formula
11. **SineEase** - Accelerates/decelerates using sine formula

Each easing function supports three modes:
- `EaseIn` - Slow start, fast end
- `EaseOut` - Fast start, slow end
- `EaseInOut` - Slow start, fast middle, slow end

### CircleEase Example

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10"
                          MinorTicksPerInterval="4">
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="70"
                                  EnableAnimation="True"
                                  AnimationDuration="3000">
                    <gauge:BarPointer.AnimationEasingFunction>
                        <CircleEase EasingMode="EaseIn" />
                    </gauge:BarPointer.AnimationEasingFunction>
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
    Value = 70,
    EnableAnimation = true,
    AnimationDuration = 3000,
    AnimationEasingFunction = new CircleEase { EasingMode = EasingMode.EaseIn }
};
```

### BounceEase Example

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="70"
                                          EnableAnimation="True"
                                          AnimationDuration="2000">
                    <gauge:LinearShapePointer.AnimationEasingFunction>
                        <BounceEase EasingMode="EaseOut" Bounces="3" Bounciness="2" />
                    </gauge:LinearShapePointer.AnimationEasingFunction>
                </gauge:LinearShapePointer>
            </gauge:LinearAxis.MarkerPointers>
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 70,
    EnableAnimation = true,
    AnimationDuration = 2000,
    AnimationEasingFunction = new BounceEase 
    { 
        EasingMode = EasingMode.EaseOut,
        Bounces = 3,
        Bounciness = 2
    }
};
```

### ElasticEase Example

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="80"
                                  EnableAnimation="True"
                                  AnimationDuration="2500">
                    <gauge:BarPointer.AnimationEasingFunction>
                        <ElasticEase EasingMode="EaseOut" Oscillations="3" Springiness="5" />
                    </gauge:BarPointer.AnimationEasingFunction>
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
    Value = 80,
    EnableAnimation = true,
    AnimationDuration = 2500,
    AnimationEasingFunction = new ElasticEase 
    { 
        EasingMode = EasingMode.EaseOut,
        Oscillations = 3,
        Springiness = 5
    }
};
```

### PowerEase Example

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis>
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="60"
                                  EnableAnimation="True"
                                  AnimationDuration="1500">
                    <gauge:BarPointer.AnimationEasingFunction>
                        <PowerEase EasingMode="EaseInOut" Power="3" />
                    </gauge:BarPointer.AnimationEasingFunction>
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
    Value = 60,
    EnableAnimation = true,
    AnimationDuration = 1500,
    AnimationEasingFunction = new PowerEase 
    { 
        EasingMode = EasingMode.EaseInOut,
        Power = 3
    }
};
```

## Complete Animation Example

Here's a complete example with all three pointer types animated:

**XAML:**
```xml
<gauge:SfLinearGauge>
    <gauge:SfLinearGauge.Axis>
        <gauge:LinearAxis Interval="10"
                          MinorTicksPerInterval="4">
            
            <!-- Animated Bar Pointer -->
            <gauge:LinearAxis.BarPointers>
                <gauge:BarPointer Value="70"
                                  EnableAnimation="True"
                                  AnimationDuration="1500">
                    <gauge:BarPointer.AnimationEasingFunction>
                        <CircleEase EasingMode="EaseOut" />
                    </gauge:BarPointer.AnimationEasingFunction>
                </gauge:BarPointer>
            </gauge:LinearAxis.BarPointers>
            
            <!-- Animated Marker Pointers -->
            <gauge:LinearAxis.MarkerPointers>
                <gauge:LinearShapePointer Value="70"
                                          VerticalAnchor="End"
                                          OffsetPoint="0,-3"
                                          EnableAnimation="True"
                                          AnimationDuration="1500">
                    <gauge:LinearShapePointer.AnimationEasingFunction>
                        <CircleEase EasingMode="EaseOut" />
                    </gauge:LinearShapePointer.AnimationEasingFunction>
                </gauge:LinearShapePointer>
                
                <gauge:LinearContentPointer Value="70"
                                            VerticalAnchor="End"
                                            OffsetPoint="0,-23"
                                            EnableAnimation="True"
                                            AnimationDuration="1500">
                    <gauge:LinearContentPointer.AnimationEasingFunction>
                        <CircleEase EasingMode="EaseOut" />
                    </gauge:LinearContentPointer.AnimationEasingFunction>
                    <gauge:LinearContentPointer.Content>
                        <TextBlock Text="70%" />
                    </gauge:LinearContentPointer.Content>
                </gauge:LinearContentPointer>
            </gauge:LinearAxis.MarkerPointers>
            
        </gauge:LinearAxis>
    </gauge:SfLinearGauge.Axis>
</gauge:SfLinearGauge>
```

**C#:**
```csharp
SfLinearGauge sfLinearGauge = new SfLinearGauge();
sfLinearGauge.Axis.Interval = 10;
sfLinearGauge.Axis.MinorTicksPerInterval = 4;

// Create shared easing function
CircleEase easing = new CircleEase { EasingMode = EasingMode.EaseOut };

// Animated bar pointer
BarPointer barPointer = new BarPointer
{
    Value = 70,
    EnableAnimation = true,
    AnimationDuration = 1500,
    AnimationEasingFunction = easing
};
sfLinearGauge.Axis.BarPointers.Add(barPointer);

// Animated shape pointer
LinearShapePointer shapePointer = new LinearShapePointer
{
    Value = 70,
    VerticalAnchor = GaugeAnchor.End,
    OffsetPoint = new Point(0, -3),
    EnableAnimation = true,
    AnimationDuration = 1500,
    AnimationEasingFunction = easing
};
sfLinearGauge.Axis.MarkerPointers.Add(shapePointer);

// Animated content pointer
LinearContentPointer contentPointer = new LinearContentPointer
{
    Value = 70,
    VerticalAnchor = GaugeAnchor.End,
    OffsetPoint = new Point(0, -23),
    Content = new TextBlock { Text = "70%" },
    EnableAnimation = true,
    AnimationDuration = 1500,
    AnimationEasingFunction = easing
};
sfLinearGauge.Axis.MarkerPointers.Add(contentPointer);

this.Content = sfLinearGauge;
```

## Updating Values Programmatically

To see animations in action, update pointer values in code:

**C#:**
```csharp
// In a button click handler or timer
private void UpdateGaugeValue()
{
    // Update all pointers to new value
    double newValue = 90;
    
    barPointer.Value = newValue;
    shapePointer.Value = newValue;
    contentPointer.Value = newValue;
    
    // Update content text
    if (contentPointer.Content is TextBlock textBlock)
    {
        textBlock.Text = $"{newValue}%";
    }
}

// With timer for continuous updates
private DispatcherTimer timer;

private void StartAnimation()
{
    timer = new DispatcherTimer();
    timer.Interval = TimeSpan.FromSeconds(2);
    timer.Tick += (s, e) =>
    {
        Random random = new Random();
        double newValue = random.Next(0, 101);
        UpdatePointers(newValue);
    };
    timer.Start();
}

private void UpdatePointers(double value)
{
    barPointer.Value = value;
    shapePointer.Value = value;
    
    if (contentPointer.Content is TextBlock tb)
    {
        tb.Text = $"{value:F0}%";
    }
    contentPointer.Value = value;
}
```

## Best Practices

1. **Consistent Duration** - Use same duration for all pointers on same gauge
2. **Match Easing Functions** - Use same easing for synchronized movement
3. **Performance** - Shorter durations (500-1500ms) for frequently updating data
4. **Accessibility** - Provide option to disable animations (prefers-reduced-motion)
5. **Initial Load** - Consider disabling animation on initial page load
6. **Real-time Data** - Use faster animations (500-800ms) for live updates
7. **User Control** - For interactive pointers, consider disabling animation during drag

## Common Scenarios

### Loading/Progress Animation
```xml
<!-- Smooth filling progress bar -->
<gauge:BarPointer Value="0"
                  EnableAnimation="True"
                  AnimationDuration="2000">
    <gauge:BarPointer.AnimationEasingFunction>
        <CubicEase EasingMode="EaseOut" />
    </gauge:BarPointer.AnimationEasingFunction>
</gauge:BarPointer>
```

### Playful Bounce Effect
```xml
<!-- Fun bounce for game scores -->
<gauge:LinearShapePointer Value="100"
                          EnableAnimation="True"
                          AnimationDuration="1500">
    <gauge:LinearShapePointer.AnimationEasingFunction>
        <BounceEase EasingMode="EaseOut" />
    </gauge:LinearShapePointer.AnimationEasingFunction>
</gauge:LinearShapePointer>
```

### Smooth Dashboard Update
```xml
<!-- Professional ease for business dashboards -->
<gauge:BarPointer Value="75"
                  EnableAnimation="True"
                  AnimationDuration="1000">
    <gauge:BarPointer.AnimationEasingFunction>
        <CircleEase EasingMode="EaseInOut" />
    </gauge:BarPointer.AnimationEasingFunction>
</gauge:BarPointer>
```

### Real-time Sensor Data
```csharp
// Fast, subtle animation for live data
BarPointer livePointer = new BarPointer
{
    Value = sensorValue,
    EnableAnimation = true,
    AnimationDuration = 500,  // Quick update
    AnimationEasingFunction = new SineEase { EasingMode = EasingMode.EaseOut }
};
```

## Reference Links

For more information on easing functions, see:
- [Microsoft Docs - Easing Functions](https://learn.microsoft.com/en-us/uwp/api/windows.ui.xaml.media.animation.easingfunctionbase)
- [Animation Guidelines](https://learn.microsoft.com/en-us/windows/apps/design/motion/timing-and-easing)
