# Critical Path — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Critical Path](#enable-critical-path)
- [Customize Critical Path Taskbar](#customize-critical-path-taskbar)
- [CSS Customization](#css-customization)

---

## Overview

The **critical path** is the longest sequence of dependent tasks that determines the overall project duration. Any delay to a task on the critical path directly delays the entire project. Critical path tasks are visually highlighted in the Gantt chart.

---

## Enable Critical Path

Set `enableCriticalPath="true"` on `<ejs-gantt>`. Task dependencies must be configured via `dependency` in `taskFields` for the critical path to be calculated:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableCriticalPath="true"
           toolbar="@(new List<string>() {
               "Add","Edit","Delete","Cancel","Update",
               "ExpandAll","CollapseAll"
           })"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true"
                          allowDeleting="true" allowTaskbarEditing="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

> The critical path requires task dependencies (`dependency` field). Without dependencies, no tasks are highlighted.

---

## Customize Critical Path Taskbar

Use the `queryTaskbarInfo` event with the `args.isCritical` flag to apply custom colors or styles to critical path taskbars:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableCriticalPath="true"
           queryTaskbarInfo="queryTaskbarInfo"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function queryTaskbarInfo(args) {
    if (args.isCritical) {
        // Custom styling for critical tasks
        args.taskbarBgColor      = '#ff0000';
        args.taskbarBorderColor  = '#cc0000';
        args.progressBarBgColor  = '#990000';
    } else {
        // Normal tasks
        args.taskbarBgColor      = '#3f91e5';
        args.taskbarBorderColor  = '#1d6ebc';
        args.progressBarBgColor  = '#1d6ebc';
    }
}
</script>
```

**queryTaskbarInfo args for critical path:**

| Property | Type | Description |
|----------|------|-------------|
| `args.isCritical` | boolean | `true` if the task is on the critical path |
| `args.taskbarBgColor` | string | Taskbar background color |
| `args.taskbarBorderColor` | string | Taskbar border color |
| `args.progressBarBgColor` | string | Progress bar fill color |

---

## CSS Customization

Override the default critical path taskbar appearance using CSS classes:

```css
/* Critical child taskbar */
.e-gantt .e-gantt-chart .e-critical-taskbar-inner-div {
    background-color: #ff4444 !important;
    border-color: #cc0000 !important;
}

/* Critical parent taskbar */
.e-gantt .e-gantt-chart .e-critical-parent-taskbar-inner-div {
    background-color: #cc0000 !important;
}

/* Critical progress bar */
.e-gantt .e-gantt-chart .e-critical-progressbar-inner-div {
    background-color: #990000 !important;
}

/* Critical connector line */
.e-gantt .e-gantt-chart .e-critical-connector-line {
    background-color: #ff4444 !important;
}
```
