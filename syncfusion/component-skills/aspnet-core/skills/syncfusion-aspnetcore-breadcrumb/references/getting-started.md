# Getting Started with Breadcrumb Control

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register TagHelper](#register-taghelper)
- [Add Stylesheet and Script Resources](#add-stylesheet-and-script-resources)
- [Register Script Manager](#register-script-manager)
- [Create Your First Breadcrumb](#create-your-first-breadcrumb)
- [Add Items to Breadcrumb](#add-items-to-breadcrumb)
- [Control Item Navigation](#control-item-navigation)

## Prerequisites

Before using the Syncfusion Breadcrumb control, ensure your ASP.NET Core project meets these requirements:

- **ASP.NET Core Version:** 3.1 or higher
- **Visual Studio:** 2019 or later
- **NuGet Package Manager:** Latest version
- **System Requirements:** Check [ASP.NET Core System Requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

You can create a new ASP.NET Core project using:
- Microsoft's built-in templates via Visual Studio
- Syncfusion ASP.NET Core Extension (recommended for pre-configured Syncfusion setup)

## Install NuGet Package

The Breadcrumb control is included in the Syncfusion.EJ2.AspNet.Core NuGet package.

### Via NuGet Package Manager GUI:

1. Open Visual Studio
2. Go to **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
3. Search for `Syncfusion.EJ2.AspNet.Core`
4. Click **Install**
5. Accept the license agreement

### Via Package Manager Console:

Run the following command in Package Manager Console:

```
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

### Dependencies:

The Syncfusion.EJ2.AspNet.Core package depends on:
- **Newtonsoft.Json** - For JSON serialization
- **Syncfusion.Licensing** - For license validation

These are automatically installed as dependencies.

### NuGet Resources:

- **Official Package:** [Syncfusion.EJ2.AspNet.Core on NuGet.org](https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core/)
- **All Syncfusion Packages:** Search "Syncfusion.EJ2" on [NuGet.org](https://www.nuget.org/packages?q=syncfusion.EJ2)
- **NuGet Documentation:** [NuGet Packages Topic](https://ej2.syncfusion.com/aspnetcore/documentation/nuget-packages)

## Register TagHelper

Syncfusion components use TagHelper syntax in ASP.NET Core. You must register the TagHelper before using any Syncfusion components.

### Option 1: Register in _ViewImports.cshtml (Recommended)

Add this line to `~/Pages/_ViewImports.cshtml` or `~/Views/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This makes all Syncfusion TagHelpers available to all views in the application.

### Option 2: Register in Individual View Files

Add the following directive at the top of your .cshtml page:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

Use this approach only if you want the TagHelper available in a specific view.

### Option 3: Register Globally in root.cshtml

For Razor Pages applications, add to `~/Pages/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**Why Register TagHelper?**
- Enables IntelliSense for Syncfusion components in your editor
- Allows using custom tags like `<ejs-breadcrumb>` and `<e-breadcrumb-item>`
- Required for the component to render correctly

## Add Stylesheet and Script Resources

The Breadcrumb control requires CSS and JavaScript resources. You can add them using CDN (Content Delivery Network) or NPM packages.

### Add Resources via CDN (Recommended for Quick Setup)

Add these lines to the `<head>` section of `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    ...
    <!-- Syncfusion CSS (Fluent theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    
    <!-- Syncfusion JavaScript (essential.min.js or ej2.min.js) -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

### Available Theme Options

Syncfusion provides multiple themes. Replace `fluent.css` with your preferred theme:
- `fluent.css` - Fluent (Microsoft-inspired)
- `bootstrap5.css` - Bootstrap 5
- `bootstrap4.css` - Bootstrap 4
- `material.css` - Material Design
- `tailwind.css` - Tailwind
- `highcontrast.css` - High Contrast

### Resource Version Variable

The `{{ site.ej2version }}` variable is typically replaced with the actual version (e.g., "24.1.36"). You can:
- Use a hardcoded version: `https://cdn.syncfusion.com/ej2/24.1.36/fluent.css`
- Use your site's version variable if available

### NPM Package Alternative

If using NPM packages instead of CDN:

```html
<head>
    <link rel="stylesheet" href="~/lib/ej2-core/styles/fluent.css" />
</head>

<body>
    ...
    <script src="~/lib/ej2-core/dist/ej2.min.js"></script>
</body>
```

### CSS Framework Compatibility

The Breadcrumb control works with:
- Bootstrap 5/4
- Tailwind CSS
- Material Design
- Fluent Design
- Any custom CSS framework

**Choose a theme that matches your application's design system.**

## Register Script Manager

Every ASP.NET Core Syncfusion component requires the **Script Manager** registered once in your layout. This initializes Syncfusion's JavaScript engine for all components.

### Add ejs-script Tag Helper

Add this tag to the end of the `<body>` section in `~/Pages/Shared/_Layout.cshtml`:

```html
<body>
    ...
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

**Important Notes:**
- Register `<ejs-scripts>` **only once** per page load (typically in _Layout.cshtml)
- Place it after all component definitions
- Omit this if you're manually loading ej2.min.js

### What ejs-scripts Does:

- Initializes all Syncfusion components on the page
- Provides event handling infrastructure
- Sets up two-way data binding
- Manages component lifecycle

## Create Your First Breadcrumb

Now that setup is complete, create a basic Breadcrumb control.

### Basic Breadcrumb Example

Create or open a page (e.g., `~/Pages/Index.cshtml`) and add:

```cshtml
@page
@addTagHelper *, Syncfusion.EJ2

<h2>Breadcrumb Navigation</h2>

<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Category"></e-breadcrumb-item>
        <e-breadcrumb-item text="Product"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**What this renders:**
- A horizontal breadcrumb control
- Three items separated by forward slashes (default separator)
- Display: `Home / Category / Product`

### Verify Your Setup

1. Press `Ctrl+F5` (Windows) or `⌘+F5` (macOS) to run your application
2. Navigate to your page in the browser
3. You should see the breadcrumb with three items
4. Items should be styled according to your chosen theme

## Add Items to Breadcrumb

Breadcrumb items are defined using `<e-breadcrumb-items>` and `<e-breadcrumb-item>` tags.

### Item Properties

Each `<e-breadcrumb-item>` supports these properties:

```cshtml
<e-breadcrumb-item 
    text="Item Text"           <!-- Display text for the item -->
    url="~/path"               <!-- URL to navigate to (optional) -->
    disabled="false"           <!-- Disable this item (optional) -->
    iconCss="e-icons e-home"   <!-- CSS classes for icon (optional) -->
    id="item1">                <!-- Unique identifier (optional) -->
</e-breadcrumb-item>
```

### Complete Example with Multiple Items

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/products/electronics/laptops"></e-breadcrumb-item>
        <e-breadcrumb-item text="Gaming Laptops"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Rendering:**
```
Home > Products > Electronics > Laptops > Gaming Laptops
```

### Item with Icon

```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-icons e-home">
</e-breadcrumb-item>
```

This renders the home icon before the "Home" text.

### Disabled Item

```cshtml
<e-breadcrumb-item 
    text="Disabled Page" 
    disabled="true">
</e-breadcrumb-item>
```

A disabled item is grayed out and non-clickable, even if a URL is provided.

### Best Practices for Items

1. **Provide meaningful text** - Users should understand what each breadcrumb level represents
2. **Order logically** - First item is usually "Home," last item is current page
3. **Don't exceed 7 items** - Long trails become hard to follow (use overflow modes for more)
4. **Use URLs consistently** - Either all items have URLs or most don't; mixing confuses users
5. **Last item without URL** - Typically the current page shouldn't be navigable

## Control Item Navigation

By default, breadcrumb items with a `url` are navigable (clickable). You can control navigation behavior with two properties.

### Disable All Navigation

Prevent all breadcrumb items from being clickable:

```cshtml
<ejs-breadcrumb enableNavigation="false">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Analytics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:** No items are clickable, even though URLs are defined. Useful when you want breadcrumbs as visual indicators only.

### Enable Last Item Navigation

By default, the last breadcrumb item (typically the current page) is not clickable. Use `enableActiveItemNavigation="true"` to make it clickable:

```cshtml
<ejs-breadcrumb enableActiveItemNavigation="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Analytics" url="~/analytics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:** Even the last item (currently active page) becomes clickable and navigable.

### Disable Specific Items

To disable individual items while keeping others navigable:

```cshtml
<e-breadcrumb-item 
    text="Maintenance" 
    url="~/maintenance"
    disabled="true">
</e-breadcrumb-item>
```

This item won't be clickable even with navigation enabled.

### Navigation Behavior Summary

| Scenario | enableNavigation | enableActiveItemNavigation | Result |
|----------|-----------------|--------------------------|--------|
| All items clickable | true (default) | true | All items (except disabled) navigate on click |
| All items read-only | false | false (default) | No items navigate; breadcrumb shows path only |
| Standard navigation | true (default) | false (default) | All items except the last are clickable |
| Current page clickable | true (default) | true | All items including current are clickable |

### Typical Use Cases

**For Read-Only Breadcrumbs:**
```cshtml
<ejs-breadcrumb enableNavigation="false">
```

**For Standard Navigation:**
```cshtml
<ejs-breadcrumb enableNavigation="true" enableActiveItemNavigation="false">
```

**For Full Navigation (Including Current):**
```cshtml
<ejs-breadcrumb enableNavigation="true" enableActiveItemNavigation="true">
```

---

## Next Steps

- Learn about [data binding](./data-binding.md) to connect breadcrumbs to dynamic data
- Explore [navigation options](./navigation.md) for URL handling
- Add [icons](./icons.md) to your breadcrumb items
- Customize appearance with [templates](./templates.md)
- Handle long trails with [overflow modes](./overflow-modes.md)
