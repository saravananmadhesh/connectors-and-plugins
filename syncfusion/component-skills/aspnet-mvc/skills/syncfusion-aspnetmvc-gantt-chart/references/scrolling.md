# Scrolling — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Responsive with the parent container](#responsive-with-the-parent-container)
- [Scroll to a Date](#scroll-to-a-date)
- [Scroll to a Task](#scroll-to-a-task)
- [Set Vertical Scroll Position](#set-vertical-scroll-position)
- [Update Chart Scroll Offset](#update-chart-scroll-offset)

---

## Overview

The Gantt Chart supports both horizontal (timeline) and vertical (rows) scrolling. Scrolling occurs automatically when content overflows the defined height or width. Set a fixed height to enable vertical scrolling:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Height("450px")
    .Width("600px")
    .Render()
```

---

## Responsive with the parent container

To make the Gantt fill its parent container, set both the `Width` and `Height` to `100%`.

Note: Setting `Height("100%")` requires the parent element to have an explicit height.

```cshtml
<div style="height:450px;">
    @Html.EJS().Gantt("gantt")
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
        .Height("100%")
        .Width("100%")
        .Render()
</div>
```

---

## Scroll to a Date

Programmatically scroll the timeline horizontally to bring a specific date into view using `scrollToDate()`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Height("450px")
    .Render()

<button onclick="scrollToDate()">Scroll to Date</button>

<script>
function scrollToDate() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.scrollToDate('03/10/2024');
}
</script>
```

> Accepts a date string (`'MM/DD/YYYY'`) or a JavaScript `Date` object.

---

## Scroll to a Task

Scroll the chart's horizontal scrollbar to bring a specific task into view by its ID:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.scrollToTask('5');
```

---

## Set Vertical Scroll Position

Set the vertical scroll position of the Gantt chart container using `setScrollTop()`:

```cshtml
<button onclick="scrollToRow()">Scroll to Row 10</button>

<script>
function scrollToRow() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.ganttChartModule.scrollObject.setScrollTop(400); // scroll 400px down
}
</script>
```

> `setScrollTop` accepts a pixel value representing the vertical offset.

---

## Update Chart Scroll Offset

Update both the horizontal (left) and vertical (top) scroll positions simultaneously using `updateChartScrollOffset()`:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.updateChartScrollOffset(200, 100); // left=200px, top=100px
```

> This sets both horizontal and vertical scroll positions in one call.
