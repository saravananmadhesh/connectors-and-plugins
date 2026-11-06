# Ranges & Color Bands

## Table of Contents
- [Understanding Ranges](#understanding-ranges)
- [Basic Range Definition](#basic-range-definition)
- [Color Customization](#color-customization)
- [Opacity & Transparency](#opacity--transparency)
- [Common Range Patterns](#common-range-patterns)
- [Performance Bands](#performance-bands)
- [Dynamic Ranges](#dynamic-ranges)
- [Best Practices](#best-practices)

## Understanding Ranges

Ranges represent **quality bands** that provide visual context for evaluating performance. They segment the scale into zones (Bad, Satisfactory, Good).

### Range Concept Illustration

```
Scale: 0 -------- 50 -------- 100 -------- 150 -------- 200 -------- 250 -------- 300
Range 1 (Poor):    [====]  (0-35)
Range 2 (Fair):         [===========]  (35-50)
Range 3 (Good):                           [===========]  (50-100)

Value bar: ════════════ (270) 
Target line: ████ (250)
```

**Key Concept:** Ranges are defined by END points, not start/end pairs.
- Range 1 ends at 35
- Range 2 ends at 50
- Range 3 ends at 100 (or max)

## Basic Range Definition

Define ranges using `e-bullet-range` components:

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    valueField="value"
    targetField="target"
    :minimum="0"
    :maximum="100"
    :interval="20"
  >
    <e-bullet-range-collection>
      <e-bullet-range end="35" color="red"></e-bullet-range>
      <e-bullet-range end="50" color="orange"></e-bullet-range>
      <e-bullet-range end="100" color="green"></e-bullet-range>
    </e-bullet-range-collection>
  </ejs-bulletchart>
</template>

<script setup>
import {
  BulletChartComponent as EjsBulletchart,
  BulletRangeCollectionDirective,
  BulletRangeDirective
} from '@syncfusion/ej2-vue-charts'

const data = [{ value: 55, target: 75 }]
</script>
```

### Range Properties

| Property | Type | Required | Purpose | Example |
|----------|------|----------|---------|---------|
| `end` | Number | ✅ Yes | End point of range | `end="50"` |
| `color` | String | ❌ No | Range background color | `color="green"` |
| `opacity` | Number | ❌ No | Transparency (0-1) | `opacity="0.7"` |

### Range Rules

1. **First range starts at minimum (0 by default)**
2. **Each range ends at specified value**
3. **Ranges must be in ascending order**
4. **Last range should end at or above maximum**

**✅ Correct:**
```vue
<e-bullet-range-collection>
  <e-bullet-range end="35"></e-bullet-range>  <!-- 0-35 -->
  <e-bullet-range end="50"></e-bullet-range>  <!-- 35-50 -->
  <e-bullet-range end="100"></e-bullet-range> <!-- 50-100 -->
</e-bullet-range-collection>
```

**❌ Incorrect (Out of order):**
```vue
<e-bullet-range-collection>
  <e-bullet-range end="100"></e-bullet-range> <!-- 0-100 (wrong order!) -->
  <e-bullet-range end="50"></e-bullet-range>  <!-- Never used -->
  <e-bullet-range end="35"></e-bullet-range>  <!-- Never used -->
</e-bullet-range-collection>
```

## Color Customization

Specify range colors using named colors or hex codes:

### Named Colors

```vue
<e-bullet-range-collection>
  <e-bullet-range end="35" color="red"></e-bullet-range>
  <e-bullet-range end="50" color="orange"></e-bullet-range>
  <e-bullet-range end="75" color="yellow"></e-bullet-range>
  <e-bullet-range end="100" color="green"></e-bullet-range>
</e-bullet-range-collection>
```

### Hex Color Codes

```vue
<e-bullet-range-collection>
  <e-bullet-range end="35" color="#FF6B6B"></e-bullet-range>  <!-- Red -->
  <e-bullet-range end="50" color="#FFA500"></e-bullet-range>  <!-- Orange -->
  <e-bullet-range end="75" color="#FFD700"></e-bullet-range>  <!-- Gold -->
  <e-bullet-range end="100" color="#4CAF50"></e-bullet-range> <!-- Green -->
</e-bullet-range-collection>
```

### RGB Color Values

```vue
<e-bullet-range-collection>
  <e-bullet-range end="35" color="rgb(255, 107, 107)"></e-bullet-range>
  <e-bullet-range end="50" color="rgb(255, 165, 0)"></e-bullet-range>
  <e-bullet-range end="100" color="rgb(76, 175, 80)"></e-bullet-range>
</e-bullet-range-collection>
```

### Color Selection Guide

| Range Type | Intent | Color | Use Case |
|-----------|--------|-------|----------|
| **Poor/Bad** | Negative | Red (#FF6B6B) | Performance below 50% |
| **Fair/Warning** | Caution | Orange (#FFA500) | Performance 50-75% |
| **Good/Satisfactory** | Acceptable | Yellow (#FFD700) | Performance 75-90% |
| **Excellent** | Positive | Green (#4CAF50) | Performance 90%+ |

## Opacity & Transparency

Control range transparency with `opacity` (0-1):

```vue
<e-bullet-range-collection>
  <e-bullet-range end="35" color="red" opacity="0.3"></e-bullet-range>     <!-- 30% visible -->
  <e-bullet-range end="50" color="orange" opacity="0.6"></e-bullet-range>  <!-- 60% visible -->
  <e-bullet-range end="100" color="green" opacity="1.0"></e-bullet-range>  <!-- 100% visible -->
</e-bullet-range-collection>
```

### Opacity Effects

| Opacity | Visibility | Use Case |
|---------|-----------|----------|
| `0` | Invisible | Not recommended |
| `0.3-0.5` | Very light | Subtle background |
| `0.6-0.7` | Medium | Balanced visibility |
| `0.8-1.0` | Opaque | Strong emphasis |

### Example: Gradient Opacity

Create visual hierarchy with varying opacity:

```vue
<e-bullet-range-collection>
  <e-bullet-range end="35" color="red" opacity="0.3"></e-bullet-range>     <!-- Lightest -->
  <e-bullet-range end="50" color="orange" opacity="0.6"></e-bullet-range>
  <e-bullet-range end="75" color="yellow" opacity="0.7"></e-bullet-range>
  <e-bullet-range end="100" color="green" opacity="1.0"></e-bullet-range>  <!-- Darkest -->
</e-bullet-range-collection>
```

**Visual Result:** Ranges become progressively more prominent from bad to good.

## Common Range Patterns

### Pattern 1: Three-Zone Performance Band (Traffic Light)

**Use for:** KPI monitoring, performance dashboards

```vue
<template>
  <ejs-bulletchart
    :dataSource="[{ value: 75, target: 80 }]"
    valueField="value"
    targetField="target"
    title="Sales Performance"
    :minimum="0"
    :maximum="100"
    :interval="25"
  >
    <e-bullet-range-collection>
      <e-bullet-range end="60" color="#FF6B6B"></e-bullet-range>   <!-- Red: Poor -->
      <e-bullet-range end="80" color="#FFD700"></e-bullet-range>   <!-- Yellow: Fair -->
      <e-bullet-range end="100" color="#4CAF50"></e-bullet-range>  <!-- Green: Good -->
    </e-bullet-range-collection>
  </ejs-bulletchart>
</template>
```

### Pattern 2: Four-Zone Performance Band

**Use for:** Detailed performance levels

```vue
<e-bullet-range-collection>
  <e-bullet-range end="25" color="#D32F2F"></e-bullet-range>   <!-- Dark Red: Critical -->
  <e-bullet-range end="50" color="#FF6B6B"></e-bullet-range>   <!-- Light Red: Poor -->
  <e-bullet-range end="75" color="#FFA500"></e-bullet-range>   <!-- Orange: Fair -->
  <e-bullet-range end="100" color="#4CAF50"></e-bullet-range>  <!-- Green: Good -->
</e-bullet-range-collection>
```

### Pattern 3: Revenue Ranges

**Use for:** Sales tracking, financial metrics

```vue
<template>
  <ejs-bulletchart
    :dataSource="[{ revenue: 450, target: 400 }]"
    valueField="revenue"
    targetField="target"
    title="Monthly Revenue"
    :minimum="0"
    :maximum="500"
    :interval="100"
    labelFormat="${value}K"
  >
    <e-bullet-range-collection>
      <e-bullet-range end="200" color="#E57373"></e-bullet-range>  <!-- Below target -->
      <e-bullet-range end="400" color="#FFD54F"></e-bullet-range>  <!-- On target -->
      <e-bullet-range end="500" color="#81C784"></e-bullet-range>  <!-- Exceeding target -->
    </e-bullet-range-collection>
  </ejs-bulletchart>
</template>

<script setup>
const data = [{ revenue: 450, target: 400 }]
</script>
```

### Pattern 4: SLA/Uptime Ranges

**Use for:** Service reliability, availability metrics

```vue
<e-bullet-range-collection>
  <e-bullet-range end="95" color="#EF5350"></e-bullet-range>     <!-- Below SLA -->
  <e-bullet-range end="99" color="#FFC107"></e-bullet-range>     <!-- Acceptable -->
  <e-bullet-range end="99.5" color="#66BB6A"></e-bullet-range>   <!-- Good -->
  <e-bullet-range end="100" color="#2E7D32"></e-bullet-range>    <!-- Excellent -->
</e-bullet-range-collection>
```

### Pattern 5: Temperature Ranges

**Use for:** Environmental monitoring, system metrics

```vue
<e-bullet-range-collection>
  <e-bullet-range end="0" color="#1976D2"></e-bullet-range>      <!-- Frozen -->
  <e-bullet-range end="15" color="#42A5F5"></e-bullet-range>     <!-- Cold -->
  <e-bullet-range end="25" color="#66BB6A"></e-bullet-range>     <!-- Comfortable -->
  <e-bullet-range end="35" color="#FFA726"></e-bullet-range>     <!-- Hot -->
  <e-bullet-range end="50" color="#E53935"></e-bullet-range>     <!-- Dangerous -->
</e-bullet-range-collection>
```

## Performance Bands

Create business-aligned performance zones:

### Percentage-Based Performance

```vue
<template>
  <ejs-bulletchart
    :dataSource="departments"
    valueField="actual"
    targetField="target"
    categoryField="department"
    title="Department Performance"
    :minimum="0"
    :maximum="100"
    :interval="20"
    labelFormat="{value}%"
    height="400px"
  >
    <e-bullet-range-collection>
      <e-bullet-range end="50" color="#E53935"></e-bullet-range>  <!-- Critical: Below 50% -->
      <e-bullet-range end="70" color="#FFA726"></e-bullet-range>  <!-- Warning: 50-70% -->
      <e-bullet-range end="85" color="#FFC107"></e-bullet-range>  <!-- Fair: 70-85% -->
      <e-bullet-range end="100" color="#66BB6A"></e-bullet-range> <!-- Excellent: 85-100% -->
    </e-bullet-range-collection>
  </ejs-bulletchart>
</template>

<script setup>
import { ref } from 'vue'

const departments = ref([
  { department: 'Engineering', actual: 92, target: 90 },
  { department: 'QA', actual: 78, target: 85 },
  { department: 'Marketing', actual: 65, target: 75 },
  { department: 'Sales', actual: 88, target: 80 }
])
</script>
```

### Goals & Incentives

```vue
<e-bullet-range-collection>
  <!-- Below goal: No bonus -->
  <e-bullet-range end="80" color="#D32F2F"></e-bullet-range>
  
  <!-- Meets goal: 50% bonus -->
  <e-bullet-range end="100" color="#FFC107"></e-bullet-range>
  
  <!-- Exceeds goal: 100% bonus -->
  <e-bullet-range end="120" color="#4CAF50"></e-bullet-range>
</e-bullet-range-collection>
```

## Dynamic Ranges

Update ranges based on data or conditions:

```vue
<template>
  <div>
    <button @click="toggleThresholds">
      {{ highStandards ? 'Show Relaxed Standards' : 'Show High Standards' }}
    </button>

    <ejs-bulletchart
      :dataSource="data"
      :key="highStandards"  <!-- Force re-render when ranges change -->
    >
      <e-bullet-range-collection v-if="highStandards">
        <e-bullet-range end="70" color="red"></e-bullet-range>
        <e-bullet-range end="85" color="yellow"></e-bullet-range>
        <e-bullet-range end="100" color="green"></e-bullet-range>
      </e-bullet-range-collection>

      <e-bullet-range-collection v-else>
        <e-bullet-range end="50" color="red"></e-bullet-range>
        <e-bullet-range end="75" color="yellow"></e-bullet-range>
        <e-bullet-range end="100" color="green"></e-bullet-range>
      </e-bullet-range-collection>
    </ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const highStandards = ref(true)
const data = ref([{ value: 80, target: 75 }])

const toggleThresholds = () => {
  highStandards.value = !highStandards.value
}
</script>
```

### Dynamic Colors Based on Value

```vue
<script setup>
import { computed } from 'vue'

const performanceValue = ref(60)

const ranges = computed(() => {
  // Adjust colors based on actual performance
  if (performanceValue.value < 40) {
    return [
      { end: 40, color: '#FF6B6B' },  // Red
      { end: 70, color: '#FFA500' },  // Orange
      { end: 100, color: '#4CAF50' } // Green
    ]
  } else if (performanceValue.value < 70) {
    return [
      { end: 50, color: '#FF6B6B' },  // Shifted thresholds
      { end: 85, color: '#FFA500' },
      { end: 100, color: '#4CAF50' }
    ]
  } else {
    return [
      { end: 60, color: '#FF6B6B' },  // Higher standards
      { end: 90, color: '#FFA500' },
      { end: 100, color: '#4CAF50' }
    ]
  }
})
</script>

<template>
  <div>
    <!-- Render ranges dynamically -->
    <ejs-bulletchart>
      <e-bullet-range-collection>
        <e-bullet-range
          v-for="(range, idx) in ranges"
          :key="idx"
          :end="range.end"
          :color="range.color"
        ></e-bullet-range>
      </e-bullet-range-collection>
    </ejs-bulletchart>
  </div>
</template>
```

## Best Practices

### 1. Semantic Color Meaning
✅ **Good:** Red=bad, Yellow=warning, Green=good (universal)
❌ **Bad:** Random color combinations that confuse users

### 2. Sufficient Contrast
- Ranges should be visually distinct
- Test color combinations for color-blind users
- Use tools like WebAIM contrast checker

### 3. Limit Range Count
✅ **Good:** 3-4 ranges (easy to interpret)
❌ **Bad:** 10+ ranges (confusing and hard to distinguish)

### 4. Align with Business Logic
- Ranges should match actual performance thresholds
- Document why each threshold exists
- Update ranges when business goals change

### 5. Consider Opacity
- Opaque ranges (1.0) for emphasis
- Semi-transparent (0.6-0.7) for background context
- Avoid very light ranges (< 0.3 opacity) - hard to see

### 6. Accessibility
- Don't rely on color alone - include values/labels
- Ensure sufficient color contrast (WCAG AA: 4.5:1)
- Test for colorblind accessibility (protanopia, deuteranopia, tritanopia)

### 7. Documentation
Explain your range meanings:

```vue
<template>
  <div>
    <h2>Performance Ranges</h2>
    <ul>
      <li><span style="color: red">●</span> Poor: 0-50% (Action required)</li>
      <li><span style="color: orange">●</span> Fair: 50-75% (Monitor closely)</li>
      <li><span style="color: green">●</span> Good: 75-100% (On target)</li>
    </ul>
    <ejs-bulletchart><!-- Chart here --></ejs-bulletchart>
  </div>
</template>
```

---

**Next:** Proceed to [tooltip-interaction.md](tooltip-interaction.md) to enable interactive tooltips on your chart.
