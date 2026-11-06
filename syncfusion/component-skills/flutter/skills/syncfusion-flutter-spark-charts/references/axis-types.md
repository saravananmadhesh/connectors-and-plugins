# Axis Types in Flutter Spark Charts

While spark charts are designed to be lightweight without traditional axis labels, they support different axis types for the X-axis through custom data binding. The Y-axis always uses numerical scale.

## Default Numeric Data

By default, spark charts use a simple list of double values where the X-axis is implicitly indexed (0, 1, 2, 3...):

```dart
SfSparkLineChart(
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)
```

## Custom Data Source with .custom() Constructor

To use custom X-axis values or bind complex data sources, use the `.custom()` constructor available on all spark chart types.

### Required Parameters

- `dataCount` - Total number of data points
- `xValueMapper` - Function to extract X-axis value
- `yValueMapper` - Function to extract Y-axis value

---

## Numeric Axis

Use numeric X-axis values for scenarios like years, IDs, or other numeric categories.

### Example with Numeric X-Axis

```dart
class ChartData {
  ChartData({required this.xval, required this.yval});
  final double xval;
  final double yval;
}

final List<ChartData> data = [
  ChartData(xval: 1, yval: 190),
  ChartData(xval: 2, yval: 165),
  ChartData(xval: 3, yval: 158),
  ChartData(xval: 4, yval: 175),
  ChartData(xval: 5, yval: 200),
  ChartData(xval: 6, yval: 180),
  ChartData(xval: 7, yval: 210),
];

@override
Widget build(BuildContext context) {
  return SfSparkBarChart.custom(
    axisLineWidth: 0,
    dataCount: data.length,
    xValueMapper: (index) => data[index].xval,
    yValueMapper: (index) => data[index].yval,
  );
}
```

### Use Cases for Numeric Axis

- Year-based data (2020, 2021, 2022...)
- ID-based values
- Index-based metrics
- Sequential numeric categories

---

## Date-Time Axis

Use DateTime objects for X-axis when working with time-series data.

### Example with Date-Time X-Axis

```dart
class ChartData {
  ChartData({required this.xval, required this.yval});
  final DateTime xval;
  final double yval;
}

final List<ChartData> data = [
  ChartData(xval: DateTime(2018, 1, 1), yval: 4),
  ChartData(xval: DateTime(2018, 1, 2), yval: 4.5),
  ChartData(xval: DateTime(2018, 1, 3), yval: 8),
  ChartData(xval: DateTime(2018, 1, 4), yval: 7),
  ChartData(xval: DateTime(2018, 1, 5), yval: 6),
  ChartData(xval: DateTime(2018, 1, 8), yval: 8),
  ChartData(xval: DateTime(2018, 1, 9), yval: 8),
  ChartData(xval: DateTime(2018, 1, 10), yval: 6.5),
  ChartData(xval: DateTime(2018, 1, 11), yval: 4),
  ChartData(xval: DateTime(2018, 1, 12), yval: 5.5),
  ChartData(xval: DateTime(2018, 1, 15), yval: 8),
  ChartData(xval: DateTime(2018, 1, 16), yval: 6),
  ChartData(xval: DateTime(2018, 1, 17), yval: 6.5),
  ChartData(xval: DateTime(2018, 1, 18), yval: 7.5),
  ChartData(xval: DateTime(2018, 1, 19), yval: 7.5),
  ChartData(xval: DateTime(2018, 1, 22), yval: 4),
  ChartData(xval: DateTime(2018, 1, 23), yval: 8),
  ChartData(xval: DateTime(2018, 1, 24), yval: 6),
  ChartData(xval: DateTime(2018, 1, 25), yval: 7.5),
  ChartData(xval: DateTime(2018, 1, 26), yval: 4.5),
  ChartData(xval: DateTime(2018, 1, 29), yval: 6),
  ChartData(xval: DateTime(2018, 1, 30), yval: 5),
  ChartData(xval: DateTime(2018, 1, 31), yval: 7),
];

@override
Widget build(BuildContext context) {
  return SfSparkBarChart.custom(
    axisLineWidth: 0,
    dataCount: data.length,
    xValueMapper: (index) => data[index].xval,
    yValueMapper: (index) => data[index].yval,
  );
}
```

### Use Cases for Date-Time Axis

- Daily metrics
- Hourly data
- Monthly trends
- Time-series analysis
- Date-based performance

---

## Category Axis

Use string categories for X-axis when working with named categories or labels.

### Example with Category X-Axis

```dart
class ChartData {
  ChartData({required this.xval, required this.yval});
  final String xval;
  final double yval;
}

final List<ChartData> data = [
  ChartData(xval: 'Robert', yval: 60),
  ChartData(xval: 'Andrew', yval: 65),
  ChartData(xval: 'Suyama', yval: 70),
  ChartData(xval: 'Michael', yval: 80),
  ChartData(xval: 'Janet', yval: 55),
  ChartData(xval: 'Davolio', yval: 90),
  ChartData(xval: 'Fuller', yval: 75),
  ChartData(xval: 'Nancy', yval: 85),
  ChartData(xval: 'Margaret', yval: 77),
  ChartData(xval: 'Steven', yval: 68),
  ChartData(xval: 'Laura', yval: 96),
  ChartData(xval: 'Elizabeth', yval: 57),
];

@override
Widget build(BuildContext context) {
  return SfSparkLineChart.custom(
    axisLineWidth: 0,
    dataCount: data.length,
    xValueMapper: (index) => data[index].xval,
    yValueMapper: (index) => data[index].yval,
  );
}
```

### Use Cases for Category Axis

- Person/employee names
- Product categories
- Region names
- Department labels
- Any named categories

---

## Axis Line Customization

Customize the horizontal axis line appearance using these properties:

### Axis Position

Control where the axis line crosses the Y-axis:

```dart
SfSparkLineChart.custom(
  axisCrossesAt: 174, 
  dataCount: data.length,
  xValueMapper: (index) => data[index].xval,
  yValueMapper: (index) => data[index].yval,
)
```

### Axis Styling

```dart
SfSparkLineChart.custom(
  axisLineWidth: 2,                      
  axisLineColor: Colors.grey,            
  axisLineDashArray: <double>[5, 3],     
  axisCrossesAt: 0,                      
  dataCount: data.length,
  xValueMapper: (index) => data[index].xval,
  yValueMapper: (index) => data[index].yval,
)
```

### Hide Axis Line

Set `axisLineWidth` to 0 to hide the axis line completely:

```dart
SfSparkLineChart(
  axisLineWidth: 0, 
  data: <double>[5, 6, 5, 7, 4, 3, 9],
)
```

---

## Complete Example with Custom Data

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class CustomAxisSparkChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Custom Axis Example')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text('Numeric X-Axis'),
            Container(
              height: 60,
              child: SfSparkLineChart.custom(
                axisLineWidth: 2,
                axisLineDashArray: <double>[5, 3],
                axisCrossesAt: 174,
                dataCount: numericData.length,
                xValueMapper: (index) => numericData[index].xval,
                yValueMapper: (index) => numericData[index].yval,
              ),
            ),
            SizedBox(height: 24),
            
            Text('Category X-Axis'),
            Container(
              height: 60,
              child: SfSparkBarChart.custom(
                axisLineWidth: 0,
                dataCount: categoryData.length,
                xValueMapper: (index) => categoryData[index].name,
                yValueMapper: (index) => categoryData[index].value,
              ),
            ),
            SizedBox(height: 24),
            
            Text('DateTime X-Axis'),
            Container(
              height: 60,
              child: SfSparkAreaChart.custom(
                axisLineWidth: 1,
                dataCount: dateTimeData.length,
                xValueMapper: (index) => dateTimeData[index].date,
                yValueMapper: (index) => dateTimeData[index].value,
              ),
            ),
          ],
        ),
      ),
    );
  }

  final List<NumericData> numericData = [
    NumericData(xval: 1, yval: 190),
    NumericData(xval: 2, yval: 165),
    NumericData(xval: 3, yval: 158),
    NumericData(xval: 4, yval: 175),
    NumericData(xval: 5, yval: 200),
    NumericData(xval: 6, yval: 180),
    NumericData(xval: 7, yval: 210),
  ];

  final List<CategoryData> categoryData = [
    CategoryData(name: 'Jan', value: 60),
    CategoryData(name: 'Feb', value: 65),
    CategoryData(name: 'Mar', value: 70),
    CategoryData(name: 'Apr', value: 80),
    CategoryData(name: 'May', value: 55),
  ];

  final List<DateTimeData> dateTimeData = [
    DateTimeData(date: DateTime(2024, 1, 1), value: 4),
    DateTimeData(date: DateTime(2024, 1, 2), value: 4.5),
    DateTimeData(date: DateTime(2024, 1, 3), value: 8),
    DateTimeData(date: DateTime(2024, 1, 4), value: 7),
    DateTimeData(date: DateTime(2024, 1, 5), value: 6),
  ];
}

class NumericData {
  NumericData({required this.xval, required this.yval});
  final double xval;
  final double yval;
}

class CategoryData {
  CategoryData({required this.name, required this.value});
  final String name;
  final double value;
}

class DateTimeData {
  DateTimeData({required this.date, required this.value});
  final DateTime date;
  final double value;
}
```

---

## Axis Properties Summary

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `axisCrossesAt` | double | Y-axis value where axis line crosses | 0 |
| `axisLineWidth` | double | Axis line thickness (0 to hide) | 1 |
| `axisLineColor` | Color | Axis line color | Theme dependent |
| `axisLineDashArray` | List<double> | Dash pattern for axis line | null (solid) |

## Next Steps

- **Data Binding**: Learn advanced data binding patterns
- **Customization**: Style charts with colors and borders
- **Markers**: Add markers to highlight data points
- **Trackball**: Enable interactive tooltips
