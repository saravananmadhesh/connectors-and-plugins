# Data Binding and Axis Configuration

## Table of Contents
- [Data Binding Overview](#data-binding-overview)
- [Simple Array Data](#simple-array-data)
  - [Numeric Array Binding](#numeric-array-binding)
  - [When to Use](#when-to-use)
- [Object Array Data](#object-array-data)
  - [Basic Object Array Binding](#basic-object-array-binding)
  - [Object Array with Dates](#object-array-with-dates)
- [Category vs Numeric Data](#category-vs-numeric-data)
  - [Numeric Data (Default)](#numeric-data-default)
  - [Category Data](#category-data)
  - [Category Comparison](#category-comparison)
- [Axis Settings](#axis-settings)
  - [Basic Axis Configuration](#basic-axis-configuration)
  - [Axis Properties](#axis-properties)
  - [Why Use Axis Settings](#why-use-axis-settings)
  - [Category Axis Settings](#category-axis-settings)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Real-time Data Binding](#real-time-data-binding)
  - [Update Object Array Data](#update-object-array-data)
  - [Data Mutation Best Practices](#data-mutation-best-practices)
- [Data Format Requirements](#data-format-requirements)
  - [Valid Data Formats](#valid-data-formats)
  - [Invalid Data Formats](#invalid-data-formats)
  - [Data Validation](#data-validation)
- [Common Data Binding Patterns](#common-data-binding-patterns)
  - [Pattern 1: Dashboard with Multiple Metrics](#pattern-1-dashboard-with-multiple-metrics)
  - [Pattern 2: Computed Property Data](#pattern-2-computed-property-data)
  - [Pattern 3: Limit Data Points for Performance](#pattern-3-limit-data-points-for-performance)
  - [Pattern 4: Data Format Conversion](#pattern-4-data-format-conversion)

---

## Data Binding Overview

Sparkline binds data through the `dataSource` property, which accepts:
- Simple numeric arrays: `[1, 2, 3, 4, 5]`
- Object arrays: `[{x: 1, y: 10}, ...]`
- Category arrays: `[{day: 'Mon', value: 15}, ...]`

The `xName` and `yName` properties map object properties to axes.

---

## Simple Array Data

### Numeric Array Binding

Bind simple numeric arrays directly:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='simpleData'
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
      height: '100px',
      width: '300px',
      simpleData: [5, 3, 4, 6, 8, 7, 9, 1, 3, 5]
    }
  }
}
</script>
```

**How it works:**
- Array values become Y-axis values
- Index (0, 1, 2, ...) becomes X-axis values
- Perfect for simple trend visualization
- No property mapping needed

### When to Use
- Quick prototyping
- Simple time-series without labels
- Dashboard mini-charts
- Single-series data

---

## Object Array Data

### Basic Object Array Binding

Map object properties to axes:

```vue


<template>
    <div class="control_wrapper">
    <div>
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :height='height' :width='width'></ejs-sparkline>
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
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    width: 100%;
    height: 100%;
}
</style>
```

**Configuration:**
- `xName='quarter'`: Maps quarter property to X-axis
- `yName='revenue'`: Maps revenue property to Y-axis
- X values can be strings, numbers, or dates
- Y values must be numeric

### Object Array with Dates

Use dates for time-series data:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='dateData'
      xName='date'
      yName='sales'
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
      height: '100px',
      width: '350px',
      dateData: [
        { date: new Date(2022, 0, 1), sales: 25000 },
        { date: new Date(2022, 1, 1), sales: 32000 },
        { date: new Date(2022, 2, 1), sales: 28000 },
        { date: new Date(2022, 3, 1), sales: 35000 }
      ]
    }
  }
}
</script>
```

---

## Category vs Numeric Data

### Numeric Data (Default)

Use numeric X-values when actual magnitude matters:

```vue
<template>
<div>
<ejs-sparkline 
id="sparkline"
:dataSource='numericData'
xName='hours'
yName='temperature'
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
    height: '100px',
      width: '350px',
      numericData: [
        { hours: 0, temperature: 15 },
        { hours: 3, temperature: 12 },
        { hours: 6, temperature: 10 },
        { hours: 9, temperature: 14 },
        { hours: 12, temperature: 20 }
      ]
  }
}
}
</script>
```

**Use numeric when:**
- X-axis represents continuous numeric values (time in hours, distance, etc.)
- Spacing between points has significance
- Axis scale matters for interpretation

### Category Data

Use category data for non-numeric labels:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='categoryData'
      xName='day'
      yName='visitors'
      valueType='Category'
      :height='height'
      :width='width'>
    </ejs-sparkline>
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
      width: '350px',
      categoryData: [
        { day: 'Monday', visitors: 150 },
        { day: 'Tuesday', visitors: 180 },
        { day: 'Wednesday', visitors: 160 },
        { day: 'Thursday', visitors: 190 },
        { day: 'Friday', visitors: 210 }
      ]
    }
  }
}
</script>
```

**Key setting:** `valueType='Category'`

**Use category when:**
- X-axis represents discrete categories (days, products, regions)
- Axis labels are text (not numbers)
- Spacing between categories is equal
- Order can be rearranged

### Category Comparison

```vue
<script>
export default {
  data: function() {
    return {
      // Numeric: spacing = actual difference
      numericData: [
        { year: 2018, sales: 100 },
        { year: 2019, sales: 120 },
        { year: 2022, sales: 140 }  // Gap of 3 years visually distinct
      ],
      
      // Category: spacing = equal
      categoryData: [
        { year: 'Year 1', sales: 100 },
        { year: 'Year 2', sales: 120 },
        { year: 'Year 5', sales: 140 }  // Spacing same, no year number distinction
      ]
    }
  }
}
</script>
```

---

## Axis Settings

### Basic Axis Configuration

Control axis min/max values:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      xName='x'
      yName='y'
      :axisSettings='axisSettings'
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
      height: '100px',
      width: '300px',
      axisSettings: {
        minX: 0,
        maxX: 10,
        minY: 0,
        maxY: 100
      },
      data: [
        { x: 1, y: 25 },
        { x: 3, y: 50 },
        { x: 5, y: 75 },
        { x: 7, y: 40 },
        { x: 9, y: 85 }
      ]
    }
  }
}
</script>
```

### Axis Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `minX` | Number | Minimum X-axis value | `0` |
| `maxX` | Number | Maximum X-axis value | `10` |
| `minY` | Number | Minimum Y-axis value | `0` |
| `maxY` | Number | Maximum Y-axis value | `100` |

### Why Use Axis Settings

```vue
<script>
export default {
  data: function() {
    return {
      // Without axis settings: auto-scales based on data
      data1: [3, 6, 4, 1, 3, 2, 5],
      
      // With axis settings: fixed scale for consistency
      axisSettings: {
        minX: -1,
        maxX: 7,
        minY: -1,
        maxY: 8
      }
    }
  }
}
</script>
```

**Benefits:**
- Multiple sparklines with consistent scale
- Emphasize particular range
- Compare relative values across sparklines
- Handle edge cases (negative values, outliers)

### Category Axis Settings

For category data, axis numbers are index-based:

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='categoryData'
    xName='region'
    yName='sales'
    valueType='Category'
    :axisSettings='axisSettings'
    :height='height'
    :width='width'>
  </ejs-sparkline>
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
    width: '350px',
    // X-axis range = 0 to (array.length - 1)
    axisSettings: {
      minX: 0,
      maxX: 4,  // 5 regions: indices 0-4
      minY: 0,
      maxY: 100
    },
    categoryData: [
      { region: 'North', sales: 75 },
      { region: 'South', sales: 50 },
      { region: 'East', sales: 85 },
      { region: 'West', sales: 65 },
      { region: 'Central', sales: 70 }
    ]
  }
}
}
</script>
```

---

## Dynamic Data Updates

### Real-time Data Binding

Update data reactively:

```vue
<template>
  <div>
    <button @click="addDataPoint">Add Data</button>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='liveData'
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
      height: '100px',
      width: '300px',
      liveData: [5, 3, 4, 6, 8, 7, 9]
    }
  },
  methods: {
    addDataPoint: function() {
      const newValue = Math.floor(Math.random() * 10);
      this.liveData.push(newValue);
    }
  }
}
</script>
```

### Update Object Array Data

```vue
<template>
<div>
  <button @click="addSale">Add Sale Record</button>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='salesRecords'
    xName='day'
    yName='amount'
    :height='height'
    :width='width'>
  </ejs-sparkline>
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
    width: '350px',
    salesRecords: [
      { day: '1', amount: 1000 },
      { day: '2', amount: 1500 },
      { day: '3', amount: 1200 }
    ]
  }
},
methods: {
  addSale: function() {
    const newDay = String(this.salesRecords.length + 1);
    const newAmount = Math.floor(Math.random() * 2000) + 500;
    this.salesRecords.push({ day: newDay, amount: newAmount });
  }
}
}
</script>
```

### Data Mutation Best Practices

```vue
<script>
export default {
  methods: {
    // ✅ CORRECT: Vue detects changes
    updateData1: function() {
      this.data.push(5);  // Array mutation
      this.$set(this.data, 0, 10);  // Direct index update
      this.data = [...this.data, 5];  // Array reassignment
    },
    
    // ❌ AVOID: Vue won't detect changes
    updateData2: function() {
      this.data[0] = 10;  // Direct index (no reactivity)
      this.data.length = 0;  // Direct length manipulation
    }
  }
}
</script>
```

---

## Data Format Requirements

### Valid Data Formats

**Simple array:**
```javascript
[1, 2, 3, 4, 5]
[5.5, 10.2, 8.7, 12.1]
```

**Object array with numeric values:**
```javascript
[
  { x: 1, y: 10 },
  { x: 2, y: 20 },
  { x: 3, y: 15 }
]
```

**Object array with dates:**
```javascript
[
  { date: new Date(2022, 0, 1), value: 100 },
  { date: new Date(2022, 1, 1), value: 120 }
]
```

**Object array with category strings:**
```javascript
[
  { month: 'Jan', sales: 1000 },
  { month: 'Feb', sales: 1200 },
  { month: 'Mar', sales: 1100 }
]
```

### Invalid Data Formats

```javascript
// ❌ Non-numeric Y-values
[{ x: 1, y: 'high' }, { x: 2, y: 'low' }]

// ❌ Missing Y-values
[{ x: 1 }, { x: 2 }]

// ❌ Mixed types (inconsistent)
[{ x: 1, y: 10 }, { x: '2', y: 20 }]

// ❌ Non-numeric values in simple array
['a', 'b', 'c']
```

### Data Validation

Check data before binding:

```vue
<script>
export default {
  methods: {
    validateSparklineData: function(data, xName, yName) {
      if (!Array.isArray(data)) {
        console.error('Data must be an array');
        return false;
      }
      
      for (let item of data) {
        if (typeof item === 'object' && xName && yName) {
          if (!(xName in item) || !(yName in item)) {
            console.error(`Missing properties: ${xName} or ${yName}`);
            return false;
          }
          if (typeof item[yName] !== 'number') {
            console.error(`${yName} must be numeric, got ${typeof item[yName]}`);
            return false;
          }
        } else if (typeof item !== 'number') {
          console.error(`Array values must be numeric, got ${typeof item}`);
          return false;
        }
      }
      return true;
    }
  }
}
</script>
```

---

## Common Data Binding Patterns

### Pattern 1: Dashboard with Multiple Metrics

```vue
<template>
  <div class="metrics-dashboard">
    <div class="metric-card">
      <h4>Sales Trend</h4>
      <ejs-sparkline 
        :dataSource='salesData'
        xName='month'
        yName='amount'>
      </ejs-sparkline>
    </div>
    
    <div class="metric-card">
      <h4>Website Traffic</h4>
      <ejs-sparkline 
        :dataSource='trafficData'
        xName='day'
        yName='visitors'>
      </ejs-sparkline>
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
      salesData: [
        { month: 'Jan', amount: 5000 },
        { month: 'Feb', amount: 6500 },
        { month: 'Mar', amount: 5800 }
      ],
      trafficData: [
        { day: 'Mon', visitors: 150 },
        { day: 'Tue', visitors: 180 },
        { day: 'Wed', visitors: 160 }
      ]
    }
  }
}
</script>
```

### Pattern 2: Computed Property Data

```vue
<script>
export default {
  data: function() {
    return {
      rawValues: [100, 150, 120, 200, 180]
    }
  },
  computed: {
    // Transform raw data for sparkline
    sparklineData: function() {
      return this.rawValues.map((value, index) => ({
        period: index + 1,
        value: value
      }));
    }
  }
}
</script>
```

### Pattern 3: Limit Data Points for Performance

```vue
<script>
export default {
  methods: {
    limitDataPoints: function(data, maxPoints) {
      if (data.length <= maxPoints) return data;
      
      const step = Math.ceil(data.length / maxPoints);
      return data.filter((_, index) => index % step === 0);
    }
  },
  computed: {
    limitedSparklineData: function() {
      return this.limitDataPoints(this.allData, 50);  // Max 50 points
    }
  }
}
</script>
```

### Pattern 4: Data Format Conversion

```vue
<script>
export default {
  methods: {
    convertToSparklineFormat: function(apiResponse) {
      // Convert API format to sparkline format
      return apiResponse.map(item => ({
        date: new Date(item.timestamp),
        value: parseFloat(item.metric)
      }));
    }
  }
}
</script>
```
