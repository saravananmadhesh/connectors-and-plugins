# Events — Syncfusion ASP.NET Core Gantt Chart

> **Scope:** This file is the comprehensive event reference. Events already covered in depth elsewhere are noted with cross-references.
> - Column drag events (`columnDragStart`, `columnDrag`, `columnDrop`) → `columns.md`
> - Column menu events (`columnMenuOpen`, `columnMenuClick`) → `columns.md`
> - Context menu events (`contextMenuOpen`, `contextMenuClick`) → `context-menu.md`
> - Row/cell selection events (basic usage) → `selection.md`

## Table of Contents
- [Wiring Events in Tag Helper Syntax](#wiring-events-in-tag-helper-syntax)
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [actionFailure](#actionfailure)
- [cellEdit](#celledit)
- [beforeTooltipRender](#beforetooltiprender)
- [Row Selection Events](#row-selection-events)
- [Cell Selection Events](#cell-selection-events)
- [Export Events](#export-events)
- [requestType Reference](#requesttype-reference)

---

## Wiring Events in Tag Helper Syntax

All Gantt events are wired as **camelCase attributes** directly on `<ejs-gantt>`. The attribute value is the name of a JavaScript function defined in a `<script>` block. The function receives an `args` object.

```cshtml
<ejs-gantt id="Gantt"
           dataSource="ViewBag.DataSource"
           height="450px"
           actionBegin="onActionBegin"
           actionComplete="onActionComplete"
           actionFailure="onActionFailure">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function onActionBegin(args) { }
function onActionComplete(args) { }
function onActionFailure(args) { }
</script>
```

> There are **no server-side C# event handler methods** for these events. All event handling is in client-side JavaScript (`<script>` blocks in the `.cshtml` view).

---

## actionBegin

Fires **before** Gantt processes any action. Supports cancellation via `args.cancel = true`.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           actionBegin="onActionBegin">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

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

## actionComplete

Fires **after** an action has successfully completed.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           actionComplete="onActionComplete">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

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

## actionFailure

Fires when an operation fails (e.g., missing `isPrimaryKey`, data source error, invalid configuration).

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           actionFailure="onActionFailure">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

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
- `isPrimaryKey` not set on any column when CRUD is enabled
- Invalid or missing `taskFields` mapping
- Remote data source request failure

---

## cellEdit

Fires when a TreeGrid cell **enters edit mode**. Use `args.cancel = true` to prevent the cell from becoming editable.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           cellEdit="onCellEdit">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" mode="Auto"></e-gantt-editsettings>
</ejs-gantt>

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

## beforeTooltipRender

Fires before any tooltip renders — covers taskbar tooltip, connector line tooltip, baseline tooltip, and timeline header tooltip. Use this event to customize tooltip content or cancel display.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           beforeTooltipRender="onBeforeTooltipRender">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-tooltipsettings showTooltip="true"></e-gantt-tooltipsettings>
</ejs-gantt>

<script>
function onBeforeTooltipRender(args) {
    // Customize taskbar tooltip content
    if (args.args.target && args.args.target.classList.contains('e-gantt-child-taskbar')) {
        var task = args.data;
        args.content = '<b>' + task.TaskName + '</b><br/>'
                     + 'Start: ' + task.StartDate.toLocaleDateString() + '<br/>'
                     + 'Duration: ' + task.Duration + ' days<br/>'
                     + 'Progress: ' + task.Progress + '%';
    }
    // Suppress tooltip on milestone tasks
    if (args.data && args.data.Duration === 0) {
        args.cancel = true;
    }
}
</script>
```

| Property | Description |
|---|---|
| `args` | Event context — contains `target` (DOM element that triggered tooltip) |
| `content` | Tooltip HTML string — override to customize display |
| `cancel` | Set `true` to prevent the tooltip from showing |
| `data` | The `IGanttData` task object associated with the hovered element |

> To set a static tooltip template for all taskbars, use `<e-gantt-tooltipsettings>` with a template attribute instead of this event. Use `beforeTooltipRender` when you need **dynamic, per-task** content.

---

## Row Selection Events

Four events cover the full row selection lifecycle. All four are wired as attributes on `<ejs-gantt>`.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           rowSelecting="onRowSelecting"
           rowSelected="onRowSelected"
           rowDeselecting="onRowDeselecting"
           rowDeselected="onRowDeselected">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-selectionsettings mode="Row" type="Multiple"></e-gantt-selectionsettings>
</ejs-gantt>

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
    console.log('Row element:', args.row);
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
| `rowSelecting` | ✅ Supported | `cancel`, `data`, `rowIndex`, `isCtrlPressed`, `isShiftPressed` |
| `rowSelected` | ❌ | `data`, `rowIndex`, `row` (HTMLElement) |
| `rowDeselecting` | ✅ Supported | `cancel`, `data`, `rowIndex` |
| `rowDeselected` | ❌ | `data`, `rowIndex` |

> `args.data` returns a single `IGanttData` object for single selection, or an array for multiple selection.

---

## Cell Selection Events

Requires `<e-gantt-selectionsettings mode="Cell">` or `mode="Both"`.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           cellSelecting="onCellSelecting"
           cellSelected="onCellSelected"
           cellDeselecting="onCellDeselecting"
           cellDeselected="onCellDeselected">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-selectionsettings mode="Cell" type="Multiple"></e-gantt-selectionsettings>
</ejs-gantt>

<script>
function onCellSelecting(args) {
    // Cancel selection of cells in column index 0
    if (args.cellIndex && args.cellIndex.cellIndex === 0) {
        args.cancel = true;
    }
}

function onCellSelected(args) {
    var rowIndex = args.cellIndex.rowIndex;
    var colIndex = args.cellIndex.cellIndex;
    console.log('Selected cell at row ' + rowIndex + ', col ' + colIndex);
    console.log('Row data:', args.data);
}

function onCellDeselecting(args) {
    // args.cancel = true to keep cell selected
}

function onCellDeselected(args) {
    console.log('Deselected cells:', args.cellIndexes);
}
</script>
```

**`cellSelecting` / `cellSelected` args (`CellSelectEventArgs`):**

| Property | Description |
|---|---|
| `cancel` | (`cellSelecting` only) Set `true` to cancel selection |
| `cellIndex` | `{ rowIndex, cellIndex }` — row and column index of target cell |
| `cells` | Array of DOM elements of all selected cells |
| `currentCell` | DOM element of the cell being selected |
| `data` | Row data object for the cell |
| `previousRowCell` | Previously selected cell DOM element |
| `previousRowCellIndex` | Index object of the previously selected cell |
| `selectedRowCellIndex` | Array of `{ rowIndex, cellIndexes }` for current selection |

**`cellDeselecting` / `cellDeselected` args (`CellDeselectEventArgs`):**

| Property | Description |
|---|---|
| `cancel` | (`cellDeselecting` only) Set `true` to cancel deselection |
| `cellIndexes` | Array of `{ rowIndex, cellIndex }` objects being deselected |
| `cells` | DOM elements of the deselecting cells |
| `data` | Row data for the deselecting cell |

---

## Export Events

### beforeExcelExport

Fires before exporting to Excel or CSV. Cancel to abort export.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           allowExcelExport="true"
           beforeExcelExport="onBeforeExcelExport"
           toolbar="@(new List<string>() { "ExcelExport", "CsvExport" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function onBeforeExcelExport(args) {
    // args.isCsv is true when exporting as CSV
    if (args.isCsv) {
        console.log('Exporting to CSV...');
    } else {
        console.log('Exporting to Excel...');
    }
    // args.cancel = true to abort
}
</script>
```

| Property | Description |
|---|---|
| `cancel` | Set `true` to cancel export |
| `isCsv` | `true` when exporting as CSV; `false` for Excel |
| `name` | Event name: `'beforeExcelExport'` |

---

### beforePdfExport

Fires before PDF export. Cancel to abort.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           allowPdfExport="true"
           beforePdfExport="onBeforePdfExport"
           toolbar="@(new List<string>() { "PdfExport" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function onBeforePdfExport(args) {
    // args.cancel = true to abort export
    console.log('About to export PDF...');
}
</script>
```

| Property | Description |
|---|---|
| `cancel` | Set `true` to cancel export |
| `ganttObject` | Reference to the Gantt component instance |
| `name` | Event name: `'beforePdfExport'` |
| `requestType` | `'beforePdfExport'` |

---

### excelExportComplete / pdfExportComplete

Fire after export finishes. Use `args.promise` to access the blob for custom download handling.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           allowExcelExport="true"
           allowPdfExport="true"
           excelExportComplete="onExcelExportComplete"
           pdfExportComplete="onPdfExportComplete"
           toolbar="@(new List<string>() { "ExcelExport", "PdfExport" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function onExcelExportComplete(args) {
    // Access the exported blob for custom handling (e.g., upload to server)
    args.promise.then(function(e) {
        var blob = e.blobData;
        console.log('Excel blob size:', blob.size);
        // Custom upload or processing
    });
}

function onPdfExportComplete(args) {
    args.promise.then(function(e) {
        var blob = e.blobData;
        console.log('PDF blob size:', blob.size);
    });
}
</script>
```

> `args.promise` resolves with `{ blobData: Blob }`. The default file download still occurs unless you use `isBlob: true` in export properties. Use these events to trigger post-export actions like uploading the file or showing a notification.

---

## requestType Reference

The `requestType` property in `actionBegin` and `actionComplete` identifies the specific operation.

| `requestType` | Event(s) | Description |
|---|---|---|
| `'beforeSave'` | `actionBegin` | Before a task add or edit is saved |
| `'beforeDelete'` | `actionBegin` | Before a task is deleted |
| `'save'` | `actionComplete` | After a task add/edit is saved |
| `'delete'` | `actionComplete` | After a task is deleted |
| `'taskbarEditing'` | `actionBegin` | During taskbar drag or resize in the chart area |
| `'filtering'` | `actionBegin` / `actionComplete` | Filter applied on a column |
| `'filterAfterOpen'` | `actionComplete` | Filter menu opened (no filter applied yet) |
| `'clearFilter'` | `actionComplete` | Column filter cleared |
| `'sorting'` | `actionBegin` / `actionComplete` | Column sort applied |
| `'validateDependency'` | `actionBegin` | Dependency connector draw — validate before adding |
| `'updateDependency'` | `actionBegin` | Existing dependency being updated |
| `'beforeZoomIn'` | `actionBegin` | Before zooming in on the timeline |
| `'beforeZoomOut'` | `actionBegin` | Before zooming out on the timeline |
| `'AfterZoomIn'` | `actionComplete` | After zoom in completes |
| `'AfterZoomOut'` | `actionComplete` | After zoom out completes |
| `'AfterZoomToProject'` | `actionComplete` | After zoom to fit completes |
| `'search'` | `actionComplete` | After a search operation completes |
| `'columnstate'` | `actionComplete` | After show/hide column change |
| `'rowDragAndDrop'` | `actionComplete` | After row drag-and-drop completes |
| `'indent'` | `actionComplete` | After row indent completes |
| `'outdent'` | `actionComplete` | After row outdent completes |
