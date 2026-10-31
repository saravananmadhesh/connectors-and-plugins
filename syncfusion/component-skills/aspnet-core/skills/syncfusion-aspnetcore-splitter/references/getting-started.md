# Getting Started with ASP.NET Core Splitter

## Table of Contents
- [Prerequisites](#prerequisites)
- [NuGet Package Installation](#nuget-package-installation)
- [Tag Helper Registration](#tag-helper-registration)
- [Stylesheet and Script Setup](#stylesheet-and-script-setup)
- [Script Manager Registration](#script-manager-registration)
- [Creating Your First Splitter](#creating-your-first-splitter)
- [Basic Two-Pane Configuration](#basic-two-pane-configuration)
- [Verifying Installation](#verifying-installation)

## Prerequisites

Before implementing the Splitter component, ensure your ASP.NET Core project meets these system requirements:
- ASP.NET Core 5.0 or later
- Visual Studio 2019 or later (or Visual Studio Code)
- .NET SDK compatible with your ASP.NET Core version

Refer to the [System requirements for ASP.NET Core controls](url) for detailed information.

## NuGet Package Installation

To add the Splitter control to your ASP.NET Core application, install the Syncfusion ASP.NET Core package:

### Using Visual Studio NuGet Package Manager:
1. Go to **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Click **Install** to add it to your project

### Using Package Manager Console:
```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 27.1.48
```

**Note:** The Syncfusion.EJ2.AspNet.Core package has dependencies on Newtonsoft.Json (for JSON serialization) and Syncfusion.Licensing (for license validation). These are installed automatically.

## Tag Helper Registration

To use Syncfusion ASP.NET Core controls as tag helpers, register them in your `_ViewImports.cshtml` file:

**File:** `~/Pages/_ViewImports.cshtml`

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This single line enables all Syncfusion tag helpers in your Razor views.

## Stylesheet and Script Setup

Add the Syncfusion CSS and JavaScript resources to your layout file. These are typically referenced from CDN for easy maintenance.

**File:** `~/Pages/Shared/_Layout.cshtml`

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core styles -->
    <link rel="stylesheet" href="url" />
    <!-- Syncfusion ASP.NET Core scripts -->
    <script src="url"></script>
</head>
```

**Why use CDN?**
- Reduces application size by not bundling resources
- Browser caches resources across different websites
- Easy to update theme or version by changing URL
- Reduces server load

**Theme Options:** Available themes include `fluent`, `fluent-dark`, `bootstrap5`, `tailwind`, `material`, and others. Choose based on your application design.

## Script Manager Registration

Register the Syncfusion script manager at the end of the `<body>` tag in your layout:

**File:** `~/Pages/Shared/_Layout.cshtml`

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` tag helper ensures proper initialization of all Syncfusion controls on the page.

## Creating Your First Splitter

Now you can add the Splitter control to your page. Create a basic two-pane horizontal splitter:

**File:** `~/Pages/Index.cshtml`

```csharp
@page
@model IndexModel
@addTagHelper *, Syncfusion.EJ2

<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane content="<div class='content'><h3>Left Pane</h3><p>This is the left pane of the splitter.</p></div>"></e-splitter-pane>
        <e-splitter-pane content="<div class='content'><h3>Right Pane</h3><p>This is the right pane of the splitter.</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<style>
    .content {
        padding: 20px;
    }
</style>
```

**What this creates:**
- A horizontal splitter with 400px height
- Two equal-sized panes (50% each by default)
- Each pane contains HTML content
- Vertical separator bar between panes
- Both panes are resizable by default

## Basic Two-Pane Configuration

You can customize the initial pane sizes and behavior:

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <!-- Left pane: 30% width, minimum 100px -->
        <e-splitter-pane size="30%" min="100px" content="<div class='content'><h3>Navigation</h3><ul><li>Home</li><li>About</li><li>Services</li></ul></div>"></e-splitter-pane>
        
        <!-- Right pane: 70% width, minimum 200px -->
        <e-splitter-pane size="70%" min="200px" content="<div class='content'><h3>Main Content</h3><p>Content area for the selected item.</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Configuration details:**
- `size="30%"` - Left pane gets 30% of width, right pane gets remaining 70%
- `min="100px"` - Prevents resizing below 100 pixels
- Panes are always resizable unless explicitly disabled
- Separator allows drag to resize

## Verifying Installation

After implementing the basic example, verify everything works:

1. **Run your application** - Press F5 or use `dotnet run`
2. **Check the browser** - You should see the splitter with two panes
3. **Test resizing** - Drag the separator between panes to resize
4. **Check console** - Look for any JavaScript errors in browser dev tools

**Common issues:**
- Scripts not loading → Verify CDN URLs are correct
- No separation visible → Check height is set and content exists
- No resize capability → Ensure `resizable` is not set to false

## Next Steps

- Configure different pane sizes and constraints (see Pane Sizing and Resizing)
- Create multiple panes or nested layouts (see Split Pane Layouts)
- Add rich content including other controls (see Pane Content)
- Implement collapse/expand functionality (see Expand and Collapse)
- Customize appearance (see Styling and Globalization)
