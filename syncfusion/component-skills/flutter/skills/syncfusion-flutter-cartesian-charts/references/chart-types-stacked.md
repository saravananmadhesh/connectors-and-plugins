# Stacked Chart Types

## Table of Contents
- [Overview](#overview)
- [Stacked Area Chart](#stacked-area-chart)
- [100% Stacked Area Chart](#100-stacked-area-chart)
- [Stacked Bar Chart](#stacked-bar-chart)
- [100% Stacked Bar Chart](#100-stacked-bar-chart)
- [Stacked Column Chart](#stacked-column-chart)
- [100% Stacked Column Chart](#100-stacked-column-chart)
- [Stacked Line Chart](#stacked-line-chart)
- [100% Stacked Line Chart](#100-stacked-line-chart)
- [Stacked vs 100% Stacked — When to Use Each](#stacked-vs-100-stacked--when-to-use-each)

---

## Overview

Stacked charts layer multiple series on top of each other to show both individual contributions and the total. All stacked series use the same `xValueMapper` / `yValueMapper` pattern as regular series.

**Group stacked series** using the `groupName` property — series with the same `groupName` are stacked together. Series with different group names create separate stacks side by side.

---

## Stacked Area Chart

```dart
SfCartesianChart(
  primaryXAxis: CategoryAxis(),
  series: <CartesianSeries>[
    StackedAreaSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (ChartData d, _) => d.x,
      yValueMapper: (ChartData d, _) => d.y1,
      name: 'Product A',
    ),
    StackedAreaSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (ChartData d, _) => d.x,
      yValueMapper: (ChartData d, _) => d.y2,
      name: 'Product B',
    ),
    StackedAreaSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (ChartData d, _) => d.x,
      yValueMapper: (ChartData d, _) => d.y3,
      name: 'Product C',
    ),
  ],
)
```

---

## 100% Stacked Area Chart

Each series contributes as a percentage of the total at each x point. The y-axis always goes from 0 to 100%.

```dart
StackedArea100Series<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y1,
  name: 'Product A',
)
```

---

## Stacked Bar Chart

Horizontal stacked bars — segments stack left-to-right.

```dart
StackedBarSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y1,
  name: 'Q1',
)
```

---

## 100% Stacked Bar Chart

```dart
StackedBar100Series<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y1,
  name: 'Q1',
)
```

---

## Stacked Column Chart

Vertical stacked bars — segments stack bottom-to-top.

```dart
StackedColumnSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y1,
  name: 'Category A',
  borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
)
```

---

## 100% Stacked Column Chart

```dart
StackedColumn100Series<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y1,
  name: 'Category A',
)
```

---

## Stacked Line Chart

Lines stacked on top of each other — each series value is added to the cumulative total of series below it.

```dart
StackedLineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y1,
  name: 'Series 1',
  markerSettings: const MarkerSettings(isVisible: true),
)
```

---

## 100% Stacked Line Chart

```dart
StackedLine100Series<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData d, _) => d.x,
  yValueMapper: (ChartData d, _) => d.y1,
  name: 'Series 1',
)
```

---

## Stacked vs 100% Stacked — When to Use Each

| Goal | Use |
|------|-----|
| Show both part and total (absolute values matter) | `StackedXxxSeries` |
| Compare proportions across categories (total irrelevant) | `StackedXxx100Series` |
| Show how composition changes over time | Either — 100% is clearer for proportion shifts |
| Revenue breakdown where total revenue matters | `StackedColumnSeries` |
| Market share comparison across competitors | `StackedColumn100Series` |

**Gotcha:** In stacked charts, the y-axis range expands to accommodate the cumulative total of all series — make sure to allow enough vertical space or adjust axis range explicitly with `minimum`/`maximum` on `NumericAxis`.
