# Thumbs, Tooltips, and Overlay

This guide covers thumb customization, overlay effects, and tooltip configuration across all slider controls.

## Table of Contents
- [Thumb Customization](#thumb-customization)
- [Thumb Icons and Widgets](#thumb-icons-and-widgets)
- [Overlay Configuration](#overlay-configuration)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Shapes and Positioning](#tooltip-shapes-and-positioning)
- [Tooltip Text Formatting](#tooltip-text-formatting)
- [Always Show Tooltip](#always-show-tooltip)

## Thumb Customization

The thumb is the draggable circular indicator on the slider track.

### Thumb Size and Color

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    thumbRadius: 12,
    thumbColor: Colors.blue,
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

### Different Thumb Colors for Active/Inactive (Range Widgets)

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    thumbRadius: 14,
    thumbColor: Colors.green,
  ),
  child: SfRangeSlider(
    values: _values,
    onChanged: (SfRangeValues values) { },
  ),
)
```

### Thumb Stroke (Border)

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    thumbRadius: 12,
    thumbColor: Colors.white,
    thumbStrokeWidth: 2,
    thumbStrokeColor: Colors.blue,
  ),
  child: SfSlider(
    value: _value,
    activeColor: Colors.blue,
    onChanged: (dynamic value) { },
  ),
)
```

### Vertical Slider Thumbs

Same configuration applies to vertical sliders:

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    thumbRadius: 14,
    thumbColor: Colors.red,
  ),
  child: SfSlider.vertical(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

## Thumb Icons and Widgets

Add icons or custom widgets inside thumbs.

### Thumb Icon

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    thumbRadius: 16,
  ),
  child: SfSlider(
    value: _value,
    thumbIcon: Icon(
      Icons.circle,
      color: Colors.white,
      size: 12,
    ),
    onChanged: (dynamic value) { },
  ),
)
```

### Different Icons for Start and End Thumbs (Range Widgets)

For `SfRangeSlider` and `SfRangeSelector`, you can't directly set different icons per thumb via theme, but you can use custom builders (advanced).

Basic thumb icon for range widgets:

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    thumbRadius: 15,
    thumbIcon: Icon(
      Icons.drag_handle,
      color: Colors.white,
      size: 14,
    ),
  ),
  child: SfRangeSlider(
    values: _values,
    onChanged: (SfRangeValues values) { },
  ),
)
```

### Custom Thumb Shapes

While direct custom shapes require advanced customization, you can simulate shapes using icons or adjust thumb appearance:

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    thumbRadius: 10,
    thumbColor: Colors.blue,
    thumbStrokeWidth: 3,
    thumbStrokeColor: Colors.white,
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

## Overlay Configuration

The overlay is the circular ripple effect that appears when interacting with the thumb.

### Overlay Size and Color

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    thumbRadius: 12,
    overlayRadius: 24,  // Larger than thumb for ripple effect
    overlayColor: Colors.blue.withOpacity(0.2),
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

### Disable Overlay

Set overlay radius to 0 to disable:

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    overlayRadius: 0,  // No overlay
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

### Overlay for Range Widgets

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    thumbRadius: 14,
    overlayRadius: 28,
    overlayColor: Colors.green.withOpacity(0.15),
  ),
  child: SfRangeSlider(
    values: _values,
    activeColor: Colors.green,
    onChanged: (SfRangeValues values) { },
  ),
)
```

### Overlay for Range Selector

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    thumbRadius: 12,
    overlayRadius: 24,
    overlayColor: Colors.orange.withOpacity(0.2),
  ),
  child: SfRangeSelector(
    initialValues: _values,
    activeColor: Colors.orange,
    child: Container(/* child */),
  ),
)
```

## Enabling Tooltips

Tooltips display the current value when interacting with the slider.

### Enable Tooltip

```dart
SfSlider(
  value: _value,
  enableTooltip: true,  // Show tooltip on interaction
  onChanged: (dynamic value) { },
)
```

### Tooltip on Range Widgets

```dart
// SfRangeSlider
SfRangeSlider(
  values: _values,
  enableTooltip: true,  // Shows tooltip for both thumbs
  onChanged: (SfRangeValues values) { },
)

// SfRangeSelector
SfRangeSelector(
  initialValues: _values,
  enableTooltip: true,
  child: Container(/* child */),
)
```

### Tooltip Behavior

- Tooltips appear only during interaction (dragging, tapping)
- Disappear when interaction ends
- Show the current value at the thumb position

## Tooltip Shapes and Positioning

Customize tooltip appearance using theme data.

### Tooltip Shape

```dart
SfSliderTheme(
  data: SfSliderThemeData(),
  child: SfSlider(
    value: _value,
    enableTooltip: true,
    tooltipShape: SfRectangularTooltipShape(),
    onChanged: (dynamic value) { },
  ),
)
```

### Tooltip Color

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    tooltipBackgroundColor: Colors.blue,
    tooltipTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 14,
      fontWeight: FontWeight.bold,
    ),
  ),
  child: SfSlider(
    value: _value,
    enableTooltip: true,
    onChanged: (dynamic value) { },
  ),
)
```

### Range Slider Tooltip Styling

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    tooltipBackgroundColor: Colors.green,
    tooltipTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 13,
    ),
  ),
  child: SfRangeSlider(
    values: _values,
    enableTooltip: true,
    tooltipShape: SfPaddleTooltipShape(),
    onChanged: (SfRangeValues values) { },
  ),
)
```

### Range Selector Tooltip Styling

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    tooltipBackgroundColor: Colors.orange,
    tooltipTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 12,
    ),
  ),
  child: SfRangeSelector(
    initialValues: _values,
    enableTooltip: true,
    tooltipShape: SfRectangularTooltipShape(),
    child: Container(/* child */),
  ),
)
```

## Tooltip Text Formatting

Format tooltip text using `numberFormat`, `dateFormat`, or `tooltipTextFormatterCallback`.

### Number Format in Tooltip

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,
  enableTooltip: true,
  numberFormat: NumberFormat('\$#'),  // "$40"
  onChanged: (dynamic value) { },
)
```

### Date Format in Tooltip

```dart
SfSlider(
  min: DateTime(2020, 01, 01),
  max: DateTime(2025, 01, 01),
  value: _dateValue,
  enableTooltip: true,
  dateFormat: DateFormat.yMMMd(),  // "Jan 15, 2024"
  dateIntervalType: DateIntervalType.years,
  onChanged: (dynamic value) { },
)
```

### Custom Tooltip Formatter

Use `tooltipTextFormatterCallback` for complete control:

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,
  enableTooltip: true,
  tooltipTextFormatterCallback: (dynamic actualValue, String formattedText) {
    return '${actualValue.toInt()}%';
  },
  onChanged: (dynamic value) { },
)
```

### Range Slider Tooltip Formatter

```dart
SfRangeSlider(
  min: 0.0,
  max: 1000.0,
  values: _values,
  enableTooltip: true,
  tooltipTextFormatterCallback: (dynamic actualValue, String formattedText) {
    return '\$${actualValue.toInt()}';
  },
  onChanged: (SfRangeValues values) { },
)
```

### Date Range Tooltip Formatter

```dart
SfRangeSelector(
  min: DateTime(2024, 01, 01),
  max: DateTime(2024, 12, 31),
  initialValues: _dateValues,
  enableTooltip: true,
  dateFormat: DateFormat.MMMd(),
  dateIntervalType: DateIntervalType.months,
  tooltipTextFormatterCallback: (dynamic actualValue, String formattedText) {
    DateTime date = actualValue as DateTime;
    return DateFormat('MMM dd, yyyy').format(date);
  },
  child: Container(/* child */),
)
```

## Always Show Tooltip

By default, tooltips only show during interaction. To always show tooltips:

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    shouldAlwaysShowTooltip: true,  // Always visible
  ),
  child: SfSlider(
    value: _value,
    enableTooltip: true,
    onChanged: (dynamic value) { },
  ),
)
```

**Note**: This can clutter the UI, use sparingly.

## Complete Examples

### Example 1: Styled Slider with Custom Thumb and Tooltip

```dart
class StyledSlider extends StatefulWidget {
  @override
  _StyledSliderState createState() => _StyledSliderState();
}

class _StyledSliderState extends State<StyledSlider> {
  double _value = 50.0;

  @override
  Widget build(BuildContext context) {
    return SfSliderTheme(
      data: SfSliderThemeData(
        // Thumb
        thumbRadius: 14,
        thumbColor: Colors.white,
        thumbStrokeWidth: 3,
        thumbStrokeColor: Colors.deepPurple,
        // Overlay
        overlayRadius: 28,
        overlayColor: Colors.deepPurple.withOpacity(0.15),
        // Tooltip
        tooltipBackgroundColor: Colors.deepPurple,
        tooltipTextStyle: TextStyle(
          color: Colors.white,
          fontSize: 14,
          fontWeight: FontWeight.bold,
        ),
      ),
      child: SfSlider(
        min: 0.0,
        max: 100.0,
        value: _value,
        interval: 25,
        showLabels: true,
        showTicks: true,
        enableTooltip: true,
        activeColor: Colors.deepPurple,
        inactiveColor: Colors.deepPurple.withOpacity(0.2),
        tooltipTextFormatterCallback: (dynamic value, String text) {
          return '${value.toInt()}%';
        },
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

### Example 2: Range Slider with Icons

```dart
class IconRangeSlider extends StatefulWidget {
  @override
  _IconRangeSliderState createState() => _IconRangeSliderState();
}

class _IconRangeSliderState extends State<IconRangeSlider> {
  SfRangeValues _values = SfRangeValues(30.0, 70.0);

  @override
  Widget build(BuildContext context) {
    return SfRangeSliderTheme(
      data: SfRangeSliderThemeData(
        thumbRadius: 16,
        thumbColor: Colors.blue,
        thumbIcon: Icon(
          Icons.radio_button_unchecked,
          color: Colors.white,
          size: 14,
        ),
        overlayRadius: 32,
        overlayColor: Colors.blue.withOpacity(0.12),
        tooltipBackgroundColor: Colors.blue,
      ),
      child: SfRangeSlider(
        min: 0.0,
        max: 100.0,
        values: _values,
        interval: 20,
        showLabels: true,
        enableTooltip: true,
        activeColor: Colors.blue,
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

### Example 3: Temperature Slider with Custom Tooltip

```dart
class TemperatureSlider extends StatefulWidget {
  @override
  _TemperatureSliderState createState() => _TemperatureSliderState();
}

class _TemperatureSliderState extends State<TemperatureSlider> {
  double _temp = 22.0;

  @override
  Widget build(BuildContext context) {
    return SfSliderTheme(
      data: SfSliderThemeData(
        thumbRadius: 15,
        thumbColor: _temp < 20 ? Colors.blue : Colors.orange,
        overlayRadius: 30,
        overlayColor: (_temp < 20 ? Colors.blue : Colors.orange).withOpacity(0.15),
        tooltipBackgroundColor: _temp < 20 ? Colors.blue : Colors.orange,
        tooltipTextStyle: TextStyle(color: Colors.white, fontSize: 16),
      ),
      child: SfSlider(
        min: 16.0,
        max: 30.0,
        value: _temp,
        interval: 2,
        showLabels: true,
        showTicks: true,
        enableTooltip: true,
        activeColor: _temp < 20 ? Colors.blue : Colors.orange,
        tooltipTextFormatterCallback: (dynamic value, String text) {
          return '${value.toStringAsFixed(1)}°C';
        },
        numberFormat: NumberFormat('#°'),
        onChanged: (dynamic value) {
          setState(() {
            _temp = value;
          });
        },
      ),
    );
  }
}
```

### Example 4: Range Selector with Always-Visible Tooltip

```dart
class AlwaysTooltipRangeSelector extends StatelessWidget {
  final SfRangeValues _values = SfRangeValues(4.0, 8.0);
  
  @override
  Widget build(BuildContext context) {
    return SfRangeSelectorTheme(
      data: SfRangeSelectorThemeData(
        thumbRadius: 12,
        thumbColor: Colors.green,
        overlayRadius: 24,
        tooltipBackgroundColor: Colors.green,
        shouldAlwaysShowTooltip: true,  // Always visible
      ),
      child: SfRangeSelector(
        min: 2.0,
        max: 10.0,
        initialValues: _values,
        interval: 2,
        showLabels: true,
        enableTooltip: true,
        activeColor: Colors.green,
        child: Container(
          height: 130,
          child: SfCartesianChart(/* chart */),
        ),
      ),
    );
  }
}
```

## Best Practices

1. **Match thumb and overlay colors**: Create visual cohesion
2. **Size overlay larger than thumb**: Typical ratio is 2:1
3. **Use tooltips for precision**: Help users see exact values
4. **Format tooltip text**: Use `tooltipTextFormatterCallback` for clarity
5. **Don't over-style**: Simple, clean thumbs improve usability
6. **Test touch targets**: Ensure thumbs are easy to grab (minimum 12-16px radius)
7. **Consider accessibility**: Good contrast for thumb against track
8. **Tooltip always-show sparingly**: Only when value needs constant visibility

## Common Thumb/Tooltip Configurations

### Configuration 1: Minimal
```dart
thumbRadius: 10
overlayRadius: 20
enableTooltip: false
```

### Configuration 2: Standard with Tooltip
```dart
thumbRadius: 12
overlayRadius: 24
enableTooltip: true
tooltipBackgroundColor: Colors.blue
```

### Configuration 3: Large with Icon
```dart
thumbRadius: 16
thumbIcon: Icon(Icons.circle, color: Colors.white, size: 12)
overlayRadius: 32
enableTooltip: true
```

### Configuration 4: Bordered Thumb
```dart
thumbRadius: 14
thumbColor: Colors.white
thumbStrokeWidth: 3
thumbStrokeColor: Colors.blue
overlayRadius: 28
enableTooltip: true
```
