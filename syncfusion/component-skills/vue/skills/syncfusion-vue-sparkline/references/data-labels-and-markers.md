# Data Labels and Markers

## Table of Contents
- [Overview](#overview)
- [Data Labels Configuration](#data-labels-configuration)
  - [Enable Data Labels](#enable-data-labels)
  - [Label Visibility Options](#label-visibility-options)
  - [Customize Label Appearance](#customize-label-appearance)
  - [Label Text Style Properties](#label-text-style-properties)
- [Marker Settings](#marker-settings)
  - [Enable Markers](#enable-markers)
  - [Marker Visibility Options](#marker-visibility-options)
  - [Customize Marker Appearance](#customize-marker-appearance)
  - [Marker Properties](#marker-properties)
- [Special Points](#special-points)
  - [Highlight High and Low Points](#highlight-high-and-low-points)
  - [Highlight Start and End Points](#highlight-start-and-end-points)
  - [Highlight Negative Values](#highlight-negative-values)
- [Range Band](#range-band)
  - [Add Range Band Background](#add-range-band-background)
  - [Range Band Properties](#range-band-properties)
  - [Use Cases for Range Bands](#use-casesbility-considerations)
  - [Tip 1: Use Labels for Screen Readers](#tip-1-use-labels-for-screen-readers)
  - [Tip 2: High Contrast Colors](#tip-2-high-contrast-colors)
  - [Tip 3: Keyboard Navigation](#tip-3-keyboard-navigation)
- [Troubleshooting](#troubleshooting)
  - [Issue: Labels Overlap](#issue-labels-overlap)
  - [Issue: Markers Not Visible](#issue-markers-not-visible)
  - [Issue: Range Band Not Showing](#issue-range-band-not-showing)

---

## Overview

Sparklines support visual enhancements:
- **Data Labels:** Display values at each data point
- **Markers:** Visual indicators at data points
- **Special Points:** Highlight specific points (high, low, start, end, negative)
- **Range Bands:** Shade specific value ranges

---

## Data Labels Configuration

### Enable Data Labels

Display values at data points:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :dataLabelSettings='dataLabelSettings'
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
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5],
      dataLabelSettings: {
        visible: ['All']  // Show all data labels
      }
    }
  }
}
</script>
```

### Label Visibility Options

Control which labels display:

```vue
<template>
  <div>
    <!-- Show all labels -->
    <ejs-sparkline 
      :dataSource='data'
      :dataLabelSettings='{ visible: ["All"] }'>
    </ejs-sparkline>
    
    <!-- Show none -->
    <ejs-sparkline 
      :dataSource='data'
      :dataLabelSettings='{ visible: [] }'>
    </ejs-sparkline>
    
    <!-- Show specific types -->
    <ejs-sparkline 
      :dataSource='data'
      :dataLabelSettings='{ visible: ["Start", "End"] }'>
    </ejs-sparkline>
  </div>
</template>
```

**Visibility Options:**
- `All`: Show label for every point
- `Start`: Show label for first point
- `End`: Show label for last point
- `High`: Show label for maximum value
- `Low`: Show label for minimum value
- `Negative`: Show label for negative values (if applicable)
- `[]`: Show no labels

### Customize Label Appearance

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    :border='border'
    fill='#007dd1'
    :axisSettings='axisSettings'
    :dataLabelSettings='dataLabelSettings'
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
    height: '200px',
    width: '350px',
    data: [3, 6, 4, 1, 3, 2, 5],
    border: { color: 'transparent', width: 2 },
    axisSettings: { minX: -1, maxX: 7 },
    dataLabelSettings: {
      visible: ['All'],
      textStyle: {
        color: 'white'           // Label text color
      }
    }
  }
}
}
</script>
```

### Label Text Style Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `color` | String | Text color | `'white'` |
| `fontFamily` | String | Font | `'Arial'` |
| `fontSize` | String | Font size | `'12px'` |
| `fontStyle` | String | Style | `'italic'` |
| `fontWeight` | String | Weight | `'bold'` |
| `opacity` | Number | Transparency | `0.8` |

---

## Marker Settings

### Enable Markers

Display visual markers at data points:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :markerSettings='markerSettings'
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
      data: [3, 6, 4, 1, 3, 2, 5],
      markerSettings: {
        visible: ['All']  // Show marker for all points
      }
    }
  }
}
</script>
```

### Marker Visibility Options

Control which markers display:

```javascript
markerSettings: {
  visible: ['All']       // All points
  visible: ['Start']     // First point only
  visible: ['End']       // Last point only
  visible: ['High']      // Maximum value point
  visible: ['Low']       // Minimum value point
  visible: ['Negative']  // Negative values (if applicable)
  visible: []            // No markers
}
```

### Customize Marker Appearance

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    fill='#0099ff'
    :markerSettings='markerSettings'
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
    width: '300px',
    data: [3, 6, 4, 1, 3, 2, 5],
    markerSettings: {
      visible: ['All'],
      size: 3,              // Marker radius in pixels
      fill: '#0099ff',      // Marker fill color
      border: {
        color: '#ffffff',
        width: 1
      }
    }
  }
}
}
</script>
```

### Marker Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `visible` | Array | Which markers to show | `['All']` |
| `size` | Number | Marker radius (px) | `3` |
| `fill` | String | Marker color | `'#0099ff'` |
| `border.color` | String | Marker border color | `'#ffffff'` |
| `border.width` | Number | Border width (px) | `1` |

---

## Special Points

### Highlight High and Low Points

Visually distinguish maximum and minimum values:

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    :dataLabelSettings='dataLabelSettings'
    :markerSettings='markerSettings'
    fill='#0099ff'
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
    height: '200px',
    width: '350px',
    data: [3, 6, 4, 1, 3, 2, 5],
    dataLabelSettings: {
      visible: ['High', 'Low']  // Show high/low labels
    },
    markerSettings: {
      visible: ['High', 'Low'],
      size: 4,
      fill: '#0099ff'
    }
  }
}
}
</script>
```

### Highlight Start and End Points

Mark first and last data points:

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    :dataLabelSettings='dataLabelSettings'
    :markerSettings='markerSettings'
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
    width: '300px',
    data: [3, 6, 4, 1, 3, 2, 5],
    dataLabelSettings: {
      visible: ['Start', 'End']
    },
    markerSettings: {
      visible: ['Start', 'End'],
      size: 3,
      fill: '#28a745'  // Green for start/end
    }
  }
}
}
</script>
```

### Highlight Negative Values

Emphasize negative data points:

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    type='WinLoss'
    :dataLabelSettings='dataLabelSettings'
    :markerSettings='markerSettings'
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
    width: '300px',
    data: [5, -3, 4, -6, 8, 7, -2],  // Mix of positive and negative
    dataLabelSettings: {
      visible: ['Negative']
    },
    markerSettings: {
      visible: ['Negative'],
      size: 3,
      fill: '#d32f2f'  // Red for negative
    }
  }
}
}
</script>
```

---

## Range Band

### Add Range Band Background

Shade a range of values:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :rangeBandSettings='rangeBandSettings'
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
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5],
      rangeBandSettings: {
        startRange: 3,    // Start of shaded range
        endRange: 5,      // End of shaded range
        opacity: 0.4,     // Transparency (0-1)
        color: '#ffc107'  // Shading color (yellow)
      }
    }
  }
}
</script>
```

### Range Band Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `startRange` | Number | Range start value | `3` |
| `endRange` | Number | Range end value | `5` |
| `color` | String | Band background color | `'#ffc107'` |
| `opacity` | Number | Transparency (0-1) | `0.4` |

### Use Cases for Range Bands

```vue
<script>
export default {
  data: function() {
    return {
      // Temperature comfort zone (18-24°C)
      temperatureRangeBand: {
        startRange: 18,
        endRange: 24,
        color: '#4caf50',
        opacity: 0.2
      },
      
      // Performance threshold (80-100)
      performanceRangeBand: {
        startRange: 80,
        endRange: 100,
        color: '#2196f3',
        opacity: 0.15
      },
      
      // Risk zone (below 50)
      riskRangeBand: {
        startRange: 0,
        endRange: 50,
        color: '#f44336',
        opacity: 0.1
      }
    }
  }
}
</script>
```

---

## Combined Features

### All Features Together

Use data labels, markers, special points, and range bands:

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    :border='border'
    fill='#007dd1'
    lineWidth='3'
    :axisSettings='axisSettings'
    :dataLabelSettings='dataLabelSettings'
    :markerSettings='markerSettings'
    :rangeBandSettings='rangeBandSettings'
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
    height: '300px',
    width: '500px',
    data: [3, 6, 4, 1, 3, 2, 5],
    border: { color: '#033e96', width: 2 },
    axisSettings: { minX: -1, maxX: 7 },
    dataLabelSettings: {
      visible: ['All'],
      textStyle: { color: 'white', fontSize: '12px' }
    },
    markerSettings: {
      visible: ['High', 'Low'],
      size: 4,
      fill: '#0099ff'
    },
    rangeBandSettings: {
      startRange: 2,
      endRange: 4,
      opacity: 0.4,
      color: '#ffc107'
    }
  }
}
}
</script>
```

### Performance Optimization

Too many labels and markers can clutter display. Use strategically:

```javascript
// Minimal: Performance-optimized
dataLabelSettings: { visible: ['High', 'Low'] }
markerSettings: { visible: ['High', 'Low'] }

// Balanced: Information + clarity
dataLabelSettings: { visible: ['Start', 'End', 'High', 'Low'] }
markerSettings: { visible: ['All'] }

// Detailed: Full information
dataLabelSettings: { visible: ['All'] }
markerSettings: { visible: ['All'] }
```

---

## Common Patterns

### Pattern 1: Sparkline in Data Table

Show sparkline with data labels in table row:

```vue
<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Sales Trend</th>
        <th>Stats</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>
          <ejs-sparkline 
            :dataSource='product.data'
            :dataLabelSettings='{ visible: ["Start", "End"] }'
            :markerSettings='{ visible: ["High"] }'
            height='50px'
            width='150px'>
          </ejs-sparkline>
        </td>
        <td>High: {{ product.high }}, Low: {{ product.low }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      products: [
        {
          id: 1,
          name: 'Product A',
          data: [3, 6, 4, 1, 3, 2, 5],
          high: 6,
          low: 1
        },
        {
          id: 2,
          name: 'Product B',
          data: [2, 4, 3, 5, 1, 4, 3],
          high: 5,
          low: 1
        }
      ]
    }
  }
}
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.data-table th {
  background-color: #f5f5f5;
}
</style>
```

### Pattern 2: KPI Card with Highlights

Display key metrics with highlighted extremes:

```vue
<template>
  <div class="kpi-card">
    <h3>{{ title }}</h3>
    <ejs-sparkline 
      :dataSource='data'
      :dataLabelSettings='{ visible: ["Start", "End", "High", "Low"] }'
      :markerSettings='markerConfig'
      :height='height'
      :width='width'>
    </ejs-sparkline>
    <div class="stats">
      <span>Max: {{ stats.max }}</span>
      <span>Min: {{ stats.min }}</span>
      <span>Avg: {{ stats.avg }}</span>
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
      title: 'Monthly Revenue',
      height: '150px',
      width: '100%',
      data: [3, 6, 4, 1, 3, 2, 5],
      markerConfig: {
        visible: ['High', 'Low'],
        size: 4,
        fill: '#007bff'
      },
      stats: {
        max: 6,
        min: 1,
        avg: 3.4
      }
    }
  }
}
</script>

<style scoped>
.kpi-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.kpi-card h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  font-size: 12px;
  color: #666;
}
</style>
```

### Pattern 3: Toggle Label Visibility

Allow user to show/hide labels and markers:

```vue
<template>
  <div>
    <div class="controls">
      <label>
        <input type="checkbox" v-model="showLabels"> Show Labels
      </label>
      <label>
        <input type="checkbox" v-model="showMarkers"> Show Markers
      </label>
    </div>
    
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :dataLabelSettings='computedLabelSettings'
      :markerSettings='computedMarkerSettings'
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
      showLabels: true,
      showMarkers: true,
      height: '150px',
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5]
    }
  },
  computed: {
    computedLabelSettings: function() {
      return {
        visible: this.showLabels ? ['All'] : []
      }
    },
    computedMarkerSettings: function() {
      return {
        visible: this.showMarkers ? ['All'] : [],
        size: 3,
        fill: '#007bff'
      }
    }
  }
}
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
}

.controls label {
  margin-right: 20px;
  cursor: pointer;
}
</style>
```

### Pattern 4: Contextual Range Bands

Show different ranges based on data context:

```vue
<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  methods: {
    getRangeBandSettings: function(dataType) {
      const ranges = {
        'temperature': {
          startRange: 18,
          endRange: 24,
          color: '#4caf50',
          opacity: 0.2
        },
        'performance': {
          startRange: 80,
          endRange: 100,
          color: '#2196f3',
          opacity: 0.15
        },
        'sales': {
          startRange: 5000,
          endRange: 10000,
          color: '#ff9800',
          opacity: 0.1
        }
      };
      return ranges[dataType] || {};
    }
  }
}
</script>
```

---

## Accessibility Considerations

### Tip 1: Use Labels for Screen Readers
Enable data labels for better accessibility:
```javascript
dataLabelSettings: { visible: ['All'] }  // Helps assistive technology
```

### Tip 2: High Contrast Colors
```javascript
markerSettings: {
  fill: '#000000',        // Black on white background
  border: { color: '#ffffff', width: 2 }  // White outline
}
```

### Tip 3: Keyboard Navigation
Sparklines support Ctrl+P for printing (when module is injected).

---

## Troubleshooting

### Issue: Labels Overlap
- **Solution:** Reduce data density or increase sparkline size
- Use selective visibility: `['Start', 'End', 'High', 'Low']`

### Issue: Markers Not Visible
- **Solution:** Increase marker `size` (try 4-5px)
- Check color contrast with background
- Ensure markers are enabled: `visible: ['All']`

### Issue: Range Band Not Showing
- **Solution:** Verify `startRange < endRange`
- Check range values match data scale
- Increase `opacity` for visibility
