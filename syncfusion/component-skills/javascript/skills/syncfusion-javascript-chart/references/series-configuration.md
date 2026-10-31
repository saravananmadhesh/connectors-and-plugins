# Series Configuration

## Table of Contents

- [Series Configuration](#series-configuration)
  - [Overview](#overview)
  - [Module Injection](#module-injection)
  - [Series Properties](#series-properties)
    - [Basic Series Configuration](#basic-series-configuration)
    - [Multiple Series](#multiple-series)
    - [Series Color and Styling](#series-color-and-styling)
    - [Series Visibility](#series-visibility)
  - [Data Labels](#data-labels)
    - [Enable Data Labels](#enable-data-labels)
    - [Data Label Formatting](#data-label-formatting)
    - [Data Label Positioning](#data-label-positioning)
    - [Mapped Label Text](#mapped-label-text)
    - [Data Label Template](#data-label-template)
    - [Advanced Label Customization](#advanced-label-customization)
    - [Handling Overlapping Data Labels](#handling-overlapping-data-labels)
    - [Stack Labels](#stack-labels)
  - [Marker Customization](#marker-customization)
    - [Enable Markers](#enable-markers)
    - [Marker Styling](#marker-styling)
    - [Marker Shapes](#marker-shapes)
    - [Custom Image Markers](#custom-image-markers)
  - [Stacking and Grouping](#stacking-and-grouping)
    - [Stacked Series](#stacked-series)
    - [100 Percent Stacked Series](#100-percent-stacked-series)
    - [Stacking Groups](#stacking-groups)
    - [Side-by-Side Series](#side-by-side-series)
    - [Column Width and Spacing](#column-width-and-spacing)
  - [Empty Points](#empty-points)
    - [Handling Missing Data](#handling-missing-data)
    - [Empty Point Modes](#empty-point-modes)
      - [Gap](#gap)
      - [Zero](#zero)
      - [Drop](#drop)
      - [Average](#average)
    - [Empty Point Styling](#empty-point-styling)
  - [Common Configurations](#common-configurations)
    - [Sales Comparison Chart](#sales-comparison-chart)


## Overview

A Chart series defines how a data collection is mapped and rendered. Each series can configure its data source, field mappings, type, name, visibility, color, marker, data label, empty-point behavior, stacking group, axis association, and animation.

Data markers can be configured through the series `marker` property, while data labels are configured through `marker.dataLabel`. The `DataLabel` module must be injected when data labels are enabled.

## Module Injection

The EJ2 Chart uses a modular architecture. Import and inject every series, axis, and feature module required by the chart.

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataLabel,
  Legend,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  ColumnSeries,
  Category,
  DataLabel,
  Legend,
  Tooltip
);
```

The modules in this example provide:

- `LineSeries` for Line series.
- `ColumnSeries` for Column series.
- `Category` for Category axes.
- `DataLabel` for series data labels.
- `Legend` for the chart legend.
- `Tooltip` for chart tooltips.

Inject only the modules used by the chart.

## Series Properties

### Basic Series Configuration

```typescript
interface MonthlySalesData {
  month: string;
  sales: number;
}

const chartData: MonthlySalesData[] = [
  {
    month: 'Jan',
    sales: 35
  },
  {
    month: 'Feb',
    sales: 28
  },
  {
    month: 'Mar',
    sales: 34
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Monthly Sales',
      visible: true
    }
  ]
});

chart.appendTo('#chart');
```

The primary series properties are:

- `dataSource`: Specifies the collection bound to the series.
- `xName`: Maps the field containing X-values.
- `yName`: Maps the field containing numeric Y-values.
- `type`: Specifies the series type.
- `name`: Identifies the series in legends and tooltips.
- `visible`: Controls whether the series is rendered.

The field mapped through `yName` must contain valid numeric values.

### Multiple Series

Multiple series can use the same data source and map different Y-value fields.

```typescript
interface QuarterlyData {
  quarter: string;
  sales: number;
  revenue: number;
}

const chart[
Source: chartData,
Name: 'month',
Name: 'sales',
: 'Column',
: 'Monthly Sales',
: true
To('#chart');
 series properties are:

dataSource
  },
  {
    quarter: 'Q3',
    sales: 38,
    revenue: 51
  },
  {
    quarter: 'Q4',
    sales: 48,
    revenue: 58
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

The series order determines the rendering and legend order unless another supported ordering option is configured.

### Series Color and Styling

Use `fill`, `width`, `dashArray`, and `opacity` to customize a compatible series.

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'sales',
      type: 'Line',
      name: 'Sales',
      fill: '#FF5733',
      width: 2,
      dashArray: '0',
      opacity: 0.8
    }
  ]
});

chart.appendTo('#chart');
```

For a Column series, use a `cornerRadius` object.

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      fill: '#0F6CBD',
      opacity: 0.9,
      cornerRadius: {
        topLeft: 5,
        topRight: 5,
        bottomLeft: 0,
        bottomRight: 0
      }
    }
  ]
});

chart.appendTo('#chart');
```

Do not assign a single number directly to `cornerRadius`.

Incorrect:

```typescript
cornerRadius: 5
```

Correct:

```typescript
cornerRadius: {
  topLeft: 5,
  topRight: 5,
  bottomLeft: 0,
  bottomRight: 0
}
```

### Series Visibility

Set `visible` to `false` to hide a series initially.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'sales',
    type: 'Column',
    name: 'Sales',
    visible: true
  },
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'revenue',
    type: 'Column',
    name: 'Revenue',
    visible: false
  }
]
```

To change visibility programmatically:

```typescript
chart.series[1].visible = true;
chart.refresh();
```

When the legend is enabled and `legendSettings.toggleVisibility` is `true`, users can toggle series visibility through legend items.

## Data Labels

Data labels display point values directly on the chart. Enable them through `marker.dataLabel` and inject the `DataLabel` module.

### Enable Data Labels

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataLabel
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  DataLabel
);

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'sales',
      type: 'Column',
      marker: {
        dataLabel: {
          visible: true
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

The marker itself does not need to be visible for a Column or Bar data label to render.

### Data Label Formatting

Use `format` for formatted text and `template` for custom HTML content.

```typescript
marker: {
  dataLabel: {
    visible: true,
    position: 'Top',
    format: '${point.y:n2}',
    margin: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5
    },
    font: {
      size: '14px',
      color: '#333333',
      fontFamily: 'Arial',
      fontWeight: '600'
    }
  }
}
```

Common tokens include:

- `${point.x}`
- `${point.y}`
- `${series.name}`

Inline number formatting can be applied inside supported tokens:

```typescript
format: '${point.y:n2}'
```

Additional examples:

```typescript
format: '${point.y:n0}'
```

```typescript
format: '${point.y:c2}'
```

```typescript
format: '${point.y}%'
```

Use `fontWeight`, not `weight`.

### Data Label Positioning

For Cartesian Chart series, supported data-label positions include:

- `Top`
- `Middle`
- `Bottom`
- `Outer`
- `Auto`

The `Outer` position applies to Column and Bar series.

Example:

```typescript
marker: {
  dataLabel: {
    visible: true,
    position: 'Outer'
  }
}
```

Do not use the Accumulation Chart positions `Inside` or `Outside` with a regular Cartesian Chart.

Pie and Doughnut data labels belong to the separate `AccumulationChart` component and use their own series-level `dataLabel` configuration.

### Mapped Label Text

Use `name` to map label text from a data-source field.

```typescript
interface SalesData {
  quarter: string;
  sales: number;
  label: string;
}

const chartData: SalesData[] = [
  {
    quarter: 'Q1',
    sales: 35,
    label: 'Q1: 35'
  },
  {
    quarter: 'Q2',
    sales: 42,
    label: 'Q2: 42'
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'sales',
      type: 'Column',
      marker: {
        dataLabel: {
          visible: true,
          name: 'label',
          position: 'Outer'
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Data Label Template

Use `template` to provide custom HTML content. The documented template placeholders include `${point.x}` and `${point.y}`.

```typescript
marker: {
  dataLabel: {
    visible: true,
    position: 'Outer',
    template:
      '<div class="chart-data-label">' +
      '<strong>${point.x}</strong><br>' +
      '<span>${point.y}</span>' +
      '</div>'
  }
}
```

```css
.chart-data-label {
  padding: 4px 6px;
  border: 1px solid #808080;
  border-radius: 4px;
  background: #FFFFFF;
  color: #242424;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  text-align: center;
}
```

Do not insert unsanitized user content into a data-label template.

### Advanced Label Customization

```typescript
marker: {
  dataLabel: {
    visible: true,
    position: 'Outer',
    format: '${point.y:n2}',
    fill: '#FFFFFF',
    border: {
      color: '#333333',
      width: 1
    },
    rx: 3,
    ry: 3,
    angle: 0,
    enableRotation: false,
    margin: {
      left: 5,
      right: 5,
      top: 4,
      bottom: 4
    },
    font: {
      color: '#242424',
      fontFamily: 'Segoe UI',
      size: '12px',
      fontWeight: '600'
    }
  }
}
```

Set `enableRotation` to `true` when using a nonzero `angle`.

```typescript
marker: {
  dataLabel: {
    visible: true,
    enableRotation: true,
    angle: 45
  }
}
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

```typescript
import { Category, Chart, DataLabel, StackingColumnSeries } from '@syncfusion/ej2-charts';

Chart.Inject(StackingColumnSeries, Category, DataLabel);

interface SalesData {
  quarter: string;
  productA: number;
  productB: number;
  productC: number;
  productD: number;
  productE: number;
  productF: number;
}

const chartData: SalesData[] = [
  { quarter: 'Q1', productA: 1.1, productB: 1.2, productC: 1.1, productD: 1.2, productE: 1.1, productF: 1.2 },
  { quarter: 'Q2', productA: 1.2, productB: 1.1, productC: 1.2, productD: 1.1, productE: 1.2, productF: 1.1 },
  { quarter: 'Q3', productA: 1.1, productB: 1.1, productC: 1.2, productD: 1.2, productE: 1.1, productF: 1.2 },
  { quarter: 'Q4', productA: 1.2, productB: 1.2, productC: 1.1, productD: 1.1, productE: 1.2, productF: 1.1 }
];

const marker: Object = {
  dataLabel: {
    visible: true,
    position: 'Middle',
    format: 'Value: {value}',
    font: { size: '14px' },
    labelIntersectAction: 'RelocateVertically',
    smartLabelSettings: {
      background: '#ffffff',
      pointerShape: 'Arrow',
      border: { color: '#808080', width: 1, dashArray: '2,2' },
      connectorLineStyle: { color: '#808080', width: 1 },
      offset: 10
    }
  }
};

const chart: Chart = new Chart({
  title: 'Quarterly Sales',
  height: '260px',
  primaryXAxis: { valueType: 'Category', title: 'Quarter' },
  primaryYAxis: { title: 'Sales', minimum: 0, maximum: 8, interval: 1 },
  series: [
    { dataSource: chartData, type: 'StackingColumn', xName: 'quarter', yName: 'productA', name: 'Product A', marker: marker },
    { dataSource: chartData, type: 'StackingColumn', xName: 'quarter', yName: 'productB', name: 'Product B', marker: marker },
    { dataSource: chartData, type: 'StackingColumn', xName: 'quarter', yName: 'productC', name: 'Product C', marker: marker },
    { dataSource: chartData, type: 'StackingColumn', xName: 'quarter', yName: 'productD', name: 'Product D', marker: marker },
    { dataSource: chartData, type: 'StackingColumn', xName: 'quarter', yName: 'productE', name: 'Product E', marker: marker },
    { dataSource: chartData, type: 'StackingColumn', xName: 'quarter', yName: 'productF', name: 'Product F', marker: marker }
  ]
});

chart.appendTo('#chart');
```

To relocate overlapping data labels horizontally, set `labelIntersectAction` to `RelocateHorizontally`:

```typescript
const marker: Object = {
  dataLabel: {
    visible: true,
    position: 'Middle',
    labelIntersectAction: 'RelocateHorizontally',
    smartLabelSettings: {
      background: '#ffffff',
      pointerShape: 'Arrow',
      border: { color: '#808080', width: 1, dashArray: '2,2' },
      connectorLineStyle: { color: '#808080', width: 1 }
    }
  }
};
```

> **Note:** Smart data labels are supported only for the `StackingColumn`, `StackingColumn100`, `StackingBar`, and `StackingBar100` series. The `offset` property is applicable only when `labelIntersectAction` is set to `RelocateVertically`.

### Stack Labels

`stackLabels` is a Chart-level property. It must not be placed inside `marker.dataLabel`.

```typescript
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
```

Use these rules:

- `visible` must be `true`; using a stacking-series type alone does not display aggregate totals.
- `format` formats the aggregate stack value, not an individual segment value.
- `position` controls the supported stack-label position.
- `alignment` controls horizontal alignment within the stack-label region.
- `fill`, `border`, `font`, and `margin` configure stack-label appearance.
- `marker.dataLabel` renders individual segment values.
- `stackLabels` renders one aggregate label for the completed stack.

Inject the stacking module used by the chart, such as `StackingColumnSeries`, `StackingColumn100Series`, `StackingBarSeries`, `StackingBar100Series`, `StackingAreaSeries`, or `StackingLineSeries`. Inject `DataLabel` when individual segment labels are enabled.

#### Positive, Negative, and Zero Totals

- Positive stacks render their aggregate label at the resolved positive stack position.
- Negative stacks render their aggregate label at the resolved negative stack position.
- A zero-total category renders at the value-axis baseline.
- Zero totals include all-zero segments and positive and negative values that cancel each other.
- Null and undefined segment values must not produce an invalid aggregate total.

#### `textRender` Customization

Use `textRender` to modify or cancel stack-label text.

```typescript
textRender: (args: any): void => {
  if (args.text === '0') {
    args.text = 'No total';
  }
}
```

#### Complete TypeScript Stack-Label Example

```typescript
import {
  Category,
  Chart,
  DataLabel,
  Legend,
  StackingColumnSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(Category, DataLabel, Legend, StackingColumnSeries, Tooltip);

const productData: Object[] = [
  { quarter: 'Q1', value: 25 },
  { quarter: 'Q2', value: 0 },
  { quarter: 'Q3', value: 30 },
  { quarter: 'Q4', value: 10 }
];

const serviceData: Object[] = [
  { quarter: 'Q1', value: 20 },
  { quarter: 'Q2', value: 0 },
  { quarter: 'Q3', value: 22 },
  { quarter: 'Q4', value: -10 }
];

const chart: Chart = new Chart({
  title: 'Quarterly Revenue Totals',
  primaryXAxis: { valueType: 'Category' },
  primaryYAxis: { minimum: -20, maximum: 60, interval: 20 },
  legendSettings: { visible: true },
  tooltip: { enable: true },
  stackLabels: {
    visible: true,
    format: '${value}',
    position: 'Top',
    alignment: 'Center',
    fill: '#FFFFFF',
    border: { color: '#64748B', width: 1 },
    font: { color: '#0F172A', size: '12px', fontWeight: '600' },
    margin: { left: 5, right: 5, top: 3, bottom: 3 }
  },
  textRender: (args: any): void => {
    if (args.text === '0') {
      args.text = 'No total';
    }
  },
  series: [
    {
      dataSource: productData,
      type: 'StackingColumn',
      xName: 'quarter',
      yName: 'value',
      name: 'Products',
      marker: { dataLabel: { visible: true, position: 'Middle' } }
    },
    {
      dataSource: serviceData,
      type: 'StackingColumn',
      xName: 'quarter',
      yName: 'value',
      name: 'Services',
      marker: { dataLabel: { visible: true, position: 'Middle' } }
    }
  ]
});

chart.appendTo('#chart');
```


`stackLabels` is a Chart-level setting that displays aggregate totals for visible stacks. A stack resolving to zero renders its total at the value-axis baseline. This includes all-zero values, null or undefined values normalized to zero, and positive and negative values that cancel.

```ts
const stackLabels: Object = {
    visible: true,
    format: '${value}',
    fill: '#FFFFFF',
    border: { color: '#6B7280', width: 1 },
    font: { color: '#111827', size: '12px', fontWeight: '600' }
};
```


## Marker Customization

Markers are visual indicators rendered at the data points of compatible series. Set `marker.visible` to `true` to display them.

### Enable Markers

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'sales',
      type: 'Line',
      marker: {
        visible: true,
        width: 8,
        height: 8,
        shape: 'Circle'
      }
    }
  ]
});

chart.appendTo('#chart');
```



### Marker Styling

```typescript
marker: {
  visible: true,
  shape: 'Diamond',
  width: 12,
  height: 12,
  fill: '#FF5733',
  border: {
    color: '#FFFFFF',
    width: 2
  },
  opacity: 1
}
```

Ensure that marker colors have sufficient contrast against the chart background and series line.

### Marker Shapes

Common marker shapes include:

- `Circle`
- `Rectangle`
- `Triangle`
- `Diamond`
- `Cross`
- `Plus`
- `Star`
- `Pentagon`
- `HorizontalLine`
- `VerticalLine`
- `Image`

Use an exact marker-shape value supported by the installed package version.

### Custom Image Markers

Use `shape: 'Image'` with `imageUrl`.

```typescript
marker: {
  visible: true,
  shape: 'Image',
  imageUrl: '/assets/marker.png',
  width: 16,
  height: 16
}
```

The image must be available when the chart renders. Provide accessible supplementary information because the marker image itself should not be the only method used to communicate essential data.

## Stacking and Grouping

### Stacked Series

Stacked series place multiple values on top of one another for every category.

The `StackingColumnSeries` module must be injected for `StackingColumn` and `StackingColumn100` series.

```typescript
import {
  Category,
  Chart,
  Legend,
  StackingColumnSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  StackingColumnSeries,
  Category,
  Legend,
  Tooltip
);

interface StackedData {
  quarter: string;
  productA: number;
  productB: number;
  productC: number;
}

const chartData: StackedData[] = [
  {
    quarter: 'Q1',
    productA: 35,
    productB: 28,
    productC: 20
  },
  {
    quarter: 'Q2',
    productA: 42,
    productB: 32,
    productC: 24
  },
  {
    quarter: 'Q3',
    productA: 48,
    productB: 36,
    productC: 30
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  tooltip: {
    enable: true,
    shared: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'productA',
      type: 'StackingColumn',
      name: 'Product A'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'productB',
      type: 'StackingColumn',
      name: 'Product B'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'productC',
      type: 'StackingColumn',
      name: 'Product C'
    }
  ]
});

chart.appendTo('#chart');
```

### 100 Percent Stacked Series

Use the `100` series variant to normalize every category to 100 percent.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'productA',
    type: 'StackingColumn100',
    name: 'Product A'
  },
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'productB',
    type: 'StackingColumn100',
    name: 'Product B'
  }
]
```

A 100 percent stacked series displays the proportional contribution of every series rather than the absolute category total.

### Stacking Groups

Use `stackingGroup` to create separate stacks within the same category.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'productA',
    type: 'StackingColumn',
    name: 'Product A',
    stackingGroup: 'Current'
  },
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'productB',
    type: 'StackingColumn',
    name: 'Product B',
    stackingGroup: 'Current'
  },
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'previousA',
    type: 'StackingColumn',
    name: 'Previous Product A',
    stackingGroup: 'Previous'
  },
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'previousB',
    type: 'StackingColumn',
    name: 'Previous Product B',
    stackingGroup: 'Previous'
  }
]
```

Series with the same `stackingGroup` value are stacked together.

### Side-by-Side Series

Regular Column or Bar series are arranged side by side.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'sales',
    type: 'Column',
    name: 'Sales'
  },
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'revenue',
    type: 'Column',
    name: 'Revenue'
  }
]
```

Do not describe side-by-side Column series as stacked series.

### Column Width and Spacing

Use `columnWidth` to control relative column width and `columnSpacing` to control spacing between columns.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'quarter',
    yName: 'sales',
    type: 'Column',
    name: 'Sales',
    columnWidth: 0.7,
    columnSpacing: 0.1
  }
]
```

Use values appropriate for the number of visible series. Excessive spacing can make the columns difficult to compare.

## Empty Points

Data points with `null` or `undefined` Y-values are treated as empty points.

The supported empty-point modes are `Gap`, `Zero`, `Drop`, and `Average`. The default mode is `Gap`. There is no `Interpolate` empty-point mode in the EJ2 Chart API.

### Handling Missing Data

```typescript
interface MonthlyData {
  month: string;
  value: number | null | undefined;
}

const chartData: MonthlyData[] = [
  {
    month: 'Jan',
    value: 20
  },
  {
    month: 'Feb',
    value: null
  },
  {
    month: 'Mar',
    value: 30
  },
  {
    month: 'Apr',
    value: undefined
  },
  {
    month: 'May',
    value: 35
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'value',
      type: 'Line',
      emptyPointSettings: {
        mode: 'Gap',
        fill: '#CCCCCC',
        border: {
          color: '#999999',
          width: 1
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Empty Point Modes

#### Gap

Displays a gap for the empty point.

```typescript
emptyPointSettings: {
  mode: 'Gap'
}
```

#### Zero

Treats the empty point as zero.

```typescript
emptyPointSettings: {
  mode: 'Zero'
}
```

#### Drop

Ignores the empty point during rendering.

```typescript
emptyPointSettings: {
  mode: 'Drop'
}
```

#### Average

Uses the average of the previous and next points.

```typescript
emptyPointSettings: {
  mode: 'Average'
}
```

Do not use:

```typescript
emptyPointSettings: {
  mode: 'Interpolate'
}
```

### Empty Point Styling

Use `fill` and `border` to customize a rendered empty point.

```typescript
emptyPointSettings: {
  mode: 'Average',
  fill: '#CBCBCB',
  border: {
    color: '#808080',
    width: 2
  }
}
```

The `emptyPointSettings` object does not include a `visible` property.

Incorrect:

```typescript
emptyPointSettings: {
  mode: 'Gap',
  visible: false
}
```

To omit an empty point, use:

```typescript
emptyPointSettings: {
  mode: 'Drop'
}
```

## Common Configurations

### Sales Comparison Chart

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataLabel,
  Legend,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  DataLabel,
  Legend,
  Tooltip
);

interface SalesData {
  quarter: string;
  currentYear: number;
  previousYear: number;
}

const salesData: SalesData[] = [
  {
    quarter: 'Q1',
    currentYear: 42,
    previousYear: 35
  },
  {
    quarter: 'Q2',
    currentYear: 48,
    previousYear: 40
  },
  {
    quarter: 'Q3',
    currentYear: 52,
    previousYear: 46
  },
  {
    quarter: 'Q4',
    currentYear: 58,
    previousYear: 51
  }
];

const chart: Chart = new Chart({
  title: 'Annual Sales Comparison',
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  tooltip: {
    enable: true,
    shared: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  series: [
    {
      dataSource: salesData,
      xName: 'quarter',
      yName: 'currentYear',
      type: 'Column',
      name: '2026',
      cornerRadius: {
        topLeft: 3,
        topRight: 3,
        bottomLeft: 0,
        bottomRight: 0
      },
      marker: {
        dataLabel: {
          visible: true,
          position: 'Outer',
          format: '${point.y:n0}'
        }
      }
    },
    {
      dataSource: salesData,
      xName: 'quarter',
      yName: 'previousYear',
      type: 'Column',
      name: '2025',
      cornerRadius: {
        topLeft: 3,
        topRight: 3,
        bottomLeft: 0,
        bottomRight: 0
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use `legendSettings`, not `legend`.

### Multi-Axis Series

Use `yAxisName` to associate a series with a named axis.

```typescript
import {
  Chart,
  ColumnSeries,
  DateTime,
  Legend,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  ColumnSeries,
  DateTime,
  Legend,
  Tooltip
);

interface WeatherData {
  date: Date;
  temperature: number;
  humidity: number;
}

const chartData: WeatherData[] = [
  {
    date: new Date(2026, 0, 1),
    temperature: 28,
    humidity: 68
  },
  {
    date: new Date(2026, 0, 2),
    temperature: 30,
    humidity: 72
  },
  {
    date: new Date(2026, 0, 3),
    temperature: 29,
    humidity: 65
  }
];

const chart: Chart = new Chart({
  title: 'Temperature and Humidity',
  primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'dd MMM'
  },
  primaryYAxis: {
    name: 'TemperatureAxis',
    title: 'Temperature in Celsius'
  },
  axes: [
    {
      name: 'HumidityAxis',
      title: 'Humidity in Percent',
      opposedPosition: true,
      minimum: 0,
      maximum: 100,
      interval: 20,
      labelFormat: '{value}%'
    }
  ],
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  tooltip: {
    enable: true,
    shared: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'temperature',
      type: 'Line',
      yAxisName: 'TemperatureAxis',
      marker: {
        visible: true
      },
      name: 'Temperature'
    },
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'humidity',
      type: 'Column',
      yAxisName: 'HumidityAxis',
      name: 'Humidity',
      opacity: 0.6
    }
  ]
});

chart.appendTo('#chart');
```

Axis titles are strings.

Incorrect:

```typescript
axes: [
  {
    name: 'HumidityAxis',
    title: {
      text: 'Humidity'
    }
  }
]
```

Correct:

```typescript
axes: [
  {
    name: 'HumidityAxis',
    title: 'Humidity'
  }
]
```

### Real-Time Data with Markers

```typescript
import {
  Chart,
  DataLabel,
  DateTime,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  DateTime,
  DataLabel
);

interface RealTimeData {
  timestamp: Date;
  value: number;
}

let realTimeData: RealTimeData[] = [
  {
    timestamp: new Date(),
    value: 25
  }
];

const chart: Chart = new Chart({
  title: 'Real-Time Values',
  primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'HH:mm:ss'
  },
  series: [
    {
      dataSource: realTimeData,
      xName: 'timestamp',
      yName: 'value',
      type: 'Line',
      width: 2,
      marker: {
        visible: true,
        width: 6,
        height: 6,
        shape: 'Circle',
        dataLabel: {
          visible: true,
          position: 'Top',
          format: '${point.y:n2}',
          font: {
            size: '10px'
          }
        }
      }
    }
  ]
});

chart.appendTo('#chart');

const updateInterval: number =
  window.setInterval(() => {
    realTimeData = [
      ...realTimeData,
      {
        timestamp: new Date(),
        value:
          Math.round(
            (20 + Math.random() * 20) * 100
          ) / 100
      }
    ].slice(-20);

    chart.series[0].dataSource =
      realTimeData;

    chart.refresh();
  }, 5000);

window.addEventListener('beforeunload', () => {
  window.clearInterval(updateInterval);
  chart.destroy();
});
```

For frequent updates:

- Limit the number of retained points.
- Disable animation when necessary.
- Avoid displaying data labels for every point in a dense series.
- Update all required settings before calling `refresh()`.
- Clear intervals when the chart is destroyed.

## Troubleshooting

### Series Is Not Displayed

- Import and inject the module required by the series type.
- Ensure that `dataSource` contains valid records.
- Ensure that `xName` and `yName` match the data-source fields.
- Ensure that fields mapped through `yName` contain numeric values.
- Ensure that the chart container exists and has a valid height.
- Check the browser console for errors.

### Data Labels Are Not Displayed

- Import and inject `DataLabel`.
- Place `dataLabel` inside the series `marker`.
- Set `marker.dataLabel.visible` to `true`.
- Use a supported label position.
- Ensure that label text contrasts with its background.
- Increase the chart dimensions if labels are clipped.

### Data Label Position Is Incorrect

- Use `Top`, `Middle`, `Bottom`, `Outer`, or `Auto`.
- Use `Outer` only with compatible series such as Column and Bar.
- Do not use the Accumulation Chart values `Inside` or `Outside`.
- Ensure that positive and negative values have enough space for the selected placement.

### Data Label Template Is Not Displayed

- Inject `DataLabel`.
- Set `marker.dataLabel.visible` to `true`.
- Provide valid HTML in `template`.
- Use supported placeholders such as `${point.x}` and `${point.y}`.
- Ensure that application CSS does not hide the template.
- Do not insert unsanitized user content.

### Markers Are Not Displayed

- Set `marker.visible` to `true`.
- Use a series type that supports markers.
- Configure a positive marker width and height.
- Use a supported marker shape.
- Ensure that the marker fill contrasts with the series and background.

### Image Marker Is Not Displayed

- Set `marker.shape` to `Image`.
- Provide a valid `imageUrl`.
- Ensure that the image is accessible from the page.
- Check browser network and content-security-policy errors.
- Configure a positive marker width and height.

### Stacking Is Not Working

- Import and inject the appropriate stacking-series module.
- Use the same stacked series type for related series.
- Ensure that related series use compatible X-values.
- Use the same `stackingGroup` value for series that must be stacked together.
- Use the `100` variant when proportional stacking is required.

### Columns Are Not Grouped Correctly

- Use regular `Column` series for side-by-side rendering.
- Use `StackingColumn` for stacked rendering.
- Use `stackingGroup` for multiple independent stacks.
- Adjust `columnWidth` and `columnSpacing` carefully.
- Ensure that the X-values match across related series.

### Empty Points Are Not Handled Correctly

- Ensure that missing Y-values are `null` or `undefined`.
- Configure `emptyPointSettings`.
- Use `Gap`, `Zero`, `Drop`, or `Average`.
- Do not use `Interpolate`.
- Do not use an unsupported `visible` property.
- Use `Drop` when the empty point should be omitted.

### Multi-Axis Series Is Not Displayed

- Assign a unique `name` to every additional axis.
- Set the series `yAxisName` to the exact axis name.
- Ensure that the axis name casing matches.
- Configure `opposedPosition` when the additional axis should appear on the opposite side.
- Use a string for the axis `title`.

## Next Steps

- **Configure axes:** See `references/axes-customization.md`.
- **Add interaction:** See `references/features-interaction.md`.
- **Style appearance:** See `references/styling-appearance.md`.
- **Configure tooltips:** See `references/tooltip-configuration.md`.
- **Configure legends:** See `references/legend-configuration.md`.
- **Configure chart types:** See `references/chart-types.md`.