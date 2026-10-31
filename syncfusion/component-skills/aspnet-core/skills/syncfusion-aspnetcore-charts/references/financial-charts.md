# Financial Charts

## Table of Contents

- [Overview](#overview)
- [Candlestick Chart](#candlestick-chart)
  - [Basic Candlestick Chart](#basic-candlestick-chart)
  - [Candlestick Anatomy](#candlestick-anatomy)
  - [Customizing Candlestick Colors](#customizing-candlestick-colors)
  - [Hollow Candles](#hollow-candles)
- [OHLC Chart](#ohlc-chart)
  - [OHLC/HiLoOpenClose Customization](#ohlchiloopenclose-customization)
- [HiLo Charts](#hilo-charts)
- [Technical Indicators](#technical-indicators)
  - [Simple Moving Average (SMA)](#simple-moving-average-sma)
  - [Exponential Moving Average (EMA)](#exponential-moving-average-ema)
  - [Bollinger Bands](#bollinger-bands)
  - [RSI (Relative Strength Index)](#rsi-relative-strength-index)
  - [MACD (Moving Average Convergence Divergence)](#macd-moving-average-convergence-divergence)
  - [Stochastic Oscillator](#stochastic-oscillator)
  - [ATR (Average True Range)](#atr-average-true-range)
  - [Accumulation Distribution](#accumulation-distribution)
- [Customization Options](#customization-options)
  - [Volume Chart with Price](#volume-chart-with-price)
  - [Zooming for Detailed Analysis](#zooming-for-detailed-analysis)
  - [Custom Tooltip](#custom-tooltip)
  - [Striplines for Key Levels](#striplines-for-key-levels)
- [Best Practices](#best-practices)
  - [Data Preparation](#data-preparation)
  - [Performance](#performance)
  - [User Experience](#user-experience)
  - [Common Patterns](#common-patterns)

## Overview

Financial charts are specialized chart types designed for displaying stock market data, showing price movements with open, high, low, and close values. They're essential tools for technical analysis and trading applications.

**Key Financial Chart Types:**
- **Candlestick:** Most popular, shows OHLC with colored bodies
- **HiLo:** High-Low range only
- **HiLoOpenClose:** High-Low with open/close tick marks

**Common Features:**
- Display multiple price points per data item
- Support for technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands)
- Volume charts
- Zooming and panning for detailed analysis
- Crosshair for precise value tracking

## Candlestick Chart

Candlestick charts display stock price movements with rectangular "candles" showing open, high, low, and close prices.

### Basic Candlestick Chart

```cshtml
<ejs-chart id="candlestickChart" title="Stock Price Analysis">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                          labelFormat="MMM-dd">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Price ($)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" 
                  open="Open" 
                  high="High" 
                  low="Low" 
                  close="Close"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle"
                  name="Apple Inc">
        </e-series>
    </e-series-collection>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
</ejs-chart>
```

```csharp
public class StockData
{
    public DateTime Date { get; set; }
    public double Open { get; set; }
    public double High { get; set; }
    public double Low { get; set; }
    public double Close { get; set; }
    public double Volume { get; set; }
}

public IActionResult Index()
{
    ViewBag.StockData = new List<StockData>
    {
        new StockData { Date = new DateTime(2023, 1, 2), Open = 130, High = 135, Low = 128, Close = 133, Volume = 5000000 },
        new StockData { Date = new DateTime(2023, 1, 3), Open = 133, High = 138, Low = 132, Close = 135, Volume = 6000000 },
        new StockData { Date = new DateTime(2023, 1, 4), Open = 135, High = 136, Low = 130, Close = 131, Volume = 7000000 },
        new StockData { Date = new DateTime(2023, 1, 5), Open = 131, High = 134, Low = 129, Close = 133, Volume = 5500000 },
        new StockData { Date = new DateTime(2023, 1, 6), Open = 133, High = 140, Low = 133, Close = 138, Volume = 8000000 }
    };
    return View();
}
```

### Candlestick Anatomy

**Candle Components:**
- **Body:** Rectangle between open and close prices
- **Upper Shadow (Wick):** Line from body top to high price
- **Lower Shadow (Tail):** Line from body bottom to low price
- **Color:** Green/white for bullish (close > open), red/black for bearish (close < open)

### Customizing Candlestick Colors

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle"
          dataSource="@ViewBag.StockData"
          xName="Date" 
          open="Open" high="High" low="Low" close="Close"
          bullFillColor="#26A69A"
          bearFillColor="#EF5350">
    <e-series-border width="2"></e-series-border>
</e-series>
```

**Properties:**
- `bullFillColor`: Color for bullish candles (close > open)
- `bearFillColor`: Color for bearish candles (close < open)
- `enableSolidCandles`: Fill candles solidly (default: true)

### Hollow Candles

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle"
          enableSolidCandles="false">
</e-series>
```

Hollow candles show only borders for different visual representation.

## OHLC Chart

OHLC (Open-High-Low-Close) charts display price data using tick marks instead of candle bodies.

```cshtml
<ejs-chart id="ohlcChart" title="Stock Price - OHLC">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                          labelFormat="dd MMM">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Price ($)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" 
                  open="Open" 
                  high="High" 
                  low="Low" 
                  close="Close"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.HiloOpenClose"
                  name="Stock">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

**OHLC Structure:**
- Vertical line represents high-low range
- Left tick mark shows opening price
- Right tick mark shows closing price

### OHLC/HiLoOpenClose Customization

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.HiloOpenClose"
          dataSource="@ViewBag.StockData"
          xName="Date"
          open="Open" high="High" low="Low" close="Close">
    <e-series-border width="2" color="#4CAF50"></e-series-border>
</e-series>
```

## HiLo Charts

HiLo charts show only the high-low range without open/close values.

```cshtml
<ejs-chart id="hiloChart" title="Stock Price Range">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" 
                  high="High" 
                  low="Low"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Hilo">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

**Use Cases:**
- Showing price volatility
- High-low ranges without open/close details
- Simplified price range visualization

## Technical Indicators

Technical indicators analyze historical price data to predict future price movements.

### Simple Moving Average (SMA)

```cshtml
<ejs-chart id="chartWithSMA" title="Stock with SMA Indicator">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" high="High" low="Low" 
                  open="Open" close="Close"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle">
        </e-series>
    </e-series-collection>
    <e-indicators>
        <e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.Sma" 
                          field="Close" 
                          seriesName="Apple Inc" 
                          fill="#FF6347"
                          period="14">
        </e-indicator>
    </e-indicators>
</ejs-chart>
```

**SMA Parameters:**
- `period`: Number of data points to average (commonly 14, 50, 200)
- `field`: Data field to calculate (typically "Close")
- `seriesName`: Series to apply indicator to

### Exponential Moving Average (EMA)

```cshtml
<e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.Ema" 
                  field="Close" 
                  seriesName="Stock" 
                  fill="#1E90FF"
                  period="12">
</e-indicator>
```

EMA gives more weight to recent prices, responding faster to changes than SMA.

### Bollinger Bands

```cshtml
<e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.BollingerBands" field="Close" seriesName="Stock" 
    fill="#FFA500" period="20" standardDeviation="2">
        <e-technicalindicator-upperline color="#ffb735" width="1"></e-technicalindicator-upperline>
        <e-technicalindicator-lowerline color="#f2ec2f" width="1"></e-technicalindicator-lowerline>
</e-indicator>
```

**Bollinger Bands show:**
- Middle band: SMA
- Upper band: SMA + (2 × standard deviation)
- Lower band: SMA - (2 × standard deviation)

**Use:** Identify overbought/oversold conditions and volatility.

### RSI (Relative Strength Index)

```cshtml
<ejs-chart id="chartWithRSI">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" high="High" low="Low" 
                  open="Open" close="Close"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle">
        </e-series>
    </e-series-collection>
    <e-indicators>
        <e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.Rsi" 
                          field="Close" 
                          seriesName="Stock" 
                          yAxisName="RSIAxis"
                          fill="#9C27B0"
                          period="14"
                          overBought="70"
                          overSold="30">
                            <e-technicalindicator-upperline color="#ffb735" width="1"></e-technicalindicator-upperline>
                            <e-technicalindicator-lowerline color="#f2ec2f" width="1"></e-technicalindicator-lowerline>
        </e-indicator>
    </e-indicators>
    <e-chart-axes>
        <e-chart-axis name="RSIAxis" 
                     opposedPosition="true" 
                     rowIndex="1"
                     minimum="0" 
                     maximum="100">
        </e-chart-axis>
    </e-chart-axes>
    <e-chart-rows>
        <e-chart-row height="60%"></e-chart-row>
        <e-chart-row height="40%"></e-chart-row>
    </e-chart-rows>
</ejs-chart>
```

**RSI Interpretation:**
- Above 70: Overbought (potential sell signal)
- Below 30: Oversold (potential buy signal)
- 50: Neutral

### MACD (Moving Average Convergence Divergence)

```cshtml
<e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.Macd" 
                  field="Close" 
                  seriesName="Stock"
                  yAxisName="MACDAxis"
                  fastPeriod="12"
                  slowPeriod="26"
                  kPeriod="3" dPeriod="2"
                  macdType="Both">
</e-indicator>
```

**MACD Components:**
- MACD line: 12-day EMA minus 26-day EMA
- Signal line: 9-day EMA of MACD line
- Histogram: MACD line minus signal line

### Stochastic Oscillator

```cshtml
<e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.Stochastic" 
                  field="Close" 
                  seriesName="Stock"
                  yAxisName="StochAxis"
                  period="14"
                  kPeriod="3"
                  dPeriod="3">
</e-indicator>
```

### ATR (Average True Range)

```cshtml
<e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.Atr" 
                  field="Close" 
                  seriesName="Stock"
                  yAxisName="ATRAxis"
                  period="14">
</e-indicator>
```

ATR measures market volatility.

### Accumulation Distribution

```cshtml
<e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.AccumulationDistribution" 
                  field="Close" 
                  seriesName="Stock"
                  yAxisName="ADAxis">
</e-indicator>
```

**Available Indicators:**
- Sma, Ema, Tma (Moving Averages)
- BollingerBands
- Rsi
- Macd
- Stochastic
- Atr
- AccumulationDistribution
- Momentum

## Customization Options

### Volume Chart with Price

Combine candlestick with volume chart:

```cshtml
<ejs-chart id="stockChart" title="Stock Price and Volume">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime">
    </e-chart-primaryxaxis>
    <e-chart-rows>
        <e-chart-row height="70%"></e-chart-row>
        <e-chart-row height="30%"></e-chart-row>
    </e-chart-rows>
    <e-chart-axes>
        <e-chart-axis name="VolumeAxis" 
                     rowIndex="1" 
                     opposedPosition="true">
        </e-chart-axis>
    </e-chart-axes>
    <e-series-collection>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" 
                  open="Open" high="High" low="Low" close="Close"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle"
                  name="Price">
        </e-series>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" 
                  yName="Volume"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  yAxisName="VolumeAxis"
                  name="Volume">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Zooming for Detailed Analysis

```cshtml
<ejs-chart id="stockChart">
    <e-chart-zoomsettings enableSelectionZooming="true"
                         enablePinchZooming="true"
                         enableMouseWheelZooming="true"
                         mode="X">
    </e-chart-zoomsettings>
    <e-series-collection>
        <!-- series -->
    </e-series-collection>
</ejs-chart>
```

### Custom Tooltip

```cshtml
<ejs-chart id="stockChart">
    <e-chart-tooltipsettings enable="true" 
                             format="<b>${point.x}</b><br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <!-- series -->
    </e-series-collection>
</ejs-chart>
```

### Striplines for Key Levels

Mark support/resistance levels:

```cshtml
<e-chart-primaryyaxis minimum="0" maximum="30" interval="10" rangePadding="@Syncfusion.EJ2.Charts.ChartRangePadding.None" stripLines="@Model.yaxisstriplines" title="Wind Speed and Gust (km/h)"></e-chart-primaryyaxis>
```

```csharp
public class StripLineModel : PageModel{
    public List<ChartStripLine>  yaxisstriplines { get; set; }
    public void OnGet()
    {
        yaxisstriplines = new List<ChartStripLine>();
        ChartStripLine stripy1 = new ChartStripLine();
        stripy1.Start = "0";
        stripy1.End = "5";
        stripy1.Text = "Calm";
        stripy1.Color = "rgba(68, 170, 213, 0.1)";
        stripy1.HorizontalAlignment = Anchor.Start;
        stripy1.Visible = true;
        stripy1.TextStyle = new ChartFont { Size = "13px" };
        stripy1.Border = new ChartBorder { Width = 0 };
        yaxisstriplines.Add(stripy1);

        ChartStripLine stripy2 = new ChartStripLine();
        stripy2.Start = "5";
        stripy2.End = "8";
        stripy2.Text = "Light Air";
        stripy2.Color = "rgba(0, 0, 0, 0)";
        stripy2.HorizontalAlignment = Anchor.Start;
        stripy2.Visible = true;
        stripy2.TextStyle = new ChartFont { Size = "13px" };
        stripy2.Border = new ChartBorder { Width = 0 };
        yaxisstriplines.Add(stripy2);
    }
}
```

## Best Practices

### Data Preparation

1. **Sort by date:** Ensure data is chronologically ordered
2. **Handle gaps:** Weekend/holiday gaps are normal
3. **Validate OHLC:** Ensure high ≥ max(open, close) and low ≤ min(open, close)
4. **Time zones:** Use consistent timezone for all data

### Performance

1. **Limit data points:** Load 100-500 candles initially
2. **Lazy loading:** Load more data on zoom/scroll
3. **Data aggregation:** Use daily for long periods, minute for intraday
4. **Disable animations:** For real-time updates

### User Experience

1. **Crosshair:** Essential for precise value reading
2. **Zooming:** Enable for detailed analysis
3. **Multiple indicators:** Limit to 2-3 for readability
4. **Responsive design:** Ensure charts work on mobile
5. **Period selector:** Let users choose timeframe (1D, 1W, 1M, 1Y, etc.)

### Common Patterns

```cshtml
<!-- Typical financial chart setup -->
<ejs-chart id="stockChart" 
           title="@ViewBag.Symbol Stock Analysis"
           width="100%"
           height="600px">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                          labelFormat="MMM dd">
    </e-chart-primaryxaxis>
    <e-chart-zoomsettings enableSelectionZooming="true"></e-chart-zoomsettings>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="@ViewBag.StockData" 
                  xName="Date" 
                  open="Open" high="High" low="Low" close="Close"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Candle">
        </e-series>
    </e-series-collection>
    <e-indicators>
        <e-indicator type="Syncfusion.EJ2.Charts.TechnicalIndicators.Sma" period="50" field="Close">
        </e-indicator>
    </e-indicators>
</ejs-chart>
```

This covers comprehensive financial charting for stock analysis and trading applications.
