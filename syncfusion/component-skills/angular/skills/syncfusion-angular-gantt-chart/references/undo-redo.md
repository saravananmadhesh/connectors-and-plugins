````markdown
# Undo and Redo in Angular Gantt Chart

## Table of Contents
- [Setup](#setup)
- [Supported undoRedoActions](#supported-undoredoactions)
- [undoRedoStepsCount](#undoredostepscount)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Programmatic Undo/Redo](#programmatic-undoredo)

---

## Setup

Enable undo/redo by setting `enableUndoRedo: true`, injecting `UndoRedoService`, and adding `'Undo'`/`'Redo'` to the toolbar:

```typescript
import { GanttModule, UndoRedoService, EditService, ToolbarService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [UndoRedoService, EditService, ToolbarService],
  standalone: true,
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [enableUndoRedo]="true"
      [undoRedoStepsCount]="10"
      [undoRedoActions]="undoRedoActions"
      [toolbar]="toolbar"
      [editSettings]="editSettings"
      height="450px">
    </ejs-gantt>
  `
})
export class AppComponent {
  public toolbar: string[] = ['Undo', 'Redo', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  public undoRedoActions: string[] = ['Edit', 'Delete', 'Add', 'Sorting', 'Filtering', 'ColumnReorder', 'ColumnResize', 'RowDragAndDrop', 'TaskbarDragAndDrop'];
  public editSettings: object = { allowEditing: true, allowAdding: true, allowDeleting: true, allowTaskbarEditing: true };
}
```

> Both `UndoRedoService` and `EditService` must be injected for undo/redo to function.

---

## Supported undoRedoActions

| Action | Required Service | Behavior |
|---|---|---|
| `'Edit'` | `EditService` | Reverts task field changes |
| `'Delete'` | `EditService` | Restores deleted tasks |
| `'Add'` | `EditService` | Removes added tasks |
| `'ColumnReorder'` | `ReorderService` | Reverts column reordering |
| `'ColumnResize'` | (none) | Reverts column width changes |
| `'Indent'` | `EditService` | Reverts indent operations |
| `'Outdent'` | `EditService` | Reverts outdent operations |
| `'RowDragAndDrop'` | `RowDDService` | Restores row drag-and-drop positions |
| `'TaskbarDragAndDrop'` | `EditService` | Reverts taskbar drag edits |
| `'Sorting'` | `SortService` | Reverts column sort state |
| `'Filtering'` | `FilterService` | Reverts filter state |
| `'Search'` | `ToolbarService` | Reverts search query |
| `'ZoomIn'` | (none) | Reverts zoom in |
| `'ZoomOut'` | (none) | Reverts zoom out |
| `'ZoomToFit'` | (none) | Reverts zoom-to-fit |
| `'ColumnState'` | (none) | Restores hidden/visible column state |
| `'PreviousTimeSpan'` | (none) | Reverts timeline previous navigation |
| `'NextTimeSpan'` | (none) | Reverts timeline next navigation |

Include only the actions you want tracked — unlisted actions are not reversible:

```typescript
// Minimal undo: only task edits and deletes
public undoRedoActions: string[] = ['Edit', 'Delete', 'Add'];

// Full undo including column and sort state
public undoRedoActions: string[] = [
  'Edit', 'Delete', 'Add', 'Sorting', 'Filtering',
  'ColumnReorder', 'ColumnResize', 'ColumnState',
  'RowDragAndDrop', 'TaskbarDragAndDrop',
  'ZoomIn', 'ZoomOut', 'ZoomToFit',
  'PreviousTimeSpan', 'NextTimeSpan'
];
```

---

## undoRedoStepsCount

Sets the maximum number of actions stored in history (default: 10):

```typescript
public undoRedoStepsCount: number = 20;  // Remember up to 20 actions
```

```html
<ejs-gantt [undoRedoStepsCount]="undoRedoStepsCount"></ejs-gantt>
```

When the history stack is full, the oldest action is dropped on new actions.

---

## Keyboard Shortcuts

| Action | Shortcut |
|---|---|
| Undo | `Ctrl + Z` |
| Redo | `Ctrl + Y` |

These work automatically when `enableUndoRedo: true` and the Gantt has keyboard focus.

---

## Programmatic Undo/Redo

```typescript
import { ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';

@ViewChild('gantt') public ganttObj?: GanttComponent;

public undo(): void {
  this.ganttObj?.undo();
}

public redo(): void {
  this.ganttObj?.redo();
}
```

```html
<ejs-gantt #gantt></ejs-gantt>
<button (click)="undo()">Undo</button>
<button (click)="redo()">Redo</button>
```

---

## Common Pitfalls

| Issue | Cause | Fix |
|---|---|---|
| Undo/Redo buttons not visible | `ToolbarService` not injected | Add `ToolbarService` to `providers` |
| Undo does nothing | `UndoRedoService` not injected | Add `UndoRedoService` to `providers` |
| Action not reversible | Action not listed in `undoRedoActions` | Add the action string to `undoRedoActions` |
| Only 10 steps available | Default `undoRedoStepsCount` | Increase `undoRedoStepsCount` |
````
