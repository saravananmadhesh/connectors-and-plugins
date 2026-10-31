# Date Navigation and Restrictions

Control how users navigate through dates and restrict selectable date ranges in both Calendar and Date Range Picker components.

## Initial Display Date

Set which date is displayed when the component first loads:

### Calendar
```dart
SfCalendar(
  view: CalendarView.week,
  initialDisplayDate: DateTime(2026, 4, 1),
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  initialDisplayDate: DateTime(2026, 4, 1),
)
```

## Navigation Arrows

Show forward/backward navigation arrows:

### Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  showNavigationArrow: true, // Show < > arrows
)
```

**Note:** Navigation arrows are not supported in schedule view.

### Date Range Picker
Navigation arrows are built-in and always visible in the header.

## Programmatic Navigation

Navigate to specific dates programmatically using controllers:

### Calendar Controller
```dart
class MyCalendar extends StatefulWidget {
  @override
  _MyCalendarState createState() => _MyCalendarState();
}

class _MyCalendarState extends State<MyCalendar> {
  final CalendarController _controller = CalendarController();

  void _navigateToDate(DateTime date) {
    _controller.displayDate = date;
  }

  void _goToToday() {
    _controller.displayDate = DateTime.now();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            ElevatedButton(
              onPressed: _goToToday,
              child: Text('Today'),
            ),
            ElevatedButton(
              onPressed: () => _navigateToDate(DateTime(2026, 12, 25)),
              child: Text('Christmas'),
            ),
          ],
        ),
        Expanded(
          child: SfCalendar(
            view: CalendarView.month,
            controller: _controller,
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

### Date Range Picker Controller
```dart
class MyDatePicker extends StatefulWidget {
  @override
  _MyDatePickerState createState() => _MyDatePickerState();
}

class _MyDatePickerState extends State<MyDatePicker> {
  final DateRangePickerController _controller = DateRangePickerController();

  void _navigateToMonth(DateTime date) {
    _controller.displayDate = date;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () => _navigateToMonth(DateTime(2027, 1, 1)),
          child: Text('Go to Jan 2027'),
        ),
        Container(
          height: 400,
          child: SfDateRangePicker(
            controller: _controller,
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

## Min/Max Date Restrictions

Limit selectable date ranges:

### Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  minDate: DateTime(2020, 1, 1),
  maxDate: DateTime(2030, 12, 31),
  // Dates outside this range are disabled
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  minDate: DateTime(2020, 1, 1),
  maxDate: DateTime(2030, 12, 31),
)
```

**Common Patterns:**

**Disable Past Dates:**
```dart
SfDateRangePicker(
  minDate: DateTime.now(),
  // Or use enablePastDates: false
  enablePastDates: false,
)
```

**Next 90 Days Only:**
```dart
SfDateRangePicker(
  minDate: DateTime.now(),
  maxDate: DateTime.now().add(Duration(days: 90)),
)
```

**Current Year Only:**
```dart
final now = DateTime.now();
SfDateRangePicker(
  minDate: DateTime(now.year, 1, 1),
  maxDate: DateTime(now.year, 12, 31),
)
```

## Blackout Dates (Disabled Dates)

Disable specific dates:

### Calendar Blackout Dates
```dart
SfCalendar(
  view: CalendarView.month,
  blackoutDates: [
    DateTime(2026, 3, 25),
    DateTime(2026, 3, 26),
    DateTime(2026, 4, 1),
  ],
  blackoutDatesTextStyle: TextStyle(
    decoration: TextDecoration.lineThrough,
    color: Colors.red,
  ),
)
```

### Date Range Picker Blackout Dates
```dart
SfDateRangePicker(
  monthViewSettings: DateRangePickerMonthViewSettings(
    blackoutDates: [
      DateTime(2026, 3, 25),
      DateTime(2026, 3, 26),
      DateTime(2026, 4, 1),
    ],
  ),
)
```

**Disable All Weekends:**
```dart
List<DateTime> _getWeekends(int year, int month) {
  List<DateTime> weekends = [];
  DateTime firstDay = DateTime(year, month, 1);
  DateTime lastDay = DateTime(year, month + 1, 0);

  for (DateTime date = firstDay; 
       date.isBefore(lastDay.add(Duration(days: 1)));
       date = date.add(Duration(days: 1))) {
    if (date.weekday == DateTime.saturday || date.weekday == DateTime.sunday) {
      weekends.add(date);
    }
  }
  return weekends;
}

SfDateRangePicker(
  monthViewSettings: DateRangePickerMonthViewSettings(
    blackoutDates: _getWeekends(2026, 3),
  ),
)
```

## Selectable Day Predicate (Custom Date Validation)

Define custom logic for which dates can be selected:

### Date Range Picker Only
```dart
SfDateRangePicker(
  selectableDayPredicate: (DateTime date) {
    // Disable weekends
    if (date.weekday == DateTime.saturday || date.weekday == DateTime.sunday) {
      return false;
    }
    
    // Disable holidays
    if (_holidays.contains(date)) {
      return false;
    }
    
    // Only allow dates in the future
    if (date.isBefore(DateTime.now())) {
      return false;
    }
    
    return true; // Date is selectable
  },
)
```

**Complex Example - Business Days Only:**
```dart
bool _isBusinessDay(DateTime date) {
  // Exclude weekends
  if (date.weekday == DateTime.saturday || date.weekday == DateTime.sunday) {
    return false;
  }
  
  // Exclude public holidays
  List<DateTime> publicHolidays = [
    DateTime(2026, 1, 1),  // New Year
    DateTime(2026, 7, 4),  // Independence Day
    DateTime(2026, 12, 25), // Christmas
  ];
  
  return !publicHolidays.any((holiday) =>
    date.year == holiday.year &&
    date.month == holiday.month &&
    date.day == holiday.day
  );
}

SfDateRangePicker(
  selectableDayPredicate: _isBusinessDay,
)
```

## View Navigation Control

Control whether users can navigate between view levels:

### Allow/Disallow View Navigation

**Date Range Picker:**
```dart
// Enable header tap to switch views (month → year → decade → century)
SfDateRangePicker(
  allowViewNavigation: true, // Default
)

// Disable view switching, allow cell selection in year/decade views
SfDateRangePicker(
  view: DateRangePickerView.year,
  allowViewNavigation: false, // Can select months directly
)
```

## View Changed Callback

Respond to view changes:

### Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  onViewChanged: (ViewChangedDetails details) {
    print('Visible dates: ${details.visibleDates}');
    // Load appointments for visible date range
    _loadAppointments(details.visibleDates.first, details.visibleDates.last);
  },
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  onViewChanged: (DateRangePickerViewChangedArgs args) {
    print('Visible dates: ${args.visibleDateRange}');
    // Update UI based on visible range
  },
)
```

## First Day of Week

Customize which day starts the week:

### Calendar
```dart
SfCalendar(
  firstDayOfWeek: 1, // 1 = Monday, 7 = Sunday (default)
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  monthViewSettings: DateRangePickerMonthViewSettings(
    firstDayOfWeek: 1, // Monday
  ),
)
```

##Common Navigation Patterns

### Pattern 1: Navigate to Next/Previous Month
```dart
void _navigateMonth(int offset) {
  final current = _controller.displayDate ?? DateTime.now();
  _controller.displayDate = DateTime(
    current.year,
    current.month + offset,
    1,
  );
}

// Next month
ElevatedButton(
  onPressed: () => _navigateMonth(1),
  child: Icon(Icons.arrow_forward),
)

// Previous month
ElevatedButton(
  onPressed: () => _navigateMonth(-1),
  child: Icon(Icons.arrow_back),
)
```

### Pattern 2: Jump to Specific Events
```dart
void _jumpToNextEvent() {
  final nextEvent = _getNextEventDate();
  _controller.displayDate = nextEvent;
  _controller.selectedDate = nextEvent;
}
```

### Pattern 3: Date Restriction with User Feedback
```dart
SfDateRangePicker(
  minDate: DateTime.now(),
  onSelectionChanged: (DateRangePickerSelectionChangedArgs args) {
    if (args.value is DateTime) {
      DateTime selected = args.value;
      if (selected.isBefore(DateTime.now())) {
        _showSnackBar('Past dates are not allowed');
      }
    }
  },
)
```

### Pattern 4: Dynamic Blackout Dates (Booked Dates)
```dart
class BookingPicker extends StatefulWidget {
  @override
  _BookingPickerState createState() => _BookingPickerState();
}

class _BookingPickerState extends State<BookingPicker> {
  List<DateTime> _bookedDates = [];

  @override
  void initState() {
    super.initState();
    _loadBookedDates();
  }

  Future<void> _loadBookedDates() async {
    // Fetch from API
    final booked = await _fetchBookedDates();
    setState(() {
      _bookedDates = booked;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SfDateRangePicker(
      selectionMode: DateRangePickerSelectionMode.range,
      monthViewSettings: DateRangePickerMonthViewSettings(
        blackoutDates: _bookedDates,
      ),
      selectableDayPredicate: (DateTime date) {
        return !_bookedDates.any((booked) =>
          date.year == booked.year &&
          date.month == booked.month &&
          date.day == booked.day
        );
      },
    );
  }
}
```

## Special Dates Highlighting

Highlight special dates without disabling them:

### Date Range Picker
```dart
SfDateRangePicker(
  monthViewSettings: DateRangePickerMonthViewSettings(
    specialDates: [
      DateTime(2026, 3, 20), // Special event
      DateTime(2026, 4, 1),  // Important date
    ],
  ),
  monthCellStyle: DateRangePickerMonthCellStyle(
    specialDatesTextStyle: TextStyle(
      color: Colors.orange,
      fontWeight: FontWeight.bold,
    ),
    specialDatesDecoration: BoxDecoration(
      border: Border.all(color: Colors.orange, width: 2),
      shape: BoxShape.circle,
    ),
  ),
)
```

## Next Steps

- **Views:** Read [views.md](views.md) for view types and configurations
- **Selections:** Read [selections.md](selections.md) for selection modes
- **Customization:** Read [customization.md](customization.md) for visual styling
- **Callbacks:** Read [callbacks.md](callbacks.md) for event handling
