# Getting Started with Stock Chart

## Table of Contents
- [Installation](#installation)
- [Package Dependencies](#package-dependencies)
- [Basic Setup](#basic-setup)
  - [Step 1 Register Components](#step-1-register-components)
  - [Step 2 Add Template](#step-2-add-template)
  - [Step 3 Provide Modules](#step-3-provide-modules)
- [Data Structure](#data-structure)
- [Minimal Example](#minimal-example)
- [CSS & Theming](#css--theming)
  - [Import Stock Chart Styles](#import-stock-chart-styles)
  - [Container Sizing](#container-sizing)
  - [Common Issues](#common-issues)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Installation

Install the Stock Chart package from npm:

```bash
npm install @syncfusion/ej2-vue-charts --save
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```
Install the required Syncfusion theme package. The following example uses the Material 3 theme:
npm install @syncfusion/ej2-material3-theme
Or using Yarn:
yarn add @syncfusion/ej2-material3-theme

npm version 5 and later automatically saves installed packages to the dependencies section of package.json. Therefore, the --save option is not required.

The current Vue Stock Chart documentation uses `@syncfusion/ej2-vue-charts` together with the Material 3 npm theme package. 【2-0ecaf8】

---

## 3. Keep Package Dependencies, but add this note

Your current dependency tree can remain, but replace the final sentence with:

```markdown
These dependencies are automatically installed with `@syncfusion/ej2-vue-charts`. You do not need to install them individually.

The Syncfusion theme package is installed separately because it provides the CSS or Sass resources required to style the component.
## Package Dependencies

The Stock Chart requires the following dependencies:

```text
@syncfusion/ej2-vue-charts
  ├── @syncfusion/ej2-charts
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-data
  ├── @syncfusion/ej2-pdf-export
  ├── @syncfusion/ej2-file-utils
  ├── @syncfusion/ej2-compression
  ├── @syncfusion/ej2-svg-base
  ├── @syncfusion/ej2-navigations
  ├── @syncfusion/ej2-calendars
  ├── @syncfusion/ej2-popups
  ├── @syncfusion/ej2-lists
  ├── @syncfusion/ej2-inputs
  ├── @syncfusion/ej2-buttons
  └── @syncfusion/ej2-splitbuttons
```

These are automatically installed when you install `@syncfusion/ej2-vue-charts`.

## Basic Setup

### Step 1 Register Components

In Vue 3 Composition API, use a complete Single File Component and import the Stock Chart component, its child directives, and the required modules together.

For a robust setup that remains stable when users switch series types, trendlines, or indicators later, use the full module set below:

```vue
<template>
  <div class="stock-chart-wrapper">
    <ejs-stockchart
      id="stockchart-step-1"
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

const chartData = [
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1750000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1600000 },
  { date: new Date('2024-01-04'), open: 108, high: 112, low: 106, close: 110, volume: 1820000 }
];

const title = 'AAPL Stock Price';

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const tooltip = {
  enable: true
};

provide('stockChart', [
  DateTime,
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
.stock-chart-wrapper {
  width: 100%;
  min-height: 420px;
}

#stockchart-step-1 {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Step 2 Add Template

Define the Stock Chart in your template, but keep it inside a full component so the example remains functional and does not fail during setup:

```vue
<template>
  <div class="stock-chart-wrapper">
    <ejs-stockchart
      id="stockchart-step-2"
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
  StochasticIndicator,
  Tooltip
} from '@syncfusion/ej2-vue-charts';

const chartData = [
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1750000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1600000 },
  { date: new Date('2024-01-04'), open: 108, high: 112, low: 106, close: 110, volume: 1820000 }
];

const title = 'AAPL Stock Price';

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const tooltip = {
  enable: true
};

provide('stockChart', [
  DateTime,
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
  StochasticIndicator,
  Tooltip
]);
</script>

<style scoped>
.stock-chart-wrapper {
  width: 100%;
  min-height: 420px;
}

#stockchart-step-2 {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

### Step 3 Provide Modules

In Vue 3 Composition API, register Stock Chart modules with `provide('stockChart', [...])` inside `<script setup>`. Keep the example complete so the module injection is shown in the same runnable component:

```vue
<template>
  <div class="stock-chart-wrapper">
    <ejs-stockchart
      id="stockchart-step-3"
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
  StochasticIndicator,
  Tooltip
} from '@syncfusion/ej2-vue-charts';

const chartData = [
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1750000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1600000 },
  { date: new Date('2024-01-04'), open: 108, high: 112, low: 106, close: 110, volume: 1820000 }
];

const title = 'AAPL Stock Price';

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const tooltip = {
  enable: true
};

const stockChartModules = [
  DateTime,
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
  StochasticIndicator,
  Tooltip
];

provide('stockChart', stockChartModules);
</script>

<style scoped>
.stock-chart-wrapper {
  width: 100%;
  min-height: 420px;
}

#stockchart-step-3 {
  width: 100%;
  height: 420px;
  display: block;
}
</style>
```

**Why this module list is recommended for a stable setup:**
- `DateTime` is required for a datetime x-axis.
- `RangeTooltip` and `Tooltip` is required for stock-chart range interactions and tooltip behavior.
- `CandleSeries` supports candlestick rendering.
- `LineSeries`, `AreaSeries`, and `SplineSeries` are important when indicators or series switching are introduced.
- `Trendlines` enables built-in trendline support.
- All indicator modules are preloaded so runtime switching does not fail later when users interact with indicator-related UI.

## Data Structure

Stock Chart data should follow the OHLC format (Open, High, Low, Close):

```javascript
const chartData = [
  {
    date: new Date('2024-01-01'),
    open: 100.5,
    high: 105.75,
    low: 98.25,
    close: 102.3,
    volume: 1500000
  },
  {
    date: new Date('2024-01-02'),
    open: 102.3,
    high: 108.5,
    low: 101.0,
    close: 106.75,
    volume: 2000000
  }
];
```

**Required properties:**
- `date` - DateTime value for the x-axis
- `open` - Opening price
- `high` - Highest price in the period
- `low` - Lowest price in the period
- `close` - Closing price

**Recommended property:**
- `volume` - Strongly recommended for stock interactions and indicator-related scenarios, especially if users may switch to volume-dependent indicators later

## Minimal Example

Create a simple, complete, runnable Vue 3 Single File Component using `<script setup>`:

```vue
<template>
  <div class="stock-chart-wrapper">
    <ejs-stockchart
      id="stockchart-container"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :title="title"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
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
          :bearFillColor="bearFillColor"
          :bullFillColor="bullFillColor"
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
  StockChartPeriodsDirective as EStockchartPeriods,
  StockChartPeriodDirective as EStockchartPeriod,
  DateTime,
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
  StochasticIndicator,
  Tooltip,
  StockLegend
} from '@syncfusion/ej2-vue-charts';

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

const title = 'AAPL Stock Price';

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 },
  crosshairTooltip: { enable: true }
};

const primaryYAxis = {
  title: 'Price',
  labelFormat: '${value}',
  majorGridLines: { width: 1 },
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const tooltip = {
  enable: true
};

const legendSettings = {
  visible: true
};

const bearFillColor = '#e74c3d';
const bullFillColor = '#2ecc71';

const stockChartModules = [
  DateTime,
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
  StochasticIndicator,
  Tooltip,
  StockLegend
];

provide('stockChart', stockChartModules);
</script>

<style scoped>
.stock-chart-wrapper {
  width: 100%;
  min-height: 500px;
}

#stockchart-container {
  width: 100%;
  height: 500px;
  display: block;
}
</style>
```

This creates a complete stock chart with:
- a valid Vue 3 Composition API structure
- a full `provide('stockChart', [...])` setup
- correct OHLC field mapping
- `volume` included for future indicator compatibility
- a real container height so the component renders correctly
- a working `periodSelectorSettings` configuration that is actually bound to the component

## CSS and Theming

### Install Theme Package

Syncfusion Vue components support CSS and Sass styles through dedicated npm theme packages. This example uses the Material 3 theme.

Install the Material 3 theme package:

```bash
npm install @syncfusion/ej2-material3-theme
```

Or using Yarn:

```bash
yarn add @syncfusion/ej2-material3-theme
```

### Import Stock Chart Styles

Import the Stock Chart stylesheet from the Material 3 theme package.

You can add the stylesheet to the global `<style>` section of `src/App.vue`:

```vue
<style>
@import '@syncfusion/ej2-material3-theme/styles/stock-chart/index.css';
</style>
```

Alternatively, import the stylesheet in the application entry file, such as `src/main.js` or `src/main.ts`:

```javascript
import { createApp } from 'vue';
import App from './App.vue';

import '@syncfusion/ej2-material3-theme/styles/stock-chart/index.css';

createApp(App).mount('#app');
```

The component-specific `stock-chart/index.css` file automatically loads the dependent component styles required by the Stock Chart. Therefore, you do not need to import CSS separately from packages such as:

- `@syncfusion/ej2-base`
- `@syncfusion/ej2-buttons`
- `@syncfusion/ej2-calendars`
- `@syncfusion/ej2-inputs`
- `@syncfusion/ej2-lists`
- `@syncfusion/ej2-navigations`
- `@syncfusion/ej2-popups`
- `@syncfusion/ej2-splitbuttons`

> Import only one Syncfusion theme for the application. Avoid mixing Material, Material 3, Bootstrap, Fluent, Tailwind, or other theme styles in the same application.

### Container Sizing

The Stock Chart adapts to the size of its container. Define an explicit height on the component or its wrapper to ensure that it renders correctly.

```vue
<template>
  <div class="stock-chart-container">
    <ejs-stockchart
      id="stockchart"
      height="500px"
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
  StochasticIndicator,
  Tooltip
} from '@syncfusion/ej2-vue-charts';

const chartData = [
  {
    date: new Date('2024-01-01'),
    open: 100,
    high: 105,
    low: 98,
    close: 102,
    volume: 1500000
  },
  {
    date: new Date('2024-01-02'),
    open: 102,
    high: 108,
    low: 101,
    close: 106,
    volume: 1750000
  },
  {
    date: new Date('2024-01-03'),
    open: 106,
    high: 110,
    low: 104,
    close: 108,
    volume: 1600000
  },
  {
    date: new Date('2024-01-04'),
    open: 108,
    high: 112,
    low: 106,
    close: 110,
    volume: 1820000
  }
];

const title = 'AAPL Stock Price';

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const tooltip = {
  enable: true
};

provide('stockChart', [
  DateTime,
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
  StochasticIndicator,
  Tooltip
]);
</script>

<style>
@import '@syncfusion/ej2-material3-theme/styles/stock-chart/index.css';

.stock-chart-container {
  width: 100%;
  min-height: 500px;
}

#stockchart {
  width: 100%;
  height: 500px;
  display: block;
}
</style>
```

> Keep the theme import in a global, unscoped `<style>` block. Component layout rules can be placed in either a scoped or unscoped style block.

### Common Issues

**Stock Chart renders without the expected appearance**

- Ensure `@syncfusion/ej2-material3-theme` is installed.
- Ensure the Stock Chart theme stylesheet is imported.
- Restart the Vite development server after installing the theme package.
- Verify that the import path uses `stock-chart/index.css`.

**Conflicting or inconsistent styles**

- Remove the older individual component-package CSS imports.
- Do not combine styles from multiple Syncfusion themes.
- Ensure only one theme-package stylesheet is loaded for the Stock Chart.

**Stock Chart is not visible**

- Ensure the component or its parent container has an explicit height.
- Ensure `provide('stockChart', [...])` is called inside `<script setup>`.
- Ensure the required series and axis modules are imported and provided.

**No x-axis labels**

- Set `valueType: 'DateTime'` on `primaryXAxis`.
- Ensure the mapped date values are valid JavaScript `Date` objects.

**Series is not visible**

- Ensure `dataSource` contains valid data.
- Verify that `xName`, `open`, `high`, `low`, `close`, and `volume` match the data-object properties.
- Ensure the corresponding series module, such as `CandleSeries`, is imported and provided.

### Import Stylesheet

Add the Syncfusion theme CSS to your main application file such as `main.js`.

For Stock Chart, it is safer to include the related theme files needed by the chart surface and stock-chart UI elements:

```javascript
import { createApp } from 'vue';
import App from './App.vue';

import '@syncfusion/ej2-material3-theme/styles/stock-chart/index.css';

createApp(App).mount('#app');
```

If you prefer another theme, replace `material.css` with the matching theme file name across all imports.

**Common theme families:**
- Material
- Bootstrap5
- Fabric
- Tailwind
- Highcontrast

### Container Sizing

Stock Chart adapts to the size of its parent container. Always define a height on the chart element or its wrapper, and keep the snippet complete so it remains runnable:

```vue
<template>
  <div class="stock-chart-container">
    <ejs-stockchart
      id="stockchart"
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
  StochasticIndicator,
  Tooltip
} from '@syncfusion/ej2-vue-charts';

const chartData = [
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 1750000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1600000 },
  { date: new Date('2024-01-04'), open: 108, high: 112, low: 106, close: 110, volume: 1820000 }
];

const title = 'AAPL Stock Price';

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  labelFormat: '${value}',
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const tooltip = {
  enable: true
};

provide('stockChart', [
  DateTime,
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
  StochasticIndicator,
  Tooltip
]);
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  min-height: 500px;
}

#stockchart {
  width: 100%;
  height: 500px;
  display: block;
}
</style>
```

### Common Issues

**Chart not rendering**
- Ensure all required theme CSS files are imported.
- Ensure the chart container has an explicit height.
- Ensure `provide('stockChart', [...])` is called inside `<script setup>`.
- Ensure the imported module names exactly match the names used in the module array.

**No x-axis labels**
- Set `valueType: 'DateTime'` on `primaryXAxis`.
- Ensure `date` values are real `Date` objects.

**Series not visible**
- Ensure `dataSource` is not empty.
- Ensure `xName`, `open`, `high`, `low`, `close`, and `volume` exactly match your data object keys.
- Ensure the series `type` is set to a valid financial series such as `"Candle"`.

**`AreaSeries is not defined`**
- Import `AreaSeries` from `@syncfusion/ej2-vue-charts`.
- Add `AreaSeries` to the same module array passed to `provide('stockChart', [...])`.
- Do not reference any module in `provide` unless it is actually imported in the file.

**`Module "StockLegend" is not available in StockChart component`**
- Do not inject or reference `StockLegend` as a Stock Chart module.
- Use `legendSettings` on the component configuration instead of trying to provide a non-existent `StockLegend` module.

**`Cannot read properties of null (reading 'initializeChart')` while switching indicators**
- This typically happens when the Stock Chart tries to initialize indicator-related internals but the required indicator and supporting series modules are not fully injected.
- Use the full module list shown in the examples above when users may switch indicators dynamically.
- Keep a valid primary financial series with correct OHLC mapping and include `volume` in the data if you want to support volume-based indicators later.
- Avoid incomplete placeholder templates while testing interactive stock behaviors.

## Combined Mistakes and Future References

- The partial snippet that had `<template>` and `<style>` without a matching `<script setup>` was not safe. A Vue Stock Chart example must always be provided as a complete Single File Component when it is shown as `App.vue`.
- The partial snippet that had `<script setup>` without enough template context was also not ideal for client-facing guidance. A runnable visual component should include `<template>`, `<script setup>`, and `<style>` together.
- The original setup imported `Tooltip`, but that module was not required for the Stock Chart example shown. Using `RangeTooltip` is the correct stock-chart-specific module for the scenario documented here.
- The original example declared a period-selector configuration but did not bind it to the component. In the corrected example, `periodSelectorSettings` is explicitly assigned to `:periodSelectorSettings`.
- The original `provide` example was too minimal for a runtime where users can switch indicators or related stock-series behaviors. A minimal three-module setup is not sufficient for dynamic indicator scenarios.
- The runtime error `AreaSeries is not defined` happens when a module is referenced in the `provide` array but is missing from the import list.
- The warning about `StockLegend` indicates a non-existent or invalid Stock Chart module name was used. Legend display should be controlled through `legendSettings`, not through a `StockLegend` injection.
- The `initializeChart` null errors strongly indicate an incomplete Stock Chart module setup for indicator interactions. This is why the full import-and-provide list is important when indicator switching may occur.
- Placeholder-only samples with comments such as `<!-- series -->` are not safe for debugging stock-specific interactions. Use complete, runnable examples with real data, a real container height, and correct field mappings.
- For future Stock Chart indicator-related samples, keep the import and provide list aligned with this stable module set: `LineSeries`, `AreaSeries`, `SplineSeries`, `CandleSeries`, `HiloOpenCloseSeries`, `HiloSeries`, `RangeAreaSeries`, `Trendlines`, `EmaIndicator`, `RsiIndicator`, `BollingerBands`, `TmaIndicator`, `MomentumIndicator`, `SmaIndicator`, `AtrIndicator`, `AccumulationDistributionIndicator`, `MacdIndicator`, and `StochasticIndicator`, along with `DateTime` and `RangeTooltip`.\
- The older CSS setup imported styles separately from `@syncfusion/ej2-base`, `@syncfusion/ej2-buttons`, `@syncfusion/ej2-calendars`, `@syncfusion/ej2-inputs`, `@syncfusion/ej2-lists`, `@syncfusion/ej2-navigations`, `@syncfusion/ej2-popups`, and `@syncfusion/ej2-splitbuttons`. The new theme-package architecture replaces those imports with a single component-specific stylesheet.
- Install `@syncfusion/ej2-material3-theme` separately and import `@syncfusion/ej2-material3-theme/styles/stock-chart/index.css`.
- The Stock Chart `index.css` file automatically includes the required dependent styles. Do not retain the older individual package imports together with the new theme import.
- Keep the theme stylesheet global. Do not place the `@import` rule only inside a scoped style block.
- Avoid loading multiple Syncfusion themes in the same application because competing theme rules can result in inconsistent component appearance.