# Context Menu in Syncfusion Angular Gantt Chart

## Table of Contents
- [Enabling context menu](#enabling-context-menu)
- [Default context menu items](#default-context-menu-items)
- [Custom context menu items](#custom-context-menu-items)
- [contextMenuOpen event](#contextmenuopen-event)
- [contextMenuClick event](#contextmenuclick-event)
- [Item visibility by target](#item-visibility-by-target)

---

## Enabling context menu

Set `enableContextMenu` to `true` and inject `ContextMenuService` in the component's `providers`:

```typescript
import { GanttModule, ContextMenuService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [ContextMenuService],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskSettings"
      [enableContextMenu]="true"
      [editSettings]="editSettings">
    </ejs-gantt>
  `
})
export class AppComponent { }
```

> Context menu items are automatically shown/hidden based on the clicked target (header vs. row) and the current `editSettings` configuration.

---

## Default context menu items

| Item | Description | Appears on |
|---|---|---|
| `AutoFit` | Fits clicked column to content width | Column header |
| `AutoFitAll` | Fits all columns to content | Column header |
| `SortAscending` | Sorts column ascending | Column header |
| `SortDescending` | Sorts column descending | Column header |
| `TaskInformation` | Opens task edit dialog | Task row |
| `Add` | Inserts a new task (sub-menu: Above, Below, Child, Milestone) | Task row |
| `Indent` | Moves task one level inward | Task row |
| `Outdent` | Moves task one level outward | Task row |
| `DeleteTask` | Deletes selected task | Task row |
| `Save` | Saves current cell edit | Task row (editing) |
| `Cancel` | Cancels current cell edit | Task row (editing) |
| `SplitTask` | Splits task at clicked date | Task row |
| `MergeTask` | Merges split segments (sub-menu: Left, Right) | Split task row |
| `Convert` | Converts task (sub-menu: To Milestone, To Task) | Task row |
| `DeleteDependency` | Deletes dependency of selected task | Connector line |

> Items that require disabled features (e.g., `Add` without `allowAdding`) will be automatically disabled or hidden.

---

## Custom context menu items

Use the `contextMenuItems` property to add custom items alongside or instead of defaults. Items use `ContextMenuItemModel` format:

```typescript
import { ContextMenuItemModel } from '@syncfusion/ej2-angular-grids';

@Component({
  template: `
    <ejs-gantt
      [contextMenuItems]="contextMenuItems"
      (contextMenuClick)="contextMenuClick($event)">
    </ejs-gantt>
  `
})
export class AppComponent {
  public contextMenuItems: (string | ContextMenuItemModel)[] = [
    'TaskInformation',
    'DeleteTask',
    { id: 'markComplete', text: 'Mark as Complete', target: '.e-content', iconCss: 'e-icons e-check' },
    { id: 'hideCol',      text: 'Hide Column',       target: '.e-gridheader', iconCss: 'e-icons e-hide' }
  ];
}
```

### ContextMenuItemModel properties

| Property | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the item |
| `text` | string | Display label |
| `target` | string | CSS selector: `.e-content` for rows, `.e-gridheader` for headers |
| `iconCss` | string | CSS class for icon (e.g., `e-icons e-check`) |
| `items` | object[] | Sub-menu items |
| `disabled` | boolean | Whether item is initially disabled |
| `separator` | boolean | Set `true` to render as a divider line |

---

## contextMenuOpen event

Fires before the context menu is displayed. Use to dynamically show/hide items:

```typescript
import { BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-navigations';

public contextMenuOpen(args: BeforeOpenCloseMenuEventArgs & { rowInfo?: any }): void {
  // Hide 'markComplete' for already-complete tasks
  if (args.rowInfo?.rowData) {
    const progress = (args.rowInfo.rowData as any).taskData?.Progress;
    if (progress === 100) {
      const item = args.element.querySelector('#markComplete');
      if (item) {
        (item as HTMLElement).style.display = 'none';
      }
    }
  }
}
```

---

## contextMenuClick event

Fires when a context menu item is clicked. The `args` object includes item id, text, and row data:

```typescript
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';

public contextMenuClick(args: MenuEventArgs): void {
  if (args.item.id === 'markComplete') {
    const rowData = (args as any).rowInfo?.rowData;
    if (rowData) {
      // Update task progress to 100
      this.ganttObj!.updateRecordByID({
        ...rowData.taskData,
        Progress: 100
      });
    }
  }
  if (args.item.id === 'hideCol') {
    const col = (args as any).column?.field;
    if (col) {
      this.ganttObj!.hideColumn(col);
    }
  }
}
```

---

## Item visibility by target

The `target` property on custom items controls where they appear:

| `target` value | Item appears when right-clicking on |
|---|---|
| `.e-content` | Task rows (grid content area) |
| `.e-gridheader` | Column header cells |
| `.e-chart-row` | Chart/taskbar area |
| *(omit target)* | Appears in all contexts |

### Full example

```typescript
import { Component, ViewChild } from '@angular/core';
import { GanttModule, GanttComponent, ContextMenuService } from '@syncfusion/ej2-angular-gantt';
import { ContextMenuItemModel } from '@syncfusion/ej2-angular-grids';

@Component({
  imports: [GanttModule],
  providers: [ContextMenuService],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-gantt #gantt
      [dataSource]="data"
      [taskFields]="taskSettings"
      [enableContextMenu]="true"
      [editSettings]="editSettings"
      [contextMenuItems]="contextMenuItems"
      (contextMenuClick)="onContextMenuClick($event)">
    </ejs-gantt>
  `
})
export class AppComponent {
  @ViewChild('gantt') public ganttObj?: GanttComponent;

  public editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true
  };

  public contextMenuItems: (string | ContextMenuItemModel)[] = [
    'TaskInformation',
    'Add',
    'DeleteTask',
    { separator: true },
    {
      id: 'expandAll',
      text: 'Expand All Children',
      target: '.e-content',
      iconCss: 'e-icons e-expand'
    }
  ];

  public onContextMenuClick(args: any): void {
    if (args.item.id === 'expandAll') {
      this.ganttObj?.expandAll();
    }
  }

  public taskSettings = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks'
  };

  public data = [
    {
      TaskID: 1, TaskName: 'Planning', StartDate: new Date('2024-04-01'), EndDate: new Date('2024-04-10'),
      subtasks: [
        { TaskID: 2, TaskName: 'Analysis', StartDate: new Date('2024-04-01'), Duration: 4, Progress: 50 },
        { TaskID: 3, TaskName: 'Design', StartDate: new Date('2024-04-05'), Duration: 3, Progress: 30 }
      ]
    }
  ];
}
```
