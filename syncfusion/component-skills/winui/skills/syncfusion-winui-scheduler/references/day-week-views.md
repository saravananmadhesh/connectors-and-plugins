# Day, Week, and WorkWeek Views

## Table of Contents
- [Overview](#overview)
- [View Types](#view-types)
- [Time Intervals](#time-intervals)
- [Working Days and Hours](#working-days-and-hours)
- [Time Ruler Configuration](#time-ruler-configuration)
- [All-Day Appointments](#all-day-appointments)
- [Common Patterns](#common-patterns)
- [View Navigation](#view-navigation)
- [Customization](#customization)
- [Best Practices](#best-practices)
- [Special Time Regions](#special-time-regions)
- [Troubleshooting](#troubleshooting)

## Overview

The WinUI Scheduler provides three vertical views for displaying appointments in a time-based layout:
- **Day View** - Shows a single day with time slots
- **Week View** - Shows 7 days with time slots
- **WorkWeek View** - Shows configurable working days (default: Monday-Friday)

These views display appointments in time slots with a vertical time ruler showing hours.

## View Types

### Day View

Display a single day with hourly time slots:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Day" />
```

```csharp
Schedule.ViewType = SchedulerViewType.Day;
```

**Use When:**
- Detailed day planning is needed
- Appointments are frequently scheduled within a single day
- Maximum appointment detail visibility is required

### Week View

Display 7 days in columns with time slots:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week" />
```

```csharp
Schedule.ViewType = SchedulerViewType.Week;
```

**Use When:**
- Weekly overview is needed
- Comparing appointments across days
- Standard 7-day week display is required

### WorkWeek View

Display only working days (configurable):

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="WorkWeek" />
```

```csharp
Schedule.ViewType = SchedulerViewType.WorkWeek;
```

**Use When:**
- Focusing on business days only
- Weekend appointments are rare or irrelevant
- Maximizing workspace for working days

## Time Intervals

### Time Interval Size

Control the height of each hour slot:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="Week"
                      TimeIntervalSize="120" />
```

```csharp
Schedule.TimeIntervalSize = 120; // Default is 60
```

**Values:**
- `60` - Default, 1 hour = 60 pixels
- `120` - Larger slots, more spacing
- `30` - Compact view, less spacing
- Minimum: 20 pixels

**Impact:**
- Larger values = more scrolling, better readability
- Smaller values = more hours visible, less scrolling

### Time Interval

Divide each hour into smaller intervals:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings TimeInterval="00:30:00" />
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.DaysViewSettings.TimeInterval = new TimeSpan(0, 30, 0); // 30 minutes
```

**Common Intervals:**
- `TimeSpan(0, 15, 0)` - 15-minute intervals (4 slots per hour)
- `TimeSpan(0, 30, 0)` - 30-minute intervals (2 slots per hour)
- `TimeSpan(1, 0, 0)` - 1-hour intervals (default)

**When to Use:**
- 15 minutes: Medical appointments, tight scheduling
- 30 minutes: Standard business meetings
- 1 hour: General calendar, less granular scheduling

### Time Ruler Text Format

Customize time ruler display format:

```csharp
Schedule.DaysViewSettings.TimeRulerFormat = "h tt"; // "2 PM"
// or
Schedule.DaysViewSettings.TimeRulerFormat = "HH:mm"; // "14:00"
// or
Schedule.DaysViewSettings.TimeRulerFormat = "h:mm tt"; // "2:00 PM"
```

**Common Formats:**
- `"h tt"` - Hour with AM/PM (e.g., "2 PM")
- `"HH:mm"` - 24-hour format (e.g., "14:00")
- `"h:mm tt"` - Hour:minute with AM/PM (e.g., "2:00 PM")
- `"hh:mm tt"` - With leading zero (e.g., "02:00 PM")

## Working Days and Hours

### Working Days

Customize which days appear in WorkWeek view:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="WorkWeek">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings WorkDays="Monday,Tuesday,Wednesday,Thursday,Friday" />
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

```csharp
// Standard 5-day work week
Schedule.DaysViewSettings.WorkDays = DaysOfWeek.Monday | 
                                    DaysOfWeek.Tuesday | 
                                    DaysOfWeek.Wednesday | 
                                    DaysOfWeek.Thursday | 
                                    DaysOfWeek.Friday;

// Custom 4-day work week
Schedule.DaysViewSettings.WorkDays = DaysOfWeek.Monday | 
                                    DaysOfWeek.Tuesday | 
                                    DaysOfWeek.Wednesday | 
                                    DaysOfWeek.Thursday;

// Include Saturday
Schedule.DaysViewSettings.WorkDays = DaysOfWeek.Monday | 
                                    DaysOfWeek.Tuesday | 
                                    DaysOfWeek.Wednesday | 
                                    DaysOfWeek.Thursday | 
                                    DaysOfWeek.Friday |
                                    DaysOfWeek.Saturday;
```

**Note:** `WorkDays` only affects WorkWeek view. Week view always shows all 7 days.

### Start and End Hour

Display only specific hours of the day:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings StartHour="8" EndHour="18" />
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

```csharp
// Show 8 AM to 6 PM
Schedule.DaysViewSettings.StartHour = 8;
Schedule.DaysViewSettings.EndHour = 18;

// Show full day (midnight to midnight)
Schedule.DaysViewSettings.StartHour = 0;
Schedule.DaysViewSettings.EndHour = 24;

// Show morning only (6 AM to noon)
Schedule.DaysViewSettings.StartHour = 6;
Schedule.DaysViewSettings.EndHour = 12;
```

**Properties:**
- `StartHour` - 0 to 24 (inclusive)
- `EndHour` - 0 to 24 (inclusive)
- Default: 0 to 24 (full day)

**Benefits:**
- Focus on business hours
- Reduce scrolling
- Hide irrelevant time slots

### Non-Working Days Customization

Style non-working days differently:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings>
            <scheduler:DaysViewSettings.TimeSlotStyle>
                <Style TargetType="scheduler:TimeSlotControl">
                    <Setter Property="NonWorkingDayBackground" Value="LightGray" />
                </Style>
            </scheduler:DaysViewSettings.TimeSlotStyle>
        </scheduler:DaysViewSettings>
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

## Time Ruler Configuration

### Time Ruler Size

Control the width of the time ruler:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="Week"
                      TimeRulerSize="80" />
```

```csharp
Schedule.TimeRulerSize = 80; // Default is 50
```

**Values:**
- `50` - Default width
- `0` - Hide time ruler
- `80-100` - Wider for longer time formats
- `30-40` - Narrow for compact view

### Hide Time Ruler

```csharp
Schedule.TimeRulerSize = 0;
```

**Use When:**
- Time slots are obvious from appointment times
- Maximizing appointment space is critical
- Building custom time displays

## All-Day Appointments

### All-Day Appointment Panel

Day, Week, and WorkWeek views include a special panel for all-day appointments at the top.

**Automatic Display:**
- Appointments with `IsAllDay = true` appear in this panel
- Appointments spanning full days (00:00 to 23:59) appear here
- Panel height adjusts based on number of all-day appointments

### All-Day Panel Height

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings AllDayAppointmentHeight="60" />
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.DaysViewSettings.AllDayAppointmentHeight = 60; // Default is 50
```

**Values:**
- `50` - Default height per row
- Increase for larger text or more content
- Decrease for compact display

### Creating All-Day Appointments

```csharp
var allDayAppointment = new ScheduleAppointment
{
    Subject = "Company Holiday",
    StartTime = new DateTime(2026, 12, 25),
    EndTime = new DateTime(2026, 12, 25),
    IsAllDay = true,
    Background = new SolidColorBrush(Colors.Red)
};

Schedule.ItemsSource.Add(allDayAppointment);
```

**Visual Behavior:**
- Displays in the all-day panel
- Does not occupy time slot space
- Spans the full width of the day column(s)

### Displaying Spanned Appointments in Time Slots

In Day, Week, and WorkWeek views, set `AllowSpannedAppointmentsInTimeSlots` to `true` to render appointments spanning more than 24 hours inside the timeslot cells instead of the all-day panel. By default, this property is `false`, so spanned appointments appear in the all-day panel.

```csharp
Schedule.ViewType = SchedulerViewType.Week;
Schedule.DaysViewSettings.AllowSpannedAppointmentsInTimeSlots = true;
```

```xaml
<syncfusion:SfScheduler x:Name="Schedule" ViewType="Week">
    <syncfusion:SfScheduler.DaysViewSettings>
        <syncfusion:DaysViewSettings AllowSpannedAppointmentsInTimeSlots="True" />
    </syncfusion:SfScheduler.DaysViewSettings>
</syncfusion:SfScheduler>
```

## Common Patterns

### Pattern 1: Business Hours View

```csharp
// 9 AM to 5 PM, Monday to Friday
Schedule.ViewType = SchedulerViewType.WorkWeek;
Schedule.DaysViewSettings.StartHour = 9;
Schedule.DaysViewSettings.EndHour = 17;
Schedule.DaysViewSettings.WorkDays = DaysOfWeek.Monday | 
                                    DaysOfWeek.Tuesday | 
                                    DaysOfWeek.Wednesday | 
                                    DaysOfWeek.Thursday | 
                                    DaysOfWeek.Friday;
Schedule.DaysViewSettings.TimeInterval = new TimeSpan(0, 30, 0);
```

### Pattern 2: Medical Appointment Schedule

```csharp
// 8 AM to 6 PM, 15-minute slots, compact view
Schedule.ViewType = SchedulerViewType.Day;
Schedule.DaysViewSettings.StartHour = 8;
Schedule.DaysViewSettings.EndHour = 18;
Schedule.DaysViewSettings.TimeInterval = new TimeSpan(0, 15, 0);
Schedule.TimeIntervalSize = 40; // Compact
Schedule.DaysViewSettings.TimeRulerFormat = "h:mm tt";
```

### Pattern 3: 24/7 Operations Schedule

```csharp
// Full day, every day, hourly view
Schedule.ViewType = SchedulerViewType.Week;
Schedule.DaysViewSettings.StartHour = 0;
Schedule.DaysViewSettings.EndHour = 24;
Schedule.DaysViewSettings.TimeInterval = new TimeSpan(1, 0, 0);
Schedule.DaysViewSettings.TimeRulerFormat = "HH:mm";
```

### Pattern 4: Custom Work Week (4-day)

```csharp
// Tuesday through Friday
Schedule.ViewType = SchedulerViewType.WorkWeek;
Schedule.DaysViewSettings.WorkDays = DaysOfWeek.Tuesday | 
                                    DaysOfWeek.Wednesday | 
                                    DaysOfWeek.Thursday | 
                                    DaysOfWeek.Friday;
Schedule.DaysViewSettings.StartHour = 8;
Schedule.DaysViewSettings.EndHour = 17;
```

### Pattern 5: Switch Between Day and Week

```csharp
private void ToggleViewButton_Click(object sender, RoutedEventArgs e)
{
    if (Schedule.ViewType == SchedulerViewType.Day)
    {
        Schedule.ViewType = SchedulerViewType.Week;
        ToggleButton.Content = "Switch to Day View";
    }
    else
    {
        Schedule.ViewType = SchedulerViewType.Day;
        ToggleButton.Content = "Switch to Week View";
    }
}
```

## View Navigation

### Programmatic Navigation

```csharp
// Navigate to specific date in Day view
Schedule.ViewType = SchedulerViewType.Day;
Schedule.DisplayDate = new DateTime(2026, 6, 15);

// Navigate forward one week
Schedule.Forward();

// Navigate backward one day
Schedule.Backward();

// Go to today
Schedule.DisplayDate = DateTime.Today;
```

### Visible Dates

Get currently visible dates in Week/WorkWeek view:

```csharp
Schedule.ViewChanged += (s, e) =>
{
    var visibleDates = e.NewVisibleDates;
    Debug.WriteLine($"Showing dates from {visibleDates.First()} to {visibleDates.Last()}");
};
```

## Customization

### Time Slot Appearance

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings>
            <scheduler:DaysViewSettings.TimeSlotStyle>
                <Style TargetType="scheduler:TimeSlotControl">
                    <Setter Property="Background" Value="White" />
                    <Setter Property="BorderBrush" Value="LightGray" />
                    <Setter Property="BorderThickness" Value="0,0,1,1" />
                </Style>
            </scheduler:DaysViewSettings.TimeSlotStyle>
        </scheduler:DaysViewSettings>
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

### Day Column Header

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.ViewHeaderSettings>
        <scheduler:ViewHeaderSettings Height="60" />
    </scheduler:SfScheduler.ViewHeaderSettings>
</scheduler:SfScheduler>
```

### Custom Day Header Format

```csharp
Schedule.ViewHeaderSettings.DateFormat = "ddd MM/dd";
// Output: "Mon 06/15"
```

## Best Practices

### Time Intervals
- Use 30-minute intervals for standard business calendars
- Use 15-minute intervals for high-density scheduling (medical, salons)
- Use 1-hour intervals for general planning

### View Selection
- **Day View**: Detail-focused, single-day planning, appointment-heavy days
- **Week View**: Overview-focused, multi-day coordination, general planning
- **WorkWeek View**: Business-focused, exclude weekends, office environments

### Start/End Hours
- Set to actual business hours to reduce scrolling
- Include buffer time before and after core hours
- Consider time zones if scheduling across regions

### Time Ruler
- Use 24-hour format for international audiences
- Use 12-hour format with AM/PM for US audiences
- Adjust `TimeRulerSize` if time format is long

## Special Time Regions

Use `SpecialTimeRegion` instances on `DaysViewSettings.SpecialTimeRegions` to highlight non-working
hours, lunch breaks, and blackout windows in Day, Week, and WorkWeek views. The Month view does
**not** render special time regions — switch to Day/Week/WorkWeek to see them.

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings>
            <scheduler:DaysViewSettings.SpecialTimeRegions>
                <ObservableCollection x:TypeArguments="scheduler:SpecialTimeRegion">
                    <scheduler:SpecialTimeRegion
                        StartTime="2026-06-15T12:00:00"
                        EndTime="2026-06-15T13:00:00"
                        Text="Lunch"
                        Background="Orange"
                        CanEdit="False" />
                </ObservableCollection>
            </scheduler:DaysViewSettings.SpecialTimeRegions>
        </scheduler:DaysViewSettings>
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.DaysViewSettings.SpecialTimeRegions.Add(new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 15, 12, 0, 0),
    EndTime   = new DateTime(2026, 6, 15, 13, 0, 0),
    Text      = "Lunch",
    Background = new SolidColorBrush(Colors.Orange),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1",
    CanEdit = false
});
```

**Highlights:**
- Set `CanEdit = false` to block appointment creation, drag, and resize inside the region.
- Use `CanMergeAdjacentRegions = true` to merge same-pattern regions across consecutive days in
  Week/WorkWeek views into a single visual block.
- Use `ResourceIdCollection` to scope the region to specific resources when resource grouping is enabled.
- For Timeline views, see [timeline-views.md](timeline-views.md); for TimelineMonth specifically,
  `ShowMonthTimeRegions` must be set to `true`.

See [special-time-region.md](special-time-region.md) for the full reference, including custom templates.

## Troubleshooting

### Appointments Not Visible

**Problem:** Appointments don't appear in the view.

**Solutions:**
- Check if appointment times fall within `StartHour` and `EndHour`
- Verify `DisplayDate` is in the range of appointment dates
- Ensure appointments are added to `ItemsSource`
- Check if appointment is all-day and should be in all-day panel

### Time Ruler Text Cut Off

**Problem:** Time text is truncated.

**Solutions:**
- Increase `TimeRulerSize`
- Use shorter time format (e.g., "h tt" instead of "h:mm:ss tt")
- Adjust font size in `TimeSlotStyle`

### WorkWeek Not Showing Custom Days

**Problem:** WorkWeek view shows default Monday-Friday.

**Solutions:**
- Ensure `ViewType` is set to `WorkWeek`
- Verify `WorkDays` property is set correctly
- Use bitwise OR (`|`) to combine multiple days
- Check that `DaysViewSettings` is not null

### Time Slots Too Small/Large

**Problem:** Time slots are not the desired height.

**Solutions:**
- Adjust `TimeIntervalSize` (pixel height per hour)
- Consider using different `TimeInterval` (time division)
- Check if container has height constraints

### All-Day Panel Not Showing

**Problem:** All-day appointments don't appear.

**Solutions:**
- Verify `IsAllDay = true` on appointments
- Check that appointments span full days
- Ensure `AllDayAppointmentHeight` is not set to 0
- Verify view is Day, Week, or WorkWeek (not Timeline)
