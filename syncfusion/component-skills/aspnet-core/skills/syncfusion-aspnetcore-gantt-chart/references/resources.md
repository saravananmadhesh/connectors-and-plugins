# Resources — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Resource Collection and Field Mapping](#resource-collection-and-field-mapping)
- [Assigning Resources to Tasks](#assigning-resources-to-tasks)
- [Assign Resources with Unit](#assign-resources-with-unit)
- [Work](#work)
- [Task Type](#task-type)
- [Add and Edit Resources via Dialog](#add-and-edit-resources-via-dialog)
- [Resource View](#resource-view)
- [Resource OverAllocation](#resource-overallocation)
- [Unassigned Tasks](#unassigned-tasks)
- [Taskbar Drag and Drop Between Resources](#taskbar-drag-and-drop-between-resources)
- [Multi-Taskbar in Resource View](#multi-taskbar-in-resource-view)
- [Disable Taskbar Overlap](#disable-taskbar-overlap)
- [Resource Customization](#resource-customization)

---

## Overview

Resources in the Gantt Chart represent people, equipment, or materials assigned to tasks. Resources are defined separately from tasks and linked via a resource ID field on each task record. The component supports a standard **Project View** and a dedicated **Resource View** where tasks appear as children grouped under each resource row.

---

## Resource Collection and Field Mapping

Define a list of resources and pass them to the `resources` attribute on `<ejs-gantt>`. Map the resource object fields using `<e-gantt-resourcefields>`.

**Data models:**
```csharp
public class GanttResource
{
    public int ResourceId { get; set; }
    public string ResourceName { get; set; }
    public double ResourceUnit { get; set; }    // work done per day (e.g. 100 = full day)
    public string ResourceGroup { get; set; }   // optional grouping category
}

public class GanttTask
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public int Progress { get; set; }
    public int Work { get; set; }
    public List<ResourceModel> Resources { get; set; }  // assigned resources with unit
    public List<GanttTask> SubTasks { get; set; }
}

public class ResourceModel
{
    public int ResourceId { get; set; }
    public double? Unit { get; set; }   // per-task override of the resource unit
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.DataSource = GetTaskData();
    ViewBag.Resources = GetResources();
    return View();
}

public static List<GanttResource> GetResources()
{
    return new List<GanttResource>
    {
        new GanttResource { ResourceId = 1, ResourceName = "Martin Tamer",      ResourceUnit = 100 },
        new GanttResource { ResourceId = 2, ResourceName = "Rose Fuller",        ResourceUnit = 100 },
        new GanttResource { ResourceId = 3, ResourceName = "Margaret Buchanan",  ResourceUnit = 100 },
    };
}
```

**Tag Helper:**
```cshtml
<ejs-gantt id="Gantt"
           dataSource="ViewBag.DataSource"
           resources="ViewBag.Resources"
           height="450px">
    <e-gantt-taskfields id="TaskId"
                        name="TaskName"
                        startDate="StartDate"
                        endDate="EndDate"
                        duration="Duration"
                        progress="Progress"
                        resourceInfo="Resources"
                        work="Work"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-resourcefields id="ResourceId"
                            name="ResourceName"
                            unit="ResourceUnit"
                            group="ResourceGroup">
    </e-gantt-resourcefields>
</ejs-gantt>
```

| `<e-gantt-resourcefields>` Attribute | Description |
|---|---|
| `id` | Unique resource identifier — must match the `ResourceId` values in each task's resource list |
| `name` | Resource display name shown in labels, columns, and resource view |
| `unit` | Maps the field holding the resource's work capacity per day |
| `group` | Maps the field holding the resource group category (used in resource view grouping) |

> **Important:** Failure to map `<e-gantt-resourcefields>` when `resources` is set triggers `actionFailure`.

---

## Assigning Resources to Tasks

Resources are assigned via the `resourceInfo` field in `<e-gantt-taskfields>`. When assigning resources **by ID only** (without specifying a per-task unit), pass an array of resource IDs. The resource's unit defaults to **100%** and is not displayed separately in the UI:

```csharp
new GanttTask
{
    TaskId = 2, TaskName = "Design Phase",
    StartDate = new DateTime(2024, 4, 2),
    Duration = 5, Progress = 50,
    Resources = new List<ResourceModel> { new ResourceModel { ResourceId = 1 } }
}
```

**Tag Helper — assign resources (label shown on right):**
```cshtml
<ejs-gantt id="GanttTasks"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.Resources"
           height="450px">
    <e-gantt-taskfields id="TaskID" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress"
                        resourceInfo="Resources" parentID="ParentId">
    </e-gantt-taskfields>
    <e-gantt-labelSettings rightLabel="Resources"></e-gantt-labelSettings>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName" unit="Unit">
    </e-gantt-resourcefields>
</ejs-gantt>
```

---

## Assign Resources with Unit

To assign a resource at a **specific work unit** (e.g., 50% capacity), pass `ResourceModel` objects with both `ResourceId` and `Unit` in the task's resource list. The unit value is shown in the Resources column and in the resource tab of the edit dialog:

```csharp
new GanttTask
{
    TaskId = 3, TaskName = "Development",
    StartDate = new DateTime(2024, 4, 5),
    Duration = 8, Progress = 20,
    Resources = new List<ResourceModel>
    {
        new ResourceModel { ResourceId = 1, Unit = 100 },
        new ResourceModel { ResourceId = 2, Unit = 50 }   // Bob assigned at 50% capacity
    }
}
```

**Tag Helper — display resource units in a dedicated column:**
```cshtml
<ejs-gantt id="Resources"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           treeColumnIndex="1" height="450px"
           allowSelection="true" highlightWeekends="true"
           projectStartDate="03/25/2019" projectEndDate="07/28/2019"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-resourcefields id="ResourceId" name="ResourceName" unit="Unit">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        resourceInfo="Resources" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-labelSettings rightLabel="Resources"></e-gantt-labelSettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="100" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name"></e-gantt-column>
        <e-gantt-column field="Resources" headerText="Resources"></e-gantt-column>
        <e-gantt-column field="Duration" width="100"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

---

## Work

**Work** is the total hours required to complete a task. Map the work field from the data source using `work` in `<e-gantt-taskfields>`, and set the unit of measurement using the `workUnit` property on `<ejs-gantt>`.

- Supported `workUnit` values: `Hour` (default), `Day`, `Minute`.
- When the `work` field is mapped, the default task type becomes `FixedWork`.

```cshtml
<ejs-gantt id="Resources"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           treeColumnIndex="1" height="450px"
           allowSelection="true" highlightWeekends="true"
           workUnit="Hour"
           projectStartDate="03/28/2019" projectEndDate="07/28/2019"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-resourcefields id="ResourceId" name="ResourceName" unit="ResourceUnit">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress"
                        resourceInfo="Resources" work="Work" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="180"></e-gantt-column>
        <e-gantt-column field="Resources" headerText="Resources" width="160"></e-gantt-column>
        <e-gantt-column field="Work" width="110"></e-gantt-column>
        <e-gantt-column field="Duration" width="100"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

---

## Task Type

The `work`, `duration`, and `resource unit` fields are interdependent — editing one automatically recalculates the others. Use the `taskType` property on `<ejs-gantt>` to fix one of these fields as a constant, preventing it from being recalculated.

| `taskType` Value | Fixed Field | What Updates on Edit |
|---|---|---|
| `FixedUnit` (default) | Resource unit stays constant | Duration changes → Work updates. Work changes → Duration updates |
| `FixedDuration` | Duration stays constant | Resource unit changes → Work updates. Work changes → Resource unit updates |
| `FixedWork` | Work stays constant | Duration changes → Resource unit updates. Resource unit changes → Duration updates |

> For manually scheduled tasks, `FixedWork` and `FixedUnit` behave differently — the work field (rather than duration) may update instead. These calculations do not apply to milestones.

```cshtml
<ejs-gantt id="Resources"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           treeColumnIndex="1" height="450px"
           allowSelection="true" highlightWeekends="true"
           workUnit="Hour"
           taskType="FixedWork"
           projectStartDate="03/28/2019" projectEndDate="07/28/2019"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-resourcefields id="ResourceId" name="ResourceName" unit="ResourceUnit">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress"
                        resourceInfo="Resources" work="Work" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="180"></e-gantt-column>
        <e-gantt-column field="Resources" headerText="Resources" width="160"></e-gantt-column>
        <e-gantt-column field="Work" width="110"></e-gantt-column>
        <e-gantt-column field="Duration" width="100"></e-gantt-column>
        <e-gantt-column field="taskType" headerText="Task Type" width="110"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

---

## Add and Edit Resources via Dialog

When editing is enabled, users can assign and edit resources through the **Resources tab** in the edit dialog. To expose the Resources tab:

1. Set `allowEditing="true"` (and optionally `allowAdding="true"`) on `<e-gantt-editsettings>`.
2. Add `<e-gantt-editdialogfield type="Resources">` inside `<e-gantt-editdialogfields>`.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           resourceIDMapping="ResourceId"
           resourceNameMapping="ResourceName"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks" resourceInfo="ResourceId">
    </e-gantt-taskfields>
    <e-gantt-labelSettings rightLabel="${if(ResourceId)}${ResourceId}${/if}">
    </e-gantt-labelSettings>
    <e-gantt-editsettings allowEditing="true" mode="Auto"></e-gantt-editsettings>
    <e-gantt-editdialogfields>
        <e-gantt-editdialogfield type="General"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Dependency"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Resources"></e-gantt-editdialogfield>
    </e-gantt-editdialogfields>
</ejs-gantt>
```

> In the Resources tab of the edit dialog, **double-click** the unit cell next to a resource to change its work unit for that task.

---

## Resource View

Set `viewType="ResourceView"` on `<ejs-gantt>` to display tasks as child rows grouped under their assigned resource parent rows. Each resource appears as a parent node; tasks assigned to that resource are its children.

```cshtml
<ejs-gantt id="ResourceView"
           dataSource="ViewBag.DataSource"
           resources="ViewBag.Resources"
           viewType="ResourceView"
           allowResizing="true" allowSelection="true" highlightWeekends="true"
           treeColumnIndex="1" height="450px"
           projectStartDate="03/28/2019" projectEndDate="05/18/2019"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Work" headerText="Work"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="ResourceGroup" headerText="Group"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelSettings rightLabel="Resources"></e-gantt-labelSettings>
    <e-gantt-splitterSettings columnIndex="3"></e-gantt-splitterSettings>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"
                            unit="ResourceUnit" group="ResourceGroup">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        resourceInfo="Resources" work="Work" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

| `viewType` Value | Description |
|---|---|
| `ProjectView` (default) | Standard project timeline — all tasks at their hierarchy level |
| `ResourceView` | Tasks grouped as children under their assigned resource parent rows |

**Behaviour notes:**
- A task assigned to multiple resources appears as a child under **each** resource row.
- Unscheduled tasks are **not supported** in Resource View.
- Tasks can be moved to a different resource by editing the resource field via cell editing or the dialog.

---

## Resource OverAllocation

When `viewType="ResourceView"` is active, set `showOverAllocation="true"` to visually highlight dates where a resource is allocated beyond their available capacity. Overallocated date ranges are marked with **square brackets** on the resource row.

- Overallocation is calculated from the resource's `unit` value and the `dayWorkingTime` configuration.
- Default value is `false`.
- Can be toggled programmatically at runtime by setting `ganttObj.showOverAllocation`.

```cshtml
<ejs-gantt id="ShowHideOverAllocation"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           viewType="ResourceView" allowResizing="true" allowSelection="true"
           highlightWeekends="true" treeColumnIndex="1" height="450px"
           showOverAllocation="true"
           projectStartDate="03/28/2019" projectEndDate="05/18/2019"
           toolbar="toolbarItems" toolbarClick="toolbarClick">
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Work" headerText="Work"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="ResourceGroup" headerText="Group"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelSettings rightLabel="Resources" taskLabel="Progress">
    </e-gantt-labelSettings>
    <e-gantt-splitterSettings columnIndex="3"></e-gantt-splitterSettings>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"
                            unit="ResourceUnit" group="ResourceGroup">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks"
                        work="Work" resourceInfo="Resources">
    </e-gantt-taskfields>
    <e-gantt-editdialogfields>
        <e-gantt-editdialogfield type="General"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Dependency"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Resources"></e-gantt-editdialogfield>
    </e-gantt-editdialogfields>
</ejs-gantt>
```

**Toggle show/hide overallocation from a custom toolbar button:**
```javascript
function toolbarClick(args) {
    if (args.item.id === 'showhidebar') {
        var ganttObj = document.getElementById("ShowHideOverAllocation").ej2_instances[0];
        ganttObj.showOverAllocation = ganttObj.showOverAllocation ? false : true;
    }
}
```

**Toolbar with custom button (Razor):**
```cshtml
@{
    List<object> toolbarItems = new List<object>();
    toolbarItems.Add("Add");
    toolbarItems.Add("Edit");
    toolbarItems.Add("Update");
    toolbarItems.Add("Delete");
    toolbarItems.Add("Cancel");
    toolbarItems.Add("ExpandAll");
    toolbarItems.Add("CollapseAll");
    toolbarItems.Add(new {
        text = "Show/Hide Overallocation",
        tooltipText = "Show/Hide Overallocation",
        id = "showhidebar"
    });
}
```

---

## Unassigned Tasks

Tasks that have no resource assigned are automatically grouped under an **"Unassigned Task"** parent row at the bottom of the resource view. This grouping is evaluated at load time.

- If a resource is later assigned to an unassigned task (via editing), the task automatically moves from the "Unassigned Task" group to the appropriate resource's children.
- This behaviour is automatic; no additional configuration is required.

---

## Taskbar Drag and Drop Between Resources

Set `allowTaskbarDragAndDrop="true"` to allow users to drag a task's taskbar **vertically** from one resource row to another in Resource View. The default value is `false`.

```cshtml
<ejs-gantt id="ResourceMultiTaskbar"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           viewType="ResourceView"
           allowResizing="true" allowSelection="true" highlightWeekends="true"
           treeColumnIndex="1" height="450px"
           enableMultiTaskbar="true"
           allowTaskbarDragAndDrop="true"
           projectStartDate="03/28/2019" projectEndDate="05/18/2019"
           toolbar="@(new List<string>() { "ExpandAll", "CollapseAll" })">
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Work" headerText="Work"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="ResourceGroup" headerText="Group"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelSettings taskLabel="TaskName"></e-gantt-labelSettings>
    <e-gantt-splitterSettings columnIndex="2"></e-gantt-splitterSettings>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"
                            unit="ResourceUnit" group="ResourceGroup">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks"
                        work="Work" expandState="isExpand" resourceInfo="Resources">
    </e-gantt-taskfields>
</ejs-gantt>
```

> `allowTaskbarDragAndDrop` requires `viewType="ResourceView"`. Dragging a taskbar to a different resource row reassigns the task to that resource.

---

## Multi-Taskbar in Resource View

Set `enableMultiTaskbar="true"` to visualise all tasks assigned to a resource within **a single resource row** when the row is collapsed. Multiple task bars are stacked or overlapped within the row. Taskbar editing (resize, drag) is still supported in the collapsed state.

- `enableMultiTaskbar` is set directly on `<ejs-gantt>` — there is no `<e-gantt-taskbar>` child tag.
- Collapse/expand for resource rows in multi-taskbar mode is controlled only by the **tree grid arrow icon** (chart-side action is disabled).
- When multiple tasks for the same resource share overlapping dates, their taskbars overlap within the row.

```cshtml
<ejs-gantt id="ResourceMultiTaskbar"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           viewType="ResourceView"
           allowResizing="true" allowSelection="true" highlightWeekends="true"
           treeColumnIndex="1" height="450px"
           enableMultiTaskbar="true"
           collapseAllParentTasks="true"
           projectStartDate="03/28/2019" projectEndDate="05/18/2019"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Work" headerText="Work"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="ResourceGroup" headerText="Group"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelSettings taskLabel="TaskName"></e-gantt-labelSettings>
    <e-gantt-splitterSettings columnIndex="2"></e-gantt-splitterSettings>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"
                            unit="ResourceUnit" group="ResourceGroup">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks"
                        work="Work" expandState="isExpand" resourceInfo="Resources">
    </e-gantt-taskfields>
</ejs-gantt>
```

| Property | Description |
|---|---|
| `enableMultiTaskbar` | Shows all resource tasks stacked in the collapsed resource row |
| `collapseAllParentTasks` | Collapses all resource parent rows on initial load |
| `allowTaskbarDragAndDrop` | Enables vertical drag of taskbars between resource rows |

---

## Disable Taskbar Overlap

Set `allowTaskbarOverlap="false"` to prevent taskbars for different tasks from overlapping within a resource row. Each task is rendered on its own sub-row, and the row height expands to accommodate all tasks when the resource row is collapsed.

- This gives a clearer view of task distribution per resource.
- When `allowTaskbarOverlap` is `false`, **task dependencies cannot be established** between tasks rendered on multiple lines for the same resource.

```cshtml
<ejs-gantt id="ResourceMultiTaskbar"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           viewType="ResourceView"
           allowResizing="true" allowSelection="true" highlightWeekends="true"
           treeColumnIndex="1" height="450px"
           enableMultiTaskbar="true"
           allowTaskbarOverlap="false"
           projectStartDate="03/28/2019" projectEndDate="05/18/2019"
           toolbar="@(new List<string>() { "ExpandAll", "CollapseAll" })">
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Work" headerText="Work"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="ResourceGroup" headerText="Group"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelSettings taskLabel="TaskName"></e-gantt-labelSettings>
    <e-gantt-splitterSettings columnIndex="2"></e-gantt-splitterSettings>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"
                            unit="ResourceUnit" group="ResourceGroup">
    </e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks"
                        work="Work" expandState="isExpand" resourceInfo="Resources">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Resource Customization

### Resource Name as Task Label

Show the assigned resource names as a right-side task label using the `rightLabel` attribute on `<e-gantt-labelSettings>`. Use the name of the `resourceInfo` field (e.g., `"Resources"`):

```cshtml
<e-gantt-labelSettings rightLabel="Resources"></e-gantt-labelSettings>
```

---

### Resource Column with Custom Cell Template

Add a dedicated **Resources column** to the TreeGrid with a styled cell template. Use `template="#scriptId"` on `<e-gantt-column>` and reference a `type="text/x-template"` script block. Access the resolved resource name string via `${ganttProperties.resourceNames}`:

```cshtml
<ejs-gantt id="resAllocation"
           dataSource="ViewBag.dataSource"
           resources="ViewBag.projectResources"
           highlightWeekends="true" height="450px"
           queryTaskbarInfo="queryTaskbarInfo">
    <e-gantt-columns>
        <e-gantt-column field="TaskName" headerText="Task Name" width="270"></e-gantt-column>
        <e-gantt-column field="Resources" width="175" template="#resColumnTemplate"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelSettings rightLabel="Resources"></e-gantt-labelSettings>
    <e-gantt-splitterSettings columnIndex="2"></e-gantt-splitterSettings>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"></e-gantt-resourcefields>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks" resourceInfo="Resources">
    </e-gantt-taskfields>
</ejs-gantt>

<script type="text/x-template" id="resColumnTemplate">
    ${if(ganttProperties.resourceNames)}
        ${if(ganttProperties.resourceNames === 'Martin Tamer')}
            <div style="display:flex;align-items:center;justify-content:center;
                        gap:10px;width:110px;height:24px;border-radius:24px;background:#DFECFF">
                <span style="color:#006AA6;font-weight:500;">${ganttProperties.resourceNames}</span>
            </div>
        ${/if}
        ${if(ganttProperties.resourceNames === 'Rose Fuller')}
            <div style="display:flex;align-items:center;justify-content:center;
                        gap:10px;width:110px;height:24px;border-radius:24px;background:#E4E4E7">
                <span style="color:#766B7C;font-weight:500;">${ganttProperties.resourceNames}</span>
            </div>
        ${/if}
    ${/if}
</script>
```

> - Resource column templates use `type="text/x-template"` script blocks referenced via `template="#resColumnTemplate"` on `<e-gantt-column>`. There is no `<e-gantt-column-template>` child tag.
> - Use `${ganttProperties.resourceNames}` to access the resolved resource name string (not `${ResourceId}`).

---

### Custom Taskbar Colors per Resource

Use the `queryTaskbarInfo` event to apply different taskbar and progress bar colors per resource:

```javascript
function queryTaskbarInfo(args) {
    if (args.data.Resources === 'Martin Tamer') {
        args.taskbarBgColor     = '#DFECFF';
        args.progressBarBgColor = '#006AA6';
    } else if (args.data.Resources === 'Rose Fuller') {
        args.taskbarBgColor     = '#E4E4E7';
        args.progressBarBgColor = '#766B7C';
    } else if (args.data.Resources === 'Margaret Buchanan') {
        args.taskbarBgColor     = '#DFFFE2';
        args.progressBarBgColor = '#00A653';
    } else if (args.data.Resources === 'Tamer Vinet') {
        args.taskbarBgColor     = '#FFEBE9';
        args.progressBarBgColor = '#FF3740';
    }
}
```

Register the event on `<ejs-gantt>`:
```cshtml
<ejs-gantt id="resAllocation" ... queryTaskbarInfo="queryTaskbarInfo">
```

---

### Resource Grouping

In Resource View, set the `group` field on each resource object and map it via `group="ResourceGroup"` on `<e-gantt-resourcefields>`. Resources sharing the same group value are displayed under a common group header row:

```csharp
new GanttResource { ResourceId = 1, ResourceName = "Alice", ResourceUnit = 100, ResourceGroup = "Development" },
new GanttResource { ResourceId = 2, ResourceName = "Bob",   ResourceUnit = 100, ResourceGroup = "Development" },
new GanttResource { ResourceId = 3, ResourceName = "Carol", ResourceUnit = 100, ResourceGroup = "Design" },
```

```cshtml
<e-gantt-resourcefields id="ResourceId" name="ResourceName"
                        unit="ResourceUnit" group="ResourceGroup">
</e-gantt-resourcefields>
```
