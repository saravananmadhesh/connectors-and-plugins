# Calendar Settings in Angular Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Calendar Settings Model](#calendar-settings-model)
- [Project Calendar](#project-calendar)
- [Task Calendars](#task-calendars)
- [Working Hours and Duration Calculation](#working-hours-and-duration-calculation)
- [Dependencies and Scheduling Behavior](#dependencies-and-scheduling-behavior)
- [Holiday and Weekend Interaction](#holiday-and-weekend-interaction)
- [Resource Calendar Scenarios](#resource-calendar-scenarios)
- [Best Practices](#best-practices)
- [Limitations](#limitations)
- [See Also](#see-also)

---

## Overview

The Syncfusion Angular Gantt Chart supports calendar-based scheduling through the `calendarSettings` property. Calendar settings define how the Gantt Chart calculates working time, skips non-working dates, and interprets task duration values.

Calendar configuration is typically used to:
- Model standard working hours and non-working days for the whole project
- Define task-specific calendars for different teams, shifts, or locations
- Control how holidays and weekends affect task start and finish dates
- Recalculate day-based duration values using a configurable `hoursPerDay`
- Apply task-calendar-specific scheduling rules without merging them with the project calendar

The calendar system affects auto-scheduled tasks, dependency validation, and any calculations that rely on working time.

## Task Calendar and Resource Calendar Behavior

Task calendars are evaluated at the task level and override the project calendar for the matched task. When a task has an assigned task calendar, the component uses that calendar for working-time lookup, holiday suppression, and duration conversion.

Resource-based scheduling scenarios can still use resource availability to influence assignment planning, but the task calendar remains the source of truth for task timing once the task is scheduled.

Important behavior:
- Project calendar rules apply to tasks without `calendarId`
- Assigned task calendars replace the project calendar for that task
- Holidays in the task calendar override project holidays for the same task
- Weekend handling follows the assigned calendar configuration
- Dependency calculations honor the effective calendar of the linked task

---

## Calendar Settings Model

The `calendarSettings` property provides two primary configuration points:

- `projectCalendar` — the default calendar used by all tasks unless a task calendar is explicitly assigned
- `taskCalendar` — named calendars that can be assigned to individual tasks using `taskFields.calendarId`

Common APIs and fields:

| API / Property | Purpose |
|---|---|
| `calendarSettings` | Root calendar configuration object |
| `calendarSettings.projectCalendar` | Defines the default project calendar |
| `calendarSettings.taskCalendar` | Defines one or more task calendars |
| `taskFields.calendarId` | Maps a task to a specific task calendar |
| `hoursPerDay` | Converts working duration into day-based duration units |
| `workWeek` | Defines working days of the week |
| `dayWorkingTime` | Defines working time ranges within a day |
| `includeWeekend` | Treats weekends as working time when `true` |

> **Note:** Calendar rules are applied in addition to task scheduling mode. In `Auto` mode, calendar settings actively recalculate task dates. In `Manual` mode, dates remain fixed unless the user explicitly modifies them or enables manual validation on linking.

---

## Project Calendar

The project calendar defines the default working schedule for the entire Gantt chart.

### What the project calendar controls

The project calendar is the baseline calendar for all tasks that do not have a task calendar assigned. It determines:
- Which days are working days
- Which hours count as working time
- Which dates are holidays or exceptions
- How dependency chains advance through working time

### Typical project calendar configuration

```typescript
import { Component } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';

@Component({
  standalone: true,
  imports: [GanttModule],
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]='data'
      [taskFields]='taskFields'
      [calendarSettings]='calendarSettings'
      [hoursPerDay]='8'>
    </ejs-gantt>
  `
})
export class AppComponent {
  public data: object[] = [
    {
      TaskID: 1,
      TaskName: 'Project Initiation',
      StartDate: new Date('04/02/2024'),
      Duration: 5
    }
  ];

  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration'
  };

  public calendarSettings: object = {
    projectCalendar: {
      workingTime: [
        { from: 9, to: 12 },
        { from: 13, to: 17 }
      ],
      holidays: [
        { from: new Date('04/10/2024'), to: new Date('04/10/2024'), label: 'Holiday 1' },
        { from: new Date('04/17/2024'), to: new Date('04/17/2024'), label: 'Holiday 2' }
      ]
    }
  };
}
```

### Working hours and exceptions

The project calendar can define custom working time ranges and date exceptions. This is useful when:
- A working day includes a lunch break
- Special dates require shorter or longer work shifts
- Some dates are treated as working days even if they do not follow the normal pattern

Exceptions are used to override the standard calendar for specific dates. They are helpful for ad hoc working days, make-up workdays, or organization-specific calendar changes.

---

## Task Calendars

Task calendars let specific tasks use a calendar different from the project calendar.

### When to use task calendars

Use task calendars when tasks must follow:
- Different shifts
- Different team schedules
- Different regional holidays
- Different working-day patterns for subcontractors or external teams

Task calendars are assigned at the task level through `taskFields.calendarId`.

### Define and assign a task calendar

```typescript
import { Component } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';

@Component({
  standalone: true,
  imports: [GanttModule],
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]='data'
      [taskFields]='taskFields'
      [calendarSettings]='calendarSettings'>
    </ejs-gantt>
  `
})
export class AppComponent {
  public data: object[] = [
    {
      TaskID: 1,
      TaskName: 'Day shift task',
      StartDate: new Date('04/02/2024'),
      Duration: 3,
      CalendarId: 'dayShift'
    },
    {
      TaskID: 2,
      TaskName: 'Night shift task',
      StartDate: new Date('04/02/2024'),
      Duration: 3,
      CalendarId: 'nightShift'
    }
  ];

  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    calendarId: 'CalendarId'
  };

  public calendarSettings: object = {
    taskCalendars: [
      {
        calendarId: 'dayShift',
        workingTime: [{ from: 8, to: 16 }],
        holidays: [{ from: new Date('04/10/2024'), to: new Date('04/10/2024'), label: 'Day shift holiday' }]
      },
      {
        calendarId: 'nightShift',
        workingTime: [{ from: 22, to: 24 }, { from: 0, to: 6 }],
        holidays: [{ from: new Date('04/12/2024'), to: new Date('04/12/2024'), label: 'Night shift holiday' }]
      }
    ]
  };
}
```

### Task calendar precedence

When a task has `calendarId` assigned:
- The task follows the assigned task calendar only
- The project calendar is not merged into that task calendar
- Working days, holidays, and exceptions come from the assigned calendar
- Scheduling, duration, and dependency calculations use that calendar context

This makes task calendars suitable for scenarios where multiple calendars must coexist in the same project.

### Task calendar holidays

Task calendars can define their own holiday dates. These holidays override the project calendar for tasks that use the task calendar.

Use task calendar holidays when:
- Different teams observe different holidays
- A subcontractor follows a separate regional schedule
- A shift-based calendar must exclude additional dates

---

## Working Hours and Duration Calculation

Calendar settings directly affect how the Gantt Chart converts working time into task duration.

### `hoursPerDay`

The `hoursPerDay` property defines how many working hours represent one day for duration calculations.

Example behavior:
- A task with 32 working hours displays as 4 days when `hoursPerDay = 8`
- The same task displays as 2 days when `hoursPerDay = 16`
- The actual scheduled start and end dates do not change just because `hoursPerDay` changes

```html
<ejs-gantt [hoursPerDay]="8"></ejs-gantt>
```

> **Default:** `hoursPerDay` is 8.

### Duration units

Calendar settings affect day-based duration values most visibly. When working time is configured in hours, the component calculates elapsed schedule time using the calendar definition and then converts it to the displayed duration unit.

### Working time rules

The following calendar rules contribute to duration calculation:
- `workWeek` defines which weekdays are working days
- `dayWorkingTime` defines the working hours inside each working day
- `includeWeekend` can override weekend non-working behavior
- Holidays remove time from the working duration
- Task calendars replace project calendar rules for assigned tasks

---

## Dependencies and Scheduling Behavior

Calendar settings interact with task dependencies and scheduling in the following ways:

- Dependency chains respect the working calendar of the predecessor task
- Successor tasks are scheduled at the next available working time according to their calendar context
- Auto-scheduled tasks use calendar rules to determine start and finish dates
- Manual tasks keep their dates unless dependency validation is applied during linking

### Auto scheduling behavior

In `Auto` mode, the Gantt Chart uses calendar rules to determine the earliest valid start and finish dates. If a task lands on a non-working time, the schedule moves to the next valid working slot.

### Manual scheduling behavior

In `Manual` mode:
- Task dates are preserved as entered
- Calendar rules do not automatically recalculate the task dates
- If `validateManualTasksOnLinking` is enabled, dependency changes can still adjust linked tasks

### Custom scheduling behavior

In `Custom` mode, task-level scheduling mode is still respected while calendar settings continue to determine valid working time for tasks that use auto-style calculation paths.

---

## Holiday and Weekend Interaction

Calendar settings work together with holidays and weekend rules to define non-working time.

### Weekends

By default, weekends are non-working time when `includeWeekend` is `false`.

```html
<ejs-gantt [includeWeekend]="false"></ejs-gantt>
```

When `includeWeekend` is `true`, weekend days are treated as working days even if they are not part of the standard `workWeek`.

### Holidays

Holidays are non-working dates that are excluded from task duration calculations. A task that would otherwise finish on a holiday is extended to the next valid working time.

### Combined behavior

When weekends, holidays, and calendar exceptions overlap:
- Non-working dates are skipped in duration calculations
- Valid working exceptions can restore working time on special dates
- Task calendars apply their own holiday and weekend rules independently of the project calendar

---

## Resource Calendar Scenarios

The Gantt Chart can be used with resources, but resource assignment does not replace task calendars automatically.

### Recommended approach

Use task calendars when a task needs a different schedule because of:
- A dedicated team schedule
- A shift-based resource group
- A subcontractor calendar
- A region-specific holiday calendar

Use resource configuration when the goal is to:
- Assign work to people or teams
- Show allocation and over-allocation
- Manage resource-driven work distribution

### Practical note

If a task is assigned to resources and also has a `calendarId`, the task calendar still governs calendar-based scheduling for that task.

---

## Best Practices

- Use the project calendar for the default company schedule
- Use task calendars only when a task truly needs different working rules
- Keep calendar IDs stable and meaningful, such as `dayShift` or `emeaTeam`
- Define holidays explicitly in the calendar that owns the task schedule
- Use `hoursPerDay` consistently across the project to avoid confusing day values
- Prefer `Auto` scheduling for calendar-driven projects so date calculations stay consistent
- Document any special exception dates used in project or task calendars

---

## Limitations

- Task calendars are task-level, not row-group-level or hierarchy-level calendars
- A task calendar replaces the project calendar for the assigned task instead of merging with it
- Calendar rules affect scheduling calculations, but they do not override all manual date edits in `Manual` mode
- `hoursPerDay` changes duration display and conversion behavior, but it does not change the task’s underlying working history
- Calendar exceptions must be maintained carefully to avoid inconsistent scheduling results

---

## See Also

- [Task Scheduling in Angular Gantt Chart](task-scheduling.md)
- [Holidays and Event Markers](holidays-and-markers.md)
- [Task Dependencies](task-dependencies.md)
- [Resources](resources.md)
- Calendar Settings in Angular Gantt Chart Component
