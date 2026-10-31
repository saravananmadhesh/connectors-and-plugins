# Getting Started — Syncfusion ASP.NET Core TreeGrid

> **When to Use:** Setup TreeGrid for the first time. Read this first to install NuGet, register TagHelper, and bind basic data.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register TagHelper](#register-taghelper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Add TreeGrid Control](#add-treegrid-control)
- [Define Row Data](#define-row-data)
- [Define Columns](#define-columns)
- [Enable Paging, Sorting, Filtering](#enable-paging-sorting-filtering)
- [Error Handling](#error-handling)

---

## Prerequisites

- ASP.NET Core web application (Razor Pages or MVC)
- .NET 6+ / .NET 8+

---

## Install NuGet Package

In Visual Studio: **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.AspNet.Core` and install.

Or via Package Manager Console:

```csharp
// Package Manager Console
Install-Package Syncfusion.EJ2.AspNet.Core
```

---

## Register TagHelper

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC):

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml` (or `~/Views/Shared/_Layout.cshtml`), inside `<head>`:

```cshtml
<!-- Syncfusion ASP.NET Core controls styles -->
<link rel="stylesheet" href="cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<!-- Syncfusion ASP.NET Core controls scripts -->
<script src="cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

---

## Register Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

> Place `<ejs-scripts>` AFTER all page content to ensure all Syncfusion controls render before the script manager initializes them.

---

## Add TreeGrid Control

In `~/Pages/Index.cshtml`:

```cshtml
<ejs-treegrid id="TreeGrid">
</ejs-treegrid>
```

---

## Define Row Data

Bind an `IEnumerable` / `List<T>` to `dataSource`. Use `childMapping` to map the property containing child rows:

```cshtml
@{
    var data = TreeGridItems.GetTreeData();
}

<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children" treeColumnIndex="1">
</ejs-treegrid>
```

**Model class (`Index.cshtml.cs` or a shared class):**

```csharp
public class TreeGridItems
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public int Duration { get; set; }
    public List<TreeGridItems> Children { get; set; }

    public static List<TreeGridItems> GetTreeData()
    {
        return new List<TreeGridItems>
        {
            new TreeGridItems
            {
                TaskId = 1, TaskName = "Planning",
                StartDate = new DateTime(2016, 6, 7), Duration = 5,
                Children = new List<TreeGridItems>
                {
                    new TreeGridItems { TaskId = 2, TaskName = "Plan timeline", StartDate = new DateTime(2016, 6, 7), Duration = 5 },
                    new TreeGridItems { TaskId = 3, TaskName = "Plan budget",   StartDate = new DateTime(2016, 6, 7), Duration = 5 },
                    new TreeGridItems { TaskId = 4, TaskName = "Allocate resources", StartDate = new DateTime(2016, 6, 7), Duration = 5 }
                }
            },
            new TreeGridItems
            {
                TaskId = 6, TaskName = "Design",
                StartDate = new DateTime(2021, 8, 25), Duration = 3,
                Children = new List<TreeGridItems>
                {
                    new TreeGridItems { TaskId = 7, TaskName = "Software Specification", StartDate = new DateTime(2021, 8, 25), Duration = 3 },
                    new TreeGridItems { TaskId = 8, TaskName = "Develop prototype", StartDate = new DateTime(2021, 8, 25), Duration = 3 }
                }
            }
        };
    }
}
```

---

## Define Columns

Columns are defined with `<e-treegrid-columns>` / `<e-treegrid-column>`. If omitted, columns auto-generate from the data source.

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"    headerText="Task ID"    isPrimaryKey="true" textAlign="Right" width="95"></e-treegrid-column>
        <e-treegrid-column field="TaskName"  headerText="Task Name"  width="220"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="115"></e-treegrid-column>
        <e-treegrid-column field="Duration"  headerText="Duration"   textAlign="Right" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Key column properties:
- `field` — maps to model property name
- `headerText` — column title
- `textAlign` — Left (default), Right, Center
- `format` — `yMd`, `C2`, `N2`, etc.
- `type` — `string`, `number`, `boolean`, `date`, `datetime`
- `isPrimaryKey` — required for editing/deleting rows

---

## Enable Paging, Sorting, Filtering

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children" treeColumnIndex="1"
              allowSorting="true" allowFiltering="true" allowPaging="true">
    <e-treegrid-pagesettings pageSize="5"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="95"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="220"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Error Handling

Use the `actionFailure` event to catch and display runtime configuration errors:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children" treeColumnIndex="1"
              actionFailure="onActionFailure">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="95"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="220"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onActionFailure(args) {
        console.error('Error: ' + args.error[0]);
    }
</script>
```

**Configuration Errors & Solutions:**

| Error Scenario | Cause | Solution |
|---|---|---|
| CRUD fails on first row only | `isPrimaryKey` not mapped | Ensure `isPrimaryKey="true"` on unique ID column |
| Paging + virtualization conflict | Both enabled simultaneously | Disable one: `allowPaging="false"` OR `enableVirtualization="false"` |
| isFrozen + frozenColumns error | Both properties set | Use either `isFrozen` on columns OR `frozenColumns` count, not both |
| idMapping + childMapping error | Both data-binding modes set | Use ONLY `childMapping` (nested) OR `idMapping`+`parentIdMapping` (flat), never both |
| `treeColumnIndex` produces error | Index ≥ column count | Set index 0-based within total column count |
| Detail template not showing | Combined with virtualization | Remove either `detailTemplate` or `enableVirtualization` |
| Freeze + rowTemplate error | Frozen columns with row template | Remove `frozenRows`/`frozenColumns` when using `rowTemplate` |
| Freeze + cell editing error | Frozen + cell edit mode | Use row editing instead of cell editing |
| Selection not working | Used with `rowTemplate` | Remove `rowTemplate` to enable selection |
| Edit right-align fails | `textAlign="Right"` on tree column | Remove right-align from tree column only |
| Stacked header + column reorder | Freeze incompatible with reorder | Disable `allowReordering` when using frozen stacked header |
| Checkbox not displayed | Not in tree column | Move `showCheckbox="true"` to the tree column only |
| No data renders | Missing `dataSource` or `columns` | Provide at least `dataSource` (columns auto-generate if omitted) |
| No height/width in % | Using percentages with virtualization | Use pixel values (e.g. `height="400"`) with virtualization |
| Default filter not working | Wrong `filterType` on column | Ensure column `filterType` matches grid `filterSettings type` |
