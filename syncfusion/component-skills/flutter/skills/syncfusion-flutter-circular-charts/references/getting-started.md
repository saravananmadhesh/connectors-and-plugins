# Getting Started with SfCircularChart

Step-by-step guide to add a Syncfusion circular chart to a Flutter app and configure its core features.

## Installation

Add the dependency by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_charts
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

## Import

```dart
import 'package:syncfusion_flutter_charts/charts.dart';
```

## Initialize the Chart

Place `SfCircularChart` as a child of any sizing widget. Without width/height constraints it fills the parent:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: Container(
        height: 400,
        width: 400,
        child: SfCircularChart(),  
      ),
    ),
  );
}
```

> An empty `SfCircularChart()` renders a blank area. Add a series to display data.

## Bind Data Source

Define a data model, then map x (category) and y (value) fields:

```dart
class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double y;
}

@override
Widget build(BuildContext context) {
  final List<ChartData> data = [
    ChartData('David', 25),
    ChartData('Steve', 38),
    ChartData('Jack', 34),
    ChartData('Others', 52),
  ];

  return SfCircularChart(
    series: <CircularSeries>[
      PieSeries<ChartData, String>(
        dataSource: data,
        xValueMapper: (ChartData d, _) => d.x,
        yValueMapper: (ChartData d, _) => d.y,
      ),
    ],
  );
}
```

## Add a Title

```dart
SfCircularChart(
  title: ChartTitle(text: 'Half Yearly Sales Analysis'),
  series: <CircularSeries>[
    PieSeries<ChartData, String>(
      dataSource: data,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
    ),
  ],
)
```

## Enable Data Labels

```dart
PieSeries<ChartData, String>(
  dataSource: data,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

## Enable Legend

```dart
SfCircularChart(
  legend: Legend(isVisible: true),
  series: <CircularSeries>[
    PieSeries<ChartData, String>(
      dataSource: data,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      name: 'Sales',  
    ),
  ],
)
```

## Enable Tooltip

Tooltip must be initialized in `initState` to avoid rebuilds:

```dart
late TooltipBehavior _tooltipBehavior;

@override
void initState() {
  _tooltipBehavior = TooltipBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return SfCircularChart(
    tooltipBehavior: _tooltipBehavior,
    series: <CircularSeries>[
      PieSeries<ChartData, String>(
        enableTooltip: true,
        dataSource: data,
        xValueMapper: (d, _) => d.x,
        yValueMapper: (d, _) => d.y,
      ),
    ],
  );
}
```

## Complete Minimal Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class CircularChartPage extends StatefulWidget {
  @override
  _CircularChartPageState createState() => _CircularChartPageState();
}

class _CircularChartPageState extends State<CircularChartPage> {
  late TooltipBehavior _tooltipBehavior;

  final List<ChartData> _data = [
    ChartData('Jan', 35),
    ChartData('Feb', 28),
    ChartData('Mar', 34),
    ChartData('Apr', 32),
    ChartData('May', 40),
  ];

  @override
  void initState() {
    _tooltipBehavior = TooltipBehavior(enable: true);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Circular Chart')),
      body: SfCircularChart(
        title: ChartTitle(text: 'Monthly Sales'),
        legend: Legend(isVisible: true),
        tooltipBehavior: _tooltipBehavior,
        series: <CircularSeries>[
          PieSeries<ChartData, String>(
            dataSource: _data,
            xValueMapper: (d, _) => d.x,
            yValueMapper: (d, _) => d.y,
            dataLabelSettings: DataLabelSettings(isVisible: true),
            enableTooltip: true,
          ),
        ],
      ),
    );
  }
}

class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double y;
}
```

## Common Gotchas

- `SfCircularChart` renders blank if its parent has no size — always wrap in a `Container` or `Expanded` with defined dimensions.
- `TooltipBehavior` should be initialized in `initState`, not inside `build`, to avoid recreation on every rebuild.
- For `CircularSeries`, `xValueMapper` maps the category label and `yValueMapper` maps the numeric slice value — swapping them causes rendering errors.
