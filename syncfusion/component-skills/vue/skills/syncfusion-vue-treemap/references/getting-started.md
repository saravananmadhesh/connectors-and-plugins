# Getting Started with Vue TreeMap

This guide covers installation, component registration, and basic setup for the Syncfusion Vue TreeMap component.

## Table of Contents
- [Installation](#installation)
- [Package Dependencies](#package-dependencies)
- [Component Registration](#component-registration)
- [Basic Rendering](#basic-rendering)
- [CSS Imports](#css-imports)
- [Module Injection](#module-injection)
- [Running Your Application](#running-your-application)

## Installation

Install the TreeMap package using npm or yarn:

```bash
npm install @syncfusion/ej2-vue-treemap --save
```

or

```bash
yarn add @syncfusion/ej2-vue-treemap
```

## Package Dependencies

The TreeMap component requires these minimum dependencies to function:

```
@syncfusion/ej2-treemap
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-pdf-export
├── @syncfusion/ej2-file-utils
├── @syncfusion/ej2-compression
└── @syncfusion/ej2-svg-base
```

These are installed automatically when you install `@syncfusion/ej2-vue-treemap`. No additional setup is required.

## Component Registration

### Vue 3 with Composition API (Setup Script)

```vue
<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = [
    { State: "USA", GDP: 17946 },
    { State: "China", GDP: 10866 }
];

const weightValuePath = 'GDP';
const leafItemSettings = {
    labelPath: 'State'
};
</script>

<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource' 
            :weightValuePath='weightValuePath'
            :leafItemSettings='leafItemSettings'>
        </ejs-treemap>
    </div>
</template>
```

### Vue 3 with Options API

```vue
<script>
import { TreeMapComponent } from "@syncfusion/ej2-vue-treemap";

export default {
    name: "App",
    components: {
        'ejs-treemap': TreeMapComponent
    },
    data() {
        return {
            dataSource: [
                { State: "USA", GDP: 17946 },
                { State: "China", GDP: 10866 }
            ],
            weightValuePath: 'GDP',
            leafItemSettings: {
                labelPath: 'State'
            }
        };
    }
}
</script>

<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource' 
            :weightValuePath='weightValuePath'
            :leafItemSettings='leafItemSettings'>
        </ejs-treemap>
    </div>
</template>
```

### Vue 2 Options API

```vue
<script>
import { TreeMapComponent } from "@syncfusion/ej2-vue-treemap";

export default {
    name: "App",
    components: {
        'ejs-treemap': TreeMapComponent
    },
    data() {
        return {
            dataSource: [
                { State: "USA", GDP: 17946 },
                { State: "China", GDP: 10866 }
            ],
            weightValuePath: 'GDP',
            leafItemSettings: {
                labelPath: 'State'
            }
        };
    }
}
</script>

<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource' 
            :weightValuePath='weightValuePath'
            :leafItemSettings='leafItemSettings'>
        </ejs-treemap>
    </div>
</template>
```

## Basic Rendering

To render a basic TreeMap, you need:

1. **dataSource** - Array of data objects
2. **weightValuePath** - Property name for sizing rectangles
3. **leafItemSettings** - Configuration for leaf items

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            id="treemap"
            :height='height'
            :dataSource='dataSource' 
            :weightValuePath='weightValuePath'
            :leafItemSettings='leafItemSettings'>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const height = '350px';
const dataSource = [
    { Title: 'State wise International Airport count', State: "Brazil", Count: 25 },
    { Title: 'State wise International Airport count', State: "Colombia", Count: 12 },
    { Title: 'State wise International Airport count', State: "Argentina", Count: 9 },
    { Title: 'State wise International Airport count', State: "Ecuador", Count: 7 },
    { Title: 'State wise International Airport count', State: "Chile", Count: 6 },
    { Title: 'State wise International Airport count', State: "Peru", Count: 3 },
];

const weightValuePath = 'Count';
const leafItemSettings = {
    labelPath: 'State'
};
</script>
```

This renders rectangles sized proportionally by the `Count` value and labeled with the `State` name.

## CSS Imports

Include Syncfusion CSS styles in your main app file or component:

### Theme Options

Replace `material.css` with your preferred theme:

- `bootstrap.css` - Bootstrap theme
- `bootstrap4.css` - Bootstrap 4 theme
- `fabric.css` - Fabric theme
- `highcontrast.css` - High contrast theme
- `tailwind.css` - Tailwind theme

## Module Injection

For basic TreeMap rendering with just labels and sizing, no module injection is required. However, advanced features require explicit module injection using the `provide` option:

### Required Modules for Features

```vue
<script setup>
import { TreeMapComponent, TreeMapLegend, TreeMapSelection, TreeMapHighlight, TreeMapTooltip } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

// Only inject modules you actually use
provide('treemap', [TreeMapLegend, TreeMapSelection, TreeMapHighlight, TreeMapTooltip]);
</script>
```

| Module | Feature | When Needed |
|--------|---------|------------|
| `TreeMapLegend` | Display legend for color mapping | When using `legendSettings` |
| `TreeMapSelection` | Enable item selection | When using `selectionSettings` with `enable: true` |
| `TreeMapHighlight` | Highlight on hover | When using `highlightSettings` |
| `TreeMapTooltip` | Show tooltips on hover | When using `tooltipSettings` |

### Module Injection in Vue 2 (Options API)

```vue
<script>
import { TreeMapComponent, TreeMapLegend } from "@syncfusion/ej2-vue-treemap";

export default {
    components: { 'ejs-treemap': TreeMapComponent },
    data() { return { /* ... */ }; },
    provide: {
        treemap: [TreeMapLegend]
    }
}
</script>
```

## Running Your Application

### Vue 2 Project Setup

Generate a Vue 2 project using Vue-CLI:

```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```

Choose `Default ([Vue 2] babel, eslint)` when prompted.

### Vue 3 Project Setup with Vite

```bash
npm create vite@latest my-treemap-app -- --template vue
cd my-treemap-app
npm install @syncfusion/ej2-vue-treemap
npm run dev
```

### Development Server

Once installed and configured:

```bash
npm run serve    # Vue 2
npm run dev      # Vue 3/Vite
```

The application runs on `http://localhost:8080` (Vue 2) or `http://localhost:5173` (Vite).

## Common Startup Issues

**Issue:** TreeMap renders but labels don't show
- **Solution:** Ensure `leafItemSettings.labelPath` matches a field name in your data

**Issue:** Component not found error
- **Solution:** Verify component import and registration (Vue 3 setup script vs Vue 2 options)

**Issue:** Styling looks wrong or incomplete
- **Solution:** Check CSS imports - must include both `@syncfusion/ej2-base` and `@syncfusion/ej2-treemap` styles

**Issue:** Advanced features (legend, selection) not working
- **Solution:** Inject required modules with `provide()` for the specific features you use

## Next Steps

- For data setup, read the data-binding reference
- For colors and styling, read the color-mapping reference
- For hierarchies, read the levels-and-layout reference
