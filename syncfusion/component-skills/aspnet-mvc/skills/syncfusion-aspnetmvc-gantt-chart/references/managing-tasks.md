# Managing Tasks (Editing) – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Prerequisites — isPrimaryKey](#prerequisites--isprimarykey)
- [Troubleshoot: Editing Works Only When Primary Key Column Is Defined](#troubleshoot-editing-works-only-when-primary-key-column-is-defined)
- [EditSettings Overview](#editsettings-overview)
- [Cell Editing](#cell-editing)
  - [Disable Editing for a Column](#disable-editing-for-a-column)
  - [Cell Edit Types and Params](#cell-edit-types-and-params)
  - [Cell Edit Template](#cell-edit-template)
- [Dialog Editing](#dialog-editing)
  - [Customize Dialog Tabs](#customize-dialog-tabs)
  - [Limit Fields in General Tab](#limit-fields-in-general-tab)
  - [Customize Dependency, Segments and Resources Tab](#customize-dependency-segments-and-resources-tab)
  - [Customize Notes Tab](#customize-notes-tab)
  - [Set Default Values on Add Dialog](#set-default-values-on-add-dialog)
- [Taskbar Editing](#taskbar-editing)
  - [Prevent Taskbar Editing for Specific Tasks](#prevent-taskbar-editing-for-specific-tasks)
- [Task Dependencies](#task-dependencies)
- [Adding Tasks](#adding-tasks)
  - [Programmatic Add — addRecord](#programmatic-add--addrecord)
- [Deleting Tasks](#deleting-tasks)
  - [Delete Confirmation Dialog](#delete-confirmation-dialog)
- [Programmatic Update — updateRecordByID](#programmatic-update--updaterecordbyid)
- [Toolbar CRUD](#toolbar-crud)
- [Row Drag and Drop](#row-drag-and-drop)
- [Indent and Outdent](#indent-and-outdent)
- [Splitting and Merging Tasks](#splitting-and-merging-tasks)
- [Read-Only Gantt](#read-only-gantt)
- [Undo and Redo](#undo-and-redo)
- [Server-Side CRUD Persistence](#server-side-crud-persistence)
- [Validation](#validation)
  - [Column Validation](#column-validation)
  - [Custom Validation](#custom-validation)
  - [Dependency and Resource Grid Validation](#dependency-and-resource-grid-validation)
- [Touch Interaction](#touch-interaction)
  - [Task Dependency Editing (Touch)](#task-dependency-editing-touch)
- [Taskbar Editing Tooltip](#taskbar-editing-tooltip)
- [ActionComplete Event](#actioncomplete-event)

---

## Prerequisites — isPrimaryKey

Every CRUD operation requires an ID column marked as the primary key. By default, the `id` field of `.TaskFields(tf => tf.Id(...))` is the primary key. When defining columns explicitly via `.Columns(...)`, set `.IsPrimaryKey(true)` on the ID column:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Columns(col => {
        col.Field("TaskId").IsPrimaryKey(true).Add();
        col.Field("TaskName").Add();
    })
    .Render()
```

> Forgetting to define a primary key column triggers an `actionFailure` event and CRUD operations will not work.

---

## Troubleshoot: Editing Works Only When Primary Key Column Is Defined

Editing feature requires a primary key column for CRUD operations. While defining columns in Gantt using the `Columns` property, it is mandatory that any one of the columns must be a primary column.

- By default, the `id` field configured via `.TaskFields(tf => tf.Id("..."))` acts as the primary key column.
- If `id` is **not** defined in `TaskFields`, you must explicitly set `.IsPrimaryKey(true)` on one of the columns in the `.Columns(...)` builder.
- Without a primary key column, all edit/save/delete operations will silently fail or fire `actionFailure`.

**Correct — id mapped via TaskFields (default primary key):**
```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true).AllowDeleting(true))
    .Render()
```

**Correct — explicitly setting IsPrimaryKey when columns are defined:**
```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Columns(col => {
        col.Field("TaskId").IsPrimaryKey(true).Add();
        col.Field("TaskName").Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
    })
    .EditSettings(es => es.AllowEditing(true))
    .Render()
```

> If no primary key is defined, the Gantt component cannot identify which record to update or delete, and CRUD operations will not function correctly.

---

## EditSettings Overview

Enable editing by configuring `EditSettings`. All editing modes are controlled here:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .EditSettings(es => es
        .AllowEditing(true)         // enable row/cell editing
        .AllowAdding(true)          // enable adding new tasks
        .AllowDeleting(true)        // enable deleting tasks
        .AllowTaskbarEditing(true)  // drag taskbar to change dates/duration
        .Mode(Syncfusion.EJ2.Gantt.EditMode.Auto)
        .NewRowPosition(Syncfusion.EJ2.Gantt.RowPosition.Child)
        .ShowDeleteConfirmDialog(true)
    )
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel" })
    .Render()
```

| Property | Type | Values | Description |
|---|---|---|---|
| `AllowEditing` | bool | `true` / `false` | Enable cell/dialog editing of existing tasks |
| `AllowAdding` | bool | `true` / `false` | Enable adding new tasks |
| `AllowDeleting` | bool | `true` / `false` | Enable deleting tasks |
| `AllowTaskbarEditing` | bool | `true` / `false` | Enable drag-resize of taskbars in the chart area |
| `Mode` | enum | `Auto` \| `Dialog` | Edit mode for the tree-grid side |
| `NewRowPosition` | enum | `Top` \| `Bottom` \| `Above` \| `Below` \| `Child` | Where new rows are inserted |
| `ShowDeleteConfirmDialog` | bool | `true` / `false` | Show confirmation before deleting a task |

---

## Cell Editing

Set `EditMode.Auto`. Double-click a grid cell to edit it inline. Double-click the chart area to open the dialog:

```cshtml
.EditSettings(es => es
    .AllowEditing(true)
    .Mode(Syncfusion.EJ2.Gantt.EditMode.Auto)
)
```

- Single-click selects the row
- Double-click on the tree grid enters cell edit mode
- Press `Enter` or click outside to save; `Esc` to cancel

### Disable Editing for a Column

Set `.AllowEditing(false)` on a specific column to prevent it from being edited:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Columns(col => {
        col.Field("TaskId").Add();
        col.Field("TaskName").HeaderText("Task Name").AllowEditing(false).Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("Progress").Add();
    })
    .EditSettings(es => es.AllowEditing(true))
    .Render()
```

### Cell Edit Types and Params

Set the editor component per column using `.EditType()` and provide custom params via `.Edit()`:

| `editType` | Component | Example params |
|---|---|---|
| `numericedit` | NumericTextBox | `new { @params = new { decimals = 2, value = 5 } }` |
| `defaultedit` | TextBox | _(no params needed)_ |
| `dropdownedit` | DropDownList | `new { @params = new { value = "Germany" } }` |
| `booleanedit` | CheckBox | `new { @params = new { checked = true } }` |
| `datepickeredit` | DatePicker | `new { @params = new { format = "dd.MM.yyyy" } }` |
| `datetimepickeredit` | DateTimePicker | `new { @params = new { value = "new Date()" } }` |

```cshtml
@Html.EJS().Gantt("Gantt").DataSource((IEnumerable<object>)ViewBag.DataSource).Height("450px").TaskFields(ts =>
     ts.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks")
     ).Columns(col =>
            {
                col.Field("TaskId").Add();
                col.Field("TaskName").HeaderText("Task Name").Add();
                col.Field("StartDate").Add();
                col.Field("Duration").EditType("numericedit").Edit(new { @params = new { min = 1 } }).ValueAccessor("durationFormat").Add();
                col.Field("Progress").EditType("numericedit").Edit(new { @params = new Syncfusion.EJ2.Inputs.NumericTextBox() { ShowSpinButton = false } }).Add();
            }).EditSettings(es => es.AllowEditing(true)).Render()

<script>
    function durationFormat(field, data, column) {
        return data[field];
    }
</script>
```

> Use `.EditType()` on each column builder call. Pass editor params as an anonymous object to `.Edit()`. Use `.ValueAccessor()` to format the displayed value for the column.

---

### Cell Edit Template

The cell edit template creates a fully custom editor component for a specific column. Implement the four lifecycle functions and pass them via `.Edit()`:

| Function | Purpose |
|---|---|
| `create` | Creates the DOM element at initialization |
| `write` | Instantiates the custom component and sets its default value when edit begins |
| `read` | Reads and returns the current value from the component when saving |
| `destroy` | Destroys the component when editing ends |

```cshtml
@Html.EJS().Gantt("Gantt").DataSource((IEnumerable<object>)ViewBag.DataSource).Height("450px").TaskFields(ts =>
     ts.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks")
     ).Columns(col =>
            {
                col.Field("TaskId").Add();
                col.Field("TaskName").HeaderText("Task Name").Edit(new { create = "create", read = "read", destroy = "destroy", write = "write" }).Add();
                col.Field("StartDate").Add();
                col.Field("Duration").Add();
                col.Field("Progress").Add();
            }).EditSettings(es => es.AllowEditing(true)).Render()

<script>
    var elem;
    var dropdownlistObj;

    function create(args) {
        elem = document.createElement('input');
        return elem;
    }

    function write(args) {
        var gantt = document.getElementById("Gantt").ej2_instances[0];
        dropdownlistObj = new ej.dropdowns.DropDownList({
            dataSource: gantt.treeGrid.grid.dataSource,
            fields: { value: 'TaskName' },
            value: args.rowData[args.column.field],
            floatLabelType: 'Auto',
        });
        dropdownlistObj.appendTo(elem);
    }

    function destroy() {
        dropdownlistObj.destroy();
    }

    function read(args) {
        return dropdownlistObj.value;
    }
</script>
```

> Pass all four function names as strings to `.Edit(new { create = "...", read = "...", destroy = "...", write = "..." })` on the target column.

---

## Dialog Editing

Set `EditMode.Dialog`. Double-clicking anywhere opens a dialog with tabs: General, Dependency, Resources, Notes:

```cshtml
.EditSettings(es => es
    .AllowEditing(true)
    .Mode(Syncfusion.EJ2.Gantt.EditMode.Dialog)
)
```

The dialog contains:
- **General tab:** TaskID, TaskName, Duration, StartDate, EndDate, Progress
- **Dependency tab:** Predecessor list (task IDs + type)
- **Resources tab:** Assign/remove resources
- **Notes tab:** Free-text notes for the task

### Customize Dialog Tabs

Control which tabs appear using `.AddDialogFields()` and `.EditDialogFields()`. Available `Type` values: `General`, `Dependency`, `Resources`, `Notes`, `Segments`.

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks").Dependency("Dependency").ResourceInfo("ResourceId").Notes("info"))
    .Resources((IEnumerable<object>)ViewBag.projectResources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .Toolbar(new List<string> { "Add" })
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true).Mode(Syncfusion.EJ2.Gantt.EditMode.Dialog))
    .AddDialogFields(adf => {
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General Tab").Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).Add();
    })
    .EditDialogFields(edf => {
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General").Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Resources).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Notes).Add();
    })
    .Render()
```

### Limit Fields in General Tab

Use the `.Fields()` builder on an `AddDialogFields`/`EditDialogFields` entry to restrict which columns appear in the General tab. Also supports custom (non-task-fields) columns:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks").Dependency("Dependency").ResourceInfo("ResourceId").Notes("info"))
    .Columns(col => {
        col.Field("TaskId").Width(50).Add();
        col.Field("TaskName").Add();
        col.Field("isParent").HeaderText("Custom Column").Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("Progress").Add();
    })
    .Resources((IEnumerable<object>)ViewBag.projectResources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .Toolbar(new List<string> { "Add" })
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true).Mode(Syncfusion.EJ2.Gantt.EditMode.Dialog))
    .AddDialogFields(adf => {
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General Tab").Fields(new string[] { "TaskId", "TaskName", "isParent" }).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).Add();
    })
    .EditDialogFields(edf => {
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General").Fields(new string[] { "TaskId", "TaskName", "isParent" }).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Resources).Add();
    })
    .Render()
```

> The `Fields` array accepts column field names as strings. Only listed fields appear in the General tab of the dialog.

### Set Default Values on Add Dialog

Use the `ActionBegin` event with `requestType == "beforeOpenAddDialog"` to pre-populate field values when the Add dialog opens:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Toolbar(new List<string> { "Add" })
    .EditSettings(es => es.AllowAdding(true))
    .ActionBegin("onActionBegin")
    .Render()

<script>
function onActionBegin(args) {
    if (args.requestType == 'beforeOpenAddDialog') {
        args.rowData.TaskName = 'New Task';
        args.rowData.Progress = 0;
    }
}
</script>
```

---

### Customize Dependency, Segments and Resources Tab

Customize the **Dependency**, **Segments**, and **Resources** tabs of the add/edit dialog using the `.AdditionalParams()` method within `.AddDialogFields()` and `.EditDialogFields()`. Pass grid-level properties (e.g., `allowSorting`, `toolbar`, `columns`) as an anonymous object to `AdditionalParams`.

In the example below:
- The **Dependency** tab enables `allowPaging`, `allowSorting`, and a custom `toolbar` with Search and Print buttons.
- The **Resources** tab enables `allowPaging`, `allowSorting`, a custom `toolbar`, and adds a new column `newData`.
- The **Segments** tab adds a custom column `segmentTask` with a specified `width` and `headerText`.

These customizations apply to both `AddDialogFields` and `EditDialogFields`.

```cshtml
@Html.EJS().Gantt("Gantt").DataSource((IEnumerable<object>)ViewBag.DataSource).Height("450px")
    .TaskFields(ts => ts.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks"))
    .EditSettings(es => es.AllowAdding(true))
    .Toolbar(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })
    .EditDialogFields(edf => {
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General").Fields(new string[] { "TaskID", "TaskName", "newInput" }).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).AdditionalParams(new {
            allowPaging = true,
            allowSorting = true,
            toolbar = new List<object> {
                new { text = "Search" },
                new { text = "Print" }
            },
        }).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Resources).AdditionalParams(new {
            allowPaging = true,
            allowSorting = true,
            toolbar = new List<object> {
                new { text = "Search" },
                new { text = "Print" }
            },
            columns = new List<object> {
                new { field = "newData" },
            }
        }).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Segment).AdditionalParams(new {
            columns = new List<object> {
                new { field = "segmentTask", width = "170px", headerText = "Segment Task" },
            }
        }).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Notes).Add();
    })
    .AddDialogFields(adf => {
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General").Fields(new string[] { "TaskID", "TaskName", "newInput" }).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).AdditionalParams(new {
            allowPaging = true,
            allowSorting = true,
            toolbar = new List<object> {
                new { text = "Search" },
                new { text = "Print" }
            },
        }).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Resources).AdditionalParams(new {
            allowPaging = true,
            allowSorting = true,
            toolbar = new List<object> {
                new { text = "Search" },
                new { text = "Print" }
            },
            columns = new List<object> {
                new { field = "newData" },
            }
        }).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Segment).AdditionalParams(new {
            columns = new List<object> {
                new { field = "segmentTask", width = "170px", headerText = "Segment Task" },
            }
        }).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Notes).Add();
    })
    .Render()
```

| Tab | `AdditionalParams` properties supported |
|---|---|
| `Dependency` | `allowPaging`, `allowSorting`, `toolbar`, `columns` (Grid properties) |
| `Resources` | `allowPaging`, `allowSorting`, `toolbar`, `columns` (Grid properties) |
| `Segment` | `columns` (Grid properties) |
| `Notes` | `inlineMode` (RTE properties — see below) |

> Use `.AdditionalParams(new { ... })` with an anonymous C# object containing valid [Grid](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.grids.grid.html) properties. The `columns` array accepts anonymous objects with `field`, `width`, and `headerText`.

---

### Customize Notes Tab

Customize the **Notes** tab of the add/edit dialog using `.AdditionalParams()` within `.AddDialogFields()` and `.EditDialogFields()`. Pass [RichTextEditor](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.RichTextEditor.html) properties as the anonymous object.

In the example below, `inlineMode` is enabled with `onSelection = true`, so the RTE toolbar appears inline when text is selected:

```cshtml
@Html.EJS().Gantt("Gantt").DataSource((IEnumerable<object>)ViewBag.DataSource).Height("450px")
    .TaskFields(ts => ts.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks"))
    .EditSettings(es => es.AllowAdding(true))
    .Toolbar(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })
    .EditDialogFields(edf => {
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General").Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Resources).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Segment).Add();
        edf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Notes).AdditionalParams(new {
            inlineMode = new { enable = true, onSelection = true },
        }).Add();
    })
    .AddDialogFields(adf => {
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.General).HeaderText("General").Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Dependency).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Resources).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Segment).Add();
        adf.Type(Syncfusion.EJ2.Gantt.DialogFieldType.Notes).AdditionalParams(new {
            inlineMode = new { enable = true, onSelection = true },
        }).Add();
    })
    .Render()
```

> Pass RTE `inlineMode` properties via `.AdditionalParams()` on the `Notes` dialog field. The `enable` flag activates inline editing mode; `onSelection` shows the toolbar only when text is selected.

---

## Taskbar Editing

Allow users to drag and resize taskbars to change task dates and duration:

```cshtml
.EditSettings(es => es
    .AllowTaskbarEditing(true)
)
```

Interactions:
- **Drag taskbar body** — moves start/end dates (keeps duration)
- **Drag right gripper** — extends end date
- **Drag left gripper** — changes start date
- **Drag progress gripper** — changes progress percentage
- **Drag connector point** — creates dependency between tasks

### Prevent Taskbar Editing for Specific Tasks

Use the `TaskbarEditing` event to cancel editing for specific tasks, and `QueryTaskbarInfo` to visually hide the editing indicators:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .EditSettings(es => es.AllowTaskbarEditing(true))
    .TaskbarEditing("taskbarEditing")
    .QueryTaskbarInfo("queryTaskbarInfo")
    .Render()

<script>
function taskbarEditing(args) {
    if (args.data.TaskId == 4) // Prevent editing Task ID 4
        args.cancel = true;
}
function queryTaskbarInfo(args) {
    if (args.data.TaskId == 6) {
        args.taskbarElement.className += ' e-preventEdit'; // Hide edit indicators
    }
}
</script>

<style>
    .e-gantt-chart .e-preventEdit .e-right-resize-gripper,
    .e-gantt-chart .e-preventEdit .e-left-resize-gripper,
    .e-gantt-chart .e-preventEdit .e-progress-resize-gripper,
    .e-gantt-chart .e-preventEdit .e-left-connectorpoint-outer-div,
    .e-gantt-chart .e-preventEdit .e-right-connectorpoint-outer-div {
        display: none;
    }
</style>
```

> `TaskbarEditing` — set `args.cancel = true` to prevent editing that specific task.  
> `QueryTaskbarInfo` — add a CSS class to hide resize/progress/connector indicators without blocking the event.

---

## Task Dependencies

Task dependencies can be created and edited in three ways:

**Mouse interaction (connector drag):**  
Enable `.AllowTaskbarEditing(true)`. Hover over a taskbar until connector points appear, then drag to another taskbar to create an `FS` (Finish-to-Start) dependency:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Dependency("Dependency").Child("SubTasks"))
    .EditSettings(es => es.AllowEditing(true).AllowTaskbarEditing(true).Mode(Syncfusion.EJ2.Gantt.EditMode.Auto))
    .Render()
```

**Cell editing:** Type the dependency string directly into the Predecessor/Dependency column cell (e.g., `2`, `2FS`, `2SS+1`).

**Dialog editing (Dependency tab):** Open the Edit dialog → Dependency tab. Supports all types: `FS`, `SS`, `FF`, `SF`.

> Map the dependency field via `.TaskFields(tf => tf.Dependency("Dependency"))`. On mobile, only `FS` type can be created via taskbar drag.

---

## Adding Tasks

Enable the Add toolbar button and configure where new rows are inserted via `NewRowPosition`:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Toolbar(new List<string> { "Add" })
    .EditSettings(es => es.AllowAdding(true))
    .Render()
```

**Via context menu:** Enable `.EnableContextMenu(true)` — right-clicking a row shows **Add Above**, **Add Below**, **Add Child** options.

`NewRowPosition` values:

| Value | Description |
|---|---|
| `Top` | Add at the top of the grid |
| `Bottom` | Add at the bottom of the grid |
| `Above` | Add above the selected row (same level) |
| `Below` | Add below the selected row (same level) |
| `Child` | Add as a child of the selected row |

### Programmatic Add — addRecord

Use `ganttObj.editModule.addRecord(data, rowPosition, rowIndex)` to add a task programmatically:

```cshtml
@Html.EJS().Button("addRecord").Content("Add Record").CssClass("e-primary").Render()
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .EditSettings(es => es.AllowAdding(true))
    .Render()

<script>
document.getElementById('addRecord').addEventListener('click', function () {
    var record = {
        TaskId: 10,
        TaskName: 'Newly Added Record',
        StartDate: new Date('04/02/2019'),
        Duration: 3,
        Progress: 50
    };
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.editModule.addRecord(record, 'Below', 2); // Add below row index 2
});
</script>
```

**`addRecord` parameters:**

| Parameter | Type | Description |
|---|---|---|
| `data` | object | Task data object with field values |
| `rowPosition` | string | `Top` \| `Bottom` \| `Above` \| `Below` \| `Child` |
| `rowIndex` | number _(optional)_ | Zero-based index of the reference row |

---

## Deleting Tasks

Enable deleting via the toolbar or programmatically using `ganttObj.editModule.deleteRow()`:

```cshtml
@Html.EJS().Button("deleteRecord").Content("Delete Record").CssClass("e-primary").Render()
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .EditSettings(es => es.AllowDeleting(true))
    .Render()

<script>
document.getElementById('deleteRecord').addEventListener('click', function () {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.editModule.deleteRow();
});
</script>
```

> When a parent task is deleted, all its child tasks are also deleted. A row must be selected before calling `deleteRow()`.

### Delete Confirmation Dialog

Set `.ShowDeleteConfirmDialog(true)` in `EditSettings` to require user confirmation before deleting:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Toolbar(new List<string> { "Delete" })
    .EditSettings(es => es.AllowDeleting(true).ShowDeleteConfirmDialog(true))
    .Render()
```

---

## Programmatic Update — updateRecordByID

Update an existing task record by its ID without using the edit dialog or cell editing:

```cshtml
@Html.EJS().Button("updateRecord").Content("Update Record").CssClass("e-primary").Render()
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .EditSettings(es => es.AllowEditing(true))
    .Render()

<script>
document.getElementById('updateRecord').addEventListener('click', function () {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    var data = {
        TaskId: 3,
        TaskName: 'Updated by index value',
        StartDate: new Date('04/02/2019'),
        Duration: 4,
        Progress: 50
    };
    ganttObj.updateRecordByID(data);
});
</script>
```

> The data object **must** include the primary key field (`TaskId`) to identify the record. The `TaskId` value itself cannot be changed via `updateRecordByID`.

---

## Toolbar CRUD

Add standard CRUD toolbar buttons:

```cshtml
@Html.EJS().Gantt("gantt")
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel", "ExpandAll", "CollapseAll", "Search" })
    .Render()
```

All built-in toolbar items:

| Item | Action |
|---|---|
| `Add` | Add a new task row |
| `Edit` | Edit selected task |
| `Delete` | Delete selected task |
| `Update` | Save current edits |
| `Cancel` | Cancel edits |
| `ExpandAll` | Expand all parent tasks |
| `CollapseAll` | Collapse all parent tasks |
| `Search` | Show search input box |
| `Indent` | Indent selected task (make child of above) |
| `Outdent` | Outdent selected task (promote to sibling) |
| `PrevTimeSpan` | Navigate timeline backward |
| `NextTimeSpan` | Navigate timeline forward |
| `ZoomIn` | Zoom in timeline |
| `ZoomOut` | Zoom out timeline |
| `ZoomToFit` | Fit all tasks in view |
| `ExcelExport` | Export to Excel |
| `PdfExport` | Export to PDF |

---

## Row Drag and Drop

Allow users to rearrange tasks by dragging rows:

```cshtml
@Html.EJS().Gantt("gantt")
    .AllowRowDragAndDrop(true)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()
```

For multi-row drag:

```cshtml
@Html.EJS().Gantt("gantt")
    .AllowRowDragAndDrop(true)
    .SelectionSettings(ss => ss.Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .Render()
```

Drop positions:
- **Above** sibling row
- **Below** sibling row
- **As child** of another task (indents the dragged row)

---

## Indent and Outdent

Indent makes the selected task a child of the task above it. Outdent promotes it up one level:

```cshtml
.Toolbar(new List<string> { "Indent", "Outdent" })
```

Or programmatically:

```javascript
var gantt = document.getElementById('gantt').ej2_instances[0];
gantt.indent();
gantt.outdent();
```

---

## Undo and Redo

Enable undo/redo for task changes:

```cshtml
@Html.EJS().Gantt("gantt")
    .EnableUndoRedo(true)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Toolbar(new List<string> { "Undo", "Redo" })
    .Render()
```

Limit undo/redo to specific actions:

```cshtml
.UndoRedoActions(new List<string> { "Edit", "Delete", "Add", "Sorting", "Filtering", "RowDragAndDrop" })
```

> By default, all actions (Edit, Delete, Add, Sorting, Filtering, Indent, Outdent, ColumnReorder, ColumnResize, Search, Zoom, RowDragAndDrop, TaskbarDragAndDrop) are tracked.

Maximum undo steps (default 10):

```cshtml
.MaxUndoRedoSteps(20)
```

---

## Programmatic CRUD

Add a task programmatically using `editModule.addRecord()`:

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.editModule.addRecord(
    { TaskId: 10, TaskName: "New Task", StartDate: new Date(2024, 3, 5), Duration: 3, Progress: 0 },
    'Below',   // position: 'Above', 'Below', 'Child', 'Top', 'Bottom'
    2          // reference row index
);
```

Update a task by ID:

```javascript
ganttObj.updateRecordByID({ TaskId: 2, TaskName: "Updated Name", Duration: 5 });
```

Delete the selected row using `editModule.deleteRow()`:

```javascript
ganttObj.editModule.deleteRow();
```

---

## Splitting and Merging Tasks

Split a task into multiple segments to represent interrupted work periods.

**Enable splitting:** Map the segment collection via `.Segments()` in `.TaskFields()`, enable `AllowTaskbarEditing`, and enable `.EnableContextMenu(true)` for split/merge context menu actions:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Segments("Segments").Child("SubTasks"))
    .Toolbar(new List<string> { "Add", "Cancel", "CollapseAll", "Delete", "Edit", "ExpandAll", "Search", "Update" })
    .EnableContextMenu(true)
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Render()
```

**How to split/merge dynamically:**
- **Context menu:** Right-click a taskbar → **Split Task**; right-click a segment → **Merge Task**
- **Dialog:** Open the Edit dialog → **Segments** tab (visible when `Segments` field is mapped)
- **UI drag:** Drag two segments together to merge them

**Limitations:**
- Parent and milestone tasks cannot be split
- Task width must be greater than one timeline unit cell to split
- Split tasks are not supported with Multi Taskbar mode

---

## Read-Only Gantt

Disable all create, update, and delete operations by setting `.ReadOnly(true)` on the Gantt. This overrides `AllowEditing`, `AllowAdding`, and `AllowDeleting` even when they are `true`:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Toolbar(new List<string> { "Add", "Cancel", "Delete", "Edit", "Update" })
    .EnableContextMenu(true)
    .AllowSorting(true)
    .AllowResizing(true)
    .ReadOnly(true)
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Render()
```

---

## Server-Side CRUD Persistence

Persist all changes to a remote database using `UrlAdaptor` with a `BatchUrl`:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource(dataManager => {
        dataManager.Url("/Home/UrlDatasource").Adaptor("UrlAdaptor").BatchUrl("Home/BatchSave");
    })
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks"))
    .Render()
```

**Controller: BatchSave method**

Handle all CRUD operations in a single `BatchSave` endpoint using the `added`, `changed`, and `deleted` collections:

```csharp
public class ICRUDModel<T> where T : class
{
    public List<T> added   { get; set; }
    public List<T> changed { get; set; }
    public List<T> deleted { get; set; }
}

public ActionResult BatchSave([FromBody] ICRUDModel<GanttData> data)
{
    if (data.added != null)
        foreach (var task in data.added)
            DataList.Insert(0, task);

    if (data.changed != null)
        foreach (var task in data.changed)
        {
            var existing = DataList.FirstOrDefault(t => t.TaskId == task.TaskId);
            if (existing != null)
            {
                existing.TaskName  = task.TaskName;
                existing.StartDate = task.StartDate;
                existing.Duration  = task.Duration;
                existing.Progress  = task.Progress;
            }
        }

    if (data.deleted != null)
        foreach (var task in data.deleted)
            DataList.Remove(DataList.FirstOrDefault(t => t.TaskId == task.TaskId));

    return Json(new { addedRecords = new List<GanttData>(), changedRecords = new List<GanttData>(), deletedRecords = new List<GanttData>() });
}
```

> In Gantt, all CRUD actions are treated as **batch** operations because editing one task may affect parent tasks, child tasks, and predecessor-linked tasks. The `BatchUrl` controller method receives all affected records together.

---

## Validation

### Column Validation

Set validation rules on a column using `.ValidationRules()` as an anonymous C# object:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowSelection(true)
    .Columns(col => {
        col.Field("TaskId").Width(80).Add();
        col.Field("TaskName").HeaderText("Job Name").Width(250).ValidationRules(new { required = true }).Add();
        col.Field("StartDate").EditType("datetimepickeredit").ValidationRules(new { required = true, date = true }).TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Format("yMd").Add();
        col.Field("EndDate").ValidationRules(new { required = true }).Add();
        col.Field("Duration").ValidationRules(new { required = true }).Add();
        col.Field("Progress").ValidationRules(new { required = true }).Add();
    })
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true).ShowDeleteConfirmDialog(true))
    .Render()
```

Supported built-in validation rule keys: `required`, `min`, `max`, `date`, `minLength`, `maxLength`.

> Set `.ValidationRules()` directly on each column builder call. Pass an anonymous object.

### Custom Validation

Define a custom validation function and attach it to a column's validation rules in the `Load` event:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowSelection(true)
    .Load("onLoad")
    .Columns(col => {
        col.Field("TaskId").Width(80).Add();
        col.Field("TaskName").HeaderText("Job Name").Width(250).ValidationRules(new { required = true }).Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("Progress").Add();
    })
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true))
    .Render()

<script>
function customFn(args) {
    return args['value'].length >= 4;
}
function onLoad() {
    this.columns[1].validationRules = {
        required: true,
        minLength: [customFn, 'Need at least 5 letters']
    };
}
</script>
```

> Custom validation rules use a callback array: `[validationFunction, errorMessage]`. The function receives `args` with `args.value` being the current field value.

### Dependency and Resource Grid Validation

Apply validation rules to the Dependency and Resource grids inside the Add/Edit dialog using the `ActionBegin` event:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Dependency("Dependency").Child("SubTasks"))
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true).Mode(Syncfusion.EJ2.Gantt.EditMode.Dialog))
    .ActionBegin("actionBegin")
    .Render()

<script>
function actionBegin(args) {
    if (args.requestType === 'beforeOpenEditDialog' || args.requestType === 'beforeOpenAddDialog') {
        // Access args.dialog to configure grid validation
        // for Dependency and Resources tabs
    }
}
</script>
```

> Use `requestType` values `beforeOpenEditDialog` or `beforeOpenAddDialog` in the `ActionBegin` event to access and configure grid validation rules for the Dependency and Resources tabs.

---

## Touch Interaction

Gantt editing actions are supported on touch devices using **double tap** and **tap-and-drag** gestures.

| Action | Description |
|---|---|
| `Cell editing` | Double-tap a specific cell to put it into edit state |
| `Dialog editing` | Double-tap a specific row to open the edit dialog |
| `Taskbar editing` | Tap the taskbar to enter editing state, then drag to modify |

**Taskbar touch gestures:**
- **Parent taskbar:** Tap to enter editing state; only dragging is supported on parent taskbars
- **Child taskbar:** Tap to enter editing state
- **Dragging taskbar:** Drag left or right to move start/end dates
- **Resizing taskbar:** Drag the left/right resize icon to resize
- **Progress resizing:** Drag the progress resize icon left or right to change progress

The code to enable taskbar editing for touch interaction is the same as for mouse:

```cshtml
@Html.EJS().Gantt("Gantt").DataSource((IEnumerable<object>)ViewBag.DataSource).Height("450px").TaskFields(ts => ts.Id("TaskId").Name(
    "TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks").Dependency("Dependency")
    ).EditSettings(es => es.AllowEditing(true).AllowTaskbarEditing(true).Mode(Syncfusion.EJ2.Gantt.EditMode.Auto)).Render()
```

### Task Dependency Editing (Touch)

Tap the left/right connector point on a taskbar to initiate dependency edit mode, then tap another taskbar to establish the dependency line.

| Taskbar State | Description |
|---|---|
| `Parent taskbar` | Cannot create dependency on parent tasks |
| `Taskbar without dependency` | Tap a valid child taskbar to create an `FS` dependency; tapping an invalid taskbar exits dependency edit mode |
| `Taskbar with dependency` | Tapping an already-connected taskbar prompts to remove the dependency |
| `Removing dependency` | A confirmation dialog appears before removing the direct dependency |

> **Note:** On mobile devices, only `FS` (Finish-to-Start) dependencies can be created via taskbar drag. Use cell editing or dialog editing to add `SS`, `FF`, or `SF` dependency types.

---

## Taskbar Editing Tooltip

Customize the tooltip shown while dragging/resizing a taskbar using the `TooltipSettings.Editing` property. Pass a script template selector:

```cshtml
@Html.EJS().Gantt("Gantt").DataSource((IEnumerable<object>)ViewBag.DataSource).Height("450px").TaskFields(ts => ts.Id("TaskId").Name("TaskName").StartDate("StartDate"
   ).EndDate("EndDate").Child("SubTasks").Duration("Duration").Progress("Progress")).TooltipSettings(ts => ts.Editing("#editingTooltip")
   ).EditSettings(es => es.AllowTaskbarEditing(true)).Render()

<script type="text/x-jsrender" id="editingTooltip">
    <div>Duration : ${duration}</div>
</script>
```

- The template selector (`#editingTooltip`) points to a `<script type="text/x-jsrender">` block.
- Use `${fieldName}` syntax to render task field values inside the tooltip.
- The tooltip is shown in real time as the user drags or resizes the taskbar.

> `TooltipSettings.Editing` accepts a template string (CSS selector or inline HTML). To disable the editing tooltip entirely, set `.TooltipSettings(ts => ts.ShowTooltip(false))`.

---

## ActionComplete Event

Fires after any CRUD or editing operation completes:

```cshtml
@Html.EJS().Gantt("gantt")
    .ActionComplete("onActionComplete")
    .Render()

<script>
function onActionComplete(args) {
    if (args.requestType === 'save') {
        console.log('Task saved:', args.data);
    }
    if (args.requestType === 'delete') {
        console.log('Task deleted:', args.data);
    }
    if (args.requestType === 'add') {
        console.log('Task added:', args.data);
    }
}
</script>
```

Common `requestType` values: `save`, `delete`, `add`, `taskbarEditing`, `rowDragAndDrop`, `sorting`, `filtering`.
