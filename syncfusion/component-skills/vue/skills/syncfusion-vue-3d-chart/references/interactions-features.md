# Interactions and Features

## Table of Contents
- [Tooltip Configuration](#tooltip-configuration)
- [Selection](#selection)
- [User Interactions](#user-interactions)
- [Rotation and Perspective](#rotation-and-perspective)
- [Chart Events](#chart-events)

---

## Tooltip Configuration

### Enable Tooltips

```vue
<template>
  <ejs-chart3d id="chart" :tooltip="tooltip">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="country" 
        yName="gdp"
        name="GDP">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true
      }
    };
  }
};
</script>
```

### Custom Tooltip Format

The tooltip content can be customized by using the `format` property. The `${point.x}`, `${point.y}`, and `${series.name}` placeholders can be used to display the corresponding point and series values.

```vue
<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true,
        format: '${point.x}<br>${series.name}: ${point.y}'
      }
    };
  }
};
</script>
```

#### Inline tooltip formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

A format specifier can be applied to a tooltip token by adding a colon (`:`) followed by the required format.

For example:

```vue
<script setup>
import { provide } from 'vue';
import {
  Chart3DComponent as EjsChart3d,
  Chart3DSeriesCollectionDirective as EChart3dSeriesCollection,
  Chart3DSeriesDirective as EChart3dSeries,
  ColumnSeries3D,
  DateTime3D,
  Tooltip3D
} from '@syncfusion/ej2-vue-charts';

const tooltip = {
  enable: true,
  format:
    '${series.name} (${series.type})<br>' +
    '${point.x:MMM yyyy} : ${point.y:n2}<br>' +
    'Opacity: ${series.opacity}'
};

provide('chart3d', [
  ColumnSeries3D,
  DateTime3D,
  Tooltip3D
]);
</script>
```

In the above example, `point.x` is displayed in month-year format, `point.y` is displayed with two decimal places, and `series.opacity` displays the opacity value applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `point.x`: Specifies the x-value of the data point, such as DateTime or category values.
- `point.y`: Specifies the numeric y-value of the data point.
- `series.name`: Specifies the name assigned to the series.
- `series.type`: Specifies the rendering type of the series, such as `Column`, `Bar`, `Line`, or `StackingColumn`.
- `series.opacity`: Specifies the opacity value applied to the series. This value controls the visual transparency of the series and can be customized in the series configuration.

> **Important:** The availability of point-specific tokens depends on the values configured in the data source and the 3D Chart series type. The `series.name` and `series.type` tokens return string values, so DateTime or number formatting is not applied to these tokens.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy`: Displays the abbreviated month and four-digit year.
- `MM:yy`: Displays the two-digit month and year.
- `dd MMM`: Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

#### Tooltip template

The appearance and content of the tooltip can be completely customized by using the `template` property. Assign the ID of an HTML element to the `template` property and define the required tooltip content within that element.

```vue
<template>
  <div id="app">
    <ejs-chart3d
      id="chart"
      :primaryXAxis="primaryXAxis"
      :tooltip="tooltip"
      :wallColor="wallColor"
      :enableRotation="enableRotation"
      :rotation="rotation"
      :tilt="tilt"
      :depth="depth"
    >
      <e-chart3d-series-collection>
        <e-chart3d-series
          :dataSource="data"
          type="Column"
          xName="country"
          yName="gdp"
          name="GDP"
        >
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>

    <div id="tooltipTemplate">
      <div class="tooltip-title">${x}</div>
      <div class="tooltip-content">
        ${series.name}: <b>$${y}T</b>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart3DComponent,
  Chart3DSeriesCollectionDirective,
  Chart3DSeriesDirective,
  ColumnSeries3D,
  Category3D,
  Tooltip3D
} from '@syncfusion/ej2-vue-charts';

export default {
  name: 'App',
  components: {
    'ejs-chart3d': Chart3DComponent,
    'e-chart3d-series-collection': Chart3DSeriesCollectionDirective,
    'e-chart3d-series': Chart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { country: 'United States', gdp: 25.46 },
        { country: 'China', gdp: 17.96 },
        { country: 'Japan', gdp: 4.23 },
        { country: 'Germany', gdp: 4.07 },
        { country: 'India', gdp: 3.39 }
      ],
      primaryXAxis: {
        valueType: 'Category'
      },
      tooltip: {
        enable: true,
        template: '#tooltipTemplate'
      },
      wallColor: 'transparent',
      enableRotation: true,
      rotation: 7,
      tilt: 10,
      depth: 100
    };
  },
  provide: {
    chart3d: [
      ColumnSeries3D,
      Category3D,
      Tooltip3D
    ]
  }
};
</script>

<style>
#chart {
  height: 400px;
}

#tooltipTemplate {
  display: none;
}

.tooltip-title {
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
}

.tooltip-content {
  font-size: 13px;
}
</style>
```
``

### Tooltip Styling

```vue
<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true,
        format: '${point.x}: ${point.y}',
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#000000',
          fontSize: '13px',
          fontFamily: 'Arial'
        },
        border: {
          color: '#0066cc',
          width: 2
        },
        opacity: 0.9
      }
    };
  }
};
</script>
```

### Shared Tooltip

Display tooltip for all series at the same x-value:

```vue
<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true,
        shared: true,
        format: '${point.x}<br>${series.name}: ${point.y}'
      }
    };
  }
};
</script>
```

---

## Selection

### Enable Selection

```vue
<template>
  <ejs-chart3d id="chart" :selectionMode="selectionMode">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="product" 
        yName="sales"
        :selectionStyle="selectionStyle">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      selectionMode: 'Point',  // Point, Series, Cluster, DragXY, DragX, DragY, Lasso
      selectionStyle: {
        color: '#ff0000',
        border: { color: '#000000', width: 2 }
      }
    };
  }
};
</script>
```

### Selection Modes

| Mode | Behavior |
|------|----------|
| `Point` | Select individual data points |
| `Series` | Select entire series |
| `Cluster` | Select multiple series at same x-value |
| `DragXY` | Select by dragging on X and Y axes |
| `DragX` | Select by dragging on X axis |
| `DragY` | Select by dragging on Y axis |
| `Lasso` | Select by drawing a lasso |

### Multi-Select

```vue
<script>
export default {
  data() {
    return {
      selectionMode: 'Point',
      isMultiSelect: true  // Allow selecting multiple points
    };
  }
};
</script>
```

### Programmatic Selection

```vue
<template>
  <button @click="selectPoint(0)">Select First Point</button>
  <button @click="clearSelection">Clear Selection</button>
  
  <ejs-chart3d ref="chart" :selectionMode="selectionMode">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    selectPoint(index) {
      this.$refs.chart.selectDataPoint(index, 0);  // series index 0, point index
    },
    clearSelection() {
      this.$refs.chart.clearSelection();
    }
  }
};
</script>
```

---

## User Interactions

### Pointer Hover

Highlight data points on mouse hover:

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="sales"
        :marker="marker">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      marker: {
        visible: true,
        width: 10,
        height: 10,
        border: { color: '#000000', width: 1 }
      }
    };
  }
};
</script>
```

### Click Events

Handle point clicks:

```vue
<template>
  <ejs-chart3d @pointRender="onPointRender" @pointClick="onPointClick">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    onPointClick(args) {
      console.log('Clicked point:', args.point);
      console.log('X value:', args.point.x);
      console.log('Y value:', args.point.y);
    },
    onPointRender(args) {
      // Customize point appearance
      console.log('Rendering point:', args);
    }
  }
};
</script>
```

---

## Rotation and Perspective

### Enable 3D Rotation

```vue
<template>
  <ejs-chart3d 
    id="chart"
    :rotation="rotation"
    :tilt="tilt"
    :perspective="perspective">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="sales">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      rotation: 7,        // X-axis rotation (0-360)
      tilt: 0,            // Tilt angle (0-360)
      perspective: 150    // Perspective depth
    };
  }
};
</script>
```

### Interactive Rotation

Allow users to rotate by dragging:

```vue
<template>
  <div>
    <button @click="rotateLeft">⬅ Rotate Left</button>
    <button @click="rotateRight">Rotate Right ➡</button>
    <button @click="resetView">Reset View</button>
    
    <ejs-chart3d ref="chart" :rotation="rotation" :tilt="tilt">
      <!-- series -->
    </ejs-chart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotation: 7,
      tilt: 0
    };
  },
  methods: {
    rotateLeft() {
      this.rotation = (this.rotation - 15 + 360) % 360;
    },
    rotateRight() {
      this.rotation = (this.rotation + 15) % 360;
    },
    resetView() {
      this.rotation = 7;
      this.tilt = 0;
    }
  }
};
</script>
```

### Preset Views

```vue
<template>
  <div>
    <button @click="setView('front')">Front</button>
    <button @click="setView('top')">Top</button>
    <button @click="setView('side')">Side</button>
    <button @click="setView('isometric')">Isometric</button>
    
    <ejs-chart3d ref="chart" :rotation="rotation" :tilt="tilt">
      <!-- series -->
    </ejs-chart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotation: 7,
      tilt: 0
    };
  },
  methods: {
    setView(view) {
      const views = {
        front: { rotation: 0, tilt: 0 },
        top: { rotation: 90, tilt: 0 },
        side: { rotation: 0, tilt: 90 },
        isometric: { rotation: 45, tilt: 45 }
      };
      
      if (views[view]) {
        this.rotation = views[view].rotation;
        this.tilt = views[view].tilt;
      }
    }
  }
};
</script>
```

---

## Chart Events

### Chart Load Event

```vue
<template>
  <ejs-chart3d @load="onChartLoad">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    onChartLoad(args) {
      console.log('Chart loaded successfully');
      // Initialize custom behaviors
    }
  }
};
</script>
```

### Series Render Event

```vue
<template>
  <ejs-chart3d @seriesRender="onSeriesRender">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    onSeriesRender(args) {
      console.log('Series:', args.series.name, 'rendered');
      // Customize series appearance
    }
  }
};
</script>
```

### Axis Label Render

```vue
<template>
  <ejs-chart3d @axisLabelRender="onAxisLabelRender">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    onAxisLabelRender(args) {
      console.log('Label:', args.text);
      // Customize axis labels
    }
  }
};
</script>
```

### Before Print Event

```vue
<template>
  <ejs-chart3d @beforePrint="onBeforePrint">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    onBeforePrint(args) {
      console.log('Preparing to print...');
      // Prepare chart for printing
    }
  }
};
</script>
```

---

## Complete Example: Interactive Dashboard

```vue
<template>
  <div class="dashboard">
    <div class="controls">
      <h3>Controls</h3>
      <button @click="setView('front')">Front View</button>
      <button @click="setView('isometric')">Isometric View</button>
      <button @click="toggleTooltip">Toggle Tooltip</button>
      <button @click="toggleSelection">Toggle Selection</button>
    </div>
    
    <ejs-chart3d 
      ref="chart"
      id="chart"
      :rotation="rotation"
      :tilt="tilt"
      :tooltip="tooltip"
      :selectionMode="selectionMode"
      @pointClick="onPointClick">
      <e-chart3d-series-collection>
        <e-chart3d-series 
          :dataSource="data" 
          type="Column" 
          xName="product" 
          yName="sales"
          name="Sales 2024">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
    
    <div class="info">
      <p v-if="selectedPoint">Selected: {{ selectedPoint.x }} = {{ selectedPoint.y }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotation: 7,
      tilt: 0,
      tooltip: { enable: true },
      selectionMode: 'None',
      selectedPoint: null,
      data: [
        { product: 'Product A', sales: 25000 },
        { product: 'Product B', sales: 32000 },
        { product: 'Product C', sales: 28000 },
        { product: 'Product D', sales: 35000 }
      ]
    };
  },
  methods: {
    setView(view) {
      const views = {
        front: { rotation: 0, tilt: 0 },
        isometric: { rotation: 45, tilt: 45 }
      };
      this.rotation = views[view].rotation;
      this.tilt = views[view].tilt;
    },
    toggleTooltip() {
      this.tooltip.enable = !this.tooltip.enable;
    },
    toggleSelection() {
      this.selectionMode = this.selectionMode === 'None' ? 'Point' : 'None';
    },
    onPointClick(args) {
      this.selectedPoint = args.point;
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
  padding: 20px;
}

.controls {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}

.controls button {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 8px;
}

#chart {
  width: 100%;
  height: 500px;
}

.info {
  grid-column: 1 / 3;
  padding: 10px;
  background: #efefef;
  border-radius: 5px;
}
</style>
```
