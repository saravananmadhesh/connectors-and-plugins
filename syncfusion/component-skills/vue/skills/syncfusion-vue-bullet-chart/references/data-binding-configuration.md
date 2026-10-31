# Data Binding & Configuration

## Table of Contents
- [Data Binding Basics](#data-binding-basics)
- [Scale Configuration](#scale-configuration)
- [Single Bullet Chart](#single-bullet-chart)
- [Multiple Bullet Charts](#multiple-bullet-charts)
- [Field Mapping](#field-mapping)
- [Local Data Source](#local-data-source)
- [Remote Data Source](#remote-data-source)
- [Common Data Patterns](#common-data-patterns)
- [Edge Cases & Troubleshooting](#edge-cases--troubleshooting)

## Data Binding Basics

The Bullet Chart uses the `dataSource` property to bind data. Three key fields are essential:

| Property | Purpose | Required | Example |
|----------|---------|----------|---------|
| `dataSource` | Array of data objects | ✅ Yes | `[{value: 100, target: 80}]` |
| `valueField` | Maps actual value | ✅ Yes | `valueField="value"` |
| `targetField` | Maps target/comparative measure | ✅ Yes | `targetField="target"` |
| `categoryField` | Groups multiple bullets (optional) | ❌ No | `categoryField="category"` |

## Scale Configuration

Control the axis scale with these properties:

```vue
<ejs-bulletchart
  :minimum="0"      <!-- Scale starts at 0 -->
  :maximum="300"    <!-- Scale ends at 300 -->
  :interval="50"    <!-- Tick mark every 50 units -->
></ejs-bulletchart>
```

### Understanding the Scale

```
Scale: 0 -------- 50 -------- 100 -------- 150 -------- 200 -------- 250 -------- 300
       ^          ^          ^           ^           ^           ^           ^
     min      interval    interval    interval    interval    interval    max
```

**Best Practices:**
- **minimum:** Usually 0 unless displaying negative values
- **maximum:** Set 20-30% higher than highest expected value
- **interval:** Choose nice round numbers (10, 25, 50, 100)

### Example: KPI Scale Configuration

```vue
<script setup>
// For percentage KPI (0-100%)
const percentConfig = {
  minimum: 0,
  maximum: 100,
  interval: 20  // 0%, 20%, 40%, 60%, 80%, 100%
}

// For revenue in thousands (0-500k)
const revenueConfig = {
  minimum: 0,
  maximum: 500,
  interval: 50  // 0, 50k, 100k, 150k, ...
}

// For temperature (-10 to 50°C)
const temperatureConfig = {
  minimum: -10,
  maximum: 50,
  interval: 10  // -10, 0, 10, 20, ..., 50
}
</script>
```

## Single Bullet Chart

Display one metric with value and target:

### Basic Single Chart

```vue
<template>
  <ejs-bulletchart
    :dataSource="chartData"
    valueField="actual"
    targetField="goal"
    :minimum="0"
    :maximum="100"
    :interval="20"
    title="Q1 Sales Target"
  ></ejs-bulletchart>
</template>

<script setup>
import { ref } from 'vue'
import { BulletChartComponent as EjsBulletchart } from '@syncfusion/ej2-vue-charts'

const chartData = ref([
  { actual: 75, goal: 80 }
])
</script>
```

**Result:**
- Actual value bar: 75 (blue)
- Target line: 80 (black)
- Scale: 0 to 100, with intervals of 20

### With Label Formatting

```vue
<template>
  <ejs-bulletchart
    :dataSource="salesData"
    valueField="revenue"
    targetField="target"
    :minimum="0"
    :maximum="500"
    :interval="100"
    labelFormat="${value}K"    <!-- Display as $100K, $200K, etc -->
    title="Annual Revenue"
  ></ejs-bulletchart>
</template>

<script setup>
const salesData = ref([
  { revenue: 450, target: 400 }  // 450K actual vs 400K target
])
</script>
```

## Multiple Bullet Charts

Display multiple metrics using the `categoryField`:

### Multiple Metrics with Categories

```vue
<template>
  <ejs-bulletchart
    :dataSource="multipleMetrics"
    valueField="actual"
    targetField="target"
    categoryField="name"      <!-- Each row becomes a separate bullet -->
    :minimum="0"
    :maximum="100"
    :interval="25"
    height="400px"            <!-- Increase height for multiple charts -->
  ></ejs-bulletchart>
</template>

<script setup>
import { ref } from 'vue'

const multipleMetrics = ref([
  { name: 'Sales', actual: 85, target: 80 },
  { name: 'Support', actual: 92, target: 85 },
  { name: 'Development', actual: 78, target: 90 },
  { name: 'Marketing', actual: 88, target: 75 }
])
</script>
```

**Result:**
```
Sales       [====|==== ] 85 vs 80
Support     [========|= ] 92 vs 85
Development [=====|====== ] 78 vs 90
Marketing   [=======|== ] 88 vs 75
```

### Multiple Metrics with Different Scales

If metrics have different scales, create separate charts:

```vue
<template>
  <div class="metrics-dashboard">
    <!-- Chart 1: Percentage -->
    <ejs-bulletchart
      :dataSource="[{ actual: 75, target: 80 }]"
      valueField="actual"
      targetField="target"
      :minimum="0"
      :maximum="100"
      labelFormat="{value}%"
      title="Efficiency"
    ></ejs-bulletchart>

    <!-- Chart 2: Revenue in thousands -->
    <ejs-bulletchart
      :dataSource="[{ revenue: 450, goal: 400 }]"
      valueField="revenue"
      targetField="goal"
      :minimum="0"
      :maximum="500"
      labelFormat="${value}K"
      title="Revenue"
    ></ejs-bulletchart>

    <!-- Chart 3: Count -->
    <ejs-bulletchart
      :dataSource="[{ tickets: 1250, sla: 1500 }]"
      valueField="tickets"
      targetField="sla"
      :minimum="0"
      :maximum="2000"
      title="Support Tickets Handled"
    ></ejs-bulletchart>
  </div>
</template>
```

## Field Mapping

Map your data object fields to chart properties:

### Data Object

```javascript
const employee = {
  name: 'John',           // Category (for multiple bullets)
  performance: 85,        // Actual value
  expected: 80,          // Target value
  department: 'Sales'    // Additional metadata
}
```

### Chart Configuration

```vue
<ejs-bulletchart
  :dataSource="[employee]"
  valueField="performance"   <!-- Maps to employee.performance (85) -->
  targetField="expected"     <!-- Maps to employee.expected (80) -->
  categoryField="name"       <!-- Maps to employee.name (John) -->
></ejs-bulletchart>
```

### Complex Data Example

```javascript
const salesTeam = [
  {
    rep: 'Alice Johnson',
    q1: { actual: 250, target: 230 },
    region: 'North'
  },
  {
    rep: 'Bob Smith',
    q1: { actual: 180, target: 200 },
    region: 'South'
  }
]
```

**Issue:** Nested object structure won't work directly. **Solution:** Flatten data first:

```vue
<script setup>
const flattenedData = ref(
  salesTeam.map(item => ({
    name: item.rep,
    actual: item.q1.actual,
    target: item.q1.target,
    region: item.region
  }))
)
</script>

<template>
  <ejs-bulletchart
    :dataSource="flattenedData"
    valueField="actual"
    targetField="target"
    categoryField="name"
  ></ejs-bulletchart>
</template>
```

## Local Data Source

Bind inline data defined in your component:

### Vue 3 Composition API

```vue
<template>
  <ejs-bulletchart
    :dataSource="chartData"
    valueField="value"
    targetField="target"
  ></ejs-bulletchart>
</template>

<script setup>
import { ref, computed } from 'vue'

const baseData = [
  { value: 100, target: 80 },
  { value: 200, target: 180 },
  { value: 300, target: 280 }
]

// Static reference
const chartData = ref(baseData)

// Or compute dynamically
const chartData = computed(() => 
  baseData.map(item => ({
    ...item,
    value: item.value * 1.1  // Apply 10% increase
  }))
)
</script>
```

### Vue 2 Options API

```vue
<script>
export default {
  data() {
    return {
      chartData: [
        { value: 100, target: 80 },
        { value: 200, target: 180 },
        { value: 300, target: 280 }
      ]
    }
  }
}
</script>
```

## Remote Data Source

Fetch data from API and bind to chart:

### Fetch on Component Mount

```vue
<script setup>
import { ref, onMounted } from 'vue'

const chartData = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://api.example.com/metrics')
    if (!response.ok) throw new Error('API failed')
    chartData.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <p v-if="loading">Loading chart...</p>
    <p v-if="error" style="color: red">Error: {{ error }}</p>
    <ejs-bulletchart
      v-if="!loading && !error"
      :dataSource="chartData"
      valueField="actual"
      targetField="target"
    ></ejs-bulletchart>
  </div>
</template>
```

### Refresh Data Periodically

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const chartData = ref([])
let refreshInterval = null

const fetchData = async () => {
  try {
    const response = await fetch('/api/live-metrics')
    chartData.value = await response.json()
  } catch (err) {
    console.error('Failed to fetch data:', err)
  }
}

onMounted(() => {
  fetchData()  // Initial fetch
  refreshInterval = setInterval(fetchData, 5000)  // Refresh every 5 seconds
})

onUnmounted(() => {
  clearInterval(refreshInterval)
})
</script>

<template>
  <ejs-bulletchart
    :dataSource="chartData"
    valueField="actual"
    targetField="target"
  ></ejs-bulletchart>
</template>
```

## Common Data Patterns

### Pattern 1: Time Series Data

Track same metric over time:

```javascript
const monthlyRevenue = [
  { month: 'January', actual: 150, target: 140 },
  { month: 'February', actual: 165, target: 140 },
  { month: 'March', actual: 155, target: 140 }
]
```

### Pattern 2: Hierarchical Categories

Group by department, then by team:

```javascript
const teamPerformance = [
  { category: 'Engineering - Backend', actual: 92, target: 90 },
  { category: 'Engineering - Frontend', actual: 88, target: 90 },
  { category: 'QA - Automated', actual: 95, target: 85 },
  { category: 'QA - Manual', actual: 78, target: 85 }
]
```

### Pattern 3: Percentage-Based Metrics

```javascript
const completionRates = [
  { phase: 'Design', percentage: 100, goal: 100 },
  { phase: 'Development', percentage: 75, goal: 80 },
  { phase: 'Testing', percentage: 50, goal: 75 },
  { phase: 'Deployment', percentage: 0, goal: 50 }
]
```

### Pattern 4: Real-Time Monitoring

```javascript
const systemMetrics = [
  { component: 'API Server', uptime: 99.8, sla: 99.5 },
  { component: 'Database', uptime: 99.9, sla: 99.9 },
  { component: 'Cache', uptime: 98.5, sla: 99.0 }
]
```

## Edge Cases & Troubleshooting

### Edge Case 1: Value Exceeds Maximum

**Problem:** Actual value is greater than maximum

```javascript
const data = [
  { value: 350, target: 300 }  // value > maximum (300)
]
```

**Solution:** Adjust maximum to accommodate value:

```vue
<ejs-bulletchart
  :dataSource="data"
  :maximum="400"  <!-- Increased to fit value of 350 -->
  :interval="50"
></ejs-bulletchart>
```

### Edge Case 2: Null or Missing Values

**Problem:** Data contains null or undefined

```javascript
const data = [
  { value: null, target: 80 },      // null value
  { value: 100, target: undefined }  // undefined target
]
```

**Solution:** Validate and provide defaults:

```vue
<script setup>
const chartData = ref(
  rawData.map(item => ({
    value: item.value ?? 0,      // Default to 0 if null/undefined
    target: item.target ?? 50    // Default to 50
  }))
)
</script>
```

### Edge Case 3: Negative Values

**Problem:** Displaying negative values

```javascript
const data = [
  { value: -50, target: 0 }  // Loss/deficit
]
```

**Solution:** Set minimum to negative:

```vue
<ejs-bulletchart
  :dataSource="data"
  :minimum="-100"
  :maximum="100"
  :interval="25"
></ejs-bulletchart>
```

### Edge Case 4: Very Large Numbers

**Problem:** Large numbers reduce readability

```javascript
const data = [
  { value: 1500000, target: 1200000 }  // 1.5M vs 1.2M
]
```

**Solution:** Use label formatting to scale display:

```vue
<ejs-bulletchart
  :dataSource="data"
  :minimum="0"
  :maximum="2000000"
  :interval="500000"
  labelFormat="{value}M"  <!-- Display as 0.5M, 1M, 1.5M, 2M -->
></ejs-bulletchart>
```

### Edge Case 5: Empty Data Source

**Problem:** Chart receives empty array

```javascript
const data = ref([])  // Empty
```

**Solution:** Add loading state and provide fallback:

```vue
<script setup>
const chartData = ref([
  { value: 0, target: 0 }  // Fallback data
])
const hasData = ref(false)
</script>

<template>
  <div v-if="!hasData" class="placeholder">
    No data available yet
  </div>
  <ejs-bulletchart
    v-else
    :dataSource="chartData"
  ></ejs-bulletchart>
</template>
```

### Debugging Data Binding

```vue
<script setup>
// Log data before and after binding
const chartData = ref([...])

// Inspect actual values being passed
const debugData = computed(() => {
  console.log('Chart Data:', chartData.value)
  return chartData.value
})
</script>

<template>
  <div>
    <!-- Display data for verification -->
    <pre>{{ debugData }}</pre>
    <ejs-bulletchart :dataSource="debugData"></ejs-bulletchart>
  </div>
</template>
```

---

**Next:** Once data is bound, proceed to [title-and-subtitle.md](title-and-subtitle.md) to add descriptive titles to your chart.
