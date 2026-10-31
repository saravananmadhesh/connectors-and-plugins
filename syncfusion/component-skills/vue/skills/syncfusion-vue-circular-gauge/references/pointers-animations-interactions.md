# Pointers, Animations, and Interactions

## Table of Contents
- [Understanding Pointers](#understanding-pointers)
  - [Pointer Roles](#pointer-roles)
- [Pointer Types](#pointer-types)
  - [Needle Pointer](#needle-pointer)
  - [Marker Pointer](#marker-pointer)
  - [Range Bar Pointer](#range-bar-pointer)
- [Pointer Configuration](#pointer-configuration)
  - [Complete Pointer Properties](#complete-pointer-properties)
  - [Setting Pointer Value](#setting-pointer-value)
  - [Multiple Pointers on One Axis](#multiple-pointers-on-one-axis)
  - [Pointer Sizing](#pointer-sizing)
- [Animation Settings](#animation-settings)
  - [Enabling Animation](#enabling-animation)
  - [Animation Easing Options](#animation-easing-options)
  - [Gauge-Level Animation](#gauge-level-animation)
  - [Duration Guidelines](#duration-guidelines)
- [Dragging Pointers](#dragging-pointers)
  - [Enabling Pointer Drag](#enabling-pointer-drag)
  - [Drag-Enabled Gauge Example](#drag-enabled-gauge-example)
  - [Constrained Dragging](#constrained-dragging)
- [Handling Drag Events](#handling-drag-events)
  - [Available Events](#available-events)
  - [Event Handler Examples](#event-handler-examples)
  - [Two-Way Binding with Pointers](#two-way-binding-with-pointers)
- [Tooltips and Feedback](#tooltips-and-feedback)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Tooltip Customization](#tooltip-customization)
  - [Custom Tooltip Template](#custom-tooltip-template)
- [Advanced Pointer Patterns](#advanced-pointer-patterns)
  - [Pattern 1: Actual vs Target Gauge](#pattern-1-actual-vs-target-gauge)
  - [Pattern 2: Min/Max/Current Indicators](#pattern-2-minmaxcurrent-indicators)
  - [Pattern 3: Real-Time Data Update](#pattern-3-real-time-data-update)
  - [Pattern 4: Interactive Multi-Gauge Dashboard](#pattern-4-interactive-multi-gauge-dashboard)

## Understanding Pointers

Pointers are the indicators that display values on a gauge. They move along the axis between minimum and maximum values. Each axis can have multiple pointers for comparing values.

### Pointer Roles

- Display the current value on the gauge
- Indicate status or measurement
- Respond to user interactions (dragging)
- Support animations for value changes
- Work with tooltips for additional information

## Pointer Types

### Needle Pointer

Traditional gauge needle (most common):

```javascript
pointers: [{
  type: 'Needle',      // Default
  value: 65,           // Current value
  radius: '60%',       // Distance from center
  pointerWidth: 8,     // Width of pointer base
  color: '#333333',
  border: {
    color: '#1d1d1d',
    width: 2
  }
}]
```

### Marker Pointer

Circle or custom shape at the tip:

```javascript
pointers: [{
  type: 'Marker',
  value: 75,
  radius: '60%',
  markerShape: 'Circle',  // or 'Rectangle', 'Triangle', 'Diamond'
  markerWidth: 20,
  markerHeight: 20,
  color: '#3FB9E3',
  border: {
    color: '#0066CC',
    width: 2
  }
}]
```

### Range Bar Pointer

Continuous bar showing value range:

```javascript
pointers: [{
  type: 'RangeBar',
  value: 65,
  radius: '60%',
  pointerWidth: 15,
  color: '#3FB9E3',
  opacity: 0.8
}]
```

## Pointer Configuration

### Complete Pointer Properties

```javascript
pointers: [{
  // Identification and value
  type: 'Needle',       // 'Needle', 'Marker', or 'RangeBar'
  value: 65,            // Current value
  name: 'Speed',        // Optional name for multiple pointers
  
  // Position and size
  radius: '60%',        // Distance from gauge center
  pointerWidth: 8,      // Width of pointer
  
  // Styling
  color: '#333333',
  backgroundColor: '#F0F0F0',
  border: {
    color: '#1d1d1d',
    width: 2
  },
  
  // Needle-specific
  needleStartWidth: 4,  // Width at start (near center)
  needleEndWidth: 8,    // Width at tip
  needleColor: '#000000',
  
  // Marker-specific
  markerShape: 'Circle',
  markerWidth: 20,
  markerHeight: 20,
  
  // Animation
  animation: {
    enable: true,
    duration: 500,      // Milliseconds
    easing: 'Linear'    // 'Linear', 'EaseInQuad', 'EaseOutQuad', etc.
  },
  
  // Interaction
  enableDrag: true,     // Allow user to drag pointer
  
  // Tooltip
  tooltip: {
    enable: true,
    template: '<div>Value: {{value}}</div>'
  }
}]
```

### Setting Pointer Value

```javascript
pointers: [{
  value: 65,  // Set to a specific value between axis minimum and maximum
}]
```

### Multiple Pointers on One Axis

Compare values with multiple pointers:

```javascript
pointers: [
  {
    value: 65,
    radius: '55%',
    color: '#3FB9E3',
    name: 'Actual'
  },
  {
    value: 80,
    radius: '60%',
    color: '#52F0A7',
    name: 'Target'
  },
  {
    value: 90,
    radius: '65%',
    color: '#F39C12',
    name: 'Maximum'
  }
]
```

### Pointer Sizing

Control pointer dimensions:

```javascript
pointers: [{
  // For needle pointers
  pointerWidth: 8,        // Base width
  needleStartWidth: 4,    // Width near center
  needleEndWidth: 10,     // Width at tip
  
  // For marker pointers
  markerWidth: 20,        // Marker width
  markerHeight: 20,       // Marker height
  
  // For range bar
  pointerWidth: 15        // Bar width
}]
```

## Animation Settings

Make value changes smooth and visually appealing.

### Enabling Animation

```javascript
pointers: [{
  value: 65,
  animation: {
    enable: true,
    duration: 500,  // Milliseconds
    easing: 'Linear'
  }
}]
```

### Animation Easing Options

```javascript
// Available easing functions
easing: 'Linear'              // Constant speed
easing: 'EaseInQuad'          // Slow start
easing: 'EaseOutQuad'         // Slow end
easing: 'EaseInOutQuad'       // Slow start and end
easing: 'EaseInCubic'         // More pronounced slow start
easing: 'EaseOutCubic'        // More pronounced slow end
```

### Gauge-Level Animation

Enable animation for all pointer changes:

```javascript
// In component data
axes: [{
  // ... axis configuration
  pointers: [{
    value: 65,
    animation: {
      enable: true,
      duration: 500
    }
  }]
}]

// Global animation setting
enableAnimation: true  // In gauge root props
```

### Duration Guidelines

```javascript
duration: 300    // Quick update (good for frequent changes)
duration: 500    // Smooth transition (default, balanced)
duration: 1000   // Dramatic animation (for emphasis)
duration: 2000   // Slow reveal (for attention-grabbing)
```

## Dragging Pointers

Allow users to interact with the gauge by dragging pointers.

### Enabling Pointer Drag

```javascript
pointers: [{
  value: 65,
  enableDrag: true,  // Allow dragging
}]
```

### Drag-Enabled Gauge Example

```vue
<template>
  <ejs-circulargauge 
    id="container" 
    :axes="axes"
    @pointerValueChange="onPointerChange"
  ></ejs-circulargauge>
</template>

<script>
export default {
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100,
        ranges: [
          { start: 0, end: 25, color: '#3FB9E3' },
          { start: 25, end: 50, color: '#33E9F6' },
          { start: 50, end: 75, color: '#52F0A7' },
          { start: 75, end: 100, color: '#A4D600' }
        ],
        pointers: [{
          value: 65,
          enableDrag: true,  // User can drag
          animation: {
            enable: true,
            duration: 300
          }
        }]
      }]
    };
  },
  methods: {
    onPointerChange(args) {
      console.log('New value:', args.value);
      // Update external state or make API calls
    }
  }
}
</script>
```

### Constrained Dragging

While the component doesn't have built-in range constraints for drag, you can validate changes:

```javascript
methods: {
  onPointerChange(args) {
    // Validate and constrain the value
    if (args.value > 80) {
      // Prevent excessive values
      console.warn('Value exceeded maximum');
      // Reset if needed
    }
  }
}
```

## Handling Drag Events

React to pointer movements and value changes.

### Available Events

```javascript
// When pointer value changes (via drag or programmatic update)
@pointerValueChange="onPointerChange"

// When animation completes
@animationComplete="onAnimationComplete"

// When gauge is rendered
@load="onGaugeLoad"
```

### Event Handler Examples

```javascript
methods: {
  // Pointer value changed
  onPointerChange(args) {
    console.log('Axis Index:', args.axisIndex);
    console.log('Pointer Index:', args.pointerIndex);
    console.log('New Value:', args.value);
    
    // Update parent state
    this.currentValue = args.value;
    
    // Trigger side effects
    this.updateMetrics(args.value);
  },
  
  // Animation completed
  onAnimationComplete(args) {
    console.log('Animation finished');
  },
  
  // Gauge initialized
  onGaugeLoad(args) {
    console.log('Gauge loaded');
  },
  
  // Side effect function
  updateMetrics(value) {
    // Update other components, make API calls, etc.
    this.$emit('value-changed', value);
  }
}
```

### Two-Way Binding with Pointers

```vue
<template>
  <div>
    <ejs-circulargauge 
      :axes="axes"
      @pointerValueChange="updateValue"
    ></ejs-circulargauge>
    <p>Current Value: {{ currentValue }}</p>
    <input v-model.number="currentValue" @change="updateGauge" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 65,
      axes: [{
        minimum: 0,
        maximum: 100,
        pointers: [{
          value: 65,
          enableDrag: true
        }]
      }]
    };
  },
  methods: {
    updateValue(args) {
      this.currentValue = args.value;
    },
    updateGauge() {
      // Update gauge pointer when input changes
      this.axes[0].pointers[0].value = this.currentValue;
      this.$forceUpdate();
    }
  }
}
</script>
```

## Tooltips and Feedback

Show additional information when users interact with the gauge.

### Enabling Tooltips

```javascript
pointers: [{
  value: 65,
  tooltip: {
    enable: true,
    format: 'Value: {value}%'
  }
}]
```

### Tooltip Customization

```javascript
pointers: [{
  tooltip: {
    enable: true,
    type: 'Mouse',      // 'Mouse' or 'Drag'
    format: 'Value: {value}',
    textStyle: {
      size: '12px',
      color: '#000000'
    },
    fill: '#FFFFFF',
    opacity: 0.9,
    border: {
      color: '#000000',
      width: 1
    }
  }
}]
```

### Custom Tooltip Template

```javascript
tooltip: {
  enable: true,
  template: `<div style="background: #F0F0F0; padding: 5px 10px;">
    <span>Value: <strong>${value}</strong></span>
  </div>`
}
```

## Advanced Pointer Patterns

### Pattern 1: Actual vs Target Gauge

Display actual and target values:

```javascript
pointers: [
  {
    value: this.actualValue,    // Blue - what we have
    radius: '55%',
    color: '#3FB9E3',
    name: 'Actual',
    enableDrag: true
  },
  {
    value: this.targetValue,    // Green - what we want
    radius: '65%',
    color: '#27AE60',
    name: 'Target',
    enableDrag: false
  }
]
```

### Pattern 2: Min/Max/Current Indicators

```javascript
pointers: [
  {
    value: this.minValue,
    radius: '50%',
    color: '#E74C3C',
    markerShape: 'Circle',
    name: 'Minimum'
  },
  {
    value: this.currentValue,
    radius: '60%',
    color: '#3FB9E3',
    type: 'Needle',
    name: 'Current',
    enableDrag: true
  },
  {
    value: this.maxValue,
    radius: '70%',
    color: '#F39C12',
    markerShape: 'Circle',
    name: 'Maximum'
  }
]
```

### Pattern 3: Real-Time Data Update

```javascript
methods: {
  startRealtimeUpdates() {
    setInterval(() => {
      // Fetch new value from API
      this.fetchCurrentValue().then(value => {
        // Update gauge pointer with animation
        this.axes[0].pointers[0].value = value;
        this.$forceUpdate();
      });
    }, 1000);  // Update every second
  },
  
  async fetchCurrentValue() {
    const response = await fetch('/api/current-value');
    const data = await response.json();
    return data.value;
  }
}
```

### Pattern 4: Interactive Multi-Gauge Dashboard

```vue
<template>
  <div class="dashboard">
    <div class="gauge-container">
      <ejs-circulargauge 
        :axes="cpuAxis"
        @pointerValueChange="args => cpuValue = args.value"
      ></ejs-circulargauge>
      <p>CPU: {{ cpuValue }}%</p>
    </div>
    
    <div class="gauge-container">
      <ejs-circulargauge 
        :axes="memoryAxis"
        @pointerValueChange="args => memoryValue = args.value"
      ></ejs-circulargauge>
      <p>Memory: {{ memoryValue }}%</p>
    </div>
    
    <div class="gauge-container">
      <ejs-circulargauge 
        :axes="diskAxis"
        @pointerValueChange="args => diskValue = args.value"
      ></ejs-circulargauge>
      <p>Disk: {{ diskValue }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cpuValue: 45,
      memoryValue: 65,
      diskValue: 80,
      cpuAxis: [{ /* configuration */ }],
      memoryAxis: [{ /* configuration */ }],
      diskAxis: [{ /* configuration */ }]
    };
  },
  
  methods: {
    updateAllGauges() {
      // Fetch metrics from monitoring system
      fetch('/api/metrics').then(r => r.json()).then(data => {
        this.cpuValue = data.cpu;
        this.memoryValue = data.memory;
        this.diskValue = data.disk;
      });
    }
  },
  
  mounted() {
    this.updateAllGauges();
    setInterval(() => this.updateAllGauges(), 5000);  // Refresh every 5 seconds
  }
}
</script>

<style>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  padding: 20px;
}

.gauge-container {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
}
</style>
```

