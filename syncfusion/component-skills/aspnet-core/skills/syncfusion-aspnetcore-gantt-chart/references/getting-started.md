# Getting Started — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents

- [Prerequisites](#prerequisites)
- [NuGet Package Installation](#nuget-package-installation)
- [Add Tag Helper](#add-tag-helper)
- [Add Stylesheet and Script Resources](#add-stylesheet-and-script-resources)
- [Register Script Manager](#register-script-manager)
- [Create sample data](#create-sample-data)
- [Add Gantt Control](#add-gantt-control)
- [Mapping Task Fields](#mapping-task-fields)
- [Defining Columns](#defining-columns)
- [Enable Editing](#enable-editing)
- [Enable Filtering and Sorting](#enable-filtering-and-sorting)
- [Error Handling](#error-handling)

---

## Prerequisites

- ASP.NET Core 6.0 or later (Razor Pages or MVC)
- Visual Studio 2022+ or VS Code with C# extension

---

## NuGet Package Installation

Open Tools → NuGet Package Manager → Manage NuGet Packages for Solution, search for and install:

```
Syncfusion.EJ2.AspNet.Core
```

Or via Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

> The package depends on Newtonsoft.Json and Syncfusion.Licensing — both are installed automatically.

---

## Add Tag Helper

Open ~/Pages/_ViewImports.cshtml and add the Syncfusion EJ2 Tag Helper:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script Resources

In ~/Pages/Shared/_Layout.cshtml, add inside <head>:

```cshtml
<!-- Syncfusion ASP.NET Core Fluent theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<!-- Syncfusion ASP.NET Core scripts -->
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

> Other available themes: material.css, bootstrap5.css, tailwind.css, highcontrast.css. Replace fluent with the desired theme name.

---

## Register Script Manager

At the end of <body> in _Layout.cshtml, register the script manager:

```cshtml
<body>
    @RenderBody()
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Create sample data

Use a simple hierarchical task list. Each task must have a StartDate and either a Duration or an EndDate.

In ~/Pages/Index.cshtml.cs (Razor Pages), create a PageModel like this:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GanttSample.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        public List<GanttDataSource> GanttDataSourceCollection { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            GanttDataSourceCollection = GetTaskCollection();
        }

        private List<GanttDataSource> GetTaskCollection()
        {
            List<GanttDataSource> Tasks = new List<GanttDataSource>()
            {
                new GanttDataSource() { TaskId = 1, TaskName = "Project initiation", StartDate = new DateTime(2019, 04, 02), EndDate = new DateTime(2019, 04, 21) },
                new GanttDataSource() { TaskId = 2, TaskName = "Identify site location", StartDate = new DateTime(2019, 04, 02), Duration = 4, Progress = 50, ParentID = 1 },
                new GanttDataSource() { TaskId = 3, TaskName = "Perform soil test", StartDate = new DateTime(2019, 04, 02), Duration = 4, Progress = 50, ParentID = 1 },
                new GanttDataSource() { TaskId = 4, TaskName = "Soil test approval", StartDate = new DateTime(2019, 04, 02), Duration = 4, Progress = 50, ParentID = 1 },
                new GanttDataSource() { TaskId = 5, TaskName = "Project estimation", StartDate = new DateTime(2019, 04, 02), EndDate = new DateTime(2019, 04, 21) },
                new GanttDataSource() { TaskId = 6, TaskName = "Develop floor plan for estimation", StartDate = new DateTime(2019, 04, 04), Duration = 3, Progress = 50, ParentID = 5 },
                new GanttDataSource() { TaskId = 7, TaskName = "List materials", StartDate = new DateTime(2019, 04, 04), Duration = 3, Progress = 50, ParentID = 5 }
            };

            return Tasks;
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
        public int? ParentID { get; set; }
    }
}
```

---

## Add Gantt Control

In ~/Pages/Index.cshtml, add the Gantt Tag Helper and bind a data source:

```cshtml
<ejs-gantt id='Gantt' dataSource="Model.GanttDataSourceCollection" height="450px">
    <e-gantt-taskfields id="TaskId"
                        name="TaskName"
                        startDate="StartDate"
                        endDate="EndDate"
                        duration="Duration"
                        progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
</ejs-gantt>
```

Run the app (for example, Ctrl+F5 in Visual Studio). The Gantt chart will render in the browser.

---

## Mapping Task Fields

The taskFields property maps your data model fields to the Gantt control.

```cshtml
<e-gantt-taskfields
    id="TaskId"
    name="TaskName"
    startDate="StartDate"
    endDate="EndDate"
    duration="Duration"
    progress="Progress"
    parentID="ParentID">
</e-gantt-taskfields>
```

| Field | Description |
|---|---|
| `id` | Unique task identifier — **required for CRUD** |
| `name` | Task name displayed in tree column |
| `startDate` | Task start date |
| `endDate` | Task end date (optional if duration given) |
| `duration` | Task duration in days (or configured unit) |
| `progress` | Progress percentage (0–100) |
| `dependency` | Predecessor field for task relationships |
| `child` | Child collection field for hierarchical data |
| `parentID` | Parent ID field for flat/self-referential data |
| `resourceInfo` | Resource assignment field |
| `baselineStartDate` | Baseline start for comparison display |
| `baselineEndDate` | Baseline end for comparison display |

---

## Defining Columns

Customize which columns appear in the TreeGrid section.

```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" headerText="ID" width="60" textAlign="Right" isPrimaryKey="true"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="250"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date"></e-gantt-column>
        <e-gantt-column field="Duration" headerText="Duration" textAlign="Right"></e-gantt-column>
        <e-gantt-column field="Progress" headerText="Progress" textAlign="Right"
                        format="@("{0}%")"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

Key column properties:

- `field`: Maps to data model property
- `headerText`: Column header label
- `width`: Column width in pixels
- `textAlign`: Left | Right | Center
- `format`: Number/date format string
- `isPrimaryKey`: Set true on the ID column — required for CRUD operations

---

## Enable Editing

Enable editing using the `e-gantt-editsettings` element. You can also add built-in toolbar items via the `toolbar` attribute.

Full toolbar + edit settings example:

```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection" height="450px"
           toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true"
                          allowAdding="true"
                          allowDeleting="true"
                          allowTaskbarEditing="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

Cell editing only (inline):

```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" mode="Auto"></e-gantt-editsettings>
</ejs-gantt>
```

Dialog editing (dialog-based):

```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" mode="Dialog"></e-gantt-editsettings>
</ejs-gantt>
```

Taskbar editing only:

```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress" parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowTaskbarEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

Editing modes:

- `Auto` (default): Double-click tree cell → inline cell edit; double-click chart area → dialog
- `Dialog`: All edits open in a dialog
- Taskbar editing: Drag/resize taskbars when allowTaskbarEditing="true"

> Toolbar items for editing are passed as a List<string> on the toolbar attribute — not via <e-gantt-toolbar>/<e-toolbar-item> child tags. Valid built-in editing items: Add, Edit, Update, Delete, Cancel.

---

## Enable Filtering and Sorting

```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection"
           allowFiltering="true"
           allowSorting="true"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
</ejs-gantt>
```

- allowFiltering="true": Adds filter icons to column headers (menu-based by default)
- allowSorting="true": Click column headers to sort; Ctrl+click for multi-sort

---

## Error Handling

Use the actionFailure event to catch and display runtime errors:

```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection"
           actionFailure="onActionFailure" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function onActionFailure(args) {
    console.error("Gantt error:", args.error);
    alert("Error: " + args.error[0].message);
}
</script>
```

Common error scenarios caught by actionFailure:

- isPrimaryKey not set on any column (CRUD operations)
- Invalid duration values (non-numeric)
- Invalid dependency format (must be {number}{type} e.g. 2FS)
- Invalid date format in timeline tier settings
- Missing taskFields mapping
- Missing resourceFields mapping when resources are configured
