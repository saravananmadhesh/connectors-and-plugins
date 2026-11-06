# Calendar Settings in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Key APIs](#key-apis)
- [Project Calendar](#project-calendar)
- [Task Calendars](#task-calendars)
- [Calendar Behavior and Scheduling Impact](#calendar-behavior-and-scheduling-impact)
- [Hours Per Day Configuration](#hours-per-day-configuration)
- [Working Time and Holidays](#working-time-and-holidays)
- [Supported Scenarios](#supported-scenarios)
- [Feature Limitations](#feature-limitations)
- [Best Practices](#best-practices)
- [See Also](#see-also)

---

## Overview

The Gantt Chart supports advanced calendar-driven scheduling through the `calendarSettings` property. Calendar configuration is split into two levels:

- **Project calendar** — the default calendar applied to the entire project (applies globally)
- **Task calendars** — custom calendars assigned to specific tasks through `taskFields.calendarId` (applies per-task)

Calendar settings affect:

- Task start and end date calculation
- Duration conversion between hours and days
- Dependency-based scheduling and offset calculations
- Weekend and holiday handling (when combined with `workWeek` property)
- Working time rules for project and task scopes
- How display duration in days relates to actual working hours via `hoursPerDay`

### Module Required

Calendar-driven scheduling is built into the Gantt Chart control and does not require a separate module injection.

---

## Key APIs

| Property | Type | Purpose |
|---|---|---|
| `calendarSettings` | `CalendarSettingsModel` | Root configuration object for calendar settings |
| `calendarSettings.projectCalendar` | `ProjectCalendarModel` | Defines default working time, holidays, and exceptions for the project |
| `calendarSettings.taskCalendar` | `TaskCalendarModel[]` | Array of custom calendars for specific tasks |
| `taskFields.calendarId` | `string` | Maps a task's calendar ID field to bind it to a task calendar |
| `hoursPerDay` | `number` | Defines the working hours that equal one display day (default: 8) |
| `workWeek` | `string[]` | Defines which days of the week are working days (default: `['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']`) |
| `includeWeekend` | `boolean` | Includes weekends in scheduling if set to `true` (default: `false`) |
| `dayWorkingTime` | `DayWorkingTimeModel[]` | Defines global daily working hours (overridden by calendar working time) |

---

## Project Calendar

The `calendarSettings.projectCalendar` property defines the default working calendar for the project. Tasks that do not specify a task calendar via `calendarId` use this calendar.

### Project Calendar Structure

```typescript
ProjectCalendarModel {
  workingTime: Array<{ from: number; to: number }>     // working hours per day
  holidays: Array<{from: string | Date; to: string | Date; label: string}>                        // non-working dates
  exceptions: Array<{
    from: string | Date;
    to: string | Date;
    isWorking: boolean;
    workingTime?: Array<{ from: number; to: number }>;
  }>                                                     // override rules for specific dates
}
```

### Configure Project Working Hours

Working hours are defined per day using 24-hour time notation. The following example configures the project to have working hours from 9:00 AM to 5:00 PM with a lunch break from 12:00 PM to 1:00 PM:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID'
    },
    calendarSettings: {
        projectCalendar: {
            workingTime: [
                { from: 9, to: 12 },   // 9 AM to 12 PM
                { from: 13, to: 17 }   // 1 PM to 5 PM (lunch break)
            ]
        }
    },
    hoursPerDay: 8
});
gantt.appendTo('#Gantt');
```

### Define Project Holidays

Holidays are non-working dates that exclude time from task calculations. The following example defines holidays for April 10 and April 17, excluding these dates from task scheduling calculations:

```typescript
calendarSettings: {
    projectCalendar: {
        workingTime: [{ from: 9, to: 17 }],
        holidays: [
            {from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1'},
            {from: new Date('2024-04-17'), to: new Date('2024-04-17'), label: 'Holiday 2'}]
    }
}
```

### Project Calendar Exceptions

Calendar exceptions allow overriding normal working rules for specific dates. Use exceptions when the project has special working days, partial work days, or date-specific schedule adjustments that do not fit the standard working pattern:

```typescript
calendarSettings: {
    projectCalendar: {
        workingTime: [{ from: 9, to: 17 }],
        holidays: [{from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1'}],
        exceptions: [
            // Special working day on a normally non-working day
            {
                from: new Date('2024-04-13'),      // Saturday
                to: new Date('2024-04-13'),
                isWorking: true,
                workingTime: [{ from: 9, to: 14 }]  // half day
            },
            // Make a normally working day non-working
            {
                from: new Date('2024-04-15'),
                to: new Date('2024-04-15'),
                isWorking: false
            },
            // Change working hours for a specific day
            {
                from: new Date('2024-04-18'),
                to: new Date('2024-04-18'),
                isWorking: true,
                workingTime: [{ from: 8, to: 16 }]  // extended hours
            }
        ]
    }
}
```

### Project Calendar Behavior

- Defines the default working time blocks for all tasks
- Applies when a task does not have an assigned task calendar via `calendarId`
- Works together with global Gantt settings such as `workWeek` (defines working days) and `includeWeekend` where applicable
- Holiday dates are treated as non-working days for the project
- Calendar exceptions override the default working time for specific dates

---

## Task Calendars

Task calendars enable different tasks to follow different working rules than the project calendar. This is useful for:

- Split-shift teams
- Region-specific working patterns
- External vendors with different holidays
- Tasks that follow a fixed calendar separate from the main project calendar

### Assign Task-Specific Calendars

Define the task calendar collection in `calendarSettings.taskCalendar`, then map a calendar identifier to each task using `taskFields.calendarId`.

**Task Calendar Structure:**

```typescript
TaskCalendarModel {
  calendarId: string;                                   // unique identifier for the calendar
  workingTime: Array<{ from: number; to: number }>;    // working hours per day
  holidays: Array<{from: string | Date; to: string | Date; label: string}>;  // non-working dates specific to this calendar
  exceptions: Array<{
    from: string | Date;
    to: string | Date;
    isWorking: boolean;
    workingTime?: Array<{ from: number; to: number }>;
  }>;                                                    // override rules for specific dates
}
```

**Example:**

```typescript
import { Gantt, Edit, Toolbar, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar, Selection);

let data: Object[] = [
    { TaskID: 1, TaskName: 'Day Shift Task', StartDate: new Date('04/02/2024'), Duration: 5, CalendarId: 'day-shift' },
    { TaskID: 2, TaskName: 'Night Shift Task', StartDate: new Date('04/02/2024'), Duration: 5, CalendarId: 'night-shift' },
    { TaskID: 3, TaskName: 'Standard Schedule', StartDate: new Date('04/02/2024'), Duration: 5, CalendarId: null }
];

let gantt: Gantt = new Gantt({
    dataSource: data,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID',
        calendarId: 'CalendarId'  // maps to the calendar identifier
    },
    calendarSettings: {
        projectCalendar: {
            workingTime: [{ from: 9, to: 17 }],
            holidays: [
                {from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1'},
                {from: new Date('2024-04-17'), to: new Date('2024-04-17'), label: 'Holiday 2'}]
        },
        taskCalendars: [
            {
                calendarId: 'day-shift',
                workingTime: [{ from: 8, to: 16 }],
                holidays: [
                    {from: new Date('2024-04-12'), to: new Date('2024-04-12'), label: 'Day shift Holiday 1'},
                    {from: new Date('2024-04-19'), to: new Date('2024-04-19'), label: 'Day shift Holiday 2'}]
            },
            {
                calendarId: 'night-shift',
                workingTime: [{ from: 18, to: 2 }],   // wraps around midnight
                holidays: [
                    {from: new Date('2024-04-11'), to: new Date('2024-04-11'), label: 'Night shift Holiday 1'},
                    {from: new Date('2024-04-18'), to: new Date('2024-04-18'), label: 'Night shift Holiday 2'}]
            }
        ]
    },
    hoursPerDay: 8,
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
    editSettings: { allowEditing: true, allowTaskbarEditing: true }
});
gantt.appendTo('#Gantt');
```

### Task Calendar Assignment Rules

- When a task is assigned a calendar through `calendarId`, that task follows **only** the assigned task calendar.
- The assigned task calendar **overrides** the project calendar for that task.
- Working days, holidays, and calendar exceptions defined in the assigned calendar are used when calculating the task schedule and working duration.
- If `calendarId` is `null` or not set, the task uses the project calendar.
- Other task calendars are not considered when scheduling a specific task.

### Define Task Calendar Holidays

Task calendars can include holidays that override project calendar holidays for the assigned task. These holidays are considered when calculating the task schedule and working duration:

```typescript
taskCalendars: [
    {
        calendarId: 'summer-team',
        workingTime: [{ from: 9, to: 17 }],
        holidays: [
            {from: new Date('2024-05-01'), to: new Date('2024-05-01'), label: 'May Day (team-specific)'},
            {from: new Date('2024-06-21'), to: new Date('2024-06-21'), label: 'Summer break (team-specific)'}
        ]
    }
]
```

---

## Calendar Behavior and Scheduling Impact

### How Calendars Affect Task Scheduling

1. **Start Date Calculation**: When a task has a `calendarId`, its start date is calculated using that calendar's working time and holidays.
2. **End Date Calculation**: The end date is derived from the start date plus the duration, respecting the assigned calendar's working time.
3. **Duration Calculation**: Duration is interpreted as working time units (hours/days/weeks/months) according to the assigned calendar's working hours.
4. **Dependency Scheduling**: When a task has a predecessor, the offset is applied using the successor task's calendar (if assigned), or the project calendar.

### Interaction with Task Mode

- **Auto Scheduling**: Dates are recalculated based on calendar rules.
- **Manual Scheduling**: User-provided dates are preserved, but the calendar may still affect duration calculations.
- **Custom Scheduling**: Calendars apply per-task auto/manual mode.

### Interaction with Working Time

The `dayWorkingTime` property defines global daily working hours but is overridden by any calendar's working time:

```typescript
// Global setting (overridden by calendar settings)
dayWorkingTime: [{ from: 8, to: 16 }],

calendarSettings: {
    projectCalendar: {
        workingTime: [{ from: 9, to: 17 }]  // overrides dayWorkingTime
    }
}
```

### Interaction with Dependencies

When calculating dependency offsets, the component respects the assigned calendar of the dependent (successor) task:

```typescript
// Task 2 depends on Task 1 with a 2-day lag
{ TaskID: 2, TaskName: 'Follow-up', Predecessor: '1FS+2d', CalendarId: 'night-shift' }
// The 2-day lag is calculated using the night-shift calendar
```

---

## Hours Per Day Configuration

The `hoursPerDay` property defines how many working hours equal one display day in the UI. It affects duration display and conversion between hours and days.

```typescript
let gantt: Gantt = new Gantt({
    hoursPerDay: 8,  // 8 working hours = 1 day (default)
    // or
    hoursPerDay: 6   // for 6-hour working days
});
```

| hoursPerDay | Interpretation |
|---|---|
| `8` (default) | 1 day = 8 working hours |
| `6` | 1 day = 6 working hours |
| `4` | 1 day = 4 working hours (half days) |

**Impact on Calculations:**
- A task with 16 hours duration and `hoursPerDay: 8` displays as 2 days
- A task with 16 hours duration and `hoursPerDay: 4` displays as 4 days

---

## Working Time and Holidays

### workWeek Property

The `workWeek` property defines which days of the week are working days. Default is Monday through Friday:

```typescript
workWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']  // default 5-day week
// or
workWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']  // 7-day week
// or
workWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']  // 5-day week starting Sunday
```

### includeWeekend Property

Set `includeWeekend: true` to include weekend days in task duration calculations:

```typescript
includeWeekend: true   // weekends count as working days (ignores workWeek)
```

---

## Supported Scenarios

| Scenario | Configuration |
|---|---|
| Standard 9-to-5, Mon-Fri, with holidays | Project calendar + holidays array |
| Split shifts (multiple working time blocks per day) | `workingTime: [{ from: 9, to: 12 }, { from: 13, to: 17 }]` |
| Different teams with different schedules | Task calendars with `calendarId` |
| 24/7 operations with multiple shifts | Task calendars with different `workingTime` blocks |
| Projects spanning multiple regions | Multiple task calendars with region-specific holidays |
| Special working days (e.g., weekend work) | Calendar exceptions with `isWorking: true` |
| Reduced working day (e.g., half day) | Calendar exception with custom `workingTime` |
| Include weekends as working days | `includeWeekend: true` or assign all days to `workWeek` |

---

## Feature Limitations

- Calendar exceptions are applied per specific date only; recurring rules (e.g., "every second Friday") are not supported.
- If both `workWeek` and task calendar `workingTime` are defined, the calendar takes precedence.
- Midnight-spanning working hours (e.g., 22:00 to 02:00) are supported but may have edge cases in visual rendering.
- Calendar changes are not retroactively applied to already-scheduled tasks; you must recalculate or re-save the Gantt data.

---

## Best Practices

1. **Define calendars upfront**: Configure project and task calendars before populating the data source.
2. **Use consistent date formats**: Use ISO format (YYYY-MM-DD) or JavaScript Date objects for holidays and exceptions.
3. **Test calendar interactions**: Verify calendar behavior with dependencies, task editing, and taskbar editing.
4. **Document team calendars**: Keep task calendar assignments clear in project documentation.
5. **Validate task calendar assignments**: Ensure `calendarId` values in task data match defined calendars; mismatches are silently ignored.
6. **Use exceptions sparingly**: Prefer defining holidays at the calendar level rather than relying on exceptions.
7. **Monitor performance**: Large numbers of exceptions or task calendars may impact performance on large datasets.

---

## See Also

- [Task Scheduling in Gantt Chart](./task-scheduling.md)
- [Task Dependency in Gantt Chart](./task-dependency.md)
- [Holidays in Gantt Chart](./holidays.md)
