# Labels and Tooltips — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Label Settings](#label-settings)
- [Left, Right, and Task Labels](#left-right-and-task-labels)
- [Label Templates](#label-templates)
- [Tooltip Settings](#tooltip-settings)
- [Taskbar Tooltip Template](#taskbar-tooltip-template)
- [Connector Line Tooltip](#connector-line-tooltip)
- [Baseline Tooltip](#baseline-tooltip)
- [Editing Tip Tooltip](#editing-tip-tooltip)
- [beforeTooltipRender Event](#beforetooltiprender-event)

---

## Label Settings

Labels appear beside taskbars on the chart. Configure using `LabelSettings`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .LabelSettings(ls => ls
        .LeftLabel("TaskName")       // left of taskbar: task name
        .RightLabel("ResourceName")  // right of taskbar: resource names
        .TaskLabel("Progress")       // inside taskbar: progress %
    )
    .Height("450px")
    .Render()
```

**LabelSettings properties:**

| Property | Description |
|---|---|
| `LeftLabel` | Field name or template ID for the label to the left of the taskbar |
| `RightLabel` | Field name or template ID for the label to the right of the taskbar |
| `TaskLabel` | Field name or template ID for the label inside the taskbar |

---

## Left, Right, and Task Labels

Set any mapped task field name as a label value. Common examples:

```cshtml
.LabelSettings(ls => ls
    .LeftLabel("TaskName")      // show task name on the left
    .RightLabel("Progress")     // show progress % on the right
    .TaskLabel("Duration")      // show duration inside the taskbar
)
```

---

## Label Templates

Use a client-side template (script ID) for fully custom label HTML:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .LabelSettings(ls => ls
        .RightLabel("#rightLabelTemplate")
        .LeftLabel("#leftLabelTemplate")
    )
    .Height("450px")
    .Render()

<script id="rightLabelTemplate" type="text/x-template">
    <div class="label-content">
        <span class="resource-icon">👤</span> ${ResourceName}
    </div>
</script>

<script id="leftLabelTemplate" type="text/x-template">
    <div class="label-content">
        <span class="resource-icon">👤</span> ${ResourceName}
    </div>
</script>
```

---

## Tooltip Settings

Configure the tooltip shown when hovering over taskbars using `TooltipSettings`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .TooltipSettings(ts => ts
        .ShowTooltip(true)
        .Taskbar("#taskbarTooltip")
    )
    .Height("450px")
    .Render()

<script id="taskbarTooltip" type="text/x-template">
    <div class="gantt-tooltip">
        <b>${TaskName}</b><br/>
        Start: ${StartDate}<br/>
        End: ${EndDate}<br/>
        Duration: ${Duration} days<br/>
        Progress: ${Progress}%
    </div>
</script>
```

| Property | Description |
|---|---|
| `ShowTooltip` | Enable or disable tooltips globally |
| `Taskbar` | Template ID for taskbar hover tooltip |
| `Connector` | Template ID for connector line hover tooltip |
| `Baseline` | Template ID for baseline bar hover tooltip |
| `EditingTip` | Template ID for the tooltip shown during taskbar drag |

---

## Taskbar Tooltip Template

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .TooltipSettings(ts => ts.ShowTooltip(true).Taskbar("#taskbarTooltip"))
    .Height("450px")
    .Render()

<script id="taskbarTooltip" type="text/x-template">
    <table class="custom-tooltip">
        <tr><td><b>Task:</b></td><td>${TaskName}</td></tr>
        <tr><td><b>Duration:</b></td><td>${Duration} days</td></tr>
        <tr><td><b>Progress:</b></td><td>${Progress}%</td></tr>
    </table>
</script>
```

---

## Connector Line Tooltip

Customize the tooltip shown when hovering over a dependency connector line:

```cshtml
.TooltipSettings(ts => ts
    .ShowTooltip(true)
    .Connector("#connectorTooltip")
)

<script id="connectorTooltip" type="text/x-template">
    <div>
        <b>From:</b> ${fromTask.TaskName}<br/>
        <b>To:</b> ${toTask.TaskName}<br/>
        <b>Type:</b> ${linkType}
    </div>
</script>
```

---

## Baseline Tooltip

Customize the tooltip shown when hovering over a baseline bar:

```cshtml
.TooltipSettings(ts => ts
    .ShowTooltip(true)
    .Baseline("#baselineTooltip")
)

<script id="baselineTooltip" type="text/x-template">
    <div>
        <b>Baseline Start:</b> ${BaselineStartDate}<br/>
        <b>Baseline End:</b> ${BaselineEndDate}
    </div>
</script>
```

---

## Editing Tip Tooltip

Customize the tooltip shown during taskbar drag or resize:

```cshtml
.TooltipSettings(ts => ts
    .ShowTooltip(true)
    .EditingTip("#editingTipTooltip")
)

<script id="editingTipTooltip" type="text/x-template">
    <div>
        <b>Start:</b> ${StartDate}<br/>
        <b>End:</b> ${EndDate}<br/>
        <b>Duration:</b> ${Duration} days
    </div>
</script>
```

---

## beforeTooltipRender Event

Use `BeforeTooltipRender` to dynamically customize tooltip content or cancel tooltip display per task:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .TooltipSettings(ts => ts.ShowTooltip(true))
    .BeforeTooltipRender("onBeforeTooltipRender")
    .Height("450px")
    .Render()

<script>
function onBeforeTooltipRender(args) {
    // Customize taskbar tooltip content dynamically
    if (args.args.target && args.args.target.classList.contains('e-gantt-child-taskbar')) {
        var task = args.data;
        args.content = '<b>' + task.TaskName + '</b><br/>'
                     + 'Start: ' + task.StartDate.toLocaleDateString() + '<br/>'
                     + 'Duration: ' + task.Duration + ' days<br/>'
                     + 'Progress: ' + task.Progress + '%';
    }
    // Suppress tooltip on milestone tasks
    if (args.data && args.data.Duration === 0) {
        args.cancel = true;
    }
}
</script>
```

**`args` properties:**

| Property | Description |
|---|---|
| `args` | Event context — contains `target` (DOM element that triggered tooltip) |
| `content` | Tooltip HTML string — override to customize display |
| `cancel` | Set `true` to prevent the tooltip from showing |
| `data` | The task object associated with the hovered element |

> Use `BeforeTooltipRender` when you need **dynamic, per-task** content. For static templates, use `TooltipSettings` with a template ID.
