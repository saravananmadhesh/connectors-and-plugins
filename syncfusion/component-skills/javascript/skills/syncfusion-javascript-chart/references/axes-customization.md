# Axes Customization

## Table of Contents

- [Axes Customization](#axes-customization)
  - [Overview](#overview)
  - [Module Injection](#module-injection)
  - [Axis Types](#axis-types)
    - [Numeric Axis](#numeric-axis)
    - [Category Axis](#category-axis)
    - [DateTime Axis](#datetime-axis)
    - [DateTimeCategory Axis](#datetimecategory-axis)
    - [Logarithmic Axis](#logarithmic-axis)
  - [Axis Labels and Formatting](#axis-labels-and-formatting)
    - [Label Format](#label-format)
    - [Custom Label Formatting](#custom-label-formatting)
    - [Label Styling](#label-styling)
    - [Label Rotation and Overlap](#label-rotation-and-overlap)
    - [Edge Label Placement](#edge-label-placement)
  - [Axis Ranges and Scaling](#axis-ranges-and-scaling)
    - [Explicit Axis Range](#explicit-axis-range)
    - [Automatic Axis Range](#automatic-axis-range)
    - [Range Padding](#range-padding)
    - [Inversed Axis](#inversed-axis)
  - [Multiple Axes](#multiple-axes)
    - [Secondary Y-Axis](#secondary-y-axis)
    - [Secondary X-Axis](#secondary-x-axis)
    - [Multiple Chart Panes](#multiple-chart-panes)
  - [Advanced Customization](#advanced-customization)
    - [Axis Title](#axis-title)
    - [Grid Lines](#grid-lines)
    - [Tick Lines](#tick-lines)
    - [Strip Lines](#strip-lines)
    - [Axis Line](#axis-line)
  - [Common Configurations](#common-configurations)
    - [DateTime Axis with Formatting](#datetime-axis-with-formatting)
    - [Logarithmic Scale](#logarithmic-scale)
    - [Dual-Axis Comparison](#dual-axis-comparison)
    - [Category Axis with Long Labels](#category-axis-with-long-labels)
  - [Complete TypeScript Example](#complete-typescript-example)


## Overview

The EJ2 Chart supports numeric, Category, DateTime, DateTimeCategory, and Logarithmic axes. It also supports multiple axes, axis inversion, custom ranges, label formatting, smart label arrangement, multiple chart panes, and strip lines.

The Chart uses numeric axes by default. Additional axis modules must be injected when Category, DateTime, DateTimeCategory, or Logarithmic axes are configured.

## Module Injection

Import and inject the modules required by the configured series and axis types.

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DateTime,
  DateTimeCategory,
  LineSeries,
  Logarithmic,
  StripLine
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  ColumnSeries,
  Category,
  DateTime,
  DateTimeCategory,
  Logarithmic,
  StripLine
);
```

The modules provide:

- `Category` for Category axes.
- `DateTime` for DateTime axes.
- `DateTimeCategory` for DateTimeCategory axes.
- `Logarithmic` for Logarithmic axes.
- `StripLine` for axis strip lines.
- `LineSeries` for Line series.
- `ColumnSeries` for Column series.

Inject only the modules used by the chart.

## Axis Types

### Numeric Axis

A numeric axis displays continuous numeric values.

The primary Y-axis is numeric by default, so `valueType` can normally be omitted.

```typescript
primaryYAxis: {
  minimum: 0,
  maximum: 100,
  interval: 10,
  title: 'Value'
}
```

An explicit numeric axis can use:

```typescript
primaryXAxis: {
  valueType: 'Double',
  minimum: 0,
  maximum: 100,
  interval: 10,
  title: 'Measurement'
}
```

Use numeric axes for:

- Measurements.
- Quantities.
- Percentages.
- Coordinates.
- Continuous numeric ranges.

The primary properties are:

- `minimum`: Specifies the lowest axis value.
- `maximum`: Specifies the highest axis value.
- `interval`: Specifies the interval between labels.
- `title`: Specifies the axis title.
- `isInversed`: Reverses the axis direction.
- `rangePadding`: Controls space added around the calculated range.

Use a string for the axis title.

Incorrect:

```typescript
primaryYAxis: {
  title: {
    text: 'Value'
  }
}
```

Correct:

```typescript
primaryYAxis: {
  title: 'Value'
}
```

### Category Axis

A Category axis displays discrete string values.

Inject `Category` before using `valueType: 'Category'`.

```typescript
import {
  Category,
  Chart,
  ColumnSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category
);
```

Configure the axis:

```typescript
primaryXAxis: {
  valueType: 'Category',
  labelPlacement: 'OnTicks',
  title: 'Month'
}
```

Supported label placements include:

- `OnTicks`
- `BetweenTicks`

Category labels are normally obtained from the field mapped through the series `xName`.

```typescript
interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
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
    sales: 42
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category',
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

Do not configure an unverified `categories` collection on the axis. Bind category values through the series data source and `xName`.

### DateTime Axis

A DateTime axis displays continuous date and time values.

Inject `DateTime` before configuring the axis.

```typescript
import {
  Chart,
  DateTime,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  DateTime
);
```

Example:

```typescript
interface SalesData {
  date: Date;
  sales: number;
}

const chartData: SalesData[] = [
  {
    date: new Date(2026, 0, 1),
    sales: 35
  },
  {
    date: new Date(2026, 0, 2),
    sales: 42
  },
  {
    date: new Date(2026, 0, 3),
    sales: 38
  }
];

const chart: Chart = new Chart({
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
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Common interval types include:

- `Years`
- `Months`
- `Days`
- `Hours`
- `Minutes`
- `Seconds`
- `Auto`

Use valid JavaScript `Date` objects for DateTime values.

### DateTimeCategory Axis

A DateTimeCategory axis treats date values as discrete categories and removes unused intervals between the supplied points.

Inject `DateTimeCategory` before using it.

```typescript
import {
  Chart,
  DateTimeCategory,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  DateTimeCategory
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'DateTimeCategory',
    labelFormat: 'dd MMM',
    title: 'Trading Date'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Use DateTimeCategory when omitted dates should not create visible gaps, such as weekends in financial data.

### Logarithmic Axis

A Logarithmic axis is useful when values span several orders of magnitude.

Inject `Logarithmic` before configuring the axis.

```typescript
import {
  Chart,
  LineSeries,
  Logarithmic
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Logarithmic
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryYAxis: {
    valueType: 'Logarithmic',
    logBase: 10,
    minimum: 1,
    maximum: 100000,
    title: 'Value'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Use logarithmic axes for:

- Scientific measurements.
- Exponential growth.
- Values spanning several orders of magnitude.
- Financial values with a very large range.

A Logarithmic axis cannot represent zero or negative values. Filter or transform incompatible values before binding them.

## Axis Labels and Formatting

### Label Format

Use `labelFormat` to add prefixes, suffixes, or supported number and DateTime formatting.

Suffix example:

```typescript
primaryYAxis: {
  labelFormat: '{value}%'
}
```

Currency example:

```typescript
primaryYAxis: {
  labelFormat: 'C0'
}
```

Number format example:

```typescript
primaryYAxis: {
  labelFormat: 'N2'
}
```

DateTime example:

```typescript
primaryXAxis: {
  valueType: 'DateTime',
  labelFormat: 'dd MMM'
}
```

Custom prefix and suffix example:

```typescript
primaryYAxis: {
  labelFormat: '₹{value}K'
}
```

Use `{value}` when inserting the calculated axis value into custom text.

Do not use JavaScript template interpolation such as `${value}` in an axis label format.

Incorrect:

```typescript
primaryYAxis: {
  labelFormat: '${value}K'
}
```

Correct:

```typescript
primaryYAxis: {
  labelFormat: '₹{value}K'
}
```

### Custom Label Formatting

The `labelFormat` property accepts a formatting string, not a callback function.

Use the chart-level `axisLabelRender` event when conditional label text is required.

```typescript
import {
  AxisLabelRenderEventArgs,
  Chart,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(LineSeries);

const chart: Chart = new Chart({
  axisLabelRender: (
    args: AxisLabelRenderEventArgs
  ): void => {
    if (
      args.axis.name === 'primaryYAxis' &&
      typeof args.value === 'number'
    ) {
      args.text =
        args.value >= 1000
          ? `${args.value / 1000}K`
          : String(args.value);
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Do not assign a function to `labelFormat`.

Incorrect:

```typescript
primaryYAxis: {
  labelFormat: (args: any) => {
    return String(args.value);
  }
}
```

### Label Styling

Use `labelStyle` to customize axis-label text.

```typescript
primaryXAxis: {
  labelStyle: {
    size: '14px',
    color: '#333333',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '600'
  }
}
```

Use `fontWeight`, not `weight`.

### Label Rotation and Overlap

Use `labelRotation` to apply a fixed angle.

```typescript
primaryXAxis: {
  labelRotation: 45
}
```

Use `labelIntersectAction` to control overlapping labels.

```typescript
primaryXAxis: {
  labelIntersectAction: 'Rotate45'
}
```

Common overlap actions include:

- `None`
- `Hide`
- `Trim`
- `Wrap`
- `MultipleRows`
- `Rotate45`
- `Rotate90`

`Hide`, `Rotate45`, and `Rotate90` can be used to improve readability when labels overlap.

Do not configure both `labelRotation: 90` and `labelIntersectAction: 'Rotate45'` unless the interaction between the two settings is intentional.

Use `labelPadding` to control the space between the label and the axis.

```typescript
primaryXAxis: {
  labelPadding: 10
}
```

#### Supported Axis Actions

- `None`: Leaves labels unchanged, even when they overlap.
- `Hide`: Hides labels that collide with previously rendered labels.
- `Trim`: Trims intersecting labels and displays an ellipsis.
- `Wrap`: Wraps intersecting labels into multiple lines.
- `MultipleRows`: Moves colliding horizontal-axis labels into additional rows.
- `Rotate45`: Rotates intersecting labels by 45 degrees.
- `Rotate90`: Rotates intersecting labels by 90 degrees.
- `Rotate45WithTrim`: Rotates labels by 45 degrees and trims text outside the available label width.
- `Rotate90WithTrim`: Rotates labels by 90 degrees and trims text outside the available label width.


Use `Trim`, `Wrap`, `Rotate45WithTrim`, or `Rotate90WithTrim` when the label area must remain predictable.

```typescript
primaryXAxis: {
  valueType: 'Category',
  labelIntersectAction: 'Wrap',
  maximumLabelWidth: 80
}
```

#### Fixed Rotation Versus Intersection-Based Rotation

Use `labelRotation` when every label must use a fixed angle regardless of collision.

```typescript
primaryXAxis: {
  labelRotation: 45
}
```

Use `labelIntersectAction` when rotation or trimming should occur only as part of overlap handling.

```typescript
primaryXAxis: {
  labelIntersectAction: 'Rotate45'
}
```

Do not combine contradictory values unless their interaction is intentional.

#### Required Chart Modules

Axis label intersection does not require a dedicated module. Inject:

- The module required by the axis value type, such as `Category`, `DateTime`, `DateTimeCategory`, or `Logarithmic`.
- The module required by each rendered series type.

```typescript
import { Category, Chart, ColumnSeries } from '@syncfusion/ej2-charts';

Chart.Inject(Category, ColumnSeries);
```

#### Complete TypeScript Example

```typescript
import { Category, Chart, ColumnSeries, Tooltip } from '@syncfusion/ej2-charts';

Chart.Inject(Category, ColumnSeries, Tooltip);

interface DepartmentRevenue {
  department: string;
  revenue: number;
}

const chartData: DepartmentRevenue[] = [
  { department: 'Consumer Electronics and Accessories', revenue: 72 },
  { department: 'Home Furniture and Interior Products', revenue: 58 },
  { department: 'Sports Equipment and Outdoor Recreation', revenue: 64 },
  { department: 'Personal Care and Beauty Products', revenue: 49 },
  { department: 'Books, Education and Office Supplies', revenue: 55 },
  { department: 'Automotive Parts and Maintenance', revenue: 46 }
];

const chart: Chart = new Chart({
  title: 'Department Revenue',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Department',
    labelIntersectAction: 'Rotate45',
    maximumLabelWidth: 100,
    majorGridLines: { width: 0 }
  },
  primaryYAxis: {
    title: 'Revenue',
    minimum: 0,
    maximum: 80,
    interval: 20,
    labelFormat: '${value}M'
  },
  tooltip: { enable: true },
  series: [{
    dataSource: chartData,
    type: 'Column',
    xName: 'department',
    yName: 'revenue',
    name: 'Revenue'
  }]
});

chart.appendTo('#chart');
```


### Rotate Axis Labels with Trimming

`labelIntersectAction` supports two additional axis-label actions:

- `Rotate45WithTrim`: Rotates intersecting labels by 45 degrees and trims text exceeding the available label bounds.
- `Rotate90WithTrim`: Rotates intersecting labels by 90 degrees and trims text exceeding the available label bounds.

#### TypeScript

```ts
import { Category, Chart, ColumnSeries } from '@syncfusion/ej2-charts';

Chart.Inject(Category, ColumnSeries);

const chart: Chart = new Chart({
    primaryXAxis: {
        valueType: 'Category',
        labelIntersectAction: 'Rotate45WithTrim'
    },
    series: [{
        type: 'Column',
        dataSource: [
            { department: 'Consumer Electronics and Accessories', revenue: 72 },
            { department: 'Home Furniture and Interior Products', revenue: 58 },
            { department: 'Sports Equipment and Outdoor Recreation', revenue: 64 }
        ],
        xName: 'department',
        yName: 'revenue'
    }]
});
chart.appendTo('#chart');
```

#### JavaScript

```js
var chart = new ej.charts.Chart({
    primaryXAxis: {
        valueType: 'Category',
        labelIntersectAction: 'Rotate90WithTrim'
    },
    series: [{
        type: 'Column',
        dataSource: [
            { department: 'Consumer Electronics and Accessories', revenue: 72 },
            { department: 'Home Furniture and Interior Products', revenue: 58 },
            { department: 'Sports Equipment and Outdoor Recreation', revenue: 64 }
        ],
        xName: 'department',
        yName: 'revenue'
    }]
});
chart.appendTo('#chart');
```

The JavaScript global-bundle sample requires no imports or `Chart.Inject(...)` call.

### Edge Label Placement

Use `edgeLabelPlacement` when the first or last label is clipped.

```typescript
primaryXAxis: {
  edgeLabelPlacement: 'Shift'
}
```

Common values include:

- `None`
- `Hide`
- `Shift`

Use `desiredIntervals` to suggest the number of visible axis intervals.

```typescript
primaryXAxis: {
  desiredIntervals: 5
}
```

The final interval count may vary based on the available chart size and axis range.



## Axis Scrollbar

A Chart scrollbar has two related configurations:

- `zoomSettings.enableScrollbar` enables the standard scrollbar that follows the Chart zoom state.
- `axis.scrollbarSettings` controls axis-specific appearance, placement, lazy-load range, and zoom behavior.

### Required Modules

Inject `ScrollBar` for the scrollbar and `Zoom` when scrolling participates in zooming or panning. Also inject the modules required by the rendered series and axis value type.

```typescript
import {
  Category,
  Chart,
  LineSeries,
  ScrollBar,
  Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(Category, LineSeries, ScrollBar, Zoom);
```

### Standard Scrollbar with Zooming

```typescript
zoomSettings: {
  enableScrollbar: true,
  enableSelectionZooming: true,
  enableMouseWheelZooming: true,
  enablePan: true,
  mode: 'X'
}
```

### Axis Scrollbar Settings

```typescript
primaryXAxis: {
  valueType: 'Category',
  zoomFactor: 0.5,
  zoomPosition: 0,
  scrollbarSettings: {
    enable: true,
    height: 16,
    enableZoom: true,
    position: 'PlaceNextToAxisLine',
    scrollbarRadius: 4,
    trackRadius: 4,
    scrollbarColor: '#6B7280',
    trackColor: '#E5E7EB',
    gripColor: '#FFFFFF'
  }
}
```

### Styling, Placement, and Zoom Behavior

- `enable`: Enables an axis scrollbar for lazy-loading workflows.
- `height`: Sets scrollbar thickness. Use `12` or greater when the grip-circle visual and grab cursor are required.
- `enableZoom`: Enables thumb resizing, arrows, and scrollbar wheel zoom. Set it to `false` for pan-only behavior.
- `position`: Use `Top` or `Bottom` for horizontal axes, `Left` or `Right` for vertical axes, or `PlaceNextToAxisLine` for axis-relative placement.
- `scrollbarColor`: Sets the thumb color.
- `trackColor`: Sets the track color.
- `gripColor`: Sets the grip-circle color.
- `scrollbarRadius`: Sets the thumb corner radius.
- `trackRadius`: Sets the track corner radius.

### DateTime Lazy-Load Range

Use `range` to define the complete DateTime range and use the axis `minimum` and `maximum` values for the initially visible range. Inject `DateTime`.

```typescript
primaryXAxis: {
  valueType: 'DateTime',
  minimum: new Date(2025, 0, 1),
  maximum: new Date(2025, 2, 31),
  scrollbarSettings: {
    enable: true,
    range: {
      minimum: new Date(2024, 0, 1),
      maximum: new Date(2026, 11, 31)
    },
    enableZoom: true,
    height: 16
  }
}
```

### Numeric and Logarithmic `pointsLength`

Use `pointsLength` to represent the complete logical data length for numeric or logarithmic lazy-loading workflows.

```typescript
primaryXAxis: {
  minimum: 0,
  maximum: 100,
  scrollbarSettings: {
    enable: true,
    pointsLength: 1000,
    enableZoom: false,
    height: 16
  }
}
```

### Scroll Events

- `scrollStart`: Fires once when a scrollbar interaction starts.
- `scrollChanged`: Fires continuously while the visible range changes.
- `scrollEnd`: Fires after the final range is resolved and is suitable for lazy loading.

```typescript
const chart: Chart = new Chart({
  scrollStart: (args: Object): void => {
    console.log('Scroll started', args);
  },
  scrollChanged: (args: Object): void => {
    console.log('Scroll changed', args);
  },
  scrollEnd: (args: Object): void => {
    console.log('Scroll ended', args);
  }
});
```

### Complete TypeScript Example

```typescript
import {
  Category,
  Chart,
  LineSeries,
  ScrollBar,
  Tooltip,
  Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(Category, LineSeries, ScrollBar, Tooltip, Zoom);

interface MonthlySales {
  month: string;
  sales: number;
}

const chartData: MonthlySales[] = [
  { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
  { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
  { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
  { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
];

const chart: Chart = new Chart({
  title: 'Monthly Sales with Scrollbar',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    zoomFactor: 0.5,
    zoomPosition: 0,
    scrollbarSettings: {
      enable: true,
      height: 16,
      enableZoom: true,
      position: 'PlaceNextToAxisLine',
      scrollbarRadius: 4,
      trackRadius: 4,
      scrollbarColor: '#6B7280',
      trackColor: '#E5E7EB',
      gripColor: '#FFFFFF'
    }
  },
  primaryYAxis: {
    title: 'Sales',
    minimum: 0,
    maximum: 60,
    interval: 10
  },
  zoomSettings: {
    enableScrollbar: true,
    enableSelectionZooming: true,
    enableMouseWheelZooming: true,
    enablePan: true,
    mode: 'X'
  },
  tooltip: { enable: true },
  scrollStart: (args: Object): void => console.log('Scroll started', args),
  scrollChanged: (args: Object): void => console.log('Scroll changed', args),
  scrollEnd: (args: Object): void => console.log('Scroll ended', args),
  series: [{
    dataSource: chartData,
    type: 'Line',
    xName: 'month',
    yName: 'sales',
    name: 'Sales'
  }]
});

chart.appendTo('#chart');
```


## Axis Ranges and Scaling

### Explicit Axis Range

Set `minimum`, `maximum`, and `interval` to define an explicit range.

```typescript
primaryYAxis: {
  minimum: 0,
  maximum: 100,
  interval: 20
}
```

Ensure that:

- `minimum` is less than `maximum`.
- `interval` is greater than zero.
- The configured range includes the values that should be visible.

### Automatic Axis Range

Omit `minimum`, `maximum`, and `interval` to allow the Chart to calculate them.

```typescript
primaryYAxis: {
  title: 'Sales'
}
```

Do not assign the string `auto` to `interval`.

Incorrect:

```typescript
primaryYAxis: {
  interval: 'auto'
}
```

Correct:

```typescript
primaryYAxis: {
  title: 'Sales'
}
```

Explicit `null` values are normally unnecessary. Omit properties that should use automatic calculation.

### Range Padding

Use `rangePadding` to control additional space around the calculated numeric range.

```typescript
primaryYAxis: {
  rangePadding: 'Additional'
}
```

Common values include:

- `None`
- `Normal`
- `Additional`
- `Round`
- `Auto`

The effect depends on the axis type and series configuration.

### Inversed Axis

Set `isInversed` to `true` to reverse an axis.

```typescript
primaryYAxis: {
  isInversed: true
}
```

For a vertical axis, this reverses the direction of increasing values.

For a horizontal axis, it reverses the left-to-right value order.

## Multiple Axes

Use the chart-level `axes` collection to configure additional axes.

Associate a series with an additional axis through:

- `xAxisName`
- `yAxisName`

The configured name must match exactly.

### Secondary Y-Axis

Use an additional Y-axis when series have different units or significantly different scales.

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Sales in Thousands',
    labelFormat: '₹{value}K'
  },
  axes: [
    {
      name: 'UnitsAxis',
      title: 'Units',
      opposedPosition: true,
      labelFormat: '{value}%'
    }
  ],
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'units',
      type: 'Line',
      yAxisName: 'UnitsAxis',
      name: 'Units'
    }
  ]
});

chart.appendTo('#chart');
```

Use a string for `title`.

### Secondary X-Axis

Use `xAxisName` to associate a series with an additional X-axis.

```typescript
interface HourlyData {
  hour: number;
  value1: number;
}

interface IntervalData {
  interval: number;
  value2: number;
}

const chartData: HourlyData[] = [
  {
    hour: 1,
    value1: 20
  },
  {
    hour: 2,
    value1: 28
  },
  {
    hour: 3,
    value1: 24
  },
  {
    hour: 4,
    value1: 35
  }
];

const intervalData: IntervalData[] = [
  {
    interval: 10,
    value2: 18
  },
  {
    interval: 20,
    value2: 26
  },
  {
    interval: 30,
    value2: 22
  },
  {
    interval: 40,
    value2: 32
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    title: 'Time in Hours'
  },
  primaryYAxis: {
    title: 'Value'
  },
  axes: [
    {
      name: 'IntervalsAxis',
      opposedPosition: true,
      title: 'Intervals'
    }
  ],
  series: [
    {
      dataSource: chartData,
      xName: 'hour',
      yName: 'value1',
      type: 'Line',
      name: 'Hourly Values'
    },
    {
      dataSource: intervalData,
      xName: 'interval',
      yName: 'value2',
      type: 'Line',
      xAxisName: 'IntervalsAxis',
      name: 'Interval Values'
    }
  ]
});

chart.appendTo('#chart');
```

Set `opposedPosition` to `true` to render the additional horizontal axis at the top.

### Multiple Chart Panes

Use `rows` and an axis `rowIndex` to place series in separate horizontal panes.

```typescript
const chart: Chart = new Chart({
  rows: [
    {
      height: '50%'
    },
    {
      height: '50%'
    }
  ],
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    title: 'Sales',
    rowIndex: 0
  },
  axes: [
    {
      name: 'RevenueAxis',
      title: 'Revenue',
      rowIndex: 1
    }
  ],
  series: [
    {
      dataSource: salesData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    },
    {
      dataSource: revenueData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      yAxisName: 'RevenueAxis',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

Use `columns` and `columnIndex` when vertical chart panes are required.

## Advanced Customization

### Axis Title

Use `title` for the axis title and `titleStyle` for its appearance.

```typescript
primaryXAxis: {
  title: 'Sales Categories',
  titleStyle: {
    size: '16px',
    fontFamily: 'Arial',
    fontWeight: '600',
    color: '#333333'
  }
}
```

Y-axis example:

```typescript
primaryYAxis: {
  title: 'Revenue in Thousands',
  titleStyle: {
    size: '14px',
    fontFamily: 'Segoe UI',
    color: '#333333'
  }
}
```

Do not configure the title as a nested object containing `text` and `style`.

Incorrect:

```typescript
primaryXAxis: {
  title: {
    text: 'Sales Categories',
    style: {
      size: '16px'
    }
  }
}
```

Correct:

```typescript
primaryXAxis: {
  title: 'Sales Categories',
  titleStyle: {
    size: '16px'
  }
}
```

### Grid Lines

Use `majorGridLines` and `minorGridLines` to customize grid lines.

```typescript
primaryYAxis: {
  majorGridLines: {
    width: 1,
    color: '#E0E0E0',
    dashArray: '5,5'
  },
  minorTicksPerInterval: 4,
  minorGridLines: {
    width: 0.5,
    color: '#F0F0F0',
    dashArray: '2,2'
  }
}
```

Set `minorTicksPerInterval` to a value greater than zero when minor ticks and minor grid lines are required.

To hide major grid lines:

```typescript
primaryXAxis: {
  majorGridLines: {
    width: 0
  }
}
```

### Tick Lines

Use `majorTickLines` and `minorTickLines`.

```typescript
primaryXAxis: {
  majorTickLines: {
    width: 1,
    height: 5,
    color: '#808080'
  },
  minorTicksPerInterval: 4,
  minorTickLines: {
    width: 1,
    height: 3,
    color: '#A0A0A0'
  }
}
```

Use `height`, not `size`, for tick-line length.

### Strip Lines

Strip lines highlight ranges along an axis.

Import and inject `StripLine` before configuring them. Strip lines can be applied to horizontal and vertical axes and require `visible: true`.

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  StripLine
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  StripLine
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20,
    stripLines: [
      {
        start: 60,
        end: 80,
        visible: true,
        color: '#E0F2F1',
        opacity: 0.6,
        text: 'Target Range',
        zIndex: 'Behind'
      }
    ]
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

A strip line on the Y-axis produces a horizontal highlighted range.

A strip line on the X-axis produces a vertical highlighted range.

### Axis Line

Use `lineStyle` to customize the axis line.

```typescript
primaryXAxis: {
  lineStyle: {
    width: 2,
    color: '#333333'
  },
  opposedPosition: false
}
```

Set `opposedPosition` to `true` to move:

- A horizontal axis to the top.
- A vertical axis to the right.

## Common Configurations

### DateTime Axis with Formatting

```typescript
primaryXAxis: {
  valueType: 'DateTime',
  intervalType: 'Days',
  interval: 1,
  labelFormat: 'dd MMM',
  labelRotation: 45,
  edgeLabelPlacement: 'Shift',
  title: 'Date'
},
primaryYAxis: {
  minimum: 0,
  interval: 50,
  labelFormat: '₹{value}K',
  title: 'Sales Revenue'
}
```

Inject `DateTime` when this configuration is used.

### Logarithmic Scale

```typescript
primaryYAxis: {
  valueType: 'Logarithmic',
  logBase: 10,
  minimum: 1,
  maximum: 100000,
  title: 'Measurement'
}
```

Inject `Logarithmic`.

Ensure that the bound values are greater than zero.

### Dual-Axis Comparison

```typescript
primaryXAxis: {
  valueType: 'Category',
  title: 'Month'
},
primaryYAxis: {
  title: 'Temperature in Celsius',
  labelFormat: '{value}°'
},
axes: [
  {
    name: 'HumidityAxis',
    opposedPosition: true,
    title: 'Humidity in Percent',
    labelFormat: '{value}%'
  }
],
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'temperature',
    type: 'Line',
    name: 'Temperature'
  },
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'humidity',
    type: 'Column',
    yAxisName: 'HumidityAxis',
    name: 'Humidity'
  }
]
```

### Category Axis with Long Labels

```typescript
primaryXAxis: {
  valueType: 'Category',
  labelIntersectAction: 'Rotate45',
  edgeLabelPlacement: 'Shift',
  title: 'Product'
}
```

Category labels are taken from the field mapped through `xName`.

Do not configure an unverified `categories` collection.

## Complete TypeScript Example

```typescript
import {
  AxisLabelRenderEventArgs,
  Category,
  Chart,
  ColumnSeries,
  Legend,
  LineSeries,
  StripLine,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  StripLine
);

interface BusinessData {
  month: string;
  revenue: number;
  growth: number;
}

const chartData: BusinessData[] = [
  {
    month: 'January',
    revenue: 45,
    growth: 12
  },
  {
    month: 'February',
    revenue: 58,
    growth: 18
  },
  {
    month: 'March',
    revenue: 72,
    growth: 22
  },
  {
    month: 'April',
    revenue: 68,
    growth: 19
  },
  {
    month: 'May',
    revenue: 84,
    growth: 27
  }
];

const chart: Chart = new Chart({
  title: 'Revenue and Growth',
  width: '100%',
  height: '440px',
  axisLabelRender: (
    args: AxisLabelRenderEventArgs
  ): void => {
    if (
      args.axis.name === 'primaryYAxis' &&
      typeof args.value === 'number'
    ) {
      args.text = `₹${args.value}K`;
    }
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelPlacement: 'BetweenTicks',
    labelIntersectAction: 'Rotate45',
    edgeLabelPlacement: 'Shift',
    majorGridLines: {
      width: 0
    },
    majorTickLines: {
      width: 1,
      height: 5
    },
    lineStyle: {
      width: 1,
      color: '#808080'
    }
  },
  primaryYAxis: {
    name: 'RevenueAxis',
    title: 'Revenue',
    minimum: 0,
    maximum: 100,
    interval: 20,
    rangePadding: 'None',
    majorGridLines: {
      width: 1,
      color: '#E0E0E0',
      dashArray: '5,5'
    },
    stripLines: [
      {
        start: 60,
        end: 80,
        visible: true,
        text: 'Target Range',
        color: '#DFF6DD',
        opacity: 0.5,
        zIndex: 'Behind'
      }
    ]
  },
  axes: [
    {
      name: 'GrowthAxis',
      title: 'Growth',
      opposedPosition: true,
      minimum: 0,
      maximum: 40,
      interval: 10,
      labelFormat: '{value}%',
      majorGridLines: {
        width: 0
      },
      lineStyle: {
        width: 1,
        color: '#808080'
      }
    }
  ],
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
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue',
      yAxisName: 'RevenueAxis',
      fill: '#0F6CBD'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'growth',
      type: 'Line',
      name: 'Growth',
      yAxisName: 'GrowthAxis',
      width: 2,
      marker: {
        visible: true,
        width: 8,
        height: 8
      }
    }
  ]
});

chart.appendTo('#chart');

window.addEventListener('beforeunload', () => {
  chart.destroy();
});
```

**HTML:**

```html
<div id="chart"></div>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 440px;
}
```

## Complete JavaScript Example

```javascript

var chartData = [
  {
    month: 'January',
    revenue: 45,
    growth: 12
  },
  {
    month: 'February',
    revenue: 58,
    growth: 18
  },
  {
    month: 'March',
    revenue: 72,
    growth: 22
  },
  {
    month: 'April',
    revenue: 68,
    growth: 19
  },
  {
    month: 'May',
    revenue: 84,
    growth: 27
  }
];

var chart = new ej.charts.Chart({
  title: 'Revenue and Growth',
  width: '100%',
  height: '440px',
  axisLabelRender: function (args) {
    if (
      args.axis.name === 'primaryYAxis' &&
      typeof args.value === 'number'
    ) {
      args.text =
        '₹' + args.value + 'K';
    }
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelPlacement: 'BetweenTicks',
    labelIntersectAction: 'Rotate45',
    edgeLabelPlacement: 'Shift',
    majorGridLines: {
      width: 0
    },
    majorTickLines: {
      width: 1,
      height: 5
    },
    lineStyle: {
      width: 1,
      color: '#808080'
    }
  },
  primaryYAxis: {
    name: 'RevenueAxis',
    title: 'Revenue',
    minimum: 0,
    maximum: 100,
    interval: 20,
    rangePadding: 'None',
    majorGridLines: {
      width: 1,
      color: '#E0E0E0',
      dashArray: '5,5'
    },
    stripLines: [
      {
        start: 60,
        end: 80,
        visible: true,
        text: 'Target Range',
        color: '#DFF6DD',
        opacity: 0.5,
        zIndex: 'Behind'
      }
    ]
  },
  axes: [
    {
      name: 'GrowthAxis',
      title: 'Growth',
      opposedPosition: true,
      minimum: 0,
      maximum: 40,
      interval: 10,
      labelFormat: '{value}%',
      majorGridLines: {
        width: 0
      },
      lineStyle: {
        width: 1,
        color: '#808080'
      }
    }
  ],
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
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue',
      yAxisName: 'RevenueAxis',
      fill: '#0F6CBD'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'growth',
      type: 'Line',
      name: 'Growth',
      yAxisName: 'GrowthAxis',
      width: 2,
      marker: {
        visible: true,
        width: 8,
        height: 8
      }
    }
  ]
});

chart.appendTo('#chart');

window.addEventListener(
  'beforeunload',
  function () {
    chart.destroy();
  }
);
```

```javascript
ej.charts.Chart.Inject(
  ej.charts.ColumnSeries,
  ej.charts.LineSeries,
  ej.charts.Category,
  ej.charts.Legend,
  ej.charts.Tooltip,
  ej.charts.StripLine
);

var chart[
Source: chartData,
Name: 'month',
Name: 'revenue',
: 'Column',
: 'Revenue',
AxisName: 'RevenueAxis',
: '#0F6CBD'
Source: chartData,
Name: 'month',
Name: 'growth',
: 'Line',
: 'Growth',
AxisName: 'GrowthAxis',
: 2,
: {
: true,
: 8,
: 8
To('#chart') 19
  },
  {
    month: 'May',
    revenue: 84,
    growth: 27
  }
];

var chart = new ej.charts.Chart({
  title: 'Revenue and Growth',
  width: '100%',
  height: '440px',
  axisLabelRender: function (args) {
    if (
      args.axis.name === 'primaryYAxis' &&
      typeof args.value === 'number'
    ) {
      args.text = '₹' + args.value + 'K';
    }
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelPlacement: 'BetweenTicks',
    labelIntersectAction: 'Rotate45',
    edgeLabelPlacement: 'Shift',
    majorGridLines: {
      width: 0
    }
  },
  primaryYAxis: {
    name: 'RevenueAxis',
    title: 'Revenue',
    minimum: 0,
    maximum: 100,
    interval: 20,
    stripLines: [
      {
        start: 60,
        end: 80,
        visible: true,
        text: 'Target Range',
        color: '#DFF6DD',
        opacity: 0.5,
        zIndex: 'Behind'
      }
    ]
  },
  axes: [
    {
      name: 'GrowthAxis',
      title: 'Growth',
      opposedPosition: true,
      minimum: 0,
      maximum: 40,
      interval: 10,
      labelFormat: '{value}%',
      majorGridLines: {
        width: 0
      }
    }
  ],
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
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue',
      yAxisName: 'RevenueAxis',
      fill: '#0F6CBD'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'growth',
      type: 'Line',
      name: 'Growth',
      yAxisName: 'GrowthAxis',
      width: 2,
      marker: {
        visible: true,
        width: 8,
        height: 8
      }
    }
  ]
});

chart.appendTo('#chart');
```

## Troubleshooting

### Category Axis Is Not Displayed

- Import and inject `Category`.
- Set `valueType` to `Category`.
- Ensure that `xName` maps to a valid category field.
- Ensure that category values are not `null` or `undefined`.
- Do not rely on an unverified `categories` property.

### DateTime Axis Is Not Displayed

- Import and inject `DateTime`.
- Set `valueType` to `DateTime`.
- Ensure that the X-values are valid JavaScript `Date` objects.
- Ensure that `xName` maps to the date field.
- Use a supported `intervalType`.

### Logarithmic Axis Is Not Displayed

- Import and inject `Logarithmic`.
- Set `valueType` to `Logarithmic`.
- Ensure that all plotted values are greater than zero.
- Use a valid `logBase`.
- Ensure that `minimum` is also greater than zero.

### Axis Labels Overlap

- Use `labelIntersectAction`.
- Use `Rotate45`, `Rotate90`, `Hide`, `Trim`, or `Wrap`.
- Reduce the label font size.
- Increase the chart width.
- Reduce the number of visible intervals.
- Use `desiredIntervals`.
- Shorten category labels where possible.

### Custom Label Format Is Not Applied

- Use a valid `labelFormat` string.
- Use `{value}` for custom prefix or suffix text.
- Use `axisLabelRender` for conditional formatting.
- Do not assign a callback to `labelFormat`.
- Ensure that DateTime formats are used only with compatible DateTime axes.

### Axis Range Is Incorrect

- Verify `minimum`, `maximum`, and `interval`.
- Ensure that the minimum is less than the maximum.
- Ensure that the interval is greater than zero.
- Omit range properties when automatic range calculation is required.
- Do not use `interval: 'auto'`.

### Secondary Axis Is Not Used

- Give the additional axis a unique `name`.
- Set the series `xAxisName` or `yAxisName`.
- Ensure that the axis names match exactly.
- Ensure that the series values are compatible with the axis type.

### Strip Line Is Not Displayed

- Import and inject `StripLine`.
- Add the item to the axis `stripLines` collection.
- Set `visible` to `true`.
- Ensure that `start` and `end` are inside the visible axis range.
- Use the Y-axis for a horizontal highlighted range.
- Use the X-axis for a vertical highlighted range.
- Ensure that the strip-line color and opacity are visible.

### Minor Grid or Tick Lines Are Not Displayed

- Set `minorTicksPerInterval` to a value greater than zero.
- Configure `minorGridLines.width`.
- Configure `minorTickLines.width`.
- Use `height`, not `size`, for tick-line length.

## Next Steps

- **Configure series:** See `references/series-configuration.md`.
- **Add interactions:** See `references/features-interaction.md`.
- **Style appearance:** See `references/styling-appearance.md`.
- **Configure tooltips:** See `references/tooltip-configuration.md`.
- **Configure legends:** See `references/legend-configuration.md`.
- **Configure chart types:** See `references/chart-types.md`.