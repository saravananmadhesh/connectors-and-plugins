# Performance & Accessibility in Range Navigator

## Table of Contents

- [Lightweight Mode](#lightweight-mode)
  - [What is Lightweight Mode?](#what-is-lightweight-mode)
  - [Enable Lightweight Mode](#enable-lightweight-mode)
  - [Lightweight Configuration Properties](#lightweight-configuration-properties)
  - [Mobile-Optimized Range Navigator](#mobile-optimized-range-navigator)
- [Performance Optimization](#performance-optimization)
  - [Large Dataset Handling](#large-dataset-handling)
  - [Lazy Loading Data](#lazy-loading-data)
  - [Memory Optimization](#memory-optimization)
- [RTL Support](#rtl-support)
  - [Enable Right-to-Left](#enable-right-to-left)
  - [RTL with Arabic/Hebrew Dates](#rtl-with-arabichebrew-dates)
  - [RTL Best Practices](#rtl-best-practices)
- [Accessibility Compliance](#accessibility-compliance)
  - [WCAG 2.1 Guidelines](#wcag-21-guidelines)
  - [Color Contrast](#color-contrast)
  - [Semantic HTML and ARIA](#semantic-html-and-aria)
  - [Screen Reader Support](#screen-reader-support)
- [Best Practices](#best-practices)
  - [Accessibility Checklist](#accessibility-checklist)
  - [Performance Checklist](#performance-checklist)
  - [Combined Example: Accessible + Performant](#combined-example-accessible--performant)

## Lightweight Mode

### What is Lightweight Mode?

In Syncfusion Range Navigator, the lightweight view is shown when the series collection is not rendered. This displays the range selector without the embedded chart, which is useful for compact or mobile-oriented layouts. It is not a separate rendering engine or a special performance-only mode. navigator/index)

### Enable Lightweight Mode

```vue
<template>
  <div id="app">
    <ejs-rangenavigator
      :valueType="valueType"
      :intervalType="intervalType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      :dataSource="data"
      xName="date"
      yName="value"
      :useGroupingSeparator="false"
      :margin="{ left: 0, right: 0, top: 0, bottom: 0 }"
      :navigatorStyleSettings="navigatorStyleSettings"
      height="80px"
    />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  DateTime,
  AreaSeries
} from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries]);

const valueType = 'DateTime';
const intervalType = 'Months';
const labelFormat = 'MMM';

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 120 },
  { date: new Date(2023, 1, 1), value: 180 },
  { date: new Date(2023, 2, 1), value: 140 },
  { date: new Date(2023, 3, 1), value: 200 }
]);

const navigatorStyleSettings = {
  thumb: {
    border: { width: 0, color: 'transparent' }
  }
};
</script>

<style scoped>
#app {
  padding: 12px;
}
</style>
```

### Lightweight Configuration Properties

The following example shows a valid application-level configuration object for a lightweight Range Navigator setup. The lightweight behavior comes from omitting the series collection, while properties such as `height`, `margin`, and `useGroupingSeparator` are optional UI settings. [1](https://ej2.syncfusion.com/vue/documentation/range-navigator/lightweight)[3](https://ej2.syncfusion.com/vue/documentation/range-navigator/vue-3-getting-started)

```vue
<script setup>
import { ref } from 'vue';

const start = new Date(2023, 0, 1);
const end = new Date(2023, 3, 30);
const rangeValue = ref([start, end]);

const lightweightConfig = {
  useGroupingSeparator: false,
  height: '80px',
  margin: { left: 0, right: 0, top: 0, bottom: 0 },
  navigatorStyleSettings: {
    thumb: {
      border: { width: 0, color: 'transparent' }
    }
  }
};
</script>
```

### Mobile-Optimized Range Navigator

For mobile scenarios, you can combine a compact height with a period selector and a lightweight-friendly layout. In this example, the component includes a series for visual context; if you want the actual lightweight view, remove the `<e-rangenavigator-series-collection>` block. Period selector support requires the `PeriodSelector` module. [4](https://ej2.syncfusion.com/vue/documentation/range-navigator/period-selector)[1](https://ej2.syncfusion.com/vue/documentation/range-navigator/lightweight)

```vue
<template>
  <div class="mobile-container">
    <ejs-rangenavigator
      :valueType="'DateTime'"
      :value="rangeValue"
      height="100px"
      width="100%"
      :useGroupingSeparator="false"
      :navigatorStyleSettings="navigatorStyleSettings"
      :periodSelectorSettings="mobilePeriodSettings"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="data"
          xName="date"
          yName="value"
          type="Area"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  DateTime,
  AreaSeries,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 120 },
  { date: new Date(2023, 0, 15), value: 160 },
  { date: new Date(2023, 1, 1), value: 140 },
  { date: new Date(2023, 1, 15), value: 190 },
  { date: new Date(2023, 2, 1), value: 170 },
  { date: new Date(2023, 2, 15), value: 210 },
  { date: new Date(2023, 3, 1), value: 180 },
  { date: new Date(2023, 3, 15), value: 220 }
]);

const mobilePeriodSettings = {
  position: 'Top',
  periods: [
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' }
  ]
};

const navigatorStyleSettings = {
  thumb: {
    border: { width: 0, color: 'transparent' }
  }
};
</script>

<style scoped>
.mobile-container {
  padding: 10px;
  max-width: 100%;
  box-sizing: border-box;
}
</style>
```

## Performance Optimization

### Large Dataset Handling

For large datasets, an application-level aggregation step can reduce the number of points rendered and improve responsiveness. This helper is custom logic in your app, not a built-in Range Navigator API.

```javascript
// App-level aggregation helper (custom optimization, not a built-in Range Navigator API)
const aggregateData = (data, interval = 'day') => {
  const aggregated = {};

  data.forEach((point) => {
    const key =
      interval === 'day'
        ? point.date.toDateString()
        : point.date.toISOString().slice(0, 7);

    if (!aggregated[key]) {
      aggregated[key] = {
        date: new Date(point.date),
        count: 0,
        sum: 0
      };
    }

    aggregated[key].count += 1;
    aggregated[key].sum += point.value;
  });

  return Object.values(aggregated)
    .map((item) => ({
      date: item.date,
      value: item.sum / item.count
    }))
    .sort((a, b) => a.date - b.date);
};

// Usage
const getAllData = () => {
  const result = [];
  for (let i = 0; i < 50000; i += 1) {
    result.push({
      date: new Date(2023, 0, 1 + i),
      value: Math.round(100 + Math.sin(i / 10) * 20 + (i % 15))
    });
  }
  return result;
};

const largeData = ref(getAllData());
const aggregatedData = ref(aggregateData(largeData.value, 'day'));
```

### Lazy Loading Data

Load only the data needed for the current selection. The `changed` event can be used to react to range updates and request data for the selected window. This example uses a local async helper to keep the snippet runnable. [5](https://www.syncfusion.com/vue-components/vue-range-selector)[3](https://ej2.syncfusion.com/vue/documentation/range-navigator/vue-3-getting-started)

```vue
<template>
  <ejs-rangenavigator
    :valueType="'DateTime'"
    :value="rangeValue"
    :dataSource="visibleData"
    xName="date"
    yName="value"
    @changed="onRangeChange"
  />
</template>

<script setup>
import { ref, provide, onMounted } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  DateTime,
  AreaSeries
} from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries]);

const start = new Date(2023, 0, 1);
const end = new Date(2023, 2, 31);
const rangeValue = ref([start, end]);
const visibleData = ref([]);

const fullData = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(2023, 0, 1 + i),
  value: 100 + Math.round(Math.sin(i / 12) * 30) + (i % 7) * 3
}));

const fetchRangeData = async (startDate, endDate) => {
  return fullData.filter(
    (item) => item.date >= startDate && item.date <= endDate
  );
};

const loadDataForRange = async (startDate, endDate) => {
  visibleData.value = await fetchRangeData(startDate, endDate);
};

const onRangeChange = async (args) => {
  rangeValue.value = [args.start, args.end];
  await loadDataForRange(args.start, args.end);
};

onMounted(async () => {
  await loadDataForRange(rangeValue.value[0], rangeValue.value[1]);
});
</script>
```

### Memory Optimization

Component-level cleanup can help release large in-memory arrays when the view is destroyed.

```vue
<script setup>
import { ref, onBeforeUnmount } from 'vue';

const start = new Date(2023, 0, 1);
const end = new Date(2023, 3, 30);

const data = ref([
  { date: new Date(2023, 0, 1), value: 120 },
  { date: new Date(2023, 1, 1), value: 180 },
  { date: new Date(2023, 2, 1), value: 140 },
  { date: new Date(2023, 3, 1), value: 200 }
]);

const rangeValue = ref([start, end]);

onBeforeUnmount(() => {
  data.value = [];
  rangeValue.value = [];
});
</script>
```

## RTL Support

### Enable Right-to-Left

Range Navigator supports right-to-left rendering through the `enableRtl` property. [5](https://www.syncfusion.com/vue-components/vue-range-selector)[6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)

```vue
<template>
  <ejs-rangenavigator
    :valueType="'DateTime'"
    :value="rangeValue"
    :enableRtl="true"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  DateTime,
  AreaSeries
} from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries]);

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 120 },
  { date: new Date(2023, 1, 1), value: 180 },
  { date: new Date(2023, 2, 1), value: 140 },
  { date: new Date(2023, 3, 1), value: 200 }
]);
</script>
```

### RTL with Arabic/Hebrew Dates

When using RTL, keep `enableRtl` enabled and define localized text in the period selector. The period selector collection uses the `periods` property. Tooltip formatting can be customized with `format`, and `labelFormat` should not be placed inside tooltip settings. [4](https://ej2.syncfusion.com/vue/documentation/range-navigator/period-selector)[7](https://ej2.syncfusion.com/vue/documentation/range-navigator/tool-tip)

```vue
<template>
  <div dir="rtl">
    <ejs-rangenavigator
      :valueType="'DateTime'"
      :value="rangeValue"
      :enableRtl="true"
      :tooltip="tooltipSettings"
      :periodSelectorSettings="periodSettings"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="data"
          xName="date"
          yName="value"
          type="Area"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  DateTime,
  AreaSeries,
  PeriodSelector,
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector, RangeTooltip]);

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 120 },
  { date: new Date(2023, 1, 1), value: 180 },
  { date: new Date(2023, 2, 1), value: 140 },
  { date: new Date(2023, 3, 1), value: 200 }
]);

const tooltipSettings = {
  enable: true,
};

const periodSettings = {
  position: 'Top',
  periods: [
    { text: 'أسبوع', interval: 1, intervalType: 'Weeks' },
    { text: 'شهر', interval: 1, intervalType: 'Months' },
    { text: 'سنة', interval: 1, intervalType: 'Years' }
  ]
};
</script>
```

### RTL Best Practices

- Set `dir="rtl"` on a parent element when the page language is RTL. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)[5](https://www.syncfusion.com/vue-components/vue-range-selector)
- Enable the component-level `enableRtl` property. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)[5](https://www.syncfusion.com/vue-components/vue-range-selector)
- Ensure any surrounding custom UI, labels, and icons are mirrored consistently in your application.

```html
<!-- In index.html or the main layout -->
<div dir="rtl">
  <div id="app"></div>
</div>
```

## Accessibility Compliance

### WCAG 2.1 Guidelines

Syncfusion documents accessibility support for the Range Navigator against ADA, Section 508, and WCAG 2.2, along with screen reader, RTL, color contrast, mobile device, and keyboard navigation support. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)[8](https://ej2.syncfusion.com/vue/documentation/common/accessibility)

- **WCAG:** Supported according to the Syncfusion accessibility documentation. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)[8](https://ej2.syncfusion.com/vue/documentation/common/accessibility)
- **Section 508:** Supported according to the Syncfusion accessibility documentation. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)[8](https://ej2.syncfusion.com/vue/documentation/common/accessibility)
- **ADA:** Supported according to the Syncfusion accessibility documentation. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)[8](https://ej2.syncfusion.com/vue/documentation/common/accessibility)

### Color Contrast

Use tooltip colors with sufficient contrast. For Range Navigator tooltips, the supported background property is `fill`, and text styling is configured through `textStyle`. [7](https://ej2.syncfusion.com/vue/documentation/range-navigator/tool-tip)[6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)

```vue
<script setup>
import { ref } from 'vue';

const tooltipSettings = ref({
  enable: true,
  fill: '#FFFFFF',
  textStyle: {
    color: '#000000'
  }
});

// Avoid low-contrast colors
// ❌ Poor: Light gray on white (ratio < 4.5:1)
// ✅ Good: Black on white
</script>
```

### Semantic HTML and ARIA

The Range Navigator documentation states that the component follows WAI-ARIA patterns and uses `region` as the role and `aria-label` as an attribute. For surrounding application content, you can add additional semantic structure such as headings or helper text. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)

```html
<section aria-labelledby="range-title">
  <h2 id="range-title">Date range selection</h2>
  <p id="range-help">Use Tab to focus the Range Navigator.</p>
  <div id="app"></div>
</section>
```

### Screen Reader Support

The component documentation indicates support for screen readers and WAI-ARIA usage with `region` and `aria-label`. A practical enhancement is to expose the currently selected range in a live region outside the control. [6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)[8](https://ej2.syncfusion.com/vue/documentation/common/accessibility)

```vue
<script setup>
import { computed, ref } from 'vue';

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 30)
]);

const label = computed(
  () =>
    `Range selected from ${rangeValue.value[0].toDateString()} to ${rangeValue.value[1].toDateString()}`
);
</script>

<template>
  <div aria-live="polite">{{ label }}</div>
</template>
```

## Best Practices

### Accessibility Checklist

- [ ] `enableRtl` set appropriately for language
- [ ] Color contrast reviewed for tooltip and surrounding UI
- [ ] Tooltips enabled with a clear date `format` when needed
- [ ] Keyboard interaction tested with **Tab** and **Ctrl + P**
- [ ] Screen reader tested with tools such as NVDA or JAWS
- [ ] Component labels clear and descriptive
- [ ] Mobile touch targets sized appropriately in surrounding UI
- [ ] Focus indicators visible

### Performance Checklist

- [ ] Data aggregated when rendering very large datasets
- [ ] Use the lightweight view when you do not need the embedded series chart
- [ ] CSS minified in production
- [ ] Large datasets lazy-loaded when possible
- [ ] Memory cleaned up on component destroy
- [ ] No unnecessary re-renders
- [ ] Bundle size optimized by importing only required modules

### Combined Example: Accessible + Performant

This example combines the documented Range Navigator modules (`DateTime`, `AreaSeries`, `PeriodSelector`, and `RangeTooltip`) with application-level optimizations such as pre-aggregated data and a live accessibility label. Tooltip settings intentionally do **not** include `labelFormat` because that configuration is known to cause issues and should be removed. [4](https://ej2.syncfusion.com/vue/documentation/range-navigator/period-selector)[7](https://ej2.syncfusion.com/vue/documentation/range-navigator/tool-tip)[6](https://ej2.syncfusion.com/vue/documentation/range-navigator/accessibility)

```vue
<template>
  <section :dir="isRtl ? 'rtl' : 'ltr'" :aria-label="accessibilityLabel">
    <h3>{{ label }}</h3>
    <div aria-live="polite" class="sr-only">{{ accessibilityLabel }}</div>

    <ejs-rangenavigator
      :valueType="'DateTime'"
      :value="rangeValue"
      :enableRtl="isRtl"
      :height="isMobile ? '100px' : '150px'"
      :useGroupingSeparator="false"
      :tooltip="tooltipSettings"
      :periodSelectorSettings="periodSettings"
      @changed="onRangeChange"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="aggregatedData"
          xName="date"
          yName="value"
          type="Area"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  </section>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  DateTime,
  AreaSeries,
  PeriodSelector,
  RangeTooltip
} from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector, RangeTooltip]);

const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
const isRtl = ref(false);

const rawData = ref([
  { date: new Date(2023, 0, 1), value: 120 },
  { date: new Date(2023, 0, 2), value: 125 },
  { date: new Date(2023, 0, 3), value: 123 },
  { date: new Date(2023, 0, 4), value: 130 },
  { date: new Date(2023, 1, 1), value: 180 },
  { date: new Date(2023, 1, 2), value: 176 },
  { date: new Date(2023, 1, 3), value: 184 },
  { date: new Date(2023, 2, 1), value: 140 },
  { date: new Date(2023, 2, 2), value: 145 },
  { date: new Date(2023, 2, 3), value: 142 },
  { date: new Date(2023, 3, 1), value: 200 },
  { date: new Date(2023, 3, 2), value: 205 },
  { date: new Date(2023, 3, 3), value: 202 }
]);

const aggregateData = (data) => {
  const map = new Map();

  data.forEach((item) => {
    const key = item.date.toDateString();
    if (!map.has(key)) {
      map.set(key, {
        date: new Date(item.date),
        count: 0,
        sum: 0
      });
    }

    const current = map.get(key);
    current.count += 1;
    current.sum += item.value;
  });

  return Array.from(map.values()).map((item) => ({
    date: item.date,
    value: item.sum / item.count
  }));
};

const aggregatedData = ref(aggregateData(rawData.value));

const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 3, 3)
]);

const accessibilityLabel = computed(
  () =>
    `Range Navigator selected from ${rangeValue.value[0].toDateString()} to ${rangeValue.value[1].toDateString()}`
);

const label = computed(() => {
  const days = Math.floor(
    (rangeValue.value[1] - rangeValue.value[0]) / (1000 * 60 * 60 * 24)
  );
  return `Date Range: ${days} days`;
});

const tooltipSettings = {
  enable: true,
  format: 'dd MMM yyyy',
  fill: '#FFFFFF',
  border: { color: '#CCCCCC', width: 1 },
  textStyle: { color: '#000000', fontWeight: 'Bold' }
};

const periodSettings = {
  position: isMobile.value ? 'Top' : 'Bottom',
  periods: [
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' }
  ]
};

const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
</style>
```