# Series Customization

## Table of Contents
- [Animation](#animation)
- [Color Palette](#color-palette)
- [Per-Point Color Mapping](#per-point-color-mapping)
- [Gradient Fill](#gradient-fill)
- [Image Fill](#image-fill)
- [Per-Point Shader Mapping](#per-point-shader-mapping)
- [Point Render Mode](#point-render-mode)
- [Empty / Null Data Points](#empty--null-data-points)
- [Sorting](#sorting)

---

## Animation

Series animates in on first render. Animation is on by default.

### Control Duration

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  animationDuration: 1500,  // milliseconds; set to 0 to disable
)
```

### Add Delay Before Animation Starts

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  animationDuration: 4500,
  animationDelay: 2000,  // waits 2s before animating
)
```

### Dynamic Animation

When data updates trigger a `setState`, the chart re-animates. Set `animationDuration: 0` to skip animation on updates.

---

## Color Palette

Override the default 10-color palette at the chart level. Colors cycle through data points automatically:

```dart
SfCircularChart(
  palette: <Color>[
    Colors.amber,
    Colors.brown,
    Colors.green,
    Colors.redAccent,
    Colors.blueAccent,
    Colors.teal,
  ],
  series: <CircularSeries>[
    PieSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
    ),
  ],
)
```

---

## Per-Point Color Mapping

Map colors directly from the data source using `pointColorMapper`:

```dart
class ChartData {
  ChartData(this.x, this.y, this.color);
  final String x;
  final double y;
  final Color color;
}

PieSeries<ChartData, String>(
  dataSource: <ChartData>[
    ChartData('Rent',    1000, Colors.teal),
    ChartData('Food',    2500, Colors.lightBlue),
    ChartData('Savings',  760, Colors.brown),
    ChartData('Tax',     1897, Colors.grey),
    ChartData('Others',  2987, Colors.blueGrey),
  ],
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  pointColorMapper: (d, _) => d.color,
)
```

---

## Gradient Fill

Use `onCreateShader` on `SfCircularChart` to apply a gradient across all data points. All points share a single shader.

### Linear Gradient

```dart
final List<Color> colors = [
  const Color.fromRGBO(75, 135, 185, 1),
  const Color.fromRGBO(192, 108, 132, 1),
  const Color.fromRGBO(246, 114, 128, 1),
  const Color.fromRGBO(248, 177, 149, 1),
  const Color.fromRGBO(116, 180, 155, 1),
];
final List<double> stops = [0.2, 0.4, 0.6, 0.8, 1.0];

SfCircularChart(
  onCreateShader: (ChartShaderDetails details) {
    return Gradient.linear(
      details.outerRect.topRight,
      details.outerRect.centerLeft,
      colors,
      stops,
    );
  },
  series: <CircularSeries>[
    PieSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
    ),
  ],
)
```

### Sweep Gradient

```dart
SfCircularChart(
  onCreateShader: (ChartShaderDetails details) {
    return Gradient.sweep(
      details.outerRect.center,
      colors,
      stops,
      TileMode.clamp,
      _degreeToRadian(0),
      _degreeToRadian(360),
      _resolveTransform(details.outerRect, TextDirection.ltr),
    );
  },
  ...
)

double _degreeToRadian(int deg) => deg * (3.141592653589793 / 180);

Float64List _resolveTransform(Rect bounds, TextDirection dir) {
  final transform = GradientRotation(_degreeToRadian(-90));
  return transform.transform(bounds, textDirection: dir)!.storage;
}
```

### Radial Gradient

```dart
SfCircularChart(
  onCreateShader: (ChartShaderDetails details) {
    return Gradient.radial(
      details.outerRect.center,
      details.outerRect.right - details.outerRect.center.dx,
      colors,
      stops,
    );
  },
  series: <CircularSeries>[
    DoughnutSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
    ),
  ],
)
```

> `onCreateShader` is called once at render time. It applies the same shader to the entire chart area — not per point.

---

## Image Fill

Fill the chart with a tiled or mirrored image texture using `ImageShader`:

```dart
import 'dart:async';
import 'dart:ui' as ui;

ui.Image? _chartImage;

Future<void> _loadImage() async {
  final provider = const AssetImage('assets/texture.png');
  final completer = Completer<ImageInfo>();
  provider.resolve(const ImageConfiguration()).addListener(
    ImageStreamListener((info, _) => completer.complete(info)),
  );
  final info = await completer.future;
  setState(() => _chartImage = info.image);
}

// In build:
SfCircularChart(
  onCreateShader: (ChartShaderDetails details) {
    return ImageShader(
      _chartImage!,
      TileMode.mirror,
      TileMode.mirror,
      Matrix4.identity().scaled(0.4).storage,
    );
  },
  ...
)
```

---

## Per-Point Shader Mapping

Assign a different gradient or image shader to each individual data point using `pointShaderMapper`. This overrides `onCreateShader` for individual points.

```dart
class ChartData {
  ChartData(this.x, this.y, this.shader);
  final String x;
  final double y;
  final Shader shader;
}

PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  pointShaderMapper: (data, _, color, rect) => data.shader,
)
```

Build `Shader` objects (e.g., `ui.ImageShader`) and store them directly in the data model.

---

## Point Render Mode

Controls whether data points are filled with solid colors or a sweep gradient. Only applies to `PieSeries` and `DoughnutSeries` (not `RadialBarSeries`). Has no effect when `onCreateShader` or `pointShaderMapper` is set.

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  pointRenderMode: PointRenderMode.gradient,  // sweep gradient from palette colors
)
```

- `PointRenderMode.segment` — solid fill per point (default)
- `PointRenderMode.gradient` — sweep gradient formed from palette/point colors

---

## Empty / Null Data Points

Data points with a `null` y-value are treated as empty. Control how they appear:

```dart
PieSeries<ChartData, String>(
  dataSource: <ChartData>[
    ChartData('David', null),  // empty point
    ChartData('Steve', 38),
    ChartData('Jack', 34),
    ChartData('Others', 52),
  ],
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  dataLabelSettings: DataLabelSettings(isVisible: true),
  emptyPointSettings: EmptyPointSettings(
    mode: EmptyPointMode.average,  // replace null with average of neighbors
  ),
)
```

Available modes:
- `EmptyPointMode.gap` — renders a gap (default)
- `EmptyPointMode.zero` — treats null as 0
- `EmptyPointMode.drop` — removes the point entirely
- `EmptyPointMode.average` — fills with average of adjacent points

### Customize Empty Point Appearance

```dart
emptyPointSettings: EmptyPointSettings(
  mode: EmptyPointMode.average,
  color: Colors.red,
  borderColor: Colors.black,
  borderWidth: 2,
),
```

---

## Sorting

Sort data points before rendering using `sortingOrder` and `sortFieldValueMapper`:

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  sortingOrder: SortingOrder.ascending,
  sortFieldValueMapper: (d, _) => d.x,  // sort alphabetically by label
)
```

- `SortingOrder.ascending` — smallest/A-first
- `SortingOrder.descending` — largest/Z-first
- `SortingOrder.none` — render in data source order (default)

Sort by y-value (largest slice first):

```dart
sortingOrder: SortingOrder.descending,
sortFieldValueMapper: (d, _) => d.y,
```
