# Chart Types: Pie, Doughnut, and Radial Bar

## Table of Contents
- [Choosing a Chart Type](#choosing-a-chart-type)
- [PieSeries](#pieseries)
- [DoughnutSeries](#doughnutseries)
- [RadialBarSeries](#radial-barseries)

---

## Choosing a Chart Type

| Goal | Use |
|---|---|
| Show part-to-whole proportions | `PieSeries` |
| Same as pie but with a center hole (optionally with center text/widget) | `DoughnutSeries` |
| Compare multiple categories using circular arcs (like a progress ring) | `RadialBarSeries` |

---

## PieSeries

### Basic Usage

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  pointColorMapper: (ChartData d, _) => d.color,
)
```

### Change Pie Size

`radius` controls the outer diameter relative to the plot area. Default is `'80%'`.

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  radius: '50%', 
)
```

### Explode a Segment

Exploding pops a slice outward to highlight it. Use `explodeIndex` to pre-explode on load, or `explode: true` to allow tap-to-explode:

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  explode: true,
  explodeIndex: 1,                             
  explodeOffset: '10%',                        
  explodeGesture: ActivationMode.singleTap,    
)
```

Explode all slices at once:

```dart
PieSeries<ChartData, String>(
  explode: true,
  explodeAll: true,
  ...
)
```

### Angle — Semi-Pie / Quarter-Pie

Render only part of the circle using `startAngle` and `endAngle`:

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  startAngle: 270,   // starts at top
  endAngle: 90,      // ends at top → semi-circle
)
```

### Group Small Slices

Merge tiny slices into an "Others" segment to reduce clutter:

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  groupMode: CircularChartGroupMode.point,  // group by count of points
  groupTo: 2,                               // keep only top 2, rest → Others
)
```

- `CircularChartGroupMode.point` — groups based on number of data points
- `CircularChartGroupMode.value` — groups based on y-value threshold

### Per-Slice Radius

Map a different radius string per data point using `pointRadiusMapper`:

```dart
class ChartData {
  ChartData(this.x, this.y, this.size);
  final String x;
  final double y;
  final String size;  // e.g. '70%', '60%'
}

PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  pointRadiusMapper: (d, _) => d.size,
)
```

---

## DoughnutSeries

Doughnut works like pie but with a hollow center, controlled by `innerRadius`.

### Basic Usage

```dart
DoughnutSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  pointColorMapper: (ChartData d, _) => d.color,
)
```

### Inner Radius

Controls the size of the center hole. Default is `'40%'`. Range: `'0%'` to `'100%'`.

```dart
DoughnutSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  innerRadius: '70%',  // larger hole
)
```

### Rounded Corners

```dart
DoughnutSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  cornerStyle: CornerStyle.bothCurve,  // rounded on both ends of each segment
)
```

Options: `CornerStyle.bothFlat` (default), `CornerStyle.bothCurve`, `CornerStyle.startCurve`, `CornerStyle.endCurve`.

### Center Elevation (Doughnut with Center Widget)

Use `annotations` on `SfCircularChart` to place a widget in the center:

```dart
SfCircularChart(
  annotations: <CircularChartAnnotation>[
    // Elevated circle background
    CircularChartAnnotation(
      widget: PhysicalModel(
        shape: BoxShape.circle,
        elevation: 10,
        shadowColor: Colors.black,
        color: const Color.fromRGBO(230, 230, 230, 1),
        child: Container(),
      ),
    ),
    // Center text
    CircularChartAnnotation(
      widget: Text(
        '62%',
        style: TextStyle(
          color: Color.fromRGBO(0, 0, 0, 0.5),
          fontSize: 25,
        ),
      ),
    ),
  ],
  series: <CircularSeries>[
    DoughnutSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      radius: '50%',
    ),
  ],
)
```

### Angle, Grouping, and Explode

`DoughnutSeries` supports the same `startAngle`/`endAngle`, `groupMode`/`groupTo`, `explode`/`explodeIndex`/`explodeAll` properties as `PieSeries`.

---

## RadialBarSeries

Radial bar charts compare multiple categories, each rendered as a separate circular arc — great for showing progress or scores.

### Basic Usage

```dart
RadialBarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
)
```

### Set Maximum Value

`maximumValue` defines the full-arc span for each bar. Without it, each arc scales to its own max.

```dart
RadialBarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  maximumValue: 100,  // each bar fills from 0 to 100%
)
```

### Inner Radius and Outer Radius

```dart
RadialBarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  radius: '100%',     // outer size
  innerRadius: '40%', // size of center hole
)
```

### Rounded Corners

```dart
RadialBarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  cornerStyle: CornerStyle.bothCurve,
)
```

### Track Customization

The track is the unfilled background arc behind each bar. Customize it to show remaining progress:

```dart
RadialBarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  useSeriesColor: true,     // track tinted with bar color
  trackOpacity: 0.3,        // semi-transparent track
  trackColor: Colors.grey,  // explicit track color (overrides useSeriesColor)
  trackBorderColor: Colors.black,
  trackBorderWidth: 1,
)
```

### Overfilled Radial Bar

When a data value exceeds `maximumValue`, the bar "overflows" as a visual indicator:

```dart
RadialBarSeries<ChartData, String>(
  maximumValue: 6000,
  radius: '100%',
  gap: '3%',
  dataSource: chartData,
  cornerStyle: CornerStyle.bothCurve,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  pointColorMapper: (d, _) => d.color,
)
```

### Spacing Between Bars

```dart
RadialBarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  gap: '5%',  // default is 1%
)
```
