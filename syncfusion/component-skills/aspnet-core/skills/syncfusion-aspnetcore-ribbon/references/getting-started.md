# Getting Started with ASP.NET Core Ribbon

## Table of Contents

- [Installation](#installation)
- [Setup Steps](#setup-steps)
- [Tag Helper Registration](#tag-helper-registration)
- [CSS & Script Setup](#css--script-setup)
- [Basic Ribbon Implementation](#basic-ribbon-implementation)
- [Available Themes](#available-themes)
- [First Complete Example](#first-complete-example)

## Installation

### Via NuGet Package Manager

Open **NuGet Package Manager** in Visual Studio:
1. Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Click Install

## Setup Steps

### Step 1: Register License (Program.cs)

```csharp
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Register Syncfusion license
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

// Add services
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure pipeline
app.UseRouting();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

### Step 2: Register Tag Helpers (_ViewImports.cshtml)

Open `~/Pages/_ViewImports.cshtml` and add:

```razor
@addTagHelper *, Syncfusion.EJ2
```

### Step 3: Add CSS & Scripts (_Layout.cshtml)

In `~/Pages/Shared/_Layout.cshtml`, add to `<head>`:

```html
<head>
    <!-- ... existing content ... -->
    
    <!-- Syncfusion ASP.NET Core Ribbon CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.2.3/fluent.css" />
</head>

<body>
    <!-- ... content ... -->
    
    <!-- Syncfusion ASP.NET Core Ribbon Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/24.2.3/dist/ej2.min.js"></script>
    
    <!-- Script Manager (required for initialization) -->
    <ejs-scripts></ejs-scripts>
    
    @RenderSection("Scripts", required: false)
</body>
```

## Tag Helper Registration

### Adding Required Usings

At the top of your Razor Page or View:

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations
```

### Tag Helper Syntax

Ribbon components use tag helpers with `e-ribbon-*` naming:

```razor
<ejs-ribbon>           <!-- Main component -->
    <e-ribbon-tabs>    <!-- Tabs container -->
        <e-ribbon-tab> <!-- Individual tab -->
            <e-ribbon-groups>       <!-- Groups container -->
                <e-ribbon-group>    <!-- Individual group -->
                    <e-ribbon-collections>  <!-- Collections -->
                        <e-ribbon-collection>
                            <e-ribbon-items>    <!-- Items container -->
                                <e-ribbon-item> <!-- Individual item -->
```

## CSS & Script Setup

### Theme Options

| Theme | CDN URL |
|-------|---------|
| Material (default) | `https://cdn.syncfusion.com/ej2/24.2.3/material.css` |
| Bootstrap 5 | `https://cdn.syncfusion.com/ej2/24.2.3/bootstrap5.css` |
| Fluent | `https://cdn.syncfusion.com/ej2/24.2.3/fluent.css` |
| Tailwind | `https://cdn.syncfusion.com/ej2/24.2.3/tailwind.css` |
| Fabric | `https://cdn.syncfusion.com/ej2/24.2.3/fabric.css` |

**Dark Variants:** Append `-dark.min.css` instead of `.css`

Example (Bootstrap 5 Dark):
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.2.3/bootstrap5-dark.css" />
```

### Script References

Synchronize version numbers. Current stable: `24.2.3`

```html
<!-- Main JS (required) -->
<script src="https://cdn.syncfusion.com/ej2/24.2.3/dist/ej2.min.js"></script>

<!-- Optional: Individual package scripts -->
<script src="https://cdn.syncfusion.com/ej2/24.2.3/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/24.2.3/ej2-ribbon.min.js"></script>
```

## Basic Ribbon Implementation

### Minimal Ribbon

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### With Multiple Items

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard" orientation=Row>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-paste" content="Paste"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

## Available Themes

All 5 Syncfusion themes are CDN-available:

| Theme | Material-based | Use Case |
|-------|---|---|
| **Material** | ✓ | Modern, flat design (default) |
| **Bootstrap 5** | ✓ | Bootstrap compatibility |
| **Fluent** | ✓ | Microsoft Office-like |
| **Tailwind** | ✓ | Tailwind CSS alignment |
| **Fabric** | ✓ | Office Fabric styling |

To switch themes, replace the CSS file path in _Layout.cshtml:

```html
<!-- Material (default) -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.2.3/material.css" />

<!-- Bootstrap 5 -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.2.3/bootstrap5.css" />

<!-- Fluent -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.2.3/fluent.css" />
```

## First Complete Example

Complete working example with setup code (Index.cshtml or similar Razor page):

```razor
@page
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    ViewData["Title"] = "Ribbon Example";
    
    List<MenuItem> pasteOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Keep Source Format" }, 
        new MenuItem { Text = "Merge format" }, 
        new MenuItem { Text = "Keep text only" } 
    };
    
    List<string> fontStyle = new List<string>() { 
        "Arial", "Calibri", "Cambria", "Georgia", "Times New Roman", "Verdana" 
    };
}

<h1>My Ribbon Application</h1>

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <!-- Clipboard Group -->
                <e-ribbon-group header="Clipboard" orientation=Row>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=SplitButton allowedSizes=Large>
                                    <e-ribbon-splitbuttonsettings iconCss="e-icons e-paste" content="Paste" items=pasteOptions></e-ribbon-splitbuttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Font Group -->
                <e-ribbon-group header="Font" orientation=Row>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=ComboBox>
                                    <e-ribbon-comboboxsettings dataSource=fontStyle index=0 allowFiltering=true width="150px"></e-ribbon-comboboxsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=ColorPicker allowedSizes=Small>
                                    <e-ribbon-colorpickersettings value="#123456"></e-ribbon-colorpickersettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-bold" isToggle=true></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>

        <e-ribbon-tab header="Insert">
            <e-ribbon-groups>
                <e-ribbon-group header="Tables">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-table" content="Table"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

## Advanced Feature Registration

In ASP.NET Core Tag Helpers, all advanced Ribbon features — **File Menu, Backstage, Gallery, ColorPicker, Contextual Tabs, and KeyTips** — are bundled in `Syncfusion.EJ2.AspNet.Core` and do not require separate module injection. Enable each feature by using the corresponding tag helper:

| Feature | Tag Helper to Use |
|---------|-------------------|
| File Menu | `<e-ribbon-filemenusettings>` |
| Backstage | `<e-ribbon-backstagemenusettings>` |
| Gallery item | `<e-ribbon-item type=Gallery>` |
| ColorPicker item | `<e-ribbon-item type=ColorPicker>` |
| Contextual Tabs | `<e-ribbon-contextual-tabs>` |
| KeyTips | `enableKeyTips=true` on `<ejs-ribbon>` |


## Localization

Use the `locale` property to set the language for built-in ribbon UI strings (e.g., "Collapse Ribbon", layout switcher tooltips).

```razor
<ejs-ribbon id="ribbon" locale="fr-FR">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Accueil">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

Provide translated strings via the Syncfusion locale file. Load the locale JSON and set it before the ribbon renders:

```html
<script src="https://cdn.syncfusion.com/ej2/24.2.3/dist/ej2.min.js"></script>
<script>
    ej.base.L10n.load({
        'fr-FR': {
            'ribbon': {
                'expandButton': 'Développer le ruban',
                'collapseButton': 'Réduire le ruban'
            }
        }
    });
</script>
```

## State Persistence

Use `enablePersistence=true` to save and restore the ribbon state (active layout, selected tab, minimized state) across page reloads using browser `localStorage`.

```razor
<ejs-ribbon id="ribbon" enablePersistence=true>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

> The ribbon uses the `id` attribute as the storage key. Ensure the ribbon `id` is unique and stable so persisted state is not shared between different ribbon instances.

## Troubleshooting Setup Issues

### Ribbon Not Rendering

**Check:**
1. Tag helpers registered: `@addTagHelper *, Syncfusion.EJ2` in _ViewImports.cshtml
2. License key registered: `SyncfusionLicenseProvider.RegisterLicense()` in Program.cs
3. CSS file loaded: Check browser DevTools → Network for CSS file
4. Script Manager included: `<ejs-scripts></ejs-scripts>` in _Layout.cshtml

### Icons Not Showing

**Verify:**
- CSS file loaded (includes icon fonts)
- Icon class format: `iconCss="e-icons e-cut"` (include both `e-icons` AND `e-{icon-name}`)
- Check available icons in Syncfusion documentation

---
