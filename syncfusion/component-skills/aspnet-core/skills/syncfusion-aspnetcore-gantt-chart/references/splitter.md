# Splitter — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Set Splitter Position on Load](#set-splitter-position-on-load)
- [Splitter by Column Index](#splitter-by-column-index)
- [Splitter View Mode](#splitter-view-mode)
- [Change Splitter Position Dynamically](#change-splitter-position-dynamically)

---

## Overview

The splitter divides the Gantt Chart into the **TreeGrid section** (left) and the **Chart section** (right). Configure the splitter using the `<e-gantt-splittersettings>` child tag.

---

## Set Splitter Position on Load

Use the `position` property to set the TreeGrid section width as a percentage or pixel value:

```cshtml
@* By percentage *@
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-splittersettings position="40%"></e-gantt-splittersettings>
</ejs-gantt>

@* By pixel width *@
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-splittersettings position="400px"></e-gantt-splittersettings>
</ejs-gantt>
```

> Always use `<e-gantt-splittersettings>` as a child tag — **not** an inline property on `<ejs-gantt>`.

---

## Splitter by Column Index

Use the `columnIndex` property to place the splitter after a specific column (zero-based index):

```cshtml
@* Splitter placed after the 3rd column (index 2) *@
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"    headerText="ID"        width="60"></e-gantt-column>
        <e-gantt-column field="TaskName"  headerText="Task Name" width="250"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start"     width="120"></e-gantt-column>
        <e-gantt-column field="Duration"  headerText="Duration"  width="80"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-splittersettings columnIndex="2"></e-gantt-splittersettings>
</ejs-gantt>
```

---

## Splitter View Mode

Use the `view` property to show only the grid, only the chart, or both sections:

| Value | Description |
|-------|-------------|
| `Default` | Shows both TreeGrid and Chart sections |
| `Grid` | Shows only the TreeGrid section |
| `Chart` | Shows only the Chart section |

```cshtml
@* Show only the chart *@
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-splittersettings view="Chart"></e-gantt-splittersettings>
</ejs-gantt>
```

---

## Change Splitter Position Dynamically

Use `setSplitterPosition(value, type)` at runtime. The `type` parameter determines how `value` is interpreted:

| Type | Value | Example |
|------|-------|---------|
| `'position'` | Percentage or pixel string | `'50%'` or `'300px'` |
| `'columnIndex'` | Column index number | `2` |
| `'viewType'` | View mode string | `'Default'`, `'Grid'`, `'Chart'` |

```cshtml
<button onclick="setByPosition()">Set 50%</button>
<button onclick="setByIndex()">Set by Column</button>
<button onclick="setByView()">Grid Only</button>

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function setByPosition() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.setSplitterPosition('50%', 'position');
}
function setByIndex() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.setSplitterPosition(1, 'columnIndex');
}
function setByView() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.setSplitterPosition('Grid', 'viewType');
}
</script>
```
