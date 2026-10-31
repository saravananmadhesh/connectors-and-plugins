# Linear Gauge Overview

The **SfLinearGauge** widget is a data visualization component that displays values on a linear (straight-line) scale. It's ideal for creating progress indicators, sliders, battery displays, and any measurement that can be represented along a horizontal or vertical axis.

## When to Use Linear Gauge

Choose SfLinearGauge when you need:

- **Horizontal or vertical measurement displays** (progress bars, sliders)
- **Bar-style progress indicators** with filled regions
- **Linear data visualization** along a straight axis
- **Orientation flexibility** (easy rotation between horizontal/vertical)
- **Mirror effect** for symmetric displays (e.g., stereo volume)
- **Simpler gauge designs** without circular complexity

## Key Features

### Orientation Support

Linear Gauge supports both horizontal and vertical orientations, providing layout flexibility:

```dart
// Horizontal gauge (default)
SfLinearGauge(
  orientation: LinearGaugeOrientation.horizontal,
)

// Vertical gauge
SfLinearGauge(
  orientation: LinearGaugeOrientation.vertical,
)
```

### Axis Customization

The axis is the foundation of the gauge where values are plotted. Customize the axis with:

- **Minimum and maximum values**: Define the value range
- **Axis track styling**: Thickness, colors, gradients, borders
- **Edge styles**: Flat or curved corners
- **Inverse direction**: Reverse the axis from right-to-left or bottom-to-top

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 10,
    color: Colors.grey[300],
    edgeStyle: LinearEdgeStyle.bothCurve,
  ),
)
```

### Labels and Ticks

Axis elements help users read values:

- **Labels**: Display numeric values along the axis
- **Major ticks**: Primary tick marks at intervals
- **Minor ticks**: Secondary tick marks between intervals
- **Customizable positioning**: Inside, outside, or cross the axis

```dart
SfLinearGauge(
  interval: 10,
  showLabels: true,
  showTicks: true,
  labelPosition: LinearLabelPosition.outside,
  tickPosition: LinearElementPosition.outside,
)
```

### Ranges

Ranges are visual segments that highlight specific value ranges with colors:

```dart
SfLinearGauge(
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 30,
      color: Colors.red,
    ),
    LinearGaugeRange(
      startValue: 30,
      endValue: 70,
      color: Colors.yellow,
    ),
    LinearGaugeRange(
      startValue: 70,
      endValue: 100,
      color: Colors.green,
    ),
  ],
)
```

### Pointer Types

Linear Gauge provides three pointer types:

1. **Shape Marker Pointer**: Pre-built shapes (triangle, circle, diamond, etc.)
2. **Widget Marker Pointer**: Custom Flutter widgets as pointers
3. **Bar Pointer**: Filled bar from minimum to the pointer value

```dart
SfLinearGauge(
  markerPointers: [
    // Shape pointer
    LinearShapePointer(
      value: 60,
      shapeType: LinearShapePointerType.triangle,
    ),
    // Widget pointer
    LinearWidgetPointer(
      value: 40,
      child: Icon(Icons.star, color: Colors.amber),
    ),
  ],
  barPointers: [
    // Bar pointer
    LinearBarPointer(
      value: 75,
      thickness: 10,
    ),
  ],
)
```

### Mirror Gauge

The mirror effect creates symmetric displays where gauge elements render in a mirrored fashion:

```dart
SfLinearGauge(
  isMirrored: true,
  minimum: 0,
  maximum: 100,
  markerPointers: [
    LinearShapePointer(value: 60),
  ],
)
```

This is useful for:
- Stereo volume controls (left/right channels)
- Symmetric battery indicators
- Dual-direction measurements

### Animation

Add smooth animations when values change or on initial load:

```dart
SfLinearGauge(
  animationDuration: 1500,
  barPointers: [
    LinearBarPointer(
      value: 80,
      enableAnimation: true,
      animationType: LinearAnimationType.ease,
    ),
  ],
)
```

### Interaction

Enable pointer dragging for interactive value changes:

```dart
SfLinearGauge(
  markerPointers: [
    LinearShapePointer(
      value: 50,
      enableDragging: true,
      onChanged: (double value) {
        print('New value: $value');
      },
    ),
  ],
)
```

## Component Structure

The Linear Gauge consists of the following elements:

```
SfLinearGauge
├── Axis Track (the linear scale)
├── Labels (value markers)
├── Ticks (major and minor)
├── Ranges (colored segments)
├── Marker Pointers (shape or widget)
└── Bar Pointers (filled bars)
```

## Basic Configuration

### Minimal Setup

The simplest linear gauge with default settings:

```dart
SfLinearGauge()
```

This creates:
- Horizontal orientation
- Minimum value: 0
- Maximum value: 100
- Default styling

### Custom Range Setup

Configure a custom value range:

```dart
SfLinearGauge(
  minimum: -50,
  maximum: 50,
  interval: 10,
)
```

### With Visual Elements

Add ranges and pointers for complete visualization:

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  orientation: LinearGaugeOrientation.vertical,
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 40,
      color: Colors.red,
    ),
    LinearGaugeRange(
      startValue: 40,
      endValue: 100,
      color: Colors.green,
    ),
  ],
  barPointers: [
    LinearBarPointer(
      value: 75,
      thickness: 15,
      edgeStyle: LinearEdgeStyle.endCurve,
    ),
  ],
)
```

## Comparison: Linear vs Radial Gauge

| Aspect | Linear Gauge | Radial Gauge |
|--------|--------------|--------------|
| **Visual Style** | Straight line (bar) | Circle/arc |
| **Space Efficiency** | Better for narrow spaces | Needs circular space |
| **Orientation** | Horizontal/Vertical | Circular (angles) |
| **Bar Pointer** | ✅ Yes | ❌ No |
| **Needle Pointer** | ❌ No | ✅ Yes |
| **Mirror Effect** | ✅ Yes | ❌ No |
| **Multiple Axes** | ❌ Limited | ✅ Full support |
| **Best For** | Progress bars, sliders | Speedometers, dials |

## Common Use Cases

### Progress Indicators

```dart
SfLinearGauge(
  maximum: 100,
  barPointers: [
    LinearBarPointer(
      value: 65,
      color: Colors.blue,
      thickness: 20,
      edgeStyle: LinearEdgeStyle.bothCurve,
    ),
  ],
)
```

### Battery Indicator

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  showLabels: false,
  showTicks: false,
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 20,
      color: Colors.red,
    ),
    LinearGaugeRange(
      startValue: 20,
      endValue: 100,
      color: Colors.green,
    ),
  ],
  barPointers: [
    LinearBarPointer(
      value: 75,
      thickness: 25,
    ),
  ],
)
```

### Temperature Display (Vertical)

```dart
SfLinearGauge(
  orientation: LinearGaugeOrientation.vertical,
  minimum: -20,
  maximum: 50,
  ranges: [
    LinearGaugeRange(
      startValue: -20,
      endValue: 0,
      color: Colors.blue,
    ),
    LinearGaugeRange(
      startValue: 0,
      endValue: 25,
      color: Colors.green,
    ),
    LinearGaugeRange(
      startValue: 25,
      endValue: 50,
      color: Colors.red,
    ),
  ],
  markerPointers: [
    LinearShapePointer(
      value: 22,
      shapeType: LinearShapePointerType.circle,
    ),
  ],
)
```

### Volume Slider (Interactive)

```dart
double _volume = 50;

SfLinearGauge(
  minimum: 0,
  maximum: 100,
  showLabels: false,
  barPointers: [
    LinearBarPointer(
      value: _volume,
      thickness: 10,
    ),
  ],
  markerPointers: [
    LinearShapePointer(
      value: _volume,
      enableDragging: true,
      onChanged: (value) {
        setState(() {
          _volume = value;
        });
      },
    ),
  ],
)
```

## Design Considerations

### When Linear Gauge is Ideal

- **Horizontal layouts**: Progress bars, loading indicators
- **Vertical layouts**: Temperature, volume, battery displays
- **Simple measurements**: Single-axis data representation
- **Space constraints**: Works well in narrow spaces
- **Touch interactions**: Natural swipe/drag gestures

### When to Choose Radial Gauge Instead

- **Circular designs**: Dashboards with round elements
- **Needle indicators**: Traditional gauge aesthetics
- **Multiple scales**: Displaying several metrics on one gauge
- **Angular data**: Compass, clock, or rotation displays
- **Visual impact**: Circular gauges often draw more attention

## Next Steps

- Explore **Axis** customization options in detail
- Learn about **Pointer** types and interactions
- Add **Ranges** for threshold visualization
- Customize **Appearance** with colors and gradients
- Enable **Animations** for smooth transitions
