# Views and Display Modes in ASP.NET Core Scheduler

## Table of Contents
- [Available Views](#available-views)
- [Setting Default View](#setting-default-view)
- [Displaying Specific Views](#displaying-specific-views)
- [View Configuration](#view-configuration)
- [Timescale Settings](#timescale-settings)
- [Max Event Stack](#max-event-stack)
- [Advanced Options](#advanced-options)

## Available Views

The Scheduler supports 12 different view modes for displaying appointments:

### Calendar-Based Views

| View | Description | Use Case |
|------|-------------|----------|
| **Day** | Single day with hourly slots | Detailed day planning |
| **Week** | 7-day week (Sun-Sat) with hourly slots | Weekly overview |
| **WorkWeek** | 5-day work week (Mon-Fri) | Business scheduling |
| **Month** | Full month calendar | Monthly overview |
| **Year** | Full year calendar grid | Annual planning |
| **Agenda** | List of upcoming appointments | Simple list view |
| **MonthAgenda** | Month with agenda list on right | Combined view |

### Timeline Views (Horizontal)

| View | Description | Use Case |
|------|-------------|----------|
| **TimelineDay** | Horizontal timeline for one day | Resource-based daily view |
| **TimelineWeek** | Horizontal timeline for one week | Multi-day resource view |
| **TimelineWorkWeek** | Horizontal timeline for work week | Business resource scheduling |
| **TimelineMonth** | Horizontal timeline for one month | Long-term resource planning |
| **TimelineYear** | Horizontal timeline for one year | Annual resource view |

## Setting Default View

### Using currentView Property

Set the initially displayed view:

```cshtml
<!-- Display Month view by default -->
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    currentView="Month"
    selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

The `currentView` property accepts any of the 12 view names listed above.

### Using isSelected Property

Alternatively, set `isSelected` on the view:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week" isSelected="true"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

## Displaying Specific Views

### Restrict to Selected Views

Use the `e-schedule-views` collection to show only specific views:

```cshtml
<!-- Display only Week and Month views -->
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    currentView="Week"
    selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

### Including Multiple View Types

Combine calendar and timeline views:

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    currentView="Week"
    selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

## View Configuration

### Common View Properties

Each view supports these configuration options:

| Property | Type | Applies To | Description |
|----------|------|-----------|-------------|
| `option` | string | All | View name (Day, Week, Month, etc.) |
| `isSelected` | bool | All | Set as default active view |
| `dateFormat` | string | All | Custom date format (e.g., "dd-MM-yyyy") |
| `readonly` | bool | All | Disable CRUD operations on view |
| `showWeekend` | bool | All | Show/hide weekend columns |
| `showWeekNumber` | bool | Calendar views | Display week numbers |
| `displayName` | string | Most views | Custom display name in view selector |
| `interval` | int | Most | Number of days/weeks/months to display |
| `cellTemplate` | string | Calendar views | Custom cell HTML template |
| `eventTemplate` | string | All | Custom event HTML template |
| `dateHeaderTemplate` | string | All | Custom date header template |
| `resourceHeaderTemplate` | string | All | Custom resource header template |
| `workDays` | int[] | Calendar views | Working days (0=Sun, 6=Sat) |
| `startHour` | string | Time-based | Start time (e.g., "08:00") |
| `endHour` | string | Time-based | End time (e.g., "18:00") |
| `maxEventStack` | int | Day, Week, WorkWeek (with `timeScale` enabled) | Maximum number of events to display per cell (0 = unlimited) |

### Configuring Individual Views

Views are configured using C# properties in the controller and tag helper options. The most commonly used configuration is done at the Scheduler level:

```cshtml
<!-- Basic view configuration -->
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 28)" readonly="false">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

For advanced view configuration (business hours, working days, etc.), configure in the controller:

```csharp
public class ScheduleController : Controller
{
    public IActionResult Index()
    {
        ViewBag.scheduleProperties = new
        {
            startHour = "09:00",  // Start time for time-based views
            endHour = "18:00",    // End time for time-based views
            readonly = false      // Read-only mode
        };
        
        ViewBag.datasource = GetAppointmentData();
        return View();
    }
}
```

### Day View Configuration

```cshtml
<!-- Day view with basic configuration -->
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Week View Configuration

```cshtml
<!-- Week view with basic configuration -->
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Month View Configuration

```cshtml
<!-- Month view with basic configuration -->
<ejs-schedule id="schedule" width="100%" height="550" currentView="Month" selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

## Timescale Settings

### Default Timescale

Calendar views display hourly time slots by default. The timescale settings control slot appearance and granularity. These are configured at the Scheduler level:

```csharp
public class ScheduleController : Controller
{
    public IActionResult Index()
    {
        // Configure timescale
        ViewBag.timeScaleSettings = new
        {
            interval = 30,  // 30-minute slots
            slotCount = 2   // 2 slots per hour
        };
        
        ViewBag.datasource = GetAppointmentData();
        return View();
    }
}
```

### Timescale Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `interval` | int | Minutes per slot (15, 30, 60) | 30 → 30-minute slots |
| `slotCount` | int | Number of slots per interval | 2 → 2 slots per 30 min = 15 min intervals |

**Example Configurations:**
- `interval="60", slotCount="1"` → 1-hour slots
- `interval="30", slotCount="2"` → 15-minute slots  
- `interval="15", slotCount="4"` → 5-minute slots

### Using Timescale in View

```cshtml
<!-- Configure in the Scheduler tag -->
<ejs-schedule id="schedule" width="100%" height="550" 
    selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

---

## Max Event Stack

The `maxEventStack` property controls the maximum number of appointments displayed in a time cell. When the number of events in a cell exceeds the specified value, a `+n more` indicator is shown to indicate additional events exist. This is useful for keeping cells clean and uncluttered when many overlapping appointments are present.

> **Note:** The `maxEventStack` property is applicable only with **Day**, **Week**, and **WorkWeek** views when the `timeScale` option is **enabled**.

### Configure Max Event Stack

```cshtml
<ejs-schedule id="Schedule"
              width="100%"
              height="650px"
              selectedDate="new DateTime(2026, 5, 29)"
              currentView="Week">
    
    <e-schedule-views>
        <e-schedule-view option="Day" maxEventStack="1"></e-schedule-view>
        <e-schedule-view option="Week" maxEventStack="1"></e-schedule-view>
        <e-schedule-view option="WorkWeek" maxEventStack="1"></e-schedule-view>
    </e-schedule-views>

    <e-schedule-eventsettings dataSource="@appointments"></e-schedule-eventsettings>
</ejs-schedule>
```

### Max Event Stack Scenarios

| Use Case | Recommended Setting | Description |
|----------|---------------------|-------------|
| High density events | `maxEventStack="1"` or `maxEventStack="2"` | Compact view with overflow indicator for many overlapping events |
| Standard scheduling | `maxEventStack="0"` (default) | Show all events without limit |
| Mobile/responsive | `maxEventStack="1"` | Reduce visual clutter on small screens |
| Resource timeline | Combine with `rowAutoHeight="true"` | Show more events per cell in timeline views |

## Advanced Options

### Displaying Multiple Days

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Using Timeline Views

```cshtml
<!-- Timeline views display horizontally and are useful for resource scheduling -->
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
        <e-schedule-view option="TimelineMonth"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Working Days and Business Hours

You can configure which days are working days and define business hours in the controller:

```csharp
public class ScheduleController : Controller
{
    public IActionResult Index()
    {
        // Working days (0=Sun, 1=Mon, 5=Fri, 6=Sat)
        ViewBag.workDays = new int[] { 1, 2, 3, 4, 5 };  // Mon-Fri
        
        // Business hours
        ViewBag.workHours = new
        {
            start = "09:00",
            end = "17:00"
        };
        
        ViewBag.datasource = GetAppointmentData();
        return View();
    }
}
```

### Multiple Day Display

```cshtml
<!-- Scheduler can display multiple days/weeks/months -->
<ejs-schedule id="schedule" width="100%" height="550" selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
        <e-schedule-view option="TimelineMonth"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Read-Only Mode

```cshtml
<!-- Disable editing at Scheduler level -->
<ejs-schedule id="schedule" width="100%" height="550" 
    readonly="true"
    selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

## Programmatic View Navigation

### Switch Views in Code

```cshtml
<script>
function switchToMonthView() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.currentView = 'Month';
}

function switchToWeekView() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.currentView = 'Week';
}

function nextView() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.navigateNext();
}

function previousView() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.navigatePrevious();
}

function goToDate(date) {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.navigateTo(new Date(date));
}
</script>

<button onclick="switchToMonthView()">Month</button>
<button onclick="switchToWeekView()">Week</button>
<button onclick="nextView()">Next</button>
<button onclick="previousView()">Previous</button>
```

## Complete Example

```cshtml
@{
    ViewData["Title"] = "Scheduler";
}

<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    currentView="Week"
    selectedDate="new DateTime(2024, 3, 28)">
    
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
        <e-schedule-view option="Agenda"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
    </e-schedule-views>
    
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
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

### Controller Code

```csharp
public class ScheduleController : Controller
{
    public IActionResult Index()
    {
        var appointmentData = new List<AppointmentData>
        {
            new AppointmentData
            {
                Id = 1,
                Subject = "Meeting",
                StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
                EndTime = new DateTime(2024, 3, 28, 10, 0, 0),
                Location = "Conference Room"
            }
        };
        
        ViewBag.datasource = appointmentData;
        return View();
    }
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| View doesn't switch | Check `currentView` property value matches an available view name |
| Appointments not showing | Verify `dataSource` is bound to valid data collection |
| Navigation not working | Ensure `selectedDate` is set to a valid DateTime |
| Multiple views not displaying | Confirm all view names in `e-schedule-views` are correct |
| Scheduler not visible | Check `height` and `width` properties are set appropriately |
