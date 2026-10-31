# Getting Started with Syncfusion HeatMap Chart

## Table of Contents
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install NuGet Package](#install-nuget-package)
- [Project Configuration](#project-configuration)
  - [Register TagHelper](#register-taghelper)
  - [Add Stylesheet and Scripts](#add-stylesheet-and-scripts)
  - [Register Script Manager](#register-script-manager)
- [Basic HeatMap Implementation](#basic-heatmap-implementation)
  - [Minimal HeatMap Example](#minimal-heatmap-example)
- [First Render with Sample Data](#first-render-with-sample-data)
  - [Complete Working Example](#complete-working-example)
- [Adding Titles and Axis Labels](#adding-titles-and-axis-labels)
  - [Add HeatMap Title](#add-heatmap-title)
  - [Configure Axes](#configure-axes)
  - [Add Data Labels](#add-data-labels)
- [Common Setup Patterns](#common-setup-patterns)
  - [Pattern 1: Responsive HeatMap](#pattern-1-responsive-heatmap)
  - [Pattern 2: HeatMap with Legend](#pattern-2-heatmap-with-legend)
  - [Pattern 3: Loading Data from Database](#pattern-3-loading-data-from-database)
  - [Pattern 4: Minimal Setup with Auto-Generated Data](#pattern-4-minimal-setup-with-auto-generated-data)
- [Troubleshooting](#troubleshooting)
  - [HeatMap Not Rendering](#heatmap-not-rendering)
  - [Styles Not Applied](#styles-not-applied)
  - [Data Not Displaying](#data-not-displaying)

## Installation

### Prerequisites

Before adding the Syncfusion ASP.NET Core HeatMap Chart, ensure that the application has the following:

- .NET 6.0 or higher.
- Visual Studio 2019 or later, Visual Studio 2022, or Visual Studio Code with the C# extension.
- An ASP.NET Core Razor Pages application.
- A modern browser such as Edge, Chrome, Firefox, or Safari.
- A valid Syncfusion license registration in the application startup flow if required by your application setup.

### Install NuGet Package

Install the Syncfusion ASP.NET Core package in the project.

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

If a specific version is required by your application, install that exact version.

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.3
```

After installation, rebuild the application.

```powershell
dotnet restore
dotnet build
```

## Project Configuration

### Register TagHelper

Open `Pages/_ViewImports.cshtml` and register the Syncfusion Tag Helper.

```cshtml
@using YourApplication
@namespace YourApplication.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

Replace `YourApplication` with the actual project namespace.

For example, if the project namespace is `AspNetCoreWebApp`, use:

```cshtml
@using AspNetCoreWebApp
@namespace AspNetCoreWebApp.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

### Add Stylesheet and Scripts

Open `Pages/Shared/_Layout.cshtml` and add the Syncfusion theme stylesheet and script reference inside the `head` tag.

```html
    ...
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

Use the same CDN version as the installed NuGet package version whenever possible.

### Register Script Manager

Add the Syncfusion script manager before the closing `body` tag in `Pages/Shared/_Layout.cshtml`.

```cshtml
<ejs-scripts></ejs-scripts>
```

The script manager should be placed after the page content so that the required component initialization scripts are rendered correctly.

## Basic HeatMap Implementation

### Minimal HeatMap Example

The following example uses both `Pages/Index.cshtml` and `Pages/Index.cshtml.cs`.

This minimal example uses JSON cell binding with `e-heatmap-datasourcesettings`. This is the recommended approach for Razor Pages because it keeps the data model clear and avoids relying on `ViewBag`.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="4"
        interval="1">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="4"
        interval="1">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<HeatMapDataPoint> DataSource { get; set; } = new List<HeatMapDataPoint>();

        public void OnGet()
        {
            DataSource = new List<HeatMapDataPoint>();

            for (int x = 0; x <= 4; x++)
            {
                for (int y = 0; y <= 4; y++)
                {
                    DataSource.Add(new HeatMapDataPoint
                    {
                        XValue = x,
                        YValue = y,
                        Value = (x + 1) * (y + 2) * 5
                    });
                }
            }
        }
    }

    public class HeatMapDataPoint
    {
        public double XValue { get; set; }

        public double YValue { get; set; }

        public double Value { get; set; }
    }
}
```

## First Render with Sample Data

### Complete Working Example

The following complete example renders a sales HeatMap using category axes, title, labels, palette, legend, and tooltip.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<h2>HeatMap Chart Demo</h2>

<ejs-heatmap
    id="heatmap"
    dataSource="@Model.SalesData"
    width="100%"
    height="500px"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-titlesettings
        text="Sales Performance by Month and Week"
        textAlign="Center"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.XAxisLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.YAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Week"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}"
        textStyle="@Model.CellTextStyle">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<SalesHeatMapData> SalesData { get; set; } = new List<SalesHeatMapData>();

        public string[] XAxisLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr", "May", "Jun"
        };

        public string[] YAxisLabels { get; set; } =
        {
            "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"
        };

        public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "Bold",
            Size = "16px",
            Color = "#222222"
        };

        public HeatMapFont CellTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "500",
            Size = "12px",
            Color = "#111111"
        };

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E3F2FD", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#64B5F6", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#0D47A1", Label = "High" }
        };

        public void OnGet()
        {
            SalesData = new List<SalesHeatMapData>();

            for (int monthIndex = 0; monthIndex < XAxisLabels.Length; monthIndex++)
            {
                for (int weekIndex = 0; weekIndex < YAxisLabels.Length; weekIndex++)
                {
                    SalesData.Add(new SalesHeatMapData
                    {
                        Month = XAxisLabels[monthIndex],
                        Week = YAxisLabels[weekIndex],
                        Sales = 20 + ((monthIndex + 1) * (weekIndex + 2) * 3) % 80
                    });
                }
            }
        }
    }

    public class SalesHeatMapData
    {
        public string Month { get; set; } = string.Empty;

        public string Week { get; set; } = string.Empty;

        public double Sales { get; set; }
    }
}
```

## Adding Titles and Axis Labels

### Add HeatMap Title

Use `e-heatmap-titlesettings` to add a title. For font styling, define `HeatMapFont` in `Index.cshtml.cs` and bind it using `textStyle`.

```cshtml
<e-heatmap-titlesettings
    text="Sales Performance by Month and Week"
    textAlign="Center"
    textStyle="@Model.TitleTextStyle">
</e-heatmap-titlesettings>
```

PageModel title style:

```csharp
public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
{
    FontFamily = "Segoe UI",
    FontWeight = "Bold",
    Size = "16px",
    Color = "#222222"
};
```

### Configure Axes

Use category axes when the values are labels such as months, weeks, regions, products, or departments.

```cshtml
<e-heatmap-xaxis
    valueType="Category"
    labels="@Model.XAxisLabels">
</e-heatmap-xaxis>

<e-heatmap-yaxis
    valueType="Category"
    labels="@Model.YAxisLabels">
</e-heatmap-yaxis>
```

PageModel labels:

```csharp
public string[] XAxisLabels { get; set; } =
{
    "Jan", "Feb", "Mar", "Apr", "May", "Jun"
};

public string[] YAxisLabels { get; set; } =
{
    "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"
};
```

### Add Data Labels

Use `showLabel="true"` inside `e-heatmap-cellsettings` to show values inside the HeatMap cells.

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    format="{value}"
    textStyle="@Model.CellTextStyle">
</e-heatmap-cellsettings>
```

For large datasets, set `showLabel="false"` to improve rendering performance.

```cshtml
<e-heatmap-cellsettings
    showLabel="false">
</e-heatmap-cellsettings>
```

## Common Setup Patterns

### Pattern 1: Responsive HeatMap

Use a wrapper container and set the HeatMap width to `100%`.

```cshtml
<div style="width: 100%; max-width: 1000px; margin: 0 auto;">
    <ejs-heatmap
        id="responsiveHeatmap"
        dataSource="@Model.SalesData"
        width="100%"
        height="600px"
        renderingMode="Auto">

        <e-heatmap-datasourcesettings
            isJsonData="true"
            adaptorType="Cell"
            xDataMapping="Month"
            yDataMapping="Week"
            valueMapping="Sales">
        </e-heatmap-datasourcesettings>

        <e-heatmap-cellsettings
            showLabel="true">
        </e-heatmap-cellsettings>
    </ejs-heatmap>
</div>
```

### Pattern 2: HeatMap with Legend

Use `e-heatmap-legendsettings` to display a legend for the color scale.

```cshtml
<ejs-heatmap
    id="legendHeatmap"
    dataSource="@Model.SalesData">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Week"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        alignment="Center"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

### Pattern 3: Loading Data from Database

When loading data from a database, keep the query in `Index.cshtml.cs` and expose a strongly typed property to the Razor page.

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace YourApplication.Pages
{
    public class HeatMapPageModel : PageModel
    {
        private readonly ApplicationDbContext context;

        public HeatMapPageModel(ApplicationDbContext context)
        {
            this.context = context;
        }

        public List<SalesHeatMapData> SalesData { get; set; } = new List<SalesHeatMapData>();

        public void OnGet()
        {
            SalesData = context.SalesData
                .Select(item => new SalesHeatMapData
                {
                    Month = item.Month,
                    Week = item.Week,
                    Sales = item.Sales
                })
                .ToList();
        }
    }

    public class SalesHeatMapData
    {
        public string Month { get; set; } = string.Empty;

        public string Week { get; set; } = string.Empty;

        public double Sales { get; set; }
    }
}
```

Razor binding:

```cshtml
<ejs-heatmap
    id="databaseHeatmap"
    dataSource="@Model.SalesData">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Week"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Pattern 4: Minimal Setup with Auto-Generated Data

For quick prototyping, generate deterministic data in the PageModel.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="prototypeHeatmap"
    dataSource="@Model.PrototypeData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="9"
        interval="1">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="9"
        interval="1">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public List<HeatMapDataPoint> PrototypeData { get; set; } = new List<HeatMapDataPoint>();

public void OnGet()
{
    PrototypeData = new List<HeatMapDataPoint>();

    for (int x = 0; x < 10; x++)
    {
        for (int y = 0; y < 10; y++)
        {
            PrototypeData.Add(new HeatMapDataPoint
            {
                XValue = x,
                YValue = y,
                Value = (x * y + x + y) % 100
            });
        }
    }
}
```

## Troubleshooting

### HeatMap Not Rendering

Issue:

- The container is empty.
- The HeatMap tag appears in the HTML, but the component is not initialized.
- No cells are visible.

Solutions:

1. Confirm that Syncfusion Tag Helpers are registered in `Pages/_ViewImports.cshtml`.

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

2. Confirm that the Syncfusion script manager is added before the closing `body` tag in `Pages/Shared/_Layout.cshtml`.

```cshtml
<ejs-scripts></ejs-scripts>
```

3. Confirm that Syncfusion CSS and JavaScript references are loaded in `_Layout.cshtml`.

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/33.2.3/dist/ej2.min.js"></script>
```

4. Verify that the `dataSource` property is not null or empty.

5. Check the browser console for JavaScript errors.

### Styles Not Applied

Issue:

- The control renders but looks unstyled.
- Theme colors are missing.
- Layout does not match the expected Syncfusion appearance.

Solutions:

1. Verify that the theme stylesheet URL is correct.

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/fluent.css" />
```

2. Verify that the CSS file loads successfully in the browser Network tab.

3. Ensure the CDN version and the installed NuGet version are aligned where possible.

4. Clear browser cache and reload the page.

5. Confirm that no custom CSS is overriding the HeatMap layout unexpectedly.

### Data Not Displaying

Issue:

- The HeatMap renders but no cells are displayed.
- Title or legend may appear, but data cells are missing.

Solutions:

1. Use `e-heatmap-datasourcesettings` for object collection binding.

```cshtml
<e-heatmap-datasourcesettings
    isJsonData="true"
    adaptorType="Cell"
    xDataMapping="XValue"
    yDataMapping="YValue"
    valueMapping="Value">
</e-heatmap-datasourcesettings>
```

2. Ensure the mapping names match the C# model property names exactly.

```csharp
public class HeatMapDataPoint
{
    public double XValue { get; set; }

    public double YValue { get; set; }

    public double Value { get; set; }
}
```

3. Ensure the axis `valueType` matches the data type.

```cshtml
<e-heatmap-xaxis valueType="Numeric"></e-heatmap-xaxis>
<e-heatmap-yaxis valueType="Numeric"></e-heatmap-yaxis>
```

4. If using category axes, ensure labels match the mapped values.

```csharp
public string[] XAxisLabels { get; set; } =
{
    "Jan", "Feb", "Mar"
};
```

5. Avoid using encoded tags such as `&lt;ejs-heatmap&gt;` in actual `.cshtml` files. Use real tags such as `<ejs-heatmap>`.
