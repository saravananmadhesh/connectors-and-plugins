# Resources in Angular Gantt Chart

## Table of Contents
- [Configure Resource Collection](#configure-resource-collection)
- [Assign Resources to Tasks](#assign-resources-to-tasks)
- [Display Resources in Labels and Columns](#display-resources-in-labels-and-columns)
- [Resource View Mode](#resource-view-mode)
- [Multi-Taskbar for Resource View](#multi-taskbar-for-resource-view)
- [Configure taskbar overlap](#configure-taskbar-overlap)
- [Work Units and Resource Units](#work-units-and-resource-units)
- [Over-Allocation Indicators](#over-allocation-indicators)
- [Edit Resources via Dialog](#edit-resources-via-dialog)

---

## Configure Resource Collection

Define available resources in an array and map with `resourceFields`:

```typescript
public resources: object[] = [
  { resourceId: 1, resourceName: 'Martin Tamer',    resourceGroup: 'Planning Team',     resourceUnit: 50 },
  { resourceId: 2, resourceName: 'Rose Fuller',      resourceGroup: 'Testing Team',      resourceUnit: 70 },
  { resourceId: 3, resourceName: 'Margaret Buchanan', resourceGroup: 'Approval Team' },
  { resourceId: 4, resourceName: 'Fuller King',      resourceGroup: 'Development Team' },
];

public resourceFields: object = {
  id: 'resourceId',       // Unique resource identifier
  name: 'resourceName',   // Display name
  unit: 'resourceUnit',   // Work capacity % per day (0-100, default 100)
  group: 'resourceGroup'  // Grouping category
};
```

---

## Assign Resources to Tasks

Map resources to tasks via `taskFields.resourceInfo`:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  resourceInfo: 'resources'  // Field in task data containing resource assignments
};
```

**Simple assignment (by ID):**
```typescript
{ TaskID: 2, TaskName: 'Identify Site', StartDate: new Date('04/02/2024'), Duration: 4, resources: [1] }
```
Assigns resource 1 at default 100% unit.

**With explicit unit:**
```typescript
{ TaskID: 3, TaskName: 'Soil Test', StartDate: new Date('04/02/2024'), Duration: 4,
  resources: [{ resourceId: 1, resourceUnit: 50 }, { resourceId: 2, resourceUnit: 70 }] }
```
Assigns two resources with specific utilization percentages.

---

## Display Resources in Labels and Columns

Show resource names on taskbar labels:

```typescript
public labelSettings: object = {
  leftLabel: 'TaskName',
  rightLabel: 'resources'   // Shows resource names to the right of taskbar
};
```

Add a resource column to the TreeGrid:
```typescript
public columns: object[] = [
  { field: 'TaskID', headerText: 'ID' },
  { field: 'TaskName', headerText: 'Task Name' },
  { field: 'resources', headerText: 'Resources' }  // Lists assigned resource names
];
```

---

## Resource View Mode

Display tasks organized by resource (resource as parent, tasks as children):

```html
<ejs-gantt
  [dataSource]="data"
  [resources]="resources"
  [resourceFields]="resourceFields"
  [taskFields]="taskFields"
  viewType="ResourceView">
</ejs-gantt>
```

In resource view:
- Each resource is a parent row
- Tasks assigned to that resource appear as child rows
- Unassigned tasks group under **Unassigned Task** node
- Parent tasks are not supported in resource view

---

## Multi-Taskbar for Resource View

Show multiple taskbars per resource row when tasks overlap:

```html
<ejs-gantt viewType="ResourceView" [showOverAllocationAsMultiTaskbar]="true"></ejs-gantt>
```

When `showOverAllocationAsMultiTaskbar: true`, overlapping tasks for a resource stack vertically within the same row instead of being shown on separate rows.

**Note:** Multi-taskbar is not compatible with split tasks.

---

## Configure taskbar overlap

The [allowTaskbarOverlap](https://ej2.syncfusion.com/angular/documentation/api/gantt#allowtaskbaroverlap) property controls how multiple taskbars are rendered inside a single resource row when multi-taskbar is enabled in Resource view.

- **Overlapping mode (true, default)**: taskbars overlap within the standard row height. This supports dependency connections between tasks of the same resource.
- **Non-overlapping mode (false)**: taskbars are vertically stacked and the row height is increased to avoid overlap. Dependencies between tasks of the same resource are not supported (inter-resource dependencies still work).

Disable taskbar overlap:

```html
<ejs-gantt
  viewType="ResourceView"
  [showOverAllocationAsMultiTaskbar]="true"
  [allowTaskbarOverlap]="false">
</ejs-gantt>
```

Example (component-level binding):

```typescript
export class AppComponent {
  public allowTaskbarOverlap: boolean = false;
  public viewType: string = 'ResourceView';
}
```

---

## Work Units and Resource Units

Configure working hours per day globally:

```typescript
public dayWorkingTime: object[] = [
  { from: 8, to: 17 }  // 9 hours/day (08:00–17:00)
];
```

```html
<ejs-gantt [dayWorkingTime]="dayWorkingTime"></ejs-gantt>
```

For work-based scheduling, map the `work` field:
```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  work: 'Work',           // Total effort in hours
  resourceInfo: 'resources'
};
```

### Complete work-based scheduling example

Work-based (effort-driven) scheduling calculates task duration automatically from the total `Work` hours and the assigned resource's `resourceUnit` (capacity %), combined with `dayWorkingTime`. Duration = Work ÷ (resourceUnit% × hoursPerDay).

```typescript
import { Component } from '@angular/core';
import { GanttModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  standalone: true,
  providers: [EditService, ToolbarService],
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [resources]="resources"
      [resourceFields]="resourceFields"
      [dayWorkingTime]="dayWorkingTime"
      [toolbar]="toolbar"
      [editSettings]="editSettings"
      [height]="'450px'">
    </ejs-gantt>
  `
})
export class AppComponent {

  // 1. Define available resources with capacity (resourceUnit = % of day available)
  public resources: object[] = [
    { resourceId: 1, resourceName: 'Alice',   resourceUnit: 100 }, // full-time
    { resourceId: 2, resourceName: 'Bob',     resourceUnit: 50  }, // half-time
    { resourceId: 3, resourceName: 'Charlie', resourceUnit: 75  }, // 75% available
  ];

  public resourceFields: object = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'resourceUnit'   // capacity % per day (0–100)
  };

  // 2. Working hours per day: 08:00–17:00 = 9 hours
  public dayWorkingTime: object[] = [
    { from: 8, to: 17 }
  ];

  // 3. taskFields — use 'work' instead of 'duration' for effort-driven tasks
  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    work: 'Work',             // Effort in hours — Gantt computes Duration automatically
    resourceInfo: 'resources',
    child: 'subtasks'
  };

  // 4. Data — Work is specified in hours; Duration is calculated by Gantt
  // Formula: Duration = Work ÷ (resourceUnit% × hoursPerDay)
  // Alice (100%) on 16h work → 16 ÷ (1.0 × 9) ≈ 1.78 days
  // Bob   (50%)  on 18h work → 18 ÷ (0.5 × 9) = 4 days
  public data: object[] = [
    {
      TaskID: 1,
      TaskName: 'Project Phase 1',
      StartDate: new Date('04/01/2024'),
      subtasks: [
        {
          TaskID: 2,
          TaskName: 'Requirements Analysis',
          StartDate: new Date('04/01/2024'),
          Work: 16,                         // 16 hours of effort
          resources: [{ resourceId: 1, resourceUnit: 100 }]  // Alice, full-time
        },
        {
          TaskID: 3,
          TaskName: 'Database Design',
          StartDate: new Date('04/01/2024'),
          Work: 18,                         // 18 hours of effort
          resources: [{ resourceId: 2, resourceUnit: 50 }]   // Bob, half-time
        },
        {
          TaskID: 4,
          TaskName: 'UI Prototyping',
          StartDate: new Date('04/01/2024'),
          Work: 27,                         // 27 hours of effort
          resources: [
            { resourceId: 1, resourceUnit: 50 },  // Alice at 50%
            { resourceId: 3, resourceUnit: 75 }   // Charlie at 75% → combined 125%
          ]
        }
      ]
    }
  ];

  public toolbar: string[] = ['Add', 'Edit', 'Delete'];
  public editSettings: object = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
  };
}
```

**How duration is computed:**

| Task | Work (hrs) | Resource Unit | Hours/Day | Computed Duration |
|------|-----------|---------------|-----------|-------------------|
| Requirements Analysis | 16 | 100% (Alice) | 9 | 16 ÷ 9 ≈ **1.8 days** |
| Database Design | 18 | 50% (Bob) | 9 | 18 ÷ (0.5×9) = **4 days** |
| UI Prototyping | 27 | 50%+75%=125% | 9 | 27 ÷ (1.25×9) = **2.4 days** |

**Important notes:**
- When `work` is mapped, do **not** also map `duration` — Gantt computes it
- `dayWorkingTime` defines the hours/day used in the formula
- `resourceUnit` on the task overrides the default unit set in `resources`
- Inject `EditService` so resource edits in the dialog recalculate duration live

---

## Over-Allocation Indicators

In resource view, when a resource is assigned more work than their available capacity for a time period, the Gantt can highlight this:

```html
<ejs-gantt viewType="ResourceView" [showOverAllocationAsMultiTaskbar]="true"></ejs-gantt>
```

Over-allocation is visually indicated by stacked taskbars or color-coded indicators, helping project managers identify resource conflicts.

---

## Edit Resources via Dialog

When `editDialogFields` includes `{ type: 'Resources' }`, the Resources tab appears in the edit dialog, allowing users to add/remove resource assignments and adjust units:

```typescript
public editDialogFields: object[] = [
  { type: 'General' },
  { type: 'Dependency' },
  { type: 'Resources' },  // Shows resource assignment UI
  { type: 'Notes' }
];
```
