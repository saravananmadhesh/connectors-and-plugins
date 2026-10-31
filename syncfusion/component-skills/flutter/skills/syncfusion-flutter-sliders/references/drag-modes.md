# Drag Modes and Interaction

This guide covers the drag mode functionality available in `SfRangeSlider` and `SfRangeSelector`, which controls how users interact with the thumbs and track.

**Note**: Drag modes are **NOT available** for `SfSlider` (single-thumb slider). This feature is exclusive to range widgets.

## Table of Contents
- [Understanding Drag Modes](#understanding-drag-modes)
- [SliderDragMode Options](#sliderdragmode-options)
- [onDragStart Drag Mode](#ondragstart-drag-mode)
- [onThumb Drag Mode](#onthumb-drag-mode)
- [betweenThumbs Drag Mode](#betweenthumbs-drag-mode)
- [both Drag Mode](#both-drag-mode)
- [Choosing the Right Drag Mode](#choosing-the-right-drag-mode)

## Understanding Drag Modes

Drag modes define how users can interact with the range slider or selector:
- Where they can tap/drag to move thumbs
- Whether both thumbs move together
- Whether the entire range can be shifted

This affects user experience significantly—choose based on your use case.

## SliderDragMode Options

The `dragMode` property accepts the following values from `SliderDragMode` enum:

| Drag Mode | Description | Use Case |
|-----------|-------------|----------|
| `onThumb` | Must drag from thumbs only (default) | Precise control, prevent accidental changes |
| `betweenThumbs` | Drag the region between thumbs to shift range | Maintain range width, shift window |
| `both` | Combines `onThumb` and `betweenThumbs` | Maximum flexibility |

## onThumb Drag Mode

**Behavior**: Must grab and drag a thumb specifically. This is the **default** behavior.

### SfRangeSlider with onThumb (Default)

```dart
class OnThumbExample extends StatefulWidget {
  @override
  _OnThumbExampleState createState() => _OnThumbExampleState();
}

class _OnThumbExampleState extends State<OnThumbExample> {
  SfRangeValues _values = SfRangeValues(30.0, 70.0);

  @override
  Widget build(BuildContext context) {
    return SfRangeSlider(
      min: 0.0,
      max: 100.0,
      values: _values,
      dragMode: SliderDragMode.onThumb,  // Default, explicit
      interval: 10,
      showLabels: true,
      showTicks: true,
      enableTooltip: true,
      onChanged: (SfRangeValues values) {
        setState(() {
          _values = values;
        });
      },
    );
  }
}
```

**User Experience**:
- Must tap/drag directly on a thumb
- Tapping on track does nothing
- Precise, intentional adjustments

### SfRangeSelector with onThumb

```dart
SfRangeSelector(
  min: 0.0,
  max: 100.0,
  initialValues: SfRangeValues(25.0, 75.0),
  dragMode: SliderDragMode.onThumb,  // Must grab thumbs
  interval: 25,
  showLabels: true,
  enableTooltip: true,
  child: Container(
    height: 120,
    child: SfCartesianChart(
      primaryXAxis: NumericAxis(minimum: 0, maximum: 100),
      series: <ChartSeries>[
        ColumnSeries<ChartData, num>(
          dataSource: chartData,
          xValueMapper: (ChartData data, _) => data.x,
          yValueMapper: (ChartData data, _) => data.y,
        ),
      ],
    ),
  ),
)
```

**Use Cases**:
- Prevent accidental changes
- Applications requiring precision
- Professional tools (DAWs, video editors)
- Dense UIs where accidental taps are likely

## betweenThumbs Drag Mode

**Behavior**: Drag the active region between thumbs to shift the entire range while maintaining the range width.

### SfRangeSlider with betweenThumbs

```dart
class BetweenThumbsExample extends StatefulWidget {
  @override
  _BetweenThumbsExampleState createState() => _BetweenThumbsExampleState();
}

class _BetweenThumbsExampleState extends State<BetweenThumbsExample> {
  SfRangeValues _values = SfRangeValues(40.0, 60.0);  // Range width: 20

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Drag the range between thumbs to shift'),
        SizedBox(height: 20),
        SfRangeSlider(
          min: 0.0,
          max: 100.0,
          values: _values,
          dragMode: SliderDragMode.betweenThumbs,  // Shift range
          interval: 20,
          showLabels: true,
          showTicks: true,
          enableTooltip: true,
          activeColor: Colors.green,
          onChanged: (SfRangeValues values) {
            setState(() {
              _values = values;
            });
          },
        ),
        Text('Range: ${(_values.end - _values.start).toInt()}'),
      ],
    );
  }
}
```

**User Experience**:
- Starting range: 40-60 (width: 20)
- Drag left thumb → no effect
- Drag right thumb → no effect
- Drag active region left → shifts to 30-50 (width still: 20)
- Drag active region right → shifts to 50-70 (width still: 20)

### SfRangeSelector with betweenThumbs

```dart
SfRangeSelector(
  min: DateTime(2024, 01, 01),
  max: DateTime(2024, 12, 31),
  initialValues: SfRangeValues(
    DateTime(2024, 04, 01),
    DateTime(2024, 07, 01),  // 3-month range
  ),
  dragMode: SliderDragMode.betweenThumbs,  // Shift 3-month window
  dateFormat: DateFormat.yMMM(),
  dateIntervalType: DateIntervalType.months,
  interval: 1,
  showLabels: true,
  enableTooltip: true,
  child: Container(
    height: 140,
    child: SfCartesianChart(/* time series chart */),
  ),
)
```

**Use Cases**:
- Time range pickers (keep duration, shift window)
- Price range filters (maintain budget range)
- Chart zoom/pan (fixed zoom level, pan timeline)
- Video trimming (maintain clip length, shift position)

## both Drag Mode

**Behavior**: Combines `onThumb` and `betweenThumbs` modes. You can drag thumbs individually OR drag the region between them.

### SfRangeSlider with both

```dart
class BothModeExample extends StatefulWidget {
  @override
  _BothModeExampleState createState() => _BothModeExampleState();
}

class _BothModeExampleState extends State<BothModeExample> {
  SfRangeValues _values = SfRangeValues(25.0, 75.0);

  @override
  Widget build(BuildContext context) {
    return SfRangeSlider(
      min: 0.0,
      max: 100.0,
      values: _values,
      dragMode: SliderDragMode.both,  // Maximum flexibility
      interval: 25,
      showLabels: true,
      showTicks: true,
      enableTooltip: true,
      activeColor: Colors.orange,
      onChanged: (SfRangeValues values) {
        setState(() {
          _values = values;
        });
      },
    );
  }
}
```

**User Experience**:
- Drag left thumb → adjust start value independently
- Drag right thumb → adjust end value independently
- Drag active region → shift entire range

### SfRangeSelector with both

```dart
class InteractiveChartSelector extends StatefulWidget {
  @override
  _InteractiveChartSelectorState createState() => _InteractiveChartSelectorState();
}

class _InteractiveChartSelectorState extends State<InteractiveChartSelector> {
  SfRangeValues _values = SfRangeValues(2020.0, 2023.0);

  @override
  Widget build(BuildContext context) {
    return SfRangeSelector(
      min: 2015.0,
      max: 2025.0,
      initialValues: _values,
      dragMode: SliderDragMode.both,  // Flexible interaction
      interval: 2,
      showLabels: true,
      enableTooltip: true,
      onChanged: (SfRangeValues values) {
        setState(() {
          _values = values;
        });
      },
      child: Container(
        height: 150,
        child: SfCartesianChart(
          primaryXAxis: NumericAxis(minimum: 2015, maximum: 2025),
          series: <ChartSeries>[
            LineSeries<YearData, num>(
              dataSource: yearData,
              xValueMapper: (YearData data, _) => data.year,
              yValueMapper: (YearData data, _) => data.value,
            ),
          ],
        ),
      ),
    );
  }
}
```

**Use Cases**:
- Maximum user control
- Professional applications
- Chart navigation (zoom + pan)
- Advanced filtering interfaces

## Choosing the Right Drag Mode

### Decision Matrix

| Scenario | Recommended Mode | Reason |
|----------|------------------|--------|
| Mobile app, casual use | `onDragStart` | Easy, gesture-friendly |
| Precision required | `onThumb` | Prevents accidents |
| Time window selection | `betweenThumbs` | Maintain duration |
| Chart zoom/pan | `both` | Zoom (adjust thumbs) + pan (shift range) |
| Dense UI | `onThumb` | Avoid unintended taps |
| Video trimming | `betweenThumbs` | Keep clip length, shift timeline |
| Price range filter | `onDragStart` or `both` | Quick adjustments |

### Example: E-commerce Price Filter

```dart
class PriceRangeFilter extends StatefulWidget {
  @override
  _PriceRangeFilterState createState() => _PriceRangeFilterState();
}

class _PriceRangeFilterState extends State<PriceRangeFilter> {
  SfRangeValues _priceRange = SfRangeValues(100.0, 500.0);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Price Range', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        SizedBox(height: 10),
        SfRangeSlider(
          min: 0.0,
          max: 1000.0,
          values: _priceRange,
          dragMode: SliderDragMode.onThumb,
          interval: 200,
          showLabels: true,
          enableTooltip: true,
          numberFormat: NumberFormat('\$#'),
          tooltipTextFormatterCallback: (dynamic value, String text) {
            return '\$${value.toInt()}';
          },
          onChanged: (SfRangeValues values) {
            setState(() {
              _priceRange = values;
            });
          },
        ),
        Text(
          '\$${_priceRange.start.toInt()} - \$${_priceRange.end.toInt()}',
          style: TextStyle(fontSize: 16),
        ),
      ],
    );
  }
}
```

### Example: Video Timeline with Fixed Clip Length

```dart
class VideoTimelineSelector extends StatefulWidget {
  @override
  _VideoTimelineSelectorState createState() => _VideoTimelineSelectorState();
}

class _VideoTimelineSelectorState extends State<VideoTimelineSelector> {
  SfRangeValues _clipRange = SfRangeValues(10.0, 20.0);  // 10-second clip

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Video Clip Selection (10s fixed duration)'),
        SfRangeSlider(
          min: 0.0,
          max: 60.0,  // 60-second video
          values: _clipRange,
          dragMode: SliderDragMode.betweenThumbs,  // Shift 10s window
          interval: 10,
          showLabels: true,
          enableTooltip: true,
          tooltipTextFormatterCallback: (dynamic value, String text) {
            int seconds = value.toInt();
            return '${seconds}s';
          },
          onChanged: (SfRangeValues values) {
            setState(() {
              _clipRange = values;
            });
          },
        ),
        Text('Clip: ${_clipRange.start.toInt()}s - ${_clipRange.end.toInt()}s'),
      ],
    );
  }
}
```

## Combining with Other Features

### Drag Mode + Range Controller (SfRangeSelector only)

```dart
class ControlledDragMode extends StatefulWidget {
  @override
  _ControlledDragModeState createState() => _ControlledDragModeState();
}

class _ControlledDragModeState extends State<ControlledDragMode> {
  final RangeController _controller = RangeController(
    start: 20.0,
    end: 80.0,
  );

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfRangeSelector(
          min: 0.0,
          max: 100.0,
          controller: _controller,
          dragMode: SliderDragMode.both,  // User can drag OR programmatic control
          interval: 20,
          showLabels: true,
          enableTooltip: true,
          child: Container(
            height: 120,
            child: SfCartesianChart(/* chart */),
          ),
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              // Programmatically shift range
              _controller.start = 40.0;
              _controller.end = 100.0;
            });
          },
          child: Text('Set Range 40-100'),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

### Drag Mode + Callbacks

```dart
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: _values,
  dragMode: SliderDragMode.onThumb,
  enableTooltip: true,
  onChangeStart: (SfRangeValues values) {
    print('Drag started: ${values.start} - ${values.end}');
  },
  onChanged: (SfRangeValues values) {
    setState(() {
      _values = values;
    });
    print('Dragging: ${values.start} - ${values.end}');
  },
  onChangeEnd: (SfRangeValues values) {
    print('Drag ended: ${values.start} - ${values.end}');
  },
)
```

## Best Practices

1. **Default to `onThumb` for precision**: Safest choice for most applications
2. **Use `onDragStart` for mobile**: More intuitive on touch screens
3. **Use `betweenThumbs` for fixed ranges**: When range width matters more than absolute values
4. **Use `both` for professional tools**: Maximum flexibility when users need fine control
5. **Test with real users**: Different drag modes feel different—validate with your audience
6. **Document behavior**: If using non-default, inform users how to interact
7. **Consider accessibility**: Ensure drag modes work well with screen readers and keyboard navigation

## Drag Mode Summary

```dart
// Quick Reference

// 1. Must grab thumbs (default, precise)
dragMode: SliderDragMode.onThumb

// 2. Drag active region to shift range (fixed width)
dragMode: SliderDragMode.betweenThumbs

// 3. Drag thumbs OR active region (maximum flexibility)
dragMode: SliderDragMode.both
```
