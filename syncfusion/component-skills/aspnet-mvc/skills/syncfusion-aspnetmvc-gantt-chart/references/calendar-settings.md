# Calendar Settings – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Project Calendar](#project-calendar)
- [Task Calendars](#task-calendars)
- [Hours Per Day](#hours-per-day)
- [Calendar Behavior and Scheduling Impact](#calendar-behavior-and-scheduling-impact)
- [Supported Scenarios](#supported-scenarios)
- [Feature Limitations](#feature-limitations)
- [Best Practices](#best-practices)

---

## Overview

The Syncfusion ASP.NET MVC Gantt Chart supports calendar-driven scheduling through the `CalendarSettings` property. Calendar settings define working time blocks, holidays, and task-specific calendar rules that affect how durations are calculated and how tasks are scheduled.

Calendar configuration is split into two levels:

- **Project Calendar** — the default calendar applied to the entire project (applies globally)
- **Task Calendars** — custom calendars assigned to specific tasks via `TaskFields.CalendarId` (applies per-task)

Resource assignments are configured separately through `Resources`, `ResourceFields`, and `TaskFields.ResourceInfo`. The calendar APIs documented here select a project calendar or a task calendar; they do not define a resource-calendar mapping. Assigning a resource therefore should not be treated as selecting a task calendar.

| API | Purpose |
|---|---|
| `CalendarSettings.ProjectCalendar` | Defines the default project working calendar |
| `CalendarSettings.TaskCalendars` | Defines task calendars referenced from task data |
| `TaskFields.CalendarId` | Maps each task to its task calendar |
| `HoursPerDay` | Converts working hours to a displayed day-based duration |
| `WorkWeek`, `IncludeWeekend` | Configure the project's working days and weekend scheduling |

Configure these through the corresponding Gantt helper builders, for example `.CalendarSettings(...)`, `.TaskFields(...)`, `.HoursPerDay(...)`, and `.WorkWeek(...)`.

Calendar settings affect:
- Task start and end date calculation
- Duration conversion between hours and days
- Dependency-based scheduling and offset calculations
- Weekend and holiday handling (when combined with `WorkWeek` property)
- Working time rules for project and task scopes
- How display duration in days relates to actual working hours via `HoursPerDay`

---

## Project Calendar

The `CalendarSettings.ProjectCalendar` property defines the default working calendar for the project. Tasks that do not specify a task calendar use this calendar.

### Configure Project Working Hours

Working hours define the daily time blocks during which tasks can be scheduled. Configure project-level working hours using `WorkingTime`:

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int? Duration { get; set; }
    public List<GanttData> SubTasks { get; set; }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
        )
    )
    .Render()
```

**Properties:**
- `From` — Start hour (0-24 format)
- `To` — End hour (0-24 format)

Working hours apply to all tasks unless a task is assigned a custom task calendar via `CalendarId`.

### Configure Project Holiday Exceptions

Holidays are non-working dates that exclude time from task calculations. Configure project holidays using `Holidays`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
            .Holidays(new List<object>
            {
                new { from = new DateTime(2024, 4, 10), to = new DateTime(2024, 4, 10), label = "Regional Holiday" },
                new { from = new DateTime(2024, 4, 17), to = new DateTime(2024, 4, 17), label = "Company Holiday" }
            })
        )
    )
    .Render()
```

Each holiday is an object with `from` and `to` dates defining the non-working date range and an optional `label`. A single-day holiday uses the same date for both endpoints. Holidays override the global `WorkWeek` setting and mark the covered dates as non-working for the project.

### Configure Calendar Exceptions

Calendar exceptions allow overriding normal working rules for specific dates. Use exceptions when the project has special working days, partial work days, or date-specific schedule adjustments that do not fit the standard working pattern:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
            .Holidays(new List<object>
            {
                new { from = new DateTime(2024, 4, 10), to = new DateTime(2024, 4, 10), label = "Regional Holiday" }
            })
            .Exceptions(new List<object> 
            {
                new { Date = "2024-04-15", IsWorking = false, WorkingTime = new List<object>() },  // Make a working day non-working
                new { Date = "2024-04-20", IsWorking = true, WorkingTime = new List<object> { new { From = 9, To = 12 } } }  // Saturday with partial hours
            })
        )
    )
    .Render()
```

**Exception properties:**
- `Date` — the specific date (ISO 8601 format)
- `IsWorking` — set to `false` to make the date non-working; `true` to make it working
- `WorkingTime` — override the working hours for that date

---

## Task Calendars

Task calendars enable different tasks to follow different working rules than the project calendar. This is useful for:

- Split-shift teams
- Region-specific working patterns
- External vendors with different holidays
- Tasks that follow a fixed calendar separate from the main project calendar

### Assign Task-Specific Calendars

Define the task calendar collection with `CalendarSettings.TaskCalendars`, then map a calendar identifier to each task using `TaskFields.CalendarId`.

**Model with CalendarId:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int? Duration { get; set; }
    public string CalendarId { get; set; }  // reference to task calendar
    public List<GanttData> SubTasks { get; set; }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").CalendarId("CalendarId").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
        )
        .TaskCalendars(new List<object>
        {
            new 
            {
                calendarId = "calendar1",
                workingTime = new List<object> { new { from = 6, to = 14 } },  // Morning shift
                holidays = new[] { new { from = new DateTime(2024, 4, 10), to = new DateTime(2024, 4, 10), label = "Local Holiday" } }
            },
            new 
            {
                calendarId = "calendar2",
                workingTime = new List<object> { new { from = 14, to = 22 } },  // Evening shift
                holidays = new[] { new { from = new DateTime(2024, 4, 17), to = new DateTime(2024, 4, 17), label = "Evening Team Holiday" } }
            }
        })
    )
    .Render()
```

**Task calendar properties:**
- `calendarId` — unique identifier referenced by `TaskFields.CalendarId`
- `workingTime` — array of daily time blocks
- `holidays` — array of non-working date-range objects with `from`, `to`, and optional `label` properties
- `exceptions` — array of date-specific overrides

### Task Calendar Behavior

When a task is assigned a calendar via `CalendarId`:
- That task follows **only** the assigned task calendar
- The assigned task calendar **overrides** the project calendar for that task
- Working days, holidays, and calendar exceptions defined in the assigned calendar are used for:
  - Task schedule calculation
  - Working duration calculation
- Dependency calculations use the active calendars of the predecessor and successor tasks; different calendars can change the visible gap between linked tasks.
- Other task calendars are **not** considered when scheduling that task

If `CalendarId` is not provided, the task uses the project calendar. A task follows one assigned task calendar at a time; task and project calendar rules are not merged for that task.

### Task Calendar and Resource Assignments

`CalendarId` and `ResourceInfo` serve different purposes: `CalendarId` selects task scheduling rules, while resource fields assign people or equipment to work. The documented task calendar API does not select or inherit a separate calendar from an assigned resource. If an application has resource-specific availability rules, model those rules separately and verify the resulting task schedule.

## Hours Per Day

`HoursPerDay` defines how many working hours represent one day when displaying or converting day-based durations. It affects duration conversion, not the task's start date, end date, or underlying working duration when only this property changes.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .HoursPerDay(8)
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
        )
    )
    .Render()
```

For example, 32 working hours display as 4 days when `HoursPerDay` is 8 and as 2 days when it is 16; the scheduled dates remain unchanged by this display conversion alone. The default `HoursPerDay` is 8.

---

## Calendar Behavior and Scheduling Impact

### Duration Calculation with Calendars

Duration is calculated based on working time defined in the active calendar (project or task-specific). Non-working hours and holidays are excluded:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").DurationUnit("Hour").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })  // 8 hours per day
        )
    )
    .HoursPerDay(8)  // 8 hours = 1 display day
    .Render()
```

If a task has:
- `Duration = 16` hours
- Working hours: 9 AM to 5 PM (8 hours/day)

The task requires 2 working days at 8 hours per day. If the schedule crosses weekends or holidays, the elapsed calendar span can be longer.

### Task Dependencies with Calendars

When calculating predecessor offsets and successor dates, the active calendar (project or task-specific) is used:

```cshtml
// Predecessor offset: "3FS+2" means finish-to-start with 2-day lag
// The lag calculation uses the task's assigned calendar
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Dependency("Predecessor").CalendarId("CalendarId").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
        )
        .TaskCalendars(new List<object>
        {
            new { calendarId = "calendar1", workingTime = new List<object> { new { from = 9, to = 17 } }, holidays = new[] { new { from = new DateTime(2024, 4, 13), to = new DateTime(2024, 4, 13), label = "Team Holiday" } } }
        })
    )
    .Render()
```

When a task with `CalendarId = "calendar1"` has a predecessor offset, the offset is calculated using that calendar's working days, holidays, and working hours.

### Weekend Handling

Working days are configured globally with `WorkWeek` and `IncludeWeekend`. Task calendar configuration is task-scoped; check the effective calendar and work-week settings together when validating a schedule. Avoid assuming that an assigned resource changes the task's working week.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .WorkWeek(new List<string> { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" })  // Standard 5-day week
    .Render()
```

---

## Supported Scenarios

### Single Project Calendar

All tasks follow the project calendar's working time and holidays:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 8, To = 18 } })
            .Holidays(new List<object>
            {
                new { from = new DateTime(2024, 4, 10), to = new DateTime(2024, 4, 10), label = "Regional Holiday" },
                new { from = new DateTime(2024, 4, 17), to = new DateTime(2024, 4, 17), label = "Company Holiday" }
            })
        )
    )
    .Render()
```

### Multi-Calendar with Task Assignment

Different tasks follow different calendars based on team or shift assignments:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").CalendarId("CalendarId").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
        )
        .TaskCalendars(new List<object>
        {
            new { calendarId = "us", workingTime = new List<object> { new { from = 9, to = 17 } }, holidays = new[] { new { from = new DateTime(2024, 7, 4), to = new DateTime(2024, 7, 4), label = "US Holiday" } } },
            new { calendarId = "uk", workingTime = new List<object> { new { from = 9, to = 17 } }, holidays = new[] { new { from = new DateTime(2024, 5, 6), to = new DateTime(2024, 5, 6), label = "UK Holiday" } } },
            new { calendarId = "in", workingTime = new List<object> { new { from = 9, to = 17 } }, holidays = new[] { new { from = new DateTime(2024, 3, 8), to = new DateTime(2024, 3, 8), label = "India Holiday" } } }
        })
    )
    .Render()
```

### Partial Working Days

Use calendar exceptions to define days with reduced working hours:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
            .Exceptions(new List<object>
            {
                new { Date = "2024-12-24", IsWorking = true, WorkingTime = new List<object> { new { From = 9, To = 12 } } },  // Christmas Eve: half day
                new { Date = "2024-12-31", IsWorking = true, WorkingTime = new List<object> { new { From = 9, To = 14 } } }   // New Year's Eve: short day
            })
        )
    )
    .Render()
```

---

## Feature Limitations

1. A task can use only one assigned task calendar at a time. A task calendar overrides rather than merges with the project calendar for that task.
2. A task calendar affects only tasks mapped to it through `TaskFields.CalendarId`; other tasks continue to use the project calendar.
3. If `CalendarId` refers to a calendar that is not defined, the task falls back to the project calendar.
4. Resource assignment does not map a resource calendar through the APIs described here. Do not infer task-calendar selection from `ResourceInfo`.
5. Calendar rules can change calculated dates and dependency gaps. Recheck dependent tasks after changing working time, holidays, exceptions, or calendar assignments.

---

## Best Practices

1. **Define Project Calendar First**: Always configure the project calendar as the baseline. Task calendars should override only when necessary for specific tasks or teams.

2. **Use Consistent Hour Format**: Ensure all calendars use the same hour format (e.g., 24-hour) to avoid confusion in calculations.

3. **Document Calendar Assignments**: Maintain clear documentation of which tasks use which calendars and why. This helps during maintenance and troubleshooting.

4. **Validate Holiday Dates**: Use valid `DateTime` values for holiday `from` and `to` endpoints, and ensure the end date is not earlier than the start date.

5. **Test Cross-Timezone Scenarios**: If calendars are used with `Timezone()` setting, test that working hours and holidays align correctly across time zones.

6. **Minimize Exceptions**: Use calendar exceptions sparingly. Complex exception lists can impact performance and make scheduling logic harder to understand.

7. **Leverage HoursPerDay**: Set `HoursPerDay` to match your organization's standard working hours. This ensures duration calculations align with user expectations (e.g., 8 hours = 1 day).

8. **Validate Dependencies**: After assigning task calendars, verify that task dependencies are calculated correctly, especially when predecessor and successor use different calendars.

---

## See Also

- [Task Scheduling](task-scheduling.md) — Duration units and scheduling modes
- [Task Dependencies](task-dependency.md) — Predecessor offset calculations
- [Globalization](globalization.md) — Timezone and culture-specific settings
