# Calendar Settings — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Project Calendar](#project-calendar)
- [Task Calendars](#task-calendars)
- [Working Time Configuration](#working-time-configuration)
- [Holiday Configuration](#holiday-configuration)
- [Calendar Exceptions](#calendar-exceptions)
- [Task Calendar Assignment](#task-calendar-assignment)
- [Hours Per Day Configuration](#hours-per-day-configuration)
- [Calendar Behavior and Scheduling Impact](#calendar-behavior-and-scheduling-impact)
- [Supported Scenarios](#supported-scenarios)
- [Feature Limitations](#feature-limitations)
- [Best Practices](#best-practices)

---

## Overview

The Gantt Chart supports calendar-driven scheduling through the `calendarSettings` property. Calendar settings define working time blocks, holidays, and task-specific calendar rules that affect how durations are calculated and how tasks are scheduled.

Calendar configuration operates at two levels:

- **Project Calendar** — the default calendar applied to the entire project globally
- **Task Calendars** — custom calendars assigned to specific tasks (task-specific scheduling)

Calendar settings affect:

- Task start and end date calculation
- Duration conversion between hours and days
- Dependency-based scheduling and offset calculations
- Weekend and holiday handling (when combined with `workWeek` and `includeWeekend` properties)
- Working time rules for project and task scopes
- How display duration in days relates to actual working hours via `hoursPerDay`

### When to Use Calendar Settings

- **Project Calendar**: Configure standard working hours, breaks, and holidays for the entire project
- **Task Calendars**: Define custom calendars for specific teams, shifts, external vendors, or region-specific working patterns
- **Calendar Exceptions**: Override normal working rules for special dates like extended work days or partial holidays

---

## Project Calendar

The `calendarSettings.projectCalendar` property defines the default working calendar for the project. Tasks that do not specify a task calendar use this calendar.

### Project Calendar Structure

```cshtml
@{
    var calendarSettings = new
    {
        projectCalendar = new
        {
            workingTime = new object[]
            {
                new { from = 8, to = 12 },
                new { from = 13, to = 17 }
            },
            holidays = new object[]
            {
                new { from = "07/06/2026", to = "07/06/2026", label = "Company Foundation Day" }
            },
            exceptions = new object[]
            {
                new { from = "07/05/2026", to = "07/05/2026", label = "Extended Work Day" }
            }
        },
        taskCalendars = new object[] { }
    };
}

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px"
           projectStartDate="07/01/2026" projectEndDate="08/31/2026"
           calendarSettings="calendarSettings">
</ejs-gantt>
```

### Project Calendar Configuration Properties

| Property | Type | Description |
|---|---|---|
| `workingTime` | `object[]` | Working time blocks with `from` and `to` hour values. |
| `holidays` | `object[]` | Holiday date ranges with `from`, `to`, and `label` properties. |
| `exceptions` | `object[]` | Special date ranges with `from`, `to`, and `label` properties. |

### Project Calendar Behavior

- Defines the default working time blocks for all tasks
- Applies when a task does not have an assigned task calendar via `calendarId`
- Works together with global Gantt settings such as `workWeek` (defines working days) and `includeWeekend`
- Holiday dates are treated as non-working days for all tasks using this calendar
- Calendar exceptions override the default working time for specific dates

---

## Task Calendars

Task calendars enable different tasks to follow different working rules than the project calendar. This is useful for:

- **Split-Shift Teams**: Teams working different hours (e.g., morning shift, evening shift)
- **Region-Specific Patterns**: Different working hours per geographic location
- **External Vendors**: Third-party contractors with independent calendars
- **Resource-Specific Calendars**: Different working rules per resource or department

### Task Calendar Definition

Define task calendars in the `calendarSettings.taskCalendar` collection:

```cshtml
@{
    var calendarSettings = new
    {
        projectCalendar = new
        {
            workingTime = new object[]
            {
                new { from = 8, to = 17 }
            }
        },
        taskCalendars = new object[]
        {
            new
            {
                calendarId = "Steering-committee",
                holidays = new object[]
                {
                    new { from = "07/07/2026", to = "07/07/2026", label = "SC Strategy Day" }
                },
                exceptions = new object[]
                {
                    new { from = "07/05/2026", to = "07/05/2026", label = "Compensatory Working" }
                }
            },
            new
            {
                calendarId = "Tech-review",
                holidays = new object[]
                {
                    new { from = "07/16/2026", to = "07/17/2026", label = "Architecture Review Freeze" }
                },
                exceptions = new object[]
                {
                    new { from = "07/26/2026", to = "07/26/2026", label = "Extra Review Slot" }
                }
            }
        }
    };
}

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           calendarSettings="calendarSettings">
</ejs-gantt>
```

### Assigning Task Calendars

Map a `calendarId` field in your data source. Tasks with a matching `calendarId` will use that calendar:

**Data Source:**
```csharp
public class GanttData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; }
    public int Progress { get; set; }
    public string CalendarId { get; set; }  // References task calendar ID
    public List<GanttData> SubTasks { get; set; }
}
```

**Data Example:**
```csharp
var data = new List<GanttData>
{
    new GanttData { TaskId = 1, TaskName = "Steering Committee Task", Duration = 5, CalendarId = "Steering-committee" },
    new GanttData { TaskId = 2, TaskName = "Technical Review Task", Duration = 5, CalendarId = "Tech-review" },
    new GanttData { TaskId = 3, TaskName = "Standard Task", Duration = 5, CalendarId = null } // Uses project calendar
};
```

**Tag Helper Configuration:**
```cshtml
<e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                    endDate="EndDate" duration="Duration" progress="Progress"
                    calendarId="CalendarId" child="SubTasks">
</e-gantt-taskfields>
```

---

## Working Time Configuration

Working time defines the hours during which tasks are scheduled. Configure working hours at both project and task calendar levels.

### Single Continuous Working Time Block

```csharp
var calendarSettings = new
{
    projectCalendar = new
    {
        workingTime = new object[]
        {
            new { from = 9, to = 17 }
        }
    }
};
```

This configures a single working block from 9 AM to 5 PM.

### Multiple Working Time Blocks (Split Shifts)

```csharp
var calendarSettings = new
{
    projectCalendar = new
    {
        workingTime = new object[]
        {
            new { from = 9, to = 12 },
            new { from = 13, to = 17 }
        }
    }
};
```

This defines a workday with a lunch break: 9 AM–12 PM and 1 PM–5 PM.

### Working Time Properties

| Property | Type | Description |
|---|---|---|
| `from` | number | Start hour (0–23, 24-hour format) |
| `to` | number | End hour (0–23, 24-hour format) |

> **Note**: Hours are specified in 24-hour format (0–23). For 2 PM, use `14`.

---

## Holiday Configuration

Holidays are non-working dates that exclude time from task calculations. Define holidays in both project and task calendars.

### Project Holidays

```csharp
var calendarSettings = new
{
    projectCalendar = new
    {
        holidays = new object[]
        {
            new { from = "04/10/2024", to = "04/10/2024", label = "Company Holiday" },
            new { from = "04/17/2024", to = "04/17/2024", label = "Regional Holiday" },
            new { from = "05/01/2024", to = "05/01/2024", label = "Public Holiday" }
        }
    }
};
```

### Task Calendar Holidays

```csharp
var calendarSettings = new
{
    taskCalendars = new object[]
    {
        new
        {
            calendarId = "Team_A",
            holidays = new object[]
            {
                new { from = "04/15/2024", to = "04/15/2024", label = "Team Holiday" },
                new { from = "06/20/2024", to = "06/20/2024", label = "Regional Holiday" }
            }
        }
    }
};
```

### Holiday Behavior

- Dates marked as holidays are completely skipped during scheduling
- A task scheduled across a holiday will auto-extend its end date to account for the non-working day
- Holidays in task calendars override project calendar holidays for that task
- Useful for team-specific, regional, or religious holidays

---

## Calendar Exceptions

Calendar exceptions allow overriding normal working rules for specific dates. Use exceptions for:

- **Extended Work Days**: Special dates requiring longer working hours
- **Partial Holidays**: Dates with reduced working hours
- **Custom Non-Working Days**: Dates outside the standard holiday list that should not be worked

### Exception Configuration Structure

```cshtml
@{
    var calendarSettings = new
    {
        projectCalendar = new
        {
            exceptions = new object[]
            {
                new { from = "04/20/2024", to = "04/20/2024", label = "Extended Work Day" },
                new { from = "04/25/2024", to = "04/25/2024", label = "Additional Non-Working Day" }
            }
        }
    };
}

<ejs-gantt id="Gantt" calendarSettings="calendarSettings"></ejs-gantt>
```

### Exception Properties

| Property | Type | Description |
|---|---|---|
| `date` | string | Date to override (format: `"MM/dd/yyyy"`) |
| `isWorking` | bool | `true` = working day; `false` = non-working day |
| `workingTime` | `DayWorkingTimeModel[]` | Optional custom working hours for this date |

### Exception Examples

**Extended Work Day:**
```csharp
exceptions = new object[]
{
    new { from = "04/20/2024", to = "04/20/2024", label = "Extended Work Day" }
}
```
Use a descriptive label to identify the special date range.

**Make a Weekend Day a Working Day:**
```csharp
exceptions = new object[]
{
    new { from = "04/21/2024", to = "04/21/2024", label = "Weekend Working Day" }
}
```
The exception date range identifies the weekend date with a special calendar rule.

**Declare an Extra Holiday:**
```csharp
exceptions = new object[]
{
    new { from = "04/25/2024", to = "04/25/2024", label = "Additional Non-Working Day" }
}
```
Use a label that explains the purpose of the exception.

---

## Task Calendar Assignment

After defining task calendars, assign them to tasks using the `calendarId` field.

### Complete Example: Assigning Task Calendars

**Controller:**
```csharp
public ActionResult Index()
{
    var data = new List<GanttData>
    {
        new GanttData
        {
            TaskId = 1,
            TaskName = "Planning",
            StartDate = new DateTime(2024, 4, 2),
            Duration = 2,
            Progress = 100,
            CalendarId = null  // Uses project calendar
        },
        new GanttData
        {
            TaskId = 2,
            TaskName = "Steering Committee Review",
            StartDate = new DateTime(2024, 4, 4),
            Duration = 5,
            Progress = 50,
            CalendarId = "Steering-committee"  // Uses the steering committee calendar
        },
        new GanttData
        {
            TaskId = 3,
            TaskName = "Technical Review",
            StartDate = new DateTime(2024, 4, 9),
            Duration = 3,
            Progress = 0,
            CalendarId = "Tech-review"  // Uses the technical review calendar
        }
    };

    ViewBag.DataSource = data;
    return View();
}
```

**View (CSHTML):**
```cshtml
@{
    var calendarSettings = new
    {
        projectCalendar = new
        {
            workingTime = new object[]
            {
                new { from = 8, to = 12 },
                new { from = 13, to = 17 }
            },
            holidays = new object[]
            {
                new { from = "07/06/2026", to = "07/06/2026", label = "Company Foundation Day" }
            },
            exceptions = new object[]
            {
                new { from = "07/05/2026", to = "07/05/2026", label = "Extended Work Day" }
            }
        },
        taskCalendars = new object[]
        {
            new
            {
                calendarId = "Steering-committee",
                holidays = new object[]
                {
                    new { from = "07/07/2026", to = "07/07/2026", label = "SC Strategy Day" },
                    new { from = "07/22/2026", to = "07/22/2026", label = "Board Offsite" }
                },
                exceptions = new object[]
                {
                    new { from = "07/05/2026", to = "07/05/2026", label = "Compensatory Working" },
                    new { from = "07/19/2026", to = "07/19/2026", label = "Compensatory Working" }
                }
            },
            new
            {
                calendarId = "Tech-review",
                holidays = new object[]
                {
                    new { from = "07/16/2026", to = "07/17/2026", label = "Architecture Review Freeze" }
                },
                exceptions = new object[]
                {
                    new { from = "07/26/2026", to = "07/26/2026", label = "Extra Review Slot" }
                }
            },
            new
            {
                calendarId = "Compliance-audit",
                holidays = new object[]
                {
                    new { from = "07/09/2026", to = "07/10/2026", label = "Compliance Blackout" }
                },
                exceptions = new object[]
                {
                    new { from = "07/25/2026", to = "07/25/2026", label = "Mandatory Audit Working Day" }
                }
            }
        }
    };
}

<ejs-gantt id="TaskCalendarGantt"
           dataSource="@GanttData.TaskCalendarData()"
           allowSorting="true"
           allowSelection="true"
           highlightWeekends="true"
           gridLines="Both"
           showColumnMenu="false"
           treeColumnIndex="1"
           rowHeight="46"
           taskbarHeight="25"
           height="550px"
           projectStartDate="07/01/2026"
           projectEndDate="08/31/2026"
           hoursPerDay="8"
           calendarSettings="calendarSettings"
           toolbar="toolbarItems">
</ejs-gantt>
```

---

## Hours Per Day Configuration

The `hoursPerDay` property defines the number of working hours that equal one display day. This affects how duration values in days are converted to actual working hours during scheduling.

### Configuration

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px"
           hoursPerDay="8"
           projectStartDate="04/02/2024" projectEndDate="05/15/2024">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

### Default and Impact

| Value | Meaning |
|---|---|
| `8` (default) | 1 day = 8 working hours |
| `6` | 1 day = 6 working hours |
| `10` | 1 day = 10 working hours |

### How hoursPerDay Affects Scheduling

- A task with `Duration = 5` (days) and `hoursPerDay = 8` requires 40 working hours
- If the working day is split (9–12, 13–17), each day has 7 hours, so the task takes 6 calendar days
- Works in conjunction with working time blocks, weekends, and holidays

---

## Calendar Behavior and Scheduling Impact

### Calendar Selection Priority

When scheduling a task:

1. **If task has a `calendarId`** → use that task calendar
2. **If no `calendarId`** → use the project calendar
3. **If no calendar configured** → use global Gantt settings (`workWeek`, `includeWeekend`, `dayWorkingTime`)

### Duration Calculation Examples

**Example 1: Project Calendar with Lunch Break**

Project Calendar: 9 AM–12 PM, 1 PM–5 PM (7 hours/day)

```
Task: 5 days duration
Calendar: Project Calendar
Result: 5 days × 7 hours = 35 working hours
Actual calendar days: Depends on weekends and holidays
```

**Example 2: Task Calendar Override**

Project Calendar: 9 AM–5 PM (8 hours/day)
Task Calendar (id="Tech-review"): Architecture Review Freeze, July 16–17

```
Task: Scheduled with CalendarId="Tech-review"
Result: The task uses the Tech-review calendar's date-specific rules
```

**Example 3: Holiday Impact**

Project Calendar holidays: 04/10, 04/17
hoursPerDay: 8

```
Task: Start 04/08 (Mon), Duration 5 days
Day 1 (04/08 Mon): 8 hours
Day 2 (04/09 Tue): 8 hours
Day 3 (04/10 Wed): Holiday (0 hours)
Day 4 (04/11 Thu): 8 hours
Day 5 (04/12 Fri): 8 hours
Day 6 (04/13 Sat): Weekend (0 hours)
Day 7 (04/15 Mon): 8 hours
End Date: 04/15
```

### Dependency Offset Calculation

Predecessor offsets respect calendar working time:

```csharp
// Predecessor: "2FS+1d" (Finish-to-Start with 1-day lag)
// If offset date falls on a holiday, it's automatically shifted to the next working day
```

---

## Supported Scenarios

### Scenario 1: Team-Specific Calendar Rules

Different teams can use separate calendar identifiers and date rules:

```csharp
var calendarSettings = new
{
    taskCalendars = new object[]
    {
        new
        {
            calendarId = "Day",
            holidays = new object[]
            {
                new { from = "07/07/2026", to = "07/07/2026", label = "Day Team Holiday" }
            }
        },
        new
        {
            calendarId = "Night",
            exceptions = new object[]
            {
                new { from = "07/11/2026", to = "07/11/2026", label = "Night Team Coverage" }
            }
        }
    }
};
```

### Scenario 2: Regional Holidays

Different holiday schedules per region:

```csharp
var calendarSettings = new
{
    taskCalendars = new object[]
    {
        new
        {
            calendarId = "India",
            holidays = new object[]
            {
                new { from = "04/14/2024", to = "04/14/2024", label = "Ambedkar Jayanti" }
            }
        },
        new
        {
            calendarId = "US",
            holidays = new object[]
            {
                new { from = "04/12/2024", to = "04/12/2024", label = "Regional Holiday" }
            }
        }
    }
};
```

### Scenario 3: Compressed Work Weeks

Configure the project's working hours and working days separately:

```csharp
var calendarSettings = new
{
    projectCalendar = new
    {
        workingTime = new object[]
        {
            new { from = 8, to = 18 }
        }
    }
};
```

Set the Gantt `workWeek` property to the desired four working days.

---

## Feature Limitations

1. **Calendar Not Applied to Parent Tasks**: Parent task dates are calculated from children; they do not use a task calendar directly.

2. **Task Calendar Must Be Defined First**: Assign `calendarId` only to values defined in `calendarSettings.taskCalendars`.

3. **Null calendarId Falls Back to Project Calendar**: Tasks without a `calendarId` use the project calendar.

4. **Task Calendars Define Date Rules**: Configure working hours in `projectCalendar.workingTime`; task calendars define calendar-specific holiday and exception ranges.

5. **Calendar Changes Not Retroactive**: Editing a calendar definition does not automatically recalculate existing task schedules. Refresh the Gantt to apply changes.

6. **Weekend Configuration**: Weekend handling is controlled by the global `workWeek` and `includeWeekend` properties, not per-calendar.

7. **Date Range Formatting**: Use the expected `MM/dd/yyyy` format for `from` and `to` values in holiday and exception ranges.

---

## Best Practices

1. **Define Calendars Early**: Configure all calendars before binding data.

2. **Use Meaningful Calendar IDs**: Use descriptive IDs like `"Steering-committee"` or `"Tech-review"`, not `"Cal1"`.

3. **Centralize Holiday Definitions**: Define common holidays in the project calendar; use task calendars for exceptions.

4. **Document Custom Calendars**: Comment on non-standard configurations (e.g., why night shift hours are 18–6).

5. **Validate Data Before Binding**: Ensure all `calendarId` values in data match defined task calendar IDs.

6. **Test Calendar Interactions**: Test dependencies, splits, and rescheduling with custom calendars before production.

7. **Use Exceptions Sparingly**: Reserve exceptions for genuine date-specific rules rather than regular calendar patterns.

8. **Monitor Performance**: Large numbers of calendar exceptions may impact performance; consolidate or optimize as needed.

---

## See Also

- [Task Scheduling](task-scheduling.md) — scheduling modes and duration units
- [Task Dependency](task-dependency.md) — how dependencies interact with calendars
- [Managing Tasks](managing-tasks.md) — editing and CRUD operations
