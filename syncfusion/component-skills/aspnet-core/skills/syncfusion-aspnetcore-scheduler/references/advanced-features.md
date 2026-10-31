# Advanced Features in ASP.NET Core Scheduler

## Table of Contents
- [Read-Only Mode](#read-only-mode)
- [Inline Editing](#inline-editing)
- [Event Blocking](#event-blocking)
- [Public Methods](#public-methods)
- [Appointment Validation](#appointment-validation)
- [Working Days and Hours](#working-days-and-hours)
- [Rate Limiting Guidance](#rate-limiting-guidance)
- [Timezone Validation](#timezone-validation)
- [Role-based Authorization Examples](#role-based-authorization-examples)
- [Best Practices](#best-practices)

## Read-Only Mode

### Disable All Editing

Prevent all CRUD operations on the Scheduler:

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    readonly="true">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

When `readonly` is `true`:
- Appointments cannot be added, edited, or deleted
- Drag and drop disabled (if allowDragAndDrop is false)
- Resize disabled (if allowResizing is false)
- Edit window does not open
- Double-click has no effect

### Read-Only Individual Appointments

Mark specific appointments as read-only:

```cshtml
public class ScheduleEventData {
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsReadonly { get; set; }
}
```

Use in view:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
            <e-field-isreadonly name="IsReadonly"></e-field-isreadonly>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

When `IsReadonly` is `true` for an appointment:
- Cannot be edited directly
- Cannot be dragged
- Cannot be resized
- Cannot be deleted
- Tooltip and view operations still work

### Read-Only by View

To prevent editing globally, set readonly at the Scheduler level:

```cshtml
<!-- Entire scheduler is read-only -->
<ejs-schedule id="schedule" width="100%" height="550" readonly="true">
    <e-schedule-views>
        <e-schedule-view option="Month"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Day"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

## Inline Editing

### Enable Subject Editing

Allow users to edit appointment subject directly on calendar:

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    allowInline="true">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

When `allowInline` is `true`:
- Click on appointment subject to edit inline
- Press Enter to save
- Press Escape to cancel
- Changes saved to server via actionComplete event

### Inline Editing with Validation

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    allowInline="true"
    actionComplete="onActionComplete">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionComplete(args) {
    if (args.requestType === 'eventChange' && args.data) {
        // Validate subject
        if (!args.data.Subject || args.data.Subject.trim() === '') {
            alert('Subject cannot be empty');
            return false;
        }
        
        // Validate length
        if (args.data.Subject.length > 100) {
            alert('Subject cannot exceed 100 characters');
            return false;
        }
    }
}
</script>
```

## Event Blocking

### Block Time Slots

Prevent scheduling on specific slots:

```cshtml
public class ScheduleEventData {
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsBlock { get; set; }
}
```

Create blocking events:

```csharp
// In controller
public IActionResult GetData() {
    List<ScheduleEventData> data = new List<ScheduleEventData>
    {
        // Regular appointment
        new ScheduleEventData {
            Id = 1,
            Subject = "Team Meeting",
            StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 11, 0, 0),
            IsBlock = false
        },
        
        // Blocked time slot
        new ScheduleEventData {
            Id = 2,
            Subject = "Lunch Break",
            StartTime = new DateTime(2024, 3, 28, 12, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 13, 0, 0),
            IsBlock = true
        }
    };
    return Ok(data);
}
```

Use in view:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
            <e-field-isblock name="IsBlock"></e-field-isblock>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>

<style>
/* Style blocked events */
.e-appointment.e-block {
    background-color: #f5f5f5;
    opacity: 0.6;
    border-left: 4px solid #999;
}
</style>
```

### Prevent Scheduling on Holidays

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    actionBegin="onActionBegin">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
var holidays = [
    new Date(2024, 2, 29),  // March 29
    new Date(2024, 3, 1),   // April 1
    new Date(2024, 4, 15),  // May 15
];

function onActionBegin(args) {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        var eventStart = new Date(args.data.StartTime);
        
        // Check if event is on holiday
        for (var i = 0; i < holidays.length; i++) {
            if (eventStart.toDateString() === holidays[i].toDateString()) {
                alert('Cannot schedule on holidays');
                args.cancel = true;
                break;
            }
        }
    }
}
</script>
```

### Prevent Scheduling on Weekends

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    actionBegin="onActionBegin">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionBegin(args) {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        var eventStart = new Date(args.data.StartTime);
        var dayOfWeek = eventStart.getDay();
        
        // 0 = Sunday, 6 = Saturday
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            alert('Cannot schedule on weekends');
            args.cancel = true;
        }
    }
}
</script>

## Recurrence Rule Validation (Server-side)

When accepting recurrence rules from clients, validate and bound expansions on the server to avoid DoS or infinite recurrence expansion.

```csharp
// Example: basic server-side recurrence validation
private bool IsValidRecurrenceRule(string rule)
{
    if (string.IsNullOrEmpty(rule)) return true;
    // Reject extremely long rules
    if (rule.Length > 1000) return false;
    // Require COUNT or UNTIL to bound occurrences
    if (!rule.Contains("COUNT") && !rule.Contains("UNTIL")) return false;
    return true;
}

// When expanding occurrences on server, cap total iterations
var occurrences = RecurrenceUtility.Expand(rule, start, end, maxOccurrences: 1000);
```

Add rate limiting and server-side checks when running large recurrences.

## Highlight: Recurrence DoS — operational guidance

Recurrence rules can cause large expansions (infinite or very large series). Make this a prominent checklist for implementers:

- Always require either `COUNT` or `UNTIL` in recurrence rules accepted from clients.
- When expanding recurrences server-side, enforce a hard cap (e.g., `maxOccurrences = 1000`) and return a helpful error if exceeded.
- Apply rate limiting at API level to protect against repeated heavy expansions.
- Consider background jobs to pre-compute and cache expanded occurrences and limit synchronous expansion work.
- Log and alert when a single client is requesting unusually large expansions.

Add this checklist to your security review and operational runbooks.
```

## Public Methods

### Get All Events

Retrieve all appointments in the Scheduler:

```cshtml
<button onclick="getAllEvents()">Get All Events</button>

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function getAllEvents() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    var events = scheduleObj.getEvents();
    
    console.log('Total appointments:', events.length);
    events.forEach(function(event) {
        console.log(event.Subject + ' - ' + event.StartTime + ' to ' + event.EndTime);
    });
}
</script>
```

### Get Current View Events

Get appointments visible in current view only:

```cshtml
<button onclick="getCurrentViewEvents()">Get Current View Events</button>

<ejs-schedule id="schedule" width="100%" height="550" currentView="Week">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function getCurrentViewEvents() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    var currentViewEvents = scheduleObj.getCurrentViewEvents();
    
    console.log('Events in current view:', currentViewEvents.length);
}
</script>
```

### Get Event Details from Element

Get event data when clicked:

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    eventClick="onEventClick">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onEventClick(args) {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    var eventData = scheduleObj.getEventDetails(args.element);
    
    console.log('Event ID:', eventData.Id);
    console.log('Subject:', eventData.Subject);
    console.log('Start:', eventData.StartTime);
    console.log('End:', eventData.EndTime);
}
</script>
```

### Refresh Events

Reload appointments without full refresh:

```cshtml
<button onclick="refreshEvents()">Refresh</button>

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function refreshEvents() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    
    // Update data source dynamically. Use HTTPS and include auth tokens or credentials; avoid exposing secrets in the client.
    fetch('/api/schedule/events', {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Authorization': 'Bearer <token>' }
    })
        .then(response => response.json())
        .then(data => {
            scheduleObj.eventSettings.dataSource = data;
            scheduleObj.refresh();
        });
}
</script>
```

### Check Availability

Determine if a time slot is available:

```cshtml
<button onclick="checkSlotAvailability()">Check Availability</button>

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function checkSlotAvailability() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    
    var startTime = new Date(2024, 2, 28, 10, 0);
    var endTime = new Date(2024, 2, 28, 11, 0);
    
    var isAvailable = scheduleObj.isSlotAvailable(startTime, endTime);
    
    if (isAvailable) {
        console.log('Slot is available for scheduling');
    } else {
        console.log('Slot is not available - conflict exists');
    }
}
</script>
```

### Navigate to Date

Jump to specific date:

```cshtml
<button onclick="goToToday()">Go to Today</button>
<button onclick="goToDate('2024-04-15')">Go to April 15</button>

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function goToToday() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.selectedDate = new Date();
}

function goToDate(dateString) {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.selectedDate = new Date(dateString);
}
</script>
```

### Navigate Previous/Next

Move to previous or next period:

```cshtml
<button onclick="goToPrevious()">← Previous</button>
<button onclick="goToNext()">Next →</button>

<ejs-schedule id="schedule" width="100%" height="550" currentView="Month">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function goToPrevious() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];

    var date = new Date(scheduleObj.selectedDate);

    switch (scheduleObj.currentView) {

        case 'Day':
            date.setDate(date.getDate() - 1);
            break;

        case 'Week':
        case 'WorkWeek':
            date.setDate(date.getDate() - 7);
            break;

        case 'Month':
            date.setMonth(date.getMonth() - 1);
            break;

        default:
            date.setDate(date.getDate() - 1);
            break;
    }

    scheduleObj.selectedDate = date;
    scheduleObj.dataBind();
}

function goToNext() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];

    var date = new Date(scheduleObj.selectedDate);

    switch (scheduleObj.currentView) {

        case 'Day':
            date.setDate(date.getDate() + 1);
            break;

        case 'Week':
        case 'WorkWeek':
            date.setDate(date.getDate() + 7);
            break;

        case 'Month':
            date.setMonth(date.getMonth() + 1);
            break;

        default:
            date.setDate(date.getDate() + 1);
            break;
    }

    scheduleObj.selectedDate = date;
    scheduleObj.dataBind();
}
</script>
```

## Appointment Validation

### Prevent Overlapping Appointments

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    allowOverlap="false"
    actionBegin="onActionBegin">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionBegin(args) {
    if ((args.requestType === 'eventCreate' || args.requestType === 'eventChange') 
        && args.data) {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        
        // Check if slot is available
        var isAvailable = scheduleObj.isSlotAvailable(
            args.data.StartTime,
            args.data.EndTime
        );
        
        if (!isAvailable) {
            args.cancel = true;
            scheduleObj.openOverlapAlert();
        }
    }
}
</script>
```

### Custom Validation Rules

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    actionBegin="onActionBegin">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionBegin(args) {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        var data = args.data;
        
        // Rule 1: Subject is required
        if (!data.Subject || data.Subject.trim() === '') {
            alert('Please enter a subject');
            args.cancel = true;
            return;
        }
        
        // Rule 2: Minimum 15 minutes duration
        var duration = (new Date(data.EndTime) - new Date(data.StartTime)) / (1000 * 60);
        if (duration < 15) {
            alert('Appointment must be at least 15 minutes');
            args.cancel = true;
            return;
        }
        
        // Rule 3: Maximum 8 hours duration
        if (duration > 480) {
            alert('Appointment cannot exceed 8 hours');
            args.cancel = true;
            return;
        }
        
        // Rule 4: Cannot schedule in past
        if (new Date(data.StartTime) < new Date()) {
            alert('Cannot schedule appointments in the past');
            args.cancel = true;
            return;
        }
    }
}
</script>
```

## Working Days and Hours

### Configure Working Days

Working days and business hours are configured at the Scheduler level through controller properties and tag attributes:

```csharp
public class ScheduleController : Controller
{
    public IActionResult Index()
    {
        ViewBag.workDays = new int[] { 1, 2, 3, 4, 5 };  // Mon-Fri
        ViewBag.workHours = new { start = "09:00", end = "18:00" };
        ViewBag.datasource = GetAppointmentData();
        return View();
    }
}
```

```cshtml
<!-- Scheduler configured for business days/hours -->
<ejs-schedule id="schedule" width="100%" height="550" currentView="Week">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>
```

## Complete Advanced Features Example

```csharp
// Controller code
public class ScheduleController : Controller
{
    public IActionResult Index()
    {
        ViewBag.datasource = new List<AppointmentData>()
        {
            new AppointmentData { 
                Id = 1, 
                Subject = "Team Meeting", 
                StartTime = DateTime.Now, 
                EndTime = DateTime.Now.AddHours(1),
                IsReadonly = false,
                IsBlock = false
            }
        };
        return View();
    }
}
```

```cshtml
<!-- View: Configure schedule with advanced features -->
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    currentView="Week"
    selectedDate="new DateTime(2024, 3, 28)"
    allowInline="true"
    allowOverlap="false"
    actionBegin="onActionBegin"
    actionComplete="onActionComplete">
    
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    
    <e-schedule-eventsettings 
        dataSource="ViewBag.datasource">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
            <e-field-isreadonly name="IsReadonly"></e-field-isreadonly>
            <e-field-isblock name="IsBlock"></e-field-isblock>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionBegin(args) {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        // Validation: Subject required
        if (!args.data.Subject) {
            alert('Subject is required');
            args.cancel = true;
            return;
        }
        
        // Validation: Prevent past scheduling
        if (new Date(args.data.StartTime) < new Date()) {
            alert('Cannot schedule in past');
            args.cancel = true;
            return;
        }
    }
}

function onActionComplete(args) {
    console.log(args.requestType + ' completed');
}
</script>
```

## Rate Limiting Guidance

To mitigate DoS and abuse (especially for recurrence expansions), add rate limiting to your API. Example using built-in ASP.NET Core rate limiting (simplified):

```csharp
// In Program.cs
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("global", config =>
    {
        config.PermitLimit = 100; // requests
        config.Window = TimeSpan.FromMinutes(1);
        config.QueueProcessingOrder = System.Threading.RateLimiting.QueueProcessingOrder.OldestFirst;
        config.QueueLimit = 0;
    });
});

app.UseRateLimiter();

// Apply policy with attribute or middleware per endpoint
```

Adjust limits to your traffic patterns and consider client-specific partitioning.

## Timezone Validation

Normalize and validate timezone inputs server-side to avoid timezone injection or incorrect conversions. Example:

```csharp
public bool TryNormalizeTimezone(string tzId, out TimeZoneInfo zone)
{
    zone = null;
    if (string.IsNullOrEmpty(tzId)) return false;
    try
    {
        zone = TimeZoneInfo.FindSystemTimeZoneById(tzId);
        return true;
    }
    catch (TimeZoneNotFoundException) { return false; }
    catch (InvalidTimeZoneException) { return false; }
}
```

Reject unknown timezone identifiers and prefer storing UTC timestamps in the database with the original timezone metadata.

## Role-based Authorization Examples

Provide role or policy-based authorization examples so implementers can differentiate admin-level operations from user-level operations.

```csharp
// Role-based example
[Authorize(Roles = "Admin")]
public ActionResult AdminGetAllSchedules() { /* admin-only */ }

// Policy-based example (configure in startup)
// services.AddAuthorization(options => options.AddPolicy("CanManageSchedules", policy => policy.RequireClaim("role", "SchedulerManager")));
[Authorize(Policy = "CanManageSchedules")]
public ActionResult ManageSchedules() { /* scoped to SchedulerManager role */ }
```

Document the minimum privileges required for each endpoint in your API reference and prefer policy-based checks for complex rules.

## Best Practices

1. **Validation First** - Always validate before saving
2. **User Feedback** - Show clear error messages
3. **Performance** - Limit number of appointments displayed
4. **Access Control** - Implement server-side authorization
5. **Audit Trail** - Log all appointment changes
6. **Error Handling** - Handle actionFailure events gracefully
