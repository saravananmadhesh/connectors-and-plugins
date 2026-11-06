# Data Labels and Annotations

## Table of Contents
- [Data Labels](#data-labels)
  - [Enable Data Labels](#enable-data-labels)
  - [Label Positioning](#label-positioning)
  - [Label Formatting](#label-formatting)
  - [Label Templates](#label-templates)
  - [Label Styling](#label-styling)
  - [Handling Overlapping Data Labels](#handling-overlapping-data-labels)
  - [Example: Currency Labels with Bold Font](#example-currency-labels-with-bold-font)
- [Annotations](#annotations)
  - [Text Annotation](#text-annotation)
  - [Shape Annotation](#shape-annotation)
  - [Image Annotation](#image-annotation)
  - [Positioning Annotations](#positioning-annotations)
  - [Example: Highlight Q1 Sales Peak](#example-highlight-q1-sales-peak)
- [Dynamic Updates](#dynamic-updates)
  - [Update Labels on Data Change](#update-labels-on-data-change)
  - [Update Annotations Programmatically](#update-annotations-programmatically)
- [Stack Labels](#stack-labels)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Percentage Labels in Pie Chart](#pattern-1-percentage-labels-in-pie-chart)
  - [Pattern 2: Currency Format with Commas](#pattern-2-currency-format-with-commas)
  - [Pattern 3: Highlight Top 3 Values](#pattern-3-highlight-top-3-values)
  - [Pattern 4: Comparison Annotation](#pattern-4-comparison-annotation)
- [Troubleshooting](#troubleshooting)
  - [Labels Overlapping](#labels-overlapping)
  - [Annotations Not Visible](#annotations-not-visible)
  - [Labels Appear Outside Chart](#labels-appear-outside-chart)
- [Next Steps](#next-steps)

Data labels display values directly on data points, while annotations add text, shapes, and images to highlight specific areas or insights.

## Data Labels

### Enable Data Labels

```vue
<template>
  <ejs-chart>
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales" 
                :marker="marker" name="Sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const marker = {
  dataLabel: { visible: true }
};

const data = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 28 },
  { month: "Mar", sales: 34 },
];
</script>
```

### Label Positioning

```vue
const dataLabelSettings = {
  visible: true,
  position: 'Top',    // 'Top', 'Bottom', 'Left', 'Right', 'Middle', 'Auto'
};
```

**Position Options:**
- `Top` - Above the data point
- `Bottom` - Below the data point
- `Left` - Left of the data point
- `Right` - Right of the data point
- `Middle` - Center of the data point
- `Auto` - Best position (default)

### Label Formatting

```vue
const dataLabelSettings = {
  visible: true,
  format: '${point.y}K',     // Show as "35K"
};
```

**Format Placeholders:**
- `${point.x}` - X-axis value
- `${point.y}` - Y-axis value
- `${point.percentage}` - Percentage (pie charts)
- `${series.name}` - Series name

### Label Templates

```vue
<template>
  <ejs-chart>
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales" 
                :marker="marker">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const marker = {
  dataLabel: {
    visible: true,
    template: '#label-template',
  }
};
</script>

<template id="label-template">
  <div style="background: rgba(255,255,255,0.8); padding: 2px 5px; border-radius: 3px;">
    <b>${point.y}</b>
  </div>
</template>
```

### Label Styling

```vue
const dataLabelSettings = {
  visible: true,
  textStyle: {
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backgroundColor: '#666',
  border: {
    color: '#ccc',
    width: 1,
  },
  margin: { left: 5, right: 5, top: 5, bottom: 5 },
};
```

### Handling Overlapping Data Labels

Use the `labelIntersectAction` property to specify how overlapping data labels are handled.

The following options are available:

- `None`: Displays all data labels without changing their positions, even when they overlap.
- `Hide`: Hides data labels that overlap.
- `Rotate90`: Rotates overlapping data labels by 90 degrees.
- `RelocateVertically`: Relocates overlapping data labels vertically.
- `RelocateHorizontally`: Relocates overlapping data labels horizontally.

The `RelocateVertically` and `RelocateHorizontally` options enable the Smart Data Label feature and are supported only for the following series types:

- `StackingColumn`
- `StackingColumn100`
- `StackingBar`
- `StackingBar100`

These options improve readability by relocating overlapping data labels and connecting them to their corresponding data points using connector lines.

Use the `smartLabelSettings` property to customize the appearance and position of relocated data labels. The following settings are available:

- `background`: Specifies the background color of the relocated data label.
- `pointerShape`: Specifies the pointer shape of the relocated data label.
- `border`: Customizes the color, width, and dash array of the relocated data label border.
- `connectorLineStyle`: Customizes the color and width of the connector line.
- `offset`: Specifies the distance by which the data label is relocated. This property is applicable only when `labelIntersectAction` is set to `RelocateVertically`.

The following example demonstrates how to relocate overlapping data labels vertically in a stacking column chart:

```vue
<template>
  <div id="app">
    <ejs-chart id="container" height="260px" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis" :title="title">
      <e-series-collection>
        <e-series :dataSource="chartData" type="StackingColumn" xName="quarter" yName="productA" name="Product A" :marker="marker"></e-series>
        <e-series :dataSource="chartData" type="StackingColumn" xName="quarter" yName="productB" name="Product B" :marker="marker"></e-series>
        <e-series :dataSource="chartData" type="StackingColumn" xName="quarter" yName="productC" name="Product C" :marker="marker"></e-series>
        <e-series :dataSource="chartData" type="StackingColumn" xName="quarter" yName="productD" name="Product D" :marker="marker"></e-series>
        <e-series :dataSource="chartData" type="StackingColumn" xName="quarter" yName="productE" name="Product E" :marker="marker"></e-series>
        <e-series :dataSource="chartData" type="StackingColumn" xName="quarter" yName="productF" name="Product F" :marker="marker"></e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script>
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Category, DataLabel, Legend, StackingColumnSeries } from '@syncfusion/ej2-vue-charts';

export default {
  name: 'App',
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data() {
    return {
      chartData: [
        { quarter: 'Q1', productA: 1.1, productB: 1.2, productC: 1.1, productD: 1.2, productE: 1.1, productF: 1.2 },
        { quarter: 'Q2', productA: 1.2, productB: 1.1, productC: 1.2, productD: 1.1, productE: 1.2, productF: 1.1 },
        { quarter: 'Q3', productA: 1.1, productB: 1.1, productC: 1.2, productD: 1.2, productE: 1.1, productF: 1.2 },
        { quarter: 'Q4', productA: 1.2, productB: 1.2, productC: 1.1, productD: 1.1, productE: 1.2, productF: 1.1 }
      ],
      primaryXAxis: {
        valueType: 'Category',
        title: 'Quarter'
      },
      primaryYAxis: {
        title: 'Sales',
        minimum: 0,
        maximum: 8,
        interval: 1
      },
      marker: {
        dataLabel: {
          visible: true,
          position: 'Middle',
          format: 'Value: {value}',
          font: {
            size: '14px'
          },
          labelIntersectAction: 'RelocateVertically',
          smartLabelSettings: {
            background: '#ffffff',
            pointerShape: 'Arrow',
            border: {
              color: '#808080',
              width: 1,
              dashArray: '2,2'
            },
            connectorLineStyle: {
              color: '#808080',
              width: 1
            },
            offset: 10
          }
        }
      },
      title: 'Quarterly Sales'
    };
  },
  provide: {
    chart: [StackingColumnSeries, Category, DataLabel, Legend]
  }
};
</script>

<style>
#container {
  height: 260px;
}
</style>
```

To relocate overlapping data labels horizontally, set `labelIntersectAction` to `RelocateHorizontally`:

```vue
<script>
export default {
  data() {
    return {
      marker: {
        dataLabel: {
          visible: true,
          position: 'Middle',
          labelIntersectAction: 'RelocateHorizontally',
          smartLabelSettings: {
            background: '#ffffff',
            pointerShape: 'Arrow',
            border: {
              color: '#808080',
              width: 1,
              dashArray: '2,2'
            },
            connectorLineStyle: {
              color: '#808080',
              width: 1
            }
          }
        }
      }
    };
  }
};
</script>
```

### Example: Currency Labels with Bold Font

```vue
const dataLabelSettings = {
  visible: true,
  format: '$${point.y}',
  textStyle: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  position: 'Top',
};
```

## Annotations

**Annotations** add text, shapes, or images to highlight specific areas of the chart.

### Text Annotation

```vue
<template>
  <ejs-chart :annotations="annotations">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const annotations = [
  {
    content: 'Peak Sales',
    x: '50%',
    y: '20%',
    coordinateUnits: 'Percent',
  }
];
</script>
```

### Shape Annotation

```vue
const annotations = [
  {
    type: 'Rectangle',
    x: 2,
    y: 30,
    width: 3,
    height: 40,
    fill: 'rgba(255, 0, 0, 0.2)',
    border: { color: 'red', width: 2 },
  }
];
```

**Shape Types:**
- `Rectangle` - Rectangular region
- `Circle` - Circular region
- `Line` - Line segment
- `Ellipse` - Oval region

### Image Annotation

```vue
const annotations = [
  {
    type: 'Image',
    x: '50%',
    y: '30%',
    height: 50,
    width: 50,
    url: '/images/icon.png',
  }
];
```

### Positioning Annotations

```vue
const annotation = {
  content: 'Peak Sales',
  x: 2,              // X position (data value or percentage)
  y: 50,             // Y position (data value or percentage)
  coordinateUnits: 'Point',    // 'Point' (data units) or 'Percent' (percentage)
  verticalAlignment: 'Top',    // 'Top', 'Middle', 'Bottom'
  horizontalAlignment: 'Center', // 'Center', 'Left', 'Right'
};
```

### Example: Highlight Q1 Sales Peak

```vue
<template>
  <ejs-chart :annotations="annotations">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const annotations = [
  {
    type: 'Rectangle',
    x: 1,           // Start at month "Feb"
    y: 20,          // Start at sales value 20
    width: 1,       // Cover 1 month width
    height: 20,     // Height in data units
    fill: 'rgba(255, 255, 0, 0.2)',
    border: { color: 'orange', width: 2 },
  },
  {
    content: 'Peak Season',
    x: 1.5,
    y: 40,
    textStyle: {
      fontWeight: 'bold',
      color: 'orange',
      fontSize: 14,
    },
  }
];

const data = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 42 },  // Peak
  { month: "Mar", sales: 34 },
];
</script>
```

## Dynamic Updates

### Update Labels on Data Change

```vue
<template>
  <button @click="updateData">Update Data</button>
  <ejs-chart ref="chart">
    <e-series-collection>
      <e-series :dataSource="data" :marker="marker" type="Column" 
                xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
import { ref } from "vue";

const chart = ref(null);
const data = ref([
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 28 },
  { month: "Mar", sales: 34 },
]);

const marker = {
  dataLabel: {
    visible: true,
    format: '${point.y}K',
  }
};

const updateData = () => {
  data.value = [
    { month: "Jan", sales: 40 },
    { month: "Feb", sales: 45 },
    { month: "Mar", sales: 50 },
  ];
  // Labels automatically update with new data
};
</script>
```

### Update Annotations Programmatically

```vue
// Get chart instance
const chartInstance = chart.value.ej2_instances[0];

// Update annotation
chartInstance.annotations = [
  {
    content: 'New Peak',
    x: 3,
    y: 60,
  }
];

// Refresh chart
chartInstance.refresh();
```



### Data-Label Intersection Configuration

Data-label intersection handling belongs inside `marker.dataLabel`. It is separate from axis `labelIntersectAction`, which belongs directly on an axis object.

```ts
const marker: Object = {
  dataLabel: {
    visible: true,
    position: 'Top',
    labelIntersectAction: 'Hide'
  }
};
```


Use only actions supported by the target data-label implementation:

- `None`: Leaves intersecting data labels unchanged.
- `Hide`: Hides labels that overlap another data label.
- `Rotate90`: Rotates intersecting data labels where supported.
- `RelocateVertically`: Relocates collided labels vertically for supported stacking-series families.
- `RelocateHorizontally`: Lays out collided labels horizontally and wraps them into additional rows for supported stacking-series families.

Do not use axis-only values such as `MultipleRows`, `Rotate45WithTrim`, or `Rotate90WithTrim` for data labels.

```vue
<template>
  <ejs-chart id="data-label-intersection-chart" :primaryXAxis="primaryXAxis"
    :primaryYAxis="primaryYAxis" title="Data Label Intersection">
    <e-series-collection>
      <e-series :dataSource="chartData" type="Column" xName="month" yName="sales"
        name="Sales" :marker="marker">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
  Category, ChartComponent, ColumnSeries, DataLabel, SeriesCollectionDirective, SeriesDirective
} from '@syncfusion/ej2-vue-charts';

defineOptions({
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  }
});

provide('chart', [Category, ColumnSeries, DataLabel]);

const chartData: Object[] = [
  { month: 'January', sales: 60 }, { month: 'February', sales: 59 },
  { month: 'March', sales: 61 }, { month: 'April', sales: 60 },
  { month: 'May', sales: 62 }, { month: 'June', sales: 61 }
];
const primaryXAxis: Object = { valueType: 'Category', labelIntersectAction: 'Rotate45' };
const primaryYAxis: Object = { minimum: 0, maximum: 70, interval: 10 };
const marker: Object = {
  dataLabel: {
    visible: true,
    position: 'Top',
    format: '${value}',
    labelIntersectAction: 'Hide',
    border: { color: '#64748B', width: 1 },
    fill: '#FFFFFF',
    margin: { left: 5, right: 5, top: 3, bottom: 3 }
  }
};
</script>
```

## Relocating Overlapping Data Labels

`marker.dataLabel.labelIntersectAction` supports `None`, `Hide`, `Rotate90`, `RelocateVertically`, and `RelocateHorizontally`. Relocation applies to `StackingColumn`, `StackingColumn100`, `StackingBar`, and `StackingBar100` when labels actually overlap.

`smartLabelSettings` configures `background`, `pointerShape`, `border`, `connectorLineStyle`, and `offset`. The offset applies to vertical relocation; horizontal relocation uses an effective offset of 0.

### Complete `RelocateVertically` Vue sample

```vue
<template>
  <ejs-chart id="vertical-relocation-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis"
    :legendSettings="legendSettings" :tooltip="tooltip" title="Vertically Relocated Data Labels">
    <e-series-collection>
      <e-series v-for="series in seriesCollection" :key="series.name" :dataSource="series.dataSource"
        type="StackingColumn" xName="quarter" yName="value" :name="series.name" stackingGroup="Revenue"
        :marker="marker">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
  Category, ChartComponent as EjsChart, DataLabel, Legend, SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries, StackingColumnSeries, Tooltip
} from '@syncfusion/ej2-vue-charts';

provide('chart', [Category, StackingColumnSeries, DataLabel, Legend, Tooltip]);

const seriesCollection: Object[] = [
  { name: 'Product', dataSource: [{ quarter: 'Q1', value: 48 }, { quarter: 'Q2', value: 44 }, { quarter: 'Q3', value: 52 }] },
  { name: 'Services', dataSource: [{ quarter: 'Q1', value: 3.8 }, { quarter: 'Q2', value: 2.9 }, { quarter: 'Q3', value: 3.4 }] },
  { name: 'Support', dataSource: [{ quarter: 'Q1', value: 2.6 }, { quarter: 'Q2', value: 3.2 }, { quarter: 'Q3', value: 2.4 }] },
  { name: 'Training', dataSource: [{ quarter: 'Q1', value: 1.9 }, { quarter: 'Q2', value: 2.3 }, { quarter: 'Q3', value: 2.1 }] }
];
const marker: Object = {
  dataLabel: {
    visible: true, position: 'Top', format: '${value}', labelIntersectAction: 'RelocateVertically',
    margin: { left: 6, right: 6, top: 4, bottom: 4 },
    smartLabelSettings: {
      background: '#0F172A', pointerShape: 'Arrow', border: { color: '#334155', width: 1 },
      connectorLineStyle: { color: '#64748B', width: 1, dashArray: '3,2' }, offset: 0.5
    }
  }
};
const primaryXAxis: Object = { valueType: 'Category', title: 'Quarter', majorGridLines: { width: 0 } };
const primaryYAxis: Object = { title: 'Revenue', minimum: 0, maximum: 70, interval: 10 };
const legendSettings: Object = { visible: true, position: 'Top' };
const tooltip: Object = { enable: true, shared: true };
</script>
```

For horizontal relocation, change `labelIntersectAction` to `RelocateHorizontally` and `pointerShape` to `None`. The configured offset is ignored because horizontal relocation uses an effective offset of 0.

## Stack Labels

### Stack-Label Configuration and Module Requirements

Stack labels are Chart-level aggregate labels. Bind them through `:stackLabels` on `<ejs-chart>`. Do not place `stackLabels` inside `marker.dataLabel`, and do not treat point data labels as aggregate totals.

```vue
<template>
  <ejs-chart id="stack-label-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis"
    :stackLabels="stackLabels" :legendSettings="legendSettings" :tooltip="tooltip"
    title="Quarterly Revenue Totals">
    <e-series-collection>
      <e-series :dataSource="productData" type="StackingColumn" xName="quarter" yName="value"
        name="Products" :marker="marker">
      </e-series>
      <e-series :dataSource="serviceData" type="StackingColumn" xName="quarter" yName="value"
        name="Services" :marker="marker">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
  Category, ChartComponent, DataLabel, Legend, SeriesCollectionDirective, SeriesDirective,
  StackingColumnSeries, Tooltip
} from '@syncfusion/ej2-vue-charts';

defineOptions({
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  }
});

provide('chart', [Category, DataLabel, Legend, StackingColumnSeries, Tooltip]);

const productData: Object[] = [
  { quarter: 'Q1', value: 25 }, { quarter: 'Q2', value: 0 },
  { quarter: 'Q3', value: 30 }, { quarter: 'Q4', value: 10 }
];
const serviceData: Object[] = [
  { quarter: 'Q1', value: 20 }, { quarter: 'Q2', value: 0 },
  { quarter: 'Q3', value: 22 }, { quarter: 'Q4', value: -10 }
];
const primaryXAxis: Object = { valueType: 'Category' };
const primaryYAxis: Object = { minimum: -20, maximum: 60, interval: 20 };
const marker: Object = { dataLabel: { visible: true, position: 'Middle' } };
const legendSettings: Object = { visible: true };
const tooltip: Object = { enable: true };
const stackLabels: Object = {
  visible: true,
  format: '${value}',
  position: 'Top',
  alignment: 'Center',
  fill: '#FFFFFF',
  border: { color: '#64748B', width: 1 },
  font: { color: '#0F172A', size: '12px', fontWeight: '600' },
  margin: { left: 5, right: 5, top: 3, bottom: 3 }
};
</script>
```

Use these rules:

- `visible` must be `true`; using a stacking-series type alone does not display aggregate totals.
- `format` formats the aggregate stack value, not an individual segment value.
- `position` controls the supported stack-label position.
- `alignment` controls horizontal alignment within the stack-label region.
- `fill`, `border`, `font`, and `margin` configure stack-label appearance.
- `marker.dataLabel` renders individual segment values. `stackLabels` renders one aggregate label for the completed stack.
- Positive and negative stacks use their resolved aggregate location.
- A zero-total category is anchored to the value-axis baseline, including a total produced when positive and negative values cancel each other.
- Null and undefined segment values must not produce an invalid total.
- Use `textRender` when stack-label text must be customized or cancelled through an event.

Provide the stacking module used by the series, such as `StackingColumnSeries`, `StackingColumn100Series`, `StackingBarSeries`, `StackingBar100Series`, `StackingAreaSeries`, or `StackingLineSeries`. Provide `DataLabel` when individual segment labels are enabled.



Chart-level `stackLabels` displays aggregate stack totals. A stack resolving to zero, including null values normalized to zero or positive and negative values that cancel, renders at the value-axis baseline.

```vue
<template>
  <ejs-chart id="stack-label-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis"
    :stackLabels="stackLabels" title="Stack Totals and Zero-Value Labels">
    <e-series-collection>
      <e-series v-for="series in seriesCollection" :key="series.name" :dataSource="series.dataSource"
        type="StackingColumn" xName="quarter" yName="value" :name="series.name" stackingGroup="Sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
  Category, ChartComponent as EjsChart, DataLabel, SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries, StackingColumnSeries
} from '@syncfusion/ej2-vue-charts';

provide('chart', [Category, StackingColumnSeries, DataLabel]);

const seriesCollection: Object[] = [
  { name: 'Hardware', dataSource: [{ quarter: 'Q1', value: 30 }, { quarter: 'Q2', value: 0 }, { quarter: 'Q3', value: null }, { quarter: 'Q4', value: 10 }] },
  { name: 'Software', dataSource: [{ quarter: 'Q1', value: 22 }, { quarter: 'Q2', value: 0 }, { quarter: 'Q3', value: undefined }, { quarter: 'Q4', value: -10 }] },
  { name: 'Services', dataSource: [{ quarter: 'Q1', value: 18 }, { quarter: 'Q2', value: 0 }, { quarter: 'Q3', value: 0 }, { quarter: 'Q4', value: 0 }] }
];
const primaryXAxis: Object = { valueType: 'Category', title: 'Quarter' };
const primaryYAxis: Object = { title: 'Revenue', minimum: -20, maximum: 80, interval: 20 };
const stackLabels: Object = {
  visible: true, format: '${value}', fill: '#FFFFFF', border: { color: '#6B7280', width: 1 },
  font: { color: '#111827', size: '12px', fontWeight: '600' }
};
</script>
```

## Common Patterns

### Pattern 1: Percentage Labels in Pie Chart
```vue
const dataLabelSettings = {
  visible: true,
  format: '${point.percentage}%',
  position: 'Outside',
};
```

### Pattern 2: Currency Format with Commas
```vue
const dataLabelSettings = {
  visible: true,
  format: '$${point.y:N0}',  // N0 = no decimal places with commas
};
```

### Pattern 3: Highlight Top 3 Values
```vue
<template>
  <ejs-chart :annotations="topAnnotations">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const topAnnotations = [
  {
    x: 2,
    y: 50
  },
  // ... more rectangles for other top values
];
</script>
```

### Pattern 4: Comparison Annotation
```vue
const annotations = [
  {
    x: 0,
    y: 40
  },
  {
    content: 'Target: 40',
    x: 2,
    y: 42
  }
];
```

## Troubleshooting

### Labels Overlapping
**Solution:** Use `position: 'Top'` or `position: 'Bottom'` instead of `Auto`

### Annotations Not Visible
**Solution:** Check `coordinateUnits` matches your axis type. Use `'Point'` for data values, `'Percent'` for percentages.

### Labels Appear Outside Chart
**Solution:** Reduce `fontSize` or use shorter `format`

## Next Steps

- Configure interactivity: [Interactions and Events](../interactions-and-events.md)
- Customize colors: [Customization and Styling](../customization-and-styling.md)
- Export charts: [Export and Data Management](../export-and-data-management.md)
