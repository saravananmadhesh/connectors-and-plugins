# Data Binding — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Local Data — Hierarchical Binding](#local-data--hierarchical-binding)
- [Local Data — Self-Referential (Flat) Binding](#local-data--self-referential-flat-binding)
- [Remote Data Binding](#remote-data-binding)
- [URL Adaptor (SQL / Entity Framework)](#url-adaptor-sql--entity-framework)
- [OData Adaptor](#odata-adaptor)
- [Web API Adaptor](#web-api-adaptor)
- [Load on Demand (Lazy Load)](#load-on-demand-lazy-load)
- [DynamicObject and ExpandoObject Binding](#dynamicobject-and-expandoobject-binding)
- [Binding Tips and Gotchas](#binding-tips-and-gotchas)

---

## Overview

The Gantt control uses `DataManager` internally. The `dataSource` property accepts:
- A C# `List<T>` / `IEnumerable<T>` passed via `ViewBag` or model
- A `DataManager` instance pointing to a remote endpoint

Always map your data model to `taskFields` so Gantt knows which properties represent task id, name, dates, etc.

---

## Local Data — Hierarchical Binding

Use a child collection property to represent parent-child task structure.

**Data model:**
```csharp
public class GanttTask
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public List<GanttTask> SubTasks { get; set; }  // child collection
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.DataSource = GetData();
    return View();
}

public static List<GanttTask> GetData()
{
    return new List<GanttTask>
    {
        new GanttTask
        {
            TaskId = 1, TaskName = "Phase 1",
            StartDate = new DateTime(2024, 4, 2),
            EndDate = new DateTime(2024, 4, 21),
            SubTasks = new List<GanttTask>
            {
                new GanttTask { TaskId = 2, TaskName = "Task A", StartDate = new DateTime(2024, 4, 2), Duration = 4, Progress = 50 },
                new GanttTask { TaskId = 3, TaskName = "Task B", StartDate = new DateTime(2024, 4, 8), Duration = 4, Progress = 30 }
            }
        }
    };
}
```

**Tag Helper:**
```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId"
                        name="TaskName"
                        startDate="StartDate"
                        endDate="EndDate"
                        duration="Duration"
                        progress="Progress"
                        child="SubTasks">   @* maps to the SubTasks property *@
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Local Data — Self-Referential (Flat) Binding

Use `id` + `parentID` fields instead of a child collection. All tasks exist in a flat list; parent-child relationships are defined by the `ParentId` field.

**Data model:**
```csharp
public class GanttTask
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int? ParentId { get; set; }   // null = root task
}
```

**Controller:**
```csharp
public static List<GanttTask> GetFlatData()
{
    return new List<GanttTask>
    {
        new GanttTask { TaskId = 1, TaskName = "Phase 1",    StartDate = new DateTime(2024,4,2), Duration = 10, ParentId = null },
        new GanttTask { TaskId = 2, TaskName = "Task A",     StartDate = new DateTime(2024,4,2), Duration = 4,  ParentId = 1 },
        new GanttTask { TaskId = 3, TaskName = "Task B",     StartDate = new DateTime(2024,4,8), Duration = 4,  ParentId = 1 },
    };
}
```

**Tag Helper:**
```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId"
                        name="TaskName"
                        startDate="StartDate"
                        duration="Duration"
                        progress="Progress"
                        parentID="ParentId">   @* flat data — no child property *@
    </e-gantt-taskfields>
</ejs-gantt>
```

> When using flat data, set `parentID` instead of `child`. Tasks with a null or missing `ParentId` become root-level items.

---

## Remote Data Binding

Assign a `DataManager` instance to `dataSource` to load data from a remote service.

```cshtml
@using Syncfusion.EJ2.DataManager

<ejs-gantt id="Gantt" height="450px">
    <e-data-manager url="/Home/GanttData" adaptor="UrlAdaptor"></e-data-manager>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## URL Adaptor (SQL / Entity Framework)

`UrlAdaptor` sends POST requests to your controller and expects a specific JSON shape back.

**Tag Helper:**
```cshtml
<ejs-gantt id="Gantt" height="450px"
           toolbar="@(new List<string>() {"Add","Edit","Delete","Update","Cancel"})">
    <e-data-manager url="/Gantt/DataSource"
                    batchUrl="/Gantt/BatchUpdate"
                    adaptor="UrlAdaptor">
    </e-data-manager>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowAdding="true"
                          allowDeleting="true" allowTaskbarEditing="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

**Controller (read):**
```csharp
[HttpPost]
public ActionResult DataSource([FromBody] DataManagerRequest dm)
{
    var data = GetGanttData();   // returns List<GanttTask>
    var count = data.Count;
    return Json(new { result = data, count });
}
```

**Controller (batch CRUD):**
```csharp
[HttpPost]
public ActionResult BatchUpdate([FromBody] CRUDModel<GanttTask> dm)
{
    if (dm.Action == "insert" || (dm.Action == "batch" && dm.Added != null))
        foreach (var item in dm.Added) { /* insert to DB */ }

    if (dm.Action == "update" || (dm.Action == "batch" && dm.Changed != null))
        foreach (var item in dm.Changed) { /* update in DB */ }

    if (dm.Action == "delete" || (dm.Action == "batch" && dm.Deleted != null))
        foreach (var item in dm.Deleted) { /* delete from DB */ }

    return Json(dm.Value);
}
```

---

## OData Adaptor

```cshtml
<ejs-gantt id="Gantt" height="450px">
    <e-data-manager url="/api/odata/tasks"
                    adaptor="ODataV4Adaptor">
    </e-data-manager>
    <e-gantt-taskfields id="OrderID" name="ShipName" startDate="OrderDate">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Web API Adaptor

```cshtml
<ejs-gantt id="Gantt" height="450px">
    <e-data-manager url="/api/GanttTasks"
                    adaptor="WebApiAdaptor">
    </e-data-manager>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Load on Demand (Lazy Load)

Load child records only when a parent row is expanded. Useful for large datasets.

```cshtml
<ejs-gantt id="Gantt" height="450px"
           loadChildOnDemand="true">
    <e-data-manager url="/Gantt/LoadData"
                    adaptor="UrlAdaptor">
    </e-data-manager>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration"
                        hasChildMapping="IsParent">   @* boolean field indicating parent *@
    </e-gantt-taskfields>
</ejs-gantt>
```

> `hasChildMapping` must point to a boolean property on your model (e.g., `IsParent`). Failure to set this triggers `actionFailure`.

---

## DynamicObject and ExpandoObject Binding

When your schema is not known at compile time, use `ExpandoObject`:

```csharp
public IActionResult Index()
{
    var data = new List<ExpandoObject>();
    dynamic task = new ExpandoObject();
    task.TaskId = 1;
    task.TaskName = "Dynamic Task";
    task.StartDate = new DateTime(2024, 4, 2);
    task.Duration = 5;
    task.Progress = 0;
    data.Add(task);
    ViewBag.DataSource = data;
    return View();
}
```

Map the same field names in `taskFields` as with static types.

---

## Binding Tips and Gotchas

- **Always set `isPrimaryKey="true"`** on the ID column when enabling CRUD — absence triggers `actionFailure`.
- **Dates must be `DateTime` (not `string`)** in the model to render correctly on the timeline.
- **Hierarchical vs. flat:** Use `child` for nested objects; use `parentID` for flat lists — never both at once.
- **Remote + CRUD:** Use `batchUrl` on the DataManager for Add/Edit/Delete operations; read-only remote data only needs `url`.
- **`loadChildOnDemand` requires `hasChildMapping`** — not setting it causes an action failure error.
- **Null Duration:** If both `endDate` and `duration` are null, the task renders as a milestone (zero-duration) point.
