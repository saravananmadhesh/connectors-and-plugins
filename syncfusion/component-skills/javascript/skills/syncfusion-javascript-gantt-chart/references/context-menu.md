# Context Menu in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Default Context Menu Items](#default-context-menu-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Context Menu Events](#context-menu-events)

## Overview

Right-click the Gantt to open a context menu with task operations.

**Module required**: `ContextMenu`

## Basic Setup

```typescript
import { Gantt, Resize, Sort, ContextMenu, Edit, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Resize, Sort, Edit, ContextMenu, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        dependency: 'Predecessor', duration: 'Duration', progress: 'Progress', child: 'subtasks'
    },
    enableContextMenu: true,
    editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true }
});
gantt.appendTo('#Gantt');
```

---

## Default Context Menu Items

| Item | Description | Requires |
|------|-------------|---------|
| `AutoFit` | Auto-fit current column | — |
| `AutoFitAll` | Auto-fit all columns | — |
| `SortAscending` | Sort column ascending | `Sort` |
| `SortDescending` | Sort column descending | `Sort` |
| `TaskInformation` | Open edit dialog for task | `Edit` |
| `Add` | Add new row | `Edit` |
| `Indent` | Indent selected task | `Edit` |
| `Outdent` | Outdent selected task | `Edit` |
| `DeleteTask` | Delete selected task | `Edit` |
| `Save` | Save current edit | `Edit` |
| `Cancel` | Cancel current edit | `Edit` |
| `DeleteDependency` | Remove a dependency link | `Edit` |
| `Convert` | Convert task to/from milestone | `Edit` |

---

## Custom Context Menu Items

Add custom items and define their actions:

```typescript
import { Gantt, Selection, Toolbar, Edit, Resize, Sort, ContextMenu } from '@syncfusion/ej2-gantt';
import { ContextMenuItemModel } from '@syncfusion/ej2-grids';

Gantt.Inject(Selection, Toolbar, Edit, Resize, Sort, ContextMenu);

const contextMenuItems: (string | ContextMenuItemModel)[] = [
    'AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
    'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert',
    // Custom items for content rows:
    { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' } as ContextMenuItemModel,
    { text: 'Expand the Row', target: '.e-content', id: 'expandrow' } as ContextMenuItemModel,
    // Custom item for column header area:
    { text: 'Hide Column', target: '.e-gridheader', id: 'hidecols' } as ContextMenuItemModel
];

let gantt: Gantt = new Gantt({
    contextMenuItems: contextMenuItems,
    contextMenuClick: (args) => {
        if (args.item.id === 'collapserow') {
            gantt.collapseByID(Number(gantt.getSelectedRowIndexes()[0]));
        }
        if (args.item.id === 'expandrow') {
            gantt.expandByID(Number(gantt.getSelectedRowIndexes()[0]));
        }
        if (args.item.id === 'hidecols') {
            gantt.hideColumn(args.column.headerText);
        }
    },
    contextMenuOpen: (args) => {
        // Control item visibility based on context
        if (args.rowData && args.rowData.hasChildRecords) {
            // show collapse/expand for parent rows only
        }
    }
});
```

**Custom item properties:**
| Property | Description |
|----------|-------------|
| `text` | Display label |
| `id` | Unique identifier for event handling |
| `target` | CSS selector for where item appears: `'.e-content'` (rows) or `'.e-gridheader'` (column headers) |
| `iconCss` | CSS class for icon |

---

## Context Menu Events

| Event | Description |
|-------|-------------|
| `contextMenuOpen` | Fires before context menu opens — use to control item visibility |
| `contextMenuClick` | Fires when a context menu item is clicked |
