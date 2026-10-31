# SfSlider Overview

The **SfSlider** is a highly interactive UI widget for selecting a single value from a range of values. It's the simplest of the three slider controls, focusing on single-value selection with rich customization options.

## When to Use SfSlider

Use `SfSlider` when you need:

- **Single value selection** from a continuous range
- **Compact UI** for value adjustment (volume, brightness, zoom)
- **No range selection** (start/end values) required
- **Simple slider behavior** without child widgets or controllers

## Key Features

### Numeric and Date Support

Supports both numeric (`double`) and date (`DateTime`) values:

```dart
// Numeric slider
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 40.0,
  onChanged: (dynamic newValue) { },
)

// Date slider
SfSlider(
  min: DateTime(2000, 01, 01),
  max: DateTime(2024, 12, 31),
  value: DateTime(2020, 06, 15),
  dateFormat: DateFormat.y(),
  dateIntervalType: DateIntervalType.years,
  onChanged: (dynamic newValue) { },
)
```

### Visual Elements

- **Labels**: Display values at intervals
- **Ticks**: Visual markers at intervals
- **Dividers**: Separator lines between intervals
- **Tooltip**: Shows current value on interaction
- **Thumb**: Draggable indicator
- **Track**: Active and inactive regions

### Orientation Support

Supports both horizontal and vertical orientations:

```dart
// Horizontal (default)
SfSlider(
  value: _value,
  onChanged: (dynamic newValue) { },
)

// Vertical
SfSlider.vertical(
  value: _value,
  onChanged: (dynamic newValue) { },
)
```

### Customization

Fully customizable appearance:

- Custom thumb icons or widgets
- Active/inactive track colors
- Tick and divider styling
- Label formatting and positioning
- Tooltip shapes and text

## Basic Configuration

### Minimum Example

```dart
double _value = 50.0;

SfSlider(
  value: _value,
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

### With Visual Elements

```dart
double _value = 40.0;

SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,
  interval: 20,
  showLabels: true,
  showTicks: true,
  enableTooltip: true,
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

## Value Property

The `value` property represents the currently selected value. It must be within the `min` and `max` range:

```dart
// Valid
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,  // Within range
  onChanged: (dynamic newValue) { },
)

// Invalid (will throw error)
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 150.0,  // Outside range
  onChanged: (dynamic newValue) { },
)
```

## Callbacks

### onChanged (Required)

Called when the user interacts with the slider:

```dart
SfSlider(
  value: _value,
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

If `onChanged` is `null`, the slider is disabled.

### onChangeStart

Called when interaction begins:

```dart
SfSlider(
  value: _value,
  onChangeStart: (dynamic startValue) {
    print('Started dragging at: $startValue');
  },
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

### onChangeEnd

Called when interaction ends:

```dart
SfSlider(
  value: _value,
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
  onChangeEnd: (dynamic endValue) {
    print('Stopped at: $endValue');
    _saveValue(endValue);
  },
)
```

## Comparison with Range Widgets

| Feature | SfSlider | SfRangeSlider | SfRangeSelector |
|---------|----------|---------------|-----------------|
| Value type | Single `value` | `values` (SfRangeValues) | `initialValues` or `controller` |
| Thumbs | 1 | 2 | 2 |
| Child widget | ❌ | ❌ | ✅ |
| Drag modes | ❌ | ✅ | ✅ |
| Controller | ❌ | ❌ | ✅ (RangeController) |
| Use case | Single selection | Range selection | Range with chart/child |

## Common Use Cases

1. **Volume/Brightness Control** - Adjust system settings
2. **Progress Indicator** - Show and adjust progress
3. **Timeline Scrubber** - Navigate through time-based content
4. **Zoom Level** - Control zoom factor
5. **Temperature Adjuster** - Set target temperature
6. **Rating Slider** - Select rating value
7. **Opacity Control** - Adjust transparency

## Best Practices

1. **Provide visual feedback**: Enable tooltips for better UX
2. **Show labels and ticks**: Help users understand the scale
3. **Use appropriate intervals**: Match intervals to use case (e.g., 5 for 0-100 percentage)
4. **Handle state properly**: Always update value in `setState()` or state management
5. **Consider orientation**: Use vertical sliders for compact layouts
6. **Format labels**: Use `numberFormat` or `dateFormat` for clarity

## Example: Complete Slider

```dart
class TemperatureSlider extends StatefulWidget {
  @override
  _TemperatureSliderState createState() => _TemperatureSliderState();
}

class _TemperatureSliderState extends State<TemperatureSlider> {
  double _temperature = 22.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          '${_temperature.toStringAsFixed(1)}°C',
          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),
        SfSlider(
          min: 16.0,
          max: 30.0,
          value: _temperature,
          interval: 2,
          showLabels: true,
          showTicks: true,
          enableTooltip: true,
          numberFormat: NumberFormat('#.#°'),
          activeColor: Colors.orange,
          inactiveColor: Colors.blue.withOpacity(0.3),
          onChanged: (dynamic newValue) {
            setState(() {
              _temperature = newValue;
            });
          },
        ),
      ],
    );
  }
}
```

## Next Steps

- For numeric and date configuration, see [values-and-intervals.md](values-and-intervals.md)
- For visual customization, see [track-and-shapes.md](track-and-shapes.md) and [thumbs-tooltips-overlay.md](thumbs-tooltips-overlay.md)
- For labels and formatting, see [labels-and-formatting.md](labels-and-formatting.md)
