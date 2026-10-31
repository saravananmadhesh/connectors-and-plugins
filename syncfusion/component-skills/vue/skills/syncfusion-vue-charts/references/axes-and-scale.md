# Axes and Scale Configuration

## Table of Contents

- [Axis Types Overview](#axis-types-overview)
- [Category Axis](#category-axis)
  - [Basic Setup](#basic-setup)
  - [Multilevel Labels](#multilevel-labels)
    - [Basic Example (Category Axis)](#basic-example-category-axis)
    - [Label Customization](#label-customization)
    - [Label Placement](#label-placement)
    - [Indexed Category Axis](#indexed-category-axis)
    - [Sorted/Custom Order](#sortedcustom-order)
    - [Range (Category Axis)](#range-category-axis)
  - [Label Customization](#label-customization)
  - [Label Placement](#label-placement)
  - [Indexed Category Axis](#indexed-category-axis)
  - [Sorted/Custom Order](#sortedcustom-order)
  - [Range (Category Axis)](#range-category-axis)
- [Numeric Axis](#numeric-axis)
  - [Basic Setup](#basic-setup-1)
  - [Axis Properties](#axis-properties)
  - [Range Padding](#range-padding)
  - [Grouping Separator](#grouping-separator)
  - [Logarithmic Scale](#logarithmic-scale)
- [Date-Time Axis](#date-time-axis)
  - [Basic Setup](#basic-setup-2)
  - [DateTimeCategory Axis](#datetimecategory-axis)
  - [Range Padding (DateTime)](#range-padding-datetime)
  - [Interval Types](#interval-types)
- [Multiple Axes](#multiple-axes)
  - [Two Y-Axes Example](#two-y-axes-example)
  - [Key Properties](#key-properties)
- [Axis Labels](#axis-labels)
  - [Smart Label Handling (Label Intersect Action)](#smart-label-handling-label-intersect-action)
  - [Label Position](#label-position)
  - [Line Break Support](#line-break-support)
  - [Axis Label Template](#axis-label-template)
- [Label Formatting and Rotation](#label-formatting-and-rotation)
  - [Label Formats](#label-formats)
  - [Label Rotation](#label-rotation)
  - [Custom Label Templates](#custom-label-templates)
  - [Edge Label Placement](#edge-label-placement)
  - [Trim / Maximum Label Width](#trim--maximum-label-width)
  - [Customizing Specific Label Rendering](#customizing-specific-label-rendering)
- [Axis Customization](#axis-customization)
  - [Axis Title](#axis-title)
  - [Title Rotation](#title-rotation)
  - [Axis Crossing](#axis-crossing)
  - [Inversed Axis](#inversed-axis)
  - [Opposed Position](#opposed-position)
- [Customization Options](#customization-options)
  - [Axis Title Styling](#axis-title-styling)
  - [Grid Lines and Ticks](#grid-lines-and-ticks)
  - [Axis Line Styling](#axis-line-styling)
  - [Label Styling](#label-styling)
- [Multiple Panes](#multiple-panes)
  - [Rows](#rows)
  - [Columns](#columns)
  - [Spanning Axes](#spanning-axes)
  - [Border Customization](#border-customization)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Currency Scale](#pattern-1-currency-scale)
  - [Pattern 2: Time Series](#pattern-2-time-series)
  - [Pattern 3: Percentage Scale](#pattern-3-percentage-scale)
  - [Pattern 4: Logarithmic Scale](#pattern-4-logarithmic-scale)
- [Next Steps](#next-steps)


---

## Axis Types Overview

Axes define how data is plotted on the chart. The **X-axis** (horizontal) and **Y-axis** (vertical) work together to translate raw data into a visual format.

| Axis Type | Use Case | Example |
|-----------|----------|---------|
| **Category** | Discrete categories (strings) | Months, regions, products |
| **Numeric** | Continuous numbers | Counts, percentages, prices |
| **DateTime** | Time-based data | Dates, timestamps |
| **Logarithmic** | Wide-range numeric data | Stock prices, exponential growth |

**Default Axes Configuration:**
```vue
<ejs-chart :primaryXAxis="xAxis" :primaryYAxis="yAxis">
  <!-- series -->
</ejs-chart>

<script setup>
const xAxis = { valueType: 'Category' };
const yAxis = { valueType: 'Double' }; // Numeric
</script>
```

---

## Category Axis

Use for non-numeric, categorical data (labels, strings).

### Basic Setup

```vue
<template>
  <ejs-chart :primaryXAxis="xAxis">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const xAxis = {
  valueType: 'Category',
  title: 'Months',
  majorGridLines: { width: 0 }
};

const data = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 28 },
  { month: "Mar", sales: 34 },
];
</script>
```
---

## Multilevel Labels

Multilevel labels allow grouping axis labels into multiple rows (levels) for improved readability — for example grouping months into quarters or halves. Each multilevel label item uses `start`, `end`, and `text` to define the grouping; you can also set `level`, `maximumTextWidth`, and a `border` to customize appearance.

### Basic Example (Category Axis)

```vue
<template>
  <ejs-chart :primaryXAxis="primaryXAxis" :title="title">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const title = 'Sales by Month (Grouped)';
const data = [
  { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 }, { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 }, { month: 'May', sales: 40 }, { month: 'Jun', sales: 45 },
  { month: 'Jul', sales: 50 }, { month: 'Aug', sales: 48 }, { month: 'Sep', sales: 52 },
  { month: 'Oct', sales: 60 }, { month: 'Nov', sales: 58 }, { month: 'Dec', sales: 62 }
];

const primaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  edgeLabelPlacement: 'Shift',
  multiLevelLabels: [
    // Quarter level (level 0)
    { start: 'Jan', end: 'Mar', text: 'Q1', level: 0 },
    { start: 'Apr', end: 'Jun', text: 'Q2', level: 0 },
    { start: 'Jul', end: 'Sep', text: 'Q3', level: 0 },
    { start: 'Oct', end: 'Dec', text: 'Q4', level: 0 },
    // Half-year level (level 1) with border
    { start: 'Jan', end: 'Jun', text: 'H1', level: 1, border: { type: 'Rectangle' } },
    { start: 'Jul', end: 'Dec', text: 'H2', level: 1, border: { type: 'Rectangle' } }
  ]
};
</script>
```

Notes:
- **start / end:** Define the range of categories (strings) or dates for DateTime axes.
- **text:** The label text shown for the grouped range.
- **level:** Row index for the multilevel label (0 = nearest to axis labels). Omit to let the engine place levels automatically.
- **border:** Customize grouping rectangle/line (e.g., `{ type: 'Rectangle' }`).
- For `DateTime` axes use `start`/`end` as `Date` values (e.g., `new Date(2026, 0, 1)`).

### Label Customization

```vue
const xAxis = {
  valueType: 'Category',
  title: 'Months',
  labelFormat: '{value}',
  majorTickLines: { width: 1, color: '#d3d3d3' },
  minorTickLines: { width: 1, color: '#e0e0e0' },
};
```

### Label Placement

By default category labels appear between ticks. Use `labelPlacement` to align labels on ticks (`OnTicks`) or between them (`BetweenTicks`).

```vue
const xAxis = { valueType: 'Category', labelPlacement: 'OnTicks' };
```

### Indexed Category Axis

Enable `isIndexed` to position data points by their index in the data array instead of category value. Useful when multiple series share different category collections.

```vue
const xAxis = { valueType: 'Category', isIndexed: true };
```

### Sorted/Custom Order

```vue
// Data automatically uses array order
const data = [
  { month: "Apr", sales: 32 },   // Will show as 1st category
  { month: "Jan", sales: 35 },   // Will show as 2nd category
  { month: "Mar", sales: 34 },
];
```

### Range (Category Axis)

Control the visible range of a category axis using `minimum`, `maximum`, and `interval` properties to show only a subset of categories:

```vue
const xAxis = {
  valueType: 'Category',
  title: 'Months',
  minimum: 1,    // Start from index 1
  maximum: 5,    // End at index 5
  interval: 2    // Show every 2nd category
};
```

---

## Numeric Axis

Use for continuous numeric data.

### Basic Setup

```vue
<template>
  <ejs-chart :primaryXAxis="xAxis" :primaryYAxis="yAxis">
    <e-series-collection>
      <e-series :dataSource="data" type="Scatter" xName="age" yName="income">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const xAxis = {
  valueType: 'Double',
  title: 'Age (years)',
  minimum: 0,
  maximum: 100,
  interval: 10,
};

const yAxis = {
  valueType: 'Double',
  title: 'Income ($)',
  minimum: 0,
  maximum: 200000,
  interval: 50000,
};

const data = [
  { age: 25, income: 30000 },
  { age: 35, income: 65000 },
  { age: 45, income: 95000 },
];
</script>
```

### Axis Properties

```vue
const yAxis = {
  valueType: 'Double',
  title: 'Sales',
  minimum: 0,          // Start value
  maximum: 500,        // End value
  interval: 50,        // Gap between major tick marks
  labelFormat: '{value}K',  // Format labels (e.g., "50K")
  isInversed: false,   // Reverse direction (true = highest at bottom)
};
```

### Range Padding

The axis range can include padding added to the minimum and maximum values using the `rangePadding` property. Common options are `None`, `Normal`, `Round`, `Additional`, and `Auto`.

```vue
const yAxis = {
  valueType: 'Double',
  rangePadding: 'Round'
};
```

`None` derives min/max directly from data. `Round` snaps min/max to interval boundaries. `Additional` adds one interval to both ends. `Auto` applies sensible defaults per axis orientation.

### Grouping Separator

To format numeric labels with grouping separators (thousands separators), enable the chart-level `useGroupingSeparator` property.

```vue
<ejs-chart :useGroupingSeparator="true">
  <!-- ... -->
</ejs-chart>
```

### Logarithmic Scale

For data with very large ranges:

```vue
const yAxis = {
  valueType: 'Logarithmic',
  title: 'Log Scale Values',
  logBase: 10,  // Base for logarithm (10 or any number)
};
```

**When to use:** Stock prices, population growth, exponential data

---

## Date-Time Axis

Use for time-series data.

### Basic Setup

```vue
<template>
  <ejs-chart :primaryXAxis="xAxis" :primaryYAxis="yAxis">
    <e-series-collection>
      <e-series :dataSource="data" type="Line" xName="date" yName="temperature">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const xAxis = {
  valueType: 'DateTime',
  title: 'Date',
  intervalType: 'Months',  // Group by months
  interval: 1,
  labelFormat: 'MMM',      // Show as "Jan", "Feb", etc.
};

const yAxis = {
  valueType: 'Double',
  title: 'Temperature (°C)',
};

const data = [
  { date: new Date(2026, 0, 1), temperature: 15 },  // Jan 1
  { date: new Date(2026, 1, 1), temperature: 18 },  // Feb 1
  { date: new Date(2026, 2, 1), temperature: 22 },  // Mar 1
];
</script>
```

### DateTimeCategory Axis

The `DateTimeCategory` axis renders date-time values with non-linear intervals and can be useful when excluding ranges like weekends. Inject the `DateTimeCategory` module and set `valueType: 'DateTimeCategory'`.

```vue
const xAxis = { valueType: 'DateTimeCategory' };
```

### Range Padding (DateTime)

The DateTime axis supports `rangePadding` as well (`None`, `Round`, `Additional`). Use it to control how the visible range is calculated and rounded.

### Interval Types

```vue
const xAxis = {
  valueType: 'DateTime',
  intervalType: 'Days',      // Daily grouping
  interval: 1,
  labelFormat: 'dd/MM/yyyy', // "01/01/2026"
};

// OR

const xAxis = {
  valueType: 'DateTime',
  intervalType: 'Hours',     // Hourly grouping
  interval: 6,
  labelFormat: 'hh:mm tt',   // "02:30 PM"
};

// OR

const xAxis = {
  valueType: 'DateTime',
  intervalType: 'Years',     // Yearly grouping
  interval: 1,
  labelFormat: 'yyyy',       // "2026"
};
```

**Interval Types:** `Days`, `Hours`, `Minutes`, `Seconds`, `Months`, `Years`

---

## Multiple Axes

Have multiple Y-axes for different scales or units.

### Two Y-Axes Example

```vue
<template>
  <ejs-chart :primaryXAxis="xAxis" :primaryYAxis="yAxis1" :axes="axes">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="revenue" 
                yAxisName="YAxis1" name="Revenue ($)">
      </e-series>
      <e-series :dataSource="data" type="Line" xName="month" yName="growth" 
                yAxisName="YAxis2" name="Growth (%)">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const xAxis = {
  valueType: 'Category',
  title: 'Months',
};

const yAxis1 = {
  valueType: 'Double',
  title: 'Revenue ($)',
  labelFormat: '${value}K',
  minimum: 0,
  maximum: 1000,
  interval: 200,
  name: 'YAxis1',
};

const yAxis2 = [
  {
    name: 'YAxis2',
    valueType: 'Double',
    title: 'Growth (%)',
    labelFormat: '{value}%',
    minimum: 0,
    maximum: 100,
    interval: 20,
    opposedPosition: true,  // Place on right side
    rowIndex: 0,
  }
];

const axes = yAxis2;

const data = [
  { month: "Jan", revenue: 500, growth: 20 },
  { month: "Feb", revenue: 600, growth: 25 },
  { month: "Mar", revenue: 750, growth: 30 },
];
</script>
```

**Key Properties:**
- `yAxisName: 'YAxis2'` - Bind series to specific Y-axis
- `opposedPosition: true` - Place on right/opposite side
- Different titles, labels, and scales per axis

---

## Axis Labels

### Smart Label Handling (Label Intersect Action)

When axis labels overlap due to dense data or limited space, use the `labelIntersectAction` property to control label rendering automatically.

**Hide:** Hides overlapping labels
```vue
const xAxis = { 
  valueType: 'Category',
  labelIntersectAction: 'Hide'
};
```

**Rotate45:** Rotates labels by 45 degrees
```vue
const xAxis = { 
  valueType: 'Category',
  labelIntersectAction: 'Rotate45'
};
```

**Rotate90:** Rotates labels vertically (90 degrees)
```vue
const xAxis = { 
  valueType: 'Category',
  labelIntersectAction: 'Rotate90'
};
```

**Wrap:** Wraps text to multiple lines
```vue
const xAxis = { 
  valueType: 'Category',
  labelIntersectAction: 'Wrap'
};
```

#### Configuration Location and Supported Actions

Place `labelIntersectAction` directly in `primaryXAxis`, `primaryYAxis`, or an additional axis object. It is separate from `marker.dataLabel.labelIntersectAction`.

```ts
const primaryXAxis: Object = {
  valueType: 'Category',
  labelIntersectAction: 'Rotate45WithTrim',
  maximumLabelWidth: 90
};
```

- `None` leaves labels unchanged.
- `Hide` hides colliding labels.
- `Trim` adds an ellipsis to intersecting labels.
- `Wrap` uses multiple lines.
- `MultipleRows` moves horizontal-axis labels into additional rows.
- `Rotate45` and `Rotate90` rotate intersecting labels.
- `Rotate45WithTrim` and `Rotate90WithTrim` rotate and trim labels within `maximumLabelWidth`.

Use `labelRotation` only for a fixed angle independent of collision detection. Do not nest `labelIntersectAction` under a `label` object.

### Label Position

By default, axis labels are positioned `Outside` (away from the axis line). Use `labelPosition` to place them `Inside` the chart area to optimize space.

```vue
const xAxis = {
  valueType: 'Category',
  labelPosition: 'Inside'  // or 'Outside' (default)
};
```

### Line Break Support

Long axis labels can be split across multiple lines using the `<br>` tag in the data source:

```vue
const data = [
  { x: 'United States<br>Of America', y: 286.9 },
  { x: 'Great Britain', y: 115.1 }
];

const xAxis = {
  valueType: 'Category',
  enableTrim: false  // Allow text to wrap
};
```

### Axis Label Template

Customize axis labels with HTML templates using the `labelTemplate` property:

```vue
<template>
  <ejs-chart :primaryXAxis="xAxis">
    <template v-slot:labelTemplate="{ data }">
      <div style="background-color: #2E8B57; color: #FFD700; padding: 5px">
        {{ data.value }}
      </div>
    </template>
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const xAxis = {
  valueType: 'Category',
  labelTemplate: '#labelTemplate'
};
</script>
```

---

#### Rotation with Trimming

The axis `labelIntersectAction` also supports:

- `Rotate45WithTrim`: Rotates intersecting labels by 45 degrees and trims text that exceeds the available bounds.
- `Rotate90WithTrim`: Rotates intersecting labels by 90 degrees and trims text that exceeds the available bounds.

##### Complete `Rotate45WithTrim` Vue sample

```vue
<template>
  <ejs-chart id="rotate45-with-trim-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis"
    :tooltip="tooltip" :legendSettings="legendSettings" title="Department Revenue">
    <e-series-collection>
      <e-series :dataSource="chartData" type="Column" xName="department" yName="revenue" name="Revenue">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
  Category, ChartComponent as EjsChart, ColumnSeries, Legend, SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries, Tooltip
} from '@syncfusion/ej2-vue-charts';

provide('chart', [Category, ColumnSeries, Legend, Tooltip]);

const chartData: Object[] = [
  { department: 'Consumer Electronics and Accessories', revenue: 72 },
  { department: 'Home Furniture and Interior Products', revenue: 58 },
  { department: 'Sports Equipment and Outdoor Recreation', revenue: 64 },
  { department: 'Personal Care and Beauty Products', revenue: 49 },
  { department: 'Books, Education and Office Supplies', revenue: 55 }
];
const primaryXAxis: Object = {
  valueType: 'Category', title: 'Department', labelIntersectAction: 'Rotate45WithTrim',
  maximumLabelWidth: 90, majorGridLines: { width: 0 }
};
const primaryYAxis: Object = { title: 'Revenue', minimum: 0, maximum: 80, interval: 20, labelFormat: '${value}M' };
const tooltip: Object = { enable: true, format: '${point.x}: ${point.y}M' };
const legendSettings: Object = { visible: false };
</script>
```

For the 90-degree variant, use the same complete component and change only:

```ts
const primaryXAxis: Object = {
  valueType: 'Category',
  title: 'Department',
  labelIntersectAction: 'Rotate90WithTrim',
  maximumLabelWidth: 100,
  majorGridLines: { width: 0 }
};
```

## Label Formatting and Rotation

### Label Formats

```vue
// Numeric formatting
const yAxis = {
  labelFormat: '${value}',        // Currency: "$100"
  labelFormat: '{value}%',        // Percentage: "25%"
  labelFormat: '{value}K',        // Thousands: "100K"
  labelFormat: '{value:N2}',      // 2 decimal places: "100.50"
};

// Date formatting
const xAxis = {
  valueType: 'DateTime',
  labelFormat: 'MMM',             // Month: "Jan", "Feb"
  labelFormat: 'dd/MM/yyyy',      // Date: "01/01/2026"
  labelFormat: 'hh:mm tt',        // Time: "02:30 PM"
  labelFormat: 'ddd',             // Day: "Mon", "Tue"
};
```

### Label Rotation

```vue
const xAxis = {
  valueType: 'Category',
  labelRotation: 45,              // Rotate labels 45 degrees
  labelIntersectAction: 'Wrap',   // Wrap text instead of rotate
};
```

### Custom Label Templates

```vue
<ejs-chart :primaryXAxis="xAxis">
  <!-- Use labelTemplate for custom rendering -->
</ejs-chart>

<script>
const xAxis = {
  valueType: 'DateTime',
  intervalType: 'Days',
  labelFormat: 'MMM dd',
};
</script>
```

### Edge Label Placement

Use `edgeLabelPlacement` to handle labels at axis edges (`Shift`, `Hide`), preventing labels from rendering outside the chart area.

```vue
const xAxis = { edgeLabelPlacement: 'Shift' };
```

### Trim / Maximum Label Width

Use `enableTrim` and `maximumLabelWidth` to trim long labels and control their width.

```vue
const xAxis = { enableTrim: true, maximumLabelWidth: 22 };
```

### Customizing Specific Label Rendering

The `axisLabelRender` event allows you to modify labels at render-time for conditional formatting.

```vue
<template>
<ejs-chart :axisLabelRender="axisLabelRender">...</ejs-chart>
</template>

<script setup>
const axisLabelRender = (args) => {
  if (args.text === 'France') {
    args.labelStyle.color = 'red';
  }
};
</script>
```

---

## Axis Customization

### Axis Scrollbar

Use `ScrollBar` for Chart scrollbars and `Zoom` when the scrollbar participates in zooming or panning. Also provide the rendered series module and the module required by the axis value type.

`zoomSettings.enableScrollbar` enables the standard zoom scrollbar. `axis.scrollbarSettings` controls axis-specific appearance, placement, lazy-load range, and zoom behavior.

```vue
<template>
  <ejs-chart id="scrollbar-chart" :primaryXAxis="primaryXAxis" :primaryYAxis="primaryYAxis"
    :zoomSettings="zoomSettings" :scrollStart="scrollStart" :scrollChanged="scrollChanged"
    :scrollEnd="scrollEnd">
    <e-series-collection>
      <e-series :dataSource="chartData" type="Line" xName="month" yName="sales"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
  Category, ChartComponent, LineSeries, ScrollBar, SeriesCollectionDirective, SeriesDirective, Zoom
} from '@syncfusion/ej2-vue-charts';

defineOptions({ components: {
  'ejs-chart': ChartComponent,
  'e-series-collection': SeriesCollectionDirective,
  'e-series': SeriesDirective
} });
provide('chart', [Category, LineSeries, ScrollBar, Zoom]);

const chartData: Object[] = [
  { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 }, { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 }, { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
  { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 }, { month: 'Sep', sales: 38 }
];
const primaryXAxis: Object = {
  valueType: 'Category', zoomFactor: 0.5, zoomPosition: 0,
  scrollbarSettings: {
    enable: true, height: 16, enableZoom: true, position: 'PlaceNextToAxisLine',
    scrollbarRadius: 4, trackRadius: 4, scrollbarColor: '#6B7280',
    trackColor: '#E5E7EB', gripColor: '#FFFFFF'
  }
};
const primaryYAxis: Object = { minimum: 0, maximum: 60, interval: 10 };
const zoomSettings: Object = {
  enableScrollbar: true, enableSelectionZooming: true, enableMouseWheelZooming: true,
  enablePan: true, mode: 'X'
};
const scrollStart = (args: Object): void => console.log('Scroll started', args);
const scrollChanged = (args: Object): void => console.log('Scroll changed', args);
const scrollEnd = (args: Object): void => console.log('Scroll ended', args);
</script>
```

- `enable` enables an axis scrollbar for lazy loading.
- `pointsLength` supplies the complete logical point count for numeric or logarithmic lazy loading.
- `range` supplies the complete DateTime minimum and maximum.
- `height` controls thickness. Use `12` or greater for the grip-circle visual and grab cursor.
- `enableZoom: true` enables resize handles, arrows, and wheel zoom. `false` is pan-only.
- `position` uses `Top`/`Bottom` for horizontal axes, `Left`/`Right` for vertical axes, or `PlaceNextToAxisLine`.
- `scrollbarColor`, `trackColor`, `gripColor`, `scrollbarRadius`, and `trackRadius` control appearance.

For DateTime lazy loading, configure `scrollbarSettings.range` and provide `DateTime`. For numeric or logarithmic lazy loading, configure `pointsLength`. Use `scrollStart`, `scrollChanged`, and `scrollEnd` for interaction start, continuous range changes, and final lazy-load handling.

### Axis Title

Add descriptive titles to axes using the `title` property:

```vue
const xAxis = {
  valueType: 'Category',
  title: 'Countries'
};

const yAxis = {
  valueType: 'Double',
  title: 'Sales Amount (USD)',
  titleStyle: {
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  }
};
```

### Title Rotation

Rotate axis titles to fit your layout using `titleRotation` (0-360 degrees):

```vue
const xAxis = {
  title: 'Categories',
  titleRotation: 90  // Vertical orientation
};
```

### Axis Crossing

Position an axis to cross another axis at a specific value using `crossesAt` and `crossesInAxis`. Useful for emphasizing thresholds or creating specific chart layouts:

```vue
const xAxis = {
  valueType: 'Category',
  crossesAt: 5
};

const yAxis = {
  crossesInAxis: 'XAxisName',
  crossesAt: 0  // Crosses X-axis at 0 value
};
```

### Inversed Axis

Reverse the direction of an axis by setting `isInversed: true`. The highest value appears closer to the origin, and the lowest value farther away:

```vue
const yAxis = {
  valueType: 'Double',
  isInversed: true  // Highest at bottom, lowest at top
};
```

### Opposed Position

Place an axis on the opposite side of its default position using `opposedPosition: true`. Useful for displaying multiple axes:

```vue
const yAxis = {
  valueType: 'Double',
  title: 'Secondary Y-Axis',
  opposedPosition: true  // Places on right side for Y-axis
};
```

---

## Customization Options

### Axis Title Styling

```vue
const xAxis = {
  valueType: 'Category',
  title: 'Product Categories',
  titleStyle: {
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
};
```

### Grid Lines and Ticks

```vue
const yAxis = {
  valueType: 'Double',
  majorGridLines: {
    width: 1,
    color: '#e0e0e0',
    dashArray: '2,2',  // Dashed line
  },
  minorGridLines: {
    width: 0.5,
    color: '#f0f0f0',
  },
  majorTickLines: {
    width: 1,
    color: '#333',
  },
};
```

### Axis Line Styling

```vue
const xAxis = {
  valueType: 'Category',
  lineStyle: {
    width: 2,
    color: '#666',
    dashArray: '5,5',
  },
};
```

### Label Styling

```vue
const yAxis = {
  valueType: 'Double',
  labelStyle: {
    fontFamily: 'Verdana',
    fontSize: 12,
    color: '#666',
  },
};
```

---

## Multiple Panes

### Rows

Split the chart area into multiple rows to display different datasets with separate Y-axes. Each row's height can be set as pixels or percentage:

```vue
<template>
  <ejs-chart :primaryXAxis="xAxis" :primaryYAxis="yAxis1" :axes="axes" :rows="rows">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="revenue" name="Revenue"></e-series>
      <e-series :dataSource="data" type="Line" xName="month" yName="growth" yAxisName="YAxis2" name="Growth"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const rows = [
  { height: '50%' },
  { height: '50%' }
];

const xAxis = {
  valueType: 'Category',
  title: 'Months'
};

const yAxis1 = {
  valueType: 'Double',
  title: 'Revenue ($)',
  minimum: 0,
  maximum: 1000
};

const axes = [
  {
    name: 'YAxis2',
    valueType: 'Double',
    title: 'Growth (%)',
    rowIndex: 1,  // Attach to second row
    minimum: 0,
    maximum: 100
  }
];

const data = [
  { month: 'Jan', revenue: 500, growth: 20 },
  { month: 'Feb', revenue: 600, growth: 25 }
];
</script>
```

### Columns

Split the chart area into multiple columns to display different datasets with separate X-axes:

```vue
const columns = [
  { width: '50%' },
  { width: '50%' }
];

const axes = [
  {
    name: 'XAxis2',
    valueType: 'Category',
    columnIndex: 1  // Attach to second column
  }
];
```

### Spanning Axes

An axis can span across multiple rows or columns using the `span` property:

```vue
const primaryYAxis = {
  valueType: 'Double',
  span: 2  // Span across 2 rows
};

const primaryXAxis = {
  valueType: 'Category',
  span: 2  // Span across 2 columns
};
```

### Border Customization

Customize the border lines of rows and columns using the `border` property:

```vue
const rows = [
  { height: '50%', border: { width: 2, color: 'blue' } },
  { height: '50%', border: { width: 2, color: 'red' } }
];

const columns = [
  { width: '50%', border: { width: 2, color: 'green' } },
  { width: '50%', border: { width: 2, color: 'orange' } }
];
```

---

## Common Patterns

### Pattern 1: Currency Scale
```vue
const yAxis = {
  valueType: 'Double',
  title: 'Revenue',
  labelFormat: '${value}K',
  minimum: 0,
  maximum: 1000,
  interval: 200,
};
```

### Pattern 2: Time Series
```vue
const xAxis = {
  valueType: 'DateTime',
  intervalType: 'Days',
  interval: 7,  // Every 7 days
  labelFormat: 'MMM dd',
};
```

### Pattern 3: Percentage Scale
```vue
const yAxis = {
  valueType: 'Double',
  labelFormat: '{value}%',
  minimum: 0,
  maximum: 100,
  interval: 10,
};
```

### Pattern 4: Logarithmic Scale
```vue
const yAxis = {
  valueType: 'Logarithmic',
  logBase: 10,
  minimum: 1,
  maximum: 1000000,
};
```

## Next Steps

- Add legend and tooltip: [Legend and Tooltips](../legend-and-tooltips.md)
- Format data labels: [Data Labels and Annotations](../data-labels-and-annotations.md)
- Customize appearance: [Customization and Styling](../customization-and-styling.md)
