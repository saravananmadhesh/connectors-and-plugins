# Task Dependencies — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Task Relationship Types](#task-relationship-types)
- [Define Task Relationship](#define-task-relationship)
- [Parent Dependencies](#parent-dependencies)
- [Allowed Dependency Types](#allowed-dependency-types)
- [Predecessor Offset with Duration Units](#predecessor-offset-with-duration-units)
- [Predecessor Offset Synchronization on Initial Load](#predecessor-offset-synchronization-on-initial-load)
- [Disable Automatic Dependency Offset Updates](#disable-automatic-dependency-offset-updates)
- [Validate Predecessor Links on Editing](#validate-predecessor-links-on-editing)
  - [Using actionBegin Event](#using-actionbegin-event)
  - [Using Validation Dialog](#using-validation-dialog)
- [Dynamically Show or Hide Dependency Lines](#dynamically-show-or-hide-dependency-lines)

---

## Overview

Task dependencies (predecessor relationships) define scheduling relationships between tasks. Changing one task's dates automatically adjusts its successor tasks, cascading through the project schedule. Relationships can be established between parent–parent, child–child, parent–child, and child–parent tasks.

Dependencies are stored as a string value on each task (e.g., `"2FS"`) and mapped to the Gantt via `dependency` in `<e-gantt-taskfields>`.

---

## Task Relationship Types

Task relationships are categorised into four types based on the start and finish dates of the predecessor and successor tasks:

| Type | Code | Description |
|---|---|---|
| **Finish to Start** | `FS` | Successor cannot start until the predecessor finishes |
| **Start to Start** | `SS` | Successor cannot start until the predecessor starts |
| **Finish to Finish** | `FF` | Successor cannot finish until the predecessor finishes |
| **Start to Finish** | `SF` | Successor cannot finish until the predecessor starts |

**String format:** `{predecessorTaskId}{type}` — for example:

```
"2FS"    → depends on task 2 (Finish to Start)
"3SS"    → depends on task 3 (Start to Start)
"4FF"    → depends on task 4 (Finish to Finish)
"2FS+2"  → depends on task 2 FS with +2 day lag
"2FS-1"  → depends on task 2 FS with -1 day lead
```

---

## Define Task Relationship

Map the dependency string field from the data source using `dependency` in `<e-gantt-taskfields>`. Connector lines are drawn automatically between tasks once this mapping is in place.

**Data model:**
```csharp
public class GanttTask
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public int Progress { get; set; }
    public string Predecessor { get; set; }
    public List<GanttTask> SubTasks { get; set; }
}
```

**Sample data with predecessors:**
```csharp
new GanttTask { TaskId = 2, TaskName = "Identify site location", StartDate = new DateTime(2019, 4, 2), Duration = 4, Progress = 70 },
new GanttTask { TaskId = 3, TaskName = "Perform soil test",      StartDate = new DateTime(2019, 4, 2), Duration = 4, Progress = 50, Predecessor = "2FS" },
new GanttTask { TaskId = 4, TaskName = "Soil test approval",     StartDate = new DateTime(2019, 4, 2), Duration = 4, Progress = 50, Predecessor = "3FS" },
new GanttTask { TaskId = 7, TaskName = "List materials",         StartDate = new DateTime(2019, 4, 4), Duration = 3, Progress = 50, Predecessor = "6SS" },
```

**Tag Helper:**
```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Parent Dependencies

By default, `allowParentDependency` is `true`, meaning parent tasks can act as predecessors or successors. Set it to `false` to disable parent-to-child and child-to-parent relationships:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           allowParentDependency="false" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Allowed Dependency Types

The `allowedDependencyTypes` property restricts which dependency types (FS, SS, FF, SF) are permitted during dependency creation, editing, and data loading. Use this to enforce project-specific scheduling rules and prevent invalid dependency configurations.

### Configuration

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px"
           allowedDependencyTypes="@(new string[] { "FS", "SS" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

### Supported Dependency Types

| Type | Code | Description |
|---|---|---|
| Finish to Start | `"FS"` | Successor cannot start until predecessor finishes |
| Start to Start | `"SS"` | Successor cannot start until predecessor starts |
| Finish to Finish | `"FF"` | Successor cannot finish until predecessor finishes |
| Start to Finish | `"SF"` | Successor cannot finish until predecessor starts |

### Default Behavior

- **If not configured**: All dependency types (`FS`, `SS`, `FF`, `SF`) are allowed.
- **If configured with types**: Only specified types are allowed; others are rejected.
- **If configured as empty array**: Equivalent to not specifying the property; all types are allowed.

### Behavior During Data Loading

When `allowedDependencyTypes` is specified, dependencies in the data source are validated:

```csharp
// Configuration:
allowedDependencyTypes: new string[] { "FS", "SS" }

// Data:
new GanttTask { Predecessor = "2FS" },    // ✓ Allowed (FS in allowed list)
new GanttTask { Predecessor = "3SS" },    // ✓ Allowed (SS in allowed list)
new GanttTask { Predecessor = "4FF" },    // ✗ Rejected (FF not in allowed list)
new GanttTask { Predecessor = "5SF" },    // ✗ Rejected (SF not in allowed list)
```

**Rejected dependencies are silently ignored during data load** — the task is loaded without the dependency link.

### Behavior During UI Dependency Creation

When users create dependencies via taskbar dragging or the dependency dialog:

- Only allowed dependency types are available in the type selector
- Attempting to create a disallowed type is prevented by the component
- Only allowed types appear in dependency editing dialogs

### Behavior During Dialog and Taskbar Editing

When editing task dates in a dialog or dragging a taskbar:

- If an edit would violate a predecessor constraint of an allowed type, the component enforces the constraint
- If an edit would violate a predecessor constraint of a disallowed type, the constraint is ignored (since that type is not permitted)

### Usage Example: FS-Only Project

Restrict all dependencies to Finish-to-Start relationships:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px"
           allowedDependencyTypes="@(new string[] { "FS" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowTaskbarEditing="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

With this configuration:
- Only `"2FS"`, `"3FS"`, etc. are accepted in data
- Dependency dialog shows only "Finish to Start" option
- Taskbar dependency dragging creates only FS links

### Usage Example: Complex Projects

Allow multiple dependency types for flexible scheduling:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px"
           allowedDependencyTypes="@(new string[] { "FS", "SS", "FF" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

With this configuration:
- `FS`, `SS`, and `FF` dependencies are accepted
- `SF` dependencies in data are rejected
- Dependency dialogs show FS, SS, and FF options only

### Mixed Dependency Data with Constraints

Data may contain mixed dependency types. Configure the component to accept only appropriate types:

```csharp
var tasks = new List<GanttTask>
{
    new GanttTask { TaskId = 1, TaskName = "Planning", Predecessor = null },
    new GanttTask { TaskId = 2, TaskName = "Design", Predecessor = "1FS" },      // FS accepted
    new GanttTask { TaskId = 3, TaskName = "QA Planning", Predecessor = "2SS" },  // SS accepted
    new GanttTask { TaskId = 4, TaskName = "Testing", Predecessor = "3FF" },      // FF not allowed → ignored
    new GanttTask { TaskId = 5, TaskName = "Launch", Predecessor = "4FS,3FS" }    // FS accepted, FF ignored
};

// With allowedDependencyTypes: ["FS", "SS"]
// Task 4 loads without the 3FF link
// Task 5 loads with both 4FS and 3FS links
```

### Best Practices

1. **Define Clear Rules**: Document which dependency types your project allows and why.

2. **Configure Early**: Set `allowedDependencyTypes` before binding data to ensure consistent validation.

3. **Validate Data Before Import**: Pre-process data to remove or replace disallowed dependency types before loading into Gantt.

4. **Use for Governance**: Apply restrictions to enforce project scheduling standards and prevent invalid relationships.

5. **Combine with Other Constraints**: Use `allowedDependencyTypes` with task constraints (`ASAP`, `ALAP`, etc.) for comprehensive scheduling control.

6. **Test Editing Scenarios**: Verify that allowed dependency types function correctly during dialog editing, taskbar dragging, and programmatic updates.

---

## Predecessor Offset with Duration Units

A predecessor offset (lag or lead time) can be expressed in `Day`, `Hour`, or `Minute` by appending the unit suffix after the numeric value:

```
"2FS+2days"     → 2-day lag after task 2 finishes
"3FS+4hours"    → 4-hour lag after task 3 finishes
"4FS-30minutes" → 30-minute lead before task 4 finishes
```

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> When no unit suffix is specified, the offset defaults to `Day`.

---

## Predecessor Offset Synchronization on Initial Load

The `autoUpdatePredecessorOffset` property controls whether the Gantt automatically recalculates and synchronises predecessor offset values during initial data load — so the **Predecessor column display** and the **drawn connector lines** match after calendar rules, weekends, holidays, and working times have been applied.

- **`true`**: Offsets are recalculated at load time based on actual rendered positions. The Predecessor column and data are updated to reflect accurate offsets — preventing visual mismatches between the grid and connector lines. Task dates and durations are not affected.
- **`false`**: The Predecessor column shows the original data source offset values exactly, even if calendar adjustments have changed the effective offset. This can cause the grid to show `"5FS+0"` while the connector line reflects a different actual gap.

```cshtml
<ejs-gantt id="GanttDefault" height="420px" dataSource="ViewBag.Data"
           autoUpdatePredecessorOffset="true">
    <e-gantt-taskfields id="TaskID" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress"
                        parentId="ParentID" dependency="Predecessor"
                        baselineStartDate="BaselineStartDate"
                        baselineEndDate="BaselineEndDate">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskID" headerText="Task ID" width="100"></e-gantt-column>
        <e-gantt-column field="Predecessor" headerText="Dependency" width="150"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="150"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date" width="150"></e-gantt-column>
        <e-gantt-column field="Duration" headerText="Duration" width="150"></e-gantt-column>
        <e-gantt-column field="Progress" headerText="Progress" width="150"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

---

## Disable Automatic Dependency Offset Updates

By default, when a task's start or end date is changed via taskbar editing, the predecessor offset values are automatically updated to reflect the new gap. Set `updateOffsetOnTaskbarEdit="false"` on `<ejs-gantt>` to disable this behaviour.

When disabled, offsets can only be updated manually by:
- Editing the **Predecessor column cell** directly in the grid
- Editing the **Offset column** in the Dependency tab of the edit dialog

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" updateOffsetOnTaskbarEdit="false"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll", "Indent", "Outdent" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

---

## Validate Predecessor Links on Editing

When a task's start date, end date, or duration is edited in a way that breaks an existing predecessor relationship, the Gantt handles this in two ways: via the `actionBegin` event or via a validation dialog.

### Using actionBegin Event

When a linked task is edited such that the dependency relationship is violated, the `actionBegin` event fires with `requestType` as `"validateLinkedTask"`. Use `args.validateMode` to control how the conflict is resolved:

| `validateMode` Property | Default | Description |
|---|---|---|
| `args.validateMode.respectLink` | `false` | Predecessor takes priority — editing is reverted; dates validated based on dependency links |
| `args.validateMode.removeLink` | `false` | Edit takes priority — dependency links are removed and the task moves to the edited date |
| `args.validateMode.preserveLinkWithEditing` | `true` | Both the edit and the link are preserved by updating the predecessor offset value |

By default `preserveLinkWithEditing` is enabled, so predecessor offsets update automatically to absorb edits.

The following example enables `respectLink` mode — edits that would violate a dependency are reverted:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px"
           actionBegin="actionBegin">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowTaskbarEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function actionBegin(args) {
        if (args.requestType === "validateLinkedTask") {
            args.validateMode.respectLink = true;
        }
    }
</script>
```

---

### Using Validation Dialog

When all `validateMode` options are set to `false` in `actionBegin`, a **validation popup dialog** is shown to the user, letting them choose how to resolve the conflict interactively.

The dialog options depend on the edit:

- **Successor moved after predecessor's end date** — three options:
  - Cancel, keep the existing link
  - Remove the link and move the task to the edited date
  - Move the task to the edited date and keep the link

- **Successor moved before predecessor's end date** — two options:
  - Cancel, keep the existing link
  - Remove the link and move the task to the edited date

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px"
           actionBegin="actionBegin">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowTaskbarEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function actionBegin(args) {
        if (args.requestType === "validateLinkedTask") {
            args.validateMode.preserveLinkWithEditing = false;  // disables all auto modes → shows dialog
        }
    }
</script>
```

---

## Dynamically Show or Hide Dependency Lines

Dependency connector lines are rendered inside the CSS container `.e-gantt-dependency-view-container`. Toggle their visibility at runtime by setting `style.visibility` on this element:

```cshtml
<div class="switch-container">
    <label for="switch" class="switch">Dependency Line Show/Hide</label>
    <ejs-switch id="switch" checked="false" change="onChange"></ejs-switch>
</div>

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function onChange(args) {
        var container = document.querySelector('.e-gantt-dependency-view-container');
        container.style.visibility = args.checked ? 'hidden' : 'visible';
    }
</script>

<style>
    .switch-container {
        display: flex;
        align-items: center;
        padding: 10px 0;
    }
    .switch {
        margin-left: 10px;
    }
</style>
```

> Setting `visibility: hidden` hides the connector lines while keeping their layout space. The dependency data itself is not affected.
