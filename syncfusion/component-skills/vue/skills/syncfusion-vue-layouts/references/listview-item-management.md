# ListView Item Management (CRUD) (Vue 3)

## Table of Contents
- [Adding Items](#adding-items)
- [Removing Items](#removing-items)
- [Updating Items](#updating-items)
- [Batch Operations](#batch-operations)
- [Finding Items](#finding-items)
- [Nested List Items](#nested-list-items)

## Adding Items

### addItem(data)

Add a single item to the list.

```vue
<template>
  <div>
    <button @click="addSingle">Add Item</button>
    <ListViewComponent ref="listViewRef" :dataSource="items" :fields="fields" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const listViewRef = ref(null);
const items = ref([{ id: 1, text: 'Initial' }]);
const fields = { id: 'id', text: 'text' };

const addSingle = () => {
  listViewRef.value?.addItem([{ id: Date.now(), text: `Item ${items.value.length + 1}` }]);
};
</script>
```

### addItem(data, fields)

Add items with custom field mapping.

```vue
<script setup>
const addWithMapping = () => {
  const newItem = { itemId: 100, itemName: 'New Item', category: 'General' };
  const customFields = { id: 'itemId', text: 'itemName' };
  listViewRef.value?.addItem([newItem], customFields);
};
</script>
```

### Add at Specific Index

```vue
<script setup>
const addAtTop = () => {
  const newItem = { id: Date.now(), text: 'Top Item' };
  listViewRef.value?.addItem([newItem]);
  // ListView typically appends to end
  // To prepend, manipulate data source
  items.value = [newItem, ...items.value];
};
</script>
```

## Removing Items

### removeItem(item)

Remove a specific item by reference.

```vue
<template>
  <div>
    <ListViewComponent
      ref="listViewRef"
      :dataSource="items"
      :fields="fields"
      :select="onSelect"
    />
    <button @click="removeSelected" :disabled="!selectedItem">Remove Selected</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const listViewRef = ref(null);
const selectedItem = ref(null);
const items = ref([
  { id: '1', text: 'Apple' },
  { id: '2', text: 'Banana' },
  { id: '3', text: 'Cherry' }
]);
const fields = { id: 'id', text: 'text' };

const onSelect = (args) => { selectedItem.value = args; };

const removeSelected = () => {
  if (selectedItem.value) {
    listViewRef.value?.removeItem(selectedItem.value);
    selectedItem.value = null;
  }
};
</script>
```

### removeMultipleItems(items)

Remove multiple items at once.

```vue
<script setup>
import { ref, computed } from 'vue';

const listViewRef = ref(null);
const items = ref([
  { id: '1', text: 'Task 1' },
  { id: '2', text: 'Task 2' },
  { id: '3', text: 'Task 3' }
]);

const removeCompleted = () => {
  // Find items to remove (in this case all)
  const toRemove = items.value.slice(0, 2);
  listViewRef.value?.removeMultipleItems(toRemove);
};
</script>
```

### Remove by ID

```vue
<script setup>
const removeById = (id) => {
  const item = items.value.find(i => i.id === id);
  if (item) {
    listViewRef.value?.removeItem(item);
  }
};
</script>
```

## Updating Items

### Update by Replacing Data Source

The most idiomatic Vue way to update items is to mutate the reactive data source.

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { id: '1', text: 'Original 1' },
  { id: '2', text: 'Original 2' }
]);

const updateItem = (id, newText) => {
  const index = items.value.findIndex(i => i.id === id);
  if (index !== -1) {
    items.value[index] = { ...items.value[index], text: newText };
  }
};
</script>
```

### Update by Index

```vue
<script setup>
const updateAtIndex = (index, newItem) => {
  items.value = [
    ...items.value.slice(0, index),
    newItem,
    ...items.value.slice(index + 1)
  ];
};
</script>
```

## Batch Operations

### Bulk Add

```vue
<script setup>
const bulkAdd = () => {
  const newItems = Array.from({ length: 100 }, (_, i) => ({
    id: Date.now() + i,
    text: `Item ${i + 1}`
  }));
  listViewRef.value?.addItem(newItems);
};
</script>
```

### Bulk Remove (Filtered)

```vue
<script setup>
const removeAllWithPrefix = (prefix) => {
  const toRemove = items.value.filter(i => i.text.startsWith(prefix));
  listViewRef.value?.removeMultipleItems(toRemove);
};

const clearAll = () => {
  listViewRef.value?.removeMultipleItems([...items.value]);
};
</script>
```

## Finding Items

### Find by ID

```vue
<script setup>
import { computed } from 'vue';

const findById = (id) => items.value.find(i => i.id === id);

// Computed lookup map for performance
const itemMap = computed(() => {
  const map = new Map();
  items.value.forEach(item => map.set(item.id, item));
  return map;
});

const getItem = (id) => itemMap.value.get(id);
</script>
```

### Find with Predicate

```vue
<script setup>
const findByText = (text) => {
  return items.value.find(i => i.text === text);
};

const findAll = (predicate) => {
  return items.value.filter(predicate);
};
</script>
```

## Nested List Items

### Add to Nested Child

```vue
<script setup>
import { ref, reactive } from 'vue';

const items = reactive([
  {
    id: '1',
    text: 'Parent 1',
    child: [
      { id: '1.1', text: 'Child 1.1' }
    ]
  }
]);

const fields = { id: 'id', text: 'text', child: 'child' };

const addToParent = (parentId, childText) => {
  const parent = items.find(i => i.id === parentId);
  if (parent) {
    parent.child = [
      ...(parent.child || []),
      { id: `${parentId}.${(parent.child?.length || 0) + 1}`, text: childText }
    ];
  }
};
</script>
```

### Remove from Nested Child

```vue
<script setup>
const removeChild = (parentId, childId) => {
  const parent = items.find(i => i.id === parentId);
  if (parent && parent.child) {
    parent.child = parent.child.filter(c => c.id !== childId);
  }
};
</script>
```

### Toggle Child Visibility

```vue
<script setup>
const expanded = ref(new Set());

const toggle = (id) => {
  if (expanded.value.has(id)) {
    expanded.value.delete(id);
  } else {
    expanded.value.add(id);
  }
  // Trigger reactivity
  expanded.value = new Set(expanded.value);
};
</script>
```

## Best Practices

1. **Use Vue's reactivity for data updates**: Update the data source rather than manipulating the DOM directly

2. **Batch DOM operations**: Group multiple add/remove operations for performance

3. **Provide user feedback**: Show toasts or confirmations for destructive operations

4. **Validate before operations**: Check item existence before update/remove

5. **Use computed for derived data**: For sorted, filtered, or grouped items

6. **Preserve immutability**: When updating, use spread to create new objects

7. **Handle edge cases**: Empty lists, missing items, invalid IDs

**Next:** Learn about [selection and filtering](listview-selection-filtering.md) for interactive item selection.
