# Gantt Chart - Programmatic Methods Reference
Methods not covered in any other reference file. Use as a supplement for programmatic control.

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
- [openAddDialog](#addadddialog)
- [openEditDialog](#openeditdialog)
- [removeSortColumn](#removesortcolumn)
- [reorderRows](#reorderrows)
- [scrollToTask](#scrolltotask)
- [selectCells](#selectcells)
- [updateChartScrollOffset](#updatechartscrolloffset)
- [updateDataSource](#updatedatasource)
- [updateProjectDates](#updateprojectdates)
- [updateRecordByID](#updaterecordbyid)
- [updateRecordByIndex](#updaterecordbyindex)
- [updateTaskId](#updatetaskid)

---

Angular pattern - access the component instance via `@ViewChild`:
```typescript
import { ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';

@ViewChild('gantt') public gantt!: GanttComponent;
```
Template: `<ejs-gantt #gantt ...></ejs-gantt>`

---

## autoFitColumns

Adjusts column width(s) to fit content. Call inside `dataBound` for initial render.

```typescript
this.gantt.autoFitColumns('TaskName');
this.gantt.autoFitColumns(['TaskName', 'StartDate', 'Duration']);
this.gantt.autoFitColumns(); // all columns
```

| Parameter | Type | Description |
|---|---|---|
| `fieldNames` *(optional)* | `string | string[]` | Column field name(s) to auto-fit. Omit for all. |

---

## cancelEdit

Cancels the active edit operation and reverts unsaved changes. `this.gantt.cancelEdit();`

---

## changeTaskMode

Changes the scheduling mode of a task at runtime (`Auto`, `Manual`, or `Custom`).

```typescript
const record = this.gantt.getRecordByID('3');
if (record) {
  record.taskData.taskMode = 1; // 0=Auto, 1=Manual, 2=Custom
  this.gantt.changeTaskMode(record.taskData);
}
```

| Parameter | Type | Description |
|---|---|---|
| `data` | `Object` | Task data object with updated `taskMode`. |

---

## clearRedoCollection

Clears the redo history stack. `this.gantt.clearRedoCollection();`

> Requires `enableUndoRedo: true` and `UndoRedoService` injected in `providers`.

---

## clearUndoCollection

Clears the undo history stack. `this.gantt.clearUndoCollection();`

> Requires `enableUndoRedo: true` and `UndoRedoService` injected in `providers`.

---

## collapseByIndex

Collapses a parent row at the given zero-based index. `this.gantt.collapseByIndex(2);`

**Parameter:** `index` - `number`

---

## collapseByID

Collapses a parent row by task ID. `this.gantt.collapseByID(3);`

**Parameter:** `id` - `number | string`

---

## convertToMilestone

Converts a task into a milestone (sets duration to zero). `this.gantt.convertToMilestone('5');`

**Parameter:** `id` - `string`

---

## deleteRecord

Deletes one or more task records by ID, index, or `IGanttData` reference.

```typescript
this.gantt.deleteRecord(3);         // single ID
this.gantt.deleteRecord([2, 3, 5]); // multiple IDs
this.gantt.deleteRecord(record);    // IGanttData ref
```

**Parameter:** `taskDetail` - `number | string | number[] | string[] | IGanttData | IGanttData[]`

---

## enableItems

Enables or disables toolbar items by their item ID strings.

```typescript
this.gantt.enableItems(['GanttToolbar_add', 'GanttToolbar_delete'], false);
```

**Parameters:** `items: string[]` - toolbar item IDs. `isEnable: boolean` - `true` to enable, `false` to disable.

---

## expandByIndex

Expands one or more parent rows by zero-based index.

```typescript
this.gantt.expandByIndex(1);
this.gantt.expandByIndex([0, 2, 4]);
```

**Parameter:** `index` - `number | number[]`

---

## expandByID

Expands a parent row by task ID. `this.gantt.expandByID(3);`

**Parameter:** `id` - `number | string`

---

## getCurrentViewData

Returns visible task records after all active filters, sorts, and CRUD operations. **Returns:** `Object[]`

```typescript
const visibleRecords: Object[] = this.gantt.getCurrentViewData();
```

---

## getDurationString

Formats a duration value with its unit into a readable string (e.g. `"3 days"`).

```typescript
this.gantt.getDurationString(3, 'day');  // "3 days"
this.gantt.getDurationString(8, 'hour'); // "8 hours"
```

| Parameter | Type | Description |
|---|---|---|
| `duration` | `number` | Numeric duration value. |
| `durationUnit` | `string` | `'day'`, `'hour'`, or `'minute'`. |

**Returns:** `string`

---

## getExpandedRecords

Returns only expanded records from a given collection. **Returns:** `IGanttData[]`

```typescript
const expanded = this.gantt.getExpandedRecords(this.gantt.flatData);
```

**Parameter:** `records` - `IGanttData[]`

---

## getGanttColumns

Returns the current Gantt column model definitions. **Returns:** `ColumnModel[]`

```typescript
const columns = this.gantt.getGanttColumns();
```

---

## getGridColumns

Returns raw TreeGrid `Column` objects - useful for runtime updates to `visible`, `width`, or `format`. **Returns:** `Column[]`

```typescript
const gridCols = this.gantt.getGridColumns();
```

---

## getRecordByID

Retrieves the `IGanttData` object for a task by its ID string. **Returns:** `IGanttData`

```typescript
const record = this.gantt.getRecordByID('3');
```

**Parameter:** `id` - `string`

---

## getRedoActions

Returns the current redo stack. Each item has `action` (e.g. `'add'`, `'delete'`, `'sorting'`) and `modifiedRecords`.

```typescript
const redoStack = this.gantt.getRedoActions();
redoStack.forEach(item => console.log(item.action));
```

**Returns:** `Object[]`

> Requires `enableUndoRedo: true` and `UndoRedoService` in `providers`.

---

## getRowByID

Returns the DOM `HTMLElement` for the chart row matching the given task ID. **Returns:** `HTMLElement`

```typescript
const rowEl = this.gantt.getRowByID('5');
```

**Parameter:** `id` - `string | number`

---

## getRowByIndex

Returns the DOM `HTMLElement` for the chart row at the given zero-based index. **Returns:** `HTMLElement`

```typescript
const rowEl = this.gantt.getRowByIndex(0);
```

**Parameter:** `index` - `number`

---

## getTaskByUniqueID

Retrieves an `IGanttData` record using its internal unique ID (not the user-defined task ID). **Returns:** `IGanttData`

```typescript
const record = this.gantt.getTaskByUniqueID('some-unique-id');
```

**Parameter:** `id` - `string`

---

## getTaskInfo

Retrieves internal rendering properties (taskbar width, left offset, segments) for a task by ID. **Returns:** `IGanttTaskInfo`

```typescript
const info = this.gantt.getTaskInfo('3');
console.log(info?.width, info?.left, info?.segments);
```

**Parameter:** `taskId` - `string`

---

## getTaskbarHeight

Returns the configured taskbar row height in pixels. **Returns:** `number`

```typescript
const height: number = this.gantt.getTaskbarHeight();
```

---

## getUndoActions

Returns the current undo stack. Each item has `action` and `modifiedRecords`.

```typescript
const undoStack = this.gantt.getUndoActions();
undoStack.forEach(item => console.log(item.action));
```

**Returns:** `Object[]`

> Requires `enableUndoRedo: true` and `UndoRedoService` in `providers`.

---

## getWorkString

Formats a work value with its unit into a readable string (e.g. `"24 hours"`).

```typescript
this.gantt.getWorkString(24, 'hour'); // "24 hours"
```

| Parameter | Type | Description |
|---|---|---|
| `work` | `number` | Numeric work value. |
| `workUnit` | `string` | `'day'`, `'hour'`, or `'minute'`. |

**Returns:** `string`

---

## openAddDialog

Opens the add task dialog programmatically. `this.gantt.openAddDialog();`

> Requires `editSettings.allowAdding: true` and `EditService` in `providers`.

---

## openEditDialog

Opens the edit dialog for a specific task ID, or for the currently selected row if omitted.

```typescript
this.gantt.openEditDialog(3);
this.gantt.openEditDialog(); // selected row
```

| Parameter | Type | Description |
|---|---|---|
| `taskId` *(optional)* | `number | string` | Task ID to open edit dialog for. |

> Requires `editSettings.allowEditing: true` and `EditService` in `providers`.

---

## removeSortColumn

Removes the sort on a specific column without affecting other sorted columns.

```typescript
this.gantt.removeSortColumn('StartDate');
```

**Parameter:** `columnName` - `string`

---

## reorderRows

Moves rows from source indexes to a target drop position.

```typescript
this.gantt.reorderRows([2, 3], 0, 'above');
this.gantt.reorderRows([4], 1, 'child');
```

| Parameter | Type | Description |
|---|---|---|
| `fromIndexes` | `number[]` | Zero-based indexes of rows to move. |
| `toIndex` | `number` | Zero-based index of the target row. |
| `position` | `string` | `'above'`, `'below'`, or `'child'`. |

> Requires `allowRowDragAndDrop: true` and `RowDDService` in `providers`.

---

## scrollToTask

Scrolls the chart timeline to bring the taskbar of the specified task into view.

```typescript
this.gantt.scrollToTask('5');
```

**Parameter:** `taskId` - `string`

---

## selectCells

Selects multiple cells by row and column index pairs.

```typescript
this.gantt.selectCells([
  { rowIndex: 0, cellIndexes: [1, 2] },
  { rowIndex: 2, cellIndexes: [0] },
]);
```

**Parameter:** `rowCellIndexes` - `ISelectedCell[]` (from `@syncfusion/ej2-grids`)

> Requires `selectionSettings.mode: 'Cell'` and `SelectionService` in `providers`.

---

## updateChartScrollOffset

Sets both horizontal and vertical scroll positions of the chart pane simultaneously.

```typescript
this.gantt.updateChartScrollOffset(500, 200); // left=500px, top=200px
```

**Parameters:** `left: number` - horizontal px offset. `top: number` - vertical px offset.

---

## updateDataSource

Replaces the entire data source at runtime with optional project date bounds.

```typescript
this.gantt.updateDataSource(newData, {
  projectStartDate: new Date('2024-01-01'),
  projectEndDate: new Date('2024-12-31'),
});
```

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `Object[]` | New task data collection. |
| `args` | `object` | Optional `projectStartDate` and `projectEndDate` `Date` values. |

---

## updateProjectDates

Updates the project start/end dates, optionally rounding to timeline unit boundaries.

```typescript
this.gantt.updateProjectDates(
  new Date('2024-01-01'),
  new Date('2024-12-31'),
  true  // round off to nearest timeline unit
);
```

| Parameter | Type | Description |
|---|---|---|
| `startDate` | `Date` | New project start date. |
| `endDate` | `Date` | New project end date. |
| `isTimelineRoundOff` | `boolean` | Round to nearest timeline unit boundary. |
| `isFrom` *(optional)* | `string` | Origin context string. |

---

## updateRecordByID

Updates an existing task record by primary key ID. Only provided fields are updated.

```typescript
this.gantt.updateRecordByID({ TaskID: 3, TaskName: 'Updated', Duration: 7 });
```

**Parameter:** `data` - `Object` (task ID + fields to update)

---

## updateRecordByIndex

Updates a task record at the specified zero-based row index.

```typescript
this.gantt.updateRecordByIndex(2, { TaskName: 'Revised', Duration: 4 });
```

**Parameters:** `index: number`, `data: Object`

---

## updateTaskId

Changes an existing task ID to a new unique ID. `this.gantt.updateTaskId(3, 99);`

**Parameters:** `currentId: number | string`, `newId: number | string`