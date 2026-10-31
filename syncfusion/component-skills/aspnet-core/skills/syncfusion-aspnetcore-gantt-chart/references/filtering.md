````markdown
# Filtering - Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Menu Filtering](#enable-menu-filtering)
- [Filter Hierarchy Modes](#filter-hierarchy-modes)
- [Filter Operators](#filter-operators)
- [Initial Filter on Load](#initial-filter-on-load)
- [Diacritics Filter](#diacritics-filter)
- [Filter a Column Dynamically](#filter-a-column-dynamically)
- [Clear Filtered Columns](#clear-filtered-columns)
- [Custom Component in Filter Menu](#custom-component-in-filter-menu)
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

- **Menu filtering** (`allowFiltering="true"`) - a per-column filter menu rendered based on column data type
- **Excel-like filtering** (`filterSettings.type="Excel"`) - checkbox panel with sorting, clear filter, and advanced sub-menu

Toolbar search (`toolbar` item `"Search"`) is a separate feature that searches across all bound columns using the `SearchSettings` property.

Set `allowFiltering="true"` to enable filtering. Configure filter behavior via `FilterSettings` and search behavior via `SearchSettings`.

---

## Enable Menu Filtering

Set `allowFiltering="true"` on the Gantt to add filter icons to every column header. Clicking the icon opens a filter menu rendered based on that column's data type.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.dataSource = GanttData.ProjectNewData();
    return View();
}
```

> Setting `columns.allowFiltering="false"` on a specific column prevents rendering the filter menu for that column even when global filtering is enabled.

---

## Filter Hierarchy Modes

The Gantt control supports hierarchy filtering modes controlled by `filterSettings.hierarchyMode`. This determines which related rows (parents/children) are shown alongside matched records.

```cshtml
<ejs-dropdownlist id="mode" dataSource="@ViewBag.dropdata" width="250px"
    placeholder="Select a Mode" change="onModeChange" index="0" popupHeight="220px">
    <e-dropdownlist-fields text="mode" value="id"></e-dropdownlist-fields>
</ejs-dropdownlist>

<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function onModeChange(e) {
        var ganttObj = document.getElementById("Gantt").ej2_instances[0];
        var mode = e.value;
        ganttObj.filterSettings.hierarchyMode = mode;
        ganttObj.clearFiltering();
    }
</script>
```

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.dataSource = GanttData.ProjectNewData();
    ViewBag.dropdata = new List<object>() {
        new { id = "Parent", mode = "Parent" },
        new { id = "Child",  mode = "Child"  },
        new { id = "Both",   mode = "Both"   },
        new { id = "None",   mode = "None"   },
    };
    return View();
}
```

**`hierarchyMode` options:**

| Value | Behavior |
|---|---|
| `Parent` (default) | Displays matched records together with their parent records. If matched records have no parent, only matched records are shown. |
| `Child` | Displays matched records together with their child records. If matched records have no children, only matched records are shown. |
| `Both` | Displays matched records with both their parent and child records. If no related records exist, only matched records are shown. |
| `None` | Displays only the matched records with no parent or child expansion. |

> Change the mode at runtime by assigning a new value to `ganttObj.filterSettings.hierarchyMode` then calling `clearFiltering()` to reapply.

---

## Filter Operators

The filter operator for a column can be defined in `filterSettings.columns.operator`. The following operators and their supported data types are available:

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

> By default, the `filterSettings.columns.operator` value is `equal`.

---

## Initial Filter on Load

Apply filter criteria at initial rendering by setting predicate objects in `filterSettings.columns`. Use a `List<object>` of anonymous C# objects and pass it via `columns="filterColumns"` on `<e-gantt-filterSettings>`.

```cshtml
@{
    List<object> filterColumns = new List<object>();
    filterColumns.Add(new { field = "TaskName", matchCase = false, @operator = "startswith", predicate = "and", value = "Identify" });
    filterColumns.Add(new { field = "TaskId",   matchCase = false, @operator = "equal",      predicate = "and", value = 2 });
}

<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-filterSettings columns="filterColumns"></e-gantt-filterSettings>
</ejs-gantt>
```

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.dataSource = GanttData.ProjectNewData();
    return View();
}
```

**Predicate object fields:**

| Field | Description |
|---|---|
| `field` | Column field name to filter |
| `matchCase` | Whether the filter is case-sensitive (`true` / `false`) |
| `operator` | Filter operator — use `@operator` in C# to escape the keyword |
| `predicate` | Logical combination: `"and"` or `"or"` |
| `value` | The value to filter against |

> There are no `<e-filtersettings-columns>` / `<e-filtersettings-column>` child tags. Pass the list directly via `columns="filterColumns"`.

---

## Diacritics Filter

By default, the Gantt control ignores diacritic characters (accented characters such as é, ü, ñ) while filtering. Set `filterSettings.ignoreAccent="true"` to include diacritic characters in filter matching.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-filterSettings ignoreAccent="true"></e-gantt-filterSettings>
</ejs-gantt>
```

> When `ignoreAccent="true"`, typing **Perform** in the TaskName column will also match **Perförm** and other diacritic variants.

---

## Filter a Column Dynamically

Use the `filterByColumn` method to filter a specific column from JavaScript — for example, from an external button click.

**Signature:** `filterByColumn(fieldName, filterOperator, filterValue)`

```cshtml
<ejs-button id="filter" content="Filter TaskName column" cssClass="e-primary"></ejs-button>

<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    document.getElementById('filter').addEventListener('click', function (args) {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.filterByColumn('TaskName', 'startswith', 'Iden');
    });
</script>
```

---

## Clear Filtered Columns

Use the `clearFiltering` method to remove all active filter conditions from the Gantt control.

```cshtml
<ejs-button id="clearFilter" content="Clear Filter" cssClass="e-primary"></ejs-button>

<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    document.getElementById('clearFilter').addEventListener('click', function (args) {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.clearFiltering();
    });
</script>
```

---

## Custom Component in Filter Menu

Use `column.filter.ui` to replace the default filter input with a custom UI component for a specific column. Define it with the `<e-filter>` tag inside `<e-gantt-column>` using a `<ui>` child that references three required JavaScript handler functions.

| Handler | Description |
|---|---|
| `create` | Creates the custom component and appends it to the filter menu target |
| `write` | Wires events on the component and sets the current filtered value |
| `read` | Reads the filter value from the component and calls `filterByColumn` |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" headerText="Task Id" width="120"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" textAlign="Right" width="100">
            <e-filter>
                <ui create="create" write="write" read="read"></ui>
            </e-filter>
        </e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date" width="120"></e-gantt-column>
        <e-gantt-column field="EndDate" headerText="End Date" width="100"></e-gantt-column>
        <e-gantt-column field="Duration" headerText="Duration" width="100"></e-gantt-column>
        <e-gantt-column field="Progress" headerText="Progress" width="100"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>

<script>
var dropInstance;

function create(args) {
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

function write(args) {
    dropInstance.value = args.filteredValue;
}

function read(args) {
    args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance.value);
}
</script>
```

> In the example above, a DropDownList is used as the custom filter component on the **TaskName** column. The `read` function uses `args.fltrObj.filterByColumn` to trigger filtering with the selected dropdown value.

---

## Excel-Like Filtering

Enable Excel-style filter panels by setting `filterSettings.type="Excel"`. The Excel filter menu includes sorting options, a clear filter option, a checkbox list of unique column values, and a sub-menu for advanced filter conditions with AND/OR logic.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-filterSettings type="Excel"></e-gantt-filterSettings>
</ejs-gantt>
```

> `filterSettings.type` accepts `"Menu"` (default) or `"Excel"`. The Excel filter panel provides: sorting shortcuts, Select All / Deselect All checkboxes, a search box within the panel, and an advanced custom filter option.

---

## Toolbar Search

Add a search text box to the toolbar by including `"Search"` in the toolbar items list. Users can type any text to instantly search across all bound column values.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
    toolbar="@(new List<string>() { "Search" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.dataSource = GanttData.ProjectNewData();
    return View();
}
```

> By default, Gantt searches all bound column values. Use `searchSettings.fields` to restrict the search to specific columns.

---

## Initial Search on Load

Pre-apply a search at initial rendering using `<e-gantt-searchsettings>`. Set `fields`, `operator`, `key`, and `ignoreCase` to configure the initial search behavior.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
    toolbar="@(new List<string>() { "Search" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-searchsettings fields="@(new string[] { "TaskName" })"
        operator="contains" key="List" ignoreCase="true">
    </e-gantt-searchsettings>
</ejs-gantt>
```

**`<e-gantt-searchsettings>` attributes:**

| Attribute | Type | Description |
|---|---|---|
| `key` | string | The initial search string to apply on load |
| `operator` | string | Search operator — default is `contains` |
| `fields` | string[] | Column field names to restrict the search scope |
| `ignoreCase` | bool | When `true`, the search is case-insensitive |

> By default, `SearchSettings.Fields` is not set and Gantt searches all bound columns. Define `fields` to customize which columns participate in the search.

---

## Search Operators

The search operator is configured in `searchSettings.operator`. The following operators are supported:

| Operator | Description |
|---|---|
| `startsWith` | Checks whether a value begins with the specified value |
| `endsWith` | Checks whether a value ends with the specified value |
| `contains` | Checks whether a value contains the specified value |
| `equal` | Checks whether a value is equal to the specified value |
| `notEqual` | Checks for values that are not equal to the specified value |

> The default `searchSettings.operator` value is `contains`.

---

## Search by External Button

Invoke the `search` method programmatically to trigger a search from an external button. Pass the search key string as the parameter.

```cshtml
<input type="text" id="searchText" />
<ejs-button id="Search" content="Search Gantt" cssClass="e-primary"></ejs-button>

<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    document.getElementById('Search').addEventListener('click', function (args) {
        var val = document.getElementById('searchText').value;
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.search(val);
    });
</script>
```

---

## Search Specific Columns

Restrict toolbar search to specific columns by defining the column field names in `searchSettings.fields`. By default, all bound columns are searched.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
    toolbar="@(new List<string>() { "Search" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-searchSettings fields="@(new string[] { "TaskName", "Duration" })">
    </e-gantt-searchSettings>
</ejs-gantt>
```

> In this example only `TaskName` and `Duration` column values are searched. All other columns are excluded from search matching.

---

## Clear Search by External Button

Clear an active search from an external button by setting `searchSettings.key` to an empty string.

```cshtml
<ejs-button id="clear" content="Clear Search" cssClass="e-primary"></ejs-button>

<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
    toolbar="@(new List<string>() { "Search" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-searchsettings fields="@(new string[] { "TaskName" })"
        operator="contains" key="Perform" ignoreCase="true">
    </e-gantt-searchsettings>
</ejs-gantt>

<script>
    document.getElementById('clear').addEventListener('click', function (args) {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.searchSettings.key = "";
    });
</script>
```

---

## Per-Column Filtering Control

Disable the filter menu for specific columns by setting `allowFiltering="false"` on `<e-gantt-column>`. The filter icon will not appear for those columns even when global `allowFiltering="true"` is set.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"    headerText="Task Id"    allowFiltering="false" width="100"></e-gantt-column>
        <e-gantt-column field="TaskName"  headerText="Task Name"  allowFiltering="true"  width="250"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date" allowFiltering="true"  width="150"></e-gantt-column>
        <e-gantt-column field="Duration"  headerText="Duration"   allowFiltering="true"  width="100"></e-gantt-column>
        <e-gantt-column field="Progress"  headerText="Progress"   allowFiltering="false" width="100"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

> The `allowFiltering` property on `<e-gantt-column>` only suppresses the filter icon UI. Global `allowFiltering="true"` is still required on the Gantt for any column filtering to work.

````