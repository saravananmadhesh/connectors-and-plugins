# Data Binding

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [OData Services](#odata-services)
- [OData v4 Services](#odata-v4-services)
- [Web API](#web-api)
- [URL Adaptor](#url-adaptor)
- [Custom Adaptor](#custom-adaptor)
- [Additional Parameters](#additional-parameters-to-server)
- [HTTP Error Handling](#http-error-handling)
- [Loading Data via AJAX](#loading-data-via-ajax)

## Overview

The Kanban uses `DataManager` for data operations, which supports both local and remote data binding. The `DataSource` property accepts either a list collection or a DataManager instance.

**Supported Data Sources:**
- Local arrays/lists
- DataManager with local data
- Remote services (REST APIs, OData, Web API)
- Custom adaptors

**Key Properties:**
- **DataSource**: The data collection or DataManager instance
- **KeyField**: Maps to the field that determines card placement in columns
- **Query**: Additional query parameters for filtering or customization

## Local Data Binding

Bind local list data directly to the Kanban by assigning a list to the `DataSource` property.

**Example - Using List:**

```csharp
// Controller
public ActionResult Index()
{
    ViewBag.data = GetKanbanData();
    return View();
}

private List<KanbanDataModel> GetKanbanData()
{
    return new List<KanbanDataModel>
    {
        new KanbanDataModel 
        { 
            Id = 1, 
            Status = "Open", 
            Summary = "Analyze requirements", 
            Assignee = "Nancy Davloio" 
        },
        new KanbanDataModel 
        { 
            Id = 2, 
            Status = "InProgress", 
            Summary = "Implement feature", 
            Assignee = "Andrew Fuller" 
        },
        new KanbanDataModel 
        { 
            Id = 3, 
            Status = "Testing", 
            Summary = "Fix bugs", 
            Assignee = "Janet Leverling" 
        },
        new KanbanDataModel 
        { 
            Id = 4, 
            Status = "Close", 
            Summary = "Deploy to production", 
            Assignee = "Nancy Davloio" 
        }
    };
}
```

```razor
@* View *@
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Default Adaptor:** When binding local data, `DataManager` automatically uses `JsonAdaptor`.

**Use Cases:**
- Small datasets (< 1000 records)
- Static data without server interaction
- Prototyping and development
- Client-side filtering and sorting

## Remote Data Binding

Connect to remote services by creating a DataManager instance with a service endpoint URL.

**Example - Basic Remote Data:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)  // Typically disabled for read-only remote data
    .DataSource(dataMgr =>
    {
        dataMgr.Url("https://services.syncfusion.com/aspnet/production/api/Kanban")
               .CrossDomain(true);
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogOpen("onDialogOpen")
    .Render()

<script>
    function onDialogOpen(args) {
        args.cancel = true;  // Prevent editing for read-only data
    }
</script>
```

**Default Adaptor:** For remote data, `DataManager` uses `ODataAdaptor` by default.

**CrossDomain:** Set to `true` when accessing APIs from different domains (handles CORS).

## OData Services

OData is a standardized protocol for creating and consuming RESTful APIs. Use `ODataAdaptor` to connect to OData services.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)
    .DataSource(dataMgr =>
    {
        dataMgr.Url("https://services.syncfusion.com/aspnet/production/api/Kanban")
               .CrossDomain(true)
               .Adaptor("ODataAdaptor");
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogOpen("onDialogOpen")
    .Render()

<script>
    function onDialogOpen(args) {
        args.cancel = true;
    }
</script>
```

**OData Features:**
- Standard query operations (filter, sort, paging)
- Entity relationships
- Batch operations
- Metadata discovery

## OData v4 Services

OData v4 is an improved version of OData protocols. Use `ODataV4Adaptor` for v4 services.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)
    .DataSource(dataMgr =>
    {
        dataMgr.Url("https://services.odata.org/v4/northwind/northwind.svc/Orders/")
               .CrossDomain(true)
               .Adaptor("ODataV4Adaptor");
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogOpen("onDialogOpen")
    .Render()

<script>
    function onDialogOpen(args) {
        args.cancel = true;
    }
</script>
```

**OData v4 Improvements:**
- Enhanced query capabilities
- Better type support
- Improved batch processing
- More efficient protocol

## Web API

Connect to ASP.NET Web API services using `WebApiAdaptor`.

**Example - Kanban with Web API:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)
    .DataSource(dataMgr =>
    {
        dataMgr.Url("/api/Tasks")
               .CrossDomain(true)
               .Adaptor("WebApiAdaptor");
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogOpen("onDialogOpen")
    .Render()

<script>
    function onDialogOpen(args) {
        args.cancel = true;
    }
</script>
```

**Server-Side Web API Controller:**

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

public class TasksController : ApiController
{
    private readonly YourDbContext _context;

    public TasksController()
    {
        _context = new YourDbContext();
    }

    [HttpGet]
    public IEnumerable<KanbanDataModel> Get()
    {
        var data = _context.Tasks.ToList();
        return data;
    }
}
```

## URL Adaptor

The `UrlAdaptor` is ideal for custom RESTful services, providing granular control over CRUD operations.

**Properties:**
- **Url**: Base URL for read operations
- **InsertUrl**: Endpoint for creating new cards
- **UpdateUrl**: Endpoint for updating cards
- **RemoveUrl**: Endpoint for deleting cards
- **CrudUrl**: Single endpoint for all CRUD operations (bulk)

**Example - Individual CRUD URLs:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource(dataMgr =>
    {
        dataMgr.Url("/Home/DataSource")
               .UpdateUrl("/Home/Update")
               .InsertUrl("/Home/Insert")
               .RemoveUrl("/Home/Delete")
               .CrossDomain(true)
               .Adaptor("UrlAdaptor");
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Server-Side Controller:**

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

public class HomeController : Controller
{
    private readonly YourDbContext _context;

    public HomeController()
    {
        _context = new YourDbContext();
    }

    // Read operation
    public ActionResult DataSource()
    {
        var dataSource = _context.Tasks.ToList();
        return Json(dataSource, JsonRequestBehavior.AllowGet);
    }

    // Insert operation
    public ActionResult Insert(KanbanDataModel value)
    {
        _context.Tasks.Add(value);
        _context.SaveChanges();
        return Json(value, JsonRequestBehavior.AllowGet);
    }

    // Update operation
    public ActionResult Update(KanbanDataModel value)
    {
        var existingTask = _context.Tasks.Find(value.Id);
        if (existingTask != null)
        {
            existingTask.Status = value.Status;
            existingTask.Summary = value.Summary;
            existingTask.Assignee = value.Assignee;
            _context.SaveChanges();
        }
        return Json(value, JsonRequestBehavior.AllowGet);
    }

    // Delete operation
    public void Delete(int key)
    {
        var task = _context.Tasks.Find(key);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            _context.SaveChanges();
        }
    }
}

public class KanbanDataModel
{
    public int Id { get; set; }
    public string Status { get; set; }
    public string Summary { get; set; }
    public string Assignee { get; set; }
}
```

### CRUD URL (Bulk Operations)

Handle all CRUD operations through a single endpoint using `CrudUrl`.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource(dataMgr =>
    {
        dataMgr.Url("/Home/DataSource")
               .CrudUrl("/Home/UpdateData")
               .Adaptor("UrlAdaptor")
               .CrossDomain(true);
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Server-Side Controller (CrudUrl Handler):**

```csharp
public ActionResult UpdateData(EditParams param)
{
    // Handle Insert
    if (param.action == "insert" || (param.action == "batch" && param.added != null))
    {
        if (param.action == "insert")
        {
            _context.Tasks.Add(param.value);
        }
        else
        {
            foreach (var item in param.added)
            {
                _context.Tasks.Add(item);
            }
        }
    }

    // Handle Update
    if (param.action == "update" || (param.action == "batch" && param.changed != null))
    {
        if (param.action == "update")
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.Id == param.value.Id);
            if (existingTask != null)
            {
                _context.Entry(existingTask).CurrentValues.SetValues(param.value);
            }
        }
        else
        {
            foreach (var item in param.changed)
            {
                var existingTask = _context.Tasks.FirstOrDefault(t => t.Id == item.Id);
                if (existingTask != null)
                {
                    _context.Entry(existingTask).CurrentValues.SetValues(item);
                }
            }
        }
    }

    // Handle Delete
    if (param.action == "remove" || (param.action == "batch" && param.deleted != null))
    {
        if (param.action == "remove")
        {
            int key = Convert.ToInt32(param.key);
            var task = _context.Tasks.FirstOrDefault(t => t.Id == key);
            if (task != null)
            {
                _context.Tasks.Remove(task);
            }
        }
        else
        {
            foreach (var item in param.deleted)
            {
                var task = _context.Tasks.FirstOrDefault(t => t.Id == item.Id);
                if (task != null)
                {
                    _context.Tasks.Remove(task);
                }
            }
        }
    }

    _context.SaveChanges();
    return Json(param, JsonRequestBehavior.AllowGet);
}

public class EditParams
{
    public string key { get; set; }
    public string action { get; set; }
    public List<KanbanDataModel> added { get; set; }
    public List<KanbanDataModel> changed { get; set; }
    public List<KanbanDataModel> deleted { get; set; }
    public KanbanDataModel value { get; set; }
}
```

**Note:** `CrudUrl` is used for bulk operations, particularly when using multiple selection with `SortBy` as `Index`.

## Custom Adaptor

Create custom adaptors by extending built-in adaptors to add custom logic or field transformations.

**Example - Custom Adaptor with TaskId:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogOpen("onDialogOpen")
    .Created("onCreate")
    .Render()

<script>
    function onDialogOpen(args) {
        args.cancel = true;
    }

    function onCreate(args) {
        // Define custom adaptor
        class TaskIdAdaptor extends ej.data.ODataAdaptor {
            processResponse() {
                var i = 0;
                // Call base class processResponse
                var original = super.processResponse.apply(this, arguments);
                
                // Add custom TaskId field to each record
                original.forEach((item) => item['Id'] = 'Task - ' + ++i);
                
                return original;
            }
        }

        var kanban = document.querySelector('#kanban').ej2_instances[0];
        kanban.dataSource = new ej.data.DataManager({
            url: "https://services.syncfusion.com/aspnet/production/api/Kanban",
            adaptor: new TaskIdAdaptor()
        });
    }
</script>
```

**Use Cases:**
- Adding computed fields
- Transforming data formats
- Custom authentication headers
- Logging or analytics

## Additional Parameters to Server

Send custom parameters with every data request using the `Query` property.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)
    .DataSource(dataMgr =>
    {
        dataMgr.Url("https://services.syncfusion.com/aspnet/production/api/Kanban")
               .CrossDomain(true);
    })
    .Query("new ej.data.Query().addParams('ej2kanban', 'true')")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogOpen("onDialogOpen")
    .Render()

<script>
    function onDialogOpen(args) {
        args.cancel = true;
    }
</script>
```

**Note:** Parameters added via `Query` are sent with every Kanban action (load, insert, update, delete).

**Use Cases:**
- Tenant ID filtering
- User-specific data
- API versioning
- Custom filtering criteria

## HTTP Error Handling

Handle server-side exceptions using the `ActionFailure` event.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)
    .DataSource(dataMgr =>
    {
        dataMgr.Url("http://some.com/invalidUrl")
               .CrossDomain(true);
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .ActionFailure("onActionFailure")
    .Render()

<script>
    function onActionFailure(args) {
        var span = document.createElement('span');
        this.element.parentNode.insertBefore(span, this.element);
        span.style.color = '#FF0000';
        span.innerHTML = 'Server exception: ' + args.error.status + ' ' + args.error.statusText;
    }
</script>
```

**ActionFailure Event Args:**
- `error`: Error object with status, statusText, and response details
- `name`: Event name
- `cancel`: Set to true to prevent default error handling

**Note:** `ActionFailure` fires for both server errors and client-side exceptions during Kanban actions.

## Loading Data via AJAX

Load data dynamically using AJAX requests and bind to the Kanban at runtime.

**Example:**

```razor
@Html.EJS().Button("btn").Content("Load Data via AJAX").Render()

@Html.EJS().Kanban("kanban")
    .KeyField("ShipCountry")
    .Columns(col =>
    {
        col.HeaderText("Denmark").KeyField("Denmark").Add();
        col.HeaderText("Brazil").KeyField("Brazil").Add();
        col.HeaderText("Switzerland").KeyField("Switzerland").Add();
        col.HeaderText("Germany").KeyField("Germany").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("ShippedDate").HeaderField("OrderID");
    })
    .Created("onCreate")
    .Render()

<script>
    function onCreate() {
        var kanbanObj = this;
        var button = document.getElementById('btn');
        
        button.addEventListener("click", function (e) {
            let ajax = new ej.base.Ajax("https://services.syncfusion.com/aspnet/production/api/Orders", "GET");
            ajax.send();
            ajax.onSuccess = function (data) {
                kanbanObj.dataSource = JSON.parse(data);
            };
        });
    }
</script>
```

**Note:** When binding data this way, it acts as local data. Server-side CRUD operations are not automatically performed. You must handle updates manually via additional AJAX calls.

**Use Cases:**
- Lazy loading data on user interaction
- Refreshing data periodically
- Loading data based on user selection
- Conditional data loading

## Best Practices

1. **Use local data for prototyping**: Switch to remote once logic is proven
2. **Disable drag-and-drop for read-only remote data**: Prevents user confusion
3. **Handle ActionFailure events**: Provide user-friendly error messages
4. **Use CrudUrl for bulk operations**: More efficient than individual URLs
5. **Add loading indicators**: Use `ShowSpinner()` method during data operations
6. **Validate server responses**: Ensure data structure matches Kanban expectations
7. **Implement proper authentication**: Secure API endpoints appropriately
8. **Cache data when appropriate**: Reduce server load for frequently accessed data
9. **Use Query for filtering**: Instead of loading all data and filtering client-side
10. **Test with production data volumes**: Ensure performance is acceptable
