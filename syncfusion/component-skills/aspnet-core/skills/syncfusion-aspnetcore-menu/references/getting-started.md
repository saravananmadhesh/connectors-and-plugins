# Getting Started with Menu

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Basic Menu Setup](#basic-menu-setup)
- [Creating Your First Menu](#creating-your-first-menu)
- [Sub-menu Structure](#sub-menu-structure)
- [TagHelper Syntax](#taghelper-syntax)
- [Theme and CSS Import](#theme-and-css-import)
- [Troubleshooting](#troubleshooting)

## Prerequisites

To use the Syncfusion Menu component in your ASP.NET Core application, you need:

- ASP.NET Core 3.1 or later
- Syncfusion.EJ2.AspNet.Core NuGet package installed
- Basic understanding of ASP.NET Core Razor Pages or MVC views
- Essential JS 2 theme files (CSS) referenced in your project

### System Requirements

Syncfusion components support modern browsers:
- Chrome (latest versions)
- Firefox (latest versions)
- Safari (latest versions)
- Edge (latest versions)

## Installation

### Step 1: Install Syncfusion NuGet Package

Open the NuGet Package Manager in Visual Studio and search for "Syncfusion.EJ2.AspNet.Core":

```
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

Or using the Package Manager Console:

```
PM> Install-Package Syncfusion.EJ2.AspNet.Core -Version latest
```

### Step 2: Add TagHelper Reference

Open `~/Pages/_ViewImports.cshtml` (for Razor Pages) or `~/Views/web.config` (for MVC) and add the Syncfusion TagHelper:

```html
@addTagHelper *, Syncfusion.EJ2
```

### Step 3: Register Syncfusion License

In your application startup, you may need to register the Syncfusion license. Add this to `Program.cs` or `Startup.cs`:

```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR-LICENSE-KEY");
```

### Step 4: Add Theme Stylesheet

Add the Syncfusion CSS theme to your `_Layout.cshtml` or master page inside the `<head>` section:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-base@latest/styles/material.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-navigations@latest/styles/material.css" />
```

Available themes: `material`, `bootstrap`, `bootstrap4`, `bootstrap5`, `fabric`, `highcontrast`, `tailwind`, `fluent`

### Step 5: Add Essential JS Scripts

Add the following script references before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/ej2-base@latest/dist/ej2-base.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ej2-navigations@latest/dist/ej2-navigations.min.js"></script>
```

Or use a single combined script:

```html
<script src="https://cdn.jsdelivr.net/npm/ej2-bundle@latest/dist/ej2-bundle.min.js"></script>
```

## Basic Menu Setup

### Minimal HTML Structure

The Menu component requires a target element in your HTML. The most common approach is using a `<div>` with an `id`:

```html
<div id="menu"></div>
```

Then initialize the Menu using the `<ejs-menu>` TagHelper:

```html
<ejs-menu id="menu"></ejs-menu>
```

### In Razor Page or MVC View

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new { text = "Home" });
    menuItems.Add(new { text = "About" });
    menuItems.Add(new { text = "Services" });
    menuItems.Add(new { text = "Contact" });
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### In Controller (for MVC)

```csharp
public IActionResult Index()
{
    var menuItems = new List<object>
    {
        new { text = "Home" },
        new { text = "About" },
        new { text = "Services" },
        new { text = "Contact" }
    };
    
    ViewBag.MenuItems = menuItems;
    return View();
}
```

## Creating Your First Menu

### Example 1: Simple Vertical Menu

**View Code:**

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new { text = "File" });
    menuItems.Add(new { text = "Edit" });
    menuItems.Add(new { text = "View" });
    menuItems.Add(new { text = "Help" });
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

**Output:** A vertical menu with four items displayed in a dropdown style.

### Example 2: Horizontal Menu

For a horizontal menu layout, set the `orientation` property:

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new { text = "Home" });
    menuItems.Add(new { text = "Products" });
    menuItems.Add(new { text = "Services" });
    menuItems.Add(new { text = "Contact" });
}

<ejs-menu id="menu" items="menuItems" orientation="Horizontal"></ejs-menu>
```

**Output:** A horizontal menu bar suitable for navigation headers.

## Sub-menu Structure

### Creating Sub-menu Items

Menu items can have nested sub-items using the `items` property within each MenuItem:

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new
    {
        text = "File",
        items = new List<object>
        {
            new { text = "New" },
            new { text = "Open" },
            new { text = "Save" },
            new { text = "Save As..." },
            new { text = "Close" }
        }
    });
    menuItems.Add(new
    {
        text = "Edit",
        items = new List<object>
        {
            new { text = "Undo" },
            new { text = "Redo" },
            new { text = "Cut" },
            new { text = "Copy" },
            new { text = "Paste" }
        }
    });
    menuItems.Add(new
    {
        text = "View",
        items = new List<object>
        {
            new { text = "Toolbar" },
            new { text = "Sidebar" },
            new { text = "Fullscreen" }
        }
    });
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Multi-level Nesting

Sub-menu items can themselves contain sub-items, creating multiple levels of hierarchy:

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new
    {
        text = "File",
        items = new List<object>
        {
            new { text = "New" },
            new {
                text = "Open",
                items = new List<object>
                {
                    new { text = "Open File" },
                    new { text = "Open Project" },
                    new { text = "Open Recent" }
                }
            },
            new { text = "Save" }
        }
    });
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

## TagHelper Syntax

### Basic TagHelper Attributes

The Menu TagHelper uses the following standard attributes:

```html
<ejs-menu id="UNIQUE_ID" 
    items="ItemsVariable"
    orientation="Horizontal|Vertical"
    cssClass="custom-class"
    enabled="true|false">
</ejs-menu>
```

### Important TagHelper Rules

1. **id attribute**: Must be unique within the page
2. **items property**: Can be bound to a C# variable (`ViewBag.MenuItems`) or inline list
3. **Property names**: Use camelCase (e.g., `text`, `items`) in C# anonymous objects
4. **Type binding**: TagHelper automatically converts C# objects to JavaScript

### Example: Complete TagHelper Usage

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new
    {
        text = "Dashboard",
        iconCss = "e-icons e-home"
    });
    menuItems.Add(new
    {
        text = "Administration",
        items = new List<object>
        {
            new { text = "User Management" },
            new { text = "Roles & Permissions" }
        }
    });
}

<ejs-menu id="mainMenu"
    items="menuItems"
    orientation="Horizontal"
    cssClass="navbar-menu"
    enableRtl="false">
</ejs-menu>
```

## Theme and CSS Import

### Available Themes

Syncfusion provides multiple pre-built themes for consistency:

| Theme | Use Case |
|-------|----------|
| material | Material Design (default) |
| bootstrap | Bootstrap 3 styling |
| bootstrap4 | Bootstrap 4 styling |
| bootstrap5 | Bootstrap 5 styling |
| fabric | Microsoft Office styling |
| highcontrast | Accessibility (high contrast) |
| tailwind | Tailwind CSS compatible |
| fluent | Microsoft Fluent Design |

### Importing Themes

**Option 1: CDN (Recommended for quick start)**

```html
<!-- Theme CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-base@latest/styles/material.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-navigations@latest/styles/material.css" />

<!-- Essential JS Scripts -->
<script src="https://cdn.jsdelivr.net/npm/ej2-base@latest/dist/ej2-base.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ej2-navigations@latest/dist/ej2-navigations.min.js"></script>
```

**Option 2: Local NuGet Styles (if installed locally)**

```html
<link rel="stylesheet" href="~/lib/ej2-base/styles/material.css" />
<link rel="stylesheet" href="~/lib/ej2-navigations/styles/material.css" />
```

### Styling Best Practices

1. **Always import theme before component scripts**
2. **Place CSS links in `<head>` section**
3. **Place JavaScript before closing `</body>`**
4. **Use CDN for production (faster delivery)**
5. **Use local files for offline development**

### Custom CSS Class Integration

Add custom styling by using the `cssClass` property along with custom CSS:

```html
<ejs-menu id="menu" items="menuItems" cssClass="custom-menu"></ejs-menu>

<style>
    .custom-menu .e-menu-wrapper {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
    }
    
    .custom-menu .e-menu-item {
        padding: 12px 20px;
        font-weight: 500;
    }
</style>
```

## Troubleshooting

### Issue: Menu Component Not Displaying

**Solutions:**
1. Verify `_ViewImports.cshtml` has `@addTagHelper *, Syncfusion.EJ2`
2. Check that CSS and JS files are correctly linked
3. Ensure the `id` attribute is unique on the page
4. Verify NuGet package is installed: `Syncfusion.EJ2.AspNet.Core`

### Issue: Sub-menus Not Opening

**Solutions:**
1. Ensure `items` property is properly populated with nested arrays
2. Property names must be lowercase: `text`, `items`, `iconCss`
3. Check browser console for JavaScript errors

### Issue: Styling Not Applied

**Solutions:**
1. Verify theme CSS file is linked before component scripts
2. Check that `cssClass` property value matches your CSS selectors
3. Ensure custom CSS is defined after theme CSS

### Issue: Items Not Binding from Data

**Solutions:**
1. Verify the variable in TagHelper matches the C# variable name
2. Ensure FieldSettingsModel is properly configured for custom data
3. Check that field name mappings match your data structure

---

**Next:** Learn about hierarchical data binding, self-referential structures, and advanced item configuration in the [menu-items-and-data-binding.md](menu-items-and-data-binding.md) reference.
