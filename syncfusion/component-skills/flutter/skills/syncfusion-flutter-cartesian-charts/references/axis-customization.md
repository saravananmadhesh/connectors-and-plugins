# Axis Customization

## Table of Contents
- [Axis Title](#axis-title)
- [Label Customization](#label-customization)
- [Gridlines and Tick Marks](#gridlines-and-tick-marks)
- [Range — Min, Max, Interval](#range--min-max-interval)
- [Inversed Axis](#inversed-axis)
- [Strip Lines (Plot Bands)](#plot-bands)
- [Multi-Level Labels](#multi-level-labels)
- [Axis Crossing (Zero Line)](#axis-crossing-zero-line)
- [Axis Visibility](#axis-visibility)

---

## Axis Title

```dart
NumericAxis(
  title: AxisTitle(
    text: 'Revenue (USD)',
    textStyle: const TextStyle(
      color: Colors.blueGrey,
      fontSize: 14,
      fontWeight: FontWeight.bold,
    ),
  ),
)
```

---

## Label Customization

```dart
CategoryAxis(
  labelStyle: const TextStyle(color: Colors.black87, fontSize: 12),
  labelRotation: -45,       
  labelIntersectAction: AxisLabelIntersectAction.rotate45,
  maximumLabels: 6,          
  edgeLabelPlacement: EdgeLabelPlacement.shift, 
)
```

**Format numeric labels:**
```dart
NumericAxis(
  numberFormat: NumberFormat.currency(symbol: '\$', decimalDigits: 0),
  labelFormat: '{value}%',
)
```

**Format date labels:**
```dart
DateTimeAxis(
  dateFormat: DateFormat.MMMd(),
  intervalType: DateTimeIntervalType.months,
)
```

---

## Gridlines and Tick Marks

```dart
NumericAxis(
  majorGridLines: const MajorGridLines(
    width: 1,
    color: Colors.grey,
    dashArray: <double>[5, 5],
  ),
  minorTicksPerInterval: 4,
  minorGridLines: const MinorGridLines(
    width: 0.5,
    color: Colors.grey,
  ),
  majorTickLines: const MajorTickLines(size: 6, width: 1),
  minorTickLines: const MinorTickLines(size: 3, width: 0.5),
  axisLine: const AxisLine(width: 1, color: Colors.black),
)
```

To **hide gridlines** entirely:
```dart
NumericAxis(
  majorGridLines: const MajorGridLines(width: 0),
)
```

---

## Range — Min, Max, Interval

```dart
NumericAxis(
  minimum: 0,
  maximum: 500,
  interval: 100,
  rangePadding: ChartRangePadding.round,
)
```

For date axes:
```dart
DateTimeAxis(
  minimum: DateTime(2024, 1, 1),
  maximum: DateTime(2024, 12, 31),
  interval: 2,
  intervalType: DateTimeIntervalType.months,
)
```

---

## Inversed Axis

Reverses the axis direction (maximum value at the origin):

```dart
NumericAxis(isInversed: true)
CategoryAxis(isInversed: true)
DateTimeAxis(isInversed: true)
```

---

## Plot Bands

Strip lines (Plot bands) highlight specific regions or values on the axis:

```dart
NumericAxis(
  plotBands: <PlotBand>[
    PlotBand(
      start: 50,
      end: 50,
      borderWidth: 2,
      borderColor: Colors.red,
      label: 'Target',
      labelStyle: const TextStyle(color: Colors.red),
    ),
    PlotBand(
      start: 80,
      end: 100,
      color: Colors.green.withOpacity(0.2),
      label: 'Safe Zone',
    ),
  ],
)
```

---

## Multi-Level Labels

Group axis labels under parent categories:

```dart
CategoryAxis(
  multiLevelLabels: const <CategoricalMultiLevelLabel>[
    CategoricalMultiLevelLabel(
      start: 'Jan',
      end: 'Mar',
      text: 'Q1',
      level: 1,
    ),
    CategoricalMultiLevelLabel(
      start: 'Apr',
      end: 'Jun',
      text: 'Q2',
      level: 1,
    ),
  ],
  multiLevelLabelStyle: MultiLevelLabelStyle(
    borderType: MultiLevelBorderType.rectangle,
    borderColor: Colors.grey,
  ),
)
```

---

## Axis Crossing (Zero Line)

Move the axis to cross at a specific value (e.g., center the chart at zero):

```dart
NumericAxis(
  crossesAt: 0,          
  placeLabelsNearAxisLine: true,
)
```

---

## Axis Visibility

Hide an axis entirely:

```dart
NumericAxis(isVisible: false)
```

Useful when you want the chart area without visible axis lines or labels.
