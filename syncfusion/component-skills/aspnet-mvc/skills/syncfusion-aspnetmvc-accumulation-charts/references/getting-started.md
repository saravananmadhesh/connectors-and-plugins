# Getting Started with ASP.NET MVC Accumulation Chart

This guide walks through the complete setup process for adding Syncfusion Accumulation Chart component to your ASP.NET MVC 5 application, from prerequisites to running your first chart.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Creating ASP.NET MVC Application](#creating-aspnet-mvc-application)
  - [Option 1: Microsoft Templates](#option-1-microsoft-templates)
  - [Option 2: Syncfusion Extension](#option-2-syncfusion-extension)
- [Installation and Setup](#installation-and-setup)
  - [Step 1: Install Syncfusion NuGet Package](#step-1-install-syncfusion-nuget-package)
  - [Step 2: Add Namespace Reference](#step-2-add-namespace-reference)
  - [Step 3: Add Stylesheet and Script References](#step-3-add-stylesheet-and-script-references)
  - [Step 4: Register Syncfusion Script Manager](#step-4-register-syncfusion-script-manager)
- [Creating Your First Accumulation Chart](#creating-your-first-accumulation-chart)
  - [Step 1: Create Data Model](#step-1-create-data-model)
  - [Step 2: Prepare Data in Controller](#step-2-prepare-data-in-controller)
  - [Step 3: Render Chart in View](#step-3-render-chart-in-view)
  - [Step 4: Run the Application](#step-4-run-the-application)
- [Understanding the Basic Configuration](#understanding-the-basic-configuration)
  - [Data Binding Properties](#data-binding-properties)
  - [Chart Type](#chart-type)
  - [Data Labels](#data-labels)
  - [Legend](#legend)
  - [Tooltip](#tooltip)
- [Common Scenarios](#common-scenarios)
  - [Scenario 1: Simple Pie Chart (Minimal Configuration)](#scenario-1-simple-pie-chart-minimal-configuration)
  - [Scenario 2: Doughnut Chart with Inner Radius](#scenario-2-doughnut-chart-with-inner-radius)
  - [Scenario 3: Funnel Chart for Conversion Tracking](#scenario-3-funnel-chart-for-conversion-tracking)
- [Troubleshooting](#troubleshooting)
  - [Chart Not Rendering](#chart-not-rendering)
  - [Styling Issues](#styling-issues)
  - [Data Not Displayed](#data-not-displayed)
  - [NuGet Package Errors](#nuget-package-errors)
- [Sample Code Repository](#sample-code-repository)
- [Additional Resources](#additional-resources)

## Prerequisites

Before you begin, ensure you have:

- **Visual Studio 2017 or later** - Integrated development environment
- **.NET Framework 4.5 or later** - Runtime framework
- **ASP.NET MVC 5** - Web application framework
- **NuGet Package Manager** - For package installation

For detailed system requirements, see [ASP.NET MVC System Requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements).

## Creating ASP.NET MVC Application

You can create an ASP.NET MVC application using either:

### Option 1: Microsoft Templates

1. Open Visual Studio
2. Select **File** → **New** → **Project**
3. Choose **ASP.NET Web Application (.NET Framework)**
4. Select **MVC** template
5. Click **Create**

For detailed steps, see [Microsoft's MVC Getting Started Guide](https://learn.microsoft.com/en-us/aspnet/mvc/overview/getting-started/introduction/getting-started).

### Option 2: Syncfusion Extension

Use the Syncfusion ASP.NET MVC Extension to create a project with pre-configured Syncfusion references:

1. Open Visual Studio
2. Select **Extensions** → **Syncfusion** → **Essential Studio for ASP.NET MVC** → **Create New Project**
3. Follow the wizard to configure your project

For details, see [Syncfusion Visual Studio Integration](https://ej2.syncfusion.com/aspnetmvc/documentation/visual-studio-integration/create-project).

## Installation and Setup

### Step 1: Install Syncfusion NuGet Package

Open the **NuGet Package Manager Console** (Tools → NuGet Package Manager → Package Manager Console) and run:

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

**Alternatively**, use the NuGet Package Manager UI:

1. Right-click your project → **Manage NuGet Packages**
2. Search for `Syncfusion.EJ2.MVC5`
3. Click **Install**

**Package Dependencies:**

The `Syncfusion.EJ2.MVC5` package automatically installs:
- **Newtonsoft.Json** - JSON serialization
- **Syncfusion.Licensing** - License validation

> **Note:** Syncfusion components are available on [nuget.org](https://www.nuget.org/packages?q=syncfusion.EJ2). See [NuGet Packages](https://ej2.syncfusion.com/aspnetmvc/documentation/nuget-packages) for more information about package management.

### Step 2: Add Namespace Reference

Add the Syncfusion.EJ2 namespace to `Views/Web.config`:

```xml
<configuration>
  <system.web.webPages.razor>
    <pages>
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Routing" />
        <add namespace="Syncfusion.EJ2"/>  <!-- Add this line -->
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

This makes `Syncfusion.EJ2` available in all Razor views without explicit `@using` directives.

### Step 3: Add Stylesheet and Script References

Add the Syncfusion resources in `Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My ASP.NET Application</title>
    
    <!-- Syncfusion EJ2 Styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    
    <!-- Syncfusion EJ2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Available Themes:**

You can replace `fluent.css` with other built-in themes:
- `material.css` - Material Design
- `bootstrap5.css` - Bootstrap 5
- `bootstrap4.css` - Bootstrap 4
- `tailwind.css` - Tailwind CSS
- `fabric.css` - Microsoft Fabric
- `highcontrast.css` - High contrast

For theme customization, see [Themes Documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/appearance/theme) or use the [Custom Resource Generator (CRG)](https://ej2.syncfusion.com/aspnetmvc/documentation/common/custom-resource-generator).

> **Alternative Methods:** You can also reference scripts via NPM packages or local files. See [Adding Script Reference](https://ej2.syncfusion.com/aspnetmvc/documentation/common/adding-script-references).

### Step 4: Register Syncfusion Script Manager

Add the `ScriptManager` at the end of `<body>` tag in `Views/Shared/_Layout.cshtml`:

```cshtml
<body>
    @RenderBody()
    
    <!-- Syncfusion Script Manager (Must be at the end of body) -->
    @Html.EJS().ScriptManager()
</body>
```

The ScriptManager initializes Syncfusion components and manages script dependencies.

## Creating Your First Accumulation Chart

### Step 1: Create Data Model

Create a model class in your project (e.g., `Models/ChartData.cs`):

```csharp
namespace YourProjectName.Models
{
    public class ChartData
    {
        public string X { get; set; }
        public double Y { get; set; }
        public string Text { get; set; }
    }
}
```

### Step 2: Prepare Data in Controller

Add data preparation logic in your controller (e.g., `Controllers/HomeController.cs`):

```csharp
using System.Collections.Generic;
using System.Web.Mvc;
using YourProjectName.Models;

namespace YourProjectName.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // Prepare data for pie chart
            List<ChartData> pieData = new List<ChartData>
            {
                new ChartData { X = "Chrome", Y = 37, Text = "37%" },
                new ChartData { X = "UC Browser", Y = 17, Text = "17%" },
                new ChartData { X = "iPhone", Y = 19, Text = "19%" },
                new ChartData { X = "Others", Y = 4, Text = "4%" },
                new ChartData { X = "Opera", Y = 11, Text = "11%" },
                new ChartData { X = "Android", Y = 12, Text = "12%" }
            };
            
            return View(pieData);
        }
    }
}
```

### Step 3: Render Chart in View

Add the chart control in your view (e.g., `Views/Home/Index.cshtml`):

```cshtml
@{
    ViewBag.Title = "Accumulation Chart - Getting Started";
}

<h2>Browser Market Share</h2>

@(Html.EJS().AccumulationChart("container")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
        .DataLabel(dl => dl.Visible(true).Name("Text").Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside))
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .LegendSettings(ls => ls.Visible(true))
    .Title("Browser Market Share")
    .Tooltip(t => t.Enable(true))
    .Render()
)
```

### Step 4: Run the Application

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the application without debugging. Your browser will open and display the accumulation chart.

## Understanding the Basic Configuration

### Data Binding Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `DataSource` | object | Collection of data points | `Model` or `List<ChartData>` |
| `XName` | string | Field name for category labels | `"X"` → Chrome, UC Browser, etc. |
| `YName` | string | Field name for values | `"Y"` → 37, 17, 19, etc. |

### Chart Type

Set the series type using the `Type` property:

```csharp
.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
```

**Available Types:**
- `Pie` - Standard circular chart
- `Doughnut` - Pie with center hole (requires `InnerRadius`)
- `Pyramid` - Hierarchical triangle
- `Funnel` - Conversion funnel with neck

### Data Labels

Display values on chart segments:

```csharp
.DataLabel(dl => dl
    .Visible(true)                    // Show labels
    .Name("Text")                     // Field for label text
    .Position(AccumulationLabelPosition.Outside)  // Inside or Outside
)
```

### Legend

Show a legend to identify data points:

```csharp
.LegendSettings(ls => ls.Visible(true))
```

### Tooltip

Enable interactive tooltips on hover:

```csharp
.Tooltip(t => t.Enable(true))
```

## Common Scenarios

### Scenario 1: Simple Pie Chart (Minimal Configuration)

```cshtml
@(Html.EJS().AccumulationChart("simplePie")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .Render()
)
```

### Scenario 2: Doughnut Chart with Inner Radius

```cshtml
@(Html.EJS().AccumulationChart("doughnut")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .InnerRadius("40%")  // Creates doughnut effect
              .Add();
    })
    .Render()
)
```

### Scenario 3: Funnel Chart for Conversion Tracking

```cshtml
@(Html.EJS().AccumulationChart("funnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("Stage")
              .YName("Count")
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Add();
    })
    .Title("Sales Conversion Funnel")
    .Render()
)
```

## Troubleshooting

### Chart Not Rendering

**Problem:** Chart container is empty or shows no output.

**Solutions:**
1. Verify ScriptManager is at the end of `<body>` tag
2. Check that CDN links are accessible (test in browser)
3. Ensure `Syncfusion.EJ2` namespace is in `Web.config`
4. Verify data is passed correctly to view (check Model is not null)

### Styling Issues

**Problem:** Chart appears but styling is incorrect or missing.

**Solutions:**
1. Verify CSS link is in `<head>` section
2. Check CDN version matches your package version
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try different theme CSS to isolate issue

### Data Not Displayed

**Problem:** Chart renders but shows no data points.

**Solutions:**
1. Verify `XName` and `YName` match your data model property names (case-sensitive)
2. Check data is not null or empty in controller
3. Ensure numeric values in `YName` field
4. Use browser developer tools (F12) to inspect JavaScript console for errors

### NuGet Package Errors

**Problem:** Package installation fails or version conflicts.

**Solutions:**
1. Update NuGet Package Manager (Tools → Extensions and Updates)
2. Clear NuGet cache: `dotnet nuget locals all --clear`
3. Check .NET Framework version compatibility
4. Manually delete `packages` folder and restore

## Sample Code Repository

View complete working examples:
- [ASP.NET MVC Accumulation Chart Samples](https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/AccumulationChart)

## Additional Resources

- [API Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.AccumulationChart.html)
- [Live Demos](https://ej2.syncfusion.com/aspnetmvc/AccumulationChart)
- [Knowledge Base](https://www.syncfusion.com/kb/aspnetmvc)
- [Support Portal](https://www.syncfusion.com/support/directtrac/incidents/newincident)
