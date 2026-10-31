# Customization and Styling

## Table of Contents

- [Color Palettes](#color-palettes)
  - [Custom Color Palette](#custom-color-palette)
  - [Per-Series Colors](#per-series-colors)
  - [Preset Palettes](#preset-palettes)
- [Predefined Themes](#predefined-themes)
  - [Available Themes](#available-themes)
  - [Switching Themes Dynamically](#switching-themes-dynamically)
- [CSS Customization](#css-customization)
  - [Chart Container Styling](#chart-container-styling)
  - [Chart Background](#chart-background)
  - [Series Border and Corner Radius](#series-border-and-corner-radius)
- [Font and Text Styling](#font-and-text-styling)
  - [Title Styling](#title-styling)
  - [Axis Label Styling](#axis-label-styling)
  - [Series Name Styling](#series-name-styling)
- [Chart Sizing and Responsive Behavior](#chart-sizing-and-responsive-behavior)
  - [Fixed Size](#fixed-size)
  - [Responsive Size (Fill Container)](#responsive-size-fill-container)
  - [Mobile Responsive](#mobile-responsive)
- [Gradient Fills and Border Styling](#gradient-fills-and-border-styling)
  - [Gradient Fill for Series](#gradient-fill-for-series)
  - [Gradient Types](#gradient-types)
  - [Border Styling for Series](#border-styling-for-series)
  - [Chart Area Border](#chart-area-border)
- [Advanced CSS Customization](#advanced-css-customization)
  - [CSS Variables (Theme Variables)](#css-variables-theme-variables)
  - [Axis Line Styling](#axis-line-styling)
  - [Multi-Level Axis Labels](#multi-level-axis-labels)
  - [Margin and Padding](#margin-and-padding)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Dark Theme Chart](#pattern-1-dark-theme-chart)
  - [Pattern 2: Corporate Blue Theme](#pattern-2-corporate-blue-theme)
  - [Pattern 3: Full Responsive Dashboard](#pattern-3-full-responsive-dashboard)
- [Next Steps](#next-steps)

---

## Color Palettes

### Custom Color Palette

Define custom colors for series:

```vue
<template>
  <ejs-chart :palettes="customPalette">
    <e-series-collection>
      <e-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales">
      </e-series>
      <e-series :dataSource="data" type="Column" xName="month" yName="profit" name="Profit">
      </e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup>
const customPalette = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
</script>
```

Each color in the array is applied to series in order. If you have more series than colors, colors repeat.

### Per-Series Colors

Override palette for specific series:

```vue
<e-series :dataSource="data" type="Column" xName="month" yName="sales" 
          fill="#FF6B6B" name="Sales">
</e-series>
```

### Preset Palettes

```vue
// Material Palette (default)
const palettes = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

// Tailwind Palette
const palettes = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

// Bootstrap Palette
const palettes = ['#0D6EFD', '#6C757D', '#198754', '#FFC107', '#DC3545'];
```

---

## Predefined Themes

Syncfusion includes predefined themes for quick styling:

### Available Themes

- `material.css` - Google Material Design
- `bootstrap5.css` - Bootstrap 5
- `bootstrap4.css` - Bootstrap 4
- `bootstrap.css` - Bootstrap 3
- `fabric.css` - Fabric Design
- `highcontrast.css` - High Contrast
- `fluent.css` - Microsoft Fluent
- `material-dark.css` - Material Dark
- `tailwind.css` - Tailwind CSS
- `tailwind-dark.css` - Tailwind Dark

### Switching Themes Dynamically

```vue
<template>
  <select v-model="selectedTheme" @change="changeTheme">
    <option value="material">Material</option>
    <option value="bootstrap5">Bootstrap 5</option>
    <option value="tailwind">Tailwind</option>
  </select>
  
  <ejs-chart :theme="selectedTheme">
    <!-- series -->
  </ejs-chart>
</template>

<script setup>
import { ref } from "vue";

const selectedTheme = ref("material");
</script>
```

---

## CSS Customization

### Chart Container Styling

```vue
<template>
  <div class="chart-wrapper">
    <ejs-chart id="container">
      <!-- series -->
    </ejs-chart>
  </div>
</template>

<style scoped>
.chart-wrapper {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#container {
  height: 400px;
  background: white;
  border-radius: 4px;
}
</style>
```

### Chart Background

```vue
const chartArea = {
  background: 'rgba(255, 255, 255, 0.9)',
  border: {
    color: '#ddd',
    width: 1,
  },
};

// Use in chart component
<ejs-chart :chartArea="chartArea">
```

### Series Border and Corner Radius

```vue
<e-series :dataSource="data" type="Column" xName="month" yName="sales" 
          :cornerRadius="{ bottomLeft: 5, bottomRight: 5, topLeft: 5, topRight: 5 }">
</e-series>
```

---

## Font and Text Styling

### Title Styling

```vue
const titleStyle = {
  fontFamily: 'Arial',
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
};

// Use in chart
<ejs-chart :title="Sales Overview" :titleStyle="titleStyle">
```

### Axis Label Styling

```vue
const xAxis = {
  valueType: 'Category',
  labelStyle: {
    fontFamily: 'Verdana',
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
};

const yAxis = {
  valueType: 'Double',
  labelStyle: {
    fontFamily: 'Courier New',
    fontSize: 11,
    color: '#888',
  },
};
```

### Series Name Styling

```vue
const legendSettings = {
  textStyle: {
    fontFamily: 'Georgia',
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
  },
};
```

---

## Chart Sizing and Responsive Behavior

### Fixed Size

```vue
<template>
  <ejs-chart id="container" width="800px" height="400px">
    <!-- series -->
  </ejs-chart>
</template>

<style>
#container {
  width: 800px;
  height: 400px;
}
</style>
```

### Responsive Size (Fill Container)

```vue
<template>
  <div class="chart-container">
    <ejs-chart id="container" width="100%" height="100%">
      <!-- series -->
    </ejs-chart>
  </div>
</template>

<style>
.chart-container {
  width: 100%;
  height: 500px;
  /* Chart will scale with container */
}

#container {
  width: 100%;
  height: 100%;
}
</style>
```

### Mobile Responsive

```vue
<template>
  <div class="chart-wrapper">
    <ejs-chart id="container" :width="chartWidth" :height="chartHeight">
      <!-- series -->
    </ejs-chart>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const chartWidth = ref("100%");
const chartHeight = ref("400px");

const handleResize = () => {
  if (window.innerWidth < 768) {
    chartHeight.value = "300px";  // Smaller height on mobile
  } else {
    chartHeight.value = "400px";  // Normal height on desktop
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style>
.chart-wrapper {
  width: 100%;
}
</style>
```

---

## Gradient Fills and Border Styling

### Gradient Fill for Series

```vue
<e-series :dataSource="data" type="Column" xName="month" yName="sales"
          :fill="gradientFill" name="Sales">
</e-series>

<script setup>
const gradientFill = {
  type: 'Linear',
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 100,
  stops: [
    { color: '#FF6B6B', offset: '0%' },
    { color: '#FFE5E5', offset: '100%' },
  ],
};
</script>
```

**Gradient Types:**
- `Linear` - Linear gradient
- `Radial` - Radial gradient

### Border Styling for Series

```vue
<e-series :dataSource="data" type="Column" xName="month" yName="sales"
          :border="{ color: '#333', width: 2 }">
</e-series>
```

### Chart Area Border

```vue
const chartArea = {
  background: '#f9f9f9',
  border: {
    color: '#e0e0e0',
    width: 2,
    dashArray: '5,5',  // Dashed border
  },
};
```

---

## Advanced CSS Customization

### CSS Variables (Theme Variables)

Override default colors:

```css
/* In your CSS file */
:root {
  --chart-primary: #FF6B6B;
  --chart-secondary: #4ECDC4;
  --chart-text: #333;
  --chart-border: #ddd;
}
```

### Axis Line Styling

```vue
const xAxis = {
  valueType: 'Category',
  lineStyle: {
    width: 2,
    color: '#666',
    dashArray: '5,5',
  },
  majorGridLines: {
    width: 1,
    color: '#e0e0e0',
    dashArray: '2,2',
  },
  majorTickLines: {
    width: 2,
    color: '#333',
  },
};
```

### Multi-Level Axis Labels

```vue
const xAxis = {
  valueType: 'Category',
  multiLevelLabels: [
    {
      start: 0,
      end: 2,
      text: 'Q1',
      border: { type: 'Rectangle', width: 2, color: 'red' },
    },
    {
      start: 3,
      end: 5,
      text: 'Q2',
      border: { type: 'Rectangle', width: 2, color: 'green' },
    },
  ],
};
```

### Margin and Padding

```vue
const margin = {
  left: 30,
  right: 20,
  top: 20,
  bottom: 50,
};

// Use in chart
<ejs-chart :margin="margin">
```

---

## Common Patterns

### Pattern 1: Dark Theme Chart

```vue
const darkTheme = {
  palettes: ['#FFD700', '#FF6B6B', '#4ECDC4'],
  chartArea: {
    background: '#1e1e1e',
  },
  titleStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  xAxis: {
    labelStyle: { color: '#ccc' },
  },
  yAxis: {
    labelStyle: { color: '#ccc' },
  },
};
```

### Pattern 2: Corporate Blue Theme

```vue
const corporateTheme = {
  palettes: ['#0051BA', '#5B7DBA', '#9BA3BB'],
  chartArea: {
    background: '#f8f9fa',
  },
  titleStyle: {
    color: '#0051BA',
    fontSize: 18,
    fontWeight: 'bold',
  },
};
```

### Pattern 3: Full Responsive Dashboard

```vue
<template>
  <div class="dashboard">
    <ejs-chart :width="chartWidth" :height="chartHeight" :palettes="palettes">
      <!-- series -->
    </ejs-chart>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const chartWidth = ref("100%");
const chartHeight = ref("400px");
const palettes = ['#3B82F6', '#EF4444', '#10B981'];

const updateSize = () => {
  const width = window.innerWidth;
  chartHeight.value = width < 768 ? "300px" : "400px";
};

onMounted(() => {
  window.addEventListener("resize", updateSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
}
</style>
```

## Next Steps

- Add interactivity: [Interactions and Events](../interactions-and-events.md)
- Handle events: [Interactions and Events](../interactions-and-events.md)
- Export and save: [Export and Data Management](../export-and-data-management.md)
