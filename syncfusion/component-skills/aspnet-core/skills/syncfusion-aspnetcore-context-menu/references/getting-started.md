# Getting Started with ASP.NET Core ContextMenu

## Table of Contents
- [Prerequisites](#prerequisites)
- [Create ASP.NET Core Project](#create-aspnet-core-project)
- [Install NuGet Package](#install-nuget-package)
- [Register TagHelper](#register-taghelper)
- [Add Resources](#add-resources)
- [Register Script Manager](#register-script-manager)
- [Basic Implementation](#basic-implementation)
- [Enable RTL](#enable-rtl)

## Prerequisites

Before implementing the ContextMenu component, ensure your development environment meets these requirements:

- **Visual Studio**: 2019 or later (Professional, Community, or Enterprise edition)
- **.NET Framework**: .NET 6.0 or higher
- **ASP.NET Core Runtime**: Installed and configured
- **Node.js**: Optional, for advanced theme customization via NPM packages
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge) with JavaScript enabled

Verify your ASP.NET Core version with:
```bash
dotnet --version
```

Ensure you have NuGet package manager access. If using private NuGet feeds, configure authentication in NuGet.config file within your solution.

## Create ASP.NET Core Project

Create a new ASP.NET Core Razor Pages application using Visual Studio or the .NET CLI:

**Via Visual Studio:**
1. Open Visual Studio → Create New Project
2. Select "ASP.NET Core Web App (Model-View-Controller)" or "ASP.NET Core Web App (Razor Pages)"
3. Configure project name, location, and target framework (.NET 6.0 or higher)
4. Verify project loads successfully

**Via .NET CLI:**
```bash
dotnet new webapp -n ContextMenuApp
cd ContextMenuApp
```

Verify the project structure includes:
- `Pages/` folder for Razor pages
- `wwwroot/` folder for static assets
- `Program.cs` for application configuration
- `Properties/launchSettings.json` for launch profile

## Install NuGet Package

Add the Syncfusion.EJ2.AspNet.Core NuGet package to your project:

**Via Package Manager Console:**
```bash
Install-Package Syncfusion.EJ2.AspNet.Core
```

**Via .NET CLI:**
```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

**Via Visual Studio Package Manager UI:**
1. Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Search for "Syncfusion.EJ2.AspNet.Core"
3. Select latest stable version and install

The NuGet package includes:
- TagHelper definitions for ej2 components
- Required dependencies (Newtonsoft.Json, Syncfusion.Licensing)
- Theme CSS files and JavaScript files
- Component assemblies

Verify installation by checking your `.csproj` file for the package reference:
```xml
<PackageReference Include="Syncfusion.EJ2.AspNet.Core" Version="*.*.*" />
```

## Register TagHelper

Add the Syncfusion TagHelper to your `_ViewImports.cshtml` file to enable ej2 component tags throughout your application:

**File: `~/Pages/_ViewImports.cshtml`**
```csharp
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

The `@addTagHelper *, Syncfusion.EJ2` directive enables all Syncfusion component tags:
- `<ejs-contextmenu>` for context menu component
- `<ejs-menu>` for menu items configuration
- `<e-menu-item>` for individual menu item definition
- `<e-menu-items>` for menu items collection
- `<e-animation-settings>` for animation configuration

This registration applies globally to all views and pages in the `Pages/` directory and subdirectories.

**Important:** Without this registration, TagHelper syntax will not be recognized and components will fail to render.

## Add Resources

Include Syncfusion stylesheets and scripts in your `_Layout.cshtml` file:

**File: `~/Pages/Shared/_Layout.cshtml`**

Add these lines in the `<head>` section:
```html
<head>
    <!-- Existing meta tags and title -->
    
    <!-- Syncfusion Fluent Theme CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.1.36/fluent.css" />
    
    <!-- Alternative themes available -->
    <!-- Material: https://cdn.syncfusion.com/ej2/23.1.36/material.css -->
    <!-- Bootstrap: https://cdn.syncfusion.com/ej2/23.1.36/bootstrap5.css -->
    <!-- Tailwind: https://cdn.syncfusion.com/ej2/23.1.36/tailwind.css -->
    <!-- Fabric: https://cdn.syncfusion.com/ej2/23.1.36/fabric.css -->
</head>
```

Add these lines in the `<body>` section (before `</body>`):
```html
<body>
    <!-- Your page content -->
    
    <!-- Syncfusion EJ2 Core JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/23.1.36/dist/ej2.min.js"></script>
</body>
```

**Available Themes:**
- `fluent.css` - Modern fluent design (recommended, smaller bundle)
- `material.css` - Material Design themes
- `bootstrap5.css` - Bootstrap 5 compatibility
- `tailwind.css` - Tailwind CSS compatible
- `fabric.css` - Office Fabric UI inspired

Choose one theme based on your application's design system. The current CDN version shown is 23.1.36 — update to the latest available version for new features and bug fixes.

**CDN Performance Tips:**
- CDN ensures latest updates without manual file management
- Leverage browser caching for repeated visits
- For offline scenarios, download resources and serve locally from `wwwroot/`

## Register Script Manager

Add the Syncfusion Script Manager at the end of your `_Layout.cshtml` file (before closing `</body>`):

**File: `~/Pages/Shared/_Layout.cshtml`**
```html
<body>
    <!-- Your page content -->
    
    <script src="https://cdn.syncfusion.com/ej2/23.1.36/dist/ej2.min.js"></script>
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` tag helper provides:
- Global script initialization for all Syncfusion components
- Locale resource loading (if configured)
- License validation if Syncfusion license is registered

This registration must occur AFTER the component definitions in the page but before the closing body tag.

## Basic Implementation

Create a basic ContextMenu that appears on right-click of a target element:

**File: `~/Pages/Index.cshtml`**
```html
@page
@model IndexModel

<div id="target">Right-click here to open context menu</div>

<ejs-contextmenu id="contextmenu" target="#target" items="Model.MenuItems"></ejs-contextmenu>

<style>
    #target {
        border: 2px solid #007bff;
        padding: 20px;
        border-radius: 4px;
        user-select: none;
        cursor: context-menu;
    }
</style>
```

**File: `~/Pages/Index.cshtml.cs`**
```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ContextMenuApp.Pages
{
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
```

**Result:** When you right-click on the target element, a context menu with Cut, Copy, and Paste options appears.

## Data-Driven Implementation

## Data-Driven Implementation

Populate menu items from C# code by binding to the MenuItems property:

**File: `~/Pages/Index.cshtml`**
```html
@page
@model IndexModel

<div id="documentTarget">Right-click document</div>

<ejs-contextmenu id="docMenu" target="#documentTarget" items="Model.MenuItems"></ejs-contextmenu>

<style>
    #documentTarget {
        border: 2px solid #28a745;
        padding: 30px;
        border-radius: 4px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: context-menu;
    }
</style>
```

**File: `~/Pages/Index.cshtml.cs`**
```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

public class IndexModel : PageModel
{
    public List<object> MenuItems { get; set; }
    
    public void OnGet()
    {
        MenuItems = new List<object>
        {
            new { text = "New", id = "new" },
            new { text = "Open", id = "open" },
            new { separator = true },
            new { text = "Save", id = "save" },
            new { text = "Save As", id = "saveas" },
            new { separator = true },
            new { text = "Exit", id = "exit" }
        };
    }
}
```

**Result:** Menu items are populated from the C# List, enabling dynamic menu generation based on application state.

## Enable RTL (Right-to-Left)

For applications supporting right-to-left languages (Arabic, Hebrew, Persian, Urdu):

```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 enableRtl="true"
                 locale="ar"
                 items="Model.MenuItems">
</ejs-contextmenu>
```

**C# PageModel:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "قص", id = "cut" },      // Cut in Arabic
        new { text = "نسخ", id = "copy" },    // Copy in Arabic
        new { text = "لصق", id = "paste" }    // Paste in Arabic
    };
}
```

Properties:
- `enableRtl="true"` - Enables right-to-left text direction and layout mirroring
- `locale="ar"` - Sets component locale to Arabic (or other RTL language code)

The component automatically mirrors menu layout, text alignment, and navigation direction when RTL is enabled.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Context menu not appearing** | Verify target element CSS selector is correct, component ID is unique, target element exists in DOM |
| **TagHelper not recognized** | Confirm `@addTagHelper *, Syncfusion.EJ2` is present in _ViewImports.cshtml |
| **Styles not applied** | Verify stylesheet CDN link is present in `<head>`, check browser network tab for 200 HTTP response |
| **JavaScript errors** | Ensure `ej2.min.js` script is loaded, check script order (CSS before JS), verify CDN URLs are accessible |
| **License warning in console** | Register Syncfusion license or ignore if using trial version |

