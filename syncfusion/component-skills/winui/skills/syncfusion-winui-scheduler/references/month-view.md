# Month View

This reference provides comprehensive guidance on the Month view in the WinUI Scheduler for displaying appointments across an entire month.

## Overview

The Month view displays a calendar grid showing all days of the month with appointment indicators. It provides a high-level overview of scheduled appointments across the month.

## Enabling Month View

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Month" />
```

```csharp
Schedule.ViewType = SchedulerViewType.Month;
```

**Use When:**
- Monthly overview is needed
- High-level appointment density visualization
- Users need to see the entire month at once
- Detailed time slots are not necessary

## Month View Appearance

### Cell Structure
- Calendar grid with days of the month
- Leading and trailing dates from adjacent months shown in different style
- Appointments displayed as indicators or text within cells
- Current date highlighted

### Default Behavior
- Shows all appointments for each day
- Multiple appointments indicated with "+N more" indicator
- Click on "+N more" to see all appointments in agenda view

## Month Cell Appearance

### Month Cell Height

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Month">
    <scheduler:SfScheduler.MonthViewSettings>
        <scheduler:MonthViewSettings MonthCellHeight="120" />
    </scheduler:SfScheduler.MonthViewSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.MonthViewSettings.MonthCellHeight = 120; // Default varies
```

**Values:**
- Larger values = more appointments visible per day, more scrolling
- Smaller values = compact view, less scrolling, fewer appointments visible
- Adjust based on typical appointment density

### Leading and Trailing Dates

Control whether adjacent month dates are shown:

```csharp
// Show leading and trailing dates (default)
Schedule.MonthViewSettings.ShowLeadingAndTrailingDates = true;

// Hide dates from adjacent months
Schedule.MonthViewSettings.ShowLeadingAndTrailingDates = false;
```

**Behavior:**
- `true`: Shows grayed-out dates from previous/next month
- `false`: Empty cells for dates outside current month

## Appointment Display

### Appointment Display Mode

Control how appointments are shown in month cells:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Month">
    <scheduler:SfScheduler.MonthViewSettings>
        <scheduler:MonthViewSettings AppointmentDisplayMode="Indicator" />
    </scheduler:SfScheduler.MonthViewSettings>
</scheduler:SfScheduler>
```

```csharp
// Show as colored indicators (circles/dots)
Schedule.MonthViewSettings.AppointmentDisplayMode = AppointmentDisplayMode.Indicator;

// Show appointment text
Schedule.MonthViewSettings.AppointmentDisplayMode = AppointmentDisplayMode.Appointment;

// No appointments shown
Schedule.MonthViewSettings.AppointmentDisplayMode = AppointmentDisplayMode.None;
```

**Modes:**
- **Indicator** - Colored circles representing appointments (compact)
- **Appointment** - Shows appointment subject text (detailed)
- **None** - Hide appointments (show only dates)

### Appointment Display Count

Limit number of appointments shown per day:

```csharp
// Show up to 3 appointments per day
Schedule.MonthViewSettings.AppointmentDisplayCount = 3;

// Show all appointments (no limit)
Schedule.MonthViewSettings.AppointmentDisplayCount = -1; // or int.MaxValue
```

**Behavior:**
- When limit is exceeded, "+N more" indicator appears
- Click "+N more" to open agenda view with all appointments
- Default: 4 appointments

### More Appointments Indicator

The "+N more" text appears when appointments exceed display count:

```csharp
Schedule.CellTapped += (s, e) =>
{
    // Detect click on "more" indicator
    if (e.Element == SchedulerElement.MoreAppointments)
    {
        var date = e.Date;
        // Show agenda view or custom popup
        ShowAgendaView(date);
    }
};
```

## Agenda View

### Agenda View Overview

The agenda view shows all appointments for a selected day:

```csharp
Schedule.MonthViewSettings.ShowAgendaView = true; // Default is true
```

**Behavior:**
- Appears when clicking on a day with appointments
- Shows all appointments for that day
- Scrollable list format

### Agenda View Height

Control the height of the agenda view panel:

```csharp
Schedule.MonthViewSettings.AgendaViewHeight = 200; // Default is 100
```

**Values:**
- Larger values = more appointments visible without scrolling
- Smaller values = compact agenda view
- 0 = Minimal height (not recommended)

### Disable Agenda View

```csharp
Schedule.MonthViewSettings.ShowAgendaView = false;
```

**When Disabled:**
- Clicking on days doesn't show agenda
- Use `CellTapped` event for custom behavior
- More appointments indicator still appears

## Navigation

### Display Date

Navigate to specific month:

```csharp
// Show June 2026
Schedule.DisplayDate = new DateTime(2026, 6, 1);

// Show current month
Schedule.DisplayDate = DateTime.Today;
```

### Forward/Backward Navigation

```csharp
// Next month
Schedule.Forward();

// Previous month
Schedule.Backward();
```

### View Changed Event

Detect month changes:

```csharp
Schedule.ViewChanged += (s, e) =>
{
    var oldMonth = e.OldVisibleDates.First();
    var newMonth = e.NewVisibleDates.First();
    
    Debug.WriteLine($"Month changed from {oldMonth:MMMM yyyy} to {newMonth:MMMM yyyy}");
    
    // Reload appointments if needed
    LoadAppointmentsForMonth(newMonth);
};
```

## Cell Interaction

### Cell Tapped Event

Handle clicks on month cells:

```csharp
Schedule.CellTapped += (s, e) =>
{
    switch (e.Element)
    {
        case SchedulerElement.Cell:
            // Regular date cell clicked
            var selectedDate = e.Date;
            Debug.WriteLine($"Date clicked: {selectedDate:MM/dd/yyyy}");
            break;
            
        case SchedulerElement.MoreAppointments:
            // "+N more" indicator clicked
            ShowAgendaView(e.Date);
            break;
            
        case SchedulerElement.Appointment:
            // Appointment clicked (if AppointmentDisplayMode = Appointment)
            var appointment = e.Appointment;
            ShowAppointmentDetails(appointment);
            break;
    }
};
```

### Double-Click to Create

Double-click on a date to create appointment:

```csharp
Schedule.CellDoubleTapped += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        // Create appointment on this date
        var newAppointment = new ScheduleAppointment
        {
            Subject = "New Appointment",
            StartTime = e.Date,
            EndTime = e.Date.AddHours(1)
        };
        
        Schedule.ItemsSource.Add(newAppointment);
    }
};
```

## First Day of Week

Set which day starts the week:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="Month"
                      FirstDayOfWeek="Sunday" />
```

```csharp
// Start week on Sunday (default in US)
Schedule.FirstDayOfWeek = DayOfWeek.Sunday;

// Start week on Monday (common in Europe)
Schedule.FirstDayOfWeek = DayOfWeek.Monday;
```

## Common Patterns

### Pattern 1: Compact Month View with Indicators

```csharp
// Minimalist month view
Schedule.ViewType = SchedulerViewType.Month;
Schedule.MonthViewSettings.AppointmentDisplayMode = AppointmentDisplayMode.Indicator;
Schedule.MonthViewSettings.MonthCellHeight = 80;
Schedule.MonthViewSettings.AppointmentDisplayCount = -1; // Show all as dots
Schedule.MonthViewSettings.ShowAgendaView = true;
```

### Pattern 2: Detailed Month View

```csharp
// Show appointment text
Schedule.ViewType = SchedulerViewType.Month;
Schedule.MonthViewSettings.AppointmentDisplayMode = AppointmentDisplayMode.Appointment;
Schedule.MonthViewSettings.MonthCellHeight = 150;
Schedule.MonthViewSettings.AppointmentDisplayCount = 5;
Schedule.MonthViewSettings.AgendaViewHeight = 250;
```

### Pattern 3: Month with Custom Cell Click

```csharp
// Disable agenda, use custom popup
Schedule.MonthViewSettings.ShowAgendaView = false;

Schedule.CellTapped += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        ShowCustomAppointmentPopup(e.Date, GetAppointmentsForDate(e.Date));
    }
};

private List<ScheduleAppointment> GetAppointmentsForDate(DateTime date)
{
    var appointments = Schedule.ItemsSource as ScheduleAppointmentCollection;
    return appointments.Where(apt => 
        apt.StartTime.Date == date.Date).ToList();
}
```

### Pattern 4: Month with External Agenda List

```csharp
// Show month + separate agenda list
Schedule.ViewType = SchedulerViewType.Month;
Schedule.MonthViewSettings.ShowAgendaView = false;

Schedule.CellTapped += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        // Update separate ListBox/ListView with appointments
        AgendaListView.ItemsSource = GetAppointmentsForDate(e.Date);
        SelectedDateText.Text = e.Date.ToString("MMMM dd, yyyy");
    }
};
```

### Pattern 5: Month Overview with Quick Add

```csharp
Schedule.ViewType = SchedulerViewType.Month;

Schedule.CellTapped += async (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        var result = await ShowQuickAddDialog(e.Date);
        if (result != null)
        {
            Schedule.ItemsSource.Add(result);
        }
    }
};
```

## Customization

### Month Cell Style

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Month">
    <scheduler:SfScheduler.MonthViewSettings>
        <scheduler:MonthViewSettings>
            <scheduler:MonthViewSettings.MonthCellStyle>
                <Style TargetType="scheduler:MonthCellControl">
                    <Setter Property="Background" Value="White" />
                    <Setter Property="BorderBrush" Value="LightGray" />
                    <Setter Property="BorderThickness" Value="1" />
                </Style>
            </scheduler:MonthViewSettings.MonthCellStyle>
        </scheduler:MonthViewSettings>
    </scheduler:SfScheduler.MonthViewSettings>
</scheduler:SfScheduler>
```

### View Header Settings

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Month">
    <scheduler:SfScheduler.ViewHeaderSettings>
        <scheduler:ViewHeaderSettings Height="50" />
    </scheduler:SfScheduler.ViewHeaderSettings>
</scheduler:SfScheduler>
```

### Month Header Format

```csharp
// Custom month/year format
Schedule.ViewHeaderSettings.DateFormat = "MMMM yyyy"; // "June 2026"
```

## Best Practices

### Display Mode Selection
- **Indicator**: Best for high-density calendars (many appointments)
- **Appointment**: Best when appointment subjects are important
- **None**: Best when only showing availability (colored days)

### Cell Height
- Adjust based on typical appointments per day
- Taller cells for appointment text display
- Shorter cells for indicator mode
- Consider mobile vs desktop screen sizes

### Appointment Count
- Limit to 3-5 for better readability
- Use agenda view for days with many appointments
- Consider appointment density in your application

### Navigation
- Provide clear month/year display
- Include previous/next navigation buttons
- Consider jump-to-date functionality

## Troubleshooting

### Appointments Not Showing

**Problem:** Appointments don't appear in month view.

**Solutions:**
- Check `AppointmentDisplayMode` is not `None`
- Verify appointments are in current month
- Ensure `ItemsSource` is properly set
- Check if appointments fall within `DisplayDate` month

### "+N more" Not Clickable

**Problem:** Cannot click on "+N more" indicator.

**Solutions:**
- Verify `ShowAgendaView = true`
- Check if `CellTapped` event is canceling default behavior
- Ensure control is not disabled

### Agenda View Not Appearing

**Problem:** Agenda view doesn't show when clicking dates.

**Solutions:**
- Set `ShowAgendaView = true`
- Check `AgendaViewHeight` is not 0
- Verify date has appointments
- Check if custom `CellTapped` handler is preventing default

### Month Cells Too Small

**Problem:** Month cells are too compressed.

**Solutions:**
- Increase `MonthCellHeight`
- Reduce number of weeks shown (not directly configurable)
- Check container height constraints
- Consider switching to `AppointmentDisplayMode.Indicator`

### Leading Dates Confusing

**Problem:** Dates from adjacent months cause confusion.

**Solutions:**
- Set `ShowLeadingAndTrailingDates = false`
- Style leading/trailing dates differently
- Add visual distinction in `MonthCellStyle`

### Appointments Overflow Cell

**Problem:** Too many appointments overflow the cell.

**Solutions:**
- Reduce `AppointmentDisplayCount`
- Use `AppointmentDisplayMode.Indicator` instead
- Increase `MonthCellHeight`
- Rely on "+N more" and agenda view
