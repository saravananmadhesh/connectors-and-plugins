# Data Labels

## Table of Contents
- [Enable Data Labels](#enable-data-labels)
- [Appearance Customization](#appearance-customization)
- [Label Positioning](#label-positioning)
- [Smart Labels (Avoid Overlap)](#smart-labels-avoid-overlap)
- [Connector Lines](#connector-lines)
- [Custom Label Text](#custom-label-text)
- [Apply Series Color to Label Background](#apply-series-color-to-label-background)
- [Label Templates](#label-templates)
- [Hide Zero-Value Labels](#hide-zero-value-labels)
- [Overflow Mode](#overflow-mode)

---

## Enable Data Labels

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

---

## Appearance Customization

```dart
DataLabelSettings(
  isVisible: true,
  color: Colors.white,           
  borderColor: Colors.black,
  borderWidth: 1,
  borderRadius: 4,
  opacity: 0.9,
  angle: 45,                     
  textStyle: TextStyle(
    color: Colors.black,
    fontSize: 12,
    fontWeight: FontWeight.bold,
    fontFamily: 'Roboto',
  ),
)
```

> If no `textStyle.color` is set, Syncfusion automatically applies a saturation color: white text on dark segments, black text on light segments.

---

## Label Positioning

### Inside vs Outside

```dart
DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,  
)
```

### Fine-Tune Alignment

```dart
DataLabelSettings(
  isVisible: true,
  labelAlignment: ChartDataLabelAlignment.outer,
)
```

### Offset from Default Position

```dart
DataLabelSettings(
  isVisible: true,
  offset: Offset(0, -10),  
)
```

---

## Smart Labels (Avoid Overlap)

When many labels crowd together (common in pie charts with many small slices), use `labelIntersectAction` to manage overlap. Works for `PieSeries` and `DoughnutSeries`.

```dart
DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  labelIntersectAction: LabelIntersectAction.shift,   
  connectorLineSettings: ConnectorLineSettings(
    type: ConnectorType.curve,
    length: '25%',
  ),
)
```

Full example with many data points:

```dart
PieSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  dataLabelMapper: (d, _) => d.x,
  radius: '60%',
  dataLabelSettings: DataLabelSettings(
    isVisible: true,
    labelIntersectAction: LabelIntersectAction.shift,
    labelPosition: ChartDataLabelPosition.outside,
    connectorLineSettings: ConnectorLineSettings(
      type: ConnectorType.curve,
      length: '25%',
    ),
  ),
)
```

Intersection action options:
- `LabelIntersectAction.shift` — repositions overlapping labels (default)
- `LabelIntersectAction.hide` — hides overlapping labels
- `LabelIntersectAction.none` — shows all labels regardless of overlap

> When `shift` moves a label outside the chart bounds, the label is trimmed and a tooltip appears on tap.

---

## Connector Lines

Connector lines link outside labels to their corresponding slice. Only applies when `labelPosition` is `outside`. Available for `PieSeries` and `DoughnutSeries`.

```dart
DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  connectorLineSettings: ConnectorLineSettings(
    type: ConnectorType.curve,   
    length: '20%',               
    color: Colors.grey,
    width: 1.5,
  ),
)
```

---

## Custom Label Text

Override the default y-value display with text from the data source using `dataLabelMapper`:

```dart
class ChartData {
  ChartData(this.x, this.y, this.label);
  final String x;
  final double y;
  final String label;   
}

PieSeries<ChartData, String>(
  dataSource: <ChartData>[
    ChartData('USA',    17, '17%'),
    ChartData('China',  34, '34%'),
    ChartData('Japan',  24, '24%'),
    ChartData('Africa', 30, '30%'),
    ChartData('UK',     10, '10%'),
  ],
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  dataLabelMapper: (d, _) => d.label,
  dataLabelSettings: DataLabelSettings(isVisible: true),
)
```

---

## Apply Series Color to Label Background

Fills the label background with the corresponding segment color:

```dart
DataLabelSettings(
  isVisible: true,
  labelPosition: ChartDataLabelPosition.outside,
  useSeriesColor: true,
)
```

---

## Label Templates

Replace the default label with any widget using the `builder` callback:

```dart
DataLabelSettings(
  isVisible: true,
  builder: (dynamic data, dynamic point, dynamic series, int pointIndex, int seriesIndex) {
    return Container(
      padding: EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        '${point.y}%',
        style: TextStyle(color: Colors.white, fontSize: 10),
      ),
    );
  },
)
```

---

## Hide Zero-Value Labels

By default, data labels render even for `y = 0`. Suppress them:

```dart
DataLabelSettings(
  isVisible: true,
  showZeroValue: false,
)
```

---

## Overflow Mode

Controls what happens when a label is too large for its segment:

```dart
DataLabelSettings(
  isVisible: true,
  overflowMode: OverflowMode.trim,  
)
```

- `OverflowMode.none` — no special handling; `labelIntersectAction` takes over (default)
- `OverflowMode.trim` — trims overflowing label text

> `overflowMode` takes priority over `labelIntersectAction` when set to anything other than `none`. Applies to pie and doughnut series.
