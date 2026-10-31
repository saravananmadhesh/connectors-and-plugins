# Pyramid Customization

## Table of Contents
- [Pyramid Modes](#pyramid-modes)
- [Changing Pyramid Size](#changing-pyramid-size)
- [Gap Between Segments](#gap-between-segments)
- [Explode Segments](#explode-segments)
- [Applying Palette Colors](#applying-palette-colors)
- [Border and Opacity](#border-and-opacity)
- [Color Mapping Per Point](#color-mapping-per-point)

---

## Pyramid Modes

`PyramidMode` controls how segment sizes are calculated from the Y values:

| Mode | Behavior |
|---|---|
| `PyramidMode.linear` | Segment **height** is proportional to Y value (default) |
| `PyramidMode.surface` | Segment **area** is proportional to Y value |

Use `surface` mode when you want visual area to accurately represent proportional data (e.g., market share), since height-based rendering can underrepresent differences at the wide base.

```dart
PyramidSeries<ChartData, String>(
  pyramidMode: PyramidMode.surface,  
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

---

## Changing Pyramid Size

Control the rendered size of the pyramid within its container using `height` and `width`. Values are percentage strings (`'0%'` to `'100%'`). Defaults to `'80%'` for both.

```dart
PyramidSeries<ChartData, String>(
  height: '70%',   
  width: '60%',    
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

> Useful when the chart shares space with other widgets and you need precise layout control.

---

## Gap Between Segments

`gapRatio` adds spacing between pyramid segments. Accepts values from `0` (no gap) to `1` (maximum gap). Default is `0`.

```dart
PyramidSeries<ChartData, String>(
  gapRatio: 0.1,  
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

Small gaps (0.05–0.15) improve segment readability without breaking the pyramid shape.

---

## Explode Segments

Exploding visually separates a segment from the pyramid to highlight it. Segments can also be exploded by user tap.

```dart
PyramidSeries<ChartData, String>(
  explode: true,          
  explodeIndex: 0,        
  explodeOffset: '5%',    
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

- `explode: true` alone enables tap-to-explode interaction
- `explodeIndex` pre-selects a segment to highlight on render
- `explodeOffset` controls how far the segment protrudes (e.g., `'5%'`, `'10%'`)

---

## Applying Palette Colors

Override the default color set with a custom palette. Colors rotate if there are more segments than palette entries.

```dart
SfPyramidChart(
  palette: <Color>[
    Colors.teal,
    Colors.orange,
    Colors.indigo,
    Colors.pink,
    Colors.amber,
  ],
  series: PyramidSeries<ChartData, String>(
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
  ),
)
```

> `palette` is set on `SfPyramidChart`, not on `PyramidSeries`.

---

## Border and Opacity

Customize the visual appearance of pyramid segments:

```dart
PyramidSeries<ChartData, String>(
  borderColor: Colors.black,   
  borderWidth: 1.5,            
  opacity: 0.85,               
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

---

## Color Mapping Per Point

Assign colors per data point by adding a color field to your data class and mapping it with `pointColorMapper`. This overrides the palette.

```dart
class ChartData {
  ChartData(this.x, this.y, this.color);
  final String x;
  final double y;
  final Color color;
}

final List<ChartData> chartData = [
  ChartData('Enterprise', 654, Colors.teal),
  ChartData('Mid-Market', 575, Colors.blue),
  ChartData('SMB', 446, Colors.orange),
  ChartData('Startup', 341, Colors.purple),
  ChartData('Individual', 160, Colors.red),
];

PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  pointColorMapper: (ChartData data, _) => data.color,  
)
```

> `pointColorMapper` takes priority over both `palette` and the default color set.
