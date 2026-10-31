# Series and Data Binding

## Table of Contents
- [Data Structure](#data-structure)
  - [Basic Data Format](#basic-data-format)
  - [Real-World Example: Transmission Line](#real-world-example-transmission-line)
- [DataSource vs Points](#datasource-vs-points)
  - [Method 1: Using dataSource](#method-1-using-datasource)
  - [Method 2: Using points](#method-2-using-points)
- [Resistance and Reactance Mapping](#resistance-and-reactance-mapping)
  - [Default Mapping](#default-mapping)
  - [Custom Field Names](#custom-field-names)
  - [Data Transformation Example](#data-transformation-example)
- [Adding Multiple Series](#adding-multiple-series)
  - [Example: Two Transmission Lines](#example-two-transmission-lines)
  - [Dynamically Adding Series](#dynamically-adding-series)
- [Series Customization](#series-customization)
  - [Color Customization](#color-customization)
  - [Line Width](#line-width)
  - [Transparency (Opacity)](#transparency-opacity)
  - [Visibility](#visibility)
  - [Complete Customization Example](#complete-customization-example)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Example: Fetching Live Data](#example-fetching-live-data)
  - [Example: Modifying Data Points](#example-modifying-data-points)
- [Common Patterns](#common-patterns)
  - [Pattern: Filtered Series](#pattern-filtered-series)
  - [Pattern: Color Scheme by Category](#pattern-color-scheme-by-category)

## Data Structure

Smith Chart requires data with two properties: **resistance** and **reactance**. These represent real and imaginary impedance components.

### Basic Data Format

```javascript
const dataSource = [
  { resistance: 10, reactance: 25 },    // High impedance point
  { resistance: 5, reactance: 12 },     // Medium impedance point
  { resistance: 2, reactance: 4 },      // Lower impedance point
  { resistance: 0, reactance: 0 }       // Reference point
];
```

### Real-World Example: Transmission Line

```javascript
const transmissionLineData = [
  { resistance: 0, reactance: 0.05 },
  { resistance: 0, reactance: 0.05 },
  { resistance: 0.3, reactance: 0.1 },
  { resistance: 0.5, reactance: 0.2 },
  { resistance: 1.5, reactance: 0.5 },
  { resistance: 2.0, reactance: 0.5 },
  { resistance: 2.5, reactance: 0.4 },
  { resistance: 3.5, reactance: 0.0 },
  { resistance: 4.5, reactance: -0.5 },
  { resistance: 5.0, reactance: -1.0 }
];
```

**Note:** Negative reactance indicates inductive behavior (below real axis on chart).

## DataSource vs Points

The Smith Chart provides two methods to supply data.

### Method 1: Using dataSource

Binds an array of data objects. Most common approach.

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from "@syncfusion/ej2-vue-charts";

export default {
  name: "App",
  components: {
    "ejs-smithchart": SmithchartComponent,
    "e-seriesCollection": SeriesCollectionDirective,
    "e-series": SeriesDirective
  },
  data: function () {
    return {
      dataSource: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 },
        { resistance: 4.5, reactance: 2 }
      ],
      name: 'Transmission1',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

**When to use dataSource:**
- Data loaded from an API
- Data calculated at runtime
- Need dynamic updates
- Large datasets

### Method 2: Using points

Explicitly defines points as an array. Works identically to dataSource.

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        :points='points' 
        :name='name'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from "@syncfusion/ej2-vue-charts";
export default {
  name: "App",
  components: {
  "ejs-smithchart": SmithchartComponent,
  "e-seriesCollection": SeriesCollectionDirective,
  "e-series": SeriesDirective
  },
  data: function () {
    return {
      points: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 },
        { resistance: 4.5, reactance: 2 }
      ],
      name: 'Transmission1'
    }
  }
}
</script>
```

**When to use points:**
- Fixed, static data
- Small datasets
- Hardcoded example data
- Testing or demos

## Resistance and Reactance Mapping

Use the `resistance` and `reactance` props to map field names in your data.

### Default Mapping

```vue
<e-series 
  :dataSource='data' 
  :resistance='resistance' 
  :reactance='reactance'>
</e-series>
```

Where:
- `:resistance="'resistance'"` - Field name containing real impedance
- `:reactance="'reactance'"` - Field name containing imaginary impedance

### Custom Field Names

If your data uses different property names, map them explicitly:

```javascript
// Your data with custom field names
const impedanceData = [
  { real: 10, imaginary: 25 },
  { real: 8, imaginary: 6 },
  { real: 6, imaginary: 4.5 }
];
```

```vue
<e-series 
  :dataSource='impedanceData' 
  :resistance="'real'" 
  :reactance="'imaginary'">
</e-series>
```

### Data Transformation Example

Transform API data to match Smith Chart format:

```javascript
export default {
  methods: {
    transformData(apiResponse) {
      return apiResponse.map(item => ({
        resistance: item.impedanceReal,
        reactance: item.impedanceImaginary
      }));
    }
  },
  async mounted() {
    const response = await fetch('/api/transmission-data');
    const apiData = await response.json();
    this.dataSource = this.transformData(apiData);
  }
}
```

## Adding Multiple Series

Plot multiple transmission lines on the same Smith Chart for comparison.

### Example: Two Transmission Lines

```vue
<template>
  <div class="control_wrapper">
    <ejs-smithchart id="smithchart" :title='title'>
      <e-seriesCollection>
        <e-series 
          :dataSource='data1' 
          :name='name1' 
          :reactance='reactance' 
          :resistance='resistance'
          :fill='fill1'>
        </e-series>
        <e-series 
          :dataSource='data2' 
          :name='name2' 
          :reactance='reactance' 
          :resistance='resistance'
          :fill='fill2'>
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function () {
    return {
      title: { text: 'Comparing Two Transmission Lines' },
      data1: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 },
        { resistance: 0, reactance: 0.15 }
      ],
      data2: [
        { resistance: 0, reactance: 0.05 },
        { resistance: 0.3, reactance: 0.2 },
        { resistance: 0.5, reactance: 0.4 },
        { resistance: 1.0, reactance: 0.8 }
      ],
      name1: 'Cable A (50Ω)',
      name2: 'Cable B (75Ω)',
      reactance: 'reactance',
      resistance: 'resistance',
      fill1: '#FF5733',
      fill2: '#33FF57'
    }
  }
}
</script>
```

### Dynamically Adding Series

Add series at runtime:

```vue
<template>
  <div>
    <button @click="addSeries">Add Transmission Line</button>
    <ejs-smithchart id="smithchart">
      <e-seriesCollection>
        <e-series 
          v-for="(series, index) in seriesList" 
          :key="index"
          :dataSource='series.data' 
          :name='series.name'
          :reactance='reactance' 
          :resistance='resistance'>
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      seriesList: [
        {
          name: 'Line 1',
          data: [
            { resistance: 10, reactance: 25 },
            { resistance: 0, reactance: 0.15 }
          ]
        }
      ],
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  methods: {
    addSeries() {
      this.seriesList.push({
        name: `Line ${this.seriesList.length + 1}`,
        data: [
          { resistance: Math.random() * 10, reactance: Math.random() * 25 },
          { resistance: 0, reactance: 0.15 }
        ]
      });
    }
  }
}
</script>
```

## Series Customization

Customize each series appearance and behavior with these properties.

### Color Customization

```vue
<e-series 
  :dataSource='dataSource' 
  :fill='fill'
  :name='name'
  :reactance='reactance' 
  :resistance='resistance'>
</e-series>
```

```javascript
data: function () {
  return {
    fill: '#009933'  // Green color
  }
}
```

### Line Width

```vue
<e-series 
  :dataSource='dataSource' 
  :width='lineWidth'
  :name='name'
  :reactance='reactance' 
  :resistance='resistance'>
</e-series>
```

```javascript
data: function () {
  return {
    lineWidth: 2.5  // Thicker line
  }
}
```

### Transparency (Opacity)

```vue
<e-series 
  :dataSource='dataSource' 
  :opacity='seriesOpacity'
  :name='name'
  :reactance='reactance' 
  :resistance='resistance'>
</e-series>
```

```javascript
data: function () {
  return {
    seriesOpacity: 0.75  // 75% opacity (0-1 scale)
  }
}
```

### Visibility

Hide a series without removing it:

```vue
<e-series 
  :dataSource='dataSource' 
  :visibility='visibility'
  :name='name'
  :reactance='reactance' 
  :resistance='resistance'>
</e-series>
```

```javascript
data: function () {
  return {
    visibility: 'visible'  // or 'hidden'
  }
}
```

### Complete Customization Example

```vue
<template>
  <ejs-smithchart id="smithchart" :title='title'>
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource1' 
        :name='name1' 
        :fill='fill1'
        :width='width1'
        :opacity='opacity1'
        :visibility='visibility1'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
      <e-series 
        :dataSource='dataSource2' 
        :name='name2' 
        :fill='fill2'
        :width='width2'
        :opacity='opacity2'
        :visibility='visibility2'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from "@syncfusion/ej2-vue-charts";
export default {
  name: "App",
  components: {
  "ejs-smithchart": SmithchartComponent,
  "e-seriesCollection": SeriesCollectionDirective,
  "e-series": SeriesDirective
  },
  data: function () {
    return {
      title: { text: 'Customized Series' },
      // Series 1: Thick solid line
      dataSource1: [ /* data */ ],
      name1: 'Thick Red Line',
      fill1: '#FF0000',
      width1: 3,
      opacity1: 1.0,
      visibility1: 'visible',
      // Series 2: Thin transparent line
      dataSource2: [ /* data */ ],
      name2: 'Thin Blue Line',
      fill2: '#0000FF',
      width2: 1,
      opacity2: 0.5,
      visibility2: 'visible',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

## Dynamic Data Updates

Update series data after initial render.

### Example: Fetching Live Data

```vue
<template>
  <div>
    <button @click="refreshData">Refresh Data</button>
    <p>Last Updated: {{ lastUpdate }}</p>
    <ejs-smithchart id="smithchart">
      <e-seriesCollection>
        <e-series 
          :dataSource='dataSource' 
          :name='name'
          :reactance='reactance' 
          :resistance='resistance'>
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      dataSource: [],
      name: 'Real-Time Data',
      lastUpdate: 'Not updated',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  methods: {
    async refreshData() {
      try {
        const response = await fetch('/api/smith-data');
        const newData = await response.json();
        this.dataSource = newData;
        this.lastUpdate = new Date().toLocaleTimeString();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
  },
  mounted() {
    // Fetch initial data
    this.refreshData();
    // Auto-refresh every 30 seconds
    setInterval(this.refreshData, 30000);
  }
}
</script>
```

### Example: Modifying Data Points

```javascript
methods: {
  addDataPoint() {
    this.dataSource.push({
      resistance: Math.random() * 10,
      reactance: Math.random() * 25
    });
    // Trigger Vue reactivity
    this.dataSource = [...this.dataSource];
  },
  
  removeDataPoint(index) {
    this.dataSource.splice(index, 1);
    this.dataSource = [...this.dataSource];
  },
  
  updateDataPoint(index, newResistance, newReactance) {
    this.$set(this.dataSource, index, {
      resistance: newResistance,
      reactance: newReactance
    });
  }
}
```

## Common Patterns

### Pattern: Filtered Series

Display series only when conditions are met:

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        v-if="showSeries1"
        :dataSource='series1' 
        :name='name1'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
      <e-series 
        v-if="showSeries2"
        :dataSource='series2' 
        :name='name2'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>
```

### Pattern: Color Scheme by Category

```javascript
const seriesConfig = [
  { name: 'Low Impedance', fill: '#FF5733', data: [...] },
  { name: 'Medium Impedance', fill: '#33FF57', data: [...] },
  { name: 'High Impedance', fill: '#3357FF', data: [...] }
];
```
