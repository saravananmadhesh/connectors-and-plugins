# Dashboard Layout Advanced Features (Vue 3)

## Table of Contents
- [Dynamic Panel Creation and Removal](#dynamic-panel-creation-and-removal)
- [Custom CSS Classes per Panel](#custom-css-classes-per-panel)
- [Header and Content Templates](#header-and-content-templates)
- [Performance Optimization](#performance-optimization)
- [Pinia/Vuex Integration](#piniavuex-integration)
- [API Integration for Save/Load](#api-integration-for-saveload)

## Dynamic Panel Creation and Removal

### Adding Panels from User Input

```vue
<template>
  <div>
    <div class="controls">
      <input v-model="newHeader" placeholder="Panel title" />
      <select v-model="newType">
        <option value="chart">Chart</option>
        <option value="grid">Grid</option>
        <option value="text">Text</option>
      </select>
      <button @click="addCustomPanel">Add</button>
    </div>
    <DashboardLayoutComponent ref="dashboardRef" :panels="panels" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);
const newHeader = ref('');
const newType = ref('text');
const panels = ref([]);
let counter = 0;

const addCustomPanel = () => {
  if (!newHeader.value) return;
  counter++;
  const id = `panel-${Date.now()}`;

  let content = '';
  switch (newType.value) {
    case 'chart':
      content = `<div class="chart-placeholder">📊 ${newHeader.value}</div>`;
      break;
    case 'grid':
      content = `<table class="grid-placeholder"><tr><th>Col 1</th><th>Col 2</th></tr><tr><td>Data</td><td>Data</td></tr></table>`;
      break;
    default:
      content = `<div class="text-placeholder">${newHeader.value} content</div>`;
  }

  // Find next available position
  const position = findNextPosition();

  dashboardRef.value?.addPanel({
    id,
    row: position.row,
    col: position.col,
    sizeX: 2,
    sizeY: 1,
    header: newHeader.value,
    content
  });

  newHeader.value = '';
};

const findNextPosition = () => {
  const layout = dashboardRef.value?.serialize() || [];
  if (layout.length === 0) return { row: 0, col: 0 };
  const last = layout[layout.length - 1];
  return { row: last.row, col: (last.col + last.sizeX) % 5 };
};
</script>
```

### Conditional Panels

```vue
<script setup>
import { ref, computed } from 'vue';

const userRole = ref('admin');
const showAdminPanels = computed(() => userRole.value === 'admin');

const panels = computed(() => {
  const base = [
    { id: 'main', row: 0, col: 0, sizeX: 3, sizeY: 2, header: 'Main', content: 'Content' }
  ];
  if (showAdminPanels.value) {
    base.push({
      id: 'admin',
      row: 0,
      col: 3,
      sizeX: 2,
      sizeY: 1,
      header: 'Admin Tools',
      content: 'Admin content'
    });
  }
  return base;
});
</script>
```

## Custom CSS Classes per Panel

### Per-Panel Theming

```vue
<script setup>
const panels = ref([
  {
    id: 'warning',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Warning',
    content: 'Warning content',
    cssClass: 'theme-warning'
  },
  {
    id: 'success',
    row: 0,
    col: 2,
    sizeX: 2,
    sizeY: 1,
    header: 'Success',
    content: 'Success content',
    cssClass: 'theme-success'
  },
  {
    id: 'info',
    row: 0,
    col: 4,
    sizeX: 1,
    sizeY: 1,
    header: 'Info',
    content: 'Info content',
    cssClass: 'theme-info'
  }
]);
</script>

<style>
.theme-warning .e-panel-header { background: #ffc107; color: #000; }
.theme-warning { border-left: 4px solid #ff9800; }

.theme-success .e-panel-header { background: #28a745; color: #fff; }
.theme-success { border-left: 4px solid #1e7e34; }

.theme-info .e-panel-header { background: #17a2b8; color: #fff; }
.theme-info { border-left: 4px solid #117a8b; }
</style>
```

## Header and Content Templates

### Function-Based Templates

```vue
<script setup>
import { ref, h } from 'vue';

const dashboardRef = ref(null);
const liveValue = ref(42);

const renderHeader = (defaultHeader) => {
  const el = document.createElement('div');
  el.style.display = 'flex';
  el.style.justifyContent = 'space-between';
  el.style.alignItems = 'center';
  el.innerHTML = `
    <span class="header-title">${defaultHeader}</span>
    <span class="header-badge">${liveValue.value}</span>
  `;
  return el;
};

const renderContent = (data) => {
  const el = document.createElement('div');
  el.style.padding = '16px';
  el.innerHTML = `
    <h3>${data.title}</h3>
    <p>Value: ${data.value}</p>
    <button class="action-btn">Action</button>
  `;
  return el;
};

const panels = ref([
  {
    id: 'dynamic-1',
    row: 0,
    col: 0,
    sizeX: 3,
    sizeY: 2,
    header: () => renderHeader('Live Counter'),
    content: () => renderContent({ title: 'Sample', value: liveValue.value })
  }
]);
</script>
```

## Performance Optimization

### Computed Memoization

```vue
<script setup>
import { ref, computed } from 'vue';

const rawData = ref([]);

// Expensive transformation is memoized
const processedData = computed(() => {
  return rawData.value.map(d => ({
    ...d,
    computed: d.value * 2
  }));
});

const panels = computed(() => [
  {
    id: 'data',
    row: 0,
    col: 0,
    sizeX: 5,
    sizeY: 3,
    header: 'Data View',
    content: `<div>${processedData.value.length} items</div>`
  }
]);
</script>
```

### Debounced Updates

```vue
<script setup>
import { ref, watch, onUnmounted } from 'vue';

const dashboardRef = ref(null);
const panels = ref([]);
let updateTimer = null;

const debouncedUpdate = (newData) => {
  if (updateTimer) clearTimeout(updateTimer);
  updateTimer = setTimeout(() => {
    panels.value = newData.map((d, i) => ({
      id: `auto-${i}`,
      row: Math.floor(i / 3),
      col: (i % 3) * 2,
      sizeX: 2,
      sizeY: 1,
      header: d.title,
      content: `<div>${d.body}</div>`
    }));
  }, 300);
};

onUnmounted(() => {
  if (updateTimer) clearTimeout(updateTimer);
});
</script>
```

### Virtual Scrolling for Many Panels

```vue
<script setup>
import { ref, computed } from 'vue';

const allPanels = ref(/* large array */);
const pageSize = 20;
const currentPage = ref(0);

const visiblePanels = computed(() => {
  const start = currentPage.value * pageSize;
  return allPanels.value.slice(start, start + pageSize).map((p, i) => ({
    id: p.id,
    row: Math.floor(i / 4),
    col: (i % 4) * 2,
    sizeX: 2,
    sizeY: 1,
    header: p.title,
    content: p.content
  }));
});
</script>
```

## Pinia/Vuex Integration

### Pinia Store

```js
// stores/dashboard.js
import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    panels: [],
    lastSaved: null
  }),
  actions: {
    setPanels(panels) {
      this.panels = panels;
    },
    addPanel(panel) {
      this.panels.push(panel);
    },
    removePanel(id) {
      this.panels = this.panels.filter(p => p.id !== id);
    },
    async saveToServer() {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ panels: this.panels })
      });
      if (response.ok) this.lastSaved = new Date();
    }
  },
  persist: {
    storage: localStorage,
    paths: ['panels']
  }
});
```

### Using the Store

```vue
<script setup>
import { useDashboardStore } from '@/stores/dashboard';
import { storeToRefs } from 'pinia';

const dashboardStore = useDashboardStore();
const { panels } = storeToRefs(dashboardStore);
const dashboardRef = ref(null);

const onChange = (args) => {
  const layout = dashboardRef.value?.serialize();
  if (layout) dashboardStore.setPanels(layout);
};

const saveAndSync = async () => {
  await dashboardStore.saveToServer();
};
</script>

<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    :panels="panels"
    :change="onChange"
  />
</template>
```

## API Integration for Save/Load

### Complete API Example

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);
const panels = ref([]);
const loading = ref(false);
const error = ref(null);

const loadDashboard = async (userId) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`/api/dashboards/${userId}`);
    if (!response.ok) throw new Error('Failed to load dashboard');
    const data = await response.json();
    panels.value = data.panels;
  } catch (e) {
    error.value = e.message;
    panels.value = getDefaultPanels();
  } finally {
    loading.value = false;
  }
};

const saveDashboard = async (userId) => {
  const layout = dashboardRef.value?.serialize();
  if (!layout) return;

  try {
    const response = await fetch(`/api/dashboards/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ panels: layout, updatedAt: new Date().toISOString() })
    });
    if (!response.ok) throw new Error('Save failed');
    return true;
  } catch (e) {
    error.value = e.message;
    return false;
  }
};

const getDefaultPanels = () => [
  { id: 'default-1', row: 0, col: 0, sizeX: 3, sizeY: 2, header: 'Default 1', content: 'Default content' }
];

onMounted(() => loadDashboard('user-123'));
</script>

<template>
  <div>
    <div v-if="loading">Loading dashboard...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <DashboardLayoutComponent ref="dashboardRef" :panels="panels" />
    <button @click="saveDashboard('user-123')">Save</button>
  </div>
</template>
```

### Optimistic Updates with Rollback

```vue
<script setup>
const saveWithRollback = async () => {
  const previousLayout = dashboardRef.value?.serialize();
  const newLayout = computeNewLayout();

  // Apply optimistically
  applyLayout(newLayout);

  // Try to save
  const success = await saveToServer(newLayout);
  if (!success) {
    // Rollback on failure
    applyLayout(previousLayout);
    showError('Save failed - reverted');
  }
};
</script>
```

## Best Practices

1. **Memoize expensive calculations**: Use `computed` for derived data

2. **Debounce rapid updates**: Avoid save storms during continuous interactions

3. **Use virtual scrolling**: For dashboards with many panels

4. **Persist state centrally**: Use Pinia/Vuex for cross-component state

5. **Implement optimistic updates**: Show changes immediately, sync in background

6. **Handle API failures gracefully**: Roll back optimistic updates on error

7. **Batch API calls**: Combine multiple panel changes into one request

8. **Cache layouts**: Use localStorage as fallback for API failures

9. **Validate on load**: Discard corrupt or incompatible layout data

10. **Profile performance**: Use Vue DevTools to identify slow computations

**Next:** Return to the [SKILL.md](../SKILL.md#dashboardlayout) for the complete DashboardLayout overview.
