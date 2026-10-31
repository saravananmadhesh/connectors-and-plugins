# Advanced Features

## Table of Contents
- [Linear Gauge: Mirror Effect](#linear-gauge-mirror-effect)
- [Radial Gauge: Annotations](#radial-gauge-annotations)
- [Radial Gauge: Export to Image](#radial-gauge-export-to-image)
- [Radial Gauge: Background Image](#radial-gauge-background-image)
- [Radial Gauge: Title](#radial-gauge-title)
- [Custom Label Formatting](#custom-label-formatting)
- [Multiple Axes (Radial Only)](#multiple-axes-radial-only)
- [Complex Patterns](#complex-patterns)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Linear Gauge: Mirror Effect

Create symmetrical gauge displays with mirror effect:

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  isMirrored: true, // Mirror the gauge
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 15,
    color: Colors.grey[300],
  ),
  barPointers: [
    LinearBarPointer(
      value: 75,
      thickness: 15,
      color: Colors.blue,
    ),
  ],
)
```

### Mirror with Custom Orientation

```dart
Column(
  children: [
    // Normal gauge
    SfLinearGauge(
      minimum: 0,
      maximum: 100,
      isMirrored: false,
      orientation: LinearGaugeOrientation.horizontal,
      barPointers: [
        LinearBarPointer(value: 60, color: Colors.blue),
      ],
    ),
    SizedBox(height: 20),
    // Mirrored gauge
    SfLinearGauge(
      minimum: 0,
      maximum: 100,
      isMirrored: true,
      orientation: LinearGaugeOrientation.horizontal,
      barPointers: [
        LinearBarPointer(value: 60, color: Colors.red),
      ],
    ),
  ],
)
```

### Dual-Direction Gauge

```dart
class DualDirectionGauge extends StatelessWidget {
  final double positiveValue = 70;
  final double negativeValue = 50;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: SfLinearGauge(
            minimum: 0,
            maximum: 100,
            isMirrored: true,
            orientation: LinearGaugeOrientation.horizontal,
            barPointers: [
              LinearBarPointer(
                value: negativeValue,
                color: Colors.red,
              ),
            ],
          ),
        ),
        SizedBox(width: 10),
        Expanded(
          child: SfLinearGauge(
            minimum: 0,
            maximum: 100,
            isMirrored: false,
            orientation: LinearGaugeOrientation.horizontal,
            barPointers: [
              LinearBarPointer(
                value: positiveValue,
                color: Colors.green,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

## Radial Gauge: Annotations

Add custom widgets at specific positions within the gauge:

### Basic Annotation

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      pointers: [
        NeedlePointer(value: 65),
      ],
      annotations: [
        GaugeAnnotation(
          widget: Text(
            '65%',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          angle: 90,
          positionFactor: 0.5,
        ),
      ],
    ),
  ],
)
```

### Multiple Annotations

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 100,
      pointers: [
        RangePointer(value: 75, width: 0.2, sizeUnit: GaugeSizeUnit.factor),
      ],
      annotations: [
        // Center value
        GaugeAnnotation(
          widget: Text(
            '75',
            style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
          ),
          positionFactor: 0.5,
          angle: 90,
        ),
        // Unit label
        GaugeAnnotation(
          widget: Text(
            'km/h',
            style: TextStyle(fontSize: 16, color: Colors.grey),
          ),
          positionFactor: 0.7,
          angle: 90,
        ),
        // Status icon
        GaugeAnnotation(
          widget: Icon(Icons.speed, size: 30, color: Colors.blue),
          positionFactor: 0.1,
          angle: 90,
        ),
      ],
    ),
  ],
)
```

### Dynamic Annotations

```dart
class DynamicAnnotationGauge extends StatefulWidget {
  @override
  _DynamicAnnotationGaugeState createState() => _DynamicAnnotationGaugeState();
}

class _DynamicAnnotationGaugeState extends State<DynamicAnnotationGauge> {
  double _speed = 0;

  String _getSpeedCategory() {
    if (_speed < 40) return 'Slow';
    if (_speed < 80) return 'Moderate';
    return 'Fast';
  }

  Color _getSpeedColor() {
    if (_speed < 40) return Colors.green;
    if (_speed < 80) return Colors.yellow;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) {
    return SfRadialGauge(
      axes: [
        RadialAxis(
          minimum: 0,
          maximum: 120,
          pointers: [
            NeedlePointer(
              value: _speed,
              enableDragging: true,
              onValueChanged: (value) {
                setState(() => _speed = value);
              },
            ),
          ],
          annotations: [
            GaugeAnnotation(
              widget: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '${_speed.round()}',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                      color: _getSpeedColor(),
                    ),
                  ),
                  Text(
                    _getSpeedCategory(),
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ),
              positionFactor: 0.5,
              angle: 90,
            ),
          ],
        ),
      ],
    );
  }
}
```

## Radial Gauge: Export to Image

Export gauge as an image file:

```dart
import 'dart:ui' as ui;
import 'package:flutter/rendering.dart';

class ExportableGauge extends StatefulWidget {
  @override
  _ExportableGaugeState createState() => _ExportableGaugeState();
}

class _ExportableGaugeState extends State<ExportableGauge> {
  final GlobalKey _gaugeKey = GlobalKey();

  Future<void> _exportToImage() async {
    try {
      RenderRepaintBoundary boundary =
          _gaugeKey.currentContext!.findRenderObject() as RenderRepaintBoundary;
      ui.Image image = await boundary.toImage(pixelRatio: 3.0);
      ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      if (byteData != null) {
        final buffer = byteData.buffer.asUint8List();
        // Save or share the image
        print('Image exported: ${buffer.length} bytes');
      }
    } catch (e) {
      print('Error exporting image: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        RepaintBoundary(
          key: _gaugeKey,
          child: SfRadialGauge(
            axes: [
              RadialAxis(
                pointers: [
                  NeedlePointer(value: 75),
                ],
                annotations: [
                  GaugeAnnotation(
                    widget: Text('75%', style: TextStyle(fontSize: 24)),
                    positionFactor: 0.5,
                  ),
                ],
              ),
            ],
          ),
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: _exportToImage,
          child: Text('Export to Image'),
        ),
      ],
    );
  }
}
```

## Radial Gauge: Background Image

Add background image to radial gauge:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      backgroundImage: AssetImage('assets/gauge_background.png'),
      pointers: [
        NeedlePointer(value: 60),
      ],
    ),
  ],
)
```

### Background Image with Transparency

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      backgroundImage: AssetImage('assets/speedometer_bg.png'),
      axisLineStyle: AxisLineStyle(
        thickness: 0.2,
        thicknessUnit: GaugeSizeUnit.factor,
        color: Colors.transparent, // Hide axis line
      ),
      pointers: [
        NeedlePointer(
          value: 80,
          needleColor: Colors.white,
        ),
      ],
      axisLabelStyle: GaugeTextStyle(
        color: Colors.white,
        fontSize: 14,
      ),
    ),
  ],
)
```

## Radial Gauge: Title

Add title to radial gauge:

```dart
SfRadialGauge(
  title: GaugeTitle(
    text: 'Speedometer',
    textStyle: TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  ),
  axes: [
    RadialAxis(
      pointers: [
        NeedlePointer(value: 65),
      ],
    ),
  ],
)
```

### Title with Custom Styling

```dart
SfRadialGauge(
  title: GaugeTitle(
    text: 'Engine Temperature',
    textStyle: TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.bold,
      color: Colors.blue[900],
      letterSpacing: 1.2,
    ),
    alignment: GaugeAlignment.center,
    borderWidth: 2,
    borderColor: Colors.blue,
    backgroundColor: Colors.blue[50],
  ),
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 150,
      ranges: [
        GaugeRange(startValue: 0, endValue: 60, color: Colors.green),
        GaugeRange(startValue: 60, endValue: 100, color: Colors.yellow),
        GaugeRange(startValue: 100, endValue: 150, color: Colors.red),
      ],
      pointers: [
        NeedlePointer(value: 85),
      ],
    ),
  ],
)
```

## Custom Label Formatting

### Linear Gauge Custom Labels

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  interval: 25,
  labelFormatterCallback: (String label) {
    // Add percentage symbol
    return '$label%';
  },
)
```

### Radial Gauge Custom Labels

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 200,
      interval: 50,
      onLabelCreated: (AxisLabelCreatedArgs args) {
        // Add unit to labels
        args.text = '${args.text} km/h';
      },
      pointers: [
        NeedlePointer(value: 120),
      ],
    ),
  ],
)
```

### Complex Label Formatting

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 24,
      interval: 6,
      onLabelCreated: (AxisLabelCreatedArgs args) {
        final hour = int.parse(args.text);
        if (hour == 0) args.text = '12 AM';
        else if (hour < 12) args.text = '$hour AM';
        else if (hour == 12) args.text = '12 PM';
        else args.text = '${hour - 12} PM';
      },
      pointers: [
        NeedlePointer(value: 14), // 2 PM
      ],
    ),
  ],
)
```

## Multiple Axes (Radial Only)

### Dual Axes Example

```dart
SfRadialGauge(
  axes: [
    // Outer axis - Fahrenheit
    RadialAxis(
      minimum: 32,
      maximum: 212,
      interval: 30,
      radiusFactor: 0.9,
      labelOffset: 10,
      axisLabelStyle: GaugeTextStyle(color: Colors.red),
      axisLineStyle: AxisLineStyle(color: Colors.red, thickness: 2),
      majorTickStyle: MajorTickStyle(color: Colors.red),
      minorTickStyle: MinorTickStyle(color: Colors.red),
      pointers: [
        NeedlePointer(
          value: 98.6,
          needleColor: Colors.red,
          knobStyle: KnobStyle(color: Colors.red),
        ),
      ],
    ),
    // Inner axis - Celsius
    RadialAxis(
      minimum: 0,
      maximum: 100,
      interval: 20,
      radiusFactor: 0.6,
      labelOffset: 10,
      axisLabelStyle: GaugeTextStyle(color: Colors.blue),
      axisLineStyle: AxisLineStyle(color: Colors.blue, thickness: 2),
      majorTickStyle: MajorTickStyle(color: Colors.blue),
      minorTickStyle: MinorTickStyle(color: Colors.blue),
      pointers: [
        NeedlePointer(
          value: 37,
          needleColor: Colors.blue,
          knobStyle: KnobStyle(color: Colors.blue),
        ),
      ],
    ),
  ],
)
```

### Triple Axes Dashboard

```dart
SfRadialGauge(
  axes: [
    // Speed axis
    RadialAxis(
      minimum: 0,
      maximum: 200,
      interval: 50,
      radiusFactor: 0.9,
      startAngle: 180,
      endAngle: 360,
      axisLabelStyle: GaugeTextStyle(fontSize: 14, fontWeight: FontWeight.bold),
      pointers: [
        NeedlePointer(value: 120, needleLength: 0.7),
      ],
    ),
    // RPM axis
    RadialAxis(
      minimum: 0,
      maximum: 8,
      interval: 2,
      radiusFactor: 0.5,
      startAngle: 180,
      endAngle: 0,
      axisLabelStyle: GaugeTextStyle(fontSize: 12, color: Colors.orange),
      axisLineStyle: AxisLineStyle(color: Colors.orange, thickness: 2),
      pointers: [
        MarkerPointer(value: 4, markerType: MarkerType.triangle, color: Colors.orange),
      ],
    ),
    // Fuel axis
    RadialAxis(
      minimum: 0,
      maximum: 1,
      interval: 0.25,
      radiusFactor: 0.3,
      startAngle: 0,
      endAngle: 180,
      showLabels: false,
      axisLineStyle: AxisLineStyle(color: Colors.green, thickness: 2),
      pointers: [
        RangePointer(value: 0.75, width: 10, color: Colors.green),
      ],
    ),
  ],
)
```

## Complex Patterns

### Multi-Metric Dashboard

```dart
class MultiMetricDashboard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Primary gauge
        SfRadialGauge(
          title: GaugeTitle(
            text: 'System Performance',
            textStyle: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          axes: [
            RadialAxis(
              minimum: 0,
              maximum: 100,
              ranges: [
                GaugeRange(startValue: 0, endValue: 50, color: Colors.red),
                GaugeRange(startValue: 50, endValue: 75, color: Colors.yellow),
                GaugeRange(startValue: 75, endValue: 100, color: Colors.green),
              ],
              pointers: [
                NeedlePointer(value: 82),
              ],
              annotations: [
                GaugeAnnotation(
                  widget: Text('82%', style: TextStyle(fontSize: 32)),
                  positionFactor: 0.5,
                ),
              ],
            ),
          ],
        ),
        SizedBox(height: 20),
        // Secondary linear gauges
        Row(
          children: [
            Expanded(
              child: Column(
                children: [
                  Text('CPU', style: TextStyle(fontWeight: FontWeight.bold)),
                  SfLinearGauge(
                    minimum: 0,
                    maximum: 100,
                    showLabels: false,
                    barPointers: [
                      LinearBarPointer(value: 65, color: Colors.blue),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(width: 20),
            Expanded(
              child: Column(
                children: [
                  Text('Memory', style: TextStyle(fontWeight: FontWeight.bold)),
                  SfLinearGauge(
                    minimum: 0,
                    maximum: 100,
                    showLabels: false,
                    barPointers: [
                      LinearBarPointer(value: 45, color: Colors.green),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
```

## Performance Optimization

### Reduce Rebuilds

```dart
class OptimizedGauge extends StatefulWidget {
  @override
  _OptimizedGaugeState createState() => _OptimizedGaugeState();
}

class _OptimizedGaugeState extends State<OptimizedGauge> {
  double _value = 50;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Only the gauge rebuilds when value changes
        ValueListenableBuilder<double>(
          valueListenable: ValueNotifier(_value),
          builder: (context, value, child) {
            return SfRadialGauge(
              axes: [
                RadialAxis(
                  pointers: [
                    NeedlePointer(value: value),
                  ],
                ),
              ],
            );
          },
        ),
        // This widget doesn't rebuild
        ElevatedButton(
          onPressed: () {
            setState(() => _value += 10);
          },
          child: Text('Increase'),
        ),
      ],
    );
  }
}
```

### Disable Unnecessary Features

```dart
// Disable features not needed for better performance
SfRadialGauge(
  axes: [
    RadialAxis(
      showTicks: false, // Disable ticks if not needed
      showLabels: false, // Disable labels if not needed
      showAxisLine: false, // Disable axis line if not needed
      pointers: [
        NeedlePointer(
          value: 60,
          enableAnimation: false, // Disable animation for static displays
        ),
      ],
    ),
  ],
)
```

## Troubleshooting

### Gauge Not Displaying

**Problem:** Gauge doesn't appear on screen

**Solutions:**
1. Ensure parent widget has size constraints:
```dart
Container(
  width: 300,
  height: 300,
  child: SfRadialGauge(...),
)
```

2. Check for null values in pointers
3. Verify package import

### Pointer Not Dragging

**Problem:** `enableDragging` doesn't work

**Solutions:**
1. Ensure callback is provided:
```dart
LinearShapePointer(
  enableDragging: true,
  onChanged: (value) => setState(() => _value = value), // Required!
)
```

2. Check pointer is large enough to touch (min 44x44 pts)

### Animation Issues

**Problem:** Animation not smooth or not working

**Solutions:**
1. Use `animationDuration` parameter:
```dart
NeedlePointer(
  value: _value,
  animationDuration: 1000, // milliseconds
  animationType: AnimationType.ease,
)
```

2. Ensure Flutter is in release mode for smooth animations

### Performance Issues

**Problem:** Gauge lags or drops frames

**Solutions:**
1. Reduce number of minor ticks
2. Simplify gradients
3. Disable animations if not needed
4. Use `RepaintBoundary` to isolate repaints

## Summary

Advanced features include:
- **Linear Gauge**: Mirror effect for symmetrical displays
- **Radial Gauge**: Annotations, export, background images, title, multiple axes
- **Custom Labels**: Format labels with callbacks
- **Complex Patterns**: Multi-metric dashboards
- **Optimization**: Performance best practices
- **Troubleshooting**: Common issues and solutions

These advanced features enable sophisticated gauge implementations for professional applications.
