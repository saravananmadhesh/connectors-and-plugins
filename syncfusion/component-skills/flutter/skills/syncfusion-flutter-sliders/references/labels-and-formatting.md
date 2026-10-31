# Labels and Formatting

This guide covers label display, positioning, formatting, and customization across all slider controls.

## Table of Contents
- [Showing Labels](#showing-labels)
- [Label Positioning](#label-positioning)
- [Number Formatting](#number-formatting)
- [Date Formatting](#date-formatting)
- [Custom Label Formatter](#custom-label-formatter)
- [Label Styles](#label-styles)

## Showing Labels

Labels display values at interval positions along the slider.

### Enable Labels

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 25,
  showLabels: true,  // Display labels at intervals
  onChanged: (dynamic value) { },
)
```

### Labels Require Interval

Labels appear at positions defined by the `interval` property:

```dart
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(30.0, 70.0),
  interval: 20,      // Labels at 0, 20, 40, 60, 80, 100
  showLabels: true,
  onChanged: (SfRangeValues values) { },
)
```

### All Three Widgets

```dart
// SfSlider
SfSlider(
  value: _value,
  interval: 20,
  showLabels: true,
  onChanged: (dynamic value) { },
)

// SfRangeSlider
SfRangeSlider(
  values: _values,
  interval: 20,
  showLabels: true,
  onChanged: (SfRangeValues values) { },
)

// SfRangeSelector
SfRangeSelector(
  initialValues: _values,
  interval: 20,
  showLabels: true,
  child: Container(/* child */),
)
```

## Label Positioning

Labels can be positioned below or inside the track.

### Label Placement (Horizontal Sliders)

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    labelPlacement: LabelPlacement.betweenTicks,  // Default: below ticks
  ),
  child: SfSlider(
    value: _value,
    interval: 20,
    showLabels: true,
    showTicks: true,
    onChanged: (dynamic value) { },
  ),
)
```

Options:
- `LabelPlacement.betweenTicks` - Labels centered between ticks
- `LabelPlacement.onTicks` - Labels aligned with ticks

### Label Offset

Adjust label distance from track:

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    labelOffset: Offset(0, 10),  // Move labels 10 pixels down
  ),
  child: SfSlider(
    value: _value,
    interval: 20,
    showLabels: true,
    onChanged: (dynamic value) { },
  ),
)
```

### Vertical Slider Labels

Labels appear to the right of vertical sliders:

```dart
SfSlider.vertical(
  value: _value,
  interval: 25,
  showLabels: true,
  onChanged: (dynamic value) { },
)
```

## Number Formatting

Format numeric labels using `NumberFormat` from the `intl` package.

### Import Package

```dart
import 'package:intl/intl.dart';
```

### Currency Format

```dart
SfSlider(
  min: 0.0,
  max: 1000.0,
  value: 500.0,
  interval: 250,
  showLabels: true,
  numberFormat: NumberFormat.currency(symbol: '\$', decimalDigits: 0),
  onChanged: (dynamic value) { },
)
// Labels: $0, $250, $500, $750, $1000
```

### Percentage Format

```dart
SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: SfRangeValues(25.0, 75.0),
  interval: 25,
  showLabels: true,
  numberFormat: NumberFormat.percentPattern(),
  onChanged: (SfRangeValues values) { },
)
// Labels: 0%, 25%, 50%, 75%, 100%
```

### Compact Format (K, M notation)

```dart
SfSlider(
  min: 0.0,
  max: 1000000.0,
  value: 500000.0,
  interval: 250000,
  showLabels: true,
  numberFormat: NumberFormat.compact(),
  onChanged: (dynamic value) { },
)
// Labels: 0, 250K, 500K, 750K, 1M
```

### Custom Pattern

```dart
// Add prefix/suffix
SfSlider(
  min: 16.0,
  max: 30.0,
  value: 22.0,
  interval: 2,
  showLabels: true,
  numberFormat: NumberFormat('#0°C'),  // Temperature format
  onChanged: (dynamic value) { },
)
// Labels: 16°C, 18°C, 20°C, 22°C, ...

// Decimal places
SfRangeSlider(
  min: 0.0,
  max: 10.0,
  values: SfRangeValues(2.5, 7.5),
  interval: 2.5,
  showLabels: true,
  numberFormat: NumberFormat('#0.0'),
  onChanged: (SfRangeValues values) { },
)
// Labels: 0.0, 2.5, 5.0, 7.5, 10.0
```

### Simple Prefix/Suffix

```dart
// Dollar sign prefix
numberFormat: NumberFormat('\$#')

// Degree suffix
numberFormat: NumberFormat('#°')

// Percentage
numberFormat: NumberFormat('#%')

// Multiple decimals
numberFormat: NumberFormat('#0.00')
```

## Date Formatting

Format date labels using `DateFormat` from the `intl` package.

### Import Package

```dart
import 'package:intl/intl.dart';
```

### Date Sliders Require Format

For date-based sliders, you MUST provide:
1. `dateFormat` - How to display dates
2. `dateIntervalType` - Type of interval
3. `interval` - Numeric interval value

### Year Format

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

### Month and Year

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
  dateFormat: DateFormat.yMMM(),  // "Jan 2024", "Mar 2024", ...
  showLabels: true,
  onChanged: (SfRangeValues values) { },
)
```

### Month Abbreviation Only

```dart
SfSlider(
  min: DateTime(2024, 01, 01),
  max: DateTime(2024, 12, 31),
  value: DateTime(2024, 06, 01),
  interval: 3,
  dateIntervalType: DateIntervalType.months,
  dateFormat: DateFormat.MMM(),  // "Jan", "Apr", "Jul", "Oct"
  showLabels: true,
  onChanged: (dynamic value) { },
)
```

### Full Date

```dart
SfRangeSlider(
  min: DateTime(2024, 01, 01),
  max: DateTime(2024, 01, 31),
  values: SfRangeValues(
    DateTime(2024, 01, 10),
    DateTime(2024, 01, 20)
  ),
  interval: 5,
  dateIntervalType: DateIntervalType.days,
  dateFormat: DateFormat.MMMd(),  // "Jan 1", "Jan 6", "Jan 11", ...
  showLabels: true,
  onChanged: (SfRangeValues values) { },
)
```

### Time Format

```dart
SfSlider(
  min: DateTime(2024, 01, 01, 0, 0),
  max: DateTime(2024, 01, 01, 23, 59),
  value: DateTime(2024, 01, 01, 12, 0),
  interval: 3,
  dateIntervalType: DateIntervalType.hours,
  dateFormat: DateFormat.jm(),  // "12:00 AM", "3:00 AM", "6:00 AM", ...
  showLabels: true,
  onChanged: (dynamic value) { },
)
```

### Custom Date Pattern

```dart
// ISO format
dateFormat: DateFormat('yyyy-MM-dd')  // "2024-01-15"

// Short date
dateFormat: DateFormat.yMd()  // "1/15/2024"

// Full month name
dateFormat: DateFormat.yMMMM()  // "January 2024"

// Day name
dateFormat: DateFormat.E()  // "Mon", "Tue", ...
```

## Custom Label Formatter

Use `labelFormatterCallback` for complete control over label text.

### Basic Custom Formatter

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 25,
  showLabels: true,
  labelFormatterCallback: (dynamic actualValue, String formattedText) {
    return '\$${actualValue.toInt()}';
  },
  onChanged: (dynamic value) { },
)
```

### Custom Date Labels

```dart
SfRangeSlider(
  min: DateTime(2024, 01, 01),
  max: DateTime(2024, 12, 31),
  values: _values,
  interval: 2,
  dateIntervalType: DateIntervalType.months,
  dateFormat: DateFormat.MMM(),
  showLabels: true,
  labelFormatterCallback: (dynamic actualValue, String formattedText) {
    // actualValue is DateTime, formattedText is "Jan", "Mar", etc.
    return formattedText.toUpperCase();  // "JAN", "MAR", etc.
  },
  onChanged: (SfRangeValues values) { },
)
```

### Conditional Formatting

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: 50.0,
  interval: 20,
  showLabels: true,
  labelFormatterCallback: (dynamic actualValue, String formattedText) {
    if (actualValue == 0) return 'Min';
    if (actualValue == 100) return 'Max';
    return actualValue.toInt().toString();
  },
  onChanged: (dynamic value) { },
)
// Labels: "Min", "20", "40", "60", "80", "Max"
```

### Range Selector Custom Labels

```dart
SfRangeSelector(
  min: 2.0,
  max: 10.0,
  initialValues: SfRangeValues(4.0, 8.0),
  interval: 2,
  showLabels: true,
  labelFormatterCallback: (dynamic actualValue, String formattedText) {
    return '${actualValue.toInt()}x';
  },
  child: Container(/* child */),
)
// Labels: "2x", "4x", "6x", "8x", "10x"
```

## Label Styles

Customize label text appearance using theme data.

### Label Text Style

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    activeLabelStyle: TextStyle(
      color: Colors.blue,
      fontSize: 14,
      fontWeight: FontWeight.bold,
    ),
    inactiveLabelStyle: TextStyle(
      color: Colors.grey,
      fontSize: 12,
      fontWeight: FontWeight.normal,
    ),
  ),
  child: SfSlider(
    value: _value,
    interval: 20,
    showLabels: true,
    onChanged: (dynamic value) { },
  ),
)
```

### Range Slider Label Styles

```dart
SfRangeSliderTheme(
  data: SfRangeSliderThemeData(
    activeLabelStyle: TextStyle(
      color: Colors.green,
      fontSize: 13,
      fontWeight: FontWeight.w600,
    ),
    inactiveLabelStyle: TextStyle(
      color: Colors.grey[400],
      fontSize: 13,
    ),
  ),
  child: SfRangeSlider(
    values: _values,
    interval: 25,
    showLabels: true,
    onChanged: (SfRangeValues values) { },
  ),
)
```

### Range Selector Label Styles

```dart
SfRangeSelectorTheme(
  data: SfRangeSelectorThemeData(
    activeLabelStyle: TextStyle(
      color: Colors.orange,
      fontSize: 12,
    ),
    inactiveLabelStyle: TextStyle(
      color: Colors.grey,
      fontSize: 12,
    ),
  ),
  child: SfRangeSelector(
    initialValues: _values,
    interval: 1,
    showLabels: true,
    child: Container(/* child */),
  ),
)
```

## Complete Examples

### Example 1: Currency Slider

```dart
class CurrencySlider extends StatefulWidget {
  @override
  _CurrencySliderState createState() => _CurrencySliderState();
}

class _CurrencySliderState extends State<CurrencySlider> {
  double _amount = 5000.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          NumberFormat.currency(symbol: '\$', decimalDigits: 0).format(_amount),
          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        SfSliderTheme(
          data: SfSliderThemeData(
            activeLabelStyle: TextStyle(
              color: Colors.green,
              fontSize: 13,
              fontWeight: FontWeight.w500,
            ),
          ),
          child: SfSlider(
            min: 0.0,
            max: 10000.0,
            value: _amount,
            interval: 2500,
            showLabels: true,
            showTicks: true,
            numberFormat: NumberFormat.compactCurrency(symbol: '\$', decimalDigits: 0),
            activeColor: Colors.green,
            onChanged: (dynamic value) {
              setState(() {
                _amount = value;
              });
            },
          ),
        ),
      ],
    );
  }
}
```

### Example 2: Date Range Filter

```dart
class DateRangeFilter extends StatefulWidget {
  @override
  _DateRangeFilterState createState() => _DateRangeFilterState();
}

class _DateRangeFilterState extends State<DateRangeFilter> {
  SfRangeValues _dateRange = SfRangeValues(
    DateTime(2024, 01, 01),
    DateTime(2024, 12, 31)
  );

  @override
  Widget build(BuildContext context) {
    return SfRangeSliderTheme(
      data: SfRangeSliderThemeData(
        activeLabelStyle: TextStyle(
          color: Colors.blue,
          fontSize: 12,
        ),
      ),
      child: SfRangeSlider(
        min: DateTime(2020, 01, 01),
        max: DateTime(2025, 01, 01),
        values: _dateRange,
        interval: 1,
        dateIntervalType: DateIntervalType.years,
        dateFormat: DateFormat.y(),
        showLabels: true,
        showTicks: true,
        onChanged: (SfRangeValues values) {
          setState(() {
            _dateRange = values;
          });
        },
      ),
    );
  }
}
```

### Example 3: Custom Formatter with Units

```dart
class DistanceSlider extends StatefulWidget {
  @override
  _DistanceSliderState createState() => _DistanceSliderState();
}

class _DistanceSliderState extends State<DistanceSlider> {
  double _distance = 50.0;

  @override
  Widget build(BuildContext context) {
    return SfSlider(
      min: 0.0,
      max: 100.0,
      value: _distance,
      interval: 25,
      showLabels: true,
      showTicks: true,
      labelFormatterCallback: (dynamic actualValue, String formattedText) {
        return '${actualValue.toInt()} km';
      },
      activeColor: Colors.purple,
      onChanged: (dynamic value) {
        setState(() {
          _distance = value;
        });
      },
    );
  }
}
```

## Best Practices

1. **Always set interval**: Labels require `interval` to determine positions
2. **Format for clarity**: Use `numberFormat` or `dateFormat` for readable labels
3. **Keep labels concise**: Short labels prevent overlap and clutter
4. **Test label spacing**: Ensure labels don't overlap at small screen sizes
5. **Match tick and label display**: Usually show both together
6. **Use custom formatter sparingly**: Only when built-in formats don't suffice
7. **Style active/inactive**: Differentiate labels in active vs inactive regions
8. **Consider compact notation**: For large numbers, use `NumberFormat.compact()`

## Common Label Configurations

### Configuration 1: Simple Numbers
```dart
interval: 20
showLabels: true
```

### Configuration 2: Currency
```dart
interval: 250
showLabels: true
numberFormat: NumberFormat.simpleCurrency(decimalDigits: 0)
```

### Configuration 3: Percentage
```dart
interval: 25
showLabels: true
numberFormat: NumberFormat.percentPattern()
```

### Configuration 4: Years
```dart
interval: 5
dateIntervalType: DateIntervalType.years
dateFormat: DateFormat.y()
showLabels: true
```

### Configuration 5: Custom Units
```dart
interval: 10
showLabels: true
labelFormatterCallback: (value, text) => '${value.toInt()}°'
```
