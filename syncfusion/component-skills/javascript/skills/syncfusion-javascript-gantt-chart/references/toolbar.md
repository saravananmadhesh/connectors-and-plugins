# Toolbar in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Customize Built-in Toolbar Behavior](#override-built-in-toolbar-behavior)
- [Show Only Icons in Built-in Toolbar Items](#show-only-icons-in-built-in-toolbar-items)
- [Customize Toolbar Buttons Using CSS](#customize-toolbar-buttons-using-css)
- [Add Toolbar at the Bottom of Gantt](#add-toolbar-at-the-bottom-of-gantt)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Built-in and Custom Items Together](#built-in-and-custom-items-in-toolbar)
- [Enable/Disable Toolbar Items](#enabledisable-toolbar-items)
- [Add Input Elements to Toolbar](#add-input-elements-to-toolbar)
- [Toolbar Events](#toolbar-events)

---

## Overview

The Gantt toolbar provides built-in action buttons and supports custom toolbar items.

**Module required**: `Toolbar`

## Built-in Toolbar Items

```typescript
import { Gantt, Toolbar, Selection, Edit, Filter } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar, Selection, Edit, Filter);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '420px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'CollapseAll', 'ExpandAll',
              'NextTimeSpan', 'PrevTimeSpan', 'Search', 'Indent', 'Outdent',
              'ZoomIn', 'ZoomOut', 'ZoomToFit', 'Undo', 'Redo'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, allowTaskbarEditing: true, showDeleteConfirmDialog: true }
});
gantt.appendTo('#Gantt');
```

**Complete built-in toolbar items:**
| Item | Action | Requires |
|------|--------|---------|
| `Add` | Open add dialog | `Edit` |
| `Edit` | Open edit dialog for selected row | `Edit` |
| `Update` | Save current cell edit | `Edit` |
| `Delete` | Delete selected task | `Edit` |
| `Cancel` | Cancel current edit | `Edit` |
| `Search` | Show toolbar search box | `Filter` |
| `ExpandAll` | Expand all tree rows | — |
| `CollapseAll` | Collapse all tree rows | — |
| `Indent` | Indent selected task | `Edit` |
| `Outdent` | Outdent selected task | `Edit` |
| `PrevTimeSpan` | Navigate timeline backward | — |
| `NextTimeSpan` | Navigate timeline forward | — |
| `ZoomIn` | Increase timeline cell width | — |
| `ZoomOut` | Decrease timeline cell width | — |
| `ZoomToFit` | Fit all tasks in viewport | — |
| `Undo` | Undo last action | `UndoRedo` |
| `Redo` | Redo undone action | `UndoRedo` |

---

## Custom Toolbar Items

Add custom items alongside built-in ones using `ItemModel`:

```typescript
import { Gantt, Toolbar } from '@syncfusion/ej2-gantt';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Gantt.Inject(Toolbar);

let gantt: Gantt = new Gantt({
    toolbar: [
        'Add', 'Edit', 'Delete',
        { text: 'Export', id: 'exportBtn', prefixIcon: 'e-export' },
        { text: 'Refresh', id: 'refreshBtn' }
    ],
    toolbarClick: (args: ClickEventArgs) => {
        if (args.item.id === 'exportBtn') {
            // custom export logic
        }
        if (args.item.id === 'refreshBtn') {
            gantt.dataSource = getUpdatedData();
        }
    }
});
```

---

## Override Built-in Toolbar Behavior

Use `toolbarClick` with `args.cancel = true` to override default actions:

```typescript
toolbarClick: (args: ClickEventArgs) => {
    if (args.item.id === 'Gantt_add') {
        args.cancel = true;        // prevent default add dialog
        // perform custom action
        gantt.addRecord({ TaskName: 'Custom Task', Duration: 3 }, 'Bottom');
    }
}
```

> Built-in toolbar button IDs follow the format `{ganttElementId}_{itemText}` (e.g., `Gantt_add`, `Gantt_delete`).

---

## Show Only Icons in Built-in Toolbar Items

To display only icons (no text labels) in built-in toolbar items, apply this CSS to hide the label text:

```css
.e-gantt .e-toolbar .e-tbar-btn-text,
.e-gantt .e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn-text {
    display: none;
}
```

No changes to the TypeScript configuration are needed — the toolbar items are defined as normal.

---

## Customize Toolbar Buttons Using CSS

Customize the appearance of toolbar buttons using CSS class selectors targeting the toolbar icons and buttons:

```css
.e-gantt .e-toolbar .e-tbar-btn .e-icons,
.e-gantt .e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn {
    background: #add8e6;
}
```

---

## Add Toolbar at the Bottom of Gantt

To reposition the toolbar to the bottom of the Gantt, use the `created` event to move the toolbar element via DOM manipulation:

```typescript
import { Gantt, Toolbar, Edit } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar, Edit);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '420px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExpandAll', 'CollapseAll'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    created: function () {
        var toolbar = gantt.element.querySelector('.e-toolbar');
        gantt.element.appendChild(toolbar);   // moves toolbar to the bottom of the Gantt container
    }
});
gantt.appendTo('#Gantt');
```

---

## Built-in and Custom Items in Toolbar

Built-in and custom toolbar items can coexist in the same toolbar array. Custom items use `ItemModel` objects; built-ins use string names:

```typescript
import { Gantt, Toolbar, Filter } from '@syncfusion/ej2-gantt';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Gantt.Inject(Toolbar, Filter);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    toolbar: [
        'ExpandAll',
        'CollapseAll',
        { text: 'Test', tooltipText: 'Test', id: 'Test' }   // custom item alongside built-ins
    ],
    toolbarClick: (args: ClickEventArgs) => {
        if (args.item.text === 'Test') {
            console.log('Custom toolbar item clicked');
        }
    }
});
gantt.appendTo('#Gantt');
```

> If a toolbar item string does not match any built-in item name, it is treated as a custom toolbar item.

---

## Enable/Disable Toolbar Items

Use `gantt.toolbarModule.enableItems()` to dynamically enable or disable toolbar items at runtime:

```typescript
import { Gantt, Toolbar, Filter } from '@syncfusion/ej2-gantt';
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';

Gantt.Inject(Toolbar, Filter);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    allowFiltering: true,
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    toolbar: [
        { text: 'Quick Filter', id: 'QuickFilter' },
        { text: 'Clear Filter', id: 'ClearFilter' }
    ],
    toolbarClick: (args: any) => {
        if (args.item.id === 'QuickFilter') {
            gantt.filterByColumn('TaskName', 'startswith', 'Identify');
        }
        if (args.item.id === 'ClearFilter') {
            gantt.clearFiltering();
        }
    }
});
gantt.appendTo('#Gantt');

let switchObj: Switch = new Switch({
    checked: true,
    change: (args: ChangeEventArgs) => {
        // Pass item IDs and enable/disable flag
        gantt.toolbarModule.enableItems(['QuickFilter', 'ClearFilter'], args.checked as boolean);
    }
});
switchObj.appendTo('#switch');
```

---

## Add Input Elements to Toolbar

Add editor components (e.g., AutoComplete, DropDownList, DatePicker) to the toolbar using `type: 'Input'` with a `template` property pointing to the component instance:

```typescript
import { Gantt, Toolbar, Filter } from '@syncfusion/ej2-gantt';
import { AutoComplete, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

Gantt.Inject(Toolbar, Filter);

let autoComplete: AutoComplete = new AutoComplete({
    dataSource: ['Task A', 'Task B', 'Task C'],
    placeholder: 'Search TaskName',
    change: (args: ChangeEventArgs) => {
        if (args.value) {
            gantt.filterByColumn('TaskName', 'equal', args.value as string);
        } else {
            gantt.clearFiltering();
        }
    }
});

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '420px',
    allowFiltering: true,
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    toolbar: [
        {
            type: 'Input',           // marks this as an input-type toolbar item
            template: autoComplete,  // any EJ2 component instance
            align: 'Left',
            tooltipText: 'Search TaskName'
        }
    ]
});
gantt.appendTo('#Gantt');
```

> The `align` property on toolbar items accepts `'Left'` (default), `'Center'`, or `'Right'` to control placement.

---

## Toolbar Events

| Event | Description |
|-------|-------------|
| `toolbarClick` | Fires when any toolbar item is clicked |

```typescript
toolbarClick: (args: ClickEventArgs) => {
    console.log('Toolbar item clicked:', args.item.id);
}
```
