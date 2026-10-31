# Resources – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Resource Collection and Fields](#resource-collection-and-fields)
- [Assign Resources to Tasks](#assign-resources-to-tasks)
- [Resource Unit (Work Allocation %)](#resource-unit-work-allocation-)
- [Work](#work)
- [Task Type](#task-type)
- [Add and Edit Resources via Dialog](#add-and-edit-resources-via-dialog)
- [Resource View](#resource-view)
- [Resource OverAllocation](#resource-overallocation)
- [Unassigned Tasks](#unassigned-tasks)
- [Taskbar Drag and Drop Between Resources](#taskbar-drag-and-drop-between-resources)
- [Multi-Taskbar in Resource View](#multi-taskbar-in-resource-view)
- [Disable Taskbar Overlap](#disable-taskbar-overlap)
- [Show Resources as Labels](#show-resources-as-labels)
- [Resource Customization](#resource-customization)

---

## Overview

Resources represent the people, equipment, or materials allocated to tasks. Resources are shown on the Gantt chart and can be assigned via dialog editing. Resource data is separate from task data and linked via an ID field.

---

## Resource Collection and Fields

**Resource model:**

```csharp
public class GanttResource
{
    public int ResourceId { get; set; }
    public string ResourceName { get; set; }
    public double? Unit { get; set; }    // work capacity % (optional)
    public string Group { get; set; }    // grouping label (optional)
}
```

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.GanttData = GetTaskData();
    ViewBag.Resources = GetResources();
    return View();
}

public static List<GanttResource> GetResources()
{
    return new List<GanttResource>
    {
        new GanttResource { ResourceId = 1, ResourceName = "Alice Johnson" },
        new GanttResource { ResourceId = 2, ResourceName = "Bob Smith" },
        new GanttResource { ResourceId = 3, ResourceName = "Carol White" },
        new GanttResource { ResourceId = 4, ResourceName = "David Lee" },
    };
}
```

**ResourceFields** mapping:

| Field | Description |
|---|---|
| `id` | Unique resource identifier (links to task's ResourceInfo array) |
| `name` | Displayed resource name |
| `unit` | Work capacity percentage per day (default 100%) |
| `group` | Resource group/category label |

---

## Assign Resources to Tasks

**Task model with resource IDs:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int[] ResourceId { get; set; }       // array of resource IDs
    public List<GanttData> SubTasks { get; set; }
}

// In data:
new GanttData { TaskId = 2, TaskName = "Design", ..., ResourceId = new int[] { 1, 3 } }
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf
        .Id("ResourceId")
        .Name("ResourceName")
    )
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress")
        .ResourceInfo("ResourceId")    // maps task's resource ID array
        .Child("SubTasks")
    )
    .Render()
```

---

## Resource Unit (Work Allocation %)

Assign a specific work unit (%) for a resource on a task — useful when a resource is only partially allocated:

```csharp
// ResourceInfo can be an array of objects with id and unit
public class ResourceAssignment
{
    public int ResourceId { get; set; }
    public double Unit { get; set; }  // e.g., 50 = 50% allocation
}

public class GanttData
{
    public int TaskId { get; set; }
    // ...
    public List<ResourceAssignment> ResourceInfo { get; set; }
}

// Data:
new GanttData
{
    TaskId = 3, TaskName = "Development",
    ResourceInfo = new List<ResourceAssignment>
    {
        new ResourceAssignment { ResourceId = 1, Unit = 100 },
        new ResourceAssignment { ResourceId = 2, Unit = 50 }   // Bob at 50%
    }
}
```

Map `Unit` in ResourceFields:

```cshtml
.ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("Unit"))
```

---

## Work

**Work** is the total hours required to complete a task. Map the work field using `.TaskFields(tf => tf.Work("Work"))` and set the unit of measurement using `.WorkUnit()` on the Gantt.

- Supported `WorkUnit` values: `Hour` (default), `Day`, `Minute`.
- When the `work` field is mapped, the default task type becomes `FixedWork`.

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int Work { get; set; }
    public List<ResourceAssignment> Resources { get; set; }
    public List<GanttData> SubTasks { get; set; }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("ResourceUnit"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").Work("Work").ResourceInfo("Resources").Child("SubTasks")
    )
    .WorkUnit(Syncfusion.EJ2.Gantt.WorkUnit.Hour)
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Columns(col =>
    {
        col.Field("TaskId").Visible(false).Add();
        col.Field("TaskName").HeaderText("Task Name").Width("180").Add();
        col.Field("Resources").HeaderText("Resources").Width("160").Add();
        col.Field("Work").Width("110").Add();
        col.Field("Duration").Width("100").Add();
    })
    .Render()
```

---

## Task Type

The `Work`, `Duration`, and resource `Unit` fields are interdependent. Use `.TaskType()` to fix one field, preventing it from being recalculated when another changes.

| `TaskType` Value | Fixed Field | What Updates on Edit |
|---|---|---|
| `FixedUnit` (default) | Resource unit stays constant | Duration changes → Work updates; Work changes → Duration updates |
| `FixedDuration` | Duration stays constant | Resource unit changes → Work updates; Work changes → Resource unit updates |
| `FixedWork` | Work stays constant | Duration changes → Resource unit updates; Resource unit changes → Duration updates |

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("ResourceUnit"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").Work("Work").ResourceInfo("Resources").Child("SubTasks")
    )
    .WorkUnit(Syncfusion.EJ2.Gantt.WorkUnit.Hour)
    .TaskType(Syncfusion.EJ2.Gantt.TaskType.FixedWork)
    .Render()
```

> These calculations do not apply to milestones. For manually scheduled tasks, `FixedWork` and `FixedUnit` behave differently — the work field may update instead of duration.

---

## Add and Edit Resources via Dialog

When editing is enabled, users can assign and edit resources through the **Resources tab** in the edit dialog. To expose the Resources tab, add `"Resources"` to the `EditDialogFields` list:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").ResourceInfo("ResourceId").Child("SubTasks")
    )
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true))
    .EditDialogFields(edf =>
    {
        edf.Type("General").Add();
        edf.Type("Dependency").Add();
        edf.Type("Resources").Add();
    })
    .Render()
```

> In the Resources tab of the edit dialog, **double-click** the unit cell next to a resource to change its work unit for that task.

---

## Resource View

Switch the Gantt from task view to resource view — rows show resources and their assigned tasks:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Group("Group"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .ResourceInfo("ResourceId").Child("SubTasks")
    )
    .ViewType(Syncfusion.EJ2.Gantt.ViewType.ResourceView)
    .Render()
```

In resource view:
- Parent rows = resource names (from resource collection)
- Child rows = tasks assigned to each resource
- Tasks shared by multiple resources appear under each resource's row
- Unscheduled tasks are **not supported** in Resource View
- Tasks can be moved to a different resource by editing the resource field via cell editing or the dialog

---

## Resource OverAllocation

When `ViewType` is `ResourceView`, set `ShowOverAllocation(true)` to visually highlight dates where a resource is allocated beyond their available capacity. Overallocated date ranges are marked with **square brackets** on the resource row.

- Overallocation is calculated from the resource's `unit` value and the `DayWorkingTime` configuration.
- Default value is `false`.
- Can be toggled programmatically at runtime by setting `ganttObj.showOverAllocation`.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("ResourceUnit").Group("ResourceGroup"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").Work("Work").Dependency("Predecessor")
        .ResourceInfo("Resources").Child("SubTasks")
    )
    .ViewType(Syncfusion.EJ2.Gantt.ViewType.ResourceView)
    .ShowOverAllocation(true)
    .ToolbarClick("toolbarClick")
    .Toolbar(new List<object>
    {
        "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll",
        new { text = "Show/Hide Overallocation", tooltipText = "Show/Hide Overallocation", id = "showhidebar" }
    })
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'showhidebar') {
        var ganttObj = document.getElementById('gantt').ej2_instances[0];
        ganttObj.showOverAllocation = !ganttObj.showOverAllocation;
    }
}
</script>
```

---

## Unassigned Tasks

Tasks that have no resource assigned are automatically grouped under an **"Unassigned Task"** parent row at the bottom of the resource view. This grouping is evaluated at load time.

- If a resource is later assigned to an unassigned task (via editing), the task automatically moves to the appropriate resource's children.
- No additional configuration is required.

---

## Taskbar Drag and Drop Between Resources

Set `AllowTaskbarDragAndDrop(true)` to allow users to drag a task's taskbar **vertically** from one resource row to another in Resource View.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("ResourceUnit").Group("ResourceGroup"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").Work("Work").Dependency("Predecessor")
        .ResourceInfo("Resources").Child("SubTasks")
    )
    .ViewType(Syncfusion.EJ2.Gantt.ViewType.ResourceView)
    .EnableMultiTaskbar(true)
    .AllowTaskbarDragAndDrop(true)
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Render()
```

> `AllowTaskbarDragAndDrop` requires `ViewType.ResourceView`. Dragging a taskbar to a different resource row reassigns the task to that resource.

---

## Multi-Taskbar in Resource View

Show multiple task bars on a single row per resource when tasks overlap:

```cshtml
@Html.EJS().Gantt("gantt")
    .ViewType(Syncfusion.EJ2.Gantt.ViewType.ResourceView)
    .EnableMultiTaskbar(true)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").ResourceInfo("ResourceId").Child("SubTasks"))
    .Render()
```

Without `EnableMultiTaskbar`, each resource row expands into sub-rows for overlapping tasks.

Use `CollapseAllParentTasks(true)` to collapse all resource parent rows on initial load:

```cshtml
@Html.EJS().Gantt("gantt")
    .ViewType(Syncfusion.EJ2.Gantt.ViewType.ResourceView)
    .EnableMultiTaskbar(true)
    .CollapseAllParentTasks(true)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("ResourceUnit").Group("ResourceGroup"))
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").ResourceInfo("Resources").Child("SubTasks"))
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Render()
```

| Property | Description |
|---|---|
| `EnableMultiTaskbar` | Shows all resource tasks stacked in the collapsed resource row |
| `CollapseAllParentTasks` | Collapses all resource parent rows on initial load |
| `AllowTaskbarDragAndDrop` | Enables vertical drag of taskbars between resource rows |

---

## Disable Taskbar Overlap

Set `AllowTaskbarOverlap(false)` to prevent taskbars for different tasks from overlapping within a resource row. Each task is rendered on its own sub-row, and the row height expands to accommodate all tasks.

- When `AllowTaskbarOverlap` is `false`, **task dependencies cannot be established** between tasks rendered on multiple lines for the same resource.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("ResourceUnit").Group("ResourceGroup"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").Work("Work").Dependency("Predecessor")
        .ResourceInfo("Resources").Child("SubTasks")
    )
    .ViewType(Syncfusion.EJ2.Gantt.ViewType.ResourceView)
    .EnableMultiTaskbar(true)
    .AllowTaskbarOverlap(false)
    .Render()
```

---

## Show Resources as Labels

Display resource names on taskbars using `LabelSettings`:

```cshtml
@Html.EJS().Gantt("gantt")
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .ResourceInfo("ResourceId").Child("SubTasks")
    )
    .LabelSettings(ls => ls
        .RightLabel("ResourceName")   // shows resource names to the right of taskbar
        .LeftLabel("TaskName")        // shows task name to the left
    )
    .Render()
```

---

## Resource Customization

### Resource Column in the Grid

Customize the resource column in the grid:

```cshtml
.Columns(col =>
{
    col.Field("TaskName").HeaderText("Task").Width("250").Add();
    col.Field("Resources").HeaderText("Assigned To").Width("150").Add();
})
```

### Resource Name as Task Label

Show assigned resource names as a right-side task label using `LabelSettings.RightLabel`:

```cshtml
.LabelSettings(ls => ls.RightLabel("Resources"))
```

### Custom Cell Template for Resource Column

Add a custom styled template for the Resources column using `Template` with a jsrender script block. Access the resolved resource name via `${ganttProperties.resourceNames}`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").ResourceInfo("Resources").Child("SubTasks")
    )
    .QueryTaskbarInfo("queryTaskbarInfo")
    .Columns(col =>
    {
        col.Field("TaskName").HeaderText("Task Name").Width("270").Add();
        col.Field("Resources").Width("175").Template("#resColumnTemplate").Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
    })
    .Render()

<script type="text/x-jsrender" id="resColumnTemplate">
    ${if(ganttProperties.resourceNames)}
        <div style="display:flex;align-items:center;justify-content:center;
                    width:110px;height:24px;border-radius:24px;background:#DFECFF">
            <span style="color:#006AA6;font-weight:500;">${ganttProperties.resourceNames}</span>
        </div>
    ${/if}
</script>
```

> Use `${ganttProperties.resourceNames}` to access the resolved resource name string (not the raw `ResourceId` value).

### Custom Taskbar Colors per Resource

Use the `QueryTaskbarInfo` event to apply different taskbar and progress bar colors per resource:

```cshtml
@Html.EJS().Gantt("gantt")
    .QueryTaskbarInfo("queryTaskbarInfo")
    /* other config */
    .Render()

<script>
function queryTaskbarInfo(args) {
    if (args.data.Resources === 'Alice Johnson') {
        args.taskbarBgColor     = '#DFECFF';
        args.progressBarBgColor = '#006AA6';
    } else if (args.data.Resources === 'Bob Smith') {
        args.taskbarBgColor     = '#E4E4E7';
        args.progressBarBgColor = '#766B7C';
    }
}
</script>
```

### Resource Grouping

In Resource View, resources sharing the same group value are displayed under a common group header row. Set the `Group` field on each resource object and map it via `.ResourceFields(rf => rf.Group("ResourceGroup"))`:

```csharp
new GanttResource { ResourceId = 1, ResourceName = "Alice", ResourceUnit = 100, ResourceGroup = "Development" },
new GanttResource { ResourceId = 2, ResourceName = "Bob",   ResourceUnit = 100, ResourceGroup = "Development" },
new GanttResource { ResourceId = 3, ResourceName = "Carol", ResourceUnit = 100, ResourceGroup = "Design" },
```

```cshtml
.ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName").Unit("ResourceUnit").Group("ResourceGroup"))
```
