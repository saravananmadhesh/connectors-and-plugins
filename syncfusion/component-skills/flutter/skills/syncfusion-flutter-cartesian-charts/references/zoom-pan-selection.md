# Zooming, Panning & Selection

Covers user interaction features that let users explore chart data — zoom in/out, pan across the data range, and select individual points or series.

---

## ZoomPanBehavior Setup

Initialize in `initState` to avoid recreation on each rebuild:

```dart
late ZoomPanBehavior _zoomPan;

@override
void initState() {
  _zoomPan = ZoomPanBehavior(
    enablePinching: true,           // Two-finger pinch zoom
    enableDoubleTapZooming: true,   // Double-tap to zoom in
    enableSelectionZooming: true,   // Drag to zoom to a rectangle
    enableMouseWheelZooming: true,  // Desktop/web mouse wheel
    enablePanning: true,            // Pan after zooming
    zoomMode: ZoomMode.x,           // x | y | xy
  );
  super.initState();
}

zoomPanBehavior: _zoomPan,
```

---

## Zoom Mode

Control which axis can be zoomed:

```dart
ZoomPanBehavior(
  enablePinching: true,
  zoomMode: ZoomMode.x,
)
```

- `ZoomMode.x` — zoom horizontally only (most common for time-series)
- `ZoomMode.y` — zoom vertically only
- `ZoomMode.xy` — zoom both axes

---

## Directional Zooming

Detect the user's finger gesture direction and zoom accordingly:

```dart
ZoomPanBehavior(
  enablePinching: true,
  enableDirectionalZooming: true,
  zoomMode: ZoomMode.xy,
)
```

When the user pinches more horizontally, only the X axis zooms; more vertical pinch zooms the Y axis.

---

## Selection Zooming

Allow the user to drag-select a rectangle on the chart to zoom into that region:

```dart
ZoomPanBehavior(
  enableSelectionZooming: true,
  selectionRectColor: Colors.blue.withOpacity(0.1),
  selectionRectBorderColor: Colors.blue,
  selectionRectBorderWidth: 1,
)
```

---

## Zoom Reset

```dart
_zoomPan.reset();
```
---

## Auto-Scrolling (Live / Real-Time Data)

Keep the latest N data points visible as new data arrives:

```dart
SfCartesianChart(
  primaryXAxis: DateTimeAxis(
    autoScrollingDelta: 10,                           
    autoScrollingDeltaType: DateTimeIntervalType.seconds,
    autoScrollingMode: AutoScrollingMode.end,         // end | start
  ),
  zoomPanBehavior: ZoomPanBehavior(enablePanning: true),
)
```

---

## SelectionBehavior

Let users tap to select individual points or entire series. Use for highlighting, drilldown, or responding to user selection.

```dart
late SelectionBehavior _selection;

@override
void initState() {
  _selection = SelectionBehavior(enable: true);
  super.initState();
}

LineSeries<ChartData, String>(
  selectionBehavior: _selection,
)
```

**Customize selected/unselected appearance:**
```dart
SelectionBehavior(
  enable: true,
  selectedColor: Colors.blue,
  selectedBorderColor: Colors.blueAccent,
  selectedBorderWidth: 2,
  unselectedColor: Colors.grey.withOpacity(0.3),
  unselectedBorderColor: Colors.grey,
  unselectedOpacity: 0.4,
)
```

**Selection type on the chart:**
```dart
SfCartesianChart(
  selectionType: SelectionType.point,
  // point — selects individual data point
  // series — selects entire series
  // cluster — selects all points with the same x value across series
)
```

---

## Multi-Point Selection

Allow selecting multiple points at once:

```dart
SfCartesianChart(
  enableMultiSelection: true,
  selectionType: SelectionType.point,
)
```

---

## Responding to Selection Events

```dart
SfCartesianChart(
  onSelectionChanged: (SelectionArgs args) {
    final int seriesIndex = args.seriesIndex;
    final int pointIndex = args.pointIndex;
    // Use args.selectedColor, args.unselectedColor to adjust appearance
  },
)
```

---

## Common Gotchas

| Problem | Fix |
|---------|-----|
| Zoom resets on `setState` | Initialize `ZoomPanBehavior` in `initState`, not in `build` |
| Pan not working after zoom | Enable `enablePanning: true` in `ZoomPanBehavior` |
| Auto-scroll not updating | Call `_controller.updateDataSource(addedDataIndexes: [...])` instead of `setState` |
| Selection state lost on rebuild | Keep `SelectionBehavior` instance in `State`, not inline |
