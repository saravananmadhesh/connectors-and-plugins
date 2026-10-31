# Chart Types and Customization

## Table of Contents
- [Pie Chart Basics](#pie-chart-basics)
  - [Basic Pie Chart](#basic-pie-chart)
  - [Key Points](#key-points)
- [Radius Customization](#radius-customization)
  - [Custom Radius Percentage](#custom-radius-percentage)
- [Doughnut Chart](#doughnut-chart)
  - [Basic Doughnut](#basic-doughnut)
  - [Inner Radius Variations](#inner-radius-variations)
- [Center Positioning](#center-positioning)
  - [Center Position Object](#center-position-object)
  - [Example: Off-Center Chart](#example-off-center-chart)
- [Start and End Angles](#start-and-end-angles)
  - [Semi-Pie (Semi-Circle)](#semi-pie-semi-circle)
  - [Angle Reference](#angle-reference)
  - [Quarter-Pie Example](#quarter-pie-example)
- [Border Radius](#border-radius)
  - [Border Radius Configuration](#border-radius-configuration)
  - [Border Radius Values](#border-radius-values)
- [Color and Text Mapping](#color-and-text-mapping)
  - [Color Mapping](#color-mapping)
  - [Text Mapping with Data Labels](#text-mapping-with-data-labels)
- [Size Mapping](#size-mapping)
  - [Bubble Pie with Size Mapping](#bubble-pie-with-size-mapping)
  - [How It Works](#how-it-works)
- [Multiple Pie Series](#multiple-pie-series)
  - [Mapping Related Points with mappingKey](#mapping-related-points-with-mappingkey)
- [Edge Cases and Best Practices](#edge-cases-and-best-practices)
  - [Handling Zero or Negative Values](#handling-zero-or-negative-values)
  - [Very Small Values](#very-small-values)
  - [Consistent Formatting](#consistent-formatting)
- [Next Steps](#next-steps)
  - [Configure appearance](#configure-appearance)
  - [Add data labels](#add-data-labels)
  - [Implement interactivity](#implement-interactivity)

---

## Pie Chart Basics

A pie chart displays categorical data as slices of a circle, where each slice's size represents its proportion of the total.

### Basic Pie Chart

```vue
<template>
  <div id="app">
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series :dataSource="seriesData" xName="x" yName="y" type="Pie">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries } from "@syncfusion/ej2-vue-charts"

export default {
  name: "App",
  components: {
    'ejs-accumulationchart': AccumulationChartComponent,
    'e-accumulation-series-collection': AccumulationSeriesCollectionDirective,
    'e-accumulation-series': AccumulationSeriesDirective
  },
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 },
        { x: 'Others', y: 16 }
      ]
    }
  },
  provide: {
    accumulationchart: [PieSeries]
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

**Key Points:**
- `type="Pie"` specifies pie chart (optional, pie is default for PieSeries)
- `xName="x"` maps category labels
- `yName="y"` maps numeric values
- By default, pie fills entire circle (0° to 360°)

---

## Radius Customization

Control pie size using the `radius` property (percentage or pixels).

### Custom Radius Percentage

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="seriesData" xName="x" yName="y" radius="60%">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Jan', y: 3 },
        { x: 'Feb', y: 3.5 },
        { x: 'Mar', y: 7 }
      ]
    }
  }
}
</script>
```

**Radius Values:**
- `80%` (default) - Standard pie size
- `60%` - Smaller pie, centered
- `90%` - Larger pie
- `200px` - Fixed pixel size
- `100%` - Maximum available space

---

## Doughnut Chart

Doughnut charts are pie charts with a hollow center, created using the `innerRadius` property.

### Basic Doughnut

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="seriesData" xName="x" yName="y" innerRadius="40%">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Q1', y: 18 },
        { x: 'Q2', y: 22 },
        { x: 'Q3', y: 35 },
        { x: 'Q4', y: 25 }
      ]
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

---

## Inner Radius Variations

The `innerRadius` property creates the hollow center (0-100% range).

### Inner Radius Examples

```vue
// Thin ring (large hollow)
innerRadius: "70%"

// Medium ring
innerRadius: "50%"

// Thick ring (small hollow)
innerRadius: "20%"

// No hollow (back to pie)
innerRadius: "0%"
```

---

## Center Positioning

Customize chart center location using `center` property.

### Center Position Object

```vue
center: {
  x: '50%',  // Horizontal position
  y: '50%'   // Vertical position
}
```

### Example: Off-Center Chart

```vue
<template>
  <ejs-accumulationchart id="container" :center="chartCenter">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="seriesData" xName="x" yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'North', y: 28 },
        { x: 'South', y: 35 },
        { x: 'East', y: 22 },
        { x: 'West', y: 15 }
      ],
      chartCenter: {
        x: '30%',  // Shift left
        y: '50%'   // Center vertically
      }
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

---

## Start and End Angles

Use `startAngle` and `endAngle` to create partial pie charts (semi-pie, quarter-pie).

### Semi-Pie (Semi-Circle)

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        startAngle="270"
        endAngle="90">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'A', y: 30 },
        { x: 'B', y: 40 },
        { x: 'C', y: 30 }
      ]
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Angle Reference

```
270° (left) -------- 0°/360° (right)
           \      /
            \    /
             \  /
              \/
              /\
             /  \
            /    \
           /      \
        180° (bottom)

// Semi-pie (bottom to top)
startAngle: 180
endAngle: 0

// Semi-pie (left to right)
startAngle: 270
endAngle: 90

// Quarter-pie (bottom-left quadrant)
startAngle: 180
endAngle: 270
```

### Quarter-Pie Example

```vue
startAngle: 0,
endAngle: 90
```

---

## Border Radius

Add rounded corners to pie slices for modern appearance.

### Border Radius Configuration

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        borderRadius="8">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'A', y: 35 },
        { x: 'B', y: 28 },
        { x: 'C', y: 22 },
        { x: 'D', y: 15 }
      ]
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

**Border Radius Values:**
- `0` - Sharp corners (default)
- `4-8` - Subtle rounded corners
- `10+` - More rounded appearance

---

## Color and Text Mapping

Map data properties to colors and display text.

### Color Mapping

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        pointColorMapping="color">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37, color: '#498fff' },
        { x: 'Firefox', y: 28, color: '#ffa060' },
        { x: 'Safari', y: 19, color: '#ff68b6' },
        { x: 'Others', y: 16, color: '#81e2a1' }
      ]
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Text Mapping with Data Labels

```vue
// In series
<e-accumulation-series 
      :dataSource="seriesData" 
      xName="x" 
      yName="y"
      :dataLabel="dataLabel">
</e-accumulation-series>

<script>
export default {
    data() {
        return {
            seriesData: [
                { x: 'Chrome', y: 37, text: 'Chrome: 37%', color: '#498fff' },
                { x: 'Firefox', y: 28, text: 'Firefox: 28%', color: '#ffa060' }
            ],
            dataLabel: { visible: true, name: 'text' }
        };
    }
};
</script>
```

---

## Size Mapping

Create variable-sized slices using a data property for radius.

### Bubble Pie with Size Mapping

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :radius="radius"
        innerRadius="20%">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'USA', y: 25, radius: '100%' },
        { x: 'India', y: 18, radius: '80%' },
        { x: 'China', y: 22, radius: '90%' },
        { x: 'Japan', y: 15, radius: '70%' },
        { x: 'UK', y: 12, radius: '60%' }
      ],
      radius: 'radius'
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

**How It Works:**
- Pass property name as string to `radius`
- Each data point's radius taken from its property value

---

## Multiple Pie Series

Render multiple pie or doughnut series in a single Accumulation Chart to compare related datasets as concentric rings. Each series can have its own data source, radius, inner radius, data labels, and styling.

```vue
<template>
  <div id="app">
    <ejs-accumulationchart
      id="multiple-pie-series"
      title="Device Usage Comparison"
      :legendSettings="legendSettings"
      :tooltip="tooltip"
    >
      <e-accumulation-series-collection>
        <e-accumulation-series
          :dataSource="currentYearData"
          xName="category"
          yName="value"
          name="Current Year"
          type="Pie"
          radius="100%"
          innerRadius="70%"
          :dataLabel="outerDataLabel"
        >
        </e-accumulation-series>

        <e-accumulation-series
          :dataSource="previousYearData"
          xName="category"
          yName="value"
          name="Previous Year"
          type="Pie"
          radius="60%"
          innerRadius="30%"
          :dataLabel="innerDataLabel"
        >
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  AccumulationChartComponent as EjsAccumulationchart,
  AccumulationSeriesCollectionDirective as EAccumulationSeriesCollection,
  AccumulationSeriesDirective as EAccumulationSeries,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
} from '@syncfusion/ej2-vue-charts';

const currentYearData = ref([
  { category: 'Mobile', value: 45 },
  { category: 'Desktop', value: 35 },
  { category: 'Tablet', value: 20 }
]);

const previousYearData = ref([
  { category: 'Mobile', value: 38 },
  { category: 'Desktop', value: 42 },
  { category: 'Tablet', value: 20 }
]);

const legendSettings = {
  visible: true
};

const tooltip = {
  enable: true,
  format: '${series.name}<br/>${point.x}: <b>${point.y}%</b>'
};

const outerDataLabel = {
  visible: true,
  name: 'category',
  position: 'Outside'
};

const innerDataLabel = {
  visible: true,
  name: 'category',
  position: 'Inside'
};

provide('accumulationchart', [
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
]);
</script>

<style>
#multiple-pie-series {
  height: 450px;
}
</style>
```

Configure the `radius` and `innerRadius` properties for each series so that the series are displayed as separate concentric rings without overlapping.

- The outer series uses a larger `radius`.
- The inner series uses a smaller `radius`.
- The `innerRadius` property determines the thickness of each ring.
- Each series can use a separate data source and visual configuration.
- The tooltip identifies the hovered point and its corresponding series.

### Mapping Related Points with mappingKey

Use the `mappingKey` property in `legendSettings` to associate corresponding points across multiple pie series. This property specifies the point field used to group related legend items across the series.

```vue
<template>
  <div id="app">
    <ejs-accumulationchart
      id="mapped-multiple-pie-series"
      title="Device Usage Comparison"
      :legendSettings="legendSettings"
      :tooltip="tooltip"
    >
      <e-accumulation-series-collection>
        <e-accumulation-series
          :dataSource="currentYearData"
          xName="category"
          yName="value"
          name="Current Year"
          type="Pie"
          radius="100%"
          innerRadius="70%"
          :dataLabel="outerDataLabel"
        >
        </e-accumulation-series>

        <e-accumulation-series
          :dataSource="previousYearData"
          xName="category"
          yName="value"
          name="Previous Year"
          type="Pie"
          radius="60%"
          innerRadius="30%"
          :dataLabel="innerDataLabel"
        >
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  AccumulationChartComponent as EjsAccumulationchart,
  AccumulationSeriesCollectionDirective as EAccumulationSeriesCollection,
  AccumulationSeriesDirective as EAccumulationSeries,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
} from '@syncfusion/ej2-vue-charts';

const currentYearData = ref([
  { id: 'mobile', category: 'Mobile', value: 45 },
  { id: 'desktop', category: 'Desktop', value: 35 },
  { id: 'tablet', category: 'Tablet', value: 20 }
]);

const previousYearData = ref([
  { id: 'mobile', category: 'Mobile', value: 38 },
  { id: 'desktop', category: 'Desktop', value: 42 },
  { id: 'tablet', category: 'Tablet', value: 20 }
]);

const legendSettings = {
  visible: true,
  mappingKey: 'x'
};

const tooltip = {
  enable: true,
  format: '${series.name}<br/>${point.x}: <b>${point.y}%</b>'
};

const outerDataLabel = {
  visible: true,
  name: 'category',
  position: 'Outside'
};

const innerDataLabel = {
  visible: true,
  name: 'category',
  position: 'Inside'
};

provide('accumulationchart', [
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
]);
</script>

<style>
#mapped-multiple-pie-series {
  height: 450px;
}
</style>
```

In the above example:

- `mappingKey: 'x'` is configured within `legendSettings`.
- The `x` value represents the category mapped through the `xName` property of each series.
- Points with the same category value across multiple series are represented by a common legend item.
- Interacting with a mapped legend item affects the corresponding points in all related pie series.
- Point mapping does not depend on the order of the items in each data source.

For example, the following points are associated because both use `Mobile` as their category value:

```javascript
// Current year
{ id: 'mobile', category: 'Mobile', value: 45 }

// Previous year
{ id: 'mobile', category: 'Mobile', value: 38 }
```

Both series configure `xName="category"`. Therefore, the chart maps the `category` field to the internal `x` value used by `mappingKey`.

**Requirements for `mappingKey`:**

- Configure `mappingKey` inside the `legendSettings` property.
- Use `'x'` to associate points based on the field mapped through each series' `xName` property.
- Related points across the series must have identical X values.
- Each series should use a consistent category mapping.
- The mapped values should uniquely identify categories within each series.

> **Note:** Multiple pie series require the `PieSeries` module. Provide `AccumulationLegend` to display and interact with mapped legend items. Provide `AccumulationDataLabel` and `AccumulationTooltip` only when their corresponding features are enabled.

## Edge Cases and Best Practices

### Handling Zero or Negative Values

Accumulation charts require positive values. Handle edge cases:

```vue
// Validate data
seriesData: this.rawData.map(item => ({
  ...item,
  y: Math.max(item.y, 0)  // Prevent negative values
}))
```

### Very Small Values

When data contains very small values, they may not be visible:

```vue
// Option 1: Filter out very small values
.filter(item => item.y > 1)

// Option 2: Use grouped "Others" category
const others = data.filter(item => item.y < 1)
                    .reduce((sum, item) => sum + item.y, 0)
```

### Consistent Formatting

Ensure data consistency:

```vue
// Good: Consistent property names
[{ x: 'Category', y: 25 }]

// Avoid mixing formats
[
  { name: 'A', value: 25 },  // Different names
  { x: 'B', y: 30 }           // Inconsistent
]
```

---

## Next Steps

- Configure appearance in [legend-configuration.md](./legend-configuration.md)
- Add data labels in [data-labels.md](./data-labels.md)
- Implement interactivity in [advanced-features.md](./advanced-features.md)
