# Getting Started with Syncfusion Progress Bar

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installing the NuGet Package](#installing-the-nuget-package)
  - [Using NuGet Package Manager Console](#using-nuget-package-manager-console)
  - [Using NuGet Package Manager UI](#using-nuget-package-manager-ui)
  - [Package Dependencies](#package-dependencies)
- [Configuring the Project](#configuring-the-project)
- [Adding Tag Helper Reference](#adding-tag-helper-reference)
  - [In _ViewImports.cshtml](#in-_viewimportscshtml)
  - [File Location](#file-location)
- [Adding Stylesheets and Scripts](#adding-stylesheets-and-scripts)
  - [Using CDN (Recommended for Getting Started)](#using-cdn-recommended-for-getting-started)
  - [Using NPM Package for Production](#using-npm-package-for-production)
  - [Theme Selection](#theme-selection)
- [Registering Script Manager](#registering-script-manager)
- [Creating Your First Progress Bar](#creating-your-first-progress-bar)
  - [Minimal Complete Example](#minimal-complete-example)
- [Running Your Application](#running-your-application)
  - [Press Ctrl+F5 (Windows) or Cmd+F5 (macOS)](#press-ctrlf5-windows-or-cmdf5-macos)
  - [Expected Output](#expected-output)
  - [Troubleshooting Initial Render](#troubleshooting-initial-render)
- [Common Setup Scenarios](#common-setup-scenarios)
  - [Scenario 1: Existing ASP.NET Core Project](#scenario-1-existing-aspnet-core-project)
  - [Scenario 2: New Syncfusion Project](#scenario-2-new-syncfusion-project)
  - [Scenario 3: Adding to Specific Page Only](#scenario-3-adding-to-specific-page-only)
- [Best Practices for Getting Started](#best-practices-for-getting-started)

## Prerequisites

To get started with the Syncfusion Progress Bar component, ensure you have:
- .NET Core 3.1 or later installed
- Visual Studio or Visual Studio Code
- Basic understanding of ASP.NET Core and Razor Pages
- System requirements for ASP.NET Core controls met

You can create a new ASP.NET Core project using:
- Microsoft's official templates
- Syncfusion Visual Studio extension for Syncfusion project templates

## Installing the NuGet Package

The Syncfusion Progress Bar component is available through NuGet. Install it using the NuGet Package Manager:

### Using NuGet Package Manager Console

Open the Package Manager Console (Tools → NuGet Package Manager → Package Manager Console) and run:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

Replace `{{ site.releaseversion }}` with the latest Syncfusion version number.

### Using NuGet Package Manager UI

1. Open NuGet Package Manager (Tools → NuGet Package Manager → Manage NuGet Packages for Solution)
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Select the latest version and click Install

### Package Dependencies

The Syncfusion.EJ2.AspNet.Core package includes dependencies on:
- **Newtonsoft.Json** - For JSON serialization
- **Syncfusion.Licensing** - For license key validation

These are automatically installed with the package.

## Configuring the Project

No additional configuration is required beyond installing the NuGet package. The Progress Bar component works with standard ASP.NET Core project structure.

## Adding Tag Helper Reference

The Syncfusion Progress Bar uses tag helpers for a clean, markup-based syntax. Add the tag helper reference to your project:

### In _ViewImports.cshtml

Add this line at the top of the `_ViewImports.cshtml` file in your `~/Pages/` directory:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This makes all Syncfusion tag helpers available throughout your application. The syntax is:
- `@addTagHelper` directive
- `*` wildcard (loads all tag helpers from the assembly)
- `Syncfusion.EJ2` assembly name

### File Location

Typically located at: `~/Pages/_ViewImports.cshtml`

If this file doesn't exist, create it with the tag helper reference as the content.

## Adding Stylesheets and Scripts

Syncfusion controls require CSS styles and JavaScript files. Add them to your layout file using CDN or local references.

### Using CDN (Recommended for Getting Started)

Open `~/Pages/Shared/_Layout.cshtml` and add in the `<head>` section:

```html
<head>
    <!-- Existing tags -->
    
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
</head>
```

Add in the `<body>` section, near the closing tag:

```html
<body>
    <!-- Your page content -->
    
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</body>
```

Replace `{{ site.ej2version }}` with the appropriate EJ2 version number.

### Using NPM Package (For Production)

Alternatively, install via NPM and reference locally:

```bash
npm install @syncfusion/ej2
```

Then reference in your layout:

```html
<link rel="stylesheet" href="~/lib/ej2/material.css" />
<script src="~/lib/ej2/ej2.min.js"></script>
```

### Theme Selection

Syncfusion provides several themes: `fluent`, `material`, `bootstrap`, `fabric`, `high-contrast`, etc. Choose based on your design requirements.

## Registering Script Manager

Register the Syncfusion script manager at the end of the `<body>` section in `~/Pages/Shared/_Layout.cshtml`:

```html
<body>
    <!-- Your page content -->
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` tag helper initializes the Syncfusion JavaScript library and ensures all controls render properly.

## Creating Your First Progress Bar

Now create a basic Progress Bar on your Razor page. Add this to `~/Pages/Index.cshtml`:

```cshtml
<ejs-progressbar id="linearProgress" 
                  type="Linear" 
                  value="50" 
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

This creates:
- **ID**: `linearProgress` - Unique identifier for programmatic access
- **Type**: `Linear` - Horizontal progress bar (default)
- **Value**: `50` - Shows 50% completion
- **Minimum**: `0` - Starting point of progress range
- **Maximum**: `100` - End point of progress range (default)

### Minimal Complete Example

Here's a complete minimal example in your Razor page:

```cshtml
@page
@model IndexModel

<!DOCTYPE html>
<html>
<head>
    <title>Progress Bar Example</title>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent.css" />
</head>
<body>
    <h1>Progress Bar Demo</h1>
    
    <h2>Basic Linear Progress Bar</h2>
    <ejs-progressbar id="basicProgress" 
                      type="Linear" 
                      value="75" 
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>

    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
    <ejs-scripts></ejs-scripts>
</body>
</html>
```

## Running Your Application

### Press Ctrl+F5 (Windows) or Cmd+F5 (macOS)

This launches your application in the browser without debugging. You should see the Progress Bar control rendering with the specified value.

### Expected Output

- A horizontal progress bar 75% filled
- Default theme styling (fluent in CDN example)
- Responsive to window resizing
- Accessible with keyboard navigation

### Troubleshooting Initial Render

If the Progress Bar doesn't appear:

1. **Check the browser console** (F12) for JavaScript errors
2. **Verify CDN links** are accessible (check network tab)
3. **Confirm tag helper** is registered in `_ViewImports.cshtml`
4. **Check script manager** is placed before closing `</body>` tag
5. **Clear browser cache** (Ctrl+Shift+Delete)
6. **Verify NuGet package** is installed (check packages.config or .csproj)

## Common Setup Scenarios

### Scenario 1: Existing ASP.NET Core Project

If adding to an existing project:
1. Install NuGet package
2. Update `_ViewImports.cshtml` with tag helper
3. Update `_Layout.cshtml` with CSS/JS links and script manager
4. Add progress bar to a Razor page

### Scenario 2: New Syncfusion Project

Using Syncfusion's project templates:
1. Select "Syncfusion ASP.NET Core Application" in Visual Studio
2. Follow wizard to configure
3. Package and setup are automated
4. Ready to add controls immediately

### Scenario 3: Adding to Specific Page Only

If you only want Progress Bar on one page:
1. Still add tag helper to `_ViewImports.cshtml`
2. Add CSS/JS to that specific page (not recommended)
3. Ensure script manager is on that page
4. Add progress bar tag helper

## Best Practices for Getting Started

- **Use CDN for development** - No build setup needed
- **Use NPM for production** - Better control over versions
- **Keep style and script references together** - CSS in `<head>`, JS before `</body>`
- **Always include script manager** - Required for initialization
- **Test in multiple browsers** - Ensure compatibility
- **Verify console for errors** - Use browser DevTools

Now you're ready to use the Progress Bar component! Refer to other reference files for advanced features and customization options.
