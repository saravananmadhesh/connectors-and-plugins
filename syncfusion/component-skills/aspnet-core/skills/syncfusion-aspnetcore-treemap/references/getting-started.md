# Getting Started with Syncfusion TreeMap in ASP.NET Core

This guide covers installation, package setup, layout configuration, strongly typed data binding, and creating your first interactive TreeMap visualization in an ASP.NET Core Razor Pages application.

## Table of Contents
- [Installation and Setup](#installation-and-setup)
  - [Step 1 Add NuGet Package](#step-1-add-nuget-package)
  - [Step 2 Add TagHelper Reference](#step-2-add-taghelper-reference)
  - [Step 3 Add Script Resources](#step-3-add-script-resources)
  - [Step 4 Register Script Manager](#step-4-register-script-manager)
- [Creating Your First TreeMap](#creating-your-first-treemap)
  - [Basic TreeMap with Data Binding](#basic-treemap-with-data-binding)
- [Understanding Key Configuration](#understanding-key-configuration)
  - [weightValuePath Property](#weightvaluepath-property)
  - [labelPath Property](#labelpath-property)
  - [dataSource Property](#datasource-property)
- [Common Initial Configuration](#common-initial-configuration)
  - [Adding Layout Control](#adding-layout-control)
  - [Customizing Leaf Items](#customizing-leaf-items)
  - [Adding a Border](#adding-a-border)
- [Rendering Hierarchical Data](#rendering-hierarchical-data)
- [Verifying Your Setup](#verifying-your-setup)

This guide covers installation, package setup, and creating your first interactive TreeMap visualization.

## Installation and Setup

### Step 1 Add NuGet Package

In Visual Studio, open **NuGet Package Manager** and install:

```text
Syncfusion.EJ2.AspNet.Core
```

You can also install it through the Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

If your project requires license registration, register the Syncfusion license in `Program.cs` before the application starts serving requests.

```csharp
using Syncfusion.Licensing;

SyncfusionLicenseProvider.RegisterLicense("YOUR LICENSE KEY");
```

### Step 2 Add TagHelper Reference

Open `Pages/_ViewImports.cshtml` and add the Syncfusion TagHelper reference.

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This makes Syncfusion ASP.NET Core TagHelpers available throughout Razor Pages.

### Step 3 Add Script Resources

In `Pages/Shared/_Layout.cshtml`, add the required Syncfusion CSS and script resources in the `<head>` section.

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

If your project uses a specific Syncfusion version, use the matching CDN version for both CSS and script files.

### Step 4 Register Script Manager

At the end of the `<body>` section in `Pages/Shared/_Layout.cshtml`, add the Syncfusion script manager.

```cshtml
<body>
    @RenderBody()

    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` tag renders the required initialization scripts for Syncfusion controls on the page.

---

## Creating Your First TreeMap

### Basic TreeMap with Data Binding

Create a strongly typed Razor Pages example using `Index.cshtml.cs` and `Index.cshtml`.

**Pages/Index.cshtml.cs**

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<TreeMapData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<TreeMapData>
        {
            new TreeMapData { Name = "Laptops", Category = "Electronics", Sales = 5000, Revenue = 150000 },
            new TreeMapData { Name = "Phones", Category = "Electronics", Sales = 8000, Revenue = 200000 },
            new TreeMapData { Name = "Chairs", Category = "Furniture", Sales = 3000, Revenue = 60000 },
            new TreeMapData { Name = "Desks", Category = "Furniture", Sales = 4000, Revenue = 120000 }
        };
    }

    public class TreeMapData
    {
        public string Name { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public double Sales { get; set; }

        public double Revenue { get; set; }
    }
}
```

**Pages/Index.cshtml**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

This creates a basic TreeMap where:

- Rectangle size represents the `Sales` value.
- Rectangle labels display the `Name` field.
- The TreeMap receives data from the strongly typed `Model.TreeMapData` property.

---

## Understanding Key Configuration

### weightValuePath Property

The `weightValuePath` property specifies which numeric field determines rectangle size.

```cshtml
<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales">
</ejs-treemap>
```

Key points:

- The field must exist in the data source.
- The field should contain numeric values.
- Larger values render larger rectangles.
- Avoid null, negative, or non-numeric values for this field.

### labelPath Property

The `labelPath` property specifies which field is displayed as the leaf item label.

```cshtml
<e-treemap-leafitemsettings labelPath="Name">
</e-treemap-leafitemsettings>
```

Key points:

- `labelPath="Name"` displays the `Name` field.
- Labels are shown by default when `showLabels` is enabled.
- If rectangles are too small, labels may be trimmed, wrapped, or hidden depending on label settings.

### dataSource Property

The `dataSource` property binds the TreeMap to a collection.

```cshtml
<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales">
</ejs-treemap>
```

Recommended Razor Pages pattern:

- Define a public property in `Index.cshtml.cs`.
- Populate it in `OnGet()`.
- Bind it in the view using `Model.PropertyName`.

---

## Common Initial Configuration

### Adding Layout Control

Control how rectangles are arranged using `layoutType`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Available layout values include:

- `Squarified` - Maintains balanced rectangle aspect ratios.
- `SliceAndDiceVertical` - Arranges items using vertical slicing.
- `SliceAndDiceHorizontal` - Arranges items using horizontal slicing.
- `SliceAndDiceAuto` - Uses automatic slice-and-dice direction.

### Customizing Leaf Items

Use `leafItemSettings` to configure labels, gaps, and item display behavior.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name"
                                    showLabels="true"
                                    gap="2"
                                    interSectAction="TrimSectAction` - Controls how labels behave when they exceed item bounds.

### Adding a Border

Use the nested border tag inside `leafItemSettings` to add borders to leaf items.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
            <e-leafitemsettings-border color='@("#CCCCCC")'
                                       width="1">
            </e-leafitemsettings-border>
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

This adds a light gray border around each TreeMap leaf item.

---

## Rendering Hierarchical Data

For grouped or hierarchical visualization, use the `levels` collection and configure `groupPath`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}"
                             fill='@("#336699")'>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

The `groupPath="Category"` configuration groups items by the `Category` field. Each category becomes a group rectangle that contains its child leaf items.

---

## Verifying Your Setup

After implementing the TreeMap:

1. Run the application.
2. Confirm that the TreeMap renders inside a visible container.
3. Open the browser console and check for JavaScript errors.
4. Confirm that `_ViewImports.cshtml` includes the Syncfusion TagHelper reference.
5. Confirm that `_Layout.cshtml` includes Syncfusion script resources.
6. Confirm that `_Layout.cshtml` includes `<ejs-scripts></ejs-scripts>`.
7. Confirm that `weightValuePath` matches a numeric field in the data source.
8. Confirm that the TreeMap container has a visible height.

If the TreeMap does not render, verify the following:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

```cshtml
<ejs-scripts></ejs-scripts>
```

```cshtml
<div style="height: 500px; width: 100%;">
```

Also confirm that your data field names match exactly:

```cshtml
weightValuePath="Sales"
labelPath="Name"
```

These must match the C# model properties:

```csharp
public string Name { get; set; } = string.Empty;
public double Sales { get; set; }
```

---

