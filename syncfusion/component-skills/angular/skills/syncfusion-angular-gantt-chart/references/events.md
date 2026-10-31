# Events in Syncfusion Angular Gantt Chart

## Table of Contents
- [Overview](#overview)
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [actionFailure](#actionfailure)
- [Taskbar editing events](#taskbar-editing-events)
- [Row and cell selection events](#row-and-cell-selection-events)
- [Lifecycle events](#lifecycle-events)
- [Query events](#query-events)
- [Other notable events](#other-notable-events)
- [Event imports reference](#event-imports-reference)

---

## Overview

The Syncfusion Angular Gantt Chart component provides a comprehensive event-driven architecture. Events allow you to intercept and customize virtually every action — adding, editing, deleting, sorting, filtering, dependency editing, zooming, and more.

---

## actionBegin

Fires **before** an action is processed. The event argument type varies based on `requestType`.

### Common requestType values

| `requestType` | Triggered by | Arg type |
|---|---|---|
| `beforeSave` | Save after cell/dialog edit | `ITaskAddedEventArgs` |
| `beforeAdd` | Before add dialog opens | `ITaskAddedEventArgs` |
| `beforeDelete` | Before task delete | `ITaskAddedEventArgs` |
| `taskbarEditing` | Taskbar drag start | `ITimeSpanEventArgs` |
| `validateDependency` | New dependency being drawn | `IDependencyEventArgs` |
| `filtering` | Filter applied | `FilterEventArgs` |
| `sorting` | Column sorted | `SortEventArgs` |
| `zooming` | Zoom In/Out/Fit | `ZoomEventArgs` |

### Cancel an action

Set `args.cancel = true` to prevent the action from proceeding:

```typescript
public actionBegin(args: ITaskAddedEventArgs | ITimeSpanEventArgs): void {
  if (args.requestType === 'beforeDelete') {
    // Prevent deletion of tasks with no progress
    const data = (args as ITaskAddedEventArgs).data as any;
    if (data?.Progress === 0) {
      args.cancel = true;
    }
  }
}
```

### ITaskAddedEventArgs properties

| Property | Type | Description |
|---|---|---|
| `action` | string | Action type: `beforeAdd`, `beforeDelete` |
| `cancel` | boolean | Set `true` to cancel |
| `data` | object | Original task data |
| `modifiedRecords` | object[] | Records changed in batch |
| `modifiedTaskData` | object[] | Task data after modification |
| `newTaskData` | object | Data of newly added task |
| `recordIndex` | number | Index of targeted record |
| `requestType` | string | Describes the request type |
| `rowPosition` | string | `Top` \| `Bottom` \| `Above` \| `Below` |

### ITimeSpanEventArgs properties (taskbar editing)

| Property | Type | Description |
|---|---|---|
| `cancel` | boolean | Set `true` to cancel |
| `isTimelineRoundOff` | boolean | Whether timeline rounding applies |
| `projectStartDate` | Date | Project start boundary |
| `projectEndDate` | Date | Project end boundary |
| `requestType` | string | `taskbarEditing` |

### IDependencyEventArgs properties

| Property | Type | Description |
|---|---|---|
| `fromItem` | object | Source task in the dependency |
| `toItem` | object | Target task in the dependency |
| `isValidLink` | boolean | Whether the link is valid |
| `newPredecessorString` | string | Updated predecessor string |
| `predecessor` | string | Original predecessor string |
| `requestType` | string | `validateDependency` \| `updateDependency` |

### FilterEventArgs properties

| Property | Type | Description |
|---|---|---|
| `cancel` | boolean | Set `true` to cancel |
| `columns` | object[] | Columns being filtered |
| `currentFilterObject` | object | Active filter condition |
| `currentFilteringColumn` | string | Column being filtered |
| `requestType` | string | `filtering` |

### SortEventArgs properties

| Property | Type | Description |
|---|---|---|
| `cancel` | boolean | Set `true` to cancel |
| `columnName` | string | Column being sorted |
| `direction` | string | `Ascending` \| `Descending` |
| `requestType` | string | `sorting` |

### ZoomEventArgs properties

| Property | Type | Description |
|---|---|---|
| `cancel` | boolean | Set `true` to cancel |
| `requestType` | string | `zooming` |
| `timeline` | object | Timeline settings after zoom |

---

## actionComplete

Fires **after** an action completes successfully. Mirrors `actionBegin` argument types but `cancel` has no effect.

```typescript
public actionComplete(args: ITaskAddedEventArgs): void {
  if (args.requestType === 'save') {
    console.log('Task saved:', args.data);
  }
  if (args.requestType === 'delete') {
    console.log('Task deleted');
  }
}
```

### Common requestType values for actionComplete

| `requestType` | Meaning |
|---|---|
| `save` | Task edit/add saved |
| `delete` | Task deleted |
| `taskbaredited` | Taskbar drag complete |
| `filterafteropen` | Filter menu opened |
| `filtering` | Filter applied |
| `sorting` | Sort applied |
| `add` | Task added |

---

## actionFailure

Fires when an action fails (e.g., remote data save error).

```typescript
public actionFailure(args: any): void {
  console.error('Action failed:', args.error);
}
```

---

## Taskbar editing events

### taskbarEditing

Fires continuously during taskbar drag (resize or move). Use to show live feedback.

```typescript
import { ITaskbarEditedEventArgs } from '@syncfusion/ej2-angular-gantt';

public taskbarEditing(args: ITaskbarEditedEventArgs): void {
  console.log('Dragging task:', args.data.ganttProperties.taskName);
  console.log('New start:', args.data.ganttProperties.startDate);
}
```

### taskbarEdited

Fires after taskbar drag completes. The `data` contains updated task fields.

```typescript
public taskbarEdited(args: ITaskbarEditedEventArgs): void {
  if (args.data) {
    const task = args.data.taskData as any;
    console.log('Task moved — new start:', task.StartDate);
  }
}
```

---

## Row and cell selection events

### rowSelected / rowDeselected

```typescript
import { RowSelectEventArgs } from '@syncfusion/ej2-angular-gantt';

public rowSelected(args: RowSelectEventArgs): void {
  const data = args.data as any;
  console.log('Selected task ID:', data.TaskID);
}

public rowDeselected(args: any): void {
  console.log('Row deselected');
}
```

### cellSelected / cellDeselected

```typescript
import { CellSelectEventArgs } from '@syncfusion/ej2-angular-gantt';

public cellSelected(args: CellSelectEventArgs): void {
  console.log('Cell selected — column:', args.cellIndex?.cellIndex);
}
```

---

## Lifecycle events

| Event | When fired |
|---|---|
| `load` | Before the component renders (data not yet bound) |
| `created` | After the component is fully initialized and rendered |
| `dataBound` | After data is bound and the grid is rendered (fires on refresh too) |
| `destroyed` | After component is destroyed |

```typescript
@Component({
  template: `<ejs-gantt
    (load)="onLoad()"
    (created)="onCreated()"
    (dataBound)="onDataBound()">
  </ejs-gantt>`
})
export class AppComponent {
  public onLoad(): void {
    console.log('Gantt loading...');
  }
  public onCreated(): void {
    console.log('Gantt created and ready');
  }
  public onDataBound(): void {
    console.log('Data bound complete');
  }
}
```

---

## Query events

These events fire during rendering and allow per-row / per-cell / per-taskbar customization.

### queryTaskbarInfo

Fires for each taskbar during rendering. Use to apply conditional styles.

```typescript
import { IQueryTaskbarInfoEventArgs } from '@syncfusion/ej2-angular-gantt';

public queryTaskbarInfo(args: IQueryTaskbarInfoEventArgs): void {
  const data = args.data.taskData as any;
  if (data.Progress < 30) {
    args.taskbarBgColor = '#ff6b6b';
    args.progressBarBgColor = '#c0392b';
  }
}
```

### queryCellInfo

Fires for each grid cell. Use to apply CSS or alter cell content.

```typescript
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-gantt';

public queryCellInfo(args: QueryCellInfoEventArgs): void {
  if (args.column?.field === 'Progress' && (args.data as any).Progress > 80) {
    (args.cell as HTMLElement).style.color = 'green';
  }
}
```

### rowDataBound / row spanning

`rowDataBound` fires for each row. Use `queryCellInfo` with `rowSpan` when you need to merge cells vertically.

```typescript
public rowDataBound(args: any): void {
  const data = args.data.taskData as any;
  if (data.Priority === 'High') {
    args.row.classList.add('high-priority-row');
  }
}
```

---

## Other notable events

| Event | Description |
|---|---|
| `toolbarClick` | Fires when any toolbar item is clicked |
| `contextMenuClick` | Fires when a context menu item is clicked |
| `columnMenuClick` | Fires when a column menu item is clicked |
| `columnDragStart` | Fires when column drag begins |
| `columnDrop` | Fires when a column is dropped after reorder |
| `resizeStart` | Fires when column resize begins |
| `resizeStop` | Fires when column resize ends |
| `rowDragStartHelper` | Fires before row drag; can cancel |
| `rowDragStart` | Fires when row drag begins |
| `rowDrop` | Fires when row is dropped |
| `beforeTooltipRender` | Fires before tooltip renders; customize tooltip content |
| `pdfExportComplete` | Fires after PDF export completes (with blob if requested) |
| `excelExportComplete` | Fires after Excel export completes |
| `onTaskbarClick` | Fires when a taskbar is clicked |
| `recordDoubleClick` | Fires on row double-click |
| `expandCollapsing` | Fires before expand/collapse of a parent task |
| `expanded` / `collapsed` | Fires after expand/collapse |

---

## Event imports reference

```typescript
import {
  GanttModule,
  GanttComponent,
  ITaskAddedEventArgs,
  ITimeSpanEventArgs,
  IDependencyEventArgs,
  IQueryTaskbarInfoEventArgs,
  ITaskbarEditedEventArgs,
  ZoomEventArgs,
  RowSelectEventArgs,
  CellSelectEventArgs
} from '@syncfusion/ej2-angular-gantt';

import {
  FilterEventArgs,
  SortEventArgs,
  QueryCellInfoEventArgs
} from '@syncfusion/ej2-angular-grids';
```

### Component template binding

```html
<ejs-gantt
  (actionBegin)="actionBegin($event)"
  (actionComplete)="actionComplete($event)"
  (actionFailure)="actionFailure($event)"
  (taskbarEditing)="taskbarEditing($event)"
  (taskbarEdited)="taskbarEdited($event)"
  (rowSelected)="rowSelected($event)"
  (cellSelected)="cellSelected($event)"
  (queryTaskbarInfo)="queryTaskbarInfo($event)"
  (queryCellInfo)="queryCellInfo($event)"
  (rowDataBound)="rowDataBound($event)"
  (dataBound)="onDataBound()"
  (toolbarClick)="toolbarClick($event)">
</ejs-gantt>
```
