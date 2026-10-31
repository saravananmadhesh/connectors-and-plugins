# Taskbar Draw — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Taskbar Draw](#enable-taskbar-draw)
- [Taskbar Draw Behavior](#taskbar-draw-behavior)
- [Scheduling Output](#scheduling-output)
- [Task Type Scenarios](#task-type-scenarios)
- [Interaction with Calendar Settings](#interaction-with-calendar-settings)
- [Task Dependencies](#task-dependencies)
- [Task Editing Context](#task-editing-context)
- [Best Practices](#best-practices)

---

## Overview

Taskbar draw allows users to create or schedule an unscheduled task by dragging directly on the timeline. When enabled, users can draw across the timeline to define a task's start and end dates automatically. This feature is particularly useful for quickly scheduling unscheduled tasks or adjusting timeline ranges visually.

**Key Benefits:**
- ✅ Visual task scheduling without manual date entry
- ✅ Automatic date and duration calculation
- ✅ Integration with working time and calendars
- ✅ Support for all task types (unscheduled, partial, parent, milestone, manual)
- ✅ Respects predecessor constraints and working hours
- ✅ Intuitive user experience for project managers

---

## Enable Taskbar Draw

Enable taskbar drawing in `<e-gantt-editsettings>` by setting `allowTaskbarDraw="true"`. This requires the `Edit` module to be injected and typically works alongside `allowTaskbarEditing="true"` and `allowUnscheduledTasks="true"`.

### Basic Configuration

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px"
           allowUnscheduledTasks="true"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" allowTaskbarDraw="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

### Required Properties

| Property | Required | Purpose |
|----------|----------|---------|
| `allowTaskbarDraw` | ✅ Yes | Enable taskbar drawing on timeline |
| `allowTaskbarEditing` | ✅ Yes | Enable taskbar manipulation (editing, drawing) |
| `allowUnscheduledTasks` | ✅ Yes | Display unscheduled task rows for drawing |
| `allowEditing` | ✅ Yes | Enable edit mode for the Gantt chart |

### Optional Properties

| Property | Default | Purpose |
|----------|---------|---------|
| `editMode` | "Auto" | Edit mode type; drawing works with all modes |
| `toolbar` | (none) | Include "Add", "Edit", "Delete" buttons alongside drawing |
| `saveButton` | (default) | Commit changes after drawing |

---

## Taskbar Draw Behavior

When taskbar drawing is enabled, the following interaction occurs:

### User Workflow

```
1. Select an unscheduled task row (or click on an existing taskbar for editing)
2. Position cursor on the timeline where the task should start
3. Click and drag to the right to define the task duration
4. Release to commit
5. Task dates and duration are automatically calculated
```

### Interaction Sequence

1. **Target Task:** Click or hover over an unscheduled (or partially scheduled) task row
2. **Drag on Timeline:** Click and drag horizontally on the timeline to define the task span
3. **Drag Start:** The left boundary of the drawn range becomes the task start
4. **Drag End:** The right boundary of the drawn range becomes the task end
5. **Release:** Releasing the mouse commits the drawn range and updates the task

### Visual Feedback

During drawing, the Gantt component provides visual feedback:
- **Cursor Change:** Cursor changes to indicate drawing mode availability
- **Highlight:** The task row may be highlighted to show it's in drawing mode
- **Timeline Preview:** A semi-transparent bar shows the drawn range in real-time
- **Dimension Display:** Starting/ending time may be displayed in tooltips

---

## Scheduling Output

When a taskbar is drawn, the component calculates or updates the following fields:

| Field | Behavior |
|---|---|
| `StartDate` | Set from the left boundary of the drawn range |
| `EndDate` | Set from the right boundary of the drawn range |
| `Duration` | Calculated from the span, respecting `durationUnit` and working time |

### Fully Unscheduled Task

**Before drawing:**
```csharp
new GanttTask 
{ 
    TaskId = 1, 
    TaskName = "New Task", 
    Duration = null, 
    StartDate = null, 
    EndDate = null 
}
```

**After drawing (Monday to Friday):**
```csharp
new GanttTask 
{ 
    TaskId = 1, 
    TaskName = "New Task", 
    StartDate = new DateTime(2026, 10, 5),  // Monday
    EndDate = new DateTime(2026, 10, 9),    // Friday
    Duration = 5                            // Calculated
}
```

### Partially Scheduled Task

**Before drawing (has duration, missing dates):**
```csharp
new GanttTask 
{ 
    TaskId = 2, 
    TaskName = "Task with Duration", 
    Duration = 3, 
    StartDate = null, 
    EndDate = null 
}
```

**After drawing:**
```csharp
new GanttTask 
{ 
    TaskId = 2, 
    TaskName = "Task with Duration", 
    StartDate = new DateTime(2026, 10, 5),    // Populated
    EndDate = new DateTime(2026, 10, 7),      // Populated
    Duration = 3                              // May be recalculated based on span
}
```

---

## Task Type Scenarios

### Unscheduled Tasks (Full Scheduling)

When a task has no dates or duration, drawing creates a complete schedule:

```
Before: TaskId=1, Duration=null, StartDate=null, EndDate=null
Draw:   Drag from Monday to Friday on timeline
After:  StartDate=Monday, EndDate=Friday, Duration=5 (calculated)
```

**Behavior:**
- All three fields (StartDate, EndDate, Duration) are calculated from the drawn span
- Duration respects working time and holidays
- Task moves from "Unscheduled" status to "Scheduled"

---

### Partially Scheduled Tasks

When a task has some scheduling information, drawing fills the missing values:

```
Before: TaskId=2, Duration=5, StartDate=null, EndDate=null
Draw:   Drag on timeline
After:  StartDate and EndDate populated; Duration may be recalculated
```

**Behavior:**
- If task has Duration but no dates, drawing sets the dates and may recalculate Duration based on the drawn span
- If task has StartDate but no EndDate, drawing sets EndDate and Duration
- Partially scheduled tasks are shown in the chart (visible row)

---

### Parent Tasks

Parent task dates are calculated from child tasks and cannot be directly drawn.

**Behavior:**
- Taskbar draw is **disabled** for parent rows
- Parent row may show a summary of child tasks
- To schedule a parent, draw on child tasks; parent dates auto-update
- Parent start = earliest child start; parent end = latest child end

**Workaround:**
```cshtml
<!-- Draw on child tasks -->
<e-gantt-taskfields child="SubTasks">
</e-gantt-taskfields>

<!-- Parent taskbar reflects child scheduling -->
<!-- Parent StartDate = Min(child.StartDate) -->
<!-- Parent EndDate = Max(child.EndDate) -->
```

---

### Child Tasks

Taskbar draw works normally on child tasks.

**Behavior:**
- Draw on a child taskbar to set/modify its dates and duration
- Parent task dates are automatically updated to encompass all children
- Child task update triggers parent recalculation

**Example:**
```
Parent Task "Phase 1"
├─ Child 1: Draw Mon–Wed (auto-updates parent)
├─ Child 2: Existing Wed–Fri
└─ Parent: Auto-updates to Mon–Fri
```

---

### Milestone Tasks

A milestone is a task with duration of zero.

**Behavior with taskbar draw:**
- Drawing on a milestone extends its duration from zero to the drawn span
- If you need the task to remain a milestone after drawing, manually set `Duration = 0` after drawing
- Milestone start = milestone end (single point in time)

**Example:**
```
Before Draw: TaskId=5, TaskName="Project Start", Duration=0, StartDate=null
Draw:        Click on timeline at Oct 5
After Draw:  StartDate=Oct 5, EndDate=Oct 5, Duration=0 (or click+release = point-in-time milestone)
```

---

### Manually Scheduled Tasks

When `taskMode="Manual"`, taskbar drawing still applies.

**Behavior:**
- The drawn dates are accepted without validation against predecessors or scheduling constraints
- Task moves to "Manual" mode after drawing
- Holidays and weekends are typically ignored for manual tasks

**With `validateManualTasksOnLinking="true"`:**
- Drawing respects predecessor constraints
- Other scheduling factors (holidays, weekends) are ignored

**Example:**
```csharp
new GanttTask 
{ 
    TaskId = 1, 
    TaskName = "Manual Task", 
    TaskMode = "Manual",
    StartDate = null, 
    EndDate = null 
}
// After drawing: dates set without constraint validation
```

---

## Interaction with Calendar Settings

Taskbar draw respects all calendar and working time settings. The drawn dates are adjusted based on:
- Project calendar working hours
- Task calendar (if assigned)
- Holidays and weekends
- Hours per day configuration

### Working Time

```
Project Settings:
  - Working Hours: 9 AM – 5 PM (8 hours/day)
  - Working Days: Mon–Fri

Draw: Across 2 calendar days
  - Start: 1 PM Monday (drag point on timeline)
  - End: 3 PM Tuesday (drag point on timeline)

Result:
  - StartDate: Monday, 1 PM
  - EndDate: Tuesday, 3 PM
  - Duration: 2 days (adjusted for working hours)
```

---

### Holidays

```
Project Settings:
  - Holiday: April 10 (Wednesday)
  - Working Days: Mon, Tue, (Wed=Holiday), Thu, Fri

Draw: Monday to Friday (spanning the holiday)

Result:
  - StartDate: Mon 04/08
  - EndDate: Fri 04/12
  - Duration: 4 days (Wednesday holiday excluded)
```

---

### Weekends

```
Project Settings:
  - Weekends: Sat, Sun (non-working)
  - Working Days: Mon–Fri

Draw: Friday 2 PM to Monday 10 AM

Result:
  - StartDate: Fri (2 PM)
  - EndDate: Mon (10 AM)
  - Duration: 1.5 days (Sat–Sun weekend skipped)
```

---

### Task Calendar (if assigned)

When a task is assigned a specific calendar, drawing uses that calendar's working time:

```
Project Calendar: Standard (9 AM – 5 PM, Mon–Fri)
Task Calendar: Evening Shift (6 PM – 2 AM, daily)

Gantt Settings:
  - taskFields.calendarId = "CalendarId"
  - Task.CalendarId = "EvningShift"

Draw: Using timeline based on task calendar

Result:
  - Duration and dates calculated within task calendar hours
  - StartDate/EndDate reflect timeline in evening shift
```

---

### Combined Scenario

```
Project: Mon–Fri, 9 AM–5 PM (8 hrs/day), hoursPerDay=8
Holiday: December 25 (non-working day)
Task Calendar: EventingShift (6 PM–2 AM, 8 hrs/night)

Task with Calendar ID="EvenigShift":
  Draw: Dec 23 to Dec 27 on timeline
  
Result:
  - StartDate: Dec 23, 6 PM
  - EndDate: Dec 27, 2 AM
  - Duration: Calculated excluding Dec 25 (holiday) and daytime hours
```

---

## Task Dependencies

Taskbar drawing does NOT automatically create or update predecessor links. However, if a task has existing predecessors, drawing respects the dependency constraints.

### Predecessor Constraints

```
Scenario:
  - Task 2: FS (Finish-to-Start) dependency on Task 1
  - Task 1: Ends on Friday
  - Task 2: Unscheduled

Draw: Task 2 taskbar from Monday to Wednesday
  
Result:
  - StartDate: Adjusted to Monday AFTER Task 1 finishes (constraint respected)
  - Drawing may auto-adjust if the drawn range violates the constraint
```

### Creating Dependencies

Taskbar draw focuses on scheduling dates. To create or manage dependencies:

**Use the dependency dialog:**
```cshtml
<!-- Enable dependency creation via dialog -->
<e-gantt-editsettings allowTaskbarEditing="true">
</e-gantt-editsettings>
<!-- Right-click > Add Predecessor, or use dialog to define dependencies -->
```

**Or use the toolbar:**
```cshtml
<ejs-gantt toolbar="@(new List<string>() { "Add", "Edit", "Delete" })">
</ejs-gantt>
```

**Programmatic dependency creation (in C#):**
```csharp
new GanttTask 
{ 
    TaskId = 3, 
    TaskName = "Task 3", 
    Predecessor = "2FS"  // Depends on Task 2 (Finish-to-Start)
}
```

---

## Task Editing Context

Taskbar draw can operate in two modes:

### Creation Mode

**Scenario:** Drawing on an unscheduled task row

**Behavior:**
- Creates the task schedule
- All date fields (StartDate, EndDate, Duration) are populated
- Task transitions from "Unscheduled" to "Scheduled"
- No existing data is overwritten

**Example:**
```csharp
Before: { TaskId = 1, TaskName = "New Task", StartDate = null, EndDate = null, Duration = null }
Draw:   Drag on timeline
After:  { TaskId = 1, TaskName = "New Task", StartDate = Oct 5, EndDate = Oct 9, Duration = 5 }
```

---

### Editing Mode

**Scenario:** Drawing on an already-scheduled taskbar (if `allowTaskbarEditing="true"`)

**Behavior:**
- Extends or modifies existing dates and duration
- Existing task data is updated
- Child tasks may be affected (if parent is modified)
- Predecessor constraints are re-evaluated

**Example:**
```csharp
Before: { TaskId = 1, TaskName = "Task", StartDate = Oct 5, EndDate = Oct 9, Duration = 5 }
Draw:   Drag taskbar to Oct 10–Oct 15
After:  { TaskId = 1, TaskName = "Task", StartDate = Oct 10, EndDate = Oct 15, Duration = 6 }
```

---

## Best Practices

### 1. Enable with Editing
Use `allowTaskbarDraw="true"` together with `allowTaskbarEditing="true"` for full interactive scheduling.

```cshtml
<e-gantt-editsettings allowEditing="true" 
                      allowTaskbarEditing="true" 
                      allowTaskbarDraw="true">
</e-gantt-editsettings>
```

### 2. Allow Unscheduled Tasks
Set `allowUnscheduledTasks="true"` so that partially scheduled rows can be displayed and drawn.

```cshtml
<ejs-gantt allowUnscheduledTasks="true">
</ejs-gantt>
```

### 3. Configure Working Time
Define `dayWorkingTime` or calendar settings so duration calculations are accurate.

```cshtml
<ejs-gantt dayWorkingTime="@(new List<object>() { 
    new { from = 9, to = 17 } 
})">
</ejs-gantt>
```

### 4. Test with Calendars
If using task or project calendars, test taskbar drawing to verify dates are calculated correctly.

```csharp
// Define project calendar with holidays
new GanttCalendar 
{ 
    Id = "ProjectCalendar",
    Name = "India",
    WorkingDayStart = 1,  // Monday
    WorkingDayEnd = 5     // Friday
    // Add holidays...
}
```

### 5. Provide Visual Feedback
Add tooltips or status messages to guide users on taskbar draw interaction.

```cshtml
<ejs-gantt tooltip="@(new { enabled = true })">
</ejs-gantt>
```

### 6. Combine with Other Tools
Consider using toolbar buttons (Add, Edit, Delete) alongside taskbar draw for flexible task creation.

```cshtml
<ejs-gantt toolbar="@(new List<string>() { 
    "Add", "Edit", "Update", "Delete", "Cancel", "Search" 
})">
</ejs-gantt>
```

### 7. Document Behavior
Inform users that taskbar drawing auto-calculates dates and durations based on project settings.

**User Guide Excerpt:**
```
To create or reschedule a task:
1. Locate the task row on the left panel
2. Click and drag horizontally on the timeline to define the task span
3. Release the mouse to save the schedule
4. Dates and duration are automatically calculated
5. Use the Edit dialog to adjust other task properties (name, priority, etc.)
```

### 8. Handle Dependencies Separately
Use the dependency dialog or context menu to manage predecessor relationships; taskbar draw focuses on scheduling.

```cshtml
<!-- Enable dependency editing via context menu or dialog -->
<e-gantt-editsettings allowTaskbarEditing="true">
</e-gantt-editsettings>

<!-- Users can:
     1. Draw taskbar to set dates
     2. Right-click > Add Predecessor to create dependencies
     3. Dependency dialog validates against drawn dates
-->
```

### 9. Performance Optimization
For large datasets (1000+ tasks):
- Enable virtualization to improve draw responsiveness
- Test draw operations with your expected data size
- Monitor memory usage during intensive drawing sessions

```cshtml
<ejs-gantt enableVirtualization="true">
</ejs-gantt>
```

### 10. Error Handling
Gracefully handle edge cases:
- **Invalid Ranges:** Prevent drawing end before start
- **Boundary Violations:** Ensure dates stay within project timeline
- **Constraint Violations:** Auto-adjust if predecessor constraints are breached
- **User Feedback:** Display validation messages and error states

---

## Troubleshooting

### Issue: Taskbar Draw Not Working

**Possible Causes:**
1. `allowTaskbarDraw="true"` not set in EditSettings
2. `allowTaskbarEditing="true"` not set
3. `allowUnscheduledTasks="true"` not set for unscheduled rows
4. Edit module not injected
5. Task has read-only permissions

**Solution:**
```cshtml
<e-gantt-editsettings allowEditing="true" 
                      allowTaskbarEditing="true" 
                      allowTaskbarDraw="true">
</e-gantt-editsettings>

<!-- Verify Edit module is injected -->
@Html.EJ2().Gantt("Gantt")
    .modules(new string[] { "Edit", "Toolbar", ... })
    .render()
```

### Issue: Drawn Dates Don't Respect Calendar

**Possible Cause:**
- Calendar settings not configured
- Task calendar not assigned
- Working time not defined

**Solution:**
```csharp
// Define calendar in controller
ViewBag.Calendars = new List<GanttCalendar> 
{ 
    new GanttCalendar { Id = "ProjectCalendar", Name = "Standard", ... }
};

// Assign to Gantt
<e-gantt-calendarsettings projectCalendar="ProjectCalendar">
</e-gantt-calendarsettings>
```

### Issue: Parent Task Can't Be Drawn

**Possible Cause:**
- Parent task rows inherit dates from child tasks
- Direct drawing on parent is disabled by design

**Solution:**
- Draw on child tasks to indirectly schedule parent
- Or use Edit dialog to manually set parent dates

```csharp
// Parent auto-updates when children are drawn
// Parent.StartDate = Min(children.StartDate)
// Parent.EndDate = Max(children.EndDate)
```

---

## Compatibility

| Feature | ASP.NET Core | Requirement |
|---------|--------------|-------------|
| **Taskbar Draw** | ✅ 3.0+ | Edit module + `allowTaskbarDraw="true"` |
| **With Calendars** | ✅ 3.0+ | Calendar settings configured |
| **With Unscheduled Tasks** | ✅ 3.0+ | `allowUnscheduledTasks="true"` |
| **Virtualization** | ✅ 3.0+ | `enableVirtualization="true"` |
| **With Dependencies** | ✅ 3.0+ | Dependency field configured |

---

## See Also

- [Taskbar Customization](taskbar.md) — General taskbar styling and templates
- [Task Scheduling](task-scheduling.md) — Duration units and working time
- [Calendar Settings](calendar-settings.md) — Project and task calendars
- [Task Dependencies](task-dependency.md) — Predecessor relationships
- [Editing](editing.md) — Edit modes and dialogs

---

*Last Updated: September 29, 2026*  
*EJ2 Gantt Chart - ASP.NET Core Documentation*
