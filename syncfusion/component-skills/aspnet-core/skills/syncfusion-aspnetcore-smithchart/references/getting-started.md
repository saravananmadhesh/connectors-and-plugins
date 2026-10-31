# Getting Started with Smith Chart

## Table of Contents
- [Installation and Setup](#installation-and-setup)
  - [System Requirements](#system-requirements)
  - [Install NuGet Package](#install-nuget-package)
- [Configure ASP.NET Core Application](#configure-aspnet-core-application)
  - [Add TagHelper Import](#add-taghelper-import)
  - [Add Script Resources](#add-script-resources)
  - [Register Script Manager](#register-script-manager)
- [Create Your First Smith Chart](#create-your-first-smith-chart)
  - [Basic Markup](#basic-markup)
  - [Add Series Data](#add-series-data)
  - [Prepare Data Model](#prepare-data-model)
- [Add Title to Your Chart](#add-title-to-your-chart)
- [Enable Key Features](#enable-key-features)
  - [Enable Markers](#enable-markers)
  - [Enable Data Labels](#enable-data-labels)
  - [Enable Legend](#enable-legend)
  - [Enable Tooltips](#enable-tooltips)
- [Complete Example](#complete-example)

## Installation and Setup

### System Requirements

Before starting, ensure you have:
- ASP.NET Core 6.0 or later
- Visual Studio 2019 or later
- .NET SDK installed

### Install NuGet Package

Open the NuGet Package Manager in Visual Studio (Tools → NuGet Package Manager → Manage NuGet Packages for Solution) and search for `Syncfusion.EJ2.AspNet.Core`, then install it.

Alternatively, use the Package Manager Console:

```
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

**Note:** The Syncfusion.EJ2.AspNet.Core NuGet package has dependencies:
- `Newtonsoft.Json` for JSON serialization
- `Syncfusion.Licensing` for license validation

Both will be installed automatically.

## Configure ASP.NET Core Application

### Add TagHelper Import

Open `~/Pages/_ViewImports.cshtml` and add the Syncfusion TagHelper import:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This makes all Syncfusion components available as TagHelpers in your Razor Pages.

### Add Script Resources

In `~/Pages/Shared/_Layout.cshtml`, add the Syncfusion script reference in the `<head>` section:

```cshtml
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

### Register Script Manager

In the same `_Layout.cshtml` file, register the Syncfusion Script Manager at the end of the `<body>` section:

```cshtml
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## Create Your First Smith Chart

### Basic Markup

In your Razor page (e.g., `~/Pages/Index.cshtml`), add the following TagHelper markup:

```cshtml
<ejs-smithchart id="smithchart">
</ejs-smithchart>
```

Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>⌘</kbd>+<kbd>F5</kbd> (macOS) to run your application. You'll see a basic Smith Chart rendered in the browser.

### Add Series Data

To display meaningful data, add series to your Smith Chart. The Smith Chart requires data containing `resistance` and `reactance` values:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="SeriesData1" name="Transmission Line 1" 
                                       resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="SeriesData2" name="Transmission Line 2" 
                                       resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Prepare Data Model

In your page model or controller, define the data:

```csharp
public List<SmithChartData> SeriesData1 { get; set; }
public List<SmithChartData> SeriesData2 { get; set; }

public void OnGet()
{
    SeriesData1 = new List<SmithChartData>
    {
        new SmithChartData { resistance = 10, reactance = 25 },
        new SmithChartData { resistance = 20, reactance = 50 },
        new SmithChartData { resistance = 30, reactance = 75 }
    };

    SeriesData2 = new List<SmithChartData>
    {
        new SmithChartData { resistance = 5, reactance = 15 },
        new SmithChartData { resistance = 15, reactance = 45 },
        new SmithChartData { resistance = 25, reactance = 65 }
    };
}

public class SmithChartData
{
    public double resistance { get; set; }  
    public double reactance { get; set; } 
}
```

## Add Title to Your Chart

Enhance your Smith Chart with a title and subtitle:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-title text="Transmission Line Analysis">
        <e-title-subtitle text="RF Circuit Impedance Matching"></e-title-subtitle>
    </e-smithchart-title>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="SeriesData1" name="Transmission Line 1" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Enable Key Features

### Enable Markers

Display markers at each data point:

```cshtml
<e-smithchart-smithchartseries dataSource="SeriesData1" name="Transmission Line 1" resistance="resistance" reactance="reactance">
    <e-smithchartseries-marker visible="true">
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

### Enable Data Labels

Show data values near markers:

```cshtml
<e-smithchart-smithchartseries dataSource="SeriesData1" name="Transmission Line 1" resistance="resistance" reactance="reactance">
    <e-smithchartseries-marker visible="true">
        <e-series-marker-datalabel visible="true"></e-series-marker-datalabel>
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

### Enable Legend

Display a legend to identify series:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-legendsettings visible="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="SeriesData1" name="Transmission Line 1" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Enable Tooltips

Show information on hover:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="SeriesData1" name="Transmission Line 1" resistance="resistance" reactance="reactance">
            <e-smithchartseries-tooltip visible="true">
            </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Complete Example

Here's a complete getting-started example:

```cshtml
@page
@model IndexModel

<ejs-smithchart id="smithchart">
    <e-smithchart-title text="Smith Chart - Getting Started">
        <e-title-subtitle text="RF Circuit Analysis Example"></e-title-subtitle>
    </e-smithchart-title>
    <e-smithchart-legendsettings visible="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Model.TransmissionData" name="Transmission 1" resistance="resistance" reactance="reactance">
            <e-smithchartseries-tooltip visible="true">
            </e-smithchartseries-tooltip>
            <e-smithchartseries-marker visible="true">
                <e-series-marker-datalabel visible="true"></e-series-marker-datalabel>
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

With the page model:

```csharp
public class IndexModel : PageModel
{
    public List<SmithChartData> TransmissionData { get; set; }

    public void OnGet()
    {
        TransmissionData = new List<SmithChartData>
        {
            new SmithChartData { resistance = 10, reactance = 25 },
            new SmithChartData { resistance = 20, reactance = 50 },
            new SmithChartData { resistance = 30, reactance = 75 },
            new SmithChartData { resistance = 40, reactance = 60 }
        };
    }
}

public class SmithChartData
{
    public double Resistance { get; set; }
    public double Reactance { get; set; }
}
```

You're ready to build more complex Smith Chart visualizations!
