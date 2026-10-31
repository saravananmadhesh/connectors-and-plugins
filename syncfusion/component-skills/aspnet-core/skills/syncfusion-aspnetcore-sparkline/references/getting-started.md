# Getting Started with ASP.NET Core Sparkline

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
    -[Option 1: Microsoft Templates](#option-1-microsoft-templates)
    -[Option 2: Syncfusion Extension](#option-2-syncfusion-extension)
- [NuGet Package Installation](#nuget-package-installation)
    -[Via Package Manager GUI](#via-package-manager-gui)
    -[Via Package Manager Console](#via-package-manager-console)
- [TagHelper Configuration](#taghelper-configuration)
- [Script Manager Setup](#script-manager-setup)
- [Creating Your First Sparkline](#creating-your-first-sparkline)
- [Binding Data Source](#binding-data-source)
- [Changing Sparkline Type](#changing-sparkline-type)
- [Enabling Tooltips](#enabling-tooltips)

## Prerequisites

Before implementing Sparkline in your ASP.NET Core application, verify:

- ASP.NET Core 3.1 or later installed
- Visual Studio 2019 or later (or Visual Studio Code)
- NuGet Package Manager access
- Basic understanding of ASP.NET Core Razor pages or MVC

## Project Setup

You can create an ASP.NET Core web application using:

### Option 1: Microsoft Templates
1. Open Visual Studio
2. Create a new project → ASP.NET Core Web App (Model-View-Controller) or Razor Pages
3. Select target framework (ASP.NET Core 5.0 or later)
4. Click Create

### Option 2: Syncfusion Extension
Use the Syncfusion ASP.NET Core Extension in Visual Studio to create a project with pre-configured templates and references.

## NuGet Package Installation

Install the Syncfusion.EJ2.AspNet.Core NuGet package:

### Via Package Manager GUI
1. Open Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Select and click Install
4. Accept license terms

### Via Package Manager Console
```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 25.1.35
```

**Dependencies installed automatically:**
- Newtonsoft.Json (for JSON serialization)
- Syncfusion.Licensing (for license validation)

## TagHelper Configuration

Add the Syncfusion TagHelper to your `_ViewImports.cshtml`:

```cshtml
<!-- File: ~/Pages/_ViewImports.cshtml or ~/Views/_ViewImports.cshtml -->
@addTagHelper *, Syncfusion.EJ2
```

This registers all Syncfusion TagHelpers globally for use in your pages.

## Script Manager Setup

Add script references and the script manager to your layout file:

```cshtml
<!-- File: ~/Pages/Shared/_Layout.cshtml or ~/Views/Shared/_Layout.cshtml -->

<head>
    <!-- Other head content -->
    
    <!-- Syncfusion JavaScript library -->
    <script src="https://cdn.syncfusion.com/ej2/25.1.35/dist/ej2.min.js"></script>
</head>

<body>
    <!-- Your page content -->
    
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` manager must be placed at the end of the `<body>` to ensure all components are initialized after page load.

## Creating Your First Sparkline

Add a basic sparkline to your page with the `<ejs-sparkline>` TagHelper:

```cshtml
<!-- File: ~/Pages/Index.cshtml -->

<div class="container mt-4">
    <h2>Sparkline Example</h2>
    
    <ejs-sparkline id="sparkline">
    </ejs-sparkline>
</div>
```

This creates an empty sparkline container. You'll need to add data and configuration to display it.

## Binding Data Source

Prepare your data in the page model or controller:

```csharp
// File: ~/Pages/Index.cshtml.cs or ~/Controllers/HomeController.cs

public class DataSource
{
    public int x { get; set; }
    public string xval { get; set; }
    public double yval { get; set; }
    
    public static List<DataSource> GetData()
    {
        List<DataSource> data = new List<DataSource>();
        data.Add(new DataSource() { x = 0, xval = "2005", yval = 20090440 });
        data.Add(new DataSource() { x = 1, xval = "2006", yval = 20264080 });
        data.Add(new DataSource() { x = 2, xval = "2007", yval = 20434180 });
        data.Add(new DataSource() { x = 3, xval = "2008", yval = 21007310 });
        data.Add(new DataSource() { x = 4, xval = "2009", yval = 21262640 });
        data.Add(new DataSource() { x = 5, xval = "2010", yval = 21515750 });
        data.Add(new DataSource() { x = 6, xval = "2011", yval = 21766710 });
        data.Add(new DataSource() { x = 7, xval = "2012", yval = 22015580 });
        data.Add(new DataSource() { x = 8, xval = "2013", yval = 22262500 });
        data.Add(new DataSource() { x = 9, xval = "2014", yval = 22507620 });
        return data;
    }
}

// In OnGet() or controller action:
ViewBag.DataPoints = DataSource.GetData();
```

Bind the data to the sparkline:

```cshtml
<!-- File: ~/Pages/Index.cshtml -->

<ejs-sparkline id="sparkline" 
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval">
</ejs-sparkline>
```

The `xName` and `yName` properties map to your data object fields. Press Ctrl+F5 to run and view your sparkline.

## Changing Sparkline Type

Change the visual representation by setting the `type` property. Default is Line; supported types:

- **Line** - Connected points showing trends
- **Column** - Vertical bars for discrete values
- **Area** - Filled region under the trend line
- **Win-Loss** - Binary wins (tall) and losses (short)
- **Pie** - Proportional distribution

```cshtml
<!-- Area Sparkline Example -->
<ejs-sparkline id="areaSparkline" 
    type="Area"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval">
</ejs-sparkline>
```

```cshtml
<!-- Win-Loss Sparkline Example -->
<ejs-sparkline id="winLossSparkline" 
    type="WinLoss"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval">
</ejs-sparkline>
```

## Enabling Tooltips

Add tooltip support to display data point details on hover:

```cshtml
<ejs-sparkline id="sparklineWithTooltip" 
    type="Line"
    dataSource="ViewBag.DataPoints"
    xName="xval" 
    yName="yval">
    <e-sparkline-tooltipsettings 
        visible="true" 
        format="${xval}: ${yval}">
    </e-sparkline-tooltipsettings>
</ejs-sparkline>
```

**Tooltip format options:**
- `${xval}` - X-axis value
- `${yval}` - Y-axis value (data point value)
- Custom text: `"Year: ${xval}, Population: ${yval}"`

The tooltip appears automatically when you hover over the sparkline data area. The `SparklineTooltip` module is injected automatically when using tooltip settings.

## Troubleshooting

**Sparkline not rendering:**
- Verify TagHelper is added to `_ViewImports.cshtml`
- Check that `<ejs-scripts>` is in the layout file
- Confirm data is passed to ViewBag correctly
- Ensure browser console has no script errors

**Tooltips not appearing:**
- Make sure `visible="true"` is set in `tooltipSettings`
- Verify sparkline has data bound
- Check browser console for module injection errors

**Data not displaying:**
- Verify `xName` and `yName` match your data object properties
- Check that DataSource collection is not empty
- Confirm data types match (numeric for yName, string for xval)
