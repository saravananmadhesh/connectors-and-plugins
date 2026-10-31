# Dashboard Layout Panel Templates (Vue 3)

## Table of Contents
- [Header Templates](#header-templates)
- [Content Templates](#content-templates)
- [Embedding Charts and DataGrids](#embedding-charts-and-datagrids)
- [Dynamic Content Updates](#dynamic-content-updates)
- [Template Best Practices](#template-best-practices)

## Header Templates

### String Header

The simplest header format is a plain text string.

```vue
<script setup>
const panels = ref([
  { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 1, header: 'Sales', content: 'Sales data' }
]);
</script>
```

### HTML String Header

Use HTML strings for richer header content.

```vue
<script setup>
const panels = ref([
  {
    id: 'p1',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: '<span class="panel-icon">📊</span> Analytics',
    content: 'Content here'
  }
]);
</script>
```

### Interactive Header with Close Button

```vue
<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const panels = ref([
  {
    id: 'p1',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: () => {
      const el = document.createElement('div');
      el.className = 'panel-header-custom';
      el.innerHTML = `
        <span class="header-text">Sales Overview</span>
        <span class="e-icons e-close header-close"></span>
      `;
      el.querySelector('.header-close')?.addEventListener('click', () => {
        dashboardRef.value?.removePanel('p1');
      });
      return el;
    },
    content: 'Sales data content'
  }
]);
</script>
```

## Content Templates

### HTML String Content

Use HTML strings for static content.

```vue
<script setup>
const panels = ref([
  {
    id: 'p1',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 2,
    header: 'Sales',
    content: `
      <div style="padding: 20px;">
        <h3>Total: $150,000</h3>
        <p>This month's revenue</p>
        <button class="btn">View Details</button>
      </div>
    `
  }
]);
</script>
```

### Function-Based Content

Use a function that returns an HTMLElement for dynamic, interactive content.

```vue
<script setup>
import { ref, h } from 'vue';

const counter = ref(0);

const panels = ref([
  {
    id: 'counter',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Counter',
    content: () => {
      const wrapper = document.createElement('div');
      wrapper.style.padding = '20px';
      wrapper.innerHTML = `
        <h3>Count: <span class="count">${counter.value}</span></h3>
        <button class="increment-btn">Increment</button>
      `;
      wrapper.querySelector('.increment-btn')?.addEventListener('click', () => {
        counter.value++;
        wrapper.querySelector('.count').textContent = counter.value;
      });
      return wrapper;
    }
  }
]);
</script>
```

## Embedding Charts and DataGrids

### Embedding a Chart in a Panel

```vue
<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    :columns="5"
    :panels="panels"
  />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';
import { ChartComponent } from '@syncfusion/ej2-vue-charts';

const dashboardRef = ref(null);

const chartData = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 },
  { month: 'Jun', sales: 38 }
];

const panels = ref([
  {
    id: 'chart-panel',
    row: 0,
    col: 0,
    sizeX: 3,
    sizeY: 2,
    header: 'Monthly Sales',
    content: () => {
      const el = document.createElement('div');
      el.id = 'chart-mount';
      el.style.height = '100%';
      el.style.width = '100%';
      return el;
    }
  }
]);

onMounted(async () => {
  await nextTick();
  // After dashboard renders, mount chart into panel
  const mount = document.getElementById('chart-mount');
  if (mount) {
    const { createApp } = await import('vue');
    const app = createApp({
      components: { ChartComponent },
      template: `
        <ChartComponent
          :dataSource="data"
          primaryXAxis="primaryXAxis"
          primaryYAxis="primaryYAxis"
        >
          <SeriesCollectionDirective>
            <SeriesDirective type="Column" xName="month" yName="sales" />
          </SeriesCollectionDirective>
        </ChartComponent>
      `,
      data() {
        return {
          data: chartData,
          primaryXAxis: { valueType: 'Category' },
          primaryYAxis: {}
        };
      }
    });
    app.mount(mount);
  }
});
</script>
```

### Embedding a DataGrid

```vue
<template>
  <DashboardLayoutComponent :panels="panels" />
</template>

<script setup>
const salesData = [
  { id: 1, product: 'Widget A', revenue: 1200 },
  { id: 2, product: 'Widget B', revenue: 1800 },
  { id: 3, product: 'Widget C', revenue: 900 }
];

const panels = ref([
  {
    id: 'grid-panel',
    row: 0,
    col: 0,
    sizeX: 4,
    sizeY: 2,
    header: 'Sales Data',
    content: () => {
      const wrapper = document.createElement('div');
      wrapper.style.padding = '16px';
      wrapper.innerHTML = `
        <table class="grid-table">
          <thead><tr><th>Product</th><th>Revenue</th></tr></thead>
          <tbody>
            ${salesData.map(r => `<tr><td>${r.product}</td><td>$${r.revenue}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
      return wrapper;
    }
  }
]);
</script>
```

## Dynamic Content Updates

### Using updatePanel Method

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const dashboardRef = ref(null);
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    const timestamp = new Date().toLocaleTimeString();
    dashboardRef.value?.updatePanel({
      id: 'live-panel',
      content: `<div style="padding: 20px;"><h3>${timestamp}</h3></div>`
    });
  }, 1000);
});

onUnmounted(() => clearInterval(interval));
</script>
```

### Reactive Panels with Computed

```vue
<script setup>
import { ref, computed } from 'vue';

const liveData = ref(0);

const panels = computed(() => [
  {
    id: 'live-data',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Live Counter',
    content: `<div style="padding: 20px;"><h3>Count: ${liveData.value}</h3></div>`
  }
]);

// Update liveData elsewhere and computed will re-emit new panel definitions
</script>
```

## Template Best Practices

### 1. Use Computed for Derived Panels

```vue
<script setup>
import { ref, computed } from 'vue';

const user = ref({ name: 'John', role: 'Admin' });
const panels = computed(() => [
  {
    id: 'user-panel',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: `${user.value.name}'s Dashboard`,
    content: `<div>Role: ${user.value.role}</div>`
  }
]);
</script>
```

### 2. Sanitize User-Generated Content

When panel content includes user data, sanitize before rendering:

```vue
<script setup>
const safeContent = (text) => {
  const el = document.createElement('div');
  el.textContent = text;
  return el.innerHTML;
};

const userComment = '<script>alert("xss")</script>';
const panels = ref([
  {
    id: 'user',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'User Comment',
    content: `<div>${safeContent(userComment)}</div>`
  }
]);
</script>
```

### 3. Avoid Heavy Computation in Template Functions

Move heavy logic out of content functions:

```vue
<script setup>
import { ref, computed } from 'vue';

const rawData = ref([1, 2, 3, 4, 5]);

const processedData = computed(() =>
  rawData.value.map(n => n * 2).reduce((a, b) => a + b, 0)
);

const panels = ref([
  {
    id: 'computed',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Processed',
    content: `<div>Total: ${processedData.value}</div>`
  }
]);
</script>
```

### 4. Use Unique IDs

Always assign unique IDs to avoid conflicts:

```vue
<script setup>
const panels = ref([
  { id: `panel-${Date.now()}-1`, row: 0, col: 0, sizeX: 2, sizeY: 1, content: 'A' },
  { id: `panel-${Date.now()}-2`, row: 0, col: 2, sizeX: 2, sizeY: 1, content: 'B' }
]);
</script>
```

**Next:** Learn about [styling and customization](dashboard-styling-customization.md) for CSS-based theming.
