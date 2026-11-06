# Events — Syncfusion ASP.NET MVC Gantt Chart

> **Scope:** This file is the comprehensive event reference. Events already covered in depth elsewhere are noted with cross-references.
> - Column drag events (`ColumnDragStart`, `ColumnDrag`, `ColumnDrop`) → `columns.md`
> - Column menu events (`ColumnMenuOpen`, `ColumnMenuClick`) → `columns.md`
> - Context menu events (`ContextMenuOpen`, `ContextMenuClick`) → `context-menu.md`
> - Row/cell selection events (basic usage) → `selection-scrolling.md`

## Table of Contents
- [Wiring Events in MVC Razor Helper Syntax](#wiring-events-in-mvc-razor-helper-syntax)
- [ActionBegin](#actionbegin)
- [ActionComplete](#actioncomplete)
- [ActionFailure](#actionfailure)
- [CellEdit](#celledit)
- [BeforeTooltipRender](#beforetooltiprender)
- [Row Selection Events](#row-selection-events)
- [Cell Selection Events](#cell-selection-events)
- [Export Events](#export-events)
- [requestType Reference](#requesttype-reference)

---

## Wiring Events in MVC Razor Helper Syntax

All Gantt events are wired as **method calls** on the `@Html.EJS().Gantt()` builder chain. The value is the name of a JavaScript function defined in a `<script>` block. The function receives an `args` object.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .ActionBegin("onActionBegin")
    .ActionComplete("onActionComplete")
    .ActionFailure("onActionFailure")
    .Height("450px")
    .Render()

<script>
function onActionBegin(args) { }
function onActionComplete(args) { }
function onActionFailure(args) { }
</script>
```

> There are **no server-side C# event handler methods** for these events. All event handling is in client-side JavaScript (`<script>` blocks in the `.cshtml` view).

---

## ActionBegin

Fires **before** Gantt processes any action. Supports cancellation via `args.cancel = true`.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .ActionBegin("onActionBegin")
    .Height("450px")
    .Render()

<script>
function onActionBegin(args) {
    if (args.requestType === 'beforeSave') {
        // Validate before saving — cancel if TaskName is empty
        if (!args.data.TaskName) {
            args.cancel = true;
            alert('Task Name is required.');
        }
    }
    if (args.requestType === 'beforeDelete') {
        // Confirm delete
        if (!confirm('Delete this task?')) {
            args.cancel = true;
        }
    }
    if (args.requestType === 'filtering') {
        console.log('Filtering column:', args.currentFilteringColumn);
    }
    if (args.requestType === 'sorting') {
        console.log('Sort column:', args.columnName, '| Direction:', args.direction);
    }
    if (args.requestType === 'validateDependency') {
        // Allow only FS dependency type
        if (args.dependency && args.dependency.type !== 'FS') {
            args.isValidLink = false;
        }
    }
}
</script>
```

**`args` properties by operation context:**

| Operation | Key `args` Properties |
|---|---|
| Add / Edit / Delete | `requestType` (`'beforeSave'`/`'beforeDelete'`), `cancel`, `action` (`'add'`/`'edit'`/`'delete'`), `data`, `newTaskData`, `modifiedRecords`, `recordIndex`, `rowPosition` |
| Taskbar editing | `requestType` (`'taskbarEditing'`), `cancel`, `projectStartDate`, `projectEndDate` |
| Filtering | `requestType` (`'filtering'`), `cancel`, `columns`, `currentFilterObject`, `currentFilteringColumn` |
| Sorting | `requestType` (`'sorting'`), `cancel`, `columnName`, `direction` |
| Dependency validation | `requestType` (`'validateDependency'`/`'updateDependency'`), `fromItem`, `toItem`, `isValidLink`, `newPredecessorString` |
| Zooming | `requestType` (`'beforeZoomIn'`/`'beforeZoomOut'`), `cancel`, `timeline` |

> `args.cancel = true` is supported for: `'beforeSave'`, `'beforeDelete'`, `'taskbarEditing'`, `'filtering'`, `'sorting'`, `'validateDependency'`, `'beforeZoomIn'`, `'beforeZoomOut'`.

---

## ActionComplete

Fires **after** an action has successfully completed.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .ActionComplete("onActionComplete")
    .Height("450px")
    .Render()

<script>
function onActionComplete(args) {
    switch (args.requestType) {
        case 'save':
            console.log('Task saved. Modified data:', args.modifiedTaskData);
            break;
        case 'delete':
            console.log('Task(s) deleted:', args.modifiedRecords);
            break;
        case 'filtering':
            console.log('Filter applied on:', args.currentFilteringColumn);
            break;
        case 'sorting':
            console.log('Sorted by:', args.columnName, args.direction);
            break;
        case 'AfterZoomIn':
        case 'AfterZoomOut':
        case 'AfterZoomToProject':
            console.log('New timeline config:', args.timeline);
            break;
    }
}
</script>
```

**`args` properties:**

| Property | Description |
|---|---|
| `requestType` | The completed action type (see [requestType Reference](#requesttype-reference)) |
| `data` | The task record involved in the action |
| `modifiedTaskData` | Updated task data after a `'save'` action |
| `modifiedRecords` | All records modified by the action (e.g., after `'delete'`) |
| `action` | Sub-action: `'add'`, `'edit'`, `'delete'` |
| `currentFilteringColumn` | Column name when `requestType` is `'filtering'` |
| `columnName` / `direction` | Column and direction when `requestType` is `'sorting'` |
| `timeline` | New timeline settings after zoom actions |

---

## ActionFailure

Fires when an operation fails (e.g., missing `IsPrimaryKey`, data source error, invalid configuration).

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .ActionFailure("onActionFailure")
    .Height("450px")
    .Render()

<script>
function onActionFailure(args) {
    console.error('Gantt action failure:', args.error[0].message);
}
</script>
```

| Property | Type | Description |
|---|---|---|
| `error` | `Error[]` | Array of error objects describing the failure |

**Common causes:**
- `IsPrimaryKey` not set on any column when CRUD is enabled
- Invalid or missing `TaskFields` mapping
- Remote data source request failure

---

## CellEdit

Fires when a TreeGrid cell **enters edit mode**. Use `args.cancel = true` to prevent the cell from becoming editable.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .EditSettings(es => es.AllowEditing(true).Mode(Syncfusion.EJ2.Gantt.EditMode.Auto))
    .CellEdit("onCellEdit")
    .Height("450px")
    .Render()

<script>
function onCellEdit(args) {
    // Prevent editing the StartDate column
    if (args.columnName === 'StartDate') {
        args.cancel = true;
    }
    // Prevent editing completed tasks
    if (args.rowData.Progress === 100) {
        args.cancel = true;
    }
}
</script>
```

| Property | Description |
|---|---|
| `cancel` | Set `true` to cancel editing for this cell |
| `cell` | The cell DOM element being edited |
| `columnName` | Field name of the column being edited |
| `columnObject` | Full column metadata object |
| `row` | The row DOM element |
| `rowData` | Full data object for the row (read before edit) |
| `value` | Current cell value before editing begins |
| `validationRules` | Validation rules configured for this column |

---

## BeforeTooltipRender

Fires before any tooltip renders. Use this event to customize tooltip content or cancel display. See [labels-and-tooltips.md](labels-and-tooltips.md) for detailed coverage.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .TooltipSettings(ts => ts.ShowTooltip(true))
    .BeforeTooltipRender("onBeforeTooltipRender")
    .Height("450px")
    .Render()

<script>
function onBeforeTooltipRender(args) {
    if (args.data && args.data.Duration === 0) {
        args.cancel = true;  // suppress tooltip on milestones
    }
}
</script>
```

---

## Row Selection Events

Four events cover the full row selection lifecycle:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .SelectionSettings(ss => ss.Mode(Syncfusion.EJ2.Grids.SelectionMode.Row).Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .RowSelecting("onRowSelecting")
    .RowSelected("onRowSelected")
    .RowDeselecting("onRowDeselecting")
    .RowDeselected("onRowDeselected")
    .Height("450px")
    .Render()

<script>
function onRowSelecting(args) {
    // Cancel selection of the first row
    if (args.rowIndex === 0) {
        args.cancel = true;
    }
}

function onRowSelected(args) {
    console.log('Selected task:', args.data.TaskName);
    console.log('Row index:', args.rowIndex);
}

function onRowDeselecting(args) {
    // args.cancel = true to prevent deselection
}

function onRowDeselected(args) {
    console.log('Deselected task:', args.data.TaskName);
}
</script>
```

**Event args properties:**

| Event | `cancel` | Key Properties |
|---|---|---|
| `RowSelecting` | ✅ Supported | `cancel`, `data`, `rowIndex`, `isCtrlPressed`, `isShiftPressed` |
| `RowSelected` | ❌ | `data`, `rowIndex`, `row` (HTMLElement) |
| `RowDeselecting` | ✅ Supported | `cancel`, `data`, `rowIndex` |
| `RowDeselected` | ❌ | `data`, `rowIndex` |

---

## Cell Selection Events

Requires `SelectionSettings.Mode(Cell)` or `Mode(Both)`.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks")
    )
    .SelectionSettings(ss => ss.Mode(Syncfusion.EJ2.Grids.SelectionMode.Cell).Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .CellSelecting("onCellSelecting")
    .CellSelected("onCellSelected")
    .CellDeselecting("onCellDeselecting")
    .CellDeselected("onCellDeselected")
    .Height("450px")
    .Render()

<script>
function onCellSelecting(args) {
    if (args.cellIndex && args.cellIndex.cellIndex === 0) {
        args.cancel = true;
    }
}

function onCellSelected(args) {
    var rowIndex = args.cellIndex.rowIndex;
    var colIndex = args.cellIndex.cellIndex;
    console.log('Selected cell at row ' + rowIndex + ', col ' + colIndex);
}

function onCellDeselecting(args) { }
function onCellDeselected(args) {
    console.log('Deselected cells:', args.cellIndexes);
}
</script>
```

---

## Export Events

### BeforeExcelExport

Fires before exporting to Excel or CSV. Cancel to abort export.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .AllowExcelExport(true)
    .BeforeExcelExport("onBeforeExcelExport")
    .Toolbar(new List<string> { "ExcelExport", "CsvExport" })
    .Height("450px")
    .Render()

<script>
function onBeforeExcelExport(args) {
    if (args.isCsv) {
        console.log('Exporting to CSV...');
    }
    // args.cancel = true to abort
}
</script>
```

### BeforePdfExport

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .AllowPdfExport(true)
    .BeforePdfExport("onBeforePdfExport")
    .Toolbar(new List<string> { "PdfExport" })
    .Height("450px")
    .Render()

<script>
function onBeforePdfExport(args) {
    console.log('About to export PDF...');
    // args.cancel = true to abort
}
</script>
```

### ExcelExportComplete / PdfExportComplete

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .ExcelExportComplete("onExcelExportComplete")
    .PdfExportComplete("onPdfExportComplete")
    .Toolbar(new List<string> { "ExcelExport", "PdfExport" })
    .Height("450px")
    .Render()

<script>
function onExcelExportComplete(args) {
    args.promise.then(function(e) {
        var blob = e.blobData;
        console.log('Excel blob size:', blob.size);
    });
}

function onPdfExportComplete(args) {
    args.promise.then(function(e) {
        console.log('PDF export complete');
    });
}
</script>
```

---

## requestType Reference

The `requestType` property in `ActionBegin` and `ActionComplete` identifies the specific operation.

| `requestType` | Event(s) | Description |
|---|---|---|
| `'beforeSave'` | `ActionBegin` | Before a task add or edit is saved |
| `'beforeDelete'` | `ActionBegin` | Before a task is deleted |
| `'save'` | `ActionComplete` | After a task add/edit is saved |
| `'delete'` | `ActionComplete` | After a task is deleted |
| `'taskbarEditing'` | `ActionBegin` | During taskbar drag or resize in the chart area |
| `'filtering'` | `ActionBegin` / `ActionComplete` | Filter applied on a column |
| `'filterAfterOpen'` | `ActionComplete` | Filter menu opened (no filter applied yet) |
| `'clearFilter'` | `ActionComplete` | Column filter cleared |
| `'sorting'` | `ActionBegin` / `ActionComplete` | Column sort applied |
| `'validateDependency'` | `ActionBegin` | Dependency connector draw — validate before adding |
| `'updateDependency'` | `ActionBegin` | Existing dependency being updated |
| `'beforeZoomIn'` | `ActionBegin` | Before zooming in on the timeline |
| `'beforeZoomOut'` | `ActionBegin` | Before zooming out on the timeline |
| `'AfterZoomIn'` | `ActionComplete` | After zoom in completes |
| `'AfterZoomOut'` | `ActionComplete` | After zoom out completes |
| `'AfterZoomToProject'` | `ActionComplete` | After zoom to fit completes |
| `'search'` | `ActionComplete` | After a search operation completes |
| `'columnstate'` | `ActionComplete` | After show/hide column change |
| `'rowDragAndDrop'` | `ActionComplete` | After row drag-and-drop completes |
| `'indent'` | `ActionComplete` | After row indent completes |
| `'outdent'` | `ActionComplete` | After row outdent completes |
