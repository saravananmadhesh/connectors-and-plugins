# Interactions and Events

## Table of Contents
- [Selection Modes](#selection-modes)
  - [Point Selection](#point-selection)
  - [Series Selection](#series-selection)
  - [Range Selection](#range-selection)
  - [Selection Styling](#selection-styling)
- [Zooming and Panning](#zooming-and-panning)
  - [Enable Zooming](#enable-zooming)
  - [Zoom Types](#zoom-types)
  - [Pan (Move Around)](#pan-move-around)
  - [Toolbar Controls](#toolbar-controls)
- [Synchronized Charts](#synchronized-charts)
  - [Two Synchronized Charts](#two-synchronized-charts)
  - [Sync Implementation Details](#sync-implementation-details)
- [Event System Overview](#event-system-overview)
  - [Event Lifecycle](#event-lifecycle)
- [Common Events](#common-events)
  - [Point Click Event](#point-click-event)
  - [Series Render Event](#series-render-event)
  - [Tooltip Render Event](#tooltip-render-event)
  - [Point Render Event](#point-render-event)
  - [Zoom Complete Event](#zoom-complete-event)
- [Custom Event Handling](#custom-event-handling)
  - [Highlight on Hover](#highlight-on-hover)
  - [Double-Click Handler](#double-click-handler)
  - [Load Event - Initialize Chart](#load-event---initialize-chart)
  - [Drag End Event](#drag-end-event)
  - [Animation Complete](#animation-complete)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Click to Show Details](#pattern-1-click-to-show-details)
  - [Pattern 2: Conditional Point Coloring](#pattern-2-conditional-point-coloring)
  - [Pattern 3: Export on Button Click](#pattern-3-export-on-button-click)
- [Next Steps](#next-steps)
  - [Export and manage data](#export-and-manage-data)
  - [Customize appearance](#customize-appearance)
  - [Configure axes](#configure-axes)

---

## Selection Modes

Allow users to select data points or series on the chart.

### Point Selection

Select individual data points:

```vue
<template>
  <ejs-chart selectionMode="Point">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
// Click on a data point to select it
// Selected point highlighted with different color/style
</script>
```

### Series Selection

Select entire series:

```vue
<template>
  <ejs-chart selectionMode="Series">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
// Click on any point in a series to select entire series
</script>
```

### Range Selection

Select a range of points:

```vue
<template>
  <ejs-chart selectionMode="Cluster">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
// Click and drag to select a rectangular region
// All points in that region are selected
</script>
```

**Selection Mode Options:**
- `'None'` - No selection
- `'Point'` - Single point selection
- `'Series'` - Entire series selection
- `'Cluster'` - All points at same X position
- `'DragXY'` - Rectangular drag selection
- `'DragX'` - Rectangular drag selection to horizontal axis
- `'DragY'` - Rectangular drag selection to vertical axis
- `'Lasso'` - Dragging with respect to free form

### Selection Styling

```vue
<template>
    <ejs-chart id="container" selectionMode='Point'>
      <e-series-collection>
        <e-series :dataSource='seriesData' type='Column' xName='country' yName='gold' name='Gold'
          selectionStyle='chartSelection1'> </e-series>
        <e-series :dataSource='seriesData' type='Column' xName='country' yName='silver' name='Silver'
          selectionStyle='chartSelection2'> </e-series>
        <e-series :dataSource='seriesData' type='Column' xName='country' yName='bronze' name='Bronze'
          selectionStyle='chartSelection3'> </e-series>
      </e-series-collection>
    </ejs-chart>
</template>

<style>
.chartSelection1 {
  fill: red
}

.chartSelection2 {
  fill: green
}

.chartSelection3 {
  fill: blue
}
</style>
```

---

## Zooming and Panning

Enable users to zoom and pan to explore data in detail.

### Enable Zooming

```vue
<template>
  <ejs-chart :zoomSettings="zoomSettings">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const zoomSettings = {
  enableSelectionZooming: true,    // Enable zoom on selection
  enableMouseWheelZooming: true,   // Mouse wheel zoom
  enablePinchZooming: true,        // Touch pinch zoom
  toolbarItems: ['ZoomIn', 'ZoomOut', 'Pan', 'Reset']
};
</script>
```

### Zoom Types

```vue
const zoomSettings = {
  enableSelectionZooming: true,
  mode: 'XY',     // 'X' (horizontal), 'Y' (vertical), 'XY' (both)
};
```

### Pan (Move Around)

```vue
const zoomSettings = {
  enableSelectionZooming: true,
  enablePan: true,   // Allow panning after zoom
};
```

**How to Use:**
1. Select area to zoom: Click and drag
2. Pan: Hold Shift and drag (or use Pan button)
3. Reset: Double-click or click Reset button

### Toolbar Controls

```vue
const zoomSettings = {
  enableSelectionZooming: true,
  toolbarItems: ['ZoomIn', 'ZoomOut', 'Pan', 'Reset']
};
```

---

## Synchronized Charts

Link multiple charts so they zoom/pan together.

### Two Synchronized Charts

```vue
<template>
  <div class="control-section">
    <div class="row">
      <div class="col" id="container1">
        <ejs-chart style='display:block' align='center' id='chartcontainer1' :title='title1'
          :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis1' :zoomSettings='zoomSettings'
          :titleStyle='titleStyle' :zoomComplete='zoomComplete' ref="chart1">
          <e-series-collection>
            <e-series :dataSource='seriesData' type='Line' xName='USD' yName='EUR' width=2
              :emptyPointSetting='emptyPointSettings'> </e-series>
          </e-series-collection>
        </ejs-chart>
      </div>
      <div class="col" id="container2">
        <ejs-chart style='display:block' align='center' id='chartcontainer2' :title='title2'
          :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis2' :zoomSettings='zoomSettings'
          :titleStyle='titleStyle' :zoomComplete='zoomComplete' ref="chart2">
          <e-series-collection>
            <e-series :dataSource='seriesData' type='SplineArea' xName='USD' yName='INR' opacity=0.6 :border='border'>
            </e-series>
          </e-series-collection>
        </ejs-chart>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, provide } from "vue";

import { ChartComponent as EjsChart, SeriesCollectionDirective as ESeriesCollection, SeriesDirective as ESeries, LineSeries, SplineAreaSeries, DateTime, Zoom } from "@syncfusion/ej2-vue-charts";
import { synchronizedData } from './dataSource.js';
import { Browser } from '@syncfusion/ej2-base';

import {ref} from'vue';

const chart1=ref(null);
const chart2=ref(null);

let zoomFactor = 0;
let zoomPosition = 0;

const seriesData = synchronizedData;
const primaryXAxis = {
  minimum: new Date(2023, 1, 18),
  maximum: new Date(2023, 7, 18),
  valueType: 'DateTime',
  labelFormat: 'MMM d',
  lineStyle: { width: 0 },
  majorGridLines: { width: 0 },
  interval: Browser.isDevice ? 2 : 1,
  edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
  labelRotation: Browser.isDevice ? -45 : 0
};
const primaryYAxis1 = {
  labelFormat: 'n2',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  minimum: 0.86,
  maximum: 0.96,
  interval: 0.025
};
const primaryYAxis2 = {
  labelFormat: 'n1',
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  minimum: 79,
  maximum: 85,
  interval: 1.5
};
const border = { width: 2 };
const zoomSettings = {
  enableMouseWheelZooming: true,
  enablePinchZooming: true,
  enableScrollbar: false,
  enableDeferredZooming: false,
  enableSelectionZooming: true,
  enablePan: true,
  mode: 'X',
  toolbarItems: ['Pan', 'Reset']
};
const emptyPointSettings = { mode: 'Drop' };
const titleStyle = { textAlignment: 'Near' };
const title1 = "US to EURO";
const title2 = "US to INR";
let charts = [];

provide('chart', [LineSeries, SplineAreaSeries, DateTime, Zoom]);

const zoomComplete = function (args) {
  if (args.axis.name === 'primaryXAxis') {
    zoomFactor = args.currentZoomFactor;
    zoomPosition = args.currentZoomPosition;
    zoomCompleteFunction(args);
  }
};
const zoomCompleteFunction = function (args) {
  for (var i = 0; i < charts.length; i++) {
    if (args.axis.series[0].chart.element.id !== charts[i].element.id) {
      charts[i].primaryXAxis.zoomFactor = zoomFactor;
      charts[i].primaryXAxis.zoomPosition = zoomPosition;
      charts[i].zoomModule.isZoomed = args.axis.series[0].chart.zoomModule.isZoomed;
      charts[i].zoomModule.isPanning = args.axis.series[0].chart.zoomModule.isPanning;
    }
  }
};

onMounted(()=> {
  charts = [chart1.value.ej2Instances, chart2.value.ej2Instances];
});

</script>
<style>
#container {
  height: 350px;
}

#control-container {
  padding: 1px !important;
}

.row {
  display: flex;
}

.col {
  width: 50%;
  margin: 10px;
  height: 270px;
}
</style>
```

---

## Event System Overview

The chart emits events for various user interactions and lifecycle events.

### Event Lifecycle

1. **load** - Chart instance created
2. **seriesRender** - Series rendered
3. **pointRender** - Each data point rendered
4. **tooltipRender** - Tooltip shown
5. **legendRender** - Legend item rendered
6. **animationComplete** - Animation finished
7. **pointClick** - User clicks data point
8. **zoomComplete** - Zoom operation complete

---

## Common Events

### Point Click Event

```vue
<template>
  <ejs-chart :pointClick="onPointClick">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const onPointClick = function (args) {
  console.log("Point clicked:", args.pointIndex);
  console.log("Series index:", args.seriesIndex);
  console.log("Data:", args.point);
  console.log("Value:", args.x, args.y);
};
</script>
```

### Series Render Event

```vue
<template>
  <ejs-chart :seriesRender="onSeriesRender">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const onSeriesRender = function (args) {
  console.log("Series:", args.series);
  console.log("Series name:", args.name);
};
</script>
```

### Tooltip Render Event

```vue
<template>
  <ejs-chart :tooltipRender="onTooltipRender" :tooltip="tooltip">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const tooltip = { enable: true };

const onTooltipRender = function (args) {
  // Customize tooltip content
  args.text = `<b>${args.data.pointX}</b><br>Value: ${args.data.pointY}`;
  // Can be used to format tooltips dynamically
};
</script>
```

### Point Render Event

```vue
<template>
  <ejs-chart :pointRender="onPointRender">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const onPointRender = function (args) {
  // Customize individual points
  if (args.point.y > 35) {
    args.fill = '#00FF00';  // Green for high values
  } else {
    args.fill = '#FF0000';  // Red for low values
  }
};
</script>
```

### Zoom Complete Event

```vue
<template>
  <ejs-chart :zoomComplete="onZoomComplete" :zoomSettings="zoomSettings">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const zoomSettings = { enableSelectionZooming: true };

const onZoomComplete = function (args) {
  console.log("Zoom factor:", args.currentZoomFactor);
  console.log("Zoom position:", args.currentZoomPosition);
};
</script>
```

---

## Custom Event Handling

### Highlight on Hover

```vue
<template>
  <ejs-chart :pointMove="onPointMove">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const onPointMove = function (args) {
  console.log("Hovering over point:", args.pointIndex);
  console.log("Value:", args.x, args.y);
};
</script>
```

### Double-Click Handler

```vue
<template>
  <ejs-chart :chartDoubleClick="onChartDoubleClick">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const onChartDoubleClick = function (args) {
  console.log("Double clicked at:", args.x, args.y);
  // Reset zoom on double-click
};
</script>
```

### Load Event - Initialize Chart

```vue
<template>
  <ejs-chart :load="onChartLoad">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const onChartLoad = function (args) {
  console.log("Chart loaded");
  // Initialize custom logic after chart is ready
};
</script>
```

### Drag End Event

```vue
<template>
  <ejs-chart :dragEnd="onDragEnd">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const onDragEnd = function (args) {
  console.log("Drag ended");
  console.log("New position:", args.point.x, args.point.y);
};
</script>
```

### Animation Complete

```vue
<template>
  <ejs-chart :animationComplete="onAnimationComplete">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const onAnimationComplete = function (args) {
  console.log("Animation finished");
  // Can trigger actions after animation
};
</script>
```

---

## Common Patterns

### Pattern 1: Click to Show Details

```vue
<template>
  <div>
    <ejs-chart :pointClick="onPointClick">
      <e-series-collection>
        <e-series :dataSource="data" type="Column" xName="month" yName="sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
    
    <div v-if="selectedPoint" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
      <h4>Selected Data</h4>
      <p>Month: <b>{{ selectedPoint.x }}</b></p>
      <p>Sales: <b>${{ selectedPoint.y }}K</b></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedPoint = ref(null);

const onPointClick = function (args) {
  selectedPoint.value = {
    x: args.point.x,
    y: args.point.y
  };
};
</script>
```

### Pattern 2: Conditional Point Coloring

```vue
<template>
  <ejs-chart :pointRender="onPointRender">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const onPointRender = function (args) {
  const value = args.point.y;
  
  if (value > 40) {
    args.fill = '#00AA00';  // Green for high
  } else if (value > 25) {
    args.fill = '#FFA500';  // Orange for medium
  } else {
    args.fill = '#FF0000';  // Red for low
  }
};
</script>
```

### Pattern 3: Export on Button Click

```vue
<template>
  <div>
    <ejs-button v-on:click="exportChart">Export as PNG</ejs-button>
    <ejs-chart ref="chart" id="container">
      <!-- series -->
    </ejs-chart>
  </div>
</template>

<script setup>
import { ref } from "vue";

const chart = ref(null);

const exportChart = () => {
  const chartInstance = document.getElementById("container").ej2_instances[0];
  chartInstance.exportModule.export('PNG', 'Chart');
};
</script>
```

## Next Steps

- Export and manage data: [Export and Data Management](../export-and-data-management.md)
- Customize appearance: [Customization and Styling](../customization-and-styling.md)
- Configure axes: [Axes and Scale](../axes-and-scale.md)
