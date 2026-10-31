# Data Binding

## Table of Contents
1. [Local Data](#local-data)
2. [Remote Data](#remote-data)
3. [ODataV4 Binding](#odatav4-binding)
4. [Custom Adaptors](#custom-adaptors)
5. [CRUD Operations](#crud-operations)

## Local Data

Bind appointments from a local collection:

### Controller
```csharp
public ActionResult Index() 
{
    ViewBag.appointments = GetScheduleData();
    return View();
}

public List<AppointmentData> GetScheduleData() 
{
    List<AppointmentData> appData = new List<AppointmentData>();
    appData.Add(new AppointmentData {
        Id = 1,
        Subject = "Team Meeting",
        StartTime = new DateTime(2024, 1, 15, 10, 0, 0),
        EndTime = new DateTime(2024, 1, 15, 11, 0, 0),
        Location = "Conference Room"
    });
    return appData;
}
```

### View
```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

## Remote Data

Fetch appointments from a server:

### Controller API Endpoint - SECURE VERSION

```csharp
[Authorize]  // ✅ SECURITY: Require authentication
[HttpGet]
public ActionResult GetEvents() 
{
    try 
    {
        // ✅ SECURITY: Get authenticated user ID
        var userId = User.Identity.GetUserId();
        
        // ✅ SECURITY: Filter data by authenticated user (multi-tenant isolation)
        var events = _context.Events
            .Where(e => e.OwnerId == userId)  // Only user's own appointments
            .ToList();
        
        // ✅ SECURITY: Return only safe fields
        var safeEvents = events.Select(e => new {
            e.Id,
            e.Subject,
            e.StartTime,
            e.EndTime,
            e.Location,
            e.ResourceId
        }).ToList();
        return Json(safeEvents);
    }
    catch (Exception ex)
    {
        // ✅ SECURITY: Log error securely without exposing internals
        System.Diagnostics.Debug.WriteLine($"Error fetching events: {ex.Message}");
        return Json(new { error = "An error occurred while fetching events" }, JsonRequestBehavior.AllowGet);
    }
}
```

### View - With CSRF Protection
```cshtml
@using Syncfusion.EJ2.Schedule

@{
    var dataManager = new Syncfusion.EJ2.DataManager
    {
        Url     = Url.Action("GetData", "Home"),
        CrudUrl = Url.Action("UpdateData", "Home"),
        Adaptor = "UrlAdaptor",
        Headers = new Dictionary<string, object> { 
            // ✅ SECURITY: Include anti-forgery token for cross-domain requests
            { "X-CSRF-TOKEN", @Html.AntiForgeryToken() }
        }
    };
}

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = dataManager })
    .SelectedDate(new DateTime(2024, 1, 15))
    .Render()
)
```

### Legacy (Unsafe) Example - DO NOT USE IN PRODUCTION
⚠️ The following example is **UNSAFE** and provided only for comparison:

```csharp
[HttpGet]
public ActionResult GetEvents() 
{
    // ❌ SECURITY ISSUES:
    // - No authentication check
    // - Returns all events from all users
    // - Exposes all fields
    // - No error handling
    var events = _context.Events.ToList();
    return Json(new { result = events }, JsonRequestBehavior.AllowGet);
}
```

## ODataV4 Binding

Use ODataV4 service:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Readonly(true)
    .EventSettings(e =>
        e.DataSource(d =>
            d.Url("url")
            .Adaptor("ODataV4Adaptor")
            .CrossDomain(true)
        )
    )
    .SelectedDate(new DateTime(2020, 9, 20))
    .Render()
)
```

## Custom Adaptors

Create custom data adaptor with security:

### Secure Custom Adaptor with Authentication

```javascript
// ✅ SECURITY: Include anti-forgery token
var token = document.querySelector('input[name="__RequestVerificationToken"]').value;

var scheduleData = new ej.data.DataManager({
    url: '/api/events',
    adaptor: new ej.data.UrlAdaptor(),
    crossDomain: true
});

// ✅ SECURITY: Add authentication token and anti-forgery headers
scheduleData.beforeSend = function(request) {
    request.headers = {
        'Authorization': 'Bearer ' + token,
        'X-CSRF-TOKEN': token  // Anti-forgery token for state-changing operations
    };
};

// ✅ SECURITY: Handle errors securely
scheduleData.onError = function(response) {
    console.error('Request failed. Please try again.');
    // Do NOT log sensitive data to console in production
};
```

### Legacy (Unsafe) Example - DO NOT USE
⚠️ The following lacks security controls:

```javascript
// ❌ SECURITY ISSUES:
// - Sends authorization token insecurely
// - No CSRF protection
// - No error handling
var scheduleData = new ej.data.DataManager({
    url: '/api/events',
    adaptor: new ej.data.UrlAdaptor(),
    crossDomain: true
});

scheduleData.beforeSend = function(request) {
    request.headers = {
        'Authorization': 'Bearer ' + token  // ❌ Token visible in headers without HTTPS
    };
};
```

## CRUD Operations

Automatic add, edit, delete handling:

```csharp
[Authorize] // ✅ SECURITY: Require authentication
[ValidateAntiForgeryToken] // ✅ SECURITY: Prevent CSRF attacks
[HttpPost]
public ActionResult UpdateEvents([FromBody] CRUDModel<ScheduleEvent> value) 
{
    try 
    {
        var userId = User.Identity.GetUserId(); // ✅ SECURITY: Reference current user
        
        if (value.added != null && value.added.Count > 0) 
        {
            foreach (var item in value.added) 
            {
                // ✅ SECURITY: Sanitize output and set owner
                item.Subject = HtmlEncoder.Default.Encode(item.Subject);
                item.OwnerId = userId; 
                _context.Events.Add(item);
            }
        }
        
        if (value.changed != null && value.changed.Count > 0) 
        {
            foreach (var item in value.changed) 
            {
                // ✅ SECURITY: Ensure user owns the record being modified
                var eventItem = _context.Events.FirstOrDefault(e => e.Id == item.Id && e.OwnerId == userId);
                if (eventItem != null) 
                {
                    eventItem.Subject = HtmlEncoder.Default.Encode(item.Subject);
                    eventItem.StartTime = item.StartTime;
                    eventItem.EndTime = item.EndTime;
                    eventItem.Location = HtmlEncoder.Default.Encode(item.Location);
                }
            }
        }
        
        if (value.deleted != null && value.deleted.Count > 0) 
        {
            foreach (var item in value.deleted) 
            {
                // ✅ SECURITY: Ensure user owns the record being deleted
                var eventItem = _context.Events.FirstOrDefault(e => e.Id == item.Id && e.OwnerId == userId);
                if (eventItem != null)
                {
                    _context.Events.Remove(eventItem);
                }
            }
        }
        
        _context.SaveChanges();
        return Json(value);
    }
    catch (Exception ex)
    {
        // ✅ SECURITY: Generic error message for client
        return Json(new { error = "An error occurred during the update." });
    }
}
```

### View Setup
```cshtml
@Html.EJS().Schedule("Schedule")
    .EventSettings(new ScheduleEventSettings {
        DataSource = new DataManager {
            Url = "/api/events",
            UpdateUrl = "/api/events/Update",
            InsertUrl = "/api/events/Insert",
            RemoveUrl = "/api/events/Remove",
            Adaptor = "UrlAdaptor",
            // Configure CORS on the server with explicit origins when accessing cross-origin APIs.
        }
    })
    .Render()
```
