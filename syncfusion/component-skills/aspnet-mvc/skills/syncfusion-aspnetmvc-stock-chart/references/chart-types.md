# Chart Types and Series

## Table of Contents
- [Overview](#overview)
- [Candlestick Series](#candlestick-series)
  - [Basic Candlestick Implementation](#basic-candlestick-implementation)
  - [Candlestick Appearance](#candlestick-appearance)
  - [Data Structure for Candlestick](#data-structure-for-candlestick)
  - [Customizing Candlestick Colors](#customizing-candlestick-colors)
- [OHLC Series](#ohlc-series)
  - [Basic OHLC Implementation](#basic-ohlc-implementation)
  - [OHLC Appearance](#ohlc-appearance)
  - [Customizing OHLC](#customizing-ohlc)
- [Line Series](#line-series)
  - [Basic Line Series](#basic-line-series)
  - [Line Series without Markers](#line-series-without-markers)
  - [Customizing Line Appearance](#customizing-line-appearance)
- [Area Series](#area-series)
  - [Basic Area Series](#basic-area-series)
  - [Stacked Area for Multiple Data Points](#stacked-area-for-multiple-data-points)
- [Series Selection Guide](#series-selection-guide)
- [Combining Multiple Series](#combining-multiple-series)
  - [Candlestick with Moving Average Line](#candlestick-with-moving-average-line)
  - [Volume Analysis (Candlestick + Area)](#volume-analysis-candlestick--area)
- [Customizing Series Appearance](#customizing-series-appearance)
  - [Common Series Properties](#common-series-properties)
  - [Conditional Coloring](#conditional-coloring)
- [Data Requirements](#data-requirements)
  - [Candlestick/OHLC Series Data](#candlestickohlc-series-data)
  - [Line/Area Series Data](#linearea-series-data)
  - [Validation Checklist](#validation-checklist)

## Overview

Stock Chart supports multiple series types to visualize financial data. Each type highlights different aspects of stock price movements:

- **Candlestick** - Shows open, high, low, close with visual candles (green for up, red for down)
- **OHLC** - Open, High, Low, Close displayed as vertical lines with markers
- **Line** - Connects close prices with a continuous line (often overlaid on candlestick)
- **Area** - Filled area under a line series (volume visualization, overlays)

## Candlestick Series

The candlestick is the most popular way to display stock data. Each data point becomes a "candle" with a body and wicks showing price movement.

### Basic Candlestick Implementation

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
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Candlestick Appearance

- **Green Candle** - Close price > Open price (price went up)
- **Red Candle** - Close price < Open price (price went down)
- **Body (Rectangle)** - Range from open to close price
- **Wicks (Lines)** - Extend to high (top) and low (bottom) prices

### Data Structure for Candlestick

```cshtml
<script>
    var stockData = [
        { 
            x: new Date(2023, 0, 1),  // Date (required)
            open: 100,                // Opening price
            high: 105,                // Highest price of the day
            low: 98,                  // Lowest price of the day
            close: 103,               // Closing price
            volume: 1000000           // (Optional) Volume data
        }
    ];
</script>
```

### Customizing Candlestick Colors

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

## OHLC Series

OHLC (Open, High, Low, Close) represents the same data as candlestick but uses vertical lines with markers instead of boxes.

### Basic OHLC Implementation

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.HiloOpenClose)
          .DataSource("stockData")
          .XName("x")
          .Close("close")
          .Open("open")
          .High("high")
          .Low("low")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### OHLC Appearance

- **Vertical Line** - Extends from low to high price
- **Left Marker** - Indicates opening price
- **Right Marker** - Indicates closing price
- **Colors** - Green for up days, red for down days

### Customizing OHLC

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.HiloOpenClose)
          .DataSource("stockData")
          .XName("x")
          .Close("close")
          .Open("open")
          .High("high")
          .Low("low")
          .BullFillColor("#00c292")
          .BearFillColor("#ef5350")
          .Border(br => br.Width(2).Color("#666"))
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Line Series

Line series connects closing prices with a smooth line. Useful for trend visualization or overlaying on candlestick data.

### Basic Line Series

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("x")
          .YName("close")
          .Marker(mr => mr.Visible(true).Width(8).Height(8).Shape(Syncfusion.EJ2.Charts.ChartShape.Circle))
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Line Series without Markers

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("x")
          .YName("close")
          .Marker(mr => mr.Visible(false))
          .Width(2)
          .Fill("#1976d2")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Customizing Line Appearance

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("x")
          .YName("close")
          .Width(3)
          .Fill("#1976d2")
          .DashArray("5,5")
          .Marker(mr => mr.Visible(true)
                          .Width(8)
                          .Height(8)
                          .Shape(Syncfusion.EJ2.Charts.ChartShape.Diamond)
                          .Border(br => br.Width(2).Color("#1976d2")))
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Area Series

Area series fills the space under a line with color. Useful for volume visualization or highlighting data regions.

### Basic Area Series

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().Chart("chart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .DataSource("stockData")
              .XName("x")
              .YName("volume")
              .Fill("rgba(25, 118, 210, 0.3)")
              .Border(br => br.Width(2).Color("#1976d2"))
              .Add();
    })
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Stacked Area for Multiple Data Points

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().Chart("chart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .DataSource("data1")
              .XName("x")
              .YName("value")
              .Fill("rgba(76, 175, 80, 0.3)")
              .Name("Buy Volume")
              .Add();

        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .DataSource("data2")
              .XName("x")
              .YName("value")
              .Fill("rgba(244, 67, 54, 0.3)")
              .Name("Sell Volume")
              .Add();
    })
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Render())

<script>
    var data1 = window.data1 || [];
    var data2 = window.data2 || [];
</script>
```

## Series Selection Guide

| Series Type | Best For | Key Properties |
|-------------|----------|-----------------|
| **Candlestick** | Primary stock visualization, professional analysis | open, high, low, close |
| **OHLC** | Alternative to candlestick, compact display | open, high, low, close |
| **Line** | Trend lines, moving averages, closing prices only | yName (single value) |
| **Area** | Volume, filled regions, stacked data | yName (single value), fill |

## Combining Multiple Series

Overlay multiple series to compare different metrics or see trends alongside actual prices:

### Candlestick with Moving Average Line

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
          .Name("Stock Price")
          .Add();

        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("movingAverageData")
          .XName("x")
          .YName("ma")
          .Width(2)
          .Fill("#ff9800")
          .Marker(mr => mr.Visible(false))
          .Name("Moving Average")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
    var movingAverageData = window.movingAverageData || [];
</script>
```

### Volume Analysis (Candlestick + Area)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Axes(ax =>
    {
        ax.Name("VolumeAxis")
          .Title("Volume")
          .OpposedPosition(true)
          .Add();
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
          .Add();

        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
          .DataSource("volumeData")
          .XName("x")
          .YName("volume")
          .Fill("rgba(33, 150, 243, 0.2)")
          .YAxisName("VolumeAxis")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
    var volumeData = window.volumeData || [];
</script>
```

## Customizing Series Appearance

### Common Series Properties

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
          .Fill("#1976d2")
          .Opacity(0.8)
          .Border(br => br.Width(1).Color("#333"))
          .Name("Stock Price")
          .Visible(true)
          .Add();
    }).Tooltip(tp => tp.Enable(true).Format("${point.x}: ${point.close}"))
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Conditional Coloring

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PointRender("pointRender")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("stockData")
          .XName("x")
          .YName("close")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function pointRender(args) {
        if (args.point && args.point.close > 100) {
            args.fill = '#00c292';
        } else {
            args.fill = '#ef5350';
        }
    }
</script>
```

## Data Requirements

### Candlestick/OHLC Series Data

All fields are required:

```cshtml
<script>
    var stockData = [
        {
            x: new Date(),      // Timestamp
            open: 100,          // Opening price
            high: 110,          // Highest price
            low: 95,            // Lowest price
            close: 105          // Closing price
        }
    ];
</script>
```

### Line/Area Series Data

Only requires date and single value:

```cshtml
<script>
    var lineData = [
        {
            x: new Date(),      // Timestamp
            value: 105          // Single metric (close price, volume, etc.)
        }
    ];
</script>
```

### Validation Checklist

- ✓ All data points have `x` (date) and required price fields
- ✓ Dates are valid JavaScript Date objects or timestamp numbers
- ✓ High >= Low, High >= Open/Close, Low <= Open/Close (for candlestick)
- ✓ No null or undefined values (or handle with chart properties)
- ✓ Data is sorted by date (ascending)

This flexibility allows you to mix and match series types to create comprehensive financial visualizations tailored to your analysis needs.
``