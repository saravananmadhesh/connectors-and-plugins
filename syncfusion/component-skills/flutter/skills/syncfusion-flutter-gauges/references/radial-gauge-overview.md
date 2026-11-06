# Radial Gauge Overview

The **SfRadialGauge** widget is a powerful data visualization component that displays values on a circular or arc scale. It's perfect for creating speedometers, dashboards, clocks, and any measurement that benefits from a circular representation.

## When to Use Radial Gauge

Choose SfRadialGauge when you need:

- **Circular or arc-shaped displays** (speedometers, dials, meters)
- **Needle pointers** for classic analog gauge style
- **Multiple axes** on a single gauge for comparing metrics
- **Annotations** to place widgets at specific positions
- **Title support** for labeling the gauge
- **360-degree or semi-circle** visualizations
- **Export to image** functionality for reports

## Key Features

### Multiple Axes Support

Radial Gauge supports multiple axes, allowing you to display several scales on one gauge:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 100,
      radiusFactor: 0.9,
    ),
    RadialAxis(
      minimum: 0,
      maximum: 60,
      radiusFactor: 0.6,
      isInversed: true,
    ),
  ],
)
```

### Axis Customization

Each radial axis is a circular arc with extensive customization options:

- **Minimum and maximum values**: Define value range
- **Start and end angles**: Control arc sweep (full circle or partial)
- **Radius factor**: Size of the axis relative to gauge
- **Center position**: X and Y positioning
- **Inverse direction**: Clockwise or counterclockwise

```dart
RadialAxis(
  minimum: 0,
  maximum: 150,
  startAngle: 180,
  endAngle: 0,
  radiusFactor: 0.8,
  isInversed: false,
)
```

### Labels and Ticks

Radial axes display labels and ticks along the circular path:

- **Labels**: Numeric values around the arc
- **Label rotation**: Rotate labels based on angle
- **Major ticks**: Primary tick marks
- **Minor ticks**: Secondary tick marks
- **Positioning**: Inside or outside the axis

```dart
RadialAxis(
  interval: 10,
  showLabels: true,
  canRotateLabels: true,
  labelsPosition: ElementsPosition.outside,
  ticksPosition: ElementsPosition.outside,
  majorTickStyle: MajorTickStyle(
    length: 10,
    thickness: 2,
  ),
  minorTickStyle: MinorTickStyle(
    length: 5,
    thickness: 1,
  ),
  minorTicksPerInterval: 4,
)
```

### Ranges

Ranges highlight specific value segments with colors:

```dart
RadialAxis(
  ranges: [
    GaugeRange(
      startValue: 0,
      endValue: 50,
      color: Colors.green,
      startWidth: 10,
      endWidth: 10,
    ),
    GaugeRange(
      startValue: 50,
      endValue: 100,
      color: Colors.orange,
      startWidth: 10,
      endWidth: 10,
    ),
    GaugeRange(
      startValue: 100,
      endValue: 150,
      color: Colors.red,
      startWidth: 10,
      endWidth: 10,
    ),
  ],
)
```

### Pointer Types

Radial Gauge provides four pointer types:

1. **Needle Pointer**: Classic analog gauge needle
2. **Marker Pointer**: Shape markers (circle, triangle, diamond, etc.)
3. **Range Pointer**: Arc segment from start to value
4. **Widget Pointer**: Custom Flutter widgets

```dart
RadialAxis(
  pointers: [
    // Needle pointer
    NeedlePointer(
      value: 90,
      needleLength: 0.8,
      needleColor: Colors.red,
    ),
    // Marker pointer
    MarkerPointer(
      value: 75,
      markerType: MarkerType.circle,
    ),
    // Range pointer
    RangePointer(
      value: 60,
      width: 10,
      color: Colors.blue,
    ),
    // Widget pointer
    WidgetPointer(
      value: 50,
      child: Icon(Icons.star),
    ),
  ],
)
```

### Annotations

Place any Flutter widget at specific positions on the gauge:

```dart
RadialAxis(
  annotations: [
    GaugeAnnotation(
      widget: Container(
        child: Text(
          '90 km/h',
          style: TextStyle(
            fontSize: 25,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      angle: 90,
      positionFactor: 0.5,
    ),
  ],
)
```

### Title Support

Add a title above the gauge for context:

```dart
SfRadialGauge(
  title: GaugeTitle(
    text: 'Speedometer',
    textStyle: TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  ),
)
```

### Pointer Animation

Smooth animations when pointer values change:

```dart
NeedlePointer(
  value: 90,
  enableAnimation: true,
  animationDuration: 1200,
  animationType: AnimationType.ease,
)
```

### Pointer Interaction

Enable dragging for user interaction:

```dart
MarkerPointer(
  value: 60,
  enableDragging: true,
  onValueChanged: (double value) {
    print('New value: $value');
  },
)
```

### Export to Image

Export the gauge as an image for reports or sharing:

```dart
final RenderRepaintBoundary boundary = 
    globalKey.currentContext!.findRenderObject() as RenderRepaintBoundary;
final ui.Image image = await boundary.toImage();
final ByteData? byteData = 
    await image.toByteData(format: ui.ImageByteFormat.png);
```

## Component Structure

The Radial Gauge consists of hierarchical elements:

```
SfRadialGauge
├── Title (optional)
├── Background Color
└── Axes (array of RadialAxis)
    ├── Axis Line (circular arc)
    ├── Labels (value markers)
    ├── Ticks (major and minor)
    ├── Ranges (colored arc segments)
    ├── Pointers (needle, marker, range, widget)
    └── Annotations (custom widgets)
```

## Basic Configuration

### Minimal Setup

The simplest radial gauge:

```dart
SfRadialGauge()
```

This creates:
- One axis with default settings
- Minimum: 0, Maximum: 100
- Full circle (360°)
- Default styling

### With Title

Add a title for context:

```dart
SfRadialGauge(
  title: GaugeTitle(text: 'Speed'),
)
```

### Custom Angle Configuration

Create a semi-circle gauge:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      startAngle: 180,
      endAngle: 0,
    ),
  ],
)
```

### Complete Speedometer

```dart
SfRadialGauge(
  title: GaugeTitle(
    text: 'Speedometer',
    textStyle: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
  ),
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 150,
      ranges: [
        GaugeRange(startValue: 0, endValue: 50, color: Colors.green),
        GaugeRange(startValue: 50, endValue: 100, color: Colors.orange),
        GaugeRange(startValue: 100, endValue: 150, color: Colors.red),
      ],
      pointers: [
        NeedlePointer(value: 90),
      ],
      annotations: [
        GaugeAnnotation(
          widget: Text(
            '90',
            style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
          ),
          angle: 90,
          positionFactor: 0.5,
        ),
      ],
    ),
  ],
)
```

## Angle Configuration

Radial Gauge uses angles to define the arc sweep:

- **Default**: startAngle: 270, endAngle: 270 (full circle)
- **Semi-circle (top half)**: startAngle: 180, endAngle: 0
- **Semi-circle (bottom half)**: startAngle: 0, endAngle: 180
- **Quarter circle**: startAngle: 0, endAngle: 90

```dart
// Full circle (default)
RadialAxis(startAngle: 270, endAngle: 270)

// Top semi-circle
RadialAxis(startAngle: 180, endAngle: 0)

// Right quarter
RadialAxis(startAngle: 270, endAngle: 0)

// Three-quarters
RadialAxis(startAngle: 180, endAngle: 90)
```

## Multi-Axis Patterns

### Clock with Hours and Minutes

```dart
SfRadialGauge(
  axes: [
    // Hour axis
    RadialAxis(
      minimum: 0,
      maximum: 12,
      interval: 1,
      radiusFactor: 0.9,
      showLastLabel: false,
      majorTickStyle: MajorTickStyle(length: 15),
    ),
    // Minute axis
    RadialAxis(
      minimum: 0,
      maximum: 60,
      interval: 5,
      radiusFactor: 0.6,
      minorTicksPerInterval: 5,
      labelOffset: 15,
    ),
  ],
)
```

### Dashboard with Multiple Metrics

```dart
SfRadialGauge(
  axes: [
    // Outer metric
    RadialAxis(
      minimum: 0,
      maximum: 100,
      radiusFactor: 0.9,
      pointers: [
        NeedlePointer(value: 75),
      ],
    ),
    // Inner metric
    RadialAxis(
      minimum: 0,
      maximum: 60,
      radiusFactor: 0.5,
      pointers: [
        RangePointer(value: 40, color: Colors.blue),
      ],
    ),
  ],
)
```

## Comparison: Radial vs Linear Gauge

| Aspect | Radial Gauge | Linear Gauge |
|--------|--------------|--------------|
| **Visual Style** | Circle/arc | Straight line |
| **Space Usage** | Requires circular space | Fits narrow spaces |
| **Needle Pointer** | ✅ Yes | ❌ No |
| **Bar Pointer** | ❌ No | ✅ Yes |
| **Range Pointer** | ✅ Yes | ❌ No |
| **Annotations** | ✅ Yes | ❌ No |
| **Title** | ✅ Yes | ❌ No |
| **Multiple Axes** | ✅ Full support | ❌ Limited |
| **Export** | ✅ Yes | ❌ No |
| **Best For** | Dials, speedometers | Progress bars, sliders |

## Common Use Cases

### Speedometer

```dart
SfRadialGauge(
  title: GaugeTitle(text: 'km/h'),
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 200,
      ranges: [
        GaugeRange(startValue: 0, endValue: 60, color: Colors.green),
        GaugeRange(startValue: 60, endValue: 120, color: Colors.yellow),
        GaugeRange(startValue: 120, endValue: 200, color: Colors.red),
      ],
      pointers: [
        NeedlePointer(
          value: 85,
          needleLength: 0.7,
          enableAnimation: true,
        ),
      ],
    ),
  ],
)
```

### Temperature Gauge (Semi-Circle)

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: -20,
      maximum: 50,
      startAngle: 180,
      endAngle: 0,
      ranges: [
        GaugeRange(startValue: -20, endValue: 0, color: Colors.blue),
        GaugeRange(startValue: 0, endValue: 25, color: Colors.green),
        GaugeRange(startValue: 25, endValue: 50, color: Colors.red),
      ],
      pointers: [
        NeedlePointer(value: 22),
      ],
      annotations: [
        GaugeAnnotation(
          widget: Text('22°C', style: TextStyle(fontSize: 20)),
          angle: 90,
          positionFactor: 0.5,
        ),
      ],
    ),
  ],
)
```

### Circular Progress

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 100,
      showLabels: false,
      showTicks: false,
      axisLineStyle: AxisLineStyle(
        thickness: 0.2,
        thicknessUnit: GaugeSizeUnit.factor,
        color: Colors.grey[300],
      ),
      pointers: [
        RangePointer(
          value: 75,
          width: 0.2,
          sizeUnit: GaugeSizeUnit.factor,
          color: Colors.blue,
        ),
      ],
      annotations: [
        GaugeAnnotation(
          widget: Text(
            '75%',
            style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
          ),
          positionFactor: 0,
        ),
      ],
    ),
  ],
)
```

### Compass

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 360,
      interval: 30,
      startAngle: 270,
      endAngle: 270,
      canRotateLabels: true,
      onLabelCreated: (args) {
        // Customize labels to show N, S, E, W
        if (args.text == '0' || args.text == '360') {
          args.text = 'N';
        } else if (args.text == '90') {
          args.text = 'E';
        } else if (args.text == '180') {
          args.text = 'S';
        } else if (args.text == '270') {
          args.text = 'W';
        }
      },
      pointers: [
        MarkerPointer(
          value: 45,
          markerType: MarkerType.triangle,
          color: Colors.red,
        ),
      ],
    ),
  ],
)
```

## Design Considerations

### When Radial Gauge is Ideal

- **Dashboard displays**: Multiple metrics in circular layout
- **Analog aesthetics**: Traditional gauge appearance
- **Angular measurements**: Compass, rotation, degrees
- **Visual impact**: Circular designs draw attention
- **Complex data**: Multiple axes for comparison

### When to Choose Linear Gauge Instead

- **Progress bars**: Simple horizontal/vertical progress
- **Space constraints**: Narrow areas where circles don't fit
- **Touch sliders**: Linear swipe gestures feel natural
- **Simple values**: Single metric without complex visualization

## Next Steps

- Explore **Axes** customization for radial gauges
- Learn about all **Pointer** types (needle, marker, range, widget)
- Add **Annotations** for custom content placement
- Customize **Appearance** with gradients and styling
- Enable **Interactions** with draggable pointers
- Use **Export** functionality for reports
