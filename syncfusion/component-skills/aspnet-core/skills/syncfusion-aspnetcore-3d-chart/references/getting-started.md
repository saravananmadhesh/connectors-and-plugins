# Getting Started with Syncfusion 3D Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Install NuGet Package](#step-1-install-nuget-package)
  - [Step 2: Verify Dependencies](#step-2-verify-dependencies)
- [Project Setup](#project-setup)
  - [Step 1: Register Tag Helper](#step-1-register-tag-helper)
  - [Step 2: Add Script References](#step-2-add-script-references)
  - [Step 3: Add Script Manager](#step-3-add-script-manager)
- [Adding Chart Control](#adding-chart-control)
  - [Create PageModel Data](#create-pagemodel-data)
- [Basic Rendering](#basic-rendering)
  - [Add Chart to Razor Page](#add-chart-to-razor-page)
  - [Understanding the Markup](#understanding-the-markup)
- [Running the Application](#running-the-application)
  - [Step 1: Build and Run](#step-1-build-and-run)
  - [Step 2: Verify Rendering](#step-2-verify-rendering)
  - [Step 3: Common Issues](#step-3-common-issues)
- [Next Steps](#next-steps)

## Prerequisites

Before implementing the Syncfusion 3D Chart, ensure your development environment meets these requirements:

**System Requirements:**
- .NET Core 6.0 or higher
- Visual Studio 2019 or later (or VS Code with .NET tools)
- A web browser to view the result

**Dependencies:**
- `Syncfusion.EJ2.AspNet.Core` NuGet package (latest version)
- `Newtonsoft.Json` (dependency)
- `Syncfusion.Licensing` (for license key validation)

## Installation

### Step 1: Install NuGet Package

Open NuGet Package Manager in Visual Studio:
1. Go to **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Click **Install**

Alternatively, use Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.3
```

This package includes all Syncfusion ASP.NET Core controls, including the 3D Chart.

### Step 2: Verify Dependencies

The NuGet package automatically installs required dependencies:
- Newtonsoft.Json (for JSON serialization)
- Syncfusion.Licensing (for license validation)

Verify in `packages.config` or `.csproj` that these packages are present.

## Project Setup

### Step 1: Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` (or `Views/Shared/_ViewImports.cshtml` for MVC):

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This registers all Syncfusion tag helpers in your project views.

### Step 2: Add Script References

Open `~/Pages/Shared/_Layout.cshtml` and add Syncfusion script in the `<head>` section:

```cshtml
<head>
    <!-- Other head content -->
    
    <!-- Syncfusion ASP.NET Core Chart script -->
    <script src="https://cdn.syncfusion.com/ej2/33.2.3/dist/ej2.min.js"></script>
</head>
```

**Note:** Replace `33.2.3` with your installed Syncfusion version. Check in your `.csproj` or NuGet package manager for the exact version.

### Step 3: Add Script Manager

At the end of `<body>` in `_Layout.cshtml`, register the Syncfusion script manager:

```cshtml
<body>
    <!-- Page content -->
    
    <!-- Syncfusion Script Manager - required for all controls -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` tag helper initializes Syncfusion script resources and must be placed after all Syncfusion control declarations.

## Adding Chart Control

### Create PageModel Data

Update your PageModel (for example, `Pages/Index.cshtml.cs`) or your MVC controller if you are using MVC.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public List<ChartDataPoint> ChartData { get; set; }

    public void OnGet()
    {
        ChartData = new List<ChartDataPoint>
        {
            new ChartDataPoint { Month = "January", Sales = 35, Expenses = 20 },
            new ChartDataPoint { Month = "February", Sales = 28, Expenses = 18 },
            new ChartDataPoint { Month = "March", Sales = 34, Expenses = 22 },
            new ChartDataPoint { Month = "April", Sales = 32, Expenses = 25 },
            new ChartDataPoint { Month = "May", Sales = 40, Expenses = 28 },
            new ChartDataPoint { Month = "June", Sales = 32, Expenses = 20 }
        };
    }
}

public class ChartDataPoint
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public double Expenses { get; set; }
}
```

## Basic Rendering

### Add Chart to Razor Page

Add the 3D Chart control to `~/Pages/Index.cshtml`:

```cshtml
<div id="chartContainer">
    <ejs-chart3d id="container" 
                 title="Sales and Expenses" 
                 enableSideBySidePlacement="true" enableRotation="true" rotation="7" tilt="10" depth="100">
        <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" 
                labelPlacement="@Syncfusion.EJ2.Charts.LabelPlacement.BetweenTicks" labelRotation="-45">
        </e-chart3d-primaryxaxis>
        <e-chart3d-series-collection>
            <!-- Sales Series -->
            <e-chart3d-series dataSource="@Model.ChartData" 
                              xName="Month" 
                              yName="Sales" 
                              name="Sales"
                              type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            </e-chart3d-series>
            
            <!-- Expenses Series -->
            <e-chart3d-series dataSource="@Model.ChartData" 
                              xName="Month" 
                              yName="Expenses" 
                              name="Expenses"
                              type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            </e-chart3d-series>
        </e-chart3d-series-collection>
        
        <!-- Legend Configuration -->
        <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom"></e-chart3d-legendsettings>
        
        <!-- Tooltip Configuration -->
        <e-chart3d-tooltipsettings enable="true"></e-chart3d-tooltipsettings>
        
    </ejs-chart3d>
</div>

<style>
    #container {
        height: 450px;
        width: 100%;
    }
</style>
```

### Understanding the Markup

| Element | Purpose |
|---------|---------|
| `<ejs-chart3d>` | Root chart container; `id` must be unique |
| `title` | Chart title displayed at top |
| `<e-chart3d-series-collection>` | Container for all data series |
| `<e-chart3d-series>` | Individual series (one per data set) |
| `dataSource` | Data array; use `@Model.PropertyName` for Razor binding |
| `xName` | Property name from data for X-axis values |
| `yName` | Property name from data for Y-axis values |
| `name` | Series display name for legend |
| `type` | Chart type: Column, Bar, StackingColumn, etc. |
| `<e-chart3d-legendsettings>` | Legend configuration |
| `<e-chart3d-tooltipsettings>` | Tooltip behavior |

**Note:** The `tilt` property controls the vertical viewing angle of the 3D Chart. Adjusting this value changes how much the chart appears tilted, which helps create a stronger 3D perspective

## Running the Application

### Step 1: Build and Run

1. In Visual Studio, press **Ctrl+F5** (without debugging) or **F5** (with debugging)
2. Or use terminal: `dotnet run`

### Step 2: Verify Rendering

- The 3D chart should render with two column series (Sales and Expenses)
- Legend appears at the bottom showing both series
- Hover over data points to see tooltips

### Step 3: Common Issues

**Issue: Chart not rendering**
- Verify `<ejs-scripts>` is present in `_Layout.cshtml`
- Check browser console for JavaScript errors
- Ensure `ScriptManager` is registered

**Issue: Data not showing**
- Verify `dataSource` property binding syntax: `@Model.PropertyName`
- Check that `xName` and `yName` match your model properties (case-sensitive)
- Confirm data is populated in controller action

**Issue: 3D not rendering (appears 2D)**
- Verify you are using the `<ejs-chart3d>` component
- Check browser console for rendering or JavaScript errors
- Confirm 3D properties such as `enableRotation`, `rotation`, `tilt`, and `depth` are configured correctly

## Next Steps

Now that you have a basic chart running:
1. **Data Binding:** Learn about remote data binding in `data-binding-series.md`
2. **Chart Types:** Explore different chart types in `chart-types-series.md`
3. **Customization:** Style and customize in `styling-appearance.md`
4. **Interactions:** Add selection and tooltips in `user-interactions.md`

## Complete Minimal Example

Here's a complete working example in one file:

**Pages/Index.cshtml:**
```cshtml
@page
@model IndexModel

<div id="chartContainer">
    <ejs-chart3d id="container" title="Monthly Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
        <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" 
                labelPlacement="@Syncfusion.EJ2.Charts.LabelPlacement.BetweenTicks" labelRotation="-45">
        </e-chart3d-primaryxaxis>
        <e-chart3d-series-collection>
            <e-chart3d-series dataSource="@Model.ChartData" 
                              xName="Month" 
                              yName="Sales" 
                              type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            </e-chart3d-series>
        </e-chart3d-series-collection>
        <e-chart3d-legendsettings position="Bottom"></e-chart3d-legendsettings>
        <e-chart3d-tooltipsettings enable="true"></e-chart3d-tooltipsettings>
    </ejs-chart3d>
</div>

<style>
    #container { height: 420px; width: 100%; }
</style>
```

**Pages/Index.cshtml.cs:**
```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public List<ChartData> ChartData { get; set; }

    public void OnGet()
    {
        ChartData = new List<ChartData>
        {
            new ChartData { Month = "Jan", Sales = 35 },
            new ChartData { Month = "Feb", Sales = 28 },
            new ChartData { Month = "Mar", Sales = 34 }
        };
    }
}

public class ChartData
{
    public string Month { get; set; }
    public double Sales { get; set; }
}
```

This minimal example creates a working 3D column chart with three data points and is ready to run immediately.
