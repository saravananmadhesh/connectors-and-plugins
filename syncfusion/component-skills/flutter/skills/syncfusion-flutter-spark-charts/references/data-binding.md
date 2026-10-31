# Data Binding in Flutter Spark Charts

This guide covers different approaches to binding data to Syncfusion Flutter Spark Charts, from simple numeric lists to complex custom data sources.

## Simple Data Binding

The simplest way to bind data is using a `List<double>` with the `data` property:

```dart
SfSparkLineChart(
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8],
)
```

In this approach:
- X-axis values are implicit indices (0, 1, 2, 3...)
- Y-axis values come from the list
- No custom data mapping needed

---

## Custom Data Source Binding

For complex data sources or custom X-axis values, use the `.custom()` constructor.

### Basic Custom Binding Pattern

```dart
// 1. Define data model
class ChartData {
  ChartData({required this.x, required this.y});
  final double x;
  final double y;
}

// 2. Create data list
final List<ChartData> chartData = [
  ChartData(x: 1, y: 190),
  ChartData(x: 2, y: 165),
  ChartData(x: 3, y: 158),
];

// 3. Bind to chart
SfSparkLineChart.custom(
  dataCount: chartData.length,
  xValueMapper: (index) => chartData[index].x,
  yValueMapper: (index) => chartData[index].y,
)
```

### Required Parameters

- `dataCount` - Total number of data points
- `xValueMapper` - Function that returns X value for given index
- `yValueMapper` - Function that returns Y value for given index

---

## Numeric X-Axis Data

Use numeric values for the X-axis when working with sequential numbers, IDs, or years.

```dart
class SalesData {
  SalesData({required this.year, required this.sales});
  final int year;
  final double sales;
}

final List<SalesData> data = [
  SalesData(year: 2020, sales: 1500),
  SalesData(year: 2021, sales: 1800),
  SalesData(year: 2022, sales: 2100),
  SalesData(year: 2023, sales: 1950),
  SalesData(year: 2024, sales: 2300),
];

SfSparkBarChart.custom(
  dataCount: data.length,
  xValueMapper: (index) => data[index].year.toDouble(),
  yValueMapper: (index) => data[index].sales,
)
```

---

## Date-Time X-Axis Data

Use DateTime objects for time-series data.

```dart
class TemperatureData {
  TemperatureData({required this.date, required this.temperature});
  final DateTime date;
  final double temperature;
}

final List<TemperatureData> data = [
  TemperatureData(
    date: DateTime(2024, 1, 1),
    temperature: 15.5,
  ),
  TemperatureData(
    date: DateTime(2024, 1, 2),
    temperature: 16.2,
  ),
  TemperatureData(
    date: DateTime(2024, 1, 3),
    temperature: 14.8,
  ),
  TemperatureData(
    date: DateTime(2024, 1, 4),
    temperature: 15.9,
  ),
];

SfSparkAreaChart.custom(
  dataCount: data.length,
  xValueMapper: (index) => data[index].date,
  yValueMapper: (index) => data[index].temperature,
)
```

---

## Category X-Axis Data

Use string categories for named data points.

```dart
class EmployeePerformance {
  EmployeePerformance({required this.name, required this.score});
  final String name;
  final double score;
}

final List<EmployeePerformance> data = [
  EmployeePerformance(name: 'Robert', score: 85),
  EmployeePerformance(name: 'Andrew', score: 92),
  EmployeePerformance(name: 'Suyama', score: 78),
  EmployeePerformance(name: 'Michael', score: 95),
  EmployeePerformance(name: 'Janet', score: 88),
];

SfSparkLineChart.custom(
  dataCount: data.length,
  xValueMapper: (index) => data[index].name,
  yValueMapper: (index) => data[index].score,
)
```

---

## Dynamic Data Updates

Update chart data by rebuilding the widget with new data using `setState`:

```dart
class DynamicSparkChart extends StatefulWidget {
  @override
  _DynamicSparkChartState createState() => _DynamicSparkChartState();
}

class _DynamicSparkChartState extends State<DynamicSparkChart> {
  List<double> chartData = [5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8];

  void _addDataPoint() {
    setState(() {
      chartData.add((chartData.last + 2) % 15);
      if (chartData.length > 20) {
        chartData.removeAt(0); // Keep only last 20 points
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 100,
          child: SfSparkLineChart(
            data: chartData,
            axisLineWidth: 0,
          ),
        ),
        ElevatedButton(
          onPressed: _addDataPoint,
          child: Text('Add Data Point'),
        ),
      ],
    );
  }
}
```

---

## Loading Data from API

Fetch and display data from an API:

```dart
class ApiSparkChart extends StatefulWidget {
  @override
  _ApiSparkChartState createState() => _ApiSparkChartState();
}

class _ApiSparkChartState extends State<ApiSparkChart> {
  List<double> data = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    // Simulate API call
    await Future.delayed(Duration(seconds: 2));
    
    setState(() {
      data = [10, 15, 12, 18, 14, 20, 16, 22, 19, 25];
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Center(child: CircularProgressIndicator());
    }

    return SfSparkLineChart(
      data: data,
      axisLineWidth: 0,
      color: Colors.blue,
    );
  }
}
```

---

## Complex Data Model

Handle complex data structures with multiple properties:

```dart
class StockPrice {
  StockPrice({
    required this.date,
    required this.open,
    required this.close,
    required this.high,
    required this.low,
  });
  
  final DateTime date;
  final double open;
  final double close;
  final double high;
  final double low;
}

final List<StockPrice> stockData = [
  StockPrice(
    date: DateTime(2024, 1, 1),
    open: 150.0,
    close: 155.0,
    high: 158.0,
    low: 149.0,
  ),
  // More data...
];

// Display closing prices
SfSparkLineChart.custom(
  dataCount: stockData.length,
  xValueMapper: (index) => stockData[index].date,
  yValueMapper: (index) => stockData[index].close,
)

// Or display high-low spread
SfSparkBarChart.custom(
  dataCount: stockData.length,
  xValueMapper: (index) => stockData[index].date,
  yValueMapper: (index) => 
      stockData[index].high - stockData[index].low,
)
```

---

## Null and Empty Data Handling

Handle null or empty data gracefully:

```dart
class SafeSparkChart extends StatelessWidget {
  final List<double>? data;

  const SafeSparkChart({this.data});

  @override
  Widget build(BuildContext context) {
    // Handle null or empty data
    if (data == null || data!.isEmpty) {
      return Container(
        height: 60,
        alignment: Alignment.center,
        child: Text('No data available'),
      );
    }

    return SfSparkLineChart(
      data: data!,
      axisLineWidth: 0,
    );
  }
}
```

---

## Data Filtering and Transformation

Transform data before binding:

```dart
class FilteredSparkChart extends StatelessWidget {
  final List<double> rawData;

  const FilteredSparkChart({required this.rawData});

  List<double> get filteredData {
    // Remove outliers (values > 100)
    return rawData.where((value) => value <= 100).toList();
  }

  List<double> get normalizedData {
    // Normalize to 0-100 scale
    final max = rawData.reduce((a, b) => a > b ? a : b);
    final min = rawData.reduce((a, b) => a < b ? a : b);
    return rawData.map((value) => 
      (value - min) / (max - min) * 100
    ).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Filtered Data'),
        Container(
          height: 60,
          child: SfSparkLineChart(
            data: filteredData,
            axisLineWidth: 0,
          ),
        ),
        SizedBox(height: 16),
        Text('Normalized Data'),
        Container(
          height: 60,
          child: SfSparkLineChart(
            data: normalizedData,
            axisLineWidth: 0,
          ),
        ),
      ],
    );
  }
}
```

---

## Best Practices

### 1. Use Appropriate Data Types

```dart
// ✅ Good - appropriate types
class ChartData {
  final DateTime date;
  final double value;
}

// ❌ Avoid - everything as dynamic
class ChartData {
  final dynamic date;
  final dynamic value;
}
```

### 2. Keep Data Immutable

```dart
// ✅ Good - immutable data
final List<double> data = [1, 2, 3, 4, 5];

// ❌ Avoid - mutable reference
var data = [1, 2, 3, 4, 5];
```

### 3. Handle Edge Cases

```dart
// ✅ Good - handles empty data
if (data.isEmpty) {
  return EmptyStateWidget();
}
return SfSparkLineChart(data: data);

// ❌ Avoid - no validation
return SfSparkLineChart(data: data);
```

### 4. Use Meaningful Names

```dart
// ✅ Good - clear naming
xValueMapper: (index) => salesData[index].month
yValueMapper: (index) => salesData[index].revenue

// ❌ Avoid - unclear naming
xValueMapper: (index) => data[index].x
yValueMapper: (index) => data[index].y
```

---

## Data Binding Checklist

- [ ] Choose simple or custom binding based on data complexity
- [ ] Define appropriate X-axis type (numeric, DateTime, category)
- [ ] Create data model class if using custom binding
- [ ] Implement xValueMapper and yValueMapper correctly
- [ ] Set correct dataCount value
- [ ] Handle null and empty data cases
- [ ] Test with edge cases (single point, large datasets)
- [ ] Consider performance for large datasets
- [ ] Implement proper state management for dynamic data

## Next Steps

- **Axis Types**: Learn about different axis configurations
- **Customization**: Style charts with colors and markers
- **Trackball**: Enable interactive data exploration
- **Performance**: Optimize for large datasets
