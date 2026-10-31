# Filtering — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Basic Filtering](#basic-filtering)
- [Filter Types](#filter-types)
- [Filter Hierarchy Modes](#filter-hierarchy-modes)
- [Initial Filter](#initial-filter)
- [Filter Operators](#filter-operators)
- [Excel-Like Filter](#excel-like-filter)
- [Filter Menu](#filter-menu)
- [Disable Filter Per Column](#disable-filter-per-column)
- [Programmatic Filter & Clear](#programmatic-filter--clear)

## When to Use This Skill

Use this reference when you need to:
- Allow users to filter data by column values
- Show/hide rows based on conditions
- Use different filter UI styles (FilterBar, Menu, Excel-like)
- Control parent/child row relationships during filtering
- Apply filters programmatically via JavaScript
- Disable filters on specific columns
- Set initial filters on page load
- Use custom filter operators (startsWith, endsWith, contains, etc.)

---

## Basic Filtering

Enable filtering by setting `allowFiltering="true"` on the TreeGrid. By default, a filter bar appears below the column headers.

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowFiltering="true"
              childMapping="Children" treeColumnIndex="1" allowPaging="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"    textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name"  width="190"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"   textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Filter Types

Set `type` in `e-treegrid-filtersettings` to change the filter UI style:

| Type | Description |
|------|-------------|
| `FilterBar` | Default. Input boxes below headers |
| `Menu` | Dropdown menu with condition builder |
| `Excel` | Excel-like checkbox filter |

```cshtml
<!-- Menu filter -->
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowFiltering="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-filtersettings type="Menu"></e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

> Do NOT mix FilterBar type at the grid level with a different `filterType` on individual columns — this causes a runtime error.

---

## Filter Hierarchy Modes

Control how filtered records relate to their parent/child rows with `hierarchyMode` in `e-treegrid-filtersettings`:

| Mode | Behavior |
|------|----------|
| `Parent` | (Default) Shows filtered records with their parent rows |
| `Child` | Shows filtered records with their child rows |
| `Both` | Shows filtered records with both parent and child rows |
| `None` | Shows only the filtered records |

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowFiltering="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-filtersettings hierarchyMode="Child"></e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Initial Filter

Apply a filter predicate when the grid first renders using `columns` in `e-treegrid-filtersettings`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowFiltering="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-filtersettings>
        <e-treegrid-filtersettings-columns>
            <e-treegrid-filtersettings-column field="Duration" matchCase="false"
                                             operator="LessThan" predicate="And" value="4">
            </e-treegrid-filtersettings-column>
        </e-treegrid-filtersettings-columns>
    </e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Filter Operators

| Operator | Description | Supported Types |
|----------|-------------|-----------------|
| `StartsWith` | Begins with value | String |
| `EndsWith` | Ends with value | String |
| `Contains` | Contains value | String |
| `Equal` | Equals value | String, Number, Boolean, Date |
| `NotEqual` | Not equal | String, Number, Boolean, Date |
| `GreaterThan` | Greater than | Number, Date |
| `GreaterThanOrEqual` | Greater than or equal | Number, Date |
| `LessThan` | Less than | Number, Date |
| `LessThanOrEqual` | Less than or equal | Number, Date |

Default operator is `Equal`.

---

## Excel-Like Filter

Excel-like filter provides a checkbox list with search and custom filter condition UI:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowFiltering="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-filtersettings type="Excel"></e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority"  width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Filter Menu

Menu filter shows a filter dialog per column with operator selector and value input:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowFiltering="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-filtersettings type="Menu"></e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Disable Filter Per Column

Set `allowFiltering="false"` on a specific column:

```cshtml
<e-treegrid-column field="TaskId"   headerText="Task ID"   allowFiltering="false" width="90"></e-treegrid-column>
<e-treegrid-column field="TaskName" headerText="Task Name" allowFiltering="true"  width="190"></e-treegrid-column>
```

---

## Programmatic Filter & Clear

```cshtml
<button onclick="filterGrid()">Filter Duration < 4</button>
<button onclick="clearFilters()">Clear Filters</button>

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowFiltering="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function filterGrid() {
        document.getElementById('TreeGrid').ej2_instances[0].filterByColumn('Duration', 'lessthan', 4);
    }

    function clearFilters() {
        document.getElementById('TreeGrid').ej2_instances[0].clearFiltering();
    }
</script>
```
