# Task Constraints

## Table of Contents
- [Overview](#overview)
- [Constraint Types](#constraint-types)
- [Configuration](#configuration)
- [Full Example](#full-example)
- [Constraint Violation Popup](#constraint-violation-popup)
- [Programmatic Violation Handling](#programmatic-violation-handling)
- [Displaying Constraint Type as Label](#displaying-constraint-type-as-label)

---

## Overview

Task constraints define rules that control when a task is allowed to start or finish. They enforce scheduling logic, align tasks to fixed milestones, and prevent resource conflicts.

---

## Constraint Types

| Value | Constraint Type | Description |
|---|---|---|
| `0` | As Soon As Possible (ASAP) | Starts immediately once dependencies are cleared (default) |
| `1` | As Late As Possible (ALAP) | Delays the task until the last moment without affecting successors |
| `2` | Must Start On (MSO) | Task must begin on a fixed date |
| `3` | Must Finish On (MFO) | Task must end on a fixed date |
| `4` | Start No Earlier Than (SNET) | Task cannot start before the constraint date |
| `5` | Start No Later Than (SNLT) | Task must start on or before the constraint date |
| `6` | Finish No Earlier Than (FNET) | Task cannot finish before the constraint date |
| `7` | Finish No Later Than (FNLT) | Task must finish on or before the constraint date |

Strict constraint types that trigger violation popups: **MSO**, **MFO**, **SNLT**, **FNLT**.

---

## Configuration

### taskFields mapping

Map `constraintType` and `constraintDate` fields in `taskFields`:

```js
taskFields: {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  constraintType: 'ConstraintType',   // numeric 0–7
  constraintDate: 'ConstraintDate',   // Date value
  dependency: 'Predecessor',
  parentID: 'ParentID'
}
```

### Data source format

Each task can carry optional constraint fields:

```js
{
  TaskID: 1,
  TaskName: 'Design Approval',
  StartDate: new Date('2025-07-01'),
  EndDate: new Date('2025-07-02'),
  ConstraintType: 2,                        // Must Start On
  ConstraintDate: new Date('2025-07-01')
}
```

Tasks without constraint fields default to **ASAP (0)**.

---

## Full Example

```vue
<template>
  <ejs-gantt
    ref="gantt"
    id="ConstraintGantt"
    :dataSource="data"
    :taskFields="taskFields"
    :toolbar="toolbar"
    :editSettings="editSettings"
    :columns="columns"
    :labelSettings="labelSettings"
    :height="height"
    :projectStartDate="projectStartDate"
    :projectEndDate="projectEndDate"
  >
    <template v-slot:rightLabel="{ data }">
      <div>{{ getConstraintText(data.ganttProperties.constraintType) }}</div>
    </template>
  </ejs-gantt>
</template>

<script>
import { GanttComponent, Selection, Toolbar, DayMarkers, Edit, Filter, Sort, ContextMenu } from '@syncfusion/ej2-vue-gantt';
import { constraintData } from './data-source';

export default {
  components: { 'ejs-gantt': GanttComponent },
  data() {
    return {
      data: constraintData,
      height: '450px',
      taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        constraintType: 'ConstraintType',
        constraintDate: 'ConstraintDate',
        dependency: 'Predecessor',
        parentID: 'ParentID'
      },
      editSettings: {
        allowAdding: true, allowEditing: true,
        allowDeleting: true, allowTaskbarEditing: true
      },
      toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
      columns: [
        { field: 'TaskID', width: 80 },
        { field: 'TaskName', width: 220, clipMode: 'EllipsisWithTooltip' },
        { field: 'ConstraintType', width: 180 },
        { field: 'ConstraintDate' },
        { field: 'StartDate' },
        { field: 'EndDate' }
      ],
      labelSettings: {
        leftLabel: 'TaskName',
        rightLabel: 'rightLabel'     // binds to the named slot
      },
      projectStartDate: new Date('03/25/2025'),
      projectEndDate: new Date('09/28/2025')
    };
  },
  methods: {
    getConstraintText(type) {
      const map = {
        0: 'As Soon As Possible', 1: 'As Late As Possible',
        2: 'Must Start On',       3: 'Must Finish On',
        4: 'Start No Earlier Than', 5: 'Start No Later Than',
        6: 'Finish No Earlier Than', 7: 'Finish No Later Than'
      };
      return map[type] || '';
    }
  },
  provide: {
    gantt: [Selection, Toolbar, DayMarkers, Edit, Filter, Sort, ContextMenu]
  }
};
</script>
```

---

## Constraint Violation Popup

When a scheduling change conflicts with a strict constraint (**MSO**, **MFO**, **SNLT**, **FNLT**), Gantt shows a built-in violation popup alerting the user. The popup appears automatically — no extra configuration needed.

---

## Programmatic Violation Handling

Intercept violations via the `actionBegin` event when `requestType === 'validateTaskViolation'`. Set flags in `args.validateMode` to silently enforce constraints (suppress the popup and cancel the update):

| Flag | Constraint enforced silently |
|---|---|
| `respectMustStartOn` | Must Start On (MSO) |
| `respectMustFinishOn` | Must Finish On (MFO) |
| `respectStartNoLaterThan` | Start No Later Than (SNLT) |
| `respectFinishNoLaterThan` | Finish No Later Than (FNLT) |

All flags default to `false` — violations show the popup. Set to `true` to silently block the change.

```vue
<ejs-gantt @actionBegin="onActionBegin" ...></ejs-gantt>

<script>
methods: {
  onActionBegin(args) {
    if (args.requestType === 'validateTaskViolation') {
      args.validateMode.respectMustStartOn = true;       // silent enforce MSO
      args.validateMode.respectMustFinishOn = true;      // silent enforce MFO
      args.validateMode.respectStartNoLaterThan = true;  // silent enforce SNLT
      args.validateMode.respectFinishNoLaterThan = true; // silent enforce FNLT
    }
  }
}
</script>
```

> Setting all four flags to `true` disables the violation popup entirely — all strict constraint violations are silently rejected.

---

## Displaying Constraint Type as Label

Use a named slot in `labelSettings.rightLabel` to show constraint names alongside taskbars:

```vue
<ejs-gantt :labelSettings="labelSettings" ...>
  <template v-slot:rightLabel="{ data }">
    <div>{{ getConstraintText(data.ganttProperties.constraintType) }}</div>
  </template>
</ejs-gantt>

<script>
data() {
  return {
    labelSettings: {
      leftLabel: 'TaskName',
      rightLabel: 'rightLabel'   // must match the slot name
    }
  };
},
methods: {
  getConstraintText(type) {
    const map = {
      0: 'ASAP', 1: 'ALAP', 2: 'MSO', 3: 'MFO',
      4: 'SNET', 5: 'SNLT', 6: 'FNET', 7: 'FNLT'
    };
    return map[type] || '';
  }
}
</script>
```

Access the numeric type via `data.ganttProperties.constraintType` inside the slot.
