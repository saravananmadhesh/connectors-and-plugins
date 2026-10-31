# Getting Started with SfPyramidChart

## Table of Contents
- [Installation](#installation)
- [Import](#import)
- [Initialize the Chart](#initialize-the-chart)
- [Bind Data Source](#bind-data-source)
- [Add Title](#add-title)
- [Enable Data Labels](#enable-data-labels)
- [Enable Legend](#enable-legend)
- [Enable Tooltip](#enable-tooltip)
- [Complete Minimal Example](#complete-minimal-example)

---

## Installation

Add the dependency by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_charts
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

---

## Import

```dart
import 'package:syncfusion_flutter_charts/charts.dart';
```

---

## Initialize the Chart

Add `SfPyramidChart` as a child of any widget. It fills its parent's size by default.

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: Container(
        height: 400,
        width: 350,
        child: SfPyramidChart(),  // Empty chart renders by default
      ),
    ),
  );
}
```

> An empty chart is displayed when no data is bound — this is expected behavior.

---

## Bind Data Source

Create a data class and map it to the series using `xValueMapper` and `yValueMapper`:

```dart
@override
Widget build(BuildContext context) {
  final List<ChartData> chartData = [
    ChartData('Enterprise', 654),
    ChartData('Mid-Market', 575),
    ChartData('SMB', 446),
    ChartData('Startup', 341),
    ChartData('Individual', 160),
  ];

  return Scaffold(
    body: Center(
      child: SfPyramidChart(
        series: PyramidSeries<ChartData, String>(
          dataSource: chartData,
          xValueMapper: (ChartData data, _) => data.x,  // Category label
          yValueMapper: (ChartData data, _) => data.y,  // Segment size
        ),
      ),
    ),
  );
}

class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double y;
}
```

- `xValueMapper` → the label shown for each pyramid segment
- `yValueMapper` → the numeric value that determines segment proportions

---

## Add Title

```dart
SfPyramidChart(
  title: ChartTitle(text: 'Sales Pipeline'),
  series: PyramidSeries<ChartData, String>(
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
  ),
)
```

---

## Enable Data Labels

```dart
PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

---

## Enable Legend

```dart
SfPyramidChart(
  legend: Legend(isVisible: true),
  series: PyramidSeries<ChartData, String>(
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
  ),
)
```

---

## Enable Tooltip

Tooltip must be initialized in `initState` and passed to the chart:

```dart
late TooltipBehavior _tooltipBehavior;

@override
void initState() {
  _tooltipBehavior = TooltipBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return Scaffold(
    body: SfPyramidChart(
      tooltipBehavior: _tooltipBehavior,
      series: PyramidSeries<ChartData, String>(
        dataSource: chartData,
        xValueMapper: (ChartData data, _) => data.x,
        yValueMapper: (ChartData data, _) => data.y,
      ),
    ),
  );
}
```

> Tooltip state is preserved across device orientation changes and browser resizes.

---

## Complete Minimal Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: PyramidChartPage());
  }
}

class PyramidChartPage extends StatefulWidget {
  const PyramidChartPage({super.key});
  @override
  State<PyramidChartPage> createState() => _PyramidChartPageState();
}

class _PyramidChartPageState extends State<PyramidChartPage> {
  late TooltipBehavior _tooltipBehavior;

  final List<ChartData> _chartData = [
    ChartData('Enterprise', 654),
    ChartData('Mid-Market', 575),
    ChartData('SMB', 446),
    ChartData('Startup', 341),
    ChartData('Individual', 160),
  ];

  @override
  void initState() {
    _tooltipBehavior = TooltipBehavior(enable: true);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pyramid Chart')),
      body: SfPyramidChart(
        title: ChartTitle(text: 'Sales Pipeline'),
        legend: Legend(isVisible: true),
        tooltipBehavior: _tooltipBehavior,
        series: PyramidSeries<ChartData, String>(
          dataSource: _chartData,
          xValueMapper: (ChartData data, _) => data.x,
          yValueMapper: (ChartData data, _) => data.y,
          dataLabelSettings: const DataLabelSettings(isVisible: true),
        ),
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
