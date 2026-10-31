# Palette and Color Customization in HeatMap

## Table of Contents
- [Palette Overview](#palette-overview)
- [Palette Modes](#palette-modes)
  - [Gradient Mode](#gradient-mode)
  - [Fixed Mode](#fixed-mode)
- [Gradient Palette](#gradient-palette)
  - [Blue to Red Gradient](#blue-to-red-gradient)
  - [Cool to Warm Gradient](#cool-to-warm-gradient)
  - [Monochrome Gradient](#monochrome-gradient)
- [Fixed Palette](#fixed-palette)
  - [Performance Levels](#performance-levels)
  - [Risk Assessment](#risk-assessment)
- [Custom Color Palettes](#custom-color-palettes)
  - [Business Dashboard Palette](#business-dashboard-palette)
  - [Scientific Palette](#scientific-palette)
- [Color Mapping](#color-mapping)
  - [Value-Based Color Assignment](#value-based-color-assignment)
  - [Min and Max Value Handling](#min-and-max-value-handling)
  - [Dynamic Palette Selection](#dynamic-palette-selection)
  - [Complete Customization Example](#complete-customization-example)

## Palette Overview

The palette system maps numerical values to colors in your HeatMap:
- **Gradient Palettes** - Smooth color transitions from light to dark
- **Fixed Palettes** - Discrete color steps for categorical interpretation

Color mapping helps users quickly identify data patterns and intensity levels.

## Palette Modes

### Gradient Mode

Gradient mode creates smooth color transitions for continuous data ranges:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :paletteSettings='paletteSettings'>
    </ejs-heatmap>
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
      paletteSettings: {
        palette: [
          { value: 0, color: '#C06C84' },
          { value: 50, color: '#6C5B7B' },
          { value: 100, color: '#355C7D' }
        ],
        type: "Gradient"
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael']
      },
      yAxis: {
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
  }
}
</script>
```

Gradient mode interpolates colors between defined points for smooth visual representation.

### Fixed Mode

Fixed mode applies specific colors to defined value ranges:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :paletteSettings='paletteSettings'>
    </ejs-heatmap>
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
      paletteSettings: {
        palette: [
          { value: 0, color: '#3498db' },      // Blue for 0-25
          { value: 25, color: '#2ecc71' },     // Green for 25-50
          { value: 50, color: '#f39c12' },     // Orange for 50-75
          { value: 75, color: '#e74c3c' }      // Red for 75-100
        ],
        type: "Fixed"
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael']
      },
      yAxis: {
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
  }
}
</script>
```

Fixed mode displays distinct colors for each value range, useful for categorical interpretation.

## Gradient Palette

### Blue to Red Gradient

```javascript
paletteSettings: {
  palette: [
    { value: 0, color: '#0000FF' },    // Blue - low values
    { value: 50, color: '#FFFFFF' },   // White - middle values
    { value: 100, color: '#FF0000' }   // Red - high values
  ],
  type: "Gradient"
}
```

### Cool to Warm Gradient

```javascript
paletteSettings: {
  palette: [
    { value: 0, color: '#006837' },    // Dark green - cool
    { value: 50, color: '#1a9850' },   // Light green
    { value: 100, color: '#d73027' }   // Warm red
  ],
  type: "Gradient"
}
```

### Monochrome Gradient

```javascript
paletteSettings: {
  palette: [
    { value: 0, color: '#f7fbff' },    // Light gray
    { value: 50, color: '#9ecae1' },   // Medium gray
    { value: 100, color: '#08519c' }   // Dark gray
  ],
  type: "Gradient"
}
```

## Fixed Palette

### Performance Levels

Discrete colors for performance categories:

```javascript
paletteSettings: {
  palette: [
    { value: 0, color: '#e74c3c' },    // Red - poor (0-25)
    { value: 25, color: '#f39c12' },   // Orange - fair (25-50)
    { value: 50, color: '#f1c40f' },   // Yellow - good (50-75)
    { value: 75, color: '#2ecc71' }    // Green - excellent (75-100)
  ],
  type: "Fixed"
}
```

### Risk Assessment

```javascript
paletteSettings: {
  palette: [
    { value: 0, color: '#27ae60' },    // Green - low risk
    { value: 33, color: '#f39c12' },   // Orange - medium risk
    { value: 66, color: '#e74c3c' }    // Red - high risk
  ],
  type: "Fixed"
}
```

## Custom Color Palettes

### Business Dashboard Palette

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap"
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :titleSettings='titleSettings'
      :paletteSettings='paletteSettings'>
    </ejs-heatmap>
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
      titleSettings: {
        text: 'Quarterly Sales Performance'
      },
      paletteSettings: {
        palette: [
          { value: 0, color: '#8B0000' },    // Dark red - critical
          { value: 20, color: '#DC143C' },   // Crimson - poor
          { value: 40, color: '#FFD700' },   // Gold - fair
          { value: 60, color: '#90EE90' },   // Light green - good
          { value: 80, color: '#006400' }    // Dark green - excellent
        ],
        type: "Fixed"
      },
      xAxis: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4']
      },
      yAxis: {
        labels: ['Region A', 'Region B', 'Region C', 'Region D']
      },
      dataSource: [
        [10, 45, 75, 95],
        [30, 60, 85, 92],
        [15, 50, 80, 90],
        [25, 55, 88, 98]
      ]
    }
  }
}
</script>
```

### Scientific Palette

```javascript
paletteSettings: {
  palette: [
    { value: 0, color: '#440154' },     // Deep purple
    { value: 20, color: '#31688e' },    // Blue-purple
    { value: 40, color: '#35b779' },    // Green
    { value: 60, color: '#fde724' },    // Yellow
    { value: 80, color: '#ff6e3a' },    // Orange
    { value: 100, color: '#d62728' }    // Red
  ],
  type: "Fixed"
}
```

## Color Mapping

### Value-Based Color Assignment

The palette system maps data values to colors automatically:

```javascript
// Data range: 0-100
// Palette with gradient from blue to red

// Value 0 → Blue
// Value 50 → Mixed (blue + red)
// Value 100 → Red

// Example with data
dataSource: [
  [0, 25, 50, 75, 100],    // Row progresses from blue to red
  [10, 40, 60, 80, 95]     // Another progression
]
```

### Min and Max Value Handling

```javascript
// If data contains 0-50 but palette goes 0-100
// The palette still applies gradient across 0-100
// Your data fills the lower half with lighter colors

paletteSettings: {
  palette: [
    { value: 0, color: '#ffffff' },   // White
    { value: 100, color: '#000000' }  // Black
  ],
  type: "Gradient"
}

// With data 0-50, values appear light gray
// The palette stretches across theoretical 0-100 range
```

### Dynamic Palette Selection

```vue
<template>
  <div id="app">
    <div class="controls">
      <label>Color Scheme:</label>
      <select v-model="selectedScheme" @change="updatePalette">
        <option value="cool">Cool</option>
        <option value="warm">Warm</option>
        <option value="performance">Performance</option>
      </select>
    </div>
    
    <ejs-heatmap id="heatmap"
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :paletteSettings='paletteSettings'>
    </ejs-heatmap>
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
      selectedScheme: 'cool',
      paletteSettings: {
        palette: [
          { value: 0, color: '#006837' },
          { value: 50, color: '#1a9850' },
          { value: 100, color: '#d73027' }
        ],
        type: "Gradient"
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael']
      },
      yAxis: {
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
  methods: {
    updatePalette: function() {
      const schemes = {
        cool: {
          palette: [
            { value: 0, color: '#006837' },
            { value: 50, color: '#1a9850' },
            { value: 100, color: '#d73027' }
          ],
          type: "Gradient"
        },
        warm: {
          palette: [
            { value: 0, color: '#ffffcc' },
            { value: 50, color: '#fd8d3c' },
            { value: 100, color: '#800026' }
          ],
          type: "Gradient"
        },
        performance: {
          palette: [
            { value: 0, color: '#d73027' },
            { value: 25, color: '#fee08b' },
            { value: 50, color: '#1a9850' },
            { value: 75, color: '#fee08b' },
            { value: 100, color: '#d73027' }
          ],
          type: "Fixed"
        }
      };
      
      this.paletteSettings = schemes[this.selectedScheme];
    }
  }
}
</script>
```

### Complete Customization Example

```vue
<template>
  <div id="app">
    <div class="config-panel">
      <h3>Palette Configuration</h3>
      <label>
        Mode:
        <select v-model="paletteSettings.type" @change="refreshChart">
          <option>Gradient</option>
          <option>Fixed</option>
        </select>
      </label>
    </div>
    
    <ejs-heatmap id="heatmap"
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :titleSettings='titleSettings'
      :cellSettings='cellSettings'
      :paletteSettings='paletteSettings'
      :legendSettings='legendSettings'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent, Legend, Tooltip } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      titleSettings: {
        text: 'Sales Revenue by Region and Quarter'
      },
      cellSettings: {
        showLabel: true,
        border: {
          width: 1,
          radius: 4,
          color: 'white'
        }
      },
      paletteSettings: {
        palette: [
          { value: 0, color: '#0000FF' },
          { value: 50, color: '#FFFFFF' },
          { value: 100, color: '#FF0000' }
        ],
        type: "Gradient"
      },
      legendSettings: {
        visible: true,
        position: 'Right',
        showLabel: true,
        height: '150'
      },
      xAxis: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4']
      },
      yAxis: {
        labels: ['North', 'South', 'East', 'West']
      },
      dataSource: [
        [25, 45, 65, 85],
        [30, 55, 75, 90],
        [20, 40, 70, 88],
        [35, 60, 80, 92]
      ]
    }
  },
  methods: {
    refreshChart: function() {
      // Force re-render by triggering change detection
      this.$forceUpdate();
    }
  },
  provide: {
    heatmap: [Legend, Tooltip]
  }
}
</script>
```

This example demonstrates complete palette customization with mode switching and professional styling.
