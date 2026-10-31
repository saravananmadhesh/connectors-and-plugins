# Period Selector in Range Navigator

## Table of Contents

- [Overview](#overview)
  - [When to Use](#when-to-use)
- [Built-in Periods](#built-in-periods)
  - [Basic Period Selector](#basic-period-selector)
  - [Available Built-in Periods](#available-built-in-periods)
  - [Complete Built-in Periods Example](#complete-built-in-periods-example)
- [Custom Periods](#custom-periods)
  - [Custom Period Configuration](#custom-period-configuration)
  - [Period Interval Types](#period-interval-types)
  - [Financial Period Example](#financial-period-example)
- [Positioning Period Selector](#positioning-period-selector)
  - [Position Property](#position-property)
  - [Position Options](#position-options)
  - [Example: Top Positioning](#example-top-positioning)
- [Height Configuration](#height-configuration)
  - [Range Navigator Height](#range-navigator-height)
  - [Period Selector Height](#period-selector-height)
  - [Height Optimization Example](#height-optimization-example)
- [Visibility Control](#visibility-control)
  - [Hide Period Selector](#hide-period-selector)
  - [Conditional Visibility](#conditional-visibility)
  - [Hide Range Navigator Itself](#hide-range-navigator-itself)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Dashboard with Period Quick-Selection](#pattern-1-dashboard-with-period-quick-selection)
  - [Pattern 2: Mobile-Optimized Period Selector](#pattern-2-mobile-optimized-period-selector)
  - [Pattern 3: Financial Data Period Selector](#pattern-3-financial-data-period-selector)
  - [Troubleshooting](#troubleshooting)

## Overview

The **Period Selector** in the Syncfusion Vue Range Navigator allows users to select predefined time ranges such as 1M, 3M, 6M, 1Y, and All without manually dragging the navigator thumbs. It is configured through the `periodSelectorSettings` property, and the `PeriodSelector` module must be injected in Vue 3 for the feature to render correctly. 

### When to Use

- Enable the period selector when users need **quick date range filtering** over time-series data. 
- Provide preset buttons for frequently used time windows such as Months, Weeks, Days, and Years. 
- Simplify the UX for analytics and dashboard applications by reducing manual dragging. 
- Maintain consistent date range selections across charts, grids, and other dependent controls. 

## Built-in Periods

Range Navigator provides predefined period buttons through the `periodSelectorSettings.periods` array. Each item supports `text`, `interval`, `intervalType`, and optional `selected`. The correct property name is **`periods`**, not `intervals`. 

### Basic Period Selector

Enable the period selector with a charted Range Navigator. Since a series is present, the `dataSource` must be bound on `<e-rangenavigator-series>`, not on the root `<ejs-rangenavigator>`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="periodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const periodSettings = ref({
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '6M', interval: 6, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years', selected: true },
    { text: 'All' }
  ],
  position: 'Bottom'
});

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 12 },
  { date: new Date(2023, 1, 1), value: 18 },
  { date: new Date(2023, 2, 1), value: 15 },
  { date: new Date(2023, 3, 1), value: 22 },
  { date: new Date(2023, 4, 1), value: 26 },
  { date: new Date(2023, 5, 1), value: 24 },
  { date: new Date(2023, 6, 1), value: 30 },
  { date: new Date(2023, 7, 1), value: 28 },
  { date: new Date(2023, 8, 1), value: 34 },
  { date: new Date(2023, 9, 1), value: 32 },
  { date: new Date(2023, 10, 1), value: 38 },
  { date: new Date(2023, 11, 1), value: 41 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Available Built-in Periods

The period selector supports time-based interval types including Auto, Years, Quarter, Months, Weeks, Days, Hours, Minutes, and Seconds. The following are common examples you can configure in Vue 3. For the **All** button, Syncfusion examples show using only the `text` field. 

| Period | Text | intervalType | interval | Use Case |
|---|---|---|---|---|
| 1 Day | 1D | Days | 1 | Intraday or recent daily analysis.  |
| 1 Week | 1W | Weeks | 1 | Short-term trend inspection.  |
| 1 Month | 1M | Months | 1 | Monthly reporting and comparisons.  |
| 3 Months | 3M | Months | 3 | Quarterly-style review windows.  |
| 6 Months | 6M | Months | 6 | Semi-annual view.  |
| 1 Year | 1Y | Years | 1 | Annual analysis.  |
| All Data | All | N/A | N/A | Complete dataset selection.  |

### Complete Built-in Periods Example

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="periodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  periods: [
    { text: '1D', interval: 1, intervalType: 'Days' },
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '6M', interval: 6, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years', selected: true },
    { text: 'All' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 9 },
  { date: new Date(2023, 1, 1), value: 14 },
  { date: new Date(2023, 2, 1), value: 11 },
  { date: new Date(2023, 3, 1), value: 20 },
  { date: new Date(2023, 4, 1), value: 27 },
  { date: new Date(2023, 5, 1), value: 23 },
  { date: new Date(2023, 6, 1), value: 31 },
  { date: new Date(2023, 7, 1), value: 29 },
  { date: new Date(2023, 8, 1), value: 35 },
  { date: new Date(2023, 9, 1), value: 33 },
  { date: new Date(2023, 10, 1), value: 37 },
  { date: new Date(2023, 11, 1), value: 40 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

## Custom Periods

You can create custom period buttons by defining your own labels and mapping them to supported `interval` and `intervalType` combinations. The Range Navigator period selector supports the time interval units documented by Syncfusion; the label text itself is fully customizable. 

### Custom Period Configuration

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="periodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'dd-MMM';

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  periods: [
    { text: 'This Week', interval: 1, intervalType: 'Weeks' },
    { text: 'This Month', interval: 1, intervalType: 'Months' },
    { text: 'This Quarter', interval: 1, intervalType: 'Quarter' },
    { text: 'This Year', interval: 1, intervalType: 'Years' },
    { text: 'Last 7 Days', interval: 7, intervalType: 'Days' },
    { text: 'Last 30 Days', interval: 30, intervalType: 'Days' },
    { text: 'Last 90 Days', interval: 90, intervalType: 'Days' }
  ],
  position: 'Top'
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 110 },
  { date: new Date(2023, 1, 1), value: 122 },
  { date: new Date(2023, 2, 1), value: 118 },
  { date: new Date(2023, 3, 1), value: 135 },
  { date: new Date(2023, 4, 1), value: 142 },
  { date: new Date(2023, 5, 1), value: 150 },
  { date: new Date(2023, 6, 1), value: 149 },
  { date: new Date(2023, 7, 1), value: 162 },
  { date: new Date(2023, 8, 1), value: 170 },
  { date: new Date(2023, 9, 1), value: 166 },
  { date: new Date(2023, 10, 1), value: 174 },
  { date: new Date(2023, 11, 1), value: 182 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Period Interval Types

The officially documented `intervalType` values are: `Auto`, `Years`, `Quarter`, `Months`, `Weeks`, `Days`, `Hours`, `Minutes`, and `Seconds`. 

```javascript
intervalType: 'Auto'       // Automatic interval selection
intervalType: 'Years'      // Annual periods
intervalType: 'Quarter'    // Quarterly periods
intervalType: 'Months'     // Monthly periods
intervalType: 'Weeks'      // Weekly periods
intervalType: 'Days'       // Daily periods
intervalType: 'Hours'      // Hourly periods
intervalType: 'Minutes'    // Minute-level periods
intervalType: 'Seconds'    // Second-level periods
```

### Financial Period Example

The following example keeps your financial labels, but maps them to supported period-selector settings. For exact fiscal logic such as true calendar Q1/Q2 or YTD semantics, use labels that match your business meaning and combine them with appropriate intervals. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="financialPeriods"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="close"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const financialPeriods = ref({
  periods: [
    { text: 'Week', interval: 1, intervalType: 'Weeks' },
    { text: 'Month', interval: 1, intervalType: 'Months' },
    { text: 'Quarter', interval: 1, intervalType: 'Quarter' },
    { text: 'HY1', interval: 6, intervalType: 'Months' },
    { text: 'Year', interval: 1, intervalType: 'Years' },
    { text: 'All' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), close: 210 },
  { date: new Date(2023, 1, 1), close: 218 },
  { date: new Date(2023, 2, 1), close: 214 },
  { date: new Date(2023, 3, 1), close: 229 },
  { date: new Date(2023, 4, 1), close: 237 },
  { date: new Date(2023, 5, 1), close: 244 },
  { date: new Date(2023, 6, 1), close: 241 },
  { date: new Date(2023, 7, 1), close: 256 },
  { date: new Date(2023, 8, 1), close: 263 },
  { date: new Date(2023, 9, 1), close: 258 },
  { date: new Date(2023, 10, 1), close: 271 },
  { date: new Date(2023, 11, 1), close: 279 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

## Positioning Period Selector

The period selector can be positioned at the **Top** or **Bottom** of the Range Navigator using `periodSelectorSettings.position`. Syncfusion documents `Bottom` as the default position. 

### Position Property

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="periodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  position: 'Top',
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '6M', interval: 6, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 8 },
  { date: new Date(2023, 1, 1), value: 12 },
  { date: new Date(2023, 2, 1), value: 10 },
  { date: new Date(2023, 3, 1), value: 15 },
  { date: new Date(2023, 4, 1), value: 18 },
  { date: new Date(2023, 5, 1), value: 17 },
  { date: new Date(2023, 6, 1), value: 21 },
  { date: new Date(2023, 7, 1), value: 20 },
  { date: new Date(2023, 8, 1), value: 24 },
  { date: new Date(2023, 9, 1), value: 22 },
  { date: new Date(2023, 10, 1), value: 27 },
  { date: new Date(2023, 11, 1), value: 29 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Position Options

| Position | Location | Use Case |
|---|---|---|
| Top | Above the Range Navigator | Useful when you want the quick-range buttons to be more prominent.  |
| Bottom | Below the Range Navigator (default) | Traditional layout and the documented default position.  |

### Example: Top Positioning

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="periodSettings"
    :height="'120px'"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  position: 'Top',
  periods: [
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 45 },
  { date: new Date(2023, 1, 1), value: 52 },
  { date: new Date(2023, 2, 1), value: 47 },
  { date: new Date(2023, 3, 1), value: 59 },
  { date: new Date(2023, 4, 1), value: 61 },
  { date: new Date(2023, 5, 1), value: 58 },
  { date: new Date(2023, 6, 1), value: 66 },
  { date: new Date(2023, 7, 1), value: 64 },
  { date: new Date(2023, 8, 1), value: 72 },
  { date: new Date(2023, 9, 1), value: 69 },
  { date: new Date(2023, 10, 1), value: 77 },
  { date: new Date(2023, 11, 1), value: 81 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

## Height Configuration

You can control the overall Range Navigator height with the root `height` property, and you can control the period selector’s own height with `periodSelectorSettings.height`. Syncfusion documents the period selector height property and notes the default value is 43. 

### Range Navigator Height

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :height="'120px'"
    :periodSelectorSettings="periodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 20 },
  { date: new Date(2023, 1, 1), value: 24 },
  { date: new Date(2023, 2, 1), value: 22 },
  { date: new Date(2023, 3, 1), value: 29 },
  { date: new Date(2023, 4, 1), value: 31 },
  { date: new Date(2023, 5, 1), value: 28 },
  { date: new Date(2023, 6, 1), value: 36 },
  { date: new Date(2023, 7, 1), value: 35 },
  { date: new Date(2023, 8, 1), value: 40 },
  { date: new Date(2023, 9, 1), value: 38 },
  { date: new Date(2023, 10, 1), value: 43 },
  { date: new Date(2023, 11, 1), value: 47 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Period Selector Height

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="periodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  height: 50,
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 52 },
  { date: new Date(2023, 1, 1), value: 57 },
  { date: new Date(2023, 2, 1), value: 54 },
  { date: new Date(2023, 3, 1), value: 63 },
  { date: new Date(2023, 4, 1), value: 68 },
  { date: new Date(2023, 5, 1), value: 65 },
  { date: new Date(2023, 6, 1), value: 74 },
  { date: new Date(2023, 7, 1), value: 72 },
  { date: new Date(2023, 8, 1), value: 79 },
  { date: new Date(2023, 9, 1), value: 76 },
  { date: new Date(2023, 10, 1), value: 84 },
  { date: new Date(2023, 11, 1), value: 89 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Height Optimization Example

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :height="'150px'"
    :periodSelectorSettings="periodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  height: 45,
  position: 'Top',
  periods: [
    { text: '1D', interval: 1, intervalType: 'Days' },
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 102 },
  { date: new Date(2023, 1, 1), value: 109 },
  { date: new Date(2023, 2, 1), value: 106 },
  { date: new Date(2023, 3, 1), value: 118 },
  { date: new Date(2023, 4, 1), value: 123 },
  { date: new Date(2023, 5, 1), value: 120 },
  { date: new Date(2023, 6, 1), value: 131 },
  { date: new Date(2023, 7, 1), value: 129 },
  { date: new Date(2023, 8, 1), value: 137 },
  { date: new Date(2023, 9, 1), value: 134 },
  { date: new Date(2023, 10, 1), value: 142 },
  { date: new Date(2023, 11, 1), value: 147 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

## Visibility Control

You can conditionally render the period selector or the Range Navigator based on application state. When you need a selector-only experience without the charted navigator UI, Syncfusion provides `disableRangeSelector`. Also, when there is **no series**, bind the `dataSource` on the root `ejs-rangenavigator` in lightweight mode. 

### Hide Period Selector

Instead of assigning `intervals: null`, conditionally bind `periodSelectorSettings` to `null` when you want to hide the period selector. The correct settings property name is `periods`, and the selector feature is enabled by the presence of a valid `periodSelectorSettings` object. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="showPeriodSelector ? periodSettings : null"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const showPeriodSelector = ref(false);
const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 18 },
  { date: new Date(2023, 1, 1), value: 21 },
  { date: new Date(2023, 2, 1), value: 19 },
  { date: new Date(2023, 3, 1), value: 27 },
  { date: new Date(2023, 4, 1), value: 31 },
  { date: new Date(2023, 5, 1), value: 29 },
  { date: new Date(2023, 6, 1), value: 36 },
  { date: new Date(2023, 7, 1), value: 34 },
  { date: new Date(2023, 8, 1), value: 41 },
  { date: new Date(2023, 9, 1), value: 39 },
  { date: new Date(2023, 10, 1), value: 45 },
  { date: new Date(2023, 11, 1), value: 48 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Conditional Visibility

Show the period selector only for larger datasets. This keeps the original intent intact while correcting the property name from `intervals` to `periods`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="hasLargeDataset ? periodSettings : null"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const data = ref([
  { date: new Date(2023, 0, 1), value: 10 },
  { date: new Date(2023, 0, 8), value: 12 },
  { date: new Date(2023, 0, 15), value: 14 },
  { date: new Date(2023, 0, 22), value: 13 },
  { date: new Date(2023, 1, 1), value: 16 },
  { date: new Date(2023, 1, 8), value: 18 },
  { date: new Date(2023, 1, 15), value: 17 },
  { date: new Date(2023, 1, 22), value: 21 },
  { date: new Date(2023, 2, 1), value: 20 },
  { date: new Date(2023, 2, 8), value: 23 },
  { date: new Date(2023, 2, 15), value: 22 },
  { date: new Date(2023, 2, 22), value: 25 },
  { date: new Date(2023, 3, 1), value: 24 },
  { date: new Date(2023, 3, 8), value: 27 },
  { date: new Date(2023, 3, 15), value: 29 },
  { date: new Date(2023, 3, 22), value: 28 },
  { date: new Date(2023, 4, 1), value: 31 },
  { date: new Date(2023, 4, 8), value: 33 },
  { date: new Date(2023, 4, 15), value: 35 },
  { date: new Date(2023, 4, 22), value: 34 },
  { date: new Date(2023, 5, 1), value: 37 },
  { date: new Date(2023, 5, 8), value: 39 },
  { date: new Date(2023, 5, 15), value: 38 },
  { date: new Date(2023, 5, 22), value: 41 },
  { date: new Date(2023, 6, 1), value: 43 },
  { date: new Date(2023, 6, 8), value: 45 },
  { date: new Date(2023, 6, 15), value: 44 },
  { date: new Date(2023, 6, 22), value: 46 },
  { date: new Date(2023, 7, 1), value: 49 },
  { date: new Date(2023, 7, 8), value: 51 },
  { date: new Date(2023, 7, 15), value: 50 },
  { date: new Date(2023, 7, 22), value: 54 }
]);

const hasLargeDataset = computed(() => data.value.length > 30);
const rangeValue = ref([data.value[0].date, data.value[data.value.length - 1].date]);

const periodSettings = ref({
  periods: [
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Hide Range Navigator Itself

The most reliable Vue 3 pattern is to conditionally render the component with `v-if`. If you want to display only the period selector and not the range selector UI, use `disableRangeSelector` instead of trying to hide the whole component with a `visible` prop. 

```vue
<template>
  <div>
    <button @click="showRangeNavigator = !showRangeNavigator">
      Toggle Range Navigator
    </button>

    <ejs-rangenavigator
      v-if="showRangeNavigator"
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      :periodSelectorSettings="periodSettings"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="data"
          xName="date"
          yName="value"
          type="Area"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const showRangeNavigator = ref(true);
const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 15 },
  { date: new Date(2023, 1, 1), value: 19 },
  { date: new Date(2023, 2, 1), value: 17 },
  { date: new Date(2023, 3, 1), value: 25 },
  { date: new Date(2023, 4, 1), value: 28 },
  { date: new Date(2023, 5, 1), value: 26 },
  { date: new Date(2023, 6, 1), value: 33 },
  { date: new Date(2023, 7, 1), value: 31 },
  { date: new Date(2023, 8, 1), value: 37 },
  { date: new Date(2023, 9, 1), value: 35 },
  { date: new Date(2023, 10, 1), value: 42 },
  { date: new Date(2023, 11, 1), value: 46 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

## Common Patterns

### Pattern 1: Dashboard with Period Quick-Selection

This is a common pattern where the Range Navigator drives a main chart. The selected range can also be initialized through the `value` property, which Syncfusion documents as one of the supported range selection methods. 

```vue
<template>
  <div class="dashboard">
    <h2>Sales Dashboard</h2>

    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      :periodSelectorSettings="periodSettings"
      :height="'100px'"
      @changed="onRangeChange"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="miniChartData"
          xName="date"
          yName="value"
          type="Area"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>

    <ejs-chart :primaryXAxis="primaryXAxis">
      <e-series-collection>
        <e-series
          :dataSource="filteredChartData"
          type="Line"
          xName="date"
          yName="value"
          name="Sales"
          :width="2"
        />
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  ChartComponent as EjsChart,
  SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries,
  AreaSeries,
  LineSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const miniChartData = ref([
  { date: new Date(2023, 0, 1), value: 120 },
  { date: new Date(2023, 1, 1), value: 128 },
  { date: new Date(2023, 2, 1), value: 125 },
  { date: new Date(2023, 3, 1), value: 139 },
  { date: new Date(2023, 4, 1), value: 145 },
  { date: new Date(2023, 5, 1), value: 141 },
  { date: new Date(2023, 6, 1), value: 152 },
  { date: new Date(2023, 7, 1), value: 149 },
  { date: new Date(2023, 8, 1), value: 161 },
  { date: new Date(2023, 9, 1), value: 158 },
  { date: new Date(2023, 10, 1), value: 169 },
  { date: new Date(2023, 11, 1), value: 176 }
]);

const allChartData = ref([...miniChartData.value]);

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 3, 30)]);

const periodSettings = ref({
  position: 'Top',
  periods: [
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
});

const primaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'MMM-yy'
};

const filteredChartData = computed(() => {
  const [start, end] = rangeValue.value;
  return allChartData.value.filter((item) => item.date >= start && item.date <= end);
});

const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};

provide('rangeNavigator', [DateTime, AreaSeries, LineSeries, PeriodSelector]);
</script>
```

### Pattern 2: Mobile-Optimized Period Selector

A smaller period selector with fewer buttons is a practical mobile-friendly pattern. The key documented settings remain `position`, `height`, and `periods`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="mobilePeriodSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const mobilePeriodSettings = ref({
  position: 'Top',
  height: 40,
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' },
    { text: 'All' }
  ]
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 75 },
  { date: new Date(2023, 1, 1), value: 79 },
  { date: new Date(2023, 2, 1), value: 77 },
  { date: new Date(2023, 3, 1), value: 84 },
  { date: new Date(2023, 4, 1), value: 88 },
  { date: new Date(2023, 5, 1), value: 85 },
  { date: new Date(2023, 6, 1), value: 93 },
  { date: new Date(2023, 7, 1), value: 91 },
  { date: new Date(2023, 8, 1), value: 98 },
  { date: new Date(2023, 9, 1), value: 96 },
  { date: new Date(2023, 10, 1), value: 103 },
  { date: new Date(2023, 11, 1), value: 108 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Pattern 3: Financial Data Period Selector

This pattern uses business-friendly labels while staying within the documented period selector structure. The buttons still rely on `text`, `interval`, and `intervalType`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="financialSettings"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const financialSettings = ref({
  periods: [
    { text: 'MTD', interval: 1, intervalType: 'Months' },
    { text: 'QTD', interval: 1, intervalType: 'Quarter' },
    { text: 'YTD', interval: 1, intervalType: 'Years' },
    { text: '1Y', interval: 1, intervalType: 'Years' },
    { text: '3Y', interval: 3, intervalType: 'Years' },
    { text: '5Y', interval: 5, intervalType: 'Years' }
  ]
});

const data = ref([
  { date: new Date(2019, 0, 1), value: 85 },
  { date: new Date(2020, 0, 1), value: 92 },
  { date: new Date(2021, 0, 1), value: 104 },
  { date: new Date(2022, 0, 1), value: 99 },
  { date: new Date(2023, 0, 1), value: 117 },
  { date: new Date(2024, 0, 1), value: 126 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Troubleshooting

**Issue:** Period buttons not appearing. The most common causes are using the wrong property name (`intervals` instead of `periods`), omitting the `PeriodSelector` injection, or passing an invalid `periodSelectorSettings` object. 

- Ensure `periodSelectorSettings` contains a valid `periods` array. 
- Ensure `PeriodSelector` is injected through `provide('rangeNavigator', [..., PeriodSelector])`. 
- If you render a series, bind `dataSource` on `<e-rangenavigator-series>`. If there is no series, use root-level `dataSource` in lightweight mode. 

**Issue:** Custom periods not working. The period selector only supports the documented interval types and expects numeric interval values for time-based buttons. 

- Verify `intervalType` uses supported values such as `Days`, `Weeks`, `Months`, `Quarter`, or `Years`. 
- Ensure `interval` is a positive number for all buttons except an `All`-style button that may be configured with only `text`. 
- Keep label text descriptive, but remember the actual behavior is defined by `interval` and `intervalType`. 

**Issue:** Period clicks not updating the selected range. The selected range can also be driven from the Range Navigator `value` property, and user interaction should update the reactive range state that the rest of the UI depends on. 

- Verify the component is bound to a reactive `ref()` range such as `[startDate, endDate]`. 
- If another control depends on the selection, update that control from the Range Navigator change event so the UI remains synchronized. 
