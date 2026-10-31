# Advanced Features

## Table of Contents
- [Technical Indicators](#technical-indicators)
  - [Moving Average (SMA)](#moving-average-sma)
  - [Exponential Moving Average (EMA)](#exponential-moving-average-ema)
  - [RSI (Relative Strength Index)](#rsi-relative-strength-index)
  - [MACD (Moving Average Convergence Divergence)](#macd-moving-average-convergence-divergence)
  - [Bollinger Bands](#bollinger-bands)
- [Trendlines](#trendlines)
  - [Linear Trendline](#linear-trendline)
  - [Exponential Trendline](#exponential-trendline)
  - [Polynomial Trendline](#polynomial-trendline)
  - [Forecast](#forecast)
- [Error Bars](#error-bars)
  - [Fixed Error Bars](#fixed-error-bars)
  - [Percentage Error Bars](#percentage-error-bars)
  - [Standard Deviation Error Bars](#standard-deviation-error-bars)
  - [Custom Error Bars](#custom-error-bars)
- [Multiple Panes](#multiple-panes)
  - [Stock Chart Pattern](#stock-chart-pattern)
- [Export and Print](#export-and-print)
  - [Export to Image](#export-to-image)
  - [Export to PDF](#export-to-pdf)
  - [Print Chart](#print-chart)
  - [Custom Export](#custom-export)
- [Common Advanced Patterns](#common-advanced-patterns)
  - [Complete Financial Chart](#complete-financial-chart)
- [Troubleshooting](#troubleshooting)
  - [Indicators not appearing](#indicators-not-appearing)
  - [Trendline calculation errors](#trendline-calculation-errors)
  - [Export not working](#export-not-working)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Technical Indicators

Add financial analysis indicators to charts.

### Moving Average (SMA)

```cshtml
@Html.EJS().Chart("technicalChart").Series(series =>
    {
        // Candlestick series
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(ViewBag.StockData)
              .Add();
    }).Indicators(indicators =>
    {
        indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Sma)
                  .SeriesName("Candle")
                  .Period(14)
                  .Field(Syncfusion.EJ2.Charts.FinancialDataFields.Close)
                  .Fill("#FF6347")
                  .Add();
    }).Render()
```

### Exponential Moving Average (EMA)

```cshtml
.Indicators(indicators =>
{
    indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Ema)
              .SeriesName("Candle")
              .Period(12)
              .Fill("#1E90FF")
              .Add();
})
```

### RSI (Relative Strength Index)

```cshtml
.Indicators(indicators =>
{
    indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Rsi)
              .SeriesName("Candle")
              .Period(14)
              .UpperLine(ul => ul.Color("#00FF00"))
              .LowerLine(ll => ll.Color("#FF0000"))
              .Add();
})
```

### MACD (Moving Average Convergence Divergence)

```cshtml
.Indicators(indicators =>
{
    indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Macd)
              .SeriesName("Candle")
              .FastPeriod(12)
              .SlowPeriod(26)
              .Period(9)
              .MacdType(Syncfusion.EJ2.Charts.MacdType.Both)
              .MacdLine(ml => ml.Color("#FF6347"))
              .Add();
})
```

### Bollinger Bands

```cshtml
.Indicators(indicators =>
{
    indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.BollingerBands)
              .SeriesName("Candle")
              .Period(14)
              .StandardDeviation(2)
              .UpperLine(ul => ul.Color("#00FF00"))
              .LowerLine(ll => ll.Color("#FF0000"))
              .Fill("rgba(211, 211, 211, 0.3)")
              .Add();
})
```

**Available Indicators:**
- `Sma` - Simple Moving Average
- `Ema` - Exponential Moving Average
- `Tma` - Triangular Moving Average
- `AccumulationDistribution` - A/D
- `Atr` - Average True Range
- `BollingerBands` - Bollinger Bands
- `Macd` - MACD
- `Momentum` - Momentum
- `Rsi` - RSI
- `Stochastic` - Stochastic Oscillator
- Plus 10+ more indicators

## Trendlines

Add trendlines to identify patterns.

### Linear Trendline

```cshtml
.Series(series =>
{
    series.DataSource(ViewBag.Data)
          .Trendlines(trendline =>
          {
              trendline.Type(Syncfusion.EJ2.Charts.TrendlineTypes.Linear)
                       .Width(2)
                       .Fill("#FF6347")
                       .Name("Linear Trend")
                       .Add();
          }).Add();
})
```

### Exponential Trendline

```cshtml
.Trendlines(trendline =>
{
    trendline.Type(Syncfusion.EJ2.Charts.TrendlineTypes.Exponential)
             .Width(2)
             .Fill("#1E90FF")
             .Marker(marker => marker.Visible(true))
             .Add();
})
```

### Polynomial Trendline

```cshtml
.Trendlines(trendline =>
{
    trendline.Type(Syncfusion.EJ2.Charts.TrendlineTypes.Polynomial)
             .PolynomialOrder(3)
             .Width(2)
             .Fill("#32CD32")
             .Add();
})
```

### Forecast

```cshtml
.Trendlines(trendline =>
{
    trendline.Type(Syncfusion.EJ2.Charts.TrendlineTypes.Linear)
             .ForwardForecast(5)  // Forecast 5 points ahead
             .BackwardForecast(3) // Show 3 points behind
             .Fill("#FF6347")
             .Add();
})
```

**Trendline Types:**
- `Linear` - Linear regression
- `Exponential` - Exponential curve
- `Logarithmic` - Logarithmic curve
- `Polynomial` - Polynomial curve
- `Power` - Power curve
- `MovingAverage` - Moving average

## Error Bars

Display data uncertainty or variability.

### Fixed Error Bars

```cshtml
.Series(series =>
{
    series.DataSource(ViewBag.Data)
          .ErrorBar(eb => eb
              .Visible(true)
              .Mode(Syncfusion.EJ2.Charts.ErrorBarMode.Both)
              .Type(Syncfusion.EJ2.Charts.ErrorBarType.Fixed)
              .VerticalError(3)
              .HorizontalError(2)
              .Color("#FF0000"))
          .Add();
})
```

### Percentage Error Bars

```cshtml
.ErrorBar(eb => eb
    .Visible(true)
    .Type(Syncfusion.EJ2.Charts.ErrorBarType.Percentage)
    .VerticalError(10)  // 10% error
    .Color("#1E90FF"))
```

### Standard Deviation Error Bars

```cshtml
.ErrorBar(eb => eb
    .Visible(true)
    .Type(Syncfusion.EJ2.Charts.ErrorBarType.StandardDeviation)
    .VerticalError(1)  // 1 standard deviation
    .Color("#32CD32"))
```

### Custom Error Bars

```cshtml
@{
    var errorData = new[] {
        new { X = "Jan", Y = 35, ErrorLow = 2, ErrorHigh = 3 },
        new { X = "Feb", Y = 28, ErrorLow = 1.5, ErrorHigh = 2.5 }
    };
}

.Series(series =>
{
    series.DataSource(errorData)
          .ErrorBar(eb => eb
              .Visible(true)
              .Type(Syncfusion.EJ2.Charts.ErrorBarType.Custom)
              .VerticalPositiveError("ErrorHigh")
              .VerticalNegativeError("ErrorLow"))
          .Add();
})
```

## Multiple Panes

Display multiple charts in rows.

```cshtml
@Html.EJS().Chart("multiPane").Rows(rows =>
    {
        rows.Height("40%").Add();
        rows.Height("30%").Add();
        rows.Height("30%").Add();
    }).Axes(axes =>
    {
        axes.RowIndex(1).Name("yAxis1").Add();
        axes.RowIndex(2).Name("yAxis2").Add();
    }).Series(series =>
    {
        // First pane
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(ViewBag.PriceData)
              .Add();
        
        // Second pane
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.VolumeData)
              .YAxisName("yAxis1")
              .Add();
        
        // Third pane
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .DataSource(ViewBag.RSIData)
              .YAxisName("yAxis2")
              .Add();
    }).Render()
```

### Stock Chart Pattern

```cshtml
@Html.EJS().Chart("stockChart").Rows(rows =>
    {
        rows.Height("70%").Add();  // Price chart
        rows.Height("30%").Add();  // Volume chart
    }).Axes(axes =>
    {
        axes.Name("volumeAxis")
            .OpposedPosition(true)
            .RowIndex(1)
            .Minimum(0)
            .Add();
    }).Series(series =>
    {
        // Candlestick
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(ViewBag.StockData)
              .Add();
        
        // Volume bars
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(ViewBag.VolumeData)
              .YAxisName("volumeAxis")
              .Fill("rgba(0, 128, 0, 0.5)")
              .Add();
    }).Indicators(indicators =>
    {
        indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Sma)
                  .Period(14)
                  .Add();
    }).Render()
```

## Export and Print

Export charts to various formats.

### Export to Image

```cshtml
@Html.EJS().Chart("exportChart").Series(series => series.Add()).Render()

@Html.EJS().Button("export").Content("Export PNG").CssClass("e-flat").IsPrimary(true).Render()

<script>
    document.getElementById('export').onclick = function() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        chart.export('PNG', 'chart');
    };
</script>
```

**Export formats:**
- `PNG` - PNG image
- `JPEG` - JPEG image
- `SVG` - Scalable vector graphics
- `PDF` - PDF document

### Export to PDF

```cshtml
<script>
    function exportToPDF() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        chart.export('PDF', 'chart', null, [chart]);
    }
</script>
```

### Print Chart

```cshtml
@Html.EJS().Chart("printChart").Series(series => series.Add()).Render()

@Html.EJS().Button("print").Content("Print Chart").CssClass("e-flat").Render()

<script>
    document.getElementById('print').onclick = function() {
        var chart = document.getElementById('printChart').ej2_instances[0];
        chart.print();
    };
</script>
```

### Custom Export

```cshtml
<script>
    function exportWithOptions() {
        var chart = document.getElementById('exportChart').ej2_instances[0];
        chart.export('PNG', 'chart', null, null, 
                     1920, 1080, // Width, Height
                     true);       // Allow download
    }
</script>
```

## Common Advanced Patterns

### Complete Financial Chart

```cshtml
@Html.EJS().Chart("financialChart").Width("100%").Height("600").Rows(rows =>
    {
        rows.Height("60%").Add();
        rows.Height("20%").Add();
        rows.Height("20%").Add();
    }
    ).Axes(axes =>
    {
        axes.Name("volumeAxis").RowIndex(1).Add();
        axes.Name("rsiAxis").RowIndex(2).Minimum(0).Maximum(100).Add();
    }
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(ViewBag.StockData)
              .Trendlines(tl => tl.Type(Syncfusion.EJ2.Charts.TrendlineTypes.Linear).Add())
              .Add();
        
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .YAxisName("volumeAxis")
              .DataSource(ViewBag.VolumeData)
              .Add();
    }
    ).Indicators(indicators =>
    {
        indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Rsi)
                  .YAxisName("rsiAxis")
                  .Period(14)
                  .Add();
        
        indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Sma)
                  .Period(20)
                  .Add();
    }
    ).Crosshair(ch => ch.Enable(true)
    ).Tooltip(tt => tt.Enable(true).Shared(true)
    ).ZoomSettings(zs => zs.EnableSelectionZooming(true)
    ).Render()
```

## Troubleshooting

### Indicators not appearing
- Verify SeriesName matches actual series name
- Check Period is less than data points count
- Ensure data has required fields (Open, High, Low, Close)

### Trendline calculation errors
- Verify sufficient data points (minimum 2)
- Check data contains valid numeric values
- For polynomial, ensure order < data point count

### Export not working
- Include export script in layout
- Check browser allows downloads
- Verify chart is fully rendered before export

## Best Practices

1. **Technical Indicators**: Use standard periods (14 for RSI, 20 for SMA)
2. **Trendlines**: Don't overfit - use appropriate polynomial order
3. **Error Bars**: Choose appropriate type for data uncertainty
4. **Multiple Panes**: Align axes for time-series data
5. **Export**: Provide user-friendly filename
6. **Performance**: Limit indicators on large datasets

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartIndicator.html
