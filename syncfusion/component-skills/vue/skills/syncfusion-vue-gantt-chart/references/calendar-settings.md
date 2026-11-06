# Calendar Settings

## Table of Contents
- [Overview](#overview)
- [Project Calendar](#project-calendar)
  - [Configure Project Working Hours](#configure-project-working-hours)
  - [Define Project Holidays](#define-project-holidays)
  - [Calendar Exceptions](#calendar-exceptions)
- [Task Calendars](#task-calendars)
  - [Assign Task-Specific Calendars](#assign-task-specific-calendars)
  - [Task Calendar Working Hours](#task-calendar-working-hours)
  - [Task Calendar Holidays](#task-calendar-holidays)
- [Key APIs](#key-apis)
- [Configuration Examples](#configuration-examples)
- [Interaction with Working Time Settings](#interaction-with-working-time-settings)
- [Impact on Scheduling](#impact-on-scheduling)
- [Best Practices](#best-practices)

---

## Overview

The Syncfusion Vue Gantt Chart supports calendar-driven scheduling through the `calendarSettings` property. Calendar settings define working time blocks, holidays, and task-specific calendar rules that affect how durations are calculated and how tasks are scheduled.

Calendar configuration is split into two levels:

- **Project calendar** — the default calendar applied to the entire project (applies globally via `calendarSettings.projectCalendar`)
- **Task calendars** — custom calendars assigned to specific tasks through `taskFields.calendarId` (applies per-task)

Calendar settings affect:
- Task start and end date calculation
- Duration conversion between hours and days
- Dependency-based scheduling and offset calculations
- Weekend and holiday handling (when combined with `workWeek` property)
- Working time rules for project and task scopes
- How display duration in days relates to actual working hours via `daysPerWeek` / `daysPerMonth`

> ⚠️ **DayMarkers module required** — inject `DayMarkers` to render calendar exceptions, holidays, and working time visualizations.

---

## Project Calendar

The `calendarSettings.projectCalendar` property defines the default working calendar for the project. Tasks that do not specify a task calendar use this calendar.

### Configure Project Working Hours

Working hours are defined per day using start and end times. The following example configures the project to have working hours from 9:00 AM to 5:00 PM with a lunch break from 12:00 PM to 1:00 PM:

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :calendarSettings="calendarSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide, ref } from 'vue';
import { GanttComponent as EjsGantt } from '@syncfusion/ej2-vue-gantt';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const calendarSettings = {
  projectCalendar: {
    workingTime: [
      { from: 9, to: 12 },    // 9 AM to 12 PM
      { from: 13, to: 17 }    // 1 PM to 5 PM (13:00 in 24-hour)
    ]
  }
};

const data = [
  { TaskID: 1, TaskName: 'Design', StartDate: new Date('04/02/2024'), Duration: 5 },
  { TaskID: 2, TaskName: 'Review', StartDate: new Date('04/08/2024'), Duration: 3 }
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration'
};
</script>
```

### Define Project Holidays

Holidays are non-working dates that exclude time from task calculations. The following example defines holidays for specific dates, excluding these dates from task scheduling calculations:

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :calendarSettings="calendarSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const calendarSettings = {
  projectCalendar: {
    workingTime: [{ from: 9, to: 17 }],
    holidays: [
      { from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1' },
      { from: new Date('2024-04-17'), to: new Date('2024-04-17'), label: 'Holiday 2' },
      { from: new Date('2024-12-25'), to: new Date('2024-12-25'), label: 'Christmas' }
    ]
  }
};
</script>
```

### Calendar Exceptions

Calendar exceptions allow overriding working hours for specific dates, enabling custom scheduling for special working days or non-working days that don't fit the standard holiday definition:

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :calendarSettings="calendarSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const calendarSettings = {
  projectCalendar: {
    workingTime: [{ from: 9, to: 17 }],
    holidays: [{ from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1' }],
    exceptions: [
      {
        from: new Date('2024-04-06'),  // Saturday
        to: new Date('2024-04-06'),
        isWorking: true,               // Make it a working day
        workingTime: [{ from: 10, to: 14 }]  // Half-day work
      },
      {
        from: new Date('2024-04-10'),  // Originally a holiday
        to: new Date('2024-04-10'),
        isWorking: false               // Confirm non-working
      }
    ]
  }
};
</script>
```

**Calendar Exception Properties:**
- `date` — the specific date to override (Date or string)
- `isWorking` — set to `true` to make it a working day, `false` for non-working
- `workingTime` — optional custom working hours for that date (overrides project default)

---

## Task Calendars

Task calendars enable specific tasks to use custom working days and holidays instead of the project calendar. This is useful for managing work across different shifts, regions, or external teams with different availability.

### Assign Task-Specific Calendars

To assign a custom calendar to a task:

1. Define the calendar in `calendarSettings.taskCalendar` array
2. Reference it using the `taskFields.calendarId` property in the task data
3. Set the calendar ID in each task's `calendarId` field

When a task is assigned a calendar through `calendarId`, that task follows only the assigned task calendar. The assigned task calendar overrides the project calendar for that task. Working days, holidays, and calendar exceptions defined in the assigned calendar are used when calculating the task schedule and working duration. Other task calendars are not considered when scheduling that task.

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :calendarSettings="calendarSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const calendarSettings = {
  projectCalendar: {
    workingTime: [{ from: 9, to: 17 }]  // Standard business hours
  },
  taskCalendars: [
    {
      calendarId: 'morning-shift',
      workingTime: [{ from: 6, to: 14 }],  // 6 AM to 2 PM
      holidays: [{ from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1' }]
    },
    {
      calendarId: 'evening-shift',
      workingTime: [{ from: 14, to: 22 }],  // 2 PM to 10 PM
      holidays: [{ from: new Date('2024-04-11'), to: new Date('2024-04-11'), label: 'Holiday 2' }]
    }
  ]
};

const data = [
  {
    TaskID: 1,
    TaskName: 'Morning Tasks',
    StartDate: new Date('04/02/2024'),
    Duration: 5,
    CalendarId: 'morning-shift'  // Use morning shift calendar
  },
  {
    TaskID: 2,
    TaskName: 'Evening Tasks',
    StartDate: new Date('04/02/2024'),
    Duration: 5,
    CalendarId: 'evening-shift'  // Use evening shift calendar
  },
  {
    TaskID: 3,
    TaskName: 'Standard Tasks',
    StartDate: new Date('04/02/2024'),
    Duration: 5
    // No CalendarId — uses project calendar
  }
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  calendarId: 'CalendarId'  // Map the calendar ID field
};
</script>
```

### Task Calendar Working Hours

Define custom working hours for a task calendar to support different work schedules (split shifts, night shifts, regional differences):

```js
const calendarSettings = {
  taskCalendars: [
    {
      calendarId: 'extended-hours',
      workingTime: [
        { from: 8, to: 12 },   // Morning
        { from: 13, to: 18 },  // Afternoon
        { from: 19, to: 21 }   // Evening
      ],
      holidays: [{ from: new Date('2024-01-01'), to: new Date('2024-01-01'), label: 'New Year'}]
    }
  ]
};
```

### Task Calendar Holidays

Define holidays specific to a task calendar. This is useful when different teams or regions have different holiday schedules:

```js
const calendarSettings = {
  taskCalendars: [
    {
      calendarId: 'us-calendar',
      workingTime: [{ from: 9, to: 17 }],
      holidays: [
        { from: new Date('2024-07-04'), to: new Date('2024-07-04'), label: 'Independence Day' },
        { from: new Date('2024-11-28'), to: new Date('2024-11-28'), label: 'Thanksgiving' }
      ]
    },
    {
      calendarId: 'uk-calendar',
      workingTime: [{ from: 9, to: 17 }],
      holidays: [
        { from: new Date('2024-12-25'), to: new Date('2024-12-25'), label: 'Christmas' },
        { from: new Date('2024-12-26'), to: new Date('2024-12-26'), label: 'Boxing Day' }
      ]
    }
  ]
};
```

---

## Key APIs

| Property | Type | Purpose |
|---|---|---|
| `calendarSettings.projectCalendar` | `ProjectCalendarModel` | Defines default working time, holidays, and exceptions for the project |
| `calendarSettings.taskCalendar` | `TaskCalendarModel[]` | Defines custom calendars for specific tasks |
| `taskFields.calendarId` | `string` | Maps a task's calendar ID field to bind it to a task calendar |

### ProjectCalendarModel

| Property | Type | Default | Description |
|---|---|---|---|
| `workingTime` | `{ from, to }[]` | `[{ from: 9, to: 17 }]` | Working hour ranges (24-hour format) |
| `holidays` | `{ date }[]` | `[]` | Non-working dates |
| `exceptions` | `CalendarException[]` | `[]` | Date-specific overrides (working hours or working day status) |

### TaskCalendarModel

| Property | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | Unique identifier for this calendar |
| `workingTime` | `{ from, to }[]` | `[{ from: 9, to: 17 }]` | Working hour ranges (24-hour format) |
| `holidays` | `{ date }[]` | `[]` | Non-working dates for this task calendar |
| `exceptions` | `CalendarException[]` | `[]` | Date-specific overrides |

---

## Configuration Examples

### Example 1: Project with Standard Calendar and Team-Specific Calendars

```vue
<script setup>
import { provide } from 'vue';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const calendarSettings = {
  projectCalendar: {
    workingTime: [{ from: 9, to: 17 }],
    holidays: [
      { from: new Date('2024-12-25'), to: new Date('2024-12-25'), label: 'Christmas' },
      { from: new Date('2024-01-01'), to: new Date('2024-01-01'), label: 'New Year' }
    ]
  },
  taskCalendars: [
    {
      calendarId: 'onshore',
      workingTime: [{ from: 9, to: 17 }],
      holidays: [{ from: new Date('2024-07-04'), to: new Date('2024-07-04'), label: 'US Independence Day' }]
    },
    {
      calendarId: 'offshore',
      workingTime: [{ from: 14, to: 22 }],  // IST: 9:30 PM to 5:30 AM EST
      holidays: [{ from: new Date('2024-03-08'), to: new Date('2024-03-08'), label: 'International Women's Day' }]
    }
  ]
};
</script>
```

### Example 2: Calendar with Multiple Working Blocks (Breaks)

```js
const calendarSettings = {
  projectCalendar: {
    workingTime: [
      { from: 9, to: 12 },    // 9 AM to 12 PM
      { from: 13, to: 17 }    // 1 PM to 5 PM (lunch break)
    ],
    holidays: [{ from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday' }]
  }
};
```

### Example 3: Calendar with Flexible Exceptions

```js
const calendarSettings = {
  projectCalendar: {
    workingTime: [{ from: 9, to: 17 }],
    holidays: [
      { from: new Date('2024-04-10'), to: new Date('2024-04-10'), label: 'Holiday 1' },
      { from: new Date('2024-04-11'), to: new Date('2024-04-11'), label: 'Holiday 2' }
    ],
    exceptions: [
      {
        from: new Date('2024-04-06'),  // Saturday
        to: new Date('2024-04-06'),
        isWorking: true,               // Override weekend
        workingTime: [{ from: 10, to: 14 }]
      },
      {
        from: new Date('2024-04-10'),  // Holiday
        to: new Date('2024-04-10'),
        isWorking: false               // Confirm non-working
      }
    ]
  }
};
```

---

## Interaction with Working Time Settings

The calendar system works alongside global working time settings:

### Global vs. Calendar Working Time

| Setting | Scope | Priority |
|---|---|---|
| `dayWorkingTime` | Global — applies to all days | Fallback for days not listed in `weekWorkingTime` |
| `weekWorkingTime` | Per-day-of-week global override | Overrides `dayWorkingTime` for listed days |
| `calendarSettings.projectCalendar.workingTime` | Project-level calendar | Applies to all tasks without assigned task calendar |
| `calendarSettings.taskCalendar[].workingTime` | Task-specific calendar | Highest priority — overrides all for assigned tasks |

### Example: Calendar + Global Settings Interaction

```vue
<script setup>
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

// Global working time: Mon-Fri 9 AM - 5 PM
const dayWorkingTime = [{ from: 9, to: 17 }];
const workWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Override specific days
const weekWorkingTime = [
  { dayOfWeek: 'Friday', timeRange: [{ from: 9, to: 14 }] }  // Half day Friday
];

// Task-specific calendar overrides everything
const calendarSettings = {
  projectCalendar: {
    workingTime: [{ from: 10, to: 16 }]  // Project hours: 10 AM - 4 PM
  },
  taskCalendars: [
    {
      calendarId: 'extended',
      workingTime: [{ from: 8, to: 18 }]  // Extended hours: 8 AM - 6 PM
    }
  ]
};
</script>

<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :dayWorkingTime="dayWorkingTime"
    :workWeek="workWeek"
    :weekWorkingTime="weekWorkingTime"
    :calendarSettings="calendarSettings"
    height="450px"
  ></ejs-gantt>
</template>
```

---

## Impact on Scheduling

Calendars directly affect task scheduling calculations:

### Duration Calculation

Duration is calculated in working time only. Non-working time (weekends, holidays, non-working hours) is excluded:

```
Project Calendar: Mon-Fri, 9 AM - 5 PM (8 hours/day)
Task: Start Friday 4 PM, Duration 2 days

Calculated End Date:
- Friday 4 PM to 5 PM = 1 hour (first working day contributes 1 hour)
- Friday after hours = non-working
- Saturday = non-working (not in workWeek)
- Sunday = non-working (not in workWeek)
- Monday 9 AM to 5 PM = 8 hours (full day)
- Total: 1 + 8 = 9 hours = 1.125 days (approx. 1 day 1 hour)

Actual End Date: Tuesday 1 PM (approximately)
```

### Dependency Calculation

When a task has a predecessor, the successor's dates adjust based on the predecessor's end date and the calendar:

```
Predecessor ends: Friday 5 PM
Successor start offset: +1 day (FS with 1-day lag)

Calculated start:
- Friday after 5 PM = non-working
- Saturday = non-working
- Sunday = non-working
- Monday 9 AM = working, and 1 day offset has passed

Actual successor start: Monday 9 AM
```

### Parent Task Dates

In Auto scheduling mode, parent task dates are calculated from children:
- Parent start = minimum child start date
- Parent end = maximum child end date

Children scheduled via calendar follow the calendar rules; parent dates reflect those outcomes.

---

## Best Practices

1. **Define Project Calendar First** — Set the default project calendar before creating task-specific calendars. This provides a baseline.

2. **Use Task Calendars Sparingly** — Task calendars override project settings completely. Only use them when tasks genuinely have different working patterns.

3. **Keep Calendar IDs Descriptive** — Use clear names: `'morning-shift'`, `'india-team'`, `'extended-hours'` rather than `'cal1'`, `'cal2'`.

4. **Test Dependency Calculations** — When mixing calendars and dependencies, verify that predecessor offsets calculate correctly across calendar boundaries.

5. **Coordinate with workWeek** — If `workWeek` excludes Saturday/Sunday, ensure your calendar exceptions don't conflict with weekend status.

6. **Document Holiday Strategy** — Decide whether holidays are shared globally or per-calendar, and document which holidays apply to which calendars.

7. **Use `DayMarkers` for Visualization** — Always inject `DayMarkers` to render calendars visually, making them easier to debug and communicate to stakeholders.

---

## See Also

- [Task Scheduling](task-scheduling.md) — Duration units, scheduling modes, working time
- [Event Markers and Holidays](event-markers-and-holidays.md) — Visual markers and holiday highlights
- [Task Dependencies](task-dependencies.md) — Predecessor relationships and offset calculations
- [Timezone and Globalization](timezone-and-globalization.md) — Timezone handling with calendars
