# Financial Chart Types

Financial charts — Candle, HILO, and OHLC — are used to visualize stock price data. They all require Open, High, Low, and Close values per data point.

---

## Financial Data Model

All financial series use a data model with at least these fields:

```dart
class StockData {
  StockData(this.date, this.open, this.high, this.low, this.close);
  final DateTime date;
  final double open;
  final double high;
  final double low;
  final double close;
}
```

---

## Candle Chart

Renders Japanese candlestick patterns. Each candle shows the open/close as a body and the high/low as wicks (shadows).

```dart
SfCartesianChart(
  primaryXAxis: DateTimeAxis(),
  series: <CartesianSeries>[
    CandleSeries<StockData, DateTime>(
      dataSource: stockData,
      xValueMapper: (StockData d, _) => d.date,
      openValueMapper: (StockData d, _) => d.open,
      highValueMapper: (StockData d, _) => d.high,
      lowValueMapper: (StockData d, _) => d.low,
      closeValueMapper: (StockData d, _) => d.close,
      bullColor: Colors.green,    
      bearColor: Colors.red,      
      enableSolidCandles: false,
    ),
  ],
)
```

**Key properties:**
- `bullColor` — color when close price is above open (bullish candle)
- `bearColor` — color when close price is below open (bearish candle)
- `enableSolidCandles` — `true` fills the candle body; `false` renders hollow candles

---

## HILO Chart

Shows only the high and low prices as vertical lines (no open/close body). Simpler than candle — good for quick price range visualization.

```dart
HiloSeries<StockData, DateTime>(
  dataSource: stockData,
  xValueMapper: (StockData d, _) => d.date,
  highValueMapper: (StockData d, _) => d.high,
  lowValueMapper: (StockData d, _) => d.low,
  width: 0.5,
  color: Colors.blue,
)
```

> `HiloSeries` only needs `highValueMapper` and `lowValueMapper` — no open/close.

---

## OHLC Chart

Open-High-Low-Close chart rendered as vertical lines with small horizontal ticks for open (left tick) and close (right tick). A standard alternative to candlestick.

```dart
HiloOpenCloseSeries<StockData, DateTime>(
  dataSource: stockData,
  xValueMapper: (StockData d, _) => d.date,
  openValueMapper: (StockData d, _) => d.open,
  highValueMapper: (StockData d, _) => d.high,
  lowValueMapper: (StockData d, _) => d.low,
  closeValueMapper: (StockData d, _) => d.close,
  bullColor: Colors.green,
  bearColor: Colors.red,
)
```

---

## Combining Financial Charts with Technical Indicators

Financial series are often combined with technical indicators:

```dart
SfCartesianChart(
  primaryXAxis: DateTimeAxis(),
  series: <CartesianSeries>[
    CandleSeries<StockData, DateTime>(
      dataSource: stockData,
      xValueMapper: (d, _) => d.date,
      openValueMapper: (d, _) => d.open,
      highValueMapper: (d, _) => d.high,
      lowValueMapper: (d, _) => d.low,
      closeValueMapper: (d, _) => d.close,
      name: 'AAPL',
    ),
  ],
  indicators: <TechnicalIndicator>[
    SmaIndicator<StockData, DateTime>(
      seriesName: 'AAPL',
      period: 14,
      signalLineColor: Colors.orange,
    ),
  ],
)
```

---

## Choosing Between Financial Chart Types

| Scenario | Use |
|----------|-----|
| Full OHLC analysis with body | `CandleSeries` |
| Simple price range only (no open/close) | `HiloSeries` |
| OHLC with tick-mark style (no colored body) | `HiloOpenCloseSeries` |
| Combined with technical indicators | Any — pair with `indicators` property |
