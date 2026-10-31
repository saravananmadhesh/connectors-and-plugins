# Filtering — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Menu Filtering](#enable-menu-filtering)
- [Filter Hierarchy Modes](#filter-hierarchy-modes)
- [Filter Operators](#filter-operators)
- [Initial Filter on Load](#initial-filter-on-load)
- [Diacritics Filter](#diacritics-filter)
- [Filter a Column Dynamically](#filter-a-column-dynamically)
- [Clear Filtered Columns](#clear-filtered-columns)
- [Custom component in filter menu](#custom-component-in-filter-menu)
- [Excel-Like Filtering](#excel-like-filtering)
- [Toolbar Search](#toolbar-search)
- [Initial Search on Load](#initial-search-on-load)
- [Search Operators](#search-operators)
- [Search by External Button](#search-by-external-button)
- [Search Specific Columns](#search-specific-columns)
- [Clear Search by External Button](#clear-search-by-external-button)
- [Per-Column Filtering Control](#per-column-filtering-control)

---

## Overview

Filtering allows you to view specific or related records based on filter criteria. The Gantt control supports two independent filtering mechanisms:

- **Menu filtering** (`.AllowFiltering(true)`) — a per-column filter menu rendered based on column data type.
- **Excel-like filtering** (`.FilterSettings(f => f.Type(Syncfusion.EJ2.Gantt.FilterType.Excel))`) — a checkbox panel with sorting, clear filter, and advanced sub-menu.

Toolbar search (toolbar item `"Search"`) is a separate feature that searches across all bound columns using `SearchSettings`.

---

## Enable Menu Filtering

Set `.AllowFiltering(true)` on the Gantt builder to add filter icons to every column header:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowFiltering(true)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.DataSource = GanttData.ProjectNewData();
    return View();
}
```

> Setting `.AllowFiltering(false)` on a specific column definition prevents the filter menu for that column even when global filtering is enabled.

---

## Filter Hierarchy Modes

The `HierarchyMode` in `.FilterSettings()` determines which related rows (parents/children) are shown alongside matched records.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowFiltering(true)
    .FilterSettings(f => f.HierarchyMode(Syncfusion.EJ2.Gantt.FilterHierarchyMode.Both))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

Change `HierarchyMode` at runtime via JavaScript:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.filterSettings.hierarchyMode = 'Child';
ganttObj.clearFiltering();
```

**`HierarchyMode` options:**

| Value | Behavior |
|---|---|
| `Parent` (default) | Displays matched records together with their parent records |
| `Child` | Displays matched records together with their child records |
| `Both` | Displays matched records with both their parent and child records |
| `None` | Displays only the matched records with no parent or child expansion |

---

## Filter Operators

The following operators are available for column filters:

| Operator | Description | Supported Types |
|---|---|---|
| `startswith` | Checks whether the value begins with the specified value | String |
| `endswith` | Checks whether the value ends with the specified value | String |
| `contains` | Checks whether the value contains the specified value | String |
| `equal` | Checks whether the value is equal to the specified value | String, Number, Boolean, Date |
| `notequal` | Checks for values that are not equal to the specified value | String, Number, Boolean, Date |
| `greaterthan` | Checks whether the value is greater than the specified value | Number, Date |
| `greaterthanorequal` | Checks whether the value is greater than or equal to the specified value | Number, Date |
| `lessthan` | Checks whether the value is less than the specified value | Number, Date |
| `lessthanorequal` | Checks whether the value is less than or equal to the specified value | Number, Date |

> By default, the filter operator is `equal`.

---

## Initial Filter on Load

Apply filter criteria at initial rendering by passing a list of predicate objects to `.FilterSettings()`:

```cshtml
@{
    List<object> filterColumns = new List<object>();
    filterColumns.Add(new { field = "TaskName", matchCase = false, @operator = "startswith", predicate = "and", value = "Identify" });
    filterColumns.Add(new { field = "TaskId",   matchCase = false, @operator = "equal",      predicate = "and", value = 2 });
}

@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowFiltering(true)
    .FilterSettings(f => f.Columns(filterColumns))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

**Predicate object fields:**

| Field | Description |
|---|---|
| `field` | Column field name to filter |
| `matchCase` | Whether the filter is case-sensitive (`true` / `false`) |
| `operator` | Filter operator — use `@operator` in C# to escape the keyword |
| `predicate` | Logical combination: `"and"` or `"or"` |
| `value` | The value to filter against |

---

## Diacritics Filter

By default, the Gantt control ignores diacritic characters (accented characters such as é, ü, ñ). Set `IgnoreAccent(true)` on `.FilterSettings()` to include diacritic characters in filter matching:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowFiltering(true)
    .FilterSettings(f => f.IgnoreAccent(true))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

---

## Filter a Column Dynamically

Use the `filterByColumn` method to filter a specific column from JavaScript:

**Signature:** `filterByColumn(fieldName, filterOperator, filterValue)`

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.filterByColumn('TaskName', 'startswith', 'Iden');
```

---

## Clear Filtered Columns

Use the `clearFiltering` method to remove all active filter conditions:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.clearFiltering();
```

---

## Excel-Like Filtering

Enable Excel-style filter panels by setting `Type(Syncfusion.EJ2.Gantt.FilterType.Excel)` on `.FilterSettings()`. The Excel filter menu includes sorting options, a clear filter option, a checkbox list of unique column values, and a sub-menu for advanced filter conditions with AND/OR logic.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowFiltering(true)
    .FilterSettings(f => f.Type(Syncfusion.EJ2.Gantt.FilterType.Excel))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

> `FilterType.Menu` is the default. `FilterType.Excel` provides: sorting shortcuts, Select All / Deselect All checkboxes, a search box within the panel, and an advanced custom filter option.

---

## Toolbar Search

Add a search text box to the toolbar by including `"Search"` in the toolbar items list:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .Toolbar(new List<string>() { "Search" })
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

> By default, Gantt searches all bound column values. Use `SearchSettings.Fields` to restrict the search to specific columns.

---

## Initial Search on Load

Pre-apply a search at initial rendering using `.SearchSettings()`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .Toolbar(new List<string>() { "Search" })
    .SearchSettings(ss => ss
        .Fields(new string[] { "TaskName" })
        .Operator("contains")
        .Key("List")
        .IgnoreCase(true))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

**`.SearchSettings()` properties:**

| Property | Type | Description |
|---|---|---|
| `Key` | string | The initial search string to apply on load |
| `Operator` | string | Search operator — default is `contains` |
| `Fields` | string[] | Column field names to restrict the search scope |
| `IgnoreCase` | bool | When `true`, the search is case-insensitive |

---

## Search Operators

| Operator | Description |
|---|---|
| `startsWith` | Checks whether a value begins with the specified value |
| `endsWith` | Checks whether a value ends with the specified value |
| `contains` | Checks whether a value contains the specified value (default) |
| `equal` | Checks whether a value is equal to the specified value |
| `notEqual` | Checks for values that are not equal to the specified value |

---

## Search by External Button

Invoke the `search` method programmatically to trigger a search from an external button:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var val = document.getElementById('searchText').value;
ganttObj.search(val);
```

---

## Search Specific Columns

Restrict toolbar search to specific columns by defining the column field names in `.SearchSettings().Fields()`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .Toolbar(new List<string>() { "Search" })
    .SearchSettings(ss => ss.Fields(new string[] { "TaskName", "Duration" }))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

---

## Clear Search by External Button

Clear an active search by setting `searchSettings.key` to an empty string:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.searchSettings.key = '';
```

---

## Per-Column Filtering Control

Disable the filter menu for specific columns by setting `.AllowFiltering(false)` on a column definition. The filter icon will not appear for those columns even when global `.AllowFiltering(true)` is set:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowFiltering(true)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task Id").Width("100").AllowFiltering(false).Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").AllowFiltering(true).Add();
        col.Field("StartDate").HeaderText("Start Date").Width("150").AllowFiltering(true).Add();
        col.Field("Duration").HeaderText("Duration").Width("100").AllowFiltering(true).Add();
        col.Field("Progress").HeaderText("Progress").Width("100").AllowFiltering(false).Add();
    })
    .Render()
```

> The `AllowFiltering(false)` property on a column only suppresses the filter icon UI. Global `.AllowFiltering(true)` is still required on the Gantt for any column filtering to work.

---

## Custom component in filter menu

The `column.filter.ui` is used to add custom filter components to a particular column. To implement a custom filter UI, define the following functions:

- `create`: Creates a custom component.
- `write`: Wire events for a custom component.
- `read`: Read the filter value from the custom component.

In the following sample, a DropDownList is used as a custom component in the TaskName column.

```cshtml
@Html.EJS().Gantt("Gantt").DataSource((IEnumerable<object>)ViewBag.DataSource).Height("450px").TaskFields(ts => ts.Id("TaskId").Name(
        "TaskName").StartDate("StartDate").EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks")
        ).AllowFiltering(true).Columns(col =>
   {
       col.Field("TaskId").HeaderText("Task Id").Width("120").TextAlign(Syncfusion.EJ2.Gantt.TextAlign.Right).Add();
       col.Field("TaskName").HeaderText("Task Name").Width("150").Add();
       col.Field("StartDate").HeaderText("Start Date").Width("130").TextAlign(Syncfusion.EJ2.Gantt.TextAlign.Right).Format("yMd").Add();
       col.Field("EndDate").HeaderText("End Date").Width("120").TextAlign(Syncfusion.EJ2.Gantt.TextAlign.Right).Add();
       col.Field("Duration").HeaderText("Duration").Width("120").Add();
       col.Field("Progress").HeaderText("Progress").Width("120").Add();

   }).AllowPaging()Render()

<script>

var dropInstance;
function create (args) {
    var db = new ej2.DataManager(ProjectNewData);
    var flValInput = createElement('input', { className: 'flm-input' });
    args.target.appendChild(flValInput);
    dropInstance = new ej2.DropDownList({
        dataSource: new ej2.DataManager(ProjectNewData),
        fields: { text: 'TaskName', value: 'TaskName' },
        placeholder: 'Select a value',
        popupHeight: '200px'
    });
    dropInstance.appendTo(flValInput);
}
function write (args) {
    dropInstance.value = args.filteredValue;
}
function read (args) {
    args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance.value);
}

</script>
```
