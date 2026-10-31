# ListView Selection & Filtering (Vue 3)

## Table of Contents
- [Single and Multiple Selection](#single-and-multiple-selection)
- [Checkbox-Based Selection](#checkbox-based-selection)
- [Programmatic Selection](#programmatic-selection)
- [Filtering List Items](#filtering-list-items)
- [Selection Events](#selection-events)

## Single and Multiple Selection

### Single Selection (Default)

```vue
<template>
  <ListViewComponent
    id="single-select"
    :dataSource="items"
    :fields="fields"
    :showCheckBox="false"
    @select="onSelect"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const items = ref([
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' }
]);

const fields = { id: 'id', text: 'text' };

const onSelect = (args) => {
  console.log('Selected:', args.text);
};
</script>
```

### Multiple Selection (Keyboard)

Users can hold Ctrl/Cmd to select multiple items. Configure selection mode:

```vue
<template>
  <ListViewComponent
    id="multi-select"
    :dataSource="items"
    :fields="fields"
    selectionMode="Multiple"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([{ id: '1', text: 'A' }, { id: '2', text: 'B' }]);
const fields = { id: 'id', text: 'text' };
</script>
```

## Checkbox-Based Selection

### Basic Checkbox Selection

```vue
<template>
  <ListViewComponent
    id="checkbox-list"
    :dataSource="items"
    :fields="fields"
    :showCheckBox="true"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const items = ref([
  { id: '1', text: 'Task 1', isChecked: false },
  { id: '2', text: 'Task 2', isChecked: true }
]);

const fields = { id: 'id', text: 'text', isChecked: 'isChecked' };
</script>
```

### Checkbox Position

```vue
<template>
  <!-- Checkbox on right -->
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :showCheckBox="true"
    checkBoxPosition="Right"
  />
</template>
```

### Track Selected Checkbox Items

```vue
<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { id: '1', text: 'Apple', isChecked: false },
  { id: '2', text: 'Banana', isChecked: false },
  { id: '3', text: 'Cherry', isChecked: true }
]);

const fields = { id: 'id', text: 'text', isChecked: 'isChecked' };

const selectedItems = computed(() => items.value.filter(i => i.isChecked));
</script>
```

## Programmatic Selection

### selectItem(item)

Programmatically select an item.

```vue
<template>
  <div>
    <button @click="selectById('2')">Select Banana</button>
    <ListViewComponent ref="listViewRef" :dataSource="items" :fields="fields" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const listViewRef = ref(null);
const items = ref([
  { id: '1', text: 'Apple' },
  { id: '2', text: 'Banana' },
  { id: '3', text: 'Cherry' }
]);
const fields = { id: 'id', text: 'text' };

const selectById = (id) => {
  const item = items.value.find(i => i.id === id);
  if (item) listViewRef.value?.selectItem(item);
};
</script>
```

### selectMultipleItems(items)

Programmatically select multiple items.

```vue
<script setup>
const selectMultiple = (ids) => {
  const toSelect = items.value.filter(i => ids.includes(i.id));
  listViewRef.value?.selectMultipleItems(toSelect);
};

// Usage
selectMultiple(['1', '3']);
</script>
```

## Filtering List Items

### Client-Side Filtering

```vue
<template>
  <div>
    <input v-model="searchTerm" placeholder="Filter items..." />
    <ListViewComponent
      :dataSource="filteredItems"
      :fields="fields"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const searchTerm = ref('');

const items = ref([
  { id: '1', text: 'Apple' },
  { id: '2', text: 'Banana' },
  { id: '3', text: 'Cherry' },
  { id: '4', text: 'Date' }
]);

const fields = { id: 'id', text: 'text' };

const filteredItems = computed(() => {
  if (!searchTerm.value) return items.value;
  const term = searchTerm.value.toLowerCase();
  return items.value.filter(i => i.text.toLowerCase().includes(term));
});
</script>
```

### Debounced Search

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

const filteredItems = computed(() => {
  if (!debouncedSearch.value) return items.value;
  return items.value.filter(i =>
    i.text.toLowerCase().includes(debouncedSearch.value.toLowerCase())
  );
});
</script>
```

### Advanced Filtering

```vue
<script setup>
import { ref, computed } from 'vue';

const filters = ref({
  category: 'all',
  minPrice: 0,
  inStock: false
});

const items = ref([
  { id: '1', text: 'Laptop', category: 'Electronics', price: 999, inStock: true },
  { id: '2', text: 'Chair', category: 'Furniture', price: 199, inStock: false }
]);

const filteredItems = computed(() => {
  return items.value.filter(item => {
    if (filters.value.category !== 'all' && item.category !== filters.value.category) return false;
    if (item.price < filters.value.minPrice) return false;
    if (filters.value.inStock && !item.inStock) return false;
    return true;
  });
});
</script>
```

## Selection Events

### select Event

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    @select="onSelect"
  />
</template>

<script setup>
const onSelect = (args) => {
  // args.item - the selected item
  // args.text - text of selected item
  // args.index - index
  // args.event - original event
  // args.isInteracted - user interaction vs programmatic
  console.log('Selected:', args.text, 'at index', args.index);
};
</script>
```

### Reactive Selection Tracking

```vue
<script setup>
import { ref } from 'vue';

const selected = ref([]);

const onSelect = (args) => {
  if (args.isInteracted) {
    if (Array.isArray(args.item)) {
      selected.value = args.item;
    } else {
      selected.value = [args.item];
    }
  }
};
</script>
```

### Clear Selection

```vue
<template>
  <div>
    <button @click="clearSelection">Clear</button>
    <ListViewComponent ref="listViewRef" :dataSource="items" :fields="fields" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const listViewRef = ref(null);
const clearSelection = () => {
  // Clear by selecting empty array
  // Or by resetting data source checkboxes
  items.value.forEach(i => i.isChecked = false);
};
</script>
```

## Best Practices

1. **Use computed for derived state**: Avoid manual filtering/sorting in handlers

2. **Debounce search input**: Avoid filtering on every keystroke

3. **Provide clear selection feedback**: Highlight selected items visually

4. **Handle programmatic and user selections**: Use `isInteracted` to distinguish

5. **Batch selection changes**: Update all items at once when possible

6. **Persist selection**: Save selection state when navigating away

7. **Provide select all/none**: For checkbox lists, add toggle-all controls

**Next:** Learn about [templating and customization](listview-templating-customization.md) for custom rendering.
