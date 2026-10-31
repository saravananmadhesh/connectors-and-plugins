# Customization and Styling

## Table of Contents
- [Overview](#overview)
- [Themes](#themes)
  - [Available Themes](#available-themes)
  - [Apply Theme via JavaScript](#apply-theme-via-javascript)
  - [Dark Theme Support](#dark-theme-support)
- [Chart Title and Subtitle](#chart-title-and-subtitle)
  - [Basic Title Configuration](#basic-title-configuration)
  - [Title Alignment and Position](#title-alignment-and-position)
- [Legend Configuration](#legend-configuration)
  - [Basic Legend](#basic-legend)
  - [Legend Customization](#legend-customization)
  - [Toggle Series Visibility from Legend](#toggle-series-visibility-from-legend)
- [Tooltip Styling](#tooltip-styling)
  - [Basic Tooltip](#basic-tooltip)
  - [Custom Tooltip Format](#custom-tooltip-format)
  - [Styling Tooltip](#styling-tooltip)
  - [Template Tooltip](#template-tooltip)
- [Colors and Gradients](#colors-and-gradients)
  - [Series Colors](#series-colors)
  - [Gradient Colors](#gradient-colors)
  - [Custom Palette](#custom-palette)
- [Font Customization](#font-customization)
  - [Global Font Settings](#global-font-settings)
  - [Google Fonts Integration](#google-fonts-integration)
- [Responsive Design](#responsive-design)
  - [Responsive Size](#responsive-size)
  - [Container with Bootstrap](#container-with-bootstrap)
  - [Mobile Optimization](#mobile-optimization)
- [CSS Customization](#css-customization)
  - [Override Theme Styles](#override-theme-styles)
  - [Theme Variables (Material)](#theme-variables-material)
- [Complete Customization Example](#complete-customization-example)

## Overview

Stock Chart offers extensive customization for professional styling. Control colors, fonts, spacing, themes, and responsive behavior to match your application design.

## Themes

Syncfusion provides built-in themes. Apply at chart creation or change dynamically.

### Available Themes

```html
<!-- Material Design (default, light) -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />

<!-- Bootstrap 4 -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap4.css" />

<!-- Bootstrap 5 -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css" />

<!-- Tailwind CSS -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind.css" />

<!-- Fabric Design -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fabric.css" />

<!-- High Contrast (accessibility) -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/highcontrast.css" />
```

### Apply Theme via JavaScript

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Material)
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Dark Theme Support

```html
<!-- Material Dark -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material-dark.css" />

<!-- Bootstrap Dark -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap-dark.css" />

<!-- Tailwind Dark -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind-dark.css" />
```

## Chart Title and Subtitle

### Basic Title Configuration

```cshtml
@using Syncfusion.EJ2

<div>
    <div style="font-family: Segoe UI; font-size: 14px; color: #666; margin-bottom: 6px;">Last 12 Months</div>

    @(Html.EJS().StockChart("stockChart")
        .Title("Apple Stock Price")
        .TitleStyle(ts => ts
            .FontFamily("Segoe UI")
            .FontStyle("italic")
            .FontWeight("500")
            .Size("16px")
            .Color("#333"))
        .Series(sr =>
        {
            sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource("stockData")
              .XName("x")
              .Open("open")
              .High("high")
              .Low("low")
              .Close("close")
              .Add();
        })
        .Render())
</div>

<script>
    var stockData = window.stockData || [];
</script>
```

### Title Alignment and Position

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Stock Price Analysis")
    .Background("#f5f5f5")
    .TitleStyle(ts => ts
        .Size("18px")
        .Color("#1976d2")
        .TextAlignment(Syncfusion.EJ2.Charts.TextAlignment.Center))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Legend Configuration

### Basic Legend

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
        .Alignment(Syncfusion.EJ2.Charts.Alignment.Center))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .Name("AAPL")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Legend Customization

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .Name("AAPL")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.legendSettings = {
            visible: true,
            position: 'Right',
            background: 'white',
            border: { width: 1, color: '#ddd' },
            padding: 15,
            labelPosition: 'Before',
            textStyle: {
                fontFamily: 'Arial',
                size: '12px',
                color: '#666'
            },
            width: '150px',
            height: '100px'
        };
    }
</script>
```

### Toggle Series Visibility from Legend

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .LegendSettings(legend => legend
        .Visible(true))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .Name("AAPL")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.legendSettings = {
            visible: true,
            toggleVisibility: true
        };
    }
</script>
```

## Tooltip Styling

### Basic Tooltip

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tp => tp
        .Enable(true)
        .Shared(true))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Custom Tooltip Format

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tp => tp
        .Enable(true)
        .Shared(true)
        .Format("<b>${point.x}</b><br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}"))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Styling Tooltip

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Tooltip(tp => tp
        .Enable(true)
        .Fill("rgba(0, 0, 0, 0.8)"))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.tooltip = {
            enable: true,
            fill: 'rgba(0, 0, 0, 0.8)',
            border: {
                width: 1,
                color: '#ddd'
            },
            textStyle: {
                fontFamily: 'Arial',
                size: '12px',
                color: 'white'
            },
            enableAnimation: true
        };
    }
</script>
```

### Template Tooltip

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tp => tp
        .Enable(true)
        .Template("<div style='background: #f0f0f0; padding: 10px; border-radius: 5px;'><p><b>Price: ${point.close}</b></p><p>Date: ${point.x}</p></div>"))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Colors and Gradients

### Series Colors

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Close("close")
          .Open("open")
          .High("high")
          .Low("low")
          .BullFillColor("#00c292")
          .BearFillColor("#ef5350")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Gradient Colors

```cshtml
@using Syncfusion.EJ2

<svg style="width:1px; height:1px">
    <defs>
        <linearGradient id="gradient">
            <stop offset="0%" style="stop-color:#1976d2;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#64b5f6;stop-opacity:0.1" />
        </linearGradient>
    </defs>
</svg>

@(Html.EJS().Chart("chart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .DataSource("data")
              .XName("x")
              .YName("value")
              .Fill("url(#gradient)")
              .Border(br => br.Width(2).Color("#1976d2"))
              .Add();
    })
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Render())

<script>
    var data = window.data || [];
</script>
```

### Custom Palette

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().Chart("chart")
    .Palettes(new string[] { "#1976d2", "#f44336", "#4caf50", "#ff9800", "#9c27b0" })
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource("series1")
              .XName("x")
              .YName("y")
              .Name("Series 1")
              .Add();

        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource("series2")
              .XName("x")
              .YName("y")
              .Name("Series 2")
              .Add();
    })
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Render())

<script>
    var series1 = window.series1 || [];
    var series2 = window.series2 || [];
</script>
```

## Font Customization

### Global Font Settings

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.LabelStyle(ls => ls
            .FontFamily("Segoe UI")
            .Size("12px")
            .Color("#666")
            .FontStyle("normal")
            .FontWeight("400")))
    .PrimaryYAxis(yaxis =>
        yaxis.LabelStyle(ls => ls
            .FontFamily("Segoe UI")
            .Size("12px")
            .Color("#666")))
    .Title("Apple Stock Price")
    .TitleStyle(ts => ts
        .FontFamily("Segoe UI")
        .Size("16px")
        .FontWeight("bold")
        .Color("#333"))
    .LegendSettings(legend => legend
        .Visible(true)
        .TextStyle(ts => ts
            .FontFamily("Segoe UI")
            .Size("12px")
            .Color("#333")))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Name("AAPL")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Google Fonts Integration

```html
<!-- Include Google Font in HTML head -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price")
    .TitleStyle(ts => ts
        .FontFamily("Roboto, sans-serif")
        .Size("16px"))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Responsive Design

### Responsive Size

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Width("100%")
    .Height("400px")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    window.addEventListener('resize', function () {
        var element = document.getElementById('stockChart');
        if (element) {
            console.log('Chart resized to:', element.offsetWidth, 'x', element.offsetHeight);
        }
    });
</script>
```

### Container with Bootstrap

```html
<!-- Bootstrap responsive container -->
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div style="width: 100%; height: 400px;">
                @using Syncfusion.EJ2

                @(Html.EJS().StockChart("stockChart")
                    .Width("100%")
                    .Height("100%")
                    .Series(sr =>
                    {
                        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
                          .DataSource("stockData")
                          .XName("x")
                          .Open("open")
                          .High("high")
                          .Low("low")
                          .Close("close")
                          .Add();
                    })
                    .Render())
            </div>
        </div>
    </div>
</div>

<script>
    var stockData = window.stockData || [];
</script>
```

### Mobile Optimization

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Name("AAPL")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.width = window.innerWidth < 768 ? '100%' : '80%';
        args.stockChart.height = window.innerHeight < 600 ? '300px' : '500px';
        args.stockChart.primaryXAxis = {
            labelRotation: window.innerWidth < 768 ? 45 : 0
        };
        args.stockChart.legendSettings = {
            position: window.innerWidth < 768 ? 'Bottom' : 'Right'
        };
    }
</script>
```

## CSS Customization

### Override Theme Styles

```css
/* Override candlestick colors */
.e-stockchart .e-chart-series path {
    stroke-width: 1px;
}

/* Customize axis labels */
.e-stockchart .e-axis-label {
    font-family: 'Arial', sans-serif;
    font-size: 12px;
}

/* Modify legend styling */
.e-stockchart .e-legend {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
}

/* Customize tooltip */
.e-stockchart .e-tooltip {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
}
```

### Theme Variables (Material)

```css
/* Override Material theme variables */
:root {
    --bs-primary: #1976d2;
    --bs-danger: #f44336;
    --bs-success: #4caf50;
}
```

## Complete Customization Example

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Width("100%")
    .Height("500px")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Material)
    .Background("#ffffff")
    .Title("Tech Stock Analysis")
    .TitleStyle(ts => ts
        .FontFamily("Segoe UI")
        .Size("18px")
        .FontWeight("bold")
        .Color("#1976d2"))
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .LabelStyle(ls => ls
                 .FontFamily("Arial")
                 .Size("11px"))
             .LabelRotation(45))
    .PrimaryYAxis(yaxis =>
        yaxis.LabelFormat("${value}")
             .LabelStyle(ls => ls
                 .FontFamily("Arial")
                 .Size("11px"))
             .Title("Price (USD)")
             .TitleStyle(ts => ts
                 .FontFamily("Segoe UI")
                 .Size("12px")))
    .LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
        .TextStyle(ts => ts
            .FontFamily("Arial")
            .Size("12px")
            .Color("#666")))
    .Tooltip(tp => tp
        .Enable(true)
        .Shared(true)
       .TitleStyle( new {
            fontFamily = "Segoe UI",
            size = "12px"}))
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(7).Text("1W").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(1).Text("1M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(3).Text("3M").Add();
    })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .Close("close")
          .Open("open")
          .High("high")
          .Low("low")
          .BullFillColor("#00c292")
          .BearFillColor("#ef5350")
          .Name("AAPL")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.tooltip = {
            enable: true,
            shared: true,
            textStyle: {
                fontFamily: 'Arial',
                size: '12px'
            }
        };
    }
</script>
```

Professional styling transforms Stock Charts into polished, branded data visualizations that match your application's design system.
