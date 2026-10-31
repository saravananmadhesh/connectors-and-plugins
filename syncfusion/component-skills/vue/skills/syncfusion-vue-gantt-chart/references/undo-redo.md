# Undo and Redo

## Table of Contents
- [Overview](#overview)
- [Setup — Module and Toolbar](#setup--module-and-toolbar)
- [undoRedoStepsCount](#undoredostepscount)
- [Configure Tracked Actions](#configure-tracked-actions)
- [Supported Actions](#supported-actions)
- [Programmatic Undo and Redo](#programmatic-undo-and-redo)
- [Get and Clear Undo/Redo Collections](#get-and-clear-undoredo-collections)
- [Events](#events)

## Overview

The Gantt `UndoRedo` module tracks editing operations and lets users reverse or re-apply them via toolbar buttons or the `undo()` / `redo()` API. Up to `undoRedoStepsCount` steps are remembered per session.

## Setup — Module and Toolbar

```vue
<template>
  <ejs-gantt
    ref="ganttRef"
    :dataSource="data"
    :taskFields="taskFields"
    :editSettings="editSettings"
    :enableUndoRedo="true"
    :toolbar="['Undo', 'Redo', 'Add', 'Edit', 'Delete', 'Update', 'Cancel']"
    :undoRedoStepsCount="20"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  GanttComponent as EjsGantt,
  Edit,
  Toolbar,
  UndoRedo
} from '@syncfusion/ej2-vue-gantt';

provide('gantt', [Edit, Toolbar, UndoRedo]);

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration'
};

const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
  allowTaskbarEditing: true
};
</script>
```

> **Requirements:**
> - Set `enableUndoRedo: true` on the component
> - `UndoRedo` module must be injected via `provide('gantt', [UndoRedo])`
> - `Edit` module must also be injected (undo/redo tracks edit actions)
> - `Toolbar` module required for the `'Undo'` and `'Redo'` toolbar buttons

## undoRedoStepsCount

Controls how many steps are kept in the history stack. Default is `10`:

```vue
<ejs-gantt :undoRedoStepsCount="50" ...></ejs-gantt>
```

Increasing this consumes more memory; decreasing it limits the undo depth.

## Configure Tracked Actions

By default all supported actions are tracked. Use `undoRedoActions` to restrict which actions are stored in the history:

```vue
<ejs-gantt
  :enableUndoRedo="true"
  :undoRedoActions="['Edit', 'Delete', 'Add', 'Sorting', 'Filtering']"
  ...
></ejs-gantt>
```

## Supported Actions

All available action names for the `undoRedoActions` array:

| Action string | Description |
|---|---|
| `'Add'` | Add a new task |
| `'Edit'` | Edit task via cell or dialog |
| `'Delete'` | Delete a task |
| `'Indent'` | Indent (demote) a task |
| `'Outdent'` | Outdent (promote) a task |
| `'RowDragAndDrop'` | Row reorder via drag and drop |
| `'TaskbarDragAndDrop'` | Taskbar drag (move / resize) |
| `'Sorting'` | Column sort |
| `'Filtering'` | Column filter |
| `'Search'` | Toolbar search |
| `'ColumnReorder'` | Column reorder |
| `'ColumnResize'` | Column resize |
| `'ColumnState'` | Show / hide columns |
| `'ZoomIn'` | Zoom in on timeline |
| `'ZoomOut'` | Zoom out on timeline |
| `'ZoomToFit'` | Zoom to fit timeline |
| `'PreviousTimeSpan'` | Navigate to previous time span |
| `'NextTimeSpan'` | Navigate to next time span |

## Programmatic Undo and Redo

```js
const gantt = this.$refs.ganttRef.ej2Instances;

// Undo the last action
gantt.undo();

// Redo the last undone action
gantt.redo();

// Check if undo/redo is available (optional — toolbar buttons auto-disable)
const undoStack = gantt.undoRedoModule.undoCollection;
const redoStack = gantt.undoRedoModule.redoCollection;

if (undoStack.length > 0) {
  gantt.undo();
}
```

## Get and Clear Undo/Redo Collections

Retrieve the stored action stacks or reset them programmatically:

```js
const gantt = this.$refs.ganttRef.ej2Instances;

// Get the current undo/redo stacks
const undoStack = gantt.getUndoActions();
const redoStack = gantt.getRedoActions();
console.log('Undo steps:', undoStack.length);

// Clear undo history
gantt.clearUndoCollection();

// Clear redo history
gantt.clearRedoCollection();
```

## Events

```vue
<ejs-gantt @actionComplete="onActionComplete" ...></ejs-gantt>

<script setup>
function onActionComplete(args) {
  if (args.requestType === 'undo') {
    console.log('Undo performed:', args.undoRedoAction);
  }
  if (args.requestType === 'redo') {
    console.log('Redo performed:', args.undoRedoAction);
  }
}
</script>
```

### Disable undo tracking for a specific action

Wrap programmatic operations so they bypass the undo stack:

```js
// Temporarily disable undo tracking
gantt.undoRedoModule.isUndoRedo = true;

// Perform action — will NOT be added to undo history
gantt.updateProjectDates(new Date('2024-01-01'), new Date('2024-12-31'));

// Re-enable undo tracking
gantt.undoRedoModule.isUndoRedo = false;
```
