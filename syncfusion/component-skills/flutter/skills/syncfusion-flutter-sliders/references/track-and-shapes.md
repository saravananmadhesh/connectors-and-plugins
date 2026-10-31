# Track and Shapes Customization

This guide covers track styling, active/inactive colors, track dimensions, and shape customization across all slider controls.

## Table of Contents
- [Active and Inactive Colors](#active-and-inactive-colors)
- [Track Height and Thickness](#track-height-and-thickness)
- [Track Corners and Shapes](#track-corners-and-shapes)
- [Custom Track Styling](#custom-track-styling)
- [Active vs Inactive Regions](#active-vs-inactive-regions)

## Active and Inactive Colors

The track is divided into active and inactive regions, each with customizable colors.

### SfSlider Active/Inactive Regions

- **Active**: From `min` to thumb position
- **Inactive**: From thumb position to `max`

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 40.0,
  activeColor: Colors.blue,
  inactiveColor: Colors.grey.withOpacity(0.3),
  showLabels: true,
  on Changed: (dynamic value) { },
)
```

### SfRangeSlider Active/Inactive Regions

- **Active**: Between start and end thumbs
- **Inactive**: Before start thumb and after end thumb

```dart
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(30.0, 70.0),
  activeColor: Colors.green,
  inactiveColor: Colors.grey.withOpacity(0.3),
  onChanged: (SfRangeValues values) { },
)
```

### SfRangeSelector Active/Inactive Regions

Same as `SfRangeSlider`:

```dart
SfRangeSelector(
  min: 0.0,
  max: 100.0,
  initialValues: SfRangeValues(30.0, 70.0),
  activeColor: Colors.orange,
  inactiveColor: Colors.grey.withOpacity(0.3),
  child: Container(/* child */),
)
```

### Vertical Sliders

Same color behavior applies to vertical sliders:

```dart
SfSlider.vertical(
  value: 40.0,
  activeColor: Colors.red,
  inactiveColor: Colors.pink.withOpacity(0.2),
  onChanged: (dynamic value) { },
)
```

## Track Height and Thickness

Customize track dimensions using `SfSliderTheme` (or specific theme widgets).

### Horizontal Track Height

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    activeTrackHeight: 8,
    inactiveTrackHeight: 4,
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

### Vertical Track Width

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    activeTrackHeight: 8,    // Actually controls width in vertical
    inactiveTrackHeight: 4,
  ),
  child: SfSlider.vertical(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

### Range Slider Track

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    activeTrackHeight: 10,
    inactiveTrackHeight: 5,
  ),
  child: SfRangeSlider(
    values: _values,
    onChanged: (SfRangeValues values) { },
  ),
)
```

### Range Selector Track

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    activeTrackHeight: 8,
    inactiveTrackHeight: 4,
  ),
  child: SfRangeSelector(
    initialValues: _values,
    child: Container(/* child */),
  ),
)
```

## Track Corners and Shapes

### Track Corner Radius

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    activeTrackHeight: 6,
    inactiveTrackHeight: 6,
    trackCornerRadius: 3,  // Rounded corners
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

### Sharp Corners

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    trackCornerRadius: 0,  // Sharp/rectangular track
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

### Fully Rounded Track

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    activeTrackHeight: 10,
    inactiveTrackHeight: 10,
    trackCornerRadius: 5,  // Half of track height for pill shape
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) { },
  ),
)
```

## Custom Track Styling

### Track Color with Opacity

```dart
SfRangeSlider(
  values: _values,
  activeColor: Colors.blue.withOpacity(0.8),
  inactiveColor: Colors.blue.withOpacity(0.2),
  onChanged: (SfRangeValues values) { },
)
```

### Gradient-like Effect (using opacity)

```dart
SfSlider(
  value: _value,
  activeColor: Color(0xFF0066FF),
  inactiveColor: Color(0xFFCCE0FF),
  onChanged: (dynamic value) { },
)
```

### Matching Active/Inactive

Use same color with different opacities for cohesive look:

```dart
final Color _baseColor = Colors.purple;

SfRangeSlider(
  values: _values,
  activeColor: _baseColor,
  inactiveColor: _baseColor.withOpacity(0.25),
  onChanged: (SfRangeValues values) { },
)
```

## Active vs Inactive Regions

### Understanding Regions by Widget

#### SfSlider
```
[min]====ACTIVE====[thumb]----inactive----[max]
```

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 30.0,  // Active: 0-30, Inactive: 30-100
  activeColor: Colors.blue,
  inactiveColor: Colors.grey,
  onChanged: (dynamic value) { },
)
```

#### SfRangeSlider
```
[min]--inactive--[startThumb]====ACTIVE====[endThumb]--inactive--[max]
```

```dart
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(20.0, 80.0),  // Inactive: 0-20 and 80-100, Active: 20-80
  activeColor: Colors.green,
  inactiveColor: Colors.grey,
  onChanged: (SfRangeValues values) { },
)
```

#### SfRangeSelector
Same as `SfRangeSlider`, but also affects child widget regions.

### SfRangeSelector Region Colors (Child Widget)

Unique to `SfRangeSelector` - style the child widget's active/inactive regions:

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    activeRegionColor: Colors.blue.withOpacity(0.15),   // Tint active region
    inactiveRegionColor: Colors.grey.withOpacity(0.08),  // Tint inactive regions
  ),
  child: SfRangeSelector(
    initialValues: _values,
    activeColor: Colors.blue,
    inactiveColor: Colors.grey,
    child: Container(
      height: 130,
      child: SfCartesianChart(/* chart */),
    ),
  ),
)
```

## Complete Examples

### Example 1: Modern Slider with Thick Track

```dart
class ModernSlider extends StatefulWidget {
  @override
  _ModernSliderState createState() => _ModernSliderState();
}

class _ModernSliderState extends State<ModernSlider> {
  double _value = 50.0;

  @override
  Widget build(BuildContext context) {
    return SfSliderTheme(
      data: SfSliderThemeData(
        activeTrackHeight: 12,
        inactiveTrackHeight: 12,
        trackCornerRadius: 6,
        thumbRadius: 16,
        overlayRadius: 24,
      ),
      child: SfSlider(
        min: 0.0,
        max: 100.0,
        value: _value,
        activeColor: Color(0xFF6200EE),
        inactiveColor: Color(0xFFE0E0E0),
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

### Example 2: Minimal Flat Range Slider

```dart
class MinimalRangeSlider extends StatefulWidget {
  @override
  _MinimalRangeSliderState createState() => _MinimalRangeSliderState();
}

class _MinimalRangeSliderState extends State<MinimalRangeSlider> {
  SfRangeValues _values = SfRangeValues(25.0, 75.0);

  @override
  Widget build(BuildContext context) {
    return SfRangeSliderTheme(
      data: SfRangeSliderThemeData(
        activeTrackHeight: 2,
        inactiveTrackHeight: 2,
        trackCornerRadius: 1,
        thumbRadius: 10,
        overlayRadius: 20,
      ),
      child: SfRangeSlider(
        min: 0.0,
        max: 100.0,
        values: _values,
        activeColor: Colors.black87,
        inactiveColor: Colors.grey[300],
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

### Example 3: Colored Range Selector with Chart

```dart
class ColoredRangeSelector extends StatelessWidget {
  final SfRangeValues _values = SfRangeValues(0.3, 0.7);
  
  @override
  Widget build(BuildContext context) {
    return SfRangeSelectorTheme(
      data: SfRangeSelectorThemeData(
        activeTrackHeight: 6,
        inactiveTrackHeight: 4,
        trackCornerRadius: 3,
        activeRegionColor: Colors.blue.withOpacity(0.12),
        inactiveRegionColor: Colors.grey.withOpacity(0.05),
      ),
      child: SfRangeSelector(
        min: 0.0,
        max: 1.0,
        initialValues: _values,
        activeColor: Colors.blue,
        inactiveColor: Colors.grey.withOpacity(0.4),
        child: Container(
          height: 130,
          child: SfCartesianChart(
            margin: EdgeInsets.zero,
            primaryXAxis: NumericAxis(isVisible: false),
            primaryYAxis: NumericAxis(isVisible: false),
            series: [
              SplineAreaSeries(
                dataSource: chartData,
                xValueMapper: (data, _) => data.x,
                yValueMapper: (data, _) => data.y,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Example 4: Vertical Slider with Custom Track

```dart
class VerticalVolumeSlider extends StatefulWidget {
  @override
  _VerticalVolumeSliderState createState() => _VerticalVolumeSliderState();
}

class _VerticalVolumeSliderState extends State<VerticalVolumeSlider> {
  double _volume = 70.0;

  @override
  Widget build(BuildContext context) {
    return SfSliderTheme(
      data: SfSliderThemeData(
        activeTrackHeight: 8,
        inactiveTrackHeight: 6,
        trackCornerRadius: 4,
      ),
      child: SfSlider.vertical(
        min: 0.0,
        max: 100.0,
        value: _volume,
        interval: 25,
        showLabels: true,
        activeColor: Colors.orange,
        inactiveColor: Colors.orange.withOpacity(0.2),
        onChanged: (dynamic value) {
          setState(() {
            _volume = value;
          });
        },
      ),
    );
  }
}
```

## Best Practices

1. **Maintain visual hierarchy**: Active track should be more prominent than inactive
2. **Use opacity for cohesion**: Same base color with different opacities creates harmony
3. **Consider touch targets**: Thicker tracks can improve usability
4. **Match track height**: Use same height for active/inactive for clean appearance
5. **Round corners subtly**: `trackCornerRadius` = half of track height for pill shape
6. **Theme consistently**: Use theme data for consistent styling across widgets
7. **Test vertical sliders**: Ensure track width (height property) looks good vertically

## Common Track Configurations

### Configuration 1: Prominent Active Track
```dart
activeTrackHeight: 8
inactiveTrackHeight: 4
activeColor: Colors.blue
inactiveColor: Colors.grey.withOpacity(0.3)
```

### Configuration 2: Uniform Thickness
```dart
activeTrackHeight: 6
inactiveTrackHeight: 6
activeColor: Colors.green
inactiveColor: Colors.green.withOpacity(0.25)
```

### Configuration 3: Minimal/Flat Design
```dart
activeTrackHeight: 2
inactiveTrackHeight: 2
trackCornerRadius: 1
activeColor: Colors.black87
inactiveColor: Colors.grey[300]
```

### Configuration 4: Bold/Chunky
```dart
activeTrackHeight: 12
inactiveTrackHeight: 12
trackCornerRadius: 6
activeColor: Colors.deepPurple
inactiveColor: Colors.deepPurple.withOpacity(0.2)
```
