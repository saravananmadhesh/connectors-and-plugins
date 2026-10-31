# Getting Started with Flutter Spark Charts

This guide covers the initial setup and basic implementation of Syncfusion Flutter Spark Charts, including installation, package configuration, and creating your first spark chart.

## Installation

### Add Dependency

Add the Syncfusion Flutter Charts dependency by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_charts
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### Import Package

Import the spark charts package in your Dart code:

```dart
import 'package:syncfusion_flutter_charts/sparkcharts.dart';
```

## Basic Spark Line Chart

The simplest spark chart implementation uses `SfSparkLineChart` with a list of numeric values:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class BasicSparkLine extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Basic Spark Line Chart')),
      body: Center(
        child: Container(
          height: 100,
          padding: EdgeInsets.all(16),
          child: SfSparkLineChart(
            data: <double>[
              10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10
            ],
          ),
        ),
      ),
    );
  }
}
```

## Basic Spark Area Chart

Create an area chart to emphasize magnitude of changes:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class BasicSparkArea extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Basic Spark Area Chart')),
      body: Center(
        child: Container(
          height: 100,
          padding: EdgeInsets.all(16),
          child: SfSparkAreaChart(
            axisLineWidth: 0,
            data: <double>[
              10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10
            ],
          ),
        ),
      ),
    );
  }
}
```

## Basic Spark Bar Chart

Create a bar chart for discrete value comparisons:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class BasicSparkBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Basic Spark Bar Chart')),
      body: Center(
        child: Container(
          height: 100,
          padding: EdgeInsets.all(16),
          child: SfSparkBarChart(
            data: <double>[
              10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10
            ],
          ),
        ),
      ),
    );
  }
}
```

## Basic Win-Loss Chart

Create a win-loss chart for binary outcomes:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class BasicWinLoss extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Basic Win-Loss Chart')),
      body: Center(
        child: Container(
          height: 100,
          padding: EdgeInsets.all(16),
          child: SfSparkWinLossChart(
            data: <double>[
              12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10
            ],
          ),
        ),
      ),
    );
  }
}
```

## Binding Data Source

All spark charts use the `data` property to bind data. This property accepts a `List<double>`:

```dart
SfSparkLineChart(
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8],
)
```

## Enable Data Labels

Add data labels to improve readability using the `labelDisplayMode` property:

```dart
SfSparkLineChart(
  labelDisplayMode: SparkChartLabelDisplayMode.all,
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)
```

### Data Label Display Modes

- `SparkChartLabelDisplayMode.none` - No labels
- `SparkChartLabelDisplayMode.all` - All data points
- `SparkChartLabelDisplayMode.high` - Highest point only
- `SparkChartLabelDisplayMode.low` - Lowest point only
- `SparkChartLabelDisplayMode.first` - First point only
- `SparkChartLabelDisplayMode.last` - Last point only

## Enable Trackball

Enable interactive trackball for touch interactions:

```dart
SfSparkLineChart(
  trackball: SparkChartTrackball(
    activationMode: SparkChartActivationMode.tap,
  ),
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)
```

The trackball displays additional information when you touch the chart area.

## Next Steps

- **Chart Types**: Learn about all four chart types in detail
- **Customization**: Explore color, border, and styling options
- **Markers**: Add markers to line and area charts
- **Axis Configuration**: Customize axis appearance and data binding
- **Advanced Features**: Implement plot bands, special point colors, and more
