# Getting Started with Range Navigator

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Install the Package](#step-1-install-the-package)
  - [Step 2: Verify Dependencies](#step-2-verify-dependencies)
- [Vue 2 Setup](#vue-2-setup)
  - [Step 1: Create Vue 2 Project](#step-1-create-vue-2-project)
  - [Step 2: Register Range Navigator](#step-2-register-range-navigator)
  - [Step 3: Add to Template](#step-3-add-to-template)
  - [Step 4: Run Development Server](#step-4-run-development-server)
- [Vue 3 Setup](#vue-3-setup)
  - [Step 1: Create Vue 3 Project](#step-1-create-vue-3-project)
    - [Using Vite (Recommended)](#using-vite-recommended)
    - [Using Vue CLI](#using-vue-cli)
  - [Step 2: Register Range Navigator (Composition API)](#step-2-register-range-navigator-composition-api)
  - [Step 3: Register Range Navigator (Options API)](#step-3-register-range-navigator-options-api)
  - [Step 4: Run Development Server](#step-4-run-development-server-1)
- [Basic Implementation](#basic-implementation)
  - [Complete Example with Data](#complete-example-with-data)
- [CSS Imports and Themes](#css-imports-and-themes)
  - [Theme Import Order (CRITICAL)](#theme-import-order-critical)
  - [Supported Themes](#supported-themes)
- [Troubleshooting](#troubleshooting)
  - [Issue: "RangeNavigatorComponent is not defined"](#issue-rangenavigatorcomponent-is-not-defined)
  - [Issue: Package Not Found](#issue-package-not-found)
  - [Issue: Vue 2 vs Vue 3 Component Declaration](#issue-vue-2-vs-vue-3-component-declaration)
  - [Issue: Styles Not Applied](#issue-styles-not-applied)
  - [Issue: Data Not Displaying](#issue-data-not-displaying)

## Prerequisites

- **Node.js:** 14.x or higher
- **npm/yarn:** Latest version
- **Vue CLI:** 4.x or higher (for Vue 2/3 project scaffolding)
- **System Requirements:** [Syncfusion Vue System Requirements](https://ej2.syncfusion.com/vue/documentation/system-requirements)

## Installation

The Range Navigator component is part of the `@syncfusion/ej2-vue-charts` package.

### Step 1: Install the Package

```bash
npm install @syncfusion/ej2-vue-charts --save
```

or with yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```

### Step 2: Verify Dependencies

The Range Navigator requires these peer dependencies (auto-installed):

```
@syncfusion/ej2-base
@syncfusion/ej2-data
@syncfusion/ej2-pdf-export
@syncfusion/ej2-file-utils
@syncfusion/ej2-compression
@syncfusion/ej2-navigations
@syncfusion/ej2-calendars
@syncfusion/ej2-vue-base
@syncfusion/ej2-svg-base
```

Verify installation:

```bash
npm list @syncfusion/ej2-vue-charts
```

## Vue 2 Setup

### Step 1: Create Vue 2 Project

```bash
vue create quickstart
cd quickstart
npm install
```

When prompted, select **"Default ([Vue 2] babel, eslint)"**

### Step 2: Register Range Navigator

In `src/App.vue`, import and register the component:

```vue
<script>
import { RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-rangenavigator': RangeNavigatorComponent,
    'e-rangenavigator-series-collection': RangenavigatorSeriesCollectionDirective,
    'e-rangenavigator-series': RangenavigatorSeriesDirective
  }
}
</script>
```

### Step 3: Add to Template

```vue
<template>
  <ejs-rangenavigator>
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series :dataSource="data" xName="x" yName="y" type="Area"></e-rangenavigator-series>
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>
```

### Step 4: Run Development Server

```bash
npm run serve
```

## Vue 3 Setup

### Step 1: Create Vue 3 Project

#### Using Vite (Recommended)

```bash
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm install @syncfusion/ej2-vue-charts
```

#### Using Vue CLI

```bash
vue create my-vue-app
cd my-vue-app
npm install @syncfusion/ej2-vue-charts
```

When prompted, select **"Vue 3"**

### Step 2: Register Range Navigator (Composition API)

In `src/App.vue` with `<script setup>`:

```vue
<script setup>
import { RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective } from '@syncfusion/ej2-vue-charts';
</script>

<template>
  <ejs-rangenavigator>
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series :dataSource="data" xName="x" yName="y" type="Area"></e-rangenavigator-series>
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>
```

### Step 3: Register Range Navigator (Options API)

For traditional Options API:

```vue
<script>
import { RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective } from '@syncfusion/ej2-vue-charts';

export default {
  name: 'App',
  components: {
    'ejs-rangenavigator': RangeNavigatorComponent,
    'e-rangenavigator-series-collection': RangenavigatorSeriesCollectionDirective,
    'e-rangenavigator-series': RangenavigatorSeriesDirective
  },
  data() {
    return {
      data: [
        { x: new Date(2023, 0, 1), y: 21 },
        { x: new Date(2023, 0, 2), y: 24 }
      ]
    };
  }
};
</script>

<template>
  <ejs-rangenavigator>
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series :dataSource="data" xName="x" yName="y" type="Area"></e-rangenavigator-series>
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>
```

### Step 4: Run Development Server

```bash
npm run dev
```

## Basic Implementation

### Complete Example with Data
```vue
<template>
<div class="app-container">
  <h3>Range Navigator Example</h3>
  
  <ejs-rangenavigator 
    :value="rangeValue"
    :height="rangeHeight"
    valueType="DateTime"
    @changed="onRangeChange"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series 
        :dataSource="data" 
        xName="date" 
        yName="value" 
        type="Area"
        :fill="'#69D2E7'"
      ></e-rangenavigator-series>
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
  
  <p v-if="rangeValue && rangeValue.length">
    Selected Range: {{ rangeValue[0].toLocaleDateString() }} to {{ rangeValue[1].toLocaleDateString() }}
  </p>
</div>
</template>

<script>
import { 
RangeNavigatorComponent, 
RangenavigatorSeriesCollectionDirective, 
RangenavigatorSeriesDirective
} from '@syncfusion/ej2-vue-charts';

export default {
name: 'App',
components: {
  'ejs-rangenavigator': RangeNavigatorComponent,
  'e-rangenavigator-series-collection': RangenavigatorSeriesCollectionDirective,
  'e-rangenavigator-series': RangenavigatorSeriesDirective
},
provide: {
  rangeNavigator: [AreaSeries, DateTime]
},
data() {
  return {
    rangeValue: [new Date(2023, 0, 1), new Date(2023, 0, 15)],
    rangeHeight: '120px',
    data: this.generateData()
  };
},
methods: {
  generateData() {
    const data = [];
    const startDate = new Date(2023, 0, 1);
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      data.push({
        date: date,
        value: Math.floor(Math.random() * 100) + 20
      });
    }
    return data;
  },
  onRangeChange(args) {
    this.rangeValue = [new Date(args.start), new Date(args.end)];
  }
}
};
</script>

<style scoped>

.app-container {
padding: 20px;
max-width: 900px;
margin: 0 auto;
}
</style>
```

```vue3
<template>
  <div class="app-container">
    <h3>Range Navigator Example</h3>
    <ejs-rangenavigator 
      :value="rangeValue"
      :height="rangeHeight"
      valueType="DateTime"
      @changed="onRangeChange" 
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          :dataSource="data" 
          xName="date" 
          yName="value" 
          type="Area"
          :fill="'#69D2E7'"
        ></e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
    
    <!-- Added fallback checks to prevent errors before the component initializes -->
    <p v-if="rangeValue && rangeValue.length === 2">
      Selected Range: {{ rangeValue[0].toLocaleDateString() }} to {{ rangeValue[1].toLocaleDateString() }}
    </p>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { 
  RangeNavigatorComponent , 
  RangenavigatorSeriesCollectionDirective ,
  RangenavigatorSeriesDirective
} from '@syncfusion/ej2-vue-charts';

// 1. Provide the required modules to the Range Navigator
provide('rangeNavigator', [AreaSeries, DateTime]);

// Generate sample data for 30 days
const generateData = () => {
  const data = [];
  const startDate = new Date(2023, 0, 1);
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date,
      value: Math.floor(Math.random() * 100) + 20
    });
  }
  return data;
};

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 15)]);
const rangeHeight = ref('100px');
const data = ref(generateData());

const onRangeChange = (args) => {
  console.log('Range changed:', {
    start: args.start,
    end: args.end
  });
  // Syncfusion provides the start/end bounds on the args object directly
  rangeValue.value = [new Date(args.start), new Date(args.end)];
};
</script>

<style scoped>
.app-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}
</style>
```

## CSS Imports and Themes

### Theme Import Order (CRITICAL)

**Always import CSS in this specific order:**

1. **Base styles** - Foundation and core styling
2. **Dependency styles** - Button, input, and other component styles
3. **Component styles** - Range Navigator specific styles

### Supported Themes

```
material      (Default Material Design)
bootstrap     (Bootstrap 4 theme)
fabric        (Microsoft Fabric Design)
tailwind      (Tailwind CSS theme)
material3     (Material Design 3)
fluent        (Microsoft Fluent Design)
bootstrap5    (Bootstrap 5 theme)
```

## Troubleshooting

### Issue: "RangeNavigatorComponent is not defined"

**Problem:** Import error or component not registered

**Solution:** Check component registration in script:
```javascript
import { RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective } from '@syncfusion/ej2-vue-charts';
```

### Issue: Package Not Found

**Problem:** npm install fails

**Solution:** Ensure you have internet connection and npm is updated:
```bash
npm update -g npm
npm install @syncfusion/ej2-vue-charts --save
```

### Issue: Vue 2 vs Vue 3 Component Declaration

**Problem:** Component doesn't render in Vue 2

**Solution:** Use proper Vue 2 registration syntax:
```javascript
export default {
  components: {
    'ejs-rangenavigator': RangeNavigatorComponent
  }
}
```

### Issue: Styles Not Applied

**Problem:** Range Navigator appears unstyled

**Solution:** Ensure the style is not scoped if needed globally. Move styles to main.js or remove `scoped` attribute:
```vue
<!-- Remove scoped if styles not applying -->
<style scoped> <!-- ← Remove 'scoped' -->
  @import "...";
</style>
```

### Issue: Data Not Displaying

**Problem:** Range Navigator renders but no data shown

**Solution:** Verify data source format and property names:
```javascript
data: [
  { date: new Date(2023, 0, 1), value: 21 },  // ← Match xName and yName
  { date: new Date(2023, 0, 2), value: 24 }
]
```

Ensure `xName="date"` and `yName="value"` match your data object properties.
