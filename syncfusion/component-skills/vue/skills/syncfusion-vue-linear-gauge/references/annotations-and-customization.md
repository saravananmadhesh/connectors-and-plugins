# Annotations and Customization

## Table of Contents
- [Overview](#overview)
- [Adding Annotations](#adding-annotations)
- [Text Annotations](#text-annotations)
  - [Simple Text Annotation](#simple-text-annotation)
  - [Dynamic Text Annotation](#dynamic-text-annotation)
  - [Multi-line Text Annotation](#multi-line-text-annotation)
- [HTML Annotations](#html-annotations)
  - [HTML Content](#html-content)
  - [HTML with Styling](#html-with-styling)
  - [Complex HTML Annotation](#complex-html-annotation)
- [Annotation Positioning](#annotation-positioning)
  - [Absolute Positioning (Percentage)](#absolute-positioning-percentage)
  - [Multiple Annotations at Different Positions](#multiple-annotations-at-different-positions)
  - [Positioning Relative to Pointers](#positioning-relative-to-pointers)
- [Multiple Annotations](#multiple-annotations)
- [CSS Customization](#css-customization)
  - [SVG Class Selectors](#svg-class-selectors)
  - [Custom Theme with CSS Variables](#custom-theme-with-css-variables)
  - [Component-Specific CSS](#component-specific-css)
- [Theme Integration](#theme-integration)
  - [Theme Override](#theme-override)
- [Dynamic Styling](#dynamic-styling)
  - [Conditional Pointer Color](#conditional-pointer-color)
  - [Real-time Annotation Updates](#real-time-annotation-updates)
- [Custom Fonts and Colors](#custom-fonts-and-colors)
  - [Font Customization](#font-customization)
  - [Color Scheme](#color-scheme)
  - [Dark Mode Example](#dark-mode-example)
  - [Apply Dark Mode](#apply-dark-mode)
- [Complete Example: Custom Branded Gauge](#complete-example-custom-branded-gauge)

## Overview

Annotations allow you to add custom text, labels, or HTML content at specific locations on the gauge. Combined with CSS customization, you can create branded and themed gauges that match your application design.

## Adding Annotations

Annotations are added to an axis:

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  annotations: [
    {
      content: 'Temperature',
      x: '50%',
      y: '50%',
      zIndex: '1'
    }
  ]
}]
```

## Text Annotations

### Simple Text Annotation

```javascript
annotations: [{
  content: 'Current Value',
  x: '50%',           // Horizontal position (center)
  y: '80%',           // Vertical position
  font: {
    size: '14px',
    fontFamily: 'Arial',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  color: '#000000',
  zIndex: '1'
}]
```

### Dynamic Text Annotation

Bind annotation content to component data:

```vue
<template>
  <ejs-lineargauge :axes="axes"></ejs-lineargauge>
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
          value: this.currentValue,
          type: 'Marker'
        }],
        annotations: [{
          content: `Value: ${this.currentValue}°C`,
          x: '50%',
          y: '90%'
        }]
      }]
    };
  },
  watch: {
    currentValue(newVal) {
      // Update annotation content
      this.axes[0].annotations[0].content = `Value: ${newVal}°C`;
    }
  }
};
</script>
```

### Multi-line Text Annotation

```javascript
annotations: [{
  content: 'Temperature<br/>Gauge',
  x: '50%',
  y: '50%',
  font: {
    size: '16px'
  }
}]
```

## HTML Annotations

### HTML Content

```javascript
annotations: [{
  content: '<div class="annotation-box">Status: OK</div>',
  x: '50%',
  y: '70%',
  zIndex: '2'
}]
```

### HTML with Styling

```javascript
annotations: [{
  content: '<span class="badge badge-success">Active</span>',
  x: '50%',
  y: '85%'
}]
```

In your component's `<style>` block:

```css
.annotation-box {
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
}

.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-warning {
  background-color: #ffc107;
  color: black;
}
```

### Complex HTML Annotation

```javascript
annotations: [{
  content: `
    <div class="gauge-info">
      <p class="value">${this.currentValue}</p>
      <p class="unit">°C</p>
      <p class="status">${this.getStatus()}</p>
    </div>
  `,
  x: '50%',
  y: '50%'
}]
```

```css
.gauge-info {
  text-align: center;
  padding: 10px;
}

.gauge-info .value {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.gauge-info .unit {
  font-size: 12px;
  margin: 0;
}

.gauge-info .status {
  font-size: 11px;
  color: #666;
  margin: 0;
}
```

## Annotation Positioning

### Absolute Positioning (Percentage)

```javascript
// Center of gauge
annotations: [{ x: '50%', y: '50%' }]

// Top-left corner
annotations: [{ x: '10%', y: '90%' }]

// Bottom-right area
annotations: [{ x: '90%', y: '10%' }]
```

### Multiple Annotations at Different Positions

```javascript
annotations: [
  {
    content: 'Min',
    x: '5%',
    y: '5%',
    font: { size: '12px' }
  },
  {
    content: 'Max',
    x: '95%',
    y: '5%',
    font: { size: '12px' }
  },
  {
    content: 'Current',
    x: '50%',
    y: '80%',
    font: { size: '14px', fontWeight: 'bold' }
  }
]
```

### Positioning Relative to Pointers

For annotations that follow pointer values, calculate positions dynamically:

```vue
<script>
export default {
  methods: {
    getAnnotationPosition(value, max) {
      // Calculate x position based on value
      const percentage = (value / max) * 100;
      return {
        x: `${percentage}%`,
        y: '75%'
      };
    },
    createAnnotations() {
      return [{
        content: 'Current: ' + this.currentValue,
        ...this.getAnnotationPosition(this.currentValue, 100)
      }];
    }
  }
};
</script>
```

## Multiple Annotations

```javascript
annotations: [
  {
    content: 'Status',
    x: '50%',
    y: '90%',
    font: { size: '12px' }
  },
  {
    content: 'Last Updated: 2 min ago',
    x: '50%',
    y: '95%',
    font: { size: '10px', color: '#999' }
  },
  {
    content: '⚠️ Warning Zone',
    x: '85%',
    y: '50%',
    font: { size: '11px', color: '#FF9800' }
  }
]
```

## CSS Customization

### SVG Class Selectors

Linear Gauge generates SVG elements with predictable class names:

```css
/* Axis line */
.e-lineargauge .e-axis-line {
  stroke: #000;
  stroke-width: 2;
}

/* Tick marks */
.e-lineargauge .e-major-ticks {
  stroke: #000;
}

.e-lineargauge .e-minor-ticks {
  stroke: #999;
}

/* Labels */
.e-lineargauge .e-axis-label {
  font-size: 12px;
  fill: #000;
}

/* Ranges */
.e-lineargauge .e-range {
  fill-opacity: 0.8;
}

/* Pointers */
.e-lineargauge .e-marker-pointer {
  fill: #1976D2;
}

.e-lineargauge .e-bar-pointer {
  fill: #4CAF50;
}
```

### Custom Theme with CSS Variables

```css
:root {
  --gauge-axis-color: #333;
  --gauge-label-color: #000;
  --gauge-tick-color: #666;
  --gauge-range-1: #4CAF50;
  --gauge-range-2: #FFC107;
  --gauge-range-3: #F44336;
  --gauge-pointer-color: #1976D2;
}

.e-lineargauge .e-axis-line {
  stroke: var(--gauge-axis-color);
}

.e-lineargauge .e-axis-label {
  fill: var(--gauge-label-color);
}

.e-lineargauge .e-marker-pointer {
  fill: var(--gauge-pointer-color);
}
```

### Component-Specific CSS

```css
/* Only style gauges with specific ID */
#temperatureGauge .e-axis-line {
  stroke-width: 3;
}

#pressureGauge .e-axis-line {
  stroke-width: 2;
}
```

## Theme Integration

### Theme Override

```css
/* Import theme */
@import '@syncfusion/ej2-vue-gauges/styles/material.css';

/* Override theme colors */
.e-lineargauge .e-axis-line {
  stroke: #2196F3 !important;
}

.e-lineargauge .e-range[aria-label*="0"] {
  fill: #4CAF50 !important;
}

.e-lineargauge .e-range[aria-label*="1"] {
  fill: #FF9800 !important;
}
```

## Dynamic Styling

### Conditional Pointer Color

```vue
<script>
export default {
  data() {
    return {
      temperature: 65,
      axes: [{
        minimum: 0,
        maximum: 100,
        pointers: [{
          value: 65,
          type: 'Marker',
          color: this.getPointerColor(65)
        }]
      }]
    };
  },
  methods: {
    getPointerColor(value) {
      if (value < 32) return '#0099FF';    // Cold
      if (value < 70) return '#4CAF50';    // Normal
      if (value < 85) return '#FFC107';    // Warm
      return '#F44336';                     // Hot
    },
    updateTemperature(newValue) {
      this.temperature = newValue;
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, newValue);
      
      // Update pointer color dynamically
      this.axes[0].pointers[0].color = this.getPointerColor(newValue);
    }
  }
};
</script>
```

### Real-time Annotation Updates

```vue
<script>
export default {
  watch: {
    temperature(newVal) {
      // Update annotation text
      this.axes[0].annotations[0].content = `${newVal}°C`;
      
      // Force re-render
      this.$forceUpdate();
    }
  }
};
</script>
```

## Custom Fonts and Colors

### Font Customization

```javascript
labelStyle: {
  font: {
    size: '14px',
    fontFamily: 'Courier New',
    fontStyle: 'italic',
    fontWeight: '600'
  },
  color: '#1E90FF'
}
```

### Color Scheme

```javascript
axes: [{
  line: {
    color: '#333333',
    width: 2
  },
  majorTicks: {
    color: '#000000'
  },
  minorTicks: {
    color: '#999999'
  },
  labelStyle: {
    color: '#444444',
    font: { size: '12px' }
  },
  ranges: [
    { start: 0, end: 35, color: '#27AE60' },
    { start: 35, end: 70, color: '#F39C12' },
    { start: 70, end: 100, color: '#E74C3C' }
  ],
  pointers: [{
    value: 65,
    color: '#1976D2',
    border: { color: '#FFFFFF' }
  }]
}]
```

### Dark Mode Example

```css
/* Dark mode theme */
.dark-mode .e-lineargauge {
  background-color: #1e1e1e;
}

.dark-mode .e-lineargauge .e-axis-line {
  stroke: #ffffff;
  stroke-width: 1;
}

.dark-mode .e-lineargauge .e-axis-label {
  fill: #e0e0e0;
}

.dark-mode .e-lineargauge .e-major-ticks {
  stroke: #ffffff;
}

.dark-mode .e-lineargauge .e-minor-ticks {
  stroke: #999999;
}
```

### Apply Dark Mode

```vue
<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <ejs-lineargauge :axes="axes"></ejs-lineargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: true
    };
  }
};
</script>
```

## Complete Example: Custom Branded Gauge

```vue
<template>
  <div class="custom-gauge-container">
    <ejs-lineargauge 
      id="brandedGauge" 
      :axes="axes"
      orientation="Vertical"
    ></ejs-lineargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 72,
      axes: [{
        minimum: 0,
        maximum: 100,
        line: { width: 3, color: '#2C3E50' },
        majorTicks: {
          interval: 25,
          color: '#34495E'
        },
        labelStyle: {
          format: '{value}%',
          font: { size: '13px', fontWeight: 'bold' }
        },
        ranges: [
          { start: 0, end: 30, color: '#E74C3C', startWidth: 20, endWidth: 20 },
          { start: 30, end: 70, color: '#F39C12', startWidth: 20, endWidth: 20 },
          { start: 70, end: 100, color: '#27AE60', startWidth: 20, endWidth: 20 }
        ],
        pointers: [{
          value: 72,
          type: 'Bar',
          width: 15,
          color: '#2C3E50',
          offset: 2
        }],
        annotations: [{
          content: '<div class="gauge-label">Efficiency</div>',
          x: '50%',
          y: '20%'
        }, {
          content: `<div class="gauge-value">${this.currentValue}%</div>`,
          x: '50%',
          y: '50%'
        }]
      }]
    };
  }
};
</script>

<style scoped>
.custom-gauge-container {
  width: 200px;
  height: 500px;
}

.gauge-label {
  font-size: 16px;
  font-weight: bold;
  color: #2C3E50;
}

.gauge-value {
  font-size: 28px;
  font-weight: bold;
  color: #E74C3C;
}
</style>
```
