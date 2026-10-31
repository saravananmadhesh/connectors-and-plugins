# Data Binding in ASP.NET Core Scheduler

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [ODataV4 Integration](#odatav4-integration)
- [Custom Adaptor](#custom-adaptor)
- [AJAX Data Loading](#ajax-data-loading)
- [Query Parameters](#query-parameters)
- [Error Handling](#error-handling)

## Local Data Binding

### Basic Local Data

Bind local JSON array to the Scheduler:

```csharp
// Controller
public IActionResult Index()
{
    var appointmentData = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Team Standup",
            StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 9, 30, 0),
            Location = "Conference Room"
        },
        new AppointmentData
        {
            Id = 2,
            Subject = "Project Review",
            StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 11, 0, 0),
            Location = "Virtual"
        }
    };
    
    ViewBag.datasource = appointmentData;
    return View();
}

public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Location { get; set; }
}
```

In the view, assign the data source:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

**Default Adaptor:** When binding arrays, the `JsonAdaptor` is used automatically for local data.

### Using DataManager for Local Data

```cshtml
@{
    var dataManager = new DataManager(ViewBag.datasource);
}

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="dataManager"></e-schedule-eventsettings>
</ejs-schedule>
```

## Remote Data Binding

### URL Adaptor for REST APIs

Use `UrlAdaptor` to fetch and update data from a REST endpoint:

```cshtml
@{
    var dataManager = new DataManager()
    {
        Url = "Home/GetData",           // GET endpoint for fetching (use HTTPS)
        Adaptor = "UrlAdaptor",         // REST adaptor
        CrudUrl = "Home/UpdateData",    // POST endpoint for CRUD
        // For cross-origin requests configure CORS on the server with explicit origins.
        // Avoid using a client-side `CrossDomain = true` example that exposes credentials.
    };
}

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="dataManager"></e-schedule-eventsettings>
</ejs-schedule>
```

### Server Endpoints

**GET Endpoint - Fetch Data:**

```csharp
[Authorize]
public ActionResult GetData(int page = 1, int pageSize = 100)
{
    // Return a paged, projected result to avoid exposing full database tables.
    var query = db.ScheduleEventDatas.OrderBy(e => e.Id);
    var paged = query.Skip((page - 1) * pageSize)
                     .Take(pageSize)
                     .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
                     .ToList();
    return Json(paged);
}
```

**POST Endpoint - CRUD Operations:**

```csharp
[HttpPost]
public ActionResult UpdateData([FromBody] EditParams param)
{
    try
    {
        if (param.action == "insert" || (param.action == "batch" && param.added != null))
        {
            var value = (param.action == "insert") ? param.value : param.added[0];
            int newId = db.ScheduleEventDatas.Any() 
                ? db.ScheduleEventDatas.Max(p => p.Id) + 1 
                : 1;
            
            var appointment = new ScheduleEventData()
            {
                Id = newId,
                Subject = value.Subject,
                StartTime = Convert.ToDateTime(value.StartTime),
                EndTime = Convert.ToDateTime(value.EndTime),
                Location = value.Location,
                IsAllDay = value.IsAllDay,
                RecurrenceRule = value.RecurrenceRule,
                RecurrenceID = value.RecurrenceID,
                RecurrenceException = value.RecurrenceException
            };
            
            db.ScheduleEventDatas.Add(appointment);
        try
        {
            // Server-side validation and sanitization example
            if (param == null)
                return Json(new { error = "Invalid request" });

            if (param.action == "insert" || (param.action == "batch" && param.added != null))
            {
                var value = (param.action == "insert") ? param.value : param.added[0];
                if (string.IsNullOrWhiteSpace(value.Subject) || value.Subject.Length > 200)
                    return Json(new { error = "Invalid input" });

                int newId = db.ScheduleEventDatas.Any()
                    ? db.ScheduleEventDatas.Max(p => p.Id) + 1
                    : 1;

                var appointment = new ScheduleEventData()
                {
                    Id = newId,
                    Subject = HtmlEncoder.Default.Encode(value.Subject),
                    StartTime = Convert.ToDateTime(value.StartTime),
                    EndTime = Convert.ToDateTime(value.EndTime),
                    Location = HtmlEncoder.Default.Encode(value.Location),
                    IsAllDay = value.IsAllDay,
                    RecurrenceRule = value.RecurrenceRule,
                    RecurrenceID = value.RecurrenceID,
                    RecurrenceException = value.RecurrenceException
                };

                db.ScheduleEventDatas.Add(appointment);
            }

            // Other CRUD operations handled similarly with validation and encoding

            db.SaveChanges();
            // Return a limited, projected result rather than the full table
            var result = db.ScheduleEventDatas.OrderBy(e => e.Id)
                .Take(100)
                .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
                .ToList();
            return Json(result);
        }
        catch (Exception ex)
        {
            // Log details server-side and return a generic error to the client
            // _logger.LogError(ex, "GetData/UpdateData failed");
            return Json(new { error = "An error occurred processing the request" });
        }
        Adaptor = "ODataV4Adaptor",
        // For OData endpoints configure server-side CORS and require authentication.
    };
}

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="dataManager"></e-schedule-eventsettings>
</ejs-schedule>
```

### Field Mapping for OData

When OData returns fields with different names, map them:

```cshtml
@{
    var dataManager = new DataManager()
    {
        Url = "url",
        Adaptor = "ODataV4Adaptor"
    };
}

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="dataManager">
        <e-eventsettings-fields id="EventId">
            <e-field-subject name="EventTitle"></e-field-subject>
            <e-field-starttime name="StartDateTime"></e-field-starttime>
            <e-field-endtime name="EndDateTime"></e-field-endtime>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Server-Side Filtering

Enable filtering on the server for better performance:

```cshtml
@{
    var dataManager = new DataManager()
    {
        Url = "url",
        Adaptor = "ODataV4Adaptor"
    };
}

<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-eventsettings 
        dataSource="dataManager"
        includeFiltersInQuery="true">  <!-- Enable server-side filtering -->
    </e-schedule-eventsettings>
</ejs-schedule>
```

When `includeFiltersInQuery` is true, the Scheduler sends:
- Start date
- End date
- Recurrence rule filters

This reduces data transfer by filtering on the server instead of client.

## Custom Adaptor

### Creating Custom Data Processing

Extend `ODataV4Adaptor` for custom response handling:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.dataManager"></e-schedule-eventsettings>
</ejs-schedule>

<script>
// Custom adaptor script
class CustomAdaptor extends ej2.data.ODataV4Adaptor {
    processResponse(data, ds, query, xhr, request, changes) {
        // Custom response processing
        if (data && data.value) {
            // Add custom field processing
            data.value.forEach(item => {
                item.CustomField = item.Subject + ' - ' + item.Location;
            });
        }
        
        return super.processResponse(data, ds, query, xhr, request, changes);
    }
}

// Assign custom adaptor
var dataManager = new ej2.data.DataManager({
    url: 'url',
    adaptor: new CustomAdaptor(),
    // Avoid client-side `crossDomain: true`. Configure server-side CORS with explicit allowed origins and require authentication for cross-origin requests.
});
</script>
```

## AJAX Data Loading

### Load Data via AJAX Request

Dynamically load appointment data:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
// Load data after schedule renders
document.addEventListener('DOMContentLoaded', function () {
    // Use HTTPS and send credentials securely. Avoid embedding secrets in client code.
    // Prefer HttpOnly, SameSite cookies or a server-side proxy for tokens.
    // Example using anti-forgery token from a meta tag (set by server) and sending cookies:
    const csrfToken = document.querySelector('meta[name="request-verification-token"]')?.getAttribute('content');
    fetch('/Home/GetData', {
        method: 'GET',
        credentials: 'include', // send cookies (use secure, HttpOnly cookies)
        headers: { 'Accept': 'application/json', 'RequestVerificationToken': csrfToken }
    })
        .then(response => response.json())
        .then(data => {
            var scheduleObj = document.getElementById('schedule').ej2_instances[0];
            scheduleObj.eventSettings.dataSource = data;
            scheduleObj.refresh();
        })
        .catch(error => console.log('Error loading data:', error));
});
</script>
```

### Load Data on Date Range Change

```csharp
// In Razor view
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    navigating="onNavigating">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onNavigating(args) {
    // Load data for the new date range
    var startDate = args.startDate;
    var endDate = args.endDate;
    
    // Encode parameters and use secure transport. Prefer a server-side proxy if tokens must be kept secret.
    // Retrieve anti-forgery token from meta and use cookie-based auth rather than embedding tokens in JS.
    const csrf = document.querySelector('meta[name="request-verification-token"]')?.getAttribute('content');
    fetch(`/Home/GetDataForRange?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Accept': 'application/json', 'RequestVerificationToken': csrf }
    })
        .then(response => response.json())
        .then(data => {
            var scheduleObj = document.getElementById('schedule').ej2_instances[0];
            scheduleObj.eventSettings.dataSource = data;
        });
}
</script>
```

## Query Parameters

### Adding Custom Parameters

Pass additional parameters with data requests:

```cshtml
@{
    var query = new Query()
        .addParams("UserId", "123")
        .addParams("Department", "Engineering");
    
    var dataManager = new DataManager()
    {
        Url = "Home/GetData",
        Adaptor = "UrlAdaptor",
        Query = query
    };
}

<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings dataSource="dataManager"></e-schedule-eventsettings>
</ejs-schedule>
```

### Server-Side Parameter Handling

```csharp
public ActionResult GetData(int UserId, string Department)
{
    // Validate inputs to avoid injection and unexpected filters
    if (UserId <= 0) return Json(new { error = "Invalid user id" });
    if (!string.IsNullOrEmpty(Department) && Department.Length > 100) return Json(new { error = "Invalid department" });

    // Use strongly-typed queries (Entity Framework) to avoid SQL concatenation
    var data = db.ScheduleEventDatas
        .Where(e => e.UserId == UserId && (string.IsNullOrEmpty(Department) || e.Department == Department))
        .Take(500) // guard: limit maximum rows returned for ad-hoc queries
        .ToList();

    return Json(data);
}
```

## Error Handling

### Handle Data Binding Errors

```cshtml
<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    actionFailure="onActionFailure">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionFailure(args) {
    console.log('Action failed:', args);
    console.log('Error:', args.error);
    
    if (args.error && args.error.message) {
        alert('Error: ' + args.error.message);
    }
}
</script>
```

### Server-Side Error Response

When errors occur, return appropriate error responses:

```csharp
[HttpPost]
[Authorize]
[ValidateAntiForgeryToken]
public ActionResult UpdateData([FromBody] EditParams param)
{
    try
    {
        // Basic server-side validation
        if (param == null || param.value == null)
            return Json(new { error = "Invalid request" });

        if (param.value.StartTime >= param.value.EndTime)
            return Json(new { error = "Start time must be before end time" });

        // Process CRUD...

        // Return a limited, projected result instead of the full table
        var response = db.ScheduleEventDatas.OrderBy(e => e.Id)
            .Take(100)
            .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
            .ToList();
        return Json(response);
    }
    catch (Exception ex)
    {
        // Log server-side (not shown) and return generic client message
        return Json(new { error = "An error occurred processing the request" });
    }
}
```

## Complete Data Binding Example

### Full-Featured Setup

```csharp
// Controller
public class ScheduleController : Controller
{
    private ScheduleContext db = new ScheduleContext();
    
    public IActionResult Index()
    {
        var dataManager = new DataManager()
        {
            Url = "/Schedule/GetData",
            Adaptor = "UrlAdaptor",
            CrudUrl = "/Schedule/UpdateData",
            // Configure CORS on the server with explicit origins when accessing cross-origin APIs.
        };
        
        ViewBag.dataManager = dataManager;
        return View();
    }
    
    [Authorize]
    public ActionResult GetData(int page = 1, int pageSize = 100)
    {
        var query = db.Events.OrderBy(e => e.Id);
        var paged = query.Skip((page - 1) * pageSize)
                         .Take(pageSize)
                         .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
                         .ToList();
        return Json(paged);
    }
    
    [HttpPost]
    [Authorize]
    public ActionResult UpdateData([FromBody] EditParams param)
    {
        // Handle insert, update, delete...
        db.SaveChanges();
        var result = db.Events.OrderBy(e => e.Id)
            .Take(100)
            .Select(e => new { e.Id, e.Subject, e.StartTime, e.EndTime, e.Location })
            .ToList();
        return Json(result);
    }
}
```

```cshtml
<!-- View -->
@{
    var dataManager = (DataManager)ViewBag.dataManager;
}

<ejs-schedule id="schedule" 
    width="100%" 
    height="550"
    selectedDate="new DateTime(2024, 3, 28)"
    actionFailure="onActionFailure">
    <e-schedule-eventsettings dataSource="dataManager">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
            <e-field-location name="Location"></e-field-location>
            <e-field-description name="Description"></e-field-description>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionFailure(args) {
    if (args.error && args.error.message) {
        alert('Error: ' + args.error.message);
    }
}
</script>
```

## Performance Optimization

### Use includeFiltersInQuery for Large Datasets

```cshtml
<e-schedule-eventsettings 
    dataSource="ViewBag.dataManager"
    includeFiltersInQuery="true">  <!-- Filter on server -->
</e-schedule-eventsettings>
```

Benefits:
- Reduces data transferred
- Improves load time
- Server processes date range filters
- Only relevant events returned

### Refresh Events Without Full Reload

```csharp
var scheduleObj = document.getElementById('schedule').ej2_instances[0];
scheduleObj.refreshEvents();  // Updates data without reloading UI
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Data not displaying | Check dataSource binding and field mapping |
| CRUD not working | Verify CrudUrl endpoint and EditParams structure |
| Slow loading | Enable `includeFiltersInQuery` for server filtering |
| Field mismatch | Use `e-eventsettings-fields` with `e-field-*` children to map custom field names |
| Cross-domain errors | Configure server-side CORS with explicit allowed origins instead of relying on a client-side `CrossDomain = true` flag. See the Security section for examples. |
