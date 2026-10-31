# Axis Configuration & Customization

## Table of Contents
- [DateTime Axis (X-Axis)](#datetime-axis-x-axis)
  - [Basic DateTime Setup](#basic-datetime-setup)
  - [DateTime Properties](#datetime-properties)
  - [Common Interval Types](#common-interval-types)
- [DateTimeCategory axis](#datetimecategory-axis)
- [Numeric Y-Axis](#numeric-y-axis)
  - [Basic Y-Axis Setup](#basic-y-axis-setup)
  - [Y-Axis Properties](#y-axis-properties)
  - [Label Formatting](#label-formatting)
- [Logarithmic Axis](#logarithmic-axis)
- [Multiple Axes](#multiple-axes)
  - [Setup with Two Y-Axes](#setup-with-two-y-axes)
  - [Multiple Y-Axes Configuration](#multiple-y-axes-configuration)
  - [Referencing Custom Axes in Series](#referencing-custom-axes-in-series)
- [Axis Crossing](#axis-crossing)
- [Inversed Axis](#inversed-axis)
- [Grid Customization](#grid-customization)
  - [Grid Configuration](#grid-configuration)
  - [Alternate Rows (Background Stripes)](#alternate-rows-background-stripes)
- [Axis Label Formatting](#axis-label-formatting)
  - [Date Format Patterns](#date-format-patterns)
- [Axis Ranges & Scrolling](#axis-ranges--scrolling)
  - [Set Fixed Axis Range](#set-fixed-axis-range)
  - [Enable Zooming & Panning](#enable-zooming--panning)
- [Advanced Axis Configuration Example](#advanced-axis-configuration-example)
- [Common Axis Issues](#common-axis-issues)

## DateTime Axis (X-Axis)

Stock charts commonly use DateTime axis for time-based data, and can also use DateTimeCategory when you want to skip non-business days. The DateTime axis handles dates, time intervals, and automatic labeling.

### Basic DateTime Setup

```vue
<template>
  <ejs-stockchart 
    id="stockchart"
    :primaryXAxis="primaryXAxis"
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
      />
    </e-stockchart-series-collection>
  </ejs-stockchart>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  CandleSeries
} from '@syncfusion/ej2-vue-charts'

const chartData = []

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' }
}

provide('stockChart', [DateTime, CandleSeries])
</script>
```

### DateTime Properties

```javascript
const primaryXAxis = {
  valueType: 'DateTime',           // Required: Type must be DateTime
  intervalType: 'Days',            // Days, Months, Years, Hours, Minutes, Seconds
  interval: 1,                     // Number of intervals
  labelFormat: 'MMM d',            // Date format (e.g., "Jan 1")
  majorGridLines: { color: 'transparent' },
  minorGridLines: { width: 0 },
  edgeLabelPlacement: 'Shift',     // Shift, None, Hide
  title: 'Date'
}
```

### Common Interval Types

```javascript
// Daily data
const dailyXAxis = {
  intervalType: 'Days',
  interval: 1
}

// Weekly data (every 7 days)
const weeklyXAxis = {
  intervalType: 'Days',
  interval: 7
}

// Monthly data
const monthlyXAxis = {
  intervalType: 'Months',
  interval: 1
}

// Quarterly data (every 3 months)
const quarterlyXAxis = {
  intervalType: 'Months',
  interval: 3
}

// Yearly data
const yearlyXAxis = {
  intervalType: 'Years',
  interval: 1
}
```

## DateTimeCategory axis

DateTimeCategory axis in the stock chart is used to display only business days. To use DateTimeCategory axis, set the valueType of axis to `DateTimeCategory`.

```vue
<template>
  <div class="control-section">
    <div>
      <ejs-stockchart id="stockchartcontainer" :primaryXAxis="primaryXAxis" :crosshair="crosshair" :tooltip="tooltip">
        <e-stockchart-series-collection>
          <e-stockchart-series :dataSource="seriesData" type="Line" xName='x' yName='y'></e-stockchart-series>
        </e-stockchart-series-collection>
      </ejs-stockchart>
    </div>
  </div>
</template>
<script setup>
import { provide } from "vue";

import {
  StockChartComponent as EjsStockchart, StockChartSeriesCollectionDirective as EStockchartSeriesCollection, StockChartSeriesDirective as EStockchartSeries, DateTimeCategory, CandleSeries, RangeTooltip, LineSeries, SplineSeries, Tooltip, Crosshair,
  HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
} from "@syncfusion/ej2-vue-charts";

let datetimeCategoryData = [
  { x: new Date(2021, 1, 11) }, { x: new Date(2021, 1, 12) }, { x: new Date(2021, 1, 13) }, { x: new Date(2021, 1, 14) }, { x: new Date(2021, 1, 15) },
  { x: new Date(2021, 1, 19) }, { x: new Date(2021, 1, 20) }, { x: new Date(2021, 1, 21) }, { x: new Date(2021, 1, 22) }, { x: new Date(2021, 3, 1) },
  { x: new Date(2021, 3, 2) }, { x: new Date(2021, 4, 1) }, { x: new Date(2021, 4, 5) }, { x: new Date(2021, 4, 6) }, { x: new Date(2021, 4, 7) },
  { x: new Date(2021, 4, 11) }, { x: new Date(2021, 4, 13) }, { x: new Date(2021, 4, 15) }, { x: new Date(2021, 4, 16) }, { x: new Date(2021, 4, 17) },
  { x: new Date(2021, 4, 18) }, { x: new Date(2021, 4, 20) }, { x: new Date(2021, 4, 21) }, { x: new Date(2021, 4, 23) }, { x: new Date(2021, 4, 25) },
  { x: new Date(2021, 5, 1) }, { x: new Date(2021, 5, 2) }, { x: new Date(2021, 5, 6) }, { x: new Date(2021, 5, 7) }, { x: new Date(2021, 5, 8) },
  { x: new Date(2021, 5, 11) }, { x: new Date(2021, 5, 15) }, { x: new Date(2021, 5, 18) }, { x: new Date(2021, 5, 20) }, { x: new Date(2021, 5, 25) },
  { x: new Date(2021, 6, 1) }, { x: new Date(2021, 6, 2) }, { x: new Date(2021, 6, 3) }, { x: new Date(2021, 6, 4) }, { x: new Date(2021, 6, 5) },
  { x: new Date(2021, 6, 10) }, { x: new Date(2021, 6, 11) }, { x: new Date(2021, 6, 12) }, { x: new Date(2021, 6, 13) }, { x: new Date(2021, 6, 15) },
  { x: new Date(2021, 6, 16) }, { x: new Date(2021, 6, 17) }, { x: new Date(2021, 6, 18) }, { x: new Date(2021, 6, 19) }, { x: new Date(2021, 6, 20) }
];

let series1 = [];
let point1;
for (var j = 1; j < 46; j++) {
  point1 = {
    x: datetimeCategoryData[j].x,
    y: getRandomInRange(120, 130),
    high: getRandomInRange(88, 92),
    low: getRandomInRange(76, 86),
    open: getRandomInRange(75, 85),
    close: getRandomInRange(85, 90),
    volume: getRandomInRange(660187068, 965935749),
  };
  series1.push(point1);
}

function getRandomInRange(min, max) {
  const randomDecimal = Math.random();
  const randomValue = randomDecimal * (max - min) + min;
  return randomValue;
}

const seriesData = series1;
const primaryXAxis = {
  valueType: "DateTimeCategory",
  majorGridLines: { width: 0 },
  crosshairTooltip: { enable: true }
};
const crosshair = {
  enable: true
};
const tooltip = { enable: true, header: 'AAPL Stock Price' };

provide('stockChart', [
  DateTimeCategory, RangeTooltip, LineSeries, SplineSeries, CandleSeries, Tooltip, Crosshair, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator,
  BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
]);

</script>
<style>
#container {
  height: 350px;
}
</style>
```

## Numeric Y-Axis

The Y-axis displays numeric values (prices). Configure for optimal price visualization.

### Basic Y-Axis Setup

```vue
<template>
  <ejs-stockchart 
    id="stockchart"
    :primaryYAxis="primaryYAxis"
  >
    <!-- series -->
  </ejs-stockchart>
</template>

<script setup>
import { StockChartComponent as EjsStockchart } from '@syncfusion/ej2-vue-charts'

const primaryYAxis = {
  title: 'Price (USD)',
  labelFormat: '${value}',      // Dollar format
  majorTickLines: { color: 'transparent', width: 0 },
  lineStyle: { color: 'transparent' }
}
</script>
```

### Y-Axis Properties

```javascript
const primaryYAxis = {
  title: 'Price',                   // Y-axis label
  labelFormat: '${value}',          // Format (currency, percentage)
  minimum: 90,                      // Minimum value
  maximum: 120,                     // Maximum value
  interval: 5,                      // Interval between labels
  majorTickLines: { width: 0 },     // Hide tick marks
  minorTickLines: { width: 0 },
  lineStyle: { color: 'transparent' },
  labelPosition: 'Inside'           // Inside, Outside
}
```

### Label Formatting

```javascript
// Currency
const currencyLabelFormat = '${value}'             // $100, $105
const currencyDecimalLabelFormat = '${value}.00'   // $100.00, $105.50

// Percentage
const percentageLabelFormat = '{value}%'           // 100%, 105%
```

## Logarithmic Axis

Logarithmic axis uses logarithmic scale and it is very useful in visualizing data, when it has numerical values in both lower order of magnitude (eg: 10-6) and higher order of magnitude (eg: 106). To use Logarithmic axis, set the `valueType` of axis to Logarithmic.

```vue
<script setup>
import { provide } from 'vue'
import {
  DateTime,
  Logarithmic,
  CandleSeries
} from '@syncfusion/ej2-vue-charts'

const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' }
}

const primaryYAxis = {
  valueType: 'Logarithmic',
  majorTickLines: { width: 0 }
}

provide('stockChart', [DateTime, Logarithmic, CandleSeries])
</script>
```

## Multiple Axes

Use multiple Y-axes when displaying different scales (e.g., price + volume).

### Setup with Two Y-Axes

```vue
<template>
  <ejs-stockchart 
    id="stockchart"
    :primaryXAxis="primaryXAxis"
    :primaryYAxis="primaryYAxis"
    :axes="axes"
  >
    <e-stockchart-series-collection>
      <!-- Price series on primary axis -->
      <e-stockchart-series 
        :dataSource="chartData" 
        type="Candle" 
        xName="date" 
        open="open" 
        high="high" 
        low="low" 
        close="close"
      />

      <!-- Volume series on secondary axis -->
      <e-stockchart-series 
        :dataSource="chartData" 
        type="Column" 
        xName="date" 
        yName="volume"
        yAxisName="VolumeAxis"
      />
    </e-stockchart-series-collection>
  </ejs-stockchart>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  CandleSeries,
  ColumnSeries
} from '@syncfusion/ej2-vue-charts'

const chartData = []

const primaryXAxis = {
  valueType: 'DateTime'
}

const primaryYAxis = {
  title: 'Price (USD)',
  labelFormat: '${value}'
}

const axes = [
  {
    name: 'VolumeAxis',
    opposedPosition: true,      // Position on right side
    title: 'Volume (M)',
    labelFormat: '{value}M',
    majorTickLines: { width: 0 }
  }
]

provide('stockChart', [DateTime, CandleSeries, ColumnSeries])
</script>
```

### Multiple Y-Axes Configuration

```javascript
const axes = [
  {
    name: 'Axis1',
    opposedPosition: true,           // Right side
    title: 'Volume',
    rowIndex: 1,                     // Row position for stacked layout
    majorGridLines: { color: 'transparent' }
  },
  {
    name: 'Axis2',
    opposedPosition: false,          // Left side
    title: 'Indicator',
    minimum: 0,
    maximum: 100
  }
]
```

### Referencing Custom Axes in Series

```vue
<e-stockchart-series 
  :dataSource="chartData" 
  type="Column"
  xName="date"
  yName="volume"
  yAxisName="VolumeAxis"
/>
```

## Axis Crossing

An axis can be positioned in the Stock Chart area using `crossesAt` properties. The `crossesAt` property specifies the values (datetime, numeric, or logarithmic) at which the axis line has to be intersected with the vertical axis or vice-versa, and the `crossesInAxis` property specifies the axis name with which the axis line has to be crossed.

```javascript
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' },
  crossesAt: 15
}

const primaryYAxis = {
  majorTickLines: { color: 'transparent', width: 0 },
  crossesAt: 5
}
```

## Inversed Axis

When an axis is inversed, highest value of the axis comes closer to origin and vice versa. To place an axis in `inversed` manner set this property isInversed to true.

```javascript
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: { color: 'transparent' },
  isInversed: true
}

const primaryYAxis = {
  majorTickLines: { color: 'transparent', width: 0 },
  isInversed: true
}
```

## Grid Customization

Customize grid lines for better readability.

### Grid Configuration

```javascript
const primaryXAxis = {
  valueType: 'DateTime',
  majorGridLines: {
    color: 'rgba(200, 200, 200, 0.1)',
    width: 1,
    dashArray: '5,5'                // Dashed lines
  },
  minorGridLines: {
    width: 0                        // Hide minor grid
  }
}

const primaryYAxis = {
  majorGridLines: {
    color: 'rgba(200, 200, 200, 0.15)',
    width: 1
  },
  minorTicksPerInterval: 5,
  minorGridLines: {
    color: 'rgba(200, 200, 200, 0.05)',
    width: 0.5
  }
}
```

### Alternate Rows (Background Stripes)

```vue
<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  StockChartSeriesCollectionDirective as EStockchartSeriesCollection,
  StockChartSeriesDirective as EStockchartSeries,
  DateTime,
  LineSeries,
  StripLine
} from '@syncfusion/ej2-vue-charts'

const data = [
  { date: new Date(2024, 0, 1), price: 30 },
  { date: new Date(2024, 0, 10), price: 45 },
  { date: new Date(2024, 0, 20), price: 55 },
  { date: new Date(2024, 1, 1), price: 70 }
]

const primaryXAxis = {
  valueType: 'DateTime'
}

const primaryYAxis = {
  minimum: 0,
  maximum: 100,
  stripLines: [
    {
      start: 0,
      end: 50,
      color: 'rgba(255,0,0,0.25)',
    }
  ]
}

provide('stockChart', [
  DateTime,
  LineSeries,
  StripLine
])
</script>
```

## Axis Label Formatting

### Date Format Patterns

```javascript
// Common date formats
const labelFormat1 = 'MMM d'          // "Jan 1", "Feb 14"
const labelFormat2 = 'yyyy-MM-dd'     // "2024-01-01", "2024-02-14"
const labelFormat3 = 'dd/MM/yyyy'     // "01/01/2024", "14/02/2024"
const labelFormat4 = 'MM/dd/yy'       // "01/01/24", "02/14/24"
const labelFormat5 = 'MMMM'           // "January", "February"
const labelFormat6 = 'MMM yyyy'       // "Jan 2024", "Feb 2024"
```

## Axis Ranges & Scrolling

### Set Fixed Axis Range

```javascript
const primaryXAxis = {
  valueType: 'DateTime',
  minimum: new Date('2024-01-01'),
  maximum: new Date('2024-12-31')
}

const primaryYAxis = {
  minimum: 90,
  maximum: 120,
  interval: 5
}
```

### Enable Zooming & Panning

```vue
<template>
  <ejs-stockchart 
    id="stockchart"
    :zoomSettings="zoomSettings"
  >
    <!-- series -->
  </ejs-stockchart>
</template>

<script setup>
import { provide } from 'vue'
import {
  StockChartComponent as EjsStockchart,
  Zoom,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts'

const zoomSettings = {
  enableSelectionZoom: true,   // Click-drag to zoom
  enablePinchZooming: true,    // Touch pinch to zoom
  enableMouseWheelZooming: true,
  enableDeferredZoom: true,
}

provide('stockChart', [Zoom, PeriodSelector])
</script>
```

## Advanced Axis Configuration Example

Complete example with all customizations:

```vue
<template>
  <div class="control-section">
    <ejs-stockchart
      id="stockchart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :axes="axes"
      title="Candle Chart with Volume Axis"
      height="480px"
      width="100%"
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
        />
        <e-stockchart-series 
          :dataSource="chartData" 
          type="Column"
          xName="date"
          yName="volume"
          yAxisName="VolumeAxis"
          name="Volume"
          fill="rgba(100, 100, 100, 0.4)"
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
  ColumnSeries,
} from '@syncfusion/ej2-vue-charts'

const chartData = [
  { date: new Date('2024-01-01'), open: 100, high: 105, low: 98, close: 102, volume: 1500000 },
  { date: new Date('2024-01-02'), open: 102, high: 108, low: 101, close: 106, volume: 2000000 },
  { date: new Date('2024-01-03'), open: 106, high: 110, low: 104, close: 108, volume: 1800000 },
  { date: new Date('2024-01-04'), open: 108, high: 112, low: 107, close: 111, volume: 2200000 }
]

const primaryXAxis = {
  valueType: 'DateTime',
  intervalType: 'Days',
  interval: 1,
  labelFormat: 'MMM d, yy',
  majorGridLines: { color: 'rgba(200,200,200,0.1)' },
  edgeLabelPlacement: 'Shift'
}

const primaryYAxis = {
  title: 'Price (USD)',
  labelFormat: '${value}',
  minimum: 90,
  maximum: 120,
  interval: 5,
  majorTickLines: { width: 0 },
  majorGridLines: { color: 'rgba(200,200,200,0.15)' }
}

const axes = [
  {
    name: 'VolumeAxis',
    opposedPosition: true,
    title: 'Volume',
    labelFormat: '{value}',
    majorGridLines: { color: 'transparent' },
    majorTickLines: { width: 0 }
  }
]

provide('stockChart', [
  DateTime,
  CandleSeries,
  ColumnSeries,
])
</script>

<style>
.control-section {
  margin: 20px;
}
</style>
```

## Common Axis Issues

**X-axis labels missing:**
- Ensure `valueType: 'DateTime'`
- Verify data contains valid Date objects
- Check `intervalType` matches your data granularity

**Y-axis showing wrong range:**
- Use `minimum` and `maximum` properties
- Set `interval` for consistent label spacing
- Verify data min/max values

**Overlapping labels:**
- Use `edgeLabelPlacement: 'Shift'`
- Adjust `labelFormat` for shorter text
- Use `interval` to reduce label frequency