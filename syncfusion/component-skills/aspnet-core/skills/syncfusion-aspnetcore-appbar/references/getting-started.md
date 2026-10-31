# Getting Started with Syncfusion AppBar

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Creating an ASP.NET Core Project](#creating-an-aspnet-core-project)
- [Installing the NuGet Package](#installing-the-nuget-package)
- [Registering the Tag Helper](#registering-the-tag-helper)
- [Adding Stylesheets and Scripts](#adding-stylesheets-and-scripts)
- [Registering the Script Manager](#registering-the-script-manager)
- [Creating Your First AppBar](#creating-your-first-appbar)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Overview

This guide walks you through setting up the Syncfusion AppBar component in an ASP.NET Core application. The AppBar component displays information and actions related to the current application screen, serving as a consistent header for navigation and application branding.

By following this guide, you will:
1. Create an ASP.NET Core web application
2. Install the required Syncfusion NuGet package
3. Configure Tag Helper and resource references
4. Implement a basic AppBar component
5. Verify the component renders correctly

## Prerequisites

Before proceeding, verify your system meets these requirements:

**System Requirements:**
- **.NET Version**: ASP.NET Core 3.1 or later (recommend 5.0+)
- **Visual Studio**: Visual Studio 2019 Update 3 or later (any edition)
- **Package Manager**: NuGet Package Manager or dotnet CLI
- **Browser**: Modern browser with ES5+ support
- **Memory**: Minimum 4 GB RAM for development environment

**Verify Your Environment:**
Open PowerShell or command prompt and run:
```bash
dotnet --version
```
This should display your installed .NET version. Ensure it's 3.1 or higher.

## Creating an ASP.NET Core Project

You can create a project using either the Microsoft Templates or the Syncfusion Visual Studio Extension.

### Option 1: Microsoft Templates (Manual Setup)

1. **Open Visual Studio** and select "Create a new project"
2. **Search for** "ASP.NET Core Web App (Razor Pages)"
3. **Click Next** and configure:
   - **Project Name**: `MyAppBarApp` (or your preferred name)
   - **Location**: Choose a convenient directory
   - **Framework**: Select ASP.NET Core 5.0 or later
4. **Click Create** to generate the project

### Option 2: Syncfusion Visual Studio Extension

The Syncfusion Extension automates project setup with all dependencies pre-configured:

1. **In Visual Studio**, navigate to **Tools** → **Extensions and Updates**
2. **Search for** "Syncfusion Extensions"
3. **Install** the extension and restart Visual Studio
4. **Create Project**: File → New → Create Syncfusion ASP.NET Core Project
5. **Configure** the dialog with:
   - **Project Name**: `MyAppBarApp`
   - **ASP.NET Core Version**: 5.0 or later
   - **Select Components**: Check "AppBar"
6. **Create** - the project is generated with all necessary packages and configurations

**Advantage**: Automatically includes Syncfusion resources and configuration, reducing manual setup steps.

## Installing the NuGet Package

### Using Package Manager GUI

1. **In Visual Studio**, select **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**
2. **Go to the Browse tab** and search for `Syncfusion.EJ2.AspNet.Core`
3. **Click the package** in the results
4. **Select the project** from the right panel (your web application)
5. **Click Install** and accept the license
6. **Wait** for the installation to complete

### Using Package Manager Console

1. **Open Package Manager Console**: **Tools** → **NuGet Package Manager** → **Package Manager Console**
2. **Run the command**:
```bash
Install-Package Syncfusion.EJ2.AspNet.Core
```
3. **Wait** for the package to download and install

### Using .NET CLI

Open terminal/PowerShell in your project directory and run:
```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

**Note**: The Syncfusion.EJ2.AspNet.Core package depends on:
- `Newtonsoft.Json` - For JSON serialization
- `Syncfusion.Licensing` - For license key validation

These dependencies are automatically installed.

## Registering the Tag Helper

Tag Helpers enable Syncfusion components to be used with intuitive HTML-like syntax. Register the Tag Helper in your `_ViewImports.cshtml` file.

**File Path**: `~/Pages/_ViewImports.cshtml` (or `~/Views/_ViewImports.cshtml` for MVC)

**Add this line at the top** (after any existing `@addTagHelper` statements):

```csharp
@addTagHelper *, Syncfusion.EJ2
```

**Complete Example**:
```csharp
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
@namespace MyAppBarApp.Pages
@using MyAppBarApp
```

**What This Does**: Enables the `ejs-appbar`, `ejs-button`, `ejs-menu`, and other Syncfusion Tag Helpers globally in all Razor pages and views.

## Adding Stylesheets and Scripts

Syncfusion components require CSS for styling and JavaScript for functionality. Add these references to your `_Layout.cshtml` file.

**File Path**: `~/Pages/Shared/_Layout.cshtml` (Razor Pages) or `~/Views/Shared/_Layout.cshtml` (MVC)

### Adding Stylesheets

Add this line in the `<head>` section:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.34/fluent.css" />
    ...
</head>
```

**Available Themes**: You can use different themes by changing the CSS file name:
- `fluent.css` - Modern Fluent theme
- `bootstrap5.css` - Bootstrap 5 theme
- `material.css` - Material Design theme
- `tailwind.css` - Tailwind CSS theme
- `bootstrap.css` - Bootstrap 4 theme
- `high-contrast.css` - High contrast accessible theme

### Adding Scripts

Add this line in the `<body>` section, **before the closing `</body>` tag**:

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/20.4.34/dist/ej2.min.js"></script>
</body>
```

**Complete Example** (`_Layout.cshtml`):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AppBar Application</title>
    <!-- Bootstrap CSS (optional) -->
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <!-- Syncfusion Styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.34/fluent.css" />
    <link rel="stylesheet" href="~/css/site.css" />
</head>
<body>
    <!-- Navigation and other content here -->
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/20.4.34/dist/ej2.min.js"></script>
    <!-- Application Scripts -->
    <script src="~/js/site.js"></script>
</body>
</html>
```

## Registering the Script Manager

The Syncfusion Script Manager initializes all Syncfusion components on the page and manages their lifecycle.

### Adding the Script Manager

Add the `<ejs-scripts>` tag at the **end of the `<body>`** in `_Layout.cshtml`, **after all other scripts**:

```html
<body>
    <!-- Your page content -->
    
    <!-- All external scripts -->
    <script src="https://cdn.syncfusion.com/ej2/20.4.34/dist/ej2.min.js"></script>
    
    <!-- Syncfusion Script Manager (MUST be last) -->
    <ejs-scripts></ejs-scripts>
</body>
```

**Important**: The Script Manager must be the **last script element** on the page to ensure all Syncfusion components are properly initialized.

### Alternative: Per-Page Script Manager

For specific pages, add the Script Manager at the end of that page:

```html
<!-- ~/Pages/AppBar.cshtml -->
@page

<div class="container">
    <!-- Your AppBar and content -->
</div>

<ejs-scripts></ejs-scripts>
```

## Creating Your First AppBar

Now that setup is complete, create a basic AppBar component. Add the following code to your page (e.g., `~/Pages/Index.cshtml` or a dedicated AppBar page).

### Basic AppBar Example

```html
<div class="col-lg-12 control-section default-appbar-section">
    <ejs-appbar id="defaultAppBar" colorMode="Primary">
        <e-content-template>
            <!-- Left: Menu Button -->
            <ejs-button aria-label="menu" id="defaultButtonMenu" cssClass="e-inherit" iconCss="e-icons e-menu"></ejs-button>
            
            <!-- Center: Title -->
            <span class="regular" style="margin:0 5px">EJ2 AppBar</span>
            
            <!-- Right: Actions (pushed by spacer) -->
            <div class="e-appbar-spacer"></div>
            <ejs-button id="defaultButtonLogin" cssClass="e-inherit" content="FREE TRIAL"></ejs-button>
        </e-content-template>
    </ejs-appbar>
</div>

<!-- Add required styles -->
<style>
    .default-appbar-section {
        margin-bottom: 20px;
    }
    
    .e-appbar {
        background-color: #f0f0f0;
    }
</style>
```

### Breaking Down the Code

**Component Tag**: `<ejs-appbar>` declares the AppBar component
- `id="defaultAppBar"` - Unique identifier for the component
- `colorMode="Primary"` - Uses the primary color theme

**Content Template**: `<e-content-template>` contains all AppBar content
- Buttons, text, icons, and spacers go inside this template

**Spacer Element**: `<div class="e-appbar-spacer"></div>`
- Creates flexible spacing to push content to the right
- Equivalent to `flex: 1` in CSS

**Buttons**: `<ejs-button>` with `cssClass="e-inherit"`
- `e-inherit` CSS class makes buttons inherit AppBar colors
- Without this class, buttons would display with default colors

## Running the Application

### Using Visual Studio

1. **Set as Startup Project**: Right-click your project and select "Set as Startup Project"
2. **Start Debugging**: Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (without debugging) or <kbd>F5</kbd> (with debugging)
3. **View in Browser**: Your default browser opens and displays the application
4. **Verify AppBar**: Look for the AppBar component with Primary color theme at the top

### Using .NET CLI

Open terminal in your project directory:

```bash
dotnet run
```

Then open your browser to `https://localhost:5001` (or the port shown in console output).

## Troubleshooting

### AppBar Not Displaying or Unstyled

**Problem**: Component appears but lacks styling or looks broken.

**Solutions**:
1. **Verify CSS Reference**: Check that the stylesheet link is in `<head>` before `</head>`
   ```html
   <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.34/fluent.css" />
   ```

2. **Check Script Order**: Ensure Syncfusion JavaScript is loaded before the Script Manager
   ```html
   <script src="https://cdn.syncfusion.com/ej2/20.4.34/dist/ej2.min.js"></script>
   <ejs-scripts></ejs-scripts>
   ```

3. **Verify Tag Helper**: Confirm `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml`

4. **Clear Browser Cache**: Hard refresh browser (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Delete</kbd>)

### "ejs-appbar is not a recognized tag name"

**Problem**: Build error or IntelliSense doesn't recognize the tag.

**Solutions**:
1. **Add Tag Helper Registration**: Ensure `_ViewImports.cshtml` has `@addTagHelper *, Syncfusion.EJ2`
2. **Rebuild Project**: Clean and rebuild the solution (Build → Clean Solution, then Build → Rebuild Solution)
3. **Restart Visual Studio**: Sometimes cached IntelliSense needs refresh

### Package Not Found or Installation Fails

**Problem**: NuGet package installation fails with "not found" error.

**Solutions**:
1. **Check Internet Connection**: Ensure NuGet.org is accessible
2. **Update NuGet Sources**: In Visual Studio, go to Tools → NuGet Package Manager → Package Manager Settings → Package Sources, verify nuget.org is listed
3. **Clear NuGet Cache**: Delete `%AppData%\NuGet\Cache` folder and retry
4. **Use CLI Instead**: Try `dotnet add package Syncfusion.EJ2.AspNet.Core`

### Buttons Don't Inherit AppBar Colors

**Problem**: Nested buttons appear with default colors, not AppBar colors.

**Solution**: Add `cssClass="e-inherit"` to buttons inside AppBar:
```html
<ejs-button cssClass="e-inherit" content="Button"></ejs-button>
```

### Script Manager Placement Errors

**Problem**: Components not initializing or JavaScript errors in console.

**Solution**: Move `<ejs-scripts></ejs-scripts>` to the end of `<body>`:
```html
<body>
    <!-- Content here -->
    <ejs-scripts></ejs-scripts>  <!-- Must be last -->
</body>
```

---

**Next Steps:**
- Learn about positioning options: [Positioning Guide](positioning.md)
- Explore sizing modes: [Sizing Modes Guide](sizing-modes.md)
- Customize colors: [Color Modes Guide](color-modes.md)
- Design complex layouts: [Design Patterns Guide](design-layouts.md)
