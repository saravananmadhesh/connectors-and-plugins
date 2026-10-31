# Getting Started with ASP.NET Core Toolbar

## Table of Contents
- [Prerequisites](#prerequisites)
- [Create ASP.NET Core Web Application](#create-aspnet-core-web-application)
- [Install Syncfusion NuGet Package](#install-syncfusion-nuget-package)
- [Register TagHelper](#register-taghelper)
- [Add Stylesheet and Script Resources](#add-stylesheet-and-script-resources)
- [Register Script Manager](#register-script-manager)
- [Add Toolbar Control](#add-toolbar-control)
- [Render Items with Content Template](#render-items-with-content-template)
- [Complete Working Example](#complete-working-example)

## Prerequisites

Before implementing the Syncfusion Toolbar control, ensure you have the following system requirements:

- **Operating System**: Windows 7 or later, macOS, or Linux
- **.NET Framework**: .NET Core 3.1 or later (ASP.NET Core 3.1+)
- **Visual Studio**: Visual Studio 2019 or later with ASP.NET and web development workload
- **NuGet Package Manager**: Latest version available in Visual Studio

For comprehensive system requirements, refer to the [official Syncfusion system requirements documentation](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements).

## Create ASP.NET Core Web Application

You can create a new ASP.NET Core application using either Microsoft templates or Syncfusion extensions:

### Using Microsoft Templates

Follow the official Microsoft documentation to create a Razor Pages web application:
1. Open Visual Studio
2. Select **File > New > Project**
3. Choose **ASP.NET Core Web App (Model-View-Controller)** or **ASP.NET Core Web App (Razor Pages)**
4. Configure the project name, location, and framework version
5. Click **Create**

### Using Syncfusion Extension

Syncfusion provides Visual Studio extensions to scaffold projects with pre-configured Syncfusion components:

1. Install the **Syncfusion ASP.NET Core Extension** from Visual Studio Marketplace
2. Use the extension template to create a new ASP.NET Core project
3. The extension automatically configures namespaces and dependencies

For detailed setup instructions, refer to the [Syncfusion ASP.NET Core Extension documentation](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project).

## Install Syncfusion NuGet Package

The Syncfusion ASP.NET Core controls package contains all Syncfusion components, including the Toolbar. Install it via NuGet Package Manager:

### Method 1: Using NuGet Package Manager UI

1. In Visual Studio, go to **Tools > NuGet Package Manager > Manage NuGet Packages for Solution**
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Select the latest stable version
4. Click **Install**
5. Accept the license agreement if prompted

### Method 2: Using Package Manager Console

Execute the following command in Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

### Package Dependencies

The Syncfusion.EJ2.AspNet.Core NuGet package has the following dependencies:

- **Newtonsoft.Json**: For JSON serialization and deserialization
- **Syncfusion.Licensing**: For validating Syncfusion license keys

These dependencies are automatically installed with the main package. If you encounter any issues, manually install them via NuGet.

**Note**: The Syncfusion EJ2 packages are available on [NuGet.org](https://www.nuget.org/packages?q=syncfusion.EJ2). For more information about different available packages, refer to the [NuGet packages documentation](https://ej2.syncfusion.com/aspnetcore/documentation/nuget-packages).

## Register TagHelper

The Syncfusion ASP.NET Core controls use TagHelper syntax for declarative markup. Register the TagHelper namespace in your `_ViewImports.cshtml` file:

**File**: `~/Pages/_ViewImports.cshtml` (for Razor Pages) or `~/Views/_ViewImports.cshtml` (for MVC)

```html
@addTagHelper *, Syncfusion.EJ2
```

This directive tells the Razor view engine to recognize all `ejs-*` custom tags as Syncfusion components. After this registration, you can use `<ejs-toolbar>`, `<e-toolbar-item>`, and other Syncfusion TagHelpers throughout your views.

**Important**: Place this directive at the top of the file, before any other view imports or code. It must be present in every layout or view that uses Syncfusion components, or alternatively, add it to a global `_ViewImports.cshtml` at the root of the `Pages` or `Views` folder to apply it application-wide.

## Add Stylesheet and Script Resources

The Syncfusion components require CSS styles and JavaScript framework files. Add these resources to your layout page:

**File**: `~/Pages/Shared/_Layout.cshtml` (Razor Pages) or `~/Views/Shared/_Layout.cshtml` (MVC)

### In the `<head>` Section

Add the Syncfusion theme CSS and core JavaScript libraries:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

### Available Themes

Syncfusion provides multiple themes that you can choose from:

- **fluent.css** - Modern Fluent Design theme
- **bootstrap5.css** - Bootstrap 5 theme
- **bootstrap4.css** - Bootstrap 4 theme
- **tailwind.css** - Tailwind CSS theme
- **material.css** - Material Design theme
- **highcontrast.css** - High contrast accessibility theme

Select the theme that best matches your application's design language.

### Alternative: NPM Packages

If you prefer managing dependencies via npm, install the Syncfusion packages:

```bash
npm install @syncfusion/ej2 @syncfusion/ej2-navigations
```

Then reference the CSS and scripts in your layout accordingly.

### Custom Resource Generator (CRG)

For production applications, use the [Syncfusion Custom Resource Generator (CRG)](https://ej2.syncfusion.com/aspnetcore/documentation/common/custom-resource-generator) to generate optimized CSS and JavaScript bundles containing only the components you use. This reduces file size and improves application performance.

For detailed information about adding script references and available themes, refer to the [Adding Script References documentation](https://ej2.syncfusion.com/aspnetcore/documentation/common/adding-script-references).

## Register Script Manager

Register the Syncfusion script manager at the end of the `<body>` section to initialize Syncfusion components:

**File**: `~/Pages/Shared/_Layout.cshtml` or `~/Views/Shared/_Layout.cshtml`

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` TagHelper initializes all Syncfusion controls on the page and provides runtime support for interoperability and event handling. This must be placed after all component markup but before the closing `</body>` tag.

## Add Toolbar Control

Now add the Syncfusion Toolbar control to your page. Create a new view or edit an existing one:

**File**: `~/Pages/Index.cshtml` (Razor Pages) or `~/Views/Home/Index.cshtml` (MVC)

```html
<ejs-toolbar id="defaultToolbar" width="600px">
    <e-toolbar-items>
        <e-toolbar-item text="Cut" prefixIcon="e-cut-icon tb-icons" tooltipText="Cut"></e-toolbar-item>
        <e-toolbar-item text="Copy" prefixIcon="e-copy-icon tb-icons" tooltipText="Copy"></e-toolbar-item>
        <e-toolbar-item text="Paste" prefixIcon="e-paste-icon tb-icons" tooltipText="Paste"></e-toolbar-item>
        <e-toolbar-item type="Separator"></e-toolbar-item>
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon tb-icons" tooltipText="Bold"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon tb-icons" tooltipText="Underline"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon tb-icons" tooltipText="Italic"></e-toolbar-item>
        <e-toolbar-item text="Color Picker" prefixIcon="e-color-icon tb-icons" tooltipText="Color-Picker"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### Add CSS for Icons

Define CSS styles for the toolbar icons. Add this to your stylesheet or within a `<style>` tag in your page:

```css
<style>
    .tb-icons {
        margin-right: 8px;
    }
    
    .e-cut-icon::before {
        content: "\e700";
    }
    
    .e-copy-icon::before {
        content: "\e701";
    }
    
    .e-paste-icon::before {
        content: "\e702";
    }
    
    .e-bold-icon::before {
        content: "\e703";
    }
    
    .e-underline-icon::before {
        content: "\e704";
    }
    
    .e-italic-icon::before {
        content: "\e705";
    }
    
    .e-color-icon::before {
        content: "\e706";
    }
</style>
```

Run the application by pressing **Ctrl+F5** (Windows) or **⌘+F5** (macOS). Your browser should display the Toolbar control with the specified items and styling.

## Render Items with Content Template

The Toolbar supports binding HTML components within items using the content template property. This allows you to embed various Syncfusion controls within toolbar items:

**File**: `~/Pages/Index.cshtml`

```html
@{
    ViewData["Title"] = "Toolbar with Content Template";
}

<ejs-toolbar id="contentToolbar">
    <e-toolbar-items>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon"></e-toolbar-item>
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Button Component -->
        <e-toolbar-item type="Input" template="#printBtn"></e-toolbar-item>
        
        <!-- MaskedTextBox Component -->
        <e-toolbar-item type="Input" template="#phoneInput"></e-toolbar-item>
        
        <!-- RadioButton Component -->
        <e-toolbar-item type="Input" template="#optionRadio"></e-toolbar-item>
        
        <!-- DropDownList Component -->
        <e-toolbar-item type="Input" align="Right" template="#filterDropdown"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<!-- Template Definitions -->
<div id="printBtn">
    <ejs-button id="printBtn">Print</ejs-button>
</div>

<div id="phoneInput">
    <ejs-maskedtextbox id="phoneNumber" mask="(999) 999-9999" 
                       placeholder="Enter phone"></ejs-maskedtextbox>
</div>

<div id="optionRadio">
    <ejs-radiobutton id="radio1" label="Option 1" name="default" 
                    value="option1"></ejs-radiobutton>
</div>

<div id="filterDropdown">
    <ejs-dropdownlist id="filterDropdown" dataSource="@ViewBag.FilterOptions" 
                     fields="@(new { text = "text", value = "value" })" 
                     width="150px"></ejs-dropdownlist>
</div>
```

**Code-Behind** (`~/Pages/Index.cshtml.cs` or `~/Controllers/HomeController.cs`):

```csharp
public class IndexModel : PageModel
{
    public void OnGet()
    {
        ViewBag.FilterOptions = new List<dynamic>()
        {
            new { text = "All Items", value = "all" },
            new { text = "Active Only", value = "active" },
            new { text = "Inactive Only", value = "inactive" }
        };
    }
}
```

This example demonstrates:
- Button component embedded in toolbar item
- MaskedTextBox for formatted input
- RadioButton for selection
- DropDownList for filtering options aligned to the right
- Automatic toolbar item rendering with proper alignment and responsiveness

## Complete Working Example

Here's a complete working example combining all setup steps:

**File**: `~/Pages/Shared/_Layout.cshtml`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Toolbar Demo</title>
    
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.0/fluent.css" />
    
    <!-- Custom styles -->
    <style>
        body { font-family: Segoe UI, sans-serif; margin: 20px; }
        .demo-section { margin-top: 30px; }
    </style>
</head>
<body>
    @RenderBody()
    
    <!-- Syncfusion scripts -->
    <script src="https://cdn.syncfusion.com/ej2/20.4.0/dist/ej2.min.js"></script>
    
    <!-- Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
</html>
```

**File**: `~/Pages/_ViewImports.cshtml`

```html
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

**File**: `~/Pages/Index.cshtml`

```html
@page
@{
    ViewData["Title"] = "Toolbar Getting Started";
}

<div class="demo-section">
    <h1>Toolbar Control - Getting Started</h1>
    
    <ejs-toolbar id="gettingStartedToolbar" width="100%">
        <e-toolbar-items>
            <e-toolbar-item text="New" prefixIcon="e-icons e-new" tooltipText="New"></e-toolbar-item>
            <e-toolbar-item text="Open" prefixIcon="e-icons e-open" tooltipText="Open"></e-toolbar-item>
            <e-toolbar-item text="Save" prefixIcon="e-icons e-save" tooltipText="Save"></e-toolbar-item>
            <e-toolbar-item type="Separator"></e-toolbar-item>
            <e-toolbar-item text="Undo" prefixIcon="e-icons e-undo" tooltipText="Undo"></e-toolbar-item>
            <e-toolbar-item text="Redo" prefixIcon="e-icons e-redo" tooltipText="Redo"></e-toolbar-item>
            <e-toolbar-item type="Separator"></e-toolbar-item>
            <e-toolbar-item text="Exit" prefixIcon="e-icons e-close" tooltipText="Exit" align="Right"></e-toolbar-item>
        </e-toolbar-items>
    </ejs-toolbar>
</div>

<script>
    // Optional: Add event handlers
    document.addEventListener('ejs-toolbar-itemclicked', function(e) {
        console.log('Toolbar item clicked:', e.detail);
    });
</script>
```

Press **Ctrl+F5** to run the application. Your Toolbar should display with icons, tooltips, and separators properly rendered.

## Troubleshooting

### Toolbar not displaying
- Verify TagHelper is registered in `_ViewImports.cshtml`
- Confirm CSS and script resources are loaded from CDN or local path
- Check browser console for JavaScript errors

### Icons not showing
- Ensure icon CSS classes are correctly applied
- Verify Syncfusion theme CSS is included
- Check that `prefixIcon` property matches available icon class names

### Components not responsive
- Check `overflowMode` property (default is Scrollable)
- Verify toolbar `width` property is set appropriately
- Test on different screen sizes using browser DevTools

For additional help, refer to the [official Syncfusion Toolbar documentation](https://ej2.syncfusion.com/aspnetcore/documentation/toolbar/getting-started) and community forums.
