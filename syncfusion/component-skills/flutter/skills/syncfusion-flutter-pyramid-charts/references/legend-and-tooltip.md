# Legend and Tooltip

## Table of Contents
- [Enable Legend](#enable-legend)
- [Legend Position and Orientation](#legend-position-and-orientation)
- [Legend Overflow Behavior](#legend-overflow-behavior)
- [Legend Title](#legend-title)
- [Floating Legend](#floating-legend)
- [Legend Item Template](#legend-item-template)
- [Toggle Series Visibility](#toggle-series-visibility)
- [Enable Tooltip](#enable-tooltip)
- [Tooltip Appearance](#tooltip-appearance)
- [Tooltip Label Format](#tooltip-label-format)
- [Tooltip Position](#tooltip-position)
- [Tooltip Template](#tooltip-template)
- [Tooltip Activation Mode](#tooltip-activation-mode)

---

## Enable Legend

```dart
SfPyramidChart(
  legend: Legend(isVisible: true),
  series: PyramidSeries<ChartData, String>(
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
  ),
)
```

For `PyramidSeries`, each legend item corresponds to a data point (not a series), with labels sourced from `xValueMapper`.

---

## Legend Position and Orientation

```dart
legend: Legend(
  isVisible: true,
  position: LegendPosition.bottom,  // auto, top, bottom, left, right
  orientation: LegendItemOrientation.horizontal,  // auto, horizontal, vertical
)
```

- `LegendPosition.auto` places legend at the right when chart width > height, otherwise at the bottom
- `orientation` defaults to `auto`, which follows the position

---

## Legend Overflow Behavior

When legend items exceed available space:

```dart
legend: Legend(
  isVisible: true,
  overflowMode: LegendItemOverflowMode.wrap,   // wrap or scroll (default)
  height: '20%',    // Constrain legend height
  width: '100%',    // Constrain legend width
)
```

| Mode | Behavior |
|---|---|
| `LegendItemOverflowMode.scroll` | Scrollable legend (default) |
| `LegendItemOverflowMode.wrap` | Items wrap to multiple rows/columns |

---

## Legend Title

```dart
legend: Legend(
  isVisible: true,
  title: LegendTitle(
    text: 'Pipeline Stages',
    textStyle: TextStyle(
      color: Colors.black87,
      fontSize: 13,
      fontWeight: FontWeight.w600,
      fontStyle: FontStyle.italic,
    ),
  ),
  alignment: ChartAlignment.center,  // near, center, far
)
```

---

## Floating Legend

Place the legend at a custom offset relative to its position. The legend overlays the chart area instead of taking dedicated space:

```dart
legend: Legend(
  isVisible: true,
  position: LegendPosition.top,
  offset: Offset(20, 40),  // x, y offset from the position
)
```

---

## Legend Item Template

Customize each legend item's appearance with a Flutter widget:

```dart
legend: Legend(
  isVisible: true,
  legendItemBuilder: (String name, dynamic series, dynamic point, int index) {
    return Row(
      children: [
        Container(
          width: 12, height: 12,
          color: point.color,
        ),
        const SizedBox(width: 4),
        Text('${point.x}: ${point.y}', style: const TextStyle(fontSize: 11)),
      ],
    );
  },
)
```

---

## Toggle Series Visibility

Allow users to show/hide segments by tapping their legend item:

```dart
legend: Legend(
  isVisible: true,
  toggleSeriesVisibility: true,  // Default is true
)
```

---

## Enable Tooltip

Tooltip must be initialized in `initState` — do not create it inside `build`:

```dart
late TooltipBehavior _tooltipBehavior;

@override
void initState() {
  _tooltipBehavior = TooltipBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return SfPyramidChart(
    tooltipBehavior: _tooltipBehavior,
    series: PyramidSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (ChartData data, _) => data.x,
      yValueMapper: (ChartData data, _) => data.y,
    ),
  );
}
```

---

## Tooltip Appearance

```dart
_tooltipBehavior = TooltipBehavior(
  enable: true,
  color: Colors.blueGrey.shade800,    // Background color
  borderColor: Colors.white,          // Border stroke color
  borderWidth: 1.5,                   // Border thickness
  opacity: 0.9,                       // Transparency (0.0–1.0)
  duration: 3000,                     // Display duration in ms (default 3000)
  animationDuration: 350,             // Show/hide animation in ms
  elevation: 4,                       // Shadow elevation
  canShowMarker: true,                // Show color marker in tooltip
  header: '',                         // Custom header text (default: series name)
  shadowColor: Colors.black54,
  shouldAlwaysShow: false,            // Keep visible between taps
  textAlignment: ChartAlignment.center,
  decimalPlaces: 1,                   // Decimal places in Y value display
);
```

---

## Tooltip Label Format

Format the tooltip text using `point.x`, `point.y`, and `series.name` tokens:

```dart
_tooltipBehavior = TooltipBehavior(
  enable: true,
  format: 'point.x : point.y%',  // e.g. "Enterprise : 42%"
);
```

Other format examples:
- `'point.y units'` → `"654 units"`
- `'series.name\npoint.x: point.y'` → Two-line tooltip

---

## Tooltip Position

```dart
_tooltipBehavior = TooltipBehavior(
  enable: true,
  tooltipPosition: TooltipPosition.pointer,  // or TooltipPosition.auto (default)
);
```

- `TooltipPosition.auto` — positions tooltip to avoid chart edge clipping
- `TooltipPosition.pointer` — tooltip appears directly at the tap location

---

## Tooltip Template

Replace the default tooltip with a custom Flutter widget:

```dart
_tooltipBehavior = TooltipBehavior(
  enable: true,
  builder: (dynamic data, dynamic point, dynamic series,
      int pointIndex, int seriesIndex) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(6),
        boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 4)],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(point.x.toString(), style: const TextStyle(fontWeight: FontWeight.bold)),
          Text('Value: ${point.y}'),
        ],
      ),
    );
  },
);
```

---

## Tooltip Activation Mode

Control which touch gesture activates the tooltip:

```dart
_tooltipBehavior = TooltipBehavior(
  enable: true,
  activationMode: ActivationMode.longPress,  // singleTap (default), doubleTap, longPress, none
);
```

| Mode | Behavior |
|---|---|
| `ActivationMode.singleTap` | Tap once to show (default) |
| `ActivationMode.doubleTap` | Double-tap to show |
| `ActivationMode.longPress` | Long press to show |
| `ActivationMode.none` | Tooltip never shows |
