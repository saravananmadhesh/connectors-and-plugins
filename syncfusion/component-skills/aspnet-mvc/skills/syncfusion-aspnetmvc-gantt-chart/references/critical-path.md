# Critical Path — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Critical Path](#enable-critical-path)
- [Highlight Critical Tasks via QueryTaskbarInfo](#highlight-critical-tasks-via-querytaskbarinfo)
- [CSS Customization](#css-customization)

---

## Overview

The critical path is the longest chain of dependent tasks that determines the minimum project duration. Any delay on a critical path task directly delays the project's end date. The Gantt highlights critical tasks and their connecting dependency lines visually.

---

## Enable Critical Path

Set `EnableCriticalPath(true)` to activate critical path calculation and rendering:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .EnableCriticalPath(true)
    .Height("450px")
    .Render()
```

> Critical path tasks and their dependency connector lines are highlighted in red by default.

---

## Highlight Critical Tasks via QueryTaskbarInfo

Use the `QueryTaskbarInfo` event to apply custom colors or styles specifically to critical path tasks. The `args.isCritical` property is `true` for tasks on the critical path:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor").Child("SubTasks")
    )
    .EnableCriticalPath(true)
    .QueryTaskbarInfo("queryTaskbarInfo")
    .Height("450px")
    .Render()

<script>
function queryTaskbarInfo(args) {
    if (args.isCritical) {
        args.taskbarBgColor = '#f44336';
        args.taskbarBorderColor = '#c62828';
        args.progressBarBgColor = '#b71c1c';
    }
}
</script>
```

---

## CSS Customization

Override the default red critical path styles using CSS:

```css
/* Critical path taskbar */
.e-gantt .e-critical-path-bar {
    background-color: #d32f2f;
    border-color: #b71c1c;
}

/* Critical path progress bar */
.e-gantt .e-critical-path-bar .e-gantt-child-progressbar {
    background-color: #b71c1c;
}

/* Critical path connector line */
.e-gantt .e-critical-connector-line {
    border-color: #d32f2f;
}

/* Critical path connector arrowhead */
.e-gantt .e-critical-connector-line-right-arrow,
.e-gantt .e-critical-connector-line-left-arrow {
    border-color: #d32f2f;
}
```

> The `EnableCriticalPath` property automatically injects the `CriticalPath` module. No manual module injection is required.
