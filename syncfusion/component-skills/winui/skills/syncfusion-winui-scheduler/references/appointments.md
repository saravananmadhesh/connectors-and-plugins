# Appointments

This reference provides comprehensive guidance on creating, managing, and binding appointments in the WinUI Scheduler.

## Table of Contents
- [Overview](#overview)
- [Schedule Appointment Class](#schedule-appointment-class)
- [Creating Appointments](#creating-appointments)
- [Custom Appointment Mapping](#custom-appointment-mapping)
- [ItemsSource Binding](#itemssource-binding)
- [All-Day Appointments](#all-day-appointments)
- [Spanning Appointments](#spanning-appointments)
- [Appointment Ordering](#appointment-ordering)
- [Recurrence Appointments](#recurrence-appointments)
- [Troubleshooting](#troubleshooting)

## Overview

The WinUI Scheduler has built-in capability to handle appointment arrangement internally based on the `ScheduleAppointmentCollection`. The scheduler supports rendering:
- Normal appointments
- All-day appointments  
- Spanned appointments
- Recurring appointments
- Recurrence exception date appointments

## Schedule Appointment Class

The `ScheduleAppointment` class represents a scheduled appointment with the following properties:

### Essential Properties

| Property | Type | Description |
|----------|------|-------------|
| `StartTime` | `DateTime` | Appointment start time |
| `EndTime` | `DateTime` | Appointment end time |
| `Subject` | `string` | Appointment subject/title |
| `Location` | `string` | Appointment location |
| `Notes` | `string` | Additional notes for the appointment |
| `IsAllDay` | `bool` | Whether appointment is all-day |

### Appearance Properties

| Property | Type | Description |
|----------|------|-------------|
| `AppointmentBackground` | `Brush` | Background color |
| `Foreground` | `Brush` | Text color |

### Recurrence Properties

| Property | Type | Description |
|----------|------|-------------|
| `RecurrenceRule` | `string` | iCal recurrence rule |
| `RecurrenceId` | `object` | Parent recurrence appointment ID |
| `RecurrenceExceptionDates` | `DateTime` collection | Exception dates |

### Resource Properties

| Property | Type | Description |
|----------|------|-------------|
| `ResourceIdCollection` | `ObservableCollection<object>` | Resource IDs |

### Time Zone Properties

| Property | Type | Description |
|----------|------|-------------|
| `StartTimeZone` | `string` | Start time zone |
| `EndTimeZone` | `string` | End time zone |

## Creating Appointments

### Method 1: Using ScheduleAppointment Directly

Create appointments using the `ScheduleAppointment` class:

```csharp
// Create appointment collection
var appointments = new ScheduleAppointmentCollection();

// Add simple appointment
appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(10),
    EndTime = DateTime.Now.Date.AddHours(12),
    Subject = "Client Meeting"
});

// Bind to scheduler
Schedule.ItemsSource = appointments;
```

### Method 2: With Additional Properties

```csharp
var appointments = new ScheduleAppointmentCollection();

appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(14),
    EndTime = DateTime.Now.Date.AddHours(15),
    Subject = "Product Demo",
    Location = "Conference Room B",
    Notes = "Prepare slides and demo environment",
    AppointmentBackground = new SolidColorBrush(Colors.Blue),
    Foreground = new SolidColorBrush(Colors.White)
});

Schedule.ItemsSource = appointments;
```

### Method 3: Multiple Appointments

```csharp
var appointments = new ScheduleAppointmentCollection();

// Morning meeting
appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(9),
    EndTime = DateTime.Now.Date.AddHours(10),
    Subject = "Morning Standup",
    AppointmentBackground = new SolidColorBrush(Colors.Green)
});

// Lunch break
appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(12),
    EndTime = DateTime.Now.Date.AddHours(13),
    Subject = "Lunch",
    IsAllDay = false,
    AppointmentBackground = new SolidColorBrush(Colors.Orange)
});

// Afternoon meeting
appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(15),
    EndTime = DateTime.Now.Date.AddHours(16),
    Subject = "Code Review",
    Location = "Dev Lab",
    AppointmentBackground = new SolidColorBrush(Colors.Purple)
});

Schedule.ItemsSource = appointments;
```

## Custom Appointment Mapping

Map custom business object properties to scheduler appointments using `AppointmentMapping`.

### Step 1: Create Business Object Class

```csharp
public class Meeting
{
    public string EventName { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public string Venue { get; set; }
    public string Description { get; set; }
    public Brush BackgroundColor { get; set; }
    public Brush ForegroundColor { get; set; }
    public bool IsFullDay { get; set; }
    public string RecurrencePattern { get; set; }
    public ObservableCollection<object> Resources { get; set; }
}
```

**Important:** The business object class MUST contain two `DateTime` fields (start and end) and one `string` field (subject) as mandatory.

### Step 2: Configure AppointmentMapping in XAML

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.AppointmentMapping>
        <scheduler:AppointmentMapping
            Subject="EventName"
            StartTime="From"
            EndTime="To"
            Location="Venue"
            Notes="Description"
            AppointmentBackground="BackgroundColor"
            Foreground="ForegroundColor"
            IsAllDay="IsFullDay"
            RecurrenceRule="RecurrencePattern"
            ResourceIdCollection="Resources"/>
    </scheduler:SfScheduler.AppointmentMapping>
</scheduler:SfScheduler>
```

### Step 3: Configure AppointmentMapping in C#

```csharp
var mapping = new AppointmentMapping();
mapping.Subject = "EventName";
mapping.StartTime = "From";
mapping.EndTime = "To";
mapping.Location = "Venue";
mapping.Notes = "Description";
mapping.AppointmentBackground = "BackgroundColor";
mapping.Foreground = "ForegroundColor";
mapping.IsAllDay = "IsFullDay";
mapping.RecurrenceRule = "RecurrencePattern";
mapping.ResourceIdCollection = "Resources";

Schedule.AppointmentMapping = mapping;
```

### Step 4: Create and Bind Custom Appointments

```csharp
var meetings = new ObservableCollection<Meeting>();

meetings.Add(new Meeting
{
    EventName = "Board Meeting",
    From = new DateTime(2024, 3, 22, 10, 0, 0),
    To = new DateTime(2024, 3, 22, 12, 0, 0),
    Venue = "Board Room",
    Description = "Quarterly review and strategy planning",
    BackgroundColor = new SolidColorBrush(Colors.Blue),
    ForegroundColor = new SolidColorBrush(Colors.White),
    IsFullDay = false
});

Schedule.ItemsSource = meetings;
```

## ItemsSource Binding

The scheduler supports binding any collection that implements `IEnumerable`.

### MVVM Pattern with Data Binding

**ViewModel:**
```csharp
public class SchedulerViewModel : INotifyPropertyChanged
{
    private ObservableCollection<Meeting> _meetings;
    
    public ObservableCollection<Meeting> Meetings
    {
        get => _meetings;
        set
        {
            _meetings = value;
            OnPropertyChanged(nameof(Meetings));
        }
    }
    
    public SchedulerViewModel()
    {
        Meetings = new ObservableCollection<Meeting>();
        LoadMeetings();
    }
    
    private void LoadMeetings()
    {
        Meetings.Add(new Meeting
        {
            EventName = "Team Sync",
            From = DateTime.Now.Date.AddHours(10),
            To = DateTime.Now.Date.AddHours(11),
            BackgroundColor = new SolidColorBrush(Colors.Green)
        });
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

**XAML with DataContext:**
```xml
<Page>
    <Page.DataContext>
        <local:SchedulerViewModel/>
    </Page.DataContext>
    
    <scheduler:SfScheduler ItemsSource="{Binding Meetings}">
        <scheduler:SfScheduler.AppointmentMapping>
            <scheduler:AppointmentMapping
                Subject="EventName"
                StartTime="From"
                EndTime="To"
                AppointmentBackground="BackgroundColor"/>
        </scheduler:SfScheduler.AppointmentMapping>
    </scheduler:SfScheduler>
</Page>
```

## All-Day Appointments

All-day appointments occupy the entire day and appear in the all-day appointment panel.

### Creating All-Day Appointments

```csharp
var appointments = new ScheduleAppointmentCollection();

appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date,
    EndTime = DateTime.Now.Date.AddDays(1),
    Subject = "Company Holiday",
    IsAllDay = true,
    AppointmentBackground = new SolidColorBrush(Colors.Red)
});

Schedule.ItemsSource = appointments;
```

### All-Day Appointment Characteristics

- **Time:** Start and end times are automatically set to 12:00 AM (midnight)
- **Display:** Appears in the all-day appointment panel above the time slots
- **Duration:** Can span multiple days
- **Time Zone:** Not applicable (no time component)

### Multiple All-Day Appointments

```csharp
var appointments = new ScheduleAppointmentCollection();

// Single day all-day appointment
appointments.Add(new ScheduleAppointment
{
    StartTime = new DateTime(2024, 3, 22),
    EndTime = new DateTime(2024, 3, 23),
    Subject = "Birthday",
    IsAllDay = true,
    AppointmentBackground = new SolidColorBrush(Colors.Pink)
});

// Multi-day all-day appointment
appointments.Add(new ScheduleAppointment
{
    StartTime = new DateTime(2024, 3, 25),
    EndTime = new DateTime(2024, 3, 28),
    Subject = "Conference Trip",
    IsAllDay = true,
    AppointmentBackground = new SolidColorBrush(Colors.Blue)
});

Schedule.ItemsSource = appointments;
```

## Spanning Appointments

Spanning appointments last more than 24 hours and render in the `AllDayAppointmentPanel`.

### Creating Spanning Appointments

```csharp
var meetings = new ObservableCollection<Meeting>();

var meeting = new Meeting
{
    EventName = "Training Workshop",
    From = new DateTime(2024, 3, 22, 10, 0, 0),
    To = new DateTime(2024, 3, 24, 15, 0, 0), // Spans 2+ days
    BackgroundColor = new SolidColorBrush(Colors.MediumPurple),
    ForegroundColor = new SolidColorBrush(Colors.White)
};

meetings.Add(meeting);
Schedule.ItemsSource = meetings;
```

### Spanning vs All-Day Appointments

| Feature | Spanning Appointment | All-Day Appointment |
|---------|---------------------|-------------------|
| Duration | >24 hours with specific times | Full day(s) |
| Time displayed | Yes (start/end times shown) | No (all day) |
| IsAllDay property | false | true |
| Display location | All-day panel | All-day panel |

## Appointment Ordering

The scheduler arranges appointments automatically based on specific rules.

### Day, Week, WorkWeek Views

Appointments are arranged by:
1. Start time (earliest first)
2. Duration (longer appointments first if same start time)
3. Creation order (if same start time and duration)

### Timeline Views

All appointments (span, all-day, normal) are ordered by:
1. Start date-time
2. Time duration  
3. `IsSpanned` flag
4. `IsAllDay` flag
5. Normal appointments

### Overlapping Appointments

When multiple appointments overlap:
- Scheduler automatically calculates positions
- Appointments are displayed side-by-side in the same time slot
- Width is adjusted to fit all overlapping appointments

```csharp
var appointments = new ScheduleAppointmentCollection();

// These will overlap and display side-by-side
appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(10),
    EndTime = DateTime.Now.Date.AddHours(11),
    Subject = "Meeting A",
    AppointmentBackground = new SolidColorBrush(Colors.Blue)
});

appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(10), // Same start time
    EndTime = DateTime.Now.Date.AddHours(11),
    Subject = "Meeting B",
    AppointmentBackground = new SolidColorBrush(Colors.Green)
});

Schedule.ItemsSource = appointments;
```

## Recurrence Appointments

Create repeating appointments using recurrence rules.

### Basic Recurrence

```csharp
var appointments = new ScheduleAppointmentCollection();

appointments.Add(new ScheduleAppointment
{
    StartTime = DateTime.Now.Date.AddHours(9),
    EndTime = DateTime.Now.Date.AddHours(10),
    Subject = "Daily Standup",
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=10",
    AppointmentBackground = new SolidColorBrush(Colors.Orange)
});

Schedule.ItemsSource = appointments;
```

### Recurrence Rule Format

Uses iCalendar (RFC 5545) format:

**Daily:**
```
FREQ=DAILY;INTERVAL=1;COUNT=10
```
- Repeats every day for 10 occurrences

**Weekly:**
```
FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=12
```
- Repeats every Monday, Wednesday, Friday for 12 occurrences

**Monthly:**
```
FREQ=MONTHLY;BYMONTHDAY=15;COUNT=6
```
- Repeats on the 15th of each month for 6 months

**Yearly:**
```
FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=22;COUNT=5
```
- Repeats every March 22nd for 5 years

### Recurrence with Exceptions

```csharp
var appointments = new ScheduleAppointmentCollection();

var recurringAppointment = new ScheduleAppointment
{
    StartTime = new DateTime(2024, 3, 22, 10, 0, 0),
    EndTime = new DateTime(2024, 3, 22, 11, 0, 0),
    Subject = "Weekly Team Meeting",
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=FR;COUNT=10",
    AppointmentBackground = new SolidColorBrush(Colors.Blue)
};

// Exclude specific dates
recurringAppointment.RecurrenceExceptionDates = new ObservableCollection<DateTime>
{
    new DateTime(2024, 3, 29), // Skip this occurrence
    new DateTime(2024, 4, 5)   // Skip this occurrence
};

appointments.Add(recurringAppointment);
Schedule.ItemsSource = appointments;
```

## Troubleshooting

### Appointments Not Showing

**Problem:** Appointments don't appear in the scheduler.

**Solutions:**
1. Verify `ItemsSource` is set correctly
2. Check appointment `StartTime` is within the visible date range
3. Ensure `EndTime` is after `StartTime`
4. Verify `ViewType` matches appointment times (Day view won't show appointments on other days)
5. Check that `AppointmentMapping` is configured correctly for custom objects

### Appointment Times Incorrect

**Problem:** Appointments show at wrong times.

**Solutions:**
1. Check time zone settings (`StartTimeZone`, `EndTimeZone`, scheduler `TimeZone`)
2. Verify `DateTime` objects have correct date and time components
3. Ensure no UTC conversion issues

### Custom Appointments Not Binding

**Problem:** Custom business objects don't display as appointments.

**Solutions:**
1. Verify `AppointmentMapping` is configured with correct property names
2. Ensure business object has required fields (StartTime, EndTime, Subject equivalents)
3. Check property names match exactly (case-sensitive)
4. Implement `INotifyPropertyChanged` for dynamic updates

### Overlapping Appointments Not Visible

**Problem:** Multiple appointments at same time only show one.

**Solutions:**
1. Scheduler should automatically handle overlaps - verify appointments actually have same time
2. Check container width is sufficient to display side-by-side appointments
3. Ensure appointments are added to the collection correctly

### Recurrence Not Working

**Problem:** Recurring appointments don't repeat.

**Solutions:**
1. Verify `RecurrenceRule` syntax follows iCal format
2. Check `COUNT` or `UNTIL` is set appropriately
3. Ensure parent appointment has valid start/end times
4. Verify no syntax errors in recurrence rule string

## Best Practices

### Performance
- Use `ObservableCollection` for automatic UI updates
- Avoid excessive appointments in a single view (consider load-on-demand)
- Minimize property changes during batch operations

### Data Binding
- Implement `INotifyPropertyChanged` in custom appointment classes
- Use MVVM pattern for clean separation of concerns
- Bind to observable collections for dynamic updates

### Appointment Creation
- Set meaningful `Subject` for user clarity
- Include `Location` for context
- Use `Notes` for additional details
- Apply consistent color schemes for appointment categories

### Recurrence
- Test recurrence rules thoroughly
- Handle exception dates appropriately
- Provide user feedback for recurring appointment edits

### Validation
- Validate `EndTime` is after `StartTime`
- Check for reasonable appointment durations
- Handle edge cases (midnight, day boundaries)
