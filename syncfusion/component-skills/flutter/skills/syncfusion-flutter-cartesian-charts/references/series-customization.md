# Series Customization

Covers visual appearance, animation, gradient fills, per-point colors, and handling of empty or missing data points.

---

## Color and Border

```dart
LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  color: Colors.indigo,
  width: 2.5,              
  opacity: 0.8,            
  borderColor: Colors.black,  
  borderWidth: 1,
)
```

---

## Gradient Fill

Apply a gradient to area and column/bar series:

```dart
AreaSeries<ChartData, DateTime>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  gradient: LinearGradient(
    colors: [
      Colors.blue.withOpacity(0.8),
      Colors.blue.withOpacity(0.1),
    ],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  ),
)
```

For stroke/border gradient:
```dart
AreaSeries<ChartData, DateTime>(
  borderGradient: const LinearGradient(
    colors: [Colors.red, Colors.orange],
  ),
  borderWidth: 3,
)
```

---

## Dash Array (Dashed Lines)

```dart
LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  dashArray: const <double>[8, 4],
)
```

---

## Per-Point Color Mapper

Assign a different color to each data point dynamically:

```dart
class ChartData {
  ChartData(this.x, this.y, this.color);
  final String x;
  final double y;
  final Color color;
}

ColumnSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  pointColorMapper: (ChartData d, _) => d.color,
)
```

---

## Color Palette

Set a global color palette that cycles across all series (or across points for single-series charts):

```dart
SfCartesianChart(
  palette: const <Color>[
    Color(0xFF2196F3),
    Color(0xFF4CAF50),
    Color(0xFFF44336),
    Color(0xFFFF9800),
    Color(0xFF9C27B0),
  ],
)
```

---

## Animation

Series animate on initial render by default (`animationDuration: 1500ms`):

```dart
ColumnSeries<ChartData, String>(
  animationDuration: 800,    
  animationDelay: 300,
)
```

**Re-trigger animation programmatically:**
```dart
late ChartSeriesController _controller;

onRendererCreated: (ChartSeriesController c) => _controller = c,

_controller.animate();
```

---

## Empty Point Settings

Control how `null` y-values are rendered:

```dart
LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  emptyPointSettings: EmptyPointSettings(
    mode: EmptyPointMode.gap,
    color: Colors.grey,
    borderColor: Colors.grey,
    borderWidth: 1,
  ),
)
```

**Empty point modes:**
- `gap` — leaves a gap (default for line), connecting line breaks
- `zero` — treats null as 0
- `drop` — drops the point below the axis
- `average` — interpolates using neighboring values

---

## Series Visibility Toggle

Show/hide a series at runtime:

```dart
bool _isVisible = true;

LineSeries<ChartData, String>(
  isVisible: _isVisible,
)
```

---

## Sorting Data

Sort series data by x or y values:

```dart
LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  sortingOrder: SortingOrder.ascending,    
  sortFieldValueMapper: (ChartData d, _) => d.y,  
)
```

---

## Width and Spacing (Column / Bar)

```dart
ColumnSeries<ChartData, String>(
  width: 0.7,   
  spacing: 0.1,
)
```