# Work & Task Types in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Mapping Work Field](#mapping-work-field)
- [Work Units](#work-units)
- [Task Types](#task-types)

## Overview

**Work** is the total effort (hours/days/minutes) required to complete a task. It is distinct from **duration** (calendar time) — work represents the actual effort while duration is the elapsed time.

When `taskFields.work` is mapped, the default task type becomes `FixedWork`. The three fields — **work**, **duration**, and **resource unit** — are interdependent and recalculate automatically when any one changes (depending on the task type).

---

## Mapping Work Field

```typescript
import { Gantt, Toolbar, Edit, Selection } from '@syncfusion/ej2-gantt';
import { GanttData, projectResources } from './datasource';

Gantt.Inject(Toolbar, Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress',
        resourceInfo: 'resources',
        work: 'Work',               // maps the work hours field
        parentID: 'ParentID'
    },
    resources: projectResources,
    resourceFields: { id: 'resourceId', name: 'resourceName', unit: 'Unit' },
    workUnit: 'Hour',               // 'Hour' | 'Day' | 'Minute' (default: 'Hour')
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
    editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, allowTaskbarEditing: true },
    columns: [
        { field: 'TaskID', visible: false },
        { field: 'TaskName', headerText: 'Task Name', width: '180' },
        { field: 'resources', headerText: 'Resources', width: '160' },
        { field: 'Work', width: '110' },
        { field: 'Duration', width: '100' }
    ]
});
gantt.appendTo('#Gantt');
```

---

## Work Units

| `workUnit` value | Description |
|-----------------|-------------|
| `'Hour'` | Work measured in hours (default) |
| `'Day'` | Work measured in days |
| `'Minute'` | Work measured in minutes |

---

## Task Types

The `taskType` property controls which field stays **constant** when the others change:

| Task Type | `Duration` edit | `Work` edit | `Resource Unit` edit |
|-----------|-----------------|-------------|---------------------|
| `FixedUnit` (default) | Work updates | Duration updates | Duration updates |
| `FixedWork` | Resource unit updates | Duration updates | Duration updates |
| `FixedDuration` | Work updates | Resource unit updates | Work updates |

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskType: 'FixedWork',   // 'FixedUnit' | 'FixedWork' | 'FixedDuration'
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', resourceInfo: 'resources', work: 'Work', parentID: 'ParentID'
    },
    resources: projectResources,
    resourceFields: { id: 'resourceId', name: 'resourceName', unit: 'Unit' },
    workUnit: 'Hour',
    columns: [
        { field: 'TaskName', width: '180' },
        { field: 'resources', headerText: 'Resources', width: '160' },
        { field: 'Work', width: '110' },
        { field: 'Duration', width: '100' },
        { field: 'taskType', headerText: 'Task Type', width: '110' }  // show task type in grid
    ]
});
gantt.appendTo('#Gantt');
```

**Key notes:**
- `FixedUnit` is the default when `taskType` is not specified
- When `work` is mapped in `taskFields`, the default task type changes to `FixedWork`
- For **manually scheduled tasks**, some calculation rules differ (see table below)
- Milestone tasks (duration = 0) are not affected by task type calculations

**Manual task overrides:**
| Task Type | Manual Duration edit | Manual Work edit | Manual Resource Unit edit |
|-----------|---------------------|-----------------|--------------------------|
| FixedWork | Work updates | Resource unit updates | Work updates |
| FixedUnit | Work updates | Resource unit updates | Work updates |
