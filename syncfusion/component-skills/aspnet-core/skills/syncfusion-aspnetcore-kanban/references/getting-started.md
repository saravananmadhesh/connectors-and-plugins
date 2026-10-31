# Getting Started with Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Installation](#installation)
- [Tag Helper Registration](#tag-helper-registration)
- [CDN Setup](#cdn-setup)
- [Minimal Kanban Board](#minimal-kanban-board)
- [Controller Setup](#controller-setup)
- [Swimlane Quickstart](#swimlane-quickstart)
- [License Registration](#license-registration)

## Installation

Install the NuGet package via Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

Or via .NET CLI:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

## Tag Helper Registration

Add to `Views/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This registers all `<ejs-*>` and `<e-*>` tag helpers for use in Razor views.

## CDN Setup

In `Views/Shared/_Layout.cshtml`, add inside `<head>`:

```html
<link href="https://cdn.syncfusion.com/ej2/27.1.48/fluent.min.css" rel="stylesheet" />
<script src="https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2.min.js"></script>
```

Add before the closing `</body>` tag:

```html
<ejs-scripts></ejs-scripts>
```

The `<ejs-scripts>` tag helper renders the required Syncfusion script initialization block.

## Minimal Kanban Board

**View (`Views/Home/Index.cshtml`):**

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Testing" keyField="Testing"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

**Key properties:**
- `keyField="Status"` — the data field used to route cards into columns
- `dataSource="@ViewBag.data"` — local data passed from controller
- Each `<e-kanban-column>` `keyField` matches a value in the `Status` field
- `headerField="Title"` is the unique card ID — it is mandatory

## Controller Setup

**`HomeController.cs`:**

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.data = new KanbanDataModels().KanbanTasks();
        return View();
    }
}
```

**`KanbanDataModels.cs`:**

```csharp
public class KanbanDataModels
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Status { get; set; }
    public string Summary { get; set; }
    public string Type { get; set; }
    public string Priority { get; set; }
    public string Tags { get; set; }
    public double Estimate { get; set; }
    public string Assignee { get; set; }
    public int RankId { get; set; }
    public string Color { get; set; }

    public List<KanbanDataModels> KanbanTasks()
    {
        List<KanbanDataModels> TaskDetails = new List<KanbanDataModels>();
        TaskDetails.Add(new KanbanDataModels {
            Id = "Task 1", Title = "Task - 29001", Status = "Open",
            Summary = "Analyze new requirements from the customer.",
            Type = "Story", Priority = "Low", Tags = "Analyze,Customer",
            Estimate = 3.5, Assignee = "Nancy Davloio", RankId = 1, Color = "#8b447a"
        });
        TaskDetails.Add(new KanbanDataModels {
            Id = "Task 2", Title = "Task - 29002", Status = "InProgress",
            Summary = "Improve application performance",
            Type = "Improvement", Priority = "Normal", Tags = "Improvement",
            Estimate = 6, Assignee = "Andrew Fuller", RankId = 1, Color = "#7d7297"
        });
        TaskDetails.Add(new KanbanDataModels {
            Id = "Task 3", Title = "Task - 29003", Status = "Testing",
            Summary = "Fix issues reported in the IE browser.",
            Type = "Bug", Priority = "Release Breaker", Tags = "IE",
            Estimate = 2.5, Assignee = "Janet Leverling", RankId = 2, Color = "#cc0000"
        });
        TaskDetails.Add(new KanbanDataModels {
            Id = "Task 4", Title = "Task - 29004", Status = "Close",
            Summary = "Analyze SQL server 2008 connection.",
            Type = "Story", Priority = "Release Breaker", Tags = "Grid,Sql",
            Estimate = 2, Assignee = "Andrew Fuller", RankId = 4, Color = "#8b447a"
        });
        return TaskDetails;
    }
}
```

## Swimlane Quickstart

Add `<e-kanban-swimlanesettings>` to group cards by a field (e.g., `Assignee`):

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"></e-kanban-swimlanesettings>
</ejs-kanban>
```

- `keyField="Assignee"` — groups rows by this data field value
- `textField="Assignee"` — the field whose value is shown as the swimlane row header

## License Registration

Register your Syncfusion license key at application startup:

**`Program.cs` (.NET 6+):**

```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
```

**`Startup.cs` (older .NET Core):**

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    // ...
}
```

A Community License is available free for qualifying companies and individuals at https://www.syncfusion.com/sales/products.
