# Annotations and Chart Appearance

## Table of Contents
- [Annotations](#annotations)
- [Positioning Annotations](#positioning-annotations)
- [Common Annotation Patterns](#common-annotation-patterns)
- [Chart Sizing](#chart-sizing)
- [Chart Margin](#chart-margin)
- [Chart Area Customization](#chart-area-customization)

---

## Annotations

Annotations overlay any Flutter widget on the chart area. Use them to add center text to doughnuts, progress labels to radial bars, watermarks, icons, or any custom UI.

```dart
SfCircularChart(
  annotations: <CircularChartAnnotation>[
    CircularChartAnnotation(
      widget: Container(
        child: const Text(
          'Annotation',
          style: TextStyle(fontSize: 16),
        ),
      ),
    ),
  ],
  series: <CircularSeries>[...],
)
```

Multiple annotations are supported — they layer on top of each other in list order.

---

## Positioning Annotations

Use `radius`, `horizontalAlignment`, and `verticalAlignment` to place annotations:

```dart
CircularChartAnnotation(
  widget: Text('Center'),
  radius: '0%',                             
  verticalAlignment: ChartAlignment.center,
  horizontalAlignment: ChartAlignment.center,
)
```

- `radius` — distance from center as a percentage of chart radius (`'0%'` to `'100%'`)
- `horizontalAlignment` — `ChartAlignment.near`, `.center`, `.far`
- `verticalAlignment` — `ChartAlignment.near`, `.center`, `.far`

Position at the edge of a specific ring:

```dart
CircularChartAnnotation(
  widget: Text('Edge Label'),
  radius: '80%',
  verticalAlignment: ChartAlignment.center,
  horizontalAlignment: ChartAlignment.far,
)
```

---

## Common Annotation Patterns

### Doughnut with Center Text

```dart
SfCircularChart(
  annotations: <CircularChartAnnotation>[
    CircularChartAnnotation(
      widget: const Text(
        '75%',
        style: TextStyle(
          fontSize: 30,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
    ),
  ],
  series: <CircularSeries>[
    DoughnutSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      innerRadius: '60%',
    ),
  ],
)
```

### Doughnut with Elevated Center Circle + Label

```dart
SfCircularChart(
  annotations: <CircularChartAnnotation>[
    CircularChartAnnotation(
      widget: PhysicalModel(
        shape: BoxShape.circle,
        elevation: 10,
        shadowColor: Colors.black,
        color: const Color.fromRGBO(230, 230, 230, 1),
        child: Container(),
      ),
    ),
    CircularChartAnnotation(
      widget: const Text(
        '62%',
        style: TextStyle(
          color: Color.fromRGBO(0, 0, 0, 0.5),
          fontSize: 25,
        ),
      ),
    ),
  ],
  series: <CircularSeries>[
    DoughnutSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      radius: '50%',
    ),
  ],
)
```

### Watermark

```dart
SfCircularChart(
  annotations: <CircularChartAnnotation>[
    CircularChartAnnotation(
      widget: const Text(
        'DRAFT',
        style: TextStyle(
          color: Color.fromRGBO(216, 225, 227, 0.8),
          fontWeight: FontWeight.bold,
          fontSize: 60,
        ),
      ),
    ),
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

## Chart Sizing

`SfCircularChart` fills its parent's available space. Constrain it using a `Container` with explicit dimensions:

```dart
Container(
  height: 300,
  width: 350,
  child: SfCircularChart(
    series: <CircularSeries>[...],
  ),
)
```

> Without explicit dimensions from the parent, the chart may fail to render or show a blank screen.

---

## Chart Margin

Add padding around the chart inside its container:

```dart
SfCircularChart(
  margin: EdgeInsets.all(15),
  borderColor: Colors.red,
  borderWidth: 2,
  series: <CircularSeries>[...],
)
```

Use `EdgeInsets.symmetric` or `EdgeInsets.only` for asymmetric margins.

---

## Chart Area Customization

Customize the chart's background and border:

```dart
SfCircularChart(
  backgroundColor: Colors.lightGreen,
  backgroundImage: AssetImage('assets/background.png'),
  borderWidth: 2,
  borderColor: Colors.blue,
  series: <CircularSeries>[...],
)
```

- `backgroundColor` — fills the entire chart area
- `backgroundImage` — overlays an asset image on the chart area
- `borderWidth` / `borderColor` — draws a border around the chart area
