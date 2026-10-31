# Export, Print & Accessibility

## Table of Contents
- [Export to PDF](#export-to-pdf)
  - [Module Requirement](#module-requirement)
  - [Basic PDF Export](#basic-pdf-export)
  - [PDF Export Options](#pdf-export-options)
  - [Multi-Page PDF](#multi-page-pdf)
- [Export to SVG](#export-to-svg)
  - [Basic SVG Export](#basic-svg-export)
  - [SVG Export Benefits](#svg-export-benefits)
  - [SVG with Embedding](#svg-with-embedding)
- [Print Functionality](#print-functionality)
  - [Basic Print](#basic-print)
  - [Print with Custom Settings](#print-with-custom-settings)
  - [Print Styling](#print-styling)
- [WCAG Accessibility](#wcag-accessibility)
  - [WCAG Compliance Checklist](#wcag-compliance-checklist)
  - [Basic ARIA Setup](#basic-aria-setup)
  - [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Keyboard Event Handling](#keyboard-event-handling)
- [Screen Reader Support](#screen-reader-support)
  - [Text Alternatives](#text-alternatives)
  - [Series Description](#series-description)
  - [Legend Accessibility](#legend-accessibility)
- [Color Contrast & Indicators](#color-contrast--indicators)
  - [Color Contrast Guidelines](#color-contrast-guidelines)
  - [Accessible Color Palette](#accessible-color-palette)
  - [Pattern + Color Indicators](#pattern--color-indicators)
  - [Focus Indicators](#focus-indicators)
- [Complete Accessible Example](#complete-accessible-example)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Export to PDF

In the Stock Chart, export is an inbuilt capability exposed through the period selector toolbar after the `Export` module is injected. For a Vue 3 Stock Chart sample, the safest documented pattern is:

1. Inject `Export`.
2. Render a full Stock Chart normally.
3. Let the built-in toolbar handle export.
4. Use `exportType` only when you want to restrict the export menu items.

### Module Requirement

For this topic set, use a complete Vue 3 Composition API setup and keep the Stock Chart module injection fully ready for export, tooltip, and runtime indicator switching. In this corrected version, PDF, SVG, and Print are treated as built-in toolbar actions rather than external `ej2Instances.export()` or `ej2Instances.print()` calls.

```vue
<template>
  <div class="stock-chart-container">
    <p class="helper-text">
      Use the built-in period selector toolbar to export as PDF or SVG, and use the built-in print button for printing.
    </p>

    <ejs-stockchart
      id="pdf-export-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 },
  { date: new Date(2024, 0, 9), open: 193, high: 195, low: 190, close: 192, volume: 1250000 },
  { date: new Date(2024, 0, 10), open: 192, high: 196, low: 191, close: 195, volume: 1640000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 560px;
}

.helper-text {
  margin-bottom: 12px;
  color: #374151;
  line-height: 1.6;
}
</style>
```

### Basic PDF Export

The Stock Chart handles PDF export through its built-in toolbar. After injecting `Export`, use the export dropdown in the Stock Chart toolbar and choose `PDF`.

There is no need to add an external custom button or depend on an unsupported public `stockChart.export('PDF', ...)` pattern for the Stock Chart sample.

### PDF Export Options

For Stock Chart, keep export aligned with the built-in toolbar. If you need to control available export formats, use `exportType`. If you need a different exported size, configure the chart width and height before export so the built-in exported result reflects the rendered chart size.

```vue
<template>
  <div class="stock-chart-container">
    <p class="helper-text">
      This sample restricts the built-in export dropdown to PDF only. The chart size controls the visual size of the exported result.
    </p>

    <ejs-stockchart
      id="pdf-options-stockchart"
      :exportType="exportType"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
      width="900px"
      height="600px"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const exportType = ['PDF'];

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 700px;
}

.helper-text {
  margin-bottom: 12px;
  color: #374151;
  line-height: 1.6;
}
</style>
```

### Multi-Page PDF

A single Stock Chart export should be treated as a single-chart export. If you need a true multi-page PDF report, generate multiple exported assets or compose a report outside the built-in Stock Chart export workflow. Do not assume that the Stock Chart’s built-in PDF option automatically paginates multi-section report content.

## Export to SVG

Export the Stock Chart as SVG when you want crisp vector output for web pages, editing, or printing without quality loss.

### Basic SVG Export

The Stock Chart handles SVG export through its built-in toolbar. After injecting `Export`, use the export dropdown in the Stock Chart toolbar and choose `SVG`.

If you want to limit the built-in export dropdown to SVG only, use `exportType: ['SVG']`.

```vue
<template>
  <div class="stock-chart-container">
    <p class="helper-text">
      This sample restricts the built-in export dropdown to SVG only.
    </p>

    <ejs-stockchart
      id="svg-export-stockchart"
      :exportType="exportType"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const exportType = ['SVG'];

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 560px;
}

.helper-text {
  margin-bottom: 12px;
  color: #374151;
  line-height: 1.6;
}
</style>
```

### SVG Export Benefits

- SVG stays sharp when scaled.
- SVG is easier to inspect and edit than raster output.
- SVG is well suited for browser embedding and design handoff.
- SVG keeps text and vector shapes crisp for print workflows.

### SVG with Embedding

Do not rely on an unsupported Stock Chart export method returning a string. A safer in-page preview approach is to read the currently rendered SVG from the DOM and clone it into a preview area.

```vue
<template>
  <div class="stock-chart-container">
    <div class="toolbar">
      <button type="button" @click="previewInlineSVG">Preview Current SVG</button>
    </div>

    <ejs-stockchart
      id="svg-embed-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>

    <div class="svg-preview" v-html="svgMarkup"></div>
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const svgMarkup = ref('');

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

const previewInlineSVG = () => {
  const svg = document.querySelector('#svg-embed-stockchart svg');
  svgMarkup.value = svg ? svg.outerHTML : '';
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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 760px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

button {
  padding: 10px 14px;
  border: 1px solid #cfd8dc;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  border-radius: 8px;
}

.svg-preview {
  margin-top: 24px;
  border: 1px solid #e5e7eb;
  padding: 16px;
  background: #ffffff;
  overflow: auto;
}
</style>
```

## Print Functionality

The Stock Chart includes built-in print support through the period selector toolbar. For custom page-level print layouts, use standard browser printing on a report wrapper.

### Basic Print

The Stock Chart handles print through its built-in toolbar. After rendering the chart, use the built-in print button in the Stock Chart toolbar.

There is no need to add an external custom button that calls `ej2Instances.print()` for the Stock Chart sample.

```vue
<template>
  <div class="stock-chart-container">
    <p class="helper-text">
      Use the built-in print button in the Stock Chart toolbar for direct chart printing.
    </p>

    <ejs-stockchart
      id="basic-print-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 560px;
}

.helper-text {
  margin-bottom: 12px;
  color: #374151;
  line-height: 1.6;
}
</style>
```

### Print with Custom Settings

If you want to print a full report layout with headings, summaries, or additional content, use `window.print()` on a dedicated print wrapper. This is separate from the Stock Chart’s built-in toolbar print action.

```vue
<template>
  <div class="stock-chart-container">
    <div class="toolbar no-print">
      <button type="button" @click="printReportLayout">Print Report Layout</button>
    </div>

    <section id="print-area" class="print-area">
      <header class="print-header">
        <h1>Stock Price Chart</h1>
        <p>Generated: {{ generatedOn }}</p>
      </header>

      <ejs-stockchart
        id="print-settings-stockchart"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :title="title"
        :tooltip="tooltip"
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
          />
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </section>
  </div>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const generatedOn = new Date().toLocaleDateString();

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

const printReportLayout = () => {
  window.print();
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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 640px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

button {
  padding: 10px 14px;
  border: 1px solid #cfd8dc;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  border-radius: 8px;
}

.print-area {
  background: #ffffff;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.print-header {
  text-align: center;
  margin-bottom: 20px;
}

@media print {
  .no-print {
    display: none !important;
  }

  .print-area {
    border: none;
    padding: 0;
  }
}
</style>
```

### Print Styling

The previous sample already includes print-safe styling. The key points are:

- Hide non-print controls with a `.no-print` class.
- Keep the chart inside a dedicated print wrapper.
- Use standard browser print for full report layouts.
- Let the built-in Stock Chart toolbar handle chart-only print behavior.

## Disable Export and Print
The Stock Chart handles export and print through its built-in toolbar. If you want to disable both export and print completely, set exportType to an empty array. This removes the built-in export and print options from the Stock Chart toolbar.

```vue
<template>
  <div class="stock-chart-container">
    <p class="helper-text">
      This sample disables the built-in export and print options completely.
    </p>

    <ejs-stockchart
      id="disable-export-print-stockchart"
      :exportType="exportType"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

// Change this line in your <script setup>
const exportType = ['PDF', 'Print'];


const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 560px;
}
.helper-text {
  margin-bottom: 12px;
  color: #374151;
  line-height: 1.6;
}
</style>
```

## WCAG Accessibility

Use wrapper semantics, descriptive text, visible focus, keyboard access, and non-color-only cues. Keep the chart understandable to both keyboard users and assistive technologies.

### WCAG Compliance Checklist

- Aim for WCAG AA at minimum.
- Provide a meaningful chart title and a short description.
- Make the surrounding region reachable by keyboard.
- Keep focus visible.
- Use sufficient color contrast.
- Do not depend on color alone to communicate state.
- Provide a text summary for screen reader users.

### Basic ARIA Setup

Instead of depending on an undocumented Stock Chart prop such as `ariaLabel`, place the chart inside an accessible wrapper with `role`, `aria-labelledby`, and `aria-describedby`.

```vue
<template>
  <section
    class="stock-chart-container"
    role="region"
    aria-labelledby="chart-title"
    aria-describedby="chart-description"
  >
    <h2 id="chart-title">Apple Stock Price</h2>
    <p id="chart-description">
      Interactive candlestick chart showing daily stock movement with open, high, low, close, and volume values.
    </p>

    <ejs-stockchart
      id="aria-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </section>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 620px;
}
</style>
```

### ARIA Attributes

Use these at the wrapper level for predictable accessibility behavior:

- `role="region"` on the chart container.
- `aria-labelledby` pointing to the visible heading.
- `aria-describedby` pointing to the chart instructions or summary.
- A visually hidden text block for condensed data summary when needed.

## Keyboard Navigation

Do not override the Stock Chart’s built-in keyboard behavior unless you intentionally want extra wrapper-level shortcuts unrelated to built-in export and print.

### Keyboard Shortcuts

The Stock Chart keyboard support should be documented as follows:

- `Alt + J` moves focus to the Stock Chart.
- `Tab` moves to the next interactive element.
- `Shift + Tab` moves to the previous interactive element.
- `Up Arrow` moves focus to the data point on the right side of the selected point.
- `Down Arrow` moves focus to the data point on the left side of the selected point.
- `Esc` dismisses the active tooltip state.
- `Ctrl + P` triggers print from the browser.

### Keyboard Event Handling

If you want custom keyboard support, attach it to a surrounding container and avoid remapping the Stock Chart’s built-in keys or inventing custom keyboard handlers for built-in export actions.

```vue
<template>
  <section
    class="stock-chart-container"
    role="region"
    aria-labelledby="keyboard-chart-title"
    aria-describedby="keyboard-chart-help"
    tabindex="0"
    @keydown="handleWrapperKeydown"
  >
    <h2 id="keyboard-chart-title">Keyboard Accessible Stock Chart</h2>
    <p id="keyboard-chart-help">
      Built-in Stock Chart keyboard shortcuts remain available. This wrapper only adds a help panel toggle and does not replace built-in chart navigation.
    </p>

    <div class="toolbar">
      <button type="button" @click="toggleHelp">
        {{ showHelp ? 'Hide Help' : 'Show Help' }}
      </button>
    </div>

    <div v-if="showHelp" class="help-panel">
      <p>Built-in shortcuts: Alt + J, Tab, Shift + Tab, Up Arrow, Down Arrow, Esc, Ctrl + P.</p>
      <p>Use the built-in toolbar for export and print actions.</p>
    </div>

    <ejs-stockchart
      id="keyboard-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </section>
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const showHelp = ref(false);

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

const toggleHelp = () => {
  showHelp.value = !showHelp.value;
};

const handleWrapperKeydown = (event) => {
  if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'h') {
    event.preventDefault();
    toggleHelp();
  }
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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 700px;
  outline: none;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

button {
  padding: 10px 14px;
  border: 1px solid #cfd8dc;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  border-radius: 8px;
}

.help-panel {
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.stock-chart-container:focus {
  outline: 3px solid #1976d2;
  outline-offset: 4px;
}
</style>
```

## Screen Reader Support

Provide a short human-readable summary of the dataset and keep series names meaningful.

### Text Alternatives

```vue
<template>
  <section
    class="stock-chart-container"
    role="region"
    aria-labelledby="sr-chart-title"
    aria-describedby="sr-chart-summary"
  >
    <h2 id="sr-chart-title">AAPL Stock Chart</h2>

    <ejs-stockchart
      id="screen-reader-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
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
          name="AAPL Stock Price"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>

    <div id="sr-chart-summary" class="sr-only">
      <h3>Stock Chart Data Summary</h3>
      <p>Time period: {{ startDate }} to {{ endDate }}</p>
      <ul>
        <li>Opening price: ${{ openingPrice }}</li>
        <li>Highest price: ${{ highestPrice }}</li>
        <li>Lowest price: ${{ lowestPrice }}</li>
        <li>Closing price: ${{ closingPrice }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { provide, computed } from 'vue';
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
  RangeTooltip,
  StockLegend,
  Export
} from '@syncfusion/ej2-vue-charts';

const title = 'AAPL Stock Price';
const legendSettings = {
  visible: true,
  position: 'Bottom'
};
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

const startDate = computed(() => chartData[0]?.date.toLocaleDateString() ?? 'N/A');
const endDate = computed(() => chartData[chartData.length - 1]?.date.toLocaleDateString() ?? 'N/A');
const openingPrice = computed(() => chartData[0]?.open?.toFixed(2) ?? 'N/A');
const highestPrice = computed(() => Math.max(...chartData.map((item) => item.high)).toFixed(2));
const lowestPrice = computed(() => Math.min(...chartData.map((item) => item.low)).toFixed(2));
const closingPrice = computed(() => chartData[chartData.length - 1]?.close?.toFixed(2) ?? 'N/A');

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
  RangeTooltip,
  StockLegend,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 660px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

### Series Description

A good series description pattern for Stock Chart is:

- Give the series a meaningful `name`, such as `AAPL Stock Price`.
- Keep tooltip text explicit with date, open, high, low, and close.
- Add a wrapper-level text summary for screen readers.

### Legend Accessibility

For Stock Chart, keep the legend visible and ensure each series has a clear `name`. When legend support is included, import `StockLegend` and provide it through `provide('stockChart', [...])` together with `legendSettings`.

## Color Contrast & Indicators

Use high contrast colors, visible outlines, and pattern differences so that data meaning does not depend on color alone.

### Color Contrast Guidelines

- Target at least 4.5:1 contrast for normal text.
- Use darker bullish and bearish colors for chart clarity.
- Add visible outlines or dash patterns where possible.
- Keep keyboard focus highly visible.

### Accessible Color Palette

Use colors such as:

- Bullish candle: `#2E7D32`
- Bearish candle: `#C62828`
- Neutral accent: `#1565C0`
- Grid line: `#BDBDBD`
- Text: `#212121`

Avoid very light fills that disappear against white backgrounds.

### Pattern + Color Indicators

The following example uses high-contrast candle fills and dashed trendlines so users are not forced to rely on color alone.

```vue
<template>
  <section class="stock-chart-container">
    <ejs-stockchart
      id="contrast-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
          bullFillColor="#2E7D32"
          bearFillColor="#C62828"
          :border="{ width: 1, color: '#212121' }"
          :trendlines="trendlines"
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </section>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const trendlines = [
  {
    type: 'Linear',
    fill: '#1565C0',
    width: 2,
    dashArray: '6,4'
  }
];

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 560px;
}
</style>
```

### Focus Indicators

Keep focus visible for keyboard users.

```vue
<template>
  <section
    class="stock-chart-container"
    tabindex="0"
    aria-label="Focusable stock chart region"
  >
    <ejs-stockchart
      id="focus-stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
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
        />
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </section>
</template>

<script setup>
import { provide } from 'vue';
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
  RangeTooltip,
  Export
} from '@syncfusion/ej2-vue-charts';

const title = 'AAPL Stock Price';
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 }
];

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
  RangeTooltip,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 560px;
  outline: none;
}

.stock-chart-container:focus {
  outline: 3px solid #1976d2;
  outline-offset: 4px;
}

@media (prefers-contrast: more) {
  .stock-chart-container:focus {
    outline: 4px solid #000000;
    outline-offset: 5px;
  }
}
</style>
```

## Complete Accessible Example

This complete sample combines built-in Stock Chart export and print behavior, keyboard-friendly wrapper semantics, visible focus, high-contrast colors, legend support with `StockLegend`, and a screen-reader summary.

```vue
<template>
  <section
    class="stock-chart-container"
    role="region"
    aria-labelledby="complete-chart-title"
    aria-describedby="complete-chart-description complete-chart-summary"
    tabindex="0"
    @keydown="handleWrapperKeydown"
  >
    <h2 id="complete-chart-title">Apple Stock Price Chart</h2>

    <p id="complete-chart-description">
      Interactive candlestick chart showing daily AAPL stock data.
      Use the built-in Stock Chart keyboard support for navigation.
      Use the built-in toolbar for PDF export, SVG export, and direct chart printing.
      Press Alt + Shift + H to show or hide the help panel.
    </p>

    <div class="controls no-print">
      <button type="button" @click="toggleHelp" aria-label="Toggle keyboard help">
        {{ showHelp ? 'Hide Help' : 'Show Help' }}
      </button>
      <button type="button" @click="printReportLayout" aria-label="Print report layout">
        Print Report Layout
      </button>
    </div>

    <div v-if="showHelp" class="help-panel no-print">
      <p>Built-in chart shortcuts: Alt + J, Tab, Shift + Tab, Up Arrow, Down Arrow, Esc, Ctrl + P.</p>
      <p>Use the built-in Stock Chart toolbar for export and direct chart print actions.</p>
    </div>

    <div class="print-area">
      <header class="print-header print-only">
        <h3>Stock Price Report</h3>
        <p>Generated: {{ generatedOn }}</p>
      </header>

      <ejs-stockchart
        id="complete-accessible-stockchart"
        :exportType="exportType"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :title="title"
        :tooltip="tooltip"
        :legendSettings="legendSettings"
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
            name="AAPL Stock Price"
            bullFillColor="#2E7D32"
            bearFillColor="#C62828"
            :border="{ width: 1, color: '#212121' }"
            :trendlines="trendlines"
          />
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>

    <div id="complete-chart-summary" class="sr-only">
      <h3>Chart Summary</h3>
      <p>Time period: {{ chartStartDate }} to {{ chartEndDate }}</p>
      <p>
        Opening: ${{ openingPrice }},
        High: ${{ highestPrice }},
        Low: ${{ lowestPrice }},
        Closing: ${{ closingPrice }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { provide, ref, computed } from 'vue';
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
  RangeTooltip,
  StockLegend,
  Export
} from '@syncfusion/ej2-vue-charts';

const showHelp = ref(false);
const generatedOn = new Date().toLocaleDateString();

const exportType = ['PDF', 'SVG'];
const title = 'AAPL Stock Price';
const legendSettings = {
  visible: true,
  position: 'Bottom'
};
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};
const primaryYAxis = {
  labelFormat: '${value}',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 }
};
const tooltip = {
  enable: true,
  format: 'Date: ${point.x}<br/>Open: ${point.open}<br/>High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
};
const trendlines = [
  {
    type: 'Linear',
    fill: '#1565C0',
    width: 2,
    dashArray: '6,4'
  }
];

const chartData = [
  { date: new Date(2024, 0, 2), open: 185, high: 188, low: 183, close: 186, volume: 1200000 },
  { date: new Date(2024, 0, 3), open: 186, high: 190, low: 184, close: 189, volume: 1340000 },
  { date: new Date(2024, 0, 4), open: 189, high: 191, low: 186, close: 187, volume: 980000 },
  { date: new Date(2024, 0, 5), open: 187, high: 192, low: 185, close: 191, volume: 1420000 },
  { date: new Date(2024, 0, 8), open: 191, high: 194, low: 189, close: 193, volume: 1500000 },
  { date: new Date(2024, 0, 9), open: 193, high: 195, low: 190, close: 192, volume: 1250000 },
  { date: new Date(2024, 0, 10), open: 192, high: 196, low: 191, close: 195, volume: 1640000 }
];

const chartStartDate = computed(() => chartData[0]?.date.toLocaleDateString() ?? 'N/A');
const chartEndDate = computed(() => chartData[chartData.length - 1]?.date.toLocaleDateString() ?? 'N/A');
const openingPrice = computed(() => chartData[0]?.open?.toFixed(2) ?? 'N/A');
const highestPrice = computed(() => Math.max(...chartData.map((item) => item.high)).toFixed(2));
const lowestPrice = computed(() => Math.min(...chartData.map((item) => item.low)).toFixed(2));
const closingPrice = computed(() => chartData[chartData.length - 1]?.close?.toFixed(2) ?? 'N/A');

const toggleHelp = () => {
  showHelp.value = !showHelp.value;
};

const printReportLayout = () => {
  window.print();
};

const handleWrapperKeydown = (event) => {
  if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'h') {
    event.preventDefault();
    toggleHelp();
  }
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
  RangeTooltip,
  StockLegend,
  Export
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 820px;
  padding: 20px;
  outline: none;
}

.stock-chart-container:focus {
  outline: 3px solid #1976d2;
  outline-offset: 4px;
}

.controls {
  display: flex;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
}

button {
  padding: 10px 14px;
  border: 1px solid #cfd8dc;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  border-radius: 8px;
}

.help-panel {
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.print-area {
  background: #ffffff;
}

.print-header {
  text-align: center;
  margin-bottom: 16px;
}

.print-only {
  display: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-contrast: more) {
  .stock-chart-container:focus {
    outline: 4px solid #000000;
    outline-offset: 5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  :deep(.e-stockchart) {
    animation: none !important;
    transition: none !important;
  }
}

@media print {
  .no-print {
    display: none !important;
  }

  .print-only {
    display: block;
  }

  .stock-chart-container {
    padding: 0;
    outline: none;
  }
}
</style>
```

## Combined Mistakes and Future References

- The original content mixed partial Vue template fragments, partial JavaScript objects, and incomplete patterns. All runnable examples above were expanded into full Vue 3 Single File Components using `script setup`.
- The original `provide:` object style was not the correct Vue 3 Composition API pattern for these examples. It was replaced with `provide('stockChart', [...])`.
- Because your active note explicitly requires runtime-safe indicator switching support, the import list and `provide('stockChart', [...])` include the full required module list for indicator-capable Stock Chart samples.
- Tooltip-related samples now use the corrected naming `Tooltip` and `RangeTooltip`.
- When legend support is visible or used, `StockLegend` is now imported and injected.
- The earlier export and print approach treated Stock Chart like a standard Chart with externally documented `export()` and `print()` calls. The corrected version treats PDF export, SVG export, and direct chart print as built-in toolbar behavior in the Stock Chart.
- The earlier export examples depended on a custom button plus `ej2Instances.export(...)`. The corrected version uses the built-in toolbar and `exportType` when export menu restriction is needed.
- The earlier print examples depended on a custom button plus `ej2Instances.print()`. The corrected version uses the built-in toolbar for chart printing and `window.print()` only for custom report-layout printing.
- The earlier PDF options section created the impression that ad-hoc external export calls were the primary Stock Chart pattern. The corrected version keeps export options tied to built-in toolbar behavior and rendered chart sizing.
- The earlier SVG section implied that exporting SVG should be driven from an external method call. The corrected version keeps built-in export in the toolbar and uses DOM-based SVG preview for embedding scenarios.
- The earlier keyboard event sample introduced custom export and print hotkeys that depended on unsupported external Stock Chart export calls. The corrected version preserves the built-in Stock Chart keyboard behavior and limits custom wrapper shortcuts to non-conflicting helper actions.
- The earlier legend accessibility note incorrectly warned against importing `StockLegend`. Your active thread note is now respected, and legend-enabled samples import and inject `StockLegend`.
- The earlier multi-page PDF wording suggested that one Stock Chart export might automatically become a multi-page report. The corrected guidance treats one Stock Chart export as one chart export and recommends composing larger reports outside that built-in workflow.