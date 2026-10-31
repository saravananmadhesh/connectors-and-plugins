# SfCalendar (Event Calendar) Overview

The Syncfusion Flutter Event Calendar (`SfCalendar`) is a comprehensive scheduling and appointment management widget designed for creating calendar-based applications with rich event handling capabilities.

## When to Use SfCalendar

Use **SfCalendar** when your application needs:

### Primary Use Cases:
- **Appointment/event scheduling** - Meetings, bookings, tasks
- **Calendar-based event display** - Show events across days/weeks/months
- **Time management applications** - Schedulers, planners, organizers
- **Resource scheduling** - Room bookings, employee schedules
- **Timeline visualizations** - Project timelines, activity tracking
- **Recurring event management** - Weekly meetings, daily tasks

### Choose SfCalendar Over SfDateRangePicker When:
- You need to **display events with time information**
- **Scheduling functionality** is the primary goal
- You need **multiple view types** with time slots (day, week, timeline)
- **Drag-and-drop** or **appointment resizing** is required
- **Recurring events** with custom rules are needed
- **Time zone support** for global scheduling
- **Resource allocation** across multiple resources

## Key Features

### 1. Multiple Calendar View Types (9 Views)

SfCalendar provides nine built-in view modes:

**Time Slot Views:**
- **Day View** - Single day with time slots
- **Week View** - 7 days with time slots
- **Workweek View** - 5 working days with time slots

**Timeline Views:**
- **Timeline Day** - Horizontal day view with time slots
- **Timeline Week** - Horizontal week view
- **Timeline Workweek** - Horizontal workweek view
- **Timeline Month** - Horizontal month view

**Other Views:**
- **Month View** - Traditional month grid
- **Schedule View** - List of appointments grouped by date

```dart
// Switch between different views
SfCalendar(
  view: CalendarView.week, // or .day, .month, .schedule, etc.
)
```

### 2. Appointments (Events/Scheduling)

The core feature that distinguishes SfCalendar from date pickers:

- **Built-in Appointment class** with properties like subject, start time, end time, color
- **Custom appointment mapping** - Map your own data models
- **CalendarDataSource** - Efficiently manage large appointment collections
- **All-day appointments** - Events without specific times
- **Recurring appointments** - Daily, weekly, monthly, yearly patterns
- **Time zone support** - Display appointments in different time zones

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
    subject: 'Team Meeting',
    color: Colors.blue,
    isAllDay: false,
  ),
];

SfCalendar(
  view: CalendarView.week,
  dataSource: AppointmentDataSource(appointments),
)
```

### 3. Interactive Features

**Drag and Drop:**
- Drag appointments to different time slots or dates
- Reschedule appointments by dragging
- Custom drag behavior with callbacks

**Appointment Resizing:**
- Resize appointments to adjust duration
- Visual feedback during resizing
- Resize constraints and validation

**Selection:**
- Select time slots or calendar cells
- Programmatic selection
- Selection decoration customization

### 4. Time Slot Configuration

Control how time slots are displayed in day/week views:

- **Custom start and end hours** - Show only business hours
- **Time interval** - 15min, 30min, 1hour slots
- **Time slot height** - Adjust slot spacing
- **Special time regions** - Block out lunch breaks, non-working hours

```dart
SfCalendar(
  view: CalendarView.day,
  timeSlotViewSettings: TimeSlotViewSettings(
    startHour: 8,
    endHour: 18,
    timeInterval: Duration(minutes: 30),
    timeIntervalHeight: 60,
  ),
)
```

### 5. Resource View

Display appointments across multiple resources (rooms, people, equipment):

```dart
SfCalendar(
  view: CalendarView.timelineWeek,
  dataSource: _calendarDataSource,
  resourceViewSettings: ResourceViewSettings(
    size: 150,
    displayNameTextStyle: TextStyle(fontSize: 14),
  ),
)
```

### 6. Schedule View

List-based view showing appointments grouped by date:

```dart
SfCalendar(
  view: CalendarView.schedule,
  scheduleViewSettings: ScheduleViewSettings(
    appointmentItemHeight: 70,
    hideEmptyScheduleWeek: true,
  ),
)
```

### 7. Month View with Agenda

Split view showing month calendar above and appointment list below:

```dart
SfCalendar(
  view: CalendarView.month,
  monthViewSettings: MonthViewSettings(
    showAgenda: true,
    agendaViewHeight: 200,
    appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
  ),
)
```

### 8. Recurring Appointments

Create repeating events with flexible recurrence rules:

```dart
Appointment(
  startTime: DateTime(2026, 1, 1, 10, 0),
  endTime: DateTime(2026, 1, 1, 11, 0),
  subject: 'Weekly Team Meeting',
  color: Colors.blue,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;COUNT=10',
)
```

**Recurrence Patterns:**
- Daily, Weekly, Monthly, Yearly
- Custom intervals
- Specific days of week
- End conditions (count, until date)
- Exception dates (skip specific occurrences)

### 9. Time Zone Support

Display appointments in different time zones:

```dart
Appointment(
  startTime: DateTime.utc(2026, 3, 20, 14, 0),
  endTime: DateTime.utc(2026, 3, 20, 15, 0),
  subject: 'International Call',
  startTimeZone: 'UTC',
  endTimeZone: 'Pacific Standard Time',
)

SfCalendar(
  timeZone: 'Eastern Standard Time', // Display in EST
)
```

### 10. Current Time Indicator

Show a line indicating the current time in time slot views:

```dart
SfCalendar(
  view: CalendarView.day,
  showCurrentTimeIndicator: true,
  todayHighlightColor: Colors.red, // Color of the indicator
)
```

## Basic Calendar Setup

### Minimal Configuration

```dart
import 'package:syncfusion_flutter_calendar/calendar.dart';

SfCalendar(
  view: CalendarView.month,
)
```

### With Appointments

```dart
SfCalendar(
  view: CalendarView.week,
  dataSource: MeetingDataSource(_getAppointments()),
)
```

### With Customization

```dart
SfCalendar(
  view: CalendarView.week,
  dataSource: _dataSource,
  initialDisplayDate: DateTime(2026, 3, 20),
  initialSelectedDate: DateTime.now(),
  firstDayOfWeek: 1, // Monday
  showNavigationArrow: true,
  showCurrentTimeIndicator: true,
  todayHighlightColor: Colors.blue,
  cellBorderColor: Colors.grey[300],
  backgroundColor: Colors.white,
  timeSlotViewSettings: TimeSlotViewSettings(
    startHour: 8,
    endHour: 18,
  ),
)
```

## Common Calendar Workflows

### 1. Meeting Scheduler
```dart
// Week view with business hours and drag-drop
SfCalendar(
  view: CalendarView.week,
  dataSource: _meetingDataSource,
  allowDragAndDrop: true,
  timeSlotViewSettings: TimeSlotViewSettings(
    startHour: 9,
    endHour: 17,
  ),
  onDragEnd: (AppointmentDragEndDetails details) {
    // Save rescheduled meeting
  },
)
```

### 2. Event Calendar
```dart
// Month view with appointment display
SfCalendar(
  view: CalendarView.month,
  dataSource: _eventDataSource,
  monthViewSettings: MonthViewSettings(
    appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
    showAgenda: true,
  ),
)
```

### 3. Resource Booking
```dart
// Timeline view with resources
SfCalendar(
  view: CalendarView.timelineDay,
  dataSource: _resourceDataSource,
  resourceViewSettings: ResourceViewSettings(
    size: 150,
    showAvatar: true,
  ),
)
```

### 4. Task Manager
```dart
// Schedule view showing all tasks
SfCalendar(
  view: CalendarView.schedule,
  dataSource: _taskDataSource,
  scheduleViewSettings: ScheduleViewSettings(
    appointmentItemHeight: 80,
  ),
)
```

## Key Properties

### Essential Properties:
- `view` - CalendarView type (day, week, month, schedule, timeline variants)
- `dataSource` - CalendarDataSource containing appointments
- `initialDisplayDate` - Initial date to display
- `initialSelectedDate` - Initially selected date/time slot
- `firstDayOfWeek` - First day of week (1=Monday, 7=Sunday)
- `showNavigationArrow` - Show navigation arrows
- `showCurrentTimeIndicator` - Show current time line
- `allowDragAndDrop` - Enable appointment drag-drop
- `allowAppointmentResize` - Enable appointment resizing

### View-Specific Settings:
- `monthViewSettings` - Month view configuration
- `timeSlotViewSettings` - Day/week view configuration
- `scheduleViewSettings` - Schedule view configuration
- `resourceViewSettings` - Resource view configuration

### Callbacks:
- `onTap` - Cell/appointment tap
- `onLongPress` - Long press event
- `onSelectionChanged` - Selection change
- `onViewChanged` - View change
- `onDragStart`, `onDragUpdate`, `onDragEnd` - Drag events

## Calendar vs Date Range Picker Decision Tree

**Choose SfCalendar if:**
- ✅ You need to show appointments/events
- ✅ Time-based scheduling is important
- ✅ Users need to see their schedule
- ✅ Drag-drop or resizing is required
- ✅ Recurring events are needed
- ✅ Multiple resources need scheduling
- ✅ Timeline views are beneficial

**Choose SfDateRangePicker if:**
- ✅ You only need date selection (no appointments)
- ✅ Simple date input for forms
- ✅ Date range filtering for reports
- ✅ Multiple discrete dates selection
- ✅ Confirm/cancel buttons are needed
- ✅ No time component required

## Next Steps

- **Appointments:** Read [appointments.md](appointments.md) for detailed appointment handling
- **Views:** Read [views.md](views.md) for all view types and configurations
- **Customization:** Read [customization.md](customization.md) for styling options
- **Advanced:** Read [advanced-features.md](advanced-features.md) for drag-drop, time zones, resources
