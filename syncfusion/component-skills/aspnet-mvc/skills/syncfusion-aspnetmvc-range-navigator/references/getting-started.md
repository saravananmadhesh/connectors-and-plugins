# Getting Started with Range Navigator in ASP.NET MVC

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installing the Syncfusion.EJ2.MVC5 NuGet Package](#installing-the-syncfusionej2mvc5-nuget-package)
- [Adding Namespace Reference](#adding-namespace-reference)
- [Configuring Script Resources](#configuring-script-resources)
- [Registering the Script Manager](#registering-the-script-manager)
- [Creating Your First Range Navigator](#creating-your-first-range-navigator)
- [Understanding the Basic Setup](#understanding-the-basic-setup)
- [Running the Application](#running-the-application)
- [Common Setup Issues and Solutions](#common-setup-issues-and-solutions)
  - [Issue: "The type or namespace name 'Syncfusion' does not exist"](#issue-the-type-or-namespace-name-syncfusion-does-not-exist)
  - [Issue: Component not rendering](#issue-component-not-rendering)
  - [Issue: DateTime values not displaying correctly](#issue-datetime-values-not-displaying-correctly)
  - [Issue: Styling appears broken](#issue-styling-appears-broken)
- [Next Steps](#next-steps)

## Prerequisites

Before implementing the Syncfusion Range Navigator, ensure your development environment meets these requirements:

- .NET Framework 4.5 or later
- Visual Studio 2015 or later
- ASP.NET MVC 5 or later
- Modern browser with JavaScript support (Chrome, Firefox, Edge, Safari)

## Installing the Syncfusion.EJ2.MVC5 NuGet Package

The Range Navigator control is included in the Syncfusion.EJ2.MVC5 package. Install it via NuGet Package Manager:

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 33.1.44
```

**Using NuGet Package Manager UI:**
1. Right-click your project in Solution Explorer
2. Select "Manage NuGet Packages"
3. Search for "Syncfusion.EJ2.MVC5"
4. Click "Install"

**Dependencies:** The package depends on:
- Newtonsoft.Json (for JSON serialization)
- Syncfusion.Licensing (for license key validation)

These are automatically installed with the main package.

## Adding Namespace Reference

Add the Syncfusion.EJ2 namespace in your `Web.config` file located in the `Views` folder:

```xml
<!-- ~/Views/Web.config -->
<configuration>
    <system.web.webServer>
        <runtime>
            <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
                <!-- other bindings -->
            </assemblyBinding>
        </runtime>
    </system.web.webServer>
    <appSettings>
        <!-- Syncfusion namespace -->
    </appSettings>
</configuration>
```

Add this to the namespaces section:
```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

## Configuring Script Resources

Add Syncfusion script references to your shared layout file. Reference scripts via CDN (recommended) or download locally.

**Option 1: CDN (Recommended)**

Edit `~/Views/Shared/_Layout.cshtml`:

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My ASP.NET MVC Application</title>
    
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    
    <!-- Syncfusion JS -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    
    <!-- Script Manager at end of body -->
    @Html.EJS().ScriptManager()
</body>
</html>
```

**Option 2: Local Files**
1. Download Syncfusion files from the package
2. Place in `~/Content/` and `~/Scripts/` folders
3. Reference locally instead of CDN URLs

## Registering the Script Manager

The script manager must be registered at the end of your layout's `<body>` tag. This initializes all Syncfusion components:

```html
<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <!-- Navigation content -->
        </div>
    </div>
    
    <div class="container body-content">
        @RenderBody()
    </div>
    
    <!-- IMPORTANT: Register Script Manager at end -->
    @Html.EJS().ScriptManager()
</body>
```

## Creating Your First Range Navigator

Create a new MVC controller action and view to render the Range Navigator.

**Step 1: Create Controller Action**

```csharp
// Controllers/HomeController.cs
using System;
using System.Collections.Generic;
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        List<RangeData> dataSource = new List<RangeData>
        {
            new RangeData { x = new DateTime(2020, 01, 01), y = 21 },
            new RangeData { x = new DateTime(2020, 02, 01), y = 24 },
            new RangeData { x = new DateTime(2020, 03, 01), y = 36 },
            new RangeData { x = new DateTime(2020, 04, 01), y = 38 },
            new RangeData { x = new DateTime(2020, 05, 01), y = 54 },
            new RangeData { x = new DateTime(2020, 06, 01), y = 57 },
            new RangeData { x = new DateTime(2020, 07, 01), y = 70 }
        };
        return View(dataSource);
    }
}

public class RangeData
{
    public DateTime x;
    public double y;
}
```

**Step 2: Create View**

```html
<!-- Views/Home/Index.cshtml -->
@model List<RangeNavigatorSample.Controllers.RangeData>

@{
    ViewBag.Title = "Range Navigator Getting Started";
}

<h2>Range Navigator Example</h2>

<div id="container" style="height: 350px;">
    @(Html.EJS().RangeNavigator("container")
        .Series(series =>
        {
            series.XName("x")
                  .YName("y")
                  .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
                  .Add();
        })
        .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
        .DataSource(Model)
        .Render()
    )
</div>
```

## Understanding the Basic Setup

The above example creates a Range Navigator with:
- **DataSource**: Bound to the list of RangeData from the controller
- **Series**: Configured to display Area chart with DateTime values
- **ValueType**: Set to DateTime (recognizes DateTime values on x-axis)
- **Container**: Defined as "container" div with specified height

## Running the Application

1. Press `Ctrl+F5` (Windows) or `Cmd+F5` (macOS) to run the application
2. The Range Navigator renders with an area visualization
3. Drag the range selection handles to explore the data
4. The selected range appears highlighted

## Common Setup Issues and Solutions

### Issue: "The type or namespace name 'Syncfusion' does not exist"
**Solution:** Ensure namespace is added to Web.config and NuGet package is installed. Rebuild the solution.

### Issue: Component not rendering
**Solution:** Verify:
- Script manager is registered in layout
- CSS and JS references are correct (check version numbers)
- Data source is not null
- Series xName/yName match your data properties

### Issue: DateTime values not displaying correctly
**Solution:** Set `ValueType` to `DateTime` and ensure your data contains DateTime objects, not strings.

### Issue: Styling appears broken
**Solution:** Verify CSS file reference is loaded. Check browser console (F12) for 404 errors on CSS files.

## Next Steps

After setting up your first Range Navigator:
1. Bind different data sources (see Data Binding reference)
2. Customize appearance (see Customization reference)
3. Add interaction features like tooltips and period selectors (see Interaction Features reference)
4. Ensure accessibility compliance (see Accessibility reference)
5. Explore advanced integration scenarios (see Advanced Usage reference)
