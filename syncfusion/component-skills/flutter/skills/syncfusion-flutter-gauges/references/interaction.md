# Interaction

Both Linear and Radial gauges support interactive pointer dragging, allowing users to change values through touch or mouse gestures.

## Linear Gauge Interaction

### Enable Dragging

**Shape Pointer Dragging:**

```dart
double _value = 50;

SfLinearGauge(
  markerPointers: [
    LinearShapePointer(
      value: _value,
      enableDragging: true,
      onChanged: (double newValue) {
        setState(() {
          _value = newValue;
        });
      },
    ),
  ],
)
```

**Widget Pointer Dragging:**

```dart
double _value = 60;

SfLinearGauge(
  markerPointers: [
    LinearWidgetPointer(
      value: _value,
      enableDragging: true,
      onChanged: (double newValue) {
        setState(() {
          _value = newValue;
        });
      },
      child: Icon(Icons.circle, size: 30),
    ),
  ],
)
```

### Interaction Example

```dart
class InteractiveLinearGauge extends StatefulWidget {
  @override
  _InteractiveLinearGaugeState createState() => _InteractiveLinearGaugeState();
}

class _InteractiveLinearGaugeState extends State<InteractiveLinearGauge> {
  double _volume = 50;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Volume: ${_volume.round()}%',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),
        SfLinearGauge(
          minimum: 0,
          maximum: 100,
          barPointers: [
            LinearBarPointer(
              value: _volume,
              thickness: 10,
              color: Colors.blue,
            ),
          ],
          markerPointers: [
            LinearShapePointer(
              value: _volume,
              enableDragging: true,
              onChanged: (value) {
                setState(() => _volume = value);
              },
              shapeType: LinearShapePointerType.circle,
              color: Colors.blue,
            ),
          ],
        ),
      ],
    );
  }
}
```

## Radial Gauge Interaction

### Enable Dragging

**Needle Pointer:**

```dart
double _value = 60;

RadialAxis(
  pointers: [
    NeedlePointer(
      value: _value,
      enableDragging: true,
      onValueChanged: (double newValue) {
        setState(() {
          _value = newValue;
        });
      },
    ),
  ],
)
```

**Marker Pointer:**

```dart
double _value = 75;

RadialAxis(
  pointers: [
    MarkerPointer(
      value: _value,
      enableDragging: true,
      onValueChanged: (double newValue) {
        setState(() {
          _value = newValue;
        });
      },
    ),
  ],
)
```

**Range Pointer:**

```dart
double _value = 50;

RadialAxis(
  pointers: [
    RangePointer(
      value: _value,
      width: 15,
      enableDragging: true,
      onValueChanged: (double newValue) {
        setState(() {
          _value = newValue;
        });
      },
    ),
  ],
)
```

**Widget Pointer:**

```dart
double _value = 65;

RadialAxis(
  pointers: [
    WidgetPointer(
      value: _value,
      enableDragging: true,
      onValueChanged: (double newValue) {
        setState(() {
          _value = newValue;
        });
      },
      child: Icon(Icons.star, size: 30),
    ),
  ],
)
```

## Interaction Events

Radial gauge pointers provide detailed interaction callbacks:

### Value Change Events

**onValueChangeStart:**

```dart
NeedlePointer(
  value: _value,
  enableDragging: true,
  onValueChangeStart: (double value) {
    print('Drag started at value: $value');
  },
)
```

**onValueChanging:**

```dart
NeedlePointer(
  value: _value,
  enableDragging: true,
  onValueChanging: (ValueChangingArgs args) {
    print('Dragging: ${args.value}');
    // Can cancel the change
    if (args.value > 80) {
      args.cancel = true;
    }
  },
)
```

**onValueChanged:**

```dart
NeedlePointer(
  value: _value,
  enableDragging: true,
  onValueChanged: (double value) {
    setState(() {
      _value = value;
    });
    print('Value changed to: $value');
  },
)
```

**onValueChangeEnd:**

```dart
NeedlePointer(
  value: _value,
  enableDragging: true,
  onValueChangeEnd: (double value) {
    print('Drag ended at value: $value');
    // Perform action after drag completes
  },
)
```

### Complete Event Example

```dart
class InteractiveRadialGauge extends StatefulWidget {
  @override
  _InteractiveRadialGaugeState createState() => _InteractiveRadialGaugeState();
}

class _InteractiveRadialGaugeState extends State<InteractiveRadialGauge> {
  double _value = 50;
  bool _isDragging = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Speed: ${_value.round()} km/h',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: _isDragging ? Colors.blue : Colors.black,
          ),
        ),
        SizedBox(height: 20),
        SfRadialGauge(
          axes: [
            RadialAxis(
              minimum: 0,
              maximum: 150,
              ranges: [
                GaugeRange(startValue: 0, endValue: 50, color: Colors.green, startWidth: 10, endWidth: 10),
                GaugeRange(startValue: 50, endValue: 100, color: Colors.yellow, startWidth: 10, endWidth: 10),
                GaugeRange(startValue: 100, endValue: 150, color: Colors.red, startWidth: 10, endWidth: 10),
              ],
              pointers: [
                NeedlePointer(
                  value: _value,
                  enableDragging: true,
                  onValueChangeStart: (value) {
                    setState(() => _isDragging = true);
                  },
                  onValueChanging: (args) {
                    // Preview value while dragging
                    print('Dragging: ${args.value.round()}');
                  },
                  onValueChanged: (value) {
                    setState(() => _value = value);
                  },
                  onValueChangeEnd: (value) {
                    setState(() {
                      _isDragging = false;
                      _value = value;
                    });
                    print('Final value: ${value.round()}');
                  },
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
```

## Restricting Value Changes

### Cancel Invalid Values

```dart
MarkerPointer(
  value: _value,
  enableDragging: true,
  onValueChanging: (ValueChangingArgs args) {
    // Only allow values between 20 and 80
    if (args.value < 20 || args.value > 80) {
      args.cancel = true;
    }
  },
  onValueChanged: (value) {
    setState(() => _value = value);
  },
)
```

### Snap to Intervals

```dart
MarkerPointer(
  value: _value,
  enableDragging: true,
  onValueChanged: (value) {
    // Snap to nearest 10
    final snappedValue = (value / 10).round() * 10.0;
    setState(() {
      _value = snappedValue.toDouble();
    });
  },
)
```

### Range Constraints

```dart
class ConstrainedGauge extends StatefulWidget {
  @override
  _ConstrainedGaugeState createState() => _ConstrainedGaugeState();
}

class _ConstrainedGaugeState extends State<ConstrainedGauge> {
  double _value = 50;
  final double _minAllowed = 30;
  final double _maxAllowed = 80;

  @override
  Widget build(BuildContext context) {
    return SfRadialGauge(
      axes: [
        RadialAxis(
          minimum: 0,
          maximum: 100,
          ranges: [
            // Show restricted zones in red
            GaugeRange(
              startValue: 0,
              endValue: _minAllowed,
              color: Colors.red[100],
              startWidth: 10,
              endWidth: 10,
            ),
            GaugeRange(
              startValue: _minAllowed,
              endValue: _maxAllowed,
              color: Colors.green[100],
              startWidth: 10,
              endWidth: 10,
            ),
            GaugeRange(
              startValue: _maxAllowed,
              endValue: 100,
              color: Colors.red[100],
              startWidth: 10,
              endWidth: 10,
            ),
          ],
          pointers: [
            NeedlePointer(
              value: _value,
              enableDragging: true,
              onValueChanging: (args) {
                if (args.value < _minAllowed || args.value > _maxAllowed) {
                  args.cancel = true;
                }
              },
              onValueChanged: (value) {
                setState(() => _value = value);
              },
            ),
          ],
        ),
      ],
    );
  }
}
```

## Interaction Patterns

### Volume/Brightness Control

```dart
class VolumeControl extends StatefulWidget {
  @override
  _VolumeControlState createState() => _VolumeControlState();
}

class _VolumeControlState extends State<VolumeControl> {
  double _volume = 50;

  void _setVolume(double value) {
    setState(() => _volume = value);
    // Apply volume
    print('Setting volume to: ${value.round()}%');
  }

  @override
  Widget build(BuildContext context) {
    return SfLinearGauge(
      minimum: 0,
      maximum: 100,
      showLabels: false,
      barPointers: [
        LinearBarPointer(
          value: _volume,
          thickness: 15,
          color: Colors.blue,
        ),
      ],
      markerPointers: [
        LinearShapePointer(
          value: _volume,
          enableDragging: true,
          onChanged: _setVolume,
          color: Colors.blue,
          width: 25,
          height: 25,
        ),
      ],
    );
  }
}
```

### Temperature Selector

```dart
class TemperatureSelector extends StatefulWidget {
  @override
  _TemperatureSelectorState createState() => _TemperatureSelectorState();
}

class _TemperatureSelectorState extends State<TemperatureSelector> {
  double _temperature = 22;

  @override
  Widget build(BuildContext context) {
    return SfRadialGauge(
      axes: [
        RadialAxis(
          minimum: 16,
          maximum: 30,
          startAngle: 180,
          endAngle: 0,
          interval: 2,
          pointers: [
            RangePointer(
              value: _temperature,
              width: 0.15,
              sizeUnit: GaugeSizeUnit.factor,
              enableDragging: true,
              onValueChanged: (value) {
                setState(() => _temperature = value);
              },
              gradient: SweepGradient(
                colors: [Colors.blue, Colors.green, Colors.red],
                stops: [0.0, 0.5, 1.0],
              ),
            ),
          ],
          annotations: [
            GaugeAnnotation(
              widget: Text(
                '${_temperature.round()}°C',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
              ),
              positionFactor: 0.5,
            ),
          ],
        ),
      ],
    );
  }
}
```

### Rating Widget

```dart
class RatingGauge extends StatefulWidget {
  @override
  _RatingGaugeState createState() => _RatingGaugeState();
}

class _RatingGaugeState extends State<RatingGauge> {
  double _rating = 3.5;

  @override
  Widget build(BuildContext context) {
    return SfRadialGauge(
      axes: [
        RadialAxis(
          minimum: 0,
          maximum: 5,
          interval: 1,
          startAngle: 180,
          endAngle: 0,
          showAxisLine: false,
          pointers: [
            MarkerPointer(
              value: _rating,
              enableDragging: true,
              markerType: MarkerType.circle,
              markerWidth: 30,
              markerHeight: 30,
              color: Colors.amber,
              onValueChanged: (value) {
                setState(() {
                  // Round to nearest 0.5
                  _rating = (value * 2).round() / 2;
                });
              },
            ),
          ],
          annotations: [
            GaugeAnnotation(
              widget: Text(
                '${_rating} / 5',
                style: TextStyle(fontSize: 20),
              ),
              positionFactor: 0.5,
            ),
          ],
        ),
      ],
    );
  }
}
```

## Best Practices

1. **Provide visual feedback** during dragging (color change, scale, etc.)
2. **Show current value** prominently (annotation, label, or text)
3. **Use onValueChanging** to restrict invalid values
4. **Snap to meaningful intervals** for better UX
5. **Add haptic feedback** for mobile devices
6. **Ensure draggable area is large enough** for touch targets (min 44x44 pts)
7. **Use different pointer colors** when dragging vs idle
8. **Provide labels or ranges** to show context for values

## Summary

Both gauges support interactive pointer dragging:
- **Linear Gauge**: Shape and widget pointers draggable with `onChanged` callback
- **Radial Gauge**: All pointer types draggable with comprehensive event callbacks
- **Events**: Start, changing, changed, and end events for fine-grained control
- **Restrictions**: Cancel invalid values using `onValueChanging`
- **Use Cases**: Volume controls, temperature selectors, ratings, sliders

Interactive gauges transform static visualizations into engaging user input controls.
