# Tooltip Customization in Range Navigator

## Table of Contents

- [Overview](#overview)
- [Tooltip Setup](#tooltip-setup)
  - [Enable Tooltips](#enable-tooltips)
  - [Disable Tooltips](#disable-tooltips)
  - [Tooltip Display Modes](#tooltip-display-modes)
- [Tooltip Styling](#tooltip-styling)
  - [Background and Border](#background-and-border)
  - [Text Styling](#text-styling)
  - [Complete Styling Example](#complete-styling-example)
- [Dynamic Content](#dynamic-content)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Tooltip with Range Duration](#tooltip-with-range-duration)
  - [Conditionally Show Tooltip](#conditionally-show-tooltip)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Professional Dashboard Tooltips](#pattern-1-professional-dashboard-tooltips)
  - [Pattern 2: Financial Data Tooltips](#pattern-2-financial-data-tooltips)
  - [Pattern 3: Minimal Tooltips](#pattern-3-minimal-tooltips)
- [Troubleshooting](#troubleshooting)
  - [Issue: Tooltip Not Showing](#issue-tooltip-not-showing)
  - [Issue: Tooltip Text Color Hard to Read](#issue-tooltip-text-color-hard-to-read)
  - [Issue: Tooltip Appears Behind Other Elements](#issue-tooltip-appears-behind-other-elements)
  - [Issue: Tooltip Always Visible (`displayMode: 'Always'`)](#issue-tooltip-always-visible-displaymode-always)
- [Official Documentation References](#official-documentation-references)


## Overview

Tooltips in Range Navigator display the **selected start value** and **selected end value** for the slider thumbs, and they are part of the Range Selector slider interaction experience.

- They show the **start date/value** of the selected range. 
- They show the **end date/value** of the selected range. 
- They are shown based on the configured `displayMode`, which supports `OnDemand` and `Always`. 

Tooltips help users understand the exact values being selected on the Range Navigator without relying only on the axis labels. 

## Tooltip Setup

### Enable Tooltips

In Syncfusion Vue Range Navigator, tooltip visibility is controlled by `tooltip.enable`, and the API default is `false`, so it is best to explicitly enable it. The `RangeTooltip` module must also be injected for tooltip functionality. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 },
  { date: new Date(2023, 2, 1), value: 136 },
  { date: new Date(2023, 2, 15), value: 145 },
  { date: new Date(2023, 3, 1), value: 150 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Disable Tooltips

Set `tooltip.enable` to `false` to disable the tooltip. This follows the documented tooltip settings model for Range Navigator. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: false
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Tooltip Display Modes

The documented tooltip display modes are `OnDemand` and `Always`, and the API default is `OnDemand`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  displayMode: 'OnDemand'
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 },
  { date: new Date(2023, 2, 1), value: 136 },
  { date: new Date(2023, 2, 15), value: 145 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

| Mode | Behavior |
|---|---|
| `OnDemand` | Shows the tooltip only during slider interaction, and it is the documented default mode.  |
| `Always` | Keeps the tooltip visible continuously.  |

## Tooltip Styling

### Background and Border

For Range Navigator tooltip styling, the correct background-color property is `fill`, not `backgroundColor`. The tooltip border is configured through `border.color` and `border.width`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  fill: '#F0F0F0',
  border: {
    color: '#333333',
    width: 1
  }
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Text Styling

The tooltip text is customized through `textStyle`, and the documented font model properties include `color`, `fontFamily`, `fontStyle`, `fontWeight`, `size`, and related font options. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  textStyle: {
    color: '#000000',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: 'Regular',
    size: '12px'
  }
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Complete Styling Example

This corrected example uses the supported tooltip properties `fill`, `border`, `textStyle`, `displayMode`, and `opacity`, and injects `RangeTooltip` as required by the official Vue documentation. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  displayMode: 'Always',
  fill: '#1E88E5',
  opacity: 0.95,
  border: {
    color: '#0D47A1',
    width: 2
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Arial',
    fontWeight: 'Bold',
    size: '14px'
  }
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 2), value: 115 },
  { date: new Date(2023, 0, 15), value: 118 },
  { date: new Date(2023, 1, 1), value: 126 },
  { date: new Date(2023, 1, 15), value: 132 },
  { date: new Date(2023, 2, 1), value: 144 },
  { date: new Date(2023, 3, 1), value: 150 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

## Dynamic Content

### Custom Tooltip Template

Range Navigator tooltip settings support a `template` property, and the API documents `${value}` as the placeholder used inside the tooltip template. Because the slider tooltip is value-based, this corrected example formats the currently displayed tooltip value rather than trying to inject a custom `[start, end]` array expression into the tooltip object. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  template: '<div><b>Selected:</b> ${value}</div>'
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Tooltip with Range Duration

If you want to show the **number of days selected**, the most reliable pattern is to compute it externally from `rangeValue` and render it alongside the Range Navigator. This avoids trying to overload the tooltip object with additional formatting rules and keeps the selected-range summary reactive in Vue 3. [7](https://help.syncfusion.com/js/rangenavigator/tooltip)

```vue
<template>
  <div>
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      :tooltip="tooltipSettings"
      @changed="onRangeChanged"
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

    <p>{{ getDays() }} days selected</p>
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 },
  { date: new Date(2023, 2, 1), value: 136 },
  { date: new Date(2023, 3, 1), value: 150 }
]);

const onRangeChanged = (args) => {
  rangeValue.value = [new Date(args.start), new Date(args.end)];
};

const getDays = () => {
  const start = rangeValue.value[0];
  const end = rangeValue.value[1];
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
};

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Conditionally Show Tooltip

Because `tooltip.enable` is reactive through bound Vue state, you can switch between a tooltip-enabled object and a tooltip-disabled object based on the current selected range. [7](https://help.syncfusion.com/js/rangenavigator/tooltip)

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="shouldShowTooltip ? tooltipSettings : noTooltip"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const tooltipSettings = ref({
  enable: true
});

const noTooltip = ref({
  enable: false
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 115 },
  { date: new Date(2023, 1, 1), value: 112 },
  { date: new Date(2023, 1, 15), value: 128 },
  { date: new Date(2023, 2, 1), value: 136 },
  { date: new Date(2023, 3, 1), value: 150 }
]);

const shouldShowTooltip = computed(() => {
  const start = rangeValue.value[0];
  const end = rangeValue.value[1];
  const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  return days <= 30;
});

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

## Common Patterns

### Pattern 1: Professional Dashboard Tooltips

A professional dashboard tooltip typically uses a darker `fill`, a subtle border, and strong text contrast. These are all supported via the documented `fill`, `border`, and `textStyle` properties. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  fill: '#2C3E50',
  border: {
    color: '#34495E',
    width: 1
  },
  textStyle: {
    color: '#ECF0F1',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'Bold',
    size: '13px'
  }
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 110 },
  { date: new Date(2023, 2, 1), value: 125 },
  { date: new Date(2023, 3, 1), value: 145 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Pattern 2: Financial Data Tooltips

For financial-style dashboards, a stronger border and high-contrast colors work well. If you need richer business context, combine the tooltip with an external range summary or a supported `template`. 

```vue
<template>
  <div>
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      :tooltip="tooltipSettings"
      @changed="onRangeChanged"
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

    <p class="financial-summary">
      Range: {{ formatDate(rangeValue[0]) }} → {{ formatDate(rangeValue[1]) }}
    </p>
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const tooltipSettings = ref({
  enable: true,
  fill: '#1A5F7A',
  border: {
    color: '#0D47A1',
    width: 2
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Arial',
    fontWeight: 'Bold',
    size: '12px'
  }
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 105 },
  { date: new Date(2023, 2, 1), value: 111 },
  { date: new Date(2023, 3, 1), value: 120 }
]);

const onRangeChanged = (args) => {
  rangeValue.value = [new Date(args.start), new Date(args.end)];
};

const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Pattern 3: Minimal Tooltips

A minimal style typically uses a light `fill`, a thin border, and muted text colors. All of these are supported in the Range Tooltip settings model. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  fill: '#F5F5F5',
  border: {
    color: '#CCCCCC',
    width: 1
  },
  textStyle: {
    color: '#666666',
    fontFamily: 'Segoe UI',
    fontWeight: 'Regular',
    size: '11px'
  }
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 115 },
  { date: new Date(2023, 2, 1), value: 130 },
  { date: new Date(2023, 3, 1), value: 145 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

## Troubleshooting

### Issue: Tooltip Not Showing

**Problem:** The tooltip does not appear during slider interaction. 

**Solution:** Ensure `tooltip.enable` is `true` and that `RangeTooltip` is injected. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 115 },
  { date: new Date(2023, 2, 1), value: 130 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Issue: Tooltip Text Color Hard to Read

**Problem:** Tooltip text does not have enough contrast against the background. 

**Solution:** Use a high-contrast combination of `fill` and `textStyle.color`. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  fill: '#FFFFFF',
  textStyle: {
    color: '#000000'
  }
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 115 },
  { date: new Date(2023, 2, 1), value: 130 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

### Issue: Tooltip Appears Behind Other Elements

**Problem:** The tooltip seems visually clipped by layout containers. 

**Solution:** Keep the Range Navigator in a layout that does not visually clip its overlay area, and verify that parent containers do not introduce restrictive overflow styles. The tooltip itself is handled by Syncfusion, but container CSS can still affect the visible result. 

```vue
<template>
  <div class="range-wrapper">
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 115 },
  { date: new Date(2023, 2, 1), value: 130 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>

<style scoped>
.range-wrapper {
  padding: 12px;
  overflow: visible;
}
</style>
```

### Issue: Tooltip Always Visible (`displayMode: 'Always'`)

**Problem:** The always-visible tooltip overlaps the navigator more than desired. 

**Solution:** Use `displayMode: 'OnDemand'` when you want the tooltip to appear only during slider interaction. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :tooltip="tooltipSettings"
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
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';

const tooltipSettings = ref({
  enable: true,
  displayMode: 'OnDemand'
});

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 115 },
  { date: new Date(2023, 2, 1), value: 130 }
]);

provide('rangeNavigator', [DateTime, AreaSeries, RangeTooltip]);
</script>
```

## Official Documentation References

- Vue Range Navigator Tooltip Documentation: https://ej2.syncfusion.com/vue/documentation/range-navigator/tool-tip 
- RangeTooltipSettings API: https://ej2.syncfusion.com/vue/documentation/api/range-navigator/rangetooltipsettings/index/ 
- RangeTooltipSettingsModel API: https://ej2.syncfusion.com/vue/documentation/api/range-navigator/rangetooltipsettingsmodel 
- FontModel API: https://ej2.syncfusion.com/vue/documentation/api/range-navigator/fontmodel 
- Range Navigator Component API: https://ej2.syncfusion.com/vue/documentation/api/range-navigator/index-default 