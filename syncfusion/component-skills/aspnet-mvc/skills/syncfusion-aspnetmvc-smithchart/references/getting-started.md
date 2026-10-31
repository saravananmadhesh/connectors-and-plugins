# Getting Started with Syncfusion Smith Chart for ASP.NET MVC

## Table of Contents
- [Prerequisites](#prerequisites)
- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
  - [Step 1: Create ASP.NET MVC Application](#step-1-create-aspnet-mvc-application)
  - [Step 2: Install NuGet Package](#step-2-install-nuget-package)
- [Project Configuration](#project-configuration)
  - [Step 1: Add Namespace Reference](#step-1-add-namespace-reference)
  - [Step 2: Register Syncfusion License](#step-2-register-syncfusion-license)
- [Adding Script Resources](#adding-script-resources)
  - [Option 1: CDN (Recommended for Development)](#option-1-cdn-recommended-for-development)
  - [Option 2: Local Scripts (For Production)](#option-2-local-scripts-for-production)
  - [Option 3: Individual Scripts (For Optimization)](#option-3-individual-scripts-for-optimization)
- [Register Script Manager](#register-script-manager)
- [Creating Your First Smith Chart](#creating-your-first-smith-chart)
  - [Step 1: Create Controller Action](#step-1-create-controller-action)
  - [Step 2: Create View with Smith Chart](#step-2-create-view-with-smith-chart)
  - [Step 3: Run the Application](#step-3-run-the-application)
- [Verification](#verification)
- [Complete Working Example](#complete-working-example)

## Prerequisites

Before implementing Smith Chart in your ASP.NET MVC application, ensure you have:

1. **Visual Studio** - 2017 or later version
2. **.NET Framework** - Version 4.5 or later
3. **ASP.NET MVC** - Version 5.0 or later
4. **Basic knowledge** - C#, ASP.NET MVC, and Razor syntax
5. **Syncfusion License** - Valid license key or trial version

## System Requirements

The Syncfusion ASP.NET MVC Smith Chart control requires:

- **Operating System:** Windows 7 SP1 or later, Windows Server 2008 R2 or later
- **Framework:** .NET Framework 4.5 or later
- **IDE:** Visual Studio 2017 or later
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest versions)
- **Memory:** Minimum 4 GB RAM recommended

For complete system requirements, visit: [Syncfusion System Requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

## Installation Steps

### Step 1: Create ASP.NET MVC Application

You can create an ASP.NET MVC application using either:

**Option A: Microsoft Templates**
1. Open Visual Studio
2. Go to **File** → **New** → **Project**
3. Select **ASP.NET Web Application (.NET Framework)**
4. Choose **MVC** template
5. Click **Create**

**Option B: Syncfusion Extension (Recommended)**
1. Open Visual Studio
2. Go to **Extensions** → **Syncfusion** → **Essential Studio for ASP.NET MVC** → **Create New Syncfusion Project**
3. Follow the wizard to create a project with Syncfusion components pre-configured

### Step 2: Install NuGet Package

The Syncfusion Smith Chart control is available as a NuGet package. Install it using one of these methods:

**Method 1: Package Manager Console**
```bash
Install-Package Syncfusion.EJ2.MVC5 -Version 27.1.48
```

**Method 2: NuGet Package Manager UI**
1. Right-click on your project in Solution Explorer
2. Select **Manage NuGet Packages**
3. Search for `Syncfusion.EJ2.MVC5`
4. Click **Install**

**Important Notes:**
- The package `Syncfusion.EJ2.MVC5` contains all Syncfusion EJ2 ASP.NET MVC controls
- Replace `27.1.48` with the latest version number from [nuget.org](https://www.nuget.org/packages/Syncfusion.EJ2.MVC5)
- This package has dependencies on `Newtonsoft.Json` and `Syncfusion.Licensing` which will be installed automatically

## Project Configuration

### Step 1: Add Namespace Reference

Add the Syncfusion namespace to `Web.config` located in the `Views` folder:

**File: `Views/Web.config`**
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

This allows you to use Syncfusion components in Razor views without explicitly importing the namespace on each page.

### Step 2: Register Syncfusion License

Add your Syncfusion license key in the `Application_Start` method of `Global.asax.cs`:

**File: `Global.asax.cs`**
```csharp
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Syncfusion.Licensing;

namespace YourApplicationName
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Register Syncfusion license key
            SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");
            
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
```

**How to get your license key:**
- **Trial users:** Get a 30-day trial key from [Syncfusion Trial Downloads](https://www.syncfusion.com/downloads)
- **Licensed users:** Find your key in the [Syncfusion Dashboard](https://www.syncfusion.com/account/downloads)

## Adding Script Resources

The Smith Chart control requires Syncfusion JavaScript files. Add the script reference to your layout page.

### Option 1: CDN (Recommended for Development)

Add the following script reference in the `<head>` section of `Views/Shared/_Layout.cshtml`:

**File: `Views/Shared/_Layout.cshtml`**
```cshtml
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My Application</title>
    
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")
    
    <!-- Syncfusion EJ2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    
    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/bootstrap")
    @RenderSection("scripts", required: false)
</body>
</html>
```

### Option 2: Local Scripts (For Production)

If you prefer to host scripts locally:

1. Install `Syncfusion.EJ2.JavaScript` NuGet package
2. The scripts will be available in `Scripts/ej2/` folder
3. Reference them in _Layout.cshtml:

```cshtml
<script src="~/Scripts/ej2/ej2.min.js"></script>
```

### Option 3: Individual Scripts (For Optimization)

For smaller bundle sizes, reference only required scripts:

```cshtml
<script src="https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-data.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-svg-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-charts.min.js"></script>
```

**Important:** Make sure to replace `27.1.48` with your installed package version.

## Register Script Manager

The ScriptManager must be added at the end of the `<body>` tag in `_Layout.cshtml`:

**File: `Views/Shared/_Layout.cshtml`**
```cshtml
<!DOCTYPE html>
<html>
<head>
    <!-- Head content as shown above -->
</head>
<body>
    @RenderBody()
    
    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/bootstrap")
    @RenderSection("scripts", required: false)
    
    <!-- Syncfusion Script Manager - Must be at the end of body -->
    @Html.EJS().ScriptManager()
</body>
</html>
```

**Why ScriptManager is Required:**
- Initializes Syncfusion components on the page
- Manages component dependencies
- Handles event binding and lifecycle management
- **Must be placed after all component declarations**

## Creating Your First Smith Chart

Now that setup is complete, let's create a basic Smith Chart.

### Step 1: Create Controller Action

Create or modify a controller with sample data:

**File: `Controllers/HomeController.cs`**
```csharp
using System.Web.Mvc;

namespace YourApplicationName.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // Sample transmission line data points
            ViewBag.SmithChartPoints = new[]
            {
                new { resistance = 0.15, reactance = 0.0 },
                new { resistance = 0.15, reactance = 0.15 },
                new { resistance = 0.18, reactance = 0.30 },
                new { resistance = 0.20, reactance = 0.40 },
                new { resistance = 0.25, reactance = 0.50 },
                new { resistance = 0.38, reactance = 0.65 },
                new { resistance = 0.60, reactance = 0.80 },
                new { resistance = 1.0, reactance = 1.0 }
            };
            
            return View();
        }
    }
}
```

### Step 2: Create View with Smith Chart

**File: `Views/Home/Index.cshtml`**
```cshtml
@{
    ViewBag.Title = "Smith Chart Example";
}

<div class="container" style="margin-top: 20px;">
    <h2>My First Smith Chart</h2>
    <p>Displaying transmission line impedance data</p>
    
    @Html.EJS().Smithchart("smithchart")
        .Series(series =>
        {
            series.Points(ViewBag.SmithChartPoints)
                  .Name("Transmission Line")
                  .Add();
        })
        .Render()
</div>
```

### Step 3: Run the Application

1. Press **Ctrl + F5** (Windows) or **⌘ + F5** (macOS) to run without debugging
2. Your default browser will open with the Smith Chart

## Verification

After running the application, you should see:

✅ **Smith Chart Rendered Successfully:**
- Circular grid with horizontal and radial axes
- Data points connected by a line representing your transmission line data
- Default styling with circular gridlines

✅ **Visual Elements:**
- Horizontal axis (straight line across the chart)
- Radial axis (circular paths)
- Series line connecting the data points
- Default dimensions (responsive to container)

❌ **Common Issues and Solutions:**

**Issue: Chart not appearing**
- **Solution:** Verify EJ2 script is loaded (check browser console for errors)
- **Solution:** Ensure ScriptManager is added at end of body
- **Solution:** Check that namespace is added to Web.config

**Issue: License warning message**
- **Solution:** Register license key in Global.asax.cs Application_Start
- **Solution:** Verify license key is valid and not expired

**Issue: Data not displaying**
- **Solution:** Ensure ViewBag.SmithChartPoints has correct structure
- **Solution:** Verify property names are exactly `resistance` and `reactance` (case-sensitive)

**Issue: Script errors in console**
- **Solution:** Verify script version matches NuGet package version
- **Solution:** Ensure jQuery is loaded before Syncfusion scripts

## Complete Working Example

Here's a complete, self-contained example with enhanced features:

**Controller:**
```csharp
using System.Web.Mvc;

namespace SmithChartDemo.Controllers
{
    public class SmithChartController : Controller
    {
        public ActionResult BasicExample()
        {
            // Multiple series for comparison
            ViewBag.Series1 = new[]
            {
                new { resistance = 0.15, reactance = 0.0 },
                new { resistance = 0.2, reactance = 0.1 },
                new { resistance = 0.3, reactance = 0.3 },
                new { resistance = 0.5, reactance = 0.5 },
                new { resistance = 0.8, reactance = 0.8 }
            };
            
            ViewBag.Series2 = new[]
            {
                new { resistance = 0.2, reactance = 0.2 },
                new { resistance = 0.4, reactance = 0.4 },
                new { resistance = 0.6, reactance = 0.6 },
                new { resistance = 0.8, reactance = 0.8 },
                new { resistance = 1.0, reactance = 1.0 }
            };
            
            return View();
        }
    }
}
```

**View:**
```cshtml
@{
    ViewBag.Title = "Smith Chart - Basic Example";
}

<div class="container" style="margin-top: 30px;">
    <h1>Smith Chart Demonstration</h1>
    <p>Comparing two transmission line impedance profiles</p>
    
    <div style="border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
        @Html.EJS().Smithchart("smithchart")
            .Width("900px")
            .Height("600px")
            .Title(title => title.Text("Transmission Line Impedance Analysis").Visible(true))
            .Series(series =>
            {
                series.Name("50Ω Line")
                      .Fill("#FF6347")
                      .Width(2)
                      .Marker(m => m.Visible(true))
                      .Points(ViewBag.Series1)
                      .Add();
                
                series.Name("75Ω Line")
                      .Fill("#4169E1")
                      .Width(2)
                      .Marker(m => m.Visible(true))
                      .Points(ViewBag.Series2)
                      .Add();
            })
            .LegendSettings(legend => legend.Visible(true).Position("Bottom"))
            .Render()
    </div>
    
    <div style="margin-top: 20px;">
        <h3>Chart Features:</h3>
        <ul>
            <li>Two series showing different transmission line characteristics</li>
            <li>Markers enabled for data point visibility</li>
            <li>Legend positioned at bottom for series identification</li>
            <li>Custom colors (Tomato and Royal Blue)</li>
            <li>Fixed dimensions for consistent display</li>
        </ul>
    </div>
</div>
```

**Additional Resources:**
- [Syncfusion Smith Chart API Documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/smith-chart/getting-started)
- [GitHub Examples Repository](https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/SmithChart)
- [Syncfusion Support Portal](https://www.syncfusion.com/support)
