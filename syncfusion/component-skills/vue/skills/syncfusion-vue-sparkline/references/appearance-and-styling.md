# Appearance and Styling

## Table of Contents
- [Overview](#overview)
- [Border and Container](#border-and-container)
  - [Add Border to Sparkline](#add-border-to-sparkline)
  - [Container Area Border](#container-area-border)
  - [Border vs Container Area Border](#border-vs-container-area-border)
- [Padding Configuration](#padding-configuration)
  - [Set Equal Padding](#set-equal-padding)
  - [Set Individual Padding](#set-individual-padding)
  - [Default Padding](#default-padding)
- [Background Colors](#background-colors)
  - [Container Area Background](#container-area-background)
  - [Transparent Background](#transparent-background)
  - [Color Format Support](#color-format-support)
- [Series Fill and Line Styling](#series-fill-and-line-styling)
  - [Fill Color](#fill-color)
  - [Line Width](#line-width)
  - [Multiple Color Styling](#multiple-color-styling)
- [Theme Application](#theme-application)
  - [Available Themes](#available-themes)
  - [Apply Theme](#apply-theme)
  - [Theme Effects](#theme-effects)
- [Container Area Customization](#container-area-customization)
  - [Complete Container Configuration](#complete-container-configuration)
- [CSS Customization](#css-customization)
  - [Style Sparkline with CSS](#style-sparkline-with-css)
  - [SVG Element Styling](#svg-element-styling)
- [Styling Patterns](#styling-patterns)
  - [Pattern 1: Dashboard Sparkline Set](#pattern-1-dashboard-sparkline-set)
  - [Pattern 2: Responsive Sparkline Styling](#pattern-2-responsive-sparkline-styling)
  - [Pattern 3: Highlighted Sparkline](#pattern-3-highlighted-sparkline)
  - [Pattern 4: Theme Switcher](#pattern-4-theme-switcher)
  - [Pattern 5: Gradient and Advanced Styling](#pattern-5-gradient-and-advanced-styling)
- [Styling Tips](#styling-tips)
  - [Tip 1: Consistent Color Palette](#tip-1-consistent-color-palette)
  - [Tip 2: Container Height Affects Visibility](#tip-2-container-height-affects-visibility)
  - [Tip 3: Border Clarity](#tip-3-border-clarity)
  - [Tip 4: Accessibility](#tip-4-accessibility)
- [Troubleshooting](#troubleshooting)
  - [Issue: Padding Not Applied](#issue-padding-not-applied)
  - [Issue: Background Color Not Visible](#issue-background-color-not-visible)
  - [Issue: Theme Not Applied](#issue-theme-not-applied)
  - [Issue: Sparkline Too Small to See](#issue-sparkline-too-small-to-see)
``

---

## Overview

Sparkline appearance can be customized at multiple levels:
- **Series level:** Fill color, line width
- **Container level:** Borders, padding, background
- **Theme level:** Global color scheme
- **CSS level:** Custom styles via classes

---

## Border and Container

### Add Border to Sparkline

Define a border around the sparkline:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' :border='border' fill= '#b2cfff' :containerArea='containerArea' :type='type' :height='height' :width='width'></ejs-sparkline>
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
    // To render border around the sparkline
    containerArea: {
        border: { color: '#033e96', width: 2 }
    },
    border: { color: '#033e96', width: 1 },
    height: '200px',
    width: '350px',
    type: 'Area',
    fill: '#b2cfff',
    dataSource: [3, 6, 4, 1, 3, 2, 5]
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

### Container Area Border

Add border to container area (larger scope):

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :padding='padding' :border='border' fill= '#b2cfff' :containerArea='containerArea' :dataSource='dataSource' :type='type' :height='height' :width='width'></ejs-sparkline>
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
    containerArea: {
        border: { color: '#033e96', width: 2 },
        // To render sparkline with background
        background: '#eff1f4',
    },
    padding: { left: 20, right: 20, bottom: 20, top: 20},
    border: { color: '#033e96', width: 2 },
    height: '200px',
    width: '350px',
    type: 'Area',
    dataSource: [3, 6, 4, 1, 3, 2, 5]
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

### Border vs Container Area Border

```javascript
// Series border: smaller, around data visualization only
border: { color: '#000', width: 1 }

// Container border: larger, encompasses entire sparkline area
containerArea: {
  border: { color: '#000', width: 2 }
}
```

---

## Padding Configuration

### Set Equal Padding

Apply same padding to all sides:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :padding='padding' :border='border' fill= '#b2cfff' :containerArea='containerArea' :dataSource='dataSource' :type='type' :height='height' :width='width'></ejs-sparkline>
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
    containerArea: {
        border: { color: '#033e96', width: 2 },
        // To render sparkline with background
        background: '#ffffff',
    },
    padding: { left: 20, right: 20, bottom: 20, top: 20},
    border: { color: '#033e96', width: 2 },
    height: '200px',
    width: '350px',
    type: 'Area',
    dataSource: [3, 6, 4, 1, 3, 2, 5]
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

### Set Individual Padding

Customize padding per side:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :padding='padding' :border='border' fill= '#b2cfff' :containerArea='containerArea' :dataSource='dataSource' :type='type' :height='height' :width='width'></ejs-sparkline>
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
    containerArea: {
        border: { color: '#033e96', width: 2 },
        // To render sparkline with background
        background: '#ffffff',
    },
    padding: { left: 10, right: 30, bottom: 15, top: 15},
    border: { color: '#033e96', width: 2 },
    height: '200px',
    width: '350px',
    type: 'Area',
    dataSource: [3, 6, 4, 1, 3, 2, 5]
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

### Default Padding

Default padding is 5 pixels on all sides:

```javascript
// Default (if not specified)
padding: {
  left: 5,
  right: 5,
  top: 5,
  bottom: 5
}
```

---

## Background Colors

### Container Area Background

Set background color for sparkline container:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' :border='border' fill= '#b2cfff' :containerArea='containerArea' :type='type' :height='height' :width='width'></ejs-sparkline>
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
    // To render border around the sparkline
    containerArea: {
        border: { color: '#033e96', width: 2 }
    },
    border: { color: '#033e96', width: 1 },
    height: '200px',
    width: '350px',
    type: 'Area',
    fill: '#b2cfff',
    dataSource: [3, 6, 4, 1, 3, 2, 5]
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

### Transparent Background

Keep background transparent (default):

```javascript
containerArea: {
  background: 'transparent'  // Default
}
```

### Color Format Support

Use any CSS color format:

```javascript
background: '#eff1f4'           // Hex color
background: 'rgb(239, 241, 244)'  // RGB
background: 'rgba(239, 241, 244, 0.5)'  // RGBA with transparency
background: 'lightgray'         // Named color
```

---

## Series Fill and Line Styling

### Fill Color

Set the color of the sparkline series:

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    type='Line'
    fill='#05cd37'
    :height='height'
    :width='width'>
  </ejs-sparkline>
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
      height: '100px',
      width: '300px',
      data: [5, 3, 4, 6, 8, 7, 9]
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

### Line Width

Control thickness of line sparklines:

```vue
<template>
<div>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    type='Line'
    fill='#05cd37'
    lineWidth='3'
    :height='height'
    :width='width'>
  </ejs-sparkline>
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
      height: '100px',
      width: '300px',
      data: [5, 3, 4, 6, 8, 7, 9]
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

### Multiple Color Styling

Different types support different styling:

```vue
<template>
<div class="sparkline-colors">
<!-- Line sparkline -->
<div>
  <ejs-sparkline 
    type='Line'
    fill='#1976d2'
    lineWidth='2'
    :dataSource='data'>
  </ejs-sparkline>
</div>

<!-- Column sparkline -->
<div>
  <ejs-sparkline 
    type='Column'
    fill='#388e3c'
    :dataSource='data'>
  </ejs-sparkline>
</div>

<!-- Area sparkline -->
<div>
  <ejs-sparkline 
    type='Area'
    fill='#f57c00'
    :dataSource='data'>
  </ejs-sparkline>
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
      height: '100px',
      width: '300px',
      data: [5, 3, 4, 6, 8, 7, 9]
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
---

## Theme Application

### Available Themes

Sparkline supports four built-in themes:

1. **Material:** Default modern theme
2. **Fabric:** Microsoft Office style
3. **Bootstrap:** Bootstrap default colors
4. **Highcontrast:** High contrast for accessibility

### Apply Theme

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      theme='Highcontrast'
      :height='height'
      :width='width'>
    </ejs-sparkline>
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
      height: '200px',
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5]
    }
  }
}
</script>
```

### Theme Effects

Themes control colors of:
- Data labels
- Track lines
- Tooltip backgrounds
- Default fill colors

```vue
<template>
  <div class="theme-comparison">
    <div>
      <h4>Material</h4>
      <ejs-sparkline 
        :dataSource='data'
        theme='Material'
        :dataLabelSettings='dataLabelSettings'
        :tooltipSettings='tooltipSettings'>
      </ejs-sparkline>
    </div>
    
    <div>
      <h4>Highcontrast</h4>
      <ejs-sparkline 
        :dataSource='data'
        theme='Highcontrast'
        :dataLabelSettings='dataLabelSettings'
        :tooltipSettings='tooltipSettings'>
      </ejs-sparkline>
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
      data: [3, 6, 4, 1, 3, 2, 5],
      dataLabelSettings: { visible: ['All'] },
      tooltipSettings: {
        trackLineSettings: { visible: true }
      }
    }
  }
}
</script>
```

---

## Container Area Customization

### Complete Container Configuration

Combine all container properties:

```vue
<template>
<div>
<ejs-sparkline 
id="sparkline"
:dataSource='data'
:containerArea='containerArea'
fill='#b2cfff'
:border='border'
:padding='padding'
type='Area'
:height='height'
:width='width'>
</ejs-sparkline>
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
      height: '200px',
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5],
      containerArea: {
        border: { color: '#033e96', width: 2 },
        background: '#eff1f4'
      },
      border: { color: '#033e96', width: 1 },
      padding: { left: 20, right: 20, bottom: 20, top: 20 }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
},
}
</script>
```

---

## CSS Customization

### Style Sparkline with CSS

Apply CSS classes and styles:

```vue
<template>
<div>
<ejs-sparkline 
id="sparkline"
:dataSource='data' class="my-sparkline"
:containerArea='containerArea'
fill='#b2cfff'
:border='border'
:padding='padding'
type='Area'
:height='height'
:width='width'>
</ejs-sparkline>
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
      height: '200px',
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5],
      containerArea: {
        border: { color: '#033e96', width: 2 },
        background: '#eff1f4'
      },
      border: { color: '#033e96', width: 1 },
      padding: { left: 20, right: 20, bottom: 20, top: 20 }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
},
}
</script>
<style scoped>
.my-sparkline {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 10px;
  background-color: #df0404;
}
</style>
```

### SVG Element Styling

Target sparkline SVG elements:

```vue
<style scoped>
/* Line sparkline path */
#sparkline svg path {
  stroke: #007bff;
  stroke-width: 2;
}

/* Sparkline container */
#sparkline {
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Focus outline (optional) */
#sparkline:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
</style>
```

---

## Styling Patterns

### Pattern 1: Dashboard Sparkline Set

Create cohesive dashboard styling:

```vue
<template>
  <div class="dashboard-sparklines">
    <div class="sparkline-card" v-for="metric in metrics" :key="metric.id">
      <h4>{{ metric.name }}</h4>
      <ejs-sparkline 
        :id="'sparkline-' + metric.id"
        :dataSource='metric.data'
        :containerArea='containerArea'
        :fill='metric.color'
        :height='sparklineHeight'
        :width='sparklineWidth'>
      </ejs-sparkline>
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
      sparklineHeight: '100px',
      sparklineWidth: '100%',
      containerArea: {
        border: { color: '#ddd', width: 1 },
        background: '#fafafa'
      },
      metrics: [
        { id: 1, name: 'Sales', color: '#1976d2', data: [3, 6, 4, 1, 3, 2, 5] },
        { id: 2, name: 'Traffic', color: '#388e3c', data: [2, 4, 3, 5, 1, 4, 3] },
        { id: 3, name: 'Revenue', color: '#f57c00', data: [4, 2, 5, 3, 6, 1, 4] }
      ]
    }
  }
}
</script>

<style scoped>
.dashboard-sparklines {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.sparkline-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.sparkline-card h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 14px;
}
</style>
```

### Pattern 2: Responsive Sparkline Styling

Adjust styling based on screen size:

```vue
<script>
export default {
  data: function() {
    return {
      isMobile: window.innerWidth < 768
    }
  },
  computed: {
    adaptiveSparklineConfig: function() {
      return {
        height: this.isMobile ? '80px' : '120px',
        width: this.isMobile ? '100%' : '300px',
        containerArea: this.isMobile ? 
          { background: 'transparent' } :
          { border: { color: '#ddd', width: 1 }, background: '#fafafa' },
        padding: this.isMobile ? 
          { left: 5, right: 5, top: 5, bottom: 5 } :
          { left: 20, right: 20, top: 20, bottom: 20 }
      }
    }
  },
  mounted: function() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
}
</script>
```

### Pattern 3: Highlighted Sparkline

Emphasize important sparkline:

```vue
<template>
  <div class="sparkline-container" :class="{ highlighted: isImportant }">
    <ejs-sparkline 
      :dataSource='data'
      :containerArea='containerArea'
      :height='height'
      :width='width'>
    </ejs-sparkline>
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
      isImportant: true,
      height: '100px',
      width: '300px',
      data: [3, 6, 4, 1, 3, 2, 5],
      containerArea: {
        border: { color: '#ddd', width: 1 },
        background: '#fafafa'
      }
    }
  }
}
</script>

<style scoped>
.sparkline-container {
  transition: all 0.3s ease;
}

.sparkline-container.highlighted {
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 8px;
  background: #f0f7ff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
}
</style>
```

### Pattern 4: Theme Switcher

Allow users to change theme:

```vue
<template>
  <div>
    <div class="theme-selector">
      <label>Theme:</label>
      <select v-model="selectedTheme">
        <option value="Material">Material</option>
        <option value="Fabric">Fabric</option>
        <option value="Bootstrap">Bootstrap</option>
        <option value="Highcontrast">Highcontrast</option>
      </select>
    </div>
    
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :theme='selectedTheme'
      :dataLabelSettings='dataLabelSettings'
      :height='height'
      :width='width'>
    </ejs-sparkline>
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
      selectedTheme: 'Material',
      height: '200px',
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5],
      dataLabelSettings: { visible: ['All'] }
    }
  }
}
</script>

<style scoped>
.theme-selector {
  margin-bottom: 20px;
}

.theme-selector select {
  margin-left: 10px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

### Pattern 5: Gradient and Advanced Styling

Use advanced CSS for sophisticated looks:

```vue
<template>
  <div class="premium-sparkline">
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :containerArea='containerArea'
      fill='#007bff'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<style scoped>
.premium-sparkline {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 0 1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.premium-sparkline:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 0 1px rgba(0, 0, 0, 0.1);
}
</style>
```

---

## Styling Tips

### Tip 1: Consistent Color Palette
Use a predefined color scheme across all sparklines:
```javascript
const colorPalette = {
  primary: '#1976d2',
  success: '#388e3c',
  warning: '#f57c00',
  danger: '#d32f2f'
};
```

### Tip 2: Container Height Affects Visibility
Larger containers show more detail:
- **Small (80px):** Dashboard indicators
- **Medium (150px):** Detail view
- **Large (300px+):** Primary focus

### Tip 3: Border Clarity
Use borders to distinguish sparkline areas:
```javascript
// Subtle: light border
border: { color: '#e0e0e0', width: 1 }

// Prominent: dark border
border: { color: '#333', width: 2 }
```

### Tip 4: Accessibility
Ensure sufficient contrast:
```javascript
// High contrast for accessibility
containerArea: {
  background: '#ffffff',
  border: { color: '#000000', width: 1 }
},
fill: '#0066cc'
```

---

## Troubleshooting

### Issue: Padding Not Applied
- **Solution:** Ensure `padding` object has all four properties
- Verify values are in correct object format: `{ left, right, top, bottom }`

### Issue: Background Color Not Visible
- **Solution:** Use `containerArea.background`, not direct style
- Check z-index if combined with overlays

### Issue: Theme Not Applied
- **Solution:** Ensure `theme` prop is spelled correctly and uses exact name
- Verify module is loaded correctly

### Issue: Sparkline Too Small to See
- **Solution:** Increase `height` and `width`
- Add more padding and border for definition
- Check parent container dimensions
