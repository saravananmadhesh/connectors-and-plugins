# Advanced Customization & Performance

## Table of Contents
- [Volume Indicator Configuration](#volume-indicator-configuration)
  - [Basic Volume Setup](#basic-volume-setup)
  - [Volume Color Coding](#volume-color-coding)
  - [Volume Moving Average](#volume-moving-average)
- [Custom Styling with CSS](#custom-styling-with-css)
  - [Dark Mode Support](#dark-mode-support)
- [Responsive Design](#responsive-design)
  - [Responsive Container](#responsive-container)
  - [Dynamic Sizing](#dynamic-sizing)
- [Performance Optimization](#performance-optimization)
  - [Data Aggregation](#data-aggregation)
  - [Lazy Loading Series](#lazy-loading-series)
  - [Debounced Updates](#debounced-updates)
  - [Canvas Rendering](#canvas-rendering)
- [Theme Customization](#theme-customization)
  - [Custom Theme Colors](#custom-theme-colors)
  - [CSS Variables Approach](#css-variables-approach)
- [Advanced Layout Patterns](#advanced-layout-patterns)
  - [Multi-Chart Dashboard](#multi-chart-dashboard)
  - [Synchronized Charts](#synchronized-charts)
  - [Overlay Pattern](#overlay-pattern)
- [Memory Management](#memory-management)
  - [Cleanup on Unmount](#cleanup-on-unmount)
  - [Data Limit](#data-limit)

## Volume Indicator Configuration

Display trading volume with stock price for volume confirmation analysis.

### Basic Volume Setup

The original approach used `type="Column"` directly inside `ejs-stockchart`. For a support-safe Vue 3 Stock Chart example, the safer approach is to keep the price series in the Stock Chart and render the volume trend with a supported secondary-axis line series. This avoids runtime instability while still preserving the same analytical intent.

Below is a complete runnable Vue 3 Composition API SFC using `script setup`, proper imports, proper providers, and the `:periods="periods"` pattern.

```vue
<template>
  <div class="control-section">
    <div class="chart-wrapper">
      <ejs-stockchart
        id="stockchart"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :axes="axes"
        :tooltip="tooltip"
        :legendSettings="legendSettings"
        :crosshair="crosshair"
        :periods="periods"
        :title="title"
        :exportType="exportType"
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
            name="Price"
            bullFillColor="#2E7D32"
            bearFillColor="#C62828"
          />
          <e-stockchart-series
            :dataSource="volumeLineData"
            type="Line"
            xName="date"
            yName="value"
            yAxisName="VolumeAxis"
            name="Volume"
            fill="#6496E0"
            :width="2"
          />
          <e-stockchart-series
            :dataSource="volumeMA"
            type="Line"
            xName="date"
            yName="value"
            yAxisName="VolumeAxis"
            name="Volume MA(20)"
            fill="#FF9800"
            :width="2"
            dashArray="4,3"
          />
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  CandleSeries,
  LineSeries,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
  AreaSeries,
  SplineSeries,
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
  StochasticIndicator
} from '@syncfusion/ej2-vue-charts';

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 107, volume: 1820000 },
  { date: new Date('2024-01-03'), open: 107, high: 109, low: 103, close: 104, volume: 1630000 },
  { date: new Date('2024-01-04'), open: 104, high: 110, low: 102, close: 109, volume: 1980000 },
  { date: new Date('2024-01-05'), open: 109, high: 112, low: 106, close: 111, volume: 1740000 },
  { date: new Date('2024-01-08'), open: 111, high: 116, low: 109, close: 115, volume: 2250000 },
  { date: new Date('2024-01-09'), open: 115, high: 117, low: 112, close: 113, volume: 1890000 },
  { date: new Date('2024-01-10'), open: 113, high: 118, low: 111, close: 117, volume: 2410000 },
  { date: new Date('2024-01-11'), open: 117, high: 119, low: 114, close: 116, volume: 2050000 },
  { date: new Date('2024-01-12'), open: 116, high: 120, low: 115, close: 119, volume: 2170000 },
  { date: new Date('2024-01-15'), open: 119, high: 124, low: 118, close: 123, volume: 2680000 },
  { date: new Date('2024-01-16'), open: 123, high: 126, low: 121, close: 125, volume: 2530000 },
  { date: new Date('2024-01-17'), open: 125, high: 127, low: 122, close: 124, volume: 2140000 },
  { date: new Date('2024-01-18'), open: 124, high: 129, low: 123, close: 128, volume: 2760000 },
  { date: new Date('2024-01-19'), open: 128, high: 131, low: 126, close: 130, volume: 2910000 },
  { date: new Date('2024-01-22'), open: 130, high: 133, low: 127, close: 129, volume: 2440000 },
  { date: new Date('2024-01-23'), open: 129, high: 135, low: 128, close: 134, volume: 3070000 },
  { date: new Date('2024-01-24'), open: 134, high: 137, low: 132, close: 136, volume: 3120000 },
  { date: new Date('2024-01-25'), open: 136, high: 140, low: 135, close: 138, volume: 3190000 },
  { date: new Date('2024-01-26'), open: 138, high: 142, low: 136, close: 141, volume: 3250000 }
]);

const title = 'Price and Volume Analysis';
const exportType = ref(['SVG', 'PDF']);

const primaryXAxis = ref({
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' },
  crosshairTooltip: { enable: true }
});

const primaryYAxis = ref({
  title: 'Price',
  majorTickLines: { color: 'transparent', width: 0 },
  lineStyle: { color: 'transparent' }
});

const axes = ref([
  {
    name: 'VolumeAxis',
    opposedPosition: true,
    title: 'Volume',
    labelFormat: '{value}',
    minimum: 0,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 }
  }
]);

const tooltip = ref({ enable: true });
const crosshair = ref({ enable: true, lineType: 'Both' });
const legendSettings = ref({ visible: true, position: 'Top' });

const periods = ref([
  { text: '1W', intervalType: 'Days', interval: 7 },
  { text: '2W', intervalType: 'Days', interval: 14 },
  { text: '1M', intervalType: 'Months', interval: 1, selected: true },
  { text: 'All' }
]);

const volumeLineData = computed(() =>
  chartData.value.map((item) => ({
    date: item.date,
    value: item.volume
  }))
);

const volumeMA = computed(() => {
  const period = 20;
  const ma = [];

  for (let i = 0; i < chartData.value.length; i++) {
    if (i < period - 1) continue;

    const sum = chartData.value
      .slice(i - period + 1, i + 1)
      .reduce((acc, d) => acc + d.volume, 0);

    ma.push({
      date: chartData.value[i].date,
      value: sum / period
    });
  }

  return ma;
});

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
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
  StochasticIndicator
]);
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 520px;
}
</style>
```

Below are the **stockchart-only** replacements for the volume-related sections that previously used `ejs-chart`. The documented Vue Stock Chart series types are `Line`, `Spline`, `Hilo`, `HiloOpenClose`, `Hollow Candle`, and `Candle`, while `Column` is documented under the regular Chart component, so the support-safe **stockchart-only** pattern is to keep volume on a secondary axis using `Line`-based series. [1](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/stockchartlegendsettingsmodel)[2](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/stockchartindicatormodel/index)

Because these examples enable legend and tooltip, `StockLegend`, `Tooltip`, and `RangeTooltip` stay in the import list and in `provide('stockChart', [...])`, and the period selector remains on `:periods="periods"` instead of directive-style periods. [3](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/)[4](https://www.syncfusion.com/forums/197163/secondary-axis-for-indicators)[5](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/stockseriesmodel/index/)

## Volume Indicator Configuration

Display trading volume with stock price for volume confirmation analysis.

### Basic Volume Setup

This version stays fully inside `ejs-stockchart` and renders volume as a **secondary-axis line series**. [1](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/stockchartlegendsettingsmodel)[5](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/stockseriesmodel/index/)

```vue
<template>
  <div class="control-section">
    <div class="chart-wrapper">
      <ejs-stockchart
        id="basic-volume-stockchart"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :axes="axes"
        :tooltip="tooltip"
        :legendSettings="legendSettings"
        :crosshair="crosshair"
        :periods="periods"
        :title="title"
        :exportType="exportType"
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
            name="Price"
            bullFillColor="#2E7D32"
            bearFillColor="#C62828"
          />
          <e-stockchart-series
            :dataSource="volumeLineData"
            type="Line"
            xName="date"
            yName="value"
            yAxisName="VolumeAxis"
            name="Volume"
            fill="#6496E0"
            :width="2"
          />
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
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
  StochasticIndicator
} from '@syncfusion/ej2-vue-charts';

const title = ref('Basic Volume Setup');
const exportType = ref(['SVG', 'PDF']);

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 107, volume: 1820000 },
  { date: new Date('2024-01-03'), open: 107, high: 109, low: 103, close: 104, volume: 1630000 },
  { date: new Date('2024-01-04'), open: 104, high: 110, low: 102, close: 109, volume: 1980000 },
  { date: new Date('2024-01-05'), open: 109, high: 112, low: 106, close: 111, volume: 1740000 },
  { date: new Date('2024-01-08'), open: 111, high: 116, low: 109, close: 115, volume: 2250000 }
]);

const primaryXAxis = ref({
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' },
  crosshairTooltip: { enable: true }
});

const primaryYAxis = ref({
  title: 'Price',
  majorTickLines: { color: 'transparent', width: 0 },
  lineStyle: { color: 'transparent' }
});

const axes = ref([
  {
    name: 'VolumeAxis',
    opposedPosition: true,
    title: 'Volume',
    labelFormat: '{value}',
    minimum: 0,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 }
  }
]);

const tooltip = ref({ enable: true });
const crosshair = ref({ enable: true, lineType: 'Both' });
const legendSettings = ref({ visible: true, position: 'Top' });

const periods = ref([
  { text: '1W', intervalType: 'Days', interval: 7, selected: true },
  { text: '1M', intervalType: 'Months', interval: 1 },
  { text: 'All' }
]);

const volumeLineData = computed(() =>
  chartData.value.map((item) => ({
    date: item.date,
    value: item.volume
  }))
);

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
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
  StochasticIndicator
]);
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>
```

### Volume Color Coding

Because `Column` is not the support-safe stockchart-only path, the stockchart-only way to simulate volume color coding is to split volume into **two line series** on the same secondary axis: one for up days and one for down days.

```vue
<template>
  <div class="control-section">
    <div class="chart-wrapper">
      <ejs-stockchart
        id="volume-color-stockchart"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :axes="axes"
        :tooltip="tooltip"
        :legendSettings="legendSettings"
        :crosshair="crosshair"
        :periods="periods"
        :title="title"
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
            name="Price"
            bullFillColor="#2E7D32"
            bearFillColor="#C62828"
          />
          <e-stockchart-series
            :dataSource="upVolumeData"
            type="Line"
            xName="date"
            yName="value"
            yAxisName="VolumeAxis"
            name="Up Volume"
            fill="#4CAF50"
            :width="2"
          />
          <e-stockchart-series
            :dataSource="downVolumeData"
            type="Line"
            xName="date"
            yName="value"
            yAxisName="VolumeAxis"
            name="Down Volume"
            fill="#F44336"
            :width="2"
          />
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
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
  StochasticIndicator
} from '@syncfusion/ej2-vue-charts';

const title = ref('Volume Color Coding');

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 107, volume: 1820000 },
  { date: new Date('2024-01-03'), open: 107, high: 109, low: 103, close: 104, volume: 1630000 },
  { date: new Date('2024-01-04'), open: 104, high: 110, low: 102, close: 109, volume: 1980000 },
  { date: new Date('2024-01-05'), open: 109, high: 112, low: 106, close: 111, volume: 1740000 },
  { date: new Date('2024-01-08'), open: 111, high: 116, low: 109, close: 115, volume: 2250000 }
]);

const primaryXAxis = ref({
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' },
  crosshairTooltip: { enable: true }
});

const primaryYAxis = ref({
  title: 'Price',
  majorTickLines: { color: 'transparent', width: 0 },
  lineStyle: { color: 'transparent' }
});

const axes = ref([
  {
    name: 'VolumeAxis',
    opposedPosition: true,
    title: 'Volume',
    labelFormat: '{value}',
    minimum: 0,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 }
  }
]);

const tooltip = ref({ enable: true });
const crosshair = ref({ enable: true, lineType: 'Both' });
const legendSettings = ref({ visible: true, position: 'Top' });

const periods = ref([
  { text: '1W', intervalType: 'Days', interval: 7, selected: true },
  { text: '1M', intervalType: 'Months', interval: 1 },
  { text: 'All' }
]);

function getVolumeColor(data, index) {
  const current = data[index];
  const previous = index > 0 ? data[index - 1] : null;

  if (!previous) return '#6496E0';

  return current.close >= previous.close ? '#4CAF50' : '#F44336';
}

const upVolumeData = computed(() =>
  chartData.value.map((item, index, data) => ({
    date: item.date,
    value: getVolumeColor(data, index) === '#4CAF50' || getVolumeColor(data, index) === '#6496E0'
      ? item.volume
      : null
  }))
);

const downVolumeData = computed(() =>
  chartData.value.map((item, index, data) => ({
    date: item.date,
    value: getVolumeColor(data, index) === '#F44336'
      ? item.volume
      : null
  }))
);

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
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
  StochasticIndicator
]);
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>
```

### Volume Moving Average

This version stays fully inside `ejs-stockchart` and adds a **20-period moving average** as another secondary-axis line series.

```vue
<template>
  <div class="control-section">
    <div class="chart-wrapper">
      <ejs-stockchart
        id="volume-ma-stockchart"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :axes="axes"
        :tooltip="tooltip"
        :legendSettings="legendSettings"
        :crosshair="crosshair"
        :periods="periods"
        :title="title"
        :exportType="exportType"
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
            name="Price"
            bullFillColor="#2E7D32"
            bearFillColor="#C62828"
          />
          <e-stockchart-series
            :dataSource="volumeLineData"
            type="Line"
            xName="date"
            yName="value"
            yAxisName="VolumeAxis"
            name="Volume"
            fill="#6496E0"
            :width="2"
          />
          <e-stockchart-series
            :dataSource="volumeMAData"
            type="Line"
            xName="date"
            yName="value"
            yAxisName="VolumeAxis"
            name="Volume MA(20)"
            fill="#FF9800"
            :width="2"
            dashArray="4,3"
          />
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
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
  StochasticIndicator
} from '@syncfusion/ej2-vue-charts';

const title = ref('Volume Moving Average');
const exportType = ref(['SVG', 'PDF']);

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 107, volume: 1820000 },
  { date: new Date('2024-01-03'), open: 107, high: 109, low: 103, close: 104, volume: 1630000 },
  { date: new Date('2024-01-04'), open: 104, high: 110, low: 102, close: 109, volume: 1980000 },
  { date: new Date('2024-01-05'), open: 109, high: 112, low: 106, close: 111, volume: 1740000 },
  { date: new Date('2024-01-08'), open: 111, high: 116, low: 109, close: 115, volume: 2250000 },
  { date: new Date('2024-01-09'), open: 115, high: 117, low: 112, close: 113, volume: 1890000 },
  { date: new Date('2024-01-10'), open: 113, high: 118, low: 111, close: 117, volume: 2410000 },
  { date: new Date('2024-01-11'), open: 117, high: 119, low: 114, close: 116, volume: 2050000 },
  { date: new Date('2024-01-12'), open: 116, high: 120, low: 115, close: 119, volume: 2170000 },
  { date: new Date('2024-01-15'), open: 119, high: 124, low: 118, close: 123, volume: 2680000 },
  { date: new Date('2024-01-16'), open: 123, high: 126, low: 121, close: 125, volume: 2530000 },
  { date: new Date('2024-01-17'), open: 125, high: 127, low: 122, close: 124, volume: 2140000 },
  { date: new Date('2024-01-18'), open: 124, high: 129, low: 123, close: 128, volume: 2760000 },
  { date: new Date('2024-01-19'), open: 128, high: 131, low: 126, close: 130, volume: 2910000 },
  { date: new Date('2024-01-22'), open: 130, high: 133, low: 127, close: 129, volume: 2440000 },
  { date: new Date('2024-01-23'), open: 129, high: 135, low: 128, close: 134, volume: 3070000 },
  { date: new Date('2024-01-24'), open: 134, high: 137, low: 132, close: 136, volume: 3120000 },
  { date: new Date('2024-01-25'), open: 136, high: 140, low: 135, close: 138, volume: 3190000 },
  { date: new Date('2024-01-26'), open: 138, high: 142, low: 136, close: 141, volume: 3250000 }
]);

const primaryXAxis = ref({
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' },
  crosshairTooltip: { enable: true }
});

const primaryYAxis = ref({
  title: 'Price',
  majorTickLines: { color: 'transparent', width: 0 },
  lineStyle: { color: 'transparent' }
});

const axes = ref([
  {
    name: 'VolumeAxis',
    opposedPosition: true,
    title: 'Volume',
    labelFormat: '{value}',
    minimum: 0,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 }
  }
]);

const tooltip = ref({ enable: true });
const crosshair = ref({ enable: true, lineType: 'Both' });
const legendSettings = ref({ visible: true, position: 'Top' });

const periods = ref([
  { text: '1W', intervalType: 'Days', interval: 7 },
  { text: '2W', intervalType: 'Days', interval: 14 },
  { text: '1M', intervalType: 'Months', interval: 1, selected: true },
  { text: 'All' }
]);

const volumeLineData = computed(() =>
  chartData.value.map((item) => ({
    date: item.date,
    value: item.volume
  }))
);

const volumeMAData = computed(() => {
  const period = 20;
  const ma = [];

  for (let i = 0; i < chartData.value.length; i++) {
    if (i < period - 1) continue;

    const sum = chartData.value
      .slice(i - period + 1, i + 1)
      .reduce((acc, d) => acc + d.volume, 0);

    ma.push({
      date: chartData.value[i].date,
      value: sum / period
    });
  }

  return ma;
});

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  Export,
  StockLegend,
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
  StochasticIndicator
]);
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}
</style>
```

## Custom Styling with CSS

Apply custom styles to match your brand or design system.

### Dark Mode Support

Below is a Vue 3 Composition API version that safely reacts to system theme changes.

```vue
<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <ejs-stockchart id="stockchart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis">
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
          name="Price"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, provide, ref } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  CandleSeries,
  Tooltip,
  RangeTooltip,
  StockLegend,
  LineSeries,
  AreaSeries,
  SplineSeries,
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
  StochasticIndicator
} from '@syncfusion/ej2-vue-charts';

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 }
]);

const primaryXAxis = ref({ valueType: 'DateTime' });
const primaryYAxis = ref({ majorTickLines: { color: 'transparent', width: 0 } });

const isDarkMode = ref(false);
let mediaQuery = null;

function handleThemeChange(event) {
  isDarkMode.value = event.matches;
  document.documentElement.style.colorScheme = event.matches ? 'dark' : 'light';
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  handleThemeChange(mediaQuery);

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleThemeChange);
  } else {
    mediaQuery.addListener(handleThemeChange);
  }
});

onBeforeUnmount(() => {
  if (!mediaQuery) return;

  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', handleThemeChange);
  } else {
    mediaQuery.removeListener(handleThemeChange);
  }
});

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
  StockLegend,
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
  StochasticIndicator
]);
</script>

<style scoped>
.dark-mode :deep(.e-stockchart) {
  background: #1e1e1e;
}

.dark-mode :deep(.e-chart-area) {
  background: #2d2d2d;
}

.dark-mode :deep(.e-axis-label) {
  fill: #e0e0e0 !important;
}

.dark-mode :deep(.e-chart-major-gridlines) {
  stroke: rgba(255, 255, 255, 0.1) !important;
}

.dark-mode :deep(.e-chart-tooltip) {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #000 !important;
}
</style>
```

## Responsive Design

Make stock chart adapt to different screen sizes.

### Responsive Container

```vue
<template>
  <div class="chart-container">
    <ejs-stockchart
      id="stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :legendSettings="legendSettings"
      :title="title"
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
          volume="volume"
        />
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
  CandleSeries,
  Tooltip,
  RangeTooltip,
  StockLegend,
  LineSeries,
  AreaSeries,
  SplineSeries,
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
  StochasticIndicator
} from '@syncfusion/ej2-vue-charts';

const title = ref('Responsive Stock Chart');
const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 }
]);

const primaryXAxis = ref({ valueType: 'DateTime' });
const primaryYAxis = ref({ majorTickLines: { color: 'transparent', width: 0 } });
const legendSettings = ref({ visible: true });

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
  StockLegend,
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
  StochasticIndicator
]);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
  margin: 20px auto;
  max-width: 1200px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 350px;
    margin: 10px auto;
  }

  :deep(.e-axis-label) {
    font-size: 10px !important;
  }

  :deep(.e-chart-legend) {
    width: 100% !important;
    height: 40px !important;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 250px;
    margin: 5px auto;
  }

  :deep(.e-stockchart-title) {
    font-size: 14px !important;
  }

  :deep(.e-axis-label) {
    font-size: 8px !important;
  }

  :deep(.e-chart-legend) {
    display: none !important;
  }

  :deep(.e-periodSelector) {
    display: none !important;
  }
}
</style>
```

### Dynamic Sizing

Use a Composition API resize handler instead of Options API.

```javascript
import { onBeforeUnmount, onMounted, ref } from 'vue';

const chartHeight = ref(500);

function resizeChart() {
  const width = window.innerWidth;

  if (width > 1200) {
    chartHeight.value = 600;
  } else if (width > 768) {
    chartHeight.value = 400;
  } else {
    chartHeight.value = 300;
  }
}

onMounted(() => {
  resizeChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
});
```

## Performance Optimization

### Data Aggregation

For large datasets, aggregate to a manageable number of rendered candles.

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
      height="500px"
      width="100%"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="aggregatedData"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          name="Price"
          bullFillColor="#4CAF50"
          bearFillColor="#F44336"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>

    <div class="info-panel">
      <p><strong>Original Data Points:</strong> {{ rawData.length }}</p>
      <p><strong>Aggregated Candles:</strong> {{ aggregatedData.length }}</p>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  CandleSeries,
  Tooltip,
  RangeTooltip
} from '@syncfusion/ej2-vue-charts'

const title = 'Stock Chart with Data Aggregation'

const tooltip = {
  enable: true,
  shared: true
}

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 },
  edgeLabelPlacement: 'Shift'
}

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
}

/* ---------- RAW LARGE DATASET ---------- */
function generateLargeData(count = 5000) {
  const data = []
  let currentDate = new Date(2024, 0, 1)
  let lastClose = 100

  for (let i = 0; i < count; i++) {
    const open = lastClose
    const high = open + Math.random() * 8
    const low = open - Math.random() * 8
    const close = low + Math.random() * (high - low)
    const volume = Math.floor(500000 + Math.random() * 2000000)

    data.push({
      date: new Date(currentDate),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    })

    lastClose = close
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return data
}

/* ---------- DATA AGGREGATION ---------- */
function aggregateData(data, targetCandles = 500) {
  if (data.length <= targetCandles) return data

  const pointsPerCandle = Math.ceil(data.length / targetCandles)
  const aggregated = []

  for (let i = 0; i < data.length; i += pointsPerCandle) {
    const slice = data.slice(i, i + pointsPerCandle)

    aggregated.push({
      date: slice[0].date,
      open: slice[0].open,
      high: Math.max(...slice.map((p) => p.high)),
      low: Math.min(...slice.map((p) => p.low)),
      close: slice[slice.length - 1].close,
      volume: slice.reduce((sum, p) => sum + (p.volume || 0), 0)
    })
  }

  return aggregated
}

const rawData = ref(generateLargeData(5000))
const aggregatedData = ref(aggregateData(rawData.value, 500))

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

.info-panel {
  margin-top: 16px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}
</style>
```

### Lazy Loading Series

```javascript
import { ref } from 'vue';

const mainSeries = ref([]);
const indicatorsSeries = ref([]);
const loadIndicators = ref(false);

function toggleIndicators() {
  loadIndicators.value = !loadIndicators.value;

  if (loadIndicators.value) {
    indicatorsSeries.value = calculateIndicators();
  }
}
```

### Debounced Updates

If you do not want an external dependency, keep the debounce logic local.

```javascript
function debounce(fn, wait = 500) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

const updateChart = debounce((newData) => {
  chartData.value = newData;
}, 500);
```

### Canvas Rendering

For standard Stock Chart examples, focus on aggregation and bounded data first. If you later move volume or heavy overlays into a regular Chart component, canvas-oriented tuning is more appropriate there.

```javascript
const useCanvas = ref(true);
const canvasHdpi = ref(1);
```

## Theme Customization

### Custom Theme Colors

```javascript
import { ref } from 'vue';

const customTheme = ref({
  bullishColor: '#2E7D32',
  bearishColor: '#C62828',
  lineColor: '#1976D2',
  gridColor: 'rgba(0, 0, 0, 0.1)',
  textColor: '#333',
  backgroundColor: '#fff'
});
```

### CSS Variables Approach

```css
:root {
  --stock-bullish: #2E7D32;
  --stock-bearish: #C62828;
  --stock-line: #1976D2;
  --stock-grid: rgba(0, 0, 0, 0.1);
  --stock-text: #333;
  --stock-bg: #fff;
  --stock-candle-width: 8px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --stock-bullish: #4CAF50;
    --stock-bearish: #EF5350;
    --stock-line: #42A5F5;
    --stock-grid: rgba(255, 255, 255, 0.1);
    --stock-text: violet;
    --stock-bg: #1e1e1e;
  }
}

.e-stockchart-candle-up {
  fill: var(--stock-bullish);
}

.e-stockchart-candle-down {
  fill: var(--stock-bearish);
}
```

## Advanced Layout Patterns

### Multi-Chart Dashboard

For a truly support-safe price-plus-volume dashboard, split heavy visual responsibilities into separate chart blocks.

```vue
<template>
  <div class="chart-dashboard">
    <div class="chart-row">
      <div class="chart-item">
        <h3>Stock Price</h3>
        <ejs-stockchart id="price-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis">
          <e-stockchart-series-collection>
            <e-stockchart-series
              :dataSource="priceData"
              type="Candle"
              xName="date"
              open="open"
              high="high"
              low="low"
              close="close"
              volume="volume"
              name="Price"
            />
          </e-stockchart-series-collection>
        </ejs-stockchart>
      </div>

      <div class="chart-item">
        <h3>Volume Analysis</h3>
        <ejs-stockchart id="volume-chart" :primaryXAxis="primaryXAxis" :axes="volumeAxes">
          <e-stockchart-series-collection>
            <e-stockchart-series
              :dataSource="volumeData"
              type="Line"
              xName="date"
              yName="value"
              yAxisName="VolumeAxis"
              name="Volume"
              fill="#6496E0"
            />
          </e-stockchart-series-collection>
        </ejs-stockchart>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-item full-width">
        <h3>Technical Analysis</h3>
        <ejs-stockchart id="technical-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis">
          <e-stockchart-series-collection>
            <e-stockchart-series
              :dataSource="priceData"
              type="Candle"
              xName="date"
              open="open"
              high="high"
              low="low"
              close="close"
              volume="volume"
              name="Price"
            />
          </e-stockchart-series-collection>
        </ejs-stockchart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  CandleSeries,
  LineSeries,
  Tooltip,
  RangeTooltip,
  StockLegend,
  AreaSeries,
  SplineSeries,
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
  StochasticIndicator
} from '@syncfusion/ej2-vue-charts';

const priceData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 }
]);

const volumeData = ref([
  { date: new Date('2024-01-01'), value: 1500000 }
]);

const primaryXAxis = ref({ valueType: 'DateTime' });
const primaryYAxis = ref({ majorTickLines: { color: 'transparent', width: 0 } });
const volumeAxes = ref([{ name: 'VolumeAxis', opposedPosition: true }]);

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
  StockLegend,
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
  StochasticIndicator
]);
</script>

<style scoped>
.chart-dashboard {
  display: grid;
  gap: 20px;
  padding: 20px;
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-item.full-width {
  grid-column: 1 / -1;
}

.chart-item h3 {
  margin-top: 0;
  color: #333;
}

@media (max-width: 1024px) {
  .chart-row {
    grid-template-columns: 1fr;
  }

  .chart-item.full-width {
    grid-column: 1;
  }
}
</style>
```

### Synchronized Charts

```javascript
import { ref } from 'vue';

const priceData = ref([]);
const volumeData = ref([]);
const selectedRange = ref(null);

function onRangeChanged(range) {
  selectedRange.value = range;
  filterAllCharts(range);
}

function filterAllCharts(range) {
  priceData.value = filterData(allPriceData.value, range);
  volumeData.value = filterData(allVolumeData.value, range);
}
```

### Overlay Pattern

Overlay series should still use supported Stock Chart series types.

```vue
<template>
  <div class="chart-overlay">
    <ejs-stockchart
      id="main-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :axes="axes"
      :periods="periods"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="data1"
          type="Candle"
          xName="date"
          open="open"
          high="high"
          low="low"
          close="close"
          volume="volume"
          name="Stock A"
        />

        <e-stockchart-series
          :dataSource="data2"
          type="Line"
          xName="date"
          yName="value"
          yAxisName="Axis2"
          name="Stock B"
          fill="#1976D2"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>
```

## Memory Management

### Cleanup on Unmount

Use Vue 3 lifecycle cleanup consistently.

```javascript
import { onBeforeUnmount } from 'vue';

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);

  if (pollInterval.value) {
    clearInterval(pollInterval.value);
  }

  if (ws.value) {
    ws.value.close();
  }

  chartData.value = [];
});
```

### Data Limit

```javascript
const MAX_DATA_POINTS = 5000;

function addNewPoint(point) {
  chartData.value.push(point);

  if (chartData.value.length > MAX_DATA_POINTS) {
    chartData.value.shift();
  }
}
```

## Combined Mistakes and Future References

1. The original basic volume example used `ColumnSeries` directly inside `ejs-stockchart`. For a support-safe Vue 3 Stock Chart solution, that pattern should be avoided in this context and replaced with a supported Stock Chart series pattern or split into a separate chart layout when true volume bars are required.
2. The original examples mixed Vue 2 Options API patterns with a Vue 3 target. All final code should be delivered as full Vue 3 Composition API SFCs using `script setup`.
3. Partial logic snippets such as `methods`, `computed`, or `data` blocks were not runnable on their own. They have been converted into runnable or drop-in Composition API equivalents.
4. If `legendSettings.visible` is enabled, `StockLegend` must be included in both imports and `provide('stockChart', [...])`.
5. If tooltip support is enabled, both `Tooltip` and `RangeTooltip` must be included in both imports and `provide('stockChart', [...])`.
6. If a series type appears in the template, its corresponding module must be imported and injected before output.
7. The period selector should use `:periods="periods"` on `ejs-stockchart` instead of directive-style period markup for a cleaner Vue 3 support pattern.
8. Debouncing does not need an external utility package unless your project already standardizes on one. A local debounce helper is often enough.
9. Responsive resize listeners and system theme listeners must always be cleaned up in `onBeforeUnmount`.
10. Large datasets should be aggregated and bounded by a maximum size to reduce SVG pressure and improve runtime stability.
11. `Canvas`-oriented rendering flags alone do not replace aggregation, cleanup, and bounded-data strategies; those remain the first-line performance practices.
12. When the request asks for a single copyable solution, the response should be delivered as one continuous, clean markdown block without scattered corrections.