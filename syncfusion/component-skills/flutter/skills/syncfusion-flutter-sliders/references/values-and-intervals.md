# Values and Intervals

This guide covers how to configure value ranges, intervals, and numeric/date handling across all three slider controls.

## Table of Contents
- [Min and Max Properties](#min-and-max-properties)
- [Value Properties](#value-properties)
- [Interval Configuration](#interval-configuration)
- [Numeric Ranges](#numeric-ranges)
- [Date Ranges](#date-ranges)
- [Step Values](#step-values)
- [Value Formatting](#value-formatting)

## Min and Max Properties

All slider controls require `min` and `max` properties to define the value range.

### Default Values

```dart
// Default: min = 0.0, max = 1.0
SfSlider(
  value: 0.5,
  onChanged: (dynamic value) { },
)
```

### Custom Range

```dart
// Custom numeric range
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  onChanged: (dynamic value) { },
)

SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(25.0, 75.0),
  onChanged: (SfRangeValues values) { },
)
```

### Requirements

- `min` must be less than `max`
- Values must be within the `min` to `max` range
- Both must be the same type (both `double` or both `DateTime`)

## Value Properties

### SfSlider - Single Value

```dart
double _value = 40.0;

SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,  // Single value
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

### SfRangeSlider - Two Values

```dart
SfRangeValues _values = const SfRangeValues(40.0, 60.0);

SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: _values,  // SfRangeValues with start and end
  onChanged: (SfRangeValues newValues) {
    setState(() {
      _values = newValues;
    });
  },
)
```

### SfRangeSelector - InitialValues or Controller

```dart
// Option 1: initialValues
SfRangeSelector(
  min: 0.0,
  max: 100.0,
  initialValues: SfRangeValues(40.0, 60.0),
  onChanged: (SfRangeValues values) { },
  child: Container(/* child */),
)

// Option 2: controller
RangeController _controller = RangeController(start: 40.0, end: 60.0);

SfRangeSelector(
  min: 0.0,
  max: 100.0,
  controller: _controller,
  child: Container(/* child */),
)
```

## Interval Configuration

The `interval` property defines the spacing between labels and ticks.

### Basic Interval

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 20,  // Labels/ticks at 0, 20, 40, 60, 80, 100
  showLabels: true,
  showTicks: true,
  onChanged: (dynamic value) { },
)
```

### Auto Interval

If `interval` is not specified:
- **Numeric sliders**: No auto interval (won't show labels/ticks)
- **Date sliders**: MUST specify interval, `dateIntervalType`, and `dateFormat`

```dart
// Date slider - interval is mandatory
SfSlider(
  min: DateTime(2000, 01, 01),
  max: DateTime(2024, 01, 01),
  value: DateTime(2020, 01, 01),
  interval: 4,  // Every 4 years
  dateIntervalType: DateIntervalType.years,
  dateFormat: DateFormat.y(),
  showLabels: true,
  onChanged: (dynamic value) { },
)
```

### Choosing Interval Values

Good practice:

```dart
// For 0-100: use 10, 20, or 25
SfSlider(min: 0.0, max: 100.0, interval: 20, ...)

// For 0-1000: use 100, 200, or 250
SfRangeSlider(min: 0.0, max: 1000.0, interval: 200, ...)

// For dates: match natural periods
SfSlider(
  min: DateTime(2000),
  max: DateTime(2030),
  interval: 5,  // Every 5 years
  dateIntervalType: DateIntervalType.years,
  ...
)
```

## Numeric Ranges

### Integer-like Values

Use whole numbers for integer-like behavior:

```dart
double _value = 5.0;

SfSlider(
  min: 0.0,
  max: 10.0,
  value: _value,
  interval: 1,
  stepSize: 1.0,  // Snap to whole numbers
  showLabels: true,
  onChanged: (dynamic value) {
    setState(() {
      _value = value;
    });
  },
)
```

### Decimal Values

```dart
double _value = 5.5;

SfSlider(
  min: 0.0,
  max: 10.0,
  value: _value,
  interval: 2.5,
  showLabels: true,
  numberFormat: NumberFormat('#0.0'),  // Show one decimal
  onChanged: (dynamic value) {
    setState(() {
      _value = value;
    });
  },
)
```

### Large Ranges

```dart
SfRangeSlider(
  min: 0.0,
  max: 10000.0,
  values: SfRangeValues(2000.0, 8000.0),
  interval: 2000,
  showLabels: true,
  numberFormat: NumberFormat.compact(),  // 2K, 4K, 6K, etc.
  onChanged: (SfRangeValues values) { },
)
```

## Date Ranges

### Required Properties for Dates

When using `DateTime` values, you MUST specify:
1. `interval` - Numeric interval value
2. `dateIntervalType` - Type of interval (years, months, days, etc.)
3. `dateFormat` - How to format date labels

### DateIntervalType Options

```dart
DateIntervalType.years
DateIntervalType.months
DateIntervalType.days
DateIntervalType.hours
DateIntervalType.minutes
DateIntervalType.seconds
```

### Year-based Dates

```dart
SfSlider(
  min: DateTime(2000, 01, 01),
  max: DateTime(2024, 01, 01),
  value: DateTime(2020, 01, 01),
  interval: 4,
  dateIntervalType: DateIntervalType.years,
  dateFormat: DateFormat.y(),  // "2000", "2004", "2008", ...
  showLabels: true,
  onChanged: (dynamic value) { },
)
```

### Month-based Dates

```dart
SfRangeSlider(
  min: DateTime(2024, 01, 01),
  max: DateTime(2024, 12, 31),
  values: SfRangeValues(
    DateTime(2024, 03, 01),
    DateTime(2024, 09, 01)
  ),
  interval: 2,
  dateIntervalType: DateIntervalType.months,
  dateFormat: DateFormat.MMM(),  // "Jan", "Mar", "May", ...
  showLabels: true,
  onChanged: (SfRangeValues values) { },
)
```

### Day-based Dates

```dart
SfSlider(
  min: DateTime(2024, 01, 01),
  max: DateTime(2024, 01, 31),
  value: DateTime(2024, 01, 15),
  interval: 5,
  dateIntervalType: DateIntervalType.days,
  dateFormat: DateFormat.MMMd(),  // "Jan 1", "Jan 6", "Jan 11", ...
  showLabels: true,
  onChanged: (dynamic value) { },
)
```

### Time-based (Hours/Minutes)

```dart
SfRangeSlider(
  min: DateTime(2024, 01, 01, 0, 0),
  max: DateTime(2024, 01, 01, 23, 59),
  values: SfRangeValues(
    DateTime(2024, 01, 01, 9, 0),
    DateTime(2024, 01, 01, 17, 0)
  ),
  interval: 3,
  dateIntervalType: DateIntervalType.hours,
  dateFormat: DateFormat.jm(),  // "9:00 AM", "12:00 PM", ...
  showLabels: true,
  onChanged: (SfRangeValues values) { },
)
```

## Step Values

Control how values snap during interaction (not the same as interval):

### Discrete Steps

```dart
// Snap to multiples of 5
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  stepSize: 5.0,  // Values: 0, 5, 10, 15, 20, ...
  interval: 25,   // Labels: 0, 25, 50, 75, 100
  showLabels: true,
  onChanged: (dynamic value) {
    print('Value: $value');  // Always multiple of 5
  },
)
```

### Step Size vs Interval

- **`stepSize`**: Controls value snapping during dragging
- **`interval`**: Controls label/tick spacing (visual only)

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  stepSize: 1.0,    // Snap to integers
  interval: 10,     // Show labels every 10
  showLabels: true,
  onChanged: (dynamic value) { },
)
```

## Value Formatting

### Number Formatting

Use `NumberFormat` from the `intl` package:

```dart
import 'package:intl/intl.dart';

// Currency
SfSlider(
  min: 0.0,
  max: 1000.0,
  value: 500.0,
  interval: 250,
  showLabels: true,
  numberFormat: NumberFormat.currency(symbol: '\$'),  // "$0", "$250", "$500"
  onChanged: (dynamic value) { },
)

// Percentage
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(25.0, 75.0),
  interval: 25,
  showLabels: true,
  numberFormat: NumberFormat.percentPattern(),  // "0%", "25%", "50%"
  onChanged: (SfRangeValues values) { },
)

// Compact (K, M notation)
SfSlider(
  min: 0.0,
  max: 1000000.0,
  value: 500000.0,
  interval: 250000,
  showLabels: true,
  numberFormat: NumberFormat.compact(),  // "0", "250K", "500K", "750K", "1M"
  onChanged: (dynamic value) { },
)

// Custom pattern
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 20,
  showLabels: true,
  numberFormat: NumberFormat('#0°'),  // "0°", "20°", "40°"
  onChanged: (dynamic value) { },
)
```

### Date Formatting

Use `DateFormat` from the `intl` package:

```dart
import 'package:intl/intl.dart';

// Year only
dateFormat: DateFormat.y()  // "2024"

// Month and year
dateFormat: DateFormat.yMMM()  // "Jan 2024"

// Full date
dateFormat: DateFormat.yMMMd()  // "Jan 15, 2024"

// Month abbreviation
dateFormat: DateFormat.MMM()  // "Jan"

// Time
dateFormat: DateFormat.jm()  // "9:00 AM"

// Custom pattern
dateFormat: DateFormat('yyyy-MM-dd')  // "2024-01-15"
```

## Examples

### Example: Temperature Slider (Decimals)

```dart
double _temp = 22.5;

SfSlider(
  min: 16.0,
  max: 30.0,
  value: _temp,
  interval: 2,
  showLabels: true,
  showTicks: true,
  numberFormat: NumberFormat('#0.0°C'),
  onChanged: (dynamic value) {
    setState(() {
      _temp = value;
    });
  },
)
```

### Example: Price Range Filter

```dart
SfRangeValues _priceRange = SfRangeValues(100.0, 500.0);

SfRangeSlider(
  min: 0.0,
  max: 1000.0,
  values: _priceRange,
  interval: 200,
  stepSize: 10.0,  // Snap to $10 increments
  showLabels: true,
  numberFormat: NumberFormat.simpleCurrency(),
  onChanged: (SfRangeValues values) {
    setState(() {
      _priceRange = values;
    });
  },
)
```

### Example: Year Range Selector

```dart
SfRangeSelector(
  min: DateTime(2000, 01, 01),
  max: DateTime(2030, 01, 01),
  initialValues: SfRangeValues(
    DateTime(2010, 01, 01),
    DateTime(2025, 01, 01)
  ),
  interval: 5,
  dateIntervalType: DateIntervalType.years,
  dateFormat: DateFormat.y(),
  showLabels: true,
  showTicks: true,
  onChanged: (SfRangeValues values) {
    print('Range: ${values.start.year} - ${values.end.year}');
  },
  child: Container(/* chart */),
)
```

## Best Practices

1. **Choose appropriate intervals**: Match intervals to data scale and screen space
2. **Use step sizes for discrete values**: When only specific values are valid
3. **Format labels clearly**: Use `numberFormat` or `dateFormat` for readability
4. **Date sliders need all three**: `interval`, `dateIntervalType`, and `dateFormat`
5. **Match types**: Ensure min, max, and values are the same type
6. **Consider precision**: Use appropriate decimal places for numeric ranges
