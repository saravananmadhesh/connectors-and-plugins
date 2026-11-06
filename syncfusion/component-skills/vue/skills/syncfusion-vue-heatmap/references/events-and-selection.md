# Events and Selection in HeatMap

## Table of Contents
- [Event Overview](#event-overview)
- [Cell Click Event](#cell-click-event)
  - [Basic Cell Click Handler](#basic-cell-click-handler)
  - [Cell Click Event Arguments](#cell-click-event-arguments)
- [Event Handler Implementation](#event-handler-implementation)
  - [Complete Interactive Example](#complete-interactive-example)
- [Accessing Event Data](#accessing-event-data)
  - [Extracting Cell Information](#extracting-cell-information)
  - [Using Row and Column Indices](#using-row-and-column-indices)
  - [Working with Cell Elements](#working-with-cell-elements)
- [Multiple Event Handlers](#multiple-event-handlers)
  - [Handling Multiple Cell Clicks](#handling-multiple-cell-clicks)
  - [Conditional Event Handling](#conditional-event-handling)
  - [Preventing Default Behavior](#preventing-default-behavior)
  - [Event Timing and Performance](#event-timing-and-performance)
  - [Complete Event-Driven Dashboard](#complete-event-driven-dashboard)

## Event Overview

HeatMap events enable interactive features by responding to user actions:
- **cellClick** - Triggered when user clicks on a cell
- **tooltipRender** - Triggered when tooltip is rendered (when hovering over cells)

These events allow you to build interactive dashboards and analytics applications.

## Cell Click Event

### Basic Cell Click Handler

The `cellClick` event fires when a user clicks on any HeatMap cell:

```vue
<template>
  <div id="app">
    <div class="info">
      <p v-if="selectedCell">Clicked: {{ selectedCell }}</p>
    </div>
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :cellClick='onCellClick'>
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
      selectedCell: null,
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
    onCellClick: function(args) {
      console.log('Cell clicked:', args);
      const row = this.yAxis.labels[args.rowIndex];
      const col = this.xAxis.labels[args.columnIndex];
      const value = this.dataSource[args.rowIndex][args.columnIndex];
      this.selectedCell = `${row}, ${col}: ${value}`;
    }
  }
}
</script>
```

### Cell Click Event Arguments

The event handler receives an `args` object containing:

```javascript
args = {
  rowIndex: 1,           // Row index (0-based)
  columnIndex: 2,        // Column index (0-based)
  value: 26,            // Cell value
  cellElement: Element   // DOM element of the cell
}
```

Access this data to determine which cell was clicked and its value.

## Event Handler Implementation

### Complete Interactive Example

```vue
<template>
  <div id="app">
    <div class="control_wrapper">
      <h2>HeatMap with Cell Click Handler</h2>
      
      <div class="info-panel" v-if="selectedCell">
        <h3>Selected Cell Information</h3>
        <p><strong>Employee:</strong> {{ selectedCell.employee }}</p>
        <p><strong>Day:</strong> {{ selectedCell.day }}</p>
        <p><strong>Sales:</strong> ${{ selectedCell.value }}k</p>
        <p><strong>Click Time:</strong> {{ selectedCell.time }}</p>
      </div>

      <ejs-heatmap id="heatmap"
        :dataSource='dataSource'
        :xAxis='xAxis'
        :yAxis='yAxis'
        :titleSettings='titleSettings'
        :cellClick='onCellClick'>
      </ejs-heatmap>
    </div>
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
      selectedCell: null,
      titleSettings: {
        text: 'Click any cell to see details'
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
    onCellClick: function(args) {
      const employee = this.xAxis.labels[args.columnIndex];
      const day = this.yAxis.labels[args.rowIndex];
      const value = args.value;
      
      this.selectedCell = {
        employee: employee,
        day: day,
        value: value,
        time: new Date().toLocaleTimeString()
      };
    }
  }
}
</script>

<style scoped>
.info-panel {
  background: #f5f5f5;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  border-left: 4px solid #2196F3;
}

.info-panel h3 {
  margin-top: 0;
  color: #1976D2;
}

.info-panel p {
  margin: 5px 0;
}
</style>
```

## Accessing Event Data

### Extracting Cell Information

Access detailed information from the clicked cell:

```javascript
onCellClick: function(args) {
  // Cell position
  const rowIndex = args.rowIndex;
  const columnIndex = args.columnIndex;
  
  // Cell value
  const cellValue = args.value;
  
  // Associated labels
  const rowLabel = this.yAxis.labels[rowIndex];
  const columnLabel = this.xAxis.labels[columnIndex];
  
  // Build description
  const description = `${rowLabel} / ${columnLabel} = ${cellValue}`;
  console.log(description);
}
```

### Using Row and Column Indices

```javascript
onCellClick: function(args) {
  // Verify indices are within bounds
  if (args.rowIndex >= 0 && args.columnIndex >= 0) {
    const row = this.dataSource[args.rowIndex];
    const value = row[args.columnIndex];
    console.log('Value at position:', value);
  }
}
```

### Working with Cell Elements

```javascript
onCellClick: function(args) {
  // Access the DOM element
  const cellElement = args.cellElement;
  
  // Get computed style
  const backgroundColor = window.getComputedStyle(cellElement).backgroundColor;
  console.log('Cell background color:', backgroundColor);
  
  // Apply custom styling
  cellElement.style.outline = '2px solid red';
}
```

## Multiple Event Handlers

### Handling Multiple Cell Clicks

Track user interactions across multiple cells:

```vue
<template>
  <div id="app">
    <div class="stats">
      <p>Total Clicks: {{ totalClicks }}</p>
      <p>Last Selected: {{ lastSelected }}</p>
      <p>High Values Clicked: {{ highValuesCount }}</p>
    </div>
    
    <ejs-heatmap id="heatmap"
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :cellClick='onCellClick'>
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
      totalClicks: 0,
      lastSelected: 'None',
      highValuesCount: 0,
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
    onCellClick: function(args) {
      this.totalClicks++;
      
      const employee = this.xAxis.labels[args.columnIndex];
      const day = this.yAxis.labels[args.rowIndex];
      const value = args.value;
      
      this.lastSelected = `${employee} on ${day}: ${value}`;
      
      // Count high-value cells (>80)
      if (value > 80) {
        this.highValuesCount++;
      }
    }
  }
}
</script>
```

### Conditional Event Handling

```javascript
onCellClick: function(args) {
  const value = args.value;
  
  if (value > 90) {
    console.log('Excellent performance!');
    // Show promotion or reward
  } else if (value > 70) {
    console.log('Good performance');
    // Show encouragement
  } else if (value < 30) {
    console.log('Needs improvement');
    // Show support or training options
  }
}
```

### Preventing Default Behavior

Some event handlers might want to prevent cell interactions:

```javascript
onCellClick: function(args) {
  // Check if value meets criteria
  if (args.value < 0) {
    // Could prevent further action if needed
    console.log('Invalid data in cell');
    return false;
  }
  
  // Continue with normal processing
  this.processCell(args);
}
```

### Event Timing and Performance

```javascript
onCellClick: function(args) {
  const startTime = performance.now();
  
  // Process the click
  this.processSelectedCell(args);
  
  // Measure performance
  const endTime = performance.now();
  console.log(`Handler executed in ${endTime - startTime}ms`);
}
```

### Complete Event-Driven Dashboard

```vue
<template>
  <div id="app">
    <div class="dashboard">
      <div class="metrics">
        <div class="metric">
          <span>Total Interactions</span>
          <strong>{{ metrics.totalClicks }}</strong>
        </div>
        <div class="metric">
          <span>High Value Cells</span>
          <strong>{{ metrics.highValues }}</strong>
        </div>
        <div class="metric">
          <span>Average Value</span>
          <strong>{{ metrics.average.toFixed(1) }}</strong>
        </div>
      </div>
      
      <ejs-heatmap id="heatmap"
        :dataSource='dataSource'
        :xAxis='xAxis'
        :yAxis='yAxis'
        :cellClick='onCellClick'>
      </ejs-heatmap>
    </div>
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
      metrics: {
        totalClicks: 0,
        highValues: 0,
        clickedValues: [],
        average: 0
      },
      xAxis: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F']
      },
      yAxis: {
        labels: ['1', '2', '3', '4', '5', '6']
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
    onCellClick: function(args) {
      const value = args.value;
      
      // Update metrics
      this.metrics.totalClicks++;
      this.metrics.clickedValues.push(value);
      
      if (value > 80) {
        this.metrics.highValues++;
      }
      
      // Calculate average
      this.metrics.average = this.metrics.clickedValues.reduce((a, b) => a + b, 0) / this.metrics.clickedValues.length;
    }
  }
}
</script>
```

This comprehensive example shows how events enable interactive analytics with real-time metrics tracking.
