````markdown
# Task Scheduling — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Auto Scheduling](#auto-scheduling)
- [Manual Scheduling](#manual-scheduling)
- [Validate Manual Tasks on Linking](#validate-manual-tasks-on-linking)
- [Custom Scheduling (Mixed Mode)](#custom-scheduling-mixed-mode)
- [Unscheduled Tasks](#unscheduled-tasks)
- [Working Time Range](#working-time-range)
- [Week-Specific Working Time](#week-specific-working-time)
- [Weekend and Non-Working Days](#weekend-and-non-working-days)
- [Include Weekend as Working Day](#include-weekend-as-working-day)
- [Duration Units — Global Project Setting](#duration-units--global-project-setting)
- [Duration Units — Per-Task Field Mapping](#duration-units--per-task-field-mapping)
- [Duration Units — Inline with Duration Value](#duration-units--inline-with-duration-value)
- [Task Constraints — Overview](#task-constraints--overview)
- [Task Constraints — Configuration](#task-constraints--configuration)
- [Task Constraints — Conflict Management](#task-constraints--conflict-management)

---

## Overview

Task scheduling in the Gantt Chart is controlled by the `taskMode` property. It determines whether date calculations are automatic (driven by predecessors, working time, holidays, and constraints) or manual (driven purely by user-supplied data).

| Mode | Behavior |
|---|---|
| `Auto` (default) | Dates are automatically recalculated based on predecessors, working time, holidays, and constraints |
| `Manual` | Dates are taken directly from the data source — no automatic recalculation |
| `Custom` | Each task has its own mode (`Auto` or `Manual`) determined by a boolean data field |

---

## Auto Scheduling

When `taskMode="Auto"`, all task start and end dates are automatically validated based on predecessors, working time, holidays, and weekends.

```cshtml
<ejs-gantt id='Resources' dataSource="ViewBag.DataSource"
           treeColumnIndex="1" height="450px" allowSelection="true" highlightWeekends="true"
           projectStartDate="02/20/2017" projectEndDate="03/30/2019" taskMode="Auto"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress" dependency="Predecessor" endDate="EndDate"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

> `taskMode="Auto"` is the default — it does not need to be specified unless overriding a previously set mode.

---

## Manual Scheduling

When `taskMode="Manual"`, task dates are taken exactly as provided in the data source. Dates are **not** validated against predecessors, holidays, weekends, or working time.

```cshtml
<ejs-gantt id='Resources' dataSource="ViewBag.DataSource"
           treeColumnIndex="1" height="450px" allowSelection="true" highlightWeekends="true"
           projectStartDate="02/20/2017" projectEndDate="03/30/2019" taskMode="Manual"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress" dependency="Predecessor" endDate="EndDate"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

In manual mode:
- Task bars can be dragged to any position on the timeline
- Predecessor lines are drawn but do **not** constrain date positions
- Useful for tracking actual vs. planned dates without automatic adjustment

---

## Validate Manual Tasks on Linking

In `Manual` mode, you can still enable predecessor-based date validation by setting `validateManualTasksOnLinking="true"`. This causes Gantt to automatically recalculate manual task dates when a dependency link is added or changed.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource"
           taskMode="Manual"
           validateManualTasksOnLinking="true"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> `validateManualTasksOnLinking` applies predecessor validation only — all other scheduling factors (holidays, weekends, working time) are still ignored in manual mode.

---

## Custom Scheduling (Mixed Mode)

When `taskMode="Custom"`, each task's scheduling mode is read from a boolean data field. Tasks where the mapped field is `true` are treated as manually scheduled; tasks where it is `false` (or absent) are automatically scheduled.

Map the boolean field using `taskFields.manual`:

```cshtml
<ejs-gantt id='Resources' dataSource="ViewBag.dataSource"
           treeColumnIndex="1" height="450px" allowSelection="true" highlightWeekends="true"
           projectStartDate="02/20/2017" projectEndDate="03/30/2019" taskMode="Custom"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" manual="IsManual"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" visible="false" width="100"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="200"></e-gantt-column>
        <e-gantt-column field="IsManual" headerText="Task Mode" width="100"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

**Data model:**
```csharp
public class GanttDataModel
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public int Progress { get; set; }
    public bool IsManual { get; set; }   // true = Manual, false = Auto
    public string Predecessor { get; set; }
    public List<GanttDataModel> SubTasks { get; set; }
}
```

> The `manual` field in `taskFields` must map to a **boolean** property in the data model. A `Task Mode` column can be shown in the grid to let users toggle a task's mode interactively.

---

## Unscheduled Tasks

Unscheduled tasks are tasks that are missing one or more of `StartDate`, `EndDate`, or `Duration`. Enable them with `allowUnscheduledTasks="true"`.

```cshtml
<ejs-gantt id='Unscheduled' dataSource="ViewBag.dataSource" height="450px"
           projectStartDate="01/01/2019" projectEndDate="01/20/2019"
           allowUnscheduledTasks="true"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration">
    </e-gantt-taskfields>
    <e-gantt-editSettings allowAdding="true" allowEditing="true"></e-gantt-editSettings>
</ejs-gantt>
```

**Rendering behaviour by available data:**

| Available Fields | Auto Mode | Manual Mode |
|---|---|---|
| Start Date only | Half taskbar from start date | Half taskbar from start date |
| End Date only | Half taskbar ending at end date | Half taskbar ending at end date |
| Duration only | Taskbar at project start for given duration | Taskbar at project start for given duration |
| No dates or duration | Milestone at project start | Milestone at project start |
| Start + End | Full taskbar | Full taskbar |

> A **milestone** is a task with no start/end date and a duration of zero. When `allowUnscheduledTasks="false"` (default), Gantt auto-calculates missing dates using a default duration of `1` and the project start date.

---

## Working Time Range

Define the working hours for each day in the project using `<e-gantt-dayworkingtimecollection>`. Automatic date scheduling and duration calculations respect these time boundaries.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" progress="Progress" duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineUnitSize="60">
        <e-timelinesettings-toptier unit="Day" format="MMM dd, y"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Hour" format="h.mm a"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
    <e-gantt-dayworkingtimecollection>
        <e-gantt-dayworkingtime from="9" to="18"></e-gantt-dayworkingtime>
    </e-gantt-dayworkingtimecollection>
</ejs-gantt>
```

> - The default working time range is `8–12` and `13–17` (split-day with a lunch break).
> - Multiple `<e-gantt-dayworkingtime>` entries can be added to model a split-day working pattern.
> - Individual tasks can span any time within the defined range; they are not pinned to specific hours.

---

## Week-Specific Working Time

Use `<e-gantt-weekworkingtimes>` to assign different working hours to specific days of the week. This overrides the global `dayWorkingTime` for those days.

```cshtml
@{
    List<GanttDayWorkingTime> timeRanges = new List<GanttDayWorkingTime>();
    GanttDayWorkingTime timeRange1 = new GanttDayWorkingTime()
    {
        From = 10,
        To = 18
    };
    timeRanges.Add(timeRange1);
}

<ejs-gantt id='WorkingTimeRange' dataSource="ViewBag.dataSource" height="450px" highlightWeekends="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-splitterSettings columnIndex="0"></e-gantt-splitterSettings>
    <e-gantt-weekworkingtimes>
        <e-gantt-weekworkingtime dayOfWeek="Tuesday" timeRange="timeRanges">
        </e-gantt-weekworkingtime>
    </e-gantt-weekworkingtimes>
    <e-gantt-timelineSettings>
        <e-timelinesettings-toptier unit="Day"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Hour"></e-timelinesettings-bottomtier>
    </e-gantt-timelineSettings>
    <e-gantt-labelSettings leftLabel="TaskName"></e-gantt-labelSettings>
</ejs-gantt>
```

**`<e-gantt-weekworkingtime>` attributes:**

| Attribute | Description |
|---|---|
| `dayOfWeek` | The day name (`Monday`, `Tuesday`, …, `Sunday`) to apply the custom time range to |
| `timeRange` | A `List<GanttDayWorkingTime>` with `From` and `To` hours for that day |

**Priority and fallback rules:**
- When both `dayWorkingTime` and `weekWorkingTime` are configured, `weekWorkingTime` takes priority for the specified days.
- Days not listed in `weekWorkingTime` use the global `dayWorkingTime` values.
- If a day is both a holiday/non-working day and listed in `weekWorkingTime`, it remains a non-working day.

---

## Weekend and Non-Working Days

Define which days of the week are working days using `workWeek`. Days not listed are treated as non-working.

```cshtml
<ejs-gantt id='WorkWeek' dataSource="ViewBag.dataSource" height="450px"
           highlightWeekends="true" workWeek="ViewBag.workWeek">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**Controller — define working days:**
```csharp
ViewBag.workWeek = new string[] { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" };
```

> By default, Saturday and Sunday are non-working days. Automatic scheduling skips non-working days when calculating task end dates.

---

## Include Weekend as Working Day

To treat weekends as regular working days, set `includeWeekend="true"`:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           includeWeekend="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> To show or hide weekends in the timeline (without affecting scheduling), use `timelineSettings.showWeekend`.

---

## Duration Units — Global Project Setting

Set a uniform duration unit for all tasks in the project using `durationUnit` on the root `<ejs-gantt>`.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" durationUnit="Hour">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**`durationUnit` values:**

| Value | Description |
|---|---|
| `Day` (default) | Duration expressed in calendar days |
| `Hour` | Duration expressed in hours (respects `dayWorkingTime`) |
| `Minute` | Duration expressed in minutes |
| `Week` | Duration expressed in weeks (calculated as `weeks × daysPerWeek × hoursPerDay`) |
| `Month` | Duration expressed in months (calculated as `months × daysPerMonth × hoursPerDay`) |

### Week Duration Unit

The `Week` duration unit allows tasks to be scheduled in weeks. A week is calculated based on the `daysPerWeek` property.

**Example: Task with 2-week duration**
```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" 
           durationUnit="Week" daysPerWeek="5">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**Data:**
```csharp
// Duration = 2 (weeks)
// With daysPerWeek=5 and hoursPerDay=8:
// Actual duration = 2 weeks × 5 days/week × 8 hours/day = 80 working hours
```

### Month Duration Unit

The `Month` duration unit allows tasks to be scheduled in months. A month is calculated based on the `daysPerMonth` property.

**Example: Task with 1-month duration**
```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" 
           durationUnit="Month" daysPerMonth="20">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**Data:**
```csharp
// Duration = 1 (month)
// With daysPerMonth=20 and hoursPerDay=8:
// Actual duration = 1 month × 20 days/month × 8 hours/day = 160 working hours
```

### daysPerWeek and daysPerMonth Configuration

Configure the number of days per week and per month for week/month duration calculations.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           durationUnit="Week" daysPerWeek="6" daysPerMonth="25">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**Properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `daysPerWeek` | int | 5 | Number of working days in a week for week duration calculation |
| `daysPerMonth` | int | 20 | Number of working days in a month for month duration calculation |

**Calculation:**
- Week duration = `duration × daysPerWeek × hoursPerDay` (in working hours)
- Month duration = `duration × daysPerMonth × hoursPerDay` (in working hours)

### Week/Month Duration Interaction with Calendars and Holidays

Week and month durations respect working time, holidays, and weekends:

```
Task: Start 04/08 (Mon), Duration 1 week, daysPerWeek=5, hoursPerDay=8
Result: 1 week × 5 days × 8 hours = 40 working hours

Calendar:
- Mon 04/08: 8 hrs
- Tue 04/09: 8 hrs
- Wed 04/10: Holiday (0 hrs)
- Thu 04/11: 8 hrs
- Fri 04/12: 8 hrs
- Sat 04/13: Weekend (0 hrs)
- Mon 04/15: 8 hrs

End Date: 04/15 (extends beyond the calendar week due to holiday)
```

> When `daysPerWeek` and `daysPerMonth` are configured with calendars (project or task calendars), the scheduler skips non-working days and holidays, potentially extending the calendar duration beyond the nominal period.

> When `durationUnit` is set globally, it applies to all tasks that do not have an individual duration unit defined.

---

## Duration Units — Per-Task Field Mapping

Map a data field that holds each task's duration unit using `taskFields.durationUnit`. This allows individual tasks to use different units.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" durationUnit="DurationUnit"
                        progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**Data model:**
```csharp
public class GanttDataModel
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public string DurationUnit { get; set; }  // "day", "hour", "minute", "week", or "month"
    public int Progress { get; set; }
    public List<GanttDataModel> SubTasks { get; set; }
}
```

> The `DurationUnit` field accepts string values: `"day"`, `"hour"`, `"minute"`, `"week"`, or `"month"` (lowercase).

**Per-task week/month example:**
```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" daysPerWeek="5" daysPerMonth="20">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" durationUnit="DurationUnit"
                        progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

With data:
```csharp
new GanttDataModel { TaskId = 1, Duration = 2, DurationUnit = "week" },   // 2 weeks
new GanttDataModel { TaskId = 2, Duration = 1, DurationUnit = "month" },  // 1 month
new GanttDataModel { TaskId = 3, Duration = 5, DurationUnit = "day" }     // 5 days
```

---

## Duration Units — Inline with Duration Value

Duration unit can also be embedded directly in the duration string value in the data source without a separate `DurationUnit` field.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

**Data with inline units:**
```csharp
new GanttDataModel { TaskId = 1, TaskName = "Planning",      Duration = "5 days"    },
new GanttDataModel { TaskId = 2, TaskName = "Development",   Duration = "40 hours"  },
new GanttDataModel { TaskId = 3, TaskName = "Code Review",   Duration = "120 minutes" },
```

> The duration column's edit type is `string` to support editing duration values with embedded unit suffixes.

---

## Task Constraints — Overview

Task constraints define scheduling rules that restrict when a task is allowed to start or finish. They enforce project logic, align tasks with fixed deadlines, and prevent resource conflicts.

| Constraint Type | Value | Description | Example Use Case |
|---|---|---|---|
| As Soon As Possible | `ASAP` | Starts as soon as its dependencies allow | Begin development immediately after design approval |
| As Late As Possible | `ALAP` | Delays until the last possible moment without affecting successors | Apply UI polish just before release |
| Must Start On | `MSO` | Must begin on an exact date | Partner integration begins July 1 per contract |
| Must Finish On | `MFO` | Must end on an exact date | Submit compliance documents by March 31 |
| Start No Earlier Than | `SNET` | Cannot start before the constraint date | Campaign cannot begin until regulatory approval |
| Start No Later Than | `SNLT` | Must start on or before the constraint date | Financial review must begin by September 1 |
| Finish No Earlier Than | `FNET` | Cannot finish before the constraint date | Training cannot end before all participants complete onboarding |
| Finish No Later Than | `FNLT` | Must finish on or before the constraint date | QA testing must be done by July 25 |

---

## Task Constraints — Configuration

Map constraint fields in `<e-gantt-taskfields>` using `constraintType` and `constraintDate`:

```cshtml
<ejs-gantt id="Constraint" dataSource="@GanttData.ConstraintData()" gridLines="Both"
           treeColumnIndex="1" height="450px" allowSelection="true" highlightWeekends="true"
           projectStartDate="03/25/2025" projectEndDate="09/01/2025"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll", "Indent", "Outdent" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate"
                        duration="Duration" progress="Progress" dependency="Predecessor"
                        parentid="ParentID" notes="info"
                        constraintType="ConstraintType" constraintDate="ConstraintDate">
    </e-gantt-taskfields>
    <e-gantt-eventmarkers>
        <e-gantt-eventmarker day="03/25/2025" label="Project StartDate"></e-gantt-eventmarker>
        <e-gantt-eventmarker day="08/31/2025" label="Project EndDate"></e-gantt-eventmarker>
    </e-gantt-eventmarkers>
    <e-gantt-splittersettings ColumnIndex="4"></e-gantt-splittersettings>
    <e-gantt-timelinesettings>
        <e-timelinesettings-toptier unit="Week" format="MMM dd, y"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Day" count="1"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-tooltipsettings showTooltip="true"></e-gantt-tooltipsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskID" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Job Name" width="200" clipMode="EllipsisWithTooltip"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="ConstraintType" width="180"></e-gantt-column>
        <e-gantt-column field="ConstraintDate"></e-gantt-column>
        <e-gantt-column field="EndDate"></e-gantt-column>
        <e-gantt-column field="Predecessor"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelsettings leftLabel="TaskName" rightLabel="#rightLabel"></e-gantt-labelsettings>
</ejs-gantt>
```

**Data model:**
```csharp
public class ConstraintData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public int Progress { get; set; }
    public string Predecessor { get; set; }
    public int? ParentID { get; set; }
    public string ConstraintType { get; set; }   // e.g., "MSO", "FNLT", "SNET"
    public DateTime? ConstraintDate { get; set; }
    public string info { get; set; }
}
```

> `ConstraintType` accepts the string codes: `ASAP`, `ALAP`, `MSO`, `MFO`, `SNET`, `SNLT`, `FNET`, `FNLT`. `ConstraintDate` is required for all constraint types except `ASAP` and `ALAP`.

---

## Task Constraints — Conflict Management

When a scheduling change violates a strict constraint (`MSO`, `MFO`, `SNLT`, `FNLT`), the Gantt shows a violation popup. Use the `actionBegin` event to intercept violations and handle them silently.

**Supported `validateMode` flags (set when `requestType === "validateTaskViolation"`):**

| Flag | Constraint enforced silently |
|---|---|
| `respectMustStartOn` | Must Start On (MSO) |
| `respectMustFinishOn` | Must Finish On (MFO) |
| `respectStartNoLaterThan` | Start No Later Than (SNLT) |
| `respectFinishNoLaterThan` | Finish No Later Than (FNLT) |

> All flags default to `false` (popup shown). Set a flag to `true` to silently cancel the violating user action without displaying a dialog.

```cshtml
<ejs-gantt id="Constraint" dataSource="@GanttData.ConstraintData()" gridLines="Both"
           actionBegin="actionBegin" treeColumnIndex="1" height="450px"
           allowSelection="true" highlightWeekends="true"
           projectStartDate="03/25/2025" projectEndDate="09/01/2025"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll", "Indent", "Outdent" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate"
                        duration="Duration" progress="Progress" dependency="Predecessor"
                        parentid="ParentID" notes="info"
                        constraintType="ConstraintType" constraintDate="ConstraintDate">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskID" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Job Name" width="200" clipMode="EllipsisWithTooltip"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="ConstraintType" width="180"></e-gantt-column>
        <e-gantt-column field="ConstraintDate"></e-gantt-column>
        <e-gantt-column field="EndDate"></e-gantt-column>
        <e-gantt-column field="Predecessor"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-labelsettings leftLabel="TaskName" rightLabel="#rightLabel"></e-gantt-labelsettings>
</ejs-gantt>

<script>
    function actionBegin(args) {
        if (args.requestType === 'validateTaskViolation') {
            args.validateMode.respectMustStartOn = true;
        }
    }
</script>
```

````