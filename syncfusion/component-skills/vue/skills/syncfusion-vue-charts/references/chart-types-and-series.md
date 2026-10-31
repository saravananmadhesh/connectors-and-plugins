# Chart Types and Series Configuration

## Table of Contents

- [Understanding Series](#understanding-series)
- [Basic Chart Types](#basic-chart-types)
  - [Line Chart](#line-chart)
  - [MultiColored Line Chart](#multicolored-line-chart)
  - [Spline Chart](#spline-chart)
  - [Step Line Chart](#step-line-chart)
  - [Column Chart](#column-chart)
  - [Bar Chart](#bar-chart)
  - [Area Chart](#area-chart)
  - [Step Area Chart](#step-area-chart)
  - [Spline Area Chart](#spline-area-chart)
  - [Multicolored Area Chart](#multicolored-area-chart)
  - [Stacked Charts](#stacked-charts)
    - [Stacked Column](#stacked-column)
    - [Stacked Bar](#stacked-bar)
    - [Stacked Area](#stacked-area)
    - [Stacked Line](#stacked-line)
    - [100% Stacked Variants](#100-stacked-variants)
    - [Stacked Step Area](#stacked-step-area)
- [Financial Charts](#financial-charts)
  - [Candlestick](#candlestick)
  - [HLOC (High-Low-Open-Close)](#hloc-high-low-open-close)
  - [Hilo](#hilo)
- [Specialized Charts](#specialized-charts)
  - [Scatter Chart](#scatter-chart)
  - [Range Column Chart](#range-column-chart)
  - [Range Area Chart](#range-area-chart)
  - [Range Step Area Chart](#range-step-area-chart)
  - [Spline Range Area Chart](#spline-range-area-chart)
  - [Bubble Chart](#bubble-chart)
  - [Polar Chart](#polar-chart)
  - [Radar Chart](#radar-chart)
  - [Histogram](#histogram)
  - [Pareto Chart](#pareto-chart)
  - [Waterfall Chart](#waterfall-chart)
  - [Box and Whisker Chart](#box-and-whisker-chart)
  - [Error Bar Chart](#error-bar-chart)
- [Multiple Series](#multiple-series)
  - [Comparing Multiple Series](#comparing-multiple-series)
  - [Mixed Chart Types](#mixed-chart-types)
- [Vertical Chart Orientation](#vertical-chart-orientation)
- [Dynamically Changing Chart Types](#dynamically-changing-chart-types)
  - [Update Series Type at Runtime](#update-series-type-at-runtime)
  - [Programmatic Type Change](#programmatic-type-change)
- [Series Configuration Patterns](#series-configuration-patterns)
  - [Pattern 1: Color by Series](#pattern-1-color-by-series)
  - [Pattern 2: Conditional Visibility](#pattern-2-conditional-visibility)
  - [Pattern 3: Dynamic Data Source](#pattern-3-dynamic-data-source)
  - [Pattern 4: Series with Custom Markers](#pattern-4-series-with-custom-markers)
- [Enable Complex Property in Series](#enable-complex-property-in-series)
  - [Using Complex Properties](#using-complex-properties)
  - [Data Structure with Nesting](#data-structure-with-nesting)
  - [Usage](#usage)
- [Choosing the Right Chart Type](#choosing-the-right-chart-type)

---

## Understanding Series

A **series** is a collection of data points displayed on a chart. Each series represents a distinct dataset and can have its own chart type, styling, and configuration.

**Key Concepts:**
- A chart can have **1 or more series**
- Each series needs: `dataSource`, `type`, `xName`, `yName`
- Series are rendered in the order they're defined
- Each series can be toggled visibility via legend

**Minimal Series Example:**
```vue
<e-series :dataSource="data" type="Column" xName="category" yName="value" name="My Series">
</e-series>
```

| Property | Purpose | Example |
|----------|---------|---------|
| `dataSource` | Array of data objects | `[{month: "Jan", sales: 35}, ...]` |
| `type` | Chart type | `"Column"`, `"Line"`, `"Area"` |
| `xName` | Property name for X-axis values | `"month"` (from data) |
| `yName` | Property name for Y-axis values | `"sales"` (from data) |
| `name` | Series label (shown in legend) | `"Sales"` |

---

## Basic Chart Types

### Line Chart
Best for: Trends over time, continuous data

```vue
<template>
  <e-series :dataSource="data" type="Line" xName="month" yName="sales" name="Sales" :marker='marker'>
  </e-series>
<template>

<script setup>
const marker = { visible: true };
</script>
```

**Key Props:**
- `marker` - Show/hide points on line
- `width` - Line thickness
- `dashArray` - Dashed or solid line

### MultiColored Line Chart
Best for: Highlighting different segments with distinct colors per point

```vue
<template>
  <e-series :dataSource="data" type="MultiColoredLine" xName="month" yName="sales" 
            pointColorMapping="color" name="Sales" width="3">
  </e-series>
</template>

<script setup>
const data = [
  { month: 'Jan', sales: 35, color: '#1f77b4' },
  { month: 'Feb', sales: 28, color: '#ff7f0e' },
  { month: 'Mar', sales: 34, color: '#2ca02c' }
];
</script>
```

**Key Props:**
- `pointColorMapping` - Property name for color values in data
- `width` - Line thickness

### Spline Chart
Best for: Smooth curves through data points

```vue
<e-series :dataSource="data" type="Spline" xName="month" yName="sales" name="Sales">
</e-series>
```

**Key Props:**
- `marker` - Show/hide curve points
- `type` - Spline interpolation type (default: Natural)

### Step Line Chart
Best for: Data that changes at distinct intervals without smooth transitions

```vue
<e-series :dataSource="data" type="StepLine" xName="month" yName="value" name="Data" width="2">
</e-series>
```

**Key Props:**
- `step` - Step position (`Left`, `Right`, `Center`)
- `noRisers` - Hide vertical lines between steps (default: false)
- `width` - Line thickness

### Column Chart
Best for: Comparing values across categories

```vue
<e-series :dataSource="data" type="Column" xName="category" yName="value" name="Value">
</e-series>
```

**Key Props:**
- `cornerRadius` - Rounded corners
- `spacing` - Gap between columns
- `width` - Column width percentage

### Bar Chart
Best for: Horizontal comparison (long category names)

```vue
<e-series :dataSource="data" type="Bar" xName="category" yName="value" name="Value">
</e-series>
```

### Area Chart
Best for: Showing cumulative totals or continuous change

```vue
<e-series :dataSource="data" type="Area" xName="month" yName="sales" name="Sales" opacity="0.5">
</e-series>
```

### Step Area Chart
Best for: Area visualization with step-style connections

```vue
<e-series :dataSource="data" type="StepArea" xName="month" yName="sales" name="Sales" opacity="0.5">
</e-series>
```

**Key Props:**
- `step` - Step position (`Left`, `Right`, `Center`)
- `noRisers` - Hide vertical lines between steps
- `opacity` - Fill transparency

### Spline Area Chart
Best for: Area visualization with smooth, curved lines

```vue
<e-series :dataSource="data" type="SplineArea" xName="month" yName="sales" name="Sales" opacity="0.5">
</e-series>
```

**Key Props:**
- `marker` - Show/hide curve points
- `opacity` - Fill transparency

### Multicolored Area Chart
Best for: Area charts with different colors for different segments

A multicolored area chart allows you to define different colors for different segments of the area based on X-axis values.

```vue
<template>
  <ejs-chart :title="Multicolored Area Chart">
    <e-series-collection>
      <e-series :dataSource="data" type="MultiColoredArea" xName="x" yName="y" 
                :segments="segments" segmentAxis="X" opacity="0.7">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const data = [
  { x: 2005, y: 28 }, 
  { x: 2006, y: 25 }, 
  { x: 2007, y: 26 }, 
  { x: 2008, y: 27 },
  { x: 2009, y: 32 }, 
  { x: 2010, y: 35 }, 
  { x: 2011, y: 25 }
];

const segments = [
  {
    value: 2007,
    color: '#1f77b4'   // Color from 2005 to 2007
  },
  {
    value: 2009,
    color: '#ff7f0e'   // Color from 2007 to 2009
  },
  {
    color: '#2ca02c'   // Color from 2009 onwards
  }
];
</script>
```

**Key Props:**
- `segments` - Array of segment objects defining color boundaries
- `segmentAxis` - Axis for segment division (`X` or `Y`)
- `value` - X-value where color changes (for `segmentAxis="X"`)
- `color` - Fill color for the segment

**Segment Properties:**
- `value` - Endpoint value of the segment (last segment value is optional)
- `color` - Color for this segment
- `dashArray` - Optional dashed pattern for the border

### Stacked Charts
Best for: Showing composition over time

**Stacked Column:**
```vue
<e-series :dataSource="data" type="StackingColumn" xName="month" yName="sales1" name="Product A">
</e-series>
<e-series :dataSource="data" type="StackingColumn" xName="month" yName="sales2" name="Product B">
</e-series>
```

**Stacked Bar:**
```vue
<e-series :dataSource="data" type="StackingBar" xName="month" yName="sales1" name="Product A">
</e-series>
<e-series :dataSource="data" type="StackingBar" xName="month" yName="sales2" name="Product B">
</e-series>
```

**Stacked Area:**
```vue
<e-series :dataSource="data" type="StackingArea" xName="month" yName="sales1" name="Product A">
</e-series>
<e-series :dataSource="data" type="StackingArea" xName="month" yName="sales2" name="Product B">
</e-series>
```

**Stacked Line:**
```vue
<e-series-collection>
  <e-series :dataSource="data" type="StackingLine" xName="month" yName="sales1" name="Product A">
  </e-series>
  <e-series :dataSource="data" type="StackingLine" xName="month" yName="sales2" name="Product B">
  </e-series>
</e-series-collection>
```

**100% Stacked Column:**
```vue
<e-series-collection>
  <e-series :dataSource="data" type="StackingColumn100" xName="month" yName="sales1" name="Product A">
  </e-series>
  <e-series :dataSource="data" type="StackingColumn100" xName="month" yName="sales2" name="Product B">
  </e-series>
</e-series-collection>
```

**100% Stacked Bar:**
```vue
<e-series-collection>
  <e-series :dataSource="data" type="StackingBar100" xName="month" yName="sales1" name="Product A">
  </e-series>
  <e-series :dataSource="data" type="StackingBar100" xName="month" yName="sales2" name="Product B">
  </e-series>
</e-series-collection>
```

**100% Stacked Area:**
```vue
<e-series-collection>
  <e-series :dataSource="data" type="StackingArea100" xName="month" yName="sales1" name="Product A">
  </e-series>
  <e-series :dataSource="data" type="StackingArea100" xName="month" yName="sales2" name="Product B">
  </e-series>
</e-series-collection>
```

**100% Stacked Line:**
```vue
<e-series-collection>
  <e-series :dataSource="data" type="StackingLine100" xName="month" yName="sales1" name="Product A">
  </e-series>
  <e-series :dataSource="data" type="StackingLine100" xName="month" yName="sales2" name="Product B">
  </e-series>
</e-series-collection>
```

**Stacked Step Area:**
```vue
<e-series-collection>
  <e-series :dataSource="data" type="StackingStepArea" xName="month" yName="sales1" name="Product A">
  </e-series>
  <e-series :dataSource="data" type="StackingStepArea" xName="month" yName="sales2" name="Product B">
  </e-series>
</e-series-collection>
```

---

## Financial Charts

### Candlestick
Best for: Stock price movements

```vue
<e-series :dataSource="stockData" type="Candle" 
          xName="date" low="low" high="high" 
          open="open" close="close" name="Stock">
</e-series>
```

**Data Structure:**
```vue
[
  { date: "2026-01-01", open: 100, close: 105, high: 110, low: 95 },
  { date: "2026-01-02", open: 105, close: 102, high: 108, low: 100 }
]
```

### High-Low-Open-Close (HLOC)
Similar to candlestick but with a different visual style

```vue
<e-series :dataSource="stockData" type="HiloOpenClose" 
          xName="date" low="low" high="high" 
          open="open" close="close" name="Stock">
</e-series>
```

### High-Low (Hilo)
Shows high and low prices only

```vue
<e-series :dataSource="stockData" type="Hilo" 
          xName="date" low="low" high="high" name="Stock">
</e-series>
```

---

## Specialized Charts

### Scatter Chart
Best for: Correlation between two variables

```vue
<e-series :dataSource="data" type="Scatter" xName="age" yName="income" name="Data Points">
</e-series>
```

### Range Column Chart
Best for: Displaying data ranges (min/max) as columns

```vue
<e-series :dataSource="data" type="RangeColumn" xName="month" low="low" high="high" name="Temperature Range">
</e-series>
```

**Data Structure:**
```vue
[
  { month: 'Jan', low: 5, high: 15 },
  { month: 'Feb', low: 6, high: 18 },
  { month: 'Mar', low: 8, high: 22 }
]
```

**Key Props:**
- `low` - Property name for low values
- `high` - Property name for high values
- `cornerRadius` - Rounded corners

### Range Area Chart
Best for: Visualizing value ranges over time

```vue
<e-series :dataSource="data" type="RangeArea" xName="month" low="low" high="high" name="Temperature Range">
</e-series>
```

**Data Structure:**
```vue
[
  { month: 'Jan', low: 5, high: 15 },
  { month: 'Feb', low: 6, high: 18 }
]
```

### Range Step Area Chart
Best for: Range visualization with step-style connections

```vue
<e-series :dataSource="data" type="RangeStepArea" xName="month" low="low" high="high" name="Range">
</e-series>
```

**Key Props:**
- `step` - Step position control
- `opacity` - Fill transparency

### Spline Range Area Chart
Best for: Range visualization with smooth spline curves

```vue
<e-series :dataSource="data" type="SplineRangeArea" xName="month" low="low" high="high" name="Temperature Range">
</e-series>
```

### Bubble Chart
Best for: Three-dimensional data (X, Y, size)

```vue
<e-series :dataSource="data" type="Bubble" 
          xName="country" yName="gdp" size="population" name="Countries">
</e-series>
```

**Data Structure:**
```vue
[
  { country: "USA", gdp: 25, population: 330 },
  { country: "China", gdp: 17, population: 1400 }
]
```

### Polar Chart
Best for: Multi-dimensional comparison in circular format

```vue
<e-series :dataSource="data" type="Polar" xName="category" yName="value" name="Data">
</e-series>
```

### Radar Chart
Similar to polar but with different styling

```vue
<e-series :dataSource="data" type="Radar" xName="category" yName="value" name="Data">
</e-series>
```

### Histogram
Best for: Distribution analysis

```vue
<e-series :dataSource="data" type="Histogram" yName="value" name="Distribution">
</e-series>
```

**Props:**
- `binInterval` - Bin width
- `showNormalDistribution` - Show normal curve

### Pareto Chart
Best for: Identifying most significant factors (80/20 rule)

A Pareto chart combines columns (frequency) and a line (cumulative percentage). It helps identify which factors contribute most to the total.

```vue
<template>
  <ejs-chart :title="Pareto Chart">
    <e-series-collection>
      <e-series :dataSource="data" type="Pareto" xName="issue" yName="frequency" name="Frequency">
      </e-series>
      <e-series :dataSource="data" type="Pareto" xName="issue" yName="cumulative" 
                name="Cumulative %" :marker="marker">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const data = [
  { issue: 'Software', frequency: 45, cumulative: 45 },
  { issue: 'Hardware', frequency: 30, cumulative: 75 },
  { issue: 'Network', frequency: 15, cumulative: 90 },
  { issue: 'User Error', frequency: 10, cumulative: 100 }
];
const marker = { visible: true };
</script>
```

**Data Structure:**
```vue
[
  { category: 'Issue A', frequency: 50, cumulative: 50 },
  { category: 'Issue B', frequency: 30, cumulative: 80 },
  { category: 'Issue C', frequency: 15, cumulative: 95 },
  { category: 'Issue D', frequency: 5, cumulative: 100 }
]
```

**Key Props:**
- `paretoOptions` - Configure the line appearance (fill, width, dashArray, marker)

### Waterfall Chart
Best for: Showing cumulative effect of sequential positive/negative values

```vue
<e-series :dataSource="data" type="Waterfall" xName="month" yName="value" name="Cash Flow">
</e-series>
```

**Data Structure:**
```vue
[
  { month: 'Start', value: 100, isTotal: true },
  { month: 'Sales', value: 50 },
  { month: 'Costs', value: -20 },
  { month: 'Profit', value: 0, isTotal: true }
]
```

### Box and Whisker Chart
Best for: Statistical distribution and outlier detection

```vue
<e-series :dataSource="data" type="BoxAndWhisker" xName="category" yName="values" name="Distribution">
</e-series>
```

### Error Bar Chart
Best for: Showing uncertainty/variability in measurements

```vue
<e-series :dataSource="data" type="Line" xName="month" yName="value" name="Data" :errorBar='errorBar'>
</e-series>
```

With error bar configuration:
```vue
const errorBar = { 
  visible: true,
  type: 'StandardDeviation',  // or Fixed, Percentage, StandardError
  verticalErrorValue: 2
};
```

---

## Multiple Series

### Comparing Multiple Series

Render multiple datasets on one chart:

```vue
<template>
  <ejs-chart :title="Monthly Revenue">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="east" name="East Region">
      </e-series>
      <e-series :dataSource="data" type="Column" xName="month" yName="west" name="West Region">
      </e-series>
      <e-series :dataSource="data" type="Column" xName="month" yName="north" name="North Region">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const data = [
  { month: "Jan", east: 35, west: 28, north: 42 },
  { month: "Feb", east: 28, west: 35, north: 38 },
  { month: "Mar", east: 34, west: 32, north: 45 },
];
</script>
```

**Best Practices:**
1. Keep series count ≤4-5 for clarity
2. Use consistent colors for related series
3. Order series logically (importance or alphabetical)

### Mixed Chart Types

Different series can have different types:

```vue
<e-series-collection>
  <e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales">
  </e-series>
  <e-series :dataSource="data" type="Line" xName="month" yName="profit" name="Profit">
  </e-series>
</e-series-collection>
```

---

## Vertical Chart Orientation

The `isTransposed` property allows you to render any chart in a vertical (transposed) orientation. This swaps the X and Y axes, making columns become rows and vice versa.

```vue
<template>
  <ejs-chart :title="Sales Data" isTransposed="true">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const data = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];
</script>
```

**Key Features:**
- `isTransposed="true"` - Rotates the entire chart 90 degrees
- Works with all chart types (Column, Line, Area, Spline, etc.)
- X-axis becomes vertical, Y-axis becomes horizontal
- Useful for displaying categories with long names (horizontal layout is more readable)

**Best Use Cases:**
- Charts with many category labels
- Comparing values in a horizontal layout
- Creating dashboard variations
- Improving readability of category names

---

## Dynamically Changing Chart Types

### Update Series Type at Runtime

```vue
<template>
  <div>
    <select v-model="selectedType" @change="changeChartType">
      <option>Column</option>
      <option>Line</option>
      <option>Area</option>
      <option>Bar</option>
    </select>
    
    <ejs-chart ref="chart">
      <e-series-collection>
        <e-series :dataSource="data" :type="selectedType" xName="month" yName="sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedType = ref("Column");
const chart = ref(null);

const changeChartType = () => {
  // Type automatically updates via v-model binding
  // Chart re-renders with new type
};
</script>
```

### Programmatic Type Change

```vue
// Get chart instance
const chartInstance = chart.value.ej2_instances[0];

// Change series type
chartInstance.series[0].type = "Line";

// Refresh chart
chartInstance.refresh();
```

---

## Series Configuration Patterns

### Pattern 1: Color by Series
```vue
<e-series :dataSource="data" type="Column" xName="month" yName="sales" 
          fill="#FF6B6B" name="Sales">
</e-series>
```

### Pattern 2: Conditional Visibility
```vue
<template>
  <e-series :dataSource="data" type="Column" 
          xName="month" yName="value1" name="Series 1" :visible="visible">
  </e-series>
</template>

<script setup>
const visible = false;
</script>
```

### Pattern 3: Dynamic Data Source
```vue
// Update series data
chartInstance.series[0].dataSource = newData;
chartInstance.refresh();
```

### Pattern 4: Series with Custom Markers
```vue
<template>
  <e-series :dataSource="data" type="Line" xName="month" yName="sales" :marker="marker">
  </e-series>
</template>

<script setup>
const marker = { 
    visible: true, 
    width: 10, 
    height: 10, 
    shape: 'Circle', 
    border: { 
      width: 2, 
      color: '#F57C00' 
    } 
};
</script>
```

## Enable Complex Property in Series

When working with complex, nested data structures, the `enableComplexProperty` option allows you to bind deeply nested object properties directly to the chart without flattening your data structure.

### Using Complex Properties

Set `enableComplexProperty="true"` on a series to enable dot notation for nested property access:

```vue
<template>
  <ejs-chart :title="Complex Data Binding">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="user.name" yName="metrics.sales" 
                name="Sales" enableComplexProperty="true">
      </e-series>
      <e-series :dataSource="data" type="Column" xName="user.name" yName="metrics.profit" 
                name="Profit" enableComplexProperty="true">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const data = [
  { 
    user: { name: 'Alice', region: 'East' }, 
    metrics: { sales: 100, profit: 25 } 
  },
  { 
    user: { name: 'Bob', region: 'West' }, 
    metrics: { sales: 85, profit: 20 } 
  }
];
</script>
```

**Data Structure with Nesting:**
```vue
[
  { 
    group: { x: 'Category A', y: 50 }, 
    value: 100 
  },
  { 
    group: { x: 'Category B', y: 75 }, 
    value: 120 
  }
]
```

**Usage:**
- `xName="group.x"` - Accesses nested x value
- `yName="group.y"` - Accesses nested y value
- Use dot notation for any level of nesting

This is useful when:
- Your data comes from APIs with nested structures
- You have hierarchical data objects
- You want to avoid data transformation/flattening
- Working with ORM/database objects

---

## Choosing the Right Chart Type

| Goal | Chart Type | Example |
|------|-----------|---------|
| Compare values across categories | Column, Bar | Sales by region |
| Show trends over time | Line, Area, Spline | Stock price over months |
| Show trends with step intervals | StepLine, StepArea | Temperature changes |
| Show trends with colored segments | MultiColoredLine | Performance tracking |
| Show stacked trends | StackingLine, StackingArea | Multi-product sales |
| Show proportional trends (100%) | StackingLine100, StackingArea100, StackingColumn100, StackingBar100 | Market share breakdown |
| Show stacked step trends | StackingStepArea | Cumulative step changes |
| Show area with multiple colors | MultiColoredArea | Multi-phase data visualization |
| Display in vertical/transposed layout | Any type with isTransposed | Long category names, horizontal layout |
| Show proportion of whole | Pie, Doughnut | Market share breakdown |
| Show data ranges | RangeColumn, RangeArea, RangeStepArea, SplineRangeArea | Temperature ranges, forecast intervals |
| Correlation between two variables | Scatter | Age vs income |
| Distribution analysis | Histogram, BoxAndWhisker | Test score distribution |
| Stock prices | Candlestick, HLOC, Hilo | Financial data |
| Multi-dimensional data | Bubble, Scatter | GDP, population, density |
| 360° comparison | Polar, Radar | Performance metrics |
| Composition over time (stacked) | StackingColumn, StackingBar, StackingArea | Product sales breakdown |
| Cumulative positive/negative | Waterfall | Cash flow, budget variance |
| Identify significant factors (80/20) | Pareto | Problem priority analysis |
| Show measurement variability | Error Bar | Experiment results |

## Next Steps

- Configure axes: [Axes and Scale](../axes-and-scale.md)
- Add tooltips and legend: [Legend and Tooltips](../legend-and-tooltips.md)
- Customize colors: [Customization and Styling](../customization-and-styling.md)
