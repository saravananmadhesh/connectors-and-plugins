# Resources

Assign people, equipment, or materials to Gantt tasks and optionally switch to a resource-grouped view.

## Table of Contents
- [Basic Resource Setup](#basic-resource-setup)
- [Resource Fields Mapping](#resource-fields-mapping)
- [Resource View](#resource-view)
- [Multi-Taskbar View](#multi-taskbar-view)
- [Disable Taskbar Overlap](#disable-taskbar-overlap)
- [Editing Resource Assignments](#editing-resource-assignments)
- [Custom background colors for resource column and taskbar](#custom-background-colors-for-resource-column-and-taskbar)
- [Unassigned task](#unassigned-task)
- [Work Field](#work-field)

## Basic Resource Setup

Define a resource list and map fields via `resourceFields`. Assign resources to tasks via `taskFields.resourceInfo`.

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :resources="resources"
    :resourceFields="resourceFields"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { GanttComponent as EjsGantt } from '@syncfusion/ej2-vue-gantt';

const resources = [
  { resourceId: 1, resourceName: 'Martin Tamer', resourceUnit: 100 },
  { resourceId: 2, resourceName: 'Rose Fuller',  resourceUnit: 100 },
  { resourceId: 3, resourceName: 'Margaret Buchanan', resourceUnit: 100 },
  { resourceId: 4, resourceName: 'Fuller King',  resourceUnit: 100 },
];

const data = [
  { TaskID: 1, TaskName: 'Planning', StartDate: new Date('04/02/2019'), EndDate: new Date('04/06/2019'), ParentID: null },
  { TaskID: 2, TaskName: 'Site survey', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1,
    resources: [1, 2] },                                     // assign by ID
  { TaskID: 3, TaskName: 'Soil test',   StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1,
    resources: [{ resourceId: 3, resourceUnit: 50 }, 4] },   // assign with custom unit %
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  progress: 'Progress',
  parentID: 'ParentID',
  resourceInfo: 'resources'   // field that holds resource assignment
};

const resourceFields = {
  id: 'resourceId',
  name: 'resourceName',
  unit: 'resourceUnit'   // optional: allocation percentage (default 100)
};

</script>
```

## Resource Fields Mapping

| `resourceFields` key | Purpose |
|---|---|
| `id` | Unique resource identifier |
| `name` | Display name |
| `unit` | Work allocation percentage (default: 100%) |
| `group` | Group name for resource grouping |

## Resource View

Display tasks grouped by resource instead of by task hierarchy:

```vue
<ejs-gantt
  :viewType="'ResourceView'"
  :dataSource="data"
  :resources="resources"
  :taskFields="taskFields"
  :resourceFields="resourceFields"
  height="450px"
></ejs-gantt>
```

In resource view, each resource is a top-level row and their assigned tasks appear as children.

## Multi-Taskbar View

Show multiple taskbars for a resource on a single row (stacked view). Useful when a resource has overlapping tasks:

```vue
<ejs-gantt
  :viewType="'ResourceView'"
  :showOverAllocation="true"
  :enableMultiTaskbar="true"
  ...
></ejs-gantt>
```

When `enableMultiTaskbar` is `true`, all tasks for a resource appear in the same row. Over-allocated slots (> 100% unit) are highlighted when `showOverAllocation` is `true`.

> **Note:** Expand/collapse of a resource row in multi-taskbar mode is only possible via the tree grid arrow icon — the chart-side action is disabled in this mode.

## Disable Taskbar Overlap

Prevent taskbars from overlapping for the same resource row using `allowTaskbarOverlap`:

```vue
<ejs-gantt
  :viewType="'ResourceView'"
  :enableMultiTaskbar="true"
  :allowTaskbarOverlap="false"
  :showOverAllocation="true"
  ...
></ejs-gantt>
```

When `allowTaskbarOverlap` is `false`:
- Resources are displayed in a single row
- Row height extends to accommodate all tasks when the resource is in collapsed state
- Over-allocated tasks are easier to identify visually

> **Important:** When `allowTaskbarOverlap` is `false`, task dependencies **cannot** be established between tasks rendered on multiple lines for the same resource. Enable `allowTaskbarOverlap` if inter-task dependencies within the same resource are needed.

## Editing Resource Assignments

Resource assignment editing works through the dialog editor. When `editSettings.mode` is `Dialog`, the edit dialog includes a **Resources** tab where users can add/remove/change resource allocations.

```js
const editSettings = { allowEditing: true, mode: 'Dialog' };
```

## Custom background colors for resource column and taskbar

In the Gantt Component, you can customize the background colors of the resource column and taskbars based on the resources assigned to each task.

To achieve this:
- Use the `template` property to render a custom resource column UI.
- Use the `queryTaskbarInfo` event to update taskbar styles (like `taskbarBgColor` and `progressBarBgColor`).

```vue
<template>
  <ejs-gantt
    ref="gantt"
    id="GanttContainer"
    :queryTaskbarInfo="queryTaskbarInfo"
    :dataSource="data"
    :taskFields="taskFields"
    :resourceFields="resourceFields"
    :resources="resources"
  >
    <e-columns>
      <e-column field="resources" headerText="Resources" width="175" :template="'cTemplate'"></e-column>
    </e-columns>

    <template v-slot:cTemplate="{ data }">
      <div v-if="data.ganttProperties.resourceNames">
        <div :style="getResourceColumnStyle(data.ganttProperties.resourceNames)">
          <span :style="getResourceColumnTextStyle(data.ganttProperties.resourceNames)">
            {{ data.ganttProperties.resourceNames }}
          </span>
        </div>
      </div>
    </template>
  </ejs-gantt>
</template>

<script setup>
const data = [
  {
    TaskID: 1,
    TaskName: 'Project Initiation',
    StartDate: new Date('04/02/2019'),
    EndDate: new Date('04/21/2019'),
    subtasks: [
      {
        TaskID: 2,
        TaskName: 'Identify Site location',
        StartDate: new Date('04/02/2019'),
        Duration: 4,
        Progress: 30,
        resources: [1],
        info: 'Measure the total property area alloted for construction',
      },
      {
        TaskID: 3,
        TaskName: 'Perform Soil test',
        StartDate: new Date('04/02/2019'),
        Duration: 4,
        Predecessor: '2',
        resources: [2],
        info: 'Obtain an engineered soil test of lot where construction is planned.',
      },
      {
        TaskID: 4,
        TaskName: 'Soil test approval',
        StartDate: new Date('04/02/2019'),
        Duration: 4,
        Predecessor: '3',
        Progress: 30,
        resources: [3],
      },
    ],
  },
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  resourceInfo: 'resources',
  startDate: 'StartDate',
  duration: 'Duration',
  progress: 'Progress',
  child: 'subtasks',
};

const resourceFields = {
  id: 'resourceId',
  name: 'resourceName',
};

const resources = [
  { resourceId: 1, resourceName: 'Martin Tamer' },
  { resourceId: 2, resourceName: 'Rose Fuller' },
  { resourceId: 3, resourceName: 'Margaret Buchanan' },
  { resourceId: 4, resourceName: 'Tamer Vinet' },
];

function getFirstResourceName(resourceNames) {
  return String(resourceNames).split(',')[0].trim();
}

function getResourceColumnStyle(resourceNames) {
  const resource = getFirstResourceName(resourceNames);
  switch (resource) {
    case 'Martin Tamer':
      return 'display: flex; padding: 1.5px 12px; gap: 10px; width: 81px; height: 24px; border-radius: 24px; background: #DFECFF';
    case 'Rose Fuller':
      return 'display: flex; padding: 1.5px 12px; gap: 10px; width: 71px; height: 24px; border-radius: 24px; background: #E4E4E7';
    case 'Margaret Buchanan':
      return 'display: flex; padding: 1.5px 12px; gap: 10px; width: 123px; height: 24px; border-radius: 24px; background: #DFFFE2';
    case 'Tamer Vinet':
      return 'display: flex; padding: 1.5px 12px; gap: 10px; width: 75px; height: 24px; border-radius: 24px; background: #FFEBE9';
    default:
      return '';
  }
}

function getResourceColumnTextStyle(resourceNames) {
  const resource = getFirstResourceName(resourceNames);
  switch (resource) {
    case 'Martin Tamer':
      return 'width: 72px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; text-align: center; color: #006AA6';
    case 'Rose Fuller':
      return 'width: 72px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; text-align: center; color: #766B7C';
    case 'Margaret Buchanan':
      return 'width: 72px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; text-align: center; color: #00A653';
    case 'Tamer Vinet':
      return 'width: 72px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; text-align: center; color: #FF3740';
    default:
      return '';
  }
}

const queryTaskbarInfo = (args) => {
  const resourceNames = args?.data?.resources;
  const resource = getFirstResourceName(resourceNames);

  if (resource === 'Martin Tamer') {
    args.taskbarBgColor = '#DFECFF';
    args.progressBarBgColor = '#006AA6';
  } else if (resource === 'Rose Fuller') {
    args.taskbarBgColor = '#E4E4E7';
    args.progressBarBgColor = '#766B7C';
  } else if (resource === 'Margaret Buchanan') {
    args.taskbarBgColor = '#DFFFE2';
    args.progressBarBgColor = '#00A653';
  } else if (resource === 'Tamer Vinet') {
    args.taskbarBgColor = '#FFEBE9';
    args.progressBarBgColor = '#FF3740';
  }
};
</script>
```

## Unassigned task

A task not assigned to any one of the resource are termed as unassigned tasks. The unassigned tasks are grouped with a name as `Unassigned Task` and displayed at the bottom of Gantt data collection.

It is validated at load time during Gantt record creation by default based on a task `resourceInfo` mapping property in the Gantt chart data source. If the resource is assigned to the unassigned grouped tasks, the task will be moved as child to the respective resource.

## Work Field

Track actual work hours instead of (or alongside) duration. The work field is the total hours required to complete a task and can be mapped from the data source using `taskFields.work`.

```js
const taskFields = {
  // ...
  work: 'Work',           // total work hours
  type: 'TaskType'        // 'FixedWork' | 'FixedDuration' | 'FixedUnit'
};
```

### Work Unit

Work can be measured in different units. Configure the `workUnit` property to set the measurement unit:

```js
// Possible values: 'Hour', 'Day', 'Minute'
const workUnit = 'Hour';  // default value
```

| Unit | Description |
|---|---|
| `Hour` | Work measured in hours (default) |
| `Day` | Work measured in days |
| `Minute` | Work measured in minutes |

> **Note:** When the work field is mapped from the data source, the default task type will be `FixedWork`.

### Task Type and Work Relationship

The work, duration, and resource unit fields depend on each other and will change automatically when editing any one of these fields. You can set these field values as constant using the `taskType` property:

| Task Type | Fixed value | Adjusts automatically |
|---|---|---|
| `FixedWork` | Work hours | Duration (based on resource unit %) |
| `FixedDuration` | Duration | Work hours |
| `FixedUnit` | Unit % | Duration |

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :resources="resources"
    :resourceFields="resourceFields"
    :workUnit="'Hour'"
    :taskType="'FixedWork'"
    height="450px"
  ></ejs-gantt>
</template>

```

### Work Calculation Table

How work, duration, and resource unit fields update based on task type and field changes:

| Task Type | When Duration Changes | When Work Changes | When Resource Unit Changes |
|---|---|---|---|
| **FixedWork** | Work remains fixed. Resource unit adjusts. | Duration field updates. *(For manually scheduled tasks: resource unit updates)* | Duration updates. *(For manually scheduled tasks: work field updates)* |
| **FixedDuration** | Duration remains fixed. | Resource unit adjusts. | Work field updates. |
| **FixedUnit** | Work field updates. | Duration adjusts. *(For manually scheduled tasks: resource unit updates)* | Duration remains fixed. *(For manually scheduled tasks: work field updates)* |

> **Important Notes:**
> - `FixedUnit` is the default task type
> - These calculations are not applicable for milestone tasks (duration = 0)
> - Manually scheduled tasks follow different rules (see `taskFields.manual` for details)
