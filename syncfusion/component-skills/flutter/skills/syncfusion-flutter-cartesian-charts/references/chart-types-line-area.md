# Line, Area & Spline Chart Types

## Table of Contents
- [Line Chart](#line-chart)
- [Fast Line Chart](#fast-line-chart)
- [Spline Chart](#spline-chart)
- [Step Line Chart](#step-line-chart)
- [Area Chart](#area-chart)
- [Spline Area Chart](#spline-area-chart)
- [Step Area Chart](#step-area-chart)
- [Range Area Chart](#range-area-chart)
- [Spline Range Area Chart](#spline-range-area-chart)
- [Choosing the Right Type](#choosing-the-right-type)

---

## Line Chart

Best for showing trends over time or ordered categories.

```dart
LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  name: 'Revenue',
  width: 2,            
  color: Colors.blue,
  markerSettings: const MarkerSettings(isVisible: true),
)
```

---

## Fast Line Chart

Use `FastLineSeries` when rendering **large datasets** (thousands of points). It is optimized for performance but has fewer customization options than `LineSeries`.

```dart
FastLineSeries<ChartData, double>(
  dataSource: largeDataSet,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  color: Colors.green,
)
```

> Choose FastLineSeries over LineSeries when rendering 1,000+ data points to maintain 60fps.

---

## Spline Chart

Renders a smooth curved line through data points using cubic interpolation. Good for continuous data where sharp angles look unnatural.

```dart
SplineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  splineType: SplineType.natural,  
  cardinalSplineTension: 0.5,  
)
```

**Spline types:**
- `natural` — smooth curve, default
- `cardinal` — curve tension controlled by `cardinalSplineTension`
- `clamped` — curve clamped at endpoints
- `monotonic` — preserves data monotonicity (avoids overshooting)

---

## Step Line Chart

Connects data points using horizontal and vertical lines — useful for showing state changes or discrete steps.

```dart
StepLineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
)
```

---

## Area Chart

Fills the area between the line and the x-axis. Good for showing volume or cumulative values over time.

```dart
AreaSeries<ChartData, DateTime>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  color: Colors.blue.withOpacity(0.4),
  borderColor: Colors.blue,
  borderWidth: 2,
)
```

---

## Spline Area Chart

Smooth curved area chart — combines the visual effect of spline with the filled area of an area chart.

```dart
SplineAreaSeries<ChartData, DateTime>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  splineType: SplineType.natural,
  gradient: LinearGradient(
    colors: [Colors.blue, Colors.blue.withOpacity(0.1)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  ),
)
```

---

## Step Area Chart

Fills the stepped region between data points. Good for showing quantity changes that happen instantaneously.

```dart
StepAreaSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  color: Colors.orange.withOpacity(0.5),
)
```

---

## Range Area Chart

Shows a filled band between two Y values (`high` and `low`) for each X point. Use it to visualize ranges, confidence intervals, or temperature bands.

```dart
class RangeData {
  RangeData(this.x, this.high, this.low);
  final String x;
  final double high;
  final double low;
}

RangeAreaSeries<RangeData, String>(
  dataSource: rangeData,
  xValueMapper: (RangeData d, _) => d.x,
  highValueMapper: (RangeData d, _) => d.high,
  lowValueMapper: (RangeData d, _) => d.low,
  color: Colors.purple.withOpacity(0.3),
  borderColor: Colors.purple,
  borderWidth: 2,
)
```

---

## Spline Range Area Chart

Smooth curved version of Range Area — the boundary lines are rendered as spline curves.

```dart
SplineRangeAreaSeries<RangeData, String>(
  dataSource: rangeData,
  xValueMapper: (RangeData d, _) => d.x,
  highValueMapper: (RangeData d, _) => d.high,
  lowValueMapper: (RangeData d, _) => d.low,
  splineType: SplineType.natural,
)
```

---

## Choosing the Right Type

| Scenario | Recommended Series |
|----------|--------------------|
| Show trend over time | `LineSeries` |
| Large dataset (1000+ points) | `FastLineSeries` |
| Smooth, natural-looking trend | `SplineSeries` |
| Discrete state changes | `StepLineSeries` |
| Show volume / cumulative amount | `AreaSeries` |
| Smooth area with gradients | `SplineAreaSeries` |
| Instantaneous quantity changes | `StepAreaSeries` |
| Confidence bands / min-max range | `RangeAreaSeries` |
| Smooth confidence bands | `SplineRangeAreaSeries` |
