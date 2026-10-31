# View Types and Navigation

## Table of Contents
- [Overview](#overview)
- [Calendar View Types (9 Types)](#calendar-view-types-9-types)
- [Date Range Picker View Types (4 Types)](#date-range-picker-view-types-4-types)
- [View Switching and Navigation](#view-switching-and-navigation)
- [Week Number Display](#week-number-display)
- [First Day of Week](#first-day-of-week)
- [Multi-View Configuration](#multi-view-configuration)

## Overview

Both SfCalendar and SfDateRangePicker support multiple view types for displaying dates. While they share some similarities (like month view), each component has unique view types tailored to its purpose.

## Calendar View Types (9 Types)

SfCalendar provides nine view modes designed for event scheduling and time management:

### Time Slot Views (Day, Week, Workweek)

These views display time slots for precise appointment scheduling:

**Day View** - Single day with hourly time slots
```dart
SfCalendar(
  view: CalendarView.day,
  timeSlotViewSettings: TimeSlotViewSettings(
    startHour: 8,
    endHour: 18,
    timeInterval: Duration(minutes: 30),
  ),
)
```

**Week View** - 7 days with time slots
```dart
SfCalendar(
  view: CalendarView.week,
)
```

**Workweek View** - 5 working days (Monday-Friday) with time slots
```dart
SfCalendar(
  view: CalendarView.workWeek,
)
```

### Month View

Traditional calendar grid showing all dates of a month:

```dart
SfCalendar(
  view: CalendarView.month,
  monthViewSettings: MonthViewSettings(
    appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
    showAgenda: true, // Show appointments below calendar
  ),
)
```

**Month View Settings:**
- `appointmentDisplayMode` - How appointments appear (indicator, appointment, none)
- `showAgenda` - Show selected date's appointments below
- `agendaViewHeight` - Height of agenda section
- `appointmentDisplayCount` - Number of appointments per cell
- `navigationDirection` - Horizontal or vertical navigation

### Timeline Views (Day, Week, Workweek, Month)

Horizontal layouts with time slots across columns:

**Timeline Day** - Single day, horizontal time slots
```dart
SfCalendar(
  view: CalendarView.timelineDay,
)
```

**Timeline Week** - 7 days, horizontal layout
```dart
SfCalendar(
  view: CalendarView.timelineWeek,
)
```

**Timeline Workweek** - 5 working days, horizontal
```dart
SfCalendar(
  view: CalendarView.timelineWorkWeek,
)
```

**Timeline Month** - Entire month in horizontal columns
```dart
SfCalendar(
  view: CalendarView.timelineMonth,
  timeSlotViewSettings: TimeSlotViewSettings(
    timelineAppointmentHeight: 50,
  ),
)
```

### Schedule View

List-based view showing appointments grouped by date:

```dart
SfCalendar(
  view: CalendarView.schedule,
  scheduleViewSettings: ScheduleViewSettings(
    appointmentItemHeight: 70,
    hideEmptyScheduleWeek: true,
    monthHeaderSettings: MonthHeaderSettings(
      height: 50,
      backgroundColor: Colors.blue,
    ),
  ),
)
```

## Date Range Picker View Types (4 Types)

SfDateRangePicker provides four view modes for date selection at different granularities:

### Month View

Displays all dates of a particular month:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  monthViewSettings: DateRangePickerMonthViewSettings(
    firstDayOfWeek: 1, // Monday
    numberOfWeeksInView: 6,
    viewHeaderHeight: 50,
  ),
)
```

**Month View Features:**
- Show/hide week numbers
- Custom number of weeks (partial month display)
- Blackout dates (disabled dates)
- Special dates highlighting
- Leading/trailing dates visibility

### Year View

Grid of 12 months for quick month selection:

```dart
SfDateRangePicker(
  view: DateRangePickerView.year,
  yearCellStyle: DateRangePickerYearCellStyle(
    todayTextStyle: TextStyle(color: Colors.red),
    disabledDatesTextStyle: TextStyle(color: Colors.grey),
  ),
)
```

**Note:** When `allowViewNavigation` is false, selecting a month in year view returns the first date of that month.

### Decade View

Shows 10 years for quick year navigation:

```dart
SfDateRangePicker(
  view: DateRangePickerView.decade,
  allowViewNavigation: false, // Enable year selection
)
```

**Behavior:** Selecting a year returns January 1st of that year when view navigation is disabled.

### Century View

Displays 100 years (10 decades) for long-range navigation:

```dart
SfDateRangePicker(
  view: DateRangePickerView.century,
)
```

**Behavior:** Selecting a decade returns the first date of the first year in that decade.

## View Switching and Navigation

### Calendar View Switching

Switch between calendar views programmatically:

```dart
class CalendarViewSwitcher extends StatefulWidget {
  @override
  _CalendarViewSwitcherState createState() => _CalendarViewSwitcherState();
}

class _CalendarViewSwitcherState extends State<CalendarViewSwitcher> {
  CalendarView _calendarView = CalendarView.month;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            ElevatedButton(
              onPressed: () => setState(() => _calendarView = CalendarView.day),
              child: Text('Day'),
            ),
            ElevatedButton(
              onPressed: () => setState(() => _calendarView = CalendarView.week),
              child: Text('Week'),
            ),
            ElevatedButton(
              onPressed: () => setState(() => _calendarView = CalendarView.month),
              child: Text('Month'),
            ),
          ],
        ),
        Expanded(
          child: SfCalendar(
            view: _calendarView,
            onViewChanged: (ViewChangedDetails details) {
              // Triggered when view changes
              print('View changed to: $_calendarView');
            },
          ),
        ),
      ],
    );
  }
}
```

### Date Picker View Navigation

Date Range Picker supports header tap navigation between views:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  allowViewNavigation: true, // Enable header tap navigation
  // Tap month header to navigate: month → year → decade → century
)
```

**Navigation Flow:**
1. **Month View** → Tap header → **Year View**
2. **Year View** → Tap header → **Decade View**
3. **Decade View** → Tap header → **Century View**

**Disable Navigation:**
```dart
SfDateRangePicker(
  allowViewNavigation: false, // Disable header tap, enable cell selection in year/decade views
)
```

## Week Number Display

Both components support ISO standard week number display:

### Calendar Week Numbers

```dart
SfCalendar(
  view: CalendarView.month,
  showWeekNumber: true,
  weekNumberStyle: WeekNumberStyle(
    backgroundColor: Colors.pink,
    textStyle: TextStyle(
      color: Colors.white,
      fontSize: 15,
    ),
  ),
)
```

### Date Picker Week Numbers

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  monthViewSettings: DateRangePickerMonthViewSettings(
    showWeekNumber: true,
    weekNumberStyle: DateRangePickerWeekNumberStyle(
      textStyle: TextStyle(fontStyle: FontStyle.italic),
      backgroundColor: Colors.purple,
    ),
  ),
)
```

**Week Number Rules:**
- Follows ISO 8601 standard
- Week starts on Monday
- Week 1 is the first week with Thursday in the new year

## First Day of Week

Customize which day starts the week:

### Calendar First Day

```dart
SfCalendar(
  view: CalendarView.week,
  firstDayOfWeek: 1, // 1 = Monday, 2 = Tuesday, ..., 7 = Sunday
)
```

### Date Picker First Day

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  monthViewSettings: DateRangePickerMonthViewSettings(
    firstDayOfWeek: 1, // Monday
  ),
)
```

**Day Values:**
- 1 = Monday
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday
- 7 = Sunday (default)

## Multi-View Configuration

### Date Picker Multi-View

Display two date pickers side by side:

```dart
SfDateRangePicker(
  enableMultiView: true,
  viewSpacing: 20, // Space between pickers
  navigationDirection: DateRangePickerNavigationDirection.horizontal,
  selectionMode: DateRangePickerSelectionMode.range,
)
```

**Vertical Multi-View:**
```dart
SfDateRangePicker(
  enableMultiView: true,
  navigationDirection: DateRangePickerNavigationDirection.vertical,
  viewSpacing: 10,
)
```

**Use Cases:**
- Range selection across two months
- Easier visual comparison of dates
- Better UX for date range selection

### Calendar (No Built-in Multi-View)

Calendar doesn't have built-in multi-view, but you can stack multiple calendars:

```dart
Row(
  children: [
    Expanded(
      child: SfCalendar(
        view: CalendarView.month,
        initialDisplayDate: DateTime(2026, 3, 1),
      ),
    ),
    Expanded(
      child: SfCalendar(
        view: CalendarView.month,
        initialDisplayDate: DateTime(2026, 4, 1),
      ),
    ),
  ],
)
```

## View Configuration Examples

### Week View with Limited Weeks (Date Picker)

Show only 2 weeks in month view:

```dart
SfDateRangePicker(
  view: DateRangePickerView.month,
  monthViewSettings: DateRangePickerMonthViewSettings(
    numberOfWeeksInView: 2,
  ),
)
```

### Month View with Custom Appointment Display (Calendar)

```dart
SfCalendar(
  view: CalendarView.month,
  monthViewSettings: MonthViewSettings(
    appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
    appointmentDisplayCount: 4,
    showAgenda: true,
    agendaViewHeight: 200,
    agendaItemHeight: 70,
  ),
)
```

### Timeline Day with Custom Time Range (Calendar)

```dart
SfCalendar(
  view: CalendarView.timelineDay,
  timeSlotViewSettings: TimeSlotViewSettings(
    startHour: 6,
    endHour: 22,
    timeInterval: Duration(minutes: 15),
    timeIntervalHeight: 60,
    timeFormat: 'h:mm a',
  ),
)
```

## View Selection Best Practices

### For Calendar:
- **Day/Week views** - Detailed scheduling with time slots
- **Month view** - Overview of appointments across weeks
- **Timeline views** - Horizontal layout for resource scheduling
- **Schedule view** - List format for chronological appointment viewing

### For Date Picker:
- **Month view** - Default for most date selection needs
- **Year view** - Quick month jumping
- **Decade view** - Select years far in future/past
- **Century view** - Long-range date selection (rare)

## Common View Patterns

### Pattern 1: Responsive View Switching
```dart
// Switch views based on screen size
final isMobile = MediaQuery.of(context).size.width < 600;

SfCalendar(
  view: isMobile ? CalendarView.day : CalendarView.week,
)
```

### Pattern 2: User-Controlled View Toggle
```dart
// Let users choose their preferred view
DropdownButton<CalendarView>(
  value: _selectedView,
  onChanged: (CalendarView? newView) {
    setState(() => _selectedView = newView!);
  },
  items: [
    DropdownMenuItem(value: CalendarView.day, child: Text('Day')),
    DropdownMenuItem(value: CalendarView.week, child: Text('Week')),
    DropdownMenuItem(value: CalendarView.month, child: Text('Month')),
  ],
)
```

### Pattern 3: Context-Aware Views
```dart
// Different views for different data densities
final appointmentCount = _getAppointmentCount();

SfCalendar(
  view: appointmentCount > 50 ? CalendarView.schedule : CalendarView.month,
)
```

## Next Steps

- **Date Navigation:** Read [date-navigations.md](date-navigations.md) for navigation controls
- **Calendar Appointments:** Read [appointments.md](appointments.md) for appointment display in views
- **Date Selection:** Read [selections.md](selections.md) for date picker selection modes
- **Customization:** Read [customization.md](customization.md) for view styling
