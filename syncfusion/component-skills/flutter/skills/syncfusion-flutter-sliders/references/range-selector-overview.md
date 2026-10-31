# SfRangeSelector Overview

The **SfRangeSelector** is a highly interactive UI widget for selecting a range that controls or displays a child widget (commonly charts). It combines range selection with rich child widget integration, programmatic control via `RangeController`, and advanced features like deferred updates.

## When to Use SfRangeSelector

Use `SfRangeSelector` when you need:

- **Range selection that controls a child widget** (chart zoom, data segment selection)
- **Chart integration** with automatic selection or zooming behavior
- **Programmatic range updates** via `RangeController`
- **Deferred updates** to optimize performance during dragging
- **Visual context** showing data within the range selector

## Key Features

### Child Widget Support

**Unique Feature**: Can contain any widget as a child, commonly used with charts:

```dart
SfRangeSelector(
  min: 0.0,
  max: 1.0,
  initialValues: SfRangeValues(0.3, 0.7),
  onChanged: (SfRangeValues values) { },
  child: Container(
    height: 130,
    child: SfCartesianChart(
      // Chart displays data context
    ),
  ),
)
```

### RangeController

**Unique Feature**: Programmatic control via `RangeController`:

```dart
RangeController _controller = RangeController(
  start: 4.0,
  end: 8.0
);

SfRangeSelector(
  min: 2.0,
  max: 10.0,
  controller: _controller,
  child: Container(/* child widget */),
)

// Update programmatically
_controller.start = 3.0;
_controller.end = 9.0;
```

The controller provides:
- `start` - Current start value
- `end` - Current end value
- `previousStart` - Previous start value
- `previousEnd` - Previous end value

### InitialValues vs Controller

Two ways to set values:

```dart
// Option 1: initialValues (for static initial state)
SfRangeSelector(
  initialValues: SfRangeValues(4.0, 8.0),
  onChanged: (SfRangeValues values) { },
  child: Container(/* child */),
)

// Option 2: controller (for dynamic updates)
RangeController _controller = RangeController(start: 4.0, end: 8.0);

SfRangeSelector(
  controller: _controller,
  child: Container(/* child */),
)
```

**Important**: Don't use both `initialValues` and `controller` together. Use `controller` when you need programmatic updates.

### Deferred Updates

**Unique Feature**: Delay updates during continuous dragging for better performance:

```dart
SfRangeSelector(
  controller: _controller,
  enableDeferredUpdate: true,
  deferredUpdateDelay: 500,  // milliseconds
  onChanged: (SfRangeValues values) {
    // Only called after 500ms pause during dragging
  },
  child: Container(/* child */),
)
```

Useful for expensive operations like chart redraws or API calls.

### Drag Modes

Like `SfRangeSlider`, supports three drag modes:

```dart
SfRangeSelector(
  initialValues: _values,
  dragMode: SliderDragMode.both,
  onChanged: (SfRangeValues values) { },
  child: Container(/* child */),
)
```

See [drag-modes.md](drag-modes.md) for details.

## Basic Configuration

### Minimum Example with Chart

```dart
SfRangeValues _initialValues = SfRangeValues(0.3, 0.7);

SfRangeSelector(
  initialValues: _initialValues,
  onChanged: (SfRangeValues values) {
    print('Selected range: ${values.start} to ${values.end}');
  },
  child: Container(
    height: 130,
    child: SfCartesianChart(
      margin: const EdgeInsets.all(0),
      primaryXAxis: NumericAxis(isVisible: false),
      primaryYAxis: NumericAxis(isVisible: false),
      series: <SplineAreaSeries>[
        SplineAreaSeries(
          dataSource: chartData,
          xValueMapper: (data, _) => data.x,
          yValueMapper: (data, _) => data.y,
        ),
      ],
    ),
  ),
)
```

### With Controller

```dart
RangeController _controller;

@override
void initState() {
  super.initState();
  _controller = RangeController(start: 4.0, end: 8.0);
}

@override
void dispose() {
  _controller.dispose();
  super.dispose();
}

@override
Widget build(BuildContext context) {
  return SfRangeSelector(
    min: 2.0,
    max: 10.0,
    controller: _controller,
    showLabels: true,
    showTicks: true,
    child: Container(/* child */),
  );
}
```

## Chart Integration Patterns

### Pattern 1: Chart Selection

Highlight selected segments in the chart:

```dart
RangeController _controller = RangeController(
  start: DateTime(2010, 03, 01),
  end: DateTime(2010, 06, 01)
);

SfRangeSelector(
  min: DateTime(2010, 01, 01),
  max: DateTime(2010, 09, 01),
  controller: _controller,
  onChanged: (SfRangeValues values) {
    setState(() {});  // Rebuild to update chart
  },
  child: SfCartesianChart(
    series: [
      ColumnSeries(
        dataSource: chartData,
        selectionBehavior: SelectionBehavior(
          selectionController: _controller,
        ),
        pointColorMapper: (data, _) {
          if (data.x.isAfter(_controller.start) &&
              data.x.isBefore(_controller.end)) {
            return Colors.blue;
          }
          return Colors.grey;
        },
      ),
    ],
  ),
)
```

### Pattern 2: Chart Zooming

Update chart visible range based on selector:

```dart
RangeController _controller = RangeController(start: 8.0, end: 16.0);

Column(
  children: [
    // Main chart that zooms
    SfCartesianChart(
      primaryXAxis: NumericAxis(
        minimum: 2.0,
        maximum: 19.0,
        rangeController: _controller,  // Links to range selector
      ),
      series: [/* chart series */],
    ),
    // Range selector controls zoom
    SfRangeSelector(
      min: 2.0,
      max: 19.0,
      controller: _controller,
      child: Container(
        height: 130,
        child: SfCartesianChart(/* overview chart */),
      ),
    ),
  ],
)
```

## Active and Inactive Region Colors

**Unique Feature**: Style the child widget's active and inactive regions:

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    activeRegionColor: Colors.blue.withOpacity(0.2),
    inactiveRegionColor: Colors.grey.withOpacity(0.1),
  ),
  child: SfRangeSelector(
    initialValues: _values,
    child: Container(/* child */),
  ),
)
```

## Comparison with Other Widgets

| Feature | SfSlider | SfRangeSlider | SfRangeSelector |
|---------|----------|---------------|-----------------|
| Value type | Single `value` | `values` (SfRangeValues) | `initialValues` or `controller` |
| Child widget | ❌ | ❌ | ✅ |
| Controller | ❌ | ❌ | ✅ (RangeController) |
| Chart integration | ❌ | ❌ | ✅ |
| Deferred updates | ❌ | ❌ | ✅ |
| Drag modes | ❌ | ✅ | ✅ |
| Region colors | ❌ | ❌ | ✅ (active/inactive regions) |

## Common Use Cases

1. **Chart Zoom Control** - Navigate and zoom into chart data
2. **Data Segment Selection** - Select time periods or value ranges in charts
3. **Timeline Scrubber** - Video/audio timeline with waveform display
4. **Analytics Dashboard** - Interactive range selection over data visualizations
5. **Stock Chart Range** - Select date ranges for financial charts
6. **Sensor Data Viewer** - Select time ranges from continuous sensor data

## Best Practices

1. **Use controller for chart integration**: Provides better control and synchronization
2. **Dispose controllers**: Always dispose `RangeController` in `dispose()` method
3. **Enable deferred updates**: For expensive operations during dragging
4. **Match axes**: Ensure selector min/max matches chart axis range
5. **Provide visual context**: Use meaningful chart or data in child widget
6. **Handle touch targets**: Ensure thumbs don't overlap with child widget interactions

## Complete Example: Chart Zoom

```dart
class ChartZoomSelector extends StatefulWidget {
  @override
  _ChartZoomSelectorState createState() => _ChartZoomSelectorState();
}

class _ChartZoomSelectorState extends State<ChartZoomSelector> {
  final double _min = 2.0;
  final double _max = 19.0;
  late RangeController _controller;
  late List<ChartData> _chartData;

  @override
  void initState() {
    super.initState();
    _controller = RangeController(start: 8.0, end: 16.0);
    _chartData = _generateData();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  List<ChartData> _generateData() {
    return List.generate(18, (index) {
      return ChartData(
        x: (index + 2).toDouble(),
        y: 20 + (index % 3) * 15 + (index % 5) * 10,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Main zoomed chart
        Container(
          height: 250,
          padding: EdgeInsets.all(16),
          child: SfCartesianChart(
            primaryXAxis: NumericAxis(
              minimum: _min,
              maximum: _max,
              rangeController: _controller,
            ),
            primaryYAxis: NumericAxis(),
            series: [
              SplineSeries<ChartData, double>(
                dataSource: _chartData,
                xValueMapper: (ChartData data, _) => data.x,
                yValueMapper: (ChartData data, _) => data.y,
              ),
            ],
          ),
        ),
        // Range selector with overview
        Padding(
          padding: EdgeInsets.all(16),
          child: SfRangeSelector(
            min: _min,
            max: _max,
            interval: 2,
            showTicks: true,
            showLabels: true,
            controller: _controller,
            child: Container(
              height: 130,
              child: SfCartesianChart(
                margin: EdgeInsets.zero,
                primaryXAxis: NumericAxis(
                  minimum: _min,
                  maximum: _max,
                  isVisible: false,
                ),
                primaryYAxis: NumericAxis(isVisible: false),
                plotAreaBorderWidth: 0,
                series: [
                  SplineSeries<ChartData, double>(
                    dataSource: _chartData,
                    xValueMapper: (ChartData data, _) => data.x,
                    yValueMapper: (ChartData data, _) => data.y,
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class ChartData {
  ChartData({required this.x, required this.y});
  final double x;
  final double y;
}
```

## Next Steps

- For controller details and chart integration, see [range-controller.md](range-controller.md)
- For drag modes, see [drag-modes.md](drag-modes.md)
- For deferred updates implementation, see [range-controller.md](range-controller.md)
- For visual customization, see [track-and-shapes.md](track-and-shapes.md)
