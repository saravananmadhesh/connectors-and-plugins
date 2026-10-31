# SfRangeSlider Overview

The **SfRangeSlider** is a highly interactive UI widget for selecting a range with two thumbs (start and end values). It extends the single-value slider concept to range selection with additional features like drag modes.

## When to Use SfRangeSlider

Use `SfRangeSlider` when you need:

- **Range selection** with start and end values
- **Two-thumb interaction** for selecting intervals
- **Drag modes** to control how thumbs interact (individual, together, or both)
- **Price ranges**, **date ranges**, or **value intervals**
- **No child widget** or chart integration required

## Key Features

### SfRangeValues Class

Range slider uses `SfRangeValues` to represent the selected range:

```dart
SfRangeValues _values = const SfRangeValues(20.0, 80.0);

SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: _values,
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
    print('Start: ${newValues.start}, End: ${newValues.end}');
  },
)
```

### Numeric and Date Support

Like `SfSlider`, supports both numeric and date ranges:

```dart
// Numeric range
SfRangeValues _values = const SfRangeValues(40.0, 60.0);

SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: _values,
  onChanged: (SfRangeValues newValues) { },
)

// Date range
SfRangeValues _values = SfRangeValues(
  DateTime(2012, 01, 01),
  DateTime(2016, 01, 01)
);

SfRangeSlider(
  min: DateTime(2010, 01, 01),
  max: DateTime(2020, 01, 01),
  values: _values,
  dateFormat: DateFormat.y(),
  dateIntervalType: DateIntervalType.years,
  onChanged: (SfRangeValues newValues) { },
)
```

### Drag Modes

**Unique Feature**: Three drag modes control thumb interaction behavior:

1. **`SliderDragMode.onThumb`** (default): Drag individual thumbs only
2. **`SliderDragMode.betweenThumbs`**: Drag the entire range together
3. **`SliderDragMode.both`**: Both individual and range dragging

```dart
SfRangeSlider(
  values: _values,
  dragMode: SliderDragMode.both,
  onChanged: (SfRangeValues newValues) { },
)
```

See [drag-modes.md](drag-modes.md) for detailed examples.

### Orientation Support

```dart
// Horizontal (default)
SfRangeSlider(
  values: _values,
  onChanged: (SfRangeValues newValues) { },
)

// Vertical
SfRangeSlider.vertical(
  values: _values,
  onChanged: (SfRangeValues newValues) { },
)
```

## Basic Configuration

### Minimum Example

```dart
SfRangeValues _values = const SfRangeValues(0.3, 0.7);

SfRangeSlider(
  values: _values,
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
)
```

### With Visual Elements

```dart
SfRangeValues _values = const SfRangeValues(40.0, 60.0);

SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: _values,
  interval: 20,
  showLabels: true,
  showTicks: true,
  enableTooltip: true,
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
)
```

## Values Property

The `values` property is an `SfRangeValues` object with `start` and `end`:

```dart
SfRangeValues _values = const SfRangeValues(25.0, 75.0);

print(_values.start);  // 25.0
print(_values.end);    // 75.0
```

Both values must be within the `min` and `max` range, and `start` must be less than or equal to `end`.

## Callbacks

### onChanged (Required)

```dart
SfRangeSlider(
  values: _values,
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
    print('Range: ${newValues.start} - ${newValues.end}');
  },
)
```

If `onChanged` is `null`, the range slider is disabled.

### onChangeStart

```dart
SfRangeSlider(
  values: _values,
  onChangeStart: (SfRangeValues startValues) {
    print('Drag started: ${startValues.start} - ${startValues.end}');
  },
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
)
```

### onChangeEnd

```dart
SfRangeSlider(
  values: _values,
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
  onChangeEnd: (SfRangeValues endValues) {
    print('Drag ended: ${endValues.start} - ${endValues.end}');
    _applyFilter(endValues);
  },
)
```

## Active and Inactive Regions

- **Active region**: Between the two thumbs
- **Inactive regions**: Before start thumb and after end thumb

```dart
SfRangeSlider(
  values: _values,
  activeColor: Colors.blue,
  inactiveColor: Colors.grey.withOpacity(0.3),
  onChanged: (SfRangeValues newValues) { },
)
```

## Comparison with Other Widgets

| Feature | SfSlider | SfRangeSlider | SfRangeSelector |
|---------|----------|---------------|-----------------|
| Value type | Single `value` | `values` (SfRangeValues) | `initialValues` or `controller` |
| Thumbs | 1 | 2 | 2 |
| Drag modes | ❌ | ✅ | ✅ |
| Child widget | ❌ | ❌ | ✅ |
| Controller | ❌ | ❌ | ✅ (RangeController) |
| Deferred updates | ❌ | ❌ | ✅ |

## Common Use Cases

1. **Price Range Filter** - E-commerce product filtering
2. **Date Range Selection** - Report date filters, booking dates
3. **Age Range Filter** - Demographic filtering
4. **Time Range Selection** - Event time selection
5. **Value Range Constraints** - Min/max value selection
6. **Percentage Ranges** - Distribution or allocation ranges

## Best Practices

1. **Choose appropriate drag mode**: Use `betweenThumbs` when the range size should remain constant
2. **Provide visual feedback**: Enable tooltips to show both values
3. **Use meaningful intervals**: Match intervals to the data scale
4. **Handle state properly**: Update values in `setState()` or state management
5. **Consider touch targets**: Ensure thumbs are easily distinguishable and draggable
6. **Format range display**: Show formatted ranges in UI (e.g., "$20 - $80")

## Example: Price Range Filter

```dart
class PriceRangeFilter extends StatefulWidget {
  @override
  _PriceRangeFilterState createState() => _PriceRangeFilterState();
}

class _PriceRangeFilterState extends State<PriceRangeFilter> {
  SfRangeValues _priceRange = const SfRangeValues(100.0, 500.0);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          '\$${_priceRange.start.toInt()} - \$${_priceRange.end.toInt()}',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),
        SfRangeSlider(
          min: 0.0,
          max: 1000.0,
          values: _priceRange,
          interval: 200,
          showLabels: true,
          showTicks: true,
          enableTooltip: true,
          numberFormat: NumberFormat('\$#'),
          activeColor: Colors.green,
          onChanged: (SfRangeValues newValues) {
            setState(() {
              _priceRange = newValues;
            });
          },
          onChangeEnd: (SfRangeValues finalValues) {
            _applyPriceFilter(finalValues);
          },
        ),
      ],
    );
  }

  void _applyPriceFilter(SfRangeValues range) {
    // Apply filter logic
    print('Filter products: \$${range.start} to \$${range.end}');
  }
}
```

## Example: Date Range Selector

```dart
class DateRangeFilter extends StatefulWidget {
  @override
  _DateRangeFilterState createState() => _DateRangeFilterState();
}

class _DateRangeFilterState extends State<DateRangeFilter> {
  SfRangeValues _dateRange = SfRangeValues(
    DateTime(2020, 01, 01),
    DateTime(2023, 12, 31)
  );

  @override
  Widget build(BuildContext context) {
    return SfRangeSlider(
      min: DateTime(2015, 01, 01),
      max: DateTime(2025, 12, 31),
      values: _dateRange,
      interval: 2,
      showLabels: true,
      showTicks: true,
      enableTooltip: true,
      dateFormat: DateFormat.y(),
      dateIntervalType: DateIntervalType.years,
      onChanged: (SfRangeValues newValues) {
        setState(() {
          _dateRange = newValues;
        });
      },
    );
  }
}
```

## Next Steps

- For drag mode details, see [drag-modes.md](drag-modes.md)
- For numeric and date configuration, see [values-and-intervals.md](values-and-intervals.md)
- For visual customization, see [track-and-shapes.md](track-and-shapes.md)
- For tooltips, see [thumbs-tooltips-overlay.md](thumbs-tooltips-overlay.md)
