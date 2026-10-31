# Customization and Styling

## Table of Contents
- [Overview](#overview)
- [Colors](#colors)
- [Gradients](#gradients)
- [Thickness and Sizing](#thickness-and-sizing)
- [Borders](#borders)
- [Corner and Edge Styles](#corner-and-edge-styles)
- [Background](#background)
- [Theme Integration](#theme-integration)

## Overview

Both Linear and Radial gauges offer extensive customization options for visual appearance, including colors, gradients, sizing, borders, and styling.

## Colors

### Linear Gauge Colors

**Axis Track Color:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    color: Colors.blue,
  ),
)
```

**Pointer Colors:**

```dart
SfLinearGauge(
  barPointers: [
    LinearBarPointer(
      value: 70,
      color: Colors.green,
    ),
  ],
  markerPointers: [
    LinearShapePointer(
      value: 70,
      color: Colors.red,
    ),
  ],
)
```

**Range Colors:**

```dart
SfLinearGauge(
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 50,
      color: Colors.amber,
    ),
  ],
)
```

### Radial Gauge Colors

**Axis Line Color:**

```dart
RadialAxis(
  axisLineStyle: AxisLineStyle(
    color: Colors.purple,
    thickness: 15,
  ),
)
```

**Background Color:**

```dart
SfRadialGauge(
  backgroundColor: Colors.lightBlue[50],
  axes: [RadialAxis()],
)
```

**Pointer Colors:**

```dart
RadialAxis(
  pointers: [
    NeedlePointer(
      value: 60,
      needleColor: Colors.red,
      knobStyle: KnobStyle(color: Colors.blue),
    ),
    RangePointer(
      value: 50,
      color: Colors.green,
    ),
  ],
)
```

## Gradients

### Linear Gauge Gradients

**Axis Track Gradient:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    gradient: LinearGradient(
      colors: [Colors.blue, Colors.purple],
      begin: Alignment.centerLeft,
      end: Alignment.centerRight,
      stops: [0.1, 0.9],
    ),
  ),
)
```

**Bar Pointer Gradient:**

```dart
SfLinearGauge(
  barPointers: [
    LinearBarPointer(
      value: 80,
      thickness: 20,
      shaderCallback: (Rect bounds) {
        return LinearGradient(
          colors: [Colors.red, Colors.orange, Colors.yellow],
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
        ).createShader(bounds);
      },
    ),
  ],
)
```

**Radial Gradient:**

```dart
LinearBarPointer(
  value: 75,
  shaderCallback: (bounds) => RadialGradient(
    colors: [Colors.blue, Colors.green],
    radius: 0.8,
  ).createShader(bounds),
)
```

**Sweep Gradient:**

```dart
LinearBarPointer(
  value: 70,
  shaderCallback: (bounds) => SweepGradient(
    colors: [Colors.red, Colors.yellow, Colors.green],
    center: Alignment.center,
  ).createShader(bounds),
)
```

### Radial Gauge Gradients

**Axis Line Gradient:**

```dart
RadialAxis(
  axisLineStyle: AxisLineStyle(
    thickness: 20,
    gradient: SweepGradient(
      colors: [Colors.red, Colors.yellow, Colors.green],
      stops: [0.0, 0.5, 1.0],
    ),
  ),
)
```

**Range Gradient:**

```dart
GaugeRange(
  startValue: 0,
  endValue: 100,
  startWidth: 15,
  endWidth: 15,
  gradient: SweepGradient(
    colors: [
      Colors.green,
      Colors.yellow,
      Colors.orange,
      Colors.red,
    ],
    stops: [0.0, 0.33, 0.66, 1.0],
  ),
)
```

**Needle Pointer Gradient:**

```dart
NeedlePointer(
  value: 75,
  needleLength: 0.8,
  gradient: LinearGradient(
    colors: [Colors.blue, Colors.purple],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  ),
)
```

## Thickness and Sizing

### Linear Gauge Sizing

**Axis Track Thickness:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 15,
  ),
)
```

**Bar Pointer Thickness:**

```dart
LinearBarPointer(
  value: 70,
  thickness: 20,
)
```

**Marker Pointer Size:**

```dart
LinearShapePointer(
  value: 60,
  width: 25,
  height: 25,
)
```

### Radial Gauge Sizing

**Axis Line Thickness:**

```dart
// Using logical pixels
RadialAxis(
  axisLineStyle: AxisLineStyle(
    thickness: 15,
    thicknessUnit: GaugeSizeUnit.logicalPixel,
  ),
)

// Using factor (percentage of radius)
RadialAxis(
  axisLineStyle: AxisLineStyle(
    thickness: 0.1,
    thicknessUnit: GaugeSizeUnit.factor,
  ),
)
```

**Needle Sizing:**

```dart
NeedlePointer(
  value: 70,
  needleLength: 0.8,
  lengthUnit: GaugeSizeUnit.factor,
  needleStartWidth: 1,
  needleEndWidth: 5,
)
```

**Range Width:**

```dart
GaugeRange(
  startValue: 0,
  endValue: 50,
  startWidth: 10,
  endWidth: 20, // Tapered
  sizeUnit: GaugeSizeUnit.logicalPixel,
)
```

## Borders

### Linear Gauge Borders

**Axis Track Border:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 15,
    color: Colors.transparent,
    borderColor: Colors.blue,
    borderWidth: 2,
  ),
)
```

**Bar Pointer Border:**

```dart
LinearBarPointer(
  value: 70,
  thickness: 15,
  color: Colors.transparent,
  borderWidth: 3,
  borderColor: Colors.red,
)
```

### Radial Gauge Borders

**Knob Border:**

```dart
NeedlePointer(
  value: 60,
  knobStyle: KnobStyle(
    knobRadius: 0.08,
    sizeUnit: GaugeSizeUnit.factor,
    color: Colors.blue,
    borderColor: Colors.white,
    borderWidth: 0.02,
  ),
)
```

## Corner and Edge Styles

### Linear Gauge Edge Styles

**Axis Track Corners:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 20,
    edgeStyle: LinearEdgeStyle.bothCurve,
    // Options: bothFlat, bothCurve, startCurve, endCurve
  ),
)
```

**Bar Pointer Corners:**

```dart
LinearBarPointer(
  value: 75,
  thickness: 15,
  edgeStyle: LinearEdgeStyle.endCurve,
)
```

**Shape Pointer Edges:**

```dart
LinearShapePointer(
  value: 60,
  shapeType: LinearShapePointerType.rectangle,
  width: 30,
  height: 20,
  edgeStyle: LinearEdgeStyle.bothCurve,
)
```

### Radial Gauge Corner Styles

**Axis Line Corners:**

```dart
RadialAxis(
  axisLineStyle: AxisLineStyle(
    thickness: 15,
    cornerStyle: CornerStyle.bothCurve,
    // Options: bothFlat, bothCurve, startCurve, endCurve
  ),
)
```

**Range Corners:**

```dart
GaugeRange(
  startValue: 0,
  endValue: 50,
  startWidth: 15,
  endWidth: 15,
)
```

**Range Pointer Corners:**

```dart
RangePointer(
  value: 70,
  width: 20,
  cornerStyle: CornerStyle.bothCurve,
)
```

## Background

### Linear Gauge Background

Linear gauges don't have a dedicated background property, but you can wrap them:

```dart
Container(
  color: Colors.grey[200],
  padding: EdgeInsets.all(20),
  child: SfLinearGauge(),
)
```

### Radial Gauge Background

**Background Color:**

```dart
SfRadialGauge(
  backgroundColor: Colors.lightBlue[50],
  axes: [
    RadialAxis(
      axisLineStyle: AxisLineStyle(
        thickness: 15,
      ),
    ),
  ],
)
```

**Background Image:**

```dart
RadialAxis(
  showAxisLine: false,
  backgroundImage: AssetImage('assets/gauge_background.png'),
  radiusFactor: 1,
  pointers: [
    MarkerPointer(value: 60),
  ],
)
```

**Complex Background with Image:**

```dart
RadialAxis(
  backgroundImage: AssetImage('assets/compass.png'),
  showAxisLine: false,
  showLabels: true,
  canRotateLabels: true,
  startAngle: 270,
  endAngle: 270,
  minimum: 0,
  maximum: 360,
  interval: 30,
  onLabelCreated: (args) {
    if (args.text == '0') {
      args.text = 'N';
    } else if (args.text == '90') {
      args.text = 'E';
    } else if (args.text == '180') {
      args.text = 'S';
    } else if (args.text == '270') {
      args.text = 'W';
    }
  },
)
```

## Theme Integration

### Material Design Colors

```dart
// Using theme colors
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    color: Theme.of(context).primaryColor,
  ),
  barPointers: [
    LinearBarPointer(
      value: 70,
      color: Theme.of(context).accentColor,
    ),
  ],
)

SfRadialGauge(
  axes: [
    RadialAxis(
      axisLineStyle: AxisLineStyle(
        color: Theme.of(context).primaryColor,
        thickness: 15,
      ),
      pointers: [
        NeedlePointer(
          value: 60,
          needleColor: Theme.of(context).accentColor,
        ),
      ],
    ),
  ],
)
```

### Dark Theme Support

```dart
// Adapt to theme brightness
final isDark = Theme.of(context).brightness == Brightness.dark;

SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    color: isDark ? Colors.grey[800] : Colors.grey[300],
  ),
  axisLabelStyle: TextStyle(
    color: isDark ? Colors.white : Colors.black,
  ),
)

SfRadialGauge(
  backgroundColor: isDark ? Colors.black : Colors.white,
  axes: [
    RadialAxis(
      axisLineStyle: AxisLineStyle(
        color: isDark ? Colors.grey[700] : Colors.grey[300],
      ),
      axisLabelStyle: GaugeTextStyle(
        color: isDark ? Colors.white : Colors.black,
      ),
    ),
  ],
)
```

### Custom Theme

```dart
class GaugeTheme {
  static const Color primary = Color(0xFF2196F3);
  static const Color secondary = Color(0xFF03A9F4);
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFF9800);
  static const Color danger = Color(0xFFF44336);
  
  static LinearAxisTrackStyle linearTrack = LinearAxisTrackStyle(
    thickness: 15,
    color: Colors.grey[300],
    edgeStyle: LinearEdgeStyle.bothCurve,
  );
  
  static AxisLineStyle radialAxis = AxisLineStyle(
    thickness: 15,
    color: Colors.grey[300],
    cornerStyle: CornerStyle.bothCurve,
  );
}

// Usage
SfLinearGauge(
  axisTrackStyle: GaugeTheme.linearTrack,
  barPointers: [
    LinearBarPointer(
      value: 75,
      color: GaugeTheme.success,
    ),
  ],
)
```

## Styling Patterns

### Glass Morphism Style

```dart
Container(
  decoration: BoxDecoration(
    color: Colors.white.withOpacity(0.2),
    borderRadius: BorderRadius.circular(20),
    border: Border.all(color: Colors.white.withOpacity(0.3)),
    boxShadow: [
      BoxShadow(
        color: Colors.black12,
        blurRadius: 15,
        spreadRadius: 5,
      ),
    ],
  ),
  child: ClipRRect(
    borderRadius: BorderRadius.circular(20),
    child: BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: SfRadialGauge(
          axes: [
            RadialAxis(
              axisLineStyle: AxisLineStyle(
                thickness: 0.1,
                thicknessUnit: GaugeSizeUnit.factor,
                gradient: SweepGradient(
                  colors: [
                    Colors.blue.withOpacity(0.5),
                    Colors.purple.withOpacity(0.5),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  ),
)
```

### Neon Glow Effect

```dart
Container(
  decoration: BoxDecoration(
    boxShadow: [
      BoxShadow(
        color: Colors.blue.withOpacity(0.5),
        blurRadius: 30,
        spreadRadius: 10,
      ),
    ],
  ),
  child: SfLinearGauge(
    axisTrackStyle: LinearAxisTrackStyle(
      color: Colors.black,
      thickness: 15,
    ),
    barPointers: [
      LinearBarPointer(
        value: 70,
        thickness: 15,
        shaderCallback: (bounds) => LinearGradient(
          colors: [Colors.blue, Colors.cyan],
        ).createShader(bounds),
      ),
    ],
  ),
)
```

### Minimalist Style

```dart
SfLinearGauge(
  showLabels: false,
  showTicks: false,
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 2,
    color: Colors.grey[300],
  ),
  barPointers: [
    LinearBarPointer(
      value: 75,
      thickness: 2,
      color: Colors.black,
    ),
  ],
  markerPointers: [
    LinearShapePointer(
      value: 75,
      width: 15,
      height: 15,
      color: Colors.black,
      shapeType: LinearShapePointerType.circle,
    ),
  ],
)
```

## Summary

Both gauges provide comprehensive customization options:
- **Colors**: Solid colors for all elements
- **Gradients**: Linear, radial, and sweep gradients
- **Sizing**: Flexible thickness and dimensions
- **Borders**: Border colors and widths
- **Corners**: Flat or curved edge styles
- **Backgrounds**: Colors and images (radial only)
- **Themes**: Integration with Material Design themes

Use these options to match your application's design language and branding requirements.
