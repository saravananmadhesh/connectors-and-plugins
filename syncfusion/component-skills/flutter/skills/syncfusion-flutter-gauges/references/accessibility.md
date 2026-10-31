# Accessibility

Both Linear and Radial gauges support accessibility features to ensure inclusive user experiences.

## Semantic Labels

### Linear Gauge Semantics

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  markerPointers: [
    LinearShapePointer(
      value: 75,
      enableDragging: true,
      onChanged: (value) => setState(() => _value = value),
    ),
  ],
  // Gauge automatically provides semantics for screen readers
)
```

### Radial Gauge Semantics

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      pointers: [
        NeedlePointer(
          value: 60,
          enableDragging: true,
          onValueChanged: (value) => setState(() => _value = value),
        ),
      ],
    ),
  ],
  // Gauge automatically provides semantics for screen readers
)
```

## Custom Semantic Labels

### Wrapping with Semantics Widget

```dart
Semantics(
  label: 'Volume control',
  hint: 'Drag to adjust volume from 0 to 100 percent',
  value: '${_volume.round()} percent',
  child: SfLinearGauge(
    minimum: 0,
    maximum: 100,
    markerPointers: [
      LinearShapePointer(
        value: _volume,
        enableDragging: true,
        onChanged: (value) {
          setState(() => _volume = value);
        },
      ),
    ],
  ),
)
```

### Radial Gauge with Semantics

```dart
Semantics(
  label: 'Temperature gauge',
  hint: 'Shows current temperature',
  value: '${_temperature.round()} degrees Celsius',
  child: SfRadialGauge(
    axes: [
      RadialAxis(
        minimum: -20,
        maximum: 50,
        pointers: [
          NeedlePointer(value: _temperature),
        ],
      ),
    ],
  ),
)
```

## Interactive Gauge Accessibility

### Draggable Pointer Semantics

```dart
class AccessibleVolumeControl extends StatefulWidget {
  @override
  _AccessibleVolumeControlState createState() => _AccessibleVolumeControlState();
}

class _AccessibleVolumeControlState extends State<AccessibleVolumeControl> {
  double _volume = 50;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Volume slider',
      hint: 'Drag to adjust volume',
      value: '${_volume.round()} percent',
      increasedValue: '${(_volume + 10).clamp(0, 100).round()} percent',
      decreasedValue: '${(_volume - 10).clamp(0, 100).round()} percent',
      onIncrease: () {
        setState(() {
          _volume = (_volume + 10).clamp(0, 100);
        });
      },
      onDecrease: () {
        setState(() {
          _volume = (_volume - 10).clamp(0, 100);
        });
      },
      child: SfLinearGauge(
        minimum: 0,
        maximum: 100,
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
            onChanged: (value) {
              setState(() => _volume = value);
            },
            color: Colors.blue,
          ),
        ],
      ),
    );
  }
}
```

## Screen Reader Support

### Descriptive Labels

```dart
Column(
  children: [
    Text(
      'Battery Level',
      style: Theme.of(context).textTheme.titleLarge,
      semanticsLabel: 'Battery level indicator',
    ),
    SizedBox(height: 10),
    Semantics(
      label: 'Battery gauge',
      value: '${_battery.round()} percent charged',
      child: SfLinearGauge(
        minimum: 0,
        maximum: 100,
        ranges: [
          LinearGaugeRange(
            startValue: 0,
            endValue: _battery,
            color: _battery < 20 ? Colors.red : Colors.green,
          ),
        ],
        markerPointers: [
          LinearShapePointer(value: _battery),
        ],
      ),
    ),
    SizedBox(height: 10),
    Text(
      '${_battery.round()}%',
      style: Theme.of(context).textTheme.headlineMedium,
      semanticsLabel: '${_battery.round()} percent',
    ),
  ],
)
```

## WCAG Compliance

### Color Contrast

```dart
// Good: High contrast colors for visibility
SfRadialGauge(
  axes: [
    RadialAxis(
      axisLineStyle: AxisLineStyle(
        color: Colors.black,
        thickness: 3,
      ),
      majorTickStyle: MajorTickStyle(
        color: Colors.black,
        thickness: 2,
      ),
      axisLabelStyle: GaugeTextStyle(
        color: Colors.black,
        fontSize: 14,
        fontWeight: FontWeight.bold,
      ),
      pointers: [
        NeedlePointer(
          value: 65,
          needleColor: Colors.red[700], // High contrast
          knobStyle: KnobStyle(
            color: Colors.black,
            borderColor: Colors.red[700],
            borderWidth: 3,
          ),
        ),
      ],
    ),
  ],
)
```

### Text Size and Readability

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 100,
      axisLabelStyle: GaugeTextStyle(
        fontSize: 16, // Minimum 14pt for readability
        fontWeight: FontWeight.bold,
      ),
      annotations: [
        GaugeAnnotation(
          widget: Text(
            '${_value.round()}',
            style: TextStyle(
              fontSize: 32, // Large, readable text
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ),
      ],
    ),
  ],
)
```

### Not Relying on Color Alone

```dart
// Good: Using both color and text labels
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 33,
      color: Colors.red,
      position: LinearElementPosition.outside,
      child: Text('Low', style: TextStyle(fontWeight: FontWeight.bold)),
    ),
    LinearGaugeRange(
      startValue: 33,
      endValue: 66,
      color: Colors.yellow,
      position: LinearElementPosition.outside,
      child: Text('Medium', style: TextStyle(fontWeight: FontWeight.bold)),
    ),
    LinearGaugeRange(
      startValue: 66,
      endValue: 100,
      color: Colors.green,
      position: LinearElementPosition.outside,
      child: Text('High', style: TextStyle(fontWeight: FontWeight.bold)),
    ),
  ],
)
```

## Touch Target Sizes

### Minimum Touch Targets (44x44 pts)

```dart
SfLinearGauge(
  markerPointers: [
    LinearShapePointer(
      value: 50,
      enableDragging: true,
      width: 44, // Minimum touch target size
      height: 44,
      color: Colors.blue,
      shapeType: LinearShapePointerType.circle,
    ),
  ],
)
```

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      pointers: [
        MarkerPointer(
          value: 60,
          enableDragging: true,
          markerWidth: 44, // Minimum touch target size
          markerHeight: 44,
          markerType: MarkerType.circle,
        ),
      ],
    ),
  ],
)
```

## Keyboard Navigation

While gauges don't have built-in keyboard support, you can add it:

```dart
class KeyboardAccessibleGauge extends StatefulWidget {
  @override
  _KeyboardAccessibleGaugeState createState() => _KeyboardAccessibleGaugeState();
}

class _KeyboardAccessibleGaugeState extends State<KeyboardAccessibleGauge> {
  double _value = 50;
  final FocusNode _focusNode = FocusNode();

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return KeyboardListener(
      focusNode: _focusNode,
      autofocus: true,
      onKeyEvent: (event) {
        if (event is KeyDownEvent) {
          setState(() {
            if (event.logicalKey == LogicalKeyboardKey.arrowUp ||
                event.logicalKey == LogicalKeyboardKey.arrowRight) {
              _value = (_value + 5).clamp(0, 100);
            } else if (event.logicalKey == LogicalKeyboardKey.arrowDown ||
                event.logicalKey == LogicalKeyboardKey.arrowLeft) {
              _value = (_value - 5).clamp(0, 100);
            }
          });
        }
      },
      child: Semantics(
        label: 'Adjustable gauge',
        hint: 'Use arrow keys to adjust value',
        value: '${_value.round()}',
        focusable: true,
        focused: _focusNode.hasFocus,
        child: SfRadialGauge(
          axes: [
            RadialAxis(
              minimum: 0,
              maximum: 100,
              pointers: [
                NeedlePointer(value: _value),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

## Testing Accessibility

### Using Flutter's Semantic Tester

```dart
testWidgets('Gauge has proper semantics', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: Semantics(
          label: 'Volume control',
          value: '50 percent',
          child: SfLinearGauge(
            markerPointers: [
              LinearShapePointer(value: 50),
            ],
          ),
        ),
      ),
    ),
  );

  // Verify semantics
  expect(
    find.bySemanticsLabel('Volume control'),
    findsOneWidget,
  );
});
```

### Screen Reader Testing

1. **iOS VoiceOver**: Enable in Settings > Accessibility > VoiceOver
2. **Android TalkBack**: Enable in Settings > Accessibility > TalkBack
3. Test navigation and value announcement
4. Verify all interactive elements are accessible

## Best Practices

1. **Always provide semantic labels** for screen readers
2. **Use sufficient color contrast** (WCAG AA: 4.5:1 minimum)
3. **Don't rely on color alone** - add text labels or patterns
4. **Ensure touch targets are at least 44x44 pts**
5. **Use readable font sizes** (minimum 14pt for labels)
6. **Test with screen readers** on both iOS and Android
7. **Provide keyboard alternatives** for draggable pointers
8. **Announce value changes** to assistive technologies
9. **Use descriptive labels and hints** for semantic widgets
10. **Support dynamic text sizing** (respect user's font size preferences)

## Summary

Accessibility features for gauges include:
- **Semantic labels** for screen reader support
- **WCAG compliance** with color contrast and text size
- **Touch target sizing** (minimum 44x44 pts)
- **Keyboard navigation** support (custom implementation)
- **Testing tools** for validation

Implementing accessibility ensures your gauge components are usable by everyone, regardless of their abilities.
