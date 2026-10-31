# Series Customization

Covers animation behavior and handling of null/empty data points in `PyramidSeries`.

## Table of Contents
- [Animation](#animation)
- [Animation Delay](#animation-delay)
- [Empty Points](#empty-points)
- [Empty Point Customization](#empty-point-customization)
- [Color Mapping for Data Points](#color-mapping-for-data-points)

---

## Animation

Pyramid series animates on first render by default. Control duration with `animationDuration` (milliseconds). Set to `0` to disable animation.

```dart
PyramidSeries<ChartData, String>(
  animationDuration: 1500,  
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

Disable animation entirely:

```dart
PyramidSeries<ChartData, String>(
  animationDuration: 0,  
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

---

## Animation Delay

`animationDelay` postpones when the animation starts after the widget is rendered. Useful for sequenced UI reveals or when the chart appears after other animations complete. Default is `0` (starts immediately).

```dart
PyramidSeries<ChartData, String>(
  animationDuration: 4500,  
  animationDelay: 2000,     
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

---

## Empty Points

Data points with `null` Y values are treated as empty points. By default they are skipped (gap mode). Use `EmptyPointSettings` to choose a different behavior.

| Mode | Behavior |
|---|---|
| `EmptyPointMode.gap` | Segment is skipped, leaving a visual gap (default) |
| `EmptyPointMode.zero` | Segment is rendered with Y = 0 |
| `EmptyPointMode.drop` | Segment is completely dropped from the series |
| `EmptyPointMode.average` | Segment Y is replaced with the average of adjacent values |

```dart
final List<ChartData> chartData = [
  ChartData('Enterprise', 654),
  ChartData('Mid-Market', null),  
  ChartData('SMB', 446),
  ChartData('Startup', 341),
  ChartData('Individual', 160),
];

PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  emptyPointSettings: EmptyPointSettings(
    mode: EmptyPointMode.average,  
  ),
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

> The data class must use `double?` (nullable) for Y values to allow nulls.

---

## Empty Point Customization

Style empty points differently to make them visually distinct from normal segments:

```dart
PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  emptyPointSettings: EmptyPointSettings(
    mode: EmptyPointMode.average,
    color: Colors.grey.shade300,   
    borderColor: Colors.grey,      
    borderWidth: 1.5,              
  ),
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

---

## Color Mapping for Data Points

Assign a unique color to each segment by providing a color field in your data and mapping it with `pointColorMapper`. This is the most flexible way to color segments when palette-based rotation isn't sufficient.

```dart
class ChartData {
  ChartData(this.x, this.y, this.color);
  final String x;
  final double? y;
  final Color color;
}

final List<ChartData> chartData = [
  ChartData('Rent',    1000, Colors.teal),
  ChartData('Food',    2500, Colors.lightBlue),
  ChartData('Savings', 760,  Colors.brown),
  ChartData('Tax',     1897, Colors.grey),
  ChartData('Others',  2987, Colors.blueGrey),
];

PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  pointColorMapper: (ChartData data, _) => data.color,
)
```

> `pointColorMapper` overrides both `palette` and the default automatic colors. Use it when each data point has a meaningful brand or category color.
