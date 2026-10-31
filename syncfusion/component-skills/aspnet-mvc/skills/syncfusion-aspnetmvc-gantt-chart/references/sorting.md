# Sorting — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Sorting](#enable-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [Initial Sort on Load](#initial-sort-on-load)
- [Sort a Column Dynamically](#sort-a-column-dynamically)
- [Clear All Sorting](#clear-all-sorting)
- [Sorting Events](#sorting-events)
- [Sort Custom Columns](#sort-custom-columns)
- [Per-Column Sort Control](#per-column-sort-control)
- [Touch Interaction](#touch-interaction)

---

## Overview

Sorting enables you to reorder Gantt data in ascending or descending order by clicking a column header. Click the same header again to toggle the direction. Multi-column sorting is also supported using keyboard modifiers.

Sorting is configured through `.AllowSorting(true)` on the Gantt builder and `.SortSettings()` for initial sort state.

---

## Enable Sorting

Set `.AllowSorting(true)` on the Gantt builder to enable column header click sorting:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSorting(true)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

> Columns are initially sorted in ascending order. Clicking an already-sorted column toggles the direction to descending. To disable sorting for a specific column, set `.AllowSorting(false)` on that column definition.

---

## Multi-Column Sorting

Sort by multiple columns simultaneously using keyboard shortcuts:

- **Ctrl + Click** a column header to add it to the current sort.
- **Shift + Click** a sorted column header to remove it from the multi-sort.

No additional configuration is needed — multi-column sorting is supported whenever `.AllowSorting(true)` is set.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSorting(true)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

---

## Initial Sort on Load

Apply sorting when the Gantt first renders using `.SortSettings()`. Pass multiple column descriptors to sort by more than one column:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSorting(true)
    .SortSettings(ss => ss
        .Columns(col =>
        {
            col.Field("TaskId").Direction(Syncfusion.EJ2.Gantt.SortDirection.Descending).Add();
            col.Field("TaskName").Direction(Syncfusion.EJ2.Gantt.SortDirection.Ascending).Add();
        }))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

> Use `Syncfusion.EJ2.Gantt.SortDirection` (not `Syncfusion.EJ2.Grids.SortDirection`) for the `Direction` enum.

---

## Sort a Column Dynamically

Use `sortModule.sortColumn(field, direction, isMultiSort)` to sort a column programmatically at runtime:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.sortModule.sortColumn('TaskId', 'Descending', false);
```

| Parameter | Type | Description |
|---|---|---|
| `field` | string | The column field name to sort |
| `direction` | `"Ascending"` \| `"Descending"` | Sort direction |
| `isMultiSort` | boolean | `true` to add to an existing multi-sort; `false` to replace current sort |

---

## Clear All Sorting

Call `clearSorting()` on the Gantt instance to remove all active sorts and restore the original data order:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.clearSorting();
```

---

## Sorting Events

The Gantt fires two events during a sort action:

- **`ActionBegin`** — triggers before the sort action starts.
- **`ActionComplete`** — triggers after the sort action completes.

Check `args.requestType` to identify the action — for sorting, the value is `"sorting"`.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSorting(true)
    .ActionBegin("actionHandler")
    .ActionComplete("actionHandler")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()

<script>
function actionHandler(args) {
    console.log(args.requestType + ' ' + args.type);
}
</script>
```

| Event | Trigger | Key `args` Properties |
|---|---|---|
| `ActionBegin` | Before sort starts | `requestType` (`"sorting"`), `columnName`, `direction` |
| `ActionComplete` | After sort completes | `requestType` (`"sorting"`), `columnName`, `direction` |

---

## Sort Custom Columns

Custom columns added via `.Columns()` support sorting in the same way as built-in columns — either via initial `SortSettings` or dynamically through `sortModule.sortColumn()`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSorting(true)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Columns(col =>
    {
        col.Field("TaskId").Width("150").Add();
        col.Field("TaskName").HeaderText("Job Name").Add();
        col.Field("StartDate").HeaderText("Start Date").Add();
        col.Field("Duration").HeaderText("Duration").Add();
        col.Field("Progress").HeaderText("Progress").Add();
        col.Field("CustomColumn").HeaderText("Custom Column").Add();
    })
    .Render()
```

```javascript
// Sort the custom column programmatically
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.sortModule.sortColumn('CustomColumn', 'Ascending', false);
```

> Custom columns of any data type (string, numeric, date) are sortable by default when `.AllowSorting(true)` is set on the Gantt.

---

## Per-Column Sort Control

Disable sorting on individual columns by setting `.AllowSorting(false)` on the column definition:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSorting(true)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Columns(col =>
    {
        col.Field("TaskId").AllowSorting(false).Add();
        col.Field("TaskName").AllowSorting(true).Add();
        col.Field("Duration").AllowSorting(true).Add();
    })
    .Render()
```

> Columns with `AllowSorting(false)` do not display sort indicators and do not respond to header clicks.

---

## Touch Interaction

On touch-screen devices, **tap** a column header to sort by that column. To perform multi-column sorting, a popup is displayed after the initial tap — tap the popup, then tap the additional column headers you want to include in the sort.

Touch interaction follows the same `AllowSorting` and `SortSettings` configuration as pointer-based sorting.
