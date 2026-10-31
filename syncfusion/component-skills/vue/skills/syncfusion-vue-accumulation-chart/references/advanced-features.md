# Advanced Features and Interactions

## Table of Contents
- [Multi-Level Drill-Down](#multi-level-drill-down)
  - [Basic Drill-Down Pattern](#basic-drill-down-pattern)
  - [Drill Navigation and Back](#drill-navigation-and-back)
  - [State Management for Levels](#state-management-for-levels)
- [Point and Series Events](#point-and-series-events)
  - [Point Click Event](#point-click-event)
  - [Point Render Event](#point-render-event)
  - [Chart Events (load, mouse, tooltip)](#chart-events-load-mouse-tooltip)
- [Tooltip Configuration](#tooltip-configuration)
  - [Basic Tooltip](#basic-tooltip)
  - [Tooltip with Header and Format](#tooltip-with-header-and-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Custom Tooltip Rendering](#custom-tooltip-rendering)
- [Annotations and Markers](#annotations-and-markers)
  - [Text Annotation](#text-annotation)
  - [Image and HTML Annotations](#image-and-html-annotations)
  - [Marker Shapes and Positioning](#marker-shapes-and-positioning)
- [Color Mapping and Styling](#color-mapping-and-styling)
  - [Point Color Mapping](#point-color-mapping)
  - [Point Rendering Customization](#point-rendering-customization)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Replace Entire Series](#replace-entire-series)
  - [Add/Remove Points](#addremove-points)
  - [Real-Time Data Streaming](#real-time-data-streaming)
- [Print Functionality](#print-functionality)
  - [Print Chart](#print-chart)
  - [Keyboard Shortcut for Print](#keyboard-shortcut-for-print)
- [Export Options](#export-options)
  - [Export as Image (PNG/JPEG/SVG)](#export-as-image-pngjpegsvg)
  - [Export as PDF](#export-as-pdf)
  - [Complete Export Example](#complete-export-example)
- [Next Steps](#next-steps)
  - [Configure accessibility](#configure-accessibility)
  - [Return to main skill](#return-to-main-skill)

---

## Multi-Level Drill-Down

Implement interactive drill-down charts where clicking slices shows sub-categories.

### Basic Drill-Down Pattern

```vue
<template>
    <div id="app">
    <div>
        <div id="link">
            <a id="category" @click="onClick" style="visibility:hidden; display:inline-block">Sales by Category</a>
            <p style="visibility:hidden; display:inline-block" id="symbol"> >> </p>
            <p id="text" style="display:inline-block;"></p>
        </div>
        <button type="button" id="back" style="visibility: hidden;" @click="onClick">Back</button>
        <ejs-accumulationchart ref="pie" id="container" style='display:block;' :legendSettings="legendSettings" :enableSmartLabels='enableSmartLabels' :title="title" :textRender="onTextRender" :chartMouseClick="onChartMouseClick">
            <e-accumulation-series-collection>
                <e-accumulation-series :dataSource='data' xName='x' yName='y' :startAngle="startAngle" :endAngle="endAngle" :innerRadius="innerRadius" radius="70%" :dataLabel="dataLabel" :explode="isExplode" explodeOffset='10%' :explodeIndex='explodeIndex'>
                </e-accumulation-series>
            </e-accumulation-series-collection>
        </ejs-accumulationchart>
    </div>
    </div>
</template>
<script>

import { extend } from '@syncfusion/ej2-base';
import { getElement, indexFinder, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationChartComponent,
    AccumulationSeriesCollectionDirective, AccumulationSeriesDirective
 } from "@syncfusion/ej2-vue-charts";


export default {
name: "App",
components: {
"ejs-accumulationchart":AccumulationChartComponent,
"e-accumulation-series-collection":AccumulationSeriesCollectionDirective,
"e-accumulation-series":AccumulationSeriesDirective,

},

  data() {
    return {
      innerRadius: '0%',
    innerChart: false,
    enableSmartLabels: false,
    data: [
        { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
        { x: 'Minivan', y: 23 }
    ],
    suvs: [{ x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
    { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }],

    cars: [{ x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 },
    { x: 'Tata', y: 10 },
    { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }],

    pickups: [{ x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
    { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }],

    minivans: [{ x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 },
    { x: 'Jaguar', y: 9 },
    { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }],

    legendSettings: {
        visible: false,
    },
    dataLabel: {
        visible: true, position: 'Inside', connectorStyle: { type: 'Curve', length: '5%' }, font: { size: '14px', color: 'white' }
    },
    startAngle: 0,
    explodeIndex: 2,
    isExplode: false,
    endAngle: 360,
    title: 'Automobile Sales by Category'
    }
  },
  provide: {
     accumulationchart: [AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]
  },
   methods: {
    onTextRender: function (args) {
        args.text = args.point.x + ' ' + args.point.y + ' %';
    },
    onChartMouseClick: function (args) {
        const index = indexFinder(args.target);
        this.isExplode = false;
        const pointElement = document.getElementById('container_Series_' + index.series + '_Point_' + index.point);
        if (pointElement && !this.innerChart) {
            this.innerRadius = '30%';
            switch (index.point) {
                case 0:
                    this.data = this.suvs;
                    this.title = 'Automobile Sales in the SUV Segment';
                    document.getElementById('text').innerHTML = 'SUV';
                    break;
                case 1:
                    this.data = this.cars;
                    this.title = 'Automobile Sales in the Car Segment';
                    document.getElementById('text').innerHTML = 'Car';
                    break;
                case 2:
                    this.data = this.pickups;
                    this.title = 'Automobile Sales in the Pickup Segment';
                    document.getElementById('text').innerHTML = 'Pickup';
                    break;
                case 3:
                    this.data = this.minivans;
                    this.title = 'Automobile Sales in the Minivan Segment';
                    document.getElementById('text').innerHTML = 'Minivan';
                    break;
            }
            const dataLabel = extend({}, this.dataLabel);
            dataLabel.position = 'Outside';
            dataLabel.font.color = 'black';
            this.dataLabel = dataLabel;
            const innerLegendSettings = this.legendSettings;
            innerLegendSettings.visible = false;
            this.legendSettings = innerLegendSettings;
            dataLabel.position = 'Inside';
            dataLabel.font.color = 'white';
            this.dataLabel = dataLabel;
            const legendSettings = this.legendSettings;
            legendSettings.visible = false;
            this.legendSettings = legendSettings;
            this.enableSmartLabels = false;
            this.innerRadius = '0%';
            getElement('category').style.visibility = 'hidden';
            document.getElementById('symbol').style.visibility = 'hidden';
            document.getElementById('text').style.visibility = 'hidden';
            this.innerChart = false;
        }
    },
    onClick: function (e) {
        this.isExplode = false;
        this.data = [{ x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 }, { x: 'Minivan', y: 23 }]
        const dataLabel = extend({}, this.dataLabel);
        dataLabel.position = 'Inside';
        dataLabel.font.color = 'white';
        this.dataLabel = dataLabel;
        const legendSettings = this.legendSettings;
        legendSettings.visible = false;
        this.legendSettings = legendSettings;
        this.enableSmartLabels = false;
        this.innerRadius = '0%';
        getElement('category').style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
        e.target.style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
        this.innerChart = false;
    },
  }
  };

</script>

<style scoped>
  #category:hover {
    cursor: pointer;
  }
</style>

```

---

## Point and Series Events

Respond to user interactions with chart events.

### Point Click Event

```vue
<template>
  <ejs-accumulationchart 
    id="container"
    :pointRender="onPointRender"
    :pointClick="onPointClick">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 },
        { x: 'Others', y: 16 }
      ]
    }
  },
  methods: {
    onPointClick: function (args) {
      console.log('Clicked:', args.point.x, args.point.y);
      alert(`You selected: ${args.point.x}`);
    },
    onPointRender: function (args) {
      // Customize point rendering
      console.log('Rendering point:', args.point.x);
    }
  }
}
</script>
```

### Chart Events

```vue
<template>
  <ejs-accumulationchart 
    id="container"
    :load="onChartLoad"
    :chartMouseClick="onChartMouseClick"
    :textRender="onTextRender"
    :seriesRender="onSeriesRender"
    :tooltipRender="onTooltipRender">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 },
        { x: 'Others', y: 16 }
      ]
    }
  },
  methods: {
    onChartLoad(args) {
      console.log('Chart loaded')
    },
  
    onChartMouseClick(args) {
      console.log('Chart clicked:', args.target)
    },
  
    onTextRender(args) {
      console.log('Text rendering:', args.text)
    },
  
    onSeriesRender(args) {
      console.log('Series rendering')
    },
  
    onTooltipRender(args) {
      console.log('Tooltip rendering:', args.text)
    }
  }
}
</script>
```

---

## Tooltip Configuration

Enable and customize tooltips on hover.

### Basic Tooltip

```vue
<template>
  <ejs-accumulationchart id="container" :tooltip="tooltip">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationTooltip } from "@syncfusion/ej2-vue-charts"

export default {
  components: {
    'ejs-accumulationchart': AccumulationChartComponent,
    'e-accumulation-series-collection': AccumulationSeriesCollectionDirective,
    'e-accumulation-series': AccumulationSeriesDirective
  },
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 }
      ],
      tooltip: {
        enable: true,
        format: '<b>${point.x}</b><br/>Users: ${point.y}M'
      }
    }
  },
  provide: {
    accumulationchart: [PieSeries, AccumulationTooltip]
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Tooltip with Header and Format

```vue
tooltip: {
  enable: true,
  header: '<b>Browser Statistics</b>',
  format: '${point.x}: ${point.y} million users<br/>Share: ${point.percentage}%'
}
```

**Template Variables:**
- `${point.x}` - Category name
- `${point.y}` - Value
- `${point.percentage}` - Percentage
- `${point.color}` - Data color

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows point and series values to be formatted without using the `tooltipRender` event.

To apply a format specifier, add a colon (`:`) after the tooltip token, followed by the required format.

For example:

```vue
<template>
  <ejs-accumulationchart
    id="container"
    :tooltip="tooltip">
    <e-accumulation-series-collection>
      <e-accumulation-series
        :dataSource="seriesData"
        xName="x"
        yName="y"
        name="Browser usage"
        :opacity="0.8">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  AccumulationTooltip
} from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-accumulationchart': AccumulationChartComponent,
    'e-accumulation-series-collection':
      AccumulationSeriesCollectionDirective,
    'e-accumulation-series':
      AccumulationSeriesDirective
  },
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 }
      ],
      tooltip: {
        enable: true,
        format:
          '${series.name}<br>' +
          '${point.x}: ${point.y:n2} million users<br>' +
          'Share: ${point.percentage:n1}%<br>' +
          'Opacity: ${series.opacity}'
      }
    };
  },
  provide: {
    accumulationchart: [
      PieSeries,
      AccumulationTooltip
    ]
  }
};
</script>

<style>
#container {
  height: 400px;
}
</style>
```

In the above example, `point.y` is displayed with two decimal places, `point.percentage` is displayed with one decimal place, and `series.opacity` displays the opacity value applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `point.x`: Specifies the x-value of the data point, such as a DateTime or category value.
- `point.y`: Specifies the numeric y-value of the data point.
- `point.percentage`: Specifies the percentage contribution of the point to the total.
- `series.name`: Specifies the name assigned to the series.
- `series.type`: Specifies the rendering type of the series, such as `Pie`, `Doughnut`, `Pyramid`, or `Funnel`.
- `series.opacity`: Specifies the opacity applied to the series. This value controls the visual transparency of the series and can be customized in the series configuration.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the Accumulation Chart series type. The `series.name` and `series.type` tokens return string values, so DateTime or number formatting is not applied to these tokens.

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

### Custom Tooltip Rendering

```vue
<ejs-accumulationchart id="container" :tooltipRender="onTooltipRender"></ejs-accumulationchart>

methods: {
  onTooltipRender: function (args) {
    args.text = `<span style="color:red"><b>${args.point.x}</b></span><br/>Value: ${args.point.y}`;
  }
}
```

---

## Annotations and Markers

Add text, images, and shapes to highlight specific chart areas.

### Text Annotation

```vue
<template>
  <ejs-accumulationchart id="container" :annotations="annotations">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 }
      ],
      annotations: [
        {
          content: '<div style="background:yellow;padding:5px">Top Browser</div>',
          x: '40%',
          y: '20%'
        }
      ]
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

---

## Color Mapping and Styling

Control colors based on data properties.

### Point Color Mapping

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        pointColorMapping="color">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37, color: '#498fff' },
        { x: 'Firefox', y: 28, color: '#ffa060' },
        { x: 'Safari', y: 19, color: '#ff68b6' },
        { x: 'Others', y: 16, color: '#81e2a1' }
      ]
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Point Rendering Customization

```vue
<ejs-accumulationchart id="container" :pointRender="onPointRender">

methods: {
  onPointRender: function (args) {
    // Highlight largest slice
    if (args.point.y === Math.max(...this.seriesData.map(d => d.y))) {
      args.fill = '#FF6B6B';
    }
  }
}
```

---

## Dynamic Data Updates

Update chart data in real-time.

### Replace Entire Series

```vue
<template>
  <div>
    <ejs-button @click="updateData">Update Chart</ejs-button>
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 }
      ]
    }
  },
  methods: {
    updateData: function (args) {
      // Update entire series
      const newData = [
        { x: 'Chrome', y: 42 },
        { x: 'Firefox', y: 25 },
        { x: 'Safari', y: 23 },
        { x: 'Edge', y: 10 }
      ];
      this.$refs.chart.ej2Instances.series[0].setData(newData, 500);
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Add/Remove Points

```vue
methods: {
  addPoint: function (args) {
    // Trigger reactivity
    this.$refs.chart.ej2Instances.series[0].addPoint({ x: 'Opera', y: 5 });
  },
  
  removePoint: function (args) {
    this.$refs.chart.ej2Instances.series[0].removePoint(0);
  }
}
```

### Real-Time Data Streaming

```vue
mounted() {
  setInterval(() => {
    // Update random data point
    const randomIndex = Math.floor(Math.random() * this.seriesData.length)
    this.seriesData[randomIndex].y = Math.floor(Math.random() * 50)
    this.$set(this, 'seriesData', [...this.seriesData])
  }, 2000)
}
```

---

## Print Functionality

Print the chart to paper or PDF.

### Print Chart

```vue
<template>
  <div>
    <ejs-button @click="printChart">Print Chart</ejs-button>
    <ejs-accumulationchart id="container" ref="chart">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 }
      ]
    }
  },
  methods: {
    printChart: function (args) {
      this.$refs.chart.print();
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

**Keyboard Shortcut:** `Ctrl + P`

---

## Export Options

Export chart as image or PDF.

### Export as Image

```vue
// Export as PNG
methods: {
  exportAsImage: function (args) {
    this.$refs.chart.export('PNG', 'Chart.png');
  },
  
  exportAsJPEG: function (args) {
    this.$refs.chart.export('JPEG', 'Chart.jpg');
  },
  
  exportAsSVG: function (args) {
    this.$refs.chart.export('SVG', 'Chart.svg');
  }
}
```

### Export as PDF

```vue
exportAsPDF() {
  this.$refs.chart.export('PDF', 'Chart.pdf');
}
```

### Complete Export Example

```vue
<template>
  <div>
    <div>
      <ejs-button @click="exportAsImage">Export as PNG</ejs-button>
      <ejs-button @click="exportAsJPEG">Export as JPEG</ejs-button>
      <ejs-button @click="exportAsPDF">Export as PDF</ejs-button>
    </div>
    <ejs-accumulationchart id="container" ref="chart">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 }
      ]
    }
  },
  methods: {
    exportAsImage() {
      this.$refs.chart.export('PNG', 'chart.png')
    },
    exportAsJPEG() {
      this.$refs.chart.export('JPEG', 'chart.jpg')
    },
    exportAsPDF() {
      this.$refs.chart.export('PDF', 'chart.pdf')
    }
  }
}
</script>

<style>
#container {
  height: 400px;
  margin-top: 20px;
}
</style>
```

---

## Next Steps

- Configure accessibility in [accessibility.md](./accessibility.md)
- Return to main skill in [SKILL.md](../SKILL.md)
