# Data Binding in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Overview](#overview)
- [Local Data Arrays](#local-data-arrays)
- [Hierarchical Structures](#hierarchical-structures)
- [Remote Data Services](#remote-data-services)
- [DataManager Integration](#datamanager-integration)

## When to Use This

Use data binding features when you need to:
- Connect tree grid to local JavaScript arrays or C# collections
- Display self-referential hierarchical data with parent-child relationships
- Integrate with REST APIs, OData services, or custom web services
- Implement server-side paging, sorting, and filtering
- Use Syncfusion DataManager for advanced data operations

## Overview

Data binding is the process of connecting your Tree Grid component to a data source. Tree Grid supports multiple binding approaches:
- **Local Arrays**: Bind JavaScript arrays directly to the component
- **Self-Referential Data**: Use ParentID mapping for parent-child relationships
- **Remote Services**: Connect to OData, REST APIs, or custom web services
- **DataManager**: Use Syncfusion DataManager for advanced data operations

## Local Data Arrays

### Self-Referential Hierarchy (ParentID Mapping)

**Data Model:**
```csharp
public class Task
{
    public int TaskID { get; set; }
    public string TaskName { get; set; }
    public int? ParentID { get; set; }
    public int Duration { get; set; }
    public string Status { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    List<Task> tasks = new List<Task>();
    
    // Root level (ParentID = null)
    tasks.Add(new Task { TaskID = 1, TaskName = "Project", ParentID = null, Duration = 30 });
    tasks.Add(new Task { TaskID = 4, TaskName = "Project 2", ParentID = null, Duration = 25 });
    
    // Child level (ParentID = 1)
    tasks.Add(new Task { TaskID = 2, TaskName = "Design", ParentID = 1, Duration = 10 });
    tasks.Add(new Task { TaskID = 3, TaskName = "Development", ParentID = 1, Duration = 20 });
    
    // Child level (ParentID = 4)
    tasks.Add(new Task { TaskID = 5, TaskName = "Testing", ParentID = 4, Duration = 15 });
    
    ViewBag.DataSource = tasks;
    return View();
}
```

**View (CSHTML):**
```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ChildMapping("Children")
    .IdMapping("TaskID")
    .ParentIdMapping("ParentID")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("Task ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("200").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
        col.Field("Status").HeaderText("Status").Width("100").Add();
    })
    .Render()
```

## Hierarchical Structures

### Child Collection Mapping (ChildMapping)

When data contains explicit child collections, use `ChildMapping` property:

**Data Model with Children:**
```csharp
public class Department
{
    public int DeptID { get; set; }
    public string DeptName { get; set; }
    public int Budget { get; set; }
    public List<Department> SubDepartments { get; set; }
}
```

**Controller Data:**
```csharp
public IActionResult DepartmentHierarchy()
{
    var departments = new List<Department>();
    
    var engineering = new Department
    {
        DeptID = 1,
        DeptName = "Engineering",
        Budget = 500000,
        SubDepartments = new List<Department>
        {
            new Department { DeptID = 2, DeptName = "Frontend Team", Budget = 200000 },
            new Department { DeptID = 3, DeptName = "Backend Team", Budget = 300000 }
        }
    };
    
    departments.Add(engineering);
    ViewBag.Departments = departments;
    return View();
}
```

**View with ChildMapping:**
```html
@Html.EJS().TreeGrid("DeptGrid")
    .DataSource(ViewBag.Departments)
    .ChildMapping("SubDepartments")
    .Columns(col =>
    {
        col.Field("DeptID").HeaderText("Department ID").Width("80").Add();
        col.Field("DeptName").HeaderText("Department").Width("150").Add();
        col.Field("Budget").HeaderText("Budget").Width("120").Format("C").Add();
    })
    .Render()
```

## Remote Data Services

### OData Service Binding

```csharp
// Controller
public IActionResult ODataExample()
{
    return View();
}
```

```html
<!-- View with OData URL -->
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ds => ds
        .Url("url")
        .Adaptor("ODataAdaptor")
    )
    .ChildMapping("Employees")
    .Columns(col =>
    {
        col.Field("EmployeeID").HeaderText("ID").Width("80").Add();
        col.Field("FirstName").HeaderText("First Name").Width("150").Add();
        col.Field("LastName").HeaderText("Last Name").Width("150").Add();
    })
    .Render()
```

### REST API Integration

```csharp
// Controller
public IActionResult RestApiExample()
{
    return View();
}
```

```html
<!-- View with REST API URL -->
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ds => ds
        .Url("/api/tasks")
        .Adaptor("UrlAdaptor")
    )
    .AllowPaging(true)
    .PageSettings(ps => ps.PageSize(12))
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()
```

**API Controller (api/tasks):**
```csharp
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTasks()
    {
        List<Task> tasks = new List<Task>();
        tasks.Add(new Task { TaskID = 1, TaskName = "Task 1", ParentID = null, Duration = 10 });
        tasks.Add(new Task { TaskID = 2, TaskName = "Subtask 1", ParentID = 1, Duration = 5 });
        return Ok(tasks);
    }
}
```

## DataManager Integration

### Using Syncfusion DataManager

```csharp
// Controller
public IActionResult DataManagerExample()
{
    return View();
}
```

```html
<!-- View with DataManager -->
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ds => ds
        .Url("/TreeGrid/GetTasks")
        .Adaptor("UrlAdaptor")
    )
    .AllowPaging(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()
```

**Server-side DataManager Handler:**
```csharp
public class TreeGridController : Controller
{
    public IActionResult GetTasks([FromQuery] int Skip = 0, [FromQuery] int Take = 12)
    {
        var tasks = GetHierarchicalData();
        
        // Apply paging
        var pagedTasks = tasks.Skip(Skip).Take(Take).ToList();
        
        return Json(new { result = pagedTasks, count = tasks.Count });
    }

    private List<Task> GetHierarchicalData()
    {
        var tasks = new List<Task>();
        // Populate data...
        return tasks;
    }
}
```
