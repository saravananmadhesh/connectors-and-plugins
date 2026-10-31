# Axes Customization

## Table of Contents
- [Overview](#overview)
- [Linear Gauge Axis](#linear-gauge-axis)
  - [Axis Range](#axis-range-linear)
  - [Axis Track Styling](#axis-track-styling)
  - [Inverse Axis](#inverse-axis-linear)
  - [Extend Axis](#extend-axis)
  - [Custom Scales](#custom-scales-linear)
- [Radial Gauge Axes](#radial-gauge-axes)
  - [Axis Range](#axis-range-radial)
  - [Angle Customization](#angle-customization)
  - [Radius Customization](#radius-customization)
  - [Axis Position](#axis-position)
  - [Axis Line Styling](#axis-line-styling)
  - [Inverse Axis](#inverse-axis-radial)
  - [Multiple Axes](#multiple-axes)
  - [Custom Scales](#custom-scales-radial)
- [Labels](#labels)
  - [Linear Gauge Labels](#linear-gauge-labels)
  - [Radial Gauge Labels](#radial-gauge-labels)
  - [Label Formatting](#label-formatting)
- [Ticks](#ticks)
  - [Linear Gauge Ticks](#linear-gauge-ticks)
  - [Radial Gauge Ticks](#radial-gauge-ticks)
  - [Tick Positioning](#tick-positioning)
- [Events](#events)

## Overview

Axes are the foundation of gauge components, defining the scale where values are plotted. Linear gauges have a single linear axis, while radial gauges support multiple circular axes.

## Linear Gauge Axis

The Linear Gauge axis is a straight line (horizontal or vertical) where values are plotted.

### Axis Range (Linear)

Define the value range using `minimum` and `maximum` properties:

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
)

// Custom range
SfLinearGauge(
  minimum: -50,
  maximum: 50,
)
```

**Default values:**
- minimum: 0
- maximum: 100

### Axis Track Styling

Customize the axis track appearance with `axisTrackStyle`:

**Thickness and Color:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 15,
    color: Colors.blue,
  ),
)
```

**Gradient:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    gradient: LinearGradient(
      colors: [Colors.purple, Colors.blue],
      begin: Alignment.centerLeft,
      end: Alignment.centerRight,
    ),
  ),
)
```

**Borders:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 15,
    color: Colors.transparent,
    borderColor: Colors.blueGrey,
    borderWidth: 2,
  ),
)
```

**Corner Styles:**

```dart
SfLinearGauge(
  axisTrackStyle: LinearAxisTrackStyle(
    thickness: 20,
    edgeStyle: LinearEdgeStyle.bothCurve, // bothFlat, startCurve, endCurve
  ),
)
```

**Hide Axis Track:**

```dart
SfLinearGauge(
  showAxisTrack: false,
)
```

### Inverse Axis (Linear)

Reverse the axis direction:

```dart
SfLinearGauge(
  isAxisInversed: true, // Values go from 100 to 0
)
```

### Extend Axis

Extend the axis track at both ends:

```dart
SfLinearGauge(
  maximum: 50,
  axisTrackExtent: 50, // Extends by 50 pixels on each side
)
```

### Custom Scales (Linear)

Create non-linear scales using callbacks:

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 150,
  interval: 18.75,
  onGenerateLabels: () {
    return [
      LinearAxisLabel(text: '0', value: 0),
      LinearAxisLabel(text: '2', value: 18.75),
      LinearAxisLabel(text: '5', value: 37.5),
      LinearAxisLabel(text: '10', value: 56.25),
      LinearAxisLabel(text: '20', value: 75),
      LinearAxisLabel(text: '30', value: 93.75),
      LinearAxisLabel(text: '50', value: 112.5),
      LinearAxisLabel(text: '100', value: 131.25),
      LinearAxisLabel(text: '150', value: 150),
    ];
  },
  valueToFactorCallback: (value) {
    // Custom logic to convert value to factor (0-1)
    if (value >= 0 && value <= 2) {
      return (value * 0.125) / 2;
    } else if (value > 2 && value <= 5) {
      return (((value - 2) * 0.125) / (5 - 2)) + (1 * 0.125);
    }
    // Add more conditions...
    return 1;
  },
)
```

## Radial Gauge Axes

Radial gauges use circular axes and support multiple axes on a single gauge.

### Axis Range (Radial)

Each `RadialAxis` has its own range:

```dart
SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 150,
    ),
  ],
)

// Negative values
RadialAxis(
  minimum: -60,
  maximum: 60,
)
```

### Angle Customization

Control the arc sweep with start and end angles:

```dart
// Full circle (default)
RadialAxis(
  startAngle: 270,
  endAngle: 270,
)

// Semi-circle (top)
RadialAxis(
  startAngle: 180,
  endAngle: 0,
)

// Quarter circle
RadialAxis(
  startAngle: 0,
  endAngle: 90,
)

// Three-quarters
RadialAxis(
  startAngle: 180,
  endAngle: 90,
)
```

**Angle Reference:**
- 0° = Right (3 o'clock)
- 90° = Bottom (6 o'clock)
- 180° = Left (9 o'clock)
- 270° = Top (12 o'clock)

### Radius Customization

Control the size of the axis:

```dart
RadialAxis(
  radiusFactor: 0.95, // 95% of available space (default: 0.95)
)

// Smaller radius
RadialAxis(
  radiusFactor: 0.5, // Half size
)
```

**radiusFactor range:** 0.0 to 1.0

### Axis Position

Position the axis within the gauge:

```dart
RadialAxis(
  centerX: 0.5, // Horizontal center (0 = left, 1 = right)
  centerY: 0.5, // Vertical center (0 = top, 1 = bottom)
)

// Offset to bottom-right
RadialAxis(
  centerX: 0.6,
  centerY: 0.6,
)
```

**Scale to fit based on angles:**

```dart
RadialAxis(
  startAngle: 180,
  endAngle: 0,
  canScaleToFit: true, // Auto-position based on angles
)
```

### Axis Line Styling

Customize the circular axis line:

**Thickness and Color:**

```dart
RadialAxis(
  axisLineStyle: AxisLineStyle(
    thickness: 20,
    color: Colors.deepPurple,
  ),
)
```

**Using thickness factor:**

```dart
RadialAxis(
  axisLineStyle: AxisLineStyle(
    thickness: 0.1,
    thicknessUnit: GaugeSizeUnit.factor, // Factor of radius
  ),
)
```

**Gradient:**

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

**Corner Styles:**

```dart
RadialAxis(
  axisLineStyle: AxisLineStyle(
    thickness: 15,
    cornerStyle: CornerStyle.bothCurve, // bothFlat, startCurve, endCurve
  ),
)
```

**Dashed Line:**

```dart
RadialAxis(
  axisLineStyle: AxisLineStyle(
    dashArray: [5, 5], // Dash pattern
  ),
)
```

**Hide Axis Line:**

```dart
RadialAxis(
  showAxisLine: false,
)
```

**Background Color:**

```dart
SfRadialGauge(
  backgroundColor: Colors.lightBlue,
  axes: [RadialAxis()],
)
```

**Background Image:**

```dart
RadialAxis(
  backgroundImage: AssetImage('assets/gauge_background.png'),
)
```

### Inverse Axis (Radial)

Reverse the direction (counterclockwise):

```dart
RadialAxis(
  isInversed: true, // Counterclockwise direction
)
```

### Multiple Axes

Add multiple axes to a single gauge:

```dart
SfRadialGauge(
  axes: [
    // Outer axis
    RadialAxis(
      minimum: 0,
      maximum: 100,
      interval: 10,
      radiusFactor: 0.9,
      ticksPosition: ElementsPosition.outside,
      labelsPosition: ElementsPosition.outside,
      axisLineStyle: AxisLineStyle(
        thickness: 3,
        color: Colors.red,
      ),
    ),
    // Inner axis
    RadialAxis(
      minimum: 0,
      maximum: 60,
      interval: 10,
      radiusFactor: 0.6,
      isInversed: true,
      axisLineStyle: AxisLineStyle(
        thickness: 3,
        color: Colors.black,
      ),
    ),
  ],
)
```

### Custom Scales (Radial)

Create custom axis renderers:

```dart
RadialAxis(
  minimum: 0,
  maximum: 150,
  onCreateAxisRenderer: () {
    return CustomAxisRenderer();
  },
)

class CustomAxisRenderer extends RadialAxisRenderer {
  @override
  List<CircularAxisLabel> generateVisibleLabels() {
    // Return custom labels
    return [
      CircularAxisLabel(axisLabelStyle, '0', 0, false)..value = 0,
      CircularAxisLabel(axisLabelStyle, '2', 1, false)..value = 2,
      CircularAxisLabel(axisLabelStyle, '5', 2, false)..value = 5,
      // ... more labels
    ];
  }

  @override
  double valueToFactor(double value) {
    // Custom value-to-position conversion
    if (value >= 0 && value <= 2) {
      return (value * 0.125) / 2;
    }
    // ... more logic
    return 1;
  }
}
```

## Labels

Labels display numeric values along the axis.

### Linear Gauge Labels

**Show/Hide Labels:**

```dart
SfLinearGauge(
  showLabels: false,
)
```

**Label Styling:**

```dart
SfLinearGauge(
  axisLabelStyle: TextStyle(
    color: Colors.red,
    fontSize: 15,
    fontStyle: FontStyle.italic,
    fontWeight: FontWeight.bold,
    fontFamily: 'Times',
  ),
)
```

**Label Interval:**

```dart
SfLinearGauge(
  interval: 10, // Label every 10 units
)
```

**Label Position:**

```dart
SfLinearGauge(
  labelPosition: LinearLabelPosition.inside, // or .outside
)
```

**Label Offset:**

```dart
SfLinearGauge(
  labelOffset: 10, // Distance from ticks
)
```

### Radial Gauge Labels

**Show/Hide Labels:**

```dart
RadialAxis(
  showLabels: false,
)
```

**Label Styling:**

```dart
RadialAxis(
  axisLabelStyle: GaugeTextStyle(
    color: Colors.red,
    fontSize: 15,
    fontStyle: FontStyle.italic,
    fontWeight: FontWeight.bold,
    fontFamily: 'Times',
  ),
)
```

**Label Interval:**

```dart
RadialAxis(
  interval: 20, // Label every 20 units
)
```

**Maximum Labels:**

```dart
RadialAxis(
  maximumLabels: 5, // Max labels per 100 logical pixels
)
```

**Label Position:**

```dart
RadialAxis(
  labelsPosition: ElementsPosition.inside, // or .outside
)
```

**Label Offset:**

```dart
RadialAxis(
  labelOffset: 15, // Distance from ticks
  offsetUnit: GaugeSizeUnit.logicalPixel, // or .factor
)
```

**Rotate Labels:**

```dart
RadialAxis(
  canRotateLabels: true, // Rotate based on angle
)
```

**Edge Labels:**

```dart
RadialAxis(
  showFirstLabel: false, // Hide first label
  showLastLabel: true, // Show last label
)
```

### Label Formatting

**Linear Gauge Format:**

```dart
SfLinearGauge(
  labelFormatterCallback: (String value) {
    return '\$$value'; // Add prefix
  },
)
```

**Radial Gauge Format:**

```dart
RadialAxis(
  labelFormat: '{value}°C', // Add suffix
)

// Using NumberFormat
RadialAxis(
  numberFormat: NumberFormat.compactSimpleCurrency(),
)
```

**Custom Label Creation:**

```dart
RadialAxis(
  onLabelCreated: (AxisLabelCreatedArgs args) {
    if (args.text == '100') {
      args.text = 'Max';
      args.labelStyle = GaugeTextStyle(
        color: Colors.red,
        fontWeight: FontWeight.bold,
      );
    }
  },
)
```

## Ticks

Ticks are marks along the axis indicating intervals.

### Linear Gauge Ticks

**Show/Hide Ticks:**

```dart
SfLinearGauge(
  showTicks: false,
)
```

**Major Tick Styling:**

```dart
SfLinearGauge(
  majorTickStyle: LinearTickStyle(
    length: 10,
    thickness: 2.5,
    color: Colors.black,
  ),
)
```

**Minor Tick Styling:**

```dart
SfLinearGauge(
  minorTickStyle: LinearTickStyle(
    length: 5,
    thickness: 1.75,
    color: Colors.grey,
  ),
)
```

**Minor Ticks Per Interval:**

```dart
SfLinearGauge(
  minorTicksPerInterval: 4, // 4 minor ticks between major ticks
)
```

**Tick Position:**

```dart
SfLinearGauge(
  tickPosition: LinearElementPosition.inside, // outside, cross
)
```

### Radial Gauge Ticks

**Show/Hide Ticks:**

```dart
RadialAxis(
  showTicks: false,
)
```

**Major Tick Styling:**

```dart
RadialAxis(
  majorTickStyle: MajorTickStyle(
    length: 10,
    thickness: 2,
    color: Colors.black,
    lengthUnit: GaugeSizeUnit.logicalPixel, // or .factor
  ),
)
```

**Minor Tick Styling:**

```dart
RadialAxis(
  minorTickStyle: MinorTickStyle(
    length: 5,
    thickness: 1.5,
    color: Colors.grey,
    lengthUnit: GaugeSizeUnit.logicalPixel,
  ),
)
```

**Dashed Ticks:**

```dart
RadialAxis(
  majorTickStyle: MajorTickStyle(
    length: 20,
    dashArray: [5, 2.5],
  ),
  minorTickStyle: MinorTickStyle(
    length: 15,
    dashArray: [3, 2.5],
  ),
)
```

**Minor Ticks Per Interval:**

```dart
RadialAxis(
  minorTicksPerInterval: 4,
)
```

**Tick Position:**

```dart
RadialAxis(
  ticksPosition: ElementsPosition.inside, // or .outside
)
```

### Tick Positioning

**Linear Gauge Tick Offset:**

```dart
SfLinearGauge(
  tickOffset: 10, // Moves ticks away from axis
)
```

**Radial Gauge Tick Offset:**

```dart
RadialAxis(
  tickOffset: 20,
  offsetUnit: GaugeSizeUnit.logicalPixel, // or .factor
)
```

## Events

### Radial Gauge Events

**Axis Tapped:**

```dart
RadialAxis(
  onAxisTapped: (double value) {
    print('Tapped at value: $value');
  },
)
```

**Label Created:**

```dart
RadialAxis(
  onLabelCreated: (AxisLabelCreatedArgs args) {
    // Customize label before rendering
    if (args.text == '90') {
      args.text = 'E';
      args.labelStyle = GaugeTextStyle(color: Colors.red);
      args.canRotate = true;
    }
  },
)
```

## Summary

**Linear Gauge Axis:**
- Single linear axis (horizontal/vertical)
- Direct properties on SfLinearGauge
- Simpler configuration
- Mirror effect support
- Best for progress bars and sliders

**Radial Gauge Axes:**
- Multiple circular axes supported
- Configured within RadialAxis array
- Angle-based positioning
- More complex but flexible
- Best for dashboards and dials

Both support extensive customization of axis lines, labels, ticks, and visual styling to match your application's design requirements.
