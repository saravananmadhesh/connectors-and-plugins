# Axis, Legend, and Printing

## Table of Contents
- [Axis Customization](#axis-customization)
  - [Horizontal Axis (Resistance)](#horizontal-axis-resistance)
  - [Radial Axis (Reactance)](#radial-axis-reactance)
  - [Radial Axis Configuration](#radial-axis-configuration)
  - [AxisLine](#axisline)
  - [Complete Axis Example](#complete-axis-example)
- [Legend Configuration](#legend-configuration)
  - [Enabling Legend](#enabling-legend)
  - [Legend Positioning](#legend-positioning)
  - [Legend Styling](#legend-styling)
  - [Legend with Series Names](#legend-with-series-names)
  - [Legend Render Event](#legend-render-event)
- [Printing Smith Chart](#printing-smith-chart)
  - [Print SmithChart](#print-smithchart)
  - [Export to Image File](#export-to-image-file)
  - [Multiple Export Formats](#multiple-export-formats)
  - [Print with Custom Options](#print-with-custom-options)
- [Export Functionality](#export-functionality)
  - [Complete Export Example](#complete-export-example)
- [Advanced Examples](#advanced-examples)
  - [Example 1: Full-Featured Chart with All Controls](#example-1-full-featured-chart-with-all-controls)
  - [Example 2: Responsive Smith Chart with Print Layout](#example-2-responsive-smith-chart-with-print-layout)

## Axis Customization

The Smith Chart axes represent resistance and reactance circles. Customize their appearance and labels.

### Horizontal Axis (Resistance)

```vue
<template>
  <ejs-smithchart id="smithchart" :horizontalAxis='horizontalAxis'>
  </ejs-smithchart>
</template>

<script>
export default {
  data: function () {
    return {
      horizontalAxis: {
        majorGridLines: {
          visible: true,
          width: 1
        },
        minorGridLines: {
          visible: true,
          width: 0.5
        },
        labelPosition: 'Inside',
        labelIntersectAction: 'Hide',
        labelStyle: {
          fontFamily: 'Times New Roman',
          fontWeight: 'bold',
          fontStyle: 'Italic',
          opacity: 0.75,
          size: '24px'
        }
      }
    }
  }
}
</script>
```

### Radial Axis (Reactance)

```javascript
radialAxis: {
  majorGridLines: {
    visible: true,
    width: 1
  },
  minorGridLines: {
    visible: true,
    width: 0.5
  },
  labelPosition: 'Inside',
  labelIntersectAction: 'Hide',
  labelStyle: {
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'Italic',
    opacity: 0.75,
    size: '24px'
  }
}
```

### Radial Axis Configuration

```javascript
radialAxis: {
  labelPosition: 'Outside',     // Outside or Inside
  majorGridLines: {
    visible: true,
    width: 1
  },
  minorGridLines: {
    visible: true,
    width: 0.5
  }
}
```

### AxisLine

It is a line in smithchart that can be configured to denotes the axis. By default, visibility of the axis line is true. You can customize its visibility by using visible property in axis Line.

```javascript
horizontalAxis: {
  majorGridLines: {
  visible: true,
  opacity: 0.8,
  width: 3
  },
  axisLine: {
    width: 3,
    visible: false,
    dashArray:2
  }
}
```

### Complete Axis Example

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
    :title='title'
    :horizontalAxis='horizontalAxis'
    :radialAxis='radialAxis'>
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
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function () {
    return {
      title: { text: 'Smith Chart with Custom Axes' },
      dataSource: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 },
        { resistance: 0, reactance: 0.15 }
      ],
      name: 'Transmission1',
      horizontalAxis: {
        majorGridLines: { visible: true, width: 1, opacity: 0.8 },
        minorGridLines: { visible: true, width: 0.5, opacity: 0.5 },
        labelPosition: 'Inside',
        labelIntersectAction: 'Hide',
        labelStyle: {
          fontFamily: 'Times New Roman',
          fontWeight: 'bold',
          fontStyle: 'Italic',
          opacity: 0.75,
          size: '14px'
        },
        axisLine: {
          width: 3,
          visible: false
          dashArray:2
        }
      },
      radialAxis: {
        majorGridLines: { visible: true, width: 1, opacity: 0.8 },
        minorGridLines: { visible: true, width: 0.5, opacity: 0.5 },
        labelPosition: 'Inside',
        labelIntersectAction: 'Hide',
        labelStyle: {
          fontFamily: 'Times New Roman',
          fontWeight: 'bold',
          fontStyle: 'Italic',
          opacity: 0.75,
          size: '14px'
        },
        axisLine: {
          width: 3,
          visible: false
          dashArray:2
        }
      },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

## Legend Configuration

Legends identify series by name and color. Requires `SmithchartLegend` module injection.

### Enabling Legend

```vue
<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective, SmithchartLegend } from "@syncfusion/ej2-vue-charts";

export default {
  provide: {
    smithchart: [SmithchartLegend]
  }
}
</script>
```

Then configure legend:

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
    :title='title'
    :legendSettings='legendSettings'>
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
export default {
  data: function () {
    return {
      legendSettings: {
        visible: true
      }
    }
  }
}
</script>
```

### Legend Positioning

```javascript
legendSettings: {
  visible: true,
  position: 'Right'    // Top, Bottom, Left, Right
}
```

### Legend Styling

```javascript
legendSettings: {
  visible: true,
  alignment: 'Near', // Near, Far, Center
  position: 'Top',
  shape: 'Rectangle',
  height: 100,
  width: 200,
  itemPadding: 5,
  shapePadding: 10,
  border: {
    color: '#CCCCCC',
    width: 1
  },
  textStyle: {
    size: '14px',
    color: '#000000',
    fontStyle: 'italic'
  }
}
```

### Legend with Series Names

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
    :title='title'
    :legendSettings='legendSettings'>
    <e-seriesCollection>
      <e-series 
        :dataSource='data1' 
        :name='name1'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
      <e-series 
        :dataSource='data2' 
        :name='name2'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective, SmithchartLegend } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function () {
    return {
      title: { text: 'Multiple Transmission Lines' },
      name1: '50Ω Impedance',
      name2: '75Ω Impedance',
      legendSettings: {
        visible: true,
        position: 'Bottom'
      },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  provide: {
    smithchart: [SmithchartLegend]
  }
}
</script>
```

### Legend Render Event

```vue
<template>
  <ejs-smithchart 
    id="smithchart"
    :legendSettings="legendSettings" 
    :legendRender='onlegendRender'>
  </ejs-smithchart>
</template>

<script>
export default {
  methods: {
    onLegendRender(args) {
      // Handle legend item render event
      console.log('Legend item Rendered:', args.text);
    }
  }
}
</script>
```

## Printing Smith Chart

Export the Smith Chart as an image or PDF.

### Print SmithChart

```vue
<template>
  <div>
    <button @click="printChart">Print Chart</button>
    <ejs-smithchart id="smithchart" ref="smithChart">
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
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  methods: {
    printChart() {
      this.$refs.smithChart.print();
    }
  }
}
</script>
```

### Export to Image File

```vue
<template>
  <div>
    <button @click="exportChart">Export as PNG</button>
    <ejs-smithchart id="smithchart" ref="smithChart">
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
  methods: {
    exportChart() {
      // Export as PNG image
      this.$refs.smithChart.export('PNG', 'smith-chart');
    }
  }
}
</script>
```

### Multiple Export Formats

```javascript
methods: {
  exportAsPNG() {
    this.$refs.smithChart.export('PNG', 'smith-chart');
  },
  
  exportAsSVG() {
    this.$refs.smithChart.export('SVG', 'smith-chart');
  },
  
  exportAsPDF() {
    this.$refs.smithChart.export('PDF', 'smith-chart');
  }
}
```

### Print with Custom Options

```javascript
printChart() {
  const smithChartElement = document.getElementById('smithchart');
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(smithChartElement.innerHTML);
  printWindow.document.close();
  printWindow.print();
}
```

## Export Functionality

### Complete Export Example

```vue
<template>
  <div>
    <div class="export-controls">
      <button @click="exportAsPNG">PNG</button>
      <button @click="exportAsSVG">SVG</button>
      <button @click="exportAsPDF">PDF</button>
      <button @click="printChart">Print</button>
    </div>
    <ejs-smithchart 
      id="smithchart" 
      ref="smithChart"
      :title='title'>
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
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function () {
    return {
      title: { text: 'Exportable Smith Chart' },
      dataSource: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 },
        { resistance: 4.5, reactance: 2 },
        { resistance: 3.5, reactance: 1.6 },
        { resistance: 2.5, reactance: 1.3 },
        { resistance: 2, reactance: 1.2 },
        { resistance: 1.5, reactance: 1 },
        { resistance: 1, reactance: 0.8 },
        { resistance: 0.5, reactance: 0.4 },
        { resistance: 0.3, reactance: 0.2 },
        { resistance: 0, reactance: 0.15 }
      ],
      name: 'Transmission1',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  methods: {
    exportAsPNG() {
      this.$refs.smithChart.export('PNG', 'smith-chart');
    },
    
    exportAsSVG() {
      this.$refs.smithChart.export('SVG', 'smith-chart');
    },
    
    exportAsPDF() {
      this.$refs.smithChart.export('PDF', 'smith-chart');
    },
    
    printChart() {
      this.$refs.smithChart.print();
    }
  }
}
</script>

<style scoped>
.export-controls {
  margin-bottom: 20px;
}

.export-controls button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #4472C4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.export-controls button:hover {
  background-color: #3359A8;
}
</style>
```

## Advanced Examples

### Example 1: Full-Featured Chart with All Controls

```vue
<template>
  <div class="smithchart-container">
    <div class="controls">
      <div>
        <label>
          <input type="checkbox" v-model="showLegend"> Legend
        </label>
        <label>
          <input type="checkbox" v-model="showAxis"> Axes
        </label>
      </div>
      <div>
        <button @click="exportAsPNG">Export PNG</button>
        <button @click="printChart">Print</button>
      </div>
    </div>
    
    <ejs-smithchart 
      id="smithchart" 
      ref="smithChart"
      :key="chartKey"
      :title='title'
      :legendSettings='legendSettings'
      :horizontalAxis='horizontalAxisConfig'>
      <e-seriesCollection>
        <e-series 
          :dataSource='series1' 
          :name='name1'
          :marker='marker'
          :reactance='reactance' 
          :resistance='resistance'>
        </e-series>
        <e-series 
          :dataSource='series2' 
          :name='name2'
          :marker='marker'
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
      showLegend: true,
      showAxis: true,
      title: { text: 'Multi-Series Smith Chart' },
      marker: { visible: true },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  computed: {
    chartKey() {
        return `${this.showLegend}-${this.showAxis}`;
    },
    legendSettings() {
      return {
        visible: this.showLegend,
        position: 'Top'
      };
    },
    horizontalAxisConfig() {
      return {
        majorGridLines: { visible: this.showAxis }
      };
    }
  },
  methods: {
    exportAsPNG() {
      this.$refs.smithChart.export('PNG', 'smith-chart');
    },
    printChart() {
      this.$refs.smithChart.print();
    }
  },
  provide: {
    smithchart: [SmithchartLegend]
  }
}
</script>

<style scoped>
.smithchart-container {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.controls label {
  margin-right: 20px;
}

.controls button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #4472C4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### Example 2: Responsive Smith Chart with Print Layout

```vue
<template>
  <div>
    <button @click="prepareForPrint">Prepare Print</button>
    <div :class="['smithchart-wrapper', { 'print-mode': printMode }]">
      <ejs-smithchart 
        id="smithchart"
        ref="smithChart"
        :title='title'
        :width='chartWidth'
        :height='chartHeight'>
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
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      printMode: false,
      chartWidth: '100%',
      chartHeight: '500px',
      title: { text: 'Smith Chart for Printing' }
    }
  },
  methods: {
    prepareForPrint() {
      this.printMode = true;
      this.chartWidth = '800px';
      this.chartHeight = '600px';
      
      setTimeout(() => {
        this.$refs.smithChart.print();
        this.printMode = false;
        this.chartWidth = '100%';
        this.chartHeight = '500px';
      }, 500);
    }
  }
}
</script>

<style scoped>
.smithchart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.smithchart-wrapper.print-mode {
  background-color: white;
  padding: 20px;
}

@media print {
  .smithchart-wrapper {
    page-break-inside: avoid;
  }
}
</style>
```
