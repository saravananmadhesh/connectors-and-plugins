# Getting Started with 3D Circular Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Namespace Configuration](#namespace-configuration)
- [Script Resources](#script-resources)
- [Creating Your First Chart](#creating-your-first-chart)
- [Running the Application](#running-the-application)

## Prerequisites

Before implementing the 3D Circular Chart control, ensure your environment meets these requirements:

- **Visual Studio**: 2015 or later
- **.NET Framework**: 4.5 or higher
- **ASP.NET MVC**: Version 5.0 or later
- **Browser Support**: Modern browsers (Chrome, Firefox, Edge, Safari)

## Installation

### Step 1: Create ASP.NET MVC Project

You can create a project using either Microsoft templates or Syncfusion extensions:

1. Open Visual Studio
2. Click **File → New → Project**
3. Select **ASP.NET Web Application (.NET Framework)**
4. Choose **MVC** template
5. Click **Create**

### Step 2: Install NuGet Package

The 3D Circular Chart is included in the Syncfusion.EJ2.MVC5 package:

1. Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
2. Search for `Syncfusion.EJ2.MVC5`
3. Click **Install**

**Package Manager Console Alternative:**

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 20.4.48
```

**Dependencies:** This package automatically installs:
- **Newtonsoft.Json** - For JSON serialization
- **Syncfusion.Licensing** - For license validation

> **Note:** Replace version number with your preferred Syncfusion version. Check [nuget.org](https://www.nuget.org/packages/Syncfusion.EJ2.MVC5) for the latest version.

## Namespace Configuration

### Add Namespace Reference

After installation, add the Syncfusion namespace to your views:

1. Open `~/Web.config` (in the Views folder)
2. Locate the `<namespaces>` element under `<host>`
3. Add this line:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

**Full context:**

```xml
<configuration>
    <system.web.webPages.razor>
        <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
        <pages>
            <namespaces>
                <add namespace="System.Web.Mvc" />
                <add namespace="System.Web.Mvc.Ajax" />
                <add namespace="System.Web.Mvc.Html" />
                <add namespace="System.Web.Routing" />
                <add namespace="Syncfusion.EJ2" />
            </namespaces>
        </pages>
    </system.web.webPages.razor>
</configuration>
```

## Script Resources

### Add CDN Script References

The 3D Circular Chart requires Syncfusion JavaScript libraries. Add these in your `_Layout.cshtml`:

1. Open `~/Views/Shared/_Layout.cshtml`
2. Add to the `<head>` section:

```html
<head>
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.48/material.css" />
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/20.4.48/dist/ej2.min.js"></script>
</head>
```

### Register Script Manager

Add the script manager at the end of the `<body>` tag:

```html
<body>
    @RenderBody()
    
    <!-- Syncfusion Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

**Why ScriptManager?** It initializes Syncfusion components and manages their lifecycle across pages.

## Creating Your First Chart

### Step 1: Create Controller Action

In `HomeController.cs`:

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        List<ChartData> data = new List<ChartData>
        {
            new ChartData { Browser = "Chrome", Users = 37 },
            new ChartData { Browser = "Firefox", Users = 23 },
            new ChartData { Browser = "Safari", Users = 18 },
            new ChartData { Browser = "Edge", Users = 15 },
            new ChartData { Browser = "Others", Users = 7 }
        };
        return View(data);
    }
}

public class ChartData
{
    public string Browser { get; set; }
    public double Users { get; set; }
}
```

### Step 2: Create View with Chart

In `~/Views/Home/Index.cshtml`:

```html
@model List<ChartData>

<div id="chart-container">
    @Html.EJS().CircularChart3D("container")
        .Series(series =>
        {
            series.DataSource((IEnumerable<object>)Model)
                .XName("Browser")
                .YName("Users")
                .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
                .Add();
        })
        .Title("Browser Market Share")
        .Legend(legend => 
            legend.Visible(true)
        )
        .Render()
</div>
```

### Step 3: Add Styling (Optional)

Add CSS to style the chart container:

```css
#container {
    width: 100%;
    max-width: 900px;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
}
```

## Running the Application

### Step 1: Build Solution

1. In Visual Studio, click **Build → Build Solution**
2. Ensure no compilation errors appear

### Step 2: Run Application

1. Press **Ctrl+F5** (Windows) or **⌘+F5** (Mac)
2. The browser opens to your default page
3. The 3D pie chart renders with your data

### Step 3: Verify Output

- Chart should display with colored pie slices
- Each slice represents a data point
- Legend appears on the right
- Hover over slices to see values

### Troubleshooting

**Chart doesn't render?**
- Verify script manager is present in `_Layout.cshtml`
- Check CDN links are correct and accessible
- Open browser DevTools (F12) to check for JavaScript errors
- Ensure NuGet package is installed: Check `packages.config`

**Data not showing?**
- Verify model has data: Use browser DevTools to inspect
- Check XName and YName match property names in model
- Ensure DataSource is passed correctly: `(IEnumerable<object>)Model`

**Styling issues?**
- Verify CSS link in head section is present
- Check browser console for 404 errors on CDN resources
- Clear browser cache (Ctrl+Shift+Delete)

## Next Steps

- Choose between Pie and Donut chart types in [Pie and Donut Charts](pie-and-donut-charts.md)
- Add data labels in [Data Labels](data-labels.md)
- Configure legend in [Legend Configuration](legend-configuration.md)
- Enable tooltips in [Tooltips](tooltips.md)
- Customize appearance in [Title and Customization](title-and-customization.md)
