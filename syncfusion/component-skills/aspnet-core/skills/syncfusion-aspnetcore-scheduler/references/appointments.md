# Appointment Management in ASP.NET Core Scheduler

## Table of Contents
- [Appointment Data Structure](#appointment-data-structure)
- [Appointment Types](#appointment-types)
- [Field Mapping](#field-mapping)
- [Recurring Appointments](#recurring-appointments)
- [Recurrence Patterns](#recurrence-patterns)
- [Advanced Features](#advanced-features)
- [Common Scenarios](#common-scenarios)

## Appointment Data Structure

All appointments in the Scheduler are represented as objects with specific fields. The minimum required fields are `startTime` and `endTime`, with `id` being mandatory for CRUD operations.

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `Id` | int | Unique identifier for the appointment (mandatory for CRUD operations) |
| `StartTime` | DateTime | Start date and time of the appointment (mandatory) |
| `EndTime` | DateTime | End date and time of the appointment (mandatory) |

### Common Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `Subject` | string | Title or summary of the appointment |
| `Location` | string | Location/venue for the appointment |
| `Description` | string | Detailed information about the appointment |
| `IsAllDay` | bool | Indicates if appointment spans entire day(s) |
| `StartTimezone` | string | Timezone for start time (IANA timezone names) |
| `EndTimezone` | string | Timezone for end time (IANA timezone names) |

### Recurring Event Fields

| Field | Type | Description |
|-------|------|-------------|
| `RecurrenceRule` | string | Recurrence pattern (iCalendar format, RFC 5545) |
| `RecurrenceException` | string | Dates to exclude from recurrence (ISO format, no hyphens) |
| `RecurrenceID` | int | Parent recurring event ID for exceptions |
| `FollowingID` | int | Parent event ID when editing current and following events |

### Status Fields

| Field | Type | Description |
|-------|------|-------------|
| `IsReadonly` | bool | Prevents CRUD operations on individual appointment |
| `IsBlock` | bool | Blocks time slot from being used for new appointments |

## Appointment Types

### Normal Events

Standard appointments created for specific time intervals within a day.

```csharp
public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
}

// Usage in controller
var normalEvent = new AppointmentData
{
    Id = 1,
    Subject = "Team Meeting",
    StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 11, 0, 0),
    Location = "Conference Room A",
    Description = "Q1 project review"
};
```

### Spanned Events

Appointments spanning more than 24 hours or across multiple days.

```csharp
var spannedEvent = new AppointmentData
{
    Id = 2,
    Subject = "Training Program",
    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 30, 17, 0, 0),  // Multi-day
    IsAllDay = false,
    Description = "3-day workshop"
};
```

By default, spanned events (>24 hours) display in the all-day row. Control this with the `spannedEventPlacement` property:

```cshtml
<e-schedule-eventsettings dataSource="ViewBag.datasource" spannedEventPlacement="TimeSlot">
</e-schedule-eventsettings>
```

Options: `AllDayRow` (default) or `TimeSlot`

### All-Day Events

Appointments that occupy entire day(s) without specific times.

```csharp
var allDayEvent = new AppointmentData
{
    Id = 3,
    Subject = "Holiday - Independence Day",
    StartTime = new DateTime(2024, 7, 4, 0, 0, 0),
    EndTime = new DateTime(2024, 7, 4, 23, 59, 59),
    IsAllDay = true,
    Description = "National holiday"
};
```

Set `IsAllDay` property to `true` to convert normal appointments to all-day events. All-day events display in a separate row below the date headers.

## Field Mapping

When your data source uses different field names than the default Scheduler fields, map them explicitly:

```cshtml
<e-schedule-eventsettings dataSource="ViewBag.datasource">
    <e-eventsettings-fields id="EventId">
        <e-field-subject name="Title"></e-field-subject>
        <e-field-starttime name="BeginTime"></e-field-starttime>
        <e-field-endtime name="CompleteTime"></e-field-endtime>
        <e-field-location name="Venue"></e-field-location>
        <e-field-description name="Notes"></e-field-description>
        <e-field-isallday name="IsFullDay"></e-field-isallday>
    </e-eventsettings-fields>
</e-schedule-eventsettings>
```

### Field Validation and Defaults

Configure field validation and default values:

```cshtml
<e-schedule-eventsettings dataSource="ViewBag.datasource">
    <e-eventsettings-fields id="Id">
        <e-field-subject name="Subject" title="Meeting Title" default="Add Summary"></e-field-subject>
        <e-field-starttime name="StartTime"></e-field-starttime>
        <e-field-endtime name="EndTime"></e-field-endtime>
        <e-field-location name="Location" title="Location"></e-field-location>
    </e-eventsettings-fields>
</e-schedule-eventsettings>
```

### Custom Fields

Add custom fields beyond the built-in appointment fields:

```csharp
public class ExtendedAppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    // Custom fields
    public string Status { get; set; }      // "Pending", "Confirmed", "Completed"
    public string Priority { get; set; }    // "High", "Medium", "Low"
    public int ResourceId { get; set; }     // For resource assignment
}
```

Custom fields are accessible in templates and events but don't require explicit mapping:

```cshtml
<e-schedule-eventsettings dataSource="ViewBag.datasource">
    <e-eventsettings-fields id="Id">
        <e-field-subject name="Subject"></e-field-subject>
        <e-field-starttime name="StartTime"></e-field-starttime>
        <e-field-endtime name="EndTime"></e-field-endtime>
    </e-eventsettings-fields>
</e-schedule-eventsettings>

<!-- Access custom fields in template -->
<e-schedule-eventsettings dataSource="ViewBag.datasource" template="@ViewBag.template">
</e-schedule-eventsettings>
```

**Note:** FollowingID, IsReadonly, and IsBlock are not exposed as `<e-field-...>` tag helpers in this Syncfusion ASP.NET Core Scheduler, so they fall back to the default PascalCase field-name mapping handled by the Scheduler itself.

## Recurring Appointments

### Creating Recurring Events

Recurring appointments repeat on a defined schedule using the `RecurrenceRule` property. The rule follows the iCalendar (RFC 5545) standard.

```csharp
var dailyMeeting = new AppointmentData
{
    Id = 1,
    Subject = "Daily Standup",
    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 9, 30, 0),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=10"  // Repeats daily for 10 occurrences
};

var weeklyMeeting = new AppointmentData
{
    Id = 2,
    Subject = "Weekly Review",
    StartTime = new DateTime(2024, 3, 28, 14, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 15, 0, 0),
    RecurrenceRule = "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=20"  // Mon, Wed, Fri
};

var monthlyMeeting = new AppointmentData
{
    Id = 3,
    Subject = "Monthly Planning",
    StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 11, 0, 0),
    RecurrenceRule = "FREQ=MONTHLY;BYMONTHDAY=28;INTERVAL=1;COUNT=12"  // 28th of each month
};
```

### Recurrence Rule Components

The `RecurrenceRule` is a string composed of iCalendar properties:

| Property | Values | Purpose |
|----------|--------|---------|
| `FREQ` | DAILY, WEEKLY, MONTHLY, YEARLY | Recurrence frequency |
| `INTERVAL` | Integer | Frequency interval (1=every occurrence, 2=every other, etc.) |
| `COUNT` | Integer | Total number of occurrences |
| `UNTIL` | ISO date (YYYYMMDD format) | End date for recurrence |
| `BYDAY` | MO,TU,WE,TH,FR,SA,SU | Days of week for recurrence |
| `BYMONTHDAY` | 1-31 | Day of month |
| `BYMONTH` | 1-12 | Month of year |
| `BYSETPOS` | Integer | Week position (e.g., 2nd Friday) |

### Adding Exceptions

Exclude specific dates from recurring events using `RecurrenceException`:

```csharp
var recurringEvent = new AppointmentData
{
    Id = 1,
    Subject = "Daily Standup",
    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 9, 30, 0),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=20",
    RecurrenceException = "20240401T090000Z;20240405T090000Z"  // Skip April 1 and 5
};
```

**Exception Format:**
- ISO date-time format: `YYYYMMDDTHHmmssZ`
- Multiple dates separated by semicolon (;)
- Times must be in UTC format (Z suffix)
- Example: 22nd Feb 2024 at 7:30 AM UTC = `20240222T073000Z`

### Editing Recurring Events

When editing a recurring event, handle single occurrences or entire series:

**Edit Single Occurrence:**
Create a new event with `RecurrenceID` pointing to parent event ID:

```csharp
// Parent recurring event
var parentEvent = new AppointmentData
{
    Id = 1,
    Subject = "Daily Standup",
    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 9, 30, 0),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=10"
};

// Modified occurrence for March 30 (moved to 10:00 AM)
var modifiedOccurrence = new AppointmentData
{
    Id = 2,
    Subject = "Daily Standup - Rescheduled",
    StartTime = new DateTime(2024, 3, 30, 10, 0, 0),
    EndTime = new DateTime(2024, 3, 30, 10, 30, 0),
    RecurrenceID = 1,  // Links to parent event
    RecurrenceException = "20240330T090000Z"  // Exclude this date from parent
};

// Both events saved together
allEvents.Add(parentEvent);
allEvents.Add(modifiedOccurrence);
```

**Edit Current and Following Events:**
Use `FollowingID` when `EditFollowingEvents` is enabled:

```csharp
var parentEvent = new AppointmentData
{
    Id = 1,
    Subject = "Weekly Standup",
    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 9, 30, 0),
    RecurrenceRule = "FREQ=WEEKLY;INTERVAL=1;COUNT=10"
};

// Modified from April 4 onwards
var followingEvent = new AppointmentData
{
    Id = 2,
    Subject = "Weekly Standup - Changed time",
    StartTime = new DateTime(2024, 4, 4, 10, 0, 0),
    EndTime = new DateTime(2024, 4, 4, 10, 30, 0),
    FollowingID = 1,  // Starts new series from this date
    RecurrenceRule = "FREQ=WEEKLY;INTERVAL=1"
};
```

Enable in view with `editFollowingEvents`:

```cshtml
<e-schedule-eventsettings dataSource="ViewBag.datasource" editFollowingEvents="true">
</e-schedule-eventsettings>
```

## Recurrence Patterns

### Daily Frequency

```
FREQ=DAILY;INTERVAL=1                          // Every day, never ends
FREQ=DAILY;INTERVAL=1;COUNT=5                  // Every day for 5 occurrences
FREQ=DAILY;INTERVAL=1;UNTIL=20240531           // Every day until May 31, 2024
FREQ=DAILY;INTERVAL=2;COUNT=10                 // Every other day for 10 occurrences
```

### Weekly Frequency

```
FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR          // Mon, Wed, Fri every week
FREQ=WEEKLY;INTERVAL=1;BYDAY=TH;COUNT=10       // Every Thursday for 10 times
FREQ=WEEKLY;INTERVAL=1;BYDAY=MO;UNTIL=20240531 // Every Monday until May 31
FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR;COUNT=10 // Alt weeks: Mon, Wed, Fri for 10 times
```

### Monthly Frequency

```
FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1          // 15th of every month
FREQ=MONTHLY;BYMONTHDAY=16;INTERVAL=1;COUNT=10 // 16th of each month for 10 times
FREQ=MONTHLY;BYMONTHDAY=17;INTERVAL=1;UNTIL=20240531 // 17th monthly until May 31
FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1    // 2nd Friday of each month
FREQ=MONTHLY;BYDAY=WE;BYSETPOS=4;INTERVAL=1;COUNT=10  // 4th Wednesday of each month, 10 times
```

### Yearly Frequency

```
FREQ=YEARLY;BYMONTHDAY=15;BYMONTH=12;INTERVAL=1       // Dec 15 every year
FREQ=YEARLY;BYMONTHDAY=10;BYMONTH=12;INTERVAL=1;COUNT=10  // Dec 10 for 10 years
FREQ=YEARLY;BYDAY=FR;BYMONTH=12;BYSETPOS=3;INTERVAL=1     // 3rd Friday of Dec yearly
FREQ=YEARLY;BYDAY=TU;BYMONTH=12;BYSETPOS=3;INTERVAL=1;COUNT=10  // 3rd Tue of Dec for 10 years
```

## Advanced Features

### Timezone Support

Specify timezones for appointments to handle multi-timezone scenarios:

```csharp
var timezoneEvent = new AppointmentData
{
    Id = 1,
    Subject = "International Call",
    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 10, 0, 0),
    StartTimezone = "America/New_York",    // IANA timezone name
    EndTimezone = "America/New_York",
    Description = "Call with US team"
};
```

**Supported Timezones:** Any valid IANA timezone name (America/New_York, Europe/London, Asia/Tokyo, etc.)

### Overlapping Event Prevention

Prevent multiple appointments in same time slot:

```cshtml
<ejs-schedule id="schedule" allowOverlap="false">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

When `allowOverlap` is false:
- Initial load prioritizes longer durations and all-day events
- New/updated overlapping events trigger conflict alert
- Overlapping events within recurring series are not added
- Use `actionBegin` event to check overlaps across date ranges

### Blocking Time Slots

Mark time slots as unavailable:

```csharp
var blockedSlot = new AppointmentData
{
    Id = 1,
    Subject = "Maintenance Window",
    StartTime = new DateTime(2024, 3, 28, 12, 0, 0),
    EndTime = new DateTime(2024, 3, 28, 14, 0, 0),
    IsBlock = true,  // This blocks the time slot
    Description = "System maintenance"
};
```

With `IsBlock` set to true, users cannot create appointments during this time.

### Making Appointments Read-Only

Prevent editing of specific appointments:

```csharp
var readOnlyEvent = new AppointmentData
{
    Id = 1,
    Subject = "Past Event",
    StartTime = new DateTime(2024, 3, 20, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 20, 10, 0, 0),
    IsReadonly = true,  // Prevents CRUD operations
    Description = "This event cannot be edited or deleted"
};
```

When `IsReadonly` is true, users can view but not modify the appointment.

## Common Scenarios

### Scenario 1: Create Recurring Meeting with Exceptions

```csharp
public var GetScheduleData()
{
    var data = new List<AppointmentData>();
    
    // Create recurring standup Monday-Friday
    var standup = new AppointmentData
    {
        Id = 1,
        Subject = "Daily Standup",
        StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
        EndTime = new DateTime(2024, 3, 28, 9, 30, 0),
        RecurrenceRule = "FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=50",
        RecurrenceException = "20240405T090000Z;20240412T090000Z"  // Skip holidays
    };
    data.Add(standup);
    
    return data;
}
```

### Scenario 2: Multi-Timezone Scheduling

```csharp
var globalMeeting = new List<AppointmentData>
{
    new AppointmentData  // 9 AM Pacific
    {
        Id = 1,
        Subject = "Team Sync",
        StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
        EndTime = new DateTime(2024, 3, 28, 10, 0, 0),
        StartTimezone = "America/Los_Angeles",
        EndTimezone = "America/Los_Angeles",
        RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,WE,FR"
    },
    new AppointmentData  // Same time in different zone
    {
        Id = 2,
        Subject = "Team Sync",
        StartTime = new DateTime(2024, 3, 28, 12, 0, 0),
        EndTime = new DateTime(2024, 3, 28, 13, 0, 0),
        StartTimezone = "America/New_York",
        EndTimezone = "America/New_York",
        RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,WE,FR"
    }
};
```

### Scenario 3: Block Weekend and Holidays

```csharp
var blockedTimes = new List<AppointmentData>
{
    // Block all Sundays
    new AppointmentData
    {
        Id = 1,
        Subject = "Weekend",
        StartTime = new DateTime(2024, 3, 31, 0, 0, 0),
        EndTime = new DateTime(2024, 3, 31, 23, 59, 0),
        IsBlock = true,
        RecurrenceRule = "FREQ=WEEKLY;BYDAY=SU;COUNT=52"
    },
    
    // Block specific holidays
    new AppointmentData
    {
        Id = 2,
        Subject = "Holiday - Independence Day",
        StartTime = new DateTime(2024, 7, 4, 0, 0, 0),
        EndTime = new DateTime(2024, 7, 4, 23, 59, 0),
        IsBlock = true
    }
};
```
