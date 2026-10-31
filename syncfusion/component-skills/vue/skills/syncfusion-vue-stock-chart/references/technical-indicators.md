# Technical Indicators & Analysis

## Table of Contents
- [Overview](#overview)
  - [Module Injection](#module-injection)
- [Moving Averages SMA EMA](#moving-averages-sma-ema)
  - [Simple Moving Average SMA Implementation](#simple-moving-average-sma-implementation)
  - [Exponential Moving Average EMA Implementation](#exponential-moving-average-ema-implementation)
  - [Common Periods](#common-periods)
  - [SMA vs EMA Usage](#sma-vs-ema-usage)
- [RSI - Relative Strength Index](#rsi---relative-strength-index)
  - [RSI Implementation](#rsi-implementation)
  - [RSI Configuration](#rsi-configuration)
  - [RSI Interpretation](#rsi-interpretation)
  - [RSI Setup with Separate Axis](#rsi-setup-with-separate-axis)
- [MACD - Moving Average Convergence Divergence](#macd---moving-average-convergence-divergence)
  - [MACD Implementation](#macd-implementation)
  - [MACD Configuration](#macd-configuration)
  - [MACD Interpretation](#macd-interpretation)
- [Bollinger Bands](#bollinger-bands)
  - [Bollinger Bands Implementation](#bollinger-bands-implementation)
  - [Bollinger Bands Configuration](#bollinger-bands-configuration)
  - [Bollinger Bands Interpretation](#bollinger-bands-interpretation)
- [ATR - Average True Range](#atr---average-true-range)
  - [ATR Implementation](#atr-implementation)
  - [ATR Configuration](#atr-configuration)
  - [ATR Usage](#atr-usage)
- [Other Indicators](#other-indicators)
  - [Momentum Indicator Implementation](#momentum-indicator-implementation)
  - [Stochastic Indicator Implementation](#stochastic-indicator-implementation)
  - [TMA - Triangular Moving Average Implementation](#tma---triangular-moving-average-implementation)
  - [Accumulation Distribution Implementation](#accumulation-distribution-implementation)
- [Multiple Indicators](#multiple-indicators)
  - [Complete Example with Multiple Indicators](#complete-example-with-multiple-indicators)
- [Indicator Events](#indicator-events)
  - [Before Indicator Change](#before-indicator-change)
  - [Indicator Changed](#indicator-changed)
  -[Basic Implementation](#basic-implementation)
- [Common Indicator Combinations](#common-indicator-combinations)
  - [Trend Following Setup](#trend-following-setup)
  - [Momentum Setup](#momentum-setup)
  - [Volatility Setup](#volatility-setup)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Overview

Technical indicators are calculated overlays or derived panels that help analyze direction, momentum, volatility, and price-volume behavior. In Vue 3 Composition API, Stock Chart indicators behave reliably when the following are true:

- the base series is configured correctly
- the `seriesName` matches the base series `name` exactly
- the data contains all required fields such as `open`, `high`, `low`, `close`, and `volume` when needed
- the required modules are imported and registered through `provide('stockChart', [...])`

## Module Injection

Because indicator behavior can change dynamically, the safest pattern is to inject the full indicator-ready module set whenever indicator rendering or indicator switching is possible.

```vue
<script setup>
import { provide } from 'vue'
import {
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>
```

## Moving Averages (SMA, EMA)

Moving averages smooth price movement and help expose direction more clearly. SMA weights every period evenly, while EMA reacts faster to recent changes.

### Simple Moving Average (SMA) Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="sma-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with SMA"
      width="100%"
      height="480px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Sma"
          field="Close"
          :period="14"
          seriesName="Candle"
          fill="#FF9800"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 },
  { date: new Date(2024, 0, 13), open: 128, high: 131, low: 126, close: 127, volume: 2550000 },
  { date: new Date(2024, 0, 14), open: 127, high: 130, low: 125, close: 129, volume: 2650000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### Exponential Moving Average (EMA) Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="ema-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with EMA"
      width="100%"
      height="480px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Ema"
          field="Close"
          :period="12"
          seriesName="Candle"
          fill="#3F51B5"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### Common Periods

Common period choices depend on how quickly you want the indicator to react:

- `5` or `10` for highly reactive short-term behavior
- `12` or `20` for common short-term to medium-term tracking
- `50` for a broader trend view
- `100` or `200` for long-term trend assessment

### SMA vs EMA Usage

- `Sma(14)` is useful when smoother direction matters more than faster reaction.
- `Ema(12)` is useful when you want recent prices to influence the line more strongly.
- A combined setup such as `Sma(50)` and `Ema(12)` can help expose crossover-style changes in direction.

## RSI - Relative Strength Index

RSI measures recent gain and loss behavior on a scale from 0 to 100.

### RSI Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="rsi-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :axes="axes"
      :tooltip="tooltip"
      title="Candlestick with RSI"
      width="100%"
      height="520px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Rsi"
          field="Close"
          :period="14"
          seriesName="Candle"
          yAxisName="RSIAxis"
          fill="#009688"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 },
  { date: new Date(2024, 0, 13), open: 128, high: 131, low: 126, close: 127, volume: 2550000 },
  { date: new Date(2024, 0, 14), open: 127, high: 130, low: 125, close: 129, volume: 2650000 },
  { date: new Date(2024, 0, 15), open: 129, high: 133, low: 128, close: 132, volume: 2850000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const axes = [
  {
    name: 'RSIAxis',
    opposedPosition: true,
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  }
]

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### RSI Configuration

Use the following logical configuration pattern for RSI:

- `type="Rsi"`
- `field="Close"`
- `period="14"`
- `seriesName="Candle"`
- `yAxisName="RSIAxis"` when you want a separate momentum axis

### RSI Interpretation

- RSI above `70` is commonly treated as an overbought-style condition.
- RSI below `30` is commonly treated as an oversold-style condition.
- RSI near the middle range often reflects weaker directional conviction.

### RSI Setup with Separate Axis

The core requirements for a separate RSI axis are:

- define an axis with `name: 'RSIAxis'`
- assign `minimum: 0`, `maximum: 100`, and a practical `interval`
- set `yAxisName="RSIAxis"` on the indicator
- keep the base price series on the main Y-axis and the RSI on the named axis

The runnable sample in the **RSI Implementation** section already includes the full separate-axis setup.

## MACD - Moving Average Convergence Divergence

MACD compares faster and slower moving-average behavior to reveal momentum shifts and crossover-style changes.

### MACD Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="macd-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :axes="axes"
      :tooltip="tooltip"
      title="Candlestick with MACD"
      width="100%"
      height="540px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Macd"
          field="Close"
          :fastPeriod="12"
          :slowPeriod="26"
          :period="9"
          seriesName="Candle"
          yAxisName="MacdAxis"
          fill="#673AB7"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 },
  { date: new Date(2024, 0, 13), open: 128, high: 131, low: 126, close: 127, volume: 2550000 },
  { date: new Date(2024, 0, 14), open: 127, high: 130, low: 125, close: 129, volume: 2650000 },
  { date: new Date(2024, 0, 15), open: 129, high: 133, low: 128, close: 132, volume: 2850000 },
  { date: new Date(2024, 0, 16), open: 132, high: 135, low: 130, close: 134, volume: 2950000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const axes = [
  {
    name: 'MacdAxis',
    opposedPosition: true,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  }
]

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### MACD Configuration

Use this logical mapping for MACD:

- `type="Macd"`
- `field="Close"`
- `fastPeriod="12"`
- `slowPeriod="26"`
- `period="9"` for the signal-style period
- `seriesName="Candle"`
- `yAxisName="MacdAxis"` when you want a separate panel-style axis

### MACD Interpretation

- When MACD is above the signal line, many traders treat it as a bullish-style momentum condition.
- When MACD is below the signal line, many traders treat it as a bearish-style momentum condition.
- The separation and convergence between the lines help communicate momentum expansion or contraction.

## Bollinger Bands

Bollinger Bands apply a volatility envelope around a moving average.

### Bollinger Bands Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="bollinger-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Bollinger Bands"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="BollingerBands"
          field="Close"
          :period="20"
          :standardDeviation="2"
          seriesName="Candle"
          fill="#9C27B0"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 },
  { date: new Date(2024, 0, 13), open: 128, high: 131, low: 126, close: 127, volume: 2550000 },
  { date: new Date(2024, 0, 14), open: 127, high: 130, low: 125, close: 129, volume: 2650000 },
  { date: new Date(2024, 0, 15), open: 129, high: 133, low: 128, close: 132, volume: 2850000 },
  { date: new Date(2024, 0, 16), open: 132, high: 135, low: 130, close: 134, volume: 2950000 },
  { date: new Date(2024, 0, 17), open: 134, high: 137, low: 132, close: 136, volume: 3050000 },
  { date: new Date(2024, 0, 18), open: 136, high: 139, low: 134, close: 138, volume: 3150000 },
  { date: new Date(2024, 0, 19), open: 138, high: 141, low: 136, close: 137, volume: 2980000 },
  { date: new Date(2024, 0, 20), open: 137, high: 140, low: 135, close: 139, volume: 2880000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### Bollinger Bands Configuration

The typical Bollinger Bands mapping is:

- `type="BollingerBands"`
- `field="Close"`
- `period="20"`
- `standardDeviation="2"`
- `seriesName="Candle"`

### Bollinger Bands Interpretation

- Price near the upper band often indicates stronger recent positioning versus the moving average.
- Price near the lower band often indicates weaker recent positioning versus the moving average.
- Wider bands imply higher volatility.
- Narrower bands often imply contraction or consolidation.

## ATR - Average True Range

ATR measures volatility without showing bullish or bearish direction on its own.

### ATR Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="atr-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :axes="axes"
      :tooltip="tooltip"
      title="Candlestick with ATR"
      width="100%"
      height="520px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Atr"
          field="Close"
          :period="14"
          seriesName="Candle"
          yAxisName="ATRAxis"
          fill="#795548"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 },
  { date: new Date(2024, 0, 13), open: 128, high: 131, low: 126, close: 127, volume: 2550000 },
  { date: new Date(2024, 0, 14), open: 127, high: 130, low: 125, close: 129, volume: 2650000 },
  { date: new Date(2024, 0, 15), open: 129, high: 133, low: 128, close: 132, volume: 2850000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const axes = [
  {
    name: 'ATRAxis',
    opposedPosition: true,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  }
]

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### ATR Configuration

A practical ATR mapping is:

- `type="Atr"`
- `period="14"`
- `field="Close"`
- `seriesName="Candle"`
- `yAxisName="ATRAxis"` when displayed separately

### ATR Usage

- ATR can support stop-loss spacing.
- ATR can support volatility-aware position sizing.
- ATR spikes usually indicate expanding volatility.

## Other Indicators

### Momentum Indicator Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="momentum-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Momentum"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Momentum"
          field="Close"
          :period="10"
          seriesName="Candle"
          fill="#009688"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### Stochastic Indicator Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="stochastic-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Stochastic"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Stochastic"
          field="Close"
          :period="14"
          :kPeriod="3"
          :dPeriod="3"
          seriesName="Candle"
          fill="#3F51B5"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 },
  { date: new Date(2024, 0, 13), open: 128, high: 131, low: 126, close: 127, volume: 2550000 },
  { date: new Date(2024, 0, 14), open: 127, high: 130, low: 125, close: 129, volume: 2650000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### TMA - Triangular Moving Average Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="tma-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with TMA"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Tma"
          field="Close"
          :period="9"
          seriesName="Candle"
          fill="#E91E63"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### Accumulation Distribution Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="ad-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Accumulation Distribution"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="AccumulationDistribution"
          field="Close"
          seriesName="Candle"
          fill="#795548"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

## Multiple Indicators

Combining multiple indicators is useful when each indicator adds a clearly different analytical role rather than repeating the same signal.

### Complete Example with Multiple Indicators

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="multi-indicator-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :axes="axes"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Stock Chart with SMA, RSI, and MACD"
      width="100%"
      height="580px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Candle"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Sma"
          field="Close"
          :period="20"
          seriesName="Candle"
          fill="#FF9800"
          :width="2"
        />
        <e-stockchart-indicator
          type="Rsi"
          field="Close"
          :period="14"
          seriesName="Candle"
          yAxisName="RSIAxis"
          fill="#009688"
          :width="2"
        />
        <e-stockchart-indicator
          type="Macd"
          field="Close"
          :fastPeriod="12"
          :slowPeriod="26"
          :period="9"
          seriesName="Candle"
          yAxisName="MacdAxis"
          fill="#673AB7"
          :width="2"
        />
      </e-stockchart-indicators>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106, volume: 1700000 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104, volume: 1800000 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110, volume: 2200000 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111, volume: 1900000 },
  { date: new Date(2024, 0, 6), open: 111, high: 115, low: 109, close: 114, volume: 2100000 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 112, close: 116, volume: 2300000 },
  { date: new Date(2024, 0, 8), open: 116, high: 119, low: 114, close: 115, volume: 2050000 },
  { date: new Date(2024, 0, 9), open: 115, high: 121, low: 114, close: 120, volume: 2400000 },
  { date: new Date(2024, 0, 10), open: 120, high: 124, low: 118, close: 123, volume: 2600000 },
  { date: new Date(2024, 0, 11), open: 123, high: 126, low: 121, close: 125, volume: 2450000 },
  { date: new Date(2024, 0, 12), open: 125, high: 129, low: 124, close: 128, volume: 2750000 },
  { date: new Date(2024, 0, 13), open: 128, high: 131, low: 126, close: 127, volume: 2550000 },
  { date: new Date(2024, 0, 14), open: 127, high: 130, low: 125, close: 129, volume: 2650000 },
  { date: new Date(2024, 0, 15), open: 129, high: 133, low: 128, close: 132, volume: 2850000 },
  { date: new Date(2024, 0, 16), open: 132, high: 135, low: 130, close: 134, volume: 2950000 },
  { date: new Date(2024, 0, 17), open: 134, high: 137, low: 132, close: 136, volume: 3050000 },
  { date: new Date(2024, 0, 18), open: 136, high: 139, low: 134, close: 138, volume: 3150000 },
  { date: new Date(2024, 0, 19), open: 138, high: 141, low: 136, close: 137, volume: 2980000 },
  { date: new Date(2024, 0, 20), open: 137, high: 140, low: 135, close: 139, volume: 2880000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const axes = [
  {
    name: 'RSIAxis',
    opposedPosition: true,
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  },
  {
    name: 'MacdAxis',
    opposedPosition: true,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  }
]

const tooltip = {
  enable: true
}

const legendSettings = {
  visible: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

## Indicator Events

> **Indicator events:** Stock Chart supports indicator events for tracking and managing indicators added or removed through the toolbar. The `beforeIndicatorChange` event is triggered before an indicator update is applied and allows the update to be canceled. The `indicatorChanged` event is triggered after the indicator has been updated successfully.

### Before Indicator Change

The `beforeIndicatorChange` event is triggered before an indicator is added or removed through the Stock Chart toolbar. Set the event argument's `cancel` property to `true` to prevent the requested indicator update.

### Indicator Changed

The `indicatorChanged` event is triggered after an indicator has been added or removed successfully. Use this event to track the completed update or run dependent application logic.

### Basic Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="stock-chart"
      :dataSource="stockData"
      :primaryXAxis="primaryXAxis"
      :indicatorType="indicatorType"
      @beforeIndicatorChange="onBeforeIndicatorChange"
      @indicatorChanged="onIndicatorChanged"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          type="Candle"
          xName="date"
          high="high"
          low="low"
          open="open"
          close="close"
          name="Price"
        >
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  Tooltip,
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const stockData = ref([
  {
    date: new Date(2024, 0, 1),
    open: 100,
    high: 108,
    low: 98,
    close: 105
  },
  {
    date: new Date(2024, 0, 2),
    open: 105,
    high: 112,
    low: 103,
    close: 110
  },
  {
    date: new Date(2024, 0, 3),
    open: 110,
    high: 114,
    low: 106,
    close: 108
  },
  {
    date: new Date(2024, 0, 4),
    open: 108,
    high: 116,
    low: 107,
    close: 114
  },
  {
    date: new Date(2024, 0, 5),
    open: 114,
    high: 118,
    low: 111,
    close: 116
  }
]);

const primaryXAxis = {
  valueType: 'DateTime'
};

const indicatorType = [
  'Sma',
  'Ema',
  'Tma',
  'BollingerBands',
  'Momentum',
  'Atr',
  'Rsi',
  'Macd',
  'Stochastic',
  'AccumulationDistribution'
];

const onBeforeIndicatorChange = (args) => {
  console.log('Indicator update requested:', args);

  // Set args.cancel to true when the requested update must be prevented.
  // args.cancel = true;
};

const onIndicatorChanged = (args) => {
  console.log('Indicator updated successfully:', args);
};

provide('stockChart', [
  DateTime,
  LineSeries,
  AreaSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  Tooltip,
  RangeTooltip
]);
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

**Event behavior:**

- `beforeIndicatorChange` runs before the toolbar update and supports cancellation through `args.cancel`.
- When the update is canceled, the requested indicator change is not applied.
- `indicatorChanged` runs only after the indicator update succeeds.
- These events apply to indicators added or removed through the Stock Chart toolbar.

## Common Indicator Combinations

### Trend Following Setup

- `Sma(20)` for short-term trend visibility
- `Sma(50)` for medium-term direction
- `Sma(200)` for long-term bias
- Price interaction with moving averages can help identify trend-following continuation or reversal-style zones

### Momentum Setup

- `Rsi(14)` for momentum state
- `Macd` for crossover confirmation
- `Atr(14)` for volatility context
- Use RSI extremes together with MACD confirmation rather than depending on one signal alone

### Volatility Setup

- `BollingerBands(20, 2)` for volatility bands
- `Atr(14)` for true-range expansion
- Volatility expansion becomes more meaningful when price behavior and range behavior confirm each other

## Performance Considerations

- Keep the number of visible indicators focused. More indicators increase both visual clutter and rendering work.
- Use separate named axes for panel-style indicators such as RSI, MACD, and ATR when clarity matters.
- Avoid unnecessary indicator combinations that all communicate the same thing.
- If the chart must handle large data sets, reduce visible range first before increasing indicator count.

## Troubleshooting

**Indicators not showing**

- Ensure the indicator modules are imported and also injected through `provide('stockChart', [...])`.
- Ensure the base series `name` matches the indicator `seriesName` exactly.
- Ensure the base data includes the correct fields and the indicator `field` is mapped correctly.

**Overlapping indicators**

- Use `yAxisName` for panel-style indicators.
- Add named axes in the `axes` array.
- Increase chart height when multiple indicators share the same screen.

**Performance issues**

- Limit the active indicators to the ones that truly add value.
- Keep the visible data range practical.
- Avoid unnecessary recalculation patterns when switching or stacking indicators.

## Combined Mistakes and Future References

- The original content mixed legacy Vue component registration with a Vue 3 Composition API requirement. All runnable examples above were normalized to **complete Vue 3 Single File Components using `<script setup>`**.
- The original content used partial or placeholder code blocks. Those were replaced with **full runnable examples** so that every implementation section can be copied directly into a Vue 3 Syncfusion project.
- The original content used `StockChartIndicatorCollectionDirective` and `<e-stockchart-indicator-collection>`. For Vue 3 Stock Chart indicator usage, the examples were corrected to use:
  - `StockChartIndicatorsDirective as EStockchartIndicators`
  - `StockChartIndicatorDirective as EStockchartIndicator`
  - `<e-stockchart-indicators>`
- Indicator type values such as `SMA`, `EMA`, `RSI`, `MACD`, `ATR`, and `TMA` were normalized to the Stock Chart-friendly forms used by Vue examples:
  - `Sma`
  - `Ema`
  - `Rsi`
  - `Macd`
  - `Atr`
  - `Tma`
- The safe module rule for indicators was applied everywhere. Every indicator-based example now imports and injects:
  - `LineSeries`
  - `AreaSeries`
  - `SplineSeries`
  - `CandleSeries`
  - `HiloOpenCloseSeries`
  - `HiloSeries`
  - `RangeAreaSeries`
  - `Trendlines`
  - `EmaIndicator`
  - `RsiIndicator`
  - `BollingerBands`
  - `TmaIndicator`
  - `MomentumIndicator`
  - `SmaIndicator`
  - `AtrIndicator`
  - `AccumulationDistributionIndicator`
  - `MacdIndicator`
  - `StochasticIndicator`
- This full import-and-provider pattern prevents common runtime failures such as:
  - `AreaSeries is not defined`
  - missing indicator rendering during runtime switching
  - null initialization errors during indicator or toolbar changes
- `seriesName` should always match the base series `name` exactly. In the corrected examples, every indicator targets `seriesName="Candle"` and the base series is explicitly named `Candle`.
- Indicators that rely on OHLC or volume-aware behavior should not be attached to incomplete data structures. The corrected samples keep `open`, `high`, `low`, `close`, and `volume` together so the examples remain stable and realistic.
- Separate axes should be created only when they improve readability, and the axis `name` must match the indicator `yAxisName` exactly.
- Unsupported provider modules such as `StockLegend` should not be injected into the Stock Chart