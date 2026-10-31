# Getting Started with Syncfusion Bullet Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Create ASP.NET Core Project](#create-aspnet-core-project)
  - [Option 1: Microsoft Templates](#option-1-microsoft-templates)
  - [Option 2: Syncfusion Extension](#option-2-syncfusion-extension)
- [Install NuGet Package](#install-nuget-package)
  - [Using NuGet Package Manager](#using-nuget-package-manager)
  - [Using Package Manager Console](#using-package-manager-console)
  - [Package Dependencies](#package-dependencies)
- [Import TagHelper](#import-taghelper)
- [Add Script Resources](#add-script-resources)
- [Register Script Manager](#register-script-manager)
- [Add Bullet Chart Control](#add-bullet-chart-control)
- [Bind Data](#bind-data)
- [Add Titles](#add-titles)
- [Add Ranges](#add-ranges)
- [Add Tooltips](#add-tooltips)
- [Lifecycle Events](#lifecycle-events)
- [Complete Example](#complete-example)

---

## Prerequisites

Before getting started, ensure you have:
- ASP.NET Core 3.1 or later installed
- Visual Studio 2019 or later
- Basic knowledge of ASP.NET Core and Razor Pages

Refer to the [System requirements for ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements) for detailed information.

---

## Create ASP.NET Core Project

Create an ASP.NET Core web application with Razor Pages using one of these approaches:

### Option 1: Microsoft Templates
Follow the [official Microsoft tutorial](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-8.0&tabs=visual-studio#create-a-razor-pages-web-app) to create a new project.

### Option 2: Syncfusion Extension
Use the Syncfusion Visual Studio Extension to create a project with pre-configured Syncfusion controls:
- [Create a Project using Syncfusion ASP.NET Core Extension](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project)

---

## Install NuGet Package

Add the Syncfusion NuGet package to your application:

### Using NuGet Package Manager
1. Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Click Install

### Using Package Manager Console
```csharp
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

### Package Dependencies
The `Syncfusion.EJ2.AspNet.Core` package has dependencies on:
- **Newtonsoft.Json** - For JSON serialization
- **Syncfusion.Licensing** - For license key validation

All dependencies are automatically resolved during installation.

---

## Import TagHelper

Open `~/Pages/_ViewImports.cshtml` and add the Syncfusion TagHelper:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This import enables you to use Syncfusion components in your Razor pages with the `<ejs-*>` syntax.

---

## Add Script Resources

Add Syncfusion script references in the `<head>` section of `~/Pages/Shared/_Layout.cshtml`:

```cshtml
<head>
    <!-- Existing head content -->
    ...
    
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Note:** Refer to [Adding Script Reference](https://ej2.syncfusion.com/aspnetcore/documentation/common/adding-script-references) for alternative approaches, including local installation and NuGet package references.

---

## Register Script Manager

Register the Syncfusion script manager at the end of the `<body>` in `~/Pages/Shared/_Layout.cshtml`:

```cshtml
<body>
    <!-- Page content -->
    ...
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The script manager initializes all Syncfusion components on the page.

---

## Add Bullet Chart Control

Add the Bullet Chart tag helper to `~/Pages/Index.cshtml`:

```cshtml
<ejs-bulletchart id="container"></ejs-bulletchart>
```

Run your application (Ctrl+F5) and the Bullet Chart will render in the default web browser.

---

## Bind Data

To display actual and target values, bind data and map the fields:

**Note:** When using multiple records in a Bullet Chart, define a category field such as `Category` and bind it using `categoryField`. This ensures that each bullet row has a meaningful label and makes the chart easier to understand.

```csharp
// In your CSHTML.cs (Page Model)
public class IndexModel : PageModel
{
    public List<BulletChartData> ChartData { get; set; }
    
    public void OnGet()
    {
        ChartData = new List<BulletChartData>
        {
            new BulletChartData { Value = 270, Target = 250, Category = "Q1" },
            new BulletChartData { Value = 285, Target = 290, Category = "Q2" },
            new BulletChartData { Value = 200, Target = 210, Category = "Q3" }
        };
    }
}

public class BulletChartData
{
    public double Value { get; set; }
    public double Target { get; set; }
    public string Category { get; set; } 
}
```

In your Razor page, bind the data:

```cshtml
<ejs-bulletchart id="container" 
    categoryField="Category"
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    minimum="0"
    maximum="300"
    interval="50">
</ejs-bulletchart>
```

**Properties:**
- `categoryField` - Property name for the category label of each bullet row
- `dataSource` - Collection of data to display
- `valueField` - Property name for actual values
- `targetField` - Property name for target/comparative values
- `minimum` - Minimum value of the Bullet Chart scale
- `maximum` - Maximum value of the Bullet Chart scale
- `interval` - Interval between axis labels and major ticks
- `query` - Optional query string to filter the data source

---

## Add Titles

Add a title to provide context about the chart:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    minimum="0"
    maximum="300"
    interval="50"
    title="Sales Performance">
</ejs-bulletchart>
```

You can also add a subtitle:

```cshtml
<ejs-bulletchart id="container" 
    title="Sales Performance"
    subtitle="Q4 2024 Results">
</ejs-bulletchart>
```

**Title/Subtitle Properties:**
- `title` - Main chart title (`string`, default `""`)
- `subtitle` - Secondary descriptive text below the title (`string`, default `""`)
- `titlePosition` - Position of the title: `Top` (default), `Bottom`, `Left`, `Right` (`TextPosition` enum)
- `titleStyle` - Font and color settings for the title (`BulletChartBulletLabelStyle`)
- `subtitleStyle` - Font and color settings for the subtitle (`BulletChartBulletLabelStyle`)

---

## Add Ranges

Define performance ranges (poor, satisfactory, good) for visual context:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    title="Sales Performance"
    minimum="0"
    maximum="300"
    interval="50">
    <e-bullet-range-collection>
        <e-bullet-range end="150" color="lightgray"></e-bullet-range>
        <e-bullet-range end="250" color="lightblue"></e-bullet-range>
        <e-bullet-range end="300" color="lightgreen"></e-bullet-range>
    </e-bullet-range-collection>
</ejs-bulletchart>
```

**Range Properties:**
- `end` - Ending value of the range
- `color` - Background color for the range

---

## Add Tooltips

Enable hover tooltips to display additional information:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    minimum="0"
    maximum="300"
    interval="50">
    <e-bulletchart-tooltipsettings enable="true"></e-bulletchart-tooltipsettings>
</ejs-bulletchart>
```

By default, tooltips display the actual and target values on hover. You can customize the tooltip template and styling for advanced scenarios.

**Tooltip Tag:** `<e-bulletchart-tooltipsettings>` (maps to `BulletChartBulletTooltipSettings`)

Use the `tooltipRender` event to intercept tooltip rendering:

```cshtml
<ejs-bulletchart id="container" tooltipRender="onTooltipRender">
    <e-bulletchart-tooltipsettings enable="true"></e-bulletchart-tooltipsettings>
</ejs-bulletchart>
```

---

## Lifecycle Events

Use these events to hook into the bullet chart lifecycle:

```html
<ejs-bulletchart id="container" 
    load="onLoad" 
    loaded="onLoaded"
    tooltipRender="onTooltipRender"
    legendRender="onLegendRender"
    beforePrint="onBeforePrint"
    bulletChartMouseClick="onMouseClick">
</ejs-bulletchart>

<script>
    function onLoad(args) { /* fires before chart loads */ }
    function onLoaded(args) { /* fires after chart renders */ }
    function onTooltipRender(args) { /* fires before tooltip renders */ }
    function onLegendRender(args) { /* fires before legend renders */ }
    function onBeforePrint(args) { /* fires before print */ }
    function onMouseClick(args) { /* fires on chart click */ }
</script>
```

| Event | API Property | Description |
|-------|-------------|-------------|
| `load` | `Load` | Triggers before bullet chart loads |
| `loaded` | `Loaded` | Triggers after bullet chart renders |
| `tooltipRender` | `TooltipRender` | Triggers before tooltip is rendered |
| `legendRender` | `LegendRender` | Triggers before legend is rendered |
| `beforePrint` | `BeforePrint` | Triggers before print starts |
| `bulletChartMouseClick` | `BulletChartMouseClick` | Triggers on chart click |

---

## Complete Example

Here's a minimal working example that combines all steps:

```csharp
// CSHTML.cs
public class IndexModel : PageModel
{
    public List<BulletChartData> ChartData { get; set; }
    
    public void OnGet()
    {
        ChartData = new List<BulletChartData>
        {
            new BulletChartData { Value = 270, Target = 250 }
        };
    }
}

public class BulletChartData
{
    public double Value { get; set; }
    public double Target { get; set; }
}
```

```cshtml
<!-- Index.cshtml -->
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    minimum="0"
    maximum="300"
    interval="50"
    title="Sales vs Target">
    <e-bullet-range-collection>
        <e-bullet-range end="150" color="#ff6b6b"></e-bullet-range>
        <e-bullet-range end="250" color="#ffd43b"></e-bullet-range>
        <e-bullet-range end="300" color="#69db7c"></e-bullet-range>
    </e-bullet-range-collection>
    <e-bulletchart-tooltipsettings enable="true"></e-bulletchart-tooltipsettings>
</ejs-bulletchart>
```

---
