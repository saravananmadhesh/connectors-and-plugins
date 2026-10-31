# Data Binding & Configuration

## Table of Contents
- [DataSource Property](#datasource-property)
- [Axis Value Type Configuration](#axis-value-type-configuration)
    - [DateTime Axis](#datetime-axis)
    - [Numeric Axis](#numeric-axis-default)
- [OHLC Data Structure](#ohlc-data-structure)
- [Local Data Binding](#local-data-binding)
- [Financial Data Formatting](#financial-data-formatting)
    - [Working with Real Financial Data](#working-with-real-financial-data)
    - [Data Validation](#data-validation)
    - [Handling Decimal Precision](#handling-decimal-precision)
- [Handling Missing Data](#handling-missing-data)
    - [No Data Template](#no-data-template)
    - [Conditional Data Loading](#conditional-data-loading)
    - [Real-time Data Updates](#real-time-data-updates)

## DataSource Property

The `dataSource` property binds data collection to the Stock Chart series. Data can be provided as a list of objects where each object represents a data point.

**Basic syntax:**

```cshtml
@{
    var yourDataCollection = new List<object>
    {
        new { 
            x = new DateTime(2023, 1, 1), 
            open = 150.00, 
            high = 155.50, 
            low = 148.75, 
            close = 152.00, 
            volume = 1000000 
        }
    };
}
<e-stockchart-series 
    dataSource="yourDataCollection" 
    xName="x" 
    yName="close" 
    type="Candle">
</e-stockchart-series>
```

**Property mapping:**
- `dataSource`: Collection of data objects
- `xName`: Property name for X-axis values
- `yName`: Property name for Y-axis values (typically Close price)

## Axis Value Type Configuration

The X-axis `valueType` determines how axis values are interpreted and displayed. For financial data with dates, use DateTime type.

### DateTime Axis

For date-based stock data, configure the primary X-axis with DateTime value type:

```cshtml
<e-stockchart-primaryxaxis valueType="DateTime">
</e-stockchart-primaryxaxis>
```

**Why DateTime is important:**
- Properly formats date labels on X-axis
- Enables date-based axis ranging
- Supports time-based period selection
- Allows zoom/pan based on date ranges

### Numeric Axis (Default)

By default, the axis uses Numeric value type for sequential or numeric data:

```cshtml
<e-stockchart-primaryxaxis valueType="Double">
</e-stockchart-primaryxaxis>
```

Use Numeric when your X-axis contains numeric indices or non-date values.

## OHLC Data Structure

OHLC stands for Open, High, Low, Close - the four essential values for each trading period in stock data.

**Data model definition:**

```csharp
public class StockData
{
    public DateTime x { get; set; }        // Trading date/time
    public double open { get; set; }       // Opening price
    public double high { get; set; }       // Highest price
    public double low { get; set; }        // Lowest price
    public double close { get; set; }      // Closing price
    public long volume { get; set; }       // Trading volume (optional)
}
```

**Meaning of each value:**
- **Open**: Price at market opening
- **High**: Maximum price during the trading period
- **Low**: Minimum price during the trading period
- **Close**: Price at market closing
- **Volume**: Number of shares traded (used by some indicators)

## Local Data Binding

Bind local data collection to Stock Chart series.

**Complete example:**

```cshtml
@{
    var stockData = new List<object>
    {
        new { 
            x = new DateTime(2023, 1, 1), 
            open = 150.00, 
            high = 155.50, 
            low = 148.75, 
            close = 152.00, 
            volume = 1000000 
        },
        new { 
            x = new DateTime(2023, 1, 2), 
            open = 152.00, 
            high = 158.00, 
            low = 151.50, 
            close = 156.50, 
            volume = 1200000 
        },
        new { 
            x = new DateTime(2023, 1, 3), 
            open = 156.50, 
            high = 160.00, 
            low = 150.00, 
            close = 154.00, 
            volume = 900000 
        }
    };
}

<ejs-stockchart id="stockChart">
    <e-stockchart-primaryxaxis valueType="DateTime">
    </e-stockchart-primaryxaxis>
    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="stockData" 
            xName="x" 
            open="open" 
            high="high" 
            low="low" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

## Financial Data Formatting

### Working with Real Financial Data

Financial data typically comes from APIs or databases with consistent formatting requirements.

**Standard format from APIs:**

```json
[
    {
        "date": "2023-01-01",
        "open": 150.00,
        "high": 155.50,
        "low": 148.75,
        "close": 152.00,
        "volume": 1000000
    }
]
```

**Converting to Stock Chart format in C#:**

```csharp
// From API response
var apiData = JsonConvert.DeserializeObject<List<dynamic>>(jsonResponse);

// Transform to Stock Chart format
var chartData = apiData.Select(item => new {
    x = DateTime.Parse(item["date"].ToString()),
    open = (double)item["open"],
    high = (double)item["high"],
    low = (double)item["low"],
    close = (double)item["close"],
    volume = (long)item["volume"]
}).ToList();

// Bind to chart
ViewBag.StockData = chartData;
```

### Data Validation

Ensure data integrity before binding:

```csharp
public bool IsValidStockData(StockData data)
{
    return data.close >= 0 &&
           data.high >= data.close &&
           data.high >= data.open &&
           data.low <= data.close &&
           data.low <= data.open &&
           data.high >= data.low;
}
var stockData = new List<StockData>
{
    new StockData
    {
        x = new DateTime(2023, 1, 1),
        open = 150.00,
        high = 155.50,
        low = 148.75,
        close = 152.00,
        volume = 1000000
    }
};
var validData = stockData.Where(d => IsValidStockData(d)).ToList();
ViewBag.StockData = validData;
```

### Handling Decimal Precision

Financial data requires precise decimal handling:

```cshtml
@{
    decimal openPrice = 150.25m;
    decimal highPrice = 155.50m;

    // Must be a collection (array or list)
    var data = new[] {
        new {
            x = DateTime.Now,
            open = (double)openPrice,
            high = (double)highPrice,
            close = (double)(150.75m),
            low = (double)(148.25m)
        }
    };
}

<ejs-stockchart id="stockChart">
    <e-stockchart-primaryxaxis valueType="DateTime">
    </e-stockchart-primaryxaxis>

    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="@data"
                             xName="x"
                             open="open"
                             high="high"
                             low="low"
                             close="close"
                             type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

## Handling Missing Data

### No Data Template

When chart data is empty, display a custom message or placeholder:

```cshtml
<ejs-stockchart id="stockchart" title="AAPL Stock Price" load="load" loaded="loaded" >
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle'></e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>

    <div id="noDataButtonOverlay" class="no-data-button-overlay" style="display: none;">
        <ejs-button id="loadDataButton" content="Load data" iconCss="e-icons e-refresh" onclick="loadChartData()"
            cssClass="load-data-btn e-outline" isPrimary="false">
        </ejs-button>
    </div>

    <style>
        .no-data-button-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 60px; /* Position below the no-data message */
        z - index: 10;
        }

        #noDataTemplateContainer {
            height: inherit;
            width: inherit;
        }

        .load-data-btn {
            margin-top: 55px;
            border-radius: 4px!important;
        }

        .load-data-btn.e-btn-icon {
            margin-right: 8px;
        }

        .light-bg {
            background-color: #fafafa;
            color: #000000;
        }

        .template-align img {
            max-width: 150px;
            /* Adjust size as needed */
            max-height: 150px;
            margin-top: 55px;
        }

        .template-align {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        #control-container {
            padding: 0px!important;
        }
    </style>
    <script src = "~/scripts/chart/theme-color.js" > </script>
    <script id = 'No-Data-Template' type = "text/x-template">
        <div id='noDataTemplateContainer' class="light-bg" >
            <div class="template-align" >
                <img src="no-data.png" alt = "No Data" />
            </div>
            < div class="template-align" >
                <p style="font-size: 15px; margin: 10px 0 10px;" > <strong>No data available to display.< /strong></p >
            </div>
        </div>
    </script>
    <script>
        var chartData = [
            { date: new Date('2012-04-02'), open: 85.9757, high: 90.6657, low: 85.7685, close: 90.5257, volume: 660187068 },
            { date: new Date('2012-04-09'), open: 89.4471, high: 92, low: 86.2157, close: 86.4614, volume: 912634864 },
            { date: new Date('2012-04-16'), open: 87.1514, high: 88.6071, low: 81.4885, close: 81.8543, volume: 1221746066 },
            { date: new Date('2012-04-23'), open: 81.5157, high: 88.2857, low: 79.2857, close: 86.1428, volume: 965935749 },
            { date: new Date('2012-04-30'), open: 85.4, high: 85.4857, low: 80.7385, close: 80.75, volume: 615249365 },
            { date: new Date('2012-05-07'), open: 80.2143, high: 82.2685, low: 79.8185, close: 80.9585, volume: 541742692 },
            { date: new Date('2012-05-14'), open: 80.3671, high: 81.0728, low: 74.5971, close: 75.7685, volume: 708126233 },
            { date: new Date('2012-05-21'), open: 76.3571, high: 82.3571, low: 76.2928, close: 80.3271, volume: 682076215 },
            { date: new Date('2012-05-28'), open: 81.5571, high: 83.0714, low: 80.0743, close: 80.1414, volume: 480059584 },
            { date: new Date('2012-06-04'), open: 80.2143, high: 82.9405, low: 78.3571, close: 82.9028, volume: 517577005 },
        ];
        var dataLoaded = false;
        function load(args) {
            args.stockChart.noDataTemplate = "#No-Data-Template";
            args.stockChart.series[0].dataSource = (dataLoaded ? chartData : []);
        }

        function loaded(args) {
            var buttonOverlay = document.getElementById("noDataButtonOverlay");
            if (buttonOverlay) {
                buttonOverlay.style.display = !dataLoaded ? 'block' : 'none';
            }
        }

        function loadChartData() {
            var chart = document.getElementById('stockchart').ej2_instances[0];
            var buttonOverlay = document.getElementById("noDataButtonOverlay");
            dataLoaded = true;
            chart.series[0].dataSource = chartData;
            chart.series[0].animation.enable = true;
            if (buttonOverlay) {
                buttonOverlay.style.display = 'none';
            }
            chart.refresh();
        }
    </script>
```

The no data template automatically displays when the dataSource is empty or null, improving user experience.

### Conditional Data Loading

```cshtml
@{
    var stockData = new List<object>{};
    var hasData = stockData != null && stockData.Count > 0;
}

@if (hasData)
{
    <ejs-stockchart id="stockChart">
        <e-stockchart-series-collection>
            <e-stockchart-series 
                dataSource="stockData" 
                xName="x" 
                yName="close" 
                type="Candle">
            </e-stockchart-series>
        </e-stockchart-series-collection>
    </ejs-stockchart>
}
else
{
    <p>Loading data or no data available for the selected period.</p>
}
```

### Real-time Data Updates

For live data, update the series dataSource dynamically:

```cshtml
 <ejs-stockchart id="stockChart" title="Live Stock Price">
     <e-stockchart-series-collection>
         <e-stockchart-series dataSource="ViewBag.StockData" type="Candle" xName="x" high="high" low="low" open="open" close="close" volume="volume">
         </e-stockchart-series>
     </e-stockchart-series-collection>
 </ejs-stockchart>

[Route("api/[controller]")]
[ApiController]
public class HomeController : Controller
{
    [HttpGet]
    public IActionResult Get()
    {
    var rnd = new Random();
    // Simulating live data updates
    var data = new[] {
    new {
        x = DateTime.Now,
        open = rnd.Next(150, 160),
        high = rnd.Next(160, 170),
        low = rnd.Next(140, 150),
        close = rnd.Next(150, 160),
        volume = rnd.Next(100000, 500000)
    }
    };
        return Ok(data);
    }
    [Route("/")]
    public IActionResult Index()
    {
        var stockData = new List<StockData>
        {
            new StockData
            {
                x = new DateTime(2023, 1, 1),
                open = 150.00,
                high = 155.50,
                low = 148.75,
                close = 152.00,
                volume = 1000000
            }
        };
        ViewBag.StockData = stockData;
        return View();
    }
}
```
```javascript
<script>
       function updateStockChartData(newData) {
        var chart = document.getElementById('stockChart').ej2_instances[0];
        var currentData = chart.series[0].dataSource;
        currentData.push(newData[0]);
        if (currentData.length > 50) {
            currentData.shift();
        }
        chart.series[0].dataSource = currentData;
        chart.refresh();
    }


    // Call when new data arrives
    setInterval(function() {
        fetch('/api/home')
            .then(response => response.json())
            .then(data => {
                // Ensure dates are parsed correctly if they come as strings
                data.forEach(d => d.x = new Date(d.x));
                updateStockChartData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, 5000);
</script>
```

## DataSource API Details

### DataSource Property

**Type:** `object` (List<T>, Array, or DataManager instance)

**Default:** `null`

**Description:** Specifies the data source for the Stock Chart. Accepts:
- Array of JSON objects
- List<T> of C# objects
- DataManager instance for remote data

### Data Property Mapping

The Stock Chart uses these property mappings to bind data fields:

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `dataSource` | object | Data collection | Yes |
| `xName` | string | X-axis field name | Yes |
| `yName` | string | Y-axis field name (typically Close) | Yes |
| `open` | string | Open price field name | For OHLC series |
| `high` | string | High price field name | For OHLC series |
| `low` | string | Low price field name | For OHLC series |
| `close` | string | Close price field name (alias of yName) | For OHLC series |
| `volume` | string | Volume field name | For volume indicators |

### Remote Data Binding

For large datasets or real-time data, use DataManager:

```cshtml
@{
    var dataManager = new Syncfusion.EJ2.DataManager
    {
        Url = "https://api.example.com/stockdata",
        Adaptor = "WebApiAdaptor",
        CrossDomain = true
    };
}

<ejs-stockchart id="stockChart">
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="dataManager" 
            xName="date" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Data Query

Apply filters and queries to the data source:

```cshtml
@{
    var query = new Syncfusion.EJ2.Query()
        .Where("volume", "greaterthan", 1000000)
        .Take(100);
    
    var dataManager = new Syncfusion.EJ2.DataManager
    {
        Json = stockData,
        Adaptor = "JsonAdaptor"
    };
}

<ejs-stockchart id="stockChart">
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="dataManager" 
            query="query"
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```
