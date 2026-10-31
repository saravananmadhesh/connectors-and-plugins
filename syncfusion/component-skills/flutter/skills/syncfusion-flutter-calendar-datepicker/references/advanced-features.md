# Advanced Features

## Table of Contents
- [Time Zones (Calendar)](#time-zones-calendar)
- [Resource View (Calendar)](#resource-view-calendar)
- [Drag and Drop (Calendar)](#drag-and-drop-calendar)
- [Appointment Resizing (Calendar)](#appointment-resizing-calendar)
- [Load More (Calendar)](#load-more-calendar)
- [Hijri Calendar (Date Range Picker)](#hijri-calendar-date-range-picker)
- [Action Buttons (Date Range Picker)](#action-buttons-date-range-picker)
- [Current Time Indicator (Calendar)](#current-time-indicator-calendar)

## Time Zones (Calendar)

Display appointments in different time zones:

```dart
// Set calendar time zone
SfCalendar(
  view: CalendarView.week,
  dataSource: _dataSource,
  timeZone: 'Pacific Standard Time',
)

// Appointment with specific time zone
Appointment(
  startTime: DateTime.utc(2026, 3, 20, 19, 0),
  endTime: DateTime.utc(2026, 3, 20, 20, 0),
  subject: 'International Meeting',
  startTimeZone: 'Eastern Standard Time',
  endTimeZone: 'Eastern Standard Time',
)
```

## Resource View (Calendar)

Schedule appointments across multiple resources:

```dart
class MeetingDataSource extends CalendarDataSource {
  MeetingDataSource(List<Appointment> appointments, List<CalendarResource> resources) {
    this.appointments = appointments;
    this.resources = resources;
  }
}

final List<CalendarResource> resources = [
  CalendarResource(
    displayName: 'John',
    id: '0001',
    color: Colors.blue,
  ),
  CalendarResource(
    displayName: 'Sarah',
    id: '0002',
    color: Colors.green,
  ),
];

SfCalendar(
  view: CalendarView.timelineWeek,
  dataSource: MeetingDataSource(_appointments, resources),
  resourceViewSettings: ResourceViewSettings(
    size: 150,
    showAvatar: true,
    displayNameTextStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
  ),
)
```

## Drag and Drop (Calendar)

Enable appointment rescheduling via drag-drop:

```dart
SfCalendar(
  view: CalendarView.week,
  dataSource: _dataSource,
  allowDragAndDrop: true,
  onDragStart: (AppointmentDragStartDetails details) {
    print('Drag started: ${details.appointment?.subject}');
  },
  onDragUpdate: (AppointmentDragUpdateDetails details) {
    print('Dragging to: ${details.draggingTime}');
  },
  onDragEnd: (AppointmentDragEndDetails details) {
    print('Dropped at: ${details.droppingTime}');
    // Update appointment in database
  },
)
```

## Appointment Resizing (Calendar)

Adjust appointment duration by resizing:

```dart
SfCalendar(
  view: CalendarView.week,
  dataSource: _dataSource,
  allowAppointmentResize: true,
  onAppointmentResizeStart: (AppointmentResizeStartDetails details) {
    print('Resize started');
  },
  onAppointmentResizeUpdate: (AppointmentResizeUpdateDetails details) {
    print('New time: ${details.resizingTime}');
  },
  onAppointmentResizeEnd: (AppointmentResizeEndDetails details) {
    print('Resized to: ${details.startTime} - ${details.endTime}');
    // Update appointment
  },
)
```

## Load More (Calendar)

Lazy-load appointments for schedule view:

```dart
SfCalendar(
  view: CalendarView.schedule,
  dataSource: _dataSource,
  loadMoreWidgetBuilder: (BuildContext context, LoadMoreCallback loadMoreAppointments) {
    return FutureBuilder<void>(
      future: loadMoreAppointments(),
      builder: (context, snapshot) {
        return Container(
          height: 50,
          child: snapshot.connectionState == ConnectionState.waiting
              ? CircularProgressIndicator()
              : Text('Load More'),
        );
      },
    );
  },
)
```

## Hijri Calendar (Date Range Picker)

Islamic calendar support:

```dart
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

SfHijriDateRangePicker(
  view: HijriDatePickerView.month,
  selectionMode: DateRangePickerSelectionMode.range,
  monthCellStyle: HijriDatePickerMonthCellStyle(
    todayTextStyle: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),
  ),
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    if (args.value is HijriDateRange) {
      HijriDateRange range = args.value;
      print('Hijri range: ${range.startDate} to ${range.endDate}');
    }
  },
)
```

## Action Buttons (Date Range Picker)

Confirm/cancel buttons for date selection:

```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  showActionButtons: true,
  confirmText: 'Apply',
  cancelText: 'Clear',
  onSubmit: (Object? value) {
    if (value is PickerDateRange) {
      _applyFilter(value.startDate, value.endDate);
    }
    Navigator.pop(context);
  },
  onCancel: () {
    Navigator.pop(context);
  },
)

// Today button
SfDateRangePicker(
  showTodayButton: true, // Quick jump to today
)
```

## Current Time Indicator (Calendar)

Show current time line in time slot views:

```dart
SfCalendar(
  view: CalendarView.day,
  showCurrentTimeIndicator: true,
  todayHighlightColor: Colors.red, // Color of indicator line
)
```

## Next Steps

- **Appointments:** Read [appointments.md](appointments.md) for appointment management
- **Selections:** Read [selections.md](selections.md) for selection modes
- **Views:** Read [views.md](views.md) for all view types
