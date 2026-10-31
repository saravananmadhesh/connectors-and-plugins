# Getting Started with 3D Circular Chart

## Table of Contents
- [Installation & Dependencies](#installation--dependencies)
- [Module Registration](#module-registration)
- [Vue 2 vs Vue 3 Syntax](#vue-2-vs-vue-3-syntax)
- [First Pie Chart](#first-pie-chart)
- [Troubleshooting](#troubleshooting)

## Installation & Dependencies

### Step 1: Install the Syncfusion Charts Package

```bash
npm install @syncfusion/ej2-vue-charts
```

or with yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```

### Step 2: Verify Dependencies

The `ej2-vue-charts` package includes all required dependencies:

```
@syncfusion/ej2-vue-charts
├── @syncfusion/ej2-charts (core chart engine)
├── @syncfusion/ej2-base (base utilities)
├── @syncfusion/ej2-data (data processing)
├── @syncfusion/ej2-svg-base (SVG rendering)
├── @syncfusion/ej2-pdf-export (export support)
└── @syncfusion/ej2-vue-base (Vue integration)
```

### Step 3: Import Required Components

The minimum imports for a 3D Circular Chart are:

```javascript
import { 
  CircularChart3DComponent,           // Main chart component
  CircularChart3DSeriesCollectionDirective,  // Series container
  CircularChart3DSeriesDirective,     // Individual series
  PieSeries3D                         // Pie series type
} from '@syncfusion/ej2-vue-charts';
```

## Module Registration

### Register Components (Required)

Components must be registered with Vue before use.

**Vue 2 (Options API):**
```javascript
components: {
  'ejs-circularchart3d': CircularChart3DComponent,
  'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
  'e-circularchart3d-series': CircularChart3DSeriesDirective
}
```

**Vue 3 (Composition API - auto-registered when imported):**

Vue 3 with `<script setup>` automatically registers components when imported.

### Provide Series Module (Required)

The series module must be provided to the chart via `provide()`:

```javascript
// Vue 2
provide: {
  circularchart3d: [PieSeries3D]
}

// Vue 3
provide('circularchart3d', [PieSeries3D]);
```

**Why?** The 3D Circular Chart architecture uses dependency injection to dynamically load series types. This allows loading only needed series (Pie3D, Doughnut3D, etc.) for optimal performance.

## Vue 2 vs Vue 3 Syntax

### Minimal Pie Chart - Vue 2

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" title="Sales">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Q1', y: 45 },
        { x: 'Q2', y: 52 },
        { x: 'Q3', y: 48 },
        { x: 'Q4', y: 61 }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D]
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

### Minimal Pie Chart - Vue 3 (`<script setup>`)

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" title="Sales">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { CircularChart3DComponent as EjsCircularchart3d, CircularChart3DSeriesCollectionDirective as ECircularchart3dSeriesCollection, CircularChart3DSeriesDirective as ECircularchart3dSeries, PieSeries3D } from '@syncfusion/ej2-vue-charts';

const data = [
  { x: 'Q1', y: 45 },
  { x: 'Q2', y: 52 },
  { x: 'Q3', y: 48 },
  { x: 'Q4', y: 61 }
];

provide('circularchart3d', [PieSeries3D]);
</script>

<style>
#container { height: 350px; }
</style>
```

### Key Differences

| Aspect | Vue 2 | Vue 3 |
|--------|-------|-------|
| **Syntax** | Options API | Composition API (setup) |
| **Data** | `data()` returns object | `const` variables |
| **Provide** | `provide: {}` | `provide('key', value)` |
| **Component Registration** | Manual in `components:` | Auto via import in `<script setup>` |
| **Aliases** | Long import names | Optional shorter aliases |

## First Pie Chart

### Example: Revenue by Region

```vue
<template>
  <div id="app">
    <h2>Annual Revenue by Region</h2>
    <ejs-circularchart3d id="revenuechart" title="2024 Revenue Distribution">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          :dataSource="regionData" 
          xName="region" 
          yName="revenue"
          :dataLabel="{ visible: true }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      regionData: [
        { region: 'North America', revenue: 2500000 },
        { region: 'Europe', revenue: 1800000 },
        { region: 'Asia Pacific', revenue: 1200000 },
        { region: 'Latin America', revenue: 900000 },
        { region: 'Middle East', revenue: 600000 }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
  }
};
</script>

<style>
#revenuechart {
  height: 400px;
  margin-top: 20px;
}
</style>
```

**What this does:**
- Creates a pie chart with 5 slices (one per region)
- Displays region names and revenue values
- Shows data labels on each slice
- Renders in 3D with default perspective

## Troubleshooting

### Issue: Chart not rendering

**Symptoms:** Blank container or white space where chart should be

**Solutions:**
1. **Verify component registration** - Check that all three components are in the `components:` object
2. **Check module provision** - Ensure `PieSeries3D` is in the `provide()` 
3. **Verify container height** - CSS must set `#container { height: 350px; }` or similar
4. **Check data format** - `dataSource` must be an array of objects with `xName` and `yName` fields
5. **Inspect browser console** - Look for import errors or module loading issues

**Example fix:**
```javascript
// ❌ WRONG - Missing PieSeries3D
provide: {
  circularchart3d: []
}

// ✅ CORRECT
provide: {
  circularchart3d: [PieSeries3D]
}
```

### Issue: "Cannot find module '@syncfusion/ej2-vue-charts'"

**Solution:** Package not installed

```bash
npm install @syncfusion/ej2-vue-charts
```

After installing, restart dev server:
```bash
npm run serve  # Vue CLI
npm run dev    # Vite
```

### Issue: Data labels not showing

**Symptoms:** Chart renders but no labels visible on slices

**Solution:** Data label module must be provided

```javascript
import { CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

// Add to provide
provide: {
  circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
}

// Add to series
<e-circularchart3d-series :dataLabel="{ visible: true }"></e-circularchart3d-series>
```

### Issue: Vue version mismatch

**Problem:** You're using Vue 3 but your package expects Vue 2

**Check your Vue version:**
```bash
npm list vue
```

**For Vue 2:** Use `@syncfusion/ej2-vue-charts@^20` 
**For Vue 3:** Use latest `@syncfusion/ej2-vue-charts`

## Next Steps

- **Customize pie/donut:** See [references/pie-and-donut.md](../pie-and-donut.md)
- **Add labels & formatting:** See [references/data-labels.md](../data-labels.md)
- **Configure interactivity:** See [references/tooltips-and-interactivity.md](../tooltips-and-interactivity.md)
