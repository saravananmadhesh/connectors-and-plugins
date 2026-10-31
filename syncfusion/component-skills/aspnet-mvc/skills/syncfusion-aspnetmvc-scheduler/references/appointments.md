# Appointments

This guide covers the complete lifecycle of appointments in the Scheduler, including creating normal and recurring events, managing recurrence patterns, and understanding event fields.

## Table of Contents
- [Overview](#overview)
- [Event Types](#event-types)
- [Creating Appointments](#creating-appointments)
- [Recurring Events](#recurring-events)
- [Recurrence Rules Reference](#recurrence-rules-reference)
- [Event Fields](#event-fields)
- [Custom Fields](#custom-fields)
- [Appointments Occupying Entire Cell](#appointments-occupying-entire-cell)
- [Display Tooltip for Appointments](#display-tooltip-for-appointments)
- [Appointment Selection](#appointment-selection)
- [Retrieving Appointments](#retrieving-appointments)

## Overview

Appointments are the core data objects in Scheduler representing scheduled events. Each appointment occupies a specific time period and can be:
- **Normal events**: Single time slot on a specific day
- **Spanned events**: More than 24 hours duration or spanning multiple days
- **All-day events**: Entire day events (holidays, birthdays)
- **Recurring events**: Repeating events based on recurrence patterns

## Event Types

### Normal Events

Standard appointments for specific time intervals within a day.

```csharp
// Controller
public List<AppointmentData> GetScheduleData()
{
    List<AppointmentData> appData = new List<AppointmentData>();
    appData.Add(new AppointmentData
    {
        Id = 1,
        Subject = "Team Meeting",
        StartTime = new DateTime(2026, 4, 10, 10, 0, 0),
        EndTime = new DateTime(2026, 4, 10, 11, 30, 0),
        Location = "Conference Room"
    });
    return appData;
}
```

### Spanned Events

Appointments lasting more than 24 hours, displayed in the all-day row.

```csharp
appData.Add(new AppointmentData
{
    Id = 2,
    Subject = "Conference",
    StartTime = new DateTime(2026, 4, 10, 9, 0, 0),
    EndTime = new DateTime(2026, 4, 12, 18, 0, 0)  // 2+ days
});
```

**Customizing Spanned Event Placement:**

By default, spanned events render in the all-day row. To display them in work cells:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource, SpannedEventPlacement = SpannedEventPlacement.TimeSlot })
    .SelectedDate(new DateTime(2018, 1, 15))
    .Render()
)
```

### All-Day Events

Events occupying an entire day, shown in a separate all-day row.

```csharp
appData.Add(new AppointmentData
{
    Id = 3,
    Subject = "Company Holiday",
    StartTime = new DateTime(2026, 4, 15, 0, 0, 0),
    EndTime = new DateTime(2026, 4, 15, 23, 59, 59),
    IsAllDay = true  // Marks as all-day event
});
```

**Hiding All-Day Row:**

```css
.e-schedule .e-date-header-wrap .e-schedule-table thead {
    display: none;
}
```

## Creating Appointments

### Programmatic Creation

```csharp
// Controller method
public List<AppointmentData> GetScheduleData()
{
    List<AppointmentData> appointments = new List<AppointmentData>();
    
    // Simple appointment
    appointments.Add(new AppointmentData
    {
        Id = 1,
        Subject = "Project Review",
        StartTime = new DateTime(2026, 4, 10, 14, 0, 0),
        EndTime = new DateTime(2026, 4, 10, 15, 30, 0),
        Location = "Room 301",
        Description = "Q2 project milestone review"
    });
    
    return appointments;
}
```

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.appointments })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

### Inline Creation

Enable inline appointment creation (click cell to add):

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .AllowInline(true)
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.appointments })
    .SelectedDate(new DateTime(2018, 1, 28))
    .Render()
)
```

**Inline Editing Behavior:**
- Click empty cell → Text box appears → Enter subject → Press Enter to save
- Click appointment subject → Edit inline → Press Enter to update
- Works with keyboard navigation (select cells, press Enter)
- Quick info popup disabled when inline mode is active

## Recurring Events

### Basic Recurring Event

```csharp
// Daily recurring event for 5 occurrences
appData.Add(new AppointmentData
{
    Id = 10,
    Subject = "Daily Standup",
    StartTime = new DateTime(2026, 4, 10, 9, 0, 0),
    EndTime = new DateTime(2026, 4, 10, 9, 30, 0),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=5"
});
```

### Recurrence Rule Structure

Format: `FREQ=<type>;[INTERVAL=<n>];[COUNT=<n>|UNTIL=<date>];[BYDAY=<days>];...`

**Components:**
- `FREQ`: Recurrence frequency (DAILY, WEEKLY, MONTHLY, YEARLY)
- `INTERVAL`: Gap between occurrences (1 = every occurrence, 2 = every other, etc.)
- `COUNT`: Number of occurrences
- `UNTIL`: End date (ISO format: YYYYMMDD or YYYYMMDDTHHMMSSZ)
- `BYDAY`: Days of week (MO, TU, WE, TH, FR, SA, SU)
- `BYMONTHDAY`: Day of month (1-31)
- `BYMONTH`: Month (1-12)
- `BYSETPOS`: Position in period (1st, 2nd, 3rd, 4th, -1 for last)

### Adding Exceptions to Recurring Series

Exclude specific occurrences using `RecurrenceException`:

```csharp
appData.Add(new AppointmentData
{
    Id = 11,
    Subject = "Weekly Review",
    StartTime = new DateTime(2026, 4, 7, 15, 0, 0),
    EndTime = new DateTime(2026, 4, 7, 16, 0, 0),
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO;COUNT=10",
    RecurrenceException = "20260421T150000Z,20260505T150000Z"  // Skip these dates (UTC format)
});
```

**Exception Date Format:**
- ISO format without hyphens: `YYYYMMDDTHHMMSSZ`
- Time in UTC with "Z" suffix
- Multiple dates separated by commas
- Example: April 22, 2026 3:00 PM UTC = `20260422T150000Z`

### Editing Single Occurrence

Create edited occurrence as new event with `RecurrenceID`:

```csharp
// Parent recurring event
appData.Add(new AppointmentData
{
    Id = 12,
    Subject = "Team Sync",
    StartTime = new DateTime(2026, 4, 8, 10, 0, 0),
    EndTime = new DateTime(2026, 4, 8, 10, 30, 0),
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=TU;COUNT=5",
    RecurrenceException = "20260415T100000Z"  // Exclude edited occurrence
});

// Edited occurrence (different time)
appData.Add(new AppointmentData
{
    Id = 13,
    Subject = "Team Sync",
    StartTime = new DateTime(2026, 4, 15, 14, 0, 0),  // Moved to afternoon
    EndTime = new DateTime(2026, 4, 15, 14, 30, 0),
    RecurrenceID = 12  // Points to parent event ID
});
```

### Edit Following Events

Enable editing current and future occurrences:

```cshtml
@Html.EJS().Schedule("scheduler")
    .EventSettings(e => e
        .DataSource(Model)
        .EditFollowingEvents(true)  // Enable "Edit Following Events" option
    )
    .Render()
```

```csharp
// Parent event (update RecurrenceRule with UNTIL)
appData.Add(new AppointmentData
{
    Id = 14,
    Subject = "Morning Meeting",
    StartTime = new DateTime(2026, 4, 6, 9, 0, 0),
    EndTime = new DateTime(2026, 4, 6, 9, 30, 0),
    RecurrenceRule = "FREQ=DAILY;UNTIL=20260414T090000Z"  // Ends before following edit
});

// Following events (starts from edit date)
appData.Add(new AppointmentData
{
    Id = 15,
    Subject = "Morning Meeting - Updated",  // Different subject
    StartTime = new DateTime(2026, 4, 15, 9, 0, 0),
    EndTime = new DateTime(2026, 4, 15, 9, 30, 0),
    RecurrenceRule = "FREQ=DAILY;COUNT=10",
    FollowingID = 14  // Points to immediate parent event
});
```

## Recurrence Rules Reference

### Daily Patterns

| Description | Rule |
|-------------|------|
| Every day, never ends | `FREQ=DAILY;INTERVAL=1` |
| Every day, 5 occurrences | `FREQ=DAILY;INTERVAL=1;COUNT=5` |
| Every day until Dec 31, 2026 | `FREQ=DAILY;INTERVAL=1;UNTIL=20261231` |
| Every 2 days, 10 occurrences | `FREQ=DAILY;INTERVAL=2;COUNT=10` |
| Every weekday (Mon-Fri) | `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` |

### Weekly Patterns

| Description | Rule |
|-------------|------|
| Every Monday | `FREQ=WEEKLY;BYDAY=MO` |
| Mon/Wed/Fri, never ends | `FREQ=WEEKLY;BYDAY=MO,WE,FR` |
| Every Thursday, 10 times | `FREQ=WEEKLY;BYDAY=TH;COUNT=10` |
| Mon/Fri, ends Dec 31, 2026 | `FREQ=WEEKLY;BYDAY=MO,FR;UNTIL=20261231` |
| Every 2 weeks on Tuesday | `FREQ=WEEKLY;INTERVAL=2;BYDAY=TU` |

### Monthly Patterns

| Description | Rule |
|-------------|------|
| 15th of every month | `FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1` |
| 1st of month, 12 times | `FREQ=MONTHLY;BYMONTHDAY=1;COUNT=12` |
| Last day of month | `FREQ=MONTHLY;BYMONTHDAY=-1` |
| 2nd Friday of month | `FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2` |
| Last Monday of month | `FREQ=MONTHLY;BYDAY=MO;BYSETPOS=-1` |
| 1st & 15th of month | `FREQ=MONTHLY;BYMONTHDAY=1,15` |

### Yearly Patterns

| Description | Rule |
|-------------|------|
| Every Dec 25 | `FREQ=YEARLY;BYMONTH=12;BYMONTHDAY=25` |
| June 15, 5 years | `FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=15;COUNT=5` |
| 1st Monday of January | `FREQ=YEARLY;BYMONTH=1;BYDAY=MO;BYSETPOS=1` |
| Last Friday of Dec | `FREQ=YEARLY;BYMONTH=12;BYDAY=FR;BYSETPOS=-1` |
| Every quarter (Jan/Apr/Jul/Oct 1st) | `FREQ=YEARLY;BYMONTH=1,4,7,10;BYMONTHDAY=1` |

### Recurrence Validation Messages

| Message | Description |
|---------|-------------|
| "The recurrence pattern is not valid" | Invalid rule (e.g., UNTIL date before start date) |
| "Changes to specific instances will be cancelled" | Editing series with already-edited occurrences |
| "Duration must be shorter than frequency" | Event duration exceeds recurrence interval |
| "Some months have fewer dates" | e.g., 31st day in months with 30 days |
| "Two occurrences cannot occur on same day" | Moving occurrence to date with existing occurrence |

## Event Fields

### Built-in Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Id` | int/string | Yes* | Unique identifier (required for CRUD) |
| `Subject` | string | No | Event title/summary |
| `StartTime` | DateTime | Yes | Event start date/time |
| `EndTime` | DateTime | Yes | Event end date/time |
| `IsAllDay` | bool | No | Marks event as all-day (default: false) |
| `Location` | string | No | Event location |
| `Description` | string | No | Event details/notes |
| `RecurrenceRule` | string | No | Recurrence pattern (iCalendar format) |
| `RecurrenceID` | int/string | No | Parent event ID for edited occurrences |
| `RecurrenceException` | string | No | Excluded dates (comma-separated, UTC) |
| `FollowingID` | int/string | No | Parent ID for "edit following" events |
| `StartTimezone` | string | No | IANA timezone for start time |
| `EndTimezone` | string | No | IANA timezone for end time |
| `IsReadonly` | bool | No | Prevents editing (default: false) |
| `IsBlock` | bool | No | Blocks time slot (default: false) |

*Required for edit/delete operations

### Mapping Different Field Names

If your data model uses different property names:

```csharp
// Model with custom field names
public class MeetingData
{
    public int MeetingId { get; set; }
    public string Title { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public string RoomLocation { get; set; }
}
```

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .EventSettings(es =>
        es.Fields(f =>
            f.Id("MeetingId")
            .Subject(sub => sub.Name("Title"))
            .StartTime(st => st.Name("Start"))
            .EndTime(et => et.Name("End"))
            .Location(loc => loc.Name("RoomLocation"))
        )
        .DataSource(ViewBag.appointments)
    )
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

### Field Settings Options

Configure field behavior in event editor:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(e => e.Fields(f => f.Id("Id")
        .Subject(sub => sub.Name("Subject").Title("Summary").Default("Add Summary"))
        .Location(loc => loc.Name("Location"))
        .Description(des => des.Name("Description"))
        .StartTime(st => st.Name("StartTime"))
        .EndTime(et => et.Name("EndTime"))
    )
    .DataSource(ViewBag.appointments))
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

## Custom Fields

Add custom fields beyond built-in fields:

```csharp
public class AppointmentData
{
    // Built-in fields
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    // Custom fields
    public string Status { get; set; }  // "Confirmed", "Tentative", "Cancelled"
    public string Priority { get; set; }  // "High", "Medium", "Low"
    public string Organizer { get; set; }
    public List<string> Attendees { get; set; }
    public string MeetingLink { get; set; }
}
```

Custom fields are automatically accessible in templates and can be used for:
- Filtering and sorting
- Custom rendering logic
- Business logic in events
- Data export

### Sorting Overlapping Events

Sort overlapping appointments by custom field:

```cshtml
@using Syncfusion.EJ2.Schedule
@{
    Object sortComparer = "sortComparer";
}

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource, SortComparer = sortComparer })
    .SelectedDate(new DateTime(2017, 9, 29))
    .Render()
)

<script type="text/javascript">
    function sortComparer(args) {
        return args.sort(function (event1, event2) {
            return event1.RankId.localeCompare(event2.RankId, undefined, { numeric: true });
        });
    };
</script>
```

## Appointments Occupying Entire Cell

Enable appointments to occupy the full height of the cell without the header part:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { 
        DataSource = ViewBag.datasource, 
        EnableMaxHeight = true, 
        EnableIndicator = false 
    })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

**Properties:**
- `EnableMaxHeight`: Set to `true` to allow events to occupy full cell height
- `EnableIndicator`: Set to `true` to show "more" indicator when multiple appointments exist in the same cell (default: `false`)

**Use Cases:**
- Display longer appointment subjects without truncation
- Maximize event visibility in month view
- Better utilize available cell space

## Display Tooltip for Appointments

Show appointment information in a tooltip on hover.

### Enable Built-in Tooltip

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { 
        DataSource = ViewBag.datasource, 
        EnableTooltip = true 
    })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

The default tooltip displays:
- Subject
- Start Time
- End Time
- Location (if available)

### Customize Tooltip Template

Create custom tooltip content:

```cshtml
@using Syncfusion.EJ2.Schedule

@{
    var template = "<div class='tooltip-wrap'>" +
        "<div class='content-area'><div class='name'>${Subject}</div>" +
        "${if(City !== null && City !== undefined)}<div class='city'>${City}</div>${/if}" +
        "<div class='time'>From: ${StartTime.toLocaleString()}</div>" +
        "<div class='time'>To: ${EndTime.toLocaleString()}</div></div></div>";
}

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { 
        DataSource = ViewBag.datasource,
        EnableTooltip = true,
        TooltipTemplate = template 
    })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)

<style>
    .tooltip-wrap {
        padding: 10px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .tooltip-wrap .name {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 5px;
    }
    
    .tooltip-wrap .time {
        font-size: 12px;
        color: #666;
    }
</style>
```

### Prevent Tooltip for Specific Events

Conditionally show/hide tooltips:

```cshtml
@Html.EJS().Schedule("schedule")
    .TooltipOpen("onTooltipOpen")
    .EventSettings(new ScheduleEventSettings { 
        DataSource = ViewBag.datasource, 
        EnableTooltip = true 
    })
    .Render()

<script>
    function onTooltipOpen(args) {
        // Hide tooltip for private appointments
        if (args.data && args.data.IsPrivate) {
            args.cancel = true;
        }
    }
</script>
```

## Appointment Selection

### Single Selection

Click an appointment to select it (default behavior).

### Multiple Selection

Hold `Ctrl` key and click appointments to select multiple.

**Accessing Selected Events:**

```cshtml
@Html.EJS().Schedule("scheduler")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<button onclick="getSelectedEvents()">Get Selected</button>

<script>
    function getSelectedEvents() {
        var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
        var selectedEvents = scheduleObj.getSelectedEvents();
        console.log('Selected:', selectedEvents);
    }
</script>
```

### Deleting Multiple Appointments

Select multiple appointments and press `Delete` key to remove them.

**For recurring events:** Deleting selected occurrences removes only those instances, not the entire series.

## Retrieving Appointments

### Get Event Details from UI Element

```cshtml
@Html.EJS().Schedule("scheduler")
    .EventClick("onEventClick")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onEventClick(args) {
        var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
        var eventDetails = scheduleObj.getEventDetails(args.element);
        alert('Subject: ' + eventDetails.Subject);
    }
</script>
```

### Get Current View Appointments

```cshtml
@Html.EJS().Schedule("scheduler")
    .DataBound("onDataBound")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onDataBound() {
        var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
        var currentViewEvents = scheduleObj.getCurrentViewEvents();
        console.log('Events in current view:', currentViewEvents.length);
    }
</script>
```

### Get All Appointments

```cshtml
<script>
    function getAllEvents() {
        var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
        var allEvents = scheduleObj.getEvents();
        console.log('Total appointments:', allEvents.length);
        return allEvents;
    }
</script>
```

### Refresh Appointments

Refresh only appointments without re-rendering entire Scheduler:

```cshtml
<script>
    function refreshEvents() {
        var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
        scheduleObj.refreshEvents();
    }
</script>
```

Useful after updating appointment data from external sources or server updates.

## Best Practices

### Data Integrity
- Always provide unique `Id` for each appointment
- Ensure `StartTime` is before `EndTime`
- Use proper DateTime formats
- Store `RecurrenceException` in UTC format

### Performance
- Use `refreshEvents()` instead of full Scheduler refresh
- Limit visible date range for large datasets
- Index appointment data by date for faster lookups
- Use virtual scrolling for Agenda view with many events

### Recurrence Patterns
- Validate recurrence rules before saving
- Test edge cases (leap years, month endings, DST)
- Document custom recurrence patterns for users
- Provide recurrence rule examples in UI

### User Experience
- Show loading indicators during data fetch
- Provide clear error messages for validation failures
- Implement undo for accidental deletions
- Use tooltips to display full appointment details
- Enable inline editing for quick updates

## Common Scenarios

### Preventing Double Booking

Check for overlaps before creating appointments:

```cshtml
@Html.EJS().Schedule("scheduler")
    .ActionBegin("onActionBegin")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onActionBegin(args) {
        if (args.requestType === 'eventCreate') {
            var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
            var eventData = args.data[0];
            
            // Check if slot is available
            var isAvailable = scheduleObj.isSlotAvailable(eventData);
            if (!isAvailable) {
                args.cancel = true;
                alert('This time slot is already booked.');
            }
        }
    }
</script>
```

### Blocking Time Slots

Prevent appointment creation on specific times:

```csharp
// Block lunch time
appData.Add(new AppointmentData
{
    Id = 100,
    Subject = "Lunch Break",
    StartTime = new DateTime(2026, 4, 10, 12, 0, 0),
    EndTime = new DateTime(2026, 4, 10, 13, 0, 0),
    IsBlock = true  // Blocks this time range
});
```

Users cannot create or drag appointments to blocked time slots.

### Recurring Block Events

```csharp
appData.Add(new AppointmentData
{
    Id = 101,
    Subject = "Weekly Team Lunch",
    StartTime = new DateTime(2026, 4, 10, 12, 0, 0),
    EndTime = new DateTime(2026, 4, 10, 13, 0, 0),
    IsBlock = true,
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=TH"  // Block every Thursday lunch
});
```

## Next Steps

- **Appointment interactions** → See [appointment-interactions.md](appointment-interactions.md) for drag-drop and resize
- **Appointment styling** → See [appointment-customization.md](appointment-customization.md) for templates and colors
- **Data binding** → See [data-binding.md](data-binding.md) for remote data and CRUD
- **Event editor** → See [crud-actions.md](crud-actions.md) for customizing creation/edit UI
