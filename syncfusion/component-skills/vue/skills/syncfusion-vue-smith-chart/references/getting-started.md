# Getting Started with Smith Chart

## Table of Contents
- [Installation](#installation)
  - [Dependency Structure](#dependency-structure)
- [Vue 2 Setup](#vue-2-setup)
  - [Step 1: Create Vue 2 Project](#step-1-create-vue-2-project)
  - [Step 2: Import and Register Component](#step-2-import-and-register-component)
  - [Step 3: Add to Template](#step-3-add-to-template)
  - [Step 4: Complete Vue 2 Example](#step-4-complete-vue-2-example)
- [Vue 3 Setup](#vue-3-setup)
  - [Step 1: Create Vue 3 Project](#step-1-create-vue-3-project)
  - [Step 2: Import and Register Component](#step-2-import-and-register-component-in-vue-3)
  - [Step 3: Vue 3 Composition API Example](#step-3-vue-3-composition-api-example)
- [Module Injection](#module-injection)
  - [Available Modules](#available-modules)
  - [Vue 2: Module Injection](#vue-2-module-injection)
  - [Vue 3: Module Injection with Composition API](#vue-3-module-injection-with-composition-api)
  - [Complete Example with All Modules](#complete-example-with-all-modules)
- [Running the Application](#running-the-application)
  - [Vue 2](#vue-2)
  - [Vue 3](#vue-3)
- [Troubleshooting](#troubleshooting)

## Installation

Smith Chart is part of the `@syncfusion/ej2-vue-charts` package. Install it along with required dependencies:

```bash
npm install @syncfusion/ej2-vue-charts --save
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```

### Dependency Structure

The Smith Chart depends on these packages:
- `@syncfusion/ej2-charts` - Core chart library
- `@syncfusion/ej2-base` - Base utilities
- `@syncfusion/ej2-data` - Data handling
- `@syncfusion/ej2-svg-base` - SVG rendering
- `@syncfusion/ej2-pdf-export`
- `@syncfusion/ej2-compression`
- `@syncfusion/ej2-file-utils`
- `@syncfusion/ej2-vue-base` - Vue base components

## Vue 2 Setup

### Step 1: Create Vue 2 Project

```bash
npm install -g @vue/cli
vue create smithchart-app
cd smithchart-app
npm run serve
```

When prompted, select the `Default ([Vue 2] babel, eslint)` option.

### Step 2: Import and Register Component

In `src/App.vue`:

```vue
<script>
import { SmithchartComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent
  }
}
</script>
```

### Step 3: Add to Template

```vue
<template>
  <div id="app">
    <ejs-smithchart id="smithchart"></ejs-smithchart>
  </div>
</template>
```

### Step 4: Complete Vue 2 Example

```vue
<template>
  <div class="control_wrapper">
    <ejs-smithchart id="smithchart" :title='title'>
      <e-seriesCollection>
        <e-series 
          :dataSource='dataSource' 
          :name='name' 
          :reactance='reactance' 
          :resistance='resistance'>
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from '@syncfusion/ej2-vue-charts';

export default {
  name: "App",
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function () {
    return {
      title: { text: 'Smith Chart - Transmission Line' },
      dataSource: [
        { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
        { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
        { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
        { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
        { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 }
      ],
      name: 'Transmission1',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

## Vue 3 Setup

### Step 1: Create Vue 3 Project

```bash
npm create vue@latest smithchart-app
cd smithchart-app
npm install
npm run dev
```

### Step 2: Import and Register Component in vue 3

In `src/App.vue` (Options API):

```vue
<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-seriesCollection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  }
}
</script>
```

### Step 3: Vue 3 Composition API Example

```vue
<template>
  <div class="control_wrapper">
    <ejs-smithchart id="smithchart" :title="title">
      <e-seriesCollection>
        <e-series 
          :dataSource="dataSource" 
          :name="name" 
          :reactance="reactance" 
          :resistance="resistance">
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SmithchartComponent as EjsSmithchart, SeriesDirective as ESeries, SeriesCollectionDirective as ESeriesCollection } from '@syncfusion/ej2-vue-charts';

const title = { text: 'Smith Chart - Transmission Line' };
const dataSource = ref([
  { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
  { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
  { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
  { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
  { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
  { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 }
]);
const name = ref('Transmission1');
const reactance = ref('reactance');
const resistance = ref('resistance');
</script>
```

## Module Injection

Smith Chart features are modular. Optional features must be imported and injected using the `provide` option.

### Available Modules

- **SmithchartLegend** - Enables legend display
- **TooltipRender** - Enables tooltip on hover

### Vue 2: Module Injection

```vue
<script>
import { SmithchartComponent, SmithchartLegend, TooltipRender } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent
  },
  provide: {
    smithchart: [SmithchartLegend, TooltipRender]
  }
}
</script>
```

### Vue 3: Module Injection with Composition API

```vue
<script setup>
import { provide } from 'vue';
import { SmithchartComponent as EjsSmithchart, SmithchartLegend, TooltipRender } from '@syncfusion/ej2-vue-charts';

const smithchart = [SmithchartLegend, TooltipRender];
provide('smithchart', smithchart);
</script>
```

### Complete Example with All Modules

```vue
<template>
  <div class="control_wrapper">
    <ejs-smithchart id="smithchart" :title='title' :legendSettings='legendSettings'>
      <e-seriesCollection>
        <e-series 
          :dataSource='dataSource' 
          :name='name' 
          :tooltip='tooltip'
          :reactance='reactance' 
          :resistance='resistance'>
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective, SmithchartLegend, TooltipRender } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-smithchart': SmithchartComponent,
    'e-series': SeriesDirective,
    'e-seriesCollection': SeriesCollectionDirective
  },
  data: function () {
    return {
      title: { text: 'Interactive Smith Chart' },
      legendSettings: { visible: true },
      tooltip: { visible: true },
      dataSource: [
        { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
        { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
        { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
        { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
        { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
        { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 }
      ],
      name: 'Transmission1',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  },
  provide: {
    smithchart: [SmithchartLegend, TooltipRender]
  }
}
</script>
```

## Running the Application

### Vue 2

```bash
npm run serve
```

Visit `http://localhost:8080` to see your Smith Chart.

### Vue 3

```bash
npm run dev
```

Visit the URL provided (typically `http://localhost:5173`).

## Troubleshooting

**Issue: Module not found error**
- Ensure `@syncfusion/ej2-vue-charts` is installed: `npm install @syncfusion/ej2-vue-charts`

**Issue: Legend/Tooltip not showing**
- Verify modules are injected in the `provide` option
- Check that respective props (legendSettings, tooltip) have `visible: true`

**Issue: Chart not rendering**
- Ensure element with id="smithchart" exists in template
- Check console for errors
- Verify data structure has `resistance` and `reactance` properties
