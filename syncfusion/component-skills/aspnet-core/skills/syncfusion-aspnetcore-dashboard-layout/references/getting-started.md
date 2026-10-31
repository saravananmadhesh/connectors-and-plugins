# Getting Started with Dashboard Layout

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installing the NuGet Package](#installing-the-nuget-package)
- [ASP.NET Core Project Setup](#aspnet-core-project-setup)
- [Adding TagHelper References](#adding-taghelper-references)
- [Resource Configuration](#resource-configuration)
- [Basic Initialization](#basic-initialization)
- [Initialization Methods](#initialization-methods)
- [First Render with Panels](#first-render-with-panels)

## Prerequisites

Before implementing Dashboard Layout in your ASP.NET Core application, ensure you have:

- Visual Studio 2019 or later
- .NET Core 5.0 or higher (ASP.NET Core 5.0+)
- Basic knowledge of Razor Pages or ASP.NET Core MVC
- Understanding of TagHelper syntax in ASP.NET Core

For detailed system requirements, refer to the [Syncfusion ASP.NET Core System Requirements documentation](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements).

## Installing the NuGet Package

The Dashboard Layout component is available through the NuGet package manager. You need to install the Syncfusion.EJ2.AspNet.Core package which contains all essential Syncfusion components including Dashboard Layout.

### Method 1: Using Package Manager Console

Open the NuGet Package Manager Console in Visual Studio and execute the following command:

```
Install-Package Syncfusion.EJ2.AspNet.Core -Version 26.1.35
```

Replace the version number with the latest available version of Syncfusion EJ2.

### Method 2: Using Package Manager GUI

1. Right-click on your project in Solution Explorer
2. Select "Manage NuGet Packages"
3. Search for "Syncfusion.EJ2.AspNet.Core"
4. Click "Install" and accept the terms

### Package Dependencies

The Syncfusion.EJ2.AspNet.Core NuGet package includes the following dependencies:
- **Newtonsoft.Json** - For JSON serialization and deserialization
- **Syncfusion.Licensing** - For license validation

Both dependencies are automatically installed when you install the main package. You can find all available packages at [https://www.nuget.org/packages?q=syncfusion.EJ2](https://www.nuget.org/packages?q=syncfusion.EJ2).

## ASP.NET Core Project Setup

### Step 1: Create an ASP.NET Core Project

If you don't have an existing ASP.NET Core project, create one using:

**Option A: Using Microsoft Templates**

Follow the [official Microsoft guide for creating Razor Pages applications](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-8.0&tabs=visual-studio#create-a-razor-pages-web-app).

**Option B: Using Syncfusion Extension**

Use the [Syncfusion ASP.NET Core Extension for Visual Studio](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project) to create a pre-configured project with all Syncfusion components ready to use.

### Step 2: Target Framework Configuration

Ensure your `.csproj` file targets the appropriate framework:

```xml
<TargetFramework>net6.0</TargetFramework>
<!-- or -->
<TargetFramework>net7.0</TargetFramework>
```

## Adding TagHelper References

### Configure _ViewImports.cshtml

The TagHelper directive must be added to your `~/Pages/_ViewImports.cshtml` file to enable Syncfusion TagHelper usage throughout your application.

Open `~/Pages/_ViewImports.cshtml` and add the following line:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This single line registers all Syncfusion TagHelpers, allowing you to use components like `<ejs-dashboardlayout>` directly in your Razor views without additional configuration for each page.

If this is the first time adding Syncfusion TagHelpers, your `_ViewImports.cshtml` file should look similar to:

```csharp
@using YourProjectNamespace
@namespace YourProjectNamespace.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

## Resource Configuration

### Add Stylesheet and Script Resources

The Dashboard Layout control requires CSS and JavaScript resources to function properly. These must be referenced in your layout file (`~/Pages/Shared/_Layout.cshtml`).

You can reference resources from CDN or include them locally via NuGet packages.

### Using CDN (Recommended for Getting Started)

Add the following links to the `<head>` section of your `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Other head elements -->
    
    <!-- Syncfusion EJ2 Theme Stylesheet (CDN) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/fluent.css" />
    
    <!-- Syncfusion EJ2 Scripts (CDN) -->
    <script src="https://cdn.syncfusion.com/ej2/26.1.35/dist/ej2.min.js"></script>
</head>
```

### Available Themes

Syncfusion provides multiple themes. Replace `fluent.css` with your preferred theme:

- `fluent.css` - Modern Fluent theme
- `material.css` - Material Design theme
- `bootstrap5.css` - Bootstrap 5 theme
- `tailwind.css` - Tailwind CSS theme
- `bootstrap.css` - Bootstrap 4 theme
- `highcontrast.css` - High contrast theme

### Register Script Manager

The Syncfusion Script Manager must be registered at the end of the `<body>` in your layout file:

```html
<body>
    <!-- Your page content -->
    
    <!-- Syncfusion EJ2 Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` TagHelper initializes all Syncfusion components on the page. Ensure it's placed after all Syncfusion components.

## Basic Initialization

### Creating a Simple Dashboard Layout

Create a new Razor page file (e.g., `DashboardLayout.cshtml`) and add the following basic Dashboard Layout structure:

```html
<ejs-dashboardlayout id="default-layout" columns="4">
    <!-- Dashboard Layout will be rendered here -->
</ejs-dashboardlayout>
```

This creates an empty Dashboard Layout with 4 columns. The `id` attribute uniquely identifies the component for JavaScript interactions.

### Adding the Page Handler (C#)

In your page's code-behind file (`DashboardLayout.cshtml.cs`), ensure you have a basic page model:

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace YourProjectNamespace.Pages
{
    public class DashboardLayoutModel : PageModel
    {
        public void OnGet()
        {
            // Page initialization logic
        }
    }
}
```

## Initialization Methods

The Dashboard Layout component supports two primary initialization methods:

### Method 1: Using Content Attribute (Recommended for HTML Content)

When you need to include HTML content or styled output in panels, use the content attribute approach:

```html
<ejs-dashboardlayout id="dashboard" columns="6" allowDragging="true">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="3" sizeY="2" row="0" col="0" 
                                 header="<div>Sales Metrics</div>"
                                 content="<div style='padding: 20px;'><h5>Total Sales</h5><p class='text-danger'>$50,000</p></div>">
        </e-dashboardlayout-panel>
        
        <e-dashboardlayout-panel id="panel2" sizeX="3" sizeY="2" row="0" col="3" 
                                 header="<div>Revenue Report</div>"
                                 content="<div style='padding: 20px;'><h5>Monthly Revenue</h5><p class='text-success'>$120,000</p></div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

In this method:
- The `<e-dashboardlayout-panels>` collection contains individual `<e-dashboardlayout-panel>` elements
- Each panel has `id`, `sizeX`, `sizeY`, `row`, `col`, `header`, and `content` attributes
- The `header` attribute contains panel title HTML
- The `content` attribute contains panel body HTML
- Content can include inline styles and Bootstrap classes

### Method 2: Using TagHelper Properties (Recommended for Data-Driven Layouts)

For data-driven scenarios where panel configurations come from your C# model:

In `DashboardLayout.cshtml.cs`:

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourProjectNamespace.Pages
{
    public class DashboardLayoutModel : PageModel
    {
        public List<DashboardPanel> Panels { get; set; }

        public void OnGet()
        {
            Panels = new List<DashboardPanel>
            {
                new DashboardPanel 
                { 
                    Id = "panel1", 
                    SizeX = 3, 
                    SizeY = 2, 
                    Header = "Panel 1", 
                    Row = 0, 
                    Col = 0 
                },
                new DashboardPanel 
                { 
                    Id = "panel2", 
                    SizeX = 3, 
                    SizeY = 2, 
                    Header = "Panel 2", 
                    Row = 0, 
                    Col = 3 
                }
            };
        }
    }

    public class DashboardPanel
    {
        public string Id { get; set; }
        public int SizeX { get; set; }
        public int SizeY { get; set; }
        public string Header { get; set; }
        public int Row { get; set; }
        public int Col { get; set; }
    }
}
```

In `DashboardLayout.cshtml`:

```html
<ejs-dashboardlayout id="dashboard" columns="6" panels="Model.Panels">
</ejs-dashboardlayout>
```

## First Render with Panels

### Complete Example: Dashboard with Multiple Panels

Create a complete Dashboard Layout with panels containing different content:

```html
@page
@model YourProjectNamespace.Pages.DashboardLayoutModel
@{
    ViewData["Title"] = "Dashboard Layout";
    var cellSpacing = new double[] { 10, 10 };
}

<h1>My Dashboard</h1>

<ejs-dashboardlayout id="main-dashboard" 
                      columns="6" 
                      cellSpacing="@cellSpacing"
                      allowDragging="true" 
                      allowResizing="true" 
                      allowFloating="true">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="sales-panel" 
                                 sizeX="3" 
                                 sizeY="2" 
                                 row="0" 
                                 col="0" 
                                 header="<div>Sales Dashboard</div>"
                                 content="<div style='padding: 15px; text-align: center;'><h5>Total Sales</h5><h3 class='text-primary'>$1,250,000</h3><p class='text-muted'>YTD Performance</p></div>">
        </e-dashboardlayout-panel>

        <e-dashboardlayout-panel id="revenue-panel" 
                                 sizeX="3" 
                                 sizeY="2" 
                                 row="0" 
                                 col="3" 
                                 header="<div>Revenue Metrics</div>"
                                 content="<div style='padding: 15px; text-align: center;'><h5>Monthly Revenue</h5><h3 class='text-success'>$450,000</h3><p class='text-muted'>Current Month</p></div>">
        </e-dashboardlayout-panel>

        <e-dashboardlayout-panel id="activity-panel" 
                                 sizeX="6" 
                                 sizeY="2" 
                                 row="2" 
                                 col="0" 
                                 header="<div>Recent Activity</div>"
                                 content="<div style='padding: 15px;'><ul class='list-group'><li class='list-group-item'>New order received - Order #2024-001</li><li class='list-group-item'>Customer feedback submitted - Rating: 4.5/5</li><li class='list-group-item'>Inventory updated - 250 units added</li></ul></div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

@section Scripts {
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var dashboardObj = document.getElementById('main-dashboard').ej2_instances[0];
            console.log('Dashboard Layout initialized successfully');
        });
    </script>
}
```

### Verifying the Initialization

After running your application:

1. Navigate to the Dashboard Layout page
2. You should see a grid layout with multiple panels
3. Panels should be draggable, resizable, and floating enabled
4. Check the browser console - there should be no errors

If you see the dashboard rendered correctly with all panels visible, the basic initialization is complete. You can now proceed to configure specific features like dragging, resizing, or dynamic panel operations as described in other reference guides.

