# Advanced Features

## Table of Contents
- [Animation Configuration](#animation-configuration)
  - [Global Animation Settings](#global-animation-settings)
  - [Per-Pointer Animation](#per-pointer-animation)
  - [Animation Easing Functions](#animation-easing-functions)
  - [Disable Animation for Performance](#disable-animation-for-performance)
  - [Animated Transitions During Data Updates](#animated-transitions-during-data-updates)
- [Internationalization (i18n)](#internationalization-i18n)
  - [Locale Support](#locale-support)
  - [Setting Locale](#setting-locale)
  - [Locale in Component](#locale-in-component)
  - [Number Formatting by Locale](#number-formatting-by-locale)
- [Accessibility](#accessibility)
  - [WCAG Compliance](#wcag-compliance)
  - [ARIA Labels](#aria-labels)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Color Contrast](#color-contrast)
  - [Screen Reader Support](#screen-reader-support)
  - [Accessible Example](#accessible-example)
- [Component Methods](#component-methods)
  - [Available Methods](#available-methods)
  - [setPointerValue Method](#setpointervalue-method)
  - [Refresh Method](#refresh-method)
- [Performance Optimization](#performance-optimization)
  - [Disable Animation for High-Frequency Updates](#disable-animation-for-high-frequency-updates)
  - [Batch Updates](#batch-updates)
  - [Lazy Rendering](#lazy-rendering)
  - [Reduce Number of Ticks](#reduce-number-of-ticks)
- [Browser Compatibility](#browser-compatibility)
  - [Supported Browsers](#supported-browsers)
  - [Polyfills for IE11](#polyfills-for-ie11)
  - [Feature Detection](#feature-detection)
- [Container Size](#container-size)
  - [Fixed Size Container](#fixed-size-container)
  - [Responsive Container](#responsive-container)
  - [Percentage-Based Sizing](#percentage-based-sizing)
- [Advanced Scenarios](#advanced-scenarios)
  - [Dual Gauge Comparison](#dual-gauge-comparison)
  - [Real-Time Data Stream](#real-time-data-stream)
  - [Conditional Rendering Based on Value](#conditional-rendering-based-on-value)
  - [Gauge Gallery](#gauge-gallery)

## Animation Configuration

### Global Animation Settings

Control animation for the entire gauge:

```javascript
<ejs-lineargauge :axes="axes" :animationDuration="1500"></ejs-lineargauge>
```

### Per-Pointer Animation

```javascript
pointers: [{
  value: 65,
  type: 'Marker',
  animationDuration: 800,      // 800ms animation
  animationEasing: 'EaseOutQuad' // Animation curve
}]
```

### Animation Easing Functions

```javascript
// Linear - constant speed
animationEasing: 'Linear'

// EaseInQuad - slow start
animationEasing: 'EaseInQuad'

// EaseOutQuad - slow end
animationEasing: 'EaseOutQuad'

// EaseInOutQuad - slow start and end
animationEasing: 'EaseInOutQuad'

// EaseInCubic - accelerating
animationEasing: 'EaseInCubic'

// EaseOutCubic - decelerating
animationEasing: 'EaseOutCubic'
```

### Disable Animation for Performance

Real-time dashboards should disable animation:

```javascript
pointers: [{
  value: this.dataValue,
  type: 'Marker',
  animationDuration: 0           // No animation
}]
```

### Animated Transitions During Data Updates

```vue
<script>
export default {
  methods: {
    updateWithAnimation(newValue) {
      // Re-enable animation for this update
      this.axes[0].pointers[0].animationDuration = 500;
      
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, newValue);
      
      // Disable animation for next real-time update
      setTimeout(() => {
        this.axes[0].pointers[0].animationDuration = 0;
      }, 600);
    }
  }
};
</script>
```

## Internationalization (i18n)

### Locale Support

Linear Gauge supports multiple languages:

```javascript
// English (default)
// French
// German
// Spanish
// Chinese
// Japanese
// Arabic
// And more...
```

### Setting Locale

```javascript
import { LinearGaugeComponent } from '@syncfusion/ej2-vue-gauges';
import { loadCldrData, L10n } from '@syncfusion/ej2-base';

// Load CLDR data for the locale
import cldrData from '@syncfusion/ej2-cldr-data/main/en/numbers.json';
loadCldrData(cldrData);

// Set locale
L10n.load({
  'en': {
    'lineargauge': {
      'invalidLabel': 'Label is not valid'
    },
    'fr': {
      'lineargauge': {
        'invalidLabel': 'Le label n\'est pas valide'
      }
    }
  }
});
```

### Locale in Component

```javascript
<ejs-lineargauge :axes="axes" locale="fr"></ejs-lineargauge>
```

### Number Formatting by Locale

Numbers format automatically based on locale:

```javascript
// en-US: 1,234.56
// de-DE: 1.234,56
// fr-FR: 1 234,56
// ar-SA: ١٬٢٣٤٫٥٦
```

## Accessibility

### WCAG Compliance

Linear Gauge follows WCAG 2.1 Level AA guidelines:

```javascript
<ejs-lineargauge 
  :axes="axes" 
  role="img"
  :ariaLabel="'Temperature Gauge showing 65 degrees'"
></ejs-lineargauge>
```

### ARIA Labels

```javascript
attributes: {
  role: 'img',
  'aria-label': 'Temperature measurement gauge',
  'aria-describedby': 'gauge-description'
}
```

### Keyboard Navigation

Users can navigate gauges with:
- **Tab**: Focus pointer
- **Arrow keys**: Adjust value (if draggable)
- **Enter**: Confirm value

Enable keyboard support:

```javascript
<ejs-lineargauge 
  :axes="axes"
  :enablePointerDrag="true"
></ejs-lineargauge>
```

### Color Contrast

Ensure sufficient contrast for visibility:

```css
/* Good contrast (WCAG AA passes) */
.e-lineargauge .e-axis-label {
  color: #000000;           /* Black on */
  background-color: #FFFFFF; /* White */
}

/* Use built-in high-contrast theme */
@import '@syncfusion/ej2-vue-gauges/styles/highcontrast.css';
```

### Screen Reader Support

Gauges are announced as images with descriptions:

```javascript
<ejs-lineargauge 
  :axes="axes"
  :ariaLabel="getAriaLabel()"
></ejs-lineargauge>

methods: {
  getAriaLabel() {
    return `Linear gauge showing temperature at ${this.currentValue} degrees Celsius`;
  }
}
```

### Accessible Example

```vue
<template>
  <section aria-labelledby="gaugeTitle">
    <h2 id="gaugeTitle">Temperature Monitor</h2>
    <p id="gaugeDesc">Real-time temperature reading in Celsius</p>
    
    <ejs-lineargauge 
      :axes="axes"
      role="img"
      aria-describedby="gaugeDesc"
      :ariaLabel="ariaLabel"
    ></ejs-lineargauge>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 65,
      axes: [{ /* config */ }]
    };
  },
  computed: {
    ariaLabel() {
      return `Temperature gauge showing ${this.currentValue} degrees Celsius`;
    }
  }
};
</script>
```

## Component Methods

### Available Methods

```javascript
const gauge = document.getElementById('linearGauge').ej2_instances[0];

// Get gauge properties
const min = gauge.axes[0].minimum;
const max = gauge.axes[0].maximum;

// Set pointer value (with animation)
gauge.setPointerValue(axisIndex, pointerIndex, value);

// Get current pointer value
const value = gauge.axes[0].pointers[0].value;

// Refresh gauge
gauge.refresh();

// Export gauge
gauge.export(type, filename);

// Print gauge
gauge.print();

// Get element by ID
const element = gauge.element;
```

### setPointerValue Method

```javascript
// Syntax: setPointerValue(axisIndex, pointerIndex, value)

// Update first pointer on first axis
gauge.setPointerValue(0, 0, 75);

// Update second pointer on first axis
gauge.setPointerValue(0, 1, 50);

// Update first pointer on second axis
gauge.setPointerValue(1, 0, 60);
```

### Refresh Method

```javascript
// Redraw entire gauge
gauge.refresh();

// Useful after major configuration changes
const gauge = document.getElementById('linearGauge').ej2_instances[0];
this.axes[0].minimum = 0;
this.axes[0].maximum = 200;
gauge.refresh();
```

## Performance Optimization

### Disable Animation for High-Frequency Updates

```javascript
// Poor performance: updates with animation
setInterval(() => {
  const gauge = document.getElementById('linearGauge').ej2_instances[0];
  gauge.setPointerValue(0, 0, Math.random() * 100);  // Animates each time
}, 100);

// Good performance: disable animation
this.axes[0].pointers[0].animationDuration = 0;
setInterval(() => {
  const gauge = document.getElementById('linearGauge').ej2_instances[0];
  gauge.setPointerValue(0, 0, Math.random() * 100);  // No animation
}, 100);
```

### Batch Updates

```javascript
// Inefficient: Multiple pointer updates
gauge.setPointerValue(0, 0, 50);
gauge.setPointerValue(0, 1, 60);
gauge.setPointerValue(0, 2, 70);

// Efficient: Update axes object and refresh once
this.axes[0].pointers[0].value = 50;
this.axes[0].pointers[1].value = 60;
this.axes[0].pointers[2].value = 70;
gauge.refresh();
```

### Lazy Rendering

Create gauges only when needed:

```vue
<template>
  <div>
    <button @click="showGauge = !showGauge">Toggle Gauge</button>
    <ejs-lineargauge v-if="showGauge" :axes="axes"></ejs-lineargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showGauge: false,
      axes: [{ /* config */ }]
    };
  }
};
</script>
```

### Reduce Number of Ticks

Fewer visual elements = better performance:

```javascript
// Too many ticks (poor performance)
majorTicks: { interval: 1 }      // 100 major ticks
minorTicks: { interval: 0.1 }    // 1000 minor ticks

// Optimized
majorTicks: { interval: 20 }     // 5 major ticks
minorTicks: { interval: 5 }      // 20 minor ticks
```

## Browser Compatibility

### Supported Browsers

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Internet Explorer 11 (with polyfills)

### Polyfills for IE11

```javascript
// main.js - Before importing Syncfusion
import '@syncfusion/ej2-base/dist/ej2-base.min';
```

### Feature Detection

```javascript
// Check if browser supports SVG
const supportsSVG = () => !!document.createElementNS && 
                        !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

if (!supportsSVG()) {
  console.warn('SVG not supported - gauge may not render');
}
```

## Container Size

### Fixed Size Container

```vue
<template>
  <div class="gauge-container">
    <ejs-lineargauge :axes="axes"></ejs-lineargauge>
  </div>
</template>

<style scoped>
.gauge-container {
  width: 400px;
  height: 200px;
}
</style>
```

### Responsive Container

```vue
<template>
  <div class="responsive-gauge">
    <ejs-lineargauge :axes="axes"></ejs-lineargauge>
  </div>
</template>

<style scoped>
.responsive-gauge {
  width: 100%;
  max-width: 600px;
  height: 300px;
}

@media (max-width: 768px) {
  .responsive-gauge {
    height: 200px;
  }
}
</style>
```

### Percentage-Based Sizing

```vue
<style scoped>
.gauge-wrapper {
  width: 50%;
  height: 300px;
}
</style>
```

## Advanced Scenarios

### Dual Gauge Comparison

```vue
<template>
  <div class="gauge-comparison">
    <div class="gauge-left">
      <h3>Gauge A</h3>
      <ejs-lineargauge :axes="axesA"></ejs-lineargauge>
    </div>
    <div class="gauge-right">
      <h3>Gauge B</h3>
      <ejs-lineargauge :axes="axesB"></ejs-lineargauge>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      axesA: [{ minimum: 0, maximum: 100, pointers: [{ value: 45, type: 'Marker' }] }],
      axesB: [{ minimum: 0, maximum: 100, pointers: [{ value: 75, type: 'Marker' }] }]
    };
  }
};
</script>

<style scoped>
.gauge-comparison {
  display: flex;
  gap: 20px;
}

.gauge-left, .gauge-right {
  flex: 1;
  height: 300px;
}
</style>
```

### Real-Time Data Stream

```vue
<script>
export default {
  data() {
    return {
      currentValue: 50,
      axes: [{ minimum: 0, maximum: 100, pointers: [{ value: 50, type: 'Marker', animationDuration: 0 }] }]
    };
  },
  created() {
    // Simulate real-time data updates
    this.dataStream = setInterval(() => {
      this.currentValue = Math.random() * 100;
      const gauge = document.getElementById('realTimeGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, this.currentValue);
    }, 500);
  },
  beforeUnmount() {
    clearInterval(this.dataStream);
  }
};
</script>
```

### Conditional Rendering Based on Value

```vue
<script>
export default {
  computed: {
    pointerColor() {
      if (this.currentValue < 33) return '#4CAF50';
      if (this.currentValue < 66) return '#FFC107';
      return '#F44336';
    },
    status() {
      if (this.currentValue < 33) return 'Good';
      if (this.currentValue < 66) return 'Warning';
      return 'Critical';
    }
  },
  watch: {
    currentValue(newVal) {
      // Update color
      this.axes[0].pointers[0].color = this.pointerColor;
      
      // Update annotation
      this.axes[0].annotations[0].content = this.status;
    }
  }
};
</script>
```

### Gauge Gallery

```vue
<template>
  <div class="gauge-gallery">
    <div v-for="gauge in gauges" :key="gauge.id" class="gauge-item">
      <h4>{{ gauge.title }}</h4>
      <ejs-lineargauge :axes="gauge.axes"></ejs-lineargauge>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gauges: [
        {
          id: 1,
          title: 'Temperature',
          axes: [{ minimum: -50, maximum: 50, pointers: [{ value: 20, type: 'Marker' }] }]
        },
        {
          id: 2,
          title: 'Humidity',
          axes: [{ minimum: 0, maximum: 100, pointers: [{ value: 65, type: 'Marker' }] }]
        },
        {
          id: 3,
          title: 'Pressure',
          axes: [{ minimum: 950, maximum: 1050, pointers: [{ value: 1000, type: 'Marker' }] }]
        }
      ]
    };
  }
};
</script>

<style scoped>
.gauge-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.gauge-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  height: 350px;
}
</style>
```
