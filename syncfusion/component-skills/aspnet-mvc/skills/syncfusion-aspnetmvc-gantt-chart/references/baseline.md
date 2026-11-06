# Baseline – Syncfusion ASP.NET MVC Gantt Chart

The baseline feature compares original planned schedules with actual task execution, displaying both timelines side-by-side for comprehensive project tracking. To implement it, ensure the data source includes baseline date fields and map them in `TaskFields`.

## Contents

- [Baseline Fields](#baseline-fields)
- [Model Setup](#model-setup)
- [Implement Baseline](#implement-baseline)
- [Customize Baseline Style](#customize-baseline-style)
- [Customize Baseline Templates](#customize-baseline-templates)
- [Baseline Milestone](#baseline-milestone)
- [Combine with Other Features](#combine-with-other-features)

## Baseline Fields

Configure your data model with these baseline properties:

- **BaselineStartDate** – Originally planned start date.
- **BaselineEndDate** – Originally planned end date.
- **BaselineDuration** – Total planned duration. Set explicitly to `0` for a baseline milestone; matching start/end dates without `BaselineDuration = 0` renders a 1-day task, not a milestone.

## Model Setup

```csharp
public class GanttDataSource
{
    public int TaskID { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int? ParentID { get; set; }

    public DateTime? BaselineStartDate { get; set; }
    public DateTime? BaselineEndDate { get; set; }
    public int? BaselineDuration { get; set; }
}
```

## Implement Baseline

Set `RenderBaseline(true)`, map the baseline fields in `TaskFields`, and optionally set `BaselineColor`:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .RenderBaseline(true)
    .BaselineColor("red")
    .TaskFields(ts => ts
        .Id("TaskID")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .BaselineStartDate("BaselineStartDate")
        .BaselineEndDate("BaselineEndDate")
        .ParentID("ParentID")
    )
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Add();
        col.Field("TaskName").HeaderText("Name").Width(270).Add();
        col.Field("BaselineStartDate").HeaderText("Baseline Start Date").Add();
        col.Field("BaselineDuration").HeaderText("Baseline Duration").Add();
    })
    .Height("450px")
    .RowHeight(60)
    .TaskbarHeight(20)
    .HighlightWeekends(true)
    .AllowSelection(true)
    .GridLines(Syncfusion.EJ2.Gantt.GridLine.Both)
    .SplitterSettings(ss => ss.ColumnIndex(3))
    .LabelSettings(ls => ls.TaskLabel("TaskName"))
    .Render()
```

## Customize Baseline Style

Use the `BaselineColor` property for a quick color override, or the `.e-baseline-bar` CSS class for advanced styling:

```cshtml
.RenderBaseline(true)
.BaselineColor("#fc7b00")
.Render()
```

```css
.e-gantt .e-gantt-chart .e-baseline-bar {
  height: 4px;
  border-radius: 2px;
  opacity: 0.9;
  background-color: #4caf50;
}
```

## Customize Baseline Templates

The `BaselineTemplate` property replaces the default baseline UI with a custom HTML structure, enabling advanced scenarios like multiple baselines per task or visual indicators.

### Multiple Baseline Rendering

By default, the Gantt supports a single baseline per task. Use `BaselineTemplate` to render multiple baselines from custom data fields — useful for comparing original vs revised schedules or visualizing multiple planning phases.

**Enhanced Model:**

```csharp
public class GanttDataSource
{
    public int TaskID { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int? ParentID { get; set; }

    public DateTime? BaselineStartDate { get; set; }
    public int? BaselineDuration { get; set; }
    public DateTime? BaselineStartDate1 { get; set; }
    public int? BaselineDuration1 { get; set; }
    public DateTime? BaselineStartDate2 { get; set; }
    public int? BaselineDuration2 { get; set; }
}
```

**View:**

```cshtml
@Html.EJS().Gantt("GanttContainer")
    .DataSource((IEnumerable<object>)Model)
    .Height("450px")
    .RowHeight(60)
    .TaskbarHeight(20)
    .HighlightWeekends(true)
    .AllowSelection(true)
    .RenderBaseline(true)
    .BaselineColor("red")
    .GridLines(Syncfusion.EJ2.Gantt.GridLine.Both)
    .TaskFields(ts => ts
        .Id("TaskID")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .BaselineStartDate("BaselineStartDate")
        .BaselineEndDate("BaselineEndDate")
        .ParentID("ParentID")
    )
    .SplitterSettings(ss => ss.ColumnIndex(3))
    .LabelSettings(ls => ls.TaskLabel("TaskName"))
    .BaselineTemplate("#baselineTemplate")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Add();
        col.Field("TaskName").HeaderText("Name").Width(270).Add();
        col.Field("BaselineStartDate").HeaderText("Baseline Start Date").Width(180).Add();
        col.Field("BaselineDuration").HeaderText("Baseline Duration").Width(180).Add();
        col.Field("BaselineStartDate1").HeaderText("Baseline1 Start Date").Width(180).Add();
        col.Field("BaselineDuration1").HeaderText("Baseline1 Duration").Width(180).Add();
        col.Field("BaselineStartDate2").HeaderText("Baseline2 Start Date").Width(180).Add();
        col.Field("BaselineDuration2").HeaderText("Baseline2 Duration").Width(180).Add();
    })
    .Render()

<script id="baselineTemplate" type="text/x-jsrender">
    {{:~renderBaselines(data)}}
</script>

<script>
    function renderBaselines(props) {
        if (props.hasChildRecords) return '';
        var ganttElem = document.getElementById("GanttContainer");
        if (!ganttElem || !ganttElem.ej2_instances || !ganttElem.ej2_instances[0]) return '';

        var gantt = ganttElem.ej2_instances[0];
        var taskRecord = props.taskData;
        var ganttProps = taskRecord.ganttProperties;
        var chartRowsModule = gantt.chartRowsModule;

        var baselineTop = chartRowsModule.baselineTop;
        var baselineHeight = chartRowsModule.baselineHeight;
        var taskBarHeight = chartRowsModule.taskBarHeight;
        var milestoneHeight = chartRowsModule.milestoneHeight;
        var milestoneMarginTop = chartRowsModule.milestoneMarginTop;
        var rowHeight = gantt.rowHeight;
        var renderBaseline = gantt.renderBaseline;
        var enableRtl = gantt.enableRtl;

        var taskSpacing = 9, baselineSpacing = 4;

        function getLeft(date) {
            return gantt.dataOperation.getTaskLeft(new Date(date), false, ganttProps.calendarContext);
        }
        function getWidth(start, duration) {
            if (!start || duration == null || duration === 0) return 0;
            var end = new Date(start);
            end.setDate(end.getDate() + duration);
            return getLeft(end) - getLeft(start);
        }
        function render(start, duration, index) {
            if (!start) return '';
            var left = getLeft(start);
            var width = getWidth(start, duration);
            if (duration === 0) {
                var milestoneSize = renderBaseline ? taskBarHeight : (taskBarHeight - 10);
                var baselineMilestoneHeight = renderBaseline ? 5 : 2;
                var leftPos = enableRtl
                    ? (left - (milestoneHeight / 2) + 3)
                    : (left - (milestoneHeight / 2) + 1);
                var marginTop =
                    (-Math.floor(rowHeight - milestoneMarginTop) + baselineMilestoneHeight) +
                    2 + (index * baselineSpacing);
                return `<div style="position:absolute;width:${milestoneSize}px;height:${milestoneSize}px;
                    transform:rotate(45deg);
                    ${enableRtl ? 'right' : 'left'}:${leftPos}px;
                    margin-top:${marginTop}px;"></div>`;
            }
            return `<div style="position:absolute;
                ${enableRtl ? 'right' : 'left'}:${left}px;
                margin-top:${baselineTop + (index * taskSpacing)}px;
                width:${width}px;height:${baselineHeight}px;"></div>`;
        }

        return `<div>
            ${render(taskRecord.taskData.BaselineStartDate, taskRecord.taskData.BaselineDuration, 0)}
            ${render(taskRecord.taskData.BaselineStartDate1, taskRecord.taskData.BaselineDuration1, 1)}
            ${render(taskRecord.taskData.BaselineStartDate2, taskRecord.taskData.BaselineDuration2, 2)}
        </div>`;
    }
</script>
```

## Baseline Milestone

Set `BaselineDuration = 0` to render a baseline as a diamond-shaped milestone:

```csharp
new GanttDataSource()
{
    TaskID = 5,
    TaskName = "Project Milestone",
    StartDate = new DateTime(2024, 05, 15),
    Duration = 0,
    BaselineStartDate = new DateTime(2024, 05, 14),
    BaselineDuration = 0,
    ParentID = 1
}
```

> **Note:** Set `BaselineDuration = 0` explicitly. Matching start/end dates without `BaselineDuration = 0` renders a 1-day baseline task.

## Combine with Other Features

Baseline works with filtering, sorting, selection, and export:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .RenderBaseline(true)
    .BaselineColor("#1e90ff")
    .AllowFiltering(true)
    .AllowSorting(true)
    .AllowSelection(true)
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .TaskFields(ts => ts
        .Id("TaskID")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .BaselineStartDate("BaselineStartDate")
        .BaselineEndDate("BaselineEndDate")
    )
    .Render()
```
