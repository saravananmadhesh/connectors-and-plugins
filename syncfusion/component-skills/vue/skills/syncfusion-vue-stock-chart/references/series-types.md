## Trendlines & Technical Indicators

This next part continues the same Vue 3 Composition API structure and keeps every example fully expanded with proper Syncfusion imports, correct `provide('stockChart', [...])` injection, and complete template/script coverage.

## Table of Content
- [Trendlines & Technical Indicators](#trendlines--technical-indicators)
- [Shared Notes Before the Examples](#shared-notes-before-the-examples)
- [Trendline Fundamentals](#trendline-fundamentals)
- [Linear Trendline Series](#linear-trendline-series)
  - [Linear Trendline Implementation](#linear-trendline-implementation)
  - [Linear Trendline Customization](#linear-trendline-customization)
  - [Linear Trendline When to Use](#linear-trendline-when-to-use)
- [Candlestick Trendline Series](#candlestick-trendline-series)
  - [Candlestick Trendline Implementation](#candlestick-trendline-implementation)
  - [Candlestick Trendline When to Use](#candlestick-trendline-when-to-use)
- [Technical Indicator Fundamentals](#technical-indicator-fundamentals)
- [Simple Moving Average and Exponential Moving Average](#simple-moving-average-and-exponential-moving-average)
  - [SMA and EMA Indicator Implementation](#sma-and-ema-indicator-implementation)
  - [SMA and EMA Indicator When to Use](#sma-and-ema-indicator-when-to-use)
- [Bollinger Bands](#bollinger-bands)
  - [Bollinger Bands Indicator Implementation](#bollinger-bands-indicator-implementation)
  - [Bollinger Bands Indicator When to Use](#bollinger-bands-indicator-when-to-use)
- [Relative Strength Index](#relative-strength-index)
  - [RSI Indicator Implementation](#rsi-indicator-implementation)
  - [RSI Indicator When to Use](#rsi-indicator-when-to-use)
- [MACD Indicator](#macd-indicator)
  - [MACD Indicator Implementation](#macd-indicator-implementation)
  - [MACD Indicator When to Use](#macd-indicator-when-to-use)
- [Accumulation Distribution](#accumulation-distribution)
  - [Accumulation Distribution Indicator Implementation](#accumulation-distribution-indicator-implementation)
  - [Accumulation Distribution Indicator When to Use](#accumulation-distribution-indicator-when-to-use)
- [Technical Indicator Comparison](#technical-indicator-comparison)
- [Combining Trendlines and Indicators](#combining-trendlines-and-indicators)
  - [Trendline and Indicator Combined Example](#trendline-and-indicator-combined-example)
- [Import and Provider Mapping Summary](#import-and-provider-mapping-summary)
  - [Required component and directive imports](#required-component-and-directive-imports)
  - [Required module imports by feature](#required-module-imports-by-feature)
  - [Correct Vue 3 provider pattern](#correct-vue-3-provider-pattern)
- [Rule Applied for Partial Snippets](#rule-applied-for-partial-snippets)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)


## Shared Notes Before the Examples

- All samples below are written as complete Vue 3 SFCs using `<script setup>`.
- All trendline-only samples keep focused imports for the exact series behavior they render.
- All technical-indicator-capable samples intentionally import and inject the full indicator-safe module set so runtime indicator switching does not fail with missing modules such as `AreaSeries`, `SplineSeries`, or related indicator dependencies.
- Every technical indicator example keeps the `seriesName` aligned with the base price series `name`.
- If an indicator depends on OHLC or volume-based data, the source data includes those fields explicitly.
- Where a trendline or indicator is conceptually attached to a series, the example keeps that relationship visible in the template structure.
- No example injects `StockLegend`, because that module name is not part of the stock-chart provider pattern and can trigger avoidable runtime warnings.
- The code below is structured to avoid the specific runtime issues you reported, especially:
  - `ReferenceError: AreaSeries is not defined`
  - `Module "StockLegend" is not available in StockChart component`
  - `Cannot read properties of null (reading 'initializeChart')` during indicator selection

## Trendline Fundamentals

A trendline is attached to a series and is used to estimate or visualize directional movement over time.

Common use cases:

- detect overall uptrend or downtrend
- estimate support or resistance direction
- simplify noisy price movements
- add forecast-style context to a stock chart

## Linear Trendline Series

The most common trendline setup is a line series with a linear trendline.

### Linear Trendline Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="linear-trendline-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Line Series with Linear Trendline"
      width="100%"
      height="440px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close Price"
          :width="2"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#E91E63"
              :width="2"
            />
          </e-stockchart-trendlines>
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartTrendlinesDirective as EStockchartTrendlines,
  StockChartTrendlineDirective as EStockchartTrendline,
  DateTime,
  LineSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), close: 102 },
  { date: new Date(2024, 0, 2), close: 105 },
  { date: new Date(2024, 0, 3), close: 104 },
  { date: new Date(2024, 0, 4), close: 108 },
  { date: new Date(2024, 0, 5), close: 111 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Close Price',
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
  Trendlines,
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

### Linear Trendline Customization

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="linear-trendline-custom-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Customized Linear Trendline"
      width="100%"
      height="440px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close Price"
          :width="2"
          fill="#2196F3"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#FF5722"
              :width="2"
              dashArray="6,4"
              :forwardForecast="2"
              :backwardForecast="1"
            />
          </e-stockchart-trendlines>
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartTrendlinesDirective as EStockchartTrendlines,
  StockChartTrendlineDirective as EStockchartTrendline,
  DateTime,
  LineSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), close: 102 },
  { date: new Date(2024, 0, 2), close: 105 },
  { date: new Date(2024, 0, 3), close: 104 },
  { date: new Date(2024, 0, 4), close: 108 },
  { date: new Date(2024, 0, 5), close: 111 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Close Price',
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
  Trendlines,
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

**Properties:**

- `type` - trendline algorithm such as `Linear`, `Exponential`, `Polynomial`, `Logarithmic`, `Power`, or `MovingAverage`
- `fill` - trendline color
- `width` - trendline width
- `dashArray` - dashed trendline pattern
- `forwardForecast` - extends the trendline into future points
- `backwardForecast` - extends the trendline backward

### Linear Trendline When to Use

- directional trend inspection
- quick forecast-style visualization
- smoothing a single close-price series
- executive dashboards where readability matters more than raw candlestick detail

## Candlestick Trendline Series

Trendlines can also be applied while still keeping full OHLC price visualization.

### Candlestick Trendline Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="candlestick-trendline-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Trendline"
      width="100%"
      height="460px"
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
          name="AAPL"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="MovingAverage"
              fill="#3F51B5"
              :width="2"
              :period="3"
            />
          </e-stockchart-trendlines>
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartTrendlinesDirective as EStockchartTrendlines,
  StockChartTrendlineDirective as EStockchartTrendline,
  DateTime,
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 105, low: 98, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 103, close: 104 },
  { date: new Date(2024, 0, 4), open: 104, high: 111, low: 103, close: 110 },
  { date: new Date(2024, 0, 5), open: 110, high: 113, low: 108, close: 111 }
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
  CandleSeries,
  Trendlines,
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

### Candlestick Trendline When to Use

- when you want full OHLC context plus directional smoothing
- trader-oriented dashboards
- price action review with a lightweight average overlay

## Technical Indicator Fundamentals

Technical indicators are analytical overlays or derived visualizations that use price or volume data to support trading interpretation.

Common categories:

- moving average indicators
- momentum indicators
- volatility indicators
- trend strength indicators
- volume-derived indicators

## Simple Moving Average and Exponential Moving Average

A common first setup is to overlay SMA and EMA on the same stock chart.

### SMA and EMA Indicator Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="sma-ema-indicator-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Candlestick with SMA and EMA"
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
          name="AAPL"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Sma"
          field="Close"
          seriesName="AAPL"
          :period="3"
          fill="#FF9800"
          :width="2"
        />
        <e-stockchart-indicator
          type="Ema"
          field="Close"
          seriesName="AAPL"
          :period="3"
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
  {
    date: new Date(2024, 0, 1),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1500000
  },
  {
    date: new Date(2024, 0, 2),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 2000000
  },
  {
    date: new Date(2024, 0, 3),
    open: 106,
    high: 109,
    low: 103,
    close: 104,
    volume: 1700000
  },
  {
    date: new Date(2024, 0, 4),
    open: 104,
    high: 111,
    low: 103,
    close: 110,
    volume: 2200000
  },
  {
    date: new Date(2024, 0, 5),
    open: 110,
    high: 113,
    low: 108,
    close: 111,
    volume: 1900000
  }
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

### SMA and EMA Indicator When to Use

- compare short-term smoothing approaches
- validate trend continuation or reversal zones
- provide readable overlays on top of candlesticks
- support beginner-friendly financial dashboards

## Bollinger Bands

Bollinger Bands are often used to visualize a moving average with upper and lower volatility bands.

### Bollinger Bands Indicator Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="bollinger-bands-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Bollinger Bands"
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
          name="AAPL"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="BollingerBands"
          field="Close"
          seriesName="AAPL"
          :period="3"
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
  {
    date: new Date(2024, 0, 1),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1500000
  },
  {
    date: new Date(2024, 0, 2),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 2000000
  },
  {
    date: new Date(2024, 0, 3),
    open: 106,
    high: 109,
    low: 103,
    close: 104,
    volume: 1700000
  },
  {
    date: new Date(2024, 0, 4),
    open: 104,
    high: 111,
    low: 103,
    close: 110,
    volume: 2200000
  },
  {
    date: new Date(2024, 0, 5),
    open: 110,
    high: 113,
    low: 108,
    close: 111,
    volume: 1900000
  }
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

### Bollinger Bands Indicator When to Use

- volatility visualization
- band expansion and contraction monitoring
- overbought or oversold interpretation support
- risk-aware market summaries

## Relative Strength Index

RSI is a momentum indicator derived from gain and loss behavior over a period.

### RSI Indicator Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="rsi-indicator-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with RSI"
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
          name="AAPL"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Rsi"
          field="Close"
          seriesName="AAPL"
          :period="3"
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
  {
    date: new Date(2024, 0, 1),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1500000
  },
  {
    date: new Date(2024, 0, 2),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 2000000
  },
  {
    date: new Date(2024, 0, 3),
    open: 106,
    high: 109,
    low: 103,
    close: 104,
    volume: 1700000
  },
  {
    date: new Date(2024, 0, 4),
    open: 104,
    high: 111,
    low: 103,
    close: 110,
    volume: 2200000
  },
  {
    date: new Date(2024, 0, 5),
    open: 110,
    high: 113,
    low: 108,
    close: 111,
    volume: 1900000
  }
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

### RSI Indicator When to Use

- momentum confirmation
- reversal watchlists
- overbought or oversold screening
- combined analysis with candlestick patterns

## MACD Indicator

MACD is often used to compare moving average relationships and infer momentum shifts.

### MACD Indicator Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="macd-indicator-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with MACD"
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
          name="AAPL"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Macd"
          field="Close"
          seriesName="AAPL"
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
  {
    date: new Date(2024, 0, 1),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1500000
  },
  {
    date: new Date(2024, 0, 2),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 2000000
  },
  {
    date: new Date(2024, 0, 3),
    open: 106,
    high: 109,
    low: 103,
    close: 104,
    volume: 1700000
  },
  {
    date: new Date(2024, 0, 4),
    open: 104,
    high: 111,
    low: 103,
    close: 110,
    volume: 2200000
  },
  {
    date: new Date(2024, 0, 5),
    open: 110,
    high: 113,
    low: 108,
    close: 111,
    volume: 1900000
  }
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

### MACD Indicator When to Use

- trend momentum comparison
- crossover-focused dashboards
- swing-trading oriented visualizations
- combined use with RSI or moving averages

## Accumulation Distribution

This indicator relies on price and volume behavior together, so the data set must include `volume`.

### Accumulation Distribution Indicator Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="ad-indicator-chart"
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
          name="AAPL"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        />
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="AccumulationDistribution"
          field="Close"
          seriesName="AAPL"
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
  {
    date: new Date(2024, 0, 1),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1500000
  },
  {
    date: new Date(2024, 0, 2),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 2000000
  },
  {
    date: new Date(2024, 0, 3),
    open: 106,
    high: 109,
    low: 103,
    close: 104,
    volume: 1700000
  },
  {
    date: new Date(2024, 0, 4),
    open: 104,
    high: 111,
    low: 103,
    close: 110,
    volume: 2200000
  },
  {
    date: new Date(2024, 0, 5),
    open: 110,
    high: 113,
    low: 108,
    close: 111,
    volume: 1900000
  }
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

### Accumulation Distribution Indicator When to Use

- price-volume relationship analysis
- participation strength review
- confirmation of bullish or bearish movement
- dashboards that compare direction with capital flow behavior

## Technical Indicator Comparison

| Indicator | Depends On | Best For | Visual Role |
|------|------|------|------|
| SMA | Close | simple smoothing | overlay |
| EMA | Close | faster reaction to price change | overlay |
| BollingerBands | Close | volatility awareness | overlay |
| RSI | Close | momentum reading | derived panel-style indicator |
| MACD | Close | crossover and momentum behavior | derived panel-style indicator |
| AccumulationDistribution | OHLC + Volume | price-volume confirmation | derived panel-style indicator |

## Combining Trendlines and Indicators

This version uses a candlestick price series, a trendline, and one moving-average indicator together.

### Trendline and Indicator Combined Example

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="combined-trendline-indicator-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Candlestick with Trendline and EMA"
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
          name="AAPL"
          bearFillColor="#EF5350"
          bullFillColor="#66BB6A"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#F44336"
              :width="2"
            />
          </e-stockchart-trendlines>
        </e-stockchart-series>
      </e-stockchart-series-collection>

      <e-stockchart-indicators>
        <e-stockchart-indicator
          type="Ema"
          field="Close"
          seriesName="AAPL"
          :period="3"
          fill="#1E88E5"
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
  StockChartTrendlinesDirective as EStockchartTrendlines,
  StockChartTrendlineDirective as EStockchartTrendline,
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
  {
    date: new Date(2024, 0, 1),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1500000
  },
  {
    date: new Date(2024, 0, 2),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 2000000
  },
  {
    date: new Date(2024, 0, 3),
    open: 106,
    high: 109,
    low: 103,
    close: 104,
    volume: 1700000
  },
  {
    date: new Date(2024, 0, 4),
    open: 104,
    high: 111,
    low: 103,
    close: 110,
    volume: 2200000
  },
  {
    date: new Date(2024, 0, 5),
    open: 110,
    high: 113,
    low: 108,
    close: 111,
    volume: 1900000
  }
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

Provides a consolidated view with:

- OHLC price action
- direction-estimation trendline
- moving average overlay for smoothing confirmation

## Import and Provider Mapping Summary

### Required component and directive imports

```vue
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockChartTrendlinesDirective as EStockchartTrendlines,
  StockChartTrendlineDirective as EStockchartTrendline,
  StockChartIndicatorsDirective as EStockchartIndicators,
  StockChartIndicatorDirective as EStockchartIndicator
} from '@syncfusion/ej2-vue-charts'
```

### Required module imports by feature

- `DateTime` - required for date-based X-axis rendering
- `LineSeries` - included for indicator-safe stock-chart switching behavior
- `AreaSeries` - included because indicator and toolbar flows can reference area rendering paths internally
- `SplineSeries` - included for indicator-safe stock-chart switching behavior
- `CandleSeries` - required when the base series uses `type="Candle"`
- `HiloOpenCloseSeries` - included for stock-chart internal series compatibility when series types are changed dynamically
- `HiloSeries` - included for stock-chart internal series compatibility when series types are changed dynamically
- `RangeAreaSeries` - included for stock-chart internal series compatibility when indicators render additional paths
- `Trendlines` - required when any series uses nested stock-chart trendlines
- `SmaIndicator` - required for `type="Sma"`
- `EmaIndicator` - required for `type="Ema"`
- `BollingerBands` - required for `type="BollingerBands"`
- `RsiIndicator` - required for `type="Rsi"`
- `MacdIndicator` - required for `type="Macd"`
- `AccumulationDistributionIndicator` - required for `type="AccumulationDistribution"`
- `TmaIndicator` - included for safe indicator switching
- `MomentumIndicator` - included for safe indicator switching
- `AtrIndicator` - included for safe indicator switching
- `StochasticIndicator` - included for safe indicator switching
- `RangeTooltip` - required for stock-chart range interaction behavior
- `Tooltip` - enables standard tooltip rendering

### Correct Vue 3 provider pattern

```vue
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
```

## Rule Applied for Partial Snippets

To satisfy your formatting rule:

- If the original content only had a conceptual trendline snippet, this copy expands it into a full runnable Vue 3 SFC.
- If the original content only implied indicator attachment without a full template structure, this copy adds the missing `<template>`.
- Every runnable example now includes:
  - template
  - script
  - imports
  - provider injection
  - minimal style block

## Combined Mistakes and Future References

- A stock-chart trendline is not enabled by import alone; it must be injected with `Trendlines` and defined within the target series.
- Technical indicators must be injected explicitly through `provide('stockChart', [...])`; importing indicator modules without provider registration is not enough.
- When indicator switching is possible, importing only the currently visible indicator module is not always sufficient. The safer Vue 3 stock-chart pattern is to inject the full indicator-safe module set, including `LineSeries`, `AreaSeries`, `SplineSeries`, `CandleSeries`, `HiloOpenCloseSeries`, `HiloSeries`, `RangeAreaSeries`, `Trendlines`, `EmaIndicator`, `RsiIndicator`, `BollingerBands`, `TmaIndicator`, `MomentumIndicator`, `SmaIndicator`, `AtrIndicator`, `AccumulationDistributionIndicator`, `MacdIndicator`, and `StochasticIndicator`.
- The `ReferenceError: AreaSeries is not defined` issue happens when `AreaSeries` is referenced in the provider array but is missing from the actual import list.
- The `Module "StockLegend" is not available in StockChart component` warning happens when a non-applicable module name is injected. Use `legendSettings` directly on the stock chart and do not inject `StockLegend`.
- The `Cannot read properties of null (reading 'initializeChart')` error during indicator selection usually indicates that the chart is attempting to initialize an indicator or derived axis path without a complete base-module set, without a valid base series, or without a correct `seriesName` to `name` match.
- The `seriesName` of each technical indicator should match the `name` of the base series exactly, otherwise the indicator may not bind to the intended series.
- Indicator examples that depend on volume-based calculations should keep `volume` in the data model even if the main visual focus is candlestick price movement.
- If the source examples mix Vue 2 and Vue 3 patterns, they should be normalized to `<script setup>` for a Vue 3 Composition API target instead of using legacy `export default` patterns.
- For stock-chart trendlines, it is better to keep the trendline nested inside the related series instead of separating the logic conceptually, because that makes the series-to-trendline relationship explicit and maintainable.
- Using short sample periods such as `3` is acceptable for demonstration, but real financial dashboards typically use domain-specific periods such as `9`, `14`, `20`, `50`, or `200` depending on the strategy.
- The safest support-ready default for indicator samples is to keep the base series as a valid OHLC structure with `name`, `open`, `high`, `low`, `close`, and `volume` mapped correctly before adding any derived indicator.