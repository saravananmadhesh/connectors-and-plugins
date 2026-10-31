# Getting Started – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Add Namespace](#add-namespace)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Add Gantt to a View](#add-gantt-to-a-view)
- [TaskFields Mapping](#taskfields-mapping)
- [Defining Columns](#defining-columns)
- [Enable Editing](#enable-editing)
- [Enable Filtering and Sorting](#enable-filtering-and-sorting)
- [Enable Dependencies and Resources](#enable-dependencies-and-resources)
- [Error Handling](#error-handling)

---

## Prerequisites

- ASP.NET MVC 5 project (Visual Studio)
- .NET Framework 4.5+
- NuGet package manager

---

## Install NuGet Package

In Visual Studio: **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**

Search for and install: **Syncfusion.EJ2.MVC5**

```
Install-Package Syncfusion.EJ2.MVC5
```

This package includes `Newtonsoft.Json` and `Syncfusion.Licensing` as dependencies.

---

## Add Namespace

In `Views/Web.config`, add the Syncfusion namespace:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

---

## Add Stylesheet and Script

In `~/Views/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<head>
    <!-- Syncfusion EJ2 theme (choose one: material, bootstrap5, fluent, tailwind) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/29.1.33/fluent.css" />
    <!-- Syncfusion EJ2 scripts -->
    <script src="https://cdn.syncfusion.com/ej2/29.1.33/dist/ej2.min.js"></script>
</head>
```

> Replace `29.1.33` with your installed package version. Available themes: `material.css`, `bootstrap5.css`, `fluent.css`, `tailwind.css`, `highcontrast.css`.

---

## Register Script Manager

At the **end of `<body>`** in `_Layout.cshtml`:

```cshtml
<body>
    @RenderBody()
    <!-- Must be at end of body -->
    @Html.EJS().ScriptManager()
</body>
```

> Missing `ScriptManager()` causes components to silently not render.

---

## Add Gantt to a View

**Controller (`HomeController.cs`):**

```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.GanttData = GetGanttData();
        return View();
    }

    public static List<GanttDataSource> GetGanttData()
    {
        var data = new List<GanttDataSource>();

        var record1 = new GanttDataSource
        {
            TaskId = 1, TaskName = "Project Initiation",
            StartDate = new DateTime(2024, 4, 2), EndDate = new DateTime(2024, 4, 21),
            SubTasks = new List<GanttDataSource>()
        };
        record1.SubTasks.Add(new GanttDataSource { TaskId = 2, TaskName = "Identify site location", StartDate = new DateTime(2024, 4, 2), Duration = 4, Progress = 70 });
        record1.SubTasks.Add(new GanttDataSource { TaskId = 3, TaskName = "Perform soil test", StartDate = new DateTime(2024, 4, 2), Duration = 4, Progress = 50 });
        record1.SubTasks.Add(new GanttDataSource { TaskId = 4, TaskName = "Soil test approval", StartDate = new DateTime(2024, 4, 2), Duration = 4, Progress = 50 });

        var record2 = new GanttDataSource
        {
            TaskId = 5, TaskName = "Project Estimation",
            StartDate = new DateTime(2024, 4, 2), EndDate = new DateTime(2024, 4, 21),
            SubTasks = new List<GanttDataSource>()
        };
        record2.SubTasks.Add(new GanttDataSource { TaskId = 6, TaskName = "Develop floor plan", StartDate = new DateTime(2024, 4, 4), Duration = 3, Progress = 70 });
        record2.SubTasks.Add(new GanttDataSource { TaskId = 7, TaskName = "List materials", StartDate = new DateTime(2024, 4, 4), Duration = 3, Progress = 50 });

        data.Add(record1);
        data.Add(record2);
        return data;
    }
}

public class GanttDataSource
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public string Predecessor { get; set; }
    public int[] ResourceId { get; set; }
    public List<GanttDataSource> SubTasks { get; set; }
}
```

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Height("450px")
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .Child("SubTasks")
    )
    .Render()
```

---

## TaskFields Mapping

`TaskFields` maps your C# model properties to the Gantt's required fields:

| TaskFields Property | Description | Required |
|---|---|---|
| `Id` | Unique task identifier | ✅ Yes |
| `Name` | Task name displayed in grid | ✅ Yes |
| `StartDate` | Task start date | Recommended |
| `EndDate` | Task end date | Optional |
| `Duration` | Task duration (in days by default) | Optional |
| `Progress` | Progress percentage (0–100) | Optional |
| `Dependency` | Predecessor string e.g. `"2FS"` | Optional |
| `Child` | Child tasks property (hierarchical) | Hierarchical only |
| `ParentID` | Parent task ID field (flat data) | Flat data only |
| `ResourceInfo` | Resource IDs assigned to task | Optional |
| `Manual` | Boolean for custom task mode | Optional |
| `BaselineStartDate` | Planned start for baseline | Optional |
| `BaselineEndDate` | Planned end for baseline | Optional |

---

## Defining Columns

Customize the grid columns displayed alongside the taskbar chart:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Columns(col => {
        col.Field("TaskId").HeaderText("ID").Width("60").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
        col.Field("StartDate").HeaderText("Start Date").Format("yMd").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
        col.Field("Progress").HeaderText("Progress").Width("100").Add();
    })
    .Render()
```

---

## Enable Editing

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EditSettings(es => es
        .AllowEditing(true)
        .AllowAdding(true)
        .AllowDeleting(true)
        .AllowTaskbarEditing(true)   // drag taskbar to change dates
        .Mode(Syncfusion.EJ2.Gantt.EditMode.Auto)  // Auto = cell; Dialog = dialog
    )
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel" })
    .Render()
```

Editing modes:
- `Auto` — double-click tree grid cell to edit; double-click chart to open dialog
- `Dialog` — always opens edit dialog on double-click

---

## Enable Filtering and Sorting

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .AllowFiltering(true)
    .AllowSorting(true)
    .Toolbar(new List<string> { "Search" })
    .Render()
```

---

## Enable Dependencies and Resources

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Dependency("Predecessor")
        .ResourceInfo("ResourceId")
        .Child("SubTasks")
    )
    .Render()
```

---

## Error Handling

The `ActionFailure` event fires for invalid data configurations:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .ActionFailure("onActionFailure")
    .Render()

<script>
function onActionFailure(args) {
    console.error('Gantt error:', args.error);
    alert('Gantt error: ' + args.error[0].message);
}
</script>
```

**Common `ActionFailure` triggers:**
- Invalid duration value (non-numeric)
- Invalid dependency string format
- Missing `isPrimaryKey` / `Id` mapping
- Invalid date format in timeline tiers
- Missing `hasChildMapping` in load-on-demand
- Missing `day` property in `EventMarkers`
