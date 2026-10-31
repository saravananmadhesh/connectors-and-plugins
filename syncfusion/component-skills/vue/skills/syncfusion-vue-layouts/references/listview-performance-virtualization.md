# ListView Performance & Virtualization (Vue 3)

## Table of Contents
- [Virtual Scrolling](#virtual-scrolling)
- [refreshItemHeight for Dynamic Heights](#refreshitemheight-for-dynamic-heights)
- [Memory Optimization](#memory-optimization)
- [Combining with Pagination](#combining-with-pagination)
- [Performance Best Practices](#performance-best-practices)

## Virtual Scrolling

Enable virtual scrolling to render only visible items, supporting thousands of items efficiently.

```vue
<template>
  <ListViewComponent
    :dataSource="largeData"
    :fields="fields"
    :enableVirtualization="true"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const largeData = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`
  }))
);

const fields = { id: 'id', text: 'text' };
</script>
```

### When to Use Virtualization

| Use Virtualization | Don't Use Virtualization |
|--------------------|--------------------------|
| 100+ items | <50 items |
| All items similar height | Highly variable heights |
| Scrollable list | Few items visible at once |
| Performance critical | Simple list |

## refreshItemHeight for Dynamic Heights

When item heights change dynamically, call `refreshItemHeight` to recalculate.

```vue
<template>
  <div>
    <button @click="expandAll">Expand All</button>
    <button @click="collapseAll">Collapse All</button>
    <ListViewComponent
      ref="listViewRef"
      :dataSource="items"
      :fields="fields"
      :enableVirtualization="true"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const listViewRef = ref(null);

const items = ref([
  { id: 1, text: 'Item 1', expanded: false, details: 'Long details...' },
  { id: 2, text: 'Item 2', expanded: false, details: 'More info...' }
]);

const fields = { id: 'id', text: 'text' };

const expandAll = () => {
  items.value = items.value.map(i => ({ ...i, expanded: true }));
  listViewRef.value?.refreshItemHeight();
};

const collapseAll = () => {
  items.value = items.value.map(i => ({ ...i, expanded: false }));
  listViewRef.value?.refreshItemHeight();
};
</script>

<template #item="{ data }">
  <div class="custom-item">
    <div class="item-title">{{ data.text }}</div>
    <div v-if="data.expanded" class="item-details">{{ data.details }}</div>
  </div>
</template>
```

## Memory Optimization

### Use `shallowRef` for Large Datasets

```vue
<script setup>
import { shallowRef, triggerRef } from 'vue';

const largeData = shallowRef(
  Array.from({ length: 50000 }, (_, i) => ({ id: i, text: `Item ${i}` }))
);

const updateItem = (id, newText) => {
  const index = largeData.value.findIndex(i => i.id === id);
  if (index !== -1) {
    largeData.value[index].text = newText;
    triggerRef(largeData); // Manual trigger for shallowRef
  }
};
</script>
```

### Avoid Unnecessary Reactivity

```vue
<script setup>
import { ref, markRaw } from 'vue';

// For data that doesn't need to be reactive
const staticData = markRaw([
  { id: 1, text: 'A' },
  { id: 2, text: 'B' }
]);
</script>
```

### Use Computed for Derived Data

```vue
<script setup>
import { ref, computed } from 'vue';

const allItems = ref(/* large array */);
const searchTerm = ref('');

// Cached - only recomputes when dependencies change
const filteredItems = computed(() => {
  if (!searchTerm.value) return allItems.value;
  return allItems.value.filter(i => i.text.includes(searchTerm.value));
});
</script>
```

## Combining with Pagination

### Load More on Scroll

```vue
<template>
  <div @scroll="onScroll" class="scroll-container">
    <ListViewComponent
      :dataSource="visibleItems"
      :fields="fields"
      :enableVirtualization="true"
      height="400px"
    />
    <div v-if="loading" class="loading">Loading more...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const visibleItems = ref([]);
const loading = ref(false);
const page = ref(0);
const pageSize = 50;
const totalItems = ref(1000);

const fields = { id: 'id', text: 'text' };

const loadMore = () => {
  if (loading.value || visibleItems.value.length >= totalItems.value) return;
  loading.value = true;
  setTimeout(() => {
    const newItems = Array.from({ length: pageSize }, (_, i) => ({
      id: page.value * pageSize + i,
      text: `Item ${page.value * pageSize + i + 1}`
    }));
    visibleItems.value = [...visibleItems.value, ...newItems];
    page.value++;
    loading.value = false;
  }, 500);
};

const onScroll = (e) => {
  const el = e.target;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
    loadMore();
  }
};

// Initial load
loadMore();
</script>
```

### Server-Side Pagination

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { DataManager, ODataAdaptor, Query } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
  url: 'https://api.example.com/items',
  adaptor: new ODataAdaptor()
});

const visibleItems = ref([]);
const currentPage = ref(0);
const pageSize = 50;

const loadPage = async (page) => {
  const query = new Query().range(page * pageSize, (page + 1) * pageSize - 1);
  const result = await dataManager.executeQuery(query);
  visibleItems.value = [...visibleItems.value, ...result.result];
};
</script>
```

## Performance Best Practices

### 1. Use Keys Properly

```vue
<template>
  <ListViewComponent :dataSource="items" :fields="fields" />
</template>
```

The component uses `id` field for tracking; ensure unique IDs.

### 2. Avoid Deep Watchers

```vue
<script setup>
import { ref, watch } from 'vue';

// ❌ Slow: deep watcher on large object
watch(items, () => { /* ... */ }, { deep: true });

// ✅ Fast: shallow watcher with id
watch(() => items.value.map(i => i.id).join(','), () => { /* ... */ });
</script>
```

### 3. Debounce Filter Input

```vue
<script setup>
import { ref, watch, onUnmounted } from 'vue';

const searchInput = ref('');
const debouncedSearch = ref('');
let timer = null;

watch(searchInput, (val) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { debouncedSearch.value = val; }, 300);
});

onUnmounted(() => { if (timer) clearTimeout(timer); });
</script>
```

### 4. Memoize Template Functions

```vue
<script setup>
import { ref } from 'vue';

const items = ref(/* ... */);

const templateCache = new Map();

const getTemplate = (data) => {
  if (templateCache.has(data.type)) {
    return templateCache.get(data.type);
  }
  // Generate template
  const tpl = `<div>${data.text}</div>`;
  templateCache.set(data.type, tpl);
  return tpl;
};
</script>
```

### 5. Use CSS Transforms for Animations

```vue
<style>
/* ✅ GPU-accelerated */
.e-list-item {
  transform: translateZ(0);
  transition: transform 0.2s;
}

/* ❌ Triggers layout */
.e-list-item {
  transition: width 0.2s;
}
</style>
```

### 6. Limit DOM Mutations

```vue
<script setup>
import { ref } from 'vue';

// ✅ Batch updates
const updateMultiple = () => {
  items.value = items.value.map(i => ({ ...i, updated: true }));
};

// ❌ Multiple individual updates cause re-renders
const updateOne = (id) => {
  const idx = items.value.findIndex(i => i.id === id);
  items.value[idx] = { ...items.value[idx], updated: true };
};
</script>
```

## Performance Monitoring

```vue
<script setup>
import { ref, onMounted } from 'vue';

const renderTime = ref(0);

onMounted(() => {
  const start = performance.now();
  // Wait for first render
  requestAnimationFrame(() => {
    renderTime.value = performance.now() - start;
    console.log(`Initial render: ${renderTime.value}ms`);
  });
});
</script>
```

**Next:** Learn about the [API reference](listview-api-reference.md) for complete property documentation.
