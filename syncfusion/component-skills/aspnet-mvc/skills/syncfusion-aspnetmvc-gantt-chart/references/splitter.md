# Splitter — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Set Splitter by Position](#set-splitter-by-position)
- [Set Splitter by Column Index](#set-splitter-by-column-index)
- [Set Splitter View](#set-splitter-view)
- [Programmatic Splitter Control](#programmatic-splitter-control)

---

## Overview

The splitter divides the Gantt into two panels: the tree grid (left) and the chart (right). The position of the splitter determines how much width each panel takes. Users can drag the splitter bar at runtime to resize the panels.

---

## Set Splitter by Position

Set the grid width as a percentage or pixel value using `Position`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .SplitterSettings(ss => ss.Position("40%"))
    .Height("450px")
    .Render()
```

> `Position` accepts percentage strings (`"40%"`) or pixel values (`"500px"`).

---

## Set Splitter by Column Index

Set the splitter position to split after a specific column using `ColumnIndex`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .SplitterSettings(ss => ss.ColumnIndex(2))
    .Height("450px")
    .Render()
```

> `ColumnIndex` is 0-based. `ColumnIndex(2)` splits the view after the third column.

---

## Set Splitter View

Use `View` to show only the grid, only the chart, or both panels:

```cshtml
@* Show only the chart panel *@
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .SplitterSettings(ss => ss.View(Syncfusion.EJ2.Gantt.SplitterView.Chart))
    .Height("450px")
    .Render()
```

| View Value | Description |
|---|---|
| `SplitterView.Default` | Both grid and chart panels visible (default) |
| `SplitterView.Grid` | Only the tree grid panel is visible |
| `SplitterView.Chart` | Only the chart timeline panel is visible |

---

## Programmatic Splitter Control

Adjust the splitter position at runtime using `setSplitterPosition()`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Height("450px")
    .Render()

<button onclick="moveByPercent()">Set 50%</button>
<button onclick="moveByColumn()">Split after col 3</button>

<script>
function moveByPercent() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.setSplitterPosition('50%', 'position');
}

function moveByColumn() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.setSplitterPosition(3, 'columnIndex');
}
</script>
```

**`setSplitterPosition` signature:**

```javascript
ganttObj.setSplitterPosition(value, type);
```

| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number` | Position value — percentage string or column index number |
| `type` | `string` | `"position"` or `"columnIndex"` |
