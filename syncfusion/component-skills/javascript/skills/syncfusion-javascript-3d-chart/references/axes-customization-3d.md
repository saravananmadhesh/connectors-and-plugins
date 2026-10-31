# Axes Customization for 3D Charts

## Table of Contents


- [Category Axis](#category-axis)
  - [Basic Category Axis](#basic-category-axis)
  - [Category Label Placement](#category-label-placement)
  - [Category Axis Range](#category-axis-range)
  - [Category Label Rotation](#category-label-rotation)
- [Numeric Axis](#numeric-axis)
  - [Basic Numeric Axis](#basic-numeric-axis)
  - [Numeric Axis Range](#numeric-axis-range)
  - [Numeric Range Padding](#numeric-range-padding)
- [DateTime Axis](#datetime-axis)
  - [Basic DateTime Axis](#basic-datetime-axis)
  - [DateTime Intervals](#datetime-intervals)
  - [DateTime Label Formatting](#datetime-label-formatting)
- [Logarithmic Axis](#logarithmic-axis)
  - [Basic Logarithmic Axis](#basic-logarithmic-axis)
  - [Logarithmic Range](#logarithmic-range)
  - [Logarithmic Base](#logarithmic-base)
- [Axis Labels and Formatting](#axis-labels-and-formatting)
  - [Numeric Label Formatting](#numeric-label-formatting)
  - [Axis Label Style](#axis-label-style)
  - [Axis Label Rotation](#axis-label-rotation)
  - [Axis Titles](#axis-titles)
- [Axis Lines Ticks and Grid Lines](#axis-lines-ticks-and-grid-lines)
  - [Axis Line Customization](#axis-line-customization)
  - [Major Tick Lines](#major-tick-lines)
  - [Major Grid Lines](#major-grid-lines)
- [Axis Positioning](#axis-positioning)
  - [Opposed Axis](#opposed-axis)
  - [Axis Label Position](#axis-label-position)
  - [Edge Label Placement](#edge-label-placement)
- [Practical Examples](#practical-examples)
  - [Sales Report with Custom Axes](#sales-report-with-custom-axes)
  - [DateTime Axis with Logarithmic Values](#datetime-axis-with-logarithmic-values)
- [Unsupported Axis Configurations](#unsupported-axis-configurations)
- [Troubleshooting](#troubleshooting)
  - [Category Axis Is Not Displayed](#category-axis-is-not-displayed)
  - [Numeric Axis Range Is Incorrect](#numeric-axis-range-is-incorrect)
  - [DateTime Axis Is Not Displayed](#datetime-axis-is-not-displayed)
  - [Logarithmic Axis Is Not Displayed](#logarithmic-axis-is-not-displayed)
  - [Axis Labels Are Overlapping](#axis-labels-are-overlapping)
  - [Edge Labels Are Clipped](#edge-labels-are-clipped)
  - [Axis Title Is Not Displayed](#axis-title-is-not-displayed)
  - [Grid Lines Are Not Displayed](#grid-lines-are-not-displayed)
  - [Multiple Axes Are Not Working](#multiple-axes-are-not-working)
- [Next Steps](#next-steps)


Configure the primary horizontal and vertical axes of the EJ2 3D Chart to control value types, ranges, intervals, labels, titles, grid lines, tick lines, and positioning.

The 3D Chart supports Category, Numeric, DateTime, and Logarithmic axis value types. A Category axis requires the `Category3D` module, a DateTime axis requires the `DateTime3D` module, and a Logarithmic axis requires the `Logarithmic3D` module.

## Category Axis

Use a Category axis when the X-values represent text-based categories such as months, countries, regions, departments, or product names.

Set `primaryXAxis.valueType` to `Category` and inject the `Category3D` module.

### Basic Category Axis

**TypeScript:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

const chart: Chart3D = new Chart3D({
  title: 'Monthly Sales',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Sales'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.Category3D
);

var chartData = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

var chart = new ej.charts.Chart3D({
  title: 'Monthly Sales',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Sales'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Category Label Placement

Use `labelPlacement` to position category labels on ticks or between ticks.

Category labels are positioned between ticks by default. Set `labelPlacement` to `OnTicks` to position them directly on tick marks.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelPlacement: 'OnTicks'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

The available category label placement values are:

- `BetweenTicks`
- `OnTicks`

### Category Axis Range

The range of a Category axis can be customized using `minimum`, `maximum`, and `interval`. The Category axis range is based on the point indexes.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    minimum: 1,
    maximum: 5,
    interval: 2
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

In this example:

- `minimum: 1` starts the visible range from the second category.
- `maximum: 5` ends the visible range at the corresponding category index.
- `interval: 2` displays labels at every second category interval.

### Category Label Rotation

Use `labelRotation` to rotate category labels when labels are long or closely spaced.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Region',
    labelRotation: -45,
    labelPlacement: 'BetweenTicks'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Use label rotation carefully because excessive rotation can reduce readability.

## Numeric Axis

Use a Numeric axis for continuous numeric values. The primary Y-axis uses a Numeric value type by default, so explicitly setting `valueType: 'Numeric'` is optional.

A separate axis module is not required for the Numeric value type.

### Basic Numeric Axis

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 10,
    title: 'Sales in Thousands'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Numeric Axis Range

Use `minimum`, `maximum`, and `interval` to define a fixed numeric range.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    minimum: 10,
    maximum: 500,
    interval: 50,
    title: 'Sales',
    edgeLabelPlacement: 'Shift'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Use a manually configured range only when a fixed scale is required. If the range is omitted, the 3D Chart calculates it from the series data.

### Numeric Range Padding

Use `rangePadding` to add or remove padding around the calculated numeric range.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 10,
    rangePadding: 'Additional',
    title: 'Sales'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common numeric range padding values include:

- `Auto`
- `None`
- `Normal`
- `Additional`
- `Round`

Range padding has limited effect when explicit `minimum` and `maximum` values are already configured.

## DateTime Axis

Use a DateTime axis when X-values are JavaScript `Date` objects.

Set `primaryXAxis.valueType` to `DateTime` and inject the `DateTime3D` module.

### Basic DateTime Axis

**TypeScript:**

```typescript
import {
  Chart3D,
  ColumnSeries3D,
  DateTime3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  DateTime3D
);

interface TimeSeriesData {
  date: Date;
  value: number;
}

const chartData: TimeSeriesData[] = [
  {
    date: new Date(2024, 0, 1),
    value: 21
  },
  {
    date: new Date(2024, 1, 1),
    value: 24
  },
  {
    date: new Date(2024, 2, 1),
    value: 36
  },
  {
    date: new Date(2024, 3, 1),
    value: 32
  },
  {
    date: new Date(2024, 4, 1),
    value: 40
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Monthly Performance',
  primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Months',
    interval: 1,
    labelFormat: 'MMM yyyy',
    title: 'Date'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Value'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.DateTime3D
);

var chartData = [
  {
    date: new Date(2024, 0, 1),
    value: 21
  },
  {
    date: new Date(2024, 1, 1),
    value: 24
  },
  {
    date: new Date(2024, 2, 1),
    value: 36
  },
  {
    date: new Date(2024, 3, 1),
    value: 32
  },
  {
    date: new Date(2024, 4, 1),
    value: 40
  }
];

var chart = new ej.charts.Chart3D({
  title: 'Monthly Performance',
  primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Months',
    interval: 1,
    labelFormat: 'MMM yyyy',
    title: 'Date'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Value'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### DateTime Intervals

Use `interval` and `intervalType` to control the spacing between DateTime axis labels.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Days',
    interval: 1,
    labelFormat: 'dd MMM',
    title: 'Date'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common DateTime interval types include:

- `Auto`
- `Years`
- `Months`
- `Days`
- `Hours`
- `Minutes`
- `Seconds`

Choose an interval type appropriate for the span and density of the data.

### DateTime Label Formatting

Use `labelFormat`, not `format`, to customize DateTime axis labels.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Months',
    interval: 1,
    labelFormat: 'MMM yyyy'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common DateTime label formats include:

- `MMM yyyy`
- `dd MMM`
- `dd/MM/yyyy`
- `MM/yy`
- `HH:mm`

The data source must contain valid `Date` objects or valid DateTime values that can be processed by the axis.

## Logarithmic Axis

Use a Logarithmic axis when values span multiple orders of magnitude.

Set the axis `valueType` to `Logarithmic` and inject `Logarithmic3D`. Logarithmic axes support custom ranges, intervals, and logarithmic bases.

A logarithmic axis cannot represent zero or negative values.

### Basic Logarithmic Axis

**TypeScript:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Logarithmic3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Logarithmic3D
);

interface GrowthData {
  category: string;
  value: number;
}

const chartData: GrowthData[] = [
  { category: 'A', value: 10 },
  { category: 'B', value: 100 },
  { category: 'C', value: 1000 },
  { category: 'D', value: 10000 }
];

const chart: Chart3D = new Chart3D({
  title: 'Exponential Growth',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Category'
  },
  primaryYAxis: {
    valueType: 'Logarithmic',
    logBase: 10,
    title: 'Logarithmic Value'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.Category3D,
  ej.charts.Logarithmic3D
);

var chartData = [
  { category: 'A', value: 10 },
  { category: 'B', value: 100 },
  { category: 'C', value: 1000 },
  { category: 'D', value: 10000 }
];

var chart = new ej.charts.Chart3D({
  title: 'Exponential Growth',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Category'
  },
  primaryYAxis: {
    valueType: 'Logarithmic',
    logBase: 10,
    title: 'Logarithmic Value'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Logarithmic Range

Use `minimum`, `maximum`, and `interval` to customize the Logarithmic axis range.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    valueType: 'Logarithmic',
    minimum: 10,
    maximum: 10000,
    interval: 1,
    logBase: 10,
    title: 'Logarithmic Value'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Ensure that:

- `minimum` is greater than zero.
- `maximum` is greater than `minimum`.
- Every value mapped through `yName` is greater than zero.

### Logarithmic Base

Use `logBase` to customize the base of the logarithmic scale. For example, a base of `2` creates values based on powers of two.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    valueType: 'Logarithmic',
    logBase: 2,
    title: 'Base 2 Logarithmic Scale'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Use a positive numeric value for `logBase`. Common values include `2`, `5`, and `10`.

## Axis Labels and Formatting

The X-axis and Y-axis labels can be customized using `labelFormat`, `labelStyle`, `labelRotation`, `labelPosition`, and `edgeLabelPlacement`.

### Numeric Label Formatting

Use `labelFormat` to add prefixes, suffixes, or numeric format specifiers to axis labels.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '${value}K',
    title: 'Revenue'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Examples include:

```typescript
primaryYAxis: {
  labelFormat: '{value}K'
}
```

```typescript
primaryYAxis: {
  labelFormat: '${value}'
}
```

```typescript
primaryYAxis: {
  labelFormat: '{value}%'
}
```

Do not use an axis-level `format` property for label formatting. Use `labelFormat`.

### Axis Label Style

Use `labelStyle` to customize the appearance of axis labels.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    labelStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '12px',
      fontStyle: 'Normal',
      fontWeight: '500'
    }
  },
  primaryYAxis: {
    labelStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '12px',
      fontStyle: 'Normal',
      fontWeight: '500'
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Axis Label Rotation

Use `labelRotation` to rotate labels when they overlap.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    labelRotation: -45
  },
  series: [
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common rotation values include:

- `0`
- `45`
- `-45`
- `90`
- `-90`

### Axis Titles

Use `title` to provide a descriptive axis title and `titleStyle` to customize its appearance.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    titleStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '14px',
      fontWeight: '600'
    }
  },
  primaryYAxis: {
    title: 'Sales in Millions',
    titleStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '14px',
      fontWeight: '600'
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

## Axis Lines Ticks and Grid Lines

Use `axisLine`, `majorTickLines`, and `majorGridLines` to customize the structural elements of an axis.

Do not use unsupported top-level axis properties such as `borderWidth` or `borderColor`.

### Axis Line Customization

Use `axisLine` to customize the axis line.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    axisLine: {
      color: '#666666',
      width: 1
    }
  },
  primaryYAxis: {
    axisLine: {
      color: '#666666',
      width: 1
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Major Tick Lines

Use `majorTickLines` to customize the major tick marks.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    majorTickLines: {
      color: '#808080',
      width: 1,
      height: 5
    }
  },
  primaryYAxis: {
    majorTickLines: {
      color: '#808080',
      width: 1,
      height: 5
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Major Grid Lines

Use `majorGridLines` to customize major grid lines.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    majorGridLines: {
      color: '#E0E0E0',
      width: 1
    }
  },
  primaryYAxis: {
    majorGridLines: {
      color: '#D0D0D0',
      width: 1
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Set `width` to `0` when a major grid line should not be displayed.

## Axis Positioning

### Opposed Axis

Use `opposedPosition` to display an axis on the opposite side of the chart.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    opposedPosition: true,
    title: 'Month'
  },
  primaryYAxis: {
    opposedPosition: true,
    title: 'Sales'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

For the primary Y-axis, `opposedPosition: true` moves the axis to the opposite side. For the primary X-axis, it moves the axis to the opposite horizontal position.

### Axis Label Position

Use `labelPosition` to display labels inside or outside the axis.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    labelPosition: 'Outside'
  },
  primaryYAxis: {
    labelPosition: 'Outside'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

The available values are:

- `Inside`
- `Outside`

### Edge Label Placement

Use `edgeLabelPlacement` to control labels that overlap the chart boundary.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    edgeLabelPlacement: 'Shift'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20,
    edgeLabelPlacement: 'Shift'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common edge label placement values include:

- `None`
- `Hide`
- `Shift`

## Practical Examples

### Sales Report with Custom Axes

The following complete TypeScript example includes a Category X-axis, a Numeric Y-axis, custom labels, axis titles, grid lines, and axis positioning.

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Legend3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Legend3D,
  Tooltip3D
);

interface SalesData {
  month: string;
  units: number;
  revenue: number;
}

const chartData: SalesData[] = [
  {
    month: 'Jan',
    units: 100,
    revenue: 50
  },
  {
    month: 'Feb',
    units: 120,
    revenue: 60
  },
  {
    month: 'Mar',
    units: 140,
    revenue: 75
  },
  {
    month: 'Apr',
    units: 130,
    revenue: 68
  },
  {
    month: 'May',
    units: 160,
    revenue: 84
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Sales Report',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelPlacement: 'BetweenTicks',
    labelRotation: -45,
    labelStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '12px'
    },
    axisLine: {
      color: '#666666',
      width: 1
    },
    majorTickLines: {
      color: '#808080',
      width: 1,
      height: 5
    }
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 180,
    interval: 20,
    title: 'Value',
    labelFormat: '{value}',
    edgeLabelPlacement: 'Shift',
    labelStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '12px'
    },
    majorGridLines: {
      color: '#D9D9D9',
      width: 1
    },
    axisLine: {
      color: '#666666',
      width: 1
    }
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'units',
      type: 'Column',
      name: 'Units',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
    }
  ]
});

chart.appendTo('#chart');
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>3D Chart Axis Customization</title>
</head>
<body>
  <div id="chart" style="height: 450px;"></div>
  <script src="index.js"></script>
</body>
</html>
```

### DateTime Axis with Logarithmic Values

The following example combines a DateTime X-axis and a Logarithmic Y-axis.

```typescript
import {
  Chart3D,
  ColumnSeries3D,
  DateTime3D,
  Logarithmic3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  DateTime3D,
  Logarithmic3D,
  Tooltip3D
);

interface GrowthData {
  date: Date;
  value: number;
}

const chartData: GrowthData[] = [
  {
    date: new Date(2024, 0, 1),
    value: 10
  },
  {
    date: new Date(2024, 0, 8),
    value: 100
  },
  {
    date: new Date(2024, 0, 15),
    value: 1000
  },
  {
    date: new Date(2024, 0, 22),
    value: 10000
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Exponential Growth',
  primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Days',
    interval: 7,
    labelFormat: 'dd MMM',
    title: 'Date'
  },
  primaryYAxis: {
    valueType: 'Logarithmic',
    logBase: 10,
    minimum: 10,
    maximum: 10000,
    interval: 1,
    title: 'Logarithmic Value'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Value: ${point.y}'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'value',
      type: 'Column',
      name: 'Growth'
    }
  ]
});

chart.appendTo('#chart');
```

A Logarithmic axis requires `Logarithmic3D`, while the DateTime axis requires `DateTime3D`. Every logarithmic value must be greater than zero.

## Unsupported Axis Configurations

The EJ2 3D Chart documentation should focus on `primaryXAxis` and `primaryYAxis`.

Do not document regular two-dimensional Chart configurations as supported 3D Chart features unless they have been specifically validated against the current 3D Chart API.

The following configurations should be removed from the original content:

- Secondary axes configured through an `axes` collection.
- Assigning a series to a secondary axis through `yAxisName`.
- Multiple chart rows configured through `rows`.
- Multiple chart columns configured through `columns`.
- Assigning a series to a pane through `rowIndex` or `columnIndex`.
- Multiple panes with separate axis scales.
- Axis scrolling or zooming described as an axis-range feature.

The original multiple-axis sales example is not appropriate for this 3D Chart topic. To compare two series with substantially different numeric scales, normalize the data, use comparable units, display separate 3D Charts, or use the regular EJ2 Chart when secondary axes are required.

## Troubleshooting

### Category Axis Is Not Displayed

- Import `Category3D` from `@syncfusion/ej2-charts`.
- Inject `Category3D` through `Chart3D.Inject(...)`.
- Set `primaryXAxis.valueType` to `Category`.
- Ensure that `xName` maps to the category field.
- Ensure that the category field contains valid values.
- Ensure that the chart container has a valid width and height.

### Numeric Axis Range Is Incorrect

- Verify that fields mapped through `yName` contain numbers.
- Set `minimum`, `maximum`, and `interval` only when a fixed range is required.
- Ensure that `minimum` is less than `maximum`.
- Ensure that `interval` is greater than zero.
- Remove explicit range values when automatic range calculation is preferred.
- Check whether `rangePadding` is affecting the calculated range.

### DateTime Axis Is Not Displayed

- Import and inject `DateTime3D`.
- Set `primaryXAxis.valueType` to `DateTime`.
- Ensure that the X-values are valid JavaScript `Date` objects.
- Ensure that `xName` maps to the DateTime field.
- Use `labelFormat`, not `format`, for DateTime axis labels.
- Set an appropriate `intervalType`.
- Ensure that the selected interval is appropriate for the data range.

### Logarithmic Axis Is Not Displayed

- Import and inject `Logarithmic3D`.
- Set the axis `valueType` to `Logarithmic`.
- Ensure that all values are greater than zero.
- Remove zero, negative, `null`, `undefined`, and `NaN` values.
- Use a positive `logBase`.
- Ensure that the configured minimum is greater than zero.
- Ensure that the maximum is greater than the minimum.

### Axis Labels Are Overlapping

- Increase the chart width or height.
- Use `labelRotation` to rotate labels.
- Reduce the font size through `labelStyle.size`.
- Increase the label interval.
- Use `labelPlacement: 'BetweenTicks'` for Category axes when appropriate.
- Reduce the number of visible categories.
- Shorten long category labels.
- Use a 3D Bar series when horizontal bars improve the readability of long category labels.

### Edge Labels Are Clipped

- Set `edgeLabelPlacement` to `Shift`.
- Increase the chart margin or container dimensions.
- Reduce the label font size.
- Rotate long labels.
- Verify that the chart is not hidden or constrained by its parent element.

### Axis Title Is Not Displayed

- Set the axis `title` property.
- Ensure that the title color contrasts with the background.
- Ensure that the chart has sufficient space.
- Use `titleStyle`, not `labelStyle`, to style the axis title.

### Grid Lines Are Not Displayed

- Configure `majorGridLines.width` with a value greater than zero.
- Ensure that the grid-line color is visible against the chart background.
- Do not use unsupported top-level properties such as `borderWidth` and `borderColor`.
- Use `axisLine`, `majorGridLines`, and `majorTickLines` for axis structure styling.

### Multiple Axes Are Not Working

- Do not use the regular Chart `axes` collection in this 3D Chart topic.
- Do not assign `yAxisName` to a 3D Chart series unless the exact behavior is validated against the targeted package version.
- Use `primaryXAxis` and `primaryYAxis` for supported 3D Chart axis configuration.
- Use separate 3D Charts or the regular EJ2 Chart when independent scales are required.

## Next Steps

- **Chart types:** See `chart-types-3d.md`.
- **Interactions:** See `interaction-features-3d.md`.
- **Styling:** See `appearance-and-styling.md`.
- **Data handling:** See `data-and-performance.md`.
