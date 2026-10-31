---
name: syncfusion-flutter-gauges
description: Implements Syncfusion Flutter Gauge widgets (SfLinearGauge, SfRadialGauge) for data visualization and measurement displays in Flutter apps. Use when building speedometers, progress indicators, KPI dashboards, or radial/linear measurement UIs. This skill covers gauge axes, pointers, ranges, annotations, and customization for both linear and radial gauge types.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Gauges

This skill covers two related Syncfusion Flutter components for data visualization and measurement displays: **SfLinearGauge** (Linear Gauge) and **SfRadialGauge** (Radial Gauge). While they share many visual and configuration features, they serve different display purposes with distinct visual representations.

## When to Use This Skill

Use this skill when you need to:

- **Display data on linear or radial scales** for visual measurement representation
- **Create progress indicators** with custom styling and animations
- **Build dashboard visualizations** with KPIs, metrics, or performance indicators
- **Implement measurement displays** (speedometers, thermometers, pressure gauges)
- **Add interactive gauges** with draggable pointers and value changes
- **Visualize ranges and thresholds** on linear or circular scales
- **Create custom gauge controls** for volume, brightness, or rating inputs
- **Display analog-style indicators** in modern Flutter applications
- **Build battery, signal, or status indicators** with gauge representations
- **Customize gauge appearance** with colors, gradients, animations, and styling

## Choosing the Right Component

### Use **SfLinearGauge** (Linear Gauge) when:
- You need **horizontal or vertical measurement displays**
- Your data is best represented on a **linear scale** (bar-style)
- You want **bar pointers** for progress or level indicators
- **Orientation flexibility** is important (rotate 90° easily)
- **Mirror effect** is needed for symmetric displays
- Building: progress bars, sliders, battery indicators, volume controls, horizontal dashboards

### Use **SfRadialGauge** (Radial Gauge) when:
- You need **circular or arc-shaped displays**
- Your visualization requires a **needle pointer** (classic gauge style)
- You want **360-degree or semi-circle representations**
- **Annotations with widgets** need to be placed on the gauge
- **Title support** is needed above the gauge
- **Export to image** functionality is required
- Building: speedometers, RPM meters, temperature gauges, compass displays, clock faces, circular progress

### Key Differences Summary:

| Feature | SfLinearGauge | SfRadialGauge |
|---------|---------------|---------------|
| **Primary Shape** | Linear (horizontal/vertical) | Circular/Arc |
| **Orientation** | Horizontal, Vertical | Circular (360°) |
| **Bar Pointer** | ✅ Yes | ❌ No |
| **Needle Pointer** | ❌ No | ✅ Yes |
| **Range Pointer** | ❌ No | ✅ Yes |
| **Marker Pointer** | ✅ Shape & Widget | ✅ Shape & Widget |
| **Mirror Effect** | ✅ Yes | ❌ No |
| **Annotations** | ❌ No | ✅ Yes |
| **Title Support** | ❌ No | ✅ Yes |
| **Export to Image** | ❌ No | ✅ Yes |
| **Multiple Axes** | ❌ Limited | ✅ Yes |
| **Axis Angles** | N/A | ✅ Configurable |

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup for both components
- Basic SfLinearGauge implementation
- Basic SfRadialGauge implementation
- Package dependencies and imports
- Quick comparison and first examples

### Component Overview

📄 **For Linear Gauge:** [references/linear-gauge-overview.md](references/linear-gauge-overview.md)
- SfLinearGauge widget overview and features
- When to use Linear Gauge vs Radial Gauge
- Orientation options (horizontal/vertical)
- Linear gauge-specific capabilities
- Basic linear gauge configuration

📄 **For Radial Gauge:** [references/radial-gauge-overview.md](references/radial-gauge-overview.md)
- SfRadialGauge widget overview and features
- When to use Radial Gauge vs Linear Gauge
- Circular and arc configurations
- Radial gauge-specific capabilities
- Title and multi-axis support
- Basic radial gauge configuration

### Axes and Scales

📄 **Read:** [references/axes.md](references/axes.md)
- Axis customization for both gauges
- Linear axis (track, thickness, colors)
- Radial axis (circular arc, angles, radius)
- Minimum and maximum values
- Axis intervals and scale
- Axis line styling and gradients
- Labels and ticks positioning
- Inverse axis direction
- Custom scales and renderers
- Multiple axes (radial)

### Pointers

📄 **Read:** [references/pointers.md](references/pointers.md)
- Pointer types overview
- Shape/Marker pointers (both gauges)
- Widget pointers (both gauges)
- Bar pointer (Linear Gauge only)
- Needle pointer (Radial Gauge only)
- Range pointer (Radial Gauge only)
- Multiple pointers configuration
- Pointer positioning and styling
- Pointer comparison and selection guide

### Ranges

📄 **Read:** [references/ranges.md](references/ranges.md)
- Range visualization concepts
- Adding ranges to Linear Gauge
- Adding ranges to Radial Gauge
- Range colors and gradients
- Range positioning and thickness
- Multiple ranges configuration
- Range use cases and patterns

### Customization and Styling

📄 **Read:** [references/customization.md](references/customization.md)
- Visual appearance for both gauges
- Colors (solid and gradients)
- Thickness and sizing
- Border customization
- Corner and edge styles
- Background colors and images
- Theme integration
- Label and tick styling

### Animation

📄 **Read:** [references/animation.md](references/animation.md)
- Animation support in both gauges
- Pointer animations
- Axis and range animations
- Animation duration and easing
- enableAnimation property
- Animation callbacks
- Loading animations

### Interaction

📄 **Read:** [references/interaction.md](references/interaction.md)
- Pointer dragging for both gauges
- enableDragging property
- Value change events
- onValueChangeStart, onValueChanging, onValueChanged, onValueChangeEnd
- Touch and gesture support
- Interactive value updates
- Restricting drag ranges

### Accessibility

📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Screen reader support
- Semantic labels for gauges
- WCAG compliance
- Keyboard navigation
- Accessibility for Linear Gauge
- Accessibility for Radial Gauge
- Best practices

### Advanced Features

📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Mirror gauge (Linear Gauge)
- Annotations with widgets (Radial Gauge)
- Export to image (Radial Gauge)
- Background images (Radial Gauge)
- Custom label formatting
- Custom renderers and builders
- Special configurations
- Edge cases and troubleshooting

## Quick Start Examples

For detailed setup instructions, see [Getting Started](references/getting-started.md).

### Basic Linear Gauge

```dart
import 'package:syncfusion_flutter_gauges/gauges.dart';

SfLinearGauge(
  minimum: 0,
  maximum: 100,
  barPointers: [LinearBarPointer(value: 60)],
  markerPointers: [LinearShapePointer(value: 60)],
)
```

### Basic Radial Gauge

```dart
import 'package:syncfusion_flutter_gauges/gauges.dart';

SfRadialGauge(
  axes: [
    RadialAxis(
      minimum: 0,
      maximum: 150,
      pointers: [NeedlePointer(value: 90)],
    ),
  ],
)
```

### Interactive Gauge (Draggable)

```dart
double _value = 50.0;

// Linear with dragging
SfLinearGauge(
  markerPointers: [
    LinearShapePointer(
      value: _value,
      enableDragging: true,
      onChanged: (v) => setState(() => _value = v),
    ),
  ],
)

// Radial with dragging
SfRadialGauge(
  axes: [
    RadialAxis(
      pointers: [
        NeedlePointer(
          value: _value,
          enableDragging: true,
          onValueChanged: (v) => setState(() => _value = v),
        ),
      ],
    ),
  ],
)
```

## Common Patterns

**Multi-Range Status Indicators:**
```dart
ranges: [
  LinearGaugeRange(startValue: 0, endValue: 30, color: Colors.red),
  LinearGaugeRange(startValue: 30, endValue: 70, color: Colors.yellow),
  LinearGaugeRange(startValue: 70, endValue: 100, color: Colors.green),
]
```

**Gradient Styling:**
```dart
axisTrackStyle: LinearAxisTrackStyle(
  gradient: LinearGradient(colors: [Colors.blue, Colors.purple]),
)
```

**Vertical Orientation:**
```dart
SfLinearGauge(
  orientation: LinearGaugeOrientation.vertical,
  barPointers: [LinearBarPointer(value: 75)],
)
```

**Custom Angles (Semi-Circle):**
```dart
RadialAxis(startAngle: 180, endAngle: 0)
```

**Mirror Effect:**
```dart
SfLinearGauge(isMirrored: true)
```

## Key Properties

### SfLinearGauge Essential Properties

- `minimum` - Minimum value of the axis (default: 0)
- `maximum` - Maximum value of the axis (default: 100)
- `interval` - Interval between axis labels
- `orientation` - Horizontal or vertical orientation
- `isMirrored` - Mirror the gauge elements
- `isAxisInversed` - Reverse axis direction
- `axisTrackStyle` - Styling for axis track (color, thickness, gradient, borders)
- `axisTrackExtent` - Extend axis track at both ends
- `showAxisTrack` - Show/hide axis track
- `showLabels` - Show/hide axis labels
- `showTicks` - Show/hide tick marks
- `labelPosition` - Inside or outside label placement
- `tickPosition` - Inside or outside tick placement
- `labelOffset` - Distance between ticks and labels
- `labelFormatterCallback` - Custom label formatting
- `ranges` - List of LinearGaugeRange for colored segments
- `markerPointers` - List of shape or widget pointers
- `barPointers` - List of bar pointers (progress style)
- `animationDuration` - Animation duration in milliseconds
- `onGenerateLabels` - Custom label generation callback
- `valueToFactorCallback` - Custom scale conversion

### SfRadialGauge Essential Properties

- `title` - GaugeTitle for gauge heading
- `backgroundColor` - Background color for gauge
- `axes` - List of RadialAxis (supports multiple)
- `enableLoadingAnimation` - Show loading animation
- `animationDuration` - Animation duration in milliseconds

### RadialAxis Essential Properties

- `minimum` - Minimum value of axis (default: 0)
- `maximum` - Maximum value of axis (default: 100)
- `interval` - Interval between labels
- `startAngle` - Starting angle of axis (default: 270)
- `endAngle` - Ending angle of axis (default: 270)
- `radiusFactor` - Radius size factor (0-1)
- `centerX` - Horizontal center position (0-1)
- `centerY` - Vertical center position (0-1)
- `isInversed` - Reverse axis direction
- `canScaleToFit` - Position axis based on angles
- `canRotateLabels` - Rotate labels based on angle
- `showFirstLabel` - Show/hide first label
- `showLastLabel` - Show/hide last label
- `maximumLabels` - Max labels per 100 logical pixels
- `axisLineStyle` - AxisLineStyle for axis line
- `showAxisLine` - Show/hide axis line
- `showLabels` - Show/hide labels
- `showTicks` - Show/hide ticks
- `axisLabelStyle` - GaugeTextStyle for labels
- `labelFormat` - Label format string (prefix/suffix)
- `numberFormat` - NumberFormat for globalization
- `labelsPosition` - Inside or outside placement
- `ticksPosition` - Inside or outside placement
- `majorTickStyle` - MajorTickStyle customization
- `minorTickStyle` - MinorTickStyle customization
- `minorTicksPerInterval` - Minor ticks count
- `tickOffset` - Distance from axis
- `labelOffset` - Distance from ticks
- `offsetUnit` - Logical pixels or factor
- `backgroundImage` - AssetImage for axis background
- `ranges` - List of GaugeRange
- `pointers` - List of GaugePointer
- `annotations` - List of GaugeAnnotation
- `onLabelCreated` - Label creation callback
- `onAxisTapped` - Axis tap callback
- `onCreateAxisRenderer` - Custom renderer callback

### LinearGauge Range Properties

- `startValue` - Start value of range
- `endValue` - End value of range
- `color` - Range color
- `startWidth` - Starting width
- `endWidth` - Ending width
- `position` - Inside, outside, or cross
- `rangeShapeType` - Flat or curve shape

### RadialGauge Range Properties

- `startValue` - Start value of range
- `endValue` - End value of range
- `color` - Range color
- `startWidth` - Starting width
- `endWidth` - Ending width
- `gradient` - Gradient for range
- `rangeOffset` - Offset from axis
- `sizeUnit` - Logical pixels or factor
- `label` - Text label for range

### Pointer Properties (Common)

- `value` - Pointer value
- `enableDragging` - Enable pointer dragging
- `enableAnimation` - Enable pointer animation
- `animationDuration` - Animation duration
- `animationType` - Animation curve type
- `onValueChangeStart` - Drag start callback
- `onValueChanging` - Drag progress callback
- `onValueChanged` - Value changed callback
- `onValueChangeEnd` - Drag end callback

## Common Use Cases

1. **Progress Indicators** - Use LinearBarPointer or RangePointer for progress tracking
2. **Speedometer Dashboard** - Use RadialGauge with NeedlePointer and ranges
3. **Temperature Display** - Use vertical LinearGauge or semi-circle RadialGauge
4. **Battery Indicator** - Use LinearGauge with mirror effect and ranges
5. **Volume/Brightness Control** - Use draggable LinearShapePointer
6. **KPI Dashboard** - Use multiple RadialGauges with annotations
7. **Rating Display** - Use RadialGauge with semi-circle and RangePointer
8. **Fuel Gauge** - Use RadialGauge with needle and color ranges
9. **Loading Indicator** - Use animated LinearBarPointer or RangePointer
10. **Slider Alternative** - Use interactive LinearGauge with draggable pointer
