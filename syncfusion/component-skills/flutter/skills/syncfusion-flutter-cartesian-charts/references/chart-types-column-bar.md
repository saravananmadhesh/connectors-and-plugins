# Column, Bar & Other Cartesian Chart Types

## Table of Contents
- [Column Chart](#column-chart)
- [Bar Chart](#bar-chart)
- [Range Column Chart](#range-column-chart)
- [Bubble Chart](#bubble-chart)
- [Scatter Chart](#scatter-chart)
- [Histogram Chart](#histogram-chart)
- [Waterfall Chart](#waterfall-chart)
- [Error Bar Chart](#error-bar-chart)
- [Box and Whisker Chart](#box-and-whisker-chart)

---

## Column Chart

Vertical bars comparing values across categories. The most common chart for comparisons.

```dart
ColumnSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  name: 'Sales',
  color: Colors.blue,
  borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
  dataLabelSettings: const DataLabelSettings(isVisible: true),
)
```

**Key properties:**
- `spacing` — gap between column groups (0.0–1.0)
- `width` — column width ratio (0.0–1.0)
- `borderRadius` — round the column corners

---

## Bar Chart

Horizontal version of the column chart. Use when category labels are long or when comparing ranked items.

```dart
BarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  name: 'Revenue',
)
```

> Tip: For bar charts, `primaryXAxis` is the vertical axis and `primaryYAxis` is horizontal — axis label configurations swap accordingly.

---

## Range Column Chart

Each column spans between a `low` and `high` value — useful for showing ranges per category (e.g., min/max temperatures per month).

```dart
class RangeData {
  RangeData(this.x, this.high, this.low);
  final String x;
  final double high;
  final double low;
}

RangeColumnSeries<RangeData, String>(
  dataSource: rangeData,
  xValueMapper: (RangeData d, _) => d.x,
  highValueMapper: (RangeData d, _) => d.high,
  lowValueMapper: (RangeData d, _) => d.low,
  borderRadius: const BorderRadius.vertical(
    top: Radius.circular(4),
    bottom: Radius.circular(4),
  ),
)
```

---

## Bubble Chart

Plots data as circles where each point has X, Y, and size (bubble radius). Good for three-dimensional data comparison.

```dart
class BubbleData {
  BubbleData(this.x, this.y, this.size);
  final double x;
  final double y;
  final double size;
}

BubbleSeries<BubbleData, double>(
  dataSource: bubbleData,
  xValueMapper: (BubbleData d, _) => d.x,
  yValueMapper: (BubbleData d, _) => d.y,
  sizeValueMapper: (BubbleData d, _) => d.size,
  minimumRadius: 4,
  maximumRadius: 20,
)
```

---

## Scatter Chart

Plots individual data points without connecting lines. Use for showing distribution or correlation between two variables.

```dart
ScatterSeries<ChartData, double>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y,
  markerSettings: const MarkerSettings(
    isVisible: true,
    shape: DataMarkerType.circle,
    width: 8,
    height: 8,
  ),
)
```

---

## Histogram Chart

Displays the frequency distribution of numerical data across bins. Unlike a column chart, it does not require predefined category labels.

```dart
HistogramSeries<ChartData, double>(
  dataSource: rawData,
  yValueMapper: (ChartData d, _) => d.value,  
  binInterval: 10,     
  showNormalDistributionCurve: true,
  curveColor: Colors.red,
  curveWidth: 2,
)
```

> `HistogramSeries` only needs `yValueMapper` — it auto-calculates bins from the raw values.

---

## Waterfall Chart

Shows running totals by depicting how positive and negative changes accumulate. Commonly used for financial statements (P&L, cash flow).

```dart
class WaterfallData {
  WaterfallData(this.x, this.y, {this.isTotal = false, this.isIntermediateSum = false});
  final String x;
  final double y;
  final bool isTotal;
  final bool isIntermediateSum;
}

WaterfallSeries<WaterfallData, String>(
  dataSource: waterfallData,
  xValueMapper: (WaterfallData d, _) => d.x,
  yValueMapper: (WaterfallData d, _) => d.y,
  isTotalMapper: (WaterfallData d, _) => d.isTotal,
  isIntermediateSumMapper: (WaterfallData d, _) => d.isIntermediateSum,
  positivePointsColor: Colors.green,
  negativePointsColor: Colors.red,
  totalPointsColor: Colors.blue,
  connectorLineSettings: const WaterfallConnectorLineSettings(
    color: Colors.grey,
    width: 1.5,
  ),
)
```

---

## Error Bar Chart

Adds error bars (whiskers) to a series to represent data variability or uncertainty.

```dart
class ErrorData {
  ErrorData(this.x, this.y);
  final String x;
  final double y;
}

ErrorBarSeries<ErrorData, String>(
  dataSource: errorData,
  xValueMapper: (ErrorData d, _) => d.x,
  yValueMapper: (ErrorData d, _) => d.y,
  type: ErrorBarType.fixedValue,
  verticalErrorValue: 3.0,
  horizontalErrorValue: 1.0,
  width: 3,
  color: Colors.red,
)
```

---

## Box and Whisker Chart

Displays statistical summaries (minimum, first quartile, median, third quartile, maximum) for grouped data.

```dart
class BoxData {
  BoxData(this.x, this.samples);
  final String x;
  final List<num> samples;
}

BoxAndWhiskerSeries<BoxData, String>(
  dataSource: boxData,
  xValueMapper: (BoxData d, _) => d.x,
  yValueMapper: (BoxData d, _) => d.samples,
  boxPlotMode: BoxPlotMode.exclusive, 
  showMean: true,
  meanColor: Colors.red,
)
```

> Pass a `List<num>` as the y value — `SfCartesianChart` automatically computes the statistical quartiles.
