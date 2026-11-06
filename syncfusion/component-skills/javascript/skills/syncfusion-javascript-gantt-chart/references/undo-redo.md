# Undo/Redo in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Supported Undo/Redo Actions](#supported-undoredo-actions)
- [Configure Steps Count](#configure-steps-count)
- [Programmatic Undo and Redo](#programmatic-undo-and-redo)
- [Retrieve Undo and Redo Stack Collection](#retrieve-undo-and-redo-stack-collection)
- [Clear Undo and Redo Collection](#clear-undo-and-redo-collection)
- [Key Properties](#key-properties)

---

## Overview

Undo/Redo lets users revert or reapply actions like task edits, deletions, dependency changes, and more.

**Module required**: `UndoRedo`

## Basic Setup

```typescript
import { Gantt, Toolbar, Selection, Edit, Filter, Sort, RowDD, Reorder, Resize, UndoRedo } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar, Selection, Edit, Filter, Sort, RowDD, Reorder, Resize, UndoRedo);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    enableUndoRedo: true,
    undoRedoStepsCount: 10,             // max history steps (default: 10); 0 = disable
    undoRedoActions: ['Edit', 'Delete', 'Add', 'Sorting', 'Filtering', 'ColumnReorder',
                      'Indent', 'Outdent', 'RowDragAndDrop', 'TaskbarDragAndDrop',
                      'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ColumnState', 'PreviousTimeSpan', 'NextTimeSpan'],
    allowSorting: true, allowFiltering: true, allowReordering: true, allowResizing: true, allowRowDragAndDrop: true,
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Undo', 'Redo', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'Indent', 'Outdent'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, allowTaskbarEditing: true, showDeleteConfirmDialog: true }
});
gantt.appendTo('#Gantt');
```

---

## Supported Undo/Redo Actions

| Action | Reverts | Required Module |
|--------|---------|-----------------|
| `Edit` | Task field edits (dialog/taskbar drag) | `Edit` |
| `Delete` | Deleted tasks | `Edit` |
| `Add` | Newly added tasks | `Edit` |
| `ColumnReorder` | Column reordering | `Reorder` |
| `Indent` | Task indent (promote child) | `Edit` |
| `Outdent` | Task outdent (demote child) | `Edit` |
| `ColumnResize` | Column resize | `Resize` |
| `Sorting` | Column sort | `Sort` |
| `Filtering` | Column filter | `Filter` |
| `Search` | Toolbar search | `Filter` |
| `ZoomIn` / `ZoomOut` / `ZoomToFit` | Timeline zoom | `Toolbar` |
| `ColumnState` | Show/hide columns | — |
| `RowDragAndDrop` | Row reorder by drag | `RowDD` |
| `TaskbarDragAndDrop` | Taskbar drag/drop | `Edit` |
| `PreviousTimeSpan` / `NextTimeSpan` | Timeline navigation | — |

---

## Configure Steps Count

Use `undoRedoStepsCount` to limit how many actions are stored in history. Default is `10`. When the limit is exceeded, the oldest action is removed and the latest is added. Setting it to `0` disables undo/redo entirely.

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    enableUndoRedo: true,
    undoRedoStepsCount: 5,              // store only last 5 actions
    undoRedoActions: ['Add', 'Edit', 'Delete', 'Sorting', 'Filtering', 'ZoomIn', 'ZoomOut',
                      'ZoomToFit', 'Indent', 'Outdent', 'PreviousTimeSpan', 'NextTimeSpan', 'ColumnState'],
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit',
              'Indent', 'Outdent', 'PrevTimeSpan', 'NextTimeSpan', 'Undo', 'Redo'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, allowTaskbarEditing: true }
});
gantt.appendTo('#Gantt');
```

---

## Programmatic Undo and Redo

Use the `undo()` and `redo()` methods to trigger undo/redo actions programmatically via external buttons or custom logic, without relying on the toolbar items.

```typescript
import { Gantt, Toolbar, Selection, Edit, Filter, Sort, RowDD, Reorder, Resize, UndoRedo } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar, Selection, Edit, Filter, Sort, RowDD, Reorder, Resize, UndoRedo);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    enableUndoRedo: true,
    undoRedoActions: ['Add', 'Edit', 'Delete', 'Sorting', 'Filtering', 'ZoomIn', 'ZoomOut',
                      'ZoomToFit', 'Indent', 'Outdent', 'PreviousTimeSpan', 'NextTimeSpan', 'ColumnState'],
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit',
              'Indent', 'Outdent', 'PrevTimeSpan', 'NextTimeSpan'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, allowTaskbarEditing: true }
});
gantt.appendTo('#Gantt');

document.getElementById('undoBtn').addEventListener('click', () => {
    gantt.undo();    // revert the last tracked action
});

document.getElementById('redoBtn').addEventListener('click', () => {
    gantt.redo();    // reapply the last undone action
});
```

---

## Retrieve Undo and Redo Stack Collection

Use `getUndoActions()` and `getRedoActions()` to retrieve the current undo and redo stack arrays at any point during runtime. This is useful for inspecting history or building custom UI indicators.

```typescript
document.getElementById('getUndoStack').addEventListener('click', () => {
    const undoStack = gantt.getUndoActions();
    console.log('Undo stack:', undoStack);
});

document.getElementById('getRedoStack').addEventListener('click', () => {
    const redoStack = gantt.getRedoActions();
    console.log('Redo stack:', redoStack);
});
```

---

## Clear Undo and Redo Collection

Use `clearUndoCollection()` and `clearRedoCollection()` to reset the undo and redo stacks at runtime. Useful when switching contexts, loading new data, or preventing users from undoing past a certain point.

```typescript
document.getElementById('clearUndo').addEventListener('click', () => {
    gantt.clearUndoCollection();    // wipes all stored undo actions
});

document.getElementById('clearRedo').addEventListener('click', () => {
    gantt.clearRedoCollection();    // wipes all stored redo actions
});
```

---

## Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `enableUndoRedo` | boolean | Enable/disable undo/redo |
| `undoRedoActions` | string[] | Which actions to track (default: all listed above) |
| `undoRedoStepsCount` | number | Max history steps (default: 10; 0 = disabled) |

## Key Methods

| Method | Description |
|--------|-------------|
| `undo()` | Programmatically revert the last tracked action |
| `redo()` | Programmatically reapply the last undone action |
| `getUndoActions()` | Returns the current undo stack array |
| `getRedoActions()` | Returns the current redo stack array |
| `clearUndoCollection()` | Clears all stored undo actions |
| `clearRedoCollection()` | Clears all stored redo actions |

> The toolbar `Undo` and `Redo` items must be included for UI buttons. The actions list in `undoRedoActions` determines what can be tracked.
