# Pointers

## Table of Contents
- [Overview](#overview)
- [Pointer Comparison](#pointer-comparison)
- [Linear Gauge Pointers](#linear-gauge-pointers)
  - [Shape Marker Pointer (Linear)](#shape-marker-pointer-linear)
  - [Widget Marker Pointer (Linear)](#widget-marker-pointer-linear)
  - [Bar Pointer (Linear)](#bar-pointer-linear)
- [Radial Gauge Pointers](#radial-gauge-pointers)
  - [Needle Pointer (Radial)](#needle-pointer-radial)
  - [Marker Pointer (Radial)](#marker-pointer-radial)
  - [Range Pointer (Radial)](#range-pointer-radial)
  - [Widget Pointer (Radial)](#widget-pointer-radial)
- [Multiple Pointers](#multiple-pointers)
- [Pointer Animation](#pointer-animation)
- [Pointer Interaction](#pointer-interaction)

## Overview

Pointers indicate values on gauge axes. Linear and Radial gauges support different pointer types optimized for their respective display styles.

## Pointer Comparison

| Pointer Type | Linear Gauge | Radial Gauge | Description |
|--------------|--------------|--------------|-------------|
| **Shape Marker** | ✅ Yes | ✅ Yes | Pre-built shapes (triangle, circle, diamond) |
| **Widget Marker** | ✅ Yes | ✅ Yes | Custom Flutter widgets |
| **Bar Pointer** | ✅ Yes | ❌ No | Filled bar from minimum to value |
| **Needle Pointer** | ❌ No | ✅ Yes | Classic analog gauge needle |
| **Range Pointer** | ❌ No | ✅ Yes | Arc segment from start to value |

## Linear Gauge Pointers

Linear gauges support three pointer types: shape markers, widget markers, and bar pointers.

### Shape Marker Pointer (Linear)

Pre-built shapes that point to values on the axis.

**Basic Usage:**

```dart
SfLinearGauge(
  markerPointers: [
    LinearShapePointer(value: 60),
  ],
)
```

**Shape Types:**

```dart
LinearShapePointer(
  value: 60,
  shapeType: LinearShapePointerType.circle,
  // Options: circle, invertedTriangle, triangle, diamond, rectangle
)
```

**Customization:**

```dart
LinearShapePointer(
  value: 60,
  width: 20,
  height: 20,
  color: Colors.blue,
  position: LinearElementPosition.cross, // inside, outside, cross
  offset: 10, // Distance from axis
)
```

**Edge Style:**

```dart
LinearShapePointer(
  value: 60,
  shapeType: LinearShapePointerType.rectangle,
  width: 30,
  height: 15,
  edgeStyle: LinearEdgeStyle.bothCurve,
)
```

**Elevation (Shadow):**

```dart
LinearShapePointer(
  value: 60,
  elevation: 5,
  elevationColor: Colors.black26,
)
```

### Widget Marker Pointer (Linear)

Use any Flutter widget as a pointer.

**Basic Usage:**

```dart
SfLinearGauge(
  markerPointers: [
    LinearWidgetPointer(
      value: 40,
      child: Icon(Icons.arrow_drop_down, size: 30),
    ),
  ],
)
```

**Custom Widget Examples:**

```dart
// Image pointer
LinearWidgetPointer(
  value: 50,
  child: Image.asset('assets/pointer.png', width: 30, height: 30),
)

// Circular container
LinearWidgetPointer(
  value: 65,
  child: Container(
    width: 25,
    height: 25,
    decoration: BoxDecoration(
      color: Colors.red,
      shape: BoxShape.circle,
      boxShadow: [
        BoxShadow(color: Colors.black26, blurRadius: 5),
      ],
    ),
  ),
)

// Text pointer
LinearWidgetPointer(
  value: 75,
  child: Container(
    padding: EdgeInsets.all(8),
    decoration: BoxDecoration(
      color: Colors.blue,
      borderRadius: BorderRadius.circular(5),
    ),
    child: Text('75', style: TextStyle(color: Colors.white)),
  ),
)
```

**Positioning:**

```dart
LinearWidgetPointer(
  value: 50,
  position: LinearElementPosition.outside,
  offset: 15,
  child: Icon(Icons.star),
)
```

### Bar Pointer (Linear)

Filled bar from the minimum value to the pointer value.

**Basic Usage:**

```dart
SfLinearGauge(
  barPointers: [
    LinearBarPointer(value: 70),
  ],
)
```

**Customization:**

```dart
LinearBarPointer(
  value: 75,
  thickness: 15,
  color: Colors.blue,
  edgeStyle: LinearEdgeStyle.endCurve,
)
```

**Gradient:**

```dart
LinearBarPointer(
  value: 80,
  thickness: 20,
  shaderCallback: (bounds) => LinearGradient(
    colors: [Colors.red, Colors.green],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  ).createShader(bounds),
)
```

**Borders:**

```dart
LinearBarPointer(
  value: 60,
  thickness: 15,
  color: Colors.transparent,
  borderWidth: 3,
  borderColor: Colors.blue,
)
```

**Positioning:**

```dart
LinearBarPointer(
  value: 50,
  position: LinearElementPosition.inside, // outside, cross
  offset: 5,
)
```

**Animation:**

```dart
LinearBarPointer(
  value: 85,
  animationType: LinearAnimationType.ease,
  enableAnimation: true,
  onAnimationCompleted: () {
    print('Bar animation completed');
  },
)
```

## Radial Gauge Pointers

Radial gauges support four pointer types: needle, marker, range, and widget pointers.

### Needle Pointer (Radial)

Classic analog gauge needle with knob and tail.

**Basic Usage:**

```dart
RadialAxis(
  pointers: [
    NeedlePointer(value: 60),
  ],
)
```

**Needle Customization:**

```dart
NeedlePointer(
  value: 75,
  needleLength: 0.8, // Factor of radius
  lengthUnit: GaugeSizeUnit.factor,
  needleStartWidth: 1,
  needleEndWidth: 5,
  needleColor: Colors.red,
)
```

**Gradient Needle:**

```dart
NeedlePointer(
  value: 80,
  needleLength: 0.9,
  gradient: LinearGradient(
    colors: [Colors.blue, Colors.purple],
  ),
)
```

**Knob Customization:**

```dart
NeedlePointer(
  value: 65,
  knobStyle: KnobStyle(
    knobRadius: 0.08,
    sizeUnit: GaugeSizeUnit.factor,
    color: Colors.blue,
    borderColor: Colors.white,
    borderWidth: 0.02,
  ),
)
```

**Tail Customization:**

```dart
NeedlePointer(
  value: 70,
  tailStyle: TailStyle(
    length: 0.2,
    lengthUnit: GaugeSizeUnit.factor,
    width: 5,
    color: Colors.grey,
  ),
)
```

**Needle Offset:**

```dart
NeedlePointer(
  value: 60,
  needleEndWidth: 10,
  needleLength: 0.7,
  needleOffset: 20, // Offset from axis center
)
```

### Marker Pointer (Radial)

Shape markers positioned on the axis.

**Basic Usage:**

```dart
RadialAxis(
  pointers: [
    MarkerPointer(value: 60),
  ],
)
```

**Marker Types:**

```dart
MarkerPointer(
  value: 75,
  markerType: MarkerType.circle,
  // Options: circle, diamond, invertedTriangle, triangle, 
  //          image, text, rectangle
  markerWidth: 20,
  markerHeight: 20,
  color: Colors.red,
)
```

**Image Marker:**

```dart
MarkerPointer(
  value: 50,
  markerType: MarkerType.image,
  imageUrl: 'assets/marker.png',
  markerWidth: 30,
  markerHeight: 30,
)
```

**Text Marker:**

```dart
MarkerPointer(
  value: 65,
  markerType: MarkerType.text,
  text: '65',
  textStyle: GaugeTextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
  ),
)
```

**Positioning:**

```dart
MarkerPointer(
  value: 80,
  markerOffset: -10, // Negative moves inward
  markerWidth: 25,
  markerHeight: 25,
)
```

**Elevation:**

```dart
MarkerPointer(
  value: 70,
  elevation: 5,
  color: Colors.blue,
)
```

### Range Pointer (Radial)

Arc segment from axis start to the pointer value.

**Basic Usage:**

```dart
RadialAxis(
  pointers: [
    RangePointer(value: 60),
  ],
)
```

**Customization:**

```dart
RangePointer(
  value: 75,
  width: 20,
  color: Colors.blue,
  sizeUnit: GaugeSizeUnit.logicalPixel,
)
```

**Using Factor:**

```dart
RangePointer(
  value: 80,
  width: 0.15, // 15% of radius
  sizeUnit: GaugeSizeUnit.factor,
)
```

**Gradient:**

```dart
RangePointer(
  value: 70,
  width: 20,
  gradient: SweepGradient(
    colors: [Colors.green, Colors.orange, Colors.red],
    stops: [0.0, 0.5, 1.0],
  ),
)
```

**Dashed Range:**

```dart
RangePointer(
  value: 65,
  width: 15,
  dashArray: [5, 3],
)
```

**Corner Style:**

```dart
RangePointer(
  value: 85,
  width: 20,
  cornerStyle: CornerStyle.bothCurve,
)
```

**Positioning:**

```dart
RangePointer(
  value: 55,
  width: 15,
  pointerOffset: 10, // Distance from axis
)
```

### Widget Pointer (Radial)

Any Flutter widget positioned on the axis.

**Basic Usage:**

```dart
RadialAxis(
  pointers: [
    WidgetPointer(
      value: 60,
      child: Icon(Icons.star, color: Colors.amber, size: 30),
    ),
  ],
)
```

**Custom Widget Examples:**

```dart
// Container with value
WidgetPointer(
  value: 75,
  child: Container(
    width: 50,
    height: 50,
    decoration: BoxDecoration(
      color: Colors.blue,
      shape: BoxShape.circle,
      boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 5)],
    ),
    child: Center(
      child: Text('75', style: TextStyle(color: Colors.white)),
    ),
  ),
)

// Image pointer
WidgetPointer(
  value: 60,
  child: Image.asset('assets/pointer.png', width: 40, height: 40),
)

// Custom shape
WidgetPointer(
  value: 80,
  child: CustomPaint(
    size: Size(30, 30),
    painter: ArrowPainter(),
  ),
)
```

**Positioning:**

```dart
WidgetPointer(
  value: 65,
  offset: -20, // Negative moves inward
  child: Icon(Icons.location_pin, size: 30),
)
```

## Multiple Pointers

Both gauge types support multiple pointers.

**Linear Gauge Multiple Pointers:**

```dart
SfLinearGauge(
  barPointers: [
    LinearBarPointer(value: 60, thickness: 10),
    LinearBarPointer(
      value: 80,
      thickness: 10,
      offset: 15,
      position: LinearElementPosition.outside,
    ),
  ],
  markerPointers: [
    LinearShapePointer(value: 60),
    LinearShapePointer(
      value: 80,
      offset: 15,
      position: LinearElementPosition.outside,
    ),
  ],
)
```

**Radial Gauge Multiple Pointers:**

```dart
RadialAxis(
  pointers: [
    RangePointer(value: 50, width: 15, color: Colors.blue),
    NeedlePointer(value: 75, needleColor: Colors.red),
    MarkerPointer(value: 60, markerType: MarkerType.circle),
  ],
)
```

## Pointer Animation

**Linear Gauge Animation:**

```dart
LinearBarPointer(
  value: 75,
  enableAnimation: true,
  animationDuration: 1500,
  animationType: LinearAnimationType.ease,
)

LinearShapePointer(
  value: 60,
  animationDuration: 1000,
  enableAnimation: true,
)
```

**Radial Gauge Animation:**

```dart
NeedlePointer(
  value: 80,
  enableAnimation: true,
  animationDuration: 1200,
  animationType: AnimationType.ease,
)

RangePointer(
  value: 65,
  enableAnimation: true,
  animationDuration: 1500,
)
```

## Pointer Interaction

Enable dragging for user interaction.

**Linear Gauge Dragging:**

```dart
double _value = 50;

LinearShapePointer(
  value: _value,
  enableDragging: true,
  onChanged: (double newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

**Radial Gauge Dragging:**

```dart
double _value = 60;

NeedlePointer(
  value: _value,
  enableDragging: true,
  onValueChangeStart: (double value) {
    print('Drag started at: $value');
  },
  onValueChanging: (ValueChangingArgs args) {
    // Restrict value
    if (args.value > 80) {
      args.cancel = true;
    }
  },
  onValueChanged: (double value) {
    setState(() {
      _value = value;
    });
  },
  onValueChangeEnd: (double value) {
    print('Drag ended at: $value');
  },
)
```

**Restrict Dragging Range:**

```dart
MarkerPointer(
  value: _value,
  enableDragging: true,
  onValueChanging: (ValueChangingArgs args) {
    if (args.value < 20 || args.value > 80) {
      args.cancel = true; // Prevent values outside 20-80
    }
  },
  onValueChanged: (value) {
    setState(() => _value = value);
  },
)
```

## Pointer Selection Guide

**Use Linear Shape Pointer when:**
- Simple marker indication needed
- Icon-style indicators
- Minimal design preferred

**Use Linear Widget Pointer when:**
- Custom visual indicators required
- Images or complex widgets needed
- Unique branding elements

**Use Linear Bar Pointer when:**
- Progress visualization needed
- Filled-bar style preferred
- Loading indicators

**Use Needle Pointer when:**
- Classic analog gauge aesthetic
- Traditional speedometer style
- Rotating indicator needed

**Use Marker Pointer when:**
- Simple position markers
- Multiple values on same axis
- Icon or shape indicators

**Use Range Pointer when:**
- Progress arc visualization
- Filled circular progress
- Color-coded progress ranges

**Use Widget Pointer when:**
- Custom radial indicators
- Images or complex widgets
- Unique positioning requirements

## Summary

Both Linear and Radial gauges provide flexible pointer systems for indicating values. Linear gauges excel at bar-style progress indicators, while Radial gauges offer classic needle pointers and arc-based range pointers for circular visualizations.
