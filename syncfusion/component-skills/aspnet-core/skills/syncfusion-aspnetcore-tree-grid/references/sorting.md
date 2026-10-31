# Sorting — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Basic Sorting](#basic-sorting)
- [Initial Sort on Load](#initial-sort-on-load)
- [Sort Events](#sort-events)
- [Disable Sorting Per Column](#disable-sorting-per-column)
- [Programmatic Sort & Clear](#programmatic-sort--clear)

---

## When to Use This Skill

Use this reference when you need to:
- Enable column header sorting for users
- Set default sort order on initial load
- Implement multi-column sort functionality
- Hook into sort lifecycle events (before/after sort)
- Disable sorting on specific columns
- Programmatically sort or clear sort via JavaScript
- Sort hierarchical data while preserving parent-child relationships

---

## Overview

Sorting reorders rows by column values (Ascending or Descending). Click a column header to sort; click again to toggle direction. Multi-column sort by holding **CTRL** and clicking additional headers; clear a column's sort by holding **SHIFT** and clicking it.

Enable sorting by setting `allowSorting="true"` on `<ejs-treegrid>`.

---

## Basic Sorting

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowSorting="true"
              childMapping="subTasks" treeColumnIndex="1" allowPaging="true">
    <e-treegrid-columns>
        <e-treegrid-column field="category"  headerText="Category"   width="90"></e-treegrid-column>
        <e-treegrid-column field="orderName" headerText="Order Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="orderDate" headerText="Order Date" textAlign="Right" format="yMd" width="90"></e-treegrid-column>
        <e-treegrid-column field="units"     headerText="Units"      textAlign="Right" width="80"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

> Columns sort in **Ascending** order by default. Clicking an already-sorted column toggles to Descending.

---

## Initial Sort on Load

Pre-sort columns when the TreeGrid first renders using `e-treegrid-sortsettings`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowSorting="true"
              childMapping="subTasks" treeColumnIndex="1">
    <e-treegrid-sortsettings>
        <e-treegrid-sortsettings-columns>
            <e-treegrid-sortsettings-column field="category" direction="Ascending"></e-treegrid-sortsettings-column>
        </e-treegrid-sortsettings-columns>
    </e-treegrid-sortsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="category"  headerText="Category"   width="90"></e-treegrid-column>
        <e-treegrid-column field="orderName" headerText="Order Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="units"     headerText="Units"      textAlign="Right" width="80"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Sort Events

`actionBegin` fires before sort starts; `actionComplete` fires after sort completes. Use these to hook custom logic:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowSorting="true"
              childMapping="subTasks" treeColumnIndex="1"
              actionBegin="onActionBegin" actionComplete="onActionComplete">
    <e-treegrid-columns>
        <e-treegrid-column field="category"  headerText="Category"   width="90"></e-treegrid-column>
        <e-treegrid-column field="orderName" headerText="Order Name" width="180"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onActionBegin(args) {
        if (args.requestType === 'sorting') {
            console.log('Sorting started on: ' + args.columnName);
        }
    }

    function onActionComplete(args) {
        if (args.requestType === 'sorting') {
            console.log('Sorting completed. Direction: ' + args.direction);
        }
    }
</script>
```

> `args.requestType` equals `'sorting'` during sort actions.

---

## Disable Sorting Per Column

Set `allowSorting="false"` on a specific column to prevent users from sorting it:

```cshtml
<e-treegrid-column field="TaskId"   headerText="Task ID"   allowSorting="false" width="90"></e-treegrid-column>
<e-treegrid-column field="TaskName" headerText="Task Name" allowSorting="true"  width="190"></e-treegrid-column>
```

---

## Programmatic Sort & Clear

Invoke methods on the TreeGrid instance:

```cshtml
<button onclick="sortGrid()">Sort by Category</button>
<button onclick="clearSort()">Clear Sort</button>

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowSorting="true"
              childMapping="subTasks" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="category"  headerText="Category"   width="90"></e-treegrid-column>
        <e-treegrid-column field="orderName" headerText="Order Name" width="180"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function sortGrid() {
        document.getElementById('TreeGrid').ej2_instances[0].sortColumn('category', 'Ascending');
    }

    function clearSort() {
        document.getElementById('TreeGrid').ej2_instances[0].clearSorting();
    }
</script>
```

---

## Touch Interaction

On touch devices, tapping a column header sorts it. A multi-sort popup appears for sorting multiple columns simultaneously. Tap the multi-sort popup icon then tap column headers in desired order.
