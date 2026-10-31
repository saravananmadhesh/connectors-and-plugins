# Technical Indicators & Trendlines

## Table of Contents
- [Overview](#overview)
- [Adding an Indicator](#adding-an-indicator)
- [Indicator Types](#indicator-types)
  - [SMA — Simple Moving Average](#sma--simple-moving-average)
  - [EMA — Exponential Moving Average](#ema--exponential-moving-average)
  - [MACD — Moving Average Convergence Divergence](#macd--moving-average-convergence-divergence)
  - [RSI — Relative Strength Index](#rsi--relative-strength-index)
  - [Bollinger Bands](#bollinger-bands)
  - [ATR — Average True Range](#atr--average-true-range)
  - [Stochastic](#stochastic)
  - [Other Indicators](#other-indicators)
- [Trendlines](#trendlines)

---

## Overview

Technical indicators overlay analytical calculations on financial or time-series charts. They are added via the `indicators` property of `SfCartesianChart`. Most indicators bind to an existing series by `seriesName` or accept a standalone `dataSource`.

---

## Adding an Indicator

Two ways to provide data to an indicator:

**Option 1 — Bind to an existing series by name (recommended):**
```dart
SfCartesianChart(
  series: <CartesianSeries>[
    CandleSeries<StockData, DateTime>(
      name: 'AAPL',
      dataSource: stockData,
      xValueMapper: (d, _) => d.date,
      openValueMapper: (d, _) => d.open,
      highValueMapper: (d, _) => d.high,
      lowValueMapper: (d, _) => d.low,
      closeValueMapper: (d, _) => d.close,
    ),
  ],
  indicators: <TechnicalIndicator>[
    SmaIndicator<StockData, DateTime>(
      seriesName: 'AAPL',
      period: 14,
    ),
  ],
)
```

**Option 2 — Provide `dataSource` directly:**
```dart
SmaIndicator<StockData, DateTime>(
  dataSource: stockData,
  xValueMapper: (StockData d, _) => d.date,
  closeValueMapper: (StockData d, _) => d.close,
  period: 14,
)
```

---

## Indicator Types

### SMA — Simple Moving Average

Plots the unweighted mean of `period` closing prices.

```dart
SmaIndicator<StockData, DateTime>(
  seriesName: 'AAPL',
  period: 14,
  signalLineColor: Colors.orange,
  signalLineWidth: 2,
  isVisibleInLegend: true,
  legendItemText: 'SMA(14)',
)
```

---

### EMA — Exponential Moving Average

Weighted moving average that gives more weight to recent prices.

```dart
EmaIndicator<StockData, DateTime>(
  seriesName: 'AAPL',
  period: 14,
  signalLineColor: Colors.blue,
  signalLineWidth: 2,
)
```

---

### MACD — Moving Average Convergence Divergence

Shows the relationship between two EMAs. Renders a signal line, MACD line, and histogram.

```dart
MacdIndicator<StockData, DateTime>(
  seriesName: 'AAPL',
  shortPeriod: 12,
  longPeriod: 26,
  period: 9,                       
  macdType: MacdType.both,
  macdLineColor: Colors.blue,
  signalLineColor: Colors.orange,
  histogramPositiveColor: Colors.green,
  histogramNegativeColor: Colors.red,
)
```

---

### RSI — Relative Strength Index

Momentum oscillator measuring speed and magnitude of price changes (0–100 scale).

```dart
RsiIndicator<StockData, DateTime>(
  seriesName: 'AAPL',
  period: 14,
  overbought: 80,            
  oversold: 20,               
  signalLineColor: Colors.purple,
  upperLineColor: Colors.red,
  lowerLineColor: Colors.green,
  showZones: true,
)
```

---

### Bollinger Bands

Shows volatility with upper and lower bands around a moving average.

```dart
BollingerBandIndicator<StockData, DateTime>(
  seriesName: 'AAPL',
  period: 20,
  standardDeviation: 2,
  upperLineColor: Colors.red,
  lowerLineColor: Colors.green,
  signalLineColor: Colors.blue, 
  bandColor: Colors.blue.withOpacity(0.1),
)
```

---

### ATR — Average True Range

Measures market volatility (not direction).

```dart
AtrIndicator<StockData, DateTime>(
  seriesName: 'AAPL',
  period: 14,
  signalLineColor: Colors.teal,
  signalLineWidth: 2,
)
```

---

### Stochastic

Compares closing price to price range over a period. Includes `%K` and `%D` lines.

```dart
StochasticIndicator<StockData, DateTime>(
  seriesName: 'AAPL',
  period: 14,
  kPeriod: 3,
  dPeriod: 5,
  overbought: 80,
  oversold: 20,
  signalLineColor: Colors.blue,
  periodLineColor: Colors.orange,
)
```

---

### Other Indicators

| Indicator | Class | Key Property |
|-----------|-------|-------------|
| TMA (Triangular MA) | `TmaIndicator` | `period` |
| WMA (Weighted MA) | `WmaIndicator` | `period` |
| CCI (Commodity Channel Index) | `CciIndicator` | `period` |
| Momentum | `MomentumIndicator` | `period` |
| AD (Accumulation Distribution) | `AccumulationDistributionIndicator` | requires `volumeValueMapper` |
| ROC (Rate of Change) | `RocIndicator` | `period` |

---

## Trendlines

Trendlines project a fitted line through series data to visualize direction and forecast future values.

```dart
LineSeries<ChartData, DateTime>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.date,
  yValueMapper: (d, _) => d.y,
  trendlines: <Trendline>[
    Trendline(
      type: TrendlineType.linear,
      color: Colors.red,
      width: 2,
      dashArray: <double>[5, 5],
      isVisible: true,
      forwardForecast: 3,    
      backwardForecast: 2,   
      polynomialOrder: 2,    
      period: 3,             
      isVisibleInLegend: true,
      legendItemText: 'Linear Trend',
      intercept: null,       
    ),
  ],
)
```

**Trendline types:**
- `linear` — straight best-fit line
- `exponential` — exponential curve for rapid growth data
- `power` — power law fit
- `logarithmic` — logarithmic fit for slowing growth
- `polynomial` — polynomial fit (set `polynomialOrder`, usually 2–6)
- `movingAverage` — moving average smoothing (set `period`)
