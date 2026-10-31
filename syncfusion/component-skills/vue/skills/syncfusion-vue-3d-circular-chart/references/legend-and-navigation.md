# Legend & Navigation

## Table of Contents
- [Legend Basics](#legend-basics)
- [Position & Alignment](#position--alignment)
- [Legend Wrapping](#legend-wrapping)
- [Click Events & Selection](#click-events--selection)
- [Legend Customization](#legend-customization)

## Legend Basics

### Enabling the Legend

The legend provides a visual guide to chart segments. Enable it via the `legendSettings` property:

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45" :legendSettings="legendSettings">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartLegend3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13 },
        { x: 'Mar', y: 17 },
        { x: 'Apr', y: 13.5 }
      ],
      legendSettings: {
        visible: true  // Enable legend
      }
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartLegend3D]  // ⚠️ REQUIRED!
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

**Important:** Always provide `CircularChartLegend3D` module when using legends.

### Default Legend Behavior

By default, the legend:
- **Position:** Right side of chart
- **Alignment:** Center
- **Text:** X values from data (e.g., "Jan", "Feb", "Mar")
- **Symbol:** Colored square matching slice color

```javascript
// Default configuration (equivalent to)
legendSettings: {
  visible: true,
  position: 'Right',
  alignment: 'Center'
}
```

## Position & Alignment

### Legend Positions

The legend can be positioned on any side of the chart:

```vue
<template>
  <div id="app">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <!-- Top -->
      <ejs-circularchart3d id="top" :legendSettings="{ visible: true, position: 'Top' }">
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>

      <!-- Bottom -->
      <ejs-circularchart3d id="bottom" :legendSettings="{ visible: true, position: 'Bottom' }">
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>

      <!-- Left -->
      <ejs-circularchart3d id="left" :legendSettings="{ visible: true, position: 'Left' }">
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>

      <!-- Right (default) -->
      <ejs-circularchart3d id="right" :legendSettings="{ visible: true, position: 'Right' }">
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>
    </div>
  </div>
</template>
```

### Legend Alignment

Align legends within their position using the `alignment` property:

```vue
<!-- Top position with different alignments -->

<!-- Far (left for top) -->
<ejs-circularchart3d :legendSettings="{ visible: true, position: 'Top', alignment: 'Far' }">

<!-- Center (centered) -->
<ejs-circularchart3d :legendSettings="{ visible: true, position: 'Top', alignment: 'Center' }">

<!-- Near (right for top) -->
<ejs-circularchart3d :legendSettings="{ visible: true, position: 'Top', alignment: 'Near' }">
```

### Position + Alignment Combinations

| Position | Alignment | Result |
|----------|-----------|--------|
| Top | Far | Legend on top-left |
| Top | Center | Legend on top-center |
| Top | Near | Legend on top-right |
| Right | Far | Legend on top-right |
| Right | Center | Legend on right-center |
| Right | Near | Legend on bottom-right |

## Legend Wrapping

### Enable Legend Wrapping

By default, long legends may overflow. Enable `wrap` to arrange items vertically:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :legendSettings="legendSettings">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="manyCategories" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      legendSettings: {
        visible: true,
        position: 'Right',
        width: '120px',      // Fixed width
        wrap: true           // Enable wrapping
      },
      manyCategories: [
        { x: 'Category A', y: 10 },
        { x: 'Category B', y: 12 },
        { x: 'Category C', y: 14 },
        { x: 'Category D', y: 16 },
        { x: 'Category E', y: 18 },
        { x: 'Category F', y: 20 }
      ]
    };
  }
};
</script>
```

### Legend Mode: List vs Table

**List mode (default):** Single column or row
**Table mode:** Multi-column table layout

```javascript
// List mode (default)
legendSettings: { visible: true }

// Table mode (when wrap is too restrictive)
legendSettings: { 
  visible: true,
  mode: 'Categories'  // Displays as categorized list
}
```

## Click Events & Selection

### Respond to Legend Clicks

Use the `legendItemRender` event to react when users click legend items:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :legendSettings="legendSettings" @legendItemRender="onLegendItemRender">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartLegend3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13 },
        { x: 'Mar', y: 17 },
        { x: 'Apr', y: 13.5 }
      ],
      legendSettings: { visible: true }
    };
  },
  methods: {
    onLegendItemRender(args) {
      console.log('Legend item clicked:', args.text);
      // Custom logic here
    }
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartLegend3D]
  }
};
</script>
```

### Legend Item Render Event

```javascript
onLegendItemRender(args) {
  // args.text: Legend label (e.g., "Jan", "Feb")
  // args.index: Position in legend
  // args.fill: Color of legend item
  
  // Highlight specific items
  if (args.text === 'Mar') {
    args.fill = '#FFD700';  // Gold highlight
  }
}
```

### Point Selection via Legend

When a legend item is clicked, the corresponding pie slice can be highlighted:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :legendSettings="legendSettings" :pointRender="onPointRender">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :dataLabel="{ visible: true }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13 },
        { x: 'Mar', y: 17 },
        { x: 'Apr', y: 13.5 }
      ],
      legendSettings: { visible: true },
      selectedIndex: null
    };
  },
  methods: {
    onPointRender(args) {
      // Highlight selected point
      if (args.index === this.selectedIndex) {
        args.fill = '#FFD700';  // Gold for selected
        args.border = { width: 2, color: '#000' };
      }
    }
  }
};
</script>
```

## Legend Customization

### Legend Height & Width

Control legend dimensions:

```vue
<template>
  <ejs-circularchart3d id="container" :legendSettings="legendSettings">
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
      legendSettings: {
        visible: true,
        height: '100px',    // Fixed height
        width: '150px'      // Fixed width
      }
    };
  }
};
</script>
```

### Legend Shape & Styling

```javascript
legendSettings: {
  visible: true,
  shapeHeight: 15,      // Height of legend symbol
  shapeWidth: 15,       // Width of legend symbol
  padding: 10,          // Space around legend
  enablePages: true,    // Show pagination if too many items
  background: '#f5f5f5' // Background color
}
```

### Custom Legend Position (Fixed)

Position legend at exact coordinates:

```javascript
legendSettings: {
  visible: true,
  location: {
    x: 100,  // X position in pixels
    y: 50    // Y position in pixels
  }
}
```

### Toggle Legend Visibility

```vue
<template>
  <div>
    <button @click="toggleLegend">Toggle Legend</button>
    <ejs-circularchart3d id="container" :legendSettings="legendSettings">
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
      legendSettings: { visible: true }
    };
  },
  methods: {
    toggleLegend() {
      this.legendSettings.visible = !this.legendSettings.visible;
    }
  }
};
</script>
```

### Legend Symbol Types

```javascript
// Different legend symbol shapes
legendSettings: {
  visible: true,
  shapeHeight: 20,
  shapeWidth: 20,
  shapePadding: 10
  // Symbol shape is determined by series type (circle for pie)
}
```

## Advanced: Legend with Custom Formatting

### Format Legend Labels

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :legendSettings="legendSettings" @legendItemRender="formatLegendItem">
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
        { x: 'Q1', y: 35, percentage: 25 },
        { x: 'Q2', y: 28, percentage: 20 },
        { x: 'Q3', y: 34, percentage: 24 },
        { x: 'Q4', y: 46, percentage: 31 }
      ],
      legendSettings: { visible: true }
    };
  },
  methods: {
    formatLegendItem(args) {
      // Enhance legend text with data
      const dataPoint = this.data[args.index];
      if (dataPoint) {
        args.text = `${args.text}: ${dataPoint.percentage}%`;
      }
    }
  }
};
</script>
```

## Quick Reference

| Setting | Property | Example |
|---------|----------|---------|
| Show/hide | `visible` | `:legendSettings="{ visible: true }"` |
| Position | `position` | `:position="'Top'\|'Bottom'\|'Left'\|'Right'"` |
| Alignment | `alignment` | `:alignment="'Far'\|'Center'\|'Near'"` |
| Size | `width`, `height` | `width: '150px', height: '100px'` |
| Wrapping | `wrap` | `:wrap="true"` |
| Response to clicks | `legendItemRender` | `@legendItemRender="handler"` |
| Custom position | `location` | `:location="{ x: 100, y: 50 }"` |

## Next Steps

- **Add interactivity:** See [references/tooltips-and-interactivity.md](../tooltips-and-interactivity.md)
- **Advanced features:** See [references/advanced-features.md](../advanced-features.md)
