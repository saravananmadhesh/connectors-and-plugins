# Date Selection Modes (Date Range Picker)

**Note:** Selection modes are exclusive to **SfDateRangePicker** only. SfCalendar has simple single-date selection without these modes.

## Table of Contents
- [Overview](#overview)
- [Selection Modes](#selection-modes)
- [Programmatic Selection](#programmatic-selection)
- [Selection Callbacks](#selection-callbacks)
- [Selection Customization](#selection-customization)

## Overview

SfDateRangePicker supports five flexible selection modes, making it ideal for various date input scenarios from simple date picking to complex multi-range selection.

## Selection Modes

### Single Selection (Default)

Select one date at a time:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.single,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    DateTime selectedDate = args.value;
    print('Selected: $selectedDate');
  },
)
```

**Use Cases:**
- Birthdate selection
- Event date picker
- Deadline selection
- Any single-date input

### Multiple Selection

Select multiple independent dates:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.multiple,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    List<DateTime> selectedDates = args.value;
    print('Selected ${selectedDates.length} dates');
  },
)
```

**Features:**
- Tap to select, tap again to deselect
- No limit on number of dates
- Dates don't need to be consecutive

**Use Cases:**
- Select multiple meeting dates
- Holiday selection
- Available dates for booking
- Multi-day event selection (non-consecutive)

### Range Selection

Select a continuous range of dates (start and end):

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.range,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    PickerDateRange selectedRange = args.value;
    DateTime? startDate = selectedRange.startDate;
    DateTime? endDate = selectedRange.endDate;
    
    if (endDate != null) {
      int daysDifference = endDate.difference(startDate!).inDays;
      print('Range: $startDate to $endDate ($daysDifference days)');
    }
  },
)
```

**Behavior:**
- First tap: Select start date
- Second tap: Select end date and fill range
- Third tap: Start new range

**Use Cases:**
- Booking check-in/check-out dates
- Report date range filter
- Vacation date selection
- Project date range

### Multi-Range Selection

Select multiple separate date ranges:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.multiRange,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    List<PickerDateRange> selectedRanges = args.value;
    print('Selected ${selectedRanges.length} ranges');
    
    for (var range in selectedRanges) {
      print('Range: ${range.startDate} to ${range.endDate}');
    }
  },
)
```

**Use Cases:**
- Multiple vacation periods
- Multiple availability windows
- Busy periods selection
- Multiple project phases

### Extendable Range Selection

Extend an existing range from either end:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.extendableRange,
  extendableRangeSelectionDirection: ExtendableRangeSelectionDirection.both,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    PickerDateRange range = args.value;
    print('Extended range: ${range.startDate} to ${range.endDate}');
  },
)
```

**Extendable Range Directions:**

**Both (Default)** - Extend from either end:
```dart
extendableRangeSelectionDirection: ExtendableRangeSelectionDirection.both,
```

**Forward Only** - Extend end date only (start date fixed):
```dart
extendableRangeSelectionDirection: ExtendableRangeSelectionDirection.forward,
```

**Backward Only** - Extend start date only (end date fixed):
```dart
extendableRangeSelectionDirection: ExtendableRangeSelectionDirection.backward,
```

**None** - Disable extension:
```dart
extendableRangeSelectionDirection: ExtendableRangeSelectionDirection.none,
```

**Use Cases:**
- Adjust booking dates
- Extend project timelines
- Flexible date range modification

## Programmatic Selection

Set initial selections programmatically:

### Single Mode

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.single,
  initialSelectedDate: DateTime(2026, 3, 20),
)
```

### Multiple Mode

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.multiple,
  initialSelectedDates: [
    DateTime(2026, 3, 20),
    DateTime(2026, 3, 25),
    DateTime(2026, 3, 30),
  ],
)
```

### Range Mode

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  initialSelectedRange: PickerDateRange(
    DateTime(2026, 3, 20),
    DateTime(2026, 3, 27),
  ),
)
```

### Multi-Range Mode

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.multiRange,
  initialSelectedRanges: [
    PickerDateRange(DateTime(2026, 3, 1), DateTime(2026, 3, 5)),
    PickerDateRange(DateTime(2026, 3, 15), DateTime(2026, 3, 20)),
    PickerDateRange(DateTime(2026, 3, 25), DateTime(2026, 3, 28)),
  ],
)
```

## Selection Callbacks

### onSelectionChanged

Capture selection changes:

```dart
class DatePickerExample extends StatefulWidget {
  @override
  _DatePickerExampleState createState() => _DatePickerExampleState();
}

class _DatePickerExampleState extends State<DatePickerExample> {
  String _selectionInfo = 'No selection';

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    setState(() {
      if (args.value is DateTime) {
        // Single mode
        DateTime date = args.value;
        _selectionInfo = 'Selected: ${date.toLocal()}';
      } else if (args.value is List<DateTime>) {
        // Multiple mode
        List<DateTime> dates = args.value;
        _selectionInfo = 'Selected ${dates.length} dates';
      } else if (args.value is PickerDateRange) {
        // Range mode
        PickerDateRange range = args.value;
        _selectionInfo = 'Range: ${range.startDate} to ${range.endDate ?? "selecting..."}';
      } else if (args.value is List<PickerDateRange>) {
        // Multi-range mode
        List<PickerDateRange> ranges = args.value;
        _selectionInfo = 'Selected ${ranges.length} ranges';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 400,
          child: SfDateRangePicker(
            selectionMode: DateRangePickerSelectionMode.range,
            onSelectionChanged: _onSelectionChanged,
          ),
        ),
        Padding(
          padding: EdgeInsets.all(16),
          child: Text(_selectionInfo),
        ),
      ],
    );
  }
}
```

### Use with Action Buttons

```dart
class DatePickerDialog extends StatefulWidget {
  @override
  _DatePickerDialogState createState() => _DatePickerDialogState();
}

class _DatePickerDialogState extends State<DatePickerDialog> {
  PickerDateRange? _selectedRange;

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        height: 500,
        child: SfDateRangePicker(
          selectionMode: DateRangePickerSelectionMode.range,
          showActionButtons: true,
          onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
            setState(() {
              _selectedRange = args.value as PickerDateRange;
            });
          },
          onSubmit: (Object? value) {
            // User confirmed selection
            if (_selectedRange != null && _selectedRange!.endDate != null) {
              Navigator.pop(context, _selectedRange);
            } else {
              // Show error - incomplete range
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Please select a complete range')),
              );
            }
          },
          onCancel: () {
            Navigator.pop(context, null);
          },
        ),
      ),
    );
  }
}
```

## Selection Customization

### Selection Shape

Change the shape of selected dates:

**Circle (Default):**
```dart
SfDateRangePicker(
  selectionShape: DateRangePickerSelectionShape.circle,
)
```

**Rectangle:**
```dart
SfDateRangePicker(
  selectionShape: DateRangePickerSelectionShape.rectangle,
)
```

### Selection Radius

Customize the corner radius of selections:

```dart
SfDateRangePicker(
  selectionRadius: 15, // Default is 20
  selectionShape: DateRangePickerSelectionShape.rectangle,
)
```

### Selection Colors

Customize selection colors for different modes:

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  // Single/Multiple selection color
  selectionColor: Colors.blue,
  // Range selection fill color
  rangeSelectionColor: Colors.blue.withOpacity(0.3),
  // Start date color
  startRangeSelectionColor: Colors.blue,
  // End date color
  endRangeSelectionColor: Colors.blue,
  // Today's date highlight
  todayHighlightColor: Colors.orange,
)
```

### Toggle Day Selection

Allow deselecting selected dates:

```dart
SfDateRangePicker(
  toggleDaySelection: true, // Tap selected date to deselect
)
```

### Enable/Disable Swipe Selection

Control swipe-to-select behavior:

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  monthViewSettings: DateRangePickerMonthViewSettings(
    enableSwipeSelection: false, // Disable swipe selection
  ),
)
```

**Note:** When enabled (default), users can swipe across dates to select a range quickly.

## Selection in Year/Decade/Century Views

When `allowViewNavigation` is false, you can select in higher-level views:

```dart
SfDateRangePicker(
  view: DateRangePickerView.year,
  allowViewNavigation: false, // Enable selection in year view
  selectionMode: DateRangePickerSelectionMode.range,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    // Selecting "May" in year view returns May 1st
    // Range "May-June" returns May 1 to June 30
  },
)
```

**Return Values:**
- **Year View:** Selecting "May" returns `DateTime(year, 5, 1)`
- **Decade View:** Selecting "2025" returns `DateTime(2025, 1, 1)`
- **Century View:** Selecting "2020-2029" returns `DateTime(2020, 1, 1)`

## Common Selection Patterns

### Pattern 1: Date Range with Validation

```dart
void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
  if (args.value is PickerDateRange) {
    PickerDateRange range = args.value;
    
    if (range.endDate != null) {
      int days = range.endDate!.difference(range.startDate!).inDays;
      
      if (days > 30) {
        // Show error - range too long
        _showError('Please select a range of 30 days or less');
        return;
      }
      
      if (days < 2) {
        // Show error - minimum 2 days
        _showError('Please select at least 2 days');
        return;
      }
      
      // Valid range
      _applyDateFilter(range.startDate!, range.endDate!);
    }
  }
}
```

### Pattern 2: Multiple Dates with Limit

```dart
void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
  if (args.value is List<DateTime>) {
    List<DateTime> dates = args.value;
    
    if (dates.length > 10) {
      _showError('Maximum 10 dates allowed');
      // Reset to previous selection
      return;
    }
    
    setState(() {
      _selectedDates = dates;
    });
  }
}
```

### Pattern 3: Conditional Selection Based on Day

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.multiple,
  selectableDayPredicate: (DateTime date) {
    // Only allow weekdays
    return date.weekday != DateTime.saturday && 
           date.weekday != DateTime.sunday;
  },
)
```

### Pattern 4: Range with Min/Max Days

While there's no built-in property, validate in callback:

```dart
int? _minDays = 3;
int? _maxDays = 14;

void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
  if (args.value is PickerDateRange) {
    PickerDateRange range = args.value;
    
    if (range.endDate != null) {
      int days = range.endDate!.difference(range.startDate!).inDays + 1;
      
      if (_minDays != null && days < _minDays!) {
        _showError('Minimum ${_minDays} days required');
        return;
      }
      
      if (_maxDays != null && days > _maxDays!) {
        _showError('Maximum ${_maxDays} days allowed');
        return;
      }
      
      // Valid range
      _handleValidRange(range);
    }
  }
}
```

## Selection Best Practices

1. **Choose the right mode** based on user needs
   - Single: Simple date input
   - Multiple: Non-consecutive dates
   - Range: Continuous period
   - Multi-range: Multiple periods
   - Extendable: Adjustable ranges

2. **Provide visual feedback** with appropriate colors and shapes

3. **Validate selections** in callbacks before proceeding

4. **Show selection summary** below the picker for confirmation

5. **Use action buttons** for dialog-style pickers to confirm/cancel

6. **Handle incomplete ranges** gracefully (when end date is null)

7. **Consider swipe selection** for better UX in range mode

## Next Steps

- **Date Restrictions:** Read [date-navigations.md](date-navigations.md) for min/max dates and blackout dates
- **Callbacks:** Read [callbacks.md](callbacks.md) for all callback options
- **Customization:** Read [customization.md](customization.md) for styling selections
- **Advanced:** Read [advanced-features.md](advanced-features.md) for action buttons and advanced features
