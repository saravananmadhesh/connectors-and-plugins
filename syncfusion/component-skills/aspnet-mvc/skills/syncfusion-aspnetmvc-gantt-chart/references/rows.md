# Rows — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Row Height](#row-height)
- [Expand and Collapse Rows](#expand-and-collapse-rows)
  - [Programmatic Expand/Collapse](#programmatic-expandcollapse)
  - [Customize Expand/Collapse Events](#customize-expandcollapse-events)
- [Initial Expand State](#initial-expand-state)
  - [Collapse All Parent Tasks](#collapse-all-parent-tasks)
  - [Define Per-Task Expand State](#define-per-task-expand-state)
- [RowDataBound Event](#rowdatabound-event)
- [QueryTaskbarInfo Event](#querytaskbarinfo-event)
- [Styling Alternate Rows](#styling-alternate-rows)
- [Row Spanning](#row-spanning)
- [Customize Rows and Cells](#customize-rows-and-cells)
- [Clip Mode](#clip-mode)
- [Row Template](#row-template)

---

## Row Height

Set the height of all rows in pixels using `RowHeight`. The `TaskbarHeight` must be less than `RowHeight`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .RowHeight(50)
    .TaskbarHeight(30)
    .Height("450px")
    .Render()
```

> **Important:** `TaskbarHeight` must be **less than** `RowHeight`. Both accept pixel values only.

---

## Expand and Collapse Rows

Expand or collapse all parent rows using toolbar buttons or programmatic methods:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Toolbar(new List<string> { "ExpandAll", "CollapseAll" })
    .Height("450px")
    .Render()
```

### Programmatic Expand/Collapse

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];

// Expand or collapse all
ganttObj.expandAll();
ganttObj.collapseAll();

// Expand or collapse by task ID
ganttObj.expandByID(3);
ganttObj.collapseByID(3);

// Expand or collapse by row index (0-based)
ganttObj.expandByIndex([0, 2]);
ganttObj.collapseByIndex(1);
```

### Customize Expand/Collapse Events

Handle expand and collapse events to customize behavior. Use `Expanding` and `Collapsing` to prevent specific rows from expanding/collapsing:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Expanding("onExpanding")
    .Collapsing("onCollapsing")
    .Expanded("onExpanded")
    .Collapsed("onCollapsed")
    .Height("450px")
    .Render()

<script>
function onExpanding(args) {
    // Prevent specific tasks from expanding
    if (args.data.TaskId === 2) {
        args.cancel = true;
    }
}

function onCollapsing(args) {
    // Prevent specific tasks from collapsing
    if (args.data.TaskId === 1) {
        args.cancel = true;
    }
}

function onExpanded(args) {
    console.log('Task expanded:', args.data.TaskName);
}

function onCollapsed(args) {
    console.log('Task collapsed:', args.data.TaskName);
}
</script>
```

**Event Arguments:**
- `data` — The task data object
- `cancel` — Set to `true` to prevent expand/collapse action

---

## Initial Expand State

### Collapse All Parent Tasks

Collapse all parent tasks on initial render:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .CollapseAllParentTasks(true)
    .Height("450px")
    .Render()
```

> When `CollapseAllParentTasks` is `true`, all parent rows render collapsed on first load.

### Define Per-Task Expand State

Control expand/collapse state on a per-task basis using `ExpandState` in the data source:

**Controller (`HomeController.cs`):**

```csharp
public static List<GanttDataSource> GetGanttData()
{
    return new List<GanttDataSource>
    {
        new GanttDataSource
        {
            TaskId = 1,
            TaskName = "Project Initiation",
            StartDate = new DateTime(2019, 3, 29),
            EndDate = new DateTime(2019, 4, 2),
            Duration = 4,
            ExpandState = true,  // Expanded on load
            SubTasks = new List<GanttDataSource>
            {
                new GanttDataSource
                {
                    TaskId = 2,
                    TaskName = "Identify Site Location",
                    StartDate = new DateTime(2019, 3, 29),
                    Duration = 2,
                    ExpandState = false  // Collapsed on load
                },
                new GanttDataSource
                {
                    TaskId = 3,
                    TaskName = "Perform Soil Analysis",
                    StartDate = new DateTime(2019, 3, 29),
                    Duration = 4,
                    ExpandState = true  // Expanded on load
                }
            }
        }
    };
}

public class GanttDataSource
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? Duration { get; set; }
    public bool ExpandState { get; set; }  // Per-task expand state
    public List<GanttDataSource> SubTasks { get; set; }
}
```

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .ExpandState("ExpandState")
        .Child("SubTasks")
    )
    .Height("450px")
    .Render()
```

> `ExpandState` field is mapped per row to control individual expand/collapse state on initial load.

---

## RowDataBound Event

Use `RowDataBound` to customize rows dynamically based on task data — add CSS classes, change styles, etc.:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .RowDataBound("onRowDataBound")
    .Height("450px")
    .Render()

<script>
function onRowDataBound(args) {
    if (args.data.Progress < 25) {
        // Highlight low-progress rows
        args.row.classList.add('low-progress-row');
    }
}
</script>

<style>
.low-progress-row { background-color: #fff3e0 !important; }
</style>
```

**`args` properties:**

| Property | Description |
|---|---|
| `data` | The task data object for this row |
| `row` | The HTML `<tr>` element of the grid row |

---

## QueryTaskbarInfo Event

Use `QueryTaskbarInfo` to customize taskbar appearance dynamically per task:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .QueryTaskbarInfo("queryTaskbarInfo")
    .Height("450px")
    .Render()

<script>
function queryTaskbarInfo(args) {
    // Color completed tasks green, in-progress tasks blue
    if (args.data.Progress === 100) {
        args.taskbarBgColor = '#4caf50';
        args.taskbarBorderColor = '#388e3c';
        args.progressBarBgColor = '#2e7d32';
    } else if (args.data.Progress > 50) {
        args.taskbarBgColor = '#2196f3';
        args.progressBarBgColor = '#1565c0';
    }
}
</script>
```

**`args` properties:**

| Property | Description |
|---|---|
| `data` | The task data object |
| `taskbarBgColor` | Override the taskbar background color |
| `taskbarBorderColor` | Override the taskbar border color |
| `progressBarBgColor` | Override the progress bar color |
| `taskbarHeight` | Override the taskbar height in pixels |
| `isCritical` | `true` if the task is on the critical path |

---

## Styling Alternate Rows

Change the background color of alternate rows by overriding CSS:

```css
.e-altrow, tr.e-chart-row:nth-child(even) {
    background-color: #f2f2f2;
}
```

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Height("450px")
    .Render()

<style>
.e-altrow, tr.e-chart-row:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
```

---

## Row Spanning

Span row cells across multiple rows using the `QueryCellInfo` event. Set the `rowSpan` attribute to span cells:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .QueryCellInfo("onQueryCellInfo")
    .Height("450px")
    .Render()

<script>
function onQueryCellInfo(args) {
    if (args.data.TaskName === "Soil test approval") {
        args.rowSpan = 2;  // Span this cell to 2 rows
    }
}
</script>
```

**`args` properties:**
- `data` — The task data object for this row
- `cell` — The HTML `<td>` element
- `rowSpan` — Number of rows to span (set this to span cells)

---

## Customize Rows and Cells

Use `RowDataBound` and `QueryCellInfo` events to customize row and cell appearance dynamically:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .RowDataBound("onRowDataBound")
    .QueryCellInfo("onQueryCellInfo")
    .Height("450px")
    .Render()

<script>
function onRowDataBound(args) {
    // Customize entire row
    if (args.data.Progress < 25) {
        args.row.classList.add('low-progress-row');
    } else if (args.data.Progress >= 100) {
        args.row.classList.add('completed-row');
    }
}

function onQueryCellInfo(args) {
    // Customize specific cells
    if (args.column.field === "TaskName" && args.data.Progress === 100) {
        args.cell.style.backgroundColor = '#90EE90';
        args.cell.style.fontWeight = 'bold';
    }
}
</script>

<style>
.low-progress-row { background-color: #fff3e0 !important; }
.completed-row { background-color: #c8e6c9 !important; }
</style>
```

**`RowDataBound` arguments:**
- `data` — The task data object
- `row` — The HTML `<tr>` element

**`QueryCellInfo` arguments:**
- `data` — The task data object
- `cell` — The HTML `<td>` element
- `column` — Column object with `field` property

---

## Clip Mode

Control how cell content displays when it overflows using the `ClipMode` property. Options are:
- `Clip` — Truncate content
- `Ellipsis` — Show ellipsis (`...`)
- `EllipsisWithTooltip` — Show ellipsis with hover tooltip (default)

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Columns(col =>
    {
        col.Field("TaskName").HeaderText("Task Name").ClipMode(ClipMode.EllipsisWithTooltip).Add();
        col.Field("Duration").HeaderText("Duration").ClipMode(ClipMode.Clip).Add();
    })
    .Height("450px")
    .Render()
```

> By default, all columns use `EllipsisWithTooltip`.

---

## Row Template

Replace the entire row rendering with custom HTML using `RowTemplate`. The template uses `${}` syntax to access task fields:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .RowTemplate("#rowTemplate")
    .Height("450px")
    .Render()

<script id="rowTemplate" type="text/x-template">
    <tr>
        <td>
            <div class="custom-row">
                <span class="task-status ${Progress >= 100 ? 'done' : 'in-progress'}"></span>
                <b>${TaskName}</b> — ${Progress}% complete
            </div>
        </td>
    </tr>
</script>
```
