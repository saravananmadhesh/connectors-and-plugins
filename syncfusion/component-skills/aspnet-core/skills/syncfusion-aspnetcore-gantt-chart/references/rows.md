``markdown
# Rows — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Row Height](#row-height)
- [Collapse All Tasks at Load](#collapse-all-tasks-at-load)
- [Define Expand/Collapse State per Task](#define-expandcollapse-state-per-task)
- [Customize Expand/Collapse Action](#customize-expandcollapse-action)
- [Customize Row Appearance](#customize-row-appearance)
- [Styling Alternate Rows](#styling-alternate-rows)
- [Row Spanning](#row-spanning)
- [Customize Rows and Cells with Events](#customize-rows-and-cells-with-events)
- [Clip Mode for Overflow Content](#clip-mode-for-overflow-content)

---

## Overview

Rows in the Gantt Chart represent individual task records from the data source. Each row maps to a task and renders in both the TreeGrid (grid pane) and the chart (taskbar pane). You can control row height, expand/collapse state, appearance, and cell overflow behaviour.

---

## Row Height

Set the rowHeight property (in pixels) to change the height of all rows uniformly at load time.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" rowHeight="60">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
         endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
`

| Property | Type | Default | Description |
|---|---|---|---|
| 
| rowHeight | number | 36 | Height of each row in pixels |

---

## Collapse All Tasks at Load

Set collapseAllParentTasks="true" to render all parent tasks in a collapsed state when the Gantt chart first loads.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" collapseAllParentTasks="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
         endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
`

> By default all parent tasks are rendered in the expanded state. The toolbar **Collapse All** / **Expand All** items and the collapseAll() / expandAll() methods can also be used at runtime.

---

## Define Expand/Collapse State per Task

Use the 	askFields.expandState mapping to control the initial expanded/collapsed state of each parent task individually. Map it to a boolean field in your data source.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
         endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks" expandState="isExpand">
    </e-gantt-taskfields>
</ejs-gantt>
`

**Data source field example (C#):**
`csharp
public bool isExpand { get; set; }
// true  → task renders expanded
// false → task renders collapsed
`

---

## Customize Expand/Collapse Action

The following events fire during expand and collapse operations. Set args.cancel = true to prevent the action for specific records.

| Event | Trigger point |
|---|---|
| expanding | Before a row expands |
| expanded | After a row expands |
| collapsing | Before a row collapses |
| collapsed | After a row collapses |

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           collapsing="collapsing" expanding="expanding">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
         endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function collapsing(args) {
        if (args.data.TaskId == 1) // prevent collapsing Task ID 1
            args.cancel = true;
    }
    function expanding(args) {
        if (args.data.TaskId == 5) // prevent expanding Task ID 5
            args.cancel = true;
    }
</script>
`

---

## Customize Row Appearance

Use the rowDataBound event (grid side) and queryTaskbarInfo event (chart side) together to apply custom styles to specific rows.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           queryTaskbarInfo="queryTaskbarInfo" rowDataBound="rowDataBound">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
         endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function rowDataBound(args) {
        if (args.data['TaskId'] == 4) {
            args.row.style.background = 'cyan';
        }
    }
    function queryTaskbarInfo(args) {
        if (args.data['TaskId'] == 4) {
            args.rowElement.style.background = 'cyan';
        }
    }
</script>
`

| Event | Scope | Useful for |
|---|---|---|
| 
| rowDataBound | Grid pane (TreeGrid) | Styling grid row cells |
| queryTaskbarInfo | Chart pane (taskbar area) | Styling taskbar row background |

---

## Styling Alternate Rows

Override the built-in CSS classes to apply a custom background colour to every second row in both the grid and chart panes.

`css
.e-altrow, tr.e-chart-row:nth-child(even) {
    background-color: #f2f2f2;
}
`

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
         endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<style>
    .e-altrow, tr.e-chart-row:nth-child(even) {
        background-color: #f2f2f2;
    }
</style>
`

| CSS class | Applies to |
|---|---|
| .e-altrow | Alternate rows in the grid pane |
| tr.e-chart-row:nth-child(even) | Alternate rows in the chart pane |

---

## Row Spanning

Use the rowSpan attribute inside the queryCellInfo event to span a cell across multiple rows in the TreeGrid pane. This is useful for grouping related rows visually.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" queryCellInfo="queryCellInfo">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
         endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function queryCellInfo(args) {
        if (args.data['TaskId'] == 4 && args.column.field === 'TaskName') {
            args.rowSpan = 2;
        }
    }
</script>
`

> In the example above, the **TaskName** cell for Task ID 4 spans two rows.

---

## Customize Rows and Cells with Events

The rowDataBound and queryCellInfo events fire for every row and cell respectively during TreeGrid rendering. Use them for fine-grained row/cell customisation.

| Event | Args object | Use case |
|---|---|---|
| 
| rowDataBound | args.data, args.row | Apply row-level classes or inline styles |
| queryCellInfo | args.data, args.column, args.cell | Apply cell-level styles, add attributes, span rows |

---

## Clip Mode for Overflow Content

Control how overflowing text is displayed in grid cells using the clipMode property on individual columns.

| Clip Mode | Behaviour |
|---|---|
| Clip | Truncates cell content at the boundary |
| Ellipsis | Shows ... when text overflows |
| EllipsisWithTooltip | Shows ... and a tooltip on hover (default) |

> The default clipMode for all columns is EllipsisWithTooltip.

**Column definition example:**
`cshtml
<e-gantt-columns>
    <e-gantt-column field="TaskName" headerText="Task Name" clipMode="EllipsisWithTooltip"></e-gantt-column>
</e-gantt-columns>
`

---