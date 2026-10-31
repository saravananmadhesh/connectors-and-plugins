# Task Scheduling – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Auto Scheduling](#auto-scheduling)
- [Manual Scheduling](#manual-scheduling)
- [Validate Manual Tasks on Linking](#validate-manual-tasks-on-linking)
- [Custom Scheduling (Mixed)](#custom-scheduling-mixed)
- [Unscheduled Tasks](#unscheduled-tasks)
- [Milestones](#milestones)
- [Working Time Range](#working-time-range)
- [Week-Specific Working Time](#week-specific-working-time)
- [Non-Working Days](#non-working-days)
- [Duration Units](#duration-units)
- [Baseline](#baseline)
- [Task Constraints](#task-constraints)
- [Task Constraint Conflict Management](#task-constraint-conflict-management)

---

## Overview

Task scheduling in the Gantt Chart is controlled by the `TaskMode` property. It determines whether date calculations are automatic or manual.

| Mode | Behavior |
|---|---|
| `Auto` (default) | Dates automatically validated against working time, holidays, weekends, predecessors |
| `Manual` | Dates used as-is from data source; no automatic adjustment |
| `Custom` | Per-task mode; driven by a boolean field in the data source |

---

## Auto Scheduling

Default mode — Gantt automatically adjusts dates based on dependencies, working hours, and non-working days:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TaskMode(Syncfusion.EJ2.Gantt.ScheduleMode.Auto)
    .Render()
```

---

## Manual Scheduling

Dates are not validated — they are rendered exactly as provided in the data source:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TaskMode(Syncfusion.EJ2.Gantt.ScheduleMode.Manual)
    .Render()
```

In manual mode:
- Task bars can be dragged to any position on the timeline
- Predecessor lines are drawn but do **not** constrain date positions
- Useful for tracking actual vs. planned dates without automatic adjustment

---

## Validate Manual Tasks on Linking

In `Manual` mode, you can still enable predecessor-based date validation by setting `ValidateManualTasksOnLinking(true)`. This causes Gantt to automatically recalculate manual task dates when a dependency link is added or changed.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    .TaskMode(Syncfusion.EJ2.Gantt.ScheduleMode.Manual)
    .ValidateManualTasksOnLinking(true)
    .Render()
```

> `ValidateManualTasksOnLinking` applies predecessor validation only — all other scheduling factors (holidays, weekends, working time) are still ignored in manual mode.

---

## Custom Scheduling (Mixed)

Map a boolean `IsManual` field in the data source. Each task can independently be auto or manual:

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int? Duration { get; set; }
    public bool IsManual { get; set; }   // true = manual, false = auto
    public List<GanttData> SubTasks { get; set; }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Manual("IsManual")       // maps per-task scheduling mode
        .Child("SubTasks")
    )
    .TaskMode(Syncfusion.EJ2.Gantt.ScheduleMode.Custom)
    .Render()
```

---

## Unscheduled Tasks

Tasks without complete date information are called unscheduled tasks. Enable them with `AllowUnscheduledTasks`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .AllowUnscheduledTasks(true)
    .Render()
```

**Rendering behaviour by available data:**

| Available Fields | Auto Mode | Manual Mode |
|---|---|---|
| Start Date only | Half taskbar from start date | Half taskbar from start date |
| End Date only | Half taskbar ending at end date | Half taskbar ending at end date |
| Duration only | Taskbar at project start for given duration | Taskbar at project start for given duration |
| No dates or duration | Milestone at project start | Milestone at project start |
| Start + End | Full taskbar | Full taskbar |

> If `AllowUnscheduledTasks` is `false`, Gantt defaults duration to 1 day from project start date.

---

## Milestones

A milestone is a zero-duration task displayed as a diamond shape. Create one by setting `Duration = 0`:

```csharp
new GanttData { TaskId = 5, TaskName = "Go Live", StartDate = new DateTime(2024, 5, 1), Duration = 0 }
```

Or set `StartDate == EndDate` with `Duration = 0`.

---

## Working Time Range

Define the working hours for all project days using `DayWorkingTime`:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .DayWorkingTime(dwt =>
    {
        dwt.From(8).To(12).Add();   // 8am–12pm
        dwt.From(13).To(17).Add();  // 1pm–5pm
    })
    .Render()
```

Define different working hours per day of week using `WeekWorkingTime`:

```cshtml
.WeekWorkingTime(wwt =>
{
    wwt.DayOfWeek(new List<Syncfusion.EJ2.Gantt.DayOfWeek> { Syncfusion.EJ2.Gantt.DayOfWeek.Monday, Syncfusion.EJ2.Gantt.DayOfWeek.Tuesday })
       .TimeRange(tr => { tr.From(10).To(18).Add(); })
       .Add();
})
```

> `WeekWorkingTime` takes priority over `DayWorkingTime` for the days it covers.

---

## Week-Specific Working Time

Use `WeekWorkingTime` to assign different working hours to specific days of the week, overriding the global `DayWorkingTime` for those days.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    .WeekWorkingTime(wwt =>
    {
        wwt.DayOfWeek(new List<Syncfusion.EJ2.Gantt.DayOfWeek> { Syncfusion.EJ2.Gantt.DayOfWeek.Tuesday })
           .TimeRange(tr => { tr.From(10).To(18).Add(); })
           .Add();
    })
    .TimelineSettings(ts => ts
        .TopTier(tt => tt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Day))
        .BottomTier(bt => bt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Hour))
    )
    .Render()
```

**Priority and fallback rules:**
- `WeekWorkingTime` takes priority over `DayWorkingTime` for specified days.
- Days not listed in `WeekWorkingTime` use the global `DayWorkingTime` values.
- If a day is both a holiday/non-working day and listed in `WeekWorkingTime`, it remains a non-working day.

---

## Non-Working Days

By default, Saturday and Sunday are non-working days. Configure the working week:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .WorkWeek(new List<string> { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" })
    .Render()
```

Include weekends as working days:

```cshtml
.IncludeWeekend(true)
```

---

## Duration Units

Duration units define how task duration values are interpreted and calculated in the Gantt Chart. The Gantt control supports multiple duration units, and duration can be configured globally or per-task.

### Supported Duration Units

| Unit | Code | Use Case | Calculation Impact |
|------|------|----------|-------------------|
| **Day** | `0` (default) | General planning | Uses calendar days; affected by working hours, holidays, weekends |
| **Hour** | `1` | Short or shift-based work | Uses hourly precision; affected by `HoursPerDay` setting |
| **Minute** | `2` | Precision tasks, meetings | Uses minute precision |
| **Week** | `3` | Sprint/iteration planning | Converts duration using `DaysPerWeek` before scheduling |
| **Month** | `4` | Long phases, roadmap planning | Converts duration using `DaysPerMonth` before scheduling |

### Set Global Duration Unit

Set the global default duration unit for all tasks:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .DurationUnit(Syncfusion.EJ2.Gantt.DurationUnit.Hour)
    .Render()
```

### Set Per-Task Duration Unit

Map a `DurationUnit` field in your data model:

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int Duration { get; set; }
    public string DurationUnit { get; set; }  // "day", "hour", "minute", "week", "month"
    public List<GanttData> SubTasks { get; set; }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").DurationUnit("DurationUnit").Child("SubTasks")
    )
    .Render()
```

### Embed Unit in Duration String

You can optionally specify the unit directly in the duration value:

```csharp
new GanttData { TaskId = 1, TaskName = "Design", StartDate = new DateTime(2024, 4, 2), Duration = 4, DurationUnit = "day" },
new GanttData { TaskId = 2, TaskName = "Development", StartDate = new DateTime(2024, 4, 6), Duration = 40, DurationUnit = "hour" },
new GanttData { TaskId = 3, TaskName = "Planning Sprint", StartDate = new DateTime(2024, 4, 13), Duration = 2, DurationUnit = "week" }
```

Or as string values (when `AllowUnscheduledTasks` is enabled):

```csharp
new GanttData { TaskId = 4, Duration = "4 days" }
new GanttData { TaskId = 5, Duration = "8 hours" }
new GanttData { TaskId = 6, Duration = "2 weeks" }
```

> When mixing duration units in a single column, set the column's edit type to `string` to allow users to type the unit suffix.

---

### Week and Month Duration Calculation

Week and month durations are converted to working-day equivalents before Gantt calculates the task schedule. A week uses `DaysPerWeek`; a month uses `DaysPerMonth`. These values represent planning conventions, not fixed seven-day weeks or calendar-month boundaries.

| Property | Purpose |
|---|---|
| `DaysPerWeek` | Number of working days used to convert one week of duration |
| `DaysPerMonth` | Number of working days used to convert one month of duration |

Configure the conversion values globally. The values shown here are explicit project choices; set them to match the project's work-week and planning-month conventions:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .DaysPerWeek(5)
    .DaysPerMonth(20)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").DurationUnit("DurationUnit").Child("SubTasks")
    )
    .Render()
```

Map a per-task duration unit with `TaskFields.DurationUnit`. The task data can mix units:

```csharp
new GanttData { TaskId = 1, TaskName = "Sprint", StartDate = new DateTime(2024, 4, 1), Duration = 2, DurationUnit = "Week" },
new GanttData { TaskId = 2, TaskName = "Release phase", StartDate = new DateTime(2024, 4, 15), Duration = 1, DurationUnit = "Month" }
```

Alternatively, configure one unit for all tasks with `DurationUnit`:

```cshtml
.DurationUnit(Syncfusion.EJ2.Gantt.DurationUnit.Week)
```

The unit can also be included in a duration string, such as `"2 weeks"` or `"1 month"`. For a column that accepts duration values with unit text, use a string edit type.

When Gantt resolves a task's duration unit, an explicit unit in the duration value takes precedence over the mapped per-task `DurationUnit`; the global `DurationUnit` is used when neither task-level source specifies a unit.

### Scheduling and Calendar Interaction

The conversion values affect duration interpretation and the dates calculated from a task's start date. After conversion, normal scheduling rules determine the resulting schedule:

- **Start and end dates:** Gantt converts the duration to working-day equivalents, then applies the active calendar to calculate the resulting end date. A date-only change is not implied by changing `DaysPerWeek` or `DaysPerMonth` unless the schedule is recalculated.
- **Working time and `HoursPerDay`:** Working-time ranges govern which hours count toward task work. `HoursPerDay` controls the conversion between working hours and a displayed day-based duration; it is distinct from week/month conversion.
- **Weekends and holidays:** Non-working days, holidays, and calendar exceptions affect when converted working days occur, so the elapsed calendar span can be longer than the converted duration.
- **Task calendars:** A task assigned a calendar through `TaskFields.CalendarId` uses that calendar's scheduling rules instead of merging them with the project calendar. Unassigned tasks use the project calendar.
- **Dependencies:** Dependency validation and successor scheduling operate on the calculated task dates and active calendar rules. Verify linked schedules after changing conversion values.
- **Editing and taskbar editing:** Editing duration or moving/resizing a taskbar can recalculate dates using the configured unit and current calendar. Validate mixed-unit tasks after edits rather than assuming a fixed calendar span.
- **Project scheduling:** In auto scheduling, task dates and parent rollups are based on the converted child schedules. Manual scheduling retains the mode's date-handling behavior; use the appropriate scheduling mode for the project.

Week/month duration units describe planning work units: for example, with `DaysPerWeek(5)`, a two-week duration converts to ten working days before the calendar is applied. Holidays and excluded weekends can extend the elapsed timeline span. A month behaves similarly using `DaysPerMonth`, not by advancing to the same date in the next calendar month.

### Edge Cases, Limitations, and Best Practices

- Week and month durations are not equivalent to seven calendar days or a calendar-month boundary.
- Different `DaysPerWeek` or `DaysPerMonth` values change the converted duration and can change dependent task dates after recalculation.
- Keep these settings consistent with `WorkWeek` and the project's planning policy; they define conversion quantities and do not themselves mark weekdays as working or non-working.
- Review task calendars, holidays, weekends, and predecessor validation together when checking resulting dates.
- Document the configured conversion values, especially when project data is exchanged with other planning tools.
- Test mixed-unit tasks through cell/dialog editing, taskbar editing, and dependency-driven rescheduling.

---

## Task Constraints

Task constraints define scheduling rules that restrict when a task is allowed to start or finish.

| Constraint Type | Code | Description |
|---|---|---|
| As Soon As Possible | `0` | Starts as soon as its dependencies allow (default) |
| As Late As Possible | `1` | Delays until the last possible moment without affecting successors |
| Must Start On | `2` | Must begin on an exact date |
| Must Finish On | `3` | Must end on an exact date |
| Start No Earlier Than | `4` | Cannot start before the constraint date |
| Start No Later Than | `5` | Must start on or before the constraint date |
| Finish No Earlier Than | `6` | Cannot finish before the constraint date |
| Finish No Later Than | `7` | Must finish on or before the constraint date |

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public int Progress { get; set; }
    public string Predecessor { get; set; }
    public int? ParentID { get; set; }
    public int ConstraintType { get; set; }   // e.g., 2 (Must Start On), 7 (Finish No Later Than), 4 (Start No Earlier Than)
    public DateTime? ConstraintDate { get; set; }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration")
        .Progress("Progress").Dependency("Predecessor").ParentID("ParentID")
        .ConstraintType("ConstraintType").ConstraintDate("ConstraintDate")
    )
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Columns(col =>
    {
        col.Field("TaskId").Visible(false).Add();
        col.Field("TaskName").HeaderText("Job Name").Width("200").Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("ConstraintType").Width("180").Add();
        col.Field("ConstraintDate").Add();
        col.Field("EndDate").Add();
        col.Field("Predecessor").Add();
        col.Field("Progress").Add();
    })
    .Render()
```

> `ConstraintType` accepts numeric values: `0` (ASAP), `1` (ALAP), `2` (MSO), `3` (MFO), `4` (SNET), `5` (SNLT), `6` (FNET), `7` (FNLT). `ConstraintDate` is required for all constraint types except `0` (ASAP) and `1` (ALAP).

---

## Task Constraint Conflict Management

When a scheduling change violates a strict constraint (`2`/MSO, `3`/MFO, `5`/SNLT, `7`/FNLT), the Gantt shows a violation popup. Use the `ActionBegin` event with `requestType === "validateTaskViolation"` to intercept and handle violations silently.

| `validateMode` Flag | Constraint Enforced Silently |
|---|---|
| `respectMustStartOn` | Must Start On (2) |
| `respectMustFinishOn` | Must Finish On (3) |
| `respectStartNoLaterThan` | Start No Later Than (5) |
| `respectFinishNoLaterThan` | Finish No Later Than (7) |

> All flags default to `false` (popup shown). Set a flag to `true` to silently cancel the violating user action without displaying a dialog.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration")
        .Progress("Progress").Dependency("Predecessor").ParentID("ParentID")
        .ConstraintType("ConstraintType").ConstraintDate("ConstraintDate")
    )
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .ActionBegin("actionBegin")
    .Render()

<script>
function actionBegin(args) {
    if (args.requestType === 'validateTaskViolation') {
        args.validateMode.respectMustStartOn = true;
    }
}
</script>
```
