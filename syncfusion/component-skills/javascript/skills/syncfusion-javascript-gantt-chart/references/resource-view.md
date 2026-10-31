# Resource View in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enabling Resource View](#enabling-resource-view)
- [Over-Allocation](#over-allocation)
- [Unassigned Tasks](#unassigned-tasks)
- [Taskbar Drag and Drop in Resource View](#taskbar-drag-and-drop-in-resource-view)
- [Resource View Configuration Example](#resource-view-configuration-example)

---

## Overview

The **Resource View** (`viewType: 'ResourceView'`) displays the Gantt in a resource-centric layout:
- Resources appear as **parent rows**
- Tasks assigned to each resource appear as **child rows** under that resource
- Multiple resources can share the same task (task appears under each assigned resource)

Use resource view when you want to see workload distribution per resource rather than per task hierarchy.

---

## Enabling Resource View

Set `viewType: 'ResourceView'` and provide `resources` and `resourceFields`:

```typescript
import { Gantt, Toolbar, Edit, Selection } from '@syncfusion/ej2-gantt';
import { GanttData, resourceData } from './datasource';

Gantt.Inject(Toolbar, Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    resources: resourceData,
    viewType: 'ResourceView',    // switch to resource-centric layout
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        endDate: 'EndDate', duration: 'Duration', progress: 'Progress',
        resourceInfo: 'resources', work: 'work', child: 'subtasks'
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
        { field: 'TaskID', visible: false },
        { field: 'TaskName', headerText: 'Name', width: 250 },
        { field: 'work', headerText: 'Work' },
        { field: 'Progress' },
        { field: 'resourceGroup', headerText: 'Group' },
        { field: 'StartDate' },
        { field: 'Duration' }
    ],
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
    labelSettings: { rightLabel: 'resources' },
    splitterSettings: { columnIndex: 3 },
    allowResizing: true,
    treeColumnIndex: 1,
    height: '450px',
    projectStartDate: new Date('03/28/2024'),
    projectEndDate: new Date('05/18/2024')
});
gantt.appendTo('#Gantt');
```

> **Note:** Unscheduled tasks are not supported in Resource View.

---

## Over-Allocation

Over-allocation occurs when a resource is assigned more work than available in a working day (based on `dayWorkingTime` and resource unit).

Enable visual over-allocation highlighting with `showOverAllocation: true`:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: overAllocationData,
    resources: resources,
    viewType: 'ResourceView',
    showOverAllocation: true,    // highlights over-allocated periods with square brackets
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate',
        duration: 'Duration', progress: 'Progress', resourceInfo: 'resources',
        work: 'work', parentID: 'ParentID'
    },
    resourceFields: { id: 'resourceId', name: 'resourceName', unit: 'resourceUnit', group: 'resourceGroup' },
    // Toggle over-allocation display via toolbar button:
    toolbar: [
        'Add', 'Edit', 'Update', 'Delete', 'Cancel',
        { text: 'Show/Hide Overallocation', id: 'showhidebar' }
    ],
    toolbarClick: (args: any) => {
        if (args.item.id === 'showhidebar') {
            gantt.showOverAllocation = !gantt.showOverAllocation;
        }
    },
    height: '450px'
});
gantt.appendTo('#Gantt');
```

---

## Unassigned Tasks

Tasks not assigned to any resource are grouped under a special **"Unassigned Task"** parent row at the bottom of the Gantt data. This grouping is applied automatically at load time based on the `taskFields.resourceInfo` mapping.

- If a resource is later assigned to an unassigned task, the task moves to the respective resource's child group
- Unassigned task grouping requires no additional configuration — it works automatically in `ResourceView`

> **Note:** Unscheduled tasks are not supported in Resource View.

---

## Taskbar Drag and Drop in Resource View

Enable vertical taskbar drag and drop between resources using `allowTaskbarDragAndDrop: true`. This allows moving a taskbar from one resource row to another, reassigning the task automatically.

Requires injecting the `RowDD` module:

```typescript
import { Gantt, Toolbar, Edit, Selection, RowDD } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar, Edit, Selection, RowDD);

let gantt: Gantt = new Gantt({
    dataSource: overAllocationData,
    resources: resources,
    viewType: 'ResourceView',
    showOverAllocation: true,
    enableMultiTaskbar: true,        // show multiple taskbars in collapsed resource rows
    allowTaskbarDragAndDrop: true,   // enable vertical drag between resource rows
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate',
        duration: 'Duration', progress: 'Progress', dependency: 'Predecessor',
        resourceInfo: 'resources', work: 'work', expandState: 'isExpand', parentID: 'ParentID'
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
    toolbar: ['ExpandAll', 'CollapseAll'],
    labelSettings: { rightLabel: 'resources', taskLabel: 'TaskName' },
    projectStartDate: new Date('03/28/2024'),
    projectEndDate: new Date('05/18/2024')
});
gantt.appendTo('#Gantt');
```

> Use `expandState` field (mapped to a boolean in data) to control initial expand/collapse state per resource row.

---

## Resource View Configuration Example

Key properties for resource view:

| Property | Type | Description |
|----------|------|-------------|
| `viewType` | `'ProjectView' \| 'ResourceView'` | Switch between standard and resource-centric views |
| `showOverAllocation` | `boolean` | Highlight over-allocated date ranges (default: `false`) |
| `enableMultiTaskbar` | `boolean` | Show multiple taskbars in collapsed resource rows (default: `false`) |
| `allowTaskbarOverlap` | `boolean` | Allow/prevent taskbars overlapping in collapsed resource rows (default: `true`) |
| `collapseAllParentTasks` | `boolean` | Collapse all resource parent rows on initial load |

See `references/multi-taskbar.md` for multi-taskbar configuration details.
