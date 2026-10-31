# Axis Configuration in HeatMap

## Table of Contents
- [Axis Overview](#axis-overview)
- [Axis Types](#axis-types)
- [Category Axis](#category-axis)
  - [Basic Category Axis](#basic-category-axis)
  - [Label Matching Requirement](#label-matching-requirement)
- [Numerical Axis](#numerical-axis)
  - [Numeric Scale Labels](#numeric-scale-labels)
  - [Axis Intervals](#axis-intervals)
- [Datetime Axis](#datetime-axis)
  - [Date/Time Axis Configuration](#datetime-axis-configuration)
- [Axis Labels Configuration](#axis-labels-configuration)
  - [Custom Label Formatting](#custom-label-formatting)
  - [Label Style Properties](#label-style-properties)
- [Advanced Axis Features](#advanced-axis-features)
  - [Inverted Axis](#inverted-axis)
  - [Opposed Position](#opposed-position)
  - [Combining Advanced Features](#combining-advanced-features)
  - [Axis Visibility](#axis-visibility)

## Axis Overview

The HeatMap component uses two axes to define dimensions:
- **X-Axis** (horizontal) - Represents columns in your data (e.g., employees, products, locations)
- **Y-Axis** (vertical) - Represents rows in your data (e.g., days, months, time periods)

Both axes must be configured to properly label and identify your data dimensions.

## Axis Types

The HeatMap supports three axis types controlled by the `valueType` property:

| Type | Purpose | Use When |
|------|---------|----------|
| Category | String labels for discrete categories | Displaying named items (people, days, regions) |
| Numerical | Numeric labels for continuous ranges | Showing numeric scales (1-100, quantities) |
| Datetime | Date/time labels for temporal data | Displaying time-series data (dates, timestamps) |

## Category Axis

### Basic Category Axis

Category axis displays string labels from your labels array:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" :xAxis='xAxis' :yAxis='yAxis' :dataSource='dataSource'></ejs-heatmap>
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
      xAxis: {
        valueType: "Category",
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael']
      },
      yAxis: {
        valueType: "Category",
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      },
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79]
      ]
    }
  },
  provide: {
    heatmap: [Tooltip, Legend]
  }
}
</script>
```

Each label array corresponds to data dimensions:
- xAxis labels count = number of columns in dataSource
- yAxis labels count = number of rows in dataSource

### Label Matching Requirement

The number of labels must exactly match your data dimensions:

```javascript
// ✅ Correct
dataSource: [ // 3 rows
  [10, 20, 30, 40], // 4 columns
  [50, 60, 70, 80],
  [90, 100, 110, 120]
],
xAxis: {
  valueType: "Category",
  labels: ['A', 'B', 'C', 'D']  // 4 labels for 4 columns
},
yAxis: {
  valueType: "Category", 
  labels: ['X', 'Y', 'Z']  // 3 labels for 3 rows
}

// ❌ Incorrect - label count mismatch
xAxis: {
  valueType: "Category",
  labels: ['A', 'B']  // Only 2 labels, but 4 columns!
}
```

## Numerical Axis

### Numeric Scale Labels

Use numerical axis for continuous data scales:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" :xAxis='xAxis' :yAxis='yAxis' :dataSource='dataSource'></ejs-heatmap>
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
      xAxis: {
        valueType: "Numerical",
        minimum: 0,
        maximum: 100,
        interval: 20
      },
      yAxis: {
        valueType: "Numerical",
        minimum: 0,
        maximum: 50,
        interval: 10
      },
      dataSource: [
        [73, 39, 26, 39, 94],
        [93, 58, 53, 38, 26],
        [99, 28, 22, 4, 66],
        [14, 26, 97, 69, 69],
        [7, 46, 47, 47, 88]
      ]
    }
  }
}
</script>
```

Numerical axis properties:
- `minimum` - Starting value of the axis
- `maximum` - Ending value of the axis
- `interval` - Spacing between tick marks

### Axis Intervals

Control label density with the interval property:

```javascript
// Dense labels
xAxis: {
  valueType: "Numerical",
  minimum: 0,
  maximum: 100,
  interval: 10  // Label every 10 units
}

// Sparse labels
xAxis: {
  valueType: "Numerical",
  minimum: 0,
  maximum: 100,
  interval: 25  // Label every 25 units
}
```

## Datetime Axis

### Date/Time Axis Configuration

For time-series data, use datetime axis:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" :xAxis='xAxis' :yAxis='yAxis' :dataSource='dataSource'></ejs-heatmap>
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
      xAxis: {
        valueType: "DateTime",
        labelFormat: 'MMM',
        intervalType: 'Months',
        interval: 1
      },
      yAxis: {
        valueType: "Category",
        labels: ['Product A', 'Product B', 'Product C']
      },
      dataSource: [
        [20, 40, 60, 80],
        [30, 50, 70, 90],
        [10, 30, 50, 70]
      ]
    }
  }
}
</script>
```

DateTime axis properties:
- `labelFormat` - Date format string (e.g., 'MMM' for abbreviated month)
- `intervalType` - Unit type (Years, Months, Days, Hours)
- `interval` - Spacing between labels

## Axis Labels Configuration

### Custom Label Formatting

Add text styles and formatting to axis labels:

```vue
<script>
export default {
  data: function () {
    return {
      xAxis: {
        valueType: "Category",
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael'],
        labelIntersectAction: 'Rotate45',
        labelStyle: {
          size: '14px',
          fontStyle: 'Normal',
          fontFamily: 'Segoe UI',
          color: '#424242',
          fontWeight: '500'
        }
      },
      yAxis: {
        valueType: "Category",
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        labelStyle: {
          size: '12px',
          fontWeight: '500',
          color: '#3d3d3d'
        }
      }
    }
  }
}
</script>
```

### Label Style Properties

- `size` - Font size (e.g., '14px')
- `fontFamily` - Font name (e.g., 'Segoe UI', 'Arial')
- `fontWeight` - Font weight (normal, bold, 500, 700, etc.)
- `fontStyle` - Font style (Normal, Italic, Oblique)
- `color` - Text color (hex or named color)

## Advanced Axis Features

### Inverted Axis

Reverse the axis direction:

```javascript
xAxis: {
  valueType: "Category",
  labels: ['A', 'B', 'C', 'D'],
  isInversed: true  // Right to left instead of left to right
},
yAxis: {
  valueType: "Category",
  labels: ['X', 'Y', 'Z'],
  isInversed: true  // Bottom to top instead of top to bottom
}
```

Use cases for inverted axes:
- Right-to-left language support
- Custom visualization orientation
- Reversing temporal or numerical progressions

### Opposed Position

Place axes on opposite sides:

```javascript
xAxis: {
  valueType: "Category",
  labels: ['A', 'B', 'C', 'D'],
  opposedPosition: true  // X-axis at bottom instead of top
},
yAxis: {
  valueType: "Category",
  labels: ['X', 'Y', 'Z'],
  opposedPosition: true  // Y-axis at right instead of left
}
```

### Combining Advanced Features

Use multiple features together:

```vue
<script>
export default {
  data: function () {
    return {
      xAxis: {
        valueType: "Category",
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        opposedPosition: true,
        labelStyle: {
          size: '13px',
          fontWeight: '500'
        }
      },
      yAxis: {
        valueType: "Category",
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        isInversed: true,
        labelStyle: {
          size: '13px',
          fontWeight: '500'
        }
      },
      dataSource: [
        [10, 20, 30, 40],
        [50, 60, 70, 80],
        [90, 100, 110, 120],
        [130, 140, 150, 160]
      ]
    }
  }
}
</script>
```

### Axis Visibility

Show or hide axis elements:

```javascript
xAxis: {
  visible: true,  // Show X-axis labels
  opposedPosition: false
},
yAxis: {
  visible: true,  // Show Y-axis labels
  opposedPosition: false
}
```

Setting `visible: false` hides axis labels but keeps the data grid.
