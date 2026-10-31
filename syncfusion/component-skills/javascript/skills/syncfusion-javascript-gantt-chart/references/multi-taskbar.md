# Resource Multi Taskbar in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enabling Multi Taskbar](#enabling-multi-taskbar)
- [Disabling Taskbar Overlap](#disabling-taskbar-overlap)
- [Key Behaviours](#key-behaviours)

## Overview

The **Multi Taskbar** feature (`enableMultiTaskbar: true`) displays all tasks assigned to a resource in a **single collapsed row**, rather than expanding to show each task on its own row.

This is useful when:
- You want a compact view of all tasks per resource
- Resources have many assigned tasks and full expansion would be too tall
- You want to see potential scheduling conflicts (overlapping tasks) at a glance

> Requires `viewType: 'ResourceView'` and the `Edit`, `Toolbar`, `Selection` modules.

---

## Enabling Multi Taskbar

```typescript
import { Gantt, Toolbar, Edit, Selection } from '@syncfusion/ej2-gantt';
import { selfReferenceData, resources } from './datasource';

Gantt.Inject(Toolbar, Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: selfReferenceData,
    resources: resources,
    viewType: 'ResourceView',
    enableMultiTaskbar: true,      // show multiple taskbars per resource row when collapsed
    showOverAllocation: true,      // highlight over-allocated periods
    collapseAllParentTasks: true,  // start with all resource rows collapsed
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        endDate: 'EndDate', duration: 'Duration', progress: 'Progress',
        dependency: 'Predecessor', resourceInfo: 'resources',
        work: 'work', expandState: 'isExpand', parentID: 'ParentID'
    },
    resourceFields: {
        id: 'resourceId', name: 'resourceName',
        unit: 'resourceUnit', group: 'resourceGroup'
    },
    editSettings: {
        allowAdding: true, allowEditing: true, allowDeleting: true,
        allowTaskbarEditing: true, showDeleteConfirmDialog: true
    },
    columns: [
        { field: 'TaskID' },
        { field: 'TaskName', headerText: 'Name', width: 250 },
        { field: 'work', headerText: 'Work' },
        { field: 'Progress' },
        { field: 'resourceGroup', headerText: 'Group' },
        { field: 'StartDate' },
        { field: 'Duration' }
    ],
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
    labelSettings: { rightLabel: 'resources', taskLabel: 'TaskName' },
    projectStartDate: new Date('03/28/2024'),
    projectEndDate: new Date('05/18/2024')
});
gantt.appendTo('#Gantt');
```

---

## Disabling Taskbar Overlap

By default when multi taskbar is enabled, overlapping tasks render on top of each other in the collapsed row. Set `allowTaskbarOverlap: false` to stack them vertically (row height expands):

```typescript
let gantt: Gantt = new Gantt({
    viewType: 'ResourceView',
    enableMultiTaskbar: true,
    allowTaskbarOverlap: false,    // stack tasks vertically instead of overlapping
    // ... other config
});
gantt.appendTo('#Gantt');
```

**Behaviour differences:**

| Property | `allowTaskbarOverlap: true` (default) | `allowTaskbarOverlap: false` |
|----------|--------------------------------------|------------------------------|
| Overlapping tasks | Rendered on top of each other | Stacked vertically, row height increases |
| Dependency lines | Supported | Not supported between tasks on multiple lines |
| Overallocation visibility | Via `showOverAllocation` brackets | Visually apparent from stacking |

---

## Key Behaviours

- **Collapse/expand** of resource rows is only available via the tree grid arrow icon — the chart side action is disabled in multi-taskbar mode
- **Taskbar editing** (drag/resize) works in the collapsed multi-taskbar state
- **Multiple tasks on same date** overlap visually when `allowTaskbarOverlap: true`
- Use `collapseAllParentTasks: true` to start all resources collapsed and immediately show the multi-taskbar view
- `expandState` field in `taskFields` maps a boolean field to control initial expand/collapse state per resource record
