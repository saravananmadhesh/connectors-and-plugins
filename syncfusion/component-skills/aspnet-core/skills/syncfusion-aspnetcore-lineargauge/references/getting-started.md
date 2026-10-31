# Getting Started with Linear Gauge

## Table of Contents
- [Installation](#installation)
- [Basic Implementation](#basic-implementation)
  - [Step 1: Add Tag Helper Import](#step-1-add-tag-helper-import)
  - [Step 2: Register Script Manager](#step-2-register-script-manager)
  - [Step 3: Add Linear Gauge Control](#step-3-add-linear-gauge-control)
- [Script Configuration](#script-configuration)
  - [Add Script Reference](#add-script-reference)
- [Initial Setup](#initial-setup)
  - [Minimal Configuration](#minimal-configuration)
  - [Configuration with Pointers](#configuration-with-pointers)
- [Script Setup](#script-setup)
  - [Enable Script-Based Initialization](#enable-script-based-initialization)
- [First Render](#first-render)
- [Troubleshooting](#troubleshooting)

## Installation

To add Linear Gauge to your ASP.NET Core application, first install the Syncfusion.EJ2.AspNet.Core NuGet package.

**Using Package Manager Console:**
```bash
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.3
```

**Using .NET CLI:**
```bash
dotnet add package Syncfusion.EJ2.AspNet.Core --version 33.2.3
```

The Syncfusion.EJ2.AspNet.Core package has dependencies on:
- Newtonsoft.Json (for JSON serialization)
- Syncfusion.Licensing (for validating Syncfusion license key)

These are automatically installed as dependencies.

## Basic Implementation

### Step 1: Add Tag Helper Import

Open `~/Pages/_ViewImports.cshtml` and add the Syncfusion.EJ2 tag helper:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This enables all Syncfusion tag helpers throughout your application.

### Step 2: Register Script Manager

Register the script manager at the end of `<body>` in `~/Pages/Shared/_Layout.cshtml`:

```cshtml
<body>
    <!-- Your page content -->
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Step 3: Add Linear Gauge Control

In your Razor page (`~/Pages/Index.cshtml`), add the Linear Gauge tag helper:

```cshtml
<ejs-lineargauge id="linear"></ejs-lineargauge>
```

When rendered, this creates a default horizontal linear gauge with:
- Default height: 450px
- Default width: parent container width
- Axis range: 0 to 100
- Basic styling with theme colors

## Script Configuration

### Add Script Reference

Add the Syncfusion script in the `<head>` of `~/Pages/Shared/_Layout.cshtml`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.2.3/dist/ej2.min.js"></script>
</head>
```

Replace `33.2.3` with your current Syncfusion version.

## Initial Setup

### Minimal Configuration

```cshtml
<ejs-lineargauge id="temperature" 
                  title="Temperature"
                  orientation="Vertical">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Configuration with Pointers

```cshtml
<ejs-lineargauge id="gauge" title="Speed Gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="120">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="70" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Script Setup

### Enable Script-Based Initialization

If not using tag helpers, you can initialize via JavaScript after script load:

```html
<div id="linear"></div>
<ejs-scripts></ejs-scripts>

<script>
    var gauge = new ej.lineargauge.LinearGauge({
        orientation: 'Horizontal',
        axes: [{
            minimum: 0,
            maximum: 100,
            pointers: [{
                value: 60,
                type: 'Bar'
            }]
        }]
    });
    gauge.appendTo('#linear');
</script>
```

This approach requires the `ejs-scripts` tag and direct DOM element targeting.

## First Render

When the gauge renders for the first time:

1. **HTML SVG Generation** - Syncfusion generates SVG markup for the gauge
2. **Script Manager Initialization** - `ejs-scripts` initializes all components
3. **Property Binding** - Data properties bind to the created gauge
4. **Animation** - Pointer animates from 0 to the specified value
5. **Ready State** - Gauge is interactive and ready for user interaction

Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>⌘</kbd>+<kbd>F5</kbd> (macOS) to run your app and see the gauge render.

## Troubleshooting

**Issue: Gauge not rendering**
- Verify `_ViewImports.cshtml` has `@addTagHelper *, Syncfusion.EJ2`
- Confirm `ejs-scripts` is added at end of `<body>` in layout
- Check browser console for JavaScript errors
- Ensure theme CSS is loaded (check Network tab in DevTools)

**Issue: Script errors in console**
- Verify CDN URLs match your Syncfusion version
- Confirm NuGet package version matches CDN version
- Clear browser cache and hard refresh (Ctrl+Shift+R)

**Issue: Styling looks wrong**
- Verify theme CSS is loaded before `ejs.min.js`
- Check if another CSS framework conflicts with Syncfusion styles
- Try a different theme to isolate the issue

**Issue: Tag helper not recognized**
- Ensure `Syncfusion.EJ2` is imported in `_ViewImports.cshtml`
- Rebuild project (Clean + Rebuild)
- Restart Visual Studio if changes don't take effect

**Quick Validation Checklist:**
- [ ] NuGet package installed
- [ ] Tag helper imported in `_ViewImports.cshtml`
- [ ] Script manager added to layout
- [ ] Theme CSS loaded in `<head>`
- [ ] Script CDN loaded in `<head>`
- [ ] Gauge markup is valid CSHTML
- [ ] No conflicting JavaScript libraries
