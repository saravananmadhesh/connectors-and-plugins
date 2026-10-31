# Row Drag and Drop — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Row Drag and Drop](#enable-row-drag-and-drop)
- [Multiple Row Drag and Drop](#multiple-row-drag-and-drop)
- [Taskbar Drag and Drop Between Rows](#taskbar-drag-and-drop-between-rows)
- [Drag and Drop Events](#drag-and-drop-events)
- [Prevent Dragging a Specific Record](#prevent-dragging-a-specific-record)
- [Validate Drop Position](#validate-drop-position)
- [Prevent Reorder as Child](#prevent-reorder-as-child)
- [Programmatic Row Reordering](#programmatic-row-reordering)

---

## Overview

The Gantt Chart supports interactive row drag and drop, allowing users to rearrange task records by dragging rows and dropping them **above**, **below**, or as a **child** of another row. This feature is controlled by the `AllowRowDragAndDrop` property.

---

## Enable Row Drag and Drop

Set `AllowRowDragAndDrop(true)` to enable the drag-and-drop handle on each row. Users can then drag any row and drop it at any position in the hierarchy.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .AllowRowDragAndDrop(true)
    .HighlightWeekends(true)
    .TreeColumnIndex(1)
    .ProjectStartDate("03/24/2019")
    .ProjectEndDate("07/06/2019")
    .Height("450px")
    .Render()
```

**Drop positions available:**

| Position | Description |
|---|---|
| Above (TopSegment) | Drops the row as a sibling above the target row |
| Below (BottomSegment) | Drops the row as a sibling below the target row |
| Child (MiddleSegment) | Drops the row as a child of the target row |

---

## Multiple Row Drag and Drop

To drag multiple rows simultaneously, enable `SelectionSettings.Type = Multiple` along with `AllowRowDragAndDrop(true)`. Users can select multiple rows and drag them together.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .AllowRowDragAndDrop(true)
    .SelectionSettings(ss => ss.Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .Height("450px")
    .Render()
```

> Hold **Ctrl** or **Shift** to select multiple rows before dragging.

---

## Taskbar Drag and Drop Between Rows

Set `AllowTaskbarDragAndDrop(true)` in addition to `AllowRowDragAndDrop(true)` to enable row reordering by dragging the taskbar itself in the chart pane. Editing must also be enabled with `EditMode.Auto`.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .AllowRowDragAndDrop(true)
    .AllowTaskbarDragAndDrop(true)
    .EditSettings(es => es.AllowEditing(true).Mode(Syncfusion.EJ2.Gantt.EditMode.Auto))
    .Height("450px")
    .Render()
```

| Property | Required for taskbar drag | Description |
|---|---|---|
| `AllowRowDragAndDrop` | Yes | Enables the drag-and-drop feature |
| `AllowTaskbarDragAndDrop` | Yes | Allows dragging via the taskbar in chart pane |
| `EditSettings.AllowEditing` | Yes | Editing must be enabled |
| `EditSettings.Mode` | Yes | Set to `EditMode.Auto` |

---

## Drag and Drop Events

Use these events to hook into the drag-and-drop lifecycle and customise or cancel behaviour.

| Event | Trigger point |
|---|---|
| `RowDragStartHelper` | When the drag icon or row is first clicked — use to cancel drag |
| `RowDragStart` | When drag action begins |
| `RowDrag` | While dragging (continuous) |
| `RowDrop` | When the dragged row is dropped on a target — use to cancel drop or change position |

---

## Prevent Dragging a Specific Record

Use `RowDragStartHelper` and set `args.cancel = true` to prevent specific rows from being dragged. The following example prevents dragging of Task IDs 1–4 and all their children.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .AllowRowDragAndDrop(true)
    .RowDragStartHelper("rowDragStartHelper")
    .Height("450px")
    .Render()

<script>
function rowDragStartHelper(args) {
    var record = args.data[0] ? args.data[0] : args.data;
    var taskId = record.ganttProperties.taskId;
    if (taskId <= 4) {
        args.cancel = true;
    }
}
</script>
```

**`RowDragStartHelper` args properties:**

| Property | Type | Description |
|---|---|---|
| `args.data` | object/array | The dragged record(s) |
| `args.cancel` | boolean | Set to `true` to prevent drag |

---

## Validate Drop Position

Use `RowDrop` and set `args.cancel = true` to prevent dropping at specific positions. The example below prevents dropping a row as a child (i.e., onto a middleSegment).

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .AllowRowDragAndDrop(true)
    .RowDrop("rowDrop")
    .Height("450px")
    .Render()

<script>
function rowDrop(args) {
    if (args.dropPosition === 'middleSegment') {
        args.cancel = true;
    }
}
</script>
```

**`RowDrop` args properties:**

| Property | Type | Description |
|---|---|---|
| `args.dropPosition` | string | `"topSegment"`, `"bottomSegment"`, or `"middleSegment"` |
| `args.fromIndex` | number | Source row index |
| `args.dropIndex` | number | Target row index |
| `args.cancel` | boolean | Set to `true` to cancel the drop |

---

## Prevent Reorder as Child

Cancel the drop and use `reorderRows` to force the dropped row into a different position. In the example below, drops that would create a child relationship are redirected to be placed **above** the target row instead.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .AllowRowDragAndDrop(true)
    .RowDrop("rowDrop")
    .Height("450px")
    .Render()

<script>
function rowDrop(args) {
    if (args.dropPosition === 'middleSegment') {
        var ganttObj = document.getElementById('gantt').ej2_instances[0];
        args.cancel = true;
        ganttObj.reorderRows([args.fromIndex], args.dropIndex, 'above');
    }
}
</script>
```

---

## Programmatic Row Reordering

Use the `reorderRows` method to move rows programmatically (e.g., from a button click), without requiring the user to drag.

**Syntax:**
```javascript
ganttObj.reorderRows(fromIndexes, toIndex, position);
```

| Parameter | Type | Description |
|---|---|---|
| `fromIndexes` | number[] | Array of source row index values |
| `toIndex` | number | Index of the target row |
| `position` | string | `"above"`, `"below"`, or `"child"` |

**Example — Drop rows 1, 2, 3 as children of row 4 on button click:**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .AllowRowDragAndDrop(true)
    .Height("450px")
    .Render()

<button id="dynamicDrag">Drop records as child</button>

<script>
document.getElementById('dynamicDrag').addEventListener('click', function () {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.reorderRows([1, 2, 3], 4, 'child');
});
</script>
```
