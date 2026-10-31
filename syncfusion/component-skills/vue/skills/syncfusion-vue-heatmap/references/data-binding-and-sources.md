# Data Binding and Working with Data in HeatMap

## Table of Contents
- [Data Source Overview](#data-source-overview)
  - [Key Concept: 2D Array Structure](#key-concept-2d-array-structure)
- [2D Array Format](#2d-array-format)
  - [Basic Structure](#basic-structure)
  - [Array Dimensions](#array-dimensions)
- [Populating Basic Data](#populating-basic-data)
  - [Simple Revenue Data](#simple-revenue-data)
  - [With Axis Labels](#with-axis-labels)
- [Understanding Data Values](#understanding-data-values)
  - [Value Range and Color Mapping](#value-range-and-color-mapping)
  - [Value Types](#value-types)
  - [Zero and Negative Values](#zero-and-negative-values)
- [Dynamic Data Binding](#dynamic-data-binding)
  - [Updating Data at Runtime](#updating-data-at-runtime)
  - [Fetching Data from API](#fetching-data-from-api)
- [Sample Datasets](#sample-datasets)
  - [Employee Performance (6×12)](#employee-performance-612)
  - [Website Traffic (7×24)](#website-traffic-724)
  - [Temperature Grid (4×5)](#temperature-grid-45)
- [Data Validation](#data-validation)
  - [Ensuring Data Consistency](#ensuring-data-consistency)
  - [Data Preparation Example](#data-preparation-example)
  - [Handling Missing Data](#handling-missing-data)


## Data Source Overview

The HeatMap component visualizes two-dimensional data where each value is mapped to a color intensity. The `dataSource` property accepts a 2D array of numerical values that represent the intensity levels in your visualization.

### Key Concept: 2D Array Structure

HeatMap data is organized as:
- **Rows** represent the primary dimension (typically Y-axis, e.g., days of week)
- **Columns** represent the secondary dimension (typically X-axis, e.g., employees)
- **Cell Values** are numerical data points that control color intensity

## 2D Array Format

### Basic Structure

The simplest data format is a 2D array of numbers:

```javascript
dataSource: [
  [73, 39, 26, 39, 94, 0],      // Row 1 (e.g., Monday)
  [93, 58, 53, 38, 26, 68],     // Row 2 (e.g., Tuesday)
  [99, 28, 22, 4, 66, 90],      // Row 3 (e.g., Wednesday)
  [14, 26, 97, 69, 69, 3]       // Row 4 (e.g., Thursday)
]
```

Each inner array represents a row, and each element is a cell value.

### Array Dimensions

The array dimensions determine grid size:
- Number of rows = Y-axis categories (rows in HeatMap)
- Number of columns = X-axis categories (columns in HeatMap)
- Each value = cell color intensity

Example: 4 rows × 6 columns creates a 4×6 grid.

## Populating Basic Data

### Simple Revenue Data

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" :dataSource='dataSource'></ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  name: "App",
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79]
      ]
    }
  }
}
</script>
```

This creates a 6×6 HeatMap with numerical values representing sales data.

### With Axis Labels

Add context to data by providing axis labels:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent, Tooltip, Legend } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79]
      ],
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael']
      },
      yAxis: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      }
    }
  },
  provide: {
    heatmap: [Tooltip, Legend]
  }
}
</script>
```

The labels now identify what each row and column represents.

## Understanding Data Values

### Value Range and Color Mapping

The HeatMap maps numerical values to colors based on the range of your data:
- **Minimum value** → Lightest color
- **Maximum value** → Darkest color
- **Values in between** → Gradient colors

For data range 0-100:
- 0 = lightest shade
- 100 = darkest shade
- 50 = middle shade

### Value Types

All values should be numerical (integers or decimals):
- ✅ Valid: `[73, 39, 26.5, 100]`
- ❌ Invalid: `["73", "high", null]` - non-numeric values

### Zero and Negative Values

The HeatMap supports zero and negative numbers:

```javascript
dataSource: [
  [-10, 0, 15, 25],
  [5, 10, 20, 30],
  [0, 5, 10, 15]
]
```

Negative values map to the lower end of the color spectrum, zero to middle, and positive to higher intensity.

## Dynamic Data Binding

### Updating Data at Runtime

Change the dataSource dynamically to refresh the visualization:

```vue
<template>
  <div id="app">
    <button @click="updateData">Update Data</button>
    <ejs-heatmap id="heatmap" :dataSource='dataSource'></ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3]
      ]
    }
  },
  methods: {
    updateData: function() {
      // Generate random data
      this.dataSource = [
        [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
        [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
        [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
        [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100]
      ];
    }
  }
}
</script>
```

The HeatMap automatically re-renders when dataSource changes.

### Fetching Data from API

Load data from a server and bind it to the HeatMap:

```vue
<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      dataSource: []
    }
  },
  mounted: function() {
    // Fetch data from API
    fetch('/api/heatmap-data')
      .then(response => response.json())
      .then(data => {
        this.dataSource = data.values;
      })
      .catch(error => console.error('Error:', error));
  }
}
</script>
```

## Sample Datasets

### Employee Performance (6×12)

Sales revenue by employee and week:

```javascript
dataSource: [
  [73, 39, 26, 39, 94, 0, 45, 67, 23, 89, 12, 56],
  [93, 58, 53, 38, 26, 68, 78, 34, 91, 45, 67, 23],
  [99, 28, 22, 4, 66, 90, 12, 78, 56, 34, 89, 45]
]
```

### Website Traffic (7×24)

Page views by day of week and hour of day:

```javascript
dataSource: [
  [12, 15, 8, 5, 3, 2, 1, 0, 5, 10, 20, 35, 45, 50, 48, 40, 35, 30, 25, 20, 18, 15, 10, 8],
  [10, 12, 7, 4, 2, 1, 0, 1, 6, 12, 25, 40, 55, 60, 58, 48, 40, 32, 28, 22, 16, 12, 8, 5],
  [15, 18, 12, 8, 5, 3, 2, 5, 15, 30, 50, 70, 80, 85, 78, 65, 50, 38, 30, 22, 18, 14, 10, 6],
  [8, 10, 5, 2, 0, 0, 0, 2, 8, 18, 35, 52, 65, 70, 68, 58, 45, 32, 24, 16, 12, 8, 5, 3],
  [5, 6, 3, 1, 0, 0, 0, 1, 3, 8, 15, 28, 40, 45, 42, 35, 28, 20, 15, 10, 7, 4, 2, 1],
  [20, 25, 18, 12, 8, 5, 3, 8, 20, 40, 65, 85, 95, 100, 92, 75, 60, 42, 35, 25, 20, 16, 12, 8],
  [25, 30, 22, 15, 10, 7, 5, 10, 25, 45, 70, 90, 100, 105, 98, 80, 65, 45, 38, 28, 22, 18, 14, 10]
]
```

### Temperature Grid (4×5)

Temperature readings across 4 locations and 5 months:

```javascript
dataSource: [
  [65, 72, 81, 90, 95],  // Location 1
  [68, 75, 84, 92, 98],  // Location 2
  [62, 70, 79, 88, 92],  // Location 3
  [70, 78, 87, 95, 100]  // Location 4
]
```

## Data Validation

### Ensuring Data Consistency

For proper HeatMap rendering, ensure:

1. **All rows have the same column count** - Ragged arrays may cause rendering issues
2. **All values are numbers** - Strings, null, or undefined values should be converted
3. **Data is not empty** - Provide at least one data point
4. **Reasonable value ranges** - Very large or very small values may not display well

### Data Preparation Example

```javascript
// Convert string data to numbers
function prepareData(rawData) {
  return rawData.map(row => 
    row.map(value => {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;  // Default to 0 if not a number
    })
  );
}

const cleanData = prepareData(sourceData);
this.dataSource = cleanData;
```

### Handling Missing Data

Replace missing or invalid values with a default:

```javascript
const dataSource = [
  [73, null, 26],      // null value
  [93, 58, undefined], // undefined value
  [99, NaN, 22]        // NaN value
];

// Clean the data
const cleaned = dataSource.map(row =>
  row.map(val => (val === null || val === undefined || isNaN(val)) ? 0 : val)
);
```
