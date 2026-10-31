# Timeline Views

## Table of Contents
- [Overview](#overview)
- [Timeline View Types](#timeline-view-types)
- [Time Intervals](#time-intervals)
- [Timeline Configuration](#timeline-configuration)
- [Working Days and Hours](#working-days-and-hours)
- [All-Day Appointments](#all-day-appointments)
- [Common Patterns](#common-patterns)
- [Timeline Month — Special Time Regions](#timeline-month--special-time-regions)
- [Horizontal Scrolling](#horizontal-scrolling)
- [Troubleshooting](#troubleshooting)

## Overview

Timeline views display appointments in a horizontal layout with time running left to right. These views are ideal for scheduling across extended periods and work particularly well with resource grouping.

**Available Timeline Views:**
- **TimelineDay** - Single day in horizontal layout
- **TimelineWeek** - 7 days horizontally
- **TimelineWorkWeek** - Working days only (configurable)
- **TimelineMonth** - Entire month in horizontal layout

## Timeline View Types

### TimelineDay View

Display a single day with horizontal time slots:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineDay" />
```

```csharp
Schedule.ViewType = SchedulerViewType.TimelineDay;
```

**Use When:**
- Horizontal space is available
- Resource comparison across time is needed
- Multiple resources on single day
- Better utilization of wide screens

### TimelineWeek View

Display 7 days horizontally:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineWeek" />
```

```csharp
Schedule.ViewType = SchedulerViewType.TimelineWeek;
```

**Use When:**
- Weekly overview with horizontal scrolling
- Resource scheduling across week
- Comparing multiple resources side by side

### TimelineWorkWeek View

Display only working days:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineWorkWeek" />
```

```csharp
Schedule.ViewType = SchedulerViewType.TimelineWorkWeek;
```

**Use When:**
- Business week focus (Monday-Friday default)
- Excluding weekends from timeline
- Office scheduling applications

### TimelineMonth View

Display an entire month:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineMonth" />
```

```csharp
Schedule.ViewType = SchedulerViewType.TimelineMonth;
```

**Use When:**
- Long-term planning view
- Monthly resource utilization
- Extended scheduling periods
- Showing appointment density across month

## Time Intervals

### Time Interval Size

Control the width of time slots:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="TimelineWeek"
                      TimeIntervalSize="100" />
```

```csharp
Schedule.TimeIntervalSize = 100; // Default is 50
```

**Values:**
- `50` - Default, compact horizontal spacing
- `100` - More space per hour, less scrolling
- `25-30` - Very compact, more hours visible
- Minimum: 20 pixels

**Impact:**
- Larger values = more horizontal scrolling, better readability
- Smaller values = more time visible, less scrolling

### Time Interval

Divide time into smaller intervals:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineDay">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings TimeInterval="00:30:00" />
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

```csharp
// 30-minute intervals
Schedule.TimelineViewSettings.TimeInterval = new TimeSpan(0, 30, 0);

// 15-minute intervals
Schedule.TimelineViewSettings.TimeInterval = new TimeSpan(0, 15, 0);

// 2-hour intervals
Schedule.TimelineViewSettings.TimeInterval = new TimeSpan(2, 0, 0);
```

**Common Intervals:**
- `TimeSpan(0, 15, 0)` - 15 minutes (high granularity)
- `TimeSpan(0, 30, 0)` - 30 minutes (standard)
- `TimeSpan(1, 0, 0)` - 1 hour (default)
- `TimeSpan(2, 0, 0)` - 2 hours (low granularity)

**TimelineMonth Note:**
- In TimelineMonth view, intervals are displayed in days, not hours
- `TimeInterval` affects the minimum slot size

### Time Ruler Text Format

Customize time display format:

```csharp
// 12-hour format
Schedule.TimelineViewSettings.TimeRulerFormat = "h tt"; // "2 PM"

// 24-hour format
Schedule.TimelineViewSettings.TimeRulerFormat = "HH:mm"; // "14:00"

// With minutes
Schedule.TimelineViewSettings.TimeRulerFormat = "h:mm tt"; // "2:00 PM"
```

**Format Strings:**
- `"h tt"` - Hour with AM/PM (e.g., "2 PM")
- `"HH:mm"` - 24-hour (e.g., "14:00")
- `"h:mm tt"` - Hour:minute with AM/PM
- `"ddd HH:mm"` - Day and time (e.g., "Mon 14:00")

**TimelineMonth Format:**
```csharp
// Show day number
Schedule.TimelineViewSettings.TimeRulerFormat = "dd"; // "15"

// Show day and month
Schedule.TimelineViewSettings.TimeRulerFormat = "MMM dd"; // "Jun 15"
```

## Timeline Configuration

### Start and End Hour

Display only specific hours (TimelineDay, TimelineWeek, TimelineWorkWeek):

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineDay">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings StartHour="8" EndHour="18" />
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

```csharp
// Show 8 AM to 6 PM
Schedule.TimelineViewSettings.StartHour = 8;
Schedule.TimelineViewSettings.EndHour = 18;

// Show full day
Schedule.TimelineViewSettings.StartHour = 0;
Schedule.TimelineViewSettings.EndHour = 24;
```

**Note:** `StartHour` and `EndHour` do not apply to TimelineMonth view (full days are always shown).

### Time Ruler Size

Control the height of the time ruler:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="TimelineWeek"
                      TimeRulerSize="60" />
```

```csharp
Schedule.TimeRulerSize = 60; // Default is 50
```

**Values:**
- `50` - Default height
- `0` - Hide time ruler
- `60-80` - Taller for larger text
- `30-40` - Compact

### Days Count (TimelineMonth)

For TimelineMonth view, control number of days visible:

```csharp
// Show 2 weeks at a time
Schedule.TimelineViewSettings.TimeIntervalSize = 100;
// Adjust as needed for desired visible days
```

## Working Days and Hours

### Working Days

Configure which days are working days (affects TimelineWorkWeek):

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineWorkWeek">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings WorkDays="Monday,Tuesday,Wednesday,Thursday,Friday" />
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

```csharp
// Standard 5-day work week
Schedule.TimelineViewSettings.WorkDays = DaysOfWeek.Monday | 
                                        DaysOfWeek.Tuesday | 
                                        DaysOfWeek.Wednesday | 
                                        DaysOfWeek.Thursday | 
                                        DaysOfWeek.Friday;

// 4-day work week
Schedule.TimelineViewSettings.WorkDays = DaysOfWeek.Monday | 
                                        DaysOfWeek.Tuesday | 
                                        DaysOfWeek.Wednesday | 
                                        DaysOfWeek.Thursday;
```

**Note:** Only affects TimelineWorkWeek view. TimelineWeek shows all 7 days.

## All-Day Appointments

### All-Day Appointment Panel

Timeline views (except TimelineMonth) include an all-day appointment panel:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineWeek">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings AllDayAppointmentHeight="60" />
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.TimelineViewSettings.AllDayAppointmentHeight = 60; // Default is 50
```

**Behavior:**
- Appointments with `IsAllDay = true` appear in this panel
- Panel is positioned above the time slots
- Height adjusts automatically based on number of rows

### TimelineMonth All-Day Handling

In TimelineMonth view:
- All appointments are displayed inline (no separate all-day panel)
- All-day appointments span the full day width
- Multiple appointments stack vertically within the day

## Common Patterns

### Pattern 1: Conference Room Schedule (TimelineDay)

```csharp
// Show business hours with 30-minute slots
Schedule.ViewType = SchedulerViewType.TimelineDay;
Schedule.TimelineViewSettings.StartHour = 8;
Schedule.TimelineViewSettings.EndHour = 18;
Schedule.TimelineViewSettings.TimeInterval = new TimeSpan(0, 30, 0);
Schedule.TimeIntervalSize = 80;
Schedule.TimelineViewSettings.TimeRulerFormat = "h:mm tt";
```

### Pattern 2: Weekly Resource Planning

```csharp
// TimelineWeek with resources
Schedule.ViewType = SchedulerViewType.TimelineWeek;
Schedule.TimelineViewSettings.StartHour = 9;
Schedule.TimelineViewSettings.EndHour = 17;
Schedule.TimelineViewSettings.TimeInterval = new TimeSpan(1, 0, 0);

// Add resources (see resource-grouping.md)
var resources = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource { Name = "Room A", Id = "A" },
    new SchedulerResource { Name = "Room B", Id = "B" },
    new SchedulerResource { Name = "Room C", Id = "C" }
};

Schedule.ResourceCollection = resources;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
```

### Pattern 3: Month Overview

```csharp
// TimelineMonth for long-term planning
Schedule.ViewType = SchedulerViewType.TimelineMonth;
Schedule.TimeIntervalSize = 60; // Width per day
Schedule.TimelineViewSettings.TimeRulerFormat = "dd"; // Day number
```

### Pattern 4: 24/7 Operations Timeline

```csharp
// Full-day timeline with hourly slots
Schedule.ViewType = SchedulerViewType.TimelineDay;
Schedule.TimelineViewSettings.StartHour = 0;
Schedule.TimelineViewSettings.EndHour = 24;
Schedule.TimelineViewSettings.TimeInterval = new TimeSpan(1, 0, 0);
Schedule.TimelineViewSettings.TimeRulerFormat = "HH:mm";
```

### Pattern 5: Switch Between Timeline and Day Views

```csharp
private void ToggleTimelineButton_Click(object sender, RoutedEventArgs e)
{
    if (Schedule.ViewType == SchedulerViewType.Day)
    {
        Schedule.ViewType = SchedulerViewType.TimelineDay;
        ToggleButton.Content = "Switch to Vertical Day View";
    }
    else
    {
        Schedule.ViewType = SchedulerViewType.Day;
        ToggleButton.Content = "Switch to Timeline Day View";
    }
}
```

## Timeline Month — Special Time Regions

`SpecialTimeRegion` instances configured on `TimelineViewSettings.SpecialTimeRegions` are
**not** rendered by default in `TimelineMonth` view. Enable them with
`TimelineViewSettings.ShowMonthTimeRegions = true`. When enabled, the regions are
rendered as date-column-spanning blocks and the **time-of-day** portion of each
region's `StartTime` / `EndTime` is ignored — only the date portion is used.

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineMonth">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings ShowMonthTimeRegions="True">
            <scheduler:TimelineViewSettings.SpecialTimeRegions>
                <ObservableCollection x:TypeArguments="scheduler:SpecialTimeRegion">
                    <scheduler:SpecialTimeRegion
                        StartTime="2026-06-10"
                        EndTime="2026-06-15"
                        Text="Maintenance Window"
                        CanEdit="False" />
                </ObservableCollection>
            </scheduler:TimelineViewSettings.SpecialTimeRegions>
        </scheduler:TimelineViewSettings>
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.ViewType = SchedulerViewType.TimelineMonth;
Schedule.TimelineViewSettings.ShowMonthTimeRegions = true;
Schedule.TimelineViewSettings.SpecialTimeRegions.Add(new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 10),
    EndTime   = new DateTime(2026, 6, 15),
    Text      = "Maintenance Window",
    CanEdit   = false
});
```

**Defaults and rules:**
- `ShowMonthTimeRegions` default is `false`.
- Only applies when `ViewType == SchedulerViewType.TimelineMonth`.
- Visual styling is controlled by `SpecialTimeRegion.Background` and `SpecialTimeRegion.Text`.
- `CanEdit = false` blocks appointment drag-drop and resize inside the region in TimelineMonth view.
- Date-spanning regions render across the date columns; the time-of-day component of StartTime/EndTime is ignored.

See [special-time-region.md](special-time-region.md) for the full `SpecialTimeRegion` reference,
including `RecurrenceRule`, `CanMergeAdjacentRegions`, `ResourceIdCollection`, custom templates,
and how regions apply to Day/Week/WorkWeek and Timeline views.

## Horizontal Scrolling

### Programmatic Scrolling

Timeline views support horizontal scrolling:

```csharp
// Navigate forward in time
Schedule.Forward();

// Navigate backward in time
Schedule.Backward();

// Jump to specific date
Schedule.DisplayDate = new DateTime(2026, 6, 15);
```

**Scroll Behavior:**
- **TimelineDay**: Scrolls by 1 day
- **TimelineWeek**: Scrolls by 1 week
- **TimelineWorkWeek**: Scrolls by number of working days
- **TimelineMonth**: Scrolls by 1 month

### Visible Date Range

Get currently visible dates:

```csharp
Schedule.ViewChanged += (s, e) =>
{
    var firstVisible = e.NewVisibleDates.First();
    var lastVisible = e.NewVisibleDates.Last();
    
    Debug.WriteLine($"Timeline showing: {firstVisible:MMM dd} to {lastVisible:MMM dd}");
};
```

## Customization

### Time Slot Appearance

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineWeek">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings>
            <scheduler:TimelineViewSettings.TimeSlotStyle>
                <Style TargetType="scheduler:TimeSlotControl">
                    <Setter Property="Background" Value="White" />
                    <Setter Property="BorderBrush" Value="LightGray" />
                    <Setter Property="BorderThickness" Value="0,0,1,1" />
                </Style>
            </scheduler:TimelineViewSettings.TimeSlotStyle>
        </scheduler:TimelineViewSettings>
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

### View Header Height

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineMonth">
    <scheduler:SfScheduler.ViewHeaderSettings>
        <scheduler:ViewHeaderSettings Height="60" />
    </scheduler:SfScheduler.ViewHeaderSettings>
</scheduler:SfScheduler>
```

### Date Header Format

```csharp
// For TimelineWeek
Schedule.ViewHeaderSettings.DateFormat = "ddd MM/dd";
// Output: "Mon 06/15"

// For TimelineMonth
Schedule.ViewHeaderSettings.DateFormat = "MMM yyyy";
// Output: "Jun 2026"
```

## Timeline with Resources

Timeline views are particularly powerful when combined with resources:

```csharp
// Setup resources
var employees = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource { Name = "John", Id = "john" },
    new SchedulerResource { Name = "Sarah", Id = "sarah" },
    new SchedulerResource { Name = "Mike", Id = "mike" }
};

Schedule.ResourceCollection = employees;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
Schedule.ViewType = SchedulerViewType.TimelineWeek;

// Each resource gets its own horizontal row
// Time runs horizontally across the row
// Easy to compare resource utilization
```

**Benefits:**
- Easy visual comparison across resources
- Identify resource conflicts
- See resource availability at a glance
- Better utilization of horizontal space

See [resource-grouping.md](resource-grouping.md) for comprehensive resource configuration.

## Best Practices

### View Selection
- **TimelineDay**: Resource scheduling, single-day detail view
- **TimelineWeek**: Weekly resource planning, multi-resource comparison
- **TimelineWorkWeek**: Business week focus, exclude weekends
- **TimelineMonth**: Long-term planning, capacity planning

### Time Intervals
- Use larger intervals (1-2 hours) for TimelineWeek/TimelineMonth
- Use smaller intervals (15-30 minutes) for TimelineDay
- Consider scroll performance with very small intervals

### Horizontal Space
- Timeline views work best on wider screens
- Consider TimeIntervalSize to balance visibility and scrolling
- Use StartHour/EndHour to focus on relevant time range

### Resource Display
- Timeline views are ideal for resource grouping
- Each resource gets clear horizontal row
- Easy to spot over/under-utilization

## Troubleshooting

### Appointments Not Visible

**Problem:** Appointments don't appear in timeline view.

**Solutions:**
- Check if appointment times fall within `StartHour` and `EndHour`
- Verify `DisplayDate` covers appointment date range
- Ensure appointments are in `ItemsSource`
- Check if appointments are outside visible scroll area

### Horizontal Scrolling Not Smooth

**Problem:** Timeline scrolls in large jumps.

**Solutions:**
- Adjust `TimeIntervalSize` for finer scroll increments
- Check if container has width constraints
- Verify `TimeInterval` is not too large

### Time Ruler Text Overlapping

**Problem:** Time text overlaps or is cut off.

**Solutions:**
- Increase `TimeIntervalSize` (more width per slot)
- Use shorter time format (e.g., "h tt" vs "h:mm:ss tt")
- Increase `TimeRulerSize` (height of ruler)

### TimelineMonth Too Compressed

**Problem:** Month view is too compact, appointments hard to see.

**Solutions:**
- Increase `TimeIntervalSize` (width per day)
- Consider using TimelineWeek instead for detail
- Adjust appointment template for better visibility

### Special Time Regions Not Showing in TimelineMonth

**Problem:** `SpecialTimeRegion` entries configured on `TimelineViewSettings.SpecialTimeRegions` don't appear in `TimelineMonth`.

**Solutions:**
- Set `Schedule.TimelineViewSettings.ShowMonthTimeRegions = true`. The feature is opt-in and defaults to `false`.
- Verify the scheduler's `ViewType` is exactly `SchedulerViewType.TimelineMonth`.
- Use date-only `StartTime`/`EndTime` values in this view — the time-of-day portion is ignored.
- Confirm `CanEdit` is set to `true` if the region needs to be interactively clickable.

### All-Day Panel Not Showing

**Problem:** All-day appointments don't appear.

**Solutions:**
- Verify `IsAllDay = true` on appointments
- Check `AllDayAppointmentHeight` is not 0
- Note: TimelineMonth doesn't have separate all-day panel
- Ensure view is TimelineDay/Week/WorkWeek

### WorkWeek Showing All Days

**Problem:** TimelineWorkWeek shows weekends.

**Solutions:**
- Verify `ViewType` is `SchedulerViewType.TimelineWorkWeek`
- Check `WorkDays` property is set correctly
- Use bitwise OR to combine days
- Ensure `TimelineViewSettings` is initialized
