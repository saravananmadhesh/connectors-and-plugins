# Gantt Chart Programmatic Methods Reference

Methods not covered in any other reference file. Use as a supplement for programmatic control.

## Table of Contents
- [autoFitColumns](#autofitcolumns)
- [cancelEdit](#canceledit)
- [changeTaskMode](#changetaskmode)
- [collapseByID](#collapsebyid)
- [collapseByIndex](#collapsebyindex)
- [convertToMilestone](#converttomilestone)
- [deleteRecord](#deleterecord)
- [expandByID](#expandbyid)
- [expandByIndex](#expandbyindex)
- [getCriticalTasks](#getcriticaltasks)
- [getCurrentViewData](#getcurrentviewdata)
- [getDurationString](#getdurationstring)
- [getExpandedRecords](#getexpandedrecords)
- [getGanttColumns](#getganttcolumns)
- [getGridColumns](#getgridcolumns)
- [getRecordByID](#getrecordbyid)
- [getRowByID](#getrowbyid)
- [getRowByIndex](#getrowbyindex)
- [getTaskByUniqueID](#gettaskbyuniqueid)
- [getTaskInfo](#gettaskinfo)
- [getTaskbarHeight](#gettaskbarheight)
- [getWorkString](#getworkstring)
- [mergeTask](#mergetask)
- [refreshColumns](#refreshcolumns)
- [removePredecessor](#removepredecessor)
- [removeSortColumn](#removesortcolumn)
- [reorderColumns](#reordercolumns)
- [scrollToTask](#scrolltotask)
- [selectCells](#selectcells)
- [setScrollTop](#setscrolltop)
- [splitTask](#splittask)
- [updateChartScrollOffset](#updatechartscrolloffset)
- [updateDataSource](#updatedatasource)
- [updateRecordByIndex](#updaterecordbyindex)
- [updateTaskId](#updatetaskid)

---

## Vue Access Pattern

Access the Gantt instance via `this.$refs.gantt` (Options API):

```html
<ejs-gantt ref="gantt" :dataSource="data" :taskFields="taskFields">
</ejs-gantt>
```

```javascript
methods: {
  example() {
    this.$refs.gantt.methodName(args);
  }
}
```

---

## autoFitColumns

Adjusts column width(s) to fit their content. Call inside the `dataBound` event for initial render.

| Parameter | Type | Description |
|---|---|---|
| `fieldNames` *(optional)* | `string \| string[]` | Column field name(s) to auto-fit. Omit to fit all columns. |

```javascript
this.$refs.gantt.autoFitColumns('TaskName');
this.$refs.gantt.autoFitColumns(['TaskName', 'StartDate', 'Duration']);
this.$refs.gantt.autoFitColumns(); // all columns
```

---

## cancelEdit

Cancels the active edit operation and reverts unsaved changes.

```javascript
this.$refs.gantt.cancelEdit();
```

> Requires `editSettings.allowEditing: true` and `Edit` module injected.

---

## changeTaskMode

Changes a task's scheduling mode at runtime � `Auto` (0), `Manual` (1), or `Custom` (2).

| Parameter | Type | Description |
|---|---|---|
| `data` | `Object` | Task data object with updated `taskMode` value. |

```javascript
const record = this.$refs.gantt.getRecordByID('3');
if (record) {
  record.taskData.taskMode = 1; // 0=Auto, 1=Manual, 2=Custom
  this.$refs.gantt.changeTaskMode(record.taskData);
}
```

> Requires `Edit` module injected.

---

## collapseByID

Collapses a parent row by its task ID.

| Parameter | Type | Description |
|---|---|---|
| `id` | `string \| number \| string[] \| number[]` | Task ID(s) to collapse. |

```javascript
this.$refs.gantt.collapseByID('2');
this.$refs.gantt.collapseByID([1, 3, 5]);
```

---

## collapseByIndex

Collapses a parent row at the given zero-based row index. **Parameter:** `index` - `number`

```javascript
this.$refs.gantt.collapseByIndex(2);
```

---

## convertToMilestone

Converts a task to a milestone (sets its duration to zero). **Parameter:** `id` - `string`

```javascript
this.$refs.gantt.convertToMilestone('5');
```

> Requires `Edit` module injected.

---

## deleteRecord

Deletes one or more task records by ID or `IGanttData` reference.

| Parameter | Type | Description |
|---|---|---|
| `taskDetail` | `number \| string \| number[] \| string[] \| IGanttData \| IGanttData[]` | Record(s) to delete. |

```javascript
this.$refs.gantt.deleteRecord(3);         // single ID
this.$refs.gantt.deleteRecord([2, 4]);    // multiple IDs
this.$refs.gantt.deleteRecord(record);   // IGanttData reference
```

> Requires `editSettings.allowDeleting: true` and `Edit` module injected.

---

## expandByID

Expands one or more parent rows by task ID.

| Parameter | Type | Description |
|---|---|---|
| `id` | `string \| number \| string[] \| number[]` | Task ID(s) to expand. |

```javascript
this.$refs.gantt.expandByID('2');
this.$refs.gantt.expandByID([1, 3, 5]);
```

---

## expandByIndex

Expands one or more parent rows by zero-based row index. **Parameter:** `index` - `number | number[]`

```javascript
this.$refs.gantt.expandByIndex(1);
this.$refs.gantt.expandByIndex([0, 2, 4]);
```

---

## getCriticalTasks

Returns all critical path tasks. Requires `enableCriticalPath: true` and `CriticalPath` module.

**Returns:** `IGanttData[]`

```javascript
const criticalTasks = this.$refs.gantt.getCriticalTasks();
console.log('Critical tasks count:', criticalTasks.length);
```

---

## getCurrentViewData

Returns visible task records reflecting the latest state after filtering, sorting, and CRUD operations.

**Returns:** `Object[]`

```javascript
const visible = this.$refs.gantt.getCurrentViewData();
console.log('Visible rows:', visible.length);
```

---

## getDurationString

Formats a duration value into a display string (e.g. `"3 days"`). **Parameters:** `duration` - `number`, `durationUnit` - `'day' | 'hour' | 'minute'`. **Returns:** `string`

```javascript
this.$refs.gantt.getDurationString(3, 'day');   // "3 days"
this.$refs.gantt.getDurationString(8, 'hour');  // "8 hours"
```

---

## getExpandedRecords

Filters a given task collection to return only the currently expanded records. **Parameter:** `records` - `IGanttData[]`. **Returns:** `IGanttData[]`

```javascript
const expanded = this.$refs.gantt.getExpandedRecords(
  this.$refs.gantt.ej2Instances.flatData
);
```

---

## getGanttColumns

Returns the current Gantt column model definitions.

**Returns:** `ColumnModel[]`

```javascript
const cols = this.$refs.gantt.getGanttColumns();
cols.forEach(c => console.log(c.field, c.width));
```

---

## getGridColumns

Returns raw TreeGrid `Column` objects � useful for inspecting or updating visibility, width, or format at runtime.

**Returns:** `Column[]`

```javascript
const gridCols = this.$refs.gantt.getGridColumns();
```

---

## getRecordByID

Retrieves the `IGanttData` object for a task by its ID string.

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | Task ID to look up. |

**Returns:** `IGanttData`

```javascript
const record = this.$refs.gantt.getRecordByID('3');
console.log(record?.taskData);
```

---

## getRowByID

Returns the DOM `HTMLElement` for the chart row matching the given task ID. **Parameter:** `id` - `string | number`. **Returns:** `HTMLElement`

```javascript
const el = this.$refs.gantt.getRowByID('5');
el?.classList.add('highlight');
```

---

## getRowByIndex

Returns the DOM `HTMLElement` for the chart row at the given zero-based index. **Parameter:** `index` - `number`. **Returns:** `HTMLElement`

```javascript
const el = this.$refs.gantt.getRowByIndex(0);
```

---

## getTaskByUniqueID

Retrieves an `IGanttData` record using Gantt's internal unique ID (not the user-defined task ID). **Parameter:** `id` - `string`. **Returns:** `IGanttData`

```javascript
const record = this.$refs.gantt.getTaskByUniqueID(uid);
```

---

## getTaskInfo

Retrieves internal rendering properties (width, left offset, segments) for a task by ID. **Parameter:** `taskId` - `string`. **Returns:** `IGanttTaskInfo`

```javascript
const info = this.$refs.gantt.getTaskInfo('3');
console.log('Width:', info?.width, 'Left:', info?.left);
```

---

## getTaskbarHeight

Returns the configured taskbar row height in pixels. **Returns:** `number`

```javascript
const h = this.$refs.gantt.getTaskbarHeight();
```

---

## getWorkString

Formats a work value into a display string (e.g. `"24 hours"`). **Parameters:** `work` - `number`, `workUnit` - `'day' | 'hour' | 'minute'`. **Returns:** `string`

```javascript
this.$refs.gantt.getWorkString(24, 'hour'); // "24 hours"
```

---

## mergeTask

Merges previously split task segments back into one taskbar.

| Parameter | Type | Description |
|---|---|---|
| `taskId` | `number \| string` | ID of the split task. |
| `segmentIndexes` | `Object[]` | Array of `{ firstSegmentIndex: number, secondSegmentIndex: number }` segment index objects to merge |

```javascript
this.$refs.gantt.mergeTask(3, [{ firstSegmentIndex: 0, secondSegmentIndex: 1 }]);
```

> Requires `editSettings.allowTaskbarEditing: true` and `Edit` module injected.

---

## refreshColumns

Refreshes the column definitions and layout of the TreeGrid pane. `this.$refs.gantt.refreshColumns();`

---

## removePredecessor

Removes all dependencies from a task. **Parameter:** `id` - `number | string`

```javascript
this.$refs.gantt.removePredecessor(3);
```

> Requires `Edit` module injected.

---

## removeSortColumn

Removes the sort on a specific column without affecting other sorted columns. **Parameter:** `columnName` - `string`

```javascript
this.$refs.gantt.removeSortColumn('StartDate');
```

> Requires `allowSorting: true` and `Sort` module injected.

---

## reorderColumns

Moves a column (or multiple columns) to a new position in the TreeGrid.

| Parameter | Type | Description |
|---|---|---|
| `fromFName` | `string \| string[]` | Field name(s) of the column(s) to move. |
| `toFName` | `string` | Field name of the destination column. |

```javascript
this.$refs.gantt.reorderColumns('Duration', 'StartDate');
this.$refs.gantt.reorderColumns(['Duration', 'Progress'], 'StartDate');
```

---

## scrollToTask

Scrolls the chart timeline to bring the taskbar of the specified task into view. **Parameter:** `taskId` - `string`

```javascript
this.$refs.gantt.scrollToTask('5');
```

---

## selectCells

Selects multiple cells at specified row and column index pairs. **Parameter:** `rowCellIndexes` - `ISelectedCell[]`

```javascript
this.$refs.gantt.selectCells([
  { rowIndex: 0, cellIndexes: [1, 2] },
  { rowIndex: 2, cellIndexes: [0] }
]);
```

> Requires `selectionSettings.mode: 'Cell'` and `Selection` module injected.

---

## setScrollTop

Sets the vertical scroll position of the chart container. **Parameter:** `scrollTop` - `number`

```javascript
this.$refs.gantt.setScrollTop(300);
```

---

## splitTask

Splits a task's taskbar into segments at the given date(s).

| Parameter | Type | Description |
|---|---|---|
| `taskId` | `number \| string` | ID of the task to split. |
| `splitDate` | `Date \| Date[]` | Date or array of dates at which to split. |

```javascript
this.$refs.gantt.splitTask(3, new Date('2024-04-10'));
this.$refs.gantt.splitTask(3, [new Date('2024-04-10'), new Date('2024-04-20')]);
```

> Requires `editSettings.allowTaskbarEditing: true` and `Edit` module injected. Parent tasks and milestones cannot be split.

---

## updateChartScrollOffset

Sets both horizontal (left) and vertical (top) scroll positions of the chart pane at once.

| Parameter | Type | Description |
|---|---|---|
| `left` | `number` | Horizontal scroll offset in pixels. |
| `top` | `number` | Vertical scroll offset in pixels. |

```javascript
this.$refs.gantt.updateChartScrollOffset(500, 200); // left=500px, top=200px
```

---

## updateDataSource

Replaces the entire data source at runtime with optional project date bounds.

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `Object[]` | New task data collection. |
| `args` | `object` | Optional `{ projectStartDate, projectEndDate }` `Date` values. |

```javascript
this.$refs.gantt.updateDataSource(newProjectData, {
  projectStartDate: new Date('2025-01-01'),
  projectEndDate: new Date('2025-12-31')
});
```

---

## updateRecordByIndex

Updates a task record at the specified zero-based row index.

| Parameter | Type | Description |
|---|---|---|
| `index` | `number` | Zero-based row index of the record to update. |
| `data` | `Object` | Object with fields to update. |

```javascript
this.$refs.gantt.updateRecordByIndex(2, { TaskName: 'Revised Task', Duration: 4 });
```

> Requires `editSettings.allowEditing: true` and `Edit` module injected.

---

## updateTaskId

Changes an existing task's ID to a new unique ID.

| Parameter | Type | Description |
|---|---|---|
| `currentId` | `number \| string` | The existing task ID. |
| `newId` | `number \| string` | The new unique task ID to assign. |

```javascript
this.$refs.gantt.updateTaskId(3, 99); // rename task ID 3 ? 99
```

> **Note:** `updateTaskId` renames the primary key. `updateRecordByID` updates task fields by ID � these are different methods.
