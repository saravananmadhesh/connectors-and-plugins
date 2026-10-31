# Getting Started with Syncfusion Flutter Slider Controls

This guide covers the setup and basic implementation for **SfSlider**, **SfRangeSlider**, and **SfRangeSelector** widgets.

## Installation

All three components are part of the same Syncfusion Flutter package. Add the dependency by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_sliders
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

## Import Package

Import the package in your Dart code:

```dart
import 'package:syncfusion_flutter_sliders/sliders.dart';
```

For date formatting, you'll also need the `intl` package:

```dart
import 'package:intl/intl.dart';
```

## Basic SfSlider Implementation

### Minimal Slider Setup (Horizontal)

The simplest slider displays values from 0.0 to 1.0:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';

class BasicSlider extends StatefulWidget {
  @override
  _BasicSliderState createState() => _BasicSliderState();
}

class _BasicSliderState extends State<BasicSlider> {
  double _value = 0.5;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Basic Slider')),
      body: Center(
        child: SfSlider(
          value: _value,
          onChanged: (dynamic newValue) {
            setState(() {
              _value = newValue;
            });
          },
        ),
      ),
    );
  }
}
```

### Vertical Slider

Create a vertical slider using the `SfSlider.vertical` constructor:

```dart
double _value = 0.5;

SfSlider.vertical(
  value: _value,
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

### Numeric Slider with Labels

Display numeric values with custom min/max and labels:

```dart
double _value = 40.0;

SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,
  interval: 20,
  showLabels: true,
  showTicks: true,
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

### Date Slider

Use `DateTime` values for date-based sliders:

```dart
DateTime _value = DateTime(2012, 01, 01);

SfSlider(
  min: DateTime(2008, 01, 01),
  max: DateTime(2018, 01, 01),
  value: _value,
  interval: 2,
  showLabels: true,
  dateIntervalType: DateIntervalType.years,
  dateFormat: DateFormat.y(),
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

## Basic SfRangeSlider Implementation

### Minimal Range Slider (Horizontal)

Range slider requires `SfRangeValues` for start and end values:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';

class BasicRangeSlider extends StatefulWidget {
  @override
  _BasicRangeSliderState createState() => _BasicRangeSliderState();
}

class _BasicRangeSliderState extends State<BasicRangeSlider> {
  SfRangeValues _values = const SfRangeValues(0.3, 0.7);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Range Slider')),
      body: Center(
        child: SfRangeSlider(
          values: _values,
          onChanged: (SfRangeValues newValues) {
            setState(() {
              _values = newValues;
            });
          },
        ),
      ),
    );
  }
}
```

### Vertical Range Slider

```dart
SfRangeValues _values = const SfRangeValues(0.3, 0.7);

SfRangeSlider.vertical(
  values: _values,
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
)
```

### Numeric Range Slider with Labels

```dart
SfRangeValues _values = const SfRangeValues(40.0, 60.0);

SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: _values,
  interval: 20,
  showLabels: true,
  showTicks: true,
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
)
```

### Date Range Slider

```dart
SfRangeValues _values = SfRangeValues(
  DateTime(2012, 01, 01),
  DateTime(2014, 01, 01)
);

SfRangeSlider(
  min: DateTime(2008, 01, 01),
  max: DateTime(2018, 01, 01),
  values: _values,
  interval: 2,
  showLabels: true,
  dateIntervalType: DateIntervalType.years,
  dateFormat: DateFormat.y(),
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
)
```

## Basic SfRangeSelector Implementation

### Range Selector with Chart Child

Range selector displays a child widget (commonly a chart) and allows selecting a range:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class BasicRangeSelector extends StatelessWidget {
  final SfRangeValues _initialValues = SfRangeValues(0.3, 0.7);
  
  final List<ChartData> _chartData = [
    ChartData(x: DateTime(2003, 01, 01), y: 3.4),
    ChartData(x: DateTime(2004, 01, 01), y: 2.8),
    ChartData(x: DateTime(2005, 01, 01), y: 1.6),
    ChartData(x: DateTime(2006, 01, 01), y: 2.3),
    ChartData(x: DateTime(2007, 01, 01), y: 2.5),
    ChartData(x: DateTime(2008, 01, 01), y: 2.9),
    ChartData(x: DateTime(2009, 01, 01), y: 3.8),
    ChartData(x: DateTime(2010, 01, 01), y: 2.0),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Range Selector')),
      body: Center(
        child: SfRangeSelector(
          initialValues: _initialValues,
          onChanged: (SfRangeValues values) {
            print('Selected: ${values.start} to ${values.end}');
          },
          child: Container(
            height: 250,
            child: SfCartesianChart(
              margin: const EdgeInsets.all(0),
              primaryXAxis: DateTimeAxis(isVisible: false),
              primaryYAxis: NumericAxis(isVisible: false, maximum: 4),
              series: <SplineAreaSeries<ChartData, DateTime>>[
                SplineAreaSeries<ChartData, DateTime>(
                  dataSource: _chartData,
                  xValueMapper: (ChartData data, _) => data.x,
                  yValueMapper: (ChartData data, _) => data.y,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ChartData {
  ChartData({required this.x, required this.y});
  final DateTime x;
  final double y;
}
```

### Numeric Range Selector

```dart
final double _min = 2.0;
final double _max = 10.0;
SfRangeValues _initialValues = SfRangeValues(4.0, 8.0);

SfRangeSelector(
  min: _min,
  max: _max,
  initialValues: _initialValues,
  interval: 2,
  showLabels: true,
  showTicks: true,
  child: Container(
    height: 130,
    child: SfCartesianChart(
      // Chart configuration
    ),
  ),
)
```

## Quick Comparison

### When to Use Each Widget

| Widget | Use Case | Value Type | Example |
|--------|----------|------------|---------|
| **SfSlider** | Single value selection | `value` (double or DateTime) | Volume control, progress indicator |
| **SfRangeSlider** | Range with two thumbs | `values` (SfRangeValues) | Price filter, date range filter |
| **SfRangeSelector** | Range with child widget | `initialValues` or `controller` | Chart zoom, data segment selection |

### Key Differences

- **SfSlider**: No child widget support, single thumb.
- **SfRangeSlider**: No child widget support, two thumbs, drag modes.
- **SfRangeSelector**: Supports child widget (charts), RangeController, deferred updates.

## Handling Value Changes

All three widgets use similar callback patterns:

```dart
// SfSlider
onChanged: (dynamic newValue) {
  setState(() {
    _value = newValue;
  });
}

// SfRangeSlider and SfRangeSelector
onChanged: (SfRangeValues newValues) {
  setState(() {
    _values = newValues;
  });
}
```

**Important**: The widgets don't update their state automatically. You must rebuild with new values via `setState()` or state management.

## State Management Note

The slider passes new values to the `onChanged` callback but doesn't change its own state. The parent widget must rebuild the slider with the new value.

If `onChanged` is `null`, the slider will be disabled.

## Next Steps

- For detailed widget comparisons, see the individual overview files.
- For customization options, refer to the styling and visual customization references.
- For advanced features like drag modes and controllers, see the advanced references.
