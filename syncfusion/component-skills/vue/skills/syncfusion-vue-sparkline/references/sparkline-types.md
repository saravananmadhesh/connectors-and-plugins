# Sparkline Types

## Table of Contents
- [Overview](#overview)
- [Line Type](#line-type)
  - [Description](#description)
  - [Use Cases](#use-cases)
  - [Basic Line Sparkline](#basic-line-sparkline)
  - [Line Customization](#line-customization)
- [Column Type](#column-type)
  - [Description](#description-1)
  - [Use Cases](#use-cases-1)
  - [Basic Column Sparkline](#basic-column-sparkline)
  - [Column Styling](#column-styling)
- [Area Type](#area-type)
  - [Description](#description-2)
  - [Use Cases](#use-cases-2)
  - [Basic Area Sparkline](#basic-area-sparkline)
  - [Area Styling](#area-styling)
- [Pie Type](#pie-type)
  - [Description](#description-3)
  - [Use Cases](#use-cases-3)
  - [Basic Pie Sparkline](#basic-pie-sparkline)
  - [Pie Data Requirements](#pie-data-requirementsrn-2-type-based-sizing)
  ## Table of Contents
- [Win-Loss Type](#win-loss-type)
  - [Description](#description)
  - [Use Cases](#use-cases)
  - [Basic Win-Loss Sparkline](#basic-win-loss-sparkline)
  - [Win-Loss Data Convention](#win-loss-data-convention)
- [Type Selection Guide](#type-selection-guide)
  - [Decision Matrix](#decision-matrix)
  - [Type Comparison Example](#typepe-based-sizing)
  - [Pattern 3: Multi-Type Sparkline Comparison](#pattern-3-multi-type-sparkline-comparison)
- [Type-Specific Tips](#type-specific-tips)
  - [Line Type](#line-type-1)
  - [Column Type](#column-type-1)
  - [Area Type](#area-type-1)
  - [Pie Type](#pie-type-1)
  - [Win-Loss Type](#win-loss-type-1)

---

## Overview

Sparkline supports five visualization types, each suited for different data representation scenarios. Change the type using the `type` property.

**Available Types:** `Line`, `Column`, `Area`, `Pie`, `WinLoss`

---

## Line Type

### Description

Line type displays data as a continuous line, ideal for showing trends over time. Each data point connects to the next, visualizing the flow and direction of values.

### Use Cases

- Time-series trend visualization
- Stock price movements
- Temperature variations
- Website traffic trends
- Sales performance over time

### Basic Line Sparkline

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :height='height' :type='type' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '100px',
    width: '70%',
    type:'Line',
    dataSource: [
            { x: 0, xval: '2005', yval: 20090440 },
            { x: 1, xval: '2006', yval: 20264080 },
            { x: 2, xval: '2007', yval: 20434180 },
            { x: 3, xval: '2008', yval: 21007310 },
            { x: 4, xval: '2009', yval: 21262640 },
            { x: 5, xval: '2010', yval: 21515750 },
            { x: 6, xval: '2011', yval: 21766710 },
            { x: 7, xval: '2012', yval: 22015580 },
            { x: 8, xval: '2013', yval: 22262500 },
            { x: 9, xval: '2014', yval: 22507620 },
        ]
    }
  }
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

### Line Customization

Customize line appearance:

```vue
<ejs-sparkline 
  :dataSource='data'
  type='Line'
  fill='#1976d2'
  lineWidth='2'
  :height='height'
  :width='width'>
</ejs-sparkline>
```

**Properties:**
- `fill`: Color of the line
- `lineWidth`: Thickness of the line (in pixels)

---

## Column Type

### Description

Column type displays data as vertical bars, perfect for comparing values across categories. Each data point becomes a column, making comparisons easy and intuitive.

### Use Cases

- Category comparison (regions, products, teams)
- Monthly/quarterly performance
- Count data visualization
- Frequency distributions
- Budget allocations

### Basic Column Sparkline

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :type='type' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
   height: '150px',
    width: '200px',
    type:'Column',
    dataSource: [
            { x: 0, xval: '2005', yval: 20090440 },
            { x: 1, xval: '2006', yval: 20264080 },
            { x: 2, xval: '2007', yval: 20434180 },
            { x: 3, xval: '2008', yval: 21007310 },
            { x: 4, xval: '2009', yval: 21262640 },
            { x: 5, xval: '2010', yval: 21515750 },
            { x: 6, xval: '2011', yval: 21766710 },
            { x: 7, xval: '2012', yval: 22015580 },
            { x: 8, xval: '2013', yval: 22262500 },
            { x: 9, xval: '2014', yval: 22507620 },
        ]
    }
  }
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

### Column Styling

Customize column appearance:

```vue
<ejs-sparkline 
  :dataSource='data'
  type='Column'
  fill='#20c997'
  xName='quarter'
  yName='profit'
  :height='height'
  :width='width'>
</ejs-sparkline>
```

---

## Area Type

### Description

Area type combines line visualization with a filled area beneath, emphasizing magnitude and trend simultaneously. Ideal for showing cumulative impact or total values.

### Use Cases

- Cumulative data over time
- Total revenue/profit trends
- Population growth visualization
- Total user engagement
- Resource utilization tracking

### Basic Area Sparkline

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :type='type' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '100px',
    width: '70%',
    type:'Area',
    dataSource: [
            { x: 0, xval: '2005', yval: 20090440 },
            { x: 1, xval: '2006', yval: 20264080 },
            { x: 2, xval: '2007', yval: 20434180 },
            { x: 3, xval: '2008', yval: 21007310 },
            { x: 4, xval: '2009', yval: 21262640 },
            { x: 5, xval: '2010', yval: 21515750 },
            { x: 6, xval: '2011', yval: 21766710 },
            { x: 7, xval: '2012', yval: 22015580 },
            { x: 8, xval: '2013', yval: 22262500 },
            { x: 9, xval: '2014', yval: 22507620 },
        ]
    }
  }
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

### Area Styling

```vue
<ejs-sparkline 
  :dataSource='data'
  type='Area'
  fill='#ffc107'
  lineWidth='1'
  xName='month'
  yName='visits'
  :height='height'
  :width='width'>
</ejs-sparkline>
```

---

## Pie Type

### Description

Pie type visualizes proportional data, showing how each value contributes to a total. Each segment's size represents its proportion of the whole.

### Use Cases

- Market share visualization
- Budget allocation breakdown
- Category distribution
- Resource split visualization
- Survey response proportions

### Basic Pie Sparkline

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      xName='category'
      yName='percentage'
      type='Pie'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '200px',
      width: '70%',
      data: [
        { category: 'Product A', percentage: 25 },
        { category: 'Product B', percentage: 30 },
        { category: 'Product C', percentage: 20 },
        { category: 'Product D', percentage: 15 },
        { category: 'Product E', percentage: 10 }
      ]
    }
  }
}
</script>
```

### Pie Data Requirements

For pie sparklines:
- Y-axis values must be numeric (percentages, counts)
- Values represent segment size
- Sparkline automatically calculates proportions
- All values should be positive
- Typically 3-7 segments for clarity

---

## Win-Loss Type

### Description

Win-Loss type displays binary outcomes—typically wins/losses, successes/failures, or positive/negative values. Each data point becomes a column, with height indicating magnitude and color indicating outcome.

### Use Cases

- Game/match results
- Pass/fail test results
- Binary event tracking
- Positive/negative sentiment
- Success rate visualization

### Basic Win-Loss Sparkline

```vue
<template>
<div class="control_wrapper">
<div class="spark">
    <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :type='type' :height='height' :width='width'></ejs-sparkline>
</div>
</div>
</template>
<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
data: function() {
return {
height: '100px',
width: '70%',
type:'WinLoss',
dataSource: [
        { x: 0, xval: '2005', yval: 20090440 },
        { x: 1, xval: '2006', yval: 20264080 },
        { x: 2, xval: '2007', yval: 20434180 },
        { x: 3, xval: '2008', yval: 21007310 },
        { x: 4, xval: '2009', yval: 21262640 },
        { x: 5, xval: '2010', yval: 21515750 },
        { x: 6, xval: '2011', yval: 21766710 },
        { x: 7, xval: '2012', yval: 22015580 },
        { x: 8, xval: '2013', yval: 22262500 },
        { x: 9, xval: '2014', yval: 22507620 },
    ]
}
}
}
</script>
<style>
.spark {
width: 100%;
height: 100%;
}
</style>
```

### Win-Loss Data Convention

- **Positive values** = Win/Success (typically displayed in green or blue)
- **Negative values** = Loss/Failure (typically displayed in red)
- **Zero** = Tie/Draw (typically displayed in neutral color)
- Column height represents magnitude of outcome

```vue
<template>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='matchResults'
    xName='opponent'
    yName='score'
    type='WinLoss'
    fill='#28a745'
    :height='height'
    :width='width'>
  </ejs-sparkline>
</template>

<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '80px',
      width: '300px',
      matchResults: [
        { opponent: 'Team A', score: 15 },   // Win
        { opponent: 'Team B', score: -5 },   // Loss
        { opponent: 'Team C', score: 10 },   // Win
        { opponent: 'Team D', score: -3 },   // Loss
        { opponent: 'Team E', score: 8 }     // Win
      ]
    }
  }
}
</script>
```

---

## Type Selection Guide

### Decision Matrix

| Need | Best Type | Why |
|------|-----------|-----|
| Show trend over time | **Line** | Continuous visualization, easy to spot patterns |
| Compare values across categories | **Column** | Clear visual comparison between groups |
| Show cumulative or total values | **Area** | Emphasizes magnitude and trend together |
| Display proportions or composition | **Pie** | Intuitive representation of parts to whole |
| Visualize binary outcomes | **WinLoss** | Clear win/loss distinction with magnitude |

### Type Comparison Example

Display same data with different types:

```vue
<template>
  <div class="type-comparison">
    <div>
      <h4>Line</h4>
      <ejs-sparkline type='Line' :dataSource='data' xName='x' yName='y'></ejs-sparkline>
    </div>
    
    <div>
      <h4>Column</h4>
      <ejs-sparkline type='Column' :dataSource='data' xName='x' yName='y'></ejs-sparkline>
    </div>
    
    <div>
      <h4>Area</h4>
      <ejs-sparkline type='Area' :dataSource='data' xName='x' yName='y'></ejs-sparkline>
    </div>
  </div>
</template>
```

---

## Common Type Patterns

### Pattern 1: Dashboard Type Selection

Choose types based on data characteristics:

```javascript
// Function to determine best sparkline type
function getSparklineType(dataCharacteristics) {
  if (dataCharacteristics.isTemporal && dataCharacteristics.isContinuous) {
    return 'Line';  // Time series data
  } else if (dataCharacteristics.isCategorical) {
    return 'Column';  // Category comparison
  } else if (dataCharacteristics.isProportional) {
    return 'Pie';  // Part-to-whole
  } else if (dataCharacteristics.isBinary) {
    return 'WinLoss';  // Win/loss outcomes
  }
  return 'Line';  // Default
}
```

### Pattern 2: Type-Based Sizing

Optimize dimensions by type:

```vue
<script>
export default {
  computed: {
    sparklineConfig() {
      const configs = {
        'Line': { height: '80px', width: '200px' },
        'Column': { height: '120px', width: '200px' },
        'Area': { height: '100px', width: '200px' },
        'Pie': { height: '150px', width: '150px' },
        'WinLoss': { height: '80px', width: '200px' }
      };
      return configs[this.selectedType];
    }
  }
}
</script>
```

### Pattern 3: Multi-Type Sparkline Comparison

Display same metric with multiple types for comparison:

```vue
<template>
  <div class="sparkline-comparison">
    <div class="sparkline-item">
      <label>Trend (Line)</label>
      <ejs-sparkline 
        :dataSource='salesData'
        type='Line'
        xName='month'
        yName='sales'>
      </ejs-sparkline>
    </div>
    
    <div class="sparkline-item">
      <label>Category View (Column)</label>
      <ejs-sparkline 
        :dataSource='salesData'
        type='Column'
        xName='month'
        yName='sales'>
      </ejs-sparkline>
    </div>
  </div>
</template>
```

---

## Type-Specific Tips

### Line Type
- Use when trend direction matters
- Best for 5+ data points
- Consider `lineWidth` for visibility in small sizes

### Column Type
- Clear comparisons with 3-8 categories
- Consistent category ordering aids understanding
- Height variation immediately apparent

### Area Type
- Emphasizes magnitude combined with trend
- Better for positive values (areas don't work well with negative)
- Fill color should have transparency for layered displays

### Pie Type
- Limit to 5-7 segments for clarity
- Ensure all values are positive
- Labels difficult in small sizes

### Win-Loss Type
- Perfect for binary decision tracking
- Use consistent positive/negative convention
- Magnitude (column height) shows extent of win/loss
