# Event Handling and Callbacks

Handle user interactions with both Calendar and Date Range Picker components.

## onSelectionChanged

Triggered when date/time slot selection changes:

### Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  onSelectionChanged: (CalendarSelectionDetails details) {
    final DateTime? selectedDate = details.date;
    print('Selected: $selectedDate');
  },
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    // Value type depends on selection mode
    if (args.value is DateTime) {
      DateTime date = args.value;
    } else if (args.value is PickerDateRange) {
      PickerDateRange range = args.value;
    } else if (args.value is List<DateTime>) {
      List<DateTime> dates = args.value;
    }
  },
)
```

## onViewChanged

Triggered when visible dates change:

### Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  onViewChanged: (ViewChangedDetails details) {
    final List<DateTime> visibleDates = details.visibleDates;
    print('First visible: ${visibleDates.first}');
    print('Last visible: ${visibleDates.last}');
  },
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  onViewChanged: (DateRangePickerViewChangedArgs args) {
    final PickerDateRange visibleRange = args.visibleDateRange;
    print('Visible: ${visibleRange.startDate} to ${visibleRange.endDate}');
  },
)
```

## onTap (Calendar Only)

```dart
SfCalendar(
  view: CalendarView.week,
  onTap: (CalendarTapDetails details) {
    if (details.targetElement == CalendarElement.appointment) {
      final Appointment appointment = details.appointments!.first;
      _showAppointmentDetails(appointment);
    } else if (details.targetElement == CalendarElement.calendarCell) {
      _createNewAppointment(details.date!);
    }
  },
)
```

## onLongPress (Calendar Only)

```dart
SfCalendar(
  view: CalendarView.month,
  onLongPress: (CalendarLongPressDetails details) {
    if (details.targetElement == CalendarElement.appointment) {
      _showAppointmentOptions(details.appointments!.first);
    }
  },
)
```

## onSubmit & onCancel (Date Range Picker Only)

```dart
SfDateRangePicker(
  showActionButtons: true,
  onSubmit: (Object? value) {
    // User clicked confirm button
    if (value is PickerDateRange) {
      _applyDateFilter(value.startDate, value.endDate);
    }
    Navigator.pop(context);
  },
  onCancel: () {
    // User clicked cancel button
    Navigator.pop(context);
  },
)
```

## Complete Callback Example

```dart
class InteractiveCalendar extends StatefulWidget {
  @override
  _InteractiveCalendarState createState() => _InteractiveCalendarState();
}

class _InteractiveCalendarState extends State<InteractiveCalendar> {
  DateTime? _selectedDate;
  List<DateTime>? _visibleDates;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (_selectedDate != null)
          Text('Selected: $_selectedDate'),
        if (_visibleDates != null)
          Text('Showing: ${_visibleDates!.first} to ${_visibleDates!.last}'),
        Expanded(
          child: SfCalendar(
            view: CalendarView.month,
            onSelectionChanged: (CalendarSelectionDetails details) {
              setState(() {
                _selectedDate = details.date;
              });
            },
            onViewChanged: (ViewChangedDetails details) {
              setState(() {
                _visibleDates = details.visibleDates;
              });
            },
            onTap: (CalendarTapDetails details) {
              print('Tapped: ${details.date}');
            },
          ),
        ),
      ],
    );
  }
}
```

## Next Steps

- **Selections:** Read [selections.md](selections.md) for selection handling
- **Appointments:** Read [appointments.md](appointments.md) for appointment interactions
