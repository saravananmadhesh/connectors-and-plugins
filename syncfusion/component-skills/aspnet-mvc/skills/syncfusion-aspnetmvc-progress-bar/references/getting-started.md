# Getting Started with Progress Bar

## Table of Contents
- [Installation and Package Setup](#installation-and-package-setup)
  - [Install via NuGet Package Manager](#install-via-nuget-package-manager)
- [Namespace Configuration](#namespace-configuration)
- [Script and CSS Resources](#script-and-css-resources)
  - [Available Themes](#available-themes)
- [Basic Linear Progress Bar](#basic-linear-progress-bar)
  - [Step 1: Create a Controller](#step-1-create-a-controller)
  - [Step 2: Create a View with Progress Bar](#step-2-create-a-view-with-progress-bar)
- [Setting Initial Progress Values](#setting-initial-progress-values)
- [Setting Value Range](#setting-value-range)
- [Progress Bar Types Overview](#progress-bar-types-overview)
  - [Linear Progress Bar](#linear-progress-bar)
  - [Circular Progress Bar](#circular-progress-bar)
  - [Semi-Circular Progress Bar](#semi-circular-progress-bar)
- [Render and Initialization](#render-and-initialization)
- [Minimal Working Example](#minimal-working-example)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
  - [Component Not Visible](#component-not-visible)
  - [Script Manager Error](#script-manager-error)
  - [CSS Not Applied](#css-not-applied)
  - [Value Not Updating](#value-not-updating)
- [Next Steps](#next-steps)

## Installation and Package Setup

The Syncfusion Progress Bar component is part of the Syncfusion Essential JS 2 library. To use the Progress Bar in your ASP.NET MVC application, you need to install the `Syncfusion.EJ2.MVC5` NuGet package.

### Install via NuGet Package Manager

Open the NuGet Package Manager in Visual Studio (Tools → NuGet Package Manager → Manage NuGet Packages for Solution) and search for `Syncfusion.EJ2.MVC5`. Install the latest version.

Alternatively, install via Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 23.2.36
```

The `Syncfusion.EJ2.MVC5` package includes dependencies:
- **Newtonsoft.Json**: For JSON serialization
- **Syncfusion.Licensing**: For license validation

> **Note**: Syncfusion packages are available on [nuget.org](https://www.nuget.org/packages?q=syncfusion.EJ2). The version number (23.2.36) should match your current Syncfusion release. Update this version as needed for your project.

## Namespace Configuration

Add the Syncfusion.EJ2 namespace reference to your `Web.config` file located in the `~/Views` folder.

```xml
<!-- ~/Views/Web.config -->
<configuration>
  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
    <pages
      pageBaseType="System.Web.Mvc.WebViewPage">
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Routing" />
        <add namespace="Syncfusion.EJ2" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

This namespace registration allows you to use the `Html.EJS()` helper methods in your Razor views without fully qualifying the namespace.

## Script and CSS Resources

Add the Syncfusion stylesheet and script references to your `~/Views/Shared/_Layout.cshtml` file inside the `<head>` section:

```html
<!-- ~/Views/Shared/_Layout.cshtml -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title</title>
    
    <!-- Syncfusion ASP.NET MVC Controls Styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/material.css" />
    
    <!-- Syncfusion ASP.NET MVC Controls Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/23.2.36/dist/ej2.min.js"></script>
</head>
<body>
    <div class="container body-content">
        @RenderBody()
    </div>
    
    <!-- Syncfusion ASP.NET MVC Script Manager -->
    @Html.EJS().ScriptManager()
</body>
</html>
```

### Available Themes

Syncfusion provides multiple themes. Replace `material.css` with your preferred theme:
- `material.css` - Material Design theme (default)
- `bootstrap5.css` - Bootstrap 5 theme
- `fluent.css` - Fluent Design theme
- `highcontrast.css` - High contrast theme for accessibility
- `tailwind.css` - Tailwind CSS theme

> **Important**: The script manager (`@Html.EJS().ScriptManager()`) MUST be registered at the end of the `<body>` section for all Syncfusion components to function correctly.

## Basic Linear Progress Bar

Once you have installed the package and configured the namespace, you can create a basic progress bar control.

### Step 1: Create a Controller

```csharp
// HomeController.cs
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
}
```

### Step 2: Create a View with Progress Bar

```html
<!-- ~/Views/Home/Index.cshtml -->
@{
    ViewBag.Title = "Progress Bar Example";
}

<h2>Basic Linear Progress Bar</h2>

@(Html.EJS().ProgressBar("linearProgressBar")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("30")
    .Render()
)
```

This code creates a linear progress bar with 50% progress. The `Render()` method generates the HTML and registers the control on the page.

## Setting Initial Progress Values

You can set the initial progress value when creating the Progress Bar using the `Value` property:

```csharp
@(Html.EJS().ProgressBar("progressBar")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(75)  // Sets initial progress to 75%
    .Height("30")
    .Render()
)
```

The `Value` property accepts a double between 0 and 100, where:
- `0` = No progress (0%)
- `50` = Half progress (50%)
- `100` = Complete progress (100%)

## Setting Value Range

By default, the Progress Bar uses a range of 0-100. You can customize the minimum and maximum values:

```csharp
@(Html.EJS().ProgressBar("progressBar")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Minimum(0)      // Sets minimum value
    .Maximum(200)    // Sets maximum value (not 100)
    .Value(100)      // 50% progress (100 out of 200)
    .Height("30")
    .Render()
)
```

This is useful when your progress values are not 0-100 range. For example, if you're tracking bytes downloaded from a 200MB file, you can set Maximum to 200000000 and Value to the actual bytes downloaded.

## Progress Bar Types Overview

The Progress Bar component supports three visual types:

### Linear Progress Bar
```csharp
@(Html.EJS().ProgressBar("linear")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Render()
)
```
The linear progress bar is the default and most common type. It displays progress as a horizontal bar.

### Circular Progress Bar
```csharp
@(Html.EJS().ProgressBar("circular")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .Height("250")
    .Width("250")
    .Render()
)
```
The circular progress bar displays progress as a circle, useful for dashboards or status indicators.

### Semi-Circular Progress Bar
```csharp
@(Html.EJS().ProgressBar("semicircular")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .StartAngle(270)
    .EndAngle(90)
    .Value(60)
    .Height("250")
    .Width("250")
    .Render()
)
```
The semi-circular progress bar displays progress as a half-circle, useful for speedometer-like visualizations.

> **Note**: For circular and semi-circular types, set both `Height` and `Width` properties. These should be equal for proper circular rendering.

## Render and Initialization

The Progress Bar is initialized when:
1. The `.Render()` method is called in the view
2. The Script Manager registers all components
3. The CSS and JavaScript files are loaded

After rendering, the Progress Bar is ready to use. You can access it via JavaScript using its ID:

```javascript
// Access the Progress Bar instance
var progressBarInstance = document.getElementById('linearProgressBar').ej2_instances[0];

// Update the value programmatically
progressBarInstance.value = 85;
```

## Minimal Working Example

Here's a complete minimal example of a Progress Bar application:

**Controller** - `HomeController.cs`:
```csharp
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
}
```

**View** - `~/Views/Home/Index.cshtml`:
```html
@{
    ViewBag.Title = "Progress Bar Getting Started";
}

<div class="content">
    <h1>File Download Progress</h1>
    <p>Current Progress: 60%</p>
    
    @(Html.EJS().ProgressBar("downloadProgress")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
        .Value(60)
        .Height("30")
        .Render()
    )
</div>

<style>
    .content {
        margin: 20px;
    }
</style>
```

**Layout** - `~/Views/Shared/_Layout.cshtml`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>@ViewBag.Title</title>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/material.css" />
    <script src="https://cdn.syncfusion.com/ej2/23.2.36/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    @Html.EJS().ScriptManager()
</body>
</html>
```

Run the application (Ctrl+F5) and the Progress Bar will render showing 60% progress.

## Troubleshooting Common Issues

### Component Not Visible

**Issue**: Progress Bar doesn't appear on the page.

**Solutions**:
- Verify NuGet package is installed: Check `packages.config` for `Syncfusion.EJ2.MVC5`
- Verify namespace in `Web.config` includes `Syncfusion.EJ2`
- Check browser console (F12) for JavaScript errors
- Ensure script manager is registered at end of body
- Verify CSS and JS files are loading (check Network tab in DevTools)

### Script Manager Error

**Issue**: Message says "Script Manager not found".

**Solution**: Add `@Html.EJS().ScriptManager()` at the end of your `_Layout.cshtml` body tag. This must be present on every page using Syncfusion components.

### CSS Not Applied

**Issue**: Progress Bar renders but looks unstyled.

**Solution**:
- Verify CSS link is correct and the version matches your JavaScript version
- Clear browser cache (Ctrl+F5)
- Ensure CSS is loaded before JavaScript
- Check DevTools Network tab to confirm CSS file loads (200 status)

### Value Not Updating

**Issue**: Set Value property but it doesn't show the correct percentage.

**Solution**:
- Ensure Value is a number between 0 and 100 (or your custom range)
- Check if you're setting Value on the wrong property
- Verify the Minimum and Maximum properties if using custom range
- Ensure Value is within Minimum to Maximum range

## Next Steps

Now that you have a basic Progress Bar working, explore:
- **Types and Modes**: Learn about circular, semi-circular, and different progress states
- **Customization**: Customize colors, thickness, and appearance
- **Animations**: Add smooth animation effects to progress updates
- **Events**: Handle ValueChanged and ProgressCompleted events
- **Tooltips**: Display additional information on hover
