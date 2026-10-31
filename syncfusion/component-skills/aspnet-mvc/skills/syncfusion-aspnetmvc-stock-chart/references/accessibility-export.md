# Accessibility and Export

## Table of Contents
- [Overview](#overview)
- [Accessibility Features](#accessibility-features)
  - [Enable Accessibility](#enable-accessibility)
  - [Chart Semantics](#chart-semantics)
- [WCAG Compliance](#wcag-compliance)
  - [Color Contrast](#color-contrast)
  - [Sufficient Text Size](#sufficient-text-size)
- [Keyboard Navigation](#keyboard-navigation)
  - [Enable Keyboard Interaction](#enable-keyboard-interaction)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Custom Keyboard Handling](#custom-keyboard-handling)
- [Screen Reader Support](#screen-reader-support)
  - [ARIA Labels](#aria-labels)
  - [Axis Descriptions](#axis-descriptions)
  - [Data Point Descriptions](#data-point-descriptions)
  - [Announcement for Changes](#announcement-for-changes)
- [High Contrast Mode](#high-contrast-mode)
  - [Use High Contrast Theme](#use-high-contrast-theme)
  - [Custom High Contrast Colors](#custom-high-contrast-colors)
- [Exporting Charts](#exporting-charts)
  - [Export to Image (PNG, SVG)](#export-to-image-png-svg)
  - [Export with Custom Parameters](#export-with-custom-parameters)
  - [Programmatic Export](#programmatic-export)
  - [Export Multiple Charts](#export-multiple-charts)
- [Printing](#printing)
  - [Print from Browser](#print-from-browser)
  - [Custom Print Settings](#custom-print-settings)
  - [Print Styling](#print-styling)
  - [Print HTML with Chart](#print-html-with-chart)
- [Accessibility and Export Complete Example](#accessibility-and-export-complete-example)

## Overview

Stock Chart meets accessibility standards (WCAG 2.1) and supports export to multiple formats for sharing and archiving. Enable users with disabilities to interact with charts while providing data export for integration with other tools.

## Accessibility Features

### Enable Accessibility

```cshtml
@using Syncfusion.EJ2

<div role="region" aria-label="Interactive stock chart displaying Apple Inc. historical price data">
    @(Html.EJS().StockChart("stockChart")
        .Title("Apple Stock Price - Last 12 Months")
        .Series(sr =>
        {
            sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource("stockData")
              .XName("date")
              .Open("open")
              .High("high")
              .Low("low")
              .Close("close")
              .Name("Apple Stock Price")
              .Add();
        })
        .Render())
</div>

<script>
    var stockData = window.stockData || [];
</script>
```

### Chart Semantics

```html
<!-- Semantic HTML markup -->
<div role="region" aria-label="Stock Chart">
    <h2 id="chart-title">Apple Stock Price</h2>
    <div id="stockChart" aria-labelledby="chart-title"></div>
    <p id="chart-description">
        This chart displays Apple Inc. stock prices for the last 12 months with candlestick visualization.
    </p>
</div>
```

## WCAG Compliance

Stock Chart implements WCAG 2.1 Level AA standards:

### Color Contrast

Use sufficient color contrast between elements:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .BullFillColor("#00c292")
          .BearFillColor("#d32f2f")
          .Add();
    })
    .PrimaryXAxis(xaxis =>
        xaxis.LabelStyle(ls => ls.Color("#000000"))
    )
    .PrimaryYAxis(yaxis =>
        yaxis.LabelStyle(ls => ls.Color("#000000"))
    )
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Sufficient Text Size

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price - Last 12 Months")
    .TitleStyle(ts => ts.Size("16px"))
    .PrimaryXAxis(xaxis =>
        xaxis.LabelStyle(ls => ls.Size("12px"))
    )
    .PrimaryYAxis(yaxis =>
        yaxis.LabelStyle(ls => ls.Size("12px"))
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
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

## Keyboard Navigation

### Enable Keyboard Interaction

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price - Last 12 Months")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
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

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Focus on chart |
| **Arrow Keys** | Navigate data points |
| **Enter** | Select/toggle point |
| **Escape** | Cancel selection |
| **Alt + Right** | Next data range (range selector) |
| **Alt + Left** | Previous data range |

### Custom Keyboard Handling

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price - Last 12 Months")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    document.addEventListener('DOMContentLoaded', function () {
        var chartElement = document.getElementById('stockChart');
        if (chartElement) {
            chartElement.addEventListener('keydown', function (args) {
                if (args.key === 'ArrowRight') {
                    console.log('Moving right');
                }
                if (args.key === 'Enter') {
                    console.log('Select point');
                }
            });
        }
    });
</script>
```

## Screen Reader Support

### ARIA Labels

```cshtml
@using Syncfusion.EJ2

<div role="region" aria-label="Candlestick chart showing Apple Inc. (AAPL) stock prices over the last 12 months">
    @(Html.EJS().StockChart("stockChart")
        .Title("Apple Stock Price")
        .Series(sr =>
        {
            sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .Name("Apple Stock Price")
              .DataSource("stockData")
              .XName("date")
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

### Axis Descriptions

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis =>
        xaxis.Title("Date")
    )
    .PrimaryYAxis(yaxis =>
        yaxis.Title("Price (USD)")
             .LabelFormat("${value}")
    )
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
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

### Data Point Descriptions

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tt => tt.Enable(true))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .PointRender("pointRender")
    .Render())

<script>
    var stockData = window.stockData || [];

    function pointRender(args) {
        var point = args.point;
        if (point) {
            args.fill = args.fill;
            var description = 'Date ' + point.x + ', Open $' + point.open + ', High $' + point.high + ', Low $' + point.low + ', Close $' + point.close;
            args.point.text = description;
        }
    }
</script>
```

### Announcement for Changes

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Loaded("onChartLoaded")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function onChartLoaded() {
        var announcement = new ej.popups.Toast({
            content: 'Chart data has been updated',
            position: { X: 'Center', Y: 'Top' }
        });
        announcement.appendTo('#toast');
        announcement.show();
    }
</script>

<div id="toast"></div>
```

## High Contrast Mode

### Use High Contrast Theme

```cshtml
<!-- Include high contrast CSS -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/highcontrast.css" />

@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
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

### Custom High Contrast Colors

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Background("#000000")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .BullFillColor("#FFFFFF")
          .BearFillColor("#FFFF00")
          .Add();
    })
    .PrimaryXAxis(xaxis =>
        xaxis.LabelStyle(ls => ls.Color("#FFFFFF").Size("14px"))
             .MajorGridLines(mg => mg.Color("#FFFFFF").Width(2))
    )
    .PrimaryYAxis(yaxis =>
        yaxis.LabelStyle(ls => ls.Color("#FFFFFF").Size("14px"))
             .MajorGridLines(mg => mg.Color("#FFFFFF").Width(2))
    )
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Exporting Charts

### Export to Image (PNG, SVG)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Export as PNG
    chart.export('PNG', 'stock-chart');

    // Export as SVG
    chart.export('SVG', 'stock-chart');

    // Export as PDF
    chart.export('PDF', 'stock-chart');
</script>
```

### Export with Custom Parameters

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
    var chart = document.getElementById('stockChart').ej2_instances[0];

    chart.export('PNG', 'stock-chart', 'Portrait', null, 150, 600);
    //             format, filename,   orientation, controls, width, height
</script>
```

### Programmatic Export

```cshtml
@using Syncfusion.EJ2

<button id="exportBtn">Export</button>

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    // Trigger export on button click
    document.getElementById('exportBtn').addEventListener('click', function () {
        var chart = document.getElementById('stockChart').ej2_instances[0];
        chart.export('PNG', 'stock-analysis-' + new Date().toISOString());
    });
</script>
```

### Export Multiple Charts

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("chart1")
    .Title("AAPL Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData1")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

@(Html.EJS().StockChart("chart2")
    .Title("MSFT Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData2")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

@(Html.EJS().StockChart("chart3")
    .Title("GOOGL Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData3")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData1 = window.stockData1 || [];
    var stockData2 = window.stockData2 || [];
    var stockData3 = window.stockData3 || [];

    // Export multiple charts as PDF
    var chart1 = document.getElementById('chart1').ej2_instances[0];
    var chart2 = document.getElementById('chart2').ej2_instances[0];
    var chart3 = document.getElementById('chart3').ej2_instances[0];

    chart1.export('PDF', 'stock-analysis', 'Portrait', [chart1, chart2, chart3]);
</script>
```

## Printing

### Print from Browser

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("Apple Stock Price")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("date")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Print chart
    chart.print();
</script>
```

### Custom Print Settings

```cshtml
@using Syncfusion.EJ2

<div id="printArea">
    <h1>Stock Analysis Report</h1>

    @(Html.EJS().StockChart("stockChart")
        .Title("Apple Stock Price")
        .Series(sr =>
        {
            sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource("stockData")
              .XName("date")
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

    // Print with custom title
    window.print();

    // Or programmatically
    var printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<h1>Stock Analysis Report</h1>');
    printWindow.document.write(document.getElementById('printArea').innerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
</script>
```

### Print Styling

```css
/* CSS for print stylesheet */
@media print {
    .no-print {
        display: none;
    }
    
    #stockChart {
        width: 100%;
        height: auto;
        page-break-inside: avoid;
    }
    
    .print-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }
}
```

### Print HTML with Chart

```cshtml
@using Syncfusion.EJ2

<button onclick="printChart()">Print Report</button>

<div id="printArea">
    <h1 class="print-title">Stock Price Analysis</h1>
    <p>Report Date: <span id="reportDate"></span></p>

    @(Html.EJS().StockChart("stockChart")
        .Title("Apple Stock Price")
        .Series(sr =>
        {
            sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource("stockData")
              .XName("date")
              .Open("open")
              .High("high")
              .Low("low")
              .Close("close")
              .Add();
        })
        .Render())

    <p>Data Source: Financial API</p>
</div>

<script>
    var stockData = window.stockData || [];
    document.getElementById('reportDate').textContent = new Date().toLocaleDateString();

    function printChart() {
        var printContents = document.getElementById('printArea').innerHTML;
        var printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(printContents);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
</script>
```

## Accessibility and Export Complete Example

```cshtml
@using Syncfusion.EJ2
@using System.Collections.Generic

<div role="region" aria-label="Stock chart with candlestick visualization for AAPL stock">
    @(Html.EJS().StockChart("stockChart")
        .Width("100%")
        .Height("500px")
        .Title("Apple Inc. Stock Price")
        .TitleStyle(ts => ts.Size("16px").Color("#000000"))
        .ExportType(new List<object> { "PNG", "SVG", "PDF" })
        .PrimaryXAxis(xaxis =>
            xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
                 .Title("Date")
                 .LabelStyle(ls => ls.Color("#000000").Size("12px"))
        )
        .PrimaryYAxis(yaxis =>
            yaxis.Title("Price (USD)")
                 .LabelFormat("${value}")
                 .LabelStyle(ls => ls.Color("#000000").Size("12px"))
        )
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
              .BullFillColor("#00c292")
              .BearFillColor("#d32f2f")
              .Add();
        })
        .LegendSettings(lg =>
            lg.Visible(true)
              .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
              .TextStyle(ts => ts.Color("#000000").Size("12px"))
        )
        .Tooltip(tt =>
            tt.Enable(true)
              .Format("Date: ${point.x}<br/>Close: $${point.close}")
        )
        .Render())
</div>

<button id="exportPNG">Export PNG</button>
<button id="exportPDF">Export PDF</button>
<button id="printBtn">Print</button>

<script>
    var stockData = window.stockData || [];

    // Export handlers
    document.getElementById('exportPNG').addEventListener('click', function () {
        var chart = document.getElementById('stockChart').ej2_instances[0];
        chart.export('PNG', 'stock-chart-' + new Date().getTime());
    });

    document.getElementById('exportPDF').addEventListener('click', function () {
        var chart = document.getElementById('stockChart').ej2_instances[0];
        chart.export('PDF', 'stock-report-' + new Date().getTime());
    });

    document.getElementById('printBtn').addEventListener('click', function () {
        var chart = document.getElementById('stockChart').ej2_instances[0];
        chart.print();
    });
</script>
```

Accessibility and export features ensure Stock Charts are inclusive and shareable, enabling all users to access and distribute financial insights.