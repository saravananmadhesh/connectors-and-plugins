# Legend and Chart Title

## Table of Contents
- [Chart Title](#chart-title)
- [Enable Legend](#enable-legend)
- [Customize Legend Appearance](#customize-legend-appearance)
- [Legend Title](#legend-title)
- [Toggle Series Visibility](#toggle-series-visibility)
- [Legend Overflow](#legend-overflow)
- [Legend Position and Orientation](#legend-position-and-orientation)
- [Floating Legend](#floating-legend)
- [Legend Item Template](#legend-item-template)

---

## Chart Title

```dart
SfCircularChart(
  title: ChartTitle(
    text: 'Half Yearly Sales Analysis',
    textStyle: TextStyle(
      color: Colors.black,
      fontSize: 16,
      fontWeight: FontWeight.bold,
      fontStyle: FontStyle.italic,
    ),
    alignment: ChartAlignment.center,  // near, center (default), far
  ),
  series: <CircularSeries>[...],
)
```

---

## Enable Legend

```dart
SfCircularChart(
  legend: Legend(isVisible: true),
  series: <CircularSeries>[
    PieSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      // For circular series, legend items use xValueMapper values by default.
      // Use `name` to set a series-level legend label instead.
      name: 'Sales 2024',
    ),
  ],
)
```

> For circular charts, each data point gets its own legend item (labeled by `xValueMapper`). The `name` property sets a series-level label but is less common for circular series.

---

## Customize Legend Appearance

```dart
SfCircularChart(
  legend: Legend(
    isVisible: true,
    borderColor: Colors.black,
    borderWidth: 2,
    backgroundColor: Colors.white,
    opacity: 1.0,
    padding: 5,
    iconHeight: 12,
    iconWidth: 12,
    iconBorderColor: Colors.grey,
    itemPadding: 10,
    textStyle: TextStyle(
      color: Colors.black,
      fontSize: 12,
    ),
  ),
  ...
)
```

---

## Legend Title

```dart
SfCircularChart(
  legend: Legend(
    isVisible: true,
    title: LegendTitle(
      text: 'Countries',
      textStyle: TextStyle(
        color: Colors.red,
        fontSize: 15,
        fontStyle: FontStyle.italic,
        fontWeight: FontWeight.w900,
      ),
    ),
    alignment: ChartAlignment.center,  // title alignment: near, center, far
  ),
  ...
)
```

---

## Toggle Series Visibility

Tap a legend item to hide/show its corresponding slice:

```dart
SfCircularChart(
  legend: Legend(
    isVisible: true,
    toggleSeriesVisibility: true,  // default is true
  ),
  ...
)
```

Set to `false` to make legend items non-interactive.

---

## Legend Overflow

When legend items exceed the available space:

```dart
SfCircularChart(
  legend: Legend(
    isVisible: true,
    overflowMode: LegendItemOverflowMode.wrap,    // wrap to next row
    // overflowMode: LegendItemOverflowMode.scroll, // scrollable (default)
  ),
  ...
)
```

---

## Legend Position and Orientation

```dart
SfCircularChart(
  legend: Legend(
    isVisible: true,
    position: LegendPosition.bottom,   // auto (default), top, bottom, left, right
    orientation: LegendItemOrientation.horizontal,
    // auto (default), horizontal, vertical
  ),
  ...
)
```

> `LegendPosition.auto` places the legend at the right when the chart is wider than tall, otherwise at the bottom.

---

## Floating Legend

Place the legend at a specific offset relative to its position. The legend overlays the chart plot area rather than taking its own space:

```dart
SfCircularChart(
  legend: Legend(
    isVisible: true,
    position: LegendPosition.top,
    offset: Offset(20, 40),  // shift 20px right, 40px down from top-left
  ),
  ...
)
```

---

## Legend Item Template

Replace default legend items with custom widgets using `legendItemBuilder`:

```dart
SfCircularChart(
  legend: Legend(
    isVisible: true,
    legendItemBuilder: (
      String name,
      dynamic series,
      dynamic point,
      int index,
    ) {
      return Row(
        children: [
          Container(
            width: 12,
            height: 12,
            color: point.color,
          ),
          SizedBox(width: 4),
          Text('${point.x}: ${point.y}'),
        ],
      );
    },
  ),
  ...
)
```

- `name` — series name
- `point` — the data point for this legend item (has `.x`, `.y`, `.color`)
- `index` — zero-based index of the legend item
