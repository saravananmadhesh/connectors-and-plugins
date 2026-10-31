# Task Scheduling in Syncfusion Gantt Chart

## Table of Contents
- [Scheduling Modes](#scheduling-modes)
- [Auto Scheduling](#auto-scheduling)
- [Manual Scheduling](#manual-scheduling)
- [Custom (Mixed) Scheduling](#custom-mixed-scheduling)
- [Unscheduled Tasks](#unscheduled-tasks)
- [Duration Units](#duration-units)
- [Week and Month Duration Units](#week-and-month-duration-units)
- [Milestone Tasks](#milestone-tasks)
- [Project Date Range](#project-date-range)
- [Working Time & Weekends](#working-time--weekends)

---

## Scheduling Modes

The `taskMode` property controls how task dates are validated:

| Mode | Value | Behaviour |
|------|-------|-----------|
| Auto | `'Auto'` | Dates validated automatically based on dependencies, working days, holidays (default) |
| Manual | `'Manual'` | User controls start/end dates; no automatic recalculation |
| Custom | `'Custom'` | Mix of auto and manual; controlled per task via a data source field |

---

## Auto Scheduling

Default mode. Parent taskbar dates derive from minimum child start and maximum child end dates. Dependencies shift successors automatically.

```typescript
import { Gantt, Toolbar, Edit, Selection } from '@syncfusion/ej2-gantt';
import { GanttData } from './datasource';

Gantt.Inject(Toolbar, Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskMode: 'Auto',        // default — can omit
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', endDate: 'EndDate',
        dependency: 'Predecessor', child: 'Children'
    },
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
    editSettings: { allowEditing: true, allowDeleting: true, allowTaskbarEditing: true }
});
gantt.appendTo('#Gantt');
```

**Auto scheduling rules:**
- Parent taskbar = min(child startDates) → max(child endDates)
- Parent progress, endDate cannot be edited directly
- Changes to child dates propagate up to the parent
- Dependencies adjust successor start dates automatically

---

## Manual Scheduling

When `taskMode` is `'Manual'`, the user has full control over all task dates. No automatic recalculation occurs when dependencies or children change.

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskMode: 'Manual',
    validateManualTasksOnLinking: true,   // validate dates based on predecessors even in manual mode
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', endDate: 'EndDate',
        child: 'Children'
    },
    editSettings: { allowEditing: true, allowTaskbarEditing: true }
});
gantt.appendTo('#Gantt');
```

> Set `validateManualTasksOnLinking: true` to automatically validate task dates based on predecessor values while keeping all other scheduling in manual mode.

**When to use manual mode:**
- Fixed-price contracts where dates must not shift
- Projects with hard delivery dates regardless of dependency changes
- When you want to show planned vs. actual without auto-correction

---

## Custom (Mixed) Scheduling

Mix auto and manual tasks in the same project. Map a boolean field from the data source to `taskFields.manual`.

```typescript
let mixedData: Object[] = [
    { TaskID: 1, TaskName: 'Auto Task', StartDate: new Date('04/02/2024'), Duration: 4, IsManual: false },
    { TaskID: 2, TaskName: 'Manual Task', StartDate: new Date('04/02/2024'), Duration: 4, IsManual: true, ParentId: 1 }
];

let gantt: Gantt = new Gantt({
    dataSource: mixedData,
    height: '450px',
    taskMode: 'Custom',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', parentID: 'ParentId',
        manual: 'IsManual'    // true = manual, false = auto
    }
});
gantt.appendTo('#Gantt');
```

---

## Unscheduled Tasks

Unscheduled tasks have no definite schedule — they can have only start date, only end date, only duration, or none. Enable with `allowUnscheduledTasks: true`.

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    allowUnscheduledTasks: true,
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        endDate: 'EndDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID'
    },
    editSettings: { allowEditing: true, allowTaskbarEditing: true }
});
gantt.appendTo('#Gantt');
```

Taskbar rendering by available data:

| Taskbar State | Auto Mode | Manual Mode |
|---------------|-----------|-------------|
| Start date only | Taskbar from start, no fixed end | Same, no end constraint |
| End date only | Taskbar ending at end date | Same, no start constraint |
| Duration only | Taskbar from project start | Same |
| No dates (milestone) | Diamond at project start | Diamond at project start |

> If `allowUnscheduledTasks` is `false`, Gantt auto-fills missing dates: defaults to duration `1` and uses `projectStartDate` as the task start date.

---

## Duration Units

By default, duration is in **days**. Change with `durationUnit`:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    durationUnit: 'Hour',   // 'Day' | 'Hour' | 'Minute'
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', child: 'subtasks'
    }
});
gantt.appendTo('#Gantt');
```

**Map per-task duration unit from data source** using `taskFields.durationUnit`:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress',
        durationUnit: 'DurationUnit',   // field in data source: 'day' | 'hour' | 'minute'
        parentID: 'ParentID'
    }
});
gantt.appendTo('#Gantt');
```

**Duration unit inline in data source strings:**
```
Duration: '4days'   → 4 days
Duration: '8hours'  → 8 hours
Duration: '30min'   → 30 minutes
```

> The duration column edit type is `string` to support inline unit values (e.g., `'4hours'`). The `durationUnit` property default is `'day'`.

---

## Week and Month Duration Units

The Gantt Chart supports `'Week'` and `'Month'` as duration units, in addition to `'Day'`, `'Hour'`, and `'Minute'`. These units are useful for sprint planning, roadmap planning, and longer-term project phases.

### Key APIs

| Property | Type | Description |
|----------|------|-------------|
| `durationUnit` | `string` | Global duration unit: `'Day'` \| `'Hour'` \| `'Minute'` \| `'Week'` \| `'Month'` |
| `taskFields.durationUnit` | `string` | Per-task duration unit (maps to data source field) |
| `daysPerWeek` | `number` | Number of working days in a week for week-to-day conversion (default: 5) |
| `daysPerMonth` | `number` | Number of working days in a month for month-to-day conversion (default: 20) |

### Configure Week Duration Unit

Set `durationUnit: 'Week'` to interpret duration values as weeks:

```typescript
import { Gantt, Edit, Toolbar, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar, Selection);

let gantt: Gantt = new Gantt({
    dataSource: [
        { TaskID: 1, TaskName: 'Sprint 1', StartDate: new Date('04/02/2024'), Duration: 2, Progress: 50 },    // 2 weeks
        { TaskID: 2, TaskName: 'Sprint 2', StartDate: new Date('04/16/2024'), Duration: 2, Progress: 0 }      // 2 weeks
    ],
    height: '450px',
    durationUnit: 'Week',           // durations are in weeks
    daysPerWeek: 5,                 // 1 week = 5 working days
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress'
    }
});
gantt.appendTo('#Gantt');
```

### Configure Month Duration Unit

Set `durationUnit: 'Month'` to interpret duration values as months:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: [
        { TaskID: 1, TaskName: 'Phase 1', StartDate: new Date('04/02/2024'), Duration: 1, Progress: 30 },    // 1 month
        { TaskID: 2, TaskName: 'Phase 2', StartDate: new Date('05/02/2024'), Duration: 1, Progress: 0 }      // 1 month
    ],
    height: '450px',
    durationUnit: 'Month',          // durations are in months
    daysPerMonth: 20,               // 1 month = 20 working days
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress'
    }
});
gantt.appendTo('#Gantt');
```

### Duration Conversion Rules

#### Week-to-Day Conversion

When `durationUnit: 'Week'` and `daysPerWeek: 5`:
- Duration `1` week = `5` working days
- Duration `2` weeks = `10` working days
- Duration `2.5` weeks = `12.5` working days

Start/end date calculations use the converted day value.

#### Month-to-Day Conversion

When `durationUnit: 'Month'` and `daysPerMonth: 20`:
- Duration `1` month = `20` working days
- Duration `2` months = `40` working days
- Duration `1.5` months = `30` working days

Start/end date calculations use the converted day value.

### Configure daysPerWeek and daysPerMonth

Adjust these values to match your organization's working calendar:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    durationUnit: 'Week',
    daysPerWeek: 4,                 // 4-day work week
    daysPerMonth: 16,               // 4 weeks × 4 days
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration' }
});
gantt.appendTo('#Gantt');
```

| Configuration | daysPerWeek | daysPerMonth |
|---|---|---|
| Standard 5-day week | 5 | 20 (4 weeks × 5 days) |
| 4-day work week | 4 | 16 (4 weeks × 4 days) |
| 6-day work week | 6 | 24 (4 weeks × 6 days) |
| 7-day (24/7 operations) | 7 | 28 (4 weeks × 7 days) |

### Per-Task Duration Unit

Use `taskFields.durationUnit` to map a per-task duration unit field from the data source:

```typescript
let data: Object[] = [
    { TaskID: 1, TaskName: 'Sprint', Duration: 2, DurUnit: 'Week' },
    { TaskID: 2, TaskName: 'Phase', Duration: 1, DurUnit: 'Month' },
    { TaskID: 3, TaskName: 'Daily Task', Duration: 8, DurUnit: 'Hour' }
];

let gantt: Gantt = new Gantt({
    dataSource: data,
    height: '450px',
    durationUnit: 'Day',             // global default
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', parentID: 'ParentID',
        durationUnit: 'DurUnit'      // per-task unit from data
    },
    daysPerWeek: 5,
    daysPerMonth: 20
});
gantt.appendTo('#Gantt');
```

### Duration Unit Inline in Data

Specify duration unit directly in the duration string:

```typescript
{ TaskID: 1, Duration: '2weeks' }    → 2 weeks
{ TaskID: 2, Duration: '1month' }    → 1 month
{ TaskID: 3, Duration: '5days' }     → 5 days
{ TaskID: 4, Duration: '8hours' }    → 8 hours
```

### Impact on Scheduling

- **Start Date**: Calculated from the given start date using the converted duration.
- **End Date**: Calculated as start date + converted duration (in days), respecting working time and holidays.
- **Duration Display**: In the UI, duration is shown in the specified unit (e.g., "2 weeks" or "1 month").
- **Taskbar Width**: Reflects the actual working days represented by the duration.
- **Dependency Offsets**: Offsets (e.g., `'2FS+1week'`) are converted and applied using the assigned calendar.
- **Auto-Scheduling**: Parent/child recalculations use converted day values.
- **Task Editing**: When you change duration, the unit is preserved or converted based on the edit mode.

### Interaction with Calendars and Working Time

- **Working Time**: Week and month conversions respect `dayWorkingTime` and calendar working hours.
- **Holidays**: Holidays are excluded from duration calculations; a 5-day duration spanning 1 holiday = 6 calendar days.
- **Weekends**: By default, weekends are excluded; set `includeWeekend: true` to include them.
- **Task Calendars**: If a task has a `calendarId`, its calendar's working time is used for duration conversion.

### Limitations

- Duration must be numeric; fractional weeks/months are supported but may round depending on working time.
- Changing `durationUnit` globally does not retroactively convert existing task durations; values are reinterpreted in the new unit.
- Very long durations (e.g., 1000 weeks) may cause UI performance issues; consider capping or validating.

### Best Practices

1. **Set `daysPerWeek` and `daysPerMonth` early**: Define them at component initialization based on your working calendar.
2. **Be consistent**: Use the same duration unit throughout a project for clarity.
3. **Test with dependencies**: Verify that dependency offsets and scheduling work as expected with your unit choice.
4. **Document assumptions**: Make it clear in project docs which unit is used and what `daysPerWeek`/`daysPerMonth` values mean.
5. **Validate imported data**: Ensure imported durations use the correct unit or are converted on import.

---

## Milestone Tasks

A task with `Duration: 0` is rendered as a milestone (diamond shape):

```typescript
let data = [
    { TaskID: 1, TaskName: 'Project Start', StartDate: new Date('04/02/2024'), Duration: 0, Progress: 0 },
    { TaskID: 2, TaskName: 'Analysis', StartDate: new Date('04/02/2024'), Duration: 5, Progress: 50 }
];

let gantt: Gantt = new Gantt({
    dataSource: data,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration' }
});
gantt.appendTo('#Gantt');
```

> Milestones represent zero-duration events/checkpoints like approvals, deliverables, or phase gates.

---

## Project Date Range

Constrain the chart to a specific date range with `projectStartDate` and `projectEndDate`:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    projectStartDate: new Date('03/25/2024'),
    projectEndDate: new Date('07/28/2024'),
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', child: 'subtasks' }
});
gantt.appendTo('#Gantt');
```

- If omitted, the chart auto-calculates range from data
- `projectEndDate` is also used as reference for critical path slack calculation

---

## Working Time & Weekends

Configure the working week and daily hours:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', child: 'subtasks' },
    dayWorkingTime: [
        { from: 8, to: 12 },    // morning shift: 8 AM – 12 PM
        { from: 13, to: 17 }    // afternoon shift: 1 PM – 5 PM
    ],
    highlightWeekends: true,     // visually shade Saturday/Sunday
    workWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']  // default
});
gantt.appendTo('#Gantt');
```

**Week-specific working hours** — use `weekWorkingTime` to set different hours per day of week:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', parentID: 'ParentID' },
    weekWorkingTime: [
        { dayOfWeek: 'Monday',  timeRange: [{ from: 10, to: 18 }] },
        { dayOfWeek: 'Tuesday', timeRange: [{ from: 10, to: 18 }] }
        // Days not listed fall back to dayWorkingTime
    ],
    highlightWeekends: true
});
gantt.appendTo('#Gantt');
```

**Make weekends working days:**

```typescript
// Include weekends in scheduling — Saturdays and Sundays become working days
includeWeekend: true
```

**Key properties:**

| Property | Type | Description |
|----------|------|-------------|
| `dayWorkingTime` | `DayWorkingTime[]` | Working hour ranges applied to all working days |
| `weekWorkingTime` | `WeekWorkingTime[]` | Per-day working hours; overrides `dayWorkingTime` for listed days |
| `highlightWeekends` | `boolean` | Shade non-working weekends in chart |
| `workWeek` | `string[]` | Days considered working days (default: Mon–Fri) |
| `includeWeekend` | `boolean` | `true` makes Saturdays and Sundays working days |

**Priority rules:**
- `weekWorkingTime` takes priority over `dayWorkingTime` for days listed in it
- Days not listed in `weekWorkingTime` use `dayWorkingTime` (default: 8–12 and 13–17)
- If a day is a holiday or non-working day **and** listed in `weekWorkingTime`, it remains non-working

> Weekends and non-working hours are skipped when calculating auto-scheduled task end dates.
