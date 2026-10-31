# Getting Started with Syncfusion ASP.NET Core Sidebar

## Table of Contents
- [Prerequisites](#prerequisites)
- [Create ASP.NET Core Application](#create-aspnet-core-application)
- [Install Syncfusion Package](#install-syncfusion-package)
- [Register TagHelper](#register-taghelper)
- [Add CSS and Script Resources](#add-css-and-script-resources)
- [Register Script Manager](#register-script-manager)
- [Add Sidebar Component](#add-sidebar-component)
- [First Complete Example](#first-complete-example)
- [Running the Application](#running-the-application)
- [Troubleshooting Installation](#troubleshooting-installation)

## Prerequisites

Before setting up the Sidebar component, ensure your development environment meets these requirements:

- **Visual Studio 2019 or later** (with ASP.NET and web development workload installed)
- **ASP.NET Core Runtime 6.0 or later** installed on your machine
- **Basic knowledge of Razor pages** and ASP.NET Core project structure
- **NuGet Package Manager** access for installing Syncfusion packages
- **Internet connection** for CDN resource references or NuGet package downloads

You should also have .NET SDK installed that matches your target ASP.NET Core version. To check your installed .NET versions, open Command Prompt and run:

```
dotnet --version
```

For Syncfusion ASP.NET Core controls, review the official [system requirements documentation](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements) which provides detailed OS requirements and supported frameworks.

## Create ASP.NET Core Application

### Using Microsoft Templates

Create a new ASP.NET Core Razor Pages application using the Microsoft project templates:

1. Open **Visual Studio**
2. Select **Create a new project** from the start window
3. Search for and select **ASP.NET Core Web App** template
4. Click **Next**
5. Enter your project name (e.g., `SidebarDemo`)
6. Choose a location for your project
7. Click **Next**
8. Select your target framework version (ASP.NET Core 6.0 or later)
9. Click **Create**

Your new ASP.NET Core project will be created with a default Razor pages structure including Pages, wwwroot, and app configuration files.

### Using Syncfusion Extension (Optional)

Syncfusion provides an extension for Visual Studio that facilitates project creation with all necessary dependencies pre-configured:

1. Install the **Syncfusion Essential Studio for ASP.NET Core** extension from Visual Studio Marketplace
2. Create a new project using the Syncfusion template wizard
3. The wizard will automatically configure all dependencies and resource references

For detailed instructions on using the Syncfusion extension, refer to the [Visual Studio integration documentation](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project).

## Install Syncfusion Package

The Sidebar component is included in the **Syncfusion.EJ2.AspNet.Core** NuGet package. Install it using the NuGet Package Manager or Package Manager Console.

### Method 1: Using NuGet Package Manager GUI

1. In Visual Studio, select **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**
2. Select the **Browse** tab
3. Search for `Syncfusion.EJ2.AspNet.Core`
4. Select the package from the results
5. Click **Install** and accept the license agreement

### Method 2: Using Package Manager Console

Open the **Package Manager Console** (Tools → NuGet Package Manager → Package Manager Console) and execute:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 26.1.35
```

Replace `26.1.35` with the latest Syncfusion version number available on NuGet.

### Package Dependencies

The Syncfusion.EJ2.AspNet.Core NuGet package requires the following dependencies:

- **Newtonsoft.Json** - For JSON serialization and deserialization
- **Syncfusion.Licensing** - For license key validation

These packages are automatically installed with the main Syncfusion package, so no additional configuration is needed.

### Verify Installation

After installation completes, verify the package was added to your project:

1. Open **Package.csproj** file
2. Confirm the `<PackageReference>` entry exists for `Syncfusion.EJ2.AspNet.Core`
3. The version number should match what you installed

## Register TagHelper

The Syncfusion TagHelpers must be registered in your ASP.NET Core application to use components like Sidebar with the `<ejs-*>` syntax. Registration is done in the **_ViewImports.cshtml** file.

### Adding TagHelper Registration

Open the file at `~/Pages/_ViewImports.cshtml` (or `~/_ViewImports.cshtml` if not using Razor pages) and add the following registration:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This single line registers all Syncfusion EJ2 TagHelpers, making them available throughout your application. The syntax means:
- `@addTagHelper` - Directive to add TagHelper
- `*` - Register all TagHelpers from the assembly
- `Syncfusion.EJ2` - The assembly containing Syncfusion TagHelpers

### Complete _ViewImports.cshtml Example

Here's what a complete _ViewImports.cshtml file looks like with Syncfusion registration:

```csharp
@using SidebarDemo
@using SidebarDemo.Pages
@namespace SidebarDemo.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

The namespace directive specifies the namespace for pages in this folder, and multiple `@addTagHelper` directives can coexist.

## Add CSS and Script Resources

Syncfusion components require CSS stylesheets and JavaScript files. These resources can be added via **CDN (Content Delivery Network)** or local NPM packages. CDN is recommended for getting started quickly.

### CDN Reference Method (Recommended for Quick Start)

Add the following resources to the `<head>` section of your layout file `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Syncfusion EJ2 Fluent Theme Stylesheet -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/fluent.css" />
    
    <!-- Syncfusion EJ2 JavaScript Bundle -->
    <script src="https://cdn.syncfusion.com/ej2/26.1.35/dist/ej2.min.js"></script>
</head>
```

Replace `26.1.35` with the version number of Syncfusion you installed.

### Available Themes

Syncfusion offers multiple professional themes. Replace `fluent.css` with your preferred theme:

- `fluent.css` - Modern Fluent Design (recommended)
- `bootstrap.css` - Bootstrap-style theme
- `bootstrap4.css` - Bootstrap 4 theme
- `tailwind.css` - Tailwind CSS theme
- `material.css` - Material Design theme
- `material-dark.css` - Dark Material Design theme
- `fabric.css` - Microsoft Fabric theme

### Local NPM Package Method (Advanced)

For production applications, you may prefer to bundle Syncfusion JavaScript locally:

1. Install the Syncfusion EJ2 JavaScript package via npm:

```bash
npm install @syncfusion/ej2
```

2. Import in your application startup file
3. Bundle using your build tool (Webpack, Parcel, etc.)

### Verify Resources Are Loaded

Open your application in a browser and open **Developer Tools (F12)**:

1. Go to the **Network** tab
2. Refresh the page
3. Verify that the CSS file (`fluent.css`) loads successfully with HTTP 200 status
4. Verify that the JavaScript file (`ej2.min.js`) loads successfully

If resources fail to load, check:
- CDN URL in your HTML matches exactly
- No typos in version number
- Internet connection is stable
- Firewall isn't blocking CDN domains

## Register Script Manager

The Syncfusion Script Manager (`<ejs-scripts>`) must be registered at the end of the `<body>` section in your layout. This initializes Syncfusion components and manages their lifecycle.

### Adding Script Manager to _Layout.cshtml

Open `~/Pages/Shared/_Layout.cshtml` and add this before the closing `</body>` tag:

```html
<body>
    <!-- Your page content goes here -->
    
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Complete Layout Example with Script Manager

Here's a complete `_Layout.cshtml` file with proper resource registration:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sidebar Demo - @ViewData["Title"]</title>
    
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/fluent.css" />
    
    <!-- Bootstrap CSS for layout -->
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container-fluid">
                <a class="navbar-brand" asp-page="/Index">SidebarDemo</a>
            </div>
        </nav>
    </header>
    
    <main role="main" class="pb-3">
        @RenderBody()
    </main>
    
    <!-- Syncfusion JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/26.1.35/dist/ej2.min.js"></script>
    
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
    
    <!-- Bootstrap JS -->
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>
</body>
</html>
```

## Add Sidebar Component

Now that the project is configured, you can add the Sidebar component to any page. Here's how to add a basic sidebar to your Index.cshtml page.

### Basic Sidebar Structure

```cshtml
<ejs-sidebar id="default-sidebar">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Sidebar Content</h3>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;">
    <h1>Main Content</h1>
</div>
```

### Sidebar with Button Control

Add a button to toggle the sidebar open and closed:

```cshtml
<ejs-button id="toggleButton" content="Toggle Sidebar"></ejs-button>

<ejs-sidebar id="default-sidebar" type="Push" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Navigation Menu</h3>
            <ul style="list-style: none; padding: 0;">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;">
    <h1>Main Content Area</h1>
    <p>Your page content appears here.</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('default-sidebar').ej2_instances[0];
    var button = document.getElementById('toggleButton').ej2_instances[0];
    
    button.element.addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

## First Complete Example

Here's a complete Razor page example (Index.cshtml) with all setup and a fully functional sidebar:

### Index.cshtml

```cshtml
@page
@model IndexModel

@{
    ViewData["Title"] = "Sidebar Getting Started";
}

<style>
    .main-container {
        display: flex;
        height: calc(100vh - 60px);
    }
    
    .sidebar-content {
        padding: 20px;
        font-size: 14px;
    }
    
    .content-area {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }
    
    .toolbar {
        padding: 10px 20px;
        border-bottom: 1px solid #e0e0e0;
    }
    
    #default-sidebar {
        width: 300px;
    }
</style>

<div class="toolbar">
    <ejs-button id="toggleButton" class="e-info" content="☰ Menu" iconCss="e-icons e-menu"></ejs-button>
</div>

<ejs-sidebar id="default-sidebar" type="Push" isOpen="true">
    <e-content-template>
        <div class="sidebar-content">
            <h3>Navigation</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 10px 0;"><a href="/" style="text-decoration: none;">Home</a></li>
                <li style="padding: 10px 0;"><a href="/about" style="text-decoration: none;">About</a></li>
                <li style="padding: 10px 0;"><a href="/services" style="text-decoration: none;">Services</a></li>
                <li style="padding: 10px 0;"><a href="/portfolio" style="text-decoration: none;">Portfolio</a></li>
                <li style="padding: 10px 0;"><a href="/contact" style="text-decoration: none;">Contact</a></li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div class="content-area">
    <h1>Welcome to Sidebar Demo</h1>
    <p>The sidebar on the left demonstrates the Syncfusion ASP.NET Core Sidebar component in action.</p>
    
    <h2>What You Can Do:</h2>
    <ul>
        <li>Click the menu button to toggle the sidebar open and closed</li>
        <li>Navigate between different sections using sidebar links</li>
        <li>The sidebar automatically closes on mobile devices</li>
        <li>The sidebar animation provides smooth transitions</li>
    </ul>
    
    <h2>Next Steps:</h2>
    <p>Explore the other reference guides to learn about advanced features like docking, positioning, events, and more.</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('default-sidebar').ej2_instances[0];
    var toggleButton = document.getElementById('toggleButton').ej2_instances[0];
    
    // Toggle sidebar when button is clicked
    toggleButton.element.addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

### IndexModel.cs (C# Code-Behind)

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SidebarDemo.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
```

## Running the Application

Once your project is complete with all configurations in place, you can run and test the Sidebar component.

### Run from Visual Studio

1. Press **F5** or select **Debug** → **Start Debugging**
2. The application will build and open in your default browser
3. You should see your page with the Sidebar rendered

### Run from Command Line

Open Command Prompt in your project directory and run:

```bash
dotnet run
```

The application will start at `https://localhost:5001` or similar. Open this URL in your browser.

### Verify Sidebar Is Working

- Check that the sidebar renders on the left side of the page
- Click the toggle button - the sidebar should smoothly expand and collapse
- Navigate to different sections to verify links work
- Resize your browser window to test responsive behavior

## Troubleshooting Installation

### Issue: TagHelper Not Recognized

**Symptom:** Red squiggly lines under `<ejs-sidebar>` even after installation

**Solution:**
1. Ensure `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml`
2. Rebuild your project (Ctrl+Shift+B)
3. If still unrecognized, restart Visual Studio
4. Check that Syncfusion.EJ2.AspNet.Core package appears in packages.config

### Issue: Sidebar Not Appearing on Page

**Symptom:** Page loads but no sidebar is visible

**Solution:**
1. Verify CSS is loaded: Open Browser DevTools (F12) → Network tab → check that fluent.css loaded (HTTP 200)
2. Verify JavaScript is loaded: Check that ej2.min.js loaded (HTTP 200)
3. Verify Script Manager present: Check that `<ejs-scripts>` is in _Layout.cshtml
4. Check browser console for errors: Open DevTools → Console tab and look for red error messages
5. Ensure the Sidebar element has an ID: `<ejs-sidebar id="default-sidebar">`

### Issue: Sidebar Styled Incorrectly

**Symptom:** Sidebar appears but styling looks wrong (wrong colors, fonts, layout)

**Solution:**
1. Verify correct theme CSS is loaded: Check `<link>` tag points to correct theme file
2. Check for CSS conflicts: Other stylesheets might override Syncfusion styles
3. Try a different theme: Replace `fluent.css` with `bootstrap.css` or `material.css` to test
4. Clear browser cache: Press Ctrl+Shift+Delete and clear cached files, then refresh page

### Issue: Toggle Button Not Working

**Symptom:** Sidebar renders but toggle button clicks don't open/close it

**Solution:**
1. Verify JavaScript code in `<script>` block is present
2. Check that sidebar element ID matches in both HTML and JavaScript
3. Remove `isOpen="true"` if present - this forces sidebar open
4. Check browser console for JavaScript errors (DevTools → F12 → Console)
5. Restart browser completely - sometimes cached scripts interfere

### Issue: NuGet Package Installation Fails

**Symptom:** "Package not found" or "Install failed" error

**Solution:**
1. Ensure internet connection is stable
2. Check that Visual Studio has NuGet.org configured: Tools → Options → NuGet Package Manager → Package Sources
3. Clear NuGet cache: Delete `%appdata%\NuGet\cache` folder on Windows
4. Retry installation
5. If still fails, try package manager console: `Install-Package Syncfusion.EJ2.AspNet.Core`

---

**Congratulations!** You've successfully set up the Syncfusion ASP.NET Core Sidebar component. Continue to the next reference guide to learn about Sidebar types and positioning options.
