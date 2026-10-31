# Public Methods — Syncfusion ASP.NET Core Gantt Chart

> **Scope:** This file covers public methods not already documented in other reference files.
> Methods for editing, filtering, sorting, selection, export, columns, timeline zoom, undo/redo, critical path, splitter, toolbar, and loading spinner are documented in their respective reference files.

## Table of Contents
- [Data Access Methods](#data-access-methods)
  - [getCurrentViewData](#getcurrentviewdata)
  - [getExpandedRecords](#getexpandedrecords)
  - [getRecordByID](#getrecordbyid)
  - [getTaskByUniqueID](#gettaskbyuniqueid)
  - [getTaskInfo](#gettaskinfo)
  - [getRowByID](#getrowbyid)
  - [getRowByIndex](#getrowbyindex)
  - [getTaskbarHeight](#gettaskbarheight)
  - [getDurationString](#getdurationstring)
  - [getWorkString](#getworkstring)
  - [getGanttColumns](#getganttcolumns)
  - [getGridColumns](#getgridcolumns)
- [Row Expand and Collapse](#row-expand-and-collapse)
  - [expandAll / collapseAll](#expandall--collapseall)
  - [expandByID / collapseByID](#expandbyid--collapsebyid)
  - [expandByIndex / collapseByIndex](#expandbyindex--collapsebyindex)
- [Row Reordering](#row-reordering)
  - [reorderRows](#reorderrows)
- [Edit Utilities](#edit-utilities)
  - [cancelEdit](#canceledit)
  - [deleteRecord](#deleterecord)
  - [openAddDialog](#openadddialog)
  - [openEditDialog](#openeditdialog)
- [Task Utilities](#task-utilities)
  - [changeTaskMode](#changetaskmode)
  - [convertToMilestone](#converttomilestone)
  - [updateTaskId](#updatetaskid)
  - [updateRecordByID](#updaterecordbyid)
  - [updateRecordByIndex](#updaterecordbyindex)
  - [updateDataSource](#updatedatasource)
  - [updateProjectDates](#updateprojectdates)
- [Column Utilities](#column-utilities)
  - [autoFitColumns](#autofitcolumns)
  - [removeSortColumn](#removesortcolumn)
- [Undo/Redo Stack](#undoredo-stack)
  - [clearUndoCollection](#clearundocollection)
  - [clearRedoCollection](#clearredocollection)
  - [getUndoActions](#getundoactions)
  - [getRedoActions](#getredoactions)
- [Selection](#selection)
  - [selectCells](#selectcells)
- [Toolbar Items](#toolbar-items)
  - [enableItems](#enableitems)
- [Scrolling Methods](#scrolling-methods)
  - [scrollToDate](#scrolltodate)
  - [scrollToTask](#scrolltotask)
  - [setScrollTop](#setscrolltop)
  - [updateChartScrollOffset](#updatechartscrolloffset)
- [Search](#search)
  - [search](#search-1)
  - [mergeTask](#mergetask)
  - [splitTask](#splittask)
- [Component Lifecycle Methods](#component-lifecycle-methods)
  - [refresh](#refresh)
  - [dataBind](#databind)
  - [getRootElement](#getrootelement)
  - [addEventListener / removeEventListener](#addeventlistener--removeeventlistener)
  - [Inject](#inject)

---

## Data Access Methods

These methods retrieve data or DOM elements from the Gantt instance at runtime.

### getCurrentViewData

Returns the current view data array reflecting the latest state after filtering, sorting, and CRUD operations.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var viewData = ganttObj.getCurrentViewData();
console.log(viewData); // Array of current visible records
```

---

### getExpandedRecords

Returns only the expanded records from a given record collection.

| Parameter | Type | Description |
|---|---|---|
| `records` | `IGanttData[]` | The record collection to filter |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
// flatData contains all records in the full flattened tree (regardless of filter/sort)
var expanded = ganttObj.getExpandedRecords(ganttObj.flatData);
```

---

### getRecordByID

Returns the `IGanttData` object for a task by its ID value.

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The task ID |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var record = ganttObj.getRecordByID('3');
console.log(record.ganttProperties.taskName);
```

---

### getTaskByUniqueID

Returns the `IGanttData` object by the internal unique ID (assigned by Gantt internally, distinct from the user-defined task ID).

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The unique internal ID of the task |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var record = ganttObj.getTaskByUniqueID('someUniqueId');
```

---

### getTaskInfo

Retrieves internal Gantt rendering properties for a task — including taskbar width, left position, and segment collection.

| Parameter | Type | Description |
|---|---|---|
| `taskId` | `string` | The task ID |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var taskInfo = ganttObj.getTaskInfo('3');
console.log(taskInfo.left);      // Taskbar left offset (px)
console.log(taskInfo.width);     // Taskbar width (px)
console.log(taskInfo.segments);  // Segments collection (if split)
```

---

### getRowByID

Returns the HTML row element (`<tr>`) for a given task ID.

| Parameter | Type | Description |
|---|---|---|
| `id` | `string \| number` | The task ID |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var rowEl = ganttObj.getRowByID(3);
rowEl.style.background = 'lightyellow';
```

---

### getRowByIndex

Returns the HTML row element (`<tr>`) at a specific row index (0-based) in the chart area.

| Parameter | Type | Description |
|---|---|---|
| `index` | `number` | The 0-based row index |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var rowEl = ganttObj.getRowByIndex(2);
```

---

### getTaskbarHeight

Returns the current taskbar height (in pixels) as configured by the `taskbarHeight` property.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var height = ganttObj.getTaskbarHeight();
console.log(height); // e.g., 32
```

---

### getDurationString

Converts a numeric duration value and unit string into a human-readable combined string (e.g., `"3 days"`).

| Parameter | Type | Description |
|---|---|---|
| `duration` | `number` | Duration value |
| `durationUnit` | `string` | Unit string — `"day"`, `"hour"`, `"minute"` |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var durationStr = ganttObj.getDurationString(3, 'day');
console.log(durationStr); // "3 days"
```

---

### getWorkString

Converts a numeric work value and unit string into a human-readable combined string (e.g., `"8 hours"`).

| Parameter | Type | Description |
|---|---|---|
| `work` | `number` | Work value |
| `workUnit` | `string` | Unit string — `"day"`, `"hour"`, `"minute"` |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var workStr = ganttObj.getWorkString(8, 'hour');
console.log(workStr); // "8 hours"
```

---

### getGanttColumns

Returns the current Gantt column model definitions (the Gantt-level `ColumnModel[]` used for rendering).

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var columns = ganttObj.getGanttColumns();
console.log(columns.length); // number of visible columns
```

---

### getGridColumns

Returns the underlying TreeGrid `Column` objects. Useful for runtime updates to `visible`, `width`, or `format` without a full re-render.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var gridCols = ganttObj.getGridColumns();
// Programmatically hide a column
gridCols[2].visible = false;
```

---

## Row Expand and Collapse

### expandAll / collapseAll

Expands or collapses all rows in the Gantt tree grid.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.expandAll();
ganttObj.collapseAll();
```

> Equivalent toolbar actions: `"ExpandAll"` and `"CollapseAll"`.

---

### expandByID / collapseByID

Expand or collapse a specific row by its task ID.

| Parameter | Type | Description |
|---|---|---|
| `id` | `number \| string` | The task ID |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.expandByID(3);
ganttObj.collapseByID(3);
```

---

### expandByIndex / collapseByIndex

Expand or collapse a specific row by its row index (0-based).

| Parameter | Type | Description |
|---|---|---|
| `index` | `number \| number[]` (`expandByIndex`) | Row index or array of indexes |
| `index` | `number` (`collapseByIndex`) | Row index |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.expandByIndex([0, 2]);   // expand rows at index 0 and 2
ganttObj.collapseByIndex(1);      // collapse row at index 1
```

---

## Row Reordering

### reorderRows

Moves rows to a new position programmatically. Requires `allowRowDragAndDrop="true"`.

| Parameter | Type | Description |
|---|---|---|
| `fromIndexes` | `number[]` | Array of source row indexes (0-based) |
| `toIndex` | `number` | Destination row index |
| `position` | `string` | `"above"` \| `"below"` \| `"child"` |

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           allowRowDragAndDrop="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
document.getElementById('moveBtn').addEventListener('click', function () {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.reorderRows([2], 5, 'below');
});
</script>
```

---

## Edit Utilities

### cancelEdit

Cancels the currently active edit operation and reverts all unsaved changes, leaving the task record in its previous state.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.cancelEdit();
```

---

### deleteRecord

Deletes one or more task records by ID, by zero-based index, or by passing an `IGanttData` reference directly.

| Parameter | Type | Description |
|---|---|---|
| `taskDetail` | `number \| string \| number[] \| string[] \| object \| object[]` | Task ID(s), row index, or `IGanttData` reference(s) |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];

// Delete by single ID
ganttObj.deleteRecord(3);

// Delete multiple IDs
ganttObj.deleteRecord([2, 3, 5]);

// Delete by IGanttData reference
var record = ganttObj.getRecordByID('4');
ganttObj.deleteRecord(record);
```

> Requires `editSettings.allowDeleting="true"`. Triggers `actionBegin` with `requestType = 'beforeDelete'` — set `args.cancel = true` in that event to prevent deletion.

---

### openAddDialog

Opens the add-task dialog programmatically without the user clicking the toolbar **Add** button.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.openAddDialog();
```

> Requires `editSettings.allowAdding="true"` and dialog edit mode.

---

### openEditDialog

Opens the edit dialog for a specific task ID. If no ID is provided, opens the dialog for the currently selected row.

| Parameter | Type | Description |
|---|---|---|
| `taskId` *(optional)* | `number \| string` | The task ID to open the edit dialog for |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];

// Open edit dialog for task ID 3
ganttObj.openEditDialog(3);

// Open edit dialog for the currently selected row
ganttObj.openEditDialog();
```

> Requires `editSettings.allowEditing="true"` and dialog edit mode.

---

## Column Utilities

### autoFitColumns

Adjusts the width of one or more columns to fit their content automatically. Call inside `dataBound` to auto-fit on initial render.

| Parameter | Type | Description |
|---|---|---|
| `fieldNames` *(optional)* | `string \| string[]` | Column field name(s) to auto-fit. Omit to auto-fit all columns |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];

// Auto-fit a single column
ganttObj.autoFitColumns('TaskName');

// Auto-fit multiple columns
ganttObj.autoFitColumns(['TaskName', 'StartDate', 'Duration']);

// Auto-fit all columns
ganttObj.autoFitColumns();
```

---

### removeSortColumn

Removes the sort applied on a specific column without clearing sort on other columns.

| Parameter | Type | Description |
|---|---|---|
| `columnName` | `string` | The field name of the column whose sort should be removed |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.removeSortColumn('StartDate');
```

---

## Undo/Redo Stack

### clearUndoCollection

Clears the entire undo history stack, making it impossible to undo any previously performed actions.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.clearUndoCollection();
```

> Requires `enableUndoRedo="true"` on the `<ejs-gantt>` component.

---

### clearRedoCollection

Clears the entire redo history stack.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.clearRedoCollection();
```

> Requires `enableUndoRedo="true"` on the `<ejs-gantt>` component.

---

### getUndoActions

Returns the current undo stack as an array of action objects. Each item contains an `action` string (e.g., `'add'`, `'delete'`, `'sorting'`) and a `modifiedRecords` array.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var undoStack = ganttObj.getUndoActions();
undoStack.forEach(function(item) {
    console.log(item.action);
});
```

> Requires `enableUndoRedo="true"` on the `<ejs-gantt>` component.

---

### getRedoActions

Returns the current redo stack as an array of action objects, each with `action` and `modifiedRecords` properties.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var redoStack = ganttObj.getRedoActions();
redoStack.forEach(function(item) {
    console.log(item.action);
});
```

> Requires `enableUndoRedo="true"` on the `<ejs-gantt>` component.

---

## Selection

### selectCells

Selects multiple cells programmatically by providing an array of row-and-column-index pairs.

| Parameter | Type | Description |
|---|---|---|
| `rowCellIndexes` | `ISelectedCell[]` | Array of `{ rowIndex, cellIndexes }` objects |

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-selectionsettings mode="Cell" type="Multiple"></e-gantt-selectionsettings>
</ejs-gantt>

<script>
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.selectCells([
    { rowIndex: 0, cellIndexes: [1, 2] },
    { rowIndex: 2, cellIndexes: [0] }
]);
</script>
```

> Requires `selectionSettings.mode="Cell"`.

---

## Toolbar Items

### enableItems

Enables or disables specific toolbar items by their item ID strings at runtime.

| Parameter | Type | Description |
|---|---|---|
| `items` | `string[]` | Array of toolbar item ID strings |
| `isEnable` | `boolean` | `true` to enable; `false` to disable |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];

// Disable Add and Delete toolbar buttons
ganttObj.enableItems(['GanttToolbar_add', 'GanttToolbar_delete'], false);

// Re-enable them
ganttObj.enableItems(['GanttToolbar_add', 'GanttToolbar_delete'], true);
```

**Toolbar item ID pattern:** `{ganttId}_{itemName}` — e.g., for `id="Gantt"` the Add button ID is `GanttToolbar_add`.

---

## Task Utilities

### changeTaskMode

Changes the scheduling mode of a task at runtime. Requires the `taskMode` numeric value to be set on the record's task data before calling the method.

| Parameter | Type | Description |
|---|---|---|
| `data` | `Object` | Task data object with the updated `taskMode` numeric value |

**`taskMode` values:**

| Value | Mode |
|---|---|
| `0` | Auto |
| `1` | Manual |
| `2` | Custom |

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var record = ganttObj.getRecordByID('3');
if (record) {
    record.taskData.taskMode = 1; // 0=Auto, 1=Manual, 2=Custom
    ganttObj.changeTaskMode(record.taskData);
}
</script>
```

> To use mixed scheduling modes (some tasks Auto, some Manual), map a boolean field via `taskFields.manual` and use `taskMode="Custom"` on the `<ejs-gantt>` component.

---

### convertToMilestone

Converts a regular task to a milestone (zero-duration task displayed as a diamond).

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The task ID to convert |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.convertToMilestone('3');
```

> A milestone has a duration of 0. Converting a task clears its duration. Milestones display as a diamond shape in the chart area.

---

### updateTaskId

Updates an existing task's ID to a new unique ID. Useful when task IDs are reassigned after server-side operations.

| Parameter | Type | Description |
|---|---|---|
| `currentId` | `number \| string` | Existing task ID |
| `newId` | `number \| string` | New task ID to assign |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.updateTaskId(3, 99);
```

> After calling this method, all dependency references (predecessor strings) that referenced the old ID are automatically updated.

---

### updateDataSource

Replaces the entire Gantt data source at runtime, optionally updating project start/end dates.

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `Object[]` | New data source array |
| `args` | `object` | Optional — `{ projectStartDate, projectEndDate }` |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var newData = [
    { TaskId: 1, TaskName: 'New Task 1', StartDate: new Date('2024-01-01'), Duration: 5 }
];
ganttObj.updateDataSource(newData, {
    projectStartDate: new Date('2024-01-01'),
    projectEndDate: new Date('2024-06-30')
});
```

> Use this method to swap data entirely — e.g., on project or date range switch. For individual record updates, use `updateRecordByID`.

---

### updateRecordByID

Updates an existing task record matched by its primary key ID. Only the fields supplied in the data object are updated; all other fields remain unchanged.

| Parameter | Type | Description |
|---|---|---|
| `data` | `Object` | Object containing the task ID field and the fields to update |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.updateRecordByID({ TaskId: 3, TaskName: 'Revised Task', Duration: 7 });
```

---

### updateRecordByIndex

Updates a task record at the specified zero-based row index. Useful when the task ID is not known but the row position is.

| Parameter | Type | Description |
|---|---|---|
| `index` | `number` | Zero-based row index of the record to update |
| `data` | `Object` | Object containing the fields to update |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.updateRecordByIndex(2, { TaskName: 'Revised Task', Duration: 4 });
```

---

### updateProjectDates

Updates the project start and end dates at runtime, optionally rounding the dates to the nearest timeline unit boundary.

| Parameter | Type | Description |
|---|---|---|
| `startDate` | `Date` | New project start date |
| `endDate` | `Date` | New project end date |
| `isTimelineRoundOff` | `boolean` | When `true`, rounds dates to the nearest timeline unit boundary |
| `isFrom` *(optional)* | `string` | Origin context string passed internally by the Gantt framework |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.updateProjectDates(
    new Date('2024-01-01'),
    new Date('2024-12-31'),
    true  // round off to nearest timeline unit
);
```

---

## Scrolling Methods

### scrollToDate

Scrolls the Gantt chart's timeline horizontally to bring a specific date into view.

| Parameter | Type | Description |
|---|---|---|
| `date` | `string \| Date` | The target date to scroll to |

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<ejs-button id="scrollBtn" content="Scroll to Date" cssClass="e-primary"></ejs-button>

<script>
document.getElementById('scrollBtn').addEventListener('click', function () {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.scrollToDate('03/10/2024');
});
</script>
```

> Accepts both a date string (`'MM/DD/YYYY'`) or a JavaScript `Date` object.

---

### scrollToTask

Scrolls the chart's horizontal scrollbar to bring a specific task into view by its ID.

| Parameter | Type | Description |
|---|---|---|
| `taskId` | `string` | The task ID to scroll to |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.scrollToTask('5');
```

---

### setScrollTop

Sets the vertical scroll position of the Gantt chart container.

| Parameter | Type | Description |
|---|---|---|
| `scrollTop` | `number` | Scroll top value in pixels |

```cshtml
<ejs-button id="scrollTopBtn" content="Scroll to Row 10" cssClass="e-primary"></ejs-button>

<script>
document.getElementById('scrollTopBtn').addEventListener('click', function () {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.setScrollTop(400); // scroll 400px down
});
</script>
```

---

### updateChartScrollOffset

Updates both the horizontal (left) and vertical (top) scroll positions of the Gantt chart simultaneously.

| Parameter | Type | Description |
|---|---|---|
| `left` | `number` | Horizontal scroll offset in pixels |
| `top` | `number` | Vertical scroll offset in pixels |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.updateChartScrollOffset(200, 100);
```

---

## Search

### search

Performs a search across all displayed columns using the given keyword. Equivalent to typing in the search toolbar box.

| Parameter | Type | Description |
|---|---|---|
| `keyVal` | `string` | The search keyword |

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           toolbar="@(new List<string>() { "Search" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-searchsettings fields="@(new string[]{"TaskName"})"
                            operator="contains"
                            ignoreCase="true">
    </e-gantt-searchsettings>
</ejs-gantt>

<ejs-button id="searchBtn" content="Search" cssClass="e-primary"></ejs-button>
<input type="text" id="searchInput" placeholder="Enter keyword" />

<script>
document.getElementById('searchBtn').addEventListener('click', function () {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    var keyword = document.getElementById('searchInput').value;
    ganttObj.search(keyword);
});
</script>
```

**Search settings** (`<e-gantt-searchsettings>`):

| Property | Type | Description |
|---|---|---|
| `fields` | `string[]` | Columns to search. Defaults to all displayed columns |
| `operator` | `string` | `"startsWith"` \| `"endsWith"` \| `"contains"` (default: `"contains"`) |
| `key` | `string` | Initial search keyword |
| `ignoreCase` | `bool` | Case-insensitive search (default: `true`) |

> To clear search programmatically, call `ganttObj.search('')`.

---

## Component Lifecycle Methods

### refresh

Re-renders the entire Gantt component, applying all pending property changes.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.refresh();
```

> Use `refresh()` after modifying properties that do not auto-update (e.g., data source bindings changed externally). For property changes that support reactive updates, prefer setting the property directly.

---

### dataBind

Applies all pending property changes immediately without a full re-render.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.height = '600px';
ganttObj.dataBind(); // applies the height change immediately
```

---

## mergeTask

Merges previously split task segments back into one taskbar.

| Parameter | Type | Description |
|---|---|---|
| `taskId` | `number \| string` | ID of the split task. |
| `segmentIndexes` | `Object[]` | Array of `{ firstSegmentIndex: number, secondSegmentIndex: number }` segment index objects to merge. |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.mergeTask(3, [{ firstSegmentIndex: 0, secondSegmentIndex: 1 }]);
```

> Requires `editSettings.allowTaskbarEditing: true`

---

## splitTask

Splits a task's taskbar into segments at the given date(s).

| Parameter | Type | Description |
|---|---|---|
| `taskId` | `number \| string` | ID of the task to split. |
| `splitDate` | `Date \| Date[]` | Date or array of dates at which to split. |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
ganttObj.splitTask(3, new Date('2024-04-10'));
ganttObj.splitTask(3, [new Date('2024-04-10'), new Date('2024-04-20')]);
```

> Requires `editSettings.allowTaskbarEditing: true`. Parent tasks and milestones cannot be split.

---

### getRootElement

Returns the root HTML element of the Gantt component.

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
var rootEl = ganttObj.getRootElement();
console.log(rootEl.id); // 'Gantt'
```

---

### addEventListener / removeEventListener

Attaches or removes a named event handler on the Gantt instance. These are lower-level wrappers around the Gantt event system.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | Name of the event (e.g., `"actionComplete"`) |
| `handler` | `Function` | The callback function |

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];

function onActionComplete(args) {
    console.log('Action:', args.requestType);
}

// Attach
ganttObj.addEventListener('actionComplete', onActionComplete);

// Detach
ganttObj.removeEventListener('actionComplete', onActionComplete);
```

> Prefer wiring events via the Tag Helper attributes (e.g., `actionComplete="myHandler"`) for server-rendered Gantt components. Use `addEventListener`/`removeEventListener` when dynamically subscribing at runtime.

---

### Inject

Dynamically injects feature modules into the Gantt component. In ASP.NET Core, most modules are auto-injected when the corresponding features are configured via Tag Helpers. Manual injection is needed only in JavaScript-heavy scenarios.

| Parameter | Type | Description |
|---|---|---|
| `moduleList` | `Function[]` | Array of module constructors to inject |

```javascript
// Example: manually inject modules in JavaScript
ej.gantt.Gantt.Inject(
    ej.gantt.Filter,
    ej.gantt.Sort,
    ej.gantt.Edit,
    ej.gantt.Selection,
    ej.gantt.Toolbar,
    ej.gantt.ExcelExport,
    ej.gantt.PdfExport,
    ej.gantt.UndoRedo,
    ej.gantt.CriticalPath,
    ej.gantt.VirtualScroll,
    ej.gantt.RowDD
);
```

**Common modules:**

| Module | Required For |
|---|---|
| `ej.gantt.Filter` | Filtering and search |
| `ej.gantt.Sort` | Column sorting |
| `ej.gantt.Edit` | CRUD editing (add, edit, delete) |
| `ej.gantt.Selection` | Row/cell selection |
| `ej.gantt.Toolbar` | Toolbar |
| `ej.gantt.ExcelExport` | Excel / CSV export |
| `ej.gantt.PdfExport` | PDF export |
| `ej.gantt.UndoRedo` | Undo / Redo |
| `ej.gantt.CriticalPath` | Critical path highlighting |
| `ej.gantt.VirtualScroll` | Row and timeline virtualization |
| `ej.gantt.RowDD` | Row drag and drop |
| `ej.gantt.ColumnMenu` | Column menu |
| `ej.gantt.Reorder` | Column reordering |
| `ej.gantt.Resize` | Column resizing |

> In ASP.NET Core Tag Helper usage, module injection is handled automatically by the Syncfusion script bundle when features are configured through Tag Helper properties.
