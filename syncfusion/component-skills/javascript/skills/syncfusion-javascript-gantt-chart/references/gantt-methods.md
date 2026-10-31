# Gantt Chart - Programmatic Methods Reference

Programmatic methods for runtime control of the Syncfusion EJ2 Gantt Chart in JavaScript/TypeScript.

## Table of Contents
- [autoFitColumns](#autofitcolumns)
- [cancelEdit](#canceledit)
- [changeTaskMode](#changetaskmode)
- [clearRedoCollection](#clearredocollection)
- [clearUndoCollection](#clearundocollection)
- [collapseByIndex](#collapsebyindex)
- [collapseByID](#collapsebyid)
- [convertToMilestone](#converttomilestone)
- [deleteRecord](#deleterecord)
- [enableItems](#enableitems)
- [expandByIndex](#expandbyindex)
- [expandByID](#expandbyid)
- [getCriticalTasks](#getcriticaltasks)
- [getCurrentViewData](#getcurrentviewdata)
- [getDurationString](#getdurationstring)
- [getExpandedRecords](#getexpandedrecords)
- [getGanttColumns](#getganttcolumns)
- [getGridColumns](#getgridcolumns)
- [getRecordByID](#getrecordbyid)
- [getRedoActions](#getredoactions)
- [getRowByID](#getrowbyid)
- [getRowByIndex](#getrowbyindex)
- [getTaskByUniqueID](#gettaskbyuniqueid)
- [getTaskInfo](#gettaskinfo)
- [getTaskbarHeight](#gettaskbarheight)
- [getUndoActions](#getundoactions)
- [getWorkString](#getworkstring)
- [mergeTask](#mergetask)
- [openAddDialog](#openadddialog)
- [openEditDialog](#openeditdialog)
- [refreshColumns](#refreshcolumns)
- [removePredecessor](#removepredecessor)
- [removeSortColumn](#removesortcolumn)
- [reorderColumns](#reordercolumns)
- [reorderRows](#reorderrows)
- [scrollToTask](#scrolltotask)
- [selectCells](#selectcells)
- [setScrollTop](#setscrolltop)
- [splitTask](#splittask)
- [updateChartScrollOffset](#updatechartscrolloffset)
- [updateDataSource](#updatedatasource)
- [updateProjectDates](#updateprojectdates)
- [updateRecordByIndex](#updaterecordbyindex)
- [updateRecordByID](#updaterecordbyId)
- [updateTaskId](#updatetaskid)

---

## autoFitColumns

Adjusts column width(s) to fit their content. Call inside `dataBound` for initial render.

```typescript
gantt.autoFitColumns('TaskName');                          // single column
gantt.autoFitColumns(['TaskName', 'StartDate', 'Duration']); // multiple columns
gantt.autoFitColumns();                                    // all columns
```

---

## cancelEdit

Cancels the active edit operation and reverts unsaved changes.

```typescript
gantt.cancelEdit();
```

> Requires `editSettings.allowEditing: true` and `Edit` module injected.

---

## changeTaskMode

Changes a task's scheduling mode at runtime.

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `Object` | Task data object with updated `taskMode` value: `0`=Auto, `1`=Manual, `2`=Custom |

```typescript
const record = gantt.getRecordByID('3');
record.taskData.taskMode = 1;  // 0=Auto, 1=Manual, 2=Custom
gantt.changeTaskMode(record.taskData);
```

> Requires `Edit` module injected.

---

## clearRedoCollection

Clears all stored redo actions from the redo stack. Useful when switching contexts, loading new data, or preventing users from redoing past a certain point.

```typescript
gantt.clearRedoCollection();    // wipes all stored redo actions
```

> Requires `enableUndoRedo: true` and `UndoRedo` module injected.

---

## clearUndoCollection

Clears all stored undo actions from the undo stack. Useful when switching contexts, loading new data, or preventing users from undoing past a certain point.

```typescript
gantt.clearUndoCollection();    // wipes all stored undo actions
```

> Requires `enableUndoRedo: true` and `UndoRedo` module injected.

---

## collapseByIndex

Collapses a parent row at the given zero-based row index.

```typescript
gantt.collapseByIndex(2);
```

---

## collapseByID

Collapses a parent row by its task ID.

```typescript
gantt.collapseByID('3');
```

---

---

## convertToMilestone

Converts a task to a milestone (sets its duration to zero). **Parameter:** `id` — `string`

```typescript
gantt.convertToMilestone('5');
```

> Requires `Edit` module injected.

---

## deleteRecord

Deletes one or more task records by ID or `IGanttData` reference.

| Parameter | Type |
|-----------|------|
| `taskDetail` | `number \| string \| number[] \| string[] \| IGanttData \| IGanttData[]` |

```typescript
gantt.deleteRecord(3);          // single ID
gantt.deleteRecord([2, 4]);     // multiple IDs
gantt.deleteRecord(record);     // IGanttData reference
```

> Requires `editSettings.allowDeleting: true` and `Edit` module injected.

---

## enableItems

Enables or disables one or more toolbar items at runtime. Pass an array of toolbar item IDs and a boolean to control their enabled state.

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `string[]` | Array of toolbar item IDs to enable/disable |
| `enable` | `boolean` | `true` to enable, `false` to disable |

```typescript
// Disable the Add and Edit toolbar buttons
gantt.enableItems(['Gantt_add', 'Gantt_edit'], false);

// Re-enable them
gantt.enableItems(['Gantt_add', 'Gantt_edit'], true);
```

> Built-in toolbar item IDs follow the format `{ganttElementId}_{itemText}` (e.g., `Gantt_add`, `Gantt_delete`). For custom items, use the `id` you assigned in the toolbar definition. Requires `Toolbar` module injected.

---

## expandByIndex

Expands one or more parent rows by zero-based row index.

```typescript
gantt.expandByIndex(1);
gantt.expandByIndex([0, 2, 4]);
```

---

## expandByID

Expands a parent row by its task ID.

```typescript
gantt.expandByID('3');
```

---

---

## getCriticalTasks

Returns all critical path tasks. **Returns:** `IGanttData[]`

```typescript
const criticalTasks: IGanttData[] = gantt.getCriticalTasks();
console.log('Critical task count:', criticalTasks.length);
```

> Requires `enableCriticalPath: true` and `CriticalPath` module injected.

---

## getCurrentViewData

Returns visible task records after filtering, sorting, and CRUD. **Returns:** `Object[]`

```typescript
const visible: Object[] = gantt.getCurrentViewData();
console.log('Visible rows:', visible.length);
```

---

## getDurationString

Formats a duration value into a display string. **Returns:** `string`

```typescript
gantt.getDurationString(3, 'day');    // "3 days"
gantt.getDurationString(8, 'hour');   // "8 hours"
gantt.getDurationString(30, 'minute'); // "30 minutes"
```

---

## getExpandedRecords

Filters a task collection to return only currently expanded records. **Returns:** `IGanttData[]`

```typescript
const expanded: IGanttData[] = gantt.getExpandedRecords(gantt.flatData);
```

---

## getGanttColumns

Returns current Gantt column model definitions. **Returns:** `ColumnModel[]`

```typescript
const cols = gantt.getGanttColumns();
cols.forEach(c => console.log(c.field, c.width));
```

---

## getGridColumns

Returns raw TreeGrid `Column` objects — useful for inspecting/updating visibility, width, or format at runtime. **Returns:** `Column[]`

```typescript
const gridCols = gantt.getGridColumns();
```

---

## getRecordByID

Retrieves the `IGanttData` object for a task by its ID string. **Returns:** `IGanttData`

```typescript
const record: IGanttData = gantt.getRecordByID('3');
console.log(record.taskData);
```

---

## getRedoActions

Returns the current redo stack array. Useful for inspecting history or building custom UI indicators (for example, an "available redo count" badge). **Returns:** `Object[]`

```typescript
const redoStack: Object[] = gantt.getRedoActions();
```

> Requires `enableUndoRedo: true` and `UndoRedo` module injected.

---

## getRowByID

Returns the DOM `HTMLElement` for the chart row matching a task ID. **Returns:** `HTMLElement`

```typescript
const el: HTMLElement = gantt.getRowByID('5');
el.classList.add('highlight');
```

---

## getRowByIndex

Returns the DOM `HTMLElement` for the chart row at a zero-based index. **Returns:** `HTMLElement`

```typescript
const el: HTMLElement = gantt.getRowByIndex(0);
```

---

## getTaskByUniqueID

Retrieves an `IGanttData` record using Gantt's internal unique ID (not the user-defined task ID). **Returns:** `IGanttData`

```typescript
const record: IGanttData = gantt.getTaskByUniqueID(uid);
```

---

## getTaskInfo

Retrieves internal rendering properties (width, left offset, segments) for a task. **Returns:** `IGanttTaskInfo`

```typescript
const info = gantt.getTaskInfo('3');
console.log('Width:', info.width, 'Left:', info.left);
```

---

## getTaskbarHeight

Returns the configured taskbar row height in pixels. **Returns:** `number`

```typescript
const height: number = gantt.getTaskbarHeight();
```

---

## getUndoActions

Returns the current undo stack array. Useful for inspecting history or building custom UI indicators (for example, an "available undo count" badge). **Returns:** `Object[]`

```typescript
const undoStack: Object[] = gantt.getUndoActions();
console.log('Undo stack:', undoStack);
```

> Requires `enableUndoRedo: true` and `UndoRedo` module injected.

---

## getWorkString

Formats a work value into a display string. **Returns:** `string`

```typescript
gantt.getWorkString(24, 'hour');  // "24 hours"
gantt.getWorkString(3, 'day');    // "3 days"
```

---

## mergeTask

Merges previously split task segments back into one taskbar.

| Parameter | Type | Description |
|-----------|------|-------------|
| `taskId` | `number \| string` | ID of the split task |
| `segmentIndexes` | `Object[]` | Array of `{ firstSegmentIndex: number, secondSegmentIndex: number }` segment index objects to merge |

```typescript
gantt.mergeTask(3, [{ firstSegmentIndex: 0, secondSegmentIndex: 1 }]);
```

> Requires `editSettings.allowTaskbarEditing: true` and `Edit` module injected.

---

## openAddDialog

Programmatically opens the add-record dialog with optional pre-filled row data and a position hint.

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `Object` (optional) | Default values to pre-fill in the add dialog |
| `position` | `string` (optional) | `rowPosition` value: `'Top'` \| `'Bottom'` \| `'Above'` \| `'Below'` \| `'Child'` |

```typescript
// Open the add dialog at the bottom with defaults
gantt.openAddDialog({ TaskName: 'New Task', Duration: 3, Progress: 0 }, 'Bottom');

// Open at the top
gantt.openAddDialog();
```

> Requires `editSettings.allowAdding: true` and `Edit` module injected.

---

## openEditDialog

Programmatically opens the edit-record dialog for the task with the given ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `number \| string` | Task ID of the record to edit |

```typescript
gantt.openEditDialog(3);    // opens the edit dialog for task 3
```

> Requires `editSettings.allowEditing: true` and `Edit` module injected.

---

## refreshColumns

Refreshes the column definitions and layout of the TreeGrid pane.

```typescript
gantt.refreshColumns();
```

---

## removePredecessor

Removes all dependencies from a task. **Parameter:** `id` — `number | string`

```typescript
gantt.removePredecessor(3);
```

> Requires `Edit` module injected.

---

## removeSortColumn

Removes the sort on a specific column without affecting other sorted columns.

```typescript
gantt.removeSortColumn('StartDate');
```

> Requires `allowSorting: true` and `Sort` module injected.

---

## reorderColumns

Moves a column (or multiple columns) to a new position in the TreeGrid.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fromFName` | `string \| string[]` | Field name(s) of column(s) to move |
| `toFName` | `string` | Field name of the destination column |

```typescript
gantt.reorderColumns('Duration', 'StartDate');
gantt.reorderColumns(['Duration', 'Progress'], 'StartDate');
```

---

## reorderRows

Programmatically moves one or more rows to a new position without drag interaction.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fromIndexes` | `number[]` | Array of zero-based source row indexes to move |
| `toIndex` | `number` | Zero-based destination row index |
| `position` | `string` | Drop position relative to `toIndex`: `'above'` \| `'below'` \| `'middleSegment'` (child) |

```typescript
// Move row at index 1 to below row at index 2
gantt.reorderRows([1], 2, 'below');

// Move multiple rows above row at index 5
gantt.reorderRows([1, 3], 5, 'above');

// Move row as a child of the target row
gantt.reorderRows([4], 2, 'middleSegment');
```

> Requires `allowRowDragAndDrop: true` and `RowDD` module injected.

---

## scrollToTask

Scrolls the chart timeline to bring the taskbar of the specified task into view.

```typescript
gantt.scrollToTask('5');
```

---

## selectCells

Selects multiple cells at specified row and column index pairs.

```typescript
import { ISelectedCell } from '@syncfusion/ej2-gantt';

gantt.selectCells([
    { rowIndex: 0, cellIndexes: [1, 2] },
    { rowIndex: 2, cellIndexes: [0] }
] as ISelectedCell[]);
```

> Requires `selectionSettings.mode: 'Cell'` and `Selection` module injected.

---

## setScrollTop

Sets the vertical scroll position of the chart container.

```typescript
gantt.setScrollTop(300);
```

---

## splitTask

Splits a task's taskbar into segments at the given date(s).

| Parameter | Type | Description |
|-----------|------|-------------|
| `taskId` | `number \| string` | ID of the task to split |
| `splitDate` | `Date \| Date[]` | Date(s) at which to split the taskbar |

```typescript
gantt.splitTask(3, new Date('2024-04-10'));
gantt.splitTask(3, [new Date('2024-04-10'), new Date('2024-04-20')]);
```

> Requires `editSettings.allowTaskbarEditing: true` and `Edit` module injected. Parent tasks and milestones cannot be split.

---

## updateChartScrollOffset

Sets both horizontal and vertical scroll positions of the chart pane at once.

```typescript
gantt.updateChartScrollOffset(500, 200);  // left=500px, top=200px
```

---

## updateDataSource

Replaces the entire data source at runtime with optional project date bounds.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataSource` | `Object[]` | New task data collection |
| `args` | `object` | Optional `{ projectStartDate, projectEndDate }` |

```typescript
gantt.updateDataSource(newProjectData, {
    projectStartDate: new Date('2025-01-01'),
    projectEndDate:   new Date('2025-12-31')
});
```

---

## updateProjectDates

Updates the project's start and end date range at runtime and refreshes the timeline.

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectStartDate` | `Date` | New project start date |
| `projectEndDate` | `Date` | New project end date |

```typescript
gantt.updateProjectDates(new Date('2025-02-01'), new Date('2025-12-31'));
```

> Use this when the project's date window changes without swapping the entire data source. `projectEndDate` is also used as the reference for critical-path slack calculation.

---

## updateRecordByIndex

Updates a task record at the specified zero-based row index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Zero-based row index of the record to update |
| `data` | `Object` | Fields to update |

```typescript
gantt.updateRecordByIndex(2, { TaskName: 'Revised Task', Duration: 4 });
```

> Requires `editSettings.allowEditing: true` and `Edit` module injected.

---

## updateRecordByID

Updates a task record by its task ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `number \| string` | Task ID of the record to update |
| `data` | `Object` | Fields to update |

```typescript
gantt.updateRecordByID({TaskID: 3, TaskName: 'Revised Task', Duration: 4 });
```

> Requires `editSettings.allowEditing: true` and `Edit` module injected.

---

## updateTaskId

Changes an existing task's ID to a new unique ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `currentId` | `number \| string` | The existing task ID |
| `newId` | `number \| string` | The new unique task ID to assign |

```typescript
gantt.updateTaskId(3, 99);
```

> **Note:** `updateTaskId` renames the primary key. `updateRecordByID` updates task fields by ID — these are different methods.
