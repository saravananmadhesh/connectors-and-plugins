# CRUD Operations in ASP.NET Core Scheduler

## Table of Contents
- [Adding Appointments](#adding-appointments)
- [Updating Appointments](#updating-appointments)
- [Deleting Appointments](#deleting-appointments)
- [Handling Series vs Occurrences](#handling-series-vs-occurrences)
- [Server-Side Operations](#server-side-operations)
- [Error Handling](#error-handling)
- [Batch Operations](#batch-operations)

## Adding Appointments

### Method 1: Using Editor Window

The default editor window opens on double-click and provides fields for:
- Subject (title)
- Location
- Start and End time
- All-day toggle
- Timezone settings
- Description
- Recurrence options

Users click **Save** to add the appointment.

**Quick Popup:** Single-click on a cell opens a quick popup for subject entry only. Press Enter to save.

**Range Selection:** Select multiple cells and press Enter to create an appointment for that time range.

### Method 2: Using addEvent() Method

Programmatically add appointments using the `addEvent` public method:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<button onclick="addAppointment()">Add New Event</button>

<script>
function addAppointment() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    
    // Add single appointment
    scheduleObj.addEvent({
        Id: 4,
        Subject: 'New Meeting',
        StartTime: new Date(2024, 2, 28, 10, 0),  // March 28, 2024, 10:00 AM
        EndTime: new Date(2024, 2, 28, 11, 0),    // 11:00 AM
        Location: 'Conference Room B',
        Description: 'Important discussion'
    });
    
    // Add multiple appointments at once
    scheduleObj.addEvent([
        {
            Id: 5,
            Subject: 'Workshop',
            StartTime: new Date(2024, 2, 29, 9, 0),
            EndTime: new Date(2024, 2, 29, 12, 0)
        },
        {
            Id: 6,
            Subject: 'Lunch Meeting',
            StartTime: new Date(2024, 2, 29, 12, 30),
            EndTime: new Date(2024, 2, 29, 13, 30)
        }
    ]);
}
</script>
```

### Server-Side Insertion

When CRUD operations are configured with server integration, handle the `insert` action:

```csharp
[HttpPost]
public ActionResult UpdateData([FromBody] EditParams param)
{
    if (param.action == "insert" || (param.action == "batch" && param.added != null))
    {
        var value = (param.action == "insert") ? param.value : param.added[0];
        
        // Generate new ID — prefer database identity/autoincrement columns in production.
        int newId = db.ScheduleEventDatas.Any()
            ? db.ScheduleEventDatas.Max(p => p.Id) + 1
            : 1;
        
        // Create appointment
        DateTime startTime = Convert.ToDateTime(value.StartTime);
        DateTime endTime = Convert.ToDateTime(value.EndTime);
        
        var appointment = new ScheduleEventData()
        {
            Id = newId,
            StartTime = startTime,
            EndTime = endTime,
            Subject = value.Subject,
            Location = value.Location,
            Description = value.Description,
            IsAllDay = value.IsAllDay,
            StartTimezone = value.StartTimezone,
            EndTimezone = value.EndTimezone,
            RecurrenceRule = value.RecurrenceRule,
            RecurrenceID = value.RecurrenceID,
            RecurrenceException = value.RecurrenceException
        };
        
        db.ScheduleEventDatas.Add(appointment);
        db.SaveChanges();
    }
    
    // Return a limited, projected result to avoid materializing the full table
    var data = db.ScheduleEventDatas.OrderBy(e => e.Id)
        .Take(100)
        .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
        .ToList();
    return Json(data);
}

public class EditParams
{
    public string action { get; set; }
    public ScheduleEventData value { get; set; }
    public List<ScheduleEventData> added { get; set; }
    public List<ScheduleEventData> changed { get; set; }
    public List<ScheduleEventData> deleted { get; set; }
}
```

### Validation on Add

Validate input before saving:

```cshtml
@{
    var subjectValidation = new Dictionary<string, object>() { { "required", true } };
    var locationValidation = new Dictionary<string, object>() { { "required", true }, { "regex", new string[] { "^[a-zA-Z0-9\\s\\-,]*$", "Special characters not allowed" } } };
}

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject" title="Meeting Subject" validation="subjectValidation"></e-field-subject>
            <e-field-location name="Location" title="Location" validation="locationValidation"></e-field-location>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Preventing Add on Weekends

Use `actionBegin` event to prevent creation on specific days:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" actionBegin="onActionBegin">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionBegin(args) {
    if (args.requestType === 'eventCreate') {
        var weekendDay = args.data[0].StartTime.getDay();
        
        // Check if weekend (0 = Sunday, 6 = Saturday)
        if (weekendDay === 0 || weekendDay === 6) {
            args.cancel = true;
            alert('Cannot create appointments on weekends');
        }
    }
}
</script>
```

## Updating Appointments

### Method 1: Using Editor Window

Double-click an existing appointment to open the editor pre-filled with current data. Modify fields and click **Save** to update.

**Quick Edit:** Single-click an appointment to open quick info popup with edit and delete options.

### Method 2: Using saveEvent() Method

Update appointments programmatically with the `saveEvent` method:

```cshtml
<script>
function updateAppointment() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    
    // Update single appointment
    scheduleObj.saveEvent({
        Id: 1,  // Must match existing event
        Subject: 'Updated Meeting Title',
        StartTime: new Date(2024, 2, 28, 14, 0),
        EndTime: new Date(2024, 2, 28, 15, 0),
        Location: 'New Room'
    });
}
</script>
```

### Server-Side Update

Handle the `update` action on the server:

```csharp
if (param.action == "update" || (param.action == "batch" && param.changed != null))
{
    var value = (param.action == "update") ? param.value : param.changed[0];
    
    // Find existing appointment
    var existing = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == Convert.ToInt32(value.Id));
    
    if (existing != null)
    {
        // Update fields
        existing.Subject = value.Subject;
        existing.Location = value.Location;
        existing.Description = value.Description;
        existing.StartTime = Convert.ToDateTime(value.StartTime);
        existing.EndTime = Convert.ToDateTime(value.EndTime);
        existing.IsAllDay = value.IsAllDay;
        existing.StartTimezone = value.StartTimezone;
        existing.EndTimezone = value.EndTimezone;
        existing.RecurrenceRule = value.RecurrenceRule;
        existing.RecurrenceID = value.RecurrenceID;
        existing.RecurrenceException = value.RecurrenceException;
        
        db.SaveChanges();
    }
}
```

### Updating Single Recurrence

Edit one occurrence of a recurring event:

```csharp
// Parent recurring event
var parentEvent = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == 1);
parentEvent.RecurrenceException = "20240330T090000Z";  // Add exception date
db.SaveChanges();

// Create modified occurrence
var modifiedOccurrence = new ScheduleEventData()
{
    Id = 10,  // New ID
    Subject = "Daily Standup - Rescheduled",
    StartTime = new DateTime(2024, 3, 30, 10, 0, 0),
    EndTime = new DateTime(2024, 3, 30, 10, 30, 0),
    RecurrenceID = 1  // Links to parent
};
db.ScheduleEventDatas.Add(modifiedOccurrence);
db.SaveChanges();
```

### Preventing Update Outside Working Hours

```csharp
if (param.action == "update")
{
    var value = param.value;
    var hour = Convert.ToDateTime(value.StartTime).Hour;
    
    // Only allow updates between 9 AM and 5 PM
    if (hour < 9 || hour >= 17)
    {
        return Json(new { error = "Cannot update appointments outside working hours" });
    }
}
```

## Deleting Appointments

### Method 1: Using Editor Window

Double-click an appointment to open the editor, then click the **Delete** button at bottom-left.

**Quick Delete:** Single-click appointment to open quick popup with delete option.

**Multi-Delete:** Select multiple appointments with Ctrl+Click, then press Delete key.

### Method 2: Using deleteEvent() Method

```csharp
function deleteAppointment() {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    
    // Delete by ID
    scheduleObj.deleteEvent(1);
    
    // Delete by event object
    scheduleObj.deleteEvent({
        Id: 2,
        Subject: 'Meeting to Delete',
        StartTime: new Date(2024, 2, 28, 10, 0),
        EndTime: new Date(2024, 2, 28, 11, 0)
    });
    
    // Delete multiple
    scheduleObj.deleteEvent([
        { Id: 3 },
        { Id: 4 },
        { Id: 5 }
    ]);
}
```

### Server-Side Deletion

Handle the `remove` action:

```csharp
if (param.action == "remove" || (param.action == "batch" && param.deleted != null))
{
    if (param.action == "remove")
    {
        int id = Convert.ToInt32(param.key);
        var appointment = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == id);
        
        if (appointment != null)
            db.ScheduleEventDatas.Remove(appointment);
    }
    else  // Batch delete
    {
        foreach (var item in param.deleted)
        {
            var appointment = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == item.Id);
            if (appointment != null)
                db.ScheduleEventDatas.Remove(appointment);
        }
    }
    
    db.SaveChanges();
}
```

## Handling Series vs Occurrences

### Editing Single Occurrence

When double-clicking a recurring event, a popup asks to edit the event or series:

```csharp
// Select "EDIT EVENT" to modify single occurrence
var modifiedOccurrence = new ScheduleEventData()
{
    Id = 11,  // New unique ID
    Subject = "Daily Standup - Special Session",
    StartTime = new DateTime(2024, 3, 30, 10, 30, 0),  // Different time
    EndTime = new DateTime(2024, 3, 30, 11, 0, 0),
    RecurrenceID = 1,  // Links to parent event ID
    Location = "Virtual"
};

// Update parent with exception
var parent = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == 1);
parent.RecurrenceException = "20240330T090000Z";  // Exclude this date from series

// Save both
db.ScheduleEventDatas.Add(modifiedOccurrence);
db.SaveChanges();
```

### Editing Entire Series

When selecting "EDIT SERIES", all occurrences update:

```csharp
// Delete any individual modified occurrences
var childOccurrences = db.ScheduleEventDatas.Where(a => a.RecurrenceID == 1);
foreach (var child in childOccurrences)
    db.ScheduleEventDatas.Remove(child);

// Update parent series
var parentEvent = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == 1);
parentEvent.Subject = "Team Standup - New Name";
parentEvent.StartTime = new DateTime(2024, 3, 28, 10, 0, 0);
parentEvent.EndTime = new DateTime(2024, 3, 28, 10, 30, 0);
parentEvent.RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=15";  // Update recurrence

db.SaveChanges();
```

### Deleting Single Occurrence

When deleting one occurrence, add to `RecurrenceException`:

```csharp
// User clicks Delete on March 30 occurrence
var parentEvent = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == 1);
parentEvent.RecurrenceException += ";20240330T090000Z";  // Add date to exception
db.SaveChanges();
```

### Deleting Entire Series

When selecting "DELETE SERIES", remove all related occurrences:

```csharp
// Delete all modified occurrences
var childOccurrences = db.ScheduleEventDatas.Where(a => a.RecurrenceID == 1).ToList();
foreach (var child in childOccurrences)
    db.ScheduleEventDatas.Remove(child);

// Delete parent series
var parentEvent = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == 1);
db.ScheduleEventDatas.Remove(parentEvent);

db.SaveChanges();
```

## Server-Side Operations

### Configuring CRUD with DataManager

```cshtml
@{
    var dataManager = new DataManager()
    {
        Url = "Home/GetData",           // Fetch endpoint (use HTTPS)
        Adaptor = "UrlAdaptor",         // JSON REST adaptor
        CrudUrl = "Home/UpdateData",    // CRUD endpoint
        // Configure server-side CORS with explicit allowed origins instead of relying on a client-side CrossDomain flag.
    };
}

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="dataManager"></e-schedule-eventsettings>
</ejs-schedule>
```

### Complete CRUD Controller

```csharp
public class HomeController : Controller
{
    private ScheduleDataContext db = new ScheduleDataContext();
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    // Protect endpoints with authorization in examples
    // Example: enforce user/tenant isolation by scoping queries to the current user's tenant or user id
    // Use role-based authorization where appropriate: [Authorize(Roles = "Admin,SchedulerManager")]
    [Authorize]
    public ActionResult GetData(int page = 1, int pageSize = 100)
    {
        // Example tenant/user isolation: filter by TenantId or UserId (from claims)
        var userIdClaim = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var tenantId = User?.FindFirst("tenant")?.Value; // set by auth system

        var query = db.ScheduleEventDatas
            .Where(e => e.TenantId == tenantId || e.OwnerUserId == userIdClaim)
            .OrderBy(e => e.Id);
        var paged = query.Skip((page - 1) * pageSize)
                         .Take(pageSize)
                         .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
                         .ToList();
        return Json(paged, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    [Authorize]
    [ValidateAntiForgeryToken]
    public ActionResult UpdateData([FromBody] EditParams param)
    {
        try
        {
            // Server-side validation example: use ModelState or explicit checks
            if (param == null)
                return Json(new { error = "Invalid request" });

            // Example Model validation for incoming DTOs
            if (param.value != null)
            {
                // e.g., check lengths and required fields
                if (string.IsNullOrWhiteSpace(param.value.Subject) || param.value.Subject.Length > 200)
                    return Json(new { error = "Invalid input" });
            }

            // Insert
            if (param.action == "insert" || (param.action == "batch" && param.added != null))
            {
                var value = (param.action == "insert") ? param.value : param.added[0];

                // Basic sanitization / validation
                if (string.IsNullOrWhiteSpace(value.Subject) || value.Subject.Length > 200)
                    return Json(new { error = "Invalid subject" });

                if (!IsValidRecurrenceRule(value.RecurrenceRule))
                    return Json(new { error = "Invalid recurrence rule" });

                int newId = db.ScheduleEventDatas.Any()
                    ? db.ScheduleEventDatas.Max(p => p.Id) + 1
                    : 1;

                // Normalize and validate timezone inputs and store UTC
                TimeZoneInfo tz = TimeZoneInfo.Utc;
                if (!string.IsNullOrEmpty(value.Timezone) && TryNormalizeTimezone(value.Timezone, out var tzFound))
                {
                    tz = tzFound;
                }

                var startUtc = TimeZoneInfo.ConvertTimeToUtc(Convert.ToDateTime(value.StartTime), tz);
                var endUtc = TimeZoneInfo.ConvertTimeToUtc(Convert.ToDateTime(value.EndTime), tz);

                var appointment = new ScheduleEventData()
                {
                    Id = newId,
                    Subject = HtmlEncoder.Default.Encode(value.Subject),
                    StartTime = startUtc,
                    EndTime = endUtc,
                    Location = HtmlEncoder.Default.Encode(value.Location),
                    Description = HtmlEncoder.Default.Encode(value.Description),
                    IsAllDay = value.IsAllDay,
                    Timezone = tz.Id,
                    RecurrenceRule = value.RecurrenceRule,
                    RecurrenceID = value.RecurrenceID,
                    RecurrenceException = value.RecurrenceException
                };

                db.ScheduleEventDatas.Add(appointment);
            }

            // Update with optimistic concurrency example (RowVersion)
            if (param.action == "update" || (param.action == "batch" && param.changed != null))
            {
                var value = (param.action == "update") ? param.value : param.changed[0];
                var existing = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == value.Id);

                if (existing != null)
                {
                    // Example concurrency check: compare RowVersion/ETag before updating
                    if (value.RowVersion != null && !existing.RowVersion.SequenceEqual(value.RowVersion))
                    {
                        return Json(new { error = "Conflict: resource has been modified" });
                    }

                    existing.Subject = HtmlEncoder.Default.Encode(value.Subject);
                    existing.StartTime = Convert.ToDateTime(value.StartTime);
                    existing.EndTime = Convert.ToDateTime(value.EndTime);
                    existing.Location = HtmlEncoder.Default.Encode(value.Location);
                    existing.Description = HtmlEncoder.Default.Encode(value.Description);
                    existing.IsAllDay = value.IsAllDay;
                    existing.RecurrenceRule = value.RecurrenceRule;
                    existing.RecurrenceID = value.RecurrenceID;
                    existing.RecurrenceException = value.RecurrenceException;
                }
            }

            // Delete - use RemoveRange for batch deletes and avoid materializing unnecessarily
            if (param.action == "remove" || (param.action == "batch" && param.deleted != null))
            {
                if (param.action == "remove")
                {
                    var appointment = db.ScheduleEventDatas.FirstOrDefault(a => a.Id == Convert.ToInt32(param.key));
                    if (appointment != null) db.ScheduleEventDatas.Remove(appointment);
                }
                else
                {
                    // Prefer RemoveRange with a filtered query; for very large sets, perform batched deletes
                    var ids = param.deleted.Select(d => d.Id).ToList();
                    var toRemove = db.ScheduleEventDatas.Where(a => ids.Contains(a.Id));
                    db.ScheduleEventDatas.RemoveRange(toRemove);
                }
            }

            db.SaveChanges();

            // Audit logging example (write to logs or to an audit store)
            _logger.LogInformation("User {User} performed CRUD operation on Schedule at {Time}", User?.Identity?.Name, DateTime.UtcNow);

            // Example: persist an audit entry to the database (optional)
            try
            {
                var audit = new AuditEntry
                {
                    User = User?.Identity?.Name ?? "anonymous",
                    Action = param.action,
                    TimestampUtc = DateTime.UtcNow,
                    Details = JsonConvert.SerializeObject(new { param })
                };
                db.AuditEntries.Add(audit);
                db.SaveChanges();
            }
            catch (Exception exAudit)
            {
                _logger.LogWarning(exAudit, "Failed to write audit entry");
            }

            // Return a limited, projected result instead of the full table
            var response = db.ScheduleEventDatas.OrderBy(e => e.Id)
                .Take(100)
                .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
                .ToList();
            return Json(response);
        }
        catch (Exception ex)
        {
            // Log full details server-side, but return a generic message to the client
            _logger.LogError(ex, "Failed to process UpdateData request");
            return Json(new { error = "An error occurred processing the request" });
        }
    }

    // Simple recurrence rule validation to avoid unbounded expansions
    private bool IsValidRecurrenceRule(string rule)
    {
        if (string.IsNullOrEmpty(rule)) return true; // no recurrence
        // Reject overly long rules
        if (rule.Length > 1000) return false;
        // Require COUNT or UNTIL to bound occurrences
        if (!rule.Contains("COUNT") && !rule.Contains("UNTIL")) return false;
        return true;
    }
}

public class EditParams
{
    public string action { get; set; }
    public string key { get; set; }
    public ScheduleEventData value { get; set; }
    public List<ScheduleEventData> added { get; set; }
    public List<ScheduleEventData> changed { get; set; }
    public List<ScheduleEventData> deleted { get; set; }
}
```

## Error Handling

### Handling Server Failures

Use the `actionFailure` event to handle errors:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" actionFailure="onActionFailure">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionFailure(args) {
    console.log('Error:', args.error);
    alert('Failed to perform action: ' + args.error);
}
</script>
```

### Validation on Server

```csharp
[HttpPost]
public ActionResult UpdateData([FromBody] EditParams param)
{
    try
    {
        // Validate appointment data
        if (param.action == "insert" && param.value != null)
        {
            if (string.IsNullOrEmpty(param.value.Subject))
                return Json(new { error = "Subject is required" }, JsonRequestBehavior.AllowGet);
            
            if (param.value.StartTime >= param.value.EndTime)
                return Json(new { error = "Start time must be before end time" });
        }
        
        // Process CRUD operations...
        
        // Return a limited, projected result instead of the full table
        var finalResult = db.ScheduleEventDatas.OrderBy(e => e.Id)
            .Take(100)
            .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
            .ToList();
        return Json(finalResult);
    }
    catch (Exception ex)
    {
        return Json(new { error = ex.Message });
    }
}
```

## Batch Operations

When editing a single occurrence from a recurring series, multiple CRUD actions execute together (batch operation):

```csharp
// Batch operation structure
{
    action: "batch",
    added: [newModifiedOccurrence],   // New modified occurrence
    changed: [updatedParentEvent],    // Parent with updated recurrenceException
    deleted: []                       // Nothing deleted
}
```

The server must handle all three arrays in a single request to maintain data consistency.
