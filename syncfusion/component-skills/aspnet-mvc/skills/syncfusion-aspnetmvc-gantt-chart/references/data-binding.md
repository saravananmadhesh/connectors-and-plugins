# Data Binding – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Hierarchical Data Binding](#hierarchical-data-binding)
- [Self-Referential (Flat) Data Binding](#self-referential-flat-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [URL Adaptor (SQL / Entity Framework)](#url-adaptor-sql--entity-framework)
- [Remote Save Adaptor](#remote-save-adaptor)
- [OData Adaptor](#odata-adaptor)
- [Web API Adaptor](#web-api-adaptor)
- [Load-on-Demand](#load-on-demand)
- [Load-on-Demand Limitations](#load-on-demand-limitations)
- [Sending Additional Parameters to the Server](#sending-additional-parameters-to-the-server)
- [Split Task](#split-task)
  - [Hierarchical](#hierarchical-split-task)
  - [Self-Referential](#self-referential-split-task)
- [Improve Performance by Disabling Validations](#improve-performance-by-disabling-validations)
- [Binding Tips and Gotchas](#binding-tips-and-gotchas)
- [Dynamic DataSource Update](#dynamic-datasource-update)
- [General Limitations](#general-limitations)

---

## Overview

The Gantt control uses `DataManager` internally. The `DataSource` property accepts:
- A `List<T>` (local data, passed via `ViewBag`)
- A `DataManager` instance (remote data)

Two local data structures are supported: **hierarchical** (nested objects) and **self-referential** (flat with parent ID).

---

## Hierarchical Data Binding

Use nested child objects. Map the child property name to `TaskFields.Child`.

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public List<GanttData> SubTasks { get; set; }  // child collection
}
```

**Controller:**

```csharp
public ActionResult Index()
{
    var data = new List<GanttData>
    {
        new GanttData
        {
            TaskId = 1, TaskName = "Planning",
            StartDate = new DateTime(2024, 4, 2), EndDate = new DateTime(2024, 4, 10),
            SubTasks = new List<GanttData>
            {
                new GanttData { TaskId = 2, TaskName = "Define scope", StartDate = new DateTime(2024, 4, 2), Duration = 3, Progress = 80 },
                new GanttData { TaskId = 3, TaskName = "Get approval", StartDate = new DateTime(2024, 4, 5), Duration = 2, Progress = 60 }
            }
        }
    };
    ViewBag.GanttData = data;
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .Child("SubTasks")    // maps the nested property
    )
    .Height("450px")
    .Render()
```

---

## Self-Referential (Flat) Data Binding

Use a flat list where each record has an `Id` and a `ParentID`. The Gantt builds the tree internally. Use `TaskFields.ParentID` instead of `TaskFields.Child`.

**Model:**

```csharp
public class GanttFlat
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
public ActionResult Index()
{
    ViewBag.GanttData = new List<GanttFlat>
    {
        new GanttFlat { TaskId = 1, TaskName = "Planning", StartDate = new DateTime(2024, 4, 2), Duration = 5, Progress = 70, ParentId = null },
        new GanttFlat { TaskId = 2, TaskName = "Define scope", StartDate = new DateTime(2024, 4, 2), Duration = 3, Progress = 80, ParentId = 1 },
        new GanttFlat { TaskId = 3, TaskName = "Get approval", StartDate = new DateTime(2024, 4, 5), Duration = 2, Progress = 60, ParentId = 1 },
        new GanttFlat { TaskId = 4, TaskName = "Execution", StartDate = new DateTime(2024, 4, 8), Duration = 6, Progress = 40, ParentId = null },
        new GanttFlat { TaskId = 5, TaskName = "Development", StartDate = new DateTime(2024, 4, 8), Duration = 4, Progress = 50, ParentId = 4 },
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .Duration("Duration")
        .Progress("Progress")
        .ParentID("ParentId")   // maps flat parent reference
    )
    .Height("450px")
    .Render()
```

---

## Remote Data Binding

To load data from a Web API or OData service, use `DataManager`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource(dm => dm
        .Url("/api/gantt")
        .Adaptor("WebApiAdaptor")
    )
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Progress("Progress").ParentID("ParentId")
    )
    .HasChildMapping("IsParent")
    .Height("450px")
    .Render()
```

**Web API controller:**

```csharp
[RoutePrefix("api/gantt")]
public class GanttController : ApiController
{
    [HttpGet, Route("")]
    public object Get()
    {
        var data = GetGanttData();
        var count = data.Count;
        return new { result = data, count = count };
    }
}
```

**Supported adaptors:**
- `WebApiAdaptor` — standard REST API returning `{ result, count }`
- `ODataAdaptor` / `ODataV4Adaptor` — OData services
- `UrlAdaptor` — custom server-side processing
- `CustomAdaptor` — fully custom request/response logic

---

## URL Adaptor (SQL / Entity Framework)

`UrlAdaptor` sends POST requests to your controller and expects a specific JSON shape back.

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource(dm => dm
        .Url("/Gantt/DataSource")
        .BatchUrl("/Gantt/BatchUpdate")
        .Adaptor("UrlAdaptor")
    )
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks")
    )
    .EditSettings(es => es
        .AllowEditing(true).AllowAdding(true)
        .AllowDeleting(true).AllowTaskbarEditing(true)
    )
    .Toolbar(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })
    .Height("450px")
    .Render()
```

**Controller (read):**

```csharp
[HttpPost]
public ActionResult DataSource(DataManagerRequest dm)
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

## Remote Save Adaptor

Use `RemoteSaveAdaptor` when all Gantt actions (filtering, sorting, selection, etc.) should run on the client side, but CRUD operations must be persisted to the server. The full dataset is loaded once; only changes are sent via `batchUrl`.

**View:**

```cshtml
@Html.EJS().Gantt("Gantt").DataSource(dataManager =>
{
    dataManager.Url("/Home/BatchUpdate").Adaptor("remoteSaveAdaptor")
}).TaskFields(ts =>
    ts.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
      .Duration("Duration").Progress("Progress").Child("SubTasks")
).Render()
```

**Controller (read):**

```csharp
GanttDataSourceEntities db = new GanttDataSourceEntities();

public ActionResult BatchUpdate(DataManagerRequest dm)
{
    List<GanttData> DataList = db.GanttDatas.ToList();
    var count = DataList.Count();
    return Json(new { result = DataList, count = count });
}
```

**Controller (batch CRUD):**

```csharp
public IActionResult BatchUpdate([FromBody] CRUDModel batchmodel)
{
    if (batchmodel.changed != null)
    {
        for (var i = 0; i < batchmodel.changed.Count(); i++)
        {
            var value = batchmodel.changed[i];
            GanttDataSource result = DataList.Where(or => or.taskId == value.taskId).FirstOrDefault();
            result.taskId = value.taskId;
            result.taskName = value.taskName;
            result.startDate = value.startDate;
            result.endDate = value.endDate;
            result.duration = value.duration;
            result.progress = value.progress;
            result.parentID = value.parentID;
        }
    }
    if (batchmodel.deleted != null)
    {
        for (var i = 0; i < batchmodel.deleted.Count(); i++)
        {
            DataList.Remove(DataList.Where(or => or.taskId.Equals(batchmodel.deleted[i].taskId)).FirstOrDefault());
            RemoveChildRecords(batchmodel.deleted[i].taskId);
        }
    }
    if (batchmodel.added != null)
    {
        for (var i = 0; i < batchmodel.added.Count(); i++)
        {
            DataList.Add(batchmodel.added[i]);
        }
    }
    return Json(new { addedRecords = batchmodel.added, changedRecords = batchmodel.changed, deletedRecords = batchmodel.deleted });
}

public void RemoveChildRecords(int key)
{
    var childList = DataList.Where(x => x.parentID == key).ToList();
    foreach (var item in childList)
    {
        DataList.Remove(item);
        RemoveChildRecords(item.taskId);
    }
}
```

**`CRUDModel` class:**

```csharp
public class CRUDModel
{
    public List<GanttDataSource> added { get; set; }
    public List<GanttDataSource> changed { get; set; }
    public List<GanttDataSource> deleted { get; set; }
    public object key { get; set; }
    public string action { get; set; }
    public string table { get; set; }
}
```

> **Key points:**
> - Set `Adaptor` to `"remoteSaveAdaptor"` and `Url` to the batch endpoint on the `DataManager`.
> - The server returns `{ addedRecords, changedRecords, deletedRecords }` in the batch response.
> - Use `RemoveChildRecords` helper to cascade-delete child tasks when a parent is deleted.

---

## OData Adaptor

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource(dm => dm
        .Url("/api/odata/tasks")
        .Adaptor("ODataV4Adaptor")
    )
    .TaskFields(tf => tf
        .Id("OrderID").Name("ShipName").StartDate("OrderDate")
    )
    .Height("450px")
    .Render()
```

---

## Web API Adaptor

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource(dm => dm
        .Url("/api/GanttTasks")
        .Adaptor("WebApiAdaptor")
    )
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Child("SubTasks")
    )
    .Height("450px")
    .Render()
```

---

## Load-on-Demand

Load child tasks only when a parent node is expanded. Requires a boolean field indicating whether a task has children:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource(dm => dm.Url("/api/gantt").Adaptor("WebApiAdaptor"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").HasChildMapping("IsParent").ParentID("ParentId")
    )
    .LoadChildOnDemand(true)
    .Height("450px")
    .Render()
```

> The `HasChildMapping` field must be a `bool` property on the model. If not mapped with `LoadChildOnDemand`, the `ActionFailure` event fires.

**Load-on-Demand with Virtualization (full example):**

```cshtml
@Html.EJS().Gantt("DefaultFunctionalities").DataSource(dataManger =>
    {
        dataManger.Url("https://services.syncfusion.com/aspnet/production/api/GanttLoadOnDemand")
                  .CrossDomain(true).Adaptor("WebApiAdaptor");
    })
    .Height("460px").EnableVirtualization(true).LoadChildOnDemand(false)
    .TaskFields(ts => ts
        .Id("taskId").Name("taskName").StartDate("startDate").Progress("progress")
        .Duration("duration").ParentID("parentID").EndDate("endDate").HasChildMapping("isParent")
    )
    .Columns(col =>
    {
        col.Field("taskId").Add();
        col.Field("taskName").Add();
        col.Field("startDate").Add();
        col.Field("duration").Add();
    })
    .TreeColumnIndex(1)
    .AllowSelection(true)
    .HighlightWeekends(true)
    .IncludeWeekend(true)
    .ProjectStartDate("01/02/2000")
    .ProjectEndDate("12/01/2002")
    .Render()
```

**API response for load-on-demand** must return only root-level records initially, then child records when the parent ID is passed as a filter in the request.

---

## Load-on-Demand Limitations

- Filtering, sorting, and searching are **not supported** in load-on-demand mode.
- Only **Self-Referential** type data is supported with remote data binding in load-on-demand.
- Load-on-demand supports only **validated data sources** (all required fields must be present).

---

## Sending Additional Parameters to the Server

Pass extra parameters to the server using the `addParams` method of the `Query` class in the `load` event. These parameters are also accessible in CRUD operations via the `ICRUDModel.params` dictionary.

**View:**

```cshtml
@Html.EJS().Gantt("Gantt").DataSource(dataManager =>
{
    dataManager.Url("http://localhost:50039/Home/UrlDatasource")
               .Adaptor("UrlAdaptor")
               .BatchUrl("http://localhost:50039/Home/BatchSave");
})
.Toolbar(new List<string>() { "Add", "Cancel", "CollapseAll", "Delete", "Edit", "ExpandAll", "Update" })
.TaskFields(ts =>
    ts.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
      .Duration("Duration").Progress("Progress").ParentId("ParentId")
).EditSettings(es => es.AllowEditing(true).AllowAdding(true).AllowDeleting(true))
.Load("load")
.Render()

<script>
function load(args) {
    var ganttObj = document.getElementById("Gantt").ej2_instances[0];
    ganttObj.query = new Query().addParams('ej2Gantt', "test");
}
</script>
```

**Controller — inheriting `DataManagerRequest` to expose the custom parameter:**

```csharp
// Inherit DataManagerRequest to expose the additional parameter
public class Test : DataManagerRequest
{
    public string ej2Gantt { get; set; }
}

public ActionResult UrlDatasource([FromBody] Test dm)
{
    if (DataList == null)
    {
        ProjectData datasource = new ProjectData();
        DataList = datasource.GetUrlDataSource();
    }
    var count = DataList.Count();
    return Json(new { result = DataList, count = count }, JsonRequestBehavior.AllowGet);
}
```

**`ICRUDModel` with params dictionary (for CRUD actions):**

```csharp
public class ICRUDModel<T> where T : class
{
    public object key { get; set; }
    public T value { get; set; }
    public List<T> added { get; set; }
    public List<T> changed { get; set; }
    public List<T> deleted { get; set; }
    public IDictionary<string, object> @params { get; set; }
}
```

> **Key points:**
> - Call `ganttObj.query = new Query().addParams('key', 'value')` inside the `load` event handler.
> - On the server, extend `DataManagerRequest` with a matching property to receive the parameter.
> - For CRUD actions, read custom params from `ICRUDModel.@params["key"]`.

---

## Split Task

The Split-task feature allows you to split a task or interrupt the work during planned or unforeseen circumstances. Segments can be defined either in **hierarchical** or **self-referential** (flat) format.

### Hierarchical Split Task

Define `Segments` as a nested list on each task record and map with `TaskFields.Segments`.

**View:**

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks").Segments("Segments")
    )
    .Render()
```

**Controller:**

```csharp
public ActionResult SplitTasks()
{
    ViewBag.DataSource = GanttData.SplitTasksData();
    return View();
}
```

**Model (segment definition):**

```csharp
GanttDataSource Record2Child1 = new GanttDataSource()
{
    TaskId = 3,
    TaskName = "Plan timeline",
    StartDate = new DateTime(2019, 02, 04),
    EndDate = new DateTime(2019, 02, 10),
    Duration = 10,
    Progress = 60,
    Segments = new List<GanttSegment>
    {
        new GanttSegment { StartDate = new DateTime(2019, 02, 04), Duration = 2 },
        new GanttSegment { StartDate = new DateTime(2019, 02, 05), Duration = 5 },
        new GanttSegment { StartDate = new DateTime(2019, 02, 08), Duration = 3 }
    }
};
```

> Map the segment collection property name to `TaskFields.Segments`. Each `GanttSegment` requires `StartDate` and `Duration`.

---

### Self-Referential Split Task

Define segments as a separate flat collection and bind it to `SegmentData`. Map the foreign key with `TaskFields.SegmentId`.

**View:**

```cshtml
@Html.EJS().Gantt("SplitTasks")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .SegmentData((IEnumerable<object>)ViewBag.Segment)
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor")
        .SegmentId("segmentId").Child("SubTasks")
    )
    .Render()
```

**Controller:**

```csharp
public ActionResult SplitTasks()
{
    ViewBag.DataSource = GanttData.SplitTasksData();
    ViewBag.Segment = GanttData.SegmentData();
    return View();
}
```

**Model (segment record):**

```csharp
GanttSegment Record1 = new GanttSegment()
{
    segmentId = 2,          // references the TaskId to split
    Duration = 2,
    StartDate = new DateTime(2019, 04, 02),
};
```

> `segmentId` must match the `TaskId` of the task to be split. Pass the flat segment collection via `ViewBag.Segment` and bind it using `.SegmentData(...)`.

---

## Improve Performance by Disabling Validations

The `AutoCalculateDateScheduling` property disables parent-child, data, and predecessor validations at initial load, significantly reducing render time for large datasets.

> **Prerequisite:** The data source must already contain all required fields (`StartDate`, `EndDate`, `Duration`) with correct values — the Gantt will not auto-calculate missing values.

**View:**

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AutoCalculateDateScheduling(false)
    .Height("450px")
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .Render()
```

> Set `.AutoCalculateDateScheduling(false)` to skip validations. Only use this when every record in the data source is guaranteed to have complete and valid scheduling data.

---

## Binding Tips and Gotchas

- **Always set `IsPrimaryKey` on the ID column** when enabling CRUD — absence triggers `ActionFailure`.
- **Dates must be `DateTime` (not `string`)** in the model to render correctly on the timeline.
- **Hierarchical vs. flat:** Use `Child` for nested objects; use `ParentID` for flat lists — never both at once.
- **Remote + CRUD:** Use `BatchUrl` on the DataManager for Add/Edit/Delete operations; read-only remote data only needs `Url`.
- **`LoadChildOnDemand` requires `HasChildMapping`** — not setting it causes an action failure error.
- **Null Duration:** If both `EndDate` and `Duration` are null, the task renders as a milestone (zero-duration) point.

---

## Dynamic DataSource Update

To change the data source after initial render (e.g., after a filter or refresh):

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
// Update with new data
ganttObj.dataSource = newDataArray;
```

Or refresh via AJAX and re-assign:

```javascript
fetch('/api/gantt/refresh')
    .then(res => res.json())
    .then(data => {
        var gantt = document.getElementById('gantt').ej2_instances[0];
        gantt.dataSource = data;
    });
```

---

## General Limitations

- Gantt supports both **Hierarchical** and **Self-Referential** data binding, but **not simultaneously**. If both `Child` and `ParentID` are mapped, `ParentID` takes priority and records may not render correctly.
- For SQL database integration, use **Self-Referential** binding — complex nested JSON is difficult to manage in relational tables and requires complex queries for inner-level CRUD.
- If the `TaskId` of a hierarchical record matches the `ParentID` of another record in a flat structure, records will not render properly — self-referential lookup only searches flat data, not inner levels.
- When binding the data source via Fetch (AJAX), it behaves as **local data** — server-side CRUD actions cannot be performed.
