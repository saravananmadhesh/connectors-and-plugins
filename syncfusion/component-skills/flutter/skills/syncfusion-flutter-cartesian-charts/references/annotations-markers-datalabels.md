# Annotations, Markers & Data Labels

## Table of Contents
- [Chart Annotations](#chart-annotations)
- [Annotation Positioning](#annotation-positioning)
- [Widget Annotations](#widget-annotations)
- [MarkerSettings](#markersettings)
- [DataLabelSettings](#datalabelsettings)
- [Data Label Position and Alignment](#data-label-position-and-alignment)
- [Custom Data Label Template](#custom-data-label-template)
- [Connector Lines](#connector-lines)

---

## Chart Annotations

Annotations overlay custom text or widgets on the chart area at specific data coordinates or pixel positions. Use them to call out important values, add reference lines, or annotate events.

```dart
SfCartesianChart(
  primaryXAxis: CategoryAxis(),
  annotations: <CartesianChartAnnotation>[
    CartesianChartAnnotation(
      widget: const Text(
        'Peak',
        style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
      ),
      coordinateUnit: CoordinateUnit.point,
      x: 'Mar',    
      y: 40,
    ),
  ],
)
```

---

## Annotation Positioning

**CoordinateUnit options:**

- `CoordinateUnit.point` — position relative to axis data values (most common)
- `CoordinateUnit.logicalPixel` — position in pixels from the chart origin
- `CoordinateUnit.percentage` — position as a percentage of the chart area (0–100)

```dart
CartesianChartAnnotation(
  widget: const Text('Midpoint'),
  coordinateUnit: CoordinateUnit.percentage,
  x: 50,    
  y: 50,    
)

CartesianChartAnnotation(
  widget: const Icon(Icons.star, color: Colors.amber),
  coordinateUnit: CoordinateUnit.logicalPixel,
  x: 120,
  y: 80,
)
```

**Vertical and horizontal alignment:**
```dart
CartesianChartAnnotation(
  widget: const Text('Note'),
  coordinateUnit: CoordinateUnit.point,
  x: 'Feb',
  y: 30,
  horizontalAlignment: ChartAlignment.near,
  verticalAlignment: ChartAlignment.near,
)
```

---

## Widget Annotations

Any Flutter widget can be used as an annotation:

```dart
CartesianChartAnnotation(
  widget: Container(
    padding: const EdgeInsets.all(6),
    decoration: BoxDecoration(
      color: Colors.amber.withOpacity(0.8),
      borderRadius: BorderRadius.circular(4),
    ),
    child: const Text('Q3 Dip', style: TextStyle(fontSize: 12)),
  ),
  coordinateUnit: CoordinateUnit.point,
  x: 'Jul',
  y: 15,
)
```

---

## MarkerSettings

Markers are shapes rendered at each data point on a series. Enable them to make individual data points visually distinct.

```dart
LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  markerSettings: const MarkerSettings(
    isVisible: true,
    shape: DataMarkerType.circle,
    width: 8,
    height: 8,
    color: Colors.white,
    borderColor: Colors.blue,
    borderWidth: 2,
  ),
)
```

---

## DataLabelSettings

Data labels display value text near each data point.

```dart
LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  dataLabelSettings: const DataLabelSettings(
    isVisible: true,
    color: Colors.white,
    textStyle: TextStyle(fontSize: 11, color: Colors.black87),
    margin: EdgeInsets.all(2),
    borderRadius: 4,
    borderColor: Colors.grey,
    borderWidth: 0.5,
    useSeriesColor: true,
  ),
)
```

---

## Data Label Position and Alignment

```dart
DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  alignment: ChartAlignment.center,
  offset: const Offset(0, -5),
)
```

---

## Custom Data Label Template

Replace text labels with any Flutter widget:

```dart
DataLabelSettings(
  isVisible: true,
  builder: (dynamic data, dynamic point, dynamic series, int pointIndex, int seriesIndex) {
    final ChartData d = data as ChartData;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
      color: Colors.blue,
      child: Text(
        '\$${d.y}',
        style: const TextStyle(color: Colors.white, fontSize: 10),
      ),
    );
  },
)
```

---

## Connector Lines

For column/bar charts, draw a line connecting the data label to the data point:

```dart
DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  connectorLineSettings: const ConnectorLineSettings(
    type: ConnectorType.curve,
    color: Colors.grey,
    width: 1,
    length: '10%',
  ),
)
```
