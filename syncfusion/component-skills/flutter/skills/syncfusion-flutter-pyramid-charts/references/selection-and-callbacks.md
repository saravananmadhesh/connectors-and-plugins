# Selection and Callbacks

## Table of Contents
- [Enable Selection](#enable-selection)
- [Customizing Selected and Unselected Segments](#customizing-selected-and-unselected-segments)
- [Multi-Selection](#multi-selection)
- [Toggle Selection](#toggle-selection)
- [Initial Selection on Render](#initial-selection-on-render)
- [Programmatic Selection](#programmatic-selection)
- [Dynamic Data Updates with onRendererCreated](#dynamic-data-updates-with-onrenderercreated)
- [Key Callbacks](#key-callbacks)

---

## Enable Selection

`SelectionBehavior` must be initialized in `initState` and assigned to `PyramidSeries`:

```dart
late SelectionBehavior _selectionBehavior;

@override
void initState() {
  _selectionBehavior = SelectionBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return SfPyramidChart(
    series: PyramidSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (ChartData data, _) => data.x,
      yValueMapper: (ChartData data, _) => data.y,
      selectionBehavior: _selectionBehavior,
    ),
  );
}
```

Tapping a segment selects it; tapping again deselects (toggle is enabled by default).

---

## Customizing Selected and Unselected Segments

```dart
_selectionBehavior = SelectionBehavior(
  enable: true,
  selectedColor: Colors.deepOrange,         // Fill of selected segment
  unselectedColor: Colors.grey.shade300,    // Fill of unselected segments
  selectedBorderColor: Colors.red,          // Stroke of selected
  selectedBorderWidth: 2.0,
  unselectedBorderColor: Colors.transparent,
  unselectedBorderWidth: 0,
  selectedOpacity: 1.0,                     // Opacity of selected (0.0–1.0)
  unselectedOpacity: 0.5,                   // Opacity of unselected
);
```

---

## Multi-Selection

Allow multiple segments to be selected simultaneously:

```dart
SfPyramidChart(
  enableMultiSelection: true,  
  series: PyramidSeries<ChartData, String>(
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
    selectionBehavior: _selectionBehavior,
  ),
)
```

---

## Toggle Selection

By default, tapping a selected segment deselects it. Disable this if you want segments to stay selected once tapped:

```dart
_selectionBehavior = SelectionBehavior(
  enable: true,
  toggleSelection: false,  
);
```

---

## Initial Selection on Render

Pre-select segments when the chart first renders by specifying their indexes:

```dart
PyramidSeries<ChartData, String>(
  initialSelectedDataIndexes: [0, 2],  
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  selectionBehavior: _selectionBehavior,
)
```

---

## Programmatic Selection

Select a segment from code (e.g., in response to a button tap) using `selectDataPoints`:

```dart
PyramidSeriesController? _seriesController;

@override
void initState() {
  _selectionBehavior = SelectionBehavior(enable: true);
  super.initState();
}

PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  selectionBehavior: _selectionBehavior,
  onRendererCreated: (PyramidSeriesController controller) {
    _seriesController = controller;
  },
)

void selectFirstSegment() {
  _seriesController?.selectDataPoints(0);  
}
```

---

## Dynamic Data Updates with onRendererCreated

`onRendererCreated` gives access to `PyramidSeriesController`, which enables efficient dynamic data updates without full widget rebuilds:

```dart
PyramidSeriesController? _pyramidSeriesController;

PyramidSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
  onRendererCreated: (PyramidSeriesController controller) {
    _pyramidSeriesController = controller;
  },
)

void addDataPoint() {
  chartData.add(ChartData('New Stage', 120));
  _pyramidSeriesController?.updateDataSource(
    addedDataIndexes: <int>[chartData.length - 1],
  );
}

void removeDataPoint() {
  chartData.removeAt(0);
  _pyramidSeriesController?.updateDataSource(
    removedDataIndexes: <int>[0],
  );
}
```

> Use `updateDataSource` instead of `setState` for large datasets — it updates only the changed segments for better performance.

---

## Key Callbacks

### onPointTap

Fires when a user taps a segment:

```dart
PyramidSeries<ChartData, String>(
  onPointTap: (ChartPointDetails details) {
    print('Tapped segment: ${details.pointIndex}');
    print('Series index: ${details.seriesIndex}');
    // details.dataPoints — all data points in the series
  },
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

Also available: `onPointDoubleTap` and `onPointLongPress` with the same `ChartPointDetails` arguments.

### onSelectionChanged

Fires when selection changes, allowing dynamic customization of selected/unselected appearance:

```dart
SfPyramidChart(
  onSelectionChanged: (SelectionArgs args) {
    args.selectedColor = Colors.red;
    args.unselectedColor = Colors.grey.shade200;
    args.selectedBorderColor = Colors.redAccent;
    args.selectedBorderWidth = 2;
  },
  series: PyramidSeries<ChartData, String>(
    selectionBehavior: _selectionBehavior,
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
  ),
)
```

### onTooltipRender

Customize tooltip text at render time:

```dart
SfPyramidChart(
  onTooltipRender: (TooltipArgs args) {
    args.text = 'Custom: ${args.dataPoints![args.pointIndex!].y}';
    args.header = 'Stage Info';
    // args.locationX / args.locationY — tooltip position
  },
  tooltipBehavior: _tooltipBehavior,
  ...
)
```

### onDataLabelRender

Customize data label text and style at render time:

```dart
SfPyramidChart(
  onDataLabelRender: (DataLabelRenderArgs args) {
    args.text = '${args.text} pts';
    args.color = Colors.blue;  // Label background color
    // args.textStyle for font customization
  },
  series: PyramidSeries<ChartData, String>(
    dataLabelSettings: DataLabelSettings(isVisible: true),
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
  ),
)
```

### onLegendItemRender

Customize legend items at render time:

```dart
SfPyramidChart(
  onLegendItemRender: (LegendRenderArgs args) {
    args.text = 'Stage ${args.pointIndex}: ${args.text}';
    args.legendIconType = LegendIconType.diamond;
    // args.color — legend icon color
  },
  legend: Legend(isVisible: true),
  ...
)
```

### onLegendTapped

React when a user taps a legend item:

```dart
SfPyramidChart(
  onLegendTapped: (LegendTapArgs args) {
    print('Legend tapped: series ${args.seriesIndex}, point ${args.pointIndex}');
  },
  legend: Legend(isVisible: true),
  ...
)
```

### onDataLabelTapped

React when a user taps a data label:

```dart
SfPyramidChart(
  onDataLabelTapped: (DataLabelTapDetails args) {
    print('Label tapped: ${args.text} at point ${args.pointIndex}');
  },
  ...
)
```

> This callback does not fire when a `builder` is used for the data label. Use `GestureDetector` around the custom widget instead.

### Chart Touch Callbacks

React to raw touch interactions on the chart canvas:

```dart
SfPyramidChart(
  onChartTouchInteractionDown: (ChartTouchInteractionArgs args) {
    print('Touch down at (${args.position.dx}, ${args.position.dy})');
  },
  onChartTouchInteractionMove: (ChartTouchInteractionArgs args) {
    // Fires as the user drags
  },
  onChartTouchInteractionUp: (ChartTouchInteractionArgs args) {
    // Fires on release
  },
  ...
)
```
