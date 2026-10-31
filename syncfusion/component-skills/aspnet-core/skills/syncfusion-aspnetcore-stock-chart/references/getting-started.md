# Getting Started with Stock Chart

## Table of Contents
- [System Requirements](#system-requirements)
- [Create ASP.NET Core Application](#create-aspnet-core-application)
    - [Using Microsoft Templates](#using-microsoft-templates)
    - [Using Syncfusion Extension](#using-syncfusion-extension)
- [Install NuGet Package](#install-nuget-package)
    - Dependencies (installed with package)
- [Configure Tag Helper](#configure-tag-helper)
- [Add Stylesheets and Scripts](#add-stylesheets-and-scripts)
    - Alternative Theme Options
- [Register Script Manager](#register-script-manager)
- [Add Stock Chart Control](#add-stock-chart-control)
- [Populate with Data](#populate-with-data)
    - [Prepare Financial Data](#prepare-financial-data)
    - [Basic Data Binding](#basic-data-binding)
    - [Axis Configuration](#axis-configuration)
    - [Candlestick Series Configuration](#candlestick-series-configuration)
- [Next Steps](#next-steps)

## System Requirements

Before starting, ensure your development environment meets the requirements:
- ASP.NET Core 3.1 or later
- Visual Studio 2019 or later
- .NET SDK appropriate for your ASP.NET Core version

Refer to the official system requirements documentation for your specific platform.

## Create ASP.NET Core Application

### Using Microsoft Templates

Create a new ASP.NET Core Razor Pages application:
1. Open Visual Studio
2. Select "Create a new project"
3. Choose "ASP.NET Core Web App (Model-View-Controller)" or "ASP.NET Core Web App"
4. Follow the project creation wizard to complete the setup

### Using Syncfusion Extension

Alternatively, use the Syncfusion ASP.NET Core Extension for Visual Studio:
1. Install the Syncfusion extension from Visual Studio marketplace
2. Use the extension to create a new project with pre-configured Syncfusion setup
3. The extension automatically handles dependencies and configurations

## Install NuGet Package

Open the NuGet Package Manager in Visual Studio and search for `Syncfusion.EJ2.AspNet.Core`:

1. Go to Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Search for "Syncfusion.EJ2.AspNet.Core"
3. Click Install

Alternatively, use the Package Manager Console command:

```
Install-Package Syncfusion.EJ2.AspNet.Core -Version 24.1.41
```

**Dependencies:**
- Newtonsoft.Json (for JSON serialization)
- Syncfusion.Licensing (for license validation)

These dependencies are installed automatically with the main package.

## Configure Tag Helper

Open `~/Pages/_ViewImports.cshtml` file and add the Syncfusion tag helper reference:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This allows you to use Syncfusion components as tag helpers throughout your application.

## Add Stylesheets and Scripts

In the `<head>` section of `~/Pages/Shared/_Layout.cshtml`, add the Syncfusion CSS and JavaScript references using CDN:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.1.41/fluent.css" />
    
    <!-- Syncfusion ASP.NET Core scripts -->
    <script src="https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2.min.js"></script>
    ...
</head>
```

Replace the version number with your installed version.

**Alternative Theme Options:**
- Material, Fabric, Bootstrap, HighContrastLight (light themes)
- MaterialDark, FabricDark, BootstrapDark, HighContrast (dark themes)

## Register Script Manager

At the end of the `<body>` section in `~/Pages/Shared/_Layout.cshtml`, add the script manager:

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The script manager must be registered after all component declarations to ensure proper initialization.

## Add Stock Chart Control

In your page (e.g., `~/Pages/Index.cshtml`), add the Stock Chart tag helper:

```cshtml
<ejs-stockchart id="container">
    <e-stockchart-series-collection>
        <e-stockchart-series></e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

Run your application (Ctrl+F5 on Windows or Cmd+F5 on macOS) to render the basic Stock Chart control in your browser.

### Core API Properties

When creating a Stock Chart, you can configure these essential properties:

**Basic Properties:**
- `id`: Unique identifier for the chart
- `width`: Chart width (default: "100%")
- `height`: Chart height (default: "450")
- `title`: Chart title text
- `background`: Background color (hex or rgba)
- `theme`: Visual theme (Material, Fabric, Bootstrap, MaterialDark, etc.)

**Example with properties:**

```cshtml
<ejs-stockchart id="stockChart" 
    width="100%" 
    height="600" 
    title="Stock Price Analysis"
    background="#f5f5f5"
    theme="Material">
    <e-stockchart-series-collection>
        <e-stockchart-series></e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

## Populate with Data

### Prepare Financial Data

Stock Chart requires specific data structure for proper rendering. The data object should contain:
- Date/timestamp values for X-axis
- OHLC (Open, High, Low, Close) values for candlestick series
- Optional volume data for certain indicators

### Basic Data Binding

```cshtml
@{
    var stockData = new List<object>
    {
        new { x = new DateTime(2023, 1, 1), open = 150, high = 155, low = 145, close = 152, volume = 1000000 },
        new { x = new DateTime(2023, 1, 2), open = 152, high = 158, low = 151, close = 156, volume = 1200000 },
        new { x = new DateTime(2023, 1, 3), open = 156, high = 160, low = 150, close = 154, volume = 900000 }
    };
}

<ejs-stockchart id="stockChart">
    <e-stockchart-primaryxaxis valueType="DateTime"></e-stockchart-primaryxaxis>
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Axis Configuration

When binding DateTime data, set the primary X-axis valueType to DateTime:

```cshtml
<e-stockchart-primaryxaxis valueType="DateTime">
</e-stockchart-primaryxaxis>
```

By default, the axis valueType is Numeric. DateTime configuration enables proper date-based axis rendering for stock data.

### Candlestick Series Configuration

For candlestick visualization, configure the series with OHLC fields:

```cshtml
<e-stockchart-series 
    dataSource="stockData" 
    xName="x" 
    yName="close" 
    open="open" 
    high="high" 
    low="low" 
    type="Candle">
</e-stockchart-series>
```

The `type="Candle"` renders candlesticks showing Open, High, Low, Close values for each data point.

## Chart Events

Stock Chart provides various events for handling user interactions and lifecycle hooks:

### Lifecycle Events

```cshtml
<ejs-stockchart id="stockChart" 
    load="onLoad" 
    loaded="onLoaded">
</ejs-stockchart>

<script>
    function onLoad(args) {
        // Triggered before chart rendering
        console.log("Chart is loading...");
    }
    
    function onLoaded(args) {
        // Triggered after chart rendering
        console.log("Chart loaded successfully");
    }
</script>
```

### User Interaction Events

```cshtml
<ejs-stockchart id="stockChart" 
    pointClick="onPointClick" 
    stockChartMouseMove="onMouseMove"
    rangeChange="onRangeChange">
</ejs-stockchart>

<script>
    function onPointClick(args) {
        // Triggered when clicking a data point
        console.log("Clicked point:", args.pointIndex);
    }
    
    function onMouseMove(args) {
        // Triggered on mouse movement over chart
        console.log("Mouse position:", args.x, args.y);
    }
    
    function onRangeChange(args) {
        // Triggered when range selector changes
        console.log("New range:", args.start, args.end);
    }
</script>
```

### Available Events

**Lifecycle:** `load`, `loaded`, `beforeExport`

**Rendering:** `seriesRender`, `legendRender`, `tooltipRender`, `axisLabelRender`, `crosshairLabelRender`, `selectorRender`, `stockEventRender`

**User Interaction:** `pointClick`, `pointMove`, `legendClick`, `stockChartMouseClick`, `stockChartMouseDown`, `stockChartMouseUp`, `stockChartMouseMove`, `stockChartMouseLeave`, `onZooming`, `rangeChange`

## Advanced Configuration

### Enable/Disable Features

```cshtml
<ejs-stockchart id="stockChart"
    enablePeriodSelector="true"
    enableSelector="true"
    enableCustomRange="true"
    enablePersistence="false"
    enableRtl="false">
</ejs-stockchart>
```

**Feature Properties:**
- `enablePeriodSelector`: Show period selector (1M, 3M, 6M, 1Y buttons) - default: true
- `enableSelector`: Show range navigator - default: true
- `enableCustomRange`: Allow custom range selection - default: true
- `enablePersistence`: Save state between page reloads - default: false
- `enableRtl`: Right-to-left rendering - default: false

### Selection Configuration

```cshtml
<ejs-stockchart id="stockChart"
    selectionMode="Point"
    isMultiSelect="true"
    isSelect="true">
    <e-stockchart-stockchartselecteddataindexes>
        <e-stockchart-stockchartselecteddataindex series="0" point="2"></e-stockchart-stockchartselecteddataindex>
    </e-stockchart-stockchartselecteddataindexes>
</ejs-stockchart>
```

**Selection Modes:** None, Point, Series, Cluster, DragXY, DragX, DragY

## Next Steps

After completing the basic setup:
1. Choose a series type (line, candlestick, etc.)
2. Configure data binding with your datasource
3. Add interactive features like tooltips and crosshairs
4. Customize appearance with themes and legend positioning
