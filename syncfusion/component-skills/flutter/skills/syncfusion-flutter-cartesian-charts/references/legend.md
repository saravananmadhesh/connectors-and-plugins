# Legend

The legend provides a visual key identifying each series in the chart. It can be positioned, styled, and used to toggle series visibility interactively.

---

## Enable Legend

```dart
SfCartesianChart(
  legend: Legend(isVisible: true),
  series: <CartesianSeries>[
    LineSeries<ChartData, DateTime>(
      name: 'Revenue',
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
    ),
  ],
)
```

Always set `name` on each series — otherwise the legend shows empty labels.

---

## Legend Position

```dart
Legend(
  isVisible: true,
  position: LegendPosition.bottom,
)
```

`auto` (default) places the legend at the bottom for most chart types.

---

## Legend Appearance

```dart
Legend(
  isVisible: true,
  backgroundColor: Colors.white,
  borderColor: Colors.grey,
  borderWidth: 1,
  opacity: 0.9,
  padding: 8,              
  itemPadding: 12,       
  iconHeight: 12,
  iconWidth: 12,
  iconBorderWidth: 1,
  iconBorderColor: Colors.grey,
  textStyle: const TextStyle(fontSize: 13, color: Colors.black87),
)
```

---

## Legend Overflow Modes

When there are many series and legend items exceed the available bounds:

```dart
Legend(
  isVisible: true,
  overflowMode: LegendItemOverflowMode.wrap,
  height: '30%',
  width: '90%',
)
```

- `wrap` — wraps items to multiple rows/columns
- `scroll` — makes the legend area scrollable
- `none` — items may be clipped

---

## Toggle Series Visibility

By default, tapping a legend item toggles the visibility of the corresponding series. This is enabled automatically — no additional code needed.

To disable toggle behavior:
```dart
Legend(
  isVisible: true,
  toggleSeriesVisibility: false,
)
```

---

## Custom Legend Icon Shape

Override the default icon shape per series:

```dart
LineSeries<ChartData, String>(
  name: 'Revenue',
  legendIconType: LegendIconType.circle,
)
```

---

## Legend Item Builder (Custom Widget)

Replace the default legend item with a custom widget:

```dart
Legend(
  isVisible: true,
  legendItemBuilder: (String name, dynamic series, dynamic point, int seriesIndex) {
    return Row(
      children: [
        Container(
          width: 16,
          height: 16,
          color: (series as CartesianSeries).color,
        ),
        const SizedBox(width: 4),
        Text(name, style: const TextStyle(fontSize: 13)),
      ],
    );
  },
)
```

---

## Floating Legend

Position the legend over the chart plot area:

```dart
Legend(
  isVisible: true,
  isResponsive: true,
  offset: const Offset(20, 20),
)
```

---

## Common Gotchas

| Problem | Fix |
|---------|-----|
| Legend shows empty labels | Set `name` on each `CartesianSeries` |
| Legend items overflow and clip | Use `overflowMode: LegendItemOverflowMode.wrap` or `scroll` |
| Legend takes too much space | Set `height` / `width` as percentage strings |
| Tap on legend crashes | Ensure `toggleSeriesVisibility` is true and state is handled |
