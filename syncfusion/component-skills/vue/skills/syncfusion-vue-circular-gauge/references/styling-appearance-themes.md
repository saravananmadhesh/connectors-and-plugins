# Styling, Appearance, and Themes

## Table of Contents
- [Theme System](#theme-system)
  - [Available Themes](#available-themes)
- [Applying Themes](#applying-themes)
  - [Import Theme in main.js](#import-theme-in-mainjs)
  - [Switching Themes at Runtime](#switching-themes-at-runtime)
  - [Theme Color Reference](#theme-color-reference)
- [Component Sizing](#component-sizing)
  - [Width and Height](#width-and-height)
  - [Percentage-Based Sizing](#percentage-based-sizing)
  - [Responsive Container Sizing](#responsive-container-sizing)
  - [CSS for Gauge Container](#css-for-gauge-container)
- [Label Styling](#label-styling)
  - [Label Font Configuration](#label-font-configuration)
  - [Font Size by Context](#font-size-by-context)
  - [Label Formatting](#label-formatting)
  - [Tick Mark Styling](#tick-mark-styling)
- [Custom Colors](#custom-colors)
  - [Pointer Color Customization](#pointer-color-customization)
  - [Range Color Customization](#range-color-customization)
  - [Axis Line Styling](#axis-line-styling)
  - [Background Color](#background-color)
- [Gauge-Wide Styling](#gauge-wide-styling)
  - [Title and Subtitle Styling](#title-and-subtitle-styling)
  - [Gauge Margin and Padding](#gauge-margin-and-padding)
  - [Border and Shadow](#border-and-shadow)
- [Responsive Design](#responsive-design)
  - [Media Queries for Gauge Size](#media-queries-for-gauge-size)
  - [Dynamic Font Size](#dynamic-font-size)
  - [Responsive Gauge Grid](#responsive-gauge-grid)
- [Advanced Styling Examples](#advanced-styling-examples)
  - [Example 1: Dark Theme Custom Styling](#example-1-dark-theme-custom-styling)
  - [Example 2: Compact Dashboard Style](#example-2-compact-dashboard-style)
  - [Example 3: High-Contrast Accessible Gauge](#example-3-high-contrast-accessible-gauge)

## Theme System

Syncfusion provides pre-built themes that control colors, fonts, and appearance throughout the gauge. Themes ensure consistent, professional styling with minimal configuration.

### Available Themes

1. **Material** - Material Design theme (default, modern flat design)
2. **Bootstrap** - Bootstrap 3-inspired theme
3. **Bootstrap4** - Bootstrap 4 theme
4. **Bootstrap5** - Bootstrap 5 theme
5. **Fluent** - Microsoft Fluent Design
6. **Tailwind** - Tailwind CSS-based theme
7. **HighContrast** - High contrast for accessibility

## Applying Themes

### Import Theme in main.js

```javascript
// Vue 2
import Vue from 'vue'
import App from './App.vue'
import '@syncfusion/ej2-vue-circulargauge/styles/material.css'

new Vue({ render: h => h(App) }).$mount('#app')
```

```javascript
// Vue 3
import { createApp } from 'vue'
import App from './App.vue'
import '@syncfusion/ej2-vue-circulargauge/styles/material.css'

createApp(App).mount('#app')
```

### Switching Themes at Runtime

```vue
<template>
  <div>
    <select v-model="currentTheme" @change="switchTheme">
      <option>material</option>
      <option>bootstrap</option>
      <option>fluent</option>
      <option>tailwind</option>
    </select>
    
    <ejs-circulargauge :axes="axes"></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTheme: 'material',
      axes: [{ /* configuration */ }]
    };
  },
  methods: {
    switchTheme() {
      // Dynamically load theme CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `./assets/styles/${this.currentTheme}.css`;
      document.head.appendChild(link);
    }
  }
}
</script>
```

### Theme Color Reference

| Theme | Primary Color | Background | Text |
|-------|---------------|------------|------|
| Material | #007BFF | #FFFFFF | #333333 |
| Bootstrap | #007BFF | #F5F5F5 | #333333 |
| Bootstrap5 | #0D6EFD | #FFFFFF | #212529 |
| Fluent | #0078D4 | #FFFFFF | #323130 |
| Tailwind | #3B82F6 | #FFFFFF | #1F2937 |

## Component Sizing

Control the physical dimensions of the gauge.

### Width and Height

```vue
<template>
  <ejs-circulargauge 
    id="container"
    width="500px"
    height="500px"
    :axes="axes"
  ></ejs-circulargauge>
</template>

<script>
export default {
  data() {
    return {
      axes: [{ /* configuration */ }]
    };
  }
}
</script>
```

### Percentage-Based Sizing

```vue
<template>
  <div class="gauge-wrapper">
    <ejs-circulargauge 
      width="100%"
      height="100%"
      :axes="axes"
    ></ejs-circulargauge>
  </div>
</template>

<style scoped>
.gauge-wrapper {
  width: 500px;
  height: 500px;
}
</style>
```

### Responsive Container Sizing

```vue
<template>
  <div class="gauge-container">
    <ejs-circulargauge 
      width="100%"
      height="100%"
      :axes="axes"
    ></ejs-circulargauge>
  </div>
</template>

<style scoped>
.gauge-container {
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;  /* Keep square */
  margin: 0 auto;
}
</style>
```

### CSS for Gauge Container

```css
#container {
  height: 450px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Label Styling

Control the appearance of axis labels.

### Label Font Configuration

```javascript
axes: [{
  axisLabelFont: {
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: 'Regular',
    size: '12px',
    color: '#333333'
  },
  labelPosition: 'Outside'  // 'Inside' or 'Outside'
}]
```

### Font Size by Context

```javascript
// Small gauge with compact labels
axisLabelFont: {
  size: '10px'
}

// Large gauge with prominent labels
axisLabelFont: {
  size: '16px'
}

// High-density dashboard
axisLabelFont: {
  size: '9px'
}
```

### Label Formatting

```javascript
majorTicks: {
  interval: 20,
  height: 10
},

// Format tick labels
labelFormat: '{value}%'  // Adds % symbol
```

### Tick Mark Styling

```javascript
majorTicks: {
  interval: 20,
  height: 10,
  width: 2,
  color: '#000000'
},

minorTicks: {
  interval: 5,
  height: 5,
  width: 1,
  color: '#CCCCCC'
}
```

## Custom Colors

Customize gauge colors beyond themes.

### Pointer Color Customization

```javascript
pointers: [{
  color: '#FF6B6B',           // Pointer fill
  border: {
    color: '#C92A2A',         // Pointer border
    width: 2
  }
}]
```

### Range Color Customization

```javascript
ranges: [
  {
    start: 0,
    end: 33,
    color: '#E74C3C',         // Critical - Red
    startWidth: 10,
    endWidth: 20
  },
  {
    start: 33,
    end: 66,
    color: '#F39C12',         // Warning - Orange
    startWidth: 10,
    endWidth: 20
  },
  {
    start: 66,
    end: 100,
    color: '#27AE60',         // Healthy - Green
    startWidth: 10,
    endWidth: 20
  }
]
```

### Axis Line Styling

```javascript
axes: [{
  lineStyle: {
    color: '#CCCCCC',
    width: 2
  }
}]
```

### Background Color

```javascript
backgroundColor: '#F8F8F8'  // Gauge background
```

## Gauge-Wide Styling

Apply styles to the entire gauge component.

### Title and Subtitle Styling

```javascript
title: 'System Performance',
titleStyle: {
  fontFamily: 'Arial',
  fontStyle: 'Normal',
  fontWeight: 'Bold',
  size: '18px',
  color: '#333333'
},

subtitle: 'Real-time metrics',
subtitleStyle: {
  fontFamily: 'Arial',
  fontStyle: 'Normal',
  fontWeight: 'Normal',
  size: '12px',
  color: '#666666'
}
```

### Gauge Margin and Padding

```vue
<template>
  <div class="gauge-wrapper">
    <ejs-circulargauge 
      :axes="axes"
    ></ejs-circulargauge>
  </div>
</template>

<style scoped>
.gauge-wrapper {
  padding: 20px;
  margin: 10px;
}
</style>
```

### Border and Shadow

```css
#container {
  border: 1px solid #CCCCCC;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## Responsive Design

Adapt gauge styling for different screen sizes.

### Media Queries for Gauge Size

```css
#container {
  height: 450px;
  width: 100%;
}

@media (max-width: 768px) {
  #container {
    height: 300px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  #container {
    height: 200px;
    width: 100%;
  }
}
```

### Dynamic Font Size

```javascript
computed: {
  labelFontSize() {
    if (window.innerWidth < 480) return '8px';
    if (window.innerWidth < 768) return '10px';
    return '12px';
  }
}
```

### Responsive Gauge Grid

```vue
<template>
  <div class="gauge-grid">
    <div class="gauge-item">
      <ejs-circulargauge :axes="gauge1"></ejs-circulargauge>
    </div>
    <div class="gauge-item">
      <ejs-circulargauge :axes="gauge2"></ejs-circulargauge>
    </div>
  </div>
</template>

<style scoped>
.gauge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  padding: 20px;
}

@media (max-width: 768px) {
  .gauge-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

## Advanced Styling Examples

### Example 1: Dark Theme Custom Styling

```vue
<template>
  <div class="dark-gauge">
    <ejs-circulargauge 
      :axes="axes"
      backgroundColor="#1A1A1A"
    ></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100,
        
        lineStyle: {
          color: '#444444',
          width: 2
        },
        
        ranges: [
          { start: 0, end: 33, color: '#FF6B6B' },
          { start: 33, end: 66, color: '#FFA94D' },
          { start: 66, end: 100, color: '#69DB7C' }
        ],
        
        pointers: [{
          value: 65,
          color: '#FFD93D'
        }],
        
        axisLabelFont: {
          color: '#FFFFFF',
          size: '12px'
        }
      }]
    };
  }
}
</script>

<style scoped>
.dark-gauge {
  background: #1A1A1A;
  padding: 20px;
  border-radius: 8px;
}

.dark-gauge /deep/ .e-circularGauge {
  background: #1A1A1A;
}
</style>
```

### Example 2: Compact Dashboard Style

```vue
<template>
  <div class="compact-dashboard">
    <div class="metric-card">
      <h3>CPU Usage</h3>
      <ejs-circulargauge 
        width="100%"
        height="150px"
        :axes="cpuAxis"
      ></ejs-circulargauge>
      <p class="value">{{ cpuValue }}%</p>
    </div>
    
    <div class="metric-card">
      <h3>Memory</h3>
      <ejs-circulargauge 
        width="100%"
        height="150px"
        :axes="memoryAxis"
      ></ejs-circulargauge>
      <p class="value">{{ memoryValue }}%</p>
    </div>
  </div>
</template>

<style scoped>
.compact-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  padding: 15px;
}

.metric-card {
  background: white;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.metric-card h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #333333;
}

.value {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #3FB9E3;
}
</style>
```

### Example 3: High-Contrast Accessible Gauge

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  
  // High contrast colors for accessibility
  lineStyle: {
    color: '#000000',  // Black
    width: 3
  },
  
  ranges: [
    {
      start: 0,
      end: 33,
      color: '#005A9C',  // Dark blue
      startWidth: 15,
      endWidth: 25
    },
    {
      start: 33,
      end: 66,
      color: '#006B21',  // Dark green
      startWidth: 15,
      endWidth: 25
    },
    {
      start: 66,
      end: 100,
      color: '#7F0000',  // Dark red
      startWidth: 15,
      endWidth: 25
    }
  ],
  
  pointers: [{
    value: 65,
    color: '#FFFFFF',  // White pointer
    border: {
      color: '#000000',  // Black border
      width: 3
    },
    needleColor: '#000000'
  }],
  
  axisLabelFont: {
    size: '14px',
    color: '#000000',
    fontWeight: 'Bold'
  },
  
  majorTicks: {
    interval: 20,
    height: 15,
    width: 3,
    color: '#000000'
  }
}]
```

