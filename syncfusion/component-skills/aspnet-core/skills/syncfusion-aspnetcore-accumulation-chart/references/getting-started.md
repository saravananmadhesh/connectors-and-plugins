# Getting Started with Accumulation Charts

This guide provides a complete walkthrough for setting up and implementing Syncfusion ASP.NET Core Accumulation Charts in your application.

## Table of Contents

- [Prerequisites](#prerequisites)
  - [System Requirements](#system-requirements)
  - [Knowledge Prerequisites](#knowledge-prerequisites)
- [Create ASP.NET Core Application](#create-aspnet-core-application)
  - [Option 1: Using Microsoft Templates](#option-1-using-microsoft-templates)
  - [Option 2: Using Syncfusion ASP.NET Core Extension](#option-2-using-syncfusion-aspnet-core-extension)
- [Install NuGet Package](#install-nuget-package)
  - [Using NuGet Package Manager (Visual Studio)](#using-nuget-package-manager-visual-studio)
  - [Using Package Manager Console](#using-package-manager-console)
  - [Using .NET CLI](#using-net-cli)
- [Register Tag Helper](#register-tag-helper)
- [Add Script and Style Resources](#add-script-and-style-resources)
  - [Method 1: CDN (Recommended for Quick Start)](#method-1-cdn-recommended-for-quick-start)
  - [Method 2: NPM Package](#method-2-npm-package)
  - [Method 3: Custom Resource Generator (CRG)](#method-3-custom-resource-generator-crg)
- [Register Script Manager](#register-script-manager)
- [Create Your First Chart](#create-your-first-chart)
  - [Step 1: Define Data Model](#step-1-define-data-model)
  - [Step 2: Add Chart to Page](#step-2-add-chart-to-page)
- [Data Binding Basics](#data-binding-basics)
  - [Required Properties](#required-properties)
  - [Data Binding Example with Complex Object](#data-binding-example-with-complex-object)
  - [Null Values in Data](#null-values-in-data)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Build](#production-build)
  - [Expected Result](#expected-result)
- [Troubleshooting](#troubleshooting)
  - [Chart Not Rendering](#chart-not-rendering)
  - ["Syncfusion.EJ2" Not Found](#syncfusionej2-not-found)
  - [Styling Issues](#styling-issues)
  - [License Warning](#license-warning)
  - [Data Not Displaying](#data-not-displaying)
- [Sample Repository](#sample-repository)
- [Additional Resources](#additional-resources)

## Prerequisites

Before starting, ensure your system meets the following requirements:

### System Requirements
- **Visual Studio:** 2019 or later (recommended: 2022)
- **.NET Core SDK:** 3.1, 2.0, 9.0, 10.0, or 8.0
- **Browser:** Chrome, Firefox, Safari, Edge (latest versions)
- **Operating System:** Windows, macOS, or Linux

### Knowledge Prerequisites
- Basic understanding of ASP.NET Core Razor Pages or MVC
- Familiarity with C# and HTML
- Understanding of NuGet package management

**Official Documentation:** [System requirements for ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

## Create ASP.NET Core Application

You can create an ASP.NET Core application using Microsoft templates or Syncfusion extensions:

### Option 1: Using Microsoft Templates

1. Open Visual Studio
2. Click **File → New → Project**
3. Select **ASP.NET Core Web App** (Razor Pages) or **ASP.NET Core Web App (Model-View-Controller)**
4. Name your project (e.g., `AccumulationChartDemo`)
5. Choose **.NET version** (6.0, 7.0, or 8.0 recommended)
6. Click **Create**

**Reference:** [Create a Razor Pages web app](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-8.0&tabs=visual-studio#create-a-razor-pages-web-app)

### Option 2: Using Syncfusion ASP.NET Core Extension

If you have Syncfusion Visual Studio extensions installed:

1. Open Visual Studio
2. Click **Extensions → Syncfusion → Essential Studio for ASP.NET Core → Create New Project**
3. Select **ASP.NET Core Web Application**
4. Configure project settings
5. Select **Accumulation Chart** component from the wizard

**Reference:** [Create a Project using Syncfusion ASP.NET Core Extension](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project)

## Install NuGet Package

Install the Syncfusion EJ2 ASP.NET Core package:

### Using NuGet Package Manager (Visual Studio)

1. Right-click your project in Solution Explorer
2. Select **Manage NuGet Packages**
3. Click **Browse** tab
4. Search for `Syncfusion.EJ2.AspNet.Core`
5. Select the package and click **Install**

### Using Package Manager Console

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.1.44
```

Replace `33.1.44` with the latest version available on [nuget.org](https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core/).

### Using .NET CLI

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core --version 33.1.44
```

**Important Notes:**
- The `Syncfusion.EJ2.AspNet.Core` package has dependencies on `Newtonsoft.Json` (for JSON serialization) and `Syncfusion.Licensing` (for license validation)
- These dependencies will be installed automatically
- For more details on NuGet packages, see [NuGet packages documentation](https://ej2.syncfusion.com/aspnetcore/documentation/nuget-packages)

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` (for Razor Pages) or `~/Views/_ViewImports.cshtml` (for MVC) and add the Syncfusion tag helper:

```csharp
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

This registration makes Syncfusion EJ2 tag helpers available throughout your application.

## Add Script and Style Resources

You can add Syncfusion resources using three methods: CDN, NPM, or Custom Resource Generator (CRG).

### Method 1: CDN (Recommended for Quick Start)

Open `~/Pages/Shared/_Layout.cshtml` (Razor Pages) or `~/Views/Shared/_Layout.cshtml` (MVC):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Accumulation Chart Demo</title>
    
    <!-- Syncfusion CSS Theme -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    
    <!-- Syncfusion JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    
    <!-- Syncfusion Script Manager (required) -->
    <ejs-scripts></ejs-scripts>
</body>
</html>
```

**Available Themes:**
- `material.css` - Material Design
- `bootstrap5.css` - Bootstrap 5
- `fluent.css` - Fluent Design
- `tailwind.css` - Tailwind CSS
- `bootstrap.css` - Bootstrap 4
- `fabric.css` - Office Fabric
- `highcontrast.css` - High Contrast

### Method 2: NPM Package

Install via npm:

```bash
npm install @syncfusion/ej2-aspnet-core-scripts
```

Reference in `_Layout.cshtml`:

```html
<link rel="stylesheet" href="~/node_modules/@syncfusion/ej2/material.css" />
<script src="~/node_modules/@syncfusion/ej2/dist/ej2.min.js"></script>
```

### Method 3: Custom Resource Generator (CRG)

For production applications, use CRG to include only the components you need:

1. Visit [Syncfusion CRG](https://crg.syncfusion.com/)
2. Select **ASP.NET Core** platform
3. Choose **AccumulationChart** component
4. Generate and download custom scripts/styles
5. Include in your project

**Reference:** [Adding Script Reference](https://ej2.syncfusion.com/aspnetcore/documentation/common/adding-script-references)

## Register Script Manager

The `<ejs-scripts>` tag helper is required to render Syncfusion components. Place it just before the closing `</body>` tag in `_Layout.cshtml`:

```html
<body>
    <header>
        <!-- Navigation -->
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>
    <footer>
        <!-- Footer content -->
    </footer>
    
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

**Why it's needed:** The script manager initializes Syncfusion components after the page loads and manages component lifecycle.

## Create Your First Chart

Now let's create a simple pie chart showing browser market share.

### Step 1: Define Data Model

Create a data model class. You can add this in `~/Pages/Index.cshtml.cs` (Razor Pages) or a separate `Models` folder:

```csharp
public class BrowserData
{
    public string Browser { get; set; }
    public double MarketShare { get; set; }
}
```

### Step 2: Add Chart to Page

Open `~/Pages/Index.cshtml` (Razor Pages) or `~/Views/Home/Index.cshtml` (MVC):

**For Razor Pages (~/Pages/Index.cshtml):**

```cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "Accumulation Chart Demo";
    
    List<BrowserData> chartData = new List<BrowserData>
    {
        new BrowserData { Browser = "Chrome", MarketShare = 65.3 },
        new BrowserData { Browser = "Safari", MarketShare = 18.2 },
        new BrowserData { Browser = "Edge", MarketShare = 5.1 },
        new BrowserData { Browser = "Firefox", MarketShare = 4.9 },
        new BrowserData { Browser = "Others", MarketShare = 6.5 }
    };
}

<div class="control-section">
    <h2>Browser Market Share 2024</h2>
    
    <ejs-accumulationchart id="browserChart" title="Global Browser Statistics">
        <e-accumulation-series-collection>
            <e-accumulation-series dataSource="@chartData" 
                                  xName="Browser" 
                                  yName="MarketShare"
                                  type="Pie">
            </e-accumulation-series>
        </e-accumulation-series-collection>
        <e-accumulationchart-legendsettings visible="true"></e-accumulationchart-legendsettings>
    </ejs-accumulationchart>
</div>
```

**For MVC (~/Views/Home/Index.cshtml):**

```cshtml
@{
    ViewData["Title"] = "Accumulation Chart Demo";
    
    List<BrowserData> chartData = new List<BrowserData>
    {
        new BrowserData { Browser = "Chrome", MarketShare = 65.3 },
        new BrowserData { Browser = "Safari", MarketShare = 18.2 },
        new BrowserData { Browser = "Edge", MarketShare = 5.1 },
        new BrowserData { Browser = "Firefox", MarketShare = 4.9 },
        new BrowserData { Browser = "Others", MarketShare = 6.5 }
    };
}

<div class="control-section">
    <h2>Browser Market Share 2024</h2>
    
    <ejs-accumulationchart id="browserChart" title="Global Browser Statistics">
        <e-accumulation-series-collection>
            <e-accumulation-series dataSource="@chartData" 
                                  xName="Browser" 
                                  yName="MarketShare"
                                  type="Pie">
            </e-accumulation-series>
        </e-accumulation-series-collection>
        <e-accumulationchart-legendsettings visible="true"></e-accumulationchart-legendsettings>
    </ejs-accumulationchart>
</div>
```

## Data Binding Basics

Understanding the key properties for data binding:

### Required Properties

| Property | Description | Example |
|----------|-------------|---------|
| `dataSource` | Collection of data objects | `@chartData` |
| `xName` | Property name for categories (labels) | `"Browser"` |
| `yName` | Property name for values | `"MarketShare"` |

### Data Binding Example with Complex Object

```csharp
public List<SalesData> SalesDataList{ get; set; } = new();

public class SalesData
{
    public string Product { get; set; } = string.Empty;
    public double Revenue { get; set; }
    public double Units { get; set; }
    public string Region { get; set; } = string.Empty;
}

public void OnGet()
{
    SalesDataList = new List<SalesData>
    {
    new SalesData { Product = "Laptop", Revenue = 45000, Units = 150, Region = "North" },
    new SalesData { Product = "Mobile", Revenue = 38000, Units = 320, Region = "South" },
    new SalesData { Product = "Tablet", Revenue = 22000, Units = 180, Region = "East" }
    };
}
```

```cshtml
<ejs-accumulationchart id="salesChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@Model.SalesDataList" 
                              xName="Product" 
                              yName="Revenue">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Null Values in Data

The chart handles null values gracefully:

```csharp
List<BrowserData> dataWithNulls = new List<BrowserData>
{
    new BrowserData { Browser = "Chrome", MarketShare = 65.3 },
    new BrowserData { Browser = "Safari", MarketShare = null },  // Will be ignored by default
    new BrowserData { Browser = "Edge", MarketShare = 5.1 }
};
```

See the `data-handling.md` reference for empty point handling strategies.

## Running the Application

### Development Mode

1. Press **F5** (Windows) or **Cmd + F5** (macOS) in Visual Studio
2. Or use the command line:

```bash
dotnet run
```

3. Your browser will open automatically to `https://localhost:5001` (or similar port)
4. Navigate to the page with your chart

### Production Build

```bash
dotnet publish -c Release
```

### Expected Result

You should see:
- A circular pie chart with 5 segments
- Each segment colored differently
- A legend on the right showing browser names
- Hover tooltips showing browser names and percentages
- Interactive features (click to explode slices)

## Troubleshooting

### Chart Not Rendering

**Problem:** Blank page or no chart appears

**Solutions:**
1. Check browser console for JavaScript errors (F12)
2. Verify `<ejs-scripts></ejs-scripts>` is present before `</body>`
3. Ensure CDN resources are loaded (check Network tab in DevTools)
4. Confirm tag helper is registered in `_ViewImports.cshtml`

### "Syncfusion.EJ2" Not Found

**Problem:** Tag helper not recognized

**Solutions:**
```csharp
// Verify this line exists in _ViewImports.cshtml
@addTagHelper *, Syncfusion.EJ2
```

### Styling Issues

**Problem:** Chart appears but looks broken

**Solutions:**
1. Ensure CSS is loaded before JavaScript
2. Check if theme CSS is correctly referenced
3. Clear browser cache (Ctrl + Shift + Del)
4. Try a different theme to isolate the issue

### License Warning

**Problem:** "License key not registered" warning

**Solutions:**
1. Register your license key in `Program.cs` (for .NET 6+) or `Startup.cs` (for .NET 5 and earlier):

```csharp
// Program.cs (.NET 6+)
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Register Syncfusion license
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

// ... rest of configuration
```

2. Get your license key from [Syncfusion License Dashboard](https://www.syncfusion.com/account/downloads)

### Data Not Displaying

**Problem:** Chart renders but shows no data

**Solutions:**
1. Verify `dataSource` is not null or empty
2. Check `xName` and `yName` match property names exactly (case-sensitive)
3. Ensure data collection is initialized before rendering
4. Check data types match (string for x, number for y)

```csharp
// Debug: Print data to verify
@foreach(var item in chartData)
{
    <p>@item.Browser: @item.MarketShare</p>
}
```

## Sample Repository

View complete working examples:
- [GitHub: ASP.NET Core Accumulation Chart Examples](https://github.com/SyncfusionExamples/ASP-NET-Core-Getting-Started-Examples/tree/main/AccumulationChart/ASP.NET%20Core%20Tag%20Helper%20Examples)

## Additional Resources

- [Official Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/accumulation-chart/getting-started)
- [API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.AccumulationChart.html)
- [Live Demos](https://ej2.syncfusion.com/aspnetcore/chart/pie#/)
- [Video Tutorial](https://www.youtube.com/watch?v=RplZL-3B1G4&t=3s)
