# Getting Started with HeatMap

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Namespace Configuration](#namespace-configuration)
- [Script References](#script-references)
- [Creating First HeatMap](#creating-first-heatmap)
- [Minimal Working Example](#minimal-working-example)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before creating a HeatMap, ensure you have:
- Visual Studio 2015 or later
- .NET Framework 4.5 or higher
- ASP.NET MVC 4 or 5
- Modern browser with JavaScript enabled

## Installation

### Via NuGet Package Manager

```powershell
Install-Package Syncfusion.EJ2.MVC5
```

Or search for "Syncfusion.EJ2.MVC5" in NuGet Package Manager UI.

### Package Contents

The NuGet package includes:
- HeatMap control assembly
- Script libraries (JavaScript files)
- CSS stylesheets
- Documentation and samples

### Verify Installation

After installation, verify the package in your `Web.config`:

```xml
<package id="Syncfusion.EJ2.MVC5" version="X.X.X.X" targetFramework="net45" />
```

## Project Setup

### 1. Add Required Assembly References

Add the Syncfusion assembly reference in your `Web.config` (in Views folder):

```xml
<configuration>
  <appSettings>
    <add key="UnobtrusiveJavaScriptEnabled" value="true" />
  </appSettings>
  <system.web>
    <compilation>
      <assemblies>
        <add assembly="Syncfusion.EJ2, Version=X.X.X.X, Culture=neutral, PublicKeyToken=3d67ed361f57e44a" />
      </assemblies>
    </compilation>
    <httpModules>
      <add name="Syncfusion.JavaScript.HttpModule" type="Syncfusion.JavaScript.HttpModule" />
    </httpModules>
  </system.web>
</configuration>
```

### 2. Configure Layouts

Add required scripts and stylesheets to your layout file (`_Layout.cshtml`):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>HeatMap Application</title>
    
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material.css" />
</head>
<body>
    @RenderBody()

    <!-- jQuery Library -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2-layouts.min.js"></script>

    <!-- Scripts -->
    @RenderSection("scripts", required: false)
</body>
</html>
```

## Namespace Configuration

### Add Namespace to Controller

```csharp
using Syncfusion.EJ2;
using Syncfusion.EJ2.HeatMap;
```

### Add Using Statement to View

In your `.cshtml` view files, add at the top:

```csharp
@using Syncfusion.EJ2
@using Syncfusion.EJ2.HeatMap
```

## Script References

### Local Script Setup

If using local scripts instead of CDN, add to your View:

```html
<!-- Syncfusion CSS -->
<link rel="stylesheet" href="~/Content/ej2/material.css" />

<!-- jQuery -->
<script src="~/Scripts/jquery-3.6.0.min.js"></script>

<!-- Syncfusion JS -->
<script src="~/Scripts/ej2/ej2.min.js"></script>
<script src="~/Scripts/ej2/ej2-layouts.min.js"></script>
```

### CDN Script Setup

For CDN delivery without downloads:

```html
<!-- Material Theme CSS -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material.css" />

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Syncfusion HeatMap Script -->
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

## Creating First HeatMap

### Step 1: Prepare Your Data

In your Controller:

```csharp
public ActionResult Index()
{
    List<List<double>> data = new List<List<double>>
    {
        new List<double> { 36, 162, 36, 34 },
        new List<double> { 52, 60, 34, 56 },
        new List<double> { 33, 34, 52, 41 },
        new List<double> { 41, 32, 35, 51 }
    };

    return View(data);
}
```

### Step 2: Create the HeatMap in View

```csharp
@using Syncfusion.EJ2.HeatMap

@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "USA", "GER", "IND", "ITA" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "2016", "2017", "2018", "2019" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource((IEnumerable<object>)Model)
    .Title(title => { title.Text("Annual Product Sales"); })
    .Render()
```

### Step 3: Add HTML Container

In your view, provide a container for the HeatMap:

```html
<div id="container"></div>
```

### Step 4: Run the Application

Press F5 to run the application. The HeatMap will render with:
- Color-coded cells representing data values
- X-axis labels showing countries
- Y-axis labels showing years
- Default gradient color scheme

## Minimal Working Example

Complete minimal example with all necessary components:

**Controller (HomeController.cs):**

```csharp
using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.HeatMap;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        List<List<double>> heatmapData = new List<List<double>>
        {
            new List<double> { 100, 150, 120, 140 },
            new List<double> { 110, 160, 130, 150 },
            new List<double> { 120, 170, 140, 160 },
            new List<double> { 130, 180, 150, 170 }
        };

        return View(heatmapData);
    }
}
```

**View (Index.cshtml):**

```csharp
@using Syncfusion.EJ2.HeatMap

@{
    ViewBag.Title = "HeatMap Getting Started";
}

<div id="container" style="width: 100%; height: 400px;"></div>

@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "Product A", "Product B", "Product C", "Product D" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Q1", "Q2", "Q3", "Q4" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource((IEnumerable<object>)Model)
    .Title(title => { title.Text("Quarterly Sales Report"); })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Bottom);
    })
    .Render()
```

## Troubleshooting

### HeatMap Not Rendering

**Issue:** HeatMap container appears empty or not visible.

**Solutions:**
1. Verify container div has explicit width and height:
   ```html
   <div id="container" style="width: 100%; height: 400px;"></div>
   ```

2. Check that all scripts are loaded:
   - Open browser DevTools (F12)
   - Check Console for JavaScript errors
   - Verify ej2.min.js is loaded in Resources

3. Verify jQuery is loaded before Syncfusion scripts

### NuGet Package Not Found

**Issue:** Package Manager cannot find Syncfusion.EJ2.MVC5.

**Solutions:**
1. Configure NuGet package source
2. Update NuGet Package Manager
3. Enable Syncfusion package source in Visual Studio

### Script Errors

**Issue:** "EJ is not defined" or similar JavaScript errors.

**Solutions:**
1. Ensure Syncfusion script is referenced after jQuery
2. Check script paths are correct
3. Verify CDN URLs are accessible

### Data Not Displaying

**Issue:** HeatMap renders but no data visible.

**Solutions:**
1. Check data is passed correctly to DataSource
2. Verify axis labels match data dimensions
3. Ensure data values are numeric

### Performance Issues

**Issue:** HeatMap rendering is slow with large datasets.

**Solutions:**
1. Use Canvas rendering mode for large datasets:
   ```csharp
   .RenderingMode(Syncfusion.EJ2.HeatMap.RenderingMode.Canvas)
   ```

2. Reduce number of axis labels
3. Disable tooltips if not needed

Getting started with HeatMap requires basic setup of NuGet package, script references, and data configuration. Once configured, the control provides powerful two-dimensional data visualization capabilities.
