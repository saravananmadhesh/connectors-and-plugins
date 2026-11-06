# Dimensions, Title, and Accessibility

## Table of Contents
- [Chart Dimensions](#chart-dimensions)
  - [Fixed Dimensions](#fixed-dimensions)
  - [Percentage-Based Dimensions](#percentage-based-dimensions)
  - [Default Dimensions](#default-dimensions)
- [Title and Subtitle](#title-and-subtitle)
  - [Basic Title](#basic-title)
  - [Title with Subtitle](#title-with-subtitle)
  - [Title Customization](#title-customization)
  - [Complete Title Example](#complete-title-example)
- [Responsive Design](#responsive-design)
  - [Responsive Container](#responsive-container)
  - [Dynamic Sizing](#dynamic-sizing)
- [Accessibility](#accessibility)
  - [Semantic HTML](#semantic-html)
  - [Color Contrast](#color-contrast)
  - [Font Sizes](#font-sizes)
  - [Complete Accessibility Example](#complete-accessibility-example)
- [Keyboard Navigation](#keyboard-navigation)
  - [Tab Navigation](#tab-navigation)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
- [Examples](#examples)
  - [Example 1: Fully Responsive and Accessible Chart](#example-1-fully-responsive-and-accessible-chart)

## Chart Dimensions

Control the Smith Chart size and aspect ratio.

### Fixed Dimensions

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
    width="800px" 
    height="600px">
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
      // Chart data
    }
  }
}
</script>
```

### Percentage-Based Dimensions

```vue
<template>
  <div class="chart-container">
    <ejs-smithchart 
      id="smithchart" 
      width="100%" 
      height="100%">
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

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
}
</style>
```

### Default Dimensions

If width/height not specified, Smith Chart uses container dimensions or defaults to 600x450px.

```vue
<template>
  <!-- Chart fills parent container -->
  <ejs-smithchart id="smithchart">
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
```

## Title and Subtitle

Add descriptive titles to charts.

### Basic Title

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
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
</template>

<script>
export default {
  data: function () {
    return {
      title: { text: 'Transmission Line Analysis' }
    }
  }
}
</script>
```

### Title with Subtitle

```javascript
title: {
  text: 'Smith Chart Analysis',
  subtitle: {
    text: 'Impedance and Admittance Visualization'
  }
}
```

### Title Customization

```javascript
title: {
  enableTrim: true,
  maximumWidth: 70,
  text: 'Transmission Line Impedance',
  subtitle: {
    text: 'RF Circuit Design',
    textStyle: {
      size: '14px',
      color: '#666666'
    }
  },
  textStyle: {
    size: '18px',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000000'
  },
  textAlignment: 'Center'  // Near, Far, Center
}
```

### Complete Title Example

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
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
      title: {
        enableTrim: true,
        maximumWidth: 70,
        text: 'RF Circuit Transmission Line',
        subtitle: {
          text: 'Impedance Matching Analysis',
          textStyle: {
            size: '14px',
            color: '#666666',
            fontStyle: 'normal'
          }
        },
        textStyle: {
          size: '20px',
          fontWeight: 'bold',
          color: '#333333'
        },
        textAlignment: 'Center'
      },
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
  }
}
</script>
```

## Responsive Design

Make Smith Charts responsive to different screen sizes.

### Responsive Container

```vue
<template>
  <div class="chart-wrapper">
    <ejs-smithchart 
      id="smithchart" 
      :title='title'
      width="100%" 
      height="100%">
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

<style scoped>
.chart-wrapper {
  width: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .chart-wrapper {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .chart-wrapper {
    padding: 5px;
  }
}
</style>
```

### Dynamic Sizing

```vue
<template>
  <div class="responsive-container">
    <ejs-smithchart 
      id="smithchart" 
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
</template>

<script>
export default {
  data: function () {
    return {
      chartWidth: '800px',
      chartHeight: '600px'
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      const width = window.innerWidth;
      
      if (width < 480) {
        this.chartWidth = '100%';
        this.chartHeight = '300px';
      } else if (width < 768) {
        this.chartWidth = '100%';
        this.chartHeight = '400px';
      } else {
        this.chartWidth = '800px';
        this.chartHeight = '600px';
      }
    }
  }
}
</script>
```

## Accessibility

Smith Chart supports WCAG 2.2 Level AA accessibility standards.

### Semantic HTML

Smith Chart renders as SVG with proper ARIA labels for screen readers.

```vue
<template>
  <div role="region" aria-label="Smith Chart visualization">
    <ejs-smithchart 
      id="smithchart" 
      :title='title'
      :aria-label='ariaLabel'>
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
  data: function () {
    return {
      ariaLabel: 'Smith Chart showing transmission line impedance'
    }
  }
}
</script>
```

### Color Contrast

Use sufficient color contrast for visual elements:

```javascript
// Good contrast colors
const accessibleColors = [
  '#000000',  // Black
  '#FFFFFF',  // White
  '#0066CC',  // Blue
  '#FF0000',  // Red
  '#009900',  // Green
  '#FF6600'   // Orange
];
```

### Font Sizes

Use readable font sizes:

```javascript
textStyle: {
  size: '14px',    // Minimum for body text
  color: '#333333' // Sufficient contrast
}
```

### Complete Accessibility Example

```vue
<template>
  <div role="region" aria-label="Smith Chart with accessibility features">
    <h2>Smith Chart - Transmission Line Analysis</h2>
    <p aria-live="polite" class="sr-only">
      Chart showing impedance data for transmission lines with resistance and reactance values
    </p>
    
    <ejs-smithchart 
      id="smithchart" 
      :title='title'
      width="100%" 
      height="600px">
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
    
    <!-- Data table as alternative -->
    <details>
      <summary>View as table</summary>
      <table>
        <thead>
          <tr>
            <th>Resistance (Ω)</th>
            <th>Reactance (Ω)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="point in dataSource" :key="point">
            <td>{{ point.resistance }}</td>
            <td>{{ point.reactance }}</td>
          </tr>
        </tbody>
      </table>
    </details>
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
      title: { text: 'Transmission Line Impedance' },
      marker: { visible: true },
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
  }
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

table {
  border-collapse: collapse;
  margin-top: 20px;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #4472C4;
  color: white;
}
</style>
```

## Keyboard Navigation

Enable full keyboard navigation for Smith Chart.

### Tab Navigation

Users can navigate chart elements using the Tab key:

```vue
<template>
  <div>
    <ejs-smithchart 
      id="smithchart" 
      tabindex="0"
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
```

### Keyboard Shortcuts

Implement custom keyboard shortcuts:

```vue
<template>
  <div @keydown="handleKeyboardEvent">
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
    
    <div class="keyboard-info">
      <p>Keyboard Shortcuts:</p>
      <ul>
        <li>P - Print chart</li>
        <li>E - Export as PNG</li>
        <li>? - Show help</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleKeyboardEvent(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        switch(event.key) {
          case 'p':
          case 'P':
            this.$refs.smithChart.print();
            break;
          case 'e':
          case 'E':
            this.$refs.smithChart.export('PNG', 'smith-chart');
            break;
          case '?':
            this.showHelp = !this.showHelp;
            break;
        }
      }
    }
  }
}
</script>
```

## Examples

### Example 1: Fully Responsive and Accessible Chart

```vue
<template>
  <div class="smithchart-app">
    <header>
      <h1>Smith Chart Analyzer</h1>
      <p class="subtitle">Interactive impedance visualization tool</p>
    </header>
    
    <main role="main">
      <div class="chart-container">
        <ejs-smithchart 
          id="smithchart" 
          :title='title'
          width="100%" 
          height="100%"
          tabindex="0"
          role="img"
          :aria-label='ariaLabel'>
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
      </div>
      
      <aside class="data-info">
        <h2>Data Summary</h2>
        <dl>
          <dt>Total Points:</dt>
          <dd>{{ dataSource.length }}</dd>
          <dt>Max Resistance:</dt>
          <dd>{{ maxResistance }} Ω</dd>
          <dt>Max Reactance:</dt>
          <dd>{{ maxReactance }} Ω</dd>
        </dl>
      </aside>
    </main>
  </div>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective, SmithchartLegend, TooltipRender } from '@syncfusion/ej2-vue-charts';
export default {
  components: {
        'ejs-smithchart': SmithchartComponent,
        'e-series': SeriesDirective,
        'e-seriesCollection': SeriesCollectionDirective
  },
  data: function () {
    return {
      title: { text: 'Transmission Line Analysis' },
      marker: { visible: true },
      ariaLabel: 'Smith Chart displaying transmission line impedance characteristics',
      dataSource: [ /* impedance data */ ],
      name: 'Line 1',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  computed: {
    maxResistance() {
      return Math.max(...this.dataSource.map(d => d.resistance));
    },
    maxReactance() {
      return Math.max(...this.dataSource.map(d => d.reactance));
    }
  }
}
</script>

<style scoped>
.smithchart-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
}

header {
  background-color: #4472C4;
  color: white;
  padding: 20px;
}

main {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 20px;
  padding: 20px;
  flex: 1;
  overflow: auto;
}

.chart-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-height: 500px;
}

.data-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  main {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    min-height: 400px;
  }
}
</style>
```
