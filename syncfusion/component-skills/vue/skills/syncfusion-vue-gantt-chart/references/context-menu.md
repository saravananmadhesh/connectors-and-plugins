# Context Menu

Right-click context menu for quick task and column operations.

## Table of Contents
- [Overview](#overview)
- [Module Injection](#module-injection)
- [Enabling Context Menu](#enabling-context-menu)
- [Default Context Menu Items](#default-context-menu-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Context Menu Events](#context-menu-events)
- [Controlling Item Visibility](#controlling-item-visibility)
- [Touch Interaction](#touch-interaction)

## Overview

The Gantt context menu appears when the user right-clicks a row or column header. It provides quick access to editing, sorting, and row operations without requiring toolbar interactions.

## Module Injection

Inject `ContextMenu` along with supporting modules:

```js
// Composition API (Vue 3)
import { provide } from 'vue';
import { ContextMenu, Edit, Sort, Resize, Selection } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [ContextMenu, Edit, Sort, Resize, Selection]);

// Options API
provide: {
  gantt: [ContextMenu, Edit, Sort, Resize, Selection]
}
```

> `Resize` is needed for the `AutoFit` / `AutoFitAll` context menu items to work correctly.

## Enabling Context Menu

Set `enableContextMenu: true` and inject required modules. Enable `allowSorting` and `allowResizing` for full item support:

```vue
<ejs-gantt
  :enableContextMenu="true"
  :allowSorting="true"
  :allowResizing="true"
  :editSettings="editSettings"
  ...
></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { GanttComponent as EjsGantt, ContextMenu, Edit, Sort, Resize, Selection } from '@syncfusion/ej2-vue-gantt';

const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true
};

provide('gantt', [ContextMenu, Edit, Sort, Resize, Selection]);
</script>
```

## Default Context Menu Items

The following built-in items are available. They appear automatically based on the context (row vs header, task type, edit settings):

| Item | Description |
|---|---|
| `AutoFit` | Auto-fits the current column width |
| `AutoFitAll` | Auto-fits all column widths |
| `SortAscending` | Sorts the current column ascending |
| `SortDescending` | Sorts the current column descending |
| `TaskInformation` | Opens the edit dialog for the selected task |
| `Add` | Adds a new row to the Gantt |
| `Indent` | Indents the selected row one level (make child) |
| `Outdent` | Outdents the selected row one level (promote) |
| `DeleteTask` | Deletes the current task |
| `Save` | Saves the edited task |
| `Cancel` | Cancels the edited task |
| `DeleteDependency` | Deletes the current dependency link |
| `Convert` | Converts the task to a milestone or vice versa |

> Items are shown/hidden automatically based on `editSettings` flags and the row type.

## Custom Context Menu Items

Pass an array to `contextMenuItems` mixing built-in strings and custom descriptor objects:

```vue
<ejs-gantt
  ref="ganttRef"
  :enableContextMenu="true"
  :allowSorting="true"
  :allowResizing="true"
  :editSettings="editSettings"
  :contextMenuItems="contextMenuItems"
  :contextMenuClick="contextMenuClick"
  :contextMenuOpen="contextMenuOpen"
  ...
></ejs-gantt>

<script setup>
import { provide, ref } from 'vue';
import { GanttComponent as EjsGantt, ContextMenu, Edit, Sort, Resize, Selection } from '@syncfusion/ej2-vue-gantt';

const ganttRef = ref(null);

const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true
};

const contextMenuItems = [
  'AutoFitAll', 'AutoFit',
  'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
  'SortAscending', 'SortDescending',
  'Add', 'DeleteDependency', 'Convert',
  { text: 'Collapse the Row', target: '.e-content',    id: 'collapserow' },
  { text: 'Expand the Row',   target: '.e-content',    id: 'expandrow' },
  { text: 'Hide Column',      target: '.e-gridheader', id: 'hidecols' }
];

provide('gantt', [ContextMenu, Edit, Sort, Resize, Selection]);
</script>
```

### Custom item descriptor properties

| Property | Type | Description |
|---|---|---|
| `text` | string | Label shown in the menu |
| `id` | string | Unique identifier used in `contextMenuClick` |
| `target` | string | CSS selector restricting where the item appears (`.e-content` = rows, `.e-gridheader` = headers) |
| `iconCss` | string | CSS class for the menu item icon |

## Context Menu Events

### `contextMenuClick`

Fired when any context menu item (built-in or custom) is clicked:

```vue
<ejs-gantt ref="ganttRef" :contextMenuClick="onContextMenuClick" ...></ejs-gantt>

<script setup>
import { ref } from 'vue';
const ganttRef = ref(null);

const onContextMenuClick = (args) => {
  const record = args.rowData;
  const gantt = ganttRef.value.ej2Instances;

  if (args.item.id === 'collapserow') {
    gantt.collapseByID(Number(record.ganttProperties.taskId));
  }
  if (args.item.id === 'expandrow') {
    gantt.expandByID(Number(record.ganttProperties.taskId));
  }
  if (args.item.id === 'hidecols') {
    gantt.hideColumn(args.column.headerText);  // args.column available on header right-click
  }
};
</script>
```

### `contextMenuOpen`

Fired before the menu is shown. Use `args.hideItems` to conditionally hide items:

```vue
<ejs-gantt :contextMenuOpen="onContextMenuOpen" ...></ejs-gantt>

<script setup>
const onContextMenuOpen = (args) => {
  const record = args.rowData;
  // args.type === 'Header' when right-clicking column header
  if (args.type !== 'Header') {
    if (!record.hasChildRecords) {
      // Leaf tasks — hide expand/collapse items
      args.hideItems.push('Collapse the Row');
      args.hideItems.push('Expand the Row');
    } else {
      // Parent tasks — show only the relevant direction
      if (record.expanded) {
        args.hideItems.push('Expand the Row');
      } else {
        args.hideItems.push('Collapse the Row');
      }
    }
  }
};
</script>
```

> Use `args.type` to distinguish between `'Header'` and row context clicks. Use `args.hideItems` (array of item `text` strings) to hide items dynamically.

## Controlling Item Visibility

Use the `target` property on custom items to restrict where they appear:

```js
{ text: 'Row Action',    target: '.e-content',    id: 'rowAction' }   // only on row right-click
{ text: 'Header Action', target: '.e-gridheader', id: 'headerAction'} // only on header right-click
```

Use `args.hideItems` in `contextMenuOpen` to dynamically hide items based on the selected row's state.

## Touch Interaction

On touch devices, perform a **long press** on a row to open the context menu. Tap a menu item to trigger its action.
