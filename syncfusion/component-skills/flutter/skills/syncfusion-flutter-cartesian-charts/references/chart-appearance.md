# Chart Appearance & Multiple Charts

Covers background, plot area styling, color palettes, themes, rendering multiple charts, and on-demand data loading.

---

## Background Color

```dart
SfCartesianChart(
  backgroundColor: Colors.white,
)
```

---

## Plot Area Customization

The plot area is the region inside the axes where the series is rendered:

```dart
SfCartesianChart(
  plotAreaBackgroundColor: const Color(0xFFF5F5F5),
  plotAreaBackgroundImage: const AssetImage('assets/plot_bg.png'),
  plotAreaBorderColor: Colors.grey,
  plotAreaBorderWidth: 1,
)
```

---

## Border and Margin

```dart
SfCartesianChart(
  borderColor: Colors.grey,
  borderWidth: 1,
  margin: const EdgeInsets.all(12),
)
```

---
## Theme Integration

Apply a built-in Syncfusion chart theme:

```dart
SfCartesianChart(
)

SfChartTheme(
  data: SfChartThemeData(
    backgroundColor: Colors.black,
    axisLabelColor: Colors.white70,
    titleTextColor: Colors.white,
    legendTextColor: Colors.white70,
    plotAreaBackgroundColor: Colors.grey[900],
    majorGridLineColor: Colors.grey[700],
  ),
  child: SfCartesianChart(
  ),
)
```

> Import: `import 'package:syncfusion_flutter_core/theme.dart';`

---

## Chart Title

```dart
SfCartesianChart(
  title: ChartTitle(
    text: 'Monthly Revenue 2024',
    alignment: ChartAlignment.center,
    textStyle: const TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.bold,
      color: Colors.black87,
    ),
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
    borderWidth: 0,
  ),
)
```

---

## Multiple Charts on One Screen

Use a `Column` or `GridView` to show multiple charts:

```dart
Column(
  children: [
    SizedBox(
      height: 200,
      child: SfCartesianChart(
        title: ChartTitle(text: 'Revenue'),
        series: <CartesianSeries>[/* ... */],
      ),
    ),
    SizedBox(
      height: 200,
      child: SfCartesianChart(
        title: ChartTitle(text: 'Expenses'),
        series: <CartesianSeries>[/* ... */],
      ),
    ),
  ],
)
```

> Each `SfCartesianChart` instance is independent with its own `ZoomPanBehavior`, `TooltipBehavior`, etc.

---

## Linked Charts (Synchronized Zoom/Pan)

To synchronize scrolling or zooming across multiple charts, use the same `onZooming`/`onZoomEnd` callbacks to update the other chart's zoom state manually. There is no built-in sync API — implement via shared state and `ZoomPanBehavior.zoomToSingleAxis()`.

---

## On-Demand / Lazy Data Loading

Load additional data as the user pans to the edges of the chart:

```dart
SfCartesianChart(
  primaryXAxis: DateTimeAxis(
    onActualRangeChanged: (ActualRangeChangedArgs args) {
      _loadMoreDataIfNeeded(args.visibleMin, args.visibleMax);
    },
  ),
  loadMoreIndicatorBuilder: (BuildContext context, ChartSwipeDirection direction) {
    return const CircularProgressIndicator();
  },
  onPlotAreaSwipe: (ChartSwipeDirection direction) {
    if (direction == ChartSwipeDirection.end) {
      _loadMoreData();
    }
  },
)
```

---

## Rendering Delay Optimization

For large datasets, defer rendering to avoid blocking the UI:

```dart
SfCartesianChart(
  series: <CartesianSeries>[
    FastLineSeries<ChartData, double>( 
      dataSource: largeDataSet,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      animationDuration: 0, 
    ),
  ],
)
```
