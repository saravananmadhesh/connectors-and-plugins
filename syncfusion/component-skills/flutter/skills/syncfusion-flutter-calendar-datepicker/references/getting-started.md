# Getting Started with Syncfusion Flutter Calendar & Date Range Picker

This guide covers the setup and basic implementation for both **SfCalendar** (Event Calendar) and **SfDateRangePicker** (Date Range Picker) widgets.

## Installation

Both components are part of separate Syncfusion Flutter packages. Add the appropriate dependency to your `pubspec.yaml`:

### For Calendar (SfCalendar)

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_calendar
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### For Date Range Picker (SfDateRangePicker)

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_datepicker
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

## Import Packages

Import the appropriate package in your Dart code:

### For Calendar

```dart
import 'package:syncfusion_flutter_calendar/calendar.dart';
```

### For Date Range Picker

```dart
import 'package:syncfusion_flutter_datepicker/datepicker.dart';
```

## Basic Calendar Implementation

### Minimal Calendar Setup

The simplest calendar implementation displays the current month:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';

class BasicCalendar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My Calendar')),
      body: SfCalendar(
        view: CalendarView.month,
      ),
    );
  }
}
```

### Calendar with Appointments

To display events/appointments, create a data source:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';

class CalendarWithAppointments extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Calendar with Events')),
      body: SfCalendar(
        view: CalendarView.month,
        dataSource: MeetingDataSource(_getAppointments()),
        monthViewSettings: MonthViewSettings(
          appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
        ),
      ),
    );
  }

  List<Meeting> _getAppointments() {
    final List<Meeting> meetings = <Meeting>[];
    final DateTime today = DateTime.now();
    final DateTime startTime = DateTime(today.year, today.month, today.day, 9, 0, 0);
    final DateTime endTime = startTime.add(Duration(hours: 2));

    meetings.add(Meeting(
      'Conference',
      startTime,
      endTime,
      Color(0xFF0F8644),
      false,
    ));

    meetings.add(Meeting(
      'Team Meeting',
      DateTime(today.year, today.month, today.day + 1, 10, 0, 0),
      DateTime(today.year, today.month, today.day + 1, 11, 0, 0),
      Color(0xFFFF5722),
      false,
    ));

    return meetings;
  }
}

// Data source class
class MeetingDataSource extends CalendarDataSource {
  MeetingDataSource(List<Meeting> source) {
    appointments = source;
  }

  @override
  DateTime getStartTime(int index) {
    return appointments![index].from;
  }

  @override
  DateTime getEndTime(int index) {
    return appointments![index].to;
  }

  @override
  String getSubject(int index) {
    return appointments![index].eventName;
  }

  @override
  Color getColor(int index) {
    return appointments![index].background;
  }

  @override
  bool isAllDay(int index) {
    return appointments![index].isAllDay;
  }
}

// Meeting model class
class Meeting {
  Meeting(this.eventName, this.from, this.to, this.background, this.isAllDay);

  String eventName;
  DateTime from;
  DateTime to;
  Color background;
  bool isAllDay;
}
```

## Basic Date Range Picker Implementation

### Minimal Date Picker Setup

The simplest date picker displays the current month:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

class BasicDatePicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Select Date')),
      body: SfDateRangePicker(
        view: DateRangePickerView.month,
      ),
    );
  }
}
```

### Date Picker with Selection Callback

Capture selected dates using the `onSelectionChanged` callback:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

class DatePickerWithCallback extends StatefulWidget {
  @override
  _DatePickerWithCallbackState createState() => _DatePickerWithCallbackState();
}

class _DatePickerWithCallbackState extends State<DatePickerWithCallback> {
  DateTime? _selectedDate;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select Date'),
      ),
      body: Column(
        children: [
          Container(
            height: 400,
            child: SfDateRangePicker(
              view: DateRangePickerView.month,
              selectionMode: DateRangePickerSelectionMode.single,
              onSelectionChanged: _onSelectionChanged,
              todayHighlightColor: Colors.blue,
            ),
          ),
          if (_selectedDate != null)
            Padding(
              padding: EdgeInsets.all(16),
              child: Text(
                'Selected Date: ${_selectedDate!.day}/${_selectedDate!.month}/${_selectedDate!.year}',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
        ],
      ),
    );
  }

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    setState(() {
      _selectedDate = args.value as DateTime;
    });
  }
}
```

### Date Range Picker with Range Selection

Select a range of dates:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

class RangeDatePicker extends StatefulWidget {
  @override
  _RangeDatePickerState createState() => _RangeDatePickerState();
}

class _RangeDatePickerState extends State<RangeDatePicker> {
  PickerDateRange? _selectedRange;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Select Date Range')),
      body: Column(
        children: [
          Container(
            height: 400,
            child: SfDateRangePicker(
              view: DateRangePickerView.month,
              selectionMode: DateRangePickerSelectionMode.range,
              onSelectionChanged: _onSelectionChanged,
              rangeSelectionColor: Colors.blue.withOpacity(0.3),
              startRangeSelectionColor: Colors.blue,
              endRangeSelectionColor: Colors.blue,
            ),
          ),
          if (_selectedRange != null)
            Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                children: [
                  Text(
                    'Start Date: ${_selectedRange!.startDate?.day}/${_selectedRange!.startDate?.month}/${_selectedRange!.startDate?.year}',
                    style: TextStyle(fontSize: 14),
                  ),
                  if (_selectedRange!.endDate != null)
                    Text(
                      'End Date: ${_selectedRange!.endDate!.day}/${_selectedRange!.endDate!.month}/${_selectedRange!.endDate!.year}',
                      style: TextStyle(fontSize: 14),
                    ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    setState(() {
      _selectedRange = args.value as PickerDateRange;
    });
  }
}
```

## Quick Comparison Table

| Feature | SfCalendar | SfDateRangePicker |
|---------|-----------|-------------------|
| **Package** | `syncfusion_flutter_calendar` | `syncfusion_flutter_datepicker` |
| **Main Class** | `SfCalendar` | `SfDateRangePicker` |
| **Primary Use** | Event scheduling & display | Date selection |
| **Appointments** | ✅ Yes | ❌ No |
| **Time Slots** | ✅ Yes | ❌ No |
| **View Types** | 9 types | 4 types |
| **Selection Modes** | Single | Single, multiple, range, multi-range |
| **Action Buttons** | ❌ No | ✅ Yes (confirm/cancel) |

## Common First Steps

### Step 1: Add Dependency
Choose the appropriate package based on your needs (calendar for events, date picker for selection).

### Step 2: Import Package
Import the correct package in your Dart file.

### Step 3: Basic Widget
Start with a minimal implementation using default settings.

### Step 4: Add Functionality
- For Calendar: Add data source with appointments
- For Date Picker: Add selection callback and handle selection mode

### Step 5: Customize
Apply styling, configure views, and add custom behaviors.

## Next Steps

- **Calendar Users:** Read [calendar-overview.md](calendar-overview.md) for calendar-specific features
- **Date Picker Users:** Read [datepicker-overview.md](datepicker-overview.md) for picker-specific features
- **View Configuration:** Read [views.md](views.md) to understand different view types
- **Styling:** Read [customization.md](customization.md) for appearance customization
