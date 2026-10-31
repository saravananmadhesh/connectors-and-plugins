# Taskbar Draw — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Taskbar Drawing](#enable-taskbar-drawing)
- [Taskbar Draw Workflow](#taskbar-draw-workflow)
- [Scheduling Calculation](#scheduling-calculation)
- [Task Types and Scheduling Modes](#task-types-and-scheduling-modes)
- [Feature Interactions](#feature-interactions)
- [Limitations and Best Practices](#limitations-and-best-practices)

---

## Overview

Taskbar Draw lets users schedule an existing unscheduled or partially scheduled task by dragging directly on the timeline. Gantt resolves the drawn range into `StartDate`, `EndDate`, and `Duration` using the configured duration unit and scheduling rules.

## Enable Taskbar Drawing

Set `AllowTaskbarDraw(true)` on `EditSettings`. Enable `AllowUnscheduledTasks(true)` for workflows that draw schedules on unscheduled rows. Taskbar editing can be enabled alongside drawing when users also need to move or resize scheduled taskbars.

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks")
    )
    .AllowUnscheduledTasks(true)
    .EditSettings(es => es
        .AllowEditing(true)
        .AllowTaskbarEditing(true)
        .AllowTaskbarDraw(true)
    )
    .Render()
```

`AllowTaskbarDraw` is `false` by default. `AllowUnscheduledTasks(true)` is required for scheduling unscheduled rows; `AllowTaskbarEditing(true)` is complementary and enables moving or resizing existing taskbars. Configure these properties through the Gantt helper's `EditSettings` builder.

| API | Type | Default | Purpose |
|---|---|---|---|
| `EditSettings.AllowTaskbarDraw` | `bool` | `false` | Enables drawing a schedule on the timeline |
| `AllowUnscheduledTasks` | `bool` | `false` | Allows incomplete schedule data for unscheduled-task workflows |
| `EditSettings.AllowTaskbarEditing` | `bool` | `false` | Enables moving or resizing existing taskbars |

## Taskbar Draw Workflow

### Fully Unscheduled Task

For an existing row with no schedule dates or duration, the drawn start and end boundaries establish its schedule. Gantt calculates duration from the resulting range and active scheduling rules.

### Partially Scheduled Task

For a row with incomplete schedule information, drawing provides or updates schedule values. The component recalculates related values from the resulting task schedule; the exact result depends on the duration unit and calendar configuration.

### Already Scheduled Task

Use taskbar editing to move or resize a scheduled task. When drawing and taskbar editing are both enabled, treat the existing-task interaction as editing behavior.

## Scheduling Calculation

The resulting schedule follows the same configured scheduling rules as other task updates, including working time, holidays, weekends, duration units, dependencies, and task calendars. A drawn range across non-working time can therefore have a different working duration from its elapsed timeline span. Review the resulting values after drawing; do not assume a fixed one-to-one conversion between pixels, calendar days, and duration.

```cshtml
@Html.EJS().Gantt("Gantt")
    .AllowUnscheduledTasks(true)
    .EditSettings(es => es.AllowTaskbarDraw(true))
    .CalendarSettings(cs => cs
        .ProjectCalendar(pc => pc
            .WorkingTime(new List<object> { new { From = 9, To = 17 } })
            .Holidays(new List<object>
            {
                new { from = new DateTime(2024, 4, 10), to = new DateTime(2024, 4, 10), label = "Regional Holiday" }
            })
        )
    )
    .Render()
```

Holidays are excluded from working duration, so the calculated duration and task end date follow the active calendar rather than treating every date in the drawn span as a working day.

## Task Types and Scheduling Modes

### Parent Tasks

Parent task dates are normally derived from their children in auto scheduling mode. Prefer drawing on leaf tasks or unscheduled work items and let parent dates roll up from child schedules.

### Child Tasks

Child task rows are appropriate targets for taskbar drawing. The resulting schedule participates in the configured hierarchy and scheduling rules.

### Milestones

A milestone has zero duration and is not a suitable target for drawing a time span. Use cell or dialog editing to place a milestone while preserving its zero-duration behavior.

### Manually Scheduled Tasks

Manual and custom scheduling modes retain their configured scheduling behavior. Taskbar drawing does not imply that a manually scheduled task is converted to auto scheduling; verify the resulting task dates under the selected mode.

## Feature Interactions

### Dependencies and Validation

Dependencies and predecessor validation can affect placement after a draw. The configured validation mode determines how conflicts are handled; check the final schedule when drawing a linked task.

### Dialog, Cell, and Resource Editing

Taskbar drawing establishes or updates the schedule; it is not a replacement for entering the rest of the task details. Use dialog editing to add or change resources, dependencies, and other task metadata. Use cell editing to fine-tune schedule fields that are enabled for editing. Resource assignments remain available independently of the draw interaction, and task-calendar rules apply when the row is assigned a task calendar.

## Limitations and Best Practices

- Taskbar Draw schedules existing unscheduled or partially scheduled rows; use the normal add-task workflow to create a new task record.
- Zero-duration milestones should be created or placed through cell or dialog editing instead of drawing a span.
- Parent rows in auto scheduling are generally calculation-driven; draw on child tasks and allow parent dates to roll up.
- Taskbar Draw complements, but does not replace, dialog editing when users must enter resources, dependencies, or other task details.
- Enable `AllowUnscheduledTasks(true)` when the workflow schedules unscheduled rows.
- Configure project and task calendars, working time, weekends, and holidays before users draw schedules.
- Test drawn rows with dependencies and validation modes, then verify the committed start date, end date, and duration.
- Test mixed duration units and task-specific calendars when those configurations are used.