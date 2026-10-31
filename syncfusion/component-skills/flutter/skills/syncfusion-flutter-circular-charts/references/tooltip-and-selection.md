# Tooltip and Selection

## Table of Contents
- [Enable Tooltip](#enable-tooltip)
- [Customize Tooltip Appearance](#customize-tooltip-appearance)
- [Tooltip Label Format](#tooltip-label-format)
- [Tooltip Positioning](#tooltip-positioning)
- [Tooltip Template](#tooltip-template)
- [Activation Mode](#activation-mode)
- [Enable Selection](#enable-selection)
- [Customize Selected / Unselected Segments](#customize-selected--unselected-segments)
- [Multi-Selection](#multi-selection)
- [Toggle Selection](#toggle-selection)

---

## Enable Tooltip

`TooltipBehavior` must be initialized in `initState` (not inside `build`) to prevent recreation on each rebuild. Set `enableTooltip: true` on the series to activate it per series.

```dart
late TooltipBehavior _tooltipBehavior;

@override
void initState() {
  _tooltipBehavior = TooltipBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return SfCircularChart(
    tooltipBehavior: _tooltipBehavior,
    series: <CircularSeries>[
      PieSeries<ChartData, String>(
        enableTooltip: true,
        dataSource: chartData,
        xValueMapper: (d, _) => d.x,
        yValueMapper: (d, _) => d.y,
      ),
    ],
  );
}
```

---

## Customize Tooltip Appearance

```dart
TooltipBehavior(
  enable: true,
  color: Colors.lightBlue,
  borderColor: Colors.red,
  borderWidth: 2,
  opacity: 0.9,
  elevation: 5,
  duration: 5000,           // ms to display tooltip (default: 3000)
  animationDuration: 500,   // ms for tooltip appear animation (default: 350)
  canShowMarker: true,      // show colored marker dot (default: true)
  header: 'Sales',          // custom header text; default is series name
  shadowColor: Colors.black,
  shouldAlwaysShow: false,  // keep tooltip visible after touch ends
  decimalPlaces: 2,
  textAlignment: ChartAlignment.center,
)
```

---

## Tooltip Label Format

By default, the tooltip shows the x and y values. Format it using placeholders:

```dart
TooltipBehavior(
  enable: true,
  format: 'point.x : point.y%',
  // Available placeholders: point.x, point.y, series.name
)
```

Examples:
- `'point.y units'` → `"38 units"`
- `'series.name\npoint.x: point.y'` → two-line tooltip

---

## Tooltip Positioning

```dart
TooltipBehavior(
  enable: true,
  tooltipPosition: TooltipPosition.pointer,  // show at tap location
  // TooltipPosition.auto — near the segment (default)
)
```

---

## Tooltip Template

Replace the entire tooltip UI with a custom widget using `builder`:

```dart
TooltipBehavior(
  enable: true,
  builder: (
    dynamic data,
    dynamic point,
    dynamic series,
    int pointIndex,
    int seriesIndex,
  ) {
    return Container(
      padding: const EdgeInsets.all(8),
      color: Colors.white,
      child: Text(
        '${point.x}: ${point.y}',
        style: const TextStyle(color: Colors.black),
      ),
    );
  },
)
```

> The `data` parameter is the original data object from `dataSource`. Cast it to your model type for full access.

---

## Activation Mode

Control which gesture shows the tooltip:

```dart
TooltipBehavior(
  enable: true,
  activationMode: ActivationMode.longPress,  // default: singleTap
)
```

Available options:
- `ActivationMode.singleTap` — tap once (default)
- `ActivationMode.doubleTap` — double tap
- `ActivationMode.longPress` — long press
- `ActivationMode.none` — tooltip never shows

---

## Enable Selection

`SelectionBehavior` must be initialized in `initState`:

```dart
late SelectionBehavior _selectionBehavior;

@override
void initState() {
  _selectionBehavior = SelectionBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return SfCircularChart(
    series: <CircularSeries>[
      PieSeries<ChartData, String>(
        dataSource: chartData,
        xValueMapper: (d, _) => d.x,
        yValueMapper: (d, _) => d.y,
        selectionBehavior: _selectionBehavior,
      ),
    ],
  );
}
```

Tapping a segment selects it (highlights it) and deselects any previously selected segment.

---

## Customize Selected / Unselected Segments

```dart
_selectionBehavior = SelectionBehavior(
  enable: true,
  selectedColor: Colors.red,            // fill of selected segment
  unselectedColor: Colors.grey,         // fill of non-selected segments
  selectedBorderColor: Colors.black,
  selectedBorderWidth: 2,
  unselectedBorderColor: Colors.grey,
  unselectedBorderWidth: 0.5,
  selectedOpacity: 1.0,
  unselectedOpacity: 0.5,
);
```

---

## Multi-Selection

Allow selecting multiple segments simultaneously:

```dart
SfCircularChart(
  enableMultiSelection: true,
  series: <CircularSeries>[
    PieSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      selectionBehavior: SelectionBehavior(enable: true),
    ),
  ],
)
```

---

## Toggle Selection

Control whether tapping an already-selected segment deselects it:

```dart
_selectionBehavior = SelectionBehavior(
  enable: true,
  toggleSelection: false,  // once selected, stays selected until another is tapped
);
```

- `true` (default) — tap selected segment to deselect it
- `false` — selected segment stays selected until a different one is tapped
