# Ranges

Ranges are visual elements that highlight specific value segments on gauge axes with colors. They help users quickly understand where values fall within predefined thresholds or categories.

## Overview

Both Linear and Radial gauges support ranges, but they appear differently:
- **Linear Gauge**: Ranges appear as colored segments along the linear track
- **Radial Gauge**: Ranges appear as colored arc segments along the circular axis

## Linear Gauge Ranges

### Basic Range

Add ranges using the `ranges` property:

```dart
SfLinearGauge(
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

### Range Properties

**Start and End Values:**

```dart
LinearGaugeRange(
  startValue: 20,
  endValue: 80,
  color: Colors.yellow,
)
```

**Color:**

```dart
LinearGaugeRange(
  startValue: 0,
  endValue: 30,
  color: Colors.blue,
)
```

**Width (Thickness):**

```dart
LinearGaugeRange(
  startValue: 0,
  endValue: 50,
  startWidth: 10,
  endWidth: 20, // Tapered range
  color: Colors.green,
)
```

**Position:**

```dart
LinearGaugeRange(
  startValue: 0,
  endValue: 50,
  position: LinearElementPosition.inside, // outside, cross
  color: Colors.blue,
)
```

**Shape Type:**

```dart
LinearGaugeRange(
  startValue: 0,
  endValue: 50,
  rangeShapeType: LinearRangeShapeType.curve, // or .flat
  color: Colors.orange,
)
```

### Multiple Ranges

Create color-coded thresholds:

```dart
SfLinearGauge(
  minimum: 0,
  maximum: 100,
  ranges: [
    // Low range (red)
    LinearGaugeRange(
      startValue: 0,
      endValue: 30,
      color: Colors.red,
    ),
    // Medium range (yellow)
    LinearGaugeRange(
      startValue: 30,
      endValue: 70,
      color: Colors.yellow,
    ),
    // High range (green)
    LinearGaugeRange(
      startValue: 70,
      endValue: 100,
      color: Colors.green,
    ),
  ],
)
```

### Range Patterns

**Battery Indicator:**

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
      color: Colors.red[700]!,
    ),
    LinearGaugeRange(
      startValue: 20,
      endValue: 50,
      color: Colors.orange,
    ),
    LinearGaugeRange(
      startValue: 50,
      endValue: 100,
      color: Colors.green,
    ),
  ],
  barPointers: [
    LinearBarPointer(value: 75),
  ],
)
```

**Temperature Zones:**

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
      endValue: 15,
      color: Colors.lightBlue,
    ),
    LinearGaugeRange(
      startValue: 15,
      endValue: 30,
      color: Colors.green,
    ),
    LinearGaugeRange(
      startValue: 30,
      endValue: 50,
      color: Colors.red,
    ),
  ],
)
```

## Radial Gauge Ranges

Radial gauge ranges are part of `RadialAxis` and appear as arc segments.

### Basic Range

```dart
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
)
```

### Range Properties

**Start and End Values:**

```dart
GaugeRange(
  startValue: 20,
  endValue: 80,
  color: Colors.yellow,
  startWidth: 10,
  endWidth: 10,
)
```

**Width (Thickness):**

```dart
GaugeRange(
  startValue: 0,
  endValue: 50,
  startWidth: 10,
  endWidth: 20, // Tapered range
  color: Colors.blue,
)
```

**Size Unit:**

```dart
// Using logical pixels
GaugeRange(
  startValue: 0,
  endValue: 50,
  startWidth: 20,
  endWidth: 20,
  sizeUnit: GaugeSizeUnit.logicalPixel,
  color: Colors.green,
)

// Using factor (0-1)
GaugeRange(
  startValue: 50,
  endValue: 100,
  startWidth: 0.1, // 10% of radius
  endWidth: 0.1,
  sizeUnit: GaugeSizeUnit.factor,
  color: Colors.orange,
)
```

**Gradient:**

```dart
GaugeRange(
  startValue: 0,
  endValue: 100,
  startWidth: 15,
  endWidth: 15,
  gradient: SweepGradient(
    colors: [Colors.green, Colors.yellow, Colors.red],
    stops: [0.0, 0.5, 1.0],
  ),
)
```

**Range Offset:**

```dart
GaugeRange(
  startValue: 0,
  endValue: 50,
  startWidth: 10,
  endWidth: 10,
  rangeOffset: 15, // Distance from axis
  color: Colors.blue,
)
```

**Label Support:**

```dart
GaugeRange(
  startValue: 0,
  endValue: 50,
  startWidth: 10,
  endWidth: 10,
  color: Colors.green,
  label: 'Low',
  labelStyle: GaugeTextStyle(
    fontSize: 12,
    fontWeight: FontWeight.bold,
  ),
)
```

### Multiple Ranges

**Speedometer Zones:**

```dart
RadialAxis(
  minimum: 0,
  maximum: 200,
  ranges: [
    GaugeRange(
      startValue: 0,
      endValue: 60,
      color: Colors.green,
      startWidth: 15,
      endWidth: 15,
      label: 'Safe',
    ),
    GaugeRange(
      startValue: 60,
      endValue: 120,
      color: Colors.yellow,
      startWidth: 15,
      endWidth: 15,
      label: 'Caution',
    ),
    GaugeRange(
      startValue: 120,
      endValue: 200,
      color: Colors.red,
      startWidth: 15,
      endWidth: 15,
      label: 'Danger',
    ),
  ],
  pointers: [
    NeedlePointer(value: 85),
  ],
)
```

**Temperature Gauge:**

```dart
RadialAxis(
  minimum: -20,
  maximum: 50,
  startAngle: 180,
  endAngle: 0,
  ranges: [
    GaugeRange(
      startValue: -20,
      endValue: 0,
      color: Colors.blue,
      startWidth: 20,
      endWidth: 20,
      label: 'Cold',
    ),
    GaugeRange(
      startValue: 0,
      endValue: 25,
      color: Colors.green,
      startWidth: 20,
      endWidth: 20,
      label: 'Normal',
    ),
    GaugeRange(
      startValue: 25,
      endValue: 50,
      color: Colors.red,
      startWidth: 20,
      endWidth: 20,
      label: 'Hot',
    ),
  ],
)
```

**Performance Dashboard:**

```dart
RadialAxis(
  minimum: 0,
  maximum: 100,
  showLabels: false,
  showTicks: false,
  axisLineStyle: AxisLineStyle(
    thickness: 20,
    color: Colors.grey[300],
  ),
  ranges: [
    GaugeRange(
      startValue: 0,
      endValue: 40,
      startWidth: 20,
      endWidth: 20,
      color: Colors.red[300],
    ),
    GaugeRange(
      startValue: 40,
      endValue: 70,
      startWidth: 20,
      endWidth: 20,
      color: Colors.yellow[300],
    ),
    GaugeRange(
      startValue: 70,
      endValue: 100,
      startWidth: 20,
      endWidth: 20,
      color: Colors.green,
    ),
  ],
  pointers: [
    RangePointer(
      value: 85,
      width: 20,
      color: Colors.green[700],
    ),
  ],
)
```

## Range Design Patterns

### Status Indicators

**Traffic Light Pattern:**

```dart
// Linear
SfLinearGauge(
  ranges: [
    LinearGaugeRange(startValue: 0, endValue: 33, color: Colors.red),
    LinearGaugeRange(startValue: 33, endValue: 66, color: Colors.yellow),
    LinearGaugeRange(startValue: 66, endValue: 100, color: Colors.green),
  ],
)

// Radial
RadialAxis(
  ranges: [
    GaugeRange(startValue: 0, endValue: 33, color: Colors.red, startWidth: 15, endWidth: 15),
    GaugeRange(startValue: 33, endValue: 66, color: Colors.yellow, startWidth: 15, endWidth: 15),
    GaugeRange(startValue: 66, endValue: 100, color: Colors.green, startWidth: 15, endWidth: 15),
  ],
)
```

### Performance Ratings

**5-Level Rating:**

```dart
RadialAxis(
  minimum: 0,
  maximum: 5,
  ranges: [
    GaugeRange(startValue: 0, endValue: 1, color: Colors.red[900]!, startWidth: 10, endWidth: 10),
    GaugeRange(startValue: 1, endValue: 2, color: Colors.red, startWidth: 10, endWidth: 10),
    GaugeRange(startValue: 2, endValue: 3, color: Colors.orange, startWidth: 10, endWidth: 10),
    GaugeRange(startValue: 3, endValue: 4, color: Colors.lightGreen, startWidth: 10, endWidth: 10),
    GaugeRange(startValue: 4, endValue: 5, color: Colors.green, startWidth: 10, endWidth: 10),
  ],
)
```

### Graduated Intensity

**Tapered Ranges:**

```dart
RadialAxis(
  ranges: [
    GaugeRange(
      startValue: 0,
      endValue: 50,
      startWidth: 5,
      endWidth: 15, // Gradually thickens
      color: Colors.blue,
    ),
    GaugeRange(
      startValue: 50,
      endValue: 100,
      startWidth: 15,
      endWidth: 5, // Gradually thins
      color: Colors.orange,
    ),
  ],
)
```

## Range Use Cases

### Battery/Fuel Indicators

Show critical, warning, and safe zones:

```dart
SfLinearGauge(
  ranges: [
    LinearGaugeRange(
      startValue: 0,
      endValue: 15,
      color: Colors.red,
    ),
    LinearGaugeRange(
      startValue: 15,
      endValue: 50,
      color: Colors.orange,
    ),
    LinearGaugeRange(
      startValue: 50,
      endValue: 100,
      color: Colors.green,
    ),
  ],
)
```

### Health Metrics

Display normal/abnormal ranges:

```dart
RadialAxis(
  minimum: 40,
  maximum: 200,
  ranges: [
    GaugeRange(startValue: 40, endValue: 60, color: Colors.blue, startWidth: 10, endWidth: 10),
    GaugeRange(startValue: 60, endValue: 100, color: Colors.green, startWidth: 10, endWidth: 10),
    GaugeRange(startValue: 100, endValue: 140, color: Colors.orange, startWidth: 10, endWidth: 10),
    GaugeRange(startValue: 140, endValue: 200, color: Colors.red, startWidth: 10, endWidth: 10),
  ],
)
```

### Quality Scores

Visual scoring systems:

```dart
RadialAxis(
  minimum: 0,
  maximum: 100,
  ranges: [
    GaugeRange(startValue: 0, endValue: 60, color: Colors.red, startWidth: 15, endWidth: 15, label: 'Poor'),
    GaugeRange(startValue: 60, endValue: 75, color: Colors.orange, startWidth: 15, endWidth: 15, label: 'Fair'),
    GaugeRange(startValue: 75, endValue: 90, color: Colors.yellow, startWidth: 15, endWidth: 15, label: 'Good'),
    GaugeRange(startValue: 90, endValue: 100, color: Colors.green, startWidth: 15, endWidth: 15, label: 'Excellent'),
  ],
)
```

## Best Practices

1. **Use 3-5 ranges** for optimal readability
2. **Choose distinct colors** for clear differentiation
3. **Align ranges with meaningful thresholds** (industry standards, safety limits)
4. **Consider color-blind users** (avoid red/green only combinations)
5. **Add labels** for radial ranges when space permits
6. **Match range width** to gauge thickness for visual harmony
7. **Use gradients sparingly** to avoid visual clutter

## Summary

Ranges provide immediate visual feedback about value thresholds:
- **Linear Gauge**: Simple colored segments along the track
- **Radial Gauge**: Arc segments with label support and gradients
- Both support multiple ranges for complex threshold visualizations
- Essential for status indicators, performance metrics, and safety zones
