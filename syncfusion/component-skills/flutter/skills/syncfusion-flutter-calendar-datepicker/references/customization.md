# Visual Customization and Styling

Customize the appearance of both Calendar and Date Range Picker components with colors, styles, and decorations.

## Today Highlight Color

Customize the color used to highlight today's date:

### Both Components
```dart
// Calendar
SfCalendar(
  view: CalendarView.month,
  todayHighlightColor: Colors.red,
)

// Date Range Picker
SfDateRangePicker(
  todayHighlightColor: Colors.blue,
)
```

## Cell Border and Background Colors

###Calendar
```dart
SfCalendar(
  view: CalendarView.week,
  cellBorderColor: Colors.grey[300],
  backgroundColor: Colors.white,
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  backgroundColor: Colors.grey[50],
  // Cell borders are controlled by month cell style
)
```

## Selection Decoration and Colors

### Calendar Selection
```dart
SfCalendar(
  view: CalendarView.month,
  selectionDecoration: BoxDecoration(
    color: Colors.transparent,
    border: Border.all(color: Colors.blue, width: 2),
    borderRadius: BorderRadius.circular(4),
    shape: BoxShape.rectangle,
  ),
)
```

### Date Range Picker Selection
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  // Single/Multiple selection color
  selectionColor: Colors.blue,
  // Range fill color
  rangeSelectionColor: Colors.blue.withOpacity(0.3),
  // Start date color
  startRangeSelectionColor: Colors.blue,
  // End date color
  endRangeSelectionColor: Colors.blue,
  // Selection shape
  selectionShape: DateRangePickerSelectionShape.circle,
  // Selection radius (for rectangle shape)
  selectionRadius: 15,
)
```

## Month Cell Styling

### Calendar Month Cells
```dart
SfCalendar(
  view: CalendarView.month,
  monthViewSettings: MonthViewSettings(
    monthCellStyle: MonthCellStyle(
      backgroundColor: Colors.white,
      todayBackgroundColor: Colors.blue[50],
      leadingDatesBackgroundColor: Colors.grey[100],
      trailingDatesBackgroundColor: Colors.grey[100],
      textStyle: TextStyle(fontSize: 14, color: Colors.black),
      todayTextStyle: TextStyle(fontSize: 14, color: Colors.blue, fontWeight: FontWeight.bold),
      leadingDatesTextStyle: TextStyle(fontSize: 12, color: Colors.grey),
      trailingDatesTextStyle: TextStyle(fontSize: 12, color: Colors.grey),
    ),
  ),
)
```

### Date Range Picker Month Cells
```dart
SfDateRangePicker(
  monthCellStyle: DateRangePickerMonthCellStyle(
    textStyle: TextStyle(fontSize: 14, color: Colors.black87),
    todayTextStyle: TextStyle(fontSize: 16, color: Colors.blue, fontWeight: FontWeight.bold),
    leadingDatesTextStyle: TextStyle(fontSize: 12, color: Colors.grey),
    trailingDatesTextStyle: TextStyle(fontSize: 12, color: Colors.grey),
    disabledDatesTextStyle: TextStyle(fontSize: 14, color: Colors.grey[300]),
    blackoutDateTextStyle: TextStyle(fontSize: 14, color: Colors.red, decoration: TextDecoration.lineThrough),
    weekendTextStyle: TextStyle(fontSize: 14, color: Colors.red[300]),
    specialDatesTextStyle: TextStyle(fontSize: 14, color: Colors.orange, fontWeight: FontWeight.bold),
    // Cell decorations
    todayCellDecoration: BoxDecoration(
      color: Colors.blue[50],
      border: Border.all(color: Colors.blue, width: 1),
      shape: BoxShape.circle,
    ),
    disabledDatesDecoration: BoxDecoration(
      color: Colors.grey[100],
      shape: BoxShape.circle,
    ),
    specialDatesDecoration: BoxDecoration(
      border: Border.all(color: Colors.orange, width: 2),
      shape: BoxShape.circle,
    ),
  ),
)
```

## Year Cell Styling (Date Range Picker)

```dart
SfDateRangePicker(
  view: DateRangePickerView.year,
  yearCellStyle: DateRangePickerYearCellStyle(
    textStyle: TextStyle(fontSize: 14, color: Colors.black87),
    todayTextStyle: TextStyle(fontSize: 16, color: Colors.blue, fontWeight: FontWeight.bold),
    leadingDatesTextStyle: TextStyle(fontSize: 12, color: Colors.grey),
    disabledDatesTextStyle: TextStyle(fontSize: 14, color: Colors.grey[300]),
    todayCellDecoration: BoxDecoration(
      color: Colors.blue[50],
      border: Border.all(color: Colors.blue, width: 1),
      shape: BoxShape.rectangle,
      borderRadius: BorderRadius.circular(4),
    ),
  ),
)
```

## Header Customization

### Calendar Header
```dart
SfCalendar(
  view: CalendarView.month,
  headerStyle: CalendarHeaderStyle(
    textAlign: TextAlign.center,
    backgroundColor: Colors.blue,
    textStyle: TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.bold,
      color: Colors.white,
    ),
  ),
  headerHeight: 60,
)
```

#### Custom Header Widget (full control)

If you need a fully custom header (custom layout, actions, or dynamic title), hide the built-in header and place your own widget above the `SfCalendar`. This approach gives complete control over visuals and behavior. The pattern below hides the built-in header by setting `headerHeight: 0` and updates the header using callbacks or a controller.

```dart
class CustomCalendarWithHeader extends StatefulWidget {
  @override
  _CustomCalendarWithHeaderState createState() => _CustomCalendarWithHeaderState();
}

class _CustomCalendarWithHeaderState extends State<CustomCalendarWithHeader> {
  DateTime _displayDate = DateTime.now();

  void _goToPreviousMonth() {
    setState(() {
      _displayDate = DateTime(_displayDate.year, _displayDate.month - 1);
    });
  }

  void _goToNextMonth() {
    setState(() {
      _displayDate = DateTime(_displayDate.year, _displayDate.month + 1);
    });
  }

  @override
  Widget build(BuildContext context) {
    final title = DateFormat.yMMMM().format(_displayDate);

    return Column(
      children: [
        // Custom header
        Container(
          height: 64,
          color: Colors.blue,
          padding: EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(icon: Icon(Icons.chevron_left, color: Colors.white), onPressed: _goToPreviousMonth),
              Text(title, style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              IconButton(icon: Icon(Icons.chevron_right, color: Colors.white), onPressed: _goToNextMonth),
            ],
          ),
        ),

        // Calendar (hide built-in header)
        Expanded(
          child: SfCalendar(
            view: CalendarView.month,
            headerHeight: 0, // hide built-in header
            onViewChanged: (ViewChangedDetails details) {
              // Update display date based on visible dates from the calendar
              final visibleDates = details.visibleDates;
              if (visibleDates != null && visibleDates.isNotEmpty) {
                setState(() {
                  _displayDate = visibleDates[visibleDates.length ~/ 2];
                });
              }
            },
          ),
        ),
      ],
    );
  }
}
```

Note: Use the `onViewChanged` callback or a controller to keep the custom header title in sync with the calendar. For more advanced examples and ideas, see the Syncfusion sample repository: https://github.com/SyncfusionExamples/header-customization-calendar-flutter

### Date Range Picker Header
```dart
SfDateRangePicker(
  headerStyle: DateRangePickerHeaderStyle(
    textAlign: TextAlign.center,
    backgroundColor: Colors.blue,
    textStyle: TextStyle(
      fontSize: 18,
      fontWeight: FontWeight.bold,
      color: Colors.white,
    ),
  ),
  headerHeight: 50,
)
```

## View Header Customization (Day Names)

### Calendar View Header
```dart
SfCalendar(
  view: CalendarView.month,
  viewHeaderStyle: ViewHeaderStyle(
    backgroundColor: Colors.blue[50],
    dayTextStyle: TextStyle(fontSize: 12, color: Colors.blue, fontWeight: FontWeight.bold),
    dateTextStyle: TextStyle(fontSize: 20, color: Colors.black),
  ),
  viewHeaderHeight: 50,
)
```

### Date Range Picker View Header
```dart
SfDateRangePicker(
  monthViewSettings: DateRangePickerMonthViewSettings(
    viewHeaderStyle: DateRangePickerViewHeaderStyle(
      backgroundColor: Colors.blue[50],
      textStyle: TextStyle(
        fontSize: 12,
        color: Colors.blue,
        fontWeight: FontWeight.bold,
      ),
    ),
    viewHeaderHeight: 40,
  ),
)
```

## Cell End Padding (Calendar)

Add padding to month cells for better touch targets when appointments are present:

```dart
SfCalendar(
  view: CalendarView.month,
  cellEndPadding: 5, // Padding at right end of the cell. 
)
```

Note: This is not applicable for month agenda and schedule view appointments.

## Theme Integration

Integrate with Flutter's theme system:

```dart
MaterialApp(
  theme: ThemeData(
    primaryColor: Colors.blue,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
  ),
  home: Scaffold(
    body: SfCalendar(
      view: CalendarView.month,
      // Automatically uses theme colors
    ),
  ),
)
```

## Complete Customization Examples

### Minimal Modern Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  todayHighlightColor: Colors.blue,
  backgroundColor: Colors.white,
  cellBorderColor: Colors.transparent,
  headerStyle: CalendarHeaderStyle(
    textAlign: TextAlign.center,
    backgroundColor: Colors.white,
    textStyle: TextStyle(
      fontSize: 20,
      color: Colors.black87,
      fontWeight: FontWeight.w600,
    ),
  ),
  monthViewSettings: MonthViewSettings(
    monthCellStyle: MonthCellStyle(
      textStyle: TextStyle(fontSize: 14),
      todayTextStyle: TextStyle(fontSize: 14, color: Colors.blue, fontWeight: FontWeight.bold),
    ),
  ),
  selectionDecoration: BoxDecoration(
    color: Colors.transparent,
    border: Border.all(color: Colors.blue, width: 2),
    shape: BoxShape.circle,
  ),
)
```

### Dark Theme Date Picker
```dart
SfDateRangePicker(
  selectionMode: DateRangePickerSelectionMode.range,
  backgroundColor: Colors.grey[900],
  todayHighlightColor: Colors.tealAccent,
  selectionColor: Colors.teal,
  rangeSelectionColor: Colors.teal.withOpacity(0.2),
  startRangeSelectionColor: Colors.teal,
  endRangeSelectionColor: Colors.teal,
  headerStyle: DateRangePickerHeaderStyle(
    backgroundColor: Colors.grey[850],
    textStyle: TextStyle(color: Colors.white, fontSize: 18),
  ),
  monthCellStyle: DateRangePickerMonthCellStyle(
    textStyle: TextStyle(color: Colors.white70),
    todayTextStyle: TextStyle(color: Colors.tealAccent, fontWeight: FontWeight.bold),
    weekendTextStyle: TextStyle(color: Colors.red[200]),
  ),
  monthViewSettings: DateRangePickerMonthViewSettings(
    viewHeaderStyle: DateRangePickerViewHeaderStyle(
      backgroundColor: Colors.grey[800],
      textStyle: TextStyle(color: Colors.white70, fontSize: 12),
    ),
  ),
)
```

### Colorful Branded Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  todayHighlightColor: Color(0xFFFF6B35),
  backgroundColor: Color(0xFFFFF8F0),
  cellBorderColor: Color(0xFFFFE5CC),
  headerStyle: CalendarHeaderStyle(
    backgroundColor: Color(0xFFFF6B35),
    textStyle: TextStyle(
      color: Colors.white,
      fontSize: 22,
      fontWeight: FontWeight.bold,
    ),
  ),
  viewHeaderStyle: ViewHeaderStyle(
    backgroundColor: Color(0xFFFFD4B8),
    dayTextStyle: TextStyle(
      color: Color(0xFFFF6B35),
      fontWeight: FontWeight.w600,
    ),
  ),
  monthViewSettings: MonthViewSettings(
    appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
  ),
)
```

## Next Steps

- **Builders:** Read [builders.md](builders.md) for custom cell builders
- **Views:** Read [views.md](views.md) for view-specific customization
- **Localization:** Read [localization.md](localization.md) for internationalization
