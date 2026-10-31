# Interactions and Events

## Table of Contents
- [Overview](#overview)
- [Pointer Drag and Drop](#pointer-drag-and-drop)
  - [Enable Drag and Drop](#enable-drag-and-drop)
  - [Drag Configuration](#drag-configuration)
  - [Drag Settings](#drag-settings)
  - [Handle Drag Events](#handle-drag-events)
  - [Constrained Dragging](#constrained-dragging)
- [Tooltips](#tooltips)
  - [Enable Tooltips](#enable-tooltips)
  - [Tooltip Configuration](#tooltip-configuration)
  - [Custom Tooltip Format](#custom-tooltip-format)
  - [Tooltip Examples](#tooltip-examples)
  - [Tooltip on Demand](#tooltip-on-demand)
  - [Pointer-Specific Tooltip](#pointer-specific-tooltip)
- [Events](#events)
  - [Available Events](#available-events)
  - [Event Handler Registration](#event-handler-registration)
  - [Event Details](#event-details)
    - [pointerValueChange Event](#pointervaluechange-event)
    - [pointStart and pointEnd Events](#pointstart-and-pointend-events)
  - [Real-Time Updates with Events](#real-time-updates-with-events)
- [Event Handling](#event-handling)
  - [Multiple Event Handlers](#multiple-event-handlers)
  - [Event Order During Drag](#event-order-during-drag)
  - [Conditional Event Handling](#conditional-event-handling)
- [Animation](#animation)
  - [Animation During Initialization](#animation-during-initialization)
  - [Animation Easing Options](#animation-easing-options)
  - [Disable Animation](#disable-animation)
  - [Wait for Animation to Complete](#wait-for-animation-to-complete)
- [Print and Export](#print-and-export)
  - [Print the Gauge](#print-the-gauge)
  - [Export as Image](#export-as-image)
  - [Export Event Handler](#export-event-handler)
  - [Export Multiple Gauges](#export-multiple-gauges)
  - [Export Formats Supported](#export-formats-supported)
- [Complete Interaction Example](#complete-interaction-example)
``

## Overview

Linear Gauge supports interactive features like dragging pointers, displaying tooltips, and handling events. These features allow users to interact with the gauge and enable reactive updates to your application.

## Pointer Drag and Drop

### Enable Drag and Drop

Enable dragging for all pointers:

```javascript
<ejs-lineargauge :axes="axes" :enablePointerDrag="true"></ejs-lineargauge>
```

### Drag Configuration

```javascript
data() {
  return {
    enablePointerDrag: true,
    axes: [{
      minimum: 0,
      maximum: 100,
      pointers: [{
        value: 50,
        type: 'Marker',
        markerType: 'Circle',
        dragSettings: {
          enable: true,
          minValue: 10,      // Min value during drag
          maxValue: 90       // Max value during drag
        }
      }]
    }]
  };
}
```

### Drag Settings

```javascript
dragSettings: {
  enable: true,          // Enable/disable dragging
  minValue: 0,           // Lower bound for dragging
  maxValue: 100          // Upper bound for dragging
}
```

### Handle Drag Events

```vue
<template>
  <ejs-lineargauge 
    :axes="axes" 
    :enablePointerDrag="true"
    @pointerValueChange="onPointerDragChange"
  ></ejs-lineargauge>
</template>

<script>
export default {
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100,
        pointers: [{
          value: 50,
          type: 'Marker',
          dragSettings: { enable: true }
        }]
      }]
    };
  },
  methods: {
    onPointerDragChange(args) {
      console.log('Pointer dragged to:', args.value);
      // Update your app state
    }
  }
};
</script>
```

### Constrained Dragging

```javascript
// Allow dragging only in the "safe zone"
dragSettings: {
  enable: true,
  minValue: 30,    // Don't allow below 30
  maxValue: 70     // Don't allow above 70
}
```

## Tooltips

### Enable Tooltips

```javascript
<ejs-lineargauge :axes="axes" :tooltip="tooltipSettings"></ejs-lineargauge>
```

```javascript
data() {
  return {
    tooltipSettings: {
      enable: true,
      showAtMousePosition: false
    },
    axes: [{ /* ... */ }]
  };
}
```

### Tooltip Configuration

```javascript
tooltipSettings: {
  enable: true,
  showAtMousePosition: false,   // Show at pointer/axis position
  format: 'Temperature: {value}°C'  // Custom format
}
```

### Custom Tooltip Format

```javascript
tooltipSettings: {
  enable: true,
  format: '{value:.2f}',         // Two decimal places
  textStyle: {
    size: '12px',
    fontFamily: 'Arial'
  }
}
```

### Tooltip Examples

```javascript
// Simple value tooltip
format: '{value}'

// Percentage with symbol
format: '{value}%'

// Currency
format: '${value}k'

// Two decimals with unit
format: '{value:.2f}°C'

// Custom text
format: 'Current: {value} units'
```

### Tooltip on Demand

Show tooltips only when interacting:

```javascript
tooltipSettings: {
  enable: true,
  showAtMousePosition: true,    // Follow mouse
  format: 'Value: {value}'
}
```

### Pointer-Specific Tooltip

```javascript
pointers: [{
  value: 65,
  type: 'Marker',
  tooltip: {
    enable: true,
    format: 'Temperature: {value}°C',
    showAtMousePosition: false
  }
}]
```

## Events

### Available Events

Linear Gauge fires several events during its lifecycle:

| Event | When Fired | Useful For |
|-------|-----------|-----------|
| `created` | Component initializes | Setup/initialization logic |
| `beforePrint` | Before print operation | Prepare content |
| `pointMove` | Pointer being dragged | Real-time position updates |
| `pointEnd` | Pointer drag ends | Save final value |
| `pointStart` | Pointer drag starts | Store initial value |
| `pointerValueChange` | Pointer value changes | Update application state |
| `tooltipRender` | Tooltip displays | Custom tooltip content |
| `animationCompleted` | Animation finishes | Trigger next action |

### Event Handler Registration

```vue
<template>
  <ejs-lineargauge 
    :axes="axes"
    @created="onGaugeCreated"
    @pointerValueChange="onValueChange"
    @pointStart="onDragStart"
    @pointEnd="onDragEnd"
  ></ejs-lineargauge>
</template>

<script>
export default {
  methods: {
    onGaugeCreated(args) {
      console.log('Gauge created');
    },
    
    onValueChange(args) {
      console.log('Value changed to:', args.value);
    },
    
    onDragStart(args) {
      console.log('Drag started');
    },
    
    onDragEnd(args) {
      console.log('Drag ended at:', args.value);
    }
  }
};
</script>
```

### Event Details

#### pointerValueChange Event

```javascript
onValueChange(args) {
  // args properties:
  // - value: Number - new pointer value
  // - axisIndex: Number - axis index
  // - pointerIndex: Number - pointer index
  // - type: String - 'pointer' or 'annotation'
  
  console.log(`Pointer ${args.pointerIndex} on axis ${args.axisIndex} = ${args.value}`);
}
```

#### pointStart and pointEnd Events

```javascript
onDragStart(args) {
  // Drag started
  // Store initial state if needed
}

onDragEnd(args) {
  // Drag finished
  // Save final value to backend
  this.saveValue(args.value);
}
```

### Real-Time Updates with Events

```vue
<template>
  <div>
    <div class="status">
      <p>Current Value: {{ currentValue }}</p>
      <p>Status: {{ status }}</p>
    </div>
    <ejs-lineargauge 
      :axes="axes"
      @pointerValueChange="updateValue"
    ></ejs-lineargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 50,
      axes: [{
        minimum: 0,
        maximum: 100,
        pointers: [{
          value: 50,
          type: 'Marker'
        }]
      }]
    };
  },
  computed: {
    status() {
      if (this.currentValue < 33) return 'Low';
      if (this.currentValue < 66) return 'Medium';
      return 'High';
    }
  },
  methods: {
    updateValue(args) {
      this.currentValue = args.value;
      // Send to backend if needed
      this.persistValue(args.value);
    },
    persistValue(value) {
      console.log('Saving value:', value);
      // API call here
    }
  }
};
</script>
```

## Event Handling

### Multiple Event Handlers

```vue
<template>
  <ejs-lineargauge 
    :axes="axes"
    :enablePointerDrag="true"
    :tooltip="tooltipSettings"
    @created="onCreated"
    @pointStart="onPointStart"
    @pointMove="onPointMove"
    @pointEnd="onPointEnd"
    @pointerValueChange="onPointerValueChange"
  ></ejs-lineargauge>
</template>

<script>
export default {
  methods: {
    onCreated() {
      console.log('1. Gauge created');
    },
    onPointStart(args) {
      console.log('2. Drag started');
    },
    onPointMove(args) {
      console.log('3. Dragging:', args.value);
    },
    onPointEnd(args) {
      console.log('4. Drag ended');
    },
    onPointerValueChange(args) {
      console.log('5. Value changed to:', args.value);
    }
  }
};
</script>
```

### Event Order During Drag

1. `pointStart` - Drag initiated
2. `pointMove` - Multiple events while dragging
3. `pointerValueChange` - Value updated
4. `pointEnd` - Drag completed

### Conditional Event Handling

```javascript
onPointerValueChange(args) {
  // Only trigger if value changed significantly
  const delta = Math.abs(args.value - this.previousValue);
  
  if (delta > 5) {
    this.updateChart(args.value);
    this.previousValue = args.value;
  }
}
```

## Animation

### Animation During Initialization

Pointers animate when first displayed:

```javascript
pointers: [{
  value: 65,
  type: 'Marker',
  animationDuration: 1000,     // Animation time in ms
  animationEasing: 'Linear'    // Animation easing
}]
```

### Animation Easing Options

```javascript
// Common easing functions
animationEasing: 'Linear'           // Constant speed
animationEasing: 'EaseInQuad'       // Slow start
animationEasing: 'EaseOutQuad'      // Slow end
animationEasing: 'EaseInOutQuad'    // Slow start and end
```

### Disable Animation

For real-time data updates, disable animation:

```javascript
pointers: [{
  value: 65,
  type: 'Marker',
  animationDuration: 0            // No animation
}]
```

### Wait for Animation to Complete

```vue
<template>
  <ejs-lineargauge 
    :axes="axes"
    @animationCompleted="onAnimationDone"
  ></ejs-lineargauge>
</template>

<script>
export default {
  methods: {
    onAnimationDone(args) {
      console.log('Animation finished');
      // Proceed with next step
      this.showNextGauge();
    }
  }
};
</script>
```

## Print and Export

### Print the Gauge

```javascript
export default {
  methods: {
    printGauge() {
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.print();
    }
  }
};
```

```vue
<template>
  <div>
    <button @click="printGauge">Print Gauge</button>
    <ejs-lineargauge id="linearGauge" :axes="axes"></ejs-lineargauge>
  </div>
</template>
```

### Export as Image

```javascript
exportAsImage() {
  const gauge = document.getElementById('linearGauge').ej2_instances[0];
  gauge.export('PNG', 'gauge.png');     // PNG format
  // gauge.export('SVG', 'gauge.svg');  // SVG format
  // gauge.export('PDF', 'gauge.pdf');  // PDF format
}
```

### Export Event Handler

```vue
<template>
  <ejs-lineargauge 
    :axes="axes"
    @beforePrint="onBeforePrint"
  ></ejs-lineargauge>
</template>

<script>
export default {
  methods: {
    onBeforePrint(args) {
      // Customize before printing/exporting
      console.log('About to export/print');
      // Hide certain elements if needed
    },
    
    exportGauge() {
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.export('PNG', 'linear-gauge');
    }
  }
};
</script>
```

### Export Multiple Gauges

```javascript
exportMultipleGauges() {
  const gauge1 = document.getElementById('gauge1').ej2_instances[0];
  const gauge2 = document.getElementById('gauge2').ej2_instances[0];
  
  gauge1.export('PNG', 'gauge1.png');
  gauge2.export('PNG', 'gauge2.png');
}
```

### Export Formats Supported

- **PNG**: Raster image format (most common)
- **SVG**: Vector format (scalable)
- **PDF**: Document format (printable)

```javascript
// PNG (default)
gauge.export('PNG', 'gauge');

// SVG
gauge.export('SVG', 'gauge');

// PDF
gauge.export('PDF', 'gauge');
```

## Complete Interaction Example

```vue
<template>
  <div class="interactive-gauge">
    <div class="controls">
      <button @click="resetGauge">Reset</button>
      <button @click="exportGauge">Export</button>
      <button @click="printGauge">Print</button>
    </div>
    
    <div class="info">
      <p>Current Value: {{ currentValue }}</p>
      <p>Status: {{ status }}</p>
      <p v-if="isDragging" class="dragging">Dragging...</p>
    </div>
    
    <ejs-lineargauge 
      id="interactiveGauge"
      :axes="axes"
      :enablePointerDrag="true"
      :tooltip="tooltipSettings"
      @pointStart="onDragStart"
      @pointEnd="onDragEnd"
      @pointerValueChange="onValueChange"
    ></ejs-lineargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 50,
      isDragging: false,
      tooltipSettings: {
        enable: true,
        format: 'Value: {value}'
      },
      axes: [{
        minimum: 0,
        maximum: 100,
        pointers: [{
          value: 50,
          type: 'Marker',
          dragSettings: { enable: true },
          animationDuration: 500
        }],
        ranges: [
          { start: 0, end: 33, color: '#4CAF50' },
          { start: 33, end: 66, color: '#FFC107' },
          { start: 66, end: 100, color: '#F44336' }
        ]
      }]
    };
  },
  computed: {
    status() {
      if (this.currentValue < 33) return 'Good';
      if (this.currentValue < 66) return 'Warning';
      return 'Critical';
    }
  },
  methods: {
    onDragStart() {
      this.isDragging = true;
    },
    onDragEnd() {
      this.isDragging = false;
    },
    onValueChange(args) {
      this.currentValue = args.value;
    },
    resetGauge() {
      const gauge = document.getElementById('interactiveGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, 50);
    },
    exportGauge() {
      const gauge = document.getElementById('interactiveGauge').ej2_instances[0];
      gauge.export('PNG', 'gauge-export');
    },
    printGauge() {
      const gauge = document.getElementById('interactiveGauge').ej2_instances[0];
      gauge.print();
    }
  }
};
</script>

<style scoped>
.interactive-gauge {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
}

.info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.info p {
  margin: 5px 0;
}

.dragging {
  color: #FF9800;
  font-weight: bold;
}
</style>
```
