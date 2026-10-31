# Data Labels

## Table of Contents
- [Enable Data Labels](#enable-data-labels)
- [Label Position](#label-position)
- [Connector Line](#connector-line)
- [Label Text Style](#label-text-style)
- [Custom Label Templates](#custom-label-templates)
- [Smart Labels and Intersection Handling](#smart-labels-and-intersection-handling)
- [Overflow Mode](#overflow-mode)
- [Hide Labels for Zero Values](#hide-labels-for-zero-values)
- [Apply Series Color to Label Background](#apply-series-color-to-label-background)
- [Saturation Color (Auto Contrast)](#saturation-color-auto-contrast)

---

## Enable Data Labels

```dart
PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

By default, labels render inside each segment with auto-contrast text color.

---

## Label Position

Control whether labels render inside or outside the pyramid segments:

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,  // or .inside (default)
)
```

Fine-tune alignment within a segment using `labelAlignment`:

| Value | Behavior |
|---|---|
| `ChartDataLabelAlignment.auto` | Automatic (default) |
| `ChartDataLabelAlignment.top` | Top of segment |
| `ChartDataLabelAlignment.middle` | Center of segment |
| `ChartDataLabelAlignment.bottom` | Bottom of segment |
| `ChartDataLabelAlignment.outer` | Outside the segment boundary |

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.inside,
  labelAlignment: ChartDataLabelAlignment.middle,
)
```

> **Note:** `labelAlignment` positions within Pyramid segments; `labelPosition` (inside/outside) determines placement relative to the segment boundary.

---

## Connector Line

When labels are outside the segment, connector lines link each label to its data point:

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  connectorLineSettings: ConnectorLineSettings(
    type: ConnectorType.curve,  // or ConnectorType.line (default)
    color: Colors.grey,
    width: 1.5,
    length: '15%',              // Length as percentage string
  ),
)
```

Curved connector lines (`ConnectorType.curve`) look more polished for outside labels, especially when labels are shifted to avoid overlap.

---

## Label Text Style

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  textStyle: TextStyle(
    color: Colors.white,
    fontSize: 12,
    fontWeight: FontWeight.bold,
    fontFamily: 'Roboto',
  ),
)
```

---

## Custom Label Templates

Replace the default text label with any Flutter widget using `builder`:

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  builder: (dynamic data, dynamic point, dynamic series,
      int pointIndex, int seriesIndex) {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: Colors.blue.shade100,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        '${point.y}%',
        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
      ),
    );
  },
)
```

> When using a `builder`, the `onDataLabelTapped` callback will not fire. Wrap the widget in a `GestureDetector` for tap handling.

---

## Smart Labels and Intersection Handling

When many segments have similar sizes, labels can overlap. `labelIntersectAction` controls behavior:

| Value | Behavior |
|---|---|
| `LabelIntersectAction.shift` | Smartly rearranges overlapping labels (default) |
| `LabelIntersectAction.hide` | Hides overlapping labels |
| `LabelIntersectAction.none` | Shows all labels regardless of overlap |

For datasets with many segments (e.g., 15+), use `outside` position + `shift` + curved connectors:

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  labelIntersectAction: LabelIntersectAction.shift,
  connectorLineSettings: ConnectorLineSettings(
    type: ConnectorType.curve,
    length: '25%',
  ),
)
```

**Behavior combinations:**

| `labelPosition` | `labelIntersectAction` | Result |
|---|---|---|
| inside | shift | Overlapping labels move outside |
| inside | hide | Overlapping labels are hidden |
| outside | shift | Labels arrange smartly around the chart |
| outside | hide | Overlapping labels are hidden |
| any | none | All labels render regardless of overlap |

> When `shift` causes labels to exceed chart bounds, they get trimmed and a tooltip appears on tap.

---

## Overflow Mode

Control what happens when a label overflows its segment's bounds:

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  overflowMode: OverflowMode.trim,  // or .none (default)
)
```

- `OverflowMode.none` — label renders as-is; `labelIntersectAction` takes priority
- `OverflowMode.trim` — label is trimmed to fit within bounds

> When `overflowMode` is set (non-none), it takes priority over `labelIntersectAction`.

---

## Hide Labels for Zero Values

Suppress data labels (and their connector lines) for data points with a Y value of `0`:

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  showZeroValue: false,  // Default is true
)
```

---

## Apply Series Color to Label Background

Render a colored background rectangle behind each label using the segment's color:

```dart
dataLabelSettings: DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  useSeriesColor: true,  // Label background matches its segment color
)
```
