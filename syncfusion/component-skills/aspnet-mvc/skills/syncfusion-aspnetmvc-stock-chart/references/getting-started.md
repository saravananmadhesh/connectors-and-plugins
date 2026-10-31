# Getting Started with Stock Chart

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Step 1: Install NuGet Package](#step-1-install-nuget-package)
- [Step 2: Add Namespace to Web.config](#step-2-add-namespace-to-webconfig)
- [Step 3: Include CSS and JavaScript Resources](#step-3-include-css-and-javascript-resources)
  - [Using CDN (Recommended for Quick Start)](#using-cdn-recommended-for-quick-start)
  - [Available Themes](#available-themes)
- [Step 4: Create a Basic Stock Chart](#step-4-create-a-basic-stock-chart)
- [Step 5: Test Your Implementation](#step-5-test-your-implementation)
- [Common Issues and Solutions](#common-issues-and-solutions)
  - [Issue: Chart Not Appearing](#issue-chart-not-appearing)
  - [Issue: Candlestick Data Not Displaying Correctly](#issue-candlestick-data-not-displaying-correctly)
  - [Issue: Script Manager Error](#issue-script-manager-error)
  - [Issue: Styling Not Applied](#issue-styling-not-applied)
- [Next Steps](#next-steps)
- [File Structure After Setup](#file-structure-after-setup)
- [Troubleshooting Data Binding](#troubleshooting-data-binding)

## Overview

This guide covers the essential setup steps to create your first Stock Chart in an ASP.NET MVC application using Syncfusion Essential JS 2. You'll install the necessary packages, configure the environment, and render a basic stock chart with sample data.

## Prerequisites

- ASP.NET MVC 5 or later
- Visual Studio 2015 or later
- Basic knowledge of ASP.NET MVC and C#

## Step 1: Install NuGet Package

Open the Package Manager Console in Visual Studio and install the Syncfusion EJ2 MVC package:

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 33.1.44
```

Alternatively, use the NuGet Package Manager UI:
1. Right-click on your project → Manage NuGet Packages
2. Search for "Syncfusion.EJ2.MVC5"
3. Click Install

## Step 2: Add Namespace to Web.config

Add the Syncfusion namespace to your Views Web.config file so you can use Syncfusion helpers in Razor views:

```xml
<!-- ~/Views/Web.config -->
<configuration>
  <system.web.webPages.razor>
    <pages pageBaseType="System.Web.Mvc.WebViewPage">
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

More commonly, add it to the root Web.config:

```xml
<!-- Add in <compilation> section -->
<compilation debug="true" targetFramework="4.7.2">
  <assemblies>
    <add assembly="Syncfusion.EJ2, Version=33.1.44.0, Culture=neutral, PublicKeyToken=3d67ed1f87d44c89" />
  </assemblies>
</compilation>
```

## Step 3: Include CSS and JavaScript Resources

Add Syncfusion CSS and JavaScript files to your layout file. You can use CDN links or local files:

### Using CDN (Recommended for Quick Start)

```html
<!-- ~/Views/Shared/_Layout.cshtml -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stock Chart Demo</title>
    
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent.css" />
    
    <!-- Syncfusion JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    
    <!-- Syncfusion Script Manager (required for MVC helpers) -->
    @Html.EJS().ScriptManager()
</body>
</html>
```

### Available Themes

Replace "material" with your preferred theme:
- `material.css` - Material Design
- `bootstrap4.css` - Bootstrap 4
- `bootstrap5.css` - Bootstrap 5
- `tailwind.css` - Tailwind CSS
- `fabric.css` - Fabric Design
- `highcontrast.css` - High Contrast (accessibility)

## Step 4: Create a Basic Stock Chart

Create a new view or update an existing one with a Stock Chart container:

```cshtml
<!-- ~/Views/Home/StockChart.cshtml -->
@using Syncfusion.EJ2
@{
    ViewBag.Title = "Stock Chart";
}

<div class="container mt-5">
    <h1>Stock Price Chart</h1>

    @(Html.EJS().StockChart("stockChart")
        .Title("Apple Stock Price")
        .Width("100%")
        .Height("400px")
        .PrimaryXAxis(xaxis =>
            xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
                 .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Days)
                 .MajorGridLines(mg => mg.Width(0))
        )
        .PrimaryYAxis(yaxis =>
            yaxis.LabelFormat("${value}")
        )
        .Periods(pr =>
        {
            pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(7).Text("1W").Add();
            pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(1).Text("1M").Add();
            pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(3).Text("3M").Add();
            pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(6).Text("6M").Add();
            pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Interval(1).Text("1Y").Add();
        })
        .Series(sr =>
        {
            sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource("stockData")
              .XName("x")
              .YName("close")
              .Low("low")
              .High("high")
              .Open("open")
              .Close("close")
              .Add();
        })
        .Render())
</div>

<script>
    // Sample stock data
    var stockData = [
        { x: new Date(2023, 0, 1), open: 100, high: 105, low: 98, close: 103 },
        { x: new Date(2023, 0, 2), open: 103, high: 110, low: 102, close: 108 },
        { x: new Date(2023, 0, 3), open: 108, high: 109, low: 100, close: 102 },
        { x: new Date(2023, 0, 4), open: 102, high: 115, low: 101, close: 114 },
        { x: new Date(2023, 0, 5), open: 114, high: 116, low: 105, close: 112 }
    ];
</script>
```

## Step 5: Test Your Implementation

1. Build and run your ASP.NET MVC application
2. Navigate to the page containing your stock chart
3. You should see a candlestick chart with 5 data points and range selector buttons below it
4. Click the range buttons (1W, 1M, 1M, 3M, 6M, 1Y) to filter the date range

## Common Issues and Solutions

### Issue: Chart Not Appearing
- Verify that the CDN links are accessible (check browser console for 404 errors)
- Ensure the container div `#stockChart` exists before the script runs
- Check that jQuery is loaded before Syncfusion scripts

### Issue: Candlestick Data Not Displaying Correctly
- Verify data has `open`, `high`, `low`, `close` properties
- Check that dates are valid JavaScript Date objects
- Ensure `low: 'low'`, `high: 'high'`, `open: 'open'` properties match your data

### Issue: Script Manager Error
- Ensure `@Html.EJS().ScriptManager()` is included once per page
- Place it before closing body tag

### Issue: Styling Not Applied
- Verify CSS URL in the `<link>` tag is correct
- Clear browser cache and reload
- Check for CDN connectivity issues

## Next Steps

After setting up the basic chart:
- Customize the appearance with themes and colors
- Add technical indicators for analysis
- Configure range and period selectors
- Bind real financial data from a database or API
- Add export functionality to save as image or PDF

## File Structure After Setup

```
YourProject/
├── Views/
│   ├── Shared/
│   │   └── _Layout.cshtml (with CSS/JS includes)
│   └── Home/
│       └── StockChart.cshtml (chart view)
├── Controllers/
│   └── HomeController.cs
└── Web.config
```

## Troubleshooting Data Binding

If your chart displays but shows no data:

```cshtml
<script>
    // Debug: Check if data is loading
    console.log('Data points:', stockData.length);
    console.log('First point:', stockData[0]);

    var chart = document.getElementById('stockChart').ej2_instances[0];
    console.log('Chart data source:', chart.series[0].dataSource);

    // Verify required fields
    stockData.forEach(point => {
        if (!point.x || point.open === undefined || point.high === undefined || point.low === undefined || point.close === undefined) {
            console.warn('Invalid data point:', point);
        }
    });
</script>
```

This foundational setup enables you to build upon Stock Chart features like indicators, trend lines, and interactive selectors.