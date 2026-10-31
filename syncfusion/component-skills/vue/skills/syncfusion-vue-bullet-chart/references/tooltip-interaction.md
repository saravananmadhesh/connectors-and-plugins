# Tooltip & Interaction

## Table of Contents
- [Tooltip Basics](#tooltip-basics)
- [Enable Tooltips](#enable-tooltips)
- [Module Injection](#module-injection)
- [Tooltip Configuration](#tooltip-configuration)
- [Tooltip Formatting](#tooltip-formatting)
- [Custom Tooltip Templates](#custom-tooltip-templates)
- [Keyboard Navigation](#keyboard-navigation)
- [Print Functionality](#print-functionality)
- [Troubleshooting](#troubleshooting)

## Tooltip Basics

Tooltips display additional information when users hover over the chart. They show actual and target values with customizable formatting.

### Default Tooltip Behavior

```
When user hovers over value bar or target line:
┌──────────────────────┐
│ Value: 270           │
│ Target: 250          │
└──────────────────────┘
```

### Requirements for Tooltips

1. ✅ **Enable tooltip** - Set `tooltip: { enable: true }`
2. ✅ **Inject module** - Add `BulletTooltip` to provide
3. ✅ **Import module** - Import `BulletTooltip` from '@syncfusion/ej2-vue-charts'

## Enable Tooltips

### Vue 2 - Options API

```vue
<template>
  <div>
    <ejs-bulletchart
      id="bulletChart"
      :dataSource="data"
      valueField="value"
      targetField="target"
      :tooltip="tooltip"  <!-- Enable tooltip -->
    ></ejs-bulletchart>
  </div>
</template>

<script>
import { BulletChartComponent, BulletTooltip } from '@syncfusion/ej2-vue-charts'

export default {
  components: {
    'ejs-bulletchart': BulletChartComponent
  },
  provide: {
    bulletChart: [BulletTooltip]  // Inject tooltip module
  },
  data() {
    return {
      data: [{ value: 270, target: 250 }],
      tooltip: { enable: true }  // Enable tooltips
    }
  }
}
</script>
```

### Vue 3 - Composition API (Script Setup)

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    valueField="value"
    targetField="target"
    :tooltip="tooltip"
  ></ejs-bulletchart>
</template>

<script setup>
import { ref, provide } from 'vue'
import { BulletChartComponent as EjsBulletchart, BulletTooltip } from '@syncfusion/ej2-vue-charts'

// Inject tooltip module for this component
provide('bulletChart', [BulletTooltip])

const data = ref([{ value: 270, target: 250 }])
const tooltip = ref({ enable: true })
</script>
```

### Vue 3 - Options API

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :tooltip="tooltip"
  ></ejs-bulletchart>
</template>

<script>
import { BulletChartComponent, BulletTooltip } from '@syncfusion/ej2-vue-charts'

export default {
  components: {
    'ejs-bulletchart': BulletChartComponent
  },
  provide() {
    return {
      bulletChart: [BulletTooltip]
    }
  },
  data() {
    return {
      data: [{ value: 270, target: 250 }],
      tooltip: { enable: true }
    }
  }
}
</script>
```

## Module Injection

The `BulletTooltip` module MUST be injected to use tooltips.

### What is Module Injection?

Syncfusion uses modular architecture. Features like tooltips are separate modules that must be explicitly "injected" or enabled.

### How to Inject

**Step 1: Import the module**
```javascript
import { BulletTooltip } from '@syncfusion/ej2-vue-charts'
```

**Step 2: Inject using provide**
```javascript
provide: {
  bulletChart: [BulletTooltip]  // Inject tooltip
}
```

### Multiple Modules (Future Use)

If you inject multiple modules (though BulletChart only has tooltip):

```javascript
provide: {
  bulletChart: [BulletTooltip, OtherModule]  // Array of modules
}
```

## Tooltip Configuration

Configure tooltip behavior and appearance:

```vue
<script setup>
const tooltip = {
  enable: true,                           // Enable/disable tooltips
  format: 'Value: {value}, Target: {target}',  // Custom format
  textStyle: {                            // Text styling
    color: '#333',
    fontFamily: 'Arial',
    fontSize: '14px'
  }
}
</script>

<template>
  <ejs-bulletchart :tooltip="tooltip"></ejs-bulletchart>
</template>
```

### Tooltip Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `enable` | Boolean | Show/hide tooltip | `true`, `false` |
| `format` | String | Custom format string | `'Value: {value}'` |
| `textStyle` | Object | Text styling (color, font) | `{ color: '#000' }` |

## Tooltip Formatting

Use format strings to customize tooltip content:

### Available Format Variables

| Variable | Represents | Example |
|----------|------------|---------|
| `{value}` | Actual value | `270` |
| `{target}` | Target value | `250` |
| `{category}` | Category name (if set) | `Q1 Sales` |
| `<br>` | Line break | Text on new line |

### Format Examples

**Example 1: Simple Format**

```vue
<script setup>
const tooltip = {
  enable: true,
  format: 'Actual: {value}, Target: {target}'
}
</script>
```

**Result on hover:**
```
Actual: 270, Target: 250
```

**Example 2: Multi-Line Format**

```vue
<script setup>
const tooltip = {
  enable: true,
  format: 'Value: {value}<br>Target: {target}<br>Category: {category}'
}
</script>
```

**Result on hover:**
```
Value: 270
Target: 250
Category: Q1 Sales
```

**Example 3: Currency Format**

```vue
<script setup>
const tooltip = {
  enable: true,
  format: 'Revenue: ${value}K<br>Target: ${target}K'
}
</script>
```

**Result on hover:**
```
Revenue: $270K
Target: $250K
```

**Example 4: Percentage Format**

```vue
<script setup>
const tooltip = {
  enable: true,
  format: 'Performance: {value}%<br>Goal: {target}%'
}
</script>
```

**Result on hover:**
```
Performance: 85%
Goal: 80%
```

**Example 5: Complex Format with Calculation**

Since you can't do calculations in format strings directly, compute in component:

```vue
<template>
  <ejs-bulletchart
    :dataSource="chartData"
    :tooltip="tooltip"
  ></ejs-bulletchart>
</template>

<script setup>
import { ref, computed } from 'vue'

const rawData = [{ value: 270, target: 250 }]

const chartData = computed(() => 
  rawData.map(item => ({
    value: item.value,
    target: item.target,
    variance: item.value - item.target,  // Add computed field
    percentage: ((item.value / item.target) * 100).toFixed(1)
  }))
)

const tooltip = {
  enable: true,
  format: 'Value: {value}<br>Target: {target}<br>Variance: {variance} ({percentage}%)'
}
</script>
```

## Custom Tooltip Templates

Create HTML templates for advanced tooltip designs:

### Basic Template

```vue
<template>
  <div id="app">
    <!-- Tooltip template -->
    <div id="tooltipTemplate" style="display:none">
      <table>
        <tr><td>Value:</td><td>${value}</td></tr>
        <tr><td>Target:</td><td>${target}</td></tr>
      </table>
    </div>

    <!-- Bullet Chart -->
    <ejs-bulletchart
      :dataSource="data"
      :tooltip="tooltip"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref([{ value: 270, target: 250 }])

const tooltip = {
  enable: true,
  template: '#tooltipTemplate'  // Reference template by ID
}
</script>

<style>
#tooltipTemplate {
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  font-family: Arial;
}

#tooltipTemplate table {
  border-collapse: collapse;
}

#tooltipTemplate td {
  padding: 4px 8px;
}
</style>
```

### Styled Template

```vue
<template>
  <div>
    <div id="bulletTooltip" style="display:none">
      <div style="background:#f0f0f0; padding:10px; border-radius:4px">
        <strong>${category}</strong>
        <hr style="margin: 4px 0">
        <p style="margin: 0">
          <span style="color:#2196F3">● Actual:</span> ${value}
        </p>
        <p style="margin: 0">
          <span style="color:#FF9800">● Target:</span> ${target}
        </p>
      </div>
    </div>

    <ejs-bulletchart
      :dataSource="multiData"
      categoryField="name"
      :tooltip="{ enable: true, template: '#bulletTooltip' }"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const multiData = ref([
  { name: 'Sales', value: 85, target: 80 },
  { name: 'Support', value: 92, target: 85 }
])
</script>
```

## Keyboard Navigation

The Bullet Chart supports keyboard navigation:

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| <kbd>Tab</kbd> | Focus next element |
| <kbd>Shift + Tab</kbd> | Focus previous element |
| <kbd>Ctrl + P</kbd> | Print the chart |

### Enable Keyboard Navigation

Keyboard navigation is enabled by default. No configuration needed.

```vue
<template>
  <ejs-bulletchart
    id="bulletChart"
    tabindex="0"  <!-- Make chart focusable -->
    :dataSource="data"
  ></ejs-bulletchart>
</template>

<script setup>
const data = ref([{ value: 85, target: 80 }])
</script>
```

### Testing Keyboard Navigation

1. Click on chart to focus it
2. Press <kbd>Tab</kbd> - focus moves to next interactive element
3. Press <kbd>Shift + Tab</kbd> - focus moves to previous element
4. Press <kbd>Ctrl + P</kbd> - browser print dialog opens

## Print Functionality

Users can print the chart using <kbd>Ctrl + P</kbd> when chart has focus.

### Configure Print Settings

```vue
<template>
  <div>
    <button @click="printChart">Print Chart</button>

    <ejs-bulletchart
      ref="chartRef"
      :dataSource="data"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chartRef = ref(null)

const printChart = () => {
  // Programmatically trigger print
  if (chartRef.value) {
    chartRef.value.print()  // Call print method
  }
}

const data = ref([{ value: 270, target: 250 }])
</script>
```

### Print Best Practices

1. **Ensure readable fonts** - Use minimum 12px for printed output
2. **Use appropriate colors** - Colors may not print well; test before deployment
3. **Include titles** - Ensure chart title appears in print
4. **Test print preview** - Verify layout in browser print preview

## Common Tooltip Patterns

### Pattern 1: Basic Tooltip with Currency

```vue
<template>
  <ejs-bulletchart
    :dataSource="salesData"
    valueField="actual"
    targetField="target"
    :tooltip="{ enable: true, format: 'Actual: ${value}K, Target: ${target}K' }"
  ></ejs-bulletchart>
</template>

<script setup>
const salesData = ref([{ actual: 450, target: 400 }])
</script>
```

### Pattern 2: Tooltip with Category

```vue
<template>
  <ejs-bulletchart
    :dataSource="employees"
    valueField="performance"
    targetField="expected"
    categoryField="name"
    :tooltip="{ 
      enable: true, 
      format: '{category}<br>Performance: {value}, Expected: {target}' 
    }"
  ></ejs-bulletchart>
</template>

<script setup>
const employees = ref([
  { name: 'John', performance: 85, expected: 80 },
  { name: 'Sarah', performance: 92, expected: 85 }
])
</script>
```

### Pattern 3: Dashboard with Styled Tooltips

```vue
<template>
  <div id="dashboardTooltip" style="display:none">
    <div style="
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px;
      border-radius: 6px;
      min-width: 180px;
      font-weight: 500;
    ">
      <div style="margin-bottom: 4px">${category}</div>
      <div>Actual: <strong>${value}</strong></div>
      <div>Target: <strong>${target}</strong></div>
    </div>
  </div>

  <div class="dashboard">
    <ejs-bulletchart
      v-for="metric in metrics"
      :key="metric.id"
      :dataSource="[metric]"
      :title="metric.title"
      :tooltip="{ enable: true, template: '#dashboardTooltip' }"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
const metrics = ref([
  { id: 1, title: 'Sales', category: 'Q1 Sales', value: 450, target: 400 },
  { id: 2, title: 'Support', category: 'Tickets', value: 1250, target: 1000 }
])
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
```

## Troubleshooting

### Issue 1: Tooltip Not Appearing

**Problem:** Hover over chart but no tooltip shows.

**Checklist:**
1. ✅ Is `tooltip.enable` set to `true`?
2. ✅ Is `BulletTooltip` imported?
3. ✅ Is `BulletTooltip` injected in `provide`?
4. ✅ Are you using Vue 2 with `provide/inject` or Vue 3 with `provide`?

**Solution:**
```vue
<script setup>
import { provide } from 'vue'
import { BulletTooltip } from '@syncfusion/ej2-vue-charts'

// Don't forget to inject!
provide('bulletChart', [BulletTooltip])

const tooltip = { enable: true }  // Must be true!
</script>
```

### Issue 2: Custom Format Not Working

**Problem:** Format string not applied, default format shown instead.

**Solutions:**
1. **Check format property** - Ensure you set `format` property in tooltip object
2. **Use correct placeholders** - Must be `{value}`, `{target}`, `{category}`
3. **Test with simple format** - Start with basic: `'Value: {value}'`

```vue
<!-- ❌ Wrong - format ignored -->
<ejs-bulletchart :tooltip="{ enable: true }"></ejs-bulletchart>

<!-- ✅ Correct -->
<ejs-bulletchart :tooltip="{ enable: true, format: 'Value: {value}' }"></ejs-bulletchart>
```

### Issue 3: Template Not Rendering

**Problem:** Custom template defined but not showing.

**Solutions:**
1. **Template ID** - Reference template by correct ID: `template: '#tooltipTemplate'`
2. **Template visibility** - Hide template: `style="display:none"`
3. **Template exists** - Define template BEFORE chart component

```vue
<!-- ✅ Correct order -->
<div id="template" style="display:none">...</div>
<ejs-bulletchart :tooltip="{ template: '#template' }"></ejs-bulletchart>

<!-- ❌ Wrong order -->
<ejs-bulletchart :tooltip="{ template: '#template' }"></ejs-bulletchart>
<div id="template" style="display:none">...</div>
```

### Issue 4: Keyboard Navigation Not Working

**Problem:** <kbd>Ctrl + P</kbd> doesn't print, <kbd>Tab</kbd> doesn't navigate.

**Solutions:**
1. **Chart must be focused** - Click chart first to give it focus
2. **Chart must have tabindex** - Add `tabindex="0"` to make focusable
3. **Check browser permissions** - Some browsers restrict print via keyboard

```vue
<ejs-bulletchart tabindex="0"></ejs-bulletchart>
```

---

**Next:** Proceed to [customization-and-orientation.md](customization-and-orientation.md) to learn about chart layout and styling options.
