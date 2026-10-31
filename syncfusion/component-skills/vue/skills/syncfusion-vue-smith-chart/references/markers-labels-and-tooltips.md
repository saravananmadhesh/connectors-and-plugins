# Markers, Labels, and Tooltips

## Table of Contents
- [Enabling Markers](#enabling-markers)
  - [Basic Marker Setup](#basic-marker-setup)
  - [Marker for Single Series Only](#marker-for-single-series-only)
- [Marker Configuration](#marker-configuration)
  - [Marker Size and Shape](#marker-size-and-shape)
  - [Marker Color and Border](#marker-color-and-border)
  - [Complete Marker Example](#complete-marker-example)
- [Data Labels](#data-labels)
  - [Enabling Data Labels](#enabling-data-labels)
  - [Data Label Formatting](#data-label-formatting)
  - [Smart Labels (Prevent Overlap)](#smart-labels-prevent-overlap)
  - [Complete Data Label Example](#complete-data-label-example)
- [Tooltips](#tooltips)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Tooltip Customization](#tooltip-customization)
  - [Tooltip Format Template](#tooltip-format-template)
  - [Complete Tooltip Example](#complete-tooltip-example)
- [Interactive Examples](#interactive-examples)
  - [Example 1: Multi-Series with Markers and Tooltips](#example-1-multi-series-with-markers-and-tooltips)
  - [Example 2: Conditional Marker Display](#example-2-conditional-marker-display)
- [Styling and Customization](#styling-and-customization)
  - [Marker Colors by Value](#marker-colors-by-value)
  - [Data Label Styling](#data-label-styling)
  - [Tooltip Template with HTML](#tooltip-template-with-html)

## Enabling Markers

Markers are visual indicators at each data point on the Smith Chart. Enable them to highlight individual impedance values.

### Basic Marker Setup

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :marker='marker'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from "@syncfusion/ej2-vue-charts";
export default {
  name: "App",
  components: {
    "ejs-smithchart": SmithchartComponent,
    "e-seriesCollection": SeriesCollectionDirective,
    "e-series": SeriesDirective
  },
  data: function () {
    return {
      dataSource: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 },
        { resistance: 0, reactance: 0.15 }
      ],
      name: 'Transmission1',
      marker: {
        visible: true
      },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

### Marker for Single Series Only

Enable markers only on specific series:

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        :dataSource='data1' 
        :name='name1' 
        :marker='markerEnabled'
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
export default {
  data: function () {
    return {
      markerEnabled: { visible: true },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

## Marker Configuration

Customize marker appearance with various properties.

### Marker Size and Shape

```vue
<e-series 
  :marker='marker'
  :dataSource='dataSource' 
  :name='name'
  :reactance='reactance' 
  :resistance='resistance'>
</e-series>
```

```javascript
data: function () {
  return {
    marker: {
      visible: true,
      width: 10,        // Marker size in pixels
      height: 10,       // Marker height
      shape: 'Circle'   // Circle, Rectangle, Diamond, Triangle, etc.
    }
  }
}
```

### Marker Color and Border

```javascript
marker: {
  visible: true,
  width: 12,
  height: 12,
  shape: 'Circle',
  opacity:0.5,
  fill: '#FF5733',           // Marker fill color
  border: {
    color: '#000000',        // Border color
    width: 2                 // Border width
  }
}
```

### Complete Marker Example

```vue
<template>
  <ejs-smithchart id="smithchart" :title='title'>
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :marker='marker'
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
      title: { text: 'Smith Chart with Custom Markers' },
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
      marker: {
        visible: true,
        width: 14,
        height: 14,
        shape: 'Circle',
        fill: '#4472C4',
        opacity:0.5,
        border: {
          color: '#FFFFFF',
          width: 2
        }
      },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

## Data Labels

Display values directly on markers to show impedance components.

### Enabling Data Labels

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :marker='marker'
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
      marker: {
        visible: true,
        dataLabel: {
          visible: true
        }
      }
    }
  }
}
</script>
```

### Data Label Formatting

```javascript
marker: {
  visible: true,
  dataLabel: {
    visible: true,
    fill: '#FFFFFF',
    opacity: 0.8,
    textStyle: {
      size: '12px',
      color: '#000000',
      fontFamily: 'Arial'
    },
    border: {
      color: '#1aff8c',
      width: 2,
    }
  }
}
```

### Smart Labels (Prevent Overlap)

```vue
<e-series 
  :dataSource='dataSource' 
  :name='name' 
  :marker='marker'
  :enableSmartLabels='true'
  :reactance='reactance' 
  :resistance='resistance'>
</e-series>
```

```javascript
enableSmartLabels: true  // Automatically position labels to avoid overlap
```

### Complete Data Label Example

```vue
<template>
  <ejs-smithchart id="smithchart" :title='title'>
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :marker='marker'
        :enableSmartLabels='true'
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
      title: { text: 'Transmission Line with Data Labels' },
      dataSource: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 },
        { resistance: 4.5, reactance: 2 },
        { resistance: 3.5, reactance: 1.6 },
        { resistance: 0, reactance: 0.15 }
      ],
      name: 'Transmission1',
      marker: {
        visible: true,
        width: 12,
        height: 12,
        fill: '#4472C4',
        dataLabel: {
          visible: true,
          fill: '#FFFFFF',
          opacity: 1,
          textStyle: {
            size: '11px',
            color: '#1F3864'
          }
        }
      },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

## Tooltips

Tooltips show detailed information when hovering over data points. Requires `TooltipRender` module injection.

### Enabling Tooltips

First, inject the `TooltipRender` module:

```vue
<script>
import { SmithchartComponent, TooltipRender } from '@syncfusion/ej2-vue-charts';

export default {
  provide: {
    smithchart: [TooltipRender]
  }
}
</script>
```

Then enable tooltips on series:

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :tooltip='tooltip'
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
      tooltip: {
        visible: true
      }
    }
  }
}
</script>
```

### Tooltip Customization

```javascript
tooltip: {
  visible: true,
  fill: '#F0E68C',           // Tooltip background color
  border: {
    color: '#000000',
    width: 1
  },
  opacity: 0.9,
}
```

### Tooltip Format Template

Display custom information in tooltips:

```vue
<template>
  <ejs-smithchart id="smithchart">
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :tooltip='tooltip'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective, TooltipRender } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function () {
    return {
      tooltip: {
        visible: true,
        template: '<div style="padding: 10px;"><b>Impedance Point</b><br/>Resistance: ${resistance} Ω<br/>Reactance: ${reactance} Ω</div>'
      }
    }
  },
  provide: {
    smithchart: [TooltipRender]
  }
}
</script>
```

### Complete Tooltip Example

```vue
<template>
  <ejs-smithchart id="smithchart" :title='title'>
    <e-seriesCollection>
      <e-series 
        :dataSource='dataSource' 
        :name='name' 
        :tooltip='tooltip'
        :marker='marker'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective, TooltipRender } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function () {
    return {
      title: { text: 'Interactive Smith Chart' },
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
      marker: {
        visible: true,
        width: 12,
        height: 12,
        fill: '#4472C4',
        dataLabel: {
          visible: true
        }
      },
      tooltip: {
        visible: true,
        fill: '#F0E68C',
        border: {
          color: '#000000',
          width: 1
        },
      },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  provide: {
    smithchart: [TooltipRender]
  }
}
</script>

```

## Interactive Examples

### Example 1: Multi-Series with Markers and Tooltips

```vue
<template>
  <ejs-smithchart id="smithchart" :title='title'>
    <e-seriesCollection>
      <e-series 
        :dataSource='series1' 
        :name='name1' 
        :marker='marker'
        :tooltip='tooltip'
        :fill='fill1'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
      <e-series 
        :dataSource='series2' 
        :name='name2' 
        :marker='marker'
        :tooltip='tooltip'
        :fill='fill2'
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
      title: { text: 'Comparing Cable Impedance' },
      series1: [ /* transmission line data */ ],
      series2: [ /* transmission line data */ ],
      name1: '50Ω Cable',
      name2: '75Ω Cable',
      fill1: '#FF5733',
      fill2: '#33FF57',
      marker: {
        visible: true,
        dataLabel: { visible: true }
      },
      tooltip: {
        visible: true
      },
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  provide: {
    smithchart: [TooltipRender]
  }
}
</script>
```

### Example 2: Conditional Marker Display

```vue
<template>
  <div>
    <div>
      <input type="checkbox" v-model="showMarkers"> Show Markers
      <input type="checkbox" v-model="showLabels"> Show Labels
      <input type="checkbox" v-model="showTooltips"> Show Tooltips
    </div>
    <ejs-smithchart id="smithchart">
      <e-seriesCollection>
        <e-series 
          :dataSource='dataSource' 
          :name='name'
          :marker='markerConfig'
          :tooltip='tooltipConfig'
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
      showMarkers: true,
      showLabels: true,
      showTooltips: true
    }
  },
  computed: {
    markerConfig() {
      return {
        visible: this.showMarkers,
        dataLabel: {
          visible: this.showLabels
        }
      };
    },
    tooltipConfig() {
      return {
        visible: this.showTooltips
      };
    }
  }
}
</script>
```

## Styling and Customization

### Marker Colors by Value

Create color schemes based on impedance values:

```javascript
computed: {
  markerFill() {
    // Color based on resistance level
    if (this.selectedPoint.resistance > 5) return '#FF0000';      // Red: High
    if (this.selectedPoint.resistance > 2) return '#FFA500';      // Orange: Medium
    return '#00FF00';                                               // Green: Low
  }
}
```

### Data Label Styling

```javascript
marker: {
  visible: true,
  dataLabel: {
    visible: true,
    textStyle: {
      size: '14px',
      color: '#FFFFFF',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    fill: '#000000',
    opacity: 0.9,
    border: {
      color: '#FFFFFF',
      width: 1
    }
  }
}
```

### Tooltip Template with HTML

```javascript
tooltip: {
  visible: true,
  template: '<div class="tooltip-template">' +
    '<strong>Impedance</strong><br/>' +
    'R: <span class="resistance">${resistance}</span> Ω<br/>' +
    'X: <span class="reactance">${reactance}</span> Ω<br/>' +
    '<em>Point: ${index}</em>' +
    '</div>'
}
```

CSS for template:

```css
<style>
.tooltip-template {
  padding: 10px;
  font-family: Arial, sans-serif;
}
.resistance, .reactance {
  font-weight: bold;
  color: #0066CC;
}
</style>
```
