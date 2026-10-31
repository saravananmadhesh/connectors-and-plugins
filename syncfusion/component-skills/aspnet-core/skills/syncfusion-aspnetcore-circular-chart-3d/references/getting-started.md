# Getting Started with Syncfusion ASP.NET Core 3D Circular Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1 Create an ASPNET Core Project](#step-1-create-an-aspnet-core-project)
  - [Step 2 Install Syncfusion NuGet Package](#step-2-install-syncfusion-nuget-package)
- [Adding References](#adding-references)
  - [Step 1 Add Tag Helper Import](#step-1-add-tag-helper-import)
  - [Step 2 Add Script References](#step-2-add-script-references)
  - [Step 3 Register Script Manager](#step-3-register-script-manager)
- [Creating Your First Chart](#creating-your-first-chart)
  - [Basic Pie Chart Example](#basic-pie-chart-example)
  - [Basic Donut Chart Example](#basic-donut-chart-example)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
  - [Issue Chart not rendering](#issue-chart-not-rendering)
  - [Issue NuGet package not installing](#issue-nuget-package-not-installing)
  - [Issue License key warning](#issue-license-key-warning)
- [Next Steps](#next-steps)

## Prerequisites

Before implementing the pie/donut chart, ensure you have:
- Visual Studio 2022 or later installed
- ASP.NET Core 6.0 or higher (.NET version)
- Basic understanding of ASP.NET Core Razor Pages or MVC
- Syncfusion license (or trial version)

Verify your system meets the [Syncfusion ASP.NET Core system requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements).

## Installation

### Step 1: Create an ASP.NET Core Project

**Option A: Using Microsoft Templates**
```powershell
dotnet new webapp -n MyChartApp
cd MyChartApp
```

**Option B: Using Visual Studio**
1. Open Visual Studio
2. Click "Create a new project"
3. Select "ASP.NET Core Web App" template
4. Configure project name, location, and framework (ASP.NET Core 6.0+)
5. Click "Create"

### Step 2: Install Syncfusion NuGet Package

Open NuGet Package Manager in Visual Studio:
- Tools → NuGet Package Manager → Manage NuGet Packages for Solution

Search for and install **Syncfusion.EJ2.AspNet.Core**

**Alternatively, use Package Manager Console:**
```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.3
```

> **Note:** The package includes dependencies: Newtonsoft.Json for JSON serialization and Syncfusion.Licensing for license validation. All are automatically installed.

## Adding References

### Step 1: Add Tag Helper Import

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/Shared/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This enables Syncfusion tag helper syntax in all views.

### Step 2: Add Script References

Open the shared layout file `~/Pages/Shared/_Layout.cshtml` (Razor Pages) or `~/Views/Shared/_Layout.cshtml` (MVC).

Add the Syncfusion script reference in the `<head>` section:

```html
<head>
    ...
    <!-- Syncfusion EJ2 Script -->
    <script src="https://cdn.syncfusion.com/ej2/33.2.3/dist/ej2.min.js"></script>
    <!-- Syncfusion EJ2 Styles (Optional but recommended) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/material.css" />
</head>
```

### Step 3: Register Script Manager

In the same layout file, add the Syncfusion script manager at the end of the `<body>` section:

```html
<body>
    ...
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## Creating Your First Chart

### Basic Pie Chart Example

**View File (CSHTML):**

```cshtml
@page
@{
    ViewData["Title"] = "Pie Chart Demo";
    var chartData = new List<dynamic>
    {
        new { X = "Chrome", Y = 37.8 },
        new { X = "Firefox", Y = 23.8 },
        new { X = "Safari", Y = 18.3 },
        new { X = "Edge", Y = 20.1 }
    };
}

<div class="container mt-5">
    <h1>Browser Market Share</h1>
    
    <ejs-circularchart3d id="container" title="Browser Market Share 2024" tilt="-45">
        <e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Right">
        </e-circularchart3d-legendsettings>
        <e-circularchart3d-series-collection>
            <e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y">
                <e-circularchart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Outside">
                    <e-connectorstyle length="40px"></e-connectorstyle>
                </e-circularchart3d-series-datalabel>
            </e-circularchart3d-series>
        </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
</div>
```
**Note:** The `tilt` property adjusts the 3D viewing angle of the Circular Chart. For example, `tilt="-45"` gives the chart a tilted perspective for a stronger 3D appearance. 

**Result:** A 3D pie chart with data labels and legend appears on the page.

### Basic Donut Chart Example

To convert the pie chart to a donut, add the `InnerRadius` property:

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" innerRadius="50%" tilt="-45">
    <!-- Other series configuration -->
</e-circularchart3d-series>
```

The `innerRadius="50%"` creates a donut effect by removing the center 50% of the radius.

## Project Structure

After setup, your project structure should look like:

```
MyChartApp/
├── Pages/
│   ├── _ViewImports.cshtml       (Add @addTagHelper *, Syncfusion.EJ2)
│   ├── Shared/
│   │   └── _Layout.cshtml         (Add script and style references)
│   ├── Index.cshtml               (Your pie/donut chart page)
│   └── Index.cshtml.cs            (Page model with chart data)
├── wwwroot/
│   ├── css/
│   ├── js/
│   └── lib/
├── appsettings.json
└── Program.cs
```

## Troubleshooting

### Issue: Chart not rendering
**Solution:** Verify that:
1. Script references in `_Layout.cshtml` are correct and accessible
2. Tag helper is imported in `_ViewImports.cshtml`
3. Script manager `<ejs-scripts></ejs-scripts>` is present
4. Chart data is not empty or null

### Issue: NuGet package not installing
**Solution:**
1. Ensure NuGet is configured correctly
2. Check your internet connection
3. Try updating NuGet: `Update-Package -Reinstall Syncfusion.EJ2.AspNet.Core`

### Issue: License key warning
**Solution:** Add your license key in `Program.cs`:
```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
```

## Next Steps

- Configure pie/donut variations (radius, inner radius, series types)
- Add data labels with custom formatting
- Implement legends with custom positioning
- Enable tooltips for interactivity
- Handle empty or missing data points
- Enable print and export functionality
- Style and theme customization
