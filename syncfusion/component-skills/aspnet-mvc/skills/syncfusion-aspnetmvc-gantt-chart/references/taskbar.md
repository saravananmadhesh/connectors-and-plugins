# Taskbar — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Taskbar Template](#taskbar-template)
- [Parent Taskbar Template](#parent-taskbar-template)
- [Milestone Template](#milestone-template)
- [QueryTaskbarInfo Event](#querytaskbarinfo-event)
- [Connector Lines](#connector-lines)
- [Data Markers / Indicators](#data-markers--indicators)
- [Gripper Icons](#gripper-icons)

---

## Taskbar Template

Replace the default child taskbar rendering with a fully custom template. The template uses `${}` syntax to access task fields:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .TaskbarTemplate("#taskbarTemplate")
    .RowHeight(46)
    .Height("450px")
    .Render()

<script id="taskbarTemplate" type="text/x-template">
    <div class="custom-taskbar"
         style="height: 100%; background: linear-gradient(90deg, #1976d2 ${Progress}%, #90caf9 ${Progress}%);
                border-radius: 4px; padding: 4px 8px; color: white; font-size: 12px;">
        ${TaskName} (${Progress}%)
    </div>
</script>
```

> `RowHeight` should be set to accommodate the template height.

---

## Parent Taskbar Template

Customize the appearance of parent (summary) taskbars separately from child taskbars:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .ParentTaskbarTemplate("#parentTaskbarTemplate")
    .RowHeight(46)
    .Height("450px")
    .Render()

<script id="parentTaskbarTemplate" type="text/x-template">
    <div class="parent-taskbar"
         style="height: 100%; background: #37474f; border-radius: 4px;
                padding: 4px 8px; color: white; font-size: 12px; font-weight: bold;">
        📁 ${TaskName}
    </div>
</script>
```

---

## Milestone Template

Customize the diamond milestone shape:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .MilestoneTemplate("#milestoneTemplate")
    .RowHeight(46)
    .Height("450px")
    .Render()

<script id="milestoneTemplate" type="text/x-template">
    <div style="background: #e53935; width: 20px; height: 20px; transform: rotate(45deg); margin-top: 6px;"></div>
</script>
```

---

## QueryTaskbarInfo Event

Use `QueryTaskbarInfo` to dynamically customize taskbar colors, height, and CSS classes per task at render time:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .QueryTaskbarInfo("queryTaskbarInfo")
    .EnableCriticalPath(true)
    .Height("450px")
    .Render()

<script>
function queryTaskbarInfo(args) {
    // Highlight completed tasks in green
    if (args.data.Progress === 100) {
        args.taskbarBgColor = '#4caf50';
        args.taskbarBorderColor = '#388e3c';
        args.progressBarBgColor = '#2e7d32';
    }
    // Highlight critical path tasks in red
    if (args.isCritical) {
        args.taskbarBgColor = '#f44336';
        args.taskbarBorderColor = '#c62828';
    }
}
</script>
```

**`args` properties:**

| Property | Description |
|---|---|
| `data` | The task data object (`IGanttData`) |
| `taskbarBgColor` | Override the taskbar background color |
| `taskbarBorderColor` | Override the taskbar border color |
| `progressBarBgColor` | Override the progress bar color |
| `taskbarHeight` | Override the taskbar height in pixels |
| `isCritical` | `true` if the task is on the critical path |
| `taskbarCssClass` | Append a custom CSS class to the taskbar |
| `labelStyle` | Override the taskbar label style |

---

## Connector Lines

Customize dependency connector line appearance using properties and CSS:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    .ConnectorLineWidth(2)
    .ConnectorLineBackground("#1976d2")
    .Height("450px")
    .Render()
```

| Property | Description |
|---|---|
| `ConnectorLineWidth` | Width of the dependency connector line in pixels |
| `ConnectorLineBackground` | Color of the connector line |

Custom CSS for connector lines:

```css
/* Dependency connector line */
.e-gantt .e-line {
    border-color: #1976d2;
}

/* Arrowhead */
.e-gantt .e-connector-line-right-arrow,
.e-gantt .e-connector-line-left-arrow {
    border-color: #1976d2;
}
```

---

## Data Markers / Indicators

Data markers (indicators) show task-specific icons or text at specified dates. These are defined per-task in the data source and appear as symbols on the chart:

**Model:**

```csharp
public class GanttData
{
    public int TaskId { get; set; }
    // ...
    public List<GanttIndicator> Indicators { get; set; }
}

public class GanttIndicator
{
    public string IconClass { get; set; }   // CSS class for the icon
    public string Label { get; set; }       // tooltip text
    public DateTime Date { get; set; }      // date to place the indicator
}
```

**Controller:**

```csharp
new GanttData
{
    TaskId = 3, TaskName = "Design", StartDate = new DateTime(2024, 4, 2), Duration = 5,
    Indicators = new List<GanttIndicator>
    {
        new GanttIndicator { Date = new DateTime(2024, 4, 4), IconClass = "e-btn-icon e-notes-info", Label = "Mid-review" }
    }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Indicators("Indicators")    // maps the indicators field
        .Child("SubTasks")
    )
    .Render()
```

Indicators appear as small icons on the chart at the specified date. Hovering shows the label as a tooltip.

---

## Gripper Icons

The taskbar has left and right resize grippers for changing task start/end dates. Customize their appearance via CSS:

```css
/* Left gripper */
.e-gantt .e-taskbar-left-resizer {
    background-color: #1565c0;
    border-radius: 2px;
}

/* Right gripper */
.e-gantt .e-taskbar-right-resizer {
    background-color: #1565c0;
    border-radius: 2px;
}
```

> To hide the grippers entirely, use `display: none` on those selectors. Grippers appear only when `AllowTaskbarEditing` is `true`.
