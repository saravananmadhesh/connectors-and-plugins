# Interactive Features

## Table of Contents
- [Overview](#overview)
- [Cross-hair](#cross-hair)
  - [Enable Cross-hair](#enable-cross-hair)
  - [Cross-hair Customization](#cross-hair-customization)
- [Trackball](#trackball)
  - [Enable Trackball](#enable-trackball)
  - [Trackball with Custom Tooltip](#trackball-with-custom-tooltip)
- [Stock Events](#stock-events)
  - [Basic Stock Events](#basic-stock-events)
  - [Stock Event Types](#stock-event-types)
  - [Styling Stock Events](#styling-stock-events)
  - [Market Open/Close Dividers](#market-openclose-dividers)
- [Legend Interactions](#legend-interactions)
  - [Toggle Visibility](#toggle-visibility)
  - [Legend Click Handling](#legend-click-handling)
- [Data Point Selection](#data-point-selection)
  - [Enable Selection](#enable-selection)
  - [Selection Types](#selection-types)
  - [Custom Selection Styling](#custom-selection-styling)
- [Range Selection](#range-selection)
  - [Enable Range Selection](#enable-range-selection)
  - [Listen to Range Changes](#listen-to-range-changes)
- [Tooltip Configuration](#tooltip-configuration)
  - [Tooltip Format](#tooltip-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Tooltip on Hover](#tooltip-on-hover)
- [Mouse Events](#mouse-events)
  - [Point Mouse Events](#point-mouse-events)
  - [Chart Mouse Events](#chart-mouse-events)
- [Common Interaction Patterns](#common-interaction-patterns)
  - [Pattern 1: Professional Trading Dashboard](#pattern-1-professional-trading-dashboard)
  - [Pattern 2: Simple Analysis Chart](#pattern-2-simple-analysis-chart)
  - [Pattern 3: Educational Dashboard](#pattern-3-educational-dashboard)
  - [Pattern 4: Real-Time Monitoring](#pattern-4-real-time-monitoring)
- [Performance Tips](#performance-tips)

## Overview

Stock Chart provides interactive features for exploring and analyzing financial data. Users can hover for detailed values, select data ranges, toggle series visibility, and track price movements.

Available interactions:
- **Cross-hair and Trackball** - Follow cursor for precise values
- **Stock Events** - Mark market open/close times and special events
- **Legend Interactions** - Toggle series visibility, highlight
- **Tooltips** - Hover information display
- **Selection** - Data point or range selection

## Cross-hair

Displays a cross (+) that tracks the cursor, showing exact values on both axes.

### Enable Cross-hair

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
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Both',        // 'Both', 'Vertical', 'Horizontal'
            line: {
                dashArray: '5,5',    // Dashed pattern
                width: 1,
                color: '#999'
            }
        };
    }
</script>
```

### Cross-hair Customization

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .PrimaryXAxis(xaxis => xaxis.CrosshairTooltip(ct => ct.Enable(true)))
    .PrimaryYAxis(yaxis => yaxis.CrosshairTooltip(ct => ct.Enable(true)))
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
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Vertical',           // Show vertical line only
            line: {
                width: 2,
                color: '#1976d2',
                dashArray: '3,3'
            }
        };

        args.stockChart.primaryXAxis = {
            valueType: 'DateTime',
            crosshairTooltip: {
                enable: true,
                fill: 'rgba(0, 0, 0, 0.8)',
                textStyle: {
                    color: 'white',
                    size: '12px'
                }
            }
        };

        args.stockChart.primaryYAxis = {
            crosshairTooltip: {
                enable: true,
                fill: 'rgba(0, 0, 0, 0.8)',
                textStyle: {
                    color: 'white',
                    size: '12px'
                }
            }
        };
    }
</script>
```

## Trackball

Similar to cross-hair but shows shared tooltip with all series values at that point.

### Enable Trackball

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tp => tp
        .Enable(true)
        .Shared(true))
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
          .Name("Price")
          .Add();

        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("movingAverageData")
          .XName("x")
          .YName("ma")
          .Name("Moving Average")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
    var movingAverageData = window.movingAverageData || [];

    function stockLoad(args) {
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Vertical'  // Trackball line
        };
    }
</script>
```

### Trackball with Custom Tooltip

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tp => tp
        .Enable(true)
        .Shared(true)
        .Format("Point: <b>${point.x}</b><br/>Close: <b>$${point.close}</b><br/>Volume: <b>${point.volume}M</b>"))
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
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Vertical'
        };
    }
</script>
```

## Stock Events

Mark important market events (opening, closing, special announcements) on the chart.

### Basic Stock Events

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis => xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Spline)
          .DataSource("stockData")
          .XName("x")
          .YName("high")
          .Close("high")
          .Add();
    })
    .StockEvents(se =>
    {
        se.Date(new DateTime(2023, 1, 15))
          .Text("Earnings")
          .Description("Q4 Earnings Report")
          .Type(Syncfusion.EJ2.Charts.FlagType.Flag)
          .Add();

        se.Date(new DateTime(2023, 1, 20))
          .Text("Dividend")
          .Description("$0.50 per share")
          .Type(Syncfusion.EJ2.Charts.FlagType.Circle)
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Stock Event Types

| Type | Use Case |
|------|----------|
| **Flag** | Earnings announcements, major news |
| **Circle** | Dividends, splits, regular events |
| **Square** | Technical milestones, price targets |
| **Triangle** | Analyst upgrades/downgrades |

### Styling Stock Events

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis => xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Spline)
          .DataSource("stockData")
          .XName("x")
          .YName("high")
          .Close("high")
          .Add();
    })
    .StockEvents(se =>
    {
        se.Date(new DateTime(2023, 1, 15))
          .Text("Earnings")
          .Type(Syncfusion.EJ2.Charts.FlagType.Flag)
          .Background("#ff9800")
          .Border(br => br.Color("#ff6f00"))
          .TextStyle(ts => ts.Color("white"))
          .Description("Quarterly results")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

### Market Open/Close Dividers

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PrimaryXAxis(xaxis => xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Spline)
          .DataSource("stockData")
          .XName("x")
          .YName("high")
          .Close("high")
          .Add();
    })
    .StockEvents(se =>
    {
        // Market open times
        se.Date(new DateTime(2023, 1, 2, 9, 30, 0))
          .Text("Market Open")
          .Type(Syncfusion.EJ2.Charts.FlagType.Flag)
          .Background("#4caf50")
          .Add();

        // Market close times
        se.Date(new DateTime(2023, 1, 2, 16, 0, 0))
          .Text("Market Close")
          .Type(Syncfusion.EJ2.Charts.FlagType.Flag)
          .Background("#f44336")
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

## Legend Interactions

### Toggle Visibility

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
          .Name("Price")
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
            toggleVisibility: true  // Click legend to show/hide series
        };
    }
</script>
```

### Legend Click Handling

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .LegendSettings(legend => legend.Visible(true))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .Name("Price")
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

    document.addEventListener('DOMContentLoaded', function () {
        var chart = document.getElementById('stockChart').ej2_instances[0];
        chart.legendClick = function (args) {
            console.log('Legend clicked:', args.legendText || args.text);
        };
    });
</script>
```

## Data Point Selection

### Enable Selection

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
          .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.selectionMode = 'Point';  // Select individual points
        args.stockChart.selectionPattern = 'Dots'; // 'Dots', 'DiagonalForward', 'Grid', 'Chessboard'
        args.stockChart.selectedDataIndexes = [];  // Programmatically select points
    }
</script>
```

### Selection Types

| Type | Effect |
|------|--------|
| **Point** | Select individual data points |
| **Series** | Select entire series |
| **Cluster** | Select all points at same X position |
| **Drag** | Drag to select range (if enabled) |

### Custom Selection Styling

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
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

    function stockLoad(args) {
        args.stockChart.selectionMode = 'Point';
        args.stockChart.selectionPattern = 'Dots';
    }
</script>
```

## Range Selection

### Enable Range Selection

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
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

### Listen to Range Changes

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
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
        var chart = document.getElementById('stockChart').ej2_instances[0];

        chart.rangeChange = function (args) {
            console.log('Selected range:', args.start, 'to', args.end);

            // Load additional data or trigger action
            loadDataForRange(args.start, args.end);
        };
    });
</script>
```

## Tooltip Configuration

### Tooltip Format

Use the `Format` property to customize the tooltip content displayed for Stock Chart data points.

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .Format(
            "<b>${series.name}</b><br/>" +
            "Date: ${point.x}<br/>" +
            "Open: ${point.open}<br/>" +
            "High: ${point.high}<br/>" +
            "Low: ${point.low}<br/>" +
            "Close: ${point.close}"
        ))
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource("stockData")
              .XName("x")
              .Open("open")
              .High("high")
              .Low("low")
              .Close("close")
              .Name("Price")
              .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

The following placeholders can be used in a Stock Chart tooltip:

- `${point.x}`: Displays the x-value of the data point.
- `${point.y}`: Displays the y-value for series such as `Line`, `Spline`, or `Area`.
- `${point.open}`: Displays the opening price.
- `${point.high}`: Displays the highest price.
- `${point.low}`: Displays the lowest price.
- `${point.close}`: Displays the closing price.
- `${point.volume}`: Displays the trading volume when available.
- `${series.name}`: Displays the series name.
- `${series.type}`: Displays the series rendering type.
- `${series.opacity}`: Displays the opacity applied to the series.

> **Note:** The availability of point-specific placeholders depends on the fields configured in the data source and the Stock Chart series type.

### Inline Tooltip Formatting

Tooltip values can be formatted directly within the `Format` property by adding DateTime or number format specifiers to supported tooltip placeholders. This allows you to control how Stock Chart values are displayed without using additional events.

Apply a format specifier by adding a colon (`:`) after the placeholder name, followed by the required format.

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .Format(
            "<b>${series.name}</b><br/>" +
            "Date: ${point.x:MMM yyyy}<br/>" +
            "Open: ${point.open:n2}<br/>" +
            "High: ${point.high:n2}<br/>" +
            "Low: ${point.low:n2}<br/>" +
            "Close: ${point.close:n2}<br/>" +
            "Volume: ${point.volume:n0}"
        ))
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource("stockData")
              .XName("x")
              .Open("open")
              .High("high")
              .Low("low")
              .Close("close")
              .Name("Price")
              .Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];
</script>
```

In the above example, `point.x` is displayed in month-year format, the `open`, `high`, `low`, and `close` values are displayed with two decimal places, and `point.volume` is displayed without decimal places.

Inline formatting can be applied to the following tooltip placeholders:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the x-value, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric y-value.
- `${point.open}` or `${point.open:n2}`: Specifies the opening price.
- `${point.high}` or `${point.high:n2}`: Specifies the highest price.
- `${point.low}` or `${point.low:n2}`: Specifies the lowest price.
- `${point.close}` or `${point.close:n2}`: Specifies the closing price.
- `${point.volume}` or `${point.volume:n0}`: Specifies the trading volume.
- `${series.name}`: Specifies the series name.
- `${series.type}`: Specifies the series rendering type.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the series opacity.

> **Important:** The availability of point-specific placeholders depends on the configured data fields and series type. The `${series.name}` and `${series.type}` placeholders return string values, so DateTime or number formatting is not applied to them.

The following formats are supported:

**DateTime formats:**

- `MMM yyyy`: Displays the abbreviated month and four-digit year.
- `MM:yy`: Displays the two-digit month and year.
- `dd MMM`: Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

### Custom Tooltip Template

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Tooltip(tp => tp
        .Enable(true)
        .Template("<div style='padding: 10px; background: white; border: 1px solid #ddd; border-radius: 4px;'><p><b>Date:</b> ${point.x}</p><p><b>Close:</b> $${point.close}</p><p><b>Change:</b> ${point.close - point.open}</p></div>"))
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

### Tooltip on Hover

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
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

    function stockLoad(args) {
        args.stockChart.tooltip = {
            enable: true,
            shared: true
        };
    }
</script>
```

## Mouse Events

### Point Mouse Events

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .PointMove("pointMove")
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

    function pointMove(args) {
    }
</script>
```

### Chart Mouse Events

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .StockChartMouseMove("stockChartMouseMove")
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

    document.addEventListener('DOMContentLoaded', function () {
        var chart = document.getElementById('stockChart').ej2_instances[0];
        var chartElement = document.getElementById('stockChart');

        // When mouse enters / moves on chart
        chartElement.addEventListener('mousemove', function (evt) {
            console.log('Mouse position:', evt.offsetX, evt.offsetY);
        });

        // When series point is clicked
        chart.pointClick = function (args) {
            console.log('Point clicked:', args.point);
        };
    });

    function stockChartMouseMove(args) {
    }
</script>
```

## Common Interaction Patterns

### Pattern 1: Professional Trading Dashboard

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Tooltip(tp => tp
        .Enable(true)
        .Shared(true)
        .Format("Date: <b>${point.x}</b><br/>Open: <b>$${point.open}</b><br/>High: <b>$${point.high}</b><br/>Low: <b>$${point.low}</b><br/>Close: <b>$${point.close}</b><br/>Volume: <b>${point.volume}M</b>"))
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(7).Text("1W").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(1).Text("1M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(3).Text("3M").Add();
    })
    .PrimaryXAxis(xaxis => xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
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
    .StockEvents(se =>
    {
        se.Date(new DateTime(2023, 1, 15)).Text("E").Description("Earnings").Type(Syncfusion.EJ2.Charts.FlagType.Flag).Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Vertical'
        };
    }
</script>
```

### Pattern 2: Simple Analysis Chart

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Tooltip(tp => tp.Enable(true))
    .LegendSettings(legend => legend.Visible(true))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .Name("Price")
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
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Vertical'
        };
        args.stockChart.legendSettings = {
            visible: true,
            toggleVisibility: true
        };
    }
</script>
```

### Pattern 3: Educational Dashboard

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Tooltip(tp => tp
        .Enable(true)
        .Shared(true))
    .LegendSettings(legend => legend.Visible(true))
    .PrimaryXAxis(xaxis => xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime))
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .Name("Price")
          .XName("x")
          .Open("open")
          .High("high")
          .Low("low")
          .Close("close")
          .Add();
    })
    .StockEvents(se =>
    {
        se.Date(new DateTime(2023, 1, 15)).Text("Move").Description("Major move").Type(Syncfusion.EJ2.Charts.FlagType.Flag).Add();
    })
    .Render())

<script>
    var stockData = window.stockData || [];

    function stockLoad(args) {
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Both'
        };
        args.stockChart.legendSettings = {
            visible: true,
            toggleVisibility: true
        };
        args.stockChart.selectionMode = 'Point';
    }
</script>
```

### Pattern 4: Real-Time Monitoring

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Load("stockLoad")
    .Tooltip(tp => tp.Enable(true))
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
        args.stockChart.crosshair = {
            enable: true,
            lineType: 'Vertical'
        };
    }
</script>
```

## Performance Tips

- **Crosshair:** Minimal performance impact
- **Tooltips:** Use templates for complex layouts
- **Stock Events:** 100+ events still perform well
- **Selection:** Handles large datasets smoothly
- **Trackball:** Efficient with many series

Interactions make Stock Charts engaging, exploratory tools rather than static visualizations, enabling users to discover insights in financial data.
``