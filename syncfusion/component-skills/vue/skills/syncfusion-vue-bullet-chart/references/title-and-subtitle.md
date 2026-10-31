# Title & Subtitle Customization

## Table of Contents
- [Title Basics](#title-basics)
- [Subtitle](#subtitle)
- [Title Positioning](#title-positioning)
- [Title Styling](#title-styling)
- [Subtitle Styling](#subtitle-styling)
- [Label Formatting](#label-formatting)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)

## Title Basics

Add a descriptive title using the `title` property:

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    valueField="value"
    targetField="target"
    title="Sales Performance"  <!-- Simple title -->
  ></ejs-bulletchart>
</template>

<script setup>
const data = [{ value: 85, target: 80 }]
</script>
```

**Result:** Chart displays "Sales Performance" as the title.

### Title Requirements

- **String property:** `title="Your Chart Title"`
- **Placement:** Appears above (default) the chart
- **Required:** Optional - if omitted, chart displays without title
- **Character limit:** No strict limit, but keep under 100 characters for readability

### Dynamic Titles

Update title based on data or user selection:

```vue
<template>
  <div>
    <select v-model="selectedMetric">
      <option value="sales">Sales Performance</option>
      <option value="revenue">Revenue Target</option>
      <option value="efficiency">Efficiency Rating</option>
    </select>

    <ejs-bulletchart
      :dataSource="data"
      :title="chartTitles[selectedMetric]"
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMetric = ref('sales')
const chartTitles = {
  sales: 'Sales Performance',
  revenue: 'Revenue Target',
  efficiency: 'Efficiency Rating'
}

const data = [{ value: 85, target: 80 }]
</script>
```

## Subtitle

Add secondary information using the `subtitle` property:

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    valueField="value"
    targetField="target"
    title="Revenue"
    subtitle="(in thousands USD)"  <!-- Subtitle for additional context -->
  ></ejs-bulletchart>
</template>

<script setup>
const data = [{ value: 450, target: 400 }]
</script>
```

**Result:**
```
         Revenue
    (in thousands USD)
```

### Subtitle Use Cases

| Use Case | Subtitle Example |
|----------|-----------------|
| Unit specification | "(in thousands USD)", "(Percentage %)" |
| Time period | "(Q1 2024)", "(January - March)" |
| Additional info | "(vs target)", "(actual vs goal)" |
| Data source | "(Last updated: 2 hours ago)" |

### Dynamic Subtitle

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('monthly')
const chartData = ref([{ value: 85, target: 80 }])

const subtitle = computed(() => {
  const periods = {
    daily: '(Daily metrics)',
    weekly: '(Week of Mar 17-23)',
    monthly: '(March 2024)',
    quarterly: '(Q1 2024)'
  }
  return periods[selectedPeriod.value]
})
</script>

<template>
  <ejs-bulletchart
    :dataSource="chartData"
    title="Performance Metrics"
    :subtitle="subtitle"
  ></ejs-bulletchart>
</template>
```

## Title Positioning

Control where the title appears using `titlePosition` property:

```vue
<ejs-bulletchart
  titlePosition="Top"      <!-- Top (default) -->
  title="Sales Rate"
></ejs-bulletchart>
```

### Position Options

**Option 1: Top (Default)**

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    title="Sales Rate"
    titlePosition="Top"
  >
    <e-bullet-range-collection>
      <e-bullet-range end="35" color="red"></e-bullet-range>
      <e-bullet-range end="50" color="blue"></e-bullet-range>
      <e-bullet-range end="100" color="green"></e-bullet-range>
    </e-bullet-range-collection>
  </ejs-bulletchart>
</template>

<script setup>
const data = [{ value: 55, target: 45 }]
</script>
```

**Visual Result:**
```
        Sales Rate
[==|======] 55 vs 45
```

**Option 2: Bottom**

```vue
<ejs-bulletchart
  :dataSource="data"
  title="Sales Rate"
  titlePosition="Bottom"
></ejs-bulletchart>
```

**Visual Result:**
```
[==|======] 55 vs 45
        Sales Rate
```

**Option 3: Left**

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    title="Sales Rate"
    titlePosition="Left"
    width="20%"   <!-- Narrow width to fit left positioning -->
  ></ejs-bulletchart>
</template>
```

**Visual Result:**
```
Sales
Rate
[=|==] 55 vs 45
```

**Option 4: Right**

```vue
<ejs-bulletchart
  :dataSource="data"
  title="Sales Rate"
  titlePosition="Right"
  width="20%"
></ejs-bulletchart>
```

**Visual Result:**
```
[=|==] 55 vs 45
Sales
Rate
```

### Choosing Title Position

| Position | Use When | Example |
|----------|----------|---------|
| **Top** | Standard layout, dashboards | Most common |
| **Bottom** | Space-constrained header area | Limited top space |
| **Left** | Vertical stacked charts | Multiple narrow bullets |
| **Right** | Compact horizontal layout | Side-by-side arrangement |

## Title Styling

Customize title appearance with `titleStyle` object:

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    title="Revenue Performance"
    :titleStyle="titleStyle"
  ></ejs-bulletchart>
</template>

<script setup>
const data = [{ value: 450, target: 400 }]

const titleStyle = {
  color: '#1e90ff',        // Font color
  size: '20px',            // Font size
  fontFamily: 'Arial',     // Font family
  fontWeight: 'bold',      // Font weight
  opacity: 1              // Opacity (0-1)
}
</script>
```

### Title Style Properties

| Property | Type | Example | Purpose |
|----------|------|---------|---------|
| `color` | String | `'#FF6B6B'`, `'red'` | Title text color |
| `size` | String | `'18px'`, `'1.5em'` | Font size |
| `fontFamily` | String | `'Arial'`, `'Verdana'` | Font family |
| `fontWeight` | String | `'bold'`, `'normal'`, `'700'` | Font weight |
| `opacity` | Number | `0.5`, `0.8` | Transparency (0-1) |

### Title Styling Examples

**Example 1: Bold Blue Title**

```vue
<script setup>
const titleStyle = {
  color: '#0066cc',
  size: '22px',
  fontWeight: 'bold'
}
</script>

<template>
  <ejs-bulletchart
    title="Sales Dashboard"
    :titleStyle="titleStyle"
  ></ejs-bulletchart>
</template>
```

**Example 2: Large Serif Title**

```vue
<script setup>
const titleStyle = {
  color: '#333333',
  size: '24px',
  fontFamily: 'Georgia, serif',
  fontWeight: '600'
}
</script>
```

**Example 3: Subtle Gray Title**

```vue
<script setup>
const titleStyle = {
  color: '#888888',
  size: '16px',
  fontFamily: 'Segoe UI',
  opacity: 0.8
}
</script>
```

**Example 4: Themed Title Matching Brand**

```vue
<script setup>
// Brand colors
const brandColor = '#FF6B35'  // Brand orange

const titleStyle = {
  color: brandColor,
  size: '20px',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  opacity: 1
}
</script>
```

## Subtitle Styling

Customize subtitle appearance with `subtitleStyle`:

```vue
<template>
  <ejs-bulletchart
    title="Revenue"
    subtitle="(in thousands USD)"
    :subtitleStyle="subtitleStyle"
  ></ejs-bulletchart>
</template>

<script setup>
const subtitleStyle = {
  color: '#666666',      // Lighter gray for secondary text
  size: '14px',          // Smaller than title
  fontFamily: 'Arial',
  fontWeight: 'normal',
  opacity: 0.8
}
</script>
```

### Subtitle Best Practices

- **Smaller size:** Subtitle should be smaller than title (14-16px vs 18-24px)
- **Lighter color:** Use gray or muted color instead of title color
- **Lower emphasis:** Font weight should be normal, not bold
- **Optional opacity:** Can use `opacity: 0.7-0.9` for subtle effect

## Label Formatting

Format axis labels using `labelFormat`:

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :minimum="0"
    :maximum="500"
    :interval="100"
    labelFormat="${value}K"  <!-- Display as $0K, $100K, $200K, etc -->
    title="Annual Revenue"
  ></ejs-bulletchart>
</template>

<script setup>
const data = [{ value: 450, target: 400 }]
</script>
```

### Label Format Examples

| Format | Input | Output | Use Case |
|--------|-------|--------|----------|
| `"${value}K"` | 100 | `$100K` | Revenue in thousands |
| `"{value}%"` | 85 | `85%` | Percentage |
| `"{value}ms"` | 250 | `250ms` | Milliseconds |
| `"{value}GB"` | 50 | `50GB` | Storage |
| `"${value}M"` | 2.5 | `$2.5M` | Revenue in millions |

### Dynamic Label Formatting

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedUnit = ref('percentage')

const labelFormat = computed(() => {
  const formats = {
    percentage: '{value}%',
    currency: '${value}K',
    hours: '{value}h',
    count: '{value} items'
  }
  return formats[selectedUnit.value]
})

const data = [{ value: 85, target: 80 }]
</script>

<template>
  <div>
    <select v-model="selectedUnit">
      <option value="percentage">Percentage</option>
      <option value="currency">Currency (K)</option>
      <option value="hours">Hours</option>
      <option value="count">Count</option>
    </select>

    <ejs-bulletchart
      :dataSource="data"
      :labelFormat="labelFormat"
    ></ejs-bulletchart>
  </div>
</template>
```

## Common Patterns

### Pattern 1: Complete Title & Subtitle Setup

```vue
<template>
  <ejs-bulletchart
    :dataSource="metrics"
    valueField="actual"
    targetField="target"
    title="Q1 2024 Performance"
    subtitle="Sales Team Metrics"
    titlePosition="Top"
    :titleStyle="{ color: '#0066cc', size: '22px', fontWeight: 'bold' }"
    :subtitleStyle="{ color: '#666666', size: '14px', fontWeight: 'normal' }"
    :minimum="0"
    :maximum="100"
    labelFormat="{value}%"
  ></ejs-bulletchart>
</template>

<script setup>
const metrics = [{ actual: 85, target: 80 }]
</script>
```

### Pattern 2: Dashboard with Consistent Styling

```vue
<script setup>
// Shared title styles
const dashboardTitleStyle = {
  color: '#1a1a1a',
  size: '20px',
  fontFamily: 'Segoe UI',
  fontWeight: 'bold'
}

const dashboardSubtitleStyle = {
  color: '#666666',
  size: '13px',
  fontFamily: 'Segoe UI',
  fontWeight: 'normal'
}

const metrics = [
  { name: 'Sales', actual: 450, target: 400, unit: '$K' },
  { name: 'Efficiency', actual: 92, target: 85, unit: '%' },
  { name: 'Support', actual: 1250, target: 1000, unit: 'tickets' }
]
</script>

<template>
  <div class="dashboard">
    <ejs-bulletchart
      v-for="metric in metrics"
      :key="metric.name"
      :dataSource="[{ actual: metric.actual, target: metric.target }]"
      :title="metric.name"
      :subtitle="`(in ${metric.unit})`"
      :titleStyle="dashboardTitleStyle"
      :subtitleStyle="dashboardSubtitleStyle"
    ></ejs-bulletchart>
  </div>
</template>
```

### Pattern 3: Time-Based Title

```vue
<script setup>
import { ref, computed } from 'vue'

const data = ref([{ value: 85, target: 80 }])
const currentPeriod = ref('monthly')

const chartTitle = computed(() => {
  const date = new Date()
  const periods = {
    daily: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    weekly: `Week of ${date.toLocaleDateString()}`,
    monthly: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    yearly: date.getFullYear().toString()
  }
  return `Performance - ${periods[currentPeriod.value]}`
})
</script>

<template>
  <ejs-bulletchart
    :dataSource="data"
    :title="chartTitle"
  ></ejs-bulletchart>
</template>
```

## Best Practices

### 1. Clear, Descriptive Titles
✅ **Good:** "Q1 Sales Target", "Monthly Revenue vs Budget"
❌ **Bad:** "Chart", "Data", "Metrics"

### 2. Concise Titles
✅ **Good:** "Annual Revenue" (3 words)
❌ **Bad:** "Comparison of Actual versus Target Annual Revenue Performance for the Current Fiscal Year" (14 words)

### 3. Units in Subtitle
✅ **Good:**
```
Title: "Revenue"
Subtitle: "(in thousands USD)"
```
❌ **Bad:**
```
Title: "Revenue in thousands USD"
```

### 4. Consistent Styling
- Use same title colors across dashboard
- Maintain consistent font families
- Size titles proportionally to content

### 5. Responsive Titles
- Keep titles short for mobile
- Use subtitle for details
- Avoid position="Left/Right" on small screens

### 6. Accessibility
- Use sufficient color contrast (WCAG AA: 4.5:1 minimum)
- Don't rely on color alone to convey meaning
- Keep text size ≥ 12px for readability

---

**Next:** Proceed to [ranges-and-colors.md](ranges-and-colors.md) to learn about quality ranges and color customization.
