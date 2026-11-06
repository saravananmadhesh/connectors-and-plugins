# Customization & Orientation

## Table of Contents
- [Orientation](#orientation)
- [Chart Dimensions](#chart-dimensions)
- [Animation](#animation)
- [Data Labels](#data-labels)
- [Value Bar & Target Bar Styling](#value-bar--target-bar-styling)
- [Comparative Bar Customization](#comparative-bar-customization)
- [RTL Support](#rtl-support)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)

## Orientation

Control chart layout direction: horizontal (default) or vertical.

### Horizontal Orientation (Default)

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    valueField="value"
    targetField="target"
    orientation="Horizontal"  <!-- Default -->
  ></ejs-bulletchart>
</template>

<script setup>
const data = ref([{ value: 85, target: 80 }])
</script>
```

**Visual Layout:**
```
Scale: 0 -------- 25 -------- 50 -------- 75 -------- 100
           [====|====]
            └─ Value bar and target
```

**Use Cases:**
- Dashboard layouts
- Multiple side-by-side metrics
- Reading left-to-right languages
- Standard KPI displays

### Vertical Orientation

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    valueField="value"
    targetField="target"
    orientation="Vertical"
    height="400px"  <!-- Increase height for vertical layout -->
    width="100px"   <!-- Reduce width for vertical layout -->
  ></ejs-bulletchart>
</template>

<script setup>
const data = ref([{ value: 85, target: 80 }])
</script>
```

**Visual Layout:**
```
     100
      |
     75  ───  (target)
      |  ┌──┐
     50  │██│ (value)
      |  └──┘
     25
      |
      0
```

**Use Cases:**
- Vertical stacked dashboards
- Limited horizontal space
- Mobile-friendly layouts
- Tall content areas

### Switching Orientation Dynamically

```vue
<template>
  <div>
    <div style="margin-bottom: 20px">
      <label>
        <input 
          v-model="isVertical" 
          type="checkbox"
        >
        Vertical Layout
      </label>
    </div>

    <ejs-bulletchart
      :dataSource="data"
      :orientation="isVertical ? 'Vertical' : 'Horizontal'"
      :height="isVertical ? '400px' : 'auto'"
      :width="isVertical ? '100px' : 'auto'"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVertical = ref(false)
const data = ref([{ value: 85, target: 80 }])
</script>
```

## Chart Dimensions

Control chart size with `height` and `width` properties:

### Fixed Dimensions

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    height="300px"  <!-- Fixed height -->
    width="600px"   <!-- Fixed width -->
  ></ejs-bulletchart>
</template>
```

### Responsive Dimensions

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    height="100%"   <!-- Fill parent height -->
    width="100%"    <!-- Fill parent width -->
  ></ejs-bulletchart>
</template>

<style scoped>
/* Parent container must have explicit height */
.chart-container {
  height: 400px;
  width: 100%;
}
</style>
```

### Container Setup for Responsive Charts

```vue
<template>
  <div class="chart-container">
    <ejs-bulletchart
      :dataSource="data"
      height="100%"
      width="100%"
    ></ejs-bulletchart>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;  /* Optional max width */
  height: 300px;
  margin: 0 auto;
}
</style>
```

### Multiple Charts in Grid

```vue
<template>
  <div class="metrics-grid">
    <div class="metric-card" v-for="metric in metrics" :key="metric.id">
      <ejs-bulletchart
        :dataSource="[metric]"
        height="100%"
        width="100%"
      ></ejs-bulletchart>
    </div>
  </div>
</template>

<style scoped>
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.metric-card {
  height: 250px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}
</style>

<script setup>
const metrics = [
  { id: 1, value: 450, target: 400 },
  { id: 2, value: 85, target: 80 },
  { id: 3, value: 92, target: 88 }
]
</script>
```

## Animation

Enable/disable chart animations:

### Enable Animation

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :animation="{ enable: true, duration: 1000 }"
  ></ejs-bulletchart>
</template>

<script setup>
const data = ref([{ value: 270, target: 250 }])
</script>
```

**Result:** Chart animates smoothly when rendering, taking 1 second.

### Disable Animation

```vue
<template>
  <ejs-bulletchart
    :animation="{ enable: false }"
  ></ejs-bulletchart>
</template>
```

### Animation Configuration

```vue
<script setup>
const animation = {
  enable: true,          // Enable/disable animations
  duration: 1000,        // Duration in milliseconds
  delay: 0               // Delay before animation starts
}
</script>

<template>
  <ejs-bulletchart :animation="animation"></ejs-bulletchart>
</template>
```

### Animation Best Practices

- **Duration:** 500-1500ms is typical
- **Delay:** Use for staggered animations in dashboards
- **Disable for:** Real-time updates (too frequent re-rendering)
- **Enable for:** Initial load, impressive presentations

## Data Labels

Configure how values are displayed on the chart:

### Enable Data Labels

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :dataLabel="{ enable: true }"
  ></ejs-bulletchart>
</template>

<script setup>
const data = ref([{ value: 270, target: 250 }])
</script>
```

**Result:** Shows value and target numbers on the chart.

### Data Label Formatting

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :dataLabel="{
      enable: true,
      format: 'Value: {value}',
      textStyle: {
        color: '#333',
        fontFamily: 'Arial',
        fontSize: '12px'
      }
    }"
  ></ejs-bulletchart>
</template>

<script setup>
const data = ref([{ value: 270, target: 250 }])
</script>
```

### Data Label Position

```vue
<template>
  <ejs-bulletchart
    :dataLabel="{
      enable: true,
      position: 'Middle'  <!-- Position: Start, Middle, End -->
    }"
  ></ejs-bulletchart>
</template>
```

## Value Bar & Target Bar Styling

Customize the appearance of actual value and target bars:

### Value Bar Color

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :valueFill="'#FF6B6B'"  <!-- Custom value bar color -->
  ></ejs-bulletchart>
</template>
```

### Target Bar Color & Width

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :targetColor="'#333333'"  <!-- Target line color -->
  ></ejs-bulletchart>
</template>
```

### Complete Styling Example

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :valueFill="'#4CAF50'"           <!-- Green value bar -->
    :targetColor="'#FF6B6B'"         <!-- Red target line -->
  ></ejs-bulletchart>
</template>

<script setup>
const data = ref([
  { value: 450, target: 400 },
  { value: 380, target: 420 }
])
</script>
```

## Comparative Bar Customization

The comparative bar (target line) can be styled:

### Custom Comparative Bar Color

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :targetColor="'#2196F3'"  <!-- Blue target line -->
  ></ejs-bulletchart>
</template>
```

### Target Bar Styling Options

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    targetColor="#FF6B6B"
    <!-- Additional styling properties -->
  ></ejs-bulletchart>
</template>

<script setup>
const data = [
  { value: 85, target: 80 },   <!-- Value: 85, Target: 80 -->
  { value: 120, target: 100 }  <!-- Value: 120, Target: 100 -->
]
</script>
```

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages:

### Enable RTL

```vue
<template>
  <div dir="rtl">  <!-- Add dir="rtl" to parent container -->
    <ejs-bulletchart
      :dataSource="data"
      :enableRtl="true"  <!-- Enable RTL in chart -->
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
const data = ref([{ value: 85, target: 80 }])
</script>
```

### RTL Dashboard Example

```vue
<template>
  <div dir="rtl" class="rtl-dashboard">
    <h1>لوحة المقاييس</h1>  <!-- Dashboard in Arabic -->
    
    <div class="metrics-container">
      <ejs-bulletchart
        v-for="metric in metrics"
        :key="metric.id"
        :dataSource="[metric]"
        :title="metric.titleAr"  <!-- Arabic title -->
        :enableRtl="true"
      ></ejs-bulletchart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const metrics = ref([
  { id: 1, titleAr: 'المبيعات', value: 450, target: 400 },
  { id: 2, titleAr: 'الدعم', value: 92, target: 85 },
  { id: 3, titleAr: 'الكفاءة', value: 88, target: 80 }
])
</script>

<style scoped>
.rtl-dashboard {
  direction: rtl;
  text-align: right;
}

.metrics-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
```

## Common Patterns

### Pattern 1: Dashboard with Responsive Layout

```vue
<template>
  <div class="dashboard">
    <h1>Performance Metrics</h1>
    
    <div class="charts-grid">
      <div class="chart-wrapper" v-for="metric in metrics" :key="metric.id">
        <h3>{{ metric.title }}</h3>
        <ejs-bulletchart
          :dataSource="[{ value: metric.actual, target: metric.target }]"
          :minimum="0"
          :maximum="100"
          height="200px"
          width="100%"
          :animation="{ enable: true, duration: 800 }"
        ></ejs-bulletchart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const metrics = ref([
  { id: 1, title: 'Sales', actual: 85, target: 80 },
  { id: 2, title: 'Support', actual: 92, target: 85 },
  { id: 3, title: 'Development', actual: 78, target: 90 }
])
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.chart-wrapper {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

### Pattern 2: Vertical Stack for Mobile

```vue
<template>
  <div class="mobile-dashboard">
    <div 
      v-for="metric in metrics" 
      :key="metric.id"
      class="metric-card"
    >
      <h3>{{ metric.title }}</h3>
      <ejs-bulletchart
        :dataSource="[metric]"
        :orientation="isMobile ? 'Vertical' : 'Horizontal'"
        :height="isMobile ? '300px' : '120px'"
        :width="isMobile ? '80px' : '100%'"
      ></ejs-bulletchart>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'  // Or implement your own

const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 768)

const metrics = ref([
  { value: 450, target: 400 },
  { value: 85, target: 80 }
])
</script>

<style scoped>
.metric-card {
  padding: 15px;
  margin-bottom: 15px;
  background: white;
  border-radius: 8px;
}
</style>
```

### Pattern 3: Real-Time Updates with Animation

```vue
<template>
  <div>
    <button @click="startSimulation">Start Real-Time Update</button>
    <button @click="stopSimulation" :disabled="!isRunning">Stop</button>

    <ejs-bulletchart
      :dataSource="chartData"
      :animation="{ enable: true, duration: 300 }"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const chartData = ref([{ value: 100, target: 120 }])
const isRunning = ref(false)
let updateInterval = null

const startSimulation = () => {
  isRunning.value = true
  updateInterval = setInterval(() => {
    // Random value between 80 and 150
    const newValue = Math.floor(Math.random() * 70) + 80
    chartData.value[0].value = newValue
  }, 1000)
}

const stopSimulation = () => {
  isRunning.value = false
  clearInterval(updateInterval)
}

onUnmounted(() => {
  if (updateInterval) clearInterval(updateInterval)
})
</script>
```

## Best Practices

### 1. Responsive Design
- Use `height="100%"` and `width="100%"` for flexible layouts
- Test on mobile, tablet, and desktop
- Use CSS grid/flexbox for dashboard layouts

### 2. Orientation Choice
- **Horizontal:** Default, most common, better for dashboards
- **Vertical:** When space is limited or stacking is needed
- Test both before deciding

### 3. Animation Considerations
- Enable for initial load (impressive)
- Disable for frequent updates (real-time dashboards)
- Keep duration 500-1500ms for professional feel

### 4. Color Accessibility
- Ensure sufficient contrast (WCAG AA: 4.5:1)
- Don't rely on color alone (use values/labels)
- Test with colorblind simulator

### 5. Performance
- For 20+ charts on page: Disable animations
- Use virtualization for very large lists
- Consider lazy loading for off-screen charts

### 6. Consistency
- Use same colors across dashboard
- Maintain consistent sizing
- Apply uniform styling to all metrics

---

**Next:** Proceed to [accessibility-and-advanced.md](accessibility-and-advanced.md) for WCAG compliance and advanced features.
