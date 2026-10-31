# Calendar Appointments (Events and Scheduling)

## Table of Contents
- [Overview](#overview)
- [Appointment Class](#appointment-class)
- [CalendarDataSource Setup](#calendardatasource-setup)
- [Custom Appointment Mapping](#custom-appointment-mapping)
- [All-Day Appointments](#all-day-appointments)
- [Recurring Appointments](#recurring-appointments)
- [Time Zone Support](#time-zone-support)
- [Appointment Display Modes](#appointment-display-modes)
- [Data Source Manipulation](#data-source-manipulation)

## Overview

**Note:** Appointments are exclusive to **SfCalendar** only. SfDateRangePicker does not support appointments.

Appointments (also called events or meetings) are the core feature of SfCalendar, representing scheduled time blocks with details like subject, time, color, and recurrence. The calendar automatically arranges and displays appointments based on the provided data source.

## Appointment Class

The built-in `Appointment` class provides all essential properties for calendar events:

### Basic Appointment

```dart
Appointment appointment = Appointment(
  startTime: DateTime(2026, 3, 20, 10, 0),
  endTime: DateTime(2026, 3, 20, 11, 0),
  subject: 'Team Meeting',
  color: Colors.blue,
  isAllDay: false,
);
```

### Appointment Properties

| Property | Type | Description |
|----------|------|-------------|
| `startTime` | DateTime | Start date and time |
| `endTime` | DateTime | End date and time |
| `subject` | String | Appointment title/description |
| `color` | Color | Background color |
| `isAllDay` | bool | All-day event flag |
| `notes` | String | Additional notes/description |
| `location` | String | Meeting location |
| `startTimeZone` | String | Start time zone (e.g., 'UTC', 'EST') |
| `endTimeZone` | String | End time zone |
| `recurrenceRule` | String | Recurrence pattern (RRULE format) |
| `recurrenceExceptionDates` | List<DateTime> | Dates to skip in recurrence |
| `id` | Object | Unique identifier |
| `resourceIds` | List<Object> | Associated resource IDs |

### Complete Appointment Example

```dart
Appointment appointment = Appointment(
  startTime: DateTime(2026, 3, 20, 14, 0),
  endTime: DateTime(2026, 3, 20, 15, 30),
  subject: 'Project Review',
  color: Colors.purple,
  isAllDay: false,
  notes: 'Quarterly project status review with stakeholders',
  location: 'Conference Room A',
  startTimeZone: 'Eastern Standard Time',
  endTimeZone: 'Eastern Standard Time',
  id: 'meeting_001',
);
```

## CalendarDataSource Setup

Use `CalendarDataSource` to provide appointments to the calendar:

### Basic Data Source

```dart
class AppointmentDataSource extends CalendarDataSource {
  AppointmentDataSource(List<Appointment> source) {
    appointments = source;
  }
}

List<Appointment> appointments = <Appointment>[
  Appointment(
    startTime: DateTime.now(),
    endTime: DateTime.now().add(Duration(hours: 2)),
    subject: 'Conference',
    color: Colors.blue,
  ),
  Appointment(
    startTime: DateTime.now().add(Duration(days: 1, hours: 10)),
    endTime: DateTime.now().add(Duration(days: 1, hours: 11)),
    subject: 'Team Sync',
    color: Colors.green,
  ),
];

SfCalendar(
  view: CalendarView.week,
  dataSource: AppointmentDataSource(appointments),
)
```

> **Note:** When using the built-in `Appointment` class, you only need to assign `appointments = source`. **No method overrides are required** — `CalendarDataSource` already knows how to read all properties (`startTime`, `endTime`, `subject`, `color`, `isAllDay`, etc.) directly from `Appointment` objects. Method overrides are only needed when mapping **custom business objects** to the calendar (see [Custom Appointment Mapping](#custom-appointment-mapping) below).

### Using AppointmentDataSource

```dart
AppointmentDataSource dataSource = AppointmentDataSource(_appointments);

SfCalendar(
  view: CalendarView.month,
  dataSource: dataSource,
)
```

## Custom Appointment Mapping

Map your own business objects to calendar appointments by extending `CalendarDataSource`.

> **Important:** When using **custom objects** (instead of the built-in `Appointment` class), `CalendarDataSource` cannot automatically read your object's properties. You **must** override the following methods so the calendar knows how to extract data from your objects:
>
> | Method | Return Type | Required | Description |
> |--------|-------------|----------|-------------|
> | `getStartTime(int index)` | `DateTime` | ✅ Yes | Start date/time of the appointment |
> | `getEndTime(int index)` | `DateTime` | ✅ Yes | End date/time of the appointment |
> | `getSubject(int index)` | `String` | ✅ Yes | Title/subject text |
> | `getColor(int index)` | `Color` | ✅ Yes | Background color |
> | `isAllDay(int index)` | `bool` | ✅ Yes | Whether it is an all-day event |
> | `getStartTimeZone(int index)` | `String` | ⬜ Optional | Start time zone identifier |
> | `getEndTimeZone(int index)` | `String` | ⬜ Optional | End time zone identifier |
> | `convertAppointmentToObject(T?, Appointment)` | `T` | ⬜ Optional | Required for drag-drop/resize support |

### Step 1: Create Custom Class

```dart
class Meeting {
  Meeting({
    required this.eventName,
    required this.from,
    required this.to,
    required this.background,
    this.isAllDay = false,
    this.startTimeZone = '',
    this.endTimeZone = '',
  });

  String eventName;
  DateTime from;
  DateTime to;
  Color background;
  bool isAllDay;
  String startTimeZone;
  String endTimeZone;
}
```

### Step 2: Create Data Source Class

```dart
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

  @override
  String getStartTimeZone(int index) {
    return appointments![index].startTimeZone;
  }

  @override
  String getEndTimeZone(int index) {
    return appointments![index].endTimeZone;
  }
}
```

### Step 3: Use Custom Data Source

```dart
List<Meeting> _getMeetings() {
  final List<Meeting> meetings = <Meeting>[];
  final DateTime today = DateTime.now();

  meetings.add(Meeting(
    eventName: 'Sprint Planning',
    from: DateTime(today.year, today.month, today.day, 9, 0),
    to: DateTime(today.year, today.month, today.day, 10, 30),
    background: Colors.blue,
    isAllDay: false,
  ));

  meetings.add(Meeting(
    eventName: 'Client Call',
    from: DateTime(today.year, today.month, today.day + 1, 14, 0),
    to: DateTime(today.year, today.month, today.day + 1, 15, 0),
    background: Colors.orange,
    isAllDay: false,
  ));

  return meetings;
}

@override
Widget build(BuildContext context) {
  return SfCalendar(
    view: CalendarView.week,
    dataSource: MeetingDataSource(_getMeetings()),
  );
}
```

### Get Business Object from Appointment

Override `convertAppointmentToObject` to retrieve your custom object (needed for drag-drop and resizing):

```dart
class MeetingDataSource extends CalendarDataSource {
  // ... other overrides ...

  @override
  Meeting convertAppointmentToObject(Meeting? customData, Appointment appointment) {
    return Meeting(
      eventName: appointment.subject,
      from: appointment.startTime,
      to: appointment.endTime,
      background: appointment.color,
      isAllDay: appointment.isAllDay,
    );
  }
}
```

## All-Day Appointments

All-day appointments span entire days without specific times:

```dart
Appointment(
  startTime: DateTime(2026, 3, 20),
  endTime: DateTime(2026, 3, 20),
  subject: 'Team Building Event',
  color: Colors.red,
  isAllDay: true, // Renders in all-day section
)
```

**Spanned All-Day Appointments** (multiple days):

```dart
Appointment(
  startTime: DateTime(2026, 3, 20),
  endTime: DateTime(2026, 3, 23), // 4 days
  subject: 'Annual Conference',
  color: Colors.purple,
  isAllDay: true,
)
```

## Recurring Appointments

Create repeating appointments using recurrence rules (RRULE format):

### Daily Recurrence

```dart
// Repeat daily for 10 days
Appointment(
  startTime: DateTime(2026, 3, 20, 9, 0),
  endTime: DateTime(2026, 3, 20, 9, 30),
  subject: 'Daily Standup',
  color: Colors.blue,
  recurrenceRule: 'FREQ=DAILY;COUNT=10',
)
```

### Weekly Recurrence

```dart
// Every Monday for 12 weeks
Appointment(
  startTime: DateTime(2026, 3, 24, 10, 0), // Monday
  endTime: DateTime(2026, 3, 24, 11, 0),
  subject: 'Weekly Team Meeting',
  color: Colors.green,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=12',
)

// Every Monday and Wednesday
recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE;COUNT=20'
```

### Monthly Recurrence

```dart
// First Monday of every month for 12 months
Appointment(
  startTime: DateTime(2026, 3, 2, 14, 0),
  endTime: DateTime(2026, 3, 2, 15, 0),
  subject: 'Monthly Review',
  color: Colors.orange,
  recurrenceRule: 'FREQ=MONTHLY;BYDAY=1MO;COUNT=12',
)

// 15th day of each month
recurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=12'
```

### Yearly Recurrence

```dart
// Every year on March 20
Appointment(
  startTime: DateTime(2026, 3, 20, 10, 0),
  endTime: DateTime(2026, 3, 20, 11, 0),
  subject: 'Annual Meeting',
  color: Colors.red,
  recurrenceRule: 'FREQ=YEARLY;COUNT=5',
)
```

### Recurrence Rule Format

**RRULE Components:**
- `FREQ` - Frequency (DAILY, WEEKLY, MONTHLY, YEARLY)
- `INTERVAL` - Interval between occurrences (default: 1)
- `COUNT` - Number of occurrences
- `UNTIL` - End date (YYYYMMDD format)
- `BYDAY` - Days of week (MO, TU, WE, TH, FR, SA, SU)
- `BYMONTHDAY` - Day of month (1-31)
- `BYMONTH` - Month (1-12)

**Examples:**
```dart
'FREQ=DAILY;INTERVAL=2;COUNT=10' // Every 2 days, 10 times
'FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20261231' // MWF until Dec 31, 2026
'FREQ=MONTHLY;BYMONTHDAY=1;COUNT=12' // 1st of month, 12 times
'FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=20' // March 20 every year
```

### Recurrence Exception Dates

Skip specific occurrences in a recurring series:

```dart
Appointment(
  startTime: DateTime(2026, 3, 24, 10, 0),
  endTime: DateTime(2026, 3, 24, 11, 0),
  subject: 'Weekly Meeting',
  color: Colors.blue,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=10',
  recurrenceExceptionDates: [
    DateTime(2026, 4, 7), // Skip April 7
    DateTime(2026, 4, 21), // Skip April 21
  ],
)
```

## Time Zone Support

Display appointments in different time zones:

### Appointment-Level Time Zones

```dart
// Meeting at 2 PM EST (will display in calendar's time zone)
Appointment(
  startTime: DateTime.utc(2026, 3, 20, 19, 0), // 2 PM EST = 7 PM UTC
  endTime: DateTime.utc(2026, 3, 20, 20, 0),
  subject: 'International Call',
  color: Colors.blue,
  startTimeZone: 'Eastern Standard Time',
  endTimeZone: 'Eastern Standard Time',
)
```

### Calendar-Level Time Zone

```dart
// Display all appointments in Pacific time
SfCalendar(
  view: CalendarView.week,
  dataSource: _dataSource,
  timeZone: 'Pacific Standard Time',
)
```

**Common Time Zones:**
- `'UTC'`
- `'Eastern Standard Time'`
- `'Pacific Standard Time'`
- `'Central Standard Time'`
- `'Greenwich Standard Time'`

## Appointment Display Modes

Control how appointments appear in month view:

### Indicator Mode (Default)

Shows appointments as colored dots:

```dart
SfCalendar(
  view: CalendarView.month,
  monthViewSettings: MonthViewSettings(
    appointmentDisplayMode: MonthAppointmentDisplayMode.indicator,
    appointmentDisplayCount: 3, // Max indicators per cell
  ),
)
```

### Appointment Mode

Shows appointment subjects in cells:

```dart
SfCalendar(
  view: CalendarView.month,
  monthViewSettings: MonthViewSettings(
    appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
    appointmentDisplayCount: 4, // Max visible appointments
  ),
)
```

### None Mode

Hides appointments (useful for date selection only):

```dart
SfCalendar(
  view: CalendarView.month,
  monthViewSettings: MonthViewSettings(
    appointmentDisplayMode: MonthAppointmentDisplayMode.none,
  ),
)
```

## Data Source Manipulation

Dynamically add, remove, or update appointments:

### Add Appointments

```dart
class MyCalendar extends StatefulWidget {
  @override
  _MyCalendarState createState() => _MyCalendarState();
}

class _MyCalendarState extends State<MyCalendar> {
  CalendarController _controller = CalendarController();
  MeetingDataSource? _dataSource;

  @override
  void initState() {
    super.initState();
    _dataSource = MeetingDataSource(_getMeetings());
  }

  void _addAppointment() {
    final Appointment newAppointment = Appointment(
      startTime: _controller.displayDate!,
      endTime: _controller.displayDate!.add(Duration(hours: 2)),
      subject: 'New Meeting',
      color: Colors.pink,
    );

    _dataSource!.appointments!.add(newAppointment);
    _dataSource!.notifyListeners(
      CalendarDataSourceAction.add,
      [newAppointment],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: _addAppointment,
        child: Icon(Icons.add),
      ),
      body: SfCalendar(
        view: CalendarView.week,
        controller: _controller,
        dataSource: _dataSource,
      ),
    );
  }
}
```

### Remove Appointments

```dart
void _removeAppointment(Appointment appointment) {
  _dataSource!.appointments!.remove(appointment);
  _dataSource!.notifyListeners(
    CalendarDataSourceAction.remove,
    [appointment],
  );
}
```

### Update/Replace All Appointments

```dart
void _resetAppointments(List<Appointment> newAppointments) {
  _dataSource!.appointments!.clear();
  _dataSource!.appointments!.addAll(newAppointments);
  _dataSource!.notifyListeners(
    CalendarDataSourceAction.reset,
    _dataSource!.appointments!,
  );
}
```

## Common Appointment Patterns

### Pattern 1: Load Appointments from API

```dart
Future<List<Meeting>> _loadMeetings() async {
  // Fetch from API
  final response = await http.get(Uri.parse('api/meetings'));
  final List<dynamic> data = json.decode(response.body);
  
  return data.map((json) => Meeting(
    eventName: json['title'],
    from: DateTime.parse(json['start']),
    to: DateTime.parse(json['end']),
    background: Color(int.parse(json['color'])),
  )).toList();
}

@override
void initState() {
  super.initState();
  _loadMeetings().then((meetings) {
    setState(() {
      _dataSource = MeetingDataSource(meetings);
    });
  });
}
```

### Pattern 2: Color-Coded Appointments by Type

```dart
Color _getColorForMeetingType(String type) {
  switch (type) {
    case 'urgent':
      return Colors.red;
    case 'important':
      return Colors.orange;
    case 'routine':
      return Colors.blue;
    default:
      return Colors.grey;
  }
}

List<Meeting> meetings = appointments.map((apt) => Meeting(
  eventName: apt.title,
  from: apt.startDate,
  to: apt.endDate,
  background: _getColorForMeetingType(apt.type),
)).toList();
```

### Pattern 3: Filter Appointments by Criteria

```dart
List<Meeting> _getFilteredMeetings(String filter) {
  return allMeetings.where((meeting) {
    if (filter == 'today') {
      return isSameDay(meeting.from, DateTime.now());
    } else if (filter == 'week') {
      return meeting.from.isAfter(DateTime.now()) &&
             meeting.from.isBefore(DateTime.now().add(Duration(days: 7)));
    }
    return true;
  }).toList();
}
```

## Next Steps

- **Views:** Read [views.md](views.md) for different calendar views and appointment display
- **Customization:** Read [customization.md](customization.md) for appointment styling
- **Callbacks:** Read [callbacks.md](callbacks.md) for appointment tap/selection events
- **Advanced:** Read [advanced-features.md](advanced-features.md) for drag-drop, resizing, resources
