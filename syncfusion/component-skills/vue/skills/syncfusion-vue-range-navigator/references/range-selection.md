# Range Selection in Range Navigator

## Table of Contents

- [Overview](#overview)
- [Selecting Ranges Programmatically](#selecting-ranges-programmatically)
  - [Setting Initial Range](#setting-initial-range)
  - [Updating Range Dynamically](#updating-range-dynamically)
  - [Range Properties](#range-properties)
- [Range Change Events](#range-change-events)
  - [Listening to Range Changes](#listening-to-range-changes)
  - [Range Change Event Arguments](#range-change-event-arguments)
  - [Event Timing](#event-timing)
- [Data Binding Patterns](#data-binding-patterns)
  - [Two-Way Binding with Explicit Value + Changed Event](#two-way-binding-with-explicit-value--changed-event)
  - [Binding to Chart](#binding-to-chart)
  - [Binding to DataGrid](#binding-to-datagrid)
- [Range Reset and Updates](#range-reset-and-updates)
  - [Resetting Range to Default](#resetting-range-to-default)
  - [Extending Range](#extending-range)
  - [Shifting Range](#shifting-range)
- [User Interaction](#user-interaction)
  - [Dragging Behavior](#dragging-behavior)
  - [Preventing Selection](#preventing-selection)
  - [Performance Tips for Large Ranges](#performance-tips-for-large-ranges)
- [Notes on Corrections Applied](#notes-on-corrections-applied)


## Overview

Range selection is the core interaction model of the Syncfusion Vue Range Navigator. According to the official documentation, a range can be selected by dragging the thumbs, tapping the labels, and by setting the start and end through the `value` property. 

- **Dragging** the range thumbs updates the selected window. 
- **Clicking** period selector buttons updates the selected range when `periodSelectorSettings` is configured and the `PeriodSelector` module is injected. 
- **Programmatically** setting the `value` property is the supported way to initialize or update the selected range from Vue state. 

## Selecting Ranges Programmatically

### Setting Initial Range

Set the initial range by binding a two-item `value` array to the Range Navigator. For a DateTime axis, use valid JavaScript `Date` objects and inject the required `DateTime` and `AreaSeries` modules. Since this example renders a series, the `dataSource` belongs on `<e-rangenavigator-series>`, not on the root `<ejs-rangenavigator>`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

// Set range to first 3 months of data
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 2, 31)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 120 },
  { date: new Date(2023, 2, 1), value: 135 },
  { date: new Date(2023, 3, 1), value: 128 },
  { date: new Date(2023, 4, 1), value: 142 }
]);

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Updating Range Dynamically

To update the selected range from custom UI actions, assign a new array to the reactive `rangeValue`. This keeps the component state aligned with Vue state, which is the same mechanism documented for range selection through the `value` property. 

```vue
<template>
  <div class="container">
    <button @click="goToToday">Go to Today</button>
    <button @click="goToLastMonth">Last Month</button>
    <button @click="goToLastYear">Last Year</button>

    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const data = ref([
  { date: new Date(2022, 0, 1), value: 90 },
  { date: new Date(2022, 6, 1), value: 110 },
  { date: new Date(2023, 0, 1), value: 130 },
  { date: new Date(2023, 6, 1), value: 150 },
  { date: new Date(), value: 170 }
]);

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 11, 31)
]);

const goToToday = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  rangeValue.value = [thirtyDaysAgo, today];
};

const goToLastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  rangeValue.value = [lastMonth, today];
};

const goToLastYear = () => {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);
  rangeValue.value = [lastYear, today];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Range Properties

The Range Navigator selection value is a two-item array representing the start and end of the selected window. The official selecting-range documentation explicitly shows range selection through the `value` property, and the component API defines `labelFormat`, `valueType`, and related axis settings for this DateTime scenario. 

```javascript
rangeValue = [
  new Date(2023, 0, 1),   // index[0] = Start date
  new Date(2023, 11, 31)  // index[1] = End date
]
```

**Requirements:**
- The start value should be less than or equal to the end value so that the selected window is valid. 
- For `valueType: 'DateTime'`, use valid JavaScript `Date` objects. 
- Keep the selected range within the data extent to ensure the navigator renders a meaningful selection. 

## Range Change Events

### Listening to Range Changes

The correct event to handle range updates is the **`changed`** event. Syncfusion exposes `start`, `end`, `selectedData`, `selectedPeriod`, `zoomFactor`, and `zoomPosition` in the `IChangedEventArgs` interface for this event. 

```vue
<template>
  <div class="container">
    <p>
      Selected:
      {{ formatDate(rangeValue[0]) }} to {{ formatDate(rangeValue[1]) }}
    </p>

    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      @changed="onRangeChange"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 2, 1), value: 118 },
  { date: new Date(2023, 3, 1), value: 123 },
  { date: new Date(2023, 4, 1), value: 131 },
  { date: new Date(2023, 5, 1), value: 140 }
]);

const onRangeChange = (args) => {
  console.log('Range changed!');
  console.log('Start:', args.start);
  console.log('End:', args.end);

  fetchDataForRange(args.start, args.end);
  rangeValue.value = [args.start, args.end];
};

const fetchDataForRange = (start, end) => {
  console.log(`Fetching data from ${start} to ${end}`);
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US');
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Range Change Event Arguments

The `changed` event arguments expose the following commonly used members. These names come directly from the Syncfusion `IChangedEventArgs` API. 

| Property | Type | Description |
|---|---|---|
| `start` | `Date \| number` | Selected start value.  |
| `end` | `Date \| number` | Selected end value.  |
| `name` | `string` | Event name.  |
| `selectedData` | `DataPoint[]` | Data points within the selected range.  |
| `selectedPeriod` | `string` | Selected period text when period selector is used.  |
| `zoomFactor` | `number` | Current zoom factor of the selected window.  |
| `zoomPosition` | `number` | Current zoom position of the selected window.  |

### Event Timing

The official docs confirm that user selection can happen by dragging thumbs, tapping labels, and by using the `value` property, while the `changed` event API describes the payload raised when the selected range changes. For application code, handle **user-driven changes** in `@changed`, and for **programmatic updates** assign a new `rangeValue` directly in Vue state. 

- The `changed` handler is the correct place to react to user-driven updates such as dragging the thumbs. 
- If period selector buttons are enabled, the event args also expose `selectedPeriod`. 
- When you update the range programmatically, set `rangeValue.value = [start, end]` directly instead of relying on a separate implicit event cycle. 

## Data Binding Patterns

### Two-Way Binding with Explicit Value + Changed Event

The safest Vue 3 pattern for Range Navigator is explicit one-way value binding with a `changed` handler that writes the selected values back to your reactive state. This aligns with the official selecting-range guidance and the documented `changed` event args. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    @changed="onRangeChange"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const data = ref([
  { date: new Date(2023, 0, 1), value: 95 },
  { date: new Date(2023, 1, 1), value: 110 },
  { date: new Date(2023, 2, 1), value: 125 },
  { date: new Date(2023, 3, 1), value: 118 }
]);

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 1)
]);

const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Binding to Chart

Syncfusion positions the Range Navigator as a component that integrates well with charts for dashboard-style filtering. In this pattern, the navigator shows the full dataset, while a computed property filters the main chart based on the selected range. 

```vue
<template>
  <div class="dashboard">
    <!-- Range Navigator - shows mini view of full data -->
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      @changed="onRangeChange"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="allChartData"
          xName="date"
          yName="value"
          type="Area"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>

    <!-- Chart - shows filtered data based on range -->
    <ejs-chart :primaryXAxis="primaryXAxis">
      <e-series-collection>
        <e-series
          :dataSource="filteredChartData"
          xName="date"
          yName="value"
          type="Line"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 1, 28)
]);

const allChartData = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 110 },
  { date: new Date(2023, 1, 1), value: 105 },
  { date: new Date(2023, 1, 15), value: 120 },
  { date: new Date(2023, 2, 1), value: 130 },
  { date: new Date(2023, 2, 15), value: 125 }
]);

const filteredChartData = computed(() => {
  const [start, end] = rangeValue.value;
  return allChartData.value.filter(
    (item) => item.date >= start && item.date <= end
  );
});

const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};

const primaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'MMM-yy'
};

provide('rangeNavigator', [DateTime, AreaSeries, LineSeries]);
</script>
```

### Binding to DataGrid

Syncfusion also documents Range Navigator as a filtering control that can integrate with DataGrid and other visual components. The common Vue 3 pattern is to compute filtered grid rows from the current selected range. 

```vue
<template>
  <div class="app">
    <!-- Range Navigator -->
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      @changed="onRangeChange"
      :height="'100px'"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="allGridData"
          xName="createdDate"
          yName="amount"
          type="Area"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>

    <!-- DataGrid - shows filtered records -->
    <ejs-grid :dataSource="filteredGridData">
      <e-columns>
        <e-column field="id" headerText="ID" width="80"></e-column>
        <e-column field="createdDate" headerText="Date" type="date" width="120"></e-column>
        <e-column field="amount" headerText="Amount" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';
import {
  GridComponent as EjsGrid,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn
} from '@syncfusion/ej2-vue-grids';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const allGridData = ref([
  { id: 1, createdDate: new Date(2023, 0, 5), amount: 500 },
  { id: 2, createdDate: new Date(2023, 0, 10), amount: 750 },
  { id: 3, createdDate: new Date(2023, 1, 18), amount: 620 },
  { id: 4, createdDate: new Date(2023, 2, 22), amount: 910 },
  { id: 5, createdDate: new Date(2023, 4, 2), amount: 480 }
]);

const filteredGridData = computed(() => {
  const [start, end] = rangeValue.value;
  return allGridData.value.filter(
    (item) => item.createdDate >= start && item.createdDate <= end
  );
});

const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

## Range Reset and Updates

### Resetting Range to Default

Resetting the navigator is simply a matter of assigning the original two-value range back to the same reactive `value` binding. This follows the same documented selection mechanism used for initial values and later updates. 

```vue
<template>
  <div>
    <button @click="resetRange">Reset Range</button>

    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const defaultRange = [
  new Date(2023, 0, 1),
  new Date(2023, 11, 31)
];

const rangeValue = ref([...defaultRange]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 80 },
  { date: new Date(2023, 3, 1), value: 100 },
  { date: new Date(2023, 6, 1), value: 120 },
  { date: new Date(2023, 9, 1), value: 140 },
  { date: new Date(2023, 11, 1), value: 160 }
]);

const resetRange = () => {
  rangeValue.value = [...defaultRange];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Extending Range

You can extend the currently selected range by creating new `Date` instances from the existing `value` array and then reassigning the updated range. This remains fully compatible with the documented `value`-driven selection model. 

```vue
<template>
  <div>
    <button @click="extendRange(30)">Extend Range by 30 Days</button>

    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([
  new Date(2023, 2, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 108 },
  { date: new Date(2023, 2, 1), value: 119 },
  { date: new Date(2023, 3, 1), value: 125 },
  { date: new Date(2023, 4, 1), value: 132 },
  { date: new Date(2023, 5, 1), value: 141 }
]);

const extendRange = (days) => {
  const currentStart = rangeValue.value[0];
  const currentEnd = rangeValue.value[1];

  const newStart = new Date(currentStart);
  newStart.setDate(newStart.getDate() - Math.floor(days / 2));

  const newEnd = new Date(currentEnd);
  newEnd.setDate(newEnd.getDate() + Math.ceil(days / 2));

  rangeValue.value = [newStart, newEnd];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Shifting Range

Shifting the window forward or backward works by offsetting both dates by the same number of days and then assigning the result back to the reactive `value`. 

```vue
<template>
  <div>
    <button @click="shiftRange(-7)">Previous 7 Days</button>
    <button @click="shiftRange(7)">Next 7 Days</button>

    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([
  new Date(2023, 2, 1),
  new Date(2023, 2, 31)
]);

const data = ref([
  { date: new Date(2023, 1, 1), value: 88 },
  { date: new Date(2023, 1, 15), value: 92 },
  { date: new Date(2023, 2, 1), value: 96 },
  { date: new Date(2023, 2, 15), value: 102 },
  { date: new Date(2023, 2, 31), value: 99 },
  { date: new Date(2023, 3, 15), value: 107 }
]);

const shiftRange = (days) => {
  const start = new Date(rangeValue.value[0]);
  const end = new Date(rangeValue.value[1]);

  start.setDate(start.getDate() + days);
  end.setDate(end.getDate() + days);

  rangeValue.value = [start, end];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

## User Interaction

### Dragging Behavior

The official and feature-overview documentation describe these core interactions for the selected range. The supported behavior includes dragging the left or right thumbs, selecting from labels, and dragging the selected range itself to preserve its span. 

1. **Dragging Left Thumb** changes the start value. 
2. **Dragging Right Thumb** changes the end value. 
3. **Dragging the Selected Region** moves the range while preserving the duration. 
4. **Tapping Labels** selects a range through the axis labels. 

### Preventing Selection

There is no dedicated “disable selection but keep the component visible” pattern in the provided Range Navigator docs. However, an application-level validation approach can be implemented by checking the `changed` event and restoring the previous valid range if the new range does not meet your rules. The event args expose `start` and `end`, which makes this approach practical in Vue 3. 

```vue
<template>
  <div>
    <p>Minimum allowed range: 7 days</p>

    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      @changed="onRangeChange"
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
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const minDuration = 7 * 24 * 60 * 60 * 1000;

const lastValidRange = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 15)
]);

const rangeValue = ref([...lastValidRange.value]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 5), value: 106 },
  { date: new Date(2023, 0, 10), value: 109 },
  { date: new Date(2023, 0, 15), value: 112 },
  { date: new Date(2023, 0, 20), value: 118 }
]);

const onRangeChange = (args) => {
  const duration = new Date(args.end).getTime() - new Date(args.start).getTime();

  if (duration < minDuration) {
    rangeValue.value = [...lastValidRange.value];
    return;
  }

  lastValidRange.value = [args.start, args.end];
  rangeValue.value = [args.start, args.end];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Performance Tips for Large Ranges

For large datasets, Syncfusion provides `enableDeferredUpdate` so updates can be deferred until the interaction completes, and the component feature overview also highlights deferred scrolling as a built-in capability for smoother range updates. In Vue, it is also appropriate to use computed filtering and optional debouncing for expensive downstream operations. 

```vue
<template>
  <div>
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      :enableDeferredUpdate="true"
      @changed="onRangeChange"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="allData"
          xName="date"
          yName="value"
          type="Area"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>

    <pre>{{ filteredData }}</pre>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const allData = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 110 },
  { date: new Date(2023, 1, 1), value: 115 },
  { date: new Date(2023, 1, 15), value: 120 },
  { date: new Date(2023, 2, 1), value: 130 },
  { date: new Date(2023, 2, 15), value: 125 },
  { date: new Date(2023, 3, 1), value: 135 }
]);

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 2, 15)
]);

const filteredData = computed(() => {
  const [start, end] = rangeValue.value;
  return allData.value.filter((item) => item.date >= start && item.date <= end);
});

const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

## Notes on Corrections Applied

- The event name was corrected from `@change` to `@changed` because the Syncfusion Range Navigator event args are documented under **changed events**. 
- All Vue code snippets were expanded into complete Vue 3 Composition API SFC examples with proper Syncfusion imports and `provide('rangeNavigator', [...])` module injection. This follows the official Vue 3 getting-started guidance and the module-based examples in the Range Navigator docs. 
- Every example that includes a series binds `dataSource` on `<e-rangenavigator-series>`, which matches the Range Navigator series API and the official docs. 
- No tooltip `labelFormat` or `format` keys were introduced inside `tooltip` objects, in accordance with your requested validation rule. Axis-level `labelFormat` was preserved because it is a valid Range Navigator property. 
