# Series Types for Stock Chart

## Table of Contents
- [Overview](#overview)
- [Line Series](#line-series)
- [Candle Series](#candle-series)
- [Hollow Candle Series](#hollow-candle-series)
- [Spline Series](#spline-series)
- [Hilo Series](#hilo-series)
- [HiloOpenClose Series](#hiloopenclose-series)
- [Series Type Selection Guide](#series-type-selection-guide)
- [Switching Between Series Types](#switching-between-series-types)

## Overview

Syncfusion Stock Chart supports 6 major series types to visualize financial data. Each series type is optimized for specific data analysis scenarios and displays OHLC (Open, High, Low, Close) information in different ways.

## Line Series

**Line series** displays data points connected by straight lines. This is ideal for visualizing price trends over time.

**When to use:** When you need a clean, simple representation of price movement. Best for continuous price data without focusing on intraday fluctuations.

**Configuration:**

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
    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Line">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Data requirement:** Only requires the Close price (yName property).

## Candle Series

**Candle series** (also called candlestick) displays OHLC data using vertical rectangles (candles) with wicks extending to High and Low prices.

**When to use:** Standard choice for stock analysis. Candles visually represent market sentiment - bullish (green) candles show price increase, bearish (red) candles show price decrease.

**Configuration:**

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
    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
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

**Data requirement:** Requires Open, High, Low, Close (OHLC) values.

**Visual representation:**
- Candle body: From Open to Close
- Wicks: Extend to High (top) and Low (bottom)
- Color: Green for bullish (close > open), Red for bearish (close < open)

## Hollow Candle Series

**Hollow candle series** displays candlesticks with hollow (non-filled) bodies instead of solid fill. This variation provides an alternative visual style.

**When to use:** When you prefer outline-only candlesticks or need to differentiate from solid candlesticks in multi-series charts.

**Configuration:**

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
    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             open="open"
                             high="high"
                             low="low"
                             yName="close"
                             type="Candle"
                             enableSolidCandle="false">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>

```

**Note:** Set `enableSolidCandle="false"` on a Candle series type to render hollow candles.

## Spline Series

**Spline series** displays smooth curves through data points using spline interpolation, providing a smoother representation than line series.

**When to use:** When you want a smoother visual curve through price data while still showing trends. Useful for less volatile data or trend analysis.

**Configuration:**

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
    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             yName="close"
                             type="Spline">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Data requirement:** Only requires the Close price.

## Hilo Series

**Hilo series** displays High-Low data using vertical bars connecting the highest and lowest prices. It does not show Open and Close values.

**When to use:** When you need to display the range of price movement (High to Low) without showing opening and closing prices. Useful for highlighting volatility range.

**Configuration:**

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
    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             high="high"
                             low="low"
                             type="Hilo">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Data requirement:** Requires High and Low values only.

**Visual representation:** Vertical bars showing price range from Low (bottom) to High (top).

## HiloOpenClose Series

**HiloOpenClose series** is similar to candlestick but displays High-Low as a vertical line with small horizontal ticks for Open and Close values.

**When to use:** Alternative to candlestick when you want a more compact representation of OHLC data. Useful when space is limited or you prefer a different visual style.

**Configuration:**

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
    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             open="open"
                             high="high"
                             low="low"
                             yName="close"
                             type="HiloOpenClose">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Data requirement:** Requires Open, High, Low, Close (OHLC) values.

**Visual representation:** 
- Vertical line: From Low (bottom) to High (top)
- Left tick: Open value
- Right tick: Close value

## Series Type Selection Guide

| Series Type | Best For | Data Requirements | Visual Style |
|-------------|----------|-------------------|--------------|
| **Line** | Trend visualization | Close only | Simple connected line |
| **Candle** | OHLC analysis (standard) | OHLC | Filled rectangles with wicks |
| **HollowCandle** | OHLC analysis (outline) | OHLC | Outline rectangles with wicks |
| **Spline** | Smooth trends | Close only | Smooth curve |
| **Hilo** | Range visualization | High, Low only | Vertical bars |
| **HiloOpenClose** | Compact OHLC display | OHLC | Vertical lines with ticks |

## Switching Between Series Types

To allow users to switch series types dynamically, you can bind series type to a property:

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
    Syncfusion.EJ2.Charts.ChartSeriesType selectedSeriesType = ViewBag.SeriesType ?? Syncfusion.EJ2.Charts.ChartSeriesType.Candle;
}
<ejs-stockchart id="stockChart">
    <e-stockchart-series-collection>
        <e-stockchart-series dataSource="stockData"
                             xName="x"
                             open="open"
                             high="high"
                             low="low"
                             yName="close"
                             type="@selectedSeriesType">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

Update `selectedSeriesType` from user selection or API calls to dynamically change the visualization.
