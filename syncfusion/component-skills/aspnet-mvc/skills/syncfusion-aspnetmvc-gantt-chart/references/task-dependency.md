# Task Dependencies – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Relationship Types](#relationship-types)
- [Allowed Dependency Types](#allowed-dependency-types)
- [Define Dependencies in Data Source](#define-dependencies-in-data-source)
- [Dependency String Format](#dependency-string-format)
- [Predecessor Offset](#predecessor-offset)
- [Predecessor Offset Synchronization on Initial Load](#predecessor-offset-synchronization-on-initial-load)
- [Disable Automatic Dependency Offset Updates](#disable-automatic-dependency-offset-updates)
- [Editing Dependencies via Mouse](#editing-dependencies-via-mouse)
- [Validate Predecessor Links on Editing](#validate-predecessor-links-on-editing)
- [Critical Path](#critical-path)
- [Parent Task Dependencies](#parent-task-dependencies)
- [Disable Dependency for Specific Tasks](#disable-dependency-for-specific-tasks)
- [Dynamically Show or Hide Dependency Lines](#dynamically-show-or-hide-dependency-lines)

---

## Overview

Task dependencies (predecessors) define the relationship between tasks and affect project scheduling. When a predecessor task changes, successor tasks are automatically rescheduled.

Map the dependency field in `TaskFields.Dependency`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor")   // maps the dependency data field
        .Child("SubTasks")
    )
    .Render()
```

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int? Duration { get; set; }
    public string Predecessor { get; set; }  // e.g., "2FS", "3SS+1", "4FF-2"
    public List<GanttData> SubTasks { get; set; }
}
```

---

## Relationship Types

| Type | Name | Meaning |
|---|---|---|
| `FS` | Finish to Start | Task B cannot start until Task A finishes (most common) |
| `SS` | Start to Start | Task B cannot start until Task A starts |
| `FF` | Finish to Finish | Task B cannot finish until Task A finishes |
| `SF` | Start to Finish | Task B cannot finish until Task A starts (rare) |

---

## Allowed Dependency Types

The `AllowedDependencyTypes` property restricts which dependency types are processed during data loading and accepted during dependency creation and editing. The supported values are `FS`, `SS`, `FF`, and `SF`. If the property is omitted or set to an empty collection, all supported types are allowed.

| API | Type | Default | Purpose |
|---|---|---|---|
| `AllowedDependencyTypes` | `string[]` | Unspecified (all supported types allowed) | Restricts dependency relationship types accepted by the Gantt |

In ASP.NET MVC, configure this with `.AllowedDependencyTypes(new string[] { "FS", "SS" })`. An empty array has the same behavior as omitting the property.

### Overview

`AllowedDependencyTypes` accepts a list of allowed dependency type strings. Dependency types not in this list are:

- **Ignored during initial parsing**: Predecessor relationships with disallowed types are not maintained as active dependencies. This filtering does not imply that the original application data object is rewritten.
- **Rejected during dependency creation**: Users cannot draw or create dependency lines with disallowed types.
- **Rejected during dependency editing**: Existing dependencies cannot be changed to disallowed types.
- **Rejected in dialog editing**: The Dependency tab of the edit/add dialog prevents selection of disallowed types.

### Restrict Dependency Types

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .AllowedDependencyTypes(new string[] { "FS", "SS" })  // Only Finish-to-Start and Start-to-Start
    .EditSettings(es => es.AllowTaskbarEditing(true).AllowEditing(true))
    .Render()
```

**Supported values:**
- `"FS"` — Finish-to-Start
- `"SS"` — Start-to-Start
- `"FF"` — Finish-to-Finish
- `"SF"` — Start-to-Finish

### Data Loading with Restricted Types

When `AllowedDependencyTypes` is configured, Gantt validates the relationship type in each predecessor string during initial data parsing. Allowed relationships remain active; disallowed relationships are ignored. For multiple predecessor relationships, permitted relationships can remain while disallowed ones are excluded.

```csharp
// Data source
new GanttData { TaskId = 1, TaskName = "Task 1", StartDate = new DateTime(2024, 4, 1), Duration = 2 },
new GanttData { TaskId = 2, TaskName = "Task 2", StartDate = new DateTime(2024, 4, 3), Duration = 3, Predecessor = "1FS" },      // Allowed ✓
new GanttData { TaskId = 3, TaskName = "Task 3", StartDate = new DateTime(2024, 4, 6), Duration = 2, Predecessor = "1SS" },      // Allowed ✓
new GanttData { TaskId = 4, TaskName = "Task 4", StartDate = new DateTime(2024, 4, 8), Duration = 2, Predecessor = "1FF" },      // Rejected ✗
new GanttData { TaskId = 5, TaskName = "Task 5", StartDate = new DateTime(2024, 4, 10), Duration = 2, Predecessor = "1SF" },     // Rejected ✗
```

With `AllowedDependencyTypes = ["FS", "SS"]`:
- Task 2's predecessor `1FS` is loaded and processed normally.
- Task 3's predecessor `1SS` is loaded and processed normally.
- Task 4's predecessor `1FF` is ignored as an active relationship.
- Task 5's predecessor `1SF` is ignored as an active relationship.

### Dependency Editing via Taskbar Drag

When users drag connector points to create dependencies, only allowed types can be created:

```cshtml
@Html.EJS().Gantt("gantt")
    .AllowedDependencyTypes(new List<string> { "FS" })  // Only Finish-to-Start
    .EditSettings(es => es.AllowTaskbarEditing(true))
    .Render()
```

With only `FS` allowed:
- Dragging from the end of Task A to the start of Task B creates a FS dependency.
- Dragging from the start of Task A to the start of Task B is **blocked** (SS not allowed).
- Dragging from the end of Task A to the end of Task B is **blocked** (FF not allowed).
- Dragging from the start of Task A to the end of Task B is **blocked** (SF not allowed).

### Dependency Editing in Dialog

Dependency dialog editing follows the configured list: users cannot commit a relationship type that is excluded by `AllowedDependencyTypes`.

```cshtml
@Html.EJS().Gantt("gantt")
    .AllowedDependencyTypes(new List<string> { "FS", "SS", "FF" })  // SF not allowed
    .EditSettings(es => es.AllowEditing(true))
    .Render()
```

For a configuration that permits `FS`, `SS`, and `FF`, those are the relationship types accepted in the Dependency tab:
- Finish-to-Start
- Start-to-Start
- Finish-to-Finish

### Default Behavior (No Restriction)

If `AllowedDependencyTypes` is **not set** or is an **empty collection**, all four types are allowed:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    // Omitted AllowedDependencyTypes: FS, SS, FF, and SF are allowed.
    .Render()
```

### Common Restriction Scenarios

#### Scenario 1: Allow Only Finish-to-Start

Most projects use FS relationships to enforce sequential task ordering:

```cshtml
.AllowedDependencyTypes(new List<string> { "FS" })
```

#### Scenario 2: Allow FS and SS (Common Types)

Support both sequential and parallel task execution:

```cshtml
.AllowedDependencyTypes(new List<string> { "FS", "SS" })
```

#### Scenario 3: Enforce Specific Workflows

Some project methodologies (e.g., Critical Chain) prefer SS and FF relationships:

```cshtml
.AllowedDependencyTypes(new List<string> { "SS", "FF" })
```

### Dependency Validation and Editing Paths

The restriction applies consistently to predecessor parsing and dependency changes made through the UI. It affects connector-line creation by taskbar interaction, dependency dialog edits, and changes that occur while editing or validating linked tasks. Programmatic predecessor changes should also use only the configured types; test the specific public method used by the application when handling invalid input. If existing data contains both permitted and disallowed links, only permitted relationships participate in scheduling and dependency maintenance.

### Best Practices

1. **Document Restrictions**: Clearly communicate which dependency types are allowed to your team.

2. **Validate Data on Import**: When importing tasks from external sources, verify that all predecessors use only allowed types.

3. **Provide Feedback**: Explain the configured restrictions to users and validate imported predecessor values before binding.

4. **Test Initial Data**: After loading a Gantt with restricted types, inspect the active dependency relationships to confirm disallowed types were ignored.

5. **Avoid Restrictive Defaults**: Unless your project methodology requires it, allow all four types to provide maximum flexibility.

---

## Define Dependencies in Data Source

```csharp
public static List<GanttData> GetData()
{
    return new List<GanttData>
    {
        new GanttData { TaskId = 1, TaskName = "Project Kickoff",     StartDate = new DateTime(2024, 4, 2), Duration = 2, Predecessor = null },
        new GanttData { TaskId = 2, TaskName = "Requirements",         StartDate = new DateTime(2024, 4, 4), Duration = 3, Predecessor = "1FS" },
        new GanttData { TaskId = 3, TaskName = "Design",               StartDate = new DateTime(2024, 4, 7), Duration = 4, Predecessor = "2FS" },
        new GanttData { TaskId = 4, TaskName = "Development",          StartDate = new DateTime(2024, 4, 7), Duration = 5, Predecessor = "3SS" },   // starts when Design starts
        new GanttData { TaskId = 5, TaskName = "Testing",              StartDate = new DateTime(2024, 4, 12), Duration = 3, Predecessor = "4FS" },
        new GanttData { TaskId = 6, TaskName = "Documentation",        StartDate = new DateTime(2024, 4, 12), Duration = 3, Predecessor = "4FF" },  // ends when Dev ends
        new GanttData { TaskId = 7, TaskName = "Deployment",           StartDate = new DateTime(2024, 4, 15), Duration = 1, Predecessor = "5FS,6FS" }  // multiple predecessors
    };
}
```

---

## Dependency String Format

The `Predecessor` field uses comma-separated strings:

```
"{TaskId}{Type}{+/-}{Offset}{Unit}"
```

Examples:

| String | Meaning |
|---|---|
| `"2FS"` | Task 2, Finish-to-Start, no offset |
| `"3SS"` | Task 3, Start-to-Start, no offset |
| `"2FS+1"` | Task 2 FS + 1 day lag |
| `"2FS-1"` | Task 2 FS - 1 day lead |
| `"2FS+4hours"` | Task 2 FS + 4 hour lag |
| `"2FS+30minutes"` | Task 2 FS + 30 minute lag |
| `"2FS,3SS"` | Two predecessors: 2FS and 3SS |

---

## Predecessor Offset

Add a lag (+) or lead (-) time after the dependency:

```csharp
// 2 day lag after Task 2 finishes before Task 3 can start
new GanttData { TaskId = 3, TaskName = "Design", Predecessor = "2FS+2" }

// 1 day lead: Task 5 starts 1 day before Task 4 finishes
new GanttData { TaskId = 5, TaskName = "Review", Predecessor = "4FS-1" }

// Hour-based offset
new GanttData { TaskId = 6, TaskName = "Deploy", Predecessor = "5FS+4hours" }
```

---

## Predecessor Offset Synchronization on Initial Load

The `AutoUpdatePredecessorOffset` property controls whether the Gantt automatically recalculates and synchronises predecessor offset values during initial data load.

- **`true`**: Offsets are recalculated at load time based on actual rendered positions after calendar rules, weekends, holidays, and working times are applied. The Predecessor column and data are updated to prevent visual mismatches between the grid and connector lines. Task dates and durations are not affected.
- **`false`**: The Predecessor column shows the original data source offset values exactly, even if calendar adjustments have changed the effective offset.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .AutoUpdatePredecessorOffset(true)
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task ID").Width("100").Add();
        col.Field("Predecessor").HeaderText("Dependency").Width("150").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("150").Add();
        col.Field("StartDate").HeaderText("Start Date").Width("150").Add();
        col.Field("Duration").HeaderText("Duration").Width("150").Add();
        col.Field("Progress").HeaderText("Progress").Width("150").Add();
    })
    .Render()
```

---

## Disable Automatic Dependency Offset Updates

By default, when a task's start or end date is changed via taskbar editing, the predecessor offset values are automatically updated. Set `UpdateOffsetOnTaskbarEdit(false)` to disable this behaviour.

When disabled, offsets can only be updated manually by:
- Editing the **Predecessor column cell** directly in the grid
- Editing the **Offset column** in the Dependency tab of the edit dialog

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .UpdateOffsetOnTaskbarEdit(false)
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Toolbar(new List<string> { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll", "Indent", "Outdent" })
    .Render()
```

---

## Editing Dependencies via Mouse

Allow users to draw dependency lines by dragging from task connector points:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .EditSettings(es => es.AllowTaskbarEditing(true))  // required for connector drag
    .Render()
```

Hover over a taskbar to reveal connector points (circles at start and end). Drag from one to another task to create a dependency. The type is determined by which points you connect (start/end of source → start/end of target).

---

## Validate Predecessor Links on Editing

When a linked task is edited such that the dependency relationship is violated, the `ActionBegin` event fires with `requestType` as `"validateLinkedTask"`. Use `args.validateMode` to control conflict resolution:

| `validateMode` Property | Default | Description |
|---|---|---|
| `args.validateMode.respectLink` | `false` | Predecessor takes priority — editing is reverted; dates validated based on dependency links |
| `args.validateMode.removeLink` | `false` | Edit takes priority — dependency links are removed and the task moves to the edited date |
| `args.validateMode.preserveLinkWithEditing` | `true` | Both the edit and the link are preserved by updating the predecessor offset value |

By default `preserveLinkWithEditing` is enabled, so predecessor offsets update automatically to absorb edits.

**Using `actionBegin` to enforce `respectLink` mode:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .EditSettings(es => es.AllowTaskbarEditing(true))
    .ActionBegin("actionBegin")
    .Render()

<script>
function actionBegin(args) {
    if (args.requestType === 'validateLinkedTask') {
        args.validateMode.respectLink = true;
    }
}
</script>
```

**Using a validation dialog (set all validateMode flags to `false`):**

When all `validateMode` options are `false`, a validation popup dialog is shown to the user, letting them choose how to resolve the conflict interactively.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .EditSettings(es => es.AllowTaskbarEditing(true))
    .ActionBegin("actionBegin")
    .Render()

<script>
function actionBegin(args) {
    if (args.requestType === 'validateLinkedTask') {
        args.validateMode.preserveLinkWithEditing = false;  // disables all auto modes → shows dialog
    }
}
</script>
```

---

## Critical Path

The critical path highlights the chain of tasks that directly determines the project's finish date. Any delay on the critical path delays the whole project:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .EnableCriticalPath(true)
    .Render()
```

Critical path tasks and their dependency lines are highlighted in red by default. Customize via CSS:

```css
.e-gantt .e-critical-path-bar {
    background-color: #d32f2f;
}
.e-gantt .e-critical-connector-line {
    border-color: #d32f2f;
}
```

---

## Parent Task Dependencies

By default, parent-to-parent, parent-to-child, and child-to-parent dependencies are all allowed. Disable parent dependency:

```cshtml
@Html.EJS().Gantt("gantt")
    .AllowParentDependency(false)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    .Render()
```

---

## Disable Dependency for Specific Tasks

Handle `TaskbarEditing` event to prevent dependency creation on specific tasks:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskbarEditing("onTaskbarEditing")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    .EditSettings(es => es.AllowTaskbarEditing(true))
    .Render()

<script>
function onTaskbarEditing(args) {
    // Prevent connector drag on task with ID 1
    if (args.data.TaskId === 1 && args.taskBarEditAction === 'ConnectorPointRightDrag') {
        args.cancel = true;
    }
}
</script>
```

---

## Dynamically Show or Hide Dependency Lines

Dependency connector lines are rendered inside the CSS container `.e-gantt-dependency-view-container`. Toggle their visibility at runtime by setting `style.visibility` on this element:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .Render()

<label>Dependency Line Show/Hide</label>
<input id="depToggle" type="checkbox" onchange="onToggleChange(this)" />

<script>
function onToggleChange(checkbox) {
    var container = document.querySelector('.e-gantt-dependency-view-container');
    container.style.visibility = checkbox.checked ? 'hidden' : 'visible';
}
</script>
```

> Setting `visibility: hidden` hides the connector lines while keeping their layout space. The dependency data itself is not affected.
