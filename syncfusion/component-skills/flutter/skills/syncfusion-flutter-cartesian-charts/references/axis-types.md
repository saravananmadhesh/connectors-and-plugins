# Axis Types in SfCartesianChart

SfCartesianChart has two axes: `primaryXAxis` (horizontal) and `primaryYAxis` (vertical). The vertical axis always uses numeric scale. The horizontal axis can be one of five types.

---

## Numeric Axis

Plots continuous numerical data. Default axis type for both X and Y.

```dart
SfCartesianChart(
  primaryXAxis: NumericAxis(),
  primaryYAxis: NumericAxis(),
  series: <CartesianSeries>[
    ColumnSeries<ChartData, double>(
      dataSource: chartData,
      xValueMapper: (ChartData d, _) => d.x, 
      yValueMapper: (ChartData d, _) => d.y,
    ),
  ],
)
```

**Useful customizations:**
```dart
NumericAxis(
  minimum: 0,
  maximum: 100,
  interval: 20,
  numberFormat: NumberFormat.compact(),   // 1K, 1M, etc.
  isInversed: false,                      // Reverse axis direction
)
```

---

## Category Axis

For string-based or discrete categorical data (months, product names, etc.).

```dart
SfCartesianChart(
  primaryXAxis: CategoryAxis(),
  series: <CartesianSeries>[
    LineSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (ChartData d, _) => d.x,
      yValueMapper: (ChartData d, _) => d.y,
    ),
  ],
)
```

**Useful customizations:**
```dart
CategoryAxis(
  labelPlacement: LabelPlacement.onTicks,   
  arrangeByIndex: false,                    
)
```

---

## DateTime Axis

For time-series data with `DateTime` x values. Automatically scales and formats date/time labels.

```dart
SfCartesianChart(
  primaryXAxis: DateTimeAxis(),
  series: <CartesianSeries>[
    LineSeries<ChartData, DateTime>(
      dataSource: chartData,
      xValueMapper: (ChartData d, _) => d.date,
      yValueMapper: (ChartData d, _) => d.y,
    ),
  ],
)
```

**Useful customizations:**
```dart
DateTimeAxis(
  intervalType: DateTimeIntervalType.months,  
  interval: 1,
  dateFormat: DateFormat.yMMMd(),
  minimum: DateTime(2024, 1, 1),
  maximum: DateTime(2024, 12, 31),
)
```

> Import `intl` package for `DateFormat` and `NumberFormat`: `import 'package:intl/intl.dart';`

---

## DateTimeCategory Axis

A hybrid of DateTime and Category — treats date-time values as discrete categories. Useful when you have irregular date intervals (e.g., stock market trading days skip weekends) and don't want gaps.

```dart
SfCartesianChart(
  primaryXAxis: DateTimeCategoryAxis(
    intervalType: DateTimeIntervalType.days,
    interval: 1,
  ),
  series: <CartesianSeries>[
    CandleSeries<StockData, DateTime>(
      dataSource: stockData,
      xValueMapper: (StockData d, _) => d.date,
      // ...
    ),
  ],
)
```

> Use `DateTimeCategoryAxis` for financial/stock charts to avoid gaps for non-trading days.

---

## Logarithmic Axis

Use when data spans several orders of magnitude. The axis scale is logarithmic (base 10 by default).

```dart
SfCartesianChart(
  primaryYAxis: LogarithmicAxis(
    logBase: 10,
    minimum: 1,
    maximum: 10000,
  ),
)
```

---

## Choosing the Right Axis

| Data Type | X Axis | Example |
|-----------|--------|---------|
| Whole/decimal numbers | `NumericAxis` | Test scores, coordinates |
| Named categories | `CategoryAxis` | Product names, months |
| Timestamps (continuous) | `DateTimeAxis` | Sensor data, stock prices |
| Timestamps (with gaps) | `DateTimeCategoryAxis` | Trading days (no weekends) |
| Wide value range (orders of magnitude) | `LogarithmicAxis` | Population, scientific data |

---

## Secondary Axis

Add a second Y axis (e.g., to overlay two series with different scales):

```dart
SfCartesianChart(
  axes: <ChartAxis>[
    NumericAxis(
      name: 'secondaryYAxis',
      opposedPosition: true,
    ),
  ],
  series: <CartesianSeries>[
    ColumnSeries<ChartData, String>(
      dataSource: data,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y1,
    ),
    LineSeries<ChartData, String>(
      dataSource: data,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y2,
      yAxisName: 'secondaryYAxis',   // Binds to second axis
    ),
  ],
)
```
