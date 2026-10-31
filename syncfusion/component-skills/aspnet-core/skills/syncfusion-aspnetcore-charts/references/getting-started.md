# Getting Started with ASP.NET Core Chart

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1: Install NuGet Package](#step-1-install-nuget-package)
  - [Using NuGet Package Manager](#using-nuget-package-manager)
  - [Using Package Manager Console](#using-package-manager-console)
  - [Using .NET CLI](#using-net-cli)
- [Step 2: Add Tag Helper](#step-2-add-tag-helper)
- [Step 3: Add Script References](#step-3-add-script-references)
  - [Option A: CDN (Recommended for Quick Start)](#option-a-cdn-recommended-for-quick-start)
  - [Option B: NPM Package](#option-b-npm-package)
  - [Option C: Static Files (Local Copy)](#option-c-static-files-local-copy)
- [Step 4: Register Script Manager](#step-4-register-script-manager)
- [Step 6: Create Your First Chart](#step-6-create-your-first-chart)
  - [Razor Pages Example](#razor-pages-example)
  - [MVC Example](#mvc-example)
- [Step 7: Run the Application](#step-7-run-the-application)
- [Basic Chart Configuration](#basic-chart-configuration)
  - [Minimum Required Properties](#minimum-required-properties)
  - [Common Initial Properties](#common-initial-properties)
- [Data Binding Patterns](#data-binding-patterns)
  - [Simple Array of Objects](#simple-array-of-objects)
  - [Strongly Typed Model](#strongly-typed-model)
  - [ViewBag/ViewData Pattern](#viewbagviewdata-pattern)
- [Handling Events](#handling-events)
  - [Chart Load Event](#chart-load-event)
  - [Point Click Event](#point-click-event)
- [Licensing](#licensing)
  - [.NET 6+ (Program.cs)](#net-6-programcs)
  - [.NET Core 3.1 (Startup.cs)](#net-core-31-startupcs)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
  - [Chart Not Rendering](#chart-not-rendering)
  - [License Warning Message](#license-warning-message)
  - [Data Not Displaying](#data-not-displaying)
  - [Script Errors](#script-errors)
  - [Styling Issues](#styling-issues)
- [Complete Working Example](#complete-working-example)

This guide covers the complete setup and basic implementation of Syncfusion ASP.NET Core Chart component.

## Prerequisites

- **Visual Studio 2019 or later** (or Visual Studio Code)
- **.NET Core SDK 3.1 or later** / **.NET 6.0 or later**
- **ASP.NET Core Web Application** project (MVC or Razor Pages)
- **Syncfusion license** (trial or paid)

System requirements: [ASP.NET Core System Requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

## Step 1: Install NuGet Package

### Using NuGet Package Manager

1. Open your ASP.NET Core project in Visual Studio
2. Go to **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
3. Search for `Syncfusion.EJ2.AspNet.Core`
4. Select the package and click **Install**
5. Accept the license terms

### Using Package Manager Console

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

### Using .NET CLI

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

**Note:** The `Syncfusion.EJ2.AspNet.Core` package includes dependencies:
- `Newtonsoft.Json` - For JSON serialization
- `Syncfusion.Licensing` - For license validation

## Step 2: Add Tag Helper

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This enables Syncfusion tag helpers throughout your application.

## Step 3: Add Script References

### Option A: CDN (Recommended for Quick Start)

Add the script reference in the `<head>` section of `~/Pages/Shared/_Layout.cshtml` or `~/Views/Shared/_Layout.cshtml`:

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - My App</title>
    
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

### Option B: NPM Package

```bash
npm install @syncfusion/ej2-charts
```

Then reference the local scripts:

```html
<script src="~/node_modules/@syncfusion/ej2-charts/dist/ej2-charts.iife.min.js"></script>
```

### Option C: Static Files (Local Copy)

1. Download the EJ2 script from [Syncfusion downloads](https://www.syncfusion.com/downloads)
2. Copy to `wwwroot/scripts/` folder
3. Reference it:

```html
<script src="~/scripts/ej2.min.js"></script>
```

## Step 4: Register Script Manager

Add the script manager tag at the **end of the `<body>`** section in your layout file:

```html
<body>
    <!-- Your page content -->
    @RenderBody()
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

**Important:** The `<ejs-scripts>` tag must be placed after the `@RenderBody()` and before the closing `</body>` tag.

## Step 6: Create Your First Chart

### Razor Pages Example

**Pages/Index.cshtml:**

```cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="container">
    <h2>Sales Analysis</h2>
    
    <ejs-chart id="container" title="Monthly Sales" width="90%">
        <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        </e-chart-primaryxaxis>
        <e-series-collection>
            <e-series dataSource="@Model.ChartData" 
                      xName="Month" 
                      yName="Sales" 
                      type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            </e-series>
        </e-series-collection>
    </ejs-chart>
</div>
```

**Pages/Index.cshtml.cs:**

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyApp.Pages
{
    public class IndexModel : PageModel
    {
        public List<ChartData> ChartData { get; set; }

        public void OnGet()
        {
            ChartData = new List<ChartData>
            {
                new ChartData { Month = "Jan", Sales = 35 },
                new ChartData { Month = "Feb", Sales = 28 },
                new ChartData { Month = "Mar", Sales = 34 },
                new ChartData { Month = "Apr", Sales = 32 },
                new ChartData { Month = "May", Sales = 40 },
                new ChartData { Month = "Jun", Sales = 38 }
            };
        }
    }

    public class ChartData
    {
        public string Month { get; set; }
        public double Sales { get; set; }
    }
}
```

### MVC Example

**Controllers/HomeController.cs:**

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.ChartData = new List<ChartData>
            {
                new ChartData { Month = "Jan", Sales = 35 },
                new ChartData { Month = "Feb", Sales = 28 },
                new ChartData { Month = "Mar", Sales = 34 },
                new ChartData { Month = "Apr", Sales = 32 },
                new ChartData { Month = "May", Sales = 40 },
                new ChartData { Month = "Jun", Sales = 38 }
            };
            return View();
        }
    }

    public class ChartData
    {
        public string Month { get; set; }
        public double Sales { get; set; }
    }
}
```

**Views/Home/Index.cshtml:**

```cshtml
@{
    ViewData["Title"] = "Home Page";
}

<div class="container">
    <h2>Sales Analysis</h2>
    
    <ejs-chart id="container" title="Monthly Sales" width="90%">
        <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        </e-chart-primaryxaxis>
        <e-series-collection>
            <e-series dataSource="@ViewBag.ChartData" 
                      xName="Month" 
                      yName="Sales" 
                      type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            </e-series>
        </e-series-collection>
    </ejs-chart>
</div>
```

## Step 7: Run the Application

Press **F5** (Windows) or **⌘ + Enter** (macOS) to run your application. The chart should render with the data you provided.

## Basic Chart Configuration

### Minimum Required Properties

```cshtml
<ejs-chart id="container">
    <e-series-collection>
        <e-series dataSource="@Model.Data" 
                  xName="X" 
                  yName="Y">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Common Initial Properties

```cshtml
<ejs-chart id="container" 
           title="Chart Title" 
           width="100%" 
           height="400px">
    
    <!-- Primary X Axis -->
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" 
                          title="X Axis Title">
    </e-chart-primaryxaxis>
    
    <!-- Primary Y Axis -->
    <e-chart-primaryyaxis title="Y Axis Title">
    </e-chart-primaryyaxis>
    
    <!-- Series -->
    <e-series-collection>
        <e-series dataSource="@Model.Data" 
                  xName="X" 
                  yName="Y" 
                  name="Series 1"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
    
    <!-- Legend -->
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
    
    <!-- Tooltip -->
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
</ejs-chart>
```

## Data Binding Patterns

### Simple Array of Objects

```csharp
public List<object> ChartData { get; set; } = new List<object>
{
    new { X = "A", Y = 10 },
    new { X = "B", Y = 20 },
    new { X = "C", Y = 30 }
};
```

### Strongly Typed Model

```csharp
public class SalesData
{
    public string Month { get; set; }
    public double Revenue { get; set; }
    public double Profit { get; set; }
}

public List<SalesData> ChartData { get; set; } = new List<SalesData>
{
    new SalesData { Month = "Jan", Revenue = 50000, Profit = 15000 },
    new SalesData { Month = "Feb", Revenue = 55000, Profit = 18000 }
};
```

### ViewBag/ViewData Pattern

```csharp
// Controller
ViewBag.ChartData = GetChartData();
ViewData["ChartData"] = GetChartData();

// View
<e-series dataSource="@ViewBag.ChartData" xName="X" yName="Y">
```

## Handling Events

### Chart Load Event

```cshtml
<ejs-chart id="container" load="onChartLoad">
    <!-- ... -->
</ejs-chart>

<script>
    function onChartLoad(args) {
        console.log('Chart loaded');
    }
</script>
```

### Point Click Event

```cshtml
<ejs-chart id="container" pointClick="onPointClick">
    <!-- ... -->
</ejs-chart>

<script>
    function onPointClick(args) {
        console.log('Clicked point:', args.point);
        alert('Value: ' + args.point.y);
    }
</script>
```

## Licensing

Syncfusion requires a license key for production use. Register your license key in `Program.cs` (or `Startup.cs` for older versions):

### .NET 6+ (Program.cs)

```csharp
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Register Syncfusion license
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

// Add services
builder.Services.AddControllersWithViews();
// ... rest of configuration
```

### .NET Core 3.1 (Startup.cs)

```csharp
using Syncfusion.Licensing;

public class Startup
{
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // Register Syncfusion license
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // ... rest of configuration
    }
}
```

**Getting a license key:**
- **Trial:** Get a 30-day free trial at [syncfusion.com/downloads](https://www.syncfusion.com/downloads)
- **Community:** Free for individuals and small businesses (revenue < $1M)
- **Paid:** Purchase from [syncfusion.com/sales/products](https://www.syncfusion.com/sales/products)

## Troubleshooting Common Issues

### Chart Not Rendering

**Issue:** Blank space where chart should be

**Solutions:**
1. Verify NuGet package is installed: Check `*.csproj` file for `<PackageReference Include="Syncfusion.EJ2.AspNet.Core">`
2. Ensure `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml`
3. Check script reference is present in `<head>`
4. Verify `<ejs-scripts>` is at the end of `<body>`
5. Open browser console (F12) and check for JavaScript errors

### License Warning Message

**Issue:** "This application was built using a trial version..." message

**Solution:** Register your license key in `Program.cs` or `Startup.cs` as shown above

### Data Not Displaying

**Issue:** Chart renders but no data visible

**Solutions:**
1. Verify `dataSource` is not null or empty
2. Check `xName` and `yName` properties match your data model properties (case-sensitive)
3. Ensure data is bound correctly in controller/page model
4. Check axis `valueType` matches your data (e.g., use `Category` for string X values)

### Script Errors

**Issue:** JavaScript errors in console

**Solutions:**
1. Ensure script is loaded before `<ejs-scripts>` tag
2. Check script version compatibility with NuGet package
3. Verify CDN URL is accessible
4. Try clearing browser cache

## Complete Working Example

Here's a complete, copy-paste ready example:

**Program.cs (.NET 6+):**

```csharp
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

**_Layout.cshtml:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"]</title>
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
<body>
    <div class="container">
        @RenderBody()
    </div>
    <ejs-scripts></ejs-scripts>
</body>
</html>
```

This provides a solid foundation for building charts in your ASP.NET Core application. Refer to other reference files for advanced features and customization options.
