# Getting Started with ASP.NET MVC TreeMap Control

## Table of Contents
- [System Requirements and Prerequisites](#system-requirements-and-prerequisites)
- [Create ASP.NET MVC Application](#create-aspnet-mvc-application)
- [Install Syncfusion NuGet Package](#install-syncfusion-nuget-package)
- [Add Namespace Reference](#add-namespace-reference)
- [Add Script Resources](#add-script-resources)
- [Register Script Manager](#register-script-manager)
- [Add TreeMap Control](#add-treemap-control)
- [Verify Your Setup](#verify-your-setup)

## System Requirements and Prerequisites

Before you begin, ensure your development environment meets these requirements:

### Required Components
- **Operating System:** Windows 7 or later, macOS, or Linux
- **IDE:** Visual Studio 2015 or later (recommended: Visual Studio 2019 or 2022)
- **.NET Framework:** .NET Framework 4.5 or later
- **ASP.NET MVC:** MVC 5 or later

### Reference Documentation
For complete system requirements, refer to the [official Syncfusion ASP.NET MVC system requirements documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements).

### Package Dependencies
The Syncfusion.EJ2.MVC5 NuGet package includes these required dependencies:
- **Newtonsoft.Json:** For JSON serialization and deserialization
- **Syncfusion.Licensing:** For Syncfusion license key validation

These will be installed automatically when you install the main package.

## Create ASP.NET MVC Application

### Option 1: Using Microsoft Templates (Standard Visual Studio)

1. **Open Visual Studio** and click **Create a new project**
2. **Select ASP.NET MVC** from the project templates list
3. **Configure the project:**
   - Enter a project name (e.g., "TreeMapExample")
   - Choose a location for your project
   - Click **Next**
4. **Select ASP.NET MVC version** (MVC 5 recommended)
5. **Click Create**

For detailed instructions, refer to [Microsoft's ASP.NET MVC Getting Started guide](https://learn.microsoft.com/en-us/aspnet/mvc/overview/getting-started/introduction/getting-started#create-your-first-app).

### Option 2: Using Syncfusion ASP.NET MVC Extension

Syncfusion provides a Visual Studio extension that creates pre-configured ASP.NET MVC projects with Syncfusion components already set up:

1. **Install the Syncfusion Extension** from the Visual Studio Marketplace
2. **Go to File → New → Project**
3. **Select Syncfusion ASP.NET MVC Application**
4. **Configure your project settings**
5. **Click Create** — the project is pre-configured with all necessary references

For detailed instructions, refer to the [Syncfusion Visual Studio Integration documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/visual-studio-integration/create-project).

## Install Syncfusion NuGet Package

### Using NuGet Package Manager GUI

1. **Open Visual Studio** with your ASP.NET MVC project
2. **Go to Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
3. **Click the Browse tab**
4. **Search for** `Syncfusion.EJ2.MVC5`
5. **Select the latest stable version** from the results
6. **Click Install**
7. **Accept any license agreements** that appear
8. **Wait for installation to complete**

### Using Package Manager Console

If you prefer using the console, open the **Package Manager Console** (Tools → NuGet Package Manager → Package Manager Console) and run:

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

Replace `{{ site.ej2version }}` with the latest version number (e.g., `20.4.0.42`).

### Verify Installation

After installation, verify the NuGet package was added correctly:

1. **Open your project's .csproj file** in an editor
2. **Look for the ItemGroup section** containing package references
3. **Confirm Syncfusion.EJ2.MVC5 is listed** with a version number

The installation includes:
- Syncfusion.EJ2 (main library)
- Syncfusion.Licensing (license validation)
- Newtonsoft.Json (JSON support)

All required dependencies are installed automatically.

## Add Namespace Reference

After installing the NuGet package, you must register the Syncfusion namespace in your application's Web.config file.

### Locate Web.config

The file you need to edit is located at: `~/Views/Web.config` (not the root Web.config)

### Add the Namespace

Open `~/Views/Web.config` and locate the `<configuration>` section. Find the `<system.web.webServer>` section, or if it doesn't exist, find the `<appSettings>` or root level, and add the namespace reference.

Look for the `<namespaces>` section (usually inside `<system.web.webServer` or at the root level):

```xml
<configuration>
  <system.web.webServer>
    ...
  </system.web.webServer>
  
  <!-- Add this section if it doesn't exist, or update existing namespace section -->
  <namespaces>
    <add namespace="Syncfusion.EJ2"/>
  </namespaces>
</configuration>
```

If the `<namespaces>` section already exists, simply add this line inside it:

```xml
<add namespace="Syncfusion.EJ2"/>
```

**Result:** After this step, your Razor views can use `@Html.EJS()` helper syntax without requiring explicit using statements.

## Add Script Resources

The TreeMap component requires JavaScript files to function. You must reference these scripts in your layout file.

### Recommended: Using CDN (Easiest)

CDN (Content Delivery Network) is the simplest approach. Add this script tag to the `<head>` section of your layout file (`~/Views/Shared/_Layout.cshtml`):

```html
<head>
    ...
    <!-- Syncfusion Essential JS 2 ScriptManager -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

Replace `{{ site.ej2version }}` with a specific version (e.g., `20.4.0`).

**Benefits of CDN:**
- No local file management needed
- Automatic browser caching across sites
- Always get the latest minor updates

**Drawbacks:**
- Requires internet connection for first load
- Slightly slower for local development than local files

### Alternative: Using Local Files

If you prefer to serve scripts from your local server:

1. **Download Syncfusion JS files** from the [Syncfusion CDN](https://cdn.syncfusion.com/ej2/)
2. **Create a folder** in your project (e.g., `~/Scripts/Syncfusion/`)
3. **Place the downloaded files** in this folder
4. **Reference the local file** in your layout:

```html
<head>
    ...
    <script src="~/Scripts/Syncfusion/ej2.min.js"></script>
</head>
```

For more approaches, refer to the [official Adding Script References documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/common/adding-script-references).

## Register Script Manager

After adding the main JavaScript file, you must register the Syncfusion ScriptManager at the **end** of your layout file's `<body>` tag.

### Edit Your Layout File

Open `~/Views/Shared/_Layout.cshtml` and locate the closing `</body>` tag.

Add this code **before** the closing `</body>` tag:

```html
<body>
    ...
    
    <!-- Syncfusion ASP.NET MVC Script Manager - MUST be at the end of body -->
    @Html.EJS().ScriptManager()
</body>
```

**Important:** The ScriptManager must be placed **after all your control definitions** and **at the very end** of the body tag. This ensures all controls are initialized properly.

### What ScriptManager Does

The ScriptManager:
- Initializes Syncfusion controls on the page
- Sets up event handlers and callbacks
- Manages control lifecycle and cleanup
- Enables control serialization and communication

Without registering ScriptManager, your TreeMap controls will not render or function.

## Add TreeMap Control

Now you're ready to add your first TreeMap control!

### Complete Example: Controller

Create or update your `HomeController.cs`:

```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }

    public ActionResult GetTreeMapData()
    {
        List<object> treeMapData = new List<object>
        {
            new { Name = "USA", GDPValue = 21000, Country = "USA" },
            new { Name = "China", GDPValue = 14000, Country = "China" },
            new { Name = "Japan", GDPValue = 5000, Country = "Japan" },
            new { Name = "Germany", GDPValue = 4000, Country = "Germany" },
            new { Name = "United Kingdom", GDPValue = 2900, Country = "UK" },
            new { Name = "France", GDPValue = 2700, Country = "France" }
        };
        return Json(treeMapData, JsonRequestBehavior.AllowGet);
    }
}
```

### Complete Example: View (Index.cshtml)

Update your `~/Views/Home/Index.cshtml`:

```razor
@{
    ViewBag.Title = "TreeMap Getting Started";
}

<h2>TreeMap Control - Getting Started</h2>

<div class="treemap-container">
    @Html.EJS().TreeMap("container")
        .DataSource(new List<object>
        {
            new { Name = "USA", GDPValue = 21000 },
            new { Name = "China", GDPValue = 14000 },
            new { Name = "Japan", GDPValue = 5000 },
            new { Name = "Germany", GDPValue = 4000 },
            new { Name = "United Kingdom", GDPValue = 2900 },
            new { Name = "France", GDPValue = 2700 }
        })
        .WeightValuePath("GDPValue")
        .Levels(levels =>
        {
            levels.GroupPath("Name").Add();
        })
        .LeafItemSettings(leaf => leaf.LabelPath("Name"))
        .Tooltip(tooltip => tooltip.Visible(true).Format("<b>${Name}</b><br/>GDP: $${GDPValue}B"))
        .Render();
</div>

<style>
    .treemap-container {
        padding: 20px;
        width: 100%;
        height: 500px;
    }
</style>
```

### Key Properties Explained

| Property | Purpose | Example Value |
|----------|---------|----------------|
| **DataSource** | Collection of data objects to visualize | List<object> with Name, GDPValue |
| **WeightValuePath** | Property name that determines rectangle area | "GDPValue" |
| **Levels** | Hierarchical grouping configuration | GroupPath("Name") |
| **LeafItemSettings** | Label and rendering settings for leaf items | LabelPath("Name") |
| **Tooltip** | Interactive tooltip on hover | Visible(true), Custom format |

## Verify Your Setup

### Run Your Application

1. **Build the solution** (Ctrl+Shift+B in Visual Studio)
2. **Start debugging** (Press F5 or Ctrl+F5)
3. **Navigate to your TreeMap page** (typically http://localhost:PORT/Home/Index)

### Expected Result

You should see:
- ✅ A rectangular area divided into colored rectangles
- ✅ Each rectangle labeled with a country name
- ✅ Rectangle sizes proportional to GDP values (larger GDP = larger rectangle)
- ✅ Tooltip appearing on mouse hover showing country name and GDP

### Troubleshooting

**Issue: No TreeMap visible, blank page**
- Check browser console (F12) for JavaScript errors
- Verify ScriptManager is registered in your layout
- Confirm CDN link or local script path is correct
- Clear browser cache and refresh

**Issue: "Html.EJS() not recognized"**
- Verify namespace is added to ~/Views/Web.config
- Rebuild the solution
- Close and reopen the view file

**Issue: "WeightValuePath is not valid"**
- Confirm the property name exists in your data source
- Check for case sensitivity (property names are case-sensitive)
- Verify data is being passed correctly from the controller

**Issue: Tooltips not appearing**
- Set `Tooltip(tooltip => tooltip.Visible(true))`
- Verify browser console has no JavaScript errors
- Check that your data contains the fields referenced in the tooltip format

### Next Steps

After verifying the basic TreeMap works:

1. **Review Data Binding** to learn how to connect more complex data sources
2. **Explore Color Mapping** to apply conditional colors based on data values
3. **Configure Layouts** to change how rectangles are arranged
4. **Add Interactive Features** like drill-down and selection

Your TreeMap is now set up and ready for further customization!

