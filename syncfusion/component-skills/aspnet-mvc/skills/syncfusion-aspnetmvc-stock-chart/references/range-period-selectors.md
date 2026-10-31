# Range and Period Selectors

## Table of Contents
- [Overview](#overview)
- [Range Selector](#range-selector)
  - [Basic Range Selector](#basic-range-selector)
  - [Range Selector Properties](#range-selector-properties)
  - [Range Selector Date Inputs](#range-selector-date-inputs)
- [Period Selector](#period-selector)
  - [Basic Period Selector](#basic-period-selector)
  - [Common Period Intervals](#common-period-intervals)
  - [Custom Period Labels](#custom-period-labels)
- [Configuration](#configuration)
  - [Complete Selector Setup](#complete-selector-setup)
  - [Selector Styling](#selector-styling)
- [Advanced Usage](#advanced-usage)
  - [Programmatic Date Selection](#programmatic-date-selection)
  - [Listen for Range Changes](#listen-for-range-changes)
  - [Dynamic Period Buttons](#dynamic-period-buttons)
  - [Hide Range Selector](#hide-range-selector)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Stock Analysis (Full Range Control)](#pattern-1-stock-analysis-full-range-control)
  - [Pattern 2: Quarterly Reporting (Business Focus)](#pattern-2-quarterly-reporting-business-focus)
  - [Pattern 3: Intraday Trading (Minute-Level Detail)](#pattern-3-intraday-trading-minute-level-detail)
  - [Pattern 4: Financial Dashboard (Minimal Controls)](#pattern-4-financial-dashboard-minimal-controls)
  - [Pattern 5: Compare with Previous Period](#pattern-5-compare-with-previous-period)
- [Date Range Validation](#date-range-validation)
  - [Ensure Valid Range](#ensure-valid-range)
- [Performance Considerations](#performance-considerations)

## Overview

Stock Chart provides two selection mechanisms for navigating time-series data:

- **Range Selector** - Custom date range picker with start/end date inputs
- **Period Selector** - Preset buttons (1W, 1M, 3M, 6M, 1Y, etc.) for quick navigation
- Both enable zooming the chart to specific time periods
- Can be used together for maximum flexibility

## Range Selector

The Range Selector displays a horizontal bar below the chart with preset period buttons and a date range input.

### Basic Range Selector

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
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

### Range Selector Properties

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
    .EnableCustomRange(true)
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(1).Text("1D").Add();
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

        // Default range
        if (chart.rangeNavigator) {
            chart.rangeNavigator.value = [new Date(2023, 0, 1), new Date(2023, 3, 1)];
            chart.rangeNavigator.refresh();
        }
    });
</script>
```

### Range Selector Date Inputs

Enable custom start/end date picker:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
    .EnableCustomRange(true)
    .Periods(pr =>
    {
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

        // Custom date inputs below
        if (chart.rangeNavigator) {
            chart.rangeNavigator.value = [new Date(2023, 0, 1), new Date(2023, 3, 1)];
            chart.rangeNavigator.refresh();
        }
    });
</script>
```

Users can then click on date fields to enter custom dates.

## Period Selector

The Period Selector displays quick-access buttons for common time ranges.

### Basic Period Selector

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(1).Text("1D").Add();
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

### Common Period Intervals

| Interval Type | Interval | Text | Use Case |
|---------------|----------|------|----------|
| Days | 1 | 1D | Intraday trading |
| Days | 7 | 1W | Weekly trend |
| Months | 1 | 1M | Monthly overview |
| Months | 3 | 3M | Quarterly analysis |
| Months | 6 | 6M | Half-year trend |
| Years | 1 | 1Y | Annual comparison |
| Years | 2 | 2Y | Multi-year trend |
| Years | 5 | 5Y | Long-term analysis |

### Custom Period Labels

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Hours).Interval(1).Text("1H").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Hours).Interval(4).Text("4H").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(1).Text("Today").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(7).Text("This Week").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(1).Text("This Month").Add();
    })
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
</script>
```

## Configuration

### Complete Selector Setup

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    // Primary time axis
    .PrimaryXAxis(xaxis =>
        xaxis.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
             .IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days)
    )
    // Range selector (bottom bar)
    .EnableSelector(true)
    .EnableCustomRange(true)
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(7).Text("1W").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(1).Text("1M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(3).Text("3M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(6).Text("6M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Interval(1).Text("1Y").Add();
    })
    // Series data
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
          .DataSource("stockData")
          .XName("x")
          .YName("close")
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
        if (chart.rangeNavigator) {
            chart.rangeNavigator.value = [new Date(2023, 0, 1), new Date(2023, 6, 1)];
            chart.rangeNavigator.refresh();
        }
    });
</script>
```

### Selector Styling

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
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

<style>
    /* Label styling */
    #stockChart .e-range-navigator .e-axis-label {
        font-family: 'Segoe UI';
        font-size: 12px;
        color: #666;
    }

    /* Button styling */
    #stockChart .e-period-selector .e-btn {
        font-family: 'Segoe UI';
        font-size: 12px;
    }
</style>

<script>
    var stockData = window.stockData || [];
</script>
```

## Advanced Usage

### Programmatic Date Selection

```cshtml
<script>
    // Select a specific date range
    var startDate = new Date(2023, 0, 1);
    var endDate = new Date(2023, 2, 31);

    var chart = document.getElementById('stockChart').ej2_instances[0];
    if (chart.rangeNavigator) {
        chart.rangeNavigator.value = [startDate, endDate];
        chart.rangeNavigator.refresh();
    }
</script>
```

### Listen for Range Changes

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
    .EnableCustomRange(true)
    .Periods(pr =>
    {
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    chart.rangeChange = function(args) {
        console.log('Range changed:', args.start, 'to', args.end);
        
        // Custom action when range changes
        loadAdditionalData(args.start, args.end);
    };
</script>
```

### Dynamic Period Buttons

```cshtml
<script>
    // Add/remove period buttons dynamically
    var newPeriods = [
        { intervalType: 'Days', interval: 1, text: '1D' },
        { intervalType: 'Months', interval: 1, text: '1M' },
        { intervalType: 'Years', interval: 1, text: '1Y' }
    ];

    var chart = document.getElementById('stockChart').ej2_instances[0];
    chart.periods = newPeriods;
    chart.refresh();
</script>
```

### Hide Range Selector

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(false)
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

## Common Patterns

### Pattern 1: Stock Analysis (Full Range Control)

For serious traders who need both quick presets and custom ranges:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
    .EnableCustomRange(true)
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Interval(1).Text("1D").Add();
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
        if (chart.rangeNavigator) {
            chart.rangeNavigator.value = [new Date(2023, 0, 1), new Date()];
            chart.rangeNavigator.refresh();
        }
    });
</script>
```

### Pattern 2: Quarterly Reporting (Business Focus)

For quarterly reports and business analysis:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(1).Text("1M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(3).Text("Q").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Interval(1).Text("1Y").Add();
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

### Pattern 3: Intraday Trading (Minute-Level Detail)

For day traders tracking minute-by-minute changes:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Minutes).Interval(5).Text("5m").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Minutes).Interval(15).Text("15m").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Minutes).Interval(30).Text("30m").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Hours).Interval(1).Text("1H").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Hours).Interval(4).Text("4H").Add();
    })
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
</script>
```

### Pattern 4: Financial Dashboard (Minimal Controls)

For dashboards with pre-selected data:

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
    .EnableCustomRange(true)
    .Periods(pr =>
    {
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(1).Text("1M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Interval(6).Text("6M").Add();
        pr.IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Interval(1).Text("1Y").Add();
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
        if (chart.rangeNavigator) {
            chart.rangeNavigator.value = [
                new Date(new Date().getFullYear() - 1, 0, 1),  // 1 year ago
                new Date()  // Today
            ];
            chart.rangeNavigator.refresh();
        }
    });
</script>
```

### Pattern 5: Compare with Previous Period

```cshtml
@using Syncfusion.EJ2

<script>
    // Data includes current and previous periods
    var periods = [
        { intervalType: 'Months', interval: 1, text: 'This Month' },
        { intervalType: 'Months', interval: 1, text: 'Last Month' }
    ];
</script>

@(Html.EJS().StockChart("stockChart")
    .EnableSelector(true)
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
    var chart = document.getElementById('stockChart').ej2_instances[0];
    chart.periods = periods;
    chart.refresh();
</script>
```

## Date Range Validation

### Ensure Valid Range

```cshtml
<script>
    function setDateRange(chart, startDate, endDate) {
        // Validate dates
        if (startDate > endDate) {
            console.error('Start date must be before end date');
            return false;
        }
        
        // Validate data availability
        var data = chart.series[0].dataSource;
        var minDate = data[0].x;
        var maxDate = data[data.length - 1].x;
        
        if (startDate < minDate || endDate > maxDate) {
            console.warn('Date range outside available data');
            // Clamp to available data
            startDate = new Date(Math.max(startDate.getTime(), minDate.getTime()));
            endDate = new Date(Math.min(endDate.getTime(), maxDate.getTime()));
        }
        
        if (chart.rangeNavigator) {
            chart.rangeNavigator.value = [startDate, endDate];
            chart.rangeNavigator.refresh();
        }
        return true;
    }
</script>
```

## Performance Considerations

- **Large Datasets:** Range selector handles 1000+ points smoothly
- **Custom Dates:** Entering custom dates triggers re-render
- **Period Buttons:** Pre-calculated periods are fast
- **Animation:** Selector changes animate smoothly by default

Selectors make Stock Charts interactive and user-friendly for exploring financial data across different