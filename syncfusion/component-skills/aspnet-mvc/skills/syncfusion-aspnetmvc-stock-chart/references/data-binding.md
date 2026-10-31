# Data Binding

## Table of Contents
- [Overview](#overview)
- [Data Structure](#data-structure)
  - [Required Fields for Candlestick/OHLC Series](#required-fields-for-candlestickohlc-series)
  - [Example Data Array](#example-data-array)
- [Binding Data in Stock Chart](#binding-data-in-stock-chart)
  - [Static Array Binding](#static-array-binding)
  - [Programmatic Binding After Creation](#programmatic-binding-after-creation)
- [Data Source Patterns](#data-source-patterns)
  - [From Server (C# Controller)](#from-server-c-controller)
  - [From External API](#from-external-api)
  - [From CSV File](#from-csv-file)
- [Data Validation](#data-validation)
  - [Validate Data Before Binding](#validate-data-before-binding)
- [Real-Time Data Updates](#real-time-data-updates)
  - [Update Single Data Point](#update-single-data-point)
  - [Update in Real-Time Loop](#update-in-real-time-loop)
  - [WebSocket for Real-Time Updates](#websocket-for-real-time-updates)
- [Data Transformation](#data-transformation)
  - [Calculate Moving Average for Line Series](#calculate-moving-average-for-line-series)
  - [Filter Data by Date Range](#filter-data-by-date-range)
  - [Aggregate Data (Daily to Weekly)](#aggregate-data-daily-to-weekly)
- [Performance Tips](#performance-tips)

## Overview

Stock Chart requires properly formatted financial data with date and OHLC (Open, High, Low, Close) values. This guide covers data formats, binding techniques, real-time updates, and transformation patterns.

## Data Structure

### Required Fields for Candlestick/OHLC Series

```cshtml
<script>
    var stockPoint = {
        x: new Date(),      // Timestamp (required)
        open: 150.25,       // Opening price
        high: 155.50,       // Highest price of period
        low: 148.75,        // Lowest price of period
        close: 152.30,      // Closing price
        volume: 2500000     // (Optional) Trading volume
    };
</script>
```

### Example Data Array

```cshtml
<script>
    var stockData = [
        {
            x: new Date(2023, 0, 1),   // January 1, 2023
            open: 150.25,
            high: 155.50,
            low: 148.75,
            close: 152.30,
            volume: 2500000
        },
        {
            x: new Date(2023, 0, 2),   // January 2, 2023
            open: 152.30,
            high: 158.00,
            low: 151.50,
            close: 156.75,
            volume: 3200000
        },
        {
            x: new Date(2023, 0, 3),
            open: 156.75,
            high: 159.25,
            low: 154.00,
            close: 157.50,
            volume: 2800000
        }
    ];
</script>
```

## Binding Data in Stock Chart

### Static Array Binding

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
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
</script>
```

### Programmatic Binding After Creation

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Bind data after creation
    chart.series[0].dataSource = newStockData;
    chart.refresh();  // Redraw with new data
</script>
```

## Data Source Patterns

### From Server (C# Controller)

**Controller Method:**
```csharp
public class StockController : Controller
{
    public JsonResult GetStockData(string symbol)
    {
        var stockData = new List<StockDataPoint>
        {
            new StockDataPoint
            {
                X = new DateTime(2023, 1, 1),
                Open = 150.25,
                High = 155.50,
                Low = 148.75,
                Close = 152.30,
                Volume = 2500000
            },
            // More data points...
        };
        
        return Json(stockData, JsonRequestBehavior.AllowGet);
    }
}

public class StockDataPoint
{
    public DateTime X { get; set; }
    public double Open { get; set; }
    public double High { get; set; }
    public double Low { get; set; }
    public double Close { get; set; }
    public long Volume { get; set; }
}
```

**View (JavaScript):**
```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Fetch data from server
    $.ajax({
        url: '@Url.Action("GetStockData", "Stock")',
        type: 'GET',
        data: { symbol: 'AAPL' },
        success: function(data) {
            // Convert date strings to Date objects
            data.forEach(function (point) {
                point.x = new Date(point.X || point.x);
                point.open = point.Open ?? point.open;
                point.high = point.High ?? point.high;
                point.low = point.Low ?? point.low;
                point.close = point.Close ?? point.close;
                point.volume = point.Volume ?? point.volume;
            });
            
            // Bind to chart
            chart.series[0].dataSource = data;
            chart.refresh();
        }
    });
</script>
```

### From External API

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Fetch from API (example: Alpha Vantage)
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=YOUR_KEY')
        .then(response => response.json())
        .then(data => {
            var timeSeries = data['Time Series (Daily)'];
            var stockData = [];
            
            // Transform API response to chart format
            Object.keys(timeSeries).forEach(dateStr => {
                var quote = timeSeries[dateStr];
                stockData.push({
                    x: new Date(dateStr),
                    open: parseFloat(quote['1. open']),
                    high: parseFloat(quote['2. high']),
                    low: parseFloat(quote['3. low']),
                    close: parseFloat(quote['4. close']),
                    volume: parseInt(quote['6. volume'])
                });
            });
            
            // Bind to chart
            chart.series[0].dataSource = stockData;
            chart.refresh();
        });
</script>
```

### From CSV File

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Load and parse CSV
    function loadCSV(url) {
        fetch(url)
            .then(response => response.text())
            .then(csv => {
                var lines = csv.split('\n');
                var stockData = [];
                
                // Skip header line
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim() === '') continue;
                    
                    var parts = lines[i].split(',');
                    stockData.push({
                        x: new Date(parts[0]),
                        open: parseFloat(parts[1]),
                        high: parseFloat(parts[2]),
                        low: parseFloat(parts[3]),
                        close: parseFloat(parts[4]),
                        volume: parseInt(parts[5])
                    });
                }
                
                chart.series[0].dataSource = stockData;
                chart.refresh();
            });
    }

    loadCSV('/data/stock-prices.csv');
</script>
```

## Data Validation

### Validate Data Before Binding

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
    .Series(sr =>
    {
        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    function validateStockData(data) {
        var errors = [];
        
        data.forEach((point, index) => {
            // Check required fields
            if (!point.x) errors.push(`Point ${index}: Missing date (x)`);
            if (point.open === undefined || point.open === null) errors.push(`Point ${index}: Missing open price`);
            if (point.high === undefined || point.high === null) errors.push(`Point ${index}: Missing high price`);
            if (point.low === undefined || point.low === null) errors.push(`Point ${index}: Missing low price`);
            if (point.close === undefined || point.close === null) errors.push(`Point ${index}: Missing close price`);
            
            // Validate logical constraints
            if (point.high < point.low) {
                errors.push(`Point ${index}: High (${point.high}) < Low (${point.low})`);
            }
            if (point.high < point.open || point.high < point.close) {
                errors.push(`Point ${index}: High not >= Open/Close`);
            }
            if (point.low > point.open || point.low > point.close) {
                errors.push(`Point ${index}: Low not <= Open/Close`);
            }
        });
        
        return errors;
    }

    // Use before binding
    var errors = validateStockData(stockData);
    if (errors.length > 0) {
        console.error('Data validation failed:', errors);
    } else {
        chart.series[0].dataSource = stockData;
        chart.refresh();
    }
</script>
```

## Real-Time Data Updates

### Update Single Data Point

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Add new data point
    var newPoint = {
        x: new Date(),
        open: 155.00,
        high: 157.50,
        low: 154.75,
        close: 156.25,
        volume: 1500000
    };

    // Add to array
    var data = chart.series[0].dataSource;
    data.push(newPoint);

    // Refresh chart
    chart.refresh();
</script>
```

### Update in Real-Time Loop

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Simulate real-time updates every 5 seconds
    var data = chart.series[0].dataSource;

    setInterval(() => {
        // Simulate new price data
        var lastPoint = data[data.length - 1];
        var change = (Math.random() - 0.5) * 5;
        
        var newPoint = {
            x: new Date(),
            open: lastPoint.close,
            high: lastPoint.close + Math.abs(change),
            low: lastPoint.close - Math.abs(change),
            close: lastPoint.close + change,
            volume: Math.floor(Math.random() * 5000000)
        };
        
        data.push(newPoint);
        
        // Keep only last 100 points (performance)
        if (data.length > 100) {
            data.shift();
        }
        
        chart.refresh();
    }, 5000);
</script>
```

### WebSocket for Real-Time Updates

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    // Connect to WebSocket
    var ws = new WebSocket('wss://api.example.com/stock-stream');

    ws.onmessage = function(event) {
        var priceUpdate = JSON.parse(event.data);
        
        // Transform to data point
        var newPoint = {
            x: new Date(priceUpdate.timestamp),
            open: priceUpdate.open,
            high: priceUpdate.high,
            low: priceUpdate.low,
            close: priceUpdate.close,
            volume: priceUpdate.volume
        };
        
        // Update chart
        var data = chart.series[0].dataSource;
        data.push(newPoint);
        
        // Limit to last 500 points
        if (data.length > 500) {
            data.shift();
        }
        
        chart.refresh();
    };

    ws.onerror = function(error) {
        console.error('WebSocket error:', error);
    };
</script>
```

## Data Transformation

### Calculate Moving Average for Line Series

```cshtml
@using Syncfusion.EJ2

<script>
    function calculateMovingAverage(data, period) {
        var ma = [];
        
        for (let i = period - 1; i < data.length; i++) {
            var sum = 0;
            for (let j = 0; j < period; j++) {
                sum += data[i - j].close;
            }
            
            ma.push({
                x: data[i].x,
                ma: sum / period
            });
        }
        
        return ma;
    }

    // Use in chart
    var movingAvg = calculateMovingAverage(stockData, 20);
</script>

@(Html.EJS().StockChart("stockChart")
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

        sr.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .DataSource("movingAvg")
          .XName("x")
          .YName("ma")
          .Width(2)
          .Fill("#ff9800")
          .Add();
    })
    .Render())
```

### Filter Data by Date Range

```cshtml
@using Syncfusion.EJ2

@(Html.EJS().StockChart("stockChart")
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
    var chart = document.getElementById('stockChart').ej2_instances[0];

    function filterByDateRange(data, startDate, endDate) {
        return data.filter(point => {
            return point.x >= startDate && point.x <= endDate;
        });
    }

    // Filter last 30 days
    var thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    var filteredData = filterByDateRange(stockData, thirtyDaysAgo, new Date());
    chart.series[0].dataSource = filteredData;
    chart.refresh();
</script>
```

### Aggregate Data (Daily to Weekly)

```cshtml
<script>
    function aggregateDailyToWeekly(data) {
        var weekly = [];
        var currentWeek = null;
        
        data.forEach(point => {
            var weekStart = new Date(point.x);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of week
            
            if (!currentWeek || currentWeek.x.getTime() !== weekStart.getTime()) {
                if (currentWeek) {
                    weekly.push(currentWeek);
                }
                currentWeek = {
                    x: weekStart,
                    open: point.open,
                    high: point.high,
                    low: point.low,
                    close: point.close,
                    volume: point.volume || 0
                };
            } else {
                // Update high/low for the week
                currentWeek.high = Math.max(currentWeek.high, point.high);
                currentWeek.low = Math.min(currentWeek.low, point.low);
                currentWeek.close = point.close;
                currentWeek.volume += (point.volume || 0);
            }
        });
        
        if (currentWeek) {
            weekly.push(currentWeek);
        }
        
        return weekly;
    }
</script>
```

## Performance Tips

- **Large Datasets:** Limit visible data points to ~1000 for smooth scrolling
- **Real-Time Updates:** Use `chart.refresh()` sparingly; batch updates
- **Memory:** Remove old data when scrolling or maintain rolling window
- **Date Parsing:** Pre-convert date strings to Date objects before binding
- **Validation:** Cache validation results, validate once before binding

Data binding flexibility allows seamless integration with any financial data source while maintaining professional visualization.