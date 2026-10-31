# Getting Started with Syncfusion Flutter Gauges

This guide covers installation and basic setup for both **SfLinearGauge** and **SfRadialGauge** widgets. Both components are part of the same `syncfusion_flutter_gauges` package and share similar setup steps.

## Package Installation

Both Linear and Radial gauges are included in the same Syncfusion Flutter Gauges package.

### Add Dependency

Add the Syncfusion Flutter Gauge dependency by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_gauges
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### Import Package

Import the gauges package in your Dart code:

```dart
import 'package:syncfusion_flutter_gauges/gauges.dart';
```

This single import provides access to both `SfLinearGauge` and `SfRadialGauge` widgets.

## Basic Linear Gauge Implementation

The Linear Gauge displays data on a horizontal or vertical linear scale.

### Initialize Linear Gauge

Create a basic linear gauge:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class BasicLinearGauge extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Linear Gauge')),
        body: Center(
          child: SfLinearGauge(),
        ),
      ),
    );
  }
}
```

This creates a default linear gauge with minimum value 0 and maximum value 100.

### Configure Axis Range

Specify minimum and maximum values for the axis:

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 200,
)
```

### Change Orientation

Switch between horizontal and vertical orientations:

```dart
// Horizontal (default)
SfLinearGauge(
  orientation: LinearGaugeOrientation.horizontal,
)

// Vertical
SfLinearGauge(
  orientation: LinearGaugeOrientation.vertical,
)
```

### Add Ranges

Add color-coded ranges to visualize thresholds:

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 50,
      color: Colors.green,
    ),
    LinearGaugeRange(
      startValue: 50,
      endValue: 100,
      color: Colors.red,
    ),
  ],
)
```

### Add Marker Pointer

Add a shape pointer to indicate a value:

```dart
SfLinearGauge(
  markerPointers: [
    LinearShapePointer(value: 60),
  ],
)
```

Or add a widget pointer for custom indicators:

```dart
SfLinearGauge(
  markerPointers: [
    LinearWidgetPointer(
      value: 40,
      child: Container(
        height: 20,
        width: 20,
        decoration: BoxDecoration(
          color: Colors.blue,
          shape: BoxShape.circle,
        ),
      ),
    ),
  ],
)
```

### Add Bar Pointer

Bar pointers draw from the minimum value to the specified value:

```dart
SfLinearGauge(
  barPointers: [
    LinearBarPointer(
      value: 70,
      color: Colors.blue,
    ),
  ],
)
```

### Complete Linear Gauge Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class CompleteLinearGauge extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Linear Gauge Complete')),
      body: Center(
        child: SfLinearGauge(
          minimum: 0,
          maximum: 100,
          ranges: [
            LinearGaugeRange(
              startValue: 0,
              endValue: 50,
              color: Colors.green,
            ),
            LinearGaugeRange(
              startValue: 50,
              endValue: 100,
              color: Colors.red,
            ),
          ],
          markerPointers: [
            LinearShapePointer(value: 60),
            LinearWidgetPointer(
              value: 40,
              child: Container(
                height: 20,
                width: 20,
                decoration: BoxDecoration(color: Colors.blue),
              ),
            ),
          ],
          barPointers: [
            LinearBarPointer(value: 60),
          ],
        ),
      ),
    );
  }
}
```

## Basic Radial Gauge Implementation

The Radial Gauge displays data on a circular or arc scale.

### Initialize Radial Gauge

Create a basic radial gauge:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class BasicRadialGauge extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Radial Gauge')),
        body: Center(
          child: SfRadialGauge(),
        ),
      ),
    );
  }
}
```

This creates a default radial gauge with a single axis.

### Add Title

Add a title to the radial gauge:

```dart
SfRadialGauge(
  title: GaugeTitle(
    text: 'Speedometer',
    textStyle: TextStyle(
      fontSize: 20.0,
      fontWeight: FontWeight.bold,
    ),
  ),
)
```

### Configure Axis

Radial gauges support multiple axes. Configure an axis with minimum and maximum values:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 150,
    ),
  ],
)
```

### Add Ranges

Add color-coded ranges to the axis:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 150,
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
    ),
  ],
)
```

### Add Needle Pointer

Add a needle pointer (classic gauge style):

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      pointers: [
        NeedlePointer(value: 90),
      ],
    ),
  ],
)
```

### Add Marker Pointer

Add a marker pointer for a different visual style:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      pointers: [
        MarkerPointer(
          value: 75,
          markerType: MarkerType.circle,
        ),
      ],
    ),
  ],
)
```

### Add Annotation

Add widgets as annotations at specific positions:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      pointers: [
        NeedlePointer(value: 90),
      ],
      annotations: [
        GaugeAnnotation(
          widget: Container(
            child: Text(
              '90',
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
    ),
  ],
)
```

### Complete Radial Gauge Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class CompleteRadialGauge extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Radial Gauge Complete')),
      body: Center(
        child: SfRadialGauge(
          title: GaugeTitle(
            text: 'Speedometer',
            textStyle: TextStyle(
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
            ),
          ),
          axes: [
            RadialAxis(
              minimum: 0,
              maximum: 150,
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
              pointers: [
                NeedlePointer(value: 90),
              ],
              annotations: [
                GaugeAnnotation(
                  widget: Container(
                    child: Text(
                      '90.0',
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
            ),
          ],
        ),
      ),
    );
  }
}
```

## Component Comparison

| Feature | SfLinearGauge | SfRadialGauge |
|---------|---------------|---------------|
| **Shape** | Linear (horizontal/vertical) | Circular/Arc |
| **Axis Configuration** | Direct properties | Axes array |
| **Orientation** | `orientation` property | Angle-based |
| **Ranges** | `ranges` array | Inside `RadialAxis.ranges` |
| **Pointers** | `markerPointers`, `barPointers` | Inside `RadialAxis.pointers` |
| **Title** | Not supported | `title` property |
| **Annotations** | Not supported | Inside `RadialAxis.annotations` |
| **Multiple Axes** | Single axis only | Multiple axes supported |

## Quick Decision Guide

**Use SfLinearGauge when:**
- You need horizontal or vertical progress indicators
- Building sliders or linear measurement displays
- Creating battery, volume, or loading indicators
- Orientation changes are needed (horizontal ↔ vertical)

**Use SfRadialGauge when:**
- You need circular displays (speedometers, clocks)
- Building dashboards with multiple gauges
- Need needle pointers for classic gauge look
- Require annotations or titles
- Want semi-circle or custom angle configurations

## Next Steps

- Explore **Axes** customization for both gauge types
- Learn about **Pointer** types and interactions
- Customize **Ranges** for threshold visualization
- Add **Animations** for visual appeal
- Enable **Interaction** with draggable pointers
