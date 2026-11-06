# Taskbar Draw in Angular Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Taskbar Draw](#enable-taskbar-draw)
- [Taskbar Draw Behavior](#taskbar-draw-behavior)
- [Scheduling Output](#scheduling-output)
- [Prerequisites and Related Settings](#prerequisites-and-related-settings)
- [Task Type Scenarios](#task-type-scenarios)
- [Feature Interactions](#feature-interactions)
- [Implementation Example](#implementation-example)
- [Limitations and Best Practices](#limitations-and-best-practices)

---

## Overview

Taskbar Draw lets users create and schedule an unscheduled task by dragging directly on the Gantt timeline. When this interaction is enabled, the Gantt component converts the drawn range into task scheduling values and updates the row with a computed `StartDate`, `EndDate`, and `Duration`.

Use Taskbar Draw when users need to create or place work items visually without opening a dialog first. The feature is designed for unscheduled or partially scheduled rows, and it follows the same scheduling rules used by the rest of the component, including working time, holidays, weekends, dependencies, and task calendars.

Taskbar Draw is configured through `editSettings.allowTaskbarDraw`.

---

## Enable Taskbar Draw

Enable taskbar drawing by setting `allowTaskbarDraw` to `true` in `editSettings` and injecting `EditService`.

```typescript
import { Component } from '@angular/core';
import { GanttModule, EditService } from '@syncfusion/ej2-angular-gantt';

@Component({
  standalone: true,
  imports: [GanttModule],
  providers: [EditService],
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [editSettings]="editSettings"
      [allowUnscheduledTasks]="true">
    </ejs-gantt>
  `
})
export class AppComponent {
  public editSettings: object = {
    allowTaskbarEditing: true,
    allowTaskbarDraw: true
  };

  public data: object[] = [
    { TaskID: 1, TaskName: 'Unscheduled Task', Duration: null }
  ];

  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration'
  };
}
```

### `allowTaskbarDraw`

| Property | Type | Default | Description |
|---|---|---|---|
| `editSettings.allowTaskbarDraw` | `boolean` | `false` | Enables drawing a taskbar on the timeline to create or schedule a task. |

Accepted values:
- `true` — enables taskbar drawing
- `false` — disables taskbar drawing

> The feature is enabled through `editSettings` and requires the `EditService`. In most taskbar-editing scenarios, `allowTaskbarEditing` is enabled together with `allowTaskbarDraw` so users can both create and modify taskbars.

---

## Taskbar Draw Behavior

When taskbar drawing is enabled, the user can drag across the timeline to define a task duration visually.

### What happens during drawing

- The mouse or touch gesture defines the task span on the timeline
- The component resolves the span into a task schedule
- The row is updated with computed dates and duration values
- The resulting taskbar respects timeline scale, working time, holidays, weekends, and task calendars

### How the draw interaction behaves

- The drag start point becomes the task start boundary
- The drag end point becomes the task end boundary
- The range can be adjusted by the same calendar rules used for normal scheduling
- The taskbar is created or updated only when the drawn range is valid

### User workflow

1. Select or target an unscheduled task row
2. Drag on the timeline where the task should appear
3. Release to commit the drawn range
4. The Gantt component updates the task schedule fields automatically

---

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
- **Already scheduled task** — the feature should be treated as editing behavior if taskbar drawing is allowed together with taskbar editing

The exact value calculation depends on the configured duration unit, working time, and calendar settings.

---

## Prerequisites and Related Settings

Taskbar Draw is part of the editing pipeline and should be configured together with the task scheduling model.

### Required settings

- `editSettings.allowTaskbarDraw = true`
- `EditService` must be injected
- `allowUnscheduledTasks = true` for unscheduled-row creation scenarios

### Commonly used related settings

- `allowTaskbarEditing` — allows drag, resize, and progress editing on existing taskbars
- `taskMode` — controls whether tasks are auto, manual, or mixed scheduling
- `durationUnit` and `taskFields.durationUnit` — determine how the drawn range is converted
- `workWeek` and `dayWorkingTime` — define the working hours used in duration calculations
- `holidays` and weekend configuration — affect the generated schedule
- `calendarSettings` and `taskFields.calendarId` — apply task-specific calendar rules
- `validateManualTasksOnLinking` — affects dependency-based updates for manually scheduled rows

---

## Task Type Scenarios

### Fully unscheduled tasks

An unscheduled task is the primary use case for Taskbar Draw. The row has no complete date range, and the user defines the task by drawing a bar on the timeline.

Typical cases:

- no `StartDate` and no `Duration`
- no `StartDate` and no `EndDate`
- duration-only rows that still need a calendar placement

### Partially scheduled tasks

Partially scheduled tasks can be completed by drawing a bar when the remaining schedule information is missing or needs to be re-established.

Examples:

- `StartDate` exists but `EndDate` is missing
- `Duration` exists but date placement is missing
- the task is imported with incomplete schedule data and needs a visual assignment

### Parent tasks

Parent tasks normally derive their dates from child tasks in auto scheduling mode. Taskbar drawing is not the preferred way to author parent schedules because parent dates are typically computed from children.

Recommended behavior:

- use taskbar drawing on leaf tasks or unscheduled work items
- rely on automatic aggregation for parent rows when `taskMode` is `'Auto'`

### Child tasks

Child tasks are valid candidates for Taskbar Draw. Drawn dates should respect the hierarchy and any inherited calendar or dependency rules.

### Milestone tasks

Milestones represent zero-duration work items. They are not good candidates for drag-based duration creation because a drawn bar implies a span.

Recommended behavior:

- use dialog or cell editing for milestone placement
- keep milestone duration at zero when the row is meant to remain a milestone

### Manually scheduled tasks

Manual scheduling preserves task dates as entered unless the user explicitly changes them.

Taskbar Draw can still be used when the task is editable, but the result should follow the manual scheduling rules configured in the Gantt instance.

---

## Feature Interactions

### Taskbar Editing

Taskbar Draw and taskbar editing are complementary.

- Taskbar Draw creates or schedules a task from a blank or partial row
- Taskbar Editing moves or resizes an already scheduled taskbar
- If both are enabled, users can create a task visually and then refine it immediately

### Dialog Editing

Dialog editing remains useful for entering detailed values such as resources, dependencies, or custom fields after a task is drawn.

Recommended pattern:

- draw the taskbar to establish the time range
- open the dialog to complete metadata and validation-driven fields

### Cell Editing

Cell editing can complement Taskbar Draw by letting users fine-tune date, duration, or progress fields after the visual range has been created.

### Scheduling Validation

The drawn range must still satisfy task scheduling rules.

- invalid ranges can be adjusted or rejected depending on the editing flow
- dependencies may shift the resulting dates
- calendar rules can modify the visible duration

### Working Time Calculations

Working time affects how the drawn span is converted into duration.

- hours outside working time are excluded when the calendar requires it
- the visible bar length may differ from the raw calendar difference

### Holidays and Weekends

Holidays and weekends are skipped when they are excluded by the project calendar.

- the user may draw across nonworking days
- the component recalculates the effective schedule based on the enabled calendar rules

---

## Implementation Example

```typescript
import { Component } from '@angular/core';
import { GanttModule, EditService, SelectionService } from '@syncfusion/ej2-angular-gantt';

@Component({
  standalone: true,
  imports: [GanttModule],
  providers: [EditService, SelectionService],
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [columns]="columns"
      [editSettings]="editSettings"
      [allowUnscheduledTasks]="true"
      [allowSelection]="true"
      [toolbar]="toolbar"
      height="450px">
    </ejs-gantt>
  `
})
export class AppComponent {
  public toolbar: string[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

  public editSettings: object = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    allowTaskbarDraw: true,
    mode: 'Dialog'
  };

  public columns: object[] = [
    { field: 'TaskID', headerText: 'Task ID', width: 80, isPrimaryKey: true },
    { field: 'TaskName', headerText: 'Task Name', width: 250 },
    { field: 'StartDate', headerText: 'Start Date', width: 130 },
    { field: 'EndDate', headerText: 'End Date', width: 130 },
    { field: 'Duration', headerText: 'Duration', width: 100 }
  ];

  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress'
  };

  public data: object[] = [
    {
      TaskID: 1,
      TaskName: 'Backlog Item A',
      StartDate: null,
      EndDate: null,
      Duration: null,
      Progress: 0
    },
    {
      TaskID: 2,
      TaskName: 'Backlog Item B',
      StartDate: null,
      EndDate: null,
      Duration: null,
      Progress: 0
    },
    {
      TaskID: 3,
      TaskName: 'Planned Task',
      StartDate: new Date('04/02/2024'),
      Duration: 5,
      Progress: 20
    }
  ];
}
```

### Workflow with this example

1. Users can draw taskbars for **Backlog Item A** and **Backlog Item B** on the timeline
2. The drawn ranges populate `StartDate`, `EndDate`, and `Duration`
3. Users can click **Edit** to refine task properties
4. Already scheduled tasks like **Planned Task** can be resized or moved with taskbar editing

---

## Limitations and Best Practices

### Limitations

- Taskbar Draw is intended for creating new or completing unscheduled tasks; it is not a replacement for full task editing
- The feature requires `allowUnscheduledTasks` to be enabled for new unscheduled rows
- Parent task dates are computed from child tasks; drawing on parent rows is not recommended in auto mode
- Zero-duration milestones cannot be effectively created by drawing (no visual span)

### Best Practices

- **Enable with Dialog:** Combine `allowTaskbarDraw` with `mode: 'Dialog'` so users can complete metadata after drawing
- **Use for Backlogs:** Ideal for converting backlog items or placeholder tasks into scheduled work
- **Provide Feedback:** Display visual feedback (e.g., inline status) to confirm when a task has been scheduled
- **Test Calendar Rules:** Verify that working time, holidays, and task calendars are applied correctly to drawn tasks
- **Combine with Other Editing:** Use alongside cell and dialog editing for a complete editing experience
- **Document User Actions:** Log or track taskbar draw events for audit trails if needed
