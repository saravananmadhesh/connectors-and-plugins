# Getting Started with Syncfusion Core Tab Component

## Table of Contents
- [Prerequisites](#prerequisites)
- [NuGet Package Installation](#nuget-package-installation)
- [Tag Helper Configuration](#tag-helper-configuration)
- [CSS and Script References](#css-and-script-references)
- [Script Manager Registration](#script-manager-registration)
- [Basic Tab Initialization](#basic-tab-initialization)
- [Initialization with JSON Items Collection](#initialization-with-json-items-collection)
- [Initialization with HTML Elements](#initialization-with-html-elements)
- [Rendering and Verification](#rendering-and-verification)

## Prerequisites

Ensure your ASP.NET Core development environment meets these requirements:

- **ASP.NET Core Version:** 3.1 or later
- **Visual Studio:** 2017 or later
- **.NET Runtime:** Matching your ASP.NET Core version
- **System Requirements:** Refer to Syncfusion documentation for OS-specific requirements

You can create an ASP.NET Core web application using:
1. Microsoft Templates (standard dotnet new wizard)
2. Syncfusion ASP.NET Core Extension for Visual Studio

## NuGet Package Installation

The Syncfusion Tab component is part of the `Syncfusion.EJ2.AspNet.Core` NuGet package.

### Installation Steps

1. Open NuGet Package Manager in Visual Studio
   - Navigate to: **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**

2. Search for `Syncfusion.EJ2.AspNet.Core` in the Browse tab

3. Select the package and click **Install**

Alternatively, use the Package Manager Console:

```plaintext
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

### Package Dependencies

The `Syncfusion.EJ2.AspNet.Core` package automatically installs these dependencies:
- **Newtonsoft.Json** - For JSON serialization and deserialization
- **Syncfusion.Licensing** - For license validation

**Important Note:** Tab components are available on [nuget.org](https://www.nuget.org/packages?q=syncfusion.EJ2). Refer to NuGet packages documentation for installation guidance on different operating systems.

## Tag Helper Configuration

After installing the NuGet package, configure the Syncfusion Tag Helper in your project.

### Step 1: Open View Imports File

Open the `_ViewImports.cshtml` file located in the `~/Pages/` directory:

```plaintext
~/Pages/_ViewImports.cshtml
```

### Step 2: Add Tag Helper Registration

Add the following line to register the Syncfusion Tag Helper:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This single line registers all Syncfusion EJ2 Tag Helpers, including the Tab component, for use throughout your Razor pages.

## CSS and Script References

The Tab component requires CSS styles and JavaScript functionality to render correctly.

### Reference Methods

You can add references using:
1. **CDN** (Content Delivery Network) - Remote hosted files
2. **NPM** - Local node_modules installation
3. **CRG** (Custom Resource Generator) - Syncfusion tool for optimization

### CDN References (Recommended for Getting Started)

Add these references to the `<head>` section of your layout file (`~/Pages/Shared/_Layout.cshtml`):

```cshtml
<head>
    <!-- Other head content -->
    
    <!-- Syncfusion ASP.NET Core controls CSS theme -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    
    <!-- Syncfusion ASP.NET Core controls JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

### Available Themes

Common themes available via CDN:
- `fluent.css` - Modern light theme (default)
- `bootstrap5.css` - Bootstrap 5 inspired
- `bootstrap4.css` - Bootstrap 4 inspired
- `material.css` - Material Design
- `tailwind.css` - Tailwind CSS inspired
- `fabric.css` - Fabric Design

Choose the theme that matches your application design, or customize via the Custom Resource Generator.

### NPM Installation (For Local Packages)

Alternatively, install Syncfusion packages locally:

```plaintext
npm install @syncfusion/ej2-navigations @syncfusion/ej2-base
```

Then reference in your layout:

```cshtml
<link rel="stylesheet" href="~/node_modules/@syncfusion/ej2-navigations/styles/tab.css" />
<script src="~/node_modules/@syncfusion/ej2-navigations/dist/ej2-navigations.min.js"></script>
```

## Script Manager Registration

Register the Syncfusion Script Manager at the end of the `<body>` section in your layout file.

### Add Script Manager Tag

In `~/Pages/Shared/_Layout.cshtml`, add this tag before the closing `</body>`:

```cshtml
<body>
    <!-- Page content goes here -->
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` Tag Helper initializes all Syncfusion components on the page and must be present in the layout.

## Basic Tab Initialization

Now that prerequisites and references are configured, create a basic Tab component.

### Simple Tab Example

Add this code to your Razor page (`~/Pages/Index.cshtml`):

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Twitter" })" 
                        content="Twitter is an online social networking service that enables users to send and read short 140-character messages called tweets.">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Facebook" })" 
                        content="Facebook is an online social networking service headquartered in Menlo Park, California.">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "WhatsApp" })" 
                        content="WhatsApp Messenger is a proprietary cross-platform instant messaging client for smartphones.">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Tag Structure Explanation

- **`<ejs-tab>`** - Root Tab component Tag Helper
  - `id` - Unique identifier for the Tab (required for JavaScript access)
- **`<e-tab-tabitems>`** - Container for all tab items
- **`<e-tab-tabitem>`** - Individual tab item
  - `header` - Creates TabHeader object with `Text` property for display text
  - `content` - String content displayed when tab is selected

## Initialization with JSON Items Collection

Initialize the Tab component by binding a list of TabItem objects in your controller.

### Controller Code

```csharp
using Syncfusion.EJ2.Navigations;
using Microsoft.AspNetCore.Mvc;

public class IndexModel : PageModel
{
    public List<TabItem> TabItems { get; set; }
    
    public void OnGet()
    {
        TabItems = new List<TabItem>();
        
        TabItems.Add(new TabItem
        {
            Header = new TabHeader { Text = "Twitter" },
            Content = "Twitter is an online social networking service that enables users to send and read short 140-character messages called 'tweets'."
        });
        
        TabItems.Add(new TabItem
        {
            Header = new TabHeader { Text = "Facebook" },
            Content = "Facebook is an online social networking service headquartered in Menlo Park, California."
        });
        
        TabItems.Add(new TabItem
        {
            Header = new TabHeader { Text = "WhatsApp" },
            Content = "WhatsApp Messenger is a proprietary cross-platform instant messaging client for smartphones."
        });
    }
}
```

### Razor Page Code

```cshtml
@using Syncfusion.EJ2.Navigations;
@model IndexModel

<ejs-tab id="ej2Tab" items="Model.TabItems"></ejs-tab>
```

### Benefits of JSON Binding

- Cleaner Razor markup
- Easier dynamic item management
- Data binding from databases or APIs
- Separation of concerns (data in controller)

## Initialization with HTML Elements

Create a Tab by converting existing HTML structure into a Tab component.

### HTML Structure

```html
<div id='ej2Tab'>
    <div class="e-tab-header">
        <div>Twitter</div>
        <div>Facebook</div>
        <div>WhatsApp</div>
    </div>
    <div class="e-content">
        <div>
            <p>Twitter is an online social networking service...</p>
        </div>
        <div>
            <p>Facebook is an online social networking service...</p>
        </div>
        <div>
            <p>WhatsApp Messenger is a proprietary cross-platform...</p>
        </div>
    </div>
</div>
```

### Key HTML Classes

- **`e-tab-header`** - Container for header items
- **`e-content`** - Container for content panels
- Header items and content panels must be direct children of their respective containers
- Number of header items must match number of content panels (1:1 mapping)

### Razor Page Integration

```cshtml
<div id='ej2Tab'>
    <div class="e-tab-header">
        <div>Home</div>
        <div>About</div>
        <div>Contact</div>
    </div>
    <div class="e-content">
        <div>
            <h3>Home Content</h3>
            <p>Welcome to the home page.</p>
        </div>
        <div>
            <h3>About Content</h3>
            <p>Learn more about us.</p>
        </div>
        <div>
            <h3>Contact Content</h3>
            <p>Get in touch with us.</p>
        </div>
    </div>
</div>

<script>
    // Initialize Tab from HTML element
    new ej.navigations.Tab({
        heightAdjustMode: 'Auto'
    }, '#ej2Tab');
</script>
```

## Rendering and Verification

After implementing the Tab component, test it to ensure proper rendering.

### Run the Application

1. Build the project: Press **Ctrl+Shift+B** or use **Build → Build Solution**
2. Run the application: Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS)
3. The browser opens with your application at localhost

### Verify Tab Rendering

- Tab headers appear in the specified location (top by default)
- Clicking each header displays corresponding content
- No console errors appear in browser developer tools (F12)
- Tab navigation is accessible via mouse and keyboard

### Troubleshooting Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Tab doesn't render | CSS/Script references missing | Verify CDN links in layout |
| Headers visible but content hidden | `heightAdjustMode` not set | Add `heightAdjustMode="@HeightStyles.Auto"` |
| Tag Helper not recognized | `_ViewImports.cshtml` missing registration | Add `@addTagHelper *, Syncfusion.EJ2` |
| JavaScript errors in console | Script manager not registered | Add `<ejs-scripts>` before `</body>` |
| Items not binding | Property name mismatch | Verify `items="Model.TabItems"` property name |

---

**Next Steps:** After successful initialization, explore tab-content-rendering.md for content management options, or see SKILL.md for advanced feature links.
