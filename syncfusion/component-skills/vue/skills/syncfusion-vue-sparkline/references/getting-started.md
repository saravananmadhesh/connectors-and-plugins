# Getting Started with Vue Sparkline

## Table of Contents
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install Required Packages](#install-required-packages)
  - [Package Dependencies](#package-dependencies)
- [Project Setup](#project-setup)
  - [Create Vue 2 Project with Vue-CLI](#create-vue-2-project-with-vue-cli)
  - [Project Structure](#project-structure)
- [Component Registration](#component-registration)
  - [Import and Register in App.vue](#import-and-register-in-appvue)
- [Basic Rendering](#basic-rendering)
  - [Minimal Sparkline](#minimal-sparkline)
  - [Basic Sparkline with Type](#basic-sparkline-with-type)
- [Data Binding](#data-binding)
  - [Bind Simple Array Data](#bind-simple-array-data)
  - [Bind Object Array Data](#bind-object-array-data)
  - [Bind Category Data](#bind-category-data)
- [Sizing Configuration](#sizing-configuration)
  - [Set Explicit Dimensions](#set-explicit-dimensions)
  - [Responsive Sizing](#responsive-sizing)
  - [Multiple Sparklines with Consistent Sizing](#multipletion](#dynamic-module-injection)
- [Complete Working Example](#complete-working-example)
- [Common Setup Issues](#common-setup-issues)
  - [Issue: Component Not Rendering](#issue-component-not-rendering)
  - [Issue: No Data Displayed](#issue-no-data-displayed)
  - [Issue: "Module not found" Error](#issue-module-not-found-error)
  - [Issue: Data Doesn't Update Dynamically](#issue-data-doesnt-update-dynamically)
- [Next Steps](#next-steps)
---

## Installation

### Prerequisites

Ensure your system meets Syncfusion Vue requirements:
- Node.js (latest LTS version)
- npm or yarn package manager
- Vue CLI for project scaffolding

### Install Required Packages

Install the Sparkline component package:

```bash
npm install @syncfusion/ej2-vue-charts --save
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```

### Package Dependencies

The `@syncfusion/ej2-vue-charts` package includes:

```
@syncfusion/ej2-vue-charts
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-pdf-export
├── @syncfusion/ej2-file-utils
├── @syncfusion/ej2-compression
├── @syncfusion/ej2-svg-base
├── @syncfusion/ej2-sparkline
└── @syncfusion/ej2-vue-base
```

These dependencies are automatically resolved with the package installation.

---

## Project Setup

### Create Vue 2 Project with Vue-CLI

1. **Install Vue CLI globally:**

```bash
npm install -g @vue/cli
```

2. **Create a new project:**

```bash
vue create sparkline-project
cd sparkline-project
```

3. **Select default options:**
   - When prompted, choose `Default ([Vue 2] babel, eslint)`

4. **Start development server:**

```bash
npm run serve
```

The project runs on `http://localhost:8080` by default.

### Project Structure

```
sparkline-project/
├── src/
│   ├── App.vue          (main component)
│   ├── main.js
│   └── components/
├── package.json
└── README.md
```

---

## Component Registration

### Import and Register in App.vue

Add the Sparkline component to your main app:

```vue
<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  }
}
</script>
```

## Basic Rendering

### Minimal Sparkline

Create an empty sparkline without data:

```vue
<template>
  <div id="app">
    <ejs-sparkline id="sparkline"></ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  }
}
</script>

<style>
#sparkline {
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
```

### Basic Sparkline with Type

Specify the sparkline type:

```vue
<template>
  <div>
    <ejs-sparkline id="sparkline" type="Line"></ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  }
}
</script>
```

---

## Data Binding

### Bind Simple Array Data

Sparkline accepts simple numeric arrays:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='simpleData'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '100px',
      width: '70%',
      simpleData: [5, 3, 4, 6, 8, 7, 9, 1, 3, 5]
    }
  }
}
</script>
```

### Bind Object Array Data

Use objects with xName and yName properties:

```vue
<template>
    <div class="control_wrapper">
    <div>
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '100px',
    width: '70%',
    dataSource: [
            { x: 0, xval: '2005', yval: 20090440 },
            { x: 1, xval: '2006', yval: 20264080 },
            { x: 2, xval: '2007', yval: 20434180 },
            { x: 3, xval: '2008', yval: 21007310 },
            { x: 4, xval: '2009', yval: 21262640 },
            { x: 5, xval: '2010', yval: 21515750 },
            { x: 6, xval: '2011', yval: 21766710 },
            { x: 7, xval: '2012', yval: 22015580 },
            { x: 8, xval: '2013', yval: 22262500 },
            { x: 9, xval: '2014', yval: 22507620 },
        ]
    }
  }
}
</script>
<style>
.spark {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    width: 100%;
    height: 100%;
}
</style>
```

### Bind Category Data

Use category values (strings) for X-axis:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :height='height' :type='type' :valueType='valueType' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '150px',
    width: '130px',
    // Assign the 'Column' as type of the sparkline
    type:'Column',
    // Assign the  "Category" as value type of the sparkline
    valueType: 'Category',
    dataSource: [
            { x: 0, xval: 'Robert', yval: 60 },
            { x: 1, xval: 'Andrew', yval: 65 },
            { x: 2, xval: 'Suyama', yval: 70 },
            { x: 3, xval: 'Michael', yval: 80 },
            { x: 4, xval: 'Janet', yval: 55 },
            { x: 5, xval: 'Davolio', yval: 90 },
            { x: 6, xval: 'Fuller', yval: 75 },
            { x: 7, xval: 'Nancy', yval: 85 }
        ]
    }
  }
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

---

## Sizing Configuration

### Set Explicit Dimensions

Define height and width in pixels:

```vue
<ejs-sparkline 
  :dataSource='data'
  height='150px'
  width='300px'>
</ejs-sparkline>
```

### Responsive Sizing

Use percentage width for fluid layouts:

```vue
<ejs-sparkline 
  :dataSource='data'
  height='100px'
  width='100%'>
</ejs-sparkline>
```

### Multiple Sparklines with Consistent Sizing

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline1"
      :dataSource='data1'
      :height='sparklineHeight'
      :width='sparklineWidth'>
    </ejs-sparkline>
    
    <ejs-sparkline 
      id="sparkline2"
      :dataSource='data2'
      :height='sparklineHeight'
      :width='sparklineWidth'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      sparklineHeight: '80px',
      sparklineWidth: '200px',
      data1: [3, 6, 4, 1, 3, 2, 5],
      data2: [2, 4, 3, 5, 1, 4, 3]
    }
  }
}
</script>
```

---

## Module Injection

### Basic Module Injection Pattern

Inject required modules for advanced features:

```vue
<template>
    <div class="control_wrapper">
    <div>
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :type='type' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '100px',
    width: '70%',
    dataSource: [
            { x: 0, xval: '2005', yval: 20090440 },
            { x: 1, xval: '2006', yval: 20264080 },
            { x: 2, xval: '2007', yval: 20434180 },
            { x: 3, xval: '2008', yval: 21007310 },
            { x: 4, xval: '2009', yval: 21262640 },
            { x: 5, xval: '2010', yval: 21515750 },
            { x: 6, xval: '2011', yval: 21766710 },
            { x: 7, xval: '2012', yval: 22015580 },
            { x: 8, xval: '2013', yval: 22262500 },
            { x: 9, xval: '2014', yval: 22507620 },
        ],
    // Assign the 'area' as type of Sparkline
    type:'Area',
     // To enable the tooltip for Sparkline
    tooltipSettings: {
        visible: true,
        format: '${xval} : ${yval}'
    }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
}
}
</script>
<style>
.spark {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    width: 100%;
    height: 100%;
}
</style>
```

### Verify Injection Success

Check browser console for any module-related errors. If modules aren't injected, interactive features won't work.

### Dynamic Module Injection

Load modules conditionally based on user settings:

```vue
<template>
    <div class="control_wrapper">
    <div>
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource'  :tooltipSettings='tooltipSettings' ></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import { SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      enableTooltip: true,
      dataSource: [5, 3, 4, 6, 8, 7, 9, 1]
    }
  },
  provide: function() {
    return {
      sparkline: this.enableTooltip ? [SparklineTooltip] : []
    }
  }
}
</script>
```

---

## Complete Working Example

Full component combining all concepts:

```vue
<template>
  <div class="sparkline-container">
    <h2>Sales Trend Sparkline</h2>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='salesData'
      xName='year'
      yName='sales'
      type='Line'
      fill='#007bff'
      height='120px'
      width='400px'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  name: 'SparklineGettingStarted',
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      salesData: [
        { year: '2018', sales: 25000 },
        { year: '2019', sales: 32000 },
        { year: '2020', sales: 28000 },
        { year: '2021', sales: 35000 },
        { year: '2022', sales: 42000 }
      ]
    }
  }
}
</script>

<style scoped>
.sparkline-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

---

## Common Setup Issues

### Issue: Component Not Rendering
- **Solution:** Verify package is installed (`npm install @syncfusion/ej2-vue-charts`)
- Check component registration in script section
- Ensure `<ejs-sparkline>` tag is used, not `<sparkline>`

### Issue: No Data Displayed
- **Solution:** Verify `dataSource` is array with valid data
- Check `xName` and `yName` match object property names
- Ensure `valueType='Category'` if using category data

### Issue: "Module not found" Error
- **Solution:** Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check package.json for correct version: `@syncfusion/ej2-vue-charts`

### Issue: Data Doesn't Update Dynamically
- **Solution:** Ensure dataSource is a Vue reactive property (in `data()`)
- For array mutations, use Vue methods like `.push()`, `.splice()` or reassign array
- Avoid direct index assignment (use `Vue.set()` instead)

---

## Next Steps

After getting the basic sparkline working:
1. Explore different chart types in sparkline-types.md
2. Add interactivity with tooltips (see user-interaction.md)
3. Customize appearance and styling (see appearance-and-styling.md)
4. Configure real-time data updates for dashboards
5. Implement accessibility features for production apps
