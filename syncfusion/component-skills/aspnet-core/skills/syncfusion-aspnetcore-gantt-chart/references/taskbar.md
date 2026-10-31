# Taskbar — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Taskbar Template](#taskbar-template)
- [Taskbar Height](#taskbar-height)
- [Conditional Formatting with queryTaskbarInfo](#conditional-formatting-with-querytaskbarinfo)
- [Change Gripper Icon](#change-gripper-icon)
- [Connector Lines](#connector-lines)
- [Multi-Taskbar in Project View](#multi-taskbar-in-project-view)

---

## Taskbar Template

Render fully custom HTML inside each taskbar using `type="text/x-jsrender"` script templates. Reference the script block IDs in `taskbarTemplate`, `parentTaskbarTemplate`, and `milestoneTemplate`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           taskbarTemplate="#TaskbarTemplate"
           parentTaskbarTemplate="#ParentTaskbarTemplate"
           milestoneTemplate="#MilestoneTemplate"
           rowHeight="60"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script type="text/x-jsrender" id="TaskbarTemplate">
    <div class="e-gantt-child-taskbar-inner-div e-gantt-child-taskbar" style="height:100%">
        <div class="e-gantt-child-progressbar-inner-div e-gantt-child-progressbar"
             style="width:${ganttProperties.progressWidth}px;height:100%">
            <span class="e-task-label"
                  style="position:absolute;z-index:1;color:white;top:5px;left:10px;">
                ${taskData.TaskName}
            </span>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="ParentTaskbarTemplate">
    <div class="e-gantt-parent-taskbar-inner-div e-gantt-parent-taskbar" style="height:100%">
        <div class="e-gantt-parent-progressbar-inner-div e-gantt-parent-progressbar"
             style="width:${ganttProperties.progressWidth}px;height:100%">
            <span class="e-task-label"
                  style="position:absolute;z-index:1;color:white;top:5px;left:10px;">
                ${taskData.TaskName}
            </span>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="MilestoneTemplate">
    <div class="e-gantt-milestone" style="position:absolute;">
        <div class="e-milestone-top"
             style="border-right-width:15px;border-left-width:15px;border-bottom-width:15px;">
        </div>
        <div class="e-milestone-bottom"
             style="top:15px;border-right-width:15px;border-left-width:15px;border-top-width:15px;">
        </div>
    </div>
</script>
```

**Template data access:**

| Expression | Description |
|-----------|-------------|
| `${taskData.FieldName}` | Raw task field value (e.g., `${taskData.TaskName}`) |
| `${ganttProperties.progressWidth}` | Computed progress bar width in pixels |
| `${ganttProperties.taskId}` | Gantt-internal task ID |
| `${ganttProperties.resourceNames}` | Comma-separated resource names |

> Taskbar templates use `type="text/x-jsrender"` script blocks. Reference them by script ID string (e.g., `taskbarTemplate="#TaskbarTemplate"`). There is no `<e-gantt-taskbartemplate>` child tag.

---

## Taskbar Height

Control the height of child and parent taskbars using `taskbarHeight`. Must be less than `rowHeight`. Both properties accept pixel values only:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           rowHeight="50"
           taskbarHeight="30"
           height="450px">
    ...
</ejs-gantt>
```

> `taskbarHeight` must always be **less than** `rowHeight`. Both accept pixels only (not percentages).

---

## Conditional Formatting with queryTaskbarInfo

Use the `queryTaskbarInfo` event to dynamically change taskbar colors or styles per row based on task data:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           queryTaskbarInfo="queryTaskbarInfo"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function queryTaskbarInfo(args) {
    if (args.data.Progress < 25) {
        args.progressBarBgColor  = 'red';
        args.taskbarBgColor      = '#ffcccc';
        args.taskbarBorderColor  = 'red';
    } else if (args.data.Progress < 75) {
        args.progressBarBgColor  = 'orange';
        args.taskbarBgColor      = '#fff3cc';
        args.taskbarBorderColor  = 'orange';
    } else {
        args.progressBarBgColor  = 'green';
        args.taskbarBgColor      = '#ccffcc';
        args.taskbarBorderColor  = 'green';
    }
}
</script>
```

**queryTaskbarInfo args properties:**

| Property | Description |
|----------|-------------|
| `args.data` | Row data record |
| `args.taskbarBgColor` | Taskbar background color |
| `args.taskbarBorderColor` | Taskbar border color |
| `args.progressBarBgColor` | Progress bar background color |
| `args.isCritical` | Whether the task is on the critical path |

---

## Change Gripper Icon

The drag gripper icon on taskbars can be replaced by overriding CSS:

```css
/* Replace the default gripper icon */
.e-gantt .e-gantt-child-taskbar .e-taskbar-left-resizer {
    content: url('path/to/custom-icon.png');
}

/* Or change using font icon */
.e-gantt .e-taskbar-left-resizer::before {
    content: "\e900";  /* custom font icon code */
    font-family: "my-icon-font";
}
```

---

## Connector Lines

Customize the width and background color of dependency connector lines:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           connectorLineWidth="2"
           connectorLineBackground="#ff4444"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" dependency="Predecessor"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

| Property | Type | Description |
|----------|------|-------------|
| `connectorLineWidth` | number | Stroke width of the connector line in pixels |
| `connectorLineBackground` | string | Color of the connector line (any CSS color value) |

---

## Multi-Taskbar in Project View

When a parent row is collapsed, display multiple child taskbars inside the parent row to summarize child task progress. Enable with `enableMultiTaskbar="true"`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableMultiTaskbar="true"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        resourceInfo="ResourceId" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-resourcefields id="ResourceId" name="ResourceName">
    </e-gantt-resourcefields>
</ejs-gantt>
```

> `enableMultiTaskbar` is only applicable in **project view** (hierarchical data). In resource view, multi-taskbar is the default behavior.
