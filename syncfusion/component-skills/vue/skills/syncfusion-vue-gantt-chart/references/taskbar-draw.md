# Taskbar Draw

## Table of Contents
- [Overview](#overview)
- [Enable Taskbar Draw](#enable-taskbar-draw)
- [Taskbar Draw Behavior](#taskbar-draw-behavior)
- [Scheduling Output](#scheduling-output)
- [Prerequisites and Related Settings](#prerequisites-and-related-settings)
- [Example: Taskbar Draw with Calendar](#example-taskbar-draw-with-calendar)
- [Interaction with Dependencies](#interaction-with-dependencies)
- [Interaction with Task Type](#interaction-with-task-type)
- [Behavior for Partially Scheduled Tasks](#behavior-for-partially-scheduled-tasks)
- [Best Practices](#best-practices)
- [Limitations](#limitations)
- [See Also](#see-also)

## Overview

Taskbar Draw lets users create or schedule an unscheduled task by dragging directly on the Gantt timeline. When this interaction is enabled, the Gantt component converts the drawn range into task scheduling values and updates the row with a computed `StartDate`, `EndDate`, and `Duration`.

Use Taskbar Draw when users need to create or place work items visually without opening a dialog first. The feature is designed for unscheduled or partially scheduled rows, and it follows the same scheduling rules used by the rest of the component, including working time, holidays, weekends, dependencies, and task calendars.

## Enable Taskbar Draw

Set `allowTaskbarDraw: true` in `editSettings` and inject the `Edit` module:

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :editSettings="editSettings"
    :allowUnscheduledTasks="true"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { GanttComponent as EjsGantt, Edit } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Edit]);

const editSettings = {
  allowEditing: true,
  allowTaskbarEditing: true,
  allowTaskbarDraw: true  // Enable taskbar drawing
};

const data = [
  { TaskID: 1, TaskName: 'Task 1', StartDate: new Date('04/02/2024'), Duration: 3 },
  { TaskID: 2, TaskName: 'Unscheduled Task', Progress: 0 }  // No start/end/duration
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration'
};
</script>
```

## Taskbar Draw Behavior

When taskbar drawing is enabled, the user can drag across the timeline to define a task duration visually.

### What happens during drawing

- The mouse or touch gesture defines the task span on the timeline
- The component resolves the span into a task schedule
- The row is updated with computed dates and duration values
- The resulting taskbar respects timeline scale, working time, holidays, weekends, and task calendars

### How the draw interaction works

- The drag **start point** becomes the task **start boundary**
- The drag **end point** becomes the task **end boundary**
- The range is adjusted by calendar rules used for normal scheduling
- The taskbar is created or updated only when the drawn range is valid

### User workflow

1. Select or target an unscheduled task row
2. Drag on the timeline where the task should appear
3. Release to commit the drawn range
4. The Gantt component updates the task schedule fields automatically

## Scheduling Output

Taskbar Draw generates scheduling values from the drawn range.

### Generated or updated fields

| Field | Behavior |
|---|---|
| `StartDate` | Set from the left boundary of the drawn taskbar |
| `EndDate` | Set from the right boundary of the drawn taskbar |
| `Duration` | Computed from the resulting span and the active scheduling rules |

If a task already contains some scheduling information, the draw operation updates the missing or editable values based on the current scheduling mode and calendar rules.

### Partial data handling

- **Fully unscheduled task** — all schedule fields are derived from the drawn bar
- **Partially scheduled task** — the drawn range fills or updates the missing schedule information and may recalculate related fields
- **Already scheduled task** — the feature functions as taskbar editing if taskbar drawing is allowed together with taskbar editing

## Prerequisites and Related Settings

Taskbar Draw is part of the editing pipeline and should be configured together with the task scheduling model.

### Required settings

- `editSettings.allowTaskbarDraw = true`
- Inject the `Edit` service
- `allowUnscheduledTasks = true` for unscheduled-row creation scenarios

### Recommended settings

- Combine with `allowTaskbarEditing: true` to allow both creation and modification
- Set `taskMode: 'Auto'` (default) for automatic date calculation
- Configure `dayWorkingTime` or `calendarSettings` to control working hours
- Use `durationUnit` and `daysPerWeek` / `daysPerMonth` for proper duration conversion

## Example: Taskbar Draw with Calendar

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :editSettings="editSettings"
    :calendarSettings="calendarSettings"
    :allowUnscheduledTasks="true"
    :daysPerWeek="5"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { Edit, DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Edit, DayMarkers]);

const editSettings = {
  allowEditing: true,
  allowTaskbarEditing: true,
  allowTaskbarDraw: true
};

const calendarSettings = {
  projectCalendar: {
    workingTime: [{ from: 9, to: 17 }],
    holidays: [{ from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1' }]
  }
};

const data = [
  { TaskID: 1, TaskName: 'Design', StartDate: new Date('04/02/2024'), Duration: 3 },
  { TaskID: 2, TaskName: 'Development', Progress: 0 }  // Unscheduled
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration'
};
</script>
```

## Interaction with Dependencies

When a task with dependencies is drawn:

- The component respects predecessor relationships when calculating the start date
- If the drawn start date violates a predecessor constraint, scheduling validation is triggered
- Offset calculations follow the same rules as manual taskbar editing

## Interaction with Task Type

- **Parent Tasks** — Cannot be drawn; only child/leaf tasks support taskbar draw
- **Milestones** — Can be drawn with `duration: 0` by drawing a single point
- **Split Tasks** — Each segment can be drawn independently
- **Manually Scheduled Tasks** — Taskbar draw updates dates without applying calendar rules (if `taskMode: 'Manual'`)

## Behavior for Partially Scheduled Tasks

If a task already has a start date but no end date/duration:

```
Before draw: StartDate: 04/05/2024, EndDate: null, Duration: null
Draw from 04/05 to 04/10 on timeline
After draw: StartDate: 04/05/2024, EndDate: 04/10/2024, Duration: 5 (calculated)
```

## Best Practices

1. **Combine with Cell Editing** — Allow users to refine drawn tasks via cell/dialog editing afterward.

2. **Test with Calendars** — Ensure drawn taskbars respect your project calendar, especially holidays and working hours.

3. **Provide Affordance** — Consider visual hints (color change, cursor style) to indicate draw mode is active.

4. **Validate After Draw** — Use `taskbarDrawn` or `actionComplete` event to validate or auto-link dependencies.

5. **Document the Feature** — Let users know they can drag on unscheduled rows to create tasks.

## Limitations

- Taskbar draw applies only to unscheduled or partially scheduled rows
- Parent tasks cannot be drawn (only leaf tasks)
- Drawing respects the current timeline scale; very detailed scales may require precise draws
- Touch drawing on mobile may require larger timeline cells for usability

## See Also

- Task Scheduling — Duration units and calendar integration
- Calendar Settings — Project and task calendars
- Task Dependencies — Predecessor relationships
- Taskbar Editing — Drag and resize existing taskbars
- Column Validation — Validate task data
