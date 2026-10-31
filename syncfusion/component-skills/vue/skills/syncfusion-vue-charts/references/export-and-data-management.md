# Export and Data Management

## Table of Contents

- [Export Options](#export-options)
  - [Export to PNG](#export-to-png)
  - [Export to JPEG](#export-to-jpeg)
  - [Export to PDF](#export-to-pdf)
  - [Export to SVG](#export-to-svg)
  - [Export Multiple Charts](#export-multiple-charts)
  - [Export with Custom Settings](#export-with-custom-settings)
  - [Export Formats](#export-formats)
- [Print Functionality](#print-functionality)
  - [Print Chart](#print-chart)
  - [Print with Custom Settings](#print-with-custom-settings)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Update Series Data](#update-series-data)
  - [Update Specific Series Data](#update-specific-series-data)
  - [Add New Data Points](#add-new-data-points)
- [Real-Time Data Updates](#real-time-data-updates)
  - [Live Data Stream](#live-data-stream)
  - [Start/Stop Live Updates](#startstop-live-updates)
- [Performance Optimization](#performance-optimization)
  - [Working with Large Datasets](#working-with-large-datasets)
  - [Data Aggregation for Performance](#data-aggregation-for-performance)
  - [Virtualization](#virtualization)
- [Troubleshooting Data Issues](#troubleshooting-data-issues)
  - [Data Not Displaying](#data-not-displaying)
  - [Chart Not Updating](#chart-not-updating)
  - [Memory Leak with Real-Time Data](#memory-leak-with-real-time-data)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Export Button in Toolbar](#pattern-1-export-button-in-toolbar)
  - [Pattern 2: Batch Export Multiple Formats](#pattern-2-batch-export-multiple-formats)
- [Next Steps](#next-steps)

## Export Options

Export charts to various formats for sharing and archiving.

### Export to PNG

```vue
<template>
  <ejs-button id='export' v-on:click="exportPNG">Export as PNG</ejs-button>
  
  <ejs-chart ref="chart" id="container">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
import { ref } from "vue";

const chart = ref(null);

const exportPNG = () => {
  const chartInstance = document.getElementById("container").ej2_instances[0];
  chartInstance.exportModule.export('PNG', 'Chart');
};
</script>
```

### Export to PDF

```vue
const exportPDF = () => {
  const chartInstance = document.getElementById("container").ej2_instances[0];
  chartInstance.exportModule.export('PDF', 'Chart');
};
```

### Export to SVG

```vue
const exportSVG = () => {
  const chartInstance = document.getElementById("container").ej2_instances[0];
  chartInstance.exportModule.export('SVG', 'Chart');
};
```

### Export Multiple Charts

```vue
<template>
  <ejs-button v-on:click="exportAll">Export All Charts</ejs-button>
</template>

<script setup>
const exportAll = () => {
  const chart1 = document.getElementById("container").ej2_instances[0];
  const chart2 = document.getElementById("container").ej2_instances[0];
  
  // Export each chart
  chart1.exportModule.export('PDF', 'First Chart');
  chart2.exportModule.export('PDF', 'Second Chart');
};
</script>
```

### Export with Custom Settings

```vue
const chartInstance = document.getElementById("container").ej2_instances[0];

// PNG export with options
chartInstance.exportModule.export('PNG', 'Chart', PdfPageOrientation.Portrait);

// PDF export
chartInstance.exportModule.export('PDF', 'Chart', PdfPageOrientation.Landscape);
```

**Export Formats:**
- `'PNG'` - Raster image (lossless)
- `'JPEG'` - Raster image (lossy)
- `'PDF'` - Document format
- `'SVG'` - Vector format

## Print Functionality

### Print Chart

```vue
<template>
  <ejs-button @click="printChart">Print</ejs-button>
  
  <ejs-chart ref="chart">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
import { ref } from "vue";

const chart = ref(null);

const printChart = () => {
  chart.value.print();
};
</script>
```

### Print with Custom Settings

```vue
const printChart = () => {
  chart.value.print();
  
  // Users can then set printer options and print
};
```

---

## Dynamic Data Updates

### Update Series Data

```vue
<template>
  <ejs-button @click.native="updateData">Refresh Data</ejs-button>
  
  <ejs-chart ref="chart">
    <e-series-collection>
      <e-series :dataSource="chartData" type="Column" xName="month" yName="sales">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
import { ref } from "vue";

const chart = ref(null);
const chartData = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 28 },
  { month: "Mar", sales: 34 }
];

const updateData = function() {
  // Update data array
  var newData = [
    { month: "Jan", sales: 40 },
    { month: "Feb", sales: 45 },
    { month: "Mar", sales: 50 },
  ];
  if (this.$refs.chart.ej2Instances.series[0]) {
      this.$refs.chart.ej2Instances.series[0].setData(newData, 500);
  }
};
</script>
```

### Update Specific Series Data

```vue
const updateSeriesData = () => {
  const chartInstance = document.getElementById("container").ej2_instances[0];
  
  // Update specific series dataSource
  chartInstance.series[0].dataSource = newData;
  
  // Refresh chart to reflect changes
  chartInstance.refresh();
};
```

### Add New Data Points

```vue
const addDataPoint = function () {
  this.$refs.chart.ej2Instances.series[0].addPoint({ x: 'Japan', y: 118.2 });
  // Chart re-renders automatically
};
```

---

## Real-Time Data Updates

### Live Data Stream

```vue
<template>
  <div>
    <ejs-button @click.native="startRealTime">Start Live Data</ejs-button>
    <ejs-button @click.native="stopRealTime">Stop</ejs-button>
    
    <ejs-chart ref="chart">
      <e-series-collection>
        <e-series :dataSource="liveData" type="Line" xName="time" yName="value">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script setup>
import { ref } from "vue";

const chart = ref(null);
const liveData = [
  { time: "12:00", value: 25 },
  { time: "12:01", value: 28 },
  { time: "12:02", value: 32 },
];

let timeCounter = 3;

const startRealTime = () => {
  const intervalId = setInterval(() => {
    // Generate new data point
    const newPoint = {
      time: `12:${String(timeCounter).padStart(2, '0')}`,
      value: Math.floor(Math.random() * 50) + 15,
    };
    
    // Remove old points to keep chart readable (keep last 20 points)
    if (args.chart.series.length > 20) {
      args.chart.series[0].setData(newPoint, 500);
    }
    
    timeCounter++;
  }, 1000);  // Update every 1 second
};

const stopRealTime = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

</script>
```

---

## Performance Optimization

### Working with Large Datasets

```vue
<template>
  <ejs-chart :tooltip="tooltip">
    <!-- Disable tooltips for better performance with large data -->
    <e-series-collection>
      <e-series :dataSource="largeData" type="Line" xName="x" yName="y">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
import { ref } from "vue";

const tooltip = { enable: false };
// Generate large dataset efficiently
const generateLargeData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      x: i,
      y: Math.random() * 100,
    });
  }
  return data;
};

const largeData = ref(generateLargeData(10000));  // 10,000 points
</script>
```

### Data Aggregation for Performance

```vue
// Before: 100,000 points (slow)
const rawData = fetchMillionDataPoints();  // Very slow to render

// After: Aggregate to 500 points (fast)
const aggregateData = (data, bucketSize) => {
  const aggregated = [];
  
  for (let i = 0; i < data.length; i += bucketSize) {
    const bucket = data.slice(i, i + bucketSize);
    const avg = bucket.reduce((sum, p) => sum + p.value, 0) / bucket.length;
    
    aggregated.push({
      x: bucket[0].x,
      y: avg,
    });
  }
  
  return aggregated;
};

const displayData = aggregateData(rawData, 200);  // 500 aggregated points
```

### Virtualization

For massive datasets, implement virtualization:

```vue
// Load data in chunks
const chartData = ref([]);
let startIndex = 0;
const chunkSize = 500;

const loadNextChunk = () => {
  const chunk = rawData.slice(startIndex, startIndex + chunkSize);
  chartData.value = [...chartData.value, ...chunk];
  startIndex += chunkSize;
};
```

---

## Troubleshooting Data Issues

### Data Not Displaying
**Check:**
1. Data array has values
2. `xName` and `yName` match data properties
3. Chart type is compatible with data structure

```vue
// Debug: Log data before chart renders
console.log("Chart data:", chartData.value);
console.log("First point:", chartData.value[0]);
```

### Chart Not Updating
**Solution:** Call `refresh()` after data changes

```vue
const updateChart = () => {
  chartData.value = newData;
  
  // Force chart to re-render
  const chartInstance = document.getElementById("container").ej2_instances[0];
  chartInstance.refresh();
};
```

### Memory Leak with Real-Time Data
**Solution:** Clean up intervals on unmount

```vue
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (pollingId) {
    clearInterval(pollingId);
  }
});
```

---

## Common Patterns

### Pattern 1: Export Button in Toolbar

```vue
<template>
  <div style="margin-bottom: 15px;">
    <ejs-button @click="exportPNG" style="padding: 8px 16px; margin-right: 10px;">
      📥 Export PNG
    </ejs-button>
    <ejs-button @click="exportPDF" style="padding: 8px 16px; margin-right: 10px;">
      📄 Export PDF
    </ejs-button>
    <ejs-button @click="printChart" style="padding: 8px 16px;">
      🖨️ Print
    </ejs-button>
  </div>
  
  <ejs-chart ref="chart" id="container">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
const exportPNG = () => {
  let chart = document.getElementById("container").ej2_instances[0];
  chart.exportModule.export('PNG', 'chart.png');
};

const exportPDF = () => {
  let chart = document.getElementById("container").ej2_instances[0];
  chart.exportModule.export('PDF', 'chart.pdf');
};

const printChart = () => {
  let chart = document.getElementById("container").ej2_instances[0];
  chart.value.print();
};
</script>
```

### Pattern 2: Batch Export Multiple Formats

```vue
const exportAllFormats = async () => {
  const chartInstance = document.getElementById("container").ej2_instances[0];
  
  // Export as PNG
  chartInstance.exportModule.export('PNG', 'chart.png');
  
  // Export as PDF
  chartInstance.exportModule.export('PDF', 'chart.pdf');
  
  // Export as SVG
  chartInstance.exportModule.export('SVG', 'chart.svg');
};
```

## Next Steps

- Add interactivity: [Interactions and Events](../interactions-and-events.md)
- Configure axes: [Axes and Scale](../axes-and-scale.md)
- Customize appearance: [Customization and Styling](../customization-and-styling.md)
