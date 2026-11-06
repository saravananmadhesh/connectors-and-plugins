# Getting Started with Flutter Funnel Chart (SfFunnelChart)

This guide explains the steps required to create a funnel chart, populate it with data, and add essential features like title, data labels, legend, and tooltips.

## Overview

Syncfusion Flutter Funnel Chart (SfFunnelChart) is a widget designed to visualize data in a funnel shape, typically representing stages in a process where values progressively decrease. It's commonly used for sales pipelines, marketing funnels, conversion analysis, and process efficiency visualization.

## Add Flutter Charts to an Application

Create a simple project using the instructions given in the [Getting Started with your first Flutter app](https://docs.flutter.dev/get-started/test-drive#choose-your-ide) documentation.

### Add Dependency

Add the Syncfusion Flutter Funnel Chart package by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_charts
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

---

## Package Dependencies

### Import Package

Import the following package in your Dart code:

```dart
import 'package:syncfusion_flutter_charts/charts.dart';
```

## Initialize Chart

Once the package has been imported, initialize the funnel chart as a child of any widget. SfFunnelChart is used to render funnel charts.

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: Container(
        //Initialize funnel chart
        child: SfFunnelChart()
      )
    )
  );
}
```

>**Note**: An empty chart will be displayed. This is the chart's default behavior.

## Bind Data Source

Based on your data, initialize the FunnelSeries. In the series, you need to map the data source and the fields for x and y data points.

```dart
@override
Widget build(BuildContext context) {
  final List<ChartData> chartData = [
    ChartData('Prospects', 500),
    ChartData('Qualified', 350),
    ChartData('Contacted', 250),
    ChartData('Negotiating', 150),
    ChartData('Won', 100)
  ];
  
  return Scaffold(
    body: Center(
      child: Container(
        child: SfFunnelChart(
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.x,
            yValueMapper: (ChartData data, _) => data.y
          )
        )
      )
    )
  );
}

class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double y;
}
```

## Add Title

You can add a title to the chart to provide quick information to users about the data plotted. The title can be set as demonstrated below:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: Container(
        child: SfFunnelChart(
          // Chart title text
          title: ChartTitle(text: 'Sales Pipeline Analysis'),
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.x,
            yValueMapper: (ChartData data, _) => data.y
          )
        )
      )
    )
  );
}
```

## Enable Data Labels

You can add data labels to improve the readability of the chart using the `dataLabelSettings` property:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: Container(
        child: SfFunnelChart(
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.x,
            yValueMapper: (ChartData data, _) => data.y,
            // Render the data label
            dataLabelSettings: DataLabelSettings(isVisible: true)
          )
        )
      )
    )
  );
}
```

## Enable Legend

The legend provides information about the segments rendered in the chart. You can enable legend by setting the `isVisible` property to true:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: Container(
        child: SfFunnelChart(
          // Enables the legend
          legend: Legend(isVisible: true),
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.x,
            yValueMapper: (ChartData data, _) => data.y
          )
        )
      )
    )
  );
}
```

## Enable Tooltip

The tooltip is used when you cannot display information using data labels due to space constraints. The `tooltipBehavior` property is used to enable and customize the tooltip:

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
    appBar: AppBar(
      title: Text('Sales Funnel'),
    ),
    body: Center(
      child: Container(
        child: SfFunnelChart(
          // Enables the tooltip for the series
          tooltipBehavior: _tooltipBehavior,
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.x,
            yValueMapper: (ChartData data, _) => data.y
          )
        )
      )
    )
  );
}
```

## Complete Example

Here's a complete example combining all the features:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: FunnelChartExample(),
    );
  }
}

class FunnelChartExample extends StatefulWidget {
  @override
  _FunnelChartExampleState createState() => _FunnelChartExampleState();
}

class _FunnelChartExampleState extends State<FunnelChartExample> {
  late TooltipBehavior _tooltipBehavior;

  @override
  void initState() {
    _tooltipBehavior = TooltipBehavior(enable: true);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final List<ChartData> chartData = [
      ChartData('Prospects', 500),
      ChartData('Qualified', 350),
      ChartData('Contacted', 250),
      ChartData('Negotiating', 150),
      ChartData('Won', 100)
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('Sales Pipeline Funnel'),
      ),
      body: Center(
        child: Container(
          child: SfFunnelChart(
            title: ChartTitle(text: 'Sales Pipeline Q1 2026'),
            legend: Legend(isVisible: true),
            tooltipBehavior: _tooltipBehavior,
            series: FunnelSeries<ChartData, String>(
              dataSource: chartData,
              xValueMapper: (ChartData data, _) => data.x,
              yValueMapper: (ChartData data, _) => data.y,
              dataLabelSettings: DataLabelSettings(isVisible: true)
            )
          )
        )
      )
    );
  }
}

class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double y;
}
```

## Next Steps

Now that you have a basic funnel chart working, you can explore:

- [Funnel Customization](funnel-customization.md) - Customize size, neck, gaps, and exploded segments
- [Data Labels](datalabel.md) - Advanced data label positioning and styling
- [Legend](legend.md) - Customize legend appearance and behavior
- [Tooltip](tooltip.md) - Advanced tooltip customization
- [Selection](selection.md) - Enable interactive segment selection
- [Callbacks](callbacks.md) - Handle user interactions and events

## Key Concepts

### Data Mapping

Funnel charts require two primary data mappings:
- **xValueMapper**: Maps the category/stage name (String)
- **yValueMapper**: Maps the numeric value (num)

### Progressive Decrease

Funnel charts are designed to show data that decreases from one stage to the next, representing a filtering or conversion process. Each segment's size is proportional to its value.

### Series Configuration

Unlike other charts that can have multiple series, funnel charts typically display a single FunnelSeries representing one dataset with multiple stages.

## Common Issues

**Issue**: Chart is not visible
- **Solution**: Ensure the parent Container has a defined size or the chart is in a widget that provides constraints.

**Issue**: Data labels are overlapping
- **Solution**: Use `labelPosition: ChartDataLabelPosition.outside` or adjust the chart size.

**Issue**: Colors are all the same
- **Solution**: Use the `palette` property on SfFunnelChart or `pointColorMapper` on the series to apply different colors.