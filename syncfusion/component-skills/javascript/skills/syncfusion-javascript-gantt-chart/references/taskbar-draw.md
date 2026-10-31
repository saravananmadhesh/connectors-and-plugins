# Taskbar Draw in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Taskbar Draw](#enable-taskbar-draw)
- [Taskbar Draw Workflow](#taskbar-draw-workflow)
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

Enable taskbar drawing by setting `allowTaskbarDraw` to `true` in `editSettings` and injecting `Edit`.

```typescript
import { Gantt, Edit, Toolbar, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID'
    },
    editSettings: {
        allowTaskbarEditing: true,  // enable taskbar drag/resize
        allowTaskbarDraw: true      // enable taskbar drawing (creating tasks)
    },
    allowUnscheduledTasks: true,    // required for drawing on unscheduled tasks
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel']
});
gantt.appendTo('#Gantt');
```

### `allowTaskbarDraw` Property

| Property | Type | Default | Description |
|---|---|---|---|
| `editSettings.allowTaskbarDraw` | `boolean` | `false` | Enables drawing a taskbar on the timeline to create or schedule a task. |

Accepted values:
- `true` — enables taskbar drawing
- `false` — disables taskbar drawing

> The feature is enabled through `editSettings` and requires the `Edit` module. In most taskbar-editing scenarios, `allowTaskbarEditing` is enabled together with `allowTaskbarDraw` so users can both create and modify taskbars.

---

## Taskbar Draw Workflow

When taskbar drawing is enabled, the user can drag across the timeline to define a task duration visually.

### Step-by-Step Workflow

1. **Identify Unscheduled Task**: Locate a task row with missing scheduling data (null start date, duration, or end date)
2. **Click and Drag**: Click on the timeline over the task row and drag across the desired date/time range
3. **Visual Feedback**: A temporary taskbar preview appears while dragging, showing the drawn range
4. **Release**: Release the mouse button to finalize the drawn taskbar
5. **Auto-Update**: The Gantt automatically calculates and saves:
   - `StartDate` — left boundary of the drawn range
   - `EndDate` — right boundary of the drawn range
   - `Duration` — calculated duration in the configured unit

### User Interaction Details

- **Drag Direction**: Drag left-to-right to define the task duration
- **Drag Resolution**: The timeline grid and working time rules affect the precision
- **Visual Cues**: Hover over unscheduled task rows to indicate drawing is possible
- **Immediate Save**: Upon release, the task schedule is saved automatically (triggers actionComplete with requestType: 'save')

---

## Taskbar Draw Behavior

When taskbar drawing is enabled, the component applies scheduling rules to the drawn range.

### How the Draw Interaction Behaves

- The drag start point becomes the task start boundary
- The drag end point becomes the task end boundary
- The range can be adjusted by the same calendar rules used for normal scheduling
- The taskbar is created or updated only when the drawn range is valid

### Behavior with Different Task States

#### Fully Unscheduled Task

A task with no start date, end date, or duration:

```typescript
{ TaskID: 1, TaskName: 'Unscheduled Task', StartDate: null, Duration: null, EndDate: null }

// User draws taskbar from April 5 to April 10
// Result: 
// - StartDate = April 5, 2024
// - Duration = 5 days
// - EndDate = April 10, 2024
```

#### Partially Scheduled Task (Start Date Only)

A task with only a start date:

```typescript
{ TaskID: 2, TaskName: 'Start-Only Task', StartDate: new Date('04/05/2024'), Duration: null, EndDate: null }

// User draws taskbar from April 5 to April 10
// Result: 
// - StartDate = April 5, 2024 (unchanged)
// - Duration = 5 days
// - EndDate = April 10, 2024
```

#### Partially Scheduled Task (Duration Only)

A task with only a duration:

```typescript
{ TaskID: 3, TaskName: 'Duration-Only Task', StartDate: null, Duration: 3, EndDate: null }

// User draws taskbar from April 5 to April 10
// Result: 
// - StartDate = April 5, 2024
// - Duration = 5 days (overrides previous)
// - EndDate = April 10, 2024
```

#### Already Scheduled Task

Drawing on a scheduled task reschedules it:

```typescript
{ TaskID: 4, TaskName: 'Scheduled Task', StartDate: new Date('04/05/2024'), Duration: 3, EndDate: new Date('04/08/2024') }

// User draws taskbar from April 7 to April 12
// Result: 
// - StartDate = April 7, 2024
// - Duration = 5 days
// - EndDate = April 12, 2024
// (Behaves like taskbar editing/dragging)
```

---

## Scheduling Output

Taskbar Draw generates scheduling values from the drawn range.

### Generated or Updated Fields

| Field | Behavior | Calculation |
|---|---|---|
| `StartDate` | Set from the left boundary of the drawn taskbar | Aligned to working hours/calendar rules |
| `EndDate` | Set from the right boundary of the drawn taskbar | Aligned to working hours/calendar rules |
| `Duration` | Computed from the resulting span | In configured durationUnit (day/hour/minute/week/month) |

### Calculation Rules

The Gantt respects the following during calculation:

- **Working Time**: Only working hours are counted (dayWorkingTime or calendar working hours)
- **Weekends**: Excluded unless `includeWeekend: true`
- **Holidays**: Excluded (non-working days)
- **Task Calendar**: If task has `calendarId`, its calendar rules apply
- **Duration Unit**: Result is converted to configured `durationUnit`

**Example Calculation:**
```
Configuration:
- Working hours: Mon-Fri, 9 AM - 5 PM (8 hours/day)
- durationUnit: 'Day'
- No holidays/weekends

User draws from: Wed 10:00 AM → Fri 2:00 PM
Calculation:
- Wed: 7 hours (10 AM - 5 PM)
- Thu: 8 hours (9 AM - 5 PM)
- Fri: 5 hours (9 AM - 2 PM)
- Total: 20 working hours = 2.5 days
Result: Duration = 2.5, StartDate = Wed, EndDate = Fri
```

### Partial Data Handling

- **Fully unscheduled task** — all schedule fields are derived from the drawn bar
- **Partially scheduled task** — the drawn range fills or updates the missing schedule information and may recalculate related fields
- **Already scheduled task** — the feature behaves like editing behavior if taskbar drawing is allowed together with taskbar editing

---

## Prerequisites and Related Settings

Taskbar Draw is part of the editing pipeline and should be configured together with the task scheduling model.

### Required Settings

| Setting | Value | Purpose |
|---|---|---|
| `editSettings.allowTaskbarDraw` | `true` | Enable the draw feature |
| `Inject Edit module` | — | Required for editing functionality |
| `allowUnscheduledTasks` | `true` | Allow creation of initially unscheduled tasks |

### Commonly Used Related Settings

| Setting | Purpose |
|---|---|
| `allowTaskbarEditing` | Allow drag, resize, and progress editing on existing taskbars |
| `taskMode` | Control whether tasks are auto, manual, or mixed scheduling |
| `durationUnit` | Set duration unit for the drawn range (Day, Hour, Minute, Week, Month) |
| `taskFields.durationUnit` | Per-task duration unit mapping |
| `dayWorkingTime` | Define working hours for duration calculation |
| `calendarSettings` | Configure project/task calendars for advanced scheduling |
| `allowParentDependency` | Allow dependencies that may affect drawn task schedule |

---

## Task Type Scenarios

Taskbar Draw behaves differently depending on the task type and hierarchical position.

### Leaf Tasks (Child Tasks)

- **Supported**: ✅ Full support for drawing
- **Behavior**: Drawing directly schedules the leaf task
- **Parent Impact**: Parent task dates auto-recalculate based on all children

```typescript
// Parent Task 1
//   ├─ Child Task 2 (can be drawn)
//   └─ Child Task 3 (can be drawn)
// Draw on Child Task 2 → Parent Task 1 auto-adjusts
```

### Parent Tasks

- **Supported**: ❌ Parent tasks cannot be drawn directly
- **Reason**: Parent dates are derived from child tasks in auto-scheduling mode
- **Workaround**: Draw on child tasks; parent will auto-adjust

```typescript
// Parent Task 1 (cannot draw directly)
//   ├─ Child Task 2
//   └─ Child Task 3
// Draw on Child Task 2 → Parent Task 1 recalculates
```

### Milestone Tasks

- **Drawing a point**: Creates a milestone (duration = 0)
- **Drawing a range**: Creates a task with duration > 0

```typescript
// Milestone (drag small range)
// Result: StartDate = drawn point, Duration = 0, EndDate = StartDate

// Task (drag larger range)
// Result: StartDate = start point, Duration = calculated, EndDate = end point
```

### Manually Scheduled Tasks

- **Supported**: ⚠️ With caution
- **Behavior**: Drawing on manually scheduled tasks may conflict with manual scheduling rules
- **Recommendation**: Set `validateManualTasksOnLinking: false` or handle conflicts in `actionBegin`

```typescript
taskMode: 'Manual',
validateManualTasksOnLinking: false
// User can draw on manually scheduled tasks without validation
```

---

## Feature Interactions

Taskbar Draw interacts with other Gantt features and settings.

### Interaction with Taskbar Editing

`allowTaskbarEditing` and `allowTaskbarDraw` complement each other:

```typescript
editSettings: {
    allowTaskbarEditing: true,   // drag/resize existing taskbars
    allowTaskbarDraw: true       // draw new taskbars
}
```

- **Taskbar Editing**: Modify existing scheduled taskbars (drag, resize, update progress)
- **Taskbar Draw**: Create/schedule new unscheduled taskbars

### Interaction with Dialog Editing

Taskbar drawing and dialog editing can coexist:

```typescript
editSettings: {
    allowEditing: true,          // dialog cell editing
    allowTaskbarEditing: true,   // drag/resize taskbars
    allowTaskbarDraw: true       // draw new taskbars
}
```

Users can choose their preferred editing method.

### Interaction with Cell Editing

Cell editing is independent of taskbar drawing. Users can:
- Edit cells directly in the grid
- Draw taskbars on the timeline
- Use dialogs for bulk editing

### Interaction with Dependencies

If the drawn task has predecessors, dependency validation may apply:

```typescript
// Task 2 has predecessor: Task 1FS
// User draws Task 2 earlier than Task 1 finish
// Result: Depends on validateMode
//   - respectLink: draw is rejected
//   - removeLink: dependency is removed
//   - preserveLinkWithEditing: offset is adjusted

actionBegin: (args) => {
    if (args.requestType === 'validateLinkedTask') {
        args.validateMode.preserveLinkWithEditing = true;
    }
}
```

### Interaction with Scheduling Modes

#### Auto Scheduling

- **Supported**: ✅ Full support
- **Behavior**: Drawn dates are validated and adjusted based on dependencies

#### Manual Scheduling

- **Supported**: ⚠️ With caution
- **Behavior**: Drawn dates may conflict; set `validateManualTasksOnLinking: false` to allow free drawing

#### Custom (Mixed) Scheduling

- **Supported**: ✅ Per-task behavior respected
- **Behavior**: Each task's auto/manual mode is respected during drawing

### Interaction with Working Time and Holidays

Taskbar drawing respects all calendar rules:

```typescript
dayWorkingTime: [{ from: 9, to: 17 }],
holidays: ['2024-04-10'],
workWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
includeWeekend: false,
calendarSettings: {
    projectCalendar: {
        exceptions: [{ date: '2024-04-15', isWorking: false }]
    }
}

// Drawn range automatically excludes weekends, holidays, non-working hours
```

### Interaction with Task Calendars

If a task has a custom calendar via `calendarId`, that calendar is used:

```typescript
taskFields: { calendarId: 'CalendarId' },
calendarSettings: {
    taskCalendar: [
        { calendarId: 'night-shift', workingTime: [{ from: 18, to: 2 }] }
    ]
}

{ TaskID: 1, TaskName: 'Night Shift Task', CalendarId: 'night-shift' }

// Drawing on this task uses night-shift calendar rules
```

### Interaction with Duration Units

The drawn range is converted to the configured duration unit:

```typescript
durationUnit: 'Week',
daysPerWeek: 5

// User draws 10 working days
// Result: Duration = 2 weeks
```

### Interaction with Resources

If a task has resources assigned, they are preserved when drawing:

```typescript
// Task has resources: [{ ResourceID: 1, Units: 80 }]
// User draws taskbar
// Result: Resources are preserved with same units
```

---

## Implementation Example

Here's a complete example with taskbar draw enabled and additional customization:

```typescript
import { Gantt, Edit, Toolbar, Selection, DayMarkers } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar, Selection, DayMarkers);

let data = [
    { TaskID: 1, TaskName: 'Project Planning', StartDate: new Date('04/02/2024'), Duration: 5, Progress: 100, ParentID: null },
    { TaskID: 2, TaskName: 'Design Phase', StartDate: null, Duration: null, Progress: 0, ParentID: 1 },      // Unscheduled
    { TaskID: 3, TaskName: 'Development', StartDate: null, Duration: null, Progress: 0, ParentID: 1 },      // Unscheduled
    { TaskID: 4, TaskName: 'Testing', StartDate: new Date('04/15/2024'), Duration: null, Progress: 0, ParentID: 1 } // Partially scheduled
];

let gantt: Gantt = new Gantt({
    dataSource: data,
    height: '500px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID'
    },
    columns: [
        { field: 'TaskID', width: 80 },
        { field: 'TaskName', width: 250 },
        { field: 'StartDate', width: 120 },
        { field: 'Duration', width: 120 },
        { field: 'Progress', width: 120 }
    ],
    editSettings: {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        allowTaskbarDraw: true           // Enable taskbar draw
    },
    allowUnscheduledTasks: true,         // Required for drawing
    durationUnit: 'Day',
    dayWorkingTime: [{ from: 9, to: 17 }],
    holidays: [{ from: '04/10/2024', to: '04/10/2024', label: 'Holiday' }],
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    
    // Events for custom handling
    taskbarEditing: (args) => {
        console.log('Taskbar being edited/drawn:', args.data.TaskName);
        // Prevent drawing on specific tasks if needed
        if (args.data.Priority === 'Critical') {
            // args.cancel = true;  // Uncomment to prevent
        }
    },
    actionComplete: (args) => {
        if (args.requestType === 'save') {
            console.log('Task scheduled/drawn:', args.data);
        }
    },
    
    // Customize taskbar appearance during draw
    queryTaskbarInfo: (args) => {
        if (args.data.Progress === 0) {
            args.taskbarBgColor = '#FFA500';  // Orange for unscheduled
        }
    }
});

gantt.appendTo('#Gantt');
```

---

## Limitations and Best Practices

### Limitations

| Limitation | Description | Workaround |
|---|---|---|
| Parent Tasks | Cannot draw on parent tasks directly | Draw on child tasks; parent auto-adjusts |
| Hidden Rows | Cannot draw on hidden or filtered rows | Expand/filter to make rows visible |
| Read-Only Mode | Disabled if `readOnly: true` | Set `readOnly: false` to enable |
| Validation Conflicts | Drawing may be rejected if it violates dependencies | Use appropriate `validateMode` or adjust dependencies |
| Manually Scheduled | May conflict with manual scheduling rules | Use `validateManualTasksOnLinking: false` |
| Performance | Large datasets may experience slight latency | Test with your data volume |

### Best Practices

1. **Enable with taskbar editing**: Use `allowTaskbarDraw` together with `allowTaskbarEditing` for full timeline editing capability.
   ```typescript
   editSettings: {
       allowTaskbarEditing: true,
       allowTaskbarDraw: true
   }
   ```

2. **Allow unscheduled tasks**: Set `allowUnscheduledTasks: true` to support creating initially empty tasks.
   ```typescript
   allowUnscheduledTasks: true
   ```

3. **Test with calendars**: Verify taskbar drawing respects your working time and holidays.
   ```typescript
   dayWorkingTime: [{ from: 9, to: 17 }],
   calendarSettings: { projectCalendar: { holidays: [...] } }
   ```

4. **Test with dependencies**: Ensure dependency validation doesn't prevent intended scheduling.
   ```typescript
   actionBegin: (args) => {
       if (args.requestType === 'validateLinkedTask') {
           args.validateMode.preserveLinkWithEditing = true;
       }
   }
   ```

5. **Provide user guidance**: Consider tooltips or documentation on the draw gesture for users unfamiliar with the feature.

6. **Handle edge cases**: Test with different task states (unscheduled, partially scheduled, scheduled, milestones).

7. **Monitor performance**: On large datasets with many task rows, drawing may have latency; test accordingly.

8. **Validate data on save**: Use `actionBegin` with requestType 'beforeSave' to validate drawn tasks before saving.
   ```typescript
   actionBegin: (args) => {
       if (args.requestType === 'beforeSave') {
           if (args.data.Duration < 1) {
               args.cancel = true;
               alert('Duration must be at least 1 day');
           }
       }
   }
   ```

9. **Use visual feedback**: Customize taskbar colors for unscheduled vs scheduled tasks using `queryTaskbarInfo`.

10. **Test accessibility**: Ensure keyboard users can create/edit tasks; consider alternate input methods if needed.

---

## See Also

- [Managing Tasks - Editing](./managing-tasks.md)
- [Task Scheduling](./task-scheduling.md)
- [Calendar Settings](./calendar-settings.md)
- [Taskbar Customization](./taskbar.md)
- [Task Dependency](./task-dependency.md)
