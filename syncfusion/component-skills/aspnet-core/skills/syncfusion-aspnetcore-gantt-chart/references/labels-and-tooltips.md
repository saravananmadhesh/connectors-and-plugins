# Labels and Tooltips — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Task Labels](#task-labels)
- [Label Templates](#label-templates)
- [Enable / Disable Tooltips](#enable--disable-tooltips)
- [Taskbar Tooltip Template](#taskbar-tooltip-template)
- [Baseline Tooltip Template](#baseline-tooltip-template)
- [Connector Line Tooltip Template](#connector-line-tooltip-template)
- [Timeline Tooltip Template](#timeline-tooltip-template)

---

## Task Labels

Map data source fields to display labels on the left, right, or inside taskbars using `<e-gantt-labelSettings>`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-labelSettings leftLabel="TaskId"
                           rightLabel="TaskName"
                           taskLabel="Progress">
    </e-gantt-labelSettings>
</ejs-gantt>
```

| Attribute | Description |
|-----------|-------------|
| `leftLabel` | Field name or expression shown **left** of the taskbar |
| `rightLabel` | Field name or expression shown **right** of the taskbar |
| `taskLabel` | Field name or expression shown **inside** the taskbar |

---

## Label Templates

Use inline jsrender expressions directly on the label attribute to display formatted or combined values:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-labelSettings leftLabel="Task ID: ${taskData.TaskId}"
                           rightLabel="Task Name: ${taskData.TaskName}"
                           taskLabel="${taskData.Progress}%">
    </e-gantt-labelSettings>
</ejs-gantt>
```

**Template expression access:**

| Expression | Description |
|-----------|-------------|
| `${taskData.FieldName}` | Access any task field value |
| `${taskData.TaskName}` | Task name |
| `${taskData.Progress}` | Progress percentage |
| `${taskData.Duration}` | Duration value |

> Label values are inline jsrender expressions set directly in the attribute string. Use `taskData.FieldName` (not `ganttProperties`) for label templates.

---

## Enable / Disable Tooltips

The default hover tooltip shows task details for taskbars, connector lines, baselines, and event markers. Toggle with `tooltipSettings.showTooltip`:

```cshtml
@* Disable all tooltips *@
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-tooltipsettings showTooltip="false">
    </e-gantt-tooltipsettings>
</ejs-gantt>
```

> The default value of `showTooltip` is `true`. Tooltips cover: Taskbar, Connector line, Baseline, Event marker.

---

## Taskbar Tooltip Template

Override the default taskbar tooltip with a custom jsrender template using `tooltipSettings.taskbar`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-tooltipsettings taskbar="#taskbarTooltip">
    </e-gantt-tooltipsettings>
</ejs-gantt>

<script type="text/x-jsrender" id="taskbarTooltip">
    <table>
        <tr><td><b>Task:</b></td><td>${TaskName}</td></tr>
        <tr><td><b>Start:</b></td><td>${StartDate}</td></tr>
        <tr><td><b>End:</b></td><td>${EndDate}</td></tr>
        <tr><td><b>Progress:</b></td><td>${Progress}%</td></tr>
    </table>
</script>
```

> The `taskbar` attribute on `<e-gantt-tooltipsettings>` accepts a script template ID string prefixed with `#`. Use `type="text/x-jsrender"` for the script block.

---

## Baseline Tooltip Template

Customize the tooltip shown when hovering over baseline bars:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           renderBaseline="true" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        baselineStartDate="BaselineStartDate"
                        baselineEndDate="BaselineEndDate"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-tooltipsettings baseline="#baselineTooltip">
    </e-gantt-tooltipsettings>
</ejs-gantt>

<script type="text/x-jsrender" id="baselineTooltip">
    <div>
        <b>Baseline Start:</b> ${BaselineStartDate} <br/>
        <b>Baseline End:</b>   ${BaselineEndDate}
    </div>
</script>
```

---

## Connector Line Tooltip Template

Customize the tooltip shown when hovering over dependency connector lines:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" dependency="Predecessor"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-tooltipsettings connectorLine="#dependencyTooltip">
    </e-gantt-tooltipsettings>
</ejs-gantt>

<script type="text/x-jsrender" id="dependencyTooltip">
    <div>
        <b>From:</b> ${fromTask.TaskName} (ID: ${fromTask.TaskId}) <br/>
        <b>To:</b>   ${toTask.TaskName}   (ID: ${toTask.TaskId})
    </div>
</script>
```

---

## Timeline Tooltip Template

Customize the tooltip shown when hovering over timeline header cells:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-tooltipsettings timeline="#timelineTooltip">
    </e-gantt-tooltipsettings>
</ejs-gantt>

<script type="text/x-jsrender" id="timelineTooltip">
    <div>
        <b>Date:</b> ${date}
    </div>
</script>
```

> Use `${date}` to access the timeline cell date in the timeline tooltip template.
