# Legend, Tooltip, and Crosshair

## Table of Contents
- [Legend Basics](#legend-basics)
  - [Enable/Disable Legend](#enabledisable-legend)
  - [Legend for Single Series](#legend-for-single-series)
  - [Legend for Multiple Series](#legend-for-multiple-series)
- [Legend Positioning and Styling](#legend-positioning-and-styling)
  - [Positioning](#positioning)
  - [Alignment Options](#alignment-options)
  - [Example: Top-Right Legend](#example-top-right-legend)
  - [Style the Legend](#style-the-legend)
  - [Legend Dimensions](#legend-dimensions)
- [Legend Interactions](#legend-interactions)
  - [Toggle Series Visibility](#toggle-series-visibility)
  - [Disable Toggle Interaction](#disable-toggle-interaction)
  - [Handle Legend Click Events](#handle-legend-click-events)
- [Tooltip Configuration](#tooltip-configuration)
  - [Enable/Disable Tooltip](#enabledisable-tooltip)
  - [Shared Tooltip (Multiple Series)](#shared-tooltip-multiple-series)
  - [Tooltip Format](#tooltip-format)
  - [Example: Custom Format](#example-custom-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Tooltip Templates](#tooltip-templates)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Tooltip with Images or Icons](#tooltip-with-images-or-icons)
- [Crosshair and Trackball](#crosshair-and-trackball)
  - [Crosshair](#crosshair)
  - [Trackball](#trackball)
  - [Combined with Tooltip](#combined-with-tooltip)
- [Customization](#customization)
  - [Tooltip Styling](#tooltip-styling)
  - [Legend Padding and Margins](#legend-padding-and-margins)
  - [Crosshair Styling](#crosshair-styling)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Top-Right Legend with Custom Styling](#pattern-1-top-right-legend-with-custom-styling)
  - [Pattern 2: Shared Tooltip for Multiple Series](#pattern-2-shared-tooltip-for-multiple-series)
  - [Pattern 3: Vertical Crosshair with Trackball](#pattern-3-vertical-crosshair-with-trackball)
  - [Pattern 4: Custom Tooltip Format for Currency](#pattern-4-custom-tooltip-format-for-currency)
- [Next Steps](#next-steps)
  - [Configure data labels](#configure-data-labels)
  - [Add interactivity](#add-interactivity)
  - [Customize appearance](#customize-appearance)

---

## Legend Basics

The **legend** identifies each series in the chart, helping users distinguish between datasets. By default, the legend appears at the bottom of the chart.

### Enable/Disable Legend

```vue
<template>
  <ejs-chart :legendSettings="legendSettings">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const legendSettings = {
  visible: true  // Show legend (default)
};
</script>
```

### Legend for Single Series

```vue
<e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Monthly Sales">
</e-series>
```

The `name` property appears in the legend.

### Legend for Multiple Series

```vue
<e-series-collection>
  <e-series :dataSource="data" type="Column" xName="month" yName="east" name="East Region">
  </e-series>
  <e-series :dataSource="data" type="Column" xName="month" yName="west" name="West Region">
  </e-series>
  <e-series :dataSource="data" type="Column" xName="month" yName="north" name="North Region">
  </e-series>
</e-series-collection>
```

---

## Legend Positioning and Styling

### Positioning

```vue
const legendSettings = {
  position: 'Top',      // 'Top', 'Bottom', 'Left', 'Right'
  alignment: 'Center',  // 'Near', 'Center', 'Far'
};
```

**Position Options:**
- `Top` - Above chart
- `Bottom` - Below chart (default)
- `Left` - Left side
- `Right` - Right side
- `Auto` - Places the legend based on area type
- `Custom` - Places the legend based on given x and y

**Alignment Options:**
- `Near` - Top/left corner (depends on position)
- `Center` - Center (default)
- `Far` - Bottom/right corner

### Example: Top-Right Legend

```vue
<template>
  <ejs-chart :legendSettings="legendSettings">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const legendSettings = {
  position: 'Top',
  alignment: 'Far',
};
</script>
```

### Style the Legend

```vue
const legendSettings = {
  background: 'rgb(240, 240, 240)',
  border: {
    color: '#ccc',
    width: 1,
  },
  textStyle: {
    fontFamily: 'Arial',
    size: '14',
    fontWeight: 'bold',
    color: '#333',
  },
  padding: 10,
  margin: { left: 5, top: 5, bottom: 5, right: 5 }
};
```

### Legend Dimensions

```vue
const legendSettings = {
  width: '200px',
  height: '100px',
  enablePages: true
};
```

---

## Legend Interactions

### Toggle Series Visibility

By default, clicking a legend item hides/shows that series:

```vue
<template>
  <ejs-chart :legendSettings="legendSettings">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="east" name="East">
      </e-series>
      <e-series :dataSource="data" type="Column" xName="month" yName="west" name="West">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const legendSettings = {
  visible: true,
  toggleVisibility: true
};
// Users can click "East" or "West" in legend to toggle visibility
// No additional code needed - built-in behavior
</script>
```

### Disable Toggle Interaction

```vue
const legendSettings = {
  visible: true,
  toggleVisibility: false,  // Disable click-to-toggle
};
```

### Handle Legend Click Events

```vue
<template>
  <ejs-chart :legendClick="onLegendClick">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const onLegendClick = function (args) {
  console.log("Legend item:", args.legendText);
  console.log("Series index:", args.series.index);
};
</script>
```

---

## Tooltip Configuration

**Tooltip** shows data values when hovering over data points. Enabled by default.

### Enable/Disable Tooltip

```vue
<template>
  <ejs-chart :tooltip="tooltipSettings">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const tooltipSettings = {
  enable: true,    // Show tooltip
  shared: false    // Show one tooltip at a time
};
</script>
```

### Shared Tooltip (Multiple Series)

```vue
const tooltipSettings = {
  enable: true,
  shared: true     // Show all series values in one tooltip
};
```

**Result:** Hovering shows values for ALL series at that X position

### Tooltip Format

```vue
const tooltipSettings = {
  enable: true,
  format: '<b>${point.x}</b><br>Sales: <b>${point.y}</b>'
};
```

**Placeholder Variables:**
- `${point.x}` - X-axis value
- `${point.y}` - Y-axis value
- `${series.name}` - Series name
- `${point.tooltip}` - Custom tooltip from data

### Example: Custom Format

```vue
<template>
  <ejs-chart :tooltip="tooltipSettings">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const tooltipSettings = {
  enable: true,
  format: '<b>${series.name}</b><br>Date: ${point.x}<br>Value: ${point.y}K',
  header: ''
};
</script>
```
### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to customize how point and series values are displayed without using events.

A format specifier can be applied to a tooltip token by adding a colon (`:`) followed by the required format.

For example:

```vue
const tooltipSettings = {
  enable: true,
  format:
    '${series.name}<br>' +
    '${point.x:MMM yyyy} : ${point.y:n2}<br>' +
    'Opacity: ${series.opacity}'
};
```

In the above example, `point.x` is displayed in month-year format, `point.y` is displayed with two decimal places, and `series.opacity` displays the opacity value applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `point.x` - Specifies the x-value of the data point, such as DateTime or category values.
- `point.y` - Specifies the numeric y-value of the data point.
- `series.name` - Specifies the name assigned to the series.
- `series.type` - Specifies the rendering type of the series, such as `Column`, `Bar`, `Line`, or `StackingColumn`.
- `series.opacity` - Specifies the opacity value applied to the series.

> **Important:** The availability of point-specific tokens depends on the values configured in the data source and the chart series type. The `series.name` and `series.type` tokens return string values, so DateTime or number formatting is not applied to these tokens.

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
---

## Tooltip Templates

### Custom Tooltip Template

```vue
<template>
  <div>
    <ejs-chart :tooltip="tooltipSettings">
      <!-- series -->
    </ejs-chart>
  </div>
</template>

<script setup>
const tooltipSettings = {
  enable: true,
  template: '#tooltip-template'
};
</script>

<template id="tooltip-template">
  <div style="padding: 10px; background: #f0f0f0; border-radius: 5px;">
    <p><b>${series.name}</b></p>
    <p>Month: <b>${point.x}</b></p>
    <p>Sales: <b>$${point.y}K</b></p>
    <p style="color: green;">📈 Trending Up</p>
  </div>
</template>
```

### Tooltip with Images or Icons

```vue
<template id="tooltip-template">
  <div style="padding: 10px;">
    <img src="icon.png" alt="icon" style="width: 20px; height: 20px;">
    <span>${point.x}: $${point.y}K</span>
  </div>
</template>
```

---

## Crosshair and Trackball

### Crosshair

Vertical and horizontal lines that follow the cursor:

```vue
<template>
  <ejs-chart :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis" :crosshair="crosshairSettings">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const primaryXAxis = {
    crosshairTooltip: { enable: true, fill: 'green' }
};
const primaryYAxis = {
    crosshairTooltip: { enable: true, fill: 'green' },
};
const crosshairSettings = { enable: true, line: { width: 2, color: 'green' } };
</script>
```

### Trackball

Shows tooltip that follows the cursor:

```vue
<template>
  <ejs-chart :crosshair="crosshairSettings" :tooltip="tooltip">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const crosshairSettings = {
  enable: true,
  lineType: 'Both',
  line: {
    width: 2,
    color: '#ff0000',
  }
};
const tooltip = {
  enable: true,
  shared: true
};
</script>
```

### Combined with Tooltip

```vue
<template>
  <ejs-chart :crosshair="crosshairOptions" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
import { provide } from 'vue';
import { Crosshair, Tooltip } from '@syncfusion/ej2-vue-charts';

provide('chart', [Crosshair, Tooltip /* + others */]);

const crosshairOptions = {
  enable: true,
  line: {
    width: 2,
    color: 'green',
    dashArray: '5,5'
  }
};

const primaryXAxis = {
  valueType: 'DateTime',
  crosshairTooltip: { enable: true, fill: 'green' }  // ← Axis tooltip config
};

const primaryYAxis = {
  crosshairTooltip: { enable: true, fill: 'green' }
};
</script>
```

---

### Raw Datasource Record in `tooltipRender`

The complete datasource record is available only through the `tooltipRender` event as `args.data.rawData`. It is not a tooltip-format token.

```vue
<template>
  <ejs-chart id="raw-data-tooltip-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis"
    :tooltip="tooltip" :tooltipRender="tooltipRender" title="HiloOpenClose Raw Data Tooltip">
    <e-series-collection>
      <e-series :dataSource="chartData" type="HiloOpenClose" xName="x" open="open" high="high"
        low="low" close="close" name="Price">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
  Category, ChartComponent as EjsChart, HiloOpenCloseSeries, SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries, Tooltip
} from '@syncfusion/ej2-vue-charts';

provide('chart', [Category, HiloOpenCloseSeries, Tooltip]);

interface HiloOpenCloseData { x: string; open: number; high: number; low: number; close: number; }
const chartData: HiloOpenCloseData[] = [
  { x: 'Jan', open: 120, high: 160, low: 100, close: 140 },
  { x: 'Feb', open: 150, high: 190, low: 130, close: 170 },
  { x: 'Mar', open: 130, high: 170, low: 110, close: 150 },
  { x: 'Apr', open: 160, high: 180, low: 120, close: 140 },
  { x: 'May', open: 150, high: 170, low: 110, close: 130 }
];
const primaryXAxis: Object = { valueType: 'Category', title: 'Month' };
const primaryYAxis: Object = { title: 'Price', minimum: 80, maximum: 200, interval: 20 };
const tooltip: Object = { enable: true };
const tooltipRender = (args: any): void => {
  if (!args.data || !args.data.rawData) return;
  const rawData: HiloOpenCloseData = args.data.rawData as HiloOpenCloseData;
  args.headerText = `<b>${rawData.x}</b>`;
  args.text = [`Open: ${rawData.open}`, `High: ${rawData.high}`, `Low: ${rawData.low}`, `Close: ${rawData.close}`];
};
</script>
```

Use fields such as `args.data.rawData.x` and `args.data.rawData.high`. Do not generate `${point.data.<field>}` for this feature.

## Customization

### Tooltip Styling

```vue
const tooltipSettings = {
  enable: true,
  textStyle: {
    color: '#fff',
    size: '12',
    fontFamily: 'Arial',
  },
  border: {
    color: '#ccc',
    width: 1,
  },
  opacity: 0.9
};
```

### Legend Padding and Margins

```vue
const legendSettings = {
  padding: 15,   // Space inside legend
  margin: { left: 10, right: 10, top: 10, bottom: 10 }
};
```

### Crosshair Styling

```vue
const crosshairSettings = {
  enable: true,
  lineType: 'Both',
  line: {
    width: 2,
    color: '#ff6b6b',
    dashArray: '5,5'
  }
};
```

---

## Common Patterns

### Pattern 1: Top-Right Legend with Custom Styling
```vue
const legendSettings = {
  position: 'Top',
  alignment: 'Far',
  background: 'rgba(255, 255, 255, 0.9)',
  border: { color: '#ccc', width: 1 }
};
```

### Pattern 2: Shared Tooltip for Multiple Series
```vue
const tooltipSettings = {
  enable: true,
  shared: true,
  format: '<b>${point.x}</b><br>${series.name}: ${point.y}'
};
```

### Pattern 3: Vertical Crosshair with Trackball
```vue
const crosshairSettings = {
  enable: true,
  lineType: 'Vertical'
};
```

### Pattern 4: Custom Tooltip Format for Currency
```vue
const tooltipSettings = {
  enable: true,
  format: '<b>${series.name}</b><br>Revenue: <b>$${point.y}K</b>'
};
```

## Next Steps

- Configure data labels: [Data Labels and Annotations](../data-labels-and-annotations.md)
- Add interactivity: [Interactions and Events](../interactions-and-events.md)
- Customize appearance: [Customization and Styling](../customization-and-styling.md)
