# Resources in Syncfusion Gantt Chart

## Table of Contents
- [Resource Collection Setup](#resource-collection-setup)
- [Assigning Resources to Tasks](#assigning-resources-to-tasks)
- [Full Configuration Example](#full-configuration-example)
- [Adding/Editing Resources](#addingediting-resources)
- [Resource Custom Colors](#resource-custom-colors)
- [Custom Colors for Resource Column and Taskbar](#custom-colors-for-resource-column-and-taskbar)
- [Resource Labels](#resource-labels)

---

## Resource Collection Setup

Define a `resources` array and map fields with `resourceFields`:

| resourceFields property | Description |
|------------------------|-------------|
| `id` | Unique resource identifier used to assign resources to tasks |
| `name` | Resource display name (shown in columns and labels) |
| `unit` | Default work units (%) this resource allocates per day across all tasks |
| `group` | Group/team the resource belongs to (used in resource view grouping) |

```typescript
let projectResources: Object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team', resourceUnit: 100 },
    { resourceId: 2, resourceName: 'Rose Fuller', resourceGroup: 'Testing Team', resourceUnit: 70 },
    { resourceId: 3, resourceName: 'Margaret Buchanan', resourceGroup: 'Approval Team' },
    { resourceId: 4, resourceName: 'Fuller King', resourceGroup: 'Development Team' },
    { resourceId: 5, resourceName: 'Davolio Fuller', resourceGroup: 'Approval Team' },
    { resourceId: 6, resourceName: 'Van Jack', resourceGroup: 'Development Team', resourceUnit: 40 }
];
```

---

## Assigning Resources to Tasks

### Assign by resource ID (full 100% unit)

```typescript
{ TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2024'),
  Duration: 4, Progress: 50, resources: [1] }    // resource 1 at default 100%
```

### Assign by resource ID (multiple resources)

```typescript
{ TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/02/2024'),
  Duration: 4, Progress: 50, resources: [2, 3, 5] }    // 3 resources at their default units
```

### Assign with explicit unit override

```typescript
{ TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'),
  Duration: 4, Progress: 50,
  resources: [
    { resourceId: 2, resourceUnit: 70 },    // Rose Fuller at 70% allocation
    { resourceId: 1, resourceUnit: 50 }     // Martin Tamer at 50% allocation
  ]
}
```

> When `resourceUnit` is not specified in the task, the resource's default `unit` from the resources collection is used. If no unit is set in either place, it defaults to 100%.

---

## Full Configuration Example

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let projectResources: Object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team', resourceUnit: 100 },
    { resourceId: 2, resourceName: 'Rose Fuller', resourceGroup: 'Testing Team', resourceUnit: 70 },
    { resourceId: 3, resourceName: 'Margaret Buchanan', resourceGroup: 'Approval Team' },
    { resourceId: 4, resourceName: 'Fuller King', resourceGroup: 'Development Team' },
    { resourceId: 5, resourceName: 'Davolio Fuller', resourceGroup: 'Approval Team' },
    { resourceId: 12, resourceName: 'Construction Supervisor', resourceGroup: 'Supervision' }
];

let ganttData: Object[] = [
    {
        TaskID: 1, TaskName: 'Project initiation',
        StartDate: new Date('04/02/2024'), EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, resources: [1] },
            { TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, resources: [2, 3, 5] },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50 }
        ]
    },
    {
        TaskID: 5, TaskName: 'Project estimation',
        StartDate: new Date('04/02/2024'), EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 6, TaskName: 'Develop floor plan', StartDate: new Date('04/04/2024'), Duration: 3, Progress: 50, resources: [4] },
            { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2024'), Duration: 3, Progress: 50, resources: [4, 8] },
            { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2024'), Duration: 3, Progress: 50, resources: [12, 5] }
        ]
    }
];

let gantt: Gantt = new Gantt({
    dataSource: ganttData,
    resources: projectResources,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress',
        resourceInfo: 'resources',    // maps resource assignment field
        child: 'subtasks'
    },
    resourceFields: {
        id: 'resourceId',
        name: 'resourceName',
        unit: 'resourceUnit',
        group: 'resourceGroup'
    },
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: '100' },
        { field: 'TaskName', headerText: 'Task Name', width: '250' },
        { field: 'resources', headerText: 'Resources', width: '200' },
        { field: 'StartDate', headerText: 'Start Date', width: '150' },
        { field: 'Duration', headerText: 'Duration', width: '100' },
        { field: 'Progress', headerText: 'Progress', width: '100' }
    ]
});
gantt.appendTo('#Gantt');
```

---

## Adding/Editing Resources

With `editSettings.mode: 'Dialog'`, the edit dialog includes a **Resources** tab where you can:
- Add or remove resources from a task
- Change resource unit (allocation percentage) per task

```typescript
editSettings: {
    allowEditing: true,
    allowAdding: true,
    mode: 'Dialog'   // Dialog edit mode shows resource tab
}
```

---

## Resource Custom Colors

Use `queryTaskbarInfo` for per-resource taskbar colors and a column `template` for the resources column:

```typescript
queryTaskbarInfo: function (args: any) {
    switch (args.data.resources) {
        case 'Martin Tamer':
            args.taskbarBgColor = '#DFECFF';
            args.progressBarBgColor = '#006AA6';
            break;
        case 'Rose Fuller':
            args.taskbarBgColor = '#E4E4E7';
            args.progressBarBgColor = '#766B7C';
            break;
    }
}
```

---

## Custom Colors for Resource Column and Taskbar

Combine a column `template` (for resource column badge styling) with `queryTaskbarInfo` (for taskbar colors) to apply per-resource color customization:

```typescript
import { Gantt, Toolbar, Edit, Selection } from '@syncfusion/ej2-gantt';

// Helper functions exposed to the column template
(window as any).Resources = (resource: any) => {
    const colorMap: { [key: string]: string } = {
        'Martin Tamer':      'background: #DFECFF',
        'Rose Fuller':       'background: #E4E4E7',
        'Margaret Buchanan': 'background: #DFFFE2',
        'Tamer Vinet':       'background: #FFEBE9'
    };
    return `display: flex; padding: 1.5px 12px; border-radius: 24px; ${colorMap[resource] || ''}`;
};

(window as any).ResourcesStyles = (resource: any) => {
    const textColorMap: { [key: string]: string } = {
        'Martin Tamer':      'color: #006AA6',
        'Rose Fuller':       'color: #766B7C',
        'Margaret Buchanan': 'color: #00A653',
        'Tamer Vinet':       'color: #FF3740'
    };
    return `font-weight: 500; font-size: 14px; ${textColorMap[resource] || ''}`;
};

Gantt.Inject(Toolbar, Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    resources: editingResources,
    queryTaskbarInfo(args: any) {
        const taskbarColorMap: { [key: string]: { bg: string; progress: string } } = {
            'Martin Tamer':      { bg: '#DFECFF', progress: '#006AA6' },
            'Rose Fuller':       { bg: '#E4E4E7', progress: '#766B7C' },
            'Margaret Buchanan': { bg: '#DFFFE2', progress: '#00A653' },
            'Tamer Vinet':       { bg: '#FFEBE9', progress: '#FF3740' }
        };
        const colors = taskbarColorMap[args.data.resources];
        if (colors) {
            args.taskbarBgColor = colors.bg;
            args.progressBarBgColor = colors.progress;
        }
    },
    taskFields: {
        id: 'TaskID', name: 'TaskName', resourceInfo: 'resources',
        startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID'
    },
    resourceFields: { id: 'resourceId', name: 'resourceName' },
    columns: [
        { field: 'TaskID', visible: false },
        { field: 'TaskName', headerText: 'Task Name', width: 250 },
        { field: 'resources', headerText: 'Resources', width: 175, template: '#resColumnTemplate' },
        // template uses Resources() and ResourcesStyles() helpers for badge styling
        { field: 'Progress', width: 150 },
        { field: 'StartDate', width: 150 },
        { field: 'Duration', width: 150 }
    ],
    splitterSettings: { columnIndex: 3 },
    labelSettings: { rightLabel: 'resources' }
});
gantt.appendTo('#Gantt');
```

> The `template` property on the column renders a custom HTML badge per resource name. Use `queryTaskbarInfo` to match taskbar colors with the same resource palette.

---

## Resource Labels

Display resource names as task labels:

```typescript
labelSettings: {
    rightLabel: 'resources'    // shows resource names to the right of taskbars
}
```
