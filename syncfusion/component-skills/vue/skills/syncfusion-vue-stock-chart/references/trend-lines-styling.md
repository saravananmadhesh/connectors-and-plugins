# Trend Lines & Styling

## Table of Contents
- [Trend Lines Overview](#trend-lines-overview)
  - [Module Requirement](#module-requirement)
- [Trend Line Types](#trend-line-types)
  - [1. Linear Trend Line](#1-linear-trend-line)
    - [Linear Trend Line Implementation](#linear-trend-line-implementation)
  - [2. Exponential Trend Line](#2-exponential-trend-line)
    - [Exponential Trend Line Implementation](#exponential-trend-line-implementation)
  - [3. Logarithmic Trend Line](#3-logarithmic-trend-line)
    - [Logarithmic Trend Line Implementation](#logarithmic-trend-line-implementation)
  - [4. Power Trend Line](#4-power-trend-line)
    - [Power Trend Line Implementation](#power-trend-line-implementation)
  - [5. Moving Average Trend Line](#5-moving-average-trend-line)
    - [Moving Average Trend Line Implementation](#moving-average-trend-line-implementation)
- [Implementation](#implementation)
  - [Basic Trend Line Implementation](#basic-trend-line-implementation)
  - [Multiple Trend Lines Implementation](#multiple-trend-lines-implementation)
  - [Trend Line Properties](#trend-line-properties)
- [Gradient Fills](#gradient-fills)
  - [Linear Gradient](#linear-gradient)
  - [Gradient for Area Series](#gradient-for-area-series)
    - [Gradient for Area Series Implementation](#gradient-for-area-series-implementation)
  - [Dynamic Gradient](#dynamic-gradient)
    - [Dynamic Gradient Implementation](#dynamic-gradient-implementation)
- [Series Styling](#series-styling)
  - [Candlestick Styling](#candlestick-styling)
  - [Line Series Styling](#line-series-styling)
  - [Area Series Styling](#area-series-styling)
  - [Complete Series Styling Example](#complete-series-styling-example)
- [Theme Integration](#theme-integration)
  - [Available Themes](#available-themes)
  - [Dark Theme](#dark-theme)
  - [Theme Switching](#theme-switching)
- [Advanced Customization](#advanced-customization)
  - [Custom CSS Classes](#custom-css-classes)
    - [Custom CSS Classes Implementation](#custom-css-classes-implementation)
  - [CSS Variables](#css-variables)
    - [CSS Variables Implementation](#css-variables-implementation)
  - [SVG Export Styling](#svg-export-styling)
    - [SVG Export Styling Implementation](#svg-export-styling-implementation)
  - [Responsive Styling](#responsive-styling)
    - [Responsive Styling Implementation](#responsive-styling-implementation)
- [Complete Styling Example](#complete-styling-example)
  - [Complete Styling Example Implementation](#complete-styling-example-implementation)
- [Troubleshooting](#troubleshooting)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Trend Lines Overview

Trend lines help identify direction, smoothing patterns, and support or resistance style movement on top of the base stock series. In Vue 3 Composition API, Stock Chart trend lines are most reliably configured inside the related series using nested trendline directives instead of relying on partial object snippets alone.

### Module Requirement

For Stock Chart trend lines, the required setup is:

- import `Trendlines`
- import the trendline directives
- inject `Trendlines` through `provide('stockChart', [...])`
- define the trend line inside the target `<e-stockchart-series>`

A stable trendline-capable provider pattern is:

- `DateTime`
- `CandleSeries` or `LineSeries` depending on the base series
- `Trendlines`
- `RangeTooltip`
- `Tooltip`

## Trend Line Types

Stock Chart supports these commonly used trend line types:

- `Linear`
- `Exponential`
- `Logarithmic`
- `Power`
- `MovingAverage`

### 1. Linear Trend Line

A linear trend line provides a straight direction estimate across the selected series.

#### Linear Trend Line Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="linear-trendline-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Linear Trend Line"
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
          name="Price"
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#2196F3"
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
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 106, low: 98, close: 103 },
  { date: new Date(2024, 0, 2), open: 103, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 104, close: 105 },
  { date: new Date(2024, 0, 4), open: 105, high: 112, low: 103, close: 110 },
  { date: new Date(2024, 0, 5), open: 110, high: 114, low: 108, close: 112 },
  { date: new Date(2024, 0, 6), open: 112, high: 116, low: 110, close: 114 }
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

**Use case:** Quick trend direction identification.

### 2. Exponential Trend Line

An exponential trend line is useful when changes accelerate over time and you want the fitted direction to reflect that curve.

#### Exponential Trend Line Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="exponential-trendline-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Line Series with Exponential Trend Line"
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
          fill="#455A64"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Exponential"
              fill="#FF9800"
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
  { date: new Date(2024, 0, 1), close: 100 },
  { date: new Date(2024, 0, 2), close: 102 },
  { date: new Date(2024, 0, 3), close: 106 },
  { date: new Date(2024, 0, 4), close: 111 },
  { date: new Date(2024, 0, 5), close: 118 },
  { date: new Date(2024, 0, 6), close: 126 }
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

**Use case:** Accelerating bullish or bearish trends.

### 3. Logarithmic Trend Line

A logarithmic trend line is useful when movement is initially sharp and later begins to level out.

#### Logarithmic Trend Line Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="logarithmic-trendline-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Line Series with Logarithmic Trend Line"
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
          fill="#607D8B"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Logarithmic"
              fill="#4CAF50"
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
  { date: new Date(2024, 0, 1), close: 100 },
  { date: new Date(2024, 0, 2), close: 109 },
  { date: new Date(2024, 0, 3), close: 115 },
  { date: new Date(2024, 0, 4), close: 119 },
  { date: new Date(2024, 0, 5), close: 122 },
  { date: new Date(2024, 0, 6), close: 124 }
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

**Use case:** Decelerating trend behavior.

### 4. Power Trend Line

A power trend line can be used when the fit needs to reflect a more curved relationship than a straight line provides.

#### Power Trend Line Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="power-trendline-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Line Series with Power Trend Line"
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
          fill="#5D4037"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Power"
              fill="#9C27B0"
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
  { date: new Date(2024, 0, 1), close: 100 },
  { date: new Date(2024, 0, 2), close: 101 },
  { date: new Date(2024, 0, 3), close: 105 },
  { date: new Date(2024, 0, 4), close: 112 },
  { date: new Date(2024, 0, 5), close: 121 },
  { date: new Date(2024, 0, 6), close: 133 }
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

**Use case:** Curved trend fitting for non-linear movement.

### 5. Moving Average Trend Line

A moving-average trend line smooths the base series using a trendline-style configuration. It is configured as a trend line attached to the series, not as a separate technical indicator.

#### Moving Average Trend Line Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="moving-average-trendline-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Candlestick with Moving Average Trend Line"
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
          name="Price"
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="MovingAverage"
              :period="5"
              fill="#F44336"
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
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 106, low: 98, close: 103 },
  { date: new Date(2024, 0, 2), open: 103, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 104, close: 105 },
  { date: new Date(2024, 0, 4), open: 105, high: 112, low: 103, close: 110 },
  { date: new Date(2024, 0, 5), open: 110, high: 114, low: 108, close: 112 },
  { date: new Date(2024, 0, 6), open: 112, high: 116, low: 110, close: 114 },
  { date: new Date(2024, 0, 7), open: 114, high: 118, low: 113, close: 117 }
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

**Use case:** Noise reduction and trend smoothing.

## Implementation

### Basic Trend Line Implementation

This is the minimal complete Vue 3 Composition API structure for a stock chart with one linear trend line.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="basic-trendline-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Basic Trend Line"
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
          name="Price"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#2196F3"
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
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 98, high: 104, low: 96, close: 101 },
  { date: new Date(2024, 0, 2), open: 101, high: 106, low: 99, close: 104 },
  { date: new Date(2024, 0, 3), open: 104, high: 108, low: 102, close: 107 },
  { date: new Date(2024, 0, 4), open: 107, high: 111, low: 105, close: 109 },
  { date: new Date(2024, 0, 5), open: 109, high: 114, low: 108, close: 113 }
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

const tooltip = { enable: true }

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

### Multiple Trend Lines Implementation

Multiple trend lines can be attached to the same series by nesting multiple `<e-stockchart-trendline>` entries under the same trendline collection.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="multiple-trendline-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Multiple Trend Lines"
      width="100%"
      height="480px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close Price"
          :width="2"
          fill="#37474F"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#2196F3"
              :width="2"
            />
            <e-stockchart-trendline
              type="MovingAverage"
              :period="4"
              fill="#FF9800"
              :width="1.5"
              dashArray="4,4"
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
  { date: new Date(2024, 0, 1), close: 100 },
  { date: new Date(2024, 0, 2), close: 104 },
  { date: new Date(2024, 0, 3), close: 102 },
  { date: new Date(2024, 0, 4), close: 108 },
  { date: new Date(2024, 0, 5), close: 111 },
  { date: new Date(2024, 0, 6), close: 115 },
  { date: new Date(2024, 0, 7), close: 114 }
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

const tooltip = { enable: true }

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

### Trend Line Properties

The most important trend line properties are:

- `type` — `Linear`, `Exponential`, `Logarithmic`, `Power`, or `MovingAverage`
- `fill` — trend line color
- `width` — line thickness
- `dashArray` — dashed styling such as `5,5`
- `opacity` — transparency
- `period` — required for `MovingAverage`
- `forwardForecast` — extends the trend line into future points
- `backwardForecast` — extends the trend line backward

For Vue 3 Stock Chart, the most reliable configuration is to place these properties directly on `<e-stockchart-trendline>` rather than maintaining detached object arrays that are never bound correctly in the template.

## Gradient Fills

Gradient fills can improve visual hierarchy when using area-style series or styled overlays. They are typically applied using SVG `<defs>` and a `fill="url(#gradient-id)"` mapping.

### Linear Gradient

A linear gradient is most practical with an `Area` series, where the fill region is visible. For candlestick series, standard bull and bear fills are clearer than gradient fills.

### Gradient for Area Series

This example renders an area series with an inline SVG linear gradient.

#### Gradient for Area Series Implementation

```vue
<template>
  <div class="control-section">
    <svg width="0" height="0" style="position: absolute;">
      <defs>
        <linearGradient id="price-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2196F3" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#2196F3" stop-opacity="0.1" />
        </linearGradient>
      </defs>
    </svg>

    <ejs-stockchart
      id="gradient-area-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Area Series with Gradient Fill"
      width="100%"
      height="440px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Area"
          xName="date"
          yName="close"
          name="Close Price"
          fill="url(#price-gradient)"
          :width="2"
          border="{ width: 1, color: '#2196F3' }"
        />
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
  DateTime,
  AreaSeries,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), close: 100 },
  { date: new Date(2024, 0, 2), close: 103 },
  { date: new Date(2024, 0, 3), close: 107 },
  { date: new Date(2024, 0, 4), close: 105 },
  { date: new Date(2024, 0, 5), close: 110 },
  { date: new Date(2024, 0, 6), close: 114 }
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

const tooltip = { enable: true }

provide('stockChart', [
  DateTime,
  AreaSeries,
  RangeTooltip,
  Tooltip
])
</script>

<style>
.control-section {
  margin: 20px;
  position: relative;
}
</style>
```

### Dynamic Gradient

A dynamic gradient can be injected into the rendered SVG after mount if you want programmatic control instead of a static `<defs>` block.

#### Dynamic Gradient Implementation

```vue
<template>
  <div class="control-section" ref="wrapperRef">
    <ejs-stockchart
      id="dynamic-gradient-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Dynamic Gradient Area Series"
      width="100%"
      height="440px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Area"
          xName="date"
          yName="close"
          name="Close Price"
          fill="url(#dynamic-price-gradient)"
          :width="2"
          border="{ width: 1, color: '#4CAF50' }"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { nextTick, onMounted, provide, ref } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  AreaSeries,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const wrapperRef = ref(null)

const chartData = [
  { date: new Date(2024, 0, 1), close: 100 },
  { date: new Date(2024, 0, 2), close: 102 },
  { date: new Date(2024, 0, 3), close: 107 },
  { date: new Date(2024, 0, 4), close: 111 },
  { date: new Date(2024, 0, 5), close: 116 }
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

const tooltip = { enable: true }

const createGradient = async () => {
  await nextTick()
  const svg = wrapperRef.value?.querySelector('svg')
  if (!svg || svg.querySelector('#dynamic-price-gradient')) {
    return
  }

  const ns = 'http://www.w3.org/2000/svg'
  const defs = document.createElementNS(ns, 'defs')
  const gradient = document.createElementNS(ns, 'linearGradient')

  gradient.setAttribute('id', 'dynamic-price-gradient')
  gradient.setAttribute('x1', '0%')
  gradient.setAttribute('y1', '0%')
  gradient.setAttribute('x2', '0%')
  gradient.setAttribute('y2', '100%')

  const stop1 = document.createElementNS(ns, 'stop')
  stop1.setAttribute('offset', '0%')
  stop1.setAttribute('stop-color', '#4CAF50')
  stop1.setAttribute('stop-opacity', '0.8')

  const stop2 = document.createElementNS(ns, 'stop')
  stop2.setAttribute('offset', '100%')
  stop2.setAttribute('stop-color', '#4CAF50')
  stop2.setAttribute('stop-opacity', '0.1')

  gradient.appendChild(stop1)
  gradient.appendChild(stop2)
  defs.appendChild(gradient)
  svg.insertBefore(defs, svg.firstChild)
}

onMounted(() => {
  createGradient()
})

provide('stockChart', [
  DateTime,
  AreaSeries,
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

## Series Styling

Series styling determines how the base series communicates state, direction, and emphasis.

### Candlestick Styling

For candlestick styling, the most important properties are:

- `bullFillColor` — up candle color
- `bearFillColor` — down candle color
- `enableSolidCandles` — whether candles render as solid
- `border` or `borderWidth` — outline styling when needed

### Line Series Styling

For line series styling, the most important properties are:

- `fill` — line color
- `width` — line thickness
- `dashArray` — dashed pattern
- `opacity` — transparency

### Area Series Styling

For area series styling, the most important properties are:

- `fill` — area color or gradient reference
- `opacity` — transparency control
- `border` — boundary line color and width

### Complete Series Styling Example

This example combines candlestick styling and a styled line overlay as two separate series.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="series-styling-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Complete Series Styling Example"
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
          name="Candles"
          bullFillColor="#2E7D32"
          bearFillColor="#C62828"
        />
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close Line"
          :width="2"
          fill="#FF9800"
          dashArray="4,4"
        />
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
  DateTime,
  CandleSeries,
  LineSeries,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 106, low: 98, close: 103 },
  { date: new Date(2024, 0, 2), open: 103, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 104, close: 105 },
  { date: new Date(2024, 0, 4), open: 105, high: 112, low: 103, close: 110 },
  { date: new Date(2024, 0, 5), open: 110, high: 114, low: 108, close: 112 },
  { date: new Date(2024, 0, 6), open: 112, high: 116, low: 110, close: 114 }
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

const tooltip = { enable: true }

const legendSettings = {
  visible: true
}

provide('stockChart', [
  DateTime,
  CandleSeries,
  LineSeries,
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

## Theme Integration

Theme integration is usually handled at the application level rather than inside the stock chart component itself.

### Available Themes

Common Syncfusion themes include:

- Material
- Bootstrap5
- Fabric
- Tailwind
- High Contrast

### Dark Theme

Dark variants should be applied by importing the matching theme CSS files in the application entry layer, not by injecting styles directly into the stock chart instance.

### Theme Switching

The safest runtime strategy is:

- manage the active theme at the app level
- swap the imported theme stylesheet set consistently
- avoid mixing multiple Syncfusion theme styles at the same time
- keep custom chart styling layered on top of the selected theme

For Vue 3 applications, theme switching is usually cleaner in the root layout or application shell than inside each chart component.

## Advanced Customization

Advanced customization is most maintainable when it is expressed through a small number of predictable hooks:

- class names on the chart wrapper
- scoped styles with `:deep()`
- CSS variables for reusable colors
- explicit export methods using a chart ref
- responsive wrapper sizing

### Custom CSS Classes

This example applies custom wrapper classes and scoped deep selectors to change chart appearance.

#### Custom CSS Classes Implementation

```vue
<template>
  <div class="custom-chart-wrapper">
    <ejs-stockchart
      id="custom-css-stockchart"
      class="custom-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Custom CSS Classes Example"
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
          name="Price"
          bullFillColor="#2E7D32"
          bearFillColor="#C62828"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#FF9800"
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
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 98, high: 104, low: 96, close: 101 },
  { date: new Date(2024, 0, 2), open: 101, high: 106, low: 99, close: 104 },
  { date: new Date(2024, 0, 3), open: 104, high: 108, low: 102, close: 107 },
  { date: new Date(2024, 0, 4), open: 107, high: 111, low: 105, close: 109 },
  { date: new Date(2024, 0, 5), open: 109, high: 114, low: 108, close: 113 }
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

const tooltip = { enable: true }

provide('stockChart', [
  DateTime,
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
])
</script>

<style scoped>
.custom-chart-wrapper {
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.custom-chart :deep(.e-chart) {
  background: #ffffff;
}

.custom-chart :deep(.e-axis-title),
.custom-chart :deep(.e-title) {
  fill: #1f2937;
}

.custom-chart :deep(.e-grid-line) {
  stroke: rgba(0, 0, 0, 0.08);
}
</style>
```

### CSS Variables

This example uses CSS variables to centralize chart styling colors.

#### CSS Variables Implementation

```vue
<template>
  <div class="stock-theme-vars">
    <ejs-stockchart
      id="css-vars-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="CSS Variables Styling Example"
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
          name="Price"
          bullFillColor="var(--stock-up-color)"
          bearFillColor="var(--stock-down-color)"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="var(--stock-line-color)"
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
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 106, low: 98, close: 103 },
  { date: new Date(2024, 0, 2), open: 103, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 109, low: 104, close: 105 },
  { date: new Date(2024, 0, 4), open: 105, high: 112, low: 103, close: 110 },
  { date: new Date(2024, 0, 5), open: 110, high: 114, low: 108, close: 112 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  majorGridLines: { color: 'var(--stock-grid-color)' },
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = { enable: true }

provide('stockChart', [
  DateTime,
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
])
</script>

<style scoped>
.stock-theme-vars {
  --stock-up-color: #4CAF50;
  --stock-down-color: #F44336;
  --stock-line-color: #2196F3;
  --stock-grid-color: rgba(0, 0, 0, 0.1);
  margin: 20px;
}
</style>
```

### SVG Export Styling

This example uses a chart ref and exports the styled stock chart as SVG or PDF.

#### SVG Export Styling Implementation

```vue
<template>
  <div class="control-section">
    <div class="toolbar">
      <button type="button" class="action-btn" @click="exportAsSvg">
        Export SVG
      </button>
      <button type="button" class="action-btn" @click="exportAsPdf">
        Export PDF
      </button>
    </div>

    <ejs-stockchart
      ref="stockChartRef"
      id="export-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Export Styling Example"
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
          name="Price"
          bullFillColor="#2E7D32"
          bearFillColor="#C62828"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#2196F3"
              :width="2"
              dashArray="5,5"
            />
          </e-stockchart-trendlines>
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
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
  Tooltip,
  Export
} from '@syncfusion/ej2-vue-charts'

const stockChartRef = ref(null)

const chartData = [
  { date: new Date(2024, 0, 1), open: 98, high: 104, low: 96, close: 101 },
  { date: new Date(2024, 0, 2), open: 101, high: 106, low: 99, close: 104 },
  { date: new Date(2024, 0, 3), open: 104, high: 108, low: 102, close: 107 },
  { date: new Date(2024, 0, 4), open: 107, high: 111, low: 105, close: 109 },
  { date: new Date(2024, 0, 5), open: 109, high: 114, low: 108, close: 113 }
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

const tooltip = { enable: true }

const exportAsSvg = () => {
  stockChartRef.value?.ej2Instances?.export('SVG', 'StockChart')
}

const exportAsPdf = () => {
  stockChartRef.value?.ej2Instances?.export('PDF', 'StockChart')
}

provide('stockChart', [
  DateTime,
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip,
  Export
])
</script>

<style scoped>
.control-section {
  margin: 20px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.action-btn {
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}
</style>
```

### Responsive Styling

This example keeps the chart wrapper responsive and adjusts visual density through CSS.

#### Responsive Styling Implementation

```vue
<template>
  <div id="stockchart-container">
    <ejs-stockchart
      id="responsive-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Responsive Styling Example"
      width="100%"
      height="100%"
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
          name="Price"
          bullFillColor="#2E7D32"
          bearFillColor="#C62828"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#FF9800"
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
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 98, high: 104, low: 96, close: 101 },
  { date: new Date(2024, 0, 2), open: 101, high: 106, low: 99, close: 104 },
  { date: new Date(2024, 0, 3), open: 104, high: 108, low: 102, close: 107 },
  { date: new Date(2024, 0, 4), open: 107, high: 111, low: 105, close: 109 },
  { date: new Date(2024, 0, 5), open: 109, high: 114, low: 108, close: 113 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = { enable: true }

const legendSettings = {
  visible: true
}

provide('stockChart', [
  DateTime,
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
])
</script>

<style scoped>
#stockchart-container {
  width: 100%;
  height: 500px;
  margin: 20px 0;
}

@media (max-width: 768px) {
  #stockchart-container {
    height: 350px;
  }

  :deep(.e-stockchart-title) {
    font-size: 14px;
  }

  :deep(.e-axis-label) {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  #stockchart-container {
    height: 250px;
  }

  :deep(.e-legend-item) {
    display: none;
  }
}
</style>
```

## Complete Styling Example

This final example combines:

- custom candlestick colors
- a trend line
- grid styling
- wrapper styling
- responsive-friendly layout structure

### Complete Styling Example Implementation

```vue
<template>
  <div class="stock-chart-wrapper">
    <ejs-stockchart
      id="complete-styling-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Complete Styling Example"
      width="100%"
      height="100%"
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
          name="Price"
          bullFillColor="#2E7D32"
          bearFillColor="#C62828"
        >
          <e-stockchart-trendlines>
            <e-stockchart-trendline
              type="Linear"
              fill="#2196F3"
              :width="2"
              :opacity="0.7"
              dashArray="5,5"
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
  { date: new Date(2024, 0, 1), open: 98, high: 104, low: 96, close: 101 },
  { date: new Date(2024, 0, 2), open: 101, high: 106, low: 99, close: 104 },
  { date: new Date(2024, 0, 3), open: 104, high: 108, low: 102, close: 107 },
  { date: new Date(2024, 0, 4), open: 107, high: 111, low: 105, close: 109 },
  { date: new Date(2024, 0, 5), open: 109, high: 114, low: 108, close: 113 },
  { date: new Date(2024, 0, 6), open: 113, high: 117, low: 111, close: 115 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { color: 'rgba(0, 0, 0, 0.1)' }
}

const primaryYAxis = {
  labelFormat: '${value}',
  majorGridLines: { color: 'rgba(0, 0, 0, 0.1)' },
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = { enable: true }

provide('stockChart', [
  DateTime,
  CandleSeries,
  Trendlines,
  RangeTooltip,
  Tooltip
])
</script>

<style scoped>
.stock-chart-wrapper {
  width: 100%;
  height: 500px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

:deep(.e-chart) {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
```

## Troubleshooting

**Trend lines not showing**

- Ensure `Trendlines` is imported and injected through `provide('stockChart', [...])`.
- Ensure the trend line is defined inside the target series using `<e-stockchart-trendlines>` and `<e-stockchart-trendline>`.
- Ensure the base series type and field mapping are correct.

**Styling not applied**

- Use `:deep()` for scoped style overrides that target internal chart elements.
- Avoid depending on selectors that do not exist in the rendered chart output.
- Keep theme-level CSS and component-level CSS responsibilities separate.

**Performance issues with gradients**

- Prefer simple gradients over complex layered SVG effects.
- Use solid fills on large data sets when rendering cost matters.
- Keep only the styles that add actual visual value.

## Combined Mistakes and Future References

- The original content mixed Vue 2 style examples and partial snippets with a Vue 3 Composition API target. All runnable code above was normalized to complete Vue 3 Single File Components using `<script setup>`.
- The original trend line examples used detached `:trendlines="trendlines"` object patterns without fully showing the required directive structure. In the corrected Vue 3 stock-chart patterns above, trend lines are defined explicitly inside the related series with:
  - `<e-stockchart-trendlines>`
  - `<e-stockchart-trendline>`
- A stock-chart trend line is not enabled by import alone. It must be injected with `Trendlines` through `provide('stockChart', [...])`.
- Partial snippets such as a lone trendline array, a lone `applyGradient()` method, or a lone `<e-stockchart-series>` example were expanded or replaced so the result stays runnable and copy-safe.
- Gradient styling is most meaningful for area-like fill regions. For candlestick series, direct bull and bear fill colors are usually clearer and more maintainable than forcing SVG gradients onto candle bodies.
- Theme imports should be handled at the application level rather than scattered inside individual chart components. Keeping theme selection in the app shell prevents conflicting theme CSS behavior.
- If responsive styling is required, wrapper-level height control is more reliable than assuming the chart will infer every responsive adjustment automatically.
- If exporting is required, the chart instance should be accessed through a Vue ref and the export-related module should be injected explicitly.
- Unsupported or mismatched selector assumptions in scoped CSS often cause styling failures. Use wrapper classes plus `:deep()` when styling internal Syncfusion chart output.
- If you later combine trend lines with indicators in the same sample, keep using the full indicator-safe import and provider pattern whenever indicators can be switched at runtime.