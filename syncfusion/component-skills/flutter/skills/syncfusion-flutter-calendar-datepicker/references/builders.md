# Custom Builders

Build custom UI for calendar cells and appointments using builder functions.

## Month Cell Builder

Customize individual month cell appearance:

### Calendar
```dart
SfCalendar(
  view: CalendarView.month,
  monthCellBuilder: (BuildContext context, MonthCellDetails details) {
    final bool isToday = details.date.day == DateTime.now().day &&
                         details.date.month == DateTime.now().month;
    
    return Container(
      decoration: BoxDecoration(
        color: isToday ? Colors.blue[100] : Colors.transparent,
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Center(
        child: Text(
          details.date.day.toString(),
          style: TextStyle(
            color: isToday ? Colors.blue : Colors.black,
            fontWeight: isToday ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  },
)
```

### Date Range Picker
```dart
SfDateRangePicker(
  monthCellBuilder: (BuildContext context, DateRangePickerMonthCellDetails details) {
    final bool isWeekend = details.date.weekday == DateTime.saturday ||
                           details.date.weekday == DateTime.sunday;
    
    return Container(
      decoration: BoxDecoration(
        color: isWeekend ? Colors.red[50] : Colors.white,
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Text(
          details.date.day.toString(),
          style: TextStyle(
            color: isWeekend ? Colors.red : Colors.black,
          ),
        ),
      ),
    );
  },
)
```

## Year Cell Builder (Date Range Picker)

```dart
SfDateRangePicker(
  view: DateRangePickerView.year,
  yearCellBuilder: (BuildContext context, DateRangePickerYearCellDetails details) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text(
          details.text, // Month name or year
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
    );
  },
)
```

## Appointment Builder (Calendar)

Customize appointment appearance:

```dart
SfCalendar(
  view: CalendarView.week,
  dataSource: _dataSource,
  appointmentBuilder: (BuildContext context, CalendarAppointmentDetails details) {
    final Appointment appointment = details.appointments.first;
    
    return Container(
      decoration: BoxDecoration(
        color: appointment.color.withOpacity(0.8),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: appointment.color, width: 2),
      ),
      padding: EdgeInsets.all(4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            appointment.subject,
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          if (appointment.location != null)
            Text(
              appointment.location!,
              style: TextStyle(color: Colors.white70, fontSize: 10),
              maxLines: 1,
            ),
        ],
      ),
    );
  },
)
```

## Time Region Builder (Calendar)

```dart
SfCalendar(
  view: CalendarView.week,
  timeRegionBuilder: (BuildContext context, TimeRegionDetails details) {
    return Container(
      color: Colors.grey.withOpacity(0.2),
      child: Center(
        child: Text(
          details.region.text ?? '',
          style: TextStyle(color: Colors.grey[600]),
        ),
      ),
    );
  },
)
```

## Advanced Builder Examples

### Event Counter in Month Cell
```dart
monthCellBuilder: (BuildContext context, MonthCellDetails details) {
  final int eventCount = _getEventCountForDate(details.date);
  
  return Container(
    child: Stack(
      children: [
        Center(child: Text(details.date.day.toString())),
        if (eventCount > 0)
          Positioned(
            bottom: 2,
            right: 2,
            child: Container(
              padding: EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: Colors.red,
                shape: BoxShape.circle,
              ),
              child: Text(
                eventCount.toString(),
                style: TextStyle(color: Colors.white, fontSize: 10),
              ),
            ),
          ),
      ],
    ),
  );
}
```

### Icon-Based Date Picker
```dart
monthCellBuilder: (BuildContext context, DateRangePickerMonthCellDetails details) {
  final bool hasEvent = _hasEventOnDate(details.date);
  
  return Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Text(details.date.day.toString()),
      if (hasEvent)
        Icon(Icons.event, size: 12, color: Colors.blue),
    ],
  );
}
```

## Next Steps

- **Customization:** Read [customization.md](customization.md) for styling
- **Appointments:** Read [appointments.md](appointments.md) for appointment details
