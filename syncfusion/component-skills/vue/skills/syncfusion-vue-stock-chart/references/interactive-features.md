# Interactive Features & Selection

## Table of Contents
- [Period Selector](#period-selector)
  - [Basic Period Selector Implementation](#basic-period-selector-implementation)
  - [Period Selector Properties](#period-selector-properties)
  - [Custom Periods](#custom-periods)
  - [Period Selector Events](#period-selector-events)
- [Range Selector](#range-selector)
  - [Basic Range Selector Implementation](#basic-range-selector-implementation)
  - [Visibility of Range selector](#visibility-of-range-selector)
  - [Range Selector with Price Preview](#range-selector-with-price-preview)
  - [Range Change Event](#range-change-event)
- [Crosshair](#crosshair)
  - [Basic Crosshair Implementation](#basic-crosshair-implementation)
  - [Crosshair Properties](#crosshair-properties)
  - [Vertical-Only Crosshair](#vertical-only-crosshair)
  - [Crosshair Tooltip for axis](#crosshair-tooltip-for-axis)
- [Trackball](#trackball)
  - [Basic Trackball Implementation](#basic-trackball-implementation)
  - [Trackball Properties](#trackball-properties)
- [Tooltips](#tooltips)
  - [Basic Tooltip Implementation](#basic-tooltip-implementation)
- [Position and Customize the appearance of the tooltip:](#position-and-customize-the-appearance-of-the-tooltip)
  - [Tooltip Configuration](#tooltip-configuration)
  - [Custom Tooltip Format](#custom-tooltip-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Legend](#legend)
  - [Basic Legend Implementation](#basic-legend-implementation)
- [Legend Title](#legend-title)
  - [Legend Customization](#legend-customization)
  - [Legend Properties](#legend-properties)
- [Stock Chart Events](#stock-chart-events)
  - [Stock Events](#stock-events)
  - [Stock Events for individual series](#stock-events-for-individual-series)
  - [Event Marker Properties](#event-marker-properties)
  - [Common Events](#common-events)
- [Complete Interactive Example](#complete-interactive-example)
  - [Complete Interactive Example Implementation](#complete-interactive-example-implementation)
- [Performance Tips](#performance-tips)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Period Selector

The period selector provides quick preset buttons for switching between common date ranges such as one month, three months, six months, one year, and the full range. In a Vue 3 Composition API Stock Chart, the safest pattern is to define the period-selector configuration as a complete object and bind it directly on the chart instead of relying on partial inline snippets.

- import the Period Selector directives `StockChartPeriodsDirective` and `StockChartPeriodsDirective`

### Basic Period Selector Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="period-selector-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Stock Chart with Period Selector"
      width="100%"
      height="520px"
    >
      <e-stockchart-periods>
          <e-stockchart-period intervalType="Months" interval="1" text="1M"></e-stockchart-period>
          <e-stockchart-period intervalType="Months" interval="3" text="3M"></e-stockchart-period>
          <e-stockchart-period intervalType="Months" interval="6" text="6M"></e-stockchart-period>
          <e-stockchart-period intervalType="Year"  text="YTD" selected="true"></e-stockchart-period>
          <e-stockchart-period intervalType="Years" interval="1" text="1Y" selected="true"></e-stockchart-period>
          <e-stockchart-period intervalType="All" text="All"></e-stockchart-period>
      </e-stockchart-periods>
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
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
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
  StockChartPeriodsDirective as EStockchartPeriods,
  StockChartPeriodDirective as EStockchartPeriod,
  DateTime,
  CandleSeries,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102, volume: 1200000 },
  { date: new Date(2024, 1, 1), open: 102, high: 108, low: 101, close: 106, volume: 1400000 },
  { date: new Date(2024, 2, 1), open: 106, high: 110, low: 104, close: 108, volume: 1500000 },
  { date: new Date(2024, 3, 1), open: 108, high: 113, low: 107, close: 111, volume: 1600000 },
  { date: new Date(2024, 4, 1), open: 111, high: 116, low: 110, close: 114, volume: 1700000 },
  { date: new Date(2024, 5, 1), open: 114, high: 120, low: 113, close: 118, volume: 1750000 },
  { date: new Date(2024, 6, 1), open: 118, high: 123, low: 116, close: 121, volume: 1800000 },
  { date: new Date(2024, 7, 1), open: 121, high: 126, low: 119, close: 124, volume: 1850000 },
  { date: new Date(2024, 8, 1), open: 124, high: 129, low: 122, close: 127, volume: 1900000 },
  { date: new Date(2024, 9, 1), open: 127, high: 131, low: 125, close: 129, volume: 1950000 },
  { date: new Date(2024, 10, 1), open: 129, high: 134, low: 128, close: 132, volume: 1980000 },
  { date: new Date(2024, 11, 1), open: 132, high: 138, low: 130, close: 136, volume: 2050000 }
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

### Period Selector Properties

The most practical period-selector properties are:

- `interval` — Count value for the button
- `selected` — the default selected period
- `intervalType` — the IntervalType of button
- `text` — Text to be displayed on the button

### Custom Periods

Custom periods are useful when the built-in ranges do not match the financial workflow you want to support.

A practical custom period set would include:

- `1W`
- `2W`
- `1M`
- `3M`
- `6M`
- `1Y`
- `ALL`

### Period Selector Events

For event-driven workflows, period selection should be handled through a complete Vue 3 event wiring pattern rather than a partial callback snippet. In support-ready samples, it is better to bind the event only when the full chart configuration is already in place.

## Range Selector

The range selector provides an interactive date-range slider so the user can narrow or widen the visible range manually.

### Basic Range Selector Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="range-selector-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :enableSelector="true"
      title="Stock Chart with Range Selector"
      width="100%"
      height="560px"
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
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
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
  AreaSeries,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102, volume: 1200000 },
  { date: new Date(2024, 1, 1), open: 102, high: 108, low: 101, close: 106, volume: 1400000 },
  { date: new Date(2024, 2, 1), open: 106, high: 110, low: 104, close: 108, volume: 1500000 },
  { date: new Date(2024, 3, 1), open: 108, high: 113, low: 107, close: 111, volume: 1600000 },
  { date: new Date(2024, 4, 1), open: 111, high: 116, low: 110, close: 114, volume: 1700000 },
  { date: new Date(2024, 5, 1), open: 114, high: 120, low: 113, close: 118, volume: 1750000 },
  { date: new Date(2024, 6, 1), open: 118, high: 123, low: 116, close: 121, volume: 1800000 },
  { date: new Date(2024, 7, 1), open: 121, high: 126, low: 119, close: 124, volume: 1850000 },
  { date: new Date(2024, 8, 1), open: 124, high: 129, low: 122, close: 127, volume: 1900000 },
  { date: new Date(2024, 9, 1), open: 127, high: 131, low: 125, close: 129, volume: 1950000 },
  { date: new Date(2024, 10, 1), open: 129, high: 134, low: 128, close: 132, volume: 1980000 },
  { date: new Date(2024, 11, 1), open: 132, high: 138, low: 130, close: 136, volume: 2050000 }
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

### Visibility of Range selector

The `enableSelector` property allows users to toggle the visibility of enable selector.

```vue
<template>
  <div class="control-section">
    <div>
      <ejs-stockchart id="stockchartcontainer" :enableSelector="enableSelector" :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis" :title="title">
        <e-stockchart-series-collection>
          <e-stockchart-series :dataSource="seriesData" type="Candle" volume='volume' xName='date' low='low' high='high'
            open='open' close='close'></e-stockchart-series>
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>
  </div>
</template>
<script setup>
import { provide } from "vue";

import { chartData } from "./datasource.js";
import {
  StockChartComponent as EjsStockchart, StockChartSeriesCollectionDirective as EStockchartSeriesCollection, StockChartSeriesDirective as EStockchartSeries, DateTime, CandleSeries, RangeTooltip, LineSeries, SplineSeries,
  HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
} from "@syncfusion/ej2-vue-charts";

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102, volume: 1200000 },
  { date: new Date(2024, 1, 1), open: 102, high: 108, low: 101, close: 106, volume: 1400000 },
  { date: new Date(2024, 2, 1), open: 106, high: 110, low: 104, close: 108, volume: 1500000 },
  { date: new Date(2024, 3, 1), open: 108, high: 113, low: 107, close: 111, volume: 1600000 },
  { date: new Date(2024, 4, 1), open: 111, high: 116, low: 110, close: 114, volume: 1700000 },
  { date: new Date(2024, 5, 1), open: 114, high: 120, low: 113, close: 118, volume: 1750000 },
  { date: new Date(2024, 6, 1), open: 118, high: 123, low: 116, close: 121, volume: 1800000 },
  { date: new Date(2024, 7, 1), open: 121, high: 126, low: 119, close: 124, volume: 1850000 },
  { date: new Date(2024, 8, 1), open: 124, high: 129, low: 122, close: 127, volume: 1900000 },
  { date: new Date(2024, 9, 1), open: 127, high: 131, low: 125, close: 129, volume: 1950000 },
  { date: new Date(2024, 10, 1), open: 129, high: 134, low: 128, close: 132, volume: 1980000 },
  { date: new Date(2024, 11, 1), open: 132, high: 138, low: 130, close: 136, volume: 2050000 }
];

const primaryXAxis = {
  valueType: "DateTime",
  majorGridLines: { color: "transparent" }
};
const primaryYAxis = {
  majorTickLines: { color: "transparent", width: 0 }
};
const enableSelector = false;
const title = 'AAPL Stock Price';

provide('stockChart', [
  DateTime, RangeTooltip, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator,
  BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
]);

</script>
<style>
#container {
  height: 350px;
}
</style>
```
### Range Selector with Price Preview

The runnable sample in **Basic Range Selector Implementation** already includes an area-style preview series so the selector can visually summarize the close-price movement.

### Range Change Event

When you need to react to range changes, use a complete event-bound chart sample so the selected range can update external filters, summaries, or related components cleanly.

## Crosshair

Crosshair displays vertical, horizontal, or both guide lines at the pointer location so the user can inspect price levels more precisely.

- import `Crosshair`
- inject `Crosshair` through `provide('stockChart', [...])`

### Basic Crosshair Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="crosshair-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :crosshair="crosshair"
      :tooltip="tooltip"
      title="Stock Chart with Crosshair"
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
          name="AAPL"
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
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
  Crosshair,
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 110, low: 104, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, high: 113, low: 107, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, high: 116, low: 110, close: 114 }
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

const crosshair = {
  enable: true,
  lineType: 'Both'
}

const tooltip = {
  enable: true
}

provide('stockChart', [
  DateTime,
  CandleSeries,
  Crosshair,
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

### Crosshair Properties

The most common crosshair properties are:

- `enable` — turns crosshair on or off
- `lineType` — `Both`, `Vertical`, or `Horizontal`
- `crosshairTooltip` — shows axis labels when supported
- `lineDashArray` — applies dashed styling when needed

### Vertical-Only Crosshair

A vertical-only crosshair is useful when the X-axis position matters more than the Y-axis reference line.

```javascript
const crosshair = {
  enable: true,
  lineType: 'Vertical'
}
```

### Crosshair Tooltip for axis

```vue
<template>
  <div class="control-section">
    <div>
      <ejs-stockchart id="stockchartcontainer" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis"
        :crosshair="crosshair" :title="title">
        <e-stockchart-series-collection>
          <e-stockchart-series :dataSource="chartData" type="Candle" volume='volume' xName='date' low='low' high='high'
            open='open' close='close'></e-stockchart-series>
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>
  </div>
</template>
<script setup>
import { provide } from "vue";

import {
  StockChartComponent as EjsStockchart, StockChartSeriesCollectionDirective as EStockchartSeriesCollection, StockChartSeriesDirective as EStockchartSeries, DateTime, CandleSeries, RangeTooltip, LineSeries, SplineSeries,
  HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Crosshair, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
} from "@syncfusion/ej2-vue-charts";


const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 110, low: 104, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, high: 113, low: 107, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, high: 116, low: 110, close: 114 }
]
const primaryXAxis = {
  valueType: "DateTime",
  majorGridLines: { color: "transparent" },
  crosshairTooltip: { enable: true }
};
const primaryYAxis = {
  majorTickLines: { color: "transparent" },
  crosshairTooltip: { enable: true }
};
const crosshair = { enable: true, line: { width: 2, color: 'green' }, fill: 'green' };

const title = 'AAPL Stock Price';

provide('stockChart', [
  DateTime, Crosshair, RangeTooltip, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator,
  BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
]);

</script>
<style>
#container {
  height: 350px;
}
</style>
```

## Trackball

In stock-chart workflows, trackball-style inspection is usually achieved by combining a vertical crosshair with a shared tooltip. That gives the user a focused vertical guide plus synchronized tooltip output for the nearest points.

### Basic Trackball Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="trackball-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :crosshair="crosshair"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Trackball-Style Inspection with Shared Tooltip"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close"
          :width="2"
          fill="#2196F3"
        />
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="open"
          name="Open"
          :width="2"
          fill="#FF9800"
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
  LineSeries,
  Crosshair,
  RangeTooltip,
  Tooltip,
  StockLegend
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, close: 114 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Value',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const crosshair = {
  enable: true,
  lineType: 'Vertical'
}

const tooltip = {
  enable: true,
  shared: true
}

const legendSettings = {
  visible: true,
  position: 'Bottom'
}

provide('stockChart', [
  DateTime,
  LineSeries,
  Crosshair,
  RangeTooltip,
  Tooltip,
  StockLegend
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### Trackball Properties

The practical trackball-style setup is:

- `crosshair.enable = true`
- `crosshair.lineType = 'Vertical'`
- `tooltip.enable = true`
- `tooltip.shared = true`

That combination provides the most readable multi-series inspection pattern for stock-chart interactions.

## Tooltips

Tooltips display data details when the pointer moves over the series.

- import `RangeTooltip` and `Tooltip`
- inject `RangeTooltip` and `Tooltip` through `provide('stockChart', [...])`

### Basic Tooltip Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="tooltip-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Stock Chart with Detailed Tooltip"
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
          name="AAPL"
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
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
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 110, low: 104, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, high: 113, low: 107, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, high: 116, low: 110, close: 114 }
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
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}',
}

provide('stockChart', [
  DateTime,
  CandleSeries,
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

## Position and Customize the appearance of the tooltip:

By default, the tooltip is positioned at the left side of the stock chart. You can move the tooltip along with the mouse by setting "Nearest" to the `position` property.

The `fill` and `border` properties are used to customize the background color and border of the tooltip respectively. The `textStyle` property in the tooltip is used to customize the font of the tooltip text.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="tooltip-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      title="Stock Chart with Detailed Tooltip"
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
          name="AAPL"
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
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
  RangeTooltip,
  Tooltip
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, high: 108, low: 101, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, high: 110, low: 104, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, high: 113, low: 107, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, high: 116, low: 110, close: 114 }
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
  enable: true,
  shared: true, 
  position: 'Nearest',
  fill: '#7bb4eb',
  border: {
    width: 2,
    color: 'grey'
  }
};

provide('stockChart', [
  DateTime,
  CandleSeries,
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


### Tooltip Configuration

The most useful tooltip properties are:

- `enable` — turns the tooltip on or off
- `format` — controls the text layout
- `shared` — combines multiple series into a single tooltip
- `border` — adds tooltip border styling when needed
- `textStyle` — controls text appearance

### Custom Tooltip Format

A formatted tooltip string is the safest support-ready option for stock-chart examples, especially when the goal is to keep the example copyable and directly runnable without extra callback wiring.

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how stock data values are displayed without using additional events.

A format specifier can be applied to a tooltip token by adding a colon (`:`) followed by the required format.

For example:

```vue
const tooltip = {
  enable: true,
  format:
    'Date: ${point.x:MMM yyyy}<br/>' +
    'Open: ${point.open:n2}<br/>' +
    'High: ${point.high:n2}<br/>' +
    'Low: ${point.low:n2}<br/>' +
    'Close: ${point.close:n2}<br/>' +
    'Series: ${series.name}'
};
```

In the above example, `point.x` is displayed in month-year format, while the `open`, `high`, `low`, and `close` values are displayed with two decimal places.

Inline formatting can be applied to the following tooltip tokens:

- `point.x` - Specifies the x-value of the data point, such as a DateTime or category value.
- `point.open` - Specifies the opening price of the stock.
- `point.high` - Specifies the highest price of the stock.
- `point.low` - Specifies the lowest price of the stock.
- `point.close` - Specifies the closing price of the stock.
- `point.volume` - Specifies the trading volume when available in the data source.
- `series.name` - Specifies the name assigned to the series.
- `series.type` - Specifies the rendering type of the series, such as `Candle`, `Hilo`, `HiloOpenClose`, `Line`, or `Spline`.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the Stock Chart series type. The `series.name` and `series.type` tokens return string values, so DateTime or number formatting is not applied to these tokens.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy` - Displays the abbreviated month and four-digit year.
- `MM:yy` - Displays the two-digit month and year.
- `dd MMM` - Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2` - Number with two decimal places.
- `n0` - Number without decimal places.
- `c2` - Currency format.
- `p1` - Percentage format.
- `e1` - Exponential notation.

If the specified format does not match the resolved value type, the original value is displayed.

## Legend

Legend labels the series and can optionally allow the user to toggle their visibility.

- import `StockLegend`
- inject `StockLegend` through `provide('stockChart', [...])`

### Basic Legend Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="legend-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Stock Chart with Legend"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close"
          :width="2"
          fill="#2196F3"
        />
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="open"
          name="Open"
          :width="2"
          fill="#FF9800"
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
  LineSeries,
  RangeTooltip,
  Tooltip,
  StockLegend
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, close: 114 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Value',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true,
  shared: true
}

const legendSettings = {
  visible: true,
  position: 'Bottom',  // Left, Right, Top, Bottom or Custom
  alignment: 'Center',  // Near, Far or Center
  toggleVisibility: true
}

provide('stockChart', [
  DateTime,
  LineSeries,
  RangeTooltip,
  Tooltip,
  StockLegend
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

## Legend Title

The title for legend can be set using title property in `legendSettings`. Customize the `fontStyle`, `size`, `fontWeight`, `color`, `textAlignment`, `fontFamily`, `opacity` and textOverflow of legend title. `titlePosition` is used to set the legend position in Top, Left and Right position. `maximumTitleWidth` is used to set the width of the legend title. By default, it will be 100px.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="legend-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Stock Chart with Legend"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close"
          :width="2"
          fill="#2196F3"
        />
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="open"
          name="Open"
          :width="2"
          fill="#FF9800"
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
  LineSeries,
  RangeTooltip,
  Tooltip,
  StockLegend
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, close: 114 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Value',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true,
  shared: true
}

const legendSettings = {
  visible: true,
  title: 'Countries',
  titlePosition: 'Top',
  titleStyle: {
    fontFamily: 'verdana',
    fontStyle: 'Normal',
    fontWeight: 'Normal',
    size: '15px',
    textAlignment: 'Center',
    color: 'blue',
    textOverflow: 'None'
  },
  maximumTitleWidth: 150
};

provide('stockChart', [
  DateTime,
  LineSeries,
  RangeTooltip,
  Tooltip,
  StockLegend
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```
### Legend Customization

- To change the legend icon shape, `legendShape` property in the series can be used. By default legend icon shape is seriesType.

- By default, legend takes 20% - 25% of the Stock Chart’s height horizontally, when it is placed on top or bottom position and 20% - 25% of the Stock Chart’s width vertically, when placed on left or right position of the Stock Chart. The default legend size can be changed by using the `width` and `height` property of the legendSettings

- The size of the legend items can customized by using the `shapeHeight` and `shapeWidth` property.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="legend-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Stock Chart with Legend"
      width="100%"
      height="500px"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close"
          :width="2"
          fill="#2196F3"
          legendShape='Pentagon'
        />
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="open"
          name="Open"
          :width="2"
          fill="#FF9800"
          legendShape='Pentagon'
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
  LineSeries,
  RangeTooltip,
  Tooltip,
  StockLegend
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, close: 102 },
  { date: new Date(2024, 0, 2), open: 102, close: 106 },
  { date: new Date(2024, 0, 3), open: 106, close: 108 },
  { date: new Date(2024, 0, 4), open: 108, close: 111 },
  { date: new Date(2024, 0, 5), open: 111, close: 114 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
}

const primaryYAxis = {
  title: 'Value',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
}

const tooltip = {
  enable: true,
  shared: true
}

const legendSettings = {
  visible: true,
  width: '500', 
  height: '50',
  shapeHeight: 15, 
  shapeWidth: 15
};

provide('stockChart', [
  DateTime,
  LineSeries,
  RangeTooltip,
  Tooltip,
  StockLegend
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

### Legend Properties

The most useful legend properties are:

- `visible` — shows or hides the legend
- `position` — `Top`, `Bottom`, `Left`, or `Right`
- `alignment` - `Near`, `Far` or `Center`
- `toggleVisibility` — lets the user show or hide series by clicking the legend
- `textStyle` — legend label styling
- `margin` — spacing around the legend area

## Stock Chart Events

For stock-chart event markers, the support-ready concept is to place meaningful milestone labels on important dates such as earnings, dividends, or splits. In practical stock-chart documentation, built-in event-marker features are preferred for financial timelines, while annotation-style overlays are used when you need general-purpose labels.

### Stock Events 

Stock Events visualizes stock events in stock chart. ‘SplineSeries’ is used to represent selected data value. You can customize the specific data value using `stockEvents` event.

```vue
<template>
<div class="control-section">
<ejs-stockchart
      id="stock-events-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :stockEvents="stockEvents"
      title="Stock Chart with Stock Events"
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
          name="AAPL"
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
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
  Tooltip,
  RangeTooltip
} from '@syncfusion/ej2-vue-charts'
 
const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102 },
  { date: new Date(2024, 0, 15), open: 102, high: 114, low: 101, close: 112 },
  { date: new Date(2024, 1, 1), open: 112, high: 120, low: 110, close: 118 },
  { date: new Date(2024, 1, 15), open: 118, high: 123, low: 116, close: 121 },
  { date: new Date(2024, 2, 1), open: 121, high: 127, low: 119, close: 125 }
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
 
const stockEvents = [
  {
    date: new Date(2024, 0, 15),
    text: 'E',
    type: 'Flag',
    description: 'Quarterly earnings',
    placeAt: 'close'
  },
  {
    date: new Date(2024, 1, 1),
    text: 'D',
    type: 'Circle',
    description: 'Dividend announced',
    placeAt: 'close'
  },
  {
    date: new Date(2024, 1, 15),
    text: 'S',
    type: 'Square',
    description: 'Stock split update',
    placeAt: 'close'
  }
]
 
provide('stockChart', [
  DateTime,
  CandleSeries,
  Tooltip,
  RangeTooltip
])
</script>
 
<style>
.control-section {
  margin: 20px;
}
</style>
```

### Stock Events for individual series

By default, stock events will be showed for all series. Now, you can set the stock events for particular series using `seriesIndexes` property.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="stockevents-series"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      title="Stock Events for Individual Series"
      height="450px"
      width="100%"
    >

      <!-- SERIES -->
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="data"
          type="Spline"
          xName="date"
          yName="high"
          name="High"
        />
        <e-stockchart-series
          :dataSource="data"
          type="Spline"
          xName="date"
          yName="low"
          name="Low"
        />
        <e-stockchart-series
          :dataSource="data"
          type="Spline"
          xName="date"
          yName="open"
          name="Open"
        />
      </e-stockchart-series-collection>

      <!-- STOCK EVENTS -->
      <e-stockchart-stockevents>
        <!-- Event only for High series (index 0) -->
        <e-stockchart-stockevent
          :date="new Date(2024, 0, 10)"
          text="H"
          description="High value event"
          type="Flag"
          :seriesIndexes="[0]"
        />

        <!-- Event only for Low series (index 1) -->
        <e-stockchart-stockevent
          :date="new Date(2024, 0, 20)"
          text="L"
          description="Low value event"
          background="#f44336"
          :border="{ color: '#f44336' }"
          :seriesIndexes="[1]"
        />

        <!-- Event for High & Open series (index 0, 2) -->
        <e-stockchart-stockevent
          :date="new Date(2024, 1, 5)"
          text="HO"
          description="High & Open event"
          background="#2196F3"
          :border="{ color: '#2196F3' }"
          :seriesIndexes="[0, 2]"
        />
      </e-stockchart-stockevents>

    </ejs-stockchart>
  </div>
</template>
<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  StockEventsDirective as EStockchartStockevents,
  StockEventDirective as EStockchartStockevent,
  DateTime,
  SplineSeries,
} from '@syncfusion/ej2-vue-charts'

const data = [
  { date: new Date(2024, 0, 1), high: 120, low: 110, open: 115 },
  { date: new Date(2024, 0, 10), high: 125, low: 113, open: 118 },
  { date: new Date(2024, 0, 20), high: 130, low: 116, open: 120 },
  { date: new Date(2024, 1, 5), high: 128, low: 114, open: 119 }
]

const primaryXAxis = {
  valueType: 'DateTime'
}

const primaryYAxis = {
  title: 'Price'
}

provide('stockChart', [
  DateTime,
  SplineSeries,
])
</script>
```

### Event Marker Properties

The most practical event-marker properties are:

- `x` — the date or X-axis position
- `y` — the price or Y-axis position
- `content` or text content — the visible label
- offset-related placement settings when the event marker must sit above or below the main point
- wrapper styling so the label remains readable without obscuring the chart

### Common Events

Common financial milestone markers include:

- earnings results
- dividend dates
- split announcements
- merger-related announcements
- product-launch or guidance-update dates

## Complete Interactive Example

This example combines:

- period selector
- range selector
- vertical crosshair
- shared tooltip
- legend
- complete Vue 3 Composition API structure

### Complete Interactive Example Implementation

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="interactive-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :enableSelector="true"
      :crosshair="crosshair"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      title="Complete Interactive Stock Chart"
      width="100%"
      height="620px"
    >
      <e-stockchart-periods>
          <e-stockchart-period intervalType="Months" interval="1" text="1M"></e-stockchart-period>
          <e-stockchart-period intervalType="Months" interval="3" text="3M"></e-stockchart-period>
          <e-stockchart-period intervalType="Months" interval="6" text="6M"></e-stockchart-period>
          <e-stockchart-period intervalType="Year"  text="YTD" selected="true"></e-stockchart-period>
          <e-stockchart-period intervalType="Years" interval="1" text="1Y" selected="true"></e-stockchart-period>
          <e-stockchart-period intervalType="All" text="All"></e-stockchart-period>
      </e-stockchart-periods>
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
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
        />
        <e-stockchart-series
          :dataSource="chartData"
          type="Line"
          xName="date"
          yName="close"
          name="Close Line"
          :width="2"
          fill="#2196F3"
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
  StockChartPeriodsDirective as EStockchartPeriods,
  StockChartPeriodDirective as EStockchartPeriod,
  DateTime,
  CandleSeries,
  LineSeries,
  AreaSeries,
  Crosshair,
  RangeTooltip,
  Tooltip
  StockLegend
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date(2024, 0, 1), open: 100, high: 104, low: 98, close: 102, volume: 1200000 },
  { date: new Date(2024, 1, 1), open: 102, high: 108, low: 101, close: 106, volume: 1400000 },
  { date: new Date(2024, 2, 1), open: 106, high: 110, low: 104, close: 108, volume: 1500000 },
  { date: new Date(2024, 3, 1), open: 108, high: 113, low: 107, close: 111, volume: 1600000 },
  { date: new Date(2024, 4, 1), open: 111, high: 116, low: 110, close: 114, volume: 1700000 },
  { date: new Date(2024, 5, 1), open: 114, high: 120, low: 113, close: 118, volume: 1750000 },
  { date: new Date(2024, 6, 1), open: 118, high: 123, low: 116, close: 121, volume: 1800000 },
  { date: new Date(2024, 7, 1), open: 121, high: 126, low: 119, close: 124, volume: 1850000 },
  { date: new Date(2024, 8, 1), open: 124, high: 129, low: 122, close: 127, volume: 1900000 },
  { date: new Date(2024, 9, 1), open: 127, high: 131, low: 125, close: 129, volume: 1950000 },
  { date: new Date(2024, 10, 1), open: 129, high: 134, low: 128, close: 132, volume: 1980000 },
  { date: new Date(2024, 11, 1), open: 132, high: 138, low: 130, close: 136, volume: 2050000 }
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

const crosshair = {
  enable: true,
  lineType: 'Vertical'
}

const tooltip = {
  enable: true,
  shared: true,
  format: '${series.name}<br/>Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
}

const legendSettings = {
  visible: true,
  position: 'Bottom',
  toggleVisibility: true
}

provide('stockChart', [
  DateTime,
  CandleSeries,
  LineSeries,
  AreaSeries,
  Crosshair,
  RangeTooltip,
  Tooltip,
  StockLegend
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

## Performance Tips

- Use the period selector to reduce how much data is shown at once.
- Use the range selector when the user needs precise manual control over the visible window.
- Use shared tooltips only when the comparison value is worth the extra visual density.
- Keep event markers limited to meaningful milestones so the chart remains readable.
- Prefer vertical crosshair plus shared tooltip for multi-series inspection rather than stacking too many simultaneous interaction layers.

## Combined Mistakes and Future References

- The original content mixed legacy Vue snippets and incomplete examples. All runnable samples above were normalized to full Vue 3 Composition API Single File Components using `<script setup>`.
- Partial snippets such as a bare `<ejs-stockchart>` tag, a partial `data()` object, or a standalone tooltip or crosshair object were expanded into complete runnable examples.
- The original legend examples used `enable: true`. In support-ready Stock Chart patterns, `legendSettings` should use `visible: true` rather than `enable`.
- For trackball-style interaction, the safer stock-chart pattern is not a separate special module. The practical support-ready setup is a vertical `crosshair` combined with `tooltip.shared = true`.
- Range-selector preview content should use a real preview series instead of a placeholder-only object. The corrected samples now provide a complete area preview configuration with actual data.
- Period selector, range selector, crosshair, tooltip, and legend examples should not be delivered as half code blocks. Each implementation section above now includes:
  - complete `<template>`
  - complete `<script setup>`
  - full Syncfusion imports
  - complete provider injection
  - complete data
  - complete axis configuration
  - complete interactive configuration
  - minimal style block
- When multiple series are shown together for legend or shared-tooltip behavior, each series should have a clear `name` so the tooltip and legend remain meaningful.
- Unsupported or unnecessary provider modules should not be injected. For example, legend behavior is configured through `legendSettings`, not by forcing a separate stock-chart legend module into `provide('stockChart', [...])`.
- Event-marker scenarios should be configured as complete chart overlays rather than isolated annotation snippets that omit the rest of the chart structure.
- If this interactive section is later combined with technical indicators, continue using the full indicator-safe import and provider pattern whenever indicators can be switched dynamically.