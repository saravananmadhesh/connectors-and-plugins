# Ticks and Dividers

This guide covers tick marks, dividers, and their customization across all slider controls.

## Table of Contents
- [Enabling Ticks](#enabling-ticks)
- [Major Ticks](#major-ticks)
- [Minor Ticks](#minor-ticks)
- [Dividers](#dividers)
- [Tick and Divider Styling](#tick-and-divider-styling)

## Enabling Ticks

Ticks are visual markers along the track that indicate intervals.

### Show Ticks

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 40.0,
  interval: 20,
  showTicks: true,  // Enable ticks at intervals
  onChanged: (dynamic value) { },
)
```

### Ticks Require Interval

Ticks appear at positions defined by the `interval` property:

```dart
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(30.0, 70.0),
  interval: 25,      // Ticks at 0, 25, 50, 75, 100
  showTicks: true,
  onChanged: (SfRangeValues values) { },
)
```

### All Three Widgets

```dart
// SfSlider
SfSlider(
  value: _value,
  interval: 20,
  showTicks: true,
  onChanged: (dynamic value) { },
)

// SfRangeSlider
SfRangeSlider(
  values: _values,
  interval: 20,
  showTicks: true,
  onChanged: (SfRangeValues values) { },
)

// SfRangeSelector
SfRangeSelector(
  initialValues: _values,
  interval: 20,
  showTicks: true,
  child: Container(/* child */),
)
```

## Major Ticks

Major ticks appear at each interval position.

### Basic Major Ticks

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 10,      // Major ticks every 10 units
  showTicks: true,
  showLabels: true,  // Often used together
  onChanged: (dynamic value) { },
)
```

### Customizing Major Tick Size

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    activeTickColor: Colors.blue,
    inactiveTickColor: Colors.grey,
    tickSize: Size(2, 10),  // Width x Height
    tickOffset: Offset(0, 0),
  ),
  child: SfSlider(
    value: _value,
    interval: 20,
    showTicks: true,
    onChanged: (dynamic value) { },
  ),
)
```

### Major Tick Colors

Active ticks (within active region) vs inactive ticks:

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    activeTickColor: Colors.green,     // Ticks in active region
    inactiveTickColor: Colors.grey,    // Ticks in inactive regions
  ),
  child: SfRangeSlider(
    values: _values,
    interval: 20,
    showTicks: true,
    onChanged: (SfRangeValues values) { },
  ),
)
```

## Minor Ticks

Minor ticks appear between major ticks for finer granularity.

### Enabling Minor Ticks

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 20,               // Major ticks at 0, 20, 40, 60, 80, 100
  showTicks: true,
  minorTicksPerInterval: 1,   // 1 minor tick between each major tick
  onChanged: (dynamic value) { },
)
```

### Multiple Minor Ticks

```dart
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(30.0, 70.0),
  interval: 25,               // Major ticks at 0, 25, 50, 75, 100
  showTicks: true,
  minorTicksPerInterval: 4,   // 4 minor ticks between each major tick
  onChanged: (SfRangeValues values) { },
)
```

Example with `interval: 25` and `minorTicksPerInterval: 4`:
```
|    .    .    .    .    |    .    .    .    .    |
0                       25                      50
^                        ^
Major                 Major
     ^    ^    ^    ^
     Minor ticks
```

### Styling Minor Ticks

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    // Major ticks
    activeTickColor: Colors.blue,
    inactiveTickColor: Colors.grey,
    tickSize: Size(2, 10),
    // Minor ticks
    activeMinorTickColor: Colors.blue.withOpacity(0.6),
    inactiveMinorTickColor: Colors.grey.withOpacity(0.4),
    minorTickSize: Size(1, 6),  // Smaller than major ticks
  ),
  child: SfSlider(
    value: _value,
    interval: 20,
    showTicks: true,
    minorTicksPerInterval: 3,
    onChanged: (dynamic value) { },
  ),
)
```

### Minor Ticks on Range Selector

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    activeTickColor: Colors.orange,
    inactiveTickColor: Colors.grey,
    tickSize: Size(2, 12),
    activeMinorTickColor: Colors.orange.withOpacity(0.5),
    inactiveMinorTickColor: Colors.grey.withOpacity(0.3),
    minorTickSize: Size(1, 8),
  ),
  child: SfRangeSelector(
    min: 2.0,
    max: 10.0,
    initialValues: SfRangeValues(4.0, 8.0),
    interval: 2,
    showTicks: true,
    minorTicksPerInterval: 1,
    child: Container(/* child */),
  ),
)
```

## Dividers

Dividers are vertical lines that span the full height of the slider, appearing at intervals.

### Enabling Dividers

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 20,
  showDividers: true,  // Full-height dividers at intervals
  onChanged: (dynamic value) { },
)
```

### Dividers vs Ticks

- **Ticks**: Short marks on track
- **Dividers**: Full-height vertical lines

```dart
// Show both ticks and dividers
SfRangeSlider(
  values: _values,
  interval: 25,
  showTicks: true,      // Short marks
  showDividers: true,   // Full lines
  showLabels: true,
  onChanged: (SfRangeValues values) { },
)
```

### Divider Colors

Active dividers (in inactive region) vs inactive dividers (in active region):

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 40.0,
  interval: 20,
  showDividers: true,
  activeColor: Colors.blue,      // Also colors inactive dividers
  inactiveColor: Colors.grey,    // Also colors active dividers
  onChanged: (dynamic value) { },
)
```

**Note**: Divider colors are inverted relative to track regions:
- Dividers in the active track region use `inactiveColor`
- Dividers in the inactive track regions use `activeColor`

### Custom Divider Styling

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    activeDividerColor: Colors.red,
    inactiveDividerColor: Colors.red.withOpacity(0.3),
    activeDividerStrokeWidth: 2,
  ),
  child: SfRangeSlider(
    values: _values,
    interval: 20,
    showDividers: true,
    onChanged: (SfRangeValues values) { },
  ),
)
```

## Tick and Divider Styling

### Complete Tick Customization

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    // Major tick properties
    activeTickColor: Colors.blue,
    inactiveTickColor: Colors.grey[300],
    tickSize: Size(3, 12),
    tickOffset: Offset(0, 0),
    // Minor tick properties
    activeMinorTickColor: Colors.blue.withOpacity(0.5),
    inactiveMinorTickColor: Colors.grey[200],
    minorTickSize: Size(2, 8),
    tickOffset: Offset(0, 0),
  ),
  child: SfSlider(
    value: _value,
    interval: 20,
    showTicks: true,
    minorTicksPerInterval: 3,
    onChanged: (dynamic value) { },
  ),
)
```

### Complete Divider Customization

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    activeDividerColor: Colors.green,
    inactiveDividerColor: Colors.green.withOpacity(0.25),
    activeDividerStrokeWidth: 2,
    activeDividerRadius: 1,
  ),
  child: SfRangeSelector(
    initialValues: _values,
    interval: 2,
    showDividers: true,
    showLabels: true,
    child: Container(/* child */),
  ),
)
```

## Complete Examples

### Example 1: Slider with Ticks and Labels

```dart
class TickedSlider extends StatefulWidget {
  @override
  _TickedSliderState createState() => _TickedSliderState();
}

class _TickedSliderState extends State<TickedSlider> {
  double _value = 50.0;

  @override
  Widget build(BuildContext context) {
    return SfSliderTheme(
      data: SfSliderThemeData(
        activeTickColor: Colors.purple,
        inactiveTickColor: Colors.purple.withOpacity(0.3),
        tickSize: Size(2, 10),
      ),
      child: SfSlider(
        min: 0.0,
        max: 100.0,
        value: _value,
        interval: 10,
        showTicks: true,
        showLabels: true,
        activeColor: Colors.purple,
        inactiveColor: Colors.purple.withOpacity(0.2),
        onChanged: (dynamic value) {
          setState(() {
            _value = value;
          });
        },
      ),
    );
  }
}
```

### Example 2: Range Slider with Minor Ticks

```dart
class DetailedRangeSlider extends StatefulWidget {
  @override
  _DetailedRangeSliderState createState() => _DetailedRangeSliderState();
}

class _DetailedRangeSliderState extends State<DetailedRangeSlider> {
  SfRangeValues _values = SfRangeValues(30.0, 70.0);

  @override
  Widget build(BuildContext context) {
    return SfRangeSliderTheme(
      data: SfRangeSliderThemeData(
        // Major ticks
        activeTickColor: Colors.blue,
        inactiveTickColor: Colors.grey[400],
        tickSize: Size(3, 12),
        // Minor ticks
        activeMinorTickColor: Colors.blue.withOpacity(0.6),
        inactiveMinorTickColor: Colors.grey[300],
        minorTickSize: Size(2, 8),
      ),
      child: SfRangeSlider(
        min: 0.0,
        max: 100.0,
        values: _values,
        interval: 20,
        showTicks: true,
        minorTicksPerInterval: 3,  // 3 minor ticks between major ticks
        showLabels: true,
        onChanged: (SfRangeValues values) {
          setState(() {
            _values = values;
          });
        },
      ),
    );
  }
}
```

### Example 3: Range Selector with Dividers

```dart
class DividerRangeSelector extends StatelessWidget {
  final SfRangeValues _values = SfRangeValues(4.0, 8.0);
  
  @override
  Widget build(BuildContext context) {
    return SfRangeSelectorTheme(
      data: SfRangeSelectorThemeData(
        activeDividerColor: Colors.orange,
        inactiveDividerColor: Colors.orange.withOpacity(0.2),
        activeDividerStrokeWidth: 2,
      ),
      child: SfRangeSelector(
        min: 2.0,
        max: 10.0,
        initialValues: _values,
        interval: 1,
        showDividers: true,
        showLabels: true,
        activeColor: Colors.orange,
        inactiveColor: Colors.orange.withOpacity(0.2),
        child: Container(
          height: 130,
          child: SfCartesianChart(/* chart */),
        ),
      ),
    );
  }
}
```

### Example 4: Vertical Slider with Ticks

```dart
class VerticalTickedSlider extends StatefulWidget {
  @override
  _VerticalTickedSliderState createState() => _VerticalTickedSliderState();
}

class _VerticalTickedSliderState extends State<VerticalTickedSlider> {
  double _value = 50.0;

  @override
  Widget build(BuildContext context) {
    return SfSliderTheme(
      data: SfSliderThemeData(
        activeTickColor: Colors.teal,
        inactiveTickColor: Colors.grey,
        tickSize: Size(10, 2),  // Reversed for vertical
        activeMinorTickColor: Colors.teal.withOpacity(0.5),
        inactiveMinorTickColor: Colors.grey.withOpacity(0.4),
        minorTickSize: Size(6, 2),
      ),
      child: SfSlider.vertical(
        min: 0.0,
        max: 100.0,
        value: _value,
        interval: 25,
        showTicks: true,
        minorTicksPerInterval: 4,
        showLabels: true,
        onChanged: (dynamic value) {
          setState(() {
            _value = value;
          });
        },
      ),
    );
  }
}
```

## Best Practices

1. **Use ticks for visual reference**: Help users understand value positions
2. **Match ticks to labels**: Set `showTicks` and `showLabels` together
3. **Minor ticks for precision**: Use when users need fine-grained feedback
4. **Don't overdo minor ticks**: Too many creates visual clutter
5. **Consider dividers for sections**: Use dividers to clearly separate ranges
6. **Style consistently**: Match tick/divider colors with track colors
7. **Test readability**: Ensure ticks are visible against background
8. **Vertical slider ticks**: Remember to swap width/height in tick size

## Common Configurations

### Configuration 1: Simple Ticks
```dart
interval: 20
showTicks: true
showLabels: true
```

### Configuration 2: Detailed with Minor Ticks
```dart
interval: 25
showTicks: true
minorTicksPerInterval: 4
showLabels: true
```

### Configuration 3: Dividers Only
```dart
interval: 10
showDividers: true
showLabels: true
```

### Configuration 4: Everything
```dart
interval: 20
showTicks: true
minorTicksPerInterval: 3
showDividers: true
showLabels: true
```
