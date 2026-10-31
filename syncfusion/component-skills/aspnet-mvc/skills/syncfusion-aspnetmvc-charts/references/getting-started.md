# Getting Started with Syncfusion ASP.NET MVC Chart

This guide walks you through the prerequisites, installation, and basic implementation of the Syncfusion Chart component in ASP.NET MVC applications.

## Table of Contents
- [Prerequisites](#prerequisites)
  - [System Requirements](#system-requirements)
- [Installation](#installation)
  - [Step 1: Install NuGet Package](#step-1-install-nuget-package)
  - [Step 2: Add Namespace](#step-2-add-namespace)
  - [Step 3: Add Script References](#step-3-add-script-references)
  - [Step 4: Add Theme Stylesheet (Optional)](#step-4-add-theme-stylesheet-optional)
  - [Step 5: Register Script Manager](#step-5-register-script-manager)
- [Basic Chart Implementation](#basic-chart-implementation)
  - [Step 1: Prepare Data in Controller](#step-1-prepare-data-in-controller)
  - [Step 2: Render Chart in View](#step-2-render-chart-in-view)
  - [Step 3: Run the Application](#step-3-run-the-application)
- [Understanding the Chart Structure](#understanding-the-chart-structure)
  - [Html Helper Syntax](#html-helper-syntax)
  - [Primary Axes](#primary-axes)
  - [Series Configuration](#series-configuration)
  - [Rendering](#rendering)
- [Common Initialization Patterns](#common-initialization-patterns)
  - [Pattern 1: Data from Model](#pattern-1-data-from-model)
  - [Pattern 2: Inline Data](#pattern-2-inline-data)
  - [Pattern 3: Multiple Series](#pattern-3-multiple-series)
- [Adding Basic Features](#adding-basic-features)
  - [Chart with Title and Legend](#chart-with-title-and-legend)
  - [Chart with Data Labels](#chart-with-data-labels)
  - [Chart with Tooltip](#chart-with-tooltip)
- [License Configuration](#license-configuration)
- [Troubleshooting](#troubleshooting)
  - [Chart Not Rendering](#chart-not-rendering)
  - ["Syncfusion is not defined" Error](#syncfusion-is-not-defined-error)
  - [Data Not Displaying](#data-not-displaying)
  - [Namespace Not Found](#namespace-not-found)
- [Sample Code Repository](#sample-code-repository)

## Prerequisites

Before you begin, ensure you have:

- **Visual Studio 2013 or later** (2015, 2017, 2019, 2022)
- **.NET Framework 4.5 or later** for ASP.NET MVC 5
- **ASP.NET MVC 4 or MVC 5** application project
- **Internet connection** for NuGet package download and CDN resources

### System Requirements

**For ASP.NET MVC 5:**
- Windows 7 SP1 or later, Windows Server 2008 R2 or later
- Visual Studio 2013 or later with ASP.NET and web development workload
- .NET Framework 4.5 or later

**For ASP.NET Core MVC:**
- .NET Core 2.0 or later / .NET 5, 6, 7, 8
- Visual Studio 2017 or later

## Installation

### Step 1: Install NuGet Package

Open your ASP.NET MVC project in Visual Studio and install the Syncfusion.EJ2.MVC5 package.

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

**Using NuGet Package Manager UI:**
1. Right-click on your project → Manage NuGet Packages
2. Search for "Syncfusion.EJ2.MVC5"
3. Select the package and click Install

**Note:** The Syncfusion.EJ2.MVC5 package has dependencies on:
- `Newtonsoft.Json` - JSON serialization
- `Syncfusion.Licensing` - License validation

These will be installed automatically.

### Step 2: Add Namespace

Add the Syncfusion.EJ2 namespace to `Web.config` located in the `Views` folder (not the root Web.config).

**File:** `~/Views/Web.config`

```xml
<configuration>
  <system.web.webPages.razor>
    <pages pageBaseType="System.Web.Mvc.WebViewPage">
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Routing" />
        <add namespace="Syncfusion.EJ2" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

### Step 3: Add Script References

Add the Syncfusion JavaScript library reference in the `<head>` section of `~/Views/Shared/_Layout.cshtml`.

**Using CDN:**
```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My Application</title>
    
    <!-- Syncfusion EJ2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Using Local Files:**
If you prefer local files, copy the scripts from the installed package:
```html
<script src="~/Scripts/ej2/ej2.min.js"></script>
```

### Step 4: Add Theme Stylesheet (Optional)

Add a theme stylesheet for better appearance:

```html
<head>
    <!-- Syncfusion Theme -->
    <link href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/bootstrap5.css" rel="stylesheet" />
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Available Themes:**
- `bootstrap5.css` - Bootstrap 5 theme (recommended)
- `material.css` - Material Design
- `fluent.css` - Fluent UI
- `tailwind.css` - Tailwind CSS
- `fabric.css` - Office Fabric
- `material-dark.css` - Material Dark mode

### Step 5: Register Script Manager

**CRITICAL:** Add the Syncfusion Script Manager at the end of the `<body>` tag in `_Layout.cshtml`:

```html
<body>
    @RenderBody()
    
    <!-- Syncfusion Script Manager - Required for all components -->
    @Html.EJS().ScriptManager()
</body>
```

**Why is this required?** The ScriptManager registers and initializes all Syncfusion components on the page. Without it, charts will not render.

## Basic Chart Implementation

Now that installation is complete, let's create your first chart.

### Step 1: Prepare Data in Controller

Create a data model and prepare data in your controller:

**File:** `~/Controllers/HomeController.cs`

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

namespace YourApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // Prepare chart data
            List<ChartData> chartData = new List<ChartData>
            {
                new ChartData { Month = "Jan", Sales = 35 },
                new ChartData { Month = "Feb", Sales = 28 },
                new ChartData { Month = "Mar", Sales = 34 },
                new ChartData { Month = "Apr", Sales = 32 },
                new ChartData { Month = "May", Sales = 40 },
                new ChartData { Month = "Jun", Sales = 32 },
                new ChartData { Month = "Jul", Sales = 35 },
                new ChartData { Month = "Aug", Sales = 55 },
                new ChartData { Month = "Sep", Sales = 38 },
                new ChartData { Month = "Oct", Sales = 30 },
                new ChartData { Month = "Nov", Sales = 25 },
                new ChartData { Month = "Dec", Sales = 32 }
            };
            
            ViewBag.ChartData = chartData;
            return View();
        }
    }
    
    // Data model for chart
    public class ChartData
    {
        public string Month { get; set; }
        public double Sales { get; set; }
    }
}
```

### Step 2: Render Chart in View

Add the chart to your view using the Html Helper syntax:

**File:** `~/Views/Home/Index.cshtml`

```cshtml
@{
    ViewBag.Title = "Chart Example";
}

<h2>Monthly Sales Chart</h2>

@Html.EJS().Chart("container").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py.LabelFormat("${value}K")
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.ChartData)
    .XName("Month")
    .YName("Sales")
    .Name("Sales")
    .Add();
    }
    ).Title("Monthly Sales Analysis").Render()
```

### Step 3: Run the Application

Press `F5` or `Ctrl+F5` to run your application. You should see a column chart displaying monthly sales data.

## Understanding the Chart Structure

Let's break down the chart implementation:

### Html Helper Syntax
```cshtml
@Html.EJS().Chart("container")
```
- `@Html.EJS()` - Entry point for Syncfusion components
- `.Chart("container")` - Creates a chart with ID "container"
- The ID must be unique on the page

### Primary Axes
```cshtml
.PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category))
.PrimaryYAxis(py => py.LabelFormat("${value}K"))
```
- `PrimaryXAxis` - Horizontal axis (X-axis) configuration
- `ValueType.Category` - Treats X values as categories (text labels)
- `PrimaryYAxis` - Vertical axis (Y-axis) configuration
- `LabelFormat` - Formats Y-axis labels (e.g., "$35K")

### Series Configuration
```cshtml
.Series(series =>
{
    series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
          .DataSource(ViewBag.ChartData)
          .XName("Month")
          .YName("Sales")
          .Name("Sales")
          .Add();
})
```
- `Type` - Chart type (Column, Line, Bar, Area, etc.)
- `DataSource` - Data collection to plot
- `XName` - Property name for X-axis values ("Month")
- `YName` - Property name for Y-axis values ("Sales")
- `Name` - Series name shown in legend
- `.Add()` - Adds the series to the chart

### Rendering
```cshtml
.Render()
```
- **Must be called** to render the chart
- Generates the necessary HTML and scripts

## Common Initialization Patterns

### Pattern 1: Data from Model

```cshtml
@model List<ChartData>

@Html.EJS().Chart("chart1").Series(series =>
    {
        series.DataSource(Model).XName("Month").YName("Sales").Add();
    }).Render()
```

### Pattern 2: Inline Data

```cshtml
@{
    var chartData = new[] {
        new { x = "USA", y = 46 },
        new { x = "GBR", y = 27 },
        new { x = "CHN", y = 26 }
    };
}

@Html.EJS().Chart("chart2").Series(series =>
    {
        series.DataSource(chartData).XName("x").YName("y").Add();
    }).Render()
```

### Pattern 3: Multiple Series

```cshtml
@Html.EJS().Chart("chart3").Series(series =>
    {
        series.DataSource(salesData).XName("Month").YName("Sales").Name("Sales").Add();
        series.DataSource(expenseData).XName("Month").YName("Expense").Name("Expense").Add();
    }).Render()
```

## Adding Basic Features

### Chart with Title and Legend

```cshtml
@Html.EJS().Chart("chartWithTitle").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.DataSource(ViewBag.ChartData)
              .XName("Month")
              .YName("Sales")
              .Name("Sales")
              .Add();
    }).Title("Sales Report").LegendSettings(legend => legend.Visible(true)).Render()
```

### Chart with Data Labels

```cshtml
@Html.EJS().Chart("container").Series(series =>
{
    series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line).
    Marker(mr => mr.Visible(true).DataLabel(dl => dl.Visible(true))).
    XName("x").
    YName("y").
    DataSource(ViewBag.dataSource).
    Width(2).Add();
}).Title("Olympic Medal Counts - RIO").Render()
```

### Chart with Tooltip

```cshtml
@Html.EJS().Chart("chartWithTooltip").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.DataSource(ViewBag.ChartData)
              .XName("Month")
              .YName("Sales")
              .Add();
    }).Tooltip(tooltip => tooltip.Enable(true)).Render()
```

## License Configuration

For production use, you must register a license key. Add this to `Global.asax.cs`:

```csharp
using System.Web.Mvc;
using System.Web.Routing;

namespace YourApp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Register Syncfusion license
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR-LICENSE-KEY");
            
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
```

**Get a license key:**
- Free Community License: https://www.syncfusion.com/products/communitylicense
- Trial License: https://www.syncfusion.com/downloads
- Commercial License: https://www.syncfusion.com/sales/products

## Troubleshooting

### Chart Not Rendering

**Problem:** Blank space where chart should be.

**Solutions:**
1. Verify ScriptManager is added: `@Html.EJS().ScriptManager()` at end of `<body>`
2. Check that ej2.min.js is loaded (view page source, check Network tab)
3. Ensure chart ID is unique
4. Verify `.Render()` is called

### "Syncfusion is not defined" Error

**Problem:** JavaScript console error.

**Solutions:**
1. Verify ej2.min.js is referenced in `<head>`
2. Check CDN availability or use local files
3. Ensure script tag is before ScriptManager

### Data Not Displaying

**Problem:** Chart renders but no data points.

**Solutions:**
1. Check DataSource is not null or empty
2. Verify XName and YName match property names (case-sensitive)
3. Ensure data properties are public
4. Check console for errors

### Namespace Not Found

**Problem:** "The type or namespace name 'EJ2' does not exist"

**Solutions:**
1. Add `Syncfusion.EJ2` namespace to `~/Views/Web.config`
2. Rebuild the project
3. Close and reopen .cshtml files in Visual Studio

## Sample Code Repository

View complete examples on GitHub:
https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/Chart/
