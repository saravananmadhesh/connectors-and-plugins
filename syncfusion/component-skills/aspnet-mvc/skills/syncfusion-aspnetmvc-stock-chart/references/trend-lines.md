# Trend Lines

## Table of Contents
- [Overview](#overview)
- [Linear Trend Line](#linear-trend-line)
  - [Basic Linear Trend](#basic-linear-trend)
  - [Customizing Linear Trend](#customizing-linear-trend)
  - [Linear Trend Example](#linear-trend-example)
- [Exponential Trend Line](#exponential-trend-line)
- [Power Trend Line](#power-trend-line)
- [Logarithmic Trend Line](#logarithmic-trend-line)
- [Polynomial Trend Line](#polynomial-trend-line)
  - [Quadratic (Degree 2)](#quadratic-degree-2)
  - [Cubic (Degree 3)](#cubic-degree-3)
- [Moving Average Trend Line](#moving-average-trend-line)
- [Configuration Options](#configuration-options)
  - [Common Trend Line Properties](#common-trend-line-properties)
  - [Forecast Options](#forecast-options)
- [Multiple Trend Lines](#multiple-trend-lines)
- [Dynamic Trend Lines](#dynamic-trend-lines)
  - [Add Trend Line After Creation](#add-trend-line-after-creation)
  - [Remove Trend Line](#remove-trend-line)
  - [Update Trend Line](#update-trend-line)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Support/Resistance Analysis](#pattern-1-supportresistance-analysis)
  - [Pattern 2: Trend Direction Confirmation](#pattern-2-trend-direction-confirmation)
  - [Pattern 3: Multi-Timeframe Analysis](#pattern-3-multi-timeframe-analysis)
  - [Pattern 4: Forecast Visualization](#pattern-4-forecast-visualization)
- [Styling Combinations](#styling-combinations)
  - [Trend + Forecast Visualization](#trend--forecast-visualization)
  - [Comparing Trend Types](#comparing-trend-types)
- [Best Practices](#best-practices)
  - [Avoid Cluttering](#avoid-cluttering)
  - [Choose Appropriate Type](#choose-appropriate-type)
  - [Forecast Usage](#forecast-usage)
  
## Overview

Trend lines help identify price direction and support/resistance levels. Stock Chart supports multiple trend line types overlaid on price data for technical analysis.

Supported trend line types:
- **Linear** - Straight line through highs/lows
- **Exponential** - Curved exponential growth
- **Power** - Curved power function
- **Logarithmic** - Logarithmic curve
- **Polynomial** - Polynomial curve (specified degree)
- **Moving Average** - Smooth trend based on moving average

## Linear Trend Line

The most common trend line - fits a straight line through price points.

### Basic Linear Trend

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                backwardForecast: 0,    // No forecast back
                forwardForecast: 5      // Forecast 5 data points forward
            }
        ];
    }
</script>
```

### Customizing Linear Trend

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                
                // Line appearance
                fill: '#ff6f00',
                width: 2,
                dashArray: '5,5',          // Dashed line
                opacity: 0.7,
                
                // Forecast
                backwardForecast: 0,
                forwardForecast: 10,
                
                // Legend
                name: 'Trend'
            }
        ];
    }
</script>
```

### Linear Trend Example

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                fill: '#1976d2',
                width: 2,
                forwardForecast: 5  // Show where trend is heading
            }
        ];
    }
</script>
```

## Exponential Trend Line

Models exponential growth or decay - useful for rapidly growing stocks.

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Exponential',
                fill: '#4caf50',
                width: 2,
                forwardForecast: 5
            }
        ];
    }
</script>
```

**Use case:** Stock with rapid growth (tech companies, emerging markets)

## Power Trend Line

Fits a power function - good for accelerating or decelerating trends.

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Power',
                fill: '#9c27b0',
                width: 2
            }
        ];
    }
</script>
```

**Use case:** Stocks with non-linear acceleration patterns

## Logarithmic Trend Line

Models logarithmic growth - prices increase at decreasing rate.

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Logarithmic',
                fill: '#ff5722',
                width: 2,
                forwardForecast: 5
            }
        ];
    }
</script>
```

**Use case:** Mature stocks with slowing growth

## Polynomial Trend Line

Fits a polynomial curve with specified degree.

### Quadratic (Degree 2)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Polynomial',
                polynomialOrder: 2,  // Quadratic
                fill: '#ff9800',
                width: 2
            }
        ];
    }
</script>
```

### Cubic (Degree 3)

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Polynomial',
                polynomialOrder: 3,  // Cubic
                fill: '#ff9800',
                width: 2
            }
        ];
    }
</script>
```

**Use case:** Complex price patterns with multiple turning points

## Moving Average Trend Line

Smooth trend based on moving average - similar to technical indicator but displayed as trend line.

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'MovingAverage',
                period: 20,  // 20-day moving average
                fill: '#00bcd4',
                width: 3
            }
        ];
    }
</script>
```

**Use case:** Simple trend identification without technical indicator overlay

## Configuration Options

### Common Trend Line Properties

```cshtml
<script>
    var trendlineOptions = {
        type: 'Linear',
        
        // Appearance
        fill: '#1976d2',                // Line color
        width: 2,                       // Line width
        dashArray: '5,5',               // Dashed pattern
        opacity: 0.8,                   // Transparency
        
        // Forecasting
        backwardForecast: 0,            // Extend back N points
        forwardForecast: 5,             // Extend forward N points
        
        // Display
        name: 'Trend',                  // Legend name
        
        // For polynomial
        polynomialOrder: 2              // Degree (if type='Polynomial')
    };
</script>
```

### Forecast Options

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                
                // Show trend extending backward
                backwardForecast: 10,  // Show last 10 candles before data starts
                
                // Show trend extending forward
                forwardForecast: 20    // Project next 20 candles
            }
        ];
    }
</script>
```

## Multiple Trend Lines

Combine different trend types to identify primary and secondary trends:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            // Long-term trend (linear)
            {
                type: 'Linear',
                fill: '#1976d2',
                width: 2,
                name: 'Long-term Trend'
            },
            
            // Short-term pattern (polynomial)
            {
                type: 'Polynomial',
                polynomialOrder: 2,
                fill: '#ff9800',
                width: 2,
                name: 'Short-term Pattern'
            }
        ];
    }
</script>
```

## Dynamic Trend Lines

### Add Trend Line After Creation

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
          .DataSource("stockData")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .Render())

<button id="addTrend">Add Trend</button>

<script>
    // Create chart without trend lines
    var chart = document.getElementById('stockChart').ej2_instances[0];
    chart.series[0].trendlines = [];

    // Add trend line when user clicks button
    document.getElementById('addTrend').addEventListener('click', function () {
        chart.series[0].trendlines.push({
            type: 'Linear',
            fill: '#ff6f00',
            width: 2,
            forwardForecast: 5
        });
        
        chart.refresh();
    });
</script>
```

### Remove Trend Line

```cshtml
<script>
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Remove specific trend line
    chart.series[0].trendlines.pop();  // Remove last trend
    chart.refresh();

    // Or remove by index
    chart.series[0].trendlines.splice(0, 1);  // Remove first trend
    chart.refresh();
</script>
```

### Update Trend Line

```cshtml
<script>
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Change trend appearance
    chart.series[0].trendlines[0].fill = '#4caf50';
    chart.series[0].trendlines[0].width = 3;
    chart.refresh();
</script>
```

## Common Patterns

### Pattern 1: Support/Resistance Analysis

Use linear trend lines to identify key levels:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                fill: '#4caf50',         // Green = support
                width: 2,
                dashArray: '10,5'
            },
            {
                type: 'Linear',
                fill: '#f44336',         // Red = resistance
                width: 2,
                dashArray: '10,5'
            }
        ];
    }
</script>
```

### Pattern 2: Trend Direction Confirmation

Add moving average trend for simple confirmation:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'MovingAverage',
                period: 50,
                fill: '#1976d2',
                width: 3,
                name: '50-day Trend'
            }
        ];
    }
</script>
```

### Pattern 3: Multi-Timeframe Analysis

Different polynomial orders for different patterns:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Polynomial',
                polynomialOrder: 1,  // Near-term (almost linear)
                fill: '#ffeb3b',
                width: 1
            },
            {
                type: 'Polynomial',
                polynomialOrder: 3,  // Longer-term (more curve)
                fill: '#1976d2',
                width: 2
            }
        ];
    }
</script>
```

### Pattern 4: Forecast Visualization

Show where trend is heading:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                fill: '#1976d2',
                width: 2,
                
                // Extend backward to show historical trend start
                backwardForecast: 30,  // 30 days back
                
                // Project forward
                forwardForecast: 20    // 20 days forward
            }
        ];
    }
</script>
```

## Styling Combinations

### Trend + Forecast Visualization

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                fill: '#1976d2',           // Solid line for history
                width: 2,
                backwardForecast: 50,      // Show full history
                forwardForecast: 20,       // Project forward
                dashArray: '10,5'          // Dashed = forecast
            }
        ];
    }
</script>
```

### Comparing Trend Types

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Title("AAPL Stock Price")
    .IndicatorType(new List<object>() { })
    .ExportType(new List<object>() { })
    .SeriesType(new List<object>() { })
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .Name("series0")
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
        args.stockChart.series[0].trendlines = [
            {
                type: 'Linear',
                fill: 'rgba(25, 118, 210, 0.8)',
                width: 2,
                name: 'Linear'
            },
            {
                type: 'Exponential',
                fill: 'rgba(76, 175, 80, 0.8)',
                width: 2,
                dashArray: '5,5',
                name: 'Exponential'
            },
            {
                type: 'Logarithmic',
                fill: 'rgba(255, 152, 0, 0.8)',
                width: 2,
                dashArray: '10,5',
                name: 'Logarithmic'
            }
        ];
    }
</script>
```

## Best Practices

### Avoid Cluttering

Too many trend lines confuse analysis:

```cshtml
<script>
    // Good: 1-2 trend lines
    var goodTrendlines = [
        { type: 'Linear' }
    ];

    // Less optimal: Too many types
    var tooManyTrendlines = [
        { type: 'Linear' },
        { type: 'Exponential' },
        { type: 'Power' },
        { type: 'Logarithmic' },
        { type: 'Polynomial', polynomialOrder: 2 },
        { type: 'Polynomial', polynomialOrder: 3 }
    ];
</script>
```

### Choose Appropriate Type

| Trend Type | Best For |
|-----------|----------|
| **Linear** | Clear up/down trends, support/resistance |
| **Exponential** | Rapidly growing stocks |
| **Power** | Accelerating/decelerating trends |
| **Logarithmic** | Maturing stocks with slowing growth |
| **Polynomial** | Complex patterns with multiple turns |
| **Moving Avg** | Simple, smooth trend identification |

### Forecast Usage

- Use **forward forecast** to project trend direction
- Use **backward forecast** to show where trend started
- Longer forecasts are less reliable (avoid >30 points ahead)

Trend lines transform Stock Charts into powerful analytical tools for identifying price patterns and support/resistance levels.