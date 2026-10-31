# Animation

Both Linear and Radial gauges support smooth animations for visual appeal and better user experience.

## Linear Gauge Animation

### Enable Animation

**Axis Animation:**

```dart
SfLinearGauge(
  animateAxis: true,
  animationDuration: 1500, // milliseconds
)
```

**Range Animation:**

```dart
SfLinearGauge(
  animateRange: true,
  animationDuration: 1200,
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 50,
      color: Colors.green,
    ),
  ],
)
```

### Pointer Animation

**Bar Pointer Animation:**

```dart
LinearBarPointer(
  value: 75,
  enableAnimation: true,
  animationDuration: 1500,
  animationType: LinearAnimationType.ease,
  // Options: ease, easeInCirc, easeOutBack, elasticOut, linear, slowMiddle
)
```

**Shape Pointer Animation:**

```dart
LinearShapePointer(
  value: 60,
  enableAnimation: true,
  animationDuration: 1000,
)
```

### Animation Callbacks

**Bar Pointer Completion:**

```dart
LinearBarPointer(
  value: 80,
  enableAnimation: true,
  onAnimationCompleted: () {
    print('Animation completed!');
    // Trigger next action
  },
)
```

### Animation Types

```dart
// Ease animation (smooth)
LinearBarPointer(
  value: 70,
  animationType: LinearAnimationType.ease,
)

// Elastic animation (bouncy)
LinearBarPointer(
  value: 70,
  animationType: LinearAnimationType.elasticOut,
)

// Linear animation (constant speed)
LinearBarPointer(
  value: 70,
  animationType: LinearAnimationType.linear,
)

// Ease-in circular
LinearBarPointer(
  value: 70,
  animationType: LinearAnimationType.easeInCirc,
)
```

## Radial Gauge Animation

### Enable Loading Animation

**Gauge-level animation:**

```dart
SfRadialGauge(
  enableLoadingAnimation: true,
  animationDuration: 1500,
  axes: [
    RadialAxis(),
  ],
)
```

### Pointer Animation

**Needle Pointer:**

```dart
NeedlePointer(
  value: 75,
  enableAnimation: true,
  animationDuration: 1200,
  animationType: AnimationType.ease,
  // Options: bounceOut, ease, easeInCirc, easeOutBack, elasticOut, linear, slowMiddle
)
```

**Marker Pointer:**

```dart
MarkerPointer(
  value: 60,
  enableAnimation: true,
  animationDuration: 1000,
  animationType: AnimationType.elasticOut,
)
```

**Range Pointer:**

```dart
RangePointer(
  value: 80,
  width: 15,
  enableAnimation: true,
  animationDuration: 1500,
  animationType: AnimationType.ease,
)
```

**Widget Pointer:**

```dart
WidgetPointer(
  value: 70,
  enableAnimation: true,
  animationDuration: 1000,
  child: Icon(Icons.star, size: 30),
)
```

### Animation Types

```dart
// Ease animation
NeedlePointer(
  value: 70,
  enableAnimation: true,
  animationType: AnimationType.ease,
)

// Bounce animation
NeedlePointer(
  value: 70,
  enableAnimation: true,
  animationType: AnimationType.bounceOut,
)

// Elastic animation
NeedlePointer(
  value: 70,
  enableAnimation: true,
  animationType: AnimationType.elasticOut,
)

// Ease-out back animation
NeedlePointer(
  value: 70,
  enableAnimation: true,
  animationType: AnimationType.easeOutBack,
)
```

## Animation Patterns

### Loading Progress

```dart
class LoadingGauge extends StatefulWidget {
  @override
  _LoadingGaugeState createState() => _LoadingGaugeState();
}

class _LoadingGaugeState extends State<LoadingGauge> {
  double _value = 0;

  @override
  void initState() {
    super.initState();
    _simulateLoading();
  }

  Future<void> _simulateLoading() async {
    for (int i = 0; i <= 100; i += 10) {
      await Future.delayed(Duration(milliseconds: 200));
      setState(() => _value = i.toDouble());
    }
  }

  @override
  Widget build(BuildContext context) {
    return SfLinearGauge(
      barPointers: [
        LinearBarPointer(
          value: _value,
          enableAnimation: true,
          animationDuration: 200,
        ),
      ],
    );
  }
}
```

### Smooth Value Changes

```dart
class AnimatedGauge extends StatefulWidget {
  @override
  _AnimatedGaugeState createState() => _AnimatedGaugeState();
}

class _AnimatedGaugeState extends State<AnimatedGauge> {
  double _value = 50;

  void _updateValue(double newValue) {
    setState(() {
      _value = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfRadialGauge(
          axes: [
            RadialAxis(
              pointers: [
                NeedlePointer(
                  value: _value,
                  enableAnimation: true,
                  animationDuration: 1000,
                  animationType: AnimationType.ease,
                ),
              ],
            ),
          ],
        ),
        Slider(
          value: _value,
          min: 0,
          max: 100,
          onChanged: _updateValue,
        ),
      ],
    );
  }
}
```

### Sequential Animation

```dart
class SequentialAnimation extends StatefulWidget {
  @override
  _SequentialAnimationState createState() => _SequentialAnimationState();
}

class _SequentialAnimationState extends State<SequentialAnimation> {
  double _value1 = 0;
  double _value2 = 0;
  double _value3 = 0;

  @override
  void initState() {
    super.initState();
    _animateSequentially();
  }

  Future<void> _animateSequentially() async {
    await Future.delayed(Duration(milliseconds: 100));
    setState(() => _value1 = 70);
    
    await Future.delayed(Duration(milliseconds: 300));
    setState(() => _value2 = 50);
    
    await Future.delayed(Duration(milliseconds: 300));
    setState(() => _value3 = 90);
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: SfRadialGauge(
            axes: [
              RadialAxis(
                pointers: [
                  RangePointer(
                    value: _value1,
                    enableAnimation: true,
                    animationDuration: 1000,
                  ),
                ],
              ),
            ],
          ),
        ),
        Expanded(
          child: SfRadialGauge(
            axes: [
              RadialAxis(
                pointers: [
                  RangePointer(
                    value: _value2,
                    enableAnimation: true,
                    animationDuration: 1000,
                  ),
                ],
              ),
            ],
          ),
        ),
        Expanded(
          child: SfRadialGauge(
            axes: [
              RadialAxis(
                pointers: [
                  RangePointer(
                    value: _value3,
                    enableAnimation: true,
                    animationDuration: 1000,
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

### Pulse Effect

```dart
class PulsingGauge extends StatefulWidget {
  @override
  _PulsingGaugeState createState() => _PulsingGaugeState();
}

class _PulsingGaugeState extends State<PulsingGauge>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    )..repeat(reverse: true);
    _animation = Tween<double>(begin: 60, end: 80).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return SfRadialGauge(
          axes: [
            RadialAxis(
              pointers: [
                NeedlePointer(
                  value: _animation.value,
                  enableAnimation: false, // Manual animation
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
```

## Best Practices

1. **Duration**: Use 800-1500ms for smooth animations (not too slow, not too fast)
2. **Animation Type**: 
   - `ease` for smooth general-purpose animations
   - `elasticOut` for playful, bouncy effects
   - `easeOutBack` for attention-grabbing animations
   - `linear` for constant-speed animations
3. **Performance**: Disable animations for frequently updating values (e.g., real-time data)
4. **Initial Load**: Enable loading animations for better first impression
5. **Value Changes**: Animate pointer movements for smoother transitions
6. **Callbacks**: Use completion callbacks to chain animations or trigger actions

## Animation Control

### Conditional Animation

```dart
bool _shouldAnimate = true;

SfLinearGauge(
  barPointers: [
    LinearBarPointer(
      value: 75,
      enableAnimation: _shouldAnimate,
      animationDuration: 1000,
    ),
  ],
)
```

### Different Durations

```dart
// Faster for small changes
LinearBarPointer(
  value: currentValue,
  animationDuration: (previousValue - currentValue).abs() < 10 ? 300 : 1000,
  enableAnimation: true,
)
```

## Summary

**Linear Gauge:**
- Axis and range animations
- Bar and shape pointer animations
- Multiple animation types
- Completion callbacks

**Radial Gauge:**
- Loading animations
- Pointer animations (needle, marker, range, widget)
- Multiple animation types
- Smooth value transitions

Use animations to enhance user experience, but avoid overuse that might distract or slow down the interface.
