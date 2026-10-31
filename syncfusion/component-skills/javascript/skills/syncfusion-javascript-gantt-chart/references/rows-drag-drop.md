# Row Drag and Drop, Indent and Outdent in Syncfusion Gantt Chart

## Table of Contents
- [Row Drag and Drop](#row-drag-and-drop)
- [Drop Positions](#drop-positions)
- [Drag and Drop to Custom Component](#drag-and-drop-to-custom-component)
- [Drag and Drop Multiple Rows](#drag-and-drop-multiple-rows)
- [Taskbar Drag and Drop Between Rows](#taskbar-drag-and-drop-between-rows)
- [Programmatic Row Reorder](#programmatic-row-reorder)
- [Customize Drag and Drop Events](#customize-drag-and-drop-events)
- [Prevent Child Drop Position](#prevent-child-drop-position)
- [Indent and Outdent](#indent-and-outdent)
- [Programmatic Indent and Outdent](#programmatic-indent-and-outdent)
- [Retrieve Indent and Outdent Details](#retrieve-indent-and-outdent-details)

---

## Row Drag and Drop

**Module required**: `RowDD`

Set `allowRowDragAndDrop: true` to enable drag-and-drop row reordering:

```typescript
import { Gantt, RowDD, Edit, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(RowDD, Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowRowDragAndDrop: true,
    splitterSettings: { position: '75%' }
});
gantt.appendTo('#Gantt');
```

---

## Drop Positions

| Visual Indicator | Result |
|-----------------|--------|
| Border at **top** of target row | Placed **above** target as sibling |
| Border at **bottom** of target row | Placed **below** target as sibling |
| Border at **both top and bottom** of target row | Added as **child** of target |

---

## Drag and Drop to Custom Component

Set `gantt.treeGrid.rowDropSettings.targetID` in the `load` event to allow dropping rows into another component (e.g., a TreeGrid). Handle the actual transfer in `rowDrop`:

```typescript
import { Gantt, RowDD, Edit, Selection } from '@syncfusion/ej2-gantt';
import { TreeGrid, RowDD as TGRowDD, Edit as TGEdit, Selection as TGSelection } from '@syncfusion/ej2-treegrid';

Gantt.Inject(RowDD, Edit, Selection);
TreeGrid.Inject(TGRowDD, TGEdit, TGSelection);

const gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowRowDragAndDrop: true,
    editSettings: { allowDeleting: true },
    load: () => {
        gantt.treeGrid.rowDropSettings = { targetID: 'TreeGrid' };  // ID of target component
    },
    rowDrop: (args: any) => {
        const targetGridEl = (args.target as Element).closest('.e-grid') as HTMLElement;
        if (targetGridEl) {
            args.cancel = true;
            (args.data as object[]).forEach((item) => {
                treeGrid.addRecord(item, 0);
                gantt.deleteRecord(item as any);
            });
        }
    }
});
gantt.appendTo('#Gantt');

const treeGrid = new TreeGrid({
    dataSource: [],
    columns: [
        { field: 'TaskID', headerText: 'Task ID', isPrimaryKey: true },
        { field: 'TaskName', headerText: 'Task Name' }
    ],
    editSettings: { allowAdding: true, allowEditing: true }
});
treeGrid.appendTo('#TreeGrid');
```

---

## Drag and Drop Multiple Rows

Set `selectionSettings.type: 'Multiple'` to drag multiple selected rows simultaneously:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowRowDragAndDrop: true,
    selectionSettings: { type: 'Multiple' }
});
gantt.appendTo('#Gantt');
```

---

## Taskbar Drag and Drop Between Rows

Set `allowTaskbarDragAndDrop: true` to allow repositioning rows by dragging the taskbar element:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    editSettings: { allowTaskbarEditing: true },
    allowTaskbarDragAndDrop: true,
    allowRowDragAndDrop: true
});
gantt.appendTo('#Gantt');
```

---

## Programmatic Row Reorder

Use `gantt.reorderRows(fromIndexes, toIndex, position)` to move rows without drag interaction:

```typescript
// Move row at index 1 to below row at index 2
gantt.reorderRows([1], 2, 'below');

// Move multiple rows above row at index 5
gantt.reorderRows([1, 3], 5, 'above');
```

---

## Customize Drag and Drop Events

| Event | Fired When | Common Use |
|-------|-----------|------------|
| `rowDragStartHelper` | Before drag begins | Cancel drag for specific rows (`args.cancel = true`) |
| `rowDragStart` | Drag starts | Apply visual styles to dragged rows |
| `rowDrag` | During drag movement | Update styles dynamically |
| `rowDrop` | Row is dropped | Cancel drop for specific targets |

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowRowDragAndDrop: true,
    rowDragStartHelper: (args: any) => {
        if (args.data[0].TaskID === 2) args.cancel = true;   // prevent drag for task 2
    },
    rowDragStart: (args: any) => {
        if (args.data[0].Progress < 50) {
            args.rows.forEach((row: HTMLElement) => row.style.background = '#ec9ec8');
        }
    },
    rowDrag: (args: any) => {
        if (args.data[0].Progress > 50) {
            args.rows.forEach((row: HTMLElement) => row.style.background = '#c5f4fd');
        }
    },
    rowDrop: (args: any) => {
        if (args.data[0].TaskID === 4) args.cancel = true;   // prevent drop for task 4
    }
});
gantt.appendTo('#Gantt');
```

---

## Prevent Child Drop Position

Cancel `'middleSegment'` drops in `rowDrop` and redirect to an allowed position via `reorderRows`:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowRowDragAndDrop: true,
    rowDrop: (args: any) => {
        if (args.dropPosition === 'middleSegment') {
            args.cancel = true;
            gantt.reorderRows([args.fromIndex], args.dropIndex, 'above');  // redirect to above
        }
    }
});
gantt.appendTo('#Gantt');
```

---

## Indent and Outdent

- **Indent** — moves the selected row one level deeper (becomes last child of the row above).
- **Outdent** — shifts the selected row one level up (becomes sibling of its former parent).

**Requirements**: `Edit` module injected, `editSettings.allowEditing: true`.

```typescript
import { Gantt, Toolbar, Edit, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar, Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '420px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    toolbar: ['Indent', 'Outdent'],
    editSettings: { allowEditing: true }
});
gantt.appendTo('#Gantt');
```

> Indent/Outdent does not support selecting and modifying multiple rows simultaneously.

---

## Programmatic Indent and Outdent

Select the target row first with `selectRow()`, then call `indent()` or `outdent()`:

```typescript
// Indent row at index 2
gantt.selectRow(2);
gantt.indent();

// Outdent row at index 2
gantt.selectRow(2);
gantt.outdent();
```

---

## Retrieve Indent and Outdent Details

Use `actionComplete` to detect indent/outdent completion. Check `args.requestType`:

```typescript
let gantt: Gantt = new Gantt({
    // ...
    toolbar: ['Indent', 'Outdent'],
    editSettings: { allowEditing: true },
    actionComplete: (args: any) => {
        if (args.requestType === 'indented') {
            console.log('Task indented:', args.data[0].TaskID);
        } else if (args.requestType === 'outdented') {
            console.log('Task outdented:', args.data[0].TaskID);
        }
    }
});
```
