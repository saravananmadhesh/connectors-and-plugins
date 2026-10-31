# Data Binding & Real-Time Updates

## Table of Contents
- [Static Data Binding](#static-data-binding)
  - [Basic Static Binding](#basic-static-binding)
  - [Data Format Requirements](#data-format-requirements)
- [Dynamic Data Binding](#dynamic-data-binding)
  - [Adding New Data Points](#adding-new-data-points)
  - [Replacing All Data](#replacing-all-data)
  - [Updating Specific Points](#updating-specific-points)
- [API Data Binding](#api-data-binding)
  - [Loading Data from API](#loading-data-from-api)
  - [API Response Format Transformation](#api-response-format-transformation)
  - [Pagination for Large Datasets](#pagination-for-large-datasets)
- [Real-Time Updates](#real-time-updates)
  - [WebSocket Real-Time Updates](#websocket-real-time-updates)
  - [Polling for Updates](#polling-for-updates)
- [Event Handling](#event-handling)
  - [Chart Events](#chart-events)
  - [Data Update Events](#data-update-events)
- [Performance Optimization](#performance-optimization)
  - [Data Virtualization](#data-virtualization)
  - [Debouncing Updates](#debouncing-updates)
  - [Aggregating Data Points](#aggregating-data-points)
  - [Batch Updates](#batch-updates)
- [Complete Real-Time Example](#complete-real-time-example)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Static Data Binding

Load data from a local array during component initialization.

### Basic Static Binding

Use a complete Vue 3 Single File Component so the chart renders immediately without relying on partial snippets.

```vue
<template>
  <div class="stock-chart-container">
    <ejs-stockchart
      id="static-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Static OHLC Data"
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
  Tooltip,
  RangeTooltip,
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

const title = 'Static Data Binding';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  {
    date: new Date('2024-01-01'),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1200000
  },
  {
    date: new Date('2024-01-02'),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 1400000
  },
  {
    date: new Date('2024-01-03'),
    open: 106,
    high: 110,
    low: 104,
    close: 108,
    volume: 1500000
  }
]);

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.stock-chart-container {
  width: 100%;
  min-height: 420px;
}

#static-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Data Format Requirements

Stock Chart data should follow a consistent OHLC structure, and `volume` should be included whenever future stock behaviors may depend on it.

```javascript
const chartData = [
  {
    date: new Date('2024-01-01'),
    open: 100.5,
    high: 105.75,
    low: 98.25,
    close: 102.3,
    volume: 1500000
  }
];
```

**Required properties:**
- `date` - Date object for the x-axis
- `open` - Opening price
- `high` - Highest price
- `low` - Lowest price
- `close` - Closing price

**Recommended property:**
- `volume` - Useful for stock-related calculations and future indicator compatibility

## Dynamic Data Binding

Update the data array reactively and refresh the chart safely.

### Adding New Data Points

In Vue 3, avoid `this.$forceUpdate()`. Instead, update the reactive array and refresh the chart instance only when needed.

```vue
<template>
  <div class="dynamic-container">
    <div class="toolbar">
      <button type="button" @click="addDataPoint">Add Price</button>
    </div>

    <ejs-stockchart
      id="dynamic-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Dynamic OHLC Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const title = 'Adding New Data Points';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1400000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1500000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const addDataPoint = async () => {
  const previousClose = chartData.value[chartData.value.length - 1]?.close ?? 100;
  const open = previousClose;
  const close = Number((open + (Math.random() * 6 - 3)).toFixed(2));
  const high = Number((Math.max(open, close) + Math.random() * 3).toFixed(2));
  const low = Number((Math.min(open, close) - Math.random() * 3).toFixed(2));

  const newPoint = {
    date: new Date(chartData.value[chartData.value.length - 1].date.getTime() + 24 * 60 * 60 * 1000),
    open,
    high,
    low,
    close,
    volume: Math.floor(1200000 + Math.random() * 400000)
  };

  chartData.value = [...chartData.value, newPoint];
  await refreshChart();
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.dynamic-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#dynamic-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Replacing All Data

Replace the full dataset by assigning a new array reference.

```vue
<template>
  <div class="replace-container">
    <div class="toolbar">
      <button type="button" @click="replaceAllData">Replace All Data</button>
    </div>

    <ejs-stockchart
      id="replace-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Replacement Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const title = 'Replacing All Data';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1400000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const buildNewData = () => ([
  { date: new Date('2024-02-01'), open: 111, high: 116, low: 109, close: 114, volume: 1600000 },
  { date: new Date('2024-02-02'), open: 114, high: 120, low: 112, close: 118, volume: 1750000 },
  { date: new Date('2024-02-03'), open: 118, high: 123, low: 117, close: 121, volume: 1800000 },
  { date: new Date('2024-02-04'), open: 121, high: 125, low: 119, close: 124, volume: 1900000 }
]);

const replaceAllData = async () => {
  chartData.value = buildNewData();
  await refreshChart();
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.replace-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#replace-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Updating Specific Points

In Vue 3, update the target item immutably and replace the array reference.

```vue
<template>
  <div class="update-container">
    <div class="toolbar">
      <button type="button" @click="updatePoint(1)">Update Second Point</button>
    </div>

    <ejs-stockchart
      id="update-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Point Update Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const title = 'Updating Specific Points';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1400000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1500000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const updatePoint = async (index) => {
  chartData.value = chartData.value.map((point, currentIndex) => {
    if (currentIndex !== index) {
      return point;
    }

    const newClose = Number((point.close + 4.25).toFixed(2));
    return {
      ...point,
      high: Math.max(point.high, newClose + 1.25),
      low: Math.min(point.low, newClose - 1.25),
      close: newClose,
      volume: point.volume + 125000
    };
  });

  await refreshChart();
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.update-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#update-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

## API Data Binding

Load stock data from an API and transform it into OHLC format before binding it to the component.

### Loading Data from API

Use a complete Composition API component and keep the transformation logic inside `<script setup>`.

```vue
<template>
  <div class="api-container">
    <div class="toolbar">
      <select v-model="selectedPeriod" @change="loadHistoricalData">
        <option value="">Select Period</option>
        <option value="1m">1 Month</option>
        <option value="3m">3 Months</option>
        <option value="1y">1 Year</option>
      </select>
    </div>

    <ejs-stockchart
      v-if="chartData.length"
      id="api-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="API Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>

    <p v-else class="status">Loading data...</p>
  </div>
</template>

<script setup>
import { provide, ref, nextTick, onMounted } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const selectedPeriod = ref('1m');
const chartData = ref([]);
const title = 'API Data Binding';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const transformApiData = (data) =>
  data.map((item) => ({
    date: new Date(item.timestamp),
    open: item.o,
    high: item.h,
    low: item.l,
    close: item.c,
    volume: item.v
  }));

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const loadHistoricalData = async () => {
  if (!selectedPeriod.value) {
    chartData.value = [];
    return;
  }

  try {
    const response = await fetch(`/api/stock-data?period=${selectedPeriod.value}`);
    const data = await response.json();
    chartData.value = transformApiData(data);
    await refreshChart();
  } catch (error) {
    console.error('Failed to load data:', error);
    chartData.value = [];
  }
};

onMounted(async () => {
  await loadHistoricalData();
});

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.api-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

.status {
  margin-top: 16px;
}

#api-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### API Response Format Transformation

Keep the transformation logic separate so API contracts can change without forcing component-level rewrites.

```javascript
const apiResponse = [
  { timestamp: 1704067200000, o: 100, h: 105, l: 98, c: 102, v: 1500000 }
];

const transformedData = apiResponse.map((item) => ({
  date: new Date(item.timestamp),
  open: item.o,
  high: item.h,
  low: item.l,
  close: item.c,
  volume: item.v
}));
```

### Pagination for Large Datasets

Append paged API results by merging them into the existing array with a new array reference.

```vue
<template>
  <div class="pagination-container">
    <div class="toolbar">
      <button type="button" @click="loadMoreData">Load More Data</button>
    </div>

    <ejs-stockchart
      id="pagination-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Paged API Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const page = ref(1);
const pageSize = 100;
const title = 'Pagination for Large Datasets';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([]);

const mapResponse = (data) =>
  data.map((item) => ({
    date: new Date(item.timestamp),
    open: item.o,
    high: item.h,
    low: item.l,
    close: item.c,
    volume: item.v
  }));

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const loadMoreData = async () => {
  try {
    const response = await fetch(`/api/stock-data?page=${page.value}&pageSize=${pageSize.value}`);
    const newData = await response.json();
    chartData.value = [...chartData.value, ...mapResponse(newData)];
    page.value += 1;
    await refreshChart();
  } catch (error) {
    console.error('Failed to load more data:', error);
  }
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.pagination-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#pagination-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

## Real-Time Updates

Update the chart as price data streams in, while keeping candle updates predictable and safe.

### WebSocket Real-Time Updates

Use WebSocket events to either update the latest candle or append a new one based on your current candle interval rule.

```vue
<template>
  <div class="ws-container">
    <p class="status">WebSocket status: {{ connectionStatus }}</p>

    <ejs-stockchart
      id="websocket-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="WebSocket Stream"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const ws = ref(null);
const connectionStatus = ref('Disconnected');
const title = 'WebSocket Real-Time Updates';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const isSameCandle = (date1, date2) => {
  return date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear();
};

const updateLatestPrice = async (priceUpdate) => {
  const now = new Date();
  const lastIndex = chartData.value.length - 1;
  const lastPoint = chartData.value[lastIndex];

  if (!lastPoint) {
    chartData.value = [
      {
        date: now,
        open: priceUpdate.price,
        high: priceUpdate.price,
        low: priceUpdate.price,
        close: priceUpdate.price,
        volume: priceUpdate.volume ?? 0
      }
    ];
    await refreshChart();
    return;
  }

  if (isSameCandle(lastPoint.date, now)) {
    const updatedPoint = {
      ...lastPoint,
      high: Math.max(lastPoint.high, priceUpdate.price),
      low: Math.min(lastPoint.low, priceUpdate.price),
      close: priceUpdate.price,
      volume: (lastPoint.volume ?? 0) + (priceUpdate.volume ?? 0)
    };

    chartData.value = chartData.value.map((point, index) => index === lastIndex ? updatedPoint : point);
  } else {
    chartData.value = [
      ...chartData.value,
      {
        date: now,
        open: priceUpdate.price,
        high: priceUpdate.price,
        low: priceUpdate.price,
        close: priceUpdate.price,
        volume: priceUpdate.volume ?? 0
      }
    ];
  }

  await refreshChart();
};

const connectWebSocket = () => {
  ws.value = new WebSocket('wss://api.example.com/stock-prices');
  connectionStatus.value = 'Connecting';

  ws.value.onopen = () => {
    connectionStatus.value = 'Connected';
  };

  ws.value.onmessage = async (event) => {
    const priceUpdate = JSON.parse(event.data);
    await updateLatestPrice(priceUpdate);
  };

  ws.value.onerror = (error) => {
    console.error('WebSocket error:', error);
    connectionStatus.value = 'Error';
  };

  ws.value.onclose = () => {
    connectionStatus.value = 'Disconnected';
  };
};

onMounted(() => {
  connectWebSocket();
});

onBeforeUnmount(() => {
  ws.value?.close();
});

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.ws-container {
  width: 100%;
}

.status {
  margin-bottom: 12px;
}

#websocket-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Polling for Updates

Polling is simpler than WebSocket streaming and works well when live updates are periodic rather than continuous.

```vue
<template>
  <div class="polling-container">
    <div class="toolbar">
      <button type="button" @click="startPolling">Start Polling</button>
      <button type="button" @click="stopPolling">Stop Polling</button>
    </div>

    <ejs-stockchart
      id="polling-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Polling Updates"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const pollInterval = ref(null);
const title = 'Polling for Updates';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const fetchLatestPrice = async () => {
  try {
    const response = await fetch('/api/latest-price');
    const data = await response.json();

    const lastPoint = chartData.value[chartData.value.length - 1];
    if (!lastPoint) {
      return;
    }

    const updatedPoint = {
      ...lastPoint,
      high: Math.max(lastPoint.high, data.price),
      low: Math.min(lastPoint.low, data.price),
      close: data.price,
      volume: (lastPoint.volume ?? 0) + (data.volume ?? 0)
    };

    chartData.value = chartData.value.map((point, index) =>
      index === chartData.value.length - 1 ? updatedPoint : point
    );

    await refreshChart();
  } catch (error) {
    console.error('Failed to fetch price:', error);
  }
};

const startPolling = (intervalMs = 5000) => {
  stopPolling();
  pollInterval.value = setInterval(() => {
    fetchLatestPrice();
  }, intervalMs);
};

const stopPolling = () => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
    pollInterval.value = null;
  }
};

onMounted(() => {
  startPolling(5000);
});

onBeforeUnmount(() => {
  stopPolling();
});

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.polling-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#polling-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

## Event Handling

React to chart lifecycle events and data changes without relying on Vue 2 instance APIs.

### Chart Events

Bind chart events directly on the component and keep all handlers inside `<script setup>`.

```vue
<template>
  <div class="event-container">
    <ejs-stockchart
      id="event-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
      @load="onChartLoad"
      @pointRender="onPointRender"
      @seriesRender="onSeriesRender"
      @tooltipRender="onTooltipRender"
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
          name="Event Bound Data"
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
  Tooltip,
  RangeTooltip,
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

const title = 'Chart Events';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1400000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1500000 }
]);

const onChartLoad = (args) => {
  console.log('Chart loaded:', args);
};

const onPointRender = (args) => {
  const closeValue = args.point?.close ?? args.point?.y ?? 0;
  args.fill = closeValue > 106 ? '#4CAF50' : '#F44336';
};

const onSeriesRender = (args) => {
  console.log('Series rendering:', args.series?.name);
};

const onTooltipRender = (args) => {
  args.text = `Custom: ${args.text}`;
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.event-container {
  width: 100%;
}

#event-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Data Update Events

Use Vue 3 `watch` instead of legacy instance watchers and refresh the chart after significant data mutations.

```vue
<template>
  <div class="watch-container">
    <div class="toolbar">
      <button type="button" @click="appendPoint">Append Point</button>
    </div>

    <ejs-stockchart
      id="watch-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Watched Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, watch, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const title = 'Data Update Events';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

watch(
  chartData,
  async (newData) => {
    console.log('Data updated. New length:', newData.length);
    await refreshChart();
  },
  { deep: true }
);

const appendPoint = () => {
  const lastPoint = chartData.value[chartData.value.length - 1];
  const nextDate = new Date(lastPoint.date.getTime() + 24 * 60 * 60 * 1000);
  chartData.value = [
    ...chartData.value,
    {
      date: nextDate,
      open: lastPoint.close,
      high: lastPoint.close + 4,
      low: lastPoint.close - 2,
      close: lastPoint.close + 3,
      volume: 1300000
    }
  ];
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.watch-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#watch-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

## Performance Optimization

When data volume grows or updates become frequent, apply targeted optimizations rather than brute-force rerenders.

### Data Virtualization

Load only the visible date range instead of binding the full historical dataset at once.

```vue
<template>
  <div class="virtual-container">
    <div class="toolbar">
      <button type="button" @click="loadVisibleData('2024-01-01', '2024-03-31')">Load Q1</button>
      <button type="button" @click="loadVisibleData('2024-04-01', '2024-06-30')">Load Q2</button>
    </div>

    <ejs-stockchart
      id="virtual-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Visible Range Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const chartData = ref([]);
const title = 'Data Virtualization';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const loadVisibleData = async (startDate, endDate) => {
  try {
    const response = await fetch(`/api/stock-data?start=${startDate}&end=${endDate}`);
    const data = await response.json();
    chartData.value = data.map((item) => ({
      date: new Date(item.timestamp),
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
      volume: item.v
    }));
    await refreshChart();
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.virtual-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#virtual-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Debouncing Updates

Avoid firing chart refreshes for every tiny upstream event by debouncing the update pipeline.

```vue
<template>
  <div class="debounce-container">
    <div class="toolbar">
      <button type="button" @click="simulateRapidUpdates">Simulate Rapid Updates</button>
    </div>

    <ejs-stockchart
      id="debounce-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Debounced Updates"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const title = 'Debouncing Updates';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const debounce = (fn, delay = 300) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const debouncedUpdate = debounce(async (newData) => {
  chartData.value = newData;
  await refreshChart();
}, 300);

const simulateRapidUpdates = () => {
  const lastPoint = chartData.value[chartData.value.length - 1];
  const updates = Array.from({ length: 10 }, (_, index) => ({
    ...lastPoint,
    close: Number((lastPoint.close + (index + 1) * 0.6).toFixed(2)),
    high: Number((lastPoint.high + (index + 1) * 0.6).toFixed(2)),
    volume: lastPoint.volume + (index + 1) * 10000
  }));

  updates.forEach((updatedPoint) => {
    debouncedUpdate([{ ...updatedPoint }]);
  });
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.debounce-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#debounce-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Aggregating Data Points

Group high-frequency raw ticks into fewer OHLC candles before binding them to the chart.

```vue
<template>
  <div class="aggregate-container">
    <div class="toolbar">
      <button type="button" @click="runAggregation">Aggregate to 20 Candles</button>
    </div>

    <ejs-stockchart
      id="aggregate-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Aggregated Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const title = 'Aggregating Data Points';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const buildRawData = () => {
  const start = new Date('2024-01-01').getTime();
  let lastClose = 100;

  return Array.from({ length: 200 }, (_, index) => {
    const open = lastClose;
    const close = Number((open + (Math.random() * 4 - 2)).toFixed(2));
    const high = Number((Math.max(open, close) + Math.random() * 1.5).toFixed(2));
    const low = Number((Math.min(open, close) - Math.random() * 1.5).toFixed(2));
    const point = {
      date: new Date(start + index * 60 * 60 * 1000),
      open,
      high,
      low,
      close,
      volume: Math.floor(8000 + Math.random() * 6000)
    };
    lastClose = close;
    return point;
  });
};

const chartData = ref(buildRawData());

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const aggregateData = (data, targetPoints = 20) => {
  const pointsPerCandle = Math.ceil(data.length / targetPoints);
  const aggregated = [];

  for (let index = 0; index < data.length; index += pointsPerCandle) {
    const slice = data.slice(index, index + pointsPerCandle);
    if (!slice.length) {
      continue;
    }

    aggregated.push({
      date: slice[0].date,
      open: slice[0].open,
      high: Math.max(...slice.map((point) => point.high)),
      low: Math.min(...slice.map((point) => point.low)),
      close: slice[slice.length - 1].close,
      volume: slice.reduce((sum, point) => sum + (point.volume || 0), 0)
    });
  }

  return aggregated;
};

const runAggregation = async () => {
  chartData.value = aggregateData(buildRawData(), 20);
  await refreshChart();
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.aggregate-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#aggregate-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Batch Updates

If multiple points arrive together, apply them in one array update and refresh the chart only once.

```vue
<template>
  <div class="batch-container">
    <div class="toolbar">
      <button type="button" @click="batchUpdate">Batch Update</button>
    </div>

    <ejs-stockchart
      id="batch-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          name="Batched Data"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide, ref, nextTick } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const title = 'Batch Updates';
const tooltip = { enable: true };

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const chartData = ref([
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1200000 }
]);

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const buildUpdates = () => {
  const lastPoint = chartData.value[chartData.value.length - 1];
  return Array.from({ length: 5 }, (_, index) => {
    const open = index === 0 ? lastPoint.close : lastPoint.close + index;
    const close = Number((open + 1.5).toFixed(2));
    return {
      date: new Date(lastPoint.date.getTime() + (index + 1) * 24 * 60 * 60 * 1000),
      open,
      high: Number((close + 1.25).toFixed(2)),
      low: Number((open - 1.1).toFixed(2)),
      close,
      volume: 1000000 + index * 75000
    };
  });
};

const batchUpdate = async () => {
  const updates = buildUpdates();
  chartData.value = [...chartData.value, ...updates];
  await refreshChart();
};

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.batch-container {
  width: 100%;
}

.toolbar {
  margin-bottom: 16px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

#batch-stockchart {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

## Complete Real-Time Example

This example combines initial API loading, polling-based live updates, a pause/resume control, and safe reactive mutations in one complete Vue 3 component.

```vue
<template>
  <div class="realtime-page">
    <div class="controls">
      <button type="button" @click="toggleRealTime">
        {{ isRealTime ? 'Pause' : 'Resume' }} Real-Time
      </button>
      <span>Latest: ${{ lastPrice.toFixed(2) }}</span>
    </div>

    <ejs-stockchart
      v-if="chartData.length"
      id="realtime-stockchart"
      ref="stockChartRef"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
      :periodSelectorSettings="periodSelectorSettings"
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
          name="Real-Time Feed"
          :bearFillColor="bearFillColor"
          :bullFillColor="bullFillColor"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>

    <p v-else class="status">Loading data...</p>
  </div>
</template>

<script setup>
import { provide, ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  Tooltip,
  RangeTooltip,
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

const stockChartRef = ref(null);
const chartData = ref([]);
const isRealTime = ref(true);
const lastPrice = ref(0);
const pollInterval = ref(null);

const title = 'Complete Real-Time Example';
const tooltip = { enable: true };
const bearFillColor = '#e74c3d';
const bullFillColor = '#2ecc71';

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 },
  crosshairTooltip: { enable: true }
};

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const periodSelectorSettings = {
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '6M', interval: 6, intervalType: 'Months' },
    { text: 'YTD', intervalType: 'Year' },
    { text: '1Y', interval: 1, intervalType: 'Years' },
    { text: 'ALL' }
  ],
  selectedIndex: 2
};

const refreshChart = async () => {
  await nextTick();
  stockChartRef.value?.ej2Instances?.refresh();
};

const transformApiData = (data) =>
  data.map((item) => ({
    date: new Date(item.timestamp),
    open: item.o,
    high: item.h,
    low: item.l,
    close: item.c,
    volume: item.v
  }));

const loadInitialData = async () => {
  try {
    const response = await fetch('/api/stock-data?period=1m');
    const data = await response.json();
    chartData.value = transformApiData(data);

    if (chartData.value.length) {
      lastPrice.value = chartData.value[chartData.value.length - 1].close;
    }

    await refreshChart();
  } catch (error) {
    console.error('Failed to load data:', error);
    chartData.value = [];
  }
};

const updateLatestPrice = async (price, volume = 0) => {
  if (!chartData.value.length) {
    return;
  }

  const lastIndex = chartData.value.length - 1;
  const lastPoint = chartData.value[lastIndex];

  const updatedPoint = {
    ...lastPoint,
    high: Math.max(lastPoint.high, price),
    low: Math.min(lastPoint.low, price),
    close: price,
    volume: (lastPoint.volume ?? 0) + volume
  };

  chartData.value = chartData.value.map((point, index) => index === lastIndex ? updatedPoint : point);
  lastPrice.value = price;

  await refreshChart();
};

const startPolling = () => {
  stopPolling();

  pollInterval.value = setInterval(async () => {
    try {
      const response = await fetch('/api/latest-price');
      const data = await response.json();
      await updateLatestPrice(data.price, data.volume ?? 0);
    } catch (error) {
      console.error('Poll failed:', error);
    }
  }, 3000);
};

const stopPolling = () => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
    pollInterval.value = null;
  }
};

const toggleRealTime = () => {
  isRealTime.value = !isRealTime.value;

  if (isRealTime.value) {
    startPolling();
  } else {
    stopPolling();
  }
};

onMounted(async () => {
  await loadInitialData();
  startPolling();
});

onBeforeUnmount(() => {
  stopPolling();
});

provide('stockChart', [
  DateTime,
  Tooltip,
  RangeTooltip,
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
.realtime-page {
  width: 100%;
}

.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

.status {
  margin-top: 16px;
}

#realtime-stockchart {
  width: 100%;
  height: 500px;
  display: block;
}
</style>
```

## Combined Mistakes and Future References

- The original content relied heavily on Vue 2 patterns such as `this.$forceUpdate()` and `this.$set()`. In Vue 3 Composition API, use `ref`, immutable array replacement, `watch`, and optional chart instance refresh instead of Vue 2 instance helpers.
- Several original snippets were partial and not runnable because they contained only `<template>`, only `<script>`, or bare logic methods. For Stock Chart examples, always provide complete Vue 3 Single File Components with `<template>`, `<script setup>`, and `<style>`.
- The original code mixed generic Options API examples with a Vue 3-focused workflow. The corrected version keeps everything in Composition API format for consistency.
- API transformation should be separated into a helper function so changes in backend response format do not force repeated chart binding changes across multiple components.
- For dynamic and real-time updates, directly mutating deeply nested data may not always be the safest approach for third-party chart refresh cycles. Replacing the array reference after updating points is more reliable.
- Polling, WebSocket handling, and chart instance refresh logic should always be cleaned up in `onBeforeUnmount()` to prevent memory leaks and duplicate update loops.
- If you are preparing any future indicator-ready Stock Chart sample, keep the full module set aligned with the stable import/provide pattern already enforced for this thread: `LineSeries`, `AreaSeries`, `SplineSeries`, `CandleSeries`, `HiloOpenCloseSeries`, `HiloSeries`, `RangeAreaSeries`, `Trendlines`, `EmaIndicator`, `RsiIndicator`, `BollingerBands`, `TmaIndicator`, `MomentumIndicator`, `SmaIndicator`, `AtrIndicator`, `AccumulationDistributionIndicator`, `MacdIndicator`, and `StochasticIndicator`, along with `DateTime` and `RangeTooltip`.
- Use real container height in every example. Without an explicit height, Stock Chart rendering can appear broken even when the logic is otherwise correct.
- Avoid placeholder comments such as `<!-- series -->` in client-facing samples. They are not safe for debugging or copy-paste execution.
``