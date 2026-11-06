# Paging — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Basic Paging](#basic-paging)
- [Page Size Mode](#page-size-mode)
- [Page Size Dropdown](#page-size-dropdown)
- [Pager Template](#pager-template)
- [Render Pager at Top](#render-pager-at-the-top)
- [Pager Events](#pager-events)

## When to Use This Skill

Use this reference when you need to:
- Display large datasets in manageable pages
- Control the number of rows per page
- Let users change page size dynamically via dropdown
- Customize pager UI with templates
- Handle paging events and page navigation
- Show total record counts and current page information
- Use different page size modes (All vs Root)
- Render pager at top or bottom of grid

## Overview

Paging breaks large datasets into smaller pages with a navigation bar at the bottom (or top). Enable paging by setting `allowPaging="true"` on `<ejs-treegrid>`. Configure options with `<e-treegrid-pagesettings>`.

---

## Basic Paging

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowPaging="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-pagesettings pageSize="7"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"    headerText="Task ID"    textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName"  headerText="Task Name"  width="190"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration"  headerText="Duration"   textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Page Size Mode

Control what the `pageSize` count refers to with `pageSizeMode`:

| Mode | Behavior |
|------|----------|
| `All` | Default. `pageSize` is the total count of records (including children) per page |
| `Root` | `pageSize` is the count of root-level (0th level) records per page |

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowPaging="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-pagesettings pageSize="3" pageSizeMode="Root"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

With `Root` mode, only root-level rows count toward `pageSize`; child rows expand within the same page.

---

## Page Size Dropdown

Let users dynamically change the number of records per page:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowPaging="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-pagesettings pageSize="7" pageSizes="true"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Or supply a custom list of options:
```cshtml
<e-treegrid-pagesettings pageSize="7" pageSizes="@(new int[] { 5, 10, 20, 50 })"></e-treegrid-pagesettings>
```

---

## Pager Template

Replace the default pager UI with custom elements. Access `CurrentPage`, `PageSize`, `PageCount`, `TotalPage`, `TotalRecordCount`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowPaging="true"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-pagesettings pageSize="7" template="#pagerTemplate"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script id="pagerTemplate" type="text/x-template">
    <div>
        Page ${CurrentPage} of ${TotalPage} — Total: ${TotalRecordCount}
    </div>
</script>
```

---

## Render Pager at the Top

By default the pager renders at the bottom. Move it to the top using the `dataBound` event:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" allowPaging="true"
              childMapping="Children" treeColumnIndex="1" dataBound="onDataBound">
    <e-treegrid-pagesettings pageSize="7"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onDataBound() {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        var pager = grid.element.querySelector('.e-gridpager');
        grid.element.insertBefore(pager, grid.element.firstChild);
    }
</script>
```

---

## Pager Events

| Event | Description |
|-------|-------------|
| `created` | Fires when the pager is created |
| `click` | Fires when a page number is clicked |
| `dropDownChanged` | Fires when the page size dropdown changes |

> Paging is NOT compatible with virtual scrolling. Enabling both simultaneously results in a runtime error.
