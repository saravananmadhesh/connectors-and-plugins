# Scheduling Features: Advanced Configuration

## Table of Contents
- [Timescale Configuration](#timescale-configuration)
- [Working Days and Hours](#working-days-and-hours)
- [Timezone Support](#timezone-support)
- [Recurrence Patterns (RFC 5545)](#recurrence-patterns-rfc-5545)
- [Resource Configuration](#resource-configuration)
- [Row Auto Height](#row-auto-height)
- [Adaptive UI](#adaptive-ui)

---

## Timescale Configuration

Timescales define the granularity of time slots displayed in the Scheduler views. Configure the interval and slot count for each view.

### Timescale Properties

| Property | Type | Description |
|----------|------|-------------|
| `interval` | int | Time slot interval in minutes (15, 30, 60) |
| `slotCount` | int | Number of time slots to display per interval |

### Configure Timescale

Timescale is typically configured at the Scheduler level. The following code demonstrates the basic setup:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550px" selectedDate="new DateTime(2024, 3, 10)">
    <e-schedule-timescale enable="true" interval="60" slotCount="6"></e-schedule-timescale>
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Common Timescale Patterns

| Use Case | Interval | SlotCount | Display |
|----------|----------|-----------|---------|
| Detailed scheduling | 15 min | 4 | 4 slots of 15 min = 1 hour |
| Standard scheduling | 30 min | 2 | 2 slots of 30 min = 1 hour |
| High-level planning | 60 min | 1 | 1 slot of 60 min = 1 hour |
| Multi-day view | 60 min | 1 | Collapsed hourly slots |

---

## Working Days and Hours

Configure business days and operating hours to control which days and times are available for scheduling.

### Working Days Configuration

Working days are configured at the Scheduler level. By default, Monday through Friday are working days.

```cshtml
<ejs-schedule id="schedule" width="100%" height="550px" workDays="@ViewBag.workday" selectedDate="new DateTime(2024, 3, 10)">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```
```csharp
public class ScheduleController : Controller
{
    public ActionResult Index()
    {
        ViewBag.datasource = GetScheduleData();
        ViewBag.workday = new int[] { 1, 3, 5 };
        return View();
    }
}
```
### Working Days Reference

| Day Number | Day | Included by Default |
|-----------|-----|-------------------|
| 0 | Sunday | No |
| 1 | Monday | Yes |
| 2 | Tuesday | Yes |
| 3 | Wednesday | Yes |
| 4 | Thursday | Yes |
| 5 | Friday | Yes |
| 6 | Saturday | No |

### Working Hours Configuration

Configure business hours in your controller:
```cshtml
<ejs-schedule id="schedule" width="100%" height="550px" selectedDate="new DateTime(2023, 2, 15)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-workhours highlight="true" start="11:00" end="17:00"></e-schedule-workhours>
    <e-schedule-eventsettings dataSource="@ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

### Complete Working Hours Example

```cshtml
<!-- Basic Scheduler with working day/hour support -->
<ejs-schedule id="schedule" 
              width="100%" 
              height="550px" 
              selectedDate="new DateTime(2024, 3, 10)">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

---

## Timezone Support

Handle appointments across multiple timezones with proper conversion and storage.

### Timezone Fields

| Field | Type | Description |
|-------|------|-------------|
| `StartTimezone` | string | IANA timezone for start time |
| `EndTimezone` | string | IANA timezone for end time |

### Supported IANA Timezones

```
UTC, GMT, Etc/UTC, Etc/GMT
US/Pacific, US/Mountain, US/Central, US/Eastern
Europe/London, Europe/Paris, Europe/Berlin
Asia/Tokyo, Asia/Shanghai, Asia/Hong_Kong, Asia/Singapore
Australia/Sydney, Australia/Melbourne
```

### Timezone-Aware Appointment

```csharp
public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string StartTimezone { get; set; }  // IANA timezone
    public string EndTimezone { get; set; }    // IANA timezone
}
```

### Add Appointment with Timezone

```csharp
var appointment = new AppointmentData
{
    Id = 1,
    Subject = "Team Meeting - NY Office",
    StartTime = new DateTime(2024, 3, 15, 14, 0, 0),  // 2:00 PM
    EndTime = new DateTime(2024, 3, 15, 15, 0, 0),    // 3:00 PM
    StartTimezone = "US/Eastern",   // Eastern Time
    EndTimezone = "US/Eastern"
};
```

### Multi-Timezone Scenario

```csharp
// Meeting spans multiple timezones
var appointment = new AppointmentData
{
    Id = 2,
    Subject = "Global Conference",
    StartTime = new DateTime(2024, 3, 15, 10, 0, 0),  // Start in NY
    EndTime = new DateTime(2024, 3, 15, 11, 0, 0),
    StartTimezone = "US/Eastern",   // 10:00 AM ET = 7:00 AM PT
    EndTimezone = "US/Eastern"
};

// Attendees in different zones see adjusted local times
// NY: 10:00 AM - 11:00 AM
// LA: 7:00 AM - 8:00 AM (US/Pacific)
// London: 2:00 PM - 3:00 PM (Europe/London)
```

### Field Mapping for Timezones

```html
<ejs-schedule id="schedule" dataSource="@ViewBag.AppointmentData">
    <e-schedule-eventSettings>
        <e-eventSettings field="Id" name="Id"></e-eventSettings>
        <e-eventSettings field="Subject" name="Subject"></e-eventSettings>
        <e-eventSettings field="StartTime" name="StartTime"></e-eventSettings>
        <e-eventSettings field="EndTime" name="EndTime"></e-eventSettings>
        <e-eventSettings field="StartTimezone" name="StartTimezone"></e-eventSettings>
        <e-eventSettings field="EndTimezone" name="EndTimezone"></e-eventSettings>
    </e-schedule-eventSettings>
</ejs-schedule>
```

---

## Recurrence Patterns (RFC 5545)

Configure repeating appointments using iCalendar recurrence rules (RFC 5545 standard).

### Recurrence Rule Components

| Component | Values | Description |
|-----------|--------|-------------|
| `FREQ` | DAILY, WEEKLY, MONTHLY, YEARLY | Recurrence frequency |
| `INTERVAL` | Number | Interval multiplier (e.g., INTERVAL=2 = every 2 weeks) |
| `COUNT` | Number | Total occurrences |
| `UNTIL` | Date (YYYYMMDD) | End date for recurrence |
| `BYDAY` | MO,TU,WE,TH,FR,SA,SU | Days of week |
| `BYMONTHDAY` | 1-31 | Days of month |
| `BYMONTH` | 1-12 | Months |
| `BYSETPOS` | Number | Ordinal position (e.g., 1st Monday) |
| `BYHOUR` | 0-23 | Hours |
| `BYMINUTE` | 0-59 | Minutes |
| `BYSECOND` | 0-59 | Seconds |

### Daily Recurrence

```csharp
// Every day for 10 occurrences
appointment.RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=10";

// Every 2 days until Dec 31, 2024
appointment.RecurrenceRule = "FREQ=DAILY;INTERVAL=2;UNTIL=20241231";
```

### Weekly Recurrence

```csharp
// Every Monday, Wednesday, Friday for 20 occurrences
appointment.RecurrenceRule = "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=20";

// Every other week on Monday for 12 occurrences
appointment.RecurrenceRule = "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO;COUNT=12";
```

### Monthly Recurrence

```csharp
// 28th of every month for 12 occurrences
appointment.RecurrenceRule = "FREQ=MONTHLY;BYMONTHDAY=28;INTERVAL=1;COUNT=12";

// First Monday of every month for 12 occurrences
appointment.RecurrenceRule = "FREQ=MONTHLY;BYDAY=1MO;COUNT=12";

// Last day of every month for 12 occurrences
appointment.RecurrenceRule = "FREQ=MONTHLY;BYMONTHDAY=-1;COUNT=12";
```

### Yearly Recurrence

```csharp
// Same date every year for 5 years
appointment.RecurrenceRule = "FREQ=YEARLY;INTERVAL=1;COUNT=5";

// Last Friday of November every year
appointment.RecurrenceRule = "FREQ=YEARLY;BYDAY=-1FR;BYMONTH=11";
```

### Recurrence Exception (Exclude Dates)

Exclude specific dates from a recurring appointment using `RecurrenceException`:

```csharp
var appointment = new AppointmentData
{
    Id = 1,
    Subject = "Daily Standup",
    StartTime = new DateTime(2024, 3, 1, 9, 0, 0),
    EndTime = new DateTime(2024, 3, 1, 9, 30, 0),
    RecurrenceRule = "FREQ=DAILY;COUNT=30",
    
    // Exclude March 15 and March 20 (no standup on those days)
    RecurrenceException = "20240315,20240320"  // YYYYMMDD format, no hyphens
};
```

### Handle Single Occurrence Edits

Edit one occurrence of a recurring event using `RecurrenceID`:

```csharp
// Original recurring event (ID = 5)
var original = new AppointmentData
{
    Id = 5,
    Subject = "Weekly Team Meeting",
    StartTime = new DateTime(2024, 3, 1, 10, 0, 0),
    EndTime = new DateTime(2024, 3, 1, 11, 0, 0),
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=FR;COUNT=12"
};

// Modified single occurrence
var modified = new AppointmentData
{
    Id = 100,  // Different ID
    Subject = "Weekly Team Meeting (Extended)",
    StartTime = new DateTime(2024, 3, 15, 10, 0, 0),  // Specific date
    EndTime = new DateTime(2024, 3, 15, 11, 30, 0),   // Extended by 30 min
    RecurrenceID = 5  // Link to parent recurring event
};
```

### Edit Series vs Occurrence

```csharp
// Option 1: Edit entire series
appointment.RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,WE;COUNT=20";
// Update property for all occurrences

// Option 2: Edit single occurrence using RecurrenceID
modifiedOccurrence.RecurrenceID = parentEventId;
// Only this occurrence is affected
```

### Complete Recurrence Example

```html
<ejs-schedule id="schedule" dataSource="@ViewBag.AppointmentData">
    <e-schedule-eventSettings>
        <e-eventSettings field="Id" name="Id"></e-eventSettings>
        <e-eventSettings field="Subject" name="Subject"></e-eventSettings>
        <e-eventSettings field="StartTime" name="StartTime"></e-eventSettings>
        <e-eventSettings field="EndTime" name="EndTime"></e-eventSettings>
        <e-eventSettings field="RecurrenceRule" name="RecurrenceRule"></e-eventSettings>
        <e-eventSettings field="RecurrenceException" name="RecurrenceException"></e-eventSettings>
        <e-eventSettings field="RecurrenceID" name="RecurrenceID"></e-eventSettings>
    </e-schedule-eventSettings>
</ejs-schedule>
```

---

## Resource Configuration

Configure resources (users, rooms, equipment) for multi-resource scheduling.

### Resource Data Structure

```csharp
public class ResourceData
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Text { get; set; }
    public string Color { get; set; }
    public string GroupId { get; set; }
    public int? ParentId { get; set; }
}
```

### Simple Resource Configuration

```csharp
@{
    string[] resources = new string[] { "Departments", "Teams", "Persons" };
}
```

```html
<ejs-schedule id="schedule" width="100%" height="550px" selectedDate="new DateTime(2024, 3, 10)">
    <e-schedule-group resources="@resources">
    </e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource dataSource="@ViewBag.Resources" 
                            field="ResourceId" 
                            title="Room" 
                            name="Rooms" 
                            textField="Text" 
                            idField="Id" 
                            groupIDField="GroupId">
        </e-schedule-resource>
    </e-schedule-resources>
</ejs-schedule>
```

### Multi-Level Resource Grouping

```csharp
// Resources with hierarchy
var resources = new List<ResourceData>
{
    // Department level
    new ResourceData { Id = 1, Text = "Sales", Name = "Sales", GroupId = null },
    new ResourceData { Id = 2, Text = "Support", Name = "Support", GroupId = null },
    
    // Team level
    new ResourceData { Id = 10, Text = "Sales Team A", GroupId = "1", ParentId = 1 },
    new ResourceData { Id = 11, Text = "Sales Team B", GroupId = "1", ParentId = 1 },
    new ResourceData { Id = 20, Text = "Support Team A", GroupId = "2", ParentId = 2 },
    
    // Person level
    new ResourceData { Id = 100, Text = "John Smith", GroupId = "10", ParentId = 10 },
    new ResourceData { Id = 101, Text = "Jane Doe", GroupId = "10", ParentId = 10 }
};
```

### Resource-Specific Working Hours

```csharp
public class ResourceData
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string Color { get; set; }
    public string StartHour { get; set; }   // Resource start time
    public string EndHour { get; set; }     // Resource end time
    public int[] WorkDays { get; set; }     // Resource working days
}
```

### Appointment with Multiple Resources

```csharp
var appointment = new AppointmentData
{
    Id = 1,
    Subject = "Multi-Team Meeting",
    StartTime = new DateTime(2024, 3, 15, 14, 0, 0),
    EndTime = new DateTime(2024, 3, 15, 15, 0, 0),
    ResourceId = 10,  // Room or primary resource
    
    // Additional resources (if supported)
    AdditionalResources = "11,12"  // Comma-separated resource IDs
};
```

### Resource Filtering in Timeline View

```cshtml
<!-- TimelineDay view grouped by resource -->
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 10)">
    <e-schedule-views>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

---

## Row Auto Height

The `rowAutoHeight` property automatically adjusts the height of work cells based on the number of appointments present in the same time range. This is useful when you have multiple overlapping appointments and want them all visible without the "+n more" indicator. This functionality is applicable only on **Timeline views** (TimelineDay, TimelineWeek, TimelineWorkWeek, TimelineMonth, TimelineYear) and the **Calendar Month view**.

### Configure Row Auto Height

```cshtml
<ejs-schedule id="schedule" width="100%" height="650px" cssClass="adaptive-rows" selectedDate="new DateTime(DateTime.Today.Year, 8, 2)" currentView="TimelineWeek" rowAutoHeight="true">
    <e-schedule-views>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-group enableCompactView="false" resources="@resources">
    </e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource dataSource="@Model.rooms" field="RoomId" title="Room Type" name="MeetingRoom" allowMultiple="true" textField="name" idField="id" colorField="color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@roomDataSource">
        <e-eventsettings-fields>
            <e-field-subject name="Subject" title="Summary"></e-field-subject>
            <e-field-location name="Location" title="Location"></e-field-location>
            <e-field-description name="Description" title="Comments"></e-field-description>
            <e-field-starttime name="StartTime" title="From"></e-field-starttime>
            <e-field-endtime name="EndTime" title="To"></e-field-endtime>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Row Auto Height Scenarios

| Use Case | Recommended Setting | Description |
|----------|---------------------|-------------|
| High appointment density | `rowAutoHeight="true"` | Show all overlapping appointments without truncation |
| Standard scheduling | `rowAutoHeight="false"` | Use static cell height with `+n more` indicator |
| Resource timeline view | `rowAutoHeight="true"` | Display all resource bookings clearly |
| Month view with many events | `rowAutoHeight="true"` | Show more events per day in month view |

---

## Adaptive UI

The `enableAdaptiveUI` property enables the adaptive (responsive) layout for the Scheduler, which provides an optimized viewing experience on smaller screens. When enabled, the Scheduler automatically adjusts its layout based on the screen size, switching to a more compact representation that is easier to interact with on mobile devices.

### Configure Adaptive UI

```cshtml
<ejs-schedule id="schedule" cssClass='schedule-resource' width='100%' height='650px' selectedDate="new DateTime(DateTime.Today.Year, 4, 4)" enableAdaptiveUI="true">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month" isSelected="true"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-group resources="@resources">
    </e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource dataSource="@Model.projects" field="ProjectId" title="Choose Project" name="Projects" textField="text" idField="id" colorField="color">
        </e-schedule-resource>
        <e-schedule-resource dataSource="@Model.categories" field="TaskId" title="Category" name="Categories" textField="text" idField="id" groupIDField='groupId' colorField="color" allowMultiple="true">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@adaptiveDataSource">
        <e-eventsettings-fields>
            <e-field-subject name="Subject" title="Summary"></e-field-subject>
            <e-field-description name="Description" title="Comments"></e-field-description>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Adaptive UI Scenarios

| Use Case | Recommended Setting | Description |
|----------|---------------------|-------------|
| Mobile devices | `enableAdaptiveUI="true"` | Optimized touch-friendly layout for small screens |
| Responsive web apps | `enableAdaptiveUI="true"` | Adapts layout based on screen size |
| Desktop only | `enableAdaptiveUI="false"` | Use standard layout for desktop applications |
| Multi-resource scheduling on mobile | `enableAdaptiveUI="true"` | Tree-view resource navigation on smaller screens |

---

## Summary of Scheduling Features

| Feature | Configuration | Purpose |
|---------|---------------|---------|
| **Timescale** | interval, slotCount | Control time slot granularity |
| **Working Hours** | Controller configuration | Limit scheduling to business hours |
| **Working Days** | Controller configuration | Define business days (Mon-Fri) |
| **Timezone** | StartTimezone, EndTimezone properties | Handle multi-timezone scheduling |
| **Recurrence** | RecurrenceRule (RFC 5545) | Create repeating appointments |
| **Row Auto Height** | rowAutoHeight property | Auto-adjust work cell height to fit all appointments |
| **Adaptive UI** | enableAdaptiveUI property | Enable responsive layout for smaller screens |

### Complete Scheduling Configuration Example

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550px" 
    selectedDate="new DateTime(2024, 3, 10)">
    
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    
    <e-schedule-eventsettings dataSource="ViewBag.Appointments">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
            <e-field-location name="Location"></e-field-location>
            <e-field-description name="Description"></e-field-description>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Controller Configuration

```csharp
public class ScheduleController : Controller
{
    public IActionResult Index()
    {
        // Configure working hours and days
        ViewBag.workHours = new { start = "09:00", end = "18:00" };
        ViewBag.workDays = new int[] { 1, 2, 3, 4, 5 };
        
        // Configure timescale
        ViewBag.timeScale = new { interval = 30, slotCount = 2 };
        
        // Get appointment data with timezone and recurrence info
        var appointments = GetAppointmentData();
        ViewBag.Appointments = appointments;
        
        return View();
    }
    
    private List<AppointmentData> GetAppointmentData()
    {
        return new List<AppointmentData>
        {
            new AppointmentData
            {
                Id = 1,
                Subject = "International Meeting",
                StartTime = new DateTime(2024, 3, 28, 9, 0),
                EndTime = new DateTime(2024, 3, 28, 10, 0),
                StartTimezone = "America/New_York",
                EndTimezone = "America/New_York",
                RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,WE,FR"
            }
        };
    }
}
```
