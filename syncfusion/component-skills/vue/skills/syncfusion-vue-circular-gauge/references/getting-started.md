# Getting Started with Circular Gauge

## Table of Contents
- [Installation and Dependencies](#installation-and-dependencies)
  - [Required Dependencies](#required-dependencies)
  - [Installation Command](#installation-command)
- [Vue 2 Setup](#vue-2-setup)
  - [Step 1: Generate Vue 2 Project](#step-1-generate-vue-2-project)
  - [Step 2: Import and Register](#step-2-import-and-register)
  - [Step 3: Add Component to Template](#step-3-add-component-to-template)
  - [Step 4: Add Styling](#step-4-add-styling)
  - [Step 5: Import CSS Theme](#step-5-import-css-theme)
- [Vue 3 Setup](#vue-3-setup)
  - [Step 1: Generate Vue 3 Project](#step-1-generate-vue-3-project)
  - [Step 2: Import and Register](#step-2-import-and-register-1)
  - [Step 3: Add Component to Template](#step-3-add-component-to-template-1)
  - [Step 4: Add Styling](#step-4-add-styling-1)
  - [Step 5: Import CSS Theme](#step-5-import-css-theme-1)
- [CSS Themes](#css-themes)
  - [Available Themes](#available-themes)
  - [Import Theme](#import-theme)
- [Basic Implementation](#basic-implementation)
  - [Minimal Component](#minimal-component)
  - [Key Initialization Properties](#key-initialization-properties)
- [First Working Example](#first-working-example)
  - [What This Example Does](#what-this-example-does)
  - [Running the Example](#running-the-example)

## Installation and Dependencies

The Circular Gauge component requires the `@syncfusion/ej2-vue-circulargauge` package and its dependencies.

### Required Dependencies

The package includes the following dependencies:
- `@syncfusion/ej2-base` - Base utilities
- `@syncfusion/ej2-buttons` - Button controls
- `@syncfusion/ej2-popups` - Popup utilities
- `@syncfusion/ej2-svg-base` - SVG rendering base
- `@syncfusion/ej2-circulargauge` - Core gauge library
- `@syncfusion/ej2-vue-base` - Vue integration layer

You don't need to install these separately as they're included as peer dependencies.

### Installation Command

```bash
npm install @syncfusion/ej2-vue-circulargauge --save
```

Or using Yarn:

```bash
yarn add @syncfusion/ej2-vue-circulargauge
```

This installs the Vue component wrapper and all required dependencies.

## Vue 2 Setup

Vue 2 projects use the class-based component pattern with `CircularGaugeComponent`.

### Step 1: Generate Vue 2 Project

Create a new Vue 2 project using Vue CLI:

```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```

Choose "Default ([Vue 2] babel, eslint)" when prompted.

### Step 2: Import and Register

In `src/App.vue`, import the component and register it:

```vue
<script>
import { CircularGaugeComponent } from '@syncfusion/ej2-vue-circulargauge';

export default {
  components: {
    'ejs-circulargauge': CircularGaugeComponent
  }
}
</script>
```

### Step 3: Add Component to Template

In the `template` section:

```vue
<template>
  <div id="app">
    <div class='wrapper'>
      <ejs-circulargauge id="container"></ejs-circulargauge>
    </div>
  </div>
</template>
```

### Step 4: Add Styling

In the `style` section:

```vue
<style>
#container {
  height: 450px;
  width: 100%;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### Step 5: Import CSS Theme

In `src/main.js`:

```javascript
import Vue from 'vue'
import App from './App.vue'

// Import Circular Gauge CSS
import '@syncfusion/ej2-vue-circulargauge/styles/material.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

## Vue 3 Setup

Vue 3 projects use the composition API and updated imports.

### Step 1: Generate Vue 3 Project

```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```

Choose Vue 3 when prompted.

### Step 2: Import and Register

In `src/App.vue`:

```vue
<script>
import { CircularGaugeComponent } from '@syncfusion/ej2-vue-circulargauge';

export default {
  components: {
    'ejs-circulargauge': CircularGaugeComponent
  }
}
</script>
```

### Step 3: Add Component to Template

```vue
<template>
  <div id="app">
    <div class='wrapper'>
      <ejs-circulargauge id="container"></ejs-circulargauge>
    </div>
  </div>
</template>
```

### Step 4: Add Styling

```vue
<style scoped>
#container {
  height: 450px;
  width: 100%;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### Step 5: Import CSS Theme

In `src/main.js`:

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// Import Circular Gauge CSS
import '@syncfusion/ej2-vue-circulargauge/styles/material.css'

createApp(App).mount('#app')
```

## CSS Themes

Syncfusion provides multiple built-in themes. Import one in your main.js or component:

### Available Themes

- `material.css` - Material Design theme (default)
- `bootstrap.css` - Bootstrap-inspired theme
- `bootstrap4.css` - Bootstrap 4 theme
- `bootstrap5.css` - Bootstrap 5 theme
- `fluent.css` - Fluent Design theme
- `tailwind.css` - Tailwind CSS theme
- `highcontrast.css` - High contrast for accessibility

### Import Theme

```javascript
// Material theme (most common)
import '@syncfusion/ej2-vue-circulargauge/styles/material.css'

// Or use Bootstrap theme
import '@syncfusion/ej2-vue-circulargauge/styles/bootstrap.css'

// Or use Fluent theme
import '@syncfusion/ej2-vue-circulargauge/styles/fluent.css'
```

**Note:** Only import one theme to avoid style conflicts.

## Basic Implementation

A minimal Circular Gauge requires:
1. Component import and registration
2. Axes configuration (defines the gauge structure)
3. CSS import for styling

### Minimal Component

```vue
<template>
  <ejs-circulargauge :axes="axes"></ejs-circulargauge>
</template>

<script>
import { CircularGaugeComponent } from '@syncfusion/ej2-vue-circulargauge';

export default {
  components: {
    'ejs-circulargauge': CircularGaugeComponent
  },
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100
      }]
    };
  }
}
</script>
```

### Key Initialization Properties

- **axes**: Array of axis objects (required for rendering)
- **id**: Unique identifier for the DOM element
- **width**: Gauge width (default: auto)
- **height**: Gauge height (default: auto)
- **title**: Gauge title text
- **subtitle**: Subtitle text
- **enableAnimation**: Enable smooth animations
- **tooltipSettings**: Tooltip configuration

## First Working Example

Here's a complete working example that creates a functional gauge with ranges and a pointer:

```vue
<template>
  <div id="app">
    <h1>Circular Gauge Example</h1>
    <ejs-circulargauge 
      id="container" 
      :axes="axes"
      :enableAnimation="true"
      title="Speed Gauge"
      subtitle="km/h"
    ></ejs-circulargauge>
  </div>
</template>

<script>
import { CircularGaugeComponent } from '@syncfusion/ej2-vue-circulargauge';

export default {
  components: {
    'ejs-circulargauge': CircularGaugeComponent
  },
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 200,
        startAngle: 0,
        endAngle: 360,
        
        // Define value ranges with colors
        ranges: [
          {
            start: 0,
            end: 50,
            color: '#3FB9E3',
            startWidth: 15,
            endWidth: 25
          },
          {
            start: 50,
            end: 120,
            color: '#33E9F6',
            startWidth: 15,
            endWidth: 25
          },
          {
            start: 120,
            end: 200,
            color: '#E74C3C',
            startWidth: 15,
            endWidth: 25
          }
        ],
        
        // Add pointer to display value
        pointers: [
          {
            value: 120,
            radius: '60%',
            pointerWidth: 8,
            color: '#F8F8F8',
            needleStartWidth: 4,
            needleEndWidth: 8,
            needleColor: '#000000',
            animation: {
              enable: true,
              duration: 500
            }
          }
        ],
        
        // Configure axis labels
        labelPosition: 'Outside',
        majorTicks: {
          interval: 20,
          height: 10
        },
        minorTicks: {
          interval: 5,
          height: 5
        }
      }]
    };
  }
}
</script>

<style scoped>
#app {
  text-align: center;
  padding: 20px;
}

#container {
  height: 450px;
  width: 100%;
  margin-top: 20px;
}
</style>
```

### What This Example Does

1. **Creates a gauge** with 0-200 km/h range
2. **Defines three ranges**:
   - 0-50 (blue) - Slow
   - 50-120 (cyan) - Normal
   - 120-200 (red) - Fast
3. **Adds a pointer** set to 120 km/h with animation
4. **Configures labels** with major and minor ticks every 20 and 5 km/h
5. **Displays title and subtitle** for context

### Running the Example

1. Replace the contents of `src/App.vue` with the example above
2. Ensure themes are imported in `src/main.js`
3. Run `npm run serve`
4. Navigate to `http://localhost:8080`

The gauge will render with animated transitions and display a speed indicator at 120 km/h.

