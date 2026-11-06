# Getting Started with Linear Gauge

## Table of Contents
- [Installation](#installation)
- [Package Setup](#package-setup)
  - [Import in Vue 3](#import-in-vue-3)
  - [Import in Vue 2](#import-in-vue-2)
- [Vue 3 Setup](#vue-3-setup)
- [Vue 2 Setup](#vue-2-setup)
- [CSS and Themes](#css-and-themes)
  - [Available Themes](#available-themes)
- [Basic Component](#basic-component)
- [Adding Your First Pointer](#adding-your-first-pointer)
- [Adding Ranges](#adding-ranges)
- [Complete Example: Battery Indicator](#complete-example-battery-indicator)

## Installation

Install the Syncfusion EJ2 Vue Gauges package:

```bash
npm install @syncfusion/ej2-vue-gauges
```

The package includes:
- Linear Gauge component
- Circular Gauge component
- All required dependencies
- TypeScript type definitions

## Package Setup

### Import in Vue 3

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { LinearGaugePlugin } from '@syncfusion/ej2-vue-gauges';

const app = createApp(App);
app.use(LinearGaugePlugin);
app.mount('#app');
```

### Import in Vue 2

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';
import { LinearGaugePlugin } from '@syncfusion/ej2-vue-gauges';

Vue.use(LinearGaugePlugin);
new Vue({
  render: h => h(App)
}).$mount('#app');
```

If using plugin is not desired, import components locally in your component file instead.

## Vue 3 Setup

Register the Linear Gauge component locally in your Vue 3 component:

```vue
<template>
  <ejs-lineargauge id="linearGauge"></ejs-lineargauge>
</template>

<script>
import { LinearGaugeComponent as EjsLineargauge } from '@syncfusion/ej2-vue-gauges';

export default {
  components: {
    'ejs-lineargauge': EjsLineargauge
  }
};
</script>
```

For components with pointers and axes, also register those directives:

```vue
<script>
import { 
  LinearGaugeComponent as EjsLineargauge,
  AxesDirective,
  AxisDirective,
  PointersDirective,
  PointerDirective
} from '@syncfusion/ej2-vue-gauges';

export default {
  components: {
    'ejs-lineargauge': EjsLineargauge,
    'e-axes': AxesDirective,
    'e-axis': AxisDirective,
    'e-pointers': PointersDirective,
    'e-pointer': PointerDirective
  }
};
</script>
```

## Vue 2 Setup

Register the Linear Gauge component locally in your Vue 2 component:

```vue
<script>
import { LinearGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-vue-gauges';

export default {
  components: {
    'ejs-lineargauge': LinearGaugeComponent,
    'e-axes': AxesDirective,
    'e-axis': AxisDirective,
    'e-pointers': PointersDirective,
    'e-pointer': PointerDirective
  }
};
</script>
```

## CSS and Themes

### Available Themes

Syncfusion provides several built-in themes:

- `material.css` - Material Design theme (default)
- `bootstrap.css` - Bootstrap theme
- `bootstrap4.css` - Bootstrap 4 theme
- `fabric.css` - Office Fabric theme
- `highcontrast.css` - High contrast theme for accessibility
- `tailwind.css` - Tailwind CSS theme
- `fluent.css` - Microsoft Fluent theme

## Basic Component

Here's the minimal working example with a single axis and pointer:

```vue
<template>
  <div>
    <h2>Temperature Gauge</h2>
    <ejs-lineargauge id="linearGauge" :axes="axes"></ejs-lineargauge>
  </div>
</template>

<script>
import { LinearGaugeComponent as EjsLineargauge, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-vue-gauges';

export default {
  components: {
    'ejs-lineargauge': EjsLineargauge,
    'e-axes': AxesDirective,
    'e-axis': AxisDirective,
    'e-pointers': PointersDirective,
    'e-pointer': PointerDirective
  },
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100,
        majorTicks: {
          interval: 10
        },
        minorTicks: {
          interval: 2
        },
        labelStyle: {
          format: '{value}°C'
        }
      }]
    };
  }
};
</script>
```

This creates a horizontal gauge with:
- Range from 0 to 100
- Major tick marks every 10 units
- Minor tick marks every 2 units
- Labels showing temperature values

## Adding Your First Pointer

Add a pointer to track a specific value:

```vue
<template>
  <ejs-lineargauge id="linearGauge" :axes="axes"></ejs-lineargauge>
</template>

<script>
export default {
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100,
        majorTicks: { interval: 10 },
        pointers: [{
          value: 65,
          type: 'Marker',
          markerType: 'Triangle',
          width: 15,
          color: '#F262CC',
          border: {
            width: 2,
            color: '#F8F8F8'
          }
        }]
      }]
    };
  }
};
</script>
```

Pointer Properties:
- `value`: Current pointer position (0-100 in this example)
- `type`: 'Marker' (single point) or 'Bar' (thickness/width)
- `markerType`: Shape - Circle, Triangle, Diamond, Rectangle, InvertedTriangle
- `width`: Size of the pointer element
- `color`: Fill color
- `border`: Border styling with width and color

## Adding Ranges

Ranges highlight zones on the gauge (safe, warning, danger):

```vue
<script>
export default {
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100,
        ranges: [
          {
            start: 0,
            end: 35,
            color: '#27AE60',
            startWidth: 10,
            endWidth: 10
          },
          {
            start: 35,
            end: 70,
            color: '#F39C12',
            startWidth: 10,
            endWidth: 10
          },
          {
            start: 70,
            end: 100,
            color: '#E74C3C',
            startWidth: 10,
            endWidth: 10
          }
        ],
        pointers: [{
          value: 65,
          type: 'Marker',
          markerType: 'Triangle',
          width: 15,
          color: '#333333'
        }]
      }]
    };
  }
};
</script>
```

Range Properties:
- `start`: Range beginning value
- `end`: Range ending value
- `color`: Background color for the range
- `startWidth`: Thickness at the start
- `endWidth`: Thickness at the end
- `border`: Optional border styling

## Complete Example: Battery Indicator

```vue
<template>
  <div>
    <h2>Battery Level: {{ batteryLevel }}%</h2>
    <ejs-lineargauge id="linearGauge" :axes="axes" orientation="Vertical"></ejs-lineargauge>
    <button @click="updateBattery">Update Battery</button>
  </div>
</template>

<script>
import { LinearGaugeComponent as EjsLineargauge, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-vue-gauges';

export default {
  components: {
    'ejs-lineargauge': EjsLineargauge,
    'e-axes': AxesDirective,
    'e-axis': AxisDirective,
    'e-pointers': PointersDirective,
    'e-pointer': PointerDirective
  },
  data() {
    return {
      batteryLevel: 75,
      axes: [{
        minimum: 0,
        maximum: 100,
        line: { width: 8 },
        ranges: [
          { start: 0, end: 20, color: '#FF0000', startWidth: 8, endWidth: 8 },
          { start: 20, end: 50, color: '#FFC107', startWidth: 8, endWidth: 8 },
          { start: 50, end: 100, color: '#4CAF50', startWidth: 8, endWidth: 8 }
        ],
        pointers: [{
          value: 75,
          type: 'Bar',
          width: 6,
          color: '#333333'
        }]
      }]
    };
  },
  methods: {
    updateBattery() {
      this.batteryLevel = Math.floor(Math.random() * 101);
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, this.batteryLevel);
    }
  }
};
</script>
```

This example demonstrates:
- Vertical orientation for a battery-like display
- Color-coded ranges for status
- Button to update the battery level
- Real-time pointer updates using `setPointerValue()`
