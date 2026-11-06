# Getting Started with SfCartesianChart

Step-by-step guide to adding Syncfusion Flutter Cartesian Charts to a Flutter application.

---

## 1. Add Dependency

Run the following command to add the package:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_charts
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

---

## 2. Import Package

In your Dart file:

```dart
import 'package:syncfusion_flutter_charts/charts.dart';
```

---

## 3. Initialize SfCartesianChart

Place `SfCartesianChart` as a child widget. Always wrap it in a container with explicit dimensions — the chart needs bounded height and width:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: SizedBox(
        height: 300,
        child: SfCartesianChart(),
      ),
    ),
  );
}
```

An empty chart will render a blank plot area — this confirms the widget is wired up correctly before adding data.

---

## 4. Define a Data Model

Create a simple class to hold your chart data:

```dart
class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double? y;
}
```

Use nullable `double?` for y-values to support empty/missing data points gracefully.

---

## 5. Bind Data Source

Provide data via the `series` property. Map your model fields to x and y using value mapper callbacks:

```dart
SfCartesianChart(
  primaryXAxis: CategoryAxis(),
  series: <CartesianSeries>[
    LineSeries<ChartData, String>(
      dataSource: [
        ChartData('Jan', 35),
        ChartData('Feb', 28),
        ChartData('Mar', 34),
        ChartData('Apr', 32),
        ChartData('May', 40),
      ],
      xValueMapper: (ChartData data, _) => data.x,
      yValueMapper: (ChartData data, _) => data.y,
    ),
  ],
)
```

- `xValueMapper` — returns the X axis value for each data point
- `yValueMapper` — returns the Y axis value for each data point
- The second parameter `_` is the point index (rarely needed for basic usage)

---

## 6. Add Title

```dart
SfCartesianChart(
  title: ChartTitle(text: 'Half Yearly Sales Analysis'),
)
```

---

## 7. Enable Data Labels

Show values directly on the series points:

```dart
LineSeries<ChartData, String>(
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

---

## 8. Enable Legend

```dart
SfCartesianChart(
  legend: Legend(isVisible: true),
  series: <CartesianSeries>[
    LineSeries<ChartData, String>(
      name: 'Sales', 
    ),
  ],
)
```

---

## 9. Enable Tooltip

Tooltip requires a `TooltipBehavior` instance initialized in `initState`:

```dart
late TooltipBehavior _tooltipBehavior;

@override
void initState() {
  _tooltipBehavior = TooltipBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return SfCartesianChart(
    tooltipBehavior: _tooltipBehavior,
    series: <CartesianSeries>[
      LineSeries<ChartData, String>(
        enableTooltip: true,
      ),
    ],
  );
}
```

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
    return MaterialApp(home: Scaffold(body: const MyChart()));
  }
}

class MyChart extends StatefulWidget {
  const MyChart({super.key});
  @override
  State<MyChart> createState() => _MyChartState();
}

class _MyChartState extends State<MyChart> {
  late TooltipBehavior _tooltip;

  @override
  void initState() {
    _tooltip = TooltipBehavior(enable: true);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SizedBox(
        height: 350,
        child: SfCartesianChart(
          title: ChartTitle(text: 'Monthly Sales'),
          primaryXAxis: CategoryAxis(),
          legend: Legend(isVisible: true),
          tooltipBehavior: _tooltip,
          series: <CartesianSeries>[
            LineSeries<ChartData, String>(
              name: 'Sales',
              enableTooltip: true,
              dataLabelSettings: const DataLabelSettings(isVisible: true),
              dataSource: const [
                ChartData('Jan', 35),
                ChartData('Feb', 28),
                ChartData('Mar', 34),
                ChartData('Apr', 32),
                ChartData('May', 40),
              ],
              xValueMapper: (ChartData d, _) => d.x,
              yValueMapper: (ChartData d, _) => d.y,
            ),
          ],
        ),
      ),
    );
  }
}

class ChartData {
  const ChartData(this.x, this.y);
  final String x;
  final double? y;
}
```

---

## Common Gotchas

| Problem | Fix |
|---------|-----|
| Chart renders blank | Check `dataSource` is non-empty; check value mappers return correct fields |
| Chart overflows / clips | Wrap in `SizedBox` or `Container` with explicit `height` |
| `Null check` error on series | Ensure data model fields are not null when chart builds |
| Tooltip not showing | Initialize `TooltipBehavior` in `initState`, not inline in `build` |
| Legend not showing series name | Set `name` property on each `CartesianSeries` |
