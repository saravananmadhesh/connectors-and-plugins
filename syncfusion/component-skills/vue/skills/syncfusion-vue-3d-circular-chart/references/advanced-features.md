# Advanced Features

## Table of Contents
- [Empty Point Handling](#empty-point-handling)
- [3D View Rotation (Tilt)](#3d-view-rotation-tilt)
- [Animation Configuration](#animation-configuration)
- [Print & Export](#print--export)
- [Performance Optimization](#performance-optimization)

## Empty Point Handling

### What Are Empty Points?

Data points with `null` or `undefined` values are considered empty. The chart can handle them in different ways using `emptyPointSettings`.

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :emptyPointSettings="emptyPointSettings"
        :dataLabel="{ visible: true, position: 'Outside' }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 3 },
        { x: 'Feb', y: 3.5 },
        { x: 'Mar', y: null },         // Empty point
        { x: 'Apr', y: 13.5 },
        { x: 'May', y: 19 },
        { x: 'Jun', y: 23.5 },
        { x: 'Jul', y: undefined },    // Empty point
        { x: 'Aug', y: 25 }
      ],
      emptyPointSettings: {
        mode: 'Zero'  // How to handle empty points
      }
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

### Empty Point Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `Gap` (default) | Skips empty points completely | Missing data |
| `Zero` | Treats empty as 0 value | Data gaps that should contribute |
| `Average` | Uses average of adjacent values | Interpolating data |
| `Drop` | Removes empty from series | Data not applicable for period |

### Mode Comparison

```javascript
// Gap - skips the point entirely
emptyPointSettings: { mode: 'Gap' }
// Result: Chart shows only non-empty points

// Zero - treats as zero value
emptyPointSettings: { mode: 'Zero' }
// Result: Tiny or invisible slice for null values

// Average - interpolates
emptyPointSettings: { mode: 'Average' }
// Result: Average of surrounding values

// Drop - removes from consideration
emptyPointSettings: { mode: 'Drop' }
// Result: Same as Gap but marked differently internally
```

### Custom Empty Point Styling

```javascript
emptyPointSettings: {
  mode: 'Zero',
  fill: '#E0E0E0',           // Light gray
  border: {
    color: '#999',
    width: 1,
    dashArray: '5,3'         // Dashed border
  }
}
```

## 3D View Rotation (Tilt)

### Understanding Tilt

The `tilt` property controls the 3D perspective angle, making the chart appear rotated in 3D space.

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="tiltAngle">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [...],
      tiltAngle: -45  // Default 3D angle
    };
  }
};
</script>
```

### Tilt Range & Effects

- **Range:** -90 to 90 degrees
- **Negative values:** Tilts "down" (perspective from above)
- **Positive values:** Tilts "up" (perspective from below)
- **0:** Flat view (minimal 3D effect)

### Interactive Tilt Control

```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <label>Tilt Angle: {{ tiltAngle }}°</label>
      <input v-model="tiltAngle" type="range" min="-90" max="90" step="5"/>
    </div>
    
    <ejs-circularchart3d id="container" :tilt="parseInt(tiltAngle)">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [...],
      tiltAngle: '-45'
    };
  }
};
</script>
```

### Common Tilt Angles

| Angle | Appearance | Use Case |
|-------|-----------|----------|
| -45° | Default 3D (recommended) | General use, balanced view |
| -60° | Extreme top view | Emphasize slice separation |
| 0° | Flat/2D view | Minimal distortion |
| 45° | Tilted upward | Alternative 3D perspective |
| 90° | Edge view | Thin line, hard to read |

## Animation Configuration

### Enable Chart Animation

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" enableAnimation="true">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Jan', y: 3 },
        { x: 'Feb', y: 3.5 },
        { x: 'Mar', y: 7 },
        { x: 'Apr', y: 13.5 }
      ]
    };
  }
};
</script>
```

### Animation Duration

```javascript
// Default animation (300ms)
enableAnimation="true"

// Or with duration control via series
const seriesSettings = {
  animationDuration: 1000  // 1 second
}
```

### When Animations Trigger

- **Initial load:** Chart animates in when first rendered
- **Data update:** If `dataSource` changes, animation replays
- **Legend click:** Can animate when filtering via legend

### Disable Animations (Performance)

```vue
<!-- For large datasets -->
<ejs-circularchart3d id="container" :enableAnimation="false">
```

## Print & Export

### Export to Image (PNG)

```vue
<template>
  <div>
    <button @click="exportChart">Export as PNG</button>
    <ejs-circularchart3d id="container" ref="chart" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [...]
    };
  },
  methods: {
    exportChart() {
      this.$refs.chart.export('PNG', 'chart');
      // Exports chart as 'chart.png'
    }
  }
};
</script>
```

### Export Options

```javascript
// Export to different formats
this.$refs.chart.export('PNG', 'chart-export');   // PNG
this.$refs.chart.export('SVG', 'chart-export');   // SVG
this.$refs.chart.export('PDF', 'chart-export');   // PDF (requires pdf-export module)

// Export with dimensions
this.$refs.chart.export('PNG', 'chart', 1200, 800);
```

### Print Chart

```vue
<template>
  <div>
    <button @click="printChart">Print</button>
    <ejs-circularchart3d id="container" ref="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
export default {
  methods: {
    printChart() {
      this.$refs.chart.print();
      // Sends chart to printer
    }
  }
};
</script>
```

### Custom Export Styling

```javascript
// Export with custom background
export(type, filename, width, height) {
  const options = {
    width: width || 1200,
    height: height || 800,
    backgroundColor: '#ffffff'
  };
  this.$refs.chart.export(type, filename);
}
```

## Performance Optimization

### Large Dataset Handling

```vue
<template>
  <ejs-circularchart3d 
    id="container" 
    :tilt="-45"
    :enableAnimation="false"
    :tooltip="{ enable: false }">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="largeData" 
        xName="x" 
        yName="y"
        :dataLabel="{ visible: false }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      largeData: this.generateLargeDataset(1000)
    };
  },
  methods: {
    generateLargeDataset(count) {
      const data = [];
      for (let i = 0; i < count; i++) {
        data.push({
          x: `Item ${i}`,
          y: Math.floor(Math.random() * 100)
        });
      }
      return data;
    }
  }
};
</script>
```

### Performance Tips

| Optimization | Impact | Best For |
|---|---|---|
| Disable animations | High | 100+ data points |
| Disable tooltips on hover | Medium | Touch devices, slow networks |
| Disable data labels | High | > 50 segments |
| Use `Gap` for empty points | Low | Sparse data |
| Limit re-renders | High | Frequently updated data |

### Lazy Loading Data

```vue
<script>
export default {
  data() {
    return {
      displayData: [],
      allData: []
    };
  },
  async mounted() {
    // Load initial visible data
    this.displayData = await this.loadInitialData();
    
    // Load full dataset in background
    this.allData = await this.loadAllData();
  },
  methods: {
    async loadInitialData() {
      // Return first 50 items
      return this.allData.slice(0, 50);
    },
    async loadAllData() {
      // Fetch from server
      const response = await fetch('/api/chart-data');
      return response.json();
    }
  }
};
</script>
```

## Advanced: Responsive Charts

### Auto-Resize on Container Change

```vue
<template>
  <div>
    <ejs-circularchart3d id="container" ref="chart" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('resize', () => {
      // Refresh chart on window resize
      if (this.$refs.chart) {
        this.$refs.chart.refresh();
      }
    });
  }
};
</script>

<style>
#container {
  width: 100%;
  height: 100%;
}
</style>
```

## Troubleshooting Advanced Features

### Chart Not Responding to Tilt Changes

```javascript
// ❌ WRONG - Direct assignment may not trigger update
this.tilt = -45;

// ✅ CORRECT - Force Vue reactivity
this.$set(this, 'tilt', -45);
// or in Vue 3
this.tilt = -45;  // Reactive by default
```

### Export Not Working

**Check:**
- PDF export requires `@syncfusion/ej2-pdf-export` module
- Chart must be fully rendered before export
- File save permissions are required in browser

```javascript
// Ensure chart is ready
await this.$nextTick();
this.$refs.chart.export('PDF', 'filename');
```

### Animation Performance Issues

```javascript
// Disable for initial render in heavy components
enableAnimation={initialRender ? true : false}

// Or disable globally if performance-critical
enableAnimation="false"
```

## Quick Reference

| Feature | Property | Example |
|---------|----------|---------|
| Empty points | `emptyPointSettings.mode` | `:emptyPointSettings="{ mode: 'Zero' }"` |
| 3D angle | `tilt` | `:tilt="-45"` |
| Animation | `enableAnimation` | `enableAnimation="true"` |
| Export PNG | Method | `this.$refs.chart.export('PNG', 'name')` |
| Print | Method | `this.$refs.chart.print()` |
| Disable labels (performance) | `dataLabel.visible` | `:dataLabel="{ visible: false }"` |

## Next Steps

- **Data formatting:** See [references/data-labels.md](../data-labels.md)
- **Navigation:** See [references/legend-and-navigation.md](../legend-and-navigation.md)
