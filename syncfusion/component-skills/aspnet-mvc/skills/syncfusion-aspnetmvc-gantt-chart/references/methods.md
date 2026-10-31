# Public Methods — Syncfusion ASP.NET MVC Gantt Chart

> **Scope:** This file covers public methods not already documented in other reference files.
> Methods for editing, filtering, sorting, selection, export, columns, timeline zoom, undo/redo, critical path, splitter, toolbar, and loading spinner are documented in their respective reference files.

## Table of Contents
- [Data Access Methods](#data-access-methods)
- [Row Expand and Collapse](#row-expand-and-collapse)
- [Row Reordering](#row-reordering)
- [Edit Utilities](#edit-utilities)
- [Task Utilities](#task-utilities)
- [Column Utilities](#column-utilities)
- [Scrolling Methods](#scrolling-methods)
- [Search](#search)
- [Component Lifecycle Methods](#component-lifecycle-methods)
- [Split and Merge Tasks](#split-and-merge-tasks)
- [Selection](#selection)
  - [selectCells](#selectcells)

---

## Data Access Methods

These methods retrieve data or DOM elements from the Gantt instance at runtime. Access the Gantt instance in JavaScript via `document.getElementById('gantt').ej2_instances[0]`.

### getCurrentViewData

Returns the current view data array reflecting the latest state after filtering, sorting, and CRUD operations.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var viewData = ganttObj.getCurrentViewData();
console.log(viewData);
```

### getExpandedRecords

Returns only the expanded records from a given record collection.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var expanded = ganttObj.getExpandedRecords(ganttObj.flatData);
```

### getRecordByID

Returns the task data object for a task by its ID value.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var record = ganttObj.getRecordByID('3');
console.log(record.ganttProperties.taskName);
```

### getTaskByUniqueID

Returns the task data object by the internal unique ID (assigned by Gantt internally).

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var record = ganttObj.getTaskByUniqueID('someUniqueId');
```

### getRowByID

Returns the HTML row element (`<tr>`) for a given task ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var rowEl = ganttObj.getRowByID(3);
rowEl.style.background = 'lightyellow';
```

### getRowByIndex

Returns the HTML row element (`<tr>`) at a specific row index (0-based) in the chart area.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var rowEl = ganttObj.getRowByIndex(2);
```

### getDurationString

Converts a numeric duration value and unit string into a human-readable combined string (e.g., `"3 days"`).

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var durationStr = ganttObj.getDurationString(3, 'day');
console.log(durationStr); // "3 days"
```

### getGanttColumns

Returns the current Gantt column model definitions.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var columns = ganttObj.getGanttColumns();
console.log(columns.length);
```

### getGridColumns

Returns the underlying TreeGrid `Column` objects. Useful for runtime updates to `visible`, `width`, or `format`.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var gridCols = ganttObj.getGridColumns();
gridCols[2].visible = false;
```

---

## Row Expand and Collapse

### expandAll / collapseAll

Expands or collapses all rows in the Gantt tree grid.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.expandAll();
ganttObj.collapseAll();
```

### expandByID / collapseByID

Expand or collapse a specific row by its task ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.expandByID(3);
ganttObj.collapseByID(3);
```

### expandByIndex / collapseByIndex

Expand or collapse a specific row by its row index (0-based).

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.expandByIndex([0, 2]);   // expand rows at index 0 and 2
ganttObj.collapseByIndex(1);      // collapse row at index 1
```

---

## Row Reordering

### reorderRows

Moves rows to a new position programmatically. Requires `AllowRowDragAndDrop(true)`.

| Parameter | Type | Description |
|---|---|---|
| `fromIndexes` | `number[]` | Array of source row indexes (0-based) |
| `toIndex` | `number` | Destination row index |
| `position` | `string` | `"above"` \| `"below"` \| `"child"` |

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.reorderRows([2], 5, 'below');
```

---

## Edit Utilities

### cancelEdit

Cancels the currently active edit operation and reverts all unsaved changes.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.cancelEdit();
```

### deleteRecord

Deletes one or more task records by ID, by zero-based index, or by passing a task data reference.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];

// Delete by single ID
ganttObj.deleteRecord(3);

// Delete multiple IDs
ganttObj.deleteRecord([2, 3, 5]);
```

> Requires `EditSettings.AllowDeleting(true)`.

### openAddDialog

Opens the add-task dialog programmatically.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.openAddDialog();
```

### openEditDialog

Opens the edit dialog for a specific task ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.openEditDialog(3);
```

---

## Task Utilities

### updateDataSource

Replaces the entire Gantt data source at runtime, optionally updating project start/end dates.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var newData = [
    { TaskId: 1, TaskName: 'New Task 1', StartDate: new Date('2024-01-01'), Duration: 5 }
];
ganttObj.updateDataSource(newData, {
    projectStartDate: new Date('2024-01-01'),
    projectEndDate: new Date('2024-06-30')
});
```

### updateRecordByID

Updates an existing task record matched by its primary key ID. Only the fields supplied are updated.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.updateRecordByID({ TaskId: 3, TaskName: 'Revised Task', Duration: 7 });
```

### updateRecordByIndex

Updates a task record at the specified zero-based row index.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.updateRecordByIndex(2, { TaskName: 'Revised Task', Duration: 4 });
```

### updateProjectDates

Updates the project start and end dates at runtime.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.updateProjectDates(
    new Date('2024-01-01'),
    new Date('2024-12-31'),
    true  // round off to nearest timeline unit
);
```

### convertToMilestone

Converts a regular task to a milestone (zero-duration task displayed as a diamond).

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.convertToMilestone('3');
```

### updateTaskId

Updates an existing task's ID to a new unique ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.updateTaskId(3, 99);
```

> After calling this method, all dependency references that referenced the old ID are automatically updated.

---

## Column Utilities

### autoFitColumns

Adjusts the width of one or more columns to fit their content automatically.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];

// Auto-fit a single column
ganttObj.autoFitColumns('TaskName');

// Auto-fit multiple columns
ganttObj.autoFitColumns(['TaskName', 'StartDate', 'Duration']);

// Auto-fit all columns
ganttObj.autoFitColumns();
```

### removeSortColumn

Removes the sort applied on a specific column without clearing sort on other columns.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.removeSortColumn('StartDate');
```

---

## Scrolling Methods

### scrollToDate

Scrolls the Gantt chart's timeline horizontally to bring a specific date into view.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.scrollToDate('03/10/2024');
```

### scrollToTask

Scrolls the chart's horizontal scrollbar to bring a specific task into view by its ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.scrollToTask('5');
```

### updateChartScrollOffset

Updates both the horizontal (left) and vertical (top) scroll positions simultaneously.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.updateChartScrollOffset(200, 100);
```

---

## Search

### search

Performs a search across all displayed columns using the given keyword.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.search('Design');        // trigger search
ganttObj.search('');              // clear search
```

---

## Component Lifecycle Methods

### refresh

Re-renders the entire Gantt component, applying all pending property changes.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.refresh();
```

### dataBind

Applies all pending property changes immediately without a full re-render.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.height = '600px';
ganttObj.dataBind();
```

### addEventListener / removeEventListener

Attaches or removes a named event handler on the Gantt instance at runtime.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];

function onActionComplete(args) {
    console.log('Action:', args.requestType);
}

ganttObj.addEventListener('actionComplete', onActionComplete);
ganttObj.removeEventListener('actionComplete', onActionComplete);
```

---

## Split and Merge Tasks

### splitTask

Splits a task's taskbar into segments at the given date(s). Requires `EditSettings.AllowTaskbarEditing(true)`.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.splitTask(3, new Date('2024-04-10'));
ganttObj.splitTask(3, [new Date('2024-04-10'), new Date('2024-04-20')]);
```

### mergeTask

Merges previously split task segments back into one taskbar. Requires `EditSettings.AllowTaskbarEditing(true)`.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.mergeTask(3, [{ firstSegmentIndex: 0, secondSegmentIndex: 1 }]);
```

### changeTaskMode

Switches the Gantt editing mode for a task (for example, from view mode to edit mode).

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.changeTaskMode(3, 'Edit');
```

### clearRedoCollection

Clears the redo collection used by undo/redo operations.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.clearRedoCollection();
```

### clearUndoCollection

Clears the undo collection used by undo/redo operations.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.clearUndoCollection();
```

### collapseByIndex

Collapses rows by their row index (0-based) in the chart area.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.collapseByIndex(1);
```

### collapseByID

Collapses a row by its task ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.collapseByID(3);
```

### enableItems

Enables the specified set of Gantt items.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.enableItems([3, 4], true);
```

### expandByIndex

Expands rows by their row index (0-based) in the chart area.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.expandByIndex([0, 2]);
```

### expandByID

Expands a row by its task ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.expandByID(3);
```

### getTaskInfo

Returns task information for a given task ID.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var info = ganttObj.getTaskInfo(3);
console.log(info);
```

### getTaskbarHeight

Returns the current height of the taskbar.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var h = ganttObj.getTaskbarHeight();
console.log(h);
```

### getUndoActions

Returns the list of available undo actions.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var actions = ganttObj.getUndoActions();
console.log(actions);
```

### getRedoActions

Returns the list of available redo actions.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var actions = ganttObj.getRedoActions();
console.log(actions);
```

### getWorkString

Converts work quantity and unit string into a human-readable work summary.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var workStr = ganttObj.getWorkString(8, 'hour');
console.log(workStr); // "8 hours"
```

### selectCells

Programmatically selects one or more cells.

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.selectCells([{ index: 2, col: 'TaskName' }]);
```
