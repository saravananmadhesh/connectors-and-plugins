# Getting Started with ASP.NET MVC Kanban

This guide covers the initial setup and basic implementation of the Syncfusion ASP.NET MVC Kanban Board component.

## Prerequisites

**System Requirements:**
- Visual Studio 2013 or later
- .NET Framework 4.5 or later
- ASP.NET MVC 4 or MVC 5

For detailed system requirements, refer to the [Syncfusion ASP.NET MVC System Requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements).

## Creating ASP.NET MVC Application

You can create an ASP.NET MVC application using either:

1. **Microsoft Templates**: Use Visual Studio's built-in ASP.NET MVC project templates
2. **Syncfusion Extension**: Use the Syncfusion ASP.NET MVC Extension for Visual Studio

### Using Microsoft Templates

1. Open Visual Studio
2. File → New → Project
3. Select "ASP.NET Web Application (.NET Framework)"
4. Choose "MVC" template
5. Click OK

### Using Syncfusion Extension

If you have the Syncfusion Visual Studio Extension installed:
1. Open Visual Studio
2. Syncfusion → Essential Studio for ASP.NET MVC → Create New Syncfusion Project
3. Select Kanban from the component list
4. The extension automatically configures references and resources

## Installing NuGet Package

The Kanban control is available through the `Syncfusion.EJ2.MVC5` NuGet package.

**Steps:**
1. Right-click on your project in Solution Explorer
2. Select "Manage NuGet Packages..."
3. Browse for **Syncfusion.EJ2.MVC5**
4. Click Install

**Package Manager Console:**
```bash
Install-Package Syncfusion.EJ2.MVC5
```

**Dependencies:**
The `Syncfusion.EJ2.MVC5` package has the following dependencies:
- **Newtonsoft.Json** - For JSON serialization
- **Syncfusion.Licensing** - For license validation

These are automatically installed with the main package.

## Adding Namespace

Add the `Syncfusion.EJ2` namespace reference to `Web.config` in the `Views` folder:

**Location:** `~/Views/Web.config`

```xml
<configuration>
  <system.web.webPages.razor>
    <pages>
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Routing" />
        <add namespace="Syncfusion.EJ2" />  <!-- Add this line -->
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

## Adding Stylesheet and Script References

Add the Syncfusion theme and script references in your layout file.

**Location:** `~/Views/Shared/_Layout.cshtml`

**In `<head>` section:**

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My ASP.NET Application</title>
    
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/27.1.48/material.css" />
    
    <!-- Syncfusion JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2.min.js"></script>
</head>
```

**Available Themes:**
- Material: `material.css` / `material-dark.css`
- Bootstrap: `bootstrap5.css` / `bootstrap5-dark.css`
- Fabric: `fabric.css` / `fabric-dark.css`
- Fluent: `fluent.css` / `fluent-dark.css`
- Tailwind: `tailwind.css` / `tailwind-dark.css`

**Alternative Approaches:**
- **NPM Package**: Install `@syncfusion/ej2` and reference local files
- **Custom Resource Generator (CRG)**: Create optimized bundles with only required components

## Registering Script Manager

Register the Syncfusion Script Manager at the end of the `<body>` tag in your layout file.

**Location:** `~/Views/Shared/_Layout.cshtml`

**Before closing `</body>` tag:**

```razor
<body>
    @RenderBody()
    
    @Html.EJS().ScriptManager()
</body>
```

The Script Manager handles initialization and event wiring for all Syncfusion components on the page.

## Basic Kanban Implementation

Now add the Kanban component to your view with a minimal configuration.

**Controller:**

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

namespace YourNamespace.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
```

**View (`~/Views/Home/Index.cshtml`):**

```razor
@using Syncfusion.EJ2.Kanban

@(Html.EJS().Kanban("kanban")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .Render()
)
```

**Result:** An empty Kanban board with four columns is rendered.

## Populating Cards from Data Source

To display cards, bind data to the Kanban using the `DataSource` property.

**Model Class:**

```csharp
namespace YourNamespace.Models
{
    public class KanbanDataModel
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Summary { get; set; }
        public string Assignee { get; set; }
        public string Priority { get; set; }
        public int RankId { get; set; }
    }
}
```

**Controller with Data:**

```csharp
using System.Collections.Generic;
using System.Web.Mvc;
using YourNamespace.Models;

namespace YourNamespace.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.data = GetKanbanData();
            return View();
        }

        private List<KanbanDataModel> GetKanbanData()
        {
            return new List<KanbanDataModel>
            {
                new KanbanDataModel 
                { 
                    Id = 1, 
                    Status = "Open", 
                    Summary = "Analyze customer requirements", 
                    Assignee = "Nancy Davloio",
                    Priority = "High",
                    RankId = 1
                },
                new KanbanDataModel 
                { 
                    Id = 2, 
                    Status = "InProgress", 
                    Summary = "Fix UI bugs in login module", 
                    Assignee = "Andrew Fuller",
                    Priority = "Low",
                    RankId = 1
                },
                new KanbanDataModel 
                { 
                    Id = 3, 
                    Status = "Testing", 
                    Summary = "Test new features", 
                    Assignee = "Janet Leverling",
                    Priority = "Normal",
                    RankId = 1
                },
                new KanbanDataModel 
                { 
                    Id = 4, 
                    Status = "Close", 
                    Summary = "Validate product requirements", 
                    Assignee = "Nancy Davloio",
                    Priority = "High",
                    RankId = 2
                }
            };
        }
    }
}
```

**View with Data Binding:**

```razor
@model List<YourNamespace.Models.KanbanDataModel>

@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
)
```

**Key Properties Explained:**

- **KeyField** (`"Status"`): Maps to the data field that determines which column a card belongs to
- **DataSource**: The collection of card data
- **Columns**: Defines the columns with `KeyField` matching the data's Status values
- **CardSettings.HeaderField** (`"Id"`): Unique identifier displayed in card header
- **CardSettings.ContentField** (`"Summary"`): Main content displayed in card body

**Result:** Cards are rendered in their respective columns based on the `Status` field value.

## Enabling Swimlane

Swimlanes group cards horizontally by a specific field (e.g., Assignee, Priority, Team).

**View with Swimlane:**

```razor
@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee");
    })
    .Render()
)
```

**Result:** Cards are grouped into swimlane rows based on the `Assignee` field. Each assignee gets their own horizontal row showing their tasks across all columns.

## Running the Application

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the application without debugging.

The Kanban board will be rendered in your default web browser with:
- Four workflow columns (To Do, In Progress, Testing, Done)
- Cards populated from your data source
- Swimlane grouping (if enabled)
- Drag-and-drop functionality enabled by default

## Next Steps

After basic setup, explore:

- **Custom card templates**: For rich card layouts with images, tags, and formatted data
- **Remote data binding**: Connect to REST APIs, OData services, or Web APIs
- **Dialog customization**: Configure Add/Edit/Delete dialogs with custom fields
- **Events**: Handle user interactions like CardClick, DragStop, ActionComplete
- **Sorting and filtering**: Organize cards and control their order
- **Validation**: Set min/max card limits per column or swimlane

## Common Issues

**Issue: Namespace not found**
- Ensure `Syncfusion.EJ2` namespace is added to `Views/Web.config`
- Rebuild the solution after adding the namespace

**Issue: Styles not applied**
- Verify CDN links are correct and accessible
- Check browser console for 404 errors on CSS files
- Ensure you're using compatible theme and script versions

**Issue: Cards not rendering**
- Verify `KeyField` matches the data field name exactly (case-sensitive)
- Ensure column `KeyField` values match data values
- Check that `HeaderField` is unique for each card

**Issue: Script Manager not working**
- Confirm `@Html.EJS().ScriptManager()` is placed before `</body>` tag
- Only one Script Manager should be present per page
- Check browser console for JavaScript errors

## Sample GitHub Repository

For complete working examples, visit:
[ASP.NET MVC Kanban Getting Started Examples](https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/Kanban)
