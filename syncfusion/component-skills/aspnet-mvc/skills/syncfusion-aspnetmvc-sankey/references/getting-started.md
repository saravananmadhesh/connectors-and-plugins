# Getting Started with Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [NuGet Package Installation](#nuget-package-installation)
- [Configuration](#configuration)
  - [Step 1: Add Namespace in Web.config](#step-1-add-namespace-in-webconfig)
  - [Step 2: Add Script Resources (CDN)](#step-2-add-script-resources-cdn)
  - [Step 3: Register Script Manager](#step-3-register-script-manager)
- [Basic Initialization](#basic-initialization)
  - [Step 1: Create Data Models](#step-1-create-data-models)
  - [Step 2: Create Controller Action](#step-2-create-controller-action)
  - [Step 3: Create View](#step-3-create-view)
- [Data Structure](#data-structure)
  - [Required Properties](#required-properties)
  - [Data Format Examples](#data-format-examples)
  - [Data Binding Methods](#data-binding-methods)
- [Rendering the Chart](#rendering-the-chart)
  - [Complete Working Example](#complete-working-example)
  - [Verifying Successful Initialization](#verifying-successful-initialization)

---

## Installation

### Prerequisites

Before you begin, ensure your system meets these requirements:
- .NET Framework 4.5 or higher
- Visual Studio 2015 or later
- ASP.NET MVC 5 or higher

### NuGet Package Installation

1. Open **NuGet Package Manager** in Visual Studio.
2. Go to: **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
3. Search for: `Syncfusion.EJ2.MVC5`
4. Click **Install**

Alternatively, use the Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 33.1.44
```

**Dependencies Installed:**
- `Syncfusion.Licensing` - For license key validation
- `Newtonsoft.Json` - For JSON serialization
- `Syncfusion.EJ2.MVC5` - Main control library

---

## Configuration

### Step 1: Add Namespace in Web.config

Open `Web.config` in the `Views` folder and add the Syncfusion namespace:

```xml
<configuration>
  <appSettings>
    <!-- Other app settings -->
  </appSettings>

  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" />
    <pages>
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Routing" />
        <add namespace="Syncfusion.EJ2" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

### Step 2: Add Script Resources (CDN)

Add the Syncfusion theme and script references in `~/Views/Shared/_Layout.cshtml` inside the `<head>` tag:

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewBag.Title - Sankey Chart Demo</title>

    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent.css" />

    <!-- Syncfusion JS -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**Available CDN Themes:**
- `material.css` - Material theme
- `bootstrap.css` - Bootstrap 3 theme
- `bootstrap4.css` - Bootstrap 4 theme
- `fluent.css` - Fluent theme
- `tailwind.css` - Tailwind theme

### Step 3: Register Script Manager

Add the Syncfusion `ScriptManager` at the **end** of the `<body>` tag in `_Layout.cshtml`:

```html
<body>
    @RenderBody()

    <!-- Syncfusion Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

The `ScriptManager` should be added once in the layout so Syncfusion controls on the page are initialized properly.

---

## Basic Initialization

### Step 1: Create Data Models

For Syncfusion ASP.NET MVC Sankey, the supported data-binding pattern uses **two collections**:
- **Nodes** for the Sankey stages or entities
- **Links** for the flow connections between nodes

Create model classes in your `Models` folder:

```csharp
// File: ~/Models/SankeyNode.cs
namespace SankeyChartDemo.Models
{
    public class SankeyNode
    {
        public string Id { get; set; }
        public string Color { get; set; }
    }
}
```

```csharp
// File: ~/Models/SankeyLink.cs
namespace SankeyChartDemo.Models
{
    public class SankeyLink
    {
        public string SourceId { get; set; }
        public string TargetId { get; set; }
        public double Value { get; set; }
    }
}
```

### Step 2: Create Controller Action

Create a controller method that provides sample node and link data separately:

```csharp
// File: ~/Controllers/HomeController.cs

using System.Collections.Generic;
using System.Web.Mvc;
using SankeyChartDemo.Models;

namespace SankeyChartDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var sankeyNodes = new List<SankeyNode>
            {
                new SankeyNode { Id = "Product A", Color = "#4F46E5" },
                new SankeyNode { Id = "Product B", Color = "#7C3AED" },
                new SankeyNode { Id = "Product C", Color = "#0891B2" },
                new SankeyNode { Id = "Product D", Color = "#059669" },
                new SankeyNode { Id = "Online Sales", Color = "#EA580C" },
                new SankeyNode { Id = "Retail Sales", Color = "#DC2626" },
                new SankeyNode { Id = "Revenue", Color = "#374151" }
            };

            var sankeyLinks = new List<SankeyLink>
            {
                new SankeyLink { SourceId = "Product A", TargetId = "Online Sales", Value = 150 },
                new SankeyLink { SourceId = "Product B", TargetId = "Online Sales", Value = 120 },
                new SankeyLink { SourceId = "Product C", TargetId = "Retail Sales", Value = 100 },
                new SankeyLink { SourceId = "Product D", TargetId = "Retail Sales", Value = 90 },
                new SankeyLink { SourceId = "Online Sales", TargetId = "Revenue", Value = 270 },
                new SankeyLink { SourceId = "Retail Sales", TargetId = "Revenue", Value = 190 }
            };

            ViewBag.SankeyNodes = sankeyNodes;
            ViewBag.SankeyLinks = sankeyLinks;

            return View();
        }
    }
}
```

### Step 3: Create View

Create the view in `~/Views/Home/Index.cshtml`:

```cshtml
@using Syncfusion.EJ2

@{
    ViewBag.Title = "Sankey Chart Demo";
}

<div style="margin: 20px;">
    <h2>Product Sales Flow - Sankey Chart</h2>

    <div style="width: 100%; height: 600px;">
        @Html.EJS().Sankey("sankey")
            .Width("100%")
            .Height("600px")
            .Title("Sales Flow Visualization")
            .Nodes(ViewBag.SankeyNodes)
            .Links(ViewBag.SankeyLinks)
            .Tooltip(t => t.Enable(true))
            .LegendSettings(l => l.Visible(true))
            .Render()
    </div>
</div>
```

---

## Data Structure

### Required Properties

The ASP.NET MVC Sankey structure uses **node data** and **link data** as separate collections.

**Node model**
```csharp
public class SankeyNode
{
    public string Id { get; set; }      // Required: Unique node identifier
    public string Color { get; set; }   // Optional: Individual node color
}
```

**Link model**
```csharp
public class SankeyLink
{
    public string SourceId { get; set; } // Required: Source node id
    public string TargetId { get; set; } // Required: Target node id
    public double Value { get; set; }    // Required: Link weight/value
}
```

### Data Format Examples

**Example 1: Product Sales Flow**
```csharp
var sankeyNodes = new List<SankeyNode>
{
    new SankeyNode { Id = "Laptops", Color = "#2563EB" },
    new SankeyNode { Id = "Phones", Color = "#7C3AED" },
    new SankeyNode { Id = "Online", Color = "#059669" },
    new SankeyNode { Id = "Store", Color = "#EA580C" },
    new SankeyNode { Id = "Total Revenue", Color = "#1F2937" }
};

var sankeyLinks = new List<SankeyLink>
{
    new SankeyLink { SourceId = "Laptops", TargetId = "Online", Value = 500 },
    new SankeyLink { SourceId = "Laptops", TargetId = "Store", Value = 300 },
    new SankeyLink { SourceId = "Phones", TargetId = "Online", Value = 800 },
    new SankeyLink { SourceId = "Phones", TargetId = "Store", Value = 200 },
    new SankeyLink { SourceId = "Online", TargetId = "Total Revenue", Value = 1300 },
    new SankeyLink { SourceId = "Store", TargetId = "Total Revenue", Value = 500 }
};
```

**Example 2: Department Budget Allocation**
```csharp
var sankeyNodes = new List<SankeyNode>
{
    new SankeyNode { Id = "Budget" },
    new SankeyNode { Id = "Engineering" },
    new SankeyNode { Id = "Marketing" },
    new SankeyNode { Id = "Operations" },
    new SankeyNode { Id = "Salaries" },
    new SankeyNode { Id = "Tools" }
};

var sankeyLinks = new List<SankeyLink>
{
    new SankeyLink { SourceId = "Budget", TargetId = "Engineering", Value = 5000 },
    new SankeyLink { SourceId = "Budget", TargetId = "Marketing", Value = 3000 },
    new SankeyLink { SourceId = "Budget", TargetId = "Operations", Value = 2000 },
    new SankeyLink { SourceId = "Engineering", TargetId = "Salaries", Value = 4500 },
    new SankeyLink { SourceId = "Engineering", TargetId = "Tools", Value = 500 }
};
```

**Example 3: Data Pipeline**
```csharp
var sankeyNodes = new List<SankeyNode>
{
    new SankeyNode { Id = "Raw Data" },
    new SankeyNode { Id = "Extract" },
    new SankeyNode { Id = "Transform" },
    new SankeyNode { Id = "Load" },
    new SankeyNode { Id = "Database" }
};

var sankeyLinks = new List<SankeyLink>
{
    new SankeyLink { SourceId = "Raw Data", TargetId = "Extract", Value = 10000 },
    new SankeyLink { SourceId = "Extract", TargetId = "Transform", Value = 9500 },
    new SankeyLink { SourceId = "Transform", TargetId = "Load", Value = 9200 },
    new SankeyLink { SourceId = "Load", TargetId = "Database", Value = 9200 }
};
```

### Data Binding Methods

**Method 1: ViewBag Binding**
```csharp
ViewBag.SankeyNodes = sankeyNodes;
ViewBag.SankeyLinks = sankeyLinks;
```

```cshtml
@Html.EJS().Sankey("sankey")
    .Nodes(ViewBag.SankeyNodes)
    .Links(ViewBag.SankeyLinks)
    .Render()
```

**Method 2: Strongly Typed ViewModel Binding**
```csharp
public class SankeyViewModel
{
    public List<SankeyNode> Nodes { get; set; }
    public List<SankeyLink> Links { get; set; }
}
```

```csharp
public ActionResult Index()
{
    var model = new SankeyViewModel
    {
        Nodes = sankeyNodes,
        Links = sankeyLinks
    };

    return View(model);
}
```

```cshtml
@model SankeyChartDemo.Models.SankeyViewModel

@Html.EJS().Sankey("sankey")
    .Nodes(Model.Nodes)
    .Links(Model.Links)
    .Render()
```

---

## Rendering the Chart

### Complete Working Example

**Controller:**
```csharp
public ActionResult SankeyDemo()
{
    ViewBag.SankeyNodes = new List<SankeyNode>
    {
        new SankeyNode { Id = "A", Color = "#2563EB" },
        new SankeyNode { Id = "B", Color = "#7C3AED" },
        new SankeyNode { Id = "X", Color = "#059669" },
        new SankeyNode { Id = "Z", Color = "#EA580C" }
    };

    ViewBag.SankeyLinks = new List<SankeyLink>
    {
        new SankeyLink { SourceId = "A", TargetId = "X", Value = 100 },
        new SankeyLink { SourceId = "B", TargetId = "X", Value = 80 },
        new SankeyLink { SourceId = "X", TargetId = "Z", Value = 180 }
    };

    return View();
}
```

**View:**
```cshtml
@using Syncfusion.EJ2

<div style="width: 100%; height: 500px;">
    @Html.EJS().Sankey("basicSankey").Width("100%").Height("500px").Title("Simple Flow Diagram").Tooltip(t => t.Enable(true)).LegendSettings(l => l.Visible(true)).Links(ViewBag.SankeyLinks).Nodes(ViewBag.SankeyNodes).Render()
</div>
```

### Verifying Successful Initialization

After rendering, verify the chart appears:

1. Run the ASP.NET MVC application.
2. Navigate to the page with the Sankey chart.
3. You should see:
   - Nodes displayed as rectangles
   - Links connecting nodes with appropriate thickness
   - Tooltip support when enabled
   - Legend support when enabled

**If chart doesn't appear:**
- Check browser console for JavaScript errors
- Verify CDN resources loaded successfully
- Ensure `@Html.EJS().ScriptManager()` is present in the layout
- Verify all link `SourceId` and `TargetId` values match existing node `Id` values
- Ensure you are using `.Nodes(...)` and `.Links(...)` instead of `.DataSource(...)`, `.From(...)`, `.To(...)`, and `.Weight(...)`

---