# Getting Started with Bullet Chart

This guide covers everything you need to set up and create your first Syncfusion ASP.NET MVC Bullet Chart, from installation through running your first working example.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Create ASP.NET MVC Application](#step-1-create-aspnet-mvc-application)
- [Step 2: Install NuGet Package](#step-2-install-nuget-package)
- [Step 3: Add Namespace](#step-3-add-namespace)
- [Step 4: Add Script Resources](#step-4-add-script-resources)
- [Step 5: Register Script Manager](#step-5-register-script-manager)
- [Step 6: Create Your First Bullet Chart](#step-6-create-your-first-bullet-chart)
- [Step 7: Run the Application](#step-7-run-the-application)
- [Complete Working Example](#complete-working-example)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Quick Reference](#quick-reference)

## Prerequisites

Before starting, ensure you have:
- Visual Studio (2017 or later recommended)
- ASP.NET MVC 5 or later
- .NET Framework 4.5 or later
- Internet connection for NuGet packages

**System Requirements:** [ASP.NET MVC controls system requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

## Step 1: Create ASP.NET MVC Application

You can create an ASP.NET MVC application using either:

**Option A: Microsoft Templates**
- Open Visual Studio
- File → New → Project
- Select "ASP.NET Web Application (.NET Framework)"
- Choose "MVC" template
- Click Create

**Option B: Syncfusion ASP.NET MVC Extension**
- Use Syncfusion's Visual Studio Extension for pre-configured projects
- Provides automatic package references and configuration

## Step 2: Install NuGet Package

Install the Syncfusion ASP.NET MVC package to access the Bullet Chart component.

**Using NuGet Package Manager:**

1. Open NuGet Package Manager:
   - Tools → NuGet Package Manager → Manage NuGet Packages for Solution

2. Search for and install:
   - Package: `Syncfusion.EJ2.MVC5`
   - Version: Latest stable version

**Using Package Manager Console:**

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

**Important Notes:**
- The `Syncfusion.EJ2.MVC5` package includes dependencies:
  - `Newtonsoft.Json` for JSON serialization
  - `Syncfusion.Licensing` for license validation
- All Syncfusion ASP.NET MVC controls are available on [nuget.org](https://www.nuget.org/packages?q=syncfusion.EJ2)
- Refer to the [NuGet packages documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/nuget-packages) for OS-specific installation

## Step 3: Add Namespace

Add the Syncfusion.EJ2 namespace reference to make the Bullet Chart helper available in your views.

**Edit `Web.config` in the `Views` folder:**

```xml
<configuration>
  <system.web.webPages.razor>
    <pages pageBaseType="System.Web.Mvc.WebViewPage">
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

## Step 4: Add Script Resources

Add the Syncfusion script reference to enable the Bullet Chart functionality.

**Edit `~/Views/Shared/_Layout.cshtml`:**

Add the script reference in the `<head>` section:

```cshtml
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My ASP.NET Application</title>
    
    <!-- Your existing CSS references -->
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")
    
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Alternative: Local Script References**

If you prefer local references instead of CDN:

1. Download the Syncfusion scripts from npm or your licensed package
2. Add scripts to your project's `Scripts` folder
3. Reference them locally:

```cshtml
<script src="~/Scripts/ej2/ej2.min.js"></script>
```

**Important:** For complete information on different script reference approaches, see the [Adding Script Reference documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/common/adding-script-references).

## Step 5: Register Script Manager

The Syncfusion Script Manager must be registered at the end of the `<body>` tag to properly initialize components.

**Edit `~/Views/Shared/_Layout.cshtml`:**

Add the script manager before the closing `</body>` tag:

```cshtml
<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <!-- Your navigation content -->
    </div>
    
    <div class="container body-content">
        @RenderBody()
        <hr />
        <footer>
            <!-- Your footer content -->
        </footer>
    </div>
    
    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/bootstrap")
    @RenderSection("scripts", required: false)
    
    <!-- Syncfusion ASP.NET MVC Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

**Why Script Manager is Required:**
- Initializes Syncfusion components
- Handles component registration
- Manages dependencies between components
- Must be placed after jQuery and other scripts

## Step 6: Create Your First Bullet Chart

Now you're ready to add a Bullet Chart to your application.

### Update Controller

**Edit `~/Controllers/HomeController.cs`:**

```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace YourAppNamespace.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<BulletChartData> data = new List<BulletChartData>
            {
                new BulletChartData { value = 270, target = 250 }
            };
            return View(data);
        }
    }
    
    public class BulletChartData
    {
        public double target;
        public double value;
    }
}
```

### Update View

**Edit `~/Views/Home/Index.cshtml`:**

```cshtml
@model List<YourAppNamespace.Controllers.HomeController.BulletChartData>

@{
    ViewBag.Title = "Bullet Chart Example";
}

<h2>Sales Performance</h2>

@(Html.EJS().BulletChart("bulletChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

## Step 7: Run the Application

Run your application to see the Bullet Chart:

**Windows:** Press `Ctrl + F5`  
**macOS:** Press `⌘ + F5`

The Bullet Chart will render in your default web browser, displaying:
- A value bar showing 270 (the actual value)
- A target marker at 250 (the target value)
- An axis ranging from 0 to 300 with intervals of 50

## Complete Working Example

Here's a complete, more feature-rich example with ranges and styling:

### Controller (`HomeController.cs`):

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

namespace BulletChartApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<BulletChartData> salesData = new List<BulletChartData>
            {
                new BulletChartData { value = 270, target = 250 }
            };
            return View(salesData);
        }
    }
    
    public class BulletChartData
    {
        public double value { get; set; }
        public double target { get; set; }
    }
}
```

### View (`Index.cshtml`):

```cshtml
@model List<BulletChartApp.Controllers.HomeController.BulletChartData>

@{
    ViewBag.Title = "Sales Performance Dashboard";
}

<div style="padding: 20px;">
    <h2>Quarterly Sales Performance</h2>
    
    @(Html.EJS().BulletChart("salesBulletChart")
        .DataSource(Model)
        .ValueField("value")
        .TargetField("target")
        .Title("Sales (in thousands)")
        .Subtitle("Current Quarter")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(ranges => {
            ranges.End(150).Color("#D3D3D3").Add();      // Poor: 0-150
            ranges.End(250).Color("#F4A460").Add();      // Average: 150-250
            ranges.End(300).Color("#90EE90").Add();      // Good: 250-300
        })
        .Tooltip(tooltip => tooltip.Enable(true))
        .Width("80%")
        .Height("100")
        .Render()
    )
</div>
```

This example includes:
- Data binding with value and target
- Title and subtitle
- Three qualitative ranges (Poor/Average/Good)
- Tooltip enabled for interactivity
- Custom dimensions (80% width, 100px height)

## Common Issues and Solutions

### Issue: "The name 'Html.EJS()' does not exist"

**Solution:** Ensure you've added the Syncfusion.EJ2 namespace to `Web.config` in the Views folder.

### Issue: Chart not rendering

**Solutions:**
1. Verify Script Manager is added before `</body>` tag
2. Check that scripts are loaded (view page source)
3. Ensure DataSource is properly bound
4. Check browser console for JavaScript errors

### Issue: Script conflicts

**Solution:** Ensure jQuery is loaded before Syncfusion scripts and Script Manager is the last element before `</body>`.

### Issue: NuGet package not installing

**Solution:** Check your package source settings and ensure nuget.org is enabled.

## Quick Reference

**Minimum Required Code:**

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Essential Properties:**
- `DataSource`: Your data collection
- `ValueField`: Property name for actual values
- `TargetField`: Property name for target values
- `Minimum`/`Maximum`: Axis range
- `Interval`: Label spacing

You're now ready to build sophisticated bullet chart visualizations in your ASP.NET MVC application!
