# Sorting — Syncfusion ASP.NET Core Gantt Chart

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

Sorting options are configured through the `allowSorting` property on `<ejs-gantt>` and `<e-gantt-sortsettings>`.

---

## Enable Sorting

Set `allowSorting="true"` on `<ejs-gantt>` to enable column header click sorting:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> - Gantt columns are initially sorted in ascending order. Clicking an already-sorted column toggles the direction to descending.
> - To disable sorting for a specific column, set `allowSorting="false"` on that `<e-gantt-column>`.

---

## Multi-Column Sorting

Sort by multiple columns simultaneously using keyboard shortcuts:

- **Ctrl + Click** a column header to add it to the current sort.
- **Shift + Click** a sorted column header to remove it from the multi-sort.

No additional configuration is needed — multi-column sorting is supported whenever `allowSorting="true"` is set.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Initial Sort on Load

Apply sorting when the Gantt first renders by passing a `List<GanttSortDescriptor>` to the `columns` attribute on `<e-gantt-sortsettings>`:

```cshtml
@{
    List<GanttSortDescriptor> cols = new List<GanttSortDescriptor>();
    cols.Add(new GanttSortDescriptor { Field = "TaskId",   Direction = Syncfusion.EJ2.Gantt.SortDirection.Descending });
    cols.Add(new GanttSortDescriptor { Field = "TaskName", Direction = Syncfusion.EJ2.Gantt.SortDirection.Ascending });
}

<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-sortsettings columns="cols"></e-gantt-sortsettings>
</ejs-gantt>
```

> - Use `List<GanttSortDescriptor>` with typed `Field` and `Direction` properties.
> - `Direction` values: `Syncfusion.EJ2.Gantt.SortDirection.Ascending` and `Syncfusion.EJ2.Gantt.SortDirection.Descending`.
> - Pass the list via `columns="cols"` on `<e-gantt-sortsettings>`. There are no `<e-sortsettings-columns>` / `<e-sortsettings-column>` child tags.

---

## Sort a Column Dynamically

Use `sortModule.sortColumn(field, direction, isMultiSort)` to sort a column programmatically at runtime:

```cshtml
<ejs-button id="Sort" content="Sort TaskId Column" cssClass="e-primary"></ejs-button>

<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    document.getElementById('Sort').addEventListener('click', function () {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.sortModule.sortColumn('TaskId', 'Descending', false);
    });
</script>
```

| Parameter | Type | Description |
|---|---|---|
| `field` | string | The column field name to sort |
| `direction` | `"Ascending"` \| `"Descending"` | Sort direction |
| `isMultiSort` | boolean | `true` to add to an existing multi-sort; `false` to replace current sort |

---

## Clear All Sorting

Call `clearSorting()` on the Gantt instance to remove all active sorts and restore the original data order:

```cshtml
<ejs-button id="clearSort" content="Clear Sorting" cssClass="e-primary"></ejs-button>

<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    document.getElementById('clearSort').addEventListener('click', function () {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.clearSorting();
    });
</script>
```

---

## Sorting Events

The Gantt fires two events during a sort action:

- **`actionBegin`** — triggers before the sort action starts.
- **`actionComplete`** — triggers after the sort action completes.

Check `args.requestType` to identify the action — for sorting, the value is `"sorting"`.

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px"
           allowSorting="true"
           actionBegin="actionHandler" actionComplete="actionHandler">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function actionHandler(args) {
        alert(args.requestType + ' ' + args.type);
    }
</script>
```

| Event | Trigger | Key `args` Properties |
|---|---|---|
| `actionBegin` | Before sort starts | `requestType` (`"sorting"`), `columnName`, `direction` |
| `actionComplete` | After sort completes | `requestType` (`"sorting"`), `columnName`, `direction` |

---

## Sort Custom Columns

Custom columns added via `<e-gantt-columns>` support sorting in the same way as built-in columns — either via initial `sortSettings` or dynamically through `sortModule.sortColumn()`:

```cshtml
<ejs-button id="Sort" content="Sort Custom Column" cssClass="e-primary"></ejs-button>

<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="150"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Job Name"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date"></e-gantt-column>
        <e-gantt-column field="Duration" headerText="Duration"></e-gantt-column>
        <e-gantt-column field="Progress" headerText="Progress"></e-gantt-column>
        <e-gantt-column field="CustomColumn" headerText="Custom Column"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>

<script>
    document.getElementById('Sort').addEventListener('click', function () {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.sortModule.sortColumn('CustomColumn', 'Ascending', false);
    });
</script>
```

> Custom columns of any type (string, numeric, date, etc.) are sortable by default when `allowSorting="true"` is set on the Gantt. Initial sort via `sortSettings` also applies to custom columns.

---

## Per-Column Sort Control

Disable sorting on individual columns by setting `allowSorting="false"` on `<e-gantt-column>`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.dataSource" height="450px" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"   allowSorting="false"></e-gantt-column>
        <e-gantt-column field="TaskName" allowSorting="true"></e-gantt-column>
        <e-gantt-column field="Duration" allowSorting="true"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

> Columns with `allowSorting="false"` do not display sort indicators and do not respond to header clicks.

---

## Touch Interaction

On touch-screen devices, **tap** a column header to sort by that column. To perform multi-column sorting, a popup is displayed after the initial tap — tap the popup, then tap the additional column headers you want to include in the sort.

Touch interaction follows the same `allowSorting` and `sortSettings` configuration as pointer-based sorting.
