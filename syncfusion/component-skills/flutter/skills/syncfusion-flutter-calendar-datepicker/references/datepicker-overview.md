# SfDateRangePicker (Date Range Picker) Overview

The Syncfusion Flutter Date Range Picker (`SfDateRangePicker`) is a lightweight widget focused on date selection, offering flexible selection modes and an intuitive interface for picking single dates, multiple dates, or date ranges.

## When to Use SfDateRangePicker

Use **SfDateRangePicker** when your application needs:

### Primary Use Cases:
- **Date input for forms** - Birthdate, start date, end date fields
- **Date range selection** - Report periods, booking dates, filter ranges
- **Multiple date selection** - Available dates, scheduled dates, holidays
- **Simple date picker dialogs** - With confirm/cancel buttons
- **Calendar-based date navigation** - Alternative to date input fields

### Choose SfDateRangePicker Over SfCalendar When:
- You need **date selection only** (no appointments/events)
- **Simplified date input** is the goal
- You need **multiple selection modes** (single, multiple, range, multi-range)
- **Action buttons** (confirm/cancel) are required
- **No time component** is needed
- Building **date filters** for reports or analytics
- Creating **booking date selectors** without scheduling features

## Key Features

### 1. Multiple Picker View Types (4 Views)

SfDateRangePicker provides four view modes for different granularities:

**Month View** - Traditional calendar showing all dates of a month
```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
)
```

**Year View** - Grid of 12 months for quick month selection
```dart
SfDateRangePicker(
  view: DateRangePickerView.year,
)
```

**Decade View** - Grid of 10 years for year selection
```dart
SfDateRangePicker(
  view: DateRangePickerView.decade,
)
```

**Century View** - Grid of 10 decades for century-wide navigation
```dart
SfDateRangePicker(
  view: DateRangePickerView.century,
)
```

### 2. Flexible Selection Modes

The primary feature distinguishing SfDateRangePicker from SfCalendar:

**Single Selection** - Select one date at a time
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.single,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    DateTime selectedDate = args.value;
  },
)
```

**Multiple Selection** - Select multiple independent dates
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.multiple,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    List<DateTime> selectedDates = args.value;
  },
)
```

**Range Selection** - Select a continuous date range
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    PickerDateRange range = args.value;
    DateTime? startDate = range.startDate;
    DateTime? endDate = range.endDate;
  },
)
```

**Multi-Range Selection** - Select multiple date ranges
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.multiRange,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    List<PickerDateRange> ranges = args.value;
  },
)
```

**Extendable Range** - Extend existing range from either end
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.extendableRange,
)
```

### 3. Action Buttons

Show confirm and cancel buttons for dialog-style date selection:

```dart
SfDateRangePicker(
  showActionButtons: true,
  confirmText: 'OK',
  cancelText: 'Cancel',
  onSubmit: (Object? value) {
    // User confirmed selection
    Navigator.pop(context);
  },
  onCancel: () {
    // User cancelled
    Navigator.pop(context);
  },
)
```

### 4. Today Button

Quickly navigate to today's date:

```dart
SfDateRangePicker(
  showTodayButton: true,
)
```

### 5. Multi-Picker View

Display two date pickers side by side for easy range selection:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.range,
  monthViewSettings: DateRangePickerMonthViewSettings(
    numberOfWeeksInView: 6,
    viewHeaderHeight: 50,
  ),
  enableMultiView: true,
  navigationDirection: DateRangePickerNavigationDirection.horizontal,
)
```

### 6. Date Restrictions

Limit selectable dates with various constraints:

**Min/Max Dates:**
```dart
SfDateRangePicker(
  minDate: DateTime(2020, 1, 1),
  maxDate: DateTime(2030, 12, 31),
)
```

**Enable/Disable Past Dates:**
```dart
SfDateRangePicker(
  enablePastDates: false, // Disable past dates
)
```

**Custom Date Validation:**
```dart
SfDateRangePicker(
  selectableDayPredicate: (DateTime date) {
    // Disable weekends
    return date.weekday != DateTime.saturday && 
           date.weekday != DateTime.sunday;
  },
)
```

### 7. Hijri Calendar Support

Display Islamic (Hijri) calendar alongside Gregorian:

```dart
SfHijriDateRangePicker(
  view: HijriDatePickerView.month,
  selectionMode: DateRangePickerSelectionMode.range,
)
```

### 8. Week Number Display

Show ISO week numbers in month view:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  monthViewSettings: DateRangePickerMonthViewSettings(
    showWeekNumber: true,
    weekNumberStyle: DateRangePickerWeekNumberStyle(
      backgroundColor: Colors.blue,
      textStyle: TextStyle(color: Colors.white),
    ),
  ),
)
```

### 9. Programmatic Selection

Set initial selections programmatically:

**Initial Selected Date (Single Mode):**
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.single,
  initialSelectedDate: DateTime.now(),
)
```

**Initial Selected Dates (Multiple Mode):**
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

**Initial Selected Range:**
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  initialSelectedRange: PickerDateRange(
    DateTime(2026, 3, 20),
    DateTime(2026, 3, 27),
  ),
)
```

**Initial Selected Ranges (Multi-Range Mode):**
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.multiRange,
  initialSelectedRanges: [
    PickerDateRange(DateTime(2026, 3, 1), DateTime(2026, 3, 5)),
    PickerDateRange(DateTime(2026, 3, 15), DateTime(2026, 3, 20)),
  ],
)
```

## Basic Date Picker Setup

### Minimal Configuration

```dart
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

SfDateRangePicker(
  view: DateRangePickerView.month,
)
```

### With Selection Mode

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.range,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    // Handle selection
  },
)
```

### With Customization

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.range,
  initialDisplayDate: DateTime(2026, 3, 1),
  minDate: DateTime(2020, 1, 1),
  maxDate: DateTime(2030, 12, 31),
  todayHighlightColor: Colors.blue,
  selectionColor: Colors.blue,
  rangeSelectionColor: Colors.blue.withOpacity(0.3),
  startRangeSelectionColor: Colors.blue,
  endRangeSelectionColor: Colors.blue,
  showActionButtons: true,
  onSubmit: (Object? value) {
    // Confirm selection
  },
  onCancel: () {
    // Cancel selection
  },
)
```

## Common Date Picker Workflows

### 1. Date Filter for Reports
```dart
// Select date range for filtering data
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  showActionButtons: true,
  onSubmit: (Object? value) {
    PickerDateRange range = value as PickerDateRange;
    _filterReports(range.startDate, range.endDate);
    Navigator.pop(context);
  },
)
```

### 2. Booking Date Selection
```dart
// Select check-in and check-out dates
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  minDate: DateTime.now(),
  enablePastDates: false,
  selectableDayPredicate: (DateTime date) {
    // Disable booked dates
    return !_bookedDates.contains(date);
  },
)
```

### 3. Multiple Date Picker
```dart
// Select multiple specific dates
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.multiple,
  initialSelectedDates: _selectedHolidays,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    setState(() {
      _selectedHolidays = args.value;
    });
  },
)
```

### 4. Simple Date Input
```dart
// Replace text field with date picker
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.single,
  showActionButtons: true,
  showTodayButton: true,
  onSubmit: (Object? value) {
    DateTime selected = value as DateTime;
    _updateDateField(selected);
    Navigator.pop(context);
  },
)
```

## Key Properties

### Essential Properties:
- `view` - DateRangePickerView type (month, year, decade, century)
- `selectionMode` - Selection mode (single, multiple, range, multiRange, extendableRange)
- `initialSelectedDate` - Initial selected date (single mode)
- `initialSelectedDates` - Initial selected dates (multiple mode)
- `initialSelectedRange` - Initial selected range (range mode)
- `initialSelectedRanges` - Initial selected ranges (multi-range mode)
- `initialDisplayDate` - Initial date to display
- `minDate` / `maxDate` - Date range restrictions
- `enablePastDates` - Allow/disallow past date selection
- `selectableDayPredicate` - Custom date validation function

### Action & Navigation:
- `showActionButtons` - Show confirm/cancel buttons
- `showTodayButton` - Show today button
- `confirmText` - Custom confirm button text
- `cancelText` - Custom cancel button text
- `allowViewNavigation` - Allow view switching

### Styling Properties:
- `todayHighlightColor` - Today's date color
- `selectionColor` - Selection color (single/multiple)
- `rangeSelectionColor` - Range selection fill color
- `startRangeSelectionColor` - Range start date color
- `endRangeSelectionColor` - Range end date color
- `monthCellStyle` - Month cell styling
- `yearCellStyle` - Year cell styling

### Callbacks:
- `onSelectionChanged` - Selection change callback
- `onViewChanged` - View change callback
- `onSubmit` - Confirm button callback
- `onCancel` - Cancel button callback

### Month View Settings:
- `monthViewSettings.firstDayOfWeek` - First day of week
- `monthViewSettings.showWeekNumber` - Display week numbers
- `monthViewSettings.blackoutDates` - Dates to disable
- `monthViewSettings.specialDates` - Dates to highlight

## Date Picker vs Calendar Decision Tree

**Choose SfDateRangePicker if:**
- ✅ You need date selection only (no events)
- ✅ Simple date input for forms
- ✅ Date range filtering
- ✅ Multiple date selection
- ✅ Confirm/cancel buttons needed
- ✅ No time component required
- ✅ Lightweight date selection

**Choose SfCalendar if:**
- ✅ You need to display appointments/events
- ✅ Scheduling functionality required
- ✅ Time-based views needed
- ✅ Drag-drop or resizing
- ✅ Recurring events
- ✅ Resource scheduling
- ✅ Timeline views beneficial

## Next Steps

- **Selections:** Read [selections.md](selections.md) for detailed selection mode usage
- **Views:** Read [views.md](views.md) for view types and configurations
- **Customization:** Read [customization.md](customization.md) for styling options
- **Advanced:** Read [advanced-features.md](advanced-features.md) for Hijri calendar, date restrictions
