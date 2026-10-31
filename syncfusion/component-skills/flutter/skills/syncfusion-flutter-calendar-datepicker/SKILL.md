---
name: syncfusion-flutter-calendar-datepicker
description: Implements Syncfusion Flutter Calendar (SfCalendar) and Date Range Picker (SfDateRangePicker) widgets for date and scheduling UIs in Flutter apps. Use when building appointment calendars, booking systems, date range selectors, or event scheduling interfaces. This skill covers calendar views, recurring events, date navigation, localization, callbacks, and customization.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Calendar & Date Range Picker

This skill covers two related Syncfusion Flutter components for date and calendar functionality: **SfCalendar** (Event Calendar) and **SfDateRangePicker** (Date Range Picker). While they share many visual and configuration features, they serve different primary purposes.

## When to Use This Skill

Use this skill when you need to:

- **Implement event calendars** with appointments, scheduling, and time management
- **Add date selection** to forms, filters, or booking interfaces
- **Display calendar views** (month, week, day, year, decade, timeline, schedule)
- **Handle date range selection** for reports, analytics, or filtering
- **Create appointment/booking systems** with recurring events and time zones
- **Build scheduling interfaces** with drag-drop, resizing, and resource views
- **Enable date navigation** with various view modes and restrictions
- **Customize calendar appearance** with builders, themes, and styling
- **Support multiple date selection modes** (single, multiple, range, multi-range)
- **Integrate calendar localization** with RTL support and accessibility

## Choosing the Right Component

### Use **SfCalendar** (Event Calendar) when:
- You need to **display and manage appointments/events**
- Your app requires **scheduling functionality** (booking, meetings, tasks)
- You need **timeline views** or **schedule views** for event management
- **Time-based views** are important (day, week, workweek with time slots)
- You need **recurring events**, **time zones**, or **resource allocation**
- **Drag-and-drop** or **appointment resizing** is required
- Building calendars for: meeting schedulers, appointment books, task managers, event planners

### Use **SfDateRangePicker** (Date Range Picker) when:
- You need **date selection** without appointment management
- Your primary goal is **picking dates or date ranges** for forms/filters
- You need **flexible selection modes** (single, multiple, range, multi-range)
- **Simplified date input** for booking start/end dates, report periods, etc.
- You want **action buttons** (confirm/cancel) for date selection dialogs
- Building UI for: date filters, booking dates, report date ranges, form date inputs

### Key Differences Summary:

| Feature | SfCalendar | SfDateRangePicker |
|---------|-----------|-------------------|
| **Primary Purpose** | Event scheduling & display | Date selection |
| **Appointments/Events** | ✅ Full support | ❌ Not supported |
| **View Types** | 9 views (day, week, timeline, etc.) | 4 views (month, year, decade, century) |
| **Selection Modes** | Single date/time slot | Single, multiple, range, multi-range |
| **Time Slots** | ✅ Yes (with time) | ❌ Dates only |
| **Action Buttons** | ❌ No | ✅ Confirm/Cancel buttons |
| **Recurring Events** | ✅ Yes | ❌ No |
| **Time Zones** | ✅ Yes | ❌ No |
| **Resource View** | ✅ Yes | ❌ No |
| **Drag & Drop** | ✅ Yes | ❌ No |

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup for both components
- Basic SfCalendar implementation
- Basic SfDateRangePicker implementation
- Package dependencies and imports
- Quick comparison and first examples

### Component Overview

📄 **For Calendar:** [references/calendar-overview.md](references/calendar-overview.md)
- SfCalendar widget overview and features
- When to use Calendar vs Date Range Picker
- Nine calendar view types explained
- Calendar-specific capabilities
- Basic calendar configuration

📄 **For Date Range Picker:** [references/datepicker-overview.md](references/datepicker-overview.md)
- SfDateRangePicker widget overview and features
- When to use Date Range Picker vs Calendar
- Four picker view types explained
- Date picker-specific capabilities
- Multi-picker view (side by side)

### View Types and Navigation

📄 **Read:** [references/views.md](references/views.md)
- Month view (both components)
- Year, decade, century views (Date Range Picker)
- Day, week, workweek views (Calendar)
- Schedule view (Calendar)
- Timeline views: day, week, workweek, month (Calendar)
- Month agenda view (Calendar)
- View switching and navigation
- Week number display
- First day of week configuration

📄 **Read:** [references/date-navigations.md](references/date-navigations.md)
- Forward and backward navigation
- Programmatic date navigation
- Initial display date configuration
- Navigation arrows
- View mode switching controls
- Min/max date restrictions
- Blackout dates (disabled dates)

### Calendar-Specific Features

📄 **Read:** [references/appointments.md](references/appointments.md)
- **Calendar appointments** (events/scheduling)
- Appointment class and properties
- CalendarDataSource setup and mapping
- Custom appointment objects
- All-day appointments
- Recurring appointments and rules
- Appointment display modes
- Time zone support for appointments
- Appointment customization

### Date Range Picker-Specific Features

📄 **Read:** [references/selections.md](references/selections.md)
- **Selection modes** (single, multiple, range, multi-range, extendable)
- Single date selection
- Multiple date selection
- Range selection (start and end dates)
- Multi-range selection (multiple ranges)
- Programmatic selection
- Selection changed callbacks
- Initial selected date
- Selection decoration and styling

### Customization and Styling

📄 **Read:** [references/customization.md](references/customization.md)
- Visual appearance customization
- Cell styling and colors
- Header customization
- Today highlight color
- Cell border color and background
- Selection decoration
- Theme integration
- Special time regions (Calendar)
- Month cell appearance

📄 **Read:** [references/builders.md](references/builders.md)
- Custom cell builders
- Month cell builder
- Year cell builder
- Appointment builder (Calendar)
- Time region builder (Calendar)
- Resource header builder (Calendar)
- Builder patterns and examples

### Event Handling

📄 **Read:** [references/callbacks.md](references/callbacks.md)
- onSelectionChanged (both components)
- onViewChanged (both components)
- onTap and onLongPress (Calendar)
- onSubmit and onCancel (Date Range Picker)
- Calendar-specific callbacks (appointment interactions)
- Callback argument types
- Event handling patterns

### Localization and Accessibility

📄 **Read:** [references/localization.md](references/localization.md)
- Internationalization support
- Locale configuration
- Date format customization
- Header and cell formats
- Globalization examples
- Right-to-left (RTL) support

📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Screen reader support
- Semantic labels
- Keyboard navigation
- WCAG compliance
- Focus indicators
- Accessible date selection

### Advanced Features

📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Time zones (Calendar)
- Resource view (Calendar)
- Drag and drop (Calendar)
- Appointment resizing (Calendar)
- Load more appointments (Calendar)
- Hijri calendar support (Date Range Picker)
- Date restrictions and constraints (Date Range Picker)
- Action buttons (Date Range Picker)
- Current time indicator (Calendar)

## Quick Start Examples

### Basic Calendar with Appointments

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';

class MyCalendar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My Calendar')),
      body: SfCalendar(
        view: CalendarView.month,
        dataSource: MeetingDataSource(_getDataSource()),
        monthViewSettings: MonthViewSettings(
          appointmentDisplayMode: MonthAppointmentDisplayMode.appointment
        ),
      ),
    );
  }

  List<Meeting> _getDataSource() {
    final List<Meeting> meetings = <Meeting>[];
    final DateTime today = DateTime.now();
    final DateTime startTime = DateTime(today.year, today.month, today.day, 9, 0, 0);
    final DateTime endTime = startTime.add(Duration(hours: 2));
    
    meetings.add(Meeting(
      'Conference',
      startTime,
      endTime,
      Color(0xFF0F8644),
      false
    ));
    
    return meetings;
  }
}

class MeetingDataSource extends CalendarDataSource {
  MeetingDataSource(List<Meeting> source) {
    appointments = source;
  }

  @override
  DateTime getStartTime(int index) => appointments![index].from;
  
  @override
  DateTime getEndTime(int index) => appointments![index].to;
  
  @override
  String getSubject(int index) => appointments![index].eventName;
  
  @override
  Color getColor(int index) => appointments![index].background;
  
  @override
  bool isAllDay(int index) => appointments![index].isAllDay;
}

class Meeting {
  Meeting(this.eventName, this.from, this.to, this.background, this.isAllDay);
  
  String eventName;
  DateTime from;
  DateTime to;
  Color background;
  bool isAllDay;
}
```

### Basic Date Range Picker

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

class MyDatePicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Select Date Range')),
      body: SfDateRangePicker(
        view: DateRangePickerView.month,
        selectionMode: DateRangePickerSelectionMode.range,
        onSelectionChanged: _onSelectionChanged,
        showActionButtons: true,
      ),
    );
  }

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    if (args.value is PickerDateRange) {
      final DateTime startDate = args.value.startDate;
      final DateTime? endDate = args.value.endDate;
      print('Selected range: $startDate to $endDate');
    }
  }
}
```

### Date Picker with Multiple Selection

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  selectionMode: DateRangePickerSelectionMode.multiple,
  initialSelectedDates: [
    DateTime.now(),
    DateTime.now().add(Duration(days: 2)),
    DateTime.now().add(Duration(days: 5)),
  ],
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    final List<DateTime> selectedDates = args.value;
    print('Selected ${selectedDates.length} dates');
  },
)
```

## Common Patterns

### Pattern 1: Calendar with Different Views

```dart
// Switch between day, week, month, and schedule views
CalendarView _calendarView = CalendarView.month;

SfCalendar(
  view: _calendarView,
  dataSource: MeetingDataSource(_appointments),
  onViewChanged: (ViewChangedDetails details) {
    // Handle view changes
  },
)

// Toggle view with buttons
void _changeView(CalendarView view) {
  setState(() {
    _calendarView = view;
  });
}
```

### Pattern 2: Date Range Filter for Reports

```dart
// Common pattern for selecting date ranges in analytics/reports
PickerDateRange? _selectedRange;

SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    setState(() {
      _selectedRange = args.value;
    });
  },
  showActionButtons: true,
  onSubmit: (Object? value) {
    if (_selectedRange != null) {
      _loadReportData(_selectedRange!.startDate, _selectedRange!.endDate);
    }
    Navigator.pop(context);
  },
)
```

### Pattern 3: Customized Cell Appearance

```dart
// Custom styling for both components
SfCalendar(
  view: CalendarView.month,
  todayHighlightColor: Colors.blue,
  cellBorderColor: Colors.grey[300],
  backgroundColor: Colors.white,
  selectionDecoration: BoxDecoration(
    color: Colors.transparent,
    border: Border.all(color: Colors.blue, width: 2),
    borderRadius: BorderRadius.circular(4),
  ),
)

SfDateRangePicker(
  todayHighlightColor: Colors.green,
  selectionColor: Colors.blue,
  rangeSelectionColor: Colors.blue.withOpacity(0.3),
  startRangeSelectionColor: Colors.blue,
  endRangeSelectionColor: Colors.blue,
)
```

### Pattern 4: Restricting Date Selection

```dart
// Disable past dates and weekends
SfDateRangePicker(
  minDate: DateTime.now(),
  maxDate: DateTime.now().add(Duration(days: 365)),
  selectableDayPredicate: (DateTime date) {
    // Disable weekends
    return date.weekday != DateTime.saturday && 
           date.weekday != DateTime.sunday;
  },
)
```

## Key Properties

### SfCalendar Essential Properties

- `view` - Calendar view type (day, week, month, schedule, timeline, etc.)
- `dataSource` - CalendarDataSource with appointments
- `initialDisplayDate` - Date to display initially
- `initialSelectedDate` - Initially selected date/time
- `monthViewSettings` - Configuration for month view
- `timeSlotViewSettings` - Configuration for day/week views
- `scheduleViewSettings` - Configuration for schedule view
- `todayHighlightColor` - Color for today's date
- `selectionDecoration` - Selection styling
- `onTap` - Callback when cell is tapped
- `onLongPress` - Callback for long press
- `onViewChanged` - Callback when view changes
- `onSelectionChanged` - Callback when selection changes
- `showNavigationArrow` - Show forward/backward arrows
- `showCurrentTimeIndicator` - Show current time line
- `allowViewNavigation` - Allow switching between views
- `firstDayOfWeek` - First day of week (1-7)
- `blackoutDates` - Dates to disable
- `minDate` / `maxDate` - Date range restrictions

### SfDateRangePicker Essential Properties

- `view` - Picker view type (month, year, decade, century)
- `selectionMode` - Selection mode (single, multiple, range, multiRange, extendableRange)
- `initialSelectedDate` - Initially selected date
- `initialSelectedDates` - Initially selected dates (multiple mode)
- `initialSelectedRange` - Initially selected range
- `initialSelectedRanges` - Initially selected ranges (multi-range mode)
- `initialDisplayDate` - Date to display initially
- `monthViewSettings` - Configuration for month view
- `yearViewSettings` - Configuration for year view
- `todayHighlightColor` - Color for today's date
- `selectionColor` - Selection color
- `rangeSelectionColor` - Range selection color
- `startRangeSelectionColor` - Start date color
- `endRangeSelectionColor` - End date color
- `onSelectionChanged` - Callback when selection changes
- `onViewChanged` - Callback when view changes
- `onSubmit` - Callback when confirm button pressed
- `onCancel` - Callback when cancel button pressed
- `showActionButtons` - Show confirm/cancel buttons
- `showTodayButton` - Show today button
- `allowViewNavigation` - Allow switching between views
- `enablePastDates` - Enable past date selection
- `minDate` / `maxDate` - Date range restrictions
- `selectableDayPredicate` - Custom date validation
- `monthCellStyle` - Month cell styling
- `yearCellStyle` - Year cell styling

## Common Use Cases

1. **Meeting Scheduler** - Use SfCalendar with schedule view
2. **Event Manager** - Use SfCalendar with month view, recurring events, and drag-drop
3. **Booking System** - Use SfDateRangePicker with range selection and date restrictions
4. **Date Filter** - Use SfDateRangePicker with range/multi-range selection for reports
5. **Task Manager** - Use SfCalendar with schedule view and all-day appointments
6. **Vacation Planner** - Use SfDateRangePicker with multiple selection and blackout dates
7. **Resource Scheduler** - Use SfCalendar with resource view and timeline
8. **Simple Date Input** - Use SfDateRangePicker with single selection mode
