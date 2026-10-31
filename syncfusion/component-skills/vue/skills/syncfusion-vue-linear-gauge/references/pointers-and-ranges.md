# Pointers and Ranges

## Table of Contents
- [Overview](#overview)
- [Pointer Types](#pointer-types)
  - [Marker Pointer](#marker-pointer)
  - [Marker Shapes](#marker-shapes)
  - [Bar Pointer](#bar-pointer)
  - [Choosing Between Marker and Bar](#choosing-between-marker-and-bar)
- [Marker Pointers](#marker-pointers)
  - [Basic Marker Configuration](#basic-marker-configuration)
  - [Advanced Marker Example](#advanced-marker-example)
  - [Custom Image Marker](#custom-image-marker)
- [Bar Pointers](#bar-pointers)
  - [Basic Bar Configuration](#basic-bar-configuration)
  - [Bar with Border and Styling](#bar-with-border-and-styling)
  - [Conditional Bar Color](#conditional-bar-color)
- [Range Bars](#range-bars)
- [Ranges](#ranges)
  - [Range Properties](#range-properties)
  - [Range with Borders](#range-with-borders)
  - [Gradient Ranges](#gradient-ranges)
- [Multiple Pointers](#multiple-pointers)
  - [Updating Specific Pointers](#updating-specific-pointers)
- [Pointer Updates](#pointer-updates)
  - [Programmatic Updates](#programmatic-updates)
  - [Reactive Data Binding](#reactive-data-binding)
  - [Animation During Update](#animation-during-update)
- [Styling Pointers](#styling-pointers)
  - [Color Management](#color-management)
  - [Size Variations](#size-variations)
  - [Pointer Offset](#pointer-offset)
- [Performance Considerations](#performance-considerations)
  - [Many Pointers](#many-pointers)
  - [Reducing Animation](#reducing-animation)
  - [Simplifying Ranges](#simplifying-ranges)

## Overview

Pointers and ranges are the visual elements that represent data on a Linear Gauge:
- **Pointers**: Track specific values on the axis (indicators)
- **Ranges**: Highlight zones or bands on the axis (background areas)
- **Range Bars**: Alternative visual representation combining pointer and range concepts

## Pointer Types

### Marker Pointer

A marker pointer is a point indicator at a specific value:

```javascript
pointers: [{
  value: 65,
  type: 'Marker',
  markerType: 'Triangle',
  width: 15,
  color: '#FF0000',
  border: {
    width: 2,
    color: '#FFFFFF'
  }
}]
```

Marker pointer properties:
- `value`: Position on the axis (numeric)
- `type`: Set to 'Marker'
- `markerType`: Shape (Circle, Triangle, Diamond, Rectangle, InvertedTriangle, Image)
- `width`: Size of the marker
- `color`: Fill color
- `border`: Border styling
- `offset`: Distance from axis line
- `imageUrl`: URL if markerType is 'Image'

### Marker Shapes

```javascript
// Circle marker
markerType: 'Circle'

// Triangle (pointing up)
markerType: 'Triangle'

// Diamond shape
markerType: 'Diamond'

// Rectangle/square
markerType: 'Rectangle'

// Triangle pointing down
markerType: 'InvertedTriangle'

// Custom image
markerType: 'Image',
imageUrl: '/assets/pointer-icon.png'
```

### Bar Pointer

A bar pointer fills from the axis baseline to the value:

```javascript
pointers: [{
  value: 65,
  type: 'Bar',
  width: 10,
  color: '#4CAF50',
  border: {
    width: 1,
    color: '#000000'
  },
  offset: 0
}]
```

Bar pointer properties:
- `value`: End position of the bar
- `type`: Set to 'Bar'
- `width`: Thickness of the bar
- `color`: Fill color
- `border`: Border styling
- `offset`: Horizontal offset from axis

### Choosing Between Marker and Bar

| Marker | Bar |
|--------|-----|
| Point indicator | Filled area from zero |
| Single value display | Visualization of magnitude |
| Compact appearance | Shows relative size |
| Example: thermometer bulb | Example: progress bar |

## Marker Pointers

### Basic Marker Configuration

```javascript
pointers: [{
  value: 50,
  type: 'Marker',
  markerType: 'Circle',
  width: 12,
  color: '#1976D2',
  border: {
    width: 2,
    color: '#FFFFFF'
  }
}]
```

### Advanced Marker Example

```javascript
pointers: [{
  value: 72,
  type: 'Marker',
  markerType: 'Triangle',
  width: 18,
  color: '#FF6B6B',
  border: {
    width: 3,
    color: '#FFD700'
  },
  offset: 10,           // Push away from axis
  opacity: 0.8,
  animationDuration: 500,
  placement: 'Near'     // Position relative to axis
}]
```

### Custom Image Marker

```javascript
pointers: [{
  value: 45,
  type: 'Marker',
  markerType: 'Image',
  imageUrl: '/assets/pointer-star.svg',
  width: 20,
  height: 20
}]
```

## Bar Pointers

### Basic Bar Configuration

```javascript
pointers: [{
  value: 65,
  type: 'Bar',
  width: 8,
  color: '#4CAF50'
}]
```

### Bar with Border and Styling

```javascript
pointers: [{
  value: 75,
  type: 'Bar',
  width: 12,
  color: '#2196F3',
  border: {
    width: 2,
    color: '#000000'
  },
  offset: 5,
  opacity: 0.7
}]
```

### Conditional Bar Color

```javascript
data() {
  return {
    pointerValue: 60,
    axes: [{
      minimum: 0,
      maximum: 100,
      pointers: [{
        value: this.pointerValue,
        type: 'Bar',
        width: 10,
        color: this.getBarColor(),
        offset: 0
      }]
    }]
  };
},
methods: {
  getBarColor() {
    if (this.pointerValue < 33) return '#4CAF50';    // Green
    if (this.pointerValue < 66) return '#FFC107';    // Amber
    return '#F44336';                                 // Red
  }
}
```

## Range Bars

Range bars combine the concept of ranges and bar pointers:

```javascript
rangeBar: {
  color: '#E8EAEF',
  start: 0,
  end: 100,
  width: 8
}
```

Range bars show background ranges that span the full axis. They're different from ranges in that they represent a continuous background rather than discrete zones.

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  rangeBar: {
    color: '#E0E0E0',
    start: 0,
    end: 100,
    width: 15,
    offset: 20
  },
  pointers: [{
    value: 65,
    type: 'Bar',
    width: 10,
    color: '#1976D2',
    offset: 20
  }]
}]
```

## Ranges

Ranges are background zones that highlight different areas of the gauge:

```javascript
ranges: [
  {
    start: 0,
    end: 35,
    color: '#27AE60',           // Green
    startWidth: 10,
    endWidth: 10
  },
  {
    start: 35,
    end: 70,
    color: '#F39C12',           // Orange
    startWidth: 10,
    endWidth: 10
  },
  {
    start: 70,
    end: 100,
    color: '#E74C3C',           // Red
    startWidth: 10,
    endWidth: 10
  }
]
```

### Range Properties

- `start`: Start value on the axis
- `end`: End value on the axis
- `color`: Background color
- `startWidth`: Thickness at the start
- `endWidth`: Thickness at the end
- `offset`: Distance from the axis line
- `border`: Border styling (color, width)
- `opacity`: Transparency (0-1)

### Range with Borders

```javascript
ranges: [{
  start: 0,
  end: 50,
  color: '#4CAF50',
  startWidth: 15,
  endWidth: 15,
  border: {
    color: '#2E7D32',
    width: 2
  }
}]
```

### Gradient Ranges

While Linear Gauge doesn't support gradients directly, you can simulate with opacity variations:

```javascript
ranges: [
  {
    start: 0,
    end: 50,
    color: '#4CAF50',
    opacity: 1.0,
    startWidth: 15,
    endWidth: 15
  },
  {
    start: 50,
    end: 75,
    color: '#8BC34A',
    opacity: 0.6,
    startWidth: 15,
    endWidth: 15
  }
]
```

## Multiple Pointers

Add multiple pointers to track different values on the same axis:

```javascript
pointers: [
  {
    value: 40,
    type: 'Marker',
    markerType: 'Circle',
    width: 12,
    color: '#FF0000',
    offset: -15
  },
  {
    value: 65,
    type: 'Marker',
    markerType: 'Triangle',
    width: 15,
    color: '#00FF00',
    offset: 0
  },
  {
    value: 85,
    type: 'Bar',
    width: 8,
    color: '#0000FF',
    offset: 15
  }
]
```

### Updating Specific Pointers

```javascript
const gauge = document.getElementById('linearGauge').ej2_instances[0];

// Update first pointer (index 0)
gauge.setPointerValue(0, 0, 50);

// Update second pointer (index 1)
gauge.setPointerValue(0, 1, 75);

// Update third pointer (index 2)
gauge.setPointerValue(0, 2, 90);
```

## Pointer Updates

### Programmatic Updates

```javascript
export default {
  methods: {
    updatePointerValue() {
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, 75);  // axis 0, pointer 0, new value 75
    }
  }
};
```

### Reactive Data Binding

```vue
<template>
  <div>
    <input v-model.number="gaugeValue" type="range" min="0" max="100">
    <p>Value: {{ gaugeValue }}</p>
    <ejs-lineargauge :axes="axes"></ejs-lineargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gaugeValue: 50,
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
  watch: {
    gaugeValue(newVal) {
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, newVal);
    }
  }
};
</script>
```

### Animation During Update

```javascript
// Updates with animation (default duration ~500ms)
gauge.setPointerValue(0, 0, 75);

// Control animation in configuration
axes: [{
  pointers: [{
    value: 50,
    type: 'Bar',
    animationDuration: 800  // 800ms animation
  }]
}]
```

## Styling Pointers

### Color Management

```javascript
pointers: [{
  value: 65,
  type: 'Marker',
  markerType: 'Circle',
  width: 15,
  color: '#1E90FF',          // Fill color
  border: {
    color: '#000000',        // Border color
    width: 2
  },
  opacity: 0.8               // Transparency
}]
```

### Size Variations

```javascript
// Small pointer
{ value: 40, type: 'Marker', width: 8 }

// Medium pointer
{ value: 60, type: 'Marker', width: 12 }

// Large pointer
{ value: 80, type: 'Marker', width: 18 }

// Bar pointer (thick)
{ value: 70, type: 'Bar', width: 15 }
```

### Pointer Offset

Offset moves the pointer away from the axis line:

```javascript
// Positive offset: moves outward
{ value: 50, type: 'Marker', offset: 10 }

// Negative offset: moves inward
{ value: 50, type: 'Marker', offset: -10 }

// Zero offset: on the axis line
{ value: 50, type: 'Marker', offset: 0 }
```

## Performance Considerations

### Many Pointers

With 5+ pointers, consider performance:

```javascript
// Avoid frequent updates to many pointers
// Instead, batch updates or use a single pointer

// Inefficient: 5 separate pointer updates
gauge.setPointerValue(0, 0, value1);
gauge.setPointerValue(0, 1, value2);
gauge.setPointerValue(0, 2, value3);
gauge.setPointerValue(0, 3, value4);
gauge.setPointerValue(0, 4, value5);

// Better: Update entire axes object
axes[0].pointers = [
  { value: value1, type: 'Marker' },
  { value: value2, type: 'Marker' },
  { value: value3, type: 'Marker' }
];
```

### Reducing Animation

For real-time dashboards, disable animation:

```javascript
pointers: [{
  value: 50,
  type: 'Marker',
  animationDuration: 0  // No animation for real-time data
}]
```

### Simplifying Ranges

Fewer ranges = better performance:

```javascript
// Good: 3-5 ranges
ranges: [
  { start: 0, end: 33 },
  { start: 33, end: 66 },
  { start: 66, end: 100 }
]

// Consider: Too many ranges may impact performance
// Avoid: 20+ ranges on a single axis
```
