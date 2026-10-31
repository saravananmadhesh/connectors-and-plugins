# Legend, Annotations, and Labels

## Table of Contents
- [Understanding Legends](#understanding-legends)
  - [When to Use Legends](#when-to-use-legends)
- [Legend Configuration](#legend-configuration)
  - [Basic Legend](#basic-legend)
  - [Complete Legend Configuration](#complete-legend-configuration)
  - [Legend Modes](#legend-modes)
    - [Range Mode](#range-mode-display-range-information)
    - [Pointer Mode](#pointer-mode-display-pointer-information)
- [Legend Positioning](#legend-positioning)
  - [Position Options](#position-options)
  - [Legend Size Control](#legend-size-control)
  - [Multi-Line Legend](#multi-line-legend)
- [Annotations Overview](#annotations-overview)
  - [Use Cases for Annotations](#use-cases-for-annotations)
- [Creating Annotations](#creating-annotations)
  - [Basic Annotation](#basic-annotation)
  - [Complete Annotation Configuration](#complete-annotation-configuration)
  - [Annotation with Text](#annotation-with-text)
  - [Annotation with Value Display](#annotation-with-value-display)
- [Annotation Positioning](#annotation-positioning)
  - [Center Annotations (Gauge Center)](#center-annotations-gauge-center)
  - [Radial Positioning](#radial-positioning)
  - [Circumferential Positioning](#circumferential-positioning)
- [Axis Labels and Text](#axis-labels-and-text)
  - [Label Format](#label-format)
  - [Label Positioning](#label-positioning)
  - [Major and Minor Labels](#major-and-minor-labels)
- [Advanced Examples](#advanced-examples)
  - [Example 1: Dashboard with Comprehensive Labels](#example-1-dashboard-with-comprehensive-labels)
  - [Example 2: Multi-Pointer Gauge with Legend](#example-2-multi-pointer-gauge-with-legend)
  - [Example 3: Status Display with Annotations](#example-3-status-display-with-annotations)
  - [Example 4: Legend with Visibility Toggle](#example-4-legend-with-visibility-toggle)
  - [Example 5: Complex Multi-Axis with Annotations](#example-5-complex-multi-axis-with-annotations)


## Understanding Legends

Legends display information about gauge ranges, pointers, and other elements. They provide context and meaning to the visual representation.

### When to Use Legends

- Identify what different ranges represent (e.g., "Safe", "Warning", "Critical")
- Label multiple pointers (e.g., "Actual", "Target", "Maximum")
- Explain color coding in complex gauges
- Support accessibility and user understanding

## Legend Configuration

### Basic Legend

```javascript
legendSettings: {
  visible: true,           // Show/hide legend
  mode: 'Range',          // 'Range', 'Pointer', or 'Default'
  alignment: 'Center',    // 'Near', 'Center', 'Far'
  position: 'Bottom',     // 'Top', 'Bottom', 'Left', 'Right'
  width: '100%',
  height: 'auto'
}
```

### Complete Legend Configuration

```javascript
legendSettings: {
  // Visibility and mode
  visible: true,
  mode: 'Range',                    // Type of legend
  
  // Positioning
  alignment: 'Center',              // Horizontal alignment
  position: 'Bottom',               // Legend position
  
  // Sizing
  width: '100%',
  height: 'auto',
  
  // Styling
  background: 'white',
  margin: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  },
  
  // Text and font
  labelPosition: 'Before',          // 'Before' or 'After'
  textStyle: {
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: 'Normal',
    size: '12px',
    color: '#333333'
  },
  
  // Item spacing
  itemPadding: 10,                  // Space between items
  
  // Border and shape
  border: {
    color: '#CCCCCC',
    width: 1
  },
  
  // Overflow behavior
  toggleVisibility: true            // Toggle ranges by clicking legend
}
```

### Legend Modes

#### Range Mode (Display range information)

```javascript
legendSettings: {
  visible: true,
  mode: 'Range',                    // Shows range legend
  position: 'Bottom'
},

// Ranges that appear in legend
ranges: [
  { start: 0, end: 33, color: '#E74C3C', name: 'Critical' },
  { start: 33, end: 66, color: '#F39C12', name: 'Warning' },
  { start: 66, end: 100, color: '#27AE60', name: 'Healthy' }
]
```

#### Pointer Mode (Display pointer information)

```javascript
legendSettings: {
  visible: true,
  mode: 'Pointer',                  // Shows pointer legend
  position: 'Right'
},

pointers: [
  { value: 65, name: 'Actual', radius: '55%' },
  { value: 80, name: 'Target', radius: '65%' }
]
```

## Legend Positioning

### Position Options

```javascript
// Bottom center (common for dashboards)
legendSettings: {
  position: 'Bottom',
  alignment: 'Center'
}

// Right side (good for narrow gauges)
legendSettings: {
  position: 'Right',
  alignment: 'Center'
}

// Top center (header-style)
legendSettings: {
  position: 'Top',
  alignment: 'Center'
}

// Left side
legendSettings: {
  position: 'Left',
  alignment: 'Near'
}
```

### Legend Size Control

```javascript
legendSettings: {
  position: 'Bottom',
  width: '80%',
  height: 'auto',
  margin: {
    left: 20,
    right: 20,
    top: 10,
    bottom: 10
  }
}
```

### Multi-Line Legend

```javascript
legendSettings: {
  visible: true,
  position: 'Bottom',
  width: '100%',     // Full width allows wrapping
  alignment: 'Center',
  itemPadding: 15    // Space between items
}

// Provide enough legend items to force wrapping
ranges: [
  { start: 0, end: 20, color: '#E74C3C', name: 'Very Low' },
  { start: 20, end: 40, color: '#E8843C', name: 'Low' },
  { start: 40, end: 60, color: '#F39C12', name: 'Medium' },
  { start: 60, end: 80, color: '#F1C40F', name: 'High' },
  { start: 80, end: 100, color: '#27AE60', name: 'Very High' }
]
```

## Annotations Overview

Annotations are custom content (text, images, shapes) overlaid on the gauge. They provide additional information, labels, or visual elements.

### Use Cases for Annotations

- Display metric names and units (e.g., "Speed (km/h)")
- Show current value or status text
- Add icons or custom graphics
- Create gauge titles or labels
- Display threshold indicators
- Add custom styling or decorative elements

## Creating Annotations

### Basic Annotation

```javascript
annotations: [
  {
    content: '<div>65 km/h</div>',  // HTML content
    angle: 0,                        // Position (degrees)
    radius: '0%'                     // Distance from center
  }
]
```

### Complete Annotation Configuration

```javascript
annotations: [
  {
    // Content
    content: '<div style="font-size: 24px; color: #3FB9E3;">65</div>',
    
    // Positioning
    angle: 0,                        // Angle on gauge (0-360)
    radius: '0%',                    // Distance from center (0-100%)
    
    // Sizing
    x: 0,
    y: 0,
    
    // Visibility
    axisIndex: 0,                    // Which axis to attach to
    axisValue: null                  // Attach to specific value
  }
]
```

### Annotation with Text

```javascript
annotations: [
  {
    content: '<div style="font-weight: bold; font-size: 16px;">Speed</div>',
    angle: 90,
    radius: '45%'
  },
  {
    content: '<div style="font-size: 12px; color: #999;">km/h</div>',
    angle: 90,
    radius: '35%'
  }
]
```

### Annotation with Value Display

```vue
<script>
export default {
  data() {
    return {
      currentValue: 65,
      annotations: [
        {
          content: `<div style="font-size: 32px; font-weight: bold; color: #3FB9E3;">${this.currentValue}</div>`,
          angle: 0,
          radius: '0%'
        }
      ]
    };
  },
  watch: {
    currentValue(newValue) {
      // Update annotation when value changes
      this.annotations[0].content = 
        `<div style="font-size: 32px; font-weight: bold; color: #3FB9E3;">${newValue}</div>`;
    }
  }
}
</script>
```

## Annotation Positioning

### Center Annotations (Gauge Center)

```javascript
annotations: [
  {
    content: '<div style="text-align: center;">System<br>Status</div>',
    angle: 0,
    radius: '0%'  // At center
  }
]
```

### Radial Positioning

```javascript
annotations: [
  // Inner ring
  {
    content: '<div>Inner</div>',
    angle: 0,
    radius: '30%'
  },
  
  // Middle ring
  {
    content: '<div>Middle</div>',
    angle: 0,
    radius: '60%'
  },
  
  // Outer ring
  {
    content: '<div>Outer</div>',
    angle: 0,
    radius: '90%'
  }
]
```

### Circumferential Positioning

```javascript
annotations: [
  // Top
  { content: '<div>North</div>', angle: 90, radius: '70%' },
  
  // Right
  { content: '<div>East</div>', angle: 0, radius: '70%' },
  
  // Bottom
  { content: '<div>South</div>', angle: 270, radius: '70%' },
  
  // Left
  { content: '<div>West</div>', angle: 180, radius: '70%' }
]
```

## Axis Labels and Text

Configure how axis values are displayed.

### Label Format

```javascript
axes: [{
  labelFormat: '{value}%',          // Add custom suffix/prefix
  
  // Or use function for complex formatting
  labelFormat: function(value) {
    return value + ' units';
  }
}]
```

### Label Positioning

```javascript
axes: [{
  labelPosition: 'Outside',         // 'Inside' or 'Outside'
  
  axisLabelFont: {
    size: '12px',
    color: '#333333'
  }
}]
```

### Major and Minor Labels

```javascript
axes: [{
  // Only show major tick labels
  majorTicks: {
    interval: 20,
    height: 10
  },
  
  // Minor ticks without labels
  minorTicks: {
    interval: 5,
    height: 5
  }
}]
```

## Advanced Examples

### Example 1: Dashboard with Comprehensive Labels

```vue
<template>
  <ejs-circulargauge 
    :axes="axes"
    :legends Settings="legendSettings"
  ></ejs-circulargauge>
</template>

<script>
export default {
  data() {
    return {
      legendSettings: {
        visible: true,
        mode: 'Range',
        position: 'Bottom',
        alignment: 'Center'
      },
      
      axes: [{
        minimum: 0,
        maximum: 100,
        
        ranges: [
          { start: 0, end: 33, color: '#E74C3C', name: 'Critical' },
          { start: 33, end: 66, color: '#F39C12', name: 'Warning' },
          { start: 66, end: 100, color: '#27AE60', name: 'Healthy' }
        ],
        
        annotations: [
          {
            content: '<div style="font-size: 28px; font-weight: bold;">System<br>Status</div>',
            angle: 0,
            radius: '0%'
          },
          {
            content: '<div style="font-size: 14px; color: #666;">Real-time</div>',
            angle: 0,
            radius: '-25%'
          }
        ],
        
        pointers: [{
          value: 72,
          radius: '60%'
        }]
      }]
    };
  }
}
</script>
```

### Example 2: Multi-Pointer Gauge with Legend

```javascript
legendSettings: {
  visible: true,
  mode: 'Pointer',
  position: 'Right',
  alignment: 'Center'
},

pointers: [
  {
    value: 65,
    name: 'Actual',
    radius: '55%',
    color: '#3FB9E3'
  },
  {
    value: 80,
    name: 'Target',
    radius: '65%',
    color: '#27AE60'
  },
  {
    value: 90,
    name: 'Maximum',
    radius: '75%',
    color: '#F39C12'
  }
]
```

### Example 3: Status Display with Annotations

```javascript
annotations: [
  // Main status value
  {
    content: '<div style="font-size: 36px; font-weight: bold; color: #3FB9E3;">72%</div>',
    angle: 0,
    radius: '0%'
  },
  
  // Status label
  {
    content: '<div style="font-size: 14px; color: #27AE60;">HEALTHY</div>',
    angle: 0,
    radius: '-20%'
  },
  
  // Metric name
  {
    content: '<div style="font-size: 12px; color: #666;">CPU Usage</div>',
    angle: 90,
    radius: '75%'
  },
  
  // Unit
  {
    content: '<div style="font-size: 10px; color: #999;">percent</div>',
    angle: 270,
    radius: '75%'
  }
]
```

### Example 4: Legend with Visibility Toggle

```vue
<template>
  <div>
    <ejs-circulargauge 
      :axes="axes"
      :legendSettings="legendSettings"
      @legendItemClick="onLegendClick"
    ></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      legendSettings: {
        visible: true,
        mode: 'Range',
        position: 'Bottom',
        toggleVisibility: true  // Allow toggling by clicking
      },
      
      axes: [{
        ranges: [
          { start: 0, end: 33, color: '#E74C3C', name: 'Critical' },
          { start: 33, end: 66, color: '#F39C12', name: 'Warning' },
          { start: 66, end: 100, color: '#27AE60', name: 'Healthy' }
        ],
        
        pointers: [{ value: 72 }]
      }]
    };
  },
  
  methods: {
    onLegendClick(args) {
      console.log('Legend item clicked:', args);
      // Handle legend interaction
    }
  }
}
</script>
```

### Example 5: Complex Multi-Axis with Annotations

```javascript
axes: [
  {
    // Outer axis
    minimum: 0,
    maximum: 100,
    radius: '90%',
    
    ranges: [
      { start: 0, end: 50, color: '#3FB9E3', name: 'CPU' },
      { start: 50, end: 100, color: '#33E9F6', name: '' }
    ],
    
    pointers: [{ value: 65 }],
    
    annotations: [
      {
        content: '<div style="font-weight: bold;">CPU</div>',
        angle: 0,
        radius: '110%'
      }
    ]
  },
  
  {
    // Inner axis
    minimum: 0,
    maximum: 100,
    radius: '65%',
    
    ranges: [
      { start: 0, end: 50, color: '#52F0A7', name: 'Memory' },
      { start: 50, end: 100, color: '#A4D600', name: '' }
    ],
    
    pointers: [{ value: 45 }],
    
    annotations: [
      {
        content: '<div style="font-weight: bold;">Memory</div>',
        angle: 180,
        radius: '85%'
      }
    ]
  }
],

legendSettings: {
  visible: true,
  mode: 'Range',
  position: 'Bottom'
}
```

