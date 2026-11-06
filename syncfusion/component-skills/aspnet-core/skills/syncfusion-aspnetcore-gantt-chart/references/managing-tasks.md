````markdown
# Managing Tasks (Editing) — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Prerequisites — isPrimaryKey](#prerequisites--isprimarykey)
- [Edit Settings Overview](#edit-settings-overview)
- [Cell Editing](#cell-editing)
  - [Disable Editing for a Column](#disable-editing-for-a-column)
  - [Cell Edit Types and Params](#cell-edit-types-and-params)
- [Dialog Editing](#dialog-editing)
  - [Customize Dialog Tabs](#customize-dialog-tabs)
  - [Limit Fields in General Tab](#limit-fields-in-general-tab)
  - [Set Default Values on Add Dialog](#set-default-values-on-add-dialog)
- [Taskbar Editing](#taskbar-editing)
  - [Prevent Taskbar Editing for Specific Tasks](#prevent-taskbar-editing-for-specific-tasks)
- [Task Dependencies](#task-dependencies)
- [Adding Tasks](#adding-tasks)
  - [Programmatic Add — addRecord](#programmatic-add--addrecord)
- [Deleting Tasks](#deleting-tasks)
  - [Delete Confirmation Dialog](#delete-confirmation-dialog)
- [Programmatic Update — updateRecordByID](#programmatic-update--updaterecordbyid)
- [Indent and Outdent](#indent-and-outdent)
- [Splitting and Merging Tasks](#splitting-and-merging-tasks)
- [Read-Only Gantt](#read-only-gantt)
- [Server-Side CRUD Persistence](#server-side-crud-persistence)
- [Validation](#validation)
  - [Column Validation](#column-validation)
  - [Custom Validation](#custom-validation)
  - [Dependency and Resource Grid Validation](#dependency-and-resource-grid-validation)

---

## Prerequisites — isPrimaryKey

Every CRUD operation requires an ID column to be marked as the primary key. By default, the `id` field of `<e-gantt-taskfields>` is the primary key. When defining columns explicitly, set `isPrimaryKey="true"` on the ID column.

```cshtml
<e-gantt-columns>
    <e-gantt-column field="TaskId" isPrimaryKey="true"></e-gantt-column>
    <e-gantt-column field="TaskName"></e-gantt-column>
</e-gantt-columns>
```

> Forgetting to define a primary key column triggers an `actionFailure` event and CRUD operations will not work.

---

## Edit Settings Overview

Configure all editing behavior with `<e-gantt-editsettings>`:

```cshtml
<e-gantt-editsettings
    allowEditing="true"
    allowAdding="true"
    allowDeleting="true"
    allowTaskbarEditing="true"
    mode="Auto"
    newRowPosition="Child"
    showDeleteConfirmDialog="true">
</e-gantt-editsettings>
```

| Property | Type | Values | Description |
|---|---|---|---|
| `allowEditing` | bool | `true` / `false` | Enable cell/dialog editing of existing tasks |
| `allowAdding` | bool | `true` / `false` | Enable adding new tasks |
| `allowDeleting` | bool | `true` / `false` | Enable deleting tasks |
| `allowTaskbarEditing` | bool | `true` / `false` | Enable drag-resize of taskbars in the chart area |
| `mode` | string | `Auto` \| `Dialog` | Edit mode for the tree-grid side |
| `newRowPosition` | string | `Top` \| `Bottom` \| `Above` \| `Below` \| `Child` | Where new rows are inserted |
| `showDeleteConfirmDialog` | bool | `true` / `false` | Show confirmation before deleting a task |

---

## Cell Editing

In `Auto` mode, double-clicking a TreeGrid cell makes it editable inline. Double-clicking in the chart area opens the dialog editor.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" mode="Auto"></e-gantt-editsettings>
</ejs-gantt>
```

> In `Auto` mode: double-click in the tree-grid area → inline cell edit; double-click in the chart area → dialog edit.

### Disable Editing for a Column

Use `allowEditing="false"` on a specific column to prevent it from being edited:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="150"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" allowEditing="false"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

### Cell Edit Types and Params

Set the editor component per column using `editType` and provide custom params via `edit`:

| `editType` | Component | Example `edit` params |
|---|---|---|
| `numericedit` | NumericTextBox | `@(new { @params = new { decimals = 2, min = 0 } })` |
| `defaultedit` | TextBox | _(no params needed)_ |
| `dropdownedit` | DropDownList | `@(new { @params = new { value = "Active" } })` |
| `booleanedit` | CheckBox | `@(new { @params = new { checked = true } })` |
| `datepickeredit` | DatePicker | `@(new { @params = new { format = "dd.MM.yyyy" } })` |
| `datetimepickeredit` | DateTimePicker | `@(new { @params = new { value = "new Date()" } })` |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="150"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration" editType="numericedit"
            edit="@(new { @params = new Syncfusion.EJ2.Inputs.NumericTextBox() { Min = 1 } })">
        </e-gantt-column>
        <e-gantt-column field="Progress" editType="numericedit"
            edit="@(new { @params = new Syncfusion.EJ2.Inputs.NumericTextBox() { ShowSpinButton = false } })">
        </e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

> Use `editType` on `<e-gantt-column>` directly. There is no `<e-gantt-column-edit>` child tag — pass the `edit` params as an inline object attribute.

---

## Dialog Editing

Force all edits through a dialog form by setting `mode="Dialog"`:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" mode="Dialog"></e-gantt-editsettings>
</ejs-gantt>
```

### Customize Dialog Tabs

Control which tabs appear in the Add and Edit dialogs using `<e-gantt-adddialogfields>` and `<e-gantt-editdialogfields>`. These are **sibling** tags to `<e-gantt-editsettings>`, not nested inside it.

Available tab `type` values: `General`, `Dependency`, `Resources`, `Notes`, `Segments`

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           resources="ViewBag.projectResources"
           toolbar="@(new List<string>() { "Add" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress"
            child="SubTasks" dependency="Dependency"
            resourceInfo="ResourceId" notes="info">
    </e-gantt-taskfields>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"></e-gantt-resourcefields>
    <e-gantt-editsettings allowEditing="true" allowAdding="true" mode="Dialog"></e-gantt-editsettings>
    <e-gantt-adddialogfields>
        <e-gantt-adddialogfield type="General" headerText="General Tab"></e-gantt-adddialogfield>
        <e-gantt-adddialogfield type="Dependency"></e-gantt-adddialogfield>
    </e-gantt-adddialogfields>
    <e-gantt-editdialogfields>
        <e-gantt-editdialogfield type="General" headerText="General"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Dependency"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Resources"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Notes"></e-gantt-editdialogfield>
    </e-gantt-editdialogfields>
</ejs-gantt>
```

> `<e-gantt-adddialogfields>` and `<e-gantt-editdialogfields>` are siblings of `<e-gantt-editsettings>` — **not** nested inside it.

### Limit Fields in General Tab

Use the `fields` property on `<e-gantt-adddialogfield>` / `<e-gantt-editdialogfield>` to restrict which columns appear in the General tab form. This also supports custom (non-task-fields) columns:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           resources="ViewBag.projectResources"
           toolbar="@(new List<string>() { "Add" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress"
            child="SubTasks" dependency="Dependency"
            resourceInfo="ResourceId" notes="info">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="50"></e-gantt-column>
        <e-gantt-column field="TaskName"></e-gantt-column>
        <e-gantt-column field="isParent" headerText="Custom Column"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName"></e-gantt-resourcefields>
    <e-gantt-editsettings allowEditing="true" allowAdding="true" mode="Dialog"></e-gantt-editsettings>
    <e-gantt-adddialogfields>
        <e-gantt-adddialogfield type="General" headerText="General Tab"
            fields="@(new string[]{ "TaskId", "TaskName", "isParent" })">
        </e-gantt-adddialogfield>
        <e-gantt-adddialogfield type="Dependency"></e-gantt-adddialogfield>
    </e-gantt-adddialogfields>
    <e-gantt-editdialogfields>
        <e-gantt-editdialogfield type="General" headerText="General"
            fields="@(new string[]{ "TaskId", "TaskName", "isParent" })">
        </e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Dependency"></e-gantt-editdialogfield>
        <e-gantt-editdialogfield type="Resources"></e-gantt-editdialogfield>
    </e-gantt-editdialogfields>
</ejs-gantt>
```

> The `fields` attribute accepts a C# string array: `@(new string[]{ "field1", "field2" })`. Only fields listed will appear in the General tab of the dialog.

### Set Default Values on Add Dialog

Use the `actionBegin` event with `requestType == "beforeOpenAddDialog"` to pre-populate field values when the Add dialog opens:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           toolbar="@(new List<string>() { "Add" })"
           actionBegin="onActionBegin">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true"></e-gantt-editsettings>
</ejs-gantt>

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

## Taskbar Editing

Enable dragging and resizing taskbars directly in the chart area:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowTaskbarEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

**Taskbar editing interactions:**
- **Move:** Drag the taskbar body left/right to shift start/end dates
- **Resize left edge:** Change the start date
- **Resize right edge:** Change the end date / duration
- **Progress resize:** Drag the progress indicator handle to change % complete
- **Connector drag:** Hover over a taskbar endpoint (circle) and drag to another taskbar to create a dependency

### Prevent Taskbar Editing for Specific Tasks

Use the `taskbarEditing` event to cancel editing for specific tasks, and the `queryTaskbarInfo` event to visually hide the editing indicators:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           taskbarEditing="taskbarEditing"
           queryTaskbarInfo="queryTaskbarInfo">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowTaskbarEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function taskbarEditing(args) {
        if (args.data.TaskId == 4) { // Prevent editing Task ID 4
            args.cancel = true;
        }
    }
    function queryTaskbarInfo(args) {
        if (args.data.TaskId == 6) {
            args.taskbarElement.className += ' e-preventEdit'; // Hide edit indicators for Task ID 6
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

> `taskbarEditing` — set `args.cancel = true` to prevent editing that specific task.  
> `queryTaskbarInfo` — add a CSS class to hide resize/progress/connector indicators without blocking the event.

---

## Task Dependencies

Task dependencies (predecessor relationships) can be created and edited in three ways:

**Mouse interaction (connector drag):**  
Enable `allowTaskbarEditing="true"`. Hover over a taskbar until connector points appear, then drag to another taskbar. This creates an `FS` (Finish-to-Start) dependency.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
           endDate="EndDate" duration="Duration" progress="Progress"
           dependency="Dependency" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowTaskbarEditing="true" mode="Auto"></e-gantt-editsettings>
</ejs-gantt>
```

**Cell editing:**  
Type the dependency string directly into the Predecessor/Dependency column cell (e.g., `2`, `2FS`, `2SS+1`).

**Dialog editing (Dependency tab):**  
Open the Edit dialog → Dependency tab → select predecessor task and type. Supports all dependency types: `FS`, `SS`, `FF`, `SF`.

> Map the dependency field via `dependency="Dependency"` in `<e-gantt-taskfields>`. On mobile, only `FS` type can be created via taskbar drag; use cell or dialog for other types.

---

## Adding Tasks

Enable the Add toolbar button and configure where new rows are inserted:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           toolbar="@(new List<string>() { "Add" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true"></e-gantt-editsettings>
</ejs-gantt>
```

**Via context menu:** Enable `enableContextMenu="true"` — right-clicking a row shows **Add Above**, **Add Below**, **Add Child** options.

`newRowPosition` values on `<e-gantt-editsettings>`:

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
<ejs-button id="addRecord" content="Add Record" cssClass="e-primary"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true"></e-gantt-editsettings>
</ejs-gantt>

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

Enable deleting via the toolbar or programmatically:

```cshtml
<ejs-button id="deleteRecord" content="Delete Record" cssClass="e-primary"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowDeleting="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    document.getElementById('deleteRecord').addEventListener('click', function () {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.editModule.deleteRow();
    });
</script>
```

> When a parent task is deleted, all its child tasks are also deleted. A row must be selected before calling `deleteRow()`.

### Delete Confirmation Dialog

Set `showDeleteConfirmDialog="true"` on `<e-gantt-editsettings>` to require user confirmation before deleting:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           toolbar="@(new List<string>() { "Delete" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowDeleting="true" showDeleteConfirmDialog="true"></e-gantt-editsettings>
</ejs-gantt>
```

---

## Programmatic Update — updateRecordByID

Update an existing task record by its ID without using the edit dialog or cell editing:

```cshtml
<ejs-button id="updateRecord" content="Update Record" cssClass="e-primary"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>

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

> The data object **must** include the primary key field (`TaskId`) to identify the record to update. The `TaskId` itself cannot be changed via `updateRecordByID`. This method can be called from any custom action such as a button click.

---

## Indent and Outdent

Change a task's hierarchy level — **Indent** makes the task a child of the row above it; **Outdent** promotes it up one level.

**Via toolbar:** Add `"Indent"` and `"Outdent"` to the toolbar list:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           toolbar="@(new List<string>() { "Indent", "Outdent" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

**Programmatically:** Call `ganttObj.indent()` or `ganttObj.outdent()`:

```cshtml
<ejs-button id="indent" content="Indent" cssClass="e-primary"></ejs-button>
<ejs-button id="outdent" content="Outdent" cssClass="e-primary"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           toolbar="@(new List<string>() { "Indent", "Outdent" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    document.getElementById('indent').addEventListener('click', function () {
        document.getElementById('Gantt').ej2_instances[0].indent();
    });
    document.getElementById('outdent').addEventListener('click', function () {
        document.getElementById('Gantt').ej2_instances[0].outdent();
    });
</script>
```

> Indent/Outdent requires `allowEditing="true"` in `<e-gantt-editsettings>`.

---

## Splitting and Merging Tasks

Split a task into multiple segments to represent interrupted work periods.

**Enable splitting:** Map the segment collection via `segments` in `<e-gantt-taskfields>` and enable editing with `allowTaskbarEditing="true"`. Enable the context menu with `enableContextMenu="true"` for split/merge actions:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           enableContextMenu="true"
           toolbar="@(new List<string>() { "Add", "Cancel", "CollapseAll", "Delete", "Edit", "ExpandAll", "Update" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress"
            segments="Segments" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true"
                          allowTaskbarEditing="true" allowDeleting="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

**Data model with segments:**

```csharp
public class GanttTask
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public int Progress { get; set; }
    public List<GanttSegment> Segments { get; set; }
    public List<GanttTask> SubTasks { get; set; }
}

public class GanttSegment
{
    public DateTime StartDate { get; set; }
    public int Duration { get; set; }
}
```

**How to split/merge dynamically:**
- **Context menu:** Right-click a taskbar → **Split Task**; right-click a segment → **Merge Task**
- **Dialog:** Open the Edit dialog → **Segments** tab (visible when `segments` field is mapped)
- **UI drag:** Drag two segments together to merge them

**Limitations:**
- Parent and milestone tasks cannot be split
- Task width must be greater than one timeline unit cell to split
- Split tasks are not supported with Multi Taskbar mode

---

## Read-Only Gantt

Disable all create, update, and delete operations by setting `readOnly="true"` on the Gantt:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           enableContextMenu="true" readOnly="true"
           toolbar="@(new List<string>() { "Add", "Cancel", "Delete", "Edit", "Update" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true"
                          allowTaskbarEditing="true" allowDeleting="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

> Even when `allowEditing`, `allowAdding`, `allowDeleting` are all `true`, setting `readOnly="true"` on the Gantt component overrides them and prevents all modifications.

---

## Server-Side CRUD Persistence

Persist all changes to a remote database using UrlAdaptor with a batch URL:

```cshtml
<ejs-gantt id='RemoteData' treeColumnIndex="0" height="450px"
           projectStartDate="02/24/2019" projectEndDate="06/10/2019">
    <e-data-manager url="/Home/UrlDatasource" adaptor="UrlAdaptor"
                    batchUrl="Home/BatchSave">
    </e-data-manager>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
          duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**Controller: BatchSave method**

Handle all CRUD operations in a single `BatchSave` endpoint using the `added`, `changed`, and `deleted` collections:

```csharp
[HttpPost]
public ActionResult BatchSave([FromBody] ICRUDModel<GanttData> dm)
{
    if (dm.Added != null)
    {
        foreach (var task in dm.Added)
        {
            // Insert new task into database
            DataList.Insert(0, task);
        }
    }
    if (dm.Changed != null)
    {
        foreach (var task in dm.Changed)
        {
            // Update existing task in database
            var existing = DataList.FirstOrDefault(t => t.TaskId == task.TaskId);
            if (existing != null)
            {
                existing.TaskName = task.TaskName;
                existing.StartDate = task.StartDate;
                existing.Duration = task.Duration;
                existing.Progress = task.Progress;
            }
        }
    }
    if (dm.Deleted != null)
    {
        foreach (var task in dm.Deleted)
        {
            // Remove task and all its children from database
            DataList.Remove(DataList.FirstOrDefault(t => t.TaskId == task.TaskId));
        }
    }
    return Json(new { result = DataList, count = DataList.Count });
}
```

> In Gantt, all CRUD actions are treated as **batch** operations because editing one task may affect parent tasks, child tasks, and predecessor-linked tasks. The `batchUrl` controller method receives all affected records together.

**UrlAdaptor response format:**  
Return data as JSON with `result` (data array) and `count` (total record count) properties.

---

## Validation

### Column Validation

Set validation rules on `<e-gantt-column>` using `validationRules` as an inline anonymous C# object:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowSelection="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="150"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Job Name" width="250"
                        validationRules="@(new { required = true })">
        </e-gantt-column>
        <e-gantt-column field="StartDate"
                        validationRules="@(new { required = true, date = true })"
                        format="yMd" editType="datetimepickeredit" textAlign="Right" width="185">
        </e-gantt-column>
        <e-gantt-column field="EndDate"  validationRules="@(new { required = true })"></e-gantt-column>
        <e-gantt-column field="Duration" validationRules="@(new { required = true })"></e-gantt-column>
        <e-gantt-column field="Progress" validationRules="@(new { required = true })"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

Supported built-in validation rule keys: `required`, `min`, `max`, `date`, `minLength`, `maxLength`.

> `validationRules` is set as an inline anonymous object attribute on `<e-gantt-column>`. There is no `<e-gantt-column-validationrules>` child tag.

### Custom Validation

Define a custom validation function and attach it to a column's validation rules:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" load="load">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function load() {
        // Require TaskName to be at least 5 characters
        this.columns[1].validationRules = {
            required: true,
            minLength: [customFn, 'Value should be at least 5 characters']
        };
    }
    function customFn(args) {
        return args['value'].length >= 5;
    }
</script>
```

> Custom validation rules use a callback array: `[validationFunction, errorMessage]`. The function receives the `args` object with `args.value` being the current field value.

### Dependency and Resource Grid Validation

Apply validation rules to the Dependency and Resource grids inside the Add/Edit dialog using the `actionBegin` event:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           actionBegin="actionBegin">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress"
            dependency="Dependency" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowAdding="true" mode="Dialog"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function actionBegin(args) {
        if (args.requestType === 'beforeOpenEditDialog' || args.requestType === 'beforeOpenAddDialog') {
            // Access dialog via args.dialog to configure grid validation
            // for Dependency and Resources tabs
        }
    }
</script>
```

> Use `requestType` values `beforeOpenEditDialog` or `beforeOpenAddDialog` in the `actionBegin` event to access the dialog and configure grid validation rules for the Dependency and Resources tabs.
````
